/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Pure conversation URL + mapping/window chain helpers. No fetch wrap.
 * Recents list GET is not a detail GET. Windowed
 * `/conversations/{id}?num_turns=` is a detail GET.
 * The chain is visible bubbles only: one user or assistant tick per
 * ChatGPT section. Tools, thoughts, and hidden system rows stay inside
 * the assistant turn.
 */

export type ChainTurn = {
    id: string;
    /** Mapping node id when it differs from the message id. */
    alias?: string;
    role: "user" | "assistant";
    text: string;
};

const CHAIN_MAX = 480;
const CHAIN_TEXT = 80;
const DETAIL_ID_RE = /\/backend-api\/(?:f\/)?conversations?\/([a-zA-Z0-9_-]{8,})/i;
const WINDOW_QS_RE = /[?&](?:num_turns|limit|before|after|before_node|after_node|cursor)=/i;

/** Recents list only. `/conversations/{id}` is a detail GET, not this. */
export function isConversationList(url: string): boolean {
    return /\/backend-api\/(?:f\/)?conversations\/?(?:[?#]|$)/i.test(url);
}

export function isConversationGet(url: string, method: string): boolean {
    if (method !== "GET") return false;
    if (isConversationList(url)) return false;
    return DETAIL_ID_RE.test(url);
}

export function isWindowedConversationGet(url: string): boolean {
    return DETAIL_ID_RE.test(url) && WINDOW_QS_RE.test(url);
}

export function idFromApiUrl(url: string): string {
    return url.match(DETAIL_ID_RE)?.[1] ?? "";
}

function toMs(value: unknown): number | null {
    if (typeof value === "number" && Number.isFinite(value) && value > 0) {
        return value > 1e12 ? value : Math.round(value * 1000);
    }
    if (typeof value === "string") {
        const raw = value.trim();
        if (!raw) return null;
        if (/^\d+(\.\d+)?$/.test(raw)) return toMs(Number(raw));
        const parsed = Date.parse(raw);
        return Number.isFinite(parsed) ? parsed : null;
    }
    return null;
}

function asRecord(value: unknown): Record<string, unknown> | null {
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    return value as Record<string, unknown>;
}

function clipChainText(raw: string): string {
    const t = raw.replace(/\s+/g, " ").trim();
    if (!t) return "";
    return t.length > CHAIN_TEXT ? `${t.slice(0, CHAIN_TEXT - 1)}…` : t;
}

function messageText(msg: Record<string, unknown>): string {
    const content = msg.content;
    if (!content || typeof content !== "object" || Array.isArray(content)) return "";
    const c = content as Record<string, unknown>;
    const parts = Array.isArray(c.parts) ? c.parts : [];
    const bits: string[] = [];
    let image = false;
    let file = false;
    for (const part of parts) {
        if (typeof part === "string") {
            if (part.trim()) bits.push(part);
            continue;
        }
        if (!part || typeof part !== "object") continue;
        const p = part as Record<string, unknown>;
        const kind = typeof p.content_type === "string" ? p.content_type : "";
        if (/image/i.test(kind)) image = true;
        else if (/file|document|attachment/i.test(kind)) file = true;
        else if (typeof p.text === "string" && p.text.trim()) bits.push(p.text);
    }
    const joined = clipChainText(bits.join(" "));
    if (joined) return joined;
    const kind = typeof c.content_type === "string" ? c.content_type : "";
    if (image || /image/i.test(kind)) return "Image";
    if (file) return "File";
    if (typeof c.text === "string") return clipChainText(c.text);
    return "";
}

function messageRole(msg: Record<string, unknown>): "user" | "assistant" | "" {
    const meta = asRecord(msg.metadata);
    if (meta?.is_visually_hidden_from_conversation === true) return "";
    if (meta?.is_user_system_message === true || meta?.user_context_message === true) return "";
    const author = asRecord(msg.author);
    const role = author?.role ?? msg.role;
    return role === "user" || role === "assistant" ? role : "";
}

/**
 * One outline row per ChatGPT bubble. Tool calls, thoughts, and hidden
 * system rows stay inside the assistant turn — they are not their own tick.
 */
function isUserAuthor(msg: Record<string, unknown>): boolean {
    const author = asRecord(msg.author);
    const role = author?.role ?? msg.role;
    return role === "user";
}

function isVisibleConversationMessage(msg: Record<string, unknown>): boolean {
    const role = messageRole(msg);
    if (!role) return false;
    const recipient = typeof msg.recipient === "string" ? msg.recipient.toLowerCase() : "";
    if (recipient && recipient !== "all") return false;
    const content = asRecord(msg.content);
    const kind = (typeof content?.content_type === "string" ? content.content_type : "").toLowerCase();
    if (/thought|reasoning|execution_output|system_error|tether_|computer_|sonic_/.test(kind)) return false;
    if (kind === "code") return false;
    const channel = typeof msg.channel === "string" ? msg.channel.toLowerCase() : "";
    if (channel && channel !== "final" && msg.end_turn !== true) return false;
    return true;
}

function collapseVisibleTurns(turns: ChainTurn[]): ChainTurn[] {
    const out: ChainTurn[] = [];
    for (const turn of turns) {
        const prev = out[out.length - 1];
        if (prev && prev.role === "assistant" && turn.role === "assistant") {
            const alias = turn.alias || prev.alias || (prev.id !== turn.id ? prev.id : undefined);
            out[out.length - 1] = {
                id: turn.id,
                role: "assistant",
                text: turn.text || prev.text,
                ...(alias && alias !== turn.id ? { alias } : {}),
            };
            continue;
        }
        out.push(turn);
    }
    return out;
}

function leafIdOf(root: Record<string, unknown>, nodes: Record<string, unknown>): string {
    for (const key of ["current_node", "current_node_id", "currentNode"]) {
        const v = root[key];
        if (typeof v === "string" && nodes[v]) return v;
    }
    let best = "";
    let bestMs = -1;
    for (const [id, node] of Object.entries(nodes)) {
        if (!node || typeof node !== "object" || Array.isArray(node)) continue;
        const rec = node as Record<string, unknown>;
        const children = Array.isArray(rec.children) ? rec.children : [];
        if (children.length) continue;
        const msg = rec.message;
        const ms = msg && typeof msg === "object" && !Array.isArray(msg)
            ? toMs((msg as Record<string, unknown>).create_time ?? (msg as Record<string, unknown>).createTime) ?? 0
            : 0;
        if (!best || ms >= bestMs) {
            best = id;
            bestMs = ms;
        }
    }
    return best;
}

function pathFromLeaf(nodes: Record<string, unknown>, leaf: string): ChainTurn[] {
    const out: ChainTurn[] = [];
    const seen = new Set<string>();
    let id: string | null = leaf;
    let guard = 0;
    while (id && nodes[id] && guard++ < 800) {
        if (seen.has(id)) break;
        seen.add(id);
        const node = nodes[id];
        if (!node || typeof node !== "object" || Array.isArray(node)) break;
        const rec = node as Record<string, unknown>;
        const msg = rec.message && typeof rec.message === "object" && !Array.isArray(rec.message)
            ? rec.message as Record<string, unknown>
            : null;
        if (msg && isVisibleConversationMessage(msg)) {
            const role = messageRole(msg);
            const mid = typeof msg.id === "string" && msg.id ? msg.id : id;
            if (role) {
                const turn: ChainTurn = { id: mid, role, text: messageText(msg) };
                if (mid !== id) turn.alias = id;
                out.push(turn);
            }
        } else if (msg && isUserAuthor(msg)) {
            // Hidden / system user rows stay off the outline, but they
            // still split assistant bubbles so two replies do not merge.
            out.push({ id: "", role: "user", text: "" });
        }
        id = typeof rec.parent === "string" ? rec.parent : null;
    }
    out.reverse();
    return collapseVisibleTurns(out).filter(t => t.id);
}

function capTail(turns: ChainTurn[]): ChainTurn[] {
    if (turns.length <= CHAIN_MAX) return turns;
    return turns.slice(turns.length - CHAIN_MAX);
}

export function mergeConversationChain(prev: ChainTurn[], next: ChainTurn[]): ChainTurn[] {
    if (!next.length) return prev;
    if (!prev.length) return capTail(next);
    const prevIdx = new Map(prev.map((t, i) => [t.id, i]));
    let a = -1;
    let b = -1;
    for (let j = 0; j < next.length; j++) {
        const i = prevIdx.get(next[j].id);
        if (i === undefined) continue;
        a = i;
        b = j;
        break;
    }
    if (a < 0) {
        if (next.length < 3 && prev.length > next.length) return prev;
        const seen = new Set(prev.map(t => t.id));
        const lastInPrev = prevIdx.has(next[next.length - 1].id);
        const head = next.filter(t => !seen.has(t.id));
        return capTail(lastInPrev ? [...head, ...prev] : [...prev, ...head]);
    }
    let len = 0;
    while (a + len < prev.length && b + len < next.length && prev[a + len].id === next[b + len].id) len++;
    const headIds = new Set(prev.slice(0, a).map(t => t.id));
    const head = [...prev.slice(0, a)];
    for (const t of next.slice(0, b)) {
        if (!headIds.has(t.id)) {
            head.push(t);
            headIds.add(t.id);
        }
    }
    const overlap = next.slice(b, b + len).map((t, k) => (t.text ? t : prev[a + k]));
    const seen = new Set([...head, ...overlap].map(t => t.id));
    const tailNext = next.slice(b + len).filter(t => !seen.has(t.id));
    for (const t of tailNext) seen.add(t.id);
    const tailPrev = prev.slice(a + len).filter(t => !seen.has(t.id));
    return capTail([...head, ...overlap, ...tailNext, ...tailPrev]);
}

function chainFromTurns(turns: unknown[]): ChainTurn[] {
    const out: ChainTurn[] = [];
    const seen = new Set<string>();
    for (const item of turns) {
        const rec = asRecord(item);
        if (!rec) continue;
        const msg = asRecord(rec.message) ?? rec;
        if (!isVisibleConversationMessage(msg)) continue;
        const role = messageRole(msg) || messageRole(rec);
        if (!role) continue;
        const mid = (typeof msg.id === "string" && msg.id)
            || (typeof rec.message_id === "string" && rec.message_id)
            || (typeof rec.id === "string" && rec.id)
            || "";
        if (!mid || seen.has(mid)) continue;
        seen.add(mid);
        const turn: ChainTurn = { id: mid, role, text: messageText(msg) || messageText(rec) };
        const alias = typeof rec.id === "string" && rec.id && rec.id !== mid ? rec.id : "";
        if (alias) turn.alias = alias;
        out.push(turn);
    }
    return collapseVisibleTurns(out);
}

function chainFromMapping(root: Record<string, unknown>): ChainTurn[] {
    const mapping = root.mapping;
    if (!mapping || typeof mapping !== "object" || Array.isArray(mapping)) return [];
    const nodes = mapping as Record<string, unknown>;
    if (!Object.keys(nodes).length) return [];
    const leaf = leafIdOf(root, nodes);
    if (!leaf) return [];
    return pathFromLeaf(nodes, leaf);
}

/** Active-branch turns from a conversation GET body (`mapping` or `turns`). */
export function chainFromPayload(data: unknown): ChainTurn[] {
    const root = asRecord(data);
    if (!root) return [];
    const inner = !root.mapping && asRecord(root.conversation) ? root.conversation as Record<string, unknown> : root;
    const fromMap = chainFromMapping(inner);
    if (fromMap.length) return fromMap;
    const listed = Array.isArray(inner.turns) ? inner.turns
        : Array.isArray(inner.messages) ? inner.messages
        : Array.isArray(inner.items) ? inner.items
        : [];
    return listed.length ? chainFromTurns(listed) : [];
}

export function conversationIdFromPayload(data: unknown, fallback = ""): string {
    const root = asRecord(data);
    if (!root) return fallback;
    const inner = !root.mapping && asRecord(root.conversation) ? root.conversation as Record<string, unknown> : root;
    return (typeof inner.conversation_id === "string" && inner.conversation_id)
        || (typeof inner.conversationId === "string" && inner.conversationId)
        || (typeof root.conversation_id === "string" && root.conversation_id)
        || (typeof root.conversationId === "string" && root.conversationId)
        || fallback;
}

export function sameChain(a: ChainTurn[], b: ChainTurn[]): boolean {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i].id !== b[i].id || a[i].role !== b[i].role || a[i].text !== b[i].text || a[i].alias !== b[i].alias) {
            return false;
        }
    }
    return true;
}
