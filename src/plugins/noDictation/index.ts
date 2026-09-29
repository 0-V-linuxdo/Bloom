/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { hideRule } from "@utils/css";
import definePlugin, { OptionType, StartAt } from "@utils/types";

const BUTTONS = [
    'form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="听写"], [aria-label*="听写"], [aria-label="语音输入"])',
    'button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])',
];

const SETTINGS_ROWS = [
    '[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="听写"]))',
    '[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="听写"])',
];

const settings = definePluginSettings({
    hideDictationSettings: { type: OptionType.BOOLEAN, description: "Also hide dictation rows in ChatGPT settings.", default: true },
});

export default definePlugin({
    name: "NoDictation",
    description: "Hide the composer Dictation button. Voice mode stays.",
    authors: ["Bloom contributors"],
    tags: ["chat", "ui"],
    icon: "mic",
    startAt: StartAt.Init,
    settings,
    styles: () => hideRule([...BUTTONS, ...settings.store.hideDictationSettings ? SETTINGS_ROWS : []]),
});
