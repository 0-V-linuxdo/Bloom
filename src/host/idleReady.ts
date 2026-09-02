/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * IdleReady replaces PageTouch. The host must not start on a ChatGPT
 * click: hydrateRoot(document) queues that pointerdown, and a body
 * sibling in the same turn drops the event (React #32173, MCP-SA #190).
 *
 * Sequence: 8s floor + islands → requestIdleCallback → shell (FAB)
 * → next idle → plugins. The Violentmonkey menu may skip the wait.
 */

let shellReady = false;
let idleReady = false;
const shellWaiters: Array<() => void> = [];
const idleWaiters: Array<() => void> = [];

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

export function isShellReady(): boolean {
    return shellReady;
}

export function isIdleReady(): boolean {
    return idleReady;
}

export function whenShellReady(fn: () => void) {
    if (shellReady) fn();
    else shellWaiters.push(fn);
}

export function whenIdleReady(fn: () => void) {
    if (idleReady) fn();
    else idleWaiters.push(fn);
}

/** Menu / explicit user action. Safe before the idle sequence. */
export function requestIdleReady() {
    fireShell();
    fireIdle();
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
