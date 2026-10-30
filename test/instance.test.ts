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
        const greet = document.createElement("h1");
        greet.setAttribute("data-bloom-greeting", "");
        document.body.append(nav, hud, greet);
        sweepBloomChrome();
        expect(document.querySelector("[data-bloom=navigator]")).toBeNull();
        expect(document.querySelector("[data-bloom=history-hud]")).toBeNull();
        expect(document.querySelector("[data-bloom-greeting]")).toBeNull();
    });
});
