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
import definePlugin, { OptionType } from "@utils/types";

import { DEFAULT_CHIME } from "./done1";

const logger = new Logger("ResponseNotification");

const SAMPLE_VOLUME = 0.5;
const HTTP_OK = 200;
const HTTP_REDIRECT = 300;

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
let unsubscribe: (() => void) | undefined;
let controller: AbortController | undefined;

function download(url: string) {
    return new Promise<ArrayBuffer>((resolve, reject) => GM_xmlhttpRequest({
        url,
        responseType: "arraybuffer",
        onload: ({ status, response }) => status >= HTTP_OK && status < HTTP_REDIRECT ? resolve(response) : reject(new Error(`HTTP ${status}`)),
        onerror: () => reject(new Error("Request failed")),
        ontimeout: () => reject(new Error("Request timed out")),
    }));
}

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

function requestPermissionOnce() {
    if (typeof GM_notification === "function" || typeof Notification === "undefined" || Notification.permission !== "default") return;
    controller = new AbortController();
    document.addEventListener("pointerdown", () => void Notification.requestPermission(), { once: true, signal: controller.signal });
}

export default definePlugin({
    name: "ResponseNotification",
    description: "Play a sound and show a notification when ChatGPT finishes a reply.",
    authors: ["Bloom contributors"],
    tags: ["chat"],
    icon: "bell",
    enabledByDefault: true,
    settings,
    start() {
        requestPermissionOnce();
        unsubscribe = generation.on("fall", ({ conversationId, outcome }) => {
            if (outcome !== "done") return;
            if (settings.store.onlyWhenHidden && !document.hidden) return;
            if (settings.store.sound) playSound();
            if (settings.store.browserNotification) notify(conversationTitle(conversationId));
        });
    },
    stop() {
        unsubscribe?.();
        controller?.abort();
    },
});
