/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { h } from "@utils/dom";
import { clamp } from "@utils/misc";

export const TIP = "data-bloom-tip";

const GAP_PX = 6;
const EDGE_PX = 8;

let bubble: HTMLElement | undefined;
let current: Element | null = null;

function show(target: Element | null) {
    if (target === current) return;
    current = target;
    if (!target) {
        bubble?.remove();
        return;
    }
    bubble ??= h("div", { class: "bloom-root bloom-tooltip", attrs: { "role": "tooltip", "data-bloom": "tooltip" } });
    bubble.textContent = target.getAttribute(TIP);
    document.body.append(bubble);
    const anchor = target.getBoundingClientRect();
    const { width, height } = bubble.getBoundingClientRect();
    const below = anchor.bottom + GAP_PX + height <= innerHeight - EDGE_PX;
    bubble.style.left = `${clamp(anchor.left + anchor.width / 2 - width / 2, EDGE_PX, innerWidth - width - EDGE_PX)}px`;
    bubble.style.top = `${below ? anchor.bottom + GAP_PX : anchor.top - GAP_PX - height}px`;
}

const tipTarget = (node: EventTarget | null) => node instanceof Element ? node.closest(`[${TIP}]`) : null;

export function useTooltips() {
    const controller = new AbortController();
    const options = { passive: true, signal: controller.signal };
    document.addEventListener("pointerover", event => show(tipTarget(event.target)), options);
    document.addEventListener("pointerout", event => event.relatedTarget || show(null), options);
    document.addEventListener("focusin", event => event.target instanceof Element && event.target.matches(":focus-visible") && show(tipTarget(event.target)), options);
    document.addEventListener("focusout", () => show(null), options);
    document.addEventListener("pointerdown", () => show(null), options);
    return () => {
        controller.abort();
        show(null);
    };
}
