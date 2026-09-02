/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Adapted from Void++ RecentTopics (GPL-3.0-or-later).
 * Arc-style Ctrl+` switcher. Rewritten for chatgpt.com: no Grok stores,
 * no turbopack, no popover, no documentElement overlay.
 * HUD mounts on document.body. Visits persist in hidden plugin settings.
 */

import { definePluginSettings } from "../../api/Settings";
import { conversationToken } from "../../host/conversation";
import { Devs } from "../../utils/constants";
import { registerStyle } from "../../utils/css";
import { Logger } from "../../utils/Logger";
import definePlugin, { OptionType, StartAt } from "../../utils/types";
import css from "./styles.css";

const logger = new Logger("RecentTopics");
const HOST_ID = "bloom-rt-host";
const HOME_KEY = "home";
const CONV_RE = /^\/c\/([a-z0-9_-]{8,})/i;
const HREF_CONV_RE = /\/c\/([a-z0-9_-]{8,})/i;
const DATE_SKIP = /^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i;
const TRIGGER_CODES = new Set(["Backquote", "IntlBackslash"]);
const TRIGGER_KEYS = new Set(["`", "~", "·", "｀", "～", "Dead", "Process"]);
const CLIP = 140;

const COUNT_OPTIONS = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => ({
    label: String(n),
    value: String(n),
    default: n === 5,
}));

type Preview = { user?: string; assistant?: string };

interface Topic {
    id: string;
    title: string;
    project: string;
    preview: Preview;
}

const settings = definePluginSettings({
    maxRecent: {
        type: OptionType.SELECT,
        description: "How many recently opened conversations to show.",
        options: COUNT_OPTIONS,
    },
    includeHome: {
        type: OptionType.BOOLEAN,
        description: "Include new-chat home in the switcher.",
        default: true,
    },
    visits: {
        type: OptionType.STRING,
        description: "Visit order",
        hidden: true,
        default: [],
    },
    titles: {
        type: OptionType.STRING,
        description: "Cached titles",
        hidden: true,
        default: {},
    },
    previews: {
        type: OptionType.STRING,
        description: "Cached last-turn previews",
        hidden: true,
        default: {},
    },
    projects: {
        type: OptionType.STRING,
        description: "Cached project names",
        hidden: true,
        default: {},
    },
});

let keys: AbortController | null = null;
let host: HTMLElement | null = null;
let open = false;
let held = false;
let ctrlHeld = false;
let selected = 0;
let lastId = "";
let origPush: History["pushState"] | null = null;
let origReplace: History["replaceState"] | null = null;

function maxCount(): number {
    const n = Number(settings.store.maxRecent ?? 5);
    return Number.isFinite(n) && n >= 3 && n <= 12 ? n : 5;
}

function getVisits(): string[] {
    const raw = settings.plain.visits;
    return Array.isArray(raw) ? raw.filter((x): x is string => typeof x === "string") : [];
}

function getTitles(): Record<string, string> {
    const raw = settings.plain.titles;
    return raw && typeof raw === "object" && !Array.isArray(raw) ? { ...raw as Record<string, string> } : {};
}

function getPreviews(): Record<string, Preview> {
    const raw = settings.plain.previews;
    return raw && typeof raw === "object" && !Array.isArray(raw) ? { ...raw as Record<string, Preview> } : {};
}

function getProjects(): Record<string, string> {
    const raw = settings.plain.projects;
    return raw && typeof raw === "object" && !Array.isArray(raw) ? { ...raw as Record<string, string> } : {};
}

function capIds(ids: string[]): string[] {
    const max = maxCount();
    return ids.length > max ? ids.slice(0, max) : ids;
}

function isHomeId(id: string): boolean {
    return id === HOME_KEY;
}

function clip(text: string, n = CLIP): string {
    const value = text.replace(/\s+/g, " ").trim();
    if (value.length <= n) return value;
    return `${value.slice(0, n - 1)}…`;
}

function idFromHref(href: string): string {
    if (!href) return "";
    try {
        const u = new URL(href, location.origin);
        const m = u.pathname.match(CONV_RE);
        return m?.[1] ?? "";
    } catch {
        const m = href.match(HREF_CONV_RE);
        return m?.[1] ?? "";
    }
}

function currentVisit(): string {
    const m = (location.pathname || "/").match(CONV_RE);
    if (m?.[1]) return m[1];
    const token = conversationToken();
    const parts = token.split("|").filter(Boolean);
    for (let i = parts.length - 1; i >= 0; i--) {
        const part = parts[i];
        if (/^[a-z0-9_-]{8,}$/i.test(part)) return part;
    }
    return HOME_KEY;
}

