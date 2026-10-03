/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { afterEach, beforeAll, describe, expect, test } from "bun:test";

import { registerPlugins } from "../src/api/PluginManager";
import { writeSetting } from "../src/api/Settings";
import { checkRoute } from "../src/host/route";
import plugin from "../src/plugins/greetingCustomizer";

beforeAll(() => {
    HTMLElement.prototype.getClientRects = function () {
        return (this.isConnected ? [new DOMRect(0, 0, 120, 40)] : []) as unknown as DOMRectList;
    };
    registerPlugins([plugin]);
});

afterEach(() => {
    plugin.stop?.();
    writeSetting("GreetingCustomizer", "heroOnlyOutsideProject");
    writeSetting("GreetingCustomizer", "index");
    document.body.replaceChildren();
    history.pushState(null, "", "/");
    checkRoute();
});

describe("GreetingCustomizer project split", () => {
    test("keeps the project title and puts the first line in the composer", () => {
        history.pushState(null, "", "/g/g-p-0123abcd-trip/project");
        checkRoute();
        document.body.innerHTML = '<main><h1>Trip</h1><form><div class="ProseMirror" contenteditable="true"><p></p></div></form></main>';
        plugin.start?.();
        expect(document.querySelector("h1")?.getAttribute("data-bloom-text")).toBeNull();
        expect(document.querySelector(".ProseMirror")?.getAttribute("data-bloom-placeholder")).toBe("Ask not what your country can do for you — ask what you can do for your country.");
    });

    test("replaces the home heading and leaves the composer alone", () => {
        history.pushState(null, "", "/");
        checkRoute();
        document.body.innerHTML = '<main><h1 class="home-heading">What can I help with?</h1><form><div class="ProseMirror" contenteditable="true"><p></p></div></form></main>';
        plugin.start?.();
        expect(document.querySelector("h1")?.hasAttribute("data-bloom-text")).toBe(true);
        expect(document.querySelector("[data-bloom-placeholder]")).toBeNull();
    });

    test("can also replace the home composer when asked", () => {
        writeSetting("GreetingCustomizer", "heroOnlyOutsideProject", false);
        writeSetting("GreetingCustomizer", "index", 0);
        history.pushState(null, "", "/");
        checkRoute();
        document.body.innerHTML = '<main><h1>What can I help with?</h1><form><div class="ProseMirror" contenteditable="true"><p></p></div></form></main>';
        plugin.start?.();
        expect(document.querySelector("[data-bloom-placeholder]")?.getAttribute("data-bloom-placeholder")?.length).toBeGreaterThan(0);
    });
});
