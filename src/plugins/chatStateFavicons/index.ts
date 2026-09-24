/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * State machine adapted from Void++ ChatStateFavicons; ChatGPT streaming
 * detectors from Chat-State-Favicons (MIT). Streaming is NOT gated on empty input.
 * Wait (idle) keeps #bloom-chat-state-favicon as the last rel=icon and
 * points its href at ChatGPT's official icon URL (same-link swap). Official
 * nodes stay parked. Streaming, done, ready, and error swap that same
 * overlay to a composed white blossom PNG. Never strip ChatGPT's official
 * icon nodes (React hydrateRoot owns them); park them so Chrome does not
 * prefer the official SVG over the overlay. Restore (remove overlay +
 * unpark) only on plugin stop. Head-only guard (subtree on head, never
 * html/body). Composer watch is childList + characterData + Stop/Send
 * attrs — not `class` (token paint would schedule every frame). Draft
 * events are capture-delegated on the composer form so a remounted
 * ProseMirror node still reaches evaluate in the next frame.
 *
 * Stream edges come from host watchStreamingEdge (no private isStreaming
 * poll). evaluateState on those edges is synchronous — Chrome skips rAF
 * in hidden tabs, which is when ResponseNotification usually fires.
 * rAF only coalesces composer/draft noise while the tab is visible.
 * First-message `/` → `/c/{id}` is host isDraftMigrate, not a chat switch.
 * Leaving a generating chat (New chat `/`, or any other non-migrate
 * context change) is wait, not done. Page-global isStreaming() can stay
 * true for a frame after the URL flips (Stop / aria-busy still mounted);
 * that leftover must not arm a new stream on the page we landed on.
 * sameStreamContext is strict (empty ≠ same). The lock is not held across
 * a real switch — only across an in-flight draft migrate.
 *
 * Draft emptiness uses host isUserDraftEmpty (leftover App/@plugin chips
 * inside #prompt-textarea do not count). primedReady resets on streaming
 * rising edge; chip-only input must not set it. ready if real draft &&
 * primedReady — Send gray is a one-frame ChatGPT lag and must not hold wait.
 */

import { definePluginSettings } from "../../api/Settings";
import { getComposerRoot } from "../../host/composer";
import { isDraftMigrate, stoppedByUser, streamingSuppressed, watchStreamingEdge, type StreamingEdge } from "../../host/streaming";
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
const DRAFT_EVENTS = ["input", "beforeinput", "cut", "paste", "compositionend"] as const;

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
let lastContext = "";
let primedReady = true;
/** After a real switch, ignore isStreaming() until it has been false once. */
let ignoreStreaming = false;
let inputCtrl: AbortController | null = null;
let raf = 0;
let unsubEdge: (() => void) | null = null;
let faviconObs: MutationObserver | null = null;
let composerObs: MutationObserver | null = null;
let composerRoot: HTMLElement | null = null;
let draftRoot: HTMLElement | null = null;
let started = false;
const boundEditors = new WeakSet<HTMLElement>();

function currentStyle(): IconStyle {
    const value = settings.store.style;
    return isIconStyle(value) ? value : "bg";
}

function captureOfficial(): string {
    const existing = document.querySelector<HTMLLinkElement>(
        `link[rel~="icon"]:not(#${ICON_ID}), link[data-bloom-host-rel]:not(#${ICON_ID})`,
    );
    const href = existing?.href;
    if (isUsableOfficialHref(href)) return href;
    if (isUsableOfficialHref(officialHref)) return officialHref;
    return "";
}

function overlayLink(): HTMLLinkElement | null {
    const link = document.getElementById(ICON_ID);
    return link instanceof HTMLLinkElement ? link : null;
}

function waitHref(): string {
    if (!isUsableOfficialHref(officialHref)) {
        const captured = captureOfficial();
        if (captured) officialHref = captured;
    }
    return isUsableOfficialHref(officialHref) ? officialHref : icons.wait;
}

function overlayHref(next: FaviconKind): string {
    return next === "wait" ? waitHref() : icons[next];
}

function paintFavicon() {
    applyFavicon(ICON_ID, overlayHref(kind));
}

function setKind(next: FaviconKind) {
    const href = overlayHref(next);
    if (kind === next) {
        const link = overlayLink();
        if (link && link.getAttribute("href") === href) return;
    }
    kind = next;
    paintFavicon();
}

function rebuildIcons() {
    icons = buildIcons(currentStyle());
    setKind(kind);
}

function liveContextKey(): string {
    return contextKeyFromUrl(conversationToken());
}

function adoptContext(from: string, to: string) {
    if (!from || !to || from === to) return;
    if (streamContext === from) streamContext = to;
    if (lockedToken === from) lockedToken = to;
    if (lastContext === from) lastContext = to;
}

function getContextKey(): string {
    const key = liveContextKey();
    const hold = isStreaming() || wasStreaming || justFinished;
    if (!hold) {
        lockedToken = "";
        return key;
    }
    if (lockedToken && key && lockedToken !== key) {
        if (isDraftMigrate(lockedToken, key)) {
            adoptContext(lockedToken, key);
            lockedToken = key;
        } else {
            lockedToken = "";
            return key;
        }
    } else if (!lockedToken && key) {
        lockedToken = key;
    }
    return lockedToken || key;
}

function sameStreamContext(next: string): boolean {
    if (!streamContext || !next) return false;
    if (streamContext === next) return true;
    return isDraftMigrate(streamContext, next);
}

function resetStreamFlags() {
    wasStreaming = false;
    justFinished = false;
    streamContext = null;
    lockedToken = "";
}

function onConversationSwitch(id: string) {
    lastContext = id;
    resetStreamFlags();
    primedReady = false;
    ignoreStreaming = true;
    setKind("wait");
}

function canReady(empty: boolean): boolean {
    return !empty && primedReady;
}

function evaluateState() {
    if (!started) return;
    const live = liveContextKey();
    if (lastContext && live && lastContext !== live && !isDraftMigrate(lastContext, live)) {
        onConversationSwitch(live);
        return;
    }
    if (lastContext && live && isDraftMigrate(lastContext, live)) adoptContext(lastContext, live);
    if (live) lastContext = live;

    const rawStreaming = isStreaming();
    const streaming = rawStreaming && !streamingSuppressed();
    if (ignoreStreaming) {
        if (streamingSuppressed()) {
            setKind("wait");
            return;
        }
        ignoreStreaming = false;
    }
    if (streamingSuppressed()) {
        setKind("wait");
        return;
    }

    const contextKey = getContextKey();
    const empty = isUserDraftEmpty();

    if (stoppedByUser() && !rawStreaming) {
        wasStreaming = false;
        justFinished = false;
        streamContext = null;
        setKind(empty ? "wait" : canReady(empty) ? "ready" : "wait");
        return;
    }

    if (hasErrorToast() && !rawStreaming && wasStreaming) {
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
        const sameContext = sameStreamContext(live);
        if (!sameContext) {
            wasStreaming = false;
            justFinished = false;
            streamContext = null;
        } else if (justFinished) {
            wasStreaming = false;
            justFinished = true;
            streamContext = live || contextKey;
            setKind("done");
            return;
        } else {
            setKind("wait");
            return;
        }
    }

    if (justFinished) {
        if (streamContext && live && !sameStreamContext(live)) {
            justFinished = false;
            streamContext = null;
        } else if (empty) {
            streamContext = contextKey || streamContext;
            setKind("done");
            return;
        } else if (canReady(empty)) {
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
    else if (canReady(empty)) setKind("ready");
    else setKind("wait");
}

function flushEvaluate() {
    if (!started) return;
    bindEditorInput();
    bindDraftRoot();
    observeComposer();
    evaluateState();
}

function unbindDraftRoot() {
    if (!draftRoot) return;
    for (const type of DRAFT_EVENTS) {
        draftRoot.removeEventListener(type, onDraftEvent, true);
    }
    draftRoot = null;
}

function bindDraftRoot() {
    const root = getComposerRoot();
    const next = root && root !== document.body ? root : null;
    if (draftRoot === next && next?.isConnected) return;
    unbindDraftRoot();
    if (!next) return;
    draftRoot = next;
    for (const type of DRAFT_EVENTS) {
        draftRoot.addEventListener(type, onDraftEvent, { capture: true, passive: true });
    }
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
        characterData: true,
        attributes: true,
        attributeFilter: ["aria-label", "aria-disabled", "disabled", "data-testid"],
    });
}

function scheduleEvaluate() {
    if (!started) return;
    if (document.hidden) {
        if (raf) {
            cancelAnimationFrame(raf);
            raf = 0;
        }
        flushEvaluate();
        return;
    }
    if (raf) return;
    raf = requestAnimationFrame(() => {
        raf = 0;
        if (!started) return;
        flushEvaluate();
    });
}

function onDraftEvent() {
    if (hasDraftText()) primedReady = true;
    scheduleEvaluate();
}

function onEditorInput() {
    if (hasDraftText()) primedReady = true;
    scheduleEvaluate();
}

function onVisibility() {
    if (!started) return;
    if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
    }
    flushEvaluate();
}

