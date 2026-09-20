/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * ChatGPT-side rewrite of Void++ CustomSidebarIdentity (GPL-3.0-or-later).
 * Overlay avatar + injected name — never textContent on official .truncate,
 * never html/body[subtree] observers, never documentElement CSS vars,
 * never wrapper :has(), never hide the avatar node or #bloom-rail-item.
 */

import { definePluginSettings } from "../../api/Settings";
import {
    findAccountMenu,
    findProfileButton,
    findTinyBar,
    pathHitsProfile,
    PROFILE_SEL,
} from "../../host/accountMenu";
import { Devs } from "../../utils/constants";
import { registerStyle, removeStyle } from "../../utils/css";
import { Logger } from "../../utils/Logger";
import { clamp } from "../../utils/misc";
import definePlugin, { OptionType, StartAt } from "../../utils/types";
import css from "./styles.css";

const logger = new Logger("CustomSidebarIdentity");
const UI_STYLE = "customSidebarIdentityUi";
const SIZE_STYLE = "customSidebarIdentitySize";
const FACE_CLASS = "bloom-csi-face";
const NAME_CLASS = "bloom-csi-name";
const HOST_CLASS = "bloom-csi-host";
const SLOT_CLASS = "bloom-csi-slot";
const MARK = "data-bloom-csi";
const NAMED = "data-bloom-csi-named";
const BLOOM_CHROME = "#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog";
const SOURCE_PX = 1024;
const AVATAR_PX = 256;
const SIZE_MIN = 24;
const SIZE_MAX = 64;
const SIZE_DEFAULT = 40;
const ZOOM_MIN = 1;
const ZOOM_MAX = 4;

const settings = definePluginSettings({
    displayName: {
        type: OptionType.STRING,
        description: "Display name next to the sidebar avatar. Empty keeps the official name.",
        default: "",
    },
    avatarPanel: {
        type: OptionType.COMPONENT,
        description: "Image URL, data:image…, or paste a picture. Drag the circle to crop.",
        render: mountAvatarPanel,
    },
    avatarUrl: {
        type: OptionType.STRING,
        description: "Baked avatar",
        hidden: true,
        default: "",
    },
    avatarSource: {
        type: OptionType.STRING,
        description: "Crop source",
        hidden: true,
        default: "",
    },
    cropX: {
        type: OptionType.NUMBER,
        description: "Crop center X",
        hidden: true,
        default: 0.5,
    },
    cropY: {
        type: OptionType.NUMBER,
        description: "Crop center Y",
        hidden: true,
        default: 0.5,
    },
    cropZoom: {
        type: OptionType.NUMBER,
        description: "Crop zoom",
        hidden: true,
        default: 1,
    },
    avatarSize: {
        type: OptionType.SLIDER,
        description: "Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",
        min: SIZE_MIN,
        max: SIZE_MAX,
        default: SIZE_DEFAULT,
    },
    applyToMenu: {
        type: OptionType.BOOLEAN,
        description: "Also replace the avatar and name at the top of the account dropdown.",
        default: true,
    },
});

function num(v: unknown, fallback: number): number {
    return typeof v === "number" && Number.isFinite(v) ? v : fallback;
}

function trimName(): string {
    return String(settings.store.displayName ?? "").trim();
}

function cropRect(w: number, h: number, zoom: number, cx: number, cy: number) {
    const z = clamp(zoom, ZOOM_MIN, ZOOM_MAX);
    const side = Math.min(w, h) / z;
    const x = clamp(cx, side / 2, Math.max(side / 2, w - side / 2));
    const y = clamp(cy, side / 2, Math.max(side / 2, h - side / 2));
    return { z, side, x, y };
}

async function bitmapFromBlob(blob: Blob): Promise<ImageBitmap | null> {
    try {
        return await createImageBitmap(blob);
    } catch {
        return null;
    }
}

async function bitmapFromUrl(url: string): Promise<ImageBitmap | null> {
    try {
        const res = await fetch(url, url.startsWith("data:") ? undefined : { mode: "cors", credentials: "omit", referrerPolicy: "no-referrer" });
        if (!res.ok) return null;
        return bitmapFromBlob(await res.blob());
    } catch {
        return null;
    }
}

