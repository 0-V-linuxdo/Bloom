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

function waitForBody(): Promise<void> {
    return new Promise(resolve => {
        if (document.body) {
            resolve();
            return;
        }
        const finish = () => {
            obs.disconnect();
            resolve();
        };
        const obs = new MutationObserver(() => {
            if (document.body) finish();
        });
        const root = document.documentElement;
        if (root) obs.observe(root, { childList: true });
        document.addEventListener("DOMContentLoaded", finish, { once: true });
        setTimeout(finish, 15_000);
    });
}

function waitForParsed(): Promise<void> {
    if (document.readyState !== "loading") return Promise.resolve();
    return new Promise(resolve => {
        document.addEventListener("DOMContentLoaded", () => resolve(), { once: true });
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

    await waitForBody();
    await waitForParsed();
    startAllPlugins(StartAt.HostReady);
    logger.info("ready");
}

export { plugins } from "./api/PluginManager";
export { Settings } from "./api/Settings";
export { VERSION, REPO_URL } from "./utils/constants";