function liveTitle(id: string): string {
    if (isHomeId(id)) return "New chat";
    try {
        const links = document.querySelectorAll<HTMLAnchorElement>(`a[href*="/c/${id}"]`);
        for (const a of links) {
            if (idFromHref(a.getAttribute("href") || "") !== id) continue;
            const text = clip(a.textContent || "", 80);
            if (text) return text;
        }
    } catch { /* ignore */ }
    const doc = document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i, "").trim();
    if (currentVisit() === id && doc && !/^ChatGPT$/i.test(doc)) return clip(doc, 80);
    return "";
}

function titleOf(id: string): string {
    if (isHomeId(id)) return "New chat";
    const cached = getTitles()[id];
    return cached || liveTitle(id) || "Chat";
}

function projectOf(id: string): string {
    return getProjects()[id] || "";
}

function previewOf(id: string): Preview {
    return getPreviews()[id] || {};
}

function rememberTitle(id: string, title: string) {
    if (!id || isHomeId(id) || !title) return;
    const titles = getTitles();
    if (titles[id] === title) return;
    titles[id] = title;
    settings.store.titles = titles;
}

function rememberProject(id: string, name: string) {
    if (!id || isHomeId(id) || !name) return;
    const projects = getProjects();
    if (projects[id] === name) return;
    projects[id] = name;
    settings.store.projects = projects;
}

function rememberPreview(id: string, preview: Preview) {
    if (!id || isHomeId(id)) return;
    if (!preview.user && !preview.assistant) return;
    const previews = getPreviews();
    const prev = previews[id] || {};
    const next: Preview = {
        user: preview.user || prev.user,
        assistant: preview.assistant || prev.assistant,
    };
    if (prev.user === next.user && prev.assistant === next.assistant) return;
    previews[id] = next;
    settings.store.previews = previews;
}

function bump(id: string) {
    if (!id) return;
    if (isHomeId(id) && settings.store.includeHome === false) return;
    const visits = getVisits().filter(x => x !== id);
    visits.unshift(id);
    settings.store.visits = capIds(visits);
}

function topics(): Topic[] {
    const includeHome = settings.store.includeHome !== false;
    const ids = capIds(getVisits().filter(id => includeHome || !isHomeId(id)));
    return ids.map(id => ({
        id,
        title: titleOf(id),
        project: projectOf(id),
        preview: previewOf(id),
    }));
}

function lastRoleText(role: "user" | "assistant"): string {
    try {
        const nodes = document.querySelectorAll(`[data-message-author-role="${role}"]`);
        const last = nodes[nodes.length - 1];
        if (!(last instanceof HTMLElement)) return "";
        const parts: string[] = [];
        for (const p of last.querySelectorAll("p")) {
            const t = (p.textContent || "").replace(/\s+/g, " ").trim();
            if (!t || /^(you|assistant|chatgpt)$/i.test(t)) continue;
            parts.push(t);
        }
        const raw = parts.length ? parts.join(" ") : (last.textContent || "");
        return clip(raw);
    } catch {
        return "";
    }
}

function captureId(id: string) {
    if (!id || isHomeId(id) || id !== currentVisit()) return;
    const title = liveTitle(id);
    if (title) rememberTitle(id, title);
    const user = lastRoleText("user");
    const assistant = lastRoleText("assistant");
    rememberPreview(id, { user, assistant });
    const link = recentsLink(id);
    if (link) {
        const project = projectNameFromAncestors(link);
        if (project) rememberProject(id, project);
    }
}

function harvestSidebar() {
    const titles = getTitles();
    const projects = getProjects();
    const seen: string[] = [];
    const seenSet = new Set<string>();
    let titlesDirty = false;
    let projectsDirty = false;
    try {
        for (const a of document.querySelectorAll<HTMLAnchorElement>('a[href*="/c/"]')) {
            if (a.closest(`#${HOST_ID}, #bloom-root, #bloom-sidebar-panel`)) continue;
            const id = idFromHref(a.getAttribute("href") || "");
            if (!id || seenSet.has(id)) continue;
            seenSet.add(id);
            seen.push(id);
            const title = clip(a.textContent || "", 80);
            if (title && !DATE_SKIP.test(title) && titles[id] !== title) {
                titles[id] = title;
                titlesDirty = true;
            }
            const project = projectNameFromAncestors(a);
            if (project && projects[id] !== project) {
                projects[id] = project;
                projectsDirty = true;
            }
        }
    } catch { /* ignore */ }
    if (titlesDirty) settings.store.titles = titles;
    if (projectsDirty) settings.store.projects = projects;
    const visits = getVisits();
    const known = new Set(visits);
    const extras = seen.filter(id => !known.has(id));
    if (extras.length) settings.store.visits = capIds([...visits, ...extras]);
}

