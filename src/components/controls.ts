/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { classes } from "@utils/css";
import { h } from "@utils/dom";
import type { SelectOption } from "@utils/types";

import { icon, type IconName } from "./icons";

export function switchControl(checked: boolean, onChange: (checked: boolean) => void, label: string) {
    const el = h("button", { class: "bloom-switch", attrs: { "type": "button", "role": "switch", "aria-checked": String(checked), "aria-label": label } });
    el.addEventListener("click", event => {
        event.stopPropagation();
        const next = el.getAttribute("aria-checked") !== "true";
        el.setAttribute("aria-checked", String(next));
        onChange(next);
    });
    return el;
}

export function button(label: string, onClick: () => void, variant?: "danger") {
    return h("button", { class: classes("bloom-button", variant && `bloom-button-${variant}`), text: label, attrs: { type: "button" }, on: { click: onClick } });
}

export function iconButton(name: IconName, label: string, onClick: (event: MouseEvent) => void, pressed?: boolean) {
    const el = h("button", { class: "bloom-icon-button", title: label, attrs: { "type": "button", "aria-label": label }, on: { click: onClick } }, icon(name));
    if (pressed != null) el.setAttribute("aria-pressed", String(pressed));
    return el;
}

export function slider(value: number, min: number, max: number, step: number, unit: string, onChange: (value: number) => void) {
    const input = h("input", { attrs: { type: "range", min: String(min), max: String(max), step: String(step) } });
    input.value = String(value);
    const output = h("output", { text: `${input.value}${unit}` });
    input.addEventListener("input", () => {
        output.textContent = `${input.value}${unit}`;
        onChange(Number(input.value));
    });
    return h("div", { class: "bloom-slider" }, input, output);
}

export function select(value: string, options: readonly SelectOption[], onChange: (value: string) => void) {
    const el = h("select", { class: "bloom-select" }, ...options.map(option => h("option", { text: option.label, attrs: { value: option.value } })));
    el.value = value;
    el.addEventListener("change", () => onChange(el.value));
    return el;
}

export function textInput(value: string, onChange: (value: string) => void, placeholder = "", type = "text") {
    const el = h("input", { class: "bloom-input", attrs: { type, placeholder } });
    el.value = value;
    el.addEventListener("change", () => onChange(el.value));
    return el;
}
