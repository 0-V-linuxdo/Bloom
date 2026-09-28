/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { hideRule } from "@utils/css";
import definePlugin, { OptionType, StartAt } from "@utils/types";

const CHAT = [
    '[data-testid="share-chat-button"]',
    '[data-testid="share-button"]',
    '[data-testid="conversation-share-button"]',
    'button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="分享"], [aria-label="分享对话"])',
];

const PROJECT = [
    '[data-testid="share-project-button"]',
    '[data-testid="project-share-button"]',
    'button:is([aria-label="Share project" i], [aria-label="分享项目"])',
];

const settings = definePluginSettings({
    hideShareChat: { type: OptionType.BOOLEAN, description: "Hide Share on conversations.", default: true },
    hideShareProject: { type: OptionType.BOOLEAN, description: "Hide Share inside projects.", default: true },
});

export default definePlugin({
    name: "NoShareLink",
    description: "Hide Share on conversations and inside projects.",
    authors: ["Bloom contributors"],
    tags: ["ui", "privacy"],
    icon: "share",
    startAt: StartAt.Init,
    settings,
    styles: () => hideRule([...settings.store.hideShareChat ? CHAT : [], ...settings.store.hideShareProject ? PROJECT : []]),
});
