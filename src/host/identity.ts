/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { hostMutations, watchBody } from "@utils/dom";

import { whenHostReady } from "./ready";
import { accountMenu, markIdentity, profileChips } from "./sidebar";

let users = 0;
let unwatch: (() => void) | undefined;

function mark(mutations: MutationRecord[]) {
    if (!hostMutations(mutations)) return;
    for (const chip of profileChips()) markIdentity(chip, "profile");
    const menu = accountMenu();
    if (menu) markIdentity(menu, "menu");
}

export function useIdentityMarks() {
    users++;
    let active = true;
    void whenHostReady().then(() => {
        if (active && users && !unwatch) unwatch = watchBody(mark);
    });
    return () => {
        if (!active) return;
        active = false;
        if (--users) return;
        unwatch?.();
        unwatch = undefined;
    };
}
