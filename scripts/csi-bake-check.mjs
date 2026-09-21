/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Helium / some Chromium builds throw on fetch("data:image/…"). Paste
 * preview still works (File → createImageBitmap) while bake(avatarSource)
 * used to return null. This page monkey-patches fetch to throw on data:
 * URLs and asserts bitmapFromUrl still decodes the fixture PNG.
 */

import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import * as esbuild from "esbuild";

const here = fileURLToPath(new URL(".", import.meta.url));
const fixture = join(here, "fixtures/csi-test-face.png");
const entry = join(here, "../src/plugins/customSidebarIdentity/bitmap.ts");
const dir = mkdtempSync(join(tmpdir(), "bloom-csi-bake-"));
const bundle = join(dir, "bitmap.js");
const html = join(dir, "bake.html");

esbuild.buildSync({
    entryPoints: [entry],
    bundle: true,
    format: "iife",
    globalName: "CsiBitmap",
    outfile: bundle,
    platform: "browser",
    target: "es2022",
});

const js = readFileSync(bundle, "utf8");
const bake = `data:image/png;base64,${readFileSync(fixture).toString("base64")}`;

writeFileSync(html, `<!doctype html>
<html><head><meta charset="utf-8"><title>pending</title></head>
<body>
<pre id="out">running</pre>
<script>
${js}
const src = ${JSON.stringify(bake)};
const realFetch = window.fetch.bind(window);
window.fetch = function(input, init) {
  const url = typeof input === "string" ? input : (input && input.url) || "";
  if (String(url).startsWith("data:")) throw new TypeError("Helium fetch(data:)");
  return realFetch(input, init);
};
CsiBitmap.bitmapFromUrl(src).then(bmp => {
  const ok = !!(bmp && bmp.width > 8 && bmp.height > 8);
  if (bmp) bmp.close();
  document.title = ok ? "PASS" : "FAIL";
  document.body.setAttribute("data-ok", ok ? "1" : "0");
  document.body.setAttribute("data-w", bmp ? String(bmp.width) : "0");
  document.getElementById("out").textContent = ok ? "ok" : "fail";
}).catch(err => {
  document.title = "FAIL";
  document.body.setAttribute("data-ok", "0");
  document.getElementById("out").textContent = String(err);
});
</script>
</body></html>`);

const chrome = spawnSync("timeout", ["15", "google-chrome",
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--user-data-dir=" + join(dir, "chrome"),
    "--virtual-time-budget=2500",
    "--dump-dom",
    html,
], { encoding: "utf8", timeout: 25_000 });

const dom = chrome.stdout || "";
const ok = /data-ok="1"/.test(dom);
rmSync(dir, { recursive: true, force: true });
if (!ok) {
    console.error("csi-bake-check failed — data: URL did not decode when fetch throws");
    console.error(chrome.stderr?.slice(0, 800));
    console.error(dom.slice(0, 1500));
    process.exit(1);
}
console.log("csi-bake-check: ok (bitmapFromUrl survives Helium fetch(data:) throw)");
