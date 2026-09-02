/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Locate ChatGPT's "Download the ChatGPT app" control. Bloom's button is
 * position:fixed in our shadow — we never insert into the host header tree.
 */

const HEADER_TRY = [
    "#page-header",
    '[data-testid="page-header"]',
    "header",
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

function looksLikeDownload(el: Element): boolean {
    const href = el.getAttribute("href") || "";
    try {
        if (href) {
            const path = new URL(href, location.origin).pathname;
            if (/\/download\/?$/.test(path)) return true;
        }
    } catch { /* ignore */ }
    const text = `${el.getAttribute("aria-label") || ""} ${el.textContent || ""}`
        .replace(/\s+/g, " ")
        .trim();
    if (/download.{0,24}(chatgpt\s*)?(app|desktop)/i.test(text)) return true;
    if (/下载.{0,16}(chatgpt|应用|app)/i.test(text)) return true;
    if (/get (the )?app/i.test(text)) return true;
    return false;
}

export function findDownloadAppButton(): HTMLElement | null {
    const header = findHeader();
    if (header) {
        for (const el of header.querySelectorAll("a[href], button")) {
            if (visible(el) && looksLikeDownload(el)) return el;
        }
    }
    const direct = document.querySelector<HTMLElement>(
        'a[href="/download"], a[href="/download/"], a[href*="chatgpt.com/download"]',
    );
    return visible(direct) ? direct : null;
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
    const download = findDownloadAppButton();
    const profile = findHeaderProfile();
    let x: number;
    let y: number;
    let side = size;

    if (download) {
        const r = download.getBoundingClientRect();
        side = Math.max(32, Math.min(40, Math.round(r.height)));
        x = r.right + gap;
        y = r.top + (r.height - side) / 2;
        if (profile) {
            const p = profile.getBoundingClientRect();
            if (x + side + gap > p.left) x = p.left - gap - side;
        }
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
