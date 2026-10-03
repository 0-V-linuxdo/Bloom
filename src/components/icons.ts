/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { svg } from "@utils/dom";

const stroke = (paths: string) =>
    `<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

export const BLOSSOM_PATH = "M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z";

const ICONS = {
    bloom: `<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${BLOSSOM_PATH}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,
    close: stroke('<path d="M18 6 6 18M6 6l12 12"/>'),
    gear: stroke('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),
    star: stroke('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),
    pin: stroke('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),
    info: stroke('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),
    search: stroke('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
    trash: stroke('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),
    edit: stroke('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),
    send: stroke('<path d="M12 19V5M5 12l7-7 7 7"/>'),
    copy: stroke('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),
    chevron: stroke('<path d="m6 9 6 6 6-6"/>'),
    play: stroke('<path d="M7 4v16l13-8z"/>'),
    plus: stroke('<path d="M12 5v14M5 12h14"/>'),
    check: stroke('<path d="m5 12 5 5 9-10"/>'),
    alert: stroke('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),
    bubble: stroke('<path d="M4 5h16v11H9l-5 4z"/>'),
    layout: stroke('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),
    eye: stroke('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
    eyeOff: stroke('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),
    clock: stroke('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    list: stroke('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),
    bell: stroke('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),
    history: stroke('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),
    broom: stroke('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),
    width: stroke('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),
    user: stroke('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),
    share: stroke('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),
    mic: stroke('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),
    queue: stroke('<path d="M4 6h16M4 12h16M4 18h10"/>'),
    favicon: stroke('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),
    spark: stroke('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),
    quote: stroke('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),
    ghost: stroke('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>'),
} as const;

export type IconName = keyof typeof ICONS;

export const icon = (name: IconName) => svg(ICONS[name]);
