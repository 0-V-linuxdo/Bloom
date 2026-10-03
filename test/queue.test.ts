/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { afterEach, beforeAll, describe, expect, test } from "bun:test";

import { registerPlugins } from "../src/api/PluginManager";
import { writeSetting } from "../src/api/Settings";
import { generation, startGeneration } from "../src/host/generation";
import { checkRoute } from "../src/host/route";
import plugin from "../src/plugins/promptQueue";

const CHAT = "/c/aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";

beforeAll(() => {
    HTMLElement.prototype.getClientRects = function () {
        return (this.isConnected ? [new DOMRect(0, 0, 120, 40)] : []) as unknown as DOMRectList;
    };
    startGeneration();
    registerPlugins([plugin]);
});

afterEach(() => {
    plugin.stop?.();
    document.body.replaceChildren();
    history.pushState(null, "", "/");
    checkRoute();
    sessionStorage.removeItem("BloomPromptQueue");
    sessionStorage.removeItem("BloomPromptQueueTab");
    localStorage.removeItem("BloomPromptQueue");
    localStorage.removeItem("BloomPromptQueueClaim");
    writeSetting("PromptQueue", "persistAcrossRefresh");
    writeSetting("PromptQueue", "showQueueMode");
});

const shell = () => {
    document.body.innerHTML = '<form><textarea name="prompt"></textarea><button aria-label="Send">Send</button></form>';
};

describe("PromptQueue model and refresh", () => {
    test("restores a stored model chip and a plain string", async () => {
        sessionStorage.setItem("BloomPromptQueue", JSON.stringify({
            "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa": ["plain", { text: "with model", model: "gpt-5-4", label: "GPT-5.4" }],
        }));
        history.pushState(null, "", CHAT);
        checkRoute();
        shell();
        plugin.start?.();
        await new Promise(resolve => setTimeout(resolve, 50));
        const rows = [...document.querySelectorAll(".bloom-queue-text")].map(el => el.textContent);
        expect(rows).toEqual(["plain", "with model"]);
        expect(document.querySelector(".bloom-queue-model")?.textContent).toBe("GPT-5.4");
    });

    test("does not restore when persist is off", async () => {
        writeSetting("PromptQueue", "persistAcrossRefresh", false);
        sessionStorage.setItem("BloomPromptQueue", JSON.stringify({
            "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa": ["kept"],
        }));
        history.pushState(null, "", CHAT);
        checkRoute();
        shell();
        plugin.start?.();
        await new Promise(resolve => setTimeout(resolve, 50));
        expect(document.querySelector(".bloom-queue-tray")).toBeNull();
        expect(sessionStorage.getItem("BloomPromptQueue")).toBeNull();
    });

    test("restores a queue saved in this browser when the tab has no session copy", async () => {
        localStorage.setItem("BloomPromptQueue", JSON.stringify({
            "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa": [{ text: "from the browser", model: "", label: "" }],
        }));
        history.pushState(null, "", CHAT);
        checkRoute();
        shell();
        plugin.start?.();
        await new Promise(resolve => setTimeout(resolve, 50));
        expect(document.querySelector(".bloom-queue-text")?.textContent).toBe("from the browser");
        expect(sessionStorage.getItem("BloomPromptQueue")).toContain("from the browser");
    });

    test("shows a queue another tab saved and does not send it while that tab owns it", async () => {
        history.pushState(null, "", CHAT);
        checkRoute();
        shell();
        plugin.start?.();
        await new Promise(resolve => setTimeout(resolve, 20));
        localStorage.setItem("BloomPromptQueueClaim", JSON.stringify({ tab: "other-tab", at: Date.now(), key: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa" }));
        window.dispatchEvent(new StorageEvent("storage", {
            key: "BloomPromptQueue",
            newValue: JSON.stringify({ "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa": [{ text: "other tab", model: "", label: "" }] }),
        }));
        generation.emit("fall", { conversationId: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", outcome: "done" });
        await new Promise(resolve => setTimeout(resolve, 50));
        expect(document.querySelector(".bloom-queue-text")?.textContent).toBe("other tab");
        expect(document.querySelector("textarea")?.value).toBe("");
    });
});
