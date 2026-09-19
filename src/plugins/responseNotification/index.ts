/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * ChatGPT-side rewrite of Void++ ResponseNotification (GPL-3.0-or-later).
 * Detects reply completion via falling-edge of host isStreaming() plus
 * 2–3 quiet ticks and a context lock. No Grok streamEnd / ResponseStore.
 * Independent of PromptQueue / AutoContinue.
 */

import { definePluginSettings } from "../../api/Settings";
import { isStopControl } from "../../host/composer";
import { contextKeyFromUrl, conversationToken } from "../../host/conversation";
import { hasErrorToast, isStreaming } from "../../host/streaming";
import { Devs } from "../../utils/constants";
import { Logger } from "../../utils/Logger";
import definePlugin, { OptionType, StartAt } from "../../utils/types";

const logger = new Logger("ResponseNotification");
const POLL_MS = 400;
const QUIET_TICKS = 3;

const settings = definePluginSettings({
    sound: {
        type: OptionType.BOOLEAN,
        description: "Play a notification sound.",
        default: true,
    },
    soundUrl: {
        type: OptionType.STRING,
        description: "Custom sound URL. Leave empty for the default chime.",
        default: "",
    },
    preview: {
        type: OptionType.COMPONENT,
        description: "Preview sound",
        render: mountPreview,
    },
    browserNotification: {
        type: OptionType.BOOLEAN,
        description: "Show a browser notification.",
        default: true,
    },
    onlyWhenHidden: {
        type: OptionType.BOOLEAN,
        description: "Only notify when the tab is hidden.",
        default: true,
    },
});

let started = false;
let wasStreaming = false;
let quietTicks = 0;
let streamContext = "";
let userStopped = false;
let lastConv = "";
let pollTimer: ReturnType<typeof setInterval> | undefined;
let clicks: AbortController | null = null;
let audioCtx: AudioContext | null = null;

function contextKey(): string {
    return contextKeyFromUrl(conversationToken());
}

function tabHidden(): boolean {
    return document.visibilityState === "hidden" || document.hidden;
}

function shouldNotify(): boolean {
    if (settings.store.onlyWhenHidden === false) return true;
    return tabHidden();
}

function chatTitle(): string {
    const raw = (document.title || "").replace(/\s*[|–-]\s*ChatGPT\s*$/i, "").trim();
    if (raw && !/^ChatGPT$/i.test(raw)) return raw;
    return "Chat";
}

function playChime() {
    try {
        const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!Ctx) return;
        if (!audioCtx || audioCtx.state === "closed") audioCtx = new Ctx();
        const ctx = audioCtx;
        const now = ctx.currentTime;
        const notes = [523.25, 659.25];
        for (let i = 0; i < notes.length; i++) {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.value = notes[i];
            const t = now + i * 0.12;
            gain.gain.setValueAtTime(0.0001, t);
            gain.gain.exponentialRampToValueAtTime(0.08, t + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(t);
            osc.stop(t + 0.24);
        }
        void ctx.resume?.();
    } catch (e) {
        logger.debug("chime failed", e);
    }
}

function playCustom(url: string) {
    try {
        const audio = new Audio(url);
        audio.volume = 0.7;
        void audio.play();
    } catch (e) {
        logger.debug("custom sound failed", e);
        playChime();
    }
}

function playSound() {
    const url = String(settings.store.soundUrl || "").trim();
    if (url) playCustom(url);
    else playChime();
}

function notifyBrowser() {
    const title = "Bloom++";
    const body = `${chatTitle()} finished answering.`;
    try {
        const gm = (globalThis as { GM_notification?: (opts: { title: string; text: string; silent?: boolean }) => void }).GM_notification;
        if (typeof gm === "function") {
            gm({ title, text: body, silent: true });
            return;
        }
    } catch { /* fall through */ }
    try {
        if (typeof Notification === "undefined") return;
        if (Notification.permission === "default") void Notification.requestPermission();
        if (Notification.permission === "granted") {
            const n = new Notification(title, { body, silent: true });
            n.onclick = () => {
                try { window.focus(); } catch { /* ignore */ }
                n.close();
            };
        }
    } catch (e) {
        logger.debug("notification failed", e);
    }
}

function notify() {
    if (!shouldNotify()) return;
    if (settings.store.sound !== false) playSound();
    if (settings.store.browserNotification !== false) notifyBrowser();
}

function mountPreview(el: HTMLElement): () => void {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Play";
    btn.addEventListener("click", () => playSound());
    el.appendChild(btn);
    return () => { btn.remove(); };
}

function onStopClick(ev: Event) {
    const node = ev.target;
    if (!(node instanceof Element)) return;
    const btn = node.closest("button");
    if (btn instanceof HTMLElement && isStopControl(btn)) userStopped = true;
}

function tick() {
    if (!started) return;
    const conv = conversationToken() || location.pathname;
    if (lastConv && conv && lastConv !== conv) {
        wasStreaming = false;
        quietTicks = 0;
        streamContext = "";
        userStopped = false;
        lastConv = conv;
        return;
    }
    lastConv = conv;

    const streaming = isStreaming();
    const key = contextKey();

    if (streaming) {
        wasStreaming = true;
        quietTicks = 0;
        streamContext = key;
        return;
    }

    if (!wasStreaming) return;

    quietTicks += 1;
    if (quietTicks < QUIET_TICKS) return;

    const same = !!streamContext && streamContext === key;
    const stopped = userStopped;
    const error = hasErrorToast();
    wasStreaming = false;
    quietTicks = 0;
    userStopped = false;
    streamContext = "";
    if (!same || stopped || error) return;
    notify();
}

export default definePlugin({
    name: "ResponseNotification",
    description: "Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",
    authors: [Devs.p],
    tags: ["chat"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>`,
    enabledByDefault: true,
    startAt: StartAt.HostReady,
    settings,
    start() {
        started = true;
        wasStreaming = isStreaming();
        quietTicks = 0;
        streamContext = wasStreaming ? contextKey() : "";
        userStopped = false;
        lastConv = conversationToken() || location.pathname;
        clicks?.abort();
        clicks = new AbortController();
        document.addEventListener("click", onStopClick, { capture: true, signal: clicks.signal });
        if (pollTimer !== undefined) clearInterval(pollTimer);
        pollTimer = setInterval(tick, POLL_MS);
        if (settings.store.browserNotification !== false && typeof Notification !== "undefined" && Notification.permission === "default") {
            document.addEventListener("click", () => {
                if (Notification.permission === "default") void Notification.requestPermission();
            }, { once: true, signal: clicks.signal });
        }
        logger.debug("watch started");
    },
    stop() {
        started = false;
        if (pollTimer !== undefined) {
            clearInterval(pollTimer);
            pollTimer = undefined;
        }
        clicks?.abort();
        clicks = null;
        wasStreaming = false;
        quietTicks = 0;
        streamContext = "";
        userStopped = false;
        try { void audioCtx?.close(); } catch { /* ignore */ }
        audioCtx = null;
    },
});
