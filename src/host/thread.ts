/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { normalizeText } from "@utils/misc";

import { generationState } from "./generation";
import { type ChainMessage, conversationData, type Role } from "./network";
import { currentConversationId } from "./route";
import { Sel } from "./selectors";

export interface Turn {
    el: HTMLElement;
    role: Role;
    messageIds: string[];
    streaming: boolean;
}

const BUSY = '[aria-busy="true"], .result-streaming';
const ROLE_ATTRS = ["data-turn", "data-message-author-role"] as const;

export const isRole = (value: string | null | undefined): value is Role => value === "user" || value === "assistant";

export function threadScroller(): HTMLElement | null {
    const timeline = document.querySelector<HTMLElement>(Sel.timelineScroll);
    if (timeline) return timeline;
    const turn = document.querySelector(Sel.turn);
    for (let el = turn?.parentElement; el; el = el.parentElement) {
        const { overflowY } = getComputedStyle(el);
        if ((overflowY === "auto" || overflowY === "scroll") && el.scrollHeight > el.clientHeight) return el;
    }
    return document.scrollingElement as HTMLElement | null;
}

export const threadColumn = () =>
    document.querySelector<HTMLElement>(Sel.conversationTarget) ?? document.querySelector<HTMLElement>(Sel.oldThread);

export function unitMessageIds(unit: Element) {
    return unit.getAttribute("data-chatgpt-search-message-ids")?.split(/\s+/).filter(Boolean)
        ?? [unit.getAttribute("data-message-id")].filter(id => id != null);
}

export function outerMessageUnits(root: ParentNode = document) {
    return [...root.querySelectorAll<HTMLElement>(`${Sel.messageUnit}, ${Sel.oldMessage}`)]
        .filter(unit => !unit.parentElement?.closest(`${Sel.messageUnit}, ${Sel.oldMessage}`));
}

function chainRole(ids: string[], chain: ChainMessage[]) {
    for (let i = ids.length - 1; i >= 0; i--) {
        const found = chain.find(message => message.id === ids[i]);
        if (found) return found.role;
    }
    return null;
}

function domRole(el: HTMLElement): Role | null {
    for (const attr of ROLE_ATTRS) {
        const value = el.getAttribute(attr) ?? el.querySelector(`[${attr}]`)?.getAttribute(attr);
        if (isRole(value)) return value;
    }
    if (el.querySelector(Sel.markdown) || el.querySelector(Sel.generatedImage)) return "assistant";
    return null;
}

const isOuterTurn = (el: HTMLElement) => !el.parentElement?.closest(Sel.turn);

export function listTurns(): Turn[] {
    const chain = conversationData(currentConversationId())?.chain ?? [];
    const els = [...document.querySelectorAll<HTMLElement>(Sel.turn)].filter(isOuterTurn);
    const { generating } = generationState();
    return els.map((el, index) => {
        const messageIds = outerMessageUnits(el).flatMap(unitMessageIds);
        const role = domRole(el) ?? chainRole(messageIds, chain) ?? (index % 2 ? "assistant" : "user");
        const streaming = role === "assistant" && (el.matches(BUSY) || !!el.querySelector(BUSY) || (generating && index === els.length - 1));
        return { el, role, messageIds, streaming };
    });
}

const SKIP_LINE = /^(?:\d+\s+sources?|web search|searched|thought for|reasoned|thinking)\b/i;

const summaries = new WeakMap<HTMLElement, { length: number; summary: string; }>();

export function turnSummary(turn: Turn) {
    const length = turn.el.textContent?.length ?? 0;
    const cached = summaries.get(turn.el);
    if (cached?.length === length) return cached.summary;
    const summary = computeSummary(turn);
    summaries.set(turn.el, { length, summary });
    return summary;
}

function computeSummary(turn: Turn) {
    const images = turn.el.querySelectorAll(Sel.generatedImage).length;
    if (turn.role === "assistant" && images) return images > 1 ? `Image ×${images}` : "Image";
    const body = turn.el.querySelector<HTMLElement>(turn.role === "assistant" ? Sel.markdown : ".whitespace-pre-wrap") ?? turn.el;
    const lines = (body.innerText || body.textContent || "").split("\n").map(normalizeText).filter(line => line && !SKIP_LINE.test(line));
    if (lines.length) return lines.join(" ");
    return turn.role === "user" && turn.el.querySelector("img, a[download], [data-testid*=file]") ? "File" : "";
}

export function chainSummary(message: ChainMessage) {
    if (message.text) return normalizeText(message.text);
    if (message.imageCount) return message.imageCount > 1 ? `Image ×${message.imageCount}` : "Image";
    return message.hasFiles ? "File" : "";
}

export const isReversedScroller = (scroller: HTMLElement) =>
    scroller.matches(Sel.timelineScroll) && getComputedStyle(scroller).flexDirection === "column-reverse";
