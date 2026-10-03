/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { composerForm, isComposerInput, readDraft, writeDraft } from "@host/composer";
import { onRouteChange } from "@host/route";
import { Sel } from "@host/selectors";
import { outerMessageUnits, searchUnitRole } from "@host/thread";
import { classNameFactory } from "@utils/css";
import { h, hostMutations, watchBody } from "@utils/dom";
import { normalizeText } from "@utils/misc";
import definePlugin, { OptionType } from "@utils/types";

import styles from "./styles.css";

const cl = classNameFactory("bloom-quotes-");
const STORAGE_KEY = "BloomBetterQuotes";
const MAX = 40;
const MIN_CLIP = 8;
const FLASH_MS = 1800;
const DISMISS = /close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i;
const KEEP = /submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i;

interface Saved {
    id: string;
    text: string;
}

const settings = definePluginSettings({
    jumpToPassage: { type: OptionType.BOOLEAN, description: "Click a quote to jump to the passage, and the badge to jump back.", default: true },
    persistAcrossChats: { type: OptionType.BOOLEAN, description: "Keep the composer quote card when switching chats and coming back.", default: true },
});

let unwatch: (() => void) | undefined;
let unroute: (() => void) | undefined;
let abort: AbortController | undefined;
let painting = false;
let flashTimer = 0;
let passageEl: HTMLElement | null = null;
let originEl: HTMLElement | null = null;
let badge: HTMLButtonElement | null = null;

function quoteKey() {
    return location.pathname.match(/\/c\/(?!local-)([\w-]+)/)?.[1]
        ?? (new URLSearchParams(location.search).get("temporary-chat") === "true" ? "temporary" : "draft");
}

function load(): Saved[] {
    try {
        const raw: unknown = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]");
        if (!Array.isArray(raw)) return [];
        return raw.filter((item): item is Saved =>
            !!item && typeof item === "object" && typeof (item as Saved).id === "string" && typeof (item as Saved).text === "string" && !!(item as Saved).text);
    } catch {
        return [];
    }
}

function save(items: Saved[]) {
    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(-MAX)));
    } catch { /* private mode */ }
}

function textFor(id: string) {
    return load().find(item => item.id === id)?.text ?? "";
}

function remember(id: string, text: string) {
    const next = load().filter(item => item.id !== id);
    next.push({ id, text });
    save(next);
}

function forget(id = quoteKey()) {
    save(load().filter(item => item.id !== id));
    removeFallback();
}

function moveDraft(id: string) {
    const draft = textFor("draft");
    if (!draft || textFor(id)) return;
    const next = load().filter(item => item.id !== "draft");
    next.push({ id, text: draft });
    save(next);
}

function labelOf(el: Element) {
    return `${el.getAttribute("aria-label") ?? ""} ${el.getAttribute("title") ?? ""}`;
}

function isDismiss(btn: HTMLElement) {
    const label = labelOf(btn);
    if (KEEP.test(label) && !/quote|引用/.test(label)) return false;
    if (/quote|引用/.test(label) && DISMISS.test(label)) return true;
    return DISMISS.test(label) && !KEEP.test(label);
}

function rowText(row: HTMLElement) {
    const clone = row.cloneNode(true) as HTMLElement;
    for (const btn of clone.querySelectorAll("button, [role='button']")) btn.remove();
    return normalizeText(clone.textContent ?? "");
}

function chipRow(btn: HTMLElement) {
    const form = composerForm();
    let node = btn.parentElement;
    let depth = 0;
    while (node && node !== form && depth < 5) {
        depth++;
        if (node.matches(Sel.composerInput) || node.querySelector(Sel.composerInput)) return null;
        if (node.closest("aside, [role='status'], [role='alert']") || node.querySelector("h1, h2, h3, h4, h5, h6")) return null;
        const text = rowText(node);
        if (text.length >= 2 && text.length <= 240) return node;
        node = node.parentElement;
    }
    return null;
}

function hostChip() {
    const form = composerForm();
    if (!form) return null;
    for (const btn of form.querySelectorAll<HTMLElement>("button, [role='button']")) {
        if (btn.closest("[data-bloom]") || !isDismiss(btn)) continue;
        const row = chipRow(btn);
        const text = row ? rowText(row) : "";
        if (row && text.length >= 2) return { row, text, dismiss: btn };
    }
    return null;
}

function userUnit(el: Element) {
    const unit = el.closest<HTMLElement>(Sel.searchUnit) ?? el.closest<HTMLElement>(Sel.oldMessage);
    if (!unit) return null;
    const role = searchUnitRole(unit) ?? unit.getAttribute("data-message-author-role");
    return role === "user" ? unit : null;
}

