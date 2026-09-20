/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Extra streaming detectors from Chat-State-Favicons ChatGPT adapter (MIT).
 * Visible Send is not proof the turn ended: ChatGPT reuses the trailing
 * control and may keep data-testid="send-button" while the label is Stop.
 *
 * Core = Stop union. Assistant aria-busy is next. Token-class Deep Research
 * / image-spinner selectors are last-resort only — they rot when ChatGPT
 * restyles. Do not invent testids here.
 *
 * watchStreamingEdge is the shared falling-edge helper. One 400ms timer
 * (refcounted). 3 quiet ticks + contextKey lock + capture Stop + harvest
 * post-end *arm* (never a BloomEventMap.streamEnd). ChatStateFavicons,
 * ResponseNotification, PromptQueue, ChatListStatus, BetterNavigator,
 * and MessageTimestamps must subscribe instead of each polling isStreaming().
 */

import { getStopButton, getSubmitButton, isStopControl, isVisible } from "./composer";
import { contextKeyFromUrl, conversationToken, currentConversationId } from "./conversation";
import { subscribeHarvest, type HarvestEvent } from "./harvest";
import { Logger } from "../utils/Logger";

const logger = new Logger("Streaming");

export function getProStopButton(): HTMLElement | null {
    const trailing = document.querySelector('div[slot="trailing"]');
    if (!trailing) return null;
    for (const btn of trailing.querySelectorAll("button")) {
        if (!(btn instanceof HTMLElement) || !isVisible(btn)) continue;
        if (isStopControl(btn)) return btn;
        if (/\bStop\b|停止/.test(btn.textContent || "")) return btn;
    }
    return null;
}

/** Last-resort token-class detector. Prefer hasStreamingTurn / Stop. */
export function hasDeepResearchProgress(): boolean {
    const el = document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");
    return !!(el && isVisible(el));
}

/** Last-resort sibling + animate-spin detector. Prefer hasStreamingTurn / Stop. */
export function hasImageGenerationSpinner(): boolean {
    const el = document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');
    return !!(el && isVisible(el));
}

export function hasStreamingTurn(): boolean {
    try {
        return !!document.querySelector(
            '[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]',
        );
    } catch {
        return false;
    }
}

export function hasErrorToast(): boolean {
    return !!document.querySelector('[data-testid="toast-error"]')
        || !!document.querySelector('button[data-testid="regenerate-thread-error-button"]');
}

/**
 * ChatGPT streaming: Stop in composer, Pro trailing Stop, reused Send
 * that is currently a Stop, or an aria-busy assistant turn. Token-class
 * Deep Research / image spinner fire only when Send is not a visible
 * non-Stop control.
 */
export function isStreaming(): boolean {
    if (getStopButton()) return true;
    if (getProStopButton()) return true;
    if (hasStreamingTurn()) return true;
    const send = getSubmitButton();
    if (send && isVisible(send) && !isStopControl(send)) return false;
    if (hasDeepResearchProgress()) return true;
    if (hasImageGenerationSpinner()) return true;
    return false;
}

const POLL_MS = 400;
const QUIET_TICKS = 3;

export type StreamingEdge = {
    contextKey: string;
    conversationId: string;
    userStopped: boolean;
    error: boolean;
};

export type StreamingTick = {
    streaming: boolean;
    contextKey: string;
    conversationId: string;
};

export type StreamingEdgeHandlers = {
    /** Confirmed falling-edge after quiet ticks + same contextKey. Not streamEnd. */
    onFall?: (edge: StreamingEdge) => void;
    onRise?: (tick: StreamingTick) => void;
    onTick?: (tick: StreamingTick) => void;
    onContext?: (next: string, prev: string) => void;
};

const listeners = new Set<StreamingEdgeHandlers>();

let pollTimer: ReturnType<typeof setInterval> | undefined;
let clicks: AbortController | null = null;
let unsubHarvest: (() => void) | null = null;
let wasStreaming = false;
let quietTicks = 0;
let streamContext = "";
let lastKey = "";
let userStopped = false;
let harvestError = false;
let armed = false;

function contextKey(): string {
    return contextKeyFromUrl(conversationToken());
}

function snapshot(streaming: boolean, key: string): StreamingTick {
    return { streaming, contextKey: key, conversationId: currentConversationId() };
}

