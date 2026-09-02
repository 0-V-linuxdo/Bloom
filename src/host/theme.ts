/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Follow chatgpt.com html.dark / html.light, with an explicit override.
 */

export type ColorScheme = "light" | "dark";
export type SchemePref = "auto" | "light" | "dark";

export const SCHEME_OPTIONS = [
    { label: "Follow host", value: "auto", default: true },
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
] as const;

export function isSchemePref(value: unknown): value is SchemePref {
    return value === "auto" || value === "light" || value === "dark";
}

export function detectHostScheme(): ColorScheme {
    const root = document.documentElement;
    if (root.classList.contains("light")) return "light";
    if (root.classList.contains("dark")) return "dark";
    const attr = (root.getAttribute("data-theme") || root.getAttribute("data-color-scheme") || "").toLowerCase();
    if (attr === "light" || attr === "dark") return attr;
    try {
        const cs = getComputedStyle(root).colorScheme || "";
        if (/\blight\b/.test(cs) && !/\bdark\b/.test(cs)) return "light";
        if (/\bdark\b/.test(cs) && !/\blight\b/.test(cs)) return "dark";
    } catch { /* ignore */ }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function resolveScheme(pref: SchemePref): ColorScheme {
    return pref === "auto" ? detectHostScheme() : pref;
}

export function watchHostScheme(onChange: () => void): () => void {
    const root = document.documentElement;
    const mo = new MutationObserver(onChange);
    mo.observe(root, { attributes: true, attributeFilter: ["class", "data-theme", "data-color-scheme", "style"] });
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", onChange);
    return () => {
        mo.disconnect();
        mq.removeEventListener("change", onChange);
    };
}
