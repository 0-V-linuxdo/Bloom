/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { whenBody } from "@host/ready";
import { currentConversationId } from "@host/route";
import { hideRule } from "@utils/css";
import { hostMutations, watchBody } from "@utils/dom";
import { normalizeText } from "@utils/misc";
import definePlugin, { OptionType, StartAt } from "@utils/types";

const MARK = "data-bloom-share";
const PROJECT_PAGE = /^\/g\/g-p-/;
const SHARE_LABEL = /^(?:share|分享)$/i;

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
    `[${MARK}="project"]`,
];

const settings = definePluginSettings({
    hideShareChat: { type: OptionType.BOOLEAN, description: "Hide Share on conversations.", default: true },
    hideShareProject: { type: OptionType.BOOLEAN, description: "Hide Share inside projects.", default: true },
});

let unwatch: (() => void) | undefined;
let active = false;

function markProjectShare(mutations: MutationRecord[]) {
    if (!hostMutations(mutations)) return;
    const onProject = PROJECT_PAGE.test(location.pathname) && !currentConversationId();
    for (const button of document.querySelectorAll(`button[aria-haspopup="dialog"], [${MARK}]`)) {
        if (!onProject || !SHARE_LABEL.test(normalizeText(button.textContent ?? ""))) button.removeAttribute(MARK);
        else if (!button.hasAttribute(MARK)) button.setAttribute(MARK, "project");
    }
}

export default definePlugin({
    name: "NoShareLink",
    description: "Hide Share on conversations and inside projects.",
    authors: ["Bloom contributors"],
    tags: ["ui", "privacy"],
    icon: "share",
    startAt: StartAt.Init,
    settings,
    styles: () => hideRule([...settings.store.hideShareChat ? CHAT : [], ...settings.store.hideShareProject ? PROJECT : []]),
    start() {
        active = true;
        void whenBody().then(() => {
            if (active && !unwatch) unwatch = watchBody(markProjectShare);
        });
    },
    stop() {
        active = false;
        unwatch?.();
        unwatch = undefined;
        for (const el of document.querySelectorAll(`[${MARK}]`)) el.removeAttribute(MARK);
    },
});
