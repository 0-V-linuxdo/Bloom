/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Adapted from Void++ Settings (GPL-3.0-or-later).
 */

import { idbGet } from "../utils/idb";
import { Logger } from "../utils/Logger";
import {
    parseStoredSettings,
    SettingsStore,
    STORAGE_KEY,
} from "../utils/SettingsStore";
import { OptionType, type DefinedSettings, type SettingsDefinition } from "../utils/types";

const logger = new Logger("Settings");

export interface BloomSettingsShape {
    plugins: Record<string, Record<string, unknown> & { enabled?: boolean }>;
}

const DefaultSettings: BloomSettingsShape = {
    plugins: {},
};

export const Settings = new SettingsStore<BloomSettingsShape>(structuredClone(DefaultSettings));

export const pluginPath = (name: string, key?: string) =>
    key ? `plugins.${name}.${key}` : `plugins.${name}`;

function defaultFor(def: SettingsDefinition, key: string): unknown {
    const spec = def[key];
    if (!spec) return undefined;
    if (spec.default !== undefined) return spec.default;
    if (spec.type === OptionType.SELECT) {
        const opt = spec.options?.find(o => o.default) ?? spec.options?.[0];
        return opt?.value;
    }
    if (spec.type === OptionType.BOOLEAN) return false;
    if (spec.type === OptionType.SLIDER) return spec.min ?? 0;
    if (spec.type === OptionType.STRING) return "";
    if (spec.type === OptionType.NUMBER) return 0;
    return undefined;
}

export function definePluginSettings(def: SettingsDefinition): DefinedSettings {
    const api: DefinedSettings = {
        def,
        pluginName: "",
        get store() {
            const name = api.pluginName;
            if (!name) return {};
            if (!Settings.store.plugins[name]) Settings.store.plugins[name] = {};
            return Settings.store.plugins[name];
        },
        get plain() {
            const name = api.pluginName;
            if (!name) return {};
            return Settings.plain.plugins[name] ?? {};
        },
    };
    return api;
}

function readGmValue(key: string): unknown {
    try {
        if (typeof GM_getValue === "function") return GM_getValue(key);
    } catch { /* ignore */ }
    return undefined;
}

export async function initSettings(): Promise<void> {
    let stored: Record<string, unknown> | null = null;
    stored = parseStoredSettings(readGmValue(STORAGE_KEY));
    if (!stored) stored = parseStoredSettings(await idbGet(STORAGE_KEY));
    if (!stored) {
        try { stored = parseStoredSettings(localStorage.getItem(STORAGE_KEY)); }
        catch { stored = null; }
    }
    if (stored && typeof stored === "object") {
        const plugins = (stored as { plugins?: BloomSettingsShape["plugins"] }).plugins;
        if (plugins && typeof plugins === "object") Settings.plain.plugins = plugins;
        logger.debug("Loaded settings");
    }
}

export function bindPluginSettings(name: string, settings: DefinedSettings | undefined) {
    if (!settings) return;
    settings.pluginName = name;
    if (!Settings.plain.plugins[name]) Settings.plain.plugins[name] = {};
    Settings.setDefaultGetter(pluginPath(name), key => {
        if (key === "enabled") return undefined;
        return defaultFor(settings.def, key);
    });
}

export interface SettingsPluginData {
    pinnedPlugins?: string[];
    starredPlugins?: string[];
    [key: string]: unknown;
}

function settingsRow(): SettingsPluginData {
    if (!Settings.plain.plugins.Settings) Settings.store.plugins.Settings = {};
    return Settings.store.plugins.Settings as SettingsPluginData;
}

export function getPinnedPlugins(): string[] {
    return settingsRow().pinnedPlugins ?? [];
}

export function isPluginPinned(name: string): boolean {
    return getPinnedPlugins().includes(name);
}

export function togglePluginPinned(name: string): boolean {
    const current = getPinnedPlugins();
    const pinned = current.includes(name);
    Settings.store.plugins.Settings = {
        ...Settings.plain.plugins.Settings,
        pinnedPlugins: pinned ? current.filter(n => n !== name) : [name, ...current],
    };
    return !pinned;
}

export function getStarredPlugins(): string[] {
    return settingsRow().starredPlugins ?? [];
}

export function isPluginStarred(name: string): boolean {
    return getStarredPlugins().includes(name);
}

export function togglePluginStarred(name: string): boolean {
    const current = getStarredPlugins();
    const starred = current.includes(name);
    Settings.store.plugins.Settings = {
        ...Settings.plain.plugins.Settings,
        starredPlugins: starred ? current.filter(n => n !== name) : [name, ...current],
    };
    return !starred;
}
