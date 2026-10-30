/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { createEmitter } from "@utils/events";
import { Logger } from "@utils/Logger";

const logger = new Logger("AppProtocol");

export interface ProtocolNote {
    method: string;
    params?: {
        threadId?: string;
        turn?: { id?: string; status?: string; };
    };
}

export const protocol = createEmitter<{
    note: ProtocolNote;
}>();

export function parseNotification(data: unknown): ProtocolNote | null {
    let value = data;
    if (typeof value === "string") {
        try {
            value = JSON.parse(value);
        } catch {
            return null;
        }
    }
    if (Array.isArray(value)) return null;
    if (!value || typeof value !== "object") return null;
    const envelope = value as { notification?: unknown; method?: unknown; params?: unknown; };
    const note = envelope.notification && typeof envelope.notification === "object" ? envelope.notification as { method?: unknown; params?: unknown; } : envelope;
    if (typeof note.method !== "string") return null;
    const params = note.params && typeof note.params === "object" ? note.params as ProtocolNote["params"] : undefined;
    return { method: note.method, params };
}

export function ingest(data: unknown) {
    if (Array.isArray(data)) {
        for (const item of data) ingest(item);
        return;
    }
    const note = parseNotification(data);
    if (!note) return;
    protocol.emit("note", note);
}

const wrappedListeners = new WeakMap<EventListenerOrEventListenerObject, EventListener>();
const onmessageFns = new WeakMap<MessagePort, ((this: MessagePort, event: MessageEvent) => unknown) | null>();

function wrapListener(listener: EventListenerOrEventListenerObject, target: EventTarget): EventListener {
    const existing = wrappedListeners.get(listener);
    if (existing) return existing;
    const wrapped: EventListener = event => {
        ingest((event as MessageEvent).data);
        if (typeof listener === "function") listener.call(target, event);
        else listener.handleEvent(event);
    };
    wrappedListeners.set(listener, wrapped);
    return wrapped;
}

function wrapPorts() {
    const proto = MessagePort.prototype;
    const add = proto.addEventListener;
    const remove = proto.removeEventListener;
    proto.addEventListener = function(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) {
        if (type !== "message") return add.call(this, type, listener, options);
        return add.call(this, type, wrapListener(listener, this), options);
    };
    proto.removeEventListener = function(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) {
        if (type !== "message") return remove.call(this, type, listener, options);
        return remove.call(this, type, wrappedListeners.get(listener) ?? listener, options);
    };
    const desc = Object.getOwnPropertyDescriptor(proto, "onmessage");
    if (desc?.set) {
        Object.defineProperty(proto, "onmessage", {
            configurable: true,
            enumerable: desc.enumerable,
            get(this: MessagePort) {
                return onmessageFns.has(this) ? onmessageFns.get(this) : desc.get?.call(this);
            },
            set(this: MessagePort, fn: ((this: MessagePort, event: MessageEvent) => unknown) | null) {
                onmessageFns.set(this, fn);
                desc.set!.call(this, function onmessage(this: MessagePort, event: MessageEvent) {
                    ingest(event.data);
                    fn?.call(this, event);
                });
            },
        });
    }
}

function wrapBridge() {
    const bridge = (window as unknown as { electronBridge?: { subscribeToWorkerMessages?: (workerId: string, cb: (msg: unknown) => void) => unknown; }; }).electronBridge;
    const subscribe = bridge?.subscribeToWorkerMessages;
    if (!bridge || typeof subscribe !== "function") return;
    try {
        bridge.subscribeToWorkerMessages = (workerId, cb) => subscribe.call(bridge, workerId, msg => {
            ingest(msg);
            cb(msg);
        });
    } catch (e) {
        logger.warn("electronBridge.subscribeToWorkerMessages is not writable", e);
    }
}

function install() {
    addEventListener("message", event => ingest(event.data));
    try {
        wrapPorts();
    } catch (e) {
        logger.warn("MessagePort wrap failed", e);
    }
    try {
        wrapBridge();
    } catch (e) {
        logger.warn("electronBridge wrap failed", e);
    }
    logger.info("Listening for app-server notifications");
}

install();
