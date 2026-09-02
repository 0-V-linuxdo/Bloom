/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Adapted from Void++ NoDictation (GPL-3.0-or-later). CSS-only: no
 * MutationObserver, no querySelectorAll("button"), no wrapper :has().
 * Does not hide voice-mode-button (advanced Voice).
 * start() queues CSS at Init; Bloom.flushStyles appends to head at HostReady.
 */

import { definePluginSettings } from "../../api/Settings";
import { Devs } from "../../utils/constants";
import { registerStyle, removeStyle } from "../../utils/css";
import definePlugin, { OptionType, StartAt } from "../../utils/types";

const STYLE_NAME = "noDictation";

const BUTTON_SELECTORS = [
    'button[data-testid="composer-speech-button"]',
    'form[data-type="unified-composer"] button[data-testid="composer-speech-button"]',
    'form[data-type="unified-composer"] button[aria-label="Dictate"]',
    'form[data-type="unified-composer"] button[aria-label="Dictate button"]',
    'form[data-type="unified-composer"] button[aria-label="Start dictation"]',
    'form[data-type="unified-composer"] button[aria-label="Stop dictation"]',
    'form[data-type="unified-composer"] button[aria-label^="Dictate"]',
    'form[data-type="unified-composer"] button[aria-label="听写"]',
    'form[data-type="unified-composer"] button[aria-label="开始听写"]',
    'form[data-type="unified-composer"] button[aria-label="停止听写"]',
    'form[data-type="unified-composer"] button[aria-label="语音输入"]',
    'form[data-type="unified-composer"] button[aria-label^="听写"]',
];

const SETTINGS_SELECTORS = [
    '[role="dialog"] [data-testid*="dictation"]',
    '[role="dialog"] [data-testid*="speech-to-text"]',
    '[role="dialog"] [aria-label="Dictation"]',
    '[role="dialog"] [aria-label*="Dictation"]',
    '[role="dialog"] [aria-label*="speech-to-text"]',
    '[role="dialog"] [aria-label*="听写"]',
    '[role="dialog"] [aria-label*="语音输入"]',
];

const settings = definePluginSettings({
    hideDictationSettings: {
        type: OptionType.BOOLEAN,
        description: "Hide dictation / speech-to-text rows in chatgpt.com Settings.",
        default: true,
    },
});

function hide(selectors: string[]): string {
    return `${selectors.join(",\n")}{display:none!important}`;
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
    startAt: StartAt.Init,
    settings,
    start: apply,
    onSettingsChange: apply,
    stop() {
        removeStyle(STYLE_NAME);
    },
});