function pngFromBitmap(bmp: ImageBitmap, w: number, h: number): string | null {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(bmp, 0, 0, w, h);
    const url = canvas.toDataURL("image/png");
    return url.startsWith("data:image/") ? url : null;
}

function capFromBitmap(bmp: ImageBitmap): string | null {
    const scale = Math.min(1, SOURCE_PX / Math.max(bmp.width, bmp.height));
    return pngFromBitmap(bmp, Math.max(1, Math.round(bmp.width * scale)), Math.max(1, Math.round(bmp.height * scale)));
}

function bakeFromBitmap(bmp: ImageBitmap, cropX: number, cropY: number, zoom: number): string | null {
    const { side, x, y } = cropRect(bmp.width, bmp.height, zoom, cropX * bmp.width, cropY * bmp.height);
    const canvas = document.createElement("canvas");
    canvas.width = AVATAR_PX;
    canvas.height = AVATAR_PX;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(bmp, x - side / 2, y - side / 2, side, side, 0, 0, AVATAR_PX, AVATAR_PX);
    const url = canvas.toDataURL("image/png");
    return url.startsWith("data:image/") ? url : null;
}

async function capBlob(blob: Blob): Promise<string | null> {
    const bmp = await bitmapFromBlob(blob);
    if (!bmp) return null;
    const url = capFromBitmap(bmp);
    bmp.close();
    return url;
}

async function bake(src: string, cropX: number, cropY: number, zoom: number): Promise<string | null> {
    const bmp = await bitmapFromUrl(src);
    if (!bmp) return null;
    const url = bakeFromBitmap(bmp, cropX, cropY, zoom);
    bmp.close();
    return url;
}

function resetCrop() {
    settings.store.cropX = 0.5;
    settings.store.cropY = 0.5;
    settings.store.cropZoom = 1;
}

function clearAvatar() {
    settings.store.avatarUrl = "";
    settings.store.avatarSource = "";
    resetCrop();
}

let adoptGen = 0;

async function adoptSource(src: string) {
    const gen = ++adoptGen;
    resetCrop();
    settings.store.avatarSource = src;
    const baked = await bake(src, 0.5, 0.5, 1);
    if (gen !== adoptGen) return false;
    if (baked) settings.store.avatarUrl = baked;
    return !!baked;
}

function imageFile(data: DataTransfer | null): File | null {
    if (!data) return null;
    for (const file of data.files) {
        if (file.type.startsWith("image/")) return file;
    }
    for (const item of data.items) {
        if (item.kind === "file" && item.type.startsWith("image/")) return item.getAsFile();
    }
    return null;
}

async function takeImage(data: DataTransfer | null) {
    const file = imageFile(data);
    if (!file) return false;
    const src = await capBlob(file);
    if (!src) return false;
    return adoptSource(src);
}

const failed = new Set<string>();
let started = false;
let painting = false;
let raf = 0;
let coordRaf = 0;
let pinRejects = 0;
let pinBackoffUntil = 0;
let keys: AbortController | null = null;
const observers = new Map<Element, MutationObserver>();
let watchedMenu: HTMLElement | null = null;
let menuWatch: MutationObserver | null = null;
let panelRefresh: (() => void) | null = null;

function avatarSrc(): string | null {
    const raw = String(settings.store.avatarUrl ?? "").trim();
    if (!raw || failed.has(raw)) return null;
    if (raw.startsWith("data:image/")) return raw;
    try {
        const { protocol } = new URL(raw);
        if (protocol === "https:" || protocol === "http:") return raw;
    } catch {
        return null;
    }
    return null;
}

function inChrome(el: Element | null): boolean {
    return !!el?.closest(BLOOM_CHROME);
}

function isFace(el: Element): boolean {
    return el.classList.contains(FACE_CLASS);
}

