/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { destroyPlugins, plugins, registerPlugins, startPhase, watchDisabledPlugins } from "@api/PluginManager";
import { loadSettings } from "@api/Settings";
import baseCss from "@components/base.css";
import { startGeneration } from "@host/generation";
import { whenDomReady, whenHostReady } from "@host/ready";
import { dropBloomStyles, mountPendingStyles, registerStyle } from "@utils/css";
import { sweepBloomChrome } from "@utils/instance";
import { Logger } from "@utils/Logger";
import { pageWindow } from "@utils/misc";
import { PLUGIN_UPDATED_AT } from "@utils/pluginMtime";
import { StartAt } from "@utils/types";

import { closePanel, isPanelOpen, togglePanel } from "../plugins/_core/settings/panel";
import { watchLandmarks } from "./host/landmarks";
import pluginList from "./plugins";

const logger = new Logger("Bloom");

export const VERSION = BLOOM_VERSION;

export { plugins };

let boot = 0;
let stopLandmarks: (() => void) | undefined;

const SHORTCUT = "__bloomOnShortcut";

type ShortcutHost = { [SHORTCUT]?: (event: KeyboardEvent) => void };

function onShortcut(event: KeyboardEvent) {
    if (event.isComposing || !event.shiftKey || !(event.metaKey || event.ctrlKey)) return;
    if (event.key !== "b" && event.key !== "B") return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    const ours = isPanelOpen();
    closePanel();
    for (const el of document.querySelectorAll("[data-bloom='settings']")) el.remove();
    if (!ours) togglePanel();
}

function bindShortcut() {
    const host = pageWindow as ShortcutHost;
    if (host[SHORTCUT]) document.removeEventListener("keydown", host[SHORTCUT], true);
    host[SHORTCUT] = onShortcut;
    document.addEventListener("keydown", onShortcut, true);
}

export function destroy() {
    boot++;
    document.removeEventListener("keydown", onShortcut, true);
    const host = pageWindow as ShortcutHost;
    if (host[SHORTCUT] === onShortcut) delete host[SHORTCUT];
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
    for (const plugin of pluginList) plugin.updatedAt = PLUGIN_UPDATED_AT[plugin.name];
    registerPlugins(pluginList);
    loadSettings();
    registerStyle("base", baseCss);
    startGeneration();
    bindShortcut();
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
    logger.info(`Bloom++ ${VERSION} app host ready`);
}
