/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * ChatGPT-side rewrite of AI-Greeting-Customizer (MIT).
 * Paints the home heading via CSS ::before only — never textContent on
 * the React h1, never a modal, never html/body[subtree] observers.
 * Do not @require greeting-core.js.
 */

import { definePluginSettings } from "../../api/Settings";
import { Devs } from "../../utils/constants";
import { registerStyle, removeStyle } from "../../utils/css";
import { Logger } from "../../utils/Logger";
import { clamp } from "../../utils/misc";
import definePlugin, { OptionType, StartAt } from "../../utils/types";
import css from "./styles.css";

const logger = new Logger("GreetingCustomizer");
const STYLE_NAME = "greetingCustomizer";
const UI_STYLE = "greetingCustomizerUi";
const MAX_LEN = 100;
const MAX_COUNT = 30;
const ROUTE_MS = 120;
const POLL_MS = 1000;
const SEEK_MS = 50;
const SEEK_TICKS = 40;

const CHROME_SEL = [
    "#page-header",
    "nav",
    "#stage-slideover-sidebar",
    "#stage-sidebar-tiny-bar",
    "#bloom-root",
    "#bloom-sidebar-panel",
    "#bloom-plugin-layer",
    "#bloom-plugin-dialog",
].join(", ");

const H1_SEL = [
    "h1.text-page-header",
    'h1[class*="text-page-header"]',
    "[data-splash-headline-option] h1",
    'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])',
].join(", ");

const TEXT_SEL = [
    "h1.text-page-header .text-pretty",
    'h1[class*="text-page-header"] .text-pretty',
    "[data-splash-headline-option] h1 .text-pretty",
    'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty',
].join(", ");

function inChrome(el: Element | null): boolean {
    return !!el?.closest(CHROME_SEL);
}

function skipHeading(el: Element): boolean {
    if (inChrome(el)) return true;
    if (el.closest('[data-testid="temporary-chat-label"]')) return true;
    if (el.closest("[hidden]")) return true;
    if (el.getAttribute("aria-hidden") === "true") return true;
    if (el.classList.contains("sr-only")) return true;
    return false;
}

function firstMatch(sel: string): Element | null {
    try {
        for (const node of document.querySelectorAll(sel)) {
            if (!skipHeading(node)) return node;
        }
    } catch { /* invalid sel */ }
    return null;
}

const DEFAULT_GREETINGS = [
    "Ask not what your country can do for you\n— ask what you can do for your country.",
    "It always seems impossible until it is done.",
    "The best way to predict the future is to create it.",
];

const settings = definePluginSettings({
    mode: {
        type: OptionType.SELECT,
        description: "When to rotate the home greeting.",
        options: [
            { label: "Each visit to home", value: "refresh", default: true },
            { label: "Timer while on home", value: "interval" },
            { label: "Click the title", value: "manual" },
        ],
    },
    order: {
        type: OptionType.SELECT,
        description: "Order of the greeting list.",
        options: [
            { label: "Sequential", value: "sequential", default: true },
            { label: "Random", value: "random" },
        ],
    },
    intervalSec: {
        type: OptionType.SLIDER,
        description: "Seconds between rotations (timer mode).",
        min: 1,
        max: 3600,
        default: 10,
    },
    greetingsPanel: {
        type: OptionType.COMPONENT,
        description: "Greeting list (max 30, 100 characters each).",
        render: mountGreetingsPanel,
    },
    greetings: {
        type: OptionType.STRING,
        description: "Greeting texts",
        hidden: true,
        default: DEFAULT_GREETINGS,
    },
    index: {
        type: OptionType.NUMBER,
        description: "Rotation index",
        hidden: true,
        default: -1,
    },
    lastRandom: {
        type: OptionType.NUMBER,
        description: "Last random index",
        hidden: true,
        default: -1,
    },
});

let started = false;
let hasAdvancedThisVisit = false;
let lastIsHome: boolean | null = null;
let timerId: ReturnType<typeof setInterval> | undefined;
let pollTimer: ReturnType<typeof setInterval> | undefined;
let routeTimer: ReturnType<typeof setTimeout> | undefined;
let seekTimer: ReturnType<typeof setTimeout> | undefined;
let seekLeft = 0;
let keys: AbortController | null = null;
let origPush: History["pushState"] | null = null;
let origReplace: History["replaceState"] | null = null;
let wrappedPush: History["pushState"] | null = null;
let wrappedReplace: History["replaceState"] | null = null;
let panelRefresh: (() => void) | null = null;

function isHome(): boolean {
    const path = location.pathname || "/";
    return path === "/" || path === "";
}

