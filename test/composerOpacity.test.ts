/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { afterEach, beforeAll, describe, expect, test } from "bun:test";

import { registerPlugins } from "../src/api/PluginManager";
import { writeSetting } from "../src/api/Settings";
import plugin from "../src/plugins/composerOpacity";

const css = () => (typeof plugin.styles === "function" ? plugin.styles() : plugin.styles);

describe("ComposerOpacity", () => {
    beforeAll(() => {
        registerPlugins([plugin]);
    });

    afterEach(() => {
        writeSetting("ComposerOpacity", "opacity");
        Object.assign(globalThis, { BLOOM_APP: false });
    });

    test("app host tints the pill surface variables and does not clip the root", () => {
        Object.assign(globalThis, { BLOOM_APP: true });
        writeSetting("ComposerOpacity", "opacity", 40);
        const styles = css();
        expect(styles).toContain("--composer-layout-surface-background:");
        expect(styles).toContain("--composer-layout-surface-backdrop-filter:");
        expect(styles).not.toContain("overflow:clip");
        expect(styles).not.toContain("composer-fill");
        expect(styles).not.toContain("position:absolute");
    });
});
