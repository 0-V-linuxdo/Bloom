/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * ChatGPT-side rewrite of Void++ ChatListStatus (GPL-3.0-or-later).
 * Painter stays in this plugin (not core). ChatGPT already paints Recents
 * status on other rows; this only fills the open chat (native skips it).
 * Sources: host harvest of generate POST/SSE (not /conversation/init),
 * watchStreamingEdge onTick gated on harvest-arm / Stop (ignore hydrate
 * isStreaming and last-resort spinners), BroadcastChannel across tabs.
 * Paints only the Recents `a[href^="/c/"]` whose id is
 * `currentConversationId()`. No /backend-api/conversations poll, no
 * html/body subtree observer, no Grok Zustand stores.
 */

import { getStopButton } from "../../host/composer";
import { conversationIdFromHref, currentConversationId } from "../../host/conversation";
import { subscribeHarvest, type HarvestEvent } from "../../host/harvest";
import { getProStopButton, hasErrorToast, isDraftMigrate, watchStreamingEdge, type StreamingTick } from "../../host/streaming";
import { Devs } from "../../utils/constants";
import { registerStyle, removeStyle } from "../../utils/css";
import { Logger } from "../../utils/Logger";
import definePlugin, { StartAt } from "../../utils/types";
import css from "./styles.css";

const logger = new Logger("ChatListStatus");
const STYLE_NAME = "chatListStatus";
const MARK = "bloom-cls";
const CHANNEL = "bloom-cls";
const STREAM_TTL_MS = 20 * 60 * 1000;
const SKIP_HOSTS = "#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item";

type Kind = "streaming" | "done" | "error" | "idle";

type Wire = {
    v: 1;
    id: string;
    kind: Kind;
    at: number;
};

type Row = { kind: Kind; at: number; source: "local" | "net" | "bc" };

const rows = new Map<string, Row>();

let started = false;
let lastPathId = "";
let wasStreaming = false;
let raf = 0;
let sidebarObs: MutationObserver | null = null;
let watchedSidebar: HTMLElement | null = null;
let channel: BroadcastChannel | null = null;
let unsubHarvest: (() => void) | null = null;
let unsubEdge: (() => void) | null = null;
let vis: AbortController | null = null;
let pendingNew = false;
const armedIds = new Set<string>();

function now(): number {
    return Date.now();
}

function sidebarRoot(): HTMLElement | null {
    return (document.getElementById("stage-slideover-sidebar")
        || document.querySelector<HTMLElement>("nav")) ?? null;
}

function setStatus(id: string, kind: Kind, source: Row["source"], broadcast = true) {
    if (!id || !started) return;
    if (kind === "idle") {
        rows.delete(id);
    } else {
        const prev = rows.get(id);
        if (prev && prev.kind === kind && source !== "net") {
            prev.at = now();
        } else {
            rows.set(id, { kind, at: now(), source });
        }
    }
    if (broadcast) post({ v: 1, id, kind, at: now() });
    schedulePaint();
}

function post(msg: Wire) {
    try { channel?.postMessage(msg); } catch { /* ignore */ }
}

function onChannel(ev: MessageEvent<Wire>) {
    const msg = ev.data;
    if (!msg || msg.v !== 1 || !msg.id) return;
    if (msg.kind !== "streaming" && msg.kind !== "done" && msg.kind !== "error" && msg.kind !== "idle") return;
    setStatus(msg.id, msg.kind, "bc", false);
}

function prune() {
    const t = now();
    for (const [id, row] of rows) {
        if (row.kind === "streaming" && t - row.at > STREAM_TTL_MS) rows.delete(id);
    }
}

function recentsAnchors(): HTMLAnchorElement[] {
    const root = sidebarRoot();
    if (!root) return [];
    const out: HTMLAnchorElement[] = [];
    const seenIds = new Set<string>();
    try {
        for (const a of root.querySelectorAll<HTMLAnchorElement>('a[href^="/c/"], a[href*="/c/"]')) {
            if (a.closest(SKIP_HOSTS)) continue;
            const id = conversationIdFromHref(a.getAttribute("href") || "");
            if (!id || seenIds.has(id)) continue;
            seenIds.add(id);
            out.push(a);
        }
    } catch { /* ignore */ }
    return out;
}

function svgEl(kind: "streaming" | "error"): SVGSVGElement {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "2.4");
    path.setAttribute("stroke-linecap", "round");
    if (kind === "streaming") {
        svg.setAttribute("class", "bloom-cls-spin");
        path.setAttribute("d", "M21 12a9 9 0 1 1-6.2-8.56");
    } else {
        path.setAttribute("d", "M15 9l-6 6M9 9l6 6");
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", "12");
        circle.setAttribute("cy", "12");
        circle.setAttribute("r", "9");
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke", "currentColor");
        circle.setAttribute("stroke-width", "2");
        svg.appendChild(circle);
    }
    svg.appendChild(path);
    return svg;
}

function markFor(a: HTMLAnchorElement): HTMLElement | null {
    const own = a.querySelector<HTMLElement>(`:scope > .${MARK}`);
    if (own) return own;
    return null;
}