function getGreetings(): string[] {
    const raw = settings.plain.greetings;
    if (!Array.isArray(raw)) return DEFAULT_GREETINGS.slice();
    return raw.filter((x): x is string => typeof x === "string");
}

function normalizeGreeting(text: string): string {
    return String(text ?? "").replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
}

function setGreetings(list: string[]) {
    settings.store.greetings = list.slice(0, MAX_COUNT);
}

function mode(): "refresh" | "interval" | "manual" {
    const value = String(settings.store.mode ?? "refresh");
    if (value === "interval" || value === "manual") return value;
    return "refresh";
}

function order(): "sequential" | "random" {
    return settings.store.order === "random" ? "random" : "sequential";
}

function intervalMs(): number {
    const sec = clamp(Number(settings.store.intervalSec ?? 10), 1, 3600);
    return sec * 1000;
}

function escapeForCssContent(text: string): string {
    return String(text ?? "")
        .replace(/\\/g, "\\\\")
        .replace(/"/g, "\\\"")
        .replace(/\n/g, "\\A ");
}

function paintOnText(): boolean {
    return !!firstMatch(TEXT_SEL);
}

function headingPresent(): boolean {
    return !!(firstMatch(TEXT_SEL) || firstMatch(H1_SEL));
}

function buildCss(escaped: string, clickable: boolean): string {
    const hide = [
        "font-size:0!important",
        "line-height:0!important",
        "visibility:hidden!important",
        "display:block!important",
    ].join(";");
    const shown = [
        `content:"${escaped}"`,
        "display:block!important",
        "visibility:visible!important",
        "font-size:1.75rem!important",
        "line-height:1.4!important",
        "font-weight:600!important",
        "color:currentColor!important",
        "white-space:pre-wrap!important",
        "text-align:center!important",
        "width:100%!important",
        "margin:0 auto!important",
        "padding:0!important",
    ].join(";");
    const target = paintOnText() || !firstMatch(H1_SEL) ? TEXT_SEL : H1_SEL;
    const cursor = clickable
        ? `${H1_SEL}{cursor:pointer!important;user-select:none!important}`
        : "";
    return [
        `${target}{${hide}}`,
        `${target}::before{${shown}}`,
        cursor,
        `@media (max-width:768px){${target}::before{font-size:1.25rem!important;line-height:1.3!important}}`,
    ].filter(Boolean).join("");
}

function pickNextIndex(listLen: number, advance: boolean): number {
    if (listLen <= 0) return 0;
    if (listLen === 1) {
        if (Number(settings.plain.index) !== 0) settings.store.index = 0;
        if (Number(settings.plain.lastRandom) !== 0) settings.store.lastRandom = 0;
        return 0;
    }
    const current = Number(settings.plain.index);
    const last = Number(settings.plain.lastRandom);
    if (!advance) {
        return current >= 0 && current < listLen ? current : 0;
    }
    if (order() === "random") {
        const prev = current >= 0 && current < listLen ? current : last;
        let next = Math.floor(Math.random() * listLen);
        let guard = 0;
        while (next === prev && guard++ < 10) next = Math.floor(Math.random() * listLen);
        settings.store.index = next;
        settings.store.lastRandom = next;
        return next;
    }
    const prev = current >= -1 && current < listLen ? current : -1;
    const next = (prev + 1) % listLen;
    settings.store.index = next;
    return next;
}

function apply(advance: boolean) {
    if (!started) return;
    if (!isHome()) {
        removeStyle(STYLE_NAME);
        return;
    }
    const greetings = getGreetings().map(normalizeGreeting).filter(Boolean);
    if (!greetings.length) {
        removeStyle(STYLE_NAME);
        return;
    }
    const idx = pickNextIndex(greetings.length, advance);
    const text = greetings[idx] ?? greetings[0];
    const clickable = mode() === "manual" && greetings.length > 1;
    registerStyle(STYLE_NAME, buildCss(escapeForCssContent(text), clickable));
    panelRefresh?.();
}

function stopTimer() {
    if (timerId !== undefined) {
        clearInterval(timerId);
        timerId = undefined;
    }
}

function startTimerIfNeeded() {
    stopTimer();
    if (!started || !isHome()) return;
    if (mode() !== "interval") return;
    if (getGreetings().filter(Boolean).length <= 1) return;
    timerId = setInterval(() => apply(true), intervalMs());
}

function stopSeek() {
    if (seekTimer !== undefined) {
        clearTimeout(seekTimer);
        seekTimer = undefined;
    }
    seekLeft = 0;
}

