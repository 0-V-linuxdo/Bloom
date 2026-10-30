/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { dropBloomStyles } from "./css";
import { Logger } from "./Logger";
import { pageWindow } from "./misc";

const SLOT = "__bloomHost";

export type BloomHost = {
    VERSION?: string;
    destroy?: () => void;
    plugins?: Map<string, { start?: () => void; stop?: () => void; styles?: unknown }>;
};

type Holder = { Bloom?: BloomHost } & Record<typeof SLOT, BloomHost | undefined>;

const logger = new Logger("Boot");

export const BLOOM_CHROME = [
    '[data-bloom="navigator"]',
    '[data-bloom="settings"]',
    '[data-bloom="history-hud"]',
    '[data-bloom="history-dialog"]',
    '[data-bloom="star-list"]',
    '[data-bloom="entry"]',
    '[data-bloom="menu-entry"]',
    '[data-bloom="message-star"]',
    '[data-bloom="starred"]',
    '[data-bloom="chat-star"]',
    '[data-bloom="queue"]',
    '[data-bloom="recent"]',
    '[data-bloom="quote-chip"]',
    '[data-bloom="quote-back"]',
    '[data-bloom="cls"]',
    '[data-bloom="timestamp"]',
    '[data-bloom="tooltip"]',
    '[data-bloom="notices"]',
].join(", ");

const BLOOM_MARKS = [
    "data-bloom-greeting",
    "data-bloom-placeholder",
    "data-bloom-streamer-open",
    "data-bloom-share",
    "data-bloom-invite",
    "data-bloom-csi-avatar",
    "data-bloom-csi-sized",
] as const;

export function sweepBloomChrome() {
    if (typeof document === "undefined" || !document.documentElement) return;
    for (const el of document.querySelectorAll(BLOOM_CHROME)) el.remove();
    for (const name of BLOOM_MARKS) {
        for (const el of document.querySelectorAll(`[${name}]`)) el.removeAttribute(name);
    }
    for (const el of document.querySelectorAll<HTMLElement>("[data-bloom-text]")) {
        el.removeAttribute("data-bloom-text");
        el.style.removeProperty("--bloom-text-size");
        el.style.removeProperty("--bloom-text");
    }
}

function halt(instance: BloomHost) {
    logger.warn("Replacing another Bloom++ instance", instance.VERSION);
    if (instance.destroy) {
        instance.destroy();
        return;
    }
    for (const plugin of instance.plugins?.values() ?? []) {
        try {
            plugin.stop?.();
        } catch (e) {
            logger.error("Failed to stop previous plugin", e);
        }
        plugin.styles = "";
        plugin.start = undefined;
    }
    dropBloomStyles();
}

export function retireBloom(previous?: BloomHost) {
    const host = pageWindow as unknown as Holder;
    const seen = new Set<BloomHost>();
    for (const candidate of [previous, host.Bloom, host[SLOT]]) {
        if (!candidate || seen.has(candidate)) continue;
        seen.add(candidate);
        try {
            halt(candidate);
        } catch (e) {
            logger.error("Failed to retire Bloom++", e);
        }
    }
    sweepBloomChrome();
}

export function bindBloom(bloom: BloomHost) {
    const host = pageWindow as unknown as Holder;
    try {
        delete host.Bloom;
    } catch {
        /* non-configurable */
    }
    Object.defineProperty(host, "Bloom", { value: bloom, configurable: true, writable: true });
    Object.defineProperty(host, SLOT, { value: bloom, configurable: true, writable: true });
}
