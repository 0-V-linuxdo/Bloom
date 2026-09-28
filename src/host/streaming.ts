/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Extra streaming detectors from Chat-State-Favicons ChatGPT adapter (MIT).
 * Visible Send is not proof the turn ended: ChatGPT reuses the trailing
 * control and may keep data-testid="send-button" while the label is Stop.
 *
 * Core = Stop union. Assistant aria-busy is next. A *live* Thinking /
 * Working status (Helium Pro: Stop remounts as Voice while the dropdown
 * stays) or a last-turn tool spinner is also live. A leftover collapsed
 * Thinking next to finished markdown is idle. Token-class Deep Research /
 * image-spinner selectors are last-resort only — they rot when ChatGPT
 * restyles. Do not invent testids here. `/g/{gizmo}/c/{id}` is a real
 * conversation, not a draft landing.
 *
 * watchStreamingEdge is the shared falling-edge helper. One 400ms timer
 * (refcounted). 3 quiet ticks + contextKey lock + capture Stop + harvest
 * post-end *arm* (never a BloomEventMap.streamEnd). A real chat switch
 * (not `/` → `/c/{id}` of *this* harvest id) drops a pending fall and ignores leftover
 * isStreaming() until it has been false once or a new harvest post-start
 * lands on this page. `/` does not inherit a leftover data-conversation-id.
 * Opening a different Recents row is not the same reply. Leaving is not a
 * completed reply. Stop click is userStopped, not a successful fall.
 * streamingSuppressed / stoppedByUser
 * / fallPending are the shared latch — plugins must not each invent one.
 * ChatStateFavicons, ResponseNotification, PromptQueue, ChatListStatus,
 * BetterNavigator, and MessageTimestamps must subscribe instead of each
 * polling isStreaming(). generateHeld() is the harvest latch (inFlight id
 * or pendingDraft on `/`) — CSF rotate and PQ steal use it; the 400ms
 * edge engine still keys rise/fall on DOM isStreaming() so inFlight
 * cannot deadlock the quiet countdown.
 */

import { getStopButton, getSubmitButton, isStopControl, isVisible } from "./composer";
import { contextKeyFromUrl, conversationIdFromHref, conversationToken, currentConversationId, isDraftLandingPath } from "./conversation";
import { subscribeHarvest, type HarvestEvent } from "./harvest";
import { ASSISTANT_TURN_SEL } from "./shell";
import { isLiveThinkNode, isThinkStatusText } from "./thinkStatus";
import { Logger } from "../utils/Logger";

export { isThinkStatusText } from "./thinkStatus";
export { isDraftLandingPath } from "./conversation";

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
        return !!document.querySelector([
            '[data-message-author-role="assistant"][aria-busy="true"]',
            '[data-turn="assistant"][aria-busy="true"]',
            'section[data-testid^="conversation-turn-"][aria-busy="true"]',
            '.result-streaming[aria-busy="true"]',
            ".result-streaming",
            '[data-chatgpt-search-message-ids][aria-busy="true"]',
        ].join(", "));
    } catch {
        return false;
    }
}

/**
 * Helium 2026-09 Pro: the composer Stop remounts as a Voice/Send circle
 * while the thread still shows a Thinking / Working dropdown. That label
 * is the live generate — do not wait for Stop. Short status only; a
 * paragraph that mentions the words does not count.
 */
const BLOOM_THINK_CHROME = "#bloom-root, #bloom-bn-host, #bloom-pq-chip, #bloom-rt-host, #bloom-sidebar-panel, #bloom-plugin-layer";

function isThinkLabel(text: string): boolean {
    return isThinkStatusText(text);
}

function thinkNodes(root: ParentNode): HTMLElement[] {
    const out: HTMLElement[] = [];
    try {
        if (root instanceof Element && root.closest(BLOOM_THINK_CHROME)) return out;
        if (root instanceof HTMLElement) out.push(root);
        for (const node of root.querySelectorAll<HTMLElement>('button, [role="button"], [aria-expanded], summary, [class*="thinking"], [class*="reasoning"]')) {
            if (node.closest(BLOOM_THINK_CHROME)) continue;
            out.push(node);
        }
    } catch { /* ignore */ }
    return out;
}

/** Expanded / busy / open / spinning Thinking — leftover collapsed label is idle. */
function thinkingLiveIn(root: ParentNode): boolean {
    for (const node of thinkNodes(root)) {
        if (isLiveThinkNode(node)) return true;
    }
    return false;
}

