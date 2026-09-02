/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Self-hosted settings shell (floating button). Does not patch the host menu.
 */

import { emitBloomEvent } from "../../../api/Events";
import { definePluginSettings, Settings } from "../../../api/Settings";
import { isPluginEnabled, plugins, togglePlugin } from "../../../api/PluginManager";
import {
    applySchemeTokens,
    isSchemePref,
    resolveScheme,
    watchHostScheme,
    type SchemePref,
} from "../../../host/theme";
import { Devs } from "../../../utils/constants";
import { registerStyle, registeredStyleText } from "../../../utils/css";
import definePlugin, { OptionType, StartAt } from "../../../utils/types";
import css from "./styles.css";

const ROOT_ID = "bloom-root";
const FAB_POS_KEY = "bloom-fab-pos";
const FAB_SIZE = 40;

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

function blossomSvg(): string {
    return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>`;
}

function closeSvg(): string {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>`;
}

function appearancePref(): SchemePref {
    const raw = settings.store.appearance;
    return isSchemePref(raw) ? raw : "auto";
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

function loadFabPos(): { x: number; y: number } | null {
    try {
        const raw = localStorage.getItem(FAB_POS_KEY);
        if (!raw) return null;
        const p = JSON.parse(raw) as { x?: number; y?: number };
        if (typeof p.x === "number" && typeof p.y === "number") return { x: p.x, y: p.y };
    } catch { /* ignore */ }
    return null;
}

function saveFabPos(x: number, y: number) {
    try { localStorage.setItem(FAB_POS_KEY, JSON.stringify({ x, y })); } catch { /* ignore */ }
}

function ensureHost(): ShadowRoot {
    if (shadow) {
        paintScheme();
        syncShadowStyles();
        return shadow;
    }
    host = document.getElementById(ROOT_ID) as HTMLElement | null;
    if (!host) {
        host = document.createElement("div");
        host.id = ROOT_ID;
        document.documentElement.appendChild(host);
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

function closeModal() {
    open = false;
    for (const u of unmounts) u();
    unmounts = [];
    shadow?.querySelector(".bloom-settings-backdrop")?.remove();
    shadow?.querySelector(".bloom-settings-modal")?.remove();
}

function fieldControl(pluginName: string, key: string, spec: { type: OptionType; description?: string; min?: number; max?: number; options?: readonly { label: string; value: string }[]; render?: (el: HTMLElement) => () => void }): HTMLElement | null {
    if (spec.type === OptionType.COMPONENT && spec.render) {
        const wrap = document.createElement("div");
        wrap.className = "bloom-field";
        unmounts.push(spec.render(wrap));
        return wrap;
    }
    const wrap = document.createElement("label");
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
        wrap.append(input, val);
        return wrap;
    }

    if (spec.type === OptionType.BOOLEAN) {
        const toggle = document.createElement("label");
        toggle.className = "bloom-toggle";
        const sw = document.createElement("span");
        sw.className = "bloom-switch";
        const input = document.createElement("input");
        input.type = "checkbox";
        input.checked = Boolean(store[key]);
        input.addEventListener("change", () => { store[key] = input.checked; });
        const track = document.createElement("span");
        sw.append(input, track);
        toggle.append(sw);
        wrap.appendChild(toggle);
        return wrap;
    }

    return wrap;
}

function renderAppearance(modal: HTMLElement) {
    const pref = appearancePref();
    const seg = document.createElement("div");
    seg.className = "bloom-seg";
    seg.setAttribute("role", "radiogroup");
    seg.setAttribute("aria-label", "Appearance");
    const choices: { value: SchemePref; label: string }[] = [
        { value: "auto", label: "自动" },
        { value: "light", label: "浅色" },
        { value: "dark", label: "深色" },
    ];
    for (const choice of choices) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = choice.label;
        btn.setAttribute("aria-pressed", String(pref === choice.value));
        btn.addEventListener("click", () => {
            settings.store.appearance = choice.value;
            paintScheme();
            if (shadow) renderModal(shadow);
        });
        seg.appendChild(btn);
    }
    modal.appendChild(seg);
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
    renderAppearance(modal);

    for (const plugin of Object.values(plugins)) {
        if (plugin.hidden || plugin.name === "Settings") continue;
        const card = document.createElement("section");
        card.className = "bloom-plugin-card";
        const header = document.createElement("header");
        const meta = document.createElement("div");
        const h3 = document.createElement("h3");
        h3.textContent = plugin.name;
        const p = document.createElement("p");
        p.textContent = plugin.description;
        meta.append(h3, p);
        const toggle = document.createElement("label");
        toggle.className = "bloom-toggle";
        const sw = document.createElement("span");
        sw.className = "bloom-switch";
        const box = document.createElement("input");
        box.type = "checkbox";
        box.checked = isPluginEnabled(plugin.name);
        box.disabled = !!plugin.required;
        box.setAttribute("aria-label", `${plugin.name} enabled`);
        box.addEventListener("change", () => {
            togglePlugin(plugin.name);
            renderModal(root);
        });
        const track = document.createElement("span");
        sw.append(box, track);
        toggle.append(sw);
        header.append(meta, toggle);
        card.appendChild(header);

        if (isPluginEnabled(plugin.name) && plugin.settings) {
            for (const [key, spec] of Object.entries(plugin.settings.def)) {
                const field = fieldControl(plugin.name, key, spec);
                if (field) card.appendChild(field);
            }
        }
        modal.appendChild(card);
    }

    root.append(backdrop, modal);
    modal.focus();
    emitBloomEvent("settingsOpen", undefined);
}

function mountFab() {
    const root = ensureHost();
    root.querySelector(".bloom-settings-fab")?.remove();
    const fab = document.createElement("button");
    fab.type = "button";
    fab.className = "bloom-settings-fab";
    fab.setAttribute("aria-label", "Bloom++ settings");
    fab.innerHTML = blossomSvg();
    const pos = loadFabPos();
    if (pos) {
        fab.style.left = `${pos.x}px`;
        fab.style.top = `${pos.y}px`;
        fab.style.right = "auto";
        fab.style.bottom = "auto";
    }

    let drag = false;
    let moved = false;
    let ox = 0;
    let oy = 0;
    fab.addEventListener("pointerdown", e => {
        drag = true;
        moved = false;
        ox = e.clientX - fab.getBoundingClientRect().left;
        oy = e.clientY - fab.getBoundingClientRect().top;
        fab.classList.add("is-dragging");
        fab.setPointerCapture(e.pointerId);
    });
    fab.addEventListener("pointermove", e => {
        if (!drag) return;
        moved = true;
        const x = Math.max(8, Math.min(window.innerWidth - FAB_SIZE - 8, e.clientX - ox));
        const y = Math.max(8, Math.min(window.innerHeight - FAB_SIZE - 8, e.clientY - oy));
        fab.style.left = `${x}px`;
        fab.style.top = `${y}px`;
        fab.style.right = "auto";
        fab.style.bottom = "auto";
    });
    fab.addEventListener("pointerup", () => {
        fab.classList.remove("is-dragging");
        if (drag && moved) {
            const r = fab.getBoundingClientRect();
            saveFabPos(r.left, r.top);
        }
        drag = false;
    });
    fab.addEventListener("click", () => {
        if (moved) return;
        if (open) closeModal();
        else renderModal(root);
    });
    root.appendChild(fab);
}

function onDocKey(e: KeyboardEvent) {
    if (e.key === "Escape" && open) {
        closeModal();
        e.stopPropagation();
    }
}

export function openSettings() {
    renderModal(ensureHost());
}

export default definePlugin({
    name: "Settings",
    description: "Floating Bloom++ settings button.",
    authors: [Devs.p],
    required: true,
    hidden: true,
    enabledByDefault: true,
    settings,
    startAt: StartAt.HostReady,
    cleanupSelectors: [`#${ROOT_ID}`],

    start() {
        registerStyle("settings", "");
        mountFab();
        paintScheme();
        unwatchHost?.();
        unwatchHost = watchHostScheme(paintScheme);
        document.addEventListener("keydown", onDocKey, true);
        try {
            GM_registerMenuCommand?.("Bloom++ settings", openSettings);
        } catch { /* optional */ }
    },

    stop() {
        document.removeEventListener("keydown", onDocKey, true);
        unwatchHost?.();
        unwatchHost = null;
        closeModal();
        host?.remove();
        host = null;
        shadow = null;
    },

    onSettingsChange: paintScheme,
});
