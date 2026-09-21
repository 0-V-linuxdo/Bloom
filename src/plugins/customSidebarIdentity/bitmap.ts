/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Decode crop sources without `fetch(data:…)`. Helium / some Chromium
 * builds throw on fetch of a data: URL, so paste preview (File →
 * createImageBitmap) works while bake(avatarSource) returns null and
 * the official “18” chip never gets the image.
 */

export function blobFromDataUrl(url: string): Blob | null {
    const m = /^data:([^;,]+)?(;base64)?,(.*)$/s.exec(url);
    if (!m) return null;
    const mime = m[1] || "application/octet-stream";
    const isB64 = !!m[2];
    const data = m[3] || "";
    try {
        if (isB64) {
            const bin = atob(data);
            const bytes = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
            return new Blob([bytes], { type: mime });
        }
        return new Blob([decodeURIComponent(data)], { type: mime });
    } catch {
        return null;
    }
}

export async function bitmapFromBlob(blob: Blob): Promise<ImageBitmap | null> {
    try {
        return await createImageBitmap(blob);
    } catch {
        return null;
    }
}

async function bitmapFromImageElement(url: string): Promise<ImageBitmap | null> {
    try {
        const img = new Image();
        img.decoding = "async";
        await new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = () => reject(new Error("img"));
            img.src = url;
        });
        return await createImageBitmap(img);
    } catch {
        return null;
    }
}

/** Helium-safe: never `fetch` a data: URL. */
export async function bitmapFromUrl(url: string): Promise<ImageBitmap | null> {
    if (url.startsWith("data:")) {
        const blob = blobFromDataUrl(url);
        if (blob) {
            const bmp = await bitmapFromBlob(blob);
            if (bmp) return bmp;
        }
        return bitmapFromImageElement(url);
    }
    try {
        const res = await fetch(url, { mode: "cors", credentials: "omit", referrerPolicy: "no-referrer" });
        if (!res.ok) return null;
        return bitmapFromBlob(await res.blob());
    } catch {
        return null;
    }
}
