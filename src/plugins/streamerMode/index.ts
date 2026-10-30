/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { useIdentityMarks } from "@host/identity";
import { Sel } from "@host/selectors";
import { frameScheduler } from "@utils/dom";
import definePlugin, { OptionType, StartAt } from "@utils/types";

const BLUR = "filter:blur(6px)!important;transition:filter 0.2s ease";
const SIDEBAR = `:is(${Sel.sidebars})`;
const OPEN = "data-bloom-streamer-open";
const HOVER_ROWS = "[data-app-action-sidebar-thread-row], [data-app-action-sidebar-project-row], .bloom-recent-item";

const SIDEBAR_TITLE = ":not([data-app-action-sidebar-thread-row] *, [data-app-action-sidebar-project-row] *)";

function groups() {
    return {
        conversations: { selectors: BLOOM_APP
            ? ["[data-app-action-sidebar-thread-title]"]
            : [`${SIDEBAR} a[href*="/c/"]`, ".bloom-recent-title", ".bloom-recent-preview"], hover: true, row: "[data-app-action-sidebar-thread-row]" },
        projects: { selectors: BLOOM_APP
            ? ["[data-app-action-sidebar-project-label]"]
            : [`${SIDEBAR} a:is([href*="/project"], [href*="/g/g-p-"])`, "[data-app-action-sidebar-project-row]", ".bloom-recent-project"], hover: true, row: "[data-app-action-sidebar-project-row]" },
        accountAvatar: { selectors: BLOOM_APP
            ? ["[data-bloom-profile] img", "[data-bloom-menu] img"]
            : ["[data-bloom-profile-avatar]", "[data-bloom-menu-avatar]", "[data-bloom-profile] img", "[data-bloom-csi-avatar]"], hover: false },
        accountName: { selectors: ["[data-bloom-profile-name]", "[data-bloom-menu-name]"], hover: false },
        accountEmail: { selectors: ["[data-bloom-profile-email]", "[data-bloom-menu-email]", '[role="menu"] a[href^="mailto:"]'], hover: false },
        headerTitle: { selectors: BLOOM_APP
            ? [`[data-thread-title]${SIDEBAR_TITLE}`, `[data-thread-title-trigger]${SIDEBAR_TITLE}`]
            : ["#page-header h1", '[data-testid="conversation-title"]', '[data-testid="thread-title"]', "header [data-conversation-title]"], hover: false },
    } as const;
}

const settings = definePluginSettings({
    conversations: { type: OptionType.BOOLEAN, description: "Blur conversation titles in the sidebar and the recent chats switcher.", default: true },
    projects: { type: OptionType.BOOLEAN, description: "Blur project names.", default: true },
    accountAvatar: { type: OptionType.BOOLEAN, description: "Blur the account avatar.", default: true },
    accountName: { type: OptionType.BOOLEAN, description: "Blur the account name.", default: true },
    accountEmail: { type: OptionType.BOOLEAN, description: "Blur the account email.", default: true },
    headerTitle: { type: OptionType.BOOLEAN, description: "Blur the conversation title at the top of the page.", default: true },
});

function lift(list: string, row?: string) {
    const parts = [`:is(${list}):hover`, `.bloom-recent-item:hover :is(${list})`, `:is(${list})[${OPEN}]`];
    if (row) {
        parts.push(
            `${row}:hover`,
            `${row}:hover :is(${list})`,
            `${row}:is(${list}):hover`,
            `${row}[${OPEN}]`,
            `${row}[${OPEN}] :is(${list})`,
        );
    }
    return parts.join(",");
}

function css() {
    const GROUPS = groups();
    return Object.entries(GROUPS).filter(([key]) => settings.store[key as keyof typeof GROUPS]).map(([, group]) => {
        const list = group.selectors.join(",");
        if (!group.hover) return `:is(${list}){${BLUR}}`;
        const row = "row" in group ? group.row : undefined;
        return `:is(${list}){${BLUR}}${lift(list, row)}{filter:none!important}`;
    }).join("\n");
}

function rowFromPoint(x: number, y: number) {
    for (const node of document.elementsFromPoint(x, y)) {
        if (node instanceof Element) {
            const row = node.closest<HTMLElement>(HOVER_ROWS);
            if (row) return row;
        }
    }
    return null;
}

function paintOpen(row: HTMLElement | null) {
    for (const el of document.querySelectorAll<HTMLElement>(`[${OPEN}]`)) {
        if (el !== row) el.removeAttribute(OPEN);
    }
    if (row && !row.hasAttribute(OPEN)) row.setAttribute(OPEN, "");
}

let last: PointerEvent | undefined;
const flush = frameScheduler(() => {
    if (!last) return;
    paintOpen(rowFromPoint(last.clientX, last.clientY));
});

function onPointer(event: PointerEvent) {
    last = event;
    flush();
}

function onPointerLeave(event: PointerEvent) {
    if (event.relatedTarget instanceof Node && document.documentElement.contains(event.relatedTarget)) return;
    last = undefined;
    paintOpen(null);
}

let release: (() => void) | undefined;
let controller: AbortController | undefined;

export default definePlugin({
    name: "StreamerMode",
    description: "Blur conversation titles, project names and your account details while you stream.",
    authors: ["Bloom contributors"],
    tags: ["privacy", "ui"],
    icon: "eyeOff",
    startAt: StartAt.Init,
    settings,
    styles: css,
    start() {
        release = useIdentityMarks();
        controller = new AbortController();
        const opts = { capture: true, signal: controller.signal, passive: true };
        document.addEventListener("pointerover", onPointer, opts);
        document.addEventListener("pointermove", onPointer, opts);
        document.addEventListener("pointerout", onPointer, opts);
        window.addEventListener("pointerleave", onPointerLeave, opts);
    },
    stop() {
        controller?.abort();
        controller = undefined;
        last = undefined;
        paintOpen(null);
        release?.();
        release = undefined;
    },
});
