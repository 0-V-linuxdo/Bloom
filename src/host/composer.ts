/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * ChatGPT composer helpers. Detector ideas from Chat-State-Favicons (MIT).
 * Selectors are a union: ChatGPT remounts the trailing Send/Stop control
 * and has used several testids / aria-labels in 2026.
 *
 * Draft emptiness ignores contenteditable=false atoms / mention buttons /
 * leftover App chips re-pinned inside #prompt-textarea after Send.
 * setEditorText is the shared write path (execCommand insertText + InputEvent).
 * Plugins must not import InputHistory to fill the editor.
 */

import { COMPOSER_FORM_SEL, EDITOR_SEL as SHARED_EDITOR_SEL } from "./shell";

export const COMPOSER_SEL = COMPOSER_FORM_SEL;
export const EDITOR_SEL = SHARED_EDITOR_SEL;
export const SEND_SEL = [
    'button[data-testid="send-button"]',
    "#composer-submit-button",
    "button[data-composer-submit]",
    'form[data-type="unified-composer"] button[aria-label^="Send" i]',
    'form[data-type="unified-composer"] button[aria-label="Send prompt"]',
    'form[data-type="unified-composer"] button[aria-label="发送"]',
    'form button[aria-label^="Send" i]',
    'form button[aria-label="Send prompt"]',
    'form button[aria-label="发送"]',
    '#thread-bottom-container button[aria-label^="Send" i]',
    '#thread-bottom button[aria-label^="Send" i]',
    'form button[type="submit"]',
].join(", ");
export const STOP_SEL = [
    'button[data-testid="stop-button"]',
    'button[data-testid="composer-stop-button"]',
    'button[data-testid*="stop-button" i]',
    'form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]',
    'form[data-type="unified-composer"] button[aria-label*="Stop generating" i]',
    'form[data-type="unified-composer"] button[aria-label*="停止生成"]',
    'form[data-type="unified-composer"] button[aria-label*="停止输出"]',
    'form button[aria-label*="Stop streaming" i]',
    'form button[aria-label*="Stop generating" i]',
    'form button[aria-label*="停止生成"]',
    'form button[aria-label*="停止输出"]',
    '#thread-bottom-container button[aria-label*="Stop streaming" i]',
    '#thread-bottom-container button[aria-label*="Stop generating" i]',
    '#thread-bottom button[aria-label*="Stop streaming" i]',
    '#thread-bottom button[aria-label*="Stop generating" i]',
].join(", ");
export const TRAILING_SEL = [
    '[data-testid="composer-trailing-actions"]',
    '[data-testid="composer-footer-actions"]',
    '[grid-area="trailing"]',
    'div[slot="trailing"]',
].join(", ");

const STOP_LABEL = /stop streaming|stop generating|停止生成|停止输出|停止响应/;
const ATOM_SEL = '[contenteditable="false"], button, [role="button"]';

export function isVisible(el: Element | null | undefined): el is HTMLElement {
    if (!(el instanceof HTMLElement) || !el.isConnected) return false;
    if (!el.getClientRects().length) return false;
    const style = getComputedStyle(el);
    return style.visibility !== "hidden" && style.display !== "none";
}

export function queryAny(root: ParentNode, sel: string, visibleOnly = false): HTMLElement | null {
    const nodes = Array.from(root.querySelectorAll(sel));
    for (const n of nodes) {
        if (!(n instanceof HTMLElement)) continue;
        if (visibleOnly && !isVisible(n)) continue;
        return n;
    }
    return null;
}

export function controlLabel(el: Element): string {
    return `${el.getAttribute("aria-label") || ""} ${el.getAttribute("title") || ""}`.replace(/\s+/g, " ").trim();
}

export function isStopControl(el: HTMLElement): boolean {
    const testid = el.getAttribute("data-testid") || "";
    if (testid === "stop-button" || testid === "composer-stop-button") return true;
    if (/\bstop\b/i.test(testid) && !/\bsend\b/i.test(testid)) return true;
    const label = controlLabel(el);
    if (STOP_LABEL.test(label)) return true;
    if (/^stop$/i.test(label)) return true;
    return false;
}

