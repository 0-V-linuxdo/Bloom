/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Logger } from "@utils/Logger";
import { pageWindow } from "@utils/misc";

import * as Bloom from "./Bloom";

const logger = new Logger("Boot");

if (window === window.top) {
    const previous = (pageWindow as { Bloom?: { VERSION?: string; }; }).Bloom;
    if (previous) logger.warn("Replacing another Bloom++ instance", previous.VERSION);
    Object.defineProperty(pageWindow, "Bloom", { value: Bloom, configurable: true, writable: true });
    Bloom.init().catch(e => logger.error("Startup failed", e));
}
