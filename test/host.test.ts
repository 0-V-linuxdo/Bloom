/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { describe, expect, test } from "bun:test";

import { readDraft, sendButton, stopButton, writeDraft } from "../src/host/composer";
import { parseConversation } from "../src/host/network";
import { isHydrated } from "../src/host/ready";
import { conversationIdFromHref, currentConversationId } from "../src/host/route";
import { Sel } from "../src/host/selectors";
import { accountMenu, conversationLinks, markIdentity, profileChips, projectName, sidebarMounts } from "../src/host/sidebar";
import { listTurns, outerMessageUnits, turnSummary, unitMessageIds } from "../src/host/thread";
import { LIVE_SHELL, mount, NEW_SHELL, OLD_SHELL } from "./fixtures";

const textMessage = (id: string, role: string, part: string) => ({ id, author: { role }, create_time: 1, content: { content_type: "text", parts: [part] } });

const CHAT_ID = "11111111-1111-4111-8111-111111111111";

describe("route", () => {
    test("reads conversation ids from plain and GPT paths", () => {
        expect(conversationIdFromHref(`/c/${CHAT_ID}`)).toBe(CHAT_ID);
        expect(conversationIdFromHref(`/g/g-p-x/c/${CHAT_ID}?model=a`)).toBe(CHAT_ID);
        expect(conversationIdFromHref("/g/g-p-x/project")).toBeNull();
    });

    test("a local placeholder id is still a draft", () => {
        history.pushState(null, "", "/c/local-3f2a9c1e-0000-4000-8000-000000000000");
        expect(currentConversationId()).toBeNull();
        history.pushState(null, "", "/");
    });
});

describe("hydration", () => {
    test("holds writes until React has hydrated the element", () => {
        const el = document.createElement("div");
        expect(isHydrated(el)).toBe(true);
        Object.assign(document, { __reactContainer$test: {} });
        expect(isHydrated(el)).toBe(false);
        Object.assign(el, { __reactFiber$test: {} });
        expect(isHydrated(el)).toBe(true);
        Reflect.deleteProperty(document, "__reactContainer$test");
    });
});

describe("new shell", () => {
    test("mounts the entry in the expanded footer and the rail", () => {
        mount(NEW_SHELL);
        const mounts = sidebarMounts();
        expect(mounts.map(m => m.kind)).toEqual(["expanded", "rail"]);
        const node = document.createElement("div");
        mounts[0].insert(node);
        expect(document.querySelector(".footer")?.firstElementChild).toBe(node);
    });

    test("finds the account chips and marks avatar, name and plan", () => {
        mount(NEW_SHELL);
        const chips = profileChips();
        expect(chips).toHaveLength(2);
        markIdentity(chips[0], "profile");
        expect(document.querySelector("[data-bloom-profile-name]")?.textContent).toBe("Grace Green");
        expect(document.querySelector("[data-bloom-profile-plan]")?.textContent).toBe("Plus");
        expect(document.querySelector("[data-bloom-profile-avatar]")?.textContent).toBe("GG");
    });

    test("lists turns with roles, ids and summaries", () => {
        mount(NEW_SHELL);
        const turns = listTurns();
        expect(turns.map(t => t.role)).toEqual(["user", "assistant"]);
        expect(turns[1].messageIds).toEqual(["a0", "a1"]);
        expect(turnSummary(turns[0])).toBe("How tall is Everest?");
        expect(turnSummary(turns[1])).toBe("About 8,849 metres.");
        expect(outerMessageUnits().map(unitMessageIds)).toEqual([["u1"], ["a0", "a1"]]);
    });

    test("finds sidebar links and project names", () => {
        mount(NEW_SHELL);
        expect(conversationLinks(CHAT_ID)).toHaveLength(1);
        expect(projectName("/g/g-p-abc123-travel/c/22222222-2222-4222-8222-222222222222")).toBe("Travel");
    });

    test("reads and writes a textarea draft", () => {
        mount(NEW_SHELL);
        expect(writeDraft("hello")).toBe(true);
        expect(readDraft()).toBe("hello");
        expect(sendButton()?.dataset.testid).toBe("send-button");
        expect(stopButton()).toBeNull();
    });
});

