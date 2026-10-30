/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { clamp } from "./misc";

export const HOVER_CLOSE_MS = 80;
export const HOVER_TOWARD_MS = 420;

export interface Pt {
    x: number;
    y: number;
}

export type HoverEvent = Pick<PointerEvent, "clientX" | "clientY" | "relatedTarget" | "target">;

function side(p: Pt, a: Pt, b: Pt) {
    return (p.x - b.x) * (a.y - b.y) - (a.x - b.x) * (p.y - b.y);
}

export function pointInTriangle(p: Pt, a: Pt, b: Pt, c: Pt) {
    const x = side(p, a, b);
    const y = side(p, b, c);
    const z = side(p, c, a);
    return !((x < 0 || y < 0 || z < 0) && (x > 0 || y > 0 || z > 0));
}

export function facingCorners(from: DOMRectReadOnly, to: DOMRectReadOnly): [Pt, Pt] {
    const dx = (to.left + to.right) / 2 - (from.left + from.right) / 2;
    const dy = (to.top + to.bottom) / 2 - (from.top + from.bottom) / 2;
    if (Math.abs(dx) >= Math.abs(dy)) {
        const x = dx < 0 ? to.right : to.left;
        return [{ x, y: to.top }, { x, y: to.bottom }];
    }
    const y = dy < 0 ? to.bottom : to.top;
    return [{ x: to.left, y }, { x: to.right, y }];
}

export function distToRect(p: Pt, rect: DOMRectReadOnly) {
    const x = clamp(p.x, rect.left, rect.right);
    const y = clamp(p.y, rect.top, rect.bottom);
    return Math.hypot(p.x - x, p.y - y);
}

export interface HoverIntent {
    enter(): void;
    leave(event: HoverEvent): void;
    dispose(): void;
}

export function hoverIntent(opts: {
    over: (node: EventTarget | null) => boolean;
    trigger: () => Element | null | undefined;
    panel: () => Element | null | undefined;
    setHeld: (held: boolean) => void;
    closeDelay?: number;
    towardDelay?: number;
}): HoverIntent {
    const closeDelay = opts.closeDelay ?? HOVER_CLOSE_MS;
    const towardDelay = opts.towardDelay ?? HOVER_TOWARD_MS;
    let timer = 0;
    let held = false;
    let apex: Pt | null = null;
    let prev: Pt | null = null;

    const unlisten = () => {
        document.removeEventListener("pointermove", onMove, true);
    };

    const clear = () => {
        if (timer) window.clearTimeout(timer);
        timer = 0;
        unlisten();
        apex = null;
        prev = null;
    };

    const release = () => {
        clear();
        if (!held) return;
        held = false;
        opts.setHeld(false);
    };

    const hold = () => {
        if (held) return;
        held = true;
        opts.setHeld(true);
    };

    const schedule = (ms: number) => {
        if (timer) window.clearTimeout(timer);
        timer = window.setTimeout(release, ms);
    };

    const toward = (p: Pt) => {
        const panel = opts.panel();
        const trigger = opts.trigger();
        if (!panel || !apex) return false;
        const box = panel.getBoundingClientRect();
        if (box.width <= 0 && box.height <= 0) return false;
        const origin = trigger?.getBoundingClientRect();
        const [a, b] = origin && (origin.width || origin.height)
            ? facingCorners(origin, box)
            : [{ x: box.left, y: box.top }, { x: box.right, y: box.bottom }];
        if (pointInTriangle(p, apex, a, b)) return true;
        return prev != null && distToRect(p, box) < distToRect(prev, box) - 0.25;
    };

    const onMove = (event: PointerEvent) => {
        const p = { x: event.clientX, y: event.clientY };
        if (opts.over(event.target)) {
            clear();
            return;
        }
        if (toward(p)) schedule(towardDelay);
        else release();
        prev = p;
    };

    return {
        enter() {
            clear();
        },
        leave(event) {
            if (opts.over(event.relatedTarget)) {
                clear();
                return;
            }
            apex = { x: event.clientX, y: event.clientY };
            prev = apex;
            hold();
            document.addEventListener("pointermove", onMove, true);
            schedule(closeDelay);
        },
        dispose() {
            clear();
            held = false;
        },
    };
}
