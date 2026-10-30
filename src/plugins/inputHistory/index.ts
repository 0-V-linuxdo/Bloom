/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { iconButton } from "@components/controls";
import { caretLine, composerInput, isComposerInput, readDraft, writeDraft } from "@host/composer";
import { Sel } from "@host/selectors";
import { classNameFactory } from "@utils/css";
import { h } from "@utils/dom";
import definePlugin, { OptionType } from "@utils/types";

import { historyManager } from "./manager";
import styles from "./styles.css";

const cl = classNameFactory("bloom-history-");

const DEDUPE_MS = 2000;

export const settings = definePluginSettings({
    maxEntries: { type: OptionType.SLIDER, description: "How many sent prompts to keep.", min: 10, max: 500, step: 10, default: 100 },
    manager: { type: OptionType.COMPONENT, description: "Search, copy or delete saved prompts.", render: host => historyManager(host) },
    entries: { type: OptionType.CUSTOM, default: [] as string[] },
});

interface Browsing {
    index: number;
    draft: string;
    shown: string;
}

let browsing: Browsing | null = null;
let lastRecord = { text: "", at: 0 };
let hud: HTMLElement | null = null;
let dialog: { root: HTMLElement; release: () => void; controller: AbortController } | null = null;
let controller: AbortController | undefined;

const entries = () => settings.store.entries.filter(entry => typeof entry === "string");

export function saveEntries(next: string[]) {
    settings.store.entries = next.slice(-settings.store.maxEntries);
}

function record(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const now = Date.now();
    if (trimmed === lastRecord.text && now - lastRecord.at < DEDUPE_MS) return;
    lastRecord = { text: trimmed, at: now };
    saveEntries([...entries().filter(entry => entry !== trimmed), trimmed]);
}

function keepFocus(event: MouseEvent) {
    event.preventDefault();
}

function hudElement() {
    const count = h("button", { class: cl("hud-count"), attrs: { type: "button" }, on: { mousedown: keepFocus, click: openHistory } });
    const exit = h("button", { class: cl("hud-x"), text: "\u00D7", attrs: { "type": "button", "aria-label": "Exit history" }, on: { mousedown: keepFocus, click: cancelBrowsing } });
    return h("div", { class: `bloom-root ${cl("hud")}`, attrs: { "data-bloom": "history-hud", "role": "group", "aria-live": "polite", "aria-label": "Input history" } }, count, exit);
}

function showHud(index: number, total: number) {
    const input = composerInput();
    if (!input || dialog) return;
    hud ??= hudElement();
    const label = `${index + 1} / ${total}`;
    const count = hud.querySelector(`.${cl("hud-count")}`);
    count?.replaceChildren(label);
    count?.setAttribute("aria-label", `Show input history (${label})`);
    const box = (input.closest("form") ?? input).getBoundingClientRect();
    hud.style.left = `${box.left + box.width / 2}px`;
    hud.style.top = `${box.top}px`;
    if (!hud.isConnected) document.body.append(hud);
}

function endBrowsing() {
    browsing = null;
    hud?.remove();
}

function cancelBrowsing() {
    if (browsing) writeDraft(browsing.draft);
    endBrowsing();
    composerInput()?.focus();
}

function show(index: number) {
    const list = entries();
    if (!browsing) return;
    const text = list[index];
    browsing.index = index;
    browsing.shown = text;
    writeDraft(text);
    showHud(list.length - 1 - index, list.length);
}

function step(direction: -1 | 1) {
    const list = entries();
    if (!list.length) return false;
    if (!browsing) {
        if (direction === 1) return false;
        browsing = { index: list.length, draft: readDraft(), shown: "" };
    }
    const next = browsing.index + direction;
    if (next < 0) return true;
    if (next >= list.length) {
        writeDraft(browsing.draft);
        endBrowsing();
        return true;
    }
    show(next);
    return true;
}

function useEntry(entry: string) {
    const index = entries().indexOf(entry);
    closeHistory();
    if (index < 0) return;
    browsing ??= { index, draft: readDraft(), shown: "" };
    show(index);
    composerInput()?.focus();
}

