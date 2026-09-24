/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Depth-1 next-turn stash. ChatGPT native Enter/Send during generate
 * interrupts the current reply and POSTs immediately — this plugin
 * intercepts that path, queues the draft, and sends after host
 * watchStreamingEdge. Stop stays native and does not drain.
 * No streamEnd, no fetch wrap, no InputHistory / ResponseNotification import.
 */

import { definePluginSettings } from "../../api/Settings";
import {
    COMPOSER_SEL,
    EDITOR_SEL,
    SEND_SEL,
    editorText,
    getActiveEditor,
    getComposerRoot,
    getSubmitButton,
    hasDraftText,
    isDisabledControl,
    isStopControl,
    isUserDraftEmpty,
    setEditorText,
} from "../../host/composer";
import { contextKeyFromUrl, conversationToken } from "../../host/conversation";
import { hasErrorToast, isDraftMigrate, isStreaming, watchStreamingEdge } from "../../host/streaming";
import { Devs } from "../../utils/constants";
import { registerStyle } from "../../utils/css";
import { Logger } from "../../utils/Logger";
import definePlugin, { OptionType, StartAt } from "../../utils/types";
import css from "./styles.css";

const logger = new Logger("PromptQueue");
const CHIP_ID = "bloom-pq-chip";
const STYLE_NAME = "promptQueue";
const CLIP = 80;
const DRAIN_PAUSE_MS = 50;
const BYPASS_MS = 2000;

const settings = definePluginSettings({
    replacePending: {
        type: OptionType.BOOLEAN,
        description: "Replace the queued prompt if you Enter again while one is waiting.",
        default: true,
    },
});

type Slot = { text: string; at: number };
type Leak = { key: string; text: string; turns: number; ticks: number };

const pending = new Map<string, Slot>();

let started = false;
let lastKey = "";
let drainKey = "";
let draining = false;
let bypassIntercept = false;
let leak: Leak | null = null;
let keys: AbortController | null = null;
let unsub: (() => void) | null = null;
let drainTimer: ReturnType<typeof setTimeout> | undefined;
let bypassTimer: ReturnType<typeof setTimeout> | undefined;
let chip: HTMLElement | null = null;

function contextKey(): string {
    return contextKeyFromUrl(conversationToken());
}

function normalize(text: string): string {
    return text.replaceAll("\u200B", "").replace(/\n$/, "").trim();
}

function chatEditor(t: EventTarget | null): HTMLElement | null {
    const el = t instanceof Element ? t : t instanceof Node ? t.parentElement : null;
    const hit = el?.closest?.(EDITOR_SEL);
    if (hit instanceof HTMLElement) return hit;
    return getActiveEditor();
}

function steal(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
}

function userTurnCount(): number {
    try {
        return document.querySelectorAll('[data-message-author-role="user"]').length;
    } catch {
        return 0;
    }
}

function lastUserText(): string {
    try {
        const nodes = document.querySelectorAll('[data-message-author-role="user"]');
        const last = nodes[nodes.length - 1];
        if (!(last instanceof HTMLElement)) return "";
        return normalize(last.innerText || last.textContent || "");
    } catch {
        return "";
    }
}

function migrateIfNeeded(key: string) {
    if (!lastKey || lastKey === key) return;
    const slot = pending.get(lastKey);
    if (!slot || pending.has(key)) return;
    if (!isDraftMigrate(lastKey, key)) return;
    pending.delete(lastKey);
    pending.set(key, slot);
    if (drainKey === lastKey) drainKey = key;
    if (leak?.key === lastKey) leak.key = key;
    logger.debug("migrated pending", lastKey, "→", key);
}

function enqueue(text: string) {
    const key = contextKey();
    const existing = pending.get(key);
    if (existing && settings.store.replacePending === false) return;
    pending.set(key, { text, at: Date.now() });
    leak = { key, text, turns: userTurnCount(), ticks: 3 };
    const editor = getActiveEditor();
    if (editor) setEditorText(editor, "");
    paintChip();
    logger.debug("queued", key, text.length);
}

function dropPending(key: string) {
    pending.delete(key);
    if (drainKey === key) drainKey = "";
    if (leak?.key === key) leak = null;
    paintChip();
}

function armBypass() {
    bypassIntercept = true;
    clearTimeout(bypassTimer);
    bypassTimer = setTimeout(() => {
        bypassIntercept = false;
        bypassTimer = undefined;
    }, BYPASS_MS);
}

