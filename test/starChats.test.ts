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
const SIDEBAR = `<div data-app-action-sidebar-scroll>
    <a href="/">New chat</a>
    <a href="${EVEREST}">Everest height</a>
    <a href="/c/22222222-2222-4222-8222-222222222222">Pasta recipe</a>
</div>
<div data-bloom="navigator" class="bloom-nav-root"><div class="bloom-nav-rail"></div></div>
<main><a href="${EVEREST}">Citation</a></main>`;

const everest = () => document.querySelector<HTMLAnchorElement>(`a[href="${EVEREST}"]`)!;
const navStar = () => document.querySelector<HTMLButtonElement>('[data-bloom="navigator"] [data-place="nav"]')!;

afterEach(() => {
    setPluginEnabled(StarChats, false);
    writeSetting("StarChats", "chats", []);
    writeSetting("StarChats", "enabled");
    document.body.replaceChildren();
    history.pushState(null, "", "/");
});

describe("StarChats", () => {
    test("stars the open chat from the message navigator, not the sidebar row", () => {
        history.pushState(null, "", EVEREST);
        document.title = "Everest height";
        document.body.innerHTML = SIDEBAR;
        startPhase(StartAt.HostReady);
        const button = navStar();
        expect(everest().querySelector("[data-bloom='chat-star']")).toBeNull();
        expect(document.querySelector("main [data-bloom='chat-star']")).toBeNull();
        const event = new MouseEvent("click", { bubbles: true, cancelable: true });
        button.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(true);
        const section = document.querySelector<HTMLElement>('[data-bloom="starred"]')!;
        expect(section.textContent).toContain("Everest height");
        expect(section.compareDocumentPosition(everest()) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        expect(navStar().getAttribute("aria-pressed")).toBe("true");
        section.querySelector<HTMLButtonElement>('[data-bloom="chat-star"]')!.click();
        expect(document.querySelector('[data-bloom="starred"]')).toBeNull();
        expect(navStar().getAttribute("aria-pressed")).toBe("false");
    });

    test("keeps a starred chat after the sidebar is redrawn", () => {
        history.pushState(null, "", EVEREST);
        document.body.innerHTML = SIDEBAR;
        startPhase(StartAt.HostReady);
        navStar().click();
        document.body.innerHTML = SIDEBAR;
        writeSetting("StarChats", "chats", [...(StarChats.settings?.store.chats ?? [])]);
        expect(document.querySelector("[data-bloom='starred']")?.textContent).toContain("Everest height");
        expect(document.querySelector(`[data-app-action-sidebar-scroll] > a[href="${EVEREST}"] [data-bloom="chat-star"]`)).toBeNull();
        expect(navStar().getAttribute("aria-pressed")).toBe("true");
    });
});
