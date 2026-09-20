/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * ChatGPT-side rewrite of Void++ BetterNavigator (GPL-3.0-or-later),
 * with ChatGPT selectors in the spirit of Notion-style-AI-Navigator (MIT).
 * Self rail only: chatgpt.com has no Grok "Go to response N" ticks.
 * Body-fixed host, #thread childList+subtree observer, no html/body
 * subtree MO, no :has(), no Grok hsl, no position:relative on #thread.
 * Live dash: the in-progress assistant tick only (aria-busy /
 * .result-streaming / empty markdown+thinking) AND harvest generate-arm
 * or a visible Stop. Never raw isStreaming(), never the previous finished
 * reply, no streamEnd, no Grok stores.
 */

import { definePluginSettings } from "../../api/Settings";
import { getStopButton } from "../../host/composer";
import { currentConversationId } from "../../host/conversation";
import { subscribeHarvest, type HarvestEvent } from "../../host/harvest";
import { getProStopButton, isDraftMigrate, watchStreamingEdge } from "../../host/streaming";
import { Devs } from "../../utils/constants";
import { registerStyle, removeStyle } from "../../utils/css";
import { Logger } from "../../utils/Logger";
import definePlugin, { OptionType, StartAt } from "../../utils/types";
import css from "./styles.css";

const logger = new Logger("BetterNavigator");
const STYLE_NAME = "betterNavigator";
const HOST_ID = "bloom-bn-host";
const CLIP = 60;
const DENSE_AT = 16;
const LOCK_MS = 1000;
const FAR_SCREENS = 2.5;
const THRESHOLD = 0.4;
const LIVE_LABEL = "正在输出…";

const SKIP = [
    "#thread-bottom-container",
    "#prompt-textarea",
    "#bloom-root",
    "#bloom-sidebar-panel",
    "#bloom-bn-host",
    "form[data-type='unified-composer']",
].join(", ");

const NOISE = [
    "button",
    "svg",
    "nav",
    "time",
    ".bloom-ts",
    "details",
    "summary",
    "[role='toolbar']",
    "[role='menu']",
    "[data-testid*='action-button']",
    "[data-testid*='citation']",
    "[data-testid*='copy']",
    "[class*='thinking']",
    "[class*='reasoning']",
    "[class*='footnote']",
    ".sr-only",
].join(", ");

const TYPING = [
    "input",
    "textarea",
    "select",
    "[contenteditable='true']",
    "#prompt-textarea",
    "[role='textbox']",
    "#bloom-sidebar-panel",
    "#bloom-plugin-layer",
    "#bloom-plugin-dialog",
    "#bloom-rt-host",
    "#bloom-pq-chip",
    "#bloom-gc-composer",
].join(", ");

type Role = "user" | "assistant";
type NavItem = { id: string; el: HTMLElement; role: Role; text: string; live?: boolean };

const settings = definePluginSettings({
    showAssistant: {
        type: OptionType.BOOLEAN,
        description: "List assistant replies in the outline, not only your messages.",
        default: true,
    },
    jumpEffect: {
        type: OptionType.SELECT,
        description: "Highlight the message after jumping to it.",
        options: [
            { label: "Border", value: "border", default: true },
            { label: "None", value: "none" },
        ],
    },
});

const labels = new Map<string, string>();
const armedIds = new Set<string>();

let started = false;
let pendingNew = false;
let host: HTMLElement | null = null;
let ticksEl: HTMLElement | null = null;
let listEl: HTMLElement | null = null;
let metaEl: HTMLElement | null = null;
let lastNav: NavItem[] = [];
let paintedKey = "";
let activeIdx = 0;
let lockIdx = -1;
let lockUntil = 0;
let lastCid = "";
let raf = 0;
let placeRaf = 0;
let flashTimer: ReturnType<typeof setTimeout> | undefined;
let flashEl: HTMLElement | null = null;
let keys: AbortController | null = null;
let unsubStream: (() => void) | null = null;
let unsubHarvest: (() => void) | null = null;
let threadObs: MutationObserver | null = null;
let watchedThread: HTMLElement | null = null;
let threadRo: ResizeObserver | null = null;
let io: IntersectionObserver | null = null;
let scroller: HTMLElement | Window | null = null;
let unbindScroll: (() => void) | null = null;

function threadRoot(): HTMLElement | null {
    return document.getElementById("thread")
        || document.querySelector<HTMLElement>('[data-testid="conversation-panel"]')
        || document.querySelector<HTMLElement>("main");
}

function skipNode(el: Element): boolean {
    try {
        return !!el.closest(SKIP);
    } catch {
        return true;
    }
}

