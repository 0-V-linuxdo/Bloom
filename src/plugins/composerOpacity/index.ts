/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * ChatGPT-side rewrite of Void++ ComposerOpacity (GPL-3.0-or-later).
 * CSS-only: no MutationObserver, no querySelectorAll, no wrapper :has(),
 * no Grok `.query-bar` / hsl(--surface-l1), no pointer-events:none (that
 * would eat composer clicks). Opacity 100 leaves ChatGPT native (removeStyle).
 * Fill uses --bg-primary (composer card token). Never hide Voice / Share /
 * the avatar / #bloom-rail-item / the whole #thread-bottom-container.
 */

import { definePluginSettings } from "../../api/Settings";
import { Devs } from "../../utils/constants";
import { registerStyle, removeStyle } from "../../utils/css";
import { clamp } from "../../utils/misc";
import definePlugin, { OptionType, StartAt } from "../../utils/types";

const STYLE_NAME = "composerOpacity";
const FORM = 'form[data-type="unified-composer"],form.w-full[data-type]';
const PILL = [
    `${FORM} [class*="corner-superellipse"]`,
    `${FORM} [class*="bg-token-bg-primary"]`,
    `${FORM} [class*="bg-token-main-surface"]`,
].join(",");
const FADE = [
    "#thread-bottom-container::after",
    "#thread-bottom::after",
    '#thread-bottom-container [class*="content-fade"]',
    '#thread-bottom [class*="content-fade"]',
].join(",");
const SLAB = "#thread-bottom-container,#thread-bottom";
const EDITOR = `${FORM} #prompt-textarea,${FORM} [contenteditable="true"]`;
const FILL = "var(--bg-primary,var(--main-surface-primary,#ffffff))";

const settings = definePluginSettings({
    opacity: {
        type: OptionType.SLIDER,
        description: "Composer background opacity. 100 is ChatGPT’s native fill.",
        min: 0,
        max: 100,
        default: 100,
    },
    blur: {
        type: OptionType.SLIDER,
        description: "Backdrop blur in pixels. Applies when opacity is below 100.",
        min: 0,
        max: 40,
        default: 16,
    },
});

function pct(): number {
    return clamp(Number(settings.store.opacity ?? 100), 0, 100);
}

function blurPx(): number {
    return clamp(Number(settings.store.blur ?? 16), 0, 40);
}

function apply() {
    const opacity = pct();
    if (opacity >= 100) {
        removeStyle(STYLE_NAME);
        return;
    }
    const blur = blurPx();
    const mix = `color-mix(in srgb,${FILL} ${opacity}%,transparent)`;
    const frost = blur > 0
        ? `-webkit-backdrop-filter:blur(${blur}px)!important;backdrop-filter:blur(${blur}px)!important;`
        : "-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";
    registerStyle(
        STYLE_NAME,
        `${SLAB}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}`
        + `${FADE}{display:none!important}`
        + `${FORM}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}`
        + `${PILL}{background-color:${mix}!important;background-image:none!important;${frost}}`
        + `${EDITOR}{background-color:transparent!important;background-image:none!important}`,
    );
}

export default definePlugin({
    name: "ComposerOpacity",
    description: "Composer background opacity and blur, so the thread can show through the input bar.",
    authors: [Devs.p],
    tags: ["ui", "chat"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>`,
    enabledByDefault: true,
    startAt: StartAt.HostReady,
    settings,
    start: apply,
    onSettingsChange: apply,
    stop() {
        removeStyle(STYLE_NAME);
    },
});
