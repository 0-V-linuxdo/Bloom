/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Depth-1 next-turn stash. ChatGPT native Enter/Send during generate
 * interrupts the current reply and POSTs immediately — this plugin
 * intercepts that path, queues the draft, and sends after host
 * watchStreamingEdge. Stop stays native and does not drain.
 * isStreaming() goes false when the trailing control remounts as Send
 * (the interrupt button). Steal also while this page's harvest id is
 * still held, or the last assistant turn is still busy / Pro thinking.
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
import { contextKeyFromUrl, conversationToken, currentConversationId } from "../../host/conversation";
import { hasErrorToast, inFlightConversationId, isDraftMigrate, isStreaming, stoppedByUser, streamingSuppressed, watchStreamingEdge } from "../../host/streaming";
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
const ASSISTANT_TURN_SEL = '#thread section[data-testid^="conversation-turn-"][data-turn="assistant"], #thread article[data-testid^="conversation-turn-"][data-turn="assistant"]';
const PRO_LIVE_RE = /^(?:pro thinking|thinking(?:…|\.\.\.)?|正在思考|思考中)$/i;

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
let passNative = false;
let leak: Leak | null = null;
let keys: AbortController | null = null;
let unsub: (() => void) | null = null;
let drainTimer: ReturnType<typeof setTimeout> | undefined;
let bypassTimer: ReturnType<typeof setTimeout> | undefined;
let chip: HTMLElement | null = null;
let editingKey: string | null = null;

function contextKey(): string {
    return contextKeyFromUrl(conversationToken());
}

function normalize(text: string): string {
    return text.replaceAll("\u200B", "").replace(/\n$/, "").trim();
}

function queuedText(editor: HTMLElement): string {
    const blocks = normalize(editorText(editor));
    if (blocks) return blocks;
    if (!hasDraftText(editor)) return "";
    // editorText joins only <p>. A placeholder <p> hides a draft that lives elsewhere.
    try {
        const clone = editor.cloneNode(true) as HTMLElement;
        clone.querySelectorAll('[contenteditable="false"], button, [role="button"]').forEach(node => node.remove());
        return normalize(clone.innerText || clone.textContent || "");
    } catch {
        return "";
    }
}

function lastAssistantTurn(): HTMLElement | null {
    try {
        const nodes = document.querySelectorAll(ASSISTANT_TURN_SEL);
        const last = nodes[nodes.length - 1];
        return last instanceof HTMLElement ? last : null;
    } catch {
        return null;
    }
}

function turnBusy(el: HTMLElement): boolean {
    if (el.getAttribute("aria-busy") === "true") return true;
    if (el.classList.contains("result-streaming")) return true;
    const msg = el.querySelector<HTMLElement>('[data-message-author-role="assistant"]');
    if (msg && msg !== el) {
        if (msg.getAttribute("aria-busy") === "true") return true;
        if (msg.classList.contains("result-streaming")) return true;
    }
    return false;
}

function proThinkingLive(el: HTMLElement): boolean {
    try {
        for (const node of el.querySelectorAll<HTMLElement>("span, div, p, button")) {
            if (node.childElementCount > 2) continue;
            const text = (node.textContent || "").replace(/\s+/g, " ").trim();
            if (!text || text.length > 32) continue;
            if (PRO_LIVE_RE.test(text)) return true;
        }
    } catch { /* ignore */ }
    return false;
}

/** This page's generate POST is still held. Cleared on host onFall, not when Send replaces Stop. */
function generateHeld(): boolean {
    const flight = inFlightConversationId();
    if (!flight) return false;
    const id = currentConversationId();
    return !id || id === flight;
}

/**
 * Enter/Send would interrupt the open reply.
 * Do not use raw isStreaming() alone: a visible non-Stop Send short-circuits it
 * exactly when the user types the follow-up.
 */
function interruptWindow(): boolean {
    if (streamingSuppressed()) return false;
    if (stoppedByUser()) return false;
    if (isStreaming()) return true;
    if (generateHeld()) return true;
    const last = lastAssistantTurn();
    if (!last) return false;
    if (turnBusy(last)) return true;
    if (proThinkingLive(last)) return true;
    return false;
}

