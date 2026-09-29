/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { every, watchBody } from "@utils/dom";
import { createEmitter } from "@utils/events";

import { isStopVisible } from "./composer";
import { type GenerateEnd, network } from "./network";
import { whenDomReady } from "./ready";
import { currentConversationId, onRouteChange, type RouteChange } from "./route";
import { Sel } from "./selectors";
import { threadRoot } from "./thread";

const TICK_MS = 250;
const FALL_SETTLE_MS = 400;
const MIGRATION_WINDOW_MS = 60_000;
const HANDOFF_HOLD_MS = 5000;
const BUSY_TURN = `:is(${Sel.turn}) :is(${Sel.turnBusy})`;

export type FallOutcome = "done" | "stopped" | "error" | "left";

export interface GenerationState {
    generating: boolean;
    conversationId: string | null;
}

export const generation = createEmitter<{
    rise: { conversationId: string | null; };
    fall: { conversationId: string | null; outcome: FallOutcome; };
    context: { prevId: string | null; id: string | null; migrated: boolean; };
    tick: GenerationState;
}>();

const activeRequests = new Set<number>();
const ignoredRequests = new Set<number>();
let generating = false;
let riseAt = 0;
let quietSince: number | null = null;
let stopRequested = false;
let staleDom = false;
let holdUntil = 0;
let domSeen = false;
let lastEnd: GenerateEnd | null = null;
let started = false;

export const generationState = (): GenerationState => ({ generating, conversationId: currentConversationId() });

const domGenerating = () => isStopVisible() || !!threadRoot()?.querySelector(BUSY_TURN);

function rawGenerating() {
    const dom = domGenerating();
    if (!dom) staleDom = false;
    else if (!staleDom) {
        holdUntil = 0;
        domSeen = true;
    }
    return [...activeRequests].some(id => !ignoredRequests.has(id)) || (dom && !staleDom) || Date.now() < holdUntil;
}

function outcome(): FallOutcome {
    if (lastEnd?.error) return "error";
    return stopRequested ? "stopped" : "done";
}

function settle() {
    quietSince = null;
    generating = false;
    domSeen = false;
    generation.emit("fall", { conversationId: currentConversationId(), outcome: outcome() });
    stopRequested = false;
    lastEnd = null;
}

function evaluate() {
    const now = rawGenerating();
    if (now && !generating) {
        generating = true;
        riseAt = Date.now();
        stopRequested = false;
        lastEnd = null;
        generation.emit("rise", { conversationId: currentConversationId() });
    }
    if (now || !generating) quietSince = null;
    else if (quietSince == null) quietSince = Date.now();
    else if (Date.now() - quietSince >= FALL_SETTLE_MS) settle();
}

function evaluateGeneration() {
    evaluate();
    generation.emit("tick", generationState());
}

function onRoute({ prevId, id }: RouteChange) {
    if (prevId === id) return;
    const migrated = !prevId && !!id && (generating || Date.now() - riseAt < MIGRATION_WINDOW_MS);
    if (!migrated && generating) {
        for (const request of activeRequests) ignoredRequests.add(request);
        staleDom = domGenerating();
        holdUntil = 0;
        domSeen = false;
        quietSince = null;
        generating = false;
        stopRequested = false;
        lastEnd = null;
        generation.emit("fall", { conversationId: prevId, outcome: "left" });
    }
    generation.emit("context", { prevId, id, migrated });
    evaluateGeneration();
}

function onClick(event: MouseEvent) {
    if (event.target instanceof Element && event.target.closest(Sel.stopButton)) {
        stopRequested = true;
        holdUntil = 0;
    }
}

export function startGeneration() {
    if (started) return;
    started = true;
    network.on("generate-start", ({ requestId }) => {
        activeRequests.add(requestId);
        evaluateGeneration();
    });
    network.on("generate-end", end => {
        activeRequests.delete(end.requestId);
        if (ignoredRequests.delete(end.requestId)) return;
        lastEnd = end;
        holdUntil = end.handoff && !end.error && !stopRequested && !domSeen ? Date.now() + HANDOFF_HOLD_MS : 0;
        evaluateGeneration();
    });
    onRouteChange(onRoute);
    document.addEventListener("click", onClick, true);
    every(evaluateGeneration, TICK_MS);
    void whenDomReady().then(() => watchBody(evaluate));
}
