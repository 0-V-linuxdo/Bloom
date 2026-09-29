/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { useIdentityMarks } from "@host/identity";
import { Sel } from "@host/selectors";
import definePlugin, { OptionType, StartAt } from "@utils/types";

const FOOTER = `:is(${Sel.sidebarScroll}, :has(> ${Sel.sidebarScroll})) + :has(${Sel.menuButton})`;
const RAIL_ROW = `${Sel.rail} > :has(${Sel.menuButton})`;
const ROW = `:is(${FOOTER}, ${RAIL_ROW}, ${Sel.oldProfile}):not(:hover)`;
const AVATAR = "[data-bloom-profile-avatar]";
const BESIDE_AVATAR = `:is(${ROW}, ${ROW} :has(${AVATAR})) > :not(${AVATAR}, :has(${AVATAR}))`;

const settings = definePluginSettings({
    opacity: { type: OptionType.SLIDER, description: "Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.", min: 0, max: 100, default: 50, unit: "%" },
    fadeAvatar: { type: OptionType.BOOLEAN, description: "Fade the avatar too, including a custom one.", default: false },
});

function css() {
    const { opacity, fadeAvatar } = settings.store;
    return opacity >= 100 ? "" : `${fadeAvatar ? ROW : BESIDE_AVATAR}{opacity:${opacity / 100}!important}`;
}

let release: (() => void) | undefined;

export default definePlugin({
    name: "SidebarIdentityOpacity",
    description: "Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",
    authors: ["Bloom contributors"],
    tags: ["ui"],
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
