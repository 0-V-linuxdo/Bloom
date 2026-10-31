/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { every, isVisible } from "@utils/dom";
import { createEmitter } from "@utils/events";
import { Logger } from "@utils/Logger";
import { isRecord, normalizeText } from "@utils/misc";

import { protocol, type ProtocolNote } from "./protocol";
import { currentConversationId } from "./route";
import { Sel } from "./selectors";
import { sidebarTitle } from "./sidebar";
import { searchUnitRole, unitMessageIds } from "./thread";

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
const grownAt = new Map<string, number>();
const grownLen = new Map<string, number>();
const sourceLen = new Map<string, number>();
const firstAt = new Map<string, number>();
const pendingUnlabeled = new Map<string, Set<string>>();
const fiberSeen = new Set<string>();
const frozen = new Set<string>();
export const HARVEST_SETTLE_MS = 800;
export const HARVEST_GRACE_MS = 6000;
const HARVEST_TICK_MS = 200;
const TURN_DEPTH = 25;
let stopHarvestTick: (() => void) | undefined;

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

export function conversationKey(id: string) {
    return conversationKeys(id)[0] ?? id;
}

export function harvestSettled(id: string | null) {
    if (!id) return false;
    const key = conversationKey(id);
    if (!fiberSeen.has(key)) return false;
    const started = firstAt.get(key);
    if (started == null || Date.now() - started < HARVEST_GRACE_MS) return false;
    if (frozen.has(key)) return true;
    const grown = grownAt.get(key);
    if (grown == null || Date.now() - grown < HARVEST_SETTLE_MS) return false;
    frozen.add(key);
    return true;
}

function watchHarvest() {
    if (stopHarvestTick) return;
    stopHarvestTick = every(() => {
        const id = currentConversationId();
        if (!id) return;
        const key = conversationKey(id);
        if (frozen.has(key) && Date.now() - (firstAt.get(key) ?? 0) >= HARVEST_GRACE_MS) return;
        harvestFiber(id);
    }, HARVEST_TICK_MS);
}

function pendingOf(key: string) {
    let pending = pendingUnlabeled.get(key);
    if (!pending) {
        pending = new Set();
        pendingUnlabeled.set(key, pending);
    }
    return pending;
}

function noteFiber(entry: ConversationData, harvested: number) {
    const key = conversationKey(entry.id);
    fiberSeen.add(key);
    if (!firstAt.has(key)) firstAt.set(key, Date.now());
    const { length } = entry.chain;
    if (length > (grownLen.get(key) ?? 0)) {
        grownLen.set(key, length);
        grownAt.set(key, Date.now());
        frozen.delete(key);
    }
    if (harvested > (sourceLen.get(key) ?? 0)) {
        sourceLen.set(key, harvested);
        if (!frozen.has(key)) grownAt.set(key, Date.now());
    }
    if (!grownAt.has(key)) grownAt.set(key, Date.now());
}

export function conversationData(id: string | null): ConversationData | null {
    if (!id) return null;
    watchHarvest();
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
    return?: FiberNode | null;
    memoizedProps?: unknown;
    pendingProps?: unknown;
}

function reactFiber(el: Element): FiberNode | null {
    const key = Object.keys(el).find(name => name.startsWith("__reactFiber$") || name.startsWith("__reactInternalInstance$"));
    return key ? (el as unknown as Record<string, FiberNode>)[key] ?? null : null;
}

function turnOf(el: Element) {
    for (let fiber: FiberNode | null | undefined = reactFiber(el), depth = 0; fiber && depth < TURN_DEPTH; fiber = fiber.return, depth++) {
        const turn = isRecord(fiber.memoizedProps) ? fiber.memoizedProps.turn : null;
        if (isRecord(turn) && typeof turn.turnStartedAtMs === "number") return turn;
    }
    return null;
}

function harvestTimes(entry: ConversationData, host: Element) {
    for (const el of host.querySelectorAll(Sel.turn)) {
        const turnId = el.getAttribute("data-turn-key")?.replace(/^.*turn:/, "");
        const turn = turnId ? turnOf(el) : null;
        if (!turn || turn.turnId !== turnId) continue;
        const asked = turn.turnStartedAtMs as number;
        const replied = typeof turn.finalAssistantStartedAtMs === "number" ? turn.finalAssistantStartedAtMs : asked;
        entry.times.set(`turn:${turnId}`, asked);
        entry.times.set(`${turnId}:assistant`, replied);
        for (const unit of el.querySelectorAll(Sel.searchUnit)) {
            for (const messageId of unitMessageIds(unit)) entry.times.set(messageId, searchUnitRole(unit) === "user" ? asked : replied);
        }
        for (const reply of el.querySelectorAll("[data-response-annotation-target]")) entry.times.set(reply.getAttribute("data-response-annotation-target") as string, replied);
    }
}

