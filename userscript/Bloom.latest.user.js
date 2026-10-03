// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.63
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

/* Bloom++ v2.0.63. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Rc=Object.defineProperty;var Pc=(t,e)=>{for(var o in e)Rc(t,o,{get:e[o],enumerable:!0})};var x=class{constructor(e){this.tag=e}log(e,o){console[e](`[Bloom++] [${this.tag}]`,...o)}debug(...e){this.log("debug",e)}info(...e){this.log("info",e)}warn(...e){this.log("warn",e)}error(...e){this.log("error",e)}};var vt=(t,e,o)=>Math.min(o,Math.max(e,t)),w=t=>typeof t=="object"&&t!==null&&!Array.isArray(t),Hi=t=>`${t}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,qt=(t,e)=>t.length>e?`${t.slice(0,e-1)}\u2026`:t,h=t=>t.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function So(t,e){return`${t} ${e}${t===1?"":"s"}`}async function Ni(t){if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}await navigator.clipboard.writeText(t)}function St(t){try{return JSON.parse(t)}catch{return}}var _=typeof unsafeWindow>"u"?window:unsafeWindow;var Di={};Pc(Di,{VERSION:()=>Bc,init:()=>Pi,plugins:()=>Rt});var Dc=new x("Styles"),xe=new Map,Gi=new Set,we=new Map,Vn=!0;function Ui(){let t=document.adoptedStyleSheets.filter(e=>!Gi.has(e));document.adoptedStyleSheets=[...t,...xe.values()]}function Fi(t){document.readyState==="loading"||t.parentNode===document.head||document.head.append(t)}function Hc(t,e){let o=we.get(t);o||(o=document.createElement("style"),o.id=`bloom-style-${t}`,we.set(t,o)),o.textContent!==e&&(o.textContent=e),Fi(o)}function xo(t,e){if(Vn)try{let o=xe.get(t);o||(o=new _.CSSStyleSheet,xe.set(t,o),Gi.add(o)),o.replaceSync(e),Ui();return}catch(o){Dc.warn("Constructed style sheets unavailable, using <style> after parsing",o),Vn=!1,xe.delete(t)}Hc(t,e)}function Zn(t){xe.delete(t)&&Vn&&Ui(),we.get(t)?.remove(),we.delete(t)}function Yi(){for(let t of we.values())Fi(t)}var E=t=>(...e)=>e.map(o=>t+o).join(" "),wo=(...t)=>t.filter(Boolean).join(" "),$t=t=>t.length?`${t.map(e=>`${e}:not([data-bloom])`).join(",")}{display:none!important}`:"";function f(t){return t}var Bt=new x("Storage"),Nc="bloompp",Eo="kv",Qi=null;function Gc(){return Qi??=new Promise((t,e)=>{let o=indexedDB.open(Nc,1);o.onupgradeneeded=()=>{o.result.objectStoreNames.contains(Eo)||o.result.createObjectStore(Eo)},o.onsuccess=()=>t(o.result),o.onerror=()=>e(o.error)}),Qi}function Xn(t,e){return Gc().then(o=>new Promise((n,r)=>{let i=e(o.transaction(Eo,t).objectStore(Eo));i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)}))}async function Uc(t){if(typeof GM_getValue=="function")try{return await GM_getValue(t)}catch(e){Bt.warn("GM read failed",e);return}}async function Fc(t){try{return await Xn("readonly",e=>e.get(t))}catch(e){Bt.warn("IndexedDB read failed",e);return}}function Yc(t){try{return localStorage.getItem(t)??void 0}catch{return}}async function To(t){return Promise.all([Uc(t),Fc(t),Yc(t)])}function Ki(t,e){typeof GM_addValueChangeListener=="function"&&GM_addValueChangeListener(t,(o,n,r,i)=>{i&&e(r)}),addEventListener("storage",o=>{o.key===t&&e(o.newValue)})}function $n(t){if(typeof GM_setValue=="function")try{GM_setValue(t,{})}catch(e){Bt.warn("GM delete failed",e)}try{localStorage.removeItem(t)}catch(e){Bt.warn("localStorage delete failed",e)}Xn("readwrite",e=>e.delete(t)).catch(e=>Bt.warn("IndexedDB delete failed",e))}function Co(t,e){let o=JSON.stringify(e);if(typeof GM_setValue=="function")try{GM_setValue(t,e)}catch{GM_setValue(t,o)}try{localStorage.setItem(t,o)}catch(n){Bt.warn("localStorage write failed",n)}Xn("readwrite",n=>n.put(o,t)).catch(n=>Bt.warn("IndexedDB write failed",n))}var Qc=new x("Settings"),tr="BloomSettings",Kc=100,jc=["GM","IndexedDB","localStorage"],_t={plugins:{}},Mo=new Set,er=new Set,Ee;function Wi(t){let e=t;for(let o=0;typeof e=="string"&&o<2;o++)e=St(e);return!w(e)||!w(e.plugins)||!Object.keys(e.plugins).length?null:e}var _n=t=>t==null||t===""||(Array.isArray(t)?!t.length:w(t)&&!Object.keys(t).length);function Wc(t){return _n(t)?0:Array.isArray(t)?12+Math.min(t.length,40):w(t)?12+Math.min(Object.keys(t).length,40):3}function zc(t){let e=0;for(let o of Object.values(t.plugins))if(w(o))for(let[n,r]of Object.entries(o))n!=="enabled"&&(e+=Wc(r));return e}var ji=t=>Object.values(t.plugins).filter(e=>w(e)&&e.enabled===!0).length;function Jc(t){let e=t.map((i,a)=>i&&{candidate:i,index:a,score:zc(i)}).filter(i=>i!=null).toSorted((i,a)=>a.score-i.score||(i.score?0:ji(a.candidate)-ji(i.candidate))||i.index-a.index);if(!e.length)return null;let[o,...n]=e,r=structuredClone(o.candidate);for(let{candidate:i}of n)for(let[a,c]of Object.entries(i.plugins)){if(!w(c))continue;let l=r.plugins[a]??={};for(let[d,m]of Object.entries(c))d==="enabled"?!("enabled"in l)&&m===!0&&(l.enabled=!0):_n(l[d])&&!_n(m)&&(l[d]=structuredClone(m));Object.keys(l).length||delete r.plugins[a]}return{bag:r,source:jc[o.index]}}async function zi(){let t=await To(tr),e=Jc(t.map(Wi));e&&(_t.plugins=e.bag.plugins,Qc.info("Loaded settings from",e.source))}var Ji=(t,e)=>`${t}
${e}`;function Vi(){Ee=void 0,er.clear(),Co(tr,_t)}function Vc(t){let e=Wi(t);if(!e)return;let o=[];for(let n of new Set([...Object.keys(_t.plugins),...Object.keys(e.plugins)])){let r=_t.plugins[n]??={},i=w(e.plugins[n])?e.plugins[n]:{};for(let a of new Set([...Object.keys(r),...Object.keys(i)]))er.has(Ji(n,a))||JSON.stringify(r[a])===JSON.stringify(i[a])||(i[a]===void 0?delete r[a]:r[a]=i[a],o.push([n,a]))}for(let[n,r]of o)for(let i of Mo)i(n,r)}function Zc(){Ee&&(clearTimeout(Ee),Vi())}var It=(t,e)=>_t.plugins[t]?.[e];function Ot(t,e,o){let n=_t.plugins[t]??={};o===void 0?delete n[e]:n[e]=o,er.add(Ji(t,e)),clearTimeout(Ee),Ee=setTimeout(Vi,Kc);for(let r of Mo)r(t,e)}function te(t){return Mo.add(t),()=>void Mo.delete(t)}function or(t){return t.type==="component"?void 0:t.default}function p(t){let e={def:t,pluginName:"",store:new Proxy({},{get:(o,n)=>It(e.pluginName,n)??(t[n]&&or(t[n])),set:(o,n,r)=>(Ot(e.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(t))t[o].type!=="custom"&&It(e.pluginName,o)!==void 0&&Ot(e.pluginName,o)}};return e}var Zi=t=>{let e=()=>{let o=It("Settings",t);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>e().includes(o),list:e,toggle(o){let n=e();Ot("Settings",t,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},Lo=Zi("pinnedPlugins"),ko=Zi("starredPlugins");addEventListener("pagehide",Zc);Ki(tr,Vc);var Bo=new x("PluginManager"),Rt=new Map,Te=new Set,Xi=new Set,nr=new Set;function $i(t){for(let e of t)e.settings&&(e.settings.pluginName=e.name),Rt.set(e.name,e)}var Ce=t=>!!t.required||(It(t.name,"enabled")??!!t.enabledByDefault);var rr=t=>`plugin-${t.name}`;function _i(t){if(!t.styles)return;let e=typeof t.styles=="function"?t.styles():t.styles;e?xo(rr(t),e):Zn(rr(t))}function ta(t){if(!Te.has(t.name))try{_i(t),t.start?.(),Te.add(t.name)}catch(e){Bo.error(`Failed to start ${t.name}`,e)}}function Xc(t){if(Te.delete(t.name)){Zn(rr(t));try{t.stop?.()}catch(e){Bo.error(`Failed to stop ${t.name}`,e)}}}var ea=t=>t.startAt??"HostReady";function Io(t){Xi.add(t);for(let e of Rt.values())ea(e)===t&&Ce(e)&&ta(e);Bo.info(`${t}: ${[...Te].join(", ")}`)}function oa(t,e){Ot(t.name,"enabled",e),e?Xi.has(ea(t))&&ta(t):Xc(t);for(let o of nr)o()}function na(t){return nr.add(t),()=>void nr.delete(t)}te((t,e)=>{let o=Rt.get(t);if(!(!o||e==="enabled"||!Te.has(t)))try{_i(o),o.onSettingsChange?.(e)}catch(n){Bo.error(`Settings change failed for ${t}`,n)}});var ra=`/*
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
`;var _c=new x("Dom");function s(t,e={},...o){let n=document.createElement(t);e.class&&(n.className=e.class),e.text!=null&&(n.textContent=e.text),e.title&&(n.title=e.title);for(let[r,i]of Object.entries(e.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(e.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var ia=document.createElement("template");function aa(t){return ia.innerHTML=t.trim(),ia.content.firstElementChild.cloneNode(!0)}var Le=t=>t instanceof HTMLElement&&t.isConnected&&t.getClientRects().length>0&&!t.closest("[inert]"),W=(t,e=document)=>[...e.querySelectorAll(t)].find(Le)??null,tu=16,eu="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function sa(t,e){let o=setInterval(t,e),n;try{n=new Worker(URL.createObjectURL(new Blob([eu],{type:"text/javascript"}))),n.addEventListener("message",t),n.postMessage(e)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function ke(t){document.hidden?setTimeout(t,tu):requestAnimationFrame(t)}function ee(t){let e=!1;return()=>{e||(e=!0,ke(()=>{e=!1;try{t()}catch(o){_c.error("Scheduled task failed",o)}}))}}var Oo=new Set,Ro=[],Me,ou=ee(()=>{let t=Ro;Ro=[];for(let e of Oo)e(t)});function C(t){return Oo.add(t),Me||(Me=new MutationObserver(e=>{Ro.push(...e),ou()}),Me.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),t([]),()=>{Oo.delete(t),!Oo.size&&(Me?.disconnect(),Me=void 0,Ro=[])}}var nu=t=>t instanceof Element&&(t.hasAttribute("data-bloom")||!!t.closest("[data-bloom]")),I=t=>!t.length||t.some(e=>!nu(e.target));function Pt(t,e){if(e==null){t.removeAttribute("data-bloom-text"),t.style.removeProperty("--bloom-text-size");return}t.getAttribute("data-bloom-text")!==e&&(t.hasAttribute("data-bloom-text")||t.style.setProperty("--bloom-text-size",getComputedStyle(t).fontSize),t.setAttribute("data-bloom-text",e))}var ru=new x("Events");function Po(){let t=new Map;return{on(e,o){let n=t.get(e);return n||t.set(e,n=new Set),n.add(o),()=>void n.delete(o)},emit(e,o){for(let n of t.get(e)??[])try{n(o)}catch(r){ru.error(`Listener for ${String(e)} failed`,r)}}}}var u={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",modelTrigger:'[data-testid="model-switcher-dropdown-button"], button[aria-label="Model selector" i]',modelItem:'[role="menu"] [data-testid^="model-switcher-"], [role="menuitem"][data-testid^="model-switcher-"]',homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]',headerMore:'button[aria-label="More" i], button[aria-label="\u66F4\u591A"]'};var la=/[​-‍﻿]/g,xt=()=>W(u.composerInput),wt=t=>t instanceof HTMLElement&&t.matches(u.composerInput),F=(t=xt())=>t?.closest("form")??document.querySelector(u.oldComposerForm);function M(t=xt()){if(!t)return"";if(t instanceof HTMLTextAreaElement)return t.value.replace(la,"").trim();let e=t.cloneNode(!0);for(let n of e.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...e.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:e.textContent??"").replace(la,"").trim()}var iu=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function et(t,e=xt()){if(!e)return!1;if(e.focus(),e instanceof HTMLTextAreaElement)return iu?.call(e,t),e.dispatchEvent(new Event("input",{bubbles:!0})),e.setSelectionRange(t.length,t.length),!0;let o=getSelection();return o?.selectAllChildren(e),(t?document.execCommand("insertText",!1,t):document.execCommand("delete"))||(e.textContent=t,e.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:t}))),o?.selectAllChildren(e),o?.collapseToEnd(),!0}function ca(t){if(t instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:a,value:c}=t;return{first:!c.slice(0,i).includes(`
`),last:!c.slice(a).includes(`
`)}}let e=getSelection();if(!e?.rangeCount)return{first:!0,last:!0};let o=e.getRangeAt(0).getBoundingClientRect(),n=t.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(t).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var ua=t=>{let e=F();return(e&&W(t,e))??W(t)},oe=()=>ua(u.stopButton),au=()=>{let t=ua(u.sendButton);return t&&!t.matches(u.stopButton)?t:null};function Do(){let t=au();if(t){t.disabled||t.click();return}xt()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var da=()=>Le(oe());var pa=new x("Network"),su=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,lu=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,No=1e3,cu=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),Y=Po(),ir=new Map,ma=new Map,uu=1,ot=t=>t?ir.get(t)??null:null;function Ho(t){let e=ir.get(t);return e||ir.set(t,e={id:t,title:null,chain:[],times:new Map}),e}var ga=t=>t==="user"||t==="assistant";function ha(t){let e=t.author?.role;if(!t.id||!ga(e)||t.metadata?.is_visually_hidden_from_conversation)return null;let o=t.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=t.content?.parts??[],r=n.filter(l=>typeof l=="string").join(`
`).trim(),i=n.filter(l=>w(l)&&l.content_type==="image_asset_pointer").length,a=t.metadata?.attachments,c=Array.isArray(a)&&a.length>0;return!r&&!i&&!c?null:{id:t.id,role:e,createTime:t.create_time?t.create_time*No:null,text:r,hasFiles:c,imageCount:i}}var ba=t=>t.filter((e,o)=>e.role==="user"||t[o+1]?.role!=="assistant"),ar=t=>t.map(e=>e.createTime).filter(e=>e!=null);function du(t,e){let o=ar(t),n=ar(e);return!o.length||!n.length?!1:Math.max(...o)<Math.min(...n)}function mu(t){let e=ar(t);if(e.length<2)return t;let[o]=e,n=o-t.length;return t.map((i,a)=>(i.createTime!=null&&(n=i.createTime),{message:i,index:a,time:i.createTime??n})).toSorted((i,a)=>i.time-a.time||i.index-a.index).map(i=>i.message)}function fu(t,e){let o=e.filter(w).map(c=>w(c.message)?c.message:c);for(let c of o)c.id&&c.create_time&&t.times.set(c.id,c.create_time*No);let n=o.map(ha).filter(c=>c!=null),r=new Set(n.map(c=>c.id)),i=t.chain.filter(c=>!r.has(c.id)),a=du(n,i)?[...n,...i]:[...i,...n];return t.chain=ba(mu(a)),t}function pu(t,e){if(!w(e)||!(w(e.mapping)||Array.isArray(e.messages)))return null;let o=Ho(t);if(typeof e.title=="string"&&e.title&&(o.title=e.title),Array.isArray(e.messages))return fu(o,e.messages);let n=e.mapping;for(let c of Object.values(n)){let l=c.message?.create_time;c.message?.id&&l&&o.times.set(c.message.id,l*No)}let r=[],i=new Set,a=typeof e.current_node=="string"?e.current_node:null;for(;a&&!i.has(a)&&n[a];){i.add(a);let c=n[a].message,l=c?ha(c):null;l&&r.push(l),a=n[a].parent??null}return r.length&&(o.chain=ba(r.toReversed())),o}function gu(t){try{return new URL(t instanceof Request?t.url:String(t),location.origin)}catch{return null}}function hu(t){if(typeof t?.body!="string")return null;let e=St(t.body);return w(e)&&typeof e.conversation_id=="string"?e.conversation_id:null}function bu(t,e){if(!w(t))return;typeof t.type=="string"&&cu.has(t.type)&&(e.handoff=!0);let o=w(t.v)&&(t.v.message||t.v.conversation_id)?t.v:t;typeof o.conversation_id=="string"&&(e.conversationId=o.conversation_id),(t.error||o.error||t.type==="error")&&(e.error=!0),t.type==="title_generation"&&typeof t.title=="string"&&typeof t.conversation_id=="string"&&(Ho(t.conversation_id).title=t.title,Y.emit("conversation",Ho(t.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&ga(n.author?.role)){let r=n.create_time*No;e.conversationId&&Ho(e.conversationId).times.set(n.id,r),Y.emit("message-time",{conversationId:e.conversationId,messageId:n.id,time:r})}}async function Au(t,e){let o=t.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:a}=await o.read();if(i)break;r+=n.decode(a,{stream:!0});let c=r.split(`
`);r=c.pop()??"";for(let l of c){if(!l.startsWith("data:"))continue;let d=l.slice(5).trim();d&&d!=="[DONE]"&&bu(St(d),e)}}}async function yu(t,e,o){let n={conversationId:e,error:!1,handoff:!1};ma.set(t,e),Y.emit("generate-start",{requestId:t,conversationId:e});try{let r=await o;r.ok?r.headers.get("content-type")?.includes("event-stream")&&await Au(r.clone(),n):n.error=!0}catch(r){let i=r instanceof DOMException&&r.name==="AbortError";n.handoff||=i,n.error||=!i}finally{ma.delete(t),Y.emit("generate-end",{requestId:t,...n})}}async function vu(t,e){try{let o=await e;if(!o.ok)return;let n=pu(t,await o.clone().json());n&&Y.emit("conversation",n)}catch(o){pa.debug("Conversation read skipped",o)}}function qu(t,e,o){let n=gu(t);if(!n||n.origin!==location.origin)return;let r=(e?.method??(t instanceof Request?t.method:"GET")).toUpperCase();if(r==="POST"&&su.test(n.pathname)){yu(uu++,hu(e),o);return}let i=r==="GET"&&n.pathname.match(lu)?.[1];i&&vu(i,o)}var fa=!1;function Aa(){if(fa)return;fa=!0;let t=_.fetch,e=function(o,n){let r=t.call(this??_,o,n);try{qu(o,n,r)}catch(i){pa.error("Fetch tap failed",i)}return r};_.fetch=typeof exportFunction=="function"?exportFunction(e,_):e}var Su="__reactContainer$",ya="__reactFiber$";function Go(){return document.readyState!=="loading"?Promise.resolve():new Promise(t=>document.addEventListener("DOMContentLoaded",()=>t(),{once:!0}))}var sr=(t,e)=>Object.keys(t.wrappedJSObject??t).some(o=>o.startsWith(e)),Z=t=>!sr(document,Su)||sr(t,ya);function Be(){return document.body?Promise.resolve():new Promise(t=>{let e=new MutationObserver(()=>{document.body&&(e.disconnect(),t())});e.observe(document,{childList:!0,subtree:!0})})}async function va(){await Be();let t=Date.now()+8e3;for(;!sr(document.body,ya)&&Date.now()<t;)await new Promise(e=>setTimeout(e,100))}var xu=new x("Route"),qa=/\/c\/(?!local-)([\w-]+)/,wu=500,it=t=>{try{return new URL(t,location.origin).pathname.match(qa)?.[1]??null}catch{return null}},b=()=>location.pathname.match(qa)?.[1]??null,Qo=()=>location.pathname==="/",Eu=/^\/g\/g-p-[^/]+(?:\/project)?\/?$/,Sa=()=>Eu.test(location.pathname),at=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",Fo=new Set,Yo=location.href,cr=b(),Uo;function lr(){if(location.href===Yo)return;let t={prevHref:Yo,href:location.href,prevId:cr,id:b()};Yo=t.href,cr=t.id;for(let e of Fo)try{e(t)}catch(o){xu.error("Route listener failed",o)}}function Tu(){let t=new AbortController,{navigation:e}=_;e?.addEventListener("currententrychange",()=>queueMicrotask(lr),{signal:t.signal}),addEventListener("popstate",lr,{signal:t.signal});let o=setInterval(lr,wu);return()=>{t.abort(),clearInterval(o)}}function st(t){return Fo.add(t),Uo||(Yo=location.href,cr=b(),Uo=Tu()),()=>{Fo.delete(t),!Fo.size&&(Uo?.(),Uo=void 0)}}var Cu=["data-turn","data-message-author-role"],Mu=/:(user|assistant)$/,ur=`${u.messageUnit}, ${u.oldMessage}`,dr=t=>t==="user"||t==="assistant",Ta=()=>!!document.querySelector(u.timelineScroll),ne=()=>Ta()?W(u.timelineScroll):document;function Oe(){if(Ta())return W(u.timelineScroll);let t=document.querySelector(u.turn);for(let e=t?.parentElement;e;e=e.parentElement){let{overflowY:o}=getComputedStyle(e);if((o==="auto"||o==="scroll")&&e.scrollHeight>e.clientHeight)return e}return document.scrollingElement}var re=t=>t.getAttribute("data-chatgpt-search-unit-key")?.match(Mu)?.[1]??null,Ca=t=>[...t.querySelectorAll(u.searchUnit)].filter(e=>re(e)&&!e.parentElement?.closest(u.searchUnit)),xa=t=>(t.getAttribute("data-chatgpt-search-message-ids")??t.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function Ie(t){let e=xa(t);return e.length?e:[...new Set([...t.querySelectorAll(ur)].flatMap(xa))]}function Re(t=ne()){if(!t)return[];let e=Ca(t);return e.length?e:[...t.querySelectorAll(ur)].filter(o=>!o.parentElement?.closest(ur))}function Lu(t,e){for(let o=t.length-1;o>=0;o--){let n=e.find(r=>r.id===t[o]);if(n)return n.role}return null}function ku(t){for(let e of Cu){let o=t.getAttribute(e)??t.querySelector(`[${e}]`)?.getAttribute(e);if(dr(o))return o}return t.querySelector(u.markdown)||t.querySelector(u.generatedImage)?"assistant":null}var Bu=t=>!t.parentElement?.closest(u.turn);function jo(){let t=ot(b())?.chain??[];return[...ne()?.querySelectorAll(u.turn)??[]].filter(Bu).flatMap(o=>{let n=Ca(o),r=n.length?n.map(i=>({el:i,known:re(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=d=>!n.some(m=>m.contains(d))&&h(d.textContent??""),a=[...o.querySelectorAll(u.assistantMarkdown)].find(d=>i(d)&&!Ko.test(h(d.textContent??""))),c=[...o.querySelectorAll(u.activityHeader)].findLast(i),l=a??c;l&&r.push({el:l,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?Ie(o):Re(o).flatMap(Ie),a=n??ku(o)??Lu(i,t)??(r%2?"assistant":"user"),c=o.closest(u.turn)??o,l=!o.closest(u.searchUnit)&&!!c.querySelector(u.turnBusy),d=a==="assistant"&&(o.matches(u.turnBusy)||!!o.querySelector(u.turnBusy)||l);return{el:o,role:a,messageIds:i,streaming:d}})}var Iu="[data-bloom], .sr-only",Ma=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,Ko=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,wa=new WeakMap;function Wo(t){let o=(t.el.closest(u.turn)??t.el).textContent?.length??0,n=wa.get(t.el);if(n?.length===o)return n.summary;let r=Ou(t);return wa.set(t.el,{length:o,summary:r}),r}function Ea(t){let e=new Set,o=[];for(let n of t.querySelectorAll(u.assistantMarkdown)){if(n.closest(u.searchUnit))continue;let r=h(n.textContent??"");!r||Ko.test(r)||Ma.test(r)||e.has(r)||(e.add(r),o.push(r))}return o}function Ou(t){let e=t.el.querySelectorAll(u.generatedImage).length;if(t.role==="assistant"&&e)return e>1?`Image \xD7${e}`:"Image";let o=t.el.closest(u.turn);if(t.role==="assistant"&&o&&t.el.matches(u.assistantMarkdown)&&!t.el.closest(u.searchUnit)){let l=Ea(o);if(l.length)return l.join(" \xB7 ")}let n=t.el.querySelector(t.role==="assistant"?u.markdown:".whitespace-pre-wrap")??t.el,i=[...n.querySelectorAll(Iu)].map(l=>h(l.textContent??"")).filter(Boolean).reduce((l,d)=>l.replace(d,`
`),n.innerText||n.textContent||""),a=i.split(`
`).map(h).filter(l=>l&&!Ma.test(l)&&!Ko.test(l));if(a.length)return a.join(" ");if(t.role==="assistant"&&o){let l=Ea(o);if(l.length)return l.join(" \xB7 ")}let c=i.split(`
`).map(h).filter(l=>Ko.test(l));return c.length?c.at(-1)??"":t.role==="user"&&t.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function zo(t){return t.text?h(t.text):t.imageCount?t.imageCount>1?`Image \xD7${t.imageCount}`:"Image":t.hasFiles?"File":""}var La=t=>t.matches(u.timelineScroll)&&getComputedStyle(t).flexDirection==="column-reverse";var Ru=250,Pu=400,Du=6e4,Hu=5e3,Nu=`:is(${u.turn}) :is(${u.turnBusy})`,v=Po(),Zo=new Set,mr=new Set,Et=!1,Ba=0,ie=null,ae=!1,Jo=!1,Pe=0,Xo=!1,De=null,ka=!1,k=()=>({generating:Et,conversationId:b()}),Ia=()=>da()||!!ne()?.querySelector(Nu);function Gu(){let t=Ia();return t?Jo||(Pe=0,Xo=!0):Jo=!1,[...Zo].some(e=>!mr.has(e))||t&&!Jo||Date.now()<Pe}function Uu(){return De?.error?"error":ae?"stopped":"done"}function Fu(){ie=null,Et=!1,Xo=!1,v.emit("fall",{conversationId:b(),outcome:Uu()}),ae=!1,De=null}function Oa(){let t=Gu();t&&!Et&&(Et=!0,Ba=Date.now(),ae=!1,De=null,v.emit("rise",{conversationId:b()})),t||!Et?ie=null:ie==null?ie=Date.now():Date.now()-ie>=Pu&&Fu()}function Vo(){Oa(),v.emit("tick",k())}function Yu({prevId:t,id:e}){if(t===e)return;let o=!t&&!!e&&(Et||Date.now()-Ba<Du);if(!o&&Et){for(let n of Zo)mr.add(n);Jo=Ia(),Pe=0,Xo=!1,ie=null,Et=!1,ae=!1,De=null,v.emit("fall",{conversationId:t,outcome:"left"})}v.emit("context",{prevId:t,id:e,migrated:o}),Vo()}function Qu(t){t.target instanceof Element&&t.target.closest(u.stopButton)&&(ae=!0,Pe=0)}function Ra(){ka||(ka=!0,Y.on("generate-start",({requestId:t})=>{Zo.add(t),Vo()}),Y.on("generate-end",t=>{Zo.delete(t.requestId),!mr.delete(t.requestId)&&(De=t,Pe=t.handoff&&!t.error&&!ae&&!Xo?Date.now()+Hu:0,Vo())}),st(Yu),document.addEventListener("click",Qu,!0),sa(Vo,Ru),Go().then(()=>C(Oa)))}var Pa={BetterNavigator:1791047029e3,BetterQuotes:1791042892e3,ChatListStatus:1791034734e3,ChatStateFavicons:1791034734e3,Cleaner:1791034734e3,ComposerOpacity:1791037311e3,Continue:1791034734e3,CustomSidebarIdentity:1791034734e3,GreetingCustomizer:1791037311e3,InputHistory:1791034734e3,MessageTimestamps:1791034734e3,NoDictation:1791034734e3,NoShareLink:1791034734e3,NoSidebarIdentity:1791034734e3,PromptQueue:1791041596e3,RecentTopics:1791034734e3,ResponseNotification:1791034734e3,Settings:1791039171e3,SidebarIdentityOpacity:1791034734e3,StarChats:1791047802e3,StreamerMode:1791034734e3,TemporaryChat:1791042892e3,UserQuotes:1791042892e3,WiderChat:1791034734e3};var A=t=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`,Ku="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",ju={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${Ku}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:A('<path d="M18 6 6 18M6 6l12 12"/>'),gear:A('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:A('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:A('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:A('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:A('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:A('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:A('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:A('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:A('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:A('<path d="m6 9 6 6 6-6"/>'),play:A('<path d="M7 4v16l13-8z"/>'),plus:A('<path d="M12 5v14M5 12h14"/>'),check:A('<path d="m5 12 5 5 9-10"/>'),alert:A('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:A('<path d="M4 5h16v11H9l-5 4z"/>'),layout:A('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:A('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:A('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:A('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:A('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:A('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:A('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:A('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:A('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:A('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:A('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:A('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:A('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:A('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:A('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:A('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),ghost:A('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},D=t=>aa(ju[t]);var mt="data-bloom-tip",fr=6,pr=8,Dt,Da=null;function se(t){if(t===Da)return;if(Da=t,!t){Dt?.remove();return}Dt??=s("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),Dt.textContent=t.getAttribute(mt),document.body.append(Dt);let e=t.getBoundingClientRect(),{width:o,height:n}=Dt.getBoundingClientRect(),r=e.bottom+fr+n<=innerHeight-pr;Dt.style.left=`${vt(e.left+e.width/2-o/2,pr,innerWidth-o-pr)}px`,Dt.style.top=`${r?e.bottom+fr:e.top-fr-n}px`}var Ha=t=>t instanceof Element?t.closest(`[${mt}]`):null;function Na(){let t=new AbortController,e={passive:!0,signal:t.signal};return document.addEventListener("pointerover",o=>se(Ha(o.target)),e),document.addEventListener("pointerout",o=>o.relatedTarget||se(null),e),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&se(Ha(o.target)),e),document.addEventListener("focusout",()=>se(null),e),document.addEventListener("pointerdown",()=>se(null),e),()=>{t.abort(),se(null)}}function gr(t,e,o,n=!1){let r=s("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(t),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let a=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(a)),e(a)}),r}function N(t,e,o){return s("button",{class:wo("bloom-button",o&&`bloom-button-${o}`),text:t,attrs:{type:"button","data-bloom":"control"},on:{click:e}})}function z(t,e,o,n){let r=s("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":e,"data-bloom":"control",[mt]:e},on:{click:o}},D(t));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function $o(t,e,o,n,r,i){let a=s("input",{attrs:{type:"range",min:String(e),max:String(o),step:String(n)}});a.value=String(t);let c=s("output",{text:`${a.value}${r}`});return a.addEventListener("input",()=>{c.textContent=`${a.value}${r}`,i(Number(a.value))}),s("div",{class:"bloom-slider"},a,c)}function hr(t,e,o){let n=s("select",{class:"bloom-select"},...e.map(r=>s("option",{text:r.label,attrs:{value:r.value}})));return n.value=t,n.addEventListener("change",()=>o(n.value)),n}function He(t,e,o="",n="text"){let r=s("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=t,r.addEventListener("change",()=>e(r.value)),r}var Wu=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,Ga=/\S+@\S+\.\S+/,zu=3,Ju=/^\/g\/(g-p-[^/]+)\//,Vu=/^g-p-[0-9a-f]+-?/i,Ua=t=>!!t.closest(".sr-only"),br=t=>!!t?.querySelector(u.menuButton);function Fa(){return[...document.querySelectorAll(u.sidebarScroll)].map(t=>[t.nextElementSibling,t.parentElement?.nextElementSibling].find(br)).filter(t=>t!=null)}function Ya(){let t=[...document.querySelectorAll(u.oldProfile)];if(t.length)return t.map(o=>{let n=o.parentElement?.children.length===1?o.parentElement:o;return{kind:"profile",anchor:n,insert:r=>n.before(r)}});let e=Fa().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(u.rail)){let n=[...o.children].find(br);n&&e.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return e}var Ar=t=>!t.closest("[data-bloom]")&&(!!t.querySelector("img, [class*=rounded-full]")||Wa(t).some(e=>!Ua(e))),Qa=t=>[...t.parentElement?.children??[]].find(e=>e!==t&&e instanceof HTMLElement&&Ar(e))??null;function Ka(){let t=[...document.querySelectorAll(u.oldProfile)];return t.length?t:[...Fa(),...[...document.querySelectorAll(u.rail)].map(o=>[...o.children].findLast(br))].map(o=>[...o?.querySelectorAll(u.menuButton)??[]].findLast(n=>Ar(n)||Qa(n))).filter(o=>o!=null)}var ja=()=>Ka().map(t=>Ar(t)?t:Qa(t)).filter(t=>t!=null);function Wa(t){return[...t.querySelectorAll("*")].filter(e=>!e.children.length&&!e.closest("[data-bloom]")&&!!h(e.textContent??"")&&!(e instanceof SVGElement))}var Zu=t=>{if(/rounded-full/.test(t.getAttribute("class")??""))return!0;if(!t.clientWidth)return!1;let{borderRadius:e}=getComputedStyle(t);return e.includes("%")||Number.parseFloat(e)>=t.clientWidth/2};function _o(t,e,o){for(let n of t.querySelectorAll(`[${e}]`))n!==o&&n.removeAttribute(e);o&&!o.hasAttribute(e)&&o.setAttribute(e,"")}function Xu(t,e){if(h(t.textContent??"").length>zu)return null;let o=t.closest("button");for(let n=t;n&&n!==e&&n!==o;n=n.parentElement)if(Zu(n))return n;return null}function yr(t,e){t.hasAttribute(`data-bloom-${e}`)||t.setAttribute(`data-bloom-${e}`,"");let o=t.querySelector("img:not([data-bloom] img)"),n=Wa(t),r=o?null:n.map(m=>Xu(m,t)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),a=(i&&i!==t&&t.contains(i)?i:o??r)??t.querySelector("[class*=rounded-full]:not([data-bloom] *)");_o(t,`data-bloom-${e}-avatar`,a);let c=n.filter(m=>!a?.contains(m)&&!Ua(m)),l=c.find(m=>Wu.test(h(m.textContent??""))),d=c.find(m=>Ga.test(m.textContent??""));_o(t,`data-bloom-${e}-plan`,l),_o(t,`data-bloom-${e}-email`,d),_o(t,`data-bloom-${e}-name`,c.find(m=>m!==l&&m!==d))}function $u(t){let e=t.getAttribute("aria-expanded")==="true"&&t.getAttribute("aria-controls"),o=e?document.getElementById(e):null;return o?.matches('[role="menu"]')?o:null}function tn(){return Ka().map($u).find(t=>t!=null)??[...document.querySelectorAll('[role="menu"]')].find(t=>!t.closest("[data-bloom]")&&(Ga.test(t.textContent??"")||t.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var Ne=t=>[...document.querySelectorAll(u.conversationLink)].filter(e=>!e.closest("[data-bloom]")&&it(e.href)===t);function za(t){let e=Ne(t).find(o=>h(o.textContent??""));return e?h(e.textContent??""):null}function Ja(t){let e=new URL(t,location.origin).pathname.match(Ju)?.[1];if(!e)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(e)}"]`)].find(n=>!it(n.href)&&h(n.textContent??""));return o?h(o.textContent??""):e.replace(Vu,"").replaceAll("-"," ")||null}var vr=0,en;function _u(t){if(!I(t))return;for(let o of ja())yr(o,"profile");let e=tn();e&&yr(e,"menu")}function lt(){vr++;let t=!0;return Be().then(()=>{t&&vr&&!en&&(en=C(_u))}),()=>{t&&(t=!1,!--vr&&(en?.(),en=void 0))}}var td=new x("SettingsPanel"),g=E("bloom-settings-"),ed=10080*60*1e3,od=3e3,Va="Toggle features. Some need a reload. Click the sliders icon to configure.",nd=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],rd=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],id={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},Xa=new Set(["chat","ui","privacy"]),Q=null,Nt="all",qr="all",on="",Sr=[],$a=()=>[...Rt.values()].filter(t=>!t.hidden),ad=t=>!!t.updatedAt&&Date.now()-t.updatedAt<ed;function sd(t){switch(Nt){case"favorites":return ko.has(t.name);case"recent":return ad(t);case"all":return!0;case"other":return!t.tags.some(e=>Xa.has(e));case"chat":case"ui":case"privacy":return t.tags.includes(Nt)}}function ld(t){switch(qr){case"all":return!0;case"enabled":return Ce(t);case"disabled":return!Ce(t)}}function cd(t){let e=on.trim().toLowerCase();return!e||[t.name,t.description,...t.tags].some(o=>o.toLowerCase().includes(e))}function ud(t){let e=Lo.list(),o=n=>e.includes(n.name)?e.indexOf(n.name):e.length;return Nt==="recent"?t.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):t.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var _a=t=>t.settings?.def??{},dd=t=>Object.values(_a(t)).some(e=>e.type!=="custom");function md(t,e,o){let n=It(t.name,e)??or(o),r=i=>Ot(t.name,e,i);switch(o.type){case"boolean":return gr(n,r,o.description??e);case"slider":return $o(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return hr(n,o.options,r);case"string":return He(n,r,o.placeholder);case"number":return He(String(n),i=>r(Number(i)),"","number");case"component":{let i=s("div",{class:g("component")});return Sr.push(o.render(i)),i}case"custom":return null}}var fd=t=>t.replaceAll(/([A-Z])/g," $1").replace(/^./,e=>e.toUpperCase());function ts(t){if(!Q)return;let e=Object.entries(_a(t)).filter(([,i])=>i.type!=="custom").map(([i,a])=>{let c=md(t,i,a),l=a.type==="boolean",d=a.type!=="component"&&s("div",{class:g("field-label"),text:fd(i)}),m=a.description&&s("div",{class:g("field-desc"),text:a.description});return s("div",{class:g("field",l?"field-inline":"field-stacked")},(d||m)&&s("div",{class:g("field-text")},d,m),c)}),o,n=N("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},od);return}clearTimeout(o),t.settings?.reset(),Ge(),ts(t)},"danger"),r=s("div",{class:g("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&Ge()}},s("div",{class:g("popup"),attrs:{role:"dialog","aria-label":`${t.name} settings`}},s("div",{class:g("popup-header")},s("div",{class:g("card-icon")},D(t.icon)),s("div",{class:g("popup-title")},s("div",{class:g("card-name"),text:t.name}),s("div",{class:g("popup-authors"),text:t.authors.join(", ")})),z("close","Close",Ge)),s("p",{class:g("popup-desc"),text:t.description}),s("div",{class:g("fields")},...e),s("div",{class:g("popup-footer")},n)));Q.querySelector(`.${g("modal")}`)?.append(r)}function Ge(){for(let t of Sr)t();Sr=[],Q?.querySelector(`.${g("popup-backdrop")}`)?.remove()}function Za(t){let e=Ce(t),o=ko.has(t.name),n=Lo.has(t.name),r=!!t.required;return s("div",{class:[g("card",e?"card-on":"card-off"),r?g("card-required"):""].filter(Boolean).join(" ")},s("div",{class:g("card-top")},s("div",{class:g("card-icon")},D(t.icon)),s("div",{class:g("card-actions")},z("star",o?"Unstar":"Star",()=>{ko.toggle(t.name),Ht()},o),r?null:z("pin",n?"Unpin":"Pin to top",()=>{Lo.toggle(t.name),Ht()},n),r?s("span",{class:g("required-mark"),attrs:{"aria-label":"Required",[mt]:"This plugin is required for Bloom++ to work"}},D("alert")):null,dd(t)&&z("gear","Settings",()=>ts(t)),gr(e,i=>oa(t,i),r?`${t.name} is required`:`Enable ${t.name}`,r))),s("div",{class:g("card-name"),text:t.name}),s("div",{class:g("card-desc"),text:t.description,title:t.description}),s("div",{class:g("card-footer"),text:t.authors.join(", ")}))}function es(){let t=$a().some(o=>!o.tags.some(n=>Xa.has(n)));Q?.querySelector(`.${g("tabs")}`)?.replaceChildren(...nd.filter(o=>o.id!=="other"||t).map(o=>s("button",{class:g("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===Nt)},on:{click:()=>{Nt=o.id,es(),Ht()}}})))}function Ht(){if(!Q)return;let t=$a().filter(sd),e=Q.querySelector(`.${g("search")} input`);e&&(e.placeholder=`Search ${So(t.length,"plugin")}...`);let o=ud(t.filter(d=>cd(d)&&ld(d))),n=Nt==="all",r=n?o.filter(d=>!d.required):o,i=n?o.filter(d=>d.required):[],a=[...r.map(Za),...i.length?[s("div",{class:g("required-break"),attrs:{role:"separator"}}),...i.map(Za)]:[]],c=on.trim()?"No plugins match your search.":id[Nt]??"No plugins available.";Q.querySelector(`.${g("grid")}`)?.replaceChildren(...a.length?a:[s("div",{class:g("empty"),text:c})])}function pd(t){t.key==="Escape"&&(t.preventDefault(),t.stopPropagation(),Q?.querySelector(`.${g("popup-backdrop")}`)?Ge():le())}var os,xr;function gd(){if(Q)return;let t=s("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});t.value=on,t.addEventListener("input",()=>{on=t.value,Ht()}),Q=s("div",{class:`bloom-root ${g("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:e=>e.target===e.currentTarget&&le()}},s("div",{class:g("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},s("div",{class:g("header")},s("div",{class:g("logo")},D("bloom")),s("h2",{class:g("title"),text:"Bloom++"}),s("span",{class:g("hint"),attrs:{"aria-label":Va,tabindex:"0",[mt]:Va}},D("info")),s("span",{class:g("version"),text:"v2.0.63"}),z("close","Close",le)),s("div",{class:g("tabs"),attrs:{role:"tablist"}}),s("div",{class:g("toolbar")},s("label",{class:g("search")},D("search"),t),hr(qr,rd,e=>{qr=e,Ht()})),s("div",{class:g("grid")}))),Q.addEventListener("keydown",e=>e.stopPropagation()),xr=new AbortController,document.addEventListener("keydown",pd,{capture:!0,signal:xr.signal}),document.body.append(Q),es(),Ht(),os=na(Ht),t.focus(),td.debug("Opened")}function le(){Ge(),xr?.abort(),os?.(),Q?.remove(),Q=null}var nn=()=>Q?le():gd();var ns=`/*
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
`;var Tt=E("bloom-entry-"),bd=4,wr="--bloom-entry-x",Er=1,ce=p({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar. The account menu and the userscript menu always open the panel.",default:!1},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:!0},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:t=>(t.append(N("Reset position",()=>{ce.store.entryPosition=Er})),()=>t.replaceChildren())},entryPosition:{type:"custom",default:Er}}),Gt=new Map,rs=!1,is=[];function Ad(t,e,o){let n=t.currentTarget,r=e.clientWidth-n.offsetWidth;if(t.button!==0||r<=0||!e.classList.contains(Tt("hover")))return;let i=ce.store.entryPosition,a=i,c=!1,l=new AbortController;n.setPointerCapture(t.pointerId),n.addEventListener("pointermove",m=>{!c&&Math.abs(m.clientX-t.clientX)<bd||(c=!0,o(),a=vt(i+(m.clientX-t.clientX)/r,0,Er),e.style.setProperty(wr,String(a)))},{signal:l.signal});let d=()=>{l.abort(),c&&(ce.store.entryPosition=a,e.style.removeProperty(wr))};n.addEventListener("pointerup",d,{signal:l.signal}),n.addEventListener("lostpointercapture",d,{signal:l.signal})}function yd(t){let e=!1,o=s("button",{class:Tt("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),e||nn(),e=!1},pointerdown:r=>{e=!1,t!=="rail"&&Ad(r,n,()=>{e=!0})}}},D("bloom"),t!=="rail"&&s("span",{class:Tt("label"),text:"Bloom++"})),n=s("div",{class:`bloom-root ${Tt("wrap")} ${Tt(t)}`,attrs:{"data-bloom":"entry"}},o);return n}function vd(t){let e=s("div",{class:`bloom-root ${Tt("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),t.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),nn()}}},D("bloom"),s("span",{text:"Bloom++"})),o=t.querySelector('[role="menuitem"]');o?.parentElement?o.before(e):t.prepend(e)}function as(){let{showSidebarEntry:t,showSidebarEntryOnHover:e}=ce.store,o=t||e?Ya():[];for(let[r,i]of Gt)r.isConnected&&o.some(a=>a.anchor===r)||(i.remove(),Gt.delete(r));for(let r of o){let i=Gt.get(r.anchor);if(i?.isConnected||!Z(r.anchor))continue;let a=i??yd(r.kind);Gt.set(r.anchor,a),r.insert(a)}for(let r of Gt.values())r.classList.toggle(Tt("hover"),!t);let n=tn();n&&!n.querySelector('[data-bloom="menu-entry"]')&&vd(n)}var ss=f({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:ce,styles:()=>`${ns}.${Tt("hover")}{${wr}:${ce.store.entryPosition}}`,start(){is=[C(as),Na(),lt()],!rs&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",nn),rs=!0)},stop(){for(let t of is)t();for(let t of Gt.values())t.remove();Gt.clear(),le()},onSettingsChange:as});var ls=`/*
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
`;var B=E("bloom-nav-"),sn=80,Sd=1200,xd=2,cs=3e4,wd=200,Ed=.9,Td=.3,Cd=12,Md={user:"\u2753",assistant:"\u{1F916}"},Ld=["wheel","touchmove","pointerdown"],ln=p({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),O=null,H=[],Ft=-1,Yt=-1,ue=null,rn="",Cr=0,us=[],Qe=null,an=null,Ut,Ue,Mr="",Fe=[],kd=t=>ln.store.showAssistant||t.role==="user",Bd=t=>t.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||t.messageIds[0]||t.role;function Id(t){return{role:t.role,summary:Wo(t),ids:t.messageIds,turn:t,streaming:t.streaming}}function gs(t,e){let o=t.entries.at(-1);if(o?.role==="assistant"&&e.role==="assistant"){t.entries[t.entries.length-1]={...e,ids:[...new Set([...o.ids,...e.ids])]};return}t.entries.push(e)}function Od(){let t=[];for(let e of jo()){let o=Id(e),n=Bd(e),r=t.at(-1);r?.key===n?gs(r,o):t.push({key:n,entries:[o]})}return t}function Rd(){let t=[];for(let e of ot(b())?.chain??[]){let o={role:e.role,summary:zo(e),ids:[e.id],turn:null,streaming:!1},n=t.at(-1);e.role==="assistant"&&n?gs(n,o):t.push({key:e.id,entries:[o]})}return t}var ds=t=>t.entries.flatMap(e=>e.ids);function Lr(t,e){let o=new Set(ds(t));return ds(e).some(n=>o.has(n))}var Qt=t=>h(t.entries.find(e=>e.role==="user")?.summary??""),Tr=(t,e)=>t.filter(o=>Qt(o)===e).length,kr=t=>({...t,turn:null,streaming:!1});function Pd(t,e){let o=new Set(e.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return t.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return kr(r);let a=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return a&&a!==n.key?kr(r):r})}))}function Dd(t,e){let o=e.entries.map((n,r)=>{let i=t.entries[r];if(!i)return n;let a=[...new Set([...n.ids,...i.ids])];return{...n,ids:a,summary:n.summary||i.summary}});for(let n of t.entries.slice(o.length))o.push(kr(n));return{key:t.key,entries:o}}function hs(){let t=Oe();if(!t)return!1;let e=t.clientHeight-t.scrollHeight;return t.scrollTop-e<=Math.abs(t.scrollTop)}function Hd(t,e){let o=Pd(t,e);if(!e.length)return o;if(!o.length)return e;let n=e.findIndex(l=>o.some(d=>d.key===l.key));if(n<0)return hs()?e.concat(o):o.concat(e);let r=e[n]?.key,i=o.findIndex(l=>l.key===r),a=o.slice(0,i).concat(e.slice(0,n),o.slice(i)),c=a.findIndex(l=>l.key===r);for(let l=n;l<e.length;l++){let d=e[l];if(!d)continue;let m=a.findIndex(q=>q.key===d.key);if(m>=0){let q=a[m];q&&(a[m]=Dd(q,d)),c=m}else a.splice(c+1,0,d),c++}return a}function Nd(t,e){let o=0,n=0,r=0;for(let i=1-t.length;i<e.length;i++){let a=0,c=0;for(let d=0;d<t.length;d++){let m=e[d+i],q=t[d];!m||!q||(Lr(q,m)?(a+=3,c++):Qt(q)&&Qt(q)===Qt(m)&&a++)}let l=hs()?i<r:i>r;(a>o||a===o&&c>n||a===o&&c===n&&l)&&(o=a,n=c,r=i)}return{score:o,offset:r}}function Gd(t,e){let o=t.entries.map((n,r)=>{let i=e.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of e.entries.slice(o.length))o.push({...n,turn:null});return{key:t.key,entries:o}}function Ud(t){return t.map(e=>({key:e.key,entries:e.entries.map(o=>({...o}))}))}function Fd(t,e){if(!e.length)return t;if(!t.length)return e;let{score:o,offset:n}=Nd(t,e),r=Ud(t);if(o>0)for(let c=0;c<r.length;c++){let l=e[c+n],d=r[c];if(!l||!d)continue;let m=Qt(d),q=!!m&&m===Qt(l)&&Tr(t,m)===1&&Tr(e,m)===1;(Lr(d,l)||q)&&(r[c]=Gd(d,l))}let i=[],a=[];for(let c=0;c<e.length;c++){let l=e[c];if(!l)continue;let d=Qt(l);!d||Tr(r,d)>0||r.some(m=>Lr(m,l))||(o>0&&c<n?i.push(l):a.push(l))}return i.concat(r,a)}function Yd(){let t=b()??"";return t!==Mr&&(Mr=t,Fe=[]),Fe=Fd(Hd(Fe,Od()),Rd()),Fe.flatMap(e=>e.entries).filter(kd)}function Qd(t){for(let o of t)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!k().generating||t.some(o=>o.streaming))return;let e=t.at(-1);e&&(e.role==="assistant"||!ln.store.showAssistant?e.streaming=!0:t.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function bs(){let t=Yd();return Qd(t),t}function Kd(t){let e=t.getBoundingClientRect(),o=e.top+e.height*Td,n=-1;return H.forEach((r,i)=>{let a=r.turn?.el.getBoundingClientRect();a&&a.top<=o&&(n=i)}),n===-1?H.findIndex(r=>r.turn):n}function ms(t){ln.store.jumpEffect==="border"&&(t.classList.add(B("flash")),setTimeout(()=>t.classList.remove(B("flash")),Sd))}function cn(t){let e=H[t],o=Oe();if(!e||!o)return;if(!e.turn&&!e.ids.length){Yt=t,Ye(),o.scrollTo({top:La(o)?0:o.scrollHeight});return}Yt=t,ue=t?null:{chat:b(),first:e.ids[0],until:Date.now()+cs},Ye();let n=e.turn?.el;if(n?.isConnected){let d=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:d<o.clientHeight*xd?"smooth":"auto"}),ms(n);return}let r=H.findIndex(d=>d.turn),i=r>=0&&t<r?-1:1,a=++Cr,c=Date.now()+cs,l=()=>{let d=Oe();if(a!==Cr||Date.now()>c||!d)return;H=bs();let m=H.find(j=>j.ids.some(y=>e.ids.includes(y)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),ms(m),Yt=H.findIndex(j=>j.turn?.el===m),Ye();return}let q=d.scrollTop;d.scrollBy({top:i*d.clientHeight*Ed,behavior:"instant"}),d.scrollTop===q?setTimeout(l,wd):requestAnimationFrame(l)};l()}function jd(t,e){return s("button",{class:B("row"),attrs:{type:"button","data-index":String(e)},on:{click:()=>cn(e)}},s("span",{text:Md[t.role]}),s("span",{class:"bloom-truncate",text:qt(t.summary||"\u2026",sn)}))}function fs(t){if(!O)return;let e=t.getBoundingClientRect(),o=F()?.getBoundingClientRect().top,r=Math.min(e.bottom,o&&o>e.top?o:e.bottom)-e.top;O.style.right=`${document.documentElement.clientWidth-e.left-t.clientLeft-t.clientWidth+Cd}px`,O.style.top=`${e.top}px`,O.style.height=r>1?`${r}px`:""}function Wd(){let t=Oe();if(H=bs(),!H.length||!t){O?.remove(),O=null,rn="";return}if(Qe!==t){Ue?.abort(),Ue=new AbortController,t.addEventListener("scroll",ee(Ye),{passive:!0,signal:Ue.signal});for(let n of Ld)t.addEventListener(n,As,{passive:!0,signal:Ue.signal});Qe=t,Ut?.disconnect(),Ut=new ResizeObserver(()=>{t.isConnected&&fs(t)}),Ut.observe(t),an=null}let e=F();e&&e!==an&&Ut&&(Ut.observe(e),an=e),O??=s("div",{class:`bloom-root ${B("root")}`,attrs:{"data-bloom":"navigator"}},s("div",{class:B("rail")}),s("div",{class:B("toc")},s("div",{class:B("toc-head")}),s("div",{class:B("toc-list")}))),O.isConnected||document.body.append(O),fs(t);let o=JSON.stringify(H.map(n=>[n.role,n.ids]));o!==rn?(rn=o,Yt=-1,Jd(),ue&&Date.now()<ue.until&&ue.chat===b()&&H[0]?.ids[0]!==ue.first&&cn(0)):zd(),Ye()}function Ye(){if(!O||!Qe)return;Ft=Yt>=0?Yt:Kd(Qe),O.querySelectorAll(`.${B("tick")}`).forEach((e,o)=>e.classList.toggle(B("tick-current"),o===Ft)),O.querySelectorAll(`.${B("row")}`).forEach(e=>e.setAttribute("aria-current",String(Number(e.dataset.index)===Ft)));let t=O.querySelector(`.${B("toc-head")}`);t&&(t.textContent=`${Ft+1} / ${H.length}`)}function zd(){O?.querySelectorAll(`.${B("tick")}`).forEach((t,e)=>{let o=H[e],n=qt(o.summary,sn);t.title!==n&&(t.title=n),t.classList.toggle(B("tick-streaming"),o.streaming)}),O?.querySelectorAll(`.${B("row")}`).forEach(t=>{let e=t.lastElementChild,o=qt(H[Number(t.dataset.index)].summary||"\u2026",sn);e&&e.textContent!==o&&(e.textContent=o)})}function Jd(){O?.querySelector(`.${B("rail")}`)?.replaceChildren(...H.map((e,o)=>s("button",{class:wo(B("tick"),B(`tick-${e.role}`),e.streaming&&B("tick-streaming"),o===Ft&&B("tick-current")),title:qt(e.summary,sn),attrs:{type:"button","aria-label":`Jump to message ${o+1}`},on:{click:()=>cn(o)}}))),O?.querySelector(`.${B("toc-list")}`)?.replaceChildren(...H.map(jd))}var ft=ee(Wd);function As(){Yt=-1,ue=null,Cr++}var Vd=t=>!!t&&(t.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!t.closest("[contenteditable='true']"));function ps(t){if(!O||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey||Vd(document.activeElement)||document.querySelector("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:Ft-1,ArrowDown:Ft+1,Home:0,End:H.length-1}[t.key];if(o==null){As();return}o<0||o>=H.length||(t.preventDefault(),t.stopPropagation(),cn(o))}var ys=f({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:ln,styles:ls,start(){us=[C(t=>I(t)&&ft()),st(ft),Y.on("conversation",ft),v.on("rise",ft),v.on("fall",ft)],addEventListener("keydown",ps,!0),addEventListener("resize",ft,{passive:!0}),ft()},stop(){for(let t of us)t();Ue?.abort(),Ut?.disconnect(),Ut=void 0,Qe=null,an=null,removeEventListener("keydown",ps,!0),removeEventListener("resize",ft),O?.remove(),O=null,rn="",Fe=[],Mr=""},onSettingsChange:ft});var vs=`/*
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
`;var J=E("bloom-quotes-"),Gr="BloomBetterQuotes",Xd=40,ws=8,$d=1800,Rr=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,qs=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,Kt=p({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),Br,Ir,de,Or=!1,Pr=0,un=null,dn=null,pt=null;function Ur(){return location.pathname.match(/\/c\/(?!local-)([\w-]+)/)?.[1]??(new URLSearchParams(location.search).get("temporary-chat")==="true"?"temporary":"draft")}function fn(){try{let t=JSON.parse(sessionStorage.getItem(Gr)??"[]");return Array.isArray(t)?t.filter(e=>!!e&&typeof e=="object"&&typeof e.id=="string"&&typeof e.text=="string"&&!!e.text):[]}catch{return[]}}function Fr(t){try{sessionStorage.setItem(Gr,JSON.stringify(t.slice(-Xd)))}catch{}}function Ke(t){return fn().find(e=>e.id===t)?.text??""}function _d(t,e){let o=fn().filter(n=>n.id!==t);o.push({id:t,text:e}),Fr(o)}function Dr(t=Ur()){Fr(fn().filter(e=>e.id!==t)),mn()}function tm(t){let e=Ke("draft");if(!e||Ke(t))return;let o=fn().filter(n=>n.id!=="draft");o.push({id:t,text:e}),Fr(o)}function Hr(t){return`${t.getAttribute("aria-label")??""} ${t.getAttribute("title")??""}`}function em(t){let e=Hr(t);return qs.test(e)&&!/quote|引用/.test(e)?!1:/quote|引用/.test(e)&&Rr.test(e)?!0:Rr.test(e)&&!qs.test(e)}function Es(t){let e=t.cloneNode(!0);for(let o of e.querySelectorAll("button, [role='button']"))o.remove();return h(e.textContent??"")}function om(t){let e=F(),o=t.parentElement,n=0;for(;o&&o!==e&&n<5;){if(n++,o.matches(u.composerInput)||o.querySelector(u.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=Es(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function pn(){let t=F();if(!t)return null;for(let e of t.querySelectorAll("button, [role='button']")){if(e.closest("[data-bloom]")||!em(e))continue;let o=om(e),n=o?Es(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:e}}return null}function nm(t){let e=t.closest(u.searchUnit)??t.closest(u.oldMessage);return e&&(re(e)??e.getAttribute("data-message-author-role"))==="user"?e:null}function Yr(t){return h(t).slice(0,48)}function rm(t,e){let o=Yr(t);if(o.length<ws)return null;let n=null;for(let r of Re()){if(e&&(r===e||e.contains(r)||r.contains(e)))continue;let i=h(r.textContent??"");if(!i.includes(o))continue;let a=o.length/Math.max(i.length,1);(!n||a>n.score)&&(n={el:r,score:a})}return n?.el??null}function im(t,e){let o=Yr(e),n=t;for(let r of t.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&h(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${J("hit")}`)?.classList.remove(J("hit")),n.classList.add(J("hit")),window.clearTimeout(Pr),Pr=window.setTimeout(()=>n.classList.remove(J("hit")),$d)}function Ss(t){let e=t.closest(u.timelineScroll)??document.scrollingElement;if(!(e instanceof HTMLElement)&&e!==document.scrollingElement)return;let o=t.getBoundingClientRect();if(o.height<1||!e)return;let n=e.getBoundingClientRect(),r=F()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,a=o.top+o.height/2-(n.top+i)/2;Math.abs(a)<8||e.scrollTo({top:e.scrollTop+a,behavior:"smooth"})}function Qr(){if(!pt||!un?.isConnected)return;let t=un.getBoundingClientRect();t.width<1||(pt.style.top=`${Math.max(8,t.top+8)}px`,pt.style.left=`${Math.max(8,t.right-pt.offsetWidth-8)}px`)}function am(t,e,o){un=t,dn=e,pt??=s("button",{class:`bloom-root ${J("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),pt.isConnected||document.body.append(pt),im(t,o),Qr()}function xs(){pt?.remove(),pt=null,un=null,dn=null,document.querySelector(`.${J("hit")}`)?.classList.remove(J("hit"))}function Ts(){return document.querySelector('[data-bloom="quote-chip"]')}function mn(){Ts()?.remove()}function sm(t){let o=F()?.getBoundingClientRect();!o||o.width<8||(t.style.width=`${Math.max(120,o.width-24)}px`,t.style.left=`${o.left+12}px`,t.style.top=`${Math.max(8,o.top-t.offsetHeight-8)}px`)}function lm(t){let e=Ts();e||(e=s("div",{class:`bloom-root ${J("chip")}`,attrs:{"data-bloom":"quote-chip"}},s("span",{class:J("text")}),s("button",{class:J("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(e));let o=e.querySelector(`.${J("text")}`),n=h(t);o&&o.textContent!==n&&(o.textContent=n),e.dataset.text=t,sm(e)}function Nr(){if(!Or){Or=!0;try{let t=Ur(),e=pn();Kt.store.persistAcrossChats&&e&&Ke(t)!==e.text&&_d(t,e.text);let o=Kt.store.persistAcrossChats?Ke(t):"";!o||e&&h(e.text)===h(o)?mn():lm(o),Qr()}finally{Or=!1}}}function cm(t){let e=t.closest('[data-bloom="quote-chip"]');if(e instanceof HTMLElement&&!t.closest(`.${J("x")}`)){let i=e.dataset.text??e.querySelector(`.${J("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:e}:null}let o=t.closest("blockquote");if(o instanceof HTMLElement&&!t.closest("a, button")){let i=nm(o),a=h(o.textContent??"");if(i&&a)return{text:a,skip:i,origin:o}}let n=F();if(!n||!n.contains(t)||wt(t)||t.closest("button, [role='button']"))return null;let r=pn();return!r||!r.row.contains(t)?null:{text:r.text,skip:null,origin:r.row}}function um(t){let{target:e}=t;if(!(e instanceof Element))return;if(e.closest('[data-bloom="quote-back"]')){t.preventDefault(),t.stopPropagation(),dn?.isConnected&&Ss(dn);return}if(e.closest(`.${J("x")}`)){t.preventDefault(),t.stopPropagation(),Dr();return}let o=pn();if(o&&(e===o.dismiss||o.dismiss.contains(e))){Dr();return}if(dm(e)&&Cs(),!Kt.store.jumpToPassage)return;let n=cm(e);if(!n)return;let r=rm(n.text,n.skip);r&&(t.preventDefault(),t.stopPropagation(),am(r,n.origin,n.text),Ss(r))}function dm(t){let e=t.closest("button, [role='button']");return!(e instanceof HTMLElement)||e.closest("[data-bloom]")||!F()?.contains(e)?!1:/send|submit|发送|提交/i.test(Hr(e))&&!Rr.test(Hr(e))}function mm(t){return!(t instanceof KeyboardEvent)||t.key!=="Enter"||t.shiftKey||t.isComposing?!1:wt(t.target)}function Cs(){if(!Kt.store.persistAcrossChats)return;let t=Ur(),e=Ke(t);if(e){if(!pn()){let o=M(),n=Yr(e);n.length>=ws&&!h(o).includes(n)&&et(`> ${e}

${o}`.trim())}Dr(t)}}function fm(t){mm(t)&&Cs()}function pm(t){!t.prevId&&t.id&&tm(t.id),Nr()}var Ms=f({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:Kt,styles:vs,onSettingsChange(t){t==="jumpToPassage"&&!Kt.store.jumpToPassage&&xs(),t==="persistAcrossChats"&&!Kt.store.persistAcrossChats&&(sessionStorage.removeItem(Gr),mn()),Nr()},start(){de=new AbortController,document.addEventListener("pointerdown",um,{capture:!0,signal:de.signal}),document.addEventListener("keydown",fm,{capture:!0,signal:de.signal}),addEventListener("scroll",Qr,{capture:!0,passive:!0,signal:de.signal}),Ir=st(pm),Br=C(t=>I(t)&&Nr())},stop(){de?.abort(),de=void 0,Ir?.(),Ir=void 0,Br?.(),Br=void 0,window.clearTimeout(Pr),xs(),mn()}});var Ls=`/*
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
`;var hm=E("bloom-cls"),bm="bloom-cls",Am=600*1e3,jr=Hi("tab"),fe=new Map,We=new Map,me=null,ks=[],ym=t=>t==="streaming"||t==="error";function vm(){let t=new Map,e=Date.now();for(let[o,n]of We)e-n.at>Am?We.delete(o):t.set(o,n.status);for(let[o,n]of fe)t.set(o,n);return t}function qm(t){return s("span",{class:`bloom-root ${hm("",`-${t}`)}`,attrs:{"data-bloom":"cls","data-status":t,"aria-label":t==="error"?"Error":"Generating"}},t==="error"&&D("alert"))}function je(){let t=vm(),e=new Set;for(let[o,n]of t)for(let r of Ne(o)){if(!Z(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){e.add(i);continue}i?.remove();let a=qm(n);e.add(a),r.append(a)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))e.has(o)||o.remove()}function gn(t,e){t&&(e?fe.set(t,e):fe.delete(t),me?.postMessage({tab:jr,id:t,status:e}),je())}function Sm({data:t}){!w(t)||typeof t.id!="string"||typeof t.tab!="string"||t.tab===jr||(ym(t.status)?We.set(t.id,{status:t.status,tab:t.tab,at:Date.now()}):We.delete(t.id),je())}function Kr(){for(let t of fe.keys())me?.postMessage({tab:jr,id:t,status:null})}var Bs=f({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:Ls,start(){me=typeof BroadcastChannel=="function"?new BroadcastChannel(bm):null,me?.addEventListener("message",Sm),addEventListener("pagehide",Kr),ks=[v.on("rise",({conversationId:t})=>gn(t,"streaming")),v.on("fall",({conversationId:t,outcome:e})=>gn(t,e==="error"?"error":null)),v.on("context",({prevId:t,id:e,migrated:o})=>{o&&k().generating?gn(e,"streaming"):!o&&fe.get(t??"")==="streaming"&&gn(t,null)}),C(t=>I(t)&&je())],b()&&je()},stop(){for(let t of ks)t();Kr(),me?.close(),me=null,removeEventListener("pagehide",Kr),fe.clear(),We.clear(),je()}});var Os=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],An={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},xm={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},wm="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Wr=32,yn=64,zr="#FCFCFC",Jr="#111111",Em=14,vn=51.5,Tm=12.5,Cm=9.75,Is=52,Mm=10.5,Lm=7.75,km={rotate:t=>t.arc(vn,vn,6,-Math.PI/2,Math.PI*.7),done:t=>{t.moveTo(46.5,51.75),t.lineTo(50,55.25),t.lineTo(56.75,47.5)},ready:t=>{t.moveTo(51.5,56.5),t.lineTo(51.5,46.5),t.moveTo(46.5,51.25),t.lineTo(51.5,46.25),t.lineTo(56.5,51.25)},error:t=>{t.moveTo(47.25,47.25),t.lineTo(55.75,55.75),t.moveTo(55.75,47.25),t.lineTo(47.25,55.75)}};function hn(t){let e=document.createElement("canvas");e.width=e.height=Wr;let o=e.getContext("2d");return o?(o.scale(Wr/yn,Wr/yn),t(o),e.toDataURL("image/png")):""}function bn(t,e,o){t.save(),t.translate(8,8),t.scale(2,2);let n=new Path2D(wm);o&&(t.strokeStyle=Jr,t.lineWidth=1.35,t.lineJoin="round",t.stroke(n)),t.fillStyle=e,t.fill(n,"evenodd"),t.restore()}function qn(t,e,o,n){t.beginPath(),t.arc(e,e,o,0,Math.PI*2),t.fillStyle=n,t.fill()}function Bm(t,e){qn(t,vn,Tm,Jr),qn(t,vn,Cm,An[e]),t.strokeStyle="#fff",t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",t.beginPath(),km[e](t),t.stroke()}function Im(t,e){t.beginPath(),t.roundRect(0,0,yn,yn,Em),t.fillStyle=e,t.fill()}var Om=t=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`;function Rs(t,e){switch(t){case"original":return Om(xm[e]);case"hole":return hn(o=>bn(o,An[e],!0));case"bg":return hn(o=>{Im(o,An[e]),bn(o,zr,!1)});case"dot":return hn(o=>{bn(o,zr,!0),qn(o,Is,Mm,Jr),qn(o,Is,Lm,An[e])});case"badge":return hn(o=>{bn(o,zr,!0),Bm(o,e)})}}var Je="bloom-chat-state-favicon",Ve="data-bloom-rel",Xr="data-bloom-media",Ps="bloom-parked-icon",Rm="/favicon.ico",Hs=p({style:{type:"select",description:"How the tab icon shows the chat state.",options:Os,default:"bg"}}),Ct=null,Ns="",Sn=null,Gs="",Ds=new Map,$r,Vr=[],Us=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${Ve}]`)];function _r(){for(let t of Us())t.id!==Je&&(t.hasAttribute(Ve)||(Gs||=t.href,t.setAttribute(Ve,t.rel),t.setAttribute(Xr,t.getAttribute("media")??"")),t.rel!==Ps&&(t.rel=Ps),t.media!=="not all"&&(t.media="not all"))}function Pm(){for(let t of Us()){let e=t.getAttribute(Ve);if(e==null)continue;t.rel=e;let o=t.getAttribute(Xr);o?t.media=o:t.removeAttribute("media"),t.removeAttribute(Ve),t.removeAttribute(Xr)}}function Fs(){let t=document.getElementById(Je);return t||(t=document.createElement("link"),t.id=Je,t.rel="icon"),document.head.lastElementChild!==t&&document.head.append(t),t}function Dm(t){if(t==="wait")return Gs||Rm;let e=Hs.store.style,o=`${e}:${t}`,n=Ds.get(o);return n||Ds.set(o,n=Rs(e,t)),n}function Zr(t){if(t)return"rotate";let e=M();return Ct&&e&&e!==Ns&&(Ct=null),Ct==="error"?"error":Ct==="done"?"done":e?"ready":"wait"}function ze(t,e=!1){if(t===Sn&&!e)return;Sn=t;let o=Fs(),n=Dm(t);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function Hm(){$r=new MutationObserver(()=>{_r(),document.head.lastElementChild?.id!==Je&&Fs()}),$r.observe(document.head,{childList:!0})}var Ys=f({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"HostReady",settings:Hs,start(){_r(),ze(Zr(k().generating),!0),Hm(),Vr=[v.on("rise",()=>{Ct=null,ze("rotate")}),v.on("fall",({outcome:t})=>{Ct=t==="done"||t==="error"?t:null,Ns=M(),ze(Zr(!1))}),v.on("context",({migrated:t})=>{t||(Ct=null)}),v.on("tick",({generating:t})=>{_r(),ze(Zr(t))})]},stop(){for(let t of Vr)t();Vr=[],$r?.disconnect(),document.getElementById(Je)?.remove(),Pm(),Sn=null,Ct=null},onSettingsChange(){ze(Sn??"wait",!0)}});var Nm={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${u.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])']},Qs=p({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0}}),Ks=f({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads and notices.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:Qs,styles:()=>$t(Object.entries(Nm).flatMap(([t,e])=>Qs.store[t]?e:[]))});var pe=`form:has(:is(${u.composerInput})), ${u.oldComposerForm}`,xn='[class*="ComposerLayoutBody"]',ti='[class*="ComposerLayoutRoot"]',Gm='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',Um=`:is(${pe}) ${xn}, :is(${pe}):not(:has(${xn})) ${ti}, :is(${pe}):not(:has(${xn})):not(:has(${ti})) :is(${Gm})`,Fm='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',Ym='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',Qm="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))",js=p({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function Km(){let{opacity:t,blur:e}=js.store;if(t>=100)return"";let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${Qm} ${t}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${e}px)!important;-webkit-backdrop-filter:blur(${e}px)!important`;return`:is(${Fm}), :is(${pe}){${o}}:is(${Ym}){display:none!important}${Um}{${n}}:is(${pe}):has(${xn}) ${ti}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${pe}) :is(${u.composerInput}){background-color:transparent!important}`}var Ws=f({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:js,styles:Km});var jm=1200,Wm=8e3,zm=150,Jm=20,zs=6,ni="continue where you left",Vm=/message delivery timed out|please try again/i,Js=/waiting for the complete answer/i,Vs=p({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:ni,placeholder:ni}}),ei=[],En=0,Ze=!1,Xe=0,he="",wn="",ri=0,be=!1,$e=!1,Tn=!0,ge="",ii=0,Cn=!1,Zm=()=>Vs.store.prompt.trim()||ni;function Zs(){return(W(u.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function Xs(){let t=Zs();return!t||Js.test(t)||!Vm.test(t)?"":t}function Xm(){let t=Zs();return t&&Js.test(t)?t:""}function $m(){let t=ne()?.querySelectorAll(u.turn),e=t?.[t.length-1];return`${e?.getAttribute("data-turn-key")??""}:${e?.textContent?.length??0}`}function $s(t,e,o){if(o===En){if(k().generating||M()!==t||e>=Jm){be=!1,k().generating||(he="");return}Do(),setTimeout(()=>$s(t,e+1,o),zm)}}function _m(t){let e=En;if(k().generating||M()&&M()!==t){be=!1,he="";return}et(t),Cn=!0,ke(()=>{e===En&&$s(t,0,e)})}function _s(t){return t===he||Xe>=zs||k().generating||M()?!1:(he=t,Xe+=1,be=!0,_m(Zm()),!0)}function tf(){if(Ze||be||$e)return;let t=Date.now(),e=Xs();if(e){if(ge="",e!==wn){wn=e,ri=t;return}if(t-ri<jm)return;_s(`${b()??""}:${e}`);return}if(wn="",!Xm()){Tn=!0,ge="";return}if(!Tn||!k().generating||M())return;let n=`${b()??""}:${$m()}`;if(n!==ge){ge=n,ii=t;return}if(t-ii<Wm||Xe>=zs)return;let r=oe();r&&($e=!0,r.click())}function oi(){En+=1,Ze=!1,Xe=0,he="",wn="",ri=0,be=!1,$e=!1,Tn=!0,ge="",ii=0,Cn=!1}var tl=f({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:Vs,start(){oi(),ei=[v.on("rise",()=>{Ze=!1,he="",be=!1,Cn&&(Cn=!1,Tn=!1,ge="")}),v.on("fall",({outcome:t})=>{if($e){$e=!1,t==="left"?Ze=!0:_s(`${b()??""}:stall`);return}(t==="stopped"||t==="left")&&(Ze=!0),t==="done"&&!Xs()&&(Xe=0)}),v.on("context",({migrated:t})=>{t||oi()}),v.on("tick",tf)]},stop(){for(let t of ei)t();ei=[],oi()}});var gt=E("bloom-csi-"),ef=256,of=160,Mn=1,el=4,nf=.1,rf=.0015,af=250;function sf(t){return new Promise((e,o)=>{let n=new FileReader;n.onload=()=>e(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(t)})}function lf(t){return new Promise((e,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>e(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=t})}function cf(t,e){let o=Math.max(1/t.naturalWidth,1/t.naturalHeight)*e.zoom,n=1/(2*t.naturalWidth*o),r=1/(2*t.naturalHeight*o);return{zoom:e.zoom,x:vt(e.x,n,1-n),y:vt(e.y,r,1-r)}}function ol(t,e,o){let n=t.width,r=t.getContext("2d");if(!r)return;let i=Math.max(n/e.naturalWidth,n/e.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(e,n/2-o.x*e.naturalWidth*i,n/2-o.y*e.naturalHeight*i,e.naturalWidth*i,e.naturalHeight*i)}function uf(t,e){let o=s("canvas");return o.width=o.height=ef,ol(o,t,e),o.toDataURL("image/png")}function nl(t){let e=null,o={x:R.store.cropX,y:R.store.cropY,zoom:R.store.cropZoom},n,r=s("canvas",{class:gt("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=of*devicePixelRatio;let i=s("div",{class:`bloom-muted ${gt("status")}`}),a=s("div",{class:gt("zoom")}),c=s("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(y,U=!0){e&&(o=cf(e,y),ol(r,e,o),U&&(clearTimeout(n),n=setTimeout(()=>{e&&(R.store.cropX=o.x,R.store.cropY=o.y,R.store.cropZoom=o.zoom,R.store.avatarUrl=uf(e,o))},af)))}function d(){a.replaceChildren($o(o.zoom,Mn,el,nf,"\xD7",y=>l({...o,zoom:y})))}async function m(y,U){i.textContent="";try{e=await lf(y),U&&(R.store.avatarSource=y,o={x:.5,y:.5,zoom:Mn}),t.classList.add(gt("has-image")),d(),l(o,U)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let q=y=>{y?.type.startsWith("image/")&&sf(y).then(U=>m(U,!0))};c.addEventListener("change",()=>q(c.files?.[0])),r.addEventListener("wheel",y=>{e&&(y.preventDefault(),l({...o,zoom:vt(o.zoom*(1-y.deltaY*rf),Mn,el)}),d())},{passive:!1}),r.addEventListener("pointerdown",y=>{if(!e)return;r.setPointerCapture(y.pointerId);let U={...o},Se=r.getBoundingClientRect(),vo=qo=>{if(!e)return;let $=Math.max(Se.width/e.naturalWidth,Se.height/e.naturalHeight)*o.zoom;l({...o,x:U.x-(qo.clientX-y.clientX)/(e.naturalWidth*$),y:U.y-(qo.clientY-y.clientY)/(e.naturalHeight*$)})};r.addEventListener("pointermove",vo),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",vo),{once:!0})});let j=s("div",{class:gt("cropper"),attrs:{tabindex:"0"},on:{paste:y=>q([...y.clipboardData?.files??[]].find(U=>U.type.startsWith("image/"))),dragover:y=>y.preventDefault(),drop:y=>{y.preventDefault(),q(y.dataTransfer?.files[0])}}},s("div",{class:gt("stage")},r),s("div",{class:gt("controls")},He("",y=>y.trim()&&void m(y.trim(),!0),"https://\u2026 or data:image/\u2026","url"),s("div",{class:gt("buttons")},N("Choose file",()=>c.click()),N("Reset crop",()=>{l({x:.5,y:.5,zoom:Mn}),d()}),N("Clear",()=>{e=null,t.classList.remove(gt("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),a.replaceChildren(),R.store.avatarUrl="",R.store.avatarSource=""},"danger")),a,i,c));return t.append(j),R.store.avatarSource&&m(R.store.avatarSource,!1),()=>{clearTimeout(n),t.replaceChildren()}}var rl=`/*
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
`;var _e="data-bloom-csi-avatar",ai="data-bloom-csi-sized",ll="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",mf=32,R=p({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:t=>nl(t)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),il=[];function cl(t){t.removeAttribute(_e),t.removeAttribute(ai)}function al(t){return(R.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${t}]`)])}function sl(t=[]){if(!I(t))return;let e=R.store.displayName.trim()||null,o=!!R.store.avatarUrl,n=new Set(e?al("name"):[]);for(let i of document.querySelectorAll(ll))n.has(i)||Pt(i,null);for(let i of n)Pt(i,e);let r=new Set(o?al("avatar"):[]);for(let i of document.querySelectorAll(`[${_e}]`))r.has(i)||cl(i);for(let i of r)i.hasAttribute(_e)||i.setAttribute(_e,""),i.toggleAttribute(ai,!i.closest('[role="menu"]'))}function ff(){let t=R.store.avatarUrl;return t?`:root{--bloom-csi-url:url("${t.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${R.store.avatarSize}px}:is(${u.rail}, ${u.oldRail}) [${ai}]{--bloom-csi-size:${mf}px}`:""}var ul=f({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:R,styles:()=>`${ff()}
${rl}`,start(){il=[lt(),C(sl)]},stop(){for(let t of il)t();for(let t of document.querySelectorAll(`[${_e}]`))cl(t);for(let t of document.querySelectorAll(ll))Pt(t,null)},onSettingsChange(){sl()}});var Ae=E("bloom-greeting-"),dl=30,ml=100;function fl(t){let e=-1,o=s("textarea",{class:`bloom-input ${Ae("input")}`,attrs:{maxlength:String(ml),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=N("Add",i),r=s("div",{class:Ae("list")});function i(){let l=o.value.trim().slice(0,ml);if(!l)return;let d=[...L.store.greetings];e>=0?d[e]=l:d.length<dl&&d.push(l),L.store.greetings=d,e=-1,o.value="",a()}function a(){let{greetings:l}=L.store;n.textContent=e>=0?"Save":"Add",n.disabled=e<0&&l.length>=dl,r.replaceChildren(...l.length?l.map((d,m)=>s("div",{class:Ae("row",m===e?"row-editing":"row-idle")},s("div",{class:Ae("text"),text:d}),z("edit","Edit",()=>{e=m,o.value=d,o.focus(),a()}),z("trash","Delete",()=>{L.store.greetings=l.filter((q,j)=>j!==m),e===m&&(e=-1),a()}))):[s("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),t.append(s("div",{class:Ae("editor")},r,s("div",{class:Ae("form")},o,n))),a();let c=te((l,d)=>l==="GreetingCustomizer"&&d==="greetings"&&a());return()=>{c(),t.replaceChildren()}}var pl=`/*
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
`;var Bn="data-bloom-greeting",gf=1e3,hf=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],L=p({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:t=>fl(t)},greetings:{type:"custom",default:hf},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),Ln,gl=[],si,eo=()=>Qo()&&!at(),bf=t=>t.replaceAll(/\s*\n\s*/g," ").trim(),bl=()=>L.store.greetings.filter(t=>typeof t=="string"&&t.trim());function oo(){let t=bl();if(t.length)if(L.store.order==="random"&&t.length>1){let e=L.store.lastRandom;for(;e===L.store.lastRandom;)e=Math.floor(Math.random()*t.length);L.store.lastRandom=e,L.store.index=e}else L.store.index=(L.store.index+1)%t.length}function Af(){return eo()?W(u.homeHeading):null}function kn(){for(let t of document.querySelectorAll(`[${Bn}]`))t.removeAttribute(Bn),Pt(t,null)}function In(){for(let t of document.querySelectorAll("[data-bloom-placeholder]"))t.removeAttribute("data-bloom-placeholder")}function hl(t){let e=xt(),o=bf(t);if(!e||!o||M(e)){In();return}e.getAttribute("data-bloom-placeholder")!==o&&e.setAttribute("data-bloom-placeholder",o)}function to(){let t=bl(),e=Sa(),o=eo();if(!t.length||!e&&!o){kn(),In();return}if(e){kn(),hl(t[0]??"");return}let n=Af();n?((L.store.index<0||L.store.index>=t.length)&&oo(),n.setAttribute(Bn,""),Pt(n,t[Math.max(0,L.store.index)%t.length]??"")):kn(),L.store.heroOnlyOutsideProject?In():hl(t[Math.max(0,L.store.index)%t.length]??"")}function li(){clearInterval(Ln),Ln=void 0,L.store.mode==="interval"&&eo()&&(Ln=setInterval(()=>{oo(),to()},L.store.intervalSec*gf))}function yf(t){L.store.mode!=="manual"||!(t.target instanceof Element)||!t.target.closest(`[${Bn}]`)||getSelection()?.toString()||(oo(),to())}function vf(){eo()&&L.store.mode==="refresh"&&oo(),li(),to()}var Al=f({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:L,styles:pl,start(){si=new AbortController,document.addEventListener("click",yf,{signal:si.signal}),eo()&&L.store.mode==="refresh"&&oo(),li(),gl=[C(t=>I(t)&&to()),st(vf)]},stop(){si?.abort();for(let t of gl)t();clearInterval(Ln),kn(),In()},onSettingsChange(t){(t==="mode"||t==="intervalSec")&&li(),to()}});var no=E("bloom-history-"),ci=10,qf=3e3;function yl(t){let e="",o=0,n=new Set,r=s("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),i=s("div",{class:no("list")}),a=s("div",{class:no("pager")}),c,l=N("Clear all",()=>{if(!c){l.textContent="Click again to clear",c=setTimeout(()=>{c=void 0,l.textContent="Clear all"},qf);return}clearTimeout(c),c=void 0,l.textContent="Clear all",ro([])},"danger");function d(){let q=[...jt.store.entries].toReversed(),j=e.trim().toLowerCase(),y=j?q.filter($=>$.toLowerCase().includes(j)):q,U=Math.max(1,Math.ceil(y.length/ci));o=Math.min(o,U-1);let Se=y.slice(o*ci,(o+1)*ci).map($=>s("div",{class:no("row")},s("button",{class:no("text",n.has($)?"text-open":"text-closed"),text:$,title:n.has($)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{n.delete($)||n.add($),d()}}}),z("copy","Copy",()=>void Ni($)),z("trash","Delete",()=>ro(jt.store.entries.filter(Oc=>Oc!==$)))));i.replaceChildren(...Se.length?Se:[s("div",{class:"bloom-muted",text:j?"No matching prompts.":"No saved prompts yet."})]),a.replaceChildren(s("span",{class:"bloom-muted",text:`${y.length} ${j?"matching":"saved"} \xB7 page ${o+1} of ${U}`}),N("Previous",()=>{o--,d()}),N("Next",()=>{o++,d()}),l);let[vo,qo]=a.querySelectorAll("button");vo.disabled=o===0,qo.disabled=o>=U-1,l.disabled=!q.length}r.addEventListener("input",()=>{e=r.value,o=0,d()}),t.append(s("div",{class:no("manager")},r,i,a)),d();let m=te((q,j)=>q==="InputHistory"&&j==="entries"&&d());return()=>{m(),clearTimeout(c),t.replaceChildren()}}var vl=`/*
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
`;var xf=E("bloom-history-"),wf=2e3,jt=p({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:t=>yl(t)},entries:{type:"custom",default:[]}}),X=null,ui={text:"",at:0},Wt=null,di,On=()=>jt.store.entries.filter(t=>typeof t=="string");function ro(t){jt.store.entries=t.slice(-jt.store.maxEntries)}function mi(t){let e=t.trim();if(!e)return;let o=Date.now();e===ui.text&&o-ui.at<wf||(ui={text:e,at:o},ro([...On().filter(n=>n!==e),e]))}function Ef(t,e){let o=xt();if(!o)return;Wt??=s("div",{class:`bloom-root ${xf("hud")}`,attrs:{"data-bloom":"history-hud","aria-live":"polite"}}),Wt.textContent=`${t+1} / ${e}`;let n=(o.closest("form")??o).getBoundingClientRect();Wt.style.left=`${n.left+n.width/2}px`,Wt.style.top=`${n.top}px`,Wt.isConnected||document.body.append(Wt)}function io(){X=null,Wt?.remove()}function Tf(t){let e=On();if(!X)return;let o=e[t];X.index=t,X.shown=o,et(o),Ef(e.length-1-t,e.length)}function Cf(t){let e=On();if(!e.length)return!1;if(!X){if(t===1)return!1;X={index:e.length,draft:M(),shown:""}}let o=X.index+t;return o<0?!0:o>=e.length?(et(X.draft),io(),!0):(Tf(o),!0)}function Mf(t){if(t.isComposing||!wt(t.target))return;let e=t.target;if(t.key==="Enter"&&!t.shiftKey){mi(M(e)),io();return}if(t.key==="Escape"&&X){et(X.draft),io(),t.preventDefault(),t.stopPropagation();return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.ctrlKey||t.metaKey||t.shiftKey)return;let o=ca(e),n=t.key==="ArrowUp";!t.altKey&&!(n?o.first:o.last)||!n&&!X||Cf(n?-1:1)&&(t.preventDefault(),t.stopPropagation())}function Lf(t){X&&wt(t.target)&&M(t.target)!==X.shown.trim()&&io()}function kf(t){t.target instanceof Element&&t.target.closest(u.sendButton)&&mi(M())}var ql=f({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:jt,styles:vl,start(){di=new AbortController;let{signal:t}=di;document.addEventListener("keydown",Mf,{capture:!0,signal:t}),document.addEventListener("input",Lf,{capture:!0,signal:t}),document.addEventListener("click",kf,{capture:!0,signal:t}),document.addEventListener("submit",()=>mi(M()),{capture:!0,signal:t})},stop(){di?.abort(),io()},onSettingsChange(t){t==="maxEntries"&&ro(On())}});var Sl=`/*
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
`;var If=1500,Of=5e3,Rf=2e3,ye=p({showDate:{type:"boolean",description:"Show the date for messages not sent today.",default:!0},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),Pn=new Map,El=0,Dn,xl=[];function Tl(t,e){Pn.get(t)!==e&&(Pn.set(t,e),clearTimeout(Dn),Dn=setTimeout(Cl,Rf))}function Cl(){let t={...ye.store.stamps,...Object.fromEntries(Pn)};ye.store.stamps=Object.fromEntries(Object.entries(t).toSorted((e,o)=>o[1]-e[1]).slice(0,If))}function Pf(t){let e=ot(b())?.times;for(let o=t.length-1;o>=0;o--){let n=Pn.get(t[o])??e?.get(t[o])??ye.store.stamps[t[o]];if(n)return n}return null}var Df=()=>k().generating||Date.now()-El<Of;function Hf(t){let e=new Date(t),o=new Date,n={hour:"2-digit",minute:"2-digit"};if(!ye.store.showDate||e.toDateString()===o.toDateString())return e.toLocaleTimeString(void 0,n);let r=e.getFullYear()===o.getFullYear()?{}:{year:"numeric"};return e.toLocaleString(void 0,{...r,month:"short",day:"numeric",...n})}function wl(t){let e=re(t)??t.getAttribute("data-message-author-role")??t.closest(u.turn)?.getAttribute("data-turn")??t.querySelector(u.authorRole)?.getAttribute("data-message-author-role");if(dr(e))return e;let o=Ie(t).at(-1);return ot(b())?.chain.find(n=>n.id===o)?.role??null}function Nf(t){let e=Ie(t);if(!e.length||!Z(t)||t.querySelector("time:not([data-bloom])"))return;let o=Pf(e);!o&&Df()&&(o=Date.now(),Tl(e.at(-1),o));let n=t.querySelector(':scope > time[data-bloom="timestamp"]');if(!o||ye.store.hideOwnMessages&&wl(t)==="user"){n?.remove();return}let r=Hf(o);if(n?.textContent===r)return;let i=s("time",{class:`bloom-timestamp bloom-timestamp-${wl(t)??"assistant"}`,text:r,title:new Date(o).toLocaleString(),attrs:{"data-bloom":"timestamp",datetime:new Date(o).toISOString()}});n?n.replaceWith(i):t.prepend(i)}var Rn=ee(()=>{for(let t of Re())Nf(t)}),Ml=f({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:ye,styles:Sl,start(){xl=[C(t=>I(t)&&Rn()),Y.on("conversation",Rn),Y.on("message-time",({messageId:t,time:e})=>{Tl(t,e),Rn()}),v.on("fall",()=>{El=Date.now()})]},stop(){for(let t of xl)t();Dn&&(clearTimeout(Dn),Cl());for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove()},onSettingsChange(t){if(t!=="stamps"){for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove();Rn()}}});var Gf=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])'],Uf=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],Ll=p({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),kl=f({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:Ll,styles:()=>$t([...Gf,...Ll.store.hideDictationSettings?Uf:[]])});var zt="data-bloom-share",Ff=/^\/g\/g-p-/,Yf=/^(?:share|分享)$/i,Qf=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],Kf=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${zt}="project"]`],fi=p({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),Hn,pi=!1;function jf(t){if(!I(t))return;let e=Ff.test(location.pathname)&&!b();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${zt}]`))!e||!Yf.test(h(o.textContent??""))?o.removeAttribute(zt):o.hasAttribute(zt)||o.setAttribute(zt,"project")}var Bl=f({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:fi,styles:()=>$t([...fi.store.hideShareChat?Qf:[],...fi.store.hideShareProject?Kf:[]]),start(){pi=!0,Be().then(()=>{pi&&!Hn&&(Hn=C(jf))})},stop(){pi=!1,Hn?.(),Hn=void 0;for(let t of document.querySelectorAll(`[${zt}]`))t.removeAttribute(zt)}});var Il='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',Wf='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',zf="[data-bloom-profile-plan]",Ol="visibility:hidden!important;user-select:none!important",Pl=p({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function Jf(){let{hideUsername:t,hideEmail:e,enlargePlan:o,alignPlanWithAvatar:n}=Pl.store,r=[];return t&&r.push(n?`:is(${Il}){display:none!important}`:`:is(${Il}){${Ol}}`),e&&r.push(`:is(${Wf}){${Ol}}`),t&&o&&r.push(`${zf}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var Rl,Dl=f({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Pl,styles:Jf,start(){Rl=lt()},stop(){Rl?.()}});var Vf="model-switcher-dropdown-button",Hl=t=>t.startsWith("model-switcher-")&&t!==Vf?t.slice(15):"",ao=(t,e)=>t.id===e.id||!!t.label&&t.label===e.label;function Nl(){let t=F();return(t&&W(u.modelTrigger,t))??W(u.modelTrigger)}function ct(){let t=Nl();if(!t)return null;let e=h(t.innerText),o=Hl(t.getAttribute("data-testid")??"")||e;return o?{id:o,label:e||o}:null}function Zf(t){return[...document.querySelectorAll(u.modelItem)].find(e=>{let o=Hl(e.getAttribute("data-testid")??""),n=h(e.textContent??"");return o===t.id||n===t.label||n===t.id})??null}function Nn(t){let e=ct();if(e&&ao(e,t))return!0;let o=Zf(t);if(o){o.click();let r=ct();return!!r&&ao(r,t)}let n=Nl();return n?.getAttribute("aria-expanded")!=="true"&&n?.click(),!1}var Gl=`/*
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
`;var P=E("bloom-queue-"),$f=6,_f=8,V=null,so="",ve=!1,qe=!1;function gi(t,e,o){let n=z(t,e,r=>{r.stopPropagation(),o()});return n.removeAttribute(mt),n.addEventListener("mouseenter",()=>Ul(e)),n.addEventListener("mouseleave",()=>Ul("")),n}function Ul(t){let e=V?.querySelector(`.${P("tip")}`);e&&(e.textContent=t)}function tp(t,e,o,n){qe=!0;let r=s("textarea",{class:`bloom-input ${P("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=new AbortController,a=c=>{i.abort(),qe=!1,so="",c?n.edit(e,r.value):r.replaceWith(s("div",{class:P("text"),text:o}))};addEventListener("keydown",c=>{if(!(c.target!==r||c.isComposing)){if(c.key==="Enter"&&!c.shiftKey)a(!0);else if(c.key==="Escape")a(!1);else return;c.preventDefault(),c.stopImmediatePropagation()}},{capture:!0,signal:i.signal}),r.addEventListener("keydown",c=>c.stopPropagation(),{signal:i.signal}),r.addEventListener("blur",()=>a(!0),{signal:i.signal}),t.querySelector(`.${P("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function ep(t,e,o){t.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=t.parentElement;if(!r)return;let i=!1,a=l=>{!i&&Math.abs(l.clientY-n.clientY)<$f||(i||(i=qe=!0,t.classList.add(P("dragging"))),t.style.transform=`translateY(${l.clientY-n.clientY}px)`)},c=l=>{if(removeEventListener("pointermove",a),!i)return;qe=!1,so="";let m=[...r.children].filter(q=>q!==t).filter(q=>q.getBoundingClientRect().top+q.getBoundingClientRect().height/2<l.clientY).length;o.move(e,m)};addEventListener("pointermove",a),addEventListener("pointerup",c,{once:!0})})}function op(t,e,o,n){let r=s("li",{class:P("row")},s("div",{class:P("text"),text:t.text}),n&&t.label?s("span",{class:P("model"),title:t.label,text:t.label}):null,s("div",{class:P("actions")},gi("trash","Remove from queue",()=>o.remove(e)),gi("edit","Edit",()=>tp(r,e,t.text,o)),gi("send","Send now",()=>o.sendNow(e))));return ep(r,e,o),r}function np(t){if(!V)return;let e=t.getBoundingClientRect();V.style.left=`${e.left}px`,V.style.width=`${e.width}px`,V.style.bottom=`${innerHeight-e.top+_f}px`}function hi(){V?.remove(),V=null,so="",qe=!1}function Mt(t,e,o=!0){let n=F();if(!t.length||!Le(n)){hi();return}V||(V=s("div",{class:`bloom-root ${P("tray")}`,attrs:{"data-bloom":"queue"}},s("div",{class:P("header")},s("button",{class:P("toggle"),attrs:{type:"button","aria-expanded":String(!ve)},on:{click:a=>{ve=!ve,V?.classList.toggle(P("collapsed"),ve),a.currentTarget.setAttribute("aria-expanded",String(!ve))}}},s("span",{class:P("count")}),D("chevron")),s("span",{class:P("tip")})),s("ol",{class:P("list")})),V.classList.toggle(P("collapsed"),ve),document.body.append(V)),np(n);let r=JSON.stringify([o,...t.map(a=>[a.text,o?a.label:""])]);if(qe||r===so)return;so=r;let i=V.querySelector(`.${P("count")}`);i&&(i.textContent=So(t.length,"Queued message")),V.querySelector(`.${P("list")}`)?.replaceChildren(...t.map((a,c)=>op(a,c,e,o)))}var Yn=new x("PromptQueue"),rp=8,uo=150,Un=20,nt="BloomPromptQueue",Ai="BloomPromptQueueClaim",Fl="BloomPromptQueueTab",ip=4e3,G=p({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1},showQueueMode:{type:"boolean",description:"Show the model that was selected when each message was queued.",default:!0},stickyOnNavigate:{type:"boolean",description:"Keep the selected model when switching chats.",default:!0},persistAcrossRefresh:{type:"boolean",description:"Restore unsent queued messages in this browser after a refresh. Other tabs show the same queue; only one of them sends it.",default:!0}}),rt=new Map,co=!1,Vt=null,lo,Yl=[],ht=null,bt=!1,bi,Fn="draft",mo=()=>b()??Fn,K=()=>rt.get(mo())??[],yi=t=>({id:t.model||t.label,label:t.label||t.model});function ap(t){return typeof t=="string"?t.trim()?{text:t,model:"",label:""}:null:!w(t)||typeof t.text!="string"||!t.text.trim()?null:{text:t.text,model:typeof t.model=="string"?t.model:"",label:typeof t.label=="string"?t.label:""}}function vi(){let t=sessionStorage.getItem(Fl);if(t)return t;let e=globalThis.crypto?.randomUUID?.()??`${Date.now()}-${Math.random()}`;return sessionStorage.setItem(Fl,e),e}function Kl(){let t=St(localStorage.getItem(Ai)??"");return!w(t)||typeof t.tab!="string"||typeof t.at!="number"||typeof t.key!="string"?null:{tab:t.tab,at:t.at,key:t.key}}function jl(){let t={tab:vi(),at:Date.now(),key:mo()};try{localStorage.setItem(Ai,JSON.stringify(t))}catch(e){Yn.warn("Could not claim the queue",e)}}function sp(){let t=Kl();if(t?.tab===vi())try{localStorage.setItem(Ai,JSON.stringify({...t,at:Date.now()}))}catch(e){Yn.warn("Could not refresh the queue claim",e)}}function lp(){let t=Kl();return!t||t.tab===vi()||t.key!==mo()?!0:Date.now()-t.at<=ip?!1:(jl(),!0)}function cp(){return Object.fromEntries([...rt].filter(([t])=>t!==Fn))}function Gn(t){let e=typeof t=="string"?St(t):t;if(!w(e))return!1;let o=!1;for(let[n,r]of Object.entries(e)){if(!Array.isArray(r))continue;let i=r.map(ap).filter(a=>a!=null);i.length&&(rt.set(n,i),o=!0)}return o}function up(){if(!G.store.persistAcrossRefresh){sessionStorage.removeItem(nt),$n(nt);return}if(!Gn(sessionStorage.getItem(nt))){if(Gn(localStorage.getItem(nt))){fo();return}To(nt).then(t=>{rt.size||t.some(Gn)&&(fo(),Mt(K(),Jt,G.store.showQueueMode))})}}function fo(){try{if(!G.store.persistAcrossRefresh){sessionStorage.removeItem(nt),$n(nt);return}let t=cp();sessionStorage.setItem(nt,JSON.stringify(t)),Co(nt,t)}catch(t){Yn.warn("Could not save the queue",t)}}function dp(t){if(!(t.key!==nt||!G.store.persistAcrossRefresh||t.newValue==null)){rt.clear(),Gn(t.newValue);try{sessionStorage.setItem(nt,t.newValue)}catch(e){Yn.warn("Could not mirror the queue",e)}Mt(K(),Jt,G.store.showQueueMode)}}function Zt(t){t.length?rt.set(mo(),t):rt.delete(mo()),jl(),fo(),Mt(K(),Jt,G.store.showQueueMode)}function mp(t){if(!t.model&&!t.label)return!0;let e=ct();return e?ao(e,yi(t)):!0}function Wl(t,e=0){e>=Un||k().generating||M()!==t||(Do(),setTimeout(()=>Wl(t,e+1),uo))}function fp(t,e){let o=G.store.stickyOnNavigate&&ht?ht:t;if(!o||!e.model&&!e.label||ao(o,yi(e))){bt=!1;return}bt=!0,setTimeout(()=>{Nn(o),bt=!1},uo)}function po(t,e=0){if(k().generating||M()){e<Un&&setTimeout(()=>po(t,e+1),uo);return}if(!mp(t)&&e<Un){bt=!0,Nn(yi(t)),setTimeout(()=>po(t,e+1),uo);return}let o=ct();et(t.text),ke(()=>Wl(t.text)),fp(o,t)}function Ql(){if(Vt!=null){let o=Vt;Vt=null,po(o);return}if(!co||k().generating||M())return;if(!lp()){co=!1;return}let[t,...e]=K();t!=null&&(co=!1,Zt(e),po(t))}function zl(t){let e=K(),o=e[t];if(o!=null){if(Zt(e.filter((n,r)=>r!==t)),!k().generating){po(o);return}Vt=o,oe()?.click()}}var Jt={remove:t=>Zt(K().filter((e,o)=>o!==t)),edit:(t,e)=>Zt(e.trim()?K().map((o,n)=>n===t?{...o,text:e}:o):K().filter((o,n)=>n!==t)),sendNow:zl,move(t,e){let o=[...K()],[n]=o.splice(t,1);n&&(o.splice(e,0,n),Zt(o))}};function pp(t){let e=ct(),o={text:t,model:e?.id??"",label:e?.label??""},n=K();return G.store.replacePending&&n.length?(Zt([...n.slice(0,-1),o]),!0):n.length>=rp?!1:(Zt([...n,o]),!0)}function gp(t){if(t.key!=="Enter"||t.shiftKey||t.isComposing||!wt(t.target)||!k().generating)return;let e=M(t.target);if(t.preventDefault(),t.stopImmediatePropagation(),t.altKey){if(!e)return;let o=ct();et(""),Vt={text:e,model:o?.id??"",label:o?.label??""},oe()?.click();return}if(!e){K().length&&zl(0);return}pp(e)&&et("")}function hp(){if(bt||!G.store.stickyOnNavigate)return;let t=ct();t&&(ht=t)}function bp(){if(!G.store.stickyOnNavigate||!ht)return;bt=!0;let t=0,e=()=>{if(!ht||Nn(ht)||t>=Un){bt=!1;return}t++,bi=setTimeout(e,uo)};clearTimeout(bi),e()}function Ap(t){let{target:e}=t;!(e instanceof Element)||bt||e.closest(`${u.modelTrigger}, ${u.modelItem}`)&&setTimeout(hp,0)}var Jl=f({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:G,styles:Gl,start(){lo=new AbortController,up(),ht=ct(),document.addEventListener("keydown",gp,{capture:!0,signal:lo.signal}),document.addEventListener("pointerup",Ap,{signal:lo.signal}),Yl=[v.on("fall",({outcome:t})=>{co=t==="done",t==="left"&&(Vt=null),Ql()}),v.on("context",({prevId:t,id:e,migrated:o})=>{let n=rt.get(Fn);rt.delete(Fn),o&&!t&&e&&n&&rt.set(e,n),o||(co=!1,bp()),fo(),Mt(K(),Jt,G.store.showQueueMode)}),v.on("tick",()=>{sp(),Ql(),Mt(K(),Jt,G.store.showQueueMode)})],addEventListener("storage",dp,{signal:lo.signal}),Mt(K(),Jt,G.store.showQueueMode)},stop(){lo?.abort(),clearTimeout(bi);for(let t of Yl)t();hi(),rt.clear(),Vt=null,ht=null,bt=!1},onSettingsChange(t){t==="persistAcrossRefresh"&&fo(),t==="stickyOnNavigate"&&G.store.stickyOnNavigate&&(ht=ct()),Mt(K(),Jt,G.store.showQueueMode)}});var yp=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function vp(){let t=h(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return t&&!yp.has(t.toLowerCase())?t:null}function go(t){return t?ot(t)?.title??za(t)??(t===b()?vp():null):null}var Vl=`/*
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
`;var At=E("bloom-recent-"),yt="home",Sp=50,Zl=140,xp=new Set(["Backquote"]),wp=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),S=p({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(t=>({label:t,value:t})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),Lt=null,ut=[],dt=0,qi,Xl=[],jn=()=>at()?null:b()??(Qo()?yt:null);function $l(t,e){return Object.fromEntries(Object.entries(t).filter(([o])=>e.has(o)))}function tc(t){let e=go(t);e&&S.store.titles[t]!==e&&(S.store.titles={...S.store.titles,[t]:e});let o=Ja(location.href);o&&t===b()&&S.store.projects[t]!==o&&(S.store.projects={...S.store.projects,[t]:o})}function _l(t){if(!t)return;let e=[t,...S.store.visits.filter(n=>n!==t)].slice(0,Sp),o=new Set(e);S.store.visits=e,Object.keys(S.store.previews).some(n=>!o.has(n))&&(S.store.previews=$l(S.store.previews,o)),Object.keys(S.store.titles).some(n=>!o.has(n))&&(S.store.titles=$l(S.store.titles,o)),t!==yt&&tc(t)}function Qn(t){if(!t||!S.store.visits.includes(t))return;let e={},o=ot(t)?.chain??[];for(let r of o)e[r.role]=qt(zo(r),Zl);if(t===b())for(let r of jo()){let i=Wo(r);i&&(e[r.role]=qt(i,Zl))}let n=S.store.previews[t];!e.user&&!e.assistant||n?.user===e.user&&n?.assistant===e.assistant||(S.store.previews={...S.store.previews,[t]:e})}function Ep(){let t=Number(S.store.maxRecent);return S.store.visits.filter(e=>e!==yt||S.store.includeHome).slice(0,t)}function Si(t){if(ho(),t===jn())return;let e=t===yt?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"]'):Ne(t)[0];e?e.click():location.assign(t===yt?"/":`/c/${t}`)}function Tp(t,e){let o=t===yt?"New chat":S.store.titles[t]??go(t)??"Untitled chat",n=t===yt?null:S.store.projects[t],r=t===yt?null:S.store.previews[t];return s("button",{class:At("item"),attrs:{type:"button",role:"option","aria-selected":String(e===dt)},on:{click:()=>Si(t),mousemove:()=>e!==dt&&Kn(e)}},s("div",{class:At("head")},s("span",{class:`${At("title")} bloom-truncate`,text:o}),n&&s("span",{class:At("project"),text:n})),r?.user&&s("div",{class:`${At("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&s("div",{class:`${At("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function Kn(t){dt=(t+ut.length)%ut.length,Lt?.querySelectorAll(`.${At("item")}`).forEach((e,o)=>e.setAttribute("aria-selected",String(o===dt)))}function Cp(){Qn(b());let t=jn();ut=Ep(),t&&(ut=[t,...ut.filter(e=>e!==t)].slice(0,Number(S.store.maxRecent))),ut.length&&(dt=ut.length>1?1:0,Lt=s("div",{class:`bloom-root ${At("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:e=>e.target===e.currentTarget&&ho()}},s("div",{class:At("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...ut.map(Tp))),document.body.append(Lt))}function ho(){Lt?.remove(),Lt=null}var Mp=t=>xp.has(t.code)||wp.has(t.key);function Lp(t){if(t.ctrlKey&&!t.altKey&&!t.metaKey&&Mp(t)){t.preventDefault(),t.stopPropagation(),Lt?Kn(dt+(t.shiftKey?-1:1)):Cp();return}if(!Lt)return;let o={Escape:ho,Enter:()=>Si(ut[dt]),ArrowDown:()=>Kn(dt+1),ArrowUp:()=>Kn(dt-1)}[t.key];o&&(t.preventDefault(),t.stopPropagation(),o())}function kp(t){Lt&&t.key==="Control"&&Si(ut[dt])}var ec=f({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:S,styles:Vl,start(){qi=new AbortController;let{signal:t}=qi;addEventListener("keydown",Lp,{capture:!0,signal:t}),addEventListener("keyup",kp,{capture:!0,signal:t}),addEventListener("blur",ho,{signal:t}),document.addEventListener("visibilitychange",()=>document.hidden&&Qn(b()),{signal:t}),Xl=[st(({prevId:i})=>{Qn(i),_l(jn())}),Y.on("conversation",({id:i})=>{S.store.visits.includes(i)&&tc(i),Qn(i)})];let{visits:e,titles:o,previews:n}=S.store,r=e.filter(i=>i!==yt&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(S.store.visits=e.filter(i=>!r.includes(i))),_l(jn())},stop(){qi?.abort();for(let t of Xl)t();ho()}});var xi="data:audio/mpeg;base64,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";var oc=new x("ResponseNotification"),Bp=.5,Ip=200,Op=300,bo=p({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:t=>(t.append(N("Preview",ac)),()=>t.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),nc=null,wi=new Map,rc,Ei;function Rp(t){return new Promise((e,o)=>GM_xmlhttpRequest({url:t,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=Ip&&n<Op?e(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var Pp=t=>Uint8Array.from(atob(t.slice(t.indexOf(",")+1)),e=>e.charCodeAt(0)).buffer;function Dp(t,e){let o=wi.get(e);return o||(o=(e.startsWith("data:")?Promise.resolve(Pp(e)):Rp(e)).then(n=>t.decodeAudioData(n)),o.catch(()=>wi.delete(e)),wi.set(e,o)),o}async function ic(t){nc??=new AudioContext;let e=nc;e.state==="suspended"&&e.resume();let o=e.createBufferSource(),n=e.createGain();o.buffer=await Dp(e,t),n.gain.value=Bp,o.connect(n).connect(e.destination),o.start()}function ac(){let t=bo.store.soundUrl.trim();ic(t||xi).catch(e=>{oc.warn("Sound failed",e),t&&ic(xi).catch(o=>oc.warn("Default chime failed",o))})}function Hp(t){let e=`${t??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:e,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:e,silent:!0});o.onclick=()=>{focus(),o.close()}}function Np(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(Ei=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:Ei.signal}))}var sc=f({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:bo,start(){Np(),rc=v.on("fall",({conversationId:t,outcome:e})=>{e==="done"&&(bo.store.onlyWhenHidden&&!document.hidden||(bo.store.sound&&ac(),bo.store.browserNotification&&Hp(go(t))))})},stop(){rc?.(),Ei?.abort()}});var Gp=`:is(${u.sidebarScroll}, :has(> ${u.sidebarScroll})) + :has(${u.menuButton})`,Up=`${u.rail} > :has(${u.menuButton})`,Ci=`:is(${Gp}, ${Up}, ${u.oldProfile}):not(:hover)`,Ti="[data-bloom-profile-avatar]",Fp=`:is(${Ci}, ${Ci} :has(${Ti})) > :not(${Ti}, :has(${Ti}))`,cc=p({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function Yp(){let{opacity:t,fadeAvatar:e}=cc.store;return t>=100?"":`${e?Ci:Fp}{opacity:${t/100}!important}`}var lc,uc=f({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:cc,styles:Yp,start(){lc=lt()},stop(){lc?.()}});var dc=`/*
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
    opacity: 0;
    transform: translateY(-50%);
    pointer-events: none;
    cursor: pointer;
}

a:hover > button.bloom-star-chats-star,
:hover > button.bloom-star-chats-star,
button.bloom-star-chats-star:focus-visible,
button.bloom-star-chats-star[aria-pressed="true"],
[data-bloom="starred"] button.bloom-star-chats-star {
    opacity: 1;
    pointer-events: auto;
}

button.bloom-star-chats-star:hover {
    background: var(--bloom-hover);
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

[data-bloom="starred"] button.bloom-star-chats-star,
.bloom-star-chats-link button.bloom-star-chats-star {
    position: static;
    opacity: 1;
    transform: none;
    pointer-events: auto;
}

button.bloom-star-chats-star[data-place="header"],
button.bloom-star-chats-star[data-place="action"] {
    position: static;
    inset: auto;
    z-index: auto;
    flex: none;
    width: 2rem;
    height: 2rem;
    margin: 0;
    color: inherit;
    opacity: 1;
    transform: none;
    pointer-events: auto;
}

button.bloom-star-chats-star[data-place="header"] .bloom-icon,
button.bloom-star-chats-star[data-place="action"] .bloom-icon {
    width: 1.125rem;
    height: 1.125rem;
}

button.bloom-star-chats-star[aria-pressed="true"] {
    color: var(--bloom-fg);
}

.bloom-star-chats-title {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
`;var Ao=E("bloom-star-chats"),Kp=40,Wn=p({chats:{type:"custom",default:[]}}),Mi,Li=!1;function yo(){let t=Wn.store.chats;return Array.isArray(t)?t.filter(e=>w(e)&&typeof e.id=="string"&&typeof e.href=="string"&&typeof e.title=="string"&&!!Xt(e.href)):[]}function Xt(t){try{let e=new URL(t,location.origin);return e.origin!==location.origin||e.searchParams.get("temporary-chat")==="true"||!it(e.href)?null:`${e.pathname}${e.search}`}catch{return null}}function jp(){let t=[...document.querySelectorAll(u.sidebarScroll)].filter(o=>!o.closest("[inert]"));if(t.length)return t;let e=[...document.querySelectorAll(`${u.oldSidebar} nav`)];return e.length?e:[...document.querySelectorAll(u.oldSidebar)]}function zn(){let t=`${u.sidebarScroll} ${u.conversationLink}, ${u.oldSidebar} ${u.conversationLink}`;return[...document.querySelectorAll(t)].filter(e=>!e.closest("[data-bloom]")&&!e.closest("[inert]"))}function fc(t){let e=t.querySelector("[data-thread-title] [dir='auto'], [data-thread-title]");if(e)return h(e.textContent??"");let o=t.cloneNode(!0);for(let n of o.querySelectorAll("[data-bloom]"))n.remove();return h(o.textContent??"")}function Wp(){let t=document.querySelector('[data-testid="app-shell-header-context-menu-surface"]');if(!t)return"";for(let e of t.querySelectorAll("span, div, h1")){if(e.closest("button, a, [data-bloom]")||e.children.length)continue;let o=h(e.textContent??"");if(o&&o!=="ChatGPT"&&o!=="Share")return o}return""}function pc(t){let e=zn().find(i=>it(i.href)===t),o=e?fc(e):"",n=t===b()?Wp():"";if(n&&(!o||o===h(document.title)))return n;if(o)return o;let r=h(document.title);return r&&r!=="ChatGPT"?r:"Untitled chat"}function ki(t,e){let o=s("button",{class:Ao("-star"),attrs:{type:"button","data-bloom":"chat-star","data-id":t,"aria-pressed":String(e),"aria-label":e?"Unstar chat":"Star chat"},on:{pointerdown:n=>n.stopPropagation(),mousedown:n=>n.stopPropagation(),click:n=>{n.preventDefault(),n.stopPropagation();let{place:r}=o.dataset;if(r==="header"||r==="action"){let a=Xt(`${location.pathname}${location.search}`);a&&hc(t,a,pc(t));return}let i=zn().find(a=>it(a.href)===t);i&&zp(i)}}},D("star"));return o}function gc(t,e){t.setAttribute("aria-pressed",String(e)),t.setAttribute("aria-label",e?"Unstar chat":"Star chat")}function hc(t,e,o){let n=yo();Wn.store.chats=n.some(r=>r.id===t)?n.filter(r=>r.id!==t):[{id:t,href:e,title:o||"Untitled chat"},...n].slice(0,Kp)}function zp(t){let e=it(t.href),o=e?Xt(t.href):null;!e||!o||hc(e,o,fc(t)||"Untitled chat")}function Jp(t,e){if(t.button!==0||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.target instanceof Element&&t.target.closest("[data-bloom='chat-star']"))return;let o=zn().find(n=>it(n.href)===e);o&&(t.preventDefault(),o.click())}function Vp(){let t=!1,e=yo().map(o=>{let n=zn().find(a=>it(a.href)===o.id),r=pc(o.id),i=n?Xt(n.href)??o.href:o.href;return!r||r===o.title&&i===o.href?o:(t=!0,{...o,title:r,href:i})});t&&(Wn.store.chats=e)}function Zp(){return[...document.querySelectorAll(u.headerMore)].filter(e=>{if(e.dataset.bloom==="chat-star"||e.closest("[data-bloom], [role='dialog'], [inert]")||e.closest(u.sidebars))return!1;let o=e.getBoundingClientRect();return o.width===0&&o.height===0?!!e.closest("header, #page-header"):o.top>=0&&o.top<96&&o.left>window.innerWidth*.5}).toSorted((e,o)=>o.getBoundingClientRect().left-e.getBoundingClientRect().left||(e.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1))[0]??null}function Xp(){for(let l of document.querySelectorAll('[data-bloom="navigator"] [data-bloom="chat-star"]'))l.remove();let t=Zp(),e=t?.parentElement??null,o=b(),n=o?Xt(`${location.pathname}${location.search}`):null,r=document.querySelector('[data-bloom="chat-star"][data-place="header"]');if(!t||!e||!o||!n||!Z(e)){r?.remove();return}let i=yo().some(l=>l.id===o),a=r?.dataset.id===o?r:ki(o,i);a!==r&&r?.remove(),a.dataset.place="header",gc(a,i),(a.parentElement!==e||a.nextElementSibling!==t)&&t.before(a);let c=t.getBoundingClientRect();c.width>0&&(a.style.width=`${c.width}px`,a.style.height=`${c.height}px`),a.style.color=getComputedStyle(t).color}function $p(){return[...document.querySelectorAll(".turn-action-controls")].filter(t=>!t.closest(`[data-bloom], [role="dialog"], [inert], ${u.sidebars}`))}function _p(){let t=b(),e=t?Xt(`${location.pathname}${location.search}`):null,o=[...document.querySelectorAll('[data-bloom="chat-star"][data-place="action"]')];if(!t||!e){for(let i of o)i.remove();return}let n=yo().some(i=>i.id===t),r=new Set;for(let i of $p()){if(!Z(i))continue;let a=i.querySelector('[data-place="action"]');(!a||a.dataset.id!==t)&&(a?.remove(),a=ki(t,n),a.dataset.place="action"),gc(a,n),a.parentElement!==i&&i.prepend(a);let l=[...i.querySelectorAll("button")].find(d=>d!==a)?.getBoundingClientRect();l&&l.width>0&&(a.style.width=`${l.width}px`,a.style.height=`${l.height}px`),r.add(a)}for(let i of o)r.has(i)||i.remove()}function mc(){if(!Li){Li=!0;try{Vp(),eg(),Xp(),_p()}finally{Li=!1}}}function tg(t,e){let o=[...t.children].find(n=>n instanceof HTMLAnchorElement&&(n.getAttribute("href")==="/"||n.dataset.testid==="create-new-chat-button"));o?o.after(e):t.prepend(e)}function eg(){let t=yo(),e=new Set,o=t.map(n=>`${n.id}	${n.title}	${n.href}`).join(`
`);for(let n of jp()){if(!Z(n))continue;let r=[...n.children].find(i=>i instanceof HTMLElement&&i.dataset.bloom==="starred");if(!t.length){r?.remove();continue}r||(r=s("div",{class:`bloom-root ${Ao("")}`,attrs:{"data-bloom":"starred"}}),tg(n,r)),e.add(r),r.dataset.sig!==o&&(r.dataset.sig=o,r.replaceChildren(s("div",{class:Ao("-label"),text:"Starred"}),...t.map(i=>s("a",{class:Ao("-link"),attrs:{href:Xt(i.href)??i.href},on:{click:a=>Jp(a,i.id)}},s("span",{class:Ao("-title"),text:i.title||"Untitled chat"}),ki(i.id,!0)))))}for(let n of document.querySelectorAll('[data-bloom="starred"]'))e.has(n)||n.remove()}function og(){for(let t of document.querySelectorAll('[data-bloom="chat-star"], [data-bloom="starred"]'))t.remove()}var bc=f({name:"StarChats",description:"Star the open chat from the message toolbar and the header, and keep it at the top of the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:Wn,styles:dc,onSettingsChange(t){t==="chats"&&mc()},start(){Mi=C(t=>I(t)&&mc())},stop(){Mi?.(),Mi=void 0,og()}});var ng="filter:blur(6px)!important;transition:filter 0.2s ease",Ac=`:is(${u.sidebars})`,rg={conversations:{selectors:[`${Ac} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0},projects:{selectors:[`${Ac} a:is([href*="/project"], [href*="/g/g-p-"])`,"[data-app-action-sidebar-project-row]",".bloom-recent-project"],hover:!0},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}},vc=p({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function ig(){return Object.entries(rg).filter(([t])=>vc.store[t]).map(([,{selectors:t,hover:e}])=>{let o=t.join(",");return`:is(${o}){${ng}}`+(e?`:is(${o}):hover, .bloom-recent-item:hover :is(${o}){filter:none!important}`:"")}).join(`
`)}var yc,qc=f({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:vc,styles:ig,start(){yc=lt()},stop(){yc?.()}});var Sc=`/*
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
`;var sg=E("bloom-temporary-"),Ec=p({openNewAsTemporary:{type:"boolean",description:"Open New chat as a temporary chat.",default:!1}}),Bi,Jn,Ii=!1;function lg(t){return t?"/?temporary-chat=true":"/"}function xc(t){let e=lg(t);`${location.pathname}${location.search}`===e||t&&at()&&location.pathname==="/"||location.assign(e)}function cg(){let t=[...document.querySelectorAll(u.sidebarScroll)].filter(o=>!o.closest("[inert]")&&Z(o));if(t.length)return t;let e=document.querySelector(`${u.oldSidebar} nav`)??document.querySelector(u.oldSidebar);return e&&Z(e)?[e]:[]}function Tc(t){if(t.closest("[data-bloom]"))return!1;try{let e=new URL(t.href,location.origin);return e.origin===location.origin&&e.pathname==="/"}catch{return!1}}function ug(t){return[...t.querySelectorAll("a[href]")].find(Tc)??null}function dg(){let t=at();return s("button",{class:sg("button"),attrs:{type:"button","data-bloom":"temporary-chat","aria-pressed":String(t),"aria-label":t?"Turn off temporary chat":"Temporary chat"},text:"Temporary"})}function mg(){let t=new Set;for(let e of cg()){let o=[...e.querySelectorAll('[data-bloom="temporary-chat"]')].find(r=>e.contains(r)),n=ug(e);if(!o)o=dg(),n?n.after(o):e.prepend(o);else{let r=at();o.setAttribute("aria-pressed",String(r)),o.setAttribute("aria-label",r?"Turn off temporary chat":"Temporary chat")}t.add(o)}for(let e of document.querySelectorAll('[data-bloom="temporary-chat"]'))t.has(e)||e.remove()}function wc(){if(!Ii){Ii=!0;try{mg()}finally{Ii=!1}}}function fg(t){let{target:e}=t;if(!(e instanceof Element))return;if(e.closest('[data-bloom="temporary-chat"]')){t.preventDefault(),t.stopPropagation(),xc(!at());return}if(!Ec.store.openNewAsTemporary||at())return;let o=e.closest("a[href]");!(o instanceof HTMLAnchorElement)||!Tc(o)||o.closest(`${u.sidebarScroll}, ${u.rail}, ${u.oldSidebar}, nav`)&&(t.preventDefault(),t.stopPropagation(),xc(!0))}var Cc=f({name:"TemporaryChat",description:"One click starts a temporary chat. Optionally make New chat temporary.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"ghost",enabledByDefault:!0,settings:Ec,styles:Sc,onSettingsChange:wc,start(){Jn=new AbortController,document.addEventListener("pointerdown",fg,{capture:!0,signal:Jn.signal}),Bi=C(t=>I(t)&&wc())},stop(){Jn?.abort(),Jn=void 0,Bi?.(),Bi=void 0;for(let t of document.querySelectorAll('[data-bloom="temporary-chat"]'))t.remove()}});var kt=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)'].join(","),Oi=p({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function pg(){let t=[`${kt}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${kt}>*{margin-block:0!important}`];return Oi.store.italic||t.push(`${kt}{font-style:inherit!important}`),Oi.store.quotes||(t.push(`${kt}{quotes:none!important}`),t.push(`${kt}::before,${kt}::after,${kt} p::before,${kt} p::after{content:none!important}`)),t.join(`
`)}var Mc=f({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:Oi,styles:pg});var gg=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],hg=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",bg='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',Lc=p({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function Ag(){let t=`${Lc.store.width}rem`;return`:is(${hg}){${gg.map(e=>`${e}:${t}!important`).join(";")}}:is(${bg}){max-width:min(100%, ${t})!important}`}var kc=f({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:Lc,styles:Ag});var yg=[ss,ys,Ms,Bs,Ys,Ks,Ws,tl,ul,Al,ql,Ml,kl,Bl,Dl,Jl,ec,sc,uc,bc,qc,Cc,Mc,kc],Ri=yg;var vg=new x("Bloom"),Bc="2.0.63";async function Pi(){Aa();for(let t of Ri)t.updatedAt=Pa[t.name];$i(Ri),await zi(),xo("base",ra),Ra(),Io("Init"),Go().then(()=>{Yi(),Io("DOMContentLoaded")}),await va(),Io("HostReady"),vg.info(`Bloom++ ${Bc} ready`)}var Ic=new x("Boot");if(window===window.top){let t=_.Bloom;t&&Ic.warn("Replacing another Bloom++ instance",t.VERSION),Object.defineProperty(_,"Bloom",{value:Di,configurable:!0,writable:!0}),Pi().catch(e=>Ic.error("Startup failed",e))}})();
