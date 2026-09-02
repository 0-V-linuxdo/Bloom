/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export function clamp(n: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, n));
}

export function mapGetOrCreate<K, V>(map: Map<K, V>, key: K, create: () => V): V {
    const existing = map.get(key);
    if (existing !== undefined) return existing;
    const value = create();
    map.set(key, value);
    return value;
}

export async function copyToClipboard(text: string): Promise<void> {
    try {
        if (typeof GM_setClipboard === "function") {
            GM_setClipboard(text, "text");
            return;
        }
    } catch { /* fall through */ }
    try {
        await navigator.clipboard.writeText(text);
    } catch {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
    }
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): T {
    let t: ReturnType<typeof setTimeout> | undefined;
    return ((...args: never[]) => {
        if (t) clearTimeout(t);
        t = setTimeout(() => fn(...args), ms);
    }) as T;
}
