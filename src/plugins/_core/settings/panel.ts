/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { isPluginEnabled, onPluginStateChange, plugins, setPluginEnabled } from "@api/PluginManager";
import { defaultValue, pinnedPlugins, readSetting, starredPlugins, writeSetting } from "@api/Settings";
import { button, iconButton, select, slider, switchControl, textInput } from "@components/controls";
import { icon } from "@components/icons";
import { classNameFactory } from "@utils/css";
import { h } from "@utils/dom";
import { Logger } from "@utils/Logger";
import { pluralize } from "@utils/misc";
import { OptionType, type Plugin, type PluginTag, type SettingDef, type SettingsDefinition } from "@utils/types";

const logger = new Logger("SettingsPanel");
const cl = classNameFactory("bloom-settings-");

const RECENT_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;
const RESET_CONFIRM_MS = 3000;
const HINT = "Toggle features. Some need a reload. Click the sliders icon to configure.";

type Tab = "favorites" | "recent" | "all" | PluginTag | "other";
type Filter = "all" | "enabled" | "disabled";

const TABS: readonly { id: Tab; label: string; }[] = [
    { id: "favorites", label: "Favorites" },
    { id: "recent", label: "Recent" },
    { id: "all", label: "All" },
    { id: "chat", label: "Chat" },
    { id: "ui", label: "UI" },
    { id: "privacy", label: "Privacy" },
    { id: "other", label: "Other" },
];

const FILTERS = [
    { label: "All", value: "all" },
    { label: "Enabled", value: "enabled" },
    { label: "Disabled", value: "disabled" },
] as const;

const EMPTY: Partial<Record<Tab, string>> = {
    favorites: "No favorites yet. Star a plugin to see it here.",
    recent: "No plugins updated in the last 7 days.",
};

const TAGGED = new Set<PluginTag>(["chat", "ui", "privacy"]);

let root: HTMLElement | null = null;
let tab: Tab = "all";
let filter: Filter = "all";
let query = "";
let cleanup: (() => void)[] = [];

const visiblePlugins = () => [...plugins.values()].filter(plugin => !plugin.hidden);

const isRecent = (plugin: Plugin) => !!plugin.updatedAt && Date.now() - plugin.updatedAt < RECENT_WINDOW_MS;

function inTab(plugin: Plugin) {
    switch (tab) {
        case "favorites": return starredPlugins.has(plugin.name);
        case "recent": return isRecent(plugin);
        case "all": return true;
        case "other": return !plugin.tags.some(tag => TAGGED.has(tag));
        case "chat":
        case "ui":
        case "privacy": return plugin.tags.includes(tab);
    }
}

function passesFilter(plugin: Plugin) {
    switch (filter) {
        case "all": return true;
        case "enabled": return isPluginEnabled(plugin);
        case "disabled": return !isPluginEnabled(plugin);
    }
}

function matchesQuery(plugin: Plugin) {
    const needle = query.trim().toLowerCase();
    return !needle || [plugin.name, plugin.description, ...plugin.tags].some(text => text.toLowerCase().includes(needle));
}

function sortPlugins(list: Plugin[]) {
    const pinned = pinnedPlugins.list();
    const rank = (plugin: Plugin) => pinned.includes(plugin.name) ? pinned.indexOf(plugin.name) : pinned.length;
    if (tab === "recent") return list.toSorted((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0));
    return list.toSorted((a, b) => rank(a) - rank(b) || a.name.localeCompare(b.name));
}

const definition = (plugin: Plugin): SettingsDefinition => plugin.settings?.def ?? {};

const hasVisibleSettings = (plugin: Plugin) => Object.values(definition(plugin)).some(def => def.type !== OptionType.CUSTOM);

