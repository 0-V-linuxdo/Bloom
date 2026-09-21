/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Locate the official sidebar face without inserting nodes. Helium / current
 * ChatGPT often paint initials on a span (no <img>, no rounded-full).
 *
 * Account chip (chatgpt.com + NoSidebarIdentity 1.4.14):
 *
 *   button[data-testid=accounts-profile-button]
 *     .min-w-0.flex          ← whole row; first child IS the avatar
 *       [face]               ← flex h-8 w-8, teal “18”, no <img>
 *       .truncate            ← display name (NSI visibility:hidden)
 *       .text-xs             ← plan “Pro”
 *
 * Older / photo chips keep the face as a sibling of a block `.min-w-0`.
 * `firstClassHit` must include `h-8`/`w-8` — Helium drops `rounded-full`
 * / `size-8`. Never mark the plan label (“Pro” is 3 chars).
 */

export const SLOT_ATTR = "data-bloom-csi-slot";

export const BLOOM_CHROME =
    "#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog";

const SIZE_CLASS = /\bsize-(?:[6-9]|10)\b/;
const HW_CLASS = /\b(?:h|w)-(?:[6-9]|10)\b/;
const PLAN_TEXT = /^(plus|pro|free|team|go|business|enterprise)$/i;

/** querySelector set for class-based faces. Token `~=` so `h-80` is not `h-8`. */
export const CLASS_HIT_SEL = [
    '[class*="rounded-full"]',
    '[class*="avatar"]',
    '[class~="size-6"]',
    '[class~="size-7"]',
    '[class~="size-8"]',
    '[class~="size-9"]',
    '[class~="size-10"]',
    '[class~="h-6"]',
    '[class~="h-7"]',
    '[class~="h-8"]',
    '[class~="h-9"]',
    '[class~="h-10"]',
    '[class~="w-6"]',
    '[class~="w-7"]',
    '[class~="w-8"]',
    '[class~="w-9"]',
    '[class~="w-10"]',
].join(",");

export function classOf(el: Element): string {
    return el.getAttribute("class") || "";
}

export function looksLikeAvatarClass(cls: string): boolean {
    if (/(?:^|\s)(?:rounded-full|avatar)(?:\s|$)/i.test(cls)) return true;
    if (/avatar/i.test(cls)) return true;
    if (SIZE_CLASS.test(cls)) return true;
    return HW_CLASS.test(cls) && /\bh-(?:[6-9]|10)\b/.test(cls) && /\bw-(?:[6-9]|10)\b/.test(cls);
}

export function isInitialsText(text: string): boolean {
    const t = String(text ?? "").replace(/\s+/g, "");
    return t.length >= 1 && t.length <= 3 && !isPlanLabel(t);
}

export function isPlanLabel(text: string): boolean {
    return PLAN_TEXT.test(String(text ?? "").replace(/\s+/g, ""));
}

export function inChrome(el: Element | null): boolean {
    return !!el?.closest(BLOOM_CHROME);
}

function isNameish(el: HTMLElement): boolean {
    if (el.classList.contains("min-w-0") || el.classList.contains("truncate")) return true;
    return !!el.querySelector(".min-w-0, .truncate");
}

function isPlanish(el: HTMLElement): boolean {
    const cls = classOf(el);
    if (/\btext-xs\b/.test(cls)) return true;
    if (/text-token-text-secondary/.test(cls) || /text-token-text-tertiary/.test(cls)) return true;
    return isPlanLabel(el.textContent || "");
}

function isReplaced(el: Element): boolean {
    const tag = el.tagName;
    return tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "IFRAME";
}

function isChipRoot(el: HTMLElement): boolean {
    return el.tagName === "BUTTON" || el.getAttribute("role") === "button";
}

function isFlexRow(cls: string): boolean {
    return /\bflex\b/.test(cls) && !/\bflex-col\b/.test(cls);
}

export function isLaidOutCircle(el: HTMLElement): boolean {
    if (inChrome(el) || isReplaced(el) || isChipRoot(el) || isPlanish(el)) return false;
    if (isNameish(el)) return false;
    let r: DOMRect;
    try {
        r = el.getBoundingClientRect();
    } catch {
        return false;
    }
    if (r.width < 16 || r.width > 80 || r.height < 16 || r.height > 80) return false;
    return Math.abs(r.width - r.height) < 12;
}

function isInitialsGlyph(el: HTMLElement): boolean {
    if (inChrome(el) || isReplaced(el) || isChipRoot(el) || isPlanish(el)) return false;
    if (el.querySelector("img, svg, .min-w-0, .truncate")) return false;
    return isInitialsText(el.textContent || "");
}

