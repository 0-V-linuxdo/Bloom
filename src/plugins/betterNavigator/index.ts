/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { composerForm } from "@host/composer";
import { generation, generationState } from "@host/generation";
import { conversationData, network, type Role } from "@host/network";
import { currentConversationId, onRouteChange } from "@host/route";
import { chainSummary, isReversedScroller, listTurns, threadScroller, type Turn, turnSummary } from "@host/thread";
import { classes, classNameFactory } from "@utils/css";
import { frameScheduler, h, hostMutations, watchBody } from "@utils/dom";
import { normalizeText, truncate } from "@utils/misc";
import definePlugin, { OptionType } from "@utils/types";

import styles from "./styles.css";

const cl = classNameFactory("bloom-nav-");

const SUMMARY_CHARS = 80;
const HIGHLIGHT_MS = 1200;
const NEAR_SCREENS = 2;
const SEEK_MS = 30_000;
const SEEK_POLL_MS = 200;
const SEEK_PAGE = 0.9;
const READING_LINE = 0.3;
const RAIL_GAP_PX = 12;
const EMOJI: Record<Role, string> = { user: "❓", assistant: "🤖" };
const USER_SCROLL = ["wheel", "touchmove", "pointerdown"] as const;

const settings = definePluginSettings({
    showAssistant: { type: OptionType.BOOLEAN, description: "List ChatGPT's replies in the navigator too, not only your messages.", default: true },
    jumpEffect: {
        type: OptionType.SELECT,
        description: "Effect on the message you jump to.",
        options: [{ label: "Border", value: "border" }, { label: "None", value: "none" }],
        default: "border",
    },
});

interface Entry {
    role: Role;
    summary: string;
    ids: string[];
    turn: Turn | null;
    streaming: boolean;
}

let root: HTMLElement | null = null;
let entries: Entry[] = [];
let current = -1;
let aim = -1;
let home: { chat: string | null; first: string | undefined; until: number; } | null = null;
let signature = "";
let seeking = 0;
let unsubscribers: (() => void)[] = [];
let scrollTarget: HTMLElement | null = null;
let watchedForm: HTMLElement | null = null;
let resizeObserver: ResizeObserver | undefined;
let controller: AbortController | undefined;
let heldChat = "";
let held: Held[] = [];

const shown = (item: { role: Role; }) => settings.store.showAssistant || item.role === "user";

interface Held {
    key: string;
    entries: Entry[];
}

const turnKeyOf = (turn: Turn) => turn.el.closest("[data-turn-key]")?.getAttribute("data-turn-key") || turn.messageIds[0] || turn.role;

function entryFromTurn(turn: Turn): Entry {
    return { role: turn.role, summary: turnSummary(turn), ids: turn.messageIds, turn, streaming: turn.streaming };
}

function pushEntry(group: Held, entry: Entry) {
    const previous = group.entries.at(-1);
    if (previous?.role === "assistant" && entry.role === "assistant") {
        group.entries[group.entries.length - 1] = { ...entry, ids: [...new Set([...previous.ids, ...entry.ids])] };
        return;
    }
    group.entries.push(entry);
}

function liveGroups(): Held[] {
    const groups: Held[] = [];
    for (const turn of listTurns()) {
        const entry = entryFromTurn(turn);
        const key = turnKeyOf(turn);
        const last = groups.at(-1);
        if (last?.key === key) pushEntry(last, entry);
        else groups.push({ key, entries: [entry] });
    }
    return groups;
}

function chainGroups(): Held[] {
    const groups: Held[] = [];
    for (const message of conversationData(currentConversationId())?.chain ?? []) {
        const entry: Entry = { role: message.role, summary: chainSummary(message), ids: [message.id], turn: null, streaming: false };
        const last = groups.at(-1);
        if (message.role === "assistant" && last) pushEntry(last, entry);
        else groups.push({ key: message.id, entries: [entry] });
    }
    return groups;
}

const groupIds = (group: Held) => group.entries.flatMap(entry => entry.ids);

function sharesId(left: Held, right: Held) {
    const ids = new Set(groupIds(left));
    return groupIds(right).some(id => ids.has(id));
}

const userText = (group: Held) => normalizeText(group.entries.find(entry => entry.role === "user")?.summary ?? "");

const textCount = (groups: Held[], text: string) => groups.filter(group => userText(group) === text).length;

const blank = (entry: Entry): Entry => ({ ...entry, turn: null, streaming: false });

function releaseStale(memory: Held[], live: Held[]) {
    const claimed = new Set(live.flatMap(group => group.entries.map(entry => entry.turn?.el)).filter(el => el != null));
    return memory.map(group => ({
        key: group.key,
        entries: group.entries.map(entry => {
            const el = entry.turn?.el;
            if (!el || !el.isConnected || claimed.has(el)) return blank(entry);
            const host = el.closest("[data-turn-key]")?.getAttribute("data-turn-key");
            return host && host !== group.key ? blank(entry) : entry;
        }),
    }));
}

