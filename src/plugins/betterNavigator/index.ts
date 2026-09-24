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
 * Rail `right` follows the inner message column
 * (`--thread-content-max-width` / turn wrapper), not `#thread`'s
 * viewport edge. Hover menu is Void-sized (min 18rem / 70vw).
 * Tick glyphs follow Notion-style-AI-Navigator (1.25/1.75rem × 2px,
 * 1rem gap, 0.125rem radius, current glow) — not Void mini-pills.
 * Live dash: the in-progress assistant tick only. Turn-level
 * aria-busy / .result-streaming (not a nested citation or filmstrip),
 * the last assistant still thinking with an empty markdown, or a
 * visible "Pro thinking" status (agent tool gaps drop Stop). Harvest
 * generate-arm or a visible Stop still arm the dash; Pro thinking
 * alone is enough because that footer only shows while the reply runs.
 * lookSettled (Void++ c91c194) forces the dash off once Stop is gone
 * and the turn has copy/good/bad, markdown/prose, or a generated image
 * — unless Pro thinking is still on screen. Leftover <details> /
 * descendant aria-busy do not keep it. Never raw isStreaming(), never
 * the previous finished reply, no streamEnd, no Grok stores.
 * Collect mounted conversation-turn sections (data-turn user|assistant).
 * Image-gen assistant turns have no data-message-id / author-role; one
 * tick per data-turn-id (filmstrip thumbs are not extra ticks).
 * Hover marks follow Void++ ❓/🤖 — never You/GPT text. Empty image-gen
 * labels are `Image xN` (unique estuary file_* in the turn; n<2 stays Image).
 * File-only turns use the chip filename (else File), not Message N.
 * Decorative imgs (favicon, ≤48px, citation/tool) are not Image.
 * Tool rows stay inside the assistant tick — never one tick per tool.
 */

import { definePluginSettings } from "../../api/Settings";
import { getStopButton } from "../../host/composer";
import { currentConversationId } from "../../host/conversation";
import { subscribeHarvest, type HarvestEvent } from "../../host/harvest";
import { getProStopButton, isDraftMigrate, streamingSuppressed, watchStreamingEdge } from "../../host/streaming";
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
const IMAGE_LABEL = "Image";
const USER_MARK = "❓";
const ASST_MARK = "🤖";
const FILE_ID_RE = /file_[0-9a-f]+/gi;
const FILE_LABEL = "File";
const CODE_LABEL = "Code";
const CONTENT_SEL = ".markdown, .whitespace-pre-wrap";
const FILE_CHIP_SEL = [
    "a[download]",
    "[class*='attachment']",
    "[data-testid*='file' i]",
    "[data-testid*='attachment' i]",
].join(", ");
const MEDIA_SEL = "img, picture, video, canvas";
const FILE_EXT = /\.(?:epub|pdf|docx?|xlsx?|pptx?|txt|md|csv|json|zip|rar|7z|png|jpe?g|gif|webp|svg|mp3|mp4|wav|m4a|html?|py|js|ts|tsx|css|c|cpp|java|go|rs|rb|xml|ya?ml)$/i;
const FILE_TRUNC = /\.[A-Za-z0-9]{1,8}(?:…|\.\.\.)?$/;
const TYPE_WORD = /^(?:file|image|pdf|epub|document|attachment|video|audio|code|zip|png|jpe?g|gif|webp|txt|markdown|文件|图片|附件|文档)$/i;
const DECORATIVE_SRC = /favicon|iconify|shields\.io|badgen\.net|google\.com\/s2\/favicons|gstatic\.com\/favicon/i;
const PRO_LIVE_RE = /^(?:pro thinking|thinking(?:…|\.\.\.)?|正在思考|思考中)$/i;
const SKIP_STATUS_RE = /^(?:pro thinking|thinking(?:…|\.\.\.)?|reasoning|thoughts?|正在思考|思考中|已思考.*|thought for\b.*|worked for\b.*|思考了.*|思考用时.*)$/i;
const TOOL_LINE_RE = /^(?:inspected|analyzed|translated|validated|searched|reviewed|extracted|packaged|已检查|已分析|已翻译|已验证|搜索了|已搜索)\b/i;
const CHIP_LINE_RE = /^(?:\d+\s+)?(?:sources?|websites?)$|^web search$|^zh-cn$|^zh$|^en(?:-[a-z]{2})?$/i;
const WEAK_LABEL_RE = /^(?:Image(?: x\d+)?|File|Code|Message \d+)$/;
/** Footer controls that appear only after ChatGPT finishes the turn. Not code-block Copy. */
const DONE_ACTION_SEL = [
    'button[data-testid="copy-turn-action-button"]',
    'button[data-testid="good-response-turn-action-button"]',
    'button[data-testid="bad-response-turn-action-button"]',
    'button[aria-label="Good response"]',
    'button[aria-label="Bad response"]',
    'button[aria-label="好评"]',
    'button[aria-label="差评"]',
].join(", ");
/** Keep a fresh generate-arm across the gap before the new bubble mounts. */
const ARM_HOLD_MS = 2000;
const HOST_W = 40;
const COL_CLASS = /thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/;

