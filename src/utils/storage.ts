/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Logger } from "./Logger";

const logger = new Logger("Storage");

const DB_NAME = "bloompp";
const DB_STORE = "kv";

let dbPromise: Promise<IDBDatabase> | null = null;

function openDb() {
    dbPromise ??= new Promise<IDBDatabase>((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, 1);
        req.onupgradeneeded = () => {
            if (!req.result.objectStoreNames.contains(DB_STORE)) req.result.createObjectStore(DB_STORE);
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
    return dbPromise;
}

function idbRequest<T>(mode: IDBTransactionMode, run: (store: IDBObjectStore) => IDBRequest<T>) {
    return openDb().then(db => new Promise<T>((resolve, reject) => {
        const req = run(db.transaction(DB_STORE, mode).objectStore(DB_STORE));
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    }));
}

async function readGm(key: string) {
    if (typeof GM_getValue !== "function") return;
    try {
        return await GM_getValue(key);
    } catch (e) {
        logger.warn("GM read failed", e);
        return;
    }
}

async function readIdb(key: string) {
    try {
        return await idbRequest("readonly", store => store.get(key));
    } catch (e) {
        logger.warn("IndexedDB read failed", e);
        return;
    }
}

function readLocal(key: string) {
    try {
        return localStorage.getItem(key) ?? undefined;
    } catch {
        return;
    }
}

export async function readAllCopies(key: string): Promise<unknown[]> {
    return Promise.all([readGm(key), readIdb(key), readLocal(key)]);
}

export function watchCopies(key: string, onChange: (value: unknown) => void) {
    if (typeof GM_addValueChangeListener === "function") {
        GM_addValueChangeListener(key, (_key, _old, value, remote) => {
            if (remote) onChange(value);
        });
    }
    addEventListener("storage", (event: StorageEvent) => {
        if (event.key === key) onChange(event.newValue);
    });
}

export function writeAllCopies(key: string, value: object) {
    const json = JSON.stringify(value);
    if (typeof GM_setValue === "function") {
        try {
            GM_setValue(key, value);
        } catch {
            GM_setValue(key, json);
        }
    }
    try {
        localStorage.setItem(key, json);
    } catch (e) {
        logger.warn("localStorage write failed", e);
    }
    idbRequest("readwrite", store => store.put(json, key)).catch(e => logger.warn("IndexedDB write failed", e));
}
