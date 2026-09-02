/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Persistent Bloom++ row in the chatgpt-exporter pocket (sibling of the
 * avatar chip, inside the account footer — never a direct child of nav /
 * #stage-slideover-sidebar). Settings panel always docks on document.body
 * (never rail.before / never in-flow in the footer). No FAB, no popover,
 * no inset:0 overlay. #bloom-root is a zero-size HUD host only.
 */

import { emitBloomEvent, onBloomEvent } from "../../../api/Events";
import {
    definePluginSettings,
    getPinnedPlugins,
    getStarredPlugins,
    isPluginPinned,
    isPluginStarred,
    Settings,
    togglePluginPinned,
    togglePluginStarred,
} from "../../../api/Settings";
import { isPluginEnabled, plugins, togglePlugin } from "../../../api/PluginManager";
import {
    findAccountMenu,
    findProfileButton,
    findSidebarHost,
    findTinyBar,
    isOnscreenRail,
    pathHitsProfile,
    railAnchor,
} from "../../../host/accountMenu";
import {
    applySchemeTokens,
    resolveScheme,
    watchHostScheme,
    type SchemePref,
} from "../../../host/theme";
import { requestIdleReady } from "../../../host/idleReady";
import { Devs, VERSION } from "../../../utils/constants";
import { registerStyle, syncShadowPluginStyles } from "../../../utils/css";
import definePlugin, { OptionType, StartAt, type Plugin } from "../../../utils/types";
import css from "./styles.css";

const ROOT_ID = "bloom-root";
const RAIL_ID = "bloom-rail-item";
const ITEM_ID = "bloom-account-item";
const SIDEBAR_ID = "bloom-sidebar-panel";
const STYLE_ID = "bloom-settings-css";
const RAIL_POLL_MS = 2_000;

const settings = definePluginSettings({
    appearance: {
        type: OptionType.SELECT,
        description: "Color scheme for the Bloom++ shell and composed favicons.",
        options: [
            { label: "Follow host", value: "auto", default: true },
            { label: "Light", value: "light" },
            { label: "Dark", value: "dark" },
        ],
    },
});

let host: HTMLElement | null = null;
let shadow: ShadowRoot | null = null;
let pluginView = false;
let bloomOpen = false;
let fieldUnmounts: Array<() => void> = [];
let unwatchHost: (() => void) | null = null;
let menuAbort: AbortController | null = null;
let menuWatch: MutationObserver | null = null;
let watchedMenu: HTMLElement | null = null;
let sidebarWatch: MutationObserver | null = null;
let watchedSidebar: HTMLElement | null = null;
let railTimer: ReturnType<typeof setInterval> | undefined;
let listEl: HTMLDivElement | null = null;
let pluginEl: HTMLDivElement | null = null;
let gridEl: HTMLDivElement | null = null;
let pluginTitleEl: HTMLElement | null = null;
let pluginSubEl: HTMLElement | null = null;
let pluginFieldsEl: HTMLDivElement | null = null;
let emptyEl: HTMLParagraphElement | null = null;
let searchInput: HTMLInputElement | null = null;
let filterSelect: HTMLSelectElement | null = null;
let tabsEl: HTMLDivElement | null = null;
let unsubList: Array<() => void> = [];

type ListFilter = "all" | "enabled" | "disabled";
type PluginCategory = "favorites" | "all" | "chat" | "ui" | "privacy";

const FILTER_OPTIONS: readonly { value: ListFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "enabled", label: "Enabled" },
    { value: "disabled", label: "Disabled" },
];

const CATEGORY_TABS: readonly { id: PluginCategory; label: string }[] = [
    { id: "favorites", label: "Favorites" },
    { id: "all", label: "All" },
    { id: "chat", label: "Chat" },
    { id: "ui", label: "UI" },
    { id: "privacy", label: "Privacy" },
];

let searchQuery = "";
let listFilter: ListFilter = "all";
let category: PluginCategory = "all";

function blossomSvg(): string {
    return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>`;
}

function closeSvg(): string {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>`;
}

function backSvg(): string {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>`;
}

function settings2Svg(): string {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>`;
}

function starSvg(filled: boolean): string {
    const path = `<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>`;
    return filled
        ? `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${path}</svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
}

function pinSvg(filled: boolean): string {
    const stem = `<path d="M12 17v5"/>`;
    const head = `<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/>`;
    return filled
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${stem}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${stem}${head}</svg>`;
}

