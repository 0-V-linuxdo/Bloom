/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Adapted from Void++ SettingsStore (GPL-3.0-or-later).
 */

import { isObject } from "./guards";
import { idbSet } from "./idb";
import { Logger } from "./Logger";
import { mapGetOrCreate } from "./misc";

const logger = new Logger("SettingsStore");

export const STORAGE_KEY = "BloomSettings";
const SAVE_DEBOUNCE_MS = 100;

type Listener = (path: string) => void;

function isThenable(value: unknown): boolean {
    return value != null && typeof (value as { then?: unknown }).then === "function";
}

export function parseStoredSettings(raw: unknown): Record<string, unknown> | null {
    if (raw == null || isThenable(raw)) return null;
    if (isObject(raw)) return raw;
    if (typeof raw !== "string" || !raw) return null;
    try {
        const parsed = JSON.parse(raw);
        if (isObject(parsed) && !isThenable(parsed)) return parsed;
        if (typeof parsed === "string") {
            const nested = JSON.parse(parsed);
            return isObject(nested) && !isThenable(nested) ? nested : null;
        }
        return null;
    } catch {
        return null;
    }
}

/** A bag is usable only when it has a non-empty `plugins` object. `{}` / Promise must not hide IDB. */
export function settingsBagFrom(raw: unknown): Record<string, unknown> | null {
    const parsed = parseStoredSettings(raw);
    if (!parsed) return null;
    const plugins = parsed.plugins;
    if (!isObject(plugins) || isThenable(plugins)) return null;
    if (Object.keys(plugins).length === 0) return null;
    return parsed;
}

function rowRecord(row: unknown): Record<string, unknown> | null {
    return isObject(row) ? row : null;
}

function isBlank(value: unknown): boolean {
    if (value == null || value === "") return true;
    if (Array.isArray(value)) return value.length === 0;
    if (isObject(value)) return Object.keys(value).length === 0;
    return false;
}

function valueWeight(value: unknown): number {
    if (isBlank(value)) return 0;
    if (Array.isArray(value)) return 12 + Math.min(value.length, 40);
    if (isObject(value)) return 12 + Math.min(Object.keys(value).length, 40);
    return 3;
}

/**
 * Payload only. `enabled` and `defaultsRev` do not count — a factory
 * `enabled: false` must not outrank a shorter real history, and a
 * deliberate off must not lose to a stale `true` of the same size.
 */
export function bagRichness(bag: Record<string, unknown> | null): number {
    if (!bag) return -1;
    const plugins = bag.plugins;
    if (!isObject(plugins)) return -1;
    let score = 0;
    for (const row of Object.values(plugins)) {
        const rec = rowRecord(row);
        if (!rec) continue;
        for (const [key, value] of Object.entries(rec)) {
            if (key === "defaultsRev" || key === "enabled") continue;
            score += valueWeight(value);
        }
    }
    return score;
}

function enabledTrueCount(bag: Record<string, unknown>): number {
    const plugins = bag.plugins;
    if (!isObject(plugins)) return 0;
    let n = 0;
    for (const row of Object.values(plugins)) {
        const rec = rowRecord(row);
        if (rec?.enabled === true) n++;
    }
    return n;
}

export interface PickedSettingsBag {
    bag: Record<string, unknown>;
    /** Index into the candidate list (GM, IDB, localStorage). */
    index: number;
    score: number;
}

/**
 * Keep the richest bag. Fill only keys it is missing from the others.
 * Never let a thin GM bag replace a fuller IDB / localStorage copy, and
 * never let a loser's `enabled` override the winner.
 */
