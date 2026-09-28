/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { onSettingChange } from "@api/Settings";
import { button, iconButton } from "@components/controls";
import { classNameFactory } from "@utils/css";
import { h } from "@utils/dom";

import { settings } from "./index";

const cl = classNameFactory("bloom-greeting-");

const MAX_GREETINGS = 30;
const MAX_CHARS = 100;

export function greetingsEditor(host: HTMLElement) {
    let editing = -1;

    const input = h("textarea", { class: `bloom-input ${cl("input")}`, attrs: { "maxlength": String(MAX_CHARS), "rows": "2", "placeholder": "New greeting", "aria-label": "Greeting text" } });
    const save = button("Add", commit);
    const list = h("div", { class: cl("list") });

    function commit() {
        const text = input.value.trim().slice(0, MAX_CHARS);
        if (!text) return;
        const current = [...settings.store.greetings];
        if (editing >= 0) current[editing] = text;
        else if (current.length < MAX_GREETINGS) current.push(text);
        settings.store.greetings = current;
        editing = -1;
        input.value = "";
        render();
    }

    function render() {
        const { greetings } = settings.store;
        save.textContent = editing >= 0 ? "Save" : "Add";
        save.disabled = editing < 0 && greetings.length >= MAX_GREETINGS;
        list.replaceChildren(...greetings.length ? greetings.map((text, index) =>
            h("div", { class: cl("row", index === editing ? "row-editing" : "row-idle") },
                h("div", { class: cl("text"), text }),
                iconButton("edit", "Edit", () => {
                    editing = index;
                    input.value = text;
                    input.focus();
                    render();
                }),
                iconButton("trash", "Delete", () => {
                    settings.store.greetings = greetings.filter((_, i) => i !== index);
                    if (editing === index) editing = -1;
                    render();
                }))) : [h("div", { class: "bloom-muted", text: "No greetings. The official heading stays." })]);
    }

    input.addEventListener("keydown", event => {
        if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) commit();
    });
    host.append(h("div", { class: cl("editor") }, list, h("div", { class: cl("form") }, input, save)));
    render();
    const unsubscribe = onSettingChange((plugin, key) => plugin === "GreetingCustomizer" && key === "greetings" && render());
    return () => {
        unsubscribe();
        host.replaceChildren();
    };
}
