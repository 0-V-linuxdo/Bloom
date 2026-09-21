/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * String + structure checks for CustomSidebarIdentity face picking.
 * Run: node --experimental-strip-types scripts/csi-face-test.ts
 */

import assert from "node:assert/strict";
import { isInitialsText, isPlanLabel, looksLikeAvatarClass } from "../src/plugins/customSidebarIdentity/face.ts";

assert.equal(isInitialsText("18"), true);
assert.equal(isInitialsText("P"), true);
assert.equal(isInitialsText("  AB  "), true);
assert.equal(isInitialsText("Proffero"), false);
assert.equal(isInitialsText(""), false);
assert.equal(isInitialsText("Pro"), false);
assert.equal(isPlanLabel("Pro"), true);
assert.equal(isPlanLabel("plus"), true);
assert.equal(isPlanLabel("18"), false);

assert.equal(looksLikeAvatarClass("rounded-full"), true);
assert.equal(looksLikeAvatarClass("flex h-8 w-8 items-center justify-center overflow-hidden"), true);
assert.equal(looksLikeAvatarClass("size-6"), true);
assert.equal(looksLikeAvatarClass("size-8 relative"), true);
assert.equal(looksLikeAvatarClass("size-60"), false);
assert.equal(looksLikeAvatarClass("min-w-0 truncate"), false);
assert.equal(looksLikeAvatarClass("text-xs"), false);

console.log("csi-face-test: ok");
