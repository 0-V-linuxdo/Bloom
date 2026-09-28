/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

const HOST_READY_CAP_MS = 8000;
const IDLE_TIMEOUT_MS = 1500;
const SHELL_POLL_MS = 100;
const SHELL_SELECTOR = "main, nav, [data-app-action-sidebar-scroll], [data-app-navigation-rail]";

export function whenDomReady() {
    if (document.readyState !== "loading") return Promise.resolve();
    return new Promise<void>(resolve => document.addEventListener("DOMContentLoaded", () => resolve(), { once: true }));
}

const idle = () => new Promise<void>(resolve => {
    if (typeof requestIdleCallback === "function") requestIdleCallback(() => resolve(), { timeout: IDLE_TIMEOUT_MS });
    else setTimeout(resolve, SHELL_POLL_MS);
});

async function shellMounted() {
    while (!document.querySelector(SHELL_SELECTOR)) await new Promise(resolve => setTimeout(resolve, SHELL_POLL_MS));
    await idle();
    await idle();
}

export async function whenHostReady() {
    await whenDomReady();
    await Promise.race([shellMounted(), new Promise(resolve => setTimeout(resolve, HOST_READY_CAP_MS))]);
}
