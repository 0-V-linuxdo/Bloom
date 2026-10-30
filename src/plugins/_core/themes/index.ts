/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { Logger } from "@utils/Logger";
import { download, uniqueId } from "@utils/misc";
import definePlugin, { OptionType, StartAt } from "@utils/types";

const logger = new Logger("Themes");

const THEME_URL = /^https:\/\/\S+\.css(?:[?#]|$)/i;
const META_NAME = /\/\*\*[^]*?@name[ \t]+([^\n*]+)/;

export interface Theme {
    id: string;
    name: string;
    url?: string;
    css: string;
    enabled: boolean;
}

export const themeSettings = definePluginSettings({
    themes: { type: OptionType.CUSTOM, default: [] as Theme[] },
    quickCss: { type: OptionType.CUSTOM, default: "" },
    quickCssEnabled: { type: OptionType.CUSTOM, default: true },
});

async function fetchCss(url: string) {
    const css = new TextDecoder().decode(await download(url));
    if (!css.trim()) throw new Error("Theme file is empty.");
    return css;
}

export const updateTheme = (id: string, patch: Partial<Theme>) => {
    themeSettings.store.themes = themeSettings.store.themes.map(theme => theme.id === id ? { ...theme, ...patch } : theme);
};

export const removeTheme = (id: string) => {
    themeSettings.store.themes = themeSettings.store.themes.filter(theme => theme.id !== id);
};

export async function addOnlineTheme(url: string) {
    if (!THEME_URL.test(url)) throw new Error("Enter an https URL that ends in .css.");
    if (themeSettings.store.themes.some(theme => theme.url === url)) throw new Error("This theme is already added.");
    const css = await fetchCss(url);
    const name = css.match(META_NAME)?.[1]?.trim() || decodeURIComponent(new URL(url).pathname.split("/").pop() ?? url).replace(/\.css$/i, "").replaceAll(/[-_]/g, " ");
    themeSettings.store.themes = [...themeSettings.store.themes, { id: uniqueId("theme"), name, url, css, enabled: true }];
}

export function saveLocalTheme(id: string | null, name: string, css: string) {
    if (!name.trim()) throw new Error("Name is required.");
    if (!css.trim()) throw new Error("CSS is required.");
    if (id) updateTheme(id, { name: name.trim(), css });
    else themeSettings.store.themes = [...themeSettings.store.themes, { id: uniqueId("theme"), name: name.trim(), css, enabled: true }];
}

async function refreshOnline() {
    await Promise.all(themeSettings.store.themes.filter(theme => theme.url && theme.enabled).map(async ({ id, url, name }) => {
        try {
            const css = await fetchCss(url ?? "");
            if (themeSettings.store.themes.find(theme => theme.id === id)?.css !== css) updateTheme(id, { css });
        } catch (e) {
            logger.warn(`Failed to refresh theme "${name}"`, e);
        }
    }));
}

export default definePlugin({
    name: "Themes",
    description: "Applies Bloom++ themes and Quick CSS.",
    authors: ["Bloom contributors"],
    tags: [],
    icon: "spark",
    required: true,
    hidden: true,
    startAt: StartAt.Init,
    settings: themeSettings,
    styles: () => [
        ...themeSettings.store.themes.filter(theme => theme.enabled).map(theme => theme.css),
        themeSettings.store.quickCssEnabled ? themeSettings.store.quickCss : "",
    ].join("\n"),
    start() {
        void refreshOnline();
    },
});
