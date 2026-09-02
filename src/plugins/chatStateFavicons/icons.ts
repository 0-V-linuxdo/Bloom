/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Style compositor adapted from Void++ ChatStateFavicons (GPL-3.0-or-later).
 * Blossom path from Chat-State-Favicons ChatGPT/icon/ChatGPT.svg (progress bar stripped).
 * Always a light (white) blossom. Rasterized to PNG so Chrome actually
 * replaces the official black SVG. No SMIL. No official href as a base.
 */

export const ICON_STYLES = ["original", "badge", "dot", "hole", "bg"] as const;
export type IconStyle = (typeof ICON_STYLES)[number];
export type FaviconKind = "wait" | "rotate" | "done" | "ready" | "error";

export const STYLE_OPTIONS = [
    { label: "Emoji", value: "original" },
    { label: "Badge", value: "badge", default: true },
    { label: "Dot", value: "dot" },
    { label: "Tint", value: "hole" },
    { label: "Fill", value: "bg" },
] as const;

const KIND_COLOR: Record<Exclude<FaviconKind, "wait">, string> = {
    rotate: "#3B82F6",
    done: "#22C55E",
    ready: "#F59E0B",
    error: "#EF4444",
};

/** Light mark. Halo keeps it readable on pale Chrome tabs. */
const MARK = "#FCFCFC";
const HALO = "#111111";
const RING = "#111111";
const GLYPH = "#ffffff";
const PLATE_IDLE = "#212121";

/** 24-unit OpenAI blossom (evenodd), used at translate(8 8) scale(2) on a 64 canvas. */
const BLOSSOM_PATH = "M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z";

const ORIGINAL_EMOJI: Record<Exclude<FaviconKind, "wait">, string> = {
    rotate: "🔄",
    done: "✔️",
    ready: "👍",
    error: "🚫",
};

const SIZE = 32;
const SRC = 64;

export function isIconStyle(value: unknown): value is IconStyle {
    return typeof value === "string" && (ICON_STYLES as readonly string[]).includes(value);
}

function svgEmoji(emoji: string): string {
    return `data:image/svg+xml,${encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${emoji}</text></svg>`,
    )}`;
}

function raster(draw: (ctx: CanvasRenderingContext2D) => void): string {
    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";
    ctx.scale(SIZE / SRC, SIZE / SRC);
    draw(ctx);
    return canvas.toDataURL("image/png");
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

function paintBlossom(ctx: CanvasRenderingContext2D, fill: string, halo = true) {
    ctx.save();
    ctx.translate(8, 8);
    ctx.scale(2, 2);
    const path = new Path2D(BLOSSOM_PATH);
    if (halo) {
        ctx.strokeStyle = HALO;
        ctx.lineWidth = 1.35;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.stroke(path);
    }
    ctx.fillStyle = fill;
    ctx.fill(path, "evenodd");
    ctx.restore();
}

function paintBadge(ctx: CanvasRenderingContext2D, kind: Exclude<FaviconKind, "wait">, style: "badge" | "dot") {
    const color = KIND_COLOR[kind];
    if (style === "dot") {
        ctx.beginPath();
        ctx.arc(52.2, 52.2, 10.4, 0, Math.PI * 2);
        ctx.fillStyle = RING;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(52.2, 52.2, 7.7, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        return;
    }
    ctx.beginPath();
    ctx.arc(51.5, 51.5, 12.15, 0, Math.PI * 2);
    ctx.fillStyle = RING;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(51.5, 51.5, 9.55, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = GLYPH;
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (kind === "rotate") {
        ctx.beginPath();
        ctx.arc(51.5, 51.5, 6.1, -Math.PI / 2, Math.PI * 0.7);
        ctx.stroke();
        return;
    }
    if (kind === "done") {
        ctx.beginPath();
        ctx.moveTo(46.6, 51.7);
        ctx.lineTo(50.1, 55.3);
        ctx.lineTo(56.8, 47.4);
        ctx.stroke();
        return;
    }
    if (kind === "ready") {
        ctx.beginPath();
        ctx.moveTo(51.5, 56.4);
        ctx.lineTo(51.5, 46.8);
        ctx.moveTo(46.6, 51.2);
        ctx.lineTo(51.5, 46.2);
        ctx.lineTo(56.4, 51.2);
        ctx.stroke();
        return;
    }
    ctx.beginPath();
    ctx.moveTo(47.2, 47.2);
    ctx.lineTo(55.8, 55.8);
    ctx.moveTo(55.8, 47.2);
    ctx.lineTo(47.2, 55.8);
    ctx.stroke();
}

export function composeIcon(style: IconStyle, kind: FaviconKind): string {
    if (style === "original") {
        if (kind === "wait") {
            return raster(ctx => paintBlossom(ctx, MARK));
        }
        return svgEmoji(ORIGINAL_EMOJI[kind]);
    }

    const color = kind === "wait" ? undefined : KIND_COLOR[kind];

    if (style === "hole") {
        return raster(ctx => paintBlossom(ctx, color ?? MARK));
    }
    if (style === "bg") {
        return raster(ctx => {
            ctx.fillStyle = color ?? PLATE_IDLE;
            roundRect(ctx, 0, 0, 64, 64, 14);
            ctx.fill();
            paintBlossom(ctx, MARK, false);
        });
    }

    return raster(ctx => {
        paintBlossom(ctx, MARK);
        if (kind !== "wait") paintBadge(ctx, kind, style === "dot" ? "dot" : "badge");
    });
}

export function buildIcons(style: IconStyle): Record<FaviconKind, string> {
    return {
        wait: composeIcon(style, "wait"),
        rotate: composeIcon(style, "rotate"),
        done: composeIcon(style, "done"),
        ready: composeIcon(style, "ready"),
        error: composeIcon(style, "error"),
    };
}