function absorb(into: Held, live: Held): Held {
    const entries = live.entries.map((entry, index) => {
        const previous = into.entries[index];
        if (!previous) return entry;
        const ids = [...new Set([...entry.ids, ...previous.ids])];
        return { ...entry, ids, summary: entry.summary || previous.summary };
    });
    for (const entry of into.entries.slice(entries.length)) entries.push(blank(entry));
    return { key: into.key, entries };
}

function nearerTop() {
    const scroller = threadScroller();
    if (!scroller) return false;
    const min = scroller.clientHeight - scroller.scrollHeight;
    return scroller.scrollTop - min <= Math.abs(scroller.scrollTop);
}

function placeLive(memory: Held[], live: Held[]) {
    const next = releaseStale(memory, live);
    if (!live.length) return next;
    if (!next.length) return live;
    const knownAt = live.findIndex(group => next.some(item => item.key === group.key));
    if (knownAt < 0) return nearerTop() ? live.concat(next) : next.concat(live);
    const anchorKey = live[knownAt]?.key;
    const anchor = next.findIndex(item => item.key === anchorKey);
    const placed = next.slice(0, anchor).concat(live.slice(0, knownAt), next.slice(anchor));
    let cursor = placed.findIndex(item => item.key === anchorKey);
    for (let index = knownAt; index < live.length; index++) {
        const group = live[index];
        if (!group) continue;
        const at = placed.findIndex(item => item.key === group.key);
        if (at >= 0) {
            const previous = placed[at];
            if (previous) placed[at] = absorb(previous, group);
            cursor = at;
        } else {
            placed.splice(cursor + 1, 0, group);
            cursor++;
        }
    }
    return placed;
}

function alignment(memory: Held[], chain: Held[]) {
    let bestScore = 0;
    let bestIds = 0;
    let bestOffset = 0;
    for (let offset = 1 - memory.length; offset < chain.length; offset++) {
        let score = 0;
        let idHits = 0;
        for (let index = 0; index < memory.length; index++) {
            const other = chain[index + offset];
            const item = memory[index];
            if (!other || !item) continue;
            if (sharesId(item, other)) {
                score += 3;
                idHits++;
            } else if (userText(item) && userText(item) === userText(other)) score++;
        }
        const closer = nearerTop() ? offset < bestOffset : offset > bestOffset;
        if (score > bestScore || (score === bestScore && idHits > bestIds) || (score === bestScore && idHits === bestIds && closer)) {
            bestScore = score;
            bestIds = idHits;
            bestOffset = offset;
        }
    }
    return { score: bestScore, offset: bestOffset };
}

function paintChain(memory: Held, chain: Held): Held {
    const entries = memory.entries.map((entry, index) => {
        const other = chain.entries[index];
        if (!other) return entry;
        return { ...entry, ids: [...new Set([...entry.ids, ...other.ids])], summary: entry.summary || other.summary };
    });
    for (const extra of chain.entries.slice(entries.length)) entries.push({ ...extra, turn: null });
    return { key: memory.key, entries };
}

function cloneHeld(groups: Held[]) {
    return groups.map(group => ({ key: group.key, entries: group.entries.map(entry => ({ ...entry })) }));
}

function weave(memory: Held[], chain: Held[]) {
    if (!chain.length) return memory;
    if (!memory.length) return chain;
    const { score, offset } = alignment(memory, chain);
    const merged = cloneHeld(memory);
    if (score > 0) {
        for (let index = 0; index < merged.length; index++) {
            const other = chain[index + offset];
            const item = merged[index];
            if (!other || !item) continue;
            const text = userText(item);
            const unique = !!text && text === userText(other) && textCount(memory, text) === 1 && textCount(chain, text) === 1;
            if (sharesId(item, other) || unique) merged[index] = paintChain(item, other);
        }
    }
    const before: Held[] = [];
    const after: Held[] = [];
    for (let chainIndex = 0; chainIndex < chain.length; chainIndex++) {
        const group = chain[chainIndex];
        if (!group) continue;
        const text = userText(group);
        if (!text || textCount(merged, text) > 0 || merged.some(item => sharesId(item, group))) continue;
        if (score > 0 && chainIndex < offset) before.push(group);
        else after.push(group);
    }
    return before.concat(merged, after);
}

function listed(): Entry[] {
    const chat = currentConversationId() ?? "";
    if (chat !== heldChat) {
        heldChat = chat;
        held = [];
    }
    held = weave(placeLive(held, liveGroups()), chainGroups());
    return held.flatMap(group => group.entries).filter(shown);
}

