/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { readDraft, submitComposer, writeDraft } from "@host/composer";
import { generation, generationState } from "@host/generation";
import { currentConversationId } from "@host/route";
import { Sel } from "@host/selectors";
import { nextFrame, visible } from "@utils/dom";
import definePlugin, { OptionType } from "@utils/types";

const STABLE_MS = 1200;
const SEND_RETRY_MS = 150;
const SEND_ATTEMPTS = 20;
const MAX_BURST = 6;
const DEFAULT_PROMPT = "continue where you left";
const TERMINAL = /message delivery timed out|please try again/i;
const WAITING = /waiting for the complete answer/i;

const settings = definePluginSettings({
    prompt: { type: OptionType.STRING, description: "Sent when a reply stops on a delivery error.", default: DEFAULT_PROMPT, placeholder: DEFAULT_PROMPT },
});

let unsubscribers: (() => void)[] = [];
let session = 0;
let held = false;
let burst = 0;
let handled = "";
let seen = "";
let seenAt = 0;
let sending = false;

const promptText = () => settings.store.prompt.trim() || DEFAULT_PROMPT;

function terminalNotice() {
    const text = (visible(Sel.recovery)?.textContent ?? "").replaceAll(/\s+/g, " ").trim();
    if (!text || WAITING.test(text) || !TERMINAL.test(text)) return "";
    return text;
}

function submit(text: string, attempt: number, ticket: number) {
    if (ticket !== session) return;
    if (generationState().generating || readDraft() !== text || attempt >= SEND_ATTEMPTS) {
        sending = false;
        if (!generationState().generating) handled = "";
        return;
    }
    submitComposer();
    setTimeout(() => submit(text, attempt + 1, ticket), SEND_RETRY_MS);
}

function send(text: string) {
    const ticket = session;
    if (generationState().generating || (readDraft() && readDraft() !== text)) {
        sending = false;
        handled = "";
        return;
    }
    writeDraft(text);
    nextFrame(() => {
        if (ticket === session) submit(text, 0, ticket);
    });
}

function consider() {
    if (held || sending) return;
    const notice = terminalNotice();
    const now = Date.now();
    if (notice !== seen) {
        seen = notice;
        seenAt = now;
        return;
    }
    if (!notice || now - seenAt < STABLE_MS) return;
    if (generationState().generating || readDraft()) return;
    const key = `${currentConversationId() ?? ""}:${notice}`;
    if (key === handled || burst >= MAX_BURST) return;
    handled = key;
    burst += 1;
    sending = true;
    send(promptText());
}

function resetConversation() {
    session += 1;
    held = false;
    burst = 0;
    handled = "";
    seen = "";
    seenAt = 0;
    sending = false;
}

export default definePlugin({
    name: "Continue",
    description: "Send a continue prompt when a reply stops on a delivery error.",
    authors: ["Bloom contributors"],
    tags: ["chat"],
    icon: "play",
    enabledByDefault: true,
    settings,
    start() {
        resetConversation();
        unsubscribers = [
            generation.on("rise", () => {
                held = false;
                handled = "";
                sending = false;
            }),
            generation.on("fall", ({ outcome }) => {
                if (outcome === "stopped" || outcome === "left") held = true;
                if (outcome === "done" && !terminalNotice()) burst = 0;
            }),
            generation.on("context", ({ migrated }) => {
                if (!migrated) resetConversation();
            }),
            generation.on("tick", consider),
        ];
    },
    stop() {
        for (const unsubscribe of unsubscribers) unsubscribe();
        unsubscribers = [];
        resetConversation();
    },
});
