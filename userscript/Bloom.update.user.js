// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.57
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

/* Bloom++ v2.0.57. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Bc=Object.defineProperty;var Ic=(e,t)=>{for(var o in t)Bc(e,o,{get:t[o],enumerable:!0})};var x=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var ve=(e,t,o)=>Math.min(o,Math.max(t,e)),w=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Di=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,qe=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,h=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function xo(e,t){return`${e} ${t}${e===1?"":"s"}`}async function Hi(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function Se(e){try{return JSON.parse(e)}catch{return}}var $=typeof unsafeWindow>"u"?window:unsafeWindow;var Pi={};Ic(Pi,{VERSION:()=>Mc,init:()=>Ri,plugins:()=>Re});var Oc=new x("Styles"),St=new Map,Ni=new Set,xt=new Map,Vn=!0;function Gi(){let e=document.adoptedStyleSheets.filter(t=>!Ni.has(t));document.adoptedStyleSheets=[...e,...St.values()]}function Ui(e){document.readyState==="loading"||e.parentNode===document.head||document.head.append(e)}function Rc(e,t){let o=xt.get(e);o||(o=document.createElement("style"),o.id=`bloom-style-${e}`,xt.set(e,o)),o.textContent!==t&&(o.textContent=t),Ui(o)}function wo(e,t){if(Vn)try{let o=St.get(e);o||(o=new $.CSSStyleSheet,St.set(e,o),Ni.add(o)),o.replaceSync(t),Gi();return}catch(o){Oc.warn("Constructed style sheets unavailable, using <style> after parsing",o),Vn=!1,St.delete(e)}Rc(e,t)}function Zn(e){St.delete(e)&&Vn&&Gi(),xt.get(e)?.remove(),xt.delete(e)}function Fi(){for(let e of xt.values())Ui(e)}var E=e=>(...t)=>t.map(o=>e+o).join(" "),Eo=(...e)=>e.filter(Boolean).join(" "),Xe=e=>e.length?`${e.map(t=>`${t}:not([data-bloom])`).join(",")}{display:none!important}`:"";function f(e){return e}var Be=new x("Storage"),Pc="bloompp",To="kv",Yi=null;function Dc(){return Yi??=new Promise((e,t)=>{let o=indexedDB.open(Pc,1);o.onupgradeneeded=()=>{o.result.objectStoreNames.contains(To)||o.result.createObjectStore(To)},o.onsuccess=()=>e(o.result),o.onerror=()=>t(o.error)}),Yi}function Xn(e,t){return Dc().then(o=>new Promise((n,r)=>{let i=t(o.transaction(To,e).objectStore(To));i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)}))}async function Hc(e){if(typeof GM_getValue=="function")try{return await GM_getValue(e)}catch(t){Be.warn("GM read failed",t);return}}async function Nc(e){try{return await Xn("readonly",t=>t.get(e))}catch(t){Be.warn("IndexedDB read failed",t);return}}function Gc(e){try{return localStorage.getItem(e)??void 0}catch{return}}async function Co(e){return Promise.all([Hc(e),Nc(e),Gc(e)])}function Qi(e,t){typeof GM_addValueChangeListener=="function"&&GM_addValueChangeListener(e,(o,n,r,i)=>{i&&t(r)}),addEventListener("storage",o=>{o.key===e&&t(o.newValue)})}function $n(e){if(typeof GM_setValue=="function")try{GM_setValue(e,{})}catch(t){Be.warn("GM delete failed",t)}try{localStorage.removeItem(e)}catch(t){Be.warn("localStorage delete failed",t)}Xn("readwrite",t=>t.delete(e)).catch(t=>Be.warn("IndexedDB delete failed",t))}function Mo(e,t){let o=JSON.stringify(t);if(typeof GM_setValue=="function")try{GM_setValue(e,t)}catch{GM_setValue(e,o)}try{localStorage.setItem(e,o)}catch(n){Be.warn("localStorage write failed",n)}Xn("readwrite",n=>n.put(o,e)).catch(n=>Be.warn("IndexedDB write failed",n))}var Uc=new x("Settings"),er="BloomSettings",Fc=100,Yc=["GM","IndexedDB","localStorage"],$e={plugins:{}},Lo=new Set,tr=new Set,wt;function ji(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=Se(t);return!w(t)||!w(t.plugins)||!Object.keys(t.plugins).length?null:t}var _n=e=>e==null||e===""||(Array.isArray(e)?!e.length:w(e)&&!Object.keys(e).length);function Qc(e){return _n(e)?0:Array.isArray(e)?12+Math.min(e.length,40):w(e)?12+Math.min(Object.keys(e).length,40):3}function Kc(e){let t=0;for(let o of Object.values(e.plugins))if(w(o))for(let[n,r]of Object.entries(o))n!=="enabled"&&(t+=Qc(r));return t}var Ki=e=>Object.values(e.plugins).filter(t=>w(t)&&t.enabled===!0).length;function jc(e){let t=e.map((i,s)=>i&&{candidate:i,index:s,score:Kc(i)}).filter(i=>i!=null).toSorted((i,s)=>s.score-i.score||(i.score?0:Ki(s.candidate)-Ki(i.candidate))||i.index-s.index);if(!t.length)return null;let[o,...n]=t,r=structuredClone(o.candidate);for(let{candidate:i}of n)for(let[s,u]of Object.entries(i.plugins)){if(!w(u))continue;let l=r.plugins[s]??={};for(let[d,m]of Object.entries(u))d==="enabled"?!("enabled"in l)&&m===!0&&(l.enabled=!0):_n(l[d])&&!_n(m)&&(l[d]=structuredClone(m));Object.keys(l).length||delete r.plugins[s]}return{bag:r,source:Yc[o.index]}}async function Wi(){let e=await Co(er),t=jc(e.map(ji));t&&($e.plugins=t.bag.plugins,Uc.info("Loaded settings from",t.source))}var zi=(e,t)=>`${e}
${t}`;function Ji(){wt=void 0,tr.clear(),Mo(er,$e)}function Wc(e){let t=ji(e);if(!t)return;let o=[];for(let n of new Set([...Object.keys($e.plugins),...Object.keys(t.plugins)])){let r=$e.plugins[n]??={},i=w(t.plugins[n])?t.plugins[n]:{};for(let s of new Set([...Object.keys(r),...Object.keys(i)]))tr.has(zi(n,s))||JSON.stringify(r[s])===JSON.stringify(i[s])||(i[s]===void 0?delete r[s]:r[s]=i[s],o.push([n,s]))}for(let[n,r]of o)for(let i of Lo)i(n,r)}function zc(){wt&&(clearTimeout(wt),Ji())}var Ie=(e,t)=>$e.plugins[e]?.[t];function Oe(e,t,o){let n=$e.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,tr.add(zi(e,t)),clearTimeout(wt),wt=setTimeout(Ji,Fc);for(let r of Lo)r(e,t)}function _e(e){return Lo.add(e),()=>void Lo.delete(e)}function or(e){return e.type==="component"?void 0:e.default}function p(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>Ie(t.pluginName,n)??(e[n]&&or(e[n])),set:(o,n,r)=>(Oe(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&Ie(t.pluginName,o)!==void 0&&Oe(t.pluginName,o)}};return t}var Vi=e=>{let t=()=>{let o=Ie("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();Oe("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},ko=Vi("pinnedPlugins"),Bo=Vi("starredPlugins");addEventListener("pagehide",zc);Qi(er,Wc);var Io=new x("PluginManager"),Re=new Map,Et=new Set,Zi=new Set,nr=new Set;function Xi(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),Re.set(t.name,t)}var Tt=e=>!!e.required||(Ie(e.name,"enabled")??!!e.enabledByDefault);var rr=e=>`plugin-${e.name}`;function $i(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?wo(rr(e),t):Zn(rr(e))}function _i(e){if(!Et.has(e.name))try{$i(e),e.start?.(),Et.add(e.name)}catch(t){Io.error(`Failed to start ${e.name}`,t)}}function Jc(e){if(Et.delete(e.name)){Zn(rr(e));try{e.stop?.()}catch(t){Io.error(`Failed to stop ${e.name}`,t)}}}var es=e=>e.startAt??"HostReady";function Oo(e){Zi.add(e);for(let t of Re.values())es(t)===e&&Tt(t)&&_i(t);Io.info(`${e}: ${[...Et].join(", ")}`)}function ts(e,t){Oe(e.name,"enabled",t),t?Zi.has(es(e))&&_i(e):Jc(e);for(let o of nr)o()}function os(e){return nr.add(e),()=>void nr.delete(e)}_e((e,t)=>{let o=Re.get(e);if(!(!o||t==="enabled"||!Et.has(e)))try{$i(o),o.onSettingsChange?.(t)}catch(n){Io.error(`Settings change failed for ${e}`,n)}});var ns=`/*
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
`;var Zc=new x("Dom");function a(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var rs=document.createElement("template");function is(e){return rs.innerHTML=e.trim(),rs.content.firstElementChild.cloneNode(!0)}var Mt=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),W=(e,t=document)=>[...t.querySelectorAll(e)].find(Mt)??null,Xc=16,$c="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function ss(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([$c],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function Lt(e){document.hidden?setTimeout(e,Xc):requestAnimationFrame(e)}function et(e){let t=!1;return()=>{t||(t=!0,Lt(()=>{t=!1;try{e()}catch(o){Zc.error("Scheduled task failed",o)}}))}}var Ro=new Set,Po=[],Ct,_c=et(()=>{let e=Po;Po=[];for(let t of Ro)t(e)});function C(e){return Ro.add(e),Ct||(Ct=new MutationObserver(t=>{Po.push(...t),_c()}),Ct.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{Ro.delete(e),!Ro.size&&(Ct?.disconnect(),Ct=void 0,Po=[])}}var eu=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),I=e=>!e.length||e.some(t=>!eu(t.target));function Pe(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size");return}e.getAttribute("data-bloom-text")!==t&&(e.hasAttribute("data-bloom-text")||e.style.setProperty("--bloom-text-size",getComputedStyle(e).fontSize),e.setAttribute("data-bloom-text",t))}var tu=new x("Events");function Do(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){tu.error(`Listener for ${String(t)} failed`,r)}}}}var c={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",modelTrigger:'[data-testid="model-switcher-dropdown-button"], button[aria-label="Model selector" i]',modelItem:'[role="menu"] [data-testid^="model-switcher-"], [role="menuitem"][data-testid^="model-switcher-"]',homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]'};var as=/[​-‍﻿]/g,xe=()=>W(c.composerInput),we=e=>e instanceof HTMLElement&&e.matches(c.composerInput),F=(e=xe())=>e?.closest("form")??document.querySelector(c.oldComposerForm);function M(e=xe()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(as,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(as,"").trim()}var ou=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function ee(e,t=xe()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return ou?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function ls(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:s,value:u}=e;return{first:!u.slice(0,i).includes(`
`),last:!u.slice(s).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var cs=e=>{let t=F();return(t&&W(e,t))??W(e)},tt=()=>cs(c.stopButton),nu=()=>{let e=cs(c.sendButton);return e&&!e.matches(c.stopButton)?e:null};function Ho(){let e=nu();if(e){e.disabled||e.click();return}xe()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var us=()=>Mt(tt());var fs=new x("Network"),ru=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,iu=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,Go=1e3,su=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),Y=Do(),ir=new Map,ds=new Map,au=1,oe=e=>e?ir.get(e)??null:null;function No(e){let t=ir.get(e);return t||ir.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var ps=e=>e==="user"||e==="assistant";function gs(e){let t=e.author?.role;if(!e.id||!ps(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(l=>typeof l=="string").join(`
`).trim(),i=n.filter(l=>w(l)&&l.content_type==="image_asset_pointer").length,s=e.metadata?.attachments,u=Array.isArray(s)&&s.length>0;return!r&&!i&&!u?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*Go:null,text:r,hasFiles:u,imageCount:i}}var hs=e=>e.filter((t,o)=>t.role==="user"||e[o+1]?.role!=="assistant"),sr=e=>e.map(t=>t.createTime).filter(t=>t!=null);function lu(e,t){let o=sr(e),n=sr(t);return!o.length||!n.length?!1:Math.max(...o)<Math.min(...n)}function cu(e){let t=sr(e);if(t.length<2)return e;let[o]=t,n=o-e.length;return e.map((i,s)=>(i.createTime!=null&&(n=i.createTime),{message:i,index:s,time:i.createTime??n})).toSorted((i,s)=>i.time-s.time||i.index-s.index).map(i=>i.message)}function uu(e,t){let o=t.filter(w).map(u=>w(u.message)?u.message:u);for(let u of o)u.id&&u.create_time&&e.times.set(u.id,u.create_time*Go);let n=o.map(gs).filter(u=>u!=null),r=new Set(n.map(u=>u.id)),i=e.chain.filter(u=>!r.has(u.id)),s=lu(n,i)?[...n,...i]:[...i,...n];return e.chain=hs(cu(s)),e}function du(e,t){if(!w(t)||!(w(t.mapping)||Array.isArray(t.messages)))return null;let o=No(e);if(typeof t.title=="string"&&t.title&&(o.title=t.title),Array.isArray(t.messages))return uu(o,t.messages);let n=t.mapping;for(let u of Object.values(n)){let l=u.message?.create_time;u.message?.id&&l&&o.times.set(u.message.id,l*Go)}let r=[],i=new Set,s=typeof t.current_node=="string"?t.current_node:null;for(;s&&!i.has(s)&&n[s];){i.add(s);let u=n[s].message,l=u?gs(u):null;l&&r.push(l),s=n[s].parent??null}return r.length&&(o.chain=hs(r.toReversed())),o}function mu(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}function fu(e){if(typeof e?.body!="string")return null;let t=Se(e.body);return w(t)&&typeof t.conversation_id=="string"?t.conversation_id:null}function pu(e,t){if(!w(e))return;typeof e.type=="string"&&su.has(e.type)&&(t.handoff=!0);let o=w(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(No(e.conversation_id).title=e.title,Y.emit("conversation",No(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&ps(n.author?.role)){let r=n.create_time*Go;t.conversationId&&No(t.conversationId).times.set(n.id,r),Y.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function gu(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:s}=await o.read();if(i)break;r+=n.decode(s,{stream:!0});let u=r.split(`
`);r=u.pop()??"";for(let l of u){if(!l.startsWith("data:"))continue;let d=l.slice(5).trim();d&&d!=="[DONE]"&&pu(Se(d),t)}}}async function hu(e,t,o){let n={conversationId:t,error:!1,handoff:!1};ds.set(e,t),Y.emit("generate-start",{requestId:e,conversationId:t});try{let r=await o;r.ok?r.headers.get("content-type")?.includes("event-stream")&&await gu(r.clone(),n):n.error=!0}catch(r){let i=r instanceof DOMException&&r.name==="AbortError";n.handoff||=i,n.error||=!i}finally{ds.delete(e),Y.emit("generate-end",{requestId:e,...n})}}async function bu(e,t){try{let o=await t;if(!o.ok)return;let n=du(e,await o.clone().json());n&&Y.emit("conversation",n)}catch(o){fs.debug("Conversation read skipped",o)}}function Au(e,t,o){let n=mu(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&ru.test(n.pathname)){hu(au++,fu(t),o);return}let i=r==="GET"&&n.pathname.match(iu)?.[1];i&&bu(i,o)}var ms=!1;function bs(){if(ms)return;ms=!0;let e=$.fetch,t=function(o,n){let r=e.call(this??$,o,n);try{Au(o,n,r)}catch(i){fs.error("Fetch tap failed",i)}return r};$.fetch=typeof exportFunction=="function"?exportFunction(t,$):t}var yu="__reactContainer$",As="__reactFiber$";function Uo(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var ar=(e,t)=>Object.keys(e.wrappedJSObject??e).some(o=>o.startsWith(t)),te=e=>!ar(document,yu)||ar(e,As);function kt(){return document.body?Promise.resolve():new Promise(e=>{let t=new MutationObserver(()=>{document.body&&(t.disconnect(),e())});t.observe(document,{childList:!0,subtree:!0})})}async function ys(){await kt();let e=Date.now()+8e3;for(;!ar(document.body,As)&&Date.now()<e;)await new Promise(t=>setTimeout(t,100))}var vu=new x("Route"),vs=/\/c\/(?!local-)([\w-]+)/,qu=500,ie=e=>{try{return new URL(e,location.origin).pathname.match(vs)?.[1]??null}catch{return null}},b=()=>location.pathname.match(vs)?.[1]??null,Ko=()=>location.pathname==="/",Su=/^\/g\/g-p-[^/]+(?:\/project)?\/?$/,qs=()=>Su.test(location.pathname),se=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",Yo=new Set,Qo=location.href,cr=b(),Fo;function lr(){if(location.href===Qo)return;let e={prevHref:Qo,href:location.href,prevId:cr,id:b()};Qo=e.href,cr=e.id;for(let t of Yo)try{t(e)}catch(o){vu.error("Route listener failed",o)}}function xu(){let e=new AbortController,{navigation:t}=$;t?.addEventListener("currententrychange",()=>queueMicrotask(lr),{signal:e.signal}),addEventListener("popstate",lr,{signal:e.signal});let o=setInterval(lr,qu);return()=>{e.abort(),clearInterval(o)}}function ae(e){return Yo.add(e),Fo||(Qo=location.href,cr=b(),Fo=xu()),()=>{Yo.delete(e),!Yo.size&&(Fo?.(),Fo=void 0)}}var wu=["data-turn","data-message-author-role"],Eu=/:(user|assistant)$/,ur=`${c.messageUnit}, ${c.oldMessage}`,dr=e=>e==="user"||e==="assistant",Es=()=>!!document.querySelector(c.timelineScroll),ot=()=>Es()?W(c.timelineScroll):document;function It(){if(Es())return W(c.timelineScroll);let e=document.querySelector(c.turn);for(let t=e?.parentElement;t;t=t.parentElement){let{overflowY:o}=getComputedStyle(t);if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight)return t}return document.scrollingElement}var nt=e=>e.getAttribute("data-chatgpt-search-unit-key")?.match(Eu)?.[1]??null,Ts=e=>[...e.querySelectorAll(c.searchUnit)].filter(t=>nt(t)&&!t.parentElement?.closest(c.searchUnit)),Ss=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function Bt(e){let t=Ss(e);return t.length?t:[...new Set([...e.querySelectorAll(ur)].flatMap(Ss))]}function Ot(e=ot()){if(!e)return[];let t=Ts(e);return t.length?t:[...e.querySelectorAll(ur)].filter(o=>!o.parentElement?.closest(ur))}function Tu(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function Cu(e){for(let t of wu){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(dr(o))return o}return e.querySelector(c.markdown)||e.querySelector(c.generatedImage)?"assistant":null}var Mu=e=>!e.parentElement?.closest(c.turn);function Wo(){let e=oe(b())?.chain??[];return[...ot()?.querySelectorAll(c.turn)??[]].filter(Mu).flatMap(o=>{let n=Ts(o),r=n.length?n.map(i=>({el:i,known:nt(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=d=>!n.some(m=>m.contains(d))&&h(d.textContent??""),s=[...o.querySelectorAll(c.assistantMarkdown)].find(d=>i(d)&&!jo.test(h(d.textContent??""))),u=[...o.querySelectorAll(c.activityHeader)].findLast(i),l=s??u;l&&r.push({el:l,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?Bt(o):Ot(o).flatMap(Bt),s=n??Cu(o)??Tu(i,e)??(r%2?"assistant":"user"),u=o.closest(c.turn)??o,l=!o.closest(c.searchUnit)&&!!u.querySelector(c.turnBusy),d=s==="assistant"&&(o.matches(c.turnBusy)||!!o.querySelector(c.turnBusy)||l);return{el:o,role:s,messageIds:i,streaming:d}})}var Lu="[data-bloom], .sr-only",Cs=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,jo=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,xs=new WeakMap;function zo(e){let o=(e.el.closest(c.turn)??e.el).textContent?.length??0,n=xs.get(e.el);if(n?.length===o)return n.summary;let r=ku(e);return xs.set(e.el,{length:o,summary:r}),r}function ws(e){let t=new Set,o=[];for(let n of e.querySelectorAll(c.assistantMarkdown)){if(n.closest(c.searchUnit))continue;let r=h(n.textContent??"");!r||jo.test(r)||Cs.test(r)||t.has(r)||(t.add(r),o.push(r))}return o}function ku(e){let t=e.el.querySelectorAll(c.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.closest(c.turn);if(e.role==="assistant"&&o&&e.el.matches(c.assistantMarkdown)&&!e.el.closest(c.searchUnit)){let l=ws(o);if(l.length)return l.join(" \xB7 ")}let n=e.el.querySelector(e.role==="assistant"?c.markdown:".whitespace-pre-wrap")??e.el,i=[...n.querySelectorAll(Lu)].map(l=>h(l.textContent??"")).filter(Boolean).reduce((l,d)=>l.replace(d,`
`),n.innerText||n.textContent||""),s=i.split(`
`).map(h).filter(l=>l&&!Cs.test(l)&&!jo.test(l));if(s.length)return s.join(" ");if(e.role==="assistant"&&o){let l=ws(o);if(l.length)return l.join(" \xB7 ")}let u=i.split(`
`).map(h).filter(l=>jo.test(l));return u.length?u.at(-1)??"":e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function Jo(e){return e.text?h(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var Ms=e=>e.matches(c.timelineScroll)&&getComputedStyle(e).flexDirection==="column-reverse";var Bu=250,Iu=400,Ou=6e4,Ru=5e3,Pu=`:is(${c.turn}) :is(${c.turnBusy})`,v=Do(),Xo=new Set,mr=new Set,Ee=!1,ks=0,rt=null,it=!1,Vo=!1,Rt=0,$o=!1,Pt=null,Ls=!1,k=()=>({generating:Ee,conversationId:b()}),Bs=()=>us()||!!ot()?.querySelector(Pu);function Du(){let e=Bs();return e?Vo||(Rt=0,$o=!0):Vo=!1,[...Xo].some(t=>!mr.has(t))||e&&!Vo||Date.now()<Rt}function Hu(){return Pt?.error?"error":it?"stopped":"done"}function Nu(){rt=null,Ee=!1,$o=!1,v.emit("fall",{conversationId:b(),outcome:Hu()}),it=!1,Pt=null}function Is(){let e=Du();e&&!Ee&&(Ee=!0,ks=Date.now(),it=!1,Pt=null,v.emit("rise",{conversationId:b()})),e||!Ee?rt=null:rt==null?rt=Date.now():Date.now()-rt>=Iu&&Nu()}function Zo(){Is(),v.emit("tick",k())}function Gu({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(Ee||Date.now()-ks<Ou);if(!o&&Ee){for(let n of Xo)mr.add(n);Vo=Bs(),Rt=0,$o=!1,rt=null,Ee=!1,it=!1,Pt=null,v.emit("fall",{conversationId:e,outcome:"left"})}v.emit("context",{prevId:e,id:t,migrated:o}),Zo()}function Uu(e){e.target instanceof Element&&e.target.closest(c.stopButton)&&(it=!0,Rt=0)}function Os(){Ls||(Ls=!0,Y.on("generate-start",({requestId:e})=>{Xo.add(e),Zo()}),Y.on("generate-end",e=>{Xo.delete(e.requestId),!mr.delete(e.requestId)&&(Pt=e,Rt=e.handoff&&!e.error&&!it&&!$o?Date.now()+Ru:0,Zo())}),ae(Gu),document.addEventListener("click",Uu,!0),ss(Zo,Bu),Uo().then(()=>C(Is)))}var Rs={BetterNavigator:1791041596e3,ChatListStatus:1791034734e3,ChatStateFavicons:1791034734e3,Cleaner:1791034734e3,ComposerOpacity:1791037311e3,Continue:1791034734e3,CustomSidebarIdentity:1791034734e3,GreetingCustomizer:1791037311e3,InputHistory:1791034734e3,MessageTimestamps:1791034734e3,NoDictation:1791034734e3,NoShareLink:1791034734e3,NoSidebarIdentity:1791034734e3,PromptQueue:1791041596e3,RecentTopics:1791034734e3,ResponseNotification:1791034734e3,Settings:1791039171e3,SidebarIdentityOpacity:1791034734e3,StarChats:1791040514e3,StreamerMode:1791034734e3,WiderChat:1791034734e3};var A=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,Fu="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",Yu={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${Fu}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:A('<path d="M18 6 6 18M6 6l12 12"/>'),gear:A('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:A('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:A('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:A('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:A('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:A('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:A('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:A('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:A('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:A('<path d="m6 9 6 6 6-6"/>'),play:A('<path d="M7 4v16l13-8z"/>'),plus:A('<path d="M12 5v14M5 12h14"/>'),check:A('<path d="m5 12 5 5 9-10"/>'),alert:A('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:A('<path d="M4 5h16v11H9l-5 4z"/>'),layout:A('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:A('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:A('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:A('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:A('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:A('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:A('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:A('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:A('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:A('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:A('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:A('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:A('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:A('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:A('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:A('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),ghost:A('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},D=e=>is(Yu[e]);var me="data-bloom-tip",fr=6,pr=8,De,Ps=null;function st(e){if(e===Ps)return;if(Ps=e,!e){De?.remove();return}De??=a("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),De.textContent=e.getAttribute(me),document.body.append(De);let t=e.getBoundingClientRect(),{width:o,height:n}=De.getBoundingClientRect(),r=t.bottom+fr+n<=innerHeight-pr;De.style.left=`${ve(t.left+t.width/2-o/2,pr,innerWidth-o-pr)}px`,De.style.top=`${r?t.bottom+fr:t.top-fr-n}px`}var Ds=e=>e instanceof Element?e.closest(`[${me}]`):null;function Hs(){let e=new AbortController,t={passive:!0,signal:e.signal};return document.addEventListener("pointerover",o=>st(Ds(o.target)),t),document.addEventListener("pointerout",o=>o.relatedTarget||st(null),t),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&st(Ds(o.target)),t),document.addEventListener("focusout",()=>st(null),t),document.addEventListener("pointerdown",()=>st(null),t),()=>{e.abort(),st(null)}}function gr(e,t,o,n=!1){let r=a("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let s=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(s)),t(s)}),r}function N(e,t,o){return a("button",{class:Eo("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button","data-bloom":"control"},on:{click:t}})}function z(e,t,o,n){let r=a("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":t,"data-bloom":"control",[me]:t},on:{click:o}},D(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function _o(e,t,o,n,r,i){let s=a("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});s.value=String(e);let u=a("output",{text:`${s.value}${r}`});return s.addEventListener("input",()=>{u.textContent=`${s.value}${r}`,i(Number(s.value))}),a("div",{class:"bloom-slider"},s,u)}function hr(e,t,o){let n=a("select",{class:"bloom-select"},...t.map(r=>a("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function Dt(e,t,o="",n="text"){let r=a("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var Qu=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,Ns=/\S+@\S+\.\S+/,Ku=3,ju=/^\/g\/(g-p-[^/]+)\//,Wu=/^g-p-[0-9a-f]+-?/i,Gs=e=>!!e.closest(".sr-only"),br=e=>!!e?.querySelector(c.menuButton);function Us(){return[...document.querySelectorAll(c.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(br)).filter(e=>e!=null)}function Fs(){let e=[...document.querySelectorAll(c.oldProfile)];if(e.length)return e.map(o=>{let n=o.parentElement?.children.length===1?o.parentElement:o;return{kind:"profile",anchor:n,insert:r=>n.before(r)}});let t=Us().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(c.rail)){let n=[...o.children].find(br);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}var Ar=e=>!e.closest("[data-bloom]")&&(!!e.querySelector("img, [class*=rounded-full]")||js(e).some(t=>!Gs(t))),Ys=e=>[...e.parentElement?.children??[]].find(t=>t!==e&&t instanceof HTMLElement&&Ar(t))??null;function Qs(){let e=[...document.querySelectorAll(c.oldProfile)];return e.length?e:[...Us(),...[...document.querySelectorAll(c.rail)].map(o=>[...o.children].findLast(br))].map(o=>[...o?.querySelectorAll(c.menuButton)??[]].findLast(n=>Ar(n)||Ys(n))).filter(o=>o!=null)}var Ks=()=>Qs().map(e=>Ar(e)?e:Ys(e)).filter(e=>e!=null);function js(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!h(t.textContent??"")&&!(t instanceof SVGElement))}var zu=e=>{if(/rounded-full/.test(e.getAttribute("class")??""))return!0;if(!e.clientWidth)return!1;let{borderRadius:t}=getComputedStyle(e);return t.includes("%")||Number.parseFloat(t)>=e.clientWidth/2};function en(e,t,o){for(let n of e.querySelectorAll(`[${t}]`))n!==o&&n.removeAttribute(t);o&&!o.hasAttribute(t)&&o.setAttribute(t,"")}function Ju(e,t){if(h(e.textContent??"").length>Ku)return null;let o=e.closest("button");for(let n=e;n&&n!==t&&n!==o;n=n.parentElement)if(zu(n))return n;return null}function yr(e,t){e.hasAttribute(`data-bloom-${t}`)||e.setAttribute(`data-bloom-${t}`,"");let o=e.querySelector("img:not([data-bloom] img)"),n=js(e),r=o?null:n.map(m=>Ju(m,e)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),s=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");en(e,`data-bloom-${t}-avatar`,s);let u=n.filter(m=>!s?.contains(m)&&!Gs(m)),l=u.find(m=>Qu.test(h(m.textContent??""))),d=u.find(m=>Ns.test(m.textContent??""));en(e,`data-bloom-${t}-plan`,l),en(e,`data-bloom-${t}-email`,d),en(e,`data-bloom-${t}-name`,u.find(m=>m!==l&&m!==d))}function Vu(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function tn(){return Qs().map(Vu).find(e=>e!=null)??[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&(Ns.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var Ht=e=>[...document.querySelectorAll(c.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&ie(t.href)===e);function Ws(e){let t=Ht(e).find(o=>h(o.textContent??""));return t?h(t.textContent??""):null}function zs(e){let t=new URL(e,location.origin).pathname.match(ju)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!ie(n.href)&&h(n.textContent??""));return o?h(o.textContent??""):t.replace(Wu,"").replaceAll("-"," ")||null}var vr=0,on;function Zu(e){if(!I(e))return;for(let o of Ks())yr(o,"profile");let t=tn();t&&yr(t,"menu")}function le(){vr++;let e=!0;return kt().then(()=>{e&&vr&&!on&&(on=C(Zu))}),()=>{e&&(e=!1,!--vr&&(on?.(),on=void 0))}}var Xu=new x("SettingsPanel"),g=E("bloom-settings-"),$u=10080*60*1e3,_u=3e3,Js="Toggle features. Some need a reload. Click the sliders icon to configure.",ed=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],td=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],od={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},Zs=new Set(["chat","ui","privacy"]),Q=null,Ne="all",qr="all",nn="",Sr=[],Xs=()=>[...Re.values()].filter(e=>!e.hidden),nd=e=>!!e.updatedAt&&Date.now()-e.updatedAt<$u;function rd(e){switch(Ne){case"favorites":return Bo.has(e.name);case"recent":return nd(e);case"all":return!0;case"other":return!e.tags.some(t=>Zs.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(Ne)}}function id(e){switch(qr){case"all":return!0;case"enabled":return Tt(e);case"disabled":return!Tt(e)}}function sd(e){let t=nn.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function ad(e){let t=ko.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return Ne==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var $s=e=>e.settings?.def??{},ld=e=>Object.values($s(e)).some(t=>t.type!=="custom");function cd(e,t,o){let n=Ie(e.name,t)??or(o),r=i=>Oe(e.name,t,i);switch(o.type){case"boolean":return gr(n,r,o.description??t);case"slider":return _o(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return hr(n,o.options,r);case"string":return Dt(n,r,o.placeholder);case"number":return Dt(String(n),i=>r(Number(i)),"","number");case"component":{let i=a("div",{class:g("component")});return Sr.push(o.render(i)),i}case"custom":return null}}var ud=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function _s(e){if(!Q)return;let t=Object.entries($s(e)).filter(([,i])=>i.type!=="custom").map(([i,s])=>{let u=cd(e,i,s),l=s.type==="boolean",d=s.type!=="component"&&a("div",{class:g("field-label"),text:ud(i)}),m=s.description&&a("div",{class:g("field-desc"),text:s.description});return a("div",{class:g("field",l?"field-inline":"field-stacked")},(d||m)&&a("div",{class:g("field-text")},d,m),u)}),o,n=N("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},_u);return}clearTimeout(o),e.settings?.reset(),Nt(),_s(e)},"danger"),r=a("div",{class:g("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&Nt()}},a("div",{class:g("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},a("div",{class:g("popup-header")},a("div",{class:g("card-icon")},D(e.icon)),a("div",{class:g("popup-title")},a("div",{class:g("card-name"),text:e.name}),a("div",{class:g("popup-authors"),text:e.authors.join(", ")})),z("close","Close",Nt)),a("p",{class:g("popup-desc"),text:e.description}),a("div",{class:g("fields")},...t),a("div",{class:g("popup-footer")},n)));Q.querySelector(`.${g("modal")}`)?.append(r)}function Nt(){for(let e of Sr)e();Sr=[],Q?.querySelector(`.${g("popup-backdrop")}`)?.remove()}function Vs(e){let t=Tt(e),o=Bo.has(e.name),n=ko.has(e.name),r=!!e.required;return a("div",{class:[g("card",t?"card-on":"card-off"),r?g("card-required"):""].filter(Boolean).join(" ")},a("div",{class:g("card-top")},a("div",{class:g("card-icon")},D(e.icon)),a("div",{class:g("card-actions")},z("star",o?"Unstar":"Star",()=>{Bo.toggle(e.name),He()},o),r?null:z("pin",n?"Unpin":"Pin to top",()=>{ko.toggle(e.name),He()},n),r?a("span",{class:g("required-mark"),attrs:{"aria-label":"Required",[me]:"This plugin is required for Bloom++ to work"}},D("alert")):null,ld(e)&&z("gear","Settings",()=>_s(e)),gr(t,i=>ts(e,i),r?`${e.name} is required`:`Enable ${e.name}`,r))),a("div",{class:g("card-name"),text:e.name}),a("div",{class:g("card-desc"),text:e.description,title:e.description}),a("div",{class:g("card-footer"),text:e.authors.join(", ")}))}function ea(){let e=Xs().some(o=>!o.tags.some(n=>Zs.has(n)));Q?.querySelector(`.${g("tabs")}`)?.replaceChildren(...ed.filter(o=>o.id!=="other"||e).map(o=>a("button",{class:g("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===Ne)},on:{click:()=>{Ne=o.id,ea(),He()}}})))}function He(){if(!Q)return;let e=Xs().filter(rd),t=Q.querySelector(`.${g("search")} input`);t&&(t.placeholder=`Search ${xo(e.length,"plugin")}...`);let o=ad(e.filter(d=>sd(d)&&id(d))),n=Ne==="all",r=n?o.filter(d=>!d.required):o,i=n?o.filter(d=>d.required):[],s=[...r.map(Vs),...i.length?[a("div",{class:g("required-break"),attrs:{role:"separator"}}),...i.map(Vs)]:[]],u=nn.trim()?"No plugins match your search.":od[Ne]??"No plugins available.";Q.querySelector(`.${g("grid")}`)?.replaceChildren(...s.length?s:[a("div",{class:g("empty"),text:u})])}function dd(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),Q?.querySelector(`.${g("popup-backdrop")}`)?Nt():at())}var ta,xr;function md(){if(Q)return;let e=a("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=nn,e.addEventListener("input",()=>{nn=e.value,He()}),Q=a("div",{class:`bloom-root ${g("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&at()}},a("div",{class:g("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},a("div",{class:g("header")},a("div",{class:g("logo")},D("bloom")),a("h2",{class:g("title"),text:"Bloom++"}),a("span",{class:g("hint"),attrs:{"aria-label":Js,tabindex:"0",[me]:Js}},D("info")),a("span",{class:g("version"),text:"v2.0.57"}),z("close","Close",at)),a("div",{class:g("tabs"),attrs:{role:"tablist"}}),a("div",{class:g("toolbar")},a("label",{class:g("search")},D("search"),e),hr(qr,td,t=>{qr=t,He()})),a("div",{class:g("grid")}))),Q.addEventListener("keydown",t=>t.stopPropagation()),xr=new AbortController,document.addEventListener("keydown",dd,{capture:!0,signal:xr.signal}),document.body.append(Q),ea(),He(),ta=os(He),e.focus(),Xu.debug("Opened")}function at(){Nt(),xr?.abort(),ta?.(),Q?.remove(),Q=null}var rn=()=>Q?at():md();var oa=`/*
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
`;var Te=E("bloom-entry-"),pd=4,wr="--bloom-entry-x",Er=1,lt=p({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar. The account menu and the userscript menu always open the panel.",default:!1},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:!0},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:e=>(e.append(N("Reset position",()=>{lt.store.entryPosition=Er})),()=>e.replaceChildren())},entryPosition:{type:"custom",default:Er}}),Ge=new Map,na=!1,ra=[];function gd(e,t,o){let n=e.currentTarget,r=t.clientWidth-n.offsetWidth;if(e.button!==0||r<=0||!t.classList.contains(Te("hover")))return;let i=lt.store.entryPosition,s=i,u=!1,l=new AbortController;n.setPointerCapture(e.pointerId),n.addEventListener("pointermove",m=>{!u&&Math.abs(m.clientX-e.clientX)<pd||(u=!0,o(),s=ve(i+(m.clientX-e.clientX)/r,0,Er),t.style.setProperty(wr,String(s)))},{signal:l.signal});let d=()=>{l.abort(),u&&(lt.store.entryPosition=s,t.style.removeProperty(wr))};n.addEventListener("pointerup",d,{signal:l.signal}),n.addEventListener("lostpointercapture",d,{signal:l.signal})}function hd(e){let t=!1,o=a("button",{class:Te("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),t||rn(),t=!1},pointerdown:r=>{t=!1,e!=="rail"&&gd(r,n,()=>{t=!0})}}},D("bloom"),e!=="rail"&&a("span",{class:Te("label"),text:"Bloom++"})),n=a("div",{class:`bloom-root ${Te("wrap")} ${Te(e)}`,attrs:{"data-bloom":"entry"}},o);return n}function bd(e){let t=a("div",{class:`bloom-root ${Te("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),rn()}}},D("bloom"),a("span",{text:"Bloom++"})),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function ia(){let{showSidebarEntry:e,showSidebarEntryOnHover:t}=lt.store,o=e||t?Fs():[];for(let[r,i]of Ge)r.isConnected&&o.some(s=>s.anchor===r)||(i.remove(),Ge.delete(r));for(let r of o){let i=Ge.get(r.anchor);if(i?.isConnected||!te(r.anchor))continue;let s=i??hd(r.kind);Ge.set(r.anchor,s),r.insert(s)}for(let r of Ge.values())r.classList.toggle(Te("hover"),!e);let n=tn();n&&!n.querySelector('[data-bloom="menu-entry"]')&&bd(n)}var sa=f({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:lt,styles:()=>`${oa}.${Te("hover")}{${wr}:${lt.store.entryPosition}}`,start(){ra=[C(ia),Hs(),le()],!na&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",rn),na=!0)},stop(){for(let e of ra)e();for(let e of Ge.values())e.remove();Ge.clear(),at()},onSettingsChange:ia});var aa=`/*
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
`;var B=E("bloom-nav-"),ln=80,yd=1200,vd=2,la=3e4,qd=200,Sd=.9,xd=.3,wd=12,Ed={user:"\u2753",assistant:"\u{1F916}"},Td=["wheel","touchmove","pointerdown"],cn=p({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),O=null,H=[],Fe=-1,Ye=-1,ct=null,sn="",Cr=0,ca=[],Yt=null,an=null,Ue,Gt,Mr="",Ut=[],Cd=e=>cn.store.showAssistant||e.role==="user",Md=e=>e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.messageIds[0]||e.role;function Ld(e){return{role:e.role,summary:zo(e),ids:e.messageIds,turn:e,streaming:e.streaming}}function pa(e,t){let o=e.entries.at(-1);if(o?.role==="assistant"&&t.role==="assistant"){e.entries[e.entries.length-1]={...t,ids:[...new Set([...o.ids,...t.ids])]};return}e.entries.push(t)}function kd(){let e=[];for(let t of Wo()){let o=Ld(t),n=Md(t),r=e.at(-1);r?.key===n?pa(r,o):e.push({key:n,entries:[o]})}return e}function Bd(){let e=[];for(let t of oe(b())?.chain??[]){let o={role:t.role,summary:Jo(t),ids:[t.id],turn:null,streaming:!1},n=e.at(-1);t.role==="assistant"&&n?pa(n,o):e.push({key:t.id,entries:[o]})}return e}var ua=e=>e.entries.flatMap(t=>t.ids);function Lr(e,t){let o=new Set(ua(e));return ua(t).some(n=>o.has(n))}var Qe=e=>h(e.entries.find(t=>t.role==="user")?.summary??""),Tr=(e,t)=>e.filter(o=>Qe(o)===t).length,kr=e=>({...e,turn:null,streaming:!1});function Id(e,t){let o=new Set(t.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return e.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return kr(r);let s=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return s&&s!==n.key?kr(r):r})}))}function Od(e,t){let o=t.entries.map((n,r)=>{let i=e.entries[r];if(!i)return n;let s=[...new Set([...n.ids,...i.ids])];return{...n,ids:s,summary:n.summary||i.summary}});for(let n of e.entries.slice(o.length))o.push(kr(n));return{key:e.key,entries:o}}function ga(){let e=It();if(!e)return!1;let t=e.clientHeight-e.scrollHeight;return e.scrollTop-t<=Math.abs(e.scrollTop)}function Rd(e,t){let o=Id(e,t);if(!t.length)return o;if(!o.length)return t;let n=t.findIndex(l=>o.some(d=>d.key===l.key));if(n<0)return ga()?t.concat(o):o.concat(t);let r=t[n]?.key,i=o.findIndex(l=>l.key===r),s=o.slice(0,i).concat(t.slice(0,n),o.slice(i)),u=s.findIndex(l=>l.key===r);for(let l=n;l<t.length;l++){let d=t[l];if(!d)continue;let m=s.findIndex(q=>q.key===d.key);if(m>=0){let q=s[m];q&&(s[m]=Od(q,d)),u=m}else s.splice(u+1,0,d),u++}return s}function Pd(e,t){let o=0,n=0,r=0;for(let i=1-e.length;i<t.length;i++){let s=0,u=0;for(let d=0;d<e.length;d++){let m=t[d+i],q=e[d];!m||!q||(Lr(q,m)?(s+=3,u++):Qe(q)&&Qe(q)===Qe(m)&&s++)}let l=ga()?i<r:i>r;(s>o||s===o&&u>n||s===o&&u===n&&l)&&(o=s,n=u,r=i)}return{score:o,offset:r}}function Dd(e,t){let o=e.entries.map((n,r)=>{let i=t.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of t.entries.slice(o.length))o.push({...n,turn:null});return{key:e.key,entries:o}}function Hd(e){return e.map(t=>({key:t.key,entries:t.entries.map(o=>({...o}))}))}function Nd(e,t){if(!t.length)return e;if(!e.length)return t;let{score:o,offset:n}=Pd(e,t),r=Hd(e);if(o>0)for(let u=0;u<r.length;u++){let l=t[u+n],d=r[u];if(!l||!d)continue;let m=Qe(d),q=!!m&&m===Qe(l)&&Tr(e,m)===1&&Tr(t,m)===1;(Lr(d,l)||q)&&(r[u]=Dd(d,l))}let i=[],s=[];for(let u=0;u<t.length;u++){let l=t[u];if(!l)continue;let d=Qe(l);!d||Tr(r,d)>0||r.some(m=>Lr(m,l))||(o>0&&u<n?i.push(l):s.push(l))}return i.concat(r,s)}function Gd(){let e=b()??"";return e!==Mr&&(Mr=e,Ut=[]),Ut=Nd(Rd(Ut,kd()),Bd()),Ut.flatMap(t=>t.entries).filter(Cd)}function Ud(e){for(let o of e)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!k().generating||e.some(o=>o.streaming))return;let t=e.at(-1);t&&(t.role==="assistant"||!cn.store.showAssistant?t.streaming=!0:e.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function ha(){let e=Gd();return Ud(e),e}function Fd(e){let t=e.getBoundingClientRect(),o=t.top+t.height*xd,n=-1;return H.forEach((r,i)=>{let s=r.turn?.el.getBoundingClientRect();s&&s.top<=o&&(n=i)}),n===-1?H.findIndex(r=>r.turn):n}function da(e){cn.store.jumpEffect==="border"&&(e.classList.add(B("flash")),setTimeout(()=>e.classList.remove(B("flash")),yd))}function un(e){let t=H[e],o=It();if(!t||!o)return;if(!t.turn&&!t.ids.length){Ye=e,Ft(),o.scrollTo({top:Ms(o)?0:o.scrollHeight});return}Ye=e,ct=e?null:{chat:b(),first:t.ids[0],until:Date.now()+la},Ft();let n=t.turn?.el;if(n?.isConnected){let d=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:d<o.clientHeight*vd?"smooth":"auto"}),da(n);return}let r=H.findIndex(d=>d.turn),i=r>=0&&e<r?-1:1,s=++Cr,u=Date.now()+la,l=()=>{let d=It();if(s!==Cr||Date.now()>u||!d)return;H=ha();let m=H.find(j=>j.ids.some(y=>t.ids.includes(y)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),da(m),Ye=H.findIndex(j=>j.turn?.el===m),Ft();return}let q=d.scrollTop;d.scrollBy({top:i*d.clientHeight*Sd,behavior:"instant"}),d.scrollTop===q?setTimeout(l,qd):requestAnimationFrame(l)};l()}function Yd(e,t){return a("button",{class:B("row"),attrs:{type:"button","data-index":String(t)},on:{click:()=>un(t)}},a("span",{text:Ed[e.role]}),a("span",{class:"bloom-truncate",text:qe(e.summary||"\u2026",ln)}))}function ma(e){if(!O)return;let t=e.getBoundingClientRect(),o=F()?.getBoundingClientRect().top,r=Math.min(t.bottom,o&&o>t.top?o:t.bottom)-t.top;O.style.right=`${document.documentElement.clientWidth-t.left-e.clientLeft-e.clientWidth+wd}px`,O.style.top=`${t.top}px`,O.style.height=r>1?`${r}px`:""}function Qd(){let e=It();if(H=ha(),!H.length||!e){O?.remove(),O=null,sn="";return}if(Yt!==e){Gt?.abort(),Gt=new AbortController,e.addEventListener("scroll",et(Ft),{passive:!0,signal:Gt.signal});for(let n of Td)e.addEventListener(n,ba,{passive:!0,signal:Gt.signal});Yt=e,Ue?.disconnect(),Ue=new ResizeObserver(()=>{e.isConnected&&ma(e)}),Ue.observe(e),an=null}let t=F();t&&t!==an&&Ue&&(Ue.observe(t),an=t),O??=a("div",{class:`bloom-root ${B("root")}`,attrs:{"data-bloom":"navigator"}},a("div",{class:B("rail")}),a("div",{class:B("toc")},a("div",{class:B("toc-head")}),a("div",{class:B("toc-list")}))),O.isConnected||document.body.append(O),ma(e);let o=JSON.stringify(H.map(n=>[n.role,n.ids]));o!==sn?(sn=o,Ye=-1,jd(),ct&&Date.now()<ct.until&&ct.chat===b()&&H[0]?.ids[0]!==ct.first&&un(0)):Kd(),Ft()}function Ft(){if(!O||!Yt)return;Fe=Ye>=0?Ye:Fd(Yt),O.querySelectorAll(`.${B("tick")}`).forEach((t,o)=>t.classList.toggle(B("tick-current"),o===Fe)),O.querySelectorAll(`.${B("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===Fe)));let e=O.querySelector(`.${B("toc-head")}`);e&&(e.textContent=`${Fe+1} / ${H.length}`)}function Kd(){O?.querySelectorAll(`.${B("tick")}`).forEach((e,t)=>{let o=H[t],n=qe(o.summary,ln);e.title!==n&&(e.title=n),e.classList.toggle(B("tick-streaming"),o.streaming)}),O?.querySelectorAll(`.${B("row")}`).forEach(e=>{let t=e.lastElementChild,o=qe(H[Number(e.dataset.index)].summary||"\u2026",ln);t&&t.textContent!==o&&(t.textContent=o)})}function jd(){O?.querySelector(`.${B("rail")}`)?.replaceChildren(...H.map((e,t)=>a("button",{class:Eo(B("tick"),B(`tick-${e.role}`),e.streaming&&B("tick-streaming"),t===Fe&&B("tick-current")),title:qe(e.summary,ln),attrs:{type:"button","aria-label":`Jump to message ${t+1}`},on:{click:()=>un(t)}}))),O?.querySelector(`.${B("toc-list")}`)?.replaceChildren(...H.map(Yd))}var fe=et(Qd);function ba(){Ye=-1,ct=null,Cr++}var Wd=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function fa(e){if(!O||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||Wd(document.activeElement)||document.querySelector("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:Fe-1,ArrowDown:Fe+1,Home:0,End:H.length-1}[e.key];if(o==null){ba();return}o<0||o>=H.length||(e.preventDefault(),e.stopPropagation(),un(o))}var Aa=f({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:cn,styles:aa,start(){ca=[C(e=>I(e)&&fe()),ae(fe),Y.on("conversation",fe),v.on("rise",fe),v.on("fall",fe)],addEventListener("keydown",fa,!0),addEventListener("resize",fe,{passive:!0}),fe()},stop(){for(let e of ca)e();Gt?.abort(),Ue?.disconnect(),Ue=void 0,Yt=null,an=null,removeEventListener("keydown",fa,!0),removeEventListener("resize",fe),O?.remove(),O=null,sn="",Ut=[],Mr=""},onSettingsChange:fe});var ya=`/*
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
`;var J=E("bloom-quotes-"),Gr="BloomBetterQuotes",Jd=40,xa=8,Vd=1800,Rr=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,va=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,Ke=p({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),Br,Ir,ut,Or=!1,Pr=0,dn=null,mn=null,pe=null;function Ur(){return location.pathname.match(/\/c\/(?!local-)([\w-]+)/)?.[1]??(new URLSearchParams(location.search).get("temporary-chat")==="true"?"temporary":"draft")}function pn(){try{let e=JSON.parse(sessionStorage.getItem(Gr)??"[]");return Array.isArray(e)?e.filter(t=>!!t&&typeof t=="object"&&typeof t.id=="string"&&typeof t.text=="string"&&!!t.text):[]}catch{return[]}}function Fr(e){try{sessionStorage.setItem(Gr,JSON.stringify(e.slice(-Jd)))}catch{}}function Qt(e){return pn().find(t=>t.id===e)?.text??""}function Zd(e,t){let o=pn().filter(n=>n.id!==e);o.push({id:e,text:t}),Fr(o)}function Dr(e=Ur()){Fr(pn().filter(t=>t.id!==e)),fn()}function Xd(e){let t=Qt("draft");if(!t||Qt(e))return;let o=pn().filter(n=>n.id!=="draft");o.push({id:e,text:t}),Fr(o)}function Hr(e){return`${e.getAttribute("aria-label")??""} ${e.getAttribute("title")??""}`}function $d(e){let t=Hr(e);return va.test(t)&&!/quote|引用/.test(t)?!1:/quote|引用/.test(t)&&Rr.test(t)?!0:Rr.test(t)&&!va.test(t)}function wa(e){let t=e.cloneNode(!0);for(let o of t.querySelectorAll("button, [role='button']"))o.remove();return h(t.textContent??"")}function _d(e){let t=F(),o=e.parentElement,n=0;for(;o&&o!==t&&n<5;){if(n++,o.matches(c.composerInput)||o.querySelector(c.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=wa(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function gn(){let e=F();if(!e)return null;for(let t of e.querySelectorAll("button, [role='button']")){if(t.closest("[data-bloom]")||!$d(t))continue;let o=_d(t),n=o?wa(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:t}}return null}function em(e){let t=e.closest(c.searchUnit)??e.closest(c.oldMessage);return t&&(nt(t)??t.getAttribute("data-message-author-role"))==="user"?t:null}function Yr(e){return h(e).slice(0,48)}function tm(e,t){let o=Yr(e);if(o.length<xa)return null;let n=null;for(let r of Ot()){if(t&&(r===t||t.contains(r)||r.contains(t)))continue;let i=h(r.textContent??"");if(!i.includes(o))continue;let s=o.length/Math.max(i.length,1);(!n||s>n.score)&&(n={el:r,score:s})}return n?.el??null}function om(e,t){let o=Yr(t),n=e;for(let r of e.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&h(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${J("hit")}`)?.classList.remove(J("hit")),n.classList.add(J("hit")),window.clearTimeout(Pr),Pr=window.setTimeout(()=>n.classList.remove(J("hit")),Vd)}function qa(e){let t=e.closest(c.timelineScroll)??document.scrollingElement;if(!(t instanceof HTMLElement)&&t!==document.scrollingElement)return;let o=e.getBoundingClientRect();if(o.height<1||!t)return;let n=t.getBoundingClientRect(),r=F()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,s=o.top+o.height/2-(n.top+i)/2;Math.abs(s)<8||t.scrollTo({top:t.scrollTop+s,behavior:"smooth"})}function Qr(){if(!pe||!dn?.isConnected)return;let e=dn.getBoundingClientRect();e.width<1||(pe.style.top=`${Math.max(8,e.top+8)}px`,pe.style.left=`${Math.max(8,e.right-pe.offsetWidth-8)}px`)}function nm(e,t,o){dn=e,mn=t,pe??=a("button",{class:`bloom-root ${J("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),pe.isConnected||document.body.append(pe),om(e,o),Qr()}function Sa(){pe?.remove(),pe=null,dn=null,mn=null,document.querySelector(`.${J("hit")}`)?.classList.remove(J("hit"))}function Ea(){return document.querySelector('[data-bloom="quote-chip"]')}function fn(){Ea()?.remove()}function rm(e){let o=F()?.getBoundingClientRect();!o||o.width<8||(e.style.width=`${Math.max(120,o.width-24)}px`,e.style.left=`${o.left+12}px`,e.style.top=`${Math.max(8,o.top-e.offsetHeight-8)}px`)}function im(e){let t=Ea();t||(t=a("div",{class:`bloom-root ${J("chip")}`,attrs:{"data-bloom":"quote-chip"}},a("span",{class:J("text")}),a("button",{class:J("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(t));let o=t.querySelector(`.${J("text")}`),n=h(e);o&&o.textContent!==n&&(o.textContent=n),t.dataset.text=e,rm(t)}function Nr(){if(!Or){Or=!0;try{let e=Ur(),t=gn();Ke.store.persistAcrossChats&&t&&Qt(e)!==t.text&&Zd(e,t.text);let o=Ke.store.persistAcrossChats?Qt(e):"";!o||t&&h(t.text)===h(o)?fn():im(o),Qr()}finally{Or=!1}}}function sm(e){let t=e.closest('[data-bloom="quote-chip"]');if(t instanceof HTMLElement&&!e.closest(`.${J("x")}`)){let i=t.dataset.text??t.querySelector(`.${J("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:t}:null}let o=e.closest("blockquote");if(o instanceof HTMLElement&&!e.closest("a, button")){let i=em(o),s=h(o.textContent??"");if(i&&s)return{text:s,skip:i,origin:o}}let n=F();if(!n||!n.contains(e)||we(e)||e.closest("button, [role='button']"))return null;let r=gn();return!r||!r.row.contains(e)?null:{text:r.text,skip:null,origin:r.row}}function am(e){let{target:t}=e;if(!(t instanceof Element))return;if(t.closest('[data-bloom="quote-back"]')){e.preventDefault(),e.stopPropagation(),mn?.isConnected&&qa(mn);return}if(t.closest(`.${J("x")}`)){e.preventDefault(),e.stopPropagation(),Dr();return}let o=gn();if(o&&(t===o.dismiss||o.dismiss.contains(t))){Dr();return}if(lm(t)&&Ta(),!Ke.store.jumpToPassage)return;let n=sm(t);if(!n)return;let r=tm(n.text,n.skip);r&&(e.preventDefault(),e.stopPropagation(),nm(r,n.origin,n.text),qa(r))}function lm(e){let t=e.closest("button, [role='button']");return!(t instanceof HTMLElement)||t.closest("[data-bloom]")||!F()?.contains(t)?!1:/send|submit|发送|提交/i.test(Hr(t))&&!Rr.test(Hr(t))}function cm(e){return!(e instanceof KeyboardEvent)||e.key!=="Enter"||e.shiftKey||e.isComposing?!1:we(e.target)}function Ta(){if(!Ke.store.persistAcrossChats)return;let e=Ur(),t=Qt(e);if(t){if(!gn()){let o=M(),n=Yr(t);n.length>=xa&&!h(o).includes(n)&&ee(`> ${t}

${o}`.trim())}Dr(e)}}function um(e){cm(e)&&Ta()}function dm(e){!e.prevId&&e.id&&Xd(e.id),Nr()}var Ca=f({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:Ke,styles:ya,onSettingsChange(e){e==="jumpToPassage"&&!Ke.store.jumpToPassage&&Sa(),e==="persistAcrossChats"&&!Ke.store.persistAcrossChats&&(sessionStorage.removeItem(Gr),fn()),Nr()},start(){ut=new AbortController,document.addEventListener("pointerdown",am,{capture:!0,signal:ut.signal}),document.addEventListener("keydown",um,{capture:!0,signal:ut.signal}),addEventListener("scroll",Qr,{capture:!0,passive:!0,signal:ut.signal}),Ir=ae(dm),Br=C(e=>I(e)&&Nr())},stop(){ut?.abort(),ut=void 0,Ir?.(),Ir=void 0,Br?.(),Br=void 0,window.clearTimeout(Pr),Sa(),fn()}});var Ma=`/*
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
`;var fm=E("bloom-cls"),pm="bloom-cls",gm=600*1e3,jr=Di("tab"),mt=new Map,jt=new Map,dt=null,La=[],hm=e=>e==="streaming"||e==="error";function bm(){let e=new Map,t=Date.now();for(let[o,n]of jt)t-n.at>gm?jt.delete(o):e.set(o,n.status);for(let[o,n]of mt)e.set(o,n);return e}function Am(e){return a("span",{class:`bloom-root ${fm("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&D("alert"))}function Kt(){let e=bm(),t=new Set;for(let[o,n]of e)for(let r of Ht(o)){if(!te(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let s=Am(n);t.add(s),r.append(s)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function hn(e,t){e&&(t?mt.set(e,t):mt.delete(e),dt?.postMessage({tab:jr,id:e,status:t}),Kt())}function ym({data:e}){!w(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===jr||(hm(e.status)?jt.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):jt.delete(e.id),Kt())}function Kr(){for(let e of mt.keys())dt?.postMessage({tab:jr,id:e,status:null})}var ka=f({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:Ma,start(){dt=typeof BroadcastChannel=="function"?new BroadcastChannel(pm):null,dt?.addEventListener("message",ym),addEventListener("pagehide",Kr),La=[v.on("rise",({conversationId:e})=>hn(e,"streaming")),v.on("fall",({conversationId:e,outcome:t})=>hn(e,t==="error"?"error":null)),v.on("context",({prevId:e,id:t,migrated:o})=>{o&&k().generating?hn(t,"streaming"):!o&&mt.get(e??"")==="streaming"&&hn(e,null)}),C(e=>I(e)&&Kt())],b()&&Kt()},stop(){for(let e of La)e();Kr(),dt?.close(),dt=null,removeEventListener("pagehide",Kr),mt.clear(),jt.clear(),Kt()}});var Ia=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],yn={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},vm={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},qm="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Wr=32,vn=64,zr="#FCFCFC",Jr="#111111",Sm=14,qn=51.5,xm=12.5,wm=9.75,Ba=52,Em=10.5,Tm=7.75,Cm={rotate:e=>e.arc(qn,qn,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function bn(e){let t=document.createElement("canvas");t.width=t.height=Wr;let o=t.getContext("2d");return o?(o.scale(Wr/vn,Wr/vn),e(o),t.toDataURL("image/png")):""}function An(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D(qm);o&&(e.strokeStyle=Jr,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function Sn(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function Mm(e,t){Sn(e,qn,xm,Jr),Sn(e,qn,wm,yn[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),Cm[t](e),e.stroke()}function Lm(e,t){e.beginPath(),e.roundRect(0,0,vn,vn,Sm),e.fillStyle=t,e.fill()}var km=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function Oa(e,t){switch(e){case"original":return km(vm[t]);case"hole":return bn(o=>An(o,yn[t],!0));case"bg":return bn(o=>{Lm(o,yn[t]),An(o,zr,!1)});case"dot":return bn(o=>{An(o,zr,!0),Sn(o,Ba,Em,Jr),Sn(o,Ba,Tm,yn[t])});case"badge":return bn(o=>{An(o,zr,!0),Mm(o,t)})}}var zt="bloom-chat-state-favicon",Jt="data-bloom-rel",Xr="data-bloom-media",Ra="bloom-parked-icon",Bm="/favicon.ico",Da=p({style:{type:"select",description:"How the tab icon shows the chat state.",options:Ia,default:"bg"}}),Ce=null,Ha="",xn=null,Na="",Pa=new Map,$r,Vr=[],Ga=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${Jt}]`)];function _r(){for(let e of Ga())e.id!==zt&&(e.hasAttribute(Jt)||(Na||=e.href,e.setAttribute(Jt,e.rel),e.setAttribute(Xr,e.getAttribute("media")??"")),e.rel!==Ra&&(e.rel=Ra),e.media!=="not all"&&(e.media="not all"))}function Im(){for(let e of Ga()){let t=e.getAttribute(Jt);if(t==null)continue;e.rel=t;let o=e.getAttribute(Xr);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(Jt),e.removeAttribute(Xr)}}function Ua(){let e=document.getElementById(zt);return e||(e=document.createElement("link"),e.id=zt,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function Om(e){if(e==="wait")return Na||Bm;let t=Da.store.style,o=`${t}:${e}`,n=Pa.get(o);return n||Pa.set(o,n=Oa(t,e)),n}function Zr(e){if(e)return"rotate";let t=M();return Ce&&t&&t!==Ha&&(Ce=null),Ce==="error"?"error":Ce==="done"?"done":t?"ready":"wait"}function Wt(e,t=!1){if(e===xn&&!t)return;xn=e;let o=Ua(),n=Om(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function Rm(){$r=new MutationObserver(()=>{_r(),document.head.lastElementChild?.id!==zt&&Ua()}),$r.observe(document.head,{childList:!0})}var Fa=f({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"HostReady",settings:Da,start(){_r(),Wt(Zr(k().generating),!0),Rm(),Vr=[v.on("rise",()=>{Ce=null,Wt("rotate")}),v.on("fall",({outcome:e})=>{Ce=e==="done"||e==="error"?e:null,Ha=M(),Wt(Zr(!1))}),v.on("context",({migrated:e})=>{e||(Ce=null)}),v.on("tick",({generating:e})=>{_r(),Wt(Zr(e))})]},stop(){for(let e of Vr)e();Vr=[],$r?.disconnect(),document.getElementById(zt)?.remove(),Im(),xn=null,Ce=null},onSettingsChange(){Wt(xn??"wait",!0)}});var Pm={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${c.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])']},Ya=p({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0}}),Qa=f({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads and notices.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:Ya,styles:()=>Xe(Object.entries(Pm).flatMap(([e,t])=>Ya.store[e]?t:[]))});var ft=`form:has(:is(${c.composerInput})), ${c.oldComposerForm}`,wn='[class*="ComposerLayoutBody"]',ei='[class*="ComposerLayoutRoot"]',Dm='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',Hm=`:is(${ft}) ${wn}, :is(${ft}):not(:has(${wn})) ${ei}, :is(${ft}):not(:has(${wn})):not(:has(${ei})) :is(${Dm})`,Nm='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',Gm='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',Um="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))",Ka=p({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function Fm(){let{opacity:e,blur:t}=Ka.store;if(e>=100)return"";let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${Um} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important;-webkit-backdrop-filter:blur(${t}px)!important`;return`:is(${Nm}), :is(${ft}){${o}}:is(${Gm}){display:none!important}${Hm}{${n}}:is(${ft}):has(${wn}) ${ei}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${ft}) :is(${c.composerInput}){background-color:transparent!important}`}var ja=f({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:Ka,styles:Fm});var Ym=1200,Qm=8e3,Km=150,jm=20,Wa=6,ni="continue where you left",Wm=/message delivery timed out|please try again/i,za=/waiting for the complete answer/i,Ja=p({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:ni,placeholder:ni}}),ti=[],Tn=0,Vt=!1,Zt=0,gt="",En="",ri=0,ht=!1,Xt=!1,Cn=!0,pt="",ii=0,Mn=!1,zm=()=>Ja.store.prompt.trim()||ni;function Va(){return(W(c.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function Za(){let e=Va();return!e||za.test(e)||!Wm.test(e)?"":e}function Jm(){let e=Va();return e&&za.test(e)?e:""}function Vm(){let e=ot()?.querySelectorAll(c.turn),t=e?.[e.length-1];return`${t?.getAttribute("data-turn-key")??""}:${t?.textContent?.length??0}`}function Xa(e,t,o){if(o===Tn){if(k().generating||M()!==e||t>=jm){ht=!1,k().generating||(gt="");return}Ho(),setTimeout(()=>Xa(e,t+1,o),Km)}}function Zm(e){let t=Tn;if(k().generating||M()&&M()!==e){ht=!1,gt="";return}ee(e),Mn=!0,Lt(()=>{t===Tn&&Xa(e,0,t)})}function $a(e){return e===gt||Zt>=Wa||k().generating||M()?!1:(gt=e,Zt+=1,ht=!0,Zm(zm()),!0)}function Xm(){if(Vt||ht||Xt)return;let e=Date.now(),t=Za();if(t){if(pt="",t!==En){En=t,ri=e;return}if(e-ri<Ym)return;$a(`${b()??""}:${t}`);return}if(En="",!Jm()){Cn=!0,pt="";return}if(!Cn||!k().generating||M())return;let n=`${b()??""}:${Vm()}`;if(n!==pt){pt=n,ii=e;return}if(e-ii<Qm||Zt>=Wa)return;let r=tt();r&&(Xt=!0,r.click())}function oi(){Tn+=1,Vt=!1,Zt=0,gt="",En="",ri=0,ht=!1,Xt=!1,Cn=!0,pt="",ii=0,Mn=!1}var _a=f({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:Ja,start(){oi(),ti=[v.on("rise",()=>{Vt=!1,gt="",ht=!1,Mn&&(Mn=!1,Cn=!1,pt="")}),v.on("fall",({outcome:e})=>{if(Xt){Xt=!1,e==="left"?Vt=!0:$a(`${b()??""}:stall`);return}(e==="stopped"||e==="left")&&(Vt=!0),e==="done"&&!Za()&&(Zt=0)}),v.on("context",({migrated:e})=>{e||oi()}),v.on("tick",Xm)]},stop(){for(let e of ti)e();ti=[],oi()}});var ge=E("bloom-csi-"),$m=256,_m=160,Ln=1,el=4,ef=.1,tf=.0015,of=250;function nf(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function rf(e){return new Promise((t,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function sf(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:ve(t.x,n,1-n),y:ve(t.y,r,1-r)}}function tl(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function af(e,t){let o=a("canvas");return o.width=o.height=$m,tl(o,e,t),o.toDataURL("image/png")}function ol(e){let t=null,o={x:R.store.cropX,y:R.store.cropY,zoom:R.store.cropZoom},n,r=a("canvas",{class:ge("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=_m*devicePixelRatio;let i=a("div",{class:`bloom-muted ${ge("status")}`}),s=a("div",{class:ge("zoom")}),u=a("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(y,U=!0){t&&(o=sf(t,y),tl(r,t,o),U&&(clearTimeout(n),n=setTimeout(()=>{t&&(R.store.cropX=o.x,R.store.cropY=o.y,R.store.cropZoom=o.zoom,R.store.avatarUrl=af(t,o))},of)))}function d(){s.replaceChildren(_o(o.zoom,Ln,el,ef,"\xD7",y=>l({...o,zoom:y})))}async function m(y,U){i.textContent="";try{t=await rf(y),U&&(R.store.avatarSource=y,o={x:.5,y:.5,zoom:Ln}),e.classList.add(ge("has-image")),d(),l(o,U)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let q=y=>{y?.type.startsWith("image/")&&nf(y).then(U=>m(U,!0))};u.addEventListener("change",()=>q(u.files?.[0])),r.addEventListener("wheel",y=>{t&&(y.preventDefault(),l({...o,zoom:ve(o.zoom*(1-y.deltaY*tf),Ln,el)}),d())},{passive:!1}),r.addEventListener("pointerdown",y=>{if(!t)return;r.setPointerCapture(y.pointerId);let U={...o},qt=r.getBoundingClientRect(),qo=So=>{if(!t)return;let X=Math.max(qt.width/t.naturalWidth,qt.height/t.naturalHeight)*o.zoom;l({...o,x:U.x-(So.clientX-y.clientX)/(t.naturalWidth*X),y:U.y-(So.clientY-y.clientY)/(t.naturalHeight*X)})};r.addEventListener("pointermove",qo),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",qo),{once:!0})});let j=a("div",{class:ge("cropper"),attrs:{tabindex:"0"},on:{paste:y=>q([...y.clipboardData?.files??[]].find(U=>U.type.startsWith("image/"))),dragover:y=>y.preventDefault(),drop:y=>{y.preventDefault(),q(y.dataTransfer?.files[0])}}},a("div",{class:ge("stage")},r),a("div",{class:ge("controls")},Dt("",y=>y.trim()&&void m(y.trim(),!0),"https://\u2026 or data:image/\u2026","url"),a("div",{class:ge("buttons")},N("Choose file",()=>u.click()),N("Reset crop",()=>{l({x:.5,y:.5,zoom:Ln}),d()}),N("Clear",()=>{t=null,e.classList.remove(ge("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),s.replaceChildren(),R.store.avatarUrl="",R.store.avatarSource=""},"danger")),s,i,u));return e.append(j),R.store.avatarSource&&m(R.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var nl=`/*
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
`;var $t="data-bloom-csi-avatar",si="data-bloom-csi-sized",al="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",cf=32,R=p({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>ol(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),rl=[];function ll(e){e.removeAttribute($t),e.removeAttribute(si)}function il(e){return(R.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function sl(e=[]){if(!I(e))return;let t=R.store.displayName.trim()||null,o=!!R.store.avatarUrl,n=new Set(t?il("name"):[]);for(let i of document.querySelectorAll(al))n.has(i)||Pe(i,null);for(let i of n)Pe(i,t);let r=new Set(o?il("avatar"):[]);for(let i of document.querySelectorAll(`[${$t}]`))r.has(i)||ll(i);for(let i of r)i.hasAttribute($t)||i.setAttribute($t,""),i.toggleAttribute(si,!i.closest('[role="menu"]'))}function uf(){let e=R.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${R.store.avatarSize}px}:is(${c.rail}, ${c.oldRail}) [${si}]{--bloom-csi-size:${cf}px}`:""}var cl=f({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:R,styles:()=>`${uf()}
${nl}`,start(){rl=[le(),C(sl)]},stop(){for(let e of rl)e();for(let e of document.querySelectorAll(`[${$t}]`))ll(e);for(let e of document.querySelectorAll(al))Pe(e,null)},onSettingsChange(){sl()}});var bt=E("bloom-greeting-"),ul=30,dl=100;function ml(e){let t=-1,o=a("textarea",{class:`bloom-input ${bt("input")}`,attrs:{maxlength:String(dl),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=N("Add",i),r=a("div",{class:bt("list")});function i(){let l=o.value.trim().slice(0,dl);if(!l)return;let d=[...L.store.greetings];t>=0?d[t]=l:d.length<ul&&d.push(l),L.store.greetings=d,t=-1,o.value="",s()}function s(){let{greetings:l}=L.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&l.length>=ul,r.replaceChildren(...l.length?l.map((d,m)=>a("div",{class:bt("row",m===t?"row-editing":"row-idle")},a("div",{class:bt("text"),text:d}),z("edit","Edit",()=>{t=m,o.value=d,o.focus(),s()}),z("trash","Delete",()=>{L.store.greetings=l.filter((q,j)=>j!==m),t===m&&(t=-1),s()}))):[a("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),e.append(a("div",{class:bt("editor")},r,a("div",{class:bt("form")},o,n))),s();let u=_e((l,d)=>l==="GreetingCustomizer"&&d==="greetings"&&s());return()=>{u(),e.replaceChildren()}}var fl=`/*
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
`;var In="data-bloom-greeting",mf=1e3,ff=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],L=p({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>ml(e)},greetings:{type:"custom",default:ff},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),kn,pl=[],ai,eo=()=>Ko()&&!se(),pf=e=>e.replaceAll(/\s*\n\s*/g," ").trim(),hl=()=>L.store.greetings.filter(e=>typeof e=="string"&&e.trim());function to(){let e=hl();if(e.length)if(L.store.order==="random"&&e.length>1){let t=L.store.lastRandom;for(;t===L.store.lastRandom;)t=Math.floor(Math.random()*e.length);L.store.lastRandom=t,L.store.index=t}else L.store.index=(L.store.index+1)%e.length}function gf(){return eo()?W(c.homeHeading):null}function Bn(){for(let e of document.querySelectorAll(`[${In}]`))e.removeAttribute(In),Pe(e,null)}function On(){for(let e of document.querySelectorAll("[data-bloom-placeholder]"))e.removeAttribute("data-bloom-placeholder")}function gl(e){let t=xe(),o=pf(e);if(!t||!o||M(t)){On();return}t.getAttribute("data-bloom-placeholder")!==o&&t.setAttribute("data-bloom-placeholder",o)}function _t(){let e=hl(),t=qs(),o=eo();if(!e.length||!t&&!o){Bn(),On();return}if(t){Bn(),gl(e[0]??"");return}let n=gf();n?((L.store.index<0||L.store.index>=e.length)&&to(),n.setAttribute(In,""),Pe(n,e[Math.max(0,L.store.index)%e.length]??"")):Bn(),L.store.heroOnlyOutsideProject?On():gl(e[Math.max(0,L.store.index)%e.length]??"")}function li(){clearInterval(kn),kn=void 0,L.store.mode==="interval"&&eo()&&(kn=setInterval(()=>{to(),_t()},L.store.intervalSec*mf))}function hf(e){L.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${In}]`)||getSelection()?.toString()||(to(),_t())}function bf(){eo()&&L.store.mode==="refresh"&&to(),li(),_t()}var bl=f({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:L,styles:fl,start(){ai=new AbortController,document.addEventListener("click",hf,{signal:ai.signal}),eo()&&L.store.mode==="refresh"&&to(),li(),pl=[C(e=>I(e)&&_t()),ae(bf)]},stop(){ai?.abort();for(let e of pl)e();clearInterval(kn),Bn(),On()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&li(),_t()}});var oo=E("bloom-history-"),ci=10,Af=3e3;function Al(e){let t="",o=0,n=new Set,r=a("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),i=a("div",{class:oo("list")}),s=a("div",{class:oo("pager")}),u,l=N("Clear all",()=>{if(!u){l.textContent="Click again to clear",u=setTimeout(()=>{u=void 0,l.textContent="Clear all"},Af);return}clearTimeout(u),u=void 0,l.textContent="Clear all",no([])},"danger");function d(){let q=[...je.store.entries].toReversed(),j=t.trim().toLowerCase(),y=j?q.filter(X=>X.toLowerCase().includes(j)):q,U=Math.max(1,Math.ceil(y.length/ci));o=Math.min(o,U-1);let qt=y.slice(o*ci,(o+1)*ci).map(X=>a("div",{class:oo("row")},a("button",{class:oo("text",n.has(X)?"text-open":"text-closed"),text:X,title:n.has(X)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{n.delete(X)||n.add(X),d()}}}),z("copy","Copy",()=>void Hi(X)),z("trash","Delete",()=>no(je.store.entries.filter(kc=>kc!==X)))));i.replaceChildren(...qt.length?qt:[a("div",{class:"bloom-muted",text:j?"No matching prompts.":"No saved prompts yet."})]),s.replaceChildren(a("span",{class:"bloom-muted",text:`${y.length} ${j?"matching":"saved"} \xB7 page ${o+1} of ${U}`}),N("Previous",()=>{o--,d()}),N("Next",()=>{o++,d()}),l);let[qo,So]=s.querySelectorAll("button");qo.disabled=o===0,So.disabled=o>=U-1,l.disabled=!q.length}r.addEventListener("input",()=>{t=r.value,o=0,d()}),e.append(a("div",{class:oo("manager")},r,i,s)),d();let m=_e((q,j)=>q==="InputHistory"&&j==="entries"&&d());return()=>{m(),clearTimeout(u),e.replaceChildren()}}var yl=`/*
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
`;var vf=E("bloom-history-"),qf=2e3,je=p({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>Al(e)},entries:{type:"custom",default:[]}}),Z=null,ui={text:"",at:0},We=null,di,Rn=()=>je.store.entries.filter(e=>typeof e=="string");function no(e){je.store.entries=e.slice(-je.store.maxEntries)}function mi(e){let t=e.trim();if(!t)return;let o=Date.now();t===ui.text&&o-ui.at<qf||(ui={text:t,at:o},no([...Rn().filter(n=>n!==t),t]))}function Sf(e,t){let o=xe();if(!o)return;We??=a("div",{class:`bloom-root ${vf("hud")}`,attrs:{"data-bloom":"history-hud","aria-live":"polite"}}),We.textContent=`${e+1} / ${t}`;let n=(o.closest("form")??o).getBoundingClientRect();We.style.left=`${n.left+n.width/2}px`,We.style.top=`${n.top}px`,We.isConnected||document.body.append(We)}function ro(){Z=null,We?.remove()}function xf(e){let t=Rn();if(!Z)return;let o=t[e];Z.index=e,Z.shown=o,ee(o),Sf(t.length-1-e,t.length)}function wf(e){let t=Rn();if(!t.length)return!1;if(!Z){if(e===1)return!1;Z={index:t.length,draft:M(),shown:""}}let o=Z.index+e;return o<0?!0:o>=t.length?(ee(Z.draft),ro(),!0):(xf(o),!0)}function Ef(e){if(e.isComposing||!we(e.target))return;let t=e.target;if(e.key==="Enter"&&!e.shiftKey){mi(M(t)),ro();return}if(e.key==="Escape"&&Z){ee(Z.draft),ro(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey)return;let o=ls(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!Z||wf(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function Tf(e){Z&&we(e.target)&&M(e.target)!==Z.shown.trim()&&ro()}function Cf(e){e.target instanceof Element&&e.target.closest(c.sendButton)&&mi(M())}var vl=f({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:je,styles:yl,start(){di=new AbortController;let{signal:e}=di;document.addEventListener("keydown",Ef,{capture:!0,signal:e}),document.addEventListener("input",Tf,{capture:!0,signal:e}),document.addEventListener("click",Cf,{capture:!0,signal:e}),document.addEventListener("submit",()=>mi(M()),{capture:!0,signal:e})},stop(){di?.abort(),ro()},onSettingsChange(e){e==="maxEntries"&&no(Rn())}});var ql=`/*
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
`;var Lf=1500,kf=5e3,Bf=2e3,At=p({showDate:{type:"boolean",description:"Show the date for messages not sent today.",default:!0},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),Dn=new Map,wl=0,Hn,Sl=[];function El(e,t){Dn.get(e)!==t&&(Dn.set(e,t),clearTimeout(Hn),Hn=setTimeout(Tl,Bf))}function Tl(){let e={...At.store.stamps,...Object.fromEntries(Dn)};At.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,Lf))}function If(e){let t=oe(b())?.times;for(let o=e.length-1;o>=0;o--){let n=Dn.get(e[o])??t?.get(e[o])??At.store.stamps[e[o]];if(n)return n}return null}var Of=()=>k().generating||Date.now()-wl<kf;function Rf(e){let t=new Date(e),o=new Date,n={hour:"2-digit",minute:"2-digit"};if(!At.store.showDate||t.toDateString()===o.toDateString())return t.toLocaleTimeString(void 0,n);let r=t.getFullYear()===o.getFullYear()?{}:{year:"numeric"};return t.toLocaleString(void 0,{...r,month:"short",day:"numeric",...n})}function xl(e){let t=nt(e)??e.getAttribute("data-message-author-role")??e.closest(c.turn)?.getAttribute("data-turn")??e.querySelector(c.authorRole)?.getAttribute("data-message-author-role");if(dr(t))return t;let o=Bt(e).at(-1);return oe(b())?.chain.find(n=>n.id===o)?.role??null}function Pf(e){let t=Bt(e);if(!t.length||!te(e)||e.querySelector("time:not([data-bloom])"))return;let o=If(t);!o&&Of()&&(o=Date.now(),El(t.at(-1),o));let n=e.querySelector(':scope > time[data-bloom="timestamp"]');if(!o||At.store.hideOwnMessages&&xl(e)==="user"){n?.remove();return}let r=Rf(o);if(n?.textContent===r)return;let i=a("time",{class:`bloom-timestamp bloom-timestamp-${xl(e)??"assistant"}`,text:r,title:new Date(o).toLocaleString(),attrs:{"data-bloom":"timestamp",datetime:new Date(o).toISOString()}});n?n.replaceWith(i):e.prepend(i)}var Pn=et(()=>{for(let e of Ot())Pf(e)}),Cl=f({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:At,styles:ql,start(){Sl=[C(e=>I(e)&&Pn()),Y.on("conversation",Pn),Y.on("message-time",({messageId:e,time:t})=>{El(e,t),Pn()}),v.on("fall",()=>{wl=Date.now()})]},stop(){for(let e of Sl)e();Hn&&(clearTimeout(Hn),Tl());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();Pn()}}});var Df=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])'],Hf=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],Ml=p({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),Ll=f({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:Ml,styles:()=>Xe([...Df,...Ml.store.hideDictationSettings?Hf:[]])});var ze="data-bloom-share",Nf=/^\/g\/g-p-/,Gf=/^(?:share|分享)$/i,Uf=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],Ff=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${ze}="project"]`],fi=p({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),Nn,pi=!1;function Yf(e){if(!I(e))return;let t=Nf.test(location.pathname)&&!b();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${ze}]`))!t||!Gf.test(h(o.textContent??""))?o.removeAttribute(ze):o.hasAttribute(ze)||o.setAttribute(ze,"project")}var kl=f({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:fi,styles:()=>Xe([...fi.store.hideShareChat?Uf:[],...fi.store.hideShareProject?Ff:[]]),start(){pi=!0,kt().then(()=>{pi&&!Nn&&(Nn=C(Yf))})},stop(){pi=!1,Nn?.(),Nn=void 0;for(let e of document.querySelectorAll(`[${ze}]`))e.removeAttribute(ze)}});var Bl='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',Qf='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',Kf="[data-bloom-profile-plan]",Il="visibility:hidden!important;user-select:none!important",Rl=p({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function jf(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=Rl.store,r=[];return e&&r.push(n?`:is(${Bl}){display:none!important}`:`:is(${Bl}){${Il}}`),t&&r.push(`:is(${Qf}){${Il}}`),e&&o&&r.push(`${Kf}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var Ol,Pl=f({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Rl,styles:jf,start(){Ol=le()},stop(){Ol?.()}});var Wf="model-switcher-dropdown-button",Dl=e=>e.startsWith("model-switcher-")&&e!==Wf?e.slice(15):"",io=(e,t)=>e.id===t.id||!!e.label&&e.label===t.label;function Hl(){let e=F();return(e&&W(c.modelTrigger,e))??W(c.modelTrigger)}function ce(){let e=Hl();if(!e)return null;let t=h(e.innerText),o=Dl(e.getAttribute("data-testid")??"")||t;return o?{id:o,label:t||o}:null}function zf(e){return[...document.querySelectorAll(c.modelItem)].find(t=>{let o=Dl(t.getAttribute("data-testid")??""),n=h(t.textContent??"");return o===e.id||n===e.label||n===e.id})??null}function Gn(e){let t=ce();if(t&&io(t,e))return!0;let o=zf(e);if(o){o.click();let r=ce();return!!r&&io(r,e)}let n=Hl();return n?.getAttribute("aria-expanded")!=="true"&&n?.click(),!1}var Nl=`/*
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
`;var P=E("bloom-queue-"),Vf=6,Zf=8,V=null,so="",yt=!1,vt=!1;function gi(e,t,o){let n=z(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute(me),n.addEventListener("mouseenter",()=>Gl(t)),n.addEventListener("mouseleave",()=>Gl("")),n}function Gl(e){let t=V?.querySelector(`.${P("tip")}`);t&&(t.textContent=e)}function Xf(e,t,o,n){vt=!0;let r=a("textarea",{class:`bloom-input ${P("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=new AbortController,s=u=>{i.abort(),vt=!1,so="",u?n.edit(t,r.value):r.replaceWith(a("div",{class:P("text"),text:o}))};addEventListener("keydown",u=>{if(!(u.target!==r||u.isComposing)){if(u.key==="Enter"&&!u.shiftKey)s(!0);else if(u.key==="Escape")s(!1);else return;u.preventDefault(),u.stopImmediatePropagation()}},{capture:!0,signal:i.signal}),r.addEventListener("keydown",u=>u.stopPropagation(),{signal:i.signal}),r.addEventListener("blur",()=>s(!0),{signal:i.signal}),e.querySelector(`.${P("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function $f(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,s=l=>{!i&&Math.abs(l.clientY-n.clientY)<Vf||(i||(i=vt=!0,e.classList.add(P("dragging"))),e.style.transform=`translateY(${l.clientY-n.clientY}px)`)},u=l=>{if(removeEventListener("pointermove",s),!i)return;vt=!1,so="";let m=[...r.children].filter(q=>q!==e).filter(q=>q.getBoundingClientRect().top+q.getBoundingClientRect().height/2<l.clientY).length;o.move(t,m)};addEventListener("pointermove",s),addEventListener("pointerup",u,{once:!0})})}function _f(e,t,o,n){let r=a("li",{class:P("row")},a("div",{class:P("text"),text:e.text}),n&&e.label?a("span",{class:P("model"),title:e.label,text:e.label}):null,a("div",{class:P("actions")},gi("trash","Remove from queue",()=>o.remove(t)),gi("edit","Edit",()=>Xf(r,t,e.text,o)),gi("send","Send now",()=>o.sendNow(t))));return $f(r,t,o),r}function ep(e){if(!V)return;let t=e.getBoundingClientRect();V.style.left=`${t.left}px`,V.style.width=`${t.width}px`,V.style.bottom=`${innerHeight-t.top+Zf}px`}function hi(){V?.remove(),V=null,so="",vt=!1}function Me(e,t,o=!0){let n=F();if(!e.length||!Mt(n)){hi();return}V||(V=a("div",{class:`bloom-root ${P("tray")}`,attrs:{"data-bloom":"queue"}},a("div",{class:P("header")},a("button",{class:P("toggle"),attrs:{type:"button","aria-expanded":String(!yt)},on:{click:s=>{yt=!yt,V?.classList.toggle(P("collapsed"),yt),s.currentTarget.setAttribute("aria-expanded",String(!yt))}}},a("span",{class:P("count")}),D("chevron")),a("span",{class:P("tip")})),a("ol",{class:P("list")})),V.classList.toggle(P("collapsed"),yt),document.body.append(V)),ep(n);let r=JSON.stringify([o,...e.map(s=>[s.text,o?s.label:""])]);if(vt||r===so)return;so=r;let i=V.querySelector(`.${P("count")}`);i&&(i.textContent=xo(e.length,"Queued message")),V.querySelector(`.${P("list")}`)?.replaceChildren(...e.map((s,u)=>_f(s,u,t,o)))}var Qn=new x("PromptQueue"),tp=8,co=150,Fn=20,ne="BloomPromptQueue",Ai="BloomPromptQueueClaim",Ul="BloomPromptQueueTab",op=4e3,G=p({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1},showQueueMode:{type:"boolean",description:"Show the model that was selected when each message was queued.",default:!0},stickyOnNavigate:{type:"boolean",description:"Keep the selected model when switching chats.",default:!0},persistAcrossRefresh:{type:"boolean",description:"Restore unsent queued messages in this browser after a refresh. Other tabs show the same queue; only one of them sends it.",default:!0}}),re=new Map,lo=!1,Ve=null,ao,Fl=[],he=null,be=!1,bi,Yn="draft",uo=()=>b()??Yn,K=()=>re.get(uo())??[],yi=e=>({id:e.model||e.label,label:e.label||e.model});function np(e){return typeof e=="string"?e.trim()?{text:e,model:"",label:""}:null:!w(e)||typeof e.text!="string"||!e.text.trim()?null:{text:e.text,model:typeof e.model=="string"?e.model:"",label:typeof e.label=="string"?e.label:""}}function vi(){let e=sessionStorage.getItem(Ul);if(e)return e;let t=globalThis.crypto?.randomUUID?.()??`${Date.now()}-${Math.random()}`;return sessionStorage.setItem(Ul,t),t}function Ql(){let e=Se(localStorage.getItem(Ai)??"");return!w(e)||typeof e.tab!="string"||typeof e.at!="number"||typeof e.key!="string"?null:{tab:e.tab,at:e.at,key:e.key}}function Kl(){let e={tab:vi(),at:Date.now(),key:uo()};try{localStorage.setItem(Ai,JSON.stringify(e))}catch(t){Qn.warn("Could not claim the queue",t)}}function rp(){let e=Ql();if(e?.tab===vi())try{localStorage.setItem(Ai,JSON.stringify({...e,at:Date.now()}))}catch(t){Qn.warn("Could not refresh the queue claim",t)}}function ip(){let e=Ql();return!e||e.tab===vi()||e.key!==uo()?!0:Date.now()-e.at<=op?!1:(Kl(),!0)}function sp(){return Object.fromEntries([...re].filter(([e])=>e!==Yn))}function Un(e){let t=typeof e=="string"?Se(e):e;if(!w(t))return!1;let o=!1;for(let[n,r]of Object.entries(t)){if(!Array.isArray(r))continue;let i=r.map(np).filter(s=>s!=null);i.length&&(re.set(n,i),o=!0)}return o}function ap(){if(!G.store.persistAcrossRefresh){sessionStorage.removeItem(ne),$n(ne);return}if(!Un(sessionStorage.getItem(ne))){if(Un(localStorage.getItem(ne))){mo();return}Co(ne).then(e=>{re.size||e.some(Un)&&(mo(),Me(K(),Je,G.store.showQueueMode))})}}function mo(){try{if(!G.store.persistAcrossRefresh){sessionStorage.removeItem(ne),$n(ne);return}let e=sp();sessionStorage.setItem(ne,JSON.stringify(e)),Mo(ne,e)}catch(e){Qn.warn("Could not save the queue",e)}}function lp(e){if(!(e.key!==ne||!G.store.persistAcrossRefresh||e.newValue==null)){re.clear(),Un(e.newValue);try{sessionStorage.setItem(ne,e.newValue)}catch(t){Qn.warn("Could not mirror the queue",t)}Me(K(),Je,G.store.showQueueMode)}}function Ze(e){e.length?re.set(uo(),e):re.delete(uo()),Kl(),mo(),Me(K(),Je,G.store.showQueueMode)}function cp(e){if(!e.model&&!e.label)return!0;let t=ce();return t?io(t,yi(e)):!0}function jl(e,t=0){t>=Fn||k().generating||M()!==e||(Ho(),setTimeout(()=>jl(e,t+1),co))}function up(e,t){let o=G.store.stickyOnNavigate&&he?he:e;if(!o||!t.model&&!t.label||io(o,yi(t))){be=!1;return}be=!0,setTimeout(()=>{Gn(o),be=!1},co)}function fo(e,t=0){if(k().generating||M()){t<Fn&&setTimeout(()=>fo(e,t+1),co);return}if(!cp(e)&&t<Fn){be=!0,Gn(yi(e)),setTimeout(()=>fo(e,t+1),co);return}let o=ce();ee(e.text),Lt(()=>jl(e.text)),up(o,e)}function Yl(){if(Ve!=null){let o=Ve;Ve=null,fo(o);return}if(!lo||k().generating||M())return;if(!ip()){lo=!1;return}let[e,...t]=K();e!=null&&(lo=!1,Ze(t),fo(e))}function Wl(e){let t=K(),o=t[e];if(o!=null){if(Ze(t.filter((n,r)=>r!==e)),!k().generating){fo(o);return}Ve=o,tt()?.click()}}var Je={remove:e=>Ze(K().filter((t,o)=>o!==e)),edit:(e,t)=>Ze(t.trim()?K().map((o,n)=>n===e?{...o,text:t}:o):K().filter((o,n)=>n!==e)),sendNow:Wl,move(e,t){let o=[...K()],[n]=o.splice(e,1);n&&(o.splice(t,0,n),Ze(o))}};function dp(e){let t=ce(),o={text:e,model:t?.id??"",label:t?.label??""},n=K();return G.store.replacePending&&n.length?(Ze([...n.slice(0,-1),o]),!0):n.length>=tp?!1:(Ze([...n,o]),!0)}function mp(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!we(e.target)||!k().generating)return;let t=M(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;let o=ce();ee(""),Ve={text:t,model:o?.id??"",label:o?.label??""},tt()?.click();return}if(!t){K().length&&Wl(0);return}dp(t)&&ee("")}function fp(){if(be||!G.store.stickyOnNavigate)return;let e=ce();e&&(he=e)}function pp(){if(!G.store.stickyOnNavigate||!he)return;be=!0;let e=0,t=()=>{if(!he||Gn(he)||e>=Fn){be=!1;return}e++,bi=setTimeout(t,co)};clearTimeout(bi),t()}function gp(e){let{target:t}=e;!(t instanceof Element)||be||t.closest(`${c.modelTrigger}, ${c.modelItem}`)&&setTimeout(fp,0)}var zl=f({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:G,styles:Nl,start(){ao=new AbortController,ap(),he=ce(),document.addEventListener("keydown",mp,{capture:!0,signal:ao.signal}),document.addEventListener("pointerup",gp,{signal:ao.signal}),Fl=[v.on("fall",({outcome:e})=>{lo=e==="done",e==="left"&&(Ve=null),Yl()}),v.on("context",({prevId:e,id:t,migrated:o})=>{let n=re.get(Yn);re.delete(Yn),o&&!e&&t&&n&&re.set(t,n),o||(lo=!1,pp()),mo(),Me(K(),Je,G.store.showQueueMode)}),v.on("tick",()=>{rp(),Yl(),Me(K(),Je,G.store.showQueueMode)})],addEventListener("storage",lp,{signal:ao.signal}),Me(K(),Je,G.store.showQueueMode)},stop(){ao?.abort(),clearTimeout(bi);for(let e of Fl)e();hi(),re.clear(),Ve=null,he=null,be=!1},onSettingsChange(e){e==="persistAcrossRefresh"&&mo(),e==="stickyOnNavigate"&&G.store.stickyOnNavigate&&(he=ce()),Me(K(),Je,G.store.showQueueMode)}});var hp=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function bp(){let e=h(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!hp.has(e.toLowerCase())?e:null}function po(e){return e?oe(e)?.title??Ws(e)??(e===b()?bp():null):null}var Jl=`/*
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
`;var Ae=E("bloom-recent-"),ye="home",yp=50,Vl=140,vp=new Set(["Backquote"]),qp=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),S=p({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),Le=null,ue=[],de=0,qi,Zl=[],Wn=()=>se()?null:b()??(Ko()?ye:null);function Xl(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function _l(e){let t=po(e);t&&S.store.titles[e]!==t&&(S.store.titles={...S.store.titles,[e]:t});let o=zs(location.href);o&&e===b()&&S.store.projects[e]!==o&&(S.store.projects={...S.store.projects,[e]:o})}function $l(e){if(!e)return;let t=[e,...S.store.visits.filter(n=>n!==e)].slice(0,yp),o=new Set(t);S.store.visits=t,Object.keys(S.store.previews).some(n=>!o.has(n))&&(S.store.previews=Xl(S.store.previews,o)),Object.keys(S.store.titles).some(n=>!o.has(n))&&(S.store.titles=Xl(S.store.titles,o)),e!==ye&&_l(e)}function Kn(e){if(!e||!S.store.visits.includes(e))return;let t={},o=oe(e)?.chain??[];for(let r of o)t[r.role]=qe(Jo(r),Vl);if(e===b())for(let r of Wo()){let i=zo(r);i&&(t[r.role]=qe(i,Vl))}let n=S.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(S.store.previews={...S.store.previews,[e]:t})}function Sp(){let e=Number(S.store.maxRecent);return S.store.visits.filter(t=>t!==ye||S.store.includeHome).slice(0,e)}function Si(e){if(go(),e===Wn())return;let t=e===ye?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"]'):Ht(e)[0];t?t.click():location.assign(e===ye?"/":`/c/${e}`)}function xp(e,t){let o=e===ye?"New chat":S.store.titles[e]??po(e)??"Untitled chat",n=e===ye?null:S.store.projects[e],r=e===ye?null:S.store.previews[e];return a("button",{class:Ae("item"),attrs:{type:"button",role:"option","aria-selected":String(t===de)},on:{click:()=>Si(e),mousemove:()=>t!==de&&jn(t)}},a("div",{class:Ae("head")},a("span",{class:`${Ae("title")} bloom-truncate`,text:o}),n&&a("span",{class:Ae("project"),text:n})),r?.user&&a("div",{class:`${Ae("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&a("div",{class:`${Ae("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function jn(e){de=(e+ue.length)%ue.length,Le?.querySelectorAll(`.${Ae("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===de)))}function wp(){Kn(b());let e=Wn();ue=Sp(),e&&(ue=[e,...ue.filter(t=>t!==e)].slice(0,Number(S.store.maxRecent))),ue.length&&(de=ue.length>1?1:0,Le=a("div",{class:`bloom-root ${Ae("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:t=>t.target===t.currentTarget&&go()}},a("div",{class:Ae("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...ue.map(xp))),document.body.append(Le))}function go(){Le?.remove(),Le=null}var Ep=e=>vp.has(e.code)||qp.has(e.key);function Tp(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&Ep(e)){e.preventDefault(),e.stopPropagation(),Le?jn(de+(e.shiftKey?-1:1)):wp();return}if(!Le)return;let o={Escape:go,Enter:()=>Si(ue[de]),ArrowDown:()=>jn(de+1),ArrowUp:()=>jn(de-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function Cp(e){Le&&e.key==="Control"&&Si(ue[de])}var ec=f({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:S,styles:Jl,start(){qi=new AbortController;let{signal:e}=qi;addEventListener("keydown",Tp,{capture:!0,signal:e}),addEventListener("keyup",Cp,{capture:!0,signal:e}),addEventListener("blur",go,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&Kn(b()),{signal:e}),Zl=[ae(({prevId:i})=>{Kn(i),$l(Wn())}),Y.on("conversation",({id:i})=>{S.store.visits.includes(i)&&_l(i),Kn(i)})];let{visits:t,titles:o,previews:n}=S.store,r=t.filter(i=>i!==ye&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(S.store.visits=t.filter(i=>!r.includes(i))),$l(Wn())},stop(){qi?.abort();for(let e of Zl)e();go()}});var xi="data:audio/mpeg;base64,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";var tc=new x("ResponseNotification"),Mp=.5,Lp=200,kp=300,ho=p({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:e=>(e.append(N("Preview",ic)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),oc=null,wi=new Map,nc,Ei;function Bp(e){return new Promise((t,o)=>GM_xmlhttpRequest({url:e,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=Lp&&n<kp?t(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var Ip=e=>Uint8Array.from(atob(e.slice(e.indexOf(",")+1)),t=>t.charCodeAt(0)).buffer;function Op(e,t){let o=wi.get(t);return o||(o=(t.startsWith("data:")?Promise.resolve(Ip(t)):Bp(t)).then(n=>e.decodeAudioData(n)),o.catch(()=>wi.delete(t)),wi.set(t,o)),o}async function rc(e){oc??=new AudioContext;let t=oc;t.state==="suspended"&&t.resume();let o=t.createBufferSource(),n=t.createGain();o.buffer=await Op(t,e),n.gain.value=Mp,o.connect(n).connect(t.destination),o.start()}function ic(){let e=ho.store.soundUrl.trim();rc(e||xi).catch(t=>{tc.warn("Sound failed",t),e&&rc(xi).catch(o=>tc.warn("Default chime failed",o))})}function Rp(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function Pp(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(Ei=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:Ei.signal}))}var sc=f({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:ho,start(){Pp(),nc=v.on("fall",({conversationId:e,outcome:t})=>{t==="done"&&(ho.store.onlyWhenHidden&&!document.hidden||(ho.store.sound&&ic(),ho.store.browserNotification&&Rp(po(e))))})},stop(){nc?.(),Ei?.abort()}});var Dp=`:is(${c.sidebarScroll}, :has(> ${c.sidebarScroll})) + :has(${c.menuButton})`,Hp=`${c.rail} > :has(${c.menuButton})`,Ci=`:is(${Dp}, ${Hp}, ${c.oldProfile}):not(:hover)`,Ti="[data-bloom-profile-avatar]",Np=`:is(${Ci}, ${Ci} :has(${Ti})) > :not(${Ti}, :has(${Ti}))`,lc=p({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function Gp(){let{opacity:e,fadeAvatar:t}=lc.store;return e>=100?"":`${t?Ci:Np}{opacity:${e/100}!important}`}var ac,cc=f({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:lc,styles:Gp,start(){ac=le()},stop(){ac?.()}});var uc=`/*
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

button.bloom-star-chats-star[aria-pressed="true"] {
    color: var(--bloom-accent);
}

button.bloom-star-chats-star[aria-pressed="true"] .bloom-icon {
    fill: currentcolor;
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
`;var bo=E("bloom-star-chats"),Fp=40,Ao=p({chats:{type:"custom",default:[]}}),Mi,Li=!1;function yo(){let e=Ao.store.chats;return Array.isArray(e)?e.filter(t=>w(t)&&typeof t.id=="string"&&typeof t.href=="string"&&typeof t.title=="string"&&!!vo(t.href)):[]}function vo(e){try{let t=new URL(e,location.origin);return t.origin!==location.origin||t.searchParams.get("temporary-chat")==="true"||!ie(t.href)?null:`${t.pathname}${t.search}`}catch{return null}}function Yp(){let e=[...document.querySelectorAll(c.sidebarScroll)].filter(o=>!o.closest("[inert]"));if(e.length)return e;let t=[...document.querySelectorAll(`${c.oldSidebar} nav`)];return t.length?t:[...document.querySelectorAll(c.oldSidebar)]}function zn(){let e=`${c.sidebarScroll} ${c.conversationLink}, ${c.oldSidebar} ${c.conversationLink}`;return[...document.querySelectorAll(e)].filter(t=>!t.closest("[data-bloom]")&&!t.closest("[inert]"))}function mc(e){let t=e.cloneNode(!0);for(let o of t.querySelectorAll("[data-bloom]"))o.remove();return h(t.textContent??"")}function Qp(e){let t=e.parentElement,o=e.closest(c.sidebarScroll)??e.closest(c.oldSidebar);return!t||t===o?e:[...t.querySelectorAll(c.conversationLink)].filter(r=>!r.closest("[data-bloom]")).length===1?t:e}function fc(e,t){return a("button",{class:bo("-star"),attrs:{type:"button","data-bloom":"chat-star","aria-pressed":String(t),"aria-label":t?"Unstar chat":"Star chat"},on:{click:n=>{n.preventDefault(),n.stopPropagation();let r=zn().find(i=>ie(i.href)===e);r?jp(r):Ao.store.chats=yo().filter(i=>i.id!==e)}}},D("star"))}function Kp(e,t){e.setAttribute("aria-pressed",String(t)),e.setAttribute("aria-label",t?"Unstar chat":"Star chat")}function jp(e){let t=ie(e.href),o=t?vo(e.href):null;if(!t||!o)return;let n=yo();Ao.store.chats=n.some(r=>r.id===t)?n.filter(r=>r.id!==t):[{id:t,href:o,title:mc(e)||"Untitled chat"},...n].slice(0,Fp)}function Wp(e,t){if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.target instanceof Element&&e.target.closest("[data-bloom='chat-star']"))return;let o=zn().find(n=>ie(n.href)===t);o&&(e.preventDefault(),o.click())}function zp(){let e=!1,t=yo().map(o=>{let n=zn().find(s=>ie(s.href)===o.id);if(!n)return o;let r=mc(n),i=vo(n.href);return!r||!i||r===o.title&&i===o.href?o:(e=!0,{...o,title:r,href:i})});e&&(Ao.store.chats=t)}function Jp(){let e=new Set(yo().map(t=>t.id));for(let t of zn()){let o=ie(t.href),n=o?vo(t.href):null,r=Qp(t),i=r.querySelector(':scope > [data-bloom="chat-star"]');if(!o||!n||!te(t)){i?.remove();continue}let s=e.has(o);i?Kp(i,s):r.append(fc(o,s))}}function Vp(e,t){let o=[...e.children].find(n=>n instanceof HTMLAnchorElement&&(n.getAttribute("href")==="/"||n.dataset.testid==="create-new-chat-button"));o?o.after(t):e.prepend(t)}function Zp(){let e=yo(),t=new Set,o=e.map(n=>`${n.id}	${n.title}	${n.href}`).join(`
`);for(let n of Yp()){if(!te(n))continue;let r=[...n.children].find(i=>i instanceof HTMLElement&&i.dataset.bloom==="starred");if(!e.length){r?.remove();continue}r||(r=a("div",{class:`bloom-root ${bo("")}`,attrs:{"data-bloom":"starred"}}),Vp(n,r)),t.add(r),r.dataset.sig!==o&&(r.dataset.sig=o,r.replaceChildren(a("div",{class:bo("-label"),text:"Starred"}),...e.map(i=>a("a",{class:bo("-link"),attrs:{href:vo(i.href)??i.href},on:{click:s=>Wp(s,i.id)}},a("span",{class:bo("-title"),text:i.title||"Untitled chat"}),fc(i.id,!0)))))}for(let n of document.querySelectorAll('[data-bloom="starred"]'))t.has(n)||n.remove()}function dc(){if(!Li){Li=!0;try{zp(),Zp(),Jp()}finally{Li=!1}}}function Xp(){for(let e of document.querySelectorAll('[data-bloom="chat-star"], [data-bloom="starred"]'))e.remove()}var pc=f({name:"StarChats",description:"Star a chat in the sidebar and keep it at the top. No three-chat limit.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:Ao,styles:uc,onSettingsChange(e){e==="chats"&&dc()},start(){Mi=C(e=>I(e)&&dc())},stop(){Mi?.(),Mi=void 0,Xp()}});var $p="filter:blur(6px)!important;transition:filter 0.2s ease",gc=`:is(${c.sidebars})`,_p={conversations:{selectors:[`${gc} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0},projects:{selectors:[`${gc} a:is([href*="/project"], [href*="/g/g-p-"])`,"[data-app-action-sidebar-project-row]",".bloom-recent-project"],hover:!0},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}},bc=p({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function eg(){return Object.entries(_p).filter(([e])=>bc.store[e]).map(([,{selectors:e,hover:t}])=>{let o=e.join(",");return`:is(${o}){${$p}}`+(t?`:is(${o}):hover, .bloom-recent-item:hover :is(${o}){filter:none!important}`:"")}).join(`
`)}var hc,Ac=f({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:bc,styles:eg,start(){hc=le()},stop(){hc?.()}});var yc=`/*
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
`;var og=E("bloom-temporary-"),Sc=p({openNewAsTemporary:{type:"boolean",description:"Open New chat as a temporary chat.",default:!1}}),ki,Jn,Bi=!1;function ng(e){return e?"/?temporary-chat=true":"/"}function vc(e){let t=ng(e);`${location.pathname}${location.search}`===t||e&&se()&&location.pathname==="/"||location.assign(t)}function rg(){let e=[...document.querySelectorAll(c.sidebarScroll)].filter(o=>!o.closest("[inert]")&&te(o));if(e.length)return e;let t=document.querySelector(`${c.oldSidebar} nav`)??document.querySelector(c.oldSidebar);return t&&te(t)?[t]:[]}function xc(e){if(e.closest("[data-bloom]"))return!1;try{let t=new URL(e.href,location.origin);return t.origin===location.origin&&t.pathname==="/"}catch{return!1}}function ig(e){return[...e.querySelectorAll("a[href]")].find(xc)??null}function sg(){let e=se();return a("button",{class:og("button"),attrs:{type:"button","data-bloom":"temporary-chat","aria-pressed":String(e),"aria-label":e?"Turn off temporary chat":"Temporary chat"},text:"Temporary"})}function ag(){let e=new Set;for(let t of rg()){let o=[...t.querySelectorAll('[data-bloom="temporary-chat"]')].find(r=>t.contains(r)),n=ig(t);if(!o)o=sg(),n?n.after(o):t.prepend(o);else{let r=se();o.setAttribute("aria-pressed",String(r)),o.setAttribute("aria-label",r?"Turn off temporary chat":"Temporary chat")}e.add(o)}for(let t of document.querySelectorAll('[data-bloom="temporary-chat"]'))e.has(t)||t.remove()}function qc(){if(!Bi){Bi=!0;try{ag()}finally{Bi=!1}}}function lg(e){let{target:t}=e;if(!(t instanceof Element))return;if(t.closest('[data-bloom="temporary-chat"]')){e.preventDefault(),e.stopPropagation(),vc(!se());return}if(!Sc.store.openNewAsTemporary||se())return;let o=t.closest("a[href]");!(o instanceof HTMLAnchorElement)||!xc(o)||o.closest(`${c.sidebarScroll}, ${c.rail}, ${c.oldSidebar}, nav`)&&(e.preventDefault(),e.stopPropagation(),vc(!0))}var wc=f({name:"TemporaryChat",description:"One click starts a temporary chat. Optionally make New chat temporary.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"ghost",enabledByDefault:!0,settings:Sc,styles:yc,onSettingsChange:qc,start(){Jn=new AbortController,document.addEventListener("pointerdown",lg,{capture:!0,signal:Jn.signal}),ki=C(e=>I(e)&&qc())},stop(){Jn?.abort(),Jn=void 0,ki?.(),ki=void 0;for(let e of document.querySelectorAll('[data-bloom="temporary-chat"]'))e.remove()}});var ke=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)'].join(","),Ii=p({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function cg(){let e=[`${ke}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${ke}>*{margin-block:0!important}`];return Ii.store.italic||e.push(`${ke}{font-style:inherit!important}`),Ii.store.quotes||(e.push(`${ke}{quotes:none!important}`),e.push(`${ke}::before,${ke}::after,${ke} p::before,${ke} p::after{content:none!important}`)),e.join(`
`)}var Ec=f({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:Ii,styles:cg});var ug=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],dg=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",mg='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',Tc=p({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function fg(){let e=`${Tc.store.width}rem`;return`:is(${dg}){${ug.map(t=>`${t}:${e}!important`).join(";")}}:is(${mg}){max-width:min(100%, ${e})!important}`}var Cc=f({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:Tc,styles:fg});var pg=[sa,Aa,Ca,ka,Fa,Qa,ja,_a,cl,bl,vl,Cl,Ll,kl,Pl,zl,ec,sc,cc,pc,Ac,wc,Ec,Cc],Oi=pg;var gg=new x("Bloom"),Mc="2.0.57";async function Ri(){bs();for(let e of Oi)e.updatedAt=Rs[e.name];Xi(Oi),await Wi(),wo("base",ns),Os(),Oo("Init"),Uo().then(()=>{Fi(),Oo("DOMContentLoaded")}),await ys(),Oo("HostReady"),gg.info(`Bloom++ ${Mc} ready`)}var Lc=new x("Boot");if(window===window.top){let e=$.Bloom;e&&Lc.warn("Replacing another Bloom++ instance",e.VERSION),Object.defineProperty($,"Bloom",{value:Pi,configurable:!0,writable:!0}),Ri().catch(t=>Lc.error("Startup failed",t))}})();
