/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Logger } from "./Logger";
import { pageWindow } from "./misc";

const logger = new Logger("Styles");

const sheets = new Map<string, CSSStyleSheet>();
const owned = new Set<CSSStyleSheet>();
const elements = new Map<string, HTMLStyleElement>();
let adoptable = true;

const safeId = (id: string) => id.replaceAll(/[^A-Za-z0-9_-]/g, "_");

const stampRule = (id: string) => `:where(:root){--bloom-sheet-${safeId(id)}:1}`;

const withStamp = (id: string, css: string) => `${stampRule(id)}${css}`;

const styleElementId = (id: string) => `bloom-style-${id}`;

function sheetText(sheet: CSSStyleSheet) {
    try {
        return [...sheet.cssRules].map(rule => rule.cssText).join("\n");
    } catch {
        return "";
    }
}

function sheetHasId(sheet: CSSStyleSheet, id: string) {
    const text = sheetText(sheet);
    if (!text) return false;
    if (text.includes(`--bloom-sheet-${safeId(id)}`)) return true;
    if (id === "plugin-StreamerMode") return text.includes("blur(6px)") && (text.includes("data-app-action-sidebar-thread-title") || text.includes("data-bloom-streamer-open"));
    if (id === "plugin-WiderChat") return text.includes("--composer-adjacent-max-width") && text.includes("--thread-content-max-width");
    if (id === "plugin-ComposerOpacity") return text.includes("--composer-layout-surface-backdrop-filter") || (text.includes("--composer-layout-surface-background") && text.includes("color-mix"));
    return false;
}

function isBloomSheet(sheet: CSSStyleSheet) {
    const text = sheetText(sheet);
    if (!text) return false;
    if (text.includes("--bloom-") || text.includes(".bloom-") || text.includes("[data-bloom") || text.includes("--bloom-sheet-")) return true;
    if (text.includes("blur(6px)") && text.includes("data-app-action-sidebar-thread-title")) return true;
    if (text.includes("--composer-adjacent-max-width") && text.includes("--thread-content-max-width")) return true;
    if (text.includes("--composer-layout-surface-backdrop-filter")) return true;
    return false;
}

function adopt() {
    const host = document.adoptedStyleSheets.filter(sheet => !owned.has(sheet) && !isBloomSheet(sheet));
    document.adoptedStyleSheets = [...host, ...sheets.values()];
}

function mount(style: HTMLStyleElement) {
    if (document.readyState === "loading" || style.parentNode === document.head) return;
    document.head.append(style);
}

function registerElement(id: string, css: string) {
    let style = elements.get(id);
    if (!style) {
        style = document.createElement("style");
        style.id = styleElementId(id);
        elements.set(id, style);
    }
    if (style.textContent !== css) style.textContent = css;
    mount(style);
}

export function registerStyle(id: string, css: string) {
    const marked = withStamp(id, css);
    if (adoptable) {
        try {
            let sheet = sheets.get(id);
            if (!sheet) {
                sheet = new pageWindow.CSSStyleSheet();
                sheets.set(id, sheet);
                owned.add(sheet);
            }
            sheet.replaceSync(marked);
            adopt();
            return;
        } catch (e) {
            logger.warn("Constructed style sheets unavailable, using <style> after parsing", e);
            adoptable = false;
            const sheet = sheets.get(id);
            if (sheet) owned.delete(sheet);
            sheets.delete(id);
        }
    }
    registerElement(id, marked);
}

export function removeStyle(id: string) {
    const sheet = sheets.get(id);
    if (sheet) {
        owned.delete(sheet);
        sheets.delete(id);
    }
    elements.get(id)?.remove();
    elements.delete(id);
    for (const el of document.querySelectorAll(`style[id="${styleElementId(id)}"]`)) el.remove();
    try {
        document.adoptedStyleSheets = document.adoptedStyleSheets.filter(item => item !== sheet && !sheetHasId(item, id));
        if (adoptable) adopt();
    } catch {
        /* adoptedStyleSheets unavailable */
    }
}

export function dropBloomStyles() {
    sheets.clear();
    owned.clear();
    for (const style of elements.values()) style.remove();
    elements.clear();
    for (const el of document.querySelectorAll("style[id^='bloom-style-']")) el.remove();
    try {
        document.adoptedStyleSheets = document.adoptedStyleSheets.filter(sheet => !isBloomSheet(sheet));
    } catch {
        /* adoptedStyleSheets unavailable */
    }
}

export function mountPendingStyles() {
    for (const style of elements.values()) mount(style);
}

export const classNameFactory = (prefix: string) => (...names: string[]) => names.map(name => prefix + name).join(" ");

export const classes = (...names: (string | false | null | undefined)[]) => names.filter(Boolean).join(" ");

export const hideRule = (selectors: readonly string[]) => selectors.length
    ? `${selectors.map(selector => `${selector}:not([data-bloom])`).join(",")}{display:none!important}`
    : "";