export function pickSettingsBag(
    candidates: Array<Record<string, unknown> | null>,
): PickedSettingsBag | null {
    const ranked = candidates
        .map((bag, index) => ({ bag, index, score: bagRichness(bag) }))
        .filter((item): item is { bag: Record<string, unknown>; index: number; score: number } =>
            item.bag != null && item.score >= 0)
        .sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            // No payload: prefer a stored "on" over a factory "off".
            // Once there is payload, the earlier source wins so a real
            // toggle in GM is not undone by a stale IDB copy.
            if (a.score === 0 && b.score === 0) {
                const delta = enabledTrueCount(b.bag) - enabledTrueCount(a.bag);
                if (delta) return delta;
            }
            return a.index - b.index;
        });
    if (!ranked.length) return null;

    const base = structuredClone(ranked[0].bag);
    const plugins = base.plugins;
    if (!isObject(plugins)) return null;

    for (const other of ranked.slice(1)) {
        const op = other.bag.plugins;
        if (!isObject(op)) continue;
        for (const [name, row] of Object.entries(op)) {
            const src = rowRecord(row);
            if (!src) continue;
            if (!isObject(plugins[name])) {
                const copy = structuredClone(src);
                delete copy.defaultsRev;
                if (copy.enabled !== true) delete copy.enabled;
                if (Object.keys(copy).length) plugins[name] = copy;
                continue;
            }
            const dst = plugins[name] as Record<string, unknown>;
            for (const [key, value] of Object.entries(src)) {
                if (key === "defaultsRev") continue;
                // A thinner bag's `enabled: false` is how defaultsRev / a
                // factory boot cemented NoShareLink and NoDictation off.
                // Missing stays missing (enabledByDefault). An explicit
                // `true` still fills a hole so a GM-only "on" is not dropped.
                if (key === "enabled") {
                    if (!("enabled" in dst) && value === true) dst.enabled = true;
                    continue;
                }
                if (isBlank(dst[key]) && !isBlank(value)) {
                    dst[key] = structuredClone(value);
                }
            }
        }
    }

    const settingsRow = plugins.Settings;
    if (isObject(settingsRow)) delete settingsRow.defaultsRev;

    return { bag: base, index: ranked[0].index, score: bagRichness(base) };
}

export class SettingsStore<T extends object> {
    private globalListeners = new Set<Listener>();
    private pathListeners = new Map<string, Set<Listener>>();
    private prefixListeners = new Map<string, Set<Listener>>();
    private defaultGetters = new Map<string, (key: string) => unknown>();
    private saveTimer: ReturnType<typeof setTimeout> | null = null;
    private proxyCache = new WeakMap<object, T>();
    /** Boot writes must not hit disk until `initSettings` has chosen a bag. */
    private persist = false;
    /** Set only by a proxy write after persist is armed, or by `persistLoadedBag`. */
    private dirty = false;

    public declare store: T;
    public declare plain: T;

    constructor(plain: T) {
        this.plain = plain;
        this.store = this.makeProxy(plain as Record<string, unknown>);
        window.addEventListener("beforeunload", () => this.flush(), { once: true });
    }

    public flush() {
        if (this.saveTimer) {
            clearTimeout(this.saveTimer);
            this.saveTimer = null;
        }
        this.save();
    }

    /** Drop boot noise. Call after the bag has been chosen. */
    public releasePersist() {
        this.dirty = false;
        if (this.saveTimer) {
            clearTimeout(this.saveTimer);
            this.saveTimer = null;
        }
        this.persist = true;
    }

    /** Write the chosen bag back when GM was the thinner copy. */
    public persistLoadedBag() {
        if (!this.persist) return;
        this.dirty = true;
        this.flush();
    }

    public setDefaultGetter(prefix: string, getter: (key: string) => unknown): void {
        this.defaultGetters.set(prefix, getter);
    }

