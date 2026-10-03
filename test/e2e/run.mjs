/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "playwright-core";

import { newShell, oldShell } from "./mock/shells.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const script = readFileSync(resolve(root, "userscript/Bloom.user.js"), "utf8");
const appJs = readFileSync(resolve(here, "mock/app.js"), "utf8");
const shots = process.env.BLOOM_SHOTS ?? resolve(root, "test/e2e/.shots");
mkdirSync(shots, { recursive: true });

const CHROMIUM = ["/opt/pw-browsers/chromium", process.env.CHROMIUM_PATH].find(path => path && existsSync(path));
const REPLY_DELAY_MS = 1500;
const RELAY_MS = 800;
const HYDRATE_MS = 2500;
const STREAM_MS = 4000;
const LONG_REPLY_MS = 8000;
const SEND_NOW_WAIT_MS = 4000;
const RELAY_EVENTS = ["resume_conversation_token", "input_message", "stream_handoff", "resume_sse_endpoint", "subscribe_ws_topic", "conversation_detail_metadata"];
const CHAT_A = "11111111-1111-4111-8111-111111111111";
const CHAT_B = "22222222-2222-4222-8222-222222222222";
const CHAT_LONG = "44444444-4444-4444-8444-444444444444";
const CHAT_PAGED = "55555555-5555-4555-8555-555555555555";
const LONG_TURNS = 10;
const MOUNTED_TURNS = 3;
const LOAD_OLDER_MS = 1000;
const NEAR_TOP_PX = 100;
const IMAGE_URL = "https://images.example.test/avatar.png";
const PNG = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
const HOST_CSP = "connect-src 'self' wss://chatgpt.com; media-src 'self' blob:";
const SOUND_URL = "https://sounds.example.test/ding.wav";
const SOUND_SAMPLES = 800;
const SOUND_RATE = 8000;

const results = [];
const check = (name, ok, detail = "") => {
    results.push({ name, ok, detail });
    console.log(`${ok ? "PASS" : "FAIL"} ${name}${detail ? ` (${detail})` : ""}`);
};

const seedSettings = (settings, entry) => entry ? { ...settings, plugins: { Settings: { showSidebarEntry: true }, ...settings?.plugins } } : settings;

const gmShim = settings => `
(() => {
    const store = new Map(Object.entries(${JSON.stringify(settings ? { BloomSettings: settings } : {})}));
    window.unsafeWindow = window;
    window.GM_getValue = (key, fallback) => store.has(key) ? structuredClone(store.get(key)) : fallback;
    window.GM_setValue = (key, value) => store.set(key, structuredClone(value));
    window.GM_setClipboard = () => {};
    window.__menu = [];
    window.GM_registerMenuCommand = (name, fn) => window.__menu.push({ name, fn });
    window.__notifications = [];
    window.GM_notification = details => window.__notifications.push(details.text);
    window.GM_xmlhttpRequest = details => void window.__gmFetch(details.url).then(
        ({ status, body }) => details.onload({ status, response: Uint8Array.from(atob(body), c => c.charCodeAt(0)).buffer }),
        () => details.onerror(),
    );
    window.__favicons = [];
    new MutationObserver(() => {
        const link = document.getElementById("bloom-chat-state-favicon");
        const href = link?.href ?? "";
        if (href && window.__favicons.at(-1) !== href) window.__favicons.push(href);
    }).observe(document, { subtree: true, childList: true, attributes: true, attributeFilter: ["href"] });
})();`;

function wav() {
    const data = SOUND_SAMPLES * 2;
    const buf = Buffer.alloc(44 + data);
    buf.write("RIFF", 0);
    buf.writeUInt32LE(36 + data, 4);
    buf.write("WAVEfmt ", 8);
    buf.writeUInt32LE(16, 16);
    buf.writeUInt16LE(1, 20);
    buf.writeUInt16LE(1, 22);
    buf.writeUInt32LE(SOUND_RATE, 24);
    buf.writeUInt32LE(SOUND_RATE * 2, 28);
    buf.writeUInt16LE(2, 32);
    buf.writeUInt16LE(16, 34);
    buf.write("data", 36);
    buf.writeUInt32LE(data, 40);
    return buf;
}

function conversationJson(id) {
    const now = Date.now() / 1000;
    if (id === CHAT_LONG || id === CHAT_PAGED) {
        const messages = Array.from({ length: LONG_TURNS * 2 }, (_, index) => ({
            id: `long-${index}`,
            author: { role: index % 2 ? "assistant" : "user" },
            create_time: now - 3600 + index,
            content: { content_type: "text", parts: [index % 2 ? `Answer ${(index + 1) / 2}. ${"Long reply line. ".repeat(60)}` : `Question ${index / 2 + 1}`] },
        }));
        return {
            title: "Long chat",
            current_node: messages.at(-1).id,
            mapping: Object.fromEntries([["root", { message: null, parent: null }], ...messages.map((message, index) => [message.id, { message, parent: index ? messages[index - 1].id : "root" }])]),
        };
    }
    return {
        title: id === CHAT_A ? "Everest height" : "Pasta recipe",
        current_node: `${id}-a`,
        mapping: {
            root: { message: null, parent: null },
            [`${id}-u`]: { message: { id: `${id}-u`, author: { role: "user" }, create_time: now - 86400 * 3, content: { content_type: "text", parts: [id === CHAT_A ? "How tall is Everest?" : "How do I cook pasta?"] } }, parent: "root" },
            [`${id}-a`]: { message: { id: `${id}-a`, author: { role: "assistant" }, create_time: now - 86400 * 3 + 5, content: { content_type: "text", parts: [id === CHAT_A ? "About 8,849 metres." : "Boil salted water."] } }, parent: `${id}-u` },
        },
    };
}

async function setup(browser, { shell = "new", theme = "light", settings = null, streamMs = 0, csp = null, replyMs = REPLY_DELAY_MS, entry = true } = {}) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    page.on("pageerror", error => console.log("pageerror", error.message));
    page.on("console", message => message.type() === "error" && console.log("console", message.text()));
    const generateRequests = [];
    await context.route("https://chatgpt.com/**", async route => {
        const url = new URL(route.request().url());
        if (url.pathname === "/mock/app.js") return route.fulfill({ contentType: "text/javascript", body: appJs });
        if (url.pathname === "/mock/slow.js") {
            await new Promise(resolve => setTimeout(resolve, streamMs));
            return route.fulfill({ contentType: "text/javascript", body: "" }).catch(() => {});
        }
        if (url.pathname === "/favicon.ico") return route.fulfill({ contentType: "image/x-icon", body: "" });
        if (url.pathname === "/backend-api/f/conversation" && shell === "new") {
            generateRequests.push(JSON.parse(route.request().postData() ?? "{}"));
            await new Promise(resolve => setTimeout(resolve, RELAY_MS));
            return route.fulfill({ contentType: "text/event-stream", body: `${RELAY_EVENTS.map(type => `data: ${JSON.stringify({ type })}\n\n`).join("")}data: [DONE]\n\n` }).catch(() => {});
        }
        if (url.pathname === "/backend-api/f/conversation") {
            generateRequests.push(JSON.parse(route.request().postData() ?? "{}"));
            await new Promise(resolve => setTimeout(resolve, REPLY_DELAY_MS));
            const events = [
                { v: { message: { id: "srv-u", author: { role: "user" }, create_time: Date.now() / 1000, content: { content_type: "text", parts: ["hi"] } }, conversation_id: "x" } },
                { v: { message: { id: "srv-a", author: { role: "assistant" }, create_time: Date.now() / 1000, content: { content_type: "text", parts: ["Here is the answer."] } } } },
            ];
            return route.fulfill({ contentType: "text/event-stream", body: `${events.map(event => `data: ${JSON.stringify(event)}\n\n`).join("")}data: [DONE]\n\n` }).catch(() => {});
        }
        const conversation = url.pathname.match(/^\/backend-api\/conversations?\/([\w-]+)$/);
        if (conversation) {
            const data = conversationJson(conversation[1]);
            const messages = Object.values(data.mapping).map(node => node.message).filter(Boolean);
            const split = conversation[1] === CHAT_PAGED ? messages.length - MOUNTED_TURNS * 2 : 0;
            const windowed = url.pathname.startsWith("/backend-api/conversations/") ? { title: data.title, messages: url.searchParams.has("older") ? messages.slice(0, split) : messages.slice(split) } : data;
            return route.fulfill({ contentType: "application/json", body: JSON.stringify(windowed) });
        }
        return route.fulfill({ contentType: "text/html", headers: csp ? { "Content-Security-Policy": csp } : {}, body: shell === "new" ? newShell(theme) : oldShell(theme) });
    });
    await context.route("https://images.example.test/**", route => route.fulfill({ contentType: "image/png", headers: { "Access-Control-Allow-Origin": "*" }, body: Buffer.from(PNG, "base64") }));
    await context.routeWebSocket("wss://chatgpt.com/ws/**", ws => ws.onMessage(message => {
        const { replyId } = JSON.parse(String(message));
        setTimeout(() => ws.send(JSON.stringify({ replyId, text: "Here is the answer." })), replyMs);
    }));
    await page.exposeFunction("__gmFetch", url => url === SOUND_URL ? { status: 200, body: wav().toString("base64") } : { status: 404, body: "" });
    await page.addInitScript(gmShim(seedSettings(settings, entry)));
    await page.addInitScript(script);
    return { context, page, generateRequests };
}

