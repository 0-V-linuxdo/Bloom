/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

export const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null && !Array.isArray(value);

export const uniqueId = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const truncate = (text: string, max: number) => text.length > max ? `${text.slice(0, max - 1)}…` : text;

export const normalizeText = (text: string) => text.replaceAll(/[​-‍﻿]/g, "").replaceAll(/\s+/g, " ").trim();

export function pluralize(count: number, word: string) {
    return `${count} ${word}${count === 1 ? "" : "s"}`;
}

export async function copyToClipboard(text: string) {
    if (typeof GM_setClipboard === "function") {
        GM_setClipboard(text, "text");
        return;
    }
    await navigator.clipboard.writeText(text);
}

export function parseJson(text: string): unknown {
    try {
        return JSON.parse(text);
    } catch {
        return undefined;
    }
}

export const pageWindow: Window & typeof globalThis = typeof unsafeWindow === "undefined" ? window : unsafeWindow;
