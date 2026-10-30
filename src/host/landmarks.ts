/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { showNotice } from "@api/Notices";
import { isPluginEnabled, plugins, setPluginIssue } from "@api/PluginManager";
import { readSetting, writeSetting } from "@api/Settings";
import { every } from "@utils/dom";
import { Logger } from "@utils/Logger";

import { currentConversationId, isHomePath, isProjectHome } from "./route";
import { Sel } from "./selectors";

const logger = new Logger("Landmarks");

type Scope = "thread" | "composer" | "sidebar";

const CHECK_MS = 2000;
const GRACE_MS = 10_000;
const DESKTOP_WIDTH = 1024;

const SCOPES: Record<Scope, { applies: () => boolean; selectors: string[]; }> = {
    thread: { applies: () => !!currentConversationId(), selectors: [Sel.turn] },
    composer: { applies: () => isHomePath() || isProjectHome() || !!currentConversationId(), selectors: [Sel.composerInput] },
    sidebar: { applies: () => innerWidth >= DESKTOP_WIDTH, selectors: [Sel.sidebarScroll, Sel.rail, Sel.oldSidebar, Sel.oldRail] },
};

const REQUIRED: Record<string, Scope[]> = {
    BetterNavigator: ["thread"],
    BetterQuotes: ["thread"],
    MessageTimestamps: ["thread"],
    StarChats: ["thread"],
    UserQuotes: ["thread"],
    ComposerOpacity: ["composer"],
    Continue: ["composer"],
    InputHistory: ["composer"],
    PromptQueue: ["composer"],
    ChatListStatus: ["sidebar"],
    CustomSidebarIdentity: ["sidebar"],
    NoSidebarIdentity: ["sidebar"],
    SidebarIdentityOpacity: ["sidebar"],
};

const missingSince = new Map<Scope, number>();
const broken = new Set<Scope>();

function checkScopes() {
    const now = Date.now();
    for (const [scope, { applies, selectors }] of Object.entries(SCOPES) as [Scope, typeof SCOPES[Scope]][]) {
        if (!applies()) {
            missingSince.delete(scope);
            continue;
        }
        if (selectors.some(selector => document.querySelector(selector))) {
            missingSince.delete(scope);
            broken.delete(scope);
            continue;
        }
        const since = missingSince.get(scope) ?? now;
        missingSince.set(scope, since);
        if (now - since >= GRACE_MS) broken.add(scope);
    }
}

function report() {
    const affected: string[] = [];
    for (const [name, scopes] of Object.entries(REQUIRED)) {
        const plugin = plugins.get(name);
        const lost = plugin && isPluginEnabled(plugin) ? scopes.filter(scope => broken.has(scope)) : [];
        setPluginIssue(name, lost.length ? lost.flatMap(scope => SCOPES[scope].selectors) : null);
        if (lost.length) affected.push(name);
    }
    if (!affected.length) return;
    const stamp = `${BLOOM_VERSION}|${affected.join(",")}`;
    if (readSetting("Settings", "landmarkNotice") === stamp) return;
    writeSetting("Settings", "landmarkNotice", stamp);
    logger.warn(`Page anchors missing for ${affected.join(", ")}`);
    showNotice({
        key: "landmarks",
        type: "warning",
        title: "Bloom++ can't find parts of this page",
        message: `${affected.join(", ")} may not work until Bloom++ is updated. Details are in Bloom++ settings.`,
        duration: 0,
    });
}

function sync() {
    if (document.hidden) {
        missingSince.clear();
        return;
    }
    checkScopes();
    report();
}

export function watchLandmarks() {
    missingSince.clear();
    broken.clear();
    return every(sync, CHECK_MS);
}