function markOpenTurn(items: Entry[]) {
    for (const item of items) item.streaming = !!item.turn?.el.isConnected && !!item.turn.streaming;
    if (!generationState().generating || items.some(item => item.streaming)) return;
    const tail = items.at(-1);
    if (!tail) return;
    if (tail.role === "assistant" || !settings.store.showAssistant) tail.streaming = true;
    else items.push({ role: "assistant", summary: "", ids: [], turn: null, streaming: true });
}

function collect(): Entry[] {
    const items = listed();
    markOpenTurn(items);
    return items;
}

function readingIndex(scroller: HTMLElement) {
    const box = scroller.getBoundingClientRect();
    const line = box.top + box.height * READING_LINE;
    let best = -1;
    entries.forEach((entry, index) => {
        const rect = entry.turn?.el.getBoundingClientRect();
        if (rect && rect.top <= line) best = index;
    });
    return best === -1 ? entries.findIndex(entry => entry.turn) : best;
}

function highlight(el: HTMLElement) {
    if (settings.store.jumpEffect !== "border") return;
    el.classList.add(cl("flash"));
    setTimeout(() => el.classList.remove(cl("flash")), HIGHLIGHT_MS);
}

function jump(index: number) {
    const entry = entries[index];
    const scroller = threadScroller();
    if (!entry || !scroller) return;
    if (!entry.turn && !entry.ids.length) {
        aim = index;
        markCurrent();
        scroller.scrollTo({ top: isReversedScroller(scroller) ? 0 : scroller.scrollHeight });
        return;
    }
    aim = index;
    home = index ? null : { chat: currentConversationId(), first: entry.ids[0], until: Date.now() + SEEK_MS };
    markCurrent();
    const el = entry.turn?.el;
    if (el?.isConnected) {
        const distance = Math.abs(el.getBoundingClientRect().top - scroller.getBoundingClientRect().top);
        el.scrollIntoView({ block: "start", behavior: distance < scroller.clientHeight * NEAR_SCREENS ? "smooth" : "auto" });
        highlight(el);
        return;
    }
    const mounted = entries.findIndex(item => item.turn);
    const direction = mounted >= 0 && index < mounted ? -1 : 1;
    const token = ++seeking;
    const deadline = Date.now() + SEEK_MS;
    const seek = () => {
        const pane = threadScroller();
        if (token !== seeking || Date.now() > deadline || !pane) return;
        entries = collect();
        const found = entries.find(item => item.ids.some(id => entry.ids.includes(id)))?.turn?.el;
        if (found) {
            found.scrollIntoView({ block: "start" });
            highlight(found);
            aim = entries.findIndex(item => item.turn?.el === found);
            markCurrent();
            return;
        }
        const top = pane.scrollTop;
        pane.scrollBy({ top: direction * pane.clientHeight * SEEK_PAGE, behavior: "instant" });
        if (pane.scrollTop === top) setTimeout(seek, SEEK_POLL_MS);
        else requestAnimationFrame(seek);
    };
    seek();
}

function row(entry: Entry, index: number) {
    return h("button", {
        class: cl("row"),
        attrs: { "type": "button", "data-index": String(index), "data-message-id": entry.ids[0] ?? "" },
        on: { click: () => jump(index) },
    }, h("span", { text: EMOJI[entry.role] }), h("span", { class: "bloom-truncate", text: truncate(entry.summary || "…", SUMMARY_CHARS) }));
}

function pin(scroller: HTMLElement) {
    if (!root) return;
    const scrollBox = scroller.getBoundingClientRect();
    const composerTop = composerForm()?.getBoundingClientRect().top;
    const bottom = Math.min(scrollBox.bottom, composerTop && composerTop > scrollBox.top ? composerTop : scrollBox.bottom);
    const height = bottom - scrollBox.top;
    root.style.right = `${document.documentElement.clientWidth - scrollBox.left - scroller.clientLeft - scroller.clientWidth + RAIL_GAP_PX}px`;
    root.style.top = `${scrollBox.top}px`;
    root.style.height = height > 1 ? `${height}px` : "";
}

