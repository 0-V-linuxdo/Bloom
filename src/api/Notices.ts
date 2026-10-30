/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { icon, type IconName } from "@components/icons";
import { isHydrated } from "@host/ready";
import { classNameFactory, registerStyle } from "@utils/css";
import { h } from "@utils/dom";
import { uniqueId } from "@utils/misc";

import styles from "./Notices.css";

export type NoticeType = "info" | "success" | "warning" | "error";

export interface NoticeAction {
    label: string;
    onClick: () => void;
}

export interface NoticeOptions {
    key?: string;
    title: string;
    message?: string;
    type?: NoticeType;
    action?: NoticeAction;
    onClick?: () => void;
    onClose?: () => void;
    duration?: number;
}

interface LiveNotice {
    key: string;
    el: HTMLElement;
    options: NoticeOptions;
    remaining: number;
    startedAt: number;
    timer?: ReturnType<typeof setTimeout>;
}

const DEFAULT_DURATION_MS = 6000;
const MAX_NOTICES = 4;

const TYPE_ICONS: Record<NoticeType, IconName> = {
    info: "info",
    success: "check",
    warning: "alert",
    error: "alert",
};

const cl = classNameFactory("bloom-notice-");
const live = new Map<string, LiveNotice>();
let stack: HTMLElement | undefined;

function ensureStack() {
    if (!document.body || !isHydrated(document.body)) return null;
    registerStyle("notices", styles);
    if (stack?.isConnected) return stack;
    stack = h("div", { class: `${cl("stack")} bloom-root`, attrs: { "data-bloom": "notices", "role": "region", "aria-label": "Bloom++ notices", "aria-live": "polite" } });
    document.body.append(stack);
    return stack;
}

function arm(notice: LiveNotice) {
    clearTimeout(notice.timer);
    if (notice.remaining <= 0) return;
    notice.startedAt = Date.now();
    notice.timer = setTimeout(() => closeNotice(notice.key), notice.remaining);
}

function pause(notice: LiveNotice) {
    if (notice.timer === undefined) return;
    clearTimeout(notice.timer);
    notice.timer = undefined;
    notice.remaining = Math.max(1, notice.remaining - (Date.now() - notice.startedAt));
}

function render(key: string, options: NoticeOptions) {
    const type = options.type ?? "info";
    const close = h("button", { class: cl("close"), attrs: { "type": "button", "aria-label": "Dismiss", "data-bloom": "control" }, on: { click: event => {
        event.stopPropagation();
        closeNotice(key);
    } } }, icon("close"));
    const action = options.action && h("button", { class: cl("action"), text: options.action.label, attrs: { "type": "button", "data-bloom": "control" }, on: { click: event => {
        event.stopPropagation();
        options.action?.onClick();
        closeNotice(key);
    } } });
    const el = h("div", { class: `${cl("card")} ${cl(type)}`, attrs: { "role": type === "error" ? "alert" : "status", "data-bloom-notice": key } },
        h("span", { class: cl("icon") }, icon(TYPE_ICONS[type])),
        h("div", { class: cl("body") },
            h("div", { class: cl("title"), text: options.title }),
            options.message && h("div", { class: cl("message"), text: options.message })),
        action,
        close);
    if (options.onClick) {
        el.classList.add(cl("clickable"));
        el.addEventListener("click", () => {
            options.onClick?.();
            closeNotice(key);
        });
    }
    return el;
}

export function showNotice(options: NoticeOptions) {
    const key = options.key ?? uniqueId("notice");
    const host = ensureStack();
    if (!host) return key;
    const el = render(key, options);
    const previous = live.get(key);
    const notice: LiveNotice = { key, el, options, remaining: options.duration ?? DEFAULT_DURATION_MS, startedAt: Date.now() };
    el.addEventListener("pointerenter", () => pause(notice));
    el.addEventListener("pointerleave", () => arm(notice));
    if (previous) {
        clearTimeout(previous.timer);
        previous.el.replaceWith(el);
    } else {
        host.append(el);
    }
    live.set(key, notice);
    arm(notice);
    for (const [oldest] of [...live].slice(0, Math.max(0, live.size - MAX_NOTICES))) closeNotice(oldest);
    return key;
}

export function closeNotice(key: string) {
    const notice = live.get(key);
    if (!notice) return;
    live.delete(key);
    clearTimeout(notice.timer);
    notice.el.remove();
    notice.options.onClose?.();
}

export const hasNotice = (key: string) => live.has(key);
