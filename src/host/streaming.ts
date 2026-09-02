/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Extra streaming detectors from Chat-State-Favicons ChatGPT adapter (MIT).
 */

import { getStopButton, getSubmitButton, isVisible } from "./composer";

export function getProStopButton(): HTMLElement | null {
    const trailing = document.querySelector('div[slot="trailing"]');
    if (!trailing) return null;
    for (const btn of trailing.querySelectorAll("button")) {
        if (!isVisible(btn)) continue;
        if (/\bStop\b/i.test(btn.textContent || "")) return btn;
    }
    return null;
}

export function hasDeepResearchProgress(): boolean {
    const el = document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");
    return !!(el && isVisible(el));
}

export function hasImageGenerationSpinner(): boolean {
    const el = document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');
    return !!(el && isVisible(el));
}

export function hasErrorToast(): boolean {
    return !!document.querySelector('[data-testid="toast-error"]')
        || !!document.querySelector('button[data-testid="regenerate-thread-error-button"]');
}

/**
 * ChatGPT streaming: Stop in composer, Pro trailing Stop, or
 * (no visible Send AND deep-research / image spinner).
 * Visible Send means the turn ended.
 */
export function isStreaming(): boolean {
    if (getStopButton()) return true;
    if (getProStopButton()) return true;
    if (getSubmitButton() && isVisible(getSubmitButton())) return false;
    if (hasDeepResearchProgress()) return true;
    if (hasImageGenerationSpinner()) return true;
    return false;
}
