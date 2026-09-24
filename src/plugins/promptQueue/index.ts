/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * FIFO follow-up stash (cap 8). ChatGPT native Enter/Send during generate
 * interrupts the current reply and POSTs immediately — this plugin
 * intercepts that path, appends the draft, and sends the head after host
 * watchStreamingEdge. Later Enter appends; it does not replace item 1.
 * Stop stays native and does not drain. A sent head waits for that new
 * reply to rise and settle before the next item goes.
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
const QUEUE_CAP = 8;
const DRAIN_PAUSE_MS = 50;
const BYPASS_MS = 2000;
const ASSISTANT_TURN_SEL = '#thread section[data-testid^="conversation-turn-"][data-turn="assistant"], #thread article[data-testid^="conversation-turn-"][data-turn="assistant"]';
const PRO_LIVE_RE = /^(?:pro thinking|thinking(?:…|\.\.\.)?|正在思考|思考中)$/i;
const DONE_ACTION_SEL = [
    'button[data-testid="copy-turn-action-button"]',
    'button[data-testid="good-response-turn-action-button"]',
    'button[data-testid="bad-response-turn-action-button"]',
    'button[aria-label="Copy"]',
    'button[aria-label="Good response"]',
    'button[aria-label="Bad response"]',
    'button[aria-label="复制"]',
    'button[aria-label="好评"]',
    'button[aria-label="差评"]',
].join(", ");

const settings = definePluginSettings({
    replacePending: {
        type: OptionType.BOOLEAN,
        description: "Replace the last queued prompt on the next Enter. Off appends another item (up to 8).",
        default: false,
    },
});

type Slot = { id: string; text: string; at: number };
type Leak = { key: string; text: string; turns: number; ticks: number };

const pending = new Map<string, Slot[]>();
let slotSeq = 0;

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
let editingId: string | null = null;
let dragId: string | null = null;
/** Still the open reply after Stop remounts as Send. Not cleared by deleting the chip. */
let busyLatch = false;
/** Head was just sent and the tail must wait until that new reply has been busy, then settled. */
let tailHold = false;
let sawBusyAfterSend = false;

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
 * Copy / good / bad (or a finished image) means this reply is done.
 * A visible Send with no action row is the false idle: Stop remounted
 * because a follow-up was typed, and host onFall can fire anyway.
 */
function replySettled(): boolean {
    if (isStreaming() || generateHeld()) return false;
    const last = lastAssistantTurn();
    if (!last) return true;
    if (turnBusy(last) || proThinkingLive(last)) return false;
    try {
        if (last.querySelector(DONE_ACTION_SEL)) return true;
        if (last.querySelector('img[alt="Generated image"]')) return true;
    } catch { /* ignore */ }
    return false;
}

/**
 * Enter/Send would interrupt the open reply.
 * Do not use raw isStreaming() alone: a visible non-Stop Send short-circuits it
 * exactly when the user types the follow-up. busyLatch stays up across that
 * remount and across deleting the chip, until the turn is actually settled,
 * the user hits Stop, or they leave the chat.
 */
