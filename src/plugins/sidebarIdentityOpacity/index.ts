/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { Sel } from "@host/selectors";
import definePlugin, { OptionType, StartAt } from "@utils/types";

const FOOTER = `:is(${Sel.sidebarScroll}, :has(> ${Sel.sidebarScroll})) + :has(${Sel.menuButton})`;
const RAIL_ROW = `${Sel.rail} > :has(${Sel.menuButton})`;

const settings = definePluginSettings({
    opacity: { type: OptionType.SLIDER, description: "Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.", min: 0, max: 100, default: 50, unit: "%" },
});

function css() {
    const { opacity } = settings.store;
    return opacity >= 100 ? "" : `:is(${FOOTER}, ${RAIL_ROW}, ${Sel.oldProfile}):not(:hover){opacity:${opacity / 100}!important}`;
}

export default definePlugin({
    name: "SidebarIdentityOpacity",
    description: "Fade the account row in the bottom-left of the sidebar. Hover brings it back to full opacity.",
    authors: ["Bloom contributors"],
    tags: ["ui"],
    icon: "user",
    enabledByDefault: true,
    startAt: StartAt.Init,
    settings,
    styles: css,
});
