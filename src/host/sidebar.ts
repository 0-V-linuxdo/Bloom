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

const isScreenReaderOnly = (el: Element) => !!el.closest(".sr-only");

const hasMenuButton = (el: Element | null | undefined): el is Element => !!el?.querySelector(Sel.menuButton);

export function expandedFooters() {
    return [...document.querySelectorAll(Sel.sidebarScroll)]
        .map(scroll => [scroll.nextElementSibling, scroll.parentElement?.nextElementSibling].find(hasMenuButton))
        .filter(footer => footer != null);
}

export function sidebarMounts(): SidebarMount[] {
    const profiles = [...document.querySelectorAll(Sel.oldProfile)];
    if (profiles.length) {
        return profiles.map(button => {
            const anchor = button.parentElement?.children.length === 1 ? button.parentElement : button;
            return { kind: "profile", anchor, insert: node => anchor.before(node) };
        });
    }
    const mounts: SidebarMount[] = expandedFooters().map(footer => ({ kind: "expanded", anchor: footer, insert: node => footer.prepend(node) }));
    for (const rail of document.querySelectorAll(Sel.rail)) {
        const row = [...rail.children].find(hasMenuButton);
        if (row) mounts.push({ kind: "rail", anchor: row, insert: node => row.before(node) });
    }
    return mounts;
}

const hasContent = (el: Element) =>
    !el.closest("[data-bloom]") && (!!el.querySelector("img, [class*=rounded-full]") || textLeaves(el).some(leaf => !isScreenReaderOnly(leaf)));

const chipBeside = (button: HTMLElement) =>
    [...button.parentElement?.children ?? []].find((el): el is HTMLElement => el !== button && el instanceof HTMLElement && hasContent(el)) ?? null;

function profileButtons(): HTMLElement[] {
    const old = [...document.querySelectorAll<HTMLElement>(Sel.oldProfile)];
    if (old.length) return old;
    const footers = [...expandedFooters(), ...[...document.querySelectorAll(Sel.rail)].map(rail => [...rail.children].findLast(hasMenuButton))];
    return footers
        .map(footer => [...(footer?.querySelectorAll<HTMLElement>(Sel.menuButton) ?? [])].findLast(button => hasContent(button) || chipBeside(button)))
        .filter(button => button != null);
}

export const profileChips = () => profileButtons()
    .map(button => hasContent(button) ? button : chipBeside(button))
    .filter(chip => chip != null);

export function textLeaves(root: Element) {
    return [...root.querySelectorAll<HTMLElement>("*")].filter(el =>
        !el.children.length && !el.closest("[data-bloom]") && !!normalizeText(el.textContent ?? "") && !(el instanceof SVGElement));
}

const isRoundish = (el: Element) => {
    if (/rounded-full/.test(el.getAttribute("class") ?? "")) return true;
    if (!el.clientWidth) return false;
    const { borderRadius } = getComputedStyle(el);
    return borderRadius.includes("%") || Number.parseFloat(borderRadius) >= el.clientWidth / 2;
};

function setMark(root: Element, name: string, el: Element | null | undefined) {
    for (const stale of root.querySelectorAll(`[${name}]`)) if (stale !== el) stale.removeAttribute(name);
    if (el && !el.hasAttribute(name)) el.setAttribute(name, "");
}

function initialsCircle(leaf: HTMLElement, root: HTMLElement) {
    if (normalizeText(leaf.textContent ?? "").length > INITIALS_MAX) return null;
    const button = leaf.closest("button");
    for (let el: HTMLElement | null = leaf; el && el !== root && el !== button; el = el.parentElement) if (isRoundish(el)) return el;
    return null;
}

export function markIdentity(root: HTMLElement, prefix: "profile" | "menu") {
    if (!root.hasAttribute(`data-bloom-${prefix}`)) root.setAttribute(`data-bloom-${prefix}`, "");
    const image = root.querySelector("img:not([data-bloom] img)");
    const leaves = textLeaves(root);
    const initials = image ? null : leaves.map(leaf => initialsCircle(leaf, root)).find(el => el != null);
    const round = image?.closest("[class*=rounded-full]");
    const avatar = (round && round !== root && root.contains(round) ? round : image ?? initials) ?? root.querySelector("[class*=rounded-full]:not([data-bloom] *)");
    setMark(root, `data-bloom-${prefix}-avatar`, avatar);
    const text = leaves.filter(leaf => !avatar?.contains(leaf) && !isScreenReaderOnly(leaf));
    const plan = text.find(leaf => PLAN.test(normalizeText(leaf.textContent ?? "")));
    const email = text.find(leaf => EMAIL.test(leaf.textContent ?? ""));
    setMark(root, `data-bloom-${prefix}-plan`, plan);
    setMark(root, `data-bloom-${prefix}-email`, email);
    setMark(root, `data-bloom-${prefix}-name`, text.find(leaf => leaf !== plan && leaf !== email));
}

function openedMenu(button: HTMLElement) {
    const id = button.getAttribute("aria-expanded") === "true" && button.getAttribute("aria-controls");
    const menu = id ? document.getElementById(id) : null;
    return menu?.matches('[role="menu"]') ? menu : null;
}

export function accountMenu() {
    return profileButtons().map(openedMenu).find(menu => menu != null)
        ?? [...document.querySelectorAll<HTMLElement>('[role="menu"]')].find(menu =>
            !menu.closest("[data-bloom]") && (EMAIL.test(menu.textContent ?? "") || menu.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))
        ?? null;
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
