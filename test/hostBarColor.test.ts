/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, test } from "bun:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel: string) => readFileSync(join(root, rel), "utf8");

describe("host bar colors", () => {
    test("Bloom tokens fall back through host and app color variables", () => {
        const baseCss = read("src/components/base.css");
        expect(baseCss).toContain("--color-text-tertiary");
        expect(baseCss).toContain("--app-color-text-foreground-tertiary");
        expect(baseCss).toContain("--app-color-background-button-secondary-hover");
    });

    test("action-bar stars rest on the host tertiary token", () => {
        const styles = read("src/plugins/starChats/styles.css");
        expect(styles).toContain("color: var(--bloom-fg-3)");
        expect(styles).toContain("#ff7a17");
    });

    test("the rail Bloom entry rests on the host tertiary token", () => {
        const styles = read("src/plugins/_core/settings/styles.css");
        expect(styles).toContain(".bloom-entry-rail .bloom-entry-button");
        expect(styles).toContain("color: var(--bloom-fg-3)");
    });
});
