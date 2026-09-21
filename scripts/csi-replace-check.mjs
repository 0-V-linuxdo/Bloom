/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Visual + pixel check of CustomSidebarIdentity avatar *replacement*
 * (not just resize). Uses the same sizeBox / faceImgCss / slotCss strings
 * as src/plugins/customSidebarIdentity/index.ts.
 */

import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync, readFileSync, rmSync, copyFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { inflateSync } from "node:zlib";
import * as esbuild from "esbuild";

const here = fileURLToPath(new URL(".", import.meta.url));
const faceEntry = join(here, "../src/plugins/customSidebarIdentity/face.ts");
const dir = mkdtempSync(join(tmpdir(), "bloom-csi-replace-"));
const bundle = join(dir, "face.js");
const html = join(dir, "replace.html");
const shot = join(dir, "replace.png");
const artifact = "/opt/cursor/artifacts/csi_avatar_replace.png";

esbuild.buildSync({
    entryPoints: [faceEntry],
    bundle: true,
    format: "iife",
    globalName: "CsiFace",
    outfile: bundle,
    platform: "browser",
    target: "es2022",
});

const js = readFileSync(bundle, "utf8");

writeFileSync(html, `<!doctype html>
<html><head><meta charset="utf-8"><title>CSI replace pending</title>
<style>
  html,body{margin:0;background:#111;color:#eee;font:14px/1.25 ui-sans-serif,system-ui,sans-serif}
  h1{font-size:15px;margin:0 0 10px}
  .page{display:flex;gap:36px;padding:24px 28px}
  .col{width:260px}
  .label{font-size:12px;color:#9a9a9a;margin-bottom:8px}
  .chip{display:flex;align-items:center;gap:8px;width:100%;padding:8px;border:0;background:transparent;color:inherit;text-align:left;font:inherit}
  .face{width:24px;height:24px;border-radius:999px;background:#0d9488;color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;flex-shrink:0}
  .wrap{width:24px;height:24px;border-radius:999px;overflow:hidden;flex-shrink:0;background:#1d4ed8}
  .wrap img{width:24px;height:24px;display:block}
  .min-w-0{min-width:0}
  .truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:500}
  #metrics{margin:0 28px 20px;font:13px/1.45 ui-monospace,monospace;color:#bbb}
  #metrics b.ok{color:#4ade80} #metrics b.bad{color:#f87171}
  #swatch{width:40px;height:40px;border-radius:8px;margin:0 28px 16px}
</style></head>
<body>
<div class="page">
  <div class="col">
    <div class="label">Official · no CSI paint</div>
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
    <div class="label">CSI replace · bake #e11d48</div>
    <h1>Initials + img must show rose</h1>
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
  </div>
</div>
<div id="swatch"></div>
<pre id="metrics">painting…</pre>
<script>
${js}
function cssUrl(url){ return "url(" + JSON.stringify(url) + ")"; }
function sizeBox(sel, px){
  return sel+"{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:"+px+"px!important;height:"+px+"px!important;min-width:"+px+"px!important;min-height:"+px+"px!important;max-width:"+px+"px!important;max-height:"+px+"px!important;padding:0!important;border-radius:999px!important;overflow:hidden!important;flex-shrink:0!important}";
}
function faceImgCss(sel, url, px){
  const u = cssUrl(url);
  return sel+"{box-sizing:border-box!important;width:"+px+"px!important;height:"+px+"px!important;min-width:"+px+"px!important;min-height:"+px+"px!important;max-width:"+px+"px!important;max-height:"+px+"px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:"+u+"!important;background-size:"+px+"px "+px+"px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}";
}
function slotCss(url){
  const u = cssUrl(url);
  return "[data-bloom-csi-slot]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important;line-height:0!important}[data-bloom-csi-slot] *,[data-bloom-csi-slot]::before{color:transparent!important;font-size:0!important}[data-bloom-csi-slot]::after{content:\\"\\"!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:"+u+"!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important}";
}
function paintImg(img, url){
  img.setAttribute("data-bloom-csi","1");
  if (!img.hasAttribute("data-bloom-csi-orig")) img.setAttribute("data-bloom-csi-orig", img.getAttribute("src")||"");
  img.referrerPolicy = "no-referrer";
  if (img.getAttribute("src") !== url) img.src = url;
}

const c = document.createElement("canvas");
c.width = c.height = 256;
const ctx = c.getContext("2d");
ctx.fillStyle = "#e11d48";
ctx.fillRect(0,0,256,256);
ctx.fillStyle = "#ffffff";
ctx.beginPath(); ctx.arc(128,128,72,0,Math.PI*2); ctx.fill();
const bake = c.toDataURL("image/png");
document.getElementById("swatch").style.background = "#e11d48";

const initials = document.getElementById("initials");
const photo = document.getElementById("photo");
const initFace = document.getElementById("init-face");
const photoImg = document.getElementById("photo-img");
const initSlot = CsiFace.pickAvatarSlot(initials, null);
const photoSlot = CsiFace.pickAvatarSlot(photo, photoImg);
if (initSlot) initSlot.setAttribute(CsiFace.SLOT_ATTR, "");
if (photoSlot) photoSlot.setAttribute(CsiFace.SLOT_ATTR, "");
paintImg(photoImg, bake);

const size = 40;
const suffixes = CsiFace.faceSizeSuffixes(CsiFace.SLOT_ATTR);
const sizeSel = suffixes.flatMap(s => ["#initials "+s, "#photo "+s]).join(",");
const imgSel = "#initials img, #photo img";
const st = document.createElement("style");
st.textContent = sizeBox(sizeSel, size) + faceImgCss(imgSel, bake, size) + slotCss(bake);
document.head.appendChild(st);
document.body.offsetHeight;

function sample(el){
  const r = el.getBoundingClientRect();
  return { w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.left+r.width/2), y: Math.round(r.top+r.height/2) };
}
const after = initSlot ? getComputedStyle(initSlot, "::after") : null;
const photoAfter = photoSlot ? getComputedStyle(photoSlot, "::after") : null;
const initCs = getComputedStyle(initFace);
const result = {
  initSlot: !!initSlot,
  photoSlot: !!(photoSlot && photoSlot.tagName !== "IMG"),
  initBox: sample(initFace),
  photoBox: sample(photoSlot || photoImg),
  initAfterBg: after ? after.backgroundImage.includes("data:image") : false,
  photoAfterBg: photoAfter ? photoAfter.backgroundImage.includes("data:image") : false,
  initFont: initCs.fontSize,
  initColor: initCs.color,
  srcSwapped: photoImg.getAttribute("src") === bake,
  origKept: photoImg.getAttribute("data-bloom-csi-orig")?.startsWith("data:image/gif") === true,
};
const ok = result.initSlot && result.photoSlot && result.initBox.w === 40 && result.photoBox.w === 40
  && result.initAfterBg && result.photoAfterBg && result.srcSwapped && result.origKept
  && result.initFont === "0px";
document.title = ok ? "CSI replace PASS" : "CSI replace FAIL";
document.getElementById("metrics").innerHTML = (ok?"<b class=ok>PASS</b>":"<b class=bad>FAIL</b>")
  + "  initials slot="+result.initSlot+" "+result.initBox.w+"px after="+result.initAfterBg+" font="+result.initFont
  + "\\n  photo slot="+result.photoSlot+" "+result.photoBox.w+"px after="+result.photoAfterBg+" srcSwap="+result.srcSwapped;
document.body.setAttribute("data-result", JSON.stringify(result));
document.body.setAttribute("data-ok", ok ? "1" : "0");
document.body.setAttribute("data-init", result.initBox.x+","+result.initBox.y);
document.body.setAttribute("data-photo", result.photoBox.x+","+result.photoBox.y);
</script>
</body></html>`);

