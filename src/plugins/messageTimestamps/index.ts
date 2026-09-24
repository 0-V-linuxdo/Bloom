/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * ChatGPT-side rewrite of Void++ MessageTimestamps (GPL-3.0-or-later).
 * No Grok MessageStore / ResponseStore / turbopack patches. Times come
 * from host harvest of conversation GET JSON + POST SSE create_time,
 * and live DOM for the in-flight turn. Painter stays in this plugin.
 * Observe `#thread` / `main` (not html / body[subtree]). Do not wrap
 * fetch. Do not poll `/backend-api/conversations`. Live last-turn
 * stamps follow host watchStreamingEdge (no private isStreaming interval).
 */

import { definePluginSettings } from "../../api/Settings";
import { messageCreateTime, subscribeHarvest, type HarvestEvent } from "../../host/harvest";
import { isDraftMigrate, isStreaming, watchStreamingEdge } from "../../host/streaming";
import { Devs } from "../../utils/constants";
import { registerStyle, removeStyle } from "../../utils/css";
import { debounce } from "../../utils/misc";
import { Logger } from "../../utils/Logger";
import definePlugin, { OptionType, StartAt } from "../../utils/types";
import css from "./styles.css";
import { formatStamp, isoOf } from "./time";

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
let threadObs: MutationObserver | null = null;
let watchedThread: HTMLElement | null = null;
let unsubHarvest: (() => void) | null = null;
let unsubEdge: (() => void) | null = null;
let vis: AbortController | null = null;
let wasStreaming = false;
let ignoreStreaming = false;

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
    return live.get(id) ?? getStamps()[id] ?? messageCreateTime(id) ?? null;
}

function onHarvest(ev: HarvestEvent) {
    if (!started) return;
    if (ev.type === "message-time") remember(ev.messageId, ev.createTime);
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
    const rawStreaming = isStreaming();
    if (ignoreStreaming) {
        if (rawStreaming) {
            wasStreaming = false;
        } else {
            ignoreStreaming = false;
        }
    }
    const streaming = ignoreStreaming ? false : rawStreaming;
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
    if (!started) return;
    if (document.hidden) {
        if (raf) {
            cancelAnimationFrame(raf);
            raf = 0;
        }
        paint();
        return;
    }
    if (raf) return;
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
        unsubHarvest = subscribeHarvest(onHarvest);
        unsubEdge?.();
        unsubEdge = watchStreamingEdge({
            onTick: schedulePaint,
            onFall: schedulePaint,
            onContext(next, prev) {
                if (!isDraftMigrate(prev, next)) {
                    ignoreStreaming = true;
                    wasStreaming = false;
                }
                schedulePaint();
            },
        });
        vis?.abort();
        vis = new AbortController();
        document.addEventListener("visibilitychange", () => {
            if (!started) return;
            if (raf) {
                cancelAnimationFrame(raf);
                raf = 0;
            }
            paint();
        }, { signal: vis.signal });
        observeThread();
        schedulePaint();
        logger.debug("timestamp watch started");
    },
    stop() {
        started = false;
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        vis?.abort();
        vis = null;
        threadObs?.disconnect();
        threadObs = null;
        watchedThread = null;
        unsubEdge?.();
        unsubEdge = null;
        unsubHarvest?.();
        unsubHarvest = null;
        ignoreStreaming = false;
        wasStreaming = false;
        persistNow();
        live.clear();
        document.querySelectorAll(`.${MARK}`).forEach(n => n.remove());
        removeStyle(STYLE_NAME);
    },
    onSettingsChange: schedulePaint,
});
