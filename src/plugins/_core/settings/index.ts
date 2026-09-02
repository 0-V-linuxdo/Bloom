/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Non-modal flyout next to the blossom. Never a full-viewport backdrop,
 * never patched into the host tree.
 */

import { emitBloomEvent } from "../../../api/Events";
import { definePluginSettings, Settings } from "../../../api/Settings";
import { isPluginEnabled, plugins, togglePlugin } from "../../../api/PluginManager";
import { fabPlacement, invalidateFabAnchor } from "../../../host/headerAnchor";
import {
    applySchemeTokens,
    resolveScheme,
    watchHostScheme,
    type SchemePref,
} from "../../../host/theme";
import { requestIdleReady, whenIdleReady, whenShellReady } from "../../../host/idleReady";
import { Devs } from "../../../utils/constants";
import { syncShadowPluginStyles } from "../../../utils/css";
import definePlugin, { OptionType, StartAt, type Plugin } from "../../../utils/types";
import css from "./styles.css";

const ROOT_ID = "bloom-root";
const Z_FAB = "10000";
const Z_PANEL = "10001";

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
let open = false;
let pluginView = false;
let fieldUnmounts: Array<() => void> = [];
let unwatchHost: (() => void) | null = null;
let fabAbort: AbortController | null = null;
let winAbort: AbortController | null = null;
let fabEl: HTMLButtonElement | null = null;
let panelEl: HTMLDivElement | null = null;
let listEl: HTMLDivElement | null = null;
let pluginEl: HTMLDivElement | null = null;
let gridEl: HTMLDivElement | null = null;
let pluginTitleEl: HTMLElement | null = null;
let pluginSubEl: HTMLElement | null = null;
let pluginFieldsEl: HTMLDivElement | null = null;

function blossomSvg(): string {
    return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>`;
}

function closeSvg(): string {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>`;
}

function backSvg(): string {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>`;
}

function gearSvg(): string {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`;
}

const PLUGIN_ICONS: Record<string, string> = {
    ChatStateFavicons: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>`,
    InputHistory: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>`,
    NoShareLink: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>`,
    NoDictation: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>`,
};

function pluginIcon(name: string): string {
    return PLUGIN_ICONS[name] ?? blossomSvg();
}

function appearancePref(): SchemePref {
    return "auto";
}

function paintScheme() {
    if (!host) return;
    const pref = appearancePref();
    const scheme = resolveScheme(pref);
    host.setAttribute("data-bloom-scheme", scheme);
    applySchemeTokens(host, scheme, pref === "auto");
    emitBloomEvent("schemeChange", { scheme, pref });
}

function syncShadowStyles() {
    syncShadowPluginStyles();
}

/** Take a node out of the hit-test tree. `hidden` alone is not enough if CSS display wins. */
function setDismissed(el: HTMLElement | null, dismissed: boolean) {
    if (!el) return;
    el.hidden = dismissed;
    el.toggleAttribute("inert", dismissed);
    if (dismissed) el.setAttribute("aria-hidden", "true");
    else el.removeAttribute("aria-hidden");
    el.style.pointerEvents = dismissed ? "none" : "auto";
}

function pathHitsBloom(e: Event): boolean {
    const path = e.composedPath();
    if (panelEl && path.includes(panelEl)) return true;
    if (fabEl && path.includes(fabEl)) return true;
    return false;
}

