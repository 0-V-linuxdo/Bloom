/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { bindBloom, retireBloom } from "@utils/instance";
import { Logger } from "@utils/Logger";
import { pageWindow } from "@utils/misc";

import * as Bloom from "./Bloom";

const logger = new Logger("Boot");

if (window === window.top) {
    retireBloom((pageWindow as { Bloom?: typeof Bloom; }).Bloom);
    bindBloom(Bloom);
    Bloom.init().catch(e => logger.error("Startup failed", e));
}
