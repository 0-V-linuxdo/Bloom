/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Follow chatgpt.com's own theme (html.dark + --main-surface-primary),
 * not the OS prefers-color-scheme — the two often disagree.
 */

export type ColorScheme = "light" | "dark";
export type SchemePref = "auto" | "light" | "dark";

export const SCHEME_OPTIONS = [
    { label: "Follow host", value: "auto", default: true },
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
] as const;

/** chatgpt.com design tokens copied onto the shadow host so they inherit. */
export const HOST_TOKEN_KEYS = [
    "--main-surface-primary",
    "--main-surface-secondary",
    "--main-surface-tertiary",
    "--sidebar-surface-primary",
    "--text-primary",
    "--text-secondary",
    "--text-tertiary",
    "--text-quaternary",
    "--icon-primary",
    "--icon-secondary",
    "--border-xlight",
    "--border-light",
    "--border-medium",
    "--border-heavy",
    "--link",
    "--interactive-bg-secondary-hover",
    "--interactive-label-primary-default",
    "--message-surface",
    "--bg-primary",
    "--bg-secondary",
] as const;

/** Official chatgpt.com neutrals, used when the host has no tokens or the user forces a scheme. */
export const SCHEME_FALLBACKS: Record<ColorScheme, Record<(typeof HOST_TOKEN_KEYS)[number], string>> = {
    light: {
        "--main-surface-primary": "#ffffff",
        "--main-surface-secondary": "#f4f4f4",
        "--main-surface-tertiary": "#ececec",
        "--sidebar-surface-primary": "#f9f9f9",
        "--text-primary": "#0d0d0d",
        "--text-secondary": "#5d5d5d",
        "--text-tertiary": "#8f8f8f",
        "--text-quaternary": "#b4b4b4",
        "--icon-primary": "#0d0d0d",
        "--icon-secondary": "#5d5d5d",
        "--border-xlight": "rgba(0, 0, 0, 0.05)",
        "--border-light": "rgba(0, 0, 0, 0.1)",
        "--border-medium": "rgba(0, 0, 0, 0.15)",
        "--border-heavy": "rgba(0, 0, 0, 0.2)",
        "--link": "#0d0d0d",
        "--interactive-bg-secondary-hover": "rgba(0, 0, 0, 0.05)",
        "--interactive-label-primary-default": "#0d0d0d",
        "--message-surface": "#f4f4f4",
        "--bg-primary": "#ffffff",
        "--bg-secondary": "#f4f4f4",
    },
    dark: {
        "--main-surface-primary": "#212121",
        "--main-surface-secondary": "#2f2f2f",
        "--main-surface-tertiary": "#424242",
        "--sidebar-surface-primary": "#171717",
        "--text-primary": "#ececec",
        "--text-secondary": "#b4b4b4",
        "--text-tertiary": "#8f8f8f",
        "--text-quaternary": "#5d5d5d",
        "--icon-primary": "#ececec",
        "--icon-secondary": "#b4b4b4",
        "--border-xlight": "rgba(255, 255, 255, 0.05)",
        "--border-light": "rgba(255, 255, 255, 0.1)",
        "--border-medium": "rgba(255, 255, 255, 0.15)",
        "--border-heavy": "rgba(255, 255, 255, 0.2)",
        "--link": "#ececec",
        "--interactive-bg-secondary-hover": "rgba(255, 255, 255, 0.06)",
        "--interactive-label-primary-default": "#ececec",
        "--message-surface": "#2f2f2f",
        "--bg-primary": "#212121",
        "--bg-secondary": "#2f2f2f",
    },
};

export function isSchemePref(value: unknown): value is SchemePref {
    return value === "auto" || value === "light" || value === "dark";
}

function parseRgb(input: string): { r: number; g: number; b: number } | null {
    const s = input.trim();
    const rgb = s.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);
    if (rgb) return { r: Number(rgb[1]), g: Number(rgb[2]), b: Number(rgb[3]) };
    const hex = s.match(/^#([0-9a-f]{3,8})$/i);
    if (!hex) return null;
    let h = hex[1];
    if (h.length === 3 || h.length === 4) h = [...h].map(c => c + c).join("").slice(0, 6);
    else h = h.slice(0, 6);
    const n = Number.parseInt(h, 16);
    if (Number.isNaN(n)) return null;
    return { r: n >> 16 & 255, g: n >> 8 & 255, b: n & 255 };
}

function luminance(c: { r: number; g: number; b: number }): number {
    return (0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b) / 255;
}

function schemeFromColor(input: string): ColorScheme | null {
    const c = parseRgb(input);
    if (!c) return null;
    return luminance(c) > 0.55 ? "light" : "dark";
}

export function detectHostScheme(): ColorScheme {
    const root = document.documentElement;
    // ChatGPT: dark theme adds `dark`. Light is often the default with no `light` class.
    if (root.classList.contains("dark")) return "dark";
    if (root.classList.contains("light")) return "light";
    const attr = (root.getAttribute("data-theme") || root.getAttribute("data-color-scheme") || "").toLowerCase();
    if (attr === "light" || attr === "dark") return attr;

    try {
        const styles = getComputedStyle(root);
        const fromToken = schemeFromColor(styles.getPropertyValue("--main-surface-primary"));
        if (fromToken) return fromToken;
        const fromBg = schemeFromColor(styles.backgroundColor);
        if (fromBg) return fromBg;
        const body = document.body ? getComputedStyle(document.body).backgroundColor : "";
        const fromBody = schemeFromColor(body);
        if (fromBody) return fromBody;
        const cs = styles.colorScheme || "";
        if (/\blight\b/.test(cs) && !/\bdark\b/.test(cs)) return "light";
        if (/\bdark\b/.test(cs) && !/\blight\b/.test(cs)) return "dark";
    } catch { /* ignore */ }

    // Last resort: assume ChatGPT light. Never prefer OS scheme over the page.
    return "light";
}

export function resolveScheme(pref: SchemePref): ColorScheme {
    return pref === "auto" ? detectHostScheme() : pref;
}

export function copyHostTokens(target: HTMLElement) {
    try {
        const src = getComputedStyle(document.documentElement);
        for (const key of HOST_TOKEN_KEYS) {
            const value = src.getPropertyValue(key).trim();
            if (value) target.style.setProperty(key, value);
            else target.style.removeProperty(key);
        }
    } catch { /* ignore */ }
}

export function applySchemeTokens(target: HTMLElement, scheme: ColorScheme, fromHost: boolean) {
    const fallbacks = SCHEME_FALLBACKS[scheme];
    if (fromHost) {
        copyHostTokens(target);
        for (const key of HOST_TOKEN_KEYS) {
            if (!target.style.getPropertyValue(key)) target.style.setProperty(key, fallbacks[key]);
        }
    } else {
        for (const key of HOST_TOKEN_KEYS) target.style.setProperty(key, fallbacks[key]);
    }
}

export function watchHostScheme(onChange: () => void): () => void {
    const obs = new MutationObserver(onChange);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme", "data-color-scheme", "style"] });
    if (document.body) {
        obs.observe(document.body, { attributes: true, attributeFilter: ["class", "style"] });
    }
    return () => obs.disconnect();
}
