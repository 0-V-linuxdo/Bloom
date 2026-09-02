/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { initPluginManager, registerPlugin, startAllPlugins } from "./api/PluginManager";
import { initSettings as loadSettings } from "./api/Settings";
import { Logger } from "./utils/Logger";
import { VERSION } from "./utils/constants";
import { flushStyles } from "./utils/css";
import { hasLateIslands } from "./utils/hydration";
import { StartAt, type Plugin } from "./utils/types";
import settingsPlugin, { openSettings } from "./plugins/_core/settings";
import chatStateFavicons from "./plugins/chatStateFavicons";
import inputHistory from "./plugins/inputHistory";
import noShareLink from "./plugins/noShareLink";
import noDictation from "./plugins/noDictation";

const logger = new Logger("Bloom");
let initialized = false;
const BOOT_AT = Date.now();

const pluginList: Plugin[] = [
    settingsPlugin,
    chatStateFavicons,
    inputHistory,
    noShareLink,
    noDictation,
];

function wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function waitForBody(): Promise<void> {
    if (document.body) return Promise.resolve();
    return new Promise(resolve => {
        let done = false;
        const finish = () => {
            if (done) return;
            if (!document.body) return;
            done = true;
            clearInterval(poll);
            resolve();
        };
        const poll = setInterval(finish, 20);
        document.addEventListener("DOMContentLoaded", finish, { once: true });
        setTimeout(() => {
            if (done) return;
            done = true;
            clearInterval(poll);
            resolve();
        }, 15_000);
    });
}

/** MCP SuperAssistant #190: 8s is a floor, not a ceiling. */
const HYDRATION_FLOOR_MS = 8_000;
const HYDRATION_CEILING_MS = 20_000;
const HYDRATION_SETTLE_MS = 300;
const HYDRATION_POLL_MS = 100;

function waitForHydrated(): Promise<boolean> {
    return new Promise(resolve => {
        let done = false;
        const finish = (ok: boolean) => {
            if (done) return;
            done = true;
            clearInterval(poll);
            if (ok) void wait(HYDRATION_SETTLE_MS).then(() => resolve(true));
            else resolve(false);
        };
        const tick = () => {
            const elapsed = Date.now() - BOOT_AT;
            if (elapsed < HYDRATION_FLOOR_MS) return;
            if (hasLateIslands()) {
                finish(true);
                return;
            }
            if (elapsed >= HYDRATION_CEILING_MS) finish(false);
        };
        const poll = setInterval(tick, HYDRATION_POLL_MS);
        tick();
    });
}

function offerMenu() {
    try { GM_registerMenuCommand?.("Bloom++ settings", openSettings); }
    catch { /* optional */ }
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
    const interactive = await waitForHydrated();
    if (!interactive) {
        logger.warn("late islands not detected; skipping DOM writes", VERSION);
        offerMenu();
        return;
    }
    flushStyles();
    startAllPlugins(StartAt.HostReady);
    logger.info("ready", VERSION, { interactive });
}

export { plugins } from "./api/PluginManager";
export { Settings } from "./api/Settings";
export { VERSION, REPO_URL } from "./utils/constants";
export { isDocumentInteractive, hasLateIslands } from "./utils/hydration";
