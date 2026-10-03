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
    test("adds a one-click temporary chat control under New chat", () => {
        document.body.innerHTML = '<div data-app-action-sidebar-scroll><a href="/">New chat</a><a href="/c/11111111-1111-4111-8111-111111111111">Everest</a></div>';
        startPhase(StartAt.HostReady);
        const button = document.querySelector<HTMLButtonElement>('[data-bloom="temporary-chat"]')!;
        expect(button.textContent).toBe("Temporary");
        expect(button.compareDocumentPosition(document.querySelector('a[href="/"]')!) & Node.DOCUMENT_POSITION_PRECEDING).toBeTruthy();
        button.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, cancelable: true }));
        expect(location.pathname).toBe("/");
        expect(new URLSearchParams(location.search).get("temporary-chat")).toBe("true");
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
    });
});
