/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * State machine adapted from Void++ ChatStateFavicons; ChatGPT streaming
 * detectors from Chat-State-Favicons (MIT). Streaming is NOT gated on empty input.
 * Wait (idle) restores ChatGPT's official favicon (unpark host links, drop
 * our overlay). Streaming, done, ready, and error park the official nodes
 * and paint a composed white blossom PNG. Favicon link is last in
 * document.head. Never strip ChatGPT's official icon nodes (React
 * hydrateRoot owns them); park them so Chrome does not prefer the official
 * SVG over the overlay. Head-only guard (subtree on head, never html/body).
 * Composer watch is childList plus Stop/Send attrs — not `class` (token
 * paint would schedule every frame).
 *
 * Draft emptiness uses host isUserDraftEmpty (leftover App/@plugin chips
 * inside #prompt-textarea do not count). primedReady resets on streaming
 * rising edge; chip-only input must not set it. ready only if draft &&
 * primedReady && Send is not gray.
 */

import { definePluginSettings } from "../../api/Settings";
import { getComposerRoot } from "../../host/composer";
import { Devs } from "../../utils/constants";
import {
    applyFavicon,
    isUsableOfficialHref,
    restoreOfficialFavicon,
    startFaviconGuard,
} from "../../utils/faviconGuard";
import { Logger } from "../../utils/Logger";
import definePlugin, { OptionType, StartAt } from "../../utils/types";
import {
    conversationToken,
    contextKeyFromUrl,
    getActiveEditor,
    hasDraftText,
    hasErrorToast,
    isStreaming,
    isUserDraftEmpty,
    submitIsGray,
} from "./detect";
import {
    buildIcons,
    type FaviconKind,
    type IconStyle,
    isIconStyle,
    STYLE_OPTIONS,
} from "./icons";

const logger = new Logger("ChatStateFavicons");
const ICON_ID = "bloom-chat-state-favicon";

const settings = definePluginSettings({
    style: {
        type: OptionType.SELECT,
        description: "Favicon overlay",
        options: STYLE_OPTIONS,
    },
});

let officialHref = "";
let icons: Record<FaviconKind, string> = {
    wait: "",
    rotate: "",
    done: "",
    ready: "",
    error: "",
};
let kind: FaviconKind = "wait";
let wasStreaming = false;
let justFinished = false;
let streamContext: string | null = null;
let lockedToken = "";
let lastConvId = "";
let primedReady = true;
let inputCtrl: AbortController | null = null;
let raf = 0;
let pollTimer: ReturnType<typeof setInterval> | undefined;
let faviconObs: MutationObserver | null = null;
let composerObs: MutationObserver | null = null;
let composerRoot: HTMLElement | null = null;
let started = false;
const boundEditors = new WeakSet<HTMLElement>();
const POLL_MS = 400;

function currentStyle(): IconStyle {
    const value = settings.store.style;
    return isIconStyle(value) ? value : "bg";
}

function captureOfficial(): string {
    const existing = document.querySelector<HTMLLinkElement>(`link[rel~="icon"]:not(#${ICON_ID})`);
    const href = existing?.href;
    if (isUsableOfficialHref(href)) return href;
    if (isUsableOfficialHref(officialHref)) return officialHref;
    return "";
}

function overlayLink(): HTMLLinkElement | null {
    const link = document.getElementById(ICON_ID);
    return link instanceof HTMLLinkElement ? link : null;
}

function paintFavicon() {
    if (kind === "wait") {
        restoreOfficialFavicon(ICON_ID, officialHref);
        return;
    }
    applyFavicon(ICON_ID, icons[kind]);
}

function setKind(next: FaviconKind) {
    if (kind === next) {
        if (next === "wait") {
            if (!overlayLink()) return;
        } else {
            const link = overlayLink();
            if (link && link.getAttribute("href") === icons[next]) return;
        }
    }
    kind = next;
    paintFavicon();
}

function rebuildIcons() {
    icons = buildIcons(currentStyle());
    setKind(kind);
}

function getContextKey(): string {
    const token = conversationToken();
    const key = token ? contextKeyFromUrl(token) : contextKeyFromUrl("");
    if (isStreaming()) {
        if (!lockedToken && key) lockedToken = key;
        return lockedToken || key;
    }
    lockedToken = "";
    return key;
}

function resetStreamFlags() {
    wasStreaming = false;
    justFinished = false;
    streamContext = null;
    lockedToken = "";
}

function onConversationSwitch(id: string) {
    lastConvId = id;
    resetStreamFlags();
    primedReady = false;
    setKind("wait");
}

function canReady(empty: boolean, gray: boolean): boolean {
    return !empty && primedReady && !gray;
}

function evaluateState() {
    if (!started) return;
    const conv = conversationToken() || location.pathname;
    if (lastConvId && conv && lastConvId !== conv) {
        onConversationSwitch(conv);
        return;
    }
    if (conv) lastConvId = conv;

    const contextKey = getContextKey();
    const streaming = isStreaming();
    const empty = isUserDraftEmpty();
    const gray = submitIsGray();

    if (hasErrorToast() && !streaming) {
        setKind("error");
        wasStreaming = false;
        justFinished = false;
        streamContext = null;
        return;
    }

    // ChatGPT: show rotate whenever streaming, even if leftover text remains.
    if (streaming) {
        if (!wasStreaming) primedReady = false;
        wasStreaming = true;
        justFinished = false;
        streamContext = contextKey;
        setKind("rotate");
        return;
    }

    if (wasStreaming) {
        const sameContext = !!streamContext && !!contextKey && streamContext === contextKey;
        wasStreaming = false;
        if (sameContext) {
            justFinished = true;
            streamContext = contextKey;
            setKind("done");
            return;
        }
        justFinished = false;
        streamContext = null;
    }

    if (justFinished) {
        const contextChanged = !!(streamContext && contextKey && streamContext !== contextKey);
        if (contextChanged) {
            justFinished = false;
            streamContext = null;
        } else if (empty) {
            setKind("done");
            return;
        } else if (canReady(empty, gray)) {
            justFinished = false;
            setKind("ready");
            return;
        } else {
            justFinished = false;
            setKind("wait");
            return;
        }
    }

    streamContext = null;
    if (empty) setKind("wait");
    else if (canReady(empty, gray)) setKind("ready");
    else setKind("wait");
}

function observeComposer() {
    const root = getComposerRoot();
    if (composerObs && composerRoot === root && root.isConnected) return;
    composerObs?.disconnect();
    composerRoot = root;
    if (!root || root === document.body) {
        composerObs = null;
        return;
    }
    composerObs = new MutationObserver(() => scheduleEvaluate());
    composerObs.observe(root, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["aria-label", "aria-disabled", "disabled", "data-testid"],
    });
}