function officialFace(root: HTMLElement): HTMLElement | null {
    const imgs: HTMLImageElement[] = [];
    for (const img of root.querySelectorAll("img")) {
        if (!(img instanceof HTMLImageElement)) continue;
        if (isFace(img) || inChrome(img)) continue;
        imgs.push(img);
    }
    if (imgs.length) {
        const ranked = imgs.find(i => /rounded-full|avatar/i.test(i.className) || !!i.getAttribute("alt"));
        return ranked ?? imgs[0];
    }
    for (const node of root.querySelectorAll<HTMLElement>('[class*="avatar"], [class*="rounded-full"]')) {
        if (isFace(node) || inChrome(node) || node.closest(`.${FACE_CLASS}`)) continue;
        if (node.tagName === "IMG") continue;
        if (node.querySelector("img")) continue;
        return node;
    }
    return null;
}

function nameColumn(root: HTMLElement): HTMLElement | null {
    const cols = root.querySelectorAll<HTMLElement>(".min-w-0");
    for (const col of cols) {
        if (inChrome(col)) continue;
        if (col.querySelector(".truncate, .text-xs, [class*='text-token-text']")) return col;
    }
    return null;
}

function officialName(col: HTMLElement): HTMLElement | null {
    const trunc = col.querySelector<HTMLElement>(":scope > .truncate, :scope .truncate");
    if (trunc && !trunc.classList.contains(NAME_CLASS)) return trunc;
    for (const child of col.children) {
        if (!(child instanceof HTMLElement)) continue;
        if (child.classList.contains(NAME_CLASS)) continue;
        if (child.classList.contains("text-xs")) continue;
        if (/text-token-text-secondary|text-token-text-tertiary/.test(child.className)) continue;
        if (child.tagName === "IMG") continue;
        if (!child.textContent?.trim()) continue;
        return child;
    }
    return null;
}

function dropOurs(scope: ParentNode, cls: string) {
    for (const el of scope.querySelectorAll(`.${cls}`)) el.remove();
}

function unhost(scope: ParentNode) {
    for (const el of scope.querySelectorAll(`.${HOST_CLASS}`)) el.classList.remove(HOST_CLASS);
    for (const el of scope.querySelectorAll(`.${SLOT_CLASS}`)) el.classList.remove(SLOT_CLASS);
}

function restoreChip(root: HTMLElement) {
    dropOurs(root, FACE_CLASS);
    dropOurs(root, NAME_CLASS);
    unhost(root);
    root.removeAttribute(MARK);
    root.removeAttribute(NAMED);
}

function isAvatarWrap(parent: HTMLElement, host: HTMLElement, chip: HTMLElement): boolean {
    if (parent === chip) return false;
    if (parent.querySelector(".min-w-0")) return false;
    const kids = [...parent.children].filter(c => !c.classList.contains(FACE_CLASS) && !c.classList.contains(NAME_CLASS));
    return kids.length === 1 && kids[0] === host;
}

function placeFace(chip: HTMLElement, host: HTMLElement, url: string) {
    const parent = host.parentElement;
    if (!parent) return;
    const wrap = isAvatarWrap(parent, host, chip) ? parent : null;
    const slot = wrap ?? chip;
    if (wrap) wrap.classList.add(SLOT_CLASS);
    host.classList.add(HOST_CLASS);

    let face = slot.querySelector<HTMLImageElement>(`:scope > .${FACE_CLASS}`);
    if (!face) {
        face = document.createElement("img");
        face.className = FACE_CLASS;
        face.alt = "";
        face.draggable = false;
        face.referrerPolicy = "no-referrer";
        face.addEventListener("error", onFaceError);
        slot.appendChild(face);
    }
    if (face.getAttribute("src") !== url) face.src = url;

    if (!wrap) {
        const origin = (face.offsetParent instanceof HTMLElement ? face.offsetParent : chip).getBoundingClientRect();
        const box = host.getBoundingClientRect();
        face.style.position = "absolute";
        face.style.left = `${box.left - origin.left}px`;
        face.style.top = `${box.top - origin.top}px`;
        face.style.width = `${box.width}px`;
        face.style.height = `${box.height}px`;
        face.style.inset = "auto";
    } else {
        face.style.position = "";
        face.style.left = "";
        face.style.top = "";
        face.style.width = "";
        face.style.height = "";
        face.style.inset = "";
    }
}

