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
const SIDEBAR = `<div data-app-action-sidebar-scroll>
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
<main><a href="${EVEREST}">Citation</a></main>`;

const everest = () => document.querySelector<HTMLAnchorElement>(`a[href="${EVEREST}"]`)!;
const headerStar = () => document.querySelector<HTMLButtonElement>('body > [data-place="header"]')!;

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

afterEach(() => {
    setPluginEnabled(StarChats, false);
    writeSetting("StarChats", "chats", []);
    writeSetting("StarChats", "enabled");
    document.body.replaceChildren();
    history.pushState(null, "", "/");
});

describe("StarChats", () => {
    test("stars the open chat to the left of the top-right menu, not a sidebar row", () => {
        history.pushState(null, "", EVEREST);
        document.title = "Everest height";
        document.body.innerHTML = SIDEBAR;
        layOut();
        startPhase(StartAt.HostReady);
        const button = headerStar();
        expect(button.parentElement).toBe(document.body);
        expect(button.style.position).toBe("fixed");
        expect(button.style.left).toBe("940px");
        expect(button.style.top).toBe("8px");
        expect(document.getElementById("chip")?.contains(button)).toBe(false);
        expect(document.getElementById("title-menu")?.querySelector("[data-bloom='chat-star']")).toBeNull();
        expect(everest().querySelector("[data-bloom='chat-star']")).toBeNull();
        const event = new MouseEvent("click", { bubbles: true, cancelable: true });
        button.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(true);
        const section = document.querySelector<HTMLElement>('[data-bloom="starred"]')!;
        expect(section.textContent).toContain("Everest height");
        expect(section.compareDocumentPosition(everest()) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        expect(headerStar().getAttribute("aria-pressed")).toBe("true");
        section.querySelector<HTMLButtonElement>('[data-bloom="chat-star"]')!.click();
        expect(document.querySelector('[data-bloom="starred"]')).toBeNull();
        expect(headerStar().getAttribute("aria-pressed")).toBe("false");
        expect(headerStar().style.left).toBe("940px");
    });

    test("keeps a starred chat after the sidebar is redrawn", () => {
        history.pushState(null, "", EVEREST);
        document.body.innerHTML = SIDEBAR;
        layOut();
        startPhase(StartAt.HostReady);
        headerStar().click();
        document.body.innerHTML = SIDEBAR;
        layOut();
        writeSetting("StarChats", "chats", [...(StarChats.settings?.store.chats ?? [])]);
        expect(document.querySelector("[data-bloom='starred']")?.textContent).toContain("Everest height");
        expect(document.querySelector(`[data-app-action-sidebar-scroll] > a[href="${EVEREST}"] [data-bloom="chat-star"]`)).toBeNull();
        expect(headerStar().getAttribute("aria-pressed")).toBe("true");
        expect(headerStar().style.position).toBe("fixed");
        expect(headerStar().style.left).toBe("940px");
    });
});
