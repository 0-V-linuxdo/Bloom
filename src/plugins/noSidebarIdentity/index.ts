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
 * text column — that collapses the row to the avatar (1.4.9).
 * enlargePlan (when the name is hidden) only bumps Plus/Pro/Free
 * `font-size` / `line-height` to 14px / 1.25 — same as Bloom++.
 * alignPlanWithAvatar (default off, only while the name is hidden)
 * drops the name *line* from flow (`display:none` on the name node /
 * name-row wrapper only) so Plus/Pro/Free sits on the avatar midline.
 * Never `display:none` the `.min-w-0` column, never restyle `.min-w-0`
 * flex/min-height, never `align-items` on the chip (1.4.13 stacked Pro
 * under the avatar by forcing `.min-w-0` to `flex-col`).
 * Never enlarge `.truncate` (1.4.16: a lone truncate is the display
 * name, so `:last-child` restyled "hanlin gao" and
 * `:first-child:not(:last-child)` left it visible). Plan is `.text-xs`
 * / `.text-token-text-*` / a non-truncate sibling of the name.
 * startAt Init so hide CSS is queued before flushStyles (StyleReady /
 * document.head), not after the HostReady island+idle window. Default on.
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
    'button[aria-label*="profile" i][aria-haspopup]',
    'button[aria-label*="account" i][aria-haspopup]',
    '[aria-haspopup="menu"][data-testid*="profile" i]',
];

const NAME_TRUNCATE = PROFILE.flatMap(root => [
    `${root} .min-w-0 > .truncate`,
    `${root} .min-w-0.flex-1 .truncate`,
]);

const NAME_LOOSE = PROFILE.flatMap(root => [
    `${root} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,
    `${root} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,
]);

const NAME_SELECTORS = [...NAME_TRUNCATE, ...NAME_LOOSE];

/**
 * Boxes that keep a blank name row after the inner `.truncate` is hidden.
 * Never `.min-w-0.flex > :first-child` — that row's first child is the avatar
 * (1.4.14). `:not(.flex)` is a block text column; `.flex-col` is a vertical
 * name+plan stack. Skip img / rounded-full so a column that starts with the
 * avatar is left alone.
 */
const NAME_LINE = [
    ...NAME_TRUNCATE,
    ...PROFILE.flatMap(root => [
        `${root} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,
        `${root} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`,
    ]),
];

const EMAIL_SELECTORS = PROFILE.map(root => `${root} a[href^="mailto:"]`);

/** Never `.truncate` — that node is the display name when it is the only child. */
const PLAN_SELECTORS = PROFILE.flatMap(root => [
    `${root} .min-w-0 > :not(.truncate)`,
    `${root} .min-w-0 > :not(.truncate) *`,
    `${root} .min-w-0 .text-xs`,
    `${root} .min-w-0 .text-token-text-secondary:not(.truncate)`,
    `${root} .min-w-0 .text-token-text-tertiary:not(.truncate)`,
    `${root} .text-xs:not(.truncate)`,
    `${root} .text-token-text-secondary:not(.truncate)`,
    `${root} .text-token-text-tertiary:not(.truncate)`,
    `${root} .min-w-0 ~ *`,
    `${root} .min-w-0 ~ * *`,
    `${root} > .text-xs`,
    `${root} > .text-token-text-secondary`,
    `${root} > .text-token-text-tertiary`,
]);

/** Plan sitting in a vertical stack next to the avatar — not a row sibling. */
const PLAN_IN_COLUMN = PROFILE.flatMap(root => [
    `${root} .min-w-0.flex-col > :not(.truncate)`,
    `${root} .min-w-0.flex-col > .text-xs`,
    `${root} .min-w-0.flex-col > .text-token-text-secondary`,
    `${root} .min-w-0.flex-col > .text-token-text-tertiary`,
    `${root} .min-w-0:not(.flex) > :not(.truncate)`,
    `${root} .min-w-0:not(.flex) > .text-xs`,
    `${root} .min-w-0:not(.flex) > .text-token-text-secondary`,
    `${root} .min-w-0:not(.flex) > .text-token-text-tertiary`,
]);

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
        description: "When the name is hidden, enlarge the plan label (font size only).",
        default: true,
    },
    alignPlanWithAvatar: {
        type: OptionType.BOOLEAN,
        description: "When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",
        default: false,
    },
});

/** Hide ink, keep the box. `display:none` on the column drops the slot. */
function hideKeepSlot(selectors: string[]): string {
    return `${selectors.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`;
}

/**
 * Remove the name line from flow. Never the `.min-w-0` column, never chip
 * `align-items`. `flex:0 0 0` stops a leftover wrapper from eating stretch.
 */
function dropNameLine(selectors: string[]): string {
    return `${selectors.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`;
}

/** If the text column stays avatar-tall, park Plus on the midline. */
function centerPlanInColumn(): string {
    return `${PLAN_IN_COLUMN.join(",")}{margin-block:auto!important}`;
}

/** Same type metrics as `.bloom-rail-item`. No flex / display / min-height. */
function enlargePlanCss(): string {
    return `${PLAN_SELECTORS.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`;
}

function apply() {
    const hideName = settings.store.hideUsername !== false;
    const hideMail = settings.store.hideEmail !== false;
    const enlarge = hideName && settings.store.enlargePlan !== false;
    const align = hideName && settings.store.alignPlanWithAvatar === true;
    const rules: string[] = [];
    if (hideName) {
        // Always hide every name truncate *and* a first-paint span/p that is
        // not yet `.truncate` (SSR). A lone `.truncate` is the display name,
        // not Plus/Pro — 1.4.16's :first-child:not(:last-child) skipped it.
        // NAME_LOOSE already excludes .text-xs / token-secondary so enlargePlan
        // still reaches Plus/Pro.
        if (align) {
            rules.push(dropNameLine([...NAME_LINE, ...NAME_LOOSE]));
            rules.push(centerPlanInColumn());
        } else {
            rules.push(hideKeepSlot(NAME_SELECTORS));
        }
    }
    if (hideMail) rules.push(hideKeepSlot(EMAIL_SELECTORS));
    if (enlarge) rules.push(enlargePlanCss());
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
    startAt: StartAt.Init,
    settings,
    start: apply,
    onSettingsChange: apply,
    stop() {
        removeStyle(STYLE_NAME);
    },
});
