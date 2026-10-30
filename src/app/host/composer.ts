/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { isVisible } from "@utils/dom";

import { queryVisible } from "./query";
import { Sel } from "./selectors";

const ZERO_WIDTH = /[​-‍﻿]/g;

export type ComposerInput = HTMLTextAreaElement | HTMLElement;

export const composerInput = () => queryVisible<HTMLElement>(Sel.composerInput);

export const isComposerInput = (el: EventTarget | null): el is ComposerInput =>
    el instanceof HTMLElement && el.matches(Sel.composerInput);

export const composerForm = (input = composerInput()) =>
    input?.closest("form")
    ?? input?.closest<HTMLElement>(Sel.composer)
    ?? queryVisible<HTMLElement>(Sel.composer);

export function readDraft(input = composerInput()) {
    if (!input) return "";
    if (input instanceof HTMLTextAreaElement) return input.value.replace(ZERO_WIDTH, "").trim();
    const clone = input.cloneNode(true) as HTMLElement;
    for (const chip of clone.querySelectorAll('[contenteditable="false"], button')) chip.remove();
    const paragraphs = [...clone.querySelectorAll("p")].map(p => p.textContent ?? "").join("\n");
    return (paragraphs.trim() ? paragraphs : clone.textContent ?? "").replace(ZERO_WIDTH, "").trim();
}

const textareaValueSetter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")?.set;

function emitInsert(input: HTMLElement, text: string) {
    const type = text ? "insertText" : "deleteContentBackward";
    input.dispatchEvent(new InputEvent("beforeinput", { bubbles: true, cancelable: true, inputType: type, data: text || null }));
    input.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: type, data: text || null }));
}

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
    if (typeof document.execCommand === "function") {
        if (text) document.execCommand("insertText", false, text);
        else document.execCommand("delete");
    } else emitInsert(input, text);
    if (readDraft(input) !== text.trim()) emitInsert(input, text);
    selection?.selectAllChildren(input);
    selection?.collapseToEnd();
    return true;
}

function blockOf(node: Node | null, root: HTMLElement) {
    let current: Node | null = node;
    while (current && current !== root) {
        if (current instanceof HTMLElement && current.parentElement === root) return current;
        current = current.parentNode;
    }
    return null;
}

function sideHasPriorLine(root: HTMLElement, range: Range, fromStart: boolean) {
    const slice = document.createRange();
    slice.selectNodeContents(root);
    if (fromStart) slice.setEnd(range.startContainer, range.startOffset);
    else slice.setStart(range.endContainer, range.endOffset);
    if (slice.toString().includes("\n")) return true;
    return !!slice.cloneContents().querySelector("br");
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
    if (!selection?.rangeCount || !input.contains(selection.anchorNode)) return { first: true, last: true };
    const range = selection.getRangeAt(0);
    const blocks = [...input.children].filter((el): el is HTMLElement => el instanceof HTMLElement);
    const start = blockOf(range.startContainer, input);
    const end = blockOf(range.endContainer, input);
    const firstBlock = !start || start === blocks[0];
    const lastBlock = !end || end === blocks[blocks.length - 1];
    const caret = range.getBoundingClientRect();
    const box = (start ?? input).getBoundingClientRect();
    const lineHeight = Number.parseFloat(getComputedStyle(start ?? input).lineHeight) || 24;
    if (caret.height) {
        return {
            first: firstBlock && caret.top - box.top < lineHeight,
            last: lastBlock && box.bottom - caret.bottom < lineHeight,
        };
    }
    return {
        first: firstBlock && !sideHasPriorLine(start ?? input, range, true),
        last: lastBlock && !sideHasPriorLine(end ?? input, range, false),
    };
}

const scoped = (selector: string) => {
    const form = composerForm();
    return (form && queryVisible<HTMLButtonElement>(selector, form)) ?? queryVisible<HTMLButtonElement>(selector);
};

export const stopButton = () => scoped(Sel.stopButton);

export const sendButton = () => {
    const button = scoped(Sel.sendButton);
    return button && !button.matches(Sel.stopButton) ? button : null;
};

export function submitComposer() {
    const button = sendButton();
    if (button) {
        if (!button.disabled) button.click();
        return;
    }
    composerInput()?.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", code: "Enter", keyCode: 13, bubbles: true, cancelable: true }));
}

export const isStopVisible = () => isVisible(stopButton());
