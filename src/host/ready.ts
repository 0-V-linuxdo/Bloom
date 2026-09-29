/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

const HOST_READY_CAP_MS = 8000;
const HYDRATION_POLL_MS = 100;
const REACT_ROOT = "__reactContainer$";
const REACT_FIBER = "__reactFiber$";

export function whenDomReady() {
    if (document.readyState !== "loading") return Promise.resolve();
    return new Promise<void>(resolve => document.addEventListener("DOMContentLoaded", () => resolve(), { once: true }));
}

const hasExpando = (target: object, prefix: string) =>
    Object.keys((target as { wrappedJSObject?: object; }).wrappedJSObject ?? target).some(key => key.startsWith(prefix));

export const isHydrated = (el: Element) => !hasExpando(document, REACT_ROOT) || hasExpando(el, REACT_FIBER);

export async function whenHostReady() {
    await whenDomReady();
    const deadline = Date.now() + HOST_READY_CAP_MS;
    while (!hasExpando(document.body, REACT_FIBER) && Date.now() < deadline) await new Promise(resolve => setTimeout(resolve, HYDRATION_POLL_MS));
}
