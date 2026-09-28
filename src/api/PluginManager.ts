/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { registerStyle, removeStyle } from "@utils/css";
import { Logger } from "@utils/Logger";
import { type Plugin, StartAt } from "@utils/types";

import { onSettingChange, readSetting, writeSetting } from "./Settings";

const logger = new Logger("PluginManager");

export const plugins = new Map<string, Plugin>();
const started = new Set<string>();
const reached = new Set<StartAt>();
const stateListeners = new Set<() => void>();

export function registerPlugins(list: Plugin[]) {
    for (const plugin of list) {
        if (plugin.settings) plugin.settings.pluginName = plugin.name;
        plugins.set(plugin.name, plugin);
    }
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
        logger.error(`Failed to start ${plugin.name}`, e);
    }
}

function stopPlugin(plugin: Plugin) {
    if (!started.delete(plugin.name)) return;
    removeStyle(styleId(plugin));
    try {
        plugin.stop?.();
    } catch (e) {
        logger.error(`Failed to stop ${plugin.name}`, e);
    }
}

const phaseOf = (plugin: Plugin) => plugin.startAt ?? StartAt.HostReady;

export function startPhase(phase: StartAt) {
    reached.add(phase);
    for (const plugin of plugins.values()) if (phaseOf(plugin) === phase && isPluginEnabled(plugin)) startPlugin(plugin);
    logger.info(`${phase}: ${[...started].join(", ")}`);
}

export function setPluginEnabled(plugin: Plugin, enabled: boolean) {
    writeSetting(plugin.name, "enabled", enabled);
    if (!enabled) stopPlugin(plugin);
    else if (reached.has(phaseOf(plugin))) startPlugin(plugin);
    for (const listener of stateListeners) listener();
}

export function onPluginStateChange(listener: () => void) {
    stateListeners.add(listener);
    return () => void stateListeners.delete(listener);
}

onSettingChange((name, key) => {
    const plugin = plugins.get(name);
    if (!plugin || key === "enabled" || !started.has(name)) return;
    try {
        applyStyles(plugin);
        plugin.onSettingsChange?.(key);
    } catch (e) {
        logger.error(`Settings change failed for ${name}`, e);
    }
});
