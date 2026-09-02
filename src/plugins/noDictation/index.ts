/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Adapted from Void++ NoDictation (GPL-3.0-or-later). CSS-only: no
 * MutationObserver, no querySelectorAll("button"), no wrapper :has().
 * Hides composer Dictation (speech-to-text). Does not hide Voice
 * (data-testid="composer-speech-button" / voice-mode-button).
 * Styles adopt after HostReady (island gate). Default off.
 */

import { definePluginSettings } from "../../api/Settings";
import { Devs } from "../../utils/constants";
import { registerStyle, removeStyle } from "../../utils/css";
import definePlugin, { OptionType, StartAt } from "../../utils/types";

const STYLE_NAME = "noDictation";

const BUTTON_SELECTORS = [
    'form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]',
    'form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]',
    'form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]',
    'form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]',
    'form[data-type="unified-composer"] button[aria-label="Dictate button"]',
    'form[data-type="unified-composer"] button[aria-label="Dictate"]',
    'form[data-type="unified-composer"] button[aria-label="Start dictation"]',
    'form[data-type="unified-composer"] button[aria-label="Stop dictation"]',
    'form[data-type="unified-composer"] button[aria-label="Submit dictation"]',
    'form[data-type="unified-composer"] button[aria-label^="Dictate" i]',
    'form[data-type="unified-composer"] button[aria-label="听写"]',
    'form[data-type="unified-composer"] button[aria-label="开始听写"]',
    'form[data-type="unified-composer"] button[aria-label="停止听写"]',
    'form[data-type="unified-composer"] button[aria-label="语音输入"]',
    'form[data-type="unified-composer"] button[aria-label^="听写"]',
    'form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]',
    'button[data-testid="composer-dictate-button"]',
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
        description: "Hide dictation rows in Settings",
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
    description: "Hide the composer Dictation button. Optional: hide Settings rows.",
    authors: [Devs.p],
    tags: ["chat", "ui"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>`,
    enabledByDefault: false,
    startAt: StartAt.HostReady,
    settings,
    start: apply,
    onSettingsChange: apply,
    stop() {
        removeStyle(STYLE_NAME);
    },
});
