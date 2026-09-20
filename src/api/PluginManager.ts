/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Lifecycle adapted from Void++ PluginManager (GPL-3.0-or-later).
 */

import { disableStyle, enableStyle, removeStyle } from "../utils/css";
import { Logger } from "../utils/Logger";
import { StartAt, type Plugin } from "../utils/types";
import { emitBloomEvent } from "./Events";
import { bindPluginSettings, Settings } from "./Settings";

const logger = new Logger("PluginManager");

export const plugins: Record<string, Plugin> = {};
const started = new Set<string>();

export function registerPlugin(plugin: Plugin) {
    if (plugins[plugin.name]) {
        logger.warn("Duplicate plugin", plugin.name);
        return;
    }
    plugins[plugin.name] = plugin;
    bindPluginSettings(plugin.name, plugin.settings);
}

export function isPluginEnabled(name: string): boolean {
    const plugin = plugins[name];
    if (!plugin) return false;
    if (plugin.required) return true;
    const stored = Settings.plain.plugins[name]?.enabled;
    if (typeof stored === "boolean") return stored;
    return plugin.enabledByDefault !== false;
}

export function togglePlugin(name: string) {
    const plugin = plugins[name];
    if (!plugin || plugin.required) return;
    const next = !isPluginEnabled(name);
    if (!Settings.plain.plugins[name]) Settings.store.plugins[name] = {};
    Settings.store.plugins[name].enabled = next;
    if (next) startPlugin(plugin);
    else stopPlugin(plugin);
    emitBloomEvent("pluginToggle", { name, enabled: next });
}

export function startPlugin(plugin: Plugin, silent = false) {
    if (started.has(plugin.name)) return;
    if (!isPluginEnabled(plugin.name)) return;
    try {
        if (plugin.managedStyle) enableStyle(plugin.managedStyle);
        plugin.start?.();
        started.add(plugin.name);
        if (plugin.settings) {
            Settings.addPrefixChangeListener(`plugins.${plugin.name}.`, () => {
                if (started.has(plugin.name)) plugin.onSettingsChange?.();
            });
        }
        if (!silent) logger.debug("Started", plugin.name);
    } catch (e) {
        logger.error("Failed to start", plugin.name, e);
    }
}

export function stopPlugin(plugin: Plugin) {
    if (!started.has(plugin.name)) return;
    try {
        plugin.stop?.();
    } catch (e) {
        logger.error("Failed to stop", plugin.name, e);
    }
    for (const sel of plugin.cleanupSelectors ?? []) {
        try {
            document.querySelectorAll(sel).forEach(n => n.remove());
        } catch { /* ignore */ }
    }
    if (plugin.managedStyle) {
        disableStyle(plugin.managedStyle);
        removeStyle(plugin.managedStyle);
    }
    started.delete(plugin.name);
}

export function startAllPlugins(target: StartAt) {
    for (const plugin of Object.values(plugins)) {
        const at = plugin.startAt ?? StartAt.DOMContentLoaded;
        if (at !== target) continue;
        startPlugin(plugin);
    }
}

const DEFAULTS_REV = 2;
const DEFAULTS_REV_KEY = "defaultsRev";

export function initPluginManager() {
    // Do not Proxy-set missing plugin rows on boot. That scheduleSave()'s
    // factory {enabled} over IDB after a GM miss. isPluginEnabled already
    // uses stored ?? enabledByDefault (Void++).
    const meta = Settings.plain.plugins.Settings as Record<string, unknown> | undefined;
    if (!meta || meta[DEFAULTS_REV_KEY] === DEFAULTS_REV) return;

    // v1.1.6 one-shot: NoShareLink / NoDictation ship off. Skip any row
    // that already has an explicit enabled boolean (user choice wins if
    // the Settings.defaultsRev marker was lost). Plain-only — no save().
    for (const name of ["NoShareLink", "NoDictation"]) {
        const row = Settings.plain.plugins[name];
        if (!row || typeof row.enabled === "boolean") continue;
        row.enabled = false;
    }
    meta[DEFAULTS_REV_KEY] = DEFAULTS_REV;
}