/** First-message `/` or `|draft` → `/c/{id}` keeps the in-flight watch. */
export function isDraftMigrate(from: string, to: string): boolean {
    if (!from || from === to) return false;
    if (from.endsWith("|draft") && !to.endsWith("|draft")) return true;
    try {
        const a = from.split("|")[0];
        const b = to.split("|")[0];
        const pa = new URL(a).pathname.replace(/\/$/, "") || "/";
        const pb = new URL(b).pathname.replace(/\/$/, "") || "/";
        if ((pa === "/" || pa === "") && pb.startsWith("/c/")) return true;
    } catch { /* ignore */ }
    return false;
}

function resetWatch() {
    wasStreaming = false;
    quietTicks = 0;
    streamContext = "";
    userStopped = false;
    harvestError = false;
    armed = false;
}

function emitFall(edge: StreamingEdge) {
    for (const handler of Array.from(listeners)) {
        try { handler.onFall?.(edge); }
        catch { /* ignore */ }
    }
}

function emitRise(state: StreamingTick) {
    for (const handler of Array.from(listeners)) {
        try { handler.onRise?.(state); }
        catch { /* ignore */ }
    }
}

function emitTick(state: StreamingTick) {
    for (const handler of Array.from(listeners)) {
        try { handler.onTick?.(state); }
        catch { /* ignore */ }
    }
}

function emitContext(next: string, prev: string) {
    for (const handler of Array.from(listeners)) {
        try { handler.onContext?.(next, prev); }
        catch { /* ignore */ }
    }
}

function onStopClick(ev: Event) {
    const node = ev.target;
    if (!(node instanceof Element)) return;
    const btn = node.closest("button");
    if (btn instanceof HTMLElement && isStopControl(btn)) userStopped = true;
}

function onHarvest(ev: HarvestEvent) {
    if (ev.type !== "post-end") return;
    if (!wasStreaming) return;
    armed = true;
    if (ev.error) harvestError = true;
}

function tick() {
    const key = contextKey();
    const streaming = isStreaming();

    if (lastKey && key && lastKey !== key) {
        emitContext(key, lastKey);
        if (!isDraftMigrate(lastKey, key)) {
            resetWatch();
            lastKey = key;
            emitTick(snapshot(streaming, key));
            return;
        }
        if (streamContext === lastKey) streamContext = key;
    }
    lastKey = key;

    const state = snapshot(streaming, key);

    if (streaming) {
        const rose = !wasStreaming;
        if (rose) {
            userStopped = false;
            harvestError = false;
            armed = false;
        }
        wasStreaming = true;
        quietTicks = 0;
        streamContext = key;
        if (rose) emitRise(state);
        emitTick(state);
        return;
    }

    if (!wasStreaming) {
        emitTick(state);
        return;
    }

    quietTicks += 1;
    if (armed) quietTicks = Math.max(quietTicks, QUIET_TICKS);
    if (quietTicks < QUIET_TICKS) {
        emitTick(state);
        return;
    }

    const same = !!streamContext && streamContext === key;
    const edge: StreamingEdge = {
        contextKey: streamContext || key,
        conversationId: currentConversationId(),
        userStopped,
        error: harvestError || hasErrorToast(),
    };
    resetWatch();
    if (same) emitFall(edge);
    emitTick(state);
}

function startEngine() {
    if (pollTimer !== undefined) return;
    wasStreaming = isStreaming();
    lastKey = contextKey();
    streamContext = wasStreaming ? lastKey : "";
    quietTicks = 0;
    userStopped = false;
    harvestError = false;
    armed = false;
    clicks?.abort();
    clicks = new AbortController();
    document.addEventListener("click", onStopClick, { capture: true, signal: clicks.signal });
    unsubHarvest = subscribeHarvest(onHarvest);
    pollTimer = setInterval(tick, POLL_MS);
    logger.debug("watchStreamingEdge started");
}

function stopEngine() {
    if (listeners.size) return;
    if (pollTimer !== undefined) {
        clearInterval(pollTimer);
        pollTimer = undefined;
    }
    clicks?.abort();
    clicks = null;
    unsubHarvest?.();
    unsubHarvest = null;
    resetWatch();
    lastKey = "";
    logger.debug("watchStreamingEdge stopped");
}

/**
 * Subscribe to the shared streaming watch. One timer for the process.
 * Pass `onFall` (or a bare function) for confirmed reply-complete.
 * Do not add BloomEventMap.streamEnd; harvest post-end only arms the countdown.
 */
export function watchStreamingEdge(
    handler: StreamingEdgeHandlers | ((edge: StreamingEdge) => void),
): () => void {
    const wrapped: StreamingEdgeHandlers = typeof handler === "function"
        ? { onFall: handler }
        : handler;
    listeners.add(wrapped);
    startEngine();
    return () => {
        listeners.delete(wrapped);
        stopEngine();
    };
}
