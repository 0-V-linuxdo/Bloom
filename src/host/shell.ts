/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Shared chatgpt.com shell selectors. ChatGPT A/B-tests the 2026-09
 * redesigned rail next to the older stage-slideover layout, so every
 * helper keeps both. SVG sprite ids (`lightweight-*`) are not mounts.
 *
 * New (2026-09-20+):
 *   [data-app-navigation-rail]
 *   [data-app-action-sidebar-scroll]
 *   [data-sidebar-destination]
 *   [data-chatgpt-conversation-selection-target]
 *   [data-chatgpt-search-message-ids]
 *   textarea[name=prompt] / #mobile-composer-prompt
 *   [data-testid=desktop-app-shell]
 *
 * Old:
 *   #stage-slideover-sidebar / #stage-sidebar-tiny-bar
 *   form[data-type=unified-composer] / #prompt-textarea
 *   [data-testid=accounts-profile-button]
 *   #thread / conversation-turn
 *
 * Never observe documentElement or body[subtree]. Never strip official
 * favicon links. CSS-only plugins must not use wrapper :has() — these
 * :has() lists are for JS querySelector only.
 */

export const PROFILE_SEL = [
    '[data-testid="accounts-profile-button"]',
    '[data-testid="profile-button"]',
    '[data-testid="user-menu-button"]',
    '[data-testid="account-menu-button"]',
    'button[aria-label*="profile" i][aria-haspopup]',
    'button[aria-label*="account" i][aria-haspopup]',
    '[aria-haspopup="menu"][data-testid*="profile" i]',
].join(",");

export const SIDEBAR_SEL = [
    "#stage-slideover-sidebar",
    "#stage-popover-sidebar",
    "[data-app-action-sidebar-scroll]",
    '[data-testid="desktop-app-shell"]',
].join(",");

export const RAIL_SEL = [
    "#stage-sidebar-tiny-bar",
    "[data-app-navigation-rail]",
].join(",");

export const RECENTS_SEL = 'a[href^="/c/"], a[href*="/c/"]';

/** JS-only. CSS plugins must not copy the :has() clauses. */
export const COMPOSER_FORM_SEL = [
    'form[data-type="unified-composer"]',
    '[data-type="unified-composer"]',
    "form.w-full[data-type]",
    "form:has(#prompt-textarea)",
    'form:has([data-testid="prompt-textarea"])',
    'form:has(textarea[name="prompt"])',
    "form:has(#mobile-composer-prompt)",
    'form:has([data-testid="mobile-composer-prompt"])',
    "#thread-bottom-container form",
    "#thread-bottom form",
].join(", ");

export const EDITOR_SEL = [
    'textarea[name="prompt"]',
    "#mobile-composer-prompt",
    '[data-testid="mobile-composer-prompt"]',
    "[data-mobile-composer-prompt]",
    "textarea#prompt-textarea",
    'textarea[data-testid="prompt-textarea"]',
    "#prompt-textarea",
    '[data-testid="prompt-textarea"]',
    'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]',
    '[contenteditable="true"][role="textbox"]',
].join(", ");

export const THREAD_SEL = [
    "#thread",
    '[data-testid="conversation-panel"]',
    "[data-chatgpt-conversation-selection-target]",
    "main",
].join(", ");

export const TURN_SEL = [
    'section[data-testid^="conversation-turn-"][data-turn="user"]',
    'section[data-testid^="conversation-turn-"][data-turn="assistant"]',
    'article[data-testid^="conversation-turn-"][data-turn="user"]',
    'article[data-testid^="conversation-turn-"][data-turn="assistant"]',
    "[data-chatgpt-conversation-selection-target] [data-chatgpt-search-message-ids]",
    "[data-chatgpt-search-message-ids]",
].join(", ");

export const MESSAGE_NODE_SEL = [
    "[data-message-id]",
    "[data-chatgpt-search-message-ids]",
].join(", ");

