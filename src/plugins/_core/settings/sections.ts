/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { button, iconButton, switchControl } from "@components/controls";
import { TIP } from "@components/tooltip";
import { classNameFactory } from "@utils/css";
import { h } from "@utils/dom";
import { copyToClipboard } from "@utils/misc";

import { addOnlineTheme, removeTheme, saveLocalTheme, type Theme, themeSettings, updateTheme } from "../themes";

const cl = classNameFactory("bloom-settings-");

const REMOVE_CONFIRM_MS = 3000;

const cssArea = (value: string, label: string) => {
    const area = h("textarea", { class: `bloom-input ${cl("css")}`, attrs: { "spellcheck": "false", "placeholder": "Paste your CSS here...", "aria-label": label } });
    area.value = value;
    return area;
};

const sectionHeader = (title: string, description: string) =>
    h("div", { class: cl("section-header") }, h("div", { class: cl("field-label"), text: title }), h("div", { class: cl("field-desc"), text: description }));

export function quickCssView() {
    const { quickCss, quickCssEnabled } = themeSettings.store;
    const area = cssArea(quickCss, "Quick CSS");
    area.disabled = !quickCssEnabled;
    area.addEventListener("input", () => {
        themeSettings.store.quickCss = area.value;
    });
    return h("div", { class: cl("section") },
        h("div", { class: cl("field", "field-inline") },
            sectionHeader("Quick CSS", "Your own CSS, applied on every page as you type."),
            switchControl(quickCssEnabled, enabled => {
                themeSettings.store.quickCssEnabled = enabled;
                area.disabled = !enabled;
            }, "Enable Quick CSS")),
        area);
}

export function themesView() {
    const view = h("div", { class: cl("section") });
    let editing: Theme | "new" | null = null;

    const errorLine = () => h("div", { class: cl("section-error"), attrs: { role: "alert" } });

    function onlineBlock() {
        const input = h("input", { class: "bloom-input", attrs: { "type": "url", "placeholder": "https://raw.githubusercontent.com/...", "aria-label": "Theme URL" } });
        const error = errorLine();
        const add = button("Add", async () => {
            add.disabled = true;
            error.textContent = "";
            try {
                await addOnlineTheme(input.value.trim());
                render();
            } catch (e) {
                error.textContent = e instanceof Error ? e.message : String(e);
                add.disabled = false;
            }
        });
        return h("div", { class: cl("section-block") },
            sectionHeader("Online themes", "Load a theme from a .css URL. It is fetched again on every page load, so updates apply."),
            h("div", { class: cl("section-row") }, input, add),
            error);
    }

    function localEditor() {
        const theme = editing === "new" ? null : editing;
        const name = h("input", { class: "bloom-input", attrs: { "placeholder": "My theme", "aria-label": "Theme name" } });
        name.value = theme?.name ?? "";
        const area = cssArea(theme?.css ?? "", "Theme CSS");
        const error = errorLine();
        return h("div", { class: cl("section-block") },
            name,
            area,
            error,
            h("div", { class: cl("section-row") },
                button("Save", () => {
                    try {
                        saveLocalTheme(theme?.id ?? null, name.value, area.value);
                        editing = null;
                        render();
                    } catch (e) {
                        error.textContent = e instanceof Error ? e.message : String(e);
                    }
                }),
                button("Cancel", () => {
                    editing = null;
                    render();
                })));
    }

    function localBlock() {
        return h("div", { class: cl("section-block") },
            h("div", { class: cl("field", "field-inline") },
                sectionHeader("Local themes", "CSS stored only on this device."),
                !editing && button("New local theme", () => {
                    editing = "new";
                    render();
                })),
            editing && localEditor());
    }

    function themeRow(theme: Theme) {
        let armed: ReturnType<typeof setTimeout> | undefined;
        const remove = iconButton("trash", "Remove", () => {
            if (armed) {
                clearTimeout(armed);
                removeTheme(theme.id);
                render();
                return;
            }
            remove.setAttribute("aria-pressed", "true");
            remove.setAttribute(TIP, "Click again to remove");
            armed = setTimeout(() => {
                armed = undefined;
                remove.removeAttribute("aria-pressed");
                remove.setAttribute(TIP, "Remove");
            }, REMOVE_CONFIRM_MS);
        });
        return h("div", { class: cl("theme") },
            h("div", { class: cl("theme-text") },
                h("div", { class: `${cl("card-name")} bloom-truncate`, text: theme.name }),
                h("div", { class: `${cl("field-desc")} bloom-truncate`, text: theme.url ?? "Local" })),
            theme.url
                ? iconButton("copy", "Copy URL", () => void copyToClipboard(theme.url ?? ""))
                : iconButton("edit", "Edit", () => {
                    editing = theme;
                    render();
                }),
            remove,
            switchControl(theme.enabled, enabled => updateTheme(theme.id, { enabled }), `Enable ${theme.name}`));
    }

    function render() {
        const { themes } = themeSettings.store;
        view.replaceChildren(
            onlineBlock(),
            localBlock(),
            themes.length ? h("div", { class: cl("themes") }, ...themes.map(themeRow)) : h("div", { class: cl("empty"), text: "No themes yet." }));
    }

    render();
    return view;
}