function onFaceError(e: Event) {
    const img = e.currentTarget;
    if (!(img instanceof HTMLImageElement)) return;
    const url = img.getAttribute("src") ?? "";
    if (url) failed.add(url);
    img.remove();
    schedule();
}

function paintName(chip: HTMLElement, text: string) {
    const col = nameColumn(chip);
    if (!text || !col) {
        dropOurs(chip, NAME_CLASS);
        chip.removeAttribute(NAMED);
        return;
    }
    chip.setAttribute(NAMED, "");
    let el = col.querySelector<HTMLElement>(`:scope > .${NAME_CLASS}`);
    if (!el) {
        el = document.createElement("div");
        el.className = NAME_CLASS;
        const official = officialName(col);
        if (official?.nextSibling) col.insertBefore(el, official.nextSibling);
        else if (official) col.appendChild(el);
        else col.insertBefore(el, col.firstChild);
    }
    if (el.textContent !== text) el.textContent = text;
    for (const extra of col.querySelectorAll(`.${NAME_CLASS}`)) {
        if (extra !== el) extra.remove();
    }
}

function inTinyBar(el: HTMLElement): boolean {
    return !!el.closest("#stage-sidebar-tiny-bar");
}

function paintChip(chip: HTMLElement) {
    if (inChrome(chip)) return;
    chip.setAttribute(MARK, "");
    const url = avatarSrc();
    const host = officialFace(chip);
    if (url && host) {
        placeFace(chip, host, url);
    } else {
        dropOurs(chip, FACE_CLASS);
        unhost(chip);
    }
    if (!inTinyBar(chip)) paintName(chip, trimName());
    else {
        dropOurs(chip, NAME_CLASS);
        chip.removeAttribute(NAMED);
    }
}

function chipTargets(): HTMLElement[] {
    const out: HTMLElement[] = [];
    const profile = findProfileButton();
    if (profile) out.push(profile);
    const tiny = findTinyBar();
    if (tiny && !out.some(el => tiny.contains(el) || el.contains(tiny))) {
        const inner = tiny.querySelector<HTMLElement>(PROFILE_SEL)
            ?? tiny.querySelector<HTMLElement>("button, a, [role='button']")
            ?? tiny;
        if (inner && !out.includes(inner)) out.push(inner);
    }
    return out;
}

function menuHeader(menu: HTMLElement): { host: HTMLElement; wrap: HTMLElement } | null {
    const img = officialFace(menu);
    if (!img) return null;
    if (img.closest("[role='menuitem'], [role='menuitemcheckbox'], [role='menuitemradio']")) return null;
    const row = img.closest("div");
    const wrap = row?.parentElement && menu.contains(row.parentElement) ? row.parentElement : row;
    if (!wrap || wrap === menu) return null;
    return { host: img, wrap: wrap instanceof HTMLElement ? wrap : img.parentElement ?? menu };
}

function paintMenu(menu: HTMLElement) {
    if (!settings.store.applyToMenu) {
        restoreChip(menu);
        dropOurs(menu, FACE_CLASS);
        dropOurs(menu, NAME_CLASS);
        unhost(menu);
        menu.removeAttribute(MARK);
        menu.removeAttribute(NAMED);
        return;
    }
    const header = menuHeader(menu);
    if (!header) return;
    menu.setAttribute(MARK, "");
    const url = avatarSrc();
    if (url) placeFace(header.wrap, header.host, url);
    else {
        dropOurs(header.wrap, FACE_CLASS);
        unhost(header.wrap);
    }
    const name = trimName();
    if (!name) {
        dropOurs(header.wrap, NAME_CLASS);
        header.wrap.removeAttribute(NAMED);
        menu.removeAttribute(NAMED);
        return;
    }
    header.wrap.setAttribute(NAMED, "");
    menu.setAttribute(NAMED, "");
    let col = nameColumn(header.wrap) ?? header.wrap;
    let el = col.querySelector<HTMLElement>(`:scope > .${NAME_CLASS}`);
    if (!el) {
        el = document.createElement("div");
        el.className = NAME_CLASS;
        const official = officialName(col);
        if (official?.nextSibling) col.insertBefore(el, official.nextSibling);
        else col.appendChild(el);
    }
    if (el.textContent !== name) el.textContent = name;
}

