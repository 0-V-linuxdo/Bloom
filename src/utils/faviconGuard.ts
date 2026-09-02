/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Favicon competitor stripping (same idea as Chat-State-Favicons FaviconGuard).
 * When the host re-inserts its themed icon, the href is reported so we can recapture it.
 */

export function isIconLink(node: Node): node is HTMLLinkElement {
    return node instanceof HTMLLinkElement && (node.relList.contains("icon") || /\bicon\b/i.test(node.rel));
}

export function isUsableOfficialHref(href: string | undefined | null): href is string {
    return !!href && !href.startsWith("data:") && href !== "undefined";
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
        link.type = href.startsWith("data:image/svg") || href.endsWith(".svg") ? type : "";
        link.setAttribute("sizes", "any");
        head.prepend(link);
    } else if (head.firstChild !== link) {
        head.prepend(link);
    }
    if (link.getAttribute("href") !== href) link.setAttribute("href", href);
}

export function restoreOfficialFavicon(id: string, officialHref: string) {
    const { head } = document;
    if (!head) return;
    document.getElementById(id)?.remove();
    const remaining = Array.from(head.querySelectorAll("link")).filter(isIconLink);
    if (remaining.length) {
        if (isUsableOfficialHref(officialHref)) {
            remaining[0].href = officialHref;
        }
        return;
    }
    if (!isUsableOfficialHref(officialHref)) return;
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = officialHref;
    head.prepend(link);
}

export function startFaviconGuard(
    id: string,
    onCompete: (officialHref?: string) => void,
): MutationObserver | null {
    const { head } = document;
    if (!head) return null;
    const obs = new MutationObserver(list => {
        for (const m of list) {
            if (m.type === "attributes" && isIconLink(m.target) && m.target.id !== id) {
                onCompete(m.target.href);
                return;
            }
            for (const node of m.addedNodes) {
                if (isIconLink(node) && node.id !== id) {
                    onCompete(node.href);
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
