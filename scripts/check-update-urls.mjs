/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Guard the install / in-place update path:
 *   - header @updateURL / @downloadURL stay on Bloom.update3.user.js (refs/heads/main raw)
 *   - never github.com/.../raw (HTML) or jsDelivr @heads/main
 *   - @version vX.Y.Z matches package.json
 *   - optional --fetch checks the live raw body is JS with that same version
 */

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
const REQUIRED_UPDATE =
    "https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main/userscript/Bloom.update3.user.js";

function fail(message) {
    console.error(`[Bloom++] check-update-urls: ${message}`);
    process.exit(1);
}

function headerBlock(source) {
    const start = source.indexOf("// ==UserScript==");
    const end = source.indexOf("// ==/UserScript==");
    if (start < 0 || end < 0 || end <= start) fail("missing UserScript header");
    return source.slice(start, end + "// ==/UserScript==".length);
}

function headerValue(header, key) {
    const match = header.match(new RegExp(`^// @${key}\\s+(.+?)\\s*$`, "m"));
    return match?.[1] ?? "";
}

function checkFile(rel) {
    const source = readFileSync(resolve(root, rel), "utf8");
    const header = headerBlock(source);
    const version = headerValue(header, "version");
    const updateURL = headerValue(header, "updateURL");
    const downloadURL = headerValue(header, "downloadURL");
    if (!version.includes(`v${pkg.version}`)) {
        fail(`${rel} @version ${version} does not contain v${pkg.version}`);
    }
    if (updateURL !== REQUIRED_UPDATE) {
        fail(`${rel} @updateURL must be ${REQUIRED_UPDATE} (got ${updateURL})`);
    }
    if (downloadURL !== REQUIRED_UPDATE) {
        fail(`${rel} @downloadURL must be ${REQUIRED_UPDATE} (got ${downloadURL})`);
    }
    if (/jsdelivr\.net\/gh\/.*@heads\/main/.test(header)) {
        fail(`${rel} header must not use jsDelivr @heads/main`);
    }
    if (/github\.com\/.*\/raw\//.test(header)) {
        fail(`${rel} header must not use github.com/.../raw (returns HTML)`);
    }
    if (!source.startsWith("// ==UserScript==")) {
        fail(`${rel} must start with the UserScript header`);
    }
    console.log(`[Bloom++] ${rel} header ok (${version})`);
}

checkFile("userscript/Bloom.user.js");
checkFile("userscript/Bloom.latest.user.js");
checkFile("userscript/Bloom.update.user.js");
checkFile("userscript/Bloom.update2.user.js");
checkFile("userscript/Bloom.update3.user.js");

if (!process.argv.includes("--fetch")) {
    process.exit(0);
}

const response = await fetch(REQUIRED_UPDATE, {
    headers: { "User-Agent": "Bloom++ update-url check" },
    redirect: "follow",
});
if (!response.ok) {
    fail(`GET ${REQUIRED_UPDATE} → HTTP ${response.status}`);
}
const type = response.headers.get("content-type") ?? "";
if (/\bhtml\b/i.test(type)) {
    fail(`GET ${REQUIRED_UPDATE} returned ${type} (Tampermonkey cannot install HTML)`);
}
const body = await response.text();
if (body.includes("<!DOCTYPE") || body.includes("<html")) {
    fail(`GET ${REQUIRED_UPDATE} body is HTML`);
}
const remoteVersion = headerValue(headerBlock(body), "version");
if (!remoteVersion.includes(`v${pkg.version}`)) {
    fail(`live ${REQUIRED_UPDATE} is ${remoteVersion}, expected v${pkg.version}`);
}
console.log(`[Bloom++] live update URL ok (${remoteVersion}, ${body.length} bytes)`);