const COMPOSER = "form .ProseMirror";
const STOP = 'form button[aria-label="Stop"]';

async function sendPrompt(page, text) {
    await page.locator(COMPOSER).fill(text);
    await page.locator(COMPOSER).press("Enter");
}

async function newShellSuite(browser) {
    const { context, page, generateRequests } = await setup(browser, {
        settings: { plugins: { PromptQueue: { enabled: true }, ResponseNotification: { onlyWhenHidden: false }, GreetingCustomizer: { enabled: true }, NoDictation: { enabled: true }, ChatListStatus: { enabled: true } } },
    });
    await page.goto("https://chatgpt.com/");
    await page.waitForSelector('[data-bloom="entry"]', { state: "attached", timeout: 10_000 });

    check("new shell: entry in expanded sidebar and rail", await page.locator('[data-bloom="entry"]').count() === 2);
    check("new shell: entry is first in the footer", await page.evaluate(() => document.querySelector(".footer")?.firstElementChild?.getAttribute("data-bloom") === "entry"));
    check("styles are adopted, not inserted into <head>", await page.evaluate(() => !document.querySelector('style[id^="bloom-style-"]') && document.adoptedStyleSheets.length > 0));
    check("new shell: menu command registered", await page.evaluate(() => window.__menu.some(item => item.name === "Bloom++ settings")));
    check("Cleaner hides the upgrade link", await page.evaluate(() => getComputedStyle(document.querySelector('[data-testid="upgrade-button"]')).display === "none"));
    check("Cleaner hides the GPTs migration notice and its empty wrappers", await page.evaluate(() => !document.querySelector(".gpts-notice").getClientRects().length));
    check("Cleaner hides the Team auto-reload banner and its wrapper", await page.evaluate(() => !document.querySelector(".auto-reload-banner").getClientRects().length && !document.querySelector(".auto-reload-banner aside").getClientRects().length));
    check("Cleaner keeps an in-thread status and a recovery notice", await page.evaluate(() => {
        const main = document.querySelector("main");
        const status = document.createElement("div");
        status.className = "shrink-0 thread-status";
        status.setAttribute("role", "status");
        status.setAttribute("aria-busy", "true");
        status.textContent = "Generating";
        const recovery = document.createElement("div");
        recovery.className = "text-chatgpt-recovery";
        recovery.textContent = "Message delivery timed out. Please try again.";
        main.append(status, recovery);
        const kept = [status, recovery].every(el => el.getClientRects().length);
        status.remove();
        recovery.remove();
        return kept;
    }));
    check("Cleaner keeps the composer that shares a wrapper with the notice", await page.evaluate(() => ["[data-chatgpt-composer]", ".ComposerLayoutRoot-XCKS7O", ".ProseMirror"].every(selector => document.querySelector(selector).getClientRects().length)));
    check("Cleaner hides the disclaimer", await page.evaluate(() => getComputedStyle(document.querySelector('[data-testid="thread-disclaimer"]')).display === "none"));
    check("Cleaner hides the disclaimer on GPT pages", await page.evaluate(() => {
        const sticky = document.createElement("div");
        sticky.className = "sticky bottom-0 self-end";
        sticky.innerHTML = '<div class="text-center text-xs text-pretty text-codex-description select-none" data-markdown-copy>ChatGPT can make mistakes. Check important info.</div>';
        document.querySelector("[data-app-action-timeline-scroll]").append(sticky);
        const hidden = getComputedStyle(sticky.firstElementChild).display === "none";
        sticky.remove();
        return hidden;
    }));
    check("WiderChat widens the thread", await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width").trim() === "64rem"));
    check("NoSidebarIdentity hides the name", await page.evaluate(() => getComputedStyle(document.querySelector(".chip .truncate .truncate")).visibility === "hidden"));
    check("NoSidebarIdentity enlarges the plan", await page.evaluate(() => getComputedStyle(document.querySelector(".chip .text-xs")).fontSize === "14px"));
    check("GreetingCustomizer replaces the visible home heading", await page.evaluate(() => (document.querySelector(".home-heading")?.getAttribute("data-bloom-text") ?? "").length > 0 && !document.querySelector('h1[aria-hidden="true"][data-bloom-text]')));
    const greeted = () => page.evaluate(() => document.querySelector(".home-heading").hasAttribute("data-bloom-text"));
    await page.evaluate(() => history.pushState(null, "", "/?temporary-chat=true"));
    await page.waitForTimeout(600);
    check("GreetingCustomizer leaves the temporary chat heading alone", !await greeted());
    await page.evaluate(() => history.pushState(null, "", "/"));
    await page.waitForTimeout(600);
    check("GreetingCustomizer comes back after leaving the temporary chat", await greeted());
    check("NoDictation hides the Dictation row on the settings page", await page.evaluate(() => {
        const row = document.createElement("div");
        row.className = "@container/settings-row flex";
        row.innerHTML = '<div>Dictation</div><button role="switch" aria-label="Enable Dictation"></button>';
        document.body.append(row);
        const hidden = getComputedStyle(row).display === "none";
        row.remove();
        return hidden;
    }));
    check("rail entry sits above the Show sidebar overlay", await page.evaluate(() => {
        const rail = document.querySelector("[data-app-navigation-rail]");
        rail.classList.add("open");
        rail.inert = false;
        const button = rail.querySelector('[data-bloom="entry"] button');
        const { x, y, width, height } = button.getBoundingClientRect();
        const hit = document.elementFromPoint(x + width / 2, y + height / 2);
        rail.classList.remove("open");
        rail.inert = true;
        return !!hit && button.contains(hit);
    }));
    check("ChatStateFavicons parks the official icon", await page.evaluate(() => document.querySelector('link[href="/favicon.ico"]')?.media === "not all" && document.head.lastElementChild?.id === "bloom-chat-state-favicon"));

    await page.locator(".footer [data-bloom=entry] button").click();
    await page.waitForSelector('[data-bloom="settings"]');
    await page.locator(".bloom-settings-hint").hover();
    check("panel hint tooltip shows at once on hover", (await page.locator(".bloom-tooltip").textContent({ timeout: 300 }).catch(() => "")).includes("Some need a reload"));
    await page.screenshot({ path: resolve(shots, "panel-hint-light.png"), clip: { x: 0, y: 0, width: 1280, height: 260 } });
    check("panel lists 20 plugins", await page.locator(".bloom-settings-card").count() === 20);
    await page.locator('[data-bloom="settings"] input[type=search]').fill("queue");
    check("panel search filters", await page.locator(".bloom-settings-card").count() === 1);
    await page.locator('[data-bloom="settings"] input[type=search]').fill("");
    await page.locator(".bloom-settings-card", { hasText: "WiderChat" }).locator('[aria-label="Settings"]').click();
    check("plugin settings popup opens", await page.locator(".bloom-settings-popup").isVisible());
    check("slider track is drawn over the host range reset", await page.evaluate(() => getComputedStyle(document.querySelector('.bloom-settings-popup input[type="range"]')).appearance === "auto"));
    await page.locator('.bloom-settings-popup input[type="range"]').fill("80");
    check("slider changes apply live", await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width").trim() === "80rem"));
    await page.screenshot({ path: resolve(shots, "panel-popup-light.png") });
    await page.keyboard.press("Escape");
    await page.locator(".bloom-settings-card", { hasText: "ResponseNotification" }).locator('[aria-label="Settings"]').click();
    check("ResponseNotification offers one Preview button for the sound", await page.evaluate(() => {
        const popup = document.querySelector(".bloom-settings-popup");
        const component = popup?.querySelector(".bloom-settings-component");
        return component?.textContent === "Preview" && !component.closest(".bloom-settings-field")?.querySelector(".bloom-settings-field-text");
    }));
    await page.keyboard.press("Escape");
    await page.screenshot({ path: resolve(shots, "panel-light.png") });
    await page.keyboard.press("Escape");
    check("Escape closes the panel", await page.locator('[data-bloom="settings"]').count() === 0);

    await page.locator(".profile-overlay").click();
    await page.waitForSelector('[data-bloom="menu-entry"]', { timeout: 2000 }).catch(() => {});
    check("account menu starts with the Bloom++ entry", await page.evaluate(() => document.getElementById("profile-menu")?.firstElementChild?.getAttribute("data-bloom") === "menu-entry"));
    await page.locator(".profile-overlay").click();

    await sendPrompt(page, "First question");
    await page.waitForTimeout(300);
    const rotating = await page.evaluate(() => document.getElementById("bloom-chat-state-favicon")?.href ?? "");
    check("favicon shows generating", rotating.startsWith("data:image/png"));
    check("BetterNavigator dashes the open assistant tick", await page.locator(".bloom-nav-tick-streaming").count() === 1);
    check("new chat first sits on a local id", page.url().includes("/c/local-"), page.url());
    await page.locator(COMPOSER).fill("Queued follow-up");
    await page.locator(COMPOSER).press("Enter");
    await page.waitForTimeout(150);
    check("PromptQueue queues during a reply", await page.locator(".bloom-queue-count").textContent() === "1 Queued message");
    await page.waitForFunction(() => /^\/c\/(?!local-)/.test(location.pathname));
    await page.waitForTimeout(200);
    check("ChatListStatus spins on the open chat", await page.locator('[data-bloom="cls"][data-status="streaming"]').count() === 1);
    check("PromptQueue keeps the queue when the local id becomes real", await page.locator(".bloom-queue-count").textContent() === "1 Queued message");
    check("favicon stays generating after the id becomes real", await page.evaluate(() => document.getElementById("bloom-chat-state-favicon")?.href) === rotating);
    check("PromptQueue clears the composer", (await page.locator(COMPOSER).textContent()).trim() === "");
    await page.screenshot({ path: resolve(shots, "queue-light.png") });
    await page.waitForFunction(() => window.__notifications.length > 0, null, { timeout: 5000 }).catch(() => {});
    check("ResponseNotification fires when the reply is done", await page.evaluate(() => window.__notifications[0]?.includes("finished answering")));
    await page.waitForFunction(count => document.querySelectorAll("[data-chatgpt-search-unit-key]").length >= count, 4, { timeout: 5000 }).catch(() => {});
    check("PromptQueue sends the queued message after the reply", generateRequests.length >= 2 && generateRequests[1].messages?.[0]?.content?.parts?.[0] === "Queued follow-up");
    check("PromptQueue leaves the first reply intact", await page.locator('[data-chatgpt-search-unit-key$=":assistant"] .markdown').first().textContent() === "Here is the answer.");
    await page.waitForFunction(stop => !document.querySelector(stop), STOP, { timeout: 5000 });
    await page.waitForTimeout(700);
    const favicons = await page.evaluate(() => window.__favicons);
    check("favicon moved through wait, generating and done", favicons.length >= 3 && favicons.at(-1).startsWith("data:image/png") && favicons.at(-1) !== rotating, `${favicons.length} states`);
    check("ChatListStatus clears after the reply", await page.locator('[data-bloom="cls"]').count() === 0);
    check("MessageTimestamps stamps live messages", await page.locator('time[data-bloom="timestamp"]').count() >= 2);
    check("BetterNavigator sits at the right edge of the thread, not beside the text column", await page.evaluate(() => {
        const scroller = document.querySelector("[data-app-action-timeline-scroll]");
        const { left } = scroller.getBoundingClientRect();
        const rail = document.querySelector(".bloom-nav-root").getBoundingClientRect();
        return Math.abs(left + scroller.clientLeft + scroller.clientWidth - 12 - rail.right) < 1;
    }));
    check("BetterNavigator keeps its ticks when a message's text changes", await page.evaluate(async () => {
        const before = [...document.querySelectorAll(".bloom-nav-tick")];
        const markdown = [...document.querySelectorAll('[data-chatgpt-search-unit-key$=":assistant"] .markdown')].at(-1);
        markdown.textContent = "A longer streamed answer";
        await new Promise(resolve => setTimeout(resolve, 200));
        const after = [...document.querySelectorAll(".bloom-nav-tick")];
        return after.length === before.length && after.every((tick, index) => tick === before[index]) && after.at(-1).title.includes("A longer streamed answer");
    }));
    check("BetterNavigator draws one tick per message", await page.locator(".bloom-nav-tick").count() === await page.locator("[data-chatgpt-search-unit-key]").count());

    await page.locator(COMPOSER).focus();
    await page.keyboard.press("ArrowUp");
    check("InputHistory recalls the last prompt", (await page.locator(COMPOSER).textContent()).trim() === "Queued follow-up");
    await page.keyboard.press("Escape");
    check("InputHistory restores the draft on Escape", (await page.locator(COMPOSER).textContent()).trim() === "");

    await page.locator(`a[href="/c/${CHAT_A}"]`).first().click();
    await page.waitForSelector("[data-turn-key]");
    await page.waitForTimeout(400);
    check("MessageTimestamps uses create_time from the page's own request", (await page.locator('time[data-bloom="timestamp"]').first().textContent())?.length > 5);
    check("BetterNavigator summaries skip Bloom's own text", !(await page.locator(".bloom-nav-row").allTextContents()).join(" ").match(/\d{2}:\d{2}/));
    check("MessageTimestamps stamps both messages of a loaded turn", await page.locator('[data-chatgpt-search-unit-key] > time[data-bloom="timestamp"]').count() === 2);
    await page.locator(`a[href="/c/${CHAT_B}"]`).first().click();
    await page.waitForTimeout(400);
    await page.locator("body").click({ position: { x: 700, y: 300 } });
    await page.keyboard.down("Control");
    await page.keyboard.press("Backquote");
    await page.waitForSelector('[data-bloom="recent"]');
    const items = await page.locator(".bloom-recent-item").allTextContents();
    check("RecentTopics lists recent chats", items.length >= 3 && items[0].includes("Pasta") && items[1].includes("Everest"), items.map(item => item.slice(0, 20)).join(" | "));
    await page.screenshot({ path: resolve(shots, "recent-light.png") });
    await page.keyboard.up("Control");
    await page.waitForTimeout(300);
    check("RecentTopics switches on Ctrl release", page.url().endsWith(CHAT_A), page.url());

    await context.close();
}

async function stopAndSwitchSuite(browser) {
    const { context, page } = await setup(browser, { settings: { plugins: { ResponseNotification: { onlyWhenHidden: false } } } });
    await page.goto(`https://chatgpt.com/c/${CHAT_A}`);
    await page.waitForSelector('[data-bloom="entry"]', { state: "attached", timeout: 10_000 });
    await sendPrompt(page, "Stop me");
    await page.waitForTimeout(300);
    await page.locator(STOP).click();
    await page.waitForTimeout(RELAY_MS + 900);
    check("stopping a reply does not notify", await page.evaluate(() => window.__notifications.length === 0));
    check("stopping a reply returns the favicon to idle", await page.evaluate(() => document.getElementById("bloom-chat-state-favicon")?.href.endsWith("/favicon.ico")));
    await sendPrompt(page, "Leave me");
    await page.waitForTimeout(300);
    await page.locator(`a[href="/c/${CHAT_B}"]`).first().click();
    await page.waitForTimeout(REPLY_DELAY_MS + 800);
    check("leaving a chat mid-reply does not notify", await page.evaluate(() => window.__notifications.length === 0));
    await context.close();
}

async function throttledTimersSuite(browser) {
    const { context, page } = await setup(browser, { settings: { plugins: { ResponseNotification: { onlyWhenHidden: false } } } });
    await page.addInitScript(() => {
        const slow = window.setInterval;
        window.setInterval = (fn, ms, ...args) => slow(fn, Math.max(ms, 120_000), ...args);
    });
    await page.goto(`https://chatgpt.com/c/${CHAT_A}`);
    await page.waitForSelector('[data-bloom="entry"]', { state: "attached", timeout: 15_000 });
    await sendPrompt(page, "Throttle me");
    await page.waitForFunction(stop => !document.querySelector(stop), STOP, { timeout: 10_000 });
    await page.waitForTimeout(1500);
    check("a reply ends on time when page timers are throttled", await page.evaluate(() => window.__notifications.length === 1));
    await context.close();
}

async function slowHydrationSuite(browser) {
    const { context, page } = await setup(browser);
    await page.addInitScript(ms => {
        window.__hydrateDelay = ms;
    }, HYDRATE_MS);
    await page.goto(`https://chatgpt.com/c/${CHAT_A}`);
    await page.waitForTimeout(HYDRATE_MS / 2);
    check("nothing is inserted into the sidebar before React hydrates it", await page.locator('[data-bloom="entry"]').count() === 0);
    const errors = await (await page.waitForFunction(() => window.__hydrationErrors)).jsonValue();
    check("React finds no Bloom nodes inside its tree when it hydrates", errors.length === 0, errors.join(", "));
    await page.waitForSelector('[data-bloom="entry"]', { state: "attached", timeout: 10_000 });
    await page.waitForTimeout(400);
    check("the entry and timestamps appear after hydration", await page.locator('[data-bloom="entry"]').count() === 2 && await page.locator('time[data-bloom="timestamp"]').count() === 2);
    await context.close();
}

async function streamedLoadSuite(browser) {
    const { context, page } = await setup(browser, { streamMs: STREAM_MS });
    await page.goto("https://chatgpt.com/", { waitUntil: "commit" });
    await page.waitForTimeout(STREAM_MS / 3);
    check("page is still loading", await page.evaluate(() => document.readyState === "loading"));
    check("NoSidebarIdentity hides the name while the page is still loading", await page.evaluate(() => getComputedStyle(document.querySelector(".chip .truncate .truncate")).visibility === "hidden"));
    check("the entry appears once React hydrates, before DOMContentLoaded", await page.locator('[data-bloom="entry"]').count() === 2);
    await context.close();
}

async function projectPageSuite(browser) {
    const { context, page } = await setup(browser, { settings: { plugins: { NoShareLink: { enabled: true } } } });
    const shareHidden = () => page.evaluate(async () => {
        const button = document.createElement("button");
        button.type = "button";
        button.setAttribute("aria-haspopup", "dialog");
        button.innerHTML = "<svg></svg> Share";
        document.querySelector("main").prepend(button);
        await new Promise(resolve => setTimeout(resolve, 200));
        const hidden = getComputedStyle(button).display === "none";
        button.remove();
        return hidden;
    });
    await page.goto("https://chatgpt.com/g/g-p-0123abcd-trip/project");
    await page.waitForSelector('[data-bloom="entry"]', { state: "attached", timeout: 10_000 });
    check("NoShareLink hides the unlabeled project Share button", await shareHidden());
    await page.goto(`https://chatgpt.com/c/${CHAT_A}`);
    await page.waitForSelector('[data-bloom="entry"]', { state: "attached", timeout: 10_000 });
    check("NoShareLink leaves an unlabeled Share outside projects to the chat rules", !await shareHidden());
    check("NoShareLink hides Share prompt on messages", await page.evaluate(() => {
        const button = document.createElement("button");
        button.setAttribute("aria-label", "Share prompt");
        document.querySelector("main").append(button);
        const hidden = getComputedStyle(button).display === "none";
        button.remove();
        return hidden;
    }));
    await context.close();
}

async function customIdentitySuite(browser) {
    const image = `data:image/png;base64,${PNG}`;
    const { context, page } = await setup(browser, {
        settings: { plugins: { CustomSidebarIdentity: { enabled: true, avatarUrl: image, avatarSource: image, cropZoom: 1.2999999999999996 } } },
        csp: HOST_CSP,
    });
    await page.goto("https://chatgpt.com/");
    await page.waitForSelector('[data-bloom="entry"]', { state: "attached", timeout: 10_000 });
    await page.waitForTimeout(300);
    const sizes = await page.evaluate(() => {
        const rail = document.querySelector("[data-app-navigation-rail]");
        rail.classList.add("open");
        rail.inert = false;
        const [chip, railAvatar] = [".footer", "[data-app-navigation-rail]"].map(scope => document.querySelector(`${scope} [data-bloom-csi-avatar]`)?.getBoundingClientRect().width);
        rail.classList.remove("open");
        rail.inert = true;
        return { chip, rail: railAvatar };
    });
    check("custom avatar follows avatarSize in the sidebar and stays 32px in the rail", sizes.chip === 40 && sizes.rail === 32, JSON.stringify(sizes));
    await page.locator(".footer [data-bloom=entry] button").click();
    await page.locator(".bloom-settings-card", { hasText: "CustomSidebarIdentity" }).locator('[aria-label="Settings"]').click();
    const zoomLabel = () => page.locator(".bloom-csi-zoom output").textContent({ timeout: 3000 }).catch(() => null);
    const rounded = /^\d(?:\.\d)?×$/;
    const stored = await zoomLabel();
    check("stored crop zoom shows a rounded label", rounded.test(stored ?? ""), stored);
    await page.locator(".bloom-csi-canvas").hover();
    await page.mouse.wheel(0, -133);
    await page.waitForTimeout(100);
    const wheeled = await zoomLabel();
    check("wheel zoom shows a rounded label", rounded.test(wheeled ?? ""), wheeled);
    await page.locator('.bloom-csi-controls input[type="url"]').fill(IMAGE_URL);
    await page.locator('.bloom-csi-controls input[type="url"]').press("Enter");
    await page.waitForTimeout(500);
    check("CustomSidebarIdentity loads an https image under the host connect-src", !await page.locator(".bloom-csi-status").textContent(), await page.locator(".bloom-csi-status").textContent());
    await context.close();
}

async function customSoundSuite(browser) {
    const { context, page } = await setup(browser, { settings: { plugins: { ResponseNotification: { soundUrl: SOUND_URL } } }, csp: HOST_CSP });
    await page.addInitScript(() => {
        window.__played = [];
        const { start } = AudioBufferSourceNode.prototype;
        AudioBufferSourceNode.prototype.start = function (...args) {
            window.__played.push(this.buffer?.duration ?? 0);
            return start.apply(this, args);
        };
    });
    await page.goto("https://chatgpt.com/");
    await page.waitForSelector('[data-bloom="entry"]', { state: "attached", timeout: 10_000 });
    await page.locator(".footer [data-bloom=entry] button").click();
    await page.locator(".bloom-settings-card", { hasText: "ResponseNotification" }).locator('[aria-label="Settings"]').click();
    await page.locator(".bloom-settings-component button", { hasText: "Preview" }).click();
    await page.waitForFunction(() => window.__played.length > 0, null, { timeout: 3000 }).catch(() => {});
    check("a custom sound URL plays under the host media-src", await page.evaluate(seconds => Math.abs(window.__played[0] - seconds) < 0.01, SOUND_SAMPLES / SOUND_RATE));
    await page.locator('.bloom-settings-popup input[placeholder^="https://"]').fill("");
    await page.locator('.bloom-settings-popup input[placeholder^="https://"]').press("Enter");
    await page.locator(".bloom-settings-component button", { hasText: "Preview" }).click();
    await page.waitForFunction(() => window.__played.length > 1, null, { timeout: 3000 }).catch(() => {});
    check("the default sound is the Void++ done chime", await page.evaluate(() => window.__played[1] > 0.3), await page.evaluate(() => String(window.__played[1])));
    await context.close();
}

async function queueEditingSuite(browser) {
    const { context, page, generateRequests } = await setup(browser, { settings: { plugins: { PromptQueue: { enabled: true } } }, replyMs: LONG_REPLY_MS });
    await page.goto(`https://chatgpt.com/c/${CHAT_A}`);
    await page.waitForSelector('[data-bloom="entry"]', { state: "attached", timeout: 10_000 });
    await sendPrompt(page, "Write a long answer");
    await page.waitForSelector(STOP);
    for (const text of ["Q1 first", "Q2 second"]) await sendPrompt(page, text);
    await page.waitForFunction(() => document.querySelector(".bloom-queue-count")?.textContent === "2 Queued messages");
    check("PromptQueue tray toggle reports it is expanded", await page.locator(".bloom-queue-toggle").getAttribute("aria-expanded") === "true");
    await page.locator(".bloom-queue-row").first().locator('[aria-label="Edit"]').click();
    await page.keyboard.type(" XXX");
    await page.keyboard.press("Escape");
    await page.waitForTimeout(100);
    check("Escape cancels a queued edit and keeps the text", await page.evaluate(() => !document.querySelector(".bloom-queue-editor") && document.querySelector(".bloom-queue-row .bloom-queue-text")?.textContent === "Q1 first"));
    await page.locator(".bloom-queue-row").nth(1).locator('[aria-label="Send now"]').click();
    const sent = () => generateRequests.some(request => request.messages?.[0]?.content?.parts?.[0] === "Q2 second");
    for (let waited = 0; !sent() && waited < SEND_NOW_WAIT_MS; waited += 100) await page.waitForTimeout(100);
    check("Send now stops the reply and sends the item once Send is ready", sent() && (await page.locator(COMPOSER).textContent()).trim() === "");
    check("Send now keeps the rest of the queue", await page.locator(".bloom-queue-count").textContent() === "1 Queued message");
    await sendPrompt(page, "Q3 third");
    await page.waitForFunction(() => document.querySelector(".bloom-queue-count")?.textContent === "2 Queued messages");
    const before = generateRequests.length;
    await page.reload();
    await page.waitForFunction(() => document.querySelector(".bloom-queue-count")?.textContent === "2 Queued messages", null, { timeout: 5000 }).catch(() => {});
    const restored = await page.locator(".bloom-queue-row .bloom-queue-text").allTextContents();
    check("PromptQueue restores the queue in order after a reload", restored.join("|") === "Q1 first|Q3 third" && generateRequests.length === before, restored.join("|"));
    await page.locator(".bloom-queue-row").first().locator('[aria-label="Send now"]').click();
    const resent = () => generateRequests.some(request => request.messages?.[0]?.content?.parts?.[0] === "Q1 first");
    for (let waited = 0; !resent() && waited < SEND_NOW_WAIT_MS; waited += 100) await page.waitForTimeout(100);
    check("a restored queue item sends with Send now", resent() && await page.locator(".bloom-queue-row .bloom-queue-text").allTextContents().then(rows => rows.join("|")) === "Q3 third");
    await context.close();
}

async function composerOpacitySuite(browser) {
    const { context, page } = await setup(browser, { theme: "dark", settings: { plugins: { ComposerOpacity: { opacity: 60, blur: 4 } } } });
    await page.goto("https://chatgpt.com/");
    await page.waitForSelector('[data-bloom="entry"]', { state: "attached", timeout: 10_000 });
    const blurred = await page.evaluate(() => [...document.querySelectorAll("form *")].map(el => ({ el, style: getComputedStyle(el) })).filter(({ style }) => style.backdropFilter !== "none")
        .map(({ el, style }) => ({ name: el.className, background: style.backgroundColor, blur: style.backdropFilter, radius: style.borderRadius })));
    const [red, alpha] = [...blurred[0]?.background.matchAll(/[\d.]+/g) ?? []].map(Number).filter((_, index) => index === 0 || index === 3);
    const corner = await page.evaluate(() => {
        const body = document.querySelector('[class*="ComposerLayoutBody"]');
        const root = document.querySelector('[class*="ComposerLayoutRoot"]');
        const rect = body.getBoundingClientRect();
        const hit = document.elementsFromPoint(rect.left + 1, rect.top + 1).some(el => String(el.className).includes("ComposerLayoutBody"));
        const rootStyle = getComputedStyle(root);
        return { hit, rootBlur: rootStyle.backdropFilter, rootBg: rootStyle.backgroundColor, height: rect.height };
    });
    check("ComposerOpacity blurs only the rounded composer body", blurred.length === 1 && blurred[0].name.startsWith("ComposerLayoutBody") && blurred[0].blur === "blur(4px)" && blurred[0].radius === "26px", JSON.stringify(blurred));
    check("ComposerOpacity keeps the composer's own dark fill, only translucent", red < 0.2 && alpha === 0.6, blurred[0]?.background);
    check("ComposerOpacity does not paint the square corners around the pill", corner.hit === false && corner.rootBlur === "none" && corner.rootBg === "rgba(0, 0, 0, 0)" && corner.height >= 52, JSON.stringify(corner));
    await page.locator(COMPOSER).click();
    await page.keyboard.type("See-through");
    check("ComposerOpacity keeps the composer typable", (await page.locator(COMPOSER).textContent()).trim() === "See-through");
    await context.close();
}

async function streamerModeSuite(browser) {
    const { context, page } = await setup(browser, { settings: { plugins: { StreamerMode: { enabled: true } } } });
    await page.goto("https://chatgpt.com/");
    await page.waitForSelector('[data-bloom="entry"]', { state: "attached", timeout: 10_000 });
    await page.evaluate(() => {
        const section = document.createElement("section");
        section.dataset.appActionSidebarSection = "";
        section.dataset.appActionSidebarSectionHeading = "Projects";
        section.innerHTML = '<div role="button" tabindex="0" aria-expanded="true" data-app-action-sidebar-project-row data-app-action-sidebar-project-id="g-p-6a68" data-app-action-sidebar-project-label="Trip" aria-labelledby="_r_8k_"><span id="_r_8k_"><span data-marquee-text><span data-marquee-content>Trip</span></span></span></div><a href="/g/g-p-6a68-trip/c/33333333-3333-4333-8333-333333333333">Trip chat</a>';
        document.querySelector("[data-app-action-sidebar-scroll]").append(section);
    });
    const filters = () => page.evaluate(() => ["[data-app-action-sidebar-project-row]", 'a[href*="/g/g-p-6a68-trip/c/"]'].map(selector => getComputedStyle(document.querySelector(selector)).filter));
    const blurred = await filters();
    check("StreamerMode blurs new-shell project rows and their chats", blurred.every(filter => filter === "blur(6px)"), blurred.join(" "));
    await page.locator("[data-app-action-sidebar-project-row]").hover();
    await page.waitForTimeout(300);
    check("StreamerMode clears a project row on hover", (await filters())[0] === "none");
    await context.close();
}

async function navigatorSeekSuite(browser) {
    const { context, page } = await setup(browser);
    await page.goto(`https://chatgpt.com/c/${CHAT_LONG}`);
    await page.waitForFunction(count => document.querySelectorAll("[data-turn-key]").length === count, LONG_TURNS, { timeout: 10_000 });
    await page.evaluate(({ mounted, delay }) => {
        const scroller = document.querySelector("[data-app-action-timeline-scroll]");
        const column = document.querySelector("[data-chatgpt-conversation-selection-target]");
        const older = [...column.children].slice(0, -mounted);
        for (const turn of older) turn.remove();
        scroller.scrollTop = 0;
        scroller.addEventListener("scroll", () => {
            if (!older.length || column.querySelector("[role=status]") || scroller.scrollTop > scroller.clientHeight - scroller.scrollHeight + 2) return;
            const spinner = document.createElement("div");
            spinner.setAttribute("role", "status");
            column.prepend(spinner);
            setTimeout(() => spinner.replaceWith(...older.splice(0)), delay);
        });
    }, { mounted: MOUNTED_TURNS, delay: LOAD_OLDER_MS });
    await page.waitForTimeout(300);
    check("BetterNavigator lists turns ChatGPT has not mounted yet", await page.locator(".bloom-nav-tick").count() === LONG_TURNS * 2);
    await page.locator("[data-app-action-timeline-scroll]").click({ position: { x: 5, y: 5 } });
    await page.keyboard.press("Home");
    const landed = await page.waitForFunction(() => {
        const first = document.querySelector('[data-chatgpt-search-message-ids="long-0"]');
        const { top } = document.querySelector("[data-app-action-timeline-scroll]").getBoundingClientRect();
        return first && Math.abs(first.getBoundingClientRect().top - top) < 40;
    }, null, { timeout: 6000 }).then(() => true, () => false);
    check("BetterNavigator scrolls up until ChatGPT mounts an older turn, then lands on it", landed && (await page.locator(".bloom-nav-toc-head").textContent()).startsWith("1 /"));
    await context.close();
}

async function navigatorHistorySuite(browser) {
    const { context, page } = await setup(browser);
    await page.goto(`https://chatgpt.com/c/${CHAT_PAGED}`);
    await page.waitForFunction(count => document.querySelectorAll("[data-turn-key]").length === count, MOUNTED_TURNS, { timeout: 10_000 });
    await page.evaluate(({ id, delay, near }) => {
        const scroller = document.querySelector("[data-app-action-timeline-scroll]");
        const column = document.querySelector("[data-chatgpt-conversation-selection-target]");
        let loaded = false;
        scroller.addEventListener("scroll", async () => {
            if (loaded || scroller.scrollTop > scroller.clientHeight - scroller.scrollHeight + near) return;
            loaded = true;
            const spinner = document.createElement("div");
            spinner.setAttribute("role", "status");
            column.prepend(spinner);
            const { messages } = await (await fetch(`/backend-api/conversations/${id}?older=1`)).json();
            await new Promise(resolve => setTimeout(resolve, delay));
            spinner.replaceWith(...Array.from({ length: messages.length / 2 }, (_, index) => {
                const key = `older-${index}`;
                const turn = document.createElement("div");
                turn.dataset.turnKey = key;
                for (const message of messages.slice(index * 2, index * 2 + 2)) {
                    const el = document.createElement("div");
                    el.dataset.chatgptSearchUnitKey = `${key}:${message.author.role}`;
                    el.dataset.chatgptSearchMessageIds = message.id;
                    const body = document.createElement("div");
                    body.className = message.author.role === "user" ? "whitespace-pre-wrap" : "markdown";
                    body.textContent = message.content.parts[0];
                    el.append(body);
                    turn.append(el);
                }
                return turn;
            }));
            scroller.scrollTop = 0;
        });
    }, { id: CHAT_PAGED, delay: LOAD_OLDER_MS, near: NEAR_TOP_PX });
    await page.waitForTimeout(300);
    check("BetterNavigator starts with the turns ChatGPT has loaded", await page.locator(".bloom-nav-tick").count() === MOUNTED_TURNS * 2);
    await page.locator("[data-app-action-timeline-scroll]").click({ position: { x: 5, y: 5 } });
    await page.keyboard.press("Home");
    const landed = await page.waitForFunction(() => {
        const first = document.querySelector('[data-chatgpt-search-message-ids="long-0"]');
        const { top } = document.querySelector("[data-app-action-timeline-scroll]").getBoundingClientRect();
        return first && Math.abs(first.getBoundingClientRect().top - top) < 40;
    }, null, { timeout: 8000 }).then(() => true, () => false);
    const head = await page.locator(".bloom-nav-toc-head").textContent();
    check("BetterNavigator Home follows older turns ChatGPT loads later and lands on the first", landed && head === `1 / ${LONG_TURNS * 2}`, head);
    await context.close();
}

async function defaultEntrySuite(browser) {
    const { context, page } = await setup(browser, { entry: false });
    await page.goto("https://chatgpt.com/");
    await page.waitForFunction(() => window.__menu.length > 0, null, { timeout: 10_000 });
    await page.waitForTimeout(300);
    const expanded = page.locator('.footer [data-bloom="entry"]');
    const rail = page.locator('[data-app-navigation-rail] [data-bloom="entry"]');
    check("the sidebar entry is hidden by default", await page.locator('[data-bloom="entry"]').count() === 2 && !await expanded.isVisible());
    const layout = () => page.evaluate(() => {
        const rail = document.querySelector("[data-app-navigation-rail]");
        return JSON.stringify([document.querySelector(".footer"), document.querySelector("[data-app-action-sidebar-scroll]"), ...rail.querySelectorAll(":scope > :not([data-bloom])")].map(el => el.getBoundingClientRect().toJSON()));
    });
    const before = await layout();
    await page.locator(".footer .relative").hover();
    check("hovering the account row shows the sidebar entry at once", await expanded.isVisible());
    await page.locator(".sidebar").screenshot({ path: resolve(shots, "entry-hover.png") });
    const pill = () => page.evaluate(() => {
        const [entry, row] = ['.footer [data-bloom="entry"] button', ".footer .profile-overlay"].map(selector => document.querySelector(selector).getBoundingClientRect());
        return { gap: entry.bottom - row.top, left: entry.left - row.left, right: row.right - entry.right };
    });
    const flush = await pill();
    check("the revealed sidebar entry sits flush on the account row, right-aligned, without resizing the sidebar", await layout() === before && Math.abs(flush.gap) < 1 && Math.abs(flush.right) < 1, JSON.stringify(flush));
    await expanded.locator("button").hover();
    check("the sidebar entry stays while the pointer is on it", await expanded.isVisible());
    check("the floating sidebar entry stays above the footer divider", await page.evaluate(() => {
        const line = document.querySelector(".footer .hairline");
        const button = document.querySelector('.footer [data-bloom="entry"] button');
        const { left, width } = button.getBoundingClientRect();
        line.style.pointerEvents = "auto";
        const hit = document.elementFromPoint(left + width / 2, line.getBoundingClientRect().top);
        line.style.pointerEvents = "";
        return button.contains(hit);
    }));
    check("the floating sidebar entry stays opaque on hover", await expanded.locator("button").evaluate(button => getComputedStyle(button).backgroundColor === "rgb(255, 255, 255)"));
    const box = await expanded.locator("button").boundingBox();
    const [x, y] = [box.x + box.width / 2, box.y + box.height / 2];
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x - 40, y, { steps: 4 });
    await page.mouse.move(x - 80, 300, { steps: 4 });
    await page.waitForTimeout(400);
    check("the sidebar entry stays shown while it is dragged outside the account area", await expanded.isVisible());
    await page.mouse.up();
    const moved = await pill();
    check("dragging the sidebar entry moves it sideways without opening the panel", Math.abs(moved.right - flush.right - 80) < 2 && Math.abs(moved.gap) < 1 && await page.locator('[data-bloom="settings"]').count() === 0, JSON.stringify(moved));
    const savedPosition = () => page.evaluate(async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return JSON.parse(localStorage.getItem("BloomSettings")).plugins.Settings.entryPosition;
    });
    const dragged = await savedPosition();
    check("the dragged position is saved to the settings store", dragged > 0 && dragged < 1, String(dragged));
    await page.mouse.move(700, 300);
    await page.waitForTimeout(400);
    await page.locator(".footer .relative").hover();
    check("the dragged position is kept after the entry hides and shows again", Math.abs((await pill()).right - moved.right) < 1);
    await expanded.locator("button").hover();
    await page.mouse.down();
    await page.mouse.move(0, y, { steps: 4 });
    await page.mouse.up();
    check("dragging stops at the left edge of the account row", Math.abs((await pill()).left) < 1);
    await expanded.locator("button").evaluate(button => {
        const { left, top } = button.getBoundingClientRect();
        const fire = (type, clientX) => button.dispatchEvent(new PointerEvent(type, { bubbles: true, cancelable: true, composed: true, pointerId: 1, pointerType: "mouse", isPrimary: true, button: 0, buttons: type === "pointerup" ? 0 : 1, clientX, clientY: top + 4 }));
        fire("pointerdown", left + 4);
        for (let step = 1; step <= 10; step++) fire("pointermove", left + 4 + step * 4);
        fire("pointerup", left + 44);
    });
    const synthetic = await savedPosition();
    check("a drag made of dispatched pointer events is saved too", synthetic > 0 && synthetic < dragged && Math.abs((await pill()).left - 40) < 1, String(synthetic));
    await expanded.locator("button").click();
    check("a click on the sidebar entry after a drag still opens the panel", await page.locator('[data-bloom="settings"]').count() === 1);
    await page.keyboard.press("Escape");
    await page.mouse.move(700, 300);
    check("the sidebar entry lingers briefly so the pointer can cross gaps", await expanded.isVisible());
    await page.waitForTimeout(400);
    check("the sidebar entry hides once the pointer leaves", !await expanded.isVisible());
    await page.evaluate(() => {
        const node = document.querySelector("[data-app-navigation-rail]");
        node.classList.add("open");
        node.inert = false;
    });
    const railBefore = await layout();
    await page.locator("[data-app-navigation-rail] [aria-haspopup]").hover();
    check("hovering the rail avatar shows the rail entry", await rail.isVisible());
    const railPill = await page.evaluate(() => {
        const [entry, avatar] = ['[data-app-navigation-rail] [data-bloom="entry"] button', "[data-app-navigation-rail] [aria-haspopup]"].map(selector => document.querySelector(selector).getBoundingClientRect());
        return { gap: entry.bottom - avatar.top, center: entry.left + entry.width / 2 - avatar.left - avatar.width / 2 };
    });
    check("the revealed rail entry sits flush on the avatar, centred, without moving the rail", await layout() === railBefore && Math.abs(railPill.gap) < 1 && Math.abs(railPill.center) < 1, JSON.stringify(railPill));
    await rail.locator("button").click();
    check("the revealed rail entry opens the panel", await page.locator('[data-bloom="settings"]').count() === 1);
    await page.keyboard.press("Escape");
    await page.evaluate(() => {
        const node = document.querySelector("[data-app-navigation-rail]");
        node.classList.remove("open");
        node.inert = true;
    });
    await page.locator(".profile-overlay").click();
    check("the hover entry hides while the account menu is open", !await expanded.isVisible());
    await page.locator('[data-bloom="menu-entry"]').click();
    check("the account menu entry opens the panel", await page.locator('[data-bloom="settings"]').count() === 1);
    await page.locator(".bloom-settings-card", { hasText: "Settings" }).first().locator('[aria-label="Settings"]').click();
    await page.locator(".bloom-settings-popup button", { hasText: "Reset position" }).click();
    check("Reset position puts the sidebar entry back on the right", await expanded.evaluate(wrap => getComputedStyle(wrap).getPropertyValue("--bloom-entry-x").trim() === "1"));
    const [always, onHover] = [0, 1].map(index => page.locator('.bloom-settings-popup [role="switch"]').nth(index));
    await always.click();
    check("showSidebarEntry keeps the sidebar entry shown", await expanded.isVisible());
    await always.click();
    await onHover.click();
    check("turning both entry settings off removes the sidebar entry", await page.locator('[data-bloom="entry"]').count() === 0);
    await context.close();
}

