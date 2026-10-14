/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { visible } from "@utils/dom";
import { normalizeText } from "@utils/misc";

import { composerForm } from "./composer";
import { Sel } from "./selectors";

export interface ComposerModel {
    id: string;
    label: string;
}

const DROPDOWN = "model-switcher-dropdown-button";
const EFFORT = "data-selected-reasoning-effort";

let sweep: "ArrowLeft" | "ArrowRight" = "ArrowLeft";

const slugOf = (testId: string) => testId.startsWith("model-switcher-") && testId !== DROPDOWN ? testId.slice("model-switcher-".length) : "";

export const sameModel = (left: ComposerModel, right: ComposerModel) =>
    left.id === right.id || (!!left.label && left.label === right.label);

export function modelTrigger() {
    const form = composerForm();
    return (form && visible<HTMLButtonElement>(Sel.modelTrigger, form)) ?? visible<HTMLButtonElement>(Sel.modelTrigger);
}

export function readModel(): ComposerModel | null {
    const trigger = modelTrigger();
    if (!trigger) return null;
    const open = trigger.getAttribute("aria-expanded") === "true";
    const effort = trigger.getAttribute(EFFORT);
    const label = effort && open ? "" : normalizeText(trigger.innerText);
    const id = effort || slugOf(trigger.getAttribute("data-testid") ?? "") || label;
    if (!id) return null;
    return { id, label: label || id };
}

function matchingItem(model: ComposerModel) {
    return [...document.querySelectorAll<HTMLElement>(Sel.modelItem)].find(el => {
        const slug = slugOf(el.getAttribute("data-testid") ?? "");
        const label = normalizeText(el.textContent ?? "");
        return slug === model.id || label === model.label || label === model.id;
    }) ?? null;
}

function stepEffort(slider: HTMLElement) {
    const thumb = slider.querySelector("[role=slider]");
    const now = Number(thumb?.getAttribute("aria-valuenow"));
    const max = Number(thumb?.getAttribute("aria-valuemax"));
    if (now <= 0) sweep = "ArrowRight";
    else if (now >= max) sweep = "ArrowLeft";
    slider.focus();
    slider.dispatchEvent(new KeyboardEvent("keydown", { key: sweep, code: sweep, bubbles: true, cancelable: true }));
}

export function applyModel(model: ComposerModel): boolean {
    const current = readModel();
    const trigger = modelTrigger();
    if (current && sameModel(current, model)) {
        if (trigger?.hasAttribute(EFFORT) && trigger.getAttribute("aria-expanded") === "true") document.querySelector("[role=menu]")?.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
        return true;
    }
    if (trigger?.hasAttribute(EFFORT)) {
        const slider = document.querySelector<HTMLElement>(Sel.effortSlider);
        if (slider) stepEffort(slider);
        else trigger.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, cancelable: true, button: 0, pointerType: "mouse", isPrimary: true }));
        return false;
    }
    const item = matchingItem(model);
    if (item) {
        item.click();
        const next = readModel();
        return !!next && sameModel(next, model);
    }
    if (trigger?.getAttribute("aria-expanded") !== "true") trigger?.click();
    return false;
}
