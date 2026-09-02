/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * ChatGPT composer helpers. Detector ideas from Chat-State-Favicons (MIT).
 * Selectors are a union: ChatGPT remounts the trailing Send/Stop control
 * and has used several testids / aria-labels in 2026.
 */

export const COMPOSER_SEL = 'form[data-type="unified-composer"], form.w-full[data-type]';
export const EDITOR_SEL = [
    "#prompt-textarea",
    '[data-testid="prompt-textarea"]',
    "[data-mobile-composer-prompt]",
    'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]',
].join(", ");
export const SEND_SEL = [
    'button[data-testid="send-button"]',
    "#composer-submit-button",
    "button[data-composer-submit]",
    'form[data-type="unified-composer"] button[aria-label^="Send" i]',
    'form[data-type="unified-composer"] button[aria-label="Send prompt"]',
    'form[data-type="unified-composer"] button[aria-label="发送"]',
].join(", ");
export const STOP_SEL = [
    'button[data-testid="stop-button"]',
    'button[data-testid="composer-stop-button"]',
    'form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]',
    'form[data-type="unified-composer"] button[aria-label*="Stop generating" i]',
    'form[data-type="unified-composer"] button[aria-label*="停止生成"]',
    'form[data-type="unified-composer"] button[aria-label*="停止输出"]',
].join(", ");
export const TRAILING_SEL = [
    '[data-testid="composer-trailing-actions"]',
    '[data-testid="composer-footer-actions"]',
    '[grid-area="trailing"]',
    'div[slot="trailing"]',
].join(", ");

const STOP_LABEL = /stop streaming|stop generating|停止生成|停止输出|停止响应/;

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
        return /^(send|send prompt|发送)$/i.test(label) && !isStopControl(btn);
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
    const blocks = el.querySelectorAll("p");
    if (blocks.length) {
        return Array.from(blocks, b => b.textContent ?? "").join("\n");
    }
    return el.innerText ?? el.textContent ?? "";
}
