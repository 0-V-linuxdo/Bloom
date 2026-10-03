/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { isHydrated } from "@host/ready";
import { isTemporaryChat } from "@host/route";
import { Sel } from "@host/selectors";
import { classNameFactory } from "@utils/css";
import { h, hostMutations, watchBody } from "@utils/dom";
import definePlugin, { OptionType } from "@utils/types";

import styles from "./styles.css";

const cl = classNameFactory("bloom-temporary-");

const settings = definePluginSettings({
    openNewAsTemporary: { type: OptionType.BOOLEAN, description: "Open New chat as a temporary chat.", default: false },
});

let unwatch: (() => void) | undefined;
let abort: AbortController | undefined;
let painting = false;

function destination(temporary: boolean) {
    return temporary ? "/?temporary-chat=true" : "/";
}

function go(temporary: boolean) {
    const next = destination(temporary);
    const here = `${location.pathname}${location.search}`;
    if (here === next || (temporary && isTemporaryChat() && location.pathname === "/")) return;
    location.assign(next);
}

function roots() {
    const fresh = [...document.querySelectorAll(Sel.sidebarScroll)].filter(root => !root.closest("[inert]") && isHydrated(root));
    if (fresh.length) return fresh;
    const old = document.querySelector(`${Sel.oldSidebar} nav`) ?? document.querySelector(Sel.oldSidebar);
    return old && isHydrated(old) ? [old] : [];
}

function isNewChat(anchor: HTMLAnchorElement) {
    if (anchor.closest("[data-bloom]")) return false;
    try {
        const url = new URL(anchor.href, location.origin);
        return url.origin === location.origin && url.pathname === "/";
    } catch {
        return false;
    }
}

function newChatLink(root: Element) {
    return [...root.querySelectorAll<HTMLAnchorElement>("a[href]")].find(isNewChat) ?? null;
}

function button() {
    const pressed = isTemporaryChat();
    return h("button", {
        class: cl("button"),
        attrs: {
            "type": "button",
            "data-bloom": "temporary-chat",
            "aria-pressed": String(pressed),
            "aria-label": pressed ? "Turn off temporary chat" : "Temporary chat",
        },
        text: "Temporary",
    });
}

function paint() {
    const wanted = new Set<HTMLElement>();
    for (const root of roots()) {
        let el = [...root.querySelectorAll<HTMLElement>('[data-bloom="temporary-chat"]')].find(node => root.contains(node));
        const link = newChatLink(root);
        if (!el) {
            el = button();
            if (link) link.after(el);
            else root.prepend(el);
        } else {
            const pressed = isTemporaryChat();
            el.setAttribute("aria-pressed", String(pressed));
            el.setAttribute("aria-label", pressed ? "Turn off temporary chat" : "Temporary chat");
        }
        wanted.add(el);
    }
    for (const stale of document.querySelectorAll<HTMLElement>('[data-bloom="temporary-chat"]')) {
        if (!wanted.has(stale)) stale.remove();
    }
}

function render() {
    if (painting) return;
    painting = true;
    try {
        paint();
    } finally {
        painting = false;
    }
}

function onPointerDown(event: PointerEvent) {
    const { target } = event;
    if (!(target instanceof Element)) return;
    if (target.closest('[data-bloom="temporary-chat"]')) {
        event.preventDefault();
        event.stopPropagation();
        go(!isTemporaryChat());
        return;
    }
    if (!settings.store.openNewAsTemporary || isTemporaryChat()) return;
    const anchor = target.closest("a[href]");
    if (!(anchor instanceof HTMLAnchorElement) || !isNewChat(anchor)) return;
    if (!anchor.closest(`${Sel.sidebarScroll}, ${Sel.rail}, ${Sel.oldSidebar}, nav`)) return;
    event.preventDefault();
    event.stopPropagation();
    go(true);
}

export default definePlugin({
    name: "TemporaryChat",
    description: "One click starts a temporary chat. Optionally make New chat temporary.",
    authors: ["Bloom contributors"],
    tags: ["privacy", "ui"],
    icon: "ghost",
    enabledByDefault: true,
    settings,
    styles,
    onSettingsChange: render,
    start() {
        abort = new AbortController();
        document.addEventListener("pointerdown", onPointerDown, { capture: true, signal: abort.signal });
        unwatch = watchBody(mutations => hostMutations(mutations) && render());
    },
    stop() {
        abort?.abort();
        abort = undefined;
        unwatch?.();
        unwatch = undefined;
        for (const node of document.querySelectorAll('[data-bloom="temporary-chat"]')) node.remove();
    },
});
