// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.87
// @description  Void++-style plugin host for chatgpt.com. Tab favicon, input history, recent chats, reply notify, next-prompt queue, Recents status, wider thread, thread outline, message times, streamer blur, custom home greeting, custom sidebar identity, hide Share, Dictation, sidebar name, Download apps, upgrade CTAs, and ads.
// @author       0-V-linuxdo & Bloom contributors
// @homepageURL  https://github.com/0-V-linuxdo/Bloom
// @supportURL   https://github.com/0-V-linuxdo/Bloom/issues
// @icon         https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/v2/assets/logos/app-icon/bloom-icon.svg
// @icon64       https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/v2/assets/logos/app-icon/bloom-icon-64.png
// @match        https://chatgpt.com/*
// @match        https://*.chatgpt.com/*
// @match        https://chat.openai.com/*
// @run-at       document-start
// @grant        GM_setClipboard
// @grant        GM_registerMenuCommand
// @grant        GM_notification
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @connect      *
// @compatible   chrome
// @compatible   firefox
// @compatible   edge
// @license      GPL-3.0-or-later
// @downloadURL  https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/v2/userscript/Bloom.update5.user.js
// @updateURL    https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/v2/userscript/Bloom.update5.user.js
// ==/UserScript==

/* Bloom++ v2.0.87. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Ru=Object.defineProperty;var Du=(e,t)=>{for(var o in t)Ru(e,o,{get:t[o],enumerable:!0})};var S=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var se=(e,t,o)=>Math.min(o,Math.max(t,e)),P=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),wa=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,ce=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,h=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function Uo(e,t){return`${e} ${t}${e===1?"":"s"}`}async function xa(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function Me(e){try{return JSON.parse(e)}catch{return}}var ne=typeof unsafeWindow>"u"?window:unsafeWindow;var Hu=new S("Styles"),Le=new Map,zt=new Set,Ke=new Map,yr=!0,Sa=e=>e.replaceAll(/[^A-Za-z0-9_-]/g,"_"),Nu=e=>`:where(:root){--bloom-sheet-${Sa(e)}:1}`,Uu=(e,t)=>`${Nu(e)}${t}`,Ea=e=>`bloom-style-${e}`;function Ta(e){try{return[...e.cssRules].map(t=>t.cssText).join(`
`)}catch{return""}}function Gu(e,t){let o=Ta(e);return o?o.includes(`--bloom-sheet-${Sa(t)}`)?!0:t==="plugin-StreamerMode"?o.includes("blur(6px)")&&(o.includes("data-app-action-sidebar-thread-title")||o.includes("data-bloom-streamer-open")):t==="plugin-WiderChat"?o.includes("--composer-adjacent-max-width")&&o.includes("--thread-content-max-width"):t==="plugin-ComposerOpacity"?o.includes("--composer-layout-surface-backdrop-filter")||o.includes("--composer-layout-surface-background")&&o.includes("color-mix"):!1:!1}function Ca(e){let t=Ta(e);return t?!!(t.includes("--bloom-")||t.includes(".bloom-")||t.includes("[data-bloom")||t.includes("--bloom-sheet-")||t.includes("blur(6px)")&&t.includes("data-app-action-sidebar-thread-title")||t.includes("--composer-adjacent-max-width")&&t.includes("--thread-content-max-width")||t.includes("--composer-layout-surface-backdrop-filter")):!1}function Ma(){let e=document.adoptedStyleSheets.filter(t=>!zt.has(t)&&!Ca(t));document.adoptedStyleSheets=[...e,...Le.values()]}function La(e){document.readyState==="loading"||e.parentNode===document.head||document.head.append(e)}function Fu(e,t){let o=Ke.get(e);o||(o=document.createElement("style"),o.id=Ea(e),Ke.set(e,o)),o.textContent!==t&&(o.textContent=t),La(o)}function Go(e,t){let o=Uu(e,t);if(yr)try{let n=Le.get(e);n||(n=new ne.CSSStyleSheet,Le.set(e,n),zt.add(n)),n.replaceSync(o),Ma();return}catch(n){Hu.warn("Constructed style sheets unavailable, using <style> after parsing",n),yr=!1;let r=Le.get(e);r&&zt.delete(r),Le.delete(e)}Fu(e,o)}function Vt(e){let t=Le.get(e);t&&(zt.delete(t),Le.delete(e)),Ke.get(e)?.remove(),Ke.delete(e);for(let o of document.querySelectorAll(`style[id="${Ea(e)}"]`))o.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(o=>o!==t&&!Gu(o,e)),yr&&Ma()}catch{}}function Jt(){Le.clear(),zt.clear();for(let e of Ke.values())e.remove();Ke.clear();for(let e of document.querySelectorAll("style[id^='bloom-style-']"))e.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(e=>!Ca(e))}catch{}}function ka(){for(let e of Ke.values())La(e)}var M=e=>(...t)=>t.map(o=>e+o).join(" "),Fo=(...e)=>e.filter(Boolean).join(" "),ke=e=>e.length?`${e.map(t=>`${t}:not([data-bloom])`).join(",")}{display:none!important}`:"";var va={};Du(va,{VERSION:()=>Pu,destroy:()=>Zh,init:()=>Aa,plugins:()=>Ae});var Yu=new S("Dom");function s(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var Ia=document.createElement("template");function Ba(e){return Ia.innerHTML=e.trim(),Ia.content.firstElementChild.cloneNode(!0)}var Qe=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),K=(e,t=document)=>[...t.querySelectorAll(e)].find(Qe)??null,Ku=16,Qu="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function Pa(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([Qu],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function Xt(e){document.hidden?setTimeout(e,Ku):requestAnimationFrame(e)}function Ie(e){let t=!1;return()=>{t||(t=!0,Xt(()=>{t=!1;try{e()}catch(o){Yu.error("Scheduled task failed",o)}}))}}var Yo=new Set,Ko=[],Zt,Wu=Ie(()=>{let e=Ko;Ko=[];for(let t of Yo)t(e)});function E(e){return Yo.add(e),Zt||(Zt=new MutationObserver(t=>{Ko.push(...t),Wu()}),Zt.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{Yo.delete(e),!Yo.size&&(Zt?.disconnect(),Zt=void 0,Ko=[])}}var ju=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),H=e=>!e.length||e.some(t=>!ju(t.target)),zu=e=>`"${e.replaceAll("\\","\\\\").replaceAll('"','\\"').replaceAll(`
`,"\\A ")}"`;function We(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size"),e.style.removeProperty("--bloom-text");return}e.style.setProperty("--bloom-text",zu(t)),e.getAttribute("data-bloom-text")!==t&&e.setAttribute("data-bloom-text",t)}function f(e){return e}var Oa=new S("Storage");function Qo(e){try{return localStorage.getItem(e)??void 0}catch{return}}function Wo(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(o){Oa.warn("localStorage write failed",o)}}function Ar(e){try{localStorage.removeItem(e)}catch(t){Oa.warn("localStorage delete failed",t)}}function Ra(e,t){addEventListener("storage",o=>{o.key===e&&t(o.newValue)})}var vr="BloomSettings",Vu=100,gt={plugins:{}},jo=new Set,qr=new Set,$t;function Da(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=Me(t);return!P(t)||!P(t.plugins)||!Object.keys(t.plugins).length?null:t}function Ha(){let e=Da(Qo(vr));e&&(gt.plugins=e.plugins)}var Na=(e,t)=>`${e}
${t}`;function Ua(){$t=void 0,qr.clear(),Wo(vr,gt)}function Ju(e){let t=Da(e);if(!t)return;let o=[];for(let n of new Set([...Object.keys(gt.plugins),...Object.keys(t.plugins)])){let r=gt.plugins[n]??={},i=P(t.plugins[n])?t.plugins[n]:{};for(let a of new Set([...Object.keys(r),...Object.keys(i)]))qr.has(Na(n,a))||JSON.stringify(r[a])===JSON.stringify(i[a])||(i[a]===void 0?delete r[a]:r[a]=i[a],o.push([n,a]))}for(let[n,r]of o)for(let i of jo)i(n,r)}function wr(){$t&&(clearTimeout($t),Ua())}var Be=(e,t)=>gt.plugins[e]?.[t];function je(e,t,o){let n=gt.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,qr.add(Na(e,t)),clearTimeout($t),$t=setTimeout(Ua,Vu);for(let r of jo)r(e,t)}function ht(e){return jo.add(e),()=>void jo.delete(e)}function xr(e){return e.type==="component"?void 0:e.default}function p(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>Be(t.pluginName,n)??(e[n]&&xr(e[n])),set:(o,n,r)=>(je(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&Be(t.pluginName,o)!==void 0&&je(t.pluginName,o)}};return t}var Ga=e=>{let t=()=>{let o=Be("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();je("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},zo=Ga("pinnedPlugins"),Vo=Ga("starredPlugins");addEventListener("pagehide",wr);Ra(vr,Ju);var Zo=new S("PluginManager"),Ae=new Map,ze=new Set,Er=new Set,Sr=new Set;function Fa(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),Ae.set(t.name,t)}var bt=e=>!!e.required||(Be(e.name,"enabled")??!!e.enabledByDefault);var _t=e=>`plugin-${e.name}`;function Ya(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?Go(_t(e),t):Vt(_t(e))}function Zu(e){if(!ze.has(e.name))try{Ya(e),e.start?.(),ze.add(e.name)}catch(t){Vt(_t(e)),Zo.error(`Failed to start ${e.name}`,t)}}function Tr(e){ze.delete(e.name),Vt(_t(e));try{e.stop?.()}catch(t){Zo.error(`Failed to stop ${e.name}`,t)}}var Ka=e=>e.startAt??"HostReady";function Qa(e){if(bt(e)){Er.has(Ka(e))&&Zu(e);return}Tr(e)}function Xo(e){Er.add(e);for(let t of Ae.values())Ka(t)===e&&Qa(t);Zo.info(`${e}: ${[...ze].join(", ")}`)}function Wa(e,t){je(e.name,"enabled",t),wr()}function Xu(){for(let e of Ae.values())e.required||bt(e)||(ze.has(e.name)?Tr(e):Vt(_t(e)))}var Jo;function ja(){Jo?.(),Jo=E(()=>Xu())}function za(){Jo?.(),Jo=void 0;for(let e of Ae.values())Tr(e);ze.clear(),Er.clear()}function Va(e){return Sr.add(e),()=>void Sr.delete(e)}ht((e,t)=>{let o=Ae.get(e);if(o){if(t==="enabled"){typeof Be(e,"enabled")=="boolean"&&Qa(o);for(let n of Sr)n();return}if(ze.has(e))try{Ya(o),o.onSettingsChange?.(t)}catch(n){Zo.error(`Settings change failed for ${e}`,n)}}});var Ja=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

html {
    --bloom-fg: var(--color-text-primary, var(--text-primary, var(--app-color-text-foreground, #0d0d0d)));
    --bloom-fg-2: var(--color-text-secondary, var(--text-secondary, var(--app-color-text-foreground-secondary, #5d5d5d)));
    --bloom-fg-3: var(--color-text-tertiary, var(--text-tertiary, var(--app-color-text-foreground-tertiary, #8f8f8f)));
    --bloom-border: var(--color-token-border-default, var(--border-medium, #0000001a));
    --bloom-border-light: var(--color-token-border-light, var(--border-light, #0000000d));
    --bloom-hover: var(--color-token-list-hover-background, var(--color-background-primary-soft-hover, var(--app-color-background-button-secondary-hover, #0000000d)));
    --bloom-accent: var(--color-chart-blue, #3a83f7);
    --bloom-surface: #fff;
    --bloom-surface-2: #f3f3f3;
    --bloom-input: #fafafa;
    --bloom-card: #fff;
    --bloom-shadow: 0 1rem 3rem #00000026, 0 0 0 1px #0000000d;
    --bloom-danger: #ef4444;
}

:is(.dark, [data-theme="dark"]) {
    --bloom-fg: var(--color-text-primary, var(--text-primary, var(--app-color-text-foreground, #ededed)));
    --bloom-fg-2: var(--color-text-secondary, var(--text-secondary, var(--app-color-text-foreground-secondary, #cdcdcd)));
    --bloom-fg-3: var(--color-text-tertiary, var(--text-tertiary, var(--app-color-text-foreground-tertiary, #afafaf)));
    --bloom-border: var(--color-token-border-default, var(--border-medium, #ffffff26));
    --bloom-border-light: var(--color-token-border-light, var(--border-light, #ffffff0d));
    --bloom-hover: var(--color-token-list-hover-background, var(--color-background-primary-soft-hover, var(--app-color-background-button-secondary-hover, #ffffff1a)));
    --bloom-surface: #2a2a2a;
    --bloom-surface-2: #212121;
    --bloom-input: #2f2f2f;
    --bloom-card: #ffffff0d;
    --bloom-shadow: 0 1rem 3rem #00000080, 0 0 0 1px #ffffff1a;
}

:where(.bloom-root, .bloom-root *, .bloom-root ::before, .bloom-root ::after) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0 solid;
}

:where(.bloom-root) {
    color: var(--bloom-fg);
    font-family: inherit;
    font-size: 0.875rem;
    line-height: 1.4;
}

:where(.bloom-root :is(button, input, select, textarea)) {
    font: inherit;
    color: inherit;
}

:where(.bloom-root :is(button, input:not([type="range"]), select, textarea)) {
    background-color: transparent;
}

:where(.bloom-root :is(button, select, [role="button"])) {
    cursor: pointer;
}

:where(.bloom-root svg) {
    display: block;
    flex-shrink: 0;
}

:where(.bloom-root [hidden]) {
    display: none;
}

.bloom-icon {
    width: 1rem;
    height: 1rem;
}

button.bloom-switch {
    position: relative;
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    width: 2rem;
    height: 1.25rem;
    border-radius: 9999px;
    background-color: color-mix(in srgb, var(--bloom-fg) 22%, var(--bloom-card));
    transition: background-color 0.15s ease-out;
}

button.bloom-switch[aria-checked="true"] {
    background-color: var(--bloom-accent);
}

button.bloom-switch[aria-disabled="true"] {
    cursor: default;
}

.bloom-switch:focus-visible,
.bloom-button:focus-visible,
.bloom-icon-button:focus-visible {
    outline: 2px solid var(--bloom-accent);
    outline-offset: 1px;
}

button.bloom-switch::after {
    content: "";
    width: 1rem;
    height: 1rem;
    border-radius: 9999px;
    background: #fff;
    box-shadow: 0 1px 2px #00000029;
    transform: translateX(0.125rem);
    transition: transform 0.15s ease-out;
}

button.bloom-switch[aria-checked="true"]::after {
    transform: translateX(0.875rem);
}

.bloom-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    min-height: 2rem;
    padding: 0 0.75rem;
    border: 1px solid var(--bloom-border);
    border-radius: 9999px;
    font-weight: 500;
    white-space: nowrap;
}

.bloom-button:hover {
    background-color: var(--bloom-hover);
}

.bloom-button:disabled {
    opacity: 0.5;
    cursor: default;
}

.bloom-button-danger {
    border-color: color-mix(in srgb, var(--bloom-danger) 50%, transparent);
    color: var(--bloom-danger);
}

.bloom-icon-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 0.5rem;
    color: var(--bloom-fg-2);
}

.bloom-icon-button:hover {
    background-color: var(--bloom-hover);
    color: var(--bloom-fg);
}

.bloom-icon-button[aria-pressed="true"] {
    color: var(--bloom-accent);
}

.bloom-input,
.bloom-select {
    width: 100%;
    min-height: 2.25rem;
    padding: 0.375rem 0.75rem;
    border: 1px solid var(--bloom-border);
    border-radius: 0.625rem;
    background-color: var(--bloom-input);
}

.bloom-input:focus,
.bloom-select:focus {
    outline: none;
    border-color: var(--bloom-accent);
}

.bloom-select {
    appearance: auto;
}

.bloom-select option {
    background-color: var(--bloom-surface);
    color: var(--bloom-fg);
}

.bloom-slider {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.bloom-slider input[type="range"] {
    flex: 1;
    appearance: auto;
    accent-color: var(--bloom-accent);
}

.bloom-slider output {
    min-width: 3rem;
    color: var(--bloom-fg-2);
    font-variant-numeric: tabular-nums;
    text-align: right;
}

.bloom-tooltip {
    position: fixed;
    z-index: 2147483647;
    max-width: 18rem;
    padding: 0.375rem 0.625rem;
    border-radius: 0.5rem;
    background: var(--bloom-fg);
    color: var(--bloom-surface);
    font-size: 0.75rem;
    pointer-events: none;
    animation: bloom-fade-in 0.1s ease-out;
}

.bloom-muted {
    color: var(--bloom-fg-2);
}

.bloom-truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

@keyframes bloom-spin {
    to {
        transform: rotate(360deg);
    }
}

@keyframes bloom-fade-in {
    from {
        opacity: 0;
        transform: translateY(0.25rem);
    }
}

[data-bloom-greeting][data-bloom-text] {
    display: block !important;
    text-align: center;
}

[data-bloom-text] > * {
    display: none !important;
}

[data-bloom-text]::before {
    content: var(--bloom-text);
    font: inherit;
    letter-spacing: inherit;
    white-space: pre-wrap;
    word-spacing: normal;
}
`;var _u=new S("Events");function $o(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){_u.error(`Listener for ${String(t)} failed`,r)}}}}var u={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',readAloud:'button:is([aria-label="Read aloud" i], [aria-label^="Read aloud" i], [aria-label="Stop reading" i], [aria-label^="Stop reading" i], [aria-label="\u6717\u8BFB"], [aria-label^="\u6717\u8BFB"], [aria-label="\u505C\u6B62\u6717\u8BFB"], [data-testid*="read-aloud" i])',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',composerConversation:"[data-above-composer-conversation-id]",oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",modelTrigger:'[data-testid="model-switcher-dropdown-button"], button[aria-label="Model selector" i], button[aria-label="Select ChatGPT model" i]',modelItem:'[role="menu"] [data-testid^="model-switcher-"], [role="menuitem"][data-testid^="model-switcher-"], [role="menu"] [role="menuitemradio"], [role="menu"] [data-reasoning-slider]',effortSlider:'[role="menu"] [data-reasoning-slider]',homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]',headerMore:'button[aria-label="More" i], button[aria-label="\u66F4\u591A"]',rightPanel:"aside[data-app-shell-focus-area='right-panel']",summaryPanel:"[data-summary-panel-variant]"};var Za=/[​-‍﻿]/g,ve=()=>K(u.composerInput),Ve=e=>e instanceof HTMLElement&&e.matches(u.composerInput),Q=(e=ve())=>e?.closest("form")??document.querySelector(u.oldComposerForm);function k(e=ve()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(Za,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(Za,"").trim()}var ed=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function ie(e,t=ve()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return ed?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function Xa(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:a,value:c}=e;return{first:!c.slice(0,i).includes(`
`),last:!c.slice(a).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var $a=e=>{let t=Q();return(t&&K(e,t))??K(e)},yt=()=>$a(u.stopButton),td=()=>{let e=$a(u.sendButton);return e&&!e.matches(u.stopButton)?e:null};function _o(){let e=td();if(e){e.disabled||e.click();return}ve()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var _a=()=>Qe(yt());var os=new S("Network"),od=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,nd=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,tn=1e3,rd=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),W=$o(),Mr=new Map,es=new Map,id=1,le=e=>e?Mr.get(e)??null:null;function en(e){let t=Mr.get(e);return t||Mr.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var ns=e=>e==="user"||e==="assistant";function rs(e){let t=e.author?.role;if(!e.id||!ns(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(l=>typeof l=="string").join(`
`).trim(),i=n.filter(l=>P(l)&&l.content_type==="image_asset_pointer").length,a=e.metadata?.attachments,c=Array.isArray(a)&&a.length>0;return!r&&!i&&!c?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*tn:null,text:r,hasFiles:c,imageCount:i}}var is=e=>e.filter((t,o)=>t.role==="user"||e[o+1]?.role!=="assistant"),Lr=e=>e.map(t=>t.createTime).filter(t=>t!=null);function ad(e,t){let o=Lr(e),n=Lr(t);return!o.length||!n.length?!1:Math.max(...o)<Math.min(...n)}function sd(e){let t=Lr(e);if(t.length<2)return e;let[o]=t,n=o-e.length;return e.map((i,a)=>(i.createTime!=null&&(n=i.createTime),{message:i,index:a,time:i.createTime??n})).toSorted((i,a)=>i.time-a.time||i.index-a.index).map(i=>i.message)}function ld(e,t){let o=t.filter(P).map(c=>P(c.message)?c.message:c);for(let c of o)c.id&&c.create_time&&e.times.set(c.id,c.create_time*tn);let n=o.map(rs).filter(c=>c!=null),r=new Set(n.map(c=>c.id)),i=e.chain.filter(c=>!r.has(c.id)),a=ad(n,i)?[...n,...i]:[...i,...n];return e.chain=is(sd(a)),e}function cd(e,t){if(!P(t)||!(P(t.mapping)||Array.isArray(t.messages)))return null;let o=en(e);if(typeof t.title=="string"&&t.title&&(o.title=t.title),Array.isArray(t.messages))return ld(o,t.messages);let n=t.mapping;for(let c of Object.values(n)){let l=c.message?.create_time;c.message?.id&&l&&o.times.set(c.message.id,l*tn)}let r=[],i=new Set,a=typeof t.current_node=="string"?t.current_node:null;for(;a&&!i.has(a)&&n[a];){i.add(a);let c=n[a].message,l=c?rs(c):null;l&&r.push(l),a=n[a].parent??null}return r.length&&(o.chain=is(r.toReversed())),o}function ud(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}var Cr=e=>typeof e=="string"?e:null;function dd(e){let t=typeof e?.body=="string"?Me(e.body):null;if(!P(t))return{conversationId:null,parentId:null,userId:null};let[o]=Array.isArray(t.messages)?t.messages:[];return{conversationId:Cr(t.conversation_id),parentId:Cr(t.parent_message_id),userId:P(o)?Cr(o.id):null}}function md(e,t){if(!P(e))return;typeof e.type=="string"&&rd.has(e.type)&&(t.handoff=!0);let o=P(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(en(e.conversation_id).title=e.title,W.emit("conversation",en(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&ns(n.author?.role)){let r=n.create_time*tn;t.conversationId&&en(t.conversationId).times.set(n.id,r),W.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function fd(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:a}=await o.read();if(i)break;r+=n.decode(a,{stream:!0});let c=r.split(`
`);r=c.pop()??"";for(let l of c){if(!l.startsWith("data:"))continue;let d=l.slice(5).trim();d&&d!=="[DONE]"&&md(Me(d),t)}}}async function pd(e,t,o){let{conversationId:n}=t,r={conversationId:n,error:!1,handoff:!1};es.set(e,n),W.emit("generate-start",{requestId:e,...t});try{let i=await o;i.ok?i.headers.get("content-type")?.includes("event-stream")&&await fd(i.clone(),r):r.error=!0}catch(i){let a=i instanceof DOMException&&i.name==="AbortError";r.handoff||=a,r.error||=!a}finally{es.delete(e),W.emit("generate-end",{requestId:e,...r})}}async function gd(e,t){try{let o=await t;if(!o.ok)return;let n=cd(e,await o.clone().json());n&&W.emit("conversation",n)}catch(o){os.debug("Conversation read skipped",o)}}function hd(e,t,o){let n=ud(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&od.test(n.pathname)){pd(id++,dd(t),o);return}let i=r==="GET"&&n.pathname.match(nd)?.[1];i&&gd(i,o)}var ts=!1;function as(){if(ts)return;ts=!0;let e=ne.fetch,t=function(o,n){let r=e.call(this??ne,o,n);try{hd(o,n,r)}catch(i){os.error("Fetch tap failed",i)}return r};ne.fetch=typeof exportFunction=="function"?exportFunction(t,ne):t}var bd="__reactContainer$",ss="__reactFiber$";function on(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var kr=(e,t)=>Object.keys(e.wrappedJSObject??e).some(o=>o.startsWith(t)),qe=e=>!kr(document,bd)||kr(e,ss);function Je(){return document.body?Promise.resolve():new Promise(e=>{let t=new MutationObserver(()=>{document.body&&(t.disconnect(),e())});t.observe(document,{childList:!0,subtree:!0})})}async function ls(){await Je();let e=Date.now()+8e3;for(;!kr(document.body,ss)&&Date.now()<e;)await new Promise(t=>setTimeout(t,100))}var yd=new S("Route"),cs=/\/c\/(?!local-)([\w-]+)/,Ad=500,Pr=e=>{try{return new URL(e,location.origin).pathname.match(cs)?.[1]??null}catch{return null}},b=()=>location.pathname.match(cs)?.[1]??null,sn=()=>location.pathname==="/",vd=/^\/g\/g-p-[^/]+(?:\/project)?\/?$/,us=()=>vd.test(location.pathname),ue=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",rn=new Set,an=location.href,Br=b(),nn;function Ir(){if(location.href===an)return;let e={prevHref:an,href:location.href,prevId:Br,id:b()};an=e.href,Br=e.id;for(let t of rn)try{t(e)}catch(o){yd.error("Route listener failed",o)}}function qd(){let e=new AbortController,{navigation:t}=ne;t?.addEventListener("currententrychange",()=>queueMicrotask(Ir),{signal:e.signal}),addEventListener("popstate",Ir,{signal:e.signal});let o=setInterval(Ir,Ad);return()=>{e.abort(),clearInterval(o)}}function de(e){return rn.add(e),nn||(an=location.href,Br=b(),nn=qd()),()=>{rn.delete(e),!rn.size&&(nn?.(),nn=void 0)}}var wd=["data-turn","data-message-author-role"],xd=/:(user|assistant)$/,Or=`${u.messageUnit}, ${u.oldMessage}`,Rr=e=>e==="user"||e==="assistant",ps=()=>!!document.querySelector(u.timelineScroll),gs=()=>!!K(u.timelineScroll),hs=()=>b()??document.querySelector(u.composerConversation)?.getAttribute("data-above-composer-conversation-id")??"",At=()=>ps()?K(u.timelineScroll):document;function to(){if(ps())return K(u.timelineScroll);let e=document.querySelector(u.turn);for(let t=e?.parentElement;t;t=t.parentElement){let{overflowY:o}=getComputedStyle(t);if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight)return t}return document.scrollingElement}var vt=e=>e.getAttribute("data-chatgpt-search-unit-key")?.match(xd)?.[1]??null,bs=e=>[...e.querySelectorAll(u.searchUnit)].filter(t=>vt(t)&&!t.parentElement?.closest(u.searchUnit)),ds=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function eo(e){let t=ds(e);return t.length?t:[...new Set([...e.querySelectorAll(Or)].flatMap(ds))]}function qt(e=At()){if(!e)return[];let t=bs(e);return t.length?t:[...e.querySelectorAll(Or)].filter(o=>!o.parentElement?.closest(Or))}function Sd(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function Ed(e){for(let t of wd){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(Rr(o))return o}return e.querySelector(u.markdown)||e.querySelector(u.generatedImage)?"assistant":null}var Td=e=>!e.parentElement?.closest(u.turn);function Pe(){let e=le(b())?.chain??[];return[...At()?.querySelectorAll(u.turn)??[]].filter(Td).flatMap(o=>{let n=bs(o),r=n.length?n.map(i=>({el:i,known:vt(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=d=>!n.some(m=>m.contains(d))&&h(d.textContent??""),a=[...o.querySelectorAll(u.assistantMarkdown)].find(d=>i(d)&&!ln.test(h(d.textContent??""))),c=[...o.querySelectorAll(u.activityHeader)].findLast(i),l=a??c;l&&r.push({el:l,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?eo(o):qt(o).flatMap(eo),a=n??Ed(o)??Sd(i,e)??(r%2?"assistant":"user"),c=o.closest(u.turn)??o,l=!o.closest(u.searchUnit)&&!!c.querySelector(u.turnBusy),d=a==="assistant"&&(o.matches(u.turnBusy)||!!o.querySelector(u.turnBusy)||l);return{el:o,role:a,messageIds:i,streaming:d}})}var Cd="[data-bloom], .sr-only",ys=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,ln=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,ms=new WeakMap;function wt(e){let o=(e.el.closest(u.turn)??e.el).textContent?.length??0,n=ms.get(e.el);if(n?.length===o)return n.summary;let r=Md(e);return ms.set(e.el,{length:o,summary:r}),r}function fs(e){let t=new Set,o=[];for(let n of e.querySelectorAll(u.assistantMarkdown)){if(n.closest(u.searchUnit))continue;let r=h(n.textContent??"");!r||ln.test(r)||ys.test(r)||t.has(r)||(t.add(r),o.push(r))}return o}function Md(e){let t=e.el.querySelectorAll(u.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.closest(u.turn);if(e.role==="assistant"&&o&&e.el.matches(u.assistantMarkdown)&&!e.el.closest(u.searchUnit)){let l=fs(o);if(l.length)return l.join(" \xB7 ")}let n=e.el.querySelector(e.role==="assistant"?u.markdown:".whitespace-pre-wrap")??e.el,i=[...n.querySelectorAll(Cd)].map(l=>h(l.textContent??"")).filter(Boolean).reduce((l,d)=>l.replace(d,`
`),n.innerText||n.textContent||""),a=i.split(`
`).map(h).filter(l=>l&&!ys.test(l)&&!ln.test(l));if(a.length)return a.join(" ");if(e.role==="assistant"&&o){let l=fs(o);if(l.length)return l.join(" \xB7 ")}let c=i.split(`
`).map(h).filter(l=>ln.test(l));return c.length?c.at(-1)??"":e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function cn(e){return e.text?h(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var Dr=e=>e.matches(u.timelineScroll)&&getComputedStyle(e).flexDirection==="column-reverse";var Ld=250,kd=400,Id=6e4,Bd=5e3,Pd=`:is(${u.turn}) :is(${u.turnBusy})`,w=$o(),mn=new Set,Hr=new Set,Oe=!1,vs=0,xt=null,St=!1,un=!1,oo=0,fn=!1,no=null,As=!1,R=()=>({generating:Oe,conversationId:b()}),qs=()=>_a()||!!At()?.querySelector(Pd);function Od(){let e=qs();return e?un||(oo=0,fn=!0):un=!1,[...mn].some(t=>!Hr.has(t))||e&&!un||Date.now()<oo}function Rd(){return no?.error?"error":St?"stopped":"done"}function Dd(){xt=null,Oe=!1,fn=!1,w.emit("fall",{conversationId:b(),outcome:Rd()}),St=!1,no=null}function ws(){let e=Od();e&&!Oe&&(Oe=!0,vs=Date.now(),St=!1,no=null,w.emit("rise",{conversationId:b()})),e||!Oe?xt=null:xt==null?xt=Date.now():Date.now()-xt>=kd&&Dd()}function dn(){ws(),w.emit("tick",R())}function Hd({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(Oe||Date.now()-vs<Id);if(!o&&Oe){for(let n of mn)Hr.add(n);un=qs(),oo=0,fn=!1,xt=null,Oe=!1,St=!1,no=null,w.emit("fall",{conversationId:e,outcome:"left"})}w.emit("context",{prevId:e,id:t,migrated:o}),dn()}function Nd(e){e.target instanceof Element&&e.target.closest(u.stopButton)&&(St=!0,oo=0)}function xs(){As||(As=!0,W.on("generate-start",({requestId:e})=>{mn.add(e),dn()}),W.on("generate-end",e=>{mn.delete(e.requestId),!Hr.delete(e.requestId)&&(no=e,oo=e.handoff&&!e.error&&!St&&!fn?Date.now()+Bd:0,dn())}),de(Hd),document.addEventListener("click",Nd,!0),Pa(dn,Ld),on().then(()=>E(ws)))}var Ss={BetterNavigator:1793347117e3,BetterQuotes:179333264e4,ChatListStatus:179333264e4,ChatStateFavicons:1790623094e3,Cleaner:1793267811e3,ComposerOpacity:1793344667e3,Continue:1790939902e3,CustomSidebarIdentity:1790658669e3,GreetingCustomizer:1792014624e3,InputHistory:179333264e4,MessageTimestamps:1791080494e3,NoDictation:1793335268e3,NoShareLink:1790658669e3,NoSidebarIdentity:1790616549e3,PromptQueue:1793267321e3,RecentTopics:179333264e4,ResponseNotification:1790661368e3,Settings:1793347117e3,SidebarIdentityOpacity:1790682605e3,StarChats:1793347117e3,StreamerMode:1793344667e3,TemporaryChat:1792014624e3,UserQuotes:1793345744e3,WiderChat:179333264e4};var v=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,Ud="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",Gd={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${Ud}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:v('<path d="M18 6 6 18M6 6l12 12"/>'),gear:v('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:v('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:v('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:v('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:v('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:v('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:v('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:v('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:v('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:v('<path d="m6 9 6 6 6-6"/>'),play:v('<path d="M7 4v16l13-8z"/>'),plus:v('<path d="M12 5v14M5 12h14"/>'),check:v('<path d="m5 12 5 5 9-10"/>'),alert:v('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:v('<path d="M4 5h16v11H9l-5 4z"/>'),layout:v('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:v('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:v('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:v('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:v('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:v('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:v('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:v('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:v('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:v('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:v('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:v('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:v('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:v('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:v('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:v('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),ghost:v('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},N=e=>Ba(Gd[e]);var we="data-bloom-tip",Nr=6,Ur=8,Ze,Es=null;function Et(e){if(e===Es)return;if(Es=e,!e){Ze?.remove();return}Ze??=s("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),Ze.textContent=e.getAttribute(we),document.body.append(Ze);let t=e.getBoundingClientRect(),{width:o,height:n}=Ze.getBoundingClientRect(),r=t.bottom+Nr+n<=innerHeight-Ur;Ze.style.left=`${se(t.left+t.width/2-o/2,Ur,innerWidth-o-Ur)}px`,Ze.style.top=`${r?t.bottom+Nr:t.top-Nr-n}px`}var Ts=e=>e instanceof Element?e.closest(`[${we}]`):null;function Cs(){let e=new AbortController,t={passive:!0,signal:e.signal};return document.addEventListener("pointerover",o=>Et(Ts(o.target)),t),document.addEventListener("pointerout",o=>o.relatedTarget||Et(null),t),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&Et(Ts(o.target)),t),document.addEventListener("focusout",()=>Et(null),t),document.addEventListener("pointerdown",()=>Et(null),t),()=>{e.abort(),Et(null)}}function Gr(e,t,o,n=!1){let r=s("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let a=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(a)),t(a)}),r}function j(e,t,o){return s("button",{class:Fo("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button","data-bloom":"control"},on:{click:t}})}function X(e,t,o,n){let r=s("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":t,"data-bloom":"control",[we]:t},on:{click:o}},N(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function pn(e,t,o,n,r,i){let a=s("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});a.value=String(e);let c=s("output",{text:`${a.value}${r}`});return a.addEventListener("input",()=>{c.textContent=`${a.value}${r}`,i(Number(a.value))}),s("div",{class:"bloom-slider"},a,c)}function Fr(e,t,o){let n=s("select",{class:"bloom-select"},...t.map(r=>s("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function ro(e,t,o="",n="text"){let r=s("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var Fd=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,Ms=/\S+@\S+\.\S+/,Yd=3,Kd=/^\/g\/(g-p-[^/]+)\//,Qd=/^g-p-[0-9a-f]+-?/i,Ls=e=>!!e.closest(".sr-only"),Yr=e=>!!e?.querySelector(u.menuButton);function ks(){return[...document.querySelectorAll(u.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(Yr)).filter(e=>e!=null)}function Is(){let e=[...document.querySelectorAll(u.oldProfile)];if(e.length)return e.map(o=>{let n=o.parentElement?.children.length===1?o.parentElement:o;return{kind:"profile",anchor:n,insert:r=>n.before(r)}});let t=ks().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(u.rail)){let n=[...o.children].find(Yr);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}var Kr=e=>!e.closest("[data-bloom]")&&(!!e.querySelector("img, [class*=rounded-full]")||Rs(e).some(t=>!Ls(t))),Bs=e=>[...e.parentElement?.children??[]].find(t=>t!==e&&t instanceof HTMLElement&&Kr(t))??null;function Ps(){let e=[...document.querySelectorAll(u.oldProfile)];return e.length?e:[...ks(),...[...document.querySelectorAll(u.rail)].map(o=>[...o.children].findLast(Yr))].map(o=>[...o?.querySelectorAll(u.menuButton)??[]].findLast(n=>Kr(n)||Bs(n))).filter(o=>o!=null)}var Os=()=>Ps().map(e=>Kr(e)?e:Bs(e)).filter(e=>e!=null);function Rs(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!h(t.textContent??"")&&!(t instanceof SVGElement))}var Wd=e=>{if(/rounded-full/.test(e.getAttribute("class")??""))return!0;if(!e.clientWidth)return!1;let{borderRadius:t}=getComputedStyle(e);return t.includes("%")||Number.parseFloat(t)>=e.clientWidth/2};function gn(e,t,o){for(let n of e.querySelectorAll(`[${t}]`))n!==o&&n.removeAttribute(t);o&&!o.hasAttribute(t)&&o.setAttribute(t,"")}function jd(e,t){if(h(e.textContent??"").length>Yd)return null;let o=e.closest("button");for(let n=e;n&&n!==t&&n!==o;n=n.parentElement)if(Wd(n))return n;return null}function Qr(e,t){e.hasAttribute(`data-bloom-${t}`)||e.setAttribute(`data-bloom-${t}`,"");let o=e.querySelector("img:not([data-bloom] img)"),n=Rs(e),r=o?null:n.map(m=>jd(m,e)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),a=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");gn(e,`data-bloom-${t}-avatar`,a);let c=n.filter(m=>!a?.contains(m)&&!Ls(m)),l=c.find(m=>Fd.test(h(m.textContent??""))),d=c.find(m=>Ms.test(m.textContent??""));gn(e,`data-bloom-${t}-plan`,l),gn(e,`data-bloom-${t}-email`,d),gn(e,`data-bloom-${t}-name`,c.find(m=>m!==l&&m!==d))}function zd(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function hn(){return Ps().map(zd).find(e=>e!=null)??[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&(Ms.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var io=e=>[...document.querySelectorAll(u.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&Pr(t.href)===e);function Ds(e){let t=io(e).find(o=>h(o.textContent??""));return t?h(t.textContent??""):null}function Hs(e){let t=new URL(e,location.origin).pathname.match(Kd)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!Pr(n.href)&&h(n.textContent??""));return o?h(o.textContent??""):t.replace(Qd,"").replaceAll("-"," ")||null}var Wr=0,bn;function Vd(e){if(!H(e))return;for(let o of Os())Qr(o,"profile");let t=hn();t&&Qr(t,"menu")}function me(){Wr++;let e=!0;return Je().then(()=>{e&&Wr&&!bn&&(bn=E(Vd))}),()=>{e&&(e=!1,!--Wr&&(bn?.(),bn=void 0))}}var Jd=new S("SettingsPanel"),g=M("bloom-settings-"),Zd=10080*60*1e3,Xd=3e3,Ns="Toggle features. Some need a reload. Click the sliders icon to configure.",$d=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],_d=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],em={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},Gs=new Set(["chat","ui","privacy"]),V=null,$e="all",jr="all",yn="",zr=[],Fs=()=>[...Ae.values()].filter(e=>!e.hidden),tm=e=>!!e.updatedAt&&Date.now()-e.updatedAt<Zd;function om(e){switch($e){case"favorites":return Vo.has(e.name);case"recent":return tm(e);case"all":return!0;case"other":return!e.tags.some(t=>Gs.has(t));case"chat":case"ui":case"privacy":return e.tags.includes($e)}}function nm(e){switch(jr){case"all":return!0;case"enabled":return bt(e);case"disabled":return!bt(e)}}function rm(e){let t=yn.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function im(e){let t=zo.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return $e==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var Ys=e=>e.settings?.def??{},am=e=>Object.values(Ys(e)).some(t=>t.type!=="custom");function sm(e,t,o){let n=Be(e.name,t)??xr(o),r=i=>je(e.name,t,i);switch(o.type){case"boolean":return Gr(n,r,o.description??t);case"slider":return pn(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return Fr(n,o.options,r);case"string":return ro(n,r,o.placeholder);case"number":return ro(String(n),i=>r(Number(i)),"","number");case"component":{let i=s("div",{class:g("component")});return zr.push(o.render(i)),i}case"custom":return null}}var lm=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function Ks(e){if(!V)return;let t=Object.entries(Ys(e)).filter(([,i])=>i.type!=="custom").map(([i,a])=>{let c=sm(e,i,a),l=a.type==="boolean",d=a.type!=="component"&&s("div",{class:g("field-label"),text:lm(i)}),m=a.description&&s("div",{class:g("field-desc"),text:a.description});return s("div",{class:g("field",l?"field-inline":"field-stacked")},(d||m)&&s("div",{class:g("field-text")},d,m),c)}),o,n=j("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},Xd);return}clearTimeout(o),e.settings?.reset(),ao(),Ks(e)},"danger"),r=s("div",{class:g("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&ao()}},s("div",{class:g("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},s("div",{class:g("popup-header")},s("div",{class:g("card-icon")},N(e.icon)),s("div",{class:g("popup-title")},s("div",{class:g("card-name"),text:e.name}),s("div",{class:g("popup-authors"),text:e.authors.join(", ")})),X("close","Close",ao)),s("p",{class:g("popup-desc"),text:e.description}),s("div",{class:g("fields")},...t),s("div",{class:g("popup-footer")},n)));V.querySelector(`.${g("modal")}`)?.append(r)}function ao(){for(let e of zr)e();zr=[],V?.querySelector(`.${g("popup-backdrop")}`)?.remove()}function Us(e){let t=bt(e),o=Vo.has(e.name),n=zo.has(e.name),r=!!e.required;return s("div",{class:[g("card",t?"card-on":"card-off"),r?g("card-required"):""].filter(Boolean).join(" ")},s("div",{class:g("card-top")},s("div",{class:g("card-icon")},N(e.icon)),s("div",{class:g("card-actions")},X("star",o?"Unstar":"Star",()=>{Vo.toggle(e.name),Xe()},o),r?null:X("pin",n?"Unpin":"Pin to top",()=>{zo.toggle(e.name),Xe()},n),r?s("span",{class:g("required-mark"),attrs:{"aria-label":"Required",[we]:"This plugin is required for Bloom++ to work"}},N("alert")):null,am(e)&&X("gear","Settings",()=>Ks(e)),Gr(t,i=>Wa(e,i),r?`${e.name} is required`:`Enable ${e.name}`,r))),s("div",{class:g("card-name"),text:e.name}),s("div",{class:g("card-desc"),text:e.description,title:e.description}),s("div",{class:g("card-footer"),text:e.authors.join(", ")}))}function Qs(){let e=Fs().some(o=>!o.tags.some(n=>Gs.has(n)));V?.querySelector(`.${g("tabs")}`)?.replaceChildren(...$d.filter(o=>o.id!=="other"||e).map(o=>s("button",{class:g("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===$e)},on:{click:()=>{$e=o.id,Qs(),Xe()}}})))}function Xe(){if(!V)return;let e=Fs().filter(om),t=V.querySelector(`.${g("search")} input`);t&&(t.placeholder=`Search ${Uo(e.length,"plugin")}...`);let o=im(e.filter(d=>rm(d)&&nm(d))),n=$e==="all",r=n?o.filter(d=>!d.required):o,i=n?o.filter(d=>d.required):[],a=[...r.map(Us),...i.length?[s("div",{class:g("required-break"),attrs:{role:"separator"}}),...i.map(Us)]:[]],c=yn.trim()?"No plugins match your search.":em[$e]??"No plugins available.";V.querySelector(`.${g("grid")}`)?.replaceChildren(...a.length?a:[s("div",{class:g("empty"),text:c})])}function cm(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),V?.querySelector(`.${g("popup-backdrop")}`)?ao():Tt())}var Ws,Vr;function um(){if(V)return;let e=s("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=yn,e.addEventListener("input",()=>{yn=e.value,Xe()}),V=s("div",{class:`bloom-root ${g("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&Tt()}},s("div",{class:g("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},s("div",{class:g("header")},s("div",{class:g("logo")},N("bloom")),s("h2",{class:g("title"),text:"Bloom++"}),s("span",{class:g("hint"),attrs:{"aria-label":Ns,tabindex:"0",[we]:Ns}},N("info")),s("span",{class:g("version"),text:"v2.0.87"}),X("close","Close",Tt)),s("div",{class:g("tabs"),attrs:{role:"tablist"}}),s("div",{class:g("toolbar")},s("label",{class:g("search")},N("search"),e),Fr(jr,_d,t=>{jr=t,Xe()})),s("div",{class:g("grid")}))),V.addEventListener("keydown",t=>t.stopPropagation()),Vr=new AbortController,document.addEventListener("keydown",cm,{capture:!0,signal:Vr.signal}),document.body.append(V),Qs(),Xe(),Ws=Va(Xe),e.focus(),Jd.debug("Opened")}function Tt(){ao(),Vr?.abort(),Ws?.(),V?.remove(),V=null}var An=()=>V?Tt():um();var js=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

.bloom-entry-wrap {
    padding-inline: var(--padding-row-x, 0.5rem);
}

.bloom-entry-expanded {
    padding-top: 0.5rem;
}

.bloom-entry-rail {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    padding-block: 0.25rem;
    pointer-events: auto;
}

.bloom-entry-expanded.bloom-entry-hover:not(:hover > *),
.bloom-entry-hover:not(.bloom-entry-expanded, :hover, :has(~ :hover)) {
    display: none;
    transition: display 0s 0.2s allow-discrete;
}

.bloom-entry-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    min-height: 2.25rem;
    padding: 0 0.5rem;
    border-radius: 0.625rem;
    color: var(--bloom-fg);
    font-size: 0.875rem;
    text-align: start;
}

.bloom-entry-button:hover {
    background-color: var(--bloom-hover);
}

.bloom-entry-button .bloom-icon {
    width: 1.25rem;
    height: 1.25rem;
}

.bloom-entry-rail .bloom-entry-button {
    justify-content: center;
    width: 2.25rem;
    padding: 0;
    color: var(--bloom-fg-3);
}

:has(> .bloom-entry-hover) {
    anchor-scope: --bloom-account;
}

:has(> .bloom-entry-hover):has(button[aria-haspopup="menu"][aria-expanded="true"]) > .bloom-entry-hover {
    display: none;
}

:has(> .bloom-entry-hover) :is([data-bloom-profile]:is(button), :has(> [data-bloom-profile]) > button[aria-haspopup="menu"]) {
    anchor-name: --bloom-account;
}

.bloom-entry-hover {
    position: absolute;
    position-anchor: --bloom-account;
    inset: auto anchor(right) anchor(top) anchor(left);
    z-index: 30;
    display: block;
    padding: 0;
    pointer-events: none;
}

.bloom-entry-hover:is(:hover, :has(~ :hover)) {
    pointer-events: auto;
}

.bloom-entry-rail.bloom-entry-hover {
    --bloom-entry-x: 0.5;
}

.bloom-entry-hover .bloom-entry-button {
    position: relative;
    left: calc(var(--bloom-entry-x) * 100%);
    width: max-content;
    min-width: 2.25rem;
    background-color: var(--bloom-surface);
    box-shadow: 0 0 0 1px var(--bloom-border-light), 0 0.25rem 0.75rem #0000001a;
    transform: translateX(calc(var(--bloom-entry-x) * -100%));
    pointer-events: auto;
    touch-action: none;
}

.bloom-entry-hover .bloom-entry-button::after {
    content: "";
    position: absolute;
    inset-inline: 0;
    top: 100%;
    height: 0.35rem;
}

.bloom-entry-hover .bloom-entry-button:hover {
    background-image: linear-gradient(var(--bloom-hover), var(--bloom-hover));
}

.bloom-entry-menu-item {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    min-height: 2.25rem;
    margin: 0.25rem;
    padding: 0 0.625rem;
    border-radius: 0.5rem;
    cursor: pointer;
}

.bloom-entry-menu-item:hover,
.bloom-entry-menu-item:focus {
    outline: none;
    background-color: var(--bloom-hover);
}

.bloom-settings-backdrop {
    position: fixed;
    inset: 0;
    z-index: 2147483000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: #0006;
    contain: content;
    animation: bloom-fade-in 0.15s ease-out;
}

.bloom-settings-modal {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: min(56rem, 100%);
    height: min(44rem, 100%);
    padding: 1.25rem;
    border-radius: 1.25rem;
    background: var(--bloom-surface);
    box-shadow: var(--bloom-shadow);
    overflow: hidden;
}

.bloom-settings-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.bloom-settings-logo .bloom-icon {
    width: 1.5rem;
    height: 1.5rem;
}

.bloom-settings-title {
    font-size: 1.125rem;
    font-weight: 600;
}

.bloom-settings-hint {
    color: var(--bloom-fg-3);
    cursor: help;
}

.bloom-settings-version {
    margin-inline-start: auto;
    color: var(--bloom-fg-3);
    font-size: 0.75rem;
}

.bloom-settings-tabs {
    display: flex;
    gap: 1rem;
    border-bottom: 1px solid var(--bloom-border-light);
    overflow-x: auto;
}

.bloom-settings-tab {
    padding: 0.375rem 0.125rem;
    border-bottom: 2px solid transparent;
    color: var(--bloom-fg-2);
    font-weight: 500;
    white-space: nowrap;
}

.bloom-settings-tab:hover {
    color: var(--bloom-fg);
}

.bloom-settings-tab[aria-selected="true"] {
    border-bottom-color: var(--bloom-fg);
    color: var(--bloom-fg);
}

.bloom-settings-toolbar {
    display: flex;
    gap: 0.5rem;
}

.bloom-settings-toolbar .bloom-select {
    width: 8rem;
}

.bloom-settings-search {
    position: relative;
    flex: 1;
    color: var(--bloom-fg-3);
}

.bloom-settings-search .bloom-icon {
    position: absolute;
    top: 50%;
    left: 0.75rem;
    transform: translateY(-50%);
}

.bloom-settings-search .bloom-input {
    padding-left: 2.25rem;
    color: var(--bloom-fg);
}

.bloom-settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    align-content: start;
    gap: 0.75rem;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
}

.bloom-settings-card {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    padding: 0.875rem;
    border: 1px solid var(--bloom-border-light);
    border-radius: 0.875rem;
    background: var(--bloom-card);
}

.bloom-settings-card-off .bloom-settings-card-icon,
.bloom-settings-card-off .bloom-settings-card-name {
    opacity: 0.6;
}

.bloom-settings-card-required {
    opacity: 0.4;
}

.bloom-settings-required-break {
    grid-column: 1 / -1;
    height: 1px;
    margin-block: 0.25rem;
    background: var(--bloom-border);
}

.bloom-settings-required-mark {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.75rem;
    height: 1.75rem;
    color: var(--bloom-fg-3);
}

.bloom-settings-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.bloom-settings-card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 0.625rem;
    background: var(--bloom-hover);
}

.bloom-settings-card-icon .bloom-icon {
    width: 1.125rem;
    height: 1.125rem;
}

.bloom-settings-card-actions {
    display: flex;
    align-items: center;
    gap: 0.125rem;
}

.bloom-settings-card-actions .bloom-switch {
    margin-inline-start: 0.375rem;
}

.bloom-settings-card-name {
    font-weight: 600;
}

.bloom-settings-card-desc {
    display: -webkit-box;
    overflow: hidden;
    color: var(--bloom-fg-2);
    font-size: 0.8125rem;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.bloom-settings-card-footer,
.bloom-settings-popup-authors {
    margin-top: auto;
    color: var(--bloom-fg-3);
    font-size: 0.75rem;
}

.bloom-settings-empty {
    grid-column: 1 / -1;
    padding: 3rem 1rem;
    color: var(--bloom-fg-2);
    text-align: center;
}

.bloom-settings-popup-backdrop {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: #0000004d;
}

.bloom-settings-popup {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: min(32rem, 100%);
    max-height: 100%;
    padding: 1.25rem;
    border-radius: 1rem;
    background: var(--bloom-surface);
    box-shadow: var(--bloom-shadow);
    overflow-y: auto;
    animation: bloom-fade-in 0.15s ease-out;
}

.bloom-settings-popup-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.bloom-settings-popup-title {
    flex: 1;
}

.bloom-settings-popup-desc {
    color: var(--bloom-fg-2);
}

.bloom-settings-fields {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.bloom-settings-field {
    display: flex;
    gap: 0.5rem;
}

.bloom-settings-field-inline {
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}

.bloom-settings-field-stacked {
    flex-direction: column;
}

.bloom-settings-field-label {
    font-weight: 500;
}

.bloom-settings-field-desc {
    color: var(--bloom-fg-2);
    font-size: 0.8125rem;
}

.bloom-settings-popup-footer {
    display: flex;
    justify-content: flex-end;
    padding-top: 0.5rem;
    border-top: 1px solid var(--bloom-border-light);
}
`;var Re=M("bloom-entry-"),mm=4,Jr="--bloom-entry-x",Zr=1,Ct=p({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar. The account menu and the userscript menu always open the panel.",default:!1},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:!0},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:e=>(e.append(j("Reset position",()=>{Ct.store.entryPosition=Zr})),()=>e.replaceChildren())},entryPosition:{type:"custom",default:Zr}}),_e=new Map,zs=!1,Vs=[];function fm(e,t,o){let n=e.currentTarget,r=t.clientWidth-n.offsetWidth;if(e.button!==0||r<=0||!t.classList.contains(Re("hover")))return;let i=Ct.store.entryPosition,a=i,c=!1,l=new AbortController;n.setPointerCapture(e.pointerId),n.addEventListener("pointermove",m=>{!c&&Math.abs(m.clientX-e.clientX)<mm||(c=!0,o(),a=se(i+(m.clientX-e.clientX)/r,0,Zr),t.style.setProperty(Jr,String(a)))},{signal:l.signal});let d=()=>{l.abort(),c&&(Ct.store.entryPosition=a,t.style.removeProperty(Jr))};n.addEventListener("pointerup",d,{signal:l.signal}),n.addEventListener("lostpointercapture",d,{signal:l.signal})}function pm(e){let t=!1,o=s("button",{class:Re("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),t||An(),t=!1},pointerdown:r=>{t=!1,e!=="rail"&&fm(r,n,()=>{t=!0})}}},N("bloom"),e!=="rail"&&s("span",{class:Re("label"),text:"Bloom++"})),n=s("div",{class:`bloom-root ${Re("wrap")} ${Re(e)}`,attrs:{"data-bloom":"entry"}},o);return n}function gm(e){let t=s("div",{class:`bloom-root ${Re("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),An()}}},N("bloom"),s("span",{text:"Bloom++"})),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function Js(){let{showSidebarEntry:e,showSidebarEntryOnHover:t}=Ct.store,o=e||t?Is():[];for(let[r,i]of _e)r.isConnected&&o.some(a=>a.anchor===r)||(i.remove(),_e.delete(r));for(let r of o){let i=_e.get(r.anchor);if(i?.isConnected||!qe(r.anchor))continue;let a=i??pm(r.kind);_e.set(r.anchor,a),r.insert(a)}for(let r of _e.values())r.classList.toggle(Re("hover"),!e);let n=hn();n&&!n.querySelector('[data-bloom="menu-entry"]')&&gm(n)}var Zs=f({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:Ct,styles:()=>`${js}.${Re("hover")}{${Jr}:${Ct.store.entryPosition}}`,start(){Vs=[E(Js),Cs(),me()],!zs&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",An),zs=!0)},stop(){for(let e of Vs)e();for(let e of _e.values())e.remove();_e.clear(),Tt()},onSettingsChange:Js});var hm=80,bm=420;function Xr(e,t,o){return(e.x-o.x)*(t.y-o.y)-(t.x-o.x)*(e.y-o.y)}function ym(e,t,o,n){let r=Xr(e,t,o),i=Xr(e,o,n),a=Xr(e,n,t);return!((r<0||i<0||a<0)&&(r>0||i>0||a>0))}function Am(e,t){let o=(t.left+t.right)/2-(e.left+e.right)/2,n=(t.top+t.bottom)/2-(e.top+e.bottom)/2;if(Math.abs(o)>=Math.abs(n)){let i=o<0?t.right:t.left;return[{x:i,y:t.top},{x:i,y:t.bottom}]}let r=n<0?t.bottom:t.top;return[{x:t.left,y:r},{x:t.right,y:r}]}function Xs(e,t){let o=se(e.x,t.left,t.right),n=se(e.y,t.top,t.bottom);return Math.hypot(e.x-o,e.y-n)}function vn(e){let t=e.closeDelay??hm,o=e.towardDelay??bm,n=0,r=!1,i=null,a=null,c=()=>{document.removeEventListener("pointermove",y,!0)},l=()=>{n&&window.clearTimeout(n),n=0,c(),i=null,a=null},d=()=>{l(),r&&(r=!1,e.setHeld(!1))},m=()=>{r||(r=!0,e.setHeld(!0))},A=q=>{n&&window.clearTimeout(n),n=window.setTimeout(d,q)},F=q=>{let te=e.panel(),pt=e.trigger();if(!te||!i)return!1;let Z=te.getBoundingClientRect();if(Z.width<=0&&Z.height<=0)return!1;let Y=pt?.getBoundingClientRect(),[br,Ou]=Y&&(Y.width||Y.height)?Am(Y,Z):[{x:Z.left,y:Z.top},{x:Z.right,y:Z.bottom}];return ym(q,i,br,Ou)?!0:a!=null&&Xs(q,Z)<Xs(a,Z)-.25},y=q=>{let te={x:q.clientX,y:q.clientY};if(e.over(q.target)){l();return}F(te)?A(o):d(),a=te};return{enter(){l()},leave(q){if(e.over(q.relatedTarget)){l();return}i={x:q.clientX,y:q.clientY},a=i,m(),document.addEventListener("pointermove",y,!0),A(t)},dispose(){l(),r=!1}}}var $s=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

.bloom-nav-root {
    position: fixed;
    z-index: 30;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    contain: layout style;
}

.bloom-nav-rail {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.375rem;
    max-height: 100%;
    padding: 0.5rem 0.25rem;
    overflow-y: auto;
    scrollbar-width: none;
}

.bloom-nav-tick {
    width: 1.25rem;
    height: 2px;
    flex: none;
    border-radius: 1px;
    background: color-mix(in srgb, var(--bloom-fg) 40%, transparent);
    transition: width 0.15s ease, background-color 0.15s ease;
}

.bloom-nav-tick-assistant {
    width: 0.875rem;
}

.bloom-nav-tick-current {
    width: 1.75rem;
    background: color-mix(in srgb, var(--bloom-fg) 83%, transparent);
    box-shadow: 0 0 0.375rem color-mix(in srgb, var(--bloom-fg) 40%, transparent);
}

.bloom-nav-tick-streaming {
    background: repeating-linear-gradient(90deg, color-mix(in srgb, var(--bloom-fg) 60%, transparent) 0 3px, transparent 3px 5px);
}

.bloom-nav-bridge {
    position: absolute;
    inset-block: 0;
    right: 100%;
    width: 0.5rem;
}

.bloom-nav-toc {
    position: absolute;
    top: 50%;
    right: calc(100% + 0.25rem);
    display: none;
    flex-direction: column;
    gap: 0.25rem;
    width: min(18rem, 70vw);
    max-height: 100%;
    overflow: auto;
    padding: 0.5rem;
    border: 1px solid var(--bloom-border);
    border-radius: 1rem;
    background: var(--bloom-surface);
    box-shadow: var(--bloom-shadow);
    transform: translateY(-50%);
}

.bloom-nav-root:is(:hover, .bloom-nav-open) .bloom-nav-toc {
    display: flex;
}

.bloom-nav-toc-head {
    padding: 0 0.5rem;
    color: var(--bloom-fg-3);
    font-size: 0.75rem;
    font-variant-numeric: tabular-nums;
}

.bloom-nav-toc-list {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}

.bloom-nav-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
    padding: 0.375rem 0.5rem;
    border-radius: 0.5rem;
    font-size: 0.8125rem;
    text-align: start;
}

.bloom-nav-row:hover,
.bloom-nav-row[aria-current="true"] {
    background: var(--bloom-hover);
}

.bloom-nav-flash {
    outline: 2px solid var(--bloom-accent);
    outline-offset: 0.25rem;
    border-radius: 0.75rem;
}
`;var C=M("bloom-nav-"),Sn=80,qm=1200,wm=2,_s=3e4,xm=200,Sm=.9,Em=.28,Tm=24,Mt=8,Cm=80,Mm=12,$r=80,il=`${u.rightPanel}, ${u.summaryPanel}`,Lm={user:"\u2753",assistant:"\u{1F916}"},km=["wheel","touchmove","pointerdown"],Tn=p({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),T=null,O=[],ae=-1,tt=-1,Lt=null,qn="",ei=0,el=[],uo=null,wn=null,xn=new Set,xe,so,et,ti="",lo=[],En=null,oi=new Set,Im=e=>Tn.store.showAssistant||e.role==="user",Bm=e=>e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.messageIds[0]||e.role;function Pm(e){return{role:e.role,summary:wt(e),ids:e.messageIds,turn:e,streaming:e.streaming}}function al(e,t){let o=e.entries.at(-1);if(o?.role==="assistant"&&t.role==="assistant"){e.entries[e.entries.length-1]={...t,ids:[...new Set([...o.ids,...t.ids])]};return}e.entries.push(t)}function Om(){let e=[];for(let t of Pe()){let o=Pm(t),n=Bm(t),r=e.at(-1);r?.key===n?al(r,o):e.push({key:n,entries:[o]})}return e}function Rm(){let e=[];for(let t of le(b())?.chain??[]){let o={role:t.role,summary:cn(t),ids:[t.id],turn:null,streaming:!1},n=e.at(-1);t.role==="assistant"&&n?al(n,o):e.push({key:t.id,entries:[o]})}return e}var kt=e=>e.entries.flatMap(t=>t.ids);function ni(e,t){let o=new Set(kt(e));return kt(t).some(n=>o.has(n))}var ot=e=>h(e.entries.find(t=>t.role==="user")?.summary??""),_r=(e,t)=>e.filter(o=>ot(o)===t).length,ri=e=>({...e,turn:null,streaming:!1});function Dm(e,t){let o=new Set(t.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return e.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return ri(r);let a=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return a&&a!==n.key?ri(r):r})}))}function Hm(e,t){let o=t.entries.map((n,r)=>{let i=e.entries[r];if(!i)return n;let a=[...new Set([...n.ids,...i.ids])];return{...n,ids:a,summary:n.summary||i.summary}});for(let n of e.entries.slice(o.length))o.push(ri(n));return{key:e.key,entries:o}}function sl(){let e=to();if(!e)return!1;let t=e.clientHeight-e.scrollHeight;return e.scrollTop-t<=Math.abs(e.scrollTop)}function Nm(e,t){let o=Dm(e,t);if(!t.length)return o;if(!o.length)return t;let n=t.findIndex(l=>o.some(d=>d.key===l.key));if(n<0)return sl()?t.concat(o):o.concat(t);let r=t[n]?.key,i=o.findIndex(l=>l.key===r),a=o.slice(0,i).concat(t.slice(0,n),o.slice(i)),c=a.findIndex(l=>l.key===r);for(let l=n;l<t.length;l++){let d=t[l];if(!d)continue;let m=a.findIndex(A=>A.key===d.key);if(m>=0){let A=a[m];A&&(a[m]=Hm(A,d)),c=m}else a.splice(c+1,0,d),c++}return a}function Um(e,t){let o=0,n=0,r=0;for(let i=1-e.length;i<t.length;i++){let a=0,c=0;for(let d=0;d<e.length;d++){let m=t[d+i],A=e[d];!m||!A||(ni(A,m)?(a+=3,c++):ot(A)&&ot(A)===ot(m)&&a++)}let l=sl()?i<r:i>r;(a>o||a===o&&c>n||a===o&&c===n&&l)&&(o=a,n=c,r=i)}return{score:o,offset:r}}function Gm(e,t){let o=e.entries.map((n,r)=>{let i=t.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of t.entries.slice(o.length))o.push({...n,turn:null});return{key:e.key,entries:o}}function Fm(e){return e.map(t=>({key:t.key,entries:t.entries.map(o=>({...o}))}))}function Ym(e,t){if(!t.length)return e;if(!e.length)return t;let{score:o,offset:n}=Um(e,t),r=Fm(e);if(o>0)for(let c=0;c<r.length;c++){let l=t[c+n],d=r[c];if(!l||!d)continue;let m=ot(d),A=!!m&&m===ot(l)&&_r(e,m)===1&&_r(t,m)===1;(ni(d,l)||A)&&(r[c]=Gm(d,l))}let i=[],a=[];for(let c=0;c<t.length;c++){let l=t[c];if(!l)continue;let d=ot(l);!d||_r(r,d)>0||r.some(m=>ni(m,l))||(o>0&&c<n?i.push(l):a.push(l))}return i.concat(r,a)}var ii=e=>e.entries.some(t=>t.turn?.el.isConnected);function Km(e,t,o){let n=e.findIndex(i=>kt(i).includes(t));if(n>=0)return n+1;let r=e.find(ii);return o&&r&&kt(r).includes(o)?0:e.length}function Qm(e){if(En){let{parent:t,user:o}=En;for(let n of e.slice(Km(e,t,o))){let r=kt(n);if(!ii(n)&&!(o&&r.includes(o)))for(let i of r)oi.add(i)}}return e.filter(t=>ii(t)||!kt(t).some(o=>oi.has(o)))}function ll(){lo=[],En=null,oi.clear()}function Wm(){let e=hs();e!==ti&&(ti=e,ll());let t=Om(),o=Rm();return!t.length&&!o.length&&!gs()?(lo=[],[]):(lo=Qm(Ym(Nm(lo,t),o)),lo.flatMap(n=>n.entries).filter(Im))}function jm(e){for(let o of e)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!R().generating||e.some(o=>o.streaming))return;let t=e.at(-1);t&&(t.role==="assistant"||!Tn.store.showAssistant?t.streaming=!0:e.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function cl(){let e=Wm();return jm(e),e}function ul(e){let t=e.getBoundingClientRect(),o=Q()?.getBoundingClientRect().top,n=Math.min(t.bottom,o&&o>t.top?o:t.bottom);return{top:t.top,bottom:n}}function dl(e){return((e.matches(".whitespace-pre-wrap, .markdown, .prose, [data-markdown-text-style]")?e:e.querySelector(".whitespace-pre-wrap")??e.querySelector(".markdown, .prose, [data-markdown-text-style]"))??e).getBoundingClientRect().top}function tl(e){let t=O[e]?.turn?.el;return t?.isConnected?t:null}function zm(e){if(!O.length)return null;let t=e.scrollHeight-e.clientHeight,o=Dr(e),n=Math.min(e.scrollTop,0),r=o?-n:t-e.scrollTop,i=o?t+n:e.scrollTop,a=t<=Mt||r<=Mt,c=t>Mt&&i<=Mt,{top:l,bottom:d}=ul(e),m=tl(0),A=m?dl(m):Number.NaN,F=!!m&&A>=l-Mt&&A<=l+48,y=tl(O.length-1),q=y?.getBoundingClientRect().bottom??Number.NaN,te=!!y&&q<=d+Mt&&q>=d-Cm;return a||te?"bottom":c||F?"top":null}function Vm(e){let{top:t,bottom:o}=ul(e),n=t+Math.max(o-t,0)*Em,r=[],i=-1;if(O.forEach((c,l)=>{let d=c.turn?.el;if(!d?.isConnected){r.push(Number.NaN);return}let m=dl(d);r.push(m),i<0&&(i=l),m<=n&&(i=l)}),i<0)return Math.max(O.findIndex(c=>c.turn),0);let a=r[ae];return Number.isFinite(a)?i===ae?ae:i>ae?i:a<=n+Tm?ae:i:i}function Jm(e){let t=zm(e);return t==="bottom"?O.length-1:t==="top"?0:Vm(e)}function ol(e){Tn.store.jumpEffect==="border"&&(e.classList.add(C("flash")),setTimeout(()=>e.classList.remove(C("flash")),qm))}function Cn(e){let t=O[e],o=to();if(!t||!o)return;if(!t.turn&&!t.ids.length){tt=e,co(),o.scrollTo({top:Dr(o)?0:o.scrollHeight});return}tt=e,Lt=e?null:{chat:b(),first:t.ids[0],until:Date.now()+_s},co();let n=t.turn?.el;if(n?.isConnected){let d=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:d<o.clientHeight*wm?"smooth":"auto"}),ol(n);return}let r=O.findIndex(d=>d.turn),i=r>=0&&e<r?-1:1,a=++ei,c=Date.now()+_s,l=()=>{let d=to();if(a!==ei||Date.now()>c||!d)return;O=cl();let m=O.find(F=>F.ids.some(y=>t.ids.includes(y)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),ol(m),tt=O.findIndex(F=>F.turn?.el===m),co();return}let A=d.scrollTop;d.scrollBy({top:i*d.clientHeight*Sm,behavior:"instant"}),d.scrollTop===A?setTimeout(l,xm):requestAnimationFrame(l)};l()}function Zm(e,t){return s("button",{class:C("row"),attrs:{type:"button","data-index":String(t),"data-message-id":e.ids[0]??""},on:{click:()=>Cn(t)}},s("span",{text:Lm[e.role]}),s("span",{class:"bloom-truncate",text:ce(e.summary||"\u2026",Sn)}))}function Xm(e,t){let o=e.offsetWidth?t.width/e.offsetWidth:1;return t.left+(e.clientLeft+e.clientWidth)*o}function $m(e){let t=1/0;for(let o of document.querySelectorAll(il)){if(!Qe(o))continue;let n=o.getBoundingClientRect();n.width<$r||n.height<$r||n.left<e.left+$r||n.left<t&&(t=n.left)}return Number.isFinite(t)?t:null}function nl(e){if(!T)return;let t=e.getBoundingClientRect(),o=Q()?.getBoundingClientRect().top,r=Math.min(t.bottom,o&&o>t.top?o:t.bottom)-t.top,i=Math.min(Xm(e,t),$m(t)??1/0);T.style.right=`${document.documentElement.clientWidth-i+Mm}px`,T.style.top=`${t.top}px`,T.style.height=r>1?`${r}px`:""}function _m(){let e=to();if(O=cl(),!O.length||!e){et?.dispose(),et=void 0,T?.remove(),T=null,qn="";return}if(uo!==e){so?.abort(),so=new AbortController,e.addEventListener("scroll",Ie(co),{passive:!0,signal:so.signal});for(let n of km)e.addEventListener(n,ml,{passive:!0,signal:so.signal});uo=e,xe?.disconnect(),xe=new ResizeObserver(()=>{e.isConnected&&nl(e)}),xe.observe(e),wn=null,xn=new Set}let t=Q();if(t&&t!==wn&&xe&&(xe.observe(t),wn=t),xe)for(let n of document.querySelectorAll(il))xn.has(n)||(xe.observe(n),xn.add(n));T||(T=s("div",{class:`bloom-root ${C("root")}`,attrs:{"data-bloom":"navigator"},on:{pointerenter:()=>et?.enter(),pointerleave:n=>et?.leave(n)}},s("div",{class:C("rail")}),s("div",{class:C("bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:C("toc")},s("div",{class:C("toc-head")}),s("div",{class:C("toc-list")}))),et=vn({over:n=>n instanceof Node&&!!T?.contains(n),trigger:()=>T?.querySelector(`.${C("rail")}`),panel:()=>T?.querySelector(`.${C("toc")}`),setHeld:n=>T?.classList.toggle(C("open"),n)})),T.isConnected||document.body.append(T),nl(e);let o=JSON.stringify(O.map(n=>[n.role,n.ids]));o!==qn?(qn=o,tt=-1,tf(),Lt&&Date.now()<Lt.until&&Lt.chat===b()&&O[0]?.ids[0]!==Lt.first&&Cn(0)):ef(),co()}function co(){if(!T||!uo)return;ae=tt>=0?tt:Jm(uo),T.querySelectorAll(`.${C("tick")}`).forEach((t,o)=>t.classList.toggle(C("tick-current"),o===ae)),T.querySelectorAll(`.${C("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===ae)));let e=T.querySelector(`.${C("toc-head")}`);e&&(e.textContent=`${ae+1} / ${O.length}`)}function ef(){T?.querySelectorAll(`.${C("tick")}`).forEach((e,t)=>{let o=O[t],n=ce(o.summary,Sn);e.title!==n&&(e.title=n),e.classList.toggle(C("tick-streaming"),o.streaming)}),T?.querySelectorAll(`.${C("row")}`).forEach(e=>{let t=e.lastElementChild,o=ce(O[Number(e.dataset.index)].summary||"\u2026",Sn);t&&t.textContent!==o&&(t.textContent=o)})}function tf(){T?.querySelector(`.${C("rail")}`)?.replaceChildren(...O.map((t,o)=>s("button",{class:Fo(C("tick"),C(`tick-${t.role}`),t.streaming&&C("tick-streaming"),o===ae&&C("tick-current")),title:ce(t.summary,Sn),attrs:{type:"button","aria-label":`Jump to message ${o+1}`,"data-message-id":t.ids[0]??""},on:{click:()=>Cn(o)}}))),T?.querySelector(`.${C("toc-list")}`)?.replaceChildren(...O.map(Zm))}var fe=Ie(_m);function ml(){tt=-1,Lt=null,ei++}var of=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function rl(e){if(!T||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||of(document.activeElement)||K("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:ae-1,ArrowDown:ae+1,Home:0,End:O.length-1}[e.key];if(o==null){ml();return}o<0||o>=O.length||(e.preventDefault(),e.stopPropagation(),Cn(o))}var fl=f({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:Tn,styles:$s,start(){el=[E(e=>H(e)&&fe()),de(fe),W.on("conversation",fe),W.on("generate-start",({parentId:e,userId:t})=>{e&&(En={parent:e,user:t},fe())}),w.on("rise",fe),w.on("fall",fe)],addEventListener("keydown",rl,!0),addEventListener("resize",fe,{passive:!0}),fe()},stop(){for(let e of el)e();so?.abort(),xe?.disconnect(),xe=void 0,uo=null,wn=null,xn=new Set,removeEventListener("keydown",rl,!0),removeEventListener("resize",fe),et?.dispose(),et=void 0,T?.remove(),T=null,qn="",ll(),ti=""},onSettingsChange:fe});var pl=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

.bloom-quotes-hit {
    background: color-mix(in srgb, var(--bloom-fg) 16%, transparent);
    border-radius: 0.25rem;
}

button.bloom-quotes-back {
    position: fixed;
    z-index: 30;
    padding: 0.15rem 0.45rem;
    border: 0;
    border-radius: 999px;
    background: var(--bloom-card, var(--main-surface-primary, #fff));
    color: var(--bloom-fg);
    font: inherit;
    font-size: 0.75rem;
    box-shadow: 0 1px 4px color-mix(in srgb, var(--bloom-fg) 25%, transparent);
    cursor: pointer;
}

.bloom-quotes-chip {
    position: fixed;
    z-index: 30;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    max-width: 40rem;
    padding: 0.35rem 0.45rem 0.35rem 0.7rem;
    border: 1px solid color-mix(in srgb, var(--bloom-fg) 16%, transparent);
    border-radius: 0.75rem;
    background: var(--bloom-card, var(--main-surface-primary, #fff));
    color: var(--bloom-fg-2);
    box-shadow: 0 4px 16px color-mix(in srgb, #000 12%, transparent);
    cursor: pointer;
}

.bloom-quotes-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

button.bloom-quotes-x {
    flex: none;
    width: 1.5rem;
    height: 1.5rem;
    padding: 0;
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: var(--bloom-fg);
    font: inherit;
    cursor: pointer;
}
`;var $=M("bloom-quotes-"),pi="BloomBetterQuotes",rf=40,yl=8,af=1800,ci=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,gl=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,nt=p({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),ai,si,It,li=!1,ui=0,Mn=null,Ln=null,Se=null;function gi(){return location.pathname.match(/\/c\/(?!local-)([\w-]+)/)?.[1]??(new URLSearchParams(location.search).get("temporary-chat")==="true"?"temporary":"draft")}function In(){try{let e=JSON.parse(sessionStorage.getItem(pi)??"[]");return Array.isArray(e)?e.filter(t=>!!t&&typeof t=="object"&&typeof t.id=="string"&&typeof t.text=="string"&&!!t.text):[]}catch{return[]}}function hi(e){try{sessionStorage.setItem(pi,JSON.stringify(e.slice(-rf)))}catch{}}function mo(e){return In().find(t=>t.id===e)?.text??""}function sf(e,t){let o=In().filter(n=>n.id!==e);o.push({id:e,text:t}),hi(o)}function di(e=gi()){hi(In().filter(t=>t.id!==e)),kn()}function lf(e){let t=mo("draft");if(!t||mo(e))return;let o=In().filter(n=>n.id!=="draft");o.push({id:e,text:t}),hi(o)}function mi(e){return`${e.getAttribute("aria-label")??""} ${e.getAttribute("title")??""}`}function cf(e){let t=mi(e);return gl.test(t)&&!/quote|引用/.test(t)?!1:/quote|引用/.test(t)&&ci.test(t)?!0:ci.test(t)&&!gl.test(t)}function Al(e){let t=e.cloneNode(!0),o=[...t.querySelectorAll("button, [role='button']")],n=new Set(o.map(r=>r.getAttribute("aria-label")).filter(Boolean));for(let r of o)r.remove();for(let r of t.querySelectorAll("*"))!r.children.length&&n.has(h(r.textContent??""))&&r.remove();return h(t.textContent??"")}function uf(e){let t=Q(),o=e.parentElement,n=0;for(;o&&o!==t&&n<5;){if(n++,o.matches(u.composerInput)||o.querySelector(u.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=Al(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function Bn(){let e=Q();if(!e)return null;for(let t of e.querySelectorAll("button, [role='button']")){if(t.closest("[data-bloom]")||!cf(t))continue;let o=uf(t),n=o?Al(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:t}}return null}function df(e){let t=e.closest(u.searchUnit)??e.closest(u.oldMessage);return t&&(vt(t)??t.getAttribute("data-message-author-role"))==="user"?t:null}function bi(e){return h(e).slice(0,48)}function mf(e,t){let o=bi(e);if(o.length<yl)return null;let n=null;for(let r of qt()){if(t&&(r===t||t.contains(r)||r.contains(t)))continue;let i=h(r.textContent??"");if(!i.includes(o))continue;let a=o.length/Math.max(i.length,1);(!n||a>n.score)&&(n={el:r,score:a})}return n?.el??null}function ff(e,t){let o=bi(t),n=e;for(let r of e.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&h(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${$("hit")}`)?.classList.remove($("hit")),n.classList.add($("hit")),window.clearTimeout(ui),ui=window.setTimeout(()=>n.classList.remove($("hit")),af)}function hl(e){let t=e.closest(u.timelineScroll)??document.scrollingElement;if(!(t instanceof HTMLElement)&&t!==document.scrollingElement)return;let o=e.getBoundingClientRect();if(o.height<1||!t)return;let n=t.getBoundingClientRect(),r=Q()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,a=o.top+o.height/2-(n.top+i)/2;Math.abs(a)<8||t.scrollTo({top:t.scrollTop+a,behavior:"smooth"})}function yi(){if(!Se||!Mn?.isConnected)return;let e=Mn.getBoundingClientRect();e.width<1||(Se.style.top=`${Math.max(8,e.top+8)}px`,Se.style.left=`${Math.max(8,e.right-Se.offsetWidth-8)}px`)}function pf(e,t,o){Mn=e,Ln=t,Se??=s("button",{class:`bloom-root ${$("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),Se.isConnected||document.body.append(Se),ff(e,o),yi()}function bl(){Se?.remove(),Se=null,Mn=null,Ln=null,document.querySelector(`.${$("hit")}`)?.classList.remove($("hit"))}function vl(){return document.querySelector('[data-bloom="quote-chip"]')}function kn(){vl()?.remove()}function gf(e){let o=Q()?.getBoundingClientRect();!o||o.width<8||(e.style.width=`${Math.max(120,o.width-24)}px`,e.style.left=`${o.left+12}px`,e.style.top=`${Math.max(8,o.top-e.offsetHeight-8)}px`)}function hf(e){let t=vl();t||(t=s("div",{class:`bloom-root ${$("chip")}`,attrs:{"data-bloom":"quote-chip"}},s("span",{class:$("text")}),s("button",{class:$("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(t));let o=t.querySelector(`.${$("text")}`),n=h(e);o&&o.textContent!==n&&(o.textContent=n),t.dataset.text=e,gf(t)}function fi(){if(!li){li=!0;try{let e=gi(),t=Bn();nt.store.persistAcrossChats&&t&&mo(e)!==t.text&&sf(e,t.text);let o=nt.store.persistAcrossChats?mo(e):"";!o||t&&h(t.text)===h(o)?kn():hf(o),yi()}finally{li=!1}}}function bf(e){let t=e.closest('[data-bloom="quote-chip"]');if(t instanceof HTMLElement&&!e.closest(`.${$("x")}`)){let i=t.dataset.text??t.querySelector(`.${$("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:t}:null}let o=e.closest("blockquote");if(o instanceof HTMLElement&&!e.closest("a, button")){let i=df(o),a=h(o.textContent??"");if(i&&a)return{text:a,skip:i,origin:o}}let n=Q();if(!n||!n.contains(e)||Ve(e)||e.closest("button, [role='button']"))return null;let r=Bn();return!r||!r.row.contains(e)?null:{text:r.text,skip:null,origin:r.row}}function yf(e){let{target:t}=e;if(!(t instanceof Element))return;if(t.closest('[data-bloom="quote-back"]')){e.preventDefault(),e.stopPropagation(),Ln?.isConnected&&hl(Ln);return}if(t.closest(`.${$("x")}`)){e.preventDefault(),e.stopPropagation(),di();return}let o=Bn();if(o&&(t===o.dismiss||o.dismiss.contains(t))){di();return}if(Af(t)&&ql(),!nt.store.jumpToPassage)return;let n=bf(t);if(!n)return;let r=mf(n.text,n.skip);r&&(e.preventDefault(),e.stopPropagation(),pf(r,n.origin,n.text),hl(r))}function Af(e){let t=e.closest("button, [role='button']");return!(t instanceof HTMLElement)||t.closest("[data-bloom]")||!Q()?.contains(t)?!1:/send|submit|发送|提交/i.test(mi(t))&&!ci.test(mi(t))}function vf(e){return!(e instanceof KeyboardEvent)||e.key!=="Enter"||e.shiftKey||e.isComposing?!1:Ve(e.target)}function ql(){if(!nt.store.persistAcrossChats)return;let e=gi(),t=mo(e);if(t){if(!Bn()){let o=k(),n=bi(t);n.length>=yl&&!h(o).includes(n)&&ie(`> ${t}

${o}`.trim())}di(e)}}function qf(e){vf(e)&&ql()}function wf(e){!e.prevId&&e.id&&lf(e.id),fi()}var wl=f({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:nt,styles:pl,onSettingsChange(e){e==="jumpToPassage"&&!nt.store.jumpToPassage&&bl(),e==="persistAcrossChats"&&!nt.store.persistAcrossChats&&(sessionStorage.removeItem(pi),kn()),fi()},start(){It=new AbortController,document.addEventListener("pointerdown",yf,{capture:!0,signal:It.signal}),document.addEventListener("keydown",qf,{capture:!0,signal:It.signal}),addEventListener("scroll",yi,{capture:!0,passive:!0,signal:It.signal}),si=de(wf),ai=E(e=>H(e)&&fi())},stop(){It?.abort(),It=void 0,si?.(),si=void 0,ai?.(),ai=void 0,window.clearTimeout(ui),bl(),kn()}});var xl=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

.bloom-cls {
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: 0.875rem;
    height: 0.875rem;
    margin-inline-start: auto;
    pointer-events: none;
}

.bloom-cls-streaming::before {
    content: "";
    width: 0.75rem;
    height: 0.75rem;
    border: 2px solid color-mix(in srgb, var(--bloom-fg) 20%, transparent);
    border-top-color: var(--bloom-fg);
    border-radius: 50%;
    animation: bloom-spin 0.8s linear infinite;
}

.bloom-cls-error {
    color: var(--bloom-danger);
}

.bloom-cls-error .bloom-icon {
    width: 0.875rem;
    height: 0.875rem;
}
`;var Sf=M("bloom-cls"),Ef="bloom-cls",Tf=600*1e3,vi=wa("tab"),Pt=new Map,po=new Map,Bt=null,Sl=[],Cf=e=>e==="streaming"||e==="error";function Mf(){let e=new Map,t=Date.now();for(let[o,n]of po)t-n.at>Tf?po.delete(o):e.set(o,n.status);for(let[o,n]of Pt)e.set(o,n);return e}function Lf(e){return s("span",{class:`bloom-root ${Sf("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&N("alert"))}function fo(){let e=Mf(),t=new Set;for(let[o,n]of e)for(let r of io(o)){if(!qe(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let a=Lf(n);t.add(a),r.append(a)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function Pn(e,t){e&&(t?Pt.set(e,t):Pt.delete(e),Bt?.postMessage({tab:vi,id:e,status:t}),fo())}function kf({data:e}){!P(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===vi||(Cf(e.status)?po.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):po.delete(e.id),fo())}function Ai(){for(let e of Pt.keys())Bt?.postMessage({tab:vi,id:e,status:null})}var El=f({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:()=>`${xl}`,start(){Bt=typeof BroadcastChannel=="function"?new BroadcastChannel(Ef):null,Bt?.addEventListener("message",kf),addEventListener("pagehide",Ai),Sl=[w.on("rise",({conversationId:e})=>Pn(e,"streaming")),w.on("fall",({conversationId:e,outcome:t})=>Pn(e,t==="error"?"error":null)),w.on("context",({prevId:e,id:t,migrated:o})=>{o&&R().generating?Pn(t,"streaming"):!o&&Pt.get(e??"")==="streaming"&&Pn(e,null)}),E(e=>H(e)&&fo())],b()&&fo()},stop(){for(let e of Sl)e();Ai(),Bt?.close(),Bt=null,removeEventListener("pagehide",Ai),Pt.clear(),po.clear(),fo()}});var Cl=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],Dn={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},If={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Bf="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",qi=32,Hn=64,wi="#FCFCFC",xi="#111111",Pf=14,Nn=51.5,Of=12.5,Rf=9.75,Tl=52,Df=10.5,Hf=7.75,Nf={rotate:e=>e.arc(Nn,Nn,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function On(e){let t=document.createElement("canvas");t.width=t.height=qi;let o=t.getContext("2d");return o?(o.scale(qi/Hn,qi/Hn),e(o),t.toDataURL("image/png")):""}function Rn(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D(Bf);o&&(e.strokeStyle=xi,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function Un(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function Uf(e,t){Un(e,Nn,Of,xi),Un(e,Nn,Rf,Dn[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),Nf[t](e),e.stroke()}function Gf(e,t){e.beginPath(),e.roundRect(0,0,Hn,Hn,Pf),e.fillStyle=t,e.fill()}var Ff=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function Ml(e,t){switch(e){case"original":return Ff(If[t]);case"hole":return On(o=>Rn(o,Dn[t],!0));case"bg":return On(o=>{Gf(o,Dn[t]),Rn(o,wi,!1)});case"dot":return On(o=>{Rn(o,wi,!0),Un(o,Tl,Df,xi),Un(o,Tl,Hf,Dn[t])});case"badge":return On(o=>{Rn(o,wi,!0),Uf(o,t)})}}var ho="bloom-chat-state-favicon",bo="data-bloom-rel",Ti="data-bloom-media",Ll="bloom-parked-icon",Yf="/favicon.ico",Il=p({style:{type:"select",description:"How the tab icon shows the chat state.",options:Cl,default:"bg"}}),De=null,Bl="",Gn=null,Pl="",kl=new Map,Ci,Si=[],Ol=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${bo}]`)];function Mi(){for(let e of Ol())e.id!==ho&&(e.hasAttribute(bo)||(Pl||=e.href,e.setAttribute(bo,e.rel),e.setAttribute(Ti,e.getAttribute("media")??"")),e.rel!==Ll&&(e.rel=Ll),e.media!=="not all"&&(e.media="not all"))}function Kf(){for(let e of Ol()){let t=e.getAttribute(bo);if(t==null)continue;e.rel=t;let o=e.getAttribute(Ti);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(bo),e.removeAttribute(Ti)}}function Rl(){let e=document.getElementById(ho);return e||(e=document.createElement("link"),e.id=ho,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function Qf(e){if(e==="wait")return Pl||Yf;let t=Il.store.style,o=`${t}:${e}`,n=kl.get(o);return n||kl.set(o,n=Ml(t,e)),n}function Ei(e){if(e)return"rotate";let t=k();return De&&t&&t!==Bl&&(De=null),De==="error"?"error":De==="done"?"done":t?"ready":"wait"}function go(e,t=!1){if(e===Gn&&!t)return;Gn=e;let o=Rl(),n=Qf(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function Wf(){Ci=new MutationObserver(()=>{Mi(),document.head.lastElementChild?.id!==ho&&Rl()}),Ci.observe(document.head,{childList:!0})}var Dl=f({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"HostReady",settings:Il,start(){Mi(),go(Ei(R().generating),!0),Wf(),Si=[w.on("rise",()=>{De=null,go("rotate")}),w.on("fall",({outcome:e})=>{De=e==="done"||e==="error"?e:null,Bl=k(),go(Ei(!1))}),w.on("context",({migrated:e})=>{e||(De=null)}),w.on("tick",({generating:e})=>{Mi(),go(Ei(e))})]},stop(){for(let e of Si)e();Si=[],Ci?.disconnect(),document.getElementById(ho)?.remove(),Kf(),Gn=null,De=null},onSettingsChange(){go(Gn??"wait",!0)}});var He="data-bloom-invite",jf=/^(?:invite team members|invite members|邀请团队成员|邀请成员)$/i,Hl=':is(button, a:not([href^="/c/"])):not(main *, [role="dialog"] *)',zf={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${u.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])'],hideInvite:[`[${He}]`,`div:has(> [${He}]:only-child)`]},Nl=p({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0},hideInvite:{type:"boolean",description:"Hide Invite team members in the sidebar.",default:!0}}),Fn,Li=!1;function Vf(e){if(H(e))for(let t of document.querySelectorAll(`${Hl}, [${He}]`))!t.matches(Hl)||!jf.test(h(t.textContent??""))?t.removeAttribute(He):t.hasAttribute(He)||t.setAttribute(He,"")}var Ul=f({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads, notices and Invite team members.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:Nl,styles:()=>ke(Object.entries(zf).flatMap(([e,t])=>Nl.store[e]?t:[])),start(){Li=!0,Je().then(()=>{Li&&!Fn&&(Fn=E(Vf))})},stop(){Li=!1,Fn?.(),Fn=void 0;for(let e of document.querySelectorAll(`[${He}]`))e.removeAttribute(He)}});var Ot=`form:has(:is(${u.composerInput})), ${u.oldComposerForm}`,Yn='[class*="ComposerLayoutBody"]',Ii='[class*="ComposerLayoutRoot"]',Jf='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',Zf=`:is(${Ot}) ${Yn}, :is(${Ot}):not(:has(${Yn})) ${Ii}, :is(${Ot}):not(:has(${Yn})):not(:has(${Ii})) :is(${Jf})`,Xf='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',$f='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',_f="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))";var ep="composer-fill",Gl=p({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function tp(){let{opacity:e,blur:t}=Gl.store;if(e>=100)return"";let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${_f} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important;-webkit-backdrop-filter:blur(${t}px)!important`;return`:is(${Xf}), :is(${Ot}){${o}}:is(${$f}){display:none!important}${Zf}{${n}}:is(${Ot}):has(${Yn}) ${Ii}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${Ot}) :is(${u.composerInput}){background-color:transparent!important}`}function ki(){for(let e of document.querySelectorAll(`[data-bloom="${ep}"]`))e.remove()}var Fl=f({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:Gl,styles:tp,start(){ki()},stop(){ki()},onSettingsChange(){ki()}});var op=1200,np=8e3,rp=150,ip=20,Yl=6,Oi="continue where you left",ap=/message delivery timed out|please try again/i,Kl=/waiting for the complete answer/i,Ql=p({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:Oi,placeholder:Oi}}),Bi=[],Qn=0,yo=!1,Ao=0,Dt="",Kn="",Ri=0,Ht=!1,vo=!1,Wn=!0,Rt="",Di=0,jn=!1,sp=()=>Ql.store.prompt.trim()||Oi;function Wl(){return(K(u.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function jl(){let e=Wl();return!e||Kl.test(e)||!ap.test(e)?"":e}function lp(){let e=Wl();return e&&Kl.test(e)?e:""}function cp(){let e=At()?.querySelectorAll(u.turn),t=e?.[e.length-1];return`${t?.getAttribute("data-turn-key")??""}:${t?.textContent?.length??0}`}function zl(e,t,o){if(o===Qn){if(R().generating||k()!==e||t>=ip){Ht=!1,R().generating||(Dt="");return}_o(),setTimeout(()=>zl(e,t+1,o),rp)}}function up(e){let t=Qn;if(R().generating||k()&&k()!==e){Ht=!1,Dt="";return}ie(e),jn=!0,Xt(()=>{t===Qn&&zl(e,0,t)})}function Vl(e){return e===Dt||Ao>=Yl||R().generating||k()?!1:(Dt=e,Ao+=1,Ht=!0,up(sp()),!0)}function dp(){if(yo||Ht||vo)return;let e=Date.now(),t=jl();if(t){if(Rt="",t!==Kn){Kn=t,Ri=e;return}if(e-Ri<op)return;Vl(`${b()??""}:${t}`);return}if(Kn="",!lp()){Wn=!0,Rt="";return}if(!Wn||!R().generating||k())return;let n=`${b()??""}:${cp()}`;if(n!==Rt){Rt=n,Di=e;return}if(e-Di<np||Ao>=Yl)return;let r=yt();r&&(vo=!0,r.click())}function Pi(){Qn+=1,yo=!1,Ao=0,Dt="",Kn="",Ri=0,Ht=!1,vo=!1,Wn=!0,Rt="",Di=0,jn=!1}var Jl=f({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:Ql,start(){Pi(),Bi=[w.on("rise",()=>{yo=!1,Dt="",Ht=!1,jn&&(jn=!1,Wn=!1,Rt="")}),w.on("fall",({outcome:e})=>{if(vo){vo=!1,e==="left"?yo=!0:Vl(`${b()??""}:stall`);return}(e==="stopped"||e==="left")&&(yo=!0),e==="done"&&!jl()&&(Ao=0)}),w.on("context",({migrated:e})=>{e||Pi()}),w.on("tick",dp)]},stop(){for(let e of Bi)e();Bi=[],Pi()}});var Ee=M("bloom-csi-"),mp=256,fp=160,zn=1,Zl=4,pp=.1,gp=.0015,hp=250;function bp(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function yp(e){return new Promise((t,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function Ap(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:se(t.x,n,1-n),y:se(t.y,r,1-r)}}function Xl(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function vp(e,t){let o=s("canvas");return o.width=o.height=mp,Xl(o,e,t),o.toDataURL("image/png")}function $l(e){let t=null,o={x:U.store.cropX,y:U.store.cropY,zoom:U.store.cropZoom},n,r=s("canvas",{class:Ee("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=fp*devicePixelRatio;let i=s("div",{class:`bloom-muted ${Ee("status")}`}),a=s("div",{class:Ee("zoom")}),c=s("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(y,q=!0){t&&(o=Ap(t,y),Xl(r,t,o),q&&(clearTimeout(n),n=setTimeout(()=>{t&&(U.store.cropX=o.x,U.store.cropY=o.y,U.store.cropZoom=o.zoom,U.store.avatarUrl=vp(t,o))},hp)))}function d(){a.replaceChildren(pn(o.zoom,zn,Zl,pp,"\xD7",y=>l({...o,zoom:y})))}async function m(y,q){i.textContent="";try{t=await yp(y),q&&(U.store.avatarSource=y,o={x:.5,y:.5,zoom:zn}),e.classList.add(Ee("has-image")),d(),l(o,q)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let A=y=>{y?.type.startsWith("image/")&&bp(y).then(q=>m(q,!0))};c.addEventListener("change",()=>A(c.files?.[0])),r.addEventListener("wheel",y=>{t&&(y.preventDefault(),l({...o,zoom:se(o.zoom*(1-y.deltaY*gp),zn,Zl)}),d())},{passive:!1}),r.addEventListener("pointerdown",y=>{if(!t)return;r.setPointerCapture(y.pointerId);let q={...o},te=r.getBoundingClientRect(),pt=Z=>{if(!t)return;let Y=Math.max(te.width/t.naturalWidth,te.height/t.naturalHeight)*o.zoom;l({...o,x:q.x-(Z.clientX-y.clientX)/(t.naturalWidth*Y),y:q.y-(Z.clientY-y.clientY)/(t.naturalHeight*Y)})};r.addEventListener("pointermove",pt),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",pt),{once:!0})});let F=s("div",{class:Ee("cropper"),attrs:{tabindex:"0"},on:{paste:y=>A([...y.clipboardData?.files??[]].find(q=>q.type.startsWith("image/"))),dragover:y=>y.preventDefault(),drop:y=>{y.preventDefault(),A(y.dataTransfer?.files[0])}}},s("div",{class:Ee("stage")},r),s("div",{class:Ee("controls")},ro("",y=>y.trim()&&void m(y.trim(),!0),"https://\u2026 or data:image/\u2026","url"),s("div",{class:Ee("buttons")},j("Choose file",()=>c.click()),j("Reset crop",()=>{l({x:.5,y:.5,zoom:zn}),d()}),j("Clear",()=>{t=null,e.classList.remove(Ee("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),a.replaceChildren(),U.store.avatarUrl="",U.store.avatarSource=""},"danger")),a,i,c));return e.append(F),U.store.avatarSource&&m(U.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var _l=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

[data-bloom-csi-avatar] {
    border-radius: 50% !important;
    background: var(--bloom-csi-url) center / cover no-repeat !important;
    color: transparent !important;
}

img[data-bloom-csi-avatar] {
    object-position: -99999px 0 !important;
}

[data-bloom-csi-avatar] > * {
    visibility: hidden !important;
}

[data-bloom-csi-sized] {
    flex: none !important;
    width: var(--bloom-csi-size) !important;
    min-width: var(--bloom-csi-size) !important;
    height: var(--bloom-csi-size) !important;
}

.bloom-csi-cropper {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    outline: none;
}

.bloom-csi-stage {
    flex: none;
    width: 10rem;
    height: 10rem;
    overflow: hidden;
    border: 1px dashed var(--bloom-border);
    border-radius: 50%;
    background: var(--bloom-hover);
}

.bloom-csi-canvas {
    display: block;
    width: 100%;
    height: 100%;
    cursor: grab;
    touch-action: none;
}

.bloom-csi-canvas:active {
    cursor: grabbing;
}

.bloom-csi-controls {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 12rem;
}

.bloom-csi-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
}

.bloom-csi-status {
    font-size: 0.75rem;
}
`;var qo="data-bloom-csi-avatar",Hi="data-bloom-csi-sized",nc="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",wp=32,U=p({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>$l(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),ec=[];function rc(e){e.removeAttribute(qo),e.removeAttribute(Hi)}function tc(e){return(U.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function oc(e=[]){if(!H(e))return;let t=U.store.displayName.trim()||null,o=!!U.store.avatarUrl,n=new Set(t?tc("name"):[]);for(let i of document.querySelectorAll(nc))n.has(i)||We(i,null);for(let i of n)We(i,t);let r=new Set(o?tc("avatar"):[]);for(let i of document.querySelectorAll(`[${qo}]`))r.has(i)||rc(i);for(let i of r)i.hasAttribute(qo)||i.setAttribute(qo,""),i.toggleAttribute(Hi,!i.closest('[role="menu"]'))}function xp(){let e=U.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${U.store.avatarSize}px}:is(${u.rail}, ${u.oldRail}) [${Hi}]{--bloom-csi-size:${wp}px}`:""}var ic=f({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:U,styles:()=>`${xp()}
${_l}`,start(){ec=[me(),E(oc)]},stop(){for(let e of ec)e();for(let e of document.querySelectorAll(`[${qo}]`))rc(e);for(let e of document.querySelectorAll(nc))We(e,null)},onSettingsChange(){oc()}});var Nt=M("bloom-greeting-"),ac=30,sc=100;function lc(e){let t=-1,o=s("textarea",{class:`bloom-input ${Nt("input")}`,attrs:{maxlength:String(sc),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=j("Add",i),r=s("div",{class:Nt("list")});function i(){let l=o.value.trim().slice(0,sc);if(!l)return;let d=[...I.store.greetings];t>=0?d[t]=l:d.length<ac&&d.push(l),I.store.greetings=d,t=-1,o.value="",a()}function a(){let{greetings:l}=I.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&l.length>=ac,r.replaceChildren(...l.length?l.map((d,m)=>s("div",{class:Nt("row",m===t?"row-editing":"row-idle")},s("div",{class:Nt("text"),text:d}),X("edit","Edit",()=>{t=m,o.value=d,o.focus(),a()}),X("trash","Delete",()=>{I.store.greetings=l.filter((A,F)=>F!==m),t===m&&(t=-1),a()}))):[s("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),e.append(s("div",{class:Nt("editor")},r,s("div",{class:Nt("form")},o,n))),a();let c=ht((l,d)=>l==="GreetingCustomizer"&&d==="greetings"&&a());return()=>{c(),e.replaceChildren()}}var cc=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

.bloom-greeting-editor {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.bloom-greeting-list {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.bloom-greeting-row {
    display: flex;
    align-items: flex-start;
    gap: 0.25rem;
    padding: 0.25rem 0.25rem 0.25rem 0.625rem;
    border-radius: 0.5rem;
    background: var(--bloom-hover);
}

.bloom-greeting-row-editing {
    outline: 1px solid var(--bloom-accent);
}

.bloom-greeting-text {
    flex: 1;
    padding-block: 0.25rem;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
}

.bloom-greeting-form {
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;
}

.bloom-greeting-input {
    flex: 1;
    resize: vertical;
}

[data-bloom-placeholder] {
    position: relative;
}

[data-bloom-placeholder]::before {
    position: absolute;
    top: 0;
    left: 0;
    max-width: 100%;
    overflow: hidden;
    color: var(--bloom-fg-3);
    content: attr(data-bloom-placeholder);
    pointer-events: none;
    text-overflow: ellipsis;
    white-space: nowrap;
}

[data-bloom-placeholder] [data-placeholder]::before {
    content: none !important;
}
`;var Zn="data-bloom-greeting",Ep=1e3,Tp=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],I=p({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>lc(e)},greetings:{type:"custom",default:Tp},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),Vn,uc=[],Ni,xo=()=>sn()&&!ue(),Cp=e=>e.replaceAll(/\s*\n\s*/g," ").trim(),mc=()=>I.store.greetings.filter(e=>typeof e=="string"&&e.trim());function So(){let e=mc();if(e.length)if(I.store.order==="random"&&e.length>1){let t=I.store.lastRandom;for(;t===I.store.lastRandom;)t=Math.floor(Math.random()*e.length);I.store.lastRandom=t,I.store.index=t}else I.store.index=(I.store.index+1)%e.length}function Mp(){return xo()?K(u.homeHeading):null}function Jn(){for(let e of document.querySelectorAll(`[${Zn}]`))e.removeAttribute(Zn),We(e,null)}function Xn(){for(let e of document.querySelectorAll("[data-bloom-placeholder]"))e.removeAttribute("data-bloom-placeholder")}function dc(e){let t=ve(),o=Cp(e);if(!t||!o||k(t)){Xn();return}t.getAttribute("data-bloom-placeholder")!==o&&t.setAttribute("data-bloom-placeholder",o)}function wo(){let e=mc(),t=us(),o=xo();if(!e.length||!t&&!o){Jn(),Xn();return}if(t){Jn(),dc(e[0]??"");return}let n=Mp();n?((I.store.index<0||I.store.index>=e.length)&&So(),n.setAttribute(Zn,""),We(n,e[Math.max(0,I.store.index)%e.length]??"")):Jn(),I.store.heroOnlyOutsideProject?Xn():dc(e[Math.max(0,I.store.index)%e.length]??"")}function Ui(){clearInterval(Vn),Vn=void 0,I.store.mode==="interval"&&xo()&&(Vn=setInterval(()=>{So(),wo()},I.store.intervalSec*Ep))}function Lp(e){I.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${Zn}]`)||getSelection()?.toString()||(So(),wo())}function kp(){xo()&&I.store.mode==="refresh"&&So(),Ui(),wo()}var fc=f({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:I,styles:cc,start(){Ni=new AbortController,document.addEventListener("click",Lp,{signal:Ni.signal}),xo()&&I.store.mode==="refresh"&&So(),Ui(),uc=[E(e=>H(e)&&wo()),de(kp)]},stop(){Ni?.abort();for(let e of uc)e();clearInterval(Vn),Jn(),Xn()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&Ui(),wo()}});var Eo=M("bloom-history-"),Gi=10,Ip=3e3;function pc(e){let t="",o=0,n=new Set,r=s("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),i=s("div",{class:Eo("list")}),a=s("div",{class:Eo("pager")}),c,l=j("Clear all",()=>{if(!c){l.textContent="Click again to clear",c=setTimeout(()=>{c=void 0,l.textContent="Clear all"},Ip);return}clearTimeout(c),c=void 0,l.textContent="Clear all",To([])},"danger");function d(){let A=[...rt.store.entries].toReversed(),F=t.trim().toLowerCase(),y=F?A.filter(Y=>Y.toLowerCase().includes(F)):A,q=Math.max(1,Math.ceil(y.length/Gi));o=Math.min(o,q-1);let te=y.slice(o*Gi,(o+1)*Gi).map(Y=>s("div",{class:Eo("row")},s("button",{class:Eo("text",n.has(Y)?"text-open":"text-closed"),text:Y,title:n.has(Y)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{n.delete(Y)||n.add(Y),d()}}}),X("copy","Copy",()=>void xa(Y)),X("trash","Delete",()=>To(rt.store.entries.filter(br=>br!==Y)))));i.replaceChildren(...te.length?te:[s("div",{class:"bloom-muted",text:F?"No matching prompts.":"No saved prompts yet."})]),a.replaceChildren(s("span",{class:"bloom-muted",text:`${y.length} ${F?"matching":"saved"} \xB7 page ${o+1} of ${q}`}),j("Previous",()=>{o--,d()}),j("Next",()=>{o++,d()}),l);let[pt,Z]=a.querySelectorAll("button");pt.disabled=o===0,Z.disabled=o>=q-1,l.disabled=!A.length}r.addEventListener("input",()=>{t=r.value,o=0,d()}),e.append(s("div",{class:Eo("manager")},r,i,a)),d();let m=ht((A,F)=>A==="InputHistory"&&F==="entries"&&d());return()=>{m(),clearTimeout(c),e.replaceChildren()}}var gc=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

.bloom-history-hud {
    position: fixed;
    z-index: 2147482000;
    padding: 0.125rem 0.625rem;
    border: 1px solid var(--bloom-border);
    border-radius: 9999px;
    background: var(--bloom-surface);
    box-shadow: var(--bloom-shadow);
    color: var(--bloom-fg-2);
    font-size: 0.75rem;
    font-variant-numeric: tabular-nums;
    pointer-events: none;
    transform: translate(-50%, calc(-100% - 0.5rem));
}

.bloom-history-manager {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.bloom-history-list {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.bloom-history-row {
    display: flex;
    align-items: flex-start;
    gap: 0.25rem;
    padding: 0.25rem 0.25rem 0.25rem 0.5rem;
    border-radius: 0.5rem;
    background: var(--bloom-hover);
}

.bloom-history-text {
    flex: 1;
    min-width: 0;
    padding-block: 0.25rem;
    text-align: start;
    overflow-wrap: anywhere;
}

.bloom-history-text-closed {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.bloom-history-text-open {
    white-space: pre-wrap;
}

.bloom-history-pager {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
}

.bloom-history-pager > span {
    flex: 1;
    font-size: 0.75rem;
}
`;var Pp=M("bloom-history-"),Op=2e3,rt=p({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>pc(e)},entries:{type:"custom",default:[]}}),oe=null,Fi={text:"",at:0},it=null,Yi,$n=()=>rt.store.entries.filter(e=>typeof e=="string");function To(e){rt.store.entries=e.slice(-rt.store.maxEntries)}function Ki(e){let t=e.trim();if(!t)return;let o=Date.now();t===Fi.text&&o-Fi.at<Op||(Fi={text:t,at:o},To([...$n().filter(n=>n!==t),t]))}function Rp(e,t){let o=ve();if(!o)return;it??=s("div",{class:`bloom-root ${Pp("hud")}`,attrs:{"data-bloom":"history-hud","aria-live":"polite"}}),it.textContent=`${e+1} / ${t}`;let n=(o.closest("form")??o).getBoundingClientRect();it.style.left=`${n.left+n.width/2}px`,it.style.top=`${n.top}px`,it.isConnected||document.body.append(it)}function Co(){oe=null,it?.remove()}function Dp(e){let t=$n();if(!oe)return;let o=t[e];oe.index=e,oe.shown=o,ie(o),Rp(t.length-1-e,t.length)}function Hp(e){let t=$n();if(!t.length)return!1;if(!oe){if(e===1)return!1;oe={index:t.length,draft:k(),shown:""}}let o=oe.index+e;return o<0?!0:o>=t.length?(ie(oe.draft),Co(),!0):(Dp(o),!0)}function hc(e){return Ve(e)?e:e instanceof HTMLElement?e.closest(u.composerInput):null}function Np(){if(ve()?.closest("[data-chatgpt-composer], [data-composer-input], form")?.querySelector('[aria-expanded="true"]'))return!0;for(let t of document.querySelectorAll('[role="listbox"], [role="menu"], [data-radix-popper-content-wrapper], [cmdk-root], [cmdk-list]')){if(!(t instanceof HTMLElement)||t.closest("[data-bloom]"))continue;let o=getComputedStyle(t);if(!(o.display==="none"||o.visibility==="hidden"))return!0}return!1}function Up(e){if(e.isComposing||e.key==="Process"||e.keyCode===229)return;let t=hc(e.target);if(!t)return;if(e.key==="Enter"&&!e.shiftKey){Ki(k(t)),Co();return}if(e.key==="Escape"&&oe){ie(oe.draft),Co(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey||Np())return;let o=Xa(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!oe||Hp(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function Gp(e){oe&&hc(e.target)&&k()!==oe.shown.trim()&&Co()}function Fp(e){e.target instanceof Element&&e.target.closest(u.sendButton)&&Ki(k())}var bc=f({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:rt,styles:gc,start(){Yi=new AbortController;let{signal:e}=Yi;document.addEventListener("keydown",Up,{capture:!0,signal:e}),document.addEventListener("input",Gp,{capture:!0,signal:e}),document.addEventListener("click",Fp,{capture:!0,signal:e}),document.addEventListener("submit",()=>Ki(k()),{capture:!0,signal:e})},stop(){Yi?.abort(),Co()},onSettingsChange(e){e==="maxEntries"&&To($n())}});var yc=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

.bloom-timestamp {
    display: block;
    margin-bottom: 0.25rem;
    color: var(--bloom-fg-3);
    font-size: 0.75rem;
    font-variant-numeric: tabular-nums;
    user-select: none;
}

.bloom-timestamp-user {
    text-align: end;
}

/* Assistant time is the first line of the reply, above "Worked for". */
.bloom-timestamp-assistant {
    margin-bottom: 0.15rem;
}
`;var Kp=1500,Qp=5e3,Wp=2e3,Sc=[{label:"UTC",value:"UTC"},{label:"\u7F8E\u56FD\u4E1C\u90E8",value:"America/New_York"},{label:"\u7F8E\u56FD\u4E2D\u90E8",value:"America/Chicago"},{label:"\u7F8E\u56FD\u5C71\u5730",value:"America/Denver"},{label:"\u7F8E\u56FD\u897F\u90E8",value:"America/Los_Angeles"},{label:"\u65E5\u672C",value:"Asia/Tokyo"},{label:"\u53F0\u6E7E",value:"Asia/Taipei"}],Ut=p({sourceTimeZone:{type:"select",description:"Zone the stored clock was written in. Leave UTC for ChatGPT create_time. Pick the same zone as the Shit GPT plugin only when that clock is a wall time in that zone; it is then shown in the system timezone.",options:Sc,default:"UTC"},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),er=new Map,Qi=new Set,Ec=0,tr,Ac=[];function Tc(e,t){er.get(e)!==t&&(er.set(e,t),clearTimeout(tr),tr=setTimeout(Cc,Wp))}function Cc(){let e={...Ut.store.stamps,...Object.fromEntries(er)};Ut.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,Kp))}function jp(e){let t=le(b())?.times;for(let o=e.length-1;o>=0;o--){let n=er.get(e[o])??t?.get(e[o])??Ut.store.stamps[e[o]];if(n)return n}return null}var zp=()=>R().generating||Date.now()-Ec<Qp;function Mc(){return Intl.DateTimeFormat().resolvedOptions().timeZone}function Lc(){let e=Ut.store.sourceTimeZone;if(!e||e==="UTC")return"UTC";try{return Intl.DateTimeFormat(void 0,{timeZone:e}),e}catch{return"UTC"}}function kc(e,t){let o={};for(let n of new Intl.DateTimeFormat("en-US",{timeZone:t,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(e)))o[n.type]=n.value;return{y:+o.year,m:+o.month,d:+o.day,h:+o.hour%24,mi:+o.minute,s:+o.second}}function Ic(e){return Date.UTC(e.y,e.m-1,e.d,e.h,e.mi,e.s)}function vc(e,t){let o=e;for(let n=0;n<4;n++){let r=e-Ic(kc(o,t));if(r===0)return o;o+=r}return o}function Vp(e,t){if(t==="UTC")return e;let o=(e%1e3+1e3)%1e3,n=e-o,r=new Date(n),i=Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),r.getUTCHours(),r.getUTCMinutes(),r.getUTCSeconds()),a=vc(i,t),c=3600*1e3,l=Number.POSITIVE_INFINITY;for(let d of[-c,0,c]){let m=a+d;Ic(kc(m,t))===i&&m<l&&(l=m)}return l!==Number.POSITIVE_INFINITY?l+o:vc(i+c,t)+o}function Jp(e,t){let o=Lc();return t||o==="UTC"?e:Vp(e,o)}function qc(e,t){return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(e)}function Zp(e){let t=Mc(),o=Date.now(),n={hour:"2-digit",minute:"2-digit",timeZone:t};if(qc(e,t)===qc(o,t))return new Intl.DateTimeFormat(void 0,n).format(e);let r=a=>new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric"}).format(a),i=r(e)===r(o)?{}:{year:"numeric"};return new Intl.DateTimeFormat(void 0,{...i,month:"short",day:"numeric",...n}).format(e)}function Xp(e,t){let o=new Date(t).toLocaleString(void 0,{timeZone:Mc()}),n=Lc();if(n==="UTC"||t===e)return o;let r=new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"UTC"}).format(e);return`${Sc.find(a=>a.value===n)?.label??n} ${r} \u2192 ${o}`}function Bc(e){let t=vt(e)??e.getAttribute("data-message-author-role")??e.closest(u.turn)?.getAttribute("data-turn")??e.querySelector(u.authorRole)?.getAttribute("data-message-author-role");if(Rr(t))return t;let o=eo(e).at(-1);return le(b())?.chain.find(n=>n.id===o)?.role??null}var wc='[class*="group/activity-header"]';function $p(e){let t=e.parentElement;if(!t)return null;let o=e.closest(u.turn);return o&&t!==o&&!o.contains(t)?null:t}function _p(e){let t=e;for(let o=0;o<8&&t;o++){let n=$p(t);if(!n)return null;let r=[...n.children],i=r.indexOf(t);for(let a=i-1;a>=0;a--){let c=r[a],l=c.matches(wc)?c:c.querySelector(wc);if(l)return l;if(c.matches(u.searchUnit)||c.querySelector(u.searchUnit))return null}if(n===t.closest(u.turn))return null;t=n}return null}function eg(e){let t=e.parentElement;for(let o=0;o<4&&t;o++){if(t.classList.contains("flex-col"))return t;t=t.parentElement}return e.parentElement??e}function Pc(e,t){if(t==="assistant"){let o=_p(e);if(o)return eg(o)}return e}function tg(e,t){let o=qt();for(let n=o.length-1;n>=0;n--){let r=o[n];if(!(r!==e&&(Bc(r)!=="assistant"||Pc(r,"assistant")!==t)))return r===e}return!0}function xc(e){return e.querySelector(':scope > time[data-bloom="timestamp"]')}function og(e){let t=eo(e);if(!t.length||!qe(e)||e.querySelector("time:not([data-bloom])"))return;let o=Bc(e),n=Pc(e,o);if(n!==e&&!tg(e,n)){xc(e)?.remove();return}let r=jp(t),i=!1;if(!r&&zp()){r=Date.now();let m=t.at(-1);Qi.add(m),Tc(m,r),i=!0}else r&&Qi.has(t.at(-1))&&(i=!0);let a=n.querySelector('time[data-bloom="timestamp"]')??xc(e);if(!r||Ut.store.hideOwnMessages&&o==="user"){a?.remove();return}let c=Jp(r,i),l=Zp(c);if(a?.textContent===l&&a.parentElement===n&&a===n.firstElementChild)return;let d=s("time",{class:`bloom-timestamp bloom-timestamp-${o??"assistant"}`,text:l,title:Xp(r,c),attrs:{"data-bloom":"timestamp",datetime:new Date(c).toISOString()}});a&&a.replaceWith(d),(d.parentElement!==n||d!==n.firstElementChild)&&n.prepend(d)}var _n=Ie(()=>{for(let e of qt())og(e)}),Oc=f({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:Ut,styles:yc,start(){Ac=[E(e=>H(e)&&_n()),W.on("conversation",_n),W.on("message-time",({messageId:e,time:t})=>{Qi.delete(e),Tc(e,t),_n()}),w.on("fall",()=>{Ec=Date.now()})]},stop(){for(let e of Ac)e();tr&&(clearTimeout(tr),Cc());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();_n()}}});var ng=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])','[data-chatgpt-composer] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-composer-input] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-codex-composer-root] button[aria-label^="Dictat" i], [data-composer-placement] button[aria-label^="Dictat" i], [class*="ComposerLayout"] button[aria-label^="Dictat" i]'],rg=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],Rc=p({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),Dc=f({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:Rc,styles:()=>ke([...ng,...Rc.store.hideDictationSettings?rg:[]])});var at="data-bloom-share",ig=/^\/g\/g-p-/,ag=/^(?:share|分享)$/i,sg=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],lg=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${at}="project"]`],Wi=p({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),or,ji=!1;function cg(e){if(!H(e))return;let t=ig.test(location.pathname)&&!b();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${at}]`))!t||!ag.test(h(o.textContent??""))?o.removeAttribute(at):o.hasAttribute(at)||o.setAttribute(at,"project")}var Hc=f({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:Wi,styles:()=>ke([...Wi.store.hideShareChat?sg:[],...Wi.store.hideShareProject?lg:[]]),start(){ji=!0,Je().then(()=>{ji&&!or&&(or=E(cg))})},stop(){ji=!1,or?.(),or=void 0;for(let e of document.querySelectorAll(`[${at}]`))e.removeAttribute(at)}});var Nc='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',ug='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',dg="[data-bloom-profile-plan]",Uc="visibility:hidden!important;user-select:none!important",Fc=p({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function mg(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=Fc.store,r=[];return e&&r.push(n?`:is(${Nc}){display:none!important}`:`:is(${Nc}){${Uc}}`),t&&r.push(`:is(${ug}){${Uc}}`),e&&o&&r.push(`${dg}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var Gc,Yc=f({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Fc,styles:mg,start(){Gc=me()},stop(){Gc?.()}});var fg="model-switcher-dropdown-button",zi="data-selected-reasoning-effort",nr="ArrowLeft",Kc=e=>e.startsWith("model-switcher-")&&e!==fg?e.slice(15):"",Mo=(e,t)=>e.id===t.id||!!e.label&&e.label===t.label;function Qc(){let e=Q();return(e&&K(u.modelTrigger,e))??K(u.modelTrigger)}function pe(){let e=Qc();if(!e)return null;let t=e.getAttribute("aria-expanded")==="true",o=e.getAttribute(zi),n=o&&t?"":h(e.innerText),r=o||Kc(e.getAttribute("data-testid")??"")||n;return r?{id:r,label:n||r}:null}function pg(e){return[...document.querySelectorAll(u.modelItem)].find(t=>{let o=Kc(t.getAttribute("data-testid")??""),n=h(t.textContent??"");return o===e.id||n===e.label||n===e.id})??null}function gg(e){let t=e.querySelector("[role=slider]"),o=Number(t?.getAttribute("aria-valuenow")),n=Number(t?.getAttribute("aria-valuemax"));o<=0?nr="ArrowRight":o>=n&&(nr="ArrowLeft"),e.focus(),e.dispatchEvent(new KeyboardEvent("keydown",{key:nr,code:nr,bubbles:!0,cancelable:!0}))}function Vi(e){let t=pe(),o=Qc();if(t&&Mo(t,e))return o?.hasAttribute(zi)&&o.getAttribute("aria-expanded")==="true"&&document.querySelector("[role=menu]")?.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),!0;if(o?.hasAttribute(zi)){let r=document.querySelector(u.effortSlider);return r?gg(r):o.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,button:0,pointerType:"mouse",isPrimary:!0})),!1}let n=pg(e);if(n){n.click();let r=pe();return!!r&&Mo(r,e)}return o?.getAttribute("aria-expanded")!=="true"&&o?.click(),!1}var Wc=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

