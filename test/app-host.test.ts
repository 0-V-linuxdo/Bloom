/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { describe, expect, test } from "bun:test";

import { caretLine, composerInput, readDraft, writeDraft } from "../src/app/host/composer";
import { conversationData } from "../src/app/host/network";
import { ingest, parseNotification, protocol } from "../src/app/host/protocol";
import { currentConversationId } from "../src/app/host/route";
import { sidebarMounts } from "../src/app/host/sidebar";
import { listTurns } from "../src/app/host/thread";
import { mount } from "./fixtures";

const THREAD = "local:11111111-1111-4111-8111-111111111111";

const APP_SHELL = `
<div data-app-navigation-rail>
  <button aria-label="Open profile menu" aria-haspopup="menu">P</button>
</div>
<div data-app-action-sidebar-scroll>
  <button data-app-action-sidebar-thread-row data-app-action-sidebar-thread-id="${THREAD}" data-app-action-sidebar-thread-selected="true" data-app-action-sidebar-thread-title="Everest">Everest</button>
</div>
<div data-chatgpt-composer data-composer-input>
  <div contenteditable="true" class="ProseMirror"><p>hello</p></div>
  <button aria-label="Send">Send</button>
</div>`;

function show(el: HTMLElement) {
    Object.defineProperty(el, "getClientRects", {
        configurable: true,
        value: () => ({ length: 1, 0: { width: 10, height: 10 }, item: () => ({ width: 10, height: 10 }) }),
    });
}

function placeCaret(block: HTMLElement) {
    const range = document.createRange();
    range.setStart(block.firstChild ?? block, 0);
    range.collapse(true);
    const selection = getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
}

describe("app protocol", () => {
    test("reads turn notifications and nested envelopes", () => {
        expect(parseNotification({ method: "turn/started", params: { threadId: THREAD } })?.method).toBe("turn/started");
        expect(parseNotification({ notification: { method: "turn/completed", params: { turn: { status: "completed" } } } })?.params?.turn?.status).toBe("completed");
        expect(parseNotification({ type: "connect-app-host" })).toBeNull();
        const seen: string[] = [];
        const off = protocol.on("note", note => seen.push(note.method));
        ingest({ method: "turn/interrupt", params: { threadId: THREAD } });
        off();
        expect(seen).toContain("turn/interrupt");
    });
});

describe("app route", () => {
    test("reads the selected sidebar thread id", () => {
        mount(APP_SHELL);
        expect(currentConversationId()).toBe(THREAD);
    });
});

describe("app composer", () => {
    test("reads and writes a ProseMirror draft", () => {
        mount(APP_SHELL);
        const input = document.querySelector<HTMLElement>(".ProseMirror");
        expect(input).toBeTruthy();
        show(input!);
        expect(composerInput()).toBe(input);
        expect(readDraft()).toBe("hello");
        expect(writeDraft("next")).toBe(true);
    });

    test("writeDraft does not assign textContent", () => {
        mount(APP_SHELL);
        const input = document.querySelector<HTMLElement>(".ProseMirror")!;
        show(input);
        let assigned = false;
        Object.defineProperty(input, "textContent", {
            configurable: true,
            get() {
                return Object.getOwnPropertyDescriptor(Node.prototype, "textContent")?.get?.call(this) ?? "";
            },
            set() {
                assigned = true;
            },
        });
        writeDraft("next");
        expect(assigned).toBe(false);
    });

    test("caretLine is only first or last on the edge ProseMirror block", () => {
        mount("<div data-composer-input><div contenteditable=\"true\" class=\"ProseMirror\"><p>one</p><p>two</p></div></div>");
        const input = document.querySelector<HTMLElement>(".ProseMirror")!;
        show(input);
        const [first, last] = [...input.querySelectorAll("p")];
        placeCaret(last);
        expect(caretLine(input)).toEqual({ first: false, last: true });
        placeCaret(first);
        expect(caretLine(input)).toEqual({ first: true, last: false });
    });
});

describe("app sidebar", () => {
    test("does not mount a settings entry into the navigation rail", () => {
        mount(APP_SHELL);
        for (const rail of document.querySelectorAll<HTMLElement>("[data-app-navigation-rail]")) show(rail);
        expect(sidebarMounts()).toEqual([]);
        expect(document.querySelector("[data-bloom=entry]")).toBeNull();
        const profile = document.querySelector('[aria-label="Open profile menu"]');
        expect(profile?.parentElement?.childElementCount).toBe(1);
    });
});

describe("app thread", () => {
    test("has no harvested conversation data and lists DOM turns", () => {
        expect(conversationData("local:1")).toBeNull();
        mount(`${APP_SHELL}<div data-app-action-timeline-scroll><div data-turn-key="u" data-turn="user"><p>hi</p></div></div>`);
        expect(listTurns().some(turn => turn.role === "user")).toBe(true);
    });
});
