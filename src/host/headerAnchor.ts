/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Locate ChatGPT's Download / store control. Bloom's button is
 * position:fixed in our shadow — we never insert into the host tree.
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

const PROFILE_TRY = [
    '[data-testid="accounts-profile-button"]',
    '[data-testid="profile-button"]',
    '[data-testid="user-menu-button"]',
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
    for (const el of root.querySelectorAll("a[href], button, [role='button']")) {
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

function leftBottom(el: HTMLElement): boolean {
    const r = el.getBoundingClientRect();
    return r.left < window.innerWidth / 2 && r.bottom > window.innerHeight - 180;
}

function findLeftRailProfile(): HTMLElement | null {
    for (const sel of PROFILE_TRY) {
        for (const el of document.querySelectorAll(sel)) {
            if (visible(el) && leftBottom(el)) return el;
        }
    }
    const side = findSidebar();
    if (!side) return null;
    for (const sel of PROFILE_TRY) {
        const el = side.querySelector(sel);
        if (visible(el) && leftBottom(el)) return el;
    }
    return null;
}

function climbFooterRow(profile: HTMLElement): HTMLElement {
    let node: HTMLElement | null = profile;
    let best = profile;
    for (let i = 0; i < 8 && node; i++) {
        const r = node.getBoundingClientRect();
        if (r.width >= 160 && r.left < 96 && r.bottom > window.innerHeight - 180) {
            best = node;
        }
        node = node.parentElement;
    }
    return best;
}

function findBagInRow(row: HTMLElement, profile: HTMLElement): HTMLElement | null {
    const pr = profile.getBoundingClientRect();
    let best: HTMLElement | null = null;
    let bestRight = -1;
    for (const el of row.querySelectorAll("a, button, [role='button']")) {
        if (!visible(el) || el === profile || profile.contains(el)) continue;
        const r = el.getBoundingClientRect();
        if (r.left < pr.right - 8) continue;
        if (r.width > 64 || r.height > 64) continue;
        if (r.right > bestRight) {
            best = el;
            bestRight = r.right;
        }
    }
    return best;
}

function probeSeamBag(): HTMLElement | null {
    const y = window.innerHeight - 28;
    const xs = [200, 240, 268, 292];
    for (const x of xs) {
        if (x >= window.innerWidth / 2) continue;
        const stack = document.elementsFromPoint(x, y);
        for (const el of stack) {
            if (!(el instanceof Element) || el.closest("#bloom-root")) continue;
            const btn = el.closest("a, button, [role='button']");
            if (!visible(btn)) continue;
            const r = btn.getBoundingClientRect();
            if (r.width <= 56 && r.height <= 56 && r.left < window.innerWidth / 2 && leftBottom(btn)) {
                return btn;
            }
        }
    }
    return null;
}

function findFooterAnchor(): HTMLElement | null {
    const profile = findLeftRailProfile();
    if (profile) {
        const row = climbFooterRow(profile);
        const labeled = scan(row, looksLikeStore) ?? scan(row, looksLikeDownload);
        if (labeled) return labeled;
        const bag = findBagInRow(row, profile);
        if (bag) return bag;
        return profile;
    }
    const side = findSidebar();
    if (side) {
        const download = scan(side, looksLikeDownload);
        if (download && leftBottom(download)) return download;
        const store = scan(side, looksLikeStore);
        if (store && leftBottom(store)) return store;
    }
    return probeSeamBag();
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
    const headerDl = findDownloadAppButton();
    const foot = findFooterAnchor();
    const target = headerDl ?? foot;
    let side = size;
    let x: number;
    let y: number;

    if (target) {
        const r = target.getBoundingClientRect();
        side = Math.max(32, Math.min(36, Math.round(r.height) || size));
        x = r.right + gap;
        y = r.top + (r.height - side) / 2;
    } else {
        x = window.innerWidth - side - 16;
        y = 12;
    }

    x = Math.max(8, Math.min(window.innerWidth - side - 8, x));
    y = Math.max(8, Math.min(window.innerHeight - side - 8, y));
    return { x, y, size: side };
}
