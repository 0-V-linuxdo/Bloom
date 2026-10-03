/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { isComposerInput, readDraft, stopButton, submitComposer, writeDraft } from "@host/composer";
import { generation, generationState } from "@host/generation";
import { applyModel, type ComposerModel, readModel, sameModel } from "@host/model";
import { currentConversationId } from "@host/route";
import { Sel } from "@host/selectors";
import { nextFrame } from "@utils/dom";
import { Logger } from "@utils/Logger";
import { isRecord, parseJson } from "@utils/misc";
import definePlugin, { OptionType } from "@utils/types";

import styles from "./styles.css";
import { removeTray, renderTray, type TrayActions } from "./tray";

const logger = new Logger("PromptQueue");

const MAX_QUEUE = 8;
const SEND_RETRY_MS = 150;
const SEND_ATTEMPTS = 20;
const STORAGE_KEY = "BloomPromptQueue";

const settings = definePluginSettings({
    replacePending: { type: OptionType.BOOLEAN, description: "Enter replaces the last queued message instead of adding another.", default: false },
    showQueueMode: { type: OptionType.BOOLEAN, description: "Show the model that was selected when each message was queued.", default: true },
    stickyOnNavigate: { type: OptionType.BOOLEAN, description: "Keep the selected model when switching chats.", default: true },
    persistAcrossRefresh: { type: OptionType.BOOLEAN, description: "Restore unsent queued messages in this tab after a refresh.", default: true },
});

export interface QueueItem {
    text: string;
    model: string;
    label: string;
}

const queues = new Map<string, QueueItem[]>();
let armed = false;
let urgent: QueueItem | null = null;
let controller: AbortController | undefined;
let unsubscribers: (() => void)[] = [];
let pinned: ComposerModel | null = null;
let applying = false;
let stickTimer: ReturnType<typeof setTimeout> | undefined;

const DRAFT = "draft";

const queueKey = () => currentConversationId() ?? DRAFT;
const queue = () => queues.get(queueKey()) ?? [];

const itemModel = (item: QueueItem): ComposerModel => ({ id: item.model || item.label, label: item.label || item.model });

function parseItem(raw: unknown): QueueItem | null {
    if (typeof raw === "string") return raw.trim() ? { text: raw, model: "", label: "" } : null;
    if (!isRecord(raw) || typeof raw.text !== "string" || !raw.text.trim()) return null;
    return {
        text: raw.text,
        model: typeof raw.model === "string" ? raw.model : "",
        label: typeof raw.label === "string" ? raw.label : "",
    };
}

function restoreQueues() {
    if (!settings.store.persistAcrossRefresh) {
        sessionStorage.removeItem(STORAGE_KEY);
        return;
    }
    const saved = parseJson(sessionStorage.getItem(STORAGE_KEY) ?? "");
    if (!isRecord(saved)) return;
    for (const [id, items] of Object.entries(saved)) {
        if (!Array.isArray(items)) continue;
        const parsed = items.map(parseItem).filter(item => item != null);
        if (parsed.length) queues.set(id, parsed);
    }
}

function saveQueues() {
    try {
        if (!settings.store.persistAcrossRefresh) {
            sessionStorage.removeItem(STORAGE_KEY);
            return;
        }
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(Object.fromEntries([...queues].filter(([id]) => id !== DRAFT))));
    } catch (e) {
        logger.warn("Could not save the queue", e);
    }
}

function setQueue(items: QueueItem[]) {
    if (items.length) queues.set(queueKey(), items);
    else queues.delete(queueKey());
    saveQueues();
    renderTray(queue(), actions, settings.store.showQueueMode);
}

function modelReady(item: QueueItem) {
    if (!item.model && !item.label) return true;
    const current = readModel();
    if (!current) return true;
    return sameModel(current, itemModel(item));
}

function submit(text: string, attempt = 0) {
    if (attempt >= SEND_ATTEMPTS || generationState().generating || readDraft() !== text) return;
    submitComposer();
    setTimeout(() => submit(text, attempt + 1), SEND_RETRY_MS);
}

function restorePicker(previous: ComposerModel | null, item: QueueItem) {
    const target = settings.store.stickyOnNavigate && pinned ? pinned : previous;
    if (!target || (!item.model && !item.label) || sameModel(target, itemModel(item))) {
        applying = false;
        return;
    }
    applying = true;
    setTimeout(() => {
        applyModel(target);
        applying = false;
    }, SEND_RETRY_MS);
}

