/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * The 2026-09 composer stores the live draft on textarea[name=prompt].
 * An empty #prompt-textarea <p> stub used to make hasDraftText / editorText
 * / PromptQueue takeDraft return "". This page asserts the host helpers
 * read and clear that field.
 */

import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import * as esbuild from "esbuild";

const here = fileURLToPath(new URL(".", import.meta.url));
const entry = join(here, "../src/host/composer.ts");
const dir = mkdtempSync(join(tmpdir(), "bloom-composer-draft-"));
const bundle = join(dir, "composer.js");
const html = join(dir, "draft.html");

esbuild.buildSync({
    entryPoints: [entry],
    bundle: true,
    format: "iife",
    globalName: "Composer",
    outfile: bundle,
    platform: "browser",
    target: "es2022",
});

const js = readFileSync(bundle, "utf8");

writeFileSync(html, `<!doctype html>
<html><head><meta charset="utf-8"><title>pending</title></head>
<body>
<form data-type="unified-composer" style="width:480px;height:80px">
  <div id="prompt-textarea" contenteditable="true" role="textbox">
    <p><br></p>
    <textarea name="prompt" style="width:400px;height:40px">follow up from helium</textarea>
  </div>
  <button type="submit" data-testid="send-button" aria-label="Send">Send</button>
</form>
<section id="old">
  <form data-type="unified-composer" id="old-form" style="display:none">
    <div id="unused" contenteditable="true" role="textbox"><p>hidden old</p></div>
  </form>
</section>
<pre id="out">running</pre>
<script>
${js}
const C = Composer;
const wrap = document.getElementById("prompt-textarea");
const ta = document.querySelector('textarea[name="prompt"]');
const root = C.getComposerRoot();
const editor = C.getActiveEditor();
const cases = {
  rootIsForm: root === document.querySelector('form[data-type="unified-composer"]'),
  editorIsField: editor === ta,
  hasDraftOnWrap: C.hasDraftText(wrap),
  hasDraftDefault: C.hasDraftText(),
  editorTextWrap: C.editorText(wrap) === "follow up from helium",
  draftTextWrap: C.draftText(wrap).trim() === "follow up from helium",
  emptyPDoesNotWin: C.editorText(wrap).trim() !== "",
  chipOnly: false,
};
const chip = document.createElement("div");
chip.id = "chip-editor";
chip.setAttribute("contenteditable", "true");
const atom = document.createElement("button");
atom.setAttribute("contenteditable", "false");
atom.textContent = "App";
chip.append(atom);
document.body.append(chip);
cases.chipOnly = C.hasDraftText(chip) === false;

C.setEditorText(wrap, "");
const taAfterClear = document.querySelector('textarea[name="prompt"]');
cases.cleared = !!(taAfterClear && taAfterClear.isConnected && taAfterClear.value === "" && C.hasDraftText(wrap) === false);

C.setEditorText(taAfterClear || ta, "queued next");
const taAfterWrite = document.querySelector('textarea[name="prompt"]');
cases.wroteField = !!(taAfterWrite && taAfterWrite.value === "queued next" && C.hasDraftText());

const ok = Object.values(cases).every(Boolean);
document.title = ok ? "PASS" : "FAIL";
document.body.setAttribute("data-ok", ok ? "1" : "0");
document.getElementById("out").textContent = JSON.stringify(cases, null, 2);
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
const out = (dom.match(/<pre id="out">([\s\S]*?)<\/pre>/) || [])[1] || chrome.stderr || "";
rmSync(dir, { recursive: true, force: true });
if (!ok) {
    console.error("composer-draft-check failed — new-shell textarea draft was not read or cleared");
    console.error(out);
    process.exit(1);
}
console.log("composer-draft-check: ok (textarea[name=prompt] draft read/write)");