export const ASSISTANT_TURN_SEL = [
    '#thread section[data-testid^="conversation-turn-"][data-turn="assistant"]',
    '#thread article[data-testid^="conversation-turn-"][data-turn="assistant"]',
    '[data-chatgpt-conversation-selection-target] [data-chatgpt-search-message-ids] [data-message-author-role="assistant"]',
    '[data-chatgpt-search-message-ids] [data-message-author-role="assistant"]',
    '[data-chatgpt-search-message-ids][data-message-author-role="assistant"]',
    '[data-message-author-role="assistant"]',
].join(", ");

const BLOOM_CHROME = "#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item, #bloom-bn-host, #bloom-pq-chip, #bloom-rt-host";

function isBloomChrome(el: Element): boolean {
    return !!el.closest(BLOOM_CHROME);
}

export function queryFirst(sel: string, root: ParentNode = document): HTMLElement | null {
    try {
        const hit = root.querySelector(sel);
        return hit instanceof HTMLElement ? hit : null;
    } catch {
        return null;
    }
}

export function hasSidebarShell(): boolean {
    try {
        return !!(
            document.getElementById("stage-slideover-sidebar")
            || document.getElementById("stage-popover-sidebar")
            || queryFirst(RAIL_SEL)
            || queryFirst(SIDEBAR_SEL)
            || queryFirst(PROFILE_SEL)
            || queryFirst('[data-sidebar-destination]')
        );
    } catch {
        return false;
    }
}

export function hasComposer(): boolean {
    try {
        return !!queryFirst(EDITOR_SEL);
    } catch {
        return false;
    }
}

export function sidebarRoot(): HTMLElement | null {
    const slide = document.getElementById("stage-slideover-sidebar");
    if (slide instanceof HTMLElement && slide.isConnected && !isBloomChrome(slide)) return slide;
    const pop = document.getElementById("stage-popover-sidebar");
    if (pop instanceof HTMLElement && pop.isConnected && !isBloomChrome(pop)) return pop;
    const scroll = queryFirst("[data-app-action-sidebar-scroll]");
    if (scroll && !isBloomChrome(scroll)) {
        const host = scroll.closest("nav") ?? scroll.parentElement ?? scroll;
        if (host instanceof HTMLElement && !isBloomChrome(host)) return host;
        return scroll;
    }
    const rail = queryFirst("[data-app-navigation-rail]");
    if (rail && !isBloomChrome(rail)) return rail;
    const nav = queryFirst("nav");
    if (nav && !isBloomChrome(nav)) return nav;
    const shell = queryFirst('[data-testid="desktop-app-shell"]');
    return shell && !isBloomChrome(shell) ? shell : null;
}

export function threadRoot(): HTMLElement | null {
    const thread = document.getElementById("thread");
    if (thread instanceof HTMLElement && thread.isConnected) return thread;
    const panel = queryFirst('[data-testid="conversation-panel"]');
    if (panel) return panel;
    const select = queryFirst("[data-chatgpt-conversation-selection-target]");
    if (select) return select;
    const main = queryFirst("main");
    return main;
}

export function messageIdsOf(el: Element): string[] {
    const out: string[] = [];
    const push = (id: string | null | undefined) => {
        if (id && !out.includes(id)) out.push(id);
    };
    push(el.getAttribute("data-message-id"));
    push(el.getAttribute("data-turn-id"));
    const packed = el.getAttribute("data-chatgpt-search-message-ids") || "";
    for (const id of packed.split(/\s+/)) push(id);
    try {
        push(el.querySelector("[data-message-id]")?.getAttribute("data-message-id"));
        push(el.querySelector("[data-turn-id]")?.getAttribute("data-turn-id"));
    } catch { /* ignore */ }
    return out;
}

/** Last id in a merged block — the reply the user actually sees. */
export function primaryMessageId(el: Element): string {
    const ids = messageIdsOf(el);
    return ids[ids.length - 1] || "";
}

export function isRailPocket(el: Element | null): boolean {
    if (!(el instanceof HTMLElement)) return false;
    return el.id === "stage-sidebar-tiny-bar"
        || el.hasAttribute("data-app-navigation-rail");
}
