/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { afterEach, describe, expect, test } from "bun:test";

import { distToRect, facingCorners, hoverIntent, pointInTriangle } from "../src/utils/hoverFlyout";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel: string) => readFileSync(join(root, rel), "utf8");
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

afterEach(() => {
    document.body.replaceChildren();
});

describe("hover geometry", () => {
    test("a point on the edge counts as inside the triangle", () => {
        expect(pointInTriangle({ x: 1, y: 1 }, { x: 0, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 2 })).toBe(true);
        expect(pointInTriangle({ x: 1, y: 0 }, { x: 0, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 2 })).toBe(true);
        expect(pointInTriangle({ x: 3, y: 3 }, { x: 0, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 2 })).toBe(false);
    });

    test("facing corners pick the panel edge that faces the trigger", () => {
        const rail = new DOMRect(400, 80, 32, 120);
        const toc = new DOMRect(80, 40, 288, 200);
        const [a, b] = facingCorners(rail, toc);
        expect(a.x).toBe(368);
        expect(b.x).toBe(368);
        expect([a.y, b.y].toSorted((left, right) => left - right)).toEqual([40, 240]);
        const toggle = new DOMRect(900, 8, 36, 36);
        const list = new DOMRect(700, 50, 288, 160);
        const [c, d] = facingCorners(toggle, list);
        expect(c.y).toBe(50);
        expect(d.y).toBe(50);
    });

    test("distance to a rect is zero when the point is inside", () => {
        const box = new DOMRect(10, 10, 20, 20);
        expect(distToRect({ x: 15, y: 15 }, box)).toBe(0);
        expect(distToRect({ x: 40, y: 20 }, box)).toBe(10);
    });
});

describe("hoverIntent", () => {
    test("holds while the pointer crosses toward the panel and drops when it turns away", async () => {
        const trigger = document.createElement("div");
        const panel = document.createElement("div");
        document.body.append(trigger, panel);
        trigger.getBoundingClientRect = () => new DOMRect(400, 80, 32, 120);
        panel.getBoundingClientRect = () => new DOMRect(80, 40, 288, 200);
        const seen: boolean[] = [];
        const intent = hoverIntent({
            over: node => node === trigger || node === panel,
            trigger: () => trigger,
            panel: () => panel,
            setHeld: held => seen.push(held),
            closeDelay: 20,
            towardDelay: 80,
        });
        intent.leave({ clientX: 400, clientY: 120, relatedTarget: null, target: document.body });
        expect(seen).toEqual([true]);
        document.dispatchEvent(new PointerEvent("pointermove", { clientX: 380, clientY: 130, bubbles: true }));
        expect(seen).toEqual([true]);
        document.dispatchEvent(new PointerEvent("pointermove", { clientX: 520, clientY: 120, bubbles: true }));
        expect(seen).toEqual([true, false]);
        intent.dispose();
    });

    test("releases after the close delay when the pointer leaves and stays put", async () => {
        const trigger = document.createElement("div");
        const panel = document.createElement("div");
        document.body.append(trigger, panel);
        trigger.getBoundingClientRect = () => new DOMRect(400, 80, 32, 120);
        panel.getBoundingClientRect = () => new DOMRect(80, 40, 288, 200);
        let held = false;
        const intent = hoverIntent({
            over: node => node === trigger || node === panel,
            trigger: () => trigger,
            panel: () => panel,
            setHeld: on => {
                held = on;
            },
            closeDelay: 20,
            towardDelay: 80,
        });
        intent.leave({ clientX: 430, clientY: 200, relatedTarget: null, target: document.body });
        expect(held).toBe(true);
        await wait(50);
        expect(held).toBe(false);
        intent.dispose();
    });
});

describe("flyout CSS bridges", () => {
    test("BetterNavigator keeps the outline open across the rail gap", () => {
        const styles = read("src/plugins/betterNavigator/styles.css");
        expect(styles).toContain(".bloom-nav-bridge");
        expect(styles).toContain(".bloom-nav-root:is(:hover, .bloom-nav-open) .bloom-nav-toc");
        expect(styles).not.toContain(".bloom-nav-root:hover .bloom-nav-toc {");
    });

    test("StarChats stretches a bridge from the header star to the list", () => {
        const styles = read("src/plugins/starChats/styles.css");
        expect(styles).toContain(".bloom-star-chats-bridge");
        expect(styles).toContain("[data-place=\"below\"]");
        expect(styles).toContain("color: var(--bloom-fg-3)");
    });

    test("the settings hover entry takes the pointer while it is showing", () => {
        const styles = read("src/plugins/_core/settings/styles.css");
        expect(styles).toContain(".bloom-entry-hover:is(:hover, :has(~ :hover))");
        expect(styles).toContain("pointer-events: auto");
        expect(styles).toContain(".bloom-entry-hover .bloom-entry-button::after");
        expect(styles).toContain("color: var(--bloom-fg-3)");
    });
});
