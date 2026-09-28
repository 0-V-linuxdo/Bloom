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

import { PROFILE_SEL as SHARED_PROFILE_SEL, RAIL_SEL, isRailPocket, queryFirst } from "./shell";

export const PROFILE_SEL = SHARED_PROFILE_SEL;

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
        || el.id === "stage-popover-sidebar"
        || el.id === "stage-sidebar-tiny-bar"
        || el.hasAttribute("data-app-navigation-rail")
        || el.hasAttribute("data-app-action-sidebar-scroll");
}

function looksLikeProfile(el: HTMLElement): boolean {
    const testid = el.getAttribute("data-testid") || "";
    if (/profile|account/i.test(testid)) return true;
    const label = `${el.getAttribute("aria-label") || ""} ${el.getAttribute("title") || ""}`;
    if (/profile|account|账号|账户|头像/i.test(label)) return true;
    if (el.querySelector("img, [data-bloom-csi-slot], [class*='rounded-full']")) return true;
    return false;
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

function railMenuButtons(root: ParentNode): HTMLElement[] {
    const out: HTMLElement[] = [];
    try {
        for (const hit of root.querySelectorAll('button[aria-haspopup="menu"]')) {
            if (!(hit instanceof HTMLElement) || !hit.isConnected) continue;
            if (isBloomChrome(hit)) continue;
            out.push(hit);
        }
    } catch { /* ignore */ }
    return out;
}

export function findProfileButton(): HTMLElement | null {
    const onscreen = allProfileButtons().filter(isOnscreenRail);
    if (onscreen[0]) return onscreen[0];

    const rail = queryFirst("[data-app-navigation-rail]");
    if (rail) {
        const menus = railMenuButtons(rail).filter(el => {
            const r = el.getBoundingClientRect();
            return r.width > 16 && r.height > 16 && r.left >= 0
                && r.left < window.innerWidth / 3 && r.bottom > 0;
        });
        const profile = menus.find(looksLikeProfile) ?? menus.at(-1);
        if (profile) return profile;
    }

    const footer = findSidebarFooter();
    if (footer) {
        const menus = railMenuButtons(footer).filter(el => {
            const r = el.getBoundingClientRect();
            return r.width > 16 && r.height > 16 && r.left >= 0 && r.bottom > 0;
        });
        const profile = menus.find(looksLikeProfile) ?? menus.at(-1);
        if (profile) return profile;
    }
    return null;
}

export function findTinyBar(): HTMLElement | null {
    for (const hit of document.querySelectorAll(RAIL_SEL)) {
        if (!(hit instanceof HTMLElement) || !hit.isConnected) continue;
        if (isBloomChrome(hit)) continue;
        const r = hit.getBoundingClientRect();
        if (r.width < 8 || r.height < 40 || r.left < 0 || r.left >= window.innerWidth / 3) continue;
        return hit;
    }
    return null;
}

/** Expanded-sidebar footer that holds Help / profile menus (2026-09 rail). */
export function findSidebarFooter(): HTMLElement | null {
    const scroll = queryFirst("[data-app-action-sidebar-scroll]");
    if (!scroll) return null;
    const candidates = [scroll.nextElementSibling, scroll.parentElement?.nextElementSibling];
    for (const el of candidates) {
        if (!(el instanceof HTMLElement) || !el.isConnected) continue;
        if (isBloomChrome(el) || isNavOrStage(el)) continue;
        if (el.querySelector('button[aria-haspopup="menu"]')) return el;
    }
    return null;
}

/**
 * chatgpt-exporter pocket: insert before the avatar chip, or before its
 * single-child wrapper. Never walk up to a wrapper whose parent is nav /
 * stage — that would pin as a direct child of the slideover (React wipe).
 * If the chip sits in a horizontal flex row (avatar + bag), insert before
 * that whole row — but only when the row's parent is not nav / stage.
 */
export function railAnchor(profile: HTMLElement): HTMLElement {
    const rail = profile.closest(RAIL_SEL);
    if (rail instanceof HTMLElement) {
        let row: HTMLElement | null = profile;
        while (row && row.parentElement !== rail) row = row.parentElement;
        if (row && row.parentElement === rail) return row;
    }

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
        if (parent && (!isNavOrStage(parent) || isRailPocket(parent))) return parent;
        if (!isNavOrStage(anchor) || isRailPocket(anchor)) return anchor;
    }
    const footer = findSidebarFooter();
    if (footer) return footer;
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
