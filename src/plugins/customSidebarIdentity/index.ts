/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * ChatGPT-side rewrite of Void++ CustomSidebarIdentity (GPL-3.0-or-later).
 * Avatar: Void++ paintImg src-swap on the official profile img, plus Blink
 * object-position throw-off so background-image shows even when React restores
 * src (content:url / padding-box on <img> leave replaced-element pixels on top).
 * Initials / no-img chips (Helium): always mark data-bloom-csi-slot on the
 * face wrap (sibling of .min-w-0, size-* / rounded-full / 1–3 char glyph) so
 * avatarSize matches Bloom++ even with no custom image. Custom bake paints the
 * slot background and ::after (official children hidden), never a new node on
 * the profile button. Name is .truncate::before. Never extra nodes on the
 * React chip, never textContent on official .truncate, never html/body[subtree],
 * never documentElement CSS vars, never wrapper :has(), never hide the avatar
 * node or #bloom-rail-item.
 */

import { definePluginSettings } from "../../api/Settings";
import {
    findAccountMenu,
    findProfileButton,
    findSidebarHost,
    findTinyBar,
    pathHitsProfile,
} from "../../host/accountMenu";
import { Devs } from "../../utils/constants";
import { registerStyle, removeStyle } from "../../utils/css";
import { Logger } from "../../utils/Logger";
import { clamp } from "../../utils/misc";
import definePlugin, { OptionType, StartAt } from "../../utils/types";
import {
    faceSizeSuffixes,
    inChrome,
    pickAvatarSlot,
    SLOT_ATTR,
} from "./face";
import {
    failedAvatars,
    faceImgCss,
    MARK,
    ORIG,
    paintImg,
    restoreImg,
    setAvatarFailHandler,
    sizeBox,
    slotCss,
} from "./paint";
import css from "./styles.css";

const logger = new Logger("CustomSidebarIdentity");
const UI_STYLE = "customSidebarIdentityUi";
const PAGE_STYLE = "customSidebarIdentity";
const FACE_CLASS = "bloom-csi-face";
const NAME_CLASS = "bloom-csi-name";
const SLOT = SLOT_ATTR;
const SOURCE_PX = 1024;
const AVATAR_PX = 256;
const SIZE_MIN = 24;
const SIZE_MAX = 64;
const SIZE_DEFAULT = 40;
const ZOOM_MIN = 1;
const ZOOM_MAX = 4;

const PROFILE = [
    '[data-testid="accounts-profile-button"]',
    '[data-testid="profile-button"]',
    '[data-testid="user-menu-button"]',
    '[data-testid="account-menu-button"]',
    'button[aria-label*="profile" i][aria-haspopup]',
    'button[aria-label*="account" i][aria-haspopup]',
    '[aria-haspopup="menu"][data-testid*="profile" i]',
];

const MENU = [
    '[role="menu"]',
    "[data-radix-menu-content]",
    "[data-radix-dropdown-menu-content]",
    '[id^="headlessui-menu-items"]',
];

