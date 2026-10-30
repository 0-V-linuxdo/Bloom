/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { afterEach, describe, expect, test } from "bun:test";

import { registerPlugins, setPluginEnabled, startPhase } from "../src/api/PluginManager";
import { writeSetting } from "../src/api/Settings";
import StarChats from "../src/plugins/starChats";
import { StartAt } from "../src/utils/types";

registerPlugins([StarChats]);

const EVEREST = "/c/11111111-1111-4111-8111-111111111111";
const DOTS = "<svg><circle/><circle/><circle/></svg>";
const SLIDERS = "<svg><line/><circle/></svg>";
const PAGE = `<div data-app-action-sidebar-scroll>
    <a href="/">New chat</a>
    <a href="${EVEREST}">Everest height</a>
    <a href="/c/22222222-2222-4222-8222-222222222222">Pasta recipe</a>
</div>
<header id="page-header">
    <button type="button" id="title-menu" aria-label="GPT actions">${DOTS}</button>
    <div>
        <div id="chip"><button type="button" id="overflow" aria-label="More">${DOTS}</button></div>
        <button type="button" id="sliders" aria-label="Toggle summary">${SLIDERS}</button>
    </div>
</header>
<main>
    <div data-turn-key="t1">
        <div data-message-author-role="user" data-message-id="m1">
            <div class="whitespace-pre-wrap">How tall is Everest?</div>
            <div class="turn-action-controls"><button type="button" aria-label="Copy message"></button></div>
        </div>
    </div>
    <a href="${EVEREST}">Citation</a>
</main>`;

const sidebar = () => document.querySelector("[data-app-action-sidebar-scroll]")!;
const everest = () => document.querySelector<HTMLAnchorElement>(`a[href="${EVEREST}"]`)!;
const headerStar = () => document.querySelector<HTMLButtonElement>('#chip > [data-place="header"]')!;
const actionStar = () => document.querySelector<HTMLButtonElement>('.turn-action-controls > [data-place="action"]')!;
const list = () => document.querySelector<HTMLElement>('[data-bloom="star-list"]');

function box(el: Element | null, left: number) {
    if (!(el instanceof HTMLElement)) return;
    el.getBoundingClientRect = () => ({ x: left, y: 8, width: 36, height: 36, top: 8, left, right: left + 36, bottom: 44, toJSON() { return {}; } }) as DOMRect;
}

function layOut() {
    box(document.getElementById("title-menu"), 180);
    box(document.getElementById("overflow"), 980);
    box(document.getElementById("sliders"), 1024);
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1280 });
}

function sidebarText() {
    return sidebar().textContent ?? "";
}

afterEach(() => {
    setPluginEnabled(StarChats, false);
    writeSetting("StarChats", "messages", []);
    writeSetting("StarChats", "chats");
    writeSetting("StarChats", "enabled");
    writeSetting("StarChats", "replaceReadAloud");
    document.body.replaceChildren();
    history.pushState(null, "", "/");
});

