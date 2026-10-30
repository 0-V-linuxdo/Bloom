/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { isVisible } from "@utils/dom";

function visitShadows(root: ParentNode, visit: (shadow: ShadowRoot) => void) {
    const nodes = root instanceof Element ? [root, ...root.querySelectorAll("*")] : [...root.querySelectorAll("*")];
    for (const node of nodes) {
        const shadow = node.shadowRoot;
        if (!shadow) continue;
        visit(shadow);
        visitShadows(shadow, visit);
    }
}

export function queryAll<T extends Element>(selector: string, root: ParentNode = document): T[] {
    const out = [...root.querySelectorAll<T>(selector)];
    visitShadows(root, shadow => out.push(...shadow.querySelectorAll<T>(selector)));
    return out;
}

export const queryVisible = <T extends Element>(selector: string, root: ParentNode = document) =>
    queryAll<T>(selector, root).find(isVisible) ?? null;
