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

const SIDEBAR = `<div data-app-action-sidebar-scroll>
    <a href="/">New chat</a>
    <a href="/c/11111111-1111-4111-8111-111111111111">Everest height</a>
    <a href="/c/22222222-2222-4222-8222-222222222222">Pasta recipe</a>
</div>
<main><a href="/c/11111111-1111-4111-8111-111111111111">Citation</a></main>`;

const everest = () => document.querySelector<HTMLAnchorElement>('a[href="/c/11111111-1111-4111-8111-111111111111"]')!;

afterEach(() => {
    setPluginEnabled(StarChats, false);
    writeSetting("StarChats", "chats", []);
    writeSetting("StarChats", "enabled");
    document.body.replaceChildren();
});

describe("StarChats", () => {
    test("stars a sidebar chat into a group under New chat and does not follow the row", () => {
        document.body.innerHTML = SIDEBAR;
        startPhase(StartAt.HostReady);
        const row = everest();
        const button = row.querySelector<HTMLButtonElement>('[data-bloom="chat-star"]')!;
        const event = new MouseEvent("click", { bubbles: true, cancelable: true });
        button.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(true);
        const section = document.querySelector<HTMLElement>('[data-bloom="starred"]')!;
        expect(section.textContent).toContain("Everest height");
        expect(section.compareDocumentPosition(row) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        expect(section.compareDocumentPosition(document.querySelector('a[href="/"]')!) & Node.DOCUMENT_POSITION_PRECEDING).toBeTruthy();
        expect(document.querySelector("main [data-bloom='chat-star']")).toBeNull();
        expect(document.querySelector('a[href="/"] [data-bloom="chat-star"]')).toBeNull();
        section.querySelector<HTMLButtonElement>('[data-bloom="chat-star"]')!.click();
        expect(document.querySelector('[data-bloom="starred"]')).toBeNull();
        expect(row.querySelector('[data-bloom="chat-star"]')?.getAttribute("aria-pressed")).toBe("false");
    });

    test("stars a chat row in the current sidebar nav, not only the old scroll root", () => {
        document.body.innerHTML = "<nav><a href=\"/\">New chat</a><a href=\"/c/11111111-1111-4111-8111-111111111111\">Everest height</a></nav><main><a href=\"/c/11111111-1111-4111-8111-111111111111\">Citation</a></main>";
        startPhase(StartAt.HostReady);
        const row = document.querySelector("nav a[href='/c/11111111-1111-4111-8111-111111111111']")!;
        expect(row.querySelector("[data-bloom='chat-star']")).not.toBeNull();
        expect(document.querySelector("main [data-bloom='chat-star']")).toBeNull();
    });

    test("puts a star on the open conversation title", () => {
        history.pushState(null, "", "/c/11111111-1111-4111-8111-111111111111");
        document.body.innerHTML = "<div id=\"page-header\"><h1>EPUB Translator</h1></div><nav><a href=\"/\">New chat</a></nav>";
        startPhase(StartAt.HostReady);
        const button = document.querySelector<HTMLButtonElement>("#page-header [data-bloom='chat-star'][data-place='header']")!;
        expect(button).not.toBeNull();
        button.click();
        const section = document.querySelector("[data-bloom='starred']");
        expect(section?.textContent).toContain("EPUB Translator");
        history.pushState(null, "", "/");
    });

    test("keeps a starred chat after the sidebar is redrawn", () => {
        document.body.innerHTML = SIDEBAR;
        startPhase(StartAt.HostReady);
        everest().querySelector<HTMLButtonElement>('[data-bloom="chat-star"]')!.click();
        document.body.innerHTML = SIDEBAR;
        writeSetting("StarChats", "chats", [...(StarChats.settings?.store.chats ?? [])]);
        const section = document.querySelector('[data-bloom="starred"]');
        expect(section?.textContent).toContain("Everest height");
        expect(everest().querySelector('[data-bloom="chat-star"]')?.getAttribute("aria-pressed")).toBe("true");
    });
});
