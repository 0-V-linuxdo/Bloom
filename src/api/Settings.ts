/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { isRecord, parseJson } from "@utils/misc";
import { readStored, watchStored, writeStored } from "@utils/storage";
import { type DefinedSettings, OptionType, type SettingDef, type SettingsDefinition, type SettingsValues } from "@utils/types";

export const STORAGE_KEY = "BloomSettings";
const SAVE_DELAY_MS = 100;

export type PluginRow = Record<string, unknown> & { enabled?: boolean; };

export interface SettingsBag {
    plugins: Record<string, PluginRow>;
}

type Listener = (plugin: string, key: string) => void;

const bag: SettingsBag = { plugins: {} };
const listeners = new Set<Listener>();
const unsaved = new Set<string>();
let saveTimer: ReturnType<typeof setTimeout> | undefined;

export function parseBag(raw: unknown): SettingsBag | null {
    let value = raw;
    for (let depth = 0; typeof value === "string" && depth < 2; depth++) value = parseJson(value);
    if (!isRecord(value) || !isRecord(value.plugins) || !Object.keys(value.plugins).length) return null;
    return value as unknown as SettingsBag;
}

export function loadSettings() {
    const stored = parseBag(readStored(STORAGE_KEY));
    if (stored) bag.plugins = stored.plugins;
}

const unsavedKey = (plugin: string, key: string) => `${plugin}\n${key}`;

function save() {
    saveTimer = undefined;
    unsaved.clear();
    writeStored(STORAGE_KEY, bag);
}

function adopt(raw: unknown) {
    const next = parseBag(raw);
    if (!next) return;
    const changed: [string, string][] = [];
    for (const plugin of new Set([...Object.keys(bag.plugins), ...Object.keys(next.plugins)])) {
        const row = bag.plugins[plugin] ??= {};
        const incoming = isRecord(next.plugins[plugin]) ? next.plugins[plugin] : {};
        for (const key of new Set([...Object.keys(row), ...Object.keys(incoming)])) {
            if (unsaved.has(unsavedKey(plugin, key)) || JSON.stringify(row[key]) === JSON.stringify(incoming[key])) continue;
            if (incoming[key] === undefined) delete row[key];
            else row[key] = incoming[key];
            changed.push([plugin, key]);
        }
    }
    for (const [plugin, key] of changed) for (const listener of listeners) listener(plugin, key);
}

export function flushSettings() {
    if (!saveTimer) return;
    clearTimeout(saveTimer);
    save();
}

export const settingsSnapshot = (): SettingsBag => structuredClone(bag);

export const readSetting = (plugin: string, key: string): unknown => bag.plugins[plugin]?.[key];

export function writeSetting(plugin: string, key: string, value?: unknown) {
    const row = bag.plugins[plugin] ??= {};
    if (value === undefined) delete row[key];
    else row[key] = value;
    unsaved.add(unsavedKey(plugin, key));
    clearTimeout(saveTimer);
    saveTimer = setTimeout(save, SAVE_DELAY_MS);
    for (const listener of listeners) listener(plugin, key);
}

export function onSettingChange(listener: Listener) {
    listeners.add(listener);
    return () => void listeners.delete(listener);
}

export function defaultValue(def: SettingDef): unknown {
    return def.type === OptionType.COMPONENT ? undefined : def.default;
}

export function definePluginSettings<D extends SettingsDefinition>(def: D): DefinedSettings<D> {
    const settings: DefinedSettings<D> = {
        def,
        pluginName: "",
        store: new Proxy({} as SettingsValues<D>, {
            get: (_, key: string) => readSetting(settings.pluginName, key) ?? (def[key] && defaultValue(def[key])),
            set: (_, key: string, value) => {
                writeSetting(settings.pluginName, key, value);
                return true;
            },
        }),
        reset() {
            for (const key of Object.keys(def)) {
                if (def[key].type !== OptionType.CUSTOM && readSetting(settings.pluginName, key) !== undefined) writeSetting(settings.pluginName, key);
            }
        },
    };
    return settings;
}

const listSetting = (key: "pinnedPlugins" | "starredPlugins") => {
    const read = () => {
        const value = readSetting("Settings", key);
        return Array.isArray(value) ? value.filter(item => typeof item === "string") : [];
    };
    return {
        has: (name: string) => read().includes(name),
        list: read,
        toggle(name: string) {
            const current = read();
            writeSetting("Settings", key, current.includes(name) ? current.filter(item => item !== name) : [name, ...current]);
        },
    };
};

export const pinnedPlugins = listSetting("pinnedPlugins");
export const starredPlugins = listSetting("starredPlugins");

addEventListener("pagehide", flushSettings);
watchStored(STORAGE_KEY, adopt);
