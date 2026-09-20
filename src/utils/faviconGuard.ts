/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Overlay states own #bloom-chat-state-favicon as the LAST <link rel=icon>
 * in document.head. Wait (idle) removes that link and unparks host icons
 * so Chrome uses ChatGPT's official SVG / ICO. Never remove ChatGPT's
 * official icon links — hydrateRoot(document) owns those SSR nodes, and
 * stripping them fights React (page freeze / dead clicks). Official icons
 * stay in the tree but are parked (`media="not all"` + rel bloom-host-icon)
 * while an overlay is showing, so Chrome cannot prefer their SVG over our
 * PNG. Observer is head-only with subtree. Never observe html or body.
 */

const HOST_REL = "bloom-host-icon";
const HOST_REL_ATTR = "data-bloom-host-rel";
const OFF_MEDIA = "not all";

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

/** Disable host icon links without removing them (React owns the nodes). */
function parkOfficialIcons(head: HTMLElement, ourId: string) {
    for (const node of head.querySelectorAll("link")) {
        if (!(node instanceof HTMLLinkElement) || node.id === ourId) continue;
        if (!isIconLink(node)) continue;
        if (!node.getAttribute(HOST_REL_ATTR)) node.setAttribute(HOST_REL_ATTR, node.rel);
        if (node.media !== OFF_MEDIA) node.media = OFF_MEDIA;
        if (node.rel !== HOST_REL) node.rel = HOST_REL;
    }
}

function unparkOfficialIcons(head: HTMLElement) {
    for (const node of head.querySelectorAll(`link[${HOST_REL_ATTR}]`)) {
        if (!(node instanceof HTMLLinkElement)) continue;
        const rel = node.getAttribute(HOST_REL_ATTR);
        if (rel) node.rel = rel;
        node.removeAttribute(HOST_REL_ATTR);
        if (node.media === OFF_MEDIA) node.removeAttribute("media");
    }
}

export function applyFavicon(id: string, href: string) {
    const { head } = document;
    if (!head || !href) return;
    withMute(() => {
        parkOfficialIcons(head, id);
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

/** Idle / plugin-off: drop our overlay and let ChatGPT's own icon links win. */
export function restoreOfficialFavicon(id: string, _officialHref: string) {
    const { head } = document;
    if (!head) return;
    withMute(() => {
        ourLink(id)?.remove();
        unparkOfficialIcons(head);
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
            if (m.type === "attributes" && m.target instanceof HTMLLinkElement) {
                if (m.target.id === id) restore = true;
                else if (isIconLink(m.target)) {
                    restore = true;
                    if (isUsableOfficialHref(m.target.href)) official = m.target.href;
                }
            }
            for (const node of m.removedNodes) {
                if (isIconLink(node) && node.id === id) restore = true;
            }
            for (const node of m.addedNodes) {
                if (isIconLink(node) && node.id !== id) {
                    restore = true;
                    if (isUsableOfficialHref(node.href)) official = node.href;
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
