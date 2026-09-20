/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * ChatGPT-side rewrite of Void++ WiderChat (GPL-3.0-or-later). CSS-only:
 * no MutationObserver, no querySelectorAll, no wrapper :has(), no Grok
 * `.breakout` / `--content-max-width`. Overrides ChatGPT's
 * `--thread-content-max-width` (~40rem) on the thread and composer.
 */

import { definePluginSettings } from "../../api/Settings";
import { Devs } from "../../utils/constants";
import { registerStyle, removeStyle } from "../../utils/css";
import { clamp } from "../../utils/misc";
import definePlugin, { OptionType, StartAt } from "../../utils/types";

const STYLE_NAME = "widerChat";
const MIN = 40;
const MAX = 96;
const DEFAULT = 64;

const settings = definePluginSettings({
    width: {
        type: OptionType.SLIDER,
        description: "Maximum thread width (rem). ChatGPT’s default is 40.",
        min: MIN,
        max: MAX,
        default: DEFAULT,
    },
});

function rem(): number {
    return clamp(Number(settings.store.width ?? DEFAULT), MIN, MAX);
}

function apply() {
    const w = rem();
    const cap = `min(100%,${w}rem)`;
    registerStyle(
        STYLE_NAME,
        `:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${w}rem!important;--thread-content-width:${w}rem!important;--user-chat-width:${w}rem!important;--composer-container-max-width:${w}rem!important;--thread-xl-max-width:${w}rem!important}`
        + `[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${w}rem!important;--thread-content-width:${w}rem!important}`
        + `[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${cap}!important}`
        + `#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${cap}!important}`
        + `#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${cap}!important}`
        + `[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${cap}!important}`,
    );
}

export default definePlugin({
    name: "WiderChat",
    description: "Widen the thread and composer. ChatGPT caps them at about 40rem.",
    authors: [Devs.p],
    tags: ["ui"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>`,
    enabledByDefault: true,
    startAt: StartAt.Init,
    settings,
    start: apply,
    onSettingsChange: apply,
    stop() {
        removeStyle(STYLE_NAME);
    },
});
