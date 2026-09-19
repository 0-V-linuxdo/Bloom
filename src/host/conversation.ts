/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Conversation token / context lock from Chat-State-Favicons (MIT).
 * Title / create_time live in host/harvest.ts (shared GET+POST/SSE).
 */

const CONV_RE = /\/c\/([a-zA-Z0-9_-]{8,})/i;

export function conversationToken(): string {
    const params = new URLSearchParams(location.search || "");
    const paramId =
        params.get("conversationId")
        || params.get("conversation_id")
        || params.get("threadId")
        || params.get("thread_id")
        || params.get("chatId")
        || params.get("chat_id")
        || params.get("id")
        || "";

    const parts = location.pathname.split("/").filter(Boolean);
    const at = (key: string) => {
        const i = parts.indexOf(key);
        return i >= 0 ? (parts[i + 1] || "") : "";
    };
    const byPrefix = at("c") || at("chat") || at("conversation") || "";
    const last = parts.slice(-1)[0] || "";
    const lastId = /^[a-z0-9_-]{8,}$/i.test(last) ? last : "";

    const pickAttr = (sel: string, attr: string) => {
        try { return document.querySelector(sel)?.getAttribute(attr) || ""; }
        catch { return ""; }
    };
    const dataId =
        pickAttr("[data-conversation-id]", "data-conversation-id")
        || pickAttr("[data-thread-id]", "data-thread-id")
        || pickAttr("[data-chat-id]", "data-chat-id")
        || "";

    return [dataId, paramId, byPrefix || lastId].filter(Boolean).join("|");
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

export function currentConversationId(): string {
    const fromPath = conversationIdFromHref(location.pathname);
    if (fromPath) return fromPath;
    const token = conversationToken();
    const parts = token.split("|").filter(Boolean);
    for (let i = parts.length - 1; i >= 0; i--) {
        const part = parts[i];
        if (/^[a-z0-9_-]{8,}$/i.test(part)) return part;
    }
    return "";
}
