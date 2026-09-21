/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Fallback map for tsc. build.mjs replaces this module with git-stamped
 * times so the Recent tab can match Void++ (7-day plugin.updatedAt).
 */

import type { Plugin } from "./types";

export const PLUGIN_UPDATED_AT: Record<string, number> = {};

export function stampPluginUpdatedAt(plugin: Plugin) {
    const t = PLUGIN_UPDATED_AT[plugin.name];
    if (typeof t === "number" && t > 0) plugin.updatedAt = t;
}