function editorFromEvent(t: EventTarget | null): HTMLElement | null {
    const el = t instanceof Element ? t : t instanceof Node ? t.parentElement : null;
    const hit = el?.closest?.(EDITOR_SEL);
    return hit instanceof HTMLElement ? hit : null;
}

function chatEditor(t: EventTarget | null): HTMLElement | null {
    return editorFromEvent(t) ?? getActiveEditor();
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

function composerFrame(): DOMRect | null {
    const root = getComposerRoot();
    if (!root || root === document.body) return null;
    const pill = root.querySelector<HTMLElement>('[class*="corner-superellipse"]');
    const box = (pill ?? root).getBoundingClientRect();
    if (box.width < 160 || box.height < 16) return null;
    return box;
}

function placeChip(el: HTMLElement) {
    const box = composerFrame();
    if (!box) {
        el.style.left = "50%";
        el.style.width = "min(48rem, calc(100vw - 1rem))";
        el.style.bottom = "6.5rem";
        return;
    }
    const width = Math.min(box.width, window.innerWidth - 16);
    el.style.left = `${Math.round(box.left + box.width / 2)}px`;
    el.style.width = `${Math.round(width)}px`;
    el.style.bottom = `${Math.round(Math.max(12, window.innerHeight - box.top + 8))}px`;
}

function dropChip() {
    chip?.remove();
    chip = null;
    editingKey = null;
}

const SVG_NS = "http://www.w3.org/2000/svg";

function svgIcon(): SVGSVGElement {
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", "0 0 16 16");
    svg.setAttribute("aria-hidden", "true");
    return svg;
}

function strokeIcon(d: string): SVGSVGElement {
    const svg = svgIcon();
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", d);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "1.35");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    svg.append(path);
    return svg;
}

function gripIcon(): SVGSVGElement {
    const svg = svgIcon();
    const dots: Array<[number, number]> = [[5.5, 4], [10.5, 4], [5.5, 8], [10.5, 8], [5.5, 12], [10.5, 12]];
    for (const [cx, cy] of dots) {
        const dot = document.createElementNS(SVG_NS, "circle");
        dot.setAttribute("cx", String(cx));
        dot.setAttribute("cy", String(cy));
        dot.setAttribute("r", "1.05");
        dot.setAttribute("fill", "currentColor");
        svg.append(dot);
    }
    return svg;
}

function iconButton(label: string, graphic: SVGSVGElement, onClick: () => void): HTMLButtonElement {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "bloom-pq-ico";
    btn.setAttribute("aria-label", label);
    btn.append(graphic);
    btn.addEventListener("mousedown", ev => ev.preventDefault());
    btn.addEventListener("click", ev => {
        ev.preventDefault();
        ev.stopPropagation();
        onClick();
    });
    return btn;
}

function liveEditValue(): string | null {
    const input = chip?.querySelector("input.bloom-pq-edit");
    return input instanceof HTMLInputElement ? input.value : null;
}

function endEdit(key: string, value: string | null) {
    if (editingKey !== key) return;
    editingKey = null;
    if (value === null) {
        paintChip();
        return;
    }
    const next = normalize(value);
    if (!next) {
        dropPending(key);
        return;
    }
    const slot = pending.get(key);
    if (slot) slot.text = next;
    paintChip();
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
    const head = document.createElement("div");
    head.className = "bloom-pq-head";
    head.textContent = "1 Queued messages";
    const row = document.createElement("div");
    row.className = "bloom-pq-row";
    const editing = editingKey === key;
    let focusEdit: HTMLInputElement | null = null;
    if (editing) {
        const input = document.createElement("input");
        input.type = "text";
        input.className = "bloom-pq-edit";
        input.value = slot.text;
        input.setAttribute("aria-label", "Edit queued prompt");
        input.addEventListener("keydown", ev => {
            ev.stopPropagation();
            if (ev.key === "Enter") {
                ev.preventDefault();
                endEdit(key, input.value);
            } else if (ev.key === "Escape") {
                ev.preventDefault();
                endEdit(key, null);
            }
        });
        input.addEventListener("blur", () => endEdit(key, input.value));
        row.append(input);
        focusEdit = input;
    } else {
        const text = document.createElement("span");
        text.className = "bloom-pq-text";
        const clip = slot.text.length > CLIP ? `${slot.text.slice(0, CLIP)}…` : slot.text;
        text.textContent = clip;
        text.title = slot.text;
        row.append(text);
    }
    const actions = document.createElement("div");
    actions.className = "bloom-pq-actions";
    const grip = document.createElement("span");
    grip.className = "bloom-pq-ico bloom-pq-grip";
    grip.title = "Only one prompt can wait";
    grip.append(gripIcon());
    const dismiss = iconButton("Dismiss queued prompt", strokeIcon("M3.2 4.2h9.6M6.2 4.2V3.2h3.6v1M4.6 4.2l.6 8.4h5.6l.6-8.4"), () => {
        editingKey = null;
        dropPending(key);
    });
    const edit = iconButton("Edit queued prompt", strokeIcon("M9.4 3.2l3.4 3.4M3.2 12.8l.7-3.2L10.6 3l3.4 3.4-6.7 6.6z"), () => {
        if (editingKey === key) {
            endEdit(key, liveEditValue());
            return;
        }
        if (!pending.has(key)) return;
        editingKey = key;
        paintChip();
    });
    const send = iconButton("Send now", strokeIcon("M8 12.4V3.8M4.6 7.1 8 3.7l3.4 3.4"), () => {
        const live = liveEditValue();
        if (live !== null) {
            const next = normalize(live);
            editingKey = null;
            if (!next) {
                dropPending(key);
                return;
            }
            const slotNow = pending.get(key);
            if (slotNow) slotNow.text = next;
        }
        sendNow();
    });
    actions.append(grip, dismiss, edit, send);
    row.append(actions);
    el.append(head, row);
    placeChip(el);
    if (focusEdit) focusEdit.focus();
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

function takeDraft(editor: HTMLElement): string {
    if (!interruptWindow()) return "";
    if (!hasDraftText(editor)) return "";
    return queuedText(editor);
}

function onKeyDown(e: KeyboardEvent) {
    if (!started) return;
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key !== "Enter") return;
    if (e.shiftKey || e.ctrlKey || e.metaKey) return;
    if (draining) return;
    const editor = chatEditor(e.target) ?? chatEditor(document.activeElement);
    if (!editor) return;
    if (e.altKey || bypassIntercept) {
        bypassIntercept = false;
        passNative = true;
        queueMicrotask(() => { passNative = false; });
        return;
    }
    const text = takeDraft(editor);
    if (!text) return;
    steal(e);
    enqueue(text);
}

function onBeforeInput(e: Event) {
    if (!started || draining) return;
    if (!(e instanceof InputEvent) || e.inputType !== "insertParagraph") return;
    if (passNative) {
        passNative = false;
        return;
    }
    if (bypassIntercept) {
        bypassIntercept = false;
        return;
    }
    const editor = editorFromEvent(e.target);
    if (!editor) return;
    const text = takeDraft(editor);
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

function onActivate(e: Event) {
    if (!started) return;
    const node = e.target;
    if (!(node instanceof Element)) return;
    if (node.closest(`#${CHIP_ID}`)) return;
    const btn = node.closest("button");
    if (btn instanceof HTMLElement && isStopControl(btn)) return;
    if (draining) return;
    if (!sendFromEvent(node)) return;
    if (bypassIntercept) {
        bypassIntercept = false;
        return;
    }
    const editor = getActiveEditor();
    if (!editor) return;
    const text = takeDraft(editor);
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
    if (passNative) {
        passNative = false;
        return;
    }
    if (bypassIntercept) {
        bypassIntercept = false;
        return;
    }
    const editor = getActiveEditor() ?? form.querySelector<HTMLElement>(EDITOR_SEL);
    if (!editor) return;
    const text = takeDraft(editor);
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
        passNative = false;
        leak = null;
        registerStyle(STYLE_NAME, css);
        keys?.abort();
        keys = new AbortController();
        const { signal } = keys;
        const capture: AddEventListenerOptions = { capture: true, signal };
        window.addEventListener("keydown", onKeyDown, capture);
        document.addEventListener("beforeinput", onBeforeInput, capture);
        document.addEventListener("pointerdown", onActivate, capture);
        document.addEventListener("click", onActivate, capture);
        document.addEventListener("submit", onSubmit, capture);
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
        passNative = false;
        dropChip();
    },
});

