/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { afterEach, describe, expect, test } from "bun:test";

import { registerPlugins, setPluginEnabled, startPhase } from "../src/api/PluginManager";
import { writeSetting } from "../src/api/Settings";
import BetterQuotes from "../src/plugins/betterQuotes";
import { StartAt } from "../src/utils/types";

registerPlugins([BetterQuotes]);

const PHRASE = "northern lights over the ridge";

const PAGE = `<main>
    <div data-turn-key="t1"><div data-chatgpt-search-unit-key="t1:assistant" data-chatgpt-search-message-ids="a1"><p>${PHRASE} tonight.</p></div></div>
    <div data-turn-key="t2"><div data-chatgpt-search-unit-key="t2:user" data-chatgpt-search-message-ids="u1"><blockquote>${PHRASE}</blockquote><div>what does this mean?</div></div></div>
</main>
<form data-type="unified-composer">
    <aside><h3>Migrate your GPTs</h3><button type="button" aria-label="Dismiss migration notice">x</button></aside>
    <div class="quote"><span>${PHRASE}</span><button type="button" aria-label="Remove quote">x</button></div>
    <div id="prompt-textarea" class="ProseMirror" contenteditable="true"><p></p></div>
    <button type="button" aria-label="Send">Send</button>
</form>`;

function boot() {
    history.pushState(null, "", "/c/11111111-1111-4111-8111-111111111111");
    document.body.innerHTML = PAGE;
    startPhase(StartAt.HostReady);
}

function saved() {
    return JSON.parse(sessionStorage.getItem("BloomBetterQuotes") ?? "[]") as { id: string; text: string; }[];
}

afterEach(() => {
    setPluginEnabled(BetterQuotes, false);
    writeSetting("BetterQuotes", "enabled");
    writeSetting("BetterQuotes", "jumpToPassage", true);
    writeSetting("BetterQuotes", "persistAcrossChats", true);
    sessionStorage.removeItem("BloomBetterQuotes");
    document.body.replaceChildren();
    history.pushState(null, "", "/");
});

describe("BetterQuotes", () => {
    test("a quote in your message jumps to the earlier passage and leaves a way back", () => {
        boot();
        const quote = document.querySelector("blockquote")!;
        quote.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, cancelable: true }));
        const back = document.querySelector('[data-bloom="quote-back"]');
        expect(back).not.toBeNull();
        expect(document.querySelector('[data-chatgpt-search-message-ids="a1"] .bloom-quotes-hit, [data-chatgpt-search-message-ids="a1"].bloom-quotes-hit')).not.toBeNull();
        expect(document.querySelector('[data-chatgpt-search-message-ids="u1"] .bloom-quotes-hit')).toBeNull();
    });

    test("keeps the composer quote when the host card disappears, and drops it on dismiss", async () => {
        boot();
        expect(saved().some(item => item.text === PHRASE)).toBe(true);
        document.querySelector(".quote")?.remove();
        await new Promise(resolve => setTimeout(resolve, 0));
        const chip = document.querySelector('[data-bloom="quote-chip"]');
        expect(chip?.textContent).toContain(PHRASE);
        chip?.querySelector("button")?.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, cancelable: true }));
        expect(document.querySelector('[data-bloom="quote-chip"]')).toBeNull();
        expect(saved()).toHaveLength(0);
    });

    test("sends the saved quote with the draft when ChatGPT no longer has the card", async () => {
        document.execCommand = () => false;
        boot();
        document.querySelector(".quote")?.remove();
        await new Promise(resolve => setTimeout(resolve, 0));
        document.querySelector<HTMLButtonElement>('button[aria-label="Send"]')!.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
        expect(document.querySelector("#prompt-textarea")?.textContent).toContain(PHRASE);
        expect(saved()).toHaveLength(0);
        expect(document.querySelector('[data-bloom="quote-chip"]')).toBeNull();
    });
});
