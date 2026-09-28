/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { beforeAll, beforeEach, describe, expect, test } from "bun:test";

import { type FallOutcome, generation, startGeneration } from "../src/host/generation";
import { network } from "../src/host/network";
import { checkRoute } from "../src/host/route";

const SETTLE_MS = 800;
const A = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const B = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";

const events: string[] = [];
let requestId = 100;

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function navigate(path: string) {
    history.pushState(null, "", path);
    checkRoute();
}

function stream() {
    const id = requestId++;
    network.emit("generate-start", { requestId: id, conversationId: null });
    return (end: { error?: boolean; handoff?: boolean; } = {}) =>
        network.emit("generate-end", { requestId: id, conversationId: null, error: !!end.error, handoff: !!end.handoff });
}

function busyTurn() {
    document.body.insertAdjacentHTML("beforeend", '<div data-turn-key="t"><div data-chatgpt-search-unit-key="t:assistant"><span role="status" aria-busy="true"></span></div></div>');
    return () => document.querySelector("[data-turn-key]")?.remove();
}

beforeAll(() => {
    document.body.replaceChildren();
    startGeneration();
    generation.on("rise", () => events.push("rise"));
    generation.on("fall", ({ outcome }: { outcome: FallOutcome; }) => events.push(`fall:${outcome}`));
    generation.on("context", ({ migrated }) => events.push(migrated ? "context:migrated" : "context:switch"));
});

beforeEach(() => {
    events.length = 0;
    document.body.innerHTML = "<form><textarea name=\"prompt\"></textarea></form>";
});

describe("generation", () => {
    test("a finished stream falls as done after settling", async () => {
        navigate(`/c/${A}`);
        events.length = 0;
        const end = stream();
        expect(events).toEqual(["rise"]);
        end();
        expect(events).toEqual(["rise"]);
        await wait(SETTLE_MS);
        expect(events).toEqual(["rise", "fall:done"]);
    });

    test("a relay stream handed to the page keeps generating while the turn is busy", async () => {
        const end = stream();
        const done = busyTurn();
        end({ handoff: true });
        await wait(SETTLE_MS);
        expect(events).toEqual(["rise"]);
        done();
        await wait(SETTLE_MS);
        expect(events).toEqual(["rise", "fall:done"]);
    });

    test("clicking Stop falls as stopped and an error as error", async () => {
        document.querySelector("form")?.insertAdjacentHTML("beforeend", '<button aria-label="Stop"></button>');
        const end = stream();
        const done = busyTurn();
        const stop = document.querySelector<HTMLElement>('button[aria-label="Stop"]');
        stop?.click();
        stop?.remove();
        end({ handoff: true });
        done();
        await wait(SETTLE_MS);
        stream()({ error: true });
        await wait(SETTLE_MS);
        expect(events).toEqual(["rise", "fall:stopped", "rise", "fall:error"]);
    });

    test("the first message moving from home to a chat is a migration", async () => {
        navigate("/");
        events.length = 0;
        const end = stream();
        navigate(`/c/${B}`);
        end();
        await wait(SETTLE_MS);
        expect(events).toEqual(["rise", "context:migrated", "fall:done"]);
    });

    test("switching chats mid-reply falls as left and ignores the old stream", async () => {
        navigate(`/c/${A}`);
        events.length = 0;
        const end = stream();
        navigate(`/c/${B}`);
        end();
        await wait(SETTLE_MS);
        expect(events).toEqual(["rise", "fall:left", "context:switch"]);
    });
});