function applySize() {
    const n = clamp(Math.round(num(settings.store.avatarSize, SIZE_DEFAULT)), SIZE_MIN, SIZE_MAX);
    registerStyle(SIZE_STYLE, `[data-bloom-csi]{--bloom-csi-avatar-size:${n}px}`);
}

function clearSize() {
    removeStyle(SIZE_STYLE);
}

function notePin(ok: boolean) {
    if (ok) {
        pinRejects = 0;
        pinBackoffUntil = 0;
        return;
    }
    pinRejects += 1;
    pinBackoffUntil = Date.now() + Math.min(8_000, 250 * 2 ** Math.min(pinRejects, 5));
}

function paintAll() {
    const chips = chipTargets();
    const seen = new Set<HTMLElement>(chips);
    for (const chip of chips) paintChip(chip);
    for (const marked of document.querySelectorAll<HTMLElement>(`[${MARK}]`)) {
        if (seen.has(marked)) continue;
        if (marked.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")) continue;
        if (marked.id === "bloom-rail-item" || inChrome(marked)) {
            restoreChip(marked);
            continue;
        }
        if (!chips.some(c => c.contains(marked) || marked.contains(c))) restoreChip(marked);
    }
    const menu = findAccountMenu();
    if (menu && settings.store.applyToMenu) paintMenu(menu);
    const faces = chips.flatMap(c => [...c.querySelectorAll(`.${FACE_CLASS}`)]);
    notePin(!avatarSrc() || faces.some(f => f.isConnected) || !chips.some(c => officialFace(c)));
}

function apply() {
    if (!started || painting) return;
    if (Date.now() < pinBackoffUntil) return;
    painting = true;
    const watched = [...observers.keys()];
    for (const obs of observers.values()) obs.disconnect();
    menuWatch?.disconnect();
    try {
        applySize();
        paintAll();
    } finally {
        painting = false;
        for (const node of watched) {
            if (node.isConnected) bindNode(node);
        }
        if (watchedMenu?.isConnected) watchMenu(watchedMenu);
    }
}

function schedule() {
    if (!started || raf) return;
    if (Date.now() < pinBackoffUntil) return;
    raf = requestAnimationFrame(() => {
        raf = 0;
        apply();
        if (!coordRaf) {
            coordRaf = requestAnimationFrame(() => {
                coordRaf = 0;
                if (started) apply();
            });
        }
    });
}

function onMut() {
    if (painting || !started) return;
    schedule();
}

function bindNode(root: Element) {
    if (observers.has(root)) return;
    const obs = new MutationObserver(onMut);
    obs.observe(root, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["src", "srcset"],
    });
    observers.set(root, obs);
}

function unbindNode(root: Element) {
    observers.get(root)?.disconnect();
    observers.delete(root);
}

function rebindIslands() {
    const want = new Set<Element>();
    for (const chip of chipTargets()) {
        want.add(chip);
        if (chip.parentElement) want.add(chip.parentElement);
    }
    const tiny = findTinyBar();
    if (tiny) want.add(tiny);
    for (const node of [...observers.keys()]) {
        if (!want.has(node) || !node.isConnected) unbindNode(node);
    }
    for (const node of want) {
        if (node.isConnected) bindNode(node);
    }
}

function watchMenu(menu: HTMLElement) {
    if (watchedMenu === menu && menuWatch) return;
    menuWatch?.disconnect();
    watchedMenu = menu;
    menuWatch = new MutationObserver(() => {
        if (!menu.isConnected) {
            menuWatch?.disconnect();
            menuWatch = null;
            watchedMenu = null;
            return;
        }
        if (painting || !started) return;
        schedule();
    });
    menuWatch.observe(menu, { childList: true, subtree: true });
}

