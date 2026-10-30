/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { createEmitter } from "@utils/events";

export type Role = "user" | "assistant";

export interface ChainMessage {
    id: string;
    role: Role;
    createTime: number | null;
    text: string;
    hasFiles: boolean;
    imageCount: number;
}

export interface ConversationData {
    id: string;
    title: string | null;
    chain: ChainMessage[];
    times: Map<string, number>;
}

export const network = createEmitter<{
    "generate-start": { requestId: number; conversationId: string | null; parentId: string | null; userId: string | null; };
    "generate-end": { requestId: number; conversationId: string | null; error: boolean; handoff: boolean; };
    "conversation": ConversationData;
    "message-time": { conversationId: string | null; messageId: string; time: number; };
}>();

export const conversationData = (_id: string | null): ConversationData | null => null;

export const activeGenerateCount = () => 0;
