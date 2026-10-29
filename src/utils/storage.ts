/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Logger } from "./Logger";

const logger = new Logger("Storage");

export function readStored(key: string) {
    try {
        return localStorage.getItem(key) ?? undefined;
    } catch {
        return;
    }
}

export function writeStored(key: string, value: object) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        logger.warn("localStorage write failed", e);
    }
}

export function removeStored(key: string) {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        logger.warn("localStorage delete failed", e);
    }
}

export function watchStored(key: string, onChange: (value: string | null) => void) {
    addEventListener("storage", (event: StorageEvent) => {
        if (event.key === key) onChange(event.newValue);
    });
}