function scheduleEvaluate() {
    if (!started || raf) return;
    raf = requestAnimationFrame(() => {
        raf = 0;
        if (!started) return;
        bindEditorInput();
        observeComposer();
        evaluateState();
    });
}

function onEditorInput() {
    if (hasDraftText()) primedReady = true;
    scheduleEvaluate();
}

function bindEditorInput() {
    const editor = getActiveEditor();
    if (!editor || boundEditors.has(editor)) return;
    boundEditors.add(editor);
    editor.addEventListener("input", onEditorInput, { passive: true });
    editor.addEventListener("compositionend", onEditorInput, { passive: true });
}

export default definePlugin({
    name: "ChatStateFavicons",
    description: "Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",
    authors: [Devs.p],
    tags: ["chat", "ui"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>`,
    enabledByDefault: true,
    settings,
    startAt: StartAt.DOMContentLoaded,
    cleanupSelectors: [`#${ICON_ID}`],

    start() {
        started = true;
        officialHref = captureOfficial() || officialHref;
        rebuildIcons();
        faviconObs?.disconnect();
        faviconObs = startFaviconGuard(ICON_ID, href => {
            if (isUsableOfficialHref(href)) officialHref = href;
            paintFavicon();
        });
        inputCtrl?.abort();
        inputCtrl = new AbortController();
        window.addEventListener("popstate", scheduleEvaluate, { signal: inputCtrl.signal });
        bindEditorInput();
        observeComposer();
        if (pollTimer !== undefined) clearInterval(pollTimer);
        pollTimer = setInterval(scheduleEvaluate, POLL_MS);
        evaluateState();
        logger.debug("favicon watch started");
    },

    stop() {
        started = false;
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        if (pollTimer !== undefined) {
            clearInterval(pollTimer);
            pollTimer = undefined;
        }
        inputCtrl?.abort();
        inputCtrl = null;
        composerObs?.disconnect();
        composerObs = null;
        composerRoot = null;
        faviconObs?.disconnect();
        faviconObs = null;
        resetStreamFlags();
        lastConvId = "";
        primedReady = true;
        kind = "wait";
        restoreOfficialFavicon(ICON_ID, officialHref);
    },

    onSettingsChange: rebuildIcons,
});
