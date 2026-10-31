/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { describe, expect, test } from "bun:test";

import { caretLine, composerInput, readDraft, writeDraft } from "../src/app/host/composer";
import { conversationData, HARVEST_GRACE_MS, HARVEST_SETTLE_MS } from "../src/app/host/network";
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

    test("reads the selected sidebar thread id when the row has no layout box", () => {
        mount(APP_SHELL);
        const row = document.querySelector<HTMLElement>("[data-app-action-sidebar-thread-row]");
        Object.defineProperty(row, "getClientRects", { value: () => ({ length: 0 }) });
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
    test("overlays the settings entry on the profile slot, not as a flex sibling", () => {
        mount("<div data-app-navigation-rail><div class=\"relative shrink-0 w-9\"><div class=\"flex min-w-0 flex-1 justify-center\"><button aria-label=\"Open profile menu\" aria-haspopup=\"menu\">P</button></div></div></div>");
        for (const rail of document.querySelectorAll<HTMLElement>("[data-app-navigation-rail]")) show(rail);
        const mounts = sidebarMounts();
        expect(mounts).toHaveLength(1);
        expect(mounts[0].kind).toBe("rail");
        const slot = document.querySelector(".relative.shrink-0");
        const wrap = document.querySelector(".flex.min-w-0");
        const profile = document.querySelector('[aria-label="Open profile menu"]');
        const node = document.createElement("div");
        node.setAttribute("data-bloom", "entry");
        mounts[0].insert(node);
        expect(slot?.contains(node)).toBe(true);
        expect(wrap?.contains(node)).toBe(false);
        expect(profile?.parentElement === wrap).toBe(true);
        expect(wrap?.childElementCount).toBe(1);
    });
});

describe("app thread", () => {
    test("has no harvested conversation data and lists DOM turns", () => {
        expect(conversationData("local:1")).toBeNull();
        mount(`${APP_SHELL}<div data-app-action-timeline-scroll><div data-turn-key="u" data-turn="user"><p>hi</p></div></div>`);
        expect(listTurns().some(turn => turn.role === "user")).toBe(true);
    });

    test("splits a turn-key into the user bubble and every assistant reply", () => {
        mount(`${APP_SHELL}<div data-app-action-timeline-scroll>
            <div data-turn-key="history-content:turn:t1">
                <div class="group/user-message"><div class="whitespace-pre-wrap">First question</div></div>
                <div data-response-annotation-target="msg_a1"><div data-markdown-text-style="assistant-message">First reply</div></div>
            </div>
            <div data-turn-key="history-content:turn:t2">
                <div class="group/user-message"><div class="whitespace-pre-wrap">Second question</div></div>
                <div data-response-annotation-target="msg_a2"><div data-markdown-text-style="assistant-message">Second reply</div></div>
            </div>
        </div>`);
        const turns = listTurns();
        expect(turns.map(turn => turn.role)).toEqual(["user", "assistant", "user", "assistant"]);
        expect(turns.map(turn => turn.messageIds[0])).toEqual(["turn:t1", "msg_a1", "turn:t2", "msg_a2"]);
    });
});

