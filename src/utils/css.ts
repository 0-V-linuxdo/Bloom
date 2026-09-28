/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

const styles = new Map<string, HTMLStyleElement>();
let headObserver: MutationObserver | undefined;

function mount(style: HTMLStyleElement) {
    if (!document.head || style.parentNode === document.head) return;
    document.head.append(style);
}

function watchHead() {
    if (headObserver || !document.head) return;
    headObserver = new MutationObserver(() => {
        for (const style of styles.values()) if (!style.isConnected) mount(style);
    });
    headObserver.observe(document.head, { childList: true });
}

export function registerStyle(id: string, css: string) {
    let style = styles.get(id);
    if (!style) {
        style = document.createElement("style");
        style.id = `bloom-style-${id}`;
        styles.set(id, style);
    }
    if (style.textContent !== css) style.textContent = css;
    mount(style);
    watchHead();
}

export function removeStyle(id: string) {
    styles.get(id)?.remove();
    styles.delete(id);
}

export function mountPendingStyles() {
    for (const style of styles.values()) mount(style);
    watchHead();
}

export const classNameFactory = (prefix: string) => (...names: string[]) => names.map(name => prefix + name).join(" ");

export const classes = (...names: (string | false | null | undefined)[]) => names.filter(Boolean).join(" ");

export const hideRule = (selectors: readonly string[]) => selectors.length ? `${selectors.join(",")}{display:none!important}` : "";
