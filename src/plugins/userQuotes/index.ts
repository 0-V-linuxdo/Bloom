/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType, StartAt } from "@utils/types";

const SEL = [
    '[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)',
    '[data-message-author-role="user"] blockquote:not(.twitter-tweet)',
].join(",");

const settings = definePluginSettings({
    italic: { type: OptionType.BOOLEAN, description: "Render quoted lines in italic.", default: true },
    quotes: { type: OptionType.BOOLEAN, description: "Wrap quoted lines in decorative quotation marks.", default: false },
});

function css() {
    const rules = [
        `${SEL}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,
        `${SEL}>*{margin-block:0!important}`,
    ];
    if (!settings.store.italic) rules.push(`${SEL}{font-style:inherit!important}`);
    if (!settings.store.quotes) {
        rules.push(`${SEL}{quotes:none!important}`);
        rules.push(`${SEL}::before,${SEL}::after,${SEL} p::before,${SEL} p::after{content:none!important}`);
    }
    return rules.join("\n");
}

export default definePlugin({
    name: "UserQuotes",
    description: "Show a left bar on quoted lines in your own messages.",
    authors: ["Bloom contributors"],
    tags: ["chat", "ui"],
    icon: "quote",
    enabledByDefault: true,
    startAt: StartAt.Init,
    settings,
    styles: css,
});
