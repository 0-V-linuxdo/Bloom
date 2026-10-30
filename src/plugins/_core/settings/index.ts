/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { plugins } from "@api/PluginManager";
import { definePluginSettings } from "@api/Settings";
import { button, switchControl } from "@components/controls";
import { icon, type IconName } from "@components/icons";
import { useTooltips } from "@components/tooltip";
import { useIdentityMarks } from "@host/identity";
import { isHydrated } from "@host/ready";
import { accountMenu, type MountKind, sidebarMounts } from "@host/sidebar";
import { classNameFactory } from "@utils/css";
import { h, watchBody } from "@utils/dom";
import { clamp } from "@utils/misc";
import { mountOverlay } from "@utils/overlay";
import definePlugin, { OptionType, type Plugin, StartAt } from "@utils/types";

import { ENTRY_DEFAULTS, ENTRY_KEYS, type EntryKey, entryOn, isEntryKey } from "./entries";
import { closePanel, hasVisibleSettings, openPanel, togglePanel } from "./panel";
import styles from "./styles.css";

const cl = classNameFactory("bloom-entry-");
const DRAG_PX = 4;
const POSITION_VAR = "--bloom-entry-x";
const RIGHT = 1;
const FLYOUT_GAP_PX = 4;
const FLYOUT_EDGE_PX = 8;
const FLYOUT_CLOSE_MS = 150;

const settings = definePluginSettings({
    showSidebarEntry: {
        type: OptionType.BOOLEAN,
        description: "Always show the Bloom++ button above the account row in the sidebar.",
        default: ENTRY_DEFAULTS.showSidebarEntry,
    },
    showSidebarEntryOnHover: {
        type: OptionType.BOOLEAN,
        description: "Show the Bloom++ button while the pointer is over the account row in the sidebar.",
        default: ENTRY_DEFAULTS.showSidebarEntryOnHover,
    },
    showAccountMenuEntry: {
        type: OptionType.BOOLEAN,
        description: "Show Bloom++ at the top of the account menu.",
        default: ENTRY_DEFAULTS.showAccountMenuEntry,
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
    showBloomMenu: {
        type: OptionType.BOOLEAN,
        description: "Hovering the Bloom++ row in the account menu opens a menu with Plugins, Themes, Quick CSS and plugin settings.",
        default: true,
    },
    menuPlugins: {
        type: OptionType.COMPONENT,
        description: "Plugins listed in that menu.",
        render: host => {
            host.append(...listedPlugins().map(plugin => h("div", { class: cl("menu-pick") },
                icon(plugin.icon),
                h("span", { class: "bloom-truncate", text: plugin.name }),
                switchControl(inMenu(plugin), shown => {
                    settings.store.menuPicks = { ...settings.store.menuPicks, [plugin.name]: shown };
                }, `List ${plugin.name} in the menu`))));
            return () => host.replaceChildren();
        },
    },
    entryPosition: { type: OptionType.CUSTOM, default: RIGHT },
    menuPicks: { type: OptionType.CUSTOM, default: {} as Record<string, boolean> },
});

const entries = new Map<Element, HTMLElement>();
let flyout: HTMLElement | null = null;
let flyoutTimer: ReturnType<typeof setTimeout> | undefined;

const listedPlugins = () => [...plugins.values()].filter(plugin => !plugin.hidden).toSorted((a, b) => a.name.localeCompare(b.name));

const inMenu = (plugin: Plugin) => settings.store.menuPicks[plugin.name] ?? hasVisibleSettings(plugin);
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
    const finish = () => {
        controller.abort();
        if (!moved) return;
        settings.store.entryPosition = position;
        wrap.style.removeProperty(POSITION_VAR);
    };
    trigger.addEventListener("pointerup", finish, { signal: controller.signal });
    trigger.addEventListener("lostpointercapture", finish, { signal: controller.signal });
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

function closeFlyout() {
    clearTimeout(flyoutTimer);
    flyout?.remove();
    flyout = null;
}

function leaveFlyout() {
    clearTimeout(flyoutTimer);
    flyoutTimer = setTimeout(closeFlyout, FLYOUT_CLOSE_MS);
}

const dismissMenu = (menu: HTMLElement) => menu.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));

