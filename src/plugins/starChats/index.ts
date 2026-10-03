/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { icon } from "@components/icons";
import { isHydrated } from "@host/ready";
import { currentConversationId, isTemporaryChat } from "@host/route";
import { Sel } from "@host/selectors";
import { listTurns, type Turn, turnSummary } from "@host/thread";
import { classNameFactory } from "@utils/css";
import { h, hostMutations, watchBody } from "@utils/dom";
import { isRecord, normalizeText, truncate } from "@utils/misc";
import definePlugin, { OptionType } from "@utils/types";

import styles from "./styles.css";

const cl = classNameFactory("bloom-star-chats");
const MAX = 80;
const SNIPPET = 60;
const FLASH_MS = 1200;
const HOVER_OPEN_MS = 120;
const HOVER_CLOSE_MS = 180;

interface StarredMessage {
    conversationId: string;
    messageId: string;
    role: "user" | "assistant";
    snippet: string;
    starredAt: number;
}

const settings = definePluginSettings({
    messages: { type: OptionType.CUSTOM, default: [] as StarredMessage[] },
});

let unwatch: (() => void) | undefined;
let painting = false;
let listOpen = false;
let hoverOpen = false;
let hoverTimer = 0;
let panel: HTMLElement | null = null;
let panelKey = "";
let toggleBtn: HTMLButtonElement | null = null;
let outside: (() => void) | undefined;

function messages(): StarredMessage[] {
    const value: unknown = settings.store.messages;
    if (!Array.isArray(value)) return [];
    return value.filter((item): item is StarredMessage =>
        isRecord(item)
        && typeof item.conversationId === "string"
        && typeof item.messageId === "string"
        && (item.role === "user" || item.role === "assistant")
        && typeof item.snippet === "string"
        && typeof item.starredAt === "number");
}

function mine(): StarredMessage[] {
    const id = currentConversationId();
    if (!id) return [];
    return messages().filter(item => item.conversationId === id);
}

function hasStar(conversationId: string, messageId: string) {
    return messages().some(item => item.conversationId === conversationId && item.messageId === messageId);
}

function toggleStar(item: Omit<StarredMessage, "starredAt">) {
    const current = messages();
    const on = current.some(star => star.conversationId === item.conversationId && star.messageId === item.messageId);
    settings.store.messages = on
        ? current.filter(star => !(star.conversationId === item.conversationId && star.messageId === item.messageId))
        : [{ ...item, starredAt: Date.now() }, ...current].slice(0, MAX);
}

function messageIdOf(turn: Turn) {
    return turn.messageIds[0]
        || turn.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")
        || turn.el.getAttribute("data-turn-key")
        || "";
}

function snippetOf(turn: Turn) {
    return truncate(turnSummary(turn) || normalizeText(turn.el.textContent ?? ""), SNIPPET);
}

function turnFor(bar: HTMLElement) {
    const host = bar.closest<HTMLElement>(Sel.turn);
    if (!host) return null;
    return listTurns().find(turn => host.contains(turn.el) && (turn.el.contains(bar) || turn.el === host)) ?? null;
}

function actionBars() {
    return [...document.querySelectorAll<HTMLElement>(".turn-action-controls")].filter(bar =>
        !bar.closest(`[data-bloom], [role="dialog"], [inert], pre, ${Sel.sidebars}`));
}

function headerKebab() {
    const buttons = [...document.querySelectorAll<HTMLButtonElement>(Sel.headerMore)].filter(button => {
        if (button.dataset.bloom === "message-star" || button.closest("[data-bloom], [role='dialog'], [inert]")) return false;
        if (button.closest(Sel.sidebars)) return false;
        const box = button.getBoundingClientRect();
        if (box.width === 0 && box.height === 0) return !!button.closest("header, #page-header");
        return box.top >= 0 && box.top < 96 && box.left > window.innerWidth * 0.5;
    });
    return buttons.toSorted((a, b) => b.getBoundingClientRect().left - a.getBoundingClientRect().left || ((a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) ? 1 : -1))[0] ?? null;
}

function starIconButton(label: string, className: string, onClick: (event: MouseEvent) => void) {
    return h("button", {
        class: className,
        attrs: { "type": "button", "aria-label": label },
        on: {
            pointerdown: event => event.stopPropagation(),
            mousedown: event => event.stopPropagation(),
            click: event => {
                event.preventDefault();
                event.stopPropagation();
                onClick(event);
            },
        },
    }, icon("star"));
}

function setPressed(button: HTMLButtonElement, pressed: boolean) {
    button.setAttribute("aria-pressed", String(pressed));
    button.setAttribute("aria-label", pressed ? "Unstar" : "Star");
}

