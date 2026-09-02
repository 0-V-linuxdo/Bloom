/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Adapted from Void++ NoShareLink (GPL-3.0-or-later). CSS-only: no
 * MutationObserver, no querySelectorAll("button"), no wrapper :has().
 * Styles adopt after HostReady (island gate). Default off.
 */

import { definePluginSettings } from "../../api/Settings";
import { Devs } from "../../utils/constants";
import { registerStyle, removeStyle } from "../../utils/css";
import definePlugin, { OptionType, StartAt } from "../../utils/types";

const STYLE_NAME = "noShareLink";

const CHAT_SELECTORS = [
    'button[data-testid="share-chat-button"]',
];

const PROJECT_SELECTORS = [
    'button[data-testid="share-project-button"]',
    'button[data-testid="project-share-button"]',
];

const settings = definePluginSettings({
    hideShareChat: {
        type: OptionType.BOOLEAN,
        description: "Hide conversation Share",
        default: true,
    },
    hideShareProject: {
        type: OptionType.BOOLEAN,
        description: "Hide project Share",
        default: true,
    },
});

function hide(selectors: string[]): string {
    return `${selectors.join(",")}{display:none!important}`;
}

function apply() {
    const rules: string[] = [];
    if (settings.store.hideShareChat !== false) rules.push(hide(CHAT_SELECTORS));
    if (settings.store.hideShareProject !== false) rules.push(hide(PROJECT_SELECTORS));
    if (!rules.length) {
        removeStyle(STYLE_NAME);
        return;
    }
    registerStyle(STYLE_NAME, rules.join("\n"));
}

export default definePlugin({
    name: "NoShareLink",
    description: "Hide Share on conversations and inside projects.",
    authors: [Devs.p],
    tags: ["ui", "privacy"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>`,
    enabledByDefault: false,
    startAt: StartAt.HostReady,
    settings,
    start: apply,
    onSettingsChange: apply,
    stop() {
        removeStyle(STYLE_NAME);
    },
});
