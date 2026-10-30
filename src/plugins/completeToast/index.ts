/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { closeNotice, showNotice } from "@api/Notices";
import { definePluginSettings } from "@api/Settings";
import { conversationTitle } from "@host/conversation";
import { generation } from "@host/generation";
import { onRouteChange } from "@host/route";
import { conversationLinks } from "@host/sidebar";
import definePlugin, { OptionType } from "@utils/types";

const KEY = "complete-toast";
const MS_PER_SECOND = 1000;

const settings = definePluginSettings({
    keepUntilDismissed: { type: OptionType.BOOLEAN, description: "Don't auto-close the toast. Dismiss with ×, or by opening the chat.", default: false },
    duration: { type: OptionType.SLIDER, description: "Seconds before the toast closes. Ignored when Keep Until Dismissed is on.", min: 0, max: 20, default: 6, unit: "s" },
});

let shownId: string | null = null;
let unsubscribers: (() => void)[] = [];

function open(id: string) {
    const link = conversationLinks(id)[0];
    if (link) link.click();
    else location.assign(`/c/${id}`);
}

function show(id: string) {
    shownId = id;
    showNotice({
        key: KEY,
        title: conversationTitle(id) ?? "ChatGPT",
        message: "Response ready",
        type: "success",
        onClick: () => open(id),
        onClose: () => {
            shownId = null;
        },
        duration: settings.store.keepUntilDismissed ? 0 : settings.store.duration * MS_PER_SECOND,
    });
}

export default definePlugin({
    name: "CompleteToast",
    description: "Show a toast when a chat you left finishes answering. Click it to open that chat.",
    authors: ["Bloom contributors"],
    tags: ["chat"],
    icon: "check",
    enabledByDefault: true,
    settings,
    start() {
        unsubscribers = [
            generation.on("background", ({ conversationId }) => show(conversationId)),
            onRouteChange(({ id }) => id === shownId && closeNotice(KEY)),
        ];
    },
    stop() {
        for (const unsubscribe of unsubscribers) unsubscribe();
        unsubscribers = [];
        closeNotice(KEY);
    },
});
