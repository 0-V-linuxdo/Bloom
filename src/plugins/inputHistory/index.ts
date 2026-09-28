/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
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

function showHud(index: number, total: number) {
    const input = composerInput();
    if (!input) return;
    hud ??= h("div", { class: `bloom-root ${cl("hud")}`, attrs: { "data-bloom": "history-hud", "aria-live": "polite" } });
    hud.textContent = `${index + 1} / ${total}`;
    const box = (input.closest("form") ?? input).getBoundingClientRect();
    hud.style.left = `${box.left + box.width / 2}px`;
    hud.style.top = `${box.top}px`;
    if (!hud.isConnected) document.body.append(hud);
}

function endBrowsing() {
    browsing = null;
    hud?.remove();
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

function onKeydown(event: KeyboardEvent) {
    if (event.isComposing || !isComposerInput(event.target)) return;
    const input = event.target;
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
    if (browsing && isComposerInput(event.target) && readDraft(event.target) !== browsing.shown.trim()) endBrowsing();
}

function onClick(event: MouseEvent) {
    if (event.target instanceof Element && event.target.closest(Sel.sendButton)) record(readDraft());
}

export default definePlugin({
    name: "InputHistory",
    description: "Press ↑ and ↓ in the composer to bring back prompts you sent before.",
    authors: ["Bloom contributors"],
    tags: ["chat"],
    icon: "history",
    enabledByDefault: true,
    settings,
    styles,
    start() {
        controller = new AbortController();
        const { signal } = controller;
        document.addEventListener("keydown", onKeydown, { capture: true, signal });
        document.addEventListener("input", onInput, { capture: true, signal });
        document.addEventListener("click", onClick, { capture: true, signal });
        document.addEventListener("submit", () => record(readDraft()), { capture: true, signal });
    },
    stop() {
        controller?.abort();
        endBrowsing();
    },
    onSettingsChange(key) {
        if (key === "maxEntries") saveEntries(entries());
    },
});
