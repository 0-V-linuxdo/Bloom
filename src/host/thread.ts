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

const ROLE_ATTRS = ["data-turn", "data-message-author-role"] as const;
const UNIT_ROLE = /:(user|assistant)$/;
const MESSAGE_UNIT = `${Sel.messageUnit}, ${Sel.oldMessage}`;

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

export const searchUnitRole = (unit: Element) => (unit.getAttribute("data-chatgpt-search-unit-key")?.match(UNIT_ROLE)?.[1] ?? null) as Role | null;

const roleUnits = (root: ParentNode) => [...root.querySelectorAll<HTMLElement>(Sel.searchUnit)]
    .filter(unit => searchUnitRole(unit) && !unit.parentElement?.closest(Sel.searchUnit));

const ownMessageIds = (el: Element) =>
    (el.getAttribute("data-chatgpt-search-message-ids") ?? el.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean) ?? [];

export function unitMessageIds(unit: Element) {
    const own = ownMessageIds(unit);
    return own.length ? own : [...new Set([...unit.querySelectorAll(MESSAGE_UNIT)].flatMap(ownMessageIds))];
}

export function outerMessageUnits(root: ParentNode = document) {
    const units = roleUnits(root);
    return units.length ? units : [...root.querySelectorAll<HTMLElement>(MESSAGE_UNIT)].filter(unit => !unit.parentElement?.closest(MESSAGE_UNIT));
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
    const parts = [...document.querySelectorAll<HTMLElement>(Sel.turn)].filter(isOuterTurn).flatMap(el => {
        const units = roleUnits(el);
        return units.length ? units.map(unit => ({ el: unit, known: searchUnitRole(unit) })) : [{ el, known: null }];
    });
    const { generating } = generationState();
    return parts.map(({ el, known }, index) => {
        const messageIds = known ? unitMessageIds(el) : outerMessageUnits(el).flatMap(unitMessageIds);
        const role = known ?? domRole(el) ?? chainRole(messageIds, chain) ?? (index % 2 ? "assistant" : "user");
        const streaming = role === "assistant" && (el.matches(Sel.turnBusy) || !!el.querySelector(Sel.turnBusy) || (generating && index === parts.length - 1));
        return { el, role, messageIds, streaming };
    });
}

const NOT_CONTENT = "[data-bloom], .sr-only";
const SKIP_LINE = /^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i;

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
    const extras = [...body.querySelectorAll<HTMLElement>(NOT_CONTENT)].map(el => normalizeText(el.textContent ?? "")).filter(Boolean);
    const text = extras.reduce((rest, extra) => rest.replace(extra, "\n"), body.innerText || body.textContent || "");
    const lines = text.split("\n").map(normalizeText).filter(line => line && !SKIP_LINE.test(line));
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
