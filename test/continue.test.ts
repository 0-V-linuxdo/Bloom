/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { afterEach, beforeAll, describe, expect, test } from "bun:test";

import { readDraft } from "../src/host/composer";
import { startGeneration } from "../src/host/generation";
import plugin from "../src/plugins/continue";

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const shell = (notice: string, stop = false) => `
<main>
  <div role="status"><span class="text-chatgpt-recovery">${notice}</span></div>
  <form>
    <textarea name="prompt"></textarea>
    ${stop ? '<button aria-label="Stop">Stop</button>' : '<button aria-label="Send">Send</button>'}
  </form>
</main>`;

beforeAll(() => {
    HTMLElement.prototype.getClientRects = function () {
        return (this.isConnected ? [new DOMRect(0, 0, 120, 40)] : []) as unknown as DOMRectList;
    };
    startGeneration();
});

afterEach(() => {
    plugin.stop?.();
    document.body.replaceChildren();
});

describe("Continue", () => {
    test("does not send while the reply is still waiting", async () => {
        plugin.start?.();
        document.body.innerHTML = shell("Connection interrupted. Waiting for the complete answer", true);
        await wait(2200);
        expect(readDraft()).toBe("");
    });

    test("does not send while the interrupted reply is still growing", async () => {
        plugin.start?.();
        document.body.innerHTML = shell("Connection interrupted. Waiting for the complete answer", true);
        const turn = document.createElement("article");
        turn.dataset.turnKey = "late";
        turn.textContent = "Analyzing";
        document.body.append(turn);
        const timer = setInterval(() => { turn.textContent += "."; }, 400);
        await wait(3000);
        clearInterval(timer);
        expect(readDraft()).toBe("");
    });

    test("stops a stalled interrupted reply and sends continue", async () => {
        plugin.start?.();
        document.body.innerHTML = shell("Connection interrupted. Waiting for the complete answer", true);
        const turn = document.createElement("article");
        turn.dataset.turnKey = "late";
        turn.textContent = "Analyzing";
        document.body.append(turn);
        document.querySelector("button")?.addEventListener("click", event => {
            if ((event.currentTarget as HTMLButtonElement).getAttribute("aria-label") === "Stop") {
                (event.currentTarget as HTMLButtonElement).remove();
            }
        });
        await wait(10_000);
        expect(readDraft()).toBe("continue where you left");
        expect(document.querySelector('button[aria-label="Stop"]')).toBeNull();
    }, 15_000);

    test("sends the continue prompt after a delivery timeout", async () => {
        let clicks = 0;
        plugin.start?.();
        document.body.innerHTML = shell("Message delivery timed out. Please try again.");
        document.querySelector("button")?.addEventListener("click", () => { clicks += 1; });
        await wait(2200);
        expect(readDraft()).toBe("continue where you left");
        expect(clicks).toBeGreaterThan(0);
    });
});