.bloom-queue-tray {
    position: fixed;
    z-index: 50;
    display: flex;
    flex-direction: column;
    max-height: 40vh;
    padding: 0.375rem;
    border: 1px solid var(--bloom-border);
    border-radius: 1.25rem;
    background: var(--bloom-surface);
    box-shadow: var(--bloom-shadow);
    contain: content;
}

.bloom-queue-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-inline: 0.5rem;
}

.bloom-queue-toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    min-height: 1.75rem;
    color: var(--bloom-fg-2);
    font-size: 0.8125rem;
    font-weight: 500;
}

.bloom-queue-toggle .bloom-icon {
    transition: transform 0.15s ease;
}

.bloom-queue-collapsed .bloom-queue-toggle .bloom-icon {
    transform: rotate(-90deg);
}

.bloom-queue-tip {
    margin-inline-start: auto;
    color: var(--bloom-fg-3);
    font-size: 0.75rem;
}

.bloom-queue-list {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    overflow-y: auto;
    list-style: none;
}

.bloom-queue-collapsed .bloom-queue-list {
    display: none;
}

.bloom-queue-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.375rem 0.375rem 0.375rem 0.75rem;
    border-radius: 0.875rem;
    cursor: grab;
    user-select: none;
}

.bloom-queue-row:hover {
    background: var(--bloom-hover);
}