function closeHistory() {
    if (!dialog) return;
    dialog.release();
    dialog.controller.abort();
    dialog.root.remove();
    dialog = null;
    const list = entries();
    if (browsing && list[browsing.index] === browsing.shown) showHud(list.length - 1 - browsing.index, list.length);
    else browsing = null;
}

function openHistory() {
    if (dialog) return;
    hud?.remove();
    const body = h("div", { class: cl("dialog-body") });
    const root = h("div", { class: `bloom-root ${cl("backdrop")}`, attrs: { "data-bloom": "history-dialog" }, on: { click: event => event.target === event.currentTarget && closeHistory() } },
        h("div", { class: cl("dialog"), attrs: { "role": "dialog", "aria-modal": "true", "aria-label": "Input history" } },
            h("div", { class: cl("dialog-header") },
                h("h2", { class: cl("dialog-title"), text: "Input history" }),
                iconButton("close", "Close", closeHistory)),
            body));
    root.addEventListener("keydown", event => event.stopPropagation());
    const dialogController = new AbortController();
    document.addEventListener("keydown", event => {
        if (event.key !== "Escape") return;
        event.preventDefault();
        event.stopPropagation();
        closeHistory();
    }, { capture: true, signal: dialogController.signal });
    document.body.append(root);
    dialog = { root, release: historyManager(body, useEntry), controller: dialogController };
    body.querySelector("input")?.focus();
}

function composerFrom(el: EventTarget | null) {
    if (isComposerInput(el)) return el;
    return el instanceof HTMLElement ? el.closest<HTMLElement>(Sel.composerInput) : null;
}

function composerPopupOpen() {
    const root = composerInput()?.closest("[data-chatgpt-composer], [data-composer-input], form");
    if (root?.querySelector('[aria-expanded="true"]')) return true;
    for (const el of document.querySelectorAll('[role="listbox"], [role="menu"], [data-radix-popper-content-wrapper], [cmdk-root], [cmdk-list]')) {
        if (!(el instanceof HTMLElement) || el.closest("[data-bloom]")) continue;
        const style = getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden") continue;
        return true;
    }
    return false;
}

function onKeydown(event: KeyboardEvent) {
    if (event.isComposing || event.key === "Process" || event.keyCode === 229) return;
    const input = composerFrom(event.target);
    if (!input) return;
    if (event.key === "Enter" && !event.shiftKey) {
        record(readDraft(input));
        endBrowsing();
        return;
    }
    if (event.key === "Escape" && browsing) {
        writeDraft(browsing.draft);
        endBrowsing();
        event.preventDefault();
        event.stopPropagation();
        return;
    }
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    if (event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (composerPopupOpen()) return;
    const line = caretLine(input);
    const up = event.key === "ArrowUp";
    if (!event.altKey && !(up ? line.first : line.last)) return;
    if (!up && !browsing) return;
    if (step(up ? -1 : 1)) {
        event.preventDefault();
        event.stopPropagation();
    }
}

function onInput(event: Event) {
    if (browsing && composerFrom(event.target) && readDraft() !== browsing.shown.trim()) endBrowsing();
}

function onClick(event: MouseEvent) {
    if (event.target instanceof Element && event.target.closest(Sel.sendButton)) record(readDraft());
}

export default definePlugin({
    name: "InputHistory",
    description: "Press ↑ and ↓ in the composer to bring back prompts you sent before. Click the counter to browse history.",
    authors: ["Bloom contributors"],
    tags: ["chat"],
    icon: "history",
    enabledByDefault: true,
    settings,
    styles,
    start() {
        for (const node of document.querySelectorAll('[data-bloom="history-hud"], [data-bloom="history-dialog"]')) node.remove();
        hud = null;
        controller = new AbortController();
        const { signal } = controller;
        document.addEventListener("keydown", onKeydown, { capture: true, signal });
        document.addEventListener("input", onInput, { capture: true, signal });
        document.addEventListener("click", onClick, { capture: true, signal });
        document.addEventListener("submit", () => record(readDraft()), { capture: true, signal });
    },
    stop() {
        controller?.abort();
        closeHistory();
        endBrowsing();
        for (const node of document.querySelectorAll('[data-bloom="history-hud"]')) node.remove();
        hud = null;
    },
    onSettingsChange(key) {
        if (key === "maxEntries") saveEntries(entries());
    },
});
