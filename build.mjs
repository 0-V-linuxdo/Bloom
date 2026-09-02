/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import * as esbuild from "esbuild";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(resolve(here, "package.json"), "utf8"));
const isDev = process.argv.includes("--dev");
const isWatch = process.argv.includes("--watch");
const date = new Date();
const stamp = `${date.getUTCFullYear()}${String(date.getUTCMonth() + 1).padStart(2, "0")}${String(date.getUTCDate()).padStart(2, "0")}`;
const displayVersion = `[${stamp}] v${pkg.version}`;
const repo = "https://github.com/0-V-linuxdo/Bloom";
const raw = "https://raw.githubusercontent.com/0-V-linuxdo/Bloom/main";

const header = `// ==UserScript==
// @name         Bloom++
// @namespace    ${repo}
// @version      ${displayVersion}
// @description  Void++-style plugin host for chatgpt.com. Tab favicon, input history, recent chats, hide Share, Dictation, sidebar name, Download apps, and the mistake notice.
// @author       ${pkg.author}
// @homepageURL  ${repo}
// @supportURL   ${repo}/issues
// @icon         ${raw}/assets/logos/bloom-icon.svg
// @match        https://chatgpt.com/*
// @match        https://*.chatgpt.com/*
// @match        https://chat.openai.com/*
// @match        https://free.share-ai.top/*
// @match        https://chatgpt.aicnm.cc/*
// @run-at       document-idle
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_setClipboard
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// @connect      cdn.jsdelivr.net
// @compatible   chrome
// @compatible   firefox
// @compatible   edge
// @license      GPL-3.0-or-later
// @downloadURL  ${raw}/userscript/Bloom.user.js
// @updateURL    ${raw}/userscript/Bloom.user.js
// ==/UserScript==
`;

const outfile = resolve(here, "userscript/Bloom.user.js");
mkdirSync(dirname(outfile), { recursive: true });

const banner = `${header}
/* Bloom++ ${displayVersion}. SPDX-License-Identifier: GPL-3.0-or-later */
`;

const options = {
    entryPoints: [resolve(here, "src/index.ts")],
    bundle: true,
    format: "iife",
    platform: "browser",
    target: "es2022",
    outfile,
    loader: { ".css": "text" },
    banner: { js: banner },
    minify: !isDev,
    sourcemap: isDev,
    logLevel: "info",
};

if (isWatch) {
    const ctx = await esbuild.context(options);
    await ctx.watch();
    console.log("[Bloom++] watching");
} else {
    await esbuild.build(options);
    const built = readFileSync(outfile, "utf8");
    writeFileSync(outfile, built);
    console.log(`[Bloom++] wrote ${outfile} (${built.length} bytes)`);
}