const TURN_SEL = [
    'section[data-testid^="conversation-turn-"][data-turn="user"]',
    'section[data-testid^="conversation-turn-"][data-turn="assistant"]',
    'article[data-testid^="conversation-turn-"][data-turn="user"]',
    'article[data-testid^="conversation-turn-"][data-turn="assistant"]',
].join(", ");

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
const imageCounts = new Map<string, number>();
const armedIds = new Set<string>();
let armedAt = 0;

let started = false;
let pendingNew = false;
let ignoreStop = false;
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

function parseCssLen(raw: string): number {
    const t = raw.trim();
    if (!t) return 0;
    const n = Number.parseFloat(t);
    if (!Number.isFinite(n)) return 0;
    if (t.endsWith("rem")) return n * 16;
    return n;
}

function classNameOf(el: Element): string {
    const v = (el as HTMLElement).className;
    if (typeof v === "string") return v;
    return el.getAttribute("class") || "";
}

/** Inner message column — never `#thread` itself (that box hugs the page scrollbar). */
function contentColumnRect(thread: HTMLElement): DOMRect {
    const thr = thread.getBoundingClientRect();
    let wrap: HTMLElement | null = null;
    try {
        const turn = thread.querySelector<HTMLElement>(
            "[data-message-id], [data-testid^='conversation-turn-']",
        );
        const inner = turn?.querySelector<HTMLElement>(
            '[class*="thread-content-max-width"], [class*="max-w-(--thread-content"]',
        );
        let n: HTMLElement | null = inner ?? turn;
        while (n && n !== thread) {
            if (COL_CLASS.test(classNameOf(n))) wrap = n;
            n = n.parentElement;
        }
    } catch { /* ignore */ }
    if (!wrap) {
        try {
            const bottom = document.getElementById("thread-bottom-container");
            const inner = bottom?.querySelector<HTMLElement>(
                '[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]',
            );
            if (inner) {
                const r = inner.getBoundingClientRect();
                if (r.width > 160) wrap = inner;
            }
        } catch { /* ignore */ }
    }
    if (wrap) {
        const r = wrap.getBoundingClientRect();
        if (r.width > 160 && r.width <= thr.width + 8) return r;
    }
    let cap = 0;
    try {
        cap = parseCssLen(getComputedStyle(thread).getPropertyValue("--thread-content-max-width"))
            || parseCssLen(getComputedStyle(thread).getPropertyValue("--thread-content-width"))
            || parseCssLen(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"));
    } catch { /* ignore */ }
    if (cap > 160) {
        const w = Math.min(cap, thr.width);
        const left = thr.left + Math.max(0, (thr.width - w) / 2);
        return new DOMRect(left, thr.top, w, thr.height);
    }
    return thr;
}

function skipNode(el: Element): boolean {
    try {
        return !!el.closest(SKIP);
    } catch {
        return true;
    }
}

function roleOf(el: HTMLElement): Role | null {
    const turn = (el.getAttribute("data-turn")
        || el.closest("[data-turn]")?.getAttribute("data-turn")
        || "").toLowerCase();
    if (turn === "user" || turn === "assistant") return turn;
    const roleAttr = (el.getAttribute("data-message-author-role")
        || el.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role")
        || el.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")
        || "").toLowerCase();
    if (roleAttr === "user" || roleAttr === "assistant") return roleAttr;
    try {
        const heading = (el.querySelector("h4.sr-only, h5.sr-only, h6.sr-only")?.textContent || "").toLowerCase();
        if (heading.includes("you said")) return "user";
        if (heading.includes("chatgpt said") || heading.includes("assistant said")) return "assistant";
    } catch { /* ignore */ }
    const aria = (el.getAttribute("aria-label") || "").toLowerCase();
    if (aria.includes("you said")) return "user";
    if (aria.includes("chatgpt said") || aria.includes("assistant said")) return "assistant";
    return null;
}

function turnIdOf(el: HTMLElement): string {
    return el.getAttribute("data-turn-id")
        || el.getAttribute("data-message-id")
        || el.querySelector("[data-message-id]")?.getAttribute("data-message-id")
        || "";
}

function isImageGen(el: HTMLElement): boolean {
    try {
        if (el.querySelector("[class*='imagegen-image']")) return true;
        if (el.querySelector('img[alt="Generated image"], img[alt^="Generated image"]')) return true;
    } catch { /* ignore */ }
    return false;
}

function isUploadNode(node: Element): boolean {
    try {
        return !!node.closest("[class*='message-image']");
    } catch {
        return true;
    }
}

function collectFileIds(raw: string, into: Set<string>) {
    if (!raw) return;
    FILE_ID_RE.lastIndex = 0;
    for (const m of raw.matchAll(FILE_ID_RE)) into.add(m[0].toLowerCase());
}

/** Unique generated variants in this turn — not img nodes, not shared #image-{turn-id}. */
function imageVariantCount(el: HTMLElement): number {
    try {
        const ids = new Set<string>();
        const addNode = (node: Element) => {
            if (isUploadNode(node)) return;
            collectFileIds(node.getAttribute("src") || "", ids);
            collectFileIds(node.getAttribute("srcset") || "", ids);
            collectFileIds(node.getAttribute("href") || "", ids);
            if (node instanceof HTMLImageElement) collectFileIds(node.currentSrc || "", ids);
        };
        for (const node of el.querySelectorAll("[class*='imagegen-image']")) {
            addNode(node);
            for (const inner of node.querySelectorAll("[src], [srcset], [href]")) addNode(inner);
        }
        for (const img of el.querySelectorAll('img[alt="Generated image"], img[alt^="Generated image"]')) {
            addNode(img);
        }
        if (ids.size) return ids.size;

        const wraps = el.querySelectorAll("[class*='group/imagegen-image']");
        let n = wraps.length;
        if (!n) return 0;
        const turnId = turnIdOf(el);
        const hero = turnId
            ? el.querySelector(`#image-${CSS.escape(turnId)}`)
            : el.querySelector("[id^='image-']:not([id^='image-gen-'])");
        if (hero && n >= 2) n -= 1;
        return n;
    } catch {
        return 0;
    }
}

function imageLabelOf(el: HTMLElement, id: string): string {
    const n = imageVariantCount(el);
    const prev = imageCounts.get(id) ?? 0;
    const max = Math.max(prev, n);
    if (max > 0) imageCounts.set(id, max);
    return max >= 2 ? `${IMAGE_LABEL} x${max}` : IMAGE_LABEL;
}

function normSpace(raw: string): string {
    return raw.replace(/\s+/g, " ").trim();
}

/** Noise inside `root` only. A thinking wrapper *around* the root must not blank it. */
function noiseInside(start: Element, root: HTMLElement): boolean {
    let n: Element | null = start;
    while (n && n !== root) {
        if (n.matches(NOISE)) return true;
        n = n.parentElement;
    }
    return false;
}

function extractText(root: HTMLElement): string {
    const parts: string[] = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            try {
                if (noiseInside(parent, root)) return NodeFilter.FILTER_REJECT;
            } catch {
                return NodeFilter.FILTER_REJECT;
            }
            const t = normSpace(node.textContent || "");
            return t ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        },
    });
    let node: Node | null;
    while ((node = walker.nextNode()) && parts.join(" ").length < CLIP + 20) {
        parts.push(normSpace(node.textContent || ""));
    }
    return normSpace(parts.join(" "));
}

