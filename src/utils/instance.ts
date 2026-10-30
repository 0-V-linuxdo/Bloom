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
    '[data-bloom="star-list"]',
    '[data-bloom="entry"]',
    '[data-bloom="message-star"]',
    '[data-bloom="queue"]',
    '[data-bloom="recent"]',
    '[data-bloom="quote-chip"]',
].join(", ");

export function sweepBloomChrome() {
    if (typeof document === "undefined" || !document.documentElement) return;
    for (const el of document.querySelectorAll(BLOOM_CHROME)) el.remove();
    for (const el of document.querySelectorAll("[data-bloom-greeting]")) el.removeAttribute("data-bloom-greeting");
    for (const el of document.querySelectorAll("[data-bloom-placeholder]")) el.removeAttribute("data-bloom-placeholder");
    for (const el of document.querySelectorAll("[data-bloom-streamer-open]")) el.removeAttribute("data-bloom-streamer-open");
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
