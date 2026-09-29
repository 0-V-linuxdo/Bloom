/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { useIdentityMarks } from "@host/identity";
import { Sel } from "@host/selectors";
import definePlugin, { OptionType, StartAt } from "@utils/types";

const BLUR = "filter:blur(6px)!important;transition:filter 0.2s ease";
const SIDEBAR = `:is(${Sel.sidebars})`;

const GROUPS = {
    conversations: { selectors: [`${SIDEBAR} a[href*="/c/"]`, ".bloom-recent-title", ".bloom-recent-preview"], hover: true },
    projects: { selectors: [`${SIDEBAR} a:is([href*="/project"], [href*="/g/g-p-"])`, "[data-app-action-sidebar-project-row]", ".bloom-recent-project"], hover: true },
    accountAvatar: { selectors: ["[data-bloom-profile-avatar]", "[data-bloom-menu-avatar]", "[data-bloom-profile] img", "[data-bloom-csi-avatar]"], hover: false },
    accountName: { selectors: ["[data-bloom-profile-name]", "[data-bloom-menu-name]"], hover: false },
    accountEmail: { selectors: ["[data-bloom-profile-email]", "[data-bloom-menu-email]", '[role="menu"] a[href^="mailto:"]'], hover: false },
    headerTitle: { selectors: ["#page-header h1", '[data-testid="conversation-title"]', '[data-testid="thread-title"]', "header [data-conversation-title]"], hover: false },
} as const;

const settings = definePluginSettings({
    conversations: { type: OptionType.BOOLEAN, description: "Blur conversation titles in the sidebar and the recent chats switcher.", default: true },
    projects: { type: OptionType.BOOLEAN, description: "Blur project names.", default: true },
    accountAvatar: { type: OptionType.BOOLEAN, description: "Blur the account avatar.", default: true },
    accountName: { type: OptionType.BOOLEAN, description: "Blur the account name.", default: true },
    accountEmail: { type: OptionType.BOOLEAN, description: "Blur the account email.", default: true },
    headerTitle: { type: OptionType.BOOLEAN, description: "Blur the conversation title at the top of the page.", default: true },
});

function css() {
    return Object.entries(GROUPS).filter(([key]) => settings.store[key as keyof typeof GROUPS]).map(([, { selectors, hover }]) => {
        const list = selectors.join(",");
        return `:is(${list}){${BLUR}}` + (hover ? `:is(${list}):hover, .bloom-recent-item:hover :is(${list}){filter:none!important}` : "");
    }).join("\n");
}

let release: (() => void) | undefined;

export default definePlugin({
    name: "StreamerMode",
    description: "Blur conversation titles, project names and your account details while you stream.",
    authors: ["Bloom contributors"],
    tags: ["privacy", "ui"],
    icon: "eyeOff",
    startAt: StartAt.Init,
    settings,
    styles: css,
    start() {
        release = useIdentityMarks();
    },
    stop() {
        release?.();
    },
});
