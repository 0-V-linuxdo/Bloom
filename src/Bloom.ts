/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { destroyPlugins, plugins, reconcileSettings, registerPlugins, startPhase, watchDisabledPlugins } from "@api/PluginManager";
import { loadSettings } from "@api/Settings";
import baseCss from "@components/base.css";
import { startGeneration } from "@host/generation";
import { watchLandmarks } from "@host/landmarks";
import { installNetworkTap } from "@host/network";
import { whenDomReady, whenHostReady } from "@host/ready";
import { dropBloomStyles, mountPendingStyles, registerStyle } from "@utils/css";
import { sweepBloomChrome } from "@utils/instance";
import { Logger } from "@utils/Logger";
import { PLUGIN_UPDATED_AT } from "@utils/pluginMtime";
import { StartAt } from "@utils/types";

import pluginList from "./plugins";

const logger = new Logger("Bloom");

export const VERSION = BLOOM_VERSION;

export { plugins };

let boot = 0;
let stopLandmarks: (() => void) | undefined;

export function destroy() {
    boot++;
    stopLandmarks?.();
    stopLandmarks = undefined;
    destroyPlugins();
    dropBloomStyles();
    sweepBloomChrome();
}

export async function init() {
    const token = ++boot;
    const live = () => token === boot;
    dropBloomStyles();
    sweepBloomChrome();
    installNetworkTap();
    for (const plugin of pluginList) plugin.updatedAt = PLUGIN_UPDATED_AT[plugin.name];
    registerPlugins(pluginList);
    loadSettings();
    reconcileSettings();
    indexedDB.deleteDatabase("bloompp");
    registerStyle("base", baseCss);
    startGeneration();
    startPhase(StartAt.Init);
    void whenDomReady().then(() => {
        if (!live()) return;
        mountPendingStyles();
        startPhase(StartAt.DOMContentLoaded);
    });
    await whenHostReady();
    if (!live()) return;
    startPhase(StartAt.HostReady);
    stopLandmarks?.();
    stopLandmarks = watchLandmarks();
    watchDisabledPlugins();
    logger.info(`Bloom++ ${VERSION} ready`);
}
