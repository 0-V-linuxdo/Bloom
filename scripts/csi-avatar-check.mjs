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
<script>
${js}
const profile = document.getElementById("profile");
const faceEl = profile.querySelector(".face");
const slot = CsiFace.pickAvatarSlot(profile, null);
if (slot) slot.setAttribute(CsiFace.SLOT_ATTR, "");
const size = 40;
const css = CsiFace.faceSizeSuffixes(CsiFace.SLOT_ATTR).map(s => "[data-testid='accounts-profile-button'] " + s).join(",")
  + "{box-sizing:border-box!important;display:flex!important;width:"+size+"px!important;height:"+size+"px!important;min-width:"+size+"px!important;min-height:"+size+"px!important;max-width:"+size+"px!important;max-height:"+size+"px!important;border-radius:999px!important}";
const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
document.body.offsetHeight;
const r = faceEl.getBoundingClientRect();
const ok = !!(slot && slot.contains(faceEl) && Math.round(r.width) === 40 && Math.round(r.height) === 40);
document.title = ok ? "PASS" : "FAIL";
document.body.setAttribute("data-result", JSON.stringify({
  ok, hasSlot: !!slot, w: Math.round(r.width), h: Math.round(r.height), text: faceEl.textContent
}));
</script>
</body></html>`);

const chrome = spawnSync("google-chrome", [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--dump-dom",
    html,
], { encoding: "utf8", timeout: 20_000 });

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