function paint() {
    if (!started) return;
    prune();
    const current = currentConversationId();
    const anchors = recentsAnchors();
    sidebarObs?.disconnect();
    try {
        for (const a of anchors) {
            const id = conversationIdFromHref(a.getAttribute("href") || "");
            if (!id || !current || id !== current) {
                markFor(a)?.remove();
                continue;
            }
            const row = rows.get(id);
            let kind = row?.kind ?? "idle";
            if (kind === "done") kind = "idle";
            if (kind === "idle") {
                markFor(a)?.remove();
                continue;
            }
            let el = markFor(a);
            if (!el) {
                el = document.createElement("span");
                el.className = MARK;
                el.setAttribute("aria-hidden", "true");
                a.appendChild(el);
            }
            if (el.dataset.kind !== kind) {
                el.dataset.kind = kind;
                el.replaceChildren();
                if (kind === "streaming") el.appendChild(svgEl("streaming"));
                else if (kind === "error") el.appendChild(svgEl("error"));
            }
        }
    } catch (e) {
        logger.debug("paint failed", e);
    }
    observeSidebar();
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

function observeSidebar() {
    const root = sidebarRoot();
    if (sidebarObs && watchedSidebar === root && root?.isConnected) return;
    sidebarObs?.disconnect();
    watchedSidebar = root;
    if (!root) {
        sidebarObs = null;
        return;
    }
    sidebarObs = new MutationObserver(() => schedulePaint());
    sidebarObs.observe(root, { childList: true, subtree: true });
}

function hasStop(): boolean {
    return !!(getStopButton() || getProStopButton());
}

/** True generate — harvest SSE arm or a real Stop. Not hydrate aria-busy / header spin. */
function isLiveGenerate(id: string): boolean {
    if (pendingNew) return true;
    if (id && armedIds.has(id)) return true;
    if (hasStop()) return true;
    return false;
}

function onHarvest(ev: HarvestEvent) {
    if (!started) return;
    if (ev.type === "post-start") {
        if (ev.conversationId) {
            pendingNew = false;
            armedIds.add(ev.conversationId);
            wasStreaming = true;
            setStatus(ev.conversationId, "streaming", "net");
        } else {
            pendingNew = true;
            wasStreaming = true;
        }
        return;
    }
    if (ev.type === "post-end") {
        pendingNew = false;
        if (ev.conversationId) {
            armedIds.delete(ev.conversationId);
            setStatus(ev.conversationId, ev.error ? "error" : "done", "net");
        }
        if (!hasStop()) wasStreaming = false;
    }
}

function onContext(next: string, prev: string) {
    if (!started) return;
    if (isDraftMigrate(prev, next)) {
        schedulePaint();
        return;
    }
    const id = currentConversationId();
    if (pendingNew || (id && armedIds.has(id))) return;
    wasStreaming = false;
    if (id && rows.get(id)?.kind === "streaming" && rows.get(id)?.source === "local") {
        setStatus(id, "idle", "local");
        return;
    }
    schedulePaint();
}

function localTick(state: StreamingTick) {
    if (!started) return;
    const id = state.conversationId || currentConversationId();
    if (lastPathId && id && lastPathId !== id) {
        const prev = rows.get(lastPathId);
        if (prev?.kind === "streaming" && prev.source === "local") {
            setStatus(lastPathId, hasErrorToast() ? "error" : "done", "local");
        }
        wasStreaming = !!(id && armedIds.has(id));
    }
    lastPathId = id;

    const live = isLiveGenerate(id);
    if (live && (state.streaming || hasStop())) {
        wasStreaming = true;
        if (id) setStatus(id, "streaming", "local");
        schedulePaint();
        return;
    }
    if (wasStreaming) {
        wasStreaming = false;
        if (id) setStatus(id, hasErrorToast() ? "error" : "done", "local");
    }
    schedulePaint();
}

export default definePlugin({
    name: "ChatListStatus",
    description: "Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT’s own status.",
    authors: [Devs.p],
    tags: ["chat", "ui"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
    enabledByDefault: true,
    startAt: StartAt.HostReady,
    cleanupSelectors: [`.${MARK}`],
    start() {
        started = true;
        registerStyle(STYLE_NAME, css);
        try { channel = new BroadcastChannel(CHANNEL); }
        catch { channel = null; }
        channel?.addEventListener("message", onChannel);
        unsubHarvest = subscribeHarvest(onHarvest);
        unsubEdge?.();
        unsubEdge = watchStreamingEdge({ onTick: localTick, onContext });
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
        observeSidebar();
        logger.debug("sidebar status watch started");
    },
    stop() {
        started = false;
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        vis?.abort();
        vis = null;
        sidebarObs?.disconnect();
        sidebarObs = null;
        watchedSidebar = null;
        unsubEdge?.();
        unsubEdge = null;
        unsubHarvest?.();
        unsubHarvest = null;
        try { channel?.close(); } catch { /* ignore */ }
        channel = null;
        rows.clear();
        armedIds.clear();
        pendingNew = false;
        wasStreaming = false;
        lastPathId = "";
        document.querySelectorAll(`.${MARK}`).forEach(n => n.remove());
        removeStyle(STYLE_NAME);
    },
});
