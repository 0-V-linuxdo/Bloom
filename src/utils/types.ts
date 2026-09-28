/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import type { IconName } from "@components/icons";

export enum StartAt {
    Init = "Init",
    DOMContentLoaded = "DOMContentLoaded",
    HostReady = "HostReady",
}

export enum OptionType {
    STRING = "string",
    NUMBER = "number",
    BOOLEAN = "boolean",
    SELECT = "select",
    SLIDER = "slider",
    COMPONENT = "component",
    CUSTOM = "custom",
}

interface BaseSetting {
    description?: string;
}

export interface BooleanSetting extends BaseSetting {
    type: OptionType.BOOLEAN;
    default: boolean;
}

export interface StringSetting extends BaseSetting {
    type: OptionType.STRING;
    default: string;
    placeholder?: string;
}

export interface NumberSetting extends BaseSetting {
    type: OptionType.NUMBER;
    default: number;
    min?: number;
    max?: number;
}

export interface SliderSetting extends BaseSetting {
    type: OptionType.SLIDER;
    default: number;
    min: number;
    max: number;
    step?: number;
    unit?: string;
}

export interface SelectOption {
    label: string;
    value: string;
}

export interface SelectSetting extends BaseSetting {
    type: OptionType.SELECT;
    options: readonly SelectOption[];
    default: string;
}

export interface ComponentSetting extends BaseSetting {
    type: OptionType.COMPONENT;
    render(host: HTMLElement): () => void;
}

export interface CustomSetting<T> extends BaseSetting {
    type: OptionType.CUSTOM;
    default: T;
}

export type SettingDef =
    | BooleanSetting
    | StringSetting
    | NumberSetting
    | SliderSetting
    | SelectSetting
    | ComponentSetting
    | CustomSetting<unknown>;

export type SettingsDefinition = Record<string, SettingDef>;

type ValueOf<S> =
    S extends BooleanSetting ? boolean
        : S extends StringSetting ? string
            : S extends NumberSetting | SliderSetting ? number
                : S extends { type: OptionType.SELECT; options: readonly (infer O)[] } ? O extends { value: infer V } ? V : string
                    : S extends CustomSetting<infer T> ? T
                        : never;

type StoredKeys<D> = { [K in keyof D]: D[K] extends ComponentSetting ? never : K }[keyof D];

export type SettingsValues<D extends SettingsDefinition> = { [K in StoredKeys<D>]: ValueOf<D[K]> };

export interface DefinedSettings<D extends SettingsDefinition = SettingsDefinition> {
    def: D;
    pluginName: string;
    store: SettingsValues<D>;
    reset(): void;
}

export type PluginTag = "chat" | "ui" | "privacy";

export interface Plugin {
    name: string;
    description: string;
    authors: string[];
    tags: PluginTag[];
    icon: IconName;
    enabledByDefault?: boolean;
    required?: boolean;
    hidden?: boolean;
    startAt?: StartAt;
    settings?: DefinedSettings<any>;
    styles?: string | (() => string);
    updatedAt?: number;
    start?(): void;
    stop?(): void;
    onSettingsChange?(key: string): void;
}

export default function definePlugin<P extends Plugin>(plugin: P): P {
    return plugin;
}
