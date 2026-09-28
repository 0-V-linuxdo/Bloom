/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Short Thinking / Working labels must count as live generate.
 * A paragraph that mentions the words must not. Helium's Thinking
 * dropdown is icon + label + chevron — the label text is still
 * "Thinking".
 * Run: node --experimental-strip-types scripts/think-status-test.ts
 */

import assert from "node:assert/strict";
import { isLiveThinkFlags, isThinkStatusText } from "../src/host/thinkStatus.ts";

assert.equal(isThinkStatusText("Thinking"), true);
assert.equal(isThinkStatusText("thinking"), true);
assert.equal(isThinkStatusText("Pro thinking"), true);
assert.equal(isThinkStatusText("Working"), true);
assert.equal(isThinkStatusText("正在思考"), true);
assert.equal(isThinkStatusText("思考中"), true);
assert.equal(isThinkStatusText("Thinking…"), true);
assert.equal(isThinkStatusText("Working 12s"), true);
assert.equal(isThinkStatusText("  Thinking  "), true);

assert.equal(isThinkStatusText(""), false);
assert.equal(isThinkStatusText("Resumed from 237/434 saved units and continuing"), false);
assert.equal(isThinkStatusText("I was thinking about the translation"), false);
assert.equal(isThinkStatusText("thought for 4s"), false);

assert.equal(isLiveThinkFlags({ text: "Thinking", ariaExpanded: "true" }), true);
assert.equal(isLiveThinkFlags({ text: "Thinking", ariaBusy: "true" }), true);
assert.equal(isLiveThinkFlags({ text: "Working", detailsOpen: true }), true);
assert.equal(isLiveThinkFlags({ ariaLabel: "Thinking", hasSpinner: true }), true);
assert.equal(isLiveThinkFlags({ text: "Thinking", ariaExpanded: "false" }), false);
assert.equal(isLiveThinkFlags({ text: "Thinking" }), false);
assert.equal(isLiveThinkFlags({ text: "I was thinking about the translation", ariaExpanded: "true" }), false);

console.log("think-status-test: ok");
