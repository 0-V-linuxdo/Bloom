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
    const copy = link.cloneNode(true) as HTMLElement;
    for (const node of copy.querySelectorAll("[data-bloom]")) node.remove();
    return normalizeText(copy.textContent ?? "");
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
                if (button.dataset.place === "header") {
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

function chatTitle(id: string) {
    const link = nativeLinks().find(item => conversationIdFromHref(item.href) === id);
    if (link) return rowTitle(link) || "Untitled chat";
    const title = normalizeText(document.title);
    return title && title !== "ChatGPT" ? title : "Untitled chat";
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

const HEADER_GAP = 4;

function placeHeader(button: HTMLButtonElement, host: HTMLButtonElement) {
    const box = host.getBoundingClientRect();
    const size = box.width || 36;
    button.style.position = "fixed";
    button.style.top = `${box.top}px`;
    button.style.left = `${box.left - size - HEADER_GAP}px`;
    button.style.width = `${size}px`;
    button.style.height = `${box.height || size}px`;
    button.style.margin = "0";
    button.style.transform = "none";
    button.style.zIndex = "40";
    button.style.opacity = "1";
    button.style.pointerEvents = "auto";
    button.style.color = getComputedStyle(host).color;
}

function paintHeader() {
    for (const stray of document.querySelectorAll('[data-bloom="navigator"] [data-bloom="chat-star"]')) stray.remove();
    const host = headerKebab();
    const id = currentConversationId();
    const href = id ? safeHref(`${location.pathname}${location.search}`) : null;
    const existing = document.querySelector<HTMLButtonElement>('[data-bloom="chat-star"][data-place="header"]');
    if (!host || !id || !href || !isHydrated(document.body)) {
        existing?.remove();
        return;
    }
    const pressed = chats().some(chat => chat.id === id);
    const button = existing?.dataset.id === id ? existing : starButton(id, pressed);
    if (button !== existing) existing?.remove();
    button.dataset.place = "header";
    setPressed(button, pressed);
    if (button.parentElement !== document.body) document.body.append(button);
    placeHeader(button, host);
}

function render() {
    if (painting) return;
    painting = true;
    try {
        syncTitles();
        paintSection();
        paintHeader();
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
    description: "Star the open chat from the header, just left of the top-right menu, and keep it at the top.",
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
        window.addEventListener("resize", render);
        window.addEventListener("scroll", render, true);
    },
    stop() {
        unwatch?.();
        unwatch = undefined;
        window.removeEventListener("resize", render);
        window.removeEventListener("scroll", render, true);
        clear();
    },
});
