/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * ScriptReady (8s floor + islands) is not a license to write the page.
 * PageTouch is a trusted user gesture after ScriptReady, deferred off
 * the event so React's document click handlers finish first.
 */

let scriptReady = false;
let pageTouched = false;
let pendingUser = false;
let armed = false;
const waiters: Array<() => void> = [];

function isBloomTarget(target: EventTarget | null): boolean {
    if (!(target instanceof Node)) return false;
    const root = target.getRootNode();
    if (root instanceof ShadowRoot) {
        const host = root.host;
        if (host instanceof Element && host.id === "bloom-root") return true;
    }
    return target instanceof Element && !!target.closest("#bloom-root");
}

function fireTouch() {
    if (pageTouched) return;
    if (!scriptReady) {
        pendingUser = true;
        return;
    }
    pageTouched = true;
    const list = waiters.splice(0);
    for (const fn of list) fn();
}

export function markScriptReady() {
    scriptReady = true;
    if (pendingUser) {
        pendingUser = false;
        fireTouch();
    }
}

export function isPageTouched(): boolean {
    return pageTouched;
}

export function whenPageTouched(fn: () => void) {
    if (pageTouched) fn();
    else waiters.push(fn);
}

/** Menu / explicit user action. Safe to call before ScriptReady. */
export function requestPageTouch() {
    pendingUser = true;
    if (scriptReady) setTimeout(fireTouch, 0);
}

/** After ScriptReady: first trusted click on chatgpt.com, not Bloom chrome. */
export function armPageTouch() {
    if (armed || pageTouched) return;
    armed = true;
    const onPtr = (e: PointerEvent) => {
        if (!e.isTrusted) return;
        if (isBloomTarget(e.target)) return;
        window.removeEventListener("pointerdown", onPtr, true);
        setTimeout(fireTouch, 0);
    };
    window.addEventListener("pointerdown", onPtr, { capture: true, passive: true });
}
