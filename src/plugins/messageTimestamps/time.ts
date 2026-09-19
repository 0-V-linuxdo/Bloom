/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Local timestamp parse/format for MessageTimestamps. Not Grok uuid /
 * ResponseStore harvest.
 */

export function toMs(value: unknown): number | null {
    if (typeof value === "number" && Number.isFinite(value) && value > 0) {
        return value > 1e12 ? value : Math.round(value * 1000);
    }
    if (typeof value === "string") {
        const raw = value.trim();
        if (!raw) return null;
        if (/^\d+(\.\d+)?$/.test(raw)) return toMs(Number(raw));
        const parsed = Date.parse(raw);
        return Number.isFinite(parsed) ? parsed : null;
    }
    return null;
}

export function formatStamp(ms: number, showDate: boolean, now = Date.now()): string {
    const date = new Date(ms);
    if (Number.isNaN(date.getTime())) return "";
    const current = new Date(now);
    const time = date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
    const sameDay = date.toDateString() === current.toDateString();
    if (sameDay || !showDate) return time;
    const sameYear = date.getFullYear() === current.getFullYear();
    const day = date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        ...(sameYear ? {} : { year: "numeric" as const }),
    });
    return `${day}, ${time}`;
}

export function isoOf(ms: number): string {
    try { return new Date(ms).toISOString(); }
    catch { return ""; }
}