function roleOf(el: HTMLElement): Role | null {
    const direct = (el.getAttribute("data-message-author-role")
        || el.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")
        || el.getAttribute("data-turn")
        || "").toLowerCase();
    if (direct === "user" || direct === "assistant") return direct;
    const aria = (el.getAttribute("aria-label") || "").toLowerCase();
    if (aria.includes("you said")) return "user";
    if (aria.includes("chatgpt said") || aria.includes("assistant said")) return "assistant";
    return null;
}

function extractText(root: HTMLElement): string {
    const parts: string[] = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            try {
                if (parent.closest(NOISE)) return NodeFilter.FILTER_REJECT;
            } catch {
                return NodeFilter.FILTER_REJECT;
            }
            const t = (node.textContent || "").replace(/\s+/g, " ").trim();
            return t ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        },
    });
    let node: Node | null;
    while ((node = walker.nextNode()) && parts.join(" ").length < CLIP + 20) {
        parts.push((node.textContent || "").replace(/\s+/g, " ").trim());
    }
    return parts.join(" ").replace(/\s+/g, " ").trim();
}

function fallbackLabel(el: HTMLElement, index: number): string {
    try {
        if (el.querySelector("img, picture, video, canvas")) return "Image";
        if (el.querySelector("a[download], [class*='attachment']")) return "File";
        if (el.querySelector("pre, code")) return "Code";
    } catch { /* ignore */ }
    return `Message ${index + 1}`;
}

function bodyText(el: HTMLElement, role: Role): string {
    const root = role === "user"
        ? el.querySelector<HTMLElement>(".whitespace-pre-wrap") ?? el
        : el.querySelector<HTMLElement>(".markdown") ?? el;
    return extractText(root);
}

function clipText(raw: string): string {
    return raw.length > CLIP ? `${raw.slice(0, CLIP).trimEnd()}…` : raw;
}

function itemText(el: HTMLElement, role: Role, index: number, live: boolean): string {
    const raw = bodyText(el, role);
    if (raw) return clipText(raw);
    if (live) return LIVE_LABEL;
    return fallbackLabel(el, index);
}

/** True generate — harvest SSE arm or a real Stop. Not hydrate aria-busy. */
function generationArmed(): boolean {
    if (pendingNew) return true;
    const id = currentConversationId();
    if (id && armedIds.has(id)) return true;
    if (getStopButton() || getProStopButton()) return true;
    return false;
}

/** This assistant node itself looks in-progress. Never pick a victim by "last". */
function nodeInProgress(el: HTMLElement): boolean {
    try {
        if (el.getAttribute("aria-busy") === "true") return true;
        if (el.classList.contains("result-streaming")) return true;
        if (el.querySelector("[aria-busy='true'], .result-streaming")) return true;
        const md = el.querySelector(".markdown");
        const empty = !md || (md instanceof HTMLElement && !extractText(md));
        if (empty && el.querySelector("[class*='thinking'], [class*='reasoning'], details")) return true;
    } catch { /* ignore */ }
    return false;
}

function collect(): NavItem[] {
    const root = threadRoot();
    if (!root || root === document.body) return [];
    const showAsst = settings.store.showAssistant !== false;
    const armed = showAsst && generationArmed();
    const out: NavItem[] = [];
    try {
        for (const node of root.querySelectorAll<HTMLElement>("[data-message-id]")) {
            if (skipNode(node)) continue;
            const id = node.getAttribute("data-message-id") || "";
            if (!id) continue;
            const role = roleOf(node);
            if (role !== "user" && role !== "assistant") continue;
            if (role === "assistant" && !showAsst) continue;
            const live = role === "assistant" && armed && nodeInProgress(node);
            const fresh = itemText(node, role, out.length, live);
            if (fresh && fresh !== LIVE_LABEL && fresh !== labels.get(id)) labels.set(id, fresh);
            const text = live && fresh === LIVE_LABEL ? LIVE_LABEL : (labels.get(id) || fresh);
            out.push({ id, el: node, role, text, live });
        }
    } catch { /* ignore */ }
    return out;
}

function headerOffset(): number {
    const header = document.getElementById("page-header");
    const h = header?.getBoundingClientRect().height ?? 0;
    return Math.min(Math.max(h, 48), 88);
}

function findScroller(from: HTMLElement): HTMLElement | Window {
    let n: HTMLElement | null = from;
    while (n && n !== document.body && n !== document.documentElement) {
        const style = getComputedStyle(n);
        const oy = style.overflowY;
        if ((oy === "auto" || oy === "scroll") && n.scrollHeight > n.clientHeight + 8) return n;
        n = n.parentElement;
    }
    return window;
}

