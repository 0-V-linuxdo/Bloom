/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Adapted from Void++ NoSidebarIdentity (GPL-3.0-or-later). CSS-only: no
 * MutationObserver, no querySelectorAll("button"), no wrapper :has().
 * Hides the display name (and mailto, if present) next to the account
 * avatar. Does not hide the avatar, #bloom-rail-item, or the chip itself.
 * Default hide keeps the name box (`visibility:hidden`) so the chip
 * keeps its slot next to Bloom++. Never `display:none` the `.min-w-0`
 * text column — that collapses the row to the avatar.
 * enlargePlan (when the name is hidden) drops the name node instead so
 * Plus/Pro/Free sits on the name baseline, 14px/500, vertically centered
 * with the 32px avatar — same metrics as the Bloom++ rail label.
 * Styles adopt after HostReady. Default on.
 */

import { definePluginSettings } from "../../api/Settings";
import { Devs } from "../../utils/constants";
import { registerStyle, removeStyle } from "../../utils/css";
import definePlugin, { OptionType, StartAt } from "../../utils/types";

const STYLE_NAME = "noSidebarIdentity";

const PROFILE = [
    '[data-testid="accounts-profile-button"]',
    '[data-testid="profile-button"]',
    '[data-testid="user-menu-button"]',
    '[data-testid="account-menu-button"]',
];

const NAME_TRUNCATE = PROFILE.flatMap(root => [
    `${root} .min-w-0 > .truncate`,
    `${root} .min-w-0.flex-1 .truncate`,
]);

const NAME_SELECTORS = [
    ...NAME_TRUNCATE,
    ...PROFILE.flatMap(root => [
        `${root} .min-w-0 > span`,
        `${root} .min-w-0 > p`,
    ]),
];

const EMAIL_SELECTORS = PROFILE.map(root => `${root} a[href^="mailto:"]`);

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
    enlargePlan: {
        type: OptionType.BOOLEAN,
        description: "When the name is hidden, enlarge the plan label so it lines up with the avatar.",
        default: true,
    },
});

/** Hide ink, keep the box. `display:none` drops the slot and shrinks the chip. */
function hideKeepSlot(selectors: string[]): string {
    return `${selectors.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`;
}

/** Drop the name node so the plan label moves onto that baseline. Never the column. */
function hideGone(selectors: string[]): string {
    return `${selectors.join(",")}{display:none!important}`;
}

/** 14px / 500 / 32px min-height — same as `.bloom-rail-item` + `.bloom-rail-mark`. */
function enlargePlanCss(): string {
    return PROFILE.map(root => [
        `${root}{align-items:center!important}`,
        `${root} .min-w-0{display:flex!important;flex-direction:column!important;justify-content:center!important;min-height:32px!important}`,
        `${root} .min-w-0,${root} .min-w-0 *{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`,
    ].join("")).join("");
}

function apply() {
    const hideName = settings.store.hideUsername !== false;
    const hideMail = settings.store.hideEmail !== false;
    const enlarge = hideName && settings.store.enlargePlan !== false;
    const rules: string[] = [];
    if (enlarge) {
        rules.push(hideGone(NAME_TRUNCATE));
        if (hideMail) rules.push(hideGone(EMAIL_SELECTORS));
        rules.push(enlargePlanCss());
    } else {
        if (hideName) rules.push(hideKeepSlot(NAME_SELECTORS));
        if (hideMail) rules.push(hideKeepSlot(EMAIL_SELECTORS));
    }
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
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-join="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>`,
    enabledByDefault: true,
    startAt: StartAt.HostReady,
    settings,
    start: apply,
    onSettingsChange: apply,
    stop() {
        removeStyle(STYLE_NAME);
    },
});
