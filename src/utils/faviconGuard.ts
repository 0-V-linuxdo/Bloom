/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Own #bloom-chat-state-favicon as the LAST <link rel=icon> in
 * document.head (Chrome prefers the last icon). Never remove ChatGPT's
 * official icon links — hydrateRoot(document) owns those SSR nodes, and
 * stripping them fights React (page freeze / dead clicks). Observer is
 * head-only with subtree so href/rel edits on our link are visible.
 * Never observe html or body.
 */

let mute = 0;
let lastMoveAt = 0;
const MOVE_COOLDOWN_MS = 400;

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

function mimeFor(href: string): { type: string; sizes: string } {
    if (href.startsWith("data:image/png") || href.endsWith(".png")) {
        return { type: "image/png", sizes: "32x32" };
    }
    if (href.startsWith("data:image/svg") || href.endsWith(".svg")) {
        return { type: "image/svg+xml", sizes: "any" };
    }
    return { type: "", sizes: "any" };
}

function placeLast(head: HTMLElement, link: HTMLLinkElement) {
    if (head.lastElementChild === link) return;
    const now = Date.now();
    if (now - lastMoveAt < MOVE_COOLDOWN_MS) return;
    lastMoveAt = now;
    head.appendChild(link);
}

export function applyFavicon(id: string, href: string) {
    const { head } = document;
    if (!head || !href) return;
    withMute(() => {
        let link = ourLink(id);
        const { type, sizes } = mimeFor(href);
        if (!link) {
            link = document.createElement("link");
            link.id = id;
            link.rel = "icon";
            head.appendChild(link);
        } else {
            placeLast(head, link);
        }
        if (link.rel !== "icon") link.rel = "icon";
        if (link.type !== type) link.type = type;
        if (link.getAttribute("sizes") !== sizes) link.setAttribute("sizes", sizes);
        if (link.getAttribute("href") !== href) link.setAttribute("href", href);
    });
}

export function restoreOfficialFavicon(id: string, _officialHref: string) {
    const { head } = document;
    if (!head) return;
    withMute(() => {
        ourLink(id)?.remove();
    });
}

export function startFaviconGuard(
    id: string,
    onCompete: (officialHref?: string) => void,
): MutationObserver | null {
    const { head } = document;
    if (!head) return null;
    let raf = 0;
    const obs = new MutationObserver(list => {
        if (mute) return;
        let restore = false;
        let official: string | undefined;
        for (const m of list) {
            if (m.type === "attributes" && isIconLink(m.target)) {
                if (m.target.id === id) restore = true;
                else if (isUsableOfficialHref(m.target.href)) official = m.target.href;
            }
            for (const node of m.removedNodes) {
                if (isIconLink(node) && node.id === id) restore = true;
            }
            for (const node of m.addedNodes) {
                if (isIconLink(node) && node.id !== id && isUsableOfficialHref(node.href)) {
                    official = node.href;
                }
            }
        }
        if (!restore) return;
        if (raf) return;
        raf = requestAnimationFrame(() => {
            raf = 0;
            onCompete(official);
        });
    });
    obs.observe(head, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["href", "rel", "sizes"],
    });
    return obs;
}
