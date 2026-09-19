/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * ChatGPT-side rewrite of Void++ Cleaner (GPL-3.0-or-later). CSS-only:
 * no MutationObserver, no querySelectorAll("button"), no wrapper :has().
 * Hides Download-apps, the composer "can make mistakes" disclaimer,
 * upgrade CTAs, locked models, home GPT promo, and Free ads.
 * Does not hide Voice, Share, the avatar, `#bloom-rail-item`, or the
 * whole `#thread-bottom-container`. Styles adopt after HostReady.
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
    '[data-testid="thread-disclaimer"]',
    '[data-testid*="disclaimer"]',
    '[class*="--vt-disclaimer"]',
    '[class*="[view-transition-name:var(--vt-disclaimer)]"]',
    '#thread-bottom-container [class*="vt-disclaimer"]',
    '#thread-bottom-container .text-token-text-secondary.text-center.text-xs',
    '#thread-bottom-container .text-token-text-tertiary.text-center.text-xs',
];

const UPGRADE_SELECTORS = [
    '[data-testid="upgrade-button"]',
    '[data-testid="upgrade-plan-button"]',
    '[data-testid="upgrade-chat-button"]',
    '[data-testid="accounts-upgrade-button"]',
    '[data-testid="sidebar-upgrade-button"]',
    '[data-testid="get-plus-button"]',
    '[data-testid="get-pro-button"]',
    '[data-testid="plus-upsell"]',
    '[data-testid="pro-upsell"]',
    '[data-testid="upsell-button"]',
    '[data-testid="upsell-card"]',
    '[data-testid="upgrade-cta"]',
    '[data-testid="upgrade-banner"]',
    'a[href*="/upgrade"]',
    'a[href*="/checkout"]',
    'a[href*="pay.openai.com"]',
    'a[href*="/payments/"]',
    'a[aria-label="Upgrade"]',
    'a[aria-label="Upgrade plan"]',
    'a[aria-label="Upgrade to Plus"]',
    'a[aria-label="Get Plus"]',
    'a[aria-label="Get Pro"]',
    'a[aria-label="升级"]',
    'a[aria-label="升级套餐"]',
    'a[aria-label="升级到 Plus"]',
    'button[aria-label="Upgrade"]',
    'button[aria-label="Upgrade plan"]',
    'button[aria-label="Upgrade to Plus"]',
    'button[aria-label="Get Plus"]',
    'button[aria-label="Get Pro"]',
    'button[aria-label="升级"]',
    'button[aria-label="升级套餐"]',
    'button[aria-label="升级到 Plus"]',
];

const LOCKED_MODEL_SELECTORS = [
    '[data-testid="model-lock-icon"]',
    '[data-testid="locked-model"]',
    '[data-testid="model-unavailable"]',
    '[data-testid="upsell-model"]',
    '[data-testid="model-switcher-item"][data-disabled="true"]',
    '[data-testid="model-switcher-option"][aria-disabled="true"]',
    '[data-testid="model-picker-item"][aria-disabled="true"]',
    '[data-testid="model-item"][aria-disabled="true"]',
    '[data-testid*="model-"][data-state="locked"]',
    '[data-testid="model-switcher-dropdown"] [aria-disabled="true"]',
];

const HOME_PROMO_SELECTORS = [
    '[data-testid="home-promo"]',
    '[data-testid="homepage-promo"]',
    '[data-testid="promo-banner"]',
    '[data-testid="marketing-banner"]',
    '[data-testid="gpt-promo"]',
    '[data-testid="gpts-upsell"]',
    '[data-testid="explore-gpts-promo"]',
    '[data-testid="welcome-banner"]',
    '[data-testid="app-download-banner"]',
    '[data-testid="mobile-app-banner"]',
    '[data-testid="home-gpts-promo"]',
];

const AD_SELECTORS = [
    '[data-testid="ad"]',
    '[data-testid="ad-unit"]',
    '[data-testid="ad-slot"]',
    '[data-testid="ad-banner"]',
    '[data-testid="sponsored"]',
    '[data-testid="sponsored-message"]',
    '[data-testid="sponsored-card"]',
    '[data-testid*="ad-slot"]',
    '[data-testid*="sponsored"]',
    '[aria-label="Sponsored"]',
    '[aria-label="Advertisement"]',
    '[aria-label="赞助"]',
    '[aria-label="广告"]',
    "iframe[src*='doubleclick']",
    "iframe[src*='/ads/']",
    "[data-ad-slot]",
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
    hideUpgrade: {
        type: OptionType.BOOLEAN,
        description: "Hide Upgrade / Get Plus / Get Pro CTAs.",
        default: true,
    },
    hideLockedModels: {
        type: OptionType.BOOLEAN,
        description: "Hide locked or inaccessible models in the picker.",
        default: true,
    },
    hideHomePromo: {
        type: OptionType.BOOLEAN,
        description: "Hide home GPT / marketing promo banners.",
        default: true,
    },
    hideAds: {
        type: OptionType.BOOLEAN,
        description: "Hide Free-plan ads and sponsored slots.",
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
    if (settings.store.hideUpgrade !== false) rules.push(hide(UPGRADE_SELECTORS));
    if (settings.store.hideLockedModels !== false) rules.push(hide(LOCKED_MODEL_SELECTORS));
    if (settings.store.hideHomePromo !== false) rules.push(hide(HOME_PROMO_SELECTORS));
    if (settings.store.hideAds !== false) rules.push(hide(AD_SELECTORS));
    if (!rules.length) {
        removeStyle(STYLE_NAME);
        return;
    }
    registerStyle(STYLE_NAME, rules.join("\n"));
}

export default definePlugin({
    name: "Cleaner",
    description: "Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",
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