function projectNameFromAncestors(el: HTMLElement): string {
    let node: HTMLElement | null = el.parentElement;
    for (let depth = 0; depth < 10 && node; depth++) {
        if (node.id === "bloom-rt-host" || node.id === "bloom-root") {
            node = node.parentElement;
            continue;
        }
        const heading = node.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate");
        const text = clip((heading instanceof HTMLElement ? heading.textContent : "") || "", 60);
        if (text && !DATE_SKIP.test(text) && !/^20\d{2}/.test(text) && text !== el.textContent?.trim()) {
            const nested = node.querySelector('a[href^="/c/"]');
            if (nested) return text;
        }
        node = node.parentElement;
    }
    return "";
}

function recentsLink(id: string): HTMLAnchorElement | null {
    if (isHomeId(id)) {
        const neu = document.querySelector<HTMLElement>('[data-testid="create-new-chat-button"]');
        if (neu instanceof HTMLAnchorElement) return neu;
        const home = document.querySelector<HTMLAnchorElement>('a[href="/"]');
        return home;
    }
    try {
        for (const a of document.querySelectorAll<HTMLAnchorElement>(`a[href*="/c/${id}"]`)) {
            if (idFromHref(a.getAttribute("href") || "") === id) return a;
        }
    } catch { /* ignore */ }
    return null;
}

function navigateTo(id: string) {
    const link = recentsLink(id);
    if (link) {
        link.click();
        return;
    }
    if (isHomeId(id)) {
        location.assign("/");
        return;
    }
    location.assign(`/c/${id}`);
}

function onRoute() {
    const id = currentVisit();
    if (lastId && lastId !== id) captureId(lastId);
    lastId = id;
    bump(id);
    harvestSidebar();
    const title = liveTitle(id);
    if (title) rememberTitle(id, title);
    captureId(id);
}

function hookHistory() {
    if (origPush) return;
    origPush = history.pushState.bind(history);
    origReplace = history.replaceState.bind(history);
    history.pushState = function pushState(...args: Parameters<History["pushState"]>) {
        const ret = origPush!(...args);
        onRoute();
        return ret;
    };
    history.replaceState = function replaceState(...args: Parameters<History["replaceState"]>) {
        const ret = origReplace!(...args);
        onRoute();
        return ret;
    };
}

function unhookHistory() {
    if (origPush) history.pushState = origPush;
    if (origReplace) history.replaceState = origReplace;
    origPush = null;
    origReplace = null;
}

function isTrigger(e: KeyboardEvent): boolean {
    if (TRIGGER_CODES.has(e.code) || e.keyCode === 192) return true;
    return TRIGGER_KEYS.has(e.key);
}

function isCtrlKey(e: KeyboardEvent): boolean {
    return e.key === "Control" || e.code === "ControlLeft" || e.code === "ControlRight";
}

function begin(reverse: boolean, fromHold: boolean) {
    held = fromHold;
    harvestSidebar();
    captureId(currentVisit());
    open = true;
    selected = 0;
    try {
        const current = currentVisit();
        bump(current);
        const list = topics();
        if (list.length > 1) selected = reverse ? list.length - 1 : 1;
    } catch (e) {
        logger.error("Failed to open switcher:", e);
    }
    paint();
}

function cycle(reverse: boolean) {
    const { length } = topics();
    if (!length) return;
    selected = (selected + (reverse ? -1 : 1) + length) % length;
    paint();
}

function commit() {
    if (!open) return;
    const target = topics()[selected];
    open = false;
    held = false;
    paint();
    if (target) navigateTo(target.id);
}

function cancel() {
    if (!open) return;
    open = false;
    held = false;
    paint();
}

function onKeyDown(e: KeyboardEvent) {
    if (isCtrlKey(e)) {
        ctrlHeld = true;
        return;
    }
    const combo = (e.ctrlKey || ctrlHeld) && !e.altKey && !e.metaKey && isTrigger(e) && !e.repeat;
    if (combo) {
        e.preventDefault();
        e.stopImmediatePropagation();
        try {
            if (open) cycle(e.shiftKey);
            else begin(e.shiftKey, true);
        } catch (err) {
            logger.error("Hotkey failed:", err);
        }
        return;
    }
    if (!open) return;
    if (e.key === "Escape") {
        e.preventDefault();
        cancel();
        return;
    }
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        commit();
        return;
    }
    if (e.key === "Tab" && (e.ctrlKey || ctrlHeld)) {
        e.preventDefault();
        cycle(e.shiftKey);
    }
}

function onKeyUp(e: KeyboardEvent) {
    if (!isCtrlKey(e)) return;
    ctrlHeld = false;
    if (open && held) commit();
}