function clipOf(text: string) {
    return normalizeText(text).slice(0, 48);
}

function findPassage(needle: string, skip: HTMLElement | null) {
    const clip = clipOf(needle);
    if (clip.length < MIN_CLIP) return null;
    let best: { el: HTMLElement; score: number; } | null = null;
    for (const unit of outerMessageUnits()) {
        if (skip && (unit === skip || skip.contains(unit) || unit.contains(skip))) continue;
        const text = normalizeText(unit.textContent ?? "");
        if (!text.includes(clip)) continue;
        const score = clip.length / Math.max(text.length, 1);
        if (!best || score > best.score) best = { el: unit, score };
    }
    return best?.el ?? null;
}

function mark(unit: HTMLElement, needle: string) {
    const clip = clipOf(needle);
    let target: HTMLElement = unit;
    for (const node of unit.querySelectorAll<HTMLElement>("p, li, blockquote, pre, h1, h2, h3")) {
        if (node.closest("[data-bloom]")) continue;
        if (normalizeText(node.textContent ?? "").includes(clip)) {
            target = node;
            break;
        }
    }
    document.querySelector(`.${cl("hit")}`)?.classList.remove(cl("hit"));
    target.classList.add(cl("hit"));
    window.clearTimeout(flashTimer);
    flashTimer = window.setTimeout(() => target.classList.remove(cl("hit")), FLASH_MS);
}

function scrollToEl(el: HTMLElement) {
    const scroller = el.closest<HTMLElement>(Sel.timelineScroll) ?? document.scrollingElement;
    if (!(scroller instanceof HTMLElement) && scroller !== document.scrollingElement) return;
    const box = el.getBoundingClientRect();
    if (box.height < 1 || !scroller) return;
    const pane = scroller.getBoundingClientRect();
    const form = composerForm()?.getBoundingClientRect();
    const bottom = form && form.top > pane.top ? form.top : pane.bottom;
    const delta = box.top + box.height / 2 - (pane.top + bottom) / 2;
    if (Math.abs(delta) < 8) return;
    scroller.scrollTo({ top: scroller.scrollTop + delta, behavior: "smooth" });
}

function placeBadge() {
    if (!badge || !passageEl?.isConnected) return;
    const box = passageEl.getBoundingClientRect();
    if (box.width < 1) return;
    badge.style.top = `${Math.max(8, box.top + 8)}px`;
    badge.style.left = `${Math.max(8, box.right - badge.offsetWidth - 8)}px`;
}

function showBadge(passage: HTMLElement, origin: HTMLElement, needle: string) {
    passageEl = passage;
    originEl = origin;
    badge ??= h("button", {
        class: `bloom-root ${cl("back")}`,
        attrs: { "type": "button", "data-bloom": "quote-back", "aria-label": "Back to quote" },
        text: "Back",
    });
    if (!badge.isConnected) document.body.append(badge);
    mark(passage, needle);
    placeBadge();
}

function removeBadge() {
    badge?.remove();
    badge = null;
    passageEl = null;
    originEl = null;
    document.querySelector(`.${cl("hit")}`)?.classList.remove(cl("hit"));
}

function fallback() {
    return document.querySelector<HTMLElement>('[data-bloom="quote-chip"]');
}

function removeFallback() {
    fallback()?.remove();
}

function placeFallback(el: HTMLElement) {
    const form = composerForm();
    const box = form?.getBoundingClientRect();
    if (!box || box.width < 8) return;
    el.style.width = `${Math.max(120, box.width - 24)}px`;
    el.style.left = `${box.left + 12}px`;
    el.style.top = `${Math.max(8, box.top - el.offsetHeight - 8)}px`;
}

function paintFallback(text: string) {
    let el = fallback();
    if (!el) {
        el = h("div", { class: `bloom-root ${cl("chip")}`, attrs: { "data-bloom": "quote-chip" } },
            h("span", { class: cl("text") }),
            h("button", { class: cl("x"), attrs: { "type": "button", "aria-label": "Remove quote" }, text: "×" }));
        document.body.append(el);
    }
    const label = el.querySelector(`.${cl("text")}`);
    const shown = normalizeText(text);
    if (label && label.textContent !== shown) label.textContent = shown;
    el.dataset.text = text;
    placeFallback(el);
}

function render() {
    if (painting) return;
    painting = true;
    try {
        const key = quoteKey();
        const host = hostChip();
        if (settings.store.persistAcrossChats && host && textFor(key) !== host.text) remember(key, host.text);
        const saved = settings.store.persistAcrossChats ? textFor(key) : "";
        if (!saved || (host && normalizeText(host.text) === normalizeText(saved))) removeFallback();
        else paintFallback(saved);
        placeBadge();
    } finally {
        painting = false;
    }
}

