/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { useIdentityMarks } from "@host/identity";
import definePlugin, { OptionType, StartAt } from "@utils/types";

const NAME = '[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child';
const EMAIL = '[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]';
const PLAN = "[data-bloom-profile-plan]";
const KEEP_SLOT = "visibility:hidden!important;user-select:none!important";

const settings = definePluginSettings({
    hideUsername: { type: OptionType.BOOLEAN, description: "Hide the display name next to the sidebar avatar.", default: true },
    hideEmail: { type: OptionType.BOOLEAN, description: "Hide an email address on the account chip.", default: true },
    enlargePlan: { type: OptionType.BOOLEAN, description: "When the name is hidden, show the plan label at 14px.", default: true },
    alignPlanWithAvatar: { type: OptionType.BOOLEAN, description: "When the name is hidden, drop its line so the plan sits level with the avatar.", default: false },
});

function css() {
    const { hideUsername, hideEmail, enlargePlan, alignPlanWithAvatar } = settings.store;
    const rules: string[] = [];
    if (hideUsername) rules.push(alignPlanWithAvatar ? `:is(${NAME}){display:none!important}` : `:is(${NAME}){${KEEP_SLOT}}`);
    if (hideEmail) rules.push(`:is(${EMAIL}){${KEEP_SLOT}}`);
    if (hideUsername && enlargePlan) rules.push(`${PLAN}{font-size:14px!important;line-height:1.25!important}`);
    return rules.join("\n");
}

let release: (() => void) | undefined;

export default definePlugin({
    name: "NoSidebarIdentity",
    description: "Hide the sidebar display name. The avatar stays clickable.",
    authors: ["Bloom contributors"],
    tags: ["ui", "privacy"],
    icon: "user",
    enabledByDefault: true,
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
