/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { describe, expect, test } from "bun:test";

import { definePluginSettings, flushSettings, loadSettings, onSettingChange, parseBag, readSetting, STORAGE_KEY, writeSetting } from "../src/api/Settings";
import { OptionType } from "../src/utils/types";

const saveFromOtherTab = (plugins: Record<string, Record<string, unknown>>) => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    const json = JSON.stringify({ plugins: { ...stored.plugins, ...plugins } });
    localStorage.setItem(STORAGE_KEY, json);
    dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY, newValue: json }));
};

describe("parseBag", () => {
    test("accepts objects, JSON and double-encoded JSON", () => {
        const bag = { plugins: { WiderChat: { width: 80 } } };
        expect(parseBag(bag)).toEqual(bag);
        expect(parseBag(JSON.stringify(bag))).toEqual(bag);
        expect(parseBag(JSON.stringify(JSON.stringify(bag)))).toEqual(bag);
    });

    test("rejects empty or malformed bags", () => {
        expect(parseBag({})).toBeNull();
        expect(parseBag({ plugins: {} })).toBeNull();
        expect(parseBag("{nope")).toBeNull();
        expect(parseBag(null)).toBeNull();
    });
});

describe("plugin settings", () => {
    test("reads defaults, writes values and resets visible keys only", () => {
        const settings = definePluginSettings({
            width: { type: OptionType.SLIDER, min: 1, max: 9, default: 4 },
            data: { type: OptionType.CUSTOM, default: [] as string[] },
        });
        settings.pluginName = "TestPlugin";
        expect(settings.store.width).toBe(4);
        settings.store.width = 7;
        settings.store.data = ["kept"];
        expect(readSetting("TestPlugin", "width")).toBe(7);
        settings.reset();
        expect(settings.store.width).toBe(4);
        expect(settings.store.data).toEqual(["kept"]);
    });

    test("loads settings from localStorage and persists writes there", () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ plugins: { RecentTopics: { visits: ["home"] } } }));
        loadSettings();
        expect(readSetting("RecentTopics", "visits")).toEqual(["home"]);
        writeSetting("RecentTopics", "includeHome", false);
        flushSettings();
        expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}").plugins.RecentTopics.includeHome).toBe(false);
    });
});

describe("settings shared by several tabs", () => {
    test("a change saved in another tab is adopted and survives this tab's next save", () => {
        writeSetting("Cleaner", "hideAds", false);
        flushSettings();
        const seen: string[] = [];
        const unsubscribe = onSettingChange((plugin, key) => seen.push(`${plugin}.${key}`));
        saveFromOtherTab({ Settings: { entryPosition: 0.25 } });
        unsubscribe();
        expect(readSetting("Settings", "entryPosition")).toBe(0.25);
        expect(seen).toEqual(["Settings.entryPosition"]);
        writeSetting("GreetingCustomizer", "index", 1);
        flushSettings();
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}").plugins;
        expect(saved.Settings.entryPosition).toBe(0.25);
        expect(saved.GreetingCustomizer.index).toBe(1);
        expect(saved.Cleaner.hideAds).toBe(false);
    });

    test("an unsaved change in this tab is kept over another tab's save", () => {
        writeSetting("Settings", "entryPosition", 0.5);
        saveFromOtherTab({ Settings: { entryPosition: 1 }, InputHistory: { entries: ["other tab"] } });
        expect(readSetting("Settings", "entryPosition")).toBe(0.5);
        expect(readSetting("InputHistory", "entries")).toEqual(["other tab"]);
        flushSettings();
        expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}").plugins.Settings.entryPosition).toBe(0.5);
    });
});