function quotedClick(target: Element): { text: string; skip: HTMLElement | null; origin: HTMLElement; } | null {
    const chip = target.closest('[data-bloom="quote-chip"]');
    if (chip instanceof HTMLElement && !target.closest(`.${cl("x")}`)) {
        const text = chip.dataset.text ?? chip.querySelector(`.${cl("text")}`)?.textContent ?? "";
        return text ? { text, skip: null, origin: chip } : null;
    }
    const quote = target.closest("blockquote");
    if (quote instanceof HTMLElement && !target.closest("a, button")) {
        const unit = userUnit(quote);
        const text = normalizeText(quote.textContent ?? "");
        if (unit && text) return { text, skip: unit, origin: quote };
    }
    const form = composerForm();
    if (!form || !form.contains(target) || isComposerInput(target) || target.closest("button, [role='button']")) return null;
    const host = hostChip();
    if (!host || !host.row.contains(target)) return null;
    return { text: host.text, skip: null, origin: host.row };
}

function onPointerDown(event: PointerEvent) {
    const { target } = event;
    if (!(target instanceof Element)) return;
    if (target.closest('[data-bloom="quote-back"]')) {
        event.preventDefault();
        event.stopPropagation();
        if (originEl?.isConnected) scrollToEl(originEl);
        return;
    }
    if (target.closest(`.${cl("x")}`)) {
        event.preventDefault();
        event.stopPropagation();
        forget();
        return;
    }
    const host = hostChip();
    if (host && (target === host.dismiss || host.dismiss.contains(target))) {
        forget();
        return;
    }
    if (isSend(target)) consume();
    if (!settings.store.jumpToPassage) return;
    const quote = quotedClick(target);
    if (!quote) return;
    const passage = findPassage(quote.text, quote.skip);
    if (!passage) return;
    event.preventDefault();
    event.stopPropagation();
    showBadge(passage, quote.origin, quote.text);
    scrollToEl(passage);
}

function isSend(target: Element) {
    const btn = target.closest("button, [role='button']");
    if (!(btn instanceof HTMLElement) || btn.closest("[data-bloom]")) return false;
    const form = composerForm();
    if (!form?.contains(btn)) return false;
    return /send|submit|发送|提交/i.test(labelOf(btn)) && !DISMISS.test(labelOf(btn));
}

function isComposerEnter(event: Event) {
    if (!(event instanceof KeyboardEvent) || event.key !== "Enter" || event.shiftKey || event.isComposing) return false;
    return isComposerInput(event.target);
}

function consume() {
    if (!settings.store.persistAcrossChats) return;
    const key = quoteKey();
    const saved = textFor(key);
    if (!saved) return;
    if (!hostChip()) {
        const draft = readDraft();
        const clip = clipOf(saved);
        if (clip.length >= MIN_CLIP && !normalizeText(draft).includes(clip)) writeDraft(`> ${saved}\n\n${draft}`.trim());
    }
    forget(key);
}

function onKeyDown(event: KeyboardEvent) {
    if (isComposerEnter(event)) consume();
}

function onRoute(change: { prevId: string | null; id: string | null; }) {
    if (!change.prevId && change.id) moveDraft(change.id);
    render();
}

export default definePlugin({
    name: "BetterQuotes",
    description: "Jump between a quote and its source, and keep the composer quote card when switching chats.",
    authors: ["Bloom contributors"],
    tags: ["chat", "ui"],
    icon: "quote",
    enabledByDefault: true,
    settings,
    styles,
    onSettingsChange(key) {
        if (key === "jumpToPassage" && !settings.store.jumpToPassage) removeBadge();
        if (key === "persistAcrossChats" && !settings.store.persistAcrossChats) {
            sessionStorage.removeItem(STORAGE_KEY);
            removeFallback();
        }
        render();
    },
    start() {
        abort = new AbortController();
        document.addEventListener("pointerdown", onPointerDown, { capture: true, signal: abort.signal });
        document.addEventListener("keydown", onKeyDown, { capture: true, signal: abort.signal });
        addEventListener("scroll", placeBadge, { capture: true, passive: true, signal: abort.signal });
        unroute = onRouteChange(onRoute);
        unwatch = watchBody(mutations => hostMutations(mutations) && render());
    },
    stop() {
        abort?.abort();
        abort = undefined;
        unroute?.();
        unroute = undefined;
        unwatch?.();
        unwatch = undefined;
        window.clearTimeout(flashTimer);
        removeBadge();
        removeFallback();
    },
});
