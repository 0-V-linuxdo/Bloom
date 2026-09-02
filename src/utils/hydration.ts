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

/** Conversation / project rows in the sidebar. Present in SSR HTML — not a hydrate signal alone. */
export function hasRecentsIsland(): boolean {
    try {
        return !!document.querySelector('a[href^="/c/"], a[href^="/g/"]');
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

export function hasComposer(): boolean {
    try {
        return !!document.querySelector(
            '#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]',
        );
    } catch {
        return false;
    }
}

/**
 * Composer is client-hydrated. Recents `/c/` and project `/g/` links
 * exist in SSR, so they only count together with the composer (or a
 * real avatar).
 */
export function hasLateIslands(): boolean {
    if (!hasComposer()) return false;
    return hasRecentsIsland() || hasAvatarIsland();
}

export function isDocumentInteractive(): boolean {
    return hasLateIslands();
}
