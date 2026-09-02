/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Adapted from Void++ InputHistory (GPL-3.0-or-later).
 * Editor: ChatGPT #prompt-textarea (and related composer editors).
 * Write path: execCommand insertText first, then InputEvent.
 * Keydown is capture-phase so ProseMirror does not swallow ArrowUp/Down.
 */

import { definePluginSettings } from "../../api/Settings";
import { EDITOR_SEL, editorText, getActiveEditor, getComposerRoot, SEND_SEL, isStopControl } from "../../host/composer";
import { Devs } from "../../utils/constants";
import { registerStyle } from "../../utils/css";
import { Logger } from "../../utils/Logger";
import { clamp, copyToClipboard } from "../../utils/misc";
import definePlugin, { OptionType, StartAt } from "../../utils/types";
import { ensureHost } from "../_core/settings";
import css from "./styles.css";

const logger = new Logger("InputHistory");
const ZWSP = /\u200B/g;
const MAX_MIN = 10;
const MAX_MAX = 500;
const MAX_DEFAULT = 100;
const HUD_GAP_PX = 8;
const APPLY_QUIET_MS = 120;
const CAPTURE_DEDUPE_MS = 2000;
const PAGE_SIZE = 10;

const settings = definePluginSettings({
    maxEntries: {
        type: OptionType.SLIDER,
        description: "Max stored prompts",
        min: MAX_MIN,
        max: MAX_MAX,
        default: MAX_DEFAULT,
    },
    history: {
        type: OptionType.COMPONENT,
        description: "Stored prompts",
        render: mountHistoryPanel,
    },
    entries: {
        type: OptionType.STRING,
        description: "Stored prompts",
        hidden: true,
        default: [],
    },
});

const recentAt = new Map<string, number>();

let cursor = 0;
let draft = "";
let recalling = false;
let applying = false;
let applyGen = 0;
let keys: AbortController | null = null;
let applyTimer: ReturnType<typeof setTimeout> | undefined;
let applyEl: HTMLElement | null = null;
let applyAtStart = true;

function getEntries(): string[] {
    const raw = settings.plain.entries;
    return Array.isArray(raw) ? raw.filter((x): x is string => typeof x === "string") : [];
}

function cap(entries: string[]): string[] {
    const max = clamp(Number(settings.store.maxEntries ?? MAX_DEFAULT), MAX_MIN, MAX_MAX);
    return entries.length > max ? entries.slice(entries.length - max) : entries;
}

function setEntries(entries: string[]) {
    settings.store.entries = cap(entries);
}

function normalize(text: string): string {
    return text.replaceAll(ZWSP, "").replace(/\n$/, "").trim();
}

function chatEditor(t: EventTarget | null): HTMLElement | null {
    const el = t instanceof Element ? t : t instanceof Node ? t.parentElement : null;
    const hit = el?.closest?.(EDITOR_SEL);
    if (hit instanceof HTMLElement) return hit;
    return getActiveEditor();
}

function caretOnEdge(el: HTMLElement): { first: boolean; last: boolean } {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return { first: true, last: true };
    const text = editorText(el);
    if (!text) return { first: true, last: true };
    try {
        const r = sel.getRangeAt(0);
        const pre = document.createRange();
        pre.selectNodeContents(el);
        pre.setEnd(r.startContainer, r.startOffset);
        const post = document.createRange();
        post.selectNodeContents(el);
        post.setStart(r.endContainer, r.endOffset);
        return {
            first: pre.toString().replaceAll(ZWSP, "").trim().length === 0,
            last: post.toString().replaceAll(ZWSP, "").trim().length === 0,
        };
    } catch {
        return { first: true, last: true };
    }
}

function placeCaret(el: HTMLElement, atStart: boolean) {
    const view = (el as unknown as { pmViewDesc?: { view?: {
        state: { doc: unknown; selection: { constructor: { atStart(doc: unknown): unknown; atEnd(doc: unknown): unknown } }; tr: { setSelection(sel: unknown): { scrollIntoView(): unknown } } };
        dispatch(tr: unknown): void;
    } } }).pmViewDesc?.view;
    if (view) {
        try {
            const Sel = view.state.selection.constructor;
            const pmSel = atStart ? Sel.atStart(view.state.doc) : Sel.atEnd(view.state.doc);
            view.dispatch(view.state.tr.setSelection(pmSel).scrollIntoView());
            return;
        } catch (e) {
            logger.debug("pm caret failed:", e);
        }
    }
    const sel = window.getSelection();
    if (!sel) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(atStart);
    sel.removeAllRanges();
    sel.addRange(range);
}

function scheduleApplyEnd(gen: number) {
    clearTimeout(applyTimer);
    applyTimer = setTimeout(() => {
        if (gen !== applyGen) return;
        applying = false;
        const el = applyEl;
        if (el) placeCaret(el, applyAtStart);
    }, APPLY_QUIET_MS);
}

