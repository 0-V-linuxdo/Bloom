/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { dropBloomStyles } from "@utils/css";
import { Logger } from "@utils/Logger";
import { pageWindow } from "@utils/misc";

import * as Bloom from "./Bloom";

const logger = new Logger("Boot");

type Previous = {
    VERSION?: string;
    destroy?: () => void;
    plugins?: Map<string, { start?: () => void; stop?: () => void; styles?: unknown }>;
};

function retire(previous?: Previous) {
    if (!previous) return;
    logger.warn("Replacing another Bloom++ instance", previous.VERSION);
    if (previous.destroy) {
        previous.destroy();
        return;
    }
    for (const plugin of previous.plugins?.values() ?? []) {
        try {
            plugin.stop?.();
        } catch (e) {
            logger.error("Failed to stop previous plugin", e);
        }
        plugin.styles = "";
        plugin.start = undefined;
    }
    dropBloomStyles();
}

if (window === window.top) {
    retire((pageWindow as { Bloom?: Previous; }).Bloom);
    Object.defineProperty(pageWindow, "Bloom", { value: Bloom, configurable: true, writable: true });
    Bloom.init().catch(e => logger.error("Startup failed", e));
}
