/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { iconButton } from "@components/controls";
import { icon } from "@components/icons";
import { composerForm } from "@host/composer";
import { classNameFactory } from "@utils/css";
import { h, isVisible } from "@utils/dom";
import { pluralize } from "@utils/misc";

const cl = classNameFactory("bloom-queue-");

const DRAG_THRESHOLD_PX = 6;
const TRAY_GAP_PX = 8;

export interface TrayActions {
    remove(index: number): void;
    edit(index: number, text: string): void;
    sendNow(index: number): void;
    move(from: number, to: number): void;
}

let tray: HTMLElement | null = null;
let signature = "";
let collapsed = false;
let busy = false;

function tipButton(name: Parameters<typeof iconButton>[0], label: string, onClick: () => void) {
    const el = iconButton(name, label, event => {
        event.stopPropagation();
        onClick();
    });
    el.removeAttribute("title");
    el.addEventListener("mouseenter", () => setTip(label));
    el.addEventListener("mouseleave", () => setTip(""));
    return el;
}

function setTip(text: string) {
    const tip = tray?.querySelector(`.${cl("tip")}`);
    if (tip) tip.textContent = text;
}

function startEdit(row: HTMLElement, index: number, text: string, actions: TrayActions) {
    busy = true;
    const area = h("textarea", { class: `bloom-input ${cl("editor")}`, attrs: { "aria-label": "Edit queued message" } });
    area.value = text;
    const finish = (save: boolean) => {
        busy = false;
        signature = "";
        if (save) actions.edit(index, area.value);
    };
    area.addEventListener("keydown", event => {
        event.stopPropagation();
        if (event.isComposing) return;
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            finish(true);
        } else if (event.key === "Escape") {
            event.preventDefault();
            finish(false);
        }
    });
    area.addEventListener("blur", () => busy && finish(true), { once: true });
    row.querySelector(`.${cl("text")}`)?.replaceWith(area);
    area.focus();
    area.setSelectionRange(area.value.length, area.value.length);
}

function enableDrag(row: HTMLElement, index: number, actions: TrayActions) {
    row.addEventListener("pointerdown", down => {
        if (down.button !== 0 || (down.target as Element).closest("button, textarea")) return;
        const list = row.parentElement;
        if (!list) return;
        let dragging = false;
        const move = (event: PointerEvent) => {
            if (!dragging && Math.abs(event.clientY - down.clientY) < DRAG_THRESHOLD_PX) return;
            if (!dragging) {
                dragging = busy = true;
                row.classList.add(cl("dragging"));
            }
            row.style.transform = `translateY(${event.clientY - down.clientY}px)`;
        };
        const up = (event: PointerEvent) => {
            removeEventListener("pointermove", move);
            if (!dragging) return;
            busy = false;
            signature = "";
            const rows = [...list.children].filter(child => child !== row);
            const target = rows.filter(child => child.getBoundingClientRect().top + child.getBoundingClientRect().height / 2 < event.clientY).length;
            actions.move(index, target);
        };
        addEventListener("pointermove", move);
        addEventListener("pointerup", up, { once: true });
    });
}

function row(text: string, index: number, actions: TrayActions) {
    const el = h("li", { class: cl("row") },
        h("div", { class: cl("text"), text }),
        h("div", { class: cl("actions") },
            tipButton("trash", "Remove from queue", () => actions.remove(index)),
            tipButton("edit", "Edit", () => startEdit(el, index, text, actions)),
            tipButton("send", "Send now", () => actions.sendNow(index))));
    enableDrag(el, index, actions);
    return el;
}

function position(form: HTMLElement) {
    if (!tray) return;
    const box = form.getBoundingClientRect();
    tray.style.left = `${box.left}px`;
    tray.style.width = `${box.width}px`;
    tray.style.bottom = `${innerHeight - box.top + TRAY_GAP_PX}px`;
}

export function removeTray() {
    tray?.remove();
    tray = null;
    signature = "";
    busy = false;
}

export function renderTray(items: string[], actions: TrayActions) {
    const form = composerForm();
    if (!items.length || !isVisible(form)) {
        removeTray();
        return;
    }
    if (!tray) {
        tray = h("div", { class: `bloom-root ${cl("tray")}`, attrs: { "data-bloom": "queue" } },
            h("div", { class: cl("header") },
                h("button", {
                    class: cl("toggle"),
                    attrs: { type: "button" },
                    on: {
                        click: () => {
                            collapsed = !collapsed;
                            tray?.classList.toggle(cl("collapsed"), collapsed);
                        },
                    },
                }, h("span", { class: cl("count") }), icon("chevron")),
                h("span", { class: cl("tip") })),
            h("ol", { class: cl("list") }));
        tray.classList.toggle(cl("collapsed"), collapsed);
        document.body.append(tray);
    }
    position(form);
    const next = JSON.stringify(items);
    if (busy || next === signature) return;
    signature = next;
    const count = tray.querySelector(`.${cl("count")}`);
    if (count) count.textContent = pluralize(items.length, "Queued message");
    tray.querySelector(`.${cl("list")}`)?.replaceChildren(...items.map((text, index) => row(text, index, actions)));
}
