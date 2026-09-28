/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { readDraft } from "@host/composer";
import { generation, generationState } from "@host/generation";
import definePlugin, { OptionType, StartAt } from "@utils/types";

import { type ActiveState, drawIcon, type FaviconState, type IconStyle, STYLE_OPTIONS } from "./icons";

const OVERLAY_ID = "bloom-chat-state-favicon";
const PARKED_REL = "data-bloom-rel";
const PARKED_MEDIA = "data-bloom-media";
const PARKED = "bloom-parked-icon";
const FALLBACK_ICON = "/favicon.ico";

const settings = definePluginSettings({
    style: { type: OptionType.SELECT, description: "How the tab icon shows the chat state.", options: STYLE_OPTIONS, default: "bg" },
});

type Outcome = "done" | "error" | null;

let outcome: Outcome = null;
let draftAtOutcome = "";
let shown: FaviconState | null = null;
let officialHref = "";
const cache = new Map<string, string>();
let headObserver: MutationObserver | undefined;
let unsubscribers: (() => void)[] = [];

const iconLinks = () => [...document.head.querySelectorAll<HTMLLinkElement>(`link[rel~="icon"], link[${PARKED_REL}]`)];

function park() {
    for (const link of iconLinks()) {
        if (link.id === OVERLAY_ID) continue;
        if (!link.hasAttribute(PARKED_REL)) {
            officialHref ||= link.href;
            link.setAttribute(PARKED_REL, link.rel);
            link.setAttribute(PARKED_MEDIA, link.getAttribute("media") ?? "");
        }
        if (link.rel !== PARKED) link.rel = PARKED;
        if (link.media !== "not all") link.media = "not all";
    }
}

function unpark() {
    for (const link of iconLinks()) {
        const rel = link.getAttribute(PARKED_REL);
        if (rel == null) continue;
        link.rel = rel;
        const media = link.getAttribute(PARKED_MEDIA);
        if (media) link.media = media;
        else link.removeAttribute("media");
        link.removeAttribute(PARKED_REL);
        link.removeAttribute(PARKED_MEDIA);
    }
}

function overlay() {
    let link = document.getElementById(OVERLAY_ID) as HTMLLinkElement | null;
    if (!link) {
        link = document.createElement("link");
        link.id = OVERLAY_ID;
        link.rel = "icon";
    }
    if (document.head.lastElementChild !== link) document.head.append(link);
    return link;
}

function iconFor(state: FaviconState) {
    if (state === "wait") return officialHref || FALLBACK_ICON;
    const style = settings.store.style as IconStyle;
    const key = `${style}:${state}`;
    let url = cache.get(key);
    if (!url) cache.set(key, url = drawIcon(style, state as ActiveState));
    return url;
}

function currentState(generating: boolean): FaviconState {
    if (generating) return "rotate";
    const draft = readDraft();
    if (outcome && draft && draft !== draftAtOutcome) outcome = null;
    if (outcome === "error") return "error";
    if (outcome === "done") return "done";
    return draft ? "ready" : "wait";
}

function render(state: FaviconState, force = false) {
    if (state === shown && !force) return;
    shown = state;
    const link = overlay();
    const href = iconFor(state);
    link.type = href.startsWith("data:image/png") ? "image/png" : "";
    if (link.href !== href) link.href = href;
}

function watchHead() {
    headObserver = new MutationObserver(() => {
        park();
        if (document.head.lastElementChild?.id !== OVERLAY_ID) overlay();
    });
    headObserver.observe(document.head, { childList: true });
}

export default definePlugin({
    name: "ChatStateFavicons",
    description: "Show the chat state in the tab icon: generating, done, draft ready or error.",
    authors: ["Bloom contributors"],
    tags: ["chat", "ui"],
    icon: "favicon",
    enabledByDefault: true,
    startAt: StartAt.HostReady,
    settings,
    start() {
        park();
        render(currentState(generationState().generating), true);
        watchHead();
        unsubscribers = [
            generation.on("rise", () => {
                outcome = null;
                render("rotate");
            }),
            generation.on("fall", ({ outcome: result }) => {
                outcome = result === "done" || result === "error" ? result : null;
                draftAtOutcome = readDraft();
                render(currentState(false));
            }),
            generation.on("context", ({ migrated }) => {
                if (!migrated) outcome = null;
            }),
            generation.on("tick", ({ generating }) => {
                park();
                render(currentState(generating));
            }),
        ];
    },
    stop() {
        for (const unsubscribe of unsubscribers) unsubscribe();
        unsubscribers = [];
        headObserver?.disconnect();
        document.getElementById(OVERLAY_ID)?.remove();
        unpark();
        shown = null;
        outcome = null;
    },
    onSettingsChange() {
        render(shown ?? "wait", true);
    },
});
