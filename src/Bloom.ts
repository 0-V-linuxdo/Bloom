/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { initPluginManager, registerPlugin, startAllPlugins } from "./api/PluginManager";
import { initSettings as loadSettings } from "./api/Settings";
import { requestChromeReady, requestIdleReady, requestShellReady, runIdleSequence, whenChromeReady, whenIdleReady, whenShellReady } from "./host/idleReady";
import { Logger } from "./utils/Logger";
import { VERSION } from "./utils/constants";
import { flushStyles } from "./utils/css";
import { hasComposer, hasLateIslands } from "./utils/hydration";
import { StartAt, type Plugin } from "./utils/types";
import settingsPlugin, { openSettings } from "./plugins/_core/settings";
import chatStateFavicons from "./plugins/chatStateFavicons";
import inputHistory from "./plugins/inputHistory";
import noShareLink from "./plugins/noShareLink";
import noDictation from "./plugins/noDictation";
import noSidebarIdentity from "./plugins/noSidebarIdentity";
import recentTopics from "./plugins/recentTopics";
import cleaner from "./plugins/cleaner";

const logger = new Logger("Bloom");
let initialized = false;
const BOOT_AT = Date.now();

const pluginList: Plugin[] = [
    settingsPlugin,
    chatStateFavicons,
    inputHistory,
    noShareLink,
    noDictation,
    noSidebarIdentity,
    recentTopics,
    cleaner,
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

/** 8s is a ceiling for the island wait, not a license to write DOM early. */
const HYDRATION_CEILING_MS = 8_000;
const HYDRATION_SETTLE_MS = 300;
const HYDRATION_SPARSE_MS = 250;

async function waitForHydrated(): Promise<boolean> {
    if (hasLateIslands()) {
        await wait(HYDRATION_SETTLE_MS);
        return true;
    }
    while (Date.now() - BOOT_AT < HYDRATION_CEILING_MS) {
        await wait(HYDRATION_SPARSE_MS);
        if (hasLateIslands()) {
            await wait(HYDRATION_SETTLE_MS);
            return true;
        }
    }
    return hasLateIslands() || hasComposer();
}

function sidebarPresent(): boolean {
    return !!(
        document.getElementById("stage-slideover-sidebar")
        || document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]')
    );
}

/** Sidebar HTML may exist before hydrateRoot finishes — do not pin into it here. */
async function waitForSidebar(): Promise<boolean> {
    if (sidebarPresent()) return true;
    const until = Date.now() + HYDRATION_CEILING_MS;
    while (Date.now() < until) {
        await wait(100);
        if (sidebarPresent()) return true;
    }
    return sidebarPresent();
}

function offerMenu() {
    try { GM_registerMenuCommand?.("Bloom++ settings", openSettings); }
    catch { /* optional */ }
}

function bindIdleHost() {
    whenShellReady(() => {
        startAllPlugins(StartAt.HostShell);
        logger.info("host shell", VERSION);
    });
    whenIdleReady(() => {
        logger.info("idle ready", VERSION);
    });
    whenChromeReady(() => {
        flushStyles();
        startAllPlugins(StartAt.HostReady);
        logger.info("chrome ready", VERSION);
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
    offerMenu();
    bindIdleHost();

    const fireDom = () => startAllPlugins(StartAt.DOMContentLoaded);
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", fireDom, { once: true });
    } else {
        fireDom();
    }

    await waitForBody();
    void waitForSidebar().then(found => {
        if (found) requestShellReady();
    });
    const islands = await waitForHydrated();
    if (!islands) {
        logger.warn("late islands not detected; starting default plugins", VERSION);
        requestIdleReady();
        requestChromeReady();
        return;
    }
    await runIdleSequence();
}

export { requestChromeReady, requestIdleReady, requestShellReady, whenChromeReady, whenIdleReady, whenShellReady } from "./host/idleReady";
export { plugins } from "./api/PluginManager";
export { Settings } from "./api/Settings";
export { VERSION, REPO_URL } from "./utils/constants";
export { isDocumentInteractive, hasLateIslands } from "./utils/hydration";
