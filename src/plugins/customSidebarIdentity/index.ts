/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { useIdentityMarks } from "@host/identity";
import { Sel } from "@host/selectors";
import { hostMutations, overlayText, watchBody } from "@utils/dom";
import definePlugin, { OptionType } from "@utils/types";

import { avatarCropper } from "./cropper";
import styles from "./styles.css";

const AVATAR = "data-bloom-csi-avatar";
const SIZED = "data-bloom-csi-sized";
const NAMED = "[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])";

export const settings = definePluginSettings({
    displayName: { type: OptionType.STRING, description: "Name shown in the sidebar. Leave empty to keep yours.", default: "", placeholder: "Display name" },
    avatarSize: { type: OptionType.SLIDER, description: "Avatar size in the expanded sidebar.", min: 24, max: 64, default: 40, unit: "px" },
    applyToMenu: { type: OptionType.BOOLEAN, description: "Also use them at the top of the account menu.", default: true },
    cropper: { type: OptionType.COMPONENT, description: "Paste, drop or choose an image, then drag and zoom to crop it.", render: host => avatarCropper(host) },
    avatarUrl: { type: OptionType.CUSTOM, default: "" },
    avatarSource: { type: OptionType.CUSTOM, default: "" },
    cropX: { type: OptionType.CUSTOM, default: 0.5 },
    cropY: { type: OptionType.CUSTOM, default: 0.5 },
    cropZoom: { type: OptionType.CUSTOM, default: 1 },
});

let unsubscribers: (() => void)[] = [];

function unmark(el: Element) {
    el.removeAttribute(AVATAR);
    el.removeAttribute(SIZED);
}

function targets(kind: "avatar" | "name") {
    const scopes = settings.store.applyToMenu ? ["profile", "menu"] : ["profile"];
    return scopes.flatMap(scope => [...document.querySelectorAll<HTMLElement>(`[data-bloom-${scope}-${kind}]`)]);
}

function apply(mutations: MutationRecord[] = []) {
    if (!hostMutations(mutations)) return;
    const name = settings.store.displayName.trim() || null;
    const avatar = !!settings.store.avatarUrl;
    const names = new Set(name ? targets("name") : []);
    for (const el of document.querySelectorAll<HTMLElement>(NAMED)) if (!names.has(el)) overlayText(el, null);
    for (const el of names) overlayText(el, name);
    const wanted = new Set(avatar ? targets("avatar") : []);
    for (const el of document.querySelectorAll(`[${AVATAR}]`)) if (!wanted.has(el as HTMLElement)) unmark(el);
    for (const el of wanted) {
        if (!el.hasAttribute(AVATAR)) el.setAttribute(AVATAR, "");
        el.toggleAttribute(SIZED, !el.closest(`${Sel.rail}, ${Sel.oldRail}, [role="menu"]`));
    }
}

function css() {
    const url = settings.store.avatarUrl;
    return url ? `:root{--bloom-csi-url:url("${url.replaceAll(/["\\\n]/g, "")}");--bloom-csi-size:${settings.store.avatarSize}px}` : "";
}

export default definePlugin({
    name: "CustomSidebarIdentity",
    description: "Use your own avatar and display name in the sidebar. Only you see it.",
    authors: ["Bloom contributors"],
    tags: ["ui"],
    icon: "user",
    settings,
    styles: () => `${css()}\n${styles}`,
    start() {
        unsubscribers = [useIdentityMarks(), watchBody(apply)];
    },
    stop() {
        for (const unsubscribe of unsubscribers) unsubscribe();
        for (const el of document.querySelectorAll(`[${AVATAR}]`)) unmark(el);
        for (const el of document.querySelectorAll<HTMLElement>(NAMED)) overlayText(el, null);
    },
    onSettingsChange() {
        apply();
    },
});
