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
    isTruncatedPayload,
    isWindowedConversationGet,
    mergeConversationChain,
    oldestNodeId,
    payloadCompletesChain,
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

const noisy = {
    conversation_id: ID,
    current_node: "final",
    mapping: {
        root: { id: "root", parent: null, children: ["sys"], message: null },
        sys: {
            id: "sys",
            parent: "root",
            children: ["u1"],
            message: {
                id: "msys",
                author: { role: "user" },
                metadata: { is_visually_hidden_from_conversation: true, is_user_system_message: true },
                content: { content_type: "text", parts: ["hidden context"] },
            },
        },
        u1: {
            id: "u1",
            parent: "sys",
            children: ["thought"],
            message: { id: "mu1", author: { role: "user" }, content: { content_type: "text", parts: ["ask"] } },
        },
        thought: {
            id: "thought",
            parent: "u1",
            children: ["tool"],
            message: {
                id: "mthought",
                author: { role: "assistant" },
                channel: "commentary",
                content: { content_type: "thoughts", parts: ["planning"] },
            },
        },
        tool: {
            id: "tool",
            parent: "thought",
            children: ["tout"],
            message: {
                id: "mtool",
                author: { role: "assistant" },
                recipient: "python",
                content: { content_type: "code", parts: ["print(1)"] },
            },
        },
        tout: {
            id: "tout",
            parent: "tool",
            children: ["final"],
            message: {
                id: "mtout",
                author: { role: "tool" },
                content: { content_type: "execution_output", parts: ["1"] },
            },
        },
        final: {
            id: "final",
            parent: "tout",
            children: [],
            message: {
                id: "mfinal",
                author: { role: "assistant" },
                recipient: "all",
                channel: "final",
                end_turn: true,
                content: { content_type: "text", parts: ["done"] },
            },
        },
    },
};

const visible = chainFromPayload(noisy);
assert.deepEqual(visible.map(t => [t.id, t.role, t.text]), [
    ["mu1", "user", "ask"],
    ["mfinal", "assistant", "done"],
]);

const twoReplies = {
    conversation_id: ID,
    current_node: "a2",
    mapping: {
        root: { id: "root", parent: null, children: ["u1"], message: null },
        u1: {
            id: "u1",
            parent: "root",
            children: ["a1"],
            message: { id: "mu1", author: { role: "user" }, content: { parts: ["one"] } },
        },
        a1: {
            id: "a1",
            parent: "u1",
            children: ["hidden"],
            message: { id: "ma1", author: { role: "assistant" }, content: { parts: ["first"] } },
        },
        hidden: {
            id: "hidden",
            parent: "a1",
            children: ["a2"],
            message: {
                id: "mhid",
                author: { role: "user" },
                metadata: { is_visually_hidden_from_conversation: true },
                content: { parts: ["bridge"] },
            },
        },
        a2: {
            id: "a2",
            parent: "hidden",
            children: [],
            message: { id: "ma2", author: { role: "assistant" }, content: { parts: ["second"] } },
        },
    },
};
const split = chainFromPayload(twoReplies);
assert.deepEqual(split.map(t => t.id), ["mu1", "ma1", "ma2"]);

const windowNoise = chainFromPayload({
    conversation_id: ID,
    turns: [
        { id: "u1", message: { id: "mu1", author: { role: "user" }, content: { parts: ["ask"] } } },
        { id: "th", message: { id: "mth", author: { role: "assistant" }, channel: "commentary", content: { content_type: "thoughts", parts: ["plan"] } } },
        { id: "a1", message: { id: "ma1", author: { role: "assistant" }, recipient: "all", channel: "final", end_turn: true, content: { parts: ["done"] } } },
    ],
});
assert.deepEqual(windowNoise.map(t => t.id), ["mu1", "ma1"]);

const longMap: Record<string, unknown> = {
    root: { id: "root", parent: null, children: ["u0"], message: null },
};
let prev = "root";
const expectLong: string[] = [];
for (let i = 0; i < 12; i++) {
    const uid = `u${i}`;
    const aid = `a${i}`;
    const next = i === 11 ? [] : [`u${i + 1}`];
    longMap[uid] = {
        id: uid,
        parent: prev,
        children: [aid],
        message: { id: `mu${i}`, author: { role: "user" }, content: { parts: [`user ${i}`] } },
    };
    longMap[aid] = {
        id: aid,
        parent: uid,
        children: next,
        message: { id: `ma${i}`, author: { role: "assistant" }, content: { parts: [`answer ${i}`] } },
    };
    expectLong.push(`mu${i}`, `ma${i}`);
    prev = aid;
}
const long = chainFromPayload({ conversation_id: ID, current_node: "a11", mapping: longMap });
assert.deepEqual(long.map(t => t.id), expectLong);
assert.equal(long[0].text, "user 0");
assert.equal(long[1].text, "answer 0");

const noChannel = chainFromPayload({
    conversation_id: ID,
    current_node: "a1",
    mapping: {
        root: { id: "root", parent: null, children: ["u1"], message: null },
        u1: {
            id: "u1",
            parent: "root",
            children: ["a1"],
            message: { id: "mu1", author: { role: "user" }, content: { parts: ["old user"] } },
        },
        a1: {
            id: "a1",
            parent: "u1",
            children: [],
            message: { id: "ma1", author: { role: "assistant" }, content: { parts: ["old answer"] } },
        },
    },
});
assert.deepEqual(noChannel.map(t => t.id), ["mu1", "ma1"]);

const cut = {
    conversation_id: ID,
    current_node: "a2",
    mapping: {
        u2: {
            id: "u2",
            parent: "a1",
            children: ["a2"],
            message: { id: "mu2", author: { role: "user" }, content: { parts: ["later"] } },
        },
        a2: {
            id: "a2",
            parent: "u2",
            children: [],
            message: { id: "ma2", author: { role: "assistant" }, content: { parts: ["later answer"] } },
        },
    },
};
assert.equal(isTruncatedPayload(cut), true);
assert.equal(oldestNodeId(cut), "u2");
assert.equal(payloadCompletesChain(cut, WINDOW), false);
assert.equal(payloadCompletesChain(mapping, SINGULAR), true);
assert.equal(payloadCompletesChain(mapping, WINDOW), false);
assert.equal(payloadCompletesChain({ conversation_id: ID, current_node: "a11", mapping: longMap }, WINDOW), false);

const later = [
    { id: "c", role: "user" as const, text: "c", at: 300 },
    { id: "d", role: "assistant" as const, text: "d", at: 400 },
];
const earlier = [
    { id: "a", role: "user" as const, text: "a", at: 100 },
    { id: "b", role: "assistant" as const, text: "b", at: 200 },
];
assert.deepEqual(mergeConversationChain(later, earlier).map(t => t.id), ["a", "b", "c", "d"]);

console.log("harvest-chain-test: ok");
