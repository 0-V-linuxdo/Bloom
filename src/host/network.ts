/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { createEmitter } from "@utils/events";
import { Logger } from "@utils/Logger";
import { isRecord, pageWindow, parseJson } from "@utils/misc";

const logger = new Logger("Network");

const GENERATE_PATH = /^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/;
const CONVERSATION_PATH = /^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i;
const SECONDS_TO_MS = 1000;
const HANDOFF_EVENTS = new Set(["stream_handoff", "resume_sse_endpoint", "subscribe_ws_topic"]);

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

export interface GenerateEnd {
    requestId: number;
    conversationId: string | null;
    error: boolean;
    handoff: boolean;
}

export const network = createEmitter<{
    "generate-start": { requestId: number; conversationId: string | null; };
    "generate-end": GenerateEnd;
    "conversation": ConversationData;
    "message-time": { conversationId: string | null; messageId: string; time: number; };
}>();

const conversations = new Map<string, ConversationData>();
const activeStreams = new Map<number, string | null>();
let nextRequestId = 1;

export const conversationData = (id: string | null) => id ? conversations.get(id) ?? null : null;

export const activeGenerateCount = () => activeStreams.size;

function conversationEntry(id: string) {
    let entry = conversations.get(id);
    if (!entry) conversations.set(id, entry = { id, title: null, chain: [], times: new Map() });
    return entry;
}

interface RawMessage {
    id?: string;
    author?: { role?: string; };
    create_time?: number | null;
    content?: { content_type?: string; parts?: unknown[]; text?: string; };
    metadata?: Record<string, unknown>;
}

const isChatRole = (role: unknown): role is Role => role === "user" || role === "assistant";

function toChainMessage(raw: RawMessage): ChainMessage | null {
    const role = raw.author?.role;
    if (!raw.id || !isChatRole(role) || raw.metadata?.is_visually_hidden_from_conversation) return null;
    const type = raw.content?.content_type;
    if (type !== "text" && type !== "multimodal_text") return null;
    const parts = raw.content?.parts ?? [];
    const text = parts.filter(part => typeof part === "string").join("\n").trim();
    const imageCount = parts.filter(part => isRecord(part) && part.content_type === "image_asset_pointer").length;
    const attachments = raw.metadata?.attachments;
    const hasFiles = Array.isArray(attachments) && attachments.length > 0;
    if (!text && !imageCount && !hasFiles) return null;
    return { id: raw.id, role, createTime: raw.create_time ? raw.create_time * SECONDS_TO_MS : null, text, hasFiles, imageCount };
}

function parseWindow(entry: ConversationData, items: unknown[]) {
    const raws = items.filter(isRecord).map(item => (isRecord(item.message) ? item.message : item) as RawMessage);
    for (const raw of raws) if (raw.id && raw.create_time) entry.times.set(raw.id, raw.create_time * SECONDS_TO_MS);
    const chain = raws.map(toChainMessage).filter(message => message != null);
    const ids = new Set(chain.map(message => message.id));
    entry.chain = [...entry.chain.filter(message => !ids.has(message.id)), ...chain];
    return entry;
}

export function parseConversation(id: string, json: unknown): ConversationData | null {
    if (!isRecord(json) || !(isRecord(json.mapping) || Array.isArray(json.messages))) return null;
    const entry = conversationEntry(id);
    if (typeof json.title === "string" && json.title) entry.title = json.title;
    if (Array.isArray(json.messages)) return parseWindow(entry, json.messages);
    const mapping = json.mapping as Record<string, { message?: RawMessage; parent?: string | null; }>;
    for (const node of Object.values(mapping)) {
        const time = node.message?.create_time;
        if (node.message?.id && time) entry.times.set(node.message.id, time * SECONDS_TO_MS);
    }
    const chain: ChainMessage[] = [];
    const seen = new Set<string>();
    let cursor = typeof json.current_node === "string" ? json.current_node : null;
    while (cursor && !seen.has(cursor) && mapping[cursor]) {
        seen.add(cursor);
        const raw = mapping[cursor].message;
        const message = raw ? toChainMessage(raw) : null;
        if (message) chain.push(message);
        cursor = mapping[cursor].parent ?? null;
    }
    if (chain.length) entry.chain = chain.toReversed();
    return entry;
}