function seekHeading() {
    stopSeek();
    if (!started || !isHome()) return;
    seekLeft = SEEK_TICKS;
    const tick = () => {
        seekTimer = undefined;
        if (!started || !isHome()) return;
        if (headingPresent()) {
            if (mode() === "refresh" && !hasAdvancedThisVisit) {
                hasAdvancedThisVisit = true;
                apply(true);
            } else {
                apply(false);
            }
            startTimerIfNeeded();
            return;
        }
        seekLeft -= 1;
        if (seekLeft > 0) seekTimer = setTimeout(tick, SEEK_MS);
    };
    tick();
}

function enterHome() {
    if (lastIsHome === true) {
        if (headingPresent()) apply(false);
        else seekHeading();
        return;
    }
    lastIsHome = true;
    hasAdvancedThisVisit = false;
    if (mode() === "refresh") {
        hasAdvancedThisVisit = true;
        apply(true);
    } else {
        apply(false);
    }
    startTimerIfNeeded();
    if (!headingPresent()) seekHeading();
}

function leaveHome() {
    lastIsHome = false;
    hasAdvancedThisVisit = false;
    stopTimer();
    stopSeek();
    removeStyle(STYLE_NAME);
}

function onRoute() {
    if (routeTimer !== undefined) return;
    routeTimer = window.setTimeout(() => {
        routeTimer = undefined;
        if (!started) return;
        if (isHome()) enterHome();
        else if (lastIsHome !== false) leaveHome();
    }, ROUTE_MS);
}

function hookHistory() {
    if (origPush) return;
    origPush = history.pushState.bind(history);
    origReplace = history.replaceState.bind(history);
    wrappedPush = function pushState(...args: Parameters<History["pushState"]>) {
        const ret = origPush!(...args);
        onRoute();
        return ret;
    };
    wrappedReplace = function replaceState(...args: Parameters<History["replaceState"]>) {
        const ret = origReplace!(...args);
        onRoute();
        return ret;
    };
    history.pushState = wrappedPush;
    history.replaceState = wrappedReplace;
}

function unhookHistory() {
    if (wrappedPush && history.pushState === wrappedPush && origPush) history.pushState = origPush;
    if (wrappedReplace && history.replaceState === wrappedReplace && origReplace) history.replaceState = origReplace;
    origPush = null;
    origReplace = null;
    wrappedPush = null;
    wrappedReplace = null;
}

function onClickCapture(e: Event) {
    const el = e.target instanceof Element ? e.target : null;
    if (!el) return;
    if (el.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')) {
        requestAnimationFrame(onRoute);
    }
}

function onManualClick(e: Event) {
    if (!started || !isHome()) return;
    if (mode() !== "manual") return;
    if (getGreetings().filter(Boolean).length <= 1) return;
    const el = e.target instanceof Element ? e.target : null;
    if (!el) return;
    const heading = el.closest(H1_SEL);
    if (!heading || skipHeading(heading)) return;
    const sel = window.getSelection?.();
    if (sel && String(sel).trim()) return;
    apply(true);
}

function startPoll() {
    if (pollTimer !== undefined) return;
    pollTimer = setInterval(() => {
        if (!started) return;
        const home = isHome();
        if (home !== (lastIsHome === true)) {
            if (home) enterHome();
            else leaveHome();
            return;
        }
        if (home && headingPresent()) apply(false);
    }, POLL_MS);
}

function stopPoll() {
    if (pollTimer !== undefined) {
        clearInterval(pollTimer);
        pollTimer = undefined;
    }
}

function validateGreeting(text: string, extraSlot: boolean): string | null {
    const value = normalizeGreeting(text);
    if (!value) return "Enter a greeting.";
    if (value.length > MAX_LEN) return `Keep it to ${MAX_LEN} characters.`;
    const count = getGreetings().length + (extraSlot ? 1 : 0);
    if (count > MAX_COUNT) return `At most ${MAX_COUNT} greetings.`;
    return null;
}