function setEditorText(el: HTMLElement, text: string, atStart: boolean) {
    el.focus();
    const sel = window.getSelection();
    if (!sel) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    sel.removeAllRanges();
    sel.addRange(range);
    applying = true;
    applyEl = el;
    applyAtStart = atStart;
    const gen = ++applyGen;
    try {
        if (!text) document.execCommand("delete");
        else document.execCommand("insertText", false, text);
    } catch (err) {
        logger.debug("insertText failed:", err);
        el.textContent = text;
    }
    el.dispatchEvent(new InputEvent("input", { bubbles: true, data: text, inputType: text ? "insertText" : "deleteContent" }));
    placeCaret(el, atStart);
    scheduleApplyEnd(gen);
}

function hudEl(): HTMLElement {
    const root = ensureHost();
    let el = root.querySelector<HTMLElement>(".bloom-ih-hud");
    if (!el) {
        el = document.createElement("div");
        el.className = "bloom-ih-hud";
        root.appendChild(el);
    }
    return el;
}

function hideHud() {
    const root = document.getElementById("bloom-root")?.shadowRoot;
    root?.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on");
}

function showHud(label: string, editor: HTMLElement) {
    const el = hudEl();
    el.textContent = label;
    const box = (editor.closest("form") ?? getComposerRoot()).getBoundingClientRect();
    el.style.left = `${box.left + box.width / 2}px`;
    el.style.top = `${Math.max(8, box.top - HUD_GAP_PX)}px`;
    el.classList.add("bloom-ih-hud-on");
}

function pushEntry(text: string) {
    const value = normalize(text);
    if (!value) return;
    const now = Date.now();
    const prev = recentAt.get(value);
    if (prev && now - prev < CAPTURE_DEDUPE_MS) return;
    recentAt.set(value, now);
    const next = getEntries().filter(x => x !== value);
    next.push(value);
    setEntries(next);
    cursor = getEntries().length;
    recalling = false;
    hideHud();
}

function cycle(older: boolean, el: HTMLElement) {
    const list = getEntries();
    if (!list.length && older) return;
    if (cursor >= list.length) {
        draft = editorText(el);
        cursor = list.length;
    }
    const next = older ? cursor - 1 : cursor + 1;
    if (next < 0 || next > list.length) return;
    cursor = next;
    recalling = true;
    setEditorText(el, next === list.length ? draft : list[next], older);
    if (next < list.length) showHud(`${next + 1} / ${list.length}`, el);
    else hideHud();
}

function dropRecall(el: HTMLElement) {
    recalling = false;
    hideHud();
    setEditorText(el, draft, false);
    cursor = getEntries().length;
}

function onKeyDown(e: KeyboardEvent) {
    if (e.isComposing || e.keyCode === 229) return;
    if (e.ctrlKey || e.metaKey) return;

    const editor = chatEditor(e.target) ?? chatEditor(document.activeElement);
    if (!editor) return;
    if (e.target instanceof Node && !editor.contains(e.target) && e.target !== editor) {
        if (e.key !== "ArrowUp" && e.key !== "ArrowDown" && e.key !== "Enter" && e.key !== "Escape") return;
        if (document.activeElement !== editor && !editor.contains(document.activeElement)) return;
    }

    if (e.key === "Escape" && recalling && !e.altKey && !e.shiftKey) {
        dropRecall(editor);
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
    }

    if (e.key === "Enter" && !e.shiftKey && !e.altKey) {
        pushEntry(editorText(editor));
        return;
    }

    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    if (e.shiftKey) return;

    const older = e.key === "ArrowUp";
    const force = e.altKey;
    const list = getEntries();
    if (!force) {
        const edge = caretOnEdge(editor);
        if ((older && !edge.first) || (!older && !edge.last)) return;
    }
    if (older && (!list.length || cursor <= 0)) return;
    if (!older && cursor >= list.length) return;

    e.preventDefault();
    e.stopImmediatePropagation();
    cycle(older, editor);
}

function onInput(e: Event) {
    const el = chatEditor(e.target);
    if (!el) return;
    if (applying) {
        scheduleApplyEnd(applyGen);
        return;
    }
    if (recalling) {
        recalling = false;
        hideHud();
        cursor = getEntries().length;
    }
}

function onSubmit(e: Event) {
    const form = e.target;
    if (!(form instanceof HTMLFormElement)) return;
    const editor = form.querySelector(EDITOR_SEL);
    if (editor instanceof HTMLElement) pushEntry(editorText(editor));
}

function onClick(e: MouseEvent) {
    const t = e.target;
    if (!(t instanceof Element)) return;
    const send = t.closest(SEND_SEL);
    if (!send || !(send instanceof HTMLElement) || isStopControl(send)) return;
    const editor = getActiveEditor();
    if (editor) pushEntry(editorText(editor));
}

