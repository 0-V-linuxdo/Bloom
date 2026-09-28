/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

const { shell } = document.documentElement.dataset;
const ids = () => `${crypto.randomUUID()}`;
const input = () => document.querySelector(shell === "new" ? 'textarea[name="prompt"]' : "#prompt-textarea");
const thread = () => document.querySelector(shell === "new" ? "[data-chatgpt-conversation-selection-target]" : "#thread");
const form = () => input().closest("form");
let controller = null;

function readInput() {
    return shell === "new" ? input().value.trim() : input().textContent.trim();
}

function clearInput() {
    if (shell === "new") input().value = "";
    else input().replaceChildren(document.createElement("p"));
}

function turn(role, text, messageId) {
    if (shell === "new") {
        const el = document.createElement("div");
        el.dataset.turnKey = messageId;
        const unit = document.createElement("div");
        unit.dataset.chatgptSearchMessageIds = messageId;
        const body = document.createElement("div");
        body.className = role === "user" ? "whitespace-pre-wrap" : "markdown";
        body.textContent = text;
        unit.append(body);
        el.append(unit);
        return el;
    }
    const el = document.createElement("article");
    el.dataset.testid = `conversation-turn-${thread().children.length + 1}`;
    el.dataset.turn = role;
    const unit = document.createElement("div");
    unit.dataset.messageAuthorRole = role;
    unit.dataset.messageId = messageId;
    unit.innerHTML = `<div class="${role === "user" ? "whitespace-pre-wrap" : "markdown"}"></div>`;
    unit.firstElementChild.textContent = text;
    el.append(unit);
    return el;
}

function setButton(stop) {
    const button = form().querySelector("button");
    button.dataset.testid = stop ? "stop-button" : "send-button";
    button.setAttribute("aria-label", stop ? "Stop streaming" : "Send prompt");
    button.textContent = stop ? "Stop" : "Send";
}

function currentId() {
    return location.pathname.match(/\/c\/([\w-]+)/)?.[1] ?? null;
}

function addSidebarLink(id, title) {
    const list = document.querySelector("[data-app-action-sidebar-scroll], #stage-slideover-sidebar nav");
    const link = document.createElement("a");
    link.href = `/c/${id}`;
    link.textContent = title;
    list.prepend(link);
}

async function send() {
    const text = readInput();
    if (!text || controller) return;
    clearInput();
    let id = currentId();
    const userId = ids();
    const assistantId = ids();
    thread().append(turn("user", text, userId));
    const reply = turn("assistant", "", assistantId);
    thread().append(reply);
    setButton(true);
    controller = new AbortController();
    try {
        const pending = fetch("/backend-api/f/conversation", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ conversation_id: id, messages: [{ id: userId, content: { parts: [text] } }], reply_id: assistantId }),
            signal: controller.signal,
        });
        if (!id) {
            id = ids();
            await new Promise(resolve => setTimeout(resolve, 100));
            history.pushState(null, "", `/c/${id}`);
            addSidebarLink(id, text.slice(0, 30));
        }
        const response = await pending;
        const body = await response.text();
        const answer = body.split("\n").filter(line => line.startsWith("data: {")).map(line => JSON.parse(line.slice(6))).map(event => event.v?.message?.content?.parts?.[0] ?? "").join("");
        reply.querySelector(".markdown").textContent = answer || "Done.";
        const actions = document.createElement("div");
        actions.className = "turn-action-controls";
        actions.innerHTML = '<button data-testid="copy-turn-action-button">Copy</button>';
        reply.append(actions);
    } catch (error) {
        reply.querySelector(".markdown").textContent = error.name === "AbortError" ? "Stopped." : "Error.";
    } finally {
        controller = null;
        setButton(false);
    }
}

document.addEventListener("keydown", event => {
    if (event.key === "Enter" && !event.shiftKey && event.target === input()) {
        event.preventDefault();
        void send();
    }
});

document.addEventListener("click", event => {
    const button = event.target.closest("form button");
    if (button) {
        event.preventDefault();
        if (button.dataset.testid === "stop-button") controller?.abort();
        else void send();
        return;
    }
    const link = event.target.closest("a[href]");
    if (!link || link.origin !== location.origin) return;
    event.preventDefault();
    history.pushState(null, "", link.pathname);
    void openConversation();
});

async function openConversation() {
    thread().replaceChildren();
    const id = currentId();
    if (!id) return;
    const response = await fetch(`/backend-api/conversation/${id}`);
    const data = await response.json();
    let node = data.current_node;
    const chain = [];
    while (node) {
        const { message, parent } = data.mapping[node];
        if (message && message.author.role !== "system") chain.unshift(message);
        node = parent;
    }
    for (const message of chain) thread().append(turn(message.author.role, message.content.parts[0], message.id));
}

void openConversation();
