/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Logger } from "@utils/Logger";
import { isRecord, parseJson } from "@utils/misc";
import { readAllCopies, writeAllCopies } from "@utils/storage";
import { type DefinedSettings, OptionType, type SettingDef, type SettingsDefinition, type SettingsValues } from "@utils/types";

const logger = new Logger("Settings");

export const STORAGE_KEY = "BloomSettings";
const SAVE_DELAY_MS = 100;
const SOURCES = ["GM", "IndexedDB", "localStorage"] as const;

export type PluginRow = Record<string, unknown> & { enabled?: boolean; };

export interface SettingsBag {
    plugins: Record<string, PluginRow>;
}

type Listener = (plugin: string, key: string) => void;

const bag: SettingsBag = { plugins: {} };
const listeners = new Set<Listener>();
let saveTimer: ReturnType<typeof setTimeout> | undefined;

export function parseBag(raw: unknown): SettingsBag | null {
    let value = raw;
    for (let depth = 0; typeof value === "string" && depth < 2; depth++) value = parseJson(value);
    if (!isRecord(value) || !isRecord(value.plugins) || !Object.keys(value.plugins).length) return null;
    return value as unknown as SettingsBag;
}

const isBlank = (value: unknown) =>
    value == null || value === "" || (Array.isArray(value) ? !value.length : isRecord(value) && !Object.keys(value).length);

function weight(value: unknown) {
    if (isBlank(value)) return 0;
    if (Array.isArray(value)) return 12 + Math.min(value.length, 40);
    if (isRecord(value)) return 12 + Math.min(Object.keys(value).length, 40);
    return 3;
}

export function bagScore(candidate: SettingsBag) {
    let score = 0;
    for (const row of Object.values(candidate.plugins)) {
        if (!isRecord(row)) continue;
        for (const [key, value] of Object.entries(row)) if (key !== "enabled") score += weight(value);
    }
    return score;
}

const enabledCount = (candidate: SettingsBag) => Object.values(candidate.plugins).filter(row => isRecord(row) && row.enabled === true).length;

export function mergeBags(candidates: (SettingsBag | null)[]) {
    const ranked = candidates
        .map((candidate, index) => candidate && { candidate, index, score: bagScore(candidate) })
        .filter(item => item != null)
        .toSorted((a, b) => b.score - a.score || (a.score ? 0 : enabledCount(b.candidate) - enabledCount(a.candidate)) || a.index - b.index);
    if (!ranked.length) return null;

    const [winner, ...rest] = ranked;
    const merged = structuredClone(winner.candidate);
    for (const { candidate } of rest) {
        for (const [name, row] of Object.entries(candidate.plugins)) {
            if (!isRecord(row)) continue;
            const target = merged.plugins[name] ??= {};
            for (const [key, value] of Object.entries(row)) {
                if (key === "enabled") {
                    if (!("enabled" in target) && value === true) target.enabled = true;
                } else if (isBlank(target[key]) && !isBlank(value)) {
                    target[key] = structuredClone(value);
                }
            }
            if (!Object.keys(target).length) delete merged.plugins[name];
        }
    }
    return { bag: merged, source: SOURCES[winner.index] };
}

export async function loadSettings() {
    const copies = await readAllCopies(STORAGE_KEY);
    const picked = mergeBags(copies.map(parseBag));
    if (!picked) return;
    bag.plugins = picked.bag.plugins;
    logger.info("Loaded settings from", picked.source);
}

function save() {
    saveTimer = undefined;
    writeAllCopies(STORAGE_KEY, bag);
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
