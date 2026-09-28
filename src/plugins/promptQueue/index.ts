/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { isComposerInput, readDraft, stopButton, submitComposer, writeDraft } from "@host/composer";
import { generation, generationState } from "@host/generation";
import { currentConversationId } from "@host/route";
import { nextFrame } from "@utils/dom";
import definePlugin, { OptionType } from "@utils/types";

import styles from "./styles.css";
import { removeTray, renderTray, type TrayActions } from "./tray";

const MAX_QUEUE = 8;
const SEND_RETRY_MS = 150;
const SEND_ATTEMPTS = 20;

const settings = definePluginSettings({
    replacePending: { type: OptionType.BOOLEAN, description: "Enter replaces the last queued message instead of adding another.", default: false },
});

const queues = new Map<string, string[]>();
let armed = false;
let urgent: string | null = null;
let controller: AbortController | undefined;
let unsubscribers: (() => void)[] = [];

const queueKey = () => currentConversationId() ?? `draft:${location.pathname}`;
const queue = () => queues.get(queueKey()) ?? [];

function setQueue(items: string[]) {
    if (items.length) queues.set(queueKey(), items);
    else queues.delete(queueKey());
    renderTray(queue(), actions);
}

function send(text: string, attempt = 0) {
    if (generationState().generating || readDraft()) {
        if (attempt < SEND_ATTEMPTS) setTimeout(() => send(text, attempt + 1), SEND_RETRY_MS);
        return;
    }
    writeDraft(text);
    nextFrame(() => {
        if (!submitComposer()) writeDraft("");
    });
}

function dispatchNext() {
    if (urgent != null) {
        const text = urgent;
        urgent = null;
        send(text);
        return;
    }
    if (!armed || generationState().generating || readDraft()) return;
    const [head, ...rest] = queue();
    if (head == null) return;
    armed = false;
    setQueue(rest);
    send(head);
}

function sendNow(index: number) {
    const items = queue();
    const text = items[index];
    if (text == null) return;
    setQueue(items.filter((_, i) => i !== index));
    if (!generationState().generating) {
        send(text);
        return;
    }
    urgent = text;
    stopButton()?.click();
}

const actions: TrayActions = {
    remove: index => setQueue(queue().filter((_, i) => i !== index)),
    edit: (index, text) => setQueue(text.trim() ? queue().map((item, i) => i === index ? text : item) : queue().filter((_, i) => i !== index)),
    sendNow,
    move(from, to) {
        const items = [...queue()];
        const [moved] = items.splice(from, 1);
        items.splice(to, 0, moved);
        setQueue(items);
    },
};

function enqueue(text: string) {
    const items = queue();
    if (settings.store.replacePending && items.length) {
        setQueue([...items.slice(0, -1), text]);
        return true;
    }
    if (items.length >= MAX_QUEUE) return false;
    setQueue([...items, text]);
    return true;
}

function onKeydown(event: KeyboardEvent) {
    if (event.key !== "Enter" || event.shiftKey || event.isComposing || !isComposerInput(event.target)) return;
    if (!generationState().generating) return;
    const draft = readDraft(event.target);
    event.preventDefault();
    event.stopImmediatePropagation();
    if (event.altKey) {
        if (!draft) return;
        writeDraft("");
        urgent = draft;
        stopButton()?.click();
        return;
    }
    if (!draft) {
        if (queue().length) sendNow(0);
        return;
    }
    if (enqueue(draft)) writeDraft("");
}

export default definePlugin({
    name: "PromptQueue",
    description: "Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",
    authors: ["Bloom contributors"],
    tags: ["chat"],
    icon: "queue",
    settings,
    styles,
    start() {
        controller = new AbortController();
        document.addEventListener("keydown", onKeydown, { capture: true, signal: controller.signal });
        unsubscribers = [
            generation.on("fall", ({ outcome }) => {
                armed = outcome === "done";
                if (outcome === "left") urgent = null;
                dispatchNext();
            }),
            generation.on("context", ({ prevId, id, migrated }) => {
                const draftKey = [...queues.keys()].find(key => key.startsWith("draft:"));
                if (migrated && !prevId && id && draftKey) {
                    queues.set(id, queues.get(draftKey) ?? []);
                    queues.delete(draftKey);
                }
                if (!migrated) armed = false;
                renderTray(queue(), actions);
            }),
            generation.on("tick", () => {
                dispatchNext();
                renderTray(queue(), actions);
            }),
        ];
    },
    stop() {
        controller?.abort();
        for (const unsubscribe of unsubscribers) unsubscribe();
        removeTray();
        queues.clear();
        urgent = null;
    },
});
