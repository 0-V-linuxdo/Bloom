/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * ChatGPT-side rewrite of Void++ StreamerMode (GPL-3.0-or-later). CSS-only:
 * no html class toggles (hydrateRoot owns <html>), no MutationObserver,
 * no wrapper :has(). Blurs Recents titles, project names, and the account
 * chip. Also blurs the open-chat header title and RecentTopics HUD
 * titles so a screen share of the thread does not leak names. CustomSidebarIdentity
 * paints via CSS on the official profile `img` / `.truncate`, so the existing
 * account avatar / name toggles already cover it. Does not hide or blur Voice, Share, `#bloom-rail-item`,
 * or the composer.
 * Hover unblurs Recents / HUD cards so you can still aim a click.
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
    headerTitle: {
        type: OptionType.BOOLEAN,
        description: "Blur the open conversation title in the page header.",
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
        rules.push(
            "#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}"
            + "#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}",
        );
    }
    if (settings.store.projects !== false) {
        rules.push(rule([
            ...under(SIDEBAR, 'a[href*="/project"]'),
            ...under(SIDEBAR, 'a[href*="/g/g-p-"]'),
            ...under(SIDEBAR, '[data-testid="project-name"]'),
            ...under(SIDEBAR, '[data-testid="project-link"]'),
        ]));
        rules.push(
            "#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}"
            + "#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}",
        );
    }
    if (settings.store.headerTitle !== false) {
        rules.push(rule([
            "#page-header h1",
            "#page-header h2",
            '#page-header [data-testid="conversation-title"]',
            '#page-header [data-testid="thread-title"]',
            '[data-testid="temporary-chat-label"]',
        ], false));
    }
    if (settings.store.accountAvatar !== false) {
        rules.push(rule([
            ...under(PROFILE, "img"),
            ...under(PROFILE, '[class*="avatar"]'),
            ".bloom-csi-face",
        ], false));
    }
    if (settings.store.accountName !== false) {
        rules.push(rule([
            ...under(PROFILE, ".min-w-0 > .truncate"),
            ...under(PROFILE, ".min-w-0.flex-1 .truncate"),
            ...under(PROFILE, ".bloom-csi-name"),
            ".bloom-csi-name",
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
    rules.push(
        '#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,'
        + '#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,'
        + '#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,'
        + '#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,'
        + 'form[data-type="unified-composer"],form[data-type="unified-composer"] *'
        + "{filter:none!important}",
    );
    if (!rules.length) {
        removeStyle(STYLE_NAME);
        return;
    }
    registerStyle(STYLE_NAME, rules.join("\n"));
}

export default definePlugin({
    name: "StreamerMode",
    description: "Blur Recents titles, the header chat name, project names, and the account chip while you stream.",
    authors: [Devs.p],
    tags: ["privacy", "ui"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>`,
    enabledByDefault: false,
    startAt: StartAt.Init,
    settings,
    start: apply,
    onSettingsChange: apply,
    stop() {
        removeStyle(STYLE_NAME);
    },
});
