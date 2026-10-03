/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { icon } from "@components/icons";
import { isHydrated } from "@host/ready";
import { conversationIdFromHref, currentConversationId } from "@host/route";
import { Sel } from "@host/selectors";
import { classNameFactory } from "@utils/css";
import { h, hostMutations, watchBody } from "@utils/dom";
import { isRecord, normalizeText } from "@utils/misc";
import definePlugin, { OptionType } from "@utils/types";

import styles from "./styles.css";

const HEADER_TITLE = '#page-header h1, [data-testid="conversation-title"], [data-testid="thread-title"], header [data-conversation-title]';
const cl = classNameFactory("bloom-star-chats");
const MAX = 40;

interface StarredChat {
    id: string;
    href: string;
    title: string;
}

const settings = definePluginSettings({
    chats: { type: OptionType.CUSTOM, default: [] as StarredChat[] },
});

let unwatch: (() => void) | undefined;
let painting = false;

function chats(): StarredChat[] {
    const value: unknown = settings.store.chats;
    if (!Array.isArray(value)) return [];
    return value.filter((item): item is StarredChat =>
        isRecord(item) && typeof item.id === "string" && typeof item.href === "string" && typeof item.title === "string" && !!safeHref(item.href));
}

function safeHref(href: string) {
    try {
        const url = new URL(href, location.origin);
        if (url.origin !== location.origin || url.searchParams.get("temporary-chat") === "true") return null;
        if (!conversationIdFromHref(url.href)) return null;
        return `${url.pathname}${url.search}`;
    } catch {
        return null;
    }
}

function ready(el: Element) {
    for (let node: Element | null = el, depth = 0; node && depth < 8; node = node.parentElement, depth += 1) {
        if (isHydrated(node)) return true;
    }
    return false;
}

function inThread(el: Element) {
    return !!el.closest("main, [data-app-action-timeline-scroll], #thread, article");
}

function sidebarRoots() {
    const fresh = [...document.querySelectorAll(Sel.sidebarScroll)].filter(root => !root.closest("[inert]") && !inThread(root));
    if (fresh.length) return fresh;
    const oldNavs = [...document.querySelectorAll(`${Sel.oldSidebar} nav`)];
    if (oldNavs.length) return oldNavs;
    const old = [...document.querySelectorAll(Sel.oldSidebar)];
    if (old.length) return old;
    return [...document.querySelectorAll("nav")].filter(nav => !nav.closest("[inert]") && !inThread(nav) && !!nav.querySelector('a[href="/"], a[href*="/c/"]'));
}

function nativeLinks() {
    const selector = `${Sel.sidebarScroll} ${Sel.conversationLink}, ${Sel.oldSidebar} ${Sel.conversationLink}, nav ${Sel.conversationLink}, a[data-sidebar-item="true"]`;
    return [...document.querySelectorAll<HTMLAnchorElement>(selector)].filter(link => !link.closest("[data-bloom]") && !link.closest("[inert]") && !inThread(link) && !!conversationIdFromHref(link.href));
}

function rowTitle(link: HTMLAnchorElement) {
    const copy = link.cloneNode(true) as HTMLElement;
    for (const node of copy.querySelectorAll("[data-bloom]")) node.remove();
    return normalizeText(copy.textContent ?? "");
}

function hostRow(link: HTMLAnchorElement) {
    const parent = link.parentElement;
    const root = link.closest(Sel.sidebarScroll) ?? link.closest(Sel.oldSidebar) ?? link.closest("nav");
    if (!parent || parent === root) return link;
    const links = [...parent.querySelectorAll<HTMLAnchorElement>(Sel.conversationLink)].filter(item => !item.closest("[data-bloom]"));
    return links.length === 1 ? parent : link;
}

function starButton(id: string, pressed: boolean) {
    const button = h("button", {
        class: cl("-star"),
        attrs: {
            "type": "button",
            "data-bloom": "chat-star",
            "data-id": id,
            "aria-pressed": String(pressed),
            "aria-label": pressed ? "Unstar chat" : "Star chat",
        },
        on: {
            click: event => {
                event.preventDefault();
                event.stopPropagation();
                const link = nativeLinks().find(item => conversationIdFromHref(item.href) === id);
                if (link) {
                    toggle(link);
                    return;
                }
                const href = id === currentConversationId() ? safeHref(`${location.pathname}${location.search}`) : null;
                const named = normalizeText(button.previousElementSibling?.textContent ?? "");
                if (href && !chats().some(chat => chat.id === id)) remember(id, href, named || "Untitled chat");
                else settings.store.chats = chats().filter(chat => chat.id !== id);
            },
        },
    }, icon("star"));
    return button;
}

function setPressed(button: HTMLButtonElement, pressed: boolean) {
    button.setAttribute("aria-pressed", String(pressed));
    button.setAttribute("aria-label", pressed ? "Unstar chat" : "Star chat");
}

function remember(id: string, href: string, title: string) {
    const current = chats();
    settings.store.chats = current.some(chat => chat.id === id)
        ? current.filter(chat => chat.id !== id)
        : [{ id, href, title: title || "Untitled chat" }, ...current].slice(0, MAX);
}

function toggle(link: HTMLAnchorElement) {
    const id = conversationIdFromHref(link.href);
    const href = id ? safeHref(link.href) : null;
    if (!id || !href) return;
    remember(id, href, rowTitle(link) || "Untitled chat");
}

