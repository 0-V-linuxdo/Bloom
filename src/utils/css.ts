/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * CSS is stored as strings until flushStyles() (PageTouch). Injection
 * uses GM_addStyle so we never assign document.adoptedStyleSheets and
 * never createElement("style") at Init. No append to <html>.
 */

type StyleEntry = {
    css: string;
    disabled: boolean;
    el: HTMLStyleElement | null;
};

const styles = new Map<string, StyleEntry>();
let flushed = false;

function applyEntry(name: string, entry: StyleEntry) {
    if (!flushed) return;
    if (entry.disabled) {
        if (entry.el) entry.el.disabled = true;
        return;
    }
    if (entry.el) {
        if (entry.el.textContent !== entry.css) entry.el.textContent = entry.css;
        entry.el.disabled = false;
        return;
    }
    if (typeof GM_addStyle !== "function") return;
    const node = GM_addStyle(entry.css);
    if (node instanceof HTMLStyleElement) {
        node.dataset.bloomStyle = name;
        entry.el = node;
    }
}

export function classNameFactory(prefix: string) {
    return (...parts: Array<string | false | null | undefined>) =>
        parts.filter(Boolean).map(p => (p === prefix.slice(0, -1) ? prefix.slice(0, -1) : `${prefix}${p}`)).join(" ");
}

export function registerStyle(name: string, css: string) {
    let entry = styles.get(name);
    if (!entry) {
        entry = { css, disabled: false, el: null };
        styles.set(name, entry);
    } else {
        entry.css = css;
        entry.disabled = false;
    }
    if (flushed) applyEntry(name, entry);
}

export function flushStyles(): boolean {
    flushed = true;
    for (const [name, entry] of styles) applyEntry(name, entry);
    return true;
}

export function enableStyle(name: string) {
    const entry = styles.get(name);
    if (!entry) return;
    entry.disabled = false;
    if (flushed) applyEntry(name, entry);
}

export function disableStyle(name: string) {
    const entry = styles.get(name);
    if (!entry) return;
    entry.disabled = true;
    if (entry.el) entry.el.disabled = true;
}

export function removeStyle(name: string) {
    const entry = styles.get(name);
    if (!entry) return;
    entry.el?.remove();
    styles.delete(name);
}

export function registeredStyleText(): string {
    return Array.from(styles.values()).filter(e => !e.disabled).map(e => e.css).join("\n");
}
