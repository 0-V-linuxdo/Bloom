/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Find ChatGPT's account menu portal. Observe nothing on <html>.
 * No FAB, no overlay — we only inject into an already-open menu.
 */

const PROFILE_SEL = [
    '[data-testid="accounts-profile-button"]',
    '[data-testid="profile-button"]',
    '[data-testid="user-menu-button"]',
    '[data-testid="account-menu-button"]',
    'button[aria-label*="profile" i][aria-haspopup]',
    'button[aria-label*="account" i][aria-haspopup]',
].join(",");

const MENU_SEL = [
    '[role="menu"]',
    "[data-radix-menu-content]",
    "[data-radix-dropdown-menu-content]",
    '[id^="headlessui-menu-items"]',
].join(",");

const PORTAL_SEL = [
    "[data-radix-popper-content-wrapper]",
    "[data-radix-menu-content]",
    "[data-floating-ui-portal] > div",
].join(",");

function visible(el: Element | null): el is HTMLElement {
    if (!(el instanceof HTMLElement) || !el.isConnected) return false;
    if (el.id === "bloom-root" || el.closest("#bloom-root, #bloom-sidebar-panel")) return false;
    if (el.closest('[role="dialog"], [aria-modal="true"]')) return false;
    return el.getClientRects().length > 0;
}

function isAccountMenuText(el: Element): boolean {
    const text = el.textContent || "";
    return /settings|设置|log\s?out|sign out|退出/.test(text);
}

export function findProfileButton(): HTMLElement | null {
    const hit = document.querySelector(PROFILE_SEL);
    if (visible(hit)) return hit;
    const nav = document.querySelector("nav");
    if (!nav) return null;
    const sticky = nav.querySelector(".sticky.bottom-0");
    const root = sticky ?? nav;
    const labeled = root.querySelector<HTMLElement>("button[aria-haspopup='menu']");
    if (visible(labeled)) return labeled;
    const last = [...root.querySelectorAll("button")].at(-1) ?? null;
    return visible(last) ? last : null;
}

export function findAccountMenu(): HTMLElement | null {
    const menus = document.querySelectorAll(MENU_SEL);
    for (const menu of menus) {
        if (!visible(menu)) continue;
        if (isAccountMenuText(menu)) return menu;
    }
    const portals = document.querySelectorAll(PORTAL_SEL);
    for (const el of portals) {
        if (!visible(el) || !isAccountMenuText(el)) continue;
        const inner = el.querySelector(MENU_SEL);
        if (visible(inner)) return inner;
        return el;
    }
    return null;
}

export function findSidebarAnchor(): HTMLElement | null {
    const nav = document.querySelector("nav");
    if (!visible(nav)) return null;
    const sticky = nav.querySelector<HTMLElement>(":scope .sticky.bottom-0");
    if (visible(sticky)) return sticky;
    return nav;
}

export function pathHitsProfile(e: Event): boolean {
    const profile = findProfileButton();
    if (!profile) return false;
    return e.composedPath().includes(profile);
}
