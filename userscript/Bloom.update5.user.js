// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.58
// @description  Void++-style plugin host for chatgpt.com. Tab favicon, input history, recent chats, reply notify, next-prompt queue, Recents status, wider thread, thread outline, message times, streamer blur, custom home greeting, custom sidebar identity, hide Share, Dictation, sidebar name, Download apps, upgrade CTAs, and ads.
// @author       0-V-linuxdo & Bloom contributors
// @homepageURL  https://github.com/0-V-linuxdo/Bloom
// @supportURL   https://github.com/0-V-linuxdo/Bloom/issues
// @icon         https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/v2/assets/logos/app-icon/bloom-icon.svg
// @icon64       https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/v2/assets/logos/app-icon/bloom-icon-64.png
// @match        https://chatgpt.com/*
// @match        https://*.chatgpt.com/*
// @match        https://chat.openai.com/*
// @match        https://free.share-ai.top/*
// @match        https://chatgpt.aicnm.cc/*
// @run-at       document-start
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addValueChangeListener
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

/* Bloom++ v2.0.58. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Pc=Object.defineProperty;var Dc=(e,t)=>{for(var o in t)Pc(e,o,{get:t[o],enumerable:!0})};var x=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var ve=(e,t,o)=>Math.min(o,Math.max(t,e)),w=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ui=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,qe=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,h=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function wo(e,t){return`${e} ${t}${e===1?"":"s"}`}async function Gi(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function Se(e){try{return JSON.parse(e)}catch{return}}var $=typeof unsafeWindow>"u"?window:unsafeWindow;var Ni={};Dc(Ni,{VERSION:()=>Ic,init:()=>Hi,plugins:()=>Pe});var Hc=new x("Styles"),Et=new Map,Fi=new Set,Tt=new Map,Zn=!0;function Yi(){let e=document.adoptedStyleSheets.filter(t=>!Fi.has(t));document.adoptedStyleSheets=[...e,...Et.values()]}function Qi(e){document.readyState==="loading"||e.parentNode===document.head||document.head.append(e)}function Nc(e,t){let o=Tt.get(e);o||(o=document.createElement("style"),o.id=`bloom-style-${e}`,Tt.set(e,o)),o.textContent!==t&&(o.textContent=t),Qi(o)}function Eo(e,t){if(Zn)try{let o=Et.get(e);o||(o=new $.CSSStyleSheet,Et.set(e,o),Fi.add(o)),o.replaceSync(t),Yi();return}catch(o){Hc.warn("Constructed style sheets unavailable, using <style> after parsing",o),Zn=!1,Et.delete(e)}Nc(e,t)}function Xn(e){Et.delete(e)&&Zn&&Yi(),Tt.get(e)?.remove(),Tt.delete(e)}function Ki(){for(let e of Tt.values())Qi(e)}var E=e=>(...t)=>t.map(o=>e+o).join(" "),To=(...e)=>e.filter(Boolean).join(" "),$e=e=>e.length?`${e.map(t=>`${t}:not([data-bloom])`).join(",")}{display:none!important}`:"";function f(e){return e}var Ie=new x("Storage"),Uc="bloompp",Co="kv",ji=null;function Gc(){return ji??=new Promise((e,t)=>{let o=indexedDB.open(Uc,1);o.onupgradeneeded=()=>{o.result.objectStoreNames.contains(Co)||o.result.createObjectStore(Co)},o.onsuccess=()=>e(o.result),o.onerror=()=>t(o.error)}),ji}function $n(e,t){return Gc().then(o=>new Promise((n,r)=>{let i=t(o.transaction(Co,e).objectStore(Co));i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)}))}async function Fc(e){if(typeof GM_getValue=="function")try{return await GM_getValue(e)}catch(t){Ie.warn("GM read failed",t);return}}async function Yc(e){try{return await $n("readonly",t=>t.get(e))}catch(t){Ie.warn("IndexedDB read failed",t);return}}function Qc(e){try{return localStorage.getItem(e)??void 0}catch{return}}async function Mo(e){return Promise.all([Fc(e),Yc(e),Qc(e)])}function Wi(e,t){typeof GM_addValueChangeListener=="function"&&GM_addValueChangeListener(e,(o,n,r,i)=>{i&&t(r)}),addEventListener("storage",o=>{o.key===e&&t(o.newValue)})}function _n(e){if(typeof GM_setValue=="function")try{GM_setValue(e,{})}catch(t){Ie.warn("GM delete failed",t)}try{localStorage.removeItem(e)}catch(t){Ie.warn("localStorage delete failed",t)}$n("readwrite",t=>t.delete(e)).catch(t=>Ie.warn("IndexedDB delete failed",t))}function Lo(e,t){let o=JSON.stringify(t);if(typeof GM_setValue=="function")try{GM_setValue(e,t)}catch{GM_setValue(e,o)}try{localStorage.setItem(e,o)}catch(n){Ie.warn("localStorage write failed",n)}$n("readwrite",n=>n.put(o,e)).catch(n=>Ie.warn("IndexedDB write failed",n))}var Kc=new x("Settings"),tr="BloomSettings",jc=100,Wc=["GM","IndexedDB","localStorage"],_e={plugins:{}},ko=new Set,or=new Set,Ct;function Ji(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=Se(t);return!w(t)||!w(t.plugins)||!Object.keys(t.plugins).length?null:t}var er=e=>e==null||e===""||(Array.isArray(e)?!e.length:w(e)&&!Object.keys(e).length);function zc(e){return er(e)?0:Array.isArray(e)?12+Math.min(e.length,40):w(e)?12+Math.min(Object.keys(e).length,40):3}function Jc(e){let t=0;for(let o of Object.values(e.plugins))if(w(o))for(let[n,r]of Object.entries(o))n!=="enabled"&&(t+=zc(r));return t}var zi=e=>Object.values(e.plugins).filter(t=>w(t)&&t.enabled===!0).length;function Vc(e){let t=e.map((i,a)=>i&&{candidate:i,index:a,score:Jc(i)}).filter(i=>i!=null).toSorted((i,a)=>a.score-i.score||(i.score?0:zi(a.candidate)-zi(i.candidate))||i.index-a.index);if(!t.length)return null;let[o,...n]=t,r=structuredClone(o.candidate);for(let{candidate:i}of n)for(let[a,l]of Object.entries(i.plugins)){if(!w(l))continue;let c=r.plugins[a]??={};for(let[d,m]of Object.entries(l))d==="enabled"?!("enabled"in c)&&m===!0&&(c.enabled=!0):er(c[d])&&!er(m)&&(c[d]=structuredClone(m));Object.keys(c).length||delete r.plugins[a]}return{bag:r,source:Wc[o.index]}}async function Vi(){let e=await Mo(tr),t=Vc(e.map(Ji));t&&(_e.plugins=t.bag.plugins,Kc.info("Loaded settings from",t.source))}var Zi=(e,t)=>`${e}
${t}`;function Xi(){Ct=void 0,or.clear(),Lo(tr,_e)}function Zc(e){let t=Ji(e);if(!t)return;let o=[];for(let n of new Set([...Object.keys(_e.plugins),...Object.keys(t.plugins)])){let r=_e.plugins[n]??={},i=w(t.plugins[n])?t.plugins[n]:{};for(let a of new Set([...Object.keys(r),...Object.keys(i)]))or.has(Zi(n,a))||JSON.stringify(r[a])===JSON.stringify(i[a])||(i[a]===void 0?delete r[a]:r[a]=i[a],o.push([n,a]))}for(let[n,r]of o)for(let i of ko)i(n,r)}function Xc(){Ct&&(clearTimeout(Ct),Xi())}var Oe=(e,t)=>_e.plugins[e]?.[t];function Re(e,t,o){let n=_e.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,or.add(Zi(e,t)),clearTimeout(Ct),Ct=setTimeout(Xi,jc);for(let r of ko)r(e,t)}function et(e){return ko.add(e),()=>void ko.delete(e)}function nr(e){return e.type==="component"?void 0:e.default}function p(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>Oe(t.pluginName,n)??(e[n]&&nr(e[n])),set:(o,n,r)=>(Re(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&Oe(t.pluginName,o)!==void 0&&Re(t.pluginName,o)}};return t}var $i=e=>{let t=()=>{let o=Oe("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();Re("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},Bo=$i("pinnedPlugins"),Io=$i("starredPlugins");addEventListener("pagehide",Xc);Wi(tr,Zc);var Oo=new x("PluginManager"),Pe=new Map,Mt=new Set,_i=new Set,rr=new Set;function ea(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),Pe.set(t.name,t)}var Lt=e=>!!e.required||(Oe(e.name,"enabled")??!!e.enabledByDefault);var ir=e=>`plugin-${e.name}`;function ta(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?Eo(ir(e),t):Xn(ir(e))}function oa(e){if(!Mt.has(e.name))try{ta(e),e.start?.(),Mt.add(e.name)}catch(t){Oo.error(`Failed to start ${e.name}`,t)}}function $c(e){if(Mt.delete(e.name)){Xn(ir(e));try{e.stop?.()}catch(t){Oo.error(`Failed to stop ${e.name}`,t)}}}var na=e=>e.startAt??"HostReady";function Ro(e){_i.add(e);for(let t of Pe.values())na(t)===e&&Lt(t)&&oa(t);Oo.info(`${e}: ${[...Mt].join(", ")}`)}function ra(e,t){Re(e.name,"enabled",t),t?_i.has(na(e))&&oa(e):$c(e);for(let o of rr)o()}function ia(e){return rr.add(e),()=>void rr.delete(e)}et((e,t)=>{let o=Pe.get(e);if(!(!o||t==="enabled"||!Mt.has(e)))try{ta(o),o.onSettingsChange?.(t)}catch(n){Oo.error(`Settings change failed for ${e}`,n)}});var aa=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

html {
    --bloom-fg: var(--color-text-primary, var(--text-primary, #0d0d0d));
    --bloom-fg-2: var(--color-text-secondary, var(--text-secondary, #5d5d5d));
    --bloom-fg-3: var(--color-text-tertiary, var(--text-tertiary, #8f8f8f));
    --bloom-border: var(--color-token-border-default, var(--border-medium, #0000001a));
    --bloom-border-light: var(--color-token-border-light, var(--border-light, #0000000d));
    --bloom-hover: var(--color-token-list-hover-background, #0000000d);
    --bloom-accent: var(--color-chart-blue, #3a83f7);
    --bloom-surface: #fff;
    --bloom-surface-2: #f3f3f3;
    --bloom-input: #fafafa;
    --bloom-card: #fff;
    --bloom-shadow: 0 1rem 3rem #00000026, 0 0 0 1px #0000000d;
    --bloom-danger: #ef4444;
}

:is(.dark, [data-theme="dark"]) {
    --bloom-fg: var(--color-text-primary, var(--text-primary, #ededed));
    --bloom-fg-2: var(--color-text-secondary, var(--text-secondary, #cdcdcd));
    --bloom-fg-3: var(--color-text-tertiary, var(--text-tertiary, #afafaf));
    --bloom-border: var(--color-token-border-default, var(--border-medium, #ffffff26));
    --bloom-border-light: var(--color-token-border-light, var(--border-light, #ffffff0d));
    --bloom-hover: var(--color-token-list-hover-background, #ffffff1a);
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

[data-bloom-text] {
    font-size: 0 !important;
}

[data-bloom-text] > * {
    display: none !important;
}

[data-bloom-text]::before {
    content: attr(data-bloom-text);
    font-size: var(--bloom-text-size, 1rem);
    white-space: pre-wrap;
}
`;var eu=new x("Dom");function s(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var sa=document.createElement("template");function la(e){return sa.innerHTML=e.trim(),sa.content.firstElementChild.cloneNode(!0)}var Bt=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),W=(e,t=document)=>[...t.querySelectorAll(e)].find(Bt)??null,tu=16,ou="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function ca(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([ou],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function It(e){document.hidden?setTimeout(e,tu):requestAnimationFrame(e)}function tt(e){let t=!1;return()=>{t||(t=!0,It(()=>{t=!1;try{e()}catch(o){eu.error("Scheduled task failed",o)}}))}}var Po=new Set,Do=[],kt,nu=tt(()=>{let e=Do;Do=[];for(let t of Po)t(e)});function C(e){return Po.add(e),kt||(kt=new MutationObserver(t=>{Do.push(...t),nu()}),kt.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{Po.delete(e),!Po.size&&(kt?.disconnect(),kt=void 0,Do=[])}}var ru=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),I=e=>!e.length||e.some(t=>!ru(t.target));function De(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size");return}e.getAttribute("data-bloom-text")!==t&&(e.hasAttribute("data-bloom-text")||e.style.setProperty("--bloom-text-size",getComputedStyle(e).fontSize),e.setAttribute("data-bloom-text",t))}var iu=new x("Events");function Ho(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){iu.error(`Listener for ${String(t)} failed`,r)}}}}var u={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",modelTrigger:'[data-testid="model-switcher-dropdown-button"], button[aria-label="Model selector" i]',modelItem:'[role="menu"] [data-testid^="model-switcher-"], [role="menuitem"][data-testid^="model-switcher-"]',homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]'};var ua=/[​-‍﻿]/g,xe=()=>W(u.composerInput),we=e=>e instanceof HTMLElement&&e.matches(u.composerInput),F=(e=xe())=>e?.closest("form")??document.querySelector(u.oldComposerForm);function M(e=xe()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(ua,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(ua,"").trim()}var au=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function ee(e,t=xe()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return au?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function da(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:a,value:l}=e;return{first:!l.slice(0,i).includes(`
`),last:!l.slice(a).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var ma=e=>{let t=F();return(t&&W(e,t))??W(e)},ot=()=>ma(u.stopButton),su=()=>{let e=ma(u.sendButton);return e&&!e.matches(u.stopButton)?e:null};function No(){let e=su();if(e){e.disabled||e.click();return}xe()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var fa=()=>Bt(ot());var ha=new x("Network"),lu=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,cu=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,Go=1e3,uu=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),Y=Ho(),ar=new Map,pa=new Map,du=1,te=e=>e?ar.get(e)??null:null;function Uo(e){let t=ar.get(e);return t||ar.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var ba=e=>e==="user"||e==="assistant";function Aa(e){let t=e.author?.role;if(!e.id||!ba(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(c=>typeof c=="string").join(`
`).trim(),i=n.filter(c=>w(c)&&c.content_type==="image_asset_pointer").length,a=e.metadata?.attachments,l=Array.isArray(a)&&a.length>0;return!r&&!i&&!l?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*Go:null,text:r,hasFiles:l,imageCount:i}}var ya=e=>e.filter((t,o)=>t.role==="user"||e[o+1]?.role!=="assistant"),sr=e=>e.map(t=>t.createTime).filter(t=>t!=null);function mu(e,t){let o=sr(e),n=sr(t);return!o.length||!n.length?!1:Math.max(...o)<Math.min(...n)}function fu(e){let t=sr(e);if(t.length<2)return e;let[o]=t,n=o-e.length;return e.map((i,a)=>(i.createTime!=null&&(n=i.createTime),{message:i,index:a,time:i.createTime??n})).toSorted((i,a)=>i.time-a.time||i.index-a.index).map(i=>i.message)}function pu(e,t){let o=t.filter(w).map(l=>w(l.message)?l.message:l);for(let l of o)l.id&&l.create_time&&e.times.set(l.id,l.create_time*Go);let n=o.map(Aa).filter(l=>l!=null),r=new Set(n.map(l=>l.id)),i=e.chain.filter(l=>!r.has(l.id)),a=mu(n,i)?[...n,...i]:[...i,...n];return e.chain=ya(fu(a)),e}function gu(e,t){if(!w(t)||!(w(t.mapping)||Array.isArray(t.messages)))return null;let o=Uo(e);if(typeof t.title=="string"&&t.title&&(o.title=t.title),Array.isArray(t.messages))return pu(o,t.messages);let n=t.mapping;for(let l of Object.values(n)){let c=l.message?.create_time;l.message?.id&&c&&o.times.set(l.message.id,c*Go)}let r=[],i=new Set,a=typeof t.current_node=="string"?t.current_node:null;for(;a&&!i.has(a)&&n[a];){i.add(a);let l=n[a].message,c=l?Aa(l):null;c&&r.push(c),a=n[a].parent??null}return r.length&&(o.chain=ya(r.toReversed())),o}function hu(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}function bu(e){if(typeof e?.body!="string")return null;let t=Se(e.body);return w(t)&&typeof t.conversation_id=="string"?t.conversation_id:null}function Au(e,t){if(!w(e))return;typeof e.type=="string"&&uu.has(e.type)&&(t.handoff=!0);let o=w(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(Uo(e.conversation_id).title=e.title,Y.emit("conversation",Uo(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&ba(n.author?.role)){let r=n.create_time*Go;t.conversationId&&Uo(t.conversationId).times.set(n.id,r),Y.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function yu(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:a}=await o.read();if(i)break;r+=n.decode(a,{stream:!0});let l=r.split(`
`);r=l.pop()??"";for(let c of l){if(!c.startsWith("data:"))continue;let d=c.slice(5).trim();d&&d!=="[DONE]"&&Au(Se(d),t)}}}async function vu(e,t,o){let n={conversationId:t,error:!1,handoff:!1};pa.set(e,t),Y.emit("generate-start",{requestId:e,conversationId:t});try{let r=await o;r.ok?r.headers.get("content-type")?.includes("event-stream")&&await yu(r.clone(),n):n.error=!0}catch(r){let i=r instanceof DOMException&&r.name==="AbortError";n.handoff||=i,n.error||=!i}finally{pa.delete(e),Y.emit("generate-end",{requestId:e,...n})}}async function qu(e,t){try{let o=await t;if(!o.ok)return;let n=gu(e,await o.clone().json());n&&Y.emit("conversation",n)}catch(o){ha.debug("Conversation read skipped",o)}}function Su(e,t,o){let n=hu(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&lu.test(n.pathname)){vu(du++,bu(t),o);return}let i=r==="GET"&&n.pathname.match(cu)?.[1];i&&qu(i,o)}var ga=!1;function va(){if(ga)return;ga=!0;let e=$.fetch,t=function(o,n){let r=e.call(this??$,o,n);try{Su(o,n,r)}catch(i){ha.error("Fetch tap failed",i)}return r};$.fetch=typeof exportFunction=="function"?exportFunction(t,$):t}var xu="__reactContainer$",qa="__reactFiber$";function Fo(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var lr=(e,t)=>Object.keys(e.wrappedJSObject??e).some(o=>o.startsWith(t)),oe=e=>!lr(document,xu)||lr(e,qa);function Ot(){return document.body?Promise.resolve():new Promise(e=>{let t=new MutationObserver(()=>{document.body&&(t.disconnect(),e())});t.observe(document,{childList:!0,subtree:!0})})}async function Sa(){await Ot();let e=Date.now()+8e3;for(;!lr(document.body,qa)&&Date.now()<e;)await new Promise(t=>setTimeout(t,100))}var wu=new x("Route"),xa=/\/c\/(?!local-)([\w-]+)/,Eu=500,ne=e=>{try{return new URL(e,location.origin).pathname.match(xa)?.[1]??null}catch{return null}},b=()=>location.pathname.match(xa)?.[1]??null,jo=()=>location.pathname==="/",Tu=/^\/g\/g-p-[^/]+(?:\/project)?\/?$/,wa=()=>Tu.test(location.pathname),ae=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",Qo=new Set,Ko=location.href,ur=b(),Yo;function cr(){if(location.href===Ko)return;let e={prevHref:Ko,href:location.href,prevId:ur,id:b()};Ko=e.href,ur=e.id;for(let t of Qo)try{t(e)}catch(o){wu.error("Route listener failed",o)}}function Cu(){let e=new AbortController,{navigation:t}=$;t?.addEventListener("currententrychange",()=>queueMicrotask(cr),{signal:e.signal}),addEventListener("popstate",cr,{signal:e.signal});let o=setInterval(cr,Eu);return()=>{e.abort(),clearInterval(o)}}function se(e){return Qo.add(e),Yo||(Ko=location.href,ur=b(),Yo=Cu()),()=>{Qo.delete(e),!Qo.size&&(Yo?.(),Yo=void 0)}}var Mu=["data-turn","data-message-author-role"],Lu=/:(user|assistant)$/,dr=`${u.messageUnit}, ${u.oldMessage}`,mr=e=>e==="user"||e==="assistant",Ma=()=>!!document.querySelector(u.timelineScroll),nt=()=>Ma()?W(u.timelineScroll):document;function Pt(){if(Ma())return W(u.timelineScroll);let e=document.querySelector(u.turn);for(let t=e?.parentElement;t;t=t.parentElement){let{overflowY:o}=getComputedStyle(t);if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight)return t}return document.scrollingElement}var rt=e=>e.getAttribute("data-chatgpt-search-unit-key")?.match(Lu)?.[1]??null,La=e=>[...e.querySelectorAll(u.searchUnit)].filter(t=>rt(t)&&!t.parentElement?.closest(u.searchUnit)),Ea=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function Rt(e){let t=Ea(e);return t.length?t:[...new Set([...e.querySelectorAll(dr)].flatMap(Ea))]}function Dt(e=nt()){if(!e)return[];let t=La(e);return t.length?t:[...e.querySelectorAll(dr)].filter(o=>!o.parentElement?.closest(dr))}function ku(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function Bu(e){for(let t of Mu){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(mr(o))return o}return e.querySelector(u.markdown)||e.querySelector(u.generatedImage)?"assistant":null}var Iu=e=>!e.parentElement?.closest(u.turn);function zo(){let e=te(b())?.chain??[];return[...nt()?.querySelectorAll(u.turn)??[]].filter(Iu).flatMap(o=>{let n=La(o),r=n.length?n.map(i=>({el:i,known:rt(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=d=>!n.some(m=>m.contains(d))&&h(d.textContent??""),a=[...o.querySelectorAll(u.assistantMarkdown)].find(d=>i(d)&&!Wo.test(h(d.textContent??""))),l=[...o.querySelectorAll(u.activityHeader)].findLast(i),c=a??l;c&&r.push({el:c,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?Rt(o):Dt(o).flatMap(Rt),a=n??Bu(o)??ku(i,e)??(r%2?"assistant":"user"),l=o.closest(u.turn)??o,c=!o.closest(u.searchUnit)&&!!l.querySelector(u.turnBusy),d=a==="assistant"&&(o.matches(u.turnBusy)||!!o.querySelector(u.turnBusy)||c);return{el:o,role:a,messageIds:i,streaming:d}})}var Ou="[data-bloom], .sr-only",ka=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,Wo=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,Ta=new WeakMap;function Jo(e){let o=(e.el.closest(u.turn)??e.el).textContent?.length??0,n=Ta.get(e.el);if(n?.length===o)return n.summary;let r=Ru(e);return Ta.set(e.el,{length:o,summary:r}),r}function Ca(e){let t=new Set,o=[];for(let n of e.querySelectorAll(u.assistantMarkdown)){if(n.closest(u.searchUnit))continue;let r=h(n.textContent??"");!r||Wo.test(r)||ka.test(r)||t.has(r)||(t.add(r),o.push(r))}return o}function Ru(e){let t=e.el.querySelectorAll(u.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.closest(u.turn);if(e.role==="assistant"&&o&&e.el.matches(u.assistantMarkdown)&&!e.el.closest(u.searchUnit)){let c=Ca(o);if(c.length)return c.join(" \xB7 ")}let n=e.el.querySelector(e.role==="assistant"?u.markdown:".whitespace-pre-wrap")??e.el,i=[...n.querySelectorAll(Ou)].map(c=>h(c.textContent??"")).filter(Boolean).reduce((c,d)=>c.replace(d,`
`),n.innerText||n.textContent||""),a=i.split(`
`).map(h).filter(c=>c&&!ka.test(c)&&!Wo.test(c));if(a.length)return a.join(" ");if(e.role==="assistant"&&o){let c=Ca(o);if(c.length)return c.join(" \xB7 ")}let l=i.split(`
`).map(h).filter(c=>Wo.test(c));return l.length?l.at(-1)??"":e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function Vo(e){return e.text?h(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var Ba=e=>e.matches(u.timelineScroll)&&getComputedStyle(e).flexDirection==="column-reverse";var Pu=250,Du=400,Hu=6e4,Nu=5e3,Uu=`:is(${u.turn}) :is(${u.turnBusy})`,v=Ho(),$o=new Set,fr=new Set,Ee=!1,Oa=0,it=null,at=!1,Zo=!1,Ht=0,_o=!1,Nt=null,Ia=!1,k=()=>({generating:Ee,conversationId:b()}),Ra=()=>fa()||!!nt()?.querySelector(Uu);function Gu(){let e=Ra();return e?Zo||(Ht=0,_o=!0):Zo=!1,[...$o].some(t=>!fr.has(t))||e&&!Zo||Date.now()<Ht}function Fu(){return Nt?.error?"error":at?"stopped":"done"}function Yu(){it=null,Ee=!1,_o=!1,v.emit("fall",{conversationId:b(),outcome:Fu()}),at=!1,Nt=null}function Pa(){let e=Gu();e&&!Ee&&(Ee=!0,Oa=Date.now(),at=!1,Nt=null,v.emit("rise",{conversationId:b()})),e||!Ee?it=null:it==null?it=Date.now():Date.now()-it>=Du&&Yu()}function Xo(){Pa(),v.emit("tick",k())}function Qu({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(Ee||Date.now()-Oa<Hu);if(!o&&Ee){for(let n of $o)fr.add(n);Zo=Ra(),Ht=0,_o=!1,it=null,Ee=!1,at=!1,Nt=null,v.emit("fall",{conversationId:e,outcome:"left"})}v.emit("context",{prevId:e,id:t,migrated:o}),Xo()}function Ku(e){e.target instanceof Element&&e.target.closest(u.stopButton)&&(at=!0,Ht=0)}function Da(){Ia||(Ia=!0,Y.on("generate-start",({requestId:e})=>{$o.add(e),Xo()}),Y.on("generate-end",e=>{$o.delete(e.requestId),!fr.delete(e.requestId)&&(Nt=e,Ht=e.handoff&&!e.error&&!at&&!_o?Date.now()+Nu:0,Xo())}),se(Qu),document.addEventListener("click",Ku,!0),ca(Xo,Pu),Fo().then(()=>C(Pa)))}var Ha={BetterNavigator:1791041596e3,BetterQuotes:1791042892e3,ChatListStatus:1791034734e3,ChatStateFavicons:1791034734e3,Cleaner:1791034734e3,ComposerOpacity:1791037311e3,Continue:1791034734e3,CustomSidebarIdentity:1791034734e3,GreetingCustomizer:1791037311e3,InputHistory:1791034734e3,MessageTimestamps:1791034734e3,NoDictation:1791034734e3,NoShareLink:1791034734e3,NoSidebarIdentity:1791034734e3,PromptQueue:1791041596e3,RecentTopics:1791034734e3,ResponseNotification:1791034734e3,Settings:1791039171e3,SidebarIdentityOpacity:1791034734e3,StarChats:1791040514e3,StreamerMode:1791034734e3,TemporaryChat:1791042892e3,UserQuotes:1791042892e3,WiderChat:1791034734e3};var A=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,ju="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",Wu={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${ju}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:A('<path d="M18 6 6 18M6 6l12 12"/>'),gear:A('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:A('<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>'),pin:A('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:A('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:A('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:A('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:A('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:A('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:A('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:A('<path d="m6 9 6 6 6-6"/>'),play:A('<path d="M7 4v16l13-8z"/>'),plus:A('<path d="M12 5v14M5 12h14"/>'),check:A('<path d="m5 12 5 5 9-10"/>'),alert:A('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:A('<path d="M4 5h16v11H9l-5 4z"/>'),layout:A('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:A('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:A('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:A('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:A('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:A('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:A('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:A('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:A('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:A('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:A('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:A('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:A('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:A('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:A('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:A('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),ghost:A('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},D=e=>la(Wu[e]);var me="data-bloom-tip",pr=6,gr=8,He,Na=null;function st(e){if(e===Na)return;if(Na=e,!e){He?.remove();return}He??=s("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),He.textContent=e.getAttribute(me),document.body.append(He);let t=e.getBoundingClientRect(),{width:o,height:n}=He.getBoundingClientRect(),r=t.bottom+pr+n<=innerHeight-gr;He.style.left=`${ve(t.left+t.width/2-o/2,gr,innerWidth-o-gr)}px`,He.style.top=`${r?t.bottom+pr:t.top-pr-n}px`}var Ua=e=>e instanceof Element?e.closest(`[${me}]`):null;function Ga(){let e=new AbortController,t={passive:!0,signal:e.signal};return document.addEventListener("pointerover",o=>st(Ua(o.target)),t),document.addEventListener("pointerout",o=>o.relatedTarget||st(null),t),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&st(Ua(o.target)),t),document.addEventListener("focusout",()=>st(null),t),document.addEventListener("pointerdown",()=>st(null),t),()=>{e.abort(),st(null)}}function hr(e,t,o,n=!1){let r=s("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let a=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(a)),t(a)}),r}function N(e,t,o){return s("button",{class:To("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button","data-bloom":"control"},on:{click:t}})}function z(e,t,o,n){let r=s("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":t,"data-bloom":"control",[me]:t},on:{click:o}},D(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function en(e,t,o,n,r,i){let a=s("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});a.value=String(e);let l=s("output",{text:`${a.value}${r}`});return a.addEventListener("input",()=>{l.textContent=`${a.value}${r}`,i(Number(a.value))}),s("div",{class:"bloom-slider"},a,l)}function br(e,t,o){let n=s("select",{class:"bloom-select"},...t.map(r=>s("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function Ut(e,t,o="",n="text"){let r=s("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var zu=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,Fa=/\S+@\S+\.\S+/,Ju=3,Vu=/^\/g\/(g-p-[^/]+)\//,Zu=/^g-p-[0-9a-f]+-?/i,Ya=e=>!!e.closest(".sr-only"),Ar=e=>!!e?.querySelector(u.menuButton);function Qa(){return[...document.querySelectorAll(u.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(Ar)).filter(e=>e!=null)}function Ka(){let e=[...document.querySelectorAll(u.oldProfile)];if(e.length)return e.map(o=>{let n=o.parentElement?.children.length===1?o.parentElement:o;return{kind:"profile",anchor:n,insert:r=>n.before(r)}});let t=Qa().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(u.rail)){let n=[...o.children].find(Ar);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}var yr=e=>!e.closest("[data-bloom]")&&(!!e.querySelector("img, [class*=rounded-full]")||Ja(e).some(t=>!Ya(t))),ja=e=>[...e.parentElement?.children??[]].find(t=>t!==e&&t instanceof HTMLElement&&yr(t))??null;function Wa(){let e=[...document.querySelectorAll(u.oldProfile)];return e.length?e:[...Qa(),...[...document.querySelectorAll(u.rail)].map(o=>[...o.children].findLast(Ar))].map(o=>[...o?.querySelectorAll(u.menuButton)??[]].findLast(n=>yr(n)||ja(n))).filter(o=>o!=null)}var za=()=>Wa().map(e=>yr(e)?e:ja(e)).filter(e=>e!=null);function Ja(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!h(t.textContent??"")&&!(t instanceof SVGElement))}var Xu=e=>{if(/rounded-full/.test(e.getAttribute("class")??""))return!0;if(!e.clientWidth)return!1;let{borderRadius:t}=getComputedStyle(e);return t.includes("%")||Number.parseFloat(t)>=e.clientWidth/2};function tn(e,t,o){for(let n of e.querySelectorAll(`[${t}]`))n!==o&&n.removeAttribute(t);o&&!o.hasAttribute(t)&&o.setAttribute(t,"")}function $u(e,t){if(h(e.textContent??"").length>Ju)return null;let o=e.closest("button");for(let n=e;n&&n!==t&&n!==o;n=n.parentElement)if(Xu(n))return n;return null}function vr(e,t){e.hasAttribute(`data-bloom-${t}`)||e.setAttribute(`data-bloom-${t}`,"");let o=e.querySelector("img:not([data-bloom] img)"),n=Ja(e),r=o?null:n.map(m=>$u(m,e)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),a=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");tn(e,`data-bloom-${t}-avatar`,a);let l=n.filter(m=>!a?.contains(m)&&!Ya(m)),c=l.find(m=>zu.test(h(m.textContent??""))),d=l.find(m=>Fa.test(m.textContent??""));tn(e,`data-bloom-${t}-plan`,c),tn(e,`data-bloom-${t}-email`,d),tn(e,`data-bloom-${t}-name`,l.find(m=>m!==c&&m!==d))}function _u(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function on(){return Wa().map(_u).find(e=>e!=null)??[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&(Fa.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var Gt=e=>[...document.querySelectorAll(u.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&ne(t.href)===e);function Va(e){let t=Gt(e).find(o=>h(o.textContent??""));return t?h(t.textContent??""):null}function Za(e){let t=new URL(e,location.origin).pathname.match(Vu)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!ne(n.href)&&h(n.textContent??""));return o?h(o.textContent??""):t.replace(Zu,"").replaceAll("-"," ")||null}var qr=0,nn;function ed(e){if(!I(e))return;for(let o of za())vr(o,"profile");let t=on();t&&vr(t,"menu")}function le(){qr++;let e=!0;return Ot().then(()=>{e&&qr&&!nn&&(nn=C(ed))}),()=>{e&&(e=!1,!--qr&&(nn?.(),nn=void 0))}}var td=new x("SettingsPanel"),g=E("bloom-settings-"),od=10080*60*1e3,nd=3e3,Xa="Toggle features. Some need a reload. Click the sliders icon to configure.",rd=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],id=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],ad={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},_a=new Set(["chat","ui","privacy"]),Q=null,Ue="all",Sr="all",rn="",xr=[],es=()=>[...Pe.values()].filter(e=>!e.hidden),sd=e=>!!e.updatedAt&&Date.now()-e.updatedAt<od;function ld(e){switch(Ue){case"favorites":return Io.has(e.name);case"recent":return sd(e);case"all":return!0;case"other":return!e.tags.some(t=>_a.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(Ue)}}function cd(e){switch(Sr){case"all":return!0;case"enabled":return Lt(e);case"disabled":return!Lt(e)}}function ud(e){let t=rn.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function dd(e){let t=Bo.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return Ue==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var ts=e=>e.settings?.def??{},md=e=>Object.values(ts(e)).some(t=>t.type!=="custom");function fd(e,t,o){let n=Oe(e.name,t)??nr(o),r=i=>Re(e.name,t,i);switch(o.type){case"boolean":return hr(n,r,o.description??t);case"slider":return en(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return br(n,o.options,r);case"string":return Ut(n,r,o.placeholder);case"number":return Ut(String(n),i=>r(Number(i)),"","number");case"component":{let i=s("div",{class:g("component")});return xr.push(o.render(i)),i}case"custom":return null}}var pd=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function os(e){if(!Q)return;let t=Object.entries(ts(e)).filter(([,i])=>i.type!=="custom").map(([i,a])=>{let l=fd(e,i,a),c=a.type==="boolean",d=a.type!=="component"&&s("div",{class:g("field-label"),text:pd(i)}),m=a.description&&s("div",{class:g("field-desc"),text:a.description});return s("div",{class:g("field",c?"field-inline":"field-stacked")},(d||m)&&s("div",{class:g("field-text")},d,m),l)}),o,n=N("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},nd);return}clearTimeout(o),e.settings?.reset(),Ft(),os(e)},"danger"),r=s("div",{class:g("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&Ft()}},s("div",{class:g("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},s("div",{class:g("popup-header")},s("div",{class:g("card-icon")},D(e.icon)),s("div",{class:g("popup-title")},s("div",{class:g("card-name"),text:e.name}),s("div",{class:g("popup-authors"),text:e.authors.join(", ")})),z("close","Close",Ft)),s("p",{class:g("popup-desc"),text:e.description}),s("div",{class:g("fields")},...t),s("div",{class:g("popup-footer")},n)));Q.querySelector(`.${g("modal")}`)?.append(r)}function Ft(){for(let e of xr)e();xr=[],Q?.querySelector(`.${g("popup-backdrop")}`)?.remove()}function $a(e){let t=Lt(e),o=Io.has(e.name),n=Bo.has(e.name),r=!!e.required;return s("div",{class:[g("card",t?"card-on":"card-off"),r?g("card-required"):""].filter(Boolean).join(" ")},s("div",{class:g("card-top")},s("div",{class:g("card-icon")},D(e.icon)),s("div",{class:g("card-actions")},z("star",o?"Unstar":"Star",()=>{Io.toggle(e.name),Ne()},o),r?null:z("pin",n?"Unpin":"Pin to top",()=>{Bo.toggle(e.name),Ne()},n),r?s("span",{class:g("required-mark"),attrs:{"aria-label":"Required",[me]:"This plugin is required for Bloom++ to work"}},D("alert")):null,md(e)&&z("gear","Settings",()=>os(e)),hr(t,i=>ra(e,i),r?`${e.name} is required`:`Enable ${e.name}`,r))),s("div",{class:g("card-name"),text:e.name}),s("div",{class:g("card-desc"),text:e.description,title:e.description}),s("div",{class:g("card-footer"),text:e.authors.join(", ")}))}function ns(){let e=es().some(o=>!o.tags.some(n=>_a.has(n)));Q?.querySelector(`.${g("tabs")}`)?.replaceChildren(...rd.filter(o=>o.id!=="other"||e).map(o=>s("button",{class:g("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===Ue)},on:{click:()=>{Ue=o.id,ns(),Ne()}}})))}function Ne(){if(!Q)return;let e=es().filter(ld),t=Q.querySelector(`.${g("search")} input`);t&&(t.placeholder=`Search ${wo(e.length,"plugin")}...`);let o=dd(e.filter(d=>ud(d)&&cd(d))),n=Ue==="all",r=n?o.filter(d=>!d.required):o,i=n?o.filter(d=>d.required):[],a=[...r.map($a),...i.length?[s("div",{class:g("required-break"),attrs:{role:"separator"}}),...i.map($a)]:[]],l=rn.trim()?"No plugins match your search.":ad[Ue]??"No plugins available.";Q.querySelector(`.${g("grid")}`)?.replaceChildren(...a.length?a:[s("div",{class:g("empty"),text:l})])}function gd(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),Q?.querySelector(`.${g("popup-backdrop")}`)?Ft():lt())}var rs,wr;function hd(){if(Q)return;let e=s("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=rn,e.addEventListener("input",()=>{rn=e.value,Ne()}),Q=s("div",{class:`bloom-root ${g("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&lt()}},s("div",{class:g("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},s("div",{class:g("header")},s("div",{class:g("logo")},D("bloom")),s("h2",{class:g("title"),text:"Bloom++"}),s("span",{class:g("hint"),attrs:{"aria-label":Xa,tabindex:"0",[me]:Xa}},D("info")),s("span",{class:g("version"),text:"v2.0.58"}),z("close","Close",lt)),s("div",{class:g("tabs"),attrs:{role:"tablist"}}),s("div",{class:g("toolbar")},s("label",{class:g("search")},D("search"),e),br(Sr,id,t=>{Sr=t,Ne()})),s("div",{class:g("grid")}))),Q.addEventListener("keydown",t=>t.stopPropagation()),wr=new AbortController,document.addEventListener("keydown",gd,{capture:!0,signal:wr.signal}),document.body.append(Q),ns(),Ne(),rs=ia(Ne),e.focus(),td.debug("Opened")}function lt(){Ft(),wr?.abort(),rs?.(),Q?.remove(),Q=null}var an=()=>Q?lt():hd();var is=`/*
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
`;var Te=E("bloom-entry-"),Ad=4,Er="--bloom-entry-x",Tr=1,ct=p({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar. The account menu and the userscript menu always open the panel.",default:!1},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:!0},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:e=>(e.append(N("Reset position",()=>{ct.store.entryPosition=Tr})),()=>e.replaceChildren())},entryPosition:{type:"custom",default:Tr}}),Ge=new Map,as=!1,ss=[];function yd(e,t,o){let n=e.currentTarget,r=t.clientWidth-n.offsetWidth;if(e.button!==0||r<=0||!t.classList.contains(Te("hover")))return;let i=ct.store.entryPosition,a=i,l=!1,c=new AbortController;n.setPointerCapture(e.pointerId),n.addEventListener("pointermove",m=>{!l&&Math.abs(m.clientX-e.clientX)<Ad||(l=!0,o(),a=ve(i+(m.clientX-e.clientX)/r,0,Tr),t.style.setProperty(Er,String(a)))},{signal:c.signal});let d=()=>{c.abort(),l&&(ct.store.entryPosition=a,t.style.removeProperty(Er))};n.addEventListener("pointerup",d,{signal:c.signal}),n.addEventListener("lostpointercapture",d,{signal:c.signal})}function vd(e){let t=!1,o=s("button",{class:Te("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),t||an(),t=!1},pointerdown:r=>{t=!1,e!=="rail"&&yd(r,n,()=>{t=!0})}}},D("bloom"),e!=="rail"&&s("span",{class:Te("label"),text:"Bloom++"})),n=s("div",{class:`bloom-root ${Te("wrap")} ${Te(e)}`,attrs:{"data-bloom":"entry"}},o);return n}function qd(e){let t=s("div",{class:`bloom-root ${Te("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),an()}}},D("bloom"),s("span",{text:"Bloom++"})),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function ls(){let{showSidebarEntry:e,showSidebarEntryOnHover:t}=ct.store,o=e||t?Ka():[];for(let[r,i]of Ge)r.isConnected&&o.some(a=>a.anchor===r)||(i.remove(),Ge.delete(r));for(let r of o){let i=Ge.get(r.anchor);if(i?.isConnected||!oe(r.anchor))continue;let a=i??vd(r.kind);Ge.set(r.anchor,a),r.insert(a)}for(let r of Ge.values())r.classList.toggle(Te("hover"),!e);let n=on();n&&!n.querySelector('[data-bloom="menu-entry"]')&&qd(n)}var cs=f({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:ct,styles:()=>`${is}.${Te("hover")}{${Er}:${ct.store.entryPosition}}`,start(){ss=[C(ls),Ga(),le()],!as&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",an),as=!0)},stop(){for(let e of ss)e();for(let e of Ge.values())e.remove();Ge.clear(),lt()},onSettingsChange:ls});var us=`/*
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

.bloom-nav-root:hover .bloom-nav-toc {
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
`;var B=E("bloom-nav-"),cn=80,xd=1200,wd=2,ds=3e4,Ed=200,Td=.9,Cd=.3,Md=12,Ld={user:"\u2753",assistant:"\u{1F916}"},kd=["wheel","touchmove","pointerdown"],un=p({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),O=null,H=[],Ye=-1,Qe=-1,ut=null,sn="",Mr=0,ms=[],jt=null,ln=null,Fe,Yt,Lr="",Qt=[],Bd=e=>un.store.showAssistant||e.role==="user",Id=e=>e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.messageIds[0]||e.role;function Od(e){return{role:e.role,summary:Jo(e),ids:e.messageIds,turn:e,streaming:e.streaming}}function bs(e,t){let o=e.entries.at(-1);if(o?.role==="assistant"&&t.role==="assistant"){e.entries[e.entries.length-1]={...t,ids:[...new Set([...o.ids,...t.ids])]};return}e.entries.push(t)}function Rd(){let e=[];for(let t of zo()){let o=Od(t),n=Id(t),r=e.at(-1);r?.key===n?bs(r,o):e.push({key:n,entries:[o]})}return e}function Pd(){let e=[];for(let t of te(b())?.chain??[]){let o={role:t.role,summary:Vo(t),ids:[t.id],turn:null,streaming:!1},n=e.at(-1);t.role==="assistant"&&n?bs(n,o):e.push({key:t.id,entries:[o]})}return e}var fs=e=>e.entries.flatMap(t=>t.ids);function kr(e,t){let o=new Set(fs(e));return fs(t).some(n=>o.has(n))}var Ke=e=>h(e.entries.find(t=>t.role==="user")?.summary??""),Cr=(e,t)=>e.filter(o=>Ke(o)===t).length,Br=e=>({...e,turn:null,streaming:!1});function Dd(e,t){let o=new Set(t.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return e.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return Br(r);let a=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return a&&a!==n.key?Br(r):r})}))}function Hd(e,t){let o=t.entries.map((n,r)=>{let i=e.entries[r];if(!i)return n;let a=[...new Set([...n.ids,...i.ids])];return{...n,ids:a,summary:n.summary||i.summary}});for(let n of e.entries.slice(o.length))o.push(Br(n));return{key:e.key,entries:o}}function As(){let e=Pt();if(!e)return!1;let t=e.clientHeight-e.scrollHeight;return e.scrollTop-t<=Math.abs(e.scrollTop)}function Nd(e,t){let o=Dd(e,t);if(!t.length)return o;if(!o.length)return t;let n=t.findIndex(c=>o.some(d=>d.key===c.key));if(n<0)return As()?t.concat(o):o.concat(t);let r=t[n]?.key,i=o.findIndex(c=>c.key===r),a=o.slice(0,i).concat(t.slice(0,n),o.slice(i)),l=a.findIndex(c=>c.key===r);for(let c=n;c<t.length;c++){let d=t[c];if(!d)continue;let m=a.findIndex(q=>q.key===d.key);if(m>=0){let q=a[m];q&&(a[m]=Hd(q,d)),l=m}else a.splice(l+1,0,d),l++}return a}function Ud(e,t){let o=0,n=0,r=0;for(let i=1-e.length;i<t.length;i++){let a=0,l=0;for(let d=0;d<e.length;d++){let m=t[d+i],q=e[d];!m||!q||(kr(q,m)?(a+=3,l++):Ke(q)&&Ke(q)===Ke(m)&&a++)}let c=As()?i<r:i>r;(a>o||a===o&&l>n||a===o&&l===n&&c)&&(o=a,n=l,r=i)}return{score:o,offset:r}}function Gd(e,t){let o=e.entries.map((n,r)=>{let i=t.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of t.entries.slice(o.length))o.push({...n,turn:null});return{key:e.key,entries:o}}function Fd(e){return e.map(t=>({key:t.key,entries:t.entries.map(o=>({...o}))}))}function Yd(e,t){if(!t.length)return e;if(!e.length)return t;let{score:o,offset:n}=Ud(e,t),r=Fd(e);if(o>0)for(let l=0;l<r.length;l++){let c=t[l+n],d=r[l];if(!c||!d)continue;let m=Ke(d),q=!!m&&m===Ke(c)&&Cr(e,m)===1&&Cr(t,m)===1;(kr(d,c)||q)&&(r[l]=Gd(d,c))}let i=[],a=[];for(let l=0;l<t.length;l++){let c=t[l];if(!c)continue;let d=Ke(c);!d||Cr(r,d)>0||r.some(m=>kr(m,c))||(o>0&&l<n?i.push(c):a.push(c))}return i.concat(r,a)}function Qd(){let e=b()??"";return e!==Lr&&(Lr=e,Qt=[]),Qt=Yd(Nd(Qt,Rd()),Pd()),Qt.flatMap(t=>t.entries).filter(Bd)}function Kd(e){for(let o of e)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!k().generating||e.some(o=>o.streaming))return;let t=e.at(-1);t&&(t.role==="assistant"||!un.store.showAssistant?t.streaming=!0:e.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function ys(){let e=Qd();return Kd(e),e}function jd(e){let t=e.getBoundingClientRect(),o=t.top+t.height*Cd,n=-1;return H.forEach((r,i)=>{let a=r.turn?.el.getBoundingClientRect();a&&a.top<=o&&(n=i)}),n===-1?H.findIndex(r=>r.turn):n}function ps(e){un.store.jumpEffect==="border"&&(e.classList.add(B("flash")),setTimeout(()=>e.classList.remove(B("flash")),xd))}function dn(e){let t=H[e],o=Pt();if(!t||!o)return;if(!t.turn&&!t.ids.length){Qe=e,Kt(),o.scrollTo({top:Ba(o)?0:o.scrollHeight});return}Qe=e,ut=e?null:{chat:b(),first:t.ids[0],until:Date.now()+ds},Kt();let n=t.turn?.el;if(n?.isConnected){let d=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:d<o.clientHeight*wd?"smooth":"auto"}),ps(n);return}let r=H.findIndex(d=>d.turn),i=r>=0&&e<r?-1:1,a=++Mr,l=Date.now()+ds,c=()=>{let d=Pt();if(a!==Mr||Date.now()>l||!d)return;H=ys();let m=H.find(j=>j.ids.some(y=>t.ids.includes(y)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),ps(m),Qe=H.findIndex(j=>j.turn?.el===m),Kt();return}let q=d.scrollTop;d.scrollBy({top:i*d.clientHeight*Td,behavior:"instant"}),d.scrollTop===q?setTimeout(c,Ed):requestAnimationFrame(c)};c()}function Wd(e,t){return s("button",{class:B("row"),attrs:{type:"button","data-index":String(t)},on:{click:()=>dn(t)}},s("span",{text:Ld[e.role]}),s("span",{class:"bloom-truncate",text:qe(e.summary||"\u2026",cn)}))}function gs(e){if(!O)return;let t=e.getBoundingClientRect(),o=F()?.getBoundingClientRect().top,r=Math.min(t.bottom,o&&o>t.top?o:t.bottom)-t.top;O.style.right=`${document.documentElement.clientWidth-t.left-e.clientLeft-e.clientWidth+Md}px`,O.style.top=`${t.top}px`,O.style.height=r>1?`${r}px`:""}function zd(){let e=Pt();if(H=ys(),!H.length||!e){O?.remove(),O=null,sn="";return}if(jt!==e){Yt?.abort(),Yt=new AbortController,e.addEventListener("scroll",tt(Kt),{passive:!0,signal:Yt.signal});for(let n of kd)e.addEventListener(n,vs,{passive:!0,signal:Yt.signal});jt=e,Fe?.disconnect(),Fe=new ResizeObserver(()=>{e.isConnected&&gs(e)}),Fe.observe(e),ln=null}let t=F();t&&t!==ln&&Fe&&(Fe.observe(t),ln=t),O??=s("div",{class:`bloom-root ${B("root")}`,attrs:{"data-bloom":"navigator"}},s("div",{class:B("rail")}),s("div",{class:B("toc")},s("div",{class:B("toc-head")}),s("div",{class:B("toc-list")}))),O.isConnected||document.body.append(O),gs(e);let o=JSON.stringify(H.map(n=>[n.role,n.ids]));o!==sn?(sn=o,Qe=-1,Vd(),ut&&Date.now()<ut.until&&ut.chat===b()&&H[0]?.ids[0]!==ut.first&&dn(0)):Jd(),Kt()}function Kt(){if(!O||!jt)return;Ye=Qe>=0?Qe:jd(jt),O.querySelectorAll(`.${B("tick")}`).forEach((t,o)=>t.classList.toggle(B("tick-current"),o===Ye)),O.querySelectorAll(`.${B("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===Ye)));let e=O.querySelector(`.${B("toc-head")}`);e&&(e.textContent=`${Ye+1} / ${H.length}`)}function Jd(){O?.querySelectorAll(`.${B("tick")}`).forEach((e,t)=>{let o=H[t],n=qe(o.summary,cn);e.title!==n&&(e.title=n),e.classList.toggle(B("tick-streaming"),o.streaming)}),O?.querySelectorAll(`.${B("row")}`).forEach(e=>{let t=e.lastElementChild,o=qe(H[Number(e.dataset.index)].summary||"\u2026",cn);t&&t.textContent!==o&&(t.textContent=o)})}function Vd(){O?.querySelector(`.${B("rail")}`)?.replaceChildren(...H.map((e,t)=>s("button",{class:To(B("tick"),B(`tick-${e.role}`),e.streaming&&B("tick-streaming"),t===Ye&&B("tick-current")),title:qe(e.summary,cn),attrs:{type:"button","aria-label":`Jump to message ${t+1}`},on:{click:()=>dn(t)}}))),O?.querySelector(`.${B("toc-list")}`)?.replaceChildren(...H.map(Wd))}var fe=tt(zd);function vs(){Qe=-1,ut=null,Mr++}var Zd=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function hs(e){if(!O||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||Zd(document.activeElement)||document.querySelector("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:Ye-1,ArrowDown:Ye+1,Home:0,End:H.length-1}[e.key];if(o==null){vs();return}o<0||o>=H.length||(e.preventDefault(),e.stopPropagation(),dn(o))}var qs=f({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:un,styles:us,start(){ms=[C(e=>I(e)&&fe()),se(fe),Y.on("conversation",fe),v.on("rise",fe),v.on("fall",fe)],addEventListener("keydown",hs,!0),addEventListener("resize",fe,{passive:!0}),fe()},stop(){for(let e of ms)e();Yt?.abort(),Fe?.disconnect(),Fe=void 0,jt=null,ln=null,removeEventListener("keydown",hs,!0),removeEventListener("resize",fe),O?.remove(),O=null,sn="",Qt=[],Lr=""},onSettingsChange:fe});var Ss=`/*
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
`;var J=E("bloom-quotes-"),Gr="BloomBetterQuotes",$d=40,Ts=8,_d=1800,Pr=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,xs=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,je=p({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),Ir,Or,dt,Rr=!1,Dr=0,mn=null,fn=null,pe=null;function Fr(){return location.pathname.match(/\/c\/(?!local-)([\w-]+)/)?.[1]??(new URLSearchParams(location.search).get("temporary-chat")==="true"?"temporary":"draft")}function gn(){try{let e=JSON.parse(sessionStorage.getItem(Gr)??"[]");return Array.isArray(e)?e.filter(t=>!!t&&typeof t=="object"&&typeof t.id=="string"&&typeof t.text=="string"&&!!t.text):[]}catch{return[]}}function Yr(e){try{sessionStorage.setItem(Gr,JSON.stringify(e.slice(-$d)))}catch{}}function Wt(e){return gn().find(t=>t.id===e)?.text??""}function em(e,t){let o=gn().filter(n=>n.id!==e);o.push({id:e,text:t}),Yr(o)}function Hr(e=Fr()){Yr(gn().filter(t=>t.id!==e)),pn()}function tm(e){let t=Wt("draft");if(!t||Wt(e))return;let o=gn().filter(n=>n.id!=="draft");o.push({id:e,text:t}),Yr(o)}function Nr(e){return`${e.getAttribute("aria-label")??""} ${e.getAttribute("title")??""}`}function om(e){let t=Nr(e);return xs.test(t)&&!/quote|引用/.test(t)?!1:/quote|引用/.test(t)&&Pr.test(t)?!0:Pr.test(t)&&!xs.test(t)}function Cs(e){let t=e.cloneNode(!0);for(let o of t.querySelectorAll("button, [role='button']"))o.remove();return h(t.textContent??"")}function nm(e){let t=F(),o=e.parentElement,n=0;for(;o&&o!==t&&n<5;){if(n++,o.matches(u.composerInput)||o.querySelector(u.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=Cs(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function hn(){let e=F();if(!e)return null;for(let t of e.querySelectorAll("button, [role='button']")){if(t.closest("[data-bloom]")||!om(t))continue;let o=nm(t),n=o?Cs(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:t}}return null}function rm(e){let t=e.closest(u.searchUnit)??e.closest(u.oldMessage);return t&&(rt(t)??t.getAttribute("data-message-author-role"))==="user"?t:null}function Qr(e){return h(e).slice(0,48)}function im(e,t){let o=Qr(e);if(o.length<Ts)return null;let n=null;for(let r of Dt()){if(t&&(r===t||t.contains(r)||r.contains(t)))continue;let i=h(r.textContent??"");if(!i.includes(o))continue;let a=o.length/Math.max(i.length,1);(!n||a>n.score)&&(n={el:r,score:a})}return n?.el??null}function am(e,t){let o=Qr(t),n=e;for(let r of e.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&h(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${J("hit")}`)?.classList.remove(J("hit")),n.classList.add(J("hit")),window.clearTimeout(Dr),Dr=window.setTimeout(()=>n.classList.remove(J("hit")),_d)}function ws(e){let t=e.closest(u.timelineScroll)??document.scrollingElement;if(!(t instanceof HTMLElement)&&t!==document.scrollingElement)return;let o=e.getBoundingClientRect();if(o.height<1||!t)return;let n=t.getBoundingClientRect(),r=F()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,a=o.top+o.height/2-(n.top+i)/2;Math.abs(a)<8||t.scrollTo({top:t.scrollTop+a,behavior:"smooth"})}function Kr(){if(!pe||!mn?.isConnected)return;let e=mn.getBoundingClientRect();e.width<1||(pe.style.top=`${Math.max(8,e.top+8)}px`,pe.style.left=`${Math.max(8,e.right-pe.offsetWidth-8)}px`)}function sm(e,t,o){mn=e,fn=t,pe??=s("button",{class:`bloom-root ${J("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),pe.isConnected||document.body.append(pe),am(e,o),Kr()}function Es(){pe?.remove(),pe=null,mn=null,fn=null,document.querySelector(`.${J("hit")}`)?.classList.remove(J("hit"))}function Ms(){return document.querySelector('[data-bloom="quote-chip"]')}function pn(){Ms()?.remove()}function lm(e){let o=F()?.getBoundingClientRect();!o||o.width<8||(e.style.width=`${Math.max(120,o.width-24)}px`,e.style.left=`${o.left+12}px`,e.style.top=`${Math.max(8,o.top-e.offsetHeight-8)}px`)}function cm(e){let t=Ms();t||(t=s("div",{class:`bloom-root ${J("chip")}`,attrs:{"data-bloom":"quote-chip"}},s("span",{class:J("text")}),s("button",{class:J("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(t));let o=t.querySelector(`.${J("text")}`),n=h(e);o&&o.textContent!==n&&(o.textContent=n),t.dataset.text=e,lm(t)}function Ur(){if(!Rr){Rr=!0;try{let e=Fr(),t=hn();je.store.persistAcrossChats&&t&&Wt(e)!==t.text&&em(e,t.text);let o=je.store.persistAcrossChats?Wt(e):"";!o||t&&h(t.text)===h(o)?pn():cm(o),Kr()}finally{Rr=!1}}}function um(e){let t=e.closest('[data-bloom="quote-chip"]');if(t instanceof HTMLElement&&!e.closest(`.${J("x")}`)){let i=t.dataset.text??t.querySelector(`.${J("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:t}:null}let o=e.closest("blockquote");if(o instanceof HTMLElement&&!e.closest("a, button")){let i=rm(o),a=h(o.textContent??"");if(i&&a)return{text:a,skip:i,origin:o}}let n=F();if(!n||!n.contains(e)||we(e)||e.closest("button, [role='button']"))return null;let r=hn();return!r||!r.row.contains(e)?null:{text:r.text,skip:null,origin:r.row}}function dm(e){let{target:t}=e;if(!(t instanceof Element))return;if(t.closest('[data-bloom="quote-back"]')){e.preventDefault(),e.stopPropagation(),fn?.isConnected&&ws(fn);return}if(t.closest(`.${J("x")}`)){e.preventDefault(),e.stopPropagation(),Hr();return}let o=hn();if(o&&(t===o.dismiss||o.dismiss.contains(t))){Hr();return}if(mm(t)&&Ls(),!je.store.jumpToPassage)return;let n=um(t);if(!n)return;let r=im(n.text,n.skip);r&&(e.preventDefault(),e.stopPropagation(),sm(r,n.origin,n.text),ws(r))}function mm(e){let t=e.closest("button, [role='button']");return!(t instanceof HTMLElement)||t.closest("[data-bloom]")||!F()?.contains(t)?!1:/send|submit|发送|提交/i.test(Nr(t))&&!Pr.test(Nr(t))}function fm(e){return!(e instanceof KeyboardEvent)||e.key!=="Enter"||e.shiftKey||e.isComposing?!1:we(e.target)}function Ls(){if(!je.store.persistAcrossChats)return;let e=Fr(),t=Wt(e);if(t){if(!hn()){let o=M(),n=Qr(t);n.length>=Ts&&!h(o).includes(n)&&ee(`> ${t}

${o}`.trim())}Hr(e)}}function pm(e){fm(e)&&Ls()}function gm(e){!e.prevId&&e.id&&tm(e.id),Ur()}var ks=f({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:je,styles:Ss,onSettingsChange(e){e==="jumpToPassage"&&!je.store.jumpToPassage&&Es(),e==="persistAcrossChats"&&!je.store.persistAcrossChats&&(sessionStorage.removeItem(Gr),pn()),Ur()},start(){dt=new AbortController,document.addEventListener("pointerdown",dm,{capture:!0,signal:dt.signal}),document.addEventListener("keydown",pm,{capture:!0,signal:dt.signal}),addEventListener("scroll",Kr,{capture:!0,passive:!0,signal:dt.signal}),Or=se(gm),Ir=C(e=>I(e)&&Ur())},stop(){dt?.abort(),dt=void 0,Or?.(),Or=void 0,Ir?.(),Ir=void 0,window.clearTimeout(Dr),Es(),pn()}});var Bs=`/*
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
`;var bm=E("bloom-cls"),Am="bloom-cls",ym=600*1e3,Wr=Ui("tab"),ft=new Map,Jt=new Map,mt=null,Is=[],vm=e=>e==="streaming"||e==="error";function qm(){let e=new Map,t=Date.now();for(let[o,n]of Jt)t-n.at>ym?Jt.delete(o):e.set(o,n.status);for(let[o,n]of ft)e.set(o,n);return e}function Sm(e){return s("span",{class:`bloom-root ${bm("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&D("alert"))}function zt(){let e=qm(),t=new Set;for(let[o,n]of e)for(let r of Gt(o)){if(!oe(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let a=Sm(n);t.add(a),r.append(a)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function bn(e,t){e&&(t?ft.set(e,t):ft.delete(e),mt?.postMessage({tab:Wr,id:e,status:t}),zt())}function xm({data:e}){!w(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===Wr||(vm(e.status)?Jt.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):Jt.delete(e.id),zt())}function jr(){for(let e of ft.keys())mt?.postMessage({tab:Wr,id:e,status:null})}var Os=f({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:Bs,start(){mt=typeof BroadcastChannel=="function"?new BroadcastChannel(Am):null,mt?.addEventListener("message",xm),addEventListener("pagehide",jr),Is=[v.on("rise",({conversationId:e})=>bn(e,"streaming")),v.on("fall",({conversationId:e,outcome:t})=>bn(e,t==="error"?"error":null)),v.on("context",({prevId:e,id:t,migrated:o})=>{o&&k().generating?bn(t,"streaming"):!o&&ft.get(e??"")==="streaming"&&bn(e,null)}),C(e=>I(e)&&zt())],b()&&zt()},stop(){for(let e of Is)e();jr(),mt?.close(),mt=null,removeEventListener("pagehide",jr),ft.clear(),Jt.clear(),zt()}});var Ps=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],vn={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},wm={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Em="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",zr=32,qn=64,Jr="#FCFCFC",Vr="#111111",Tm=14,Sn=51.5,Cm=12.5,Mm=9.75,Rs=52,Lm=10.5,km=7.75,Bm={rotate:e=>e.arc(Sn,Sn,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function An(e){let t=document.createElement("canvas");t.width=t.height=zr;let o=t.getContext("2d");return o?(o.scale(zr/qn,zr/qn),e(o),t.toDataURL("image/png")):""}function yn(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D(Em);o&&(e.strokeStyle=Vr,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function xn(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function Im(e,t){xn(e,Sn,Cm,Vr),xn(e,Sn,Mm,vn[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),Bm[t](e),e.stroke()}function Om(e,t){e.beginPath(),e.roundRect(0,0,qn,qn,Tm),e.fillStyle=t,e.fill()}var Rm=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function Ds(e,t){switch(e){case"original":return Rm(wm[t]);case"hole":return An(o=>yn(o,vn[t],!0));case"bg":return An(o=>{Om(o,vn[t]),yn(o,Jr,!1)});case"dot":return An(o=>{yn(o,Jr,!0),xn(o,Rs,Lm,Vr),xn(o,Rs,km,vn[t])});case"badge":return An(o=>{yn(o,Jr,!0),Im(o,t)})}}var Zt="bloom-chat-state-favicon",Xt="data-bloom-rel",$r="data-bloom-media",Hs="bloom-parked-icon",Pm="/favicon.ico",Us=p({style:{type:"select",description:"How the tab icon shows the chat state.",options:Ps,default:"bg"}}),Ce=null,Gs="",wn=null,Fs="",Ns=new Map,_r,Zr=[],Ys=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${Xt}]`)];function ei(){for(let e of Ys())e.id!==Zt&&(e.hasAttribute(Xt)||(Fs||=e.href,e.setAttribute(Xt,e.rel),e.setAttribute($r,e.getAttribute("media")??"")),e.rel!==Hs&&(e.rel=Hs),e.media!=="not all"&&(e.media="not all"))}function Dm(){for(let e of Ys()){let t=e.getAttribute(Xt);if(t==null)continue;e.rel=t;let o=e.getAttribute($r);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(Xt),e.removeAttribute($r)}}function Qs(){let e=document.getElementById(Zt);return e||(e=document.createElement("link"),e.id=Zt,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function Hm(e){if(e==="wait")return Fs||Pm;let t=Us.store.style,o=`${t}:${e}`,n=Ns.get(o);return n||Ns.set(o,n=Ds(t,e)),n}function Xr(e){if(e)return"rotate";let t=M();return Ce&&t&&t!==Gs&&(Ce=null),Ce==="error"?"error":Ce==="done"?"done":t?"ready":"wait"}function Vt(e,t=!1){if(e===wn&&!t)return;wn=e;let o=Qs(),n=Hm(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function Nm(){_r=new MutationObserver(()=>{ei(),document.head.lastElementChild?.id!==Zt&&Qs()}),_r.observe(document.head,{childList:!0})}var Ks=f({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"HostReady",settings:Us,start(){ei(),Vt(Xr(k().generating),!0),Nm(),Zr=[v.on("rise",()=>{Ce=null,Vt("rotate")}),v.on("fall",({outcome:e})=>{Ce=e==="done"||e==="error"?e:null,Gs=M(),Vt(Xr(!1))}),v.on("context",({migrated:e})=>{e||(Ce=null)}),v.on("tick",({generating:e})=>{ei(),Vt(Xr(e))})]},stop(){for(let e of Zr)e();Zr=[],_r?.disconnect(),document.getElementById(Zt)?.remove(),Dm(),wn=null,Ce=null},onSettingsChange(){Vt(wn??"wait",!0)}});var Um={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${u.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])']},js=p({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0}}),Ws=f({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads and notices.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:js,styles:()=>$e(Object.entries(Um).flatMap(([e,t])=>js.store[e]?t:[]))});var pt=`form:has(:is(${u.composerInput})), ${u.oldComposerForm}`,En='[class*="ComposerLayoutBody"]',ti='[class*="ComposerLayoutRoot"]',Gm='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',Fm=`:is(${pt}) ${En}, :is(${pt}):not(:has(${En})) ${ti}, :is(${pt}):not(:has(${En})):not(:has(${ti})) :is(${Gm})`,Ym='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',Qm='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',Km="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))",zs=p({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function jm(){let{opacity:e,blur:t}=zs.store;if(e>=100)return"";let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${Km} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important;-webkit-backdrop-filter:blur(${t}px)!important`;return`:is(${Ym}), :is(${pt}){${o}}:is(${Qm}){display:none!important}${Fm}{${n}}:is(${pt}):has(${En}) ${ti}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${pt}) :is(${u.composerInput}){background-color:transparent!important}`}var Js=f({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:zs,styles:jm});var Wm=1200,zm=8e3,Jm=150,Vm=20,Vs=6,ri="continue where you left",Zm=/message delivery timed out|please try again/i,Zs=/waiting for the complete answer/i,Xs=p({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:ri,placeholder:ri}}),oi=[],Cn=0,$t=!1,_t=0,ht="",Tn="",ii=0,bt=!1,eo=!1,Mn=!0,gt="",ai=0,Ln=!1,Xm=()=>Xs.store.prompt.trim()||ri;function $s(){return(W(u.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function _s(){let e=$s();return!e||Zs.test(e)||!Zm.test(e)?"":e}function $m(){let e=$s();return e&&Zs.test(e)?e:""}function _m(){let e=nt()?.querySelectorAll(u.turn),t=e?.[e.length-1];return`${t?.getAttribute("data-turn-key")??""}:${t?.textContent?.length??0}`}function el(e,t,o){if(o===Cn){if(k().generating||M()!==e||t>=Vm){bt=!1,k().generating||(ht="");return}No(),setTimeout(()=>el(e,t+1,o),Jm)}}function ef(e){let t=Cn;if(k().generating||M()&&M()!==e){bt=!1,ht="";return}ee(e),Ln=!0,It(()=>{t===Cn&&el(e,0,t)})}function tl(e){return e===ht||_t>=Vs||k().generating||M()?!1:(ht=e,_t+=1,bt=!0,ef(Xm()),!0)}function tf(){if($t||bt||eo)return;let e=Date.now(),t=_s();if(t){if(gt="",t!==Tn){Tn=t,ii=e;return}if(e-ii<Wm)return;tl(`${b()??""}:${t}`);return}if(Tn="",!$m()){Mn=!0,gt="";return}if(!Mn||!k().generating||M())return;let n=`${b()??""}:${_m()}`;if(n!==gt){gt=n,ai=e;return}if(e-ai<zm||_t>=Vs)return;let r=ot();r&&(eo=!0,r.click())}function ni(){Cn+=1,$t=!1,_t=0,ht="",Tn="",ii=0,bt=!1,eo=!1,Mn=!0,gt="",ai=0,Ln=!1}var ol=f({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:Xs,start(){ni(),oi=[v.on("rise",()=>{$t=!1,ht="",bt=!1,Ln&&(Ln=!1,Mn=!1,gt="")}),v.on("fall",({outcome:e})=>{if(eo){eo=!1,e==="left"?$t=!0:tl(`${b()??""}:stall`);return}(e==="stopped"||e==="left")&&($t=!0),e==="done"&&!_s()&&(_t=0)}),v.on("context",({migrated:e})=>{e||ni()}),v.on("tick",tf)]},stop(){for(let e of oi)e();oi=[],ni()}});var ge=E("bloom-csi-"),of=256,nf=160,kn=1,nl=4,rf=.1,af=.0015,sf=250;function lf(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function cf(e){return new Promise((t,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function uf(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:ve(t.x,n,1-n),y:ve(t.y,r,1-r)}}function rl(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function df(e,t){let o=s("canvas");return o.width=o.height=of,rl(o,e,t),o.toDataURL("image/png")}function il(e){let t=null,o={x:R.store.cropX,y:R.store.cropY,zoom:R.store.cropZoom},n,r=s("canvas",{class:ge("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=nf*devicePixelRatio;let i=s("div",{class:`bloom-muted ${ge("status")}`}),a=s("div",{class:ge("zoom")}),l=s("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function c(y,G=!0){t&&(o=uf(t,y),rl(r,t,o),G&&(clearTimeout(n),n=setTimeout(()=>{t&&(R.store.cropX=o.x,R.store.cropY=o.y,R.store.cropZoom=o.zoom,R.store.avatarUrl=df(t,o))},sf)))}function d(){a.replaceChildren(en(o.zoom,kn,nl,rf,"\xD7",y=>c({...o,zoom:y})))}async function m(y,G){i.textContent="";try{t=await cf(y),G&&(R.store.avatarSource=y,o={x:.5,y:.5,zoom:kn}),e.classList.add(ge("has-image")),d(),c(o,G)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let q=y=>{y?.type.startsWith("image/")&&lf(y).then(G=>m(G,!0))};l.addEventListener("change",()=>q(l.files?.[0])),r.addEventListener("wheel",y=>{t&&(y.preventDefault(),c({...o,zoom:ve(o.zoom*(1-y.deltaY*af),kn,nl)}),d())},{passive:!1}),r.addEventListener("pointerdown",y=>{if(!t)return;r.setPointerCapture(y.pointerId);let G={...o},wt=r.getBoundingClientRect(),So=xo=>{if(!t)return;let X=Math.max(wt.width/t.naturalWidth,wt.height/t.naturalHeight)*o.zoom;c({...o,x:G.x-(xo.clientX-y.clientX)/(t.naturalWidth*X),y:G.y-(xo.clientY-y.clientY)/(t.naturalHeight*X)})};r.addEventListener("pointermove",So),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",So),{once:!0})});let j=s("div",{class:ge("cropper"),attrs:{tabindex:"0"},on:{paste:y=>q([...y.clipboardData?.files??[]].find(G=>G.type.startsWith("image/"))),dragover:y=>y.preventDefault(),drop:y=>{y.preventDefault(),q(y.dataTransfer?.files[0])}}},s("div",{class:ge("stage")},r),s("div",{class:ge("controls")},Ut("",y=>y.trim()&&void m(y.trim(),!0),"https://\u2026 or data:image/\u2026","url"),s("div",{class:ge("buttons")},N("Choose file",()=>l.click()),N("Reset crop",()=>{c({x:.5,y:.5,zoom:kn}),d()}),N("Clear",()=>{t=null,e.classList.remove(ge("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),a.replaceChildren(),R.store.avatarUrl="",R.store.avatarSource=""},"danger")),a,i,l));return e.append(j),R.store.avatarSource&&m(R.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var al=`/*
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
`;var to="data-bloom-csi-avatar",si="data-bloom-csi-sized",ul="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",ff=32,R=p({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>il(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),sl=[];function dl(e){e.removeAttribute(to),e.removeAttribute(si)}function ll(e){return(R.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function cl(e=[]){if(!I(e))return;let t=R.store.displayName.trim()||null,o=!!R.store.avatarUrl,n=new Set(t?ll("name"):[]);for(let i of document.querySelectorAll(ul))n.has(i)||De(i,null);for(let i of n)De(i,t);let r=new Set(o?ll("avatar"):[]);for(let i of document.querySelectorAll(`[${to}]`))r.has(i)||dl(i);for(let i of r)i.hasAttribute(to)||i.setAttribute(to,""),i.toggleAttribute(si,!i.closest('[role="menu"]'))}function pf(){let e=R.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${R.store.avatarSize}px}:is(${u.rail}, ${u.oldRail}) [${si}]{--bloom-csi-size:${ff}px}`:""}var ml=f({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:R,styles:()=>`${pf()}
${al}`,start(){sl=[le(),C(cl)]},stop(){for(let e of sl)e();for(let e of document.querySelectorAll(`[${to}]`))dl(e);for(let e of document.querySelectorAll(ul))De(e,null)},onSettingsChange(){cl()}});var At=E("bloom-greeting-"),fl=30,pl=100;function gl(e){let t=-1,o=s("textarea",{class:`bloom-input ${At("input")}`,attrs:{maxlength:String(pl),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=N("Add",i),r=s("div",{class:At("list")});function i(){let c=o.value.trim().slice(0,pl);if(!c)return;let d=[...L.store.greetings];t>=0?d[t]=c:d.length<fl&&d.push(c),L.store.greetings=d,t=-1,o.value="",a()}function a(){let{greetings:c}=L.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&c.length>=fl,r.replaceChildren(...c.length?c.map((d,m)=>s("div",{class:At("row",m===t?"row-editing":"row-idle")},s("div",{class:At("text"),text:d}),z("edit","Edit",()=>{t=m,o.value=d,o.focus(),a()}),z("trash","Delete",()=>{L.store.greetings=c.filter((q,j)=>j!==m),t===m&&(t=-1),a()}))):[s("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",c=>{c.key==="Enter"&&(c.ctrlKey||c.metaKey)&&i()}),e.append(s("div",{class:At("editor")},r,s("div",{class:At("form")},o,n))),a();let l=et((c,d)=>c==="GreetingCustomizer"&&d==="greetings"&&a());return()=>{l(),e.replaceChildren()}}var hl=`/*
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
`;var On="data-bloom-greeting",hf=1e3,bf=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],L=p({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>gl(e)},greetings:{type:"custom",default:bf},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),Bn,bl=[],li,no=()=>jo()&&!ae(),Af=e=>e.replaceAll(/\s*\n\s*/g," ").trim(),yl=()=>L.store.greetings.filter(e=>typeof e=="string"&&e.trim());function ro(){let e=yl();if(e.length)if(L.store.order==="random"&&e.length>1){let t=L.store.lastRandom;for(;t===L.store.lastRandom;)t=Math.floor(Math.random()*e.length);L.store.lastRandom=t,L.store.index=t}else L.store.index=(L.store.index+1)%e.length}function yf(){return no()?W(u.homeHeading):null}function In(){for(let e of document.querySelectorAll(`[${On}]`))e.removeAttribute(On),De(e,null)}function Rn(){for(let e of document.querySelectorAll("[data-bloom-placeholder]"))e.removeAttribute("data-bloom-placeholder")}function Al(e){let t=xe(),o=Af(e);if(!t||!o||M(t)){Rn();return}t.getAttribute("data-bloom-placeholder")!==o&&t.setAttribute("data-bloom-placeholder",o)}function oo(){let e=yl(),t=wa(),o=no();if(!e.length||!t&&!o){In(),Rn();return}if(t){In(),Al(e[0]??"");return}let n=yf();n?((L.store.index<0||L.store.index>=e.length)&&ro(),n.setAttribute(On,""),De(n,e[Math.max(0,L.store.index)%e.length]??"")):In(),L.store.heroOnlyOutsideProject?Rn():Al(e[Math.max(0,L.store.index)%e.length]??"")}function ci(){clearInterval(Bn),Bn=void 0,L.store.mode==="interval"&&no()&&(Bn=setInterval(()=>{ro(),oo()},L.store.intervalSec*hf))}function vf(e){L.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${On}]`)||getSelection()?.toString()||(ro(),oo())}function qf(){no()&&L.store.mode==="refresh"&&ro(),ci(),oo()}var vl=f({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:L,styles:hl,start(){li=new AbortController,document.addEventListener("click",vf,{signal:li.signal}),no()&&L.store.mode==="refresh"&&ro(),ci(),bl=[C(e=>I(e)&&oo()),se(qf)]},stop(){li?.abort();for(let e of bl)e();clearInterval(Bn),In(),Rn()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&ci(),oo()}});var io=E("bloom-history-"),ui=10,Sf=3e3;function ql(e){let t="",o=0,n=new Set,r=s("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),i=s("div",{class:io("list")}),a=s("div",{class:io("pager")}),l,c=N("Clear all",()=>{if(!l){c.textContent="Click again to clear",l=setTimeout(()=>{l=void 0,c.textContent="Clear all"},Sf);return}clearTimeout(l),l=void 0,c.textContent="Clear all",ao([])},"danger");function d(){let q=[...We.store.entries].toReversed(),j=t.trim().toLowerCase(),y=j?q.filter(X=>X.toLowerCase().includes(j)):q,G=Math.max(1,Math.ceil(y.length/ui));o=Math.min(o,G-1);let wt=y.slice(o*ui,(o+1)*ui).map(X=>s("div",{class:io("row")},s("button",{class:io("text",n.has(X)?"text-open":"text-closed"),text:X,title:n.has(X)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{n.delete(X)||n.add(X),d()}}}),z("copy","Copy",()=>void Gi(X)),z("trash","Delete",()=>ao(We.store.entries.filter(Rc=>Rc!==X)))));i.replaceChildren(...wt.length?wt:[s("div",{class:"bloom-muted",text:j?"No matching prompts.":"No saved prompts yet."})]),a.replaceChildren(s("span",{class:"bloom-muted",text:`${y.length} ${j?"matching":"saved"} \xB7 page ${o+1} of ${G}`}),N("Previous",()=>{o--,d()}),N("Next",()=>{o++,d()}),c);let[So,xo]=a.querySelectorAll("button");So.disabled=o===0,xo.disabled=o>=G-1,c.disabled=!q.length}r.addEventListener("input",()=>{t=r.value,o=0,d()}),e.append(s("div",{class:io("manager")},r,i,a)),d();let m=et((q,j)=>q==="InputHistory"&&j==="entries"&&d());return()=>{m(),clearTimeout(l),e.replaceChildren()}}var Sl=`/*
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
`;var wf=E("bloom-history-"),Ef=2e3,We=p({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>ql(e)},entries:{type:"custom",default:[]}}),Z=null,di={text:"",at:0},ze=null,mi,Pn=()=>We.store.entries.filter(e=>typeof e=="string");function ao(e){We.store.entries=e.slice(-We.store.maxEntries)}function fi(e){let t=e.trim();if(!t)return;let o=Date.now();t===di.text&&o-di.at<Ef||(di={text:t,at:o},ao([...Pn().filter(n=>n!==t),t]))}function Tf(e,t){let o=xe();if(!o)return;ze??=s("div",{class:`bloom-root ${wf("hud")}`,attrs:{"data-bloom":"history-hud","aria-live":"polite"}}),ze.textContent=`${e+1} / ${t}`;let n=(o.closest("form")??o).getBoundingClientRect();ze.style.left=`${n.left+n.width/2}px`,ze.style.top=`${n.top}px`,ze.isConnected||document.body.append(ze)}function so(){Z=null,ze?.remove()}function Cf(e){let t=Pn();if(!Z)return;let o=t[e];Z.index=e,Z.shown=o,ee(o),Tf(t.length-1-e,t.length)}function Mf(e){let t=Pn();if(!t.length)return!1;if(!Z){if(e===1)return!1;Z={index:t.length,draft:M(),shown:""}}let o=Z.index+e;return o<0?!0:o>=t.length?(ee(Z.draft),so(),!0):(Cf(o),!0)}function Lf(e){if(e.isComposing||!we(e.target))return;let t=e.target;if(e.key==="Enter"&&!e.shiftKey){fi(M(t)),so();return}if(e.key==="Escape"&&Z){ee(Z.draft),so(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey)return;let o=da(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!Z||Mf(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function kf(e){Z&&we(e.target)&&M(e.target)!==Z.shown.trim()&&so()}function Bf(e){e.target instanceof Element&&e.target.closest(u.sendButton)&&fi(M())}var xl=f({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:We,styles:Sl,start(){mi=new AbortController;let{signal:e}=mi;document.addEventListener("keydown",Lf,{capture:!0,signal:e}),document.addEventListener("input",kf,{capture:!0,signal:e}),document.addEventListener("click",Bf,{capture:!0,signal:e}),document.addEventListener("submit",()=>fi(M()),{capture:!0,signal:e})},stop(){mi?.abort(),so()},onSettingsChange(e){e==="maxEntries"&&ao(Pn())}});var wl=`/*
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
`;var Of=1500,Rf=5e3,Pf=2e3,yt=p({showDate:{type:"boolean",description:"Show the date for messages not sent today.",default:!0},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),Hn=new Map,Cl=0,Nn,El=[];function Ml(e,t){Hn.get(e)!==t&&(Hn.set(e,t),clearTimeout(Nn),Nn=setTimeout(Ll,Pf))}function Ll(){let e={...yt.store.stamps,...Object.fromEntries(Hn)};yt.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,Of))}function Df(e){let t=te(b())?.times;for(let o=e.length-1;o>=0;o--){let n=Hn.get(e[o])??t?.get(e[o])??yt.store.stamps[e[o]];if(n)return n}return null}var Hf=()=>k().generating||Date.now()-Cl<Rf;function Nf(e){let t=new Date(e),o=new Date,n={hour:"2-digit",minute:"2-digit"};if(!yt.store.showDate||t.toDateString()===o.toDateString())return t.toLocaleTimeString(void 0,n);let r=t.getFullYear()===o.getFullYear()?{}:{year:"numeric"};return t.toLocaleString(void 0,{...r,month:"short",day:"numeric",...n})}function Tl(e){let t=rt(e)??e.getAttribute("data-message-author-role")??e.closest(u.turn)?.getAttribute("data-turn")??e.querySelector(u.authorRole)?.getAttribute("data-message-author-role");if(mr(t))return t;let o=Rt(e).at(-1);return te(b())?.chain.find(n=>n.id===o)?.role??null}function Uf(e){let t=Rt(e);if(!t.length||!oe(e)||e.querySelector("time:not([data-bloom])"))return;let o=Df(t);!o&&Hf()&&(o=Date.now(),Ml(t.at(-1),o));let n=e.querySelector(':scope > time[data-bloom="timestamp"]');if(!o||yt.store.hideOwnMessages&&Tl(e)==="user"){n?.remove();return}let r=Nf(o);if(n?.textContent===r)return;let i=s("time",{class:`bloom-timestamp bloom-timestamp-${Tl(e)??"assistant"}`,text:r,title:new Date(o).toLocaleString(),attrs:{"data-bloom":"timestamp",datetime:new Date(o).toISOString()}});n?n.replaceWith(i):e.prepend(i)}var Dn=tt(()=>{for(let e of Dt())Uf(e)}),kl=f({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:yt,styles:wl,start(){El=[C(e=>I(e)&&Dn()),Y.on("conversation",Dn),Y.on("message-time",({messageId:e,time:t})=>{Ml(e,t),Dn()}),v.on("fall",()=>{Cl=Date.now()})]},stop(){for(let e of El)e();Nn&&(clearTimeout(Nn),Ll());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();Dn()}}});var Gf=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])'],Ff=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],Bl=p({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),Il=f({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:Bl,styles:()=>$e([...Gf,...Bl.store.hideDictationSettings?Ff:[]])});var Je="data-bloom-share",Yf=/^\/g\/g-p-/,Qf=/^(?:share|分享)$/i,Kf=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],jf=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${Je}="project"]`],pi=p({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),Un,gi=!1;function Wf(e){if(!I(e))return;let t=Yf.test(location.pathname)&&!b();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${Je}]`))!t||!Qf.test(h(o.textContent??""))?o.removeAttribute(Je):o.hasAttribute(Je)||o.setAttribute(Je,"project")}var Ol=f({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:pi,styles:()=>$e([...pi.store.hideShareChat?Kf:[],...pi.store.hideShareProject?jf:[]]),start(){gi=!0,Ot().then(()=>{gi&&!Un&&(Un=C(Wf))})},stop(){gi=!1,Un?.(),Un=void 0;for(let e of document.querySelectorAll(`[${Je}]`))e.removeAttribute(Je)}});var Rl='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',zf='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',Jf="[data-bloom-profile-plan]",Pl="visibility:hidden!important;user-select:none!important",Hl=p({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function Vf(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=Hl.store,r=[];return e&&r.push(n?`:is(${Rl}){display:none!important}`:`:is(${Rl}){${Pl}}`),t&&r.push(`:is(${zf}){${Pl}}`),e&&o&&r.push(`${Jf}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var Dl,Nl=f({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Hl,styles:Vf,start(){Dl=le()},stop(){Dl?.()}});var Zf="model-switcher-dropdown-button",Ul=e=>e.startsWith("model-switcher-")&&e!==Zf?e.slice(15):"",lo=(e,t)=>e.id===t.id||!!e.label&&e.label===t.label;function Gl(){let e=F();return(e&&W(u.modelTrigger,e))??W(u.modelTrigger)}function ce(){let e=Gl();if(!e)return null;let t=h(e.innerText),o=Ul(e.getAttribute("data-testid")??"")||t;return o?{id:o,label:t||o}:null}function Xf(e){return[...document.querySelectorAll(u.modelItem)].find(t=>{let o=Ul(t.getAttribute("data-testid")??""),n=h(t.textContent??"");return o===e.id||n===e.label||n===e.id})??null}function Gn(e){let t=ce();if(t&&lo(t,e))return!0;let o=Xf(e);if(o){o.click();let r=ce();return!!r&&lo(r,e)}let n=Gl();return n?.getAttribute("aria-expanded")!=="true"&&n?.click(),!1}var Fl=`/*
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
`;var P=E("bloom-queue-"),_f=6,ep=8,V=null,co="",vt=!1,qt=!1;function hi(e,t,o){let n=z(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute(me),n.addEventListener("mouseenter",()=>Yl(t)),n.addEventListener("mouseleave",()=>Yl("")),n}function Yl(e){let t=V?.querySelector(`.${P("tip")}`);t&&(t.textContent=e)}function tp(e,t,o,n){qt=!0;let r=s("textarea",{class:`bloom-input ${P("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=new AbortController,a=l=>{i.abort(),qt=!1,co="",l?n.edit(t,r.value):r.replaceWith(s("div",{class:P("text"),text:o}))};addEventListener("keydown",l=>{if(!(l.target!==r||l.isComposing)){if(l.key==="Enter"&&!l.shiftKey)a(!0);else if(l.key==="Escape")a(!1);else return;l.preventDefault(),l.stopImmediatePropagation()}},{capture:!0,signal:i.signal}),r.addEventListener("keydown",l=>l.stopPropagation(),{signal:i.signal}),r.addEventListener("blur",()=>a(!0),{signal:i.signal}),e.querySelector(`.${P("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function op(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,a=c=>{!i&&Math.abs(c.clientY-n.clientY)<_f||(i||(i=qt=!0,e.classList.add(P("dragging"))),e.style.transform=`translateY(${c.clientY-n.clientY}px)`)},l=c=>{if(removeEventListener("pointermove",a),!i)return;qt=!1,co="";let m=[...r.children].filter(q=>q!==e).filter(q=>q.getBoundingClientRect().top+q.getBoundingClientRect().height/2<c.clientY).length;o.move(t,m)};addEventListener("pointermove",a),addEventListener("pointerup",l,{once:!0})})}function np(e,t,o,n){let r=s("li",{class:P("row")},s("div",{class:P("text"),text:e.text}),n&&e.label?s("span",{class:P("model"),title:e.label,text:e.label}):null,s("div",{class:P("actions")},hi("trash","Remove from queue",()=>o.remove(t)),hi("edit","Edit",()=>tp(r,t,e.text,o)),hi("send","Send now",()=>o.sendNow(t))));return op(r,t,o),r}function rp(e){if(!V)return;let t=e.getBoundingClientRect();V.style.left=`${t.left}px`,V.style.width=`${t.width}px`,V.style.bottom=`${innerHeight-t.top+ep}px`}function bi(){V?.remove(),V=null,co="",qt=!1}function Me(e,t,o=!0){let n=F();if(!e.length||!Bt(n)){bi();return}V||(V=s("div",{class:`bloom-root ${P("tray")}`,attrs:{"data-bloom":"queue"}},s("div",{class:P("header")},s("button",{class:P("toggle"),attrs:{type:"button","aria-expanded":String(!vt)},on:{click:a=>{vt=!vt,V?.classList.toggle(P("collapsed"),vt),a.currentTarget.setAttribute("aria-expanded",String(!vt))}}},s("span",{class:P("count")}),D("chevron")),s("span",{class:P("tip")})),s("ol",{class:P("list")})),V.classList.toggle(P("collapsed"),vt),document.body.append(V)),rp(n);let r=JSON.stringify([o,...e.map(a=>[a.text,o?a.label:""])]);if(qt||r===co)return;co=r;let i=V.querySelector(`.${P("count")}`);i&&(i.textContent=wo(e.length,"Queued message")),V.querySelector(`.${P("list")}`)?.replaceChildren(...e.map((a,l)=>np(a,l,t,o)))}var Kn=new x("PromptQueue"),ip=8,fo=150,Yn=20,re="BloomPromptQueue",yi="BloomPromptQueueClaim",Ql="BloomPromptQueueTab",ap=4e3,U=p({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1},showQueueMode:{type:"boolean",description:"Show the model that was selected when each message was queued.",default:!0},stickyOnNavigate:{type:"boolean",description:"Keep the selected model when switching chats.",default:!0},persistAcrossRefresh:{type:"boolean",description:"Restore unsent queued messages in this browser after a refresh. Other tabs show the same queue; only one of them sends it.",default:!0}}),ie=new Map,mo=!1,Ze=null,uo,Kl=[],he=null,be=!1,Ai,Qn="draft",po=()=>b()??Qn,K=()=>ie.get(po())??[],vi=e=>({id:e.model||e.label,label:e.label||e.model});function sp(e){return typeof e=="string"?e.trim()?{text:e,model:"",label:""}:null:!w(e)||typeof e.text!="string"||!e.text.trim()?null:{text:e.text,model:typeof e.model=="string"?e.model:"",label:typeof e.label=="string"?e.label:""}}function qi(){let e=sessionStorage.getItem(Ql);if(e)return e;let t=globalThis.crypto?.randomUUID?.()??`${Date.now()}-${Math.random()}`;return sessionStorage.setItem(Ql,t),t}function Wl(){let e=Se(localStorage.getItem(yi)??"");return!w(e)||typeof e.tab!="string"||typeof e.at!="number"||typeof e.key!="string"?null:{tab:e.tab,at:e.at,key:e.key}}function zl(){let e={tab:qi(),at:Date.now(),key:po()};try{localStorage.setItem(yi,JSON.stringify(e))}catch(t){Kn.warn("Could not claim the queue",t)}}function lp(){let e=Wl();if(e?.tab===qi())try{localStorage.setItem(yi,JSON.stringify({...e,at:Date.now()}))}catch(t){Kn.warn("Could not refresh the queue claim",t)}}function cp(){let e=Wl();return!e||e.tab===qi()||e.key!==po()?!0:Date.now()-e.at<=ap?!1:(zl(),!0)}function up(){return Object.fromEntries([...ie].filter(([e])=>e!==Qn))}function Fn(e){let t=typeof e=="string"?Se(e):e;if(!w(t))return!1;let o=!1;for(let[n,r]of Object.entries(t)){if(!Array.isArray(r))continue;let i=r.map(sp).filter(a=>a!=null);i.length&&(ie.set(n,i),o=!0)}return o}function dp(){if(!U.store.persistAcrossRefresh){sessionStorage.removeItem(re),_n(re);return}if(!Fn(sessionStorage.getItem(re))){if(Fn(localStorage.getItem(re))){go();return}Mo(re).then(e=>{ie.size||e.some(Fn)&&(go(),Me(K(),Ve,U.store.showQueueMode))})}}function go(){try{if(!U.store.persistAcrossRefresh){sessionStorage.removeItem(re),_n(re);return}let e=up();sessionStorage.setItem(re,JSON.stringify(e)),Lo(re,e)}catch(e){Kn.warn("Could not save the queue",e)}}function mp(e){if(!(e.key!==re||!U.store.persistAcrossRefresh||e.newValue==null)){ie.clear(),Fn(e.newValue);try{sessionStorage.setItem(re,e.newValue)}catch(t){Kn.warn("Could not mirror the queue",t)}Me(K(),Ve,U.store.showQueueMode)}}function Xe(e){e.length?ie.set(po(),e):ie.delete(po()),zl(),go(),Me(K(),Ve,U.store.showQueueMode)}function fp(e){if(!e.model&&!e.label)return!0;let t=ce();return t?lo(t,vi(e)):!0}function Jl(e,t=0){t>=Yn||k().generating||M()!==e||(No(),setTimeout(()=>Jl(e,t+1),fo))}function pp(e,t){let o=U.store.stickyOnNavigate&&he?he:e;if(!o||!t.model&&!t.label||lo(o,vi(t))){be=!1;return}be=!0,setTimeout(()=>{Gn(o),be=!1},fo)}function ho(e,t=0){if(k().generating||M()){t<Yn&&setTimeout(()=>ho(e,t+1),fo);return}if(!fp(e)&&t<Yn){be=!0,Gn(vi(e)),setTimeout(()=>ho(e,t+1),fo);return}let o=ce();ee(e.text),It(()=>Jl(e.text)),pp(o,e)}function jl(){if(Ze!=null){let o=Ze;Ze=null,ho(o);return}if(!mo||k().generating||M())return;if(!cp()){mo=!1;return}let[e,...t]=K();e!=null&&(mo=!1,Xe(t),ho(e))}function Vl(e){let t=K(),o=t[e];if(o!=null){if(Xe(t.filter((n,r)=>r!==e)),!k().generating){ho(o);return}Ze=o,ot()?.click()}}var Ve={remove:e=>Xe(K().filter((t,o)=>o!==e)),edit:(e,t)=>Xe(t.trim()?K().map((o,n)=>n===e?{...o,text:t}:o):K().filter((o,n)=>n!==e)),sendNow:Vl,move(e,t){let o=[...K()],[n]=o.splice(e,1);n&&(o.splice(t,0,n),Xe(o))}};function gp(e){let t=ce(),o={text:e,model:t?.id??"",label:t?.label??""},n=K();return U.store.replacePending&&n.length?(Xe([...n.slice(0,-1),o]),!0):n.length>=ip?!1:(Xe([...n,o]),!0)}function hp(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!we(e.target)||!k().generating)return;let t=M(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;let o=ce();ee(""),Ze={text:t,model:o?.id??"",label:o?.label??""},ot()?.click();return}if(!t){K().length&&Vl(0);return}gp(t)&&ee("")}function bp(){if(be||!U.store.stickyOnNavigate)return;let e=ce();e&&(he=e)}function Ap(){if(!U.store.stickyOnNavigate||!he)return;be=!0;let e=0,t=()=>{if(!he||Gn(he)||e>=Yn){be=!1;return}e++,Ai=setTimeout(t,fo)};clearTimeout(Ai),t()}function yp(e){let{target:t}=e;!(t instanceof Element)||be||t.closest(`${u.modelTrigger}, ${u.modelItem}`)&&setTimeout(bp,0)}var Zl=f({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:U,styles:Fl,start(){uo=new AbortController,dp(),he=ce(),document.addEventListener("keydown",hp,{capture:!0,signal:uo.signal}),document.addEventListener("pointerup",yp,{signal:uo.signal}),Kl=[v.on("fall",({outcome:e})=>{mo=e==="done",e==="left"&&(Ze=null),jl()}),v.on("context",({prevId:e,id:t,migrated:o})=>{let n=ie.get(Qn);ie.delete(Qn),o&&!e&&t&&n&&ie.set(t,n),o||(mo=!1,Ap()),go(),Me(K(),Ve,U.store.showQueueMode)}),v.on("tick",()=>{lp(),jl(),Me(K(),Ve,U.store.showQueueMode)})],addEventListener("storage",mp,{signal:uo.signal}),Me(K(),Ve,U.store.showQueueMode)},stop(){uo?.abort(),clearTimeout(Ai);for(let e of Kl)e();bi(),ie.clear(),Ze=null,he=null,be=!1},onSettingsChange(e){e==="persistAcrossRefresh"&&go(),e==="stickyOnNavigate"&&U.store.stickyOnNavigate&&(he=ce()),Me(K(),Ve,U.store.showQueueMode)}});var vp=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function qp(){let e=h(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!vp.has(e.toLowerCase())?e:null}function bo(e){return e?te(e)?.title??Va(e)??(e===b()?qp():null):null}var Xl=`/*
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
`;var Ae=E("bloom-recent-"),ye="home",xp=50,$l=140,wp=new Set(["Backquote"]),Ep=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),S=p({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),Le=null,ue=[],de=0,Si,_l=[],zn=()=>ae()?null:b()??(jo()?ye:null);function ec(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function oc(e){let t=bo(e);t&&S.store.titles[e]!==t&&(S.store.titles={...S.store.titles,[e]:t});let o=Za(location.href);o&&e===b()&&S.store.projects[e]!==o&&(S.store.projects={...S.store.projects,[e]:o})}function tc(e){if(!e)return;let t=[e,...S.store.visits.filter(n=>n!==e)].slice(0,xp),o=new Set(t);S.store.visits=t,Object.keys(S.store.previews).some(n=>!o.has(n))&&(S.store.previews=ec(S.store.previews,o)),Object.keys(S.store.titles).some(n=>!o.has(n))&&(S.store.titles=ec(S.store.titles,o)),e!==ye&&oc(e)}function jn(e){if(!e||!S.store.visits.includes(e))return;let t={},o=te(e)?.chain??[];for(let r of o)t[r.role]=qe(Vo(r),$l);if(e===b())for(let r of zo()){let i=Jo(r);i&&(t[r.role]=qe(i,$l))}let n=S.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(S.store.previews={...S.store.previews,[e]:t})}function Tp(){let e=Number(S.store.maxRecent);return S.store.visits.filter(t=>t!==ye||S.store.includeHome).slice(0,e)}function xi(e){if(Ao(),e===zn())return;let t=e===ye?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"]'):Gt(e)[0];t?t.click():location.assign(e===ye?"/":`/c/${e}`)}function Cp(e,t){let o=e===ye?"New chat":S.store.titles[e]??bo(e)??"Untitled chat",n=e===ye?null:S.store.projects[e],r=e===ye?null:S.store.previews[e];return s("button",{class:Ae("item"),attrs:{type:"button",role:"option","aria-selected":String(t===de)},on:{click:()=>xi(e),mousemove:()=>t!==de&&Wn(t)}},s("div",{class:Ae("head")},s("span",{class:`${Ae("title")} bloom-truncate`,text:o}),n&&s("span",{class:Ae("project"),text:n})),r?.user&&s("div",{class:`${Ae("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&s("div",{class:`${Ae("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function Wn(e){de=(e+ue.length)%ue.length,Le?.querySelectorAll(`.${Ae("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===de)))}function Mp(){jn(b());let e=zn();ue=Tp(),e&&(ue=[e,...ue.filter(t=>t!==e)].slice(0,Number(S.store.maxRecent))),ue.length&&(de=ue.length>1?1:0,Le=s("div",{class:`bloom-root ${Ae("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:t=>t.target===t.currentTarget&&Ao()}},s("div",{class:Ae("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...ue.map(Cp))),document.body.append(Le))}function Ao(){Le?.remove(),Le=null}var Lp=e=>wp.has(e.code)||Ep.has(e.key);function kp(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&Lp(e)){e.preventDefault(),e.stopPropagation(),Le?Wn(de+(e.shiftKey?-1:1)):Mp();return}if(!Le)return;let o={Escape:Ao,Enter:()=>xi(ue[de]),ArrowDown:()=>Wn(de+1),ArrowUp:()=>Wn(de-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function Bp(e){Le&&e.key==="Control"&&xi(ue[de])}var nc=f({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:S,styles:Xl,start(){Si=new AbortController;let{signal:e}=Si;addEventListener("keydown",kp,{capture:!0,signal:e}),addEventListener("keyup",Bp,{capture:!0,signal:e}),addEventListener("blur",Ao,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&jn(b()),{signal:e}),_l=[se(({prevId:i})=>{jn(i),tc(zn())}),Y.on("conversation",({id:i})=>{S.store.visits.includes(i)&&oc(i),jn(i)})];let{visits:t,titles:o,previews:n}=S.store,r=t.filter(i=>i!==ye&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(S.store.visits=t.filter(i=>!r.includes(i))),tc(zn())},stop(){Si?.abort();for(let e of _l)e();Ao()}});var wi="data:audio/mpeg;base64,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";var rc=new x("ResponseNotification"),Ip=.5,Op=200,Rp=300,yo=p({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:e=>(e.append(N("Preview",lc)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),ic=null,Ei=new Map,ac,Ti;function Pp(e){return new Promise((t,o)=>GM_xmlhttpRequest({url:e,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=Op&&n<Rp?t(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var Dp=e=>Uint8Array.from(atob(e.slice(e.indexOf(",")+1)),t=>t.charCodeAt(0)).buffer;function Hp(e,t){let o=Ei.get(t);return o||(o=(t.startsWith("data:")?Promise.resolve(Dp(t)):Pp(t)).then(n=>e.decodeAudioData(n)),o.catch(()=>Ei.delete(t)),Ei.set(t,o)),o}async function sc(e){ic??=new AudioContext;let t=ic;t.state==="suspended"&&t.resume();let o=t.createBufferSource(),n=t.createGain();o.buffer=await Hp(t,e),n.gain.value=Ip,o.connect(n).connect(t.destination),o.start()}function lc(){let e=yo.store.soundUrl.trim();sc(e||wi).catch(t=>{rc.warn("Sound failed",t),e&&sc(wi).catch(o=>rc.warn("Default chime failed",o))})}function Np(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function Up(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(Ti=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:Ti.signal}))}var cc=f({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:yo,start(){Up(),ac=v.on("fall",({conversationId:e,outcome:t})=>{t==="done"&&(yo.store.onlyWhenHidden&&!document.hidden||(yo.store.sound&&lc(),yo.store.browserNotification&&Np(bo(e))))})},stop(){ac?.(),Ti?.abort()}});var Gp=`:is(${u.sidebarScroll}, :has(> ${u.sidebarScroll})) + :has(${u.menuButton})`,Fp=`${u.rail} > :has(${u.menuButton})`,Mi=`:is(${Gp}, ${Fp}, ${u.oldProfile}):not(:hover)`,Ci="[data-bloom-profile-avatar]",Yp=`:is(${Mi}, ${Mi} :has(${Ci})) > :not(${Ci}, :has(${Ci}))`,dc=p({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function Qp(){let{opacity:e,fadeAvatar:t}=dc.store;return e>=100?"":`${t?Mi:Yp}{opacity:${e/100}!important}`}var uc,mc=f({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:dc,styles:Qp,start(){uc=le()},stop(){uc?.()}});var fc=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

:is([data-app-action-sidebar-scroll], #stage-slideover-sidebar) :has(> button.bloom-star-chats-star) {
    position: relative;
}

button.bloom-star-chats-star {
    position: absolute;
    inset-inline-end: 0.35rem;
    top: 50%;
    z-index: 1;
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: 0.375rem;
    background: transparent;
    color: var(--bloom-fg-3);
    opacity: 1;
    transform: translateY(-50%);
    pointer-events: auto;
    cursor: pointer;
}

a:hover > button.bloom-star-chats-star,
:hover > button.bloom-star-chats-star,
button.bloom-star-chats-star:focus-visible,
button.bloom-star-chats-star[aria-pressed="true"],
button.bloom-star-chats-header,
[data-bloom="starred"] button.bloom-star-chats-star {
    opacity: 1;
    pointer-events: auto;
}

button.bloom-star-chats-header {
    position: static;
    inset: auto;
    margin-inline-start: 0.35rem;
    transform: none;
    vertical-align: middle;
}

button.bloom-star-chats-star:hover {
    background: var(--bloom-hover);
    color: var(--bloom-fg);
}

button.bloom-star-chats-star[aria-pressed="true"] {
    color: var(--bloom-fg);
}

button.bloom-star-chats-star[aria-pressed="true"] .bloom-icon {
    fill: currentcolor;
    stroke: none;
}

button.bloom-star-chats-star .bloom-icon {
    width: 0.875rem;
    height: 0.875rem;
}

.bloom-star-chats {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    margin-block-end: 0.5rem;
}

.bloom-star-chats-label {
    padding: 0.25rem 0.5rem 0.125rem;
    color: var(--bloom-fg-3);
    font-size: 0.75rem;
    font-weight: 600;
}

.bloom-star-chats-link {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    min-height: 2rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
    color: inherit;
    text-decoration: none;
}

.bloom-star-chats-link:hover {
    background: var(--bloom-hover);
}

.bloom-star-chats-link button.bloom-star-chats-star {
    position: static;
    transform: none;
}

.bloom-star-chats-title {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
`;var jp='#page-header h1, [data-testid="conversation-title"], [data-testid="thread-title"], header [data-conversation-title]',St=E("bloom-star-chats"),Wp=40,qo=p({chats:{type:"custom",default:[]}}),Li,ki=!1;function ke(){let e=qo.store.chats;return Array.isArray(e)?e.filter(t=>w(t)&&typeof t.id=="string"&&typeof t.href=="string"&&typeof t.title=="string"&&!!xt(t.href)):[]}function xt(e){try{let t=new URL(e,location.origin);return t.origin!==location.origin||t.searchParams.get("temporary-chat")==="true"||!ne(t.href)?null:`${t.pathname}${t.search}`}catch{return null}}function vo(e){for(let t=e,o=0;t&&o<8;t=t.parentElement,o+=1)if(oe(t))return!0;return!1}function Bi(e){return!!e.closest("main, [data-app-action-timeline-scroll], #thread, article")}function zp(){let e=[...document.querySelectorAll(u.sidebarScroll)].filter(n=>!n.closest("[inert]")&&!Bi(n));if(e.length)return e;let t=[...document.querySelectorAll(`${u.oldSidebar} nav`)];if(t.length)return t;let o=[...document.querySelectorAll(u.oldSidebar)];return o.length?o:[...document.querySelectorAll("nav")].filter(n=>!n.closest("[inert]")&&!Bi(n)&&!!n.querySelector('a[href="/"], a[href*="/c/"]'))}function Jn(){let e=`${u.sidebarScroll} ${u.conversationLink}, ${u.oldSidebar} ${u.conversationLink}, nav ${u.conversationLink}, a[data-sidebar-item="true"]`;return[...document.querySelectorAll(e)].filter(t=>!t.closest("[data-bloom]")&&!t.closest("[inert]")&&!Bi(t)&&!!ne(t.href))}function gc(e){let t=e.cloneNode(!0);for(let o of t.querySelectorAll("[data-bloom]"))o.remove();return h(t.textContent??"")}function Jp(e){let t=e.parentElement,o=e.closest(u.sidebarScroll)??e.closest(u.oldSidebar)??e.closest("nav");return!t||t===o?e:[...t.querySelectorAll(u.conversationLink)].filter(r=>!r.closest("[data-bloom]")).length===1?t:e}function Ii(e,t){let o=s("button",{class:St("-star"),attrs:{type:"button","data-bloom":"chat-star","data-id":e,"aria-pressed":String(t),"aria-label":t?"Unstar chat":"Star chat"},on:{click:n=>{n.preventDefault(),n.stopPropagation();let r=Jn().find(l=>ne(l.href)===e);if(r){Vp(r);return}let i=e===b()?xt(`${location.pathname}${location.search}`):null,a=h(o.previousElementSibling?.textContent??"");i&&!ke().some(l=>l.id===e)?bc(e,i,a||"Untitled chat"):qo.store.chats=ke().filter(l=>l.id!==e)}}},D("star"));return o}function hc(e,t){e.setAttribute("aria-pressed",String(t)),e.setAttribute("aria-label",t?"Unstar chat":"Star chat")}function bc(e,t,o){let n=ke();qo.store.chats=n.some(r=>r.id===e)?n.filter(r=>r.id!==e):[{id:e,href:t,title:o||"Untitled chat"},...n].slice(0,Wp)}function Vp(e){let t=ne(e.href),o=t?xt(e.href):null;!t||!o||bc(t,o,gc(e)||"Untitled chat")}function Zp(e,t){if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.target instanceof Element&&e.target.closest("[data-bloom='chat-star']"))return;let o=Jn().find(n=>ne(n.href)===t);o&&(e.preventDefault(),o.click())}function Xp(){let e=!1,t=ke().map(o=>{let n=Jn().find(a=>ne(a.href)===o.id);if(!n)return o;let r=gc(n),i=xt(n.href);return!r||!i||r===o.title&&i===o.href?o:(e=!0,{...o,title:r,href:i})});e&&(qo.store.chats=t)}function $p(){let e=new Set(ke().map(t=>t.id));for(let t of Jn()){let o=ne(t.href),n=o?xt(t.href):null,r=Jp(t),i=r.querySelector(':scope > [data-bloom="chat-star"]');if(!o||!n||!vo(t)){i?.remove();continue}let a=e.has(o);i?hc(i,a):r.append(Ii(o,a))}}function _p(e,t){let o=[...e.querySelectorAll("a[href]")].find(r=>{if(r.closest("[data-bloom]"))return!1;try{let i=new URL(r.href,location.origin);return i.origin===location.origin&&i.pathname==="/"}catch{return!1}}),n=o?[...e.children].find(r=>r===o||r.contains(o)):null;n?n.after(t):e.prepend(t)}function eg(){let e=ke(),t=new Set,o=e.map(n=>`${n.id}	${n.title}	${n.href}`).join(`
`);for(let n of zp()){if(!vo(n))continue;let r=[...n.children].find(i=>i instanceof HTMLElement&&i.dataset.bloom==="starred");if(!e.length){r?.remove();continue}r||(r=s("div",{class:`bloom-root ${St("")}`,attrs:{"data-bloom":"starred"}}),_p(n,r)),t.add(r),r.dataset.sig!==o&&(r.dataset.sig=o,r.replaceChildren(s("div",{class:St("-label"),text:"Starred"}),...e.map(i=>s("a",{class:St("-link"),attrs:{href:xt(i.href)??i.href},on:{click:a=>Zp(a,i.id)}},s("span",{class:St("-title"),text:i.title||"Untitled chat"}),Ii(i.id,!0)))))}for(let n of document.querySelectorAll('[data-bloom="starred"]'))t.has(n)||n.remove()}function tg(){let e=[...document.querySelectorAll(jp)].find(o=>!o.closest("[data-bloom]")&&vo(o));if(e)return e;let t=document.querySelector("#page-header");return t?[...t.querySelectorAll("h1, h2, [role='heading']")].find(o=>!o.closest("[data-bloom]")&&!!h(o.textContent??"")&&vo(o))??null:null}function og(){let e=b(),t=e?tg():null,o=t?.parentElement,n=o?.querySelector(':scope > [data-bloom="chat-star"][data-place="header"]')??null;if(!e||!t||!o||!vo(o)){for(let r of document.querySelectorAll('[data-bloom="chat-star"][data-place="header"]'))r.remove();return}n?.dataset.id!==e?(n?.remove(),n=Ii(e,ke().some(r=>r.id===e)),n.dataset.place="header",n.classList.add(St("-header")),t.after(n)):n&&hc(n,ke().some(r=>r.id===e));for(let r of document.querySelectorAll('[data-bloom="chat-star"][data-place="header"]'))r!==n&&r.remove()}function pc(){if(!ki){ki=!0;try{Xp(),eg(),$p(),og()}finally{ki=!1}}}function ng(){for(let e of document.querySelectorAll('[data-bloom="chat-star"], [data-bloom="starred"]'))e.remove()}var Ac=f({name:"StarChats",description:"Star a chat in the sidebar and keep it at the top. No three-chat limit.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:qo,styles:fc,onSettingsChange(e){e==="chats"&&pc()},start(){Li=C(e=>I(e)&&pc())},stop(){Li?.(),Li=void 0,ng()}});var rg="filter:blur(6px)!important;transition:filter 0.2s ease",yc=`:is(${u.sidebars})`,ig={conversations:{selectors:[`${yc} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0},projects:{selectors:[`${yc} a:is([href*="/project"], [href*="/g/g-p-"])`,"[data-app-action-sidebar-project-row]",".bloom-recent-project"],hover:!0},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}},qc=p({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function ag(){return Object.entries(ig).filter(([e])=>qc.store[e]).map(([,{selectors:e,hover:t}])=>{let o=e.join(",");return`:is(${o}){${rg}}`+(t?`:is(${o}):hover, .bloom-recent-item:hover :is(${o}){filter:none!important}`:"")}).join(`
`)}var vc,Sc=f({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:qc,styles:ag,start(){vc=le()},stop(){vc?.()}});var xc=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

button.bloom-temporary-button {
    display: flex;
    align-items: center;
    width: calc(100% - 0.5rem);
    margin: 0.15rem 0.25rem 0.35rem;
    padding: 0.4rem 0.65rem;
    border: 0;
    border-radius: 0.5rem;
    background: transparent;
    color: var(--bloom-fg-2);
    font: inherit;
    text-align: start;
    cursor: pointer;
}

button.bloom-temporary-button[aria-pressed="true"] {
    background: color-mix(in srgb, var(--bloom-fg) 12%, transparent);
    color: var(--bloom-fg);
}

button.bloom-temporary-button:hover {
    background: color-mix(in srgb, var(--bloom-fg) 8%, transparent);
}
`;var lg=E("bloom-temporary-"),Tc=p({openNewAsTemporary:{type:"boolean",description:"Open New chat as a temporary chat.",default:!1}}),Oi,Vn,Ri=!1;function cg(e){return e?"/?temporary-chat=true":"/"}function wc(e){let t=cg(e);`${location.pathname}${location.search}`===t||e&&ae()&&location.pathname==="/"||location.assign(t)}function ug(){let e=[...document.querySelectorAll(u.sidebarScroll)].filter(o=>!o.closest("[inert]")&&oe(o));if(e.length)return e;let t=document.querySelector(`${u.oldSidebar} nav`)??document.querySelector(u.oldSidebar);return t&&oe(t)?[t]:[]}function Cc(e){if(e.closest("[data-bloom]"))return!1;try{let t=new URL(e.href,location.origin);return t.origin===location.origin&&t.pathname==="/"}catch{return!1}}function dg(e){return[...e.querySelectorAll("a[href]")].find(Cc)??null}function mg(){let e=ae();return s("button",{class:lg("button"),attrs:{type:"button","data-bloom":"temporary-chat","aria-pressed":String(e),"aria-label":e?"Turn off temporary chat":"Temporary chat"},text:"Temporary"})}function fg(){let e=new Set;for(let t of ug()){let o=[...t.querySelectorAll('[data-bloom="temporary-chat"]')].find(r=>t.contains(r)),n=dg(t);if(!o)o=mg(),n?n.after(o):t.prepend(o);else{let r=ae();o.setAttribute("aria-pressed",String(r)),o.setAttribute("aria-label",r?"Turn off temporary chat":"Temporary chat")}e.add(o)}for(let t of document.querySelectorAll('[data-bloom="temporary-chat"]'))e.has(t)||t.remove()}function Ec(){if(!Ri){Ri=!0;try{fg()}finally{Ri=!1}}}function pg(e){let{target:t}=e;if(!(t instanceof Element))return;if(t.closest('[data-bloom="temporary-chat"]')){e.preventDefault(),e.stopPropagation(),wc(!ae());return}if(!Tc.store.openNewAsTemporary||ae())return;let o=t.closest("a[href]");!(o instanceof HTMLAnchorElement)||!Cc(o)||o.closest(`${u.sidebarScroll}, ${u.rail}, ${u.oldSidebar}, nav`)&&(e.preventDefault(),e.stopPropagation(),wc(!0))}var Mc=f({name:"TemporaryChat",description:"One click starts a temporary chat. Optionally make New chat temporary.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"ghost",enabledByDefault:!0,settings:Tc,styles:xc,onSettingsChange:Ec,start(){Vn=new AbortController,document.addEventListener("pointerdown",pg,{capture:!0,signal:Vn.signal}),Oi=C(e=>I(e)&&Ec())},stop(){Vn?.abort(),Vn=void 0,Oi?.(),Oi=void 0;for(let e of document.querySelectorAll('[data-bloom="temporary-chat"]'))e.remove()}});var Be=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)'].join(","),Pi=p({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function gg(){let e=[`${Be}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${Be}>*{margin-block:0!important}`];return Pi.store.italic||e.push(`${Be}{font-style:inherit!important}`),Pi.store.quotes||(e.push(`${Be}{quotes:none!important}`),e.push(`${Be}::before,${Be}::after,${Be} p::before,${Be} p::after{content:none!important}`)),e.join(`
`)}var Lc=f({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:Pi,styles:gg});var hg=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],bg=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",Ag='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',kc=p({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function yg(){let e=`${kc.store.width}rem`;return`:is(${bg}){${hg.map(t=>`${t}:${e}!important`).join(";")}}:is(${Ag}){max-width:min(100%, ${e})!important}`}var Bc=f({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:kc,styles:yg});var vg=[cs,qs,ks,Os,Ks,Ws,Js,ol,ml,vl,xl,kl,Il,Ol,Nl,Zl,nc,cc,mc,Ac,Sc,Mc,Lc,Bc],Di=vg;var qg=new x("Bloom"),Ic="2.0.58";async function Hi(){va();for(let e of Di)e.updatedAt=Ha[e.name];ea(Di),await Vi(),Eo("base",aa),Da(),Ro("Init"),Fo().then(()=>{Ki(),Ro("DOMContentLoaded")}),await Sa(),Ro("HostReady"),qg.info(`Bloom++ ${Ic} ready`)}var Oc=new x("Boot");if(window===window.top){let e=$.Bloom;e&&Oc.warn("Replacing another Bloom++ instance",e.VERSION),Object.defineProperty($,"Bloom",{value:Ni,configurable:!0,writable:!0}),Hi().catch(t=>Oc.error("Startup failed",t))}})();
