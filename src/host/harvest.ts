/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * One fetch wrap for conversation GET + generate POST/SSE. Plugins subscribe;
 * they must not wrap window.fetch themselves. Never intercept the Recents
 * list GET `/backend-api/conversations?offset=`. Windowed detail
 * `GET /conversations/{id}?num_turns=` is not that list. Generate POST is
 * only `/backend-api/conversation` or `/f/conversation` (not init).
 * Active-branch turns (cap 480) come from `mapping` or a `turns`
 * window, including ids ChatGPT has not mounted yet. Tool / thought
 * nodes stay inside the assistant tick. Init pins the wrap so the
 * first GET is not missed.
 * Opening a chat does not GET conversation detail. The page's own
 * windowed GET is enough; cloning it must not add `/f/conversation/{id}`,
 * an unwindowed `/conversations/{id}`, or `num_turns=480`.
 * A windowed `num_turns` body is not the whole branch (tool collapse can
 * shrink it below N). After that page GET lands, one older `num_turns=10`
 * window is requested at a time, at least 8s apart, until a page does not
 * grow the chain. Hover / unmounted jump may start the same drip. HTTP 429
 * stops it. No BloomEventMap.streamEnd.
 */

import { conversationIdFromHref, currentConversationId } from "./conversation";
import {
    chainFromPayload,
    conversationIdFromPayload,
    idFromApiUrl,
    isConversationGet,
    isConversationList,
    payloadCompletesChain,
    mergeConversationChain,
    sameChain,
    type ChainTurn,
} from "./conversationChain";
import { Logger } from "../utils/Logger";

export {
    chainFromPayload,
    idFromApiUrl,
    isConversationGet,
    isConversationList,
    isTruncatedPayload,
    isWindowedConversationGet,
    mergeConversationChain,
    oldestNodeId,
    payloadCompletesChain,
} from "./conversationChain";
export type { ChainTurn } from "./conversationChain";

const logger = new Logger("Harvest");
const TIME_MAX = 1500;
const TITLE_MAX = 200;
const CHAIN_CONVS = 8;

export type HarvestEvent =
    | { type: "post-start"; conversationId: string; url: string }
    | { type: "post-end"; conversationId: string; error: boolean }
    | { type: "message-time"; messageId: string; createTime: number; conversationId: string }
    | { type: "conversation-meta"; conversationId: string; title: string }
    | { type: "conversation-chain"; conversationId: string };

export type HarvestListener = (event: HarvestEvent) => void;

const listeners = new Set<HarvestListener>();
const titles = new Map<string, string>();
const times = new Map<string, number>();
const chains = new Map<string, ChainTurn[]>();
const EMPTY_CHAIN: readonly ChainTurn[] = [];
const complete = new Set<string>();
const backfilling = new Set<string>();
const retryAt = new Map<string, number>();
const followUps = new Map<string, ReturnType<typeof setTimeout>>();
const lastDetailHeaders: Record<string, string> = { Accept: "application/json" };
const HEADER_KEEP = /^(authorization|oai-|openai-|chatgpt-|x-authorization)/i;
/** Pause between older windows. One page per cooldown, never a burst. */
const PAGE_COOLDOWN_MS = 8_000;
/** Back off hard when the conversation API is rate-limiting the page. */
const RATE_LIMIT_MS = 60_000;

let origFetch: ((input: RequestInfo | URL, init?: RequestInit) => Promise<Response>) | null = null;
let wrappedFetch: ((input: RequestInfo | URL, init?: RequestInit) => Promise<Response>) | null = null;
let fetchTarget: (Window & { fetch: typeof fetch }) | null = null;
let epoch = 0;
let pinned = false;

function pageWindow(): Window & { fetch: typeof fetch } {
    return (typeof unsafeWindow !== "undefined" ? unsafeWindow : window) as Window & { fetch: typeof fetch };
}

function urlOf(input: RequestInfo | URL): string {
    try {
        if (typeof input === "string") return input;
        if (input instanceof URL) return input.href;
        if (typeof Request !== "undefined" && input instanceof Request) return input.url;
    } catch { /* ignore */ }
    return String(input);
}

function methodOf(input: RequestInfo | URL, init?: RequestInit): string {
    const fromInit = init?.method;
    const fromReq = typeof Request !== "undefined" && input instanceof Request ? input.method : "";
    return (fromInit || fromReq || "GET").toUpperCase();
}

const GENERATE_ACTION = /"action"\s*:\s*"(next|continue|variant)"/i;

