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
    bagRichness,
    pickSettingsBag,
    settingsBagFrom,
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
            return ensurePluginRow(name);
        },
        get plain() {
            const name = api.pluginName;
            if (!name) return {};
            return Settings.plain.plugins[name] ?? {};
        },
    };
    return api;
}

async function readGmValue(key: string): Promise<unknown> {
    if (typeof GM_getValue !== "function") return undefined;
    try {
        const value = GM_getValue(key) as unknown;
        if (value != null && typeof (value as { then?: unknown }).then === "function") {
            return await (value as Promise<unknown>);
        }
        return value;
    } catch {
        return undefined;
    }
}

export async function initSettings(): Promise<void> {
    const gm = settingsBagFrom(await readGmValue(STORAGE_KEY));
    const idb = settingsBagFrom(await idbGet(STORAGE_KEY));
    let ls: ReturnType<typeof settingsBagFrom> = null;
    try { ls = settingsBagFrom(localStorage.getItem(STORAGE_KEY)); }
    catch { ls = null; }

    const picked = pickSettingsBag([gm, idb, ls]);
    if (picked) {
        const plugins = (picked.bag as { plugins?: BloomSettingsShape["plugins"] }).plugins;
        if (plugins) Settings.plain.plugins = plugins;
        const via = (["gm", "idb", "localStorage"] as const)[picked.index] ?? String(picked.index);
        logger.info(
            "Loaded settings from",
            via,
            "richness",
            picked.score,
            "gm",
            bagRichness(gm),
            "idb",
            bagRichness(idb),
            "ls",
            bagRichness(ls),
        );
    }
    Settings.releasePersist();
    // Heal GM when a fuller copy won, or when a payload-free "on" beat a factory off.
    if (picked && (picked.index !== 0 || picked.score > bagRichness(gm))) Settings.persistLoadedBag();
}

export function ensurePluginRow(name: string) {
    if (!Settings.plain.plugins[name]) Settings.plain.plugins[name] = {};
    return Settings.store.plugins[name];
}

export function bindPluginSettings(name: string, settings: DefinedSettings | undefined) {
    if (!settings) return;
    settings.pluginName = name;
    ensurePluginRow(name);
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
    return ensurePluginRow("Settings") as SettingsPluginData;
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