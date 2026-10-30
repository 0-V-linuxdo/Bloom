/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { afterEach, describe, expect, test } from "bun:test";

import { registerPlugins, setPluginEnabled, startPhase } from "../src/api/PluginManager";
import { flushSettings, STORAGE_KEY, writeSetting } from "../src/api/Settings";
import StreamerMode from "../src/plugins/streamerMode";
import WiderChat from "../src/plugins/widerChat";
import { StartAt } from "../src/utils/types";

registerPlugins([StreamerMode, WiderChat]);

const sheetText = () => [...document.adoptedStyleSheets].flatMap(sheet => {
    try {
        return [...sheet.cssRules].map(rule => rule.cssText);
    } catch {
        return [];
    }
}).join("\n");

const hasBlurSheet = () => sheetText().includes("blur(6px)");

afterEach(() => {
    writeSetting("StreamerMode", "enabled", false);
    writeSetting("WiderChat", "enabled", false);
    document.querySelectorAll("style[id^='bloom-style-']").forEach(el => el.remove());
    document.adoptedStyleSheets = [];
});

describe("plugin disable drops styles", () => {
    test("StreamerMode loses its sheet and orphan <style> when turned off", () => {
        Object.assign(globalThis, { BLOOM_APP: true });
        writeSetting("StreamerMode", "enabled", true);
        startPhase(StartAt.Init);
        expect(hasBlurSheet()).toBe(true);
        setPluginEnabled(StreamerMode, false);
        expect(hasBlurSheet()).toBe(false);
        expect(document.getElementById("bloom-style-plugin-StreamerMode")).toBeNull();
        const orphan = document.createElement("style");
        orphan.id = "bloom-style-plugin-StreamerMode";
        orphan.textContent = "[data-app-action-sidebar-thread-title]{filter:blur(6px)!important}";
        document.head.append(orphan);
        setPluginEnabled(StreamerMode, false);
        expect(document.getElementById("bloom-style-plugin-StreamerMode")).toBeNull();
        Object.assign(globalThis, { BLOOM_APP: false });
    });

    test("WiderChat loses its width sheet when turned off", () => {
        writeSetting("WiderChat", "enabled", true);
        startPhase(StartAt.Init);
        expect(sheetText()).toContain("--thread-content-max-width");
        setPluginEnabled(WiderChat, false);
        expect(sheetText()).not.toContain("--thread-content-max-width");
    });

    test("another tab writing enabled:false stops StreamerMode", () => {
        Object.assign(globalThis, { BLOOM_APP: true });
        writeSetting("StreamerMode", "enabled", true);
        flushSettings();
        startPhase(StartAt.Init);
        expect(hasBlurSheet()).toBe(true);
        const json = JSON.stringify({ plugins: { StreamerMode: { enabled: false } } });
        localStorage.setItem(STORAGE_KEY, json);
        dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY, newValue: json }));
        expect(hasBlurSheet()).toBe(false);
        Object.assign(globalThis, { BLOOM_APP: false });
    });
});
