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
import { isDocumentInteractive } from "./utils/hydration";
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

const HYDRATION_CEILING_MS = 8_000;
const HYDRATION_SETTLE_MS = 300;
const HYDRATION_POLL_MS = 50;

function waitForHydrated(): Promise<boolean> {
    const deadline = Date.now() + HYDRATION_CEILING_MS;
    return new Promise(resolve => {
        const finish = (ok: boolean) => {
            if (done) return;
            done = true;
            clearInterval(poll);
            window.removeEventListener("load", onLoad);
            if (ok) void wait(HYDRATION_SETTLE_MS).then(() => resolve(true));
            else resolve(false);
        };
        let done = false;
        const tick = () => {
            if (isDocumentInteractive()) {
                finish(true);
                return;
            }
            if (Date.now() >= deadline) finish(isDocumentInteractive());
        };
        const onLoad = () => tick();
        const poll = setInterval(tick, HYDRATION_POLL_MS);
        window.addEventListener("load", onLoad);
        tick();
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
    const interactive = await waitForHydrated();
    flushStyles();
    if (!interactive) {
        logger.warn("React host not detected; skipping automatic body mounts", VERSION);
    }
    startAllPlugins(StartAt.HostReady);
    logger.info("ready", VERSION, { interactive });
}

export { plugins } from "./api/PluginManager";
export { Settings } from "./api/Settings";
export { VERSION, REPO_URL } from "./utils/constants";
export { isDocumentInteractive } from "./utils/hydration";
