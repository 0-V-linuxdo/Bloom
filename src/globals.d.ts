/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

declare function GM_getValue(key: string, defaultValue?: unknown): unknown;
declare function GM_setValue(key: string, value: unknown): void;
declare function GM_setClipboard?(text: string, type?: string): void;
declare function GM_addStyle(css: string): HTMLStyleElement | void;
declare function GM_registerMenuCommand?(caption: string, onClick: () => void, options?: { id?: string }): void;

declare const unsafeWindow: Window & typeof globalThis;

declare module "*.css" {
    const css: string;
    export default css;
}
