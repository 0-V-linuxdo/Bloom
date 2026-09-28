/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { normalizeText } from "@utils/misc";

import { conversationIdFromHref } from "./route";
import { Sel } from "./selectors";

export type MountKind = "expanded" | "rail" | "profile";

export interface SidebarMount {
    kind: MountKind;
    anchor: Element;
    insert(node: HTMLElement): void;
}

const PLAN = /^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i;
const EMAIL = /\S+@\S+\.\S+/;
const INITIALS_MAX = 3;
const PROJECT_PATH = /^\/g\/(g-p-[^/]+)\//;
const PROJECT_SLUG_PREFIX = /^g-p-[0-9a-f]+-?/i;

const hasMenuButton = (el: Element | null | undefined): el is Element => !!el?.querySelector(Sel.menuButton);

export function expandedFooters() {
    return [...document.querySelectorAll(Sel.sidebarScroll)]
        .map(scroll => [scroll.nextElementSibling, scroll.parentElement?.nextElementSibling].find(hasMenuButton))
        .filter(footer => footer != null);
}

export function sidebarMounts(): SidebarMount[] {
    const profiles = [...document.querySelectorAll(Sel.oldProfile)];
    if (profiles.length) {
        return profiles.map(anchor => ({
            kind: "profile",
            anchor,
            insert: node => {
                const wrapper = anchor.parentElement?.children.length === 1 ? anchor.parentElement : anchor;
                wrapper.before(node);
            },
        }));
    }
    const mounts: SidebarMount[] = expandedFooters().map(footer => ({ kind: "expanded", anchor: footer, insert: node => footer.prepend(node) }));
    for (const rail of document.querySelectorAll(Sel.rail)) {
        const row = [...rail.children].find(hasMenuButton);
        if (row) mounts.push({ kind: "rail", anchor: row, insert: node => row.before(node) });
    }
    return mounts;
}

export function profileChips(): HTMLElement[] {
    const old = [...document.querySelectorAll<HTMLElement>(Sel.oldProfile)];
    if (old.length) return old;
    const footers = [...expandedFooters(), ...[...document.querySelectorAll(Sel.rail)].map(rail => [...rail.children].findLast(hasMenuButton))];
    return footers
        .map(footer => [...(footer?.querySelectorAll<HTMLElement>(Sel.menuButton) ?? [])].findLast(button => button.querySelector("img") || textLeaves(button).length))
        .filter(chip => chip != null);
}

export function textLeaves(root: Element) {
    return [...root.querySelectorAll<HTMLElement>("*")].filter(el =>
        !el.children.length && !el.closest("[data-bloom]") && !!normalizeText(el.textContent ?? "") && !(el instanceof SVGElement));
}

const isRoundish = (el: Element) => {
    const style = getComputedStyle(el);
    return style.borderRadius.includes("%") || Number.parseFloat(style.borderRadius) >= el.clientWidth / 2 || /rounded-full/.test(el.getAttribute("class") ?? "");
};

function setMark(el: Element | null | undefined, name: string) {
    if (el && !el.hasAttribute(name)) el.setAttribute(name, "");
}

function initialsCircle(leaf: HTMLElement) {
    if (normalizeText(leaf.textContent ?? "").length > INITIALS_MAX) return null;
    for (let el: HTMLElement | null = leaf; el && el !== leaf.closest("button"); el = el.parentElement) if (isRoundish(el)) return el;
    return null;
}

export function markIdentity(root: HTMLElement, prefix: "profile" | "menu") {
    setMark(root, `data-bloom-${prefix}`);
    const image = root.querySelector("img:not([data-bloom] img)");
    const leaves = textLeaves(root);
    const initials = image ? null : leaves.map(initialsCircle).find(el => el != null);
    const round = image?.closest("[class*=rounded-full]");
    const avatar = round && round !== root && root.contains(round) ? round : image ?? initials;
    setMark(avatar, `data-bloom-${prefix}-avatar`);
    const text = leaves.filter(leaf => !avatar?.contains(leaf));
    const plan = text.find(leaf => PLAN.test(normalizeText(leaf.textContent ?? "")));
    const email = text.find(leaf => EMAIL.test(leaf.textContent ?? ""));
    setMark(plan, `data-bloom-${prefix}-plan`);
    setMark(email, `data-bloom-${prefix}-email`);
    setMark(text.find(leaf => leaf !== plan && leaf !== email), `data-bloom-${prefix}-name`);
}

export function accountMenu() {
    return [...document.querySelectorAll<HTMLElement>('[role="menu"]')].find(menu =>
        !menu.closest("[data-bloom]") && (EMAIL.test(menu.textContent ?? "") || menu.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]'))) ?? null;
}

export function accountMenuHeader(menu: HTMLElement) {
    const email = textLeaves(menu).find(leaf => EMAIL.test(leaf.textContent ?? ""));
    if (!email) return null;
    let header: HTMLElement = email;
    while (header.parentElement && header.parentElement !== menu && !header.parentElement.matches('[role="menuitem"], [role="group"]')) header = header.parentElement;
    return header;
}

export const conversationLinks = (id: string) =>
    [...document.querySelectorAll<HTMLAnchorElement>(Sel.conversationLink)].filter(link => !link.closest("[data-bloom]") && conversationIdFromHref(link.href) === id);

export function sidebarTitle(id: string) {
    const link = conversationLinks(id).find(a => normalizeText(a.textContent ?? ""));
    return link ? normalizeText(link.textContent ?? "") : null;
}

export function projectName(href: string) {
    const slug = new URL(href, location.origin).pathname.match(PROJECT_PATH)?.[1];
    if (!slug) return null;
    const link = [...document.querySelectorAll<HTMLAnchorElement>(`a[href*="/g/${CSS.escape(slug)}"]`)]
        .find(a => !conversationIdFromHref(a.href) && normalizeText(a.textContent ?? ""));
    return link ? normalizeText(link.textContent ?? "") : slug.replace(PROJECT_SLUG_PREFIX, "").replaceAll("-", " ") || null;
}
