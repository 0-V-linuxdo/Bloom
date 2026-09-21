/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Shared CSI paint strings + img src-swap. Tests must import these — do not
 * re-type the CSS. Blink paints replaced-element `src` on top of `content`
 * / `background`, so official <img> pixels are thrown off with
 * object-position. Initials chips have no img: the slot itself gets the bake
 * (background-image + ::after) and official children are hidden.
 */

import { SLOT_ATTR } from "./face";

export const MARK = "data-bloom-csi";
export const ORIG = "data-bloom-csi-orig";

export const failedAvatars = new Set<string>();
let onAvatarFail: (() => void) | null = null;

export function setAvatarFailHandler(fn: (() => void) | null) {
    onAvatarFail = fn;
}

export function cssUrl(url: string): string {
    return `url(${JSON.stringify(url)})`;
}

export function sizeBox(sel: string, px: number): string {
    return `${sel}{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:${px}px!important;height:${px}px!important;min-width:${px}px!important;min-height:${px}px!important;max-width:${px}px!important;max-height:${px}px!important;padding:0!important;border-radius:999px!important;overflow:hidden!important;flex-shrink:0!important}`;
}

/**
 * Blink paints replaced-element `src` on top of `content`/`background`.
 * Throw the official pixels out of the box (`object-position`) so the
 * padding/background area shows the bake. Same trick as
 * https://stackoverflow.com/questions/18481310
 */
export function faceImgCss(sel: string, url: string, px: number): string {
    const u = cssUrl(url);
    return `${sel}{box-sizing:border-box!important;width:${px}px!important;height:${px}px!important;min-width:${px}px!important;min-height:${px}px!important;max-width:${px}px!important;max-height:${px}px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:${u}!important;background-size:${px}px ${px}px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}`;
}

/**
 * Official Helium initials keep a class/inline background (teal “18”).
 * Paint the bake on the slot itself and on ::after, and hide official
 * children so the glyph / src cannot sit on top of the overlay.
 */
export function slotCss(url: string, slotAttr = SLOT_ATTR): string {
    const u = cssUrl(url);
    return `[${slotAttr}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important;line-height:0!important;background-color:transparent!important;background-image:${u}!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}[${slotAttr}] *,[${slotAttr}]::before{color:transparent!important;font-size:0!important;visibility:hidden!important}[${slotAttr}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${u}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important;visibility:visible!important}`;
}

export function dropSrcset(img: HTMLImageElement) {
    if (img.hasAttribute("srcset")) img.removeAttribute("srcset");
    if (img.hasAttribute("sizes")) img.removeAttribute("sizes");
    img.srcset = "";
    img.sizes = "";
    img.removeAttribute("crossorigin");
    const pic = img.parentElement;
    if (pic?.tagName === "PICTURE") {
        for (const source of pic.querySelectorAll("source")) {
            source.removeAttribute("srcset");
            source.removeAttribute("src");
        }
    }
}

export function restoreImg(img: HTMLImageElement) {
    img.removeEventListener("error", onImgError);
    const orig = img.getAttribute(ORIG);
    img.removeAttribute(MARK);
    img.removeAttribute(ORIG);
    if (orig && img.getAttribute("src") !== orig) img.src = orig;
}

export function onImgError(e: Event) {
    const img = e.currentTarget;
    if (!(img instanceof HTMLImageElement)) return;
    const url = img.getAttribute("src") ?? "";
    if (url) failedAvatars.add(url);
    restoreImg(img);
    onAvatarFail?.();
}

export function paintImg(img: HTMLImageElement, url: string | null) {
    if (!url || failedAvatars.has(url)) {
        restoreImg(img);
        return;
    }
    dropSrcset(img);
    const current = img.getAttribute("src") ?? "";
    if (img.getAttribute(MARK) === "1") {
        if (current === url) return;
    } else if (current && current !== url && !img.hasAttribute(ORIG)) {
        img.setAttribute(ORIG, current);
    }
    img.setAttribute(MARK, "1");
    img.referrerPolicy = "no-referrer";
    img.removeEventListener("error", onImgError);
    img.addEventListener("error", onImgError);
    if (current !== url) img.src = url;
}
