/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { haltPlugin, isPluginEnabled, isPluginStarted, plugins, runPlugin, setPluginIssue } from "@api/PluginManager";
import { watchBody } from "@utils/dom";
import { Logger } from "@utils/Logger";

import { queryVisible } from "./query";
import { Sel } from "./selectors";

const logger = new Logger("AppLandmarks");

const REQUIRED: Record<string, string[]> = {
    Settings: [Sel.rail],
    WiderChat: [":root"],
    StreamerMode: [Sel.sidebarScroll, Sel.rail],
    ComposerOpacity: [Sel.composer, Sel.composerInput],
    ResponseNotification: [Sel.composerInput],
    InputHistory: [Sel.composerInput],
    Continue: [Sel.composerInput],
    ChatListStatus: [Sel.sidebarScroll],
    StarChats: [Sel.turn],
    BetterNavigator: [Sel.timelineScroll, Sel.turn],
    BetterQuotes: [Sel.turn],
    MessageTimestamps: [Sel.turn],
    RecentTopics: [Sel.sidebarScroll],
};

export function syncLandmarks() {
    for (const [name, selectors] of Object.entries(REQUIRED)) {
        const plugin = plugins.get(name);
        if (!plugin || plugin.required || !isPluginEnabled(plugin)) {
            setPluginIssue(name, null);
            continue;
        }
        const found = selectors.some(selector => queryVisible(selector));
        setPluginIssue(name, found ? null : selectors);
        if (!found) {
            if (!isPluginStarted(plugin.name)) continue;
            haltPlugin(plugin);
            logger.warn(`${name} paused; missing ${selectors.join(", ")}`);
            continue;
        }
        if (isPluginStarted(plugin.name)) continue;
        runPlugin(plugin);
        logger.info(`${name} resumed`);
    }
}

export function watchLandmarks() {
    syncLandmarks();
    return watchBody(() => syncLandmarks());
}
