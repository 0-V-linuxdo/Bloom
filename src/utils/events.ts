/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Logger } from "./Logger";

const logger = new Logger("Events");

export function createEmitter<Events extends Record<string, unknown>>() {
    const listeners = new Map<keyof Events, Set<(payload: never) => void>>();
    return {
        on<K extends keyof Events>(type: K, listener: (payload: Events[K]) => void) {
            let set = listeners.get(type);
            if (!set) listeners.set(type, set = new Set());
            set.add(listener);
            return () => void set.delete(listener);
        },
        emit<K extends keyof Events>(type: K, payload: Events[K]) {
            for (const listener of listeners.get(type) ?? []) {
                try {
                    (listener as (payload: Events[K]) => void)(payload);
                } catch (e) {
                    logger.error(`Listener for ${String(type)} failed`, e);
                }
            }
        },
    };
}
