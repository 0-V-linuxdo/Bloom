/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { composerForm } from "@host/composer";
import { generation } from "@host/generation";
import { conversationData, network, type Role } from "@host/network";
import { currentConversationId, onRouteChange } from "@host/route";
import { chainSummary, listTurns, threadScroller, type Turn, turnSummary } from "@host/thread";
import { classes, classNameFactory } from "@utils/css";
import { frameScheduler, h, hostMutations, watchBody } from "@utils/dom";
import { truncate } from "@utils/misc";
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
let controller: AbortController | undefined;

const shown = (item: { role: Role; }) => settings.store.showAssistant || item.role === "user";

function collect(): Entry[] {
    const fromDom = listTurns().reduce<Entry[]>((out, turn) => {
        const entry = { role: turn.role, summary: turnSummary(turn), ids: turn.messageIds, turn, streaming: turn.streaming };
        const previous = out.at(-1);
        if (previous?.role === "assistant" && entry.role === "assistant") out[out.length - 1] = { ...entry, ids: [...previous.ids, ...entry.ids] };
        else out.push(entry);
        return out;
    }, []).filter(shown);
    const chain = (conversationData(currentConversationId())?.chain ?? []).filter(shown);
    if (!chain.length) return fromDom;
    const chainIds = new Set(chain.map(message => message.id));
    const byId = new Map(fromDom.flatMap(entry => entry.ids.map(id => [id, entry] as const)));
    const before = new Map<Entry, Entry[]>();
    let loose: Entry[] = [];
    for (const entry of fromDom) {
        if (!entry.ids.some(id => chainIds.has(id))) loose.push(entry);
        else {
            before.set(entry, loose);
            loose = [];
        }
    }
    const used = new Set<Entry>();
    const merged: Entry[] = [];
    for (const message of chain) {
        const dom = byId.get(message.id);
        if (dom && used.has(dom)) continue;
        if (dom) {
            used.add(dom);
            merged.push(...before.get(dom) ?? []);
        }
        merged.push(dom ?? { role: message.role, summary: chainSummary(message), ids: [message.id], turn: null, streaming: false });
    }
    return [...merged, ...loose];
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
        attrs: { "type": "button", "data-index": String(index) },
        on: { click: () => jump(index) },
    }, h("span", { text: EMOJI[entry.role] }), h("span", { class: "bloom-truncate", text: truncate(entry.summary || "…", SUMMARY_CHARS) }));
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
    }
    root ??= h("div", { class: `bloom-root ${cl("root")}`, attrs: { "data-bloom": "navigator" } },
        h("div", { class: cl("rail") }),
        h("div", { class: cl("toc") }, h("div", { class: cl("toc-head") }), h("div", { class: cl("toc-list") })));
    if (!root.isConnected) document.body.append(root);
    const scrollBox = scroller.getBoundingClientRect();
    const bottom = Math.min(scrollBox.bottom, composerForm()?.getBoundingClientRect().top ?? scrollBox.bottom);
    root.style.right = `${document.documentElement.clientWidth - scrollBox.left - scroller.clientLeft - scroller.clientWidth + RAIL_GAP_PX}px`;
    root.style.top = `${(scrollBox.top + bottom) / 2}px`;
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
    root?.querySelector(`.${cl("rail")}`)?.replaceChildren(...entries.map((entry, index) =>
        h("button", {
            class: classes(cl("tick"), cl(`tick-${entry.role}`), entry.streaming && cl("tick-streaming"), index === current && cl("tick-current")),
            title: truncate(entry.summary, SUMMARY_CHARS),
            attrs: { "type": "button", "aria-label": `Jump to message ${index + 1}` },
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
    },
    stop() {
        for (const unsubscribe of unsubscribers) unsubscribe();
        controller?.abort();
        scrollTarget = null;
        removeEventListener("keydown", onKeydown, true);
        removeEventListener("resize", update);
        root?.remove();
        root = null;
        signature = "";
    },
    onSettingsChange: update,
});
