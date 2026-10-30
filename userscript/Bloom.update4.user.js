// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.88
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

/* Bloom++ v2.0.88. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Ku=Object.defineProperty;var Qu=(e,t)=>{for(var o in t)Ku(e,o,{get:t[o],enumerable:!0})};var E=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var se=(e,t,o)=>Math.min(o,Math.max(t,e)),P=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ca=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,ce=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,h=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function Yo(e,t){return`${e} ${t}${e===1?"":"s"}`}async function Ma(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function ke(e){try{return JSON.parse(e)}catch{return}}var X=typeof unsafeWindow>"u"?window:unsafeWindow;var Wu=new E("Styles"),Ie=new Map,Vt=new Set,je=new Map,Ar=!0,La=e=>e.replaceAll(/[^A-Za-z0-9_-]/g,"_"),ju=e=>`:where(:root){--bloom-sheet-${La(e)}:1}`,zu=(e,t)=>`${ju(e)}${t}`,ka=e=>`bloom-style-${e}`;function Ia(e){try{return[...e.cssRules].map(t=>t.cssText).join(`
`)}catch{return""}}function Vu(e,t){let o=Ia(e);return o?o.includes(`--bloom-sheet-${La(t)}`)?!0:t==="plugin-StreamerMode"?o.includes("blur(6px)")&&(o.includes("data-app-action-sidebar-thread-title")||o.includes("data-bloom-streamer-open")):t==="plugin-WiderChat"?o.includes("--composer-adjacent-max-width")&&o.includes("--thread-content-max-width"):t==="plugin-ComposerOpacity"?o.includes("--composer-layout-surface-backdrop-filter")||o.includes("--composer-layout-surface-background")&&o.includes("color-mix"):!1:!1}function Ba(e){let t=Ia(e);return t?!!(t.includes("--bloom-")||t.includes(".bloom-")||t.includes("[data-bloom")||t.includes("--bloom-sheet-")||t.includes("blur(6px)")&&t.includes("data-app-action-sidebar-thread-title")||t.includes("--composer-adjacent-max-width")&&t.includes("--thread-content-max-width")||t.includes("--composer-layout-surface-backdrop-filter")):!1}function Pa(){let e=document.adoptedStyleSheets.filter(t=>!Vt.has(t)&&!Ba(t));document.adoptedStyleSheets=[...e,...Ie.values()]}function Oa(e){document.readyState==="loading"||e.parentNode===document.head||document.head.append(e)}function Ju(e,t){let o=je.get(e);o||(o=document.createElement("style"),o.id=ka(e),je.set(e,o)),o.textContent!==t&&(o.textContent=t),Oa(o)}function Ko(e,t){let o=zu(e,t);if(Ar)try{let n=Ie.get(e);n||(n=new X.CSSStyleSheet,Ie.set(e,n),Vt.add(n)),n.replaceSync(o),Pa();return}catch(n){Wu.warn("Constructed style sheets unavailable, using <style> after parsing",n),Ar=!1;let r=Ie.get(e);r&&Vt.delete(r),Ie.delete(e)}Ju(e,o)}function Jt(e){let t=Ie.get(e);t&&(Vt.delete(t),Ie.delete(e)),je.get(e)?.remove(),je.delete(e);for(let o of document.querySelectorAll(`style[id="${ka(e)}"]`))o.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(o=>o!==t&&!Vu(o,e)),Ar&&Pa()}catch{}}function Zt(){Ie.clear(),Vt.clear();for(let e of je.values())e.remove();je.clear();for(let e of document.querySelectorAll("style[id^='bloom-style-']"))e.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(e=>!Ba(e))}catch{}}function Ra(){for(let e of je.values())Oa(e)}var M=e=>(...t)=>t.map(o=>e+o).join(" "),Qo=(...e)=>e.filter(Boolean).join(" "),Be=e=>e.length?`${e.map(t=>`${t}:not([data-bloom])`).join(",")}{display:none!important}`:"";var Da="__bloomHost",vr=new E("Boot"),Zu=['[data-bloom="navigator"]','[data-bloom="settings"]','[data-bloom="history-hud"]','[data-bloom="star-list"]','[data-bloom="entry"]','[data-bloom="message-star"]','[data-bloom="queue"]','[data-bloom="recent"]','[data-bloom="quote-chip"]'].join(", ");function Wo(){if(!(typeof document>"u"||!document.documentElement)){for(let e of document.querySelectorAll(Zu))e.remove();for(let e of document.querySelectorAll("[data-bloom-greeting]"))e.removeAttribute("data-bloom-greeting");for(let e of document.querySelectorAll("[data-bloom-placeholder]"))e.removeAttribute("data-bloom-placeholder");for(let e of document.querySelectorAll("[data-bloom-streamer-open]"))e.removeAttribute("data-bloom-streamer-open")}}function Xu(e){if(vr.warn("Replacing another Bloom++ instance",e.VERSION),e.destroy){e.destroy();return}for(let t of e.plugins?.values()??[]){try{t.stop?.()}catch(o){vr.error("Failed to stop previous plugin",o)}t.styles="",t.start=void 0}Zt()}function Ha(e){let t=X,o=new Set;for(let n of[e,t.Bloom,t[Da]])if(!(!n||o.has(n))){o.add(n);try{Xu(n)}catch(r){vr.error("Failed to retire Bloom++",r)}}Wo()}function Na(e){let t=X;try{delete t.Bloom}catch{}Object.defineProperty(t,"Bloom",{value:e,configurable:!0,writable:!0}),Object.defineProperty(t,Da,{value:e,configurable:!0,writable:!0})}var Ta={};Qu(Ta,{VERSION:()=>Fu,destroy:()=>lb,init:()=>Ea,plugins:()=>Ae});var $u=new E("Dom");function s(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var Ua=document.createElement("template");function Ga(e){return Ua.innerHTML=e.trim(),Ua.content.firstElementChild.cloneNode(!0)}var ze=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),K=(e,t=document)=>[...t.querySelectorAll(e)].find(ze)??null,_u=16,ed="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function Fa(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([ed],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function $t(e){document.hidden?setTimeout(e,_u):requestAnimationFrame(e)}function Pe(e){let t=!1;return()=>{t||(t=!0,$t(()=>{t=!1;try{e()}catch(o){$u.error("Scheduled task failed",o)}}))}}var jo=new Set,zo=[],Xt,td=Pe(()=>{let e=zo;zo=[];for(let t of jo)t(e)});function C(e){return jo.add(e),Xt||(Xt=new MutationObserver(t=>{zo.push(...t),td()}),Xt.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{jo.delete(e),!jo.size&&(Xt?.disconnect(),Xt=void 0,zo=[])}}var od=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),H=e=>!e.length||e.some(t=>!od(t.target)),nd=e=>`"${e.replaceAll("\\","\\\\").replaceAll('"','\\"').replaceAll(`
`,"\\A ")}"`;function Ve(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size"),e.style.removeProperty("--bloom-text");return}e.style.setProperty("--bloom-text",nd(t)),e.getAttribute("data-bloom-text")!==t&&e.setAttribute("data-bloom-text",t)}function f(e){return e}var Ya=new E("Storage");function Vo(e){try{return localStorage.getItem(e)??void 0}catch{return}}function Jo(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(o){Ya.warn("localStorage write failed",o)}}function qr(e){try{localStorage.removeItem(e)}catch(t){Ya.warn("localStorage delete failed",t)}}function Ka(e,t){addEventListener("storage",o=>{o.key===e&&t(o.newValue)})}var Sr="BloomSettings",rd=100,ht={plugins:{}},Zo=new Set,wr=new Set,_t;function Qa(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=ke(t);return!P(t)||!P(t.plugins)||!Object.keys(t.plugins).length?null:t}function Wa(){let e=Qa(Vo(Sr));e&&(ht.plugins=e.plugins)}var ja=(e,t)=>`${e}
${t}`;function za(){_t=void 0,wr.clear(),Jo(Sr,ht)}function id(e){let t=Qa(e);if(!t)return;let o=[];for(let n of new Set([...Object.keys(ht.plugins),...Object.keys(t.plugins)])){let r=ht.plugins[n]??={},i=P(t.plugins[n])?t.plugins[n]:{};for(let a of new Set([...Object.keys(r),...Object.keys(i)]))wr.has(ja(n,a))||JSON.stringify(r[a])===JSON.stringify(i[a])||(i[a]===void 0?delete r[a]:r[a]=i[a],o.push([n,a]))}for(let[n,r]of o)for(let i of Zo)i(n,r)}function xr(){_t&&(clearTimeout(_t),za())}var Oe=(e,t)=>ht.plugins[e]?.[t];function Je(e,t,o){let n=ht.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,wr.add(ja(e,t)),clearTimeout(_t),_t=setTimeout(za,rd);for(let r of Zo)r(e,t)}function bt(e){return Zo.add(e),()=>void Zo.delete(e)}function Er(e){return e.type==="component"?void 0:e.default}function p(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>Oe(t.pluginName,n)??(e[n]&&Er(e[n])),set:(o,n,r)=>(Je(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&Oe(t.pluginName,o)!==void 0&&Je(t.pluginName,o)}};return t}var Va=e=>{let t=()=>{let o=Oe("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();Je("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},Xo=Va("pinnedPlugins"),$o=Va("starredPlugins");addEventListener("pagehide",xr);Ka(Sr,id);var en=new E("PluginManager"),Ae=new Map,Ze=new Set,Cr=new Set,Tr=new Set;function Ja(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),Ae.set(t.name,t)}var yt=e=>!!e.required||(Oe(e.name,"enabled")??!!e.enabledByDefault);var eo=e=>`plugin-${e.name}`;function Za(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?Ko(eo(e),t):Jt(eo(e))}function ad(e){if(!Ze.has(e.name))try{Za(e),e.start?.(),Ze.add(e.name)}catch(t){Jt(eo(e)),en.error(`Failed to start ${e.name}`,t)}}function Mr(e){Ze.delete(e.name),Jt(eo(e));try{e.stop?.()}catch(t){en.error(`Failed to stop ${e.name}`,t)}}var Xa=e=>e.startAt??"HostReady";function $a(e){if(yt(e)){Cr.has(Xa(e))&&ad(e);return}Mr(e)}function tn(e){Cr.add(e);for(let t of Ae.values())Xa(t)===e&&$a(t);en.info(`${e}: ${[...Ze].join(", ")}`)}function _a(e,t){Je(e.name,"enabled",t),xr()}function sd(){for(let e of Ae.values())e.required||yt(e)||(Ze.has(e.name)?Mr(e):Jt(eo(e)))}var _o;function es(){_o?.(),_o=C(()=>sd())}function ts(){_o?.(),_o=void 0;for(let e of Ae.values())Mr(e);Ze.clear(),Cr.clear()}function os(e){return Tr.add(e),()=>void Tr.delete(e)}bt((e,t)=>{let o=Ae.get(e);if(o){if(t==="enabled"){typeof Oe(e,"enabled")=="boolean"&&$a(o);for(let n of Tr)n();return}if(Ze.has(e))try{Za(o),o.onSettingsChange?.(t)}catch(n){en.error(`Settings change failed for ${e}`,n)}}});var ns=`/*
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
`;var cd=new E("Events");function on(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){cd.error(`Listener for ${String(t)} failed`,r)}}}}var u={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',readAloud:'button:is([aria-label="Read aloud" i], [aria-label^="Read aloud" i], [aria-label="Stop reading" i], [aria-label^="Stop reading" i], [aria-label="\u6717\u8BFB"], [aria-label^="\u6717\u8BFB"], [aria-label="\u505C\u6B62\u6717\u8BFB"], [data-testid*="read-aloud" i])',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',composerConversation:"[data-above-composer-conversation-id]",oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",modelTrigger:'[data-testid="model-switcher-dropdown-button"], button[aria-label="Model selector" i], button[aria-label="Select ChatGPT model" i]',modelItem:'[role="menu"] [data-testid^="model-switcher-"], [role="menuitem"][data-testid^="model-switcher-"], [role="menu"] [role="menuitemradio"], [role="menu"] [data-reasoning-slider]',effortSlider:'[role="menu"] [data-reasoning-slider]',homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]',headerMore:'button[aria-label="More" i], button[aria-label="\u66F4\u591A"]',rightPanel:"aside[data-app-shell-focus-area='right-panel']",summaryPanel:"[data-summary-panel-variant]"};var rs=/[​-‍﻿]/g,ve=()=>K(u.composerInput),Xe=e=>e instanceof HTMLElement&&e.matches(u.composerInput),Q=(e=ve())=>e?.closest("form")??document.querySelector(u.oldComposerForm);function k(e=ve()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(rs,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(rs,"").trim()}var ud=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function ie(e,t=ve()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return ud?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function is(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:a,value:c}=e;return{first:!c.slice(0,i).includes(`
`),last:!c.slice(a).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var as=e=>{let t=Q();return(t&&K(e,t))??K(e)},At=()=>as(u.stopButton),dd=()=>{let e=as(u.sendButton);return e&&!e.matches(u.stopButton)?e:null};function nn(){let e=dd();if(e){e.disabled||e.click();return}ve()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var ss=()=>ze(At());var us=new E("Network"),md=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,fd=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,an=1e3,pd=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),W=on(),kr=new Map,ls=new Map,gd=1,le=e=>e?kr.get(e)??null:null;function rn(e){let t=kr.get(e);return t||kr.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var ds=e=>e==="user"||e==="assistant";function ms(e){let t=e.author?.role;if(!e.id||!ds(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(l=>typeof l=="string").join(`
`).trim(),i=n.filter(l=>P(l)&&l.content_type==="image_asset_pointer").length,a=e.metadata?.attachments,c=Array.isArray(a)&&a.length>0;return!r&&!i&&!c?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*an:null,text:r,hasFiles:c,imageCount:i}}var fs=e=>e.filter((t,o)=>t.role==="user"||e[o+1]?.role!=="assistant"),Ir=e=>e.map(t=>t.createTime).filter(t=>t!=null);function hd(e,t){let o=Ir(e),n=Ir(t);return!o.length||!n.length?!1:Math.max(...o)<Math.min(...n)}function bd(e){let t=Ir(e);if(t.length<2)return e;let[o]=t,n=o-e.length;return e.map((i,a)=>(i.createTime!=null&&(n=i.createTime),{message:i,index:a,time:i.createTime??n})).toSorted((i,a)=>i.time-a.time||i.index-a.index).map(i=>i.message)}function yd(e,t){let o=t.filter(P).map(c=>P(c.message)?c.message:c);for(let c of o)c.id&&c.create_time&&e.times.set(c.id,c.create_time*an);let n=o.map(ms).filter(c=>c!=null),r=new Set(n.map(c=>c.id)),i=e.chain.filter(c=>!r.has(c.id)),a=hd(n,i)?[...n,...i]:[...i,...n];return e.chain=fs(bd(a)),e}function Ad(e,t){if(!P(t)||!(P(t.mapping)||Array.isArray(t.messages)))return null;let o=rn(e);if(typeof t.title=="string"&&t.title&&(o.title=t.title),Array.isArray(t.messages))return yd(o,t.messages);let n=t.mapping;for(let c of Object.values(n)){let l=c.message?.create_time;c.message?.id&&l&&o.times.set(c.message.id,l*an)}let r=[],i=new Set,a=typeof t.current_node=="string"?t.current_node:null;for(;a&&!i.has(a)&&n[a];){i.add(a);let c=n[a].message,l=c?ms(c):null;l&&r.push(l),a=n[a].parent??null}return r.length&&(o.chain=fs(r.toReversed())),o}function vd(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}var Lr=e=>typeof e=="string"?e:null;function qd(e){let t=typeof e?.body=="string"?ke(e.body):null;if(!P(t))return{conversationId:null,parentId:null,userId:null};let[o]=Array.isArray(t.messages)?t.messages:[];return{conversationId:Lr(t.conversation_id),parentId:Lr(t.parent_message_id),userId:P(o)?Lr(o.id):null}}function Sd(e,t){if(!P(e))return;typeof e.type=="string"&&pd.has(e.type)&&(t.handoff=!0);let o=P(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(rn(e.conversation_id).title=e.title,W.emit("conversation",rn(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&ds(n.author?.role)){let r=n.create_time*an;t.conversationId&&rn(t.conversationId).times.set(n.id,r),W.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function wd(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:a}=await o.read();if(i)break;r+=n.decode(a,{stream:!0});let c=r.split(`
`);r=c.pop()??"";for(let l of c){if(!l.startsWith("data:"))continue;let d=l.slice(5).trim();d&&d!=="[DONE]"&&Sd(ke(d),t)}}}async function xd(e,t,o){let{conversationId:n}=t,r={conversationId:n,error:!1,handoff:!1};ls.set(e,n),W.emit("generate-start",{requestId:e,...t});try{let i=await o;i.ok?i.headers.get("content-type")?.includes("event-stream")&&await wd(i.clone(),r):r.error=!0}catch(i){let a=i instanceof DOMException&&i.name==="AbortError";r.handoff||=a,r.error||=!a}finally{ls.delete(e),W.emit("generate-end",{requestId:e,...r})}}async function Ed(e,t){try{let o=await t;if(!o.ok)return;let n=Ad(e,await o.clone().json());n&&W.emit("conversation",n)}catch(o){us.debug("Conversation read skipped",o)}}function Td(e,t,o){let n=vd(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&md.test(n.pathname)){xd(gd++,qd(t),o);return}let i=r==="GET"&&n.pathname.match(fd)?.[1];i&&Ed(i,o)}var cs=!1;function ps(){if(cs)return;cs=!0;let e=X.fetch,t=function(o,n){let r=e.call(this??X,o,n);try{Td(o,n,r)}catch(i){us.error("Fetch tap failed",i)}return r};X.fetch=typeof exportFunction=="function"?exportFunction(t,X):t}var Cd="__reactContainer$",gs="__reactFiber$";function sn(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var Br=(e,t)=>Object.keys(e.wrappedJSObject??e).some(o=>o.startsWith(t)),qe=e=>!Br(document,Cd)||Br(e,gs);function $e(){return document.body?Promise.resolve():new Promise(e=>{let t=new MutationObserver(()=>{document.body&&(t.disconnect(),e())});t.observe(document,{childList:!0,subtree:!0})})}async function hs(){await $e();let e=Date.now()+8e3;for(;!Br(document.body,gs)&&Date.now()<e;)await new Promise(t=>setTimeout(t,100))}var Md=new E("Route"),bs=/\/c\/(?!local-)([\w-]+)/,Ld=500,Rr=e=>{try{return new URL(e,location.origin).pathname.match(bs)?.[1]??null}catch{return null}},y=()=>location.pathname.match(bs)?.[1]??null,dn=()=>location.pathname==="/",kd=/^\/g\/g-p-[^/]+(?:\/project)?\/?$/,ys=()=>kd.test(location.pathname),ue=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",cn=new Set,un=location.href,Or=y(),ln;function Pr(){if(location.href===un)return;let e={prevHref:un,href:location.href,prevId:Or,id:y()};un=e.href,Or=e.id;for(let t of cn)try{t(e)}catch(o){Md.error("Route listener failed",o)}}function Id(){let e=new AbortController,{navigation:t}=X;t?.addEventListener("currententrychange",()=>queueMicrotask(Pr),{signal:e.signal}),addEventListener("popstate",Pr,{signal:e.signal});let o=setInterval(Pr,Ld);return()=>{e.abort(),clearInterval(o)}}function de(e){return cn.add(e),ln||(un=location.href,Or=y(),ln=Id()),()=>{cn.delete(e),!cn.size&&(ln?.(),ln=void 0)}}var Bd=["data-turn","data-message-author-role"],Pd=/:(user|assistant)$/,Dr=`${u.messageUnit}, ${u.oldMessage}`,Hr=e=>e==="user"||e==="assistant",Ss=()=>!!document.querySelector(u.timelineScroll),ws=()=>!!K(u.timelineScroll),xs=()=>y()??document.querySelector(u.composerConversation)?.getAttribute("data-above-composer-conversation-id")??"",vt=()=>Ss()?K(u.timelineScroll):document;function oo(){if(Ss())return K(u.timelineScroll);let e=document.querySelector(u.turn);for(let t=e?.parentElement;t;t=t.parentElement){let{overflowY:o}=getComputedStyle(t);if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight)return t}return document.scrollingElement}var qt=e=>e.getAttribute("data-chatgpt-search-unit-key")?.match(Pd)?.[1]??null,Es=e=>[...e.querySelectorAll(u.searchUnit)].filter(t=>qt(t)&&!t.parentElement?.closest(u.searchUnit)),As=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function to(e){let t=As(e);return t.length?t:[...new Set([...e.querySelectorAll(Dr)].flatMap(As))]}function St(e=vt()){if(!e)return[];let t=Es(e);return t.length?t:[...e.querySelectorAll(Dr)].filter(o=>!o.parentElement?.closest(Dr))}function Od(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function Rd(e){for(let t of Bd){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(Hr(o))return o}return e.querySelector(u.markdown)||e.querySelector(u.generatedImage)?"assistant":null}var Dd=e=>!e.parentElement?.closest(u.turn);function Re(){let e=le(y())?.chain??[];return[...vt()?.querySelectorAll(u.turn)??[]].filter(Dd).flatMap(o=>{let n=Es(o),r=n.length?n.map(i=>({el:i,known:qt(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=d=>!n.some(m=>m.contains(d))&&h(d.textContent??""),a=[...o.querySelectorAll(u.assistantMarkdown)].find(d=>i(d)&&!mn.test(h(d.textContent??""))),c=[...o.querySelectorAll(u.activityHeader)].findLast(i),l=a??c;l&&r.push({el:l,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?to(o):St(o).flatMap(to),a=n??Rd(o)??Od(i,e)??(r%2?"assistant":"user"),c=o.closest(u.turn)??o,l=!o.closest(u.searchUnit)&&!!c.querySelector(u.turnBusy),d=a==="assistant"&&(o.matches(u.turnBusy)||!!o.querySelector(u.turnBusy)||l);return{el:o,role:a,messageIds:i,streaming:d}})}var Hd="[data-bloom], .sr-only",Ts=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,mn=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,vs=new WeakMap;function wt(e){let o=(e.el.closest(u.turn)??e.el).textContent?.length??0,n=vs.get(e.el);if(n?.length===o)return n.summary;let r=Nd(e);return vs.set(e.el,{length:o,summary:r}),r}function qs(e){let t=new Set,o=[];for(let n of e.querySelectorAll(u.assistantMarkdown)){if(n.closest(u.searchUnit))continue;let r=h(n.textContent??"");!r||mn.test(r)||Ts.test(r)||t.has(r)||(t.add(r),o.push(r))}return o}function Nd(e){let t=e.el.querySelectorAll(u.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.closest(u.turn);if(e.role==="assistant"&&o&&e.el.matches(u.assistantMarkdown)&&!e.el.closest(u.searchUnit)){let l=qs(o);if(l.length)return l.join(" \xB7 ")}let n=e.el.querySelector(e.role==="assistant"?u.markdown:".whitespace-pre-wrap")??e.el,i=[...n.querySelectorAll(Hd)].map(l=>h(l.textContent??"")).filter(Boolean).reduce((l,d)=>l.replace(d,`
`),n.innerText||n.textContent||""),a=i.split(`
`).map(h).filter(l=>l&&!Ts.test(l)&&!mn.test(l));if(a.length)return a.join(" ");if(e.role==="assistant"&&o){let l=qs(o);if(l.length)return l.join(" \xB7 ")}let c=i.split(`
`).map(h).filter(l=>mn.test(l));return c.length?c.at(-1)??"":e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function fn(e){return e.text?h(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var Nr=e=>e.matches(u.timelineScroll)&&getComputedStyle(e).flexDirection==="column-reverse";var Ud=250,Gd=400,Fd=6e4,Yd=5e3,Kd=`:is(${u.turn}) :is(${u.turnBusy})`,w=on(),hn=new Set,Ur=new Set,De=!1,Ms=0,xt=null,Et=!1,pn=!1,no=0,bn=!1,ro=null,Cs=!1,R=()=>({generating:De,conversationId:y()}),Ls=()=>ss()||!!vt()?.querySelector(Kd);function Qd(){let e=Ls();return e?pn||(no=0,bn=!0):pn=!1,[...hn].some(t=>!Ur.has(t))||e&&!pn||Date.now()<no}function Wd(){return ro?.error?"error":Et?"stopped":"done"}function jd(){xt=null,De=!1,bn=!1,w.emit("fall",{conversationId:y(),outcome:Wd()}),Et=!1,ro=null}function ks(){let e=Qd();e&&!De&&(De=!0,Ms=Date.now(),Et=!1,ro=null,w.emit("rise",{conversationId:y()})),e||!De?xt=null:xt==null?xt=Date.now():Date.now()-xt>=Gd&&jd()}function gn(){ks(),w.emit("tick",R())}function zd({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(De||Date.now()-Ms<Fd);if(!o&&De){for(let n of hn)Ur.add(n);pn=Ls(),no=0,bn=!1,xt=null,De=!1,Et=!1,ro=null,w.emit("fall",{conversationId:e,outcome:"left"})}w.emit("context",{prevId:e,id:t,migrated:o}),gn()}function Vd(e){e.target instanceof Element&&e.target.closest(u.stopButton)&&(Et=!0,no=0)}function Is(){Cs||(Cs=!0,W.on("generate-start",({requestId:e})=>{hn.add(e),gn()}),W.on("generate-end",e=>{hn.delete(e.requestId),!Ur.delete(e.requestId)&&(ro=e,no=e.handoff&&!e.error&&!Et&&!bn?Date.now()+Yd:0,gn())}),de(zd),document.addEventListener("click",Vd,!0),Fa(gn,Ud),sn().then(()=>C(ks)))}var Bs={BetterNavigator:1793349882e3,BetterQuotes:179333264e4,ChatListStatus:179333264e4,ChatStateFavicons:1790623094e3,Cleaner:1793267811e3,ComposerOpacity:1793344667e3,Continue:1790939902e3,CustomSidebarIdentity:1790658669e3,GreetingCustomizer:1792014624e3,InputHistory:179333264e4,MessageTimestamps:1791080494e3,NoDictation:1793335268e3,NoShareLink:1790658669e3,NoSidebarIdentity:1790616549e3,PromptQueue:1793267321e3,RecentTopics:179333264e4,ResponseNotification:1790661368e3,Settings:1793347117e3,SidebarIdentityOpacity:1790682605e3,StarChats:1793347117e3,StreamerMode:1793344667e3,TemporaryChat:1792014624e3,UserQuotes:1793345744e3,WiderChat:179333264e4};var q=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,Jd="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",Zd={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${Jd}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:q('<path d="M18 6 6 18M6 6l12 12"/>'),gear:q('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:q('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:q('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:q('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:q('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:q('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:q('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:q('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:q('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:q('<path d="m6 9 6 6 6-6"/>'),play:q('<path d="M7 4v16l13-8z"/>'),plus:q('<path d="M12 5v14M5 12h14"/>'),check:q('<path d="m5 12 5 5 9-10"/>'),alert:q('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:q('<path d="M4 5h16v11H9l-5 4z"/>'),layout:q('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:q('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:q('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:q('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:q('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:q('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:q('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:q('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:q('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:q('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:q('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:q('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:q('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:q('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:q('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:q('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),ghost:q('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},N=e=>Ga(Zd[e]);var Se="data-bloom-tip",Gr=6,Fr=8,_e,Ps=null;function Tt(e){if(e===Ps)return;if(Ps=e,!e){_e?.remove();return}_e??=s("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),_e.textContent=e.getAttribute(Se),document.body.append(_e);let t=e.getBoundingClientRect(),{width:o,height:n}=_e.getBoundingClientRect(),r=t.bottom+Gr+n<=innerHeight-Fr;_e.style.left=`${se(t.left+t.width/2-o/2,Fr,innerWidth-o-Fr)}px`,_e.style.top=`${r?t.bottom+Gr:t.top-Gr-n}px`}var Os=e=>e instanceof Element?e.closest(`[${Se}]`):null;function Rs(){let e=new AbortController,t={passive:!0,signal:e.signal};return document.addEventListener("pointerover",o=>Tt(Os(o.target)),t),document.addEventListener("pointerout",o=>o.relatedTarget||Tt(null),t),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&Tt(Os(o.target)),t),document.addEventListener("focusout",()=>Tt(null),t),document.addEventListener("pointerdown",()=>Tt(null),t),()=>{e.abort(),Tt(null)}}function Yr(e,t,o,n=!1){let r=s("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let a=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(a)),t(a)}),r}function j(e,t,o){return s("button",{class:Qo("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button","data-bloom":"control"},on:{click:t}})}function $(e,t,o,n){let r=s("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":t,"data-bloom":"control",[Se]:t},on:{click:o}},N(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function yn(e,t,o,n,r,i){let a=s("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});a.value=String(e);let c=s("output",{text:`${a.value}${r}`});return a.addEventListener("input",()=>{c.textContent=`${a.value}${r}`,i(Number(a.value))}),s("div",{class:"bloom-slider"},a,c)}function Kr(e,t,o){let n=s("select",{class:"bloom-select"},...t.map(r=>s("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function io(e,t,o="",n="text"){let r=s("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var Xd=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,Ds=/\S+@\S+\.\S+/,$d=3,_d=/^\/g\/(g-p-[^/]+)\//,em=/^g-p-[0-9a-f]+-?/i,Hs=e=>!!e.closest(".sr-only"),Qr=e=>!!e?.querySelector(u.menuButton);function Ns(){return[...document.querySelectorAll(u.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(Qr)).filter(e=>e!=null)}function Us(){let e=[...document.querySelectorAll(u.oldProfile)];if(e.length)return e.map(o=>{let n=o.parentElement?.children.length===1?o.parentElement:o;return{kind:"profile",anchor:n,insert:r=>n.before(r)}});let t=Ns().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(u.rail)){let n=[...o.children].find(Qr);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}var Wr=e=>!e.closest("[data-bloom]")&&(!!e.querySelector("img, [class*=rounded-full]")||Ks(e).some(t=>!Hs(t))),Gs=e=>[...e.parentElement?.children??[]].find(t=>t!==e&&t instanceof HTMLElement&&Wr(t))??null;function Fs(){let e=[...document.querySelectorAll(u.oldProfile)];return e.length?e:[...Ns(),...[...document.querySelectorAll(u.rail)].map(o=>[...o.children].findLast(Qr))].map(o=>[...o?.querySelectorAll(u.menuButton)??[]].findLast(n=>Wr(n)||Gs(n))).filter(o=>o!=null)}var Ys=()=>Fs().map(e=>Wr(e)?e:Gs(e)).filter(e=>e!=null);function Ks(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!h(t.textContent??"")&&!(t instanceof SVGElement))}var tm=e=>{if(/rounded-full/.test(e.getAttribute("class")??""))return!0;if(!e.clientWidth)return!1;let{borderRadius:t}=getComputedStyle(e);return t.includes("%")||Number.parseFloat(t)>=e.clientWidth/2};function An(e,t,o){for(let n of e.querySelectorAll(`[${t}]`))n!==o&&n.removeAttribute(t);o&&!o.hasAttribute(t)&&o.setAttribute(t,"")}function om(e,t){if(h(e.textContent??"").length>$d)return null;let o=e.closest("button");for(let n=e;n&&n!==t&&n!==o;n=n.parentElement)if(tm(n))return n;return null}function jr(e,t){e.hasAttribute(`data-bloom-${t}`)||e.setAttribute(`data-bloom-${t}`,"");let o=e.querySelector("img:not([data-bloom] img)"),n=Ks(e),r=o?null:n.map(m=>om(m,e)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),a=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");An(e,`data-bloom-${t}-avatar`,a);let c=n.filter(m=>!a?.contains(m)&&!Hs(m)),l=c.find(m=>Xd.test(h(m.textContent??""))),d=c.find(m=>Ds.test(m.textContent??""));An(e,`data-bloom-${t}-plan`,l),An(e,`data-bloom-${t}-email`,d),An(e,`data-bloom-${t}-name`,c.find(m=>m!==l&&m!==d))}function nm(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function vn(){return Fs().map(nm).find(e=>e!=null)??[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&(Ds.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var ao=e=>[...document.querySelectorAll(u.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&Rr(t.href)===e);function Qs(e){let t=ao(e).find(o=>h(o.textContent??""));return t?h(t.textContent??""):null}function Ws(e){let t=new URL(e,location.origin).pathname.match(_d)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!Rr(n.href)&&h(n.textContent??""));return o?h(o.textContent??""):t.replace(em,"").replaceAll("-"," ")||null}var zr=0,qn;function rm(e){if(!H(e))return;for(let o of Ys())jr(o,"profile");let t=vn();t&&jr(t,"menu")}function me(){zr++;let e=!0;return $e().then(()=>{e&&zr&&!qn&&(qn=C(rm))}),()=>{e&&(e=!1,!--zr&&(qn?.(),qn=void 0))}}var im=new E("SettingsPanel"),g=M("bloom-settings-"),am=10080*60*1e3,sm=3e3,js="Toggle features. Some need a reload. Click the sliders icon to configure.",lm=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],cm=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],um={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},Vs=new Set(["chat","ui","privacy"]),V=null,tt="all",Vr="all",Sn="",Jr=[],Js=()=>[...Ae.values()].filter(e=>!e.hidden),dm=e=>!!e.updatedAt&&Date.now()-e.updatedAt<am;function mm(e){switch(tt){case"favorites":return $o.has(e.name);case"recent":return dm(e);case"all":return!0;case"other":return!e.tags.some(t=>Vs.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(tt)}}function fm(e){switch(Vr){case"all":return!0;case"enabled":return yt(e);case"disabled":return!yt(e)}}function pm(e){let t=Sn.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function gm(e){let t=Xo.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return tt==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var Zs=e=>e.settings?.def??{},hm=e=>Object.values(Zs(e)).some(t=>t.type!=="custom");function bm(e,t,o){let n=Oe(e.name,t)??Er(o),r=i=>Je(e.name,t,i);switch(o.type){case"boolean":return Yr(n,r,o.description??t);case"slider":return yn(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return Kr(n,o.options,r);case"string":return io(n,r,o.placeholder);case"number":return io(String(n),i=>r(Number(i)),"","number");case"component":{let i=s("div",{class:g("component")});return Jr.push(o.render(i)),i}case"custom":return null}}var ym=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function Xs(e){if(!V)return;let t=Object.entries(Zs(e)).filter(([,i])=>i.type!=="custom").map(([i,a])=>{let c=bm(e,i,a),l=a.type==="boolean",d=a.type!=="component"&&s("div",{class:g("field-label"),text:ym(i)}),m=a.description&&s("div",{class:g("field-desc"),text:a.description});return s("div",{class:g("field",l?"field-inline":"field-stacked")},(d||m)&&s("div",{class:g("field-text")},d,m),c)}),o,n=j("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},sm);return}clearTimeout(o),e.settings?.reset(),so(),Xs(e)},"danger"),r=s("div",{class:g("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&so()}},s("div",{class:g("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},s("div",{class:g("popup-header")},s("div",{class:g("card-icon")},N(e.icon)),s("div",{class:g("popup-title")},s("div",{class:g("card-name"),text:e.name}),s("div",{class:g("popup-authors"),text:e.authors.join(", ")})),$("close","Close",so)),s("p",{class:g("popup-desc"),text:e.description}),s("div",{class:g("fields")},...t),s("div",{class:g("popup-footer")},n)));V.querySelector(`.${g("modal")}`)?.append(r)}function so(){for(let e of Jr)e();Jr=[],V?.querySelector(`.${g("popup-backdrop")}`)?.remove()}function zs(e){let t=yt(e),o=$o.has(e.name),n=Xo.has(e.name),r=!!e.required;return s("div",{class:[g("card",t?"card-on":"card-off"),r?g("card-required"):""].filter(Boolean).join(" ")},s("div",{class:g("card-top")},s("div",{class:g("card-icon")},N(e.icon)),s("div",{class:g("card-actions")},$("star",o?"Unstar":"Star",()=>{$o.toggle(e.name),et()},o),r?null:$("pin",n?"Unpin":"Pin to top",()=>{Xo.toggle(e.name),et()},n),r?s("span",{class:g("required-mark"),attrs:{"aria-label":"Required",[Se]:"This plugin is required for Bloom++ to work"}},N("alert")):null,hm(e)&&$("gear","Settings",()=>Xs(e)),Yr(t,i=>_a(e,i),r?`${e.name} is required`:`Enable ${e.name}`,r))),s("div",{class:g("card-name"),text:e.name}),s("div",{class:g("card-desc"),text:e.description,title:e.description}),s("div",{class:g("card-footer"),text:e.authors.join(", ")}))}function $s(){let e=Js().some(o=>!o.tags.some(n=>Vs.has(n)));V?.querySelector(`.${g("tabs")}`)?.replaceChildren(...lm.filter(o=>o.id!=="other"||e).map(o=>s("button",{class:g("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===tt)},on:{click:()=>{tt=o.id,$s(),et()}}})))}function et(){if(!V)return;let e=Js().filter(mm),t=V.querySelector(`.${g("search")} input`);t&&(t.placeholder=`Search ${Yo(e.length,"plugin")}...`);let o=gm(e.filter(d=>pm(d)&&fm(d))),n=tt==="all",r=n?o.filter(d=>!d.required):o,i=n?o.filter(d=>d.required):[],a=[...r.map(zs),...i.length?[s("div",{class:g("required-break"),attrs:{role:"separator"}}),...i.map(zs)]:[]],c=Sn.trim()?"No plugins match your search.":um[tt]??"No plugins available.";V.querySelector(`.${g("grid")}`)?.replaceChildren(...a.length?a:[s("div",{class:g("empty"),text:c})])}function Am(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),V?.querySelector(`.${g("popup-backdrop")}`)?so():Ct())}var _s,Zr;function vm(){if(V)return;let e=s("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=Sn,e.addEventListener("input",()=>{Sn=e.value,et()}),V=s("div",{class:`bloom-root ${g("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&Ct()}},s("div",{class:g("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},s("div",{class:g("header")},s("div",{class:g("logo")},N("bloom")),s("h2",{class:g("title"),text:"Bloom++"}),s("span",{class:g("hint"),attrs:{"aria-label":js,tabindex:"0",[Se]:js}},N("info")),s("span",{class:g("version"),text:"v2.0.88"}),$("close","Close",Ct)),s("div",{class:g("tabs"),attrs:{role:"tablist"}}),s("div",{class:g("toolbar")},s("label",{class:g("search")},N("search"),e),Kr(Vr,cm,t=>{Vr=t,et()})),s("div",{class:g("grid")}))),V.addEventListener("keydown",t=>t.stopPropagation()),Zr=new AbortController,document.addEventListener("keydown",Am,{capture:!0,signal:Zr.signal}),document.body.append(V),$s(),et(),_s=os(et),e.focus(),im.debug("Opened")}function Ct(){so(),Zr?.abort(),_s?.(),V?.remove(),V=null}var wn=()=>V?Ct():vm();var el=`/*
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
`;var Ne=M("bloom-entry-"),Sm=4,Xr="--bloom-entry-x",$r=1,Mt=p({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar. The account menu and the userscript menu always open the panel.",default:!1},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:!0},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:e=>(e.append(j("Reset position",()=>{Mt.store.entryPosition=$r})),()=>e.replaceChildren())},entryPosition:{type:"custom",default:$r}}),He=new Map,tl=!1,ol=[];function wm(e,t,o){let n=e.currentTarget,r=t.clientWidth-n.offsetWidth;if(e.button!==0||r<=0||!t.classList.contains(Ne("hover")))return;let i=Mt.store.entryPosition,a=i,c=!1,l=new AbortController;n.setPointerCapture(e.pointerId),n.addEventListener("pointermove",m=>{!c&&Math.abs(m.clientX-e.clientX)<Sm||(c=!0,o(),a=se(i+(m.clientX-e.clientX)/r,0,$r),t.style.setProperty(Xr,String(a)))},{signal:l.signal});let d=()=>{l.abort(),c&&(Mt.store.entryPosition=a,t.style.removeProperty(Xr))};n.addEventListener("pointerup",d,{signal:l.signal}),n.addEventListener("lostpointercapture",d,{signal:l.signal})}function xm(e){let t=!1,o=s("button",{class:Ne("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),t||wn(),t=!1},pointerdown:r=>{t=!1,e!=="rail"&&wm(r,n,()=>{t=!0})}}},N("bloom"),e!=="rail"&&s("span",{class:Ne("label"),text:"Bloom++"})),n=s("div",{class:`bloom-root ${Ne("wrap")} ${Ne(e)}`,attrs:{"data-bloom":"entry"}},o);return n}function Em(e){let t=s("div",{class:`bloom-root ${Ne("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),wn()}}},N("bloom"),s("span",{text:"Bloom++"})),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function nl(){let{showSidebarEntry:e,showSidebarEntryOnHover:t}=Mt.store,o=e||t?Us():[];for(let[r,i]of He)r.isConnected&&o.some(a=>a.anchor===r)||(i.remove(),He.delete(r));for(let r of o){let i=He.get(r.anchor);if(i?.isConnected||!qe(r.anchor))continue;let a=i??xm(r.kind);He.set(r.anchor,a),r.insert(a)}for(let r of He.values())r.classList.toggle(Ne("hover"),!e);let n=vn();n&&!n.querySelector('[data-bloom="menu-entry"]')&&Em(n)}var rl=f({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:Mt,styles:()=>`${el}.${Ne("hover")}{${Xr}:${Mt.store.entryPosition}}`,start(){for(let e of document.querySelectorAll('[data-bloom="entry"]'))e.remove();He.clear(),ol=[C(nl),Rs(),me()],!tl&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",wn),tl=!0)},stop(){for(let e of ol)e();for(let e of He.values())e.remove();He.clear(),Ct()},onSettingsChange:nl});var Tm=80,Cm=420;function _r(e,t,o){return(e.x-o.x)*(t.y-o.y)-(t.x-o.x)*(e.y-o.y)}function Mm(e,t,o,n){let r=_r(e,t,o),i=_r(e,o,n),a=_r(e,n,t);return!((r<0||i<0||a<0)&&(r>0||i>0||a>0))}function Lm(e,t){let o=(t.left+t.right)/2-(e.left+e.right)/2,n=(t.top+t.bottom)/2-(e.top+e.bottom)/2;if(Math.abs(o)>=Math.abs(n)){let i=o<0?t.right:t.left;return[{x:i,y:t.top},{x:i,y:t.bottom}]}let r=n<0?t.bottom:t.top;return[{x:t.left,y:r},{x:t.right,y:r}]}function il(e,t){let o=se(e.x,t.left,t.right),n=se(e.y,t.top,t.bottom);return Math.hypot(e.x-o,e.y-n)}function xn(e){let t=e.closeDelay??Tm,o=e.towardDelay??Cm,n=0,r=!1,i=null,a=null,c=()=>{document.removeEventListener("pointermove",A,!0)},l=()=>{n&&window.clearTimeout(n),n=0,c(),i=null,a=null},d=()=>{l(),r&&(r=!1,e.setHeld(!1))},m=()=>{r||(r=!0,e.setHeld(!0))},v=S=>{n&&window.clearTimeout(n),n=window.setTimeout(d,S)},F=S=>{let oe=e.panel(),gt=e.trigger();if(!oe||!i)return!1;let Z=oe.getBoundingClientRect();if(Z.width<=0&&Z.height<=0)return!1;let Y=gt?.getBoundingClientRect(),[yr,Yu]=Y&&(Y.width||Y.height)?Lm(Y,Z):[{x:Z.left,y:Z.top},{x:Z.right,y:Z.bottom}];return Mm(S,i,yr,Yu)?!0:a!=null&&il(S,Z)<il(a,Z)-.25},A=S=>{let oe={x:S.clientX,y:S.clientY};if(e.over(S.target)){l();return}F(oe)?v(o):d(),a=oe};return{enter(){l()},leave(S){if(e.over(S.relatedTarget)){l();return}i={x:S.clientX,y:S.clientY},a=i,m(),document.addEventListener("pointermove",A,!0),v(t)},dispose(){l(),r=!1}}}var al=`/*
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
`;var T=M("bloom-nav-"),Cn=80,Im=1200,Bm=2,sl=3e4,Pm=200,Om=.9,Rm=.28,Dm=24,Lt=8,Hm=80,Nm=12,ei=80,dl=`${u.rightPanel}, ${u.summaryPanel}`,Um={user:"\u2753",assistant:"\u{1F916}"},Gm=["wheel","touchmove","pointerdown"],Ln=p({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),b=null,O=[],ae=-1,ot=-1,kt=null,nt="",oi=0,ni=[],mo=null,En=null,Tn=new Set,we,lo,xe,ri="",co=[],Mn=null,ii=new Set,Fm=e=>Ln.store.showAssistant||e.role==="user",Ym=e=>e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.messageIds[0]||e.role;function Km(e){return{role:e.role,summary:wt(e),ids:e.messageIds,turn:e,streaming:e.streaming}}function ml(e,t){let o=e.entries.at(-1);if(o?.role==="assistant"&&t.role==="assistant"){e.entries[e.entries.length-1]={...t,ids:[...new Set([...o.ids,...t.ids])]};return}e.entries.push(t)}function Qm(){let e=[];for(let t of Re()){let o=Km(t),n=Ym(t),r=e.at(-1);r?.key===n?ml(r,o):e.push({key:n,entries:[o]})}return e}function Wm(){let e=[];for(let t of le(y())?.chain??[]){let o={role:t.role,summary:fn(t),ids:[t.id],turn:null,streaming:!1},n=e.at(-1);t.role==="assistant"&&n?ml(n,o):e.push({key:t.id,entries:[o]})}return e}var It=e=>e.entries.flatMap(t=>t.ids);function ai(e,t){let o=new Set(It(e));return It(t).some(n=>o.has(n))}var rt=e=>h(e.entries.find(t=>t.role==="user")?.summary??""),ti=(e,t)=>e.filter(o=>rt(o)===t).length,si=e=>({...e,turn:null,streaming:!1});function jm(e,t){let o=new Set(t.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return e.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return si(r);let a=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return a&&a!==n.key?si(r):r})}))}function zm(e,t){let o=t.entries.map((n,r)=>{let i=e.entries[r];if(!i)return n;let a=[...new Set([...n.ids,...i.ids])];return{...n,ids:a,summary:n.summary||i.summary}});for(let n of e.entries.slice(o.length))o.push(si(n));return{key:e.key,entries:o}}function fl(){let e=oo();if(!e)return!1;let t=e.clientHeight-e.scrollHeight;return e.scrollTop-t<=Math.abs(e.scrollTop)}function Vm(e,t){let o=jm(e,t);if(!t.length)return o;if(!o.length)return t;let n=t.findIndex(l=>o.some(d=>d.key===l.key));if(n<0)return fl()?t.concat(o):o.concat(t);let r=t[n]?.key,i=o.findIndex(l=>l.key===r),a=o.slice(0,i).concat(t.slice(0,n),o.slice(i)),c=a.findIndex(l=>l.key===r);for(let l=n;l<t.length;l++){let d=t[l];if(!d)continue;let m=a.findIndex(v=>v.key===d.key);if(m>=0){let v=a[m];v&&(a[m]=zm(v,d)),c=m}else a.splice(c+1,0,d),c++}return a}function Jm(e,t){let o=0,n=0,r=0;for(let i=1-e.length;i<t.length;i++){let a=0,c=0;for(let d=0;d<e.length;d++){let m=t[d+i],v=e[d];!m||!v||(ai(v,m)?(a+=3,c++):rt(v)&&rt(v)===rt(m)&&a++)}let l=fl()?i<r:i>r;(a>o||a===o&&c>n||a===o&&c===n&&l)&&(o=a,n=c,r=i)}return{score:o,offset:r}}function Zm(e,t){let o=e.entries.map((n,r)=>{let i=t.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of t.entries.slice(o.length))o.push({...n,turn:null});return{key:e.key,entries:o}}function Xm(e){return e.map(t=>({key:t.key,entries:t.entries.map(o=>({...o}))}))}function $m(e,t){if(!t.length)return e;if(!e.length)return t;let{score:o,offset:n}=Jm(e,t),r=Xm(e);if(o>0)for(let c=0;c<r.length;c++){let l=t[c+n],d=r[c];if(!l||!d)continue;let m=rt(d),v=!!m&&m===rt(l)&&ti(e,m)===1&&ti(t,m)===1;(ai(d,l)||v)&&(r[c]=Zm(d,l))}let i=[],a=[];for(let c=0;c<t.length;c++){let l=t[c];if(!l)continue;let d=rt(l);!d||ti(r,d)>0||r.some(m=>ai(m,l))||(o>0&&c<n?i.push(l):a.push(l))}return i.concat(r,a)}var li=e=>e.entries.some(t=>t.turn?.el.isConnected);function _m(e,t,o){let n=e.findIndex(i=>It(i).includes(t));if(n>=0)return n+1;let r=e.find(li);return o&&r&&It(r).includes(o)?0:e.length}function ef(e){if(Mn){let{parent:t,user:o}=Mn;for(let n of e.slice(_m(e,t,o))){let r=It(n);if(!li(n)&&!(o&&r.includes(o)))for(let i of r)ii.add(i)}}return e.filter(t=>li(t)||!It(t).some(o=>ii.has(o)))}function pl(){co=[],Mn=null,ii.clear()}function tf(){let e=xs();e!==ri&&(ri=e,pl());let t=Qm(),o=Wm();return!t.length&&!o.length&&!ws()?(co=[],[]):(co=ef($m(Vm(co,t),o)),co.flatMap(n=>n.entries).filter(Fm))}function of(e){for(let o of e)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!R().generating||e.some(o=>o.streaming))return;let t=e.at(-1);t&&(t.role==="assistant"||!Ln.store.showAssistant?t.streaming=!0:e.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function gl(){let e=tf();return of(e),e}function hl(e){let t=e.getBoundingClientRect(),o=Q()?.getBoundingClientRect().top,n=Math.min(t.bottom,o&&o>t.top?o:t.bottom);return{top:t.top,bottom:n}}function bl(e){return((e.matches(".whitespace-pre-wrap, .markdown, .prose, [data-markdown-text-style]")?e:e.querySelector(".whitespace-pre-wrap")??e.querySelector(".markdown, .prose, [data-markdown-text-style]"))??e).getBoundingClientRect().top}function ll(e){let t=O[e]?.turn?.el;return t?.isConnected?t:null}function nf(e){if(!O.length)return null;let t=e.scrollHeight-e.clientHeight,o=Nr(e),n=Math.min(e.scrollTop,0),r=o?-n:t-e.scrollTop,i=o?t+n:e.scrollTop,a=t<=Lt||r<=Lt,c=t>Lt&&i<=Lt,{top:l,bottom:d}=hl(e),m=ll(0),v=m?bl(m):Number.NaN,F=!!m&&v>=l-Lt&&v<=l+48,A=ll(O.length-1),S=A?.getBoundingClientRect().bottom??Number.NaN,oe=!!A&&S<=d+Lt&&S>=d-Hm;return a||oe?"bottom":c||F?"top":null}function rf(e){let{top:t,bottom:o}=hl(e),n=t+Math.max(o-t,0)*Rm,r=[],i=-1;if(O.forEach((c,l)=>{let d=c.turn?.el;if(!d?.isConnected){r.push(Number.NaN);return}let m=bl(d);r.push(m),i<0&&(i=l),m<=n&&(i=l)}),i<0)return Math.max(O.findIndex(c=>c.turn),0);let a=r[ae];return Number.isFinite(a)?i===ae?ae:i>ae?i:a<=n+Dm?ae:i:i}function af(e){let t=nf(e);return t==="bottom"?O.length-1:t==="top"?0:rf(e)}function cl(e){Ln.store.jumpEffect==="border"&&(e.classList.add(T("flash")),setTimeout(()=>e.classList.remove(T("flash")),Im))}function kn(e){let t=O[e],o=oo();if(!t||!o)return;if(!t.turn&&!t.ids.length){ot=e,uo(),o.scrollTo({top:Nr(o)?0:o.scrollHeight});return}ot=e,kt=e?null:{chat:y(),first:t.ids[0],until:Date.now()+sl},uo();let n=t.turn?.el;if(n?.isConnected){let d=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:d<o.clientHeight*Bm?"smooth":"auto"}),cl(n);return}let r=O.findIndex(d=>d.turn),i=r>=0&&e<r?-1:1,a=++oi,c=Date.now()+sl,l=()=>{let d=oo();if(a!==oi||Date.now()>c||!d)return;O=gl();let m=O.find(F=>F.ids.some(A=>t.ids.includes(A)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),cl(m),ot=O.findIndex(F=>F.turn?.el===m),uo();return}let v=d.scrollTop;d.scrollBy({top:i*d.clientHeight*Om,behavior:"instant"}),d.scrollTop===v?setTimeout(l,Pm):requestAnimationFrame(l)};l()}function sf(e,t){return s("button",{class:T("row"),attrs:{type:"button","data-index":String(t),"data-message-id":e.ids[0]??""},on:{click:()=>kn(t)}},s("span",{text:Um[e.role]}),s("span",{class:"bloom-truncate",text:ce(e.summary||"\u2026",Cn)}))}function lf(e,t){let o=e.offsetWidth?t.width/e.offsetWidth:1;return t.left+(e.clientLeft+e.clientWidth)*o}function cf(e){let t=1/0;for(let o of document.querySelectorAll(dl)){if(!ze(o))continue;let n=o.getBoundingClientRect();n.width<ei||n.height<ei||n.left<e.left+ei||n.left<t&&(t=n.left)}return Number.isFinite(t)?t:null}function ul(e){if(!b)return;let t=e.getBoundingClientRect(),o=Q()?.getBoundingClientRect().top,r=Math.min(t.bottom,o&&o>t.top?o:t.bottom)-t.top,i=Math.min(lf(e,t),cf(t)??1/0);b.style.right=`${document.documentElement.clientWidth-i+Nm}px`,b.style.top=`${t.top}px`,b.style.height=r>1?`${r}px`:""}function uf(){let e=oo();if(O=gl(),!O.length||!e){xe?.dispose(),xe=void 0,b?.remove(),b=null,nt="";return}if(mo!==e){lo?.abort(),lo=new AbortController,e.addEventListener("scroll",Pe(uo),{passive:!0,signal:lo.signal});for(let n of Gm)e.addEventListener(n,Al,{passive:!0,signal:lo.signal});mo=e,we?.disconnect(),we=new ResizeObserver(()=>{e.isConnected&&ul(e)}),we.observe(e),En=null,Tn=new Set}let t=Q();if(t&&t!==En&&we&&(we.observe(t),En=t),we)for(let n of document.querySelectorAll(dl))Tn.has(n)||(we.observe(n),Tn.add(n));pf(),ul(e);let o=JSON.stringify(O.map(n=>[n.role,n.ids]));o!==nt?(nt=o,ot=-1,mf(),kt&&Date.now()<kt.until&&kt.chat===y()&&O[0]?.ids[0]!==kt.first&&kn(0)):df(),uo()}function uo(){if(!b||!mo)return;ae=ot>=0?ot:af(mo),b.querySelectorAll(`.${T("tick")}`).forEach((t,o)=>t.classList.toggle(T("tick-current"),o===ae)),b.querySelectorAll(`.${T("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===ae)));let e=b.querySelector(`.${T("toc-head")}`);e&&(e.textContent=`${ae+1} / ${O.length}`)}function df(){b?.querySelectorAll(`.${T("tick")}`).forEach((e,t)=>{let o=O[t],n=ce(o.summary,Cn);e.title!==n&&(e.title=n),e.classList.toggle(T("tick-streaming"),o.streaming)}),b?.querySelectorAll(`.${T("row")}`).forEach(e=>{let t=e.lastElementChild,o=ce(O[Number(e.dataset.index)].summary||"\u2026",Cn);t&&t.textContent!==o&&(t.textContent=o)})}function mf(){b?.querySelector(`.${T("rail")}`)?.replaceChildren(...O.map((t,o)=>s("button",{class:Qo(T("tick"),T(`tick-${t.role}`),t.streaming&&T("tick-streaming"),o===ae&&T("tick-current")),title:ce(t.summary,Cn),attrs:{type:"button","aria-label":`Jump to message ${o+1}`,"data-message-id":t.ids[0]??""},on:{click:()=>kn(o)}}))),b?.querySelector(`.${T("toc-list")}`)?.replaceChildren(...O.map(sf))}var fe=Pe(uf);function ci(e){if(e===b)return;let t=e.__bloomNavStop;if(t&&t!==ui)try{t()}catch{}e.isConnected&&e!==b&&e.remove()}function yl(){let e=[...document.querySelectorAll('[data-bloom="navigator"]')];if(b&&!b.isConnected&&(b=null),b&&e.includes(b)){for(let t of e)ci(t);return}b=e[0]??null;for(let t of e.slice(1))ci(t)}function ff(){xe?.dispose(),xe=xn({over:e=>e instanceof Node&&!!b?.contains(e),trigger:()=>b?.querySelector(`.${T("rail")}`),panel:()=>b?.querySelector(`.${T("toc")}`),setHeld:e=>b?.classList.toggle(T("open"),e)})}function pf(){yl(),b&&!b.querySelector(`.${T("rail")}`)&&(b.remove(),b=null,nt=""),b||(b=s("div",{class:`bloom-root ${T("root")}`,attrs:{"data-bloom":"navigator"},on:{pointerenter:()=>xe?.enter(),pointerleave:e=>xe?.leave(e)}},s("div",{class:T("rail")}),s("div",{class:T("bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:T("toc")},s("div",{class:T("toc-head")}),s("div",{class:T("toc-list")}))),nt=""),xe||ff(),b.isConnected||document.body.append(b),b.querySelector(`.${T("tick")}`)||(nt=""),b.__bloomNavStop=ui}function Al(){ot=-1,kt=null,oi++}function ui(){for(let e of ni)e();ni=[],lo?.abort(),we?.disconnect(),we=void 0,mo=null,En=null,Tn=new Set,removeEventListener("keydown",vl,!0),removeEventListener("resize",fe),xe?.dispose(),xe=void 0,b&&delete b.__bloomNavStop,b?.remove(),b=null,nt="",pl(),ri="";for(let e of document.querySelectorAll('[data-bloom="navigator"]'))ci(e)}var gf=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function vl(e){if(!b||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||gf(document.activeElement)||K("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:ae-1,ArrowDown:ae+1,Home:0,End:O.length-1}[e.key];if(o==null){Al();return}o<0||o>=O.length||(e.preventDefault(),e.stopPropagation(),kn(o))}var ql=f({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:Ln,styles:al,start(){yl(),ni=[C(e=>H(e)&&fe()),de(fe),W.on("conversation",fe),W.on("generate-start",({parentId:e,userId:t})=>{e&&(Mn={parent:e,user:t},fe())}),w.on("rise",fe),w.on("fall",fe)],addEventListener("keydown",vl,!0),addEventListener("resize",fe,{passive:!0}),fe()},stop:ui,onSettingsChange:fe});var Sl=`/*
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
`;var _=M("bloom-quotes-"),Ai="BloomBetterQuotes",bf=40,Tl=8,yf=1800,pi=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,wl=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,it=p({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),di,mi,Bt,fi=!1,gi=0,In=null,Bn=null,Ee=null;function vi(){return location.pathname.match(/\/c\/(?!local-)([\w-]+)/)?.[1]??(new URLSearchParams(location.search).get("temporary-chat")==="true"?"temporary":"draft")}function On(){try{let e=JSON.parse(sessionStorage.getItem(Ai)??"[]");return Array.isArray(e)?e.filter(t=>!!t&&typeof t=="object"&&typeof t.id=="string"&&typeof t.text=="string"&&!!t.text):[]}catch{return[]}}function qi(e){try{sessionStorage.setItem(Ai,JSON.stringify(e.slice(-bf)))}catch{}}function fo(e){return On().find(t=>t.id===e)?.text??""}function Af(e,t){let o=On().filter(n=>n.id!==e);o.push({id:e,text:t}),qi(o)}function hi(e=vi()){qi(On().filter(t=>t.id!==e)),Pn()}function vf(e){let t=fo("draft");if(!t||fo(e))return;let o=On().filter(n=>n.id!=="draft");o.push({id:e,text:t}),qi(o)}function bi(e){return`${e.getAttribute("aria-label")??""} ${e.getAttribute("title")??""}`}function qf(e){let t=bi(e);return wl.test(t)&&!/quote|引用/.test(t)?!1:/quote|引用/.test(t)&&pi.test(t)?!0:pi.test(t)&&!wl.test(t)}function Cl(e){let t=e.cloneNode(!0),o=[...t.querySelectorAll("button, [role='button']")],n=new Set(o.map(r=>r.getAttribute("aria-label")).filter(Boolean));for(let r of o)r.remove();for(let r of t.querySelectorAll("*"))!r.children.length&&n.has(h(r.textContent??""))&&r.remove();return h(t.textContent??"")}function Sf(e){let t=Q(),o=e.parentElement,n=0;for(;o&&o!==t&&n<5;){if(n++,o.matches(u.composerInput)||o.querySelector(u.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=Cl(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function Rn(){let e=Q();if(!e)return null;for(let t of e.querySelectorAll("button, [role='button']")){if(t.closest("[data-bloom]")||!qf(t))continue;let o=Sf(t),n=o?Cl(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:t}}return null}function wf(e){let t=e.closest(u.searchUnit)??e.closest(u.oldMessage);return t&&(qt(t)??t.getAttribute("data-message-author-role"))==="user"?t:null}function Si(e){return h(e).slice(0,48)}function xf(e,t){let o=Si(e);if(o.length<Tl)return null;let n=null;for(let r of St()){if(t&&(r===t||t.contains(r)||r.contains(t)))continue;let i=h(r.textContent??"");if(!i.includes(o))continue;let a=o.length/Math.max(i.length,1);(!n||a>n.score)&&(n={el:r,score:a})}return n?.el??null}function Ef(e,t){let o=Si(t),n=e;for(let r of e.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&h(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${_("hit")}`)?.classList.remove(_("hit")),n.classList.add(_("hit")),window.clearTimeout(gi),gi=window.setTimeout(()=>n.classList.remove(_("hit")),yf)}function xl(e){let t=e.closest(u.timelineScroll)??document.scrollingElement;if(!(t instanceof HTMLElement)&&t!==document.scrollingElement)return;let o=e.getBoundingClientRect();if(o.height<1||!t)return;let n=t.getBoundingClientRect(),r=Q()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,a=o.top+o.height/2-(n.top+i)/2;Math.abs(a)<8||t.scrollTo({top:t.scrollTop+a,behavior:"smooth"})}function wi(){if(!Ee||!In?.isConnected)return;let e=In.getBoundingClientRect();e.width<1||(Ee.style.top=`${Math.max(8,e.top+8)}px`,Ee.style.left=`${Math.max(8,e.right-Ee.offsetWidth-8)}px`)}function Tf(e,t,o){In=e,Bn=t,Ee??=s("button",{class:`bloom-root ${_("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),Ee.isConnected||document.body.append(Ee),Ef(e,o),wi()}function El(){Ee?.remove(),Ee=null,In=null,Bn=null,document.querySelector(`.${_("hit")}`)?.classList.remove(_("hit"))}function Ml(){return document.querySelector('[data-bloom="quote-chip"]')}function Pn(){Ml()?.remove()}function Cf(e){let o=Q()?.getBoundingClientRect();!o||o.width<8||(e.style.width=`${Math.max(120,o.width-24)}px`,e.style.left=`${o.left+12}px`,e.style.top=`${Math.max(8,o.top-e.offsetHeight-8)}px`)}function Mf(e){let t=Ml();t||(t=s("div",{class:`bloom-root ${_("chip")}`,attrs:{"data-bloom":"quote-chip"}},s("span",{class:_("text")}),s("button",{class:_("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(t));let o=t.querySelector(`.${_("text")}`),n=h(e);o&&o.textContent!==n&&(o.textContent=n),t.dataset.text=e,Cf(t)}function yi(){if(!fi){fi=!0;try{let e=vi(),t=Rn();it.store.persistAcrossChats&&t&&fo(e)!==t.text&&Af(e,t.text);let o=it.store.persistAcrossChats?fo(e):"";!o||t&&h(t.text)===h(o)?Pn():Mf(o),wi()}finally{fi=!1}}}function Lf(e){let t=e.closest('[data-bloom="quote-chip"]');if(t instanceof HTMLElement&&!e.closest(`.${_("x")}`)){let i=t.dataset.text??t.querySelector(`.${_("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:t}:null}let o=e.closest("blockquote");if(o instanceof HTMLElement&&!e.closest("a, button")){let i=wf(o),a=h(o.textContent??"");if(i&&a)return{text:a,skip:i,origin:o}}let n=Q();if(!n||!n.contains(e)||Xe(e)||e.closest("button, [role='button']"))return null;let r=Rn();return!r||!r.row.contains(e)?null:{text:r.text,skip:null,origin:r.row}}function kf(e){let{target:t}=e;if(!(t instanceof Element))return;if(t.closest('[data-bloom="quote-back"]')){e.preventDefault(),e.stopPropagation(),Bn?.isConnected&&xl(Bn);return}if(t.closest(`.${_("x")}`)){e.preventDefault(),e.stopPropagation(),hi();return}let o=Rn();if(o&&(t===o.dismiss||o.dismiss.contains(t))){hi();return}if(If(t)&&Ll(),!it.store.jumpToPassage)return;let n=Lf(t);if(!n)return;let r=xf(n.text,n.skip);r&&(e.preventDefault(),e.stopPropagation(),Tf(r,n.origin,n.text),xl(r))}function If(e){let t=e.closest("button, [role='button']");return!(t instanceof HTMLElement)||t.closest("[data-bloom]")||!Q()?.contains(t)?!1:/send|submit|发送|提交/i.test(bi(t))&&!pi.test(bi(t))}function Bf(e){return!(e instanceof KeyboardEvent)||e.key!=="Enter"||e.shiftKey||e.isComposing?!1:Xe(e.target)}function Ll(){if(!it.store.persistAcrossChats)return;let e=vi(),t=fo(e);if(t){if(!Rn()){let o=k(),n=Si(t);n.length>=Tl&&!h(o).includes(n)&&ie(`> ${t}

${o}`.trim())}hi(e)}}function Pf(e){Bf(e)&&Ll()}function Of(e){!e.prevId&&e.id&&vf(e.id),yi()}var kl=f({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:it,styles:Sl,onSettingsChange(e){e==="jumpToPassage"&&!it.store.jumpToPassage&&El(),e==="persistAcrossChats"&&!it.store.persistAcrossChats&&(sessionStorage.removeItem(Ai),Pn()),yi()},start(){Bt=new AbortController,document.addEventListener("pointerdown",kf,{capture:!0,signal:Bt.signal}),document.addEventListener("keydown",Pf,{capture:!0,signal:Bt.signal}),addEventListener("scroll",wi,{capture:!0,passive:!0,signal:Bt.signal}),mi=de(Of),di=C(e=>H(e)&&yi())},stop(){Bt?.abort(),Bt=void 0,mi?.(),mi=void 0,di?.(),di=void 0,window.clearTimeout(gi),El(),Pn()}});var Il=`/*
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
`;var Df=M("bloom-cls"),Hf="bloom-cls",Nf=600*1e3,Ei=Ca("tab"),Ot=new Map,go=new Map,Pt=null,Bl=[],Uf=e=>e==="streaming"||e==="error";function Gf(){let e=new Map,t=Date.now();for(let[o,n]of go)t-n.at>Nf?go.delete(o):e.set(o,n.status);for(let[o,n]of Ot)e.set(o,n);return e}function Ff(e){return s("span",{class:`bloom-root ${Df("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&N("alert"))}function po(){let e=Gf(),t=new Set;for(let[o,n]of e)for(let r of ao(o)){if(!qe(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let a=Ff(n);t.add(a),r.append(a)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function Dn(e,t){e&&(t?Ot.set(e,t):Ot.delete(e),Pt?.postMessage({tab:Ei,id:e,status:t}),po())}function Yf({data:e}){!P(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===Ei||(Uf(e.status)?go.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):go.delete(e.id),po())}function xi(){for(let e of Ot.keys())Pt?.postMessage({tab:Ei,id:e,status:null})}var Pl=f({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:()=>`${Il}`,start(){Pt=typeof BroadcastChannel=="function"?new BroadcastChannel(Hf):null,Pt?.addEventListener("message",Yf),addEventListener("pagehide",xi),Bl=[w.on("rise",({conversationId:e})=>Dn(e,"streaming")),w.on("fall",({conversationId:e,outcome:t})=>Dn(e,t==="error"?"error":null)),w.on("context",({prevId:e,id:t,migrated:o})=>{o&&R().generating?Dn(t,"streaming"):!o&&Ot.get(e??"")==="streaming"&&Dn(e,null)}),C(e=>H(e)&&po())],y()&&po()},stop(){for(let e of Bl)e();xi(),Pt?.close(),Pt=null,removeEventListener("pagehide",xi),Ot.clear(),go.clear(),po()}});var Rl=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],Un={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Kf={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Qf="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Ti=32,Gn=64,Ci="#FCFCFC",Mi="#111111",Wf=14,Fn=51.5,jf=12.5,zf=9.75,Ol=52,Vf=10.5,Jf=7.75,Zf={rotate:e=>e.arc(Fn,Fn,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function Hn(e){let t=document.createElement("canvas");t.width=t.height=Ti;let o=t.getContext("2d");return o?(o.scale(Ti/Gn,Ti/Gn),e(o),t.toDataURL("image/png")):""}function Nn(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D(Qf);o&&(e.strokeStyle=Mi,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function Yn(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function Xf(e,t){Yn(e,Fn,jf,Mi),Yn(e,Fn,zf,Un[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),Zf[t](e),e.stroke()}function $f(e,t){e.beginPath(),e.roundRect(0,0,Gn,Gn,Wf),e.fillStyle=t,e.fill()}var _f=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function Dl(e,t){switch(e){case"original":return _f(Kf[t]);case"hole":return Hn(o=>Nn(o,Un[t],!0));case"bg":return Hn(o=>{$f(o,Un[t]),Nn(o,Ci,!1)});case"dot":return Hn(o=>{Nn(o,Ci,!0),Yn(o,Ol,Vf,Mi),Yn(o,Ol,Jf,Un[t])});case"badge":return Hn(o=>{Nn(o,Ci,!0),Xf(o,t)})}}var bo="bloom-chat-state-favicon",yo="data-bloom-rel",Ii="data-bloom-media",Hl="bloom-parked-icon",ep="/favicon.ico",Ul=p({style:{type:"select",description:"How the tab icon shows the chat state.",options:Rl,default:"bg"}}),Ue=null,Gl="",Kn=null,Fl="",Nl=new Map,Bi,Li=[],Yl=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${yo}]`)];function Pi(){for(let e of Yl())e.id!==bo&&(e.hasAttribute(yo)||(Fl||=e.href,e.setAttribute(yo,e.rel),e.setAttribute(Ii,e.getAttribute("media")??"")),e.rel!==Hl&&(e.rel=Hl),e.media!=="not all"&&(e.media="not all"))}function tp(){for(let e of Yl()){let t=e.getAttribute(yo);if(t==null)continue;e.rel=t;let o=e.getAttribute(Ii);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(yo),e.removeAttribute(Ii)}}function Kl(){let e=document.getElementById(bo);return e||(e=document.createElement("link"),e.id=bo,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function op(e){if(e==="wait")return Fl||ep;let t=Ul.store.style,o=`${t}:${e}`,n=Nl.get(o);return n||Nl.set(o,n=Dl(t,e)),n}function ki(e){if(e)return"rotate";let t=k();return Ue&&t&&t!==Gl&&(Ue=null),Ue==="error"?"error":Ue==="done"?"done":t?"ready":"wait"}function ho(e,t=!1){if(e===Kn&&!t)return;Kn=e;let o=Kl(),n=op(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function np(){Bi=new MutationObserver(()=>{Pi(),document.head.lastElementChild?.id!==bo&&Kl()}),Bi.observe(document.head,{childList:!0})}var Ql=f({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"HostReady",settings:Ul,start(){Pi(),ho(ki(R().generating),!0),np(),Li=[w.on("rise",()=>{Ue=null,ho("rotate")}),w.on("fall",({outcome:e})=>{Ue=e==="done"||e==="error"?e:null,Gl=k(),ho(ki(!1))}),w.on("context",({migrated:e})=>{e||(Ue=null)}),w.on("tick",({generating:e})=>{Pi(),ho(ki(e))})]},stop(){for(let e of Li)e();Li=[],Bi?.disconnect(),document.getElementById(bo)?.remove(),tp(),Kn=null,Ue=null},onSettingsChange(){ho(Kn??"wait",!0)}});var Ge="data-bloom-invite",rp=/^(?:invite team members|invite members|邀请团队成员|邀请成员)$/i,Wl=':is(button, a:not([href^="/c/"])):not(main *, [role="dialog"] *)',ip={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${u.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])'],hideInvite:[`[${Ge}]`,`div:has(> [${Ge}]:only-child)`]},jl=p({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0},hideInvite:{type:"boolean",description:"Hide Invite team members in the sidebar.",default:!0}}),Qn,Oi=!1;function ap(e){if(H(e))for(let t of document.querySelectorAll(`${Wl}, [${Ge}]`))!t.matches(Wl)||!rp.test(h(t.textContent??""))?t.removeAttribute(Ge):t.hasAttribute(Ge)||t.setAttribute(Ge,"")}var zl=f({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads, notices and Invite team members.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:jl,styles:()=>Be(Object.entries(ip).flatMap(([e,t])=>jl.store[e]?t:[])),start(){Oi=!0,$e().then(()=>{Oi&&!Qn&&(Qn=C(ap))})},stop(){Oi=!1,Qn?.(),Qn=void 0;for(let e of document.querySelectorAll(`[${Ge}]`))e.removeAttribute(Ge)}});var Rt=`form:has(:is(${u.composerInput})), ${u.oldComposerForm}`,Wn='[class*="ComposerLayoutBody"]',Di='[class*="ComposerLayoutRoot"]',sp='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',lp=`:is(${Rt}) ${Wn}, :is(${Rt}):not(:has(${Wn})) ${Di}, :is(${Rt}):not(:has(${Wn})):not(:has(${Di})) :is(${sp})`,cp='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',up='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',dp="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))";var mp="composer-fill",Vl=p({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function fp(){let{opacity:e,blur:t}=Vl.store;if(e>=100)return"";let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${dp} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important;-webkit-backdrop-filter:blur(${t}px)!important`;return`:is(${cp}), :is(${Rt}){${o}}:is(${up}){display:none!important}${lp}{${n}}:is(${Rt}):has(${Wn}) ${Di}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${Rt}) :is(${u.composerInput}){background-color:transparent!important}`}function Ri(){for(let e of document.querySelectorAll(`[data-bloom="${mp}"]`))e.remove()}var Jl=f({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:Vl,styles:fp,start(){Ri()},stop(){Ri()},onSettingsChange(){Ri()}});var pp=1200,gp=8e3,hp=150,bp=20,Zl=6,Ui="continue where you left",yp=/message delivery timed out|please try again/i,Xl=/waiting for the complete answer/i,$l=p({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:Ui,placeholder:Ui}}),Hi=[],zn=0,Ao=!1,vo=0,Ht="",jn="",Gi=0,Nt=!1,qo=!1,Vn=!0,Dt="",Fi=0,Jn=!1,Ap=()=>$l.store.prompt.trim()||Ui;function _l(){return(K(u.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function ec(){let e=_l();return!e||Xl.test(e)||!yp.test(e)?"":e}function vp(){let e=_l();return e&&Xl.test(e)?e:""}function qp(){let e=vt()?.querySelectorAll(u.turn),t=e?.[e.length-1];return`${t?.getAttribute("data-turn-key")??""}:${t?.textContent?.length??0}`}function tc(e,t,o){if(o===zn){if(R().generating||k()!==e||t>=bp){Nt=!1,R().generating||(Ht="");return}nn(),setTimeout(()=>tc(e,t+1,o),hp)}}function Sp(e){let t=zn;if(R().generating||k()&&k()!==e){Nt=!1,Ht="";return}ie(e),Jn=!0,$t(()=>{t===zn&&tc(e,0,t)})}function oc(e){return e===Ht||vo>=Zl||R().generating||k()?!1:(Ht=e,vo+=1,Nt=!0,Sp(Ap()),!0)}function wp(){if(Ao||Nt||qo)return;let e=Date.now(),t=ec();if(t){if(Dt="",t!==jn){jn=t,Gi=e;return}if(e-Gi<pp)return;oc(`${y()??""}:${t}`);return}if(jn="",!vp()){Vn=!0,Dt="";return}if(!Vn||!R().generating||k())return;let n=`${y()??""}:${qp()}`;if(n!==Dt){Dt=n,Fi=e;return}if(e-Fi<gp||vo>=Zl)return;let r=At();r&&(qo=!0,r.click())}function Ni(){zn+=1,Ao=!1,vo=0,Ht="",jn="",Gi=0,Nt=!1,qo=!1,Vn=!0,Dt="",Fi=0,Jn=!1}var nc=f({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:$l,start(){Ni(),Hi=[w.on("rise",()=>{Ao=!1,Ht="",Nt=!1,Jn&&(Jn=!1,Vn=!1,Dt="")}),w.on("fall",({outcome:e})=>{if(qo){qo=!1,e==="left"?Ao=!0:oc(`${y()??""}:stall`);return}(e==="stopped"||e==="left")&&(Ao=!0),e==="done"&&!ec()&&(vo=0)}),w.on("context",({migrated:e})=>{e||Ni()}),w.on("tick",wp)]},stop(){for(let e of Hi)e();Hi=[],Ni()}});var Te=M("bloom-csi-"),xp=256,Ep=160,Zn=1,rc=4,Tp=.1,Cp=.0015,Mp=250;function Lp(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function kp(e){return new Promise((t,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function Ip(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:se(t.x,n,1-n),y:se(t.y,r,1-r)}}function ic(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function Bp(e,t){let o=s("canvas");return o.width=o.height=xp,ic(o,e,t),o.toDataURL("image/png")}function ac(e){let t=null,o={x:U.store.cropX,y:U.store.cropY,zoom:U.store.cropZoom},n,r=s("canvas",{class:Te("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=Ep*devicePixelRatio;let i=s("div",{class:`bloom-muted ${Te("status")}`}),a=s("div",{class:Te("zoom")}),c=s("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(A,S=!0){t&&(o=Ip(t,A),ic(r,t,o),S&&(clearTimeout(n),n=setTimeout(()=>{t&&(U.store.cropX=o.x,U.store.cropY=o.y,U.store.cropZoom=o.zoom,U.store.avatarUrl=Bp(t,o))},Mp)))}function d(){a.replaceChildren(yn(o.zoom,Zn,rc,Tp,"\xD7",A=>l({...o,zoom:A})))}async function m(A,S){i.textContent="";try{t=await kp(A),S&&(U.store.avatarSource=A,o={x:.5,y:.5,zoom:Zn}),e.classList.add(Te("has-image")),d(),l(o,S)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let v=A=>{A?.type.startsWith("image/")&&Lp(A).then(S=>m(S,!0))};c.addEventListener("change",()=>v(c.files?.[0])),r.addEventListener("wheel",A=>{t&&(A.preventDefault(),l({...o,zoom:se(o.zoom*(1-A.deltaY*Cp),Zn,rc)}),d())},{passive:!1}),r.addEventListener("pointerdown",A=>{if(!t)return;r.setPointerCapture(A.pointerId);let S={...o},oe=r.getBoundingClientRect(),gt=Z=>{if(!t)return;let Y=Math.max(oe.width/t.naturalWidth,oe.height/t.naturalHeight)*o.zoom;l({...o,x:S.x-(Z.clientX-A.clientX)/(t.naturalWidth*Y),y:S.y-(Z.clientY-A.clientY)/(t.naturalHeight*Y)})};r.addEventListener("pointermove",gt),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",gt),{once:!0})});let F=s("div",{class:Te("cropper"),attrs:{tabindex:"0"},on:{paste:A=>v([...A.clipboardData?.files??[]].find(S=>S.type.startsWith("image/"))),dragover:A=>A.preventDefault(),drop:A=>{A.preventDefault(),v(A.dataTransfer?.files[0])}}},s("div",{class:Te("stage")},r),s("div",{class:Te("controls")},io("",A=>A.trim()&&void m(A.trim(),!0),"https://\u2026 or data:image/\u2026","url"),s("div",{class:Te("buttons")},j("Choose file",()=>c.click()),j("Reset crop",()=>{l({x:.5,y:.5,zoom:Zn}),d()}),j("Clear",()=>{t=null,e.classList.remove(Te("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),a.replaceChildren(),U.store.avatarUrl="",U.store.avatarSource=""},"danger")),a,i,c));return e.append(F),U.store.avatarSource&&m(U.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var sc=`/*
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
`;var So="data-bloom-csi-avatar",Yi="data-bloom-csi-sized",dc="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",Op=32,U=p({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>ac(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),lc=[];function mc(e){e.removeAttribute(So),e.removeAttribute(Yi)}function cc(e){return(U.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function uc(e=[]){if(!H(e))return;let t=U.store.displayName.trim()||null,o=!!U.store.avatarUrl,n=new Set(t?cc("name"):[]);for(let i of document.querySelectorAll(dc))n.has(i)||Ve(i,null);for(let i of n)Ve(i,t);let r=new Set(o?cc("avatar"):[]);for(let i of document.querySelectorAll(`[${So}]`))r.has(i)||mc(i);for(let i of r)i.hasAttribute(So)||i.setAttribute(So,""),i.toggleAttribute(Yi,!i.closest('[role="menu"]'))}function Rp(){let e=U.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${U.store.avatarSize}px}:is(${u.rail}, ${u.oldRail}) [${Yi}]{--bloom-csi-size:${Op}px}`:""}var fc=f({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:U,styles:()=>`${Rp()}
${sc}`,start(){lc=[me(),C(uc)]},stop(){for(let e of lc)e();for(let e of document.querySelectorAll(`[${So}]`))mc(e);for(let e of document.querySelectorAll(dc))Ve(e,null)},onSettingsChange(){uc()}});var Ut=M("bloom-greeting-"),pc=30,gc=100;function hc(e){let t=-1,o=s("textarea",{class:`bloom-input ${Ut("input")}`,attrs:{maxlength:String(gc),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=j("Add",i),r=s("div",{class:Ut("list")});function i(){let l=o.value.trim().slice(0,gc);if(!l)return;let d=[...I.store.greetings];t>=0?d[t]=l:d.length<pc&&d.push(l),I.store.greetings=d,t=-1,o.value="",a()}function a(){let{greetings:l}=I.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&l.length>=pc,r.replaceChildren(...l.length?l.map((d,m)=>s("div",{class:Ut("row",m===t?"row-editing":"row-idle")},s("div",{class:Ut("text"),text:d}),$("edit","Edit",()=>{t=m,o.value=d,o.focus(),a()}),$("trash","Delete",()=>{I.store.greetings=l.filter((v,F)=>F!==m),t===m&&(t=-1),a()}))):[s("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),e.append(s("div",{class:Ut("editor")},r,s("div",{class:Ut("form")},o,n))),a();let c=bt((l,d)=>l==="GreetingCustomizer"&&d==="greetings"&&a());return()=>{c(),e.replaceChildren()}}var bc=`/*
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
`;var $n="data-bloom-greeting",Hp=1e3,Np=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],I=p({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>hc(e)},greetings:{type:"custom",default:Np},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),Xn,yc=[],Ki,To=()=>dn()&&!ue(),Up=e=>e.replaceAll(/\s*\n\s*/g," ").trim(),vc=()=>I.store.greetings.filter(e=>typeof e=="string"&&e.trim());function Co(){let e=vc();if(e.length)if(I.store.order==="random"&&e.length>1){let t=I.store.lastRandom;for(;t===I.store.lastRandom;)t=Math.floor(Math.random()*e.length);I.store.lastRandom=t,I.store.index=t}else I.store.index=(I.store.index+1)%e.length}function Gp(){return To()?K(u.homeHeading):null}function wo(){for(let e of document.querySelectorAll(`[${$n}]`))e.removeAttribute($n),Ve(e,null)}function xo(){for(let e of document.querySelectorAll("[data-bloom-placeholder]"))e.removeAttribute("data-bloom-placeholder")}function Ac(e){let t=ve(),o=Up(e);if(!t||!o||k(t)){xo();return}t.getAttribute("data-bloom-placeholder")!==o&&t.setAttribute("data-bloom-placeholder",o)}function Eo(){let e=vc(),t=ys(),o=To();if(!e.length||!t&&!o){wo(),xo();return}if(t){wo(),Ac(e[0]??"");return}let n=Gp();n?((I.store.index<0||I.store.index>=e.length)&&Co(),n.setAttribute($n,""),Ve(n,e[Math.max(0,I.store.index)%e.length]??"")):wo(),I.store.heroOnlyOutsideProject?xo():Ac(e[Math.max(0,I.store.index)%e.length]??"")}function Qi(){clearInterval(Xn),Xn=void 0,I.store.mode==="interval"&&To()&&(Xn=setInterval(()=>{Co(),Eo()},I.store.intervalSec*Hp))}function Fp(e){I.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${$n}]`)||getSelection()?.toString()||(Co(),Eo())}function Yp(){To()&&I.store.mode==="refresh"&&Co(),Qi(),Eo()}var qc=f({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:I,styles:bc,start(){wo(),xo(),Ki=new AbortController,document.addEventListener("click",Fp,{signal:Ki.signal}),To()&&I.store.mode==="refresh"&&Co(),Qi(),yc=[C(e=>H(e)&&Eo()),de(Yp)]},stop(){Ki?.abort();for(let e of yc)e();clearInterval(Xn),wo(),xo()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&Qi(),Eo()}});var Mo=M("bloom-history-"),Wi=10,Kp=3e3;function Sc(e){let t="",o=0,n=new Set,r=s("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),i=s("div",{class:Mo("list")}),a=s("div",{class:Mo("pager")}),c,l=j("Clear all",()=>{if(!c){l.textContent="Click again to clear",c=setTimeout(()=>{c=void 0,l.textContent="Clear all"},Kp);return}clearTimeout(c),c=void 0,l.textContent="Clear all",Lo([])},"danger");function d(){let v=[...at.store.entries].toReversed(),F=t.trim().toLowerCase(),A=F?v.filter(Y=>Y.toLowerCase().includes(F)):v,S=Math.max(1,Math.ceil(A.length/Wi));o=Math.min(o,S-1);let oe=A.slice(o*Wi,(o+1)*Wi).map(Y=>s("div",{class:Mo("row")},s("button",{class:Mo("text",n.has(Y)?"text-open":"text-closed"),text:Y,title:n.has(Y)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{n.delete(Y)||n.add(Y),d()}}}),$("copy","Copy",()=>void Ma(Y)),$("trash","Delete",()=>Lo(at.store.entries.filter(yr=>yr!==Y)))));i.replaceChildren(...oe.length?oe:[s("div",{class:"bloom-muted",text:F?"No matching prompts.":"No saved prompts yet."})]),a.replaceChildren(s("span",{class:"bloom-muted",text:`${A.length} ${F?"matching":"saved"} \xB7 page ${o+1} of ${S}`}),j("Previous",()=>{o--,d()}),j("Next",()=>{o++,d()}),l);let[gt,Z]=a.querySelectorAll("button");gt.disabled=o===0,Z.disabled=o>=S-1,l.disabled=!v.length}r.addEventListener("input",()=>{t=r.value,o=0,d()}),e.append(s("div",{class:Mo("manager")},r,i,a)),d();let m=bt((v,F)=>v==="InputHistory"&&F==="entries"&&d());return()=>{m(),clearTimeout(c),e.replaceChildren()}}var wc=`/*
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
`;var Wp=M("bloom-history-"),jp=2e3,at=p({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>Sc(e)},entries:{type:"custom",default:[]}}),ne=null,ji={text:"",at:0},Ce=null,zi,_n=()=>at.store.entries.filter(e=>typeof e=="string");function Lo(e){at.store.entries=e.slice(-at.store.maxEntries)}function Vi(e){let t=e.trim();if(!t)return;let o=Date.now();t===ji.text&&o-ji.at<jp||(ji={text:t,at:o},Lo([..._n().filter(n=>n!==t),t]))}function zp(e,t){let o=ve();if(!o)return;Ce??=s("div",{class:`bloom-root ${Wp("hud")}`,attrs:{"data-bloom":"history-hud","aria-live":"polite"}}),Ce.textContent=`${e+1} / ${t}`;let n=(o.closest("form")??o).getBoundingClientRect();Ce.style.left=`${n.left+n.width/2}px`,Ce.style.top=`${n.top}px`,Ce.isConnected||document.body.append(Ce)}function ko(){ne=null,Ce?.remove()}function Vp(e){let t=_n();if(!ne)return;let o=t[e];ne.index=e,ne.shown=o,ie(o),zp(t.length-1-e,t.length)}function Jp(e){let t=_n();if(!t.length)return!1;if(!ne){if(e===1)return!1;ne={index:t.length,draft:k(),shown:""}}let o=ne.index+e;return o<0?!0:o>=t.length?(ie(ne.draft),ko(),!0):(Vp(o),!0)}function xc(e){return Xe(e)?e:e instanceof HTMLElement?e.closest(u.composerInput):null}function Zp(){if(ve()?.closest("[data-chatgpt-composer], [data-composer-input], form")?.querySelector('[aria-expanded="true"]'))return!0;for(let t of document.querySelectorAll('[role="listbox"], [role="menu"], [data-radix-popper-content-wrapper], [cmdk-root], [cmdk-list]')){if(!(t instanceof HTMLElement)||t.closest("[data-bloom]"))continue;let o=getComputedStyle(t);if(!(o.display==="none"||o.visibility==="hidden"))return!0}return!1}function Xp(e){if(e.isComposing||e.key==="Process"||e.keyCode===229)return;let t=xc(e.target);if(!t)return;if(e.key==="Enter"&&!e.shiftKey){Vi(k(t)),ko();return}if(e.key==="Escape"&&ne){ie(ne.draft),ko(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey||Zp())return;let o=is(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!ne||Jp(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function $p(e){ne&&xc(e.target)&&k()!==ne.shown.trim()&&ko()}function _p(e){e.target instanceof Element&&e.target.closest(u.sendButton)&&Vi(k())}var Ec=f({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:at,styles:wc,start(){for(let t of document.querySelectorAll('[data-bloom="history-hud"]'))t.remove();Ce=null,zi=new AbortController;let{signal:e}=zi;document.addEventListener("keydown",Xp,{capture:!0,signal:e}),document.addEventListener("input",$p,{capture:!0,signal:e}),document.addEventListener("click",_p,{capture:!0,signal:e}),document.addEventListener("submit",()=>Vi(k()),{capture:!0,signal:e})},stop(){zi?.abort(),ko();for(let e of document.querySelectorAll('[data-bloom="history-hud"]'))e.remove();Ce=null},onSettingsChange(e){e==="maxEntries"&&Lo(_n())}});var Tc=`/*
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
`;var tg=1500,og=5e3,ng=2e3,Bc=[{label:"UTC",value:"UTC"},{label:"\u7F8E\u56FD\u4E1C\u90E8",value:"America/New_York"},{label:"\u7F8E\u56FD\u4E2D\u90E8",value:"America/Chicago"},{label:"\u7F8E\u56FD\u5C71\u5730",value:"America/Denver"},{label:"\u7F8E\u56FD\u897F\u90E8",value:"America/Los_Angeles"},{label:"\u65E5\u672C",value:"Asia/Tokyo"},{label:"\u53F0\u6E7E",value:"Asia/Taipei"}],Gt=p({sourceTimeZone:{type:"select",description:"Zone the stored clock was written in. Leave UTC for ChatGPT create_time. Pick the same zone as the Shit GPT plugin only when that clock is a wall time in that zone; it is then shown in the system timezone.",options:Bc,default:"UTC"},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),tr=new Map,Ji=new Set,Pc=0,or,Cc=[];function Oc(e,t){tr.get(e)!==t&&(tr.set(e,t),clearTimeout(or),or=setTimeout(Rc,ng))}function Rc(){let e={...Gt.store.stamps,...Object.fromEntries(tr)};Gt.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,tg))}function rg(e){let t=le(y())?.times;for(let o=e.length-1;o>=0;o--){let n=tr.get(e[o])??t?.get(e[o])??Gt.store.stamps[e[o]];if(n)return n}return null}var ig=()=>R().generating||Date.now()-Pc<og;function Dc(){return Intl.DateTimeFormat().resolvedOptions().timeZone}function Hc(){let e=Gt.store.sourceTimeZone;if(!e||e==="UTC")return"UTC";try{return Intl.DateTimeFormat(void 0,{timeZone:e}),e}catch{return"UTC"}}function Nc(e,t){let o={};for(let n of new Intl.DateTimeFormat("en-US",{timeZone:t,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(e)))o[n.type]=n.value;return{y:+o.year,m:+o.month,d:+o.day,h:+o.hour%24,mi:+o.minute,s:+o.second}}function Uc(e){return Date.UTC(e.y,e.m-1,e.d,e.h,e.mi,e.s)}function Mc(e,t){let o=e;for(let n=0;n<4;n++){let r=e-Uc(Nc(o,t));if(r===0)return o;o+=r}return o}function ag(e,t){if(t==="UTC")return e;let o=(e%1e3+1e3)%1e3,n=e-o,r=new Date(n),i=Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),r.getUTCHours(),r.getUTCMinutes(),r.getUTCSeconds()),a=Mc(i,t),c=3600*1e3,l=Number.POSITIVE_INFINITY;for(let d of[-c,0,c]){let m=a+d;Uc(Nc(m,t))===i&&m<l&&(l=m)}return l!==Number.POSITIVE_INFINITY?l+o:Mc(i+c,t)+o}function sg(e,t){let o=Hc();return t||o==="UTC"?e:ag(e,o)}function Lc(e,t){return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(e)}function lg(e){let t=Dc(),o=Date.now(),n={hour:"2-digit",minute:"2-digit",timeZone:t};if(Lc(e,t)===Lc(o,t))return new Intl.DateTimeFormat(void 0,n).format(e);let r=a=>new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric"}).format(a),i=r(e)===r(o)?{}:{year:"numeric"};return new Intl.DateTimeFormat(void 0,{...i,month:"short",day:"numeric",...n}).format(e)}function cg(e,t){let o=new Date(t).toLocaleString(void 0,{timeZone:Dc()}),n=Hc();if(n==="UTC"||t===e)return o;let r=new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"UTC"}).format(e);return`${Bc.find(a=>a.value===n)?.label??n} ${r} \u2192 ${o}`}function Gc(e){let t=qt(e)??e.getAttribute("data-message-author-role")??e.closest(u.turn)?.getAttribute("data-turn")??e.querySelector(u.authorRole)?.getAttribute("data-message-author-role");if(Hr(t))return t;let o=to(e).at(-1);return le(y())?.chain.find(n=>n.id===o)?.role??null}var kc='[class*="group/activity-header"]';function ug(e){let t=e.parentElement;if(!t)return null;let o=e.closest(u.turn);return o&&t!==o&&!o.contains(t)?null:t}function dg(e){let t=e;for(let o=0;o<8&&t;o++){let n=ug(t);if(!n)return null;let r=[...n.children],i=r.indexOf(t);for(let a=i-1;a>=0;a--){let c=r[a],l=c.matches(kc)?c:c.querySelector(kc);if(l)return l;if(c.matches(u.searchUnit)||c.querySelector(u.searchUnit))return null}if(n===t.closest(u.turn))return null;t=n}return null}function mg(e){let t=e.parentElement;for(let o=0;o<4&&t;o++){if(t.classList.contains("flex-col"))return t;t=t.parentElement}return e.parentElement??e}function Fc(e,t){if(t==="assistant"){let o=dg(e);if(o)return mg(o)}return e}function fg(e,t){let o=St();for(let n=o.length-1;n>=0;n--){let r=o[n];if(!(r!==e&&(Gc(r)!=="assistant"||Fc(r,"assistant")!==t)))return r===e}return!0}function Ic(e){return e.querySelector(':scope > time[data-bloom="timestamp"]')}function pg(e){let t=to(e);if(!t.length||!qe(e)||e.querySelector("time:not([data-bloom])"))return;let o=Gc(e),n=Fc(e,o);if(n!==e&&!fg(e,n)){Ic(e)?.remove();return}let r=rg(t),i=!1;if(!r&&ig()){r=Date.now();let m=t.at(-1);Ji.add(m),Oc(m,r),i=!0}else r&&Ji.has(t.at(-1))&&(i=!0);let a=n.querySelector('time[data-bloom="timestamp"]')??Ic(e);if(!r||Gt.store.hideOwnMessages&&o==="user"){a?.remove();return}let c=sg(r,i),l=lg(c);if(a?.textContent===l&&a.parentElement===n&&a===n.firstElementChild)return;let d=s("time",{class:`bloom-timestamp bloom-timestamp-${o??"assistant"}`,text:l,title:cg(r,c),attrs:{"data-bloom":"timestamp",datetime:new Date(c).toISOString()}});a&&a.replaceWith(d),(d.parentElement!==n||d!==n.firstElementChild)&&n.prepend(d)}var er=Pe(()=>{for(let e of St())pg(e)}),Yc=f({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:Gt,styles:Tc,start(){Cc=[C(e=>H(e)&&er()),W.on("conversation",er),W.on("message-time",({messageId:e,time:t})=>{Ji.delete(e),Oc(e,t),er()}),w.on("fall",()=>{Pc=Date.now()})]},stop(){for(let e of Cc)e();or&&(clearTimeout(or),Rc());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();er()}}});var gg=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])','[data-chatgpt-composer] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-composer-input] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-codex-composer-root] button[aria-label^="Dictat" i], [data-composer-placement] button[aria-label^="Dictat" i], [class*="ComposerLayout"] button[aria-label^="Dictat" i]'],hg=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],Kc=p({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),Qc=f({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:Kc,styles:()=>Be([...gg,...Kc.store.hideDictationSettings?hg:[]])});var st="data-bloom-share",bg=/^\/g\/g-p-/,yg=/^(?:share|分享)$/i,Ag=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],vg=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${st}="project"]`],Zi=p({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),nr,Xi=!1;function qg(e){if(!H(e))return;let t=bg.test(location.pathname)&&!y();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${st}]`))!t||!yg.test(h(o.textContent??""))?o.removeAttribute(st):o.hasAttribute(st)||o.setAttribute(st,"project")}var Wc=f({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:Zi,styles:()=>Be([...Zi.store.hideShareChat?Ag:[],...Zi.store.hideShareProject?vg:[]]),start(){Xi=!0,$e().then(()=>{Xi&&!nr&&(nr=C(qg))})},stop(){Xi=!1,nr?.(),nr=void 0;for(let e of document.querySelectorAll(`[${st}]`))e.removeAttribute(st)}});var jc='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',Sg='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',wg="[data-bloom-profile-plan]",zc="visibility:hidden!important;user-select:none!important",Jc=p({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function xg(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=Jc.store,r=[];return e&&r.push(n?`:is(${jc}){display:none!important}`:`:is(${jc}){${zc}}`),t&&r.push(`:is(${Sg}){${zc}}`),e&&o&&r.push(`${wg}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var Vc,Zc=f({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Jc,styles:xg,start(){Vc=me()},stop(){Vc?.()}});var Eg="model-switcher-dropdown-button",$i="data-selected-reasoning-effort",rr="ArrowLeft",Xc=e=>e.startsWith("model-switcher-")&&e!==Eg?e.slice(15):"",Io=(e,t)=>e.id===t.id||!!e.label&&e.label===t.label;function $c(){let e=Q();return(e&&K(u.modelTrigger,e))??K(u.modelTrigger)}function pe(){let e=$c();if(!e)return null;let t=e.getAttribute("aria-expanded")==="true",o=e.getAttribute($i),n=o&&t?"":h(e.innerText),r=o||Xc(e.getAttribute("data-testid")??"")||n;return r?{id:r,label:n||r}:null}function Tg(e){return[...document.querySelectorAll(u.modelItem)].find(t=>{let o=Xc(t.getAttribute("data-testid")??""),n=h(t.textContent??"");return o===e.id||n===e.label||n===e.id})??null}function Cg(e){let t=e.querySelector("[role=slider]"),o=Number(t?.getAttribute("aria-valuenow")),n=Number(t?.getAttribute("aria-valuemax"));o<=0?rr="ArrowRight":o>=n&&(rr="ArrowLeft"),e.focus(),e.dispatchEvent(new KeyboardEvent("keydown",{key:rr,code:rr,bubbles:!0,cancelable:!0}))}function _i(e){let t=pe(),o=$c();if(t&&Io(t,e))return o?.hasAttribute($i)&&o.getAttribute("aria-expanded")==="true"&&document.querySelector("[role=menu]")?.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),!0;if(o?.hasAttribute($i)){let r=document.querySelector(u.effortSlider);return r?Cg(r):o.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,button:0,pointerType:"mouse",isPrimary:!0})),!1}let n=Tg(e);if(n){n.click();let r=pe();return!!r&&Io(r,e)}return o?.getAttribute("aria-expanded")!=="true"&&o?.click(),!1}var _c=`/*
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
`;var G=M("bloom-queue-"),Lg=6,kg=8,ee=null,Bo="",Ft=!1,Yt=!1;function ea(e,t,o){let n=$(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute(Se),n.addEventListener("mouseenter",()=>eu(t)),n.addEventListener("mouseleave",()=>eu("")),n}function eu(e){let t=ee?.querySelector(`.${G("tip")}`);t&&(t.textContent=e)}function Ig(e,t,o,n){Yt=!0;let r=s("textarea",{class:`bloom-input ${G("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=new AbortController,a=c=>{i.abort(),Yt=!1,Bo="",c?n.edit(t,r.value):r.replaceWith(s("div",{class:G("text"),text:o}))};addEventListener("keydown",c=>{if(!(c.target!==r||c.isComposing)){if(c.key==="Enter"&&!c.shiftKey)a(!0);else if(c.key==="Escape")a(!1);else return;c.preventDefault(),c.stopImmediatePropagation()}},{capture:!0,signal:i.signal}),r.addEventListener("keydown",c=>c.stopPropagation(),{signal:i.signal}),r.addEventListener("blur",()=>a(!0),{signal:i.signal}),e.querySelector(`.${G("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function Bg(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,a=l=>{!i&&Math.abs(l.clientY-n.clientY)<Lg||(i||(i=Yt=!0,e.classList.add(G("dragging"))),e.style.transform=`translateY(${l.clientY-n.clientY}px)`)},c=l=>{if(removeEventListener("pointermove",a),!i)return;Yt=!1,Bo="";let m=[...r.children].filter(v=>v!==e).filter(v=>v.getBoundingClientRect().top+v.getBoundingClientRect().height/2<l.clientY).length;o.move(t,m)};addEventListener("pointermove",a),addEventListener("pointerup",c,{once:!0})})}function Pg(e,t,o,n){let r=s("li",{class:G("row")},s("div",{class:G("text"),text:e.text}),n&&e.label?s("span",{class:G("model"),title:e.label,text:e.label}):null,s("div",{class:G("actions")},ea("trash","Remove from queue",()=>o.remove(t)),ea("edit","Edit",()=>Ig(r,t,e.text,o)),ea("send","Send now",()=>o.sendNow(t))));return Bg(r,t,o),r}function Og(e){if(!ee)return;let t=e.getBoundingClientRect();ee.style.left=`${t.left}px`,ee.style.width=`${t.width}px`,ee.style.bottom=`${innerHeight-t.top+kg}px`}function ta(){ee?.remove(),ee=null,Bo="",Yt=!1}function lt(e,t,o=!0){let n=Q();if(!e.length||!ze(n)){ta();return}ee||(ee=s("div",{class:`bloom-root ${G("tray")}`,attrs:{"data-bloom":"queue"}},s("div",{class:G("header")},s("button",{class:G("toggle"),attrs:{type:"button","aria-expanded":String(!Ft)},on:{click:a=>{Ft=!Ft,ee?.classList.toggle(G("collapsed"),Ft),a.currentTarget.setAttribute("aria-expanded",String(!Ft))}}},s("span",{class:G("count")}),N("chevron")),s("span",{class:G("tip")})),s("ol",{class:G("list")})),ee.classList.toggle(G("collapsed"),Ft),document.body.append(ee)),Og(n);let r=JSON.stringify([o,...e.map(a=>[a.text,o?a.label:""])]);if(Yt||r===Bo)return;Bo=r;let i=ee.querySelector(`.${G("count")}`);i&&(i.textContent=Yo(e.length,"Queued message")),ee.querySelector(`.${G("list")}`)?.replaceChildren(...e.map((a,c)=>Pg(a,c,t,o)))}var lr=new E("PromptQueue"),Rg=8,Oo=150,ir=20,Dg=300,ge="BloomPromptQueue",na="BloomPromptQueueClaim",tu="BloomPromptQueueTab",Hg=4e3,J=p({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1},showQueueMode:{type:"boolean",description:"Show the model that was selected when each message was queued.",default:!0},stickyOnNavigate:{type:"boolean",description:"Keep the selected model when switching chats.",default:!0},persistAcrossRefresh:{type:"boolean",description:"Restore unsent queued messages in this browser after a refresh. Other tabs show the same queue; only one of them sends it.",default:!0}}),he=new Map,Po=!1,ct=null,Kt,ou=[],Fe=null,dt=!1,Ro,ar="draft",Do=()=>y()??ar,te=()=>he.get(Do())??[],ra=e=>({id:e.model||e.label,label:e.label||e.model});function Ng(e){return typeof e=="string"?e.trim()?{text:e,model:"",label:""}:null:!P(e)||typeof e.text!="string"||!e.text.trim()?null:{text:e.text,model:typeof e.model=="string"?e.model:"",label:typeof e.label=="string"?e.label:""}}function ia(){let e=sessionStorage.getItem(tu);if(e)return e;let t=globalThis.crypto?.randomUUID?.()??`${Date.now()}-${Math.random()}`;return sessionStorage.setItem(tu,t),t}function iu(){let e=ke(localStorage.getItem(na)??"");return!P(e)||typeof e.tab!="string"||typeof e.at!="number"||typeof e.key!="string"?null:{tab:e.tab,at:e.at,key:e.key}}function au(){let e={tab:ia(),at:Date.now(),key:Do()};try{localStorage.setItem(na,JSON.stringify(e))}catch(t){lr.warn("Could not claim the queue",t)}}function Ug(){let e=iu();if(e?.tab===ia())try{localStorage.setItem(na,JSON.stringify({...e,at:Date.now()}))}catch(t){lr.warn("Could not refresh the queue claim",t)}}function Gg(){let e=iu();return!e||e.tab===ia()||e.key!==Do()?!0:Date.now()-e.at<=Hg?!1:(au(),!0)}function Fg(){return Object.fromEntries([...he].filter(([e])=>e!==ar))}function oa(e){let t=typeof e=="string"?ke(e):e;if(!P(t))return!1;let o=!1;for(let[n,r]of Object.entries(t)){if(!Array.isArray(r))continue;let i=r.map(Ng).filter(a=>a!=null);i.length&&(he.set(n,i),o=!0)}return o}function Yg(){if(!J.store.persistAcrossRefresh){sessionStorage.removeItem(ge),qr(ge);return}oa(sessionStorage.getItem(ge))||oa(Vo(ge))&&sr()}function sr(){try{if(!J.store.persistAcrossRefresh){sessionStorage.removeItem(ge),qr(ge);return}let e=Fg();sessionStorage.setItem(ge,JSON.stringify(e)),Jo(ge,e)}catch(e){lr.warn("Could not save the queue",e)}}function Kg(e){if(!(e.key!==ge||!J.store.persistAcrossRefresh||e.newValue==null)){he.clear(),oa(e.newValue);try{sessionStorage.setItem(ge,e.newValue)}catch(t){lr.warn("Could not mirror the queue",t)}lt(te(),Qt,J.store.showQueueMode)}}function ut(e){e.length?he.set(Do(),e):he.delete(Do()),au(),sr(),lt(te(),Qt,J.store.showQueueMode)}function Qg(e){if(!e.model&&!e.label)return!0;let t=pe();return t?Io(t,ra(e)):!0}function su(e,t=0){t>=ir||R().generating||k()!==e||(nn(),setTimeout(()=>su(e,t+1),Oo))}function Wg(e,t){let o=e??Fe;if(!o||!t.model&&!t.label||Io(o,ra(t))){dt=!1;return}J.store.stickyOnNavigate&&(Fe=o),clearTimeout(Ro),Ro=setTimeout(()=>cu(o),Oo)}function Ho(e,t=0,o=pe()){if(R().generating||k()){t<ir&&setTimeout(()=>Ho(e,t+1,o),Oo);return}if(!Qg(e)&&t<ir){dt=!0,_i(ra(e)),setTimeout(()=>Ho(e,t+1,o),Oo);return}ie(e.text),$t(()=>su(e.text)),Wg(o,e)}function nu(){if(ct!=null){let o=ct;ct=null,Ho(o);return}if(!Po||R().generating||k())return;if(!Gg()){Po=!1;return}let[e,...t]=te();e!=null&&(Po=!1,ut(t),Ho(e))}function lu(e){let t=te(),o=t[e];if(o!=null){if(ut(t.filter((n,r)=>r!==e)),!R().generating){Ho(o);return}ct=o,At()?.click()}}var Qt={remove:e=>ut(te().filter((t,o)=>o!==e)),edit:(e,t)=>ut(t.trim()?te().map((o,n)=>n===e?{...o,text:t}:o):te().filter((o,n)=>n!==e)),sendNow:lu,move(e,t){let o=[...te()],[n]=o.splice(e,1);n&&(o.splice(t,0,n),ut(o))}};function jg(e){let t=pe(),o={text:e,model:t?.id??"",label:t?.label??""},n=te();return J.store.replacePending&&n.length?(ut([...n.slice(0,-1),o]),!0):n.length>=Rg?!1:(ut([...n,o]),!0)}function zg(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!Xe(e.target)||!R().generating)return;let t=k(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;let o=pe();ie(""),ct={text:t,model:o?.id??"",label:o?.label??""},At()?.click();return}if(!t){te().length&&lu(0);return}jg(t)&&ie("")}function Vg(){if(dt||!J.store.stickyOnNavigate)return;let e=pe();e&&(Fe=e)}function cu(e){dt=!0;let t=0,o=()=>{if(_i(e)||t>=ir){dt=!1;return}t++,Ro=setTimeout(o,Oo)};clearTimeout(Ro),o()}function Jg(){J.store.stickyOnNavigate&&Fe&&cu(Fe)}function ru(e){let{target:t}=e;!(t instanceof Element)||dt||t.closest(`${u.modelTrigger}, ${u.modelItem}`)&&setTimeout(Vg,Dg)}var uu=f({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:J,styles:_c,start(){Kt=new AbortController,Yg(),Fe=pe(),document.addEventListener("keydown",zg,{capture:!0,signal:Kt.signal}),document.addEventListener("pointerup",ru,{signal:Kt.signal}),document.addEventListener("keyup",ru,{signal:Kt.signal}),ou=[w.on("fall",({outcome:e})=>{Po=e==="done",e==="left"&&(ct=null),nu()}),w.on("context",({prevId:e,id:t,migrated:o})=>{let n=he.get(ar);he.delete(ar),o&&!e&&t&&n&&he.set(t,n),o||(Po=!1,Jg()),sr(),lt(te(),Qt,J.store.showQueueMode)}),w.on("tick",()=>{Ug(),nu(),lt(te(),Qt,J.store.showQueueMode)})],addEventListener("storage",Kg,{signal:Kt.signal}),lt(te(),Qt,J.store.showQueueMode)},stop(){Kt?.abort(),clearTimeout(Ro);for(let e of ou)e();ta(),he.clear(),ct=null,Fe=null,dt=!1},onSettingsChange(e){e==="persistAcrossRefresh"&&sr(),e==="stickyOnNavigate"&&J.store.stickyOnNavigate&&(Fe=pe()),lt(te(),Qt,J.store.showQueueMode)}});var Zg=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function Xg(){let e=h(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!Zg.has(e.toLowerCase())?e:null}function No(e){return e?le(e)?.title??Qs(e)??(e===y()?Xg():null):null}var du=`/*
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
`;var Me=M("bloom-recent-"),Le="home",_g=50,mu=140,eh=new Set(["Backquote"]),th=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),x=p({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),Ye=null,be=[],ye=0,aa,fu=[],dr=()=>ue()?null:y()??(dn()?Le:null);function pu(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function hu(e){let t=No(e);t&&x.store.titles[e]!==t&&(x.store.titles={...x.store.titles,[e]:t});let o=Ws(location.href);o&&e===y()&&x.store.projects[e]!==o&&(x.store.projects={...x.store.projects,[e]:o})}function gu(e){if(!e)return;let t=[e,...x.store.visits.filter(n=>n!==e)].slice(0,_g),o=new Set(t);x.store.visits=t,Object.keys(x.store.previews).some(n=>!o.has(n))&&(x.store.previews=pu(x.store.previews,o)),Object.keys(x.store.titles).some(n=>!o.has(n))&&(x.store.titles=pu(x.store.titles,o)),e!==Le&&hu(e)}function cr(e){if(!e||!x.store.visits.includes(e))return;let t={},o=le(e)?.chain??[];for(let r of o)t[r.role]=ce(fn(r),mu);if(e===y())for(let r of Re()){let i=wt(r);i&&(t[r.role]=ce(i,mu))}let n=x.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(x.store.previews={...x.store.previews,[e]:t})}function oh(){let e=Number(x.store.maxRecent);return x.store.visits.filter(t=>t!==Le||x.store.includeHome).slice(0,e)}function sa(e){if(Uo(),e===dr())return;let t=e===Le?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"], [data-sidebar-destination="builtin:home"]'):ao(e)[0];t?t.click():location.assign(e===Le?"/":`/c/${e}`)}function nh(e,t){let o=e===Le?"New chat":x.store.titles[e]??No(e)??"Untitled chat",n=e===Le?null:x.store.projects[e],r=e===Le?null:x.store.previews[e];return s("button",{class:Me("item"),attrs:{type:"button",role:"option","aria-selected":String(t===ye)},on:{click:()=>sa(e),mousemove:()=>t!==ye&&ur(t)}},s("div",{class:Me("head")},s("span",{class:`${Me("title")} bloom-truncate`,text:o}),n&&s("span",{class:Me("project"),text:n})),r?.user&&s("div",{class:`${Me("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&s("div",{class:`${Me("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function ur(e){ye=(e+be.length)%be.length,Ye?.querySelectorAll(`.${Me("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===ye)))}function rh(){cr(y());let e=dr();be=oh(),e&&(be=[e,...be.filter(t=>t!==e)].slice(0,Number(x.store.maxRecent))),be.length&&(ye=be.length>1?1:0,Ye=s("div",{class:`bloom-root ${Me("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:t=>t.target===t.currentTarget&&Uo()}},s("div",{class:Me("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...be.map(nh))),document.body.append(Ye))}function Uo(){Ye?.remove(),Ye=null}var ih=e=>eh.has(e.code)||th.has(e.key);function ah(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&ih(e)){e.preventDefault(),e.stopPropagation(),Ye?ur(ye+(e.shiftKey?-1:1)):rh();return}if(!Ye)return;let o={Escape:Uo,Enter:()=>sa(be[ye]),ArrowDown:()=>ur(ye+1),ArrowUp:()=>ur(ye-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function sh(e){Ye&&e.key==="Control"&&sa(be[ye])}var bu=f({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:x,styles:du,start(){aa=new AbortController;let{signal:e}=aa;addEventListener("keydown",ah,{capture:!0,signal:e}),addEventListener("keyup",sh,{capture:!0,signal:e}),addEventListener("blur",Uo,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&cr(y()),{signal:e}),fu=[de(({prevId:i})=>{cr(i),gu(dr())}),W.on("conversation",({id:i})=>{x.store.visits.includes(i)&&hu(i),cr(i)})];let{visits:t,titles:o,previews:n}=x.store,r=t.filter(i=>i!==Le&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(x.store.visits=t.filter(i=>!r.includes(i))),gu(dr())},stop(){aa?.abort();for(let e of fu)e();Uo()}});var la="data:audio/mpeg;base64,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";var yu=new E("ResponseNotification"),lh=.5,ch=200,uh=300,Go=p({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:e=>(e.append(j("Preview",Su)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),Au=null,ca=new Map,vu,ua;function dh(e){return new Promise((t,o)=>GM_xmlhttpRequest({url:e,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=ch&&n<uh?t(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var mh=e=>Uint8Array.from(atob(e.slice(e.indexOf(",")+1)),t=>t.charCodeAt(0)).buffer;function fh(e,t){let o=ca.get(t);return o||(o=(t.startsWith("data:")?Promise.resolve(mh(t)):dh(t)).then(n=>e.decodeAudioData(n)),o.catch(()=>ca.delete(t)),ca.set(t,o)),o}async function qu(e){Au??=new AudioContext;let t=Au;t.state==="suspended"&&t.resume();let o=t.createBufferSource(),n=t.createGain();o.buffer=await fh(t,e),n.gain.value=lh,o.connect(n).connect(t.destination),o.start()}function Su(){let e=Go.store.soundUrl.trim();qu(e||la).catch(t=>{yu.warn("Sound failed",t),e&&qu(la).catch(o=>yu.warn("Default chime failed",o))})}function ph(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function gh(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(ua=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:ua.signal}))}var wu=f({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:Go,start(){gh(),vu=w.on("fall",({conversationId:e,outcome:t})=>{t==="done"&&(Go.store.onlyWhenHidden&&!document.hidden||(Go.store.sound&&Su(),Go.store.browserNotification&&ph(No(e))))})},stop(){vu?.(),ua?.abort()}});var hh=`:is(${u.sidebarScroll}, :has(> ${u.sidebarScroll})) + :has(${u.menuButton})`,bh=`${u.rail} > :has(${u.menuButton})`,ma=`:is(${hh}, ${bh}, ${u.oldProfile}):not(:hover)`,da="[data-bloom-profile-avatar]",yh=`:is(${ma}, ${ma} :has(${da})) > :not(${da}, :has(${da}))`,Eu=p({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function Ah(){let{opacity:e,fadeAvatar:t}=Eu.store;return e>=100?"":`${t?ma:yh}{opacity:${e/100}!important}`}var xu,Tu=f({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Eu,styles:Ah,start(){xu=me()},stop(){xu?.()}});var Cu=`/*
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
`;var D=M("bloom-star-chats"),qh=80,Sh=60,wh=1200,xh=120,Fo=p({replaceReadAloud:{type:"boolean",description:"Put the star where the reply's Read aloud button is, and hide that button.",default:!0},messages:{type:"custom",default:[]}}),Eh=`:is(${u.turnActions}) ${u.readAloud}`,fa,pa=!1,Ke=!1,ft=!1,mr=0,z=null,fr="",B=null,ga,Qe;function ba(){let e=Fo.store.messages;return Array.isArray(e)?e.filter(t=>P(t)&&typeof t.conversationId=="string"&&typeof t.messageId=="string"&&(t.role==="user"||t.role==="assistant")&&typeof t.snippet=="string"&&typeof t.starredAt=="number"):[]}function ya(){let e=y();return e?ba().filter(t=>t.conversationId===e):[]}function Th(e,t){return ba().some(o=>o.conversationId===e&&o.messageId===t)}function Mu(e){let t=ba(),o=t.some(n=>n.conversationId===e.conversationId&&n.messageId===e.messageId);Fo.store.messages=o?t.filter(n=>!(n.conversationId===e.conversationId&&n.messageId===e.messageId)):[{...e,starredAt:Date.now()},...t].slice(0,qh)}function ha(e){return e.messageIds[0]||e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.el.getAttribute("data-turn-key")||""}function Ch(e){return ce(wt(e)||h(e.el.textContent??""),Sh)}function Mh(e){let t=e.closest(u.turn);if(!t)return null;let o=Re().filter(n=>t.contains(n.el));return o.find(n=>n.el.contains(e)||n.el===t)??o.findLast(n=>n.el.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING)??null}function Lh(){let e=[...document.querySelectorAll(u.turnActions)].filter(t=>!t.closest(`[data-bloom], [role="dialog"], [inert], pre, ${u.sidebars}`));return e.filter(t=>!e.some(o=>o!==t&&o.contains(t)))}function kh(e,t){let o=Fo.store.replaceReadAloud?t.querySelector(u.readAloud):null;if(o&&!o.closest("[data-bloom]")){e.nextElementSibling!==o&&o.before(e);return}let n=Ih(t);(e.parentElement!==n||n.lastElementChild!==e)&&n.append(e)}function Ih(e){let t=[...e.querySelectorAll("button")].filter(n=>n.dataset.bloom!=="message-star"&&!n.closest("[data-bloom]"));return t.length?[...e.children].find(n=>n instanceof HTMLElement&&n!==t[0]&&t.every(r=>n.contains(r)))??e:e}function Bh(){return[...document.querySelectorAll(u.headerMore)].filter(t=>{if(t.dataset.bloom==="message-star"||t.closest("[data-bloom], [role='dialog'], [inert]")||t.closest(u.sidebars))return!1;let o=t.getBoundingClientRect();return o.width===0&&o.height===0?!!t.closest("header, #page-header"):o.top>=0&&o.top<96&&o.left>window.innerWidth*.5}).toSorted((t,o)=>o.getBoundingClientRect().left-t.getBoundingClientRect().left||(t.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1))[0]??null}function Lu(e,t,o){return s("button",{class:t,attrs:{type:"button","aria-label":e},on:{pointerdown:n=>n.stopPropagation(),mousedown:n=>n.stopPropagation(),click:n=>{n.preventDefault(),n.stopPropagation(),o(n)}}},N("star"))}function Ph(e,t){e.setAttribute("aria-pressed",String(t)),e.setAttribute("aria-label",t?"Unstar":"Star")}function pr(){return Ke||ft}function Wt(){mr&&window.clearTimeout(mr),mr=0}function jt(){Ke=!1,ft=!1,Wt(),Qe?.enter(),z?.remove(),z=null,fr="",B?.classList.remove(D("-open")),B?.setAttribute("aria-expanded","false")}function gr(e){return e instanceof Node&&!!(B?.contains(e)||z?.contains(e))}function Oh(e){e.classList.add(D("-flash")),window.setTimeout(()=>e.classList.remove(D("-flash")),wh)}function Rh(e){let t=Re().find(n=>ha(n)===e),o=t?.el.closest(u.turn)??t?.el;o&&(o.scrollIntoView({block:"start"}),Oh(o))}function Dh(){let e=y(),t=new Set,o=[...document.querySelectorAll('[data-bloom="message-star"][data-place="action"]')];if(!e||ue()){for(let n of o)n.remove();return}for(let n of Lh()){if(!qe(n))continue;let r=Mh(n),i=r?ha(r):"";if(!r||!i)continue;let a=n.querySelector('[data-place="action"]');(!a||a.dataset.id!==i)&&(a?.remove(),a=Lu("Star",D("-star"),()=>{let c=y(),l=Re().find(d=>ha(d)===i);!c||!l||Mu({conversationId:c,messageId:i,role:l.role,snippet:Ch(l)})}),a.dataset.bloom="message-star",a.dataset.place="action",a.dataset.id=i),Ph(a,Th(e,i)),kh(a,n),t.add(a)}for(let n of o)t.has(n)||n.remove()}function Hh(){if(!z||!B)return;let e=B.getBoundingClientRect(),t=z.offsetWidth||288,o=z.offsetHeight||120,n=e.bottom+6;n+o>window.innerHeight-8&&(n=Math.max(8,e.top-o-6));let r=Math.max(8,Math.min(e.right-t,window.innerWidth-t-8));z.dataset.place=n>=e.bottom?"below":"above",z.style.left=`${Math.round(r)}px`,z.style.top=`${Math.round(n)}px`}function Nh(){if(!pr()||!B){z?.remove(),z=null,fr="",B?.classList.remove(D("-open")),B?.setAttribute("aria-expanded","false");return}let e=ya(),t=e.map(o=>`${o.messageId}	${o.snippet}`).join(`
`);if(!z||fr!==t){z?.remove();let o=e.map(n=>s("div",{class:D("-row")},s("button",{class:D("-jump"),attrs:{type:"button"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),jt(),Rh(n.messageId)}}},s("span",{class:D("-role"),text:n.role==="user"?"You":"ChatGPT"}),s("span",{class:D("-snip"),text:n.snippet||"Message"})),Lu("Unstar",D("-unstar"),()=>Mu(n))));z=s("div",{class:`bloom-root ${D("-panel")}`,attrs:{"data-bloom":"star-list"},on:{pointerenter:()=>{Wt(),Qe?.enter(),ft=!0},pointerleave:n=>{gr(n.relatedTarget)||Ke||Qe?.leave(n)}}},s("div",{class:D("-bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:D("-head"),text:"Starred"}),s("div",{class:D("-body")},...o.length?o:[s("div",{class:D("-empty"),text:"No starred messages in this chat"})])),document.body.append(z),fr=t}Hh(),B.classList.add(D("-open")),B.setAttribute("aria-expanded","true")}function Uh(){for(let r of document.querySelectorAll('[data-bloom="starred"]'))r.remove();let e=Bh(),t=e?.parentElement??null,o=y();if(!e||!t||t.closest(u.sidebars)||!o||ue()||!qe(t)){B?.remove(),B=null,jt();return}B||(B=s("button",{class:D("-toggle"),attrs:{type:"button","data-bloom":"message-star","data-place":"header","aria-label":"Starred messages","aria-expanded":"false"},on:{pointerdown:r=>r.stopPropagation(),pointerenter:()=>{Wt(),Qe?.enter(),mr=window.setTimeout(()=>{ft=!0,mt()},xh)},pointerleave:r=>{gr(r.relatedTarget)||(Wt(),pr()&&Qe?.leave(r))},click:r=>{r.preventDefault(),r.stopPropagation(),Ke=!Ke,ft=Ke,Wt(),Ke||jt(),mt()}}},N("star"))),(B.parentElement!==t||B.nextElementSibling!==e)&&e.before(B);let n=e.getBoundingClientRect();n.width>0&&(B.style.width=`${n.width}px`,B.style.height=`${n.height}px`),B.classList.toggle(D("-here"),ya().length>0),Nh()}function Gh(){let e=new Set(ya().map(t=>t.messageId));for(let t of document.querySelectorAll('[data-bloom="navigator"] .bloom-nav-tick, [data-bloom="navigator"] .bloom-nav-row'))t.classList.toggle(D("-mark"),!!t.dataset.messageId&&e.has(t.dataset.messageId))}function mt(){if(!pa){pa=!0;try{for(let e of document.querySelectorAll('[data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();Dh(),Uh(),Gh()}finally{pa=!1}}}function Fh(){jt(),B?.remove(),B=null;for(let e of document.querySelectorAll('[data-bloom="message-star"], [data-bloom="star-list"], [data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();for(let e of document.querySelectorAll(`.${D("-mark")}`))e.classList.remove(D("-mark"))}var ku=f({name:"StarChats",description:"Star a message from its toolbar. The star left of the top-right menu opens this chat's list.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:Fo,styles:()=>`${Cu}${Fo.store.replaceReadAloud?Be([Eh]):""}`,onSettingsChange(e){(e==="messages"||e==="replaceReadAloud")&&mt()},start(){for(let o of document.querySelectorAll('[data-bloom="star-list"]'))o.remove();Qe=xn({over:gr,trigger:()=>B,panel:()=>z,setHeld(o){if(o){ft=!0,mt();return}Ke||(ft=!1,mt())}}),fa=C(o=>H(o)&&mt());let e=o=>{gr(o.target)||pr()&&jt()};document.addEventListener("pointerdown",e,!0);let t=o=>{o.key!=="Escape"||!pr()||(o.preventDefault(),jt())};document.addEventListener("keydown",t,!0),ga=()=>{document.removeEventListener("pointerdown",e,!0),document.removeEventListener("keydown",t,!0)},mt()},stop(){fa?.(),fa=void 0,ga?.(),ga=void 0,Wt(),Qe?.dispose(),Qe=void 0,Fh()}});var Iu="filter:blur(6px)!important;transition:filter 0.2s ease",Bu=`:is(${u.sidebars})`,pt="data-bloom-streamer-open",Yh="[data-app-action-sidebar-thread-row], [data-app-action-sidebar-project-row], .bloom-recent-item";function Kh(){return{conversations:{selectors:[`${Bu} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0,row:"[data-app-action-sidebar-thread-row]"},projects:{selectors:[`${Bu} a:is([href*="/project"], [href*="/g/g-p-"])`,"[data-app-action-sidebar-project-row]",".bloom-recent-project"],hover:!0,row:"[data-app-action-sidebar-project-row]"},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}}}var Pu=p({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function Qh(e,t){let o=[`:is(${e}):hover`,`.bloom-recent-item:hover :is(${e})`,`:is(${e})[${pt}]`];return t&&o.push(`${t}:hover`,`${t}:hover :is(${e})`,`${t}:is(${e}):hover`,`${t}[${pt}]`,`${t}[${pt}] :is(${e})`),o.join(",")}function Wh(){let e=Kh();return Object.entries(e).filter(([t])=>Pu.store[t]).map(([,t])=>{let o=t.selectors.join(",");if(!t.hover)return`:is(${o}){${Iu}}`;let n="row"in t?t.row:void 0;return`:is(${o}){${Iu}}${Qh(o,n)}{filter:none!important}`}).join(`
`)}function jh(e,t){for(let o of document.elementsFromPoint(e,t))if(o instanceof Element){let n=o.closest(Yh);if(n)return n}return null}function qa(e){for(let t of document.querySelectorAll(`[${pt}]`))t!==e&&t.removeAttribute(pt);e&&!e.hasAttribute(pt)&&e.setAttribute(pt,"")}var zt,zh=Pe(()=>{zt&&qa(jh(zt.clientX,zt.clientY))});function Aa(e){zt=e,zh()}function Vh(e){e.relatedTarget instanceof Node&&document.documentElement.contains(e.relatedTarget)||(zt=void 0,qa(null))}var va,hr,Ou=f({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:Pu,styles:Wh,start(){va=me(),hr=new AbortController;let e={capture:!0,signal:hr.signal,passive:!0};document.addEventListener("pointerover",Aa,e),document.addEventListener("pointermove",Aa,e),document.addEventListener("pointerout",Aa,e),window.addEventListener("pointerleave",Vh,e)},stop(){hr?.abort(),hr=void 0,zt=void 0,qa(null),va?.(),va=void 0}});var Du=p({openNewAsTemporary:{type:"boolean",description:"Open New chat as a temporary chat.",default:!1}}),Jh=/^(?:new chat|新聊天)$/i,br;function Zh(e){return e?"/?temporary-chat=true":"/"}function Xh(e){let t=Zh(e);`${location.pathname}${location.search}`===t||e&&ue()&&location.pathname==="/"||location.assign(t)}function $h(e){if(e.closest("[data-bloom]"))return!1;try{let t=new URL(e.href,location.origin);return t.origin===location.origin&&t.pathname==="/"}catch{return!1}}function _h(e){return e.closest("[data-bloom], [data-app-action-sidebar-project-row]")?!1:Jh.test(e.getAttribute("aria-label")??h(e.textContent??""))}function eb(e){if(!Du.store.openNewAsTemporary||ue())return;let{target:t}=e;if(!(t instanceof Element))return;let o=t.closest("a[href], button"),n=o instanceof HTMLAnchorElement?$h(o):!!o&&_h(o);!o||!n||o.closest(`${u.sidebarScroll}, ${u.rail}, ${u.oldSidebar}, nav`)&&(e.preventDefault(),e.stopPropagation(),Xh(!0))}function Ru(){for(let e of document.querySelectorAll('[data-bloom="temporary-chat"]'))e.remove()}var Hu=f({name:"TemporaryChat",description:"Optionally open New chat as a temporary chat. No extra sidebar button.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"ghost",enabledByDefault:!0,settings:Du,start(){Ru(),br=new AbortController,document.addEventListener("pointerdown",eb,{capture:!0,signal:br.signal})},stop(){br?.abort(),br=void 0,Ru()}});var We=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)','[data-turn-key] [data-message-author-role="user"] blockquote:not(.twitter-tweet)','[class~="group/user-message"] blockquote:not(.twitter-tweet)'].join(","),Sa=p({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function tb(){let e=[`${We}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${We}>*{margin-block:0!important}`];return Sa.store.italic||e.push(`${We}{font-style:inherit!important}`),Sa.store.quotes||(e.push(`${We}{quotes:none!important}`),e.push(`${We}::before,${We}::after,${We} p::before,${We} p::after{content:none!important}`)),e.join(`
`)}var Nu=f({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:Sa,styles:tb});var ob=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],nb=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",rb='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',Uu=p({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function ib(){let e=`${Uu.store.width}rem`;return`:is(${nb}){${ob.map(t=>`${t}:${e}!important`).join(";")}}:is(${rb}){max-width:min(100%, ${e})!important}`}var Gu=f({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:Uu,styles:ib});var ab=[rl,ql,kl,Pl,Ql,zl,Jl,nc,fc,qc,Ec,Yc,Qc,Wc,Zc,uu,bu,wu,Tu,ku,Ou,Hu,Nu,Gu],wa=ab;var sb=new E("Bloom"),Fu="2.0.88";var xa=0;function lb(){xa++,ts(),Zt(),Wo()}async function Ea(){let e=++xa,t=()=>e===xa;Zt(),Wo(),ps();for(let o of wa)o.updatedAt=Bs[o.name];Ja(wa),Wa(),indexedDB.deleteDatabase("bloompp"),Ko("base",ns),Is(),tn("Init"),sn().then(()=>{t()&&(Ra(),tn("DOMContentLoaded"))}),await hs(),t()&&(tn("HostReady"),es(),sb.info(`Bloom++ ${Fu} ready`))}var cb=new E("Boot");window===window.top&&(Ha(X.Bloom),Na(Ta),Ea().catch(e=>cb.error("Startup failed",e)));})();
