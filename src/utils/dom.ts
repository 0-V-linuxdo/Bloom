/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Logger } from "./Logger";

const logger = new Logger("Dom");

type Child = Node | string | null | undefined | false;

export interface ElementProps {
    class?: string;
    text?: string;
    title?: string;
    attrs?: Record<string, string>;
    on?: Partial<{ [K in keyof HTMLElementEventMap]: (event: HTMLElementEventMap[K]) => void }>;
}

export function h<K extends keyof HTMLElementTagNameMap>(tag: K, props: ElementProps = {}, ...children: Child[]) {
    const el = document.createElement(tag);
    if (props.class) el.className = props.class;
    if (props.text != null) el.textContent = props.text;
    if (props.title) el.title = props.title;
    for (const [name, value] of Object.entries(props.attrs ?? {})) el.setAttribute(name, value);
    for (const [type, handler] of Object.entries(props.on ?? {})) el.addEventListener(type, handler as EventListener);
    for (const child of children) if (child) el.append(child);
    return el;
}

const svgTemplate = document.createElement("template");

export function svg(markup: string) {
    svgTemplate.innerHTML = markup.trim();
    return svgTemplate.content.firstElementChild!.cloneNode(true) as SVGSVGElement;
}

export const isVisible = (el: Element | null | undefined): el is HTMLElement =>
    el instanceof HTMLElement && el.isConnected && el.getClientRects().length > 0 && !el.closest("[inert]");

export const visible = <T extends Element>(selector: string, root: ParentNode = document) =>
    [...root.querySelectorAll<T>(selector)].find(isVisible) ?? null;

const HIDDEN_FRAME_MS = 16;

export function nextFrame(fn: () => void) {
    if (document.hidden) setTimeout(fn, HIDDEN_FRAME_MS);
    else requestAnimationFrame(fn);
}

export function frameScheduler(fn: () => void) {
    let queued = false;
    return () => {
        if (queued) return;
        queued = true;
        nextFrame(() => {
            queued = false;
            try {
                fn();
            } catch (e) {
                logger.error("Scheduled task failed", e);
            }
        });
    };
}

type Watcher = (mutations: MutationRecord[]) => void;

const watchers = new Set<Watcher>();
let pending: MutationRecord[] = [];
let bodyObserver: MutationObserver | undefined;

const flushWatchers = frameScheduler(() => {
    const batch = pending;
    pending = [];
    for (const watcher of watchers) watcher(batch);
});

export function watchBody(watcher: Watcher) {
    watchers.add(watcher);
    if (!bodyObserver) {
        bodyObserver = new MutationObserver(mutations => {
            pending.push(...mutations);
            flushWatchers();
        });
        bodyObserver.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["inert", "src", "aria-busy", "data-testid", "aria-label", "data-state", "hidden"],
        });
    }
    watcher([]);
    return () => {
        watchers.delete(watcher);
        if (watchers.size) return;
        bodyObserver?.disconnect();
        bodyObserver = undefined;
        pending = [];
    };
}

export const ownNode = (node: Node) => node instanceof Element && (node.hasAttribute("data-bloom") || !!node.closest("[data-bloom]"));

export const hostMutations = (mutations: MutationRecord[]) => !mutations.length || mutations.some(m => !ownNode(m.target));

export function overlayText(el: HTMLElement, text: string | null) {
    if (text == null) {
        el.removeAttribute("data-bloom-text");
        el.style.removeProperty("--bloom-text-size");
        return;
    }
    if (el.getAttribute("data-bloom-text") === text) return;
    if (!el.hasAttribute("data-bloom-text")) el.style.setProperty("--bloom-text-size", getComputedStyle(el).fontSize);
    el.setAttribute("data-bloom-text", text);
}
