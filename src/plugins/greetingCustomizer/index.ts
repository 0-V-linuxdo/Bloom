/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { composerInput, readDraft } from "@host/composer";
import { isHomePath, isProjectHome, isTemporaryChat, onRouteChange } from "@host/route";
import { Sel } from "@host/selectors";
import { hostMutations, overlayText, visible, watchBody } from "@utils/dom";
import definePlugin, { OptionType } from "@utils/types";

import { greetingsEditor } from "./editor";
import styles from "./styles.css";

const ATTR = "data-bloom-greeting";
const SECOND_MS = 1000;

const DEFAULT_GREETINGS = [
    "Ask not what your country can do for you\n— ask what you can do for your country.",
    "It always seems impossible until it is done.",
    "The best way to predict the future is to create it.",
];

export const settings = definePluginSettings({
    mode: {
        type: OptionType.SELECT,
        description: "When the greeting changes.",
        options: [
            { label: "Each visit to home", value: "refresh" },
            { label: "Timer while on home", value: "interval" },
            { label: "Click the greeting", value: "manual" },
        ],
        default: "refresh",
    },
    order: {
        type: OptionType.SELECT,
        description: "Which greeting comes next.",
        options: [{ label: "Sequential", value: "sequential" }, { label: "Random", value: "random" }],
        default: "sequential",
    },
    intervalSec: { type: OptionType.SLIDER, description: "Seconds between changes in timer mode.", min: 1, max: 3600, default: 10, unit: "s" },
    heroOnlyOutsideProject: { type: OptionType.BOOLEAN, description: "Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.", default: true },
    editor: { type: OptionType.COMPONENT, description: "Up to 30 greetings, 100 characters each.", render: host => greetingsEditor(host) },
    greetings: { type: OptionType.CUSTOM, default: DEFAULT_GREETINGS },
    index: { type: OptionType.CUSTOM, default: -1 },
    lastRandom: { type: OptionType.CUSTOM, default: -1 },
});

let timer: ReturnType<typeof setInterval> | undefined;
let unsubscribers: (() => void)[] = [];
let controller: AbortController | undefined;

const onHome = () => isHomePath() && !isTemporaryChat();
const oneLine = (text: string) => text.replaceAll(/\s*\n\s*/g, " ").trim();

const greetings = () => settings.store.greetings.filter(text => typeof text === "string" && text.trim());

function advance() {
    const list = greetings();
    if (!list.length) return;
    if (settings.store.order === "random" && list.length > 1) {
        let next = settings.store.lastRandom;
        while (next === settings.store.lastRandom) next = Math.floor(Math.random() * list.length);
        settings.store.lastRandom = next;
        settings.store.index = next;
    } else {
        settings.store.index = (settings.store.index + 1) % list.length;
    }
}

function heading() {
    return onHome() ? visible<HTMLElement>(Sel.homeHeading) : null;
}

function clear() {
    for (const el of document.querySelectorAll<HTMLElement>(`[${ATTR}]`)) {
        el.removeAttribute(ATTR);
        overlayText(el, null);
    }
}

function clearPlaceholder() {
    for (const el of document.querySelectorAll<HTMLElement>("[data-bloom-placeholder]")) el.removeAttribute("data-bloom-placeholder");
}

function paintPlaceholder(text: string) {
    const input = composerInput();
    const line = oneLine(text);
    if (!input || !line || readDraft(input)) {
        clearPlaceholder();
        return;
    }
    if (input.getAttribute("data-bloom-placeholder") !== line) input.setAttribute("data-bloom-placeholder", line);
}

function apply() {
    const list = greetings();
    const project = isProjectHome();
    const home = onHome();
    if (!list.length || (!project && !home)) {
        clear();
        clearPlaceholder();
        return;
    }
    if (project) {
        clear();
        paintPlaceholder(list[0] ?? "");
        return;
    }
    const el = heading();
    if (!el) {
        clear();
    } else {
        if (settings.store.index < 0 || settings.store.index >= list.length) advance();
        el.setAttribute(ATTR, "");
        overlayText(el, list[Math.max(0, settings.store.index) % list.length] ?? "");
    }
    if (settings.store.heroOnlyOutsideProject) clearPlaceholder();
    else paintPlaceholder(list[Math.max(0, settings.store.index) % list.length] ?? "");
}

function schedule() {
    clearInterval(timer);
    timer = undefined;
    if (settings.store.mode === "interval" && onHome()) {
        timer = setInterval(() => {
            advance();
            apply();
        }, settings.store.intervalSec * SECOND_MS);
    }
}

function onClick(event: MouseEvent) {
    if (settings.store.mode !== "manual" || !(event.target instanceof Element) || !event.target.closest(`[${ATTR}]`)) return;
    if (getSelection()?.toString()) return;
    advance();
    apply();
}

function onRoute() {
    if (onHome() && settings.store.mode === "refresh") advance();
    schedule();
    apply();
}

export default definePlugin({
    name: "GreetingCustomizer",
    description: "Replace the home heading with your own lines. A project composer shows the first line.",
    authors: ["Bloom contributors"],
    tags: ["ui"],
    icon: "bubble",
    settings,
    styles,
    start() {
        controller = new AbortController();
        document.addEventListener("click", onClick, { signal: controller.signal });
        if (onHome() && settings.store.mode === "refresh") advance();
        schedule();
        unsubscribers = [watchBody(mutations => hostMutations(mutations) && apply()), onRouteChange(onRoute)];
    },
    stop() {
        controller?.abort();
        for (const unsubscribe of unsubscribers) unsubscribe();
        clearInterval(timer);
        clear();
        clearPlaceholder();
    },
    onSettingsChange(key) {
        if (key === "mode" || key === "intervalSec") schedule();
        apply();
    },
});