function render() {
    const scroller = threadScroller();
    entries = collect();
    if (!entries.length || !scroller) {
        root?.remove();
        root = null;
        signature = "";
        return;
    }
    if (scrollTarget !== scroller) {
        controller?.abort();
        controller = new AbortController();
        scroller.addEventListener("scroll", frameScheduler(markCurrent), { passive: true, signal: controller.signal });
        for (const type of USER_SCROLL) scroller.addEventListener(type, release, { passive: true, signal: controller.signal });
        scrollTarget = scroller;
        resizeObserver?.disconnect();
        resizeObserver = new ResizeObserver(() => {
            if (scroller.isConnected) pin(scroller);
        });
        resizeObserver.observe(scroller);
        watchedForm = null;
    }
    const form = composerForm();
    if (form && form !== watchedForm && resizeObserver) {
        resizeObserver.observe(form);
        watchedForm = form;
    }
    root ??= h("div", { class: `bloom-root ${cl("root")}`, attrs: { "data-bloom": "navigator" } },
        h("div", { class: cl("rail") }),
        h("div", { class: cl("toc") }, h("div", { class: cl("toc-head") }), h("div", { class: cl("toc-list") })));
    if (!root.isConnected) document.body.append(root);
    pin(scroller);
    const next = JSON.stringify(entries.map(entry => [entry.role, entry.ids]));
    if (next !== signature) {
        signature = next;
        aim = -1;
        rebuild();
        if (home && Date.now() < home.until && home.chat === currentConversationId() && entries[0]?.ids[0] !== home.first) jump(0);
    } else {
        patch();
    }
    markCurrent();
}

function markCurrent() {
    if (!root || !scrollTarget) return;
    current = aim >= 0 ? aim : readingIndex(scrollTarget);
    root.querySelectorAll(`.${cl("tick")}`).forEach((tick, index) => tick.classList.toggle(cl("tick-current"), index === current));
    root.querySelectorAll<HTMLElement>(`.${cl("row")}`).forEach(row => row.setAttribute("aria-current", String(Number(row.dataset.index) === current)));
    const head = root.querySelector(`.${cl("toc-head")}`);
    if (head) head.textContent = `${current + 1} / ${entries.length}`;
}

function patch() {
    root?.querySelectorAll<HTMLElement>(`.${cl("tick")}`).forEach((tick, index) => {
        const entry = entries[index];
        const title = truncate(entry.summary, SUMMARY_CHARS);
        if (tick.title !== title) tick.title = title;
        tick.classList.toggle(cl("tick-streaming"), entry.streaming);
    });
    root?.querySelectorAll<HTMLElement>(`.${cl("row")}`).forEach(row => {
        const label = row.lastElementChild;
        const text = truncate(entries[Number(row.dataset.index)].summary || "…", SUMMARY_CHARS);
        if (label && label.textContent !== text) label.textContent = text;
    });
}

function rebuild() {
    const rail = root?.querySelector(`.${cl("rail")}`);
    rail?.replaceChildren(...entries.map((entry, index) =>
        h("button", {
            class: classes(cl("tick"), cl(`tick-${entry.role}`), entry.streaming && cl("tick-streaming"), index === current && cl("tick-current")),
            title: truncate(entry.summary, SUMMARY_CHARS),
            attrs: { "type": "button", "aria-label": `Jump to message ${index + 1}`, "data-message-id": entry.ids[0] ?? "" },
            on: { click: () => jump(index) },
        })));
    root?.querySelector(`.${cl("toc-list")}`)?.replaceChildren(...entries.map(row));
}

const update = frameScheduler(render);

function release() {
    aim = -1;
    home = null;
    seeking++;
}

const isEditable = (el: Element | null) => !!el && (el.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']") || !!el.closest("[contenteditable='true']"));

function onKeydown(event: KeyboardEvent) {
    if (!root || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || isEditable(document.activeElement) || document.querySelector("[data-bloom='settings'], [role='dialog']")) return;
    const targets: Record<string, number> = { ArrowUp: current - 1, ArrowDown: current + 1, Home: 0, End: entries.length - 1 };
    const target = targets[event.key];
    if (target == null) {
        release();
        return;
    }
    if (target < 0 || target >= entries.length) return;
    event.preventDefault();
    event.stopPropagation();
    jump(target);
}

export default definePlugin({
    name: "BetterNavigator",
    description: "An outline beside the thread: one tick per message, hover for the list, click to jump.",
    authors: ["Bloom contributors"],
    tags: ["chat", "ui"],
    icon: "list",
    enabledByDefault: true,
    settings,
    styles,
    start() {
        unsubscribers = [
            watchBody(mutations => hostMutations(mutations) && update()),
            onRouteChange(update),
            network.on("conversation", update),
            generation.on("rise", update),
            generation.on("fall", update),
        ];
        addEventListener("keydown", onKeydown, true);
        addEventListener("resize", update, { passive: true });
        update();
    },
    stop() {
        for (const unsubscribe of unsubscribers) unsubscribe();
        controller?.abort();
        resizeObserver?.disconnect();
        resizeObserver = undefined;
        scrollTarget = null;
        watchedForm = null;
        removeEventListener("keydown", onKeydown, true);
        removeEventListener("resize", update);
        root?.remove();
        root = null;
        signature = "";
        held = [];
        heldChat = "";
    },
    onSettingsChange: update,
});