function send(item: QueueItem, attempt = 0) {
    if (generationState().generating || readDraft()) {
        if (attempt < SEND_ATTEMPTS) setTimeout(() => send(item, attempt + 1), SEND_RETRY_MS);
        return;
    }
    if (!modelReady(item)) {
        if (attempt < SEND_ATTEMPTS) {
            applying = true;
            applyModel(itemModel(item));
            setTimeout(() => send(item, attempt + 1), SEND_RETRY_MS);
            return;
        }
    }
    const previous = readModel();
    writeDraft(item.text);
    nextFrame(() => submit(item.text));
    restorePicker(previous, item);
}

function dispatchNext() {
    if (urgent != null) {
        const item = urgent;
        urgent = null;
        send(item);
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
    const item = items[index];
    if (item == null) return;
    setQueue(items.filter((_, i) => i !== index));
    if (!generationState().generating) {
        send(item);
        return;
    }
    urgent = item;
    stopButton()?.click();
}

const actions: TrayActions = {
    remove: index => setQueue(queue().filter((_, i) => i !== index)),
    edit: (index, text) => setQueue(text.trim() ? queue().map((item, i) => i === index ? { ...item, text } : item) : queue().filter((_, i) => i !== index)),
    sendNow,
    move(from, to) {
        const items = [...queue()];
        const [moved] = items.splice(from, 1);
        if (!moved) return;
        items.splice(to, 0, moved);
        setQueue(items);
    },
};

function enqueue(text: string) {
    const current = readModel();
    const item: QueueItem = { text, model: current?.id ?? "", label: current?.label ?? "" };
    const items = queue();
    if (settings.store.replacePending && items.length) {
        setQueue([...items.slice(0, -1), item]);
        return true;
    }
    if (items.length >= MAX_QUEUE) return false;
    setQueue([...items, item]);
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
        const current = readModel();
        writeDraft("");
        urgent = { text: draft, model: current?.id ?? "", label: current?.label ?? "" };
        stopButton()?.click();
        return;
    }
    if (!draft) {
        if (queue().length) sendNow(0);
        return;
    }
    if (enqueue(draft)) writeDraft("");
}

function noteModel() {
    if (applying || !settings.store.stickyOnNavigate) return;
    const model = readModel();
    if (model) pinned = model;
}

function stick() {
    if (!settings.store.stickyOnNavigate || !pinned) return;
    applying = true;
    let attempt = 0;
    const step = () => {
        if (!pinned || applyModel(pinned) || attempt >= SEND_ATTEMPTS) {
            applying = false;
            return;
        }
        attempt++;
        stickTimer = setTimeout(step, SEND_RETRY_MS);
    };
    clearTimeout(stickTimer);
    step();
}

function onPointerUp(event: PointerEvent) {
    const { target } = event;
    if (!(target instanceof Element) || applying) return;
    if (!target.closest(`${Sel.modelTrigger}, ${Sel.modelItem}`)) return;
    setTimeout(noteModel, 0);
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
        restoreQueues();
        pinned = readModel();
        document.addEventListener("keydown", onKeydown, { capture: true, signal: controller.signal });
        document.addEventListener("pointerup", onPointerUp, { signal: controller.signal });
        unsubscribers = [
            generation.on("fall", ({ outcome }) => {
                armed = outcome === "done";
                if (outcome === "left") urgent = null;
                dispatchNext();
            }),
            generation.on("context", ({ prevId, id, migrated }) => {
                const draft = queues.get(DRAFT);
                queues.delete(DRAFT);
                if (migrated && !prevId && id && draft) queues.set(id, draft);
                if (!migrated) {
                    armed = false;
                    stick();
                }
                saveQueues();
                renderTray(queue(), actions, settings.store.showQueueMode);
            }),
            generation.on("tick", () => {
                dispatchNext();
                renderTray(queue(), actions, settings.store.showQueueMode);
            }),
        ];
        renderTray(queue(), actions, settings.store.showQueueMode);
    },
    stop() {
        controller?.abort();
        clearTimeout(stickTimer);
        for (const unsubscribe of unsubscribers) unsubscribe();
        removeTray();
        queues.clear();
        urgent = null;
        pinned = null;
        applying = false;
    },
    onSettingsChange(key) {
        if (key === "persistAcrossRefresh") saveQueues();
        if (key === "stickyOnNavigate" && settings.store.stickyOnNavigate) pinned = readModel();
        renderTray(queue(), actions, settings.store.showQueueMode);
    },
});
