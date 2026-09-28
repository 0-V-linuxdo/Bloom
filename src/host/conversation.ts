/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { normalizeText } from "@utils/misc";

import { conversationData } from "./network";
import { currentConversationId } from "./route";
import { sidebarTitle } from "./sidebar";

const GENERIC_TITLES = new Set(["chatgpt", "new chat", "新聊天"]);

function pageTitle() {
    const title = normalizeText(document.title.replace(/\s*[|–-]\s*ChatGPT$/i, ""));
    return title && !GENERIC_TITLES.has(title.toLowerCase()) ? title : null;
}

export function conversationTitle(id: string | null) {
    if (!id) return null;
    return conversationData(id)?.title ?? sidebarTitle(id) ?? (id === currentConversationId() ? pageTitle() : null);
}
