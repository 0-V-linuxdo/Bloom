/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { describe, expect, test } from "bun:test";

import { overlayText } from "../src/utils/dom";

describe("overlayText", () => {
    test("paints spaces through a CSS string, not attr()", () => {
        const el = document.createElement("h1");
        overlayText(el, "Ask not what your country can do for you");
        expect(el.getAttribute("data-bloom-text")).toBe("Ask not what your country can do for you");
        expect(el.style.getPropertyValue("--bloom-text")).toBe("\"Ask\\00a0 not\\00a0 what\\00a0 your\\00a0 country\\00a0 can\\00a0 do\\00a0 for\\00a0 you\"");
        overlayText(el, null);
        expect(el.hasAttribute("data-bloom-text")).toBe(false);
        expect(el.style.getPropertyValue("--bloom-text")).toBe("");
    });
});