function listVisible() {
    return listOpen || hoverOpen;
}

function clearHover() {
    if (hoverTimer) window.clearTimeout(hoverTimer);
    hoverTimer = 0;
}

function closeList() {
    listOpen = false;
    hoverOpen = false;
    clearHover();
    panel?.remove();
    panel = null;
    panelKey = "";
    toggleBtn?.classList.remove(cl("-open"));
    toggleBtn?.setAttribute("aria-expanded", "false");
}

function overChrome(node: EventTarget | null) {
    return node instanceof Node && !!(toggleBtn?.contains(node) || panel?.contains(node));
}

function flash(el: HTMLElement) {
    el.classList.add(cl("-flash"));
    window.setTimeout(() => el.classList.remove(cl("-flash")), FLASH_MS);
}

function jumpTo(messageId: string) {
    const turn = listTurns().find(item => messageIdOf(item) === messageId);
    const el = turn?.el.closest<HTMLElement>(Sel.turn) ?? turn?.el;
    if (!el) return;
    el.scrollIntoView({ block: "start" });
    flash(el);
}

function paintActions() {
    const id = currentConversationId();
    const kept = new Set<HTMLButtonElement>();
    const existing = [...document.querySelectorAll<HTMLButtonElement>('[data-bloom="message-star"][data-place="action"]')];
    if (!id || isTemporaryChat()) {
        for (const button of existing) button.remove();
        return;
    }
    for (const bar of actionBars()) {
        if (!isHydrated(bar)) continue;
        const turn = turnFor(bar);
        const messageId = turn ? messageIdOf(turn) : "";
        if (!turn || !messageId) continue;
        let button = bar.querySelector<HTMLButtonElement>('[data-place="action"]');
        if (!button || button.dataset.id !== messageId) {
            button?.remove();
            button = starIconButton("Star", cl("-star"), () => {
                const cid = currentConversationId();
                const live = listTurns().find(item => messageIdOf(item) === messageId);
                if (!cid || !live) return;
                toggleStar({ conversationId: cid, messageId, role: live.role, snippet: snippetOf(live) });
            });
            button.dataset.bloom = "message-star";
            button.dataset.place = "action";
            button.dataset.id = messageId;
        }
        setPressed(button, hasStar(id, messageId));
        if (button.parentElement !== bar) bar.append(button);
        kept.add(button);
    }
    for (const button of existing) if (!kept.has(button)) button.remove();
}

function placePanel() {
    if (!panel || !toggleBtn) return;
    const anchor = toggleBtn.getBoundingClientRect();
    const width = panel.offsetWidth || 288;
    const height = panel.offsetHeight || 120;
    let top = anchor.bottom + 6;
    if (top + height > window.innerHeight - 8) top = Math.max(8, anchor.top - height - 6);
    const left = Math.max(8, Math.min(anchor.right - width, window.innerWidth - width - 8));
    panel.style.left = `${Math.round(left)}px`;
    panel.style.top = `${Math.round(top)}px`;
}

function paintPanel() {
    if (!listVisible() || !toggleBtn) {
        panel?.remove();
        panel = null;
        panelKey = "";
        toggleBtn?.classList.remove(cl("-open"));
        toggleBtn?.setAttribute("aria-expanded", "false");
        return;
    }
    const items = mine();
    const key = items.map(item => `${item.messageId}\t${item.snippet}`).join("\n");
    if (!panel || panelKey !== key) {
        panel?.remove();
        const rows = items.map(item => h("div", { class: cl("-row") },
            h("button", {
                class: cl("-jump"),
                attrs: { "type": "button" },
                on: {
                    click: event => {
                        event.preventDefault();
                        event.stopPropagation();
                        closeList();
                        jumpTo(item.messageId);
                    },
                },
            }, h("span", { class: cl("-role"), text: item.role === "user" ? "You" : "ChatGPT" }), h("span", { class: cl("-snip"), text: item.snippet || "Message" })),
            starIconButton("Unstar", cl("-unstar"), () => toggleStar(item)),
        ));
        panel = h("div", {
            class: `bloom-root ${cl("-panel")}`,
            attrs: { "data-bloom": "star-list" },
            on: {
                pointerenter: () => {
                    clearHover();
                    hoverOpen = true;
                },
                pointerleave: event => {
                    if (overChrome(event.relatedTarget) || listOpen) return;
                    clearHover();
                    hoverTimer = window.setTimeout(() => {
                        hoverOpen = false;
                        render();
                    }, HOVER_CLOSE_MS);
                },
            },
        }, h("div", { class: cl("-head"), text: "Starred" }), ...(rows.length ? rows : [h("div", { class: cl("-empty"), text: "No starred messages in this chat" })]));
        document.body.append(panel);
        panelKey = key;
    }
    placePanel();
    toggleBtn.classList.add(cl("-open"));
    toggleBtn.setAttribute("aria-expanded", "true");
}

