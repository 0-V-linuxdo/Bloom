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

const logger = new Logger("ResponseNotification");

const NOTES = [880, 1318.5];
const NOTE_GAP_S = 0.14;
const NOTE_LENGTH_S = 0.22;
const PEAK_GAIN = 0.08;
const MIN_GAIN = 0.0001;
const ATTACK_S = 0.02;
const HTTP_OK = 200;
const HTTP_REDIRECT = 300;

const settings = definePluginSettings({
    sound: { type: OptionType.BOOLEAN, description: "Play a sound when a reply finishes.", default: true },
    soundUrl: { type: OptionType.STRING, description: "Custom sound URL. Leave empty for the built-in chime.", default: "", placeholder: "https://…/sound.mp3" },
    preview: { type: OptionType.COMPONENT, render: host => {
        host.append(button("Preview", playSound));
        return () => host.replaceChildren();
    } },
    browserNotification: { type: OptionType.BOOLEAN, description: "Show a browser notification when a reply finishes.", default: true },
    onlyWhenHidden: { type: OptionType.BOOLEAN, description: "Only notify when this tab is in the background.", default: true },
});

let audio: AudioContext | null = null;
let customSound: { url: string; buffer: Promise<AudioBuffer>; } | undefined;
let unsubscribe: (() => void) | undefined;
let controller: AbortController | undefined;

function chime() {
    audio ??= new AudioContext();
    const start = audio.currentTime;
    NOTES.forEach((frequency, index) => {
        const ctx = audio as AudioContext;
        const at = start + index * NOTE_GAP_S;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = frequency;
        gain.gain.setValueAtTime(MIN_GAIN, at);
        gain.gain.exponentialRampToValueAtTime(PEAK_GAIN, at + ATTACK_S);
        gain.gain.exponentialRampToValueAtTime(MIN_GAIN, at + NOTE_LENGTH_S);
        osc.connect(gain).connect(ctx.destination);
        osc.start(at);
        osc.stop(at + NOTE_LENGTH_S);
    });
}

function download(url: string) {
    return new Promise<ArrayBuffer>((resolve, reject) => GM_xmlhttpRequest({
        url,
        responseType: "arraybuffer",
        onload: ({ status, response }) => status >= HTTP_OK && status < HTTP_REDIRECT ? resolve(response) : reject(new Error(`HTTP ${status}`)),
        onerror: () => reject(new Error("Request failed")),
        ontimeout: () => reject(new Error("Request timed out")),
    }));
}

async function playUrl(url: string) {
    audio ??= new AudioContext();
    const ctx = audio;
    if (customSound?.url !== url) customSound = { url, buffer: download(url).then(data => ctx.decodeAudioData(data)) };
    const source = ctx.createBufferSource();
    source.buffer = await customSound.buffer;
    source.connect(ctx.destination);
    source.start();
}

function playSound() {
    const url = settings.store.soundUrl.trim();
    if (!url) {
        chime();
        return;
    }
    playUrl(url).catch(e => {
        logger.warn("Custom sound failed, playing the chime", e);
        customSound = undefined;
        chime();
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
