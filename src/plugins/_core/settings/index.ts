/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { button } from "@components/controls";
import { icon } from "@components/icons";
import { useTooltips } from "@components/tooltip";
import { useIdentityMarks } from "@host/identity";
import { isHydrated } from "@host/ready";
import { accountMenu, type MountKind, sidebarMounts } from "@host/sidebar";
import { classNameFactory } from "@utils/css";
import { h, watchBody } from "@utils/dom";
import { clamp } from "@utils/misc";
import definePlugin, { OptionType, StartAt } from "@utils/types";

import { closePanel, togglePanel } from "./panel";
import styles from "./styles.css";

const cl = classNameFactory("bloom-entry-");
const DRAG_PX = 4;
const POSITION_VAR = "--bloom-entry-x";
const RIGHT = 1;

const settings = definePluginSettings({
    showSidebarEntry: {
        type: OptionType.BOOLEAN,
        description: "Always show the Bloom++ button above the account row in the sidebar. The account menu and the userscript menu always open the panel.",
        default: false,
    },
    showSidebarEntryOnHover: {
        type: OptionType.BOOLEAN,
        description: "Show the Bloom++ button while the pointer is over the account row in the sidebar.",
        default: true,
    },
    resetEntryPosition: {
        type: OptionType.COMPONENT,
        description: "Drag the hover button sideways to move it. Reset puts it back on the right.",
        render: host => {
            host.append(button("Reset position", () => {
                settings.store.entryPosition = RIGHT;
            }));
            return () => host.replaceChildren();
        },
    },
    entryPosition: { type: OptionType.CUSTOM, default: RIGHT },
});

const entries = new Map<Element, HTMLElement>();
let menuRegistered = false;
let unsubscribers: (() => void)[] = [];

function drag(event: PointerEvent, wrap: HTMLElement, onMove: () => void) {
    const trigger = event.currentTarget as HTMLElement;
    const travel = wrap.clientWidth - trigger.offsetWidth;
    if (event.button !== 0 || travel <= 0 || !wrap.classList.contains(cl("hover"))) return;
    const start = settings.store.entryPosition;
    let position = start;
    let moved = false;
    const controller = new AbortController();
    trigger.setPointerCapture(event.pointerId);
    trigger.addEventListener("pointermove", move => {
        if (!moved && Math.abs(move.clientX - event.clientX) < DRAG_PX) return;
        moved = true;
        onMove();
        position = clamp(start + (move.clientX - event.clientX) / travel, 0, RIGHT);
        wrap.style.setProperty(POSITION_VAR, String(position));
    }, { signal: controller.signal });
    trigger.addEventListener("lostpointercapture", () => {
        controller.abort();
        if (!moved) return;
        settings.store.entryPosition = position;
        wrap.style.removeProperty(POSITION_VAR);
    }, { signal: controller.signal });
}

function entry(kind: MountKind) {
    let dragged = false;
    const trigger = h("button", {
        class: cl("button"),
        title: "Bloom++ settings",
        attrs: { "type": "button", "aria-label": "Bloom++ settings" },
        on: {
            click: event => {
                event.preventDefault();
                event.stopPropagation();
                if (!dragged) togglePanel();
                dragged = false;
            },
            pointerdown: event => {
                dragged = false;
                if (kind !== "rail") drag(event, wrap, () => {
                    dragged = true;
                });
            },
        },
    }, icon("bloom"), kind !== "rail" && h("span", { class: cl("label"), text: "Bloom++" }));
    const wrap = h("div", { class: `bloom-root ${cl("wrap")} ${cl(kind)}`, attrs: { "data-bloom": "entry" } }, trigger);
    return wrap;
}

function menuEntry(menu: HTMLElement) {
    const item = h("div", {
        class: `bloom-root ${cl("menu-item")}`,
        attrs: { "role": "menuitem", "tabindex": "-1", "data-bloom": "menu-entry" },
        on: {
            click: event => {
                event.preventDefault();
                event.stopPropagation();
                menu.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
                togglePanel();
            },
        },
    }, icon("bloom"), h("span", { text: "Bloom++" }));
    const first = menu.querySelector('[role="menuitem"]');
    if (first?.parentElement) first.before(item);
    else menu.prepend(item);
}

function sync() {
    const { showSidebarEntry, showSidebarEntryOnHover } = settings.store;
    const mounts = showSidebarEntry || showSidebarEntryOnHover ? sidebarMounts() : [];
    for (const [anchor, node] of entries) {
        if (anchor.isConnected && mounts.some(mount => mount.anchor === anchor)) continue;
        node.remove();
        entries.delete(anchor);
    }
    for (const mount of mounts) {
        const existing = entries.get(mount.anchor);
        if (existing?.isConnected || !isHydrated(mount.anchor)) continue;
        const node = existing ?? entry(mount.kind);
        entries.set(mount.anchor, node);
        mount.insert(node);
    }
    for (const node of entries.values()) node.classList.toggle(cl("hover"), !showSidebarEntry);
    const menu = accountMenu();
    if (menu && !menu.querySelector('[data-bloom="menu-entry"]')) menuEntry(menu);
}

export default definePlugin({
    name: "Settings",
    description: "Bloom++ settings panel and its entries in the account menu and sidebar.",
    authors: ["Bloom contributors"],
    tags: [],
    icon: "bloom",
    required: true,
    startAt: StartAt.HostReady,
    settings,
    styles: () => `${styles}.${cl("hover")}{${POSITION_VAR}:${settings.store.entryPosition}}`,
    start() {
        unsubscribers = [watchBody(sync), useTooltips(), useIdentityMarks()];
        if (!menuRegistered && typeof GM_registerMenuCommand === "function") {
            GM_registerMenuCommand("Bloom++ settings", togglePanel);
            menuRegistered = true;
        }
    },
    stop() {
        for (const unsubscribe of unsubscribers) unsubscribe();
        for (const node of entries.values()) node.remove();
        entries.clear();
        closePanel();
    },
    onSettingsChange: sync,
});