function thinkingLabelIn(root: ParentNode): boolean {
    for (const node of thinkNodes(root)) {
        if (isThinkLabel(node.getAttribute("aria-label") || "")) return true;
        if (node.childElementCount > 4) continue;
        if (isThinkLabel(node.textContent || "")) return true;
    }
    return false;
}

function assistantHasProse(el: HTMLElement): boolean {
    try {
        const md = el.querySelector(".markdown");
        if (!(md instanceof HTMLElement)) return false;
        return !!(md.innerText || md.textContent || "").replace(/\s+/g, " ").trim();
    } catch {
        return false;
    }
}

function lastAssistantTurn(): HTMLElement | null {
    try {
        const turns = document.querySelectorAll(ASSISTANT_TURN_SEL);
        const last = turns[turns.length - 1];
        return last instanceof HTMLElement ? last : null;
    } catch {
        return null;
    }
}

/**
 * Last assistant or composer slab still in Thinking / Working.
 * A leftover collapsed "Thinking" next to finished markdown is not live.
 * Empty assistant + a short Think label is live (Helium drops Stop first).
 */
export function hasThinkingStatus(): boolean {
    try {
        const last = lastAssistantTurn();
        if (last) {
            if (thinkingLiveIn(last)) return true;
            if (!assistantHasProse(last) && thinkingLabelIn(last)) return true;
        }
        const bottom = document.getElementById("thread-bottom-container")
            ?? document.getElementById("thread-bottom");
        if (bottom && thinkingLiveIn(bottom)) return true;
    } catch { /* ignore */ }
    return false;
}

/** Tool / agent spinner on the last assistant — not the header options button. */
export function hasTurnSpinner(): boolean {
    const last = lastAssistantTurn();
    if (!last) return false;
    try {
        for (const spin of last.querySelectorAll<HTMLElement>("svg.animate-spin, .animate-spin")) {
            if (spin.closest('button[data-testid="conversation-options-button"], #page-header, nav, [data-testid*="citation"]')) continue;
            const parent = spin.parentElement;
            if (!isVisible(spin) && !isVisible(parent)) continue;
            return true;
        }
    } catch { /* ignore */ }
    return false;
}

export function hasErrorToast(): boolean {
    return !!document.querySelector('[data-testid="toast-error"]')
        || !!document.querySelector('button[data-testid="regenerate-thread-error-button"]');
}

/**
 * ChatGPT streaming: Stop in composer, Pro trailing Stop, reused Send
 * that is currently a Stop, an aria-busy assistant turn, or a short
 * Thinking / Working status. Token-class Deep Research / image spinner
 * fire only when Send is not a visible non-Stop control.
 */
