/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { composerForm } from "@host/composer";
import { isHydrated, whenBody } from "@host/ready";
import { Sel } from "@host/selectors";
import { h, hostMutations, isVisible, watchBody } from "@utils/dom";
import definePlugin, { OptionType, StartAt } from "@utils/types";

const FORM = `form:has(:is(${Sel.composerInput})), ${Sel.oldComposerForm}`;
const LAYOUT_BODY = '[class*="ComposerLayoutBody"]';
const LAYOUT_ROOT = '[class*="ComposerLayoutRoot"]';
const LEGACY_PILL = '[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]';
const PILL = `:is(${FORM}) ${LAYOUT_BODY}, :is(${FORM}):not(:has(${LAYOUT_BODY})) ${LAYOUT_ROOT}, :is(${FORM}):not(:has(${LAYOUT_BODY})):not(:has(${LAYOUT_ROOT})) :is(${LEGACY_PILL})`;
const SLAB = '#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])';
const FADE = '#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]';
const FILL = "var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))";
const APP_SHELL = '[data-chatgpt-composer], [data-composer-input], [data-composer-layout], [class*="ComposerLayoutRoot"], [class*="ComposerLayoutBody"]';
const MARK = "composer-fill";

const settings = definePluginSettings({
    opacity: { type: OptionType.SLIDER, description: "Composer background opacity. 100 keeps ChatGPT's own fill.", min: 0, max: 100, default: 100, unit: "%" },
    blur: { type: OptionType.SLIDER, description: "Backdrop blur, used when opacity is below 100.", min: 0, max: 40, default: 16, unit: "px" },
});

function css() {
    const { opacity, blur } = settings.store;
    if (opacity >= 100) return "";
    const fill = BLOOM_APP
        ? "var(--composer-background-color, var(--color-background-composer-surface, var(--color-bg-primary, Canvas)))"
        : FILL;
    const clear = "background-color:transparent!important;background-image:none!important;box-shadow:none!important";
    const paint = `background-color:color-mix(in srgb, ${fill} ${opacity}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${blur}px)!important;-webkit-backdrop-filter:blur(${blur}px)!important`;
    if (BLOOM_APP) {
        return `${APP_SHELL}{${clear}}`
            + `[data-bloom="${MARK}"]{position:absolute;pointer-events:none;z-index:-1;`
            + `background-color:color-mix(in srgb, ${fill} ${opacity}%, transparent);background-image:none;`
            + `backdrop-filter:blur(${blur}px);-webkit-backdrop-filter:blur(${blur}px)}`;
    }
    const bareRoot = "background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important";
    return `:is(${SLAB}), :is(${FORM}){${clear}}`
        + `:is(${FADE}){display:none!important}`
        + `${PILL}{${paint}}`
        + `:is(${FORM}):has(${LAYOUT_BODY}) ${LAYOUT_ROOT}{${bareRoot}}`
        + `:is(${FORM}) :is(${Sel.composerInput}){background-color:transparent!important}`;
}

function hosts() {
    const roots = [...document.querySelectorAll<HTMLElement>(LAYOUT_ROOT)].filter(isVisible);
    if (roots.length) return roots;
    const form = composerForm();
    return form ? [form] : [];
}

function pillRect(host: HTMLElement) {
    const pieces = [...host.querySelectorAll<HTMLElement>('[class*="ComposerLayoutInput"]')]
        .filter(el => isVisible(el) && el.getBoundingClientRect().height >= 8);
    let top = Infinity, left = Infinity, right = -Infinity, bottom = -Infinity;
    for (const el of pieces.length ? pieces : [host]) {
        const box = el.getBoundingClientRect();
        top = Math.min(top, box.top);
        left = Math.min(left, box.left);
        right = Math.max(right, box.right);
        bottom = Math.max(bottom, box.bottom);
    }
    return { top, left, width: right - left, height: bottom - top };
}

function place(fill: HTMLElement, host: HTMLElement) {
    const origin = host.getBoundingClientRect();
    const box = pillRect(host);
    fill.style.top = `${box.top - origin.top}px`;
    fill.style.left = `${box.left - origin.left}px`;
    fill.style.width = `${Math.max(0, Math.min(box.width, origin.width || box.width))}px`;
    fill.style.height = `${Math.max(0, box.height)}px`;
    const radius = piecesRadius(host);
    if (radius) fill.style.borderRadius = radius;
}

function piecesRadius(host: HTMLElement) {
    const el = host.querySelector<HTMLElement>('[class*="ComposerLayoutInput"]') ?? host;
    const radius = getComputedStyle(el).borderRadius;
    return radius && radius !== "0px" ? radius : getComputedStyle(host).borderRadius;
}

function sync(mutations: MutationRecord[] = []) {
    if (mutations.length && !hostMutations(mutations)) return;
    if (!BLOOM_APP || settings.store.opacity >= 100) {
        for (const node of document.querySelectorAll(`[data-bloom="${MARK}"]`)) node.remove();
        return;
    }
    const keep = new Set<Element>();
    for (const host of hosts()) {
        if (!isHydrated(host)) continue;
        let fill = host.querySelector<HTMLElement>(`:scope > [data-bloom="${MARK}"]`);
        if (!fill) {
            fill = h("div", { attrs: { "data-bloom": MARK } });
            host.prepend(fill);
        }
        place(fill, host);
        keep.add(fill);
    }
    for (const node of document.querySelectorAll(`[data-bloom="${MARK}"]`)) if (!keep.has(node)) node.remove();
}

let unwatch: (() => void) | undefined;
let active = false;

export default definePlugin({
    name: "ComposerOpacity",
    description: "Make the composer see-through with a blur, so the thread shows behind it.",
    authors: ["Bloom contributors"],
    tags: ["ui", "chat"],
    icon: "layout",
    enabledByDefault: true,
    startAt: StartAt.Init,
    settings,
    styles: css,
    start() {
        active = true;
        void whenBody().then(() => {
            if (active && !unwatch) unwatch = watchBody(sync);
        });
    },
    stop() {
        active = false;
        unwatch?.();
        unwatch = undefined;
        for (const node of document.querySelectorAll(`[data-bloom="${MARK}"]`)) node.remove();
    },
    onSettingsChange() {
        sync();
    },
});
