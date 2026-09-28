/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export type IconStyle = "original" | "badge" | "dot" | "hole" | "bg";
export type FaviconState = "wait" | "rotate" | "done" | "ready" | "error";
export type ActiveState = Exclude<FaviconState, "wait">;

export const STYLE_OPTIONS = [
    { label: "Emoji", value: "original" },
    { label: "Badge", value: "badge" },
    { label: "Dot", value: "dot" },
    { label: "Tint", value: "hole" },
    { label: "Fill", value: "bg" },
] as const;

const COLORS: Record<ActiveState, string> = {
    rotate: "#3B82F6",
    done: "#22C55E",
    ready: "#F59E0B",
    error: "#EF4444",
};

const EMOJI: Record<ActiveState, string> = {
    rotate: "🔄",
    done: "✔️",
    ready: "👍",
    error: "🚫",
};

export const OPENAI_PATH = "M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z";

const SIZE = 32;
const CANVAS_UNITS = 64;
const MARK = "#FCFCFC";
const INK = "#111111";
const PLATE_RADIUS = 14;
const BADGE_CENTER = 51.5;
const BADGE_RING = 12.5;
const BADGE_FILL = 9.75;
const DOT_CENTER = 52;
const DOT_RING = 10.5;
const DOT_FILL = 7.75;

type Stroke = (ctx: CanvasRenderingContext2D) => void;

const GLYPHS: Record<ActiveState, Stroke> = {
    rotate: ctx => ctx.arc(BADGE_CENTER, BADGE_CENTER, 6, -Math.PI / 2, Math.PI * 0.7),
    done: ctx => {
        ctx.moveTo(46.5, 51.75);
        ctx.lineTo(50, 55.25);
        ctx.lineTo(56.75, 47.5);
    },
    ready: ctx => {
        ctx.moveTo(51.5, 56.5);
        ctx.lineTo(51.5, 46.5);
        ctx.moveTo(46.5, 51.25);
        ctx.lineTo(51.5, 46.25);
        ctx.lineTo(56.5, 51.25);
    },
    error: ctx => {
        ctx.moveTo(47.25, 47.25);
        ctx.lineTo(55.75, 55.75);
        ctx.moveTo(55.75, 47.25);
        ctx.lineTo(47.25, 55.75);
    },
};

function paint(draw: (ctx: CanvasRenderingContext2D) => void) {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";
    ctx.scale(SIZE / CANVAS_UNITS, SIZE / CANVAS_UNITS);
    draw(ctx);
    return canvas.toDataURL("image/png");
}

function blossom(ctx: CanvasRenderingContext2D, fill: string, halo: boolean) {
    ctx.save();
    ctx.translate(8, 8);
    ctx.scale(2, 2);
    const path = new Path2D(OPENAI_PATH);
    if (halo) {
        ctx.strokeStyle = INK;
        ctx.lineWidth = 1.35;
        ctx.lineJoin = "round";
        ctx.stroke(path);
    }
    ctx.fillStyle = fill;
    ctx.fill(path, "evenodd");
    ctx.restore();
}

function disc(ctx: CanvasRenderingContext2D, center: number, radius: number, fill: string) {
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.fillStyle = fill;
    ctx.fill();
}

function badge(ctx: CanvasRenderingContext2D, state: ActiveState) {
    disc(ctx, BADGE_CENTER, BADGE_RING, INK);
    disc(ctx, BADGE_CENTER, BADGE_FILL, COLORS[state]);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    GLYPHS[state](ctx);
    ctx.stroke();
}

function plate(ctx: CanvasRenderingContext2D, fill: string) {
    ctx.beginPath();
    ctx.roundRect(0, 0, CANVAS_UNITS, CANVAS_UNITS, PLATE_RADIUS);
    ctx.fillStyle = fill;
    ctx.fill();
}

const emoji = (glyph: string) =>
    `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${glyph}</text></svg>`)}`;

export function drawIcon(style: IconStyle, state: ActiveState) {
    switch (style) {
        case "original": return emoji(EMOJI[state]);
        case "hole": return paint(ctx => blossom(ctx, COLORS[state], true));
        case "bg": return paint(ctx => {
            plate(ctx, COLORS[state]);
            blossom(ctx, MARK, false);
        });
        case "dot": return paint(ctx => {
            blossom(ctx, MARK, true);
            disc(ctx, DOT_CENTER, DOT_RING, INK);
            disc(ctx, DOT_CENTER, DOT_FILL, COLORS[state]);
        });
        case "badge": return paint(ctx => {
            blossom(ctx, MARK, true);
            badge(ctx, state);
        });
    }
}
