/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Styles are queued in memory at document-start. Nothing is appended to
 * document.head until flushStyles() (HostReady). Never observe
 * document.documentElement and never append to <html>.
 */

const styles = new Map<string, HTMLStyleElement>();
let flushed = false;

function attachToHead(el: HTMLStyleElement): boolean {
    const head = document.head;
    if (!head) return false;
    if (el.parentNode !== head) head.appendChild(el);
    return true;
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
    if (flushed) attachToHead(el);
}

export function flushStyles(): boolean {
    flushed = true;
    if (!document.head) return false;
    for (const el of styles.values()) attachToHead(el);
    return true;
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
