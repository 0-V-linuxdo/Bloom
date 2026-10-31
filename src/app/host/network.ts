/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { visible } from "@utils/dom";
import { createEmitter } from "@utils/events";
import { Logger } from "@utils/Logger";
import { isRecord, normalizeText } from "@utils/misc";

import { protocol, type ProtocolNote } from "./protocol";
import { Sel } from "./selectors";
import { sidebarTitle } from "./sidebar";

const logger = new Logger("AppNetwork");

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
    "conversation-missing": { id: string; };
}>();

const conversations = new Map<string, ConversationData>();
const signatures = new Map<string, string>();

export const activeGenerateCount = () => 0;

const isChatRole = (value: unknown): value is Role => value === "user" || value === "assistant";

export function conversationKeys(id: string) {
    const bare = id.replace(/^local:/, "");
    return [...new Set([id, bare, `local:${bare}`])];
}

function conversationEntry(id: string) {
    const keys = conversationKeys(id);
    for (const key of keys) {
        const found = conversations.get(key);
        if (found) return found;
    }
    const entry: ConversationData = { id: keys[0] ?? id, title: null, chain: [], times: new Map() };
    for (const key of keys) conversations.set(key, entry);
    return entry;
}

export function conversationData(id: string | null): ConversationData | null {
    if (!id) return null;
    harvestFiber(id);
    const keys = conversationKeys(id);
    return keys.map(key => conversations.get(key)).find(entry => entry && (entry.chain.length || entry.title)) ?? conversations.get(keys[0] ?? id) ?? null;
}

function messageOf(id: string, role: Role, text: string, createTime: number | null = null): ChainMessage {
    return { id, role, createTime, text: normalizeText(text), hasFiles: false, imageCount: 0 };
}

function mergeMessage(entry: ConversationData, incoming: ChainMessage) {
    const existing = entry.chain.find(item => item.id === incoming.id);
    if (existing) {
        if (incoming.text) existing.text = incoming.text;
        if (incoming.createTime != null) existing.createTime = incoming.createTime;
        return;
    }
    const same = entry.chain.find(item => item.role === incoming.role && item.text && item.text === incoming.text);
    if (same) {
        if (!entry.times.has(incoming.id) && incoming.createTime != null) entry.times.set(incoming.id, incoming.createTime);
        return;
    }
    entry.chain.push(incoming);
}

function publish(entry: ConversationData) {
    const signature = entry.chain.map(item => `${item.id}\t${item.role}\t${item.text}`).join("\n");
    if (signatures.get(entry.id) === signature) return;
    signatures.set(entry.id, signature);
    network.emit("conversation", entry);
}

function callText(value: unknown): string {
    if (typeof value === "function") {
        try {
            return normalizeText(String((value as () => unknown)() ?? ""));
        } catch (e) {
            logger.warn("Turn label failed", e);
            return "";
        }
    }
    return typeof value === "string" ? normalizeText(value) : "";
}

function previewText(value: unknown): string {
    if (typeof value !== "function") return "";
    try {
        const preview = (value as () => unknown)();
        if (typeof preview === "string") return normalizeText(preview);
        if (isRecord(preview) && typeof preview.response === "string") return normalizeText(preview.response);
        return "";
    } catch (e) {
        logger.warn("Turn preview failed", e);
        return "";
    }
}

interface FiberNode {
    child?: FiberNode | null;
    sibling?: FiberNode | null;
    memoizedProps?: unknown;
    pendingProps?: unknown;
}

function reactFiber(el: Element): FiberNode | null {
    const key = Object.keys(el).find(name => name.startsWith("__reactFiber$") || name.startsWith("__reactInternalInstance$"));
    return key ? (el as unknown as Record<string, FiberNode>)[key] ?? null : null;
}

