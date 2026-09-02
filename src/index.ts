/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import * as Bloom from "./Bloom";

const target = typeof unsafeWindow !== "undefined" ? unsafeWindow : window;

if (window === window.top) {
    const prev = (target as { Bloom?: { VERSION?: string } }).Bloom;
    if (prev) {
        console.warn("[Bloom++] replacing previous instance", prev.VERSION ?? "(unknown)", "→", Bloom.VERSION);
    }
    try {
        Object.defineProperty(target, "Bloom", {
            value: Bloom,
            writable: false,
            configurable: true,
        });
    } catch (e) {
        console.warn("[Bloom++] could not replace window.Bloom", e);
    }
    Bloom.initSettings().then(() => Bloom.init()).catch(e => console.error("[Bloom++] Fatal init error:", e));
}
