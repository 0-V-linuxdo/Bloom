/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { plugins, registerPlugins, startPhase } from "@api/PluginManager";
import { loadSettings } from "@api/Settings";
import baseCss from "@components/base.css";
import { startGeneration } from "@host/generation";
import { installNetworkTap } from "@host/network";
import { whenDomReady, whenHostReady } from "@host/ready";
import { mountPendingStyles, registerStyle } from "@utils/css";
import { Logger } from "@utils/Logger";
import { PLUGIN_UPDATED_AT } from "@utils/pluginMtime";
import { StartAt } from "@utils/types";

import pluginList from "./plugins";

const logger = new Logger("Bloom");

export const VERSION = BLOOM_VERSION;

export { plugins };

export async function init() {
    installNetworkTap();
    for (const plugin of pluginList) plugin.updatedAt = PLUGIN_UPDATED_AT[plugin.name];
    registerPlugins(pluginList);
    await loadSettings();
    registerStyle("base", baseCss);
    startGeneration();
    startPhase(StartAt.Init);
    await whenDomReady();
    mountPendingStyles();
    startPhase(StartAt.DOMContentLoaded);
    await whenHostReady();
    startPhase(StartAt.HostReady);
    logger.info(`Bloom++ ${VERSION} ready`);
}
