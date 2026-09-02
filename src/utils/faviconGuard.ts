/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Own #bloom-chat-state-favicon as the LAST <link rel=icon> in
 * document.head (Chrome prefers the last icon). Competitors in head
 * are stripped while Bloom owns the tab. Observer is head-only with
 * subtree so href/rel edits on child links are visible.
 * Never observe html or body.
 */

let mute = 0;

function withMute(fn: () => void) {
    mute += 1;
    try {
        fn();
    } finally {
        mute -= 1;
    }
}

export function isIconLink(node: Node): node is HTMLLinkElement {
    if (!(node instanceof HTMLLinkElement)) return false;
    if (node.relList.contains("icon")) return true;
    const rel = node.rel;
    if (!rel) return false;
    // Token match only — do not treat apple-touch-icon as a tab favicon.
    return /(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(rel);
}

export function isUsableOfficialHref(href: string | undefined | null): href is string {
    return !!href && !href.startsWith("data:") && !href.startsWith("blob:") && href !== "undefined";
}

function ourLink(id: string): HTMLLinkElement | null {
    const el = document.getElementById(id);
    return el instanceof HTMLLinkElement ? el : null;
}

export function stripCompetitorIcons(keepId: string) {
    const { head } = document;
    if (!head) return;
    for (const node of Array.from(head.querySelectorAll("link"))) {
        if (node.id !== keepId && isIconLink(node)) node.remove();
    }
}

function mimeFor(href: string): { type: string; sizes: string } {
    if (href.startsWith("data:image/png") || href.endsWith(".png")) {
        return { type: "image/png", sizes: "32x32" };
    }
    if (href.startsWith("data:image/svg") || href.endsWith(".svg")) {
        return { type: "image/svg+xml", sizes: "any" };
    }
    return { type: "", sizes: "any" };
}

export function applyFavicon(id: string, href: string) {
    const { head } = document;
    if (!head || !href) return;
    withMute(() => {
        stripCompetitorIcons(id);
        let link = ourLink(id);
        const { type, sizes } = mimeFor(href);
        if (!link) {
            link = document.createElement("link");
            link.id = id;
            link.rel = "icon";
            head.appendChild(link);
        } else if (head.lastElementChild !== link) {
            head.appendChild(link);
        }
        if (link.rel !== "icon") link.rel = "icon";
        if (link.type !== type) link.type = type;
        if (link.getAttribute("sizes") !== sizes) link.setAttribute("sizes", sizes);
        if (link.getAttribute("href") !== href) link.setAttribute("href", href);
    });
}

export function restoreOfficialFavicon(id: string, officialHref: string) {
    const { head } = document;
    if (!head) return;
    withMute(() => {
        ourLink(id)?.remove();
        const remaining = Array.from(head.querySelectorAll("link")).filter(isIconLink);
        if (remaining.length) {
            if (isUsableOfficialHref(officialHref) && remaining[0].href !== officialHref) {
                remaining[0].href = officialHref;
            }
            return;
        }
        if (!isUsableOfficialHref(officialHref)) return;
        const link = document.createElement("link");
        link.rel = "icon";
        link.href = officialHref;
        head.appendChild(link);
    });
}

export function startFaviconGuard(
    id: string,
    onCompete: (officialHref?: string) => void,
): MutationObserver | null {
    const { head } = document;
    if (!head) return null;
    const obs = new MutationObserver(list => {
        if (mute) return;
        for (const m of list) {
            if (m.type === "attributes" && isIconLink(m.target)) {
                // Re-apply if ChatGPT mutates our href; never treat data: as official.
                onCompete(m.target.id === id ? undefined : m.target.href);
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
        attributeFilter: ["href", "rel", "sizes"],
    });
    return obs;
}
