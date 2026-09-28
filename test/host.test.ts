/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { describe, expect, test } from "bun:test";

import { readDraft, sendButton, stopButton, writeDraft } from "../src/host/composer";
import { parseConversation } from "../src/host/network";
import { conversationIdFromHref } from "../src/host/route";
import { conversationLinks, markIdentity, profileChips, projectName, sidebarMounts } from "../src/host/sidebar";
import { listTurns, outerMessageUnits, turnSummary, unitMessageIds } from "../src/host/thread";
import { mount, NEW_SHELL, OLD_SHELL } from "./fixtures";

const CHAT_ID = "11111111-1111-4111-8111-111111111111";

describe("route", () => {
    test("reads conversation ids from plain and GPT paths", () => {
        expect(conversationIdFromHref(`/c/${CHAT_ID}`)).toBe(CHAT_ID);
        expect(conversationIdFromHref(`/g/g-p-x/c/${CHAT_ID}?model=a`)).toBe(CHAT_ID);
        expect(conversationIdFromHref("/g/g-p-x/project")).toBeNull();
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