function collectFiberTurns(root: FiberNode | null, depth: number, items: Record<string, unknown>[], entries: Record<string, unknown>[]) {
    if (!root || depth > 24) return;
    const props = (isRecord(root.memoizedProps) ? root.memoizedProps : null) ?? (isRecord(root.pendingProps) ? root.pendingProps : null);
    if (props) {
        if (Array.isArray(props.items) && isRecord(props.items[0]) && typeof props.items[0].turnKey === "string") {
            const next = props.items.filter(isRecord);
            if (next.length > items.length) {
                items.length = 0;
                items.push(...next);
            }
        }
        if (Array.isArray(props.entries) && isRecord(props.entries[0]) && typeof (props.entries[0].historyEntityKey ?? props.entries[0].turnId) === "string") {
            const next = props.entries.filter(isRecord);
            if (next.length > entries.length) {
                entries.length = 0;
                entries.push(...next);
            }
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

function sameConversation(id: string, other: string) {
    return conversationKeys(id).some(key => conversationKeys(other).includes(key));
}

function aliases(id: string) {
    const bare = id.replace(/^history-content:/, "").replace(/^turn:/, "").replace(/:assistant$/, "");
    if (!bare) return [];
    return [...new Set([id, bare, `turn:${bare}`, `${bare}:assistant`, `local:${bare}`])];
}

function paneTurnIds(host: Element) {
    const ids = new Set<string>();
    for (const el of host.querySelectorAll("[data-turn-key], [data-response-annotation-target], [data-chatgpt-search-message-ids]")) {
        for (const value of [
            el.getAttribute("data-turn-key"),
            el.getAttribute("data-response-annotation-target"),
            ...(el.getAttribute("data-chatgpt-search-message-ids") ?? "").split(/\s+/),
        ]) {
            if (value) for (const alias of aliases(value)) ids.add(alias);
        }
    }
    return ids;
}

function chainIds(entry: ConversationData) {
    const ids = new Set<string>();
    for (const item of entry.chain) for (const alias of aliases(item.id)) ids.add(alias);
    return ids;
}

function paneIdOf(host: Element) {
    return host.getAttribute("data-response-annotation-conversation")
        ?? host.querySelector("[data-response-annotation-conversation]")?.getAttribute("data-response-annotation-conversation")
        ?? null;
}

function harvestHosts() {
    return [...document.querySelectorAll(`${Sel.conversationTarget}, ${Sel.timelineScroll}`)].filter(isVisible);
}

const pickSource = (items: Record<string, unknown>[], entries: Record<string, unknown>[]) =>
    entries.length > items.length ? entries : items;

function harvestFiber(id: string) {
    const hosts = harvestHosts();
    if (!hosts.length) return;
    let host: Element | undefined;
    let items: Record<string, unknown>[] = [];
    let entries: Record<string, unknown>[] = [];
    for (const node of hosts) {
        const paneId = paneIdOf(node);
        if (paneId && !sameConversation(id, paneId)) continue;
        const nextItems: Record<string, unknown>[] = [];
        const nextEntries: Record<string, unknown>[] = [];
        try {
            collectFiberTurns(reactFiber(node), 0, nextItems, nextEntries);
        } catch (e) {
            logger.warn("Fiber walk failed", e);
            continue;
        }
        const next = pickSource(nextItems, nextEntries);
        const fiberId = typeof next[0]?.conversationId === "string" ? next[0].conversationId : "";
        if (fiberId && !sameConversation(id, fiberId)) continue;
        const current = pickSource(items, entries);
        if (next.length > current.length) {
            host = node;
            items = nextItems;
            entries = nextEntries;
        }
    }
    if (!host) return;
    const source = pickSource(items, entries);
    if (!source.length) return;
    const fiberId = typeof source[0]?.conversationId === "string" ? source[0].conversationId : "";
    const entry = conversationEntry(id);
    entry.title = sidebarTitle(id) ?? sidebarTitle(fiberId || id) ?? entry.title;
    harvestTimes(entry, host);
    const key = conversationKey(id);
    if (!firstAt.has(key)) firstAt.set(key, Date.now());
    const labeled = source.filter(row => callText(row.getLabel) || previewText(row.getPreview)).length;
    const settled = harvestSettled(id);
    if (!settled && labeled > (sourceLen.get(key) ?? 0)) grownAt.delete(key);
    const visibleIds = paneTurnIds(host);
    const known = chainIds(entry);
    const pending = pendingOf(key);
    const grace = Date.now() - (firstAt.get(key) ?? 0) < HARVEST_GRACE_MS;
    for (const row of source) {
        let turnId = "";
        if (typeof row.turnId === "string") turnId = row.turnId;
        else if (typeof row.turnKey === "string") turnId = row.turnKey.replace(/^.*turn:/, "");
        const userId = typeof row.historyEntityKey === "string" ? row.historyEntityKey : (turnId ? `turn:${turnId}` : "");
        const item = itemFor(items, row);
        const userText = callText(item?.getLabel ?? row.getLabel);
        const assistantText = previewText(item?.getPreview ?? row.getPreview);
        if (turnId && !userText && !assistantText) pending.add(turnId);
        const seen = [userId, turnId].some(value => aliases(value).some(alias => known.has(alias) || visibleIds.has(alias)));
        if (settled && !seen && !(grace && turnId && pending.has(turnId))) continue;
        const time = typeof row.timestampSeparatorAtMs === "number" ? row.timestampSeparatorAtMs : null;
        if (userId && userText) {
            mergeMessage(entry, messageOf(userId, "user", userText, time));
            if (time) entry.times.set(userId, time);
        }
        if (turnId && assistantText) mergeMessage(entry, messageOf(`${turnId}:assistant`, "assistant", assistantText, time));
        if (turnId && (userText || assistantText)) pending.delete(turnId);
    }
    noteFiber(entry, labeled);
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
