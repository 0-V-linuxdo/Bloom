/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

const { shell } = document.documentElement.dataset;
const live = shell === "new";
const ids = () => `${crypto.randomUUID()}`;
const input = () => document.querySelector("form .ProseMirror");
const thread = () => document.querySelector(live ? "[data-chatgpt-conversation-selection-target]" : "#thread");
const button = () => document.querySelector("form button:last-of-type");
const pending = new Map();
let current = null;
let socket = null;

function readInput() {
    return input().textContent.trim();
}

function clearInput() {
    input().replaceChildren(document.createElement("p"));
}

function unit(role, text, messageId, key) {
    const el = document.createElement("div");
    if (live) {
        el.dataset.chatgptSearchUnitKey = `${key}:${role}`;
        el.dataset.chatgptSearchMessageIds = messageId;
    } else {
        el.dataset.messageAuthorRole = role;
        el.dataset.messageId = messageId;
    }
    const body = document.createElement("div");
    body.className = role === "user" ? "whitespace-pre-wrap" : "markdown";
    body.textContent = text;
    el.append(body);
    return el;
}

function turn(pair) {
    if (live) {
        const key = ids();
        const el = document.createElement("div");
        el.dataset.turnKey = key;
        for (const [role, text, id] of pair) el.append(unit(role, text, id, key));
        return [el];
    }
    return pair.map(([role, text, id]) => {
        const el = document.createElement("article");
        el.dataset.testid = `conversation-turn-${thread().children.length + 1}`;
        el.dataset.turn = role;
        el.append(unit(role, text, id));
        return el;
    });
}

function setButton(stop) {
    if (live) {
        button().setAttribute("aria-label", stop ? "Stop" : "Send");
    } else {
        button().dataset.testid = stop ? "stop-button" : "send-button";
        button().setAttribute("aria-label", stop ? "Stop streaming" : "Send prompt");
    }
    button().textContent = stop ? "Stop" : "Send";
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

function openSocket() {
    if (socket) return socket;
    socket = new WebSocket("wss://chatgpt.com/ws/mock");
    socket.addEventListener("message", event => {
        const { replyId, text } = JSON.parse(event.data);
        pending.get(replyId)?.(text);
    });
    return new Promise(resolve => socket.addEventListener("open", () => resolve(socket), { once: true }));
}

function finish(reply, text) {
    reply.querySelector("[role=status]")?.remove();
    reply.querySelector(".markdown").textContent = text;
    const actions = document.createElement("div");
    actions.className = "turn-action-controls";
    actions.innerHTML = '<button data-testid="copy-turn-action-button">Copy</button>';
    reply.append(actions);
}

function interrupt(reason) {
    if (!current) return;
    const { reply, replyId } = current;
    pending.delete(replyId);
    current = null;
    finish(reply, reason);
    setButton(false);
}

async function relay(body) {
    const controller = new AbortController();
    const response = await fetch("/backend-api/f/conversation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
    });
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let text = "";
    for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        if (text.includes("data: [DONE]")) break;
    }
    controller.abort();
}

async function sendOld(text, userId, replyId) {
    const controller = new AbortController();
    const reply = thread().lastElementChild;
    current = { reply, replyId, controller };
    try {
        const response = await fetch("/backend-api/f/conversation", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ conversation_id: currentId(), messages: [{ id: userId, content: { parts: [text] } }], reply_id: replyId }),
            signal: controller.signal,
        });
        const body = await response.text();
        const answer = body.split("\n").filter(line => line.startsWith("data: {")).map(line => JSON.parse(line.slice(6))).map(event => event.v?.message?.content?.parts?.[0] ?? "").join("");
        finish(reply, answer || "Done.");
    } catch (error) {
        finish(reply, error.name === "AbortError" ? "Stopped." : "Error.");
    } finally {
        current = null;
        setButton(false);
    }
}

async function send() {
    const text = readInput();
    if (!text) return;
    if (current && !live) return;
    interrupt("Interrupted.");
    clearInput();
    let id = currentId();
    const userId = ids();
    const replyId = ids();
    const [first, second] = turn([["user", text, userId], ["assistant", "", replyId]]);
    thread().append(first);
    if (second) thread().append(second);
    setButton(true);
    if (!live) {
        await sendOld(text, userId, replyId);
        return;
    }
    const reply = first.lastElementChild;
    reply.insertAdjacentHTML("afterbegin", '<span role="status" aria-busy="true"><span class="sr-only">ChatGPT is responding</span></span>');
    current = { reply, replyId };
    const ws = await openSocket();
    pending.set(replyId, answer => {
        pending.delete(replyId);
        if (current?.replyId !== replyId) return;
        current = null;
        finish(reply, answer);
        setButton(false);
    });
    await relay({ conversation_id: id, messages: [{ id: userId, content: { parts: [text] } }], reply_id: replyId });
    if (!id) {
        id = ids();
        history.pushState(null, "", `/c/${id}`);
        addSidebarLink(id, text.slice(0, 30));
    }
    ws.send(JSON.stringify({ replyId }));
}

document.addEventListener("keydown", event => {
    if (event.key === "Enter" && !event.shiftKey && event.target === input()) {
        event.preventDefault();
        void send();
    }
});

function toggleProfileMenu(trigger) {
    const open = trigger.getAttribute("aria-expanded") === "true";
    document.getElementById("profile-menu")?.remove();
    trigger.setAttribute("aria-expanded", String(!open));
    if (open) return;
    const menu = document.createElement("div");
    menu.id = "profile-menu";
    menu.setAttribute("role", "menu");
    menu.innerHTML = '<div role="menuitem"><span>Grace Green</span></div><div role="menuitem">Settings</div><div role="menuitem">Log out</div>';
    document.body.append(menu);
}

document.addEventListener("click", event => {
    const trigger = event.target.closest('[aria-controls="profile-menu"]');
    if (trigger) {
        toggleProfileMenu(trigger);
        return;
    }
    const formButton = event.target.closest("form button");
    if (formButton) {
        event.preventDefault();
        if (formButton.textContent !== "Stop") void send();
        else if (live) interrupt("Stopped.");
        else current?.controller.abort();
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
    const response = await fetch(live ? `/backend-api/conversations/${id}?num_turns=10&include_has_versions=true` : `/backend-api/conversation/${id}`);
    const data = await response.json();
    let node = data.current_node;
    const chain = [];
    while (node) {
        const { message, parent } = data.mapping[node];
        if (message && message.author.role !== "system") chain.unshift([message.author.role, message.content.parts[0], message.id]);
        node = parent;
    }
    for (let i = 0; i < chain.length; i += 2) thread().append(...turn(chain.slice(i, i + 2)));
}

void openConversation();
