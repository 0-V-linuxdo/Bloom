/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const LOOPBACK = new Set(["127.0.0.1", "localhost", "[::1]", "::1"]);
const POLL_MS = 1000;
const major = Number(process.versions.node.split(".")[0]);
if (major < 22) {
    console.error(`[Bloom++] inject.mjs needs Node 22+ (got ${process.versions.node})`);
    process.exit(1);
}

const port = Number(process.argv[2] ?? process.env.BLOOM_CDP_PORT);
if (!Number.isInteger(port) || port < 1024 || port > 65535) {
    console.error("[Bloom++] usage: node inject.mjs <port>");
    process.exit(1);
}

const userscript = readFileSync(resolve(root, "userscript/Bloom.app.user.js"), "utf8");
const source = `${gmShim()}\n${userscript}`;
const evaluate = `globalThis.Bloom?"skip":eval(${JSON.stringify(source)})`;
const sessions = new Map();
let browser;

function gmShim() {
    return `globalThis.GM_xmlhttpRequest=function(d){const c=new AbortController();const t=d.timeout?setTimeout(()=>{c.abort();d.ontimeout?.();},d.timeout):null;fetch(d.url,{method:d.method||"GET",headers:d.headers,body:d.data,signal:c.signal}).then(async r=>{let b;if(d.responseType==="arraybuffer")b=await r.arrayBuffer();else if(d.responseType==="json")b=await r.json();else b=await r.text();d.onload?.({status:r.status,response:b,responseText:typeof b==="string"?b:"",responseHeaders:[...r.headers.entries()].map(([k,v])=>k+": "+v).join("\\r\\n")});}).catch(()=>{if(!c.signal.aborted)d.onerror?.();}).finally(()=>{if(t)clearTimeout(t);});};`;
}

function debuggerUrl(url) {
    const parsed = new URL(url);
    if (parsed.protocol !== "ws:" || !LOOPBACK.has(parsed.hostname) || Number(parsed.port) !== port) {
        throw new Error(`rejected debugger URL ${url}`);
    }
    return parsed.href;
}

class Cdp {
    constructor(url) {
        this.url = url;
        this.id = 0;
        this.pending = new Map();
        this.ws = null;
        this.onEvent = undefined;
    }

    async connect() {
        this.ws = new WebSocket(this.url);
        await new Promise((resolve, reject) => {
            this.ws.addEventListener("open", resolve, { once: true });
            this.ws.addEventListener("error", reject, { once: true });
        });
        this.ws.addEventListener("message", event => {
            const msg = JSON.parse(String(event.data));
            if (msg.id != null) {
                const job = this.pending.get(msg.id);
                if (!job) return;
                this.pending.delete(msg.id);
                if (msg.error) job.reject(new Error(msg.error.message ?? JSON.stringify(msg.error)));
                else job.resolve(msg.result);
                return;
            }
            this.onEvent?.(msg);
        });
    }

    send(method, params, sessionId) {
        const id = ++this.id;
        return new Promise((resolve, reject) => {
            this.pending.set(id, { resolve, reject });
            this.ws.send(JSON.stringify(sessionId ? { id, method, params, sessionId } : { id, method, params }));
        });
    }

    close() {
        try {
            this.ws?.close();
        } catch {
            /* closed */
        }
    }
}

async function listPages() {
    const response = await fetch(`http://127.0.0.1:${port}/json/list`);
    if (!response.ok) throw new Error(`json/list HTTP ${response.status}`);
    const list = await response.json();
    if (!Array.isArray(list)) throw new Error("json/list is not an array");
    return list.filter(target =>
        target?.type === "page"
        && typeof target.url === "string"
        && target.url.startsWith("app://")
        && typeof target.webSocketDebuggerUrl === "string");
}

async function inject(session, sessionId, { evaluateNow }) {
    const send = (method, params) => session.send(method, params, sessionId);
    await send("Page.enable");
    await send("Page.addScriptToEvaluateOnNewDocument", { source });
    if (evaluateNow) await send("Runtime.evaluate", { expression: evaluate });
}

async function attachPage(target) {
    const session = new Cdp(debuggerUrl(target.webSocketDebuggerUrl));
    await session.connect();
    session.ws.addEventListener("close", () => {
        if (sessions.get(target.id) === session) sessions.delete(target.id);
        console.log(`[Bloom++] disconnected ${target.id} ${target.url}`);
    });
    await inject(session, undefined, { evaluateNow: true });
    sessions.set(target.id, session);
    console.log(`[Bloom++] injected ${target.id} ${target.url}`);
}

async function attachBrowser() {
    const response = await fetch(`http://127.0.0.1:${port}/json/version`);
    if (!response.ok) throw new Error(`json/version HTTP ${response.status}`);
    const info = await response.json();
    const session = new Cdp(debuggerUrl(info.webSocketDebuggerUrl));
    await session.connect();
    session.ws.addEventListener("close", () => {
        if (browser === session) browser = undefined;
        console.log("[Bloom++] browser target disconnected");
    });
    session.onEvent = msg => {
        if (msg.method !== "Target.attachedToTarget") return;
        const { sessionId, targetInfo, waitingForDebugger } = msg.params ?? {};
        const url = targetInfo?.url ?? "";
        const page = targetInfo?.type === "page" && url.startsWith("app://");
        void (async () => {
            try {
                if (page) {
                    await inject(session, sessionId, { evaluateNow: !waitingForDebugger });
                    sessions.set(targetInfo.id, session);
                    console.log(`[Bloom++] attached ${targetInfo.id} ${url}`);
                }
                if (waitingForDebugger) await session.send("Runtime.runIfWaitingForDebugger", undefined, sessionId);
            } catch (error) {
                console.error(`[Bloom++] attach failed ${targetInfo?.id}:`, error.message ?? error);
                if (waitingForDebugger) {
                    try {
                        await session.send("Runtime.runIfWaitingForDebugger", undefined, sessionId);
                    } catch {
                        /* resume anyway */
                    }
                }
            }
        })();
    };
    await session.send("Target.setAutoAttach", { autoAttach: true, waitForDebuggerOnStart: true, flatten: true });
    await session.send("Target.setDiscoverTargets", { discover: true });
    browser = session;
    console.log("[Bloom++] watching browser targets");
}

async function tick() {
    if (!browser) {
        try {
            await attachBrowser();
        } catch (error) {
            if (!tick.waiting) {
                tick.waiting = true;
                console.log(`[Bloom++] waiting for 127.0.0.1:${port}/json/version (${error.message})`);
            }
            return;
        }
    }
    let pages;
    try {
        pages = await listPages();
    } catch (error) {
        if (!tick.waiting) {
            tick.waiting = true;
            console.log(`[Bloom++] waiting for 127.0.0.1:${port}/json/list`);
        }
        return;
    }
    tick.waiting = false;
    for (const target of pages) {
        if (sessions.has(target.id)) continue;
        try {
            await attachPage(target);
        } catch (error) {
            console.error(`[Bloom++] inject failed ${target.id}:`, error.message ?? error);
        }
    }
}

console.log(`[Bloom++] injector on 127.0.0.1:${port} (no reload)`);
await tick();
setInterval(() => void tick(), POLL_MS);

const shutdown = () => {
    browser?.close();
    for (const session of sessions.values()) {
        if (session !== browser) session.close();
    }
    process.exit(0);
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