function isFileName(raw: string): boolean {
    const t = normSpace(raw);
    if (t.length < 3 || t.length > 180 || /\s/.test(t)) return false;
    if (TYPE_WORD.test(t)) return false;
    if (FILE_EXT.test(t)) return true;
    return FILE_TRUNC.test(t) && /[_\-.]/.test(t);
}

function rememberName(raw: string, into: string[]) {
    const t = normSpace(raw);
    if (!t) return;
    const base = t.split(/[/\\]/).pop() || t;
    if (isFileName(base) && !into.includes(base)) into.push(base);
}

function chipLines(node: HTMLElement): string[] {
    const lines: string[] = [];
    const push = (raw: string) => {
        const t = normSpace(raw);
        if (!t) return;
        const split = t.match(/^(.*\S)\s+(file|image|pdf|epub|document|attachment|文件|图片|附件|文档)$/i);
        if (split) {
            lines.push(normSpace(split[1]));
            lines.push(normSpace(split[2]));
            return;
        }
        lines.push(t);
    };
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
    let n: Node | null;
    while ((n = walker.nextNode())) push(n.textContent || "");
    return lines;
}

/** Filename on a file chip, else "File" when a chip exists with no name. */
function fileLabelOf(el: HTMLElement): string {
    const names: string[] = [];
    try {
        for (const node of el.querySelectorAll<HTMLElement>(FILE_CHIP_SEL)) {
            const dl = node.getAttribute("download");
            if (dl) rememberName(dl, names);
            rememberName(node.getAttribute("title") || "", names);
            rememberName(node.getAttribute("aria-label") || "", names);
            for (const line of chipLines(node)) rememberName(line, names);
        }
        if (!names.length) {
            for (const node of el.querySelectorAll<HTMLElement>("button, a, [role='button']")) {
                if (node.closest("[data-testid*='action-button'], [role='toolbar']")) continue;
                const lines = chipLines(node);
                const fileLine = lines.find(isFileName);
                if (!fileLine) continue;
                if (lines.some(line => TYPE_WORD.test(line)) || lines.length <= 3) names.push(fileLine);
            }
        }
    } catch { /* ignore */ }
    if (names.length) return clipText(names[0]);
    try {
        if (el.querySelector(FILE_CHIP_SEL)) return FILE_LABEL;
    } catch { /* ignore */ }
    return "";
}

