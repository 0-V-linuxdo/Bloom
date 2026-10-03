/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { afterEach, describe, expect, test } from "bun:test";

import { registerPlugins, setPluginEnabled, startPhase } from "../src/api/PluginManager";
import { writeSetting } from "../src/api/Settings";
import TemporaryChat from "../src/plugins/temporaryChat";
import { StartAt } from "../src/utils/types";

registerPlugins([TemporaryChat]);

afterEach(() => {
    setPluginEnabled(TemporaryChat, false);
    writeSetting("TemporaryChat", "enabled");
    writeSetting("TemporaryChat", "openNewAsTemporary", false);
    document.body.replaceChildren();
    history.pushState(null, "", "/");
});

describe("TemporaryChat", () => {
    test("does not add a Temporary button under New chat", () => {
        document.body.innerHTML = '<div data-app-action-sidebar-scroll><a href="/">New chat</a><button data-bloom="temporary-chat">Temporary</button></div>';
        startPhase(StartAt.HostReady);
        expect(document.querySelector('[data-bloom="temporary-chat"]')).toBeNull();
        const link = document.querySelector("a")!;
        const event = new PointerEvent("pointerdown", { bubbles: true, cancelable: true });
        link.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(false);
        expect(location.search).toBe("");
    });

    test("can send New chat to a temporary chat", () => {
        writeSetting("TemporaryChat", "openNewAsTemporary", true);
        document.body.innerHTML = '<nav><a href="/">New chat</a></nav>';
        startPhase(StartAt.HostReady);
        const link = document.querySelector("a")!;
        const event = new PointerEvent("pointerdown", { bubbles: true, cancelable: true });
        link.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(true);
        expect(new URLSearchParams(location.search).get("temporary-chat")).toBe("true");
        expect(document.querySelector('[data-bloom="temporary-chat"]')).toBeNull();
    });
});
