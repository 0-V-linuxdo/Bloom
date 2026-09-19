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
    "--border-default",
    "--link",
    "--interactive-bg-secondary-hover",
    "--interactive-label-primary-default",
    "--message-surface",
    "--bg-primary",
    "--bg-secondary",
    "--bg-tertiary",
    "--bg-elevated-primary",
    "--bg-elevated-secondary",
    "--bg-secondary-surface",
    "--bg-primary-inverted",
    "--shadow-long",
] as const;

/** Official chatgpt.com neutrals, used when the host has no tokens or the user forces a scheme. */
export const SCHEME_FALLBACKS: Record<ColorScheme, Record<(typeof HOST_TOKEN_KEYS)[number], string>> = {
    light: {
        "--main-surface-primary": "#fcfcfc",
        "--main-surface-secondary": "#f9f9f9",
        "--main-surface-tertiary": "#ececec",
        "--sidebar-surface-primary": "#fcfcfc",
        "--text-primary": "#0d0d0d",
        "--text-secondary": "#5d5d5d",
        "--text-tertiary": "#8f8f8f",
        "--text-quaternary": "#00000030",
        "--icon-primary": "#0d0d0d",
        "--icon-secondary": "#5d5d5d",
        "--border-xlight": "rgba(0, 0, 0, 0.05)",
        "--border-light": "rgba(0, 0, 0, 0.05)",
        "--border-medium": "rgba(0, 0, 0, 0.15)",
        "--border-heavy": "rgba(0, 0, 0, 0.15)",
        "--border-default": "rgba(0, 0, 0, 0.1)",
        "--link": "#2964aa",
        "--interactive-bg-secondary-hover": "rgba(0, 0, 0, 0.05)",
        "--interactive-label-primary-default": "#ffffff",
        "--message-surface": "#e9e9e980",
        "--bg-primary": "#ffffff",
        "--bg-secondary": "#e8e8e8",
        "--bg-tertiary": "#f3f3f3",
        "--bg-elevated-primary": "#ffffff",
        "--bg-elevated-secondary": "#f3f3f3",
        "--bg-secondary-surface": "#f9f9f9",
        "--bg-primary-inverted": "#000000",
        "--shadow-long": "0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)",
    },
    dark: {
        "--main-surface-primary": "#000000",
        "--main-surface-secondary": "#212121",
        "--main-surface-tertiary": "#414141",
        "--sidebar-surface-primary": "#171717",
        "--text-primary": "#ffffff",
        "--text-secondary": "#cdcdcd",
        "--text-tertiary": "#8f8f8f",
        "--text-quaternary": "#5d5d5d",
        "--icon-primary": "#ffffff",
        "--icon-secondary": "#cdcdcd",
        "--border-xlight": "rgba(255, 255, 255, 0.05)",
        "--border-light": "rgba(255, 255, 255, 0.05)",
        "--border-medium": "rgba(255, 255, 255, 0.15)",
        "--border-heavy": "rgba(255, 255, 255, 0.15)",
        "--border-default": "rgba(255, 255, 255, 0.15)",
        "--link": "#ececec",
        "--interactive-bg-secondary-hover": "rgba(255, 255, 255, 0.1)",
        "--interactive-label-primary-default": "#0d0d0d",
        "--message-surface": "#303030",
        "--bg-primary": "#353535",
        "--bg-secondary": "#303030",
        "--bg-tertiary": "#414141",
        "--bg-elevated-primary": "#1b1b1b",
        "--bg-elevated-secondary": "#000000",
        "--bg-secondary-surface": "#000000",
        "--bg-primary-inverted": "#ffffff",
        "--shadow-long": "0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)",
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
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onVisible = () => {
        if (document.visibilityState === "visible") onChange();
    };
    mq.addEventListener("change", onChange);
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onChange);
    return () => {
        mq.removeEventListener("change", onChange);
        document.removeEventListener("visibilitychange", onVisible);
        window.removeEventListener("focus", onChange);
    };
}