/** POST generate stream only — not /conversation/init or /conversation/{id}. */
function isConversationPost(url: string, method: string, body?: BodyInit | null): boolean {
    if (method !== "POST") return false;
    if (isConversationList(url)) return false;
    if (!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(url)) return false;
    if (typeof body === "string" && /"action"\s*:/.test(body) && !GENERATE_ACTION.test(body)) return false;
    return true;
}

function idFromJsonish(text: string): string {
    if (!text) return "";
    const m = text.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/);
    return m?.[1] ?? "";
}

function idFromBody(body: BodyInit | null | undefined): string {
    if (typeof body === "string") return idFromJsonish(body);
    return "";
}

function toMs(value: unknown): number | null {
    if (typeof value === "number" && Number.isFinite(value) && value > 0) {
        return value > 1e12 ? value : Math.round(value * 1000);
    }
    if (typeof value === "string") {
        const raw = value.trim();
        if (!raw) return null;
        if (/^\d+(\.\d+)?$/.test(raw)) return toMs(Number(raw));
        const parsed = Date.parse(raw);
        return Number.isFinite(parsed) ? parsed : null;
    }
    return null;
}

function capMap<V>(map: Map<string, V>, max: number) {
    if (map.size <= max) return;
    const extra = map.size - max;
    let i = 0;
    for (const key of map.keys()) {
        map.delete(key);
        if (++i >= extra) break;
    }
}

function rememberTime(messageId: string, ms: number, conversationId: string) {
    if (!messageId || !ms) return;
    if (times.get(messageId) === ms) return;
    times.set(messageId, ms);
    capMap(times, TIME_MAX);
    emit({ type: "message-time", messageId, createTime: ms, conversationId });
}

function rememberTitle(conversationId: string, title: string) {
    const clean = title.trim();
    if (!conversationId || !clean) return;
    if (titles.get(conversationId) === clean) return;
    titles.set(conversationId, clean);
    capMap(titles, TITLE_MAX);
    emit({ type: "conversation-meta", conversationId, title: clean });
}

function stopOlderWindow(id: string) {
    const timer = followUps.get(id);
    if (timer === undefined) return;
    clearTimeout(timer);
    followUps.delete(id);
}

/** One older page after the cooldown. Does not run until a chain exists. */
function scheduleOlderWindow(id: string) {
    if (!id || complete.has(id) || followUps.has(id) || backfilling.has(id)) return;
    retryAt.set(id, Date.now() + PAGE_COOLDOWN_MS);
    const timer = setTimeout(() => {
        followUps.delete(id);
        retryAt.delete(id);
        ensureConversationChain(id);
    }, PAGE_COOLDOWN_MS);
    followUps.set(id, timer);
}

function rememberChain(conversationId: string, data: unknown, url = "") {
    const cid = conversationIdFromPayload(data, conversationId);
    if (!cid) return;
    const path = chainFromPayload(data);
    if (!path.length) return;
    const prev = chains.get(cid) ?? [];
    const next = mergeConversationChain(prev, path);
    if (payloadCompletesChain(data, url)) {
        complete.add(cid);
        stopOlderWindow(cid);
    }
    if (!sameChain(prev, next)) {
        chains.set(cid, next);
        capMap(chains, CHAIN_CONVS);
        emit({ type: "conversation-chain", conversationId: cid });
    }
    // Page GET only. Our own backfill is `backfilling` and schedules from ensure.
    if (!complete.has(cid) && !backfilling.has(cid)) scheduleOlderWindow(cid);
}

function harvestObject(value: unknown, conversationId: string, depth = 0) {
    if (depth > 6 || !value || typeof value !== "object") return;
    if (Array.isArray(value)) {
        for (const item of value) harvestObject(item, conversationId, depth + 1);
        return;
    }
    const rec = value as Record<string, unknown>;
    const ownConv =
        (typeof rec.conversation_id === "string" && rec.conversation_id)
        || (typeof rec.conversationId === "string" && rec.conversationId)
        || conversationId;
    if (typeof rec.title === "string" && ownConv && !rec.author && !rec.content && !rec.role) {
        rememberTitle(ownConv, rec.title);
    }

    const message = rec.message;
    if (message && typeof message === "object" && !Array.isArray(message)) {
        const msg = message as Record<string, unknown>;
        const id = typeof msg.id === "string" ? msg.id : "";
        const ms = toMs(msg.create_time ?? msg.createTime ?? msg.created_at);
        if (id && ms) rememberTime(id, ms, ownConv);
    }
    const ownId = typeof rec.id === "string" ? rec.id : "";
    const ownMs = toMs(rec.create_time ?? rec.createTime ?? rec.created_at);
    if (ownId && ownMs && (rec.author || rec.content || rec.role || rec.create_time || rec.createTime)) {
        rememberTime(ownId, ownMs, ownConv);
    }
    if (rec.mapping && typeof rec.mapping === "object") harvestObject(rec.mapping, ownConv, depth + 1);
    else if (depth < 3) {
        for (const v of Object.values(rec)) {
            if (v && typeof v === "object") harvestObject(v, ownConv, depth + 1);
        }
    }
}

