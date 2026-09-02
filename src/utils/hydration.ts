/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * chatgpt.com hydrates the entire document (hydrateRoot(document)).
 * Fiber keys appear when hydrateRoot *starts*. Late islands (Recents,
 * avatar, personalized greeting) paint later. Extra head/body siblings
 * during that window drop the islands.
 */

/** Conversation rows in the sidebar. SSR chrome does not include these. */
export function hasRecentsIsland(): boolean {
    try {
        return !!document.querySelector('a[href^="/c/"]');
    } catch {
        return false;
    }
}

/** Logged-in profile image, not the gray SSR placeholder. */
export function hasAvatarIsland(): boolean {
    try {
        const nodes = document.querySelectorAll(
            '[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img',
        );
        for (const node of nodes) {
            if (!(node instanceof HTMLImageElement)) continue;
            if (!node.isConnected) continue;
            if (node.naturalWidth > 1) return true;
        }
        return false;
    } catch {
        return false;
    }
}

/** Personalized homepage greeting. The SSR fallback is the agenda line. */
export function hasGreetingIsland(): boolean {
    try {
        const heading = document.querySelector("h1");
        const text = (heading?.textContent ?? "").replace(/\s+/g, " ").trim();
        if (!text) return false;
        if (/what's on the agenda/i.test(text)) return false;
        return /^(hey|hello|good\s)/i.test(text);
    } catch {
        return false;
    }
}

/** True when at least one late client island has painted. */
export function hasLateIslands(): boolean {
    return hasRecentsIsland() || hasAvatarIsland() || hasGreetingIsland();
}

export function hasComposer(): boolean {
    try {
        return !!document.querySelector("#prompt-textarea");
    } catch {
        return false;
    }
}

export function isDocumentInteractive(): boolean {
    return hasLateIslands();
}