function settingControl(plugin: Plugin, key: string, def: SettingDef) {
    const value = readSetting(plugin.name, key) ?? defaultValue(def);
    const write = (next: unknown) => writeSetting(plugin.name, key, next);
    switch (def.type) {
        case OptionType.BOOLEAN: return switchControl(value as boolean, write, def.description ?? key);
        case OptionType.SLIDER: return slider(value as number, def.min, def.max, def.step ?? 1, def.unit ?? "", write);
        case OptionType.SELECT: return select(value as string, def.options, write);
        case OptionType.STRING: return textInput(value as string, write, def.placeholder);
        case OptionType.NUMBER: return textInput(String(value), next => write(Number(next)), "", "number");
        case OptionType.COMPONENT: {
            const host = h("div", { class: cl("component") });
            cleanup.push(def.render(host));
            return host;
        }
        case OptionType.CUSTOM: return null;
    }
}

const humanize = (key: string) => key.replaceAll(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase());

function openPluginSettings(plugin: Plugin) {
    if (!root) return;
    const rows = Object.entries(definition(plugin)).filter(([, setting]) => setting.type !== OptionType.CUSTOM).map(([key, setting]) => {
        const control = settingControl(plugin, key, setting);
        const inline = setting.type === OptionType.BOOLEAN;
        const label = setting.type !== OptionType.COMPONENT && h("div", { class: cl("field-label"), text: humanize(key) });
        const description = setting.description && h("div", { class: cl("field-desc"), text: setting.description });
        return h("div", { class: cl("field", inline ? "field-inline" : "field-stacked") },
            (label || description) && h("div", { class: cl("field-text") }, label, description),
            control);
    });
    let armed: ReturnType<typeof setTimeout> | undefined;
    const reset = button("Reset", () => {
        if (!armed) {
            reset.textContent = "Click again to reset";
            armed = setTimeout(() => {
                armed = undefined;
                reset.textContent = "Reset";
            }, RESET_CONFIRM_MS);
            return;
        }
        clearTimeout(armed);
        plugin.settings?.reset();
        closePluginSettings();
        openPluginSettings(plugin);
    }, "danger");
    const popup = h("div", { class: cl("popup-backdrop"), on: { click: event => event.target === event.currentTarget && closePluginSettings() } },
        h("div", { class: cl("popup"), attrs: { "role": "dialog", "aria-label": `${plugin.name} settings` } },
            h("div", { class: cl("popup-header") },
                h("div", { class: cl("card-icon") }, icon(plugin.icon)),
                h("div", { class: cl("popup-title") },
                    h("div", { class: cl("card-name"), text: plugin.name }),
                    h("div", { class: cl("popup-authors"), text: plugin.authors.join(", ") })),
                iconButton("close", "Close", closePluginSettings)),
            h("p", { class: cl("popup-desc"), text: plugin.description }),
            h("div", { class: cl("fields") }, ...rows),
            h("div", { class: cl("popup-footer") }, reset)));
    root.querySelector(`.${cl("modal")}`)?.append(popup);
}

function closePluginSettings() {
    for (const fn of cleanup) fn();
    cleanup = [];
    root?.querySelector(`.${cl("popup-backdrop")}`)?.remove();
}

function card(plugin: Plugin) {
    const enabled = isPluginEnabled(plugin);
    const starred = starredPlugins.has(plugin.name);
    const pinned = pinnedPlugins.has(plugin.name);
    return h("div", { class: cl("card", enabled ? "card-on" : "card-off") },
        h("div", { class: cl("card-top") },
            h("div", { class: cl("card-icon") }, icon(plugin.icon)),
            h("div", { class: cl("card-actions") },
                iconButton("star", starred ? "Unstar" : "Star", () => {
                    starredPlugins.toggle(plugin.name);
                    renderList();
                }, starred),
                iconButton("pin", pinned ? "Unpin" : "Pin to top", () => {
                    pinnedPlugins.toggle(plugin.name);
                    renderList();
                }, pinned),
                hasVisibleSettings(plugin) && iconButton("gear", "Settings", () => openPluginSettings(plugin)),
                plugin.required ? null : switchControl(enabled, next => setPluginEnabled(plugin, next), `Enable ${plugin.name}`))),
        h("div", { class: cl("card-name"), text: plugin.name }),
        h("div", { class: cl("card-desc"), text: plugin.description, title: plugin.description }),
        h("div", { class: cl("card-footer"), text: plugin.authors.join(", ") }));
}