const chromeDir = join(dir, "chrome");
const chrome = spawnSync("timeout", ["12", "google-chrome",
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--hide-scrollbars",
    "--window-size=820,420",
    "--user-data-dir=" + chromeDir,
    "--virtual-time-budget=2000",
    "--screenshot=" + shot,
    "--dump-dom",
    html,
], { encoding: "utf8", timeout: 20_000 });

const dom = chrome.stdout || "";
const m = dom.match(/data-result="([^"]+)"/);
const okAttr = /data-ok="1"/.test(dom);
if (!m) {
    rmSync(dir, { recursive: true, force: true });
    console.error("no data-result");
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
    const i = (Math.round(y) * png.width + Math.round(x)) * 3;
    return [png.pixels[i], png.pixels[i + 1], png.pixels[i + 2]];
}

function near(rgb, target, tol = 45) {
    return Math.abs(rgb[0] - target[0]) <= tol
        && Math.abs(rgb[1] - target[1]) <= tol
        && Math.abs(rgb[2] - target[2]) <= tol;
}

let pixel = {
    initials: null, photo: null,
    initialsIsRose: false, photoIsRose: false,
    initialsIsWhite: false, photoIsWhite: false,
    initialsIsTeal: false, photoIsBlue: false,
};
try {
    const png = readPngRgb(readFileSync(shot));
    pixel.initials = pickRgb(png, result.initBox.x, result.initBox.y);
    pixel.photo = pickRgb(png, result.photoBox.x, result.photoBox.y);
    pixel.initialsIsRose = near(pixel.initials, [225, 29, 72]);
    pixel.photoIsRose = near(pixel.photo, [225, 29, 72]);
    pixel.initialsIsWhite = near(pixel.initials, [255, 255, 255]);
    pixel.photoIsWhite = near(pixel.photo, [255, 255, 255]);
    pixel.initialsIsTeal = near(pixel.initials, [13, 148, 136]);
    pixel.photoIsBlue = near(pixel.photo, [29, 78, 216]);
    pixel.png = { w: png.width, h: png.height };
} catch (e) {
    console.log("pixel-sample-skip", e);
}

try { copyFileSync(shot, artifact); } catch { /* artifacts optional */ }
console.log("csi-replace-pixels", pixel);
rmSync(dir, { recursive: true, force: true });

const initReplaced = (pixel.initialsIsRose || pixel.initialsIsWhite) && !pixel.initialsIsTeal;
const photoReplaced = (pixel.photoIsRose || pixel.photoIsWhite) && !pixel.photoIsBlue;
const replaced = initReplaced && photoReplaced;
if (!okAttr || !replaced) {
    console.error("avatar replacement check failed");
    process.exit(1);
}
console.log("csi-replace-check: ok");