function viewHeight(parent: HTMLElement | Window): number {
    return parent === window ? window.innerHeight : (parent as HTMLElement).clientHeight;
}

function isTypingTarget(t: EventTarget | null): boolean {
    const el = t instanceof Element ? t : t instanceof Node ? t.parentElement : null;
    if (!el) return false;
    try {
        return !!el.closest(TYPING);
    } catch {
        return false;
    }
}

function dropFlash() {
    if (flashTimer !== undefined) {
        clearTimeout(flashTimer);
        flashTimer = undefined;
    }
    flashEl?.classList.remove("bloom-bn-flash");
    flashEl = null;
}

function flash(el: HTMLElement) {
    dropFlash();
    el.classList.add("bloom-bn-flash");
    flashEl = el;
    flashTimer = setTimeout(() => {
        el.classList.remove("bloom-bn-flash");
        if (flashEl === el) flashEl = null;
        flashTimer = undefined;
    }, 800);
}

function setActive(index: number) {
    if (!lastNav.length) return;
    const i = Math.max(0, Math.min(index, lastNav.length - 1));
    activeIdx = i;
    ticksEl?.querySelectorAll(".bloom-bn-tick").forEach((n, k) => {
        n.classList.toggle("bloom-bn-current", k === i);
    });
    listEl?.querySelectorAll(".bloom-bn-item").forEach((n, k) => {
        n.classList.toggle("bloom-bn-active", k === i);
    });
    if (metaEl) metaEl.textContent = `${i + 1} / ${lastNav.length}`;
    const active = listEl?.children[i];
    if (active instanceof HTMLElement) {
        const parent = listEl;
        if (parent) {
            const top = active.offsetTop - parent.clientHeight / 2 + active.offsetHeight / 2;
            parent.scrollTop = Math.max(0, top);
        }
    }
}

function jump(index: number) {
    const item = lastNav[index];
    if (!item?.el.isConnected) return;
    lockIdx = index;
    lockUntil = Date.now() + LOCK_MS;
    setActive(index);
    const parent = scroller ?? findScroller(item.el);
    const dist = Math.abs(item.el.getBoundingClientRect().top - headerOffset());
    const far = dist > FAR_SCREENS * viewHeight(parent);
    item.el.scrollIntoView({ behavior: far ? "auto" : "smooth", block: "start" });
    if (settings.store.jumpEffect !== "none") flash(item.el);
}

function requestActive() {
    if (!started || !lastNav.length) return;
    if (Date.now() < lockUntil && lockIdx >= 0) {
        setActive(lockIdx);
        return;
    }
    const cut = window.innerHeight * THRESHOLD;
    let idx = 0;
    for (let i = 0; i < lastNav.length; i++) {
        const el = lastNav[i].el;
        if (!el.isConnected) continue;
        if (el.getBoundingClientRect().top <= cut) idx = i;
    }
    setActive(idx);
}

function bindScroller(root: HTMLElement) {
    const next = findScroller(root);
    if (scroller === next && unbindScroll) return;
    unbindScroll?.();
    scroller = next;
    const target: EventTarget = next === window ? document : next;
    const onScroll = () => {
        requestActive();
        placeSoon();
    };
    target.addEventListener("scroll", onScroll, { passive: true });
    unbindScroll = () => target.removeEventListener("scroll", onScroll);
}

function bindIo(items: NavItem[]) {
    io?.disconnect();
    io = null;
    const root = scroller instanceof HTMLElement ? scroller : null;
    io = new IntersectionObserver(() => requestActive(), {
        root,
        threshold: [0, 0.15, 0.4, 0.75, 1],
    });
    for (const item of items) {
        if (item.el.isConnected) io.observe(item.el);
    }
}

function ensureHost(): HTMLElement | null {
    if (!document.body) return null;
    let el = host;
    if (el?.isConnected) return el;
    el = document.createElement("div");
    el.id = HOST_ID;
    el.className = "bloom-bn-host";
    el.setAttribute("role", "navigation");
    el.setAttribute("aria-label", "Conversation outline");
    el.hidden = true;
    const ticks = document.createElement("div");
    ticks.className = "bloom-bn-ticks";
    const menu = document.createElement("div");
    menu.className = "bloom-bn-menu";
    const card = document.createElement("div");
    card.className = "bloom-bn-card";
    const meta = document.createElement("div");
    meta.className = "bloom-bn-meta";
    const list = document.createElement("div");
    list.className = "bloom-bn-list";
    card.append(meta, list);
    menu.appendChild(card);
    el.append(ticks, menu);
    document.body.appendChild(el);
    host = el;
    ticksEl = ticks;
    listEl = list;
    metaEl = meta;
    return el;
}

