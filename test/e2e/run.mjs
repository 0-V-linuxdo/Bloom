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
const CHAT_A = "11111111-1111-4111-8111-111111111111";
const CHAT_B = "22222222-2222-4222-8222-222222222222";

const results = [];
const check = (name, ok, detail = "") => {
    results.push({ name, ok, detail });
    console.log(`${ok ? "PASS" : "FAIL"} ${name}${detail ? ` (${detail})` : ""}`);
};

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
    window.__favicons = [];
    new MutationObserver(() => {
        const link = document.getElementById("bloom-chat-state-favicon");
        const href = link?.href ?? "";
        if (href && window.__favicons.at(-1) !== href) window.__favicons.push(href);
    }).observe(document, { subtree: true, childList: true, attributes: true, attributeFilter: ["href"] });
})();`;

function conversationJson(id) {
    const now = Date.now() / 1000;
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

async function setup(browser, { shell = "new", theme = "light", settings = null } = {}) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    page.on("pageerror", error => console.log("pageerror", error.message));
    page.on("console", message => message.type() === "error" && console.log("console", message.text()));
    const generateRequests = [];
    await context.route("https://chatgpt.com/**", async route => {
        const url = new URL(route.request().url());
        if (url.pathname === "/mock/app.js") return route.fulfill({ contentType: "text/javascript", body: appJs });
        if (url.pathname === "/favicon.ico") return route.fulfill({ contentType: "image/x-icon", body: "" });
        if (url.pathname === "/backend-api/f/conversation") {
            generateRequests.push(JSON.parse(route.request().postData() ?? "{}"));
            await new Promise(resolve => setTimeout(resolve, REPLY_DELAY_MS));
            const events = [
                { v: { message: { id: "srv-u", author: { role: "user" }, create_time: Date.now() / 1000, content: { content_type: "text", parts: ["hi"] } }, conversation_id: "x" } },
                { v: { message: { id: "srv-a", author: { role: "assistant" }, create_time: Date.now() / 1000, content: { content_type: "text", parts: ["Here is the answer."] } } } },
            ];
            return route.fulfill({ contentType: "text/event-stream", body: `${events.map(event => `data: ${JSON.stringify(event)}\n\n`).join("")}data: [DONE]\n\n` }).catch(() => {});
        }
        const conversation = url.pathname.match(/^\/backend-api\/conversation\/([\w-]+)$/);
        if (conversation) return route.fulfill({ contentType: "application/json", body: JSON.stringify(conversationJson(conversation[1])) });
        return route.fulfill({ contentType: "text/html", body: shell === "new" ? newShell(theme) : oldShell(theme) });
    });
    await page.addInitScript(gmShim(settings));
    await page.addInitScript(script);
    return { context, page, generateRequests };
}

async function sendPrompt(page, text) {
    await page.locator('textarea[name="prompt"]').fill(text);
    await page.locator('textarea[name="prompt"]').press("Enter");
}

async function newShellSuite(browser) {
    const { context, page, generateRequests } = await setup(browser, {
        settings: { plugins: { PromptQueue: { enabled: true }, ResponseNotification: { onlyWhenHidden: false }, GreetingCustomizer: { enabled: true } } },
    });
    await page.goto("https://chatgpt.com/");
    await page.waitForSelector('[data-bloom="entry"]', { state: "attached", timeout: 10_000 });

    check("new shell: entry in expanded sidebar and rail", await page.locator('[data-bloom="entry"]').count() === 2);
    check("new shell: entry is first in the footer", await page.evaluate(() => document.querySelector(".footer")?.firstElementChild?.getAttribute("data-bloom") === "entry"));
    check("new shell: menu command registered", await page.evaluate(() => window.__menu.some(item => item.name === "Bloom++ settings")));
    check("Cleaner hides the upgrade link", await page.evaluate(() => getComputedStyle(document.querySelector('[data-testid="upgrade-button"]')).display === "none"));
    check("Cleaner hides the disclaimer", await page.evaluate(() => getComputedStyle(document.querySelector('[data-testid="thread-disclaimer"]')).display === "none"));
    check("WiderChat widens the thread", await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width").trim() === "64rem"));
    check("NoSidebarIdentity hides the name", await page.evaluate(() => getComputedStyle(document.querySelector(".chip .truncate")).visibility === "hidden"));
    check("NoSidebarIdentity enlarges the plan", await page.evaluate(() => getComputedStyle(document.querySelector(".chip .text-xs")).fontSize === "14px"));
    check("GreetingCustomizer replaces the home heading", await page.evaluate(() => (document.querySelector("main h1")?.getAttribute("data-bloom-text") ?? "").length > 0));
    check("ChatStateFavicons parks the official icon", await page.evaluate(() => document.querySelector('link[href="/favicon.ico"]')?.media === "not all" && document.head.lastElementChild?.id === "bloom-chat-state-favicon"));

    await page.locator(".footer [data-bloom=entry] button").click();
    await page.waitForSelector('[data-bloom="settings"]');
    check("panel lists 17 plugins", await page.locator(".bloom-settings-card").count() === 17);
    await page.locator('[data-bloom="settings"] input[type=search]').fill("queue");
    check("panel search filters", await page.locator(".bloom-settings-card").count() === 1);
    await page.locator('[data-bloom="settings"] input[type=search]').fill("");
    await page.locator(".bloom-settings-card", { hasText: "WiderChat" }).locator('[aria-label="Settings"]').click();
    check("plugin settings popup opens", await page.locator(".bloom-settings-popup").isVisible());
    await page.locator('.bloom-settings-popup input[type="range"]').fill("80");
    check("slider changes apply live", await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width").trim() === "80rem"));
    await page.screenshot({ path: resolve(shots, "panel-popup-light.png") });
    await page.keyboard.press("Escape");
    await page.screenshot({ path: resolve(shots, "panel-light.png") });
    await page.keyboard.press("Escape");
    check("Escape closes the panel", await page.locator('[data-bloom="settings"]').count() === 0);

    await sendPrompt(page, "First question");
    await page.waitForTimeout(300);
    const rotating = await page.evaluate(() => document.getElementById("bloom-chat-state-favicon")?.href ?? "");
    check("favicon shows generating", rotating.startsWith("data:image/png"));
    await page.waitForFunction(() => location.pathname.startsWith("/c/"));
    await page.waitForTimeout(200);
    check("ChatListStatus spins on the open chat", await page.locator('[data-bloom="cls"][data-status="streaming"]').count() === 1);
    await page.locator('textarea[name="prompt"]').fill("Queued follow-up");
    await page.locator('textarea[name="prompt"]').press("Enter");
    await page.waitForTimeout(150);
    check("PromptQueue queues during a reply", await page.locator(".bloom-queue-count").textContent() === "1 Queued message");
    check("PromptQueue clears the composer", await page.locator('textarea[name="prompt"]').inputValue() === "");
    await page.screenshot({ path: resolve(shots, "queue-light.png") });
    await page.waitForFunction(() => window.__notifications.length > 0, null, { timeout: 5000 }).catch(() => {});
    check("ResponseNotification fires when the reply is done", await page.evaluate(() => window.__notifications[0]?.includes("finished answering")));
    await page.waitForFunction(count => document.querySelectorAll("[data-turn-key]").length >= count, 4, { timeout: 5000 }).catch(() => {});
    check("PromptQueue sends the queued message after the reply", generateRequests.length >= 2 && generateRequests[1].messages?.[0]?.content?.parts?.[0] === "Queued follow-up");
    await page.waitForFunction(() => !document.querySelector('[data-testid="stop-button"]'), null, { timeout: 5000 });
    await page.waitForTimeout(700);
    const favicons = await page.evaluate(() => window.__favicons);
    check("favicon moved through wait, generating and done", favicons.length >= 3 && favicons.at(-1).startsWith("data:image/png") && favicons.at(-1) !== rotating, `${favicons.length} states`);
    check("ChatListStatus clears after the reply", await page.locator('[data-bloom="cls"]').count() === 0);
    check("MessageTimestamps stamps live messages", await page.locator('time[data-bloom="timestamp"]').count() >= 2);
    check("BetterNavigator draws one tick per turn", await page.locator(".bloom-nav-tick").count() === await page.locator("[data-turn-key]").count());

    await page.locator('textarea[name="prompt"]').focus();
    await page.keyboard.press("ArrowUp");
    check("InputHistory recalls the last prompt", await page.locator('textarea[name="prompt"]').inputValue() === "Queued follow-up");
    await page.keyboard.press("Escape");
    check("InputHistory restores the draft on Escape", await page.locator('textarea[name="prompt"]').inputValue() === "");

    await page.locator(`a[href="/c/${CHAT_A}"]`).first().click();
    await page.waitForSelector("[data-turn-key]");
    await page.waitForTimeout(400);
    check("MessageTimestamps uses create_time from the page's own request", (await page.locator('time[data-bloom="timestamp"]').first().textContent())?.length > 5);
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
    await page.locator('[data-testid="stop-button"]').click();
    await page.waitForTimeout(900);
    check("stopping a reply does not notify", await page.evaluate(() => window.__notifications.length === 0));
    check("stopping a reply returns the favicon to idle", await page.evaluate(() => document.getElementById("bloom-chat-state-favicon")?.href.endsWith("/favicon.ico")));
    await sendPrompt(page, "Leave me");
    await page.waitForTimeout(300);
    await page.locator(`a[href="/c/${CHAT_B}"]`).first().click();
    await page.waitForTimeout(REPLY_DELAY_MS + 800);
    check("leaving a chat mid-reply does not notify", await page.evaluate(() => window.__notifications.length === 0));
    await context.close();
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
    await oldShellSuite(browser);
} finally {
    await browser.close();
}

const failed = results.filter(result => !result.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed. Screenshots: ${shots}`);
process.exit(failed.length ? 1 : 0);
