/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

interface GMNotificationDetails {
    title?: string;
    text?: string;
    image?: string;
    silent?: boolean;
    onclick?: () => void;
}

interface GMXhrDetails {
    url: string;
    responseType: "arraybuffer";
    onload(response: { status: number; response: ArrayBuffer; }): void;
    onerror(): void;
    ontimeout(): void;
}

declare function GM_getValue(key: string, defaultValue?: unknown): unknown;
declare function GM_setValue(key: string, value: unknown): void;
declare function GM_addValueChangeListener(key: string, listener: (key: string, oldValue: unknown, newValue: unknown, remote: boolean) => void): number;
declare function GM_setClipboard(text: string, type?: string): void;
declare function GM_registerMenuCommand(caption: string, onClick: () => void): void;
declare function GM_notification(details: GMNotificationDetails): void;
declare function GM_xmlhttpRequest(details: GMXhrDetails): void;
declare function exportFunction<T extends (...args: never[]) => unknown>(fn: T, target: object): T;

declare const unsafeWindow: Window & typeof globalThis;

declare module "*.css" {
    const css: string;
    export default css;
}

declare const BLOOM_VERSION: string;
