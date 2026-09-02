/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Self-hosted settings shell. The blossom sits beside ChatGPT's
 * "Download the ChatGPT app" control via position:fixed — never patched
 * into the host header tree.
 */

import { emitBloomEvent } from "../../../api/Events";
import { definePluginSettings, Settings } from "../../../api/Settings";
import { isPluginEnabled, plugins, togglePlugin } from "../../../api/PluginManager";
import { fabPlacement } from "../../../host/headerAnchor";
import {
    applySchemeTokens,
    resolveScheme,
    watchHostScheme,
    type SchemePref,
} from "../../../host/theme";
import { requestPageTouch, whenPageTouched } from "../../../host/pageTouch";
import { Devs } from "../../../utils/constants";
import { registeredStyleText } from "../../../utils/css";
import definePlugin, { OptionType, StartAt } from "../../../utils/types";
import css from "./styles.css";

const ROOT_ID = "bloom-root";

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
let unmounts: Array<() => void> = [];
let unwatchHost: (() => void) | null = null;
let shadowKeysBound = false;
let fabAbort: AbortController | null = null;
let fabTimer: ReturnType<typeof setInterval> | undefined;

function blossomSvg(): string {
    return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>`;
}

function closeSvg(): string {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>`;
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
    if (!shadow) return;
    let el = shadow.querySelector<HTMLStyleElement>("style[data-bloom-plugins]");
    if (!el) {
        el = document.createElement("style");
        el.dataset.bloomPlugins = "1";
        shadow.appendChild(el);
    }
    el.textContent = registeredStyleText();
}