function interruptWindow(): boolean {
    if (streamingSuppressed() || stoppedByUser()) {
        busyLatch = false;
        return false;
    }
    if (isStreaming() || generateHeld()) {
        busyLatch = true;
        return true;
    }
    const last = lastAssistantTurn();
    if (last && (turnBusy(last) || proThinkingLive(last))) {
        busyLatch = true;
        return true;
    }
    if (busyLatch && !replySettled()) return true;
    busyLatch = false;
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

function newId(): string {
    slotSeq += 1;
    return `pq${Date.now().toString(36)}${slotSeq.toString(36)}`;
}

function slotsOf(key: string): Slot[] {
    return pending.get(key) ?? [];
}

function headOf(key: string): Slot | undefined {
    return slotsOf(key)[0];
}

function writeSlots(key: string, slots: Slot[]) {
    if (!slots.length) pending.delete(key);
    else pending.set(key, slots);
}

/** After the head (or a Send now) leaves, the rest must see that reply go busy, then settle. */
function noteSentTail(key: string) {
    if (!slotsOf(key).length) {
        tailHold = false;
        sawBusyAfterSend = false;
        drainKey = "";
        return;
    }
    tailHold = true;
    sawBusyAfterSend = false;
    busyLatch = true;
    drainKey = "";
}

function migrateIfNeeded(key: string) {
    if (!lastKey || lastKey === key) return;
    const slots = pending.get(lastKey);
    if (!slots?.length || pending.has(key)) return;
    if (!isDraftMigrate(lastKey, key)) return;
    pending.delete(lastKey);
    pending.set(key, slots);
    if (drainKey === lastKey) drainKey = key;
    if (leak?.key === lastKey) leak.key = key;
    logger.debug("migrated pending", lastKey, "→", key);
}

function enqueue(text: string) {
    const key = contextKey();
    const slots = slotsOf(key);
    if (settings.store.replacePending && slots.length) {
        const last = slots[slots.length - 1]!;
        last.text = text;
        last.at = Date.now();
        writeSlots(key, slots);
    } else if (slots.length >= QUEUE_CAP) {
        logger.debug("queue full", key);
        return;
    } else {
        slots.push({ id: newId(), text, at: Date.now() });
        writeSlots(key, slots);
    }
    busyLatch = true;
    leak = { key, text, turns: userTurnCount(), ticks: 3 };
    const editor = getActiveEditor();
    if (editor) setEditorText(editor, "");
    try {
        paintChip();
    } catch (err) {
        logger.error("chip", err);
    }
    logger.debug("queued", key, slots.length, text.length);
}

function dropItem(key: string, id: string) {
    const slots = slotsOf(key).filter(slot => slot.id !== id);
    writeSlots(key, slots);
    if (editingId === id) editingId = null;
    if (!slots.length) {
        if (drainKey === key) drainKey = "";
        if (leak?.key === key) leak = null;
    } else if (leak?.key === key) {
        const leaked = leak.text;
        if (!slots.some(slot => slot.text === leaked)) leak = null;
    }
    paintChip();
}

function moveItem(key: string, fromId: string, toId: string) {
    if (!fromId || fromId === toId) return;
    const slots = slotsOf(key).slice();
    const from = slots.findIndex(slot => slot.id === fromId);
    const to = slots.findIndex(slot => slot.id === toId);
    if (from < 0 || to < 0) return;
    const [item] = slots.splice(from, 1);
    if (!item) return;
    slots.splice(to, 0, item);
    writeSlots(key, slots);
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

function sendItemNow(id: string) {
    const key = contextKey();
    const slot = slotsOf(key).find(item => item.id === id);
    if (!slot) return;
    const editor = getActiveEditor();
    if (!editor) return;
    const text = slot.text;
    writeSlots(key, slotsOf(key).filter(item => item.id !== id));
    if (editingId === id) editingId = null;
    paintChip();
    armBypass();
    setEditorText(editor, text);
    const send = getSubmitButton();
    if (send && !isStopControl(send) && !isDisabledControl(send)) {
        send.click();
        bypassIntercept = false;
    }
    noteSentTail(key);
}

function tryDrain(key: string) {
    if (!started || draining || tailHold) return;
    if (isStreaming()) return;
    if (contextKey() !== key) return;
    const slot = headOf(key);
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
    drainTimer = setTimeout(() => finishDrain(key, slot.id, slot.text), DRAIN_PAUSE_MS);
}

function finishDrain(key: string, id: string, text: string) {
    drainTimer = undefined;
    try {
        if (!started || tailHold) return;
        const slot = headOf(key);
        if (!slot || slot.id !== id || slot.text !== text) return;
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
        writeSlots(key, slotsOf(key).filter(item => item.id !== id));
        paintChip();
        noteSentTail(key);
        logger.debug("drained", key, slotsOf(key).length);
    } finally {
        draining = false;
    }
}

function placeChip(el: HTMLElement) {
    // Anchor to the visible composer form. The first corner-superellipse
    // inside it is not the pill — 1.4.85 used that rect and drew the tray
    // off-screen, so Enter cleared the draft and looked like a no-op.
    el.style.position = "fixed";
    el.style.zIndex = "9999";
    el.style.transform = "translateX(-50%)";
    const root = getComposerRoot();
    const box = root && root !== document.body ? root.getBoundingClientRect() : null;
    const onScreen = !!box && box.width >= 160 && box.bottom > 0 && box.top < window.innerHeight;
    if (!onScreen || !box) {
        el.style.left = "50%";
        el.style.width = "min(40rem, calc(100vw - 1rem))";
        el.style.bottom = "6.5rem";
        return;
    }
    const width = Math.min(box.width, window.innerWidth - 16);
    el.style.left = `${Math.round(box.left + box.width / 2)}px`;
    el.style.width = `${Math.round(Math.max(240, width))}px`;
    el.style.bottom = `${Math.round(Math.max(12, window.innerHeight - box.top + 8))}px`;
}

function dropChip() {
    chip?.remove();
    chip = null;
    editingId = null;
    dragId = null;
}

const SVG_NS = "http://www.w3.org/2000/svg";

function svgIcon(): SVGSVGElement {
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    return svg;
}

/** Lucide 24×24 stroke-2. ChatGPT edit/delete are these glyphs, not a 16-box sketch. */
function strokeGlyph(ds: string[]): SVGSVGElement {
    const svg = svgIcon();
    for (const d of ds) {
        const path = document.createElementNS(SVG_NS, "path");
        path.setAttribute("d", d);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "currentColor");
        path.setAttribute("stroke-width", "2");
        path.setAttribute("stroke-linecap", "round");
        path.setAttribute("stroke-linejoin", "round");
        svg.append(path);
    }
    return svg;
}

/** Lucide grip-vertical. Drag a row by this handle to reorder. */
function gripIcon(): SVGSVGElement {
    const svg = svgIcon();
    const dots: Array<[number, number]> = [[9, 5], [15, 5], [9, 12], [15, 12], [9, 19], [15, 19]];
    for (const [cx, cy] of dots) {
        const dot = document.createElementNS(SVG_NS, "circle");
        dot.setAttribute("cx", String(cx));
        dot.setAttribute("cy", String(cy));
        dot.setAttribute("r", "1");
        dot.setAttribute("fill", "currentColor");
        svg.append(dot);
    }
    return svg;
}

function iconButton(label: string, graphic: SVGSVGElement, onClick: () => void, tip?: HTMLElement): HTMLButtonElement {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "bloom-pq-ico";
    btn.setAttribute("aria-label", label);
    btn.append(graphic);
    if (tip) bindHoverTip(btn, tip, label);
    btn.addEventListener("mousedown", ev => ev.preventDefault());
    btn.addEventListener("click", ev => {
        ev.preventDefault();
        ev.stopPropagation();
        onClick();
    });
    return btn;
}

function fromChip(t: EventTarget | null): boolean {
    const el = t instanceof Element ? t : t instanceof Node ? t.parentElement : null;
    return !!el?.closest?.(`#${CHIP_ID}`);
}

function liveEditValue(): string | null {
    const node = chip?.querySelector(".bloom-pq-editing");
    return node instanceof HTMLElement ? node.innerText : null;
}

function focusEditable(el: HTMLElement) {
    el.focus();
    const sel = window.getSelection();
    if (!sel) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
}

function endEdit(id: string, value: string | null) {
    if (editingId !== id) return;
    editingId = null;
    if (value === null) {
        paintChip();
        return;
    }
    const next = normalize(value);
    const key = contextKey();
    if (!next) {
        dropItem(key, id);
        return;
    }
    const slot = slotsOf(key).find(item => item.id === id);
    if (slot) slot.text = next;
    paintChip();
}

function startEdit(id: string) {
    if (editingId === id) return;
    if (editingId) endEdit(editingId, liveEditValue());
    if (!slotsOf(contextKey()).some(item => item.id === id)) return;
    editingId = id;
    paintChip();
}

/** Header pill, same place as the ChatGPT hover hint in the tray. */
function bindHoverTip(el: HTMLElement, tip: HTMLElement, label: string) {
    el.addEventListener("pointerenter", () => {
        tip.textContent = label;
        tip.hidden = false;
    });
    el.addEventListener("pointerleave", () => {
        if (tip.textContent === label) tip.hidden = true;
    });
}

function paintChip() {
    if (!started || !document.body) {
        dropChip();
        return;
    }
    const key = contextKey();
    const slots = slotsOf(key);
    if (!slots.length) {
        dropChip();
        return;
    }
    if (editingId && !slots.some(slot => slot.id === editingId)) editingId = null;
    let el = chip;
    if (!el?.isConnected) {
        el = document.createElement("div");
        el.id = CHIP_ID;
        document.body.appendChild(el);
        chip = el;
    }
    el.replaceChildren();
    const n = slots.length;
    const head = document.createElement("div");
    head.className = "bloom-pq-head";
    const headLabel = document.createElement("span");
    headLabel.textContent = `${n} Queued message${n === 1 ? "" : "s"}`;
    const tip = document.createElement("span");
    tip.className = "bloom-pq-tip";
    tip.hidden = true;
    head.append(headLabel, tip);
    const list = document.createElement("div");
    list.className = "bloom-pq-list";
    let focusEdit: HTMLElement | null = null;
    for (const slot of slots) {
        const row = document.createElement("div");
        row.className = "bloom-pq-row";
        const editing = editingId === slot.id;
        const text = document.createElement("span");
        text.className = editing ? "bloom-pq-text bloom-pq-editing" : "bloom-pq-text";
        if (editing) {
            text.textContent = slot.text;
            text.contentEditable = "true";
            text.spellcheck = false;
            text.setAttribute("role", "textbox");
            text.setAttribute("aria-label", "Edit queued prompt");
            text.addEventListener("keydown", ev => {
                ev.stopPropagation();
                if (ev.key === "Enter") {
                    ev.preventDefault();
                    if (!ev.shiftKey) endEdit(slot.id, text.innerText);
                } else if (ev.key === "Escape") {
                    ev.preventDefault();
                    endEdit(slot.id, null);
                }
            });
            text.addEventListener("blur", () => endEdit(slot.id, text.innerText));
            focusEdit = text;
        } else {
            const clip = slot.text.length > CLIP ? `${slot.text.slice(0, CLIP)}…` : slot.text;
            text.textContent = clip;
            text.title = slot.text;
            text.addEventListener("click", ev => {
                ev.preventDefault();
                ev.stopPropagation();
                startEdit(slot.id);
            });
        }
        row.append(text);
        const actions = document.createElement("div");
        actions.className = "bloom-pq-actions";
        if (editing) {
            const save = iconButton("Save", strokeGlyph(["M20 6 9 17l-5-5"]), () => {
                endEdit(slot.id, text.innerText);
            }, tip);
            const cancel = iconButton("Cancel", strokeGlyph(["M18 6 6 18", "m6 6 12 12"]), () => {
                endEdit(slot.id, null);
            }, tip);
            actions.append(save, cancel);
        } else {
            const grip = document.createElement("span");
            grip.className = "bloom-pq-ico bloom-pq-grip";
            grip.setAttribute("aria-label", "Drag to reorder");
            grip.draggable = true;
            grip.append(gripIcon());
            bindHoverTip(grip, tip, "Drag to reorder");
            grip.addEventListener("dragstart", ev => {
                dragId = slot.id;
                ev.dataTransfer?.setData("text/plain", slot.id);
                if (ev.dataTransfer) ev.dataTransfer.effectAllowed = "move";
            });
            grip.addEventListener("dragend", () => {
                dragId = null;
            });
            row.addEventListener("dragover", ev => {
                if (!dragId || dragId === slot.id) return;
                ev.preventDefault();
                if (ev.dataTransfer) ev.dataTransfer.dropEffect = "move";
            });
            row.addEventListener("drop", ev => {
                ev.preventDefault();
                const from = ev.dataTransfer?.getData("text/plain") || dragId || "";
                dragId = null;
                moveItem(key, from, slot.id);
            });
            const dismiss = iconButton("Remove from queue", strokeGlyph([
                "M10 11v6",
                "M14 11v6",
                "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
                "M3 6h18",
                "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
            ]), () => {
                if (editingId && editingId !== slot.id) endEdit(editingId, liveEditValue());
                editingId = editingId === slot.id ? null : editingId;
                dropItem(key, slot.id);
            }, tip);
            dismiss.classList.add("bloom-pq-ico-danger");
            const edit = iconButton("Edit", strokeGlyph([
                "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
                "m15 5 4 4",
            ]), () => startEdit(slot.id), tip);
            const send = iconButton("Send now", strokeGlyph([
                "M12 19V5",
                "M6 11 12 5l6 6",
            ]), () => {
                if (editingId && editingId !== slot.id) endEdit(editingId, liveEditValue());
                sendItemNow(slot.id);
            }, tip);
            actions.append(grip, dismiss, edit, send);
        }
        row.append(actions);
        list.append(row);
    }
    el.append(head, list);
    placeChip(el);
    if (focusEdit) {
        const input = focusEdit;
        const focusId = editingId;
        queueMicrotask(() => {
            if (editingId === focusId && input.isConnected) focusEditable(input);
        });
    }
}

function watchLeak() {
    if (!leak) return;
    leak.ticks -= 1;
    const slots = slotsOf(leak.key);
    if (slots.length && userTurnCount() > leak.turns) {
        const last = lastUserText();
        if (last && last === leak.text) {
            logger.debug("native send leaked; dropping matching item");
            let idx = -1;
            for (let i = slots.length - 1; i >= 0; i--) {
                if (slots[i]?.text === leak.text) {
                    idx = i;
                    break;
                }
            }
            if (idx >= 0) slots.splice(idx, 1);
            writeSlots(leak.key, slots);
            if (!slots.length && drainKey === leak.key) drainKey = "";
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
    if (fromChip(e.target)) return;
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
    description: "Queue follow-up prompts while a reply is streaming. Enter appends; the head sends after this turn.",
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
        // 1.4.89 wrote the old default `true` into the bag on read. That
        // replaced the only queued line. Append unless the user opts in again.
        const row = settings.store as { replacePending?: boolean; queueModeRev?: number };
        if (row.queueModeRev !== 1) {
            row.replacePending = false;
            row.queueModeRev = 1;
        }
        lastKey = contextKey();
        drainKey = "";
        draining = false;
        bypassIntercept = false;
        passNative = false;
        leak = null;
        busyLatch = !streamingSuppressed() && !stoppedByUser() && (isStreaming() || generateHeld());
        tailHold = false;
        sawBusyAfterSend = false;
        editingId = null;
        dragId = null;
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
                    busyLatch = false;
                    tailHold = false;
                    sawBusyAfterSend = false;
                    drainKey = "";
                    paintChip();
                    return;
                }
                if (tailHold && !sawBusyAfterSend) return;
                if (tailHold && sawBusyAfterSend) {
                    if (!replySettled()) return;
                    tailHold = false;
                    sawBusyAfterSend = false;
                    busyLatch = false;
                    drainKey = edge.contextKey;
                    tryDrain(edge.contextKey);
                    return;
                }
                if (!replySettled()) {
                    logger.debug("unsettled fall; keep queue window");
                    return;
                }
                busyLatch = false;
                drainKey = edge.contextKey;
                tryDrain(edge.contextKey);
            },
            onRise() {
                if (streamingSuppressed() || stoppedByUser()) return;
                if (tailHold) sawBusyAfterSend = true;
                busyLatch = true;
            },
            onContext(next, prev) {
                if (prev && next && !isDraftMigrate(prev, next)) {
                    busyLatch = false;
                    tailHold = false;
                    sawBusyAfterSend = false;
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
                if (streamingSuppressed() || stoppedByUser()) {
                    tailHold = false;
                    sawBusyAfterSend = false;
                    busyLatch = false;
                    drainKey = "";
                }
                if (tailHold && (isStreaming() || generateHeld())) sawBusyAfterSend = true;
                if (tailHold && sawBusyAfterSend && replySettled()) {
                    tailHold = false;
                    sawBusyAfterSend = false;
                    busyLatch = false;
                    if (slotsOf(state.contextKey).length) {
                        drainKey = state.contextKey;
                        tryDrain(state.contextKey);
                    }
                }
                if (!tailHold && busyLatch && replySettled()) {
                    busyLatch = false;
                    if (!drainKey && slotsOf(state.contextKey).length) {
                        drainKey = state.contextKey;
                        tryDrain(state.contextKey);
                    }
                }
                if (!tailHold && drainKey && drainKey === state.contextKey) tryDrain(drainKey);
                if (slotsOf(state.contextKey).length && !chip?.isConnected) paintChip();
                else if (chip) placeChip(chip);
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
        busyLatch = false;
        tailHold = false;
        sawBusyAfterSend = false;
        dragId = null;
        dropChip();
    },
});