describe("signed-in shell 2026-09", () => {
    test("marks the chip beside the empty profile overlay button and the rail placeholder", () => {
        mount(LIVE_SHELL);
        const chips = profileChips();
        expect(chips.map(chip => chip.className)).toEqual(["pointer-events-none", ""]);
        for (const chip of chips) markIdentity(chip, "profile");
        expect([...document.querySelectorAll("[data-bloom-profile-name]")].map(el => el.textContent)).toEqual(["1876948535"]);
        expect(document.querySelector("[data-bloom-profile-plan]")?.textContent).toBe("Pro");
        expect([...document.querySelectorAll("[data-bloom-profile-avatar]")].map(el => el.tagName)).toEqual(["IMG", "SPAN"]);
    });

    test("keeps the avatar mark inside the chip and moves it when the image loads", () => {
        mount('<div class="contents" style="border-radius:0px"><nav>Chats</nav><div class="footer"><button aria-label="Open profile menu"></button><div class="chip"><span class="rounded-full">GG</span><span>Grace Green</span><span>Plus</span></div></div></div>');
        const chip = document.querySelector(".chip") as HTMLElement;
        markIdentity(chip, "profile");
        expect(document.querySelector(".contents")?.hasAttribute("data-bloom-profile-avatar")).toBe(false);
        expect(document.querySelector("[data-bloom-profile-avatar]")?.textContent).toBe("GG");
        chip.prepend(document.createElement("img"));
        markIdentity(chip, "profile");
        expect([...document.querySelectorAll("[data-bloom-profile-avatar]")].map(el => el.tagName)).toEqual(["IMG"]);
    });

    test("finds the account menu the profile button opened", () => {
        mount(LIVE_SHELL);
        expect(accountMenu()?.id).toBe("profile-menu");
    });

    test("splits a turn into its user and assistant messages", () => {
        mount(LIVE_SHELL);
        const turns = listTurns();
        expect(turns.map(t => [t.role, t.messageIds.join()])).toEqual([["user", "u1"], ["assistant", "a1"], ["user", "u2"], ["assistant", "a2"]]);
        expect(turns.map(t => t.streaming)).toEqual([false, false, false, true]);
        expect(turnSummary(turns[1])).toBe("First answer");
        expect(outerMessageUnits().map(unitMessageIds)).toEqual([["u1"], ["a1"], ["u2"], ["a2"]]);
    });

    test("summaries skip Bloom's timestamp and screen-reader labels", () => {
        mount(LIVE_SHELL);
        const unit = document.querySelector('[data-chatgpt-search-unit-key="t1:assistant"] [data-chatgpt-search-message-ids]');
        unit?.querySelector(".markdown")?.classList.remove("markdown");
        unit?.insertAdjacentHTML("afterbegin", '<time data-bloom="timestamp">22:41</time><span class="sr-only">ChatGPT said:</span>');
        expect(turnSummary(listTurns()[1])).toBe("First answer");
    });

    test("uses the Send and Stop labels and the visible home heading", () => {
        mount(LIVE_SHELL);
        expect(readDraft()).toBe("next");
        expect(sendButton()?.getAttribute("aria-label")).toBe("Send");
        expect(stopButton()).toBeNull();
        sendButton()?.setAttribute("aria-label", "Stop");
        expect(stopButton()?.getAttribute("aria-label")).toBe("Stop");
        expect(document.querySelector(Sel.homeHeading)?.textContent).toBe("What’s on your mind today?");
    });
});

describe("old shell", () => {
    test("mounts above the profile button and marks it", () => {
        mount(OLD_SHELL);
        expect(sidebarMounts().map(m => m.kind)).toEqual(["profile"]);
        const [chip] = profileChips();
        markIdentity(chip, "profile");
        expect(document.querySelector("[data-bloom-profile-name]")?.textContent).toBe("Old Name");
        expect(document.querySelector("[data-bloom-profile-plan]")?.textContent).toBe("Free");
    });

    test("reads turns and ignores composer chips", () => {
        mount(OLD_SHELL);
        expect(listTurns().map(t => [t.role, t.messageIds[0]])).toEqual([["user", "m1"], ["assistant", "m2"]]);
        expect(readDraft()).toBe("draft");
        expect(stopButton()?.dataset.testid).toBe("stop-button");
    });
});

describe("conversation JSON", () => {
    test("reads the windowed messages list", () => {
        const data = parseConversation("33333333-3333-4333-8333-333333333333", {
            title: "Windowed",
            messages: [
                { id: "w1", author: { role: "user" }, create_time: 10, content: { content_type: "text", parts: ["Hi"] } },
                { id: "w2", author: { role: "assistant" }, create_time: 20, content: { content_type: "text", parts: ["Hello"] } },
            ],
        });
        expect(data?.chain.map(m => [m.role, m.text])).toEqual([["user", "Hi"], ["assistant", "Hello"]]);
        expect(data?.times.get("w1")).toBe(10_000);
    });

    test("keeps only the last of consecutive assistant messages", () => {
        const data = parseConversation("44444444-4444-4444-8444-444444444444", {
            messages: [textMessage("q", "user", "Check this"), textMessage("p1", "assistant", "I'll look"), textMessage("p2", "assistant", "Still looking"), textMessage("r", "assistant", "Result")],
        });
        expect(data?.chain.map(m => m.id)).toEqual(["q", "r"]);
    });

    test("walks the main chain and keeps create times", () => {
        const data = parseConversation(CHAT_ID, {
            title: "Everest",
            current_node: "a1",
            mapping: {
                root: { message: null, parent: null },
                sys: { message: { id: "sys", author: { role: "system" }, content: { content_type: "text", parts: [""] } }, parent: "root" },
                u1: { message: { id: "u1", author: { role: "user" }, create_time: 100, content: { content_type: "text", parts: ["How tall?"] } }, parent: "sys" },
                other: { message: { id: "other", author: { role: "assistant" }, create_time: 150, content: { content_type: "text", parts: ["old branch"] } }, parent: "u1" },
                a1: { message: { id: "a1", author: { role: "assistant" }, create_time: 200, content: { content_type: "text", parts: ["8,849 m"] } }, parent: "u1" },
            },
        });
        expect(data?.title).toBe("Everest");
        expect(data?.chain.map(m => m.id)).toEqual(["u1", "a1"]);
        expect(data?.times.get("other")).toBe(150_000);
    });
});
