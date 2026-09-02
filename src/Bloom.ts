/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { initPluginManager, registerPlugin, startAllPlugins } from "./api/PluginManager";
import { initSettings as loadSettings } from "./api/Settings";
import { Logger } from "./utils/Logger";
import { VERSION } from "./utils/constants";
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
        const rootEl = document.documentElement;
        if (rootEl) obs.observe(rootEl, { childList: true });
        document.addEventListener("DOMContentLoaded", finish, { once: true });
        setTimeout(finish, 15_000);
    });
}

function waitForWindowLoad(): Promise<void> {
    if (document.readyState === "complete") return Promise.resolve();
    return new Promise(resolve => {
        window.addEventListener("load", () => resolve(), { once: true });
        setTimeout(resolve, 8_000);
    });
}

function wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const HYDRATION_MIN_MS = 8_000;
const HYDRATION_SETTLE_MS = 1_000;

// ChatGPT hydrates html/body and late client islands (Recents, avatar,
// click handlers) well after DCL and often after window load.
// MCP SuperAssistant #190: delay ALL chatgpt.com DOM mounts ~8s from start.
// load+1s (v1.1.3) was still inside that window: Recents/avatar dropped,
// buttons stayed dead, and React detached #bloom-root so the FAB never appeared.
async function waitForHydrated(): Promise<void> {
    const started = Date.now();
    await waitForWindowLoad();
    const elapsed = Date.now() - started;
    await wait(Math.max(HYDRATION_MIN_MS - elapsed, HYDRATION_SETTLE_MS));
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
    await waitForHydrated();
    startAllPlugins(StartAt.HostReady);
    logger.info("ready", VERSION);
}

export { plugins } from "./api/PluginManager";
export { Settings } from "./api/Settings";
export { VERSION, REPO_URL } from "./utils/constants";
