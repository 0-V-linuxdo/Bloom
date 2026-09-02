/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Locate ChatGPT's "Download the ChatGPT app" control, then the sidebar
 * store/bag next to the profile. Bloom's button is position:fixed in our
 * shadow — we never insert into the host tree.
 */

const HEADER_TRY = [
    "#page-header",
    '[data-testid="page-header"]',
    "header",
];

const SIDEBAR_TRY = [
    "aside",
    '[data-testid="left-sidebar"]',
    '[data-testid="sidebar"]',
];

function visible(el: Element | null): el is HTMLElement {
    if (!(el instanceof HTMLElement) || !el.isConnected) return false;
    if (el.closest("#bloom-root")) return false;
    return el.getClientRects().length > 0;
}

export function findHeader(): HTMLElement | null {
    for (const sel of HEADER_TRY) {
        const el = document.querySelector(sel);
        if (visible(el)) return el;
    }
    for (const el of document.querySelectorAll("nav")) {
        if (!visible(el)) continue;
        if (el.closest("aside, [data-testid='sidebar']")) continue;
        return el;
    }
    return null;
}

function findSidebar(): HTMLElement | null {
    for (const sel of SIDEBAR_TRY) {
        const el = document.querySelector(sel);
        if (!visible(el)) continue;
        if (el.getBoundingClientRect().left < window.innerWidth / 2) return el;
    }
    return null;
}

function labelOf(el: Element): string {
    return `${el.getAttribute("aria-label") || ""} ${el.textContent || ""}`
        .replace(/\s+/g, " ")
        .trim();
}

function looksLikeDownload(el: Element): boolean {
    const href = el.getAttribute("href") || "";
    try {
        if (href) {
            const path = new URL(href, location.origin).pathname;
            if (/\/download\/?$/.test(path)) return true;
        }
    } catch { /* ignore */ }
    const text = labelOf(el);
    if (/download.{0,24}(chatgpt\s*)?(app|desktop)/i.test(text)) return true;
    if (/下载.{0,16}(chatgpt|应用|app)/i.test(text)) return true;
    if (/get (the )?app/i.test(text)) return true;
    return false;
}

function looksLikeStore(el: Element): boolean {
    if (looksLikeDownload(el)) return true;
    const href = el.getAttribute("href") || "";
    try {
        if (href) {
            const path = new URL(href, location.origin).pathname;
            if (/^\/(gpts|store|apps)(\/|$)/i.test(path)) return true;
        }
    } catch { /* ignore */ }
    const text = labelOf(el);
    if (/gpt.?store|explore gpts|\bstore\b|\bshop\b/i.test(text)) return true;
    if (/应用商店|插件商店|探索 GPTs/i.test(text)) return true;
    return false;
}

function scan(root: ParentNode, test: (el: Element) => boolean): HTMLElement | null {
    for (const el of root.querySelectorAll("a[href], button")) {
        if (visible(el) && test(el)) return el;
    }
    return null;
}

export function findDownloadAppButton(): HTMLElement | null {
    const header = findHeader();
    if (header) {
        const hit = scan(header, looksLikeDownload);
        if (hit) return hit;
    }
    const direct = document.querySelector<HTMLElement>(
        'a[href="/download"], a[href="/download/"], a[href*="chatgpt.com/download"]',
    );
    return visible(direct) ? direct : null;
}

function findSidebarAnchor(): HTMLElement | null {
    const side = findSidebar();
    if (!side) return null;
    const download = scan(side, looksLikeDownload);
    if (download) return download;
    const store = scan(side, looksLikeStore);
    if (store) return store;
    const profile = side.querySelector(
        '[data-testid="accounts-profile-button"], [data-testid="profile-button"]',
    );
    if (!(profile instanceof HTMLElement) || !visible(profile)) return null;
    const row = profile.parentElement;
    if (!row) return null;
    for (const el of row.querySelectorAll("a, button")) {
        if (visible(el) && el !== profile) return el;
    }
    return null;
}

export function findHeaderProfile(): HTMLElement | null {
    const header = findHeader();
    if (!header) return null;
    const el = header.querySelector(
        '[data-testid="profile-button"], [data-testid="accounts-profile-button"]',
    );
    return visible(el) ? el : null;
}

export function fabPlacement(size: number): { x: number; y: number; size: number } {
    const gap = 8;
    const target = findDownloadAppButton() ?? findSidebarAnchor();
    const profile = findHeaderProfile();
    let side = size;
    let x: number;
    let y: number;

    if (target) {
        const r = target.getBoundingClientRect();
        side = Math.max(32, Math.min(36, Math.round(r.height) || size));
        x = r.right + gap;
        y = r.top + (r.height - side) / 2;
    } else if (profile) {
        const p = profile.getBoundingClientRect();
        x = p.left - gap - side;
        y = p.top + (p.height - side) / 2;
    } else {
        x = window.innerWidth - side - 16;
        y = 12;
    }

    x = Math.max(8, Math.min(window.innerWidth - side - 8, x));
    y = Math.max(8, Math.min(window.innerHeight - side - 8, y));
    return { x, y, size: side };
}