function isDecorativeMedia(node: Element): boolean {
    try {
        if (node.closest("[class*='imagegen-image'], [class*='message-image']")) return false;
        const img = node instanceof HTMLImageElement ? node : node.querySelector("img");
        if (img instanceof HTMLImageElement) {
            const alt = img.getAttribute("alt") || "";
            if (/^Generated image/i.test(alt)) return false;
            const src = `${img.getAttribute("src") || ""} ${img.getAttribute("srcset") || ""}`;
            if (DECORATIVE_SRC.test(src)) return true;
        }
        if (node.closest("[data-testid*='citation'], [class*='citation'], [class*='tool-message'], [data-testid*='tool']")) {
            return true;
        }
        const rect = node.getBoundingClientRect();
        const w = rect.width || Number(img?.getAttribute("width")) || 0;
        const h = rect.height || Number(img?.getAttribute("height")) || 0;
        if ((w > 0 && w <= 48) || (h > 0 && h <= 48)) return true;
        if (w > 48 || h > 48) return false;
    } catch { /* ignore */ }
    return true;
}

function hasContentImage(el: HTMLElement): boolean {
    try {
        for (const node of el.querySelectorAll(MEDIA_SEL)) {
            if (!isDecorativeMedia(node)) return true;
        }
    } catch { /* ignore */ }
    return false;
}

