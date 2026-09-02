/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Own <link rel="icon"> on documentElement. Never touch ChatGPT's head
 * icon links. Wait-state removes our link so the host icon shows.
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
        if (isIconLink(node) && node.id !== "bloom-chat-state-favicon") return node;
    }
    return null;
}

function ourLink(id: string): HTMLLinkElement | null {
    const el = document.getElementById(id);
    return el instanceof HTMLLinkElement ? el : null;
}

export function applyFavicon(id: string, href: string) {
    let link = ourLink(id);
    if (!link) {
        link = document.createElement("link");
        link.id = id;
        link.rel = "icon";
        document.documentElement.appendChild(link);
    }
    if (link.getAttribute("href") !== href) link.setAttribute("href", href);
}

export function restoreOfficialFavicon(id: string, _officialHref: string) {
    ourLink(id)?.remove();
}

export function startFaviconGuard(
    _id: string,
    _onCompete: (officialHref?: string) => void,
): MutationObserver | null {
    return null;
}
