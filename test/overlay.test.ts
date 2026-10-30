/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { afterEach, describe, expect, test } from "bun:test";

import { mountOverlay, promoteOverlay } from "../src/utils/overlay";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel: string) => readFileSync(join(root, rel), "utf8");

afterEach(() => {
    document.body.replaceChildren();
});

describe("overlay stacking", () => {
    test("mountOverlay appends to body and opens a manual popover when the API exists", () => {
        const el = document.createElement("div");
        mountOverlay(el);
        expect(el.parentNode).toBe(document.body);
        if (typeof el.showPopover !== "function") return;
        expect(el.getAttribute("popover")).toBe("manual");
        expect(el.matches(":popover-open")).toBe(true);
    });

    test("promoteOverlay drops the popover attribute when showPopover fails", () => {
        const el = document.createElement("div");
        document.body.append(el);
        const original = el.showPopover;
        el.showPopover = () => {
            throw new Error("nope");
        };
        promoteOverlay(el);
        if (typeof original === "function") expect(el.hasAttribute("popover")).toBe(false);
        el.showPopover = original;
    });

    test("Bloom overlays share one z scale and hide the app pane resizer under modal overlays", () => {
        const base = read("src/components/base.css");
        expect(base).toContain("--bloom-z-overlay: 2147483000");
        expect(base).toContain("--bloom-z-tooltip: 2147483647");
        expect(base).toContain("[popover][class*=\"panel-resizer\"]");
        expect(base).toContain("[data-bloom=\"settings\"]");
        expect(read("src/plugins/_core/settings/styles.css")).toContain("z-index: var(--bloom-z-overlay)");
        expect(read("src/plugins/betterNavigator/styles.css")).toContain("z-index: var(--bloom-z-chrome)");
        expect(read("src/plugins/starChats/styles.css")).toContain("z-index: var(--bloom-z-float)");
    });
});
