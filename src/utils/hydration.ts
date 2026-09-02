/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * chatgpt.com hydrates the entire document (hydrateRoot(document)).
 * Extra siblings under <html> or early <head>/<body> writes drop Recents,
 * avatar, and the document-level React click/keyboard delegation.
 */

function hasReactInternal(node: object | null | undefined): boolean {
    if (!node) return false;
    for (const key of Object.keys(node)) {
        if (
            key.startsWith("__reactFiber")
            || key.startsWith("__reactContainer")
            || key.startsWith("__reactEvents")
        ) return true;
    }
    return false;
}

export function hasReactHost(): boolean {
    return hasReactInternal(document)
        || hasReactInternal(document.documentElement)
        || hasReactInternal(document.body);
}

export function hasRouterContext(): boolean {
    try {
        return !!(window as unknown as { __reactRouterContext?: unknown }).__reactRouterContext;
    } catch {
        return false;
    }
}

export function isDocumentInteractive(): boolean {
    return hasReactHost();
}
