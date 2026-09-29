/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { icon } from "@components/icons";
import { generation, generationState } from "@host/generation";
import { isHydrated } from "@host/ready";
import { currentConversationId } from "@host/route";
import { conversationLinks } from "@host/sidebar";
import { classNameFactory } from "@utils/css";
import { h, hostMutations, watchBody } from "@utils/dom";
import { isRecord, uniqueId } from "@utils/misc";
import definePlugin from "@utils/types";

import styles from "./styles.css";

const cl = classNameFactory("bloom-cls");

const CHANNEL = "bloom-cls";
const REMOTE_TTL_MS = 10 * 60 * 1000;

type Status = "streaming" | "error";

interface Message {
    tab: string;
    id: string;
    status: Status | null;
}

const tab = uniqueId("tab");
const local = new Map<string, Status>();
const remote = new Map<string, { status: Status; tab: string; at: number; }>();
let channel: BroadcastChannel | null = null;
let unsubscribers: (() => void)[] = [];

const isStatus = (value: unknown): value is Status => value === "streaming" || value === "error";

function statuses() {
    const merged = new Map<string, Status>();
    const now = Date.now();
    for (const [id, entry] of remote) {
        if (now - entry.at > REMOTE_TTL_MS) remote.delete(id);
        else merged.set(id, entry.status);
    }
    for (const [id, status] of local) merged.set(id, status);
    return merged;
}

function marker(status: Status) {
    return h("span", { class: `bloom-root ${cl("", `-${status}`)}`, attrs: { "data-bloom": "cls", "data-status": status, "aria-label": status === "error" ? "Error" : "Generating" } },
        status === "error" && icon("alert"));
}

function render() {
    const wanted = statuses();
    const keep = new Set<Element>();
    for (const [id, status] of wanted) {
        for (const link of conversationLinks(id)) {
            if (!isHydrated(link)) continue;
            const existing = link.querySelector<HTMLElement>(':scope > [data-bloom="cls"]');
            if (existing?.dataset.status === status) {
                keep.add(existing);
                continue;
            }
            existing?.remove();
            const node = marker(status);
            keep.add(node);
            link.append(node);
        }
    }
    for (const node of document.querySelectorAll('[data-bloom="cls"]')) if (!keep.has(node)) node.remove();
}

function set(id: string | null, status: Status | null) {
    if (!id) return;
    if (status) local.set(id, status);
    else local.delete(id);
    channel?.postMessage({ tab, id, status } satisfies Message);
    render();
}

function onMessage({ data }: MessageEvent) {
    if (!isRecord(data) || typeof data.id !== "string" || typeof data.tab !== "string" || data.tab === tab) return;
    if (isStatus(data.status)) remote.set(data.id, { status: data.status, tab: data.tab, at: Date.now() });
    else remote.delete(data.id);
    render();
}

function clearTab() {
    for (const id of local.keys()) channel?.postMessage({ tab, id, status: null } satisfies Message);
}

export default definePlugin({
    name: "ChatListStatus",
    description: "Show a spinner or an error mark on the open conversation in the sidebar.",
    authors: ["Bloom contributors"],
    tags: ["chat", "ui"],
    icon: "list",
    styles,
    start() {
        channel = typeof BroadcastChannel === "function" ? new BroadcastChannel(CHANNEL) : null;
        channel?.addEventListener("message", onMessage);
        addEventListener("pagehide", clearTab);
        unsubscribers = [
            generation.on("rise", ({ conversationId }) => set(conversationId, "streaming")),
            generation.on("fall", ({ conversationId, outcome }) => set(conversationId, outcome === "error" ? "error" : null)),
            generation.on("context", ({ prevId, id, migrated }) => {
                if (migrated && generationState().generating) set(id, "streaming");
                else if (!migrated && local.get(prevId ?? "") === "streaming") set(prevId, null);
            }),
            watchBody(mutations => hostMutations(mutations) && render()),
        ];
        if (currentConversationId()) render();
    },
    stop() {
        for (const unsubscribe of unsubscribers) unsubscribe();
        clearTab();
        channel?.close();
        channel = null;
        removeEventListener("pagehide", clearTab);
        local.clear();
        remote.clear();
        render();
    },
});
