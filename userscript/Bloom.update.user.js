// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.92
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

/* Bloom++ v2.0.92. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var td=Object.defineProperty;var od=(e,t)=>{for(var o in t)td(e,o,{get:t[o],enumerable:!0})};var E=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var se=(e,t,o)=>Math.min(o,Math.max(t,e)),O=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ha=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,ue=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,h=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function zo(e,t){return`${e} ${t}${e===1?"":"s"}`}async function Na(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function Oe(e){try{return JSON.parse(e)}catch{return}}var _=typeof unsafeWindow>"u"?window:unsafeWindow;var nd=new E("Styles"),Pe=new Map,eo=new Set,Je=new Map,qr=!0,Ua=e=>e.replaceAll(/[^A-Za-z0-9_-]/g,"_"),rd=e=>`:where(:root){--bloom-sheet-${Ua(e)}:1}`,id=(e,t)=>`${rd(e)}${t}`,Fa=e=>`bloom-style-${e}`;function Ga(e){try{return[...e.cssRules].map(t=>t.cssText).join(`
`)}catch{return""}}function ad(e,t){let o=Ga(e);return o?o.includes(`--bloom-sheet-${Ua(t)}`)?!0:t==="plugin-StreamerMode"?o.includes("blur(6px)")&&(o.includes("data-app-action-sidebar-thread-title")||o.includes("data-bloom-streamer-open")):t==="plugin-WiderChat"?o.includes("--composer-adjacent-max-width")&&o.includes("--thread-content-max-width"):t==="plugin-ComposerOpacity"?o.includes("--composer-layout-surface-backdrop-filter")||o.includes("--composer-layout-surface-background")&&o.includes("color-mix"):!1:!1}function Ya(e){let t=Ga(e);return t?!!(t.includes("--bloom-")||t.includes(".bloom-")||t.includes("[data-bloom")||t.includes("--bloom-sheet-")||t.includes("blur(6px)")&&t.includes("data-app-action-sidebar-thread-title")||t.includes("--composer-adjacent-max-width")&&t.includes("--thread-content-max-width")||t.includes("--composer-layout-surface-backdrop-filter")):!1}function Ka(){let e=document.adoptedStyleSheets.filter(t=>!eo.has(t)&&!Ya(t));document.adoptedStyleSheets=[...e,...Pe.values()]}function Qa(e){document.readyState==="loading"||e.parentNode===document.head||document.head.append(e)}function sd(e,t){let o=Je.get(e);o||(o=document.createElement("style"),o.id=Fa(e),Je.set(e,o)),o.textContent!==t&&(o.textContent=t),Qa(o)}function Vo(e,t){let o=id(e,t);if(qr)try{let n=Pe.get(e);n||(n=new _.CSSStyleSheet,Pe.set(e,n),eo.add(n)),n.replaceSync(o),Ka();return}catch(n){nd.warn("Constructed style sheets unavailable, using <style> after parsing",n),qr=!1;let r=Pe.get(e);r&&eo.delete(r),Pe.delete(e)}sd(e,o)}function to(e){let t=Pe.get(e);t&&(eo.delete(t),Pe.delete(e)),Je.get(e)?.remove(),Je.delete(e);for(let o of document.querySelectorAll(`style[id="${Fa(e)}"]`))o.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(o=>o!==t&&!ad(o,e)),qr&&Ka()}catch{}}function oo(){Pe.clear(),eo.clear();for(let e of Je.values())e.remove();Je.clear();for(let e of document.querySelectorAll("style[id^='bloom-style-']"))e.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(e=>!Ya(e))}catch{}}function Wa(){for(let e of Je.values())Qa(e)}var L=e=>(...t)=>t.map(o=>e+o).join(" "),Jo=(...e)=>e.filter(Boolean).join(" "),Re=e=>e.length?`${e.map(t=>`${t}:not([data-bloom])`).join(",")}{display:none!important}`:"";var ja="__bloomHost",Er=new E("Boot"),ld=['[data-bloom="navigator"]','[data-bloom="settings"]','[data-bloom="history-hud"]','[data-bloom="history-dialog"]','[data-bloom="star-list"]','[data-bloom="entry"]','[data-bloom="menu-entry"]','[data-bloom="message-star"]','[data-bloom="starred"]','[data-bloom="chat-star"]','[data-bloom="queue"]','[data-bloom="recent"]','[data-bloom="quote-chip"]','[data-bloom="quote-back"]','[data-bloom="cls"]','[data-bloom="timestamp"]','[data-bloom="tooltip"]'].join(", "),cd=["data-bloom-greeting","data-bloom-placeholder","data-bloom-streamer-open","data-bloom-share","data-bloom-invite","data-bloom-csi-avatar","data-bloom-csi-sized"];function Zo(){if(!(typeof document>"u"||!document.documentElement)){for(let e of document.querySelectorAll(ld))e.remove();for(let e of cd)for(let t of document.querySelectorAll(`[${e}]`))t.removeAttribute(e);for(let e of document.querySelectorAll("[data-bloom-text]"))e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size"),e.style.removeProperty("--bloom-text")}}function ud(e){if(Er.warn("Replacing another Bloom++ instance",e.VERSION),e.destroy){e.destroy();return}for(let t of e.plugins?.values()??[]){try{t.stop?.()}catch(o){Er.error("Failed to stop previous plugin",o)}t.styles="",t.start=void 0}oo()}function za(e){let t=_,o=new Set;for(let n of[e,t.Bloom,t[ja]])if(!(!n||o.has(n))){o.add(n);try{ud(n)}catch(r){Er.error("Failed to retire Bloom++",r)}}Zo()}function Va(e){let t=_;try{delete t.Bloom}catch{}Object.defineProperty(t,"Bloom",{value:e,configurable:!0,writable:!0}),Object.defineProperty(t,ja,{value:e,configurable:!0,writable:!0})}var Da={};od(Da,{VERSION:()=>ed,destroy:()=>qb,init:()=>Ra,plugins:()=>xe});var dd=new E("Dom");function s(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var Ja=document.createElement("template");function Za(e){return Ja.innerHTML=e.trim(),Ja.content.firstElementChild.cloneNode(!0)}var Ze=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),K=(e,t=document)=>[...t.querySelectorAll(e)].find(Ze)??null,md=16,fd="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function Xa(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([fd],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function ro(e){document.hidden?setTimeout(e,md):requestAnimationFrame(e)}function De(e){let t=!1;return()=>{t||(t=!0,ro(()=>{t=!1;try{e()}catch(o){dd.error("Scheduled task failed",o)}}))}}var Xo=new Set,$o=[],no,pd=De(()=>{let e=$o;$o=[];for(let t of Xo)t(e)});function C(e){return Xo.add(e),no||(no=new MutationObserver(t=>{$o.push(...t),pd()}),no.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{Xo.delete(e),!Xo.size&&(no?.disconnect(),no=void 0,$o=[])}}var gd=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),N=e=>!e.length||e.some(t=>!gd(t.target)),hd=e=>`"${e.replaceAll("\\","\\\\").replaceAll('"','\\"').replaceAll(`
`,"\\A ")}"`;function Xe(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size"),e.style.removeProperty("--bloom-text");return}e.style.setProperty("--bloom-text",hd(t)),e.getAttribute("data-bloom-text")!==t&&e.setAttribute("data-bloom-text",t)}function f(e){return e}var $a=new E("Storage");function _o(e){try{return localStorage.getItem(e)??void 0}catch{return}}function en(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(o){$a.warn("localStorage write failed",o)}}function Tr(e){try{localStorage.removeItem(e)}catch(t){$a.warn("localStorage delete failed",t)}}function _a(e,t){addEventListener("storage",o=>{o.key===e&&t(o.newValue)})}var Cr="BloomSettings",bd=100,vt={plugins:{}},tn=new Set,Mr=new Set,io;function es(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=Oe(t);return!O(t)||!O(t.plugins)||!Object.keys(t.plugins).length?null:t}function ts(){let e=es(_o(Cr));e&&(vt.plugins=e.plugins)}var os=(e,t)=>`${e}
${t}`;function ns(){io=void 0,Mr.clear(),en(Cr,vt)}function yd(e){let t=es(e);if(!t)return;let o=[];for(let n of new Set([...Object.keys(vt.plugins),...Object.keys(t.plugins)])){let r=vt.plugins[n]??={},i=O(t.plugins[n])?t.plugins[n]:{};for(let a of new Set([...Object.keys(r),...Object.keys(i)]))Mr.has(os(n,a))||JSON.stringify(r[a])===JSON.stringify(i[a])||(i[a]===void 0?delete r[a]:r[a]=i[a],o.push([n,a]))}for(let[n,r]of o)for(let i of tn)i(n,r)}function Lr(){io&&(clearTimeout(io),ns())}var de=(e,t)=>vt.plugins[e]?.[t];function $e(e,t,o){let n=vt.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,Mr.add(os(e,t)),clearTimeout(io),io=setTimeout(ns,bd);for(let r of tn)r(e,t)}function wt(e){return tn.add(e),()=>void tn.delete(e)}function kr(e){return e.type==="component"?void 0:e.default}function p(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>de(t.pluginName,n)??(e[n]&&kr(e[n])),set:(o,n,r)=>($e(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&de(t.pluginName,o)!==void 0&&$e(t.pluginName,o)}};return t}var rs=e=>{let t=()=>{let o=de("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();$e("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},on=rs("pinnedPlugins"),nn=rs("starredPlugins");addEventListener("pagehide",Lr);_a(Cr,yd);var an=new E("PluginManager"),xe=new Map,_e=new Set,Br=new Set,Ir=new Set;function is(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),xe.set(t.name,t)}var St=e=>!!e.required||(de(e.name,"enabled")??!!e.enabledByDefault);var ao=e=>`plugin-${e.name}`;function as(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?Vo(ao(e),t):to(ao(e))}function Ad(e){if(!_e.has(e.name))try{as(e),e.start?.(),_e.add(e.name)}catch(t){to(ao(e)),an.error(`Failed to start ${e.name}`,t)}}function Or(e){_e.delete(e.name),to(ao(e));try{e.stop?.()}catch(t){an.error(`Failed to stop ${e.name}`,t)}}var ss=e=>e.startAt??"HostReady";function ls(e){if(St(e)){Br.has(ss(e))&&Ad(e);return}Or(e)}function sn(e){Br.add(e);for(let t of xe.values())ss(t)===e&&ls(t);an.info(`${e}: ${[..._e].join(", ")}`)}function cs(e,t){$e(e.name,"enabled",t),Lr()}function vd(){for(let e of xe.values())e.required||St(e)||(_e.has(e.name)?Or(e):to(ao(e)))}var rn;function us(){rn?.(),rn=C(()=>vd())}function ds(){rn?.(),rn=void 0;for(let e of xe.values())Or(e);_e.clear(),Br.clear()}function ms(e){return Ir.add(e),()=>void Ir.delete(e)}wt((e,t)=>{let o=xe.get(e);if(o){if(t==="enabled"){typeof de(e,"enabled")=="boolean"&&ls(o);for(let n of Ir)n();return}if(_e.has(e))try{as(o),o.onSettingsChange?.(t)}catch(n){an.error(`Settings change failed for ${e}`,n)}}});var fs=`/*
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
`;var Sd=new E("Events");function ln(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){Sd.error(`Listener for ${String(t)} failed`,r)}}}}var u={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',readAloud:'button:is([aria-label="Read aloud" i], [aria-label^="Read aloud" i], [aria-label="Stop reading" i], [aria-label^="Stop reading" i], [aria-label="\u6717\u8BFB"], [aria-label^="\u6717\u8BFB"], [aria-label="\u505C\u6B62\u6717\u8BFB"], [data-testid*="read-aloud" i])',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',composerConversation:"[data-above-composer-conversation-id]",oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",modelTrigger:'[data-testid="model-switcher-dropdown-button"], button[aria-label="Model selector" i], button[aria-label="Select ChatGPT model" i]',modelItem:'[role="menu"] [data-testid^="model-switcher-"], [role="menuitem"][data-testid^="model-switcher-"], [role="menu"] [role="menuitemradio"], [role="menu"] [data-reasoning-slider]',effortSlider:'[role="menu"] [data-reasoning-slider]',homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]',headerMore:'button[aria-label="More" i], button[aria-label="\u66F4\u591A"]',rightPanel:"aside[data-app-shell-focus-area='right-panel']",summaryPanel:"[data-summary-panel-variant]"};var ps=/[​-‍﻿]/g,le=()=>K(u.composerInput),et=e=>e instanceof HTMLElement&&e.matches(u.composerInput),W=(e=le())=>e?.closest("form")??document.querySelector(u.oldComposerForm);function M(e=le()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(ps,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(ps,"").trim()}var xd=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function ne(e,t=le()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return xd?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function gs(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:a,value:c}=e;return{first:!c.slice(0,i).includes(`
`),last:!c.slice(a).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var hs=e=>{let t=W();return(t&&K(e,t))??K(e)},xt=()=>hs(u.stopButton),qd=()=>{let e=hs(u.sendButton);return e&&!e.matches(u.stopButton)?e:null};function cn(){let e=qd();if(e){e.disabled||e.click();return}le()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var bs=()=>Ze(xt());var vs=new E("Network"),Ed=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,Td=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,dn=1e3,Cd=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),j=ln(),Rr=new Map,ys=new Map,Md=1,ce=e=>e?Rr.get(e)??null:null;function un(e){let t=Rr.get(e);return t||Rr.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var ws=e=>e==="user"||e==="assistant";function Ss(e){let t=e.author?.role;if(!e.id||!ws(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(l=>typeof l=="string").join(`
`).trim(),i=n.filter(l=>O(l)&&l.content_type==="image_asset_pointer").length,a=e.metadata?.attachments,c=Array.isArray(a)&&a.length>0;return!r&&!i&&!c?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*dn:null,text:r,hasFiles:c,imageCount:i}}var xs=e=>e.filter((t,o)=>t.role==="user"||e[o+1]?.role!=="assistant"),Dr=e=>e.map(t=>t.createTime).filter(t=>t!=null);function Ld(e,t){let o=Dr(e),n=Dr(t);return!o.length||!n.length?!1:Math.max(...o)<Math.min(...n)}function kd(e){let t=Dr(e);if(t.length<2)return e;let[o]=t,n=o-e.length;return e.map((i,a)=>(i.createTime!=null&&(n=i.createTime),{message:i,index:a,time:i.createTime??n})).toSorted((i,a)=>i.time-a.time||i.index-a.index).map(i=>i.message)}function Id(e,t){let o=t.filter(O).map(c=>O(c.message)?c.message:c);for(let c of o)c.id&&c.create_time&&e.times.set(c.id,c.create_time*dn);let n=o.map(Ss).filter(c=>c!=null),r=new Set(n.map(c=>c.id)),i=e.chain.filter(c=>!r.has(c.id)),a=Ld(n,i)?[...n,...i]:[...i,...n];return e.chain=xs(kd(a)),e}function Bd(e,t){if(!O(t)||!(O(t.mapping)||Array.isArray(t.messages)))return null;let o=un(e);if(typeof t.title=="string"&&t.title&&(o.title=t.title),Array.isArray(t.messages))return Id(o,t.messages);let n=t.mapping;for(let c of Object.values(n)){let l=c.message?.create_time;c.message?.id&&l&&o.times.set(c.message.id,l*dn)}let r=[],i=new Set,a=typeof t.current_node=="string"?t.current_node:null;for(;a&&!i.has(a)&&n[a];){i.add(a);let c=n[a].message,l=c?Ss(c):null;l&&r.push(l),a=n[a].parent??null}return r.length&&(o.chain=xs(r.toReversed())),o}function Od(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}var Pr=e=>typeof e=="string"?e:null;function Pd(e){let t=typeof e?.body=="string"?Oe(e.body):null;if(!O(t))return{conversationId:null,parentId:null,userId:null};let[o]=Array.isArray(t.messages)?t.messages:[];return{conversationId:Pr(t.conversation_id),parentId:Pr(t.parent_message_id),userId:O(o)?Pr(o.id):null}}function Rd(e,t){if(!O(e))return;typeof e.type=="string"&&Cd.has(e.type)&&(t.handoff=!0);let o=O(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(un(e.conversation_id).title=e.title,j.emit("conversation",un(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&ws(n.author?.role)){let r=n.create_time*dn;t.conversationId&&un(t.conversationId).times.set(n.id,r),j.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function Dd(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:a}=await o.read();if(i)break;r+=n.decode(a,{stream:!0});let c=r.split(`
`);r=c.pop()??"";for(let l of c){if(!l.startsWith("data:"))continue;let d=l.slice(5).trim();d&&d!=="[DONE]"&&Rd(Oe(d),t)}}}async function Hd(e,t,o){let{conversationId:n}=t,r={conversationId:n,error:!1,handoff:!1};ys.set(e,n),j.emit("generate-start",{requestId:e,...t});try{let i=await o;i.ok?i.headers.get("content-type")?.includes("event-stream")&&await Dd(i.clone(),r):r.error=!0}catch(i){let a=i instanceof DOMException&&i.name==="AbortError";r.handoff||=a,r.error||=!a}finally{ys.delete(e),j.emit("generate-end",{requestId:e,...r})}}async function Nd(e,t){try{let o=await t;if(!o.ok)return;let n=Bd(e,await o.clone().json());n&&j.emit("conversation",n)}catch(o){vs.debug("Conversation read skipped",o)}}function Ud(e,t,o){let n=Od(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&Ed.test(n.pathname)){Hd(Md++,Pd(t),o);return}let i=r==="GET"&&n.pathname.match(Td)?.[1];i&&Nd(i,o)}var As=!1;function qs(){if(As)return;As=!0;let e=_.fetch,t=function(o,n){let r=e.call(this??_,o,n);try{Ud(o,n,r)}catch(i){vs.error("Fetch tap failed",i)}return r};_.fetch=typeof exportFunction=="function"?exportFunction(t,_):t}var Fd="__reactContainer$",Es="__reactFiber$";function mn(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var Hr=(e,t)=>Object.keys(e.wrappedJSObject??e).some(o=>o.startsWith(t)),qe=e=>!Hr(document,Fd)||Hr(e,Es);function tt(){return document.body?Promise.resolve():new Promise(e=>{let t=new MutationObserver(()=>{document.body&&(t.disconnect(),e())});t.observe(document,{childList:!0,subtree:!0})})}async function Ts(){await tt();let e=Date.now()+8e3;for(;!Hr(document.body,Es)&&Date.now()<e;)await new Promise(t=>setTimeout(t,100))}var Gd=new E("Route"),Cs=/\/c\/(?!local-)([\w-]+)/,Yd=500,Fr=e=>{try{return new URL(e,location.origin).pathname.match(Cs)?.[1]??null}catch{return null}},A=()=>location.pathname.match(Cs)?.[1]??null,hn=()=>location.pathname==="/",Kd=/^\/g\/g-p-[^/]+(?:\/project)?\/?$/,Ms=()=>Kd.test(location.pathname),me=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",pn=new Set,gn=location.href,Ur=A(),fn;function Nr(){if(location.href===gn)return;let e={prevHref:gn,href:location.href,prevId:Ur,id:A()};gn=e.href,Ur=e.id;for(let t of pn)try{t(e)}catch(o){Gd.error("Route listener failed",o)}}function Qd(){let e=new AbortController,{navigation:t}=_;t?.addEventListener("currententrychange",()=>queueMicrotask(Nr),{signal:e.signal}),addEventListener("popstate",Nr,{signal:e.signal});let o=setInterval(Nr,Yd);return()=>{e.abort(),clearInterval(o)}}function fe(e){return pn.add(e),fn||(gn=location.href,Ur=A(),fn=Qd()),()=>{pn.delete(e),!pn.size&&(fn?.(),fn=void 0)}}var Wd=["data-turn","data-message-author-role"],jd=/:(user|assistant)$/,Gr=`${u.messageUnit}, ${u.oldMessage}`,Yr=e=>e==="user"||e==="assistant",Bs=()=>!!document.querySelector(u.timelineScroll),Os=()=>!!K(u.timelineScroll),Ps=()=>A()??document.querySelector(u.composerConversation)?.getAttribute("data-above-composer-conversation-id")??"",qt=()=>Bs()?K(u.timelineScroll):document;function lo(){if(Bs())return K(u.timelineScroll);let e=document.querySelector(u.turn);for(let t=e?.parentElement;t;t=t.parentElement){let{overflowY:o}=getComputedStyle(t);if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight)return t}return document.scrollingElement}var Et=e=>e.getAttribute("data-chatgpt-search-unit-key")?.match(jd)?.[1]??null,Rs=e=>[...e.querySelectorAll(u.searchUnit)].filter(t=>Et(t)&&!t.parentElement?.closest(u.searchUnit)),Ls=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function so(e){let t=Ls(e);return t.length?t:[...new Set([...e.querySelectorAll(Gr)].flatMap(Ls))]}function Tt(e=qt()){if(!e)return[];let t=Rs(e);return t.length?t:[...e.querySelectorAll(Gr)].filter(o=>!o.parentElement?.closest(Gr))}function zd(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function Vd(e){for(let t of Wd){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(Yr(o))return o}return e.querySelector(u.markdown)||e.querySelector(u.generatedImage)?"assistant":null}var Jd=e=>!e.parentElement?.closest(u.turn);function He(){let e=ce(A())?.chain??[];return[...qt()?.querySelectorAll(u.turn)??[]].filter(Jd).flatMap(o=>{let n=Rs(o),r=n.length?n.map(i=>({el:i,known:Et(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=d=>!n.some(m=>m.contains(d))&&h(d.textContent??""),a=[...o.querySelectorAll(u.assistantMarkdown)].find(d=>i(d)&&!bn.test(h(d.textContent??""))),c=[...o.querySelectorAll(u.activityHeader)].findLast(i),l=a??c;l&&r.push({el:l,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?so(o):Tt(o).flatMap(so),a=n??Vd(o)??zd(i,e)??(r%2?"assistant":"user"),c=o.closest(u.turn)??o,l=!o.closest(u.searchUnit)&&!!c.querySelector(u.turnBusy),d=a==="assistant"&&(o.matches(u.turnBusy)||!!o.querySelector(u.turnBusy)||l);return{el:o,role:a,messageIds:i,streaming:d}})}var Zd="[data-bloom], .sr-only",Ds=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,bn=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,ks=new WeakMap;function Ct(e){let o=(e.el.closest(u.turn)??e.el).textContent?.length??0,n=ks.get(e.el);if(n?.length===o)return n.summary;let r=Xd(e);return ks.set(e.el,{length:o,summary:r}),r}function Is(e){let t=new Set,o=[];for(let n of e.querySelectorAll(u.assistantMarkdown)){if(n.closest(u.searchUnit))continue;let r=h(n.textContent??"");!r||bn.test(r)||Ds.test(r)||t.has(r)||(t.add(r),o.push(r))}return o}function Xd(e){let t=e.el.querySelectorAll(u.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.closest(u.turn);if(e.role==="assistant"&&o&&e.el.matches(u.assistantMarkdown)&&!e.el.closest(u.searchUnit)){let l=Is(o);if(l.length)return l.join(" \xB7 ")}let n=e.el.querySelector(e.role==="assistant"?u.markdown:".whitespace-pre-wrap")??e.el,i=[...n.querySelectorAll(Zd)].map(l=>h(l.textContent??"")).filter(Boolean).reduce((l,d)=>l.replace(d,`
`),n.innerText||n.textContent||""),a=i.split(`
`).map(h).filter(l=>l&&!Ds.test(l)&&!bn.test(l));if(a.length)return a.join(" ");if(e.role==="assistant"&&o){let l=Is(o);if(l.length)return l.join(" \xB7 ")}let c=i.split(`
`).map(h).filter(l=>bn.test(l));return c.length?c.at(-1)??"":e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function yn(e){return e.text?h(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var Kr=e=>e.matches(u.timelineScroll)&&getComputedStyle(e).flexDirection==="column-reverse";var $d=250,_d=400,em=6e4,tm=5e3,om=`:is(${u.turn}) :is(${u.turnBusy})`,x=ln(),wn=new Set,Qr=new Set,Ne=!1,Ns=0,Mt=null,Lt=!1,An=!1,co=0,Sn=!1,uo=null,Hs=!1,R=()=>({generating:Ne,conversationId:A()}),Us=()=>bs()||!!qt()?.querySelector(om);function nm(){let e=Us();return e?An||(co=0,Sn=!0):An=!1,[...wn].some(t=>!Qr.has(t))||e&&!An||Date.now()<co}function rm(){return uo?.error?"error":Lt?"stopped":"done"}function im(){Mt=null,Ne=!1,Sn=!1,x.emit("fall",{conversationId:A(),outcome:rm()}),Lt=!1,uo=null}function Fs(){let e=nm();e&&!Ne&&(Ne=!0,Ns=Date.now(),Lt=!1,uo=null,x.emit("rise",{conversationId:A()})),e||!Ne?Mt=null:Mt==null?Mt=Date.now():Date.now()-Mt>=_d&&im()}function vn(){Fs(),x.emit("tick",R())}function am({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(Ne||Date.now()-Ns<em);if(!o&&Ne){for(let n of wn)Qr.add(n);An=Us(),co=0,Sn=!1,Mt=null,Ne=!1,Lt=!1,uo=null,x.emit("fall",{conversationId:e,outcome:"left"})}x.emit("context",{prevId:e,id:t,migrated:o}),vn()}function sm(e){e.target instanceof Element&&e.target.closest(u.stopButton)&&(Lt=!0,co=0)}function Gs(){Hs||(Hs=!0,j.on("generate-start",({requestId:e})=>{wn.add(e),vn()}),j.on("generate-end",e=>{wn.delete(e.requestId),!Qr.delete(e.requestId)&&(uo=e,co=e.handoff&&!e.error&&!Lt&&!Sn?Date.now()+tm:0,vn())}),fe(am),document.addEventListener("click",sm,!0),Xa(vn,$d),mn().then(()=>C(Fs)))}var Ys={BetterNavigator:1793350808e3,BetterQuotes:179333264e4,ChatListStatus:1793351872e3,ChatStateFavicons:1790623094e3,Cleaner:1793267811e3,ComposerOpacity:1793344667e3,Continue:1790939902e3,CustomSidebarIdentity:1790658669e3,GreetingCustomizer:1793350808e3,InputHistory:1793351708e3,MessageTimestamps:1791080494e3,NoDictation:1793335268e3,NoShareLink:1790658669e3,NoSidebarIdentity:1790616549e3,PromptQueue:1793267321e3,RecentTopics:179333264e4,ResponseNotification:1790661368e3,Settings:1793351462e3,SidebarIdentityOpacity:1790682605e3,StarChats:1793350808e3,StreamerMode:1793344667e3,TemporaryChat:1792014624e3,UserQuotes:1793345744e3,WiderChat:179333264e4};var v=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,lm="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",cm={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${lm}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:v('<path d="M18 6 6 18M6 6l12 12"/>'),gear:v('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:v('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:v('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:v('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:v('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:v('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:v('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:v('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:v('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:v('<path d="m6 9 6 6 6-6"/>'),play:v('<path d="M7 4v16l13-8z"/>'),plus:v('<path d="M12 5v14M5 12h14"/>'),check:v('<path d="m5 12 5 5 9-10"/>'),alert:v('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:v('<path d="M4 5h16v11H9l-5 4z"/>'),layout:v('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:v('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:v('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:v('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:v('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:v('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:v('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:v('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:v('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:v('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:v('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:v('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:v('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:v('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:v('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:v('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),ghost:v('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},U=e=>Za(cm[e]);var Ee="data-bloom-tip",Wr=6,jr=8,ot,Ks=null;function kt(e){if(e===Ks)return;if(Ks=e,!e){ot?.remove();return}ot??=s("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),ot.textContent=e.getAttribute(Ee),document.body.append(ot);let t=e.getBoundingClientRect(),{width:o,height:n}=ot.getBoundingClientRect(),r=t.bottom+Wr+n<=innerHeight-jr;ot.style.left=`${se(t.left+t.width/2-o/2,jr,innerWidth-o-jr)}px`,ot.style.top=`${r?t.bottom+Wr:t.top-Wr-n}px`}var Qs=e=>e instanceof Element?e.closest(`[${Ee}]`):null;function Ws(){let e=new AbortController,t={passive:!0,signal:e.signal};return document.addEventListener("pointerover",o=>kt(Qs(o.target)),t),document.addEventListener("pointerout",o=>o.relatedTarget||kt(null),t),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&kt(Qs(o.target)),t),document.addEventListener("focusout",()=>kt(null),t),document.addEventListener("pointerdown",()=>kt(null),t),()=>{e.abort(),kt(null)}}function zr(e,t,o,n=!1){let r=s("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let a=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(a)),t(a)===!1&&r.setAttribute("aria-checked",String(!a))}),r}function z(e,t,o){return s("button",{class:Jo("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button","data-bloom":"control"},on:{click:t}})}function Q(e,t,o,n){let r=s("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":t,"data-bloom":"control",[Ee]:t},on:{click:o}},U(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function xn(e,t,o,n,r,i){let a=s("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});a.value=String(e);let c=s("output",{text:`${a.value}${r}`});return a.addEventListener("input",()=>{c.textContent=`${a.value}${r}`,i(Number(a.value))}),s("div",{class:"bloom-slider"},a,c)}function Vr(e,t,o){let n=s("select",{class:"bloom-select"},...t.map(r=>s("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function mo(e,t,o="",n="text"){let r=s("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var um=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,js=/\S+@\S+\.\S+/,dm=3,mm=/^\/g\/(g-p-[^/]+)\//,fm=/^g-p-[0-9a-f]+-?/i,zs=e=>!!e.closest(".sr-only"),Jr=e=>!!e?.querySelector(u.menuButton);function Vs(){return[...document.querySelectorAll(u.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(Jr)).filter(e=>e!=null)}function Js(){let e=[...document.querySelectorAll(u.oldProfile)];if(e.length)return e.map(o=>{let n=o.parentElement?.children.length===1?o.parentElement:o;return{kind:"profile",anchor:n,insert:r=>n.before(r)}});let t=Vs().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(u.rail)){let n=[...o.children].find(Jr);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}var Zr=e=>!e.closest("[data-bloom]")&&(!!e.querySelector("img, [class*=rounded-full]")||_s(e).some(t=>!zs(t))),Zs=e=>[...e.parentElement?.children??[]].find(t=>t!==e&&t instanceof HTMLElement&&Zr(t))??null;function Xs(){let e=[...document.querySelectorAll(u.oldProfile)];return e.length?e:[...Vs(),...[...document.querySelectorAll(u.rail)].map(o=>[...o.children].findLast(Jr))].map(o=>[...o?.querySelectorAll(u.menuButton)??[]].findLast(n=>Zr(n)||Zs(n))).filter(o=>o!=null)}var $s=()=>Xs().map(e=>Zr(e)?e:Zs(e)).filter(e=>e!=null);function _s(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!h(t.textContent??"")&&!(t instanceof SVGElement))}var pm=e=>{if(/rounded-full/.test(e.getAttribute("class")??""))return!0;if(!e.clientWidth)return!1;let{borderRadius:t}=getComputedStyle(e);return t.includes("%")||Number.parseFloat(t)>=e.clientWidth/2};function qn(e,t,o){for(let n of e.querySelectorAll(`[${t}]`))n!==o&&n.removeAttribute(t);o&&!o.hasAttribute(t)&&o.setAttribute(t,"")}function gm(e,t){if(h(e.textContent??"").length>dm)return null;let o=e.closest("button");for(let n=e;n&&n!==t&&n!==o;n=n.parentElement)if(pm(n))return n;return null}function Xr(e,t){e.hasAttribute(`data-bloom-${t}`)||e.setAttribute(`data-bloom-${t}`,"");let o=e.querySelector("img:not([data-bloom] img)"),n=_s(e),r=o?null:n.map(m=>gm(m,e)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),a=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");qn(e,`data-bloom-${t}-avatar`,a);let c=n.filter(m=>!a?.contains(m)&&!zs(m)),l=c.find(m=>um.test(h(m.textContent??""))),d=c.find(m=>js.test(m.textContent??""));qn(e,`data-bloom-${t}-plan`,l),qn(e,`data-bloom-${t}-email`,d),qn(e,`data-bloom-${t}-name`,c.find(m=>m!==l&&m!==d))}function hm(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function En(){return Xs().map(hm).find(e=>e!=null)??[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&(js.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var fo=e=>[...document.querySelectorAll(u.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&Fr(t.href)===e);function el(e){let t=fo(e).find(o=>h(o.textContent??""));return t?h(t.textContent??""):null}function tl(e){let t=new URL(e,location.origin).pathname.match(mm)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!Fr(n.href)&&h(n.textContent??""));return o?h(o.textContent??""):t.replace(fm,"").replaceAll("-"," ")||null}var $r=0,Tn;function bm(e){if(!N(e))return;for(let o of $s())Xr(o,"profile");let t=En();t&&Xr(t,"menu")}function pe(){$r++;let e=!0;return tt().then(()=>{e&&$r&&!Tn&&(Tn=C(bm))}),()=>{e&&(e=!1,!--$r&&(Tn?.(),Tn=void 0))}}var _r=["showSidebarEntry","showSidebarEntryOnHover","showAccountMenuEntry"],It={showSidebarEntry:!0,showSidebarEntryOnHover:!1,showAccountMenuEntry:!1},ei=e=>Object.hasOwn(It,e),ti=e=>de("Settings",e)??It[e],ol=(e,t)=>!ei(e)||t!==!1||_r.some(o=>o!==e&&ti(o));var ym=new E("SettingsPanel"),g=L("bloom-settings-"),Am=10080*60*1e3,vm=3e3,nl="Toggle features. Some need a reload. Click the sliders icon to configure.",wm=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Sm=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],xm={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},il=new Set(["chat","ui","privacy"]),J=null,rt="all",oi="all",Cn="",ni=[],al=()=>[...xe.values()].filter(e=>!e.hidden),qm=e=>!!e.updatedAt&&Date.now()-e.updatedAt<Am;function Em(e){switch(rt){case"favorites":return nn.has(e.name);case"recent":return qm(e);case"all":return!0;case"other":return!e.tags.some(t=>il.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(rt)}}function Tm(e){switch(oi){case"all":return!0;case"enabled":return St(e);case"disabled":return!St(e)}}function Cm(e){let t=Cn.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function Mm(e){let t=on.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return rt==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var sl=e=>e.settings?.def??{},Lm=e=>Object.values(sl(e)).some(t=>t.type!=="custom");function km(e,t,o){let n=de(e.name,t)??kr(o),r=i=>{if(e.name==="Settings"&&!ol(t,i))return!1;$e(e.name,t,i)};switch(o.type){case"boolean":return zr(n,r,o.description??t);case"slider":return xn(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return Vr(n,o.options,r);case"string":return mo(n,r,o.placeholder);case"number":return mo(String(n),i=>r(Number(i)),"","number");case"component":{let i=s("div",{class:g("component")});return ni.push(o.render(i)),i}case"custom":return null}}var Im=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function ll(e){if(!J)return;let t=Object.entries(sl(e)).filter(([,i])=>i.type!=="custom").map(([i,a])=>{let c=km(e,i,a),l=a.type==="boolean",d=a.type!=="component"&&s("div",{class:g("field-label"),text:Im(i)}),m=a.description&&s("div",{class:g("field-desc"),text:a.description});return s("div",{class:g("field",l?"field-inline":"field-stacked")},(d||m)&&s("div",{class:g("field-text")},d,m),c)}),o,n=z("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},vm);return}clearTimeout(o),e.settings?.reset(),po(),ll(e)},"danger"),r=s("div",{class:g("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&po()}},s("div",{class:g("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},s("div",{class:g("popup-header")},s("div",{class:g("card-icon")},U(e.icon)),s("div",{class:g("popup-title")},s("div",{class:g("card-name"),text:e.name}),s("div",{class:g("popup-authors"),text:e.authors.join(", ")})),Q("close","Close",po)),s("p",{class:g("popup-desc"),text:e.description}),s("div",{class:g("fields")},...t),s("div",{class:g("popup-footer")},n)));J.querySelector(`.${g("modal")}`)?.append(r)}function po(){for(let e of ni)e();ni=[],J?.querySelector(`.${g("popup-backdrop")}`)?.remove()}function rl(e){let t=St(e),o=nn.has(e.name),n=on.has(e.name),r=!!e.required;return s("div",{class:[g("card",t?"card-on":"card-off"),r?g("card-required"):""].filter(Boolean).join(" ")},s("div",{class:g("card-top")},s("div",{class:g("card-icon")},U(e.icon)),s("div",{class:g("card-actions")},Q("star",o?"Unstar":"Star",()=>{nn.toggle(e.name),nt()},o),r?null:Q("pin",n?"Unpin":"Pin to top",()=>{on.toggle(e.name),nt()},n),r?s("span",{class:g("required-mark"),attrs:{"aria-label":"Required",[Ee]:"This plugin is required for Bloom++ to work"}},U("alert")):null,Lm(e)&&Q("gear","Settings",()=>ll(e)),zr(t,i=>cs(e,i),r?`${e.name} is required`:`Enable ${e.name}`,r))),s("div",{class:g("card-name"),text:e.name}),s("div",{class:g("card-desc"),text:e.description,title:e.description}),s("div",{class:g("card-footer"),text:e.authors.join(", ")}))}function cl(){let e=al().some(o=>!o.tags.some(n=>il.has(n)));J?.querySelector(`.${g("tabs")}`)?.replaceChildren(...wm.filter(o=>o.id!=="other"||e).map(o=>s("button",{class:g("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===rt)},on:{click:()=>{rt=o.id,cl(),nt()}}})))}function nt(){if(!J)return;let e=al().filter(Em),t=J.querySelector(`.${g("search")} input`);t&&(t.placeholder=`Search ${zo(e.length,"plugin")}...`);let o=Mm(e.filter(d=>Cm(d)&&Tm(d))),n=rt==="all",r=n?o.filter(d=>!d.required):o,i=n?o.filter(d=>d.required):[],a=[...r.map(rl),...i.length?[s("div",{class:g("required-break"),attrs:{role:"separator"}}),...i.map(rl)]:[]],c=Cn.trim()?"No plugins match your search.":xm[rt]??"No plugins available.";J.querySelector(`.${g("grid")}`)?.replaceChildren(...a.length?a:[s("div",{class:g("empty"),text:c})])}function Bm(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),J?.querySelector(`.${g("popup-backdrop")}`)?po():Bt())}var ul,ri;function Om(){if(J)return;let e=s("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=Cn,e.addEventListener("input",()=>{Cn=e.value,nt()}),J=s("div",{class:`bloom-root ${g("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&Bt()}},s("div",{class:g("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},s("div",{class:g("header")},s("div",{class:g("logo")},U("bloom")),s("h2",{class:g("title"),text:"Bloom++"}),s("span",{class:g("hint"),attrs:{"aria-label":nl,tabindex:"0",[Ee]:nl}},U("info")),s("span",{class:g("version"),text:"v2.0.92"}),Q("close","Close",Bt)),s("div",{class:g("tabs"),attrs:{role:"tablist"}}),s("div",{class:g("toolbar")},s("label",{class:g("search")},U("search"),e),Vr(oi,Sm,t=>{oi=t,nt()})),s("div",{class:g("grid")}))),J.addEventListener("keydown",t=>t.stopPropagation()),ri=new AbortController,document.addEventListener("keydown",Bm,{capture:!0,signal:ri.signal}),document.body.append(J),cl(),nt(),ul=ms(nt),e.focus(),ym.debug("Opened")}function Bt(){po(),ri?.abort(),ul?.(),J?.remove(),J=null}var Mn=()=>J?Bt():Om();var dl=`/*
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
`;var Ue=L("bloom-entry-"),Rm=4,ai="--bloom-entry-x",si=1,at=p({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar.",default:It.showSidebarEntry},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:It.showSidebarEntryOnHover},showAccountMenuEntry:{type:"boolean",description:"Show Bloom++ at the top of the account menu.",default:It.showAccountMenuEntry},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:e=>(e.append(z("Reset position",()=>{at.store.entryPosition=si})),()=>e.replaceChildren())},entryPosition:{type:"custom",default:si}}),it=new Map,ml=!1,ii=[];function Dm(e,t,o){let n=e.currentTarget,r=t.clientWidth-n.offsetWidth;if(e.button!==0||r<=0||!t.classList.contains(Ue("hover")))return;let i=at.store.entryPosition,a=i,c=!1,l=new AbortController;n.setPointerCapture(e.pointerId),n.addEventListener("pointermove",m=>{!c&&Math.abs(m.clientX-e.clientX)<Rm||(c=!0,o(),a=se(i+(m.clientX-e.clientX)/r,0,si),t.style.setProperty(ai,String(a)))},{signal:l.signal});let d=()=>{l.abort(),c&&(at.store.entryPosition=a,t.style.removeProperty(ai))};n.addEventListener("pointerup",d,{signal:l.signal}),n.addEventListener("lostpointercapture",d,{signal:l.signal})}function Hm(e){let t=!1,o=s("button",{class:Ue("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),t||Mn(),t=!1},pointerdown:r=>{t=!1,e!=="rail"&&Dm(r,n,()=>{t=!0})}}},U("bloom"),e!=="rail"&&s("span",{class:Ue("label"),text:"Bloom++"})),n=s("div",{class:`bloom-root ${Ue("wrap")} ${Ue(e)}`,attrs:{"data-bloom":"entry"}},o);return n}function Nm(e){let t=s("div",{class:`bloom-root ${Ue("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),Mn()}}},U("bloom"),s("span",{text:"Bloom++"})),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function fl(){for(let e of document.querySelectorAll('[data-bloom="entry"], [data-bloom="menu-entry"]'))e.remove();it.clear()}function Um(){for(let e of document.querySelectorAll('[data-bloom="menu-entry"]'))e.remove()}function pl(){let{showSidebarEntry:e,showSidebarEntryOnHover:t,showAccountMenuEntry:o}=at.store,n=e||t?Js():[],r=new Set(n.map(a=>a.anchor));for(let[a,c]of it)a.isConnected&&r.has(a)||(c.remove(),it.delete(a));for(let a of document.querySelectorAll('[data-bloom="entry"]'))[...it.values()].includes(a)||a.remove();for(let a of n){let c=it.get(a.anchor);if(c?.isConnected||!qe(a.anchor))continue;let l=c??Hm(a.kind);it.set(a.anchor,l),a.insert(l)}for(let a of it.values())a.classList.toggle(Ue("hover"),!e);if(!o){Um();return}let i=En();i&&!i.querySelector('[data-bloom="menu-entry"]')&&Nm(i)}function Fm(e){_r.some(ti)||(at.store[ei(e??"")?e:"showSidebarEntry"]=!0),pl()}var gl=f({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:at,styles:()=>`${dl}.${Ue("hover")}{${ai}:${at.store.entryPosition}}`,start(){fl(),ii=[C(pl),Ws(),pe()],!ml&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",Mn),ml=!0)},stop(){for(let e of ii)e();ii=[],fl(),Bt()},onSettingsChange:Fm});var Gm=80,Ym=420;function li(e,t,o){return(e.x-o.x)*(t.y-o.y)-(t.x-o.x)*(e.y-o.y)}function Km(e,t,o,n){let r=li(e,t,o),i=li(e,o,n),a=li(e,n,t);return!((r<0||i<0||a<0)&&(r>0||i>0||a>0))}function Qm(e,t){let o=(t.left+t.right)/2-(e.left+e.right)/2,n=(t.top+t.bottom)/2-(e.top+e.bottom)/2;if(Math.abs(o)>=Math.abs(n)){let i=o<0?t.right:t.left;return[{x:i,y:t.top},{x:i,y:t.bottom}]}let r=n<0?t.bottom:t.top;return[{x:t.left,y:r},{x:t.right,y:r}]}function hl(e,t){let o=se(e.x,t.left,t.right),n=se(e.y,t.top,t.bottom);return Math.hypot(e.x-o,e.y-n)}function Ln(e){let t=e.closeDelay??Gm,o=e.towardDelay??Ym,n=0,r=!1,i=null,a=null,c=()=>{document.removeEventListener("pointermove",b,!0)},l=()=>{n&&window.clearTimeout(n),n=0,c(),i=null,a=null},d=()=>{l(),r&&(r=!1,e.setHeld(!1))},m=()=>{r||(r=!0,e.setHeld(!0))},w=S=>{n&&window.clearTimeout(n),n=window.setTimeout(d,S)},Y=S=>{let X=e.panel(),Ve=e.trigger();if(!X||!i)return!1;let $=X.getBoundingClientRect();if($.width<=0&&$.height<=0)return!1;let Se=Ve?.getBoundingClientRect(),[re,xr]=Se&&(Se.width||Se.height)?Qm(Se,$):[{x:$.left,y:$.top},{x:$.right,y:$.bottom}];return Km(S,i,re,xr)?!0:a!=null&&hl(S,$)<hl(a,$)-.25},b=S=>{let X={x:S.clientX,y:S.clientY};if(e.over(S.target)){l();return}Y(X)?w(o):d(),a=X};return{enter(){l()},leave(S){if(e.over(S.relatedTarget)){l();return}i={x:S.clientX,y:S.clientY},a=i,m(),document.addEventListener("pointermove",b,!0),w(t)},dispose(){l(),r=!1}}}var bl=`/*
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
`;var T=L("bloom-nav-"),Bn=80,jm=1200,zm=2,yl=3e4,Vm=200,Jm=.9,Zm=.28,Xm=24,Ot=8,$m=80,_m=12,ci=80,Sl=`${u.rightPanel}, ${u.summaryPanel}`,ef={user:"\u2753",assistant:"\u{1F916}"},tf=["wheel","touchmove","pointerdown"],Pn=p({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),y=null,P=[],ae=-1,st=-1,Pt=null,lt="",di=0,mi=[],yo=null,kn=null,In=new Set,Te,go,Ce,fi="",ho=[],On=null,pi=new Set,of=e=>Pn.store.showAssistant||e.role==="user",nf=e=>e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.messageIds[0]||e.role;function rf(e){return{role:e.role,summary:Ct(e),ids:e.messageIds,turn:e,streaming:e.streaming}}function xl(e,t){let o=e.entries.at(-1);if(o?.role==="assistant"&&t.role==="assistant"){e.entries[e.entries.length-1]={...t,ids:[...new Set([...o.ids,...t.ids])]};return}e.entries.push(t)}function af(){let e=[];for(let t of He()){let o=rf(t),n=nf(t),r=e.at(-1);r?.key===n?xl(r,o):e.push({key:n,entries:[o]})}return e}function sf(){let e=[];for(let t of ce(A())?.chain??[]){let o={role:t.role,summary:yn(t),ids:[t.id],turn:null,streaming:!1},n=e.at(-1);t.role==="assistant"&&n?xl(n,o):e.push({key:t.id,entries:[o]})}return e}var Rt=e=>e.entries.flatMap(t=>t.ids);function gi(e,t){let o=new Set(Rt(e));return Rt(t).some(n=>o.has(n))}var ct=e=>h(e.entries.find(t=>t.role==="user")?.summary??""),ui=(e,t)=>e.filter(o=>ct(o)===t).length,hi=e=>({...e,turn:null,streaming:!1});function lf(e,t){let o=new Set(t.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return e.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return hi(r);let a=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return a&&a!==n.key?hi(r):r})}))}function cf(e,t){let o=t.entries.map((n,r)=>{let i=e.entries[r];if(!i)return n;let a=[...new Set([...n.ids,...i.ids])];return{...n,ids:a,summary:n.summary||i.summary}});for(let n of e.entries.slice(o.length))o.push(hi(n));return{key:e.key,entries:o}}function ql(){let e=lo();if(!e)return!1;let t=e.clientHeight-e.scrollHeight;return e.scrollTop-t<=Math.abs(e.scrollTop)}function uf(e,t){let o=lf(e,t);if(!t.length)return o;if(!o.length)return t;let n=t.findIndex(l=>o.some(d=>d.key===l.key));if(n<0)return ql()?t.concat(o):o.concat(t);let r=t[n]?.key,i=o.findIndex(l=>l.key===r),a=o.slice(0,i).concat(t.slice(0,n),o.slice(i)),c=a.findIndex(l=>l.key===r);for(let l=n;l<t.length;l++){let d=t[l];if(!d)continue;let m=a.findIndex(w=>w.key===d.key);if(m>=0){let w=a[m];w&&(a[m]=cf(w,d)),c=m}else a.splice(c+1,0,d),c++}return a}function df(e,t){let o=0,n=0,r=0;for(let i=1-e.length;i<t.length;i++){let a=0,c=0;for(let d=0;d<e.length;d++){let m=t[d+i],w=e[d];!m||!w||(gi(w,m)?(a+=3,c++):ct(w)&&ct(w)===ct(m)&&a++)}let l=ql()?i<r:i>r;(a>o||a===o&&c>n||a===o&&c===n&&l)&&(o=a,n=c,r=i)}return{score:o,offset:r}}function mf(e,t){let o=e.entries.map((n,r)=>{let i=t.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of t.entries.slice(o.length))o.push({...n,turn:null});return{key:e.key,entries:o}}function ff(e){return e.map(t=>({key:t.key,entries:t.entries.map(o=>({...o}))}))}function pf(e,t){if(!t.length)return e;if(!e.length)return t;let{score:o,offset:n}=df(e,t),r=ff(e);if(o>0)for(let c=0;c<r.length;c++){let l=t[c+n],d=r[c];if(!l||!d)continue;let m=ct(d),w=!!m&&m===ct(l)&&ui(e,m)===1&&ui(t,m)===1;(gi(d,l)||w)&&(r[c]=mf(d,l))}let i=[],a=[];for(let c=0;c<t.length;c++){let l=t[c];if(!l)continue;let d=ct(l);!d||ui(r,d)>0||r.some(m=>gi(m,l))||(o>0&&c<n?i.push(l):a.push(l))}return i.concat(r,a)}var bi=e=>e.entries.some(t=>t.turn?.el.isConnected);function gf(e,t,o){let n=e.findIndex(i=>Rt(i).includes(t));if(n>=0)return n+1;let r=e.find(bi);return o&&r&&Rt(r).includes(o)?0:e.length}function hf(e){if(On){let{parent:t,user:o}=On;for(let n of e.slice(gf(e,t,o))){let r=Rt(n);if(!bi(n)&&!(o&&r.includes(o)))for(let i of r)pi.add(i)}}return e.filter(t=>bi(t)||!Rt(t).some(o=>pi.has(o)))}function El(){ho=[],On=null,pi.clear()}function bf(){let e=Ps();e!==fi&&(fi=e,El());let t=af(),o=sf();return!t.length&&!o.length&&!Os()?(ho=[],[]):(ho=hf(pf(uf(ho,t),o)),ho.flatMap(n=>n.entries).filter(of))}function yf(e){for(let o of e)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!R().generating||e.some(o=>o.streaming))return;let t=e.at(-1);t&&(t.role==="assistant"||!Pn.store.showAssistant?t.streaming=!0:e.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function Tl(){let e=bf();return yf(e),e}function Cl(e){let t=e.getBoundingClientRect(),o=W()?.getBoundingClientRect().top,n=Math.min(t.bottom,o&&o>t.top?o:t.bottom);return{top:t.top,bottom:n}}function Ml(e){return((e.matches(".whitespace-pre-wrap, .markdown, .prose, [data-markdown-text-style]")?e:e.querySelector(".whitespace-pre-wrap")??e.querySelector(".markdown, .prose, [data-markdown-text-style]"))??e).getBoundingClientRect().top}function Al(e){let t=P[e]?.turn?.el;return t?.isConnected?t:null}function Af(e){if(!P.length)return null;let t=e.scrollHeight-e.clientHeight,o=Kr(e),n=Math.min(e.scrollTop,0),r=o?-n:t-e.scrollTop,i=o?t+n:e.scrollTop,a=t<=Ot||r<=Ot,c=t>Ot&&i<=Ot,{top:l,bottom:d}=Cl(e),m=Al(0),w=m?Ml(m):Number.NaN,Y=!!m&&w>=l-Ot&&w<=l+48,b=Al(P.length-1),S=b?.getBoundingClientRect().bottom??Number.NaN,X=!!b&&S<=d+Ot&&S>=d-$m;return a||X?"bottom":c||Y?"top":null}function vf(e){let{top:t,bottom:o}=Cl(e),n=t+Math.max(o-t,0)*Zm,r=[],i=-1;if(P.forEach((c,l)=>{let d=c.turn?.el;if(!d?.isConnected){r.push(Number.NaN);return}let m=Ml(d);r.push(m),i<0&&(i=l),m<=n&&(i=l)}),i<0)return Math.max(P.findIndex(c=>c.turn),0);let a=r[ae];return Number.isFinite(a)?i===ae?ae:i>ae?i:a<=n+Xm?ae:i:i}function wf(e){let t=Af(e);return t==="bottom"?P.length-1:t==="top"?0:vf(e)}function vl(e){Pn.store.jumpEffect==="border"&&(e.classList.add(T("flash")),setTimeout(()=>e.classList.remove(T("flash")),jm))}function Rn(e){let t=P[e],o=lo();if(!t||!o)return;if(!t.turn&&!t.ids.length){st=e,bo(),o.scrollTo({top:Kr(o)?0:o.scrollHeight});return}st=e,Pt=e?null:{chat:A(),first:t.ids[0],until:Date.now()+yl},bo();let n=t.turn?.el;if(n?.isConnected){let d=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:d<o.clientHeight*zm?"smooth":"auto"}),vl(n);return}let r=P.findIndex(d=>d.turn),i=r>=0&&e<r?-1:1,a=++di,c=Date.now()+yl,l=()=>{let d=lo();if(a!==di||Date.now()>c||!d)return;P=Tl();let m=P.find(Y=>Y.ids.some(b=>t.ids.includes(b)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),vl(m),st=P.findIndex(Y=>Y.turn?.el===m),bo();return}let w=d.scrollTop;d.scrollBy({top:i*d.clientHeight*Jm,behavior:"instant"}),d.scrollTop===w?setTimeout(l,Vm):requestAnimationFrame(l)};l()}function Sf(e,t){return s("button",{class:T("row"),attrs:{type:"button","data-index":String(t),"data-message-id":e.ids[0]??""},on:{click:()=>Rn(t)}},s("span",{text:ef[e.role]}),s("span",{class:"bloom-truncate",text:ue(e.summary||"\u2026",Bn)}))}function xf(e,t){let o=e.offsetWidth?t.width/e.offsetWidth:1;return t.left+(e.clientLeft+e.clientWidth)*o}function qf(e){let t=1/0;for(let o of document.querySelectorAll(Sl)){if(!Ze(o))continue;let n=o.getBoundingClientRect();n.width<ci||n.height<ci||n.left<e.left+ci||n.left<t&&(t=n.left)}return Number.isFinite(t)?t:null}function wl(e){if(!y)return;let t=e.getBoundingClientRect(),o=W()?.getBoundingClientRect().top,r=Math.min(t.bottom,o&&o>t.top?o:t.bottom)-t.top,i=Math.min(xf(e,t),qf(t)??1/0);y.style.right=`${document.documentElement.clientWidth-i+_m}px`,y.style.top=`${t.top}px`,y.style.height=r>1?`${r}px`:""}function Ef(){let e=lo();if(P=Tl(),!P.length||!e){Ce?.dispose(),Ce=void 0,y?.remove(),y=null,lt="";return}if(yo!==e){go?.abort(),go=new AbortController,e.addEventListener("scroll",De(bo),{passive:!0,signal:go.signal});for(let n of tf)e.addEventListener(n,kl,{passive:!0,signal:go.signal});yo=e,Te?.disconnect(),Te=new ResizeObserver(()=>{e.isConnected&&wl(e)}),Te.observe(e),kn=null,In=new Set}let t=W();if(t&&t!==kn&&Te&&(Te.observe(t),kn=t),Te)for(let n of document.querySelectorAll(Sl))In.has(n)||(Te.observe(n),In.add(n));Lf(),wl(e);let o=JSON.stringify(P.map(n=>[n.role,n.ids]));o!==lt?(lt=o,st=-1,Cf(),Pt&&Date.now()<Pt.until&&Pt.chat===A()&&P[0]?.ids[0]!==Pt.first&&Rn(0)):Tf(),bo()}function bo(){if(!y||!yo)return;ae=st>=0?st:wf(yo),y.querySelectorAll(`.${T("tick")}`).forEach((t,o)=>t.classList.toggle(T("tick-current"),o===ae)),y.querySelectorAll(`.${T("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===ae)));let e=y.querySelector(`.${T("toc-head")}`);e&&(e.textContent=`${ae+1} / ${P.length}`)}function Tf(){y?.querySelectorAll(`.${T("tick")}`).forEach((e,t)=>{let o=P[t],n=ue(o.summary,Bn);e.title!==n&&(e.title=n),e.classList.toggle(T("tick-streaming"),o.streaming)}),y?.querySelectorAll(`.${T("row")}`).forEach(e=>{let t=e.lastElementChild,o=ue(P[Number(e.dataset.index)].summary||"\u2026",Bn);t&&t.textContent!==o&&(t.textContent=o)})}function Cf(){y?.querySelector(`.${T("rail")}`)?.replaceChildren(...P.map((t,o)=>s("button",{class:Jo(T("tick"),T(`tick-${t.role}`),t.streaming&&T("tick-streaming"),o===ae&&T("tick-current")),title:ue(t.summary,Bn),attrs:{type:"button","aria-label":`Jump to message ${o+1}`,"data-message-id":t.ids[0]??""},on:{click:()=>Rn(o)}}))),y?.querySelector(`.${T("toc-list")}`)?.replaceChildren(...P.map(Sf))}var ge=De(Ef);function yi(e){if(e===y)return;let t=e.__bloomNavStop;if(t&&t!==Ai)try{t()}catch{}e.isConnected&&e!==y&&e.remove()}function Ll(){let e=[...document.querySelectorAll('[data-bloom="navigator"]')];if(y&&!y.isConnected&&(y=null),y&&e.includes(y)){for(let t of e)yi(t);return}y=e[0]??null;for(let t of e.slice(1))yi(t)}function Mf(){Ce?.dispose(),Ce=Ln({over:e=>e instanceof Node&&!!y?.contains(e),trigger:()=>y?.querySelector(`.${T("rail")}`),panel:()=>y?.querySelector(`.${T("toc")}`),setHeld:e=>y?.classList.toggle(T("open"),e)})}function Lf(){Ll(),y&&!y.querySelector(`.${T("rail")}`)&&(y.remove(),y=null,lt=""),y||(y=s("div",{class:`bloom-root ${T("root")}`,attrs:{"data-bloom":"navigator"},on:{pointerenter:()=>Ce?.enter(),pointerleave:e=>Ce?.leave(e)}},s("div",{class:T("rail")}),s("div",{class:T("bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:T("toc")},s("div",{class:T("toc-head")}),s("div",{class:T("toc-list")}))),lt=""),Ce||Mf(),y.isConnected||document.body.append(y),y.querySelector(`.${T("tick")}`)||(lt=""),y.__bloomNavStop=Ai}function kl(){st=-1,Pt=null,di++}function Ai(){for(let e of mi)e();mi=[],go?.abort(),Te?.disconnect(),Te=void 0,yo=null,kn=null,In=new Set,removeEventListener("keydown",Il,!0),removeEventListener("resize",ge),Ce?.dispose(),Ce=void 0,y&&delete y.__bloomNavStop,y?.remove(),y=null,lt="",El(),fi="";for(let e of document.querySelectorAll('[data-bloom="navigator"]'))yi(e)}var kf=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function Il(e){if(!y||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||kf(document.activeElement)||K("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:ae-1,ArrowDown:ae+1,Home:0,End:P.length-1}[e.key];if(o==null){kl();return}o<0||o>=P.length||(e.preventDefault(),e.stopPropagation(),Rn(o))}var Bl=f({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:Pn,styles:bl,start(){Ll(),mi=[C(e=>N(e)&&ge()),fe(ge),j.on("conversation",ge),j.on("generate-start",({parentId:e,userId:t})=>{e&&(On={parent:e,user:t},ge())}),x.on("rise",ge),x.on("fall",ge)],addEventListener("keydown",Il,!0),addEventListener("resize",ge,{passive:!0}),ge()},stop:Ai,onSettingsChange:ge});var Ol=`/*
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
`;var ee=L("bloom-quotes-"),Mi="BloomBetterQuotes",Bf=40,Hl=8,Of=1800,xi=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,Pl=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,ut=p({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),vi,wi,Dt,Si=!1,qi=0,Dn=null,Hn=null,Me=null;function Li(){return location.pathname.match(/\/c\/(?!local-)([\w-]+)/)?.[1]??(new URLSearchParams(location.search).get("temporary-chat")==="true"?"temporary":"draft")}function Un(){try{let e=JSON.parse(sessionStorage.getItem(Mi)??"[]");return Array.isArray(e)?e.filter(t=>!!t&&typeof t=="object"&&typeof t.id=="string"&&typeof t.text=="string"&&!!t.text):[]}catch{return[]}}function ki(e){try{sessionStorage.setItem(Mi,JSON.stringify(e.slice(-Bf)))}catch{}}function Ao(e){return Un().find(t=>t.id===e)?.text??""}function Pf(e,t){let o=Un().filter(n=>n.id!==e);o.push({id:e,text:t}),ki(o)}function Ei(e=Li()){ki(Un().filter(t=>t.id!==e)),Nn()}function Rf(e){let t=Ao("draft");if(!t||Ao(e))return;let o=Un().filter(n=>n.id!=="draft");o.push({id:e,text:t}),ki(o)}function Ti(e){return`${e.getAttribute("aria-label")??""} ${e.getAttribute("title")??""}`}function Df(e){let t=Ti(e);return Pl.test(t)&&!/quote|引用/.test(t)?!1:/quote|引用/.test(t)&&xi.test(t)?!0:xi.test(t)&&!Pl.test(t)}function Nl(e){let t=e.cloneNode(!0),o=[...t.querySelectorAll("button, [role='button']")],n=new Set(o.map(r=>r.getAttribute("aria-label")).filter(Boolean));for(let r of o)r.remove();for(let r of t.querySelectorAll("*"))!r.children.length&&n.has(h(r.textContent??""))&&r.remove();return h(t.textContent??"")}function Hf(e){let t=W(),o=e.parentElement,n=0;for(;o&&o!==t&&n<5;){if(n++,o.matches(u.composerInput)||o.querySelector(u.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=Nl(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function Fn(){let e=W();if(!e)return null;for(let t of e.querySelectorAll("button, [role='button']")){if(t.closest("[data-bloom]")||!Df(t))continue;let o=Hf(t),n=o?Nl(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:t}}return null}function Nf(e){let t=e.closest(u.searchUnit)??e.closest(u.oldMessage);return t&&(Et(t)??t.getAttribute("data-message-author-role"))==="user"?t:null}function Ii(e){return h(e).slice(0,48)}function Uf(e,t){let o=Ii(e);if(o.length<Hl)return null;let n=null;for(let r of Tt()){if(t&&(r===t||t.contains(r)||r.contains(t)))continue;let i=h(r.textContent??"");if(!i.includes(o))continue;let a=o.length/Math.max(i.length,1);(!n||a>n.score)&&(n={el:r,score:a})}return n?.el??null}function Ff(e,t){let o=Ii(t),n=e;for(let r of e.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&h(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${ee("hit")}`)?.classList.remove(ee("hit")),n.classList.add(ee("hit")),window.clearTimeout(qi),qi=window.setTimeout(()=>n.classList.remove(ee("hit")),Of)}function Rl(e){let t=e.closest(u.timelineScroll)??document.scrollingElement;if(!(t instanceof HTMLElement)&&t!==document.scrollingElement)return;let o=e.getBoundingClientRect();if(o.height<1||!t)return;let n=t.getBoundingClientRect(),r=W()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,a=o.top+o.height/2-(n.top+i)/2;Math.abs(a)<8||t.scrollTo({top:t.scrollTop+a,behavior:"smooth"})}function Bi(){if(!Me||!Dn?.isConnected)return;let e=Dn.getBoundingClientRect();e.width<1||(Me.style.top=`${Math.max(8,e.top+8)}px`,Me.style.left=`${Math.max(8,e.right-Me.offsetWidth-8)}px`)}function Gf(e,t,o){Dn=e,Hn=t,Me??=s("button",{class:`bloom-root ${ee("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),Me.isConnected||document.body.append(Me),Ff(e,o),Bi()}function Dl(){Me?.remove(),Me=null,Dn=null,Hn=null,document.querySelector(`.${ee("hit")}`)?.classList.remove(ee("hit"))}function Ul(){return document.querySelector('[data-bloom="quote-chip"]')}function Nn(){Ul()?.remove()}function Yf(e){let o=W()?.getBoundingClientRect();!o||o.width<8||(e.style.width=`${Math.max(120,o.width-24)}px`,e.style.left=`${o.left+12}px`,e.style.top=`${Math.max(8,o.top-e.offsetHeight-8)}px`)}function Kf(e){let t=Ul();t||(t=s("div",{class:`bloom-root ${ee("chip")}`,attrs:{"data-bloom":"quote-chip"}},s("span",{class:ee("text")}),s("button",{class:ee("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(t));let o=t.querySelector(`.${ee("text")}`),n=h(e);o&&o.textContent!==n&&(o.textContent=n),t.dataset.text=e,Yf(t)}function Ci(){if(!Si){Si=!0;try{let e=Li(),t=Fn();ut.store.persistAcrossChats&&t&&Ao(e)!==t.text&&Pf(e,t.text);let o=ut.store.persistAcrossChats?Ao(e):"";!o||t&&h(t.text)===h(o)?Nn():Kf(o),Bi()}finally{Si=!1}}}function Qf(e){let t=e.closest('[data-bloom="quote-chip"]');if(t instanceof HTMLElement&&!e.closest(`.${ee("x")}`)){let i=t.dataset.text??t.querySelector(`.${ee("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:t}:null}let o=e.closest("blockquote");if(o instanceof HTMLElement&&!e.closest("a, button")){let i=Nf(o),a=h(o.textContent??"");if(i&&a)return{text:a,skip:i,origin:o}}let n=W();if(!n||!n.contains(e)||et(e)||e.closest("button, [role='button']"))return null;let r=Fn();return!r||!r.row.contains(e)?null:{text:r.text,skip:null,origin:r.row}}function Wf(e){let{target:t}=e;if(!(t instanceof Element))return;if(t.closest('[data-bloom="quote-back"]')){e.preventDefault(),e.stopPropagation(),Hn?.isConnected&&Rl(Hn);return}if(t.closest(`.${ee("x")}`)){e.preventDefault(),e.stopPropagation(),Ei();return}let o=Fn();if(o&&(t===o.dismiss||o.dismiss.contains(t))){Ei();return}if(jf(t)&&Fl(),!ut.store.jumpToPassage)return;let n=Qf(t);if(!n)return;let r=Uf(n.text,n.skip);r&&(e.preventDefault(),e.stopPropagation(),Gf(r,n.origin,n.text),Rl(r))}function jf(e){let t=e.closest("button, [role='button']");return!(t instanceof HTMLElement)||t.closest("[data-bloom]")||!W()?.contains(t)?!1:/send|submit|发送|提交/i.test(Ti(t))&&!xi.test(Ti(t))}function zf(e){return!(e instanceof KeyboardEvent)||e.key!=="Enter"||e.shiftKey||e.isComposing?!1:et(e.target)}function Fl(){if(!ut.store.persistAcrossChats)return;let e=Li(),t=Ao(e);if(t){if(!Fn()){let o=M(),n=Ii(t);n.length>=Hl&&!h(o).includes(n)&&ne(`> ${t}

${o}`.trim())}Ei(e)}}function Vf(e){zf(e)&&Fl()}function Jf(e){!e.prevId&&e.id&&Rf(e.id),Ci()}var Gl=f({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:ut,styles:Ol,onSettingsChange(e){e==="jumpToPassage"&&!ut.store.jumpToPassage&&Dl(),e==="persistAcrossChats"&&!ut.store.persistAcrossChats&&(sessionStorage.removeItem(Mi),Nn()),Ci()},start(){Dt=new AbortController,document.addEventListener("pointerdown",Wf,{capture:!0,signal:Dt.signal}),document.addEventListener("keydown",Vf,{capture:!0,signal:Dt.signal}),addEventListener("scroll",Bi,{capture:!0,passive:!0,signal:Dt.signal}),wi=fe(Jf),vi=C(e=>N(e)&&Ci())},stop(){Dt?.abort(),Dt=void 0,wi?.(),wi=void 0,vi?.(),vi=void 0,window.clearTimeout(qi),Dl(),Nn()}});var Yl=`/*
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
`;var Xf=L("bloom-cls"),$f="bloom-cls",_f=600*1e3,Pi=Ha("tab"),Nt=new Map,vo=new Map,Ht=null,Kl=[],ep=e=>e==="streaming"||e==="error";function tp(){let e=new Map,t=Date.now();for(let[o,n]of vo)t-n.at>_f?vo.delete(o):e.set(o,n.status);for(let[o,n]of Nt)e.set(o,n);return e}function op(e){return s("span",{class:`bloom-root ${Xf("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&U("alert"))}function Yn(){let e=tp(),t=new Set;for(let[o,n]of e)for(let r of fo(o)){if(!qe(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let a=op(n);t.add(a),r.append(a)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function Gn(e,t){e&&(t?Nt.set(e,t):Nt.delete(e),Ht?.postMessage({tab:Pi,id:e,status:t}),Yn())}function np({data:e}){!O(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===Pi||(ep(e.status)?vo.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):vo.delete(e.id),Yn())}function Oi(){for(let e of Nt.keys())Ht?.postMessage({tab:Pi,id:e,status:null})}var Ql=f({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:()=>`${Yl}`,start(){for(let e of document.querySelectorAll('[data-bloom="cls"]'))e.remove();Ht=typeof BroadcastChannel=="function"?new BroadcastChannel($f):null,Ht?.addEventListener("message",np),addEventListener("pagehide",Oi),Kl=[x.on("rise",({conversationId:e})=>Gn(e,"streaming")),x.on("fall",({conversationId:e,outcome:t})=>Gn(e,t==="error"?"error":null)),x.on("context",({prevId:e,id:t,migrated:o})=>{o&&R().generating?Gn(t,"streaming"):!o&&Nt.get(e??"")==="streaming"&&Gn(e,null)}),C(e=>N(e)&&Yn())],A()&&Yn()},stop(){for(let e of Kl)e();Oi(),Ht?.close(),Ht=null,removeEventListener("pagehide",Oi),Nt.clear(),vo.clear();for(let e of document.querySelectorAll('[data-bloom="cls"]'))e.remove()}});var jl=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],Wn={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},rp={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},ip="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Ri=32,jn=64,Di="#FCFCFC",Hi="#111111",ap=14,zn=51.5,sp=12.5,lp=9.75,Wl=52,cp=10.5,up=7.75,dp={rotate:e=>e.arc(zn,zn,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function Kn(e){let t=document.createElement("canvas");t.width=t.height=Ri;let o=t.getContext("2d");return o?(o.scale(Ri/jn,Ri/jn),e(o),t.toDataURL("image/png")):""}function Qn(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D(ip);o&&(e.strokeStyle=Hi,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function Vn(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function mp(e,t){Vn(e,zn,sp,Hi),Vn(e,zn,lp,Wn[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),dp[t](e),e.stroke()}function fp(e,t){e.beginPath(),e.roundRect(0,0,jn,jn,ap),e.fillStyle=t,e.fill()}var pp=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function zl(e,t){switch(e){case"original":return pp(rp[t]);case"hole":return Kn(o=>Qn(o,Wn[t],!0));case"bg":return Kn(o=>{fp(o,Wn[t]),Qn(o,Di,!1)});case"dot":return Kn(o=>{Qn(o,Di,!0),Vn(o,Wl,cp,Hi),Vn(o,Wl,up,Wn[t])});case"badge":return Kn(o=>{Qn(o,Di,!0),mp(o,t)})}}var So="bloom-chat-state-favicon",xo="data-bloom-rel",Fi="data-bloom-media",Vl="bloom-parked-icon",gp="/favicon.ico",Zl=p({style:{type:"select",description:"How the tab icon shows the chat state.",options:jl,default:"bg"}}),Fe=null,Xl="",Jn=null,$l="",Jl=new Map,Gi,Ni=[],_l=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${xo}]`)];function Yi(){for(let e of _l())e.id!==So&&(e.hasAttribute(xo)||($l||=e.href,e.setAttribute(xo,e.rel),e.setAttribute(Fi,e.getAttribute("media")??"")),e.rel!==Vl&&(e.rel=Vl),e.media!=="not all"&&(e.media="not all"))}function hp(){for(let e of _l()){let t=e.getAttribute(xo);if(t==null)continue;e.rel=t;let o=e.getAttribute(Fi);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(xo),e.removeAttribute(Fi)}}function ec(){let e=document.getElementById(So);return e||(e=document.createElement("link"),e.id=So,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function bp(e){if(e==="wait")return $l||gp;let t=Zl.store.style,o=`${t}:${e}`,n=Jl.get(o);return n||Jl.set(o,n=zl(t,e)),n}function Ui(e){if(e)return"rotate";let t=M();return Fe&&t&&t!==Xl&&(Fe=null),Fe==="error"?"error":Fe==="done"?"done":t?"ready":"wait"}function wo(e,t=!1){if(e===Jn&&!t)return;Jn=e;let o=ec(),n=bp(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function yp(){Gi=new MutationObserver(()=>{Yi(),document.head.lastElementChild?.id!==So&&ec()}),Gi.observe(document.head,{childList:!0})}var tc=f({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"HostReady",settings:Zl,start(){Yi(),wo(Ui(R().generating),!0),yp(),Ni=[x.on("rise",()=>{Fe=null,wo("rotate")}),x.on("fall",({outcome:e})=>{Fe=e==="done"||e==="error"?e:null,Xl=M(),wo(Ui(!1))}),x.on("context",({migrated:e})=>{e||(Fe=null)}),x.on("tick",({generating:e})=>{Yi(),wo(Ui(e))})]},stop(){for(let e of Ni)e();Ni=[],Gi?.disconnect(),document.getElementById(So)?.remove(),hp(),Jn=null,Fe=null},onSettingsChange(){wo(Jn??"wait",!0)}});var Ge="data-bloom-invite",Ap=/^(?:invite team members|invite members|邀请团队成员|邀请成员)$/i,oc=':is(button, a:not([href^="/c/"])):not(main *, [role="dialog"] *)',vp={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${u.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])'],hideInvite:[`[${Ge}]`,`div:has(> [${Ge}]:only-child)`]},nc=p({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0},hideInvite:{type:"boolean",description:"Hide Invite team members in the sidebar.",default:!0}}),Zn,Ki=!1;function wp(e){if(N(e))for(let t of document.querySelectorAll(`${oc}, [${Ge}]`))!t.matches(oc)||!Ap.test(h(t.textContent??""))?t.removeAttribute(Ge):t.hasAttribute(Ge)||t.setAttribute(Ge,"")}var rc=f({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads, notices and Invite team members.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:nc,styles:()=>Re(Object.entries(vp).flatMap(([e,t])=>nc.store[e]?t:[])),start(){Ki=!0,tt().then(()=>{Ki&&!Zn&&(Zn=C(wp))})},stop(){Ki=!1,Zn?.(),Zn=void 0;for(let e of document.querySelectorAll(`[${Ge}]`))e.removeAttribute(Ge)}});var Ut=`form:has(:is(${u.composerInput})), ${u.oldComposerForm}`,Xn='[class*="ComposerLayoutBody"]',Wi='[class*="ComposerLayoutRoot"]',Sp='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',xp=`:is(${Ut}) ${Xn}, :is(${Ut}):not(:has(${Xn})) ${Wi}, :is(${Ut}):not(:has(${Xn})):not(:has(${Wi})) :is(${Sp})`,qp='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',Ep='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',Tp="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))";var Cp="composer-fill",ic=p({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function Mp(){let{opacity:e,blur:t}=ic.store;if(e>=100)return"";let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${Tp} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important;-webkit-backdrop-filter:blur(${t}px)!important`;return`:is(${qp}), :is(${Ut}){${o}}:is(${Ep}){display:none!important}${xp}{${n}}:is(${Ut}):has(${Xn}) ${Wi}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${Ut}) :is(${u.composerInput}){background-color:transparent!important}`}function Qi(){for(let e of document.querySelectorAll(`[data-bloom="${Cp}"]`))e.remove()}var ac=f({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:ic,styles:Mp,start(){Qi()},stop(){Qi()},onSettingsChange(){Qi()}});var Lp=1200,kp=8e3,Ip=150,Bp=20,sc=6,Vi="continue where you left",Op=/message delivery timed out|please try again/i,lc=/waiting for the complete answer/i,cc=p({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:Vi,placeholder:Vi}}),ji=[],_n=0,qo=!1,Eo=0,Gt="",$n="",Ji=0,Yt=!1,To=!1,er=!0,Ft="",Zi=0,tr=!1,Pp=()=>cc.store.prompt.trim()||Vi;function uc(){return(K(u.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function dc(){let e=uc();return!e||lc.test(e)||!Op.test(e)?"":e}function Rp(){let e=uc();return e&&lc.test(e)?e:""}function Dp(){let e=qt()?.querySelectorAll(u.turn),t=e?.[e.length-1];return`${t?.getAttribute("data-turn-key")??""}:${t?.textContent?.length??0}`}function mc(e,t,o){if(o===_n){if(R().generating||M()!==e||t>=Bp){Yt=!1,R().generating||(Gt="");return}cn(),setTimeout(()=>mc(e,t+1,o),Ip)}}function Hp(e){let t=_n;if(R().generating||M()&&M()!==e){Yt=!1,Gt="";return}ne(e),tr=!0,ro(()=>{t===_n&&mc(e,0,t)})}function fc(e){return e===Gt||Eo>=sc||R().generating||M()?!1:(Gt=e,Eo+=1,Yt=!0,Hp(Pp()),!0)}function Np(){if(qo||Yt||To)return;let e=Date.now(),t=dc();if(t){if(Ft="",t!==$n){$n=t,Ji=e;return}if(e-Ji<Lp)return;fc(`${A()??""}:${t}`);return}if($n="",!Rp()){er=!0,Ft="";return}if(!er||!R().generating||M())return;let n=`${A()??""}:${Dp()}`;if(n!==Ft){Ft=n,Zi=e;return}if(e-Zi<kp||Eo>=sc)return;let r=xt();r&&(To=!0,r.click())}function zi(){_n+=1,qo=!1,Eo=0,Gt="",$n="",Ji=0,Yt=!1,To=!1,er=!0,Ft="",Zi=0,tr=!1}var pc=f({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:cc,start(){zi(),ji=[x.on("rise",()=>{qo=!1,Gt="",Yt=!1,tr&&(tr=!1,er=!1,Ft="")}),x.on("fall",({outcome:e})=>{if(To){To=!1,e==="left"?qo=!0:fc(`${A()??""}:stall`);return}(e==="stopped"||e==="left")&&(qo=!0),e==="done"&&!dc()&&(Eo=0)}),x.on("context",({migrated:e})=>{e||zi()}),x.on("tick",Np)]},stop(){for(let e of ji)e();ji=[],zi()}});var Le=L("bloom-csi-"),Up=256,Fp=160,or=1,gc=4,Gp=.1,Yp=.0015,Kp=250;function Qp(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function Wp(e){return new Promise((t,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function jp(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:se(t.x,n,1-n),y:se(t.y,r,1-r)}}function hc(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function zp(e,t){let o=s("canvas");return o.width=o.height=Up,hc(o,e,t),o.toDataURL("image/png")}function bc(e){let t=null,o={x:F.store.cropX,y:F.store.cropY,zoom:F.store.cropZoom},n,r=s("canvas",{class:Le("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=Fp*devicePixelRatio;let i=s("div",{class:`bloom-muted ${Le("status")}`}),a=s("div",{class:Le("zoom")}),c=s("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(b,S=!0){t&&(o=jp(t,b),hc(r,t,o),S&&(clearTimeout(n),n=setTimeout(()=>{t&&(F.store.cropX=o.x,F.store.cropY=o.y,F.store.cropZoom=o.zoom,F.store.avatarUrl=zp(t,o))},Kp)))}function d(){a.replaceChildren(xn(o.zoom,or,gc,Gp,"\xD7",b=>l({...o,zoom:b})))}async function m(b,S){i.textContent="";try{t=await Wp(b),S&&(F.store.avatarSource=b,o={x:.5,y:.5,zoom:or}),e.classList.add(Le("has-image")),d(),l(o,S)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let w=b=>{b?.type.startsWith("image/")&&Qp(b).then(S=>m(S,!0))};c.addEventListener("change",()=>w(c.files?.[0])),r.addEventListener("wheel",b=>{t&&(b.preventDefault(),l({...o,zoom:se(o.zoom*(1-b.deltaY*Yp),or,gc)}),d())},{passive:!1}),r.addEventListener("pointerdown",b=>{if(!t)return;r.setPointerCapture(b.pointerId);let S={...o},X=r.getBoundingClientRect(),Ve=$=>{if(!t)return;let Se=Math.max(X.width/t.naturalWidth,X.height/t.naturalHeight)*o.zoom;l({...o,x:S.x-($.clientX-b.clientX)/(t.naturalWidth*Se),y:S.y-($.clientY-b.clientY)/(t.naturalHeight*Se)})};r.addEventListener("pointermove",Ve),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",Ve),{once:!0})});let Y=s("div",{class:Le("cropper"),attrs:{tabindex:"0"},on:{paste:b=>w([...b.clipboardData?.files??[]].find(S=>S.type.startsWith("image/"))),dragover:b=>b.preventDefault(),drop:b=>{b.preventDefault(),w(b.dataTransfer?.files[0])}}},s("div",{class:Le("stage")},r),s("div",{class:Le("controls")},mo("",b=>b.trim()&&void m(b.trim(),!0),"https://\u2026 or data:image/\u2026","url"),s("div",{class:Le("buttons")},z("Choose file",()=>c.click()),z("Reset crop",()=>{l({x:.5,y:.5,zoom:or}),d()}),z("Clear",()=>{t=null,e.classList.remove(Le("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),a.replaceChildren(),F.store.avatarUrl="",F.store.avatarSource=""},"danger")),a,i,c));return e.append(Y),F.store.avatarSource&&m(F.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var yc=`/*
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
`;var Co="data-bloom-csi-avatar",Xi="data-bloom-csi-sized",Sc="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",Jp=32,F=p({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>bc(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),Ac=[];function xc(e){e.removeAttribute(Co),e.removeAttribute(Xi)}function vc(e){return(F.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function wc(e=[]){if(!N(e))return;let t=F.store.displayName.trim()||null,o=!!F.store.avatarUrl,n=new Set(t?vc("name"):[]);for(let i of document.querySelectorAll(Sc))n.has(i)||Xe(i,null);for(let i of n)Xe(i,t);let r=new Set(o?vc("avatar"):[]);for(let i of document.querySelectorAll(`[${Co}]`))r.has(i)||xc(i);for(let i of r)i.hasAttribute(Co)||i.setAttribute(Co,""),i.toggleAttribute(Xi,!i.closest('[role="menu"]'))}function Zp(){let e=F.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${F.store.avatarSize}px}:is(${u.rail}, ${u.oldRail}) [${Xi}]{--bloom-csi-size:${Jp}px}`:""}var qc=f({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:F,styles:()=>`${Zp()}
${yc}`,start(){Ac=[pe(),C(wc)]},stop(){for(let e of Ac)e();for(let e of document.querySelectorAll(`[${Co}]`))xc(e);for(let e of document.querySelectorAll(Sc))Xe(e,null)},onSettingsChange(){wc()}});var Kt=L("bloom-greeting-"),Ec=30,Tc=100;function Cc(e){let t=-1,o=s("textarea",{class:`bloom-input ${Kt("input")}`,attrs:{maxlength:String(Tc),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=z("Add",i),r=s("div",{class:Kt("list")});function i(){let l=o.value.trim().slice(0,Tc);if(!l)return;let d=[...I.store.greetings];t>=0?d[t]=l:d.length<Ec&&d.push(l),I.store.greetings=d,t=-1,o.value="",a()}function a(){let{greetings:l}=I.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&l.length>=Ec,r.replaceChildren(...l.length?l.map((d,m)=>s("div",{class:Kt("row",m===t?"row-editing":"row-idle")},s("div",{class:Kt("text"),text:d}),Q("edit","Edit",()=>{t=m,o.value=d,o.focus(),a()}),Q("trash","Delete",()=>{I.store.greetings=l.filter((w,Y)=>Y!==m),t===m&&(t=-1),a()}))):[s("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),e.append(s("div",{class:Kt("editor")},r,s("div",{class:Kt("form")},o,n))),a();let c=wt((l,d)=>l==="GreetingCustomizer"&&d==="greetings"&&a());return()=>{c(),e.replaceChildren()}}var Mc=`/*
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
`;var rr="data-bloom-greeting",$p=1e3,_p=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],I=p({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>Cc(e)},greetings:{type:"custom",default:_p},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),nr,Lc=[],$i,Io=()=>hn()&&!me(),eg=e=>e.replaceAll(/\s*\n\s*/g," ").trim(),Ic=()=>I.store.greetings.filter(e=>typeof e=="string"&&e.trim());function Bo(){let e=Ic();if(e.length)if(I.store.order==="random"&&e.length>1){let t=I.store.lastRandom;for(;t===I.store.lastRandom;)t=Math.floor(Math.random()*e.length);I.store.lastRandom=t,I.store.index=t}else I.store.index=(I.store.index+1)%e.length}function tg(){return Io()?K(u.homeHeading):null}function Mo(){for(let e of document.querySelectorAll(`[${rr}]`))e.removeAttribute(rr),Xe(e,null)}function Lo(){for(let e of document.querySelectorAll("[data-bloom-placeholder]"))e.removeAttribute("data-bloom-placeholder")}function kc(e){let t=le(),o=eg(e);if(!t||!o||M(t)){Lo();return}t.getAttribute("data-bloom-placeholder")!==o&&t.setAttribute("data-bloom-placeholder",o)}function ko(){let e=Ic(),t=Ms(),o=Io();if(!e.length||!t&&!o){Mo(),Lo();return}if(t){Mo(),kc(e[0]??"");return}let n=tg();n?((I.store.index<0||I.store.index>=e.length)&&Bo(),n.setAttribute(rr,""),Xe(n,e[Math.max(0,I.store.index)%e.length]??"")):Mo(),I.store.heroOnlyOutsideProject?Lo():kc(e[Math.max(0,I.store.index)%e.length]??"")}function _i(){clearInterval(nr),nr=void 0,I.store.mode==="interval"&&Io()&&(nr=setInterval(()=>{Bo(),ko()},I.store.intervalSec*$p))}function og(e){I.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${rr}]`)||getSelection()?.toString()||(Bo(),ko())}function ng(){Io()&&I.store.mode==="refresh"&&Bo(),_i(),ko()}var Bc=f({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:I,styles:Mc,start(){Mo(),Lo(),$i=new AbortController,document.addEventListener("click",og,{signal:$i.signal}),Io()&&I.store.mode==="refresh"&&Bo(),_i(),Lc=[C(e=>N(e)&&ko()),fe(ng)]},stop(){$i?.abort();for(let e of Lc)e();clearInterval(nr),Mo(),Lo()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&_i(),ko()}});var Oo=L("bloom-history-"),ea=10,rg=3e3;function ta(e,t){let o="",n=0,r=new Set,i=s("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),a=s("div",{class:Oo("list")}),c=s("div",{class:Oo("pager")}),l,d=z("Clear all",()=>{if(!l){d.textContent="Click again to clear",l=setTimeout(()=>{l=void 0,d.textContent="Clear all"},rg);return}clearTimeout(l),l=void 0,d.textContent="Clear all",Po([])},"danger");function m(){let Y=[...dt.store.entries].toReversed(),b=o.trim().toLowerCase(),S=b?Y.filter(re=>re.toLowerCase().includes(b)):Y,X=Math.max(1,Math.ceil(S.length/ea));n=Math.min(n,X-1);let Ve=S.slice(n*ea,(n+1)*ea).map(re=>s("div",{class:Oo("row")},s("button",{class:Oo("text",r.has(re)?"text-open":"text-closed"),text:re,title:r.has(re)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{r.delete(re)||r.add(re),m()}}}),t&&Q("edit","Use",()=>t(re)),Q("copy","Copy",()=>void Na(re)),Q("trash","Delete",()=>Po(dt.store.entries.filter(xr=>xr!==re)))));a.replaceChildren(...Ve.length?Ve:[s("div",{class:"bloom-muted",text:b?"No matching prompts.":"No saved prompts yet."})]),c.replaceChildren(s("span",{class:"bloom-muted",text:`${S.length} ${b?"matching":"saved"} \xB7 page ${n+1} of ${X}`}),z("Previous",()=>{n--,m()}),z("Next",()=>{n++,m()}),d);let[$,Se]=c.querySelectorAll("button");$.disabled=n===0,Se.disabled=n>=X-1,d.disabled=!Y.length}i.addEventListener("input",()=>{o=i.value,n=0,m()}),e.append(s("div",{class:Oo("manager")},i,a,c)),m();let w=wt((Y,b)=>Y==="InputHistory"&&b==="entries"&&m());return()=>{w(),clearTimeout(l),e.replaceChildren()}}var Oc=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

.bloom-history-hud {
    position: fixed;
    z-index: 2147482000;
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.125rem 0.5rem 0.125rem 0.625rem;
    border: 1px solid var(--bloom-border);
    border-radius: 9999px;
    background: var(--bloom-surface);
    box-shadow: var(--bloom-shadow);
    color: var(--bloom-fg-2);
    font-size: 0.75rem;
    font-variant-numeric: tabular-nums;
    transform: translate(-50%, calc(-100% - 0.5rem));
}

.bloom-history-hud-count,
.bloom-history-hud-x {
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    cursor: pointer;
}

.bloom-history-hud-x {
    line-height: 1;
}

.bloom-history-hud-count:hover,
.bloom-history-hud-x:hover {
    color: var(--bloom-fg);
}

.bloom-history-backdrop {
    position: fixed;
    inset: 0;
    z-index: 2147483000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: #0006;
}

.bloom-history-dialog {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: min(36rem, 100%);
    max-height: min(40rem, 100%);
    padding: 1.25rem;
    border: 1px solid var(--bloom-border);
    border-radius: 1rem;
    background: var(--bloom-surface);
    box-shadow: var(--bloom-shadow);
    color: var(--bloom-fg);
}

.bloom-history-dialog-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.bloom-history-dialog-title {
    flex: 1;
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
}

.bloom-history-dialog-body {
    min-height: 0;
    overflow-y: auto;
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
`;var ke=L("bloom-history-"),ag=2e3,dt=p({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>ta(e)},entries:{type:"custom",default:[]}}),D=null,oa={text:"",at:0},he=null,Ye=null,na,Wt=()=>dt.store.entries.filter(e=>typeof e=="string");function Po(e){dt.store.entries=e.slice(-dt.store.maxEntries)}function ra(e){let t=e.trim();if(!t)return;let o=Date.now();t===oa.text&&o-oa.at<ag||(oa={text:t,at:o},Po([...Wt().filter(n=>n!==t),t]))}function Pc(e){e.preventDefault()}function sg(){let e=s("button",{class:ke("hud-count"),attrs:{type:"button"},on:{mousedown:Pc,click:dg}}),t=s("button",{class:ke("hud-x"),text:"\xD7",attrs:{type:"button","aria-label":"Exit history"},on:{mousedown:Pc,click:lg}});return s("div",{class:`bloom-root ${ke("hud")}`,attrs:{"data-bloom":"history-hud",role:"group","aria-live":"polite","aria-label":"Input history"}},e,t)}function Rc(e,t){let o=le();if(!o||Ye)return;he??=sg();let n=`${e+1} / ${t}`,r=he.querySelector(`.${ke("hud-count")}`);r?.replaceChildren(n),r?.setAttribute("aria-label",`Show input history (${n})`);let i=(o.closest("form")??o).getBoundingClientRect();he.style.left=`${i.left+i.width/2}px`,he.style.top=`${i.top}px`,he.isConnected||document.body.append(he)}function Qt(){D=null,he?.remove()}function lg(){D&&ne(D.draft),Qt(),le()?.focus()}function Dc(e){let t=Wt();if(!D)return;let o=t[e];D.index=e,D.shown=o,ne(o),Rc(t.length-1-e,t.length)}function cg(e){let t=Wt();if(!t.length)return!1;if(!D){if(e===1)return!1;D={index:t.length,draft:M(),shown:""}}let o=D.index+e;return o<0?!0:o>=t.length?(ne(D.draft),Qt(),!0):(Dc(o),!0)}function ug(e){let t=Wt().indexOf(e);Ro(),!(t<0)&&(D??={index:t,draft:M(),shown:""},Dc(t),le()?.focus())}function Ro(){if(!Ye)return;Ye.release(),Ye.controller.abort(),Ye.root.remove(),Ye=null;let e=Wt();D&&e[D.index]===D.shown?Rc(e.length-1-D.index,e.length):D=null}function dg(){if(Ye)return;he?.remove();let e=s("div",{class:ke("dialog-body")}),t=s("div",{class:`bloom-root ${ke("backdrop")}`,attrs:{"data-bloom":"history-dialog"},on:{click:n=>n.target===n.currentTarget&&Ro()}},s("div",{class:ke("dialog"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Input history"}},s("div",{class:ke("dialog-header")},s("h2",{class:ke("dialog-title"),text:"Input history"}),Q("close","Close",Ro)),e));t.addEventListener("keydown",n=>n.stopPropagation());let o=new AbortController;document.addEventListener("keydown",n=>{n.key==="Escape"&&(n.preventDefault(),n.stopPropagation(),Ro())},{capture:!0,signal:o.signal}),document.body.append(t),Ye={root:t,release:ta(e,ug),controller:o},e.querySelector("input")?.focus()}function Hc(e){return et(e)?e:e instanceof HTMLElement?e.closest(u.composerInput):null}function mg(){if(le()?.closest("[data-chatgpt-composer], [data-composer-input], form")?.querySelector('[aria-expanded="true"]'))return!0;for(let t of document.querySelectorAll('[role="listbox"], [role="menu"], [data-radix-popper-content-wrapper], [cmdk-root], [cmdk-list]')){if(!(t instanceof HTMLElement)||t.closest("[data-bloom]"))continue;let o=getComputedStyle(t);if(!(o.display==="none"||o.visibility==="hidden"))return!0}return!1}function fg(e){if(e.isComposing||e.key==="Process"||e.keyCode===229)return;let t=Hc(e.target);if(!t)return;if(e.key==="Enter"&&!e.shiftKey){ra(M(t)),Qt();return}if(e.key==="Escape"&&D){ne(D.draft),Qt(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey||mg())return;let o=gs(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!D||cg(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function pg(e){D&&Hc(e.target)&&M()!==D.shown.trim()&&Qt()}function gg(e){e.target instanceof Element&&e.target.closest(u.sendButton)&&ra(M())}var Nc=f({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before. Click the counter to browse history.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:dt,styles:Oc,start(){for(let t of document.querySelectorAll('[data-bloom="history-hud"], [data-bloom="history-dialog"]'))t.remove();he=null,na=new AbortController;let{signal:e}=na;document.addEventListener("keydown",fg,{capture:!0,signal:e}),document.addEventListener("input",pg,{capture:!0,signal:e}),document.addEventListener("click",gg,{capture:!0,signal:e}),document.addEventListener("submit",()=>ra(M()),{capture:!0,signal:e})},stop(){na?.abort(),Ro(),Qt();for(let e of document.querySelectorAll('[data-bloom="history-hud"]'))e.remove();he=null},onSettingsChange(e){e==="maxEntries"&&Po(Wt())}});var Uc=`/*
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
`;var bg=1500,yg=5e3,Ag=2e3,Wc=[{label:"UTC",value:"UTC"},{label:"\u7F8E\u56FD\u4E1C\u90E8",value:"America/New_York"},{label:"\u7F8E\u56FD\u4E2D\u90E8",value:"America/Chicago"},{label:"\u7F8E\u56FD\u5C71\u5730",value:"America/Denver"},{label:"\u7F8E\u56FD\u897F\u90E8",value:"America/Los_Angeles"},{label:"\u65E5\u672C",value:"Asia/Tokyo"},{label:"\u53F0\u6E7E",value:"Asia/Taipei"}],jt=p({sourceTimeZone:{type:"select",description:"Zone the stored clock was written in. Leave UTC for ChatGPT create_time. Pick the same zone as the Shit GPT plugin only when that clock is a wall time in that zone; it is then shown in the system timezone.",options:Wc,default:"UTC"},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),ar=new Map,ia=new Set,jc=0,sr,Fc=[];function zc(e,t){ar.get(e)!==t&&(ar.set(e,t),clearTimeout(sr),sr=setTimeout(Vc,Ag))}function Vc(){let e={...jt.store.stamps,...Object.fromEntries(ar)};jt.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,bg))}function vg(e){let t=ce(A())?.times;for(let o=e.length-1;o>=0;o--){let n=ar.get(e[o])??t?.get(e[o])??jt.store.stamps[e[o]];if(n)return n}return null}var wg=()=>R().generating||Date.now()-jc<yg;function Jc(){return Intl.DateTimeFormat().resolvedOptions().timeZone}function Zc(){let e=jt.store.sourceTimeZone;if(!e||e==="UTC")return"UTC";try{return Intl.DateTimeFormat(void 0,{timeZone:e}),e}catch{return"UTC"}}function Xc(e,t){let o={};for(let n of new Intl.DateTimeFormat("en-US",{timeZone:t,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(e)))o[n.type]=n.value;return{y:+o.year,m:+o.month,d:+o.day,h:+o.hour%24,mi:+o.minute,s:+o.second}}function $c(e){return Date.UTC(e.y,e.m-1,e.d,e.h,e.mi,e.s)}function Gc(e,t){let o=e;for(let n=0;n<4;n++){let r=e-$c(Xc(o,t));if(r===0)return o;o+=r}return o}function Sg(e,t){if(t==="UTC")return e;let o=(e%1e3+1e3)%1e3,n=e-o,r=new Date(n),i=Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),r.getUTCHours(),r.getUTCMinutes(),r.getUTCSeconds()),a=Gc(i,t),c=3600*1e3,l=Number.POSITIVE_INFINITY;for(let d of[-c,0,c]){let m=a+d;$c(Xc(m,t))===i&&m<l&&(l=m)}return l!==Number.POSITIVE_INFINITY?l+o:Gc(i+c,t)+o}function xg(e,t){let o=Zc();return t||o==="UTC"?e:Sg(e,o)}function Yc(e,t){return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(e)}function qg(e){let t=Jc(),o=Date.now(),n={hour:"2-digit",minute:"2-digit",timeZone:t};if(Yc(e,t)===Yc(o,t))return new Intl.DateTimeFormat(void 0,n).format(e);let r=a=>new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric"}).format(a),i=r(e)===r(o)?{}:{year:"numeric"};return new Intl.DateTimeFormat(void 0,{...i,month:"short",day:"numeric",...n}).format(e)}function Eg(e,t){let o=new Date(t).toLocaleString(void 0,{timeZone:Jc()}),n=Zc();if(n==="UTC"||t===e)return o;let r=new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"UTC"}).format(e);return`${Wc.find(a=>a.value===n)?.label??n} ${r} \u2192 ${o}`}function _c(e){let t=Et(e)??e.getAttribute("data-message-author-role")??e.closest(u.turn)?.getAttribute("data-turn")??e.querySelector(u.authorRole)?.getAttribute("data-message-author-role");if(Yr(t))return t;let o=so(e).at(-1);return ce(A())?.chain.find(n=>n.id===o)?.role??null}var Kc='[class*="group/activity-header"]';function Tg(e){let t=e.parentElement;if(!t)return null;let o=e.closest(u.turn);return o&&t!==o&&!o.contains(t)?null:t}function Cg(e){let t=e;for(let o=0;o<8&&t;o++){let n=Tg(t);if(!n)return null;let r=[...n.children],i=r.indexOf(t);for(let a=i-1;a>=0;a--){let c=r[a],l=c.matches(Kc)?c:c.querySelector(Kc);if(l)return l;if(c.matches(u.searchUnit)||c.querySelector(u.searchUnit))return null}if(n===t.closest(u.turn))return null;t=n}return null}function Mg(e){let t=e.parentElement;for(let o=0;o<4&&t;o++){if(t.classList.contains("flex-col"))return t;t=t.parentElement}return e.parentElement??e}function eu(e,t){if(t==="assistant"){let o=Cg(e);if(o)return Mg(o)}return e}function Lg(e,t){let o=Tt();for(let n=o.length-1;n>=0;n--){let r=o[n];if(!(r!==e&&(_c(r)!=="assistant"||eu(r,"assistant")!==t)))return r===e}return!0}function Qc(e){return e.querySelector(':scope > time[data-bloom="timestamp"]')}function kg(e){let t=so(e);if(!t.length||!qe(e)||e.querySelector("time:not([data-bloom])"))return;let o=_c(e),n=eu(e,o);if(n!==e&&!Lg(e,n)){Qc(e)?.remove();return}let r=vg(t),i=!1;if(!r&&wg()){r=Date.now();let m=t.at(-1);ia.add(m),zc(m,r),i=!0}else r&&ia.has(t.at(-1))&&(i=!0);let a=n.querySelector('time[data-bloom="timestamp"]')??Qc(e);if(!r||jt.store.hideOwnMessages&&o==="user"){a?.remove();return}let c=xg(r,i),l=qg(c);if(a?.textContent===l&&a.parentElement===n&&a===n.firstElementChild)return;let d=s("time",{class:`bloom-timestamp bloom-timestamp-${o??"assistant"}`,text:l,title:Eg(r,c),attrs:{"data-bloom":"timestamp",datetime:new Date(c).toISOString()}});a&&a.replaceWith(d),(d.parentElement!==n||d!==n.firstElementChild)&&n.prepend(d)}var ir=De(()=>{for(let e of Tt())kg(e)}),tu=f({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:jt,styles:Uc,start(){Fc=[C(e=>N(e)&&ir()),j.on("conversation",ir),j.on("message-time",({messageId:e,time:t})=>{ia.delete(e),zc(e,t),ir()}),x.on("fall",()=>{jc=Date.now()})]},stop(){for(let e of Fc)e();sr&&(clearTimeout(sr),Vc());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();ir()}}});var Ig=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])','[data-chatgpt-composer] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-composer-input] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-codex-composer-root] button[aria-label^="Dictat" i], [data-composer-placement] button[aria-label^="Dictat" i], [class*="ComposerLayout"] button[aria-label^="Dictat" i]'],Bg=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],ou=p({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),nu=f({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:ou,styles:()=>Re([...Ig,...ou.store.hideDictationSettings?Bg:[]])});var mt="data-bloom-share",Og=/^\/g\/g-p-/,Pg=/^(?:share|分享)$/i,Rg=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],Dg=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${mt}="project"]`],aa=p({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),lr,sa=!1;function Hg(e){if(!N(e))return;let t=Og.test(location.pathname)&&!A();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${mt}]`))!t||!Pg.test(h(o.textContent??""))?o.removeAttribute(mt):o.hasAttribute(mt)||o.setAttribute(mt,"project")}var ru=f({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:aa,styles:()=>Re([...aa.store.hideShareChat?Rg:[],...aa.store.hideShareProject?Dg:[]]),start(){sa=!0,tt().then(()=>{sa&&!lr&&(lr=C(Hg))})},stop(){sa=!1,lr?.(),lr=void 0;for(let e of document.querySelectorAll(`[${mt}]`))e.removeAttribute(mt)}});var iu='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',Ng='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',Ug="[data-bloom-profile-plan]",au="visibility:hidden!important;user-select:none!important",lu=p({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function Fg(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=lu.store,r=[];return e&&r.push(n?`:is(${iu}){display:none!important}`:`:is(${iu}){${au}}`),t&&r.push(`:is(${Ng}){${au}}`),e&&o&&r.push(`${Ug}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var su,cu=f({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:lu,styles:Fg,start(){su=pe()},stop(){su?.()}});var Gg="model-switcher-dropdown-button",la="data-selected-reasoning-effort",cr="ArrowLeft",uu=e=>e.startsWith("model-switcher-")&&e!==Gg?e.slice(15):"",Do=(e,t)=>e.id===t.id||!!e.label&&e.label===t.label;function du(){let e=W();return(e&&K(u.modelTrigger,e))??K(u.modelTrigger)}function be(){let e=du();if(!e)return null;let t=e.getAttribute("aria-expanded")==="true",o=e.getAttribute(la),n=o&&t?"":h(e.innerText),r=o||uu(e.getAttribute("data-testid")??"")||n;return r?{id:r,label:n||r}:null}function Yg(e){return[...document.querySelectorAll(u.modelItem)].find(t=>{let o=uu(t.getAttribute("data-testid")??""),n=h(t.textContent??"");return o===e.id||n===e.label||n===e.id})??null}function Kg(e){let t=e.querySelector("[role=slider]"),o=Number(t?.getAttribute("aria-valuenow")),n=Number(t?.getAttribute("aria-valuemax"));o<=0?cr="ArrowRight":o>=n&&(cr="ArrowLeft"),e.focus(),e.dispatchEvent(new KeyboardEvent("keydown",{key:cr,code:cr,bubbles:!0,cancelable:!0}))}function ca(e){let t=be(),o=du();if(t&&Do(t,e))return o?.hasAttribute(la)&&o.getAttribute("aria-expanded")==="true"&&document.querySelector("[role=menu]")?.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),!0;if(o?.hasAttribute(la)){let r=document.querySelector(u.effortSlider);return r?Kg(r):o.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,button:0,pointerType:"mouse",isPrimary:!0})),!1}let n=Yg(e);if(n){n.click();let r=be();return!!r&&Do(r,e)}return o?.getAttribute("aria-expanded")!=="true"&&o?.click(),!1}var mu=`/*
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
`;var G=L("bloom-queue-"),Wg=6,jg=8,te=null,Ho="",zt=!1,Vt=!1;function ua(e,t,o){let n=Q(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute(Ee),n.addEventListener("mouseenter",()=>fu(t)),n.addEventListener("mouseleave",()=>fu("")),n}function fu(e){let t=te?.querySelector(`.${G("tip")}`);t&&(t.textContent=e)}function zg(e,t,o,n){Vt=!0;let r=s("textarea",{class:`bloom-input ${G("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=new AbortController,a=c=>{i.abort(),Vt=!1,Ho="",c?n.edit(t,r.value):r.replaceWith(s("div",{class:G("text"),text:o}))};addEventListener("keydown",c=>{if(!(c.target!==r||c.isComposing)){if(c.key==="Enter"&&!c.shiftKey)a(!0);else if(c.key==="Escape")a(!1);else return;c.preventDefault(),c.stopImmediatePropagation()}},{capture:!0,signal:i.signal}),r.addEventListener("keydown",c=>c.stopPropagation(),{signal:i.signal}),r.addEventListener("blur",()=>a(!0),{signal:i.signal}),e.querySelector(`.${G("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function Vg(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,a=l=>{!i&&Math.abs(l.clientY-n.clientY)<Wg||(i||(i=Vt=!0,e.classList.add(G("dragging"))),e.style.transform=`translateY(${l.clientY-n.clientY}px)`)},c=l=>{if(removeEventListener("pointermove",a),!i)return;Vt=!1,Ho="";let m=[...r.children].filter(w=>w!==e).filter(w=>w.getBoundingClientRect().top+w.getBoundingClientRect().height/2<l.clientY).length;o.move(t,m)};addEventListener("pointermove",a),addEventListener("pointerup",c,{once:!0})})}function Jg(e,t,o,n){let r=s("li",{class:G("row")},s("div",{class:G("text"),text:e.text}),n&&e.label?s("span",{class:G("model"),title:e.label,text:e.label}):null,s("div",{class:G("actions")},ua("trash","Remove from queue",()=>o.remove(t)),ua("edit","Edit",()=>zg(r,t,e.text,o)),ua("send","Send now",()=>o.sendNow(t))));return Vg(r,t,o),r}function Zg(e){if(!te)return;let t=e.getBoundingClientRect();te.style.left=`${t.left}px`,te.style.width=`${t.width}px`,te.style.bottom=`${innerHeight-t.top+jg}px`}function da(){te?.remove(),te=null,Ho="",Vt=!1}function ft(e,t,o=!0){let n=W();if(!e.length||!Ze(n)){da();return}te||(te=s("div",{class:`bloom-root ${G("tray")}`,attrs:{"data-bloom":"queue"}},s("div",{class:G("header")},s("button",{class:G("toggle"),attrs:{type:"button","aria-expanded":String(!zt)},on:{click:a=>{zt=!zt,te?.classList.toggle(G("collapsed"),zt),a.currentTarget.setAttribute("aria-expanded",String(!zt))}}},s("span",{class:G("count")}),U("chevron")),s("span",{class:G("tip")})),s("ol",{class:G("list")})),te.classList.toggle(G("collapsed"),zt),document.body.append(te)),Zg(n);let r=JSON.stringify([o,...e.map(a=>[a.text,o?a.label:""])]);if(Vt||r===Ho)return;Ho=r;let i=te.querySelector(`.${G("count")}`);i&&(i.textContent=zo(e.length,"Queued message")),te.querySelector(`.${G("list")}`)?.replaceChildren(...e.map((a,c)=>Jg(a,c,t,o)))}var fr=new E("PromptQueue"),Xg=8,Uo=150,ur=20,$g=300,ye="BloomPromptQueue",fa="BloomPromptQueueClaim",pu="BloomPromptQueueTab",_g=4e3,Z=p({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1},showQueueMode:{type:"boolean",description:"Show the model that was selected when each message was queued.",default:!0},stickyOnNavigate:{type:"boolean",description:"Keep the selected model when switching chats.",default:!0},persistAcrossRefresh:{type:"boolean",description:"Restore unsent queued messages in this browser after a refresh. Other tabs show the same queue; only one of them sends it.",default:!0}}),Ae=new Map,No=!1,pt=null,Jt,gu=[],Ke=null,ht=!1,Fo,dr="draft",Go=()=>A()??dr,oe=()=>Ae.get(Go())??[],pa=e=>({id:e.model||e.label,label:e.label||e.model});function eh(e){return typeof e=="string"?e.trim()?{text:e,model:"",label:""}:null:!O(e)||typeof e.text!="string"||!e.text.trim()?null:{text:e.text,model:typeof e.model=="string"?e.model:"",label:typeof e.label=="string"?e.label:""}}function ga(){let e=sessionStorage.getItem(pu);if(e)return e;let t=globalThis.crypto?.randomUUID?.()??`${Date.now()}-${Math.random()}`;return sessionStorage.setItem(pu,t),t}function yu(){let e=Oe(localStorage.getItem(fa)??"");return!O(e)||typeof e.tab!="string"||typeof e.at!="number"||typeof e.key!="string"?null:{tab:e.tab,at:e.at,key:e.key}}function Au(){let e={tab:ga(),at:Date.now(),key:Go()};try{localStorage.setItem(fa,JSON.stringify(e))}catch(t){fr.warn("Could not claim the queue",t)}}function th(){let e=yu();if(e?.tab===ga())try{localStorage.setItem(fa,JSON.stringify({...e,at:Date.now()}))}catch(t){fr.warn("Could not refresh the queue claim",t)}}function oh(){let e=yu();return!e||e.tab===ga()||e.key!==Go()?!0:Date.now()-e.at<=_g?!1:(Au(),!0)}function nh(){return Object.fromEntries([...Ae].filter(([e])=>e!==dr))}function ma(e){let t=typeof e=="string"?Oe(e):e;if(!O(t))return!1;let o=!1;for(let[n,r]of Object.entries(t)){if(!Array.isArray(r))continue;let i=r.map(eh).filter(a=>a!=null);i.length&&(Ae.set(n,i),o=!0)}return o}function rh(){if(!Z.store.persistAcrossRefresh){sessionStorage.removeItem(ye),Tr(ye);return}ma(sessionStorage.getItem(ye))||ma(_o(ye))&&mr()}function mr(){try{if(!Z.store.persistAcrossRefresh){sessionStorage.removeItem(ye),Tr(ye);return}let e=nh();sessionStorage.setItem(ye,JSON.stringify(e)),en(ye,e)}catch(e){fr.warn("Could not save the queue",e)}}function ih(e){if(!(e.key!==ye||!Z.store.persistAcrossRefresh||e.newValue==null)){Ae.clear(),ma(e.newValue);try{sessionStorage.setItem(ye,e.newValue)}catch(t){fr.warn("Could not mirror the queue",t)}ft(oe(),Zt,Z.store.showQueueMode)}}function gt(e){e.length?Ae.set(Go(),e):Ae.delete(Go()),Au(),mr(),ft(oe(),Zt,Z.store.showQueueMode)}function ah(e){if(!e.model&&!e.label)return!0;let t=be();return t?Do(t,pa(e)):!0}function vu(e,t=0){t>=ur||R().generating||M()!==e||(cn(),setTimeout(()=>vu(e,t+1),Uo))}function sh(e,t){let o=e??Ke;if(!o||!t.model&&!t.label||Do(o,pa(t))){ht=!1;return}Z.store.stickyOnNavigate&&(Ke=o),clearTimeout(Fo),Fo=setTimeout(()=>Su(o),Uo)}function Yo(e,t=0,o=be()){if(R().generating||M()){t<ur&&setTimeout(()=>Yo(e,t+1,o),Uo);return}if(!ah(e)&&t<ur){ht=!0,ca(pa(e)),setTimeout(()=>Yo(e,t+1,o),Uo);return}ne(e.text),ro(()=>vu(e.text)),sh(o,e)}function hu(){if(pt!=null){let o=pt;pt=null,Yo(o);return}if(!No||R().generating||M())return;if(!oh()){No=!1;return}let[e,...t]=oe();e!=null&&(No=!1,gt(t),Yo(e))}function wu(e){let t=oe(),o=t[e];if(o!=null){if(gt(t.filter((n,r)=>r!==e)),!R().generating){Yo(o);return}pt=o,xt()?.click()}}var Zt={remove:e=>gt(oe().filter((t,o)=>o!==e)),edit:(e,t)=>gt(t.trim()?oe().map((o,n)=>n===e?{...o,text:t}:o):oe().filter((o,n)=>n!==e)),sendNow:wu,move(e,t){let o=[...oe()],[n]=o.splice(e,1);n&&(o.splice(t,0,n),gt(o))}};function lh(e){let t=be(),o={text:e,model:t?.id??"",label:t?.label??""},n=oe();return Z.store.replacePending&&n.length?(gt([...n.slice(0,-1),o]),!0):n.length>=Xg?!1:(gt([...n,o]),!0)}function ch(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!et(e.target)||!R().generating)return;let t=M(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;let o=be();ne(""),pt={text:t,model:o?.id??"",label:o?.label??""},xt()?.click();return}if(!t){oe().length&&wu(0);return}lh(t)&&ne("")}function uh(){if(ht||!Z.store.stickyOnNavigate)return;let e=be();e&&(Ke=e)}function Su(e){ht=!0;let t=0,o=()=>{if(ca(e)||t>=ur){ht=!1;return}t++,Fo=setTimeout(o,Uo)};clearTimeout(Fo),o()}function dh(){Z.store.stickyOnNavigate&&Ke&&Su(Ke)}function bu(e){let{target:t}=e;!(t instanceof Element)||ht||t.closest(`${u.modelTrigger}, ${u.modelItem}`)&&setTimeout(uh,$g)}var xu=f({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:Z,styles:mu,start(){Jt=new AbortController,rh(),Ke=be(),document.addEventListener("keydown",ch,{capture:!0,signal:Jt.signal}),document.addEventListener("pointerup",bu,{signal:Jt.signal}),document.addEventListener("keyup",bu,{signal:Jt.signal}),gu=[x.on("fall",({outcome:e})=>{No=e==="done",e==="left"&&(pt=null),hu()}),x.on("context",({prevId:e,id:t,migrated:o})=>{let n=Ae.get(dr);Ae.delete(dr),o&&!e&&t&&n&&Ae.set(t,n),o||(No=!1,dh()),mr(),ft(oe(),Zt,Z.store.showQueueMode)}),x.on("tick",()=>{th(),hu(),ft(oe(),Zt,Z.store.showQueueMode)})],addEventListener("storage",ih,{signal:Jt.signal}),ft(oe(),Zt,Z.store.showQueueMode)},stop(){Jt?.abort(),clearTimeout(Fo);for(let e of gu)e();da(),Ae.clear(),pt=null,Ke=null,ht=!1},onSettingsChange(e){e==="persistAcrossRefresh"&&mr(),e==="stickyOnNavigate"&&Z.store.stickyOnNavigate&&(Ke=be()),ft(oe(),Zt,Z.store.showQueueMode)}});var mh=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function fh(){let e=h(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!mh.has(e.toLowerCase())?e:null}function Ko(e){return e?ce(e)?.title??el(e)??(e===A()?fh():null):null}var qu=`/*
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
`;var Ie=L("bloom-recent-"),Be="home",gh=50,Eu=140,hh=new Set(["Backquote"]),bh=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),q=p({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),Qe=null,ve=[],we=0,ha,Tu=[],hr=()=>me()?null:A()??(hn()?Be:null);function Cu(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function Lu(e){let t=Ko(e);t&&q.store.titles[e]!==t&&(q.store.titles={...q.store.titles,[e]:t});let o=tl(location.href);o&&e===A()&&q.store.projects[e]!==o&&(q.store.projects={...q.store.projects,[e]:o})}function Mu(e){if(!e)return;let t=[e,...q.store.visits.filter(n=>n!==e)].slice(0,gh),o=new Set(t);q.store.visits=t,Object.keys(q.store.previews).some(n=>!o.has(n))&&(q.store.previews=Cu(q.store.previews,o)),Object.keys(q.store.titles).some(n=>!o.has(n))&&(q.store.titles=Cu(q.store.titles,o)),e!==Be&&Lu(e)}function pr(e){if(!e||!q.store.visits.includes(e))return;let t={},o=ce(e)?.chain??[];for(let r of o)t[r.role]=ue(yn(r),Eu);if(e===A())for(let r of He()){let i=Ct(r);i&&(t[r.role]=ue(i,Eu))}let n=q.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(q.store.previews={...q.store.previews,[e]:t})}function yh(){let e=Number(q.store.maxRecent);return q.store.visits.filter(t=>t!==Be||q.store.includeHome).slice(0,e)}function ba(e){if(Qo(),e===hr())return;let t=e===Be?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"], [data-sidebar-destination="builtin:home"]'):fo(e)[0];t?t.click():location.assign(e===Be?"/":`/c/${e}`)}function Ah(e,t){let o=e===Be?"New chat":q.store.titles[e]??Ko(e)??"Untitled chat",n=e===Be?null:q.store.projects[e],r=e===Be?null:q.store.previews[e];return s("button",{class:Ie("item"),attrs:{type:"button",role:"option","aria-selected":String(t===we)},on:{click:()=>ba(e),mousemove:()=>t!==we&&gr(t)}},s("div",{class:Ie("head")},s("span",{class:`${Ie("title")} bloom-truncate`,text:o}),n&&s("span",{class:Ie("project"),text:n})),r?.user&&s("div",{class:`${Ie("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&s("div",{class:`${Ie("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function gr(e){we=(e+ve.length)%ve.length,Qe?.querySelectorAll(`.${Ie("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===we)))}function vh(){pr(A());let e=hr();ve=yh(),e&&(ve=[e,...ve.filter(t=>t!==e)].slice(0,Number(q.store.maxRecent))),ve.length&&(we=ve.length>1?1:0,Qe=s("div",{class:`bloom-root ${Ie("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:t=>t.target===t.currentTarget&&Qo()}},s("div",{class:Ie("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...ve.map(Ah))),document.body.append(Qe))}function Qo(){Qe?.remove(),Qe=null}var wh=e=>hh.has(e.code)||bh.has(e.key);function Sh(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&wh(e)){e.preventDefault(),e.stopPropagation(),Qe?gr(we+(e.shiftKey?-1:1)):vh();return}if(!Qe)return;let o={Escape:Qo,Enter:()=>ba(ve[we]),ArrowDown:()=>gr(we+1),ArrowUp:()=>gr(we-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function xh(e){Qe&&e.key==="Control"&&ba(ve[we])}var ku=f({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:q,styles:qu,start(){ha=new AbortController;let{signal:e}=ha;addEventListener("keydown",Sh,{capture:!0,signal:e}),addEventListener("keyup",xh,{capture:!0,signal:e}),addEventListener("blur",Qo,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&pr(A()),{signal:e}),Tu=[fe(({prevId:i})=>{pr(i),Mu(hr())}),j.on("conversation",({id:i})=>{q.store.visits.includes(i)&&Lu(i),pr(i)})];let{visits:t,titles:o,previews:n}=q.store,r=t.filter(i=>i!==Be&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(q.store.visits=t.filter(i=>!r.includes(i))),Mu(hr())},stop(){ha?.abort();for(let e of Tu)e();Qo()}});var ya="data:audio/mpeg;base64,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";var Iu=new E("ResponseNotification"),qh=.5,Eh=200,Th=300,Wo=p({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:e=>(e.append(z("Preview",Ru)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),Bu=null,Aa=new Map,Ou,va;function Ch(e){return new Promise((t,o)=>GM_xmlhttpRequest({url:e,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=Eh&&n<Th?t(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var Mh=e=>Uint8Array.from(atob(e.slice(e.indexOf(",")+1)),t=>t.charCodeAt(0)).buffer;function Lh(e,t){let o=Aa.get(t);return o||(o=(t.startsWith("data:")?Promise.resolve(Mh(t)):Ch(t)).then(n=>e.decodeAudioData(n)),o.catch(()=>Aa.delete(t)),Aa.set(t,o)),o}async function Pu(e){Bu??=new AudioContext;let t=Bu;t.state==="suspended"&&t.resume();let o=t.createBufferSource(),n=t.createGain();o.buffer=await Lh(t,e),n.gain.value=qh,o.connect(n).connect(t.destination),o.start()}function Ru(){let e=Wo.store.soundUrl.trim();Pu(e||ya).catch(t=>{Iu.warn("Sound failed",t),e&&Pu(ya).catch(o=>Iu.warn("Default chime failed",o))})}function kh(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function Ih(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(va=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:va.signal}))}var Du=f({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:Wo,start(){Ih(),Ou=x.on("fall",({conversationId:e,outcome:t})=>{t==="done"&&(Wo.store.onlyWhenHidden&&!document.hidden||(Wo.store.sound&&Ru(),Wo.store.browserNotification&&kh(Ko(e))))})},stop(){Ou?.(),va?.abort()}});var Bh=`:is(${u.sidebarScroll}, :has(> ${u.sidebarScroll})) + :has(${u.menuButton})`,Oh=`${u.rail} > :has(${u.menuButton})`,Sa=`:is(${Bh}, ${Oh}, ${u.oldProfile}):not(:hover)`,wa="[data-bloom-profile-avatar]",Ph=`:is(${Sa}, ${Sa} :has(${wa})) > :not(${wa}, :has(${wa}))`,Nu=p({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function Rh(){let{opacity:e,fadeAvatar:t}=Nu.store;return e>=100?"":`${t?Sa:Ph}{opacity:${e/100}!important}`}var Hu,Uu=f({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Nu,styles:Rh,start(){Hu=pe()},stop(){Hu?.()}});var Fu=`/*
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
`;var H=L("bloom-star-chats"),Hh=80,Nh=60,Uh=1200,Fh=120,jo=p({replaceReadAloud:{type:"boolean",description:"Put the star where the reply's Read aloud button is, and hide that button.",default:!0},messages:{type:"custom",default:[]}}),Gh=`:is(${u.turnActions}) ${u.readAloud}`,xa,qa=!1,We=!1,yt=!1,br=0,V=null,yr="",B=null,Ea,je;function Ca(){let e=jo.store.messages;return Array.isArray(e)?e.filter(t=>O(t)&&typeof t.conversationId=="string"&&typeof t.messageId=="string"&&(t.role==="user"||t.role==="assistant")&&typeof t.snippet=="string"&&typeof t.starredAt=="number"):[]}function Ma(){let e=A();return e?Ca().filter(t=>t.conversationId===e):[]}function Yh(e,t){return Ca().some(o=>o.conversationId===e&&o.messageId===t)}function Gu(e){let t=Ca(),o=t.some(n=>n.conversationId===e.conversationId&&n.messageId===e.messageId);jo.store.messages=o?t.filter(n=>!(n.conversationId===e.conversationId&&n.messageId===e.messageId)):[{...e,starredAt:Date.now()},...t].slice(0,Hh)}function Ta(e){return e.messageIds[0]||e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.el.getAttribute("data-turn-key")||""}function Kh(e){return ue(Ct(e)||h(e.el.textContent??""),Nh)}function Qh(e){let t=e.closest(u.turn);if(!t)return null;let o=He().filter(n=>t.contains(n.el));return o.find(n=>n.el.contains(e)||n.el===t)??o.findLast(n=>n.el.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING)??null}function Wh(){let e=[...document.querySelectorAll(u.turnActions)].filter(t=>!t.closest(`[data-bloom], [role="dialog"], [inert], pre, ${u.sidebars}`));return e.filter(t=>!e.some(o=>o!==t&&o.contains(t)))}function jh(e,t){let o=jo.store.replaceReadAloud?t.querySelector(u.readAloud):null;if(o&&!o.closest("[data-bloom]")){e.nextElementSibling!==o&&o.before(e);return}let n=zh(t);(e.parentElement!==n||n.lastElementChild!==e)&&n.append(e)}function zh(e){let t=[...e.querySelectorAll("button")].filter(n=>n.dataset.bloom!=="message-star"&&!n.closest("[data-bloom]"));return t.length?[...e.children].find(n=>n instanceof HTMLElement&&n!==t[0]&&t.every(r=>n.contains(r)))??e:e}function Vh(){return[...document.querySelectorAll(u.headerMore)].filter(t=>{if(t.dataset.bloom==="message-star"||t.closest("[data-bloom], [role='dialog'], [inert]")||t.closest(u.sidebars))return!1;let o=t.getBoundingClientRect();return o.width===0&&o.height===0?!!t.closest("header, #page-header"):o.top>=0&&o.top<96&&o.left>window.innerWidth*.5}).toSorted((t,o)=>o.getBoundingClientRect().left-t.getBoundingClientRect().left||(t.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1))[0]??null}function Yu(e,t,o){return s("button",{class:t,attrs:{type:"button","aria-label":e},on:{pointerdown:n=>n.stopPropagation(),mousedown:n=>n.stopPropagation(),click:n=>{n.preventDefault(),n.stopPropagation(),o(n)}}},U("star"))}function Jh(e,t){e.setAttribute("aria-pressed",String(t)),e.setAttribute("aria-label",t?"Unstar":"Star")}function Ar(){return We||yt}function Xt(){br&&window.clearTimeout(br),br=0}function $t(){We=!1,yt=!1,Xt(),je?.enter(),V?.remove(),V=null,yr="",B?.classList.remove(H("-open")),B?.setAttribute("aria-expanded","false")}function vr(e){return e instanceof Node&&!!(B?.contains(e)||V?.contains(e))}function Zh(e){e.classList.add(H("-flash")),window.setTimeout(()=>e.classList.remove(H("-flash")),Uh)}function Xh(e){let t=He().find(n=>Ta(n)===e),o=t?.el.closest(u.turn)??t?.el;o&&(o.scrollIntoView({block:"start"}),Zh(o))}function $h(){let e=A(),t=new Set,o=[...document.querySelectorAll('[data-bloom="message-star"][data-place="action"]')];if(!e||me()){for(let n of o)n.remove();return}for(let n of Wh()){if(!qe(n))continue;let r=Qh(n),i=r?Ta(r):"";if(!r||!i)continue;let a=n.querySelector('[data-place="action"]');(!a||a.dataset.id!==i)&&(a?.remove(),a=Yu("Star",H("-star"),()=>{let c=A(),l=He().find(d=>Ta(d)===i);!c||!l||Gu({conversationId:c,messageId:i,role:l.role,snippet:Kh(l)})}),a.dataset.bloom="message-star",a.dataset.place="action",a.dataset.id=i),Jh(a,Yh(e,i)),jh(a,n),t.add(a)}for(let n of o)t.has(n)||n.remove()}function _h(){if(!V||!B)return;let e=B.getBoundingClientRect(),t=V.offsetWidth||288,o=V.offsetHeight||120,n=e.bottom+6;n+o>window.innerHeight-8&&(n=Math.max(8,e.top-o-6));let r=Math.max(8,Math.min(e.right-t,window.innerWidth-t-8));V.dataset.place=n>=e.bottom?"below":"above",V.style.left=`${Math.round(r)}px`,V.style.top=`${Math.round(n)}px`}function eb(){if(!Ar()||!B){V?.remove(),V=null,yr="",B?.classList.remove(H("-open")),B?.setAttribute("aria-expanded","false");return}let e=Ma(),t=e.map(o=>`${o.messageId}	${o.snippet}`).join(`
`);if(!V||yr!==t){V?.remove();let o=e.map(n=>s("div",{class:H("-row")},s("button",{class:H("-jump"),attrs:{type:"button"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),$t(),Xh(n.messageId)}}},s("span",{class:H("-role"),text:n.role==="user"?"You":"ChatGPT"}),s("span",{class:H("-snip"),text:n.snippet||"Message"})),Yu("Unstar",H("-unstar"),()=>Gu(n))));V=s("div",{class:`bloom-root ${H("-panel")}`,attrs:{"data-bloom":"star-list"},on:{pointerenter:()=>{Xt(),je?.enter(),yt=!0},pointerleave:n=>{vr(n.relatedTarget)||We||je?.leave(n)}}},s("div",{class:H("-bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:H("-head"),text:"Starred"}),s("div",{class:H("-body")},...o.length?o:[s("div",{class:H("-empty"),text:"No starred messages in this chat"})])),document.body.append(V),yr=t}_h(),B.classList.add(H("-open")),B.setAttribute("aria-expanded","true")}function tb(){for(let r of document.querySelectorAll('[data-bloom="starred"]'))r.remove();let e=Vh(),t=e?.parentElement??null,o=A();if(!e||!t||t.closest(u.sidebars)||!o||me()||!qe(t)){B?.remove(),B=null,$t();return}B||(B=s("button",{class:H("-toggle"),attrs:{type:"button","data-bloom":"message-star","data-place":"header","aria-label":"Starred messages","aria-expanded":"false"},on:{pointerdown:r=>r.stopPropagation(),pointerenter:()=>{Xt(),je?.enter(),br=window.setTimeout(()=>{yt=!0,bt()},Fh)},pointerleave:r=>{vr(r.relatedTarget)||(Xt(),Ar()&&je?.leave(r))},click:r=>{r.preventDefault(),r.stopPropagation(),We=!We,yt=We,Xt(),We||$t(),bt()}}},U("star"))),(B.parentElement!==t||B.nextElementSibling!==e)&&e.before(B);let n=e.getBoundingClientRect();n.width>0&&(B.style.width=`${n.width}px`,B.style.height=`${n.height}px`),B.classList.toggle(H("-here"),Ma().length>0),eb()}function ob(){let e=new Set(Ma().map(t=>t.messageId));for(let t of document.querySelectorAll('[data-bloom="navigator"] .bloom-nav-tick, [data-bloom="navigator"] .bloom-nav-row'))t.classList.toggle(H("-mark"),!!t.dataset.messageId&&e.has(t.dataset.messageId))}function bt(){if(!qa){qa=!0;try{for(let e of document.querySelectorAll('[data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();$h(),tb(),ob()}finally{qa=!1}}}function nb(){$t(),B?.remove(),B=null;for(let e of document.querySelectorAll('[data-bloom="message-star"], [data-bloom="star-list"], [data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();for(let e of document.querySelectorAll(`.${H("-mark")}`))e.classList.remove(H("-mark"))}var Ku=f({name:"StarChats",description:"Star a message from its toolbar. The star left of the top-right menu opens this chat's list.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:jo,styles:()=>`${Fu}${jo.store.replaceReadAloud?Re([Gh]):""}`,onSettingsChange(e){(e==="messages"||e==="replaceReadAloud")&&bt()},start(){for(let o of document.querySelectorAll('[data-bloom="star-list"]'))o.remove();je=Ln({over:vr,trigger:()=>B,panel:()=>V,setHeld(o){if(o){yt=!0,bt();return}We||(yt=!1,bt())}}),xa=C(o=>N(o)&&bt());let e=o=>{vr(o.target)||Ar()&&$t()};document.addEventListener("pointerdown",e,!0);let t=o=>{o.key!=="Escape"||!Ar()||(o.preventDefault(),$t())};document.addEventListener("keydown",t,!0),Ea=()=>{document.removeEventListener("pointerdown",e,!0),document.removeEventListener("keydown",t,!0)},bt()},stop(){xa?.(),xa=void 0,Ea?.(),Ea=void 0,Xt(),je?.dispose(),je=void 0,nb()}});var Qu="filter:blur(6px)!important;transition:filter 0.2s ease",Wu=`:is(${u.sidebars})`,At="data-bloom-streamer-open",rb="[data-app-action-sidebar-thread-row], [data-app-action-sidebar-project-row], .bloom-recent-item";function ib(){return{conversations:{selectors:[`${Wu} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0,row:"[data-app-action-sidebar-thread-row]"},projects:{selectors:[`${Wu} a:is([href*="/project"], [href*="/g/g-p-"])`,"[data-app-action-sidebar-project-row]",".bloom-recent-project"],hover:!0,row:"[data-app-action-sidebar-project-row]"},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}}}var ju=p({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function ab(e,t){let o=[`:is(${e}):hover`,`.bloom-recent-item:hover :is(${e})`,`:is(${e})[${At}]`];return t&&o.push(`${t}:hover`,`${t}:hover :is(${e})`,`${t}:is(${e}):hover`,`${t}[${At}]`,`${t}[${At}] :is(${e})`),o.join(",")}function sb(){let e=ib();return Object.entries(e).filter(([t])=>ju.store[t]).map(([,t])=>{let o=t.selectors.join(",");if(!t.hover)return`:is(${o}){${Qu}}`;let n="row"in t?t.row:void 0;return`:is(${o}){${Qu}}${ab(o,n)}{filter:none!important}`}).join(`
`)}function lb(e,t){for(let o of document.elementsFromPoint(e,t))if(o instanceof Element){let n=o.closest(rb);if(n)return n}return null}function Ia(e){for(let t of document.querySelectorAll(`[${At}]`))t!==e&&t.removeAttribute(At);e&&!e.hasAttribute(At)&&e.setAttribute(At,"")}var _t,cb=De(()=>{_t&&Ia(lb(_t.clientX,_t.clientY))});function La(e){_t=e,cb()}function ub(e){e.relatedTarget instanceof Node&&document.documentElement.contains(e.relatedTarget)||(_t=void 0,Ia(null))}var ka,wr,zu=f({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:ju,styles:sb,start(){ka=pe(),wr=new AbortController;let e={capture:!0,signal:wr.signal,passive:!0};document.addEventListener("pointerover",La,e),document.addEventListener("pointermove",La,e),document.addEventListener("pointerout",La,e),window.addEventListener("pointerleave",ub,e)},stop(){wr?.abort(),wr=void 0,_t=void 0,Ia(null),ka?.(),ka=void 0}});var Ju=p({openNewAsTemporary:{type:"boolean",description:"Open New chat as a temporary chat.",default:!1}}),db=/^(?:new chat|新聊天)$/i,Sr;function mb(e){return e?"/?temporary-chat=true":"/"}function fb(e){let t=mb(e);`${location.pathname}${location.search}`===t||e&&me()&&location.pathname==="/"||location.assign(t)}function pb(e){if(e.closest("[data-bloom]"))return!1;try{let t=new URL(e.href,location.origin);return t.origin===location.origin&&t.pathname==="/"}catch{return!1}}function gb(e){return e.closest("[data-bloom], [data-app-action-sidebar-project-row]")?!1:db.test(e.getAttribute("aria-label")??h(e.textContent??""))}function hb(e){if(!Ju.store.openNewAsTemporary||me())return;let{target:t}=e;if(!(t instanceof Element))return;let o=t.closest("a[href], button"),n=o instanceof HTMLAnchorElement?pb(o):!!o&&gb(o);!o||!n||o.closest(`${u.sidebarScroll}, ${u.rail}, ${u.oldSidebar}, nav`)&&(e.preventDefault(),e.stopPropagation(),fb(!0))}function Vu(){for(let e of document.querySelectorAll('[data-bloom="temporary-chat"]'))e.remove()}var Zu=f({name:"TemporaryChat",description:"Optionally open New chat as a temporary chat. No extra sidebar button.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"ghost",enabledByDefault:!0,settings:Ju,start(){Vu(),Sr=new AbortController,document.addEventListener("pointerdown",hb,{capture:!0,signal:Sr.signal})},stop(){Sr?.abort(),Sr=void 0,Vu()}});var ze=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)','[data-turn-key] [data-message-author-role="user"] blockquote:not(.twitter-tweet)','[class~="group/user-message"] blockquote:not(.twitter-tweet)'].join(","),Ba=p({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function bb(){let e=[`${ze}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${ze}>*{margin-block:0!important}`];return Ba.store.italic||e.push(`${ze}{font-style:inherit!important}`),Ba.store.quotes||(e.push(`${ze}{quotes:none!important}`),e.push(`${ze}::before,${ze}::after,${ze} p::before,${ze} p::after{content:none!important}`)),e.join(`
`)}var Xu=f({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:Ba,styles:bb});var yb=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],Ab=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",vb='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',$u=p({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function wb(){let e=`${$u.store.width}rem`;return`:is(${Ab}){${yb.map(t=>`${t}:${e}!important`).join(";")}}:is(${vb}){max-width:min(100%, ${e})!important}`}var _u=f({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:$u,styles:wb});var Sb=[gl,Bl,Gl,Ql,tc,rc,ac,pc,qc,Bc,Nc,tu,nu,ru,cu,xu,ku,Du,Uu,Ku,zu,Zu,Xu,_u],Oa=Sb;var xb=new E("Bloom"),ed="2.0.92";var Pa=0;function qb(){Pa++,ds(),oo(),Zo()}async function Ra(){let e=++Pa,t=()=>e===Pa;oo(),Zo(),qs();for(let o of Oa)o.updatedAt=Ys[o.name];is(Oa),ts(),indexedDB.deleteDatabase("bloompp"),Vo("base",fs),Gs(),sn("Init"),mn().then(()=>{t()&&(Wa(),sn("DOMContentLoaded"))}),await Ts(),t()&&(sn("HostReady"),us(),xb.info(`Bloom++ ${ed} ready`))}var Eb=new E("Boot");window===window.top&&(za(_.Bloom),Va(Da),Ra().catch(e=>Eb.error("Startup failed",e)));})();
