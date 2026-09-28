/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

type Level = "debug" | "info" | "warn" | "error";

export class Logger {
    constructor(private readonly tag: string) {}

    private log(level: Level, args: unknown[]) {
        console[level](`[Bloom++] [${this.tag}]`, ...args);
    }

    debug(...args: unknown[]) { this.log("debug", args); }
    info(...args: unknown[]) { this.log("info", args); }
    warn(...args: unknown[]) { this.log("warn", args); }
    error(...args: unknown[]) { this.log("error", args); }
}