function collectFiberTurns(root: FiberNode | null, depth: number, items: Record<string, unknown>[], entries: Record<string, unknown>[]) {
    if (!root || depth > 24) return;
    const props = (isRecord(root.memoizedProps) ? root.memoizedProps : null) ?? (isRecord(root.pendingProps) ? root.pendingProps : null);
    if (props) {
        if (Array.isArray(props.items) && isRecord(props.items[0]) && typeof props.items[0].turnKey === "string" && !items.length) {
            items.push(...props.items.filter(isRecord));
        }
        if (Array.isArray(props.entries) && isRecord(props.entries[0]) && typeof (props.entries[0].historyEntityKey ?? props.entries[0].turnId) === "string" && !entries.length) {
            entries.push(...props.entries.filter(isRecord));
        }
    }
    collectFiberTurns(root.child ?? null, depth + 1, items, entries);
    collectFiberTurns(root.sibling ?? null, depth, items, entries);
}

function itemFor(items: Record<string, unknown>[], entry: Record<string, unknown>) {
    const turnId = typeof entry.turnId === "string" ? entry.turnId : "";
    const turnKey = typeof entry.turnKey === "string" ? entry.turnKey : "";
    return items.find(item => {
        const key = typeof item.turnKey === "string" ? item.turnKey : "";
        return !!key && (turnId === key || turnKey.endsWith(key) || turnKey.includes(key));
    }) ?? null;
}

function harvestFiber(id: string) {
    const host = visible("[data-thread-find-target='conversation']") ?? visible(Sel.timelineScroll);
    if (!host) return;
    const items: Record<string, unknown>[] = [];
    const entries: Record<string, unknown>[] = [];
    try {
        collectFiberTurns(reactFiber(host), 0, items, entries);
    } catch (e) {
        logger.warn("Fiber walk failed", e);
        return;
    }
    if (!entries.length && !items.length) return;
    const source = entries.length ? entries : items;
    const conversationId = typeof source[0]?.conversationId === "string" ? source[0].conversationId : id;
    const entry = conversationEntry(conversationId);
    entry.title = sidebarTitle(id) ?? sidebarTitle(conversationId) ?? entry.title;
    for (const row of source) {
        let turnId = "";
        if (typeof row.turnId === "string") turnId = row.turnId;
        else if (typeof row.turnKey === "string") turnId = row.turnKey.replace(/^.*turn:/, "");
        const userId = typeof row.historyEntityKey === "string" ? row.historyEntityKey : (turnId ? `turn:${turnId}` : "");
        const item = itemFor(items, row);
        const userText = callText(item?.getLabel ?? row.getLabel);
        const assistantText = previewText(item?.getPreview ?? row.getPreview);
        const time = typeof row.timestampSeparatorAtMs === "number" ? row.timestampSeparatorAtMs : null;
        if (userId && userText) {
            mergeMessage(entry, messageOf(userId, "user", userText, time));
            if (time) entry.times.set(userId, time);
        }
        if (turnId && assistantText) mergeMessage(entry, messageOf(`${turnId}:assistant`, "assistant", assistantText, time));
    }
    publish(entry);
}

function roleOfItem(item: Record<string, unknown>): Role | null {
    if (isChatRole(item.role)) return item.role;
    const type = typeof item.type === "string" ? item.type : (typeof item.itemType === "string" ? item.itemType : "");
    if (/user/i.test(type)) return "user";
    if (/agent|assistant/i.test(type)) return "assistant";
    return null;
}

function textOfItem(item: Record<string, unknown>) {
    if (typeof item.text === "string") return item.text;
    if (typeof item.content === "string") return item.content;
    if (isRecord(item.content) && typeof item.content.text === "string") return item.content.text;
    return "";
}

function ingestItem(threadId: string | undefined, item: unknown) {
    if (!threadId || !isRecord(item)) return;
    const id = typeof item.id === "string" ? item.id : (typeof item.itemId === "string" ? item.itemId : "");
    const role = roleOfItem(item);
    const text = textOfItem(item);
    if (!id || !role) return;
    const entry = conversationEntry(threadId);
    mergeMessage(entry, messageOf(id, role, text));
    publish(entry);
}

function onNote(note: ProtocolNote) {
    const thread = note.params?.thread;
    const threadId = note.params?.threadId ?? (isRecord(thread) && typeof thread.id === "string" ? thread.id : undefined);
    if (note.params?.item) ingestItem(threadId, note.params.item);
    for (const item of note.params?.items ?? []) ingestItem(threadId, item);
    if (isRecord(thread) && Array.isArray(thread.items)) {
        for (const item of thread.items) ingestItem(threadId, item);
    }
}

protocol.on("note", onNote);
