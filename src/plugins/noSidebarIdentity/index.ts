/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Adapted from Void++ NoSidebarIdentity (GPL-3.0-or-later). CSS-only: no
 * MutationObserver, no querySelectorAll("button"), no wrapper :has().
 * Hides the display name (and mailto, if present) next to the account
 * avatar. Does not hide the avatar, #bloom-rail-item, or the chip itself.
 * The name/email nodes stay in layout (`visibility:hidden`) so the chip
 * keeps its slot next to Bloom++. Never `display:none` the `.min-w-0`
 * text column — that collapses the row to the avatar. Styles adopt after
 * HostReady. Default on.
 */

import { definePluginSettings } from "../../api/Settings";
import { Devs } from "../../utils/constants";
import { registerStyle, removeStyle } from "../../utils/css";
import definePlugin, { OptionType, StartAt } from "../../utils/types";

const STYLE_NAME = "noSidebarIdentity";

const NAME_SELECTORS = [
    '[data-testid="accounts-profile-button"] .min-w-0 > .truncate',
    '[data-testid="profile-button"] .min-w-0 > .truncate',
    '[data-testid="user-menu-button"] .min-w-0 > .truncate',
    '[data-testid="account-menu-button"] .min-w-0 > .truncate',
    '[data-testid="accounts-profile-button"] .min-w-0.flex-1 .truncate',
    '[data-testid="profile-button"] .min-w-0.flex-1 .truncate',
    '[data-testid="accounts-profile-button"] .min-w-0 > span',
    '[data-testid="profile-button"] .min-w-0 > span',
    '[data-testid="accounts-profile-button"] .min-w-0 > p',
    '[data-testid="profile-button"] .min-w-0 > p',
];

const EMAIL_SELECTORS = [
    '[data-testid="accounts-profile-button"] a[href^="mailto:"]',
    '[data-testid="profile-button"] a[href^="mailto:"]',
    '[data-testid="user-menu-button"] a[href^="mailto:"]',
    '[data-testid="account-menu-button"] a[href^="mailto:"]',
];

const settings = definePluginSettings({
    hideUsername: {
        type: OptionType.BOOLEAN,
        description: "Hide the display name next to the sidebar avatar.",
        default: true,
    },
    hideEmail: {
        type: OptionType.BOOLEAN,
        description: "Hide a mailto address next to the sidebar avatar, if shown.",
        default: true,
    },
});

/** Hide ink, keep the box. `display:none` drops the slot and shrinks the chip. */
function hideKeepSlot(selectors: string[]): string {
    return `${selectors.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`;
}

function apply() {
    const hideName = settings.store.hideUsername !== false;
    const hideMail = settings.store.hideEmail !== false;
    const rules: string[] = [];
    if (hideName) rules.push(hideKeepSlot(NAME_SELECTORS));
    if (hideMail) rules.push(hideKeepSlot(EMAIL_SELECTORS));
    if (!rules.length) {
        removeStyle(STYLE_NAME);
        return;
    }
    registerStyle(STYLE_NAME, rules.join("\n"));
}

export default definePlugin({
    name: "NoSidebarIdentity",
    description: "Hide the sidebar display name. Avatar stays clickable.",
    authors: [Devs.p],
    tags: ["ui", "privacy"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>`,
    enabledByDefault: true,
    startAt: StartAt.HostReady,
    settings,
    start: apply,
    onSettingsChange: apply,
    stop() {
        removeStyle(STYLE_NAME);
    },
});
