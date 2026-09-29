/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { button, slider, textInput } from "@components/controls";
import { classNameFactory } from "@utils/css";
import { h } from "@utils/dom";
import { clamp } from "@utils/misc";

import { settings } from "./index";

const cl = classNameFactory("bloom-csi-");

const OUTPUT_PX = 256;
const PREVIEW_PX = 160;
const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.1;
const WHEEL_FACTOR = 0.0015;
const BAKE_DELAY_MS = 250;

interface Crop {
    x: number;
    y: number;
    zoom: number;
}

function readDataUrl(blob: Blob) {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(blob);
    });
}

function loadImage(src: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Image failed to load"));
        img.src = src;
    });
}

function clampCrop(img: HTMLImageElement, crop: Crop): Crop {
    const scale = Math.max(1 / img.naturalWidth, 1 / img.naturalHeight) * crop.zoom;
    const halfX = 1 / (2 * img.naturalWidth * scale);
    const halfY = 1 / (2 * img.naturalHeight * scale);
    return { zoom: crop.zoom, x: clamp(crop.x, halfX, 1 - halfX), y: clamp(crop.y, halfY, 1 - halfY) };
}

function draw(canvas: HTMLCanvasElement, img: HTMLImageElement, crop: Crop) {
    const size = canvas.width;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const scale = Math.max(size / img.naturalWidth, size / img.naturalHeight) * crop.zoom;
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(img, size / 2 - crop.x * img.naturalWidth * scale, size / 2 - crop.y * img.naturalHeight * scale, img.naturalWidth * scale, img.naturalHeight * scale);
}

function bake(img: HTMLImageElement, crop: Crop) {
    const canvas = h("canvas");
    canvas.width = canvas.height = OUTPUT_PX;
    draw(canvas, img, crop);
    return canvas.toDataURL("image/png");
}

export function avatarCropper(host: HTMLElement) {
    let img: HTMLImageElement | null = null;
    let crop: Crop = { x: settings.store.cropX, y: settings.store.cropY, zoom: settings.store.cropZoom };
    let bakeTimer: ReturnType<typeof setTimeout> | undefined;

    const canvas = h("canvas", { class: cl("canvas"), attrs: { "aria-label": "Avatar crop. Drag to move, scroll to zoom." } });
    canvas.width = canvas.height = PREVIEW_PX * devicePixelRatio;
    const status = h("div", { class: `bloom-muted ${cl("status")}` });
    const zoomHost = h("div", { class: cl("zoom") });
    const file = h("input", { attrs: { type: "file", accept: "image/*", hidden: "" } });

    function update(next: Crop, persist = true) {
        if (!img) return;
        crop = clampCrop(img, next);
        draw(canvas, img, crop);
        if (!persist) return;
        clearTimeout(bakeTimer);
        bakeTimer = setTimeout(() => {
            if (!img) return;
            settings.store.cropX = crop.x;
            settings.store.cropY = crop.y;
            settings.store.cropZoom = crop.zoom;
            settings.store.avatarUrl = bake(img, crop);
        }, BAKE_DELAY_MS);
    }

    function renderZoom() {
        zoomHost.replaceChildren(slider(crop.zoom, MIN_ZOOM, MAX_ZOOM, ZOOM_STEP, "×", zoom => update({ ...crop, zoom })));
    }

    async function setSource(source: string, fresh: boolean) {
        status.textContent = "";
        try {
            img = await loadImage(source);
            if (fresh) {
                settings.store.avatarSource = source;
                crop = { x: 0.5, y: 0.5, zoom: MIN_ZOOM };
            }
            host.classList.add(cl("has-image"));
            renderZoom();
            update(crop, fresh);
        } catch {
            status.textContent = "Couldn't load that image. Download it and choose the file instead.";
        }
    }

    const loadBlob = (blob: Blob | null | undefined) => {
        if (blob?.type.startsWith("image/")) void readDataUrl(blob).then(url => setSource(url, true));
    };

    file.addEventListener("change", () => loadBlob(file.files?.[0]));
    canvas.addEventListener("wheel", event => {
        if (!img) return;
        event.preventDefault();
        update({ ...crop, zoom: clamp(crop.zoom * (1 - event.deltaY * WHEEL_FACTOR), MIN_ZOOM, MAX_ZOOM) });
        renderZoom();
    }, { passive: false });
    canvas.addEventListener("pointerdown", down => {
        if (!img) return;
        canvas.setPointerCapture(down.pointerId);
        const start = { ...crop };
        const rect = canvas.getBoundingClientRect();
        const move = (event: PointerEvent) => {
            if (!img) return;
            const scale = Math.max(rect.width / img.naturalWidth, rect.height / img.naturalHeight) * crop.zoom;
            update({ ...crop, x: start.x - (event.clientX - down.clientX) / (img.naturalWidth * scale), y: start.y - (event.clientY - down.clientY) / (img.naturalHeight * scale) });
        };
        canvas.addEventListener("pointermove", move);
        canvas.addEventListener("pointerup", () => canvas.removeEventListener("pointermove", move), { once: true });
    });

    const root = h("div", {
        class: cl("cropper"),
        attrs: { tabindex: "0" },
        on: {
            paste: event => loadBlob([...event.clipboardData?.files ?? []].find(item => item.type.startsWith("image/"))),
            dragover: event => event.preventDefault(),
            drop: event => {
                event.preventDefault();
                loadBlob(event.dataTransfer?.files[0]);
            },
        },
    },
    h("div", { class: cl("stage") }, canvas),
    h("div", { class: cl("controls") },
        textInput("", url => url.trim() && void setSource(url.trim(), true), "https://… or data:image/…", "url"),
        h("div", { class: cl("buttons") },
            button("Choose file", () => file.click()),
            button("Reset crop", () => {
                update({ x: 0.5, y: 0.5, zoom: MIN_ZOOM });
                renderZoom();
            }),
            button("Clear", () => {
                img = null;
                host.classList.remove(cl("has-image"));
                canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
                zoomHost.replaceChildren();
                settings.store.avatarUrl = "";
                settings.store.avatarSource = "";
            }, "danger")),
        zoomHost,
        status,
        file));
    host.append(root);
    if (settings.store.avatarSource) void setSource(settings.store.avatarSource, false);
    return () => {
        clearTimeout(bakeTimer);
        host.replaceChildren();
    };
}
