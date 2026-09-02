/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import * as Bloom from "./Bloom";

const target = typeof unsafeWindow !== "undefined" ? unsafeWindow : window;

if (window === window.top && !(target as { Bloom?: unknown }).Bloom) {
    Object.defineProperty(target, "Bloom", {
        value: Bloom,
        writable: false,
        configurable: true,
    });
    Bloom.initSettings().then(() => Bloom.init()).catch(e => console.error("[Bloom++] Fatal init error:", e));
}