    private makeProxy(target: Record<string, unknown>, path = ""): T {
        const cached = this.proxyCache.get(target);
        if (cached) return cached as T;

        const proxy = new Proxy(target, {
            get: (t, key: string) => {
                let value = t[key];
                if (value === undefined && key !== "__proto__") {
                    const fullPath = path ? `${path}.${key}` : key;
                    for (const [prefix, getter] of this.defaultGetters) {
                        if (fullPath.startsWith(prefix)) {
                            const settingKey = fullPath.slice(prefix.length + 1);
                            if (settingKey && !settingKey.includes(".")) {
                                const defaultVal = getter(settingKey);
                                if (defaultVal !== undefined) {
                                    t[key] = defaultVal;
                                    value = defaultVal;
                                }
                                break;
                            }
                        }
                    }
                }
                if (isObject(value)) {
                    return this.makeProxy(value, path ? `${path}.${key}` : key);
                }
                return value;
            },
            set: (t, key: string, value) => {
                if (t[key] === value) return true;
                t[key] = value;
                const fullPath = path ? `${path}.${key}` : key;
                this.dirty = true;
                this.notifyListeners(fullPath);
                return true;
            },
            deleteProperty: (t, key: string) => {
                if (!(key in t)) return true;
                delete t[key];
                const fullPath = path ? `${path}.${key}` : key;
                this.dirty = true;
                this.notifyListeners(fullPath);
                return true;
            },
        });

        this.proxyCache.set(target, proxy as T);
        return proxy as T;
    }

    private invokeListeners(listeners: Set<Listener>, path: string) {
        for (const l of Array.from(listeners)) {
            try { l(path); } catch (e) { logger.error("Settings listener error:", e); }
        }
    }

    private notifyListeners(path: string) {
        this.invokeListeners(this.globalListeners, path);
        const listeners = this.pathListeners.get(path);
        if (listeners) this.invokeListeners(listeners, path);
        for (const [prefix, set] of Array.from(this.prefixListeners)) {
            if (path.startsWith(prefix)) this.invokeListeners(set, path);
        }
        this.scheduleSave();
    }

    private scheduleSave() {
        if (!this.persist || !this.dirty) return;
        if (this.saveTimer) return;
        this.saveTimer = setTimeout(() => {
            this.saveTimer = null;
            this.save();
        }, SAVE_DEBOUNCE_MS);
    }

    private save() {
        if (!this.persist || !this.dirty) return;
        try {
            const json = JSON.stringify(this.plain);
            if (typeof GM_setValue === "function") {
                try { GM_setValue(STORAGE_KEY, this.plain); }
                catch {
                    try { GM_setValue(STORAGE_KEY, json); }
                    catch (e2) { logger.warn("Failed to save settings to GM:", e2); }
                }
            }
            try { localStorage.setItem(STORAGE_KEY, json); } catch { /* ignore */ }
            idbSet(STORAGE_KEY, json).catch(e => logger.warn("Failed to save settings to IndexedDB:", e));
            this.dirty = false;
        } catch (e) {
            logger.error("Failed to save settings:", e);
        }
    }

    public addGlobalChangeListener(listener: Listener) { this.globalListeners.add(listener); }
    public removeGlobalChangeListener(listener: Listener) { this.globalListeners.delete(listener); }
    public addChangeListener(path: string, listener: Listener) {
        this.addToMap(this.pathListeners, path, listener);
    }
    public removeChangeListener(path: string, listener: Listener) {
        this.removeFromMap(this.pathListeners, path, listener);
    }
    public addPrefixChangeListener(prefix: string, listener: Listener) {
        this.addToMap(this.prefixListeners, prefix, listener);
    }
    public removePrefixChangeListener(prefix: string, listener: Listener) {
        this.removeFromMap(this.prefixListeners, prefix, listener);
    }

    private addToMap(map: Map<string, Set<Listener>>, key: string, listener: Listener) {
        mapGetOrCreate(map, key, () => new Set<Listener>()).add(listener);
    }
    private removeFromMap(map: Map<string, Set<Listener>>, key: string, listener: Listener) {
        const set = map.get(key);
        if (set) {
            set.delete(listener);
            if (!set.size) map.delete(key);
        }
    }
}
  