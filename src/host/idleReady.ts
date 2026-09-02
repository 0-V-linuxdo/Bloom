/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * IdleReady mounts the FAB. HostReady plugins wait for a Bloom-chrome
 * gesture (FAB or Violentmonkey menu) so they never write head / observe
 * the composer during ChatGPT's remaining hydrate.
 */

let shellReady = false;
let idleReady = false;
let chromeReady = false;
const shellWaiters: Array<() => void> = [];
const idleWaiters: Array<() => void> = [];
const chromeWaiters: Array<() => void> = [];

function flush(waiters: Array<() => void>) {
    const list = waiters.splice(0);
    for (const fn of list) fn();
}

function fireShell() {
    if (shellReady) return;
    shellReady = true;
    flush(shellWaiters);
}

function fireIdle() {
    if (idleReady) return;
    idleReady = true;
    if (!shellReady) fireShell();
    flush(idleWaiters);
}

function fireChrome() {
    if (chromeReady) return;
    chromeReady = true;
    if (!shellReady) fireShell();
    flush(chromeWaiters);
}

export function isShellReady(): boolean {
    return shellReady;
}

export function isIdleReady(): boolean {
    return idleReady;
}

export function isChromeReady(): boolean {
    return chromeReady;
}

export function whenShellReady(fn: () => void) {
    if (shellReady) fn();
    else shellWaiters.push(fn);
}

export function whenIdleReady(fn: () => void) {
    if (idleReady) fn();
    else idleWaiters.push(fn);
}

export function whenChromeReady(fn: () => void) {
    if (chromeReady) fn();
    else chromeWaiters.push(fn);
}

/** Menu / explicit user action. Safe before the idle sequence. */
export function requestIdleReady() {
    fireShell();
    fireIdle();
}

/** FAB or Violentmonkey menu. Starts HostReady plugins. */
export function requestChromeReady() {
    fireChrome();
}

export function whenBrowserIdle(timeout = 4_000): Promise<void> {
    return new Promise(resolve => {
        const w = window as Window & {
            requestIdleCallback?: (cb: IdleRequestCallback, opts?: IdleRequestOptions) => number;
        };
        if (typeof w.requestIdleCallback === "function") {
            w.requestIdleCallback(() => resolve(), { timeout });
            return;
        }
        setTimeout(resolve, 0);
    });
}

export async function runIdleSequence() {
    await whenBrowserIdle(4_000);
    fireShell();
    await whenBrowserIdle(4_000);
    fireIdle();
}
