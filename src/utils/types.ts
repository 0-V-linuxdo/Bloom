/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Plugin contract adapted from Void++ (GPL-3.0-or-later).
 */

export const enum StartAt {
    Init = "Init",
    DOMContentLoaded = "DOMContentLoaded",
    HostShell = "HostShell",
    HostReady = "HostReady",
}

export const enum OptionType {
    STRING,
    NUMBER,
    BOOLEAN,
    SELECT,
    SLIDER,
    COMPONENT,
}

export interface SelectOption {
    label: string;
    value: string;
    default?: boolean;
}

export interface SettingDef {
    type: OptionType;
    description?: string;
    default?: unknown;
    min?: number;
    max?: number;
    options?: readonly SelectOption[];
    render?: (el: HTMLElement) => () => void;
    hidden?: boolean;
}

export type SettingsDefinition = Record<string, SettingDef>;

export interface DefinedSettings {
    def: SettingsDefinition;
    pluginName: string;
    store: Record<string, unknown>;
    plain: Record<string, unknown>;
}

export interface PluginDef {
    name: string;
    description: string;
    authors: string[];
    tags?: string[];
    enabledByDefault?: boolean;
    required?: boolean;
    hidden?: boolean;
    startAt?: StartAt;
    icon?: string;
    settings?: DefinedSettings;
    managedStyle?: string;
    cleanupSelectors?: string[];
    start?(): void;
    stop?(): void;
    onSettingsChange?(): void;
}

export type Plugin = PluginDef;

export default function definePlugin<P extends PluginDef>(p: P): P & Plugin {
    return p as P & Plugin;
}