function isSkipLine(raw: string): boolean {
    const t = normSpace(raw).replace(/^[^a-zA-Z\u4e00-\u9fff]+/, "");
    if (!t) return true;
    if (TOOL_LINE_RE.test(t) || SKIP_STATUS_RE.test(t)) return true;
    return t.length <= 24 && (CHIP_LINE_RE.test(t) || TYPE_WORD.test(t));
}

/** Agent/tool prose that is not in `.markdown` — not tool rows, not the Pro thinking footer. */
function looseProse(root: HTMLElement): string {
    const blocks: string[] = [];
    const seen = new Set<string>();
    const take = (node: HTMLElement) => {
        try {
            if (noiseInside(node, root)) return;
            if (node.closest(FILE_CHIP_SEL)) return;
        } catch {
            return;
        }
        const t = extractText(node);
        if (!t || seen.has(t) || isSkipLine(t)) return;
        seen.add(t);
        blocks.push(t);
    };
    try {
        for (const node of root.querySelectorAll<HTMLElement>("p, li, h1, h2, h3, blockquote")) {
            take(node);
            if (blocks.join(" ").length > CLIP + 20) break;
        }
        if (!blocks.length) {
            for (const node of root.querySelectorAll<HTMLElement>("div, span")) {
                if (node.querySelector("div, p, li")) continue;
                if (extractText(node).length < 24) continue;
                take(node);
                if (blocks.join(" ").length > CLIP + 20) break;
            }
        }
    } catch { /* ignore */ }
    return normSpace(blocks.join(" "));
}

function bodyText(el: HTMLElement, role: Role): string {
    const chunks: string[] = [];
    try {
        for (const node of el.querySelectorAll<HTMLElement>(CONTENT_SEL)) {
            if (skipNode(node)) continue;
            const t = extractText(node);
            if (!t || isSkipLine(t)) continue;
            chunks.push(t);
            if (chunks.join(" ").length > CLIP + 20) break;
        }
    } catch { /* ignore */ }
    const joined = normSpace(chunks.join(" "));
    if (joined) return joined;
    return role === "assistant" ? looseProse(el) : "";
}

function clipText(raw: string): string {
    return raw.length > CLIP ? `${raw.slice(0, CLIP).trimEnd()}…` : raw;
}

function isWeakLabel(raw: string): boolean {
    return WEAK_LABEL_RE.test(raw);
}

function itemText(el: HTMLElement, role: Role, index: number, live: boolean): string {
    const raw = bodyText(el, role);
    if (raw) return clipText(raw);
    if (live) return LIVE_LABEL;
    const file = fileLabelOf(el);
    if (file) return file;
    if (isImageGen(el)) return imageLabelOf(el, turnIdOf(el));
    try {
        if (hasContentImage(el)) return IMAGE_LABEL;
        if (el.querySelector("pre, code")) return CODE_LABEL;
    } catch { /* ignore */ }
    return `Message ${index + 1}`;
}

/** True generate — harvest SSE arm or a real Stop. Not hydrate aria-busy. */
function generationArmed(): boolean {
    if (pendingNew) return true;
    const id = currentConversationId();
    if (id && armedIds.has(id)) return true;
    if (!ignoreStop && !streamingSuppressed() && stopVisible()) return true;
    return false;
}

function stopVisible(): boolean {
    return !!(getStopButton() || getProStopButton());
}

function noteArm() {
    armedAt = Date.now();
}

function disarm(conversationId?: string) {
    pendingNew = false;
    if (conversationId) armedIds.delete(conversationId);
    const id = currentConversationId();
    if (id) armedIds.delete(id);
}

