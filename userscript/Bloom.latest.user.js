// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.67
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

/* Bloom++ v2.0.67. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Fc=Object.defineProperty;var Yc=(e,t)=>{for(var o in t)Fc(e,o,{get:t[o],enumerable:!0})};var S=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var Se=(e,t,o)=>Math.min(o,Math.max(t,e)),w=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Wi=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,ae=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,b=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function Lo(e,t){return`${e} ${t}${e===1?"":"s"}`}async function zi(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function we(e){try{return JSON.parse(e)}catch{return}}var te=typeof unsafeWindow>"u"?window:unsafeWindow;var ji={};Yc(ji,{VERSION:()=>Nc,init:()=>Ki,plugins:()=>Ne});var Qc=new S("Styles"),Ot=new Map,Vi=new Set,Pt=new Map,_n=!0;function Ji(){let e=document.adoptedStyleSheets.filter(t=>!Vi.has(t));document.adoptedStyleSheets=[...e,...Ot.values()]}function Zi(e){document.readyState==="loading"||e.parentNode===document.head||document.head.append(e)}function Kc(e,t){let o=Pt.get(e);o||(o=document.createElement("style"),o.id=`bloom-style-${e}`,Pt.set(e,o)),o.textContent!==t&&(o.textContent=t),Zi(o)}function ko(e,t){if(_n)try{let o=Ot.get(e);o||(o=new te.CSSStyleSheet,Ot.set(e,o),Vi.add(o)),o.replaceSync(t),Ji();return}catch(o){Qc.warn("Constructed style sheets unavailable, using <style> after parsing",o),_n=!1,Ot.delete(e)}Kc(e,t)}function er(e){Ot.delete(e)&&_n&&Ji(),Pt.get(e)?.remove(),Pt.delete(e)}function Xi(){for(let e of Pt.values())Zi(e)}var E=e=>(...t)=>t.map(o=>e+o).join(" "),Bo=(...e)=>e.filter(Boolean).join(" "),rt=e=>e.length?`${e.map(t=>`${t}:not([data-bloom])`).join(",")}{display:none!important}`:"";function f(e){return e}var Re=new S("Storage"),jc="bloompp",Io="kv",$i=null;function Wc(){return $i??=new Promise((e,t)=>{let o=indexedDB.open(jc,1);o.onupgradeneeded=()=>{o.result.objectStoreNames.contains(Io)||o.result.createObjectStore(Io)},o.onsuccess=()=>e(o.result),o.onerror=()=>t(o.error)}),$i}function tr(e,t){return Wc().then(o=>new Promise((n,r)=>{let i=t(o.transaction(Io,e).objectStore(Io));i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)}))}async function zc(e){if(typeof GM_getValue=="function")try{return await GM_getValue(e)}catch(t){Re.warn("GM read failed",t);return}}async function Vc(e){try{return await tr("readonly",t=>t.get(e))}catch(t){Re.warn("IndexedDB read failed",t);return}}function Jc(e){try{return localStorage.getItem(e)??void 0}catch{return}}async function Oo(e){return Promise.all([zc(e),Vc(e),Jc(e)])}function _i(e,t){typeof GM_addValueChangeListener=="function"&&GM_addValueChangeListener(e,(o,n,r,i)=>{i&&t(r)}),addEventListener("storage",o=>{o.key===e&&t(o.newValue)})}function or(e){if(typeof GM_setValue=="function")try{GM_setValue(e,{})}catch(t){Re.warn("GM delete failed",t)}try{localStorage.removeItem(e)}catch(t){Re.warn("localStorage delete failed",t)}tr("readwrite",t=>t.delete(e)).catch(t=>Re.warn("IndexedDB delete failed",t))}function Po(e,t){let o=JSON.stringify(t);if(typeof GM_setValue=="function")try{GM_setValue(e,t)}catch{GM_setValue(e,o)}try{localStorage.setItem(e,o)}catch(n){Re.warn("localStorage write failed",n)}tr("readwrite",n=>n.put(o,e)).catch(n=>Re.warn("IndexedDB write failed",n))}var Zc=new S("Settings"),rr="BloomSettings",Xc=100,$c=["GM","IndexedDB","localStorage"],it={plugins:{}},Ro=new Set,ir=new Set,Rt;function ts(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=we(t);return!w(t)||!w(t.plugins)||!Object.keys(t.plugins).length?null:t}var nr=e=>e==null||e===""||(Array.isArray(e)?!e.length:w(e)&&!Object.keys(e).length);function _c(e){return nr(e)?0:Array.isArray(e)?12+Math.min(e.length,40):w(e)?12+Math.min(Object.keys(e).length,40):3}function eu(e){let t=0;for(let o of Object.values(e.plugins))if(w(o))for(let[n,r]of Object.entries(o))n!=="enabled"&&(t+=_c(r));return t}var es=e=>Object.values(e.plugins).filter(t=>w(t)&&t.enabled===!0).length;function tu(e){let t=e.map((i,s)=>i&&{candidate:i,index:s,score:eu(i)}).filter(i=>i!=null).toSorted((i,s)=>s.score-i.score||(i.score?0:es(s.candidate)-es(i.candidate))||i.index-s.index);if(!t.length)return null;let[o,...n]=t,r=structuredClone(o.candidate);for(let{candidate:i}of n)for(let[s,l]of Object.entries(i.plugins)){if(!w(l))continue;let c=r.plugins[s]??={};for(let[d,m]of Object.entries(l))d==="enabled"?!("enabled"in c)&&m===!0&&(c.enabled=!0):nr(c[d])&&!nr(m)&&(c[d]=structuredClone(m));Object.keys(c).length||delete r.plugins[s]}return{bag:r,source:$c[o.index]}}async function os(){let e=await Oo(rr),t=tu(e.map(ts));t&&(it.plugins=t.bag.plugins,Zc.info("Loaded settings from",t.source))}var ns=(e,t)=>`${e}
${t}`;function rs(){Rt=void 0,ir.clear(),Po(rr,it)}function ou(e){let t=ts(e);if(!t)return;let o=[];for(let n of new Set([...Object.keys(it.plugins),...Object.keys(t.plugins)])){let r=it.plugins[n]??={},i=w(t.plugins[n])?t.plugins[n]:{};for(let s of new Set([...Object.keys(r),...Object.keys(i)]))ir.has(ns(n,s))||JSON.stringify(r[s])===JSON.stringify(i[s])||(i[s]===void 0?delete r[s]:r[s]=i[s],o.push([n,s]))}for(let[n,r]of o)for(let i of Ro)i(n,r)}function nu(){Rt&&(clearTimeout(Rt),rs())}var De=(e,t)=>it.plugins[e]?.[t];function He(e,t,o){let n=it.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,ir.add(ns(e,t)),clearTimeout(Rt),Rt=setTimeout(rs,Xc);for(let r of Ro)r(e,t)}function st(e){return Ro.add(e),()=>void Ro.delete(e)}function sr(e){return e.type==="component"?void 0:e.default}function p(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>De(t.pluginName,n)??(e[n]&&sr(e[n])),set:(o,n,r)=>(He(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&De(t.pluginName,o)!==void 0&&He(t.pluginName,o)}};return t}var is=e=>{let t=()=>{let o=De("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();He("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},Do=is("pinnedPlugins"),Ho=is("starredPlugins");addEventListener("pagehide",nu);_i(rr,ou);var No=new S("PluginManager"),Ne=new Map,Dt=new Set,ss=new Set,ar=new Set;function as(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),Ne.set(t.name,t)}var Ht=e=>!!e.required||(De(e.name,"enabled")??!!e.enabledByDefault);var lr=e=>`plugin-${e.name}`;function ls(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?ko(lr(e),t):er(lr(e))}function cs(e){if(!Dt.has(e.name))try{ls(e),e.start?.(),Dt.add(e.name)}catch(t){No.error(`Failed to start ${e.name}`,t)}}function ru(e){if(Dt.delete(e.name)){er(lr(e));try{e.stop?.()}catch(t){No.error(`Failed to stop ${e.name}`,t)}}}var us=e=>e.startAt??"HostReady";function Go(e){ss.add(e);for(let t of Ne.values())us(t)===e&&Ht(t)&&cs(t);No.info(`${e}: ${[...Dt].join(", ")}`)}function ds(e,t){He(e.name,"enabled",t),t?ss.has(us(e))&&cs(e):ru(e);for(let o of ar)o()}function ms(e){return ar.add(e),()=>void ar.delete(e)}st((e,t)=>{let o=Ne.get(e);if(!(!o||t==="enabled"||!Dt.has(e)))try{ls(o),o.onSettingsChange?.(t)}catch(n){No.error(`Settings change failed for ${e}`,n)}});var fs=`/*
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
`;var su=new S("Dom");function a(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var ps=document.createElement("template");function gs(e){return ps.innerHTML=e.trim(),ps.content.firstElementChild.cloneNode(!0)}var Gt=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),V=(e,t=document)=>[...t.querySelectorAll(e)].find(Gt)??null,au=16,lu="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function hs(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([lu],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function Ut(e){document.hidden?setTimeout(e,au):requestAnimationFrame(e)}function at(e){let t=!1;return()=>{t||(t=!0,Ut(()=>{t=!1;try{e()}catch(o){su.error("Scheduled task failed",o)}}))}}var Uo=new Set,Fo=[],Nt,cu=at(()=>{let e=Fo;Fo=[];for(let t of Uo)t(e)});function L(e){return Uo.add(e),Nt||(Nt=new MutationObserver(t=>{Fo.push(...t),cu()}),Nt.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{Uo.delete(e),!Uo.size&&(Nt?.disconnect(),Nt=void 0,Fo=[])}}var uu=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),N=e=>!e.length||e.some(t=>!uu(t.target));function Ge(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size");return}e.getAttribute("data-bloom-text")!==t&&(e.hasAttribute("data-bloom-text")||e.style.setProperty("--bloom-text-size",getComputedStyle(e).fontSize),e.setAttribute("data-bloom-text",t))}var du=new S("Events");function Yo(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){du.error(`Listener for ${String(t)} failed`,r)}}}}var u={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",modelTrigger:'[data-testid="model-switcher-dropdown-button"], button[aria-label="Model selector" i]',modelItem:'[role="menu"] [data-testid^="model-switcher-"], [role="menuitem"][data-testid^="model-switcher-"]',homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]',headerMore:'button[aria-label="More" i], button[aria-label="\u66F4\u591A"]'};var bs=/[​-‍﻿]/g,Ee=()=>V(u.composerInput),Te=e=>e instanceof HTMLElement&&e.matches(u.composerInput),Q=(e=Ee())=>e?.closest("form")??document.querySelector(u.oldComposerForm);function C(e=Ee()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(bs,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(bs,"").trim()}var mu=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function ne(e,t=Ee()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return mu?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function As(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:s,value:l}=e;return{first:!l.slice(0,i).includes(`
`),last:!l.slice(s).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var ys=e=>{let t=Q();return(t&&V(e,t))??V(e)},lt=()=>ys(u.stopButton),fu=()=>{let e=ys(u.sendButton);return e&&!e.matches(u.stopButton)?e:null};function Qo(){let e=fu();if(e){e.disabled||e.click();return}Ee()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var vs=()=>Gt(lt());var Ss=new S("Network"),pu=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,gu=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,jo=1e3,hu=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),K=Yo(),cr=new Map,qs=new Map,bu=1,re=e=>e?cr.get(e)??null:null;function Ko(e){let t=cr.get(e);return t||cr.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var ws=e=>e==="user"||e==="assistant";function Es(e){let t=e.author?.role;if(!e.id||!ws(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(c=>typeof c=="string").join(`
`).trim(),i=n.filter(c=>w(c)&&c.content_type==="image_asset_pointer").length,s=e.metadata?.attachments,l=Array.isArray(s)&&s.length>0;return!r&&!i&&!l?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*jo:null,text:r,hasFiles:l,imageCount:i}}var Ts=e=>e.filter((t,o)=>t.role==="user"||e[o+1]?.role!=="assistant"),ur=e=>e.map(t=>t.createTime).filter(t=>t!=null);function Au(e,t){let o=ur(e),n=ur(t);return!o.length||!n.length?!1:Math.max(...o)<Math.min(...n)}function yu(e){let t=ur(e);if(t.length<2)return e;let[o]=t,n=o-e.length;return e.map((i,s)=>(i.createTime!=null&&(n=i.createTime),{message:i,index:s,time:i.createTime??n})).toSorted((i,s)=>i.time-s.time||i.index-s.index).map(i=>i.message)}function vu(e,t){let o=t.filter(w).map(l=>w(l.message)?l.message:l);for(let l of o)l.id&&l.create_time&&e.times.set(l.id,l.create_time*jo);let n=o.map(Es).filter(l=>l!=null),r=new Set(n.map(l=>l.id)),i=e.chain.filter(l=>!r.has(l.id)),s=Au(n,i)?[...n,...i]:[...i,...n];return e.chain=Ts(yu(s)),e}function qu(e,t){if(!w(t)||!(w(t.mapping)||Array.isArray(t.messages)))return null;let o=Ko(e);if(typeof t.title=="string"&&t.title&&(o.title=t.title),Array.isArray(t.messages))return vu(o,t.messages);let n=t.mapping;for(let l of Object.values(n)){let c=l.message?.create_time;l.message?.id&&c&&o.times.set(l.message.id,c*jo)}let r=[],i=new Set,s=typeof t.current_node=="string"?t.current_node:null;for(;s&&!i.has(s)&&n[s];){i.add(s);let l=n[s].message,c=l?Es(l):null;c&&r.push(c),s=n[s].parent??null}return r.length&&(o.chain=Ts(r.toReversed())),o}function xu(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}function Su(e){if(typeof e?.body!="string")return null;let t=we(e.body);return w(t)&&typeof t.conversation_id=="string"?t.conversation_id:null}function wu(e,t){if(!w(e))return;typeof e.type=="string"&&hu.has(e.type)&&(t.handoff=!0);let o=w(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(Ko(e.conversation_id).title=e.title,K.emit("conversation",Ko(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&ws(n.author?.role)){let r=n.create_time*jo;t.conversationId&&Ko(t.conversationId).times.set(n.id,r),K.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function Eu(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:s}=await o.read();if(i)break;r+=n.decode(s,{stream:!0});let l=r.split(`
`);r=l.pop()??"";for(let c of l){if(!c.startsWith("data:"))continue;let d=c.slice(5).trim();d&&d!=="[DONE]"&&wu(we(d),t)}}}async function Tu(e,t,o){let n={conversationId:t,error:!1,handoff:!1};qs.set(e,t),K.emit("generate-start",{requestId:e,conversationId:t});try{let r=await o;r.ok?r.headers.get("content-type")?.includes("event-stream")&&await Eu(r.clone(),n):n.error=!0}catch(r){let i=r instanceof DOMException&&r.name==="AbortError";n.handoff||=i,n.error||=!i}finally{qs.delete(e),K.emit("generate-end",{requestId:e,...n})}}async function Cu(e,t){try{let o=await t;if(!o.ok)return;let n=qu(e,await o.clone().json());n&&K.emit("conversation",n)}catch(o){Ss.debug("Conversation read skipped",o)}}function Mu(e,t,o){let n=xu(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&pu.test(n.pathname)){Tu(bu++,Su(t),o);return}let i=r==="GET"&&n.pathname.match(gu)?.[1];i&&Cu(i,o)}var xs=!1;function Cs(){if(xs)return;xs=!0;let e=te.fetch,t=function(o,n){let r=e.call(this??te,o,n);try{Mu(o,n,r)}catch(i){Ss.error("Fetch tap failed",i)}return r};te.fetch=typeof exportFunction=="function"?exportFunction(t,te):t}var Lu="__reactContainer$",Ms="__reactFiber$";function Wo(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var dr=(e,t)=>Object.keys(e.wrappedJSObject??e).some(o=>o.startsWith(t)),pe=e=>!dr(document,Lu)||dr(e,Ms);function Ft(){return document.body?Promise.resolve():new Promise(e=>{let t=new MutationObserver(()=>{document.body&&(t.disconnect(),e())});t.observe(document,{childList:!0,subtree:!0})})}async function Ls(){await Ft();let e=Date.now()+8e3;for(;!dr(document.body,Ms)&&Date.now()<e;)await new Promise(t=>setTimeout(t,100))}var ku=new S("Route"),ks=/\/c\/(?!local-)([\w-]+)/,Bu=500,pr=e=>{try{return new URL(e,location.origin).pathname.match(ks)?.[1]??null}catch{return null}},h=()=>location.pathname.match(ks)?.[1]??null,Zo=()=>location.pathname==="/",Iu=/^\/g\/g-p-[^/]+(?:\/project)?\/?$/,Bs=()=>Iu.test(location.pathname),le=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",Vo=new Set,Jo=location.href,fr=h(),zo;function mr(){if(location.href===Jo)return;let e={prevHref:Jo,href:location.href,prevId:fr,id:h()};Jo=e.href,fr=e.id;for(let t of Vo)try{t(e)}catch(o){ku.error("Route listener failed",o)}}function Ou(){let e=new AbortController,{navigation:t}=te;t?.addEventListener("currententrychange",()=>queueMicrotask(mr),{signal:e.signal}),addEventListener("popstate",mr,{signal:e.signal});let o=setInterval(mr,Bu);return()=>{e.abort(),clearInterval(o)}}function ce(e){return Vo.add(e),zo||(Jo=location.href,fr=h(),zo=Ou()),()=>{Vo.delete(e),!Vo.size&&(zo?.(),zo=void 0)}}var Pu=["data-turn","data-message-author-role"],Ru=/:(user|assistant)$/,gr=`${u.messageUnit}, ${u.oldMessage}`,hr=e=>e==="user"||e==="assistant",Rs=()=>!!document.querySelector(u.timelineScroll),ct=()=>Rs()?V(u.timelineScroll):document;function Qt(){if(Rs())return V(u.timelineScroll);let e=document.querySelector(u.turn);for(let t=e?.parentElement;t;t=t.parentElement){let{overflowY:o}=getComputedStyle(t);if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight)return t}return document.scrollingElement}var ut=e=>e.getAttribute("data-chatgpt-search-unit-key")?.match(Ru)?.[1]??null,Ds=e=>[...e.querySelectorAll(u.searchUnit)].filter(t=>ut(t)&&!t.parentElement?.closest(u.searchUnit)),Is=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function Yt(e){let t=Is(e);return t.length?t:[...new Set([...e.querySelectorAll(gr)].flatMap(Is))]}function dt(e=ct()){if(!e)return[];let t=Ds(e);return t.length?t:[...e.querySelectorAll(gr)].filter(o=>!o.parentElement?.closest(gr))}function Du(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function Hu(e){for(let t of Pu){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(hr(o))return o}return e.querySelector(u.markdown)||e.querySelector(u.generatedImage)?"assistant":null}var Nu=e=>!e.parentElement?.closest(u.turn);function Ce(){let e=re(h())?.chain??[];return[...ct()?.querySelectorAll(u.turn)??[]].filter(Nu).flatMap(o=>{let n=Ds(o),r=n.length?n.map(i=>({el:i,known:ut(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=d=>!n.some(m=>m.contains(d))&&b(d.textContent??""),s=[...o.querySelectorAll(u.assistantMarkdown)].find(d=>i(d)&&!Xo.test(b(d.textContent??""))),l=[...o.querySelectorAll(u.activityHeader)].findLast(i),c=s??l;c&&r.push({el:c,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?Yt(o):dt(o).flatMap(Yt),s=n??Hu(o)??Du(i,e)??(r%2?"assistant":"user"),l=o.closest(u.turn)??o,c=!o.closest(u.searchUnit)&&!!l.querySelector(u.turnBusy),d=s==="assistant"&&(o.matches(u.turnBusy)||!!o.querySelector(u.turnBusy)||c);return{el:o,role:s,messageIds:i,streaming:d}})}var Gu="[data-bloom], .sr-only",Hs=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,Xo=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,Os=new WeakMap;function mt(e){let o=(e.el.closest(u.turn)??e.el).textContent?.length??0,n=Os.get(e.el);if(n?.length===o)return n.summary;let r=Uu(e);return Os.set(e.el,{length:o,summary:r}),r}function Ps(e){let t=new Set,o=[];for(let n of e.querySelectorAll(u.assistantMarkdown)){if(n.closest(u.searchUnit))continue;let r=b(n.textContent??"");!r||Xo.test(r)||Hs.test(r)||t.has(r)||(t.add(r),o.push(r))}return o}function Uu(e){let t=e.el.querySelectorAll(u.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.closest(u.turn);if(e.role==="assistant"&&o&&e.el.matches(u.assistantMarkdown)&&!e.el.closest(u.searchUnit)){let c=Ps(o);if(c.length)return c.join(" \xB7 ")}let n=e.el.querySelector(e.role==="assistant"?u.markdown:".whitespace-pre-wrap")??e.el,i=[...n.querySelectorAll(Gu)].map(c=>b(c.textContent??"")).filter(Boolean).reduce((c,d)=>c.replace(d,`
`),n.innerText||n.textContent||""),s=i.split(`
`).map(b).filter(c=>c&&!Hs.test(c)&&!Xo.test(c));if(s.length)return s.join(" ");if(e.role==="assistant"&&o){let c=Ps(o);if(c.length)return c.join(" \xB7 ")}let l=i.split(`
`).map(b).filter(c=>Xo.test(c));return l.length?l.at(-1)??"":e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function $o(e){return e.text?b(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var Ns=e=>e.matches(u.timelineScroll)&&getComputedStyle(e).flexDirection==="column-reverse";var Fu=250,Yu=400,Qu=6e4,Ku=5e3,ju=`:is(${u.turn}) :is(${u.turnBusy})`,v=Yo(),tn=new Set,br=new Set,Me=!1,Us=0,ft=null,pt=!1,_o=!1,Kt=0,on=!1,jt=null,Gs=!1,B=()=>({generating:Me,conversationId:h()}),Fs=()=>vs()||!!ct()?.querySelector(ju);function Wu(){let e=Fs();return e?_o||(Kt=0,on=!0):_o=!1,[...tn].some(t=>!br.has(t))||e&&!_o||Date.now()<Kt}function zu(){return jt?.error?"error":pt?"stopped":"done"}function Vu(){ft=null,Me=!1,on=!1,v.emit("fall",{conversationId:h(),outcome:zu()}),pt=!1,jt=null}function Ys(){let e=Wu();e&&!Me&&(Me=!0,Us=Date.now(),pt=!1,jt=null,v.emit("rise",{conversationId:h()})),e||!Me?ft=null:ft==null?ft=Date.now():Date.now()-ft>=Yu&&Vu()}function en(){Ys(),v.emit("tick",B())}function Ju({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(Me||Date.now()-Us<Qu);if(!o&&Me){for(let n of tn)br.add(n);_o=Fs(),Kt=0,on=!1,ft=null,Me=!1,pt=!1,jt=null,v.emit("fall",{conversationId:e,outcome:"left"})}v.emit("context",{prevId:e,id:t,migrated:o}),en()}function Zu(e){e.target instanceof Element&&e.target.closest(u.stopButton)&&(pt=!0,Kt=0)}function Qs(){Gs||(Gs=!0,K.on("generate-start",({requestId:e})=>{tn.add(e),en()}),K.on("generate-end",e=>{tn.delete(e.requestId),!br.delete(e.requestId)&&(jt=e,Kt=e.handoff&&!e.error&&!pt&&!on?Date.now()+Ku:0,en())}),ce(Ju),document.addEventListener("click",Zu,!0),hs(en,Fu),Wo().then(()=>L(Ys)))}var Ks={BetterNavigator:1791056083e3,BetterQuotes:1791056083e3,ChatListStatus:1791056083e3,ChatStateFavicons:1791056083e3,Cleaner:1791056083e3,ComposerOpacity:1791056083e3,Continue:1791056083e3,CustomSidebarIdentity:1791056083e3,GreetingCustomizer:1791056083e3,InputHistory:1791056083e3,MessageTimestamps:1791077669e3,NoDictation:1791056083e3,NoShareLink:1791056083e3,NoSidebarIdentity:1791056083e3,PromptQueue:1791056083e3,RecentTopics:1791056083e3,ResponseNotification:1791056083e3,Settings:1791056083e3,SidebarIdentityOpacity:1791056083e3,StarChats:1791056083e3,StreamerMode:1791056083e3,TemporaryChat:1791056083e3,UserQuotes:1791056083e3,WiderChat:1791056083e3};var A=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,Xu="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",$u={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${Xu}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:A('<path d="M18 6 6 18M6 6l12 12"/>'),gear:A('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:A('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:A('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:A('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:A('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:A('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:A('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:A('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:A('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:A('<path d="m6 9 6 6 6-6"/>'),play:A('<path d="M7 4v16l13-8z"/>'),plus:A('<path d="M12 5v14M5 12h14"/>'),check:A('<path d="m5 12 5 5 9-10"/>'),alert:A('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:A('<path d="M4 5h16v11H9l-5 4z"/>'),layout:A('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:A('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:A('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:A('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:A('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:A('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:A('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:A('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:A('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:A('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:A('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:A('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:A('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:A('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:A('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:A('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),ghost:A('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},P=e=>gs($u[e]);var ge="data-bloom-tip",Ar=6,yr=8,Ue,js=null;function gt(e){if(e===js)return;if(js=e,!e){Ue?.remove();return}Ue??=a("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),Ue.textContent=e.getAttribute(ge),document.body.append(Ue);let t=e.getBoundingClientRect(),{width:o,height:n}=Ue.getBoundingClientRect(),r=t.bottom+Ar+n<=innerHeight-yr;Ue.style.left=`${Se(t.left+t.width/2-o/2,yr,innerWidth-o-yr)}px`,Ue.style.top=`${r?t.bottom+Ar:t.top-Ar-n}px`}var Ws=e=>e instanceof Element?e.closest(`[${ge}]`):null;function zs(){let e=new AbortController,t={passive:!0,signal:e.signal};return document.addEventListener("pointerover",o=>gt(Ws(o.target)),t),document.addEventListener("pointerout",o=>o.relatedTarget||gt(null),t),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&gt(Ws(o.target)),t),document.addEventListener("focusout",()=>gt(null),t),document.addEventListener("pointerdown",()=>gt(null),t),()=>{e.abort(),gt(null)}}function vr(e,t,o,n=!1){let r=a("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let s=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(s)),t(s)}),r}function U(e,t,o){return a("button",{class:Bo("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button","data-bloom":"control"},on:{click:t}})}function J(e,t,o,n){let r=a("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":t,"data-bloom":"control",[ge]:t},on:{click:o}},P(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function nn(e,t,o,n,r,i){let s=a("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});s.value=String(e);let l=a("output",{text:`${s.value}${r}`});return s.addEventListener("input",()=>{l.textContent=`${s.value}${r}`,i(Number(s.value))}),a("div",{class:"bloom-slider"},s,l)}function qr(e,t,o){let n=a("select",{class:"bloom-select"},...t.map(r=>a("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function Wt(e,t,o="",n="text"){let r=a("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var _u=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,Vs=/\S+@\S+\.\S+/,ed=3,td=/^\/g\/(g-p-[^/]+)\//,od=/^g-p-[0-9a-f]+-?/i,Js=e=>!!e.closest(".sr-only"),xr=e=>!!e?.querySelector(u.menuButton);function Zs(){return[...document.querySelectorAll(u.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(xr)).filter(e=>e!=null)}function Xs(){let e=[...document.querySelectorAll(u.oldProfile)];if(e.length)return e.map(o=>{let n=o.parentElement?.children.length===1?o.parentElement:o;return{kind:"profile",anchor:n,insert:r=>n.before(r)}});let t=Zs().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(u.rail)){let n=[...o.children].find(xr);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}var Sr=e=>!e.closest("[data-bloom]")&&(!!e.querySelector("img, [class*=rounded-full]")||ta(e).some(t=>!Js(t))),$s=e=>[...e.parentElement?.children??[]].find(t=>t!==e&&t instanceof HTMLElement&&Sr(t))??null;function _s(){let e=[...document.querySelectorAll(u.oldProfile)];return e.length?e:[...Zs(),...[...document.querySelectorAll(u.rail)].map(o=>[...o.children].findLast(xr))].map(o=>[...o?.querySelectorAll(u.menuButton)??[]].findLast(n=>Sr(n)||$s(n))).filter(o=>o!=null)}var ea=()=>_s().map(e=>Sr(e)?e:$s(e)).filter(e=>e!=null);function ta(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!b(t.textContent??"")&&!(t instanceof SVGElement))}var nd=e=>{if(/rounded-full/.test(e.getAttribute("class")??""))return!0;if(!e.clientWidth)return!1;let{borderRadius:t}=getComputedStyle(e);return t.includes("%")||Number.parseFloat(t)>=e.clientWidth/2};function rn(e,t,o){for(let n of e.querySelectorAll(`[${t}]`))n!==o&&n.removeAttribute(t);o&&!o.hasAttribute(t)&&o.setAttribute(t,"")}function rd(e,t){if(b(e.textContent??"").length>ed)return null;let o=e.closest("button");for(let n=e;n&&n!==t&&n!==o;n=n.parentElement)if(nd(n))return n;return null}function wr(e,t){e.hasAttribute(`data-bloom-${t}`)||e.setAttribute(`data-bloom-${t}`,"");let o=e.querySelector("img:not([data-bloom] img)"),n=ta(e),r=o?null:n.map(m=>rd(m,e)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),s=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");rn(e,`data-bloom-${t}-avatar`,s);let l=n.filter(m=>!s?.contains(m)&&!Js(m)),c=l.find(m=>_u.test(b(m.textContent??""))),d=l.find(m=>Vs.test(m.textContent??""));rn(e,`data-bloom-${t}-plan`,c),rn(e,`data-bloom-${t}-email`,d),rn(e,`data-bloom-${t}-name`,l.find(m=>m!==c&&m!==d))}function id(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function sn(){return _s().map(id).find(e=>e!=null)??[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&(Vs.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var zt=e=>[...document.querySelectorAll(u.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&pr(t.href)===e);function oa(e){let t=zt(e).find(o=>b(o.textContent??""));return t?b(t.textContent??""):null}function na(e){let t=new URL(e,location.origin).pathname.match(td)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!pr(n.href)&&b(n.textContent??""));return o?b(o.textContent??""):t.replace(od,"").replaceAll("-"," ")||null}var Er=0,an;function sd(e){if(!N(e))return;for(let o of ea())wr(o,"profile");let t=sn();t&&wr(t,"menu")}function ue(){Er++;let e=!0;return Ft().then(()=>{e&&Er&&!an&&(an=L(sd))}),()=>{e&&(e=!1,!--Er&&(an?.(),an=void 0))}}var ad=new S("SettingsPanel"),g=E("bloom-settings-"),ld=10080*60*1e3,cd=3e3,ra="Toggle features. Some need a reload. Click the sliders icon to configure.",ud=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],dd=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],md={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},sa=new Set(["chat","ui","privacy"]),j=null,Ye="all",Tr="all",ln="",Cr=[],aa=()=>[...Ne.values()].filter(e=>!e.hidden),fd=e=>!!e.updatedAt&&Date.now()-e.updatedAt<ld;function pd(e){switch(Ye){case"favorites":return Ho.has(e.name);case"recent":return fd(e);case"all":return!0;case"other":return!e.tags.some(t=>sa.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(Ye)}}function gd(e){switch(Tr){case"all":return!0;case"enabled":return Ht(e);case"disabled":return!Ht(e)}}function hd(e){let t=ln.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function bd(e){let t=Do.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return Ye==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var la=e=>e.settings?.def??{},Ad=e=>Object.values(la(e)).some(t=>t.type!=="custom");function yd(e,t,o){let n=De(e.name,t)??sr(o),r=i=>He(e.name,t,i);switch(o.type){case"boolean":return vr(n,r,o.description??t);case"slider":return nn(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return qr(n,o.options,r);case"string":return Wt(n,r,o.placeholder);case"number":return Wt(String(n),i=>r(Number(i)),"","number");case"component":{let i=a("div",{class:g("component")});return Cr.push(o.render(i)),i}case"custom":return null}}var vd=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function ca(e){if(!j)return;let t=Object.entries(la(e)).filter(([,i])=>i.type!=="custom").map(([i,s])=>{let l=yd(e,i,s),c=s.type==="boolean",d=s.type!=="component"&&a("div",{class:g("field-label"),text:vd(i)}),m=s.description&&a("div",{class:g("field-desc"),text:s.description});return a("div",{class:g("field",c?"field-inline":"field-stacked")},(d||m)&&a("div",{class:g("field-text")},d,m),l)}),o,n=U("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},cd);return}clearTimeout(o),e.settings?.reset(),Vt(),ca(e)},"danger"),r=a("div",{class:g("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&Vt()}},a("div",{class:g("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},a("div",{class:g("popup-header")},a("div",{class:g("card-icon")},P(e.icon)),a("div",{class:g("popup-title")},a("div",{class:g("card-name"),text:e.name}),a("div",{class:g("popup-authors"),text:e.authors.join(", ")})),J("close","Close",Vt)),a("p",{class:g("popup-desc"),text:e.description}),a("div",{class:g("fields")},...t),a("div",{class:g("popup-footer")},n)));j.querySelector(`.${g("modal")}`)?.append(r)}function Vt(){for(let e of Cr)e();Cr=[],j?.querySelector(`.${g("popup-backdrop")}`)?.remove()}function ia(e){let t=Ht(e),o=Ho.has(e.name),n=Do.has(e.name),r=!!e.required;return a("div",{class:[g("card",t?"card-on":"card-off"),r?g("card-required"):""].filter(Boolean).join(" ")},a("div",{class:g("card-top")},a("div",{class:g("card-icon")},P(e.icon)),a("div",{class:g("card-actions")},J("star",o?"Unstar":"Star",()=>{Ho.toggle(e.name),Fe()},o),r?null:J("pin",n?"Unpin":"Pin to top",()=>{Do.toggle(e.name),Fe()},n),r?a("span",{class:g("required-mark"),attrs:{"aria-label":"Required",[ge]:"This plugin is required for Bloom++ to work"}},P("alert")):null,Ad(e)&&J("gear","Settings",()=>ca(e)),vr(t,i=>ds(e,i),r?`${e.name} is required`:`Enable ${e.name}`,r))),a("div",{class:g("card-name"),text:e.name}),a("div",{class:g("card-desc"),text:e.description,title:e.description}),a("div",{class:g("card-footer"),text:e.authors.join(", ")}))}function ua(){let e=aa().some(o=>!o.tags.some(n=>sa.has(n)));j?.querySelector(`.${g("tabs")}`)?.replaceChildren(...ud.filter(o=>o.id!=="other"||e).map(o=>a("button",{class:g("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===Ye)},on:{click:()=>{Ye=o.id,ua(),Fe()}}})))}function Fe(){if(!j)return;let e=aa().filter(pd),t=j.querySelector(`.${g("search")} input`);t&&(t.placeholder=`Search ${Lo(e.length,"plugin")}...`);let o=bd(e.filter(d=>hd(d)&&gd(d))),n=Ye==="all",r=n?o.filter(d=>!d.required):o,i=n?o.filter(d=>d.required):[],s=[...r.map(ia),...i.length?[a("div",{class:g("required-break"),attrs:{role:"separator"}}),...i.map(ia)]:[]],l=ln.trim()?"No plugins match your search.":md[Ye]??"No plugins available.";j.querySelector(`.${g("grid")}`)?.replaceChildren(...s.length?s:[a("div",{class:g("empty"),text:l})])}function qd(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),j?.querySelector(`.${g("popup-backdrop")}`)?Vt():ht())}var da,Mr;function xd(){if(j)return;let e=a("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=ln,e.addEventListener("input",()=>{ln=e.value,Fe()}),j=a("div",{class:`bloom-root ${g("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&ht()}},a("div",{class:g("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},a("div",{class:g("header")},a("div",{class:g("logo")},P("bloom")),a("h2",{class:g("title"),text:"Bloom++"}),a("span",{class:g("hint"),attrs:{"aria-label":ra,tabindex:"0",[ge]:ra}},P("info")),a("span",{class:g("version"),text:"v2.0.67"}),J("close","Close",ht)),a("div",{class:g("tabs"),attrs:{role:"tablist"}}),a("div",{class:g("toolbar")},a("label",{class:g("search")},P("search"),e),qr(Tr,dd,t=>{Tr=t,Fe()})),a("div",{class:g("grid")}))),j.addEventListener("keydown",t=>t.stopPropagation()),Mr=new AbortController,document.addEventListener("keydown",qd,{capture:!0,signal:Mr.signal}),document.body.append(j),ua(),Fe(),da=ms(Fe),e.focus(),ad.debug("Opened")}function ht(){Vt(),Mr?.abort(),da?.(),j?.remove(),j=null}var cn=()=>j?ht():xd();var ma=`/*
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
`;var Le=E("bloom-entry-"),wd=4,Lr="--bloom-entry-x",kr=1,bt=p({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar. The account menu and the userscript menu always open the panel.",default:!1},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:!0},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:e=>(e.append(U("Reset position",()=>{bt.store.entryPosition=kr})),()=>e.replaceChildren())},entryPosition:{type:"custom",default:kr}}),Qe=new Map,fa=!1,pa=[];function Ed(e,t,o){let n=e.currentTarget,r=t.clientWidth-n.offsetWidth;if(e.button!==0||r<=0||!t.classList.contains(Le("hover")))return;let i=bt.store.entryPosition,s=i,l=!1,c=new AbortController;n.setPointerCapture(e.pointerId),n.addEventListener("pointermove",m=>{!l&&Math.abs(m.clientX-e.clientX)<wd||(l=!0,o(),s=Se(i+(m.clientX-e.clientX)/r,0,kr),t.style.setProperty(Lr,String(s)))},{signal:c.signal});let d=()=>{c.abort(),l&&(bt.store.entryPosition=s,t.style.removeProperty(Lr))};n.addEventListener("pointerup",d,{signal:c.signal}),n.addEventListener("lostpointercapture",d,{signal:c.signal})}function Td(e){let t=!1,o=a("button",{class:Le("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),t||cn(),t=!1},pointerdown:r=>{t=!1,e!=="rail"&&Ed(r,n,()=>{t=!0})}}},P("bloom"),e!=="rail"&&a("span",{class:Le("label"),text:"Bloom++"})),n=a("div",{class:`bloom-root ${Le("wrap")} ${Le(e)}`,attrs:{"data-bloom":"entry"}},o);return n}function Cd(e){let t=a("div",{class:`bloom-root ${Le("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),cn()}}},P("bloom"),a("span",{text:"Bloom++"})),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function ga(){let{showSidebarEntry:e,showSidebarEntryOnHover:t}=bt.store,o=e||t?Xs():[];for(let[r,i]of Qe)r.isConnected&&o.some(s=>s.anchor===r)||(i.remove(),Qe.delete(r));for(let r of o){let i=Qe.get(r.anchor);if(i?.isConnected||!pe(r.anchor))continue;let s=i??Td(r.kind);Qe.set(r.anchor,s),r.insert(s)}for(let r of Qe.values())r.classList.toggle(Le("hover"),!e);let n=sn();n&&!n.querySelector('[data-bloom="menu-entry"]')&&Cd(n)}var ha=f({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:bt,styles:()=>`${ma}.${Le("hover")}{${Lr}:${bt.store.entryPosition}}`,start(){pa=[L(ga),zs(),ue()],!fa&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",cn),fa=!0)},stop(){for(let e of pa)e();for(let e of Qe.values())e.remove();Qe.clear(),ht()},onSettingsChange:ga});var ba=`/*
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
`;var I=E("bloom-nav-"),mn=80,Ld=1200,kd=2,Aa=3e4,Bd=200,Id=.9,Od=.3,Pd=12,Rd={user:"\u2753",assistant:"\u{1F916}"},Dd=["wheel","touchmove","pointerdown"],fn=p({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),O=null,G=[],je=-1,We=-1,At=null,un="",Ir=0,ya=[],$t=null,dn=null,Ke,Jt,Or="",Zt=[],Hd=e=>fn.store.showAssistant||e.role==="user",Nd=e=>e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.messageIds[0]||e.role;function Gd(e){return{role:e.role,summary:mt(e),ids:e.messageIds,turn:e,streaming:e.streaming}}function wa(e,t){let o=e.entries.at(-1);if(o?.role==="assistant"&&t.role==="assistant"){e.entries[e.entries.length-1]={...t,ids:[...new Set([...o.ids,...t.ids])]};return}e.entries.push(t)}function Ud(){let e=[];for(let t of Ce()){let o=Gd(t),n=Nd(t),r=e.at(-1);r?.key===n?wa(r,o):e.push({key:n,entries:[o]})}return e}function Fd(){let e=[];for(let t of re(h())?.chain??[]){let o={role:t.role,summary:$o(t),ids:[t.id],turn:null,streaming:!1},n=e.at(-1);t.role==="assistant"&&n?wa(n,o):e.push({key:t.id,entries:[o]})}return e}var va=e=>e.entries.flatMap(t=>t.ids);function Pr(e,t){let o=new Set(va(e));return va(t).some(n=>o.has(n))}var ze=e=>b(e.entries.find(t=>t.role==="user")?.summary??""),Br=(e,t)=>e.filter(o=>ze(o)===t).length,Rr=e=>({...e,turn:null,streaming:!1});function Yd(e,t){let o=new Set(t.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return e.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return Rr(r);let s=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return s&&s!==n.key?Rr(r):r})}))}function Qd(e,t){let o=t.entries.map((n,r)=>{let i=e.entries[r];if(!i)return n;let s=[...new Set([...n.ids,...i.ids])];return{...n,ids:s,summary:n.summary||i.summary}});for(let n of e.entries.slice(o.length))o.push(Rr(n));return{key:e.key,entries:o}}function Ea(){let e=Qt();if(!e)return!1;let t=e.clientHeight-e.scrollHeight;return e.scrollTop-t<=Math.abs(e.scrollTop)}function Kd(e,t){let o=Yd(e,t);if(!t.length)return o;if(!o.length)return t;let n=t.findIndex(c=>o.some(d=>d.key===c.key));if(n<0)return Ea()?t.concat(o):o.concat(t);let r=t[n]?.key,i=o.findIndex(c=>c.key===r),s=o.slice(0,i).concat(t.slice(0,n),o.slice(i)),l=s.findIndex(c=>c.key===r);for(let c=n;c<t.length;c++){let d=t[c];if(!d)continue;let m=s.findIndex(q=>q.key===d.key);if(m>=0){let q=s[m];q&&(s[m]=Qd(q,d)),l=m}else s.splice(l+1,0,d),l++}return s}function jd(e,t){let o=0,n=0,r=0;for(let i=1-e.length;i<t.length;i++){let s=0,l=0;for(let d=0;d<e.length;d++){let m=t[d+i],q=e[d];!m||!q||(Pr(q,m)?(s+=3,l++):ze(q)&&ze(q)===ze(m)&&s++)}let c=Ea()?i<r:i>r;(s>o||s===o&&l>n||s===o&&l===n&&c)&&(o=s,n=l,r=i)}return{score:o,offset:r}}function Wd(e,t){let o=e.entries.map((n,r)=>{let i=t.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of t.entries.slice(o.length))o.push({...n,turn:null});return{key:e.key,entries:o}}function zd(e){return e.map(t=>({key:t.key,entries:t.entries.map(o=>({...o}))}))}function Vd(e,t){if(!t.length)return e;if(!e.length)return t;let{score:o,offset:n}=jd(e,t),r=zd(e);if(o>0)for(let l=0;l<r.length;l++){let c=t[l+n],d=r[l];if(!c||!d)continue;let m=ze(d),q=!!m&&m===ze(c)&&Br(e,m)===1&&Br(t,m)===1;(Pr(d,c)||q)&&(r[l]=Wd(d,c))}let i=[],s=[];for(let l=0;l<t.length;l++){let c=t[l];if(!c)continue;let d=ze(c);!d||Br(r,d)>0||r.some(m=>Pr(m,c))||(o>0&&l<n?i.push(c):s.push(c))}return i.concat(r,s)}function Jd(){let e=h()??"";return e!==Or&&(Or=e,Zt=[]),Zt=Vd(Kd(Zt,Ud()),Fd()),Zt.flatMap(t=>t.entries).filter(Hd)}function Zd(e){for(let o of e)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!B().generating||e.some(o=>o.streaming))return;let t=e.at(-1);t&&(t.role==="assistant"||!fn.store.showAssistant?t.streaming=!0:e.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function Ta(){let e=Jd();return Zd(e),e}function Xd(e){let t=e.getBoundingClientRect(),o=t.top+t.height*Od,n=-1;return G.forEach((r,i)=>{let s=r.turn?.el.getBoundingClientRect();s&&s.top<=o&&(n=i)}),n===-1?G.findIndex(r=>r.turn):n}function qa(e){fn.store.jumpEffect==="border"&&(e.classList.add(I("flash")),setTimeout(()=>e.classList.remove(I("flash")),Ld))}function pn(e){let t=G[e],o=Qt();if(!t||!o)return;if(!t.turn&&!t.ids.length){We=e,Xt(),o.scrollTo({top:Ns(o)?0:o.scrollHeight});return}We=e,At=e?null:{chat:h(),first:t.ids[0],until:Date.now()+Aa},Xt();let n=t.turn?.el;if(n?.isConnected){let d=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:d<o.clientHeight*kd?"smooth":"auto"}),qa(n);return}let r=G.findIndex(d=>d.turn),i=r>=0&&e<r?-1:1,s=++Ir,l=Date.now()+Aa,c=()=>{let d=Qt();if(s!==Ir||Date.now()>l||!d)return;G=Ta();let m=G.find(z=>z.ids.some(y=>t.ids.includes(y)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),qa(m),We=G.findIndex(z=>z.turn?.el===m),Xt();return}let q=d.scrollTop;d.scrollBy({top:i*d.clientHeight*Id,behavior:"instant"}),d.scrollTop===q?setTimeout(c,Bd):requestAnimationFrame(c)};c()}function $d(e,t){return a("button",{class:I("row"),attrs:{type:"button","data-index":String(t),"data-message-id":e.ids[0]??""},on:{click:()=>pn(t)}},a("span",{text:Rd[e.role]}),a("span",{class:"bloom-truncate",text:ae(e.summary||"\u2026",mn)}))}function xa(e){if(!O)return;let t=e.getBoundingClientRect(),o=Q()?.getBoundingClientRect().top,r=Math.min(t.bottom,o&&o>t.top?o:t.bottom)-t.top;O.style.right=`${document.documentElement.clientWidth-t.left-e.clientLeft-e.clientWidth+Pd}px`,O.style.top=`${t.top}px`,O.style.height=r>1?`${r}px`:""}function _d(){let e=Qt();if(G=Ta(),!G.length||!e){O?.remove(),O=null,un="";return}if($t!==e){Jt?.abort(),Jt=new AbortController,e.addEventListener("scroll",at(Xt),{passive:!0,signal:Jt.signal});for(let n of Dd)e.addEventListener(n,Ca,{passive:!0,signal:Jt.signal});$t=e,Ke?.disconnect(),Ke=new ResizeObserver(()=>{e.isConnected&&xa(e)}),Ke.observe(e),dn=null}let t=Q();t&&t!==dn&&Ke&&(Ke.observe(t),dn=t),O??=a("div",{class:`bloom-root ${I("root")}`,attrs:{"data-bloom":"navigator"}},a("div",{class:I("rail")}),a("div",{class:I("toc")},a("div",{class:I("toc-head")}),a("div",{class:I("toc-list")}))),O.isConnected||document.body.append(O),xa(e);let o=JSON.stringify(G.map(n=>[n.role,n.ids]));o!==un?(un=o,We=-1,tm(),At&&Date.now()<At.until&&At.chat===h()&&G[0]?.ids[0]!==At.first&&pn(0)):em(),Xt()}function Xt(){if(!O||!$t)return;je=We>=0?We:Xd($t),O.querySelectorAll(`.${I("tick")}`).forEach((t,o)=>t.classList.toggle(I("tick-current"),o===je)),O.querySelectorAll(`.${I("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===je)));let e=O.querySelector(`.${I("toc-head")}`);e&&(e.textContent=`${je+1} / ${G.length}`)}function em(){O?.querySelectorAll(`.${I("tick")}`).forEach((e,t)=>{let o=G[t],n=ae(o.summary,mn);e.title!==n&&(e.title=n),e.classList.toggle(I("tick-streaming"),o.streaming)}),O?.querySelectorAll(`.${I("row")}`).forEach(e=>{let t=e.lastElementChild,o=ae(G[Number(e.dataset.index)].summary||"\u2026",mn);t&&t.textContent!==o&&(t.textContent=o)})}function tm(){O?.querySelector(`.${I("rail")}`)?.replaceChildren(...G.map((t,o)=>a("button",{class:Bo(I("tick"),I(`tick-${t.role}`),t.streaming&&I("tick-streaming"),o===je&&I("tick-current")),title:ae(t.summary,mn),attrs:{type:"button","aria-label":`Jump to message ${o+1}`,"data-message-id":t.ids[0]??""},on:{click:()=>pn(o)}}))),O?.querySelector(`.${I("toc-list")}`)?.replaceChildren(...G.map($d))}var he=at(_d);function Ca(){We=-1,At=null,Ir++}var om=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function Sa(e){if(!O||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||om(document.activeElement)||document.querySelector("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:je-1,ArrowDown:je+1,Home:0,End:G.length-1}[e.key];if(o==null){Ca();return}o<0||o>=G.length||(e.preventDefault(),e.stopPropagation(),pn(o))}var Ma=f({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:fn,styles:ba,start(){ya=[L(e=>N(e)&&he()),ce(he),K.on("conversation",he),v.on("rise",he),v.on("fall",he)],addEventListener("keydown",Sa,!0),addEventListener("resize",he,{passive:!0}),he()},stop(){for(let e of ya)e();Jt?.abort(),Ke?.disconnect(),Ke=void 0,$t=null,dn=null,removeEventListener("keydown",Sa,!0),removeEventListener("resize",he),O?.remove(),O=null,un="",Zt=[],Or=""},onSettingsChange:he});var La=`/*
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
`;var Z=E("bloom-quotes-"),Kr="BloomBetterQuotes",rm=40,Oa=8,im=1800,Gr=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,ka=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,Ve=p({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),Dr,Hr,yt,Nr=!1,Ur=0,gn=null,hn=null,be=null;function jr(){return location.pathname.match(/\/c\/(?!local-)([\w-]+)/)?.[1]??(new URLSearchParams(location.search).get("temporary-chat")==="true"?"temporary":"draft")}function An(){try{let e=JSON.parse(sessionStorage.getItem(Kr)??"[]");return Array.isArray(e)?e.filter(t=>!!t&&typeof t=="object"&&typeof t.id=="string"&&typeof t.text=="string"&&!!t.text):[]}catch{return[]}}function Wr(e){try{sessionStorage.setItem(Kr,JSON.stringify(e.slice(-rm)))}catch{}}function _t(e){return An().find(t=>t.id===e)?.text??""}function sm(e,t){let o=An().filter(n=>n.id!==e);o.push({id:e,text:t}),Wr(o)}function Fr(e=jr()){Wr(An().filter(t=>t.id!==e)),bn()}function am(e){let t=_t("draft");if(!t||_t(e))return;let o=An().filter(n=>n.id!=="draft");o.push({id:e,text:t}),Wr(o)}function Yr(e){return`${e.getAttribute("aria-label")??""} ${e.getAttribute("title")??""}`}function lm(e){let t=Yr(e);return ka.test(t)&&!/quote|引用/.test(t)?!1:/quote|引用/.test(t)&&Gr.test(t)?!0:Gr.test(t)&&!ka.test(t)}function Pa(e){let t=e.cloneNode(!0);for(let o of t.querySelectorAll("button, [role='button']"))o.remove();return b(t.textContent??"")}function cm(e){let t=Q(),o=e.parentElement,n=0;for(;o&&o!==t&&n<5;){if(n++,o.matches(u.composerInput)||o.querySelector(u.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=Pa(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function yn(){let e=Q();if(!e)return null;for(let t of e.querySelectorAll("button, [role='button']")){if(t.closest("[data-bloom]")||!lm(t))continue;let o=cm(t),n=o?Pa(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:t}}return null}function um(e){let t=e.closest(u.searchUnit)??e.closest(u.oldMessage);return t&&(ut(t)??t.getAttribute("data-message-author-role"))==="user"?t:null}function zr(e){return b(e).slice(0,48)}function dm(e,t){let o=zr(e);if(o.length<Oa)return null;let n=null;for(let r of dt()){if(t&&(r===t||t.contains(r)||r.contains(t)))continue;let i=b(r.textContent??"");if(!i.includes(o))continue;let s=o.length/Math.max(i.length,1);(!n||s>n.score)&&(n={el:r,score:s})}return n?.el??null}function mm(e,t){let o=zr(t),n=e;for(let r of e.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&b(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${Z("hit")}`)?.classList.remove(Z("hit")),n.classList.add(Z("hit")),window.clearTimeout(Ur),Ur=window.setTimeout(()=>n.classList.remove(Z("hit")),im)}function Ba(e){let t=e.closest(u.timelineScroll)??document.scrollingElement;if(!(t instanceof HTMLElement)&&t!==document.scrollingElement)return;let o=e.getBoundingClientRect();if(o.height<1||!t)return;let n=t.getBoundingClientRect(),r=Q()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,s=o.top+o.height/2-(n.top+i)/2;Math.abs(s)<8||t.scrollTo({top:t.scrollTop+s,behavior:"smooth"})}function Vr(){if(!be||!gn?.isConnected)return;let e=gn.getBoundingClientRect();e.width<1||(be.style.top=`${Math.max(8,e.top+8)}px`,be.style.left=`${Math.max(8,e.right-be.offsetWidth-8)}px`)}function fm(e,t,o){gn=e,hn=t,be??=a("button",{class:`bloom-root ${Z("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),be.isConnected||document.body.append(be),mm(e,o),Vr()}function Ia(){be?.remove(),be=null,gn=null,hn=null,document.querySelector(`.${Z("hit")}`)?.classList.remove(Z("hit"))}function Ra(){return document.querySelector('[data-bloom="quote-chip"]')}function bn(){Ra()?.remove()}function pm(e){let o=Q()?.getBoundingClientRect();!o||o.width<8||(e.style.width=`${Math.max(120,o.width-24)}px`,e.style.left=`${o.left+12}px`,e.style.top=`${Math.max(8,o.top-e.offsetHeight-8)}px`)}function gm(e){let t=Ra();t||(t=a("div",{class:`bloom-root ${Z("chip")}`,attrs:{"data-bloom":"quote-chip"}},a("span",{class:Z("text")}),a("button",{class:Z("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(t));let o=t.querySelector(`.${Z("text")}`),n=b(e);o&&o.textContent!==n&&(o.textContent=n),t.dataset.text=e,pm(t)}function Qr(){if(!Nr){Nr=!0;try{let e=jr(),t=yn();Ve.store.persistAcrossChats&&t&&_t(e)!==t.text&&sm(e,t.text);let o=Ve.store.persistAcrossChats?_t(e):"";!o||t&&b(t.text)===b(o)?bn():gm(o),Vr()}finally{Nr=!1}}}function hm(e){let t=e.closest('[data-bloom="quote-chip"]');if(t instanceof HTMLElement&&!e.closest(`.${Z("x")}`)){let i=t.dataset.text??t.querySelector(`.${Z("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:t}:null}let o=e.closest("blockquote");if(o instanceof HTMLElement&&!e.closest("a, button")){let i=um(o),s=b(o.textContent??"");if(i&&s)return{text:s,skip:i,origin:o}}let n=Q();if(!n||!n.contains(e)||Te(e)||e.closest("button, [role='button']"))return null;let r=yn();return!r||!r.row.contains(e)?null:{text:r.text,skip:null,origin:r.row}}function bm(e){let{target:t}=e;if(!(t instanceof Element))return;if(t.closest('[data-bloom="quote-back"]')){e.preventDefault(),e.stopPropagation(),hn?.isConnected&&Ba(hn);return}if(t.closest(`.${Z("x")}`)){e.preventDefault(),e.stopPropagation(),Fr();return}let o=yn();if(o&&(t===o.dismiss||o.dismiss.contains(t))){Fr();return}if(Am(t)&&Da(),!Ve.store.jumpToPassage)return;let n=hm(t);if(!n)return;let r=dm(n.text,n.skip);r&&(e.preventDefault(),e.stopPropagation(),fm(r,n.origin,n.text),Ba(r))}function Am(e){let t=e.closest("button, [role='button']");return!(t instanceof HTMLElement)||t.closest("[data-bloom]")||!Q()?.contains(t)?!1:/send|submit|发送|提交/i.test(Yr(t))&&!Gr.test(Yr(t))}function ym(e){return!(e instanceof KeyboardEvent)||e.key!=="Enter"||e.shiftKey||e.isComposing?!1:Te(e.target)}function Da(){if(!Ve.store.persistAcrossChats)return;let e=jr(),t=_t(e);if(t){if(!yn()){let o=C(),n=zr(t);n.length>=Oa&&!b(o).includes(n)&&ne(`> ${t}

${o}`.trim())}Fr(e)}}function vm(e){ym(e)&&Da()}function qm(e){!e.prevId&&e.id&&am(e.id),Qr()}var Ha=f({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:Ve,styles:La,onSettingsChange(e){e==="jumpToPassage"&&!Ve.store.jumpToPassage&&Ia(),e==="persistAcrossChats"&&!Ve.store.persistAcrossChats&&(sessionStorage.removeItem(Kr),bn()),Qr()},start(){yt=new AbortController,document.addEventListener("pointerdown",bm,{capture:!0,signal:yt.signal}),document.addEventListener("keydown",vm,{capture:!0,signal:yt.signal}),addEventListener("scroll",Vr,{capture:!0,passive:!0,signal:yt.signal}),Hr=ce(qm),Dr=L(e=>N(e)&&Qr())},stop(){yt?.abort(),yt=void 0,Hr?.(),Hr=void 0,Dr?.(),Dr=void 0,window.clearTimeout(Ur),Ia(),bn()}});var Na=`/*
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
`;var Sm=E("bloom-cls"),wm="bloom-cls",Em=600*1e3,Zr=Wi("tab"),qt=new Map,to=new Map,vt=null,Ga=[],Tm=e=>e==="streaming"||e==="error";function Cm(){let e=new Map,t=Date.now();for(let[o,n]of to)t-n.at>Em?to.delete(o):e.set(o,n.status);for(let[o,n]of qt)e.set(o,n);return e}function Mm(e){return a("span",{class:`bloom-root ${Sm("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&P("alert"))}function eo(){let e=Cm(),t=new Set;for(let[o,n]of e)for(let r of zt(o)){if(!pe(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let s=Mm(n);t.add(s),r.append(s)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function vn(e,t){e&&(t?qt.set(e,t):qt.delete(e),vt?.postMessage({tab:Zr,id:e,status:t}),eo())}function Lm({data:e}){!w(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===Zr||(Tm(e.status)?to.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):to.delete(e.id),eo())}function Jr(){for(let e of qt.keys())vt?.postMessage({tab:Zr,id:e,status:null})}var Ua=f({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:Na,start(){vt=typeof BroadcastChannel=="function"?new BroadcastChannel(wm):null,vt?.addEventListener("message",Lm),addEventListener("pagehide",Jr),Ga=[v.on("rise",({conversationId:e})=>vn(e,"streaming")),v.on("fall",({conversationId:e,outcome:t})=>vn(e,t==="error"?"error":null)),v.on("context",({prevId:e,id:t,migrated:o})=>{o&&B().generating?vn(t,"streaming"):!o&&qt.get(e??"")==="streaming"&&vn(e,null)}),L(e=>N(e)&&eo())],h()&&eo()},stop(){for(let e of Ga)e();Jr(),vt?.close(),vt=null,removeEventListener("pagehide",Jr),qt.clear(),to.clear(),eo()}});var Ya=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],Sn={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},km={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Bm="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Xr=32,wn=64,$r="#FCFCFC",_r="#111111",Im=14,En=51.5,Om=12.5,Pm=9.75,Fa=52,Rm=10.5,Dm=7.75,Hm={rotate:e=>e.arc(En,En,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function qn(e){let t=document.createElement("canvas");t.width=t.height=Xr;let o=t.getContext("2d");return o?(o.scale(Xr/wn,Xr/wn),e(o),t.toDataURL("image/png")):""}function xn(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D(Bm);o&&(e.strokeStyle=_r,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function Tn(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function Nm(e,t){Tn(e,En,Om,_r),Tn(e,En,Pm,Sn[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),Hm[t](e),e.stroke()}function Gm(e,t){e.beginPath(),e.roundRect(0,0,wn,wn,Im),e.fillStyle=t,e.fill()}var Um=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function Qa(e,t){switch(e){case"original":return Um(km[t]);case"hole":return qn(o=>xn(o,Sn[t],!0));case"bg":return qn(o=>{Gm(o,Sn[t]),xn(o,$r,!1)});case"dot":return qn(o=>{xn(o,$r,!0),Tn(o,Fa,Rm,_r),Tn(o,Fa,Dm,Sn[t])});case"badge":return qn(o=>{xn(o,$r,!0),Nm(o,t)})}}var no="bloom-chat-state-favicon",ro="data-bloom-rel",oi="data-bloom-media",Ka="bloom-parked-icon",Fm="/favicon.ico",Wa=p({style:{type:"select",description:"How the tab icon shows the chat state.",options:Ya,default:"bg"}}),ke=null,za="",Cn=null,Va="",ja=new Map,ni,ei=[],Ja=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${ro}]`)];function ri(){for(let e of Ja())e.id!==no&&(e.hasAttribute(ro)||(Va||=e.href,e.setAttribute(ro,e.rel),e.setAttribute(oi,e.getAttribute("media")??"")),e.rel!==Ka&&(e.rel=Ka),e.media!=="not all"&&(e.media="not all"))}function Ym(){for(let e of Ja()){let t=e.getAttribute(ro);if(t==null)continue;e.rel=t;let o=e.getAttribute(oi);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(ro),e.removeAttribute(oi)}}function Za(){let e=document.getElementById(no);return e||(e=document.createElement("link"),e.id=no,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function Qm(e){if(e==="wait")return Va||Fm;let t=Wa.store.style,o=`${t}:${e}`,n=ja.get(o);return n||ja.set(o,n=Qa(t,e)),n}function ti(e){if(e)return"rotate";let t=C();return ke&&t&&t!==za&&(ke=null),ke==="error"?"error":ke==="done"?"done":t?"ready":"wait"}function oo(e,t=!1){if(e===Cn&&!t)return;Cn=e;let o=Za(),n=Qm(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function Km(){ni=new MutationObserver(()=>{ri(),document.head.lastElementChild?.id!==no&&Za()}),ni.observe(document.head,{childList:!0})}var Xa=f({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"HostReady",settings:Wa,start(){ri(),oo(ti(B().generating),!0),Km(),ei=[v.on("rise",()=>{ke=null,oo("rotate")}),v.on("fall",({outcome:e})=>{ke=e==="done"||e==="error"?e:null,za=C(),oo(ti(!1))}),v.on("context",({migrated:e})=>{e||(ke=null)}),v.on("tick",({generating:e})=>{ri(),oo(ti(e))})]},stop(){for(let e of ei)e();ei=[],ni?.disconnect(),document.getElementById(no)?.remove(),Ym(),Cn=null,ke=null},onSettingsChange(){oo(Cn??"wait",!0)}});var jm={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${u.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])']},$a=p({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0}}),_a=f({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads and notices.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:$a,styles:()=>rt(Object.entries(jm).flatMap(([e,t])=>$a.store[e]?t:[]))});var xt=`form:has(:is(${u.composerInput})), ${u.oldComposerForm}`,Mn='[class*="ComposerLayoutBody"]',ii='[class*="ComposerLayoutRoot"]',Wm='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',zm=`:is(${xt}) ${Mn}, :is(${xt}):not(:has(${Mn})) ${ii}, :is(${xt}):not(:has(${Mn})):not(:has(${ii})) :is(${Wm})`,Vm='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',Jm='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',Zm="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))",el=p({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function Xm(){let{opacity:e,blur:t}=el.store;if(e>=100)return"";let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${Zm} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important;-webkit-backdrop-filter:blur(${t}px)!important`;return`:is(${Vm}), :is(${xt}){${o}}:is(${Jm}){display:none!important}${zm}{${n}}:is(${xt}):has(${Mn}) ${ii}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${xt}) :is(${u.composerInput}){background-color:transparent!important}`}var tl=f({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:el,styles:Xm});var $m=1200,_m=8e3,ef=150,tf=20,ol=6,li="continue where you left",of=/message delivery timed out|please try again/i,nl=/waiting for the complete answer/i,rl=p({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:li,placeholder:li}}),si=[],kn=0,io=!1,so=0,wt="",Ln="",ci=0,Et=!1,ao=!1,Bn=!0,St="",ui=0,In=!1,nf=()=>rl.store.prompt.trim()||li;function il(){return(V(u.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function sl(){let e=il();return!e||nl.test(e)||!of.test(e)?"":e}function rf(){let e=il();return e&&nl.test(e)?e:""}function sf(){let e=ct()?.querySelectorAll(u.turn),t=e?.[e.length-1];return`${t?.getAttribute("data-turn-key")??""}:${t?.textContent?.length??0}`}function al(e,t,o){if(o===kn){if(B().generating||C()!==e||t>=tf){Et=!1,B().generating||(wt="");return}Qo(),setTimeout(()=>al(e,t+1,o),ef)}}function af(e){let t=kn;if(B().generating||C()&&C()!==e){Et=!1,wt="";return}ne(e),In=!0,Ut(()=>{t===kn&&al(e,0,t)})}function ll(e){return e===wt||so>=ol||B().generating||C()?!1:(wt=e,so+=1,Et=!0,af(nf()),!0)}function lf(){if(io||Et||ao)return;let e=Date.now(),t=sl();if(t){if(St="",t!==Ln){Ln=t,ci=e;return}if(e-ci<$m)return;ll(`${h()??""}:${t}`);return}if(Ln="",!rf()){Bn=!0,St="";return}if(!Bn||!B().generating||C())return;let n=`${h()??""}:${sf()}`;if(n!==St){St=n,ui=e;return}if(e-ui<_m||so>=ol)return;let r=lt();r&&(ao=!0,r.click())}function ai(){kn+=1,io=!1,so=0,wt="",Ln="",ci=0,Et=!1,ao=!1,Bn=!0,St="",ui=0,In=!1}var cl=f({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:rl,start(){ai(),si=[v.on("rise",()=>{io=!1,wt="",Et=!1,In&&(In=!1,Bn=!1,St="")}),v.on("fall",({outcome:e})=>{if(ao){ao=!1,e==="left"?io=!0:ll(`${h()??""}:stall`);return}(e==="stopped"||e==="left")&&(io=!0),e==="done"&&!sl()&&(so=0)}),v.on("context",({migrated:e})=>{e||ai()}),v.on("tick",lf)]},stop(){for(let e of si)e();si=[],ai()}});var Ae=E("bloom-csi-"),cf=256,uf=160,On=1,ul=4,df=.1,mf=.0015,ff=250;function pf(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function gf(e){return new Promise((t,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function hf(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:Se(t.x,n,1-n),y:Se(t.y,r,1-r)}}function dl(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function bf(e,t){let o=a("canvas");return o.width=o.height=cf,dl(o,e,t),o.toDataURL("image/png")}function ml(e){let t=null,o={x:R.store.cropX,y:R.store.cropY,zoom:R.store.cropZoom},n,r=a("canvas",{class:Ae("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=uf*devicePixelRatio;let i=a("div",{class:`bloom-muted ${Ae("status")}`}),s=a("div",{class:Ae("zoom")}),l=a("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function c(y,Y=!0){t&&(o=hf(t,y),dl(r,t,o),Y&&(clearTimeout(n),n=setTimeout(()=>{t&&(R.store.cropX=o.x,R.store.cropY=o.y,R.store.cropZoom=o.zoom,R.store.avatarUrl=bf(t,o))},ff)))}function d(){s.replaceChildren(nn(o.zoom,On,ul,df,"\xD7",y=>c({...o,zoom:y})))}async function m(y,Y){i.textContent="";try{t=await gf(y),Y&&(R.store.avatarSource=y,o={x:.5,y:.5,zoom:On}),e.classList.add(Ae("has-image")),d(),c(o,Y)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let q=y=>{y?.type.startsWith("image/")&&pf(y).then(Y=>m(Y,!0))};l.addEventListener("change",()=>q(l.files?.[0])),r.addEventListener("wheel",y=>{t&&(y.preventDefault(),c({...o,zoom:Se(o.zoom*(1-y.deltaY*mf),On,ul)}),d())},{passive:!1}),r.addEventListener("pointerdown",y=>{if(!t)return;r.setPointerCapture(y.pointerId);let Y={...o},It=r.getBoundingClientRect(),Co=Mo=>{if(!t)return;let ee=Math.max(It.width/t.naturalWidth,It.height/t.naturalHeight)*o.zoom;c({...o,x:Y.x-(Mo.clientX-y.clientX)/(t.naturalWidth*ee),y:Y.y-(Mo.clientY-y.clientY)/(t.naturalHeight*ee)})};r.addEventListener("pointermove",Co),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",Co),{once:!0})});let z=a("div",{class:Ae("cropper"),attrs:{tabindex:"0"},on:{paste:y=>q([...y.clipboardData?.files??[]].find(Y=>Y.type.startsWith("image/"))),dragover:y=>y.preventDefault(),drop:y=>{y.preventDefault(),q(y.dataTransfer?.files[0])}}},a("div",{class:Ae("stage")},r),a("div",{class:Ae("controls")},Wt("",y=>y.trim()&&void m(y.trim(),!0),"https://\u2026 or data:image/\u2026","url"),a("div",{class:Ae("buttons")},U("Choose file",()=>l.click()),U("Reset crop",()=>{c({x:.5,y:.5,zoom:On}),d()}),U("Clear",()=>{t=null,e.classList.remove(Ae("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),s.replaceChildren(),R.store.avatarUrl="",R.store.avatarSource=""},"danger")),s,i,l));return e.append(z),R.store.avatarSource&&m(R.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var fl=`/*
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
`;var lo="data-bloom-csi-avatar",di="data-bloom-csi-sized",bl="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",yf=32,R=p({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>ml(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),pl=[];function Al(e){e.removeAttribute(lo),e.removeAttribute(di)}function gl(e){return(R.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function hl(e=[]){if(!N(e))return;let t=R.store.displayName.trim()||null,o=!!R.store.avatarUrl,n=new Set(t?gl("name"):[]);for(let i of document.querySelectorAll(bl))n.has(i)||Ge(i,null);for(let i of n)Ge(i,t);let r=new Set(o?gl("avatar"):[]);for(let i of document.querySelectorAll(`[${lo}]`))r.has(i)||Al(i);for(let i of r)i.hasAttribute(lo)||i.setAttribute(lo,""),i.toggleAttribute(di,!i.closest('[role="menu"]'))}function vf(){let e=R.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${R.store.avatarSize}px}:is(${u.rail}, ${u.oldRail}) [${di}]{--bloom-csi-size:${yf}px}`:""}var yl=f({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:R,styles:()=>`${vf()}
${fl}`,start(){pl=[ue(),L(hl)]},stop(){for(let e of pl)e();for(let e of document.querySelectorAll(`[${lo}]`))Al(e);for(let e of document.querySelectorAll(bl))Ge(e,null)},onSettingsChange(){hl()}});var Tt=E("bloom-greeting-"),vl=30,ql=100;function xl(e){let t=-1,o=a("textarea",{class:`bloom-input ${Tt("input")}`,attrs:{maxlength:String(ql),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=U("Add",i),r=a("div",{class:Tt("list")});function i(){let c=o.value.trim().slice(0,ql);if(!c)return;let d=[...M.store.greetings];t>=0?d[t]=c:d.length<vl&&d.push(c),M.store.greetings=d,t=-1,o.value="",s()}function s(){let{greetings:c}=M.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&c.length>=vl,r.replaceChildren(...c.length?c.map((d,m)=>a("div",{class:Tt("row",m===t?"row-editing":"row-idle")},a("div",{class:Tt("text"),text:d}),J("edit","Edit",()=>{t=m,o.value=d,o.focus(),s()}),J("trash","Delete",()=>{M.store.greetings=c.filter((q,z)=>z!==m),t===m&&(t=-1),s()}))):[a("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",c=>{c.key==="Enter"&&(c.ctrlKey||c.metaKey)&&i()}),e.append(a("div",{class:Tt("editor")},r,a("div",{class:Tt("form")},o,n))),s();let l=st((c,d)=>c==="GreetingCustomizer"&&d==="greetings"&&s());return()=>{l(),e.replaceChildren()}}var Sl=`/*
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
`;var Dn="data-bloom-greeting",xf=1e3,Sf=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],M=p({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>xl(e)},greetings:{type:"custom",default:Sf},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),Pn,wl=[],mi,uo=()=>Zo()&&!le(),wf=e=>e.replaceAll(/\s*\n\s*/g," ").trim(),Tl=()=>M.store.greetings.filter(e=>typeof e=="string"&&e.trim());function mo(){let e=Tl();if(e.length)if(M.store.order==="random"&&e.length>1){let t=M.store.lastRandom;for(;t===M.store.lastRandom;)t=Math.floor(Math.random()*e.length);M.store.lastRandom=t,M.store.index=t}else M.store.index=(M.store.index+1)%e.length}function Ef(){return uo()?V(u.homeHeading):null}function Rn(){for(let e of document.querySelectorAll(`[${Dn}]`))e.removeAttribute(Dn),Ge(e,null)}function Hn(){for(let e of document.querySelectorAll("[data-bloom-placeholder]"))e.removeAttribute("data-bloom-placeholder")}function El(e){let t=Ee(),o=wf(e);if(!t||!o||C(t)){Hn();return}t.getAttribute("data-bloom-placeholder")!==o&&t.setAttribute("data-bloom-placeholder",o)}function co(){let e=Tl(),t=Bs(),o=uo();if(!e.length||!t&&!o){Rn(),Hn();return}if(t){Rn(),El(e[0]??"");return}let n=Ef();n?((M.store.index<0||M.store.index>=e.length)&&mo(),n.setAttribute(Dn,""),Ge(n,e[Math.max(0,M.store.index)%e.length]??"")):Rn(),M.store.heroOnlyOutsideProject?Hn():El(e[Math.max(0,M.store.index)%e.length]??"")}function fi(){clearInterval(Pn),Pn=void 0,M.store.mode==="interval"&&uo()&&(Pn=setInterval(()=>{mo(),co()},M.store.intervalSec*xf))}function Tf(e){M.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${Dn}]`)||getSelection()?.toString()||(mo(),co())}function Cf(){uo()&&M.store.mode==="refresh"&&mo(),fi(),co()}var Cl=f({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:M,styles:Sl,start(){mi=new AbortController,document.addEventListener("click",Tf,{signal:mi.signal}),uo()&&M.store.mode==="refresh"&&mo(),fi(),wl=[L(e=>N(e)&&co()),ce(Cf)]},stop(){mi?.abort();for(let e of wl)e();clearInterval(Pn),Rn(),Hn()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&fi(),co()}});var fo=E("bloom-history-"),pi=10,Mf=3e3;function Ml(e){let t="",o=0,n=new Set,r=a("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),i=a("div",{class:fo("list")}),s=a("div",{class:fo("pager")}),l,c=U("Clear all",()=>{if(!l){c.textContent="Click again to clear",l=setTimeout(()=>{l=void 0,c.textContent="Clear all"},Mf);return}clearTimeout(l),l=void 0,c.textContent="Clear all",po([])},"danger");function d(){let q=[...Je.store.entries].toReversed(),z=t.trim().toLowerCase(),y=z?q.filter(ee=>ee.toLowerCase().includes(z)):q,Y=Math.max(1,Math.ceil(y.length/pi));o=Math.min(o,Y-1);let It=y.slice(o*pi,(o+1)*pi).map(ee=>a("div",{class:fo("row")},a("button",{class:fo("text",n.has(ee)?"text-open":"text-closed"),text:ee,title:n.has(ee)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{n.delete(ee)||n.add(ee),d()}}}),J("copy","Copy",()=>void zi(ee)),J("trash","Delete",()=>po(Je.store.entries.filter(Uc=>Uc!==ee)))));i.replaceChildren(...It.length?It:[a("div",{class:"bloom-muted",text:z?"No matching prompts.":"No saved prompts yet."})]),s.replaceChildren(a("span",{class:"bloom-muted",text:`${y.length} ${z?"matching":"saved"} \xB7 page ${o+1} of ${Y}`}),U("Previous",()=>{o--,d()}),U("Next",()=>{o++,d()}),c);let[Co,Mo]=s.querySelectorAll("button");Co.disabled=o===0,Mo.disabled=o>=Y-1,c.disabled=!q.length}r.addEventListener("input",()=>{t=r.value,o=0,d()}),e.append(a("div",{class:fo("manager")},r,i,s)),d();let m=st((q,z)=>q==="InputHistory"&&z==="entries"&&d());return()=>{m(),clearTimeout(l),e.replaceChildren()}}var Ll=`/*
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
`;var kf=E("bloom-history-"),Bf=2e3,Je=p({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>Ml(e)},entries:{type:"custom",default:[]}}),_=null,gi={text:"",at:0},Ze=null,hi,Nn=()=>Je.store.entries.filter(e=>typeof e=="string");function po(e){Je.store.entries=e.slice(-Je.store.maxEntries)}function bi(e){let t=e.trim();if(!t)return;let o=Date.now();t===gi.text&&o-gi.at<Bf||(gi={text:t,at:o},po([...Nn().filter(n=>n!==t),t]))}function If(e,t){let o=Ee();if(!o)return;Ze??=a("div",{class:`bloom-root ${kf("hud")}`,attrs:{"data-bloom":"history-hud","aria-live":"polite"}}),Ze.textContent=`${e+1} / ${t}`;let n=(o.closest("form")??o).getBoundingClientRect();Ze.style.left=`${n.left+n.width/2}px`,Ze.style.top=`${n.top}px`,Ze.isConnected||document.body.append(Ze)}function go(){_=null,Ze?.remove()}function Of(e){let t=Nn();if(!_)return;let o=t[e];_.index=e,_.shown=o,ne(o),If(t.length-1-e,t.length)}function Pf(e){let t=Nn();if(!t.length)return!1;if(!_){if(e===1)return!1;_={index:t.length,draft:C(),shown:""}}let o=_.index+e;return o<0?!0:o>=t.length?(ne(_.draft),go(),!0):(Of(o),!0)}function Rf(e){if(e.isComposing||!Te(e.target))return;let t=e.target;if(e.key==="Enter"&&!e.shiftKey){bi(C(t)),go();return}if(e.key==="Escape"&&_){ne(_.draft),go(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey)return;let o=As(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!_||Pf(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function Df(e){_&&Te(e.target)&&C(e.target)!==_.shown.trim()&&go()}function Hf(e){e.target instanceof Element&&e.target.closest(u.sendButton)&&bi(C())}var kl=f({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:Je,styles:Ll,start(){hi=new AbortController;let{signal:e}=hi;document.addEventListener("keydown",Rf,{capture:!0,signal:e}),document.addEventListener("input",Df,{capture:!0,signal:e}),document.addEventListener("click",Hf,{capture:!0,signal:e}),document.addEventListener("submit",()=>bi(C()),{capture:!0,signal:e})},stop(){hi?.abort(),go()},onSettingsChange(e){e==="maxEntries"&&po(Nn())}});var Bl=`/*
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
`;var Gf=1500,Uf=5e3,Ff=2e3,Ct=p({showDate:{type:"boolean",description:"Show the date for messages not sent today.",default:!0},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),Un=new Map,Rl=0,Fn,Il=[];function Dl(e,t){Un.get(e)!==t&&(Un.set(e,t),clearTimeout(Fn),Fn=setTimeout(Hl,Ff))}function Hl(){let e={...Ct.store.stamps,...Object.fromEntries(Un)};Ct.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,Gf))}function Yf(e){let t=re(h())?.times;for(let o=e.length-1;o>=0;o--){let n=Un.get(e[o])??t?.get(e[o])??Ct.store.stamps[e[o]];if(n)return n}return null}var Qf=()=>B().generating||Date.now()-Rl<Uf;function Kf(e){let t=new Date(e),o=new Date,n={hour:"2-digit",minute:"2-digit"};if(!Ct.store.showDate||t.toDateString()===o.toDateString())return t.toLocaleTimeString(void 0,n);let r=t.getFullYear()===o.getFullYear()?{}:{year:"numeric"};return t.toLocaleString(void 0,{...r,month:"short",day:"numeric",...n})}function Nl(e){let t=ut(e)??e.getAttribute("data-message-author-role")??e.closest(u.turn)?.getAttribute("data-turn")??e.querySelector(u.authorRole)?.getAttribute("data-message-author-role");if(hr(t))return t;let o=Yt(e).at(-1);return re(h())?.chain.find(n=>n.id===o)?.role??null}var Ol='[class*="group/activity-header"]';function jf(e){let t=e.parentElement;if(!t)return null;let o=e.closest(u.turn);return o&&t!==o&&!o.contains(t)?null:t}function Wf(e){let t=e;for(let o=0;o<8&&t;o++){let n=jf(t);if(!n)return null;let r=[...n.children],i=r.indexOf(t);for(let s=i-1;s>=0;s--){let l=r[s],c=l.matches(Ol)?l:l.querySelector(Ol);if(c)return c;if(l.matches(u.searchUnit)||l.querySelector(u.searchUnit))return null}if(n===t.closest(u.turn))return null;t=n}return null}function zf(e){let t=e.parentElement;for(let o=0;o<4&&t;o++){if(t.classList.contains("flex-col"))return t;t=t.parentElement}return e.parentElement??e}function Gl(e,t){if(t==="assistant"){let o=Wf(e);if(o)return zf(o)}return e}function Vf(e,t){let o=dt();for(let n=o.length-1;n>=0;n--){let r=o[n];if(!(r!==e&&(Nl(r)!=="assistant"||Gl(r,"assistant")!==t)))return r===e}return!0}function Pl(e){return e.querySelector(':scope > time[data-bloom="timestamp"]')}function Jf(e){let t=Yt(e);if(!t.length||!pe(e)||e.querySelector("time:not([data-bloom])"))return;let o=Nl(e),n=Gl(e,o);if(n!==e&&!Vf(e,n)){Pl(e)?.remove();return}let r=Yf(t);!r&&Qf()&&(r=Date.now(),Dl(t.at(-1),r));let i=n.querySelector('time[data-bloom="timestamp"]')??Pl(e);if(!r||Ct.store.hideOwnMessages&&o==="user"){i?.remove();return}let s=Kf(r);if(i?.textContent===s&&i.parentElement===n&&i===n.firstElementChild)return;let l=a("time",{class:`bloom-timestamp bloom-timestamp-${o??"assistant"}`,text:s,title:new Date(r).toLocaleString(),attrs:{"data-bloom":"timestamp",datetime:new Date(r).toISOString()}});i&&i.replaceWith(l),(l.parentElement!==n||l!==n.firstElementChild)&&n.prepend(l)}var Gn=at(()=>{for(let e of dt())Jf(e)}),Ul=f({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:Ct,styles:Bl,start(){Il=[L(e=>N(e)&&Gn()),K.on("conversation",Gn),K.on("message-time",({messageId:e,time:t})=>{Dl(e,t),Gn()}),v.on("fall",()=>{Rl=Date.now()})]},stop(){for(let e of Il)e();Fn&&(clearTimeout(Fn),Hl());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();Gn()}}});var Zf=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])'],Xf=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],Fl=p({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),Yl=f({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:Fl,styles:()=>rt([...Zf,...Fl.store.hideDictationSettings?Xf:[]])});var Xe="data-bloom-share",$f=/^\/g\/g-p-/,_f=/^(?:share|分享)$/i,ep=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],tp=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${Xe}="project"]`],Ai=p({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),Yn,yi=!1;function op(e){if(!N(e))return;let t=$f.test(location.pathname)&&!h();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${Xe}]`))!t||!_f.test(b(o.textContent??""))?o.removeAttribute(Xe):o.hasAttribute(Xe)||o.setAttribute(Xe,"project")}var Ql=f({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:Ai,styles:()=>rt([...Ai.store.hideShareChat?ep:[],...Ai.store.hideShareProject?tp:[]]),start(){yi=!0,Ft().then(()=>{yi&&!Yn&&(Yn=L(op))})},stop(){yi=!1,Yn?.(),Yn=void 0;for(let e of document.querySelectorAll(`[${Xe}]`))e.removeAttribute(Xe)}});var Kl='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',np='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',rp="[data-bloom-profile-plan]",jl="visibility:hidden!important;user-select:none!important",zl=p({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function ip(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=zl.store,r=[];return e&&r.push(n?`:is(${Kl}){display:none!important}`:`:is(${Kl}){${jl}}`),t&&r.push(`:is(${np}){${jl}}`),e&&o&&r.push(`${rp}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var Wl,Vl=f({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:zl,styles:ip,start(){Wl=ue()},stop(){Wl?.()}});var sp="model-switcher-dropdown-button",Jl=e=>e.startsWith("model-switcher-")&&e!==sp?e.slice(15):"",ho=(e,t)=>e.id===t.id||!!e.label&&e.label===t.label;function Zl(){let e=Q();return(e&&V(u.modelTrigger,e))??V(u.modelTrigger)}function de(){let e=Zl();if(!e)return null;let t=b(e.innerText),o=Jl(e.getAttribute("data-testid")??"")||t;return o?{id:o,label:t||o}:null}function ap(e){return[...document.querySelectorAll(u.modelItem)].find(t=>{let o=Jl(t.getAttribute("data-testid")??""),n=b(t.textContent??"");return o===e.id||n===e.label||n===e.id})??null}function Qn(e){let t=de();if(t&&ho(t,e))return!0;let o=ap(e);if(o){o.click();let r=de();return!!r&&ho(r,e)}let n=Zl();return n?.getAttribute("aria-expanded")!=="true"&&n?.click(),!1}var Xl=`/*
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
`;var D=E("bloom-queue-"),cp=6,up=8,X=null,bo="",Mt=!1,Lt=!1;function vi(e,t,o){let n=J(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute(ge),n.addEventListener("mouseenter",()=>$l(t)),n.addEventListener("mouseleave",()=>$l("")),n}function $l(e){let t=X?.querySelector(`.${D("tip")}`);t&&(t.textContent=e)}function dp(e,t,o,n){Lt=!0;let r=a("textarea",{class:`bloom-input ${D("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=new AbortController,s=l=>{i.abort(),Lt=!1,bo="",l?n.edit(t,r.value):r.replaceWith(a("div",{class:D("text"),text:o}))};addEventListener("keydown",l=>{if(!(l.target!==r||l.isComposing)){if(l.key==="Enter"&&!l.shiftKey)s(!0);else if(l.key==="Escape")s(!1);else return;l.preventDefault(),l.stopImmediatePropagation()}},{capture:!0,signal:i.signal}),r.addEventListener("keydown",l=>l.stopPropagation(),{signal:i.signal}),r.addEventListener("blur",()=>s(!0),{signal:i.signal}),e.querySelector(`.${D("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function mp(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,s=c=>{!i&&Math.abs(c.clientY-n.clientY)<cp||(i||(i=Lt=!0,e.classList.add(D("dragging"))),e.style.transform=`translateY(${c.clientY-n.clientY}px)`)},l=c=>{if(removeEventListener("pointermove",s),!i)return;Lt=!1,bo="";let m=[...r.children].filter(q=>q!==e).filter(q=>q.getBoundingClientRect().top+q.getBoundingClientRect().height/2<c.clientY).length;o.move(t,m)};addEventListener("pointermove",s),addEventListener("pointerup",l,{once:!0})})}function fp(e,t,o,n){let r=a("li",{class:D("row")},a("div",{class:D("text"),text:e.text}),n&&e.label?a("span",{class:D("model"),title:e.label,text:e.label}):null,a("div",{class:D("actions")},vi("trash","Remove from queue",()=>o.remove(t)),vi("edit","Edit",()=>dp(r,t,e.text,o)),vi("send","Send now",()=>o.sendNow(t))));return mp(r,t,o),r}function pp(e){if(!X)return;let t=e.getBoundingClientRect();X.style.left=`${t.left}px`,X.style.width=`${t.width}px`,X.style.bottom=`${innerHeight-t.top+up}px`}function qi(){X?.remove(),X=null,bo="",Lt=!1}function Be(e,t,o=!0){let n=Q();if(!e.length||!Gt(n)){qi();return}X||(X=a("div",{class:`bloom-root ${D("tray")}`,attrs:{"data-bloom":"queue"}},a("div",{class:D("header")},a("button",{class:D("toggle"),attrs:{type:"button","aria-expanded":String(!Mt)},on:{click:s=>{Mt=!Mt,X?.classList.toggle(D("collapsed"),Mt),s.currentTarget.setAttribute("aria-expanded",String(!Mt))}}},a("span",{class:D("count")}),P("chevron")),a("span",{class:D("tip")})),a("ol",{class:D("list")})),X.classList.toggle(D("collapsed"),Mt),document.body.append(X)),pp(n);let r=JSON.stringify([o,...e.map(s=>[s.text,o?s.label:""])]);if(Lt||r===bo)return;bo=r;let i=X.querySelector(`.${D("count")}`);i&&(i.textContent=Lo(e.length,"Queued message")),X.querySelector(`.${D("list")}`)?.replaceChildren(...e.map((s,l)=>fp(s,l,t,o)))}var zn=new S("PromptQueue"),gp=8,vo=150,jn=20,ie="BloomPromptQueue",Si="BloomPromptQueueClaim",_l="BloomPromptQueueTab",hp=4e3,F=p({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1},showQueueMode:{type:"boolean",description:"Show the model that was selected when each message was queued.",default:!0},stickyOnNavigate:{type:"boolean",description:"Keep the selected model when switching chats.",default:!0},persistAcrossRefresh:{type:"boolean",description:"Restore unsent queued messages in this browser after a refresh. Other tabs show the same queue; only one of them sends it.",default:!0}}),se=new Map,yo=!1,_e=null,Ao,ec=[],ye=null,ve=!1,xi,Wn="draft",qo=()=>h()??Wn,W=()=>se.get(qo())??[],wi=e=>({id:e.model||e.label,label:e.label||e.model});function bp(e){return typeof e=="string"?e.trim()?{text:e,model:"",label:""}:null:!w(e)||typeof e.text!="string"||!e.text.trim()?null:{text:e.text,model:typeof e.model=="string"?e.model:"",label:typeof e.label=="string"?e.label:""}}function Ei(){let e=sessionStorage.getItem(_l);if(e)return e;let t=globalThis.crypto?.randomUUID?.()??`${Date.now()}-${Math.random()}`;return sessionStorage.setItem(_l,t),t}function oc(){let e=we(localStorage.getItem(Si)??"");return!w(e)||typeof e.tab!="string"||typeof e.at!="number"||typeof e.key!="string"?null:{tab:e.tab,at:e.at,key:e.key}}function nc(){let e={tab:Ei(),at:Date.now(),key:qo()};try{localStorage.setItem(Si,JSON.stringify(e))}catch(t){zn.warn("Could not claim the queue",t)}}function Ap(){let e=oc();if(e?.tab===Ei())try{localStorage.setItem(Si,JSON.stringify({...e,at:Date.now()}))}catch(t){zn.warn("Could not refresh the queue claim",t)}}function yp(){let e=oc();return!e||e.tab===Ei()||e.key!==qo()?!0:Date.now()-e.at<=hp?!1:(nc(),!0)}function vp(){return Object.fromEntries([...se].filter(([e])=>e!==Wn))}function Kn(e){let t=typeof e=="string"?we(e):e;if(!w(t))return!1;let o=!1;for(let[n,r]of Object.entries(t)){if(!Array.isArray(r))continue;let i=r.map(bp).filter(s=>s!=null);i.length&&(se.set(n,i),o=!0)}return o}function qp(){if(!F.store.persistAcrossRefresh){sessionStorage.removeItem(ie),or(ie);return}if(!Kn(sessionStorage.getItem(ie))){if(Kn(localStorage.getItem(ie))){xo();return}Oo(ie).then(e=>{se.size||e.some(Kn)&&(xo(),Be(W(),$e,F.store.showQueueMode))})}}function xo(){try{if(!F.store.persistAcrossRefresh){sessionStorage.removeItem(ie),or(ie);return}let e=vp();sessionStorage.setItem(ie,JSON.stringify(e)),Po(ie,e)}catch(e){zn.warn("Could not save the queue",e)}}function xp(e){if(!(e.key!==ie||!F.store.persistAcrossRefresh||e.newValue==null)){se.clear(),Kn(e.newValue);try{sessionStorage.setItem(ie,e.newValue)}catch(t){zn.warn("Could not mirror the queue",t)}Be(W(),$e,F.store.showQueueMode)}}function et(e){e.length?se.set(qo(),e):se.delete(qo()),nc(),xo(),Be(W(),$e,F.store.showQueueMode)}function Sp(e){if(!e.model&&!e.label)return!0;let t=de();return t?ho(t,wi(e)):!0}function rc(e,t=0){t>=jn||B().generating||C()!==e||(Qo(),setTimeout(()=>rc(e,t+1),vo))}function wp(e,t){let o=F.store.stickyOnNavigate&&ye?ye:e;if(!o||!t.model&&!t.label||ho(o,wi(t))){ve=!1;return}ve=!0,setTimeout(()=>{Qn(o),ve=!1},vo)}function So(e,t=0){if(B().generating||C()){t<jn&&setTimeout(()=>So(e,t+1),vo);return}if(!Sp(e)&&t<jn){ve=!0,Qn(wi(e)),setTimeout(()=>So(e,t+1),vo);return}let o=de();ne(e.text),Ut(()=>rc(e.text)),wp(o,e)}function tc(){if(_e!=null){let o=_e;_e=null,So(o);return}if(!yo||B().generating||C())return;if(!yp()){yo=!1;return}let[e,...t]=W();e!=null&&(yo=!1,et(t),So(e))}function ic(e){let t=W(),o=t[e];if(o!=null){if(et(t.filter((n,r)=>r!==e)),!B().generating){So(o);return}_e=o,lt()?.click()}}var $e={remove:e=>et(W().filter((t,o)=>o!==e)),edit:(e,t)=>et(t.trim()?W().map((o,n)=>n===e?{...o,text:t}:o):W().filter((o,n)=>n!==e)),sendNow:ic,move(e,t){let o=[...W()],[n]=o.splice(e,1);n&&(o.splice(t,0,n),et(o))}};function Ep(e){let t=de(),o={text:e,model:t?.id??"",label:t?.label??""},n=W();return F.store.replacePending&&n.length?(et([...n.slice(0,-1),o]),!0):n.length>=gp?!1:(et([...n,o]),!0)}function Tp(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!Te(e.target)||!B().generating)return;let t=C(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;let o=de();ne(""),_e={text:t,model:o?.id??"",label:o?.label??""},lt()?.click();return}if(!t){W().length&&ic(0);return}Ep(t)&&ne("")}function Cp(){if(ve||!F.store.stickyOnNavigate)return;let e=de();e&&(ye=e)}function Mp(){if(!F.store.stickyOnNavigate||!ye)return;ve=!0;let e=0,t=()=>{if(!ye||Qn(ye)||e>=jn){ve=!1;return}e++,xi=setTimeout(t,vo)};clearTimeout(xi),t()}function Lp(e){let{target:t}=e;!(t instanceof Element)||ve||t.closest(`${u.modelTrigger}, ${u.modelItem}`)&&setTimeout(Cp,0)}var sc=f({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:F,styles:Xl,start(){Ao=new AbortController,qp(),ye=de(),document.addEventListener("keydown",Tp,{capture:!0,signal:Ao.signal}),document.addEventListener("pointerup",Lp,{signal:Ao.signal}),ec=[v.on("fall",({outcome:e})=>{yo=e==="done",e==="left"&&(_e=null),tc()}),v.on("context",({prevId:e,id:t,migrated:o})=>{let n=se.get(Wn);se.delete(Wn),o&&!e&&t&&n&&se.set(t,n),o||(yo=!1,Mp()),xo(),Be(W(),$e,F.store.showQueueMode)}),v.on("tick",()=>{Ap(),tc(),Be(W(),$e,F.store.showQueueMode)})],addEventListener("storage",xp,{signal:Ao.signal}),Be(W(),$e,F.store.showQueueMode)},stop(){Ao?.abort(),clearTimeout(xi);for(let e of ec)e();qi(),se.clear(),_e=null,ye=null,ve=!1},onSettingsChange(e){e==="persistAcrossRefresh"&&xo(),e==="stickyOnNavigate"&&F.store.stickyOnNavigate&&(ye=de()),Be(W(),$e,F.store.showQueueMode)}});var kp=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function Bp(){let e=b(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!kp.has(e.toLowerCase())?e:null}function wo(e){return e?re(e)?.title??oa(e)??(e===h()?Bp():null):null}var ac=`/*
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
`;var qe=E("bloom-recent-"),xe="home",Op=50,lc=140,Pp=new Set(["Backquote"]),Rp=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),x=p({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),Ie=null,me=[],fe=0,Ti,cc=[],Zn=()=>le()?null:h()??(Zo()?xe:null);function uc(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function mc(e){let t=wo(e);t&&x.store.titles[e]!==t&&(x.store.titles={...x.store.titles,[e]:t});let o=na(location.href);o&&e===h()&&x.store.projects[e]!==o&&(x.store.projects={...x.store.projects,[e]:o})}function dc(e){if(!e)return;let t=[e,...x.store.visits.filter(n=>n!==e)].slice(0,Op),o=new Set(t);x.store.visits=t,Object.keys(x.store.previews).some(n=>!o.has(n))&&(x.store.previews=uc(x.store.previews,o)),Object.keys(x.store.titles).some(n=>!o.has(n))&&(x.store.titles=uc(x.store.titles,o)),e!==xe&&mc(e)}function Vn(e){if(!e||!x.store.visits.includes(e))return;let t={},o=re(e)?.chain??[];for(let r of o)t[r.role]=ae($o(r),lc);if(e===h())for(let r of Ce()){let i=mt(r);i&&(t[r.role]=ae(i,lc))}let n=x.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(x.store.previews={...x.store.previews,[e]:t})}function Dp(){let e=Number(x.store.maxRecent);return x.store.visits.filter(t=>t!==xe||x.store.includeHome).slice(0,e)}function Ci(e){if(Eo(),e===Zn())return;let t=e===xe?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"]'):zt(e)[0];t?t.click():location.assign(e===xe?"/":`/c/${e}`)}function Hp(e,t){let o=e===xe?"New chat":x.store.titles[e]??wo(e)??"Untitled chat",n=e===xe?null:x.store.projects[e],r=e===xe?null:x.store.previews[e];return a("button",{class:qe("item"),attrs:{type:"button",role:"option","aria-selected":String(t===fe)},on:{click:()=>Ci(e),mousemove:()=>t!==fe&&Jn(t)}},a("div",{class:qe("head")},a("span",{class:`${qe("title")} bloom-truncate`,text:o}),n&&a("span",{class:qe("project"),text:n})),r?.user&&a("div",{class:`${qe("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&a("div",{class:`${qe("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function Jn(e){fe=(e+me.length)%me.length,Ie?.querySelectorAll(`.${qe("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===fe)))}function Np(){Vn(h());let e=Zn();me=Dp(),e&&(me=[e,...me.filter(t=>t!==e)].slice(0,Number(x.store.maxRecent))),me.length&&(fe=me.length>1?1:0,Ie=a("div",{class:`bloom-root ${qe("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:t=>t.target===t.currentTarget&&Eo()}},a("div",{class:qe("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...me.map(Hp))),document.body.append(Ie))}function Eo(){Ie?.remove(),Ie=null}var Gp=e=>Pp.has(e.code)||Rp.has(e.key);function Up(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&Gp(e)){e.preventDefault(),e.stopPropagation(),Ie?Jn(fe+(e.shiftKey?-1:1)):Np();return}if(!Ie)return;let o={Escape:Eo,Enter:()=>Ci(me[fe]),ArrowDown:()=>Jn(fe+1),ArrowUp:()=>Jn(fe-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function Fp(e){Ie&&e.key==="Control"&&Ci(me[fe])}var fc=f({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:x,styles:ac,start(){Ti=new AbortController;let{signal:e}=Ti;addEventListener("keydown",Up,{capture:!0,signal:e}),addEventListener("keyup",Fp,{capture:!0,signal:e}),addEventListener("blur",Eo,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&Vn(h()),{signal:e}),cc=[ce(({prevId:i})=>{Vn(i),dc(Zn())}),K.on("conversation",({id:i})=>{x.store.visits.includes(i)&&mc(i),Vn(i)})];let{visits:t,titles:o,previews:n}=x.store,r=t.filter(i=>i!==xe&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(x.store.visits=t.filter(i=>!r.includes(i))),dc(Zn())},stop(){Ti?.abort();for(let e of cc)e();Eo()}});var Mi="data:audio/mpeg;base64,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";var pc=new S("ResponseNotification"),Yp=.5,Qp=200,Kp=300,To=p({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:e=>(e.append(U("Preview",Ac)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),gc=null,Li=new Map,hc,ki;function jp(e){return new Promise((t,o)=>GM_xmlhttpRequest({url:e,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=Qp&&n<Kp?t(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var Wp=e=>Uint8Array.from(atob(e.slice(e.indexOf(",")+1)),t=>t.charCodeAt(0)).buffer;function zp(e,t){let o=Li.get(t);return o||(o=(t.startsWith("data:")?Promise.resolve(Wp(t)):jp(t)).then(n=>e.decodeAudioData(n)),o.catch(()=>Li.delete(t)),Li.set(t,o)),o}async function bc(e){gc??=new AudioContext;let t=gc;t.state==="suspended"&&t.resume();let o=t.createBufferSource(),n=t.createGain();o.buffer=await zp(t,e),n.gain.value=Yp,o.connect(n).connect(t.destination),o.start()}function Ac(){let e=To.store.soundUrl.trim();bc(e||Mi).catch(t=>{pc.warn("Sound failed",t),e&&bc(Mi).catch(o=>pc.warn("Default chime failed",o))})}function Vp(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function Jp(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(ki=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:ki.signal}))}var yc=f({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:To,start(){Jp(),hc=v.on("fall",({conversationId:e,outcome:t})=>{t==="done"&&(To.store.onlyWhenHidden&&!document.hidden||(To.store.sound&&Ac(),To.store.browserNotification&&Vp(wo(e))))})},stop(){hc?.(),ki?.abort()}});var Zp=`:is(${u.sidebarScroll}, :has(> ${u.sidebarScroll})) + :has(${u.menuButton})`,Xp=`${u.rail} > :has(${u.menuButton})`,Ii=`:is(${Zp}, ${Xp}, ${u.oldProfile}):not(:hover)`,Bi="[data-bloom-profile-avatar]",$p=`:is(${Ii}, ${Ii} :has(${Bi})) > :not(${Bi}, :has(${Bi}))`,qc=p({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function _p(){let{opacity:e,fadeAvatar:t}=qc.store;return e>=100?"":`${t?Ii:$p}{opacity:${e/100}!important}`}var vc,xc=f({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:qc,styles:_p,start(){vc=ue()},stop(){vc?.()}});var Sc=`/*
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
    width: 2rem;
    height: 2rem;
    border-radius: 0.5rem;
    color: inherit;
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
    overflow: auto;
    padding: 0.375rem;
    border: 1px solid var(--bloom-border);
    border-radius: 0.75rem;
    background: var(--bloom-surface);
    color: var(--bloom-fg);
    box-shadow: var(--bloom-shadow);
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
`;var H=E("bloom-star-chats"),tg=80,og=60,ng=1200,rg=120,wc=180,Ni=p({messages:{type:"custom",default:[]}}),Oi,Pi=!1,Oe=!1,tt=!1,kt=0,$=null,Xn="",k=null,Ri;function Gi(){let e=Ni.store.messages;return Array.isArray(e)?e.filter(t=>w(t)&&typeof t.conversationId=="string"&&typeof t.messageId=="string"&&(t.role==="user"||t.role==="assistant")&&typeof t.snippet=="string"&&typeof t.starredAt=="number"):[]}function Ui(){let e=h();return e?Gi().filter(t=>t.conversationId===e):[]}function ig(e,t){return Gi().some(o=>o.conversationId===e&&o.messageId===t)}function Ec(e){let t=Gi(),o=t.some(n=>n.conversationId===e.conversationId&&n.messageId===e.messageId);Ni.store.messages=o?t.filter(n=>!(n.conversationId===e.conversationId&&n.messageId===e.messageId)):[{...e,starredAt:Date.now()},...t].slice(0,tg)}function Di(e){return e.messageIds[0]||e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.el.getAttribute("data-turn-key")||""}function sg(e){return ae(mt(e)||b(e.el.textContent??""),og)}function ag(e){let t=e.closest(u.turn);return t?Ce().find(o=>t.contains(o.el)&&(o.el.contains(e)||o.el===t))??null:null}function lg(){return[...document.querySelectorAll(".turn-action-controls")].filter(e=>!e.closest(`[data-bloom], [role="dialog"], [inert], pre, ${u.sidebars}`))}function cg(){return[...document.querySelectorAll(u.headerMore)].filter(t=>{if(t.dataset.bloom==="message-star"||t.closest("[data-bloom], [role='dialog'], [inert]")||t.closest(u.sidebars))return!1;let o=t.getBoundingClientRect();return o.width===0&&o.height===0?!!t.closest("header, #page-header"):o.top>=0&&o.top<96&&o.left>window.innerWidth*.5}).toSorted((t,o)=>o.getBoundingClientRect().left-t.getBoundingClientRect().left||(t.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1))[0]??null}function Tc(e,t,o){return a("button",{class:t,attrs:{type:"button","aria-label":e},on:{pointerdown:n=>n.stopPropagation(),mousedown:n=>n.stopPropagation(),click:n=>{n.preventDefault(),n.stopPropagation(),o(n)}}},P("star"))}function ug(e,t){e.setAttribute("aria-pressed",String(t)),e.setAttribute("aria-label",t?"Unstar":"Star")}function Hi(){return Oe||tt}function ot(){kt&&window.clearTimeout(kt),kt=0}function Bt(){Oe=!1,tt=!1,ot(),$?.remove(),$=null,Xn="",k?.classList.remove(H("-open")),k?.setAttribute("aria-expanded","false")}function Fi(e){return e instanceof Node&&!!(k?.contains(e)||$?.contains(e))}function dg(e){e.classList.add(H("-flash")),window.setTimeout(()=>e.classList.remove(H("-flash")),ng)}function mg(e){let t=Ce().find(n=>Di(n)===e),o=t?.el.closest(u.turn)??t?.el;o&&(o.scrollIntoView({block:"start"}),dg(o))}function fg(){let e=h(),t=new Set,o=[...document.querySelectorAll('[data-bloom="message-star"][data-place="action"]')];if(!e||le()){for(let n of o)n.remove();return}for(let n of lg()){if(!pe(n))continue;let r=ag(n),i=r?Di(r):"";if(!r||!i)continue;let s=n.querySelector('[data-place="action"]');(!s||s.dataset.id!==i)&&(s?.remove(),s=Tc("Star",H("-star"),()=>{let l=h(),c=Ce().find(d=>Di(d)===i);!l||!c||Ec({conversationId:l,messageId:i,role:c.role,snippet:sg(c)})}),s.dataset.bloom="message-star",s.dataset.place="action",s.dataset.id=i),ug(s,ig(e,i)),s.parentElement!==n&&n.append(s),t.add(s)}for(let n of o)t.has(n)||n.remove()}function pg(){if(!$||!k)return;let e=k.getBoundingClientRect(),t=$.offsetWidth||288,o=$.offsetHeight||120,n=e.bottom+6;n+o>window.innerHeight-8&&(n=Math.max(8,e.top-o-6));let r=Math.max(8,Math.min(e.right-t,window.innerWidth-t-8));$.style.left=`${Math.round(r)}px`,$.style.top=`${Math.round(n)}px`}function gg(){if(!Hi()||!k){$?.remove(),$=null,Xn="",k?.classList.remove(H("-open")),k?.setAttribute("aria-expanded","false");return}let e=Ui(),t=e.map(o=>`${o.messageId}	${o.snippet}`).join(`
`);if(!$||Xn!==t){$?.remove();let o=e.map(n=>a("div",{class:H("-row")},a("button",{class:H("-jump"),attrs:{type:"button"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),Bt(),mg(n.messageId)}}},a("span",{class:H("-role"),text:n.role==="user"?"You":"ChatGPT"}),a("span",{class:H("-snip"),text:n.snippet||"Message"})),Tc("Unstar",H("-unstar"),()=>Ec(n))));$=a("div",{class:`bloom-root ${H("-panel")}`,attrs:{"data-bloom":"star-list"},on:{pointerenter:()=>{ot(),tt=!0},pointerleave:n=>{Fi(n.relatedTarget)||Oe||(ot(),kt=window.setTimeout(()=>{tt=!1,nt()},wc))}}},a("div",{class:H("-head"),text:"Starred"}),...o.length?o:[a("div",{class:H("-empty"),text:"No starred messages in this chat"})]),document.body.append($),Xn=t}pg(),k.classList.add(H("-open")),k.setAttribute("aria-expanded","true")}function hg(){for(let r of document.querySelectorAll('[data-bloom="starred"]'))r.remove();let e=cg(),t=e?.parentElement??null,o=h();if(!e||!t||t.closest(u.sidebars)||!o||le()||!pe(t)){k?.remove(),k=null,Bt();return}k||(k=a("button",{class:H("-toggle"),attrs:{type:"button","data-bloom":"message-star","data-place":"header","aria-label":"Starred messages","aria-expanded":"false"},on:{pointerdown:r=>r.stopPropagation(),pointerenter:()=>{ot(),kt=window.setTimeout(()=>{tt=!0,nt()},rg)},pointerleave:r=>{Fi(r.relatedTarget)||(ot(),kt=window.setTimeout(()=>{tt=!1,Oe||nt()},wc))},click:r=>{r.preventDefault(),r.stopPropagation(),Oe=!Oe,tt=Oe,ot(),Oe||Bt(),nt()}}},P("star"))),(k.parentElement!==t||k.nextElementSibling!==e)&&e.before(k);let n=e.getBoundingClientRect();n.width>0&&(k.style.width=`${n.width}px`,k.style.height=`${n.height}px`),k.classList.toggle(H("-here"),Ui().length>0),gg()}function bg(){let e=new Set(Ui().map(t=>t.messageId));for(let t of document.querySelectorAll('[data-bloom="navigator"] .bloom-nav-tick, [data-bloom="navigator"] .bloom-nav-row'))t.classList.toggle(H("-mark"),!!t.dataset.messageId&&e.has(t.dataset.messageId))}function nt(){if(!Pi){Pi=!0;try{for(let e of document.querySelectorAll('[data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();fg(),hg(),bg()}finally{Pi=!1}}}function Ag(){Bt(),k?.remove(),k=null;for(let e of document.querySelectorAll('[data-bloom="message-star"], [data-bloom="star-list"], [data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();for(let e of document.querySelectorAll(`.${H("-mark")}`))e.classList.remove(H("-mark"))}var Cc=f({name:"StarChats",description:"Star a message from its toolbar. The star left of the top-right menu opens this chat's list.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:Ni,styles:Sc,onSettingsChange(e){e==="messages"&&nt()},start(){Oi=L(o=>N(o)&&nt());let e=o=>{Fi(o.target)||Hi()&&Bt()};document.addEventListener("pointerdown",e,!0);let t=o=>{o.key!=="Escape"||!Hi()||(o.preventDefault(),Bt())};document.addEventListener("keydown",t,!0),Ri=()=>{document.removeEventListener("pointerdown",e,!0),document.removeEventListener("keydown",t,!0)},nt()},stop(){Oi?.(),Oi=void 0,Ri?.(),Ri=void 0,ot(),Ag()}});var yg="filter:blur(6px)!important;transition:filter 0.2s ease",Mc=`:is(${u.sidebars})`,vg={conversations:{selectors:[`${Mc} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0},projects:{selectors:[`${Mc} a:is([href*="/project"], [href*="/g/g-p-"])`,"[data-app-action-sidebar-project-row]",".bloom-recent-project"],hover:!0},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}},kc=p({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function qg(){return Object.entries(vg).filter(([e])=>kc.store[e]).map(([,{selectors:e,hover:t}])=>{let o=e.join(",");return`:is(${o}){${yg}}`+(t?`:is(${o}):hover, .bloom-recent-item:hover :is(${o}){filter:none!important}`:"")}).join(`
`)}var Lc,Bc=f({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:kc,styles:qg,start(){Lc=ue()},stop(){Lc?.()}});var Oc=p({openNewAsTemporary:{type:"boolean",description:"Open New chat as a temporary chat.",default:!1}}),$n;function xg(e){return e?"/?temporary-chat=true":"/"}function Sg(e){let t=xg(e);`${location.pathname}${location.search}`===t||e&&le()&&location.pathname==="/"||location.assign(t)}function wg(e){if(e.closest("[data-bloom]"))return!1;try{let t=new URL(e.href,location.origin);return t.origin===location.origin&&t.pathname==="/"}catch{return!1}}function Eg(e){if(!Oc.store.openNewAsTemporary||le())return;let{target:t}=e;if(!(t instanceof Element))return;let o=t.closest("a[href]");!(o instanceof HTMLAnchorElement)||!wg(o)||o.closest(`${u.sidebarScroll}, ${u.rail}, ${u.oldSidebar}, nav`)&&(e.preventDefault(),e.stopPropagation(),Sg(!0))}function Ic(){for(let e of document.querySelectorAll('[data-bloom="temporary-chat"]'))e.remove()}var Pc=f({name:"TemporaryChat",description:"Optionally open New chat as a temporary chat. No extra sidebar button.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"ghost",enabledByDefault:!0,settings:Oc,start(){Ic(),$n=new AbortController,document.addEventListener("pointerdown",Eg,{capture:!0,signal:$n.signal})},stop(){$n?.abort(),$n=void 0,Ic()}});var Pe=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)'].join(","),Yi=p({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function Tg(){let e=[`${Pe}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${Pe}>*{margin-block:0!important}`];return Yi.store.italic||e.push(`${Pe}{font-style:inherit!important}`),Yi.store.quotes||(e.push(`${Pe}{quotes:none!important}`),e.push(`${Pe}::before,${Pe}::after,${Pe} p::before,${Pe} p::after{content:none!important}`)),e.join(`
`)}var Rc=f({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:Yi,styles:Tg});var Cg=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],Mg=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",Lg='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',Dc=p({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function kg(){let e=`${Dc.store.width}rem`;return`:is(${Mg}){${Cg.map(t=>`${t}:${e}!important`).join(";")}}:is(${Lg}){max-width:min(100%, ${e})!important}`}var Hc=f({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:Dc,styles:kg});var Bg=[ha,Ma,Ha,Ua,Xa,_a,tl,cl,yl,Cl,kl,Ul,Yl,Ql,Vl,sc,fc,yc,xc,Cc,Bc,Pc,Rc,Hc],Qi=Bg;var Ig=new S("Bloom"),Nc="2.0.67";async function Ki(){Cs();for(let e of Qi)e.updatedAt=Ks[e.name];as(Qi),await os(),ko("base",fs),Qs(),Go("Init"),Wo().then(()=>{Xi(),Go("DOMContentLoaded")}),await Ls(),Go("HostReady"),Ig.info(`Bloom++ ${Nc} ready`)}var Gc=new S("Boot");if(window===window.top){let e=te.Bloom;e&&Gc.warn("Replacing another Bloom++ instance",e.VERSION),Object.defineProperty(te,"Bloom",{value:ji,configurable:!0,writable:!0}),Ki().catch(t=>Gc.error("Startup failed",t))}})();
