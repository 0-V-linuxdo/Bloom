/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Locate ChatGPT's left-rail profile and optional account portal.
 * Observe nothing on <html> or document.body[subtree].
 * No FAB, no overlay — the persistent entry is a sibling of the profile row.
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
    if (el.id === "bloom-root" || el.closest(BLOOM_CHROME)) return false;
    const dialog = el.closest('[role="dialog"], [aria-modal="true"]');
    if (dialog && isHostSettingsDialog(dialog)) return false;
    return el.getClientRects().length > 0;
}

export function findProfileButton(): HTMLElement | null {
    for (const hit of document.querySelectorAll(PROFILE_SEL)) {
        if (visible(hit)) return hit;
    }
    const roots: Element[] = [];
    const stage = document.getElementById("stage-slideover-sidebar");
    if (stage) roots.push(stage);
    for (const nav of document.querySelectorAll("nav")) roots.push(nav);
    for (const root of roots) {
        const sticky = root.querySelector(".sticky.bottom-0") ?? root;
        const labeled = sticky.querySelector<HTMLElement>("[aria-haspopup='menu']");
        if (visible(labeled)) return labeled;
        const last = [...sticky.querySelectorAll("button")].at(-1) ?? null;
        if (visible(last)) return last;
    }
    return null;
}

/** chatgpt-exporter: insert before the profile wrapper when it only wraps the control. */
export function profileInsertionTarget(profile: HTMLElement): HTMLElement {
    const wrap = profile.parentElement;
    if (!wrap || wrap.id === "bloom-rail-item" || wrap.id === "bloom-sidebar-panel") return profile;
    if (wrap.children.length === 1) return wrap;
    return profile;
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
    const stage = document.getElementById("stage-slideover-sidebar");
    if (stage instanceof HTMLElement) {
        const sticky = stage.querySelector<HTMLElement>(".sticky.bottom-0");
        if (visible(sticky)) return sticky;
        return stage;
    }
    const profile = findProfileButton();
    if (profile) {
        const sticky = profile.closest<HTMLElement>(".sticky.bottom-0");
        if (visible(sticky)) return sticky;
        if (profile.parentElement) return profile.parentElement;
    }
    for (const nav of document.querySelectorAll("nav")) {
        if (!(nav instanceof HTMLElement) || !visible(nav)) continue;
        const sticky = nav.querySelector<HTMLElement>(":scope .sticky.bottom-0");
        if (visible(sticky)) return sticky;
        return nav;
    }
    return null;
}

export function pathHitsProfile(e: Event): boolean {
    const profile = findProfileButton();
    if (!profile) return false;
    return e.composedPath().includes(profile);
}
