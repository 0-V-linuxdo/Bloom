/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { conversationTitle } from "@host/conversation";
import { conversationData, network } from "@host/network";
import { currentConversationId, isHomePath, isTemporaryChat, onRouteChange } from "@host/route";
import { conversationLinks, projectName } from "@host/sidebar";
import { chainSummary, listTurns, turnSummary } from "@host/thread";
import { classNameFactory } from "@utils/css";
import { h } from "@utils/dom";
import { truncate } from "@utils/misc";
import definePlugin, { OptionType } from "@utils/types";

import styles from "./styles.css";

const cl = classNameFactory("bloom-recent-");

const HOME = "home";
const MAX_VISITS = 50;
const PREVIEW_CHARS = 140;
const TRIGGER_CODES = new Set(["Backquote"]);
const TRIGGER_KEYS = new Set(["`", "~", "·", "｀", "～"]);

interface Preview {
    user?: string;
    assistant?: string;
}

const settings = definePluginSettings({
    maxRecent: {
        type: OptionType.SELECT,
        description: "How many chats the switcher lists.",
        options: ["3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map(value => ({ label: value, value })),
        default: "5",
    },
    includeHome: { type: OptionType.BOOLEAN, description: "List the New chat page as well.", default: true },
    visits: { type: OptionType.CUSTOM, default: [] as string[] },
    titles: { type: OptionType.CUSTOM, default: {} as Record<string, string> },
    previews: { type: OptionType.CUSTOM, default: {} as Record<string, Preview> },
    projects: { type: OptionType.CUSTOM, default: {} as Record<string, string> },
});

let panel: HTMLElement | null = null;
let items: string[] = [];
let selected = 0;
let controller: AbortController | undefined;
let unsubscribers: (() => void)[] = [];

const currentKey = () => isTemporaryChat() ? null : currentConversationId() ?? (isHomePath() ? HOME : null);

function prune<T>(record: Record<string, T>, keep: Set<string>) {
    return Object.fromEntries(Object.entries(record).filter(([id]) => keep.has(id)));
}

function remember(id: string) {
    const title = conversationTitle(id);
    if (title && settings.store.titles[id] !== title) settings.store.titles = { ...settings.store.titles, [id]: title };
    const project = projectName(location.href);
    if (project && id === currentConversationId() && settings.store.projects[id] !== project) settings.store.projects = { ...settings.store.projects, [id]: project };
}

function visit(key: string | null) {
    if (!key) return;
    const visits = [key, ...settings.store.visits.filter(item => item !== key)].slice(0, MAX_VISITS);
    const keep = new Set(visits);
    settings.store.visits = visits;
    if (Object.keys(settings.store.previews).some(id => !keep.has(id))) settings.store.previews = prune(settings.store.previews, keep);
    if (Object.keys(settings.store.titles).some(id => !keep.has(id))) settings.store.titles = prune(settings.store.titles, keep);
    if (key !== HOME) remember(key);
}

function capturePreview(id: string | null) {
    if (!id || !settings.store.visits.includes(id)) return;
    const preview: Preview = {};
    const chain = conversationData(id)?.chain ?? [];
    for (const message of chain) preview[message.role] = truncate(chainSummary(message), PREVIEW_CHARS);
    if (id === currentConversationId()) {
        for (const turn of listTurns()) {
            const summary = turnSummary(turn);
            if (summary) preview[turn.role] = truncate(summary, PREVIEW_CHARS);
        }
    }
    const previous = settings.store.previews[id];
    if (!preview.user && !preview.assistant) return;
    if (previous?.user === preview.user && previous?.assistant === preview.assistant) return;
    settings.store.previews = { ...settings.store.previews, [id]: preview };
}

function candidates() {
    const limit = Number(settings.store.maxRecent);
    return settings.store.visits.filter(key => key !== HOME || settings.store.includeHome).slice(0, limit);
}

function go(key: string) {
    close();
    if (key === currentKey()) return;
    const link = key === HOME
        ? document.querySelector<HTMLElement>('[data-testid="create-new-chat-button"], nav a[href="/"]')
        : conversationLinks(key)[0];
    if (link) link.click();
    else location.assign(key === HOME ? "/" : `/c/${key}`);
}

function card(key: string, index: number) {
    const title = key === HOME ? "New chat" : settings.store.titles[key] ?? conversationTitle(key) ?? "Untitled chat";
    const project = key === HOME ? null : settings.store.projects[key];
    const preview = key === HOME ? null : settings.store.previews[key];
    return h("button", {
        class: cl("item"),
        attrs: { "type": "button", "role": "option", "aria-selected": String(index === selected) },
        on: {
            click: () => go(key),
            mousemove: () => index !== selected && select(index),
        },
    },
    h("div", { class: cl("head") },
        h("span", { class: `${cl("title")} bloom-truncate`, text: title }),
        project && h("span", { class: cl("project"), text: project })),
    preview?.user && h("div", { class: `${cl("preview")} bloom-truncate`, text: `You: ${preview.user}` }),
    preview?.assistant && h("div", { class: `${cl("preview")} bloom-truncate`, text: `ChatGPT: ${preview.assistant}` }));
}

function select(index: number) {
    selected = (index + items.length) % items.length;
    panel?.querySelectorAll(`.${cl("item")}`).forEach((item, i) => item.setAttribute("aria-selected", String(i === selected)));
}

function open() {
    capturePreview(currentConversationId());
    const current = currentKey();
    items = candidates();
    if (current) items = [current, ...items.filter(key => key !== current)].slice(0, Number(settings.store.maxRecent));
    if (!items.length) return;
    selected = items.length > 1 ? 1 : 0;
    panel = h("div", { class: `bloom-root ${cl("backdrop")}`, attrs: { "data-bloom": "recent" }, on: { mousedown: event => event.target === event.currentTarget && close() } },
        h("div", { class: cl("panel"), attrs: { "role": "listbox", "aria-label": "Recent chats" } }, ...items.map(card)));
    document.body.append(panel);
}

function close() {
    panel?.remove();
    panel = null;
}

const isTrigger = (event: KeyboardEvent) => TRIGGER_CODES.has(event.code) || TRIGGER_KEYS.has(event.key);

function onKeydown(event: KeyboardEvent) {
    if (event.ctrlKey && !event.altKey && !event.metaKey && isTrigger(event)) {
        event.preventDefault();
        event.stopPropagation();
        if (!panel) open();
        else select(selected + (event.shiftKey ? -1 : 1));
        return;
    }
    if (!panel) return;
    const handled: Record<string, () => void> = {
        Escape: close,
        Enter: () => go(items[selected]),
        ArrowDown: () => select(selected + 1),
        ArrowUp: () => select(selected - 1),
    };
    const action = handled[event.key];
    if (!action) return;
    event.preventDefault();
    event.stopPropagation();
    action();
}

function onKeyup(event: KeyboardEvent) {
    if (panel && event.key === "Control") go(items[selected]);
}

export default definePlugin({
    name: "RecentTopics",
    description: "Hold Ctrl and press ` to switch between recently opened chats.",
    authors: ["Bloom contributors"],
    tags: ["chat", "ui"],
    icon: "clock",
    enabledByDefault: true,
    settings,
    styles,
    start() {
        controller = new AbortController();
        const { signal } = controller;
        addEventListener("keydown", onKeydown, { capture: true, signal });
        addEventListener("keyup", onKeyup, { capture: true, signal });
        addEventListener("blur", close, { signal });
        document.addEventListener("visibilitychange", () => document.hidden && capturePreview(currentConversationId()), { signal });
        unsubscribers = [
            onRouteChange(({ prevId }) => {
                capturePreview(prevId);
                visit(currentKey());
            }),
            network.on("conversation", ({ id }) => {
                if (settings.store.visits.includes(id)) remember(id);
                capturePreview(id);
            }),
        ];
        const { visits, titles, previews } = settings.store;
        const stale = visits.filter(key => key !== HOME && (key.startsWith("local-") || !(titles[key] || previews[key])));
        if (stale.length) settings.store.visits = visits.filter(key => !stale.includes(key));
        visit(currentKey());
    },
    stop() {
        controller?.abort();
        for (const unsubscribe of unsubscribers) unsubscribe();
        close();
    },
});