function mountGreetingsPanel(root: HTMLElement): () => void {
    root.className = "bloom-gc-panel";
    let draft = "";
    let editing = -1;
    let error = "";
    let open = -1;

    const render = () => {
        const list = getGreetings();
        const current = Number(settings.plain.index);
        root.replaceChildren();

        const composer = document.createElement("div");
        composer.className = "bloom-gc-composer";
        const input = document.createElement("textarea");
        input.className = "bloom-gc-input";
        input.rows = 3;
        input.maxLength = MAX_LEN;
        input.placeholder = "New greeting (line breaks ok)";
        input.value = draft;
        input.addEventListener("input", () => {
            draft = input.value;
            error = "";
            const count = composer.querySelector(".bloom-gc-count");
            if (count) count.textContent = `${normalizeGreeting(draft).length}/${MAX_LEN}`;
            const err = composer.querySelector(".bloom-gc-error");
            if (err) err.textContent = "";
        });
        composer.appendChild(input);

        const meta = document.createElement("div");
        meta.className = "bloom-gc-meta";
        const count = document.createElement("span");
        count.className = "bloom-gc-count";
        count.textContent = `${normalizeGreeting(draft).length}/${MAX_LEN}`;
        const err = document.createElement("span");
        err.className = "bloom-gc-error";
        err.textContent = error;
        const actions = document.createElement("div");
        actions.className = "bloom-gc-actions";
        if (editing >= 0) {
            const cancel = document.createElement("button");
            cancel.type = "button";
            cancel.className = "bloom-gc-btn";
            cancel.textContent = "Cancel";
            cancel.addEventListener("click", () => {
                editing = -1;
                draft = "";
                error = "";
                render();
            });
            actions.appendChild(cancel);
        }
        const save = document.createElement("button");
        save.type = "button";
        save.className = "bloom-gc-btn bloom-gc-btn-primary";
        save.textContent = editing >= 0 ? "Update" : "Add";
        save.addEventListener("click", () => {
            const extra = editing < 0;
            const message = validateGreeting(draft, extra);
            if (message) {
                error = message;
                render();
                return;
            }
            const value = normalizeGreeting(draft);
            const next = getGreetings().slice();
            if (editing >= 0 && editing < next.length) next[editing] = value;
            else next.push(value);
            setGreetings(next);
            editing = -1;
            draft = "";
            error = "";
            render();
        });
        actions.appendChild(save);
        meta.append(count, err, actions);
        composer.appendChild(meta);
        root.appendChild(composer);

        if (!list.length) {
            const empty = document.createElement("p");
            empty.className = "bloom-gc-empty";
            empty.textContent = "No greetings. The official heading stays.";
            root.appendChild(empty);
            return;
        }

        const items = document.createElement("div");
        items.className = "bloom-gc-list";
        list.forEach((text, i) => {
            const item = document.createElement("div");
            item.className = "bloom-gc-item";
            if (i === current) item.dataset.active = "true";
            const body = document.createElement("button");
            body.type = "button";
            body.className = `bloom-gc-body${open === i ? "" : " bloom-gc-clamp"}`;
            body.textContent = text;
            body.addEventListener("click", () => {
                open = open === i ? -1 : i;
                render();
            });
            const row = document.createElement("div");
            row.className = "bloom-gc-item-actions";
            const edit = document.createElement("button");
            edit.type = "button";
            edit.title = "Edit";
            edit.textContent = "E";
            edit.addEventListener("click", () => {
                editing = i;
                draft = text;
                error = "";
                render();
            });
            const del = document.createElement("button");
            del.type = "button";
            del.title = "Delete";
            del.textContent = "×";
            del.addEventListener("click", () => {
                const next = getGreetings().filter((_, j) => j !== i);
                setGreetings(next);
                if (editing === i) {
                    editing = -1;
                    draft = "";
                } else if (editing > i) {
                    editing -= 1;
                }
                render();
            });
            row.append(edit, del);
            item.append(body, row);
            items.appendChild(item);
        });
        root.appendChild(items);
    };

    panelRefresh = render;
    render();
    return () => {
        if (panelRefresh === render) panelRefresh = null;
        root.replaceChildren();
    };
}

export default definePlugin({
    name: "GreetingCustomizer",
    description: "Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",
    authors: [Devs.p],
    tags: ["ui"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>`,
    enabledByDefault: false,
    startAt: StartAt.HostReady,
    managedStyle: UI_STYLE,
    settings,

    start() {
        started = true;
        registerStyle(UI_STYLE, css);
        hookHistory();
        keys = new AbortController();
        const { signal } = keys;
        window.addEventListener("popstate", onRoute, { signal });
        document.addEventListener("click", onClickCapture, { capture: true, signal });
        document.addEventListener("click", onManualClick, { signal });
        startPoll();
        lastIsHome = null;
        if (isHome()) enterHome();
        else leaveHome();
        logger.debug("started");
    },

    stop() {
        started = false;
        keys?.abort();
        keys = null;
        if (routeTimer !== undefined) {
            clearTimeout(routeTimer);
            routeTimer = undefined;
        }
        stopTimer();
        stopSeek();
        stopPoll();
        unhookHistory();
        removeStyle(STYLE_NAME);
        hasAdvancedThisVisit = false;
        lastIsHome = null;
    },

    onSettingsChange() {
        if (!started) return;
        if (isHome()) {
            apply(false);
            startTimerIfNeeded();
        } else {
            removeStyle(STYLE_NAME);
        }
    },
});
