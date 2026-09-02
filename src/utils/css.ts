/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

const styles = new Map<string, HTMLStyleElement>();
let headObs: MutationObserver | null = null;

function attachToHead(el: HTMLStyleElement): boolean {
    const head = document.head;
    if (!head) return false;
    if (el.parentNode !== head) head.appendChild(el);
    return true;
}

function flushPendingStyles(): boolean {
    if (!document.head) return false;
    if (headObs) {
        headObs.disconnect();
        headObs = null;
    }
    for (const el of styles.values()) attachToHead(el);
    return true;
}

function ensureHeadWaiter() {
    if (headObs || document.head) return;
    const root = document.documentElement;
    if (root) {
        headObs = new MutationObserver(() => {
            flushPendingStyles();
        });
        // head/body are direct children of <html>. subtree:true during
        // document-start would scan ChatGPT's hydrating tree.
        headObs.observe(root, { childList: true });
    }
    document.addEventListener("DOMContentLoaded", () => {
        flushPendingStyles();
    }, { once: true });
}

export function classNameFactory(prefix: string) {
    return (...parts: Array<string | false | null | undefined>) =>
        parts.filter(Boolean).map(p => (p === prefix.slice(0, -1) ? prefix.slice(0, -1) : `${prefix}${p}`)).join(" ");
}

export function registerStyle(name: string, css: string) {
    let el = styles.get(name);
    if (!el) {
        el = document.createElement("style");
        el.dataset.bloomStyle = name;
        styles.set(name, el);
    }
    el.textContent = css;
    // Never append to document.documentElement: extra <html> children
    // break ChatGPT's React hydration (minified error #418, blank page).
    if (!attachToHead(el)) ensureHeadWaiter();
}

export function enableStyle(name: string) {
    const el = styles.get(name);
    if (el) el.disabled = false;
}

export function disableStyle(name: string) {
    const el = styles.get(name);
    if (el) el.disabled = true;
}

export function removeStyle(name: string) {
    const el = styles.get(name);
    el?.remove();
    styles.delete(name);
}

export function registeredStyleText(): string {
    return Array.from(styles.values()).map(el => el.textContent || "").join("\n");
}
