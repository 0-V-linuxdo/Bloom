/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * URL + mapping/window chain checks for host harvest.
 * Run: node --experimental-strip-types scripts/harvest-chain-test.ts
 */

import assert from "node:assert/strict";
import {
    chainFromPayload,
    idFromApiUrl,
    isConversationGet,
    isConversationList,
    isWindowedConversationGet,
    mergeConversationChain,
} from "../src/host/conversationChain.ts";

const LIST = "https://chatgpt.com/backend-api/conversations?offset=0&limit=28&order=updated";
const LIST_SLASH = "https://chatgpt.com/backend-api/conversations/";
const WINDOW = "https://chatgpt.com/backend-api/conversations/aaaabbbb-cccc-dddd-eeee-ffff00001111?include_has_versions=true&num_turns=10";
const SINGULAR = "https://chatgpt.com/backend-api/conversation/aaaabbbb-cccc-dddd-eeee-ffff00001111";
const F_SINGULAR = "https://chatgpt.com/backend-api/f/conversation/aaaabbbb-cccc-dddd-eeee-ffff00001111";
const ID = "aaaabbbb-cccc-dddd-eeee-ffff00001111";

assert.equal(isConversationList(LIST), true);
assert.equal(isConversationList(LIST_SLASH), true);
assert.equal(isConversationList(WINDOW), false);
assert.equal(isConversationList(SINGULAR), false);

assert.equal(isConversationGet(WINDOW, "GET"), true);
assert.equal(isConversationGet(SINGULAR, "GET"), true);
assert.equal(isConversationGet(F_SINGULAR, "GET"), true);
assert.equal(isConversationGet(LIST, "GET"), false);
assert.equal(isConversationGet(WINDOW, "POST"), false);

assert.equal(isWindowedConversationGet(WINDOW), true);
assert.equal(isWindowedConversationGet(SINGULAR), false);
assert.equal(isWindowedConversationGet(LIST), false);

assert.equal(idFromApiUrl(WINDOW), ID);
assert.equal(idFromApiUrl(SINGULAR), ID);
assert.equal(idFromApiUrl(F_SINGULAR), ID);
assert.equal(idFromApiUrl(LIST), "");

const mapping = {
    title: "Long chat",
    conversation_id: ID,
    current_node: "a2",
    mapping: {
        root: { id: "root", parent: null, children: ["u1"], message: null },
        u1: {
            id: "u1",
            parent: "root",
            children: ["a1"],
            message: { id: "mu1", author: { role: "user" }, content: { content_type: "text", parts: ["first user"] } },
        },
        a1: {
            id: "a1",
            parent: "u1",
            children: ["u2"],
            message: { id: "ma1", author: { role: "assistant" }, content: { content_type: "text", parts: ["first answer"] } },
        },
        u2: {
            id: "u2",
            parent: "a1",
            children: ["a2"],
            message: { id: "mu2", author: { role: "user" }, content: { content_type: "text", parts: ["second user"] } },
        },
        a2: {
            id: "a2",
            parent: "u2",
            children: [],
            message: { id: "ma2", author: { role: "assistant" }, content: { content_type: "text", parts: ["second answer"] } },
        },
    },
};

const path = chainFromPayload(mapping);
assert.deepEqual(path.map(t => t.id), ["mu1", "ma1", "mu2", "ma2"]);
assert.equal(path[0].alias, "u1");
assert.equal(path[0].text, "first user");
assert.equal(path[1].role, "assistant");

const wrapped = chainFromPayload({ conversation: mapping });
assert.deepEqual(wrapped.map(t => t.id), path.map(t => t.id));

const windowTurns = chainFromPayload({
    conversation_id: ID,
    turns: [
        { id: "u2", message: { id: "mu2", author: { role: "user" }, content: { parts: ["second user"] } } },
        { id: "a2", message: { id: "ma2", author: { role: "assistant" }, content: { parts: ["second answer"] } } },
    ],
});
assert.deepEqual(windowTurns.map(t => t.id), ["mu2", "ma2"]);

const recent = path.slice(2);
const early = path.slice(0, 3);
const merged = mergeConversationChain(recent, early);
assert.deepEqual(merged.map(t => t.id), ["mu1", "ma1", "mu2", "ma2"]);

const fromFull = mergeConversationChain(recent, path);
assert.deepEqual(fromFull.map(t => t.id), path.map(t => t.id));

const same = mergeConversationChain(path, path.slice(-2));
assert.deepEqual(same.map(t => t.id), path.map(t => t.id));

console.log("harvest-chain-test: ok");