const settings = definePluginSettings({
    displayName: {
        type: OptionType.STRING,
        description: "Display name next to the sidebar avatar. Empty fields keep the official name.",
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

let started = false;
let painting = false;
let raf = 0;
let seekRaf = 0;
let keys: AbortController | null = null;
const observers = new Map<Element, MutationObserver>();
let watchedMenu: HTMLElement | null = null;
let menuWatch: MutationObserver | null = null;
let watchedHost: HTMLElement | null = null;
let hostWatch: MutationObserver | null = null;
let panelRefresh: (() => void) | null = null;

function avatarSrc(): string | null {
    const raw = String(settings.store.avatarUrl ?? "").trim();
    if (!raw) return null;
    if (failedAvatars.has(raw)) return null;
    if (raw.startsWith("data:image/")) return raw;
    try {
        const { protocol } = new URL(raw);
        if (protocol === "https:" || protocol === "http:") return raw;
    } catch {
        return null;
    }
    return null;
}

function under(roots: string[], suffix: string): string[] {
    return roots.map(root => `${root} ${suffix}`);
}

function escapeForCssContent(text: string): string {
    return String(text ?? "")
        .replace(/\\/g, "\\\\")
        .replace(/"/g, "\\\"")
        .replace(/\n/g, "\\A ");
}

function nameCss(sel: string[], text: string): string {
    const joined = sel.map(s => `html body ${s}`).join(",");
    const escaped = escapeForCssContent(text);
    return [
        `${joined}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,
        `${joined}::before{content:"${escaped}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`,
    ].join("");
}

function faceImgs(root: HTMLElement): HTMLImageElement[] {
    const out: HTMLImageElement[] = [];
    for (const img of root.querySelectorAll("img")) {
        if (!(img instanceof HTMLImageElement) || inChrome(img)) continue;
        if (img.closest(".min-w-0")) continue;
        out.push(img);
    }
    return out;
}

function pickFace(root: HTMLElement): HTMLImageElement | null {
    const imgs = faceImgs(root);
    if (!imgs.length) return null;
    const ranked = imgs.find(i => /rounded-full|avatar/i.test(i.className) || !!i.getAttribute("alt"));
    return ranked ?? imgs[0];
}

function chipTargets(): HTMLElement[] {
    const out: HTMLElement[] = [];
    const profile = findProfileButton();
    if (profile) out.push(profile);
    const tiny = findTinyBar();
    if (tiny && !out.some(el => tiny.contains(el) || el.contains(tiny))) {
        const inner = tiny.querySelector<HTMLElement>(PROFILE.join(","))
            ?? tiny.querySelector<HTMLElement>("button, a, [role='button']")
            ?? tiny;
        if (inner && !out.includes(inner)) out.push(inner);
    }
    return out;
}

function paintRoot(root: HTMLElement, url: string | null) {
    const face = pickFace(root);
    if (face) paintImg(face, url);
    else {
        for (const img of faceImgs(root)) restoreImg(img);
    }
    const slot = pickAvatarSlot(root, face);
    for (const el of root.querySelectorAll(`[${SLOT}]`)) {
        if (el !== slot) el.removeAttribute(SLOT);
    }
    if (slot) slot.setAttribute(SLOT, "");
}

function menuHeader(menu: HTMLElement): HTMLElement | null {
    const first = menu.firstElementChild;
    if (!(first instanceof HTMLElement)) return null;
    if (first.getAttribute("role")?.startsWith("menuitem")) return null;
    return first;
}

function paintMenu(menu: HTMLElement, url: string | null) {
    const header = menuHeader(menu);
    if (!header) return;
    paintRoot(header, url);
}

function restoreAll() {
    for (const img of document.querySelectorAll<HTMLImageElement>(`img[${MARK}]`)) restoreImg(img);
    for (const el of document.querySelectorAll(`[${SLOT}]`)) el.removeAttribute(SLOT);
}

function applyCss() {
    const size = clamp(Math.round(num(settings.store.avatarSize, SIZE_DEFAULT)), SIZE_MIN, SIZE_MAX);
    const url = avatarSrc();
    const name = trimName();
    const menuOn = settings.store.applyToMenu !== false;
    const rules: string[] = [];

    const imgSel = [
        ...under(PROFILE, "img"),
        "#stage-sidebar-tiny-bar img",
    ];
    if (menuOn) imgSel.push(...under(MENU, "> :first-child img"));

    const nameSel = [
        ...under(PROFILE, ".min-w-0 > .truncate"),
        ...under(PROFILE, ".min-w-0.flex-1 .truncate"),
    ];
    if (menuOn) nameSel.push(...under(MENU, "> :first-child .truncate"));

    const sizeSels = faceSizeSuffixes(SLOT);
    rules.push(sizeBox([
        ...sizeSels.flatMap(suffix => under(PROFILE, suffix)),
    ].join(","), size));
    rules.push(sizeBox(
        sizeSels.map(suffix => `#stage-sidebar-tiny-bar ${suffix}`).join(","),
        32,
    ));
    if (menuOn) {
        rules.push(sizeBox(
            sizeSels.flatMap(suffix => under(MENU, `> :first-child ${suffix}`)).join(","),
            size,
        ));
    }

    if (url) {
        rules.push(faceImgCss(imgSel.join(","), url, size));
        rules.push(faceImgCss("#stage-sidebar-tiny-bar img", url, 32));
        rules.push(slotCss(url));
    }
    if (name) rules.push(nameCss(nameSel, name));

    registerStyle(PAGE_STYLE, rules.join(""));
}

function paintDom() {
    const url = avatarSrc();
    const chips = chipTargets();
    for (const chip of chips) paintRoot(chip, url);
    if (settings.store.applyToMenu !== false) {
        const menu = findAccountMenu();
        if (menu) paintMenu(menu, url);
    }
    for (const marked of document.querySelectorAll<HTMLImageElement>(`img[${MARK}]`)) {
        if (chips.some(c => c.contains(marked))) continue;
        if (marked.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")) continue;
        restoreImg(marked);
    }
}

function apply() {
    if (!started || painting) return;
    painting = true;
    for (const obs of observers.values()) obs.disconnect();
    menuWatch?.disconnect();
    hostWatch?.disconnect();
    try {
        applyCss();
        paintDom();
    } finally {
        painting = false;
        rebindIslands();
        bindHost();
        if (watchedMenu?.isConnected) watchMenu(watchedMenu);
    }
}

function schedule() {
    if (!started || raf) return;
    raf = requestAnimationFrame(() => {
        raf = 0;
        apply();
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
        attributeFilter: ["src", "srcset", "sizes"],
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

function bindHost() {
    const host = findSidebarHost();
    if (!host) {
        hostWatch?.disconnect();
        hostWatch = null;
        watchedHost = null;
        return;
    }
    if (watchedHost === host && hostWatch) {
        hostWatch.observe(host, { childList: true });
        return;
    }
    hostWatch?.disconnect();
    watchedHost = host;
    hostWatch = new MutationObserver(() => {
        if (painting || !started) return;
        rebindIslands();
        schedule();
    });
    hostWatch.observe(host, { childList: true });
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
    menuWatch.observe(menu, { childList: true, subtree: true, attributes: true, attributeFilter: ["src", "srcset", "sizes"] });
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

function seekChip(ticks: number) {
    if (!started) return;
    apply();
    if (chipTargets().length || ticks <= 0) return;
    seekRaf = requestAnimationFrame(() => seekChip(ticks - 1));
}

function onDocClick(e: Event) {
    if (!started) return;
    if (settings.store.applyToMenu === false) return;
    if (!pathHitsProfile(e) && !findAccountMenu()) return;
    seekMenu(10);
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

    function layoutStage() {
        zoom.value = String(pos.zoom);
        zoomVal.textContent = `${Math.round(pos.zoom * 100)}%`;
        const r = nat ? cropRect(nat.w, nat.h, pos.zoom, pos.x * nat.w, pos.y * nat.h) : null;
        if (r && nat) {
            stageImg.style.width = `${(nat.w / r.side) * 100}%`;
            stageImg.style.height = `${(nat.h / r.side) * 100}%`;
            stageImg.style.left = `${(0.5 - r.x / r.side) * 100}%`;
            stageImg.style.top = `${(0.5 - r.y / r.side) * 100}%`;
        }
    }

    function paintStage(fromStore = false) {
        const src = cropSrc();
        const raw = String(settings.store.avatarUrl ?? "").trim();
        const pasted = !!src;
        preview.hidden = !raw && !src;
        if (src || raw) preview.src = src || raw;
        if (document.activeElement !== input) {
            input.value = pasted ? "" : raw;
        }
        input.placeholder = pasted
            ? "Pasted image. Drag the circle to crop, or type a URL to replace."
            : "Paste a picture, or https://…";
        crop.hidden = !src;
        hint.hidden = !(remoteFail && /^https?:\/\//.test(raw) && !src);
        hint.textContent = hint.hidden ? "" : "Remote image cannot be cropped (CORS). Paste or drop it instead.";
        if (!src) return;
        if (fromStore) {
            pos.x = num(settings.store.cropX, 0.5);
            pos.y = num(settings.store.cropY, 0.5);
            pos.zoom = num(settings.store.cropZoom, 1);
        }
        if (stageImg.getAttribute("src") !== src) {
            nat = null;
            stageImg.onload = () => {
                nat = { w: stageImg.naturalWidth, h: stageImg.naturalHeight };
                applyPos(pos.x, pos.y, pos.zoom);
                layoutStage();
            };
            stageImg.src = src;
        }
        layoutStage();
    }

    function commit(nx: number, ny: number, nz: number, immediate = false) {
        applyPos(nx, ny, nz);
        layoutStage();
        const src = cropSrc();
        const run = () => {
            settings.store.cropX = pos.x;
            settings.store.cropY = pos.y;
            settings.store.cropZoom = pos.zoom;
            if (!src) return;
            void bake(src, pos.x, pos.y, pos.zoom).then(url => {
                if (url) settings.store.avatarUrl = url;
            });
        };
        if (bakeTimer) clearTimeout(bakeTimer);
        if (immediate) run();
        else bakeTimer = setTimeout(run, 80);
    }

    function onUrlChange(value: string) {
        settings.store.avatarUrl = value;
        const trimmed = value.trim();
        if (urlTimer) clearTimeout(urlTimer);
        if (!trimmed) {
            settings.store.avatarSource = "";
            resetCrop();
            remoteFail = false;
            paintStage(true);
            return;
        }
        if (trimmed.startsWith("data:image/")) {
            remoteFail = false;
            urlTimer = setTimeout(() => {
                void bitmapFromUrl(trimmed).then(bmp => {
                    if (!bmp) return;
                    const src = capFromBitmap(bmp);
                    bmp.close();
                    if (src) void adoptSource(src).then(() => paintStage(true));
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
                        paintStage(true);
                        return;
                    }
                    const src = capFromBitmap(bmp);
                    bmp.close();
                    if (src) {
                        remoteFail = false;
                        void adoptSource(src).then(() => paintStage(true));
                    } else {
                        remoteFail = true;
                        paintStage(true);
                    }
                });
            }, 400);
            return;
        }
        remoteFail = false;
        settings.store.avatarSource = "";
        paintStage(true);
    }

    row.addEventListener("paste", e => {
        if (imageFile(e.clipboardData)) {
            e.preventDefault();
            remoteFail = false;
            void takeImage(e.clipboardData).then(() => paintStage(true));
        }
    });
    row.addEventListener("dragover", e => {
        if (imageFile(e.dataTransfer)) e.preventDefault();
    });
    row.addEventListener("drop", e => {
        if (imageFile(e.dataTransfer)) {
            e.preventDefault();
            remoteFail = false;
            void takeImage(e.dataTransfer).then(() => paintStage(true));
        }
    });
    input.addEventListener("change", () => onUrlChange(input.value));
    input.addEventListener("paste", e => {
        if (imageFile(e.clipboardData)) {
            e.preventDefault();
            remoteFail = false;
            void takeImage(e.clipboardData).then(() => paintStage(true));
        }
    });
    input.addEventListener("keydown", e => {
        if (cropSrc() && !input.value && (e.key === "Backspace" || e.key === "Delete")) {
            clearAvatar();
            remoteFail = false;
            paintStage(true);
        }
    });
    clearBtn.addEventListener("click", () => {
        clearAvatar();
        remoteFail = false;
        paintStage(true);
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
        layoutStage();
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
    zoom.addEventListener("change", () => commit(pos.x, pos.y, Number(zoom.value), true));
    reset.addEventListener("click", () => commit(0.5, 0.5, 1, true));

    const refresh = () => paintStage(false);
    panelRefresh = refresh;
    paintStage(true);
    return () => {
        if (panelRefresh === refresh) panelRefresh = null;
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
        failedAvatars.clear();
        setAvatarFailHandler(schedule);
        registerStyle(UI_STYLE, css);
        keys = new AbortController();
        document.addEventListener("click", onDocClick, { signal: keys.signal });
        seekChip(40);
        logger.debug("started");
    },

    onSettingsChange() {
        failedAvatars.clear();
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
        if (seekRaf) cancelAnimationFrame(seekRaf);
        seekRaf = 0;
        for (const obs of observers.values()) obs.disconnect();
        observers.clear();
        menuWatch?.disconnect();
        menuWatch = null;
        watchedMenu = null;
        hostWatch?.disconnect();
        hostWatch = null;
        watchedHost = null;
        restoreAll();
        removeStyle(PAGE_STYLE);
        setAvatarFailHandler(null);
        failedAvatars.clear();
        logger.debug("stopped");
    },
});