function placeHost() {
    const el = host;
    const thread = threadRoot();
    if (!el || !thread || !thread.isConnected || lastNav.length < 1) {
        if (el) el.hidden = true;
        return;
    }
    const rect = thread.getBoundingClientRect();
    const bottomEl = document.getElementById("thread-bottom-container");
    const header = document.getElementById("page-header");
    const top = Math.max(rect.top + 8, header?.getBoundingClientRect().bottom ?? 0, 8);
    const floor = Math.min(
        rect.bottom - 8,
        bottomEl ? bottomEl.getBoundingClientRect().top - 12 : window.innerHeight - 8,
    );
    const height = floor - top;
    if (height < 96 || rect.width < 160) {
        el.hidden = true;
        return;
    }
    const gap = window.innerWidth - rect.right;
    const right = gap >= 22 ? Math.max(8, gap - 16) : 8;
    el.hidden = false;
    el.style.top = `${Math.round((top + floor) / 2)}px`;
    el.style.height = "auto";
    el.style.maxHeight = `${Math.round(height)}px`;
    el.style.right = `${Math.round(right)}px`;
    el.style.setProperty("--bloom-bn-cap", `${Math.round(height)}px`);
}

function placeSoon() {
    if (!started || placeRaf) return;
    placeRaf = requestAnimationFrame(() => {
        placeRaf = 0;
        if (started) placeHost();
    });
}

function tickClass(item: NavItem): string {
    const bits = ["bloom-bn-tick"];
    if (item.role === "assistant") bits.push("bloom-bn-tick-asst");
    if (item.live) bits.push("bloom-bn-tick-live");
    return bits.join(" ");
}

function renderNav(items: NavItem[]) {
    const ticks = ticksEl;
    const list = listEl;
    if (!ticks || !list) return;
    ticks.replaceChildren();
    list.replaceChildren();
    ticks.classList.toggle("bloom-bn-dense", items.length > DENSE_AT);
    items.forEach((item, i) => {
        const tick = document.createElement("button");
        tick.type = "button";
        tick.className = tickClass(item);
        tick.setAttribute("aria-label", `Go to message ${i + 1} of ${items.length}`);
        tick.addEventListener("click", ev => {
            ev.preventDefault();
            jump(i);
        });
        ticks.appendChild(tick);

        const row = document.createElement("button");
        row.type = "button";
        row.className = `bloom-bn-item bloom-bn-${item.role}`;
        const mark = document.createElement("span");
        mark.className = "bloom-bn-mark";
        mark.textContent = item.role === "user" ? "You" : "GPT";
        const label = document.createElement("span");
        label.className = "bloom-bn-label";
        label.textContent = item.text;
        label.title = item.text;
        row.append(mark, label);
        row.addEventListener("click", ev => {
            ev.preventDefault();
            jump(i);
        });
        list.appendChild(row);
    });
}

function patchLive(items: NavItem[]) {
    ticksEl?.querySelectorAll(".bloom-bn-tick").forEach((node, i) => {
        node.classList.toggle("bloom-bn-tick-live", !!items[i]?.live);
    });
    items.forEach((item, i) => {
        const row = listEl?.children[i];
        const label = row?.querySelector(".bloom-bn-label");
        if (label && label.textContent !== item.text) {
            label.textContent = item.text;
            if (label instanceof HTMLElement) label.title = item.text;
        }
    });
}

function checkCid() {
    const id = currentConversationId();
    if (id === lastCid) return false;
    lastCid = id;
    labels.clear();
    lastNav = [];
    paintedKey = "";
    activeIdx = 0;
    lockIdx = -1;
    lockUntil = 0;
    if (pendingNew && id) {
        armedIds.add(id);
        pendingNew = false;
    }
    return true;
}

function structKey(items: NavItem[]): string {
    const show = settings.store.showAssistant !== false ? "1" : "0";
    return `${lastCid}|${show}|${items.map(it => it.id).join(",")}`;
}

function paint() {
    if (!started) return;
    checkCid();
    const items = collect();
    const root = threadRoot();
    if (!root || items.length < 1) {
        lastNav = items;
        paintedKey = "";
        if (host) host.hidden = true;
        io?.disconnect();
        observeThread();
        return;
    }
    ensureHost();
    const key = structKey(items);
    if (key !== paintedKey) {
        lastNav = items;
        paintedKey = key;
        renderNav(items);
        bindScroller(root);
        bindIo(items);
    } else {
        lastNav = items;
        patchLive(items);
    }
    placeHost();
    requestActive();
    observeThread();
}