function openChat(event: MouseEvent, id: string) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (event.target instanceof Element && event.target.closest("[data-bloom='chat-star']")) return;
    const native = nativeLinks().find(link => conversationIdFromHref(link.href) === id);
    if (!native) return;
    event.preventDefault();
    native.click();
}

function syncTitles() {
    let changed = false;
    const next = chats().map(chat => {
        const link = nativeLinks().find(item => conversationIdFromHref(item.href) === chat.id);
        if (!link) return chat;
        const title = rowTitle(link);
        const href = safeHref(link.href);
        if (!title || !href || (title === chat.title && href === chat.href)) return chat;
        changed = true;
        return { ...chat, title, href };
    });
    if (changed) settings.store.chats = next;
}

function paintRows() {
    const ids = new Set(chats().map(chat => chat.id));
    for (const link of nativeLinks()) {
        const id = conversationIdFromHref(link.href);
        const href = id ? safeHref(link.href) : null;
        const row = hostRow(link);
        const existing = row.querySelector<HTMLButtonElement>(':scope > [data-bloom="chat-star"]');
        if (!id || !href || !ready(link)) {
            existing?.remove();
            continue;
        }
        const pressed = ids.has(id);
        if (existing) setPressed(existing, pressed);
        else row.append(starButton(id, pressed));
    }
}

function placeSection(root: Element, section: HTMLElement) {
    const create = [...root.querySelectorAll<HTMLAnchorElement>("a[href]")].find(anchor => {
        if (anchor.closest("[data-bloom]")) return false;
        try {
            const url = new URL(anchor.href, location.origin);
            return url.origin === location.origin && url.pathname === "/";
        } catch {
            return false;
        }
    });
    const top = create ? [...root.children].find(child => child === create || child.contains(create)) : null;
    if (top) top.after(section);
    else root.prepend(section);
}

function paintSection() {
    const items = chats();
    const wanted = new Set<Element>();
    const sig = items.map(chat => `${chat.id}\t${chat.title}\t${chat.href}`).join("\n");
    for (const root of sidebarRoots()) {
        if (!ready(root)) continue;
        let section = [...root.children].find((el): el is HTMLElement => el instanceof HTMLElement && el.dataset.bloom === "starred");
        if (!items.length) {
            section?.remove();
            continue;
        }
        if (!section) {
            section = h("div", { class: `bloom-root ${cl("")}`, attrs: { "data-bloom": "starred" } });
            placeSection(root, section);
        }
        wanted.add(section);
        if (section.dataset.sig === sig) continue;
        section.dataset.sig = sig;
        section.replaceChildren(
            h("div", { class: cl("-label"), text: "Starred" }),
            ...items.map(chat => h("a", {
                class: cl("-link"),
                attrs: { "href": safeHref(chat.href) ?? chat.href },
                on: { click: event => openChat(event, chat.id) },
            }, h("span", { class: cl("-title"), text: chat.title || "Untitled chat" }), starButton(chat.id, true))),
        );
    }
    for (const stale of document.querySelectorAll('[data-bloom="starred"]')) if (!wanted.has(stale)) stale.remove();
}

function headerTitle() {
    const known = [...document.querySelectorAll<HTMLElement>(HEADER_TITLE)].find(el => !el.closest("[data-bloom]") && ready(el));
    if (known) return known;
    const main = document.querySelector("main");
    if (!main) return null;
    const inMain = [...main.querySelectorAll<HTMLElement>("h1, h2, span")].find(el => {
        if (el.closest("[data-bloom]") || !ready(el)) return false;
        const text = normalizeText(el.textContent ?? "");
        if (!text || text.length > 80 || el.querySelector("button, a, svg")) return false;
        const rect = el.getBoundingClientRect();
        return rect.width > 16 && rect.height > 0 && rect.top >= 0 && rect.top < 96;
    });
    return inMain ?? null;
}

function paintHeader() {
    const id = currentConversationId();
    const title = id ? headerTitle() : null;
    const host = title?.parentElement;
    let button = host?.querySelector<HTMLButtonElement>(':scope > [data-bloom="chat-star"][data-place="header"]') ?? null;
    if (!id || !title || !host || !ready(host)) {
        for (const node of document.querySelectorAll('[data-bloom="chat-star"][data-place="header"]')) node.remove();
        return;
    }
    if (button?.dataset.id !== id) {
        button?.remove();
        button = starButton(id, chats().some(chat => chat.id === id));
        button.dataset.place = "header";
        button.classList.add(cl("-header"));
        title.after(button);
    } else if (button) setPressed(button, chats().some(chat => chat.id === id));
    for (const stale of document.querySelectorAll('[data-bloom="chat-star"][data-place="header"]')) if (stale !== button) stale.remove();
}

function render() {
    if (painting) return;
    painting = true;
    try {
        syncTitles();
        paintSection();
        paintRows();
        paintHeader();
    } finally {
        painting = false;
    }
}

function clear() {
    for (const node of document.querySelectorAll('[data-bloom="chat-star"], [data-bloom="starred"]')) node.remove();
}

export default definePlugin({
    name: "StarChats",
    description: "Star a chat in the sidebar and keep it at the top. No three-chat limit.",
    authors: ["Bloom contributors"],
    tags: ["chat", "ui"],
    icon: "star",
    enabledByDefault: true,
    settings,
    styles,
    onSettingsChange(key) {
        if (key === "chats") render();
    },
    start() {
        unwatch = watchBody(mutations => hostMutations(mutations) && render());
    },
    stop() {
        unwatch?.();
        unwatch = undefined;
        clear();
    },
});