function isAvatarCandidate(el: HTMLElement): boolean {
    if (inChrome(el) || isChipRoot(el) || isNameish(el) || isPlanish(el)) return false;
    if (looksLikeAvatarClass(classOf(el))) return true;
    if (isInitialsGlyph(el)) return true;
    return isLaidOutCircle(el);
}

function usableChild(el: HTMLElement): boolean {
    if (inChrome(el) || isNameish(el) || isChipRoot(el) || isPlanish(el)) return false;
    if (isReplaced(el)) return false;
    return true;
}

/**
 * Outermost wrap that still only holds the face — never the row that also
 * has `.min-w-0` / `.truncate`, never the profile button.
 */
export function nearestAvatarWrap(from: HTMLElement, root: HTMLElement): HTMLElement | null {
    let n: HTMLElement | null = isReplaced(from) || from.tagName === "SVG" ? from.parentElement : from;
    let found: HTMLElement | null = null;
    while (n && root.contains(n) && n !== root) {
        if (isChipRoot(n) || isNameish(n) || isPlanish(n)) break;
        if (!inChrome(n)) found = n;
        n = n.parentElement;
    }
    return found;
}

/**
 * Helium / NSI 1.4.14: `.min-w-0.flex > :first-child` is the avatar, not a
 * name line. Classic chips keep the face as a *sibling* of `.min-w-0`.
 */
function slotBesideName(root: HTMLElement): HTMLElement | null {
    for (const col of root.querySelectorAll(".min-w-0")) {
        if (!(col instanceof HTMLElement) || inChrome(col)) continue;

        if (isFlexRow(classOf(col))) {
            const extras: HTMLElement[] = [];
            for (const child of col.children) {
                if (!(child instanceof HTMLElement) || !usableChild(child)) continue;
                if (isAvatarCandidate(child) || looksLikeAvatarClass(classOf(child))) {
                    return nearestAvatarWrap(child, root) ?? child;
                }
                extras.push(child);
            }
            if (extras.length === 1) return nearestAvatarWrap(extras[0], root) ?? extras[0];
        }

        const parent = col.parentElement;
        if (!parent || !root.contains(parent)) continue;
        for (const sib of parent.children) {
            if (!(sib instanceof HTMLElement) || sib === col) continue;
            if (!usableChild(sib)) continue;
            return nearestAvatarWrap(sib, root) ?? sib;
        }
    }
    return null;
}

function firstClassHit(root: HTMLElement): HTMLElement | null {
    const nodes = root.querySelectorAll<HTMLElement>(CLASS_HIT_SEL);
    for (const node of nodes) {
        if (!isAvatarCandidate(node)) continue;
        return nearestAvatarWrap(node, root) ?? node;
    }
    return null;
}

function firstInitialsHit(root: HTMLElement): HTMLElement | null {
    for (const node of root.querySelectorAll<HTMLElement>("span, div, p, i")) {
        if (!isInitialsGlyph(node)) continue;
        return nearestAvatarWrap(node, root) ?? node;
    }
    return null;
}

function firstLaidOutHit(root: HTMLElement): HTMLElement | null {
    for (const node of root.querySelectorAll<HTMLElement>("*")) {
        if (!isLaidOutCircle(node)) continue;
        return nearestAvatarWrap(node, root) ?? node;
    }
    return null;
}

/**
 * Official face slot: sibling of the `.min-w-0` name column, or the first
 * child of Helium `.min-w-0.flex`, else class / initials / layout circle.
 * Never the profile button, never an <img> (`::after` on a replaced
 * element does not paint), never the Plus/Pro/Free plan label.
 */
export function pickAvatarSlot(root: HTMLElement, face: HTMLImageElement | null): HTMLElement | null {
    if (inChrome(root)) return null;

    if (face && !inChrome(face) && root.contains(face)) {
        const wrap = nearestAvatarWrap(face, root);
        if (wrap) return wrap;
    }

    return slotBesideName(root)
        ?? firstClassHit(root)
        ?? firstInitialsHit(root)
        ?? firstLaidOutHit(root);
}

/** CSS descendants to size with avatarSize. No wrapper :has(). */
export function faceSizeSuffixes(slotAttr: string): string[] {
    return [
        "img",
        `[${slotAttr}]`,
        `[${slotAttr}] > *`,
        '[class~="rounded-full"]',
        '[class*="avatar"]',
        '[class~="size-6"]',
        '[class~="size-7"]',
        '[class~="size-8"]',
        '[class~="size-9"]',
        '[class~="size-10"]',
        '[class~="h-8"]',
        '[class~="w-8"]',
    ];
}
