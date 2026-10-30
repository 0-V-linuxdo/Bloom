/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { afterEach, describe, expect, test } from "bun:test";

import { registerPlugins } from "../src/api/PluginManager";
import { writeSetting } from "../src/api/Settings";
import Settings from "../src/plugins/_core/settings";
import { mount, NEW_SHELL } from "./fixtures";

registerPlugins([Settings]);

const entries = () => [...document.querySelectorAll<HTMLElement>('[data-bloom="entry"]')];

function run(always: boolean, hover: boolean) {
    writeSetting("Settings", "showSidebarEntry", always);
    writeSetting("Settings", "showSidebarEntryOnHover", hover);
    Settings.start?.();
}

afterEach(() => {
    Settings.stop?.();
    writeSetting("Settings", "showSidebarEntry");
    writeSetting("Settings", "showSidebarEntryOnHover");
    document.body.replaceChildren();
    Object.assign(globalThis, { BLOOM_APP: false });
});

describe("sidebar settings entry", () => {
    test("both switches off unmount the overlay even on the app host", () => {
        Object.assign(globalThis, { BLOOM_APP: true });
        mount(NEW_SHELL);
        run(false, false);
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