function paintHeader() {
    for (const stray of document.querySelectorAll('[data-bloom="starred"]')) stray.remove();
    const host = headerKebab();
    const parent = host?.parentElement ?? null;
    const id = currentConversationId();
    if (!host || !parent || parent.closest(Sel.sidebars) || !id || isTemporaryChat() || !isHydrated(parent)) {
        toggleBtn?.remove();
        toggleBtn = null;
        closeList();
        return;
    }
    if (!toggleBtn) {
        toggleBtn = h("button", {
            class: cl("-toggle"),
            attrs: {
                "type": "button",
                "data-bloom": "message-star",
                "data-place": "header",
                "aria-label": "Starred messages",
                "aria-expanded": "false",
            },
            on: {
                pointerdown: event => event.stopPropagation(),
                pointerenter: () => {
                    clearHover();
                    hoverTimer = window.setTimeout(() => {
                        hoverOpen = true;
                        render();
                    }, HOVER_OPEN_MS);
                },
                pointerleave: event => {
                    if (overChrome(event.relatedTarget)) return;
                    clearHover();
                    hoverTimer = window.setTimeout(() => {
                        hoverOpen = false;
                        if (!listOpen) render();
                    }, HOVER_CLOSE_MS);
                },
                click: event => {
                    event.preventDefault();
                    event.stopPropagation();
                    listOpen = !listOpen;
                    hoverOpen = listOpen;
                    clearHover();
                    if (!listOpen) closeList();
                    render();
                },
            },
        }, icon("star"));
    }
    if (toggleBtn.parentElement !== parent || toggleBtn.nextElementSibling !== host) host.before(toggleBtn);
    const box = host.getBoundingClientRect();
    if (box.width > 0) {
        toggleBtn.style.width = `${box.width}px`;
        toggleBtn.style.height = `${box.height}px`;
    }
    toggleBtn.classList.toggle(cl("-here"), mine().length > 0);
    paintPanel();
}

function paintMarks() {
    const ids = new Set(mine().map(item => item.messageId));
    for (const tick of document.querySelectorAll<HTMLElement>('[data-bloom="navigator"] .bloom-nav-tick, [data-bloom="navigator"] .bloom-nav-row')) {
        tick.classList.toggle(cl("-mark"), !!tick.dataset.messageId && ids.has(tick.dataset.messageId));
    }
}

function render() {
    if (painting) return;
    painting = true;
    try {
        for (const node of document.querySelectorAll('[data-bloom="starred"], [data-bloom="chat-star"]')) node.remove();
        paintActions();
        paintHeader();
        paintMarks();
    } finally {
        painting = false;
    }
}

function clear() {
    closeList();
    toggleBtn?.remove();
    toggleBtn = null;
    for (const node of document.querySelectorAll('[data-bloom="message-star"], [data-bloom="star-list"], [data-bloom="starred"], [data-bloom="chat-star"]')) node.remove();
    for (const tick of document.querySelectorAll(`.${cl("-mark")}`)) tick.classList.remove(cl("-mark"));
}

export default definePlugin({
    name: "StarChats",
    description: "Star a message from its toolbar. The star left of the top-right menu opens this chat's list.",
    authors: ["Bloom contributors"],
    tags: ["chat", "ui"],
    icon: "star",
    enabledByDefault: true,
    settings,
    styles,
    onSettingsChange(key) {
        if (key === "messages") render();
    },
    start() {
        unwatch = watchBody(mutations => hostMutations(mutations) && render());
        const onPointerDown = (event: PointerEvent) => {
            if (overChrome(event.target)) return;
            if (!listVisible()) return;
            closeList();
        };
        document.addEventListener("pointerdown", onPointerDown, true);
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key !== "Escape" || !listVisible()) return;
            event.preventDefault();
            closeList();
        };
        document.addEventListener("keydown", onKeyDown, true);
        outside = () => {
            document.removeEventListener("pointerdown", onPointerDown, true);
            document.removeEventListener("keydown", onKeyDown, true);
        };
        render();
    },
    stop() {
        unwatch?.();
        unwatch = undefined;
        outside?.();
        outside = undefined;
        clearHover();
        clear();
    },
});