function onClickCapture(e: Event) {
    const el = e.target instanceof Element ? e.target : null;
    if (!el) return;
    const hit = el.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]');
    if (!hit) return;
    requestAnimationFrame(onRoute);
}

function onDocClick(e: Event) {
    if (!open) return;
    const el = e.target instanceof Element ? e.target : null;
    if (el?.closest(`#${HOST_ID}`)) return;
    cancel();
}

function onVisibility() {
    if (document.visibilityState === "hidden") captureId(currentVisit());
}

function ensureHost(): HTMLElement | null {
    if (!document.body) return null;
    let el = document.getElementById(HOST_ID);
    if (el instanceof HTMLElement) {
        host = el;
        return el;
    }
    el = document.createElement("div");
    el.id = HOST_ID;
    const panel = document.createElement("div");
    panel.className = "bloom-rt-panel";
    panel.setAttribute("role", "listbox");
    panel.setAttribute("aria-label", "Recent conversations");
    panel.dataset.visible = "false";
    panel.addEventListener("click", ev => ev.stopPropagation());
    el.append(panel);
    document.body.append(el);
    host = el;
    return el;
}

function paint() {
    const root = ensureHost();
    if (!root) return;
    const panel = root.querySelector<HTMLElement>(".bloom-rt-panel");
    if (!panel) return;
    if (!open) {
        panel.dataset.visible = "false";
        panel.replaceChildren();
        return;
    }
    const list = topics();
    if (!list.length) {
        panel.dataset.visible = "true";
        const empty = document.createElement("p");
        empty.className = "bloom-rt-empty";
        empty.textContent = "No recent chats yet.";
        panel.replaceChildren(empty);
        return;
    }
    if (selected >= list.length) selected = 0;
    const ul = document.createElement("div");
    ul.className = "bloom-rt-list";
    ul.setAttribute("role", "none");
    list.forEach((topic, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "bloom-rt-card";
        btn.setAttribute("role", "option");
        btn.dataset.active = i === selected ? "true" : "false";
        btn.setAttribute("aria-selected", i === selected ? "true" : "false");
        const name = document.createElement("div");
        name.className = "bloom-rt-name";
        name.textContent = topic.title;
        btn.append(name);
        if (topic.project) {
            const project = document.createElement("div");
            project.className = "bloom-rt-project";
            project.textContent = topic.project;
            btn.append(project);
        }
        if (topic.preview.user || topic.preview.assistant) {
            const preview = document.createElement("div");
            preview.className = "bloom-rt-preview";
            if (topic.preview.user) {
                const line = document.createElement("div");
                line.className = "bloom-rt-line";
                line.dataset.role = "user";
                line.textContent = topic.preview.user;
                preview.append(line);
            }
            if (topic.preview.assistant) {
                const line = document.createElement("div");
                line.className = "bloom-rt-line";
                line.dataset.role = "assistant";
                line.textContent = topic.preview.assistant;
                preview.append(line);
            }
            btn.append(preview);
        }
        btn.addEventListener("click", () => {
            selected = i;
            commit();
        });
        ul.append(btn);
    });
    panel.replaceChildren(ul);
    panel.dataset.visible = "true";
    const active = panel.querySelector<HTMLElement>('.bloom-rt-card[data-active="true"]');
    active?.scrollIntoView({ block: "nearest" });
}

function detachHost() {
    document.getElementById(HOST_ID)?.remove();
    host = null;
}

export default definePlugin({
    name: "RecentTopics",
    description: "Switch recently opened chats with Ctrl+` like Arc's tab switcher.",
    authors: [Devs.p],
    tags: ["chat", "ui"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>`,
    enabledByDefault: true,
    startAt: StartAt.HostReady,
    managedStyle: "recentTopics",
    cleanupSelectors: [`#${HOST_ID}`],
    settings,

    start() {
        registerStyle("recentTopics", css);
        lastId = currentVisit();
        bump(lastId);
        harvestSidebar();
        captureId(lastId);
        hookHistory();
        keys = new AbortController();
        const { signal } = keys;
        window.addEventListener("keydown", onKeyDown, { capture: true, signal });
        window.addEventListener("keyup", onKeyUp, { capture: true, signal });
        window.addEventListener("popstate", onRoute, { signal });
        document.addEventListener("click", onClickCapture, { capture: true, signal });
        document.addEventListener("click", onDocClick, { signal });
        document.addEventListener("visibilitychange", onVisibility, { signal });
    },

    stop() {
        keys?.abort();
        keys = null;
        unhookHistory();
        open = false;
        held = false;
        ctrlHeld = false;
        detachHost();
    },

    onSettingsChange() {
        const next = capIds(getVisits());
        if (next.length !== getVisits().length) settings.store.visits = next;
        if (open) paint();
    },
});