async function sidebarIdentityOpacitySuite(browser) {
    const image = `data:image/png;base64,${PNG}`;
    for (const fadeAvatar of [false, true]) {
        const { context, page } = await setup(browser, {
            settings: { plugins: { CustomSidebarIdentity: { enabled: true, avatarUrl: image }, SidebarIdentityOpacity: { fadeAvatar } } },
            csp: HOST_CSP,
        });
        await page.goto("https://chatgpt.com/");
        await page.waitForSelector(".footer [data-bloom-csi-avatar]", { state: "attached", timeout: 10_000 });
        const opacities = () => page.evaluate(selectors => selectors.map(selector => {
            let value = 1;
            for (let node = document.querySelector(selector); node; node = node.parentElement) value *= Number(getComputedStyle(node).opacity);
            return value;
        }), [".footer [data-bloom-csi-avatar]", ".footer .chip .truncate", '.footer [aria-label="Help"]', "[data-app-navigation-rail] [data-bloom-profile-avatar]", "[data-app-navigation-rail] .sr-only", '[data-app-navigation-rail] a[href="/"]']);
        const [avatar, name, help, railAvatar, railLabel, railTop] = await opacities();
        const faded = fadeAvatar ? 0.5 : 1;
        check(`SidebarIdentityOpacity fades the account row${fadeAvatar ? " and the avatar" : " but not the custom avatar"}`, avatar === faded && name === 0.5 && help === 0.5 && railAvatar === faded && railLabel === 0.5 && railTop === 1, JSON.stringify({ avatar, name, help, railAvatar, railLabel, railTop }));
        await page.locator(".footer .relative").hover();
        check(`SidebarIdentityOpacity restores the account row on hover${fadeAvatar ? " with fadeAvatar" : ""}`, (await opacities()).slice(0, 3).every(value => value === 1));
        await context.close();
    }
}

