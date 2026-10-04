/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { afterEach, beforeAll, describe, expect, test } from "bun:test";

import { startGeneration } from "../src/host/generation";
import { parseConversation } from "../src/host/network";
import { checkRoute } from "../src/host/route";
import navigator from "../src/plugins/betterNavigator";

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const OPEN_USER = `
<main>
  <div data-app-action-timeline-scroll style="overflow:auto;height:240px;width:480px">
    <div data-chatgpt-conversation-selection-target>
      <div data-turn-key="t1">
        <div data-chatgpt-search-unit-key="t1:user" data-chatgpt-search-message-ids="u1">
          <div class="whitespace-pre-wrap">continue where you left</div>
        </div>
      </div>
    </div>
  </div>
  <form><textarea name="prompt"></textarea><button aria-label="Stop">Stop</button></form>
</main>`;

beforeAll(() => {
    HTMLElement.prototype.getClientRects = function () {
        return (this.isConnected ? [new DOMRect(0, 0, 120, 40)] : []) as unknown as DOMRectList;
    };
    startGeneration();
});

afterEach(() => {
    navigator.stop?.();
    document.body.replaceChildren();
});

describe("BetterNavigator open turn", () => {
    test("draws a dashed assistant tick when the reply is open but not mounted", async () => {
        navigator.start?.();
        document.body.innerHTML = OPEN_USER;
        await wait(100);
        const ticks = [...document.querySelectorAll(".bloom-nav-tick")];
        expect(ticks).toHaveLength(2);
        expect(ticks[0]?.classList.contains("bloom-nav-tick-user")).toBe(true);
        expect(ticks[0]?.classList.contains("bloom-nav-tick-streaming")).toBe(false);
        expect(ticks[1]?.classList.contains("bloom-nav-tick-assistant")).toBe(true);
        expect(ticks[1]?.classList.contains("bloom-nav-tick-streaming")).toBe(true);
    });

    test("removes the dashed tick after generation settles", async () => {
        navigator.start?.();
        document.body.innerHTML = OPEN_USER;
        await wait(100);
        document.querySelector("button")?.setAttribute("aria-label", "Send");
        await wait(900);
        expect(document.querySelectorAll(".bloom-nav-tick")).toHaveLength(1);
        expect(document.querySelector(".bloom-nav-tick-user")).not.toBeNull();
        expect(document.querySelector(".bloom-nav-tick-streaming")).toBeNull();
    });

    test("lists the first message before later continues and uses the agent title", async () => {
        const id = "88888888-8888-4888-8888-888888888888";
        history.pushState(null, "", `/c/${id}`);
        checkRoute();
        parseConversation(id, {
            messages: [
                { id: "u1", author: { role: "user" }, create_time: 30, content: { content_type: "text", parts: ["continue where you left"] } },
                { id: "u0", author: { role: "user" }, create_time: 10, content: { content_type: "text", parts: ["zh-cn"] } },
                { id: "a0", author: { role: "assistant" }, create_time: 20, content: { content_type: "text", parts: ["STATUS"] } },
            ],
        });
        navigator.start?.();
        document.body.innerHTML = `
<main>
  <div data-app-action-timeline-scroll style="overflow:auto;height:240px;width:480px">
    <div data-turn-key="t0">
      <div data-chatgpt-search-unit-key="t0:user" data-chatgpt-search-message-ids="u0"><div class="whitespace-pre-wrap">zh-cn</div></div>
      <div data-chatgpt-search-unit-key="t0:assistant" data-chatgpt-search-message-ids="a0"><div class="markdown">STATUS</div></div>
    </div>
    <div data-turn-key="t1">
      <div data-chatgpt-search-unit-key="t1:user" data-chatgpt-search-message-ids="u1"><div class="whitespace-pre-wrap">continue where you left</div></div>
      <div data-markdown-text-style="assistant-message">Continued translating the screenplay</div>
      <div class="group/activity-header"><span>Analysis paused</span></div>
    </div>
  </div>
</main>`;
        await wait(100);
        const rows = [...document.querySelectorAll(".bloom-nav-row")].map(row => row.textContent?.replaceAll(/\s+/g, " ").trim());
        expect(rows[0]).toContain("zh-cn");
        expect(rows[1]).toContain("STATUS");
        expect(rows[2]).toContain("continue where you left");
        expect(rows[3]).toContain("Continued translating the screenplay");
        expect(rows.some(row => row?.includes("Analysis paused"))).toBe(false);
        history.pushState(null, "", "/");
        checkRoute();
    });

    test("does not repeat chain continues in front of the mounted thread", async () => {
        const id = "99999999-9999-4999-8999-999999999999";
        history.pushState(null, "", `/c/${id}`);
        checkRoute();
        parseConversation(id, {
            messages: [1, 2, 3, 4, 5, 6].map(index => ({
                id: `server-${index}`,
                author: { role: "user" },
                create_time: 30 + index,
                content: { content_type: "text", parts: ["continue where you left"] },
            })),
        });
        navigator.start?.();
        document.body.innerHTML = `
<main>
  <div data-app-action-timeline-scroll style="overflow:auto;height:240px;width:480px">
    <div data-turn-key="c0">
      <div data-chatgpt-search-unit-key="c0:user" data-chatgpt-search-message-ids="c0"><div class="whitespace-pre-wrap">zh-cn</div></div>
      <div data-markdown-text-style="assistant-message">STATUS</div>
    </div>
    <div data-turn-key="c1">
      <div data-chatgpt-search-unit-key="c1:user" data-chatgpt-search-message-ids="c1"><div class="whitespace-pre-wrap">continue where you left</div></div>
    </div>
  </div>
</main>`;
        await wait(100);
        const rows = [...document.querySelectorAll(".bloom-nav-row")].map(row => row.textContent?.replaceAll(/\s+/g, " ").trim());
        expect(rows[0]).toContain("zh-cn");
        expect(rows.filter(row => row?.includes("continue where you left"))).toHaveLength(1);
        history.pushState(null, "", "/");
        checkRoute();
    });

    test("keeps turns after the virtual list unmounts them", async () => {
        navigator.start?.();
        const pane = (body: string) => `<main><div data-app-action-timeline-scroll style="overflow:auto;height:240px;width:480px">${body}</div></main>`;
        const turn = (key: string, text: string) => `<div data-turn-key="${key}"><div data-chatgpt-search-unit-key="${key}:user" data-chatgpt-search-message-ids="${key}"><div class="whitespace-pre-wrap">${text}</div></div></div>`;
        document.body.innerHTML = pane(turn("a", "alpha") + turn("b", "beta"));
        await wait(100);
        document.body.innerHTML = pane(turn("b", "beta") + turn("c", "gamma"));
        await wait(100);
        document.body.innerHTML = pane(turn("a", "alpha") + turn("b", "beta"));
        await wait(100);
        const rows = [...document.querySelectorAll(".bloom-nav-row")].map(row => row.textContent?.replaceAll(/\s+/g, " ").trim() ?? "");
        expect(rows.map(row => row.replace(/^❓/, ""))).toEqual(["alpha", "beta", "gamma"]);
    });

    test("keeps the dashed tick on the generating tail after it unmounts", async () => {
        navigator.start?.();
        const pane = (body: string) => `<main><div data-app-action-timeline-scroll style="overflow:auto;height:240px;width:480px">${body}</div><form><button aria-label="Stop">Stop</button></form></main>`;
        const turn = (key: string, text: string, title: string) => `<div data-turn-key="${key}"><div data-chatgpt-search-unit-key="${key}:user" data-chatgpt-search-message-ids="${key}"><div class="whitespace-pre-wrap">${text}</div></div><div data-markdown-text-style="assistant-message">${title}</div></div>`;
        document.body.innerHTML = pane(turn("early", "early", "Early title") + turn("late", "late", "Late title"));
        await wait(100);
        document.body.innerHTML = pane(turn("early", "early", "Early title"));
        await wait(100);
        const ticks = [...document.querySelectorAll(".bloom-nav-tick")];
        const dashed = ticks.filter(tick => tick.classList.contains("bloom-nav-tick-streaming"));
        expect(dashed).toHaveLength(1);
        expect(dashed[0]?.getAttribute("title")).toContain("Late title");
        expect(ticks[0]?.classList.contains("bloom-nav-tick-streaming")).toBe(false);
    });

    test("drops another chat's outline on an empty GPT homepage", async () => {
        history.pushState(null, "", "/");
        checkRoute();
        navigator.start?.();
        const pane = (body: string) => `<main><div data-app-action-timeline-scroll style="overflow:auto;height:240px;width:480px">${body}</div></main>`;
        const turn = (key: string, text: string) => `<div data-turn-key="${key}"><div data-chatgpt-search-unit-key="${key}:user" data-chatgpt-search-message-ids="${key}"><div class="whitespace-pre-wrap">${text}</div></div></div>`;
        document.body.innerHTML = pane(turn("m1", "Doctor Who zh-cn") + turn("m2", "continue where you left"));
        await wait(100);
        expect(document.querySelectorAll(".bloom-nav-tick").length).toBeGreaterThan(0);

        document.body.insertAdjacentHTML("beforeend", "<div data-above-composer-conversation-id='chatgpt:local-chatgpt:986d56c6-0806-4741-814b-fe80b9594301'></div>");
        history.pushState({ usr: { chatGptCustomGptHomepage: true } }, "", "/");
        checkRoute();
        await wait(100);
        expect(document.querySelector("[data-bloom=navigator]")).not.toBeNull();

        document.body.innerHTML = `
<main>
  <h1>EPUB Translator</h1>
  <form data-composer-placement="home">
    <div data-above-composer-conversation-id="chatgpt:local-chatgpt:986d56c6-0806-4741-814b-fe80b9594301"></div>
    <textarea name="prompt"></textarea>
    <button aria-label="Send">Send</button>
  </form>
</main>`;
        await wait(100);
        expect(document.querySelector("[data-bloom=navigator]")).toBeNull();

        document.body.innerHTML = pane(turn("n1", "brand new"));
        await wait(100);
        const rows = [...document.querySelectorAll(".bloom-nav-row")].map(row => row.textContent?.replaceAll(/\s+/g, " ").trim() ?? "");
        expect(rows.some(row => row.includes("brand new"))).toBe(true);
        expect(rows.some(row => row.includes("Doctor Who") || row.includes("continue where you left"))).toBe(false);
    });

    test("keeps the outline on the old shell, which has no timeline attribute", async () => {
        history.pushState(null, "", "/c/11111111-1111-4111-8111-111111111111");
        checkRoute();
        navigator.start?.();
        document.body.innerHTML = `
<main>
  <div id="thread">
    <article data-testid="conversation-turn-1" data-turn="user"><div class="whitespace-pre-wrap">How tall is Everest?</div></article>
    <article data-testid="conversation-turn-2" data-turn="assistant"><div class="markdown">8849 m</div></article>
  </div>
</main>`;
        await wait(100);
        expect(document.querySelectorAll(".bloom-nav-tick")).toHaveLength(2);
        history.pushState(null, "", "/");
        checkRoute();
    });
});