describe("StarChats", () => {
    test("the header star opens this chat's messages and does not touch the sidebar", () => {
        history.pushState(null, "", EVEREST);
        document.body.innerHTML = PAGE;
        layOut();
        const before = sidebarText();
        startPhase(StartAt.HostReady);
        const button = headerStar();
        expect(button.parentElement?.id).toBe("chip");
        expect(button.nextElementSibling?.id).toBe("overflow");
        expect(button.style.position).not.toBe("fixed");
        expect(button.getAttribute("aria-label")).toBe("Starred messages");
        const action = actionStar();
        expect(action.dataset.id).toBe("m1");
        expect(action.previousElementSibling?.getAttribute("aria-label")).toBe("Copy message");
        expect(everest().querySelector("[data-bloom]")).toBeNull();
        expect(sidebar().querySelector("[data-bloom]")).toBeNull();
        const event = new MouseEvent("click", { bubbles: true, cancelable: true });
        button.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(true);
        expect(document.querySelector('[data-bloom="starred"]')).toBeNull();
        expect(sidebarText()).toBe(before);
        expect(list()?.textContent).toContain("No starred messages in this chat");
        expect(headerStar().getAttribute("aria-expanded")).toBe("true");
        actionStar().click();
        expect(document.querySelector('[data-bloom="starred"]')).toBeNull();
        expect(sidebarText()).toBe(before);
        expect(list()?.textContent).toContain("How tall is Everest?");
        expect(headerStar().classList.contains("bloom-star-chats-here")).toBe(true);
        expect(actionStar().getAttribute("aria-pressed")).toBe("true");
        list()?.querySelector<HTMLButtonElement>(".bloom-star-chats-unstar")?.click();
        expect(list()?.textContent).toContain("No starred messages in this chat");
        expect(actionStar().getAttribute("aria-pressed")).toBe("false");
        expect(sidebar().querySelector("[data-bloom]")).toBeNull();
        expect(headerStar().nextElementSibling?.id).toBe("overflow");
    });

    test("keeps the message star off the sidebar after the shell is redrawn", () => {
        history.pushState(null, "", EVEREST);
        document.body.innerHTML = PAGE;
        layOut();
        startPhase(StartAt.HostReady);
        actionStar().click();
        expect(document.querySelector('[data-bloom="starred"]')).toBeNull();
        document.body.innerHTML = PAGE;
        layOut();
        writeSetting("StarChats", "messages", [...(StarChats.settings?.store.messages ?? [])]);
        expect(document.querySelector("[data-bloom='starred']")).toBeNull();
        expect(sidebar().querySelector("[data-bloom]")).toBeNull();
        expect(headerStar().nextElementSibling?.id).toBe("overflow");
        expect(headerStar().classList.contains("bloom-star-chats-here")).toBe(true);
        expect(actionStar().getAttribute("aria-pressed")).toBe("true");
        expect(everest().querySelector("[data-bloom='chat-star']")).toBeNull();
    });
    test("puts a star on the assistant reply, whose action bar sits outside its unit", () => {
        history.pushState(null, "", EVEREST);
        document.body.innerHTML = `<main><div data-app-action-timeline-scroll><div data-turn-key="u1">
            <div data-chatgpt-search-unit-key="u1:user" data-chatgpt-search-message-ids="u1">
                <div class="whitespace-pre-wrap">How tall is Everest?</div>
                <div class="turn-action-controls"><button type="button" aria-label="Copy message"></button></div>
            </div>
            <div data-chatgpt-search-unit-key="u1:assistant" data-chatgpt-search-message-ids="a1"><div class="markdown">About 8,849 metres.</div></div>
            <div class="turn-action-controls" id="reply-bar"><button type="button" aria-label="Copy response"></button></div>
        </div></div></main>`;
        startPhase(StartAt.HostReady);
        const stars = [...document.querySelectorAll<HTMLButtonElement>('[data-place="action"]')];
        expect(stars.map(star => star.dataset.id)).toEqual(["u1", "a1"]);
        expect(stars[1]?.parentElement?.id).toBe("reply-bar");
    });

    test("puts a star in every assistant action cluster, including a non-last reply", () => {
        history.pushState(null, "", EVEREST);
        document.body.innerHTML = `<main><div data-app-action-timeline-scroll>
            <div data-turn-key="t1">
                <div class="group/user-message"><div class="whitespace-pre-wrap">First question</div>
                    <div class="turn-action-controls"><button type="button" aria-label="Copy message"></button></div>
                </div>
                <div data-response-annotation-target="a1">
                    <div data-markdown-text-style="assistant-message">First reply</div>
                    <div class="turn-action-controls" id="bar-a1">
                        <div id="cluster-a1"><button type="button" aria-label="Copy"></button><button type="button" aria-label="Rate response"></button></div>
                        <span>Monday</span>
                    </div>
                </div>
            </div>
            <div data-turn-key="t2">
                <div class="group/user-message"><div class="whitespace-pre-wrap">Second question</div>
                    <div class="turn-action-controls"><button type="button" aria-label="Copy message"></button></div>
                </div>
                <div data-response-annotation-target="a2">
                    <div data-markdown-text-style="assistant-message">Second reply</div>
                    <div class="turn-action-controls" id="bar-a2">
                        <div id="cluster-a2"><button type="button" aria-label="Copy"></button><button type="button" aria-label="Rate response"></button></div>
                        <span>Monday</span>
                    </div>
                </div>
            </div>
        </div></main>`;
        startPhase(StartAt.HostReady);
        const assistant = [...document.querySelectorAll<HTMLButtonElement>('[data-place="action"]')]
            .filter(star => star.closest("[data-response-annotation-target]"));
        expect(assistant.map(star => star.parentElement?.id)).toEqual(["cluster-a1", "cluster-a2"]);
        expect(assistant.map(star => star.closest("[data-response-annotation-target]")?.getAttribute("data-response-annotation-target"))).toEqual(["a1", "a2"]);
    });

    test("replaces the reply Read aloud button by default", () => {
        history.pushState(null, "", EVEREST);
        document.body.innerHTML = `<main><div data-turn-key="t1">
            <div data-response-annotation-target="a1">
                <div data-markdown-text-style="assistant-message">About 8,849 metres.</div>
                <div class="turn-action-controls" id="reply-bar">
                    <div id="cluster">
                        <button type="button" aria-label="Copy"></button>
                        <button type="button" aria-label="Read aloud" id="read"></button>
                        <button type="button" aria-label="Rate response"></button>
                    </div>
                </div>
            </div>
        </div></main>`;
        startPhase(StartAt.HostReady);
        const star = document.querySelector<HTMLButtonElement>('[data-place="action"]');
        const read = document.getElementById("read");
        expect(star?.parentElement?.id).toBe("cluster");
        expect(star?.nextElementSibling).toBe(read);
        expect(StarChats.settings?.store.replaceReadAloud).toBe(true);
        writeSetting("StarChats", "replaceReadAloud", false);
        expect(document.querySelector('[data-place="action"]')?.nextElementSibling?.id).not.toBe("read");
        expect(document.getElementById("cluster")?.lastElementChild?.getAttribute("data-place")).toBe("action");
    });

    test("keeps the header list open while the pointer crosses toward it", async () => {
        history.pushState(null, "", EVEREST);
        document.body.innerHTML = PAGE;
        layOut();
        startPhase(StartAt.HostReady);
        const button = headerStar();
        button.getBoundingClientRect = () => ({
            x: 940, y: 8, width: 36, height: 36, top: 8, left: 940, right: 976, bottom: 44, toJSON() { return {}; },
        }) as DOMRect;
        button.dispatchEvent(new PointerEvent("pointerenter", { clientX: 958, clientY: 26, bubbles: true }));
        await new Promise(resolve => setTimeout(resolve, 150));
        const flyout = list();
        expect(flyout).not.toBeNull();
        flyout!.getBoundingClientRect = () => new DOMRect(700, 50, 288, 160);
        button.dispatchEvent(new PointerEvent("pointerleave", { clientX: 958, clientY: 44, relatedTarget: document.body, bubbles: true }));
        expect(list()).not.toBeNull();
        document.dispatchEvent(new PointerEvent("pointermove", { clientX: 900, clientY: 48, bubbles: true }));
        expect(list()).not.toBeNull();
        document.dispatchEvent(new PointerEvent("pointermove", { clientX: 400, clientY: 26, bubbles: true }));
        expect(list()).toBeNull();
    });
});