async function hiddenWorkspaceSuite(browser) {
    const { context, page } = await setup(browser);
    await page.goto(`https://chatgpt.com/c/${CHAT_B}`);
    await page.waitForSelector("[data-turn-key]");
    await page.evaluate(() => {
        const workspace = document.createElement("div");
        workspace.className = "Workspace-IfYAxV";
        workspace.style.display = "none";
        workspace.innerHTML = '<div data-app-action-timeline-scroll><div data-chatgpt-conversation-selection-target><div data-turn-key="stale"><div data-chatgpt-search-unit-key="stale:user" data-chatgpt-search-message-ids="stale-u"><div class="whitespace-pre-wrap">Stale question</div></div><div data-chatgpt-search-unit-key="stale:assistant" data-chatgpt-search-message-ids="stale-a"><div class="markdown">Stale answer</div></div></div></div></div>';
        document.querySelector("main").prepend(workspace);
    });
    await page.waitForTimeout(400);
    const rows = await page.locator(".bloom-nav-row").allTextContents();
    check("BetterNavigator ignores the chat ChatGPT keeps mounted but hidden", await page.locator(".bloom-nav-tick").count() === 2 && !rows.join(" ").includes("Stale"), rows.join(" | "));
    await context.close();
}

const NAV_TURNS = 10;
const INTERMEDIATE_TURN = 1;