describe("app conversation harvest", () => {
    test("builds a chain from item notifications without fetching conversations", () => {
        const id = "local:aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
        ingest({
            method: "item/completed",
            params: { threadId: id, item: { id: "u1", type: "user_message", text: "How tall is Everest?" } },
        });
        ingest({
            method: "item/completed",
            params: { threadId: id, item: { id: "a1", type: "agent_message", text: "About 8,849 metres." } },
        });
        const chain = conversationData(id)?.chain ?? [];
        expect(chain.map(item => [item.role, item.text])).toEqual([
            ["user", "How tall is Everest?"],
            ["assistant", "About 8,849 metres."],
        ]);
    });

    test("harvests only the visible conversation pane", () => {
        const pane = (turnId: string, label: string) => {
            const el = document.createElement("div");
            el.setAttribute("data-app-action-timeline-scroll", "");
            Object.assign(el, { "__reactFiber$test": { memoizedProps: { entries: [{ turnId, getLabel: () => label }] } } });
            return el;
        };
        const hidden = pane("x1", "Old chat prompt");
        const shown = pane("y1", "Current chat prompt");
        show(shown);
        Object.defineProperty(hidden, "getClientRects", { value: () => ({ length: 0 }) });
        document.body.replaceChildren(hidden, shown);
        const id = "local:bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
        expect(conversationData(id)?.chain.map(item => item.text)).toEqual(["Current chat prompt"]);
    });

    test("skips a visible pane that still shows another chat", () => {
        const el = document.createElement("div");
        el.setAttribute("data-app-action-timeline-scroll", "");
        el.innerHTML = '<div data-response-annotation-conversation="cccccccc-cccc-4ccc-8ccc-cccccccccccc"></div>';
        Object.assign(el, { "__reactFiber$test": { memoizedProps: { entries: [{ turnId: "c1", getLabel: () => "Previous chat prompt" }] } } });
        show(el);
        document.body.replaceChildren(el);
        expect(conversationData("local:dddddddd-dddd-4ddd-8ddd-dddddddddddd")?.chain ?? []).toEqual([]);
        expect(conversationData("local:cccccccc-cccc-4ccc-8ccc-cccccccccccc")?.chain.map(item => item.text)).toEqual(["Previous chat prompt"]);
    });

    test("uses the longest fiber list on first harvest, not the visible window", () => {
        const bare = "eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee";
        const id = `local:${bare}`;
        const pane = document.createElement("div");
        pane.setAttribute("data-app-action-timeline-scroll", "");
        pane.innerHTML = `<div data-turn-key="history-content:turn:y2" data-response-annotation-conversation="${bare}"></div>`;
        show(pane);
        const windowed = [{ turnId: "y1", getLabel: () => "Late one" }, { turnId: "y2", getLabel: () => "Late two" }];
        const full = [{ turnId: "y0", getLabel: () => "Early" }, ...windowed];
        Object.assign(pane, { "__reactFiber$test": { memoizedProps: { entries: full }, child: { memoizedProps: { entries: windowed } } } });
        document.body.replaceChildren(pane);
        expect(conversationData(id)?.chain.map(item => item.text)).toEqual(["Early", "Late one", "Late two"]);
    });

    test("prefers a long items list over a short entries window", () => {
        const bare = "abababab-abab-4aba-8aba-abababababab";
        const id = `local:${bare}`;
        const pane = document.createElement("div");
        pane.setAttribute("data-app-action-timeline-scroll", "");
        pane.innerHTML = `<div data-turn-key="history-content:turn:y2" data-response-annotation-conversation="${bare}"></div>`;
        show(pane);
        const windowed = [{ turnId: "y1", historyEntityKey: "turn:y1", getLabel: () => "Late one" }, { turnId: "y2", historyEntityKey: "turn:y2", getLabel: () => "Late two" }];
        const items = [
            { turnKey: "y0", getLabel: () => "Early", getPreview: () => "Early reply" },
            { turnKey: "y1", getLabel: () => "Late one", getPreview: () => "Late one reply" },
            { turnKey: "y2", getLabel: () => "Late two", getPreview: () => "Late two reply" },
        ];
        Object.assign(pane, { "__reactFiber$test": { memoizedProps: { entries: windowed, items } } });
        document.body.replaceChildren(pane);
        expect(conversationData(id)?.chain.map(item => item.text)).toEqual([
            "Early", "Early reply", "Late one", "Late one reply", "Late two", "Late two reply",
        ]);
    });

    test("grows the first harvest until it settles, then ignores later offscreen fiber", async () => {
        const bare = "ffffffff-ffff-4fff-8fff-ffffffffffff";
        const id = `local:${bare}`;
        const pane = document.createElement("div");
        pane.setAttribute("data-app-action-timeline-scroll", "");
        pane.innerHTML = `<div data-turn-key="history-content:turn:y2" data-response-annotation-conversation="${bare}"></div>`;
        show(pane);
        const windowed = [{ turnId: "y1", getLabel: () => "First seen" }, { turnId: "y2", getLabel: () => "Still visible" }];
        Object.assign(pane, { "__reactFiber$test": { memoizedProps: { entries: windowed } } });
        document.body.replaceChildren(pane);
        const started = Date.now();
        expect(conversationData(id)?.chain.map(item => item.text)).toEqual(["First seen", "Still visible"]);
        Object.assign(pane, { "__reactFiber$test": { memoizedProps: { entries: [{ turnId: "y0", getLabel: () => "Earlier hidden" }, ...windowed] } } });
        expect(conversationData(id)?.chain.map(item => item.text)).toEqual(["First seen", "Still visible", "Earlier hidden"]);
        await new Promise(resolve => setTimeout(resolve, Math.max(0, HARVEST_GRACE_MS + HARVEST_SETTLE_MS + 50 - (Date.now() - started))));
        Object.assign(pane, { "__reactFiber$test": { memoizedProps: { entries: [{ turnId: "yz", getLabel: () => "Later leftover" }, { turnId: "y0", getLabel: () => "Earlier hidden" }, ...windowed] } } });
        expect(conversationData(id)?.chain.map(item => item.text)).toEqual(["First seen", "Still visible", "Earlier hidden"]);
        pane.innerHTML = `<div data-turn-key="history-content:turn:yv" data-response-annotation-conversation="${bare}"></div><div data-turn-key="history-content:turn:y2"></div>`;
        Object.assign(pane, { "__reactFiber$test": { memoizedProps: { entries: [{ turnId: "yv", getLabel: () => "Now visible" }, ...windowed] } } });
        expect(conversationData(id)?.chain.map(item => item.text)).toEqual(["First seen", "Still visible", "Earlier hidden", "Now visible"]);
    }, 15_000);

    test("keeps taking labels that load after the first short window", async () => {
        const bare = "12121212-1212-4121-8121-121212121212";
        const id = `local:${bare}`;
        const pane = document.createElement("div");
        pane.setAttribute("data-app-action-timeline-scroll", "");
        pane.innerHTML = `<div data-turn-key="history-content:turn:y1" data-response-annotation-conversation="${bare}"></div>`;
        show(pane);
        const labels = { early: "", reply: "" };
        const items = [
            { turnKey: "y0", getLabel: () => labels.early, getPreview: () => labels.reply },
            { turnKey: "y1", getLabel: () => "Late one", getPreview: () => "Late one reply" },
        ];
        Object.assign(pane, { "__reactFiber$test": { memoizedProps: { items } } });
        document.body.replaceChildren(pane);
        const started = Date.now();
        expect(conversationData(id)?.chain.map(item => item.text)).toEqual(["Late one", "Late one reply"]);
        await new Promise(resolve => setTimeout(resolve, HARVEST_SETTLE_MS + 50));
        labels.early = "Early";
        labels.reply = "Early reply";
        expect(conversationData(id)?.chain.map(item => item.text)).toEqual([
            "Late one", "Late one reply", "Early", "Early reply",
        ]);
        await new Promise(resolve => setTimeout(resolve, Math.max(0, HARVEST_GRACE_MS + HARVEST_SETTLE_MS + 50 - (Date.now() - started))));
        items.unshift({ turnKey: "yz", getLabel: () => "Later leftover", getPreview: () => "Later leftover reply" });
        expect(conversationData(id)?.chain.map(item => item.text)).toEqual([
            "Late one", "Late one reply", "Early", "Early reply",
        ]);
    }, 15_000);
});