/** This turn's own streaming marks. Not a nested citation, filmstrip, or source chip. */
function turnBusy(el: HTMLElement): boolean {
    if (el.getAttribute("aria-busy") === "true") return true;
    if (el.classList.contains("result-streaming")) return true;
    const msg = el.querySelector<HTMLElement>('[data-message-author-role="assistant"]');
    if (msg && msg !== el) {
        if (msg.getAttribute("aria-busy") === "true") return true;
        if (msg.classList.contains("result-streaming")) return true;
    }
    return false;
}

/**
 * Last assistant, empty markdown, thinking UI still open.
 * A collapsed "Thought for" <details> after Stop is gone is not live.
 * Image-gen turns have no .markdown — they are not this path.
 */
function thinkingActive(el: HTMLElement): boolean {
    if (isImageGen(el) || !stopVisible()) return false;
    const md = el.querySelector(".markdown");
    const empty = !md || (md instanceof HTMLElement && !extractText(md));
    if (!empty) return false;
    const think = el.querySelector<HTMLElement>("[class*='thinking'], [class*='reasoning']");
    if (!think) return false;
    if (think.getAttribute("aria-busy") === "true" || think.classList.contains("result-streaming")) return true;
    try {
        if (think.querySelector("[aria-busy='true'], .result-streaming")) return true;
    } catch { /* ignore */ }
    const details = think.closest("details") ?? think.querySelector("details");
    return details instanceof HTMLDetailsElement && details.open;
}

/** "Pro thinking" footer. Short label only — a paragraph that mentions the words does not count. */
function proThinkingLive(el: HTMLElement): boolean {
    try {
        for (const node of el.querySelectorAll<HTMLElement>("span, div, p, button")) {
            if (node.childElementCount > 2) continue;
            const t = normSpace(node.textContent || "");
            if (t.length > 32) continue;
            if (PRO_LIVE_RE.test(t)) return true;
        }
    } catch { /* ignore */ }
    return false;
}

/** Spinner inside this turn, not the header options button (hydrate false positive). */
function turnSpinner(el: HTMLElement): boolean {
    try {
        for (const spin of el.querySelectorAll<HTMLElement>("svg.animate-spin, .animate-spin")) {
            if (spin.closest('button[data-testid="conversation-options-button"], #page-header, nav, [data-testid*="citation"]')) continue;
            return true;
        }
    } catch { /* ignore */ }
    return false;
}

/** This assistant node itself looks in-progress. Never pick a victim by "last" for aria-busy. */
function nodeInProgress(el: HTMLElement, lastAssistant: boolean): boolean {
    try {
        if (turnBusy(el)) return true;
        if (!lastAssistant) return false;
        if (thinkingActive(el)) return true;
        if (proThinkingLive(el)) return true;
    } catch { /* ignore */ }
    return false;
}

/**
 * Void++ lookSettled: Stop gone and the turn already shows a finished reply.
 * Done-action buttons, generated images, and prose all win even if aria-busy
 * was left on. Pro thinking still on screen is not finished. Copy inside a
 * code block is not a done action.
 */
function lookSettled(el: HTMLElement | null): boolean {
    if (!el || stopVisible()) return false;
    try {
        if (proThinkingLive(el)) return false;
        if (el.querySelector(DONE_ACTION_SEL)) return true;
        if (isImageGen(el)) return true;
        if (bodyText(el, "assistant")) return true;
    } catch { /* ignore */ }
    return false;
}

/** Drop the harvest latch once the open reply has settled. Not during the mount gap. */
function releaseArmIfSettled(items: NavItem[]) {
    if (stopVisible()) return;
    if (armedAt && Date.now() - armedAt < ARM_HOLD_MS) return;
    const last = [...items].reverse().find(it => it.role === "assistant");
    if (!last || !lookSettled(last.el)) return;
    disarm();
}

