/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType, StartAt } from "@utils/types";

const VARIABLES = ["--thread-content-max-width", "--thread-content-width", "--user-chat-width", "--composer-container-max-width", "--thread-xl-max-width"];
const SCOPES = ":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]";
const CAPPED = '[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])';

const settings = definePluginSettings({
    width: { type: OptionType.SLIDER, description: "Maximum width of the thread and composer. ChatGPT uses about 40–48rem.", min: 40, max: 96, default: 64, unit: "rem" },
});

function css() {
    const width = `${settings.store.width}rem`;
    return `:is(${SCOPES}){${VARIABLES.map(name => `${name}:${width}!important`).join(";")}}`
        + `:is(${CAPPED}){max-width:min(100%, ${width})!important}`;
}

export default definePlugin({
    name: "WiderChat",
    description: "Widen the thread and the composer.",
    authors: ["Bloom contributors"],
    tags: ["ui"],
    icon: "width",
    enabledByDefault: true,
    startAt: StartAt.Init,
    settings,
    styles: css,
});
