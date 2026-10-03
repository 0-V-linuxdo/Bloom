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
    const label = normalizeText(trigger.innerText);
    const id = slugOf(trigger.getAttribute("data-testid") ?? "") || label;
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

export function applyModel(model: ComposerModel): boolean {
    const current = readModel();
    if (current && sameModel(current, model)) return true;
    const item = matchingItem(model);
    if (item) {
        item.click();
        const next = readModel();
        return !!next && sameModel(next, model);
    }
    const trigger = modelTrigger();
    if (trigger?.getAttribute("aria-expanded") !== "true") trigger?.click();
    return false;
}
