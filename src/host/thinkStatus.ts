/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Short Thinking / Working labels. Helium Pro keeps this dropdown after
 * composer Stop remounts as Voice/Send. A paragraph that mentions the
 * words is not a status.
 */

const THINK_LIVE_RE = /^(?:pro[\s-]*thinking|thinking|working|正在思考|思考中|正在工作)(?:\s*\d+\s*[sm])?(?:…|\.{3})?$/i;

export function isThinkStatusText(text: string): boolean {
    const t = String(text ?? "").replace(/\s+/g, " ").trim();
    return t.length > 0 && t.length <= 32 && THINK_LIVE_RE.test(t);
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
