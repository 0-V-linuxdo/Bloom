/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * registerStyle queues in memory. flushStyles (chrome-ready) appends
 * <style data-bloom-style> to document.head — never documentElement.
 * A copy is mirrored into #bloom-root's shadow for HUD / shell.
 */

type StyleEntry = {
    css: string;
    disabled: boolean;
    el: HTMLStyleElement | null;
};

const styles = new Map<string, StyleEntry>();
let flushed = false;

function shadowRoot(): ShadowRoot | null {
    return document.getElementById("bloom-root")?.shadowRoot ?? null;
}

function styleHost(): HTMLElement | null {
    return document.head ?? null;
}

function syncShadow() {
    const root = shadowRoot();
    if (!root) return;
    let el = root.querySelector<HTMLStyleElement>("style[data-bloom-plugins]");
    if (!el) {
        el = document.createElement("style");
        el.dataset.bloomPlugins = "1";
        root.appendChild(el);
    }
    el.textContent = registeredStyleText();
}

function applyEntry(name: string, entry: StyleEntry) {
    if (!flushed) return;
    const host = styleHost();
    if (!host) return;
    if (entry.disabled) {
        if (entry.el) entry.el.disabled = true;
        syncShadow();
        return;
    }
    if (entry.el?.isConnected && entry.el.parentElement === host) {
        if (entry.el.textContent !== entry.css) entry.el.textContent = entry.css;
        entry.el.disabled = false;
        syncShadow();
        return;
    }
    entry.el?.remove();
    const el = document.createElement("style");
    el.dataset.bloomStyle = name;
    el.textContent = entry.css;
    host.appendChild(el);
    entry.el = el;
    syncShadow();
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
    syncShadow();
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
    syncShadow();
}

export function removeStyle(name: string) {
    const entry = styles.get(name);
    if (!entry) return;
    entry.el?.remove();
    styles.delete(name);
    syncShadow();
}

export function registeredStyleText(): string {
    return Array.from(styles.values()).filter(e => !e.disabled).map(e => e.css).join("\n");
}

export function syncShadowPluginStyles() {
    syncShadow();
}
