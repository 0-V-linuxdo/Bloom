/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Adapted from Void++ NoShareLink (GPL-3.0-or-later). CSS-only: no
 * MutationObserver, no querySelectorAll("button"), no wrapper :has().
 * start() queues CSS at Init; Bloom.flushStyles appends to head at HostReady.
 */

import { definePluginSettings } from "../../api/Settings";
import { Devs } from "../../utils/constants";
import { registerStyle, removeStyle } from "../../utils/css";
import definePlugin, { OptionType, StartAt } from "../../utils/types";

const STYLE_NAME = "noShareLink";

const CHAT_SELECTORS = [
    'button[data-testid="share-chat-button"]',
    '#conversation-header-actions button[aria-label="Share"]',
    '#conversation-header-actions button[aria-label="Share chat"]',
    '#conversation-header-actions button[aria-label="Share Chat"]',
    '#conversation-header-actions button[aria-label="Create share link"]',
    '#conversation-header-actions button[aria-label="分享"]',
    '#conversation-header-actions button[aria-label="分享对话"]',
    '#conversation-header-actions button[aria-label="分享聊天"]',
    '#conversation-header-actions button[aria-label="创建分享链接"]',
    '#page-header button[aria-label="Share"]',
    '#page-header button[aria-label="Share chat"]',
    '#page-header button[aria-label="Share Chat"]',
    '#page-header button[aria-label="Create share link"]',
    '#page-header button[aria-label="分享"]',
    '#page-header button[aria-label="分享对话"]',
    '#page-header button[aria-label="分享聊天"]',
    '#page-header button[aria-label="创建分享链接"]',
    '[data-testid="conversation-header-actions"] button[aria-label="Share"]',
    '[data-testid="conversation-header-actions"] button[aria-label="分享"]',
    '[data-testid="conversation-header-actions"] button[aria-label="分享对话"]',
];

const PROJECT_SELECTORS = [
    'button[data-testid="share-project-button"]',
    'button[data-testid="project-share-button"]',
    'button[aria-label="Share project"]',
    'button[aria-label="Share Project"]',
    'button[aria-label="分享项目"]',
    '[data-testid="project-header"] button[aria-label="Share"]',
    '[data-testid="project-header"] button[aria-label="分享"]',
    '[data-testid="project-page"] button[aria-label="Share"]',
    '[data-testid="project-page"] button[aria-label="分享"]',
];

const settings = definePluginSettings({
    hideShareChat: {
        type: OptionType.BOOLEAN,
        description: "Hide the header Share button on conversations.",
        default: true,
    },
    hideShareProject: {
        type: OptionType.BOOLEAN,
        description: "Inside a project: hide the Share / Share project button.",
        default: true,
    },
});

function hide(selectors: string[]): string {
    return `${selectors.join(",\n")}{display:none!important}`;
}

function apply() {
    const rules: string[] = [];
    if (settings.store.hideShareChat !== false) rules.push(hide(CHAT_SELECTORS));
    if (settings.store.hideShareProject !== false) rules.push(hide(PROJECT_SELECTORS));
    registerStyle(STYLE_NAME, rules.join("\n"));
}

export default definePlugin({
    name: "NoShareLink",
    description: "Hide share buttons: conversation Share (header) and Share project.",
    authors: [Devs.p],
    tags: ["ui", "privacy"],
    enabledByDefault: false,
    startAt: StartAt.Init,
    settings,
    start: apply,
    onSettingsChange: apply,
    stop() {
        removeStyle(STYLE_NAME);
    },
});