function collectNodes(root: HTMLElement): HTMLElement[] {
    const seen = new Set<string>();
    const out: HTMLElement[] = [];
    try {
        for (const node of root.querySelectorAll<HTMLElement>(TURN_SEL)) {
            if (skipNode(node)) continue;
            const id = turnIdOf(node);
            const key = id || `anon:${out.length}`;
            if (seen.has(key)) continue;
            seen.add(key);
            out.push(node);
        }
    } catch { /* ignore */ }
    if (out.length) return out;
    try {
        for (const node of root.querySelectorAll<HTMLElement>("[data-message-id]")) {
            if (skipNode(node)) continue;
            const id = node.getAttribute("data-message-id") || "";
            const key = id || `mid:${out.length}`;
            if (seen.has(key)) continue;
            seen.add(key);
            out.push(node);
        }
    } catch { /* ignore */ }
    return out;
}

function collect(): NavItem[] {
    const root = threadRoot();
    if (!root || root === document.body) return [];
    const showAsst = settings.store.showAssistant !== false;
    const armed = showAsst && generationArmed();
    const nodes = collectNodes(root);
    let lastAsst: HTMLElement | null = null;
    if (showAsst) {
        for (const node of nodes) {
            if (roleOf(node) === "assistant") lastAsst = node;
        }
    }
    const out: NavItem[] = [];
    try {
        for (const node of nodes) {
            const id = turnIdOf(node);
            if (!id) continue;
            const role = roleOf(node);
            if (role !== "user" && role !== "assistant") continue;
            if (role === "assistant" && !showAsst) continue;
            const last = node === lastAsst;
            const marker = last && proThinkingLive(node);
            const spinning = last && armed && turnSpinner(node);
            const live = role === "assistant"
                && (nodeInProgress(node, last) || spinning)
                && !lookSettled(node)
                && (armed || marker);
            const fresh = itemText(node, role, out.length, live);
            if (fresh && fresh !== LIVE_LABEL) {
                const prev = labels.get(id);
                if (!prev || !isWeakLabel(fresh) || isWeakLabel(prev)) {
                    if (fresh !== prev) labels.set(id, fresh);
                }
            }
            const text = live && fresh === LIVE_LABEL ? LIVE_LABEL : (labels.get(id) || fresh);
            out.push({ id, el: node, role, text, live });
        }
    } catch { /* ignore */ }
    releaseArmIfSettled(out);
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
    const col = contentColumnRect(thread);
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
    const hostW = el.offsetWidth || HOST_W;
    const gutter = rect.right - col.right;
    let desiredLeft = gutter >= hostW + 8
        ? col.right + 4
        : col.right - 12 - hostW;
    desiredLeft = Math.min(desiredLeft, rect.right - hostW - 8);
    desiredLeft = Math.max(8, desiredLeft);
    const right = Math.max(8, Math.round(window.innerWidth - desiredLeft - hostW));
    el.hidden = false;
    el.style.top = `${Math.round((top + floor) / 2)}px`;
    el.style.height = "auto";
    el.style.maxHeight = `${Math.round(height)}px`;
    el.style.right = `${right}px`;
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
        mark.className = "bloom-bn-emoji";
        mark.textContent = item.role === "user" ? USER_MARK : ASST_MARK;
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
    imageCounts.clear();
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
        noteArm();
        ignoreStop = false;
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
                if (streamingSuppressed()) {
                    schedulePaint();
                    return;
                }
                if (ignoreStop && !stopVisible()) ignoreStop = false;
                schedulePaint();
            },
            onFall(edge) {
                disarm(edge.conversationId);
                schedulePaint();
            },
            onContext(next, prev) {
                if (!isDraftMigrate(prev, next)) {
                    labels.clear();
                    imageCounts.clear();
                    paintedKey = "";
                    pendingNew = false;
                    const id = currentConversationId();
                    for (const armed of [...armedIds]) {
                        if (armed !== id) armedIds.delete(armed);
                    }
                    ignoreStop = true;
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
        ignoreStop = false;
        armedAt = 0;
        unmount();
        labels.clear();
        imageCounts.clear();
        lastNav = [];
        paintedKey = "";
        removeStyle(STYLE_NAME);
    },
    onSettingsChange() {
        paintedKey = "";
        schedulePaint();
    },
});
