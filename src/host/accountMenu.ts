/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Locate ChatGPT's left-rail profile and optional account portal.
 * Observe nothing on <html> or document.body[subtree].
 * Bloom++ is the previous sibling of the avatar chip (or its single-child
 * wrapper) inside the account footer — chatgpt-exporter pocket. Never a
 * direct child of nav / #stage-slideover-sidebar (that blows React hydration).
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

function isNavOrStage(el: HTMLElement): boolean {
    return el.tagName === "NAV"
        || el.id === "stage-slideover-sidebar"
        || el.id === "stage-sidebar-tiny-bar";
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

/**
 * Screen-left rail the user can actually see. Translated-off
 * #stage-slideover-sidebar copies fail this (negative left, or tiny box).
 */
export function isOnscreenRail(el: HTMLElement): boolean {
    if (!el.isConnected || isBloomChrome(el)) return false;
    const r = el.getBoundingClientRect();
    return r.width > 40
        && r.height > 16
        && r.left >= 0
        && r.left < window.innerWidth / 3
        && r.top < window.innerHeight
        && r.bottom > 0;
}

export function findProfileButton(): HTMLElement | null {
    const onscreen = allProfileButtons().filter(isOnscreenRail);
    return onscreen[0] ?? null;
}

export function findTinyBar(): HTMLElement | null {
    const bar = document.getElementById("stage-sidebar-tiny-bar");
    if (!(bar instanceof HTMLElement) || !bar.isConnected) return null;
    if (isBloomChrome(bar)) return null;
    const r = bar.getBoundingClientRect();
    if (r.width < 8 || r.height < 40 || r.left < 0 || r.left >= window.innerWidth / 3) return null;
    return bar;
}

/**
 * chatgpt-exporter pocket: insert before the avatar chip, or before its
 * single-child wrapper. Never walk up to a wrapper whose parent is nav /
 * stage — that would pin as a direct child of the slideover (React wipe).
 * If the chip sits in a horizontal flex row (avatar + bag), insert before
 * that whole row — but only when the row's parent is not nav / stage.
 */
export function railAnchor(profile: HTMLElement): HTMLElement {
    let target: HTMLElement = profile;
    const wrap = profile.parentElement;
    if (
        wrap
        && wrap.children.length === 1
        && !isBloomChrome(wrap)
        && !isNavOrStage(wrap)
        && wrap.parentElement
        && !isNavOrStage(wrap.parentElement)
    ) {
        target = wrap;
    }

    const row = target.parentElement;
    if (row && !isNavOrStage(row) && !isBloomChrome(row) && row.children.length > 1) {
        const cls = row.getAttribute("class") || "";
        const horizontal = /\bflex\b/.test(cls) && !/flex-col/.test(cls);
        if (horizontal && row.parentElement && !isNavOrStage(row.parentElement)) {
            return row;
        }
    }
    return target;
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

/** Footer / tiny-bar pocket for childList observers. Never the whole slideover. */
export function findSidebarHost(): HTMLElement | null {
    const profile = findProfileButton();
    if (profile) {
        const anchor = railAnchor(profile);
        const parent = anchor.parentElement;
        if (parent && !isNavOrStage(parent)) return parent;
        if (!isNavOrStage(anchor)) return anchor;
    }
    return findTinyBar();
}

export function findSidebarAnchor(): HTMLElement | null {
    const profile = findProfileButton();
    if (profile) return railAnchor(profile);
    return findTinyBar();
}

export function pathHitsProfile(e: Event): boolean {
    const profile = findProfileButton();
    if (!profile) return false;
    return e.composedPath().includes(profile);
}
