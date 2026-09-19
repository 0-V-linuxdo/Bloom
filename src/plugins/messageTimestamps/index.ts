/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * ChatGPT-side rewrite of Void++ MessageTimestamps (GPL-3.0-or-later).
 * No Grok MessageStore / ResponseStore / turbopack patches. Times come
 * from the conversation JSON ChatGPT already fetches, SSE create_time,
 * and live DOM for the in-flight turn. Painter stays in this plugin.
 * Observe `#thread` / `main` (not html / body[subtree]). Do not poll
 * `/backend-api/conversations`.
 */

import { definePluginSettings } from "../../api/Settings";
import { isStreaming } from "../../host/streaming";
import { Devs } from "../../utils/constants";
import { registerStyle, removeStyle } from "../../utils/css";
import { debounce } from "../../utils/misc";
import { Logger } from "../../utils/Logger";
import definePlugin, { OptionType, StartAt } from "../../utils/types";
import css from "./styles.css";
import { formatStamp, isoOf, toMs } from "./time";

const logger = new Logger("MessageTimestamps");
const STYLE_NAME = "messageTimestamps";
const MARK = "bloom-ts";
const STAMP_MAX = 1500;
const SKIP = "#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']";

const settings = definePluginSettings({
    showDate: {
        type: OptionType.BOOLEAN,
        description: "Show the date when the message is not from today.",
        default: true,
    },
    hideOwnMessages: {
        type: OptionType.BOOLEAN,
        description: "Hide timestamps on your own messages.",
        default: false,
    },
    stamps: {
        type: OptionType.STRING,
        description: "Cached message times",
        hidden: true,
        default: {},
    },
});

const live = new Map<string, number>();
let started = false;
let raf = 0;
let pollTimer: ReturnType<typeof setInterval> | undefined;
let threadObs: MutationObserver | null = null;
let watchedThread: HTMLElement | null = null;
let origFetch: ((input: RequestInfo | URL, init?: RequestInit) => Promise<Response>) | null = null;
let wrappedFetch: ((input: RequestInfo | URL, init?: RequestInit) => Promise<Response>) | null = null;
let fetchTarget: (Window & { fetch: typeof fetch }) | null = null;
let wasStreaming = false;

function pageWindow(): Window & { fetch: typeof fetch } {
    return (typeof unsafeWindow !== "undefined" ? unsafeWindow : window) as Window & { fetch: typeof fetch };
}

function threadRoot(): HTMLElement | null {
    return (document.getElementById("thread")
        || document.querySelector<HTMLElement>('[data-testid="conversation-panel"]')
        || document.querySelector<HTMLElement>("main")) ?? null;
}

function getStamps(): Record<string, number> {
    const raw = settings.plain.stamps;
    return raw && typeof raw === "object" && !Array.isArray(raw) ? { ...raw as Record<string, number> } : {};
}

function persistNow() {
    const merged: Record<string, number> = { ...getStamps() };
    for (const [id, ms] of live) merged[id] = ms;
    const keys = Object.keys(merged);
    if (keys.length > STAMP_MAX) {
        const keep = keys.slice(keys.length - STAMP_MAX);
        const next: Record<string, number> = {};
        for (const k of keep) next[k] = merged[k];
        settings.store.stamps = next;
        return;
    }
    settings.store.stamps = merged;
}

const persist = debounce(persistNow, 500);

function remember(id: string, ms: number) {
    if (!id || !ms) return;
    const prev = live.get(id);
    if (prev === ms) return;
    live.set(id, ms);
    persist();
    schedulePaint();
}

function lookup(id: string): number | null {
    if (!id) return null;
    return live.get(id) ?? getStamps()[id] ?? null;
}

function urlOf(input: RequestInfo | URL): string {
    try {
        if (typeof input === "string") return input;
        if (input instanceof URL) return input.href;
        if (typeof Request !== "undefined" && input instanceof Request) return input.url;
    } catch { /* ignore */ }
    return String(input);
}

function isConversationGet(url: string, method: string): boolean {
    if (method !== "GET") return false;
    if (/\/backend-api\/conversations(?:\/|\?|$)/i.test(url)) return false;
    return /\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(url);
}

function isConversationPost(url: string, method: string): boolean {
    if (method !== "POST") return false;
    if (/\/backend-api\/conversations(?:\/|\?|$)/i.test(url)) return false;
    return /\/backend-api\/(?:f\/)?conversation(?:\/|\?|$)/i.test(url);
}

function harvestObject(value: unknown, depth = 0) {
    if (!started || depth > 6 || !value || typeof value !== "object") return;
    if (Array.isArray(value)) {
        for (const item of value) harvestObject(item, depth + 1);
        return;
    }
    const rec = value as Record<string, unknown>;
    const message = rec.message;
    if (message && typeof message === "object" && !Array.isArray(message)) {
        const msg = message as Record<string, unknown>;
        const id = typeof msg.id === "string" ? msg.id : "";
        const ms = toMs(msg.create_time ?? msg.createTime ?? msg.created_at);
        if (id && ms) remember(id, ms);
    }
    const ownId = typeof rec.id === "string" ? rec.id : "";
    const ownMs = toMs(rec.create_time ?? rec.createTime ?? rec.created_at);
    if (ownId && ownMs && (rec.author || rec.content || rec.role || rec.create_time || rec.createTime)) {
        remember(ownId, ownMs);
    }
    if (rec.mapping && typeof rec.mapping === "object") harvestObject(rec.mapping, depth + 1);
    else if (depth < 3) {
        for (const v of Object.values(rec)) {
            if (v && typeof v === "object") harvestObject(v, depth + 1);
        }
    }
}

