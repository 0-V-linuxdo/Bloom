/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { readSetting, writeSetting } from "@api/Settings";

export const ENTRY_KEYS = ["showSidebarEntry", "showSidebarEntryOnHover", "showAccountMenuEntry"] as const;

export type EntryKey = (typeof ENTRY_KEYS)[number];

const ENTRY_REVISION = 1;

export const ENTRY_DEFAULTS: Record<EntryKey, boolean> = {
    showSidebarEntry: true,
    showSidebarEntryOnHover: false,
    showAccountMenuEntry: false,
};

export const isEntryKey = (key: string): key is EntryKey => Object.hasOwn(ENTRY_DEFAULTS, key);

export const entryOn = (key: EntryKey) => (readSetting("Settings", key) as boolean | undefined) ?? ENTRY_DEFAULTS[key];

export const keepEntry = (key: string, next: unknown) =>
    !isEntryKey(key) || next !== false || ENTRY_KEYS.some(name => name !== key && entryOn(name));

export function adoptEntryDefaults() {
    if (readSetting("Settings", "entryRevision") === ENTRY_REVISION) return;
    for (const key of ENTRY_KEYS) writeSetting("Settings", key);
    writeSetting("Settings", "entryRevision", ENTRY_REVISION);
}