const PLUGIN_ICONS: Record<string, string> = {
    ChatStateFavicons: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>`,
    InputHistory: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>`,
    NoShareLink: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>`,
    NoDictation: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>`,
    NoSidebarIdentity: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>`,
    RecentTopics: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>`,
    Cleaner: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>`,
};

function pluginIcon(plugin: Plugin): string {
    return plugin.icon || PLUGIN_ICONS[plugin.name] || blossomSvg();
}

function appearancePref(): SchemePref {
    return "auto";
}

function paintScheme() {
    const pref = appearancePref();
    const scheme = resolveScheme(pref);
    if (host) {
        host.setAttribute("data-bloom-scheme", scheme);
        applySchemeTokens(host, scheme, pref === "auto");
    }
    emitBloomEvent("schemeChange", { scheme, pref });
}

function setDismissed(el: HTMLElement | null, dismissed: boolean) {
    if (!el) return;
    el.hidden = dismissed;
    el.toggleAttribute("inert", dismissed);
    if (dismissed) el.setAttribute("aria-hidden", "true");
    else el.removeAttribute("aria-hidden");
}

function stripLegacyChrome() {
    document.querySelectorAll(
        ".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel",
    ).forEach(n => n.remove());
}

/** Zero-size HUD host. Never inset:0. Never a settings overlay. */
function resetHostBox(el: HTMLElement) {
    el.style.position = "fixed";
    el.style.top = "0";
    el.style.left = "0";
    el.style.right = "auto";
    el.style.bottom = "auto";
    el.style.width = "0px";
    el.style.height = "0px";
    el.style.margin = "0";
    el.style.padding = "0";
    el.style.border = "0";
    el.style.overflow = "hidden";
    el.style.pointerEvents = "none";
    el.style.zIndex = "0";
    el.style.inset = "auto";
}

export function ensureHost(): ShadowRoot {
    host = document.getElementById(ROOT_ID) as HTMLElement | null;
    if (!host) {
        host = document.createElement("div");
        host.id = ROOT_ID;
    }
    resetHostBox(host);
    if (document.body && host.parentNode !== document.body) document.body.appendChild(host);
    shadow = host.shadowRoot ?? host.attachShadow({ mode: "open" });
    shadow.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop").forEach(n => n.remove());
    paintScheme();
    syncShadowPluginStyles();
    return shadow;
}

function injectCss() {
    registerStyle("settings", css);
    if (document.getElementById(STYLE_ID) || !document.head) return;
    if (document.querySelector('style[data-bloom-style="settings"]')) return;
    const el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = css;
    document.head.appendChild(el);
}

function whenBody(fn: () => void) {
    if (document.body) {
        fn();
        return;
    }
    let done = false;
    const finish = () => {
        if (done || !document.body) return;
        done = true;
        clearInterval(poll);
        fn();
    };
    const poll = setInterval(finish, 20);
    document.addEventListener("DOMContentLoaded", finish, { once: true });
}

function clearFields() {
    for (const u of fieldUnmounts) u();
    fieldUnmounts = [];
}

function pluginToggle(name: string, checked: boolean, required: boolean): HTMLElement {
    const toggle = document.createElement("label");
    toggle.className = "bloom-toggle";
    const sw = document.createElement("span");
    sw.className = "bloom-switch";
    const box = document.createElement("input");
    box.type = "checkbox";
    box.checked = checked;
    box.disabled = required;
    box.setAttribute("aria-label", `${name} enabled`);
    const track = document.createElement("span");
    sw.append(box, track);
    toggle.append(sw);
    return toggle;
}

function hasSettings(plugin: Plugin): boolean {
    return !!plugin.settings && Object.keys(plugin.settings.def).length > 0;
}

function fieldControl(pluginName: string, key: string, spec: { type: OptionType; description?: string; min?: number; max?: number; hidden?: boolean; options?: readonly { label: string; value: string }[]; render?: (el: HTMLElement) => () => void }): HTMLElement | null {
    if (spec.hidden) return null;
    if (spec.type === OptionType.COMPONENT && spec.render) {
        const wrap = document.createElement("details");
        wrap.className = "bloom-field bloom-field-block";
        const sum = document.createElement("summary");
        sum.textContent = spec.description || key;
        const inner = document.createElement("div");
        fieldUnmounts.push(spec.render(inner));
        wrap.append(sum, inner);
        return wrap;
    }

    const wrap = document.createElement("div");
    wrap.className = spec.type === OptionType.SLIDER ? "bloom-field bloom-field-stack" : "bloom-field";
    const cap = document.createElement("span");
    cap.className = "bloom-field-label";
    cap.textContent = spec.description || key;
    wrap.appendChild(cap);
    const store = Settings.store.plugins[pluginName] ?? (Settings.store.plugins[pluginName] = {});

    if (spec.type === OptionType.SELECT && spec.options) {
        const sel = document.createElement("select");
        for (const opt of spec.options) {
            const o = document.createElement("option");
            o.value = opt.value;
            o.textContent = opt.label;
            sel.appendChild(o);
        }
        sel.value = String(store[key] ?? spec.options.find(o => (o as { default?: boolean }).default)?.value ?? spec.options[0].value);
        sel.addEventListener("change", () => { store[key] = sel.value; });
        wrap.appendChild(sel);
        return wrap;
    }

    if (spec.type === OptionType.SLIDER) {
        const row = document.createElement("div");
        row.className = "bloom-field-slider";
        const input = document.createElement("input");
        input.type = "range";
        input.min = String(spec.min ?? 0);
        input.max = String(spec.max ?? 100);
        input.value = String(store[key] ?? spec.min ?? 0);
        const val = document.createElement("span");
        val.textContent = input.value;
        input.addEventListener("input", () => {
            store[key] = Number(input.value);
            val.textContent = input.value;
        });
        row.append(input, val);
        wrap.appendChild(row);
        return wrap;
    }

    if (spec.type === OptionType.BOOLEAN) {
        const toggle = pluginToggle(key, Boolean(store[key]), false);
        const input = toggle.querySelector("input");
        input?.addEventListener("change", () => {
            if (input) store[key] = input.checked;
        });
        wrap.appendChild(toggle);
        return wrap;
    }

    return wrap;
}

function showListView() {
    pluginView = false;
    clearFields();
    if (pluginFieldsEl) pluginFieldsEl.replaceChildren();
    setDismissed(pluginEl, true);
    setDismissed(listEl, false);
}

function showPluginView(plugin: Plugin) {
    clearFields();
    pluginView = true;
    if (pluginTitleEl) pluginTitleEl.textContent = plugin.name;
    if (pluginSubEl) pluginSubEl.textContent = plugin.description;
    if (pluginFieldsEl) {
        pluginFieldsEl.replaceChildren();
        if (plugin.authors?.length) {
            const authors = document.createElement("p");
            authors.className = "bloom-plugin-authors";
            authors.textContent = plugin.authors.join(", ");
            pluginFieldsEl.appendChild(authors);
        }
        if (plugin.settings) {
            for (const [key, spec] of Object.entries(plugin.settings.def)) {
                const field = fieldControl(plugin.name, key, spec);
                if (field) pluginFieldsEl.appendChild(field);
            }
        }
        if (!pluginFieldsEl.querySelector(".bloom-field, .bloom-dialog-empty")) {
            const empty = document.createElement("p");
            empty.className = "bloom-dialog-empty";
            empty.textContent = "No configurable settings.";
            pluginFieldsEl.appendChild(empty);
        }
    }
    setDismissed(listEl, true);
    setDismissed(pluginEl, false);
}

function pluginCard(plugin: Plugin): HTMLElement {
    const card = document.createElement("div");
    card.className = "bloom-plugin-card";

    const body = document.createElement("div");
    body.className = "bloom-card-body";

    const top = document.createElement("div");
    top.className = "bloom-card-top";

    const name = document.createElement("div");
    name.className = "bloom-card-name";
    const icon = document.createElement("span");
    icon.className = "bloom-card-icon";
    icon.innerHTML = pluginIcon(plugin);
    const title = document.createElement("span");
    title.className = "bloom-card-title";
    title.textContent = plugin.name;
    title.title = plugin.name;
    name.append(icon, title);

    const controls = document.createElement("div");
    controls.className = "bloom-card-controls";

    const starred = isPluginStarred(plugin.name);
    const star = document.createElement("button");
    star.type = "button";
    star.className = `bloom-icon-btn bloom-card-star${starred ? " bloom-card-star-active" : ""}`;
    star.setAttribute("aria-label", starred ? "Remove from favorites" : "Add to favorites");
    star.innerHTML = starSvg(starred);
    star.addEventListener("click", ev => {
        ev.preventDefault();
        ev.stopPropagation();
        const next = togglePluginStarred(plugin.name);
        emitBloomEvent("pluginStar", { name: plugin.name, starred: next });
    });
    controls.appendChild(star);

    if (!plugin.required) {
        const pinned = isPluginPinned(plugin.name);
        const pin = document.createElement("button");
        pin.type = "button";
        pin.className = `bloom-icon-btn bloom-card-pin${pinned ? " bloom-card-pin-active" : ""}`;
        pin.setAttribute("aria-label", pinned ? "Unpin from top" : "Pin to top");
        pin.innerHTML = pinSvg(pinned);
        pin.addEventListener("click", ev => {
            ev.preventDefault();
            ev.stopPropagation();
            const next = togglePluginPinned(plugin.name);
            emitBloomEvent("pluginPin", { name: plugin.name, pinned: next });
        });
        controls.appendChild(pin);
    }

    if (hasSettings(plugin)) {
        const gear = document.createElement("button");
        gear.type = "button";
        gear.className = "bloom-icon-btn bloom-card-settings";
        gear.setAttribute("aria-label", `${plugin.name} settings`);
        gear.innerHTML = settings2Svg();
        gear.addEventListener("click", ev => {
            ev.preventDefault();
            ev.stopPropagation();
            showPluginView(plugin);
        });
        controls.appendChild(gear);
    }
    const toggle = pluginToggle(plugin.name, isPluginEnabled(plugin.name), !!plugin.required);
    const box = toggle.querySelector("input");
    box?.addEventListener("click", ev => ev.stopPropagation());
    box?.addEventListener("change", () => { togglePlugin(plugin.name); });
    controls.appendChild(toggle);
    top.append(name, controls);
    body.appendChild(top);

    if (plugin.description) {
        const desc = document.createElement("div");
        desc.className = "bloom-card-desc";
        desc.textContent = plugin.description;
        body.appendChild(desc);
    }

    const sep = document.createElement("div");
    sep.className = "bloom-card-separator";
    const footer = document.createElement("div");
    footer.className = "bloom-card-footer";
    const author = document.createElement("div");
    author.className = "bloom-card-author";
    author.textContent = plugin.authors?.filter(Boolean).join(", ") || "\u00A0";
    footer.appendChild(author);

    card.append(body, sep, footer);
    return card;
}

function visiblePlugins(): Plugin[] {
    return Object.values(plugins).filter(p => !p.hidden && p.name !== "Settings");
}

function pluginMatchesCategory(plugin: Plugin, tab: PluginCategory): boolean {
    if (tab === "all" || tab === "favorites") return true;
    return (plugin.tags ?? []).includes(tab);
}

function searchKey(plugin: Plugin): string {
    return `${plugin.name} ${plugin.description ?? ""} ${(plugin.tags ?? []).join(" ")}`.toLowerCase();
}

function emptyHint(): string {
    if (searchQuery.trim()) return "No plugins match your search.";
    if (category === "favorites") return "No favorites yet. Star a plugin to see it here.";
    return "No plugins available.";
}

function visibleTabs(): typeof CATEGORY_TABS[number][] {
    const pool = visiblePlugins();
    return CATEGORY_TABS.filter(t => {
        if (t.id === "favorites" || t.id === "all") return true;
        return pool.some(p => pluginMatchesCategory(p, t.id));
    });
}

function paintTabs() {
    if (!tabsEl) return;
    tabsEl.replaceChildren();
    for (const tab of visibleTabs()) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `bloom-plugin-tab${category === tab.id ? " bloom-plugin-tab-active" : ""}`;
        btn.textContent = tab.label;
        btn.addEventListener("click", () => {
            category = tab.id;
            fillGrid();
        });
        tabsEl.appendChild(btn);
    }
}

function listedPlugins(): Plugin[] {
    let list = visiblePlugins();
    if (category === "favorites") {
        const starred = new Set(getStarredPlugins());
        list = list.filter(p => starred.has(p.name));
    } else if (category !== "all") {
        list = list.filter(p => pluginMatchesCategory(p, category));
    }
    if (listFilter === "enabled") list = list.filter(p => isPluginEnabled(p.name));
    if (listFilter === "disabled") list = list.filter(p => !isPluginEnabled(p.name));
    return list;
}

function fillGrid() {
    if (!gridEl) return;
    paintTabs();
    const beforeSearch = listedPlugins();
    if (searchInput) searchInput.placeholder = `Search ${beforeSearch.length} plugins...`;
    let list = beforeSearch;
    const q = searchQuery.trim().toLowerCase();
    if (q) list = list.filter(p => searchKey(p).includes(q));
    if (category !== "favorites") {
        const pinned = getPinnedPlugins();
        if (pinned.length) {
            const rank = new Map(pinned.map((n, i) => [n, i]));
            list = list.slice().sort((a, b) => {
                const pa = rank.has(a.name);
                const pb = rank.has(b.name);
                if (pa !== pb) return pa ? -1 : 1;
                if (pa) return (rank.get(a.name) ?? 0) - (rank.get(b.name) ?? 0);
                return a.name.localeCompare(b.name);
            });
        }
    }
    gridEl.replaceChildren();
    for (const plugin of list) gridEl.appendChild(pluginCard(plugin));
    if (emptyEl) {
        emptyEl.hidden = list.length > 0;
        emptyEl.textContent = emptyHint();
    }
}

function holdMenu(ev: Event) {
    ev.stopPropagation();
}

function eatMenuSelect(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (typeof (ev as Event & { stopImmediatePropagation?: () => void }).stopImmediatePropagation === "function") {
        ev.stopImmediatePropagation();
    }
}

function syncRailExpanded() {
    const rail = document.getElementById(RAIL_ID);
    rail?.setAttribute("aria-expanded", bloomOpen ? "true" : "false");
}

function panelVisible(el: HTMLElement): boolean {
    if (!el.isConnected) return false;
    const r = el.getBoundingClientRect();
    return r.width > 40
        && r.height > 16
        && r.left >= 0
        && r.right <= window.innerWidth + 16
        && r.top < window.innerHeight
        && r.bottom > 0;
}

function hidePanel() {
    showListView();
    searchQuery = "";
    listFilter = "all";
    category = "all";
    document.getElementById(SIDEBAR_ID)?.remove();
    bloomOpen = false;
    syncRailExpanded();
}

function buildPanel(id: string): HTMLElement {
    const panel = document.createElement("div");
    panel.id = id;
    panel.addEventListener("pointerdown", holdMenu);
    panel.addEventListener("pointerup", holdMenu);
    panel.addEventListener("click", holdMenu);

    const list = document.createElement("div");
    list.className = "bloom-settings-list";

    const head = document.createElement("div");
    head.className = "bloom-settings-head";
    const brand = document.createElement("div");
    brand.className = "bloom-settings-brand";
    const mark = document.createElement("span");
    mark.className = "bloom-settings-mark";
    mark.innerHTML = blossomSvg();
    const title = document.createElement("h2");
    title.textContent = "Bloom++";
    brand.append(mark, title);
    const close = document.createElement("button");
    close.type = "button";
    close.className = "bloom-icon-btn";
    close.setAttribute("aria-label", "Close");
    close.innerHTML = closeSvg();
    close.addEventListener("click", hidePanel);
    head.append(brand, close);
    list.appendChild(head);

    const section = document.createElement("div");
    section.className = "bloom-section-head";
    const sectionTitle = document.createElement("h3");
    sectionTitle.textContent = "Plugins";
    const sectionHint = document.createElement("p");
    sectionHint.textContent = "Turn Bloom++ features on or off. Sliders icon opens options.";
    section.append(sectionTitle, sectionHint);
    list.appendChild(section);

    const tabs = document.createElement("div");
    tabs.className = "bloom-plugin-tabs";
    list.appendChild(tabs);

    const searchBar = document.createElement("div");
    searchBar.className = "bloom-search-bar";
    const input = document.createElement("input");
    input.type = "search";
    input.className = "bloom-search-input";
    input.setAttribute("aria-label", "Search plugins");
    input.placeholder = "Search plugins...";
    input.addEventListener("input", () => {
        searchQuery = input.value;
        fillGrid();
    });
    const filter = document.createElement("select");
    filter.className = "bloom-search-filter";
    filter.setAttribute("aria-label", "Filter plugins");
    for (const opt of FILTER_OPTIONS) {
        const o = document.createElement("option");
        o.value = opt.value;
        o.textContent = opt.label;
        filter.appendChild(o);
    }
    filter.value = listFilter;
    filter.addEventListener("change", () => {
        listFilter = filter.value as ListFilter;
        fillGrid();
    });
    searchBar.append(input, filter);
    list.appendChild(searchBar);

    const grid = document.createElement("div");
    grid.className = "bloom-plugin-list";
    list.appendChild(grid);

    const empty = document.createElement("p");
    empty.className = "bloom-tab-empty";
    empty.hidden = true;
    list.appendChild(empty);

    const pluginPane = document.createElement("div");
    pluginPane.className = "bloom-settings-plugin";
    setDismissed(pluginPane, true);

    const pHead = document.createElement("div");
    pHead.className = "bloom-settings-head";
    const back = document.createElement("button");
    back.type = "button";
    back.className = "bloom-icon-btn";
    back.setAttribute("aria-label", "Back");
    back.innerHTML = backSvg();
    back.addEventListener("click", showListView);
    const pTitles = document.createElement("div");
    pTitles.className = "bloom-dialog-titles";
    const pTitle = document.createElement("h2");
    const pSub = document.createElement("p");
    pSub.className = "bloom-settings-sub";
    pTitles.append(pTitle, pSub);
    const pClose = document.createElement("button");
    pClose.type = "button";
    pClose.className = "bloom-icon-btn";
    pClose.setAttribute("aria-label", "Close");
    pClose.innerHTML = closeSvg();
    pClose.addEventListener("click", hidePanel);
    pHead.append(back, pTitles, pClose);

    const fields = document.createElement("div");
    fields.className = "bloom-plugin-settings";
    pluginPane.append(pHead, fields);

    panel.append(list, pluginPane);

    listEl = list;
    pluginEl = pluginPane;
    gridEl = grid;
    pluginTitleEl = pTitle;
    pluginSubEl = pSub;
    pluginFieldsEl = fields;
    emptyEl = empty;
    searchInput = input;
    filterSelect = filter;
    tabsEl = tabs;
    fillGrid();
    return panel;
}

function dockToBody(panel: HTMLElement) {
    panel.classList.add("bloom-rail-dock");
}

function liveRail(): HTMLElement | null {
    const rail = document.getElementById(RAIL_ID);
    if (rail instanceof HTMLElement && rail.isConnected && rail.parentElement && isOnscreenRail(rail)) return rail;
    return null;
}

/** Panel is always a body dock. Never rail.before — that inflates the React footer. */
function mountPanel() {
    document.getElementById(SIDEBAR_ID)?.remove();
    if (!document.body) return;
    const panel = buildPanel(SIDEBAR_ID);
    dockToBody(panel);
    document.body.appendChild(panel);
    bloomOpen = true;
    showListView();
    syncRailExpanded();
    emitBloomEvent("settingsOpen", undefined);
    console.info("[Bloom++] settings open", { version: VERSION, dock: "center", rail: !!liveRail() });
}

function togglePanel() {
    const el = document.getElementById(SIDEBAR_ID);
    if (el instanceof HTMLElement && el.isConnected && panelVisible(el)) {
        hidePanel();
        return;
    }
    el?.remove();
    mountPanel();
}

function buildRailItem(): HTMLButtonElement {
    const row = document.createElement("button");
    row.type = "button";
    row.id = RAIL_ID;
    row.className = "bloom-rail-item";
    row.setAttribute("aria-controls", SIDEBAR_ID);
    row.setAttribute("aria-expanded", bloomOpen ? "true" : "false");
    row.innerHTML = `<span class="bloom-rail-mark">${blossomSvg()}</span><span>Bloom++</span>`;
    row.addEventListener("pointerdown", ev => ev.stopPropagation());
    row.addEventListener("click", ev => {
        ev.preventDefault();
        ev.stopPropagation();
        togglePanel();
    });
    return row;
}

function syncCollapsed(row: HTMLElement, force?: boolean) {
    const parent = row.parentElement;
    const w = parent?.getBoundingClientRect().width ?? row.getBoundingClientRect().width;
    row.classList.toggle("bloom-rail-compact", force === true || (w > 0 && w < 80));
}

function profileFace(profile: HTMLElement): HTMLElement | null {
    const img = profile.querySelector("img");
    if (img instanceof HTMLElement) {
        const r = img.getBoundingClientRect();
        if (r.width > 8 && r.height > 8) return img;
    }
    for (const hit of profile.querySelectorAll('[class*="rounded-full"]')) {
        if (!(hit instanceof HTMLElement)) continue;
        const r = hit.getBoundingClientRect();
        if (r.width > 8 && r.height > 8) return hit;
    }
    return null;
}

function profileName(profile: HTMLElement, face: HTMLElement | null): HTMLElement | null {
    for (const hit of profile.querySelectorAll("div, span, p")) {
        if (!(hit instanceof HTMLElement)) continue;
        if (face && (hit === face || hit.contains(face) || face.contains(hit))) continue;
        const text = (hit.textContent || "").trim();
        if (text.length < 2) continue;
        const r = hit.getBoundingClientRect();
        if (r.width > 16 && r.height > 8 && r.height < 40) return hit;
    }
    return null;
}

function setPx(el: HTMLElement, prop: string, px: number) {
    const next = `${px}px`;
    if (el.style.getPropertyValue(prop) !== next) el.style.setProperty(prop, next);
}

/** Match avatar box + name column so Bloom++ lines up with the account chip. */
function syncRailAlign(row: HTMLElement, profile: HTMLElement) {
    if (row.classList.contains("bloom-rail-compact")) return;
    const mark = row.querySelector(".bloom-rail-mark");
    if (!(mark instanceof HTMLElement) || !row.isConnected || !profile.isConnected) return;

    const face = profileFace(profile);
    const cs = getComputedStyle(profile);
    const padT = Number.parseFloat(cs.paddingTop);
    const padB = Number.parseFloat(cs.paddingBottom);
    if (Number.isFinite(padT)) setPx(row, "padding-top", Math.round(padT));
    if (Number.isFinite(padB)) setPx(row, "padding-bottom", Math.round(padB));

    if (face) {
        const fr = face.getBoundingClientRect();
        const size = Math.max(20, Math.round(fr.width));
        setPx(mark, "width", size);
        setPx(mark, "height", Math.max(20, Math.round(fr.height)));

        const rowR = row.getBoundingClientRect();
        const padL = Math.round(fr.left - rowR.left);
        if (padL >= 0 && padL <= 40) setPx(row, "padding-left", padL);

        const name = profileName(profile, face);
        if (name) {
            const nr = name.getBoundingClientRect();
            const mr = mark.getBoundingClientRect();
            const gap = Math.round(nr.left - mr.right);
            if (gap >= 0 && gap <= 24) setPx(row, "gap", gap);
        }
    } else {
        const padL = Number.parseFloat(cs.paddingLeft);
        const gap = Number.parseFloat(cs.columnGap || cs.gap);
        if (Number.isFinite(padL)) setPx(row, "padding-left", Math.round(padL));
        if (Number.isFinite(gap) && gap > 0) setPx(row, "gap", Math.round(gap));
    }
}

function isNavOrStage(el: HTMLElement): boolean {
    return el.tagName === "NAV"
        || el.id === "stage-slideover-sidebar"
        || el.id === "stage-sidebar-tiny-bar";
}

function resumeSidebarWatch() {
    if (watchedSidebar?.isConnected && sidebarWatch) {
        sidebarWatch.observe(watchedSidebar, { childList: true });
        return;
    }
    watchSidebar();
}

/** Chip only. Never mount or move the settings panel. */
function pinRail() {
    if (!document.body) return;
    sidebarWatch?.disconnect();
    try {
        const existing = document.getElementById(RAIL_ID);
        const row = existing instanceof HTMLButtonElement ? existing : buildRailItem();
        const profile = findProfileButton();
        const tiny = findTinyBar();

        if (profile) {
            const anchor = railAnchor(profile);
            const parent = anchor.parentElement;
            if (isNavOrStage(anchor) || (parent && isNavOrStage(parent))) {
                /* would become a nav/stage direct child — skip, wait for a pocket */
                return;
            }
            if (!(row.isConnected && row.nextElementSibling === anchor)) {
                anchor.before(row);
            }
            syncCollapsed(row);
            syncRailAlign(row, profile);
        } else if (tiny) {
            if (row.parentElement !== tiny) tiny.appendChild(row);
            syncCollapsed(row, true);
        } else if (row.isConnected && !isOnscreenRail(row)) {
            row.remove();
        }
    } finally {
        resumeSidebarWatch();
        syncRailExpanded();
    }
}

function watchSidebar() {
    const root = findSidebarHost();
    if (!root) return;
    if (watchedSidebar === root && sidebarWatch) return;
    sidebarWatch?.disconnect();
    watchedSidebar = root;
    sidebarWatch = new MutationObserver(() => {
        if (document.getElementById(RAIL_ID)?.isConnected) return;
        pinRail();
    });
    sidebarWatch.observe(root, { childList: true });
}

function bindRail() {
    pinRail();
    watchSidebar();
    if (railTimer === undefined) {
        railTimer = window.setInterval(() => {
            const rail = document.getElementById(RAIL_ID);
            if (!(rail instanceof HTMLElement) || !rail.isConnected) {
                pinRail();
            } else {
                const profile = findProfileButton();
                if (profile) syncRailAlign(rail, profile);
            }
            watchSidebar();
        }, RAIL_POLL_MS);
    }
}

function unbindRail() {
    if (railTimer !== undefined) {
        clearInterval(railTimer);
        railTimer = undefined;
    }
    sidebarWatch?.disconnect();
    sidebarWatch = null;
    watchedSidebar = null;
}

function watchMenu(menu: HTMLElement) {
    if (watchedMenu === menu && menuWatch) return;
    menuWatch?.disconnect();
    watchedMenu = menu;
    menuWatch = new MutationObserver(() => {
        if (!menu.isConnected) {
            menuWatch?.disconnect();
            menuWatch = null;
            watchedMenu = null;
            return;
        }
        injectAccountItem(menu);
    });
    menuWatch.observe(menu, { childList: true });
}

function injectAccountItem(menu: HTMLElement) {
    watchMenu(menu);
    if (menu.querySelector(`#${ITEM_ID}`)) return;
    const item = document.createElement("button");
    item.type = "button";
    item.id = ITEM_ID;
    item.className = "bloom-account-item";
    item.setAttribute("role", "menuitem");
    item.innerHTML = `${blossomSvg()}<span>Bloom++</span>`;
    item.addEventListener("pointerdown", eatMenuSelect);
    item.addEventListener("pointerup", eatMenuSelect);
    item.addEventListener("click", ev => {
        eatMenuSelect(ev);
        togglePanel();
    });
    menu.insertBefore(item, menu.firstChild);
}

