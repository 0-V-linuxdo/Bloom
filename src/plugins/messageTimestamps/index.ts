/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { generation, generationState } from "@host/generation";
import { conversationData, network } from "@host/network";
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

function stamp(unit: HTMLElement) {
    const ids = unitMessageIds(unit);
    if (!ids.length || unit.querySelector("time:not([data-bloom])")) return;
    let time = timeFor(ids);
    if (!time && isLive()) {
        time = Date.now();
        learn(ids.at(-1) as string, time);
    }
    const existing = unit.querySelector<HTMLTimeElement>(':scope > time[data-bloom="timestamp"]');
    if (!time || (settings.store.hideOwnMessages && unitRole(unit) === "user")) {
        existing?.remove();
        return;
    }
    const text = format(time);
    if (existing?.textContent === text) return;
    const node = h("time", { class: `bloom-timestamp bloom-timestamp-${unitRole(unit) ?? "assistant"}`, text, title: new Date(time).toLocaleString(), attrs: { "data-bloom": "timestamp", "datetime": new Date(time).toISOString() } });
    if (existing) existing.replaceWith(node);
    else unit.prepend(node);
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
