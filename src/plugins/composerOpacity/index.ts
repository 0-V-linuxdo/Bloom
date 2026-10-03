/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { Sel } from "@host/selectors";
import definePlugin, { OptionType, StartAt } from "@utils/types";

const FORM = `form:has(:is(${Sel.composerInput})), ${Sel.oldComposerForm}`;
const LAYOUT_BODY = '[class*="ComposerLayoutBody"]';
const LAYOUT_ROOT = '[class*="ComposerLayoutRoot"]';
const LEGACY_PILL = '[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]';
const PILL = `:is(${FORM}) ${LAYOUT_BODY}, :is(${FORM}):not(:has(${LAYOUT_BODY})) ${LAYOUT_ROOT}, :is(${FORM}):not(:has(${LAYOUT_BODY})):not(:has(${LAYOUT_ROOT})) :is(${LEGACY_PILL})`;
const SLAB = '#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])';
const FADE = '#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]';
const FILL = "var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))";

const settings = definePluginSettings({
    opacity: { type: OptionType.SLIDER, description: "Composer background opacity. 100 keeps ChatGPT's own fill.", min: 0, max: 100, default: 100, unit: "%" },
    blur: { type: OptionType.SLIDER, description: "Backdrop blur, used when opacity is below 100.", min: 0, max: 40, default: 16, unit: "px" },
});

function css() {
    const { opacity, blur } = settings.store;
    if (opacity >= 100) return "";
    const clear = "background-color:transparent!important;background-image:none!important;box-shadow:none!important";
    const paint = `background-color:color-mix(in srgb, ${FILL} ${opacity}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${blur}px)!important;-webkit-backdrop-filter:blur(${blur}px)!important`;
    const bareRoot = `background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important`;
    return `:is(${SLAB}), :is(${FORM}){${clear}}`
        + `:is(${FADE}){display:none!important}`
        + `${PILL}{${paint}}`
        + `:is(${FORM}):has(${LAYOUT_BODY}) ${LAYOUT_ROOT}{${bareRoot}}`
        + `:is(${FORM}) :is(${Sel.composerInput}){background-color:transparent!important}`;
}

export default definePlugin({
    name: "ComposerOpacity",
    description: "Make the composer see-through with a blur, so the thread shows behind it.",
    authors: ["Bloom contributors"],
    tags: ["ui", "chat"],
    icon: "layout",
    enabledByDefault: true,
    startAt: StartAt.Init,
    settings,
    styles: css,
});
