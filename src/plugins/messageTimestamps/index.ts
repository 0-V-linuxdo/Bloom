/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { generation, generationState } from "@host/generation";
import { conversationData, network } from "@host/network";
import { isHydrated } from "@host/ready";
import { currentConversationId } from "@host/route";
import { Sel } from "@host/selectors";
import { isRole, outerMessageUnits, searchUnitRole, unitMessageIds } from "@host/thread";
import { frameScheduler, h, hostMutations, watchBody } from "@utils/dom";
import definePlugin, { OptionType } from "@utils/types";

import styles from "./styles.css";

const MAX_STAMPS = 1500;
const LIVE_WINDOW_MS = 5000;
const SAVE_DELAY_MS = 2000;

const settings = definePluginSettings({
    showDate: { type: OptionType.BOOLEAN, description: "Show the date for messages not sent today.", default: true },
    hideOwnMessages: { type: OptionType.BOOLEAN, description: "Don't add times to your own messages.", default: false },
    stamps: { type: OptionType.CUSTOM, default: {} as Record<string, number> },
});

const known = new Map<string, number>();
let lastFallAt = 0;
let saveTimer: ReturnType<typeof setTimeout> | undefined;
let unsubscribers: (() => void)[] = [];

function learn(id: string, time: number) {
    if (known.get(id) === time) return;
    known.set(id, time);
    clearTimeout(saveTimer);
    saveTimer = setTimeout(save, SAVE_DELAY_MS);
}

function save() {
    const merged = { ...settings.store.stamps, ...Object.fromEntries(known) };
    settings.store.stamps = Object.fromEntries(Object.entries(merged).toSorted((a, b) => b[1] - a[1]).slice(0, MAX_STAMPS));
}

function timeFor(ids: string[]) {
    const times = conversationData(currentConversationId())?.times;
    for (let i = ids.length - 1; i >= 0; i--) {
        const time = known.get(ids[i]) ?? times?.get(ids[i]) ?? settings.store.stamps[ids[i]];
        if (time) return time;
    }
    return null;
}

const isLive = () => generationState().generating || Date.now() - lastFallAt < LIVE_WINDOW_MS;

function format(time: number) {
    const date = new Date(time);
    const now = new Date();
    const clock: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit" };
    if (!settings.store.showDate || date.toDateString() === now.toDateString()) return date.toLocaleTimeString(undefined, clock);
    const year = date.getFullYear() === now.getFullYear() ? {} : { year: "numeric" as const };
    return date.toLocaleString(undefined, { ...year, month: "short", day: "numeric", ...clock });
}

function unitRole(unit: HTMLElement) {
    const value = searchUnitRole(unit) ?? unit.getAttribute("data-message-author-role") ?? unit.closest(Sel.turn)?.getAttribute("data-turn") ?? unit.querySelector(Sel.authorRole)?.getAttribute("data-message-author-role");
    if (isRole(value)) return value;
    const id = unitMessageIds(unit).at(-1);
    return conversationData(currentConversationId())?.chain.find(message => message.id === id)?.role ?? null;
}

const ACTIVITY = '[class*="group/activity-header"]';

function boundedParent(node: HTMLElement) {
    const parent = node.parentElement;
    if (!parent) return null;
    const turn = node.closest(Sel.turn);
    if (turn && parent !== turn && !turn.contains(parent)) return null;
    return parent;
}

function activityHeader(unit: HTMLElement) {
    let node: HTMLElement | null = unit;
    for (let depth = 0; depth < 8 && node; depth++) {
        const parent = boundedParent(node);
        if (!parent) return null;
        const siblings = [...parent.children];
        const index = siblings.indexOf(node);
        for (let i = index - 1; i >= 0; i--) {
            const sibling = siblings[i] as HTMLElement;
            const header = sibling.matches(ACTIVITY) ? sibling : sibling.querySelector<HTMLElement>(ACTIVITY);
            if (header) return header;
            if (sibling.matches(Sel.searchUnit) || sibling.querySelector(Sel.searchUnit)) return null;
        }
        if (parent === node.closest(Sel.turn)) return null;
        node = parent;
    }
    return null;
}

function replyTop(header: HTMLElement) {
    let node: HTMLElement | null = header.parentElement;
    for (let depth = 0; depth < 4 && node; depth++) {
        if (node.classList.contains("flex-col")) return node;
        node = node.parentElement;
    }
    return header.parentElement ?? header;
}

function anchorFor(unit: HTMLElement, role: string | null) {
    if (role === "assistant") {
        const header = activityHeader(unit);
        if (header) return replyTop(header);
    }
    return unit;
}

function isAnchorOwner(unit: HTMLElement, target: HTMLElement) {
    const units = outerMessageUnits();
    for (let i = units.length - 1; i >= 0; i--) {
        const el = units[i];
        if (el !== unit && (unitRole(el) !== "assistant" || anchorFor(el, "assistant") !== target)) continue;
        return el === unit;
    }
    return true;
}

function directStamp(unit: HTMLElement) {
    return unit.querySelector<HTMLTimeElement>(':scope > time[data-bloom="timestamp"]');
}

function stamp(unit: HTMLElement) {
    const ids = unitMessageIds(unit);
    if (!ids.length || !isHydrated(unit) || unit.querySelector("time:not([data-bloom])")) return;
    const role = unitRole(unit);
    const target = anchorFor(unit, role);
    if (target !== unit && !isAnchorOwner(unit, target)) {
        directStamp(unit)?.remove();
        return;
    }
    let time = timeFor(ids);
    if (!time && isLive()) {
        time = Date.now();
        learn(ids.at(-1) as string, time);
    }
    const existing = target.querySelector<HTMLTimeElement>('time[data-bloom="timestamp"]') ?? directStamp(unit);
    if (!time || (settings.store.hideOwnMessages && role === "user")) {
        existing?.remove();
        return;
    }
    const text = format(time);
    if (existing?.textContent === text && existing.parentElement === target && existing === target.firstElementChild) return;
    const node = h("time", {
        class: `bloom-timestamp bloom-timestamp-${role ?? "assistant"}`,
        text,
        title: new Date(time).toLocaleString(),
        attrs: { "data-bloom": "timestamp", "datetime": new Date(time).toISOString() },
    });
    if (existing) existing.replaceWith(node);
    if (node.parentElement !== target) target.prepend(node);
    else if (node !== target.firstElementChild) target.prepend(node);
}

const render = frameScheduler(() => {
    for (const unit of outerMessageUnits()) stamp(unit);
});

export default definePlugin({
    name: "MessageTimestamps",
    description: "Show when each message was sent.",
    authors: ["Bloom contributors"],
    tags: ["chat"],
    icon: "clock",
    enabledByDefault: true,
    settings,
    styles,
    start() {
        unsubscribers = [
            watchBody(mutations => hostMutations(mutations) && render()),
            network.on("conversation", render),
            network.on("message-time", ({ messageId, time }) => {
                learn(messageId, time);
                render();
            }),
            generation.on("fall", () => {
                lastFallAt = Date.now();
            }),
        ];
    },
    stop() {
        for (const unsubscribe of unsubscribers) unsubscribe();
        if (saveTimer) {
            clearTimeout(saveTimer);
            save();
        }
        for (const node of document.querySelectorAll('time[data-bloom="timestamp"]')) node.remove();
    },
    onSettingsChange(key) {
        if (key === "stamps") return;
        for (const node of document.querySelectorAll('time[data-bloom="timestamp"]')) node.remove();
        render();
    },
});