function sendNow() {
    const key = contextKey();
    const slot = pending.get(key);
    if (!slot) return;
    const editor = getActiveEditor();
    if (!editor) return;
    pending.delete(key);
    drainKey = "";
    paintChip();
    armBypass();
    setEditorText(editor, slot.text);
    const send = getSubmitButton();
    if (send && !isStopControl(send) && !isDisabledControl(send)) {
        send.click();
        bypassIntercept = false;
    }
}

function tryDrain(key: string) {
    if (!started || draining) return;
    if (isStreaming()) return;
    if (contextKey() !== key) return;
    const slot = pending.get(key);
    if (!slot) {
        drainKey = "";
        return;
    }
    if (hasErrorToast()) return;
    const editor = getActiveEditor();
    if (!editor) return;
    if (!isUserDraftEmpty(editor)) {
        const live = normalize(editorText(editor));
        if (live && live !== slot.text) return;
    }
    const send = getSubmitButton();
    if (!send || isStopControl(send) || isDisabledControl(send)) return;

    draining = true;
    setEditorText(editor, slot.text);
    clearTimeout(drainTimer);
    drainTimer = setTimeout(() => finishDrain(key, slot.text), DRAIN_PAUSE_MS);
}

function finishDrain(key: string, text: string) {
    drainTimer = undefined;
    try {
        if (!started) return;
        const slot = pending.get(key);
        if (!slot || slot.text !== text) return;
        if (isStreaming()) return;
        if (contextKey() !== key) return;
        const editor = getActiveEditor();
        if (!editor) return;
        const live = normalize(editorText(editor));
        if (live && live !== text && !isUserDraftEmpty(editor)) return;
        if (live !== text) setEditorText(editor, text);
        const send = getSubmitButton();
        if (!send || isStopControl(send) || isDisabledControl(send)) return;
        send.click();
        pending.delete(key);
        drainKey = "";
        paintChip();
        logger.debug("drained", key);
    } finally {
        draining = false;
    }
}

function placeChip(el: HTMLElement) {
    const root = getComposerRoot();
    if (!root || root === document.body) {
        el.style.left = "50%";
        el.style.bottom = "6.5rem";
        return;
    }
    const r = root.getBoundingClientRect();
    el.style.left = `${Math.round(r.left + r.width / 2)}px`;
    el.style.bottom = `${Math.round(Math.max(12, window.innerHeight - r.top + 8))}px`;
    const width = Math.min(32 * 16, Math.max(160, r.width - 24));
    el.style.maxWidth = `${Math.round(width)}px`;
}

function dropChip() {
    chip?.remove();
    chip = null;
}

function paintChip() {
    if (!started || !document.body) {
        dropChip();
        return;
    }
    const key = contextKey();
    const slot = pending.get(key);
    if (!slot) {
        dropChip();
        return;
    }
    let el = chip;
    if (!el?.isConnected) {
        el = document.createElement("div");
        el.id = CHIP_ID;
        document.body.appendChild(el);
        chip = el;
    }
    el.replaceChildren();
    const kicker = document.createElement("span");
    kicker.className = "bloom-pq-kicker";
    kicker.textContent = "Next";
    const text = document.createElement("span");
    text.className = "bloom-pq-text";
    const clip = slot.text.length > CLIP ? `${slot.text.slice(0, CLIP)}…` : slot.text;
    text.textContent = clip;
    text.title = slot.text;
    const actions = document.createElement("div");
    actions.className = "bloom-pq-actions";
    const send = document.createElement("button");
    send.type = "button";
    send.className = "bloom-pq-btn bloom-pq-send";
    send.textContent = "Send now";
    send.addEventListener("click", ev => {
        ev.preventDefault();
        ev.stopPropagation();
        sendNow();
    });
    const x = document.createElement("button");
    x.type = "button";
    x.className = "bloom-pq-btn bloom-pq-x";
    x.setAttribute("aria-label", "Dismiss queued prompt");
    x.textContent = "×";
    x.addEventListener("click", ev => {
        ev.preventDefault();
        ev.stopPropagation();
        dropPending(key);
    });
    actions.append(send, x);
    el.append(kicker, text, actions);
    placeChip(el);
}

function watchLeak() {
    if (!leak) return;
    leak.ticks -= 1;
    const slot = pending.get(leak.key);
    if (slot && userTurnCount() > leak.turns) {
        const last = lastUserText();
        if (last && last === leak.text) {
            logger.debug("native send leaked; dropping pending");
            pending.delete(leak.key);
            if (drainKey === leak.key) drainKey = "";
            leak = null;
            paintChip();
            return;
        }
    }
    if (leak.ticks <= 0) leak = null;
}

