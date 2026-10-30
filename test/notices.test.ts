/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { afterEach, describe, expect, test } from "bun:test";

import { closeNotice, hasNotice, showNotice } from "../src/api/Notices";
import { isNewPlugin, pluginIssue, reconcileSettings, registerPlugins, setPluginIssue } from "../src/api/PluginManager";
import { flushSettings, loadSettings, readSetting, STORAGE_KEY } from "../src/api/Settings";
import type { Plugin } from "../src/utils/types";

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const cards = () => [...document.querySelectorAll<HTMLElement>("[data-bloom-notice]")];
const plugin = (name: string, extra: Partial<Plugin> = {}): Plugin => ({ name, description: "", authors: [], tags: [], icon: "bloom", ...extra });

afterEach(() => {
    for (const card of cards()) closeNotice(card.dataset.bloomNotice ?? "");
    document.body.replaceChildren();
});

describe("notices", () => {
    test("shows a card with title, message and an action", () => {
        let acted = 0;
        showNotice({ key: "a", title: "Done", message: "Chat finished", action: { label: "Open", onClick: () => acted++ }, duration: 0 });
        const [card] = cards();
        expect(card.textContent).toContain("Done");
        expect(card.textContent).toContain("Chat finished");
        card.querySelector<HTMLButtonElement>(".bloom-notice-action")?.click();
        expect(acted).toBe(1);
        expect(hasNotice("a")).toBe(false);
    });

    test("the same key replaces the card instead of stacking", () => {
        showNotice({ key: "same", title: "First", duration: 0 });
        showNotice({ key: "same", title: "Second", duration: 0 });
        expect(cards()).toHaveLength(1);
        expect(cards()[0].textContent).toContain("Second");
    });

    test("clicking the card runs onClick and closes it, close runs onClose once", () => {
        let clicked = 0;
        let closed = 0;
        showNotice({ key: "c", title: "Open me", onClick: () => clicked++, onClose: () => closed++, duration: 0 });
        cards()[0].click();
        expect(clicked).toBe(1);
        expect(closed).toBe(1);
        expect(cards()).toHaveLength(0);
    });

    test("a timed notice closes itself and duration 0 stays", async () => {
        showNotice({ key: "timed", title: "Bye", duration: 20 });
        showNotice({ key: "sticky", title: "Stay", duration: 0 });
        await wait(60);
        expect(hasNotice("timed")).toBe(false);
        expect(hasNotice("sticky")).toBe(true);
    });

    test("keeps at most four cards, dropping the oldest", () => {
        for (const key of ["1", "2", "3", "4", "5"]) showNotice({ key, title: key, duration: 0 });
        expect(cards().map(card => card.dataset.bloomNotice)).toEqual(["2", "3", "4", "5"]);
    });
});

describe("plugin bookkeeping", () => {
    test("drops settings of removed plugins and marks only later additions as new", () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ plugins: { Kept: { enabled: true }, Gone: { enabled: true } } }));
        loadSettings();
        registerPlugins([plugin("Settings", { required: true }), plugin("Kept")]);
        reconcileSettings();
        flushSettings();
        expect(readSetting("Gone", "enabled")).toBeUndefined();
        expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}").plugins.Gone).toBeUndefined();
        expect(isNewPlugin("Kept")).toBe(false);
        registerPlugins([plugin("Added")]);
        reconcileSettings();
        expect(isNewPlugin("Added")).toBe(true);
        expect(isNewPlugin("Settings")).toBe(false);
    });

    test("plugin issues are set and cleared", () => {
        setPluginIssue("Kept", ["[data-turn-key]"]);
        expect(pluginIssue("Kept")).toEqual(["[data-turn-key]"]);
        setPluginIssue("Kept", null);
        expect(pluginIssue("Kept")).toBeUndefined();
    });
});