function harvestText(text: string, conversationId: string) {
    if (!text) return;
    try { harvestObject(JSON.parse(text), conversationId); }
    catch { /* partial SSE */ }
}

function emit(event: HarvestEvent) {
    for (const listener of Array.from(listeners)) {
        try { listener(event); }
        catch { /* ignore */ }
    }
}

function rememberDetailHeaders(input: RequestInfo | URL, init?: RequestInit) {
    const raw = init?.headers
        ?? (typeof Request !== "undefined" && input instanceof Request ? input.headers : null);
    if (!raw) return;
    const entries = raw instanceof Headers
        ? raw.entries()
        : Array.isArray(raw)
            ? raw
            : Object.entries(raw as Record<string, string>);
    for (const [key, value] of entries) {
        if (typeof value === "string" && HEADER_KEEP.test(key)) lastDetailHeaders[key] = value;
    }
}

async function tapJson(res: Response, conversationId: string, myEpoch: number, url: string) {
    if (myEpoch !== epoch) return;
    try {
        const data = await res.json();
        if (myEpoch !== epoch) return;
        harvestObject(data, conversationId);
        rememberChain(conversationId, data, url);
    } catch { /* ignore */ }
}

async function tapSse(res: Response, seedId: string, seedError: boolean, myEpoch: number) {
    let id = seedId;
    let error = seedError;
    const body = res.body;
    if (!body) {
        if (myEpoch === epoch) emit({ type: "post-end", conversationId: id, error });
        return;
    }
    const reader = body.getReader();
    const dec = new TextDecoder();
    let buf = "";
    try {
        while (myEpoch === epoch) {
            const { done, value } = await reader.read();
            if (done) break;
            buf += dec.decode(value, { stream: true });
            if (!id) {
                const found = idFromJsonish(buf);
                if (found) {
                    id = found;
                    emit({ type: "post-start", conversationId: id, url: "" });
                }
            }
            const parts = buf.split("\n");
            buf = parts.pop() ?? "";
            for (const line of parts) {
                const payload = line.replace(/^data:\s*/, "").trim();
                if (!payload || payload === "[DONE]") continue;
                harvestText(payload, id);
            }
            if (/\[DONE\]/.test(buf) || /"error"\s*:\s*\{/.test(buf)) {
                if (/"error"\s*:\s*\{/.test(buf)) error = true;
                buf = buf.slice(-64);
            } else if (buf.length > 16_384) {
                buf = buf.slice(-4_096);
            }
        }
        if (buf && myEpoch === epoch) harvestText(buf.replace(/^data:\s*/, ""), id);
    } catch {
        error = true;
    } finally {
        try { void reader.cancel(); } catch { /* ignore */ }
    }
    if (myEpoch !== epoch) return;
    emit({ type: "post-end", conversationId: id, error });
}

function intercept(orig: typeof fetch, input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const url = urlOf(input);
    const method = methodOf(input, init);
    const get = isConversationGet(url, method);
    const post = isConversationPost(url, method, init?.body);
    const myEpoch = epoch;
    let seedId = "";
    if (post) {
        seedId = idFromBody(init?.body) || idFromApiUrl(url) || conversationIdFromHref(url) || currentConversationId();
        emit({ type: "post-start", conversationId: seedId, url });
    }
    if (get) rememberDetailHeaders(input, init);
    return orig(input, init).then(res => {
        if (myEpoch !== epoch) return res;
        if (!get && !post) return res;
        try {
            const copy = res.clone();
            if (get) void tapJson(copy, idFromApiUrl(url) || currentConversationId(), myEpoch, url);
            else void tapSse(copy, seedId, !res.ok, myEpoch);
        } catch {
            if (post) emit({ type: "post-end", conversationId: seedId, error: !res.ok });
        }
        return res;
    }, err => {
        if (post && myEpoch === epoch) emit({ type: "post-end", conversationId: seedId, error: true });
        throw err;
    });
}

function hookFetch() {
    if (origFetch) return;
    const win = pageWindow();
    fetchTarget = win;
    origFetch = win.fetch.bind(win);
    const wrapped = (input: RequestInfo | URL, init?: RequestInit) => intercept(origFetch!, input, init);
    wrappedFetch = wrapped;
    win.fetch = wrapped as typeof fetch;
    logger.debug("conversation fetch harvest hooked");
}

function unhookFetch() {
    epoch += 1;
    if (!origFetch || !fetchTarget) return;
    if (wrappedFetch && fetchTarget.fetch === wrappedFetch) fetchTarget.fetch = origFetch;
    origFetch = null;
    wrappedFetch = null;
    fetchTarget = null;
    logger.debug("conversation fetch harvest unhooked");
}

function releaseHarvest() {
    epoch += 1;
    if (pinned) return;
    unhookFetch();
}

/** Hook fetch at Init so the first conversation GET is not missed. */
export function pinHarvest() {
    pinned = true;
    hookFetch();
}

type DetailResult = { status: number; data: unknown | null };

/**
 * One older mapping window. Never the open-chat probe:
 * no `/f/conversation/{id}`, no unwindowed `/conversations/{id}`,
 * no `num_turns=480`. The page's own GET is harvested by the fetch wrap.
 */
function olderWindowUrls(id: string, before: string): string[] {
    const node = `include_has_versions=true&num_turns=10&before_node=${encodeURIComponent(before)}`;
    const cursor = `include_has_versions=true&num_turns=10&before=${encodeURIComponent(before)}`;
    return [
        `/backend-api/conversations/${id}?${node}`,
        `/backend-api/conversations/${id}?${cursor}`,
    ];
}

async function fetchDetail(win: Window & { fetch: typeof fetch }, url: string, id: string): Promise<DetailResult> {
    const res = await win.fetch(url, {
        method: "GET",
        credentials: "include",
        headers: { ...lastDetailHeaders },
    });
    if (res.status === 429) return { status: 429, data: null };
    if (!res.ok) return { status: res.status, data: null };
    const data = await res.json();
    harvestObject(data, id);
    rememberChain(id, data, url);
    return { status: res.status, data };
}

/**
 * One older window for a chain the page GET already started.
 * No-op until that chain exists — do not probe detail URLs on open.
 * A page that grows schedules the next window after the cooldown.
 * 429 stops the drip. A window that does not grow marks the chain complete.
 */
export function ensureConversationChain(id: string) {
    if (!id || complete.has(id) || backfilling.has(id)) return;
    const wait = retryAt.get(id) ?? 0;
    if (Date.now() < wait) return;
    const chain = chains.get(id);
    const before = chain?.[0]?.alias || chain?.[0]?.id || "";
    if (!before) return;
    backfilling.add(id);
    hookFetch();
    const win = pageWindow();
    void (async () => {
        let limited = false;
        let grew = false;
        try {
            const size = chains.get(id)?.length ?? 0;
            for (const url of olderWindowUrls(id, before)) {
                let result: DetailResult;
                try {
                    result = await fetchDetail(win, url, id);
                } catch {
                    continue;
                }
                if (result.status === 429) {
                    limited = true;
                    stopOlderWindow(id);
                    retryAt.set(id, Date.now() + RATE_LIMIT_MS);
                    logger.debug("conversation chain rate-limited", id);
                    return;
                }
                if (!result.data) continue;
                grew = (chains.get(id)?.length ?? 0) > size;
                if (complete.has(id)) return;
                if (!grew) {
                    complete.add(id);
                    stopOlderWindow(id);
                }
                return;
            }
        } finally {
            backfilling.delete(id);
            if (limited || complete.has(id)) return;
            if (grew) scheduleOlderWindow(id);
            else if ((retryAt.get(id) ?? 0) <= Date.now()) {
                retryAt.set(id, Date.now() + PAGE_COOLDOWN_MS);
            }
        }
    })();
}

export function subscribeHarvest(listener: HarvestListener): () => void {
    listeners.add(listener);
    hookFetch();
    return () => {
        listeners.delete(listener);
        if (listeners.size === 0) releaseHarvest();
    };
}

export function conversationTitle(id: string): string {
    return id ? (titles.get(id) ?? "") : "";
}

export function messageCreateTime(messageId: string): number | null {
    if (!messageId) return null;
    return times.get(messageId) ?? null;
}

/** Active-branch turns from GET `/backend-api/conversation/{id}` mapping. Not a list poll. */
export function conversationChain(id: string): readonly ChainTurn[] {
    if (!id) return EMPTY_CHAIN;
    return chains.get(id) ?? EMPTY_CHAIN;
}
