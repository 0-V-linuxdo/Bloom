/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { hideRule } from "@utils/css";
import definePlugin, { OptionType, StartAt } from "@utils/types";

const GROUPS = {
    hideDownloadApps: [
        'a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',
        ':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',
        ':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="下载"])',
    ],
    hideDisclaimer: [
        '[data-testid*="disclaimer" i]',
        '[class*="vt-disclaimer"]',
    ],
    hideUpgrade: [
        '[data-testid*="upgrade" i]:not([data-testid*="model" i])',
        ':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])',
        'a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',
        ':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="升级"])',
    ],
    hideLockedModels: [
        '[data-testid="model-lock-icon"]',
        ':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])',
        '[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])',
        '[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])',
    ],
    hideHomePromo: [
        ':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])',
    ],
    hideNotices: [
        'div:has(> div > aside button[aria-label="Dismiss migration notice"])',
        'aside:has(button[aria-label="Dismiss migration notice"])',
    ],
    hideAds: [
        ':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',
        ':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="赞助"], [aria-label="广告"])',
        'iframe:is([src*="doubleclick"], [src*="/ads/"])',
    ],
} as const;

const settings = definePluginSettings({
    hideDownloadApps: { type: OptionType.BOOLEAN, description: "Hide Download apps and Get the app.", default: true },
    hideDisclaimer: { type: OptionType.BOOLEAN, description: "Hide the “ChatGPT can make mistakes” notice.", default: true },
    hideUpgrade: { type: OptionType.BOOLEAN, description: "Hide Upgrade, Get Plus, Get Pro and Try Go prompts.", default: true },
    hideLockedModels: { type: OptionType.BOOLEAN, description: "Hide locked models in the model picker.", default: true },
    hideHomePromo: { type: OptionType.BOOLEAN, description: "Hide promo banners on the home page.", default: true },
    hideAds: { type: OptionType.BOOLEAN, description: "Hide ads and sponsored slots.", default: true },
    hideNotices: { type: OptionType.BOOLEAN, description: "Hide the “Migrate your GPTs to plugins” notice above the composer.", default: true },
});

export default definePlugin({
    name: "Cleaner",
    description: "Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads and notices.",
    authors: ["Bloom contributors"],
    tags: ["ui"],
    icon: "broom",
    enabledByDefault: true,
    startAt: StartAt.Init,
    settings,
    styles: () => hideRule(Object.entries(GROUPS).flatMap(([key, selectors]) => settings.store[key as keyof typeof GROUPS] ? selectors : [])),
});