export function ensureHost(): ShadowRoot {
    if (shadow) return shadow;
    host = document.getElementById(ROOT_ID) as HTMLElement | null;
    if (!host) {
        host = document.createElement("div");
        host.id = ROOT_ID;
        host.style.pointerEvents = "none";
    }
    const root = document.body;
    if (root && host.parentNode !== root) {
        root.appendChild(host);
    }
    shadow = host.shadowRoot ?? host.attachShadow({ mode: "open" });
    if (!shadow.querySelector("style[data-bloom]")) {
        const style = document.createElement("style");
        style.dataset.bloom = "1";
        style.textContent = css;
        shadow.appendChild(style);
    }
    paintScheme();
    syncShadowStyles();
    return shadow;
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
    wrap.className = "bloom-field";
    const cap = document.createElement("span");
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
        if (plugin.settings) {
            for (const [key, spec] of Object.entries(plugin.settings.def)) {
                const field = fieldControl(plugin.name, key, spec);
                if (field) pluginFieldsEl.appendChild(field);
            }
        }
        if (!pluginFieldsEl.childElementCount) {
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
    const card = document.createElement("section");
    card.className = "bloom-plugin-card";

    const body = document.createElement("div");
    body.className = "bloom-card-body";
    const top = document.createElement("div");
    top.className = "bloom-card-top";

    const name = document.createElement("div");
    name.className = "bloom-card-name";
    const icon = document.createElement("span");
    icon.className = "bloom-card-icon";
    icon.innerHTML = pluginIcon(plugin.name);
    const h3 = document.createElement("h3");
    h3.textContent = plugin.name;
    name.append(icon, h3);

    const controls = document.createElement("div");
    controls.className = "bloom-card-controls";
    if (hasSettings(plugin)) {
        const gear = document.createElement("button");
        gear.type = "button";
        gear.className = "bloom-icon-btn bloom-card-gear";
        gear.setAttribute("aria-label", `${plugin.name} settings`);
        gear.innerHTML = gearSvg();
        gear.addEventListener("click", () => showPluginView(plugin));
        controls.appendChild(gear);
    }
    const toggle = pluginToggle(plugin.name, isPluginEnabled(plugin.name), !!plugin.required);
    const box = toggle.querySelector("input");
    box?.addEventListener("change", () => { togglePlugin(plugin.name); });
    controls.appendChild(toggle);
    top.append(name, controls);

    const desc = document.createElement("p");
    desc.className = "bloom-card-desc";
    desc.textContent = plugin.description;
    body.append(top, desc);

    const sep = document.createElement("div");
    sep.className = "bloom-card-sep";
    const footer = document.createElement("div");
    footer.className = "bloom-card-footer";
    footer.textContent = plugin.authors?.join(", ") || "\u00A0";

    card.append(body, sep, footer);
    return card;
}

function fillGrid() {
    if (!gridEl) return;
    gridEl.replaceChildren();
    for (const plugin of Object.values(plugins)) {
        if (plugin.hidden || plugin.name === "Settings") continue;
        gridEl.appendChild(pluginCard(plugin));
    }
}

function ensurePanel(root: ShadowRoot) {
    if (panelEl && listEl && pluginEl && gridEl && panelEl.isConnected) return;

    panelEl?.remove();

    const panel = document.createElement("div");
    panel.className = "bloom-settings-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "false");
    panel.setAttribute("aria-labelledby", "bloom-settings-title");
    panel.style.zIndex = Z_PANEL;
    setDismissed(panel, true);

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
    title.id = "bloom-settings-title";
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

    const sub = document.createElement("p");
    sub.className = "bloom-settings-sub";
    sub.textContent = "Plugins";
    list.appendChild(sub);

    const grid = document.createElement("div");
    grid.className = "bloom-plugin-grid";
    list.appendChild(grid);

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
    pTitle.textContent = "";
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
    root.append(panel);

    panelEl = panel;
    listEl = list;
    pluginEl = pluginPane;
    gridEl = grid;
    pluginTitleEl = pTitle;
    pluginSubEl = pSub;
    pluginFieldsEl = fields;
    fillGrid();
}

function placePanel() {
    if (!panelEl || !fabEl) return;
    const fab = fabEl.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const width = Math.min(640, Math.max(280, vw - 24));
    const maxH = Math.min(vh - 24, 640);
    panelEl.style.width = `${Math.round(width)}px`;
    panelEl.style.maxHeight = `${Math.round(maxH)}px`;

    let left = fab.right - width;
    if (left < 12) left = 12;
    if (left + width > vw - 12) left = Math.max(12, vw - 12 - width);

    const spaceBelow = vh - fab.bottom - 8;
    const spaceAbove = fab.top - 8;
    const openBelow = spaceBelow >= 240 || spaceBelow >= spaceAbove;
    if (openBelow) {
        panelEl.style.top = `${Math.round(fab.bottom + 8)}px`;
        panelEl.style.bottom = "auto";
    } else {
        panelEl.style.top = "auto";
        panelEl.style.bottom = `${Math.round(vh - fab.top + 8)}px`;
    }
    panelEl.style.left = `${Math.round(left)}px`;
    panelEl.style.right = "auto";
}

function hidePanel() {
    open = false;
    setDismissed(panelEl, true);
    fabEl?.setAttribute("aria-expanded", "false");
    showListView();
}

function showPanel() {
    const root = ensureHost();
    ensurePanel(root);
    paintScheme();
    fillGrid();
    showListView();
    open = true;
    fabEl?.setAttribute("aria-expanded", "true");
    placePanel();
    setDismissed(panelEl, false);
    emitBloomEvent("settingsOpen", undefined);
}

function togglePanel() {
    if (open) hidePanel();
    else showPanel();
}

function placeFab(fab: HTMLElement) {
    const box = fabPlacement(36);
    fab.style.width = `${box.size}px`;
    fab.style.height = `${box.size}px`;
    fab.style.left = `${Math.round(box.x)}px`;
    fab.style.top = `${Math.round(box.y)}px`;
    fab.style.right = "auto";
    fab.style.bottom = "auto";
    fab.style.zIndex = Z_FAB;
}

function onWinPointerDown(e: PointerEvent) {
    if (!open) return;
    if (pathHitsBloom(e)) return;
    hidePanel();
}

function onWinKey(e: KeyboardEvent) {
    if (e.key !== "Escape") return;
    if (!open) return;
    if (pluginView) {
        showListView();
        return;
    }
    hidePanel();
}

function bindWindowDismiss() {
    winAbort?.abort();
    const ac = new AbortController();
    winAbort = ac;
    window.addEventListener("pointerdown", onWinPointerDown, { capture: true, signal: ac.signal });
    window.addEventListener("keydown", onWinKey, { capture: true, signal: ac.signal });
}

function mountFab() {
    const root = ensureHost();
    root.querySelector(".bloom-settings-fab")?.remove();
    fabAbort?.abort();

    const fab = document.createElement("button");
    fab.type = "button";
    fab.className = "bloom-settings-fab";
    fab.setAttribute("aria-label", "Bloom++ settings");
    fab.setAttribute("aria-expanded", "false");
    fab.setAttribute("aria-haspopup", "dialog");
    fab.innerHTML = blossomSvg();
    fab.addEventListener("click", togglePanel);
    root.appendChild(fab);
    fabEl = fab;
    ensurePanel(root);

    const ac = new AbortController();
    fabAbort = ac;
    const relayout = () => {
        invalidateFabAnchor();
        placeFab(fab);
        if (open) placePanel();
    };
    window.addEventListener("resize", relayout, { signal: ac.signal });
    whenIdleReady(() => {
        placeFab(fab);
        if (open) placePanel();
    });
}

export function openSettings() {
    requestIdleReady();
    whenShellReady(() => showPanel());
}

export default definePlugin({
    name: "Settings",
    description: "Bloom++ settings, docked next to Download the ChatGPT app.",
    authors: [Devs.p],
    required: true,
    hidden: true,
    enabledByDefault: true,
    settings,
    startAt: StartAt.HostShell,
    cleanupSelectors: [`#${ROOT_ID}`],

    start() {
        mountFab();
        bindWindowDismiss();
        paintScheme();
        unwatchHost?.();
        unwatchHost = watchHostScheme(paintScheme);
    },

    stop() {
        fabAbort?.abort();
        fabAbort = null;
        winAbort?.abort();
        winAbort = null;
        unwatchHost?.();
        unwatchHost = null;
        hidePanel();
        host?.remove();
        host = null;
        shadow = null;
        fabEl = null;
        panelEl = null;
        listEl = null;
        pluginEl = null;
        gridEl = null;
        pluginTitleEl = null;
        pluginSubEl = null;
        pluginFieldsEl = null;
    },

    onSettingsChange: paintScheme,
});
