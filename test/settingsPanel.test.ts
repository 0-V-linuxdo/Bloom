/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { afterEach, describe, expect, test } from "bun:test";

import { registerPlugins } from "../src/api/PluginManager";
import { readSetting } from "../src/api/Settings";
import Settings from "../src/plugins/_core/settings";
import { closePanel, openPanel } from "../src/plugins/_core/settings/panel";
import NoDictation from "../src/plugins/noDictation";

registerPlugins([Settings, NoDictation]);

const ENTRY_SWITCHES = 3;
const cardNamed = (name: string) => [...document.querySelectorAll(".bloom-settings-card")].find(el => el.querySelector(".bloom-settings-card-name")?.textContent === name);

afterEach(() => {
    closePanel();
    document.body.replaceChildren();
    document.adoptedStyleSheets = [];
});

describe("settings cards", () => {
    test("section tabs sit beside the title", () => {
        openPanel();
        const header = document.querySelector(".bloom-settings-header");
        const nav = header?.querySelector(".bloom-settings-nav");
        const tabs = document.querySelector(".bloom-settings-tabs");
        expect(nav).toBeTruthy();
        expect([...nav!.querySelectorAll("[role=tab]")].map(el => el.textContent)).toEqual(["Plugins", "Themes", "Quick CSS"]);
        expect(header?.querySelector(".bloom-settings-version")?.textContent).toMatch(/^v/);
        expect(tabs?.closest(".bloom-settings-body")).toBeTruthy();
        expect(header?.contains(tabs)).toBe(false);
        openPanel("themes");
        expect(document.querySelector(".bloom-settings-header .bloom-settings-nav")).toBeTruthy();
        expect(document.querySelector(".bloom-settings-tabs")).toBeNull();
        openPanel("css");
        expect(document.querySelector(".bloom-settings-header .bloom-settings-nav")).toBeTruthy();
        expect(document.querySelector(".bloom-settings-tabs")).toBeNull();
        openPanel("plugins");
    });

    test("keeps a switch on every plugin and separates required ones", () => {
        openPanel();
        const dictation = cardNamed("NoDictation");
        const settings = cardNamed("Settings");
        expect(dictation?.querySelector(".bloom-switch")?.getAttribute("aria-checked")).toBe("false");
        expect(dictation?.querySelector(".bloom-switch")?.hasAttribute("aria-disabled")).toBe(false);
        expect(settings?.classList.contains("bloom-settings-card-required")).toBe(true);
        expect(settings?.querySelector(".bloom-switch")?.getAttribute("aria-checked")).toBe("true");
        expect(settings?.querySelector(".bloom-switch")?.getAttribute("aria-disabled")).toBe("true");
        expect(settings?.querySelector("[aria-label='Pin to top']")).toBeNull();
        expect(settings?.querySelector("[aria-label='Required']")).toBeTruthy();
        const rule = document.querySelector(".bloom-settings-required-break");
        expect(rule).toBeTruthy();
        expect(rule!.compareDocumentPosition(settings!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        expect(rule!.compareDocumentPosition(dictation!) & Node.DOCUMENT_POSITION_PRECEDING).toBeTruthy();
        settings?.querySelector<HTMLButtonElement>(".bloom-switch")?.click();
        expect(settings?.querySelector(".bloom-switch")?.getAttribute("aria-checked")).toBe("true");
    });

    test("the last remaining Settings entry switch stays on", () => {
        openPanel();
        cardNamed("Settings")?.querySelector<HTMLButtonElement>("[aria-label='Settings']")?.click();
        const switches = [...document.querySelectorAll<HTMLButtonElement>('.bloom-settings-popup [role="switch"]')].slice(0, ENTRY_SWITCHES);
        expect(switches.map(el => el.getAttribute("aria-checked"))).toEqual(["true", "false", "false"]);
        switches[0]?.click();
        expect(switches[0]?.getAttribute("aria-checked")).toBe("true");
        expect(readSetting("Settings", "showSidebarEntry") ?? true).toBe(true);
    });

    test("NoDictation hide rules do not cover Bloom's own switches", () => {
        document.body.innerHTML = [
            '<div class="bloom-root"><div role="dialog"><button class="bloom-switch" data-bloom="control" aria-label="Enable NoDictation"></button></div></div>',
            '<form><button aria-label="Start dictation"></button></form>',
            '<div role="dialog"><button role="switch" aria-label="Dictation"></button></div>',
        ].join("");
        const rule = typeof NoDictation.styles === "function" ? NoDictation.styles() : NoDictation.styles ?? "";
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(rule);
        document.adoptedStyleSheets = [sheet];
        const bloom = document.querySelector<HTMLElement>(".bloom-switch")!;
        const composer = document.querySelector<HTMLElement>("form button")!;
        const host = document.querySelector<HTMLElement>("[role='switch']")!;
        expect(getComputedStyle(bloom).display).not.toBe("none");
        expect(getComputedStyle(composer).display).toBe("none");
        expect(getComputedStyle(host).display).toBe("none");
    });
});
