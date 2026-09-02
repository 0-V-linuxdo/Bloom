/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export class Logger {
    constructor(private readonly tag: string) {}

    private prefix(): string {
        return `[Bloom++] [${this.tag}]`;
    }

    info(...args: unknown[]) {
        console.info(this.prefix(), ...args);
    }

    warn(...args: unknown[]) {
        console.warn(this.prefix(), ...args);
    }

    error(...args: unknown[]) {
        console.error(this.prefix(), ...args);
    }

    debug(...args: unknown[]) {
        console.debug(this.prefix(), ...args);
    }
}
