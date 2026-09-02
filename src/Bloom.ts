/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { initPluginManager, registerPlugin, startAllPlugins } from "./api/PluginManager";
import { initSettings as loadSettings } from "./api/Settings";
import { Logger } from "./utils/Logger";
import { StartAt, type Plugin } from "./utils/types";
import settingsPlugin from "./plugins/_core/settings";
import chatStateFavicons from "./plugins/chatStateFavicons";
import inputHistory from "./plugins/inputHistory";
import noShareLink from "./plugins/noShareLink";
import noDictation from "./plugins/noDictation";

const logger = new Logger("Bloom");
let initialized = false;

const pluginList: Plugin[] = [
    settingsPlugin,
    chatStateFavicons,
    inputHistory,
    noShareLink,
    noDictation,
];

function waitForHostReady(): Promise<void> {
    return new Promise(resolve => {
        const ready = () => {
            if (document.body) {
                resolve();
                return true;
            }
            return false;
        };
        if (ready()) return;
        const obs = new MutationObserver(() => {
            if (ready()) obs.disconnect();
        });
        obs.observe(document.documentElement, { childList: true, subtree: true });
        setTimeout(() => {
            obs.disconnect();
            resolve();
        }, 15_000);
    });
}

export async function initSettings() {
    await loadSettings();
}

export async function init() {
    if (initialized) return;
    initialized = true;

    for (const plugin of pluginList) {
        try { registerPlugin(plugin); }
        catch (e) { logger.error("register failed", plugin.name, e); }
    }
    initPluginManager();
    startAllPlugins(StartAt.Init);

    const fireDom = () => startAllPlugins(StartAt.DOMContentLoaded);
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", fireDom, { once: true });
    } else {
        fireDom();
    }

    await waitForHostReady();
    startAllPlugins(StartAt.HostReady);
    logger.info("ready");
}

export { plugins } from "./api/PluginManager";
export { Settings } from "./api/Settings";
export { VERSION, REPO_URL } from "./utils/constants";