function openFlyout(item: HTMLElement, menu: HTMLElement) {
    clearTimeout(flyoutTimer);
    if (flyout?.isConnected || !settings.store.showBloomMenu) return;
    const row = (label: string, name: IconName, run: () => void) => h("div", {
        class: cl("flyout-item"),
        attrs: { role: "menuitem" },
        on: {
            pointerdown: event => {
                if (event.button !== 0) return;
                event.preventDefault();
                event.stopPropagation();
                closeFlyout();
                dismissMenu(menu);
                run();
            },
        },
    }, icon(name), h("span", { class: "bloom-truncate", text: label }));
    const picked = listedPlugins().filter(inMenu);
    flyout = h("div", { class: `bloom-root ${cl("flyout")}`, attrs: { "data-bloom": "menu-flyout", "role": "menu", "aria-label": "Bloom++" }, on: { pointerenter: () => clearTimeout(flyoutTimer), pointerleave: leaveFlyout } },
        row("Plugins", "bloom", () => openPanel("plugins")),
        row("Themes", "spark", () => openPanel("themes")),
        row("Quick CSS", "edit", () => openPanel("css")),
        picked.length > 0 && h("div", { class: cl("flyout-break"), attrs: { role: "separator" } }),
        ...picked.map(plugin => row(plugin.name, plugin.icon, () => openPanel("plugins", plugin.name))));
    mountOverlay(flyout);
    const box = menu.getBoundingClientRect();
    const { width, height } = flyout.getBoundingClientRect();
    const right = box.right + FLYOUT_GAP_PX;
    flyout.style.left = `${right + width > innerWidth ? box.left - width - FLYOUT_GAP_PX : right}px`;
    flyout.style.top = `${clamp(item.getBoundingClientRect().top, FLYOUT_EDGE_PX, innerHeight - height - FLYOUT_EDGE_PX)}px`;
}

function menuEntry(menu: HTMLElement) {
    const item = h("div", {
        class: `bloom-root ${cl("menu-item")}`,
        attrs: { "role": "menuitem", "tabindex": "-1", "data-bloom": "menu-entry" },
        on: {
            click: event => {
                event.preventDefault();
                event.stopPropagation();
                closeFlyout();
                dismissMenu(menu);
                togglePanel();
            },
            pointerenter: () => openFlyout(item, menu),
            pointerleave: leaveFlyout,
        },
    }, icon("bloom"), h("span", { text: "Bloom++" }), settings.store.showBloomMenu && h("span", { class: cl("menu-chevron") }, icon("chevron")));
    const first = menu.querySelector('[role="menuitem"]');
    if (first?.parentElement) first.before(item);
    else menu.prepend(item);
}

function dropChrome() {
    closeFlyout();
    for (const node of document.querySelectorAll('[data-bloom="entry"], [data-bloom="menu-entry"]')) node.remove();
    entries.clear();
}

function dropMenuEntries() {
    for (const node of document.querySelectorAll('[data-bloom="menu-entry"]')) node.remove();
}

function sync() {
    const { showSidebarEntry, showSidebarEntryOnHover, showAccountMenuEntry } = settings.store;
    const mounts = showSidebarEntry || showSidebarEntryOnHover ? sidebarMounts() : [];
    const keep = new Set(mounts.map(mount => mount.anchor));
    for (const [anchor, node] of entries) {
        if (anchor.isConnected && keep.has(anchor)) continue;
        node.remove();
        entries.delete(anchor);
    }
    for (const node of document.querySelectorAll<HTMLElement>('[data-bloom="entry"]')) {
        if (![...entries.values()].includes(node)) node.remove();
    }
    for (const mount of mounts) {
        const existing = entries.get(mount.anchor);
        if (existing?.isConnected || !isHydrated(mount.anchor)) continue;
        const node = existing ?? entry(mount.kind);
        entries.set(mount.anchor, node);
        mount.insert(node);
    }
    for (const node of entries.values()) node.classList.toggle(cl("hover"), !showSidebarEntry);
    if (!showAccountMenuEntry) {
        dropMenuEntries();
        return;
    }
    const menu = accountMenu();
    if (menu && !menu.querySelector('[data-bloom="menu-entry"]')) menuEntry(menu);
    if (!menu) closeFlyout();
}

function onSettingsChange(key?: string) {
    if (!ENTRY_KEYS.some(entryOn)) settings.store[isEntryKey(key ?? "") ? key as EntryKey : "showSidebarEntry"] = true;
    sync();
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
    styles: () => `${styles}${BLOOM_APP
        ? "[data-app-navigation-rail] [data-bloom=entry]{position:absolute;inset:auto;left:50%;bottom:100%;transform:translateX(-50%);width:max-content;margin:0;padding-block:0.25rem;pointer-events:none;z-index:5;display:flex;justify-content:center}"
            + "[data-app-navigation-rail]>[data-bloom=entry]{bottom:2.75rem}"
            + "[data-app-navigation-rail] [data-bloom=entry] .bloom-entry-button{pointer-events:auto}"
            + "[data-app-navigation-rail] [data-bloom=entry].bloom-entry-hover:not(:hover > *){display:none;transition:display 0s 0.2s allow-discrete}"
        : ""}.${cl("hover")}{${POSITION_VAR}:${settings.store.entryPosition}}`,
    start() {
        dropChrome();
        unsubscribers = [watchBody(sync), useTooltips(), useIdentityMarks()];
        if (!menuRegistered && typeof GM_registerMenuCommand === "function") {
            GM_registerMenuCommand("Bloom++ settings", togglePanel);
            menuRegistered = true;
        }
    },
    stop() {
        for (const unsubscribe of unsubscribers) unsubscribe();
        unsubscribers = [];
        dropChrome();
        closePanel();
    },
    onSettingsChange,
});
