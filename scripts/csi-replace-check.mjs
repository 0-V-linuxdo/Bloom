/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Visual proof that CustomSidebarIdentity *replaces* the official face with
 * the attached test photo (scripts/fixtures/csi-test-face.png). Uses the
 * real paint.ts / face.ts exports — do not re-type the CSS.
 */

import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync, readFileSync, rmSync, copyFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { inflateSync } from "node:zlib";
import * as esbuild from "esbuild";

const here = fileURLToPath(new URL(".", import.meta.url));
const fixture = join(here, "fixtures/csi-test-face.png");
const faceEntry = join(here, "../src/plugins/customSidebarIdentity/face.ts");
const paintEntry = join(here, "../src/plugins/customSidebarIdentity/paint.ts");
const dir = mkdtempSync(join(tmpdir(), "bloom-csi-replace-"));
const entry = join(dir, "entry.ts");
const bundle = join(dir, "csi.js");
const html = join(dir, "replace.html");
const shot = join(dir, "replace.png");
const artifact = "/opt/cursor/artifacts/csi_avatar_replace_face.png";

const bake = `data:image/png;base64,${readFileSync(fixture).toString("base64")}`;

writeFileSync(entry, `
export * from ${JSON.stringify(faceEntry)};
export * from ${JSON.stringify(paintEntry)};
`);

esbuild.buildSync({
    entryPoints: [entry],
    bundle: true,
    format: "iife",
    globalName: "Csi",
    outfile: bundle,
    platform: "browser",
    target: "es2022",
});

const js = readFileSync(bundle, "utf8");

writeFileSync(html, `<!doctype html>
<html><head><meta charset="utf-8"><title>CSI replace pending</title>
<style>
  html,body{margin:0;background:#171717;color:#eee;font:14px/1.25 ui-sans-serif,system-ui,sans-serif}
  h1{font-size:15px;margin:0 0 12px}
  .page{display:flex;gap:40px;padding:24px 28px}
  .col{width:280px}
  .label{font-size:12px;color:#9a9a9a;margin:0 0 8px}
  .chip{display:flex;align-items:center;gap:8px;width:100%;padding:8px;border:0;background:transparent;color:inherit;text-align:left;font:inherit}
  .face{width:24px;height:24px;border-radius:999px;background:#0d9488;color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;flex-shrink:0}
  .wrap{width:24px;height:24px;border-radius:999px;overflow:hidden;flex-shrink:0;background:#1d4ed8}
  .wrap img{width:24px;height:24px;display:block}
  .min-w-0{min-width:0}
  .truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:500}
  #ref{width:80px;height:80px;border-radius:999px;background-size:cover;background-position:center;margin:0 28px 16px}
  #metrics{margin:0 28px 20px;font:12px/1.45 ui-monospace,monospace;color:#bbb;white-space:pre-wrap}
  #metrics b.ok{color:#4ade80} #metrics b.bad{color:#f87171}
</style></head>
<body>
<div class="page">
  <div class="col">
    <div class="label">Official · no CSI</div>
    <h1>Teal 18 / blue photo</h1>
    <button class="chip" type="button">
      <div class="face">18</div>
      <div class="min-w-0"><div class="truncate">Proffero</div></div>
    </button>
    <button class="chip" type="button">
      <div class="wrap"><img alt="Profile" width="24" height="24" src="data:image/gif;base64,R0lGODlhAQABAIAAAB1O2AAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="></div>
      <div class="min-w-0"><div class="truncate">Photo</div></div>
    </button>
  </div>
  <div class="col">
    <div class="label">CSI replace · attached face</div>
    <h1>Must show the emoji, not 18</h1>
    <button class="chip" id="initials" data-testid="accounts-profile-button" type="button">
      <div class="row" style="display:flex;align-items:center;gap:8px;width:100%">
        <div class="face" id="init-face">18</div>
        <div class="min-w-0"><div class="truncate">Proffero</div></div>
      </div>
    </button>
    <button class="chip" id="photo" data-testid="accounts-profile-button" type="button">
      <div class="row" style="display:flex;align-items:center;gap:8px;width:100%">
        <div class="wrap" id="photo-wrap"><img id="photo-img" alt="Profile" width="24" height="24" src="data:image/gif;base64,R0lGODlhAQABAIAAAB1O2AAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="></div>
        <div class="min-w-0"><div class="truncate">Photo</div></div>
      </div>
    </button>
    <button class="chip" id="large" data-testid="accounts-profile-button" type="button" style="margin-top:12px">
      <div class="row" style="display:flex;align-items:center;gap:8px;width:100%">
        <div class="face" id="large-face" style="width:24px;height:24px">18</div>
        <div class="min-w-0"><div class="truncate">80px check</div></div>
      </div>
    </button>
  </div>
</div>
<div id="ref"></div>
<pre id="metrics">painting…</pre>
<script>
${js}
const bake = ${JSON.stringify(bake)};
document.getElementById("ref").style.backgroundImage = "url(" + JSON.stringify(bake) + ")";

const initials = document.getElementById("initials");
const photo = document.getElementById("photo");
const large = document.getElementById("large");
const initFace = document.getElementById("init-face");
const photoImg = document.getElementById("photo-img");
const largeFace = document.getElementById("large-face");
const initSlot = Csi.pickAvatarSlot(initials, null);
const photoSlot = Csi.pickAvatarSlot(photo, photoImg);
const largeSlot = Csi.pickAvatarSlot(large, null);
if (initSlot) initSlot.setAttribute(Csi.SLOT_ATTR, "");
if (photoSlot) photoSlot.setAttribute(Csi.SLOT_ATTR, "");
if (largeSlot) largeSlot.setAttribute(Csi.SLOT_ATTR, "");
Csi.paintImg(photoImg, bake);

const size = 40;
const suffixes = Csi.faceSizeSuffixes(Csi.SLOT_ATTR);
const size40 = suffixes.flatMap(s => ["#initials "+s, "#photo "+s]).join(",");
const size80 = suffixes.map(s => "#large "+s).join(",");
const imgSel = "#initials img, #photo img";
const st = document.createElement("style");
st.textContent = Csi.sizeBox(size40, size) + Csi.sizeBox(size80, 80)
  + Csi.faceImgCss(imgSel, bake, size) + Csi.slotCss(bake);
document.head.appendChild(st);
document.body.offsetHeight;

function box(el){
  const r = el.getBoundingClientRect();
  return { w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.left), y: Math.round(r.top), cx: Math.round(r.left+r.width/2), cy: Math.round(r.top+r.height/2) };
}
const after = initSlot ? getComputedStyle(initSlot, "::after") : null;
const slotCs = initSlot ? getComputedStyle(initSlot) : null;
const initCs = getComputedStyle(initFace);
const result = {
  initSlot: !!initSlot,
  photoSlot: !!(photoSlot && photoSlot.tagName !== "IMG"),
  largeSlot: !!largeSlot,
  initBox: box(initFace),
  photoBox: box(photoSlot || photoImg),
  largeBox: box(largeFace),
  initAfterBg: after ? after.backgroundImage.includes("data:image") : false,
  slotBg: slotCs ? slotCs.backgroundImage.includes("data:image") : false,
  initFont: initCs.fontSize,
  initVis: initCs.visibility,
  srcSwapped: photoImg.getAttribute("src") === bake,
  origKept: photoImg.getAttribute("data-bloom-csi-orig")?.startsWith("data:image/gif") === true,
};
const ok = result.initSlot && result.photoSlot && result.largeSlot
  && result.initBox.w === 40 && result.photoBox.w === 40 && result.largeBox.w === 80
  && result.initAfterBg && result.slotBg && result.srcSwapped && result.origKept
  && result.initFont === "0px";
document.title = ok ? "CSI replace PASS" : "CSI replace FAIL";
document.getElementById("metrics").innerHTML = (ok?"<b class=ok>DOM PASS</b>":"<b class=bad>DOM FAIL</b>")
  + "  initials "+result.initBox.w+"px after="+result.initAfterBg+" slotBg="+result.slotBg+" font="+result.initFont
  + "\\n  photo "+result.photoBox.w+"px srcSwap="+result.srcSwapped
  + "\\n  large "+result.largeBox.w+"px";
document.body.setAttribute("data-result", JSON.stringify(result));
document.body.setAttribute("data-ok", ok ? "1" : "0");
</script>
</body></html>`);