export function ensureHost(): ShadowRoot {
    if (shadow) {
        paintScheme();
        syncShadowStyles();
        return shadow;
    }
    host = document.getElementById(ROOT_ID) as HTMLElement | null;
    if (!host) {
        host = document.createElement("div");
        host.id = ROOT_ID;
        host.style.pointerEvents = "none";
    }
    if (document.body && host.parentNode !== document.body) {
        document.body.appendChild(host);
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
    if (!shadowKeysBound) {
        shadow.addEventListener("keydown", onDocKey);
        shadowKeysBound = true;
    }
    return shadow;
}

function closeModal() {
    open = false;
    for (const u of unmounts) u();
    unmounts = [];
    shadow?.querySelector(".bloom-settings-backdrop")?.remove();
    shadow?.querySelector(".bloom-settings-modal")?.remove();
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

function fieldControl(pluginName: string, key: string, spec: { type: OptionType; description?: string; min?: number; max?: number; options?: readonly { label: string; value: string }[]; render?: (el: HTMLElement) => () => void }): HTMLElement | null {
    if (spec.type === OptionType.COMPONENT && spec.render) {
        const wrap = document.createElement("details");
        wrap.className = "bloom-field bloom-field-block";
        const sum = document.createElement("summary");
        sum.textContent = spec.description || key;
        const inner = document.createElement("div");
        unmounts.push(spec.render(inner));
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

function renderModal(root: ShadowRoot) {
    closeModal();
    syncShadowStyles();
    open = true;
    const backdrop = document.createElement("button");
    backdrop.type = "button";
    backdrop.className = "bloom-settings-backdrop";
    backdrop.setAttribute("aria-label", "Close settings");
    backdrop.addEventListener("click", closeModal);
    const modal = document.createElement("div");
    modal.className = "bloom-settings-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "bloom-settings-title");
    modal.tabIndex = -1;
    modal.addEventListener("click", e => e.stopPropagation());

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
    close.addEventListener("click", closeModal);
    head.append(brand, close);
    modal.appendChild(head);

    const sub = document.createElement("p");
    sub.className = "bloom-settings-sub";
    sub.textContent = "Plugins";
    modal.appendChild(sub);

    for (const plugin of Object.values(plugins)) {
        if (plugin.hidden || plugin.name === "Settings") continue;
        const card = document.createElement("section");
        card.className = "bloom-plugin-card";
        const header = document.createElement("header");
        const info = document.createElement("div");
        info.className = "bloom-plugin-info";
        const titleRow = document.createElement("div");
        titleRow.className = "bloom-plugin-title";
        const h3 = document.createElement("h3");
        h3.textContent = plugin.name;
        titleRow.appendChild(h3);
        if (plugin.authors?.length) {
            const by = document.createElement("span");
            by.className = "bloom-plugin-authors";
            by.textContent = plugin.authors.join(", ");
            titleRow.appendChild(by);
        }
        const p = document.createElement("p");
        p.textContent = plugin.description;
        info.append(titleRow, p);
        const toggle = pluginToggle(plugin.name, isPluginEnabled(plugin.name), !!plugin.required);
        const box = toggle.querySelector("input");
        box?.addEventListener("change", () => {
            togglePlugin(plugin.name);
            renderModal(root);
        });
        header.append(info, toggle);
        card.appendChild(header);

        if (isPluginEnabled(plugin.name) && plugin.settings) {
            const body = document.createElement("div");
            body.className = "bloom-plugin-settings";
            for (const [key, spec] of Object.entries(plugin.settings.def)) {
                const field = fieldControl(plugin.name, key, spec);
                if (field) body.appendChild(field);
            }
            if (body.childElementCount) card.appendChild(body);
        }
        modal.appendChild(card);
    }

    root.append(backdrop, modal);
    modal.focus();
    emitBloomEvent("settingsOpen", undefined);
}

function placeFab(fab: HTMLElement) {
    const box = fabPlacement(36);
    fab.style.width = `${box.size}px`;
    fab.style.height = `${box.size}px`;
    fab.style.left = `${Math.round(box.x)}px`;
    fab.style.top = `${Math.round(box.y)}px`;
    fab.style.right = "auto";
    fab.style.bottom = "auto";
}

function mountFab() {
    const root = ensureHost();
    root.querySelector(".bloom-settings-fab")?.remove();
    fabAbort?.abort();
    if (fabTimer !== undefined) {
        clearInterval(fabTimer);
        fabTimer = undefined;
    }

    const fab = document.createElement("button");
    fab.type = "button";
    fab.className = "bloom-settings-fab";
    fab.setAttribute("aria-label", "Bloom++ settings");
    fab.innerHTML = blossomSvg();
    fab.addEventListener("click", () => {
        if (open) closeModal();
        else renderModal(root);
    });
    root.appendChild(fab);

    const ac = new AbortController();
    fabAbort = ac;
    const relayout = () => placeFab(fab);
    window.addEventListener("resize", relayout, { signal: ac.signal });
    window.addEventListener("scroll", relayout, { capture: true, passive: true, signal: ac.signal });
    fabTimer = setInterval(relayout, 1000);
    relayout();
}

function onDocKey(e: KeyboardEvent) {
    if (e.key === "Escape" && open) {
        closeModal();
        e.stopPropagation();
    }
}

export function openSettings() {
    requestPageTouch();
    whenPageTouched(() => renderModal(ensureHost()));
}

export default definePlugin({
    name: "Settings",
    description: "Bloom++ settings, docked next to Download the ChatGPT app.",
    authors: [Devs.p],
    required: true,
    hidden: true,
    enabledByDefault: true,
    settings,
    startAt: StartAt.HostReady,
    cleanupSelectors: [`#${ROOT_ID}`],

    start() {
        mountFab();
        paintScheme();
        unwatchHost?.();
        unwatchHost = watchHostScheme(paintScheme);
    },

    stop() {
        fabAbort?.abort();
        fabAbort = null;
        if (fabTimer !== undefined) {
            clearInterval(fabTimer);
            fabTimer = undefined;
        }
        unwatchHost?.();
        unwatchHost = null;
        closeModal();
        host?.remove();
        host = null;
        shadow = null;
        shadowKeysBound = false;
    },

    onSettingsChange: paintScheme,
});
