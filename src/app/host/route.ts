/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Logger } from "@utils/Logger";

import { queryAll, queryVisible } from "./query";
import { Sel } from "./selectors";

const logger = new Logger("AppRoute");
const POLL_MS = 500;

export interface RouteChange {
    prevHref: string;
    href: string;
    prevId: string | null;
    id: string | null;
}

type RouteListener = (change: RouteChange) => void;

const listeners = new Set<RouteListener>();
let lastId: string | null = null;
let stopWatching: (() => void) | undefined;

export const conversationIdFromHref = (href: string) => {
    const match = href.match(/(?:local:)?([\w-]{8,})/);
    return match?.[1] ?? null;
};

export function currentConversationId() {
    const row = queryVisible<HTMLElement>(Sel.threadSelected) ?? queryAll<HTMLElement>(Sel.threadSelected)[0];
    return row?.getAttribute("data-app-action-sidebar-thread-id") ?? null;
}

export const isHomePath = () => !currentConversationId();

export const isProjectHome = () => false;

export const isTemporaryChat = () => false;

function check() {
    const id = currentConversationId();
    if (id === lastId) return;
    const { href } = location;
    const change: RouteChange = { prevHref: href, href, prevId: lastId, id };
    lastId = id;
    for (const listener of listeners) {
        try {
            listener(change);
        } catch (e) {
            logger.error("Route listener failed", e);
        }
    }
}

function startWatching() {
    const observer = new MutationObserver(check);
    const observe = () => {
        if (!document.body) return;
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["data-app-action-sidebar-thread-selected", "data-app-action-sidebar-thread-id"],
        });
    };
    observe();
    const poll = setInterval(check, POLL_MS);
    return () => {
        observer.disconnect();
        clearInterval(poll);
    };
}

export function checkRoute() {
    check();
}

export function onRouteChange(listener: RouteListener) {
    listeners.add(listener);
    if (!stopWatching) {
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
