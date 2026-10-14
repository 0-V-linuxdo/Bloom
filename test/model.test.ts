/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { afterEach, beforeAll, describe, expect, test } from "bun:test";

import { applyModel, readModel } from "../src/host/model";

beforeAll(() => {
    HTMLElement.prototype.getClientRects = function () {
        return (this.isConnected ? [new DOMRect(0, 0, 120, 40)] : []) as unknown as DOMRectList;
    };
});

afterEach(() => {
    document.body.replaceChildren();
});

describe("composer model", () => {
    test("reads the switcher label and selects a menu item", () => {
        document.body.innerHTML = `
            <form>
                <textarea name="prompt"></textarea>
                <button type="button" data-testid="model-switcher-dropdown-button" aria-expanded="false">GPT-4o</button>
            </form>
            <div role="menu">
                <div role="menuitem" data-testid="model-switcher-gpt-5-4">GPT-5.4</div>
            </div>`;
        expect(readModel()).toEqual({ id: "GPT-4o", label: "GPT-4o" });
        const trigger = document.querySelector("button");
        document.querySelector("[data-testid='model-switcher-gpt-5-4']")?.addEventListener("click", () => {
            if (trigger) trigger.textContent = "GPT-5.4";
        });
        expect(applyModel({ id: "gpt-5-4", label: "GPT-5.4" })).toBe(true);
        expect(readModel()?.label).toBe("GPT-5.4");
    });
    test("reads the new picker by its reasoning effort and steps the power slider", () => {
        document.body.innerHTML = `
            <form>
                <div class="ProseMirror" contenteditable="true"></div>
                <button type="button" aria-label="Select ChatGPT model" aria-expanded="true" data-selected-reasoning-effort="high">Extra High</button>
            </form>
            <div role="menu"><div role="menuitem" aria-label="Power" data-reasoning-slider="true"><span role="slider" aria-valuemin="0" aria-valuemax="3" aria-valuenow="2"></span></div></div>`;
        const trigger = document.querySelector("button");
        expect(readModel()).toEqual({ id: "high", label: "high" });
        const keys: string[] = [];
        document.querySelector("[data-reasoning-slider]")?.addEventListener("keydown", event => {
            keys.push((event as KeyboardEvent).key);
            trigger?.setAttribute("data-selected-reasoning-effort", "max");
        });
        expect(applyModel({ id: "max", label: "Extra High" })).toBe(false);
        expect(keys).toHaveLength(1);
        expect(applyModel({ id: "max", label: "Extra High" })).toBe(true);
    });
});