async function navigatorSuite(browser) {
    for (const showAssistant of [true, false]) {
        const { context, page } = await setup(browser, { settings: { plugins: { BetterNavigator: { showAssistant } } } });
        await page.goto("https://chatgpt.com/");
        await page.waitForSelector('[data-bloom="entry"]', { state: "attached", timeout: 10_000 });
        await page.evaluate(({ turns, intermediate }) => {
            document.querySelector("[data-chatgpt-conversation-selection-target]").replaceChildren(...Array.from({ length: turns }, (_, index) => {
                const key = `nav-${index}`;
                const turn = document.createElement("div");
                turn.dataset.turnKey = key;
                const units = [["user", `u${index}`, `Question ${index + 1}`], ...index === intermediate ? [["assistant", `p${index}`, "Progress has advanced to 174"]] : [], ["assistant", `a${index}`, `Answer ${index + 1}`]];
                for (const [role, id, text] of units) {
                    const el = document.createElement("div");
                    el.dataset.chatgptSearchUnitKey = `${key}:${role}`;
                    el.dataset.chatgptSearchMessageIds = id;
                    const body = document.createElement("div");
                    body.className = role === "user" ? "whitespace-pre-wrap" : "markdown";
                    body.textContent = text;
                    el.append(body);
                    turn.append(el);
                }
                return turn;
            }));
        }, { turns: NAV_TURNS, intermediate: INTERMEDIATE_TURN });
        await page.waitForTimeout(300);
        const total = showAssistant ? NAV_TURNS * 2 : NAV_TURNS;
        const mode = showAssistant ? "with replies" : "without replies";
        const head = () => page.locator(".bloom-nav-toc-head").textContent();
        check(`BetterNavigator ${mode}: one tick per visible message, intermediate replies folded`, await page.locator(".bloom-nav-tick").count() === total && !(await page.locator(".bloom-nav-row").allTextContents()).join(" ").includes("Progress"));
        check(`BetterNavigator ${mode}: the count covers only listed messages`, (await head()).endsWith(`/ ${total}`), await head());
        await page.locator("[data-app-action-timeline-scroll]").click({ position: { x: 5, y: 5 } });
        await page.keyboard.press("Home");
        await page.waitForTimeout(600);
        await page.keyboard.press("ArrowDown");
        await page.waitForTimeout(600);
        const stepped = await page.evaluate(() => [...document.querySelectorAll(".bloom-nav-tick")].findIndex(tick => tick.classList.contains("bloom-nav-tick-current")));
        check(`BetterNavigator ${mode}: ArrowDown after Home steps to the second message`, stepped === 1 && (await head()).startsWith("2 /"), `${stepped} ${await head()}`);
        await page.mouse.move(640, 300);
        await page.mouse.wheel(0, 400);
        await page.waitForTimeout(400);
        check(`BetterNavigator ${mode}: scrolling hands the marker back to the reading position`, !(await head()).startsWith("2 /"), await head());
        await context.close();
    }
}

