/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import * as esbuild from "esbuild";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(resolve(here, "package.json"), "utf8"));
const isDev = process.argv.includes("--dev");
const isWatch = process.argv.includes("--watch");
const date = new Date();
const stamp = `${date.getUTCFullYear()}${String(date.getUTCMonth() + 1).padStart(2, "0")}${String(date.getUTCDate()).padStart(2, "0")}`;
const displayVersion = `[${stamp}] v${pkg.version}`;
const repo = "https://github.com/0-V-linuxdo/Bloom";
const raw = "https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main";

const header = `// ==UserScript==
// @name         Bloom++
// @namespace    ${repo}
// @version      ${displayVersion}
// @description  Void++-style plugin host for chatgpt.com. Tab favicon, input history, recent chats, reply notify, next-prompt queue, Recents status, wider thread, thread outline, message times, streamer blur, custom home greeting, custom sidebar identity, hide Share, Dictation, sidebar name, Download apps, upgrade CTAs, and ads.
// @author       ${pkg.author}
// @homepageURL  ${repo}
// @supportURL   ${repo}/issues
// @icon         ${raw}/assets/logos/app-icon/bloom-icon.svg
// @icon64       ${raw}/assets/logos/app-icon/bloom-icon-64.png
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
// @grant        GM_notification
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// @connect      cdn.jsdelivr.net
// @compatible   chrome
// @compatible   firefox
// @compatible   edge
// @license      GPL-3.0-or-later
// @downloadURL  ${raw}/userscript/Bloom.update3.user.js
// @updateURL    ${raw}/userscript/Bloom.update3.user.js
// ==/UserScript==
`;

const outfile = resolve(here, "userscript/Bloom.user.js");
const latestOut = resolve(here, "userscript/Bloom.latest.user.js");
const updateOut = resolve(here, "userscript/Bloom.update.user.js");
const update2Out = resolve(here, "userscript/Bloom.update2.user.js");
const update3Out = resolve(here, "userscript/Bloom.update3.user.js");
mkdirSync(dirname(outfile), { recursive: true });

const SKIP_SUBJECT = /^(chore|brand|docs|ci|style|test|build)([:(]|$)/i;

function gitUpdatedAt(relDir) {
    try {
        const log = execFileSync("git", ["log", "--format=%ct%x09%s", "--", relDir], {
            cwd: here,
            encoding: "utf8",
            stdio: ["ignore", "pipe", "ignore"],
        });
        for (const line of log.split("\n")) {
            const tab = line.indexOf("\t");
            if (tab < 0) continue;
            const sec = Number(line.slice(0, tab));
            const subject = line.slice(tab + 1).trim();
            if (!Number.isFinite(sec) || !sec) continue;
            if (SKIP_SUBJECT.test(subject)) continue;
            return sec * 1000;
        }
    } catch {
        /* no git / empty history */
    }
    return 0;
}

function pluginNameFromIndex(indexPath) {
    if (!existsSync(indexPath)) return null;
    const text = readFileSync(indexPath, "utf8");
    const m = text.match(/export default definePlugin\(\{\s*name:\s*"([^"]+)"/);
    return m?.[1] ?? null;
}

function collectPluginUpdatedAt() {
    const stamps = {};
    const pluginsRoot = resolve(here, "src/plugins");
    for (const entry of readdirSync(pluginsRoot, { withFileTypes: true })) {
        if (entry.name.startsWith(".")) continue;
        if (entry.name === "_core") {
            const settingsDir = join("src/plugins/_core/settings");
            const name = pluginNameFromIndex(resolve(here, settingsDir, "index.ts"));
            if (name) {
                const t = gitUpdatedAt(settingsDir);
                if (t) stamps[name] = t;
            }
            continue;
        }
        if (!entry.isDirectory()) continue;
        const rel = join("src/plugins", entry.name);
        const indexPath = ["index.ts", "index.tsx"]
            .map(f => resolve(here, rel, f))
            .find(existsSync);
        if (!indexPath) continue;
        const name = pluginNameFromIndex(indexPath);
        if (!name) continue;
        const t = gitUpdatedAt(rel);
        if (t) stamps[name] = t;
    }
    return stamps;
}

function pluginMtimeSource() {
    const stamps = collectPluginUpdatedAt();
    const names = Object.keys(stamps).sort();
    console.log(`[Bloom++] plugin.updatedAt ${names.length}: ${names.join(", ")}`);
    const body = Object.entries(stamps)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([name, t]) => `    ${JSON.stringify(name)}: ${t},`)
        .join("\n");
    return `/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Generated by build.mjs from git log of each plugin directory.
 */

import type { Plugin } from "./types";

export const PLUGIN_UPDATED_AT: Record<string, number> = {
${body}
};

export function stampPluginUpdatedAt(plugin: Plugin) {
    const t = PLUGIN_UPDATED_AT[plugin.name];
    if (typeof t === "number" && t > 0) plugin.updatedAt = t;
}
`;
}

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
    plugins: [{
        name: "plugin-mtime",
        setup(build) {
            const filter = /src[\\/]utils[\\/]pluginMtime\.ts$/;
            build.onLoad({ filter }, () => ({
                contents: pluginMtimeSource(),
                loader: "ts",
            }));
        },
    }],
};

if (isWatch) {
    const ctx = await esbuild.context(options);
    await ctx.watch();
    console.log("[Bloom++] watching");
} else {
    await esbuild.build(options);
    const built = readFileSync(outfile, "utf8");
    writeFileSync(outfile, built);
    writeFileSync(latestOut, built);
    writeFileSync(updateOut, built);
    writeFileSync(update2Out, built);
    writeFileSync(update3Out, built);
    console.log(`[Bloom++] wrote ${outfile}, ${latestOut}, ${updateOut}, ${update2Out}, and ${update3Out} (${built.length} bytes)`);
}