const chromeDir = join(dir, "chrome");
const chrome = spawnSync("timeout", ["15", "google-chrome",
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--hide-scrollbars",
    "--window-size=900,560",
    "--user-data-dir=" + chromeDir,
    "--virtual-time-budget=2500",
    "--screenshot=" + shot,
    "--dump-dom",
    html,
], { encoding: "utf8", timeout: 25_000 });

const dom = chrome.stdout || "";
const m = dom.match(/data-result="([^"]+)"/);
const okAttr = /data-ok="1"/.test(dom);
if (!m) {
    rmSync(dir, { recursive: true, force: true });
    console.error("no data-result");
    console.error(chrome.stderr?.slice(0, 800));
    console.error(dom.slice(0, 1500));
    process.exit(1);
}
const result = JSON.parse(m[1].replace(/&quot;/g, "\""));
console.log("csi-replace-dom", { okAttr, ...result });

function paeth(a, b, c) {
    const p = a + b - c;
    const pa = Math.abs(p - a);
    const pb = Math.abs(p - b);
    const pc = Math.abs(p - c);
    if (pa <= pb && pa <= pc) return a;
    if (pb <= pc) return b;
    return c;
}

function readPngRgb(buf) {
    if (buf.subarray(0, 8).toString("binary") !== "\x89PNG\r\n\x1a\n") {
        throw new Error("not a png");
    }
    let off = 8;
    let width = 0;
    let height = 0;
    let colorType = 6;
    const idat = [];
    while (off + 8 <= buf.length) {
        const len = buf.readUInt32BE(off);
        const type = buf.subarray(off + 4, off + 8).toString("ascii");
        const data = buf.subarray(off + 8, off + 8 + len);
        if (type === "IHDR") {
            width = data.readUInt32BE(0);
            height = data.readUInt32BE(4);
            colorType = data[9];
        } else if (type === "IDAT") {
            idat.push(data);
        } else if (type === "IEND") {
            break;
        }
        off += 12 + len;
    }
    const bpp = colorType === 2 ? 3 : 4;
    const stride = width * bpp;
    const raw = inflateSync(Buffer.concat(idat));
    const out = Buffer.alloc(height * stride);
    for (let y = 0; y < height; y++) {
        const ft = raw[y * (stride + 1)];
        const src = raw.subarray(y * (stride + 1) + 1, y * (stride + 1) + 1 + stride);
        const dst = out.subarray(y * stride, y * stride + stride);
        const prev = y ? out.subarray((y - 1) * stride, y * stride) : null;
        for (let i = 0; i < stride; i++) {
            const a = i >= bpp ? dst[i - bpp] : 0;
            const b = prev ? prev[i] : 0;
            const c = prev && i >= bpp ? prev[i - bpp] : 0;
            let v = src[i];
            if (ft === 1) v = (v + a) & 255;
            else if (ft === 2) v = (v + b) & 255;
            else if (ft === 3) v = (v + ((a + b) >> 1)) & 255;
            else if (ft === 4) v = (v + paeth(a, b, c)) & 255;
            dst[i] = v;
        }
    }
    const pixels = Buffer.alloc(width * height * 3);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const s = (y * stride) + x * bpp;
            const d = (y * width + x) * 3;
            pixels[d] = out[s];
            pixels[d + 1] = out[s + 1];
            pixels[d + 2] = out[s + 2];
        }
    }
    return { width, height, pixels };
}

