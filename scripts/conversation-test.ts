/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Path `/g/{gizmo}/c/{id}` is a real conversation. Only `/` and `/g/{gizmo}`
 * (no /c/) are draft landings. Token flicker on GPT chats must not look
 * like a switch (ChatStateFavicons).
 * Run: node --experimental-strip-types scripts/conversation-test.ts
 */

import assert from "node:assert/strict";
import { conversationIdFromHref, isDraftLandingPath } from "../src/host/conversation.ts";

const GPT = "/g/g-6a9b1ffbb5b08191ab1ffc6a825a4fdc-epub-translator";
const GPT_CHAT = `${GPT}/c/6ab9f1d0-0230-83e9-be81-d5ff277e07b5`;
const CHAT = "/c/6ab9f1d0-0230-83e9-be81-d5ff277e07b5";
const ID = "6ab9f1d0-0230-83e9-be81-d5ff277e07b5";

assert.equal(isDraftLandingPath("/"), true);
assert.equal(isDraftLandingPath(""), true);
assert.equal(isDraftLandingPath("/g"), true);
assert.equal(isDraftLandingPath("/g/"), true);
assert.equal(isDraftLandingPath(GPT), true);
assert.equal(isDraftLandingPath(`${GPT}/`), true);
assert.equal(isDraftLandingPath("/g/g-p-abc/project"), true);

assert.equal(isDraftLandingPath(CHAT), false);
assert.equal(isDraftLandingPath(`${CHAT}/`), false);
assert.equal(isDraftLandingPath(GPT_CHAT), false);
assert.equal(isDraftLandingPath(`${GPT_CHAT}/`), false);
assert.equal(isDraftLandingPath(`https://chatgpt.com${GPT}`), true);
assert.equal(isDraftLandingPath(`https://chatgpt.com${GPT_CHAT}`), false);

assert.equal(conversationIdFromHref(CHAT), ID);
assert.equal(conversationIdFromHref(GPT_CHAT), ID);
assert.equal(conversationIdFromHref(`https://chatgpt.com${GPT_CHAT}`), ID);
assert.equal(conversationIdFromHref(GPT), "");
assert.equal(conversationIdFromHref("/"), "");

console.log("conversation-test: ok");