function renderTabs() {
    const hasOther = visiblePlugins().some(plugin => !plugin.tags.some(tag => TAGGED.has(tag)));
    const nav = root?.querySelector(`.${cl("tabs")}`);
    nav?.replaceChildren(...TABS.filter(item => item.id !== "other" || hasOther).map(item =>
        h("button", {
            class: cl("tab"),
            text: item.label,
            attrs: { "type": "button", "role": "tab", "aria-selected": String(item.id === tab) },
            on: {
                click: () => {
                    tab = item.id;
                    renderTabs();
                    renderList();
                },
            },
        })));
}

function renderList() {
    if (!root) return;
    const scoped = visiblePlugins().filter(inTab);
    const search = root.querySelector<HTMLInputElement>(`.${cl("search")} input`);
    if (search) search.placeholder = `Search ${pluralize(scoped.length, "plugin")}...`;
    const list = sortPlugins(scoped.filter(plugin => matchesQuery(plugin) && passesFilter(plugin)));
    const grid = root.querySelector(`.${cl("grid")}`);
    const empty = query.trim() ? "No plugins match your search." : EMPTY[tab] ?? "No plugins available.";
    grid?.replaceChildren(...list.length ? list.map(card) : [h("div", { class: cl("empty"), text: empty })]);
}

function onEscape(event: KeyboardEvent) {
    if (event.key !== "Escape") return;
    event.preventDefault();
    event.stopPropagation();
    if (root?.querySelector(`.${cl("popup-backdrop")}`)) closePluginSettings();
    else closePanel();
}

let unsubscribeState: (() => void) | undefined;
let controller: AbortController | undefined;

export function openPanel() {
    if (root) return;
    const search = h("input", { class: "bloom-input", attrs: { "type": "search", "aria-label": "Search plugins" } });
    search.value = query;
    search.addEventListener("input", () => {
        query = search.value;
        renderList();
    });
    root = h("div", { class: `bloom-root ${cl("backdrop")}`, attrs: { "data-bloom": "settings" }, on: { click: event => event.target === event.currentTarget && closePanel() } },
        h("div", { class: cl("modal"), attrs: { "role": "dialog", "aria-modal": "true", "aria-label": "Bloom++ settings" } },
            h("div", { class: cl("header") },
                h("div", { class: cl("logo") }, icon("bloom")),
                h("h2", { class: cl("title"), text: "Bloom++" }),
                h("span", { class: cl("hint"), title: HINT, attrs: { "aria-label": HINT, "tabindex": "0" } }, icon("info")),
                h("span", { class: cl("version"), text: `v${BLOOM_VERSION}` }),
                iconButton("close", "Close", closePanel)),
            h("div", { class: cl("tabs"), attrs: { role: "tablist" } }),
            h("div", { class: cl("toolbar") },
                h("label", { class: cl("search") }, icon("search"), search),
                select(filter, FILTERS, value => {
                    filter = value as Filter;
                    renderList();
                })),
            h("div", { class: cl("grid") })));
    root.addEventListener("keydown", event => event.stopPropagation());
    controller = new AbortController();
    document.addEventListener("keydown", onEscape, { capture: true, signal: controller.signal });
    document.body.append(root);
    renderTabs();
    renderList();
    unsubscribeState = onPluginStateChange(renderList);
    search.focus();
    logger.debug("Opened");
}

export function closePanel() {
    closePluginSettings();
    controller?.abort();
    unsubscribeState?.();
    root?.remove();
    root = null;
}

export const togglePanel = () => root ? closePanel() : openPanel();

export const isPanelOpen = () => !!root;
