/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { afterAll, afterEach, beforeAll, describe, expect, mock, test } from "bun:test";

import * as network from "../src/host/network";

const networkPath = require.resolve("../src/host/network");
const real = { ...network };
mock.module(networkPath, () => ({ ...real, harvestSettled: () => false }));

const { checkRoute } = await import("../src/host/route");
const { default: navigator } = await import("../src/plugins/betterNavigator");

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const pane = (body: string) => `<main><div data-app-action-timeline-scroll style="overflow:auto;height:240px;width:480px">${body}</div></main>`;
const turn = (key: string, text: string, reply: string) => `<div data-turn-key="${key}"><div data-chatgpt-search-unit-key="${key}:user" data-chatgpt-search-message-ids="${key}"><div class="whitespace-pre-wrap">${text}</div></div><div data-chatgpt-search-unit-key="${key}:assistant" data-chatgpt-search-message-ids="${key}-a"><div class="markdown">${reply}</div></div></div>`;
const said = (id: string, role: string, text: string, time: number) => ({ id, author: { role }, create_time: time, content: { content_type: "text", parts: [text] } });
const rows = () => [...document.querySelectorAll(".bloom-nav-row")].map(row => row.textContent?.replaceAll(/\s+/g, " ").trim() ?? "");

beforeAll(() => {
    HTMLElement.prototype.getClientRects = function () {
        return (this.isConnected ? [new DOMRect(0, 0, 120, 40)] : []) as unknown as DOMRectList;
    };
});

afterAll(() => {
    mock.module(networkPath, () => real);
});

afterEach(() => {
    navigator.stop?.();
    document.body.replaceChildren();
    history.pushState(null, "", "/");
    checkRoute();
});

describe("BetterNavigator while the chat harvest is still growing", () => {
    test("folds a sent message into the turn that mounts after it under another id", async () => {
        const id = "cccccccc-cccc-4ccc-8ccc-cccccccccccc";
        history.pushState(null, "", `/c/${id}`);
        checkRoute();
        const chain = [said("local-1", "user", "ocean", 10), said("local-1-a", "assistant", "Ocean text", 11)];
        network.parseConversation(id, { messages: chain });
        navigator.start?.();
        document.body.innerHTML = pane(turn("local-1", "ocean", "Ocean text"));
        await wait(100);
        for (const [index, reply] of [[2, "Five oceans"], [3, "Sea floor"]] as const) {
            chain.push(said(`server-${index}`, "user", "continue", 10 + index * 2));
            network.network.emit("conversation", network.parseConversation(id, { messages: chain })!);
            await wait(100);
            document.querySelector("[data-app-action-timeline-scroll]")?.insertAdjacentHTML("beforeend", turn(`local-${index}`, "continue", reply));
            await wait(100);
        }
        expect(rows()).toEqual(["❓ocean", "🤖Ocean text", "❓continue", "🤖Five oceans", "❓continue", "🤖Sea floor"]);
    });
});
