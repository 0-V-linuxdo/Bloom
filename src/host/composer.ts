/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * ChatGPT composer helpers. Detector ideas from Chat-State-Favicons (MIT).
 */

export const COMPOSER_SEL = 'form[data-type="unified-composer"], form.w-full[data-type]';
export const EDITOR_SEL = '#prompt-textarea';
export const SEND_SEL = 'button[data-testid="send-button"]';
export const STOP_SEL = 'button[data-testid="stop-button"]';

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

export function getComposerRoot(): HTMLElement {
    const forms = Array.from(document.querySelectorAll(COMPOSER_SEL));
    const visible = forms.find(isVisible);
    if (visible instanceof HTMLElement) return visible;
    const ta = queryAny(document, EDITOR_SEL);
    const wrap = ta?.closest("form") ?? ta?.parentElement;
    return wrap instanceof HTMLElement ? wrap : document.body;
}

export function getActiveEditor(): HTMLElement | null {
    const list = Array.from(document.querySelectorAll<HTMLElement>(EDITOR_SEL));
    return list.find(isVisible) ?? list[0] ?? null;
}

export function isInputEmpty(): boolean {
    const editor = getActiveEditor();
    if (!editor) return true;
    const text = (editor.innerText ?? editor.textContent ?? "").replaceAll("\u200B", "").trim();
    return text.length === 0;
}

export function isDisabledControl(el: HTMLElement): boolean {
    if (el instanceof HTMLButtonElement && el.disabled) return true;
    if (el.hasAttribute("disabled")) return true;
    if (el.getAttribute("aria-disabled") === "true") return true;
    return el.classList.contains("opacity-50") || el.classList.contains("cursor-not-allowed");
}

export function getSubmitButton(): HTMLElement | null {
    const root = getComposerRoot();
    return queryAny(root, SEND_SEL) ?? queryAny(document, SEND_SEL);
}

export function submitIsGray(): boolean {
    const btn = getSubmitButton();
    return !!btn && isDisabledControl(btn);
}

export function getStopButton(): HTMLElement | null {
    const root = getComposerRoot();
    return queryAny(root, STOP_SEL, true) ?? queryAny(document, STOP_SEL, true);
}

export function editorText(el: HTMLElement): string {
    const blocks = el.querySelectorAll("p");
    if (blocks.length) {
        return Array.from(blocks, b => b.textContent ?? "").join("\n");
    }
    return el.innerText ?? el.textContent ?? "";
}
