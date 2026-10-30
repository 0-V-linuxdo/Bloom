/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { afterEach, describe, expect, test } from "bun:test";

import { bindBloom, retireBloom, sweepBloomChrome } from "../src/utils/instance";
import { pageWindow } from "../src/utils/misc";

type Holder = { Bloom?: unknown; __bloomHost?: unknown };

afterEach(() => {
    const host = pageWindow as unknown as Holder;
    delete host.Bloom;
    delete host.__bloomHost;
    document.body.replaceChildren();
});

describe("Bloom instance slot", () => {
    test("retireBloom stops the slotted host after window.Bloom was deleted", () => {
        let stopped = 0;
        bindBloom({ VERSION: "2.0.87", destroy: () => { stopped++; } });
        delete (pageWindow as Holder).Bloom;
        retireBloom();
        expect(stopped).toBe(1);
    });

    test("sweepBloomChrome removes leftover navigator and marks", () => {
        const nav = document.createElement("div");
        nav.setAttribute("data-bloom", "navigator");
        const hud = document.createElement("div");
        hud.setAttribute("data-bloom", "history-hud");
        const dialog = document.createElement("div");
        dialog.setAttribute("data-bloom", "history-dialog");
        const entry = document.createElement("div");
        entry.setAttribute("data-bloom", "entry");
        const menu = document.createElement("div");
        menu.setAttribute("data-bloom", "menu-entry");
        const cls = document.createElement("span");
        cls.setAttribute("data-bloom", "cls");
        const stamp = document.createElement("time");
        stamp.setAttribute("data-bloom", "timestamp");
        const greet = document.createElement("h1");
        greet.setAttribute("data-bloom-greeting", "");
        greet.setAttribute("data-bloom-text", "hi");
        greet.style.setProperty("--bloom-text", "\"hi\"");
        document.body.append(nav, hud, dialog, entry, menu, cls, stamp, greet);
        sweepBloomChrome();
        expect(document.querySelector("[data-bloom=navigator]")).toBeNull();
        expect(document.querySelector("[data-bloom=history-hud]")).toBeNull();
        expect(document.querySelector("[data-bloom=history-dialog]")).toBeNull();
        expect(document.querySelector("[data-bloom=entry]")).toBeNull();
        expect(document.querySelector("[data-bloom=menu-entry]")).toBeNull();
        expect(document.querySelector("[data-bloom=cls]")).toBeNull();
        expect(document.querySelector("[data-bloom=timestamp]")).toBeNull();
        expect(document.querySelector("[data-bloom-greeting]")).toBeNull();
        expect(document.querySelector("[data-bloom-text]")).toBeNull();
        expect(greet.style.getPropertyValue("--bloom-text")).toBe("");
    });
});