function onHostRise() {
    if (!started) return;
    primedReady = false;
    flushEvaluate();
}

function onHostFall(edge: StreamingEdge) {
    if (!started) return;
    if (edge.userStopped) {
        wasStreaming = false;
        justFinished = false;
        streamContext = null;
        setKind("wait");
        return;
    }
    if (edge.error) {
        wasStreaming = false;
        justFinished = false;
        streamContext = null;
        setKind("error");
        return;
    }
    const live = liveContextKey();
    if (edge.contextKey && live && edge.contextKey !== live && !isDraftMigrate(edge.contextKey, live)) {
        wasStreaming = false;
        justFinished = false;
        streamContext = null;
        setKind("wait");
        return;
    }
    wasStreaming = false;
    justFinished = true;
    streamContext = live || edge.contextKey;
    setKind("done");
}

function onHostTick() {
    if (!started) return;
    flushEvaluate();
}

function onHostContext(next: string, prev: string) {
    if (!started) return;
    if (isDraftMigrate(prev, next)) {
        adoptContext(prev, next);
        lastContext = next;
        flushEvaluate();
        return;
    }
    onConversationSwitch(next);
}

function bindEditorInput() {
    const editor = getActiveEditor();
    if (!editor || boundEditors.has(editor)) return;
    boundEditors.add(editor);
    editor.addEventListener("input", onEditorInput, { capture: true, passive: true });
    editor.addEventListener("compositionend", onEditorInput, { capture: true, passive: true });
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
        document.addEventListener("visibilitychange", onVisibility, { signal: inputCtrl.signal });
        bindEditorInput();
        bindDraftRoot();
        observeComposer();
        unsubEdge?.();
        unsubEdge = watchStreamingEdge({
            onRise: onHostRise,
            onFall: onHostFall,
            onTick: onHostTick,
            onContext: onHostContext,
        });
        flushEvaluate();
        logger.debug("favicon watch started");
    },

    stop() {
        started = false;
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        unsubEdge?.();
        unsubEdge = null;
        inputCtrl?.abort();
        inputCtrl = null;
        unbindDraftRoot();
        composerObs?.disconnect();
        composerObs = null;
        composerRoot = null;
        faviconObs?.disconnect();
        faviconObs = null;
        resetStreamFlags();
        lastContext = "";
        primedReady = true;
        ignoreStreaming = false;
        kind = "wait";
        restoreOfficialFavicon(ICON_ID, officialHref);
    },

    onSettingsChange: rebuildIcons,
});
