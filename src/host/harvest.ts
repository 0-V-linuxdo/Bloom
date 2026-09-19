/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * One fetch wrap for conversation GET + POST/SSE. Plugins subscribe;
 * they must not wrap window.fetch themselves. Never intercept
 * /backend-api/conversations (list). No BloomEventMap.streamEnd —
 * listeners are harvest-local.
 */

import { conversationIdFromHref, currentConversationId } from "./conversation";
import { Logger } from "../utils/Logger";

const logger = new Logger("Harvest");
const TIME_MAX = 1500;
const TITLE_MAX = 200;

export type HarvestEvent =
    | { type: "post-start"; conversationId: string; url: string }
    | { type: "post-end"; conversationId: string; error: boolean }
    | { type: "message-time"; messageId: string; createTime: number; conversationId: string }
    | { type: "conversation-meta"; conversationId: string; title: string };

export type HarvestListener = (event: HarvestEvent) => void;

const listeners = new Set<HarvestListener>();
const titles = new Map<string, string>();
const times = new Map<string, number>();

let origFetch: ((input: RequestInfo | URL, init?: RequestInit) => Promise<Response>) | null = null;
let wrappedFetch: ((input: RequestInfo | URL, init?: RequestInit) => Promise<Response>) | null = null;
let fetchTarget: (Window & { fetch: typeof fetch }) | null = null;
let epoch = 0;

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

function isConversationList(url: string): boolean {
    return /\/backend-api\/conversations(?:\/|\?|$)/i.test(url);
}

function isConversationPost(url: string, method: string): boolean {
    if (method !== "POST") return false;
    if (isConversationList(url)) return false;
    return /\/backend-api\/(?:f\/)?conversation(?:\/|\?|$)/i.test(url);
}

function isConversationGet(url: string, method: string): boolean {
    if (method !== "GET") return false;
    if (isConversationList(url)) return false;
    return /\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(url);
}

function idFromApiUrl(url: string): string {
    return url.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1] ?? "";
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

async function tapJson(res: Response, conversationId: string, myEpoch: number) {
    if (myEpoch !== epoch) return;
    try {
        const data = await res.json();
        if (myEpoch !== epoch) return;
        harvestObject(data, conversationId);
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
    const post = isConversationPost(url, method);
    const myEpoch = epoch;
    let seedId = "";
    if (post) {
        seedId = idFromBody(init?.body) || idFromApiUrl(url) || conversationIdFromHref(url) || currentConversationId();
        emit({ type: "post-start", conversationId: seedId, url });
    }
    return orig(input, init).then(res => {
        if (myEpoch !== epoch) return res;
        if (!get && !post) return res;
        try {
            const copy = res.clone();
            if (get) void tapJson(copy, idFromApiUrl(url) || currentConversationId(), myEpoch);
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

export function subscribeHarvest(listener: HarvestListener): () => void {
    listeners.add(listener);
    hookFetch();
    return () => {
        listeners.delete(listener);
        if (listeners.size === 0) unhookFetch();
    };
}

export function conversationTitle(id: string): string {
    return id ? (titles.get(id) ?? "") : "";
}

export function messageCreateTime(messageId: string): number | null {
    if (!messageId) return null;
    return times.get(messageId) ?? null;
}
