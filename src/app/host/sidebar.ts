/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { isVisible } from "@utils/dom";
import { normalizeText } from "@utils/misc";

import { markIdentity } from "../../host/sidebar";
import { queryAll, queryVisible } from "./query";
import { Sel } from "./selectors";

export type MountKind = "expanded" | "rail" | "profile";

export interface SidebarMount {
    kind: MountKind;
    anchor: Element;
    insert(node: HTMLElement): void;
}

export { markIdentity };

const rails = () => queryAll<HTMLElement>(Sel.rail).filter(isVisible);

function profileButton(rail: HTMLElement) {
    return queryVisible<HTMLElement>(Sel.profile, rail)
        ?? [...rail.querySelectorAll<HTMLElement>(Sel.menuButton)].findLast(isVisible)
        ?? null;
}

function profileSlot(rail: HTMLElement, profile: HTMLElement) {
    const slot = [...rail.children].find((el): el is HTMLElement => el instanceof HTMLElement && el !== profile && el.contains(profile));
    return slot ?? profile;
}

export function sidebarMounts(): SidebarMount[] {
    return rails().flatMap(rail => {
        const profile = profileButton(rail);
        if (!profile) return [{ kind: "rail" as const, anchor: rail, insert: (node: HTMLElement) => rail.append(node) }];
        const host = profileSlot(rail, profile);
        return [{
            kind: "rail" as const,
            anchor: host,
            insert: (node: HTMLElement) => (host === profile ? rail : host).append(node),
        }];
    });
}

export const profileChips = () => rails().map(profileButton).filter(button => button != null);

function openedMenu(button: HTMLElement) {
    const id = button.getAttribute("aria-expanded") === "true" && button.getAttribute("aria-controls");
    const menu = id ? document.getElementById(id) : null;
    return menu?.matches('[role="menu"]') ? menu : null;
}

export function accountMenu() {
    return profileChips().map(openedMenu).find(menu => menu != null)
        ?? queryAll<HTMLElement>('[role="menu"]').find(menu => !menu.closest("[data-bloom]") && /log ?out|sign out|退出/i.test(menu.textContent ?? ""))
        ?? null;
}

export const conversationLinks = (id: string) =>
    queryAll<HTMLElement>(Sel.threadRow).filter(row => row.getAttribute("data-app-action-sidebar-thread-id") === id);

export function sidebarTitle(id: string) {
    const row = conversationLinks(id)[0]
        ?? queryAll<HTMLElement>(Sel.threadRow).find(row => {
            const value = row.getAttribute("data-app-action-sidebar-thread-id") ?? "";
            return value.endsWith(id) || id.endsWith(value.replace(/^local:/, ""));
        });
    const title = row?.getAttribute("data-app-action-sidebar-thread-title") ?? normalizeText(row?.textContent ?? "");
    return title || null;
}

export function projectName(_href: string) {
    return null;
}
