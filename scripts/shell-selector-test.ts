/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Host selector unions must keep the 2026-09 rail and the older
 * stage-slideover layout. SVG sprite ids are not mounts.
 * Run: node --experimental-strip-types scripts/shell-selector-test.ts
 */

import assert from "node:assert/strict";
import {
    ASSISTANT_TURN_SEL,
    COMPOSER_FORM_SEL,
    EDITOR_SEL,
    MESSAGE_NODE_SEL,
    PROFILE_SEL,
    RAIL_SEL,
    RECENTS_SEL,
    SIDEBAR_SEL,
    THREAD_SEL,
    TURN_SEL,
    messageIdsOf,
    primaryMessageId,
} from "../src/host/shell.ts";

assert.match(SIDEBAR_SEL, /stage-slideover-sidebar/);
assert.match(SIDEBAR_SEL, /data-app-action-sidebar-scroll/);
assert.match(SIDEBAR_SEL, /desktop-app-shell/);
assert.match(RAIL_SEL, /stage-sidebar-tiny-bar/);
assert.match(RAIL_SEL, /data-app-navigation-rail/);
assert.match(EDITOR_SEL, /#prompt-textarea/);
assert.match(EDITOR_SEL, /mobile-composer-prompt/);
assert.match(EDITOR_SEL, /textarea\[name="prompt"\]/);
assert.match(COMPOSER_FORM_SEL, /unified-composer/);
assert.match(COMPOSER_FORM_SEL, /textarea\[name="prompt"\]/);
assert.match(THREAD_SEL, /#thread/);
assert.match(THREAD_SEL, /data-chatgpt-conversation-selection-target/);
assert.match(TURN_SEL, /conversation-turn/);
assert.match(TURN_SEL, /data-chatgpt-search-message-ids/);
assert.match(MESSAGE_NODE_SEL, /data-message-id/);
assert.match(MESSAGE_NODE_SEL, /data-chatgpt-search-message-ids/);
assert.match(ASSISTANT_TURN_SEL, /data-message-author-role="assistant"/);
assert.match(PROFILE_SEL, /accounts-profile-button/);
assert.match(RECENTS_SEL, /href\^="\/c\/"/);
assert.equal(EDITOR_SEL.includes("lightweight-"), false);
assert.equal(SIDEBAR_SEL.includes("lightweight-"), false);
assert.equal(RAIL_SEL.includes("lightweight-"), false);

const fake = {
    getAttribute(name: string) {
        if (name === "data-message-id") return "aaa";
        if (name === "data-chatgpt-search-message-ids") return "aaa bbb";
        return null;
    },
    querySelector() {
        return null;
    },
} as unknown as Element;

assert.deepEqual(messageIdsOf(fake), ["aaa", "bbb"]);
assert.equal(primaryMessageId(fake), "bbb");

console.log("shell-selector-test: ok");
