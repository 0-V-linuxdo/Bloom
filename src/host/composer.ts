/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { isVisible, visible } from "@utils/dom";

import { Sel } from "./selectors";

const ZERO_WIDTH = /[​-‍﻿]/g;

export type ComposerInput = HTMLTextAreaElement | HTMLElement;

export const composerInput = () => visible<HTMLElement>(Sel.composerInput);

export const isComposerInput = (el: EventTarget | null): el is ComposerInput =>
    el instanceof HTMLElement && el.matches(Sel.composerInput);

export const composerForm = (input = composerInput()) => input?.closest("form") ?? document.querySelector<HTMLFormElement>(Sel.oldComposerForm);

export function readDraft(input = composerInput()) {
    if (!input) return "";
    if (input instanceof HTMLTextAreaElement) return input.value.replace(ZERO_WIDTH, "").trim();
    const clone = input.cloneNode(true) as HTMLElement;
    for (const chip of clone.querySelectorAll('[contenteditable="false"], button')) chip.remove();
    const paragraphs = [...clone.querySelectorAll("p")].map(p => p.textContent ?? "").join("\n");
    return (paragraphs.trim() ? paragraphs : clone.textContent ?? "").replace(ZERO_WIDTH, "").trim();
}

const textareaValueSetter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")?.set;

export function writeDraft(text: string, input = composerInput()) {
    if (!input) return false;
    input.focus();
    if (input instanceof HTMLTextAreaElement) {
        textareaValueSetter?.call(input, text);
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.setSelectionRange(text.length, text.length);
        return true;
    }
    const selection = getSelection();
    selection?.selectAllChildren(input);
    const inserted = text ? document.execCommand("insertText", false, text) : document.execCommand("delete");
    if (!inserted) {
        input.textContent = text;
        input.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: text }));
    }
    selection?.selectAllChildren(input);
    selection?.collapseToEnd();
    return true;
}

export function caretLine(input: ComposerInput): { first: boolean; last: boolean; } {
    if (input instanceof HTMLTextAreaElement) {
        const { selectionStart, selectionEnd, value } = input;
        return {
            first: !value.slice(0, selectionStart).includes("\n"),
            last: !value.slice(selectionEnd).includes("\n"),
        };
    }
    const selection = getSelection();
    if (!selection?.rangeCount) return { first: true, last: true };
    const caret = selection.getRangeAt(0).getBoundingClientRect();
    const box = input.getBoundingClientRect();
    const lineHeight = Number.parseFloat(getComputedStyle(input).lineHeight) || 24;
    if (!caret.height) return { first: true, last: true };
    return { first: caret.top - box.top < lineHeight, last: box.bottom - caret.bottom < lineHeight };
}

const scoped = (selector: string) => {
    const form = composerForm();
    return (form && visible<HTMLButtonElement>(selector, form)) ?? visible<HTMLButtonElement>(selector);
};

export const stopButton = () => scoped(Sel.stopButton);

export const sendButton = () => {
    const button = scoped(Sel.sendButton);
    return button && !button.matches(Sel.stopButton) ? button : null;
};

export function submitComposer() {
    const button = sendButton();
    if (button && !button.disabled) {
        button.click();
        return true;
    }
    const input = composerInput();
    if (!input) return false;
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", code: "Enter", keyCode: 13, bubbles: true, cancelable: true }));
    return true;
}

export const isStopVisible = () => isVisible(stopButton());
