/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Conversation token / context lock from Chat-State-Favicons (MIT).
 * Title / create_time live in host/harvest.ts (shared GET+POST/SSE).
 */

const CONV_RE = /\/c\/([a-zA-Z0-9_-]{8,})/i;

/**
 * New-chat / GPT / project landing — no `/c/{id}` yet.
 * `/g/{gizmo}/c/{id}` is a real conversation, not a draft.
 */
export function isDraftLandingPath(path: string): boolean {
    const raw = String(path || "").split(/[?#]/)[0] || "";
    let pathname = raw;
    try {
        if (/^https?:/i.test(raw)) pathname = new URL(raw).pathname;
    } catch { /* keep raw */ }
    const norm = pathname.replace(/\/$/, "") || "/";
    if (norm === "/" || norm === "/g") return true;
    if (!norm.startsWith("/g/")) return false;
    return !CONV_RE.test(norm);
}

function queryId(): string {
    const params = new URLSearchParams(location.search || "");
    return params.get("conversationId")
        || params.get("conversation_id")
        || params.get("threadId")
        || params.get("thread_id")
        || params.get("chatId")
        || params.get("chat_id")
        || params.get("id")
        || "";
}

/**
 * Stable context token. Path `/c/{id}` wins (including `/g/…/c/{id}`).
 * Do not join leftover `data-conversation-id` — `id` then `id|id` looks
 * like a chat switch and ChatStateFavicons drops rotate / ready.
 * Landings stay empty so the key is `|draft`.
 */
export function conversationToken(): string {
    const pathId = conversationIdFromHref(location.pathname);
    if (pathId) return pathId;
    const paramId = queryId();
    if (paramId) return paramId;
    return "";
}

export function contextKeyFromUrl(token: string): string {
    const base = `${location.origin}${location.pathname}`;
    return token ? `${base}|${token}` : `${base}|draft`;
}

export function conversationIdFromHref(href: string): string {
    if (!href) return "";
    try {
        const path = /^https?:/i.test(href) ? new URL(href, location.origin).pathname : href;
        return path.match(CONV_RE)?.[1] ?? "";
    } catch {
        return href.match(CONV_RE)?.[1] ?? "";
    }
}

/** Path only. `/` and `/g/` must not inherit a leftover data-conversation-id. */
export function currentConversationId(): string {
    return conversationIdFromHref(location.pathname);
}
