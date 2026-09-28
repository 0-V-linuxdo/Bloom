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

function adopt() {
    const host = document.adoptedStyleSheets.filter(sheet => !owned.has(sheet));
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
        style.id = `bloom-style-${id}`;
        elements.set(id, style);
    }
    if (style.textContent !== css) style.textContent = css;
    mount(style);
}

export function registerStyle(id: string, css: string) {
    if (adoptable) {
        try {
            let sheet = sheets.get(id);
            if (!sheet) {
                sheet = new pageWindow.CSSStyleSheet();
                sheets.set(id, sheet);
                owned.add(sheet);
            }
            sheet.replaceSync(css);
            adopt();
            return;
        } catch (e) {
            logger.warn("Constructed style sheets unavailable, using <style> after parsing", e);
            adoptable = false;
            sheets.delete(id);
        }
    }
    registerElement(id, css);
}

export function removeStyle(id: string) {
    if (sheets.delete(id) && adoptable) adopt();
    elements.get(id)?.remove();
    elements.delete(id);
}

export function mountPendingStyles() {
    for (const style of elements.values()) mount(style);
}

export const classNameFactory = (prefix: string) => (...names: string[]) => names.map(name => prefix + name).join(" ");

export const classes = (...names: (string | false | null | undefined)[]) => names.filter(Boolean).join(" ");

export const hideRule = (selectors: readonly string[]) => selectors.length ? `${selectors.join(",")}{display:none!important}` : "";