export function isStreaming(): boolean {
    if (getStopButton()) return true;
    if (getProStopButton()) return true;
    if (hasStreamingTurn()) return true;
    // Thinking / last-turn tool spinner stay live after Stop remounts as
    // Send/Voice. Check before the visible-Send short-circuit or CSF/PQ
    // miss Helium Pro (GPT tool rows have no composer Stop).
    if (hasThinkingStatus()) return true;
    if (hasTurnSpinner()) return true;
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
/** Leftover Stop / aria-busy after a real switch is not a new reply. */
let ignoreStreaming = false;
/** Hold one poll so a switch in the next tick can cancel a false complete. */
let pendingFall: StreamingEdge | null = null;
/** Harvest id of the send in flight. Not a leftover data-* on `/`. */
let inFlightId = "";
/** Empty post-start on a draft page, waiting for the SSE id. Not "any /c/". */
let pendingDraft = false;

/** True while a leftover Stop after a real switch must not count as this page. */
export function streamingSuppressed(): boolean {
    return ignoreStreaming;
}

/** True after a Stop click until the next real rising edge. */
export function stoppedByUser(): boolean {
    return userStopped;
}

/** True for the one poll between a confirmed fall and emit. Switch cancels it. */
export function fallPending(): boolean {
    return pendingFall !== null && !pendingFall.userStopped && !pendingFall.error;
}

/** Conversation id harvested for the send that started here. Empty after a real switch. */
export function inFlightConversationId(): string {
    return inFlightId;
}

/**
 * This page's generate POST is still held. True after harvest post-start
 * (including an empty first-message id / pendingDraft on `/`) until a
 * confirmed fall or a real switch. Not raw isStreaming(): Stop may appear
 * late, and typing a follow-up remounts it as Send.
 */
export function generateHeld(): boolean {
    if (userStopped || ignoreStreaming) return false;
    if (pendingDraft && !currentConversationId()) return true;
    if (!inFlightId) return false;
    const id = currentConversationId();
    return !id || id === inFlightId;
}

function pageConversationId(): string {
    return currentConversationId() || inFlightId;
}

function contextKey(): string {
    return contextKeyFromUrl(conversationToken());
}

function snapshot(streaming: boolean, key: string): StreamingTick {
    return { streaming, contextKey: key, conversationId: pageConversationId() };
}

function pathOfKey(key: string): string {
    try {
        const base = key.split("|")[0] || "";
        return new URL(base).pathname.replace(/\/$/, "") || "/";
    } catch {
        return "";
    }
}

function isDraftPath(path: string): boolean {
    return isDraftLandingPath(path);
}

/**
 * `/` or `/g/` → `/c/{id}` only for this send.
 * Known harvest id must match. Before the id arrives, only a draft-page
 * post-start (`pendingDraft`) counts — and the first `/c/{id}` claims it.
 * Opening some other Recents row after the id is known is a real switch.
 */
export function isDraftMigrate(from: string, to: string): boolean {
    if (!from || from === to) return false;
    const toId = conversationIdFromHref(pathOfKey(to) || to);
    if (!toId) return false;
    const fromDraft = from.endsWith("|draft") || isDraftPath(pathOfKey(from));
    if (!fromDraft) return false;
    if (inFlightId) return toId === inFlightId;
    return pendingDraft;
}

function resetWatch() {
    wasStreaming = false;
    quietTicks = 0;
    streamContext = "";
    userStopped = false;
    harvestError = false;
    armed = false;
    inFlightId = "";
    pendingDraft = false;
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
    if (ev.type === "post-start") {
        const id = currentConversationId();
        if (!ev.conversationId) {
            if (!id) pendingDraft = true;
            if (!id || id === inFlightId) {
                ignoreStreaming = false;
                userStopped = false;
            }
            if (pollTimer !== undefined) tick();
            return;
        }
        const known = ev.conversationId === id || ev.conversationId === inFlightId;
        const claiming = !id && pendingDraft;
        if (!known && !claiming) return;
        inFlightId = ev.conversationId;
        pendingDraft = false;
        ignoreStreaming = false;
        userStopped = false;
        if (pollTimer !== undefined) tick();
        return;
    }
    if (ev.type !== "post-end") return;
    if (!wasStreaming && !pendingFall) return;
    const current = currentConversationId();
    if (ev.conversationId) {
        const same = current
            ? ev.conversationId === current
            : ev.conversationId === inFlightId;
        if (!same) return;
    }
    armed = true;
    if (ev.error) {
        harvestError = true;
        if (pendingFall) pendingFall.error = true;
    }
}

function tick() {
    const key = contextKey();
    const streaming = isStreaming();

    if (lastKey && key && lastKey !== key) {
        const prev = lastKey;
        if (!isDraftMigrate(prev, key)) {
            pendingFall = null;
            resetWatch();
            ignoreStreaming = streaming;
        } else {
            const claimed = conversationIdFromHref(pathOfKey(key));
            if (claimed && !inFlightId) {
                inFlightId = claimed;
                pendingDraft = false;
            }
            if (streamContext === prev) streamContext = key;
            if (pendingFall && pendingFall.contextKey === prev) {
                pendingFall.contextKey = key;
                const id = pageConversationId();
                if (id) pendingFall.conversationId = id;
            }
            ignoreStreaming = false;
        }
        lastKey = key;
        emitContext(key, prev);
        if (ignoreStreaming) {
            emitTick(snapshot(false, key));
            return;
        }
    } else if (key) {
        lastKey = key;
    }

    if (ignoreStreaming) {
        if (streaming) {
            emitTick(snapshot(false, key));
            return;
        }
        ignoreStreaming = false;
    }

    if (pendingFall) {
        if (streaming || pendingFall.contextKey !== key) {
            pendingFall = null;
        } else {
            const edge = pendingFall;
            pendingFall = null;
            resetWatch();
            emitFall(edge);
            emitTick(snapshot(false, key));
            return;
        }
    }

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
    if (!same) {
        resetWatch();
        emitTick(state);
        return;
    }
    pendingFall = {
        contextKey: streamContext || key,
        conversationId: pageConversationId(),
        userStopped,
        error: harvestError || hasErrorToast(),
    };
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
    ignoreStreaming = false;
    pendingFall = null;
    inFlightId = "";
    pendingDraft = false;
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
    ignoreStreaming = false;
    pendingFall = null;
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
