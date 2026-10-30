/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { readSetting } from "@api/Settings";

export const ENTRY_KEYS = ["showSidebarEntry", "showSidebarEntryOnHover", "showAccountMenuEntry"] as const;

export type EntryKey = (typeof ENTRY_KEYS)[number];

export const ENTRY_DEFAULTS: Record<EntryKey, boolean> = {
    showSidebarEntry: true,
    showSidebarEntryOnHover: false,
    showAccountMenuEntry: false,
};

export const isEntryKey = (key: string): key is EntryKey => Object.hasOwn(ENTRY_DEFAULTS, key);

export const entryOn = (key: EntryKey) => (readSetting("Settings", key) as boolean | undefined) ?? ENTRY_DEFAULTS[key];

export const keepEntry = (key: string, next: unknown) =>
    !isEntryKey(key) || next !== false || ENTRY_KEYS.some(name => name !== key && entryOn(name));