function tryInjectMenu() {
    const menu = findAccountMenu();
    if (!menu) return false;
    injectAccountItem(menu);
    return true;
}

function onDocClick(e: Event) {
    if (!pathHitsProfile(e)) return;
    queueMicrotask(tryInjectMenu);
    requestAnimationFrame(() => { tryInjectMenu(); });
    window.setTimeout(tryInjectMenu, 60);
    window.setTimeout(tryInjectMenu, 180);
}

function bindAccountMenu() {
    menuAbort?.abort();
    const ac = new AbortController();
    menuAbort = ac;
    document.addEventListener("click", onDocClick, { signal: ac.signal });
}

function unbindAccountMenu() {
    menuAbort?.abort();
    menuAbort = null;
    menuWatch?.disconnect();
    menuWatch = null;
    watchedMenu = null;
}

export function openSettings() {
    requestIdleReady();
    whenBody(() => {
        injectCss();
        stripLegacyChrome();
        pinRail();
        togglePanel();
    });
}

export default definePlugin({
    name: "Settings",
    description: "Bloom++ settings, pinned above the account row.",
    authors: [Devs.p],
    required: true,
    hidden: true,
    enabledByDefault: true,
    settings,
    startAt: StartAt.HostReady,
    cleanupSelectors: [`#${ROOT_ID}`, `#${RAIL_ID}`, `#${ITEM_ID}`, `#${SIDEBAR_ID}`, `#${STYLE_ID}`, "#bloom-menu-panel"],

    start() {
        injectCss();
        stripLegacyChrome();
        bindRail();
        bindAccountMenu();
        unwatchHost?.();
        unwatchHost = watchHostScheme(paintScheme);
        paintScheme();
        unsubList = [
            onBloomEvent("pluginToggle", () => { if (bloomOpen && !pluginView) fillGrid(); }),
            onBloomEvent("pluginPin", () => { if (bloomOpen && !pluginView) fillGrid(); }),
            onBloomEvent("pluginStar", () => { if (bloomOpen && !pluginView) fillGrid(); }),
        ];
    },

    stop() {
        unbindRail();
        unbindAccountMenu();
        unwatchHost?.();
        unwatchHost = null;
        for (const u of unsubList) u();
        unsubList = [];
        hidePanel();
        document.getElementById(RAIL_ID)?.remove();
        document.getElementById(ITEM_ID)?.remove();
        document.getElementById(STYLE_ID)?.remove();
        host = null;
        shadow = null;
        listEl = null;
        pluginEl = null;
        gridEl = null;
        pluginTitleEl = null;
        pluginSubEl = null;
        pluginFieldsEl = null;
        emptyEl = null;
        searchInput = null;
        filterSelect = null;
        tabsEl = null;
        bloomOpen = false;
        pluginView = false;
    },

    onSettingsChange: paintScheme,
});
