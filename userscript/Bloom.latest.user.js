// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.55
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

/* Bloom++ v2.0.55. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Il=Object.defineProperty;var Ol=(e,t)=>{for(var o in t)Il(e,o,{get:t[o],enumerable:!0})};var S=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var pe=(e,t,o)=>Math.min(o,Math.max(t,e)),w=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_r=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,ge=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,x=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function so(e,t){return`${e} ${t}${e===1?"":"s"}`}async function ei(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function Se(e){try{return JSON.parse(e)}catch{return}}var Z=typeof unsafeWindow>"u"?window:unsafeWindow;var $r={};Ol($r,{VERSION:()=>Ll,init:()=>Xr,plugins:()=>Ee});var Rl=new S("Styles"),ut=new Map,ti=new Set,dt=new Map,Ln=!0;function oi(){let e=document.adoptedStyleSheets.filter(t=>!ti.has(t));document.adoptedStyleSheets=[...e,...ut.values()]}function ni(e){document.readyState==="loading"||e.parentNode===document.head||document.head.append(e)}function Pl(e,t){let o=dt.get(e);o||(o=document.createElement("style"),o.id=`bloom-style-${e}`,dt.set(e,o)),o.textContent!==t&&(o.textContent=t),ni(o)}function lo(e,t){if(Ln)try{let o=ut.get(e);o||(o=new Z.CSSStyleSheet,ut.set(e,o),ti.add(o)),o.replaceSync(t),oi();return}catch(o){Rl.warn("Constructed style sheets unavailable, using <style> after parsing",o),Ln=!1,ut.delete(e)}Pl(e,t)}function kn(e){ut.delete(e)&&Ln&&oi(),dt.get(e)?.remove(),dt.delete(e)}function ri(){for(let e of dt.values())ni(e)}var T=e=>(...t)=>t.map(o=>e+o).join(" "),co=(...e)=>e.filter(Boolean).join(" "),Ue=e=>e.length?`${e.map(t=>`${t}:not([data-bloom])`).join(",")}{display:none!important}`:"";function p(e){return e}var uo=new S("Storage"),Dl="bloompp",mo="kv",ii=null;function Hl(){return ii??=new Promise((e,t)=>{let o=indexedDB.open(Dl,1);o.onupgradeneeded=()=>{o.result.objectStoreNames.contains(mo)||o.result.createObjectStore(mo)},o.onsuccess=()=>e(o.result),o.onerror=()=>t(o.error)}),ii}function ai(e,t){return Hl().then(o=>new Promise((n,r)=>{let i=t(o.transaction(mo,e).objectStore(mo));i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)}))}async function Nl(e){if(typeof GM_getValue=="function")try{return await GM_getValue(e)}catch(t){uo.warn("GM read failed",t);return}}async function Gl(e){try{return await ai("readonly",t=>t.get(e))}catch(t){uo.warn("IndexedDB read failed",t);return}}function Ul(e){try{return localStorage.getItem(e)??void 0}catch{return}}async function si(e){return Promise.all([Nl(e),Gl(e),Ul(e)])}function li(e,t){typeof GM_addValueChangeListener=="function"&&GM_addValueChangeListener(e,(o,n,r,i)=>{i&&t(r)}),addEventListener("storage",o=>{o.key===e&&t(o.newValue)})}function ci(e,t){let o=JSON.stringify(t);if(typeof GM_setValue=="function")try{GM_setValue(e,t)}catch{GM_setValue(e,o)}try{localStorage.setItem(e,o)}catch(n){uo.warn("localStorage write failed",n)}ai("readwrite",n=>n.put(o,e)).catch(n=>uo.warn("IndexedDB write failed",n))}var Yl=new S("Settings"),In="BloomSettings",Fl=100,Ql=["GM","IndexedDB","localStorage"],Ye={plugins:{}},fo=new Set,On=new Set,mt;function di(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=Se(t);return!w(t)||!w(t.plugins)||!Object.keys(t.plugins).length?null:t}var Bn=e=>e==null||e===""||(Array.isArray(e)?!e.length:w(e)&&!Object.keys(e).length);function Kl(e){return Bn(e)?0:Array.isArray(e)?12+Math.min(e.length,40):w(e)?12+Math.min(Object.keys(e).length,40):3}function Wl(e){let t=0;for(let o of Object.values(e.plugins))if(w(o))for(let[n,r]of Object.entries(o))n!=="enabled"&&(t+=Kl(r));return t}var ui=e=>Object.values(e.plugins).filter(t=>w(t)&&t.enabled===!0).length;function jl(e){let t=e.map((i,a)=>i&&{candidate:i,index:a,score:Wl(i)}).filter(i=>i!=null).toSorted((i,a)=>a.score-i.score||(i.score?0:ui(a.candidate)-ui(i.candidate))||i.index-a.index);if(!t.length)return null;let[o,...n]=t,r=structuredClone(o.candidate);for(let{candidate:i}of n)for(let[a,c]of Object.entries(i.plugins)){if(!w(c))continue;let l=r.plugins[a]??={};for(let[d,m]of Object.entries(c))d==="enabled"?!("enabled"in l)&&m===!0&&(l.enabled=!0):Bn(l[d])&&!Bn(m)&&(l[d]=structuredClone(m));Object.keys(l).length||delete r.plugins[a]}return{bag:r,source:Ql[o.index]}}async function mi(){let e=await si(In),t=jl(e.map(di));t&&(Ye.plugins=t.bag.plugins,Yl.info("Loaded settings from",t.source))}var fi=(e,t)=>`${e}
${t}`;function pi(){mt=void 0,On.clear(),ci(In,Ye)}function zl(e){let t=di(e);if(!t)return;let o=[];for(let n of new Set([...Object.keys(Ye.plugins),...Object.keys(t.plugins)])){let r=Ye.plugins[n]??={},i=w(t.plugins[n])?t.plugins[n]:{};for(let a of new Set([...Object.keys(r),...Object.keys(i)]))On.has(fi(n,a))||JSON.stringify(r[a])===JSON.stringify(i[a])||(i[a]===void 0?delete r[a]:r[a]=i[a],o.push([n,a]))}for(let[n,r]of o)for(let i of fo)i(n,r)}function Jl(){mt&&(clearTimeout(mt),pi())}var xe=(e,t)=>Ye.plugins[e]?.[t];function we(e,t,o){let n=Ye.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,On.add(fi(e,t)),clearTimeout(mt),mt=setTimeout(pi,Fl);for(let r of fo)r(e,t)}function Fe(e){return fo.add(e),()=>void fo.delete(e)}function Rn(e){return e.type==="component"?void 0:e.default}function g(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>xe(t.pluginName,n)??(e[n]&&Rn(e[n])),set:(o,n,r)=>(we(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&xe(t.pluginName,o)!==void 0&&we(t.pluginName,o)}};return t}var gi=e=>{let t=()=>{let o=xe("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();we("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},po=gi("pinnedPlugins"),go=gi("starredPlugins");addEventListener("pagehide",Jl);li(In,zl);var ho=new S("PluginManager"),Ee=new Map,ft=new Set,hi=new Set,Pn=new Set;function bi(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),Ee.set(t.name,t)}var pt=e=>!!e.required||(xe(e.name,"enabled")??!!e.enabledByDefault);var Dn=e=>`plugin-${e.name}`;function Ai(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?lo(Dn(e),t):kn(Dn(e))}function yi(e){if(!ft.has(e.name))try{Ai(e),e.start?.(),ft.add(e.name)}catch(t){ho.error(`Failed to start ${e.name}`,t)}}function Vl(e){if(ft.delete(e.name)){kn(Dn(e));try{e.stop?.()}catch(t){ho.error(`Failed to stop ${e.name}`,t)}}}var vi=e=>e.startAt??"HostReady";function bo(e){hi.add(e);for(let t of Ee.values())vi(t)===e&&pt(t)&&yi(t);ho.info(`${e}: ${[...ft].join(", ")}`)}function qi(e,t){we(e.name,"enabled",t),t?hi.has(vi(e))&&yi(e):Vl(e);for(let o of Pn)o()}function Si(e){return Pn.add(e),()=>void Pn.delete(e)}Fe((e,t)=>{let o=Ee.get(e);if(!(!o||t==="enabled"||!ft.has(e)))try{Ai(o),o.onSettingsChange?.(t)}catch(n){ho.error(`Settings change failed for ${e}`,n)}});var xi=`/*
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
`;var Xl=new S("Dom");function s(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var wi=document.createElement("template");function Ei(e){return wi.innerHTML=e.trim(),wi.content.firstElementChild.cloneNode(!0)}var ht=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),Q=(e,t=document)=>[...t.querySelectorAll(e)].find(ht)??null,$l=16,_l="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function Ti(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([_l],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function bt(e){document.hidden?setTimeout(e,$l):requestAnimationFrame(e)}function Qe(e){let t=!1;return()=>{t||(t=!0,bt(()=>{t=!1;try{e()}catch(o){Xl.error("Scheduled task failed",o)}}))}}var Ao=new Set,yo=[],gt,ec=Qe(()=>{let e=yo;yo=[];for(let t of Ao)t(e)});function B(e){return Ao.add(e),gt||(gt=new MutationObserver(t=>{yo.push(...t),ec()}),gt.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{Ao.delete(e),!Ao.size&&(gt?.disconnect(),gt=void 0,yo=[])}}var tc=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),H=e=>!e.length||e.some(t=>!tc(t.target));function Te(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size");return}e.getAttribute("data-bloom-text")!==t&&(e.hasAttribute("data-bloom-text")||e.style.setProperty("--bloom-text-size",getComputedStyle(e).fontSize),e.setAttribute("data-bloom-text",t))}var oc=new S("Events");function vo(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){oc.error(`Listener for ${String(t)} failed`,r)}}}}var u={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",modelTrigger:'[data-testid="model-switcher-dropdown-button"], button[aria-label="Model selector" i]',modelItem:'[role="menu"] [data-testid^="model-switcher-"], [role="menuitem"][data-testid^="model-switcher-"]',homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]'};var Ci=/[​-‍﻿]/g,he=()=>Q(u.composerInput),At=e=>e instanceof HTMLElement&&e.matches(u.composerInput),Ce=(e=he())=>e?.closest("form")??document.querySelector(u.oldComposerForm);function C(e=he()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(Ci,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(Ci,"").trim()}var nc=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function _(e,t=he()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return nc?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function Mi(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:a,value:c}=e;return{first:!c.slice(0,i).includes(`
`),last:!c.slice(a).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var Li=e=>{let t=Ce();return(t&&Q(e,t))??Q(e)},Ke=()=>Li(u.stopButton),rc=()=>{let e=Li(u.sendButton);return e&&!e.matches(u.stopButton)?e:null};function qo(){let e=rc();if(e){e.disabled||e.click();return}he()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var ki=()=>ht(Ke());var Oi=new S("Network"),ic=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,ac=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,xo=1e3,sc=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),U=vo(),Hn=new Map,Bi=new Map,lc=1,$=e=>e?Hn.get(e)??null:null;function So(e){let t=Hn.get(e);return t||Hn.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var Ri=e=>e==="user"||e==="assistant";function Pi(e){let t=e.author?.role;if(!e.id||!Ri(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(l=>typeof l=="string").join(`
`).trim(),i=n.filter(l=>w(l)&&l.content_type==="image_asset_pointer").length,a=e.metadata?.attachments,c=Array.isArray(a)&&a.length>0;return!r&&!i&&!c?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*xo:null,text:r,hasFiles:c,imageCount:i}}var Di=e=>e.filter((t,o)=>t.role==="user"||e[o+1]?.role!=="assistant"),Nn=e=>e.map(t=>t.createTime).filter(t=>t!=null);function cc(e,t){let o=Nn(e),n=Nn(t);return!o.length||!n.length?!1:Math.max(...o)<Math.min(...n)}function uc(e){let t=Nn(e);if(t.length<2)return e;let[o]=t,n=o-e.length;return e.map((i,a)=>(i.createTime!=null&&(n=i.createTime),{message:i,index:a,time:i.createTime??n})).toSorted((i,a)=>i.time-a.time||i.index-a.index).map(i=>i.message)}function dc(e,t){let o=t.filter(w).map(c=>w(c.message)?c.message:c);for(let c of o)c.id&&c.create_time&&e.times.set(c.id,c.create_time*xo);let n=o.map(Pi).filter(c=>c!=null),r=new Set(n.map(c=>c.id)),i=e.chain.filter(c=>!r.has(c.id)),a=cc(n,i)?[...n,...i]:[...i,...n];return e.chain=Di(uc(a)),e}function mc(e,t){if(!w(t)||!(w(t.mapping)||Array.isArray(t.messages)))return null;let o=So(e);if(typeof t.title=="string"&&t.title&&(o.title=t.title),Array.isArray(t.messages))return dc(o,t.messages);let n=t.mapping;for(let c of Object.values(n)){let l=c.message?.create_time;c.message?.id&&l&&o.times.set(c.message.id,l*xo)}let r=[],i=new Set,a=typeof t.current_node=="string"?t.current_node:null;for(;a&&!i.has(a)&&n[a];){i.add(a);let c=n[a].message,l=c?Pi(c):null;l&&r.push(l),a=n[a].parent??null}return r.length&&(o.chain=Di(r.toReversed())),o}function fc(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}function pc(e){if(typeof e?.body!="string")return null;let t=Se(e.body);return w(t)&&typeof t.conversation_id=="string"?t.conversation_id:null}function gc(e,t){if(!w(e))return;typeof e.type=="string"&&sc.has(e.type)&&(t.handoff=!0);let o=w(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(So(e.conversation_id).title=e.title,U.emit("conversation",So(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&Ri(n.author?.role)){let r=n.create_time*xo;t.conversationId&&So(t.conversationId).times.set(n.id,r),U.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function hc(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:a}=await o.read();if(i)break;r+=n.decode(a,{stream:!0});let c=r.split(`
`);r=c.pop()??"";for(let l of c){if(!l.startsWith("data:"))continue;let d=l.slice(5).trim();d&&d!=="[DONE]"&&gc(Se(d),t)}}}async function bc(e,t,o){let n={conversationId:t,error:!1,handoff:!1};Bi.set(e,t),U.emit("generate-start",{requestId:e,conversationId:t});try{let r=await o;r.ok?r.headers.get("content-type")?.includes("event-stream")&&await hc(r.clone(),n):n.error=!0}catch(r){let i=r instanceof DOMException&&r.name==="AbortError";n.handoff||=i,n.error||=!i}finally{Bi.delete(e),U.emit("generate-end",{requestId:e,...n})}}async function Ac(e,t){try{let o=await t;if(!o.ok)return;let n=mc(e,await o.clone().json());n&&U.emit("conversation",n)}catch(o){Oi.debug("Conversation read skipped",o)}}function yc(e,t,o){let n=fc(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&ic.test(n.pathname)){bc(lc++,pc(t),o);return}let i=r==="GET"&&n.pathname.match(ac)?.[1];i&&Ac(i,o)}var Ii=!1;function Hi(){if(Ii)return;Ii=!0;let e=Z.fetch,t=function(o,n){let r=e.call(this??Z,o,n);try{yc(o,n,r)}catch(i){Oi.error("Fetch tap failed",i)}return r};Z.fetch=typeof exportFunction=="function"?exportFunction(t,Z):t}var vc="__reactContainer$",Ni="__reactFiber$";function wo(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var Gn=(e,t)=>Object.keys(e.wrappedJSObject??e).some(o=>o.startsWith(t)),ie=e=>!Gn(document,vc)||Gn(e,Ni);function yt(){return document.body?Promise.resolve():new Promise(e=>{let t=new MutationObserver(()=>{document.body&&(t.disconnect(),e())});t.observe(document,{childList:!0,subtree:!0})})}async function Gi(){await yt();let e=Date.now()+8e3;for(;!Gn(document.body,Ni)&&Date.now()<e;)await new Promise(t=>setTimeout(t,100))}var qc=new S("Route"),Ui=/\/c\/(?!local-)([\w-]+)/,Sc=500,ee=e=>{try{return new URL(e,location.origin).pathname.match(Ui)?.[1]??null}catch{return null}},h=()=>location.pathname.match(Ui)?.[1]??null,Mo=()=>location.pathname==="/",xc=/^\/g\/g-p-[^/]+(?:\/project)?\/?$/,Yi=()=>xc.test(location.pathname),Lo=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",To=new Set,Co=location.href,Yn=h(),Eo;function Un(){if(location.href===Co)return;let e={prevHref:Co,href:location.href,prevId:Yn,id:h()};Co=e.href,Yn=e.id;for(let t of To)try{t(e)}catch(o){qc.error("Route listener failed",o)}}function wc(){let e=new AbortController,{navigation:t}=Z;t?.addEventListener("currententrychange",()=>queueMicrotask(Un),{signal:e.signal}),addEventListener("popstate",Un,{signal:e.signal});let o=setInterval(Un,Sc);return()=>{e.abort(),clearInterval(o)}}function be(e){return To.add(e),Eo||(Co=location.href,Yn=h(),Eo=wc()),()=>{To.delete(e),!To.size&&(Eo?.(),Eo=void 0)}}var Ec=["data-turn","data-message-author-role"],Tc=/:(user|assistant)$/,Fn=`${u.messageUnit}, ${u.oldMessage}`,Qn=e=>e==="user"||e==="assistant",Wi=()=>!!document.querySelector(u.timelineScroll),We=()=>Wi()?Q(u.timelineScroll):document;function qt(){if(Wi())return Q(u.timelineScroll);let e=document.querySelector(u.turn);for(let t=e?.parentElement;t;t=t.parentElement){let{overflowY:o}=getComputedStyle(t);if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight)return t}return document.scrollingElement}var Bo=e=>e.getAttribute("data-chatgpt-search-unit-key")?.match(Tc)?.[1]??null,ji=e=>[...e.querySelectorAll(u.searchUnit)].filter(t=>Bo(t)&&!t.parentElement?.closest(u.searchUnit)),Fi=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function vt(e){let t=Fi(e);return t.length?t:[...new Set([...e.querySelectorAll(Fn)].flatMap(Fi))]}function Kn(e=We()){if(!e)return[];let t=ji(e);return t.length?t:[...e.querySelectorAll(Fn)].filter(o=>!o.parentElement?.closest(Fn))}function Cc(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function Mc(e){for(let t of Ec){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(Qn(o))return o}return e.querySelector(u.markdown)||e.querySelector(u.generatedImage)?"assistant":null}var Lc=e=>!e.parentElement?.closest(u.turn);function Io(){let e=$(h())?.chain??[];return[...We()?.querySelectorAll(u.turn)??[]].filter(Lc).flatMap(o=>{let n=ji(o),r=n.length?n.map(i=>({el:i,known:Bo(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=d=>!n.some(m=>m.contains(d))&&x(d.textContent??""),a=[...o.querySelectorAll(u.assistantMarkdown)].find(d=>i(d)&&!ko.test(x(d.textContent??""))),c=[...o.querySelectorAll(u.activityHeader)].findLast(i),l=a??c;l&&r.push({el:l,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?vt(o):Kn(o).flatMap(vt),a=n??Mc(o)??Cc(i,e)??(r%2?"assistant":"user"),c=o.closest(u.turn)??o,l=!o.closest(u.searchUnit)&&!!c.querySelector(u.turnBusy),d=a==="assistant"&&(o.matches(u.turnBusy)||!!o.querySelector(u.turnBusy)||l);return{el:o,role:a,messageIds:i,streaming:d}})}var kc="[data-bloom], .sr-only",zi=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,ko=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,Qi=new WeakMap;function Oo(e){let o=(e.el.closest(u.turn)??e.el).textContent?.length??0,n=Qi.get(e.el);if(n?.length===o)return n.summary;let r=Bc(e);return Qi.set(e.el,{length:o,summary:r}),r}function Ki(e){let t=new Set,o=[];for(let n of e.querySelectorAll(u.assistantMarkdown)){if(n.closest(u.searchUnit))continue;let r=x(n.textContent??"");!r||ko.test(r)||zi.test(r)||t.has(r)||(t.add(r),o.push(r))}return o}function Bc(e){let t=e.el.querySelectorAll(u.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.closest(u.turn);if(e.role==="assistant"&&o&&e.el.matches(u.assistantMarkdown)&&!e.el.closest(u.searchUnit)){let l=Ki(o);if(l.length)return l.join(" \xB7 ")}let n=e.el.querySelector(e.role==="assistant"?u.markdown:".whitespace-pre-wrap")??e.el,i=[...n.querySelectorAll(kc)].map(l=>x(l.textContent??"")).filter(Boolean).reduce((l,d)=>l.replace(d,`
`),n.innerText||n.textContent||""),a=i.split(`
`).map(x).filter(l=>l&&!zi.test(l)&&!ko.test(l));if(a.length)return a.join(" ");if(e.role==="assistant"&&o){let l=Ki(o);if(l.length)return l.join(" \xB7 ")}let c=i.split(`
`).map(x).filter(l=>ko.test(l));return c.length?c.at(-1)??"":e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function Ro(e){return e.text?x(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var Ji=e=>e.matches(u.timelineScroll)&&getComputedStyle(e).flexDirection==="column-reverse";var Ic=250,Oc=400,Rc=6e4,Pc=5e3,Dc=`:is(${u.turn}) :is(${u.turnBusy})`,y=vo(),Ho=new Set,Wn=new Set,Ae=!1,Zi=0,je=null,ze=!1,Po=!1,St=0,No=!1,xt=null,Vi=!1,L=()=>({generating:Ae,conversationId:h()}),Xi=()=>ki()||!!We()?.querySelector(Dc);function Hc(){let e=Xi();return e?Po||(St=0,No=!0):Po=!1,[...Ho].some(t=>!Wn.has(t))||e&&!Po||Date.now()<St}function Nc(){return xt?.error?"error":ze?"stopped":"done"}function Gc(){je=null,Ae=!1,No=!1,y.emit("fall",{conversationId:h(),outcome:Nc()}),ze=!1,xt=null}function $i(){let e=Hc();e&&!Ae&&(Ae=!0,Zi=Date.now(),ze=!1,xt=null,y.emit("rise",{conversationId:h()})),e||!Ae?je=null:je==null?je=Date.now():Date.now()-je>=Oc&&Gc()}function Do(){$i(),y.emit("tick",L())}function Uc({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(Ae||Date.now()-Zi<Rc);if(!o&&Ae){for(let n of Ho)Wn.add(n);Po=Xi(),St=0,No=!1,je=null,Ae=!1,ze=!1,xt=null,y.emit("fall",{conversationId:e,outcome:"left"})}y.emit("context",{prevId:e,id:t,migrated:o}),Do()}function Yc(e){e.target instanceof Element&&e.target.closest(u.stopButton)&&(ze=!0,St=0)}function _i(){Vi||(Vi=!0,U.on("generate-start",({requestId:e})=>{Ho.add(e),Do()}),U.on("generate-end",e=>{Ho.delete(e.requestId),!Wn.delete(e.requestId)&&(xt=e,St=e.handoff&&!e.error&&!ze&&!No?Date.now()+Pc:0,Do())}),be(Uc),document.addEventListener("click",Yc,!0),Ti(Do,Ic),wo().then(()=>B($i)))}var ea={BetterNavigator:1791037311e3,ChatListStatus:1791034734e3,ChatStateFavicons:1791034734e3,Cleaner:1791034734e3,ComposerOpacity:1791037311e3,Continue:1791034734e3,CustomSidebarIdentity:1791034734e3,GreetingCustomizer:1791037311e3,InputHistory:1791034734e3,MessageTimestamps:1791034734e3,NoDictation:1791034734e3,NoShareLink:1791034734e3,NoSidebarIdentity:1791034734e3,PromptQueue:1791037311e3,RecentTopics:1791034734e3,ResponseNotification:1791034734e3,Settings:1791039171e3,SidebarIdentityOpacity:1791034734e3,StarChats:1791040514e3,StreamerMode:1791034734e3,WiderChat:1791034734e3};var A=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,Fc="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",Qc={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${Fc}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:A('<path d="M18 6 6 18M6 6l12 12"/>'),gear:A('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:A('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:A('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:A('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:A('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:A('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:A('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:A('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:A('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:A('<path d="m6 9 6 6 6-6"/>'),play:A('<path d="M7 4v16l13-8z"/>'),plus:A('<path d="M12 5v14M5 12h14"/>'),check:A('<path d="m5 12 5 5 9-10"/>'),alert:A('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:A('<path d="M4 5h16v11H9l-5 4z"/>'),layout:A('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:A('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:A('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:A('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:A('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:A('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:A('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:A('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:A('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:A('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:A('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:A('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:A('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:A('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:A('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),grip:A('<path d="M9 6h0M15 6h0M9 12h0M15 12h0M9 18h0M15 18h0"/>')},P=e=>Ei(Qc[e]);var ae="data-bloom-tip",jn=6,zn=8,Me,ta=null;function Je(e){if(e===ta)return;if(ta=e,!e){Me?.remove();return}Me??=s("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),Me.textContent=e.getAttribute(ae),document.body.append(Me);let t=e.getBoundingClientRect(),{width:o,height:n}=Me.getBoundingClientRect(),r=t.bottom+jn+n<=innerHeight-zn;Me.style.left=`${pe(t.left+t.width/2-o/2,zn,innerWidth-o-zn)}px`,Me.style.top=`${r?t.bottom+jn:t.top-jn-n}px`}var oa=e=>e instanceof Element?e.closest(`[${ae}]`):null;function na(){let e=new AbortController,t={passive:!0,signal:e.signal};return document.addEventListener("pointerover",o=>Je(oa(o.target)),t),document.addEventListener("pointerout",o=>o.relatedTarget||Je(null),t),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&Je(oa(o.target)),t),document.addEventListener("focusout",()=>Je(null),t),document.addEventListener("pointerdown",()=>Je(null),t),()=>{e.abort(),Je(null)}}function Jn(e,t,o,n=!1){let r=s("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let a=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(a)),t(a)}),r}function N(e,t,o){return s("button",{class:co("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button","data-bloom":"control"},on:{click:t}})}function K(e,t,o,n){let r=s("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":t,"data-bloom":"control",[ae]:t},on:{click:o}},P(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function Go(e,t,o,n,r,i){let a=s("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});a.value=String(e);let c=s("output",{text:`${a.value}${r}`});return a.addEventListener("input",()=>{c.textContent=`${a.value}${r}`,i(Number(a.value))}),s("div",{class:"bloom-slider"},a,c)}function Vn(e,t,o){let n=s("select",{class:"bloom-select"},...t.map(r=>s("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function wt(e,t,o="",n="text"){let r=s("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var Kc=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,ra=/\S+@\S+\.\S+/,Wc=3,jc=/^\/g\/(g-p-[^/]+)\//,zc=/^g-p-[0-9a-f]+-?/i,ia=e=>!!e.closest(".sr-only"),Zn=e=>!!e?.querySelector(u.menuButton);function aa(){return[...document.querySelectorAll(u.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(Zn)).filter(e=>e!=null)}function sa(){let e=[...document.querySelectorAll(u.oldProfile)];if(e.length)return e.map(o=>{let n=o.parentElement?.children.length===1?o.parentElement:o;return{kind:"profile",anchor:n,insert:r=>n.before(r)}});let t=aa().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(u.rail)){let n=[...o.children].find(Zn);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}var Xn=e=>!e.closest("[data-bloom]")&&(!!e.querySelector("img, [class*=rounded-full]")||da(e).some(t=>!ia(t))),la=e=>[...e.parentElement?.children??[]].find(t=>t!==e&&t instanceof HTMLElement&&Xn(t))??null;function ca(){let e=[...document.querySelectorAll(u.oldProfile)];return e.length?e:[...aa(),...[...document.querySelectorAll(u.rail)].map(o=>[...o.children].findLast(Zn))].map(o=>[...o?.querySelectorAll(u.menuButton)??[]].findLast(n=>Xn(n)||la(n))).filter(o=>o!=null)}var ua=()=>ca().map(e=>Xn(e)?e:la(e)).filter(e=>e!=null);function da(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!x(t.textContent??"")&&!(t instanceof SVGElement))}var Jc=e=>{if(/rounded-full/.test(e.getAttribute("class")??""))return!0;if(!e.clientWidth)return!1;let{borderRadius:t}=getComputedStyle(e);return t.includes("%")||Number.parseFloat(t)>=e.clientWidth/2};function Uo(e,t,o){for(let n of e.querySelectorAll(`[${t}]`))n!==o&&n.removeAttribute(t);o&&!o.hasAttribute(t)&&o.setAttribute(t,"")}function Vc(e,t){if(x(e.textContent??"").length>Wc)return null;let o=e.closest("button");for(let n=e;n&&n!==t&&n!==o;n=n.parentElement)if(Jc(n))return n;return null}function $n(e,t){e.hasAttribute(`data-bloom-${t}`)||e.setAttribute(`data-bloom-${t}`,"");let o=e.querySelector("img:not([data-bloom] img)"),n=da(e),r=o?null:n.map(m=>Vc(m,e)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),a=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");Uo(e,`data-bloom-${t}-avatar`,a);let c=n.filter(m=>!a?.contains(m)&&!ia(m)),l=c.find(m=>Kc.test(x(m.textContent??""))),d=c.find(m=>ra.test(m.textContent??""));Uo(e,`data-bloom-${t}-plan`,l),Uo(e,`data-bloom-${t}-email`,d),Uo(e,`data-bloom-${t}-name`,c.find(m=>m!==l&&m!==d))}function Zc(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function Yo(){return ca().map(Zc).find(e=>e!=null)??[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&(ra.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var Et=e=>[...document.querySelectorAll(u.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&ee(t.href)===e);function ma(e){let t=Et(e).find(o=>x(o.textContent??""));return t?x(t.textContent??""):null}function fa(e){let t=new URL(e,location.origin).pathname.match(jc)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!ee(n.href)&&x(n.textContent??""));return o?x(o.textContent??""):t.replace(zc,"").replaceAll("-"," ")||null}var _n=0,Fo;function Xc(e){if(!H(e))return;for(let o of ua())$n(o,"profile");let t=Yo();t&&$n(t,"menu")}function te(){_n++;let e=!0;return yt().then(()=>{e&&_n&&!Fo&&(Fo=B(Xc))}),()=>{e&&(e=!1,!--_n&&(Fo?.(),Fo=void 0))}}var $c=new S("SettingsPanel"),f=T("bloom-settings-"),_c=10080*60*1e3,eu=3e3,pa="Toggle features. Some need a reload. Click the sliders icon to configure.",tu=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],ou=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],nu={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},ha=new Set(["chat","ui","privacy"]),Y=null,ke="all",er="all",Qo="",tr=[],ba=()=>[...Ee.values()].filter(e=>!e.hidden),ru=e=>!!e.updatedAt&&Date.now()-e.updatedAt<_c;function iu(e){switch(ke){case"favorites":return go.has(e.name);case"recent":return ru(e);case"all":return!0;case"other":return!e.tags.some(t=>ha.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(ke)}}function au(e){switch(er){case"all":return!0;case"enabled":return pt(e);case"disabled":return!pt(e)}}function su(e){let t=Qo.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function lu(e){let t=po.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return ke==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var Aa=e=>e.settings?.def??{},cu=e=>Object.values(Aa(e)).some(t=>t.type!=="custom");function uu(e,t,o){let n=xe(e.name,t)??Rn(o),r=i=>we(e.name,t,i);switch(o.type){case"boolean":return Jn(n,r,o.description??t);case"slider":return Go(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return Vn(n,o.options,r);case"string":return wt(n,r,o.placeholder);case"number":return wt(String(n),i=>r(Number(i)),"","number");case"component":{let i=s("div",{class:f("component")});return tr.push(o.render(i)),i}case"custom":return null}}var du=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function ya(e){if(!Y)return;let t=Object.entries(Aa(e)).filter(([,i])=>i.type!=="custom").map(([i,a])=>{let c=uu(e,i,a),l=a.type==="boolean",d=a.type!=="component"&&s("div",{class:f("field-label"),text:du(i)}),m=a.description&&s("div",{class:f("field-desc"),text:a.description});return s("div",{class:f("field",l?"field-inline":"field-stacked")},(d||m)&&s("div",{class:f("field-text")},d,m),c)}),o,n=N("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},eu);return}clearTimeout(o),e.settings?.reset(),Tt(),ya(e)},"danger"),r=s("div",{class:f("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&Tt()}},s("div",{class:f("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},s("div",{class:f("popup-header")},s("div",{class:f("card-icon")},P(e.icon)),s("div",{class:f("popup-title")},s("div",{class:f("card-name"),text:e.name}),s("div",{class:f("popup-authors"),text:e.authors.join(", ")})),K("close","Close",Tt)),s("p",{class:f("popup-desc"),text:e.description}),s("div",{class:f("fields")},...t),s("div",{class:f("popup-footer")},n)));Y.querySelector(`.${f("modal")}`)?.append(r)}function Tt(){for(let e of tr)e();tr=[],Y?.querySelector(`.${f("popup-backdrop")}`)?.remove()}function ga(e){let t=pt(e),o=go.has(e.name),n=po.has(e.name),r=!!e.required;return s("div",{class:[f("card",t?"card-on":"card-off"),r?f("card-required"):""].filter(Boolean).join(" ")},s("div",{class:f("card-top")},s("div",{class:f("card-icon")},P(e.icon)),s("div",{class:f("card-actions")},K("star",o?"Unstar":"Star",()=>{go.toggle(e.name),Le()},o),r?null:K("pin",n?"Unpin":"Pin to top",()=>{po.toggle(e.name),Le()},n),r?s("span",{class:f("required-mark"),attrs:{"aria-label":"Required",[ae]:"This plugin is required for Bloom++ to work"}},P("alert")):null,cu(e)&&K("gear","Settings",()=>ya(e)),Jn(t,i=>qi(e,i),r?`${e.name} is required`:`Enable ${e.name}`,r))),s("div",{class:f("card-name"),text:e.name}),s("div",{class:f("card-desc"),text:e.description,title:e.description}),s("div",{class:f("card-footer"),text:e.authors.join(", ")}))}function va(){let e=ba().some(o=>!o.tags.some(n=>ha.has(n)));Y?.querySelector(`.${f("tabs")}`)?.replaceChildren(...tu.filter(o=>o.id!=="other"||e).map(o=>s("button",{class:f("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===ke)},on:{click:()=>{ke=o.id,va(),Le()}}})))}function Le(){if(!Y)return;let e=ba().filter(iu),t=Y.querySelector(`.${f("search")} input`);t&&(t.placeholder=`Search ${so(e.length,"plugin")}...`);let o=lu(e.filter(d=>su(d)&&au(d))),n=ke==="all",r=n?o.filter(d=>!d.required):o,i=n?o.filter(d=>d.required):[],a=[...r.map(ga),...i.length?[s("div",{class:f("required-break"),attrs:{role:"separator"}}),...i.map(ga)]:[]],c=Qo.trim()?"No plugins match your search.":nu[ke]??"No plugins available.";Y.querySelector(`.${f("grid")}`)?.replaceChildren(...a.length?a:[s("div",{class:f("empty"),text:c})])}function mu(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),Y?.querySelector(`.${f("popup-backdrop")}`)?Tt():Ve())}var qa,or;function fu(){if(Y)return;let e=s("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=Qo,e.addEventListener("input",()=>{Qo=e.value,Le()}),Y=s("div",{class:`bloom-root ${f("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&Ve()}},s("div",{class:f("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},s("div",{class:f("header")},s("div",{class:f("logo")},P("bloom")),s("h2",{class:f("title"),text:"Bloom++"}),s("span",{class:f("hint"),attrs:{"aria-label":pa,tabindex:"0",[ae]:pa}},P("info")),s("span",{class:f("version"),text:"v2.0.55"}),K("close","Close",Ve)),s("div",{class:f("tabs"),attrs:{role:"tablist"}}),s("div",{class:f("toolbar")},s("label",{class:f("search")},P("search"),e),Vn(er,ou,t=>{er=t,Le()})),s("div",{class:f("grid")}))),Y.addEventListener("keydown",t=>t.stopPropagation()),or=new AbortController,document.addEventListener("keydown",mu,{capture:!0,signal:or.signal}),document.body.append(Y),va(),Le(),qa=Si(Le),e.focus(),$c.debug("Opened")}function Ve(){Tt(),or?.abort(),qa?.(),Y?.remove(),Y=null}var Ko=()=>Y?Ve():fu();var Sa=`/*
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
`;var ye=T("bloom-entry-"),gu=4,nr="--bloom-entry-x",rr=1,Ze=g({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar. The account menu and the userscript menu always open the panel.",default:!1},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:!0},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:e=>(e.append(N("Reset position",()=>{Ze.store.entryPosition=rr})),()=>e.replaceChildren())},entryPosition:{type:"custom",default:rr}}),Be=new Map,xa=!1,wa=[];function hu(e,t,o){let n=e.currentTarget,r=t.clientWidth-n.offsetWidth;if(e.button!==0||r<=0||!t.classList.contains(ye("hover")))return;let i=Ze.store.entryPosition,a=i,c=!1,l=new AbortController;n.setPointerCapture(e.pointerId),n.addEventListener("pointermove",m=>{!c&&Math.abs(m.clientX-e.clientX)<gu||(c=!0,o(),a=pe(i+(m.clientX-e.clientX)/r,0,rr),t.style.setProperty(nr,String(a)))},{signal:l.signal});let d=()=>{l.abort(),c&&(Ze.store.entryPosition=a,t.style.removeProperty(nr))};n.addEventListener("pointerup",d,{signal:l.signal}),n.addEventListener("lostpointercapture",d,{signal:l.signal})}function bu(e){let t=!1,o=s("button",{class:ye("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),t||Ko(),t=!1},pointerdown:r=>{t=!1,e!=="rail"&&hu(r,n,()=>{t=!0})}}},P("bloom"),e!=="rail"&&s("span",{class:ye("label"),text:"Bloom++"})),n=s("div",{class:`bloom-root ${ye("wrap")} ${ye(e)}`,attrs:{"data-bloom":"entry"}},o);return n}function Au(e){let t=s("div",{class:`bloom-root ${ye("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),Ko()}}},P("bloom"),s("span",{text:"Bloom++"})),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function Ea(){let{showSidebarEntry:e,showSidebarEntryOnHover:t}=Ze.store,o=e||t?sa():[];for(let[r,i]of Be)r.isConnected&&o.some(a=>a.anchor===r)||(i.remove(),Be.delete(r));for(let r of o){let i=Be.get(r.anchor);if(i?.isConnected||!ie(r.anchor))continue;let a=i??bu(r.kind);Be.set(r.anchor,a),r.insert(a)}for(let r of Be.values())r.classList.toggle(ye("hover"),!e);let n=Yo();n&&!n.querySelector('[data-bloom="menu-entry"]')&&Au(n)}var Ta=p({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:Ze,styles:()=>`${Sa}.${ye("hover")}{${nr}:${Ze.store.entryPosition}}`,start(){wa=[B(Ea),na(),te()],!xa&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",Ko),xa=!0)},stop(){for(let e of wa)e();for(let e of Be.values())e.remove();Be.clear(),Ve()},onSettingsChange:Ea});var Ca=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

.bloom-nav-root {
    position: fixed;
    z-index: 30;
    display: flex;
    align-items: center;
    transform: translateY(-50%);
    contain: layout style;
}

.bloom-nav-rail {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.375rem;
    max-height: 60vh;
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
    max-height: 60vh;
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
`;var k=T("bloom-nav-"),jo=80,vu=1200,qu=2,Ma=3e4,Su=200,xu=.9,wu=.3,Eu=12,Tu={user:"\u2753",assistant:"\u{1F916}"},Cu=["wheel","touchmove","pointerdown"],zo=g({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),I=null,D=[],Ie=-1,Oe=-1,Xe=null,Wo="",ar=0,La=[],Bt=null,Lt,Ct,sr="",Mt=[],Mu=e=>zo.store.showAssistant||e.role==="user",Lu=e=>e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.messageIds[0]||e.role;function ku(e){return{role:e.role,summary:Oo(e),ids:e.messageIds,turn:e,streaming:e.streaming}}function Ra(e,t){let o=e.entries.at(-1);if(o?.role==="assistant"&&t.role==="assistant"){e.entries[e.entries.length-1]={...t,ids:[...new Set([...o.ids,...t.ids])]};return}e.entries.push(t)}function Bu(){let e=[];for(let t of Io()){let o=ku(t),n=Lu(t),r=e.at(-1);r?.key===n?Ra(r,o):e.push({key:n,entries:[o]})}return e}function Iu(){let e=[];for(let t of $(h())?.chain??[]){let o={role:t.role,summary:Ro(t),ids:[t.id],turn:null,streaming:!1},n=e.at(-1);t.role==="assistant"&&n?Ra(n,o):e.push({key:t.id,entries:[o]})}return e}var ka=e=>e.entries.flatMap(t=>t.ids);function lr(e,t){let o=new Set(ka(e));return ka(t).some(n=>o.has(n))}var Re=e=>x(e.entries.find(t=>t.role==="user")?.summary??""),ir=(e,t)=>e.filter(o=>Re(o)===t).length,cr=e=>({...e,turn:null,streaming:!1});function Ou(e,t){let o=new Set(t.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return e.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return cr(r);let a=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return a&&a!==n.key?cr(r):r})}))}function Ru(e,t){let o=t.entries.map((n,r)=>{let i=e.entries[r];if(!i)return n;let a=[...new Set([...n.ids,...i.ids])];return{...n,ids:a,summary:n.summary||i.summary}});for(let n of e.entries.slice(o.length))o.push(cr(n));return{key:e.key,entries:o}}function Pa(){let e=qt();if(!e)return!1;let t=e.clientHeight-e.scrollHeight;return e.scrollTop-t<=Math.abs(e.scrollTop)}function Pu(e,t){let o=Ou(e,t);if(!t.length)return o;if(!o.length)return t;let n=t.findIndex(l=>o.some(d=>d.key===l.key));if(n<0)return Pa()?t.concat(o):o.concat(t);let r=t[n]?.key,i=o.findIndex(l=>l.key===r),a=o.slice(0,i).concat(t.slice(0,n),o.slice(i)),c=a.findIndex(l=>l.key===r);for(let l=n;l<t.length;l++){let d=t[l];if(!d)continue;let m=a.findIndex(v=>v.key===d.key);if(m>=0){let v=a[m];v&&(a[m]=Ru(v,d)),c=m}else a.splice(c+1,0,d),c++}return a}function Du(e,t){let o=0,n=0,r=0;for(let i=1-e.length;i<t.length;i++){let a=0,c=0;for(let d=0;d<e.length;d++){let m=t[d+i],v=e[d];!m||!v||(lr(v,m)?(a+=3,c++):Re(v)&&Re(v)===Re(m)&&a++)}let l=Pa()?i<r:i>r;(a>o||a===o&&c>n||a===o&&c===n&&l)&&(o=a,n=c,r=i)}return{score:o,offset:r}}function Hu(e,t){let o=e.entries.map((n,r)=>{let i=t.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of t.entries.slice(o.length))o.push({...n,turn:null});return{key:e.key,entries:o}}function Nu(e){return e.map(t=>({key:t.key,entries:t.entries.map(o=>({...o}))}))}function Gu(e,t){if(!t.length)return e;if(!e.length)return t;let{score:o,offset:n}=Du(e,t),r=Nu(e);if(o>0)for(let c=0;c<r.length;c++){let l=t[c+n],d=r[c];if(!l||!d)continue;let m=Re(d),v=!!m&&m===Re(l)&&ir(e,m)===1&&ir(t,m)===1;(lr(d,l)||v)&&(r[c]=Hu(d,l))}let i=[],a=[];for(let c=0;c<t.length;c++){let l=t[c];if(!l)continue;let d=Re(l);!d||ir(r,d)>0||r.some(m=>lr(m,l))||(o>0&&c<n?i.push(l):a.push(l))}return i.concat(r,a)}function Uu(){let e=h()??"";return e!==sr&&(sr=e,Mt=[]),Mt=Gu(Pu(Mt,Bu()),Iu()),Mt.flatMap(t=>t.entries).filter(Mu)}function Yu(e){for(let o of e)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!L().generating||e.some(o=>o.streaming))return;let t=e.at(-1);t&&(t.role==="assistant"||!zo.store.showAssistant?t.streaming=!0:e.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function Da(){let e=Uu();return Yu(e),e}function Fu(e){let t=e.getBoundingClientRect(),o=t.top+t.height*wu,n=-1;return D.forEach((r,i)=>{let a=r.turn?.el.getBoundingClientRect();a&&a.top<=o&&(n=i)}),n===-1?D.findIndex(r=>r.turn):n}function Ba(e){zo.store.jumpEffect==="border"&&(e.classList.add(k("flash")),setTimeout(()=>e.classList.remove(k("flash")),vu))}function Jo(e){let t=D[e],o=qt();if(!t||!o)return;if(!t.turn&&!t.ids.length){Oe=e,kt(),o.scrollTo({top:Ji(o)?0:o.scrollHeight});return}Oe=e,Xe=e?null:{chat:h(),first:t.ids[0],until:Date.now()+Ma},kt();let n=t.turn?.el;if(n?.isConnected){let d=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:d<o.clientHeight*qu?"smooth":"auto"}),Ba(n);return}let r=D.findIndex(d=>d.turn),i=r>=0&&e<r?-1:1,a=++ar,c=Date.now()+Ma,l=()=>{let d=qt();if(a!==ar||Date.now()>c||!d)return;D=Da();let m=D.find(F=>F.ids.some(b=>t.ids.includes(b)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),Ba(m),Oe=D.findIndex(F=>F.turn?.el===m),kt();return}let v=d.scrollTop;d.scrollBy({top:i*d.clientHeight*xu,behavior:"instant"}),d.scrollTop===v?setTimeout(l,Su):requestAnimationFrame(l)};l()}function Qu(e,t){return s("button",{class:k("row"),attrs:{type:"button","data-index":String(t)},on:{click:()=>Jo(t)}},s("span",{text:Tu[e.role]}),s("span",{class:"bloom-truncate",text:ge(e.summary||"\u2026",jo)}))}function Ia(e){if(!I)return;let t=e.getBoundingClientRect(),o=Math.min(t.bottom,Ce()?.getBoundingClientRect().top??t.bottom);I.style.right=`${document.documentElement.clientWidth-t.left-e.clientLeft-e.clientWidth+Eu}px`,I.style.top=`${(t.top+o)/2}px`}function Ku(){let e=qt();if(D=Da(),!D.length||!e){I?.remove(),I=null,Wo="";return}if(Bt!==e){Ct?.abort(),Ct=new AbortController,e.addEventListener("scroll",Qe(kt),{passive:!0,signal:Ct.signal});for(let o of Cu)e.addEventListener(o,Ha,{passive:!0,signal:Ct.signal});Bt=e,Lt?.disconnect(),Lt=new ResizeObserver(()=>{e.isConnected&&Ia(e)}),Lt.observe(e)}I??=s("div",{class:`bloom-root ${k("root")}`,attrs:{"data-bloom":"navigator"}},s("div",{class:k("rail")}),s("div",{class:k("toc")},s("div",{class:k("toc-head")}),s("div",{class:k("toc-list")}))),I.isConnected||document.body.append(I),Ia(e);let t=JSON.stringify(D.map(o=>[o.role,o.ids]));t!==Wo?(Wo=t,Oe=-1,ju(),Xe&&Date.now()<Xe.until&&Xe.chat===h()&&D[0]?.ids[0]!==Xe.first&&Jo(0)):Wu(),kt()}function kt(){if(!I||!Bt)return;Ie=Oe>=0?Oe:Fu(Bt),I.querySelectorAll(`.${k("tick")}`).forEach((t,o)=>t.classList.toggle(k("tick-current"),o===Ie)),I.querySelectorAll(`.${k("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===Ie)));let e=I.querySelector(`.${k("toc-head")}`);e&&(e.textContent=`${Ie+1} / ${D.length}`)}function Wu(){I?.querySelectorAll(`.${k("tick")}`).forEach((e,t)=>{let o=D[t],n=ge(o.summary,jo);e.title!==n&&(e.title=n),e.classList.toggle(k("tick-streaming"),o.streaming)}),I?.querySelectorAll(`.${k("row")}`).forEach(e=>{let t=e.lastElementChild,o=ge(D[Number(e.dataset.index)].summary||"\u2026",jo);t&&t.textContent!==o&&(t.textContent=o)})}function ju(){I?.querySelector(`.${k("rail")}`)?.replaceChildren(...D.map((e,t)=>s("button",{class:co(k("tick"),k(`tick-${e.role}`),e.streaming&&k("tick-streaming"),t===Ie&&k("tick-current")),title:ge(e.summary,jo),attrs:{type:"button","aria-label":`Jump to message ${t+1}`},on:{click:()=>Jo(t)}}))),I?.querySelector(`.${k("toc-list")}`)?.replaceChildren(...D.map(Qu))}var se=Qe(Ku);function Ha(){Oe=-1,Xe=null,ar++}var zu=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function Oa(e){if(!I||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||zu(document.activeElement)||document.querySelector("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:Ie-1,ArrowDown:Ie+1,Home:0,End:D.length-1}[e.key];if(o==null){Ha();return}o<0||o>=D.length||(e.preventDefault(),e.stopPropagation(),Jo(o))}var Na=p({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:zo,styles:Ca,start(){La=[B(e=>H(e)&&se()),be(se),U.on("conversation",se),y.on("rise",se),y.on("fall",se)],addEventListener("keydown",Oa,!0),addEventListener("resize",se,{passive:!0}),se()},stop(){for(let e of La)e();Ct?.abort(),Lt?.disconnect(),Lt=void 0,Bt=null,removeEventListener("keydown",Oa,!0),removeEventListener("resize",se),I?.remove(),I=null,Wo="",Mt=[],sr=""},onSettingsChange:se});var Ga=`/*
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
`;var Vu=T("bloom-cls"),Zu="bloom-cls",Xu=600*1e3,dr=_r("tab"),_e=new Map,Ot=new Map,$e=null,Ua=[],$u=e=>e==="streaming"||e==="error";function _u(){let e=new Map,t=Date.now();for(let[o,n]of Ot)t-n.at>Xu?Ot.delete(o):e.set(o,n.status);for(let[o,n]of _e)e.set(o,n);return e}function ed(e){return s("span",{class:`bloom-root ${Vu("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&P("alert"))}function It(){let e=_u(),t=new Set;for(let[o,n]of e)for(let r of Et(o)){if(!ie(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let a=ed(n);t.add(a),r.append(a)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function Vo(e,t){e&&(t?_e.set(e,t):_e.delete(e),$e?.postMessage({tab:dr,id:e,status:t}),It())}function td({data:e}){!w(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===dr||($u(e.status)?Ot.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):Ot.delete(e.id),It())}function ur(){for(let e of _e.keys())$e?.postMessage({tab:dr,id:e,status:null})}var Ya=p({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:Ga,start(){$e=typeof BroadcastChannel=="function"?new BroadcastChannel(Zu):null,$e?.addEventListener("message",td),addEventListener("pagehide",ur),Ua=[y.on("rise",({conversationId:e})=>Vo(e,"streaming")),y.on("fall",({conversationId:e,outcome:t})=>Vo(e,t==="error"?"error":null)),y.on("context",({prevId:e,id:t,migrated:o})=>{o&&L().generating?Vo(t,"streaming"):!o&&_e.get(e??"")==="streaming"&&Vo(e,null)}),B(e=>H(e)&&It())],h()&&It()},stop(){for(let e of Ua)e();ur(),$e?.close(),$e=null,removeEventListener("pagehide",ur),_e.clear(),Ot.clear(),It()}});var Qa=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],$o={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},od={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},nd="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",mr=32,_o=64,fr="#FCFCFC",pr="#111111",rd=14,en=51.5,id=12.5,ad=9.75,Fa=52,sd=10.5,ld=7.75,cd={rotate:e=>e.arc(en,en,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function Zo(e){let t=document.createElement("canvas");t.width=t.height=mr;let o=t.getContext("2d");return o?(o.scale(mr/_o,mr/_o),e(o),t.toDataURL("image/png")):""}function Xo(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D(nd);o&&(e.strokeStyle=pr,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function tn(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function ud(e,t){tn(e,en,id,pr),tn(e,en,ad,$o[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),cd[t](e),e.stroke()}function dd(e,t){e.beginPath(),e.roundRect(0,0,_o,_o,rd),e.fillStyle=t,e.fill()}var md=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function Ka(e,t){switch(e){case"original":return md(od[t]);case"hole":return Zo(o=>Xo(o,$o[t],!0));case"bg":return Zo(o=>{dd(o,$o[t]),Xo(o,fr,!1)});case"dot":return Zo(o=>{Xo(o,fr,!0),tn(o,Fa,sd,pr),tn(o,Fa,ld,$o[t])});case"badge":return Zo(o=>{Xo(o,fr,!0),ud(o,t)})}}var Pt="bloom-chat-state-favicon",Dt="data-bloom-rel",br="data-bloom-media",Wa="bloom-parked-icon",fd="/favicon.ico",za=g({style:{type:"select",description:"How the tab icon shows the chat state.",options:Qa,default:"bg"}}),ve=null,Ja="",on=null,Va="",ja=new Map,Ar,gr=[],Za=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${Dt}]`)];function yr(){for(let e of Za())e.id!==Pt&&(e.hasAttribute(Dt)||(Va||=e.href,e.setAttribute(Dt,e.rel),e.setAttribute(br,e.getAttribute("media")??"")),e.rel!==Wa&&(e.rel=Wa),e.media!=="not all"&&(e.media="not all"))}function pd(){for(let e of Za()){let t=e.getAttribute(Dt);if(t==null)continue;e.rel=t;let o=e.getAttribute(br);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(Dt),e.removeAttribute(br)}}function Xa(){let e=document.getElementById(Pt);return e||(e=document.createElement("link"),e.id=Pt,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function gd(e){if(e==="wait")return Va||fd;let t=za.store.style,o=`${t}:${e}`,n=ja.get(o);return n||ja.set(o,n=Ka(t,e)),n}function hr(e){if(e)return"rotate";let t=C();return ve&&t&&t!==Ja&&(ve=null),ve==="error"?"error":ve==="done"?"done":t?"ready":"wait"}function Rt(e,t=!1){if(e===on&&!t)return;on=e;let o=Xa(),n=gd(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function hd(){Ar=new MutationObserver(()=>{yr(),document.head.lastElementChild?.id!==Pt&&Xa()}),Ar.observe(document.head,{childList:!0})}var $a=p({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"HostReady",settings:za,start(){yr(),Rt(hr(L().generating),!0),hd(),gr=[y.on("rise",()=>{ve=null,Rt("rotate")}),y.on("fall",({outcome:e})=>{ve=e==="done"||e==="error"?e:null,Ja=C(),Rt(hr(!1))}),y.on("context",({migrated:e})=>{e||(ve=null)}),y.on("tick",({generating:e})=>{yr(),Rt(hr(e))})]},stop(){for(let e of gr)e();gr=[],Ar?.disconnect(),document.getElementById(Pt)?.remove(),pd(),on=null,ve=null},onSettingsChange(){Rt(on??"wait",!0)}});var bd={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${u.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])']},_a=g({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0}}),es=p({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads and notices.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:_a,styles:()=>Ue(Object.entries(bd).flatMap(([e,t])=>_a.store[e]?t:[]))});var et=`form:has(:is(${u.composerInput})), ${u.oldComposerForm}`,nn='[class*="ComposerLayoutBody"]',vr='[class*="ComposerLayoutRoot"]',Ad='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',yd=`:is(${et}) ${nn}, :is(${et}):not(:has(${nn})) ${vr}, :is(${et}):not(:has(${nn})):not(:has(${vr})) :is(${Ad})`,vd='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',qd='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',Sd="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))",ts=g({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function xd(){let{opacity:e,blur:t}=ts.store;if(e>=100)return"";let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${Sd} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important;-webkit-backdrop-filter:blur(${t}px)!important`;return`:is(${vd}), :is(${et}){${o}}:is(${qd}){display:none!important}${yd}{${n}}:is(${et}):has(${nn}) ${vr}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${et}) :is(${u.composerInput}){background-color:transparent!important}`}var os=p({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:ts,styles:xd});var wd=1200,Ed=8e3,Td=150,Cd=20,ns=6,xr="continue where you left",Md=/message delivery timed out|please try again/i,rs=/waiting for the complete answer/i,is=g({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:xr,placeholder:xr}}),qr=[],an=0,Ht=!1,Nt=0,ot="",rn="",wr=0,nt=!1,Gt=!1,sn=!0,tt="",Er=0,ln=!1,Ld=()=>is.store.prompt.trim()||xr;function as(){return(Q(u.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function ss(){let e=as();return!e||rs.test(e)||!Md.test(e)?"":e}function kd(){let e=as();return e&&rs.test(e)?e:""}function Bd(){let e=We()?.querySelectorAll(u.turn),t=e?.[e.length-1];return`${t?.getAttribute("data-turn-key")??""}:${t?.textContent?.length??0}`}function ls(e,t,o){if(o===an){if(L().generating||C()!==e||t>=Cd){nt=!1,L().generating||(ot="");return}qo(),setTimeout(()=>ls(e,t+1,o),Td)}}function Id(e){let t=an;if(L().generating||C()&&C()!==e){nt=!1,ot="";return}_(e),ln=!0,bt(()=>{t===an&&ls(e,0,t)})}function cs(e){return e===ot||Nt>=ns||L().generating||C()?!1:(ot=e,Nt+=1,nt=!0,Id(Ld()),!0)}function Od(){if(Ht||nt||Gt)return;let e=Date.now(),t=ss();if(t){if(tt="",t!==rn){rn=t,wr=e;return}if(e-wr<wd)return;cs(`${h()??""}:${t}`);return}if(rn="",!kd()){sn=!0,tt="";return}if(!sn||!L().generating||C())return;let n=`${h()??""}:${Bd()}`;if(n!==tt){tt=n,Er=e;return}if(e-Er<Ed||Nt>=ns)return;let r=Ke();r&&(Gt=!0,r.click())}function Sr(){an+=1,Ht=!1,Nt=0,ot="",rn="",wr=0,nt=!1,Gt=!1,sn=!0,tt="",Er=0,ln=!1}var us=p({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:is,start(){Sr(),qr=[y.on("rise",()=>{Ht=!1,ot="",nt=!1,ln&&(ln=!1,sn=!1,tt="")}),y.on("fall",({outcome:e})=>{if(Gt){Gt=!1,e==="left"?Ht=!0:cs(`${h()??""}:stall`);return}(e==="stopped"||e==="left")&&(Ht=!0),e==="done"&&!ss()&&(Nt=0)}),y.on("context",({migrated:e})=>{e||Sr()}),y.on("tick",Od)]},stop(){for(let e of qr)e();qr=[],Sr()}});var le=T("bloom-csi-"),Rd=256,Pd=160,cn=1,ds=4,Dd=.1,Hd=.0015,Nd=250;function Gd(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function Ud(e){return new Promise((t,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function Yd(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:pe(t.x,n,1-n),y:pe(t.y,r,1-r)}}function ms(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function Fd(e,t){let o=s("canvas");return o.width=o.height=Rd,ms(o,e,t),o.toDataURL("image/png")}function fs(e){let t=null,o={x:O.store.cropX,y:O.store.cropY,zoom:O.store.cropZoom},n,r=s("canvas",{class:le("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=Pd*devicePixelRatio;let i=s("div",{class:`bloom-muted ${le("status")}`}),a=s("div",{class:le("zoom")}),c=s("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(b,G=!0){t&&(o=Yd(t,b),ms(r,t,o),G&&(clearTimeout(n),n=setTimeout(()=>{t&&(O.store.cropX=o.x,O.store.cropY=o.y,O.store.cropZoom=o.zoom,O.store.avatarUrl=Fd(t,o))},Nd)))}function d(){a.replaceChildren(Go(o.zoom,cn,ds,Dd,"\xD7",b=>l({...o,zoom:b})))}async function m(b,G){i.textContent="";try{t=await Ud(b),G&&(O.store.avatarSource=b,o={x:.5,y:.5,zoom:cn}),e.classList.add(le("has-image")),d(),l(o,G)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let v=b=>{b?.type.startsWith("image/")&&Gd(b).then(G=>m(G,!0))};c.addEventListener("change",()=>v(c.files?.[0])),r.addEventListener("wheel",b=>{t&&(b.preventDefault(),l({...o,zoom:pe(o.zoom*(1-b.deltaY*Hd),cn,ds)}),d())},{passive:!1}),r.addEventListener("pointerdown",b=>{if(!t)return;r.setPointerCapture(b.pointerId);let G={...o},ct=r.getBoundingClientRect(),io=ao=>{if(!t)return;let V=Math.max(ct.width/t.naturalWidth,ct.height/t.naturalHeight)*o.zoom;l({...o,x:G.x-(ao.clientX-b.clientX)/(t.naturalWidth*V),y:G.y-(ao.clientY-b.clientY)/(t.naturalHeight*V)})};r.addEventListener("pointermove",io),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",io),{once:!0})});let F=s("div",{class:le("cropper"),attrs:{tabindex:"0"},on:{paste:b=>v([...b.clipboardData?.files??[]].find(G=>G.type.startsWith("image/"))),dragover:b=>b.preventDefault(),drop:b=>{b.preventDefault(),v(b.dataTransfer?.files[0])}}},s("div",{class:le("stage")},r),s("div",{class:le("controls")},wt("",b=>b.trim()&&void m(b.trim(),!0),"https://\u2026 or data:image/\u2026","url"),s("div",{class:le("buttons")},N("Choose file",()=>c.click()),N("Reset crop",()=>{l({x:.5,y:.5,zoom:cn}),d()}),N("Clear",()=>{t=null,e.classList.remove(le("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),a.replaceChildren(),O.store.avatarUrl="",O.store.avatarSource=""},"danger")),a,i,c));return e.append(F),O.store.avatarSource&&m(O.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var ps=`/*
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
`;var Ut="data-bloom-csi-avatar",Tr="data-bloom-csi-sized",As="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",Kd=32,O=g({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>fs(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),gs=[];function ys(e){e.removeAttribute(Ut),e.removeAttribute(Tr)}function hs(e){return(O.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function bs(e=[]){if(!H(e))return;let t=O.store.displayName.trim()||null,o=!!O.store.avatarUrl,n=new Set(t?hs("name"):[]);for(let i of document.querySelectorAll(As))n.has(i)||Te(i,null);for(let i of n)Te(i,t);let r=new Set(o?hs("avatar"):[]);for(let i of document.querySelectorAll(`[${Ut}]`))r.has(i)||ys(i);for(let i of r)i.hasAttribute(Ut)||i.setAttribute(Ut,""),i.toggleAttribute(Tr,!i.closest('[role="menu"]'))}function Wd(){let e=O.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${O.store.avatarSize}px}:is(${u.rail}, ${u.oldRail}) [${Tr}]{--bloom-csi-size:${Kd}px}`:""}var vs=p({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:O,styles:()=>`${Wd()}
${ps}`,start(){gs=[te(),B(bs)]},stop(){for(let e of gs)e();for(let e of document.querySelectorAll(`[${Ut}]`))ys(e);for(let e of document.querySelectorAll(As))Te(e,null)},onSettingsChange(){bs()}});var rt=T("bloom-greeting-"),qs=30,Ss=100;function xs(e){let t=-1,o=s("textarea",{class:`bloom-input ${rt("input")}`,attrs:{maxlength:String(Ss),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=N("Add",i),r=s("div",{class:rt("list")});function i(){let l=o.value.trim().slice(0,Ss);if(!l)return;let d=[...E.store.greetings];t>=0?d[t]=l:d.length<qs&&d.push(l),E.store.greetings=d,t=-1,o.value="",a()}function a(){let{greetings:l}=E.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&l.length>=qs,r.replaceChildren(...l.length?l.map((d,m)=>s("div",{class:rt("row",m===t?"row-editing":"row-idle")},s("div",{class:rt("text"),text:d}),K("edit","Edit",()=>{t=m,o.value=d,o.focus(),a()}),K("trash","Delete",()=>{E.store.greetings=l.filter((v,F)=>F!==m),t===m&&(t=-1),a()}))):[s("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),e.append(s("div",{class:rt("editor")},r,s("div",{class:rt("form")},o,n))),a();let c=Fe((l,d)=>l==="GreetingCustomizer"&&d==="greetings"&&a());return()=>{c(),e.replaceChildren()}}var ws=`/*
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
`;var mn="data-bloom-greeting",zd=1e3,Jd=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],E=g({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>xs(e)},greetings:{type:"custom",default:Jd},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),un,Es=[],Cr,Ft=()=>Mo()&&!Lo(),Vd=e=>e.replaceAll(/\s*\n\s*/g," ").trim(),Cs=()=>E.store.greetings.filter(e=>typeof e=="string"&&e.trim());function Qt(){let e=Cs();if(e.length)if(E.store.order==="random"&&e.length>1){let t=E.store.lastRandom;for(;t===E.store.lastRandom;)t=Math.floor(Math.random()*e.length);E.store.lastRandom=t,E.store.index=t}else E.store.index=(E.store.index+1)%e.length}function Zd(){return Ft()?Q(u.homeHeading):null}function dn(){for(let e of document.querySelectorAll(`[${mn}]`))e.removeAttribute(mn),Te(e,null)}function fn(){for(let e of document.querySelectorAll("[data-bloom-placeholder]"))e.removeAttribute("data-bloom-placeholder")}function Ts(e){let t=he(),o=Vd(e);if(!t||!o||C(t)){fn();return}t.getAttribute("data-bloom-placeholder")!==o&&t.setAttribute("data-bloom-placeholder",o)}function Yt(){let e=Cs(),t=Yi(),o=Ft();if(!e.length||!t&&!o){dn(),fn();return}if(t){dn(),Ts(e[0]??"");return}let n=Zd();n?((E.store.index<0||E.store.index>=e.length)&&Qt(),n.setAttribute(mn,""),Te(n,e[Math.max(0,E.store.index)%e.length]??"")):dn(),E.store.heroOnlyOutsideProject?fn():Ts(e[Math.max(0,E.store.index)%e.length]??"")}function Mr(){clearInterval(un),un=void 0,E.store.mode==="interval"&&Ft()&&(un=setInterval(()=>{Qt(),Yt()},E.store.intervalSec*zd))}function Xd(e){E.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${mn}]`)||getSelection()?.toString()||(Qt(),Yt())}function $d(){Ft()&&E.store.mode==="refresh"&&Qt(),Mr(),Yt()}var Ms=p({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:E,styles:ws,start(){Cr=new AbortController,document.addEventListener("click",Xd,{signal:Cr.signal}),Ft()&&E.store.mode==="refresh"&&Qt(),Mr(),Es=[B(e=>H(e)&&Yt()),be($d)]},stop(){Cr?.abort();for(let e of Es)e();clearInterval(un),dn(),fn()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&Mr(),Yt()}});var Kt=T("bloom-history-"),Lr=10,_d=3e3;function Ls(e){let t="",o=0,n=new Set,r=s("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),i=s("div",{class:Kt("list")}),a=s("div",{class:Kt("pager")}),c,l=N("Clear all",()=>{if(!c){l.textContent="Click again to clear",c=setTimeout(()=>{c=void 0,l.textContent="Clear all"},_d);return}clearTimeout(c),c=void 0,l.textContent="Clear all",Wt([])},"danger");function d(){let v=[...Pe.store.entries].toReversed(),F=t.trim().toLowerCase(),b=F?v.filter(V=>V.toLowerCase().includes(F)):v,G=Math.max(1,Math.ceil(b.length/Lr));o=Math.min(o,G-1);let ct=b.slice(o*Lr,(o+1)*Lr).map(V=>s("div",{class:Kt("row")},s("button",{class:Kt("text",n.has(V)?"text-open":"text-closed"),text:V,title:n.has(V)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{n.delete(V)||n.add(V),d()}}}),K("copy","Copy",()=>void ei(V)),K("trash","Delete",()=>Wt(Pe.store.entries.filter(Bl=>Bl!==V)))));i.replaceChildren(...ct.length?ct:[s("div",{class:"bloom-muted",text:F?"No matching prompts.":"No saved prompts yet."})]),a.replaceChildren(s("span",{class:"bloom-muted",text:`${b.length} ${F?"matching":"saved"} \xB7 page ${o+1} of ${G}`}),N("Previous",()=>{o--,d()}),N("Next",()=>{o++,d()}),l);let[io,ao]=a.querySelectorAll("button");io.disabled=o===0,ao.disabled=o>=G-1,l.disabled=!v.length}r.addEventListener("input",()=>{t=r.value,o=0,d()}),e.append(s("div",{class:Kt("manager")},r,i,a)),d();let m=Fe((v,F)=>v==="InputHistory"&&F==="entries"&&d());return()=>{m(),clearTimeout(c),e.replaceChildren()}}var ks=`/*
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
`;var tm=T("bloom-history-"),om=2e3,Pe=g({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>Ls(e)},entries:{type:"custom",default:[]}}),j=null,kr={text:"",at:0},De=null,Br,pn=()=>Pe.store.entries.filter(e=>typeof e=="string");function Wt(e){Pe.store.entries=e.slice(-Pe.store.maxEntries)}function Ir(e){let t=e.trim();if(!t)return;let o=Date.now();t===kr.text&&o-kr.at<om||(kr={text:t,at:o},Wt([...pn().filter(n=>n!==t),t]))}function nm(e,t){let o=he();if(!o)return;De??=s("div",{class:`bloom-root ${tm("hud")}`,attrs:{"data-bloom":"history-hud","aria-live":"polite"}}),De.textContent=`${e+1} / ${t}`;let n=(o.closest("form")??o).getBoundingClientRect();De.style.left=`${n.left+n.width/2}px`,De.style.top=`${n.top}px`,De.isConnected||document.body.append(De)}function jt(){j=null,De?.remove()}function rm(e){let t=pn();if(!j)return;let o=t[e];j.index=e,j.shown=o,_(o),nm(t.length-1-e,t.length)}function im(e){let t=pn();if(!t.length)return!1;if(!j){if(e===1)return!1;j={index:t.length,draft:C(),shown:""}}let o=j.index+e;return o<0?!0:o>=t.length?(_(j.draft),jt(),!0):(rm(o),!0)}function am(e){if(e.isComposing||!At(e.target))return;let t=e.target;if(e.key==="Enter"&&!e.shiftKey){Ir(C(t)),jt();return}if(e.key==="Escape"&&j){_(j.draft),jt(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey)return;let o=Mi(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!j||im(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function sm(e){j&&At(e.target)&&C(e.target)!==j.shown.trim()&&jt()}function lm(e){e.target instanceof Element&&e.target.closest(u.sendButton)&&Ir(C())}var Bs=p({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:Pe,styles:ks,start(){Br=new AbortController;let{signal:e}=Br;document.addEventListener("keydown",am,{capture:!0,signal:e}),document.addEventListener("input",sm,{capture:!0,signal:e}),document.addEventListener("click",lm,{capture:!0,signal:e}),document.addEventListener("submit",()=>Ir(C()),{capture:!0,signal:e})},stop(){Br?.abort(),jt()},onSettingsChange(e){e==="maxEntries"&&Wt(pn())}});var Is=`/*
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
`;var um=1500,dm=5e3,mm=2e3,it=g({showDate:{type:"boolean",description:"Show the date for messages not sent today.",default:!0},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),hn=new Map,Ps=0,bn,Os=[];function Ds(e,t){hn.get(e)!==t&&(hn.set(e,t),clearTimeout(bn),bn=setTimeout(Hs,mm))}function Hs(){let e={...it.store.stamps,...Object.fromEntries(hn)};it.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,um))}function fm(e){let t=$(h())?.times;for(let o=e.length-1;o>=0;o--){let n=hn.get(e[o])??t?.get(e[o])??it.store.stamps[e[o]];if(n)return n}return null}var pm=()=>L().generating||Date.now()-Ps<dm;function gm(e){let t=new Date(e),o=new Date,n={hour:"2-digit",minute:"2-digit"};if(!it.store.showDate||t.toDateString()===o.toDateString())return t.toLocaleTimeString(void 0,n);let r=t.getFullYear()===o.getFullYear()?{}:{year:"numeric"};return t.toLocaleString(void 0,{...r,month:"short",day:"numeric",...n})}function Rs(e){let t=Bo(e)??e.getAttribute("data-message-author-role")??e.closest(u.turn)?.getAttribute("data-turn")??e.querySelector(u.authorRole)?.getAttribute("data-message-author-role");if(Qn(t))return t;let o=vt(e).at(-1);return $(h())?.chain.find(n=>n.id===o)?.role??null}function hm(e){let t=vt(e);if(!t.length||!ie(e)||e.querySelector("time:not([data-bloom])"))return;let o=fm(t);!o&&pm()&&(o=Date.now(),Ds(t.at(-1),o));let n=e.querySelector(':scope > time[data-bloom="timestamp"]');if(!o||it.store.hideOwnMessages&&Rs(e)==="user"){n?.remove();return}let r=gm(o);if(n?.textContent===r)return;let i=s("time",{class:`bloom-timestamp bloom-timestamp-${Rs(e)??"assistant"}`,text:r,title:new Date(o).toLocaleString(),attrs:{"data-bloom":"timestamp",datetime:new Date(o).toISOString()}});n?n.replaceWith(i):e.prepend(i)}var gn=Qe(()=>{for(let e of Kn())hm(e)}),Ns=p({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:it,styles:Is,start(){Os=[B(e=>H(e)&&gn()),U.on("conversation",gn),U.on("message-time",({messageId:e,time:t})=>{Ds(e,t),gn()}),y.on("fall",()=>{Ps=Date.now()})]},stop(){for(let e of Os)e();bn&&(clearTimeout(bn),Hs());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();gn()}}});var bm=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])'],Am=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],Gs=g({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),Us=p({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:Gs,styles:()=>Ue([...bm,...Gs.store.hideDictationSettings?Am:[]])});var He="data-bloom-share",ym=/^\/g\/g-p-/,vm=/^(?:share|分享)$/i,qm=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],Sm=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${He}="project"]`],Or=g({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),An,Rr=!1;function xm(e){if(!H(e))return;let t=ym.test(location.pathname)&&!h();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${He}]`))!t||!vm.test(x(o.textContent??""))?o.removeAttribute(He):o.hasAttribute(He)||o.setAttribute(He,"project")}var Ys=p({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:Or,styles:()=>Ue([...Or.store.hideShareChat?qm:[],...Or.store.hideShareProject?Sm:[]]),start(){Rr=!0,yt().then(()=>{Rr&&!An&&(An=B(xm))})},stop(){Rr=!1,An?.(),An=void 0;for(let e of document.querySelectorAll(`[${He}]`))e.removeAttribute(He)}});var Fs='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',wm='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',Em="[data-bloom-profile-plan]",Qs="visibility:hidden!important;user-select:none!important",Ws=g({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function Tm(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=Ws.store,r=[];return e&&r.push(n?`:is(${Fs}){display:none!important}`:`:is(${Fs}){${Qs}}`),t&&r.push(`:is(${wm}){${Qs}}`),e&&o&&r.push(`${Em}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var Ks,js=p({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Ws,styles:Tm,start(){Ks=te()},stop(){Ks?.()}});var Cm="model-switcher-dropdown-button",zs=e=>e.startsWith("model-switcher-")&&e!==Cm?e.slice(15):"",zt=(e,t)=>e.id===t.id||!!e.label&&e.label===t.label;function Js(){let e=Ce();return(e&&Q(u.modelTrigger,e))??Q(u.modelTrigger)}function oe(){let e=Js();if(!e)return null;let t=x(e.innerText),o=zs(e.getAttribute("data-testid")??"")||t;return o?{id:o,label:t||o}:null}function Mm(e){return[...document.querySelectorAll(u.modelItem)].find(t=>{let o=zs(t.getAttribute("data-testid")??""),n=x(t.textContent??"");return o===e.id||n===e.label||n===e.id})??null}function yn(e){let t=oe();if(t&&zt(t,e))return!0;let o=Mm(e);if(o){o.click();let r=oe();return!!r&&zt(r,e)}let n=Js();return n?.getAttribute("aria-expanded")!=="true"&&n?.click(),!1}var Vs=`/*
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
`;var R=T("bloom-queue-"),km=6,Bm=8,W=null,Jt="",at=!1,st=!1;function Pr(e,t,o){let n=K(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute(ae),n.addEventListener("mouseenter",()=>Zs(t)),n.addEventListener("mouseleave",()=>Zs("")),n}function Zs(e){let t=W?.querySelector(`.${R("tip")}`);t&&(t.textContent=e)}function Im(e,t,o,n){st=!0;let r=s("textarea",{class:`bloom-input ${R("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=new AbortController,a=c=>{i.abort(),st=!1,Jt="",c?n.edit(t,r.value):r.replaceWith(s("div",{class:R("text"),text:o}))};addEventListener("keydown",c=>{if(!(c.target!==r||c.isComposing)){if(c.key==="Enter"&&!c.shiftKey)a(!0);else if(c.key==="Escape")a(!1);else return;c.preventDefault(),c.stopImmediatePropagation()}},{capture:!0,signal:i.signal}),r.addEventListener("keydown",c=>c.stopPropagation(),{signal:i.signal}),r.addEventListener("blur",()=>a(!0),{signal:i.signal}),e.querySelector(`.${R("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function Om(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,a=l=>{!i&&Math.abs(l.clientY-n.clientY)<km||(i||(i=st=!0,e.classList.add(R("dragging"))),e.style.transform=`translateY(${l.clientY-n.clientY}px)`)},c=l=>{if(removeEventListener("pointermove",a),!i)return;st=!1,Jt="";let m=[...r.children].filter(v=>v!==e).filter(v=>v.getBoundingClientRect().top+v.getBoundingClientRect().height/2<l.clientY).length;o.move(t,m)};addEventListener("pointermove",a),addEventListener("pointerup",c,{once:!0})})}function Rm(e,t,o,n){let r=s("li",{class:R("row")},s("div",{class:R("text"),text:e.text}),n&&e.label?s("span",{class:R("model"),title:e.label,text:e.label}):null,s("div",{class:R("actions")},Pr("trash","Remove from queue",()=>o.remove(t)),Pr("edit","Edit",()=>Im(r,t,e.text,o)),Pr("send","Send now",()=>o.sendNow(t))));return Om(r,t,o),r}function Pm(e){if(!W)return;let t=e.getBoundingClientRect();W.style.left=`${t.left}px`,W.style.width=`${t.width}px`,W.style.bottom=`${innerHeight-t.top+Bm}px`}function Dr(){W?.remove(),W=null,Jt="",st=!1}function lt(e,t,o=!0){let n=Ce();if(!e.length||!ht(n)){Dr();return}W||(W=s("div",{class:`bloom-root ${R("tray")}`,attrs:{"data-bloom":"queue"}},s("div",{class:R("header")},s("button",{class:R("toggle"),attrs:{type:"button","aria-expanded":String(!at)},on:{click:a=>{at=!at,W?.classList.toggle(R("collapsed"),at),a.currentTarget.setAttribute("aria-expanded",String(!at))}}},s("span",{class:R("count")}),P("chevron")),s("span",{class:R("tip")})),s("ol",{class:R("list")})),W.classList.toggle(R("collapsed"),at),document.body.append(W)),Pm(n);let r=JSON.stringify([o,...e.map(a=>[a.text,o?a.label:""])]);if(st||r===Jt)return;Jt=r;let i=W.querySelector(`.${R("count")}`);i&&(i.textContent=so(e.length,"Queued message")),W.querySelector(`.${R("list")}`)?.replaceChildren(...e.map((a,c)=>Rm(a,c,t,o)))}var Dm=new S("PromptQueue"),Hm=8,Zt=150,qn=20,Sn="BloomPromptQueue",z=g({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1},showQueueMode:{type:"boolean",description:"Show the model that was selected when each message was queued.",default:!0},stickyOnNavigate:{type:"boolean",description:"Keep the selected model when switching chats.",default:!0},persistAcrossRefresh:{type:"boolean",description:"Restore unsent queued messages in this tab after a refresh.",default:!0}}),ce=new Map,xn=!1,Ne=null,vn,Xs=[],ue=null,de=!1,Hr,wn="draft",Nr=()=>h()??wn,J=()=>ce.get(Nr())??[],Ur=e=>({id:e.model||e.label,label:e.label||e.model});function Nm(e){return typeof e=="string"?e.trim()?{text:e,model:"",label:""}:null:!w(e)||typeof e.text!="string"||!e.text.trim()?null:{text:e.text,model:typeof e.model=="string"?e.model:"",label:typeof e.label=="string"?e.label:""}}function Gm(){if(!z.store.persistAcrossRefresh){sessionStorage.removeItem(Sn);return}let e=Se(sessionStorage.getItem(Sn)??"");if(w(e))for(let[t,o]of Object.entries(e)){if(!Array.isArray(o))continue;let n=o.map(Nm).filter(r=>r!=null);n.length&&ce.set(t,n)}}function Gr(){try{if(!z.store.persistAcrossRefresh){sessionStorage.removeItem(Sn);return}sessionStorage.setItem(Sn,JSON.stringify(Object.fromEntries([...ce].filter(([e])=>e!==wn))))}catch(e){Dm.warn("Could not save the queue",e)}}function Ge(e){e.length?ce.set(Nr(),e):ce.delete(Nr()),Gr(),lt(J(),Vt,z.store.showQueueMode)}function Um(e){if(!e.model&&!e.label)return!0;let t=oe();return t?zt(t,Ur(e)):!0}function _s(e,t=0){t>=qn||L().generating||C()!==e||(qo(),setTimeout(()=>_s(e,t+1),Zt))}function Ym(e,t){let o=z.store.stickyOnNavigate&&ue?ue:e;if(!o||!t.model&&!t.label||zt(o,Ur(t))){de=!1;return}de=!0,setTimeout(()=>{yn(o),de=!1},Zt)}function Xt(e,t=0){if(L().generating||C()){t<qn&&setTimeout(()=>Xt(e,t+1),Zt);return}if(!Um(e)&&t<qn){de=!0,yn(Ur(e)),setTimeout(()=>Xt(e,t+1),Zt);return}let o=oe();_(e.text),bt(()=>_s(e.text)),Ym(o,e)}function $s(){if(Ne!=null){let o=Ne;Ne=null,Xt(o);return}if(!xn||L().generating||C())return;let[e,...t]=J();e!=null&&(xn=!1,Ge(t),Xt(e))}function el(e){let t=J(),o=t[e];if(o!=null){if(Ge(t.filter((n,r)=>r!==e)),!L().generating){Xt(o);return}Ne=o,Ke()?.click()}}var Vt={remove:e=>Ge(J().filter((t,o)=>o!==e)),edit:(e,t)=>Ge(t.trim()?J().map((o,n)=>n===e?{...o,text:t}:o):J().filter((o,n)=>n!==e)),sendNow:el,move(e,t){let o=[...J()],[n]=o.splice(e,1);n&&(o.splice(t,0,n),Ge(o))}};function Fm(e){let t=oe(),o={text:e,model:t?.id??"",label:t?.label??""},n=J();return z.store.replacePending&&n.length?(Ge([...n.slice(0,-1),o]),!0):n.length>=Hm?!1:(Ge([...n,o]),!0)}function Qm(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!At(e.target)||!L().generating)return;let t=C(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;let o=oe();_(""),Ne={text:t,model:o?.id??"",label:o?.label??""},Ke()?.click();return}if(!t){J().length&&el(0);return}Fm(t)&&_("")}function Km(){if(de||!z.store.stickyOnNavigate)return;let e=oe();e&&(ue=e)}function Wm(){if(!z.store.stickyOnNavigate||!ue)return;de=!0;let e=0,t=()=>{if(!ue||yn(ue)||e>=qn){de=!1;return}e++,Hr=setTimeout(t,Zt)};clearTimeout(Hr),t()}function jm(e){let{target:t}=e;!(t instanceof Element)||de||t.closest(`${u.modelTrigger}, ${u.modelItem}`)&&setTimeout(Km,0)}var tl=p({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:z,styles:Vs,start(){vn=new AbortController,Gm(),ue=oe(),document.addEventListener("keydown",Qm,{capture:!0,signal:vn.signal}),document.addEventListener("pointerup",jm,{signal:vn.signal}),Xs=[y.on("fall",({outcome:e})=>{xn=e==="done",e==="left"&&(Ne=null),$s()}),y.on("context",({prevId:e,id:t,migrated:o})=>{let n=ce.get(wn);ce.delete(wn),o&&!e&&t&&n&&ce.set(t,n),o||(xn=!1,Wm()),Gr(),lt(J(),Vt,z.store.showQueueMode)}),y.on("tick",()=>{$s(),lt(J(),Vt,z.store.showQueueMode)})],lt(J(),Vt,z.store.showQueueMode)},stop(){vn?.abort(),clearTimeout(Hr);for(let e of Xs)e();Dr(),ce.clear(),Ne=null,ue=null,de=!1},onSettingsChange(e){e==="persistAcrossRefresh"&&Gr(),e==="stickyOnNavigate"&&z.store.stickyOnNavigate&&(ue=oe()),lt(J(),Vt,z.store.showQueueMode)}});var zm=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function Jm(){let e=x(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!zm.has(e.toLowerCase())?e:null}function $t(e){return e?$(e)?.title??ma(e)??(e===h()?Jm():null):null}var ol=`/*
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
`;var me=T("bloom-recent-"),fe="home",Zm=50,nl=140,Xm=new Set(["Backquote"]),$m=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),q=g({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),qe=null,ne=[],re=0,Yr,rl=[],Cn=()=>Lo()?null:h()??(Mo()?fe:null);function il(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function sl(e){let t=$t(e);t&&q.store.titles[e]!==t&&(q.store.titles={...q.store.titles,[e]:t});let o=fa(location.href);o&&e===h()&&q.store.projects[e]!==o&&(q.store.projects={...q.store.projects,[e]:o})}function al(e){if(!e)return;let t=[e,...q.store.visits.filter(n=>n!==e)].slice(0,Zm),o=new Set(t);q.store.visits=t,Object.keys(q.store.previews).some(n=>!o.has(n))&&(q.store.previews=il(q.store.previews,o)),Object.keys(q.store.titles).some(n=>!o.has(n))&&(q.store.titles=il(q.store.titles,o)),e!==fe&&sl(e)}function En(e){if(!e||!q.store.visits.includes(e))return;let t={},o=$(e)?.chain??[];for(let r of o)t[r.role]=ge(Ro(r),nl);if(e===h())for(let r of Io()){let i=Oo(r);i&&(t[r.role]=ge(i,nl))}let n=q.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(q.store.previews={...q.store.previews,[e]:t})}function _m(){let e=Number(q.store.maxRecent);return q.store.visits.filter(t=>t!==fe||q.store.includeHome).slice(0,e)}function Fr(e){if(_t(),e===Cn())return;let t=e===fe?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"]'):Et(e)[0];t?t.click():location.assign(e===fe?"/":`/c/${e}`)}function ef(e,t){let o=e===fe?"New chat":q.store.titles[e]??$t(e)??"Untitled chat",n=e===fe?null:q.store.projects[e],r=e===fe?null:q.store.previews[e];return s("button",{class:me("item"),attrs:{type:"button",role:"option","aria-selected":String(t===re)},on:{click:()=>Fr(e),mousemove:()=>t!==re&&Tn(t)}},s("div",{class:me("head")},s("span",{class:`${me("title")} bloom-truncate`,text:o}),n&&s("span",{class:me("project"),text:n})),r?.user&&s("div",{class:`${me("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&s("div",{class:`${me("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function Tn(e){re=(e+ne.length)%ne.length,qe?.querySelectorAll(`.${me("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===re)))}function tf(){En(h());let e=Cn();ne=_m(),e&&(ne=[e,...ne.filter(t=>t!==e)].slice(0,Number(q.store.maxRecent))),ne.length&&(re=ne.length>1?1:0,qe=s("div",{class:`bloom-root ${me("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:t=>t.target===t.currentTarget&&_t()}},s("div",{class:me("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...ne.map(ef))),document.body.append(qe))}function _t(){qe?.remove(),qe=null}var of=e=>Xm.has(e.code)||$m.has(e.key);function nf(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&of(e)){e.preventDefault(),e.stopPropagation(),qe?Tn(re+(e.shiftKey?-1:1)):tf();return}if(!qe)return;let o={Escape:_t,Enter:()=>Fr(ne[re]),ArrowDown:()=>Tn(re+1),ArrowUp:()=>Tn(re-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function rf(e){qe&&e.key==="Control"&&Fr(ne[re])}var ll=p({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:q,styles:ol,start(){Yr=new AbortController;let{signal:e}=Yr;addEventListener("keydown",nf,{capture:!0,signal:e}),addEventListener("keyup",rf,{capture:!0,signal:e}),addEventListener("blur",_t,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&En(h()),{signal:e}),rl=[be(({prevId:i})=>{En(i),al(Cn())}),U.on("conversation",({id:i})=>{q.store.visits.includes(i)&&sl(i),En(i)})];let{visits:t,titles:o,previews:n}=q.store,r=t.filter(i=>i!==fe&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(q.store.visits=t.filter(i=>!r.includes(i))),al(Cn())},stop(){Yr?.abort();for(let e of rl)e();_t()}});var Qr="data:audio/mpeg;base64,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";var cl=new S("ResponseNotification"),af=.5,sf=200,lf=300,eo=g({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:e=>(e.append(N("Preview",fl)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),ul=null,Kr=new Map,dl,Wr;function cf(e){return new Promise((t,o)=>GM_xmlhttpRequest({url:e,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=sf&&n<lf?t(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var uf=e=>Uint8Array.from(atob(e.slice(e.indexOf(",")+1)),t=>t.charCodeAt(0)).buffer;function df(e,t){let o=Kr.get(t);return o||(o=(t.startsWith("data:")?Promise.resolve(uf(t)):cf(t)).then(n=>e.decodeAudioData(n)),o.catch(()=>Kr.delete(t)),Kr.set(t,o)),o}async function ml(e){ul??=new AudioContext;let t=ul;t.state==="suspended"&&t.resume();let o=t.createBufferSource(),n=t.createGain();o.buffer=await df(t,e),n.gain.value=af,o.connect(n).connect(t.destination),o.start()}function fl(){let e=eo.store.soundUrl.trim();ml(e||Qr).catch(t=>{cl.warn("Sound failed",t),e&&ml(Qr).catch(o=>cl.warn("Default chime failed",o))})}function mf(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function ff(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(Wr=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:Wr.signal}))}var pl=p({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:eo,start(){ff(),dl=y.on("fall",({conversationId:e,outcome:t})=>{t==="done"&&(eo.store.onlyWhenHidden&&!document.hidden||(eo.store.sound&&fl(),eo.store.browserNotification&&mf($t(e))))})},stop(){dl?.(),Wr?.abort()}});var pf=`:is(${u.sidebarScroll}, :has(> ${u.sidebarScroll})) + :has(${u.menuButton})`,gf=`${u.rail} > :has(${u.menuButton})`,zr=`:is(${pf}, ${gf}, ${u.oldProfile}):not(:hover)`,jr="[data-bloom-profile-avatar]",hf=`:is(${zr}, ${zr} :has(${jr})) > :not(${jr}, :has(${jr}))`,hl=g({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function bf(){let{opacity:e,fadeAvatar:t}=hl.store;return e>=100?"":`${t?zr:hf}{opacity:${e/100}!important}`}var gl,bl=p({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:hl,styles:bf,start(){gl=te()},stop(){gl?.()}});var Al=`/*
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
`;var to=T("bloom-star-chats"),yf=40,oo=g({chats:{type:"custom",default:[]}}),Jr,Vr=!1;function no(){let e=oo.store.chats;return Array.isArray(e)?e.filter(t=>w(t)&&typeof t.id=="string"&&typeof t.href=="string"&&typeof t.title=="string"&&!!ro(t.href)):[]}function ro(e){try{let t=new URL(e,location.origin);return t.origin!==location.origin||t.searchParams.get("temporary-chat")==="true"||!ee(t.href)?null:`${t.pathname}${t.search}`}catch{return null}}function vf(){let e=[...document.querySelectorAll(u.sidebarScroll)].filter(o=>!o.closest("[inert]"));if(e.length)return e;let t=[...document.querySelectorAll(`${u.oldSidebar} nav`)];return t.length?t:[...document.querySelectorAll(u.oldSidebar)]}function Mn(){let e=`${u.sidebarScroll} ${u.conversationLink}, ${u.oldSidebar} ${u.conversationLink}`;return[...document.querySelectorAll(e)].filter(t=>!t.closest("[data-bloom]")&&!t.closest("[inert]"))}function vl(e){let t=e.cloneNode(!0);for(let o of t.querySelectorAll("[data-bloom]"))o.remove();return x(t.textContent??"")}function qf(e){let t=e.parentElement,o=e.closest(u.sidebarScroll)??e.closest(u.oldSidebar);return!t||t===o?e:[...t.querySelectorAll(u.conversationLink)].filter(r=>!r.closest("[data-bloom]")).length===1?t:e}function ql(e,t){return s("button",{class:to("-star"),attrs:{type:"button","data-bloom":"chat-star","aria-pressed":String(t),"aria-label":t?"Unstar chat":"Star chat"},on:{click:n=>{n.preventDefault(),n.stopPropagation();let r=Mn().find(i=>ee(i.href)===e);r?xf(r):oo.store.chats=no().filter(i=>i.id!==e)}}},P("star"))}function Sf(e,t){e.setAttribute("aria-pressed",String(t)),e.setAttribute("aria-label",t?"Unstar chat":"Star chat")}function xf(e){let t=ee(e.href),o=t?ro(e.href):null;if(!t||!o)return;let n=no();oo.store.chats=n.some(r=>r.id===t)?n.filter(r=>r.id!==t):[{id:t,href:o,title:vl(e)||"Untitled chat"},...n].slice(0,yf)}function wf(e,t){if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.target instanceof Element&&e.target.closest("[data-bloom='chat-star']"))return;let o=Mn().find(n=>ee(n.href)===t);o&&(e.preventDefault(),o.click())}function Ef(){let e=!1,t=no().map(o=>{let n=Mn().find(a=>ee(a.href)===o.id);if(!n)return o;let r=vl(n),i=ro(n.href);return!r||!i||r===o.title&&i===o.href?o:(e=!0,{...o,title:r,href:i})});e&&(oo.store.chats=t)}function Tf(){let e=new Set(no().map(t=>t.id));for(let t of Mn()){let o=ee(t.href),n=o?ro(t.href):null,r=qf(t),i=r.querySelector(':scope > [data-bloom="chat-star"]');if(!o||!n||!ie(t)){i?.remove();continue}let a=e.has(o);i?Sf(i,a):r.append(ql(o,a))}}function Cf(e,t){let o=[...e.children].find(n=>n instanceof HTMLAnchorElement&&(n.getAttribute("href")==="/"||n.dataset.testid==="create-new-chat-button"));o?o.after(t):e.prepend(t)}function Mf(){let e=no(),t=new Set,o=e.map(n=>`${n.id}	${n.title}	${n.href}`).join(`
`);for(let n of vf()){if(!ie(n))continue;let r=[...n.children].find(i=>i instanceof HTMLElement&&i.dataset.bloom==="starred");if(!e.length){r?.remove();continue}r||(r=s("div",{class:`bloom-root ${to("")}`,attrs:{"data-bloom":"starred"}}),Cf(n,r)),t.add(r),r.dataset.sig!==o&&(r.dataset.sig=o,r.replaceChildren(s("div",{class:to("-label"),text:"Starred"}),...e.map(i=>s("a",{class:to("-link"),attrs:{href:ro(i.href)??i.href},on:{click:a=>wf(a,i.id)}},s("span",{class:to("-title"),text:i.title||"Untitled chat"}),ql(i.id,!0)))))}for(let n of document.querySelectorAll('[data-bloom="starred"]'))t.has(n)||n.remove()}function yl(){if(!Vr){Vr=!0;try{Ef(),Mf(),Tf()}finally{Vr=!1}}}function Lf(){for(let e of document.querySelectorAll('[data-bloom="chat-star"], [data-bloom="starred"]'))e.remove()}var Sl=p({name:"StarChats",description:"Star a chat in the sidebar and keep it at the top. No three-chat limit.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:oo,styles:Al,onSettingsChange(e){e==="chats"&&yl()},start(){Jr=B(e=>H(e)&&yl())},stop(){Jr?.(),Jr=void 0,Lf()}});var kf="filter:blur(6px)!important;transition:filter 0.2s ease",xl=`:is(${u.sidebars})`,Bf={conversations:{selectors:[`${xl} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0},projects:{selectors:[`${xl} a:is([href*="/project"], [href*="/g/g-p-"])`,"[data-app-action-sidebar-project-row]",".bloom-recent-project"],hover:!0},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}},El=g({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function If(){return Object.entries(Bf).filter(([e])=>El.store[e]).map(([,{selectors:e,hover:t}])=>{let o=e.join(",");return`:is(${o}){${kf}}`+(t?`:is(${o}):hover, .bloom-recent-item:hover :is(${o}){filter:none!important}`:"")}).join(`
`)}var wl,Tl=p({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:El,styles:If,start(){wl=te()},stop(){wl?.()}});var Of=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],Rf=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",Pf='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',Cl=g({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function Df(){let e=`${Cl.store.width}rem`;return`:is(${Rf}){${Of.map(t=>`${t}:${e}!important`).join(";")}}:is(${Pf}){max-width:min(100%, ${e})!important}`}var Ml=p({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:Cl,styles:Df});var Hf=[Ta,Na,Ya,$a,es,os,us,vs,Ms,Bs,Ns,Us,Ys,js,tl,ll,pl,bl,Sl,Tl,Ml],Zr=Hf;var Nf=new S("Bloom"),Ll="2.0.55";async function Xr(){Hi();for(let e of Zr)e.updatedAt=ea[e.name];bi(Zr),await mi(),lo("base",xi),_i(),bo("Init"),wo().then(()=>{ri(),bo("DOMContentLoaded")}),await Gi(),bo("HostReady"),Nf.info(`Bloom++ ${Ll} ready`)}var kl=new S("Boot");if(window===window.top){let e=Z.Bloom;e&&kl.warn("Replacing another Bloom++ instance",e.VERSION),Object.defineProperty(Z,"Bloom",{value:$r,configurable:!0,writable:!0}),Xr().catch(t=>kl.error("Startup failed",t))}})();
