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

const SOURCE_ZONES = [
    { label: "UTC", value: "UTC" },
    { label: "美国东部", value: "America/New_York" },
    { label: "美国中部", value: "America/Chicago" },
    { label: "美国山地", value: "America/Denver" },
    { label: "美国西部", value: "America/Los_Angeles" },
    { label: "日本", value: "Asia/Tokyo" },
    { label: "台湾", value: "Asia/Taipei" },
] as const;

const settings = definePluginSettings({
    sourceTimeZone: {
        type: OptionType.SELECT,
        description: "Zone the stored clock was written in. Leave UTC for ChatGPT create_time. Pick the same zone as the Shit GPT plugin only when that clock is a wall time in that zone; it is then shown in the system timezone.",
        options: SOURCE_ZONES,
        default: "UTC",
    },
    hideOwnMessages: { type: OptionType.BOOLEAN, description: "Don't add times to your own messages.", default: false },
    stamps: { type: OptionType.CUSTOM, default: {} as Record<string, number> },
});

const known = new Map<string, number>();
const liveIds = new Set<string>();
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

function systemZone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function sourceZone() {
    const zone = settings.store.sourceTimeZone;
    if (!zone || zone === "UTC") return "UTC";
    try {
        Intl.DateTimeFormat(undefined, { timeZone: zone });
        return zone;
    } catch {
        return "UTC";
    }
}

function zoneParts(ms: number, timeZone: string) {
    const bag: Record<string, string> = {};
    for (const part of new Intl.DateTimeFormat("en-US", {
        timeZone,
        hourCycle: "h23",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }).formatToParts(new Date(ms))) bag[part.type] = part.value;
    return { y: +bag.year, m: +bag.month, d: +bag.day, h: +bag.hour % 24, mi: +bag.minute, s: +bag.second };
}

function pack(parts: { y: number; m: number; d: number; h: number; mi: number; s: number }) {
    return Date.UTC(parts.y, parts.m - 1, parts.d, parts.h, parts.mi, parts.s);
}

function resolveWall(key: number, timeZone: string) {
    let instant = key;
    for (let i = 0; i < 4; i++) {
        const delta = key - pack(zoneParts(instant, timeZone));
        if (delta === 0) return instant;
        instant += delta;
    }
    return instant;
}

// Stored ChatGPT times are UTC instants. A non-UTC source treats those UTC
// fields as a wall clock in that zone (gap: hour after the jump; overlap: earlier).
function wallClockToInstant(ms: number, timeZone: string) {
    if (timeZone === "UTC") return ms;
    const frac = ((ms % 1000) + 1000) % 1000;
    const base = ms - frac;
    const date = new Date(base);
    const wantKey = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    const instant = resolveWall(wantKey, timeZone);
    const hour = 60 * 60 * 1000;
    let earliest = Number.POSITIVE_INFINITY;
    for (const shift of [-hour, 0, hour]) {
        const candidate = instant + shift;
        if (pack(zoneParts(candidate, timeZone)) === wantKey && candidate < earliest) earliest = candidate;
    }
    if (earliest !== Number.POSITIVE_INFINITY) return earliest + frac;
    return resolveWall(wantKey + hour, timeZone) + frac;
}

function displayInstant(ms: number, absolute: boolean) {
    const zone = sourceZone();
    if (absolute || zone === "UTC") return ms;
    return wallClockToInstant(ms, zone);
}

function dayKey(ms: number, timeZone: string) {
    return new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(ms);
}

function formatInstant(instant: number) {
    const zone = systemZone();
    const now = Date.now();
    const clock: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", timeZone: zone };
    if (dayKey(instant, zone) === dayKey(now, zone)) return new Intl.DateTimeFormat(undefined, clock).format(instant);
    const yearOf = (ms: number) => new Intl.DateTimeFormat("en-CA", { timeZone: zone, year: "numeric" }).format(ms);
    const year = yearOf(instant) === yearOf(now) ? {} : { year: "numeric" as const };
    return new Intl.DateTimeFormat(undefined, { ...year, month: "short", day: "numeric", ...clock }).format(instant);
}

function titleFor(stored: number, instant: number) {
    const system = new Date(instant).toLocaleString(undefined, { timeZone: systemZone() });
    const zone = sourceZone();
    if (zone === "UTC" || instant === stored) return system;
    const wall = new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
    }).format(stored);
    const label = SOURCE_ZONES.find(item => item.value === zone)?.label ?? zone;
    return `${label} ${wall} → ${system}`;
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
    let absolute = false;
    if (!time && isLive()) {
        time = Date.now();
        const id = ids.at(-1) as string;
        liveIds.add(id);
        learn(id, time);
        absolute = true;
    } else if (time && liveIds.has(ids.at(-1) as string)) absolute = true;
    const existing = target.querySelector<HTMLTimeElement>('time[data-bloom="timestamp"]') ?? directStamp(unit);
    if (!time || (settings.store.hideOwnMessages && role === "user")) {
        existing?.remove();
        return;
    }
    const instant = displayInstant(time, absolute);
    const text = formatInstant(instant);
    if (existing?.textContent === text && existing.parentElement === target && existing === target.firstElementChild) return;
    const node = h("time", {
        class: `bloom-timestamp bloom-timestamp-${role ?? "assistant"}`,
        text,
        title: titleFor(time, instant),
        attrs: { "data-bloom": "timestamp", "datetime": new Date(instant).toISOString() },
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
                liveIds.delete(messageId);
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
