/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * State machine adapted from Void++ ChatStateFavicons; ChatGPT streaming
 * detectors from Chat-State-Favicons (MIT). Streaming is NOT gated on empty input.
 * Wait keeps the host favicon (original / badge / dot). Overlays follow light/dark.
 */

import { onBloomEvent } from "../../api/Events";
import { definePluginSettings } from "../../api/Settings";
import { resolveScheme, type ColorScheme, type SchemePref } from "../../host/theme";
import { Devs } from "../../utils/constants";
import {
    applyFavicon,
    isUsableOfficialHref,
    restoreOfficialFavicon,
} from "../../utils/faviconGuard";
import { Logger } from "../../utils/Logger";
import definePlugin, { OptionType, StartAt } from "../../utils/types";
import {
    conversationToken,
    contextKeyFromUrl,
    EDITOR_SEL,
    getActiveEditor,
    getComposerRoot,
    hasErrorToast,
    isInputEmpty,
    isStreaming,
    submitIsGray,
} from "./detect";
import {
    buildIcons,
    keepsOfficialWait,
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
        description: "How the blossom mark is overlaid with chat state.",
        options: STYLE_OPTIONS,
    },
});

let officialHref = "";
let scheme: ColorScheme = "light";
let icons = buildIcons("badge", "", scheme);
let kind: FaviconKind = "wait";
let wasStreaming = false;
let justFinished = false;
let streamContext: string | null = null;
let lockedToken = "";
let lastConvId = "";
let primedReady = true;
let composerObs: MutationObserver | null = null;
let inputCtrl: AbortController | null = null;
let unsubScheme: (() => void) | null = null;
let raf = 0;
let pollTimer: ReturnType<typeof setInterval> | undefined;
let started = false;
const boundEditors = new WeakSet<HTMLElement>();

function currentStyle(): IconStyle {
    const value = settings.store.style;
    return isIconStyle(value) ? value : "badge";
}

function appearancePref(): SchemePref {
    return "auto";
}

function currentScheme(): ColorScheme {
    return resolveScheme(appearancePref());
}

function captureOfficial(): string {
    const existing = document.querySelector<HTMLLinkElement>(`link[rel~="icon"]:not(#${ICON_ID})`);
    const href = existing?.href;
    if (isUsableOfficialHref(href)) return href;
    if (isUsableOfficialHref(officialHref)) return officialHref;
    return "";
}

function setKind(next: FaviconKind) {
    kind = next;
    const style = currentStyle();
    if (next === "wait" && keepsOfficialWait(style)) {
        restoreOfficialFavicon(ICON_ID, officialHref);
        return;
    }
    applyFavicon(ICON_ID, icons[next]);
}

function rebuildIcons() {
    scheme = currentScheme();
    icons = buildIcons(currentStyle(), officialHref, scheme);
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
    composerObs?.disconnect();
    composerObs = null;
    setKind("wait");
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
    const empty = isInputEmpty();
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
        } else if (primedReady) {
            justFinished = false;
            setKind("ready");
            return;
        } else {
            justFinished = false;
            setKind("wait");
            return;
        }
    }

    void gray;
    streamContext = null;
    if (empty) setKind("wait");
    else if (primedReady) setKind("ready");
    else setKind("wait");
}

function scheduleEvaluate() {
    if (!started || raf) return;
    raf = requestAnimationFrame(() => {
        raf = 0;
        if (!started) return;
        bindEditorInput();
        const root = getComposerRoot();
        if (root !== document.body && (!composerObs || !root.isConnected)) observeComposer();
        evaluateState();
    });
}

function onEditorInput() {
    primedReady = true;
    scheduleEvaluate();
}

function bindEditorInput() {
    const editor = getActiveEditor();
    if (!editor || boundEditors.has(editor)) return;
    boundEditors.add(editor);
    editor.addEventListener("input", onEditorInput, { passive: true });
    editor.addEventListener("compositionend", onEditorInput, { passive: true });
}

function observeComposer() {
    composerObs?.disconnect();
    composerObs = null;
    const root = getComposerRoot();
    if (!root || root === document.body) return;
    composerObs = new MutationObserver(() => scheduleEvaluate());
    composerObs.observe(root, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ["aria-label", "aria-disabled", "disabled", "data-testid", "class"],
    });
}

export default definePlugin({
    name: "ChatStateFavicons",
    description: "Show streaming, done, ready, and error states on the tab favicon.",
    authors: [Devs.p],
    tags: ["chat", "ui"],
    enabledByDefault: true,
    settings,
    startAt: StartAt.HostReady,
    cleanupSelectors: [`#${ICON_ID}`],

    start() {
        started = true;
        scheme = currentScheme();
        officialHref = captureOfficial() || officialHref;
        rebuildIcons();
        unsubScheme = onBloomEvent("schemeChange", () => {
            const recaptured = captureOfficial();
            if (recaptured) officialHref = recaptured;
            rebuildIcons();
        });
        inputCtrl?.abort();
        inputCtrl = new AbortController();
        window.addEventListener("popstate", scheduleEvaluate, { signal: inputCtrl.signal });
        bindEditorInput();
        observeComposer();
        if (pollTimer !== undefined) clearInterval(pollTimer);
        pollTimer = setInterval(scheduleEvaluate, 1_500);
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
        unsubScheme?.();
        unsubScheme = null;
        composerObs?.disconnect();
        composerObs = null;
        resetStreamFlags();
        lastConvId = "";
        primedReady = true;
        restoreOfficialFavicon(ICON_ID, officialHref);
        void EDITOR_SEL;
    },

    onSettingsChange: rebuildIcons,
});
