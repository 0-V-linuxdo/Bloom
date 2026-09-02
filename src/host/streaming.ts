/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Extra streaming detectors from Chat-State-Favicons ChatGPT adapter (MIT).
 * Visible Send is not proof the turn ended: ChatGPT reuses the trailing
 * control and may keep data-testid="send-button" while the label is Stop.
 */

import { getStopButton, getSubmitButton, isStopControl, isVisible } from "./composer";

export function getProStopButton(): HTMLElement | null {
    const trailing = document.querySelector('div[slot="trailing"]');
    if (!trailing) return null;
    for (const btn of trailing.querySelectorAll("button")) {
        if (!(btn instanceof HTMLElement) || !isVisible(btn)) continue;
        if (isStopControl(btn)) return btn;
        if (/\bStop\b|停止/.test(btn.textContent || "")) return btn;
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

export function hasStreamingTurn(): boolean {
    try {
        return !!document.querySelector(
            '[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]',
        );
    } catch {
        return false;
    }
}

export function hasErrorToast(): boolean {
    return !!document.querySelector('[data-testid="toast-error"]')
        || !!document.querySelector('button[data-testid="regenerate-thread-error-button"]');
}

/**
 * ChatGPT streaming: Stop in composer, Pro trailing Stop, reused Send
 * that is currently a Stop, or (no visible Send AND deep-research /
 * image spinner / busy assistant turn).
 */
export function isStreaming(): boolean {
    if (getStopButton()) return true;
    if (getProStopButton()) return true;
    const send = getSubmitButton();
    if (send && isVisible(send) && !isStopControl(send)) return false;
    if (hasDeepResearchProgress()) return true;
    if (hasImageGenerationSpinner()) return true;
    if (hasStreamingTurn()) return true;
    return false;
}
