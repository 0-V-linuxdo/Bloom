/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { isTemporaryChat } from "@host/route";
import { Sel } from "@host/selectors";
import { normalizeText } from "@utils/misc";
import definePlugin, { OptionType } from "@utils/types";

const settings = definePluginSettings({
    openNewAsTemporary: { type: OptionType.BOOLEAN, description: "Open New chat as a temporary chat.", default: false },
});

const NEW_CHAT = /^(?:new chat|新聊天)$/i;

let abort: AbortController | undefined;

function destination(temporary: boolean) {
    return temporary ? "/?temporary-chat=true" : "/";
}

function go(temporary: boolean) {
    const next = destination(temporary);
    const here = `${location.pathname}${location.search}`;
    if (here === next || (temporary && isTemporaryChat() && location.pathname === "/")) return;
    location.assign(next);
}

function isNewChat(anchor: HTMLAnchorElement) {
    if (anchor.closest("[data-bloom]")) return false;
    try {
        const url = new URL(anchor.href, location.origin);
        return url.origin === location.origin && url.pathname === "/";
    } catch {
        return false;
    }
}

function isNewChatButton(button: Element) {
    if (button.closest("[data-bloom], [data-app-action-sidebar-project-row]")) return false;
    return NEW_CHAT.test(button.getAttribute("aria-label") ?? normalizeText(button.textContent ?? ""));
}

function onPointerDown(event: PointerEvent) {
    if (!settings.store.openNewAsTemporary || isTemporaryChat()) return;
    const { target } = event;
    if (!(target instanceof Element)) return;
    const control = target.closest("a[href], button");
    const newChat = control instanceof HTMLAnchorElement ? isNewChat(control) : !!control && isNewChatButton(control);
    if (!control || !newChat) return;
    if (!control.closest(`${Sel.sidebarScroll}, ${Sel.rail}, ${Sel.oldSidebar}, nav`)) return;
    event.preventDefault();
    event.stopPropagation();
    go(true);
}

function clearButtons() {
    for (const node of document.querySelectorAll('[data-bloom="temporary-chat"]')) node.remove();
}

export default definePlugin({
    name: "TemporaryChat",
    description: "Optionally open New chat as a temporary chat. No extra sidebar button.",
    authors: ["Bloom contributors"],
    tags: ["privacy", "ui"],
    icon: "ghost",
    enabledByDefault: true,
    settings,
    start() {
        clearButtons();
        abort = new AbortController();
        document.addEventListener("pointerdown", onPointerDown, { capture: true, signal: abort.signal });
    },
    stop() {
        abort?.abort();
        abort = undefined;
        clearButtons();
    },
});
