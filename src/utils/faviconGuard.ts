/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Favicon competitor stripping (same idea as Chat-State-Favicons FaviconGuard).
 */

export function isIconLink(node: Node): node is HTMLLinkElement {
    return node instanceof HTMLLinkElement && (node.relList.contains("icon") || /\bicon\b/i.test(node.rel));
}

export function stripCompetitorIcons(keepId: string) {
    const { head } = document;
    if (!head) return;
    for (const node of head.querySelectorAll("link")) {
        if (node.id !== keepId && isIconLink(node)) node.remove();
    }
}

export function applyFavicon(id: string, href: string, type = "image/svg+xml") {
    const { head } = document;
    if (!head) return;
    stripCompetitorIcons(id);
    let link = document.getElementById(id) as HTMLLinkElement | null;
    if (!link) {
        link = document.createElement("link");
        link.id = id;
        link.rel = "icon shortcut icon";
        link.type = type;
        link.setAttribute("sizes", "any");
        head.prepend(link);
    } else if (head.firstChild !== link) {
        head.prepend(link);
    }
    if (link.getAttribute("href") !== href) link.setAttribute("href", href);
}

export function startFaviconGuard(id: string, onCompete: () => void): MutationObserver | null {
    const { head } = document;
    if (!head) return null;
    const obs = new MutationObserver(list => {
        for (const m of list) {
            if (m.type === "attributes" && isIconLink(m.target) && m.target.id !== id) {
                onCompete();
                return;
            }
            for (const node of m.addedNodes) {
                if (isIconLink(node) && node.id !== id) {
                    onCompete();
                    return;
                }
            }
        }
    });
    obs.observe(head, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["href", "rel"],
    });
    return obs;
}
