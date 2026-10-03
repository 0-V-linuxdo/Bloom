/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { afterEach, describe, expect, test } from "bun:test";

import { registerPlugins, setPluginEnabled, startPhase } from "../src/api/PluginManager";
import { writeSetting } from "../src/api/Settings";
import UserQuotes from "../src/plugins/userQuotes";
import { StartAt } from "../src/utils/types";

registerPlugins([UserQuotes]);

afterEach(() => {
    setPluginEnabled(UserQuotes, false);
    writeSetting("UserQuotes", "enabled");
    writeSetting("UserQuotes", "italic", true);
    writeSetting("UserQuotes", "quotes", false);
    document.body.replaceChildren();
    document.adoptedStyleSheets = [];
});

describe("UserQuotes", () => {
    test("draws a left bar on quotes in your own message only", () => {
        document.body.innerHTML = [
            '<div data-chatgpt-search-unit-key="t:user"><blockquote>mine</blockquote></div>',
            '<div data-chatgpt-search-unit-key="t:assistant"><blockquote>theirs</blockquote></div>',
        ].join("");
        startPhase(StartAt.Init);
        const rule = typeof UserQuotes.styles === "function" ? UserQuotes.styles() : "";
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(rule);
        const mine = document.querySelector('[data-chatgpt-search-unit-key$=":user"] blockquote')!;
        const theirs = document.querySelector('[data-chatgpt-search-unit-key$=":assistant"] blockquote')!;
        expect(mine.matches('[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)')).toBe(true);
        expect(theirs.matches('[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)')).toBe(false);
        expect([...sheet.cssRules].map(item => item.cssText).join("\n")).toContain("border-inline-start");
        expect(rule).toContain("quotes:none");
    });
});
