/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * ChatGPT-side rewrite of Void++ Cleaner (GPL-3.0-or-later). CSS-only:
 * no MutationObserver, no querySelectorAll("button"), no wrapper :has().
 * Hides the Download-apps CTA and the composer "can make mistakes"
 * disclaimer. Does not hide Voice, Share, the avatar, or #bloom-rail-item.
 * Styles adopt after HostReady. Default on.
 */

import { definePluginSettings } from "../../api/Settings";
import { Devs } from "../../utils/constants";
import { registerStyle, removeStyle } from "../../utils/css";
import definePlugin, { OptionType, StartAt } from "../../utils/types";

const STYLE_NAME = "cleaner";

const DOWNLOAD_SELECTORS = [
    'a[href="https://chatgpt.com/download"]',
    'a[href="https://chatgpt.com/download/"]',
    'a[href="/download"]',
    'a[href="/download/"]',
    'a[href^="https://chatgpt.com/download"]',
    'a[href^="https://openai.com/chatgpt/download"]',
    'a[href^="https://openai.com/download"]',
    'a[data-testid="download-app-button"]',
    'a[data-testid="download-chatgpt-app"]',
    'a[data-testid="mobile-app-cta"]',
    'a[data-testid="download-mobile-app"]',
    'button[data-testid="download-app-button"]',
    'button[data-testid="download-chatgpt-app"]',
    'a[aria-label="Download apps"]',
    'a[aria-label="Download the ChatGPT app"]',
    'a[aria-label="Download ChatGPT"]',
    'a[aria-label="Download ChatGPT for desktop"]',
    'button[aria-label="Download apps"]',
    'button[aria-label="Download the ChatGPT app"]',
    'button[aria-label="Download ChatGPT"]',
    'a[aria-label="下载应用"]',
    'a[aria-label="下载 App"]',
    'a[aria-label="下载 ChatGPT 应用"]',
    'button[aria-label="下载应用"]',
    'button[aria-label="下载 App"]',
    'button[aria-label="下载 ChatGPT 应用"]',
];

const DISCLAIMER_SELECTORS = [
    '[data-testid="disclaimer"]',
    '[data-testid="composer-disclaimer"]',
    '[data-testid="model-disclaimer"]',
    '[data-testid="frustration-free-disclaimer"]',
    'form[data-type="unified-composer"] + .text-token-text-secondary',
    'form[data-type="unified-composer"] + div.text-xs',
    '.text-token-text-secondary.min-h-8.text-center.text-xs',
    '.min-h-8.w-full.items-center.justify-center.text-center.text-xs',
];

const settings = definePluginSettings({
    hideDownloadApps: {
        type: OptionType.BOOLEAN,
        description: "Hide the Download apps button.",
        default: true,
    },
    hideDisclaimer: {
        type: OptionType.BOOLEAN,
        description: "Hide the composer “can make mistakes” notice.",
        default: true,
    },
});

function hide(selectors: string[]): string {
    return `${selectors.join(",")}{display:none!important}`;
}

function apply() {
    const rules: string[] = [];
    if (settings.store.hideDownloadApps !== false) rules.push(hide(DOWNLOAD_SELECTORS));
    if (settings.store.hideDisclaimer !== false) rules.push(hide(DISCLAIMER_SELECTORS));
    if (!rules.length) {
        removeStyle(STYLE_NAME);
        return;
    }
    registerStyle(STYLE_NAME, rules.join("\n"));
}

export default definePlugin({
    name: "Cleaner",
    description: "Hide Download apps and the composer mistake notice.",
    authors: [Devs.p],
    tags: ["ui"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>`,
    enabledByDefault: true,
    startAt: StartAt.HostReady,
    settings,
    start: apply,
    onSettingsChange: apply,
    stop() {
        removeStyle(STYLE_NAME);
    },
});
