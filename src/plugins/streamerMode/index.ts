/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * ChatGPT-side rewrite of Void++ StreamerMode (GPL-3.0-or-later). CSS-only:
 * no html class toggles (hydrateRoot owns <html>), no MutationObserver,
 * no wrapper :has(). Blurs Recents titles, project names, and the account
 * chip. Does not hide or blur Voice, Share, `#bloom-rail-item`, or the
 * composer. Hover unblurs so you can still aim a click.
 */

import { definePluginSettings } from "../../api/Settings";
import { Devs } from "../../utils/constants";
import { registerStyle, removeStyle } from "../../utils/css";
import definePlugin, { OptionType, StartAt } from "../../utils/types";

const STYLE_NAME = "streamerMode";
const BLUR = "filter:blur(6px)!important;transition:filter .2s ease";
const UNBLUR = "filter:none!important";

const PROFILE = [
    '[data-testid="accounts-profile-button"]',
    '[data-testid="profile-button"]',
    '[data-testid="user-menu-button"]',
    '[data-testid="account-menu-button"]',
];

const SIDEBAR = [
    "#stage-slideover-sidebar",
    "nav",
    "#stage-sidebar-tiny-bar",
];

function under(roots: string[], suffix: string): string[] {
    return roots.map(root => `${root} ${suffix}`);
}

const settings = definePluginSettings({
    conversations: {
        type: OptionType.BOOLEAN,
        description: "Blur conversation titles in Recents.",
        default: true,
    },
    projects: {
        type: OptionType.BOOLEAN,
        description: "Blur project names in the sidebar.",
        default: true,
    },
    accountAvatar: {
        type: OptionType.BOOLEAN,
        description: "Blur the account avatar.",
        default: true,
    },
    accountName: {
        type: OptionType.BOOLEAN,
        description: "Blur the account display name.",
        default: true,
    },
    accountEmail: {
        type: OptionType.BOOLEAN,
        description: "Blur a mailto address on the account chip or menu.",
        default: true,
    },
});

function rule(selectors: string[], hover = true): string {
    const sel = selectors.join(",");
    const hoverSel = selectors.map(s => `${s}:hover`).join(",");
    return `${sel}{${BLUR}}${hover ? `${hoverSel}{${UNBLUR}}` : ""}`;
}

function apply() {
    const rules: string[] = [];
    if (settings.store.conversations !== false) {
        rules.push(rule([
            ...under(SIDEBAR, 'a[href^="/c/"]'),
            ...under(SIDEBAR, 'a[href*="/c/"]'),
        ]));
    }
    if (settings.store.projects !== false) {
        rules.push(rule([
            ...under(SIDEBAR, 'a[href*="/project"]'),
            ...under(SIDEBAR, 'a[href*="/g/g-p-"]'),
            ...under(SIDEBAR, '[data-testid="project-name"]'),
            ...under(SIDEBAR, '[data-testid="project-link"]'),
        ]));
    }
    if (settings.store.accountAvatar !== false) {
        rules.push(rule([
            ...under(PROFILE, "img"),
            ...under(PROFILE, '[class*="avatar"]'),
        ], false));
    }
    if (settings.store.accountName !== false) {
        rules.push(rule([
            ...under(PROFILE, ".min-w-0 > .truncate"),
            ...under(PROFILE, ".min-w-0.flex-1 .truncate"),
        ], false));
    }
    if (settings.store.accountEmail !== false) {
        rules.push(rule([
            ...under(PROFILE, 'a[href^="mailto:"]'),
            '[role="menu"] a[href^="mailto:"]',
            '[data-radix-menu-content] a[href^="mailto:"]',
        ], false));
    }
    rules.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}");
    if (!rules.length) {
        removeStyle(STYLE_NAME);
        return;
    }
    registerStyle(STYLE_NAME, rules.join("\n"));
}

export default definePlugin({
    name: "StreamerMode",
    description: "Blur Recents titles, project names, and the account chip while you stream.",
    authors: [Devs.p],
    tags: ["privacy", "ui"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>`,
    enabledByDefault: false,
    startAt: StartAt.HostReady,
    settings,
    start: apply,
    onSettingsChange: apply,
    stop() {
        removeStyle(STYLE_NAME);
    },
});
