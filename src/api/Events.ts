/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export interface BloomEventMap {
    pluginToggle: { name: string; enabled: boolean };
    settingsOpen: undefined;
}

type Handler<K extends keyof BloomEventMap> = (data: BloomEventMap[K]) => void;

const listeners = new Map<string, Set<(data: unknown) => void>>();

export function onBloomEvent<K extends keyof BloomEventMap>(name: K, handler: Handler<K>) {
    let set = listeners.get(name);
    if (!set) {
        set = new Set();
        listeners.set(name, set);
    }
    set.add(handler as (data: unknown) => void);
    return () => set!.delete(handler as (data: unknown) => void);
}

export function emitBloomEvent<K extends keyof BloomEventMap>(name: K, data: BloomEventMap[K]) {
    const set = listeners.get(name);
    if (!set) return;
    for (const h of Array.from(set)) {
        try { h(data); } catch { /* ignore */ }
    }
}
