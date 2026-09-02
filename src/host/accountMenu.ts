/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Locate ChatGPT's left-rail profile and optional account portal.
 * Observe nothing on <html> or document.body[subtree].
 * The persistent entry is the previous sibling of the whole account
 * footer (never a child of .sticky.bottom-0 — that box clips).
 */

const PROFILE_SEL = [
    '[data-testid="accounts-profile-button"]',
    '[data-testid="profile-button"]',
    '[data-testid="user-menu-button"]',
    '[data-testid="account-menu-button"]',
    'button[aria-label*="profile" i][aria-haspopup]',
    'button[aria-label*="account" i][aria-haspopup]',
    '[aria-haspopup="menu"][data-testid*="profile" i]',
].join(",");

const MENU_SEL = [
    '[role="menu"]',
    '[role="dialog"]',
    "[data-radix-menu-content]",
    "[data-radix-dropdown-menu-content]",
    '[id^="headlessui-menu-items"]',
].join(",");

const PORTAL_SEL = [
    "[data-radix-popper-content-wrapper]",
    "[data-radix-menu-content]",
    "[data-floating-ui-portal] > div",
].join(",");

const BLOOM_CHROME = "#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";

function isBloomChrome(el: Element): boolean {
    return el.id === "bloom-root" || !!el.closest(BLOOM_CHROME);
}

function isAccountMenuText(el: Element): boolean {
    const text = el.textContent || "";
    return /settings|设置|log\s?out|sign out|退出/.test(text);
}

/** Large ChatGPT Settings window (tabs). Not the small account switcher. */
function isHostSettingsDialog(el: Element): boolean {
    if (el.querySelector('[role="tablist"], [role="tab"]')) return true;
    const text = el.textContent || "";
    if (!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(text)) return false;
    const r = el.getBoundingClientRect();
    return r.width > 420 && r.height > 360;
}

function visible(el: Element | null): el is HTMLElement {
    if (!(el instanceof HTMLElement) || !el.isConnected) return false;
    if (isBloomChrome(el)) return false;
    const dialog = el.closest('[role="dialog"], [aria-modal="true"]');
    if (dialog && isHostSettingsDialog(dialog)) return false;
    return el.getClientRects().length > 0;
}

function allProfileButtons(): HTMLElement[] {
    const hits: HTMLElement[] = [];
    for (const hit of document.querySelectorAll(PROFILE_SEL)) {
        if (!(hit instanceof HTMLElement) || !hit.isConnected) continue;
        if (isBloomChrome(hit)) continue;
        hits.push(hit);
    }
    return hits;
}

/** Screen-left rail, not a translated-off slideover (negative left). */
function onscreenLeftRail(el: HTMLElement): boolean {
    const r = el.getBoundingClientRect();
    return r.width > 2
        && r.height > 2
        && r.left >= 0
        && r.left < window.innerWidth / 3
        && r.bottom > 0
        && r.top < window.innerHeight;
}

export function findProfileButton(): HTMLElement | null {
    const hits = allProfileButtons();
    const onscreen = hits.filter(onscreenLeftRail);
    if (onscreen.length) return onscreen[0];
    return hits[0] ?? null;
}

/**
 * Block that owns the whole account chip (avatar + bag / plan).
 * Bloom++ is inserted as this node's previous sibling — never inside
 * `.sticky.bottom-0` (one-row height + overflow:hidden).
 */
export function railAnchor(profile: HTMLElement): HTMLElement {
    const sticky = profile.closest<HTMLElement>(".sticky.bottom-0");
    if (sticky?.parentElement && !isBloomChrome(sticky.parentElement)) return sticky;

    const nav = profile.closest("nav");
    if (nav?.parentElement) {
        const sib = nav.nextElementSibling;
        if (sib instanceof HTMLElement && sib.contains(profile) && !isBloomChrome(sib)) return sib;
    }

    let n: HTMLElement = profile;
    while (n.parentElement && n.parentElement !== document.body) {
        const p: HTMLElement = n.parentElement;
        if (p.id === "stage-slideover-sidebar") return n;
        if (p.tagName === "NAV") return n;
        n = p;
    }
    return n;
}

/** @deprecated use railAnchor — kept so older call sites compile. */
export function profileInsertionTarget(profile: HTMLElement): HTMLElement {
    return railAnchor(profile);
}

export function findAccountMenu(): HTMLElement | null {
    const menus = document.querySelectorAll(MENU_SEL);
    for (const menu of menus) {
        if (!visible(menu)) continue;
        if (isHostSettingsDialog(menu)) continue;
        if (isAccountMenuText(menu)) return menu;
    }
    const portals = document.querySelectorAll(PORTAL_SEL);
    for (const el of portals) {
        if (!visible(el) || !isAccountMenuText(el) || isHostSettingsDialog(el)) continue;
        const inner = el.querySelector(MENU_SEL);
        if (visible(inner) && !isHostSettingsDialog(inner)) return inner;
        return el;
    }
    return null;
}

export function findSidebarHost(): HTMLElement | null {
    const stage = document.getElementById("stage-slideover-sidebar");
    if (stage instanceof HTMLElement && stage.isConnected) return stage;
    for (const nav of document.querySelectorAll("nav")) {
        if (nav instanceof HTMLElement && nav.isConnected) return nav;
    }
    return null;
}

export function findSidebarAnchor(): HTMLElement | null {
    const profile = findProfileButton();
    if (profile) return railAnchor(profile);
    return null;
}

export function pathHitsProfile(e: Event): boolean {
    const profile = findProfileButton();
    if (!profile) return false;
    return e.composedPath().includes(profile);
}
