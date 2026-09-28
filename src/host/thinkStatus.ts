/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Short Thinking / Working / Configuring labels. Helium Pro keeps the
 * dropdown or a GPT tool row after composer Stop remounts as Voice/Send.
 * A paragraph that mentions the words is not a status. Finished
 * "Analyzed" is idle.
 */

/** Live generate labels only. Finished "Analyzed" / "Thought for" are idle. */
const THINK_LIVE_RE = /^(?:pro[\s-]*thinking|thinking|working|configuring|searching(?:\s+the\s+web)?|analyzing|reading|正在思考|思考中|正在工作|配置中|正在配置|搜索中|正在搜索|分析中|正在分析|读取中|正在阅读)(?:\s*\d+\s*[sm])?(?:…|\.{3})?$/i;

/** GPT tool row title. Helium: "Configuring translation glossary…" (len > 32). */
const TOOL_TITLE_RE = /^(?:configuring|searching(?:\s+the\s+web)?|analyzing|reading|配置中|正在配置|搜索中|正在搜索|分析中|正在分析|读取中|正在阅读)\b/i;

export function isThinkStatusText(text: string): boolean {
    const t = String(text ?? "").replace(/\s+/g, " ").trim();
    if (!t) return false;
    if (t.length <= 32 && THINK_LIVE_RE.test(t)) return true;
    if (t.length > 64 || !TOOL_TITLE_RE.test(t)) return false;
    const body = t.replace(/(?:…|\.{3})$/, "");
    if (/[.!?。]/.test(body)) return false;
    return true;
}

/** Expanded / busy / open details / spinner — not a leftover collapsed Thinking. */
export function isLiveThinkFlags(opts: {
    text?: string;
    ariaLabel?: string;
    ariaExpanded?: string | null;
    ariaBusy?: string | null;
    detailsOpen?: boolean;
    hasSpinner?: boolean;
}): boolean {
    const label = isThinkStatusText(opts.ariaLabel || "") || isThinkStatusText(opts.text || "");
    if (!label) return false;
    if (opts.ariaExpanded === "true") return true;
    if (opts.ariaBusy === "true") return true;
    if (opts.detailsOpen) return true;
    if (opts.hasSpinner) return true;
    return false;
}

function nodeHasSpinner(el: HTMLElement): boolean {
    try {
        return !!el.querySelector("svg.animate-spin, .animate-spin");
    } catch {
        return false;
    }
}

/**
 * One node: short Thinking / Configuring label plus a live flag.
 * A leftover collapsed "Thinking" with no spinner is idle.
 */
export function isLiveThinkNode(node: HTMLElement): boolean {
    const details = node.closest("details");
    return isLiveThinkFlags({
        text: node.childElementCount <= 4 ? (node.textContent || "") : "",
        ariaLabel: node.getAttribute("aria-label") || "",
        ariaExpanded: node.getAttribute("aria-expanded"),
        ariaBusy: node.getAttribute("aria-busy"),
        detailsOpen: details instanceof HTMLDetailsElement && details.open,
        hasSpinner: nodeHasSpinner(node),
    });
}
