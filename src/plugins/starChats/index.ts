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

function sidebarRoots() {
    const fresh = [...document.querySelectorAll(Sel.sidebarScroll)].filter(root => !root.closest("[inert]"));
    if (fresh.length) return fresh;
    const navs = [...document.querySelectorAll(`${Sel.oldSidebar} nav`)];
    return navs.length ? navs : [...document.querySelectorAll(Sel.oldSidebar)];
}

function nativeLinks() {
    const selector = `${Sel.sidebarScroll} ${Sel.conversationLink}, ${Sel.oldSidebar} ${Sel.conversationLink}`;
    return [...document.querySelectorAll<HTMLAnchorElement>(selector)].filter(link => !link.closest("[data-bloom]") && !link.closest("[inert]"));
}

function rowTitle(link: HTMLAnchorElement) {
    const titled = link.querySelector("[data-thread-title] [dir='auto'], [data-thread-title]");
    if (titled) return normalizeText(titled.textContent ?? "");
    const copy = link.cloneNode(true) as HTMLElement;
    for (const node of copy.querySelectorAll("[data-bloom]")) node.remove();
    return normalizeText(copy.textContent ?? "");
}

function openTitle() {
    const bar = document.querySelector('[data-testid="app-shell-header-context-menu-surface"]');
    if (!bar) return "";
    for (const node of bar.querySelectorAll("span, div, h1")) {
        if (node.closest("button, a, [data-bloom]") || node.children.length) continue;
        const text = normalizeText(node.textContent ?? "");
        if (text && text !== "ChatGPT" && text !== "Share") return text;
    }
    return "";
}

function chatTitle(id: string) {
    const link = nativeLinks().find(item => conversationIdFromHref(item.href) === id);
    const thread = link ? rowTitle(link) : "";
    const header = id === currentConversationId() ? openTitle() : "";
    if (header && (!thread || thread === normalizeText(document.title))) return header;
    if (thread) return thread;
    const title = normalizeText(document.title);
    return title && title !== "ChatGPT" ? title : "Untitled chat";
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
            pointerdown: event => event.stopPropagation(),
            mousedown: event => event.stopPropagation(),
            click: event => {
                event.preventDefault();
                event.stopPropagation();
                const { place } = button.dataset;
                if (place === "header" || place === "action") {
                    const href = safeHref(`${location.pathname}${location.search}`);
                    if (href) remember(id, href, chatTitle(id));
                    return;
                }
                const link = nativeLinks().find(item => conversationIdFromHref(item.href) === id);
                if (link) toggle(link);
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
        const title = chatTitle(chat.id);
        const href = link ? safeHref(link.href) ?? chat.href : chat.href;
        if (!title || (title === chat.title && href === chat.href)) return chat;
        changed = true;
        return { ...chat, title, href };
    });
    if (changed) settings.store.chats = next;
}

function headerKebab() {
    const buttons = [...document.querySelectorAll<HTMLButtonElement>(Sel.headerMore)].filter(button => {
        if (button.dataset.bloom === "chat-star" || button.closest("[data-bloom], [role='dialog'], [inert]")) return false;
        if (button.closest(Sel.sidebars)) return false;
        const box = button.getBoundingClientRect();
        if (box.width === 0 && box.height === 0) return !!button.closest("header, #page-header");
        return box.top >= 0 && box.top < 96 && box.left > window.innerWidth * 0.5;
    });
    return buttons.toSorted((a, b) => b.getBoundingClientRect().left - a.getBoundingClientRect().left || ((a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) ? 1 : -1))[0] ?? null;
}

function paintHeader() {
    for (const stray of document.querySelectorAll('[data-bloom="navigator"] [data-bloom="chat-star"]')) stray.remove();
    const host = headerKebab();
    const parent = host?.parentElement ?? null;
    const id = currentConversationId();
    const href = id ? safeHref(`${location.pathname}${location.search}`) : null;
    const existing = document.querySelector<HTMLButtonElement>('[data-bloom="chat-star"][data-place="header"]');
    if (!host || !parent || !id || !href || !isHydrated(parent)) {
        existing?.remove();
        return;
    }
    const pressed = chats().some(chat => chat.id === id);
    const button = existing?.dataset.id === id ? existing : starButton(id, pressed);
    if (button !== existing) existing?.remove();
    button.dataset.place = "header";
    setPressed(button, pressed);
    if (button.parentElement !== parent || button.nextElementSibling !== host) host.before(button);
    const box = host.getBoundingClientRect();
    if (box.width > 0) {
        button.style.width = `${box.width}px`;
        button.style.height = `${box.height}px`;
    }
    button.style.color = getComputedStyle(host).color;
}

function actionBars() {
    return [...document.querySelectorAll<HTMLElement>(".turn-action-controls")].filter(bar =>
        !bar.closest(`[data-bloom], [role="dialog"], [inert], ${Sel.sidebars}`));
}

function paintActions() {
    const id = currentConversationId();
    const href = id ? safeHref(`${location.pathname}${location.search}`) : null;
    const existing = [...document.querySelectorAll<HTMLButtonElement>('[data-bloom="chat-star"][data-place="action"]')];
    if (!id || !href) {
        for (const button of existing) button.remove();
        return;
    }
    const pressed = chats().some(chat => chat.id === id);
    const kept = new Set<HTMLButtonElement>();
    for (const bar of actionBars()) {
        if (!isHydrated(bar)) continue;
        let button = bar.querySelector<HTMLButtonElement>('[data-place="action"]');
        if (!button || button.dataset.id !== id) {
            button?.remove();
            button = starButton(id, pressed);
            button.dataset.place = "action";
        }
        setPressed(button, pressed);
        if (button.parentElement !== bar) bar.prepend(button);
        const sample = [...bar.querySelectorAll("button")].find(item => item !== button);
        const box = sample?.getBoundingClientRect();
        if (box && box.width > 0) {
            button.style.width = `${box.width}px`;
            button.style.height = `${box.height}px`;
        }
        kept.add(button);
    }
    for (const button of existing) if (!kept.has(button)) button.remove();
}

function render() {
    if (painting) return;
    painting = true;
    try {
        syncTitles();
        paintSection();
        paintHeader();
        paintActions();
    } finally {
        painting = false;
    }
}

function placeSection(root: Element, section: HTMLElement) {
    const create = [...root.children].find(el =>
        el instanceof HTMLAnchorElement && (el.getAttribute("href") === "/" || el.dataset.testid === "create-new-chat-button"));
    if (create) create.after(section);
    else root.prepend(section);
}

function paintSection() {
    const items = chats();
    const wanted = new Set<Element>();
    const sig = items.map(chat => `${chat.id}\t${chat.title}\t${chat.href}`).join("\n");
    for (const root of sidebarRoots()) {
        if (!isHydrated(root)) continue;
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

function clear() {
    for (const node of document.querySelectorAll('[data-bloom="chat-star"], [data-bloom="starred"]')) node.remove();
}

export default definePlugin({
    name: "StarChats",
    description: "Star the open chat from the message toolbar and the header, and keep it at the top of the sidebar.",
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
