/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * CSS is stored as strings. flushStyles() (HostReady, after the island
 * gate) adopts sheets onto the document. No <style> is created at Init,
 * and we never append to <html>. Head <style> is a last-resort fallback.
 */

type StyleEntry = {
    css: string;
    disabled: boolean;
    sheet: CSSStyleSheet | null;
    el: HTMLStyleElement | null;
};

const styles = new Map<string, StyleEntry>();
let flushed = false;

function canAdopt(): boolean {
    try {
        return typeof CSSStyleSheet === "function" && document.adoptedStyleSheets !== undefined;
    } catch {
        return false;
    }
}

function withAdopted(sheet: CSSStyleSheet, include: boolean) {
    const next = [...document.adoptedStyleSheets].filter(s => s !== sheet);
    if (include) next.push(sheet);
    document.adoptedStyleSheets = next;
}

function attachHead(entry: StyleEntry, name: string) {
    if (!document.head) return;
    if (!entry.el) {
        entry.el = document.createElement("style");
        entry.el.dataset.bloomStyle = name;
    }
    entry.el.textContent = entry.css;
    if (entry.el.parentNode !== document.head) document.head.appendChild(entry.el);
    entry.el.disabled = entry.disabled;
}

function applyEntry(name: string, entry: StyleEntry) {
    if (!flushed || entry.disabled) {
        if (entry.sheet) withAdopted(entry.sheet, false);
        if (entry.el) entry.el.disabled = true;
        return;
    }
    if (canAdopt()) {
        try {
            if (!entry.sheet) entry.sheet = new CSSStyleSheet();
            entry.sheet.replaceSync(entry.css);
            withAdopted(entry.sheet, true);
            entry.el?.remove();
            entry.el = null;
            return;
        } catch { /* fall through */ }
    }
    if (typeof GM_addStyle === "function" && !entry.el && !entry.sheet) {
        const node = GM_addStyle(entry.css);
        if (node instanceof HTMLStyleElement) {
            node.dataset.bloomStyle = name;
            entry.el = node;
            return;
        }
    }
    attachHead(entry, name);
}

export function classNameFactory(prefix: string) {
    return (...parts: Array<string | false | null | undefined>) =>
        parts.filter(Boolean).map(p => (p === prefix.slice(0, -1) ? prefix.slice(0, -1) : `${prefix}${p}`)).join(" ");
}

export function registerStyle(name: string, css: string) {
    let entry = styles.get(name);
    if (!entry) {
        entry = { css, disabled: false, sheet: null, el: null };
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
    if (entry.sheet) withAdopted(entry.sheet, false);
    if (entry.el) entry.el.disabled = true;
}

export function removeStyle(name: string) {
    const entry = styles.get(name);
    if (!entry) return;
    if (entry.sheet) withAdopted(entry.sheet, false);
    entry.el?.remove();
    styles.delete(name);
}

export function registeredStyleText(): string {
    return Array.from(styles.values()).map(e => e.css).join("\n");
}