function schedulePaint() {
    if (!started) return;
    if (document.hidden) {
        if (raf) {
            cancelAnimationFrame(raf);
            raf = 0;
        }
        paint();
        return;
    }
    if (raf) return;
    raf = requestAnimationFrame(() => {
        raf = 0;
        if (started) paint();
    });
}

function observeThread() {
    const root = threadRoot();
    if (threadObs && watchedThread === root && root?.isConnected) return;
    threadObs?.disconnect();
    threadRo?.disconnect();
    watchedThread = root;
    if (!root || root === document.body) {
        threadObs = null;
        return;
    }
    threadObs = new MutationObserver(() => schedulePaint());
    threadObs.observe(root, { childList: true, subtree: true });
    threadRo = new ResizeObserver(() => placeSoon());
    threadRo.observe(root);
}

function onHarvest(ev: HarvestEvent) {
    if (!started) return;
    if (ev.type === "post-start") {
        if (ev.conversationId) {
            pendingNew = false;
            armedIds.add(ev.conversationId);
        } else {
            pendingNew = true;
        }
        schedulePaint();
        return;
    }
    if (ev.type === "post-end") {
        pendingNew = false;
        if (ev.conversationId) armedIds.delete(ev.conversationId);
        else {
            const id = currentConversationId();
            if (id) armedIds.delete(id);
        }
        schedulePaint();
    }
}

function onKeyDown(ev: KeyboardEvent) {
    if (!started || !lastNav.length || host?.hidden) return;
    if (ev.altKey || ev.ctrlKey || ev.metaKey) return;
    if (isTypingTarget(ev.target)) return;
    let next = -1;
    if (ev.key === "ArrowDown") next = activeIdx + 1;
    else if (ev.key === "ArrowUp") next = activeIdx - 1;
    else if (ev.key === "Home") next = 0;
    else if (ev.key === "End") next = lastNav.length - 1;
    else if (ev.key === "Escape") {
        (document.activeElement as HTMLElement | null)?.blur?.();
        return;
    } else return;
    ev.preventDefault();
    jump(Math.max(0, Math.min(next, lastNav.length - 1)));
}

function unmount() {
    dropFlash();
    io?.disconnect();
    io = null;
    threadObs?.disconnect();
    threadObs = null;
    watchedThread = null;
    threadRo?.disconnect();
    threadRo = null;
    unbindScroll?.();
    unbindScroll = null;
    scroller = null;
    host?.remove();
    host = null;
    ticksEl = null;
    listEl = null;
    metaEl = null;
}

export default definePlugin({
    name: "BetterNavigator",
    description: "Notion-style outline for the open chat. Hover the ticks, click or use ↑/↓ to jump. A dashed tick marks the reply still streaming.",
    authors: [Devs.p],
    tags: ["chat", "ui"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>`,
    enabledByDefault: true,
    startAt: StartAt.HostReady,
    managedStyle: STYLE_NAME,
    cleanupSelectors: [`#${HOST_ID}`],
    settings,
    start() {
        started = true;
        lastCid = currentConversationId();
        registerStyle(STYLE_NAME, css);
        keys = new AbortController();
        const { signal } = keys;
        window.addEventListener("keydown", onKeyDown, { signal });
        window.addEventListener("popstate", schedulePaint, { signal });
        window.visualViewport?.addEventListener("resize", placeSoon, { signal });
        document.addEventListener("visibilitychange", () => {
            if (!started) return;
            if (raf) {
                cancelAnimationFrame(raf);
                raf = 0;
            }
            if (placeRaf) {
                cancelAnimationFrame(placeRaf);
                placeRaf = 0;
            }
            paint();
        }, { signal });
        unsubHarvest = subscribeHarvest(onHarvest);
        unsubStream = watchStreamingEdge({
            onTick() {
                schedulePaint();
            },
            onFall() {
                schedulePaint();
            },
            onContext(next, prev) {
                if (!isDraftMigrate(prev, next)) {
                    labels.clear();
                    paintedKey = "";
                }
                schedulePaint();
            },
        });
        observeThread();
        schedulePaint();
        logger.debug("navigator started");
    },
    stop() {
        started = false;
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        if (placeRaf) cancelAnimationFrame(placeRaf);
        placeRaf = 0;
        keys?.abort();
        keys = null;
        unsubStream?.();
        unsubStream = null;
        unsubHarvest?.();
        unsubHarvest = null;
        armedIds.clear();
        pendingNew = false;
        unmount();
        labels.clear();
        lastNav = [];
        paintedKey = "";
        removeStyle(STYLE_NAME);
    },
    onSettingsChange() {
        paintedKey = "";
        schedulePaint();
    },
});
