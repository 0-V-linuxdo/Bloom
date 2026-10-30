/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { button } from "@components/controls";
import { conversationTitle } from "@host/conversation";
import { generation } from "@host/generation";
import { Logger } from "@utils/Logger";
import { download, isRecord, parseJson } from "@utils/misc";
import { readStored, writeStored } from "@utils/storage";
import definePlugin, { OptionType } from "@utils/types";

import { DEFAULT_CHIME } from "./done1";

const logger = new Logger("ResponseNotification");

const SAMPLE_VOLUME = 0.5;
const CLAIM_KEY = "BloomNoticeClaim";
const CLAIM_TTL_MS = 30_000;

const settings = definePluginSettings({
    sound: { type: OptionType.BOOLEAN, description: "Play a sound when a reply finishes.", default: true },
    soundUrl: { type: OptionType.STRING, description: "Custom sound URL. Leave empty for the default done chime.", default: "", placeholder: "https://…/sound.mp3" },
    preview: { type: OptionType.COMPONENT, render: host => {
        host.append(button("Preview", playSound));
        return () => host.replaceChildren();
    } },
    browserNotification: { type: OptionType.BOOLEAN, description: "Show a browser notification when a reply finishes.", default: true },
    onlyWhenHidden: { type: OptionType.BOOLEAN, description: "Only notify when this tab is in the background.", default: true },
});

let audio: AudioContext | null = null;
const buffers = new Map<string, Promise<AudioBuffer>>();
let unsubscribers: (() => void)[] = [];
let controller: AbortController | undefined;

const dataBytes = (url: string) => Uint8Array.from(atob(url.slice(url.indexOf(",") + 1)), char => char.charCodeAt(0)).buffer;

function loadBuffer(ctx: AudioContext, url: string) {
    let buffer = buffers.get(url);
    if (!buffer) {
        buffer = (url.startsWith("data:") ? Promise.resolve(dataBytes(url)) : download(url)).then(data => ctx.decodeAudioData(data));
        buffer.catch(() => buffers.delete(url));
        buffers.set(url, buffer);
    }
    return buffer;
}

async function play(url: string) {
    audio ??= new AudioContext();
    const ctx = audio;
    if (ctx.state === "suspended") void ctx.resume();
    const source = ctx.createBufferSource();
    const gain = ctx.createGain();
    source.buffer = await loadBuffer(ctx, url);
    gain.gain.value = SAMPLE_VOLUME;
    source.connect(gain).connect(ctx.destination);
    source.start();
}

function playSound() {
    const url = settings.store.soundUrl.trim();
    play(url || DEFAULT_CHIME).catch(e => {
        logger.warn("Sound failed", e);
        if (url) play(DEFAULT_CHIME).catch(error => logger.warn("Default chime failed", error));
    });
}

function notify(title: string | null) {
    const text = `${title ?? "ChatGPT"} finished answering.`;
    if (typeof GM_notification === "function") {
        GM_notification({ title: "Bloom++", text, silent: true, onclick: () => focus() });
        return;
    }
    if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
    const notification = new Notification("Bloom++", { body: text, silent: true });
    notification.onclick = () => {
        focus();
        notification.close();
    };
}

function claim(id: string | null) {
    const last = parseJson(readStored(CLAIM_KEY) ?? "");
    if (id && isRecord(last) && last.id === id && Date.now() - Number(last.at) < CLAIM_TTL_MS) return false;
    writeStored(CLAIM_KEY, { id, at: Date.now() });
    return true;
}

function finished(conversationId: string | null) {
    if (settings.store.onlyWhenHidden && !document.hidden) return;
    if (!claim(conversationId)) return;
    if (settings.store.sound) playSound();
    if (settings.store.browserNotification) notify(conversationTitle(conversationId));
}

function requestPermissionOnce() {
    if (typeof GM_notification === "function" || typeof Notification === "undefined" || Notification.permission !== "default") return;
    controller = new AbortController();
    document.addEventListener("pointerdown", () => void Notification.requestPermission(), { once: true, signal: controller.signal });
}

export default definePlugin({
    name: "ResponseNotification",
    description: "Play a sound and show a notification when ChatGPT finishes a reply, including chats you left while they were answering.",
    authors: ["Bloom contributors"],
    tags: ["chat"],
    icon: "bell",
    enabledByDefault: true,
    settings,
    start() {
        requestPermissionOnce();
        unsubscribers = [
            generation.on("fall", ({ conversationId, outcome }) => outcome === "done" && finished(conversationId)),
            generation.on("background", ({ conversationId }) => finished(conversationId)),
        ];
    },
    stop() {
        for (const unsubscribe of unsubscribers) unsubscribe();
        controller?.abort();
    },
});