function pickRgb(png, x, y) {
    const xi = Math.max(0, Math.min(png.width - 1, Math.round(x)));
    const yi = Math.max(0, Math.min(png.height - 1, Math.round(y)));
    const i = (yi * png.width + xi) * 3;
    return [png.pixels[i], png.pixels[i + 1], png.pixels[i + 2]];
}

function near(rgb, target, tol = 40) {
    return Math.abs(rgb[0] - target[0]) <= tol
        && Math.abs(rgb[1] - target[1]) <= tol
        && Math.abs(rgb[2] - target[2]) <= tol;
}

function isWhite(rgb) {
    return rgb[0] > 210 && rgb[1] > 210 && rgb[2] > 210;
}

function isTeal(rgb) {
    return near(rgb, [13, 148, 136], 36);
}

function isBluePlate(rgb) {
    return near(rgb, [29, 78, 216], 40);
}

function isCyanEye(rgb) {
    return rgb[2] > 150 && rgb[1] > 140 && rgb[0] < rgb[2] - 20 && rgb[1] > rgb[0];
}

function isDarkFeature(rgb) {
    return rgb[0] < 90 && rgb[1] < 80 && rgb[2] < 80;
}

function scanBox(png, box) {
    let white = 0;
    let teal = 0;
    let cyan = 0;
    let dark = 0;
    let n = 0;
    const x0 = box.x + 2;
    const y0 = box.y + 2;
    const x1 = box.x + box.w - 2;
    const y1 = box.y + box.h - 2;
    for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
            const rgb = pickRgb(png, x, y);
            n++;
            if (isWhite(rgb)) white++;
            if (isTeal(rgb)) teal++;
            if (isCyanEye(rgb)) cyan++;
            if (isDarkFeature(rgb)) dark++;
        }
    }
    return {
        n,
        white,
        teal,
        cyan,
        dark,
        center: pickRgb(png, box.cx, box.cy),
        whiteRatio: n ? white / n : 0,
        tealRatio: n ? teal / n : 0,
    };
}

let pixel = { skip: true };
try {
    const png = readPngRgb(readFileSync(shot));
    pixel = {
        skip: false,
        png: { w: png.width, h: png.height },
        initials: scanBox(png, result.initBox),
        photo: scanBox(png, result.photoBox),
        large: scanBox(png, result.largeBox),
    };
} catch (e) {
    console.log("pixel-sample-skip", e);
}

try { copyFileSync(shot, artifact); } catch { /* artifacts optional */ }
console.log("csi-replace-pixels", pixel);
rmSync(dir, { recursive: true, force: true });

function faceReplaced(scan) {
    if (!scan) return false;
    const centerWhite = isWhite(scan.center);
    const centerTeal = isTeal(scan.center);
    const centerBlue = isBluePlate(scan.center);
    const features = scan.cyan + scan.dark;
    return centerWhite && !centerTeal && !centerBlue
        && scan.tealRatio < 0.04
        && scan.whiteRatio > 0.25
        && features >= 4;
}

const replaced = !pixel.skip
    && faceReplaced(pixel.initials)
    && faceReplaced(pixel.photo)
    && faceReplaced(pixel.large);

if (!okAttr || !replaced) {
    console.error("avatar replacement check failed — official face still showing or bake missing");
    process.exit(1);
}
console.log("csi-replace-check: ok (attached face replaced initials + photo)");
