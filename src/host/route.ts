/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Logger } from "@utils/Logger";
import { pageWindow } from "@utils/misc";

const logger = new Logger("Route");

const CONVERSATION_PATH = /\/c\/(?!local-)([\w-]+)/;
const HREF_POLL_MS = 500;

export const conversationIdFromHref = (href: string) => {
    try {
        return new URL(href, location.origin).pathname.match(CONVERSATION_PATH)?.[1] ?? null;
    } catch {
        return null;
    }
};

export const currentConversationId = () => location.pathname.match(CONVERSATION_PATH)?.[1] ?? null;

export const isHomePath = () => location.pathname === "/";

const PROJECT_HOME = /^\/g\/g-p-[^/]+(?:\/project)?\/?$/;

export const isProjectHome = () => PROJECT_HOME.test(location.pathname);

export const isTemporaryChat = () => new URLSearchParams(location.search).get("temporary-chat") === "true";

export interface RouteChange {
    prevHref: string;
    href: string;
    prevId: string | null;
    id: string | null;
}

type RouteListener = (change: RouteChange) => void;

const listeners = new Set<RouteListener>();
let lastHref = location.href;
let lastId = currentConversationId();
let stopWatching: (() => void) | undefined;

function check() {
    if (location.href === lastHref) return;
    const change: RouteChange = { prevHref: lastHref, href: location.href, prevId: lastId, id: currentConversationId() };
    lastHref = change.href;
    lastId = change.id;
    for (const listener of listeners) {
        try {
            listener(change);
        } catch (e) {
            logger.error("Route listener failed", e);
        }
    }
}

function startWatching() {
    const controller = new AbortController();
    const { navigation } = pageWindow as { navigation?: EventTarget; };
    navigation?.addEventListener("currententrychange", () => queueMicrotask(check), { signal: controller.signal });
    addEventListener("popstate", check, { signal: controller.signal });
    const poll = setInterval(check, HREF_POLL_MS);
    return () => {
        controller.abort();
        clearInterval(poll);
    };
}

export function checkRoute() {
    check();
}

export function onRouteChange(listener: RouteListener) {
    listeners.add(listener);
    if (!stopWatching) {
        lastHref = location.href;
        lastId = currentConversationId();
        stopWatching = startWatching();
    }
    return () => {
        listeners.delete(listener);
        if (listeners.size) return;
        stopWatching?.();
        stopWatching = undefined;
    };
}