function onPointerDown(e: Event) {
    if (!recalling || applying) return;
    if (e.target instanceof Node) {
        const root = e.target.getRootNode();
        if (root instanceof ShadowRoot && root.host.id === "bloom-root") return;
    }
    recalling = false;
    hideHud();
}

function bindWindow() {
    if (keys) return;
    keys = new AbortController();
    const { signal } = keys;
    const opts: AddEventListenerOptions = { capture: true, signal };
    window.addEventListener("keydown", onKeyDown, opts);
    window.addEventListener("input", onInput, opts);
    window.addEventListener("submit", onSubmit, opts);
    window.addEventListener("click", onClick, opts);
    window.addEventListener("pointerdown", onPointerDown, opts);
}

function removeEntry(index: number) {
    const next = getEntries().slice();
    next.splice(index, 1);
    setEntries(next);
    if (cursor > next.length) cursor = next.length;
}

function mountHistoryPanel(root: HTMLElement): () => void {
    root.className = "bloom-ih-panel";
    let query = "";
    let page = 0;
    let open = -1;

    const render = () => {
        const all = getEntries().slice().reverse();
        const q = query.trim().toLowerCase();
        const filtered = q ? all.filter(x => x.toLowerCase().includes(q)) : all;
        const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
        if (page >= pages) page = pages - 1;
        const slice = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

        root.replaceChildren();

        const search = document.createElement("input");
        search.className = "bloom-ih-search";
        search.type = "search";
        search.placeholder = "Search history";
        search.autocomplete = "off";
        search.value = query;
        search.addEventListener("input", () => {
            query = search.value;
            page = 0;
            render();
        });
        root.appendChild(search);

        if (!slice.length) {
            const empty = document.createElement("p");
            empty.className = "bloom-ih-empty";
            empty.textContent = filtered.length ? "No matches." : "No stored prompts yet.";
            root.appendChild(empty);
        } else {
            const list = document.createElement("div");
            list.className = "bloom-ih-list";
            slice.forEach((text, i) => {
                const abs = all.indexOf(text);
                const orig = getEntries().length - 1 - abs;
                const item = document.createElement("div");
                item.className = "bloom-ih-item";
                const body = document.createElement("button");
                body.type = "button";
                body.className = `bloom-ih-body${open === i ? "" : " bloom-ih-clamp"}`;
                body.textContent = text;
                body.addEventListener("click", () => {
                    open = open === i ? -1 : i;
                    render();
                });
                const actions = document.createElement("div");
                actions.className = "bloom-ih-actions";
                const copy = document.createElement("button");
                copy.type = "button";
                copy.title = "Copy";
                copy.textContent = "C";
                copy.addEventListener("click", () => { void copyToClipboard(text); });
                const del = document.createElement("button");
                del.type = "button";
                del.title = "Delete";
                del.textContent = "×";
                del.addEventListener("click", () => { removeEntry(orig); render(); });
                actions.append(copy, del);
                item.append(body, actions);
                list.appendChild(item);
            });
            root.appendChild(list);
        }

        const pager = document.createElement("div");
        pager.className = "bloom-ih-pager";
        const prev = document.createElement("button");
        prev.type = "button";
        prev.className = "bloom-ih-btn";
        prev.textContent = "Prev";
        prev.disabled = page <= 0;
        prev.addEventListener("click", () => { page -= 1; render(); });
        const info = document.createElement("span");
        info.textContent = `${page + 1} / ${pages}`;
        const next = document.createElement("button");
        next.type = "button";
        next.className = "bloom-ih-btn";
        next.textContent = "Next";
        next.disabled = page + 1 >= pages;
        next.addEventListener("click", () => { page += 1; render(); });
        const clear = document.createElement("button");
        clear.type = "button";
        clear.className = "bloom-ih-clear";
        clear.textContent = "Clear all";
        clear.addEventListener("click", () => {
            if (confirm("Clear all stored prompts?")) {
                setEntries([]);
                cursor = 0;
                render();
            }
        });
        pager.append(prev, info, next, clear);
        root.appendChild(pager);
    };

    render();
    return () => { root.replaceChildren(); };
}

export default definePlugin({
    name: "InputHistory",
    description: "Recall prompts with Arrow Up / Arrow Down.",
    authors: [Devs.p],
    tags: ["chat"],
    enabledByDefault: true,
    settings,
    startAt: StartAt.HostReady,
    managedStyle: "inputHistory",

    start() {
        registerStyle("inputHistory", css);
        ensureHost();
        cursor = getEntries().length;
        recalling = false;
        bindWindow();
    },

    stop() {
        keys?.abort();
        keys = null;
        hideHud();
        recentAt.clear();
        clearTimeout(applyTimer);
        applying = false;
        applyEl = null;
        recalling = false;
    },

    onSettingsChange() {
        const current = getEntries();
        const next = cap(current);
        if (next.length !== current.length) setEntries(next);
        if (cursor > next.length) cursor = next.length;
    },
});
