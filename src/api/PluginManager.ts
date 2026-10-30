/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { registerStyle, removeStyle } from "@utils/css";
import { watchBody } from "@utils/dom";
import { Logger } from "@utils/Logger";
import { isRecord } from "@utils/misc";
import { type Plugin, StartAt } from "@utils/types";

import { flushSettings, onSettingChange, pruneSettings, readSetting, writeSetting } from "./Settings";

const logger = new Logger("PluginManager");

export const plugins = new Map<string, Plugin>();
const started = new Set<string>();
const reached = new Set<StartAt>();
const stateListeners = new Set<() => void>();
const issues = new Map<string, string[]>();
const NEW_PLUGIN_MS = 2 * 24 * 60 * 60 * 1000;

export function registerPlugins(list: Plugin[]) {
    for (const plugin of list) {
        if (plugin.settings) plugin.settings.pluginName = plugin.name;
        plugins.set(plugin.name, plugin);
    }
}

const knownPlugins = () => {
    const value = readSetting("Settings", "knownPlugins");
    return isRecord(value) ? value as Record<string, number> : null;
};

export function reconcileSettings() {
    const pruned = pruneSettings(new Set(plugins.keys()));
    if (pruned.length) logger.info(`Dropped settings of removed plugins: ${pruned.join(", ")}`);
    const known = knownPlugins();
    const seen = Date.now();
    const next = { ...known };
    const fresh = [...plugins.values()].filter(plugin => !plugin.hidden && !plugin.required && !(plugin.name in next));
    for (const plugin of fresh) next[plugin.name] = known ? seen : 0;
    for (const name of Object.keys(next)) if (!plugins.has(name)) delete next[name];
    if (JSON.stringify(next) !== JSON.stringify(known)) writeSetting("Settings", "knownPlugins", next);
}

export const isNewPlugin = (name: string) => {
    const seen = knownPlugins()?.[name];
    return !!seen && Date.now() - seen < NEW_PLUGIN_MS;
};

export const pluginIssue = (name: string) => issues.get(name);

function notifyState() {
    for (const listener of stateListeners) listener();
}

export function setPluginIssue(name: string, missing: string[] | null) {
    const current = issues.get(name);
    if (missing ? current?.join("\n") === missing.join("\n") : !current) return;
    if (missing) issues.set(name, missing);
    else issues.delete(name);
    notifyState();
}

export const isPluginEnabled = (plugin: Plugin) =>
    !!plugin.required || ((readSetting(plugin.name, "enabled") as boolean | undefined) ?? !!plugin.enabledByDefault);

export const isPluginStarted = (name: string) => started.has(name);

const styleId = (plugin: Plugin) => `plugin-${plugin.name}`;

function applyStyles(plugin: Plugin) {
    if (!plugin.styles) return;
    const css = typeof plugin.styles === "function" ? plugin.styles() : plugin.styles;
    if (css) registerStyle(styleId(plugin), css);
    else removeStyle(styleId(plugin));
}

function startPlugin(plugin: Plugin) {
    if (started.has(plugin.name)) return;
    try {
        applyStyles(plugin);
        plugin.start?.();
        started.add(plugin.name);
    } catch (e) {
        removeStyle(styleId(plugin));
        logger.error(`Failed to start ${plugin.name}`, e);
    }
}

function stopPlugin(plugin: Plugin) {
    started.delete(plugin.name);
    removeStyle(styleId(plugin));
    try {
        plugin.stop?.();
    } catch (e) {
        logger.error(`Failed to stop ${plugin.name}`, e);
    }
}

const phaseOf = (plugin: Plugin) => plugin.startAt ?? StartAt.HostReady;

function applyEnabled(plugin: Plugin) {
    if (isPluginEnabled(plugin)) {
        if (reached.has(phaseOf(plugin))) startPlugin(plugin);
        return;
    }
    stopPlugin(plugin);
}

export function startPhase(phase: StartAt) {
    reached.add(phase);
    for (const plugin of plugins.values()) if (phaseOf(plugin) === phase) applyEnabled(plugin);
    logger.info(`${phase}: ${[...started].join(", ")}`);
}

export function haltPlugin(plugin: Plugin) {
    stopPlugin(plugin);
}

export function runPlugin(plugin: Plugin) {
    if (isPluginEnabled(plugin) && reached.has(phaseOf(plugin))) startPlugin(plugin);
}

export function setPluginEnabled(plugin: Plugin, enabled: boolean) {
    writeSetting(plugin.name, "enabled", enabled);
    flushSettings();
}

function sweepDisabled() {
    for (const plugin of plugins.values()) {
        if (plugin.required || isPluginEnabled(plugin)) continue;
        if (started.has(plugin.name)) stopPlugin(plugin);
        else removeStyle(styleId(plugin));
    }
}

let stopSweep: (() => void) | undefined;

export function watchDisabledPlugins() {
    stopSweep?.();
    stopSweep = watchBody(() => sweepDisabled());
}

export function destroyPlugins() {
    stopSweep?.();
    stopSweep = undefined;
    for (const plugin of plugins.values()) stopPlugin(plugin);
    started.clear();
    reached.clear();
    issues.clear();
}

export function onPluginStateChange(listener: () => void) {
    stateListeners.add(listener);
    return () => void stateListeners.delete(listener);
}

onSettingChange((name, key) => {
    const plugin = plugins.get(name);
    if (!plugin) return;
    if (key === "enabled") {
        if (typeof readSetting(name, "enabled") === "boolean") applyEnabled(plugin);
        notifyState();
        return;
    }
    if (!started.has(name)) return;
    try {
        applyStyles(plugin);
        plugin.onSettingsChange?.(key);
    } catch (e) {
        logger.error(`Settings change failed for ${name}`, e);
    }
});
