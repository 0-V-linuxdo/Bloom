/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { afterEach, describe, expect, test } from "bun:test";

import plugin from "../src/plugins/streamerMode";

const css = () => (typeof plugin.styles === "function" ? plugin.styles() : plugin.styles);

describe("StreamerMode hover lift", () => {
    afterEach(() => {
        Object.assign(globalThis, { BLOOM_APP: false });
    });

    test("row :hover is a subject, so a title that is the row unblurs", () => {
        const styles = css();
        expect(styles).toContain("[data-app-action-sidebar-thread-row]:hover,");
        expect(styles).toContain("[data-app-action-sidebar-project-row]:hover,");
        expect(styles).toContain("[data-bloom-streamer-open]");
    });

    test("app headerTitle does not paint blur on sidebar title nodes", () => {
        Object.assign(globalThis, { BLOOM_APP: true });
        expect(css()).toContain("[data-thread-title]:not([data-app-action-sidebar-thread-row] *, [data-app-action-sidebar-project-row] *)");
        expect(css()).not.toMatch(/:is\(\[data-thread-title\],\[data-thread-title-trigger\]\)\{[^}]*blur\(6px\)/);
    });
});