export function getComposerRoot(): HTMLElement {
    const forms = Array.from(document.querySelectorAll(COMPOSER_SEL));
    const visible = forms.find(isVisible);
    if (visible instanceof HTMLElement) return visible;
    const ta = queryAny(document, EDITOR_SEL);
    const wrap = ta?.closest("form")
        ?? ta?.closest('#thread-bottom-container, #thread-bottom, [data-type="unified-composer"]')
        ?? document.getElementById("thread-bottom-container")
        ?? document.getElementById("thread-bottom")
        ?? ta?.parentElement;
    return wrap instanceof HTMLElement ? wrap : document.body;
}

export function getActiveEditor(): HTMLElement | null {
    const list = Array.from(document.querySelectorAll<HTMLElement>(EDITOR_SEL));
    return list.find(isVisible) ?? list[0] ?? null;
}

function isDraftAtom(el: Element | null, editor: HTMLElement): boolean {
    if (!el || el === editor || !editor.contains(el)) return false;
    const hit = el.closest(ATOM_SEL);
    return !!hit && hit !== editor && editor.contains(hit);
}

const PROMPT_FIELD_SEL = 'textarea[name="prompt"], #mobile-composer-prompt, [data-testid="mobile-composer-prompt"]';

function promptFieldIn(root: ParentNode | null | undefined): HTMLTextAreaElement | HTMLInputElement | null {
    if (!root) return null;
    try {
        const node = root.querySelector(PROMPT_FIELD_SEL);
        if (node instanceof HTMLTextAreaElement || node instanceof HTMLInputElement) return node;
    } catch { /* ignore */ }
    return null;
}

function draftTextOf(root: HTMLElement, editor: HTMLElement): string {
    const parts: string[] = [];
    try {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        let node: Node | null = walker.nextNode();
        while (node) {
            const parent = node.parentElement;
            if (!(parent && isDraftAtom(parent, editor))) parts.push(node.textContent ?? "");
            node = walker.nextNode();
        }
    } catch {
        return (root.innerText ?? root.textContent ?? "");
    }
    return parts.join("");
}

/**
 * Walk the editor and collect text that is not inside a non-editable
 * atom (App/@plugin chip, mention button, contenteditable=false pill).
 * Chip-only leftover after Send counts as empty.
 */
function isPlainField(el: HTMLElement): el is HTMLTextAreaElement | HTMLInputElement {
    return el instanceof HTMLTextAreaElement || el instanceof HTMLInputElement;
}

function fieldHasDraft(field: HTMLTextAreaElement | HTMLInputElement | null): boolean {
    return !!field?.value.replaceAll("\u200B", "").trim();
}

export function hasDraftText(el?: HTMLElement | null): boolean {
    const editor = el ?? getActiveEditor();
    if (editor && editorText(editor).replaceAll("\u200B", "").trim()) return true;
    if (el) return false;
    const root = getComposerRoot();
    if (root && root !== document.body && fieldHasDraft(promptFieldIn(root))) return true;
    const slab = document.getElementById("thread-bottom-container")
        ?? document.getElementById("thread-bottom");
    if (slab && fieldHasDraft(promptFieldIn(slab))) return true;
    return false;
}

/** True when the composer has no user-typed draft (chip-only = empty). */
export function isUserDraftEmpty(el?: HTMLElement | null): boolean {
    return !hasDraftText(el);
}

/** Alias of isUserDraftEmpty. Leftover chip labels do not count as draft. */
export function isInputEmpty(): boolean {
    return isUserDraftEmpty();
}

export function isDisabledControl(el: HTMLElement): boolean {
    if (el instanceof HTMLButtonElement && el.disabled) return true;
    if (el.hasAttribute("disabled")) return true;
    if (el.getAttribute("aria-disabled") === "true") return true;
    return el.classList.contains("opacity-50") || el.classList.contains("cursor-not-allowed");
}

function scanComposerButtons(pred: (btn: HTMLElement) => boolean): HTMLElement | null {
    const root = getComposerRoot();
    if (!root || root === document.body) return null;
    for (const node of root.querySelectorAll("button")) {
        if (!(node instanceof HTMLElement) || !isVisible(node)) continue;
        if (pred(node)) return node;
    }
    return null;
}

export function getSubmitButton(): HTMLElement | null {
    const root = getComposerRoot();
    const hit = queryAny(root, SEND_SEL) ?? queryAny(document, SEND_SEL);
    if (hit && !isStopControl(hit)) return hit;
    return scanComposerButtons(btn => {
        const testid = btn.getAttribute("data-testid") || "";
        if (testid === "send-button" || btn.id === "composer-submit-button" || btn.hasAttribute("data-composer-submit")) {
            return !isStopControl(btn);
        }
        const label = controlLabel(btn);
        if (/^(send|send prompt|发送)$/i.test(label) && !isStopControl(btn)) return true;
        return btn.getAttribute("type") === "submit" && !isStopControl(btn);
    });
}