function onKeyDown(e: KeyboardEvent) {
    if (!started) return;
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key !== "Enter") return;
    if (e.shiftKey || e.ctrlKey || e.metaKey) return;
    if (draining) return;
    const editor = chatEditor(e.target) ?? chatEditor(document.activeElement);
    if (!editor) return;
    if (!isStreaming()) return;
    if (e.altKey || bypassIntercept) {
        bypassIntercept = false;
        return;
    }
    if (!hasDraftText(editor)) return;
    const text = normalize(editorText(editor));
    if (!text) return;
    steal(e);
    enqueue(text);
}

function sendFromEvent(node: Element): HTMLElement | null {
    const btn = node.closest("button");
    if (!(btn instanceof HTMLElement)) return null;
    if (isStopControl(btn)) return null;
    const viaSel = node.closest(SEND_SEL);
    if (viaSel instanceof HTMLElement && !isStopControl(viaSel)) return viaSel;
    const submit = getSubmitButton();
    if (submit && (btn === submit || submit.contains(btn) || btn.contains(submit))) return submit;
    return null;
}

function onClick(e: Event) {
    if (!started) return;
    const node = e.target;
    if (!(node instanceof Element)) return;
    if (node.closest(`#${CHIP_ID}`)) return;
    const btn = node.closest("button");
    if (btn instanceof HTMLElement && isStopControl(btn)) return;
    if (draining) return;
    if (!isStreaming()) return;
    if (!sendFromEvent(node)) return;
    if (bypassIntercept) {
        bypassIntercept = false;
        return;
    }
    const editor = getActiveEditor();
    if (!editor || !hasDraftText(editor)) return;
    const text = normalize(editorText(editor));
    if (!text) return;
    steal(e);
    enqueue(text);
}

function onSubmit(e: Event) {
    if (!started) return;
    const form = e.target;
    if (!(form instanceof HTMLFormElement)) return;
    if (!form.matches(COMPOSER_SEL) && !form.querySelector(EDITOR_SEL)) return;
    if (draining) return;
    if (!isStreaming()) return;
    if (bypassIntercept) {
        bypassIntercept = false;
        return;
    }
    const editor = getActiveEditor() ?? form.querySelector<HTMLElement>(EDITOR_SEL);
    if (!editor || !hasDraftText(editor)) return;
    const text = normalize(editorText(editor));
    if (!text) return;
    steal(e);
    enqueue(text);
}

export default definePlugin({
    name: "PromptQueue",
    description: "Queue the next prompt while a reply is streaming. Enter/Send waits for this turn instead of interrupting.",
    authors: [Devs.p],
    tags: ["chat"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>`,
    enabledByDefault: false,
    startAt: StartAt.HostReady,
    managedStyle: STYLE_NAME,
    cleanupSelectors: [`#${CHIP_ID}`],
    settings,
    start() {
        started = true;
        lastKey = contextKey();
        drainKey = "";
        draining = false;
        bypassIntercept = false;
        leak = null;
        registerStyle(STYLE_NAME, css);
        keys?.abort();
        keys = new AbortController();
        const { signal } = keys;
        window.addEventListener("keydown", onKeyDown, { capture: true, signal });
        document.addEventListener("click", onClick, { capture: true, signal });
        document.addEventListener("submit", onSubmit, { capture: true, signal });
        unsub?.();
        unsub = watchStreamingEdge({
            onFall(edge) {
                if (!started) return;
                if (edge.userStopped || edge.error) {
                    drainKey = "";
                    paintChip();
                    return;
                }
                drainKey = edge.contextKey;
                tryDrain(edge.contextKey);
            },
            onContext(next, prev) {
                if (prev && next && !isDraftMigrate(prev, next)) {
                    drainKey = "";
                    draining = false;
                    if (drainTimer !== undefined) {
                        clearTimeout(drainTimer);
                        drainTimer = undefined;
                    }
                }
                migrateIfNeeded(next);
                lastKey = next;
                paintChip();
            },
            onTick(state) {
                migrateIfNeeded(state.contextKey);
                lastKey = state.contextKey;
                watchLeak();
                if (drainKey && drainKey === state.contextKey) tryDrain(drainKey);
                if (chip) placeChip(chip);
            },
        });
        paintChip();
        logger.debug("watch started");
    },
    stop() {
        started = false;
        unsub?.();
        unsub = null;
        keys?.abort();
        keys = null;
        clearTimeout(drainTimer);
        drainTimer = undefined;
        clearTimeout(bypassTimer);
        bypassTimer = undefined;
        pending.clear();
        leak = null;
        drainKey = "";
        draining = false;
        bypassIntercept = false;
        dropChip();
    },
});
