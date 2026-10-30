/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { every } from "@utils/dom";
import { createEmitter } from "@utils/events";

import { isStopVisible } from "./composer";
import { protocol, type ProtocolNote } from "./protocol";
import { currentConversationId, onRouteChange, type RouteChange } from "./route";
import { Sel } from "./selectors";

const TICK_MS = 250;
const FALL_SETTLE_MS = 400;

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
    background: { conversationId: string; };
}>();

let generating = false;
let quietSince: number | null = null;
let stopRequested = false;
let lastOutcome: FallOutcome = "done";
let protocolHeld = false;
let started = false;

export const generationState = (): GenerationState => ({ generating, conversationId: currentConversationId() });

const sameThread = (id: string | null | undefined) => {
    if (!id) return true;
    const current = currentConversationId();
    if (!current) return true;
    return current === id || current.endsWith(id) || id.endsWith(current.replace(/^local:/, ""));
};

function outcomeOf(status?: string): FallOutcome {
    if (status === "interrupted" || status === "aborted" || status === "cancelled") return "stopped";
    if (status === "failed" || status === "error") return "error";
    return "done";
}

function rawGenerating() {
    return protocolHeld || isStopVisible();
}

function settle(outcome: FallOutcome) {
    quietSince = null;
    generating = false;
    protocolHeld = false;
    generation.emit("fall", { conversationId: currentConversationId(), outcome });
    stopRequested = false;
    lastOutcome = "done";
}

function evaluate() {
    const now = rawGenerating();
    if (now && !generating) {
        generating = true;
        stopRequested = false;
        lastOutcome = "done";
        generation.emit("rise", { conversationId: currentConversationId() });
    }
    if (now || !generating) quietSince = null;
    else if (quietSince == null) quietSince = Date.now();
    else if (Date.now() - quietSince >= FALL_SETTLE_MS) settle(stopRequested ? "stopped" : lastOutcome);
}

function evaluateGeneration() {
    evaluate();
    generation.emit("tick", generationState());
}

function onRoute({ prevId, id }: RouteChange) {
    if (prevId === id) return;
    if (generating) {
        protocolHeld = false;
        quietSince = null;
        generating = false;
        stopRequested = false;
        lastOutcome = "done";
        generation.emit("fall", { conversationId: prevId, outcome: "left" });
    }
    generation.emit("context", { prevId, id, migrated: !prevId && !!id });
    evaluateGeneration();
}

function onNote(note: ProtocolNote) {
    if (!sameThread(note.params?.threadId)) return;
    if (note.method === "turn/started") {
        protocolHeld = true;
        evaluateGeneration();
        return;
    }
    if (note.method === "turn/interrupt") {
        protocolHeld = false;
        lastOutcome = "stopped";
        stopRequested = true;
        evaluateGeneration();
        return;
    }
    if (note.method === "turn/completed") {
        protocolHeld = false;
        lastOutcome = outcomeOf(note.params?.turn?.status);
        if (lastOutcome === "stopped") stopRequested = true;
        evaluateGeneration();
    }
}

function onClick(event: MouseEvent) {
    if (event.target instanceof Element && event.target.closest(Sel.stopButton)) {
        stopRequested = true;
        protocolHeld = false;
    }
}

export function startGeneration() {
    if (started) return;
    started = true;
    protocol.on("note", onNote);
    onRouteChange(onRoute);
    document.addEventListener("click", onClick, true);
    every(evaluateGeneration, TICK_MS);
}
