/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Adapted from Void++ NoDictation (GPL-3.0-or-later). CSS-only: no
 * MutationObserver, no querySelectorAll("button"), no wrapper :has().
 * Does not hide voice-mode-button (advanced Voice).
 * Styles adopt after HostReady (island gate). Default off.
 */

import { definePluginSettings } from "../../api/Settings";
import { Devs } from "../../utils/constants";
import { registerStyle, removeStyle } from "../../utils/css";
import definePlugin, { OptionType, StartAt } from "../../utils/types";

const STYLE_NAME = "noDictation";

const BUTTON_SELECTORS = [
    'button[data-testid="composer-speech-button"]',
];

const SETTINGS_SELECTORS = [
    '[role="dialog"] [data-testid*="dictation"]',
    '[role="dialog"] [data-testid*="speech-to-text"]',
];

const settings = definePluginSettings({
    hideDictationSettings: {
        type: OptionType.BOOLEAN,
        description: "Hide dictation / speech-to-text rows in chatgpt.com Settings.",
        default: true,
    },
});

function hide(selectors: string[]): string {
    return `${selectors.join(",")}{display:none!important}`;
}

function apply() {
    const rules = [hide(BUTTON_SELECTORS)];
    if (settings.store.hideDictationSettings !== false) rules.push(hide(SETTINGS_SELECTORS));
    registerStyle(STYLE_NAME, rules.join("\n"));
}

export default definePlugin({
    name: "NoDictation",
    description: "Hide the Dictation (speech-to-text) button from the composer. Optional: hide dictation rows in Settings.",
    authors: [Devs.p],
    tags: ["chat", "ui"],
    enabledByDefault: false,
    startAt: StartAt.HostReady,
    settings,
    start: apply,
    onSettingsChange: apply,
    stop() {
        removeStyle(STYLE_NAME);
    },
});
