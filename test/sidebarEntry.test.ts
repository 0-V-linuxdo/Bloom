/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { afterEach, describe, expect, test } from "bun:test";

import { registerPlugins } from "../src/api/PluginManager";
import { readSetting, writeSetting } from "../src/api/Settings";
import Settings from "../src/plugins/_core/settings";
import { LIVE_SHELL, mount, NEW_SHELL } from "./fixtures";

registerPlugins([Settings]);

const entries = () => [...document.querySelectorAll<HTMLElement>('[data-bloom="entry"]')];
const menuEntries = () => [...document.querySelectorAll('[data-bloom="menu-entry"]')];

function run(always: boolean, hover: boolean, menu = false) {
    if (always) writeSetting("Settings", "showSidebarEntry", true);
    if (hover) writeSetting("Settings", "showSidebarEntryOnHover", true);
    if (menu) writeSetting("Settings", "showAccountMenuEntry", true);
    if (!always) writeSetting("Settings", "showSidebarEntry", false);
    if (!hover) writeSetting("Settings", "showSidebarEntryOnHover", false);
    if (!menu) writeSetting("Settings", "showAccountMenuEntry", false);
    Settings.start?.();
}

afterEach(() => {
    Settings.stop?.();
    writeSetting("Settings", "showSidebarEntry");
    writeSetting("Settings", "showSidebarEntryOnHover");
    writeSetting("Settings", "showAccountMenuEntry");
    document.body.replaceChildren();
    Object.assign(globalThis, { BLOOM_APP: false });
});

describe("sidebar settings entry", () => {
    test("old entry switches are reset to the current defaults once", () => {
        mount(LIVE_SHELL);
        writeSetting("Settings", "entryRevision");
        writeSetting("Settings", "showSidebarEntry", false);
        writeSetting("Settings", "showSidebarEntryOnHover", true);
        Settings.start?.();
        expect(readSetting("Settings", "showSidebarEntry")).toBeUndefined();
        expect(readSetting("Settings", "showSidebarEntryOnHover")).toBeUndefined();
        expect(entries().every(node => !node.classList.contains("bloom-entry-hover"))).toBe(true);
        Settings.stop?.();
        writeSetting("Settings", "showSidebarEntryOnHover", true);
        Settings.start?.();
        expect(readSetting("Settings", "showSidebarEntryOnHover")).toBe(true);
    });

    test("defaults keep the always-on overlay and omit the account-menu row", () => {
        mount(LIVE_SHELL);
        Settings.start?.();
        expect(entries().length).toBeGreaterThan(0);
        expect(entries().every(node => !node.classList.contains("bloom-entry-hover"))).toBe(true);
        expect(menuEntries()).toHaveLength(0);
    });

    test("showAccountMenuEntry inserts and removes the account-menu row", () => {
        mount(LIVE_SHELL);
        run(true, false, true);
        expect(menuEntries()).toHaveLength(1);
        writeSetting("Settings", "showAccountMenuEntry", false);
        Settings.onSettingsChange?.("showAccountMenuEntry");
        expect(menuEntries()).toHaveLength(0);
        expect(entries().length).toBeGreaterThan(0);
    });

    test("the last remaining entry stays on", () => {
        mount(NEW_SHELL);
        run(true, false, false);
        writeSetting("Settings", "showSidebarEntry", false);
        Settings.onSettingsChange?.("showSidebarEntry");
        expect(readSetting("Settings", "showSidebarEntry")).toBe(true);
        expect(entries().length).toBeGreaterThan(0);
    });

    test("both switches off unmount the overlay even on the app host", () => {
        Object.assign(globalThis, { BLOOM_APP: true });
        mount(NEW_SHELL);
        run(false, false, true);
        expect(entries()).toHaveLength(0);
    });

    test("always-on keeps the overlay without the hover gate on the app host", () => {
        Object.assign(globalThis, { BLOOM_APP: true });
        mount(NEW_SHELL);
        run(true, false);
        const nodes = entries();
        expect(nodes.length).toBeGreaterThan(0);
        expect(nodes.every(node => !node.classList.contains("bloom-entry-hover"))).toBe(true);
    });

    test("hover-only marks the overlay as hover-gated on the app host", () => {
        Object.assign(globalThis, { BLOOM_APP: true });
        mount(NEW_SHELL);
        run(false, true);
        const nodes = entries();
        expect(nodes.length).toBeGreaterThan(0);
        expect(nodes.every(node => node.classList.contains("bloom-entry-hover"))).toBe(true);
    });

    test("turning both switches off drops leftover overlay nodes", () => {
        Object.assign(globalThis, { BLOOM_APP: true });
        mount(NEW_SHELL);
        run(true, false);
        expect(entries().length).toBeGreaterThan(0);
        writeSetting("Settings", "showAccountMenuEntry", true);
        writeSetting("Settings", "showSidebarEntry", false);
        writeSetting("Settings", "showSidebarEntryOnHover", false);
        Settings.onSettingsChange?.();
        expect(entries()).toHaveLength(0);
    });

    test("stop removes leftover overlay and account-menu entries", () => {
        mount(NEW_SHELL);
        run(true, false);
        const extra = document.createElement("div");
        extra.setAttribute("data-bloom", "entry");
        const menu = document.createElement("div");
        menu.setAttribute("data-bloom", "menu-entry");
        document.body.append(extra, menu);
        Settings.stop?.();
        expect(document.querySelector('[data-bloom="entry"]')).toBeNull();
        expect(document.querySelector('[data-bloom="menu-entry"]')).toBeNull();
    });

    test("app overlay CSS hides hover entries until the account slot is hovered", () => {
        Object.assign(globalThis, { BLOOM_APP: true });
        const css = typeof Settings.styles === "function" ? Settings.styles() : "";
        expect(css).toContain("inset:auto");
        expect(css).toContain("[data-bloom=entry].bloom-entry-hover:not(:hover > *)");
    });
});
