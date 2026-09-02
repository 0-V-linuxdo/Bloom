/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Reuse the host's existing icon <link>. Never remove, never prepend,
 * never observe head childList. Wait-state leaves the official href.
 */

export function isIconLink(node: Node): node is HTMLLinkElement {
    return node instanceof HTMLLinkElement && (node.relList.contains("icon") || /\bicon\b/i.test(node.rel));
}

export function isUsableOfficialHref(href: string | undefined | null): href is string {
    return !!href && !href.startsWith("data:") && href !== "undefined";
}

export function existingIconLink(): HTMLLinkElement | null {
    const { head } = document;
    if (!head) return null;
    for (const node of head.querySelectorAll("link")) {
        if (isIconLink(node)) return node;
    }
    return null;
}

export function applyFavicon(_id: string, href: string) {
    const link = existingIconLink();
    if (!link) return;
    if (link.getAttribute("href") !== href) link.setAttribute("href", href);
}

export function restoreOfficialFavicon(_id: string, officialHref: string) {
    if (!isUsableOfficialHref(officialHref)) return;
    const link = existingIconLink();
    if (!link) return;
    if (link.href !== officialHref) link.href = officialHref;
}

export function startFaviconGuard(
    _id: string,
    _onCompete: (officialHref?: string) => void,
): MutationObserver | null {
    return null;
}