function urlOf(input: RequestInfo | URL) {
    try {
        return new URL(input instanceof Request ? input.url : String(input), location.origin);
    } catch {
        return null;
    }
}

function requestedConversationId(init: RequestInit | undefined) {
    if (typeof init?.body !== "string") return null;
    const body = parseJson(init.body);
    return isRecord(body) && typeof body.conversation_id === "string" ? body.conversation_id : null;
}

interface StreamState {
    conversationId: string | null;
    error: boolean;
    handoff: boolean;
}

function handleEvent(data: unknown, state: StreamState) {
    if (!isRecord(data)) return;
    if (typeof data.type === "string" && HANDOFF_EVENTS.has(data.type)) state.handoff = true;
    const payload = isRecord(data.v) && (data.v.message || data.v.conversation_id) ? data.v : data;
    if (typeof payload.conversation_id === "string") state.conversationId = payload.conversation_id;
    if (data.error || payload.error || data.type === "error") state.error = true;
    if (data.type === "title_generation" && typeof data.title === "string" && typeof data.conversation_id === "string") {
        conversationEntry(data.conversation_id).title = data.title;
        network.emit("conversation", conversationEntry(data.conversation_id));
    }
    const message = payload.message as RawMessage | undefined;
    if (message?.id && message.create_time && isChatRole(message.author?.role)) {
        const time = message.create_time * SECONDS_TO_MS;
        if (state.conversationId) conversationEntry(state.conversationId).times.set(message.id, time);
        network.emit("message-time", { conversationId: state.conversationId, messageId: message.id, time });
    }
}

async function readStream(response: Response, state: StreamState) {
    const reader = response.body?.getReader();
    if (!reader) return;
    const decoder = new TextDecoder();
    let buffer = "";
    for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
            if (!line.startsWith("data:")) continue;
            const text = line.slice(5).trim();
            if (text && text !== "[DONE]") handleEvent(parseJson(text), state);
        }
    }
}

async function observeGenerate(requestId: number, conversationId: string | null, pending: Promise<Response>) {
    const state: StreamState = { conversationId, error: false, handoff: false };
    activeStreams.set(requestId, conversationId);
    network.emit("generate-start", { requestId, conversationId });
    try {
        const response = await pending;
        if (!response.ok) state.error = true;
        else if (response.headers.get("content-type")?.includes("event-stream")) await readStream(response.clone(), state);
    } catch (e) {
        const aborted = e instanceof DOMException && e.name === "AbortError";
        state.handoff ||= aborted;
        state.error ||= !aborted;
    } finally {
        activeStreams.delete(requestId);
        network.emit("generate-end", { requestId, ...state });
    }
}

async function observeConversation(id: string, pending: Promise<Response>) {
    try {
        const response = await pending;
        if (!response.ok) return;
        const data = parseConversation(id, await response.clone().json());
        if (data) network.emit("conversation", data);
    } catch (e) {
        logger.debug("Conversation read skipped", e);
    }
}

function observe(input: RequestInfo | URL, init: RequestInit | undefined, pending: Promise<Response>) {
    const url = urlOf(input);
    if (!url || url.origin !== location.origin) return;
    const method = (init?.method ?? (input instanceof Request ? input.method : "GET")).toUpperCase();
    if (method === "POST" && GENERATE_PATH.test(url.pathname)) {
        void observeGenerate(nextRequestId++, requestedConversationId(init), pending);
        return;
    }
    const id = method === "GET" && url.pathname.match(CONVERSATION_PATH)?.[1];
    if (id) void observeConversation(id, pending);
}

let installed = false;

export function installNetworkTap() {
    if (installed) return;
    installed = true;
    const original = pageWindow.fetch;
    const tapped = function (this: unknown, input: RequestInfo | URL, init?: RequestInit) {
        const pending = original.call(this ?? pageWindow, input, init);
        try {
            observe(input, init, pending);
        } catch (e) {
            logger.error("Fetch tap failed", e);
        }
        return pending;
    };
    pageWindow.fetch = (typeof exportFunction === "function" ? exportFunction(tapped, pageWindow) : tapped) as typeof fetch;
}