.bloom-queue-dragging {
    position: relative;
    z-index: 1;
    background: var(--bloom-surface-2);
    box-shadow: var(--bloom-shadow);
    cursor: grabbing;
}

.bloom-queue-text {
    display: -webkit-box;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    white-space: pre-wrap;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow-wrap: anywhere;
}

.bloom-queue-editor {
    flex: 1;
    min-height: 3.5rem;
    resize: vertical;
}

.bloom-queue-model {
    flex: none;
    max-width: 8rem;
    padding: 0.125rem 0.5rem;
    overflow: hidden;
    border-radius: 999px;
    background: var(--bloom-hover);
    color: var(--bloom-fg-2);
    font-size: 0.75rem;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.bloom-queue-actions {
    display: flex;
    flex: none;
}
`;var G=M("bloom-queue-"),bg=6,yg=8,_=null,Lo="",Gt=!1,Ft=!1;function Ji(e,t,o){let n=X(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute(we),n.addEventListener("mouseenter",()=>jc(t)),n.addEventListener("mouseleave",()=>jc("")),n}function jc(e){let t=_?.querySelector(`.${G("tip")}`);t&&(t.textContent=e)}function Ag(e,t,o,n){Ft=!0;let r=s("textarea",{class:`bloom-input ${G("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=new AbortController,a=c=>{i.abort(),Ft=!1,Lo="",c?n.edit(t,r.value):r.replaceWith(s("div",{class:G("text"),text:o}))};addEventListener("keydown",c=>{if(!(c.target!==r||c.isComposing)){if(c.key==="Enter"&&!c.shiftKey)a(!0);else if(c.key==="Escape")a(!1);else return;c.preventDefault(),c.stopImmediatePropagation()}},{capture:!0,signal:i.signal}),r.addEventListener("keydown",c=>c.stopPropagation(),{signal:i.signal}),r.addEventListener("blur",()=>a(!0),{signal:i.signal}),e.querySelector(`.${G("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function vg(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,a=l=>{!i&&Math.abs(l.clientY-n.clientY)<bg||(i||(i=Ft=!0,e.classList.add(G("dragging"))),e.style.transform=`translateY(${l.clientY-n.clientY}px)`)},c=l=>{if(removeEventListener("pointermove",a),!i)return;Ft=!1,Lo="";let m=[...r.children].filter(A=>A!==e).filter(A=>A.getBoundingClientRect().top+A.getBoundingClientRect().height/2<l.clientY).length;o.move(t,m)};addEventListener("pointermove",a),addEventListener("pointerup",c,{once:!0})})}function qg(e,t,o,n){let r=s("li",{class:G("row")},s("div",{class:G("text"),text:e.text}),n&&e.label?s("span",{class:G("model"),title:e.label,text:e.label}):null,s("div",{class:G("actions")},Ji("trash","Remove from queue",()=>o.remove(t)),Ji("edit","Edit",()=>Ag(r,t,e.text,o)),Ji("send","Send now",()=>o.sendNow(t))));return vg(r,t,o),r}function wg(e){if(!_)return;let t=e.getBoundingClientRect();_.style.left=`${t.left}px`,_.style.width=`${t.width}px`,_.style.bottom=`${innerHeight-t.top+yg}px`}function Zi(){_?.remove(),_=null,Lo="",Ft=!1}function st(e,t,o=!0){let n=Q();if(!e.length||!Qe(n)){Zi();return}_||(_=s("div",{class:`bloom-root ${G("tray")}`,attrs:{"data-bloom":"queue"}},s("div",{class:G("header")},s("button",{class:G("toggle"),attrs:{type:"button","aria-expanded":String(!Gt)},on:{click:a=>{Gt=!Gt,_?.classList.toggle(G("collapsed"),Gt),a.currentTarget.setAttribute("aria-expanded",String(!Gt))}}},s("span",{class:G("count")}),N("chevron")),s("span",{class:G("tip")})),s("ol",{class:G("list")})),_.classList.toggle(G("collapsed"),Gt),document.body.append(_)),wg(n);let r=JSON.stringify([o,...e.map(a=>[a.text,o?a.label:""])]);if(Ft||r===Lo)return;Lo=r;let i=_.querySelector(`.${G("count")}`);i&&(i.textContent=Uo(e.length,"Queued message")),_.querySelector(`.${G("list")}`)?.replaceChildren(...e.map((a,c)=>qg(a,c,t,o)))}var sr=new S("PromptQueue"),xg=8,Io=150,rr=20,Sg=300,ge="BloomPromptQueue",$i="BloomPromptQueueClaim",zc="BloomPromptQueueTab",Eg=4e3,J=p({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1},showQueueMode:{type:"boolean",description:"Show the model that was selected when each message was queued.",default:!0},stickyOnNavigate:{type:"boolean",description:"Keep the selected model when switching chats.",default:!0},persistAcrossRefresh:{type:"boolean",description:"Restore unsent queued messages in this browser after a refresh. Other tabs show the same queue; only one of them sends it.",default:!0}}),he=new Map,ko=!1,lt=null,Yt,Vc=[],Ne=null,ut=!1,Bo,ir="draft",Po=()=>b()??ir,ee=()=>he.get(Po())??[],_i=e=>({id:e.model||e.label,label:e.label||e.model});function Tg(e){return typeof e=="string"?e.trim()?{text:e,model:"",label:""}:null:!P(e)||typeof e.text!="string"||!e.text.trim()?null:{text:e.text,model:typeof e.model=="string"?e.model:"",label:typeof e.label=="string"?e.label:""}}function ea(){let e=sessionStorage.getItem(zc);if(e)return e;let t=globalThis.crypto?.randomUUID?.()??`${Date.now()}-${Math.random()}`;return sessionStorage.setItem(zc,t),t}function Xc(){let e=Me(localStorage.getItem($i)??"");return!P(e)||typeof e.tab!="string"||typeof e.at!="number"||typeof e.key!="string"?null:{tab:e.tab,at:e.at,key:e.key}}function $c(){let e={tab:ea(),at:Date.now(),key:Po()};try{localStorage.setItem($i,JSON.stringify(e))}catch(t){sr.warn("Could not claim the queue",t)}}function Cg(){let e=Xc();if(e?.tab===ea())try{localStorage.setItem($i,JSON.stringify({...e,at:Date.now()}))}catch(t){sr.warn("Could not refresh the queue claim",t)}}function Mg(){let e=Xc();return!e||e.tab===ea()||e.key!==Po()?!0:Date.now()-e.at<=Eg?!1:($c(),!0)}function Lg(){return Object.fromEntries([...he].filter(([e])=>e!==ir))}function Xi(e){let t=typeof e=="string"?Me(e):e;if(!P(t))return!1;let o=!1;for(let[n,r]of Object.entries(t)){if(!Array.isArray(r))continue;let i=r.map(Tg).filter(a=>a!=null);i.length&&(he.set(n,i),o=!0)}return o}function kg(){if(!J.store.persistAcrossRefresh){sessionStorage.removeItem(ge),Ar(ge);return}Xi(sessionStorage.getItem(ge))||Xi(Qo(ge))&&ar()}function ar(){try{if(!J.store.persistAcrossRefresh){sessionStorage.removeItem(ge),Ar(ge);return}let e=Lg();sessionStorage.setItem(ge,JSON.stringify(e)),Wo(ge,e)}catch(e){sr.warn("Could not save the queue",e)}}function Ig(e){if(!(e.key!==ge||!J.store.persistAcrossRefresh||e.newValue==null)){he.clear(),Xi(e.newValue);try{sessionStorage.setItem(ge,e.newValue)}catch(t){sr.warn("Could not mirror the queue",t)}st(ee(),Kt,J.store.showQueueMode)}}function ct(e){e.length?he.set(Po(),e):he.delete(Po()),$c(),ar(),st(ee(),Kt,J.store.showQueueMode)}function Bg(e){if(!e.model&&!e.label)return!0;let t=pe();return t?Mo(t,_i(e)):!0}function _c(e,t=0){t>=rr||R().generating||k()!==e||(_o(),setTimeout(()=>_c(e,t+1),Io))}function Pg(e,t){let o=e??Ne;if(!o||!t.model&&!t.label||Mo(o,_i(t))){ut=!1;return}J.store.stickyOnNavigate&&(Ne=o),clearTimeout(Bo),Bo=setTimeout(()=>tu(o),Io)}function Oo(e,t=0,o=pe()){if(R().generating||k()){t<rr&&setTimeout(()=>Oo(e,t+1,o),Io);return}if(!Bg(e)&&t<rr){ut=!0,Vi(_i(e)),setTimeout(()=>Oo(e,t+1,o),Io);return}ie(e.text),Xt(()=>_c(e.text)),Pg(o,e)}function Jc(){if(lt!=null){let o=lt;lt=null,Oo(o);return}if(!ko||R().generating||k())return;if(!Mg()){ko=!1;return}let[e,...t]=ee();e!=null&&(ko=!1,ct(t),Oo(e))}function eu(e){let t=ee(),o=t[e];if(o!=null){if(ct(t.filter((n,r)=>r!==e)),!R().generating){Oo(o);return}lt=o,yt()?.click()}}var Kt={remove:e=>ct(ee().filter((t,o)=>o!==e)),edit:(e,t)=>ct(t.trim()?ee().map((o,n)=>n===e?{...o,text:t}:o):ee().filter((o,n)=>n!==e)),sendNow:eu,move(e,t){let o=[...ee()],[n]=o.splice(e,1);n&&(o.splice(t,0,n),ct(o))}};function Og(e){let t=pe(),o={text:e,model:t?.id??"",label:t?.label??""},n=ee();return J.store.replacePending&&n.length?(ct([...n.slice(0,-1),o]),!0):n.length>=xg?!1:(ct([...n,o]),!0)}function Rg(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!Ve(e.target)||!R().generating)return;let t=k(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;let o=pe();ie(""),lt={text:t,model:o?.id??"",label:o?.label??""},yt()?.click();return}if(!t){ee().length&&eu(0);return}Og(t)&&ie("")}function Dg(){if(ut||!J.store.stickyOnNavigate)return;let e=pe();e&&(Ne=e)}function tu(e){ut=!0;let t=0,o=()=>{if(Vi(e)||t>=rr){ut=!1;return}t++,Bo=setTimeout(o,Io)};clearTimeout(Bo),o()}function Hg(){J.store.stickyOnNavigate&&Ne&&tu(Ne)}function Zc(e){let{target:t}=e;!(t instanceof Element)||ut||t.closest(`${u.modelTrigger}, ${u.modelItem}`)&&setTimeout(Dg,Sg)}var ou=f({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:J,styles:Wc,start(){Yt=new AbortController,kg(),Ne=pe(),document.addEventListener("keydown",Rg,{capture:!0,signal:Yt.signal}),document.addEventListener("pointerup",Zc,{signal:Yt.signal}),document.addEventListener("keyup",Zc,{signal:Yt.signal}),Vc=[w.on("fall",({outcome:e})=>{ko=e==="done",e==="left"&&(lt=null),Jc()}),w.on("context",({prevId:e,id:t,migrated:o})=>{let n=he.get(ir);he.delete(ir),o&&!e&&t&&n&&he.set(t,n),o||(ko=!1,Hg()),ar(),st(ee(),Kt,J.store.showQueueMode)}),w.on("tick",()=>{Cg(),Jc(),st(ee(),Kt,J.store.showQueueMode)})],addEventListener("storage",Ig,{signal:Yt.signal}),st(ee(),Kt,J.store.showQueueMode)},stop(){Yt?.abort(),clearTimeout(Bo);for(let e of Vc)e();Zi(),he.clear(),lt=null,Ne=null,ut=!1},onSettingsChange(e){e==="persistAcrossRefresh"&&ar(),e==="stickyOnNavigate"&&J.store.stickyOnNavigate&&(Ne=pe()),st(ee(),Kt,J.store.showQueueMode)}});var Ng=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function Ug(){let e=h(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!Ng.has(e.toLowerCase())?e:null}function Ro(e){return e?le(e)?.title??Ds(e)??(e===b()?Ug():null):null}var nu=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

.bloom-recent-backdrop {
    position: fixed;
    inset: 0;
    z-index: 2147482500;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 15vh 1rem 1rem;
    contain: content;
}

.bloom-recent-panel {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    width: min(32rem, 100%);
    padding: 0.5rem;
    border: 1px solid var(--bloom-border);
    border-radius: 1rem;
    background: var(--bloom-surface);
    box-shadow: var(--bloom-shadow);
    animation: bloom-fade-in 0.12s ease-out;
}

.bloom-recent-item {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    width: 100%;
    padding: 0.5rem 0.75rem;
    border-radius: 0.625rem;
    text-align: start;
}

.bloom-recent-item[aria-selected="true"] {
    background: var(--bloom-hover);
}

.bloom-recent-head {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    min-width: 0;
}

.bloom-recent-title {
    flex: 1;
    min-width: 0;
    font-weight: 500;
}

.bloom-recent-project {
    flex: none;
    max-width: 40%;
    overflow: hidden;
    color: var(--bloom-fg-3);
    font-size: 0.75rem;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.bloom-recent-preview {
    color: var(--bloom-fg-2);
    font-size: 0.8125rem;
}
`;var Te=M("bloom-recent-"),Ce="home",Fg=50,ru=140,Yg=new Set(["Backquote"]),Kg=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),x=p({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),Ue=null,be=[],ye=0,ta,iu=[],ur=()=>ue()?null:b()??(sn()?Ce:null);function au(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function lu(e){let t=Ro(e);t&&x.store.titles[e]!==t&&(x.store.titles={...x.store.titles,[e]:t});let o=Hs(location.href);o&&e===b()&&x.store.projects[e]!==o&&(x.store.projects={...x.store.projects,[e]:o})}function su(e){if(!e)return;let t=[e,...x.store.visits.filter(n=>n!==e)].slice(0,Fg),o=new Set(t);x.store.visits=t,Object.keys(x.store.previews).some(n=>!o.has(n))&&(x.store.previews=au(x.store.previews,o)),Object.keys(x.store.titles).some(n=>!o.has(n))&&(x.store.titles=au(x.store.titles,o)),e!==Ce&&lu(e)}function lr(e){if(!e||!x.store.visits.includes(e))return;let t={},o=le(e)?.chain??[];for(let r of o)t[r.role]=ce(cn(r),ru);if(e===b())for(let r of Pe()){let i=wt(r);i&&(t[r.role]=ce(i,ru))}let n=x.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(x.store.previews={...x.store.previews,[e]:t})}function Qg(){let e=Number(x.store.maxRecent);return x.store.visits.filter(t=>t!==Ce||x.store.includeHome).slice(0,e)}function oa(e){if(Do(),e===ur())return;let t=e===Ce?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"], [data-sidebar-destination="builtin:home"]'):io(e)[0];t?t.click():location.assign(e===Ce?"/":`/c/${e}`)}function Wg(e,t){let o=e===Ce?"New chat":x.store.titles[e]??Ro(e)??"Untitled chat",n=e===Ce?null:x.store.projects[e],r=e===Ce?null:x.store.previews[e];return s("button",{class:Te("item"),attrs:{type:"button",role:"option","aria-selected":String(t===ye)},on:{click:()=>oa(e),mousemove:()=>t!==ye&&cr(t)}},s("div",{class:Te("head")},s("span",{class:`${Te("title")} bloom-truncate`,text:o}),n&&s("span",{class:Te("project"),text:n})),r?.user&&s("div",{class:`${Te("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&s("div",{class:`${Te("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function cr(e){ye=(e+be.length)%be.length,Ue?.querySelectorAll(`.${Te("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===ye)))}function jg(){lr(b());let e=ur();be=Qg(),e&&(be=[e,...be.filter(t=>t!==e)].slice(0,Number(x.store.maxRecent))),be.length&&(ye=be.length>1?1:0,Ue=s("div",{class:`bloom-root ${Te("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:t=>t.target===t.currentTarget&&Do()}},s("div",{class:Te("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...be.map(Wg))),document.body.append(Ue))}function Do(){Ue?.remove(),Ue=null}var zg=e=>Yg.has(e.code)||Kg.has(e.key);function Vg(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&zg(e)){e.preventDefault(),e.stopPropagation(),Ue?cr(ye+(e.shiftKey?-1:1)):jg();return}if(!Ue)return;let o={Escape:Do,Enter:()=>oa(be[ye]),ArrowDown:()=>cr(ye+1),ArrowUp:()=>cr(ye-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function Jg(e){Ue&&e.key==="Control"&&oa(be[ye])}var cu=f({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:x,styles:nu,start(){ta=new AbortController;let{signal:e}=ta;addEventListener("keydown",Vg,{capture:!0,signal:e}),addEventListener("keyup",Jg,{capture:!0,signal:e}),addEventListener("blur",Do,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&lr(b()),{signal:e}),iu=[de(({prevId:i})=>{lr(i),su(ur())}),W.on("conversation",({id:i})=>{x.store.visits.includes(i)&&lu(i),lr(i)})];let{visits:t,titles:o,previews:n}=x.store,r=t.filter(i=>i!==Ce&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(x.store.visits=t.filter(i=>!r.includes(i))),su(ur())},stop(){ta?.abort();for(let e of iu)e();Do()}});var na="data:audio/mpeg;base64,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";var uu=new S("ResponseNotification"),Zg=.5,Xg=200,$g=300,Ho=p({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:e=>(e.append(j("Preview",pu)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),du=null,ra=new Map,mu,ia;function _g(e){return new Promise((t,o)=>GM_xmlhttpRequest({url:e,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=Xg&&n<$g?t(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var eh=e=>Uint8Array.from(atob(e.slice(e.indexOf(",")+1)),t=>t.charCodeAt(0)).buffer;function th(e,t){let o=ra.get(t);return o||(o=(t.startsWith("data:")?Promise.resolve(eh(t)):_g(t)).then(n=>e.decodeAudioData(n)),o.catch(()=>ra.delete(t)),ra.set(t,o)),o}async function fu(e){du??=new AudioContext;let t=du;t.state==="suspended"&&t.resume();let o=t.createBufferSource(),n=t.createGain();o.buffer=await th(t,e),n.gain.value=Zg,o.connect(n).connect(t.destination),o.start()}function pu(){let e=Ho.store.soundUrl.trim();fu(e||na).catch(t=>{uu.warn("Sound failed",t),e&&fu(na).catch(o=>uu.warn("Default chime failed",o))})}function oh(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function nh(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(ia=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:ia.signal}))}var gu=f({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:Ho,start(){nh(),mu=w.on("fall",({conversationId:e,outcome:t})=>{t==="done"&&(Ho.store.onlyWhenHidden&&!document.hidden||(Ho.store.sound&&pu(),Ho.store.browserNotification&&oh(Ro(e))))})},stop(){mu?.(),ia?.abort()}});var rh=`:is(${u.sidebarScroll}, :has(> ${u.sidebarScroll})) + :has(${u.menuButton})`,ih=`${u.rail} > :has(${u.menuButton})`,sa=`:is(${rh}, ${ih}, ${u.oldProfile}):not(:hover)`,aa="[data-bloom-profile-avatar]",ah=`:is(${sa}, ${sa} :has(${aa})) > :not(${aa}, :has(${aa}))`,bu=p({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function sh(){let{opacity:e,fadeAvatar:t}=bu.store;return e>=100?"":`${t?sa:ah}{opacity:${e/100}!important}`}var hu,yu=f({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:bu,styles:sh,start(){hu=me()},stop(){hu?.()}});var Au=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

button.bloom-star-chats-star,
button.bloom-star-chats-toggle,
button.bloom-star-chats-jump,
button.bloom-star-chats-unstar {
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    cursor: pointer;
}

button.bloom-star-chats-star,
button.bloom-star-chats-toggle {
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 0.375rem;
    color: var(--bloom-fg-3);
}

button.bloom-star-chats-star[aria-pressed="true"],
button.bloom-star-chats-toggle.bloom-star-chats-here,
button.bloom-star-chats-unstar {
    color: #ff7a17;
}

button.bloom-star-chats-star[aria-pressed="true"] .bloom-icon,
button.bloom-star-chats-toggle.bloom-star-chats-here .bloom-icon,
button.bloom-star-chats-unstar .bloom-icon {
    fill: currentcolor;
    stroke: none;
}

button.bloom-star-chats-star .bloom-icon,
button.bloom-star-chats-toggle .bloom-icon,
button.bloom-star-chats-unstar .bloom-icon {
    width: 1rem;
    height: 1rem;
}

button.bloom-star-chats-star:hover,
button.bloom-star-chats-toggle:hover,
button.bloom-star-chats-unstar:hover,
button.bloom-star-chats-jump:hover {
    background: var(--bloom-hover);
}

.bloom-star-chats-panel {
    position: fixed;
    z-index: 80;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: min(18rem, 70vw);
    max-height: min(24rem, 70vh);
    padding: 0.375rem;
    border: 1px solid var(--bloom-border);
    border-radius: 0.75rem;
    background: var(--bloom-surface);
    color: var(--bloom-fg);
    box-shadow: var(--bloom-shadow);
}

.bloom-star-chats-bridge {
    position: absolute;
    inset-inline: 0;
    height: 0.5rem;
}

.bloom-star-chats-panel[data-place="below"] .bloom-star-chats-bridge {
    bottom: 100%;
}

.bloom-star-chats-panel[data-place="above"] .bloom-star-chats-bridge {
    top: 100%;
}

.bloom-star-chats-body {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    overflow: auto;
}

.bloom-star-chats-head,
.bloom-star-chats-empty {
    padding: 0.3rem 0.5rem;
    color: var(--bloom-fg-3);
    font-size: 0.75rem;
}

.bloom-star-chats-row {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    border-radius: 0.5rem;
}

.bloom-star-chats-row:hover {
    background: var(--bloom-hover);
}

button.bloom-star-chats-jump {
    display: flex;
    flex: 1;
    align-items: center;
    gap: 0.375rem;
    min-width: 0;
    padding: 0.3rem 0.25rem 0.3rem 0.5rem;
    text-align: start;
}

.bloom-star-chats-role {
    flex: none;
    color: var(--bloom-fg-3);
    font-size: 0.6875rem;
}

.bloom-star-chats-snip {
    overflow: hidden;
    min-width: 0;
    font-size: 0.8125rem;
    text-overflow: ellipsis;
    white-space: nowrap;
}

button.bloom-star-chats-unstar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    margin-inline-end: 0.15rem;
    border-radius: 0.375rem;
}

.bloom-star-chats-flash {
    outline: 2px solid #ff7a17;
    outline-offset: 2px;
}

[data-bloom="navigator"] .bloom-nav-tick.bloom-star-chats-mark {
    background: #ff7a17;
}

[data-bloom="navigator"] .bloom-nav-row.bloom-star-chats-mark::after {
    content: "";
    flex: none;
    width: 0.4rem;
    height: 0.4rem;
    margin-inline-start: auto;
    border-radius: 999px;
    background: #ff7a17;
}
`;var D=M("bloom-star-chats"),ch=80,uh=60,dh=1200,mh=120,No=p({replaceReadAloud:{type:"boolean",description:"Put the star where the reply's Read aloud button is, and hide that button.",default:!0},messages:{type:"custom",default:[]}}),fh=`:is(${u.turnActions}) ${u.readAloud}`,la,ca=!1,Ge=!1,mt=!1,dr=0,z=null,mr="",B=null,ua,Fe;function ma(){let e=No.store.messages;return Array.isArray(e)?e.filter(t=>P(t)&&typeof t.conversationId=="string"&&typeof t.messageId=="string"&&(t.role==="user"||t.role==="assistant")&&typeof t.snippet=="string"&&typeof t.starredAt=="number"):[]}function fa(){let e=b();return e?ma().filter(t=>t.conversationId===e):[]}function ph(e,t){return ma().some(o=>o.conversationId===e&&o.messageId===t)}function vu(e){let t=ma(),o=t.some(n=>n.conversationId===e.conversationId&&n.messageId===e.messageId);No.store.messages=o?t.filter(n=>!(n.conversationId===e.conversationId&&n.messageId===e.messageId)):[{...e,starredAt:Date.now()},...t].slice(0,ch)}function da(e){return e.messageIds[0]||e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.el.getAttribute("data-turn-key")||""}function gh(e){return ce(wt(e)||h(e.el.textContent??""),uh)}function hh(e){let t=e.closest(u.turn);if(!t)return null;let o=Pe().filter(n=>t.contains(n.el));return o.find(n=>n.el.contains(e)||n.el===t)??o.findLast(n=>n.el.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING)??null}function bh(){let e=[...document.querySelectorAll(u.turnActions)].filter(t=>!t.closest(`[data-bloom], [role="dialog"], [inert], pre, ${u.sidebars}`));return e.filter(t=>!e.some(o=>o!==t&&o.contains(t)))}function yh(e,t){let o=No.store.replaceReadAloud?t.querySelector(u.readAloud):null;if(o&&!o.closest("[data-bloom]")){e.nextElementSibling!==o&&o.before(e);return}let n=Ah(t);(e.parentElement!==n||n.lastElementChild!==e)&&n.append(e)}function Ah(e){let t=[...e.querySelectorAll("button")].filter(n=>n.dataset.bloom!=="message-star"&&!n.closest("[data-bloom]"));return t.length?[...e.children].find(n=>n instanceof HTMLElement&&n!==t[0]&&t.every(r=>n.contains(r)))??e:e}function vh(){return[...document.querySelectorAll(u.headerMore)].filter(t=>{if(t.dataset.bloom==="message-star"||t.closest("[data-bloom], [role='dialog'], [inert]")||t.closest(u.sidebars))return!1;let o=t.getBoundingClientRect();return o.width===0&&o.height===0?!!t.closest("header, #page-header"):o.top>=0&&o.top<96&&o.left>window.innerWidth*.5}).toSorted((t,o)=>o.getBoundingClientRect().left-t.getBoundingClientRect().left||(t.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1))[0]??null}function qu(e,t,o){return s("button",{class:t,attrs:{type:"button","aria-label":e},on:{pointerdown:n=>n.stopPropagation(),mousedown:n=>n.stopPropagation(),click:n=>{n.preventDefault(),n.stopPropagation(),o(n)}}},N("star"))}function qh(e,t){e.setAttribute("aria-pressed",String(t)),e.setAttribute("aria-label",t?"Unstar":"Star")}function fr(){return Ge||mt}function Qt(){dr&&window.clearTimeout(dr),dr=0}function Wt(){Ge=!1,mt=!1,Qt(),Fe?.enter(),z?.remove(),z=null,mr="",B?.classList.remove(D("-open")),B?.setAttribute("aria-expanded","false")}function pr(e){return e instanceof Node&&!!(B?.contains(e)||z?.contains(e))}function wh(e){e.classList.add(D("-flash")),window.setTimeout(()=>e.classList.remove(D("-flash")),dh)}function xh(e){let t=Pe().find(n=>da(n)===e),o=t?.el.closest(u.turn)??t?.el;o&&(o.scrollIntoView({block:"start"}),wh(o))}function Sh(){let e=b(),t=new Set,o=[...document.querySelectorAll('[data-bloom="message-star"][data-place="action"]')];if(!e||ue()){for(let n of o)n.remove();return}for(let n of bh()){if(!qe(n))continue;let r=hh(n),i=r?da(r):"";if(!r||!i)continue;let a=n.querySelector('[data-place="action"]');(!a||a.dataset.id!==i)&&(a?.remove(),a=qu("Star",D("-star"),()=>{let c=b(),l=Pe().find(d=>da(d)===i);!c||!l||vu({conversationId:c,messageId:i,role:l.role,snippet:gh(l)})}),a.dataset.bloom="message-star",a.dataset.place="action",a.dataset.id=i),qh(a,ph(e,i)),yh(a,n),t.add(a)}for(let n of o)t.has(n)||n.remove()}function Eh(){if(!z||!B)return;let e=B.getBoundingClientRect(),t=z.offsetWidth||288,o=z.offsetHeight||120,n=e.bottom+6;n+o>window.innerHeight-8&&(n=Math.max(8,e.top-o-6));let r=Math.max(8,Math.min(e.right-t,window.innerWidth-t-8));z.dataset.place=n>=e.bottom?"below":"above",z.style.left=`${Math.round(r)}px`,z.style.top=`${Math.round(n)}px`}function Th(){if(!fr()||!B){z?.remove(),z=null,mr="",B?.classList.remove(D("-open")),B?.setAttribute("aria-expanded","false");return}let e=fa(),t=e.map(o=>`${o.messageId}	${o.snippet}`).join(`
`);if(!z||mr!==t){z?.remove();let o=e.map(n=>s("div",{class:D("-row")},s("button",{class:D("-jump"),attrs:{type:"button"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),Wt(),xh(n.messageId)}}},s("span",{class:D("-role"),text:n.role==="user"?"You":"ChatGPT"}),s("span",{class:D("-snip"),text:n.snippet||"Message"})),qu("Unstar",D("-unstar"),()=>vu(n))));z=s("div",{class:`bloom-root ${D("-panel")}`,attrs:{"data-bloom":"star-list"},on:{pointerenter:()=>{Qt(),Fe?.enter(),mt=!0},pointerleave:n=>{pr(n.relatedTarget)||Ge||Fe?.leave(n)}}},s("div",{class:D("-bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:D("-head"),text:"Starred"}),s("div",{class:D("-body")},...o.length?o:[s("div",{class:D("-empty"),text:"No starred messages in this chat"})])),document.body.append(z),mr=t}Eh(),B.classList.add(D("-open")),B.setAttribute("aria-expanded","true")}function Ch(){for(let r of document.querySelectorAll('[data-bloom="starred"]'))r.remove();let e=vh(),t=e?.parentElement??null,o=b();if(!e||!t||t.closest(u.sidebars)||!o||ue()||!qe(t)){B?.remove(),B=null,Wt();return}B||(B=s("button",{class:D("-toggle"),attrs:{type:"button","data-bloom":"message-star","data-place":"header","aria-label":"Starred messages","aria-expanded":"false"},on:{pointerdown:r=>r.stopPropagation(),pointerenter:()=>{Qt(),Fe?.enter(),dr=window.setTimeout(()=>{mt=!0,dt()},mh)},pointerleave:r=>{pr(r.relatedTarget)||(Qt(),fr()&&Fe?.leave(r))},click:r=>{r.preventDefault(),r.stopPropagation(),Ge=!Ge,mt=Ge,Qt(),Ge||Wt(),dt()}}},N("star"))),(B.parentElement!==t||B.nextElementSibling!==e)&&e.before(B);let n=e.getBoundingClientRect();n.width>0&&(B.style.width=`${n.width}px`,B.style.height=`${n.height}px`),B.classList.toggle(D("-here"),fa().length>0),Th()}function Mh(){let e=new Set(fa().map(t=>t.messageId));for(let t of document.querySelectorAll('[data-bloom="navigator"] .bloom-nav-tick, [data-bloom="navigator"] .bloom-nav-row'))t.classList.toggle(D("-mark"),!!t.dataset.messageId&&e.has(t.dataset.messageId))}function dt(){if(!ca){ca=!0;try{for(let e of document.querySelectorAll('[data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();Sh(),Ch(),Mh()}finally{ca=!1}}}function Lh(){Wt(),B?.remove(),B=null;for(let e of document.querySelectorAll('[data-bloom="message-star"], [data-bloom="star-list"], [data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();for(let e of document.querySelectorAll(`.${D("-mark")}`))e.classList.remove(D("-mark"))}var wu=f({name:"StarChats",description:"Star a message from its toolbar. The star left of the top-right menu opens this chat's list.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:No,styles:()=>`${Au}${No.store.replaceReadAloud?ke([fh]):""}`,onSettingsChange(e){(e==="messages"||e==="replaceReadAloud")&&dt()},start(){Fe=vn({over:pr,trigger:()=>B,panel:()=>z,setHeld(o){if(o){mt=!0,dt();return}Ge||(mt=!1,dt())}}),la=E(o=>H(o)&&dt());let e=o=>{pr(o.target)||fr()&&Wt()};document.addEventListener("pointerdown",e,!0);let t=o=>{o.key!=="Escape"||!fr()||(o.preventDefault(),Wt())};document.addEventListener("keydown",t,!0),ua=()=>{document.removeEventListener("pointerdown",e,!0),document.removeEventListener("keydown",t,!0)},dt()},stop(){la?.(),la=void 0,ua?.(),ua=void 0,Qt(),Fe?.dispose(),Fe=void 0,Lh()}});var xu="filter:blur(6px)!important;transition:filter 0.2s ease",Su=`:is(${u.sidebars})`,ft="data-bloom-streamer-open",kh="[data-app-action-sidebar-thread-row], [data-app-action-sidebar-project-row], .bloom-recent-item";function Ih(){return{conversations:{selectors:[`${Su} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0,row:"[data-app-action-sidebar-thread-row]"},projects:{selectors:[`${Su} a:is([href*="/project"], [href*="/g/g-p-"])`,"[data-app-action-sidebar-project-row]",".bloom-recent-project"],hover:!0,row:"[data-app-action-sidebar-project-row]"},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}}}var Eu=p({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function Bh(e,t){let o=[`:is(${e}):hover`,`.bloom-recent-item:hover :is(${e})`,`:is(${e})[${ft}]`];return t&&o.push(`${t}:hover`,`${t}:hover :is(${e})`,`${t}:is(${e}):hover`,`${t}[${ft}]`,`${t}[${ft}] :is(${e})`),o.join(",")}function Ph(){let e=Ih();return Object.entries(e).filter(([t])=>Eu.store[t]).map(([,t])=>{let o=t.selectors.join(",");if(!t.hover)return`:is(${o}){${xu}}`;let n="row"in t?t.row:void 0;return`:is(${o}){${xu}}${Bh(o,n)}{filter:none!important}`}).join(`
`)}function Oh(e,t){for(let o of document.elementsFromPoint(e,t))if(o instanceof Element){let n=o.closest(kh);if(n)return n}return null}function ha(e){for(let t of document.querySelectorAll(`[${ft}]`))t!==e&&t.removeAttribute(ft);e&&!e.hasAttribute(ft)&&e.setAttribute(ft,"")}var jt,Rh=Ie(()=>{jt&&ha(Oh(jt.clientX,jt.clientY))});function pa(e){jt=e,Rh()}function Dh(e){e.relatedTarget instanceof Node&&document.documentElement.contains(e.relatedTarget)||(jt=void 0,ha(null))}var ga,gr,Tu=f({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:Eu,styles:Ph,start(){ga=me(),gr=new AbortController;let e={capture:!0,signal:gr.signal,passive:!0};document.addEventListener("pointerover",pa,e),document.addEventListener("pointermove",pa,e),document.addEventListener("pointerout",pa,e),window.addEventListener("pointerleave",Dh,e)},stop(){gr?.abort(),gr=void 0,jt=void 0,ha(null),ga?.(),ga=void 0}});var Mu=p({openNewAsTemporary:{type:"boolean",description:"Open New chat as a temporary chat.",default:!1}}),Hh=/^(?:new chat|新聊天)$/i,hr;function Nh(e){return e?"/?temporary-chat=true":"/"}function Uh(e){let t=Nh(e);`${location.pathname}${location.search}`===t||e&&ue()&&location.pathname==="/"||location.assign(t)}function Gh(e){if(e.closest("[data-bloom]"))return!1;try{let t=new URL(e.href,location.origin);return t.origin===location.origin&&t.pathname==="/"}catch{return!1}}function Fh(e){return e.closest("[data-bloom], [data-app-action-sidebar-project-row]")?!1:Hh.test(e.getAttribute("aria-label")??h(e.textContent??""))}function Yh(e){if(!Mu.store.openNewAsTemporary||ue())return;let{target:t}=e;if(!(t instanceof Element))return;let o=t.closest("a[href], button"),n=o instanceof HTMLAnchorElement?Gh(o):!!o&&Fh(o);!o||!n||o.closest(`${u.sidebarScroll}, ${u.rail}, ${u.oldSidebar}, nav`)&&(e.preventDefault(),e.stopPropagation(),Uh(!0))}function Cu(){for(let e of document.querySelectorAll('[data-bloom="temporary-chat"]'))e.remove()}var Lu=f({name:"TemporaryChat",description:"Optionally open New chat as a temporary chat. No extra sidebar button.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"ghost",enabledByDefault:!0,settings:Mu,start(){Cu(),hr=new AbortController,document.addEventListener("pointerdown",Yh,{capture:!0,signal:hr.signal})},stop(){hr?.abort(),hr=void 0,Cu()}});var Ye=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)','[data-turn-key] [data-message-author-role="user"] blockquote:not(.twitter-tweet)','[class~="group/user-message"] blockquote:not(.twitter-tweet)'].join(","),ba=p({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function Kh(){let e=[`${Ye}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${Ye}>*{margin-block:0!important}`];return ba.store.italic||e.push(`${Ye}{font-style:inherit!important}`),ba.store.quotes||(e.push(`${Ye}{quotes:none!important}`),e.push(`${Ye}::before,${Ye}::after,${Ye} p::before,${Ye} p::after{content:none!important}`)),e.join(`
`)}var ku=f({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:ba,styles:Kh});var Qh=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],Wh=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",jh='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',Iu=p({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function zh(){let e=`${Iu.store.width}rem`;return`:is(${Wh}){${Qh.map(t=>`${t}:${e}!important`).join(";")}}:is(${jh}){max-width:min(100%, ${e})!important}`}var Bu=f({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:Iu,styles:zh});var Vh=[Zs,fl,wl,El,Dl,Ul,Fl,Jl,ic,fc,bc,Oc,Dc,Hc,Yc,ou,cu,gu,yu,wu,Tu,Lu,ku,Bu],ya=Vh;var Jh=new S("Bloom"),Pu="2.0.87";function Zh(){za(),Jt()}async function Aa(){Jt();for(let e of document.querySelectorAll("[data-bloom='settings']"))e.remove();as();for(let e of ya)e.updatedAt=Ss[e.name];Fa(ya),Ha(),indexedDB.deleteDatabase("bloompp"),Go("base",Ja),xs(),Xo("Init"),on().then(()=>{ka(),Xo("DOMContentLoaded")}),await ls(),Xo("HostReady"),ja(),Jh.info(`Bloom++ ${Pu} ready`)}var qa=new S("Boot");function Xh(e){if(e){if(qa.warn("Replacing another Bloom++ instance",e.VERSION),e.destroy){e.destroy();return}for(let t of e.plugins?.values()??[]){try{t.stop?.()}catch(o){qa.error("Failed to stop previous plugin",o)}t.styles="",t.start=void 0}Jt()}}window===window.top&&(Xh(ne.Bloom),Object.defineProperty(ne,"Bloom",{value:va,configurable:!0,writable:!0}),Aa().catch(e=>qa.error("Startup failed",e)));})();