export function submitIsGray(): boolean {
    const btn = getSubmitButton();
    return !!btn && isDisabledControl(btn);
}

export function getStopButton(): HTMLElement | null {
    const root = getComposerRoot();
    const hit = queryAny(root, STOP_SEL, true) ?? queryAny(document, STOP_SEL, true);
    if (hit) return hit;
    const trailing = queryAny(root, TRAILING_SEL) ?? queryAny(document, TRAILING_SEL);
    if (trailing) {
        for (const btn of trailing.querySelectorAll("button")) {
            if (btn instanceof HTMLElement && isVisible(btn) && isStopControl(btn)) return btn;
        }
    }
    return scanComposerButtons(isStopControl);
}

export function editorText(el: HTMLElement): string {
    if (isPlainField(el)) return el.value;
    const blocks = el.querySelectorAll("p");
    if (blocks.length) {
        const joined = Array.from(blocks, b => draftTextOf(b, el)).join("\n");
        if (joined.replaceAll("\u200B", "").trim()) return joined;
    }
    const walked = draftTextOf(el, el);
    if (walked.replaceAll("\u200B", "").trim()) return walked;
    // Same composer only. Do not let a page-level textarea win getActiveEditor.
    const nested = promptFieldIn(el);
    if (nested?.value.replaceAll("\u200B", "").trim()) return nested.value;
    const form = el.closest("form");
    if (form && form.contains(el)) {
        const field = promptFieldIn(form);
        if (field?.value.replaceAll("\u200B", "").trim()) return field.value;
    }
    // Same composer slab only. Helium sometimes keeps the live draft on
    // textarea[name=prompt] beside an empty #prompt-textarea stub, not
    // necessarily as a descendant of that stub.
    const wrap = el.closest('#thread-bottom-container, #thread-bottom, [data-type="unified-composer"]');
    if (wrap instanceof HTMLElement) {
        const field = promptFieldIn(wrap);
        if (field && (wrap.contains(el) || el.contains(wrap)) && field.value.replaceAll("\u200B", "").trim()) {
            return field.value;
        }
    }
    return walked;
}

type PmView = {
    state: {
        doc: unknown;
        selection: { constructor: { atStart(doc: unknown): unknown; atEnd(doc: unknown): unknown } };
        tr: { setSelection(sel: unknown): { scrollIntoView(): unknown } };
    };
    dispatch(tr: unknown): void;
};

export function placeCaret(el: HTMLElement, atStart = false) {
    const view = (el as unknown as { pmViewDesc?: { view?: PmView } }).pmViewDesc?.view;
    if (view) {
        try {
            const Sel = view.state.selection.constructor;
            const pmSel = atStart ? Sel.atStart(view.state.doc) : Sel.atEnd(view.state.doc);
            view.dispatch(view.state.tr.setSelection(pmSel).scrollIntoView());
            return;
        } catch { /* fall through to DOM caret */ }
    }
    const sel = window.getSelection();
    if (!sel) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(atStart);
    sel.removeAllRanges();
    sel.addRange(range);
}

/**
 * Fill the composer via execCommand insertText + InputEvent.
 * Never innerHTML. textContent is last-resort only when insertText throws.
 */
export function setEditorText(el: HTMLElement, text: string, atStart = false) {
    if (isPlainField(el)) {
        el.focus();
        el.value = text;
        el.dispatchEvent(new InputEvent("input", {
            bubbles: true,
            data: text,
            inputType: text ? "insertText" : "deleteContent",
        }));
        try {
            const pos = atStart ? 0 : text.length;
            el.setSelectionRange(pos, pos);
        } catch { /* ignore */ }
        return;
    }
    el.focus();
    const sel = window.getSelection();
    if (!sel) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    sel.removeAllRanges();
    sel.addRange(range);
    try {
        if (!text) document.execCommand("delete");
        else document.execCommand("insertText", false, text);
    } catch {
        el.textContent = text;
    }
    el.dispatchEvent(new InputEvent("input", {
        bubbles: true,
        data: text,
        inputType: text ? "insertText" : "deleteContent",
    }));
    placeCaret(el, atStart);
}
