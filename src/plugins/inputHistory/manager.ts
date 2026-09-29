/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { onSettingChange } from "@api/Settings";
import { button, iconButton } from "@components/controls";
import { classNameFactory } from "@utils/css";
import { h } from "@utils/dom";
import { copyToClipboard } from "@utils/misc";

import { saveEntries, settings } from "./index";

const cl = classNameFactory("bloom-history-");

const PAGE_SIZE = 10;
const CLEAR_CONFIRM_MS = 3000;

export function historyManager(host: HTMLElement) {
    let query = "";
    let page = 0;
    const expanded = new Set<string>();

    const search = h("input", { class: "bloom-input", attrs: { "type": "search", "placeholder": "Search history...", "aria-label": "Search history" } });
    const list = h("div", { class: cl("list") });
    const pager = h("div", { class: cl("pager") });
    let armed: ReturnType<typeof setTimeout> | undefined;
    const clear = button("Clear all", () => {
        if (!armed) {
            clear.textContent = "Click again to clear";
            armed = setTimeout(() => {
                armed = undefined;
                clear.textContent = "Clear all";
            }, CLEAR_CONFIRM_MS);
            return;
        }
        clearTimeout(armed);
        armed = undefined;
        clear.textContent = "Clear all";
        saveEntries([]);
    }, "danger");

    function render() {
        const all = [...settings.store.entries].toReversed();
        const needle = query.trim().toLowerCase();
        const matches = needle ? all.filter(entry => entry.toLowerCase().includes(needle)) : all;
        const pages = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
        page = Math.min(page, pages - 1);
        const rows = matches.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE).map(entry =>
            h("div", { class: cl("row") },
                h("button", {
                    class: cl("text", expanded.has(entry) ? "text-open" : "text-closed"),
                    text: entry,
                    title: expanded.has(entry) ? "Collapse" : "Expand",
                    attrs: { type: "button" },
                    on: {
                        click: () => {
                            if (!expanded.delete(entry)) expanded.add(entry);
                            render();
                        },
                    },
                }),
                iconButton("copy", "Copy", () => void copyToClipboard(entry)),
                iconButton("trash", "Delete", () => saveEntries(settings.store.entries.filter(item => item !== entry)))));
        list.replaceChildren(...rows.length ? rows : [h("div", { class: "bloom-muted", text: needle ? "No matching prompts." : "No saved prompts yet." })]);
        pager.replaceChildren(
            h("span", { class: "bloom-muted", text: `${matches.length} ${needle ? "matching" : "saved"} · page ${page + 1} of ${pages}` }),
            button("Previous", () => {
                page--;
                render();
            }),
            button("Next", () => {
                page++;
                render();
            }),
            clear);
        const [prev, next] = pager.querySelectorAll("button");
        prev.disabled = page === 0;
        next.disabled = page >= pages - 1;
        clear.disabled = !all.length;
    }

    search.addEventListener("input", () => {
        query = search.value;
        page = 0;
        render();
    });
    host.append(h("div", { class: cl("manager") }, search, list, pager));
    render();
    const unsubscribe = onSettingChange((plugin, key) => plugin === "InputHistory" && key === "entries" && render());
    return () => {
        unsubscribe();
        clearTimeout(armed);
        host.replaceChildren();
    };
}
