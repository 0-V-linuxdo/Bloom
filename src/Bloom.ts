/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { destroyPlugins, plugins, registerPlugins, startPhase, watchDisabledPlugins } from "@api/PluginManager";
import { loadSettings } from "@api/Settings";
import baseCss from "@components/base.css";
import { startGeneration } from "@host/generation";
import { installNetworkTap } from "@host/network";
import { whenDomReady, whenHostReady } from "@host/ready";
import { dropBloomStyles, mountPendingStyles, registerStyle } from "@utils/css";
import { Logger } from "@utils/Logger";
import { PLUGIN_UPDATED_AT } from "@utils/pluginMtime";
import { StartAt } from "@utils/types";

import pluginList from "./plugins";

const logger = new Logger("Bloom");

export const VERSION = BLOOM_VERSION;

export { plugins };

export function destroy() {
    destroyPlugins();
    dropBloomStyles();
}

export async function init() {
    dropBloomStyles();
    for (const el of document.querySelectorAll("[data-bloom='settings']")) el.remove();
    installNetworkTap();
    for (const plugin of pluginList) plugin.updatedAt = PLUGIN_UPDATED_AT[plugin.name];
    registerPlugins(pluginList);
    loadSettings();
    indexedDB.deleteDatabase("bloompp");
    registerStyle("base", baseCss);
    startGeneration();
    startPhase(StartAt.Init);
    void whenDomReady().then(() => {
        mountPendingStyles();
        startPhase(StartAt.DOMContentLoaded);
    });
    await whenHostReady();
    startPhase(StartAt.HostReady);
    watchDisabledPlugins();
    logger.info(`Bloom++ ${VERSION} ready`);
}
