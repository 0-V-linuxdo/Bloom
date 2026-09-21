/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Headless Chrome check: Helium-style initials chip (no img / rounded-full)
 * must pick a slot and grow to avatarSize (40).
 */

import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import * as esbuild from "esbuild";

const here = fileURLToPath(new URL(".", import.meta.url));
const face = join(here, "../src/plugins/customSidebarIdentity/face.ts");
const dir = mkdtempSync(join(tmpdir(), "bloom-csi-"));
const bundle = join(dir, "face.js");
const html = join(dir, "fixture.html");

esbuild.buildSync({
    entryPoints: [face],
    bundle: true,
    format: "iife",
    globalName: "CsiFace",
    outfile: bundle,
    platform: "browser",
    target: "es2022",
});

const js = readFileSync(bundle, "utf8");
writeFileSync(html, `<!doctype html>
<html><head><meta charset="utf-8"><title>pending</title>
<style>
  body{margin:0;background:#000;color:#fff;font:14px sans-serif}
  #profile{display:flex;align-items:center;gap:8px;padding:8px;border:0;background:transparent;color:inherit}
  .face{width:24px;height:24px;border-radius:999px;background:#0d9488;display:flex;align-items:center;justify-content:center}
  .min-w-0{min-width:0}
</style></head>
<body>
<button id="profile" data-testid="accounts-profile-button" type="button">
  <div class="row" style="display:flex;align-items:center;gap:8px">
    <div class="face">18</div>
    <div class="min-w-0"><div class="truncate">Proffero</div></div>
  </div>
</button>
<button id="photo" data-testid="accounts-profile-button" type="button">
  <div class="row" style="display:flex;align-items:center;gap:8px">
    <div class="wrap rounded-full" style="width:24px;height:24px;border-radius:999px;overflow:hidden">
      <img alt="Profile" width="24" height="24" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==">
    </div>
    <div class="min-w-0"><div class="truncate">Photo</div></div>
  </div>
</button>
<script>
${js}
const bake = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
function sizeCss(rootSel) {
  const size = 40;
  return CsiFace.faceSizeSuffixes(CsiFace.SLOT_ATTR).map(s => rootSel + " " + s).join(",")
    + "{box-sizing:border-box!important;display:flex!important;width:"+size+"px!important;height:"+size+"px!important;min-width:"+size+"px!important;min-height:"+size+"px!important;max-width:"+size+"px!important;max-height:"+size+"px!important;border-radius:999px!important}";
}
const profile = document.getElementById("profile");
const faceEl = profile.querySelector(".face");
const slot = CsiFace.pickAvatarSlot(profile, null);
if (slot) slot.setAttribute(CsiFace.SLOT_ATTR, "");
const photo = document.getElementById("photo");
const img = photo.querySelector("img");
const photoSlot = CsiFace.pickAvatarSlot(photo, img);
if (photoSlot) photoSlot.setAttribute(CsiFace.SLOT_ATTR, "");
const st = document.createElement("style");
st.textContent = sizeCss("#profile") + sizeCss("#photo")
  + "[" + CsiFace.SLOT_ATTR + "]{position:relative!important;color:transparent!important;font-size:0!important}"
  + "[" + CsiFace.SLOT_ATTR + "]::after{content:\\"\\"!important;position:absolute!important;inset:0!important;background-image:url(\\"" + bake + "\\")!important}";
document.head.appendChild(st);
document.body.offsetHeight;
const r = faceEl.getBoundingClientRect();
const after = getComputedStyle(slot, "::after");
const pr = photoSlot.getBoundingClientRect();
const sized = !!(slot && slot.contains(faceEl) && Math.round(r.width) === 40);
const overlay = !!(after && after.backgroundImage.includes("data:image"));
const photoOk = !!(photoSlot && photoSlot.contains(img) && Math.round(pr.width) === 40 && photoSlot.tagName !== "IMG");
const ok = sized && overlay && photoOk;
document.title = ok ? "PASS" : "FAIL";
document.body.setAttribute("data-result", JSON.stringify({
  ok, sized, overlay, photoOk, w: Math.round(r.width), photoW: Math.round(pr.width)
}));
</script>
</body></html>`);

const chrome = spawnSync("google-chrome", [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--user-data-dir=" + join(dir, "chrome"),
    "--virtual-time-budget=1500",
    "--dump-dom",
    html,
], { encoding: "utf8", timeout: 25_000 });

rmSync(dir, { recursive: true, force: true });

if (chrome.status !== 0) {
    console.error(chrome.stderr || chrome.stdout);
    process.exit(chrome.status ?? 1);
}
const m = chrome.stdout.match(/data-result="([^"]+)"/);
if (!m) {
    console.error("no result in dump-dom");
    console.error(chrome.stdout.slice(0, 1200));
    process.exit(1);
}
const result = JSON.parse(m[1].replace(/&quot;/g, "\""));
console.log("csi-avatar-check", result);
if (!result.ok) process.exit(1);
