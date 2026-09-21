/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Decode data: URLs without fetch(). Helium throws on fetch("data:…"),
 * which left avatarUrl empty while the gear preview (File → bitmap) worked.
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { blobFromDataUrl } from "../src/plugins/customSidebarIdentity/bitmap.ts";

const here = fileURLToPath(new URL(".", import.meta.url));
const png = readFileSync(join(here, "fixtures/csi-test-face.png"));
const url = `data:image/png;base64,${png.toString("base64")}`;

const blob = blobFromDataUrl(url);
assert.ok(blob, "blobFromDataUrl must decode a PNG data URL");
assert.equal(blob.type, "image/png");
assert.ok(blob.size > 100, `expected a real PNG blob, got ${blob.size} bytes`);

assert.equal(blobFromDataUrl("https://example.com/x.png"), null);
assert.equal(blobFromDataUrl("not-a-data-url"), null);

const raw = blobFromDataUrl("data:image/png,hello%20world");
assert.ok(raw);
assert.equal(raw.type, "image/png");

console.log("csi-bitmap-test: ok", { bytes: blob.size });