async function oldShellSuite(browser) {
    const { context, page } = await setup(browser, { shell: "old", theme: "dark" });
    await page.goto(`https://chatgpt.com/c/${CHAT_A}`);
    await page.waitForSelector('[data-bloom="entry"]', { state: "attached", timeout: 10_000 });
    check("old shell: entry sits above the profile button", await page.evaluate(() => document.querySelector('[data-testid="accounts-profile-button"]')?.parentElement?.previousElementSibling?.getAttribute("data-bloom") === "entry"));
    await page.waitForSelector("article");
    await page.waitForTimeout(400);
    check("old shell: navigator ticks", await page.locator(".bloom-nav-tick").count() === 2);
    check("old shell: timestamps", await page.locator('time[data-bloom="timestamp"]').count() === 2, await page.evaluate(() => document.querySelector("#thread")?.innerHTML.slice(0, 400)));
    check("old shell: SidebarIdentityOpacity fades the profile text, not the avatar", await page.evaluate(() => [".min-w-0", ".rounded-full"].map(selector => getComputedStyle(document.querySelector(`[data-testid="accounts-profile-button"] ${selector}`)).opacity).join() === "0.5,1"));
    check("old shell: name hidden", await page.evaluate(() => getComputedStyle(document.querySelector('[data-testid="accounts-profile-button"] .truncate')).visibility === "hidden"));
    await page.locator('[data-bloom="entry"] button').click();
    await page.waitForSelector('[data-bloom="settings"]');
    await page.screenshot({ path: resolve(shots, "panel-dark.png") });
    check("old shell: dark panel uses dark surface", await page.evaluate(() => getComputedStyle(document.querySelector(".bloom-settings-modal")).backgroundColor === "rgb(42, 42, 42)"));
    await context.close();
}

const browser = await chromium.launch({ executablePath: CHROMIUM, headless: true });
try {
    await newShellSuite(browser);
    await stopAndSwitchSuite(browser);
    await throttledTimersSuite(browser);
    await slowHydrationSuite(browser);
    await streamedLoadSuite(browser);
    await projectPageSuite(browser);
    await customIdentitySuite(browser);
    await customSoundSuite(browser);
    await queueEditingSuite(browser);
    await composerOpacitySuite(browser);
    await streamerModeSuite(browser);
    await navigatorSuite(browser);
    await navigatorSeekSuite(browser);
    await navigatorHistorySuite(browser);
    await hiddenWorkspaceSuite(browser);
    await defaultEntrySuite(browser);
    await sidebarIdentityOpacitySuite(browser);
    await oldShellSuite(browser);
} finally {
    await browser.close();
}

const failed = results.filter(result => !result.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed. Screenshots: ${shots}`);
process.exit(failed.length ? 1 : 0);
