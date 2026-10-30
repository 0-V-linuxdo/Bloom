/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function promoteOverlay(el: HTMLElement) {
    if (typeof el.showPopover !== "function") return;
    el.setAttribute("popover", "manual");
    try {
        el.showPopover();
    } catch {
        if (!el.matches(":popover-open")) el.removeAttribute("popover");
    }
}

export function mountOverlay(el: HTMLElement, host: ParentNode = document.body) {
    host.append(el);
    promoteOverlay(el);
}