function harvestText(text: string) {
    if (!text) return;
    try { harvestObject(JSON.parse(text)); }
    catch { /* partial SSE */ }
}

async function tapJson(res: Response) {
    try {
        const data = await res.clone().json();
        harvestObject(data);
    } catch { /* ignore */ }
}

async function tapSse(res: Response) {
    const body = res.body;
    if (!body) return;
    const reader = body.getReader();
    const dec = new TextDecoder();
    let buf = "";
    try {
        while (started) {
            const { done, value } = await reader.read();
            if (done) break;
            buf += dec.decode(value, { stream: true });
            const parts = buf.split("\n");
            buf = parts.pop() ?? "";
            for (const line of parts) {
                const payload = line.replace(/^data:\s*/, "").trim();
                if (!payload || payload === "[DONE]") continue;
                harvestText(payload);
            }
            if (buf.length > 16_384) buf = buf.slice(-4_096);
        }
        if (buf) harvestText(buf.replace(/^data:\s*/, ""));
    } catch { /* ignore */ }
}

function intercept(orig: typeof fetch, input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const url = urlOf(input);
    const method = (init?.method || (typeof Request !== "undefined" && input instanceof Request ? input.method : "GET") || "GET").toUpperCase();
    const get = isConversationGet(url, method);
    const post = isConversationPost(url, method);
    return orig(input, init).then(res => {
        if (get) void tapJson(res);
        else if (post) {
            try { void tapSse(res.clone()); }
            catch { /* ignore */ }
        }
        return res;
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
}

function unhookFetch() {
    if (!origFetch || !fetchTarget) return;
    if (wrappedFetch && fetchTarget.fetch === wrappedFetch) fetchTarget.fetch = origFetch;
    origFetch = null;
    wrappedFetch = null;
    fetchTarget = null;
}

function roleOf(el: HTMLElement): string {
    return (el.getAttribute("data-message-author-role")
        || el.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")
        || "").toLowerCase();
}

function messageNodes(): HTMLElement[] {
    const root = threadRoot();
    if (!root) return [];
    const out: HTMLElement[] = [];
    try {
        for (const node of root.querySelectorAll<HTMLElement>("[data-message-id]")) {
            if (node.closest(SKIP)) continue;
            out.push(node);
        }
    } catch { /* ignore */ }
    return out;
}

function nativeTime(host: HTMLElement): boolean {
    try {
        return !!host.querySelector("time:not(.bloom-ts)");
    } catch {
        return false;
    }
}

function paint() {
    if (!started) return;
    const hideOwn = settings.store.hideOwnMessages === true;
    const showDate = settings.store.showDate !== false;
    const streaming = isStreaming();
    const nodes = messageNodes();
    threadObs?.disconnect();
    try {
        nodes.forEach((node, index) => {
            const id = node.getAttribute("data-message-id") || "";
            const role = roleOf(node);
            const existing = node.querySelector<HTMLElement>(`:scope > .${MARK}`);
            if (hideOwn && role === "user") {
                existing?.remove();
                return;
            }
            if (nativeTime(node)) {
                existing?.remove();
                return;
            }
            let ms = lookup(id);
            if (!ms && id && (streaming || wasStreaming) && index >= nodes.length - 2) {
                ms = Date.now();
                remember(id, ms);
            }
            if (!ms) {
                existing?.remove();
                return;
            }
            const label = formatStamp(ms, showDate);
            if (!label) {
                existing?.remove();
                return;
            }
            let el = existing;
            if (!el) {
                el = document.createElement("time");
                el.className = MARK;
                el.setAttribute("aria-hidden", "true");
                node.insertBefore(el, node.firstChild);
            }
            if (el.textContent !== label) el.textContent = label;
            const iso = isoOf(ms);
            if (iso && el.getAttribute("datetime") !== iso) el.setAttribute("datetime", iso);
        });
    } catch (e) {
        logger.debug("paint failed", e);
    }
    wasStreaming = streaming;
    observeThread();
}

function schedulePaint() {
    if (!started || raf) return;
    raf = requestAnimationFrame(() => {
        raf = 0;
        if (started) paint();
    });
}

function observeThread() {
    const root = threadRoot();
    if (threadObs && watchedThread === root && root?.isConnected) return;
    threadObs?.disconnect();
    watchedThread = root;
    if (!root || root === document.body) {
        threadObs = null;
        return;
    }
    threadObs = new MutationObserver(() => schedulePaint());
    threadObs.observe(root, { childList: true, subtree: true });
}

export default definePlugin({
    name: "MessageTimestamps",
    description: "Show when each turn was sent. Reads ChatGPT’s conversation JSON, not a conversations poll.",
    authors: [Devs.p],
    tags: ["chat"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>`,
    enabledByDefault: true,
    startAt: StartAt.HostReady,
    cleanupSelectors: [`.${MARK}`],
    settings,
    start() {
        started = true;
        registerStyle(STYLE_NAME, css);
        const cached = getStamps();
        for (const [id, ms] of Object.entries(cached)) {
            if (typeof ms === "number" && ms > 0) live.set(id, ms);
        }
        hookFetch();
        observeThread();
        if (pollTimer !== undefined) clearInterval(pollTimer);
        pollTimer = setInterval(schedulePaint, 800);
        schedulePaint();
        logger.debug("timestamp watch started");
    },
    stop() {
        started = false;
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        if (pollTimer !== undefined) {
            clearInterval(pollTimer);
            pollTimer = undefined;
        }
        threadObs?.disconnect();
        threadObs = null;
        watchedThread = null;
        unhookFetch();
        persistNow();
        live.clear();
        document.querySelectorAll(`.${MARK}`).forEach(n => n.remove());
        removeStyle(STYLE_NAME);
    },
    onSettingsChange: schedulePaint,
});