function seekMenu(ticks: number) {
    if (!started || settings.store.applyToMenu === false) return;
    const menu = findAccountMenu();
    if (menu) {
        watchMenu(menu);
        schedule();
        return;
    }
    if (ticks <= 0) return;
    requestAnimationFrame(() => seekMenu(ticks - 1));
}

function onDocClick(e: Event) {
    if (!started) return;
    if (settings.store.applyToMenu === false) return;
    if (!pathHitsProfile(e) && !findAccountMenu()) return;
    seekMenu(10);
}

function restoreAll() {
    for (const el of document.querySelectorAll<HTMLElement>(`[${MARK}], [${NAMED}]`)) {
        restoreChip(el);
    }
    dropOurs(document, FACE_CLASS);
    dropOurs(document, NAME_CLASS);
    unhost(document);
}

function mountAvatarPanel(root: HTMLElement): () => void {
    root.className = "bloom-csi-panel";
    let remoteFail = false;
    let urlTimer: ReturnType<typeof setTimeout> | null = null;
    let bakeTimer: ReturnType<typeof setTimeout> | null = null;
    const drag = { px: 0, py: 0, x: 0, y: 0, on: false };
    const pos = { x: 0.5, y: 0.5, zoom: 1 };
    let nat: { w: number; h: number } | null = null;

    const preview = document.createElement("img");
    preview.className = "bloom-csi-preview";
    preview.alt = "";
    preview.referrerPolicy = "no-referrer";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "bloom-csi-url";
    input.spellcheck = false;

    const clearBtn = document.createElement("button");
    clearBtn.type = "button";
    clearBtn.className = "bloom-csi-btn";
    clearBtn.textContent = "Clear";

    const row = document.createElement("div");
    row.className = "bloom-csi-avatar";
    row.append(preview, input, clearBtn);

    const hint = document.createElement("p");
    hint.className = "bloom-csi-hint";

    const crop = document.createElement("div");
    crop.className = "bloom-csi-crop";
    const stage = document.createElement("div");
    stage.className = "bloom-csi-stage";
    const stageImg = document.createElement("img");
    stageImg.className = "bloom-csi-stage-img";
    stageImg.alt = "";
    stageImg.draggable = false;
    stage.appendChild(stageImg);
    const zoomRow = document.createElement("div");
    zoomRow.className = "bloom-csi-zoom-row";
    const zoom = document.createElement("input");
    zoom.type = "range";
    zoom.className = "bloom-csi-zoom";
    zoom.min = String(ZOOM_MIN);
    zoom.max = String(ZOOM_MAX);
    zoom.step = "0.05";
    zoom.setAttribute("aria-label", "Zoom");
    const zoomVal = document.createElement("span");
    zoomVal.className = "bloom-csi-zoom-val";
    const reset = document.createElement("button");
    reset.type = "button";
    reset.className = "bloom-csi-btn";
    reset.textContent = "Reset";
    zoomRow.append(zoom, zoomVal, reset);
    const cropHint = document.createElement("p");
    cropHint.className = "bloom-csi-hint";
    cropHint.textContent = "Drag to pan · scroll to zoom. Circle matches the sidebar crop.";
    crop.append(stage, zoomRow, cropHint);

    root.append(row, hint, crop);

    function cropSrc(): string {
        const source = String(settings.store.avatarSource ?? "");
        const raw = String(settings.store.avatarUrl ?? "");
        if (source.startsWith("data:image/")) return source;
        if (raw.startsWith("data:image/")) return raw;
        return "";
    }

    function applyPos(nx: number, ny: number, nz: number) {
        if (!nat) {
            pos.x = nx;
            pos.y = ny;
            pos.zoom = clamp(nz, ZOOM_MIN, ZOOM_MAX);
            return pos;
        }
        const r = cropRect(nat.w, nat.h, nz, nx * nat.w, ny * nat.h);
        pos.x = r.x / nat.w;
        pos.y = r.y / nat.h;
        pos.zoom = r.z;
        return pos;
    }

    function paintStage() {
        const src = cropSrc();
        const raw = String(settings.store.avatarUrl ?? "").trim();
        const pasted = !!src;
        preview.hidden = !raw && !src;
        if (src || raw) preview.src = src || raw;
        input.value = pasted ? "" : raw;
        input.placeholder = pasted
            ? "Pasted image. Drag the circle to crop, or type a URL to replace."
            : "Paste a picture, or https://…";
        crop.hidden = !src;
        hint.hidden = !(remoteFail && /^https?:\/\//.test(raw) && !src);
        hint.textContent = hint.hidden ? "" : "Remote image cannot be cropped (CORS). Paste or drop it instead.";
        if (!src) return;
        pos.x = num(settings.store.cropX, 0.5);
        pos.y = num(settings.store.cropY, 0.5);
        pos.zoom = num(settings.store.cropZoom, 1);
        zoom.value = String(pos.zoom);
        zoomVal.textContent = `${Math.round(pos.zoom * 100)}%`;
        if (stageImg.getAttribute("src") !== src) {
            nat = null;
            stageImg.onload = () => {
                nat = { w: stageImg.naturalWidth, h: stageImg.naturalHeight };
                paintStage();
            };
            stageImg.src = src;
        }
        const r = nat ? cropRect(nat.w, nat.h, pos.zoom, pos.x * nat.w, pos.y * nat.h) : null;
        if (r && nat) {
            stageImg.style.width = `${(nat.w / r.side) * 100}%`;
            stageImg.style.height = `${(nat.h / r.side) * 100}%`;
            stageImg.style.left = `${(0.5 - r.x / r.side) * 100}%`;
            stageImg.style.top = `${(0.5 - r.y / r.side) * 100}%`;
        }
    }

    function commit(nx: number, ny: number, nz: number, immediate = false) {
        const next = applyPos(nx, ny, nz);
        zoom.value = String(next.zoom);
        zoomVal.textContent = `${Math.round(next.zoom * 100)}%`;
        const src = cropSrc();
        const run = () => {
            settings.store.cropX = next.x;
            settings.store.cropY = next.y;
            settings.store.cropZoom = next.zoom;
            if (!src) return;
            void bake(src, next.x, next.y, next.zoom).then(url => {
                if (url) settings.store.avatarUrl = url;
            });
        };
        if (bakeTimer) clearTimeout(bakeTimer);
        if (immediate) run();
        else bakeTimer = setTimeout(run, 80);
        paintStage();
    }

    function onUrlChange(value: string) {
        settings.store.avatarUrl = value;
        const trimmed = value.trim();
        if (urlTimer) clearTimeout(urlTimer);
        if (!trimmed) {
            settings.store.avatarSource = "";
            resetCrop();
            remoteFail = false;
            paintStage();
            return;
        }
        if (trimmed.startsWith("data:image/")) {
            remoteFail = false;
            urlTimer = setTimeout(() => {
                void bitmapFromUrl(trimmed).then(bmp => {
                    if (!bmp) return;
                    const src = capFromBitmap(bmp);
                    bmp.close();
                    if (src) void adoptSource(src).then(() => paintStage());
                });
            }, 80);
            return;
        }
        if (/^https?:\/\//.test(trimmed)) {
            remoteFail = false;
            settings.store.avatarSource = "";
            urlTimer = setTimeout(() => {
                void bitmapFromUrl(trimmed).then(bmp => {
                    if (!bmp) {
                        remoteFail = true;
                        paintStage();
                        return;
                    }
                    const src = capFromBitmap(bmp);
                    bmp.close();
                    if (src) {
                        remoteFail = false;
                        void adoptSource(src).then(() => paintStage());
                    } else {
                        remoteFail = true;
                        paintStage();
                    }
                });
            }, 400);
            return;
        }
        remoteFail = false;
        settings.store.avatarSource = "";
        paintStage();
    }

    row.addEventListener("paste", e => {
        if (imageFile(e.clipboardData)) {
            e.preventDefault();
            remoteFail = false;
            void takeImage(e.clipboardData).then(() => paintStage());
        }
    });
    row.addEventListener("dragover", e => {
        if (imageFile(e.dataTransfer)) e.preventDefault();
    });
    row.addEventListener("drop", e => {
        if (imageFile(e.dataTransfer)) {
            e.preventDefault();
            remoteFail = false;
            void takeImage(e.dataTransfer).then(() => paintStage());
        }
    });
    input.addEventListener("change", () => onUrlChange(input.value));
    input.addEventListener("paste", e => {
        if (imageFile(e.clipboardData)) {
            e.preventDefault();
            remoteFail = false;
            void takeImage(e.clipboardData).then(() => paintStage());
        }
    });
    input.addEventListener("keydown", e => {
        if (cropSrc() && !input.value && (e.key === "Backspace" || e.key === "Delete")) {
            clearAvatar();
            remoteFail = false;
            paintStage();
        }
    });
    clearBtn.addEventListener("click", () => {
        clearAvatar();
        remoteFail = false;
        paintStage();
    });

    stage.addEventListener("pointerdown", e => {
        if (e.button !== 0) return;
        stage.setPointerCapture(e.pointerId);
        drag.on = true;
        drag.px = e.clientX;
        drag.py = e.clientY;
        drag.x = pos.x;
        drag.y = pos.y;
    });
    stage.addEventListener("pointermove", e => {
        if (!drag.on || !nat) return;
        const S = stage.clientWidth;
        if (!S) return;
        const { side } = cropRect(nat.w, nat.h, pos.zoom, drag.x * nat.w, drag.y * nat.h);
        applyPos(
            drag.x - ((e.clientX - drag.px) * (side / S)) / nat.w,
            drag.y - ((e.clientY - drag.py) * (side / S)) / nat.h,
            pos.zoom,
        );
        paintStage();
    });
    stage.addEventListener("pointerup", () => {
        if (!drag.on) return;
        drag.on = false;
        commit(pos.x, pos.y, pos.zoom, true);
    });
    stage.addEventListener("pointercancel", () => { drag.on = false; });
    stage.addEventListener("wheel", e => {
        e.preventDefault();
        commit(pos.x, pos.y, pos.zoom * (e.deltaY < 0 ? 1.08 : 1 / 1.08));
    }, { passive: false });
    zoom.addEventListener("input", () => commit(pos.x, pos.y, Number(zoom.value)));
    reset.addEventListener("click", () => commit(0.5, 0.5, 1, true));

    const render = () => paintStage();
    panelRefresh = render;
    paintStage();
    return () => {
        if (panelRefresh === render) panelRefresh = null;
        if (urlTimer) clearTimeout(urlTimer);
        if (bakeTimer) clearTimeout(bakeTimer);
        root.replaceChildren();
    };
}

export default definePlugin({
    name: "CustomSidebarIdentity",
    description: "Replace the sidebar avatar and display name. Empty fields keep the official values.",
    authors: [Devs.p],
    tags: ["ui"],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>`,
    enabledByDefault: false,
    startAt: StartAt.HostReady,
    managedStyle: UI_STYLE,
    cleanupSelectors: [`.${FACE_CLASS}`, `.${NAME_CLASS}`],
    settings,

    start() {
        started = true;
        failed.clear();
        pinRejects = 0;
        pinBackoffUntil = 0;
        registerStyle(UI_STYLE, css);
        keys = new AbortController();
        document.addEventListener("click", onDocClick, { signal: keys.signal });
        rebindIslands();
        apply();
        logger.debug("started");
    },

    onSettingsChange() {
        failed.clear();
        panelRefresh?.();
        if (started) {
            rebindIslands();
            apply();
        }
    },

    stop() {
        started = false;
        keys?.abort();
        keys = null;
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        if (coordRaf) cancelAnimationFrame(coordRaf);
        coordRaf = 0;
        for (const obs of observers.values()) obs.disconnect();
        observers.clear();
        menuWatch?.disconnect();
        menuWatch = null;
        watchedMenu = null;
        restoreAll();
        clearSize();
        failed.clear();
        logger.debug("stopped");
    },
});
