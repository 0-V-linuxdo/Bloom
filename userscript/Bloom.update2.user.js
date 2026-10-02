// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.42
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

/* Bloom++ v2.0.42. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var ws=Object.defineProperty;var xs=(e,t)=>{for(var o in t)ws(e,o,{get:t[o],enumerable:!0})};var v=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var ae=(e,t,o)=>Math.min(o,Math.max(t,e)),S=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ir=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,se=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,O=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function kt(e,t){return`${e} ${t}${e===1?"":"s"}`}async function ar(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function ge(e){try{return JSON.parse(e)}catch{return}}var J=typeof unsafeWindow>"u"?window:unsafeWindow;var rr={};xs(rr,{VERSION:()=>vs,init:()=>nr,plugins:()=>Ae});var Es=new v("Styles"),Ze=new Map,sr=new Set,Xe=new Map,jo=!0;function lr(){let e=document.adoptedStyleSheets.filter(t=>!sr.has(t));document.adoptedStyleSheets=[...e,...Ze.values()]}function cr(e){document.readyState==="loading"||e.parentNode===document.head||document.head.append(e)}function Cs(e,t){let o=Xe.get(e);o||(o=document.createElement("style"),o.id=`bloom-style-${e}`,Xe.set(e,o)),o.textContent!==t&&(o.textContent=t),cr(o)}function Rt(e,t){if(jo)try{let o=Ze.get(e);o||(o=new J.CSSStyleSheet,Ze.set(e,o),sr.add(o)),o.replaceSync(t),lr();return}catch(o){Es.warn("Constructed style sheets unavailable, using <style> after parsing",o),jo=!1,Ze.delete(e)}Cs(e,t)}function Jo(e){Ze.delete(e)&&jo&&lr(),Xe.get(e)?.remove(),Xe.delete(e)}function dr(){for(let e of Xe.values())cr(e)}var C=e=>(...t)=>t.map(o=>e+o).join(" "),Ot=(...e)=>e.filter(Boolean).join(" "),Be=e=>e.length?`${e.join(",")}{display:none!important}`:"";function f(e){return e}var Dt=new v("Storage"),Ts="bloompp",Pt="kv",ur=null;function Ms(){return ur??=new Promise((e,t)=>{let o=indexedDB.open(Ts,1);o.onupgradeneeded=()=>{o.result.objectStoreNames.contains(Pt)||o.result.createObjectStore(Pt)},o.onsuccess=()=>e(o.result),o.onerror=()=>t(o.error)}),ur}function mr(e,t){return Ms().then(o=>new Promise((n,r)=>{let i=t(o.transaction(Pt,e).objectStore(Pt));i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)}))}async function Ls(e){if(typeof GM_getValue=="function")try{return await GM_getValue(e)}catch(t){Dt.warn("GM read failed",t);return}}async function Bs(e){try{return await mr("readonly",t=>t.get(e))}catch(t){Dt.warn("IndexedDB read failed",t);return}}function Is(e){try{return localStorage.getItem(e)??void 0}catch{return}}async function pr(e){return Promise.all([Ls(e),Bs(e),Is(e)])}function fr(e,t){typeof GM_addValueChangeListener=="function"&&GM_addValueChangeListener(e,(o,n,r,i)=>{i&&t(r)}),addEventListener("storage",o=>{o.key===e&&t(o.newValue)})}function gr(e,t){let o=JSON.stringify(t);if(typeof GM_setValue=="function")try{GM_setValue(e,t)}catch{GM_setValue(e,o)}try{localStorage.setItem(e,o)}catch(n){Dt.warn("localStorage write failed",n)}mr("readwrite",n=>n.put(o,e)).catch(n=>Dt.warn("IndexedDB write failed",n))}var ks=new v("Settings"),Vo="BloomSettings",Rs=100,Os=["GM","IndexedDB","localStorage"],Ie={plugins:{}},Nt=new Set,Zo=new Set,_e;function br(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=ge(t);return!S(t)||!S(t.plugins)||!Object.keys(t.plugins).length?null:t}var zo=e=>e==null||e===""||(Array.isArray(e)?!e.length:S(e)&&!Object.keys(e).length);function Ds(e){return zo(e)?0:Array.isArray(e)?12+Math.min(e.length,40):S(e)?12+Math.min(Object.keys(e).length,40):3}function Ps(e){let t=0;for(let o of Object.values(e.plugins))if(S(o))for(let[n,r]of Object.entries(o))n!=="enabled"&&(t+=Ds(r));return t}var hr=e=>Object.values(e.plugins).filter(t=>S(t)&&t.enabled===!0).length;function Ns(e){let t=e.map((i,s)=>i&&{candidate:i,index:s,score:Ps(i)}).filter(i=>i!=null).toSorted((i,s)=>s.score-i.score||(i.score?0:hr(s.candidate)-hr(i.candidate))||i.index-s.index);if(!t.length)return null;let[o,...n]=t,r=structuredClone(o.candidate);for(let{candidate:i}of n)for(let[s,c]of Object.entries(i.plugins)){if(!S(c))continue;let l=r.plugins[s]??={};for(let[d,m]of Object.entries(c))d==="enabled"?!("enabled"in l)&&m===!0&&(l.enabled=!0):zo(l[d])&&!zo(m)&&(l[d]=structuredClone(m));Object.keys(l).length||delete r.plugins[s]}return{bag:r,source:Os[o.index]}}async function Ar(){let e=await pr(Vo),t=Ns(e.map(br));t&&(Ie.plugins=t.bag.plugins,ks.info("Loaded settings from",t.source))}var yr=(e,t)=>`${e}
${t}`;function vr(){_e=void 0,Zo.clear(),gr(Vo,Ie)}function Hs(e){let t=br(e);if(!t)return;let o=[];for(let n of new Set([...Object.keys(Ie.plugins),...Object.keys(t.plugins)])){let r=Ie.plugins[n]??={},i=S(t.plugins[n])?t.plugins[n]:{};for(let s of new Set([...Object.keys(r),...Object.keys(i)]))Zo.has(yr(n,s))||JSON.stringify(r[s])===JSON.stringify(i[s])||(i[s]===void 0?delete r[s]:r[s]=i[s],o.push([n,s]))}for(let[n,r]of o)for(let i of Nt)i(n,r)}function Gs(){_e&&(clearTimeout(_e),vr())}var he=(e,t)=>Ie.plugins[e]?.[t];function be(e,t,o){let n=Ie.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,Zo.add(yr(e,t)),clearTimeout(_e),_e=setTimeout(vr,Rs);for(let r of Nt)r(e,t)}function ke(e){return Nt.add(e),()=>void Nt.delete(e)}function Xo(e){return e.type==="component"?void 0:e.default}function g(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>he(t.pluginName,n)??(e[n]&&Xo(e[n])),set:(o,n,r)=>(be(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&he(t.pluginName,o)!==void 0&&be(t.pluginName,o)}};return t}var qr=e=>{let t=()=>{let o=he("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();be("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},Ht=qr("pinnedPlugins"),Gt=qr("starredPlugins");addEventListener("pagehide",Gs);fr(Vo,Hs);var Ut=new v("PluginManager"),Ae=new Map,$e=new Set,Sr=new Set,_o=new Set;function wr(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),Ae.set(t.name,t)}var et=e=>!!e.required||(he(e.name,"enabled")??!!e.enabledByDefault);var $o=e=>`plugin-${e.name}`;function xr(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?Rt($o(e),t):Jo($o(e))}function Er(e){if(!$e.has(e.name))try{xr(e),e.start?.(),$e.add(e.name)}catch(t){Ut.error(`Failed to start ${e.name}`,t)}}function Us(e){if($e.delete(e.name)){Jo($o(e));try{e.stop?.()}catch(t){Ut.error(`Failed to stop ${e.name}`,t)}}}var Cr=e=>e.startAt??"HostReady";function Yt(e){Sr.add(e);for(let t of Ae.values())Cr(t)===e&&et(t)&&Er(t);Ut.info(`${e}: ${[...$e].join(", ")}`)}function Tr(e,t){be(e.name,"enabled",t),t?Sr.has(Cr(e))&&Er(e):Us(e);for(let o of _o)o()}function Mr(e){return _o.add(e),()=>void _o.delete(e)}ke((e,t)=>{let o=Ae.get(e);if(!(!o||t==="enabled"||!$e.has(e)))try{xr(o),o.onSettingsChange?.(t)}catch(n){Ut.error(`Settings change failed for ${e}`,n)}});var Lr=`/*
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

.bloom-switch {
    position: relative;
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    width: 2rem;
    height: 1.25rem;
    border-radius: 9999px;
    background-color: color-mix(in srgb, var(--bloom-fg) 10%, transparent);
    transition: background-color 0.15s ease-out;
}

.bloom-switch[aria-checked="true"] {
    background-color: var(--bloom-accent);
}

.bloom-switch:focus-visible,
.bloom-button:focus-visible,
.bloom-icon-button:focus-visible {
    outline: 2px solid var(--bloom-accent);
    outline-offset: 1px;
}

.bloom-switch::after {
    content: "";
    width: 1rem;
    height: 1rem;
    border-radius: 9999px;
    background: #fff;
    box-shadow: 0 1px 2px #00000029;
    transform: translateX(0.125rem);
    transition: transform 0.15s ease-out;
}

.bloom-switch[aria-checked="true"]::after {
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
`;var Fs=new v("Dom");function a(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var Br=document.createElement("template");function Ir(e){return Br.innerHTML=e.trim(),Br.content.firstElementChild.cloneNode(!0)}var ot=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),ee=(e,t=document)=>[...t.querySelectorAll(e)].find(ot)??null,Ks=16,Qs="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function kr(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([Qs],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function en(e){document.hidden?setTimeout(e,Ks):requestAnimationFrame(e)}function Re(e){let t=!1;return()=>{t||(t=!0,en(()=>{t=!1;try{e()}catch(o){Fs.error("Scheduled task failed",o)}}))}}var Ft=new Set,Kt=[],tt,Ws=Re(()=>{let e=Kt;Kt=[];for(let t of Ft)t(e)});function L(e){return Ft.add(e),tt||(tt=new MutationObserver(t=>{Kt.push(...t),Ws()}),tt.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{Ft.delete(e),!Ft.size&&(tt?.disconnect(),tt=void 0,Kt=[])}}var js=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),Y=e=>!e.length||e.some(t=>!js(t.target));function ye(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size");return}e.getAttribute("data-bloom-text")!==t&&(e.hasAttribute("data-bloom-text")||e.style.setProperty("--bloom-text-size",getComputedStyle(e).fontSize),e.setAttribute("data-bloom-text",t))}var Js=new v("Events");function Qt(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){Js.error(`Listener for ${String(t)} failed`,r)}}}}var u={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]'};var Rr=/[​-‍﻿]/g,Oe=()=>ee(u.composerInput),nt=e=>e instanceof HTMLElement&&e.matches(u.composerInput),rt=(e=Oe())=>e?.closest("form")??document.querySelector(u.oldComposerForm);function F(e=Oe()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(Rr,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(Rr,"").trim()}var zs=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function le(e,t=Oe()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return zs?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function Or(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:s,value:c}=e;return{first:!c.slice(0,i).includes(`
`),last:!c.slice(s).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var Dr=e=>{let t=rt();return(t&&ee(e,t))??ee(e)},Wt=()=>Dr(u.stopButton),Vs=()=>{let e=Dr(u.sendButton);return e&&!e.matches(u.stopButton)?e:null};function Pr(){let e=Vs();if(e){e.disabled||e.click();return}Oe()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var Nr=()=>ot(Wt());var Ur=new v("Network"),Zs=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,Xs=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,Jt=1e3,_s=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),N=Qt(),tn=new Map,Hr=new Map,$s=1,V=e=>e?tn.get(e)??null:null;function jt(e){let t=tn.get(e);return t||tn.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var Yr=e=>e==="user"||e==="assistant";function Fr(e){let t=e.author?.role;if(!e.id||!Yr(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(l=>typeof l=="string").join(`
`).trim(),i=n.filter(l=>S(l)&&l.content_type==="image_asset_pointer").length,s=e.metadata?.attachments,c=Array.isArray(s)&&s.length>0;return!r&&!i&&!c?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*Jt:null,text:r,hasFiles:c,imageCount:i}}var Kr=e=>e.filter((t,o)=>t.role==="user"||e[o+1]?.role!=="assistant");function el(e,t){let o=t.filter(S).map(c=>S(c.message)?c.message:c);for(let c of o)c.id&&c.create_time&&e.times.set(c.id,c.create_time*Jt);let n=o.map(Fr).filter(c=>c!=null),r=new Set(n.map(c=>c.id)),i=e.chain.filter(c=>!r.has(c.id)),s=(n.at(-1)?.createTime??0)<(i[0]?.createTime??0);return e.chain=Kr(s?[...n,...i]:[...i,...n]),e}function tl(e,t){if(!S(t)||!(S(t.mapping)||Array.isArray(t.messages)))return null;let o=jt(e);if(typeof t.title=="string"&&t.title&&(o.title=t.title),Array.isArray(t.messages))return el(o,t.messages);let n=t.mapping;for(let c of Object.values(n)){let l=c.message?.create_time;c.message?.id&&l&&o.times.set(c.message.id,l*Jt)}let r=[],i=new Set,s=typeof t.current_node=="string"?t.current_node:null;for(;s&&!i.has(s)&&n[s];){i.add(s);let c=n[s].message,l=c?Fr(c):null;l&&r.push(l),s=n[s].parent??null}return r.length&&(o.chain=Kr(r.toReversed())),o}function ol(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}function nl(e){if(typeof e?.body!="string")return null;let t=ge(e.body);return S(t)&&typeof t.conversation_id=="string"?t.conversation_id:null}function rl(e,t){if(!S(e))return;typeof e.type=="string"&&_s.has(e.type)&&(t.handoff=!0);let o=S(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(jt(e.conversation_id).title=e.title,N.emit("conversation",jt(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&Yr(n.author?.role)){let r=n.create_time*Jt;t.conversationId&&jt(t.conversationId).times.set(n.id,r),N.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function il(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:s}=await o.read();if(i)break;r+=n.decode(s,{stream:!0});let c=r.split(`
`);r=c.pop()??"";for(let l of c){if(!l.startsWith("data:"))continue;let d=l.slice(5).trim();d&&d!=="[DONE]"&&rl(ge(d),t)}}}async function al(e,t,o){let n={conversationId:t,error:!1,handoff:!1};Hr.set(e,t),N.emit("generate-start",{requestId:e,conversationId:t});try{let r=await o;r.ok?r.headers.get("content-type")?.includes("event-stream")&&await il(r.clone(),n):n.error=!0}catch(r){let i=r instanceof DOMException&&r.name==="AbortError";n.handoff||=i,n.error||=!i}finally{Hr.delete(e),N.emit("generate-end",{requestId:e,...n})}}async function sl(e,t){try{let o=await t;if(!o.ok)return;let n=tl(e,await o.clone().json());n&&N.emit("conversation",n)}catch(o){Ur.debug("Conversation read skipped",o)}}function ll(e,t,o){let n=ol(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&Zs.test(n.pathname)){al($s++,nl(t),o);return}let i=r==="GET"&&n.pathname.match(Xs)?.[1];i&&sl(i,o)}var Gr=!1;function Qr(){if(Gr)return;Gr=!0;let e=J.fetch,t=function(o,n){let r=e.call(this??J,o,n);try{ll(o,n,r)}catch(i){Ur.error("Fetch tap failed",i)}return r};J.fetch=typeof exportFunction=="function"?exportFunction(t,J):t}var cl="__reactContainer$",Wr="__reactFiber$";function zt(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var on=(e,t)=>Object.keys(e.wrappedJSObject??e).some(o=>o.startsWith(t)),De=e=>!on(document,cl)||on(e,Wr);function it(){return document.body?Promise.resolve():new Promise(e=>{let t=new MutationObserver(()=>{document.body&&(t.disconnect(),e())});t.observe(document,{childList:!0,subtree:!0})})}async function jr(){await it();let e=Date.now()+8e3;for(;!on(document.body,Wr)&&Date.now()<e;)await new Promise(t=>setTimeout(t,100))}var dl=new v("Route"),Jr=/\/c\/(?!local-)([\w-]+)/,ul=500,an=e=>{try{return new URL(e,location.origin).pathname.match(Jr)?.[1]??null}catch{return null}},A=()=>location.pathname.match(Jr)?.[1]??null,_t=()=>location.pathname==="/",$t=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",Zt=new Set,Xt=location.href,rn=A(),Vt;function nn(){if(location.href===Xt)return;let e={prevHref:Xt,href:location.href,prevId:rn,id:A()};Xt=e.href,rn=e.id;for(let t of Zt)try{t(e)}catch(o){dl.error("Route listener failed",o)}}function ml(){let e=new AbortController,{navigation:t}=J;t?.addEventListener("currententrychange",()=>queueMicrotask(nn),{signal:e.signal}),addEventListener("popstate",nn,{signal:e.signal});let o=setInterval(nn,ul);return()=>{e.abort(),clearInterval(o)}}function ce(e){return Zt.add(e),Vt||(Xt=location.href,rn=A(),Vt=ml()),()=>{Zt.delete(e),!Zt.size&&(Vt?.(),Vt=void 0)}}var pl=["data-turn","data-message-author-role"],fl=/:(user|assistant)$/,sn=`${u.messageUnit}, ${u.oldMessage}`,ln=e=>e==="user"||e==="assistant",Zr=()=>!!document.querySelector(u.timelineScroll),eo=()=>Zr()?ee(u.timelineScroll):document;function to(){if(Zr())return ee(u.timelineScroll);let e=document.querySelector(u.turn);for(let t=e?.parentElement;t;t=t.parentElement){let{overflowY:o}=getComputedStyle(t);if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight)return t}return document.scrollingElement}var oo=e=>e.getAttribute("data-chatgpt-search-unit-key")?.match(fl)?.[1]??null,Xr=e=>[...e.querySelectorAll(u.searchUnit)].filter(t=>oo(t)&&!t.parentElement?.closest(u.searchUnit)),zr=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function at(e){let t=zr(e);return t.length?t:[...new Set([...e.querySelectorAll(sn)].flatMap(zr))]}function cn(e=eo()){if(!e)return[];let t=Xr(e);return t.length?t:[...e.querySelectorAll(sn)].filter(o=>!o.parentElement?.closest(sn))}function gl(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function hl(e){for(let t of pl){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(ln(o))return o}return e.querySelector(u.markdown)||e.querySelector(u.generatedImage)?"assistant":null}var bl=e=>!e.parentElement?.closest(u.turn);function no(){let e=V(A())?.chain??[],t=[...eo()?.querySelectorAll(u.turn)??[]].filter(bl).flatMap(n=>{let r=Xr(n);return r.length?r.map(i=>({el:i,known:oo(i)})):[{el:n,known:null}]}),{generating:o}=R();return t.map(({el:n,known:r},i)=>{let s=r?at(n):cn(n).flatMap(at),c=r??hl(n)??gl(s,e)??(i%2?"assistant":"user"),l=c==="assistant"&&(n.matches(u.turnBusy)||!!n.querySelector(u.turnBusy)||o&&i===t.length-1);return{el:n,role:c,messageIds:s,streaming:l}})}var Al="[data-bloom], .sr-only",yl=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,Vr=new WeakMap;function ro(e){let t=e.el.textContent?.length??0,o=Vr.get(e.el);if(o?.length===t)return o.summary;let n=vl(e);return Vr.set(e.el,{length:t,summary:n}),n}function vl(e){let t=e.el.querySelectorAll(u.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.querySelector(e.role==="assistant"?u.markdown:".whitespace-pre-wrap")??e.el,i=[...o.querySelectorAll(Al)].map(s=>O(s.textContent??"")).filter(Boolean).reduce((s,c)=>s.replace(c,`
`),o.innerText||o.textContent||"").split(`
`).map(O).filter(s=>s&&!yl.test(s));return i.length?i.join(" "):e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function io(e){return e.text?O(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var _r=e=>e.matches(u.timelineScroll)&&getComputedStyle(e).flexDirection==="column-reverse";var ql=250,Sl=400,wl=6e4,xl=5e3,El=`:is(${u.turn}) :is(${u.turnBusy})`,q=Qt(),lo=new Set,dn=new Set,de=!1,ei=0,Pe=null,Ne=!1,ao=!1,st=0,co=!1,lt=null,$r=!1,R=()=>({generating:de,conversationId:A()}),ti=()=>Nr()||!!eo()?.querySelector(El);function Cl(){let e=ti();return e?ao||(st=0,co=!0):ao=!1,[...lo].some(t=>!dn.has(t))||e&&!ao||Date.now()<st}function Tl(){return lt?.error?"error":Ne?"stopped":"done"}function Ml(){Pe=null,de=!1,co=!1,q.emit("fall",{conversationId:A(),outcome:Tl()}),Ne=!1,lt=null}function oi(){let e=Cl();e&&!de&&(de=!0,ei=Date.now(),Ne=!1,lt=null,q.emit("rise",{conversationId:A()})),e||!de?Pe=null:Pe==null?Pe=Date.now():Date.now()-Pe>=Sl&&Ml()}function so(){oi(),q.emit("tick",R())}function Ll({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(de||Date.now()-ei<wl);if(!o&&de){for(let n of lo)dn.add(n);ao=ti(),st=0,co=!1,Pe=null,de=!1,Ne=!1,lt=null,q.emit("fall",{conversationId:e,outcome:"left"})}q.emit("context",{prevId:e,id:t,migrated:o}),so()}function Bl(e){e.target instanceof Element&&e.target.closest(u.stopButton)&&(Ne=!0,st=0)}function ni(){$r||($r=!0,N.on("generate-start",({requestId:e})=>{lo.add(e),so()}),N.on("generate-end",e=>{lo.delete(e.requestId),!dn.delete(e.requestId)&&(lt=e,st=e.handoff&&!e.error&&!Ne&&!co?Date.now()+xl:0,so())}),ce(Ll),document.addEventListener("click",Bl,!0),kr(so,ql),zt().then(()=>L(oi)))}var ri={BetterNavigator:1790674918e3,ChatListStatus:1790658944e3,ChatStateFavicons:1790623094e3,Cleaner:1790708086e3,ComposerOpacity:1790667838e3,CustomSidebarIdentity:1790658669e3,GreetingCustomizer:1790683467e3,InputHistory:1790658669e3,MessageTimestamps:1790649198e3,NoDictation:1790653816e3,NoShareLink:1790658669e3,NoSidebarIdentity:1790616549e3,PromptQueue:1790711222e3,RecentTopics:1790620238e3,ResponseNotification:1790661368e3,Settings:1790710615e3,SidebarIdentityOpacity:1790682605e3,StreamerMode:1790666245e3,WiderChat:1790616549e3};var b=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,Il="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",kl={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${Il}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:b('<path d="M18 6 6 18M6 6l12 12"/>'),gear:b('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:b('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:b('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:b('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:b('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:b('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:b('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:b('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:b('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:b('<path d="m6 9 6 6 6-6"/>'),play:b('<path d="M7 4v16l13-8z"/>'),plus:b('<path d="M12 5v14M5 12h14"/>'),check:b('<path d="m5 12 5 5 9-10"/>'),alert:b('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:b('<path d="M4 5h16v11H9l-5 4z"/>'),layout:b('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:b('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:b('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:b('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:b('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:b('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:b('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:b('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:b('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:b('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:b('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:b('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:b('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:b('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:b('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),grip:b('<path d="M9 6h0M15 6h0M9 12h0M15 12h0M9 18h0M15 18h0"/>')},H=e=>Ir(kl[e]);var ue="data-bloom-tip",un=6,mn=8,ve,ii=null;function He(e){if(e===ii)return;if(ii=e,!e){ve?.remove();return}ve??=a("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),ve.textContent=e.getAttribute(ue),document.body.append(ve);let t=e.getBoundingClientRect(),{width:o,height:n}=ve.getBoundingClientRect(),r=t.bottom+un+n<=innerHeight-mn;ve.style.left=`${ae(t.left+t.width/2-o/2,mn,innerWidth-o-mn)}px`,ve.style.top=`${r?t.bottom+un:t.top-un-n}px`}var ai=e=>e instanceof Element?e.closest(`[${ue}]`):null;function si(){let e=new AbortController,t={passive:!0,signal:e.signal};return document.addEventListener("pointerover",o=>He(ai(o.target)),t),document.addEventListener("pointerout",o=>o.relatedTarget||He(null),t),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&He(ai(o.target)),t),document.addEventListener("focusout",()=>He(null),t),document.addEventListener("pointerdown",()=>He(null),t),()=>{e.abort(),He(null)}}function pn(e,t,o){let n=a("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o}});return n.addEventListener("click",r=>{r.stopPropagation();let i=n.getAttribute("aria-checked")!=="true";n.setAttribute("aria-checked",String(i)),t(i)}),n}function D(e,t,o){return a("button",{class:Ot("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button"},on:{click:t}})}function K(e,t,o,n){let r=a("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":t,[ue]:t},on:{click:o}},H(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function uo(e,t,o,n,r,i){let s=a("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});s.value=String(e);let c=a("output",{text:`${s.value}${r}`});return s.addEventListener("input",()=>{c.textContent=`${s.value}${r}`,i(Number(s.value))}),a("div",{class:"bloom-slider"},s,c)}function fn(e,t,o){let n=a("select",{class:"bloom-select"},...t.map(r=>a("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function ct(e,t,o="",n="text"){let r=a("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var Rl=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,li=/\S+@\S+\.\S+/,Ol=3,Dl=/^\/g\/(g-p-[^/]+)\//,Pl=/^g-p-[0-9a-f]+-?/i,ci=e=>!!e.closest(".sr-only"),gn=e=>!!e?.querySelector(u.menuButton);function di(){return[...document.querySelectorAll(u.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(gn)).filter(e=>e!=null)}function ui(){let e=[...document.querySelectorAll(u.oldProfile)];if(e.length)return e.map(o=>{let n=o.parentElement?.children.length===1?o.parentElement:o;return{kind:"profile",anchor:n,insert:r=>n.before(r)}});let t=di().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(u.rail)){let n=[...o.children].find(gn);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}var hn=e=>!e.closest("[data-bloom]")&&(!!e.querySelector("img, [class*=rounded-full]")||gi(e).some(t=>!ci(t))),mi=e=>[...e.parentElement?.children??[]].find(t=>t!==e&&t instanceof HTMLElement&&hn(t))??null;function pi(){let e=[...document.querySelectorAll(u.oldProfile)];return e.length?e:[...di(),...[...document.querySelectorAll(u.rail)].map(o=>[...o.children].findLast(gn))].map(o=>[...o?.querySelectorAll(u.menuButton)??[]].findLast(n=>hn(n)||mi(n))).filter(o=>o!=null)}var fi=()=>pi().map(e=>hn(e)?e:mi(e)).filter(e=>e!=null);function gi(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!O(t.textContent??"")&&!(t instanceof SVGElement))}var Nl=e=>{if(/rounded-full/.test(e.getAttribute("class")??""))return!0;if(!e.clientWidth)return!1;let{borderRadius:t}=getComputedStyle(e);return t.includes("%")||Number.parseFloat(t)>=e.clientWidth/2};function mo(e,t,o){for(let n of e.querySelectorAll(`[${t}]`))n!==o&&n.removeAttribute(t);o&&!o.hasAttribute(t)&&o.setAttribute(t,"")}function Hl(e,t){if(O(e.textContent??"").length>Ol)return null;let o=e.closest("button");for(let n=e;n&&n!==t&&n!==o;n=n.parentElement)if(Nl(n))return n;return null}function bn(e,t){e.hasAttribute(`data-bloom-${t}`)||e.setAttribute(`data-bloom-${t}`,"");let o=e.querySelector("img:not([data-bloom] img)"),n=gi(e),r=o?null:n.map(m=>Hl(m,e)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),s=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");mo(e,`data-bloom-${t}-avatar`,s);let c=n.filter(m=>!s?.contains(m)&&!ci(m)),l=c.find(m=>Rl.test(O(m.textContent??""))),d=c.find(m=>li.test(m.textContent??""));mo(e,`data-bloom-${t}-plan`,l),mo(e,`data-bloom-${t}-email`,d),mo(e,`data-bloom-${t}-name`,c.find(m=>m!==l&&m!==d))}function Gl(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function po(){return pi().map(Gl).find(e=>e!=null)??[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&(li.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var dt=e=>[...document.querySelectorAll(u.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&an(t.href)===e);function hi(e){let t=dt(e).find(o=>O(o.textContent??""));return t?O(t.textContent??""):null}function bi(e){let t=new URL(e,location.origin).pathname.match(Dl)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!an(n.href)&&O(n.textContent??""));return o?O(o.textContent??""):t.replace(Pl,"").replaceAll("-"," ")||null}var An=0,fo;function Ul(e){if(!Y(e))return;for(let o of fi())bn(o,"profile");let t=po();t&&bn(t,"menu")}function X(){An++;let e=!0;return it().then(()=>{e&&An&&!fo&&(fo=L(Ul))}),()=>{e&&(e=!1,!--An&&(fo?.(),fo=void 0))}}var Yl=new v("SettingsPanel"),p=C("bloom-settings-"),Fl=10080*60*1e3,Kl=3e3,Ai="Toggle features. Some need a reload. Click the sliders icon to configure.",Ql=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Wl=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],jl={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},yi=new Set(["chat","ui","privacy"]),G=null,Ge="all",yn="all",go="",vn=[],vi=()=>[...Ae.values()].filter(e=>!e.hidden),Jl=e=>!!e.updatedAt&&Date.now()-e.updatedAt<Fl;function zl(e){switch(Ge){case"favorites":return Gt.has(e.name);case"recent":return Jl(e);case"all":return!0;case"other":return!e.tags.some(t=>yi.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(Ge)}}function Vl(e){switch(yn){case"all":return!0;case"enabled":return et(e);case"disabled":return!et(e)}}function Zl(e){let t=go.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function Xl(e){let t=Ht.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return Ge==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var qi=e=>e.settings?.def??{},_l=e=>Object.values(qi(e)).some(t=>t.type!=="custom");function $l(e,t,o){let n=he(e.name,t)??Xo(o),r=i=>be(e.name,t,i);switch(o.type){case"boolean":return pn(n,r,o.description??t);case"slider":return uo(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return fn(n,o.options,r);case"string":return ct(n,r,o.placeholder);case"number":return ct(String(n),i=>r(Number(i)),"","number");case"component":{let i=a("div",{class:p("component")});return vn.push(o.render(i)),i}case"custom":return null}}var ec=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function Si(e){if(!G)return;let t=Object.entries(qi(e)).filter(([,i])=>i.type!=="custom").map(([i,s])=>{let c=$l(e,i,s),l=s.type==="boolean",d=s.type!=="component"&&a("div",{class:p("field-label"),text:ec(i)}),m=s.description&&a("div",{class:p("field-desc"),text:s.description});return a("div",{class:p("field",l?"field-inline":"field-stacked")},(d||m)&&a("div",{class:p("field-text")},d,m),c)}),o,n=D("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},Kl);return}clearTimeout(o),e.settings?.reset(),ut(),Si(e)},"danger"),r=a("div",{class:p("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&ut()}},a("div",{class:p("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},a("div",{class:p("popup-header")},a("div",{class:p("card-icon")},H(e.icon)),a("div",{class:p("popup-title")},a("div",{class:p("card-name"),text:e.name}),a("div",{class:p("popup-authors"),text:e.authors.join(", ")})),K("close","Close",ut)),a("p",{class:p("popup-desc"),text:e.description}),a("div",{class:p("fields")},...t),a("div",{class:p("popup-footer")},n)));G.querySelector(`.${p("modal")}`)?.append(r)}function ut(){for(let e of vn)e();vn=[],G?.querySelector(`.${p("popup-backdrop")}`)?.remove()}function tc(e){let t=et(e),o=Gt.has(e.name),n=Ht.has(e.name);return a("div",{class:p("card",t?"card-on":"card-off")},a("div",{class:p("card-top")},a("div",{class:p("card-icon")},H(e.icon)),a("div",{class:p("card-actions")},K("star",o?"Unstar":"Star",()=>{Gt.toggle(e.name),qe()},o),K("pin",n?"Unpin":"Pin to top",()=>{Ht.toggle(e.name),qe()},n),_l(e)&&K("gear","Settings",()=>Si(e)),e.required?null:pn(t,r=>Tr(e,r),`Enable ${e.name}`))),a("div",{class:p("card-name"),text:e.name}),a("div",{class:p("card-desc"),text:e.description,title:e.description}),a("div",{class:p("card-footer"),text:e.authors.join(", ")}))}function wi(){let e=vi().some(o=>!o.tags.some(n=>yi.has(n)));G?.querySelector(`.${p("tabs")}`)?.replaceChildren(...Ql.filter(o=>o.id!=="other"||e).map(o=>a("button",{class:p("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===Ge)},on:{click:()=>{Ge=o.id,wi(),qe()}}})))}function qe(){if(!G)return;let e=vi().filter(zl),t=G.querySelector(`.${p("search")} input`);t&&(t.placeholder=`Search ${kt(e.length,"plugin")}...`);let o=Xl(e.filter(i=>Zl(i)&&Vl(i))),n=G.querySelector(`.${p("grid")}`),r=go.trim()?"No plugins match your search.":jl[Ge]??"No plugins available.";n?.replaceChildren(...o.length?o.map(tc):[a("div",{class:p("empty"),text:r})])}function oc(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),G?.querySelector(`.${p("popup-backdrop")}`)?ut():Ue())}var xi,qn;function nc(){if(G)return;let e=a("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=go,e.addEventListener("input",()=>{go=e.value,qe()}),G=a("div",{class:`bloom-root ${p("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&Ue()}},a("div",{class:p("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},a("div",{class:p("header")},a("div",{class:p("logo")},H("bloom")),a("h2",{class:p("title"),text:"Bloom++"}),a("span",{class:p("hint"),attrs:{"aria-label":Ai,tabindex:"0",[ue]:Ai}},H("info")),a("span",{class:p("version"),text:"v2.0.42"}),K("close","Close",Ue)),a("div",{class:p("tabs"),attrs:{role:"tablist"}}),a("div",{class:p("toolbar")},a("label",{class:p("search")},H("search"),e),fn(yn,Wl,t=>{yn=t,qe()})),a("div",{class:p("grid")}))),G.addEventListener("keydown",t=>t.stopPropagation()),qn=new AbortController,document.addEventListener("keydown",oc,{capture:!0,signal:qn.signal}),document.body.append(G),wi(),qe(),xi=Mr(qe),e.focus(),Yl.debug("Opened")}function Ue(){ut(),qn?.abort(),xi?.(),G?.remove(),G=null}var ho=()=>G?Ue():nc();var Ei=`/*
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
`;var me=C("bloom-entry-"),ic=4,Sn="--bloom-entry-x",wn=1,Ye=g({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar. The account menu and the userscript menu always open the panel.",default:!1},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:!0},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:e=>(e.append(D("Reset position",()=>{Ye.store.entryPosition=wn})),()=>e.replaceChildren())},entryPosition:{type:"custom",default:wn}}),Se=new Map,Ci=!1,Ti=[];function ac(e,t,o){let n=e.currentTarget,r=t.clientWidth-n.offsetWidth;if(e.button!==0||r<=0||!t.classList.contains(me("hover")))return;let i=Ye.store.entryPosition,s=i,c=!1,l=new AbortController;n.setPointerCapture(e.pointerId),n.addEventListener("pointermove",m=>{!c&&Math.abs(m.clientX-e.clientX)<ic||(c=!0,o(),s=ae(i+(m.clientX-e.clientX)/r,0,wn),t.style.setProperty(Sn,String(s)))},{signal:l.signal});let d=()=>{l.abort(),c&&(Ye.store.entryPosition=s,t.style.removeProperty(Sn))};n.addEventListener("pointerup",d,{signal:l.signal}),n.addEventListener("lostpointercapture",d,{signal:l.signal})}function sc(e){let t=!1,o=a("button",{class:me("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),t||ho(),t=!1},pointerdown:r=>{t=!1,e!=="rail"&&ac(r,n,()=>{t=!0})}}},H("bloom"),e!=="rail"&&a("span",{class:me("label"),text:"Bloom++"})),n=a("div",{class:`bloom-root ${me("wrap")} ${me(e)}`,attrs:{"data-bloom":"entry"}},o);return n}function lc(e){let t=a("div",{class:`bloom-root ${me("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),ho()}}},H("bloom"),a("span",{text:"Bloom++"})),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function Mi(){let{showSidebarEntry:e,showSidebarEntryOnHover:t}=Ye.store,o=e||t?ui():[];for(let[r,i]of Se)r.isConnected&&o.some(s=>s.anchor===r)||(i.remove(),Se.delete(r));for(let r of o){let i=Se.get(r.anchor);if(i?.isConnected||!De(r.anchor))continue;let s=i??sc(r.kind);Se.set(r.anchor,s),r.insert(s)}for(let r of Se.values())r.classList.toggle(me("hover"),!e);let n=po();n&&!n.querySelector('[data-bloom="menu-entry"]')&&lc(n)}var Li=f({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:Ye,styles:()=>`${Ei}.${me("hover")}{${Sn}:${Ye.store.entryPosition}}`,start(){Ti=[L(Mi),si(),X()],!Ci&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",ho),Ci=!0)},stop(){for(let e of Ti)e();for(let e of Se.values())e.remove();Se.clear(),Ue()},onSettingsChange:Mi});var Bi=`/*
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
`;var x=C("bloom-nav-"),Ao=80,dc=1200,uc=2,Ii=3e4,mc=200,pc=.9,fc=.3,gc=12,hc={user:"\u2753",assistant:"\u{1F916}"},bc=["wheel","touchmove","pointerdown"],yo=g({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),B=null,I=[],we=-1,xe=-1,Fe=null,bo="",xn=0,ki=[],ft=null,mt,Ri=e=>yo.store.showAssistant||e.role==="user";function Ac(){let e=no().reduce((l,d)=>{let m={role:d.role,summary:ro(d),ids:d.messageIds,turn:d,streaming:d.streaming},E=l.at(-1);return E?.role==="assistant"&&m.role==="assistant"?l[l.length-1]={...m,ids:[...E.ids,...m.ids]}:l.push(m),l},[]).filter(Ri),t=(V(A())?.chain??[]).filter(Ri);if(!t.length)return e;let o=new Set(t.map(l=>l.id)),n=new Map(e.flatMap(l=>l.ids.map(d=>[d,l]))),r=new Map,i=[];for(let l of e)l.ids.some(d=>o.has(d))?(r.set(l,i),i=[]):i.push(l);let s=new Set,c=[];for(let l of t){let d=n.get(l.id);d&&s.has(d)||(d&&(s.add(d),c.push(...r.get(d)??[])),c.push(d??{role:l.role,summary:io(l),ids:[l.id],turn:null,streaming:!1}))}return[...c,...i]}function yc(e){if(!R().generating||e.some(o=>o.streaming))return;let t=e.at(-1);t&&(t.role==="assistant"||!yo.store.showAssistant?t.streaming=!0:e.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function Pi(){let e=Ac();return yc(e),e}function vc(e){let t=e.getBoundingClientRect(),o=t.top+t.height*fc,n=-1;return I.forEach((r,i)=>{let s=r.turn?.el.getBoundingClientRect();s&&s.top<=o&&(n=i)}),n===-1?I.findIndex(r=>r.turn):n}function Oi(e){yo.store.jumpEffect==="border"&&(e.classList.add(x("flash")),setTimeout(()=>e.classList.remove(x("flash")),dc))}function vo(e){let t=I[e],o=to();if(!t||!o)return;if(!t.turn&&!t.ids.length){xe=e,pt(),o.scrollTo({top:_r(o)?0:o.scrollHeight});return}xe=e,Fe=e?null:{chat:A(),first:t.ids[0],until:Date.now()+Ii},pt();let n=t.turn?.el;if(n?.isConnected){let d=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:d<o.clientHeight*uc?"smooth":"auto"}),Oi(n);return}let r=I.findIndex(d=>d.turn),i=r>=0&&e<r?-1:1,s=++xn,c=Date.now()+Ii,l=()=>{let d=to();if(s!==xn||Date.now()>c||!d)return;I=Pi();let m=I.find(U=>U.ids.some(h=>t.ids.includes(h)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),Oi(m),xe=I.findIndex(U=>U.turn?.el===m),pt();return}let E=d.scrollTop;d.scrollBy({top:i*d.clientHeight*pc,behavior:"instant"}),d.scrollTop===E?setTimeout(l,mc):requestAnimationFrame(l)};l()}function qc(e,t){return a("button",{class:x("row"),attrs:{type:"button","data-index":String(t)},on:{click:()=>vo(t)}},a("span",{text:hc[e.role]}),a("span",{class:"bloom-truncate",text:se(e.summary||"\u2026",Ao)}))}function Sc(){let e=to();if(I=Pi(),!I.length||!e){B?.remove(),B=null,bo="";return}if(ft!==e){mt?.abort(),mt=new AbortController,e.addEventListener("scroll",Re(pt),{passive:!0,signal:mt.signal});for(let r of bc)e.addEventListener(r,Ni,{passive:!0,signal:mt.signal});ft=e}B??=a("div",{class:`bloom-root ${x("root")}`,attrs:{"data-bloom":"navigator"}},a("div",{class:x("rail")}),a("div",{class:x("toc")},a("div",{class:x("toc-head")}),a("div",{class:x("toc-list")}))),B.isConnected||document.body.append(B);let t=e.getBoundingClientRect(),o=Math.min(t.bottom,rt()?.getBoundingClientRect().top??t.bottom);B.style.right=`${document.documentElement.clientWidth-t.left-e.clientLeft-e.clientWidth+gc}px`,B.style.top=`${(t.top+o)/2}px`;let n=JSON.stringify(I.map(r=>[r.role,r.ids]));n!==bo?(bo=n,xe=-1,xc(),Fe&&Date.now()<Fe.until&&Fe.chat===A()&&I[0]?.ids[0]!==Fe.first&&vo(0)):wc(),pt()}function pt(){if(!B||!ft)return;we=xe>=0?xe:vc(ft),B.querySelectorAll(`.${x("tick")}`).forEach((t,o)=>t.classList.toggle(x("tick-current"),o===we)),B.querySelectorAll(`.${x("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===we)));let e=B.querySelector(`.${x("toc-head")}`);e&&(e.textContent=`${we+1} / ${I.length}`)}function wc(){B?.querySelectorAll(`.${x("tick")}`).forEach((e,t)=>{let o=I[t],n=se(o.summary,Ao);e.title!==n&&(e.title=n),e.classList.toggle(x("tick-streaming"),o.streaming)}),B?.querySelectorAll(`.${x("row")}`).forEach(e=>{let t=e.lastElementChild,o=se(I[Number(e.dataset.index)].summary||"\u2026",Ao);t&&t.textContent!==o&&(t.textContent=o)})}function xc(){B?.querySelector(`.${x("rail")}`)?.replaceChildren(...I.map((e,t)=>a("button",{class:Ot(x("tick"),x(`tick-${e.role}`),e.streaming&&x("tick-streaming"),t===we&&x("tick-current")),title:se(e.summary,Ao),attrs:{type:"button","aria-label":`Jump to message ${t+1}`},on:{click:()=>vo(t)}}))),B?.querySelector(`.${x("toc-list")}`)?.replaceChildren(...I.map(qc))}var te=Re(Sc);function Ni(){xe=-1,Fe=null,xn++}var Ec=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function Di(e){if(!B||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||Ec(document.activeElement)||document.querySelector("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:we-1,ArrowDown:we+1,Home:0,End:I.length-1}[e.key];if(o==null){Ni();return}o<0||o>=I.length||(e.preventDefault(),e.stopPropagation(),vo(o))}var Hi=f({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:yo,styles:Bi,start(){ki=[L(e=>Y(e)&&te()),ce(te),N.on("conversation",te),q.on("rise",te),q.on("fall",te)],addEventListener("keydown",Di,!0),addEventListener("resize",te,{passive:!0}),te()},stop(){for(let e of ki)e();mt?.abort(),ft=null,removeEventListener("keydown",Di,!0),removeEventListener("resize",te),B?.remove(),B=null,bo=""},onSettingsChange:te});var Gi=`/*
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
`;var Tc=C("bloom-cls"),Mc="bloom-cls",Lc=600*1e3,Cn=ir("tab"),Qe=new Map,ht=new Map,Ke=null,Ui=[],Bc=e=>e==="streaming"||e==="error";function Ic(){let e=new Map,t=Date.now();for(let[o,n]of ht)t-n.at>Lc?ht.delete(o):e.set(o,n.status);for(let[o,n]of Qe)e.set(o,n);return e}function kc(e){return a("span",{class:`bloom-root ${Tc("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&H("alert"))}function gt(){let e=Ic(),t=new Set;for(let[o,n]of e)for(let r of dt(o)){if(!De(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let s=kc(n);t.add(s),r.append(s)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function qo(e,t){e&&(t?Qe.set(e,t):Qe.delete(e),Ke?.postMessage({tab:Cn,id:e,status:t}),gt())}function Rc({data:e}){!S(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===Cn||(Bc(e.status)?ht.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):ht.delete(e.id),gt())}function En(){for(let e of Qe.keys())Ke?.postMessage({tab:Cn,id:e,status:null})}var Yi=f({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:Gi,start(){Ke=typeof BroadcastChannel=="function"?new BroadcastChannel(Mc):null,Ke?.addEventListener("message",Rc),addEventListener("pagehide",En),Ui=[q.on("rise",({conversationId:e})=>qo(e,"streaming")),q.on("fall",({conversationId:e,outcome:t})=>qo(e,t==="error"?"error":null)),q.on("context",({prevId:e,id:t,migrated:o})=>{o&&R().generating?qo(t,"streaming"):!o&&Qe.get(e??"")==="streaming"&&qo(e,null)}),L(e=>Y(e)&&gt())],A()&&gt()},stop(){for(let e of Ui)e();En(),Ke?.close(),Ke=null,removeEventListener("pagehide",En),Qe.clear(),ht.clear(),gt()}});var Ki=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],xo={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Oc={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Dc="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Tn=32,Eo=64,Mn="#FCFCFC",Ln="#111111",Pc=14,Co=51.5,Nc=12.5,Hc=9.75,Fi=52,Gc=10.5,Uc=7.75,Yc={rotate:e=>e.arc(Co,Co,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function So(e){let t=document.createElement("canvas");t.width=t.height=Tn;let o=t.getContext("2d");return o?(o.scale(Tn/Eo,Tn/Eo),e(o),t.toDataURL("image/png")):""}function wo(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D(Dc);o&&(e.strokeStyle=Ln,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function To(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function Fc(e,t){To(e,Co,Nc,Ln),To(e,Co,Hc,xo[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),Yc[t](e),e.stroke()}function Kc(e,t){e.beginPath(),e.roundRect(0,0,Eo,Eo,Pc),e.fillStyle=t,e.fill()}var Qc=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function Qi(e,t){switch(e){case"original":return Qc(Oc[t]);case"hole":return So(o=>wo(o,xo[t],!0));case"bg":return So(o=>{Kc(o,xo[t]),wo(o,Mn,!1)});case"dot":return So(o=>{wo(o,Mn,!0),To(o,Fi,Gc,Ln),To(o,Fi,Uc,xo[t])});case"badge":return So(o=>{wo(o,Mn,!0),Fc(o,t)})}}var At="bloom-chat-state-favicon",yt="data-bloom-rel",kn="data-bloom-media",Wi="bloom-parked-icon",Wc="/favicon.ico",Ji=g({style:{type:"select",description:"How the tab icon shows the chat state.",options:Ki,default:"bg"}}),pe=null,zi="",Mo=null,Vi="",ji=new Map,Rn,Bn=[],Zi=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${yt}]`)];function On(){for(let e of Zi())e.id!==At&&(e.hasAttribute(yt)||(Vi||=e.href,e.setAttribute(yt,e.rel),e.setAttribute(kn,e.getAttribute("media")??"")),e.rel!==Wi&&(e.rel=Wi),e.media!=="not all"&&(e.media="not all"))}function jc(){for(let e of Zi()){let t=e.getAttribute(yt);if(t==null)continue;e.rel=t;let o=e.getAttribute(kn);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(yt),e.removeAttribute(kn)}}function Xi(){let e=document.getElementById(At);return e||(e=document.createElement("link"),e.id=At,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function Jc(e){if(e==="wait")return Vi||Wc;let t=Ji.store.style,o=`${t}:${e}`,n=ji.get(o);return n||ji.set(o,n=Qi(t,e)),n}function In(e){if(e)return"rotate";let t=F();return pe&&t&&t!==zi&&(pe=null),pe==="error"?"error":pe==="done"?"done":t?"ready":"wait"}function bt(e,t=!1){if(e===Mo&&!t)return;Mo=e;let o=Xi(),n=Jc(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function zc(){Rn=new MutationObserver(()=>{On(),document.head.lastElementChild?.id!==At&&Xi()}),Rn.observe(document.head,{childList:!0})}var _i=f({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"HostReady",settings:Ji,start(){On(),bt(In(R().generating),!0),zc(),Bn=[q.on("rise",()=>{pe=null,bt("rotate")}),q.on("fall",({outcome:e})=>{pe=e==="done"||e==="error"?e:null,zi=F(),bt(In(!1))}),q.on("context",({migrated:e})=>{e||(pe=null)}),q.on("tick",({generating:e})=>{On(),bt(In(e))})]},stop(){for(let e of Bn)e();Bn=[],Rn?.disconnect(),document.getElementById(At)?.remove(),jc(),Mo=null,pe=null},onSettingsChange(){bt(Mo??"wait",!0)}});var Vc={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${u.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])']},$i=g({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice above the composer.",default:!0}}),ea=f({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads and notices.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:$i,styles:()=>Be(Object.entries(Vc).flatMap(([e,t])=>$i.store[e]?t:[]))});var Lo=`form:has(:is(${u.composerInput})), ${u.oldComposerForm}`,ta='[class*="ComposerLayoutRoot"]',Zc=`:is(${Lo}) ${ta}, :is(${Lo}):not(:has(${ta})) :is([class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"])`,Xc='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',_c='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',$c="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))",oa=g({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function ed(){let{opacity:e,blur:t}=oa.store;return e>=100?"":`:is(${Xc}), :is(${Lo}){background-color:transparent!important;background-image:none!important;box-shadow:none!important}:is(${_c}){display:none!important}${Zc}{background-color:color-mix(in srgb, ${$c} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important}:is(${Lo}) :is(${u.composerInput}){background-color:transparent!important}`}var na=f({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:oa,styles:ed});var oe=C("bloom-csi-"),td=256,od=160,Bo=1,ra=4,nd=.1,rd=.0015,id=250;function ad(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function sd(e){return new Promise((t,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function ld(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:ae(t.x,n,1-n),y:ae(t.y,r,1-r)}}function ia(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function cd(e,t){let o=a("canvas");return o.width=o.height=td,ia(o,e,t),o.toDataURL("image/png")}function aa(e){let t=null,o={x:M.store.cropX,y:M.store.cropY,zoom:M.store.cropZoom},n,r=a("canvas",{class:oe("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=od*devicePixelRatio;let i=a("div",{class:`bloom-muted ${oe("status")}`}),s=a("div",{class:oe("zoom")}),c=a("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(h,P=!0){t&&(o=ld(t,h),ia(r,t,o),P&&(clearTimeout(n),n=setTimeout(()=>{t&&(M.store.cropX=o.x,M.store.cropY=o.y,M.store.cropZoom=o.zoom,M.store.avatarUrl=cd(t,o))},id)))}function d(){s.replaceChildren(uo(o.zoom,Bo,ra,nd,"\xD7",h=>l({...o,zoom:h})))}async function m(h,P){i.textContent="";try{t=await sd(h),P&&(M.store.avatarSource=h,o={x:.5,y:.5,zoom:Bo}),e.classList.add(oe("has-image")),d(),l(o,P)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let E=h=>{h?.type.startsWith("image/")&&ad(h).then(P=>m(P,!0))};c.addEventListener("change",()=>E(c.files?.[0])),r.addEventListener("wheel",h=>{t&&(h.preventDefault(),l({...o,zoom:ae(o.zoom*(1-h.deltaY*rd),Bo,ra)}),d())},{passive:!1}),r.addEventListener("pointerdown",h=>{if(!t)return;r.setPointerCapture(h.pointerId);let P={...o},Ve=r.getBoundingClientRect(),Bt=It=>{if(!t)return;let j=Math.max(Ve.width/t.naturalWidth,Ve.height/t.naturalHeight)*o.zoom;l({...o,x:P.x-(It.clientX-h.clientX)/(t.naturalWidth*j),y:P.y-(It.clientY-h.clientY)/(t.naturalHeight*j)})};r.addEventListener("pointermove",Bt),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",Bt),{once:!0})});let U=a("div",{class:oe("cropper"),attrs:{tabindex:"0"},on:{paste:h=>E([...h.clipboardData?.files??[]].find(P=>P.type.startsWith("image/"))),dragover:h=>h.preventDefault(),drop:h=>{h.preventDefault(),E(h.dataTransfer?.files[0])}}},a("div",{class:oe("stage")},r),a("div",{class:oe("controls")},ct("",h=>h.trim()&&void m(h.trim(),!0),"https://\u2026 or data:image/\u2026","url"),a("div",{class:oe("buttons")},D("Choose file",()=>c.click()),D("Reset crop",()=>{l({x:.5,y:.5,zoom:Bo}),d()}),D("Clear",()=>{t=null,e.classList.remove(oe("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),s.replaceChildren(),M.store.avatarUrl="",M.store.avatarSource=""},"danger")),s,i,c));return e.append(U),M.store.avatarSource&&m(M.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var sa=`/*
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
`;var vt="data-bloom-csi-avatar",Dn="data-bloom-csi-sized",ua="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",ud=32,M=g({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>aa(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),la=[];function ma(e){e.removeAttribute(vt),e.removeAttribute(Dn)}function ca(e){return(M.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function da(e=[]){if(!Y(e))return;let t=M.store.displayName.trim()||null,o=!!M.store.avatarUrl,n=new Set(t?ca("name"):[]);for(let i of document.querySelectorAll(ua))n.has(i)||ye(i,null);for(let i of n)ye(i,t);let r=new Set(o?ca("avatar"):[]);for(let i of document.querySelectorAll(`[${vt}]`))r.has(i)||ma(i);for(let i of r)i.hasAttribute(vt)||i.setAttribute(vt,""),i.toggleAttribute(Dn,!i.closest('[role="menu"]'))}function md(){let e=M.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${M.store.avatarSize}px}:is(${u.rail}, ${u.oldRail}) [${Dn}]{--bloom-csi-size:${ud}px}`:""}var pa=f({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:M,styles:()=>`${md()}
${sa}`,start(){la=[X(),L(da)]},stop(){for(let e of la)e();for(let e of document.querySelectorAll(`[${vt}]`))ma(e);for(let e of document.querySelectorAll(ua))ye(e,null)},onSettingsChange(){da()}});var We=C("bloom-greeting-"),fa=30,ga=100;function ha(e){let t=-1,o=a("textarea",{class:`bloom-input ${We("input")}`,attrs:{maxlength:String(ga),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=D("Add",i),r=a("div",{class:We("list")});function i(){let l=o.value.trim().slice(0,ga);if(!l)return;let d=[...w.store.greetings];t>=0?d[t]=l:d.length<fa&&d.push(l),w.store.greetings=d,t=-1,o.value="",s()}function s(){let{greetings:l}=w.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&l.length>=fa,r.replaceChildren(...l.length?l.map((d,m)=>a("div",{class:We("row",m===t?"row-editing":"row-idle")},a("div",{class:We("text"),text:d}),K("edit","Edit",()=>{t=m,o.value=d,o.focus(),s()}),K("trash","Delete",()=>{w.store.greetings=l.filter((E,U)=>U!==m),t===m&&(t=-1),s()}))):[a("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),e.append(a("div",{class:We("editor")},r,a("div",{class:We("form")},o,n))),s();let c=ke((l,d)=>l==="GreetingCustomizer"&&d==="greetings"&&s());return()=>{c(),e.replaceChildren()}}var ba=`/*
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
`;var ko="data-bloom-greeting",fd=1e3,gd=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],w=g({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>ha(e)},greetings:{type:"custom",default:gd},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),Io,Aa=[],Pn,Ro=()=>_t()&&!$t(),ya=()=>w.store.greetings.filter(e=>typeof e=="string"&&e.trim());function St(){let e=ya();if(e.length)if(w.store.order==="random"&&e.length>1){let t=w.store.lastRandom;for(;t===w.store.lastRandom;)t=Math.floor(Math.random()*e.length);w.store.lastRandom=t,w.store.index=t}else w.store.index=(w.store.index+1)%e.length}function hd(){return Ro()?ee(u.homeHeading):null}function va(){for(let e of document.querySelectorAll(`[${ko}]`))e.removeAttribute(ko),ye(e,null)}function qt(){let e=ya(),t=hd();if(!t||!e.length){va();return}(w.store.index<0||w.store.index>=e.length)&&St(),t.setAttribute(ko,""),ye(t,e[Math.max(0,w.store.index)%e.length])}function Nn(){clearInterval(Io),Io=void 0,w.store.mode==="interval"&&Ro()&&(Io=setInterval(()=>{St(),qt()},w.store.intervalSec*fd))}function bd(e){w.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${ko}]`)||getSelection()?.toString()||(St(),qt())}function Ad(){Ro()&&w.store.mode==="refresh"&&St(),Nn(),qt()}var qa=f({name:"GreetingCustomizer",description:"Replace the \u201CWhat can I help with?\u201D heading on the home page with your own lines.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:w,styles:ba,start(){Pn=new AbortController,document.addEventListener("click",bd,{signal:Pn.signal}),Ro()&&w.store.mode==="refresh"&&St(),Nn(),Aa=[L(e=>Y(e)&&qt()),ce(Ad)]},stop(){Pn?.abort();for(let e of Aa)e();clearInterval(Io),va()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&Nn(),qt()}});var wt=C("bloom-history-"),Hn=10,yd=3e3;function Sa(e){let t="",o=0,n=new Set,r=a("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),i=a("div",{class:wt("list")}),s=a("div",{class:wt("pager")}),c,l=D("Clear all",()=>{if(!c){l.textContent="Click again to clear",c=setTimeout(()=>{c=void 0,l.textContent="Clear all"},yd);return}clearTimeout(c),c=void 0,l.textContent="Clear all",xt([])},"danger");function d(){let E=[...Ee.store.entries].toReversed(),U=t.trim().toLowerCase(),h=U?E.filter(j=>j.toLowerCase().includes(U)):E,P=Math.max(1,Math.ceil(h.length/Hn));o=Math.min(o,P-1);let Ve=h.slice(o*Hn,(o+1)*Hn).map(j=>a("div",{class:wt("row")},a("button",{class:wt("text",n.has(j)?"text-open":"text-closed"),text:j,title:n.has(j)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{n.delete(j)||n.add(j),d()}}}),K("copy","Copy",()=>void ar(j)),K("trash","Delete",()=>xt(Ee.store.entries.filter(Ss=>Ss!==j)))));i.replaceChildren(...Ve.length?Ve:[a("div",{class:"bloom-muted",text:U?"No matching prompts.":"No saved prompts yet."})]),s.replaceChildren(a("span",{class:"bloom-muted",text:`${h.length} ${U?"matching":"saved"} \xB7 page ${o+1} of ${P}`}),D("Previous",()=>{o--,d()}),D("Next",()=>{o++,d()}),l);let[Bt,It]=s.querySelectorAll("button");Bt.disabled=o===0,It.disabled=o>=P-1,l.disabled=!E.length}r.addEventListener("input",()=>{t=r.value,o=0,d()}),e.append(a("div",{class:wt("manager")},r,i,s)),d();let m=ke((E,U)=>E==="InputHistory"&&U==="entries"&&d());return()=>{m(),clearTimeout(c),e.replaceChildren()}}var wa=`/*
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
`;var qd=C("bloom-history-"),Sd=2e3,Ee=g({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>Sa(e)},entries:{type:"custom",default:[]}}),W=null,Gn={text:"",at:0},Ce=null,Un,Oo=()=>Ee.store.entries.filter(e=>typeof e=="string");function xt(e){Ee.store.entries=e.slice(-Ee.store.maxEntries)}function Yn(e){let t=e.trim();if(!t)return;let o=Date.now();t===Gn.text&&o-Gn.at<Sd||(Gn={text:t,at:o},xt([...Oo().filter(n=>n!==t),t]))}function wd(e,t){let o=Oe();if(!o)return;Ce??=a("div",{class:`bloom-root ${qd("hud")}`,attrs:{"data-bloom":"history-hud","aria-live":"polite"}}),Ce.textContent=`${e+1} / ${t}`;let n=(o.closest("form")??o).getBoundingClientRect();Ce.style.left=`${n.left+n.width/2}px`,Ce.style.top=`${n.top}px`,Ce.isConnected||document.body.append(Ce)}function Et(){W=null,Ce?.remove()}function xd(e){let t=Oo();if(!W)return;let o=t[e];W.index=e,W.shown=o,le(o),wd(t.length-1-e,t.length)}function Ed(e){let t=Oo();if(!t.length)return!1;if(!W){if(e===1)return!1;W={index:t.length,draft:F(),shown:""}}let o=W.index+e;return o<0?!0:o>=t.length?(le(W.draft),Et(),!0):(xd(o),!0)}function Cd(e){if(e.isComposing||!nt(e.target))return;let t=e.target;if(e.key==="Enter"&&!e.shiftKey){Yn(F(t)),Et();return}if(e.key==="Escape"&&W){le(W.draft),Et(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey)return;let o=Or(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!W||Ed(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function Td(e){W&&nt(e.target)&&F(e.target)!==W.shown.trim()&&Et()}function Md(e){e.target instanceof Element&&e.target.closest(u.sendButton)&&Yn(F())}var xa=f({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:Ee,styles:wa,start(){Un=new AbortController;let{signal:e}=Un;document.addEventListener("keydown",Cd,{capture:!0,signal:e}),document.addEventListener("input",Td,{capture:!0,signal:e}),document.addEventListener("click",Md,{capture:!0,signal:e}),document.addEventListener("submit",()=>Yn(F()),{capture:!0,signal:e})},stop(){Un?.abort(),Et()},onSettingsChange(e){e==="maxEntries"&&xt(Oo())}});var Ea=`/*
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
`;var Bd=1500,Id=5e3,kd=2e3,je=g({showDate:{type:"boolean",description:"Show the date for messages not sent today.",default:!0},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),Po=new Map,Ma=0,No,Ca=[];function La(e,t){Po.get(e)!==t&&(Po.set(e,t),clearTimeout(No),No=setTimeout(Ba,kd))}function Ba(){let e={...je.store.stamps,...Object.fromEntries(Po)};je.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,Bd))}function Rd(e){let t=V(A())?.times;for(let o=e.length-1;o>=0;o--){let n=Po.get(e[o])??t?.get(e[o])??je.store.stamps[e[o]];if(n)return n}return null}var Od=()=>R().generating||Date.now()-Ma<Id;function Dd(e){let t=new Date(e),o=new Date,n={hour:"2-digit",minute:"2-digit"};if(!je.store.showDate||t.toDateString()===o.toDateString())return t.toLocaleTimeString(void 0,n);let r=t.getFullYear()===o.getFullYear()?{}:{year:"numeric"};return t.toLocaleString(void 0,{...r,month:"short",day:"numeric",...n})}function Ta(e){let t=oo(e)??e.getAttribute("data-message-author-role")??e.closest(u.turn)?.getAttribute("data-turn")??e.querySelector(u.authorRole)?.getAttribute("data-message-author-role");if(ln(t))return t;let o=at(e).at(-1);return V(A())?.chain.find(n=>n.id===o)?.role??null}function Pd(e){let t=at(e);if(!t.length||!De(e)||e.querySelector("time:not([data-bloom])"))return;let o=Rd(t);!o&&Od()&&(o=Date.now(),La(t.at(-1),o));let n=e.querySelector(':scope > time[data-bloom="timestamp"]');if(!o||je.store.hideOwnMessages&&Ta(e)==="user"){n?.remove();return}let r=Dd(o);if(n?.textContent===r)return;let i=a("time",{class:`bloom-timestamp bloom-timestamp-${Ta(e)??"assistant"}`,text:r,title:new Date(o).toLocaleString(),attrs:{"data-bloom":"timestamp",datetime:new Date(o).toISOString()}});n?n.replaceWith(i):e.prepend(i)}var Do=Re(()=>{for(let e of cn())Pd(e)}),Ia=f({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:je,styles:Ea,start(){Ca=[L(e=>Y(e)&&Do()),N.on("conversation",Do),N.on("message-time",({messageId:e,time:t})=>{La(e,t),Do()}),q.on("fall",()=>{Ma=Date.now()})]},stop(){for(let e of Ca)e();No&&(clearTimeout(No),Ba());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();Do()}}});var Nd=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])'],Hd=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],ka=g({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),Ra=f({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:ka,styles:()=>Be([...Nd,...ka.store.hideDictationSettings?Hd:[]])});var Te="data-bloom-share",Gd=/^\/g\/g-p-/,Ud=/^(?:share|分享)$/i,Yd=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],Fd=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${Te}="project"]`],Fn=g({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),Ho,Kn=!1;function Kd(e){if(!Y(e))return;let t=Gd.test(location.pathname)&&!A();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${Te}]`))!t||!Ud.test(O(o.textContent??""))?o.removeAttribute(Te):o.hasAttribute(Te)||o.setAttribute(Te,"project")}var Oa=f({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:Fn,styles:()=>Be([...Fn.store.hideShareChat?Yd:[],...Fn.store.hideShareProject?Fd:[]]),start(){Kn=!0,it().then(()=>{Kn&&!Ho&&(Ho=L(Kd))})},stop(){Kn=!1,Ho?.(),Ho=void 0;for(let e of document.querySelectorAll(`[${Te}]`))e.removeAttribute(Te)}});var Da='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',Qd='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',Wd="[data-bloom-profile-plan]",Pa="visibility:hidden!important;user-select:none!important",Ha=g({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function jd(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=Ha.store,r=[];return e&&r.push(n?`:is(${Da}){display:none!important}`:`:is(${Da}){${Pa}}`),t&&r.push(`:is(${Qd}){${Pa}}`),e&&o&&r.push(`${Wd}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var Na,Ga=f({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Ha,styles:jd,start(){Na=X()},stop(){Na?.()}});var Ua=`/*
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

.bloom-queue-actions {
    display: flex;
    flex: none;
}
`;var k=C("bloom-queue-"),zd=6,Vd=8,Q=null,Ct="",Je=!1,ze=!1;function Qn(e,t,o){let n=K(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute(ue),n.addEventListener("mouseenter",()=>Ya(t)),n.addEventListener("mouseleave",()=>Ya("")),n}function Ya(e){let t=Q?.querySelector(`.${k("tip")}`);t&&(t.textContent=e)}function Zd(e,t,o,n){ze=!0;let r=a("textarea",{class:`bloom-input ${k("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=new AbortController,s=c=>{i.abort(),ze=!1,Ct="",c?n.edit(t,r.value):r.replaceWith(a("div",{class:k("text"),text:o}))};addEventListener("keydown",c=>{if(!(c.target!==r||c.isComposing)){if(c.key==="Enter"&&!c.shiftKey)s(!0);else if(c.key==="Escape")s(!1);else return;c.preventDefault(),c.stopImmediatePropagation()}},{capture:!0,signal:i.signal}),r.addEventListener("keydown",c=>c.stopPropagation(),{signal:i.signal}),r.addEventListener("blur",()=>s(!0),{signal:i.signal}),e.querySelector(`.${k("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function Xd(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,s=l=>{!i&&Math.abs(l.clientY-n.clientY)<zd||(i||(i=ze=!0,e.classList.add(k("dragging"))),e.style.transform=`translateY(${l.clientY-n.clientY}px)`)},c=l=>{if(removeEventListener("pointermove",s),!i)return;ze=!1,Ct="";let m=[...r.children].filter(E=>E!==e).filter(E=>E.getBoundingClientRect().top+E.getBoundingClientRect().height/2<l.clientY).length;o.move(t,m)};addEventListener("pointermove",s),addEventListener("pointerup",c,{once:!0})})}function _d(e,t,o){let n=a("li",{class:k("row")},a("div",{class:k("text"),text:e}),a("div",{class:k("actions")},Qn("trash","Remove from queue",()=>o.remove(t)),Qn("edit","Edit",()=>Zd(n,t,e,o)),Qn("send","Send now",()=>o.sendNow(t))));return Xd(n,t,o),n}function $d(e){if(!Q)return;let t=e.getBoundingClientRect();Q.style.left=`${t.left}px`,Q.style.width=`${t.width}px`,Q.style.bottom=`${innerHeight-t.top+Vd}px`}function Wn(){Q?.remove(),Q=null,Ct="",ze=!1}function Go(e,t){let o=rt();if(!e.length||!ot(o)){Wn();return}Q||(Q=a("div",{class:`bloom-root ${k("tray")}`,attrs:{"data-bloom":"queue"}},a("div",{class:k("header")},a("button",{class:k("toggle"),attrs:{type:"button","aria-expanded":String(!Je)},on:{click:i=>{Je=!Je,Q?.classList.toggle(k("collapsed"),Je),i.currentTarget.setAttribute("aria-expanded",String(!Je))}}},a("span",{class:k("count")}),H("chevron")),a("span",{class:k("tip")})),a("ol",{class:k("list")})),Q.classList.toggle(k("collapsed"),Je),document.body.append(Q)),$d(o);let n=JSON.stringify(e);if(ze||n===Ct)return;Ct=n;let r=Q.querySelector(`.${k("count")}`);r&&(r.textContent=kt(e.length,"Queued message")),Q.querySelector(`.${k("list")}`)?.replaceChildren(...e.map((i,s)=>_d(i,s,t)))}var eu=new v("PromptQueue"),tu=8,Qa=150,Wa=20,ja="BloomPromptQueue",Ja=g({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1}}),ne=new Map,Uo=!1,Me=null,jn,Fa=[],Yo="draft",Jn=()=>A()??Yo,Z=()=>ne.get(Jn())??[];function ou(){let e=ge(sessionStorage.getItem(ja)??"");if(S(e))for(let[t,o]of Object.entries(e))Array.isArray(o)&&o.length&&o.every(n=>typeof n=="string")&&ne.set(t,o)}function za(){try{sessionStorage.setItem(ja,JSON.stringify(Object.fromEntries([...ne].filter(([e])=>e!==Yo))))}catch(e){eu.warn("Could not save the queue",e)}}function Le(e){e.length?ne.set(Jn(),e):ne.delete(Jn()),za(),Go(Z(),zn)}function Va(e,t=0){t>=Wa||R().generating||F()!==e||(Pr(),setTimeout(()=>Va(e,t+1),Qa))}function Fo(e,t=0){if(R().generating||F()){t<Wa&&setTimeout(()=>Fo(e,t+1),Qa);return}le(e),en(()=>Va(e))}function Ka(){if(Me!=null){let o=Me;Me=null,Fo(o);return}if(!Uo||R().generating||F())return;let[e,...t]=Z();e!=null&&(Uo=!1,Le(t),Fo(e))}function Za(e){let t=Z(),o=t[e];if(o!=null){if(Le(t.filter((n,r)=>r!==e)),!R().generating){Fo(o);return}Me=o,Wt()?.click()}}var zn={remove:e=>Le(Z().filter((t,o)=>o!==e)),edit:(e,t)=>Le(t.trim()?Z().map((o,n)=>n===e?t:o):Z().filter((o,n)=>n!==e)),sendNow:Za,move(e,t){let o=[...Z()],[n]=o.splice(e,1);o.splice(t,0,n),Le(o)}};function nu(e){let t=Z();return Ja.store.replacePending&&t.length?(Le([...t.slice(0,-1),e]),!0):t.length>=tu?!1:(Le([...t,e]),!0)}function ru(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!nt(e.target)||!R().generating)return;let t=F(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;le(""),Me=t,Wt()?.click();return}if(!t){Z().length&&Za(0);return}nu(t)&&le("")}var Xa=f({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:Ja,styles:Ua,start(){jn=new AbortController,ou(),document.addEventListener("keydown",ru,{capture:!0,signal:jn.signal}),Fa=[q.on("fall",({outcome:e})=>{Uo=e==="done",e==="left"&&(Me=null),Ka()}),q.on("context",({prevId:e,id:t,migrated:o})=>{let n=ne.get(Yo);ne.delete(Yo),o&&!e&&t&&n&&ne.set(t,n),o||(Uo=!1),za(),Go(Z(),zn)}),q.on("tick",()=>{Ka(),Go(Z(),zn)})]},stop(){jn?.abort();for(let e of Fa)e();Wn(),ne.clear(),Me=null}});var iu=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function au(){let e=O(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!iu.has(e.toLowerCase())?e:null}function Tt(e){return e?V(e)?.title??hi(e)??(e===A()?au():null):null}var _a=`/*
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
`;var re=C("bloom-recent-"),ie="home",lu=50,$a=140,cu=new Set(["Backquote"]),du=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),y=g({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),fe=null,_=[],$=0,Vn,es=[],Wo=()=>$t()?null:A()??(_t()?ie:null);function ts(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function ns(e){let t=Tt(e);t&&y.store.titles[e]!==t&&(y.store.titles={...y.store.titles,[e]:t});let o=bi(location.href);o&&e===A()&&y.store.projects[e]!==o&&(y.store.projects={...y.store.projects,[e]:o})}function os(e){if(!e)return;let t=[e,...y.store.visits.filter(n=>n!==e)].slice(0,lu),o=new Set(t);y.store.visits=t,Object.keys(y.store.previews).some(n=>!o.has(n))&&(y.store.previews=ts(y.store.previews,o)),Object.keys(y.store.titles).some(n=>!o.has(n))&&(y.store.titles=ts(y.store.titles,o)),e!==ie&&ns(e)}function Ko(e){if(!e||!y.store.visits.includes(e))return;let t={},o=V(e)?.chain??[];for(let r of o)t[r.role]=se(io(r),$a);if(e===A())for(let r of no()){let i=ro(r);i&&(t[r.role]=se(i,$a))}let n=y.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(y.store.previews={...y.store.previews,[e]:t})}function uu(){let e=Number(y.store.maxRecent);return y.store.visits.filter(t=>t!==ie||y.store.includeHome).slice(0,e)}function Zn(e){if(Mt(),e===Wo())return;let t=e===ie?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"]'):dt(e)[0];t?t.click():location.assign(e===ie?"/":`/c/${e}`)}function mu(e,t){let o=e===ie?"New chat":y.store.titles[e]??Tt(e)??"Untitled chat",n=e===ie?null:y.store.projects[e],r=e===ie?null:y.store.previews[e];return a("button",{class:re("item"),attrs:{type:"button",role:"option","aria-selected":String(t===$)},on:{click:()=>Zn(e),mousemove:()=>t!==$&&Qo(t)}},a("div",{class:re("head")},a("span",{class:`${re("title")} bloom-truncate`,text:o}),n&&a("span",{class:re("project"),text:n})),r?.user&&a("div",{class:`${re("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&a("div",{class:`${re("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function Qo(e){$=(e+_.length)%_.length,fe?.querySelectorAll(`.${re("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===$)))}function pu(){Ko(A());let e=Wo();_=uu(),e&&(_=[e,..._.filter(t=>t!==e)].slice(0,Number(y.store.maxRecent))),_.length&&($=_.length>1?1:0,fe=a("div",{class:`bloom-root ${re("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:t=>t.target===t.currentTarget&&Mt()}},a("div",{class:re("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},..._.map(mu))),document.body.append(fe))}function Mt(){fe?.remove(),fe=null}var fu=e=>cu.has(e.code)||du.has(e.key);function gu(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&fu(e)){e.preventDefault(),e.stopPropagation(),fe?Qo($+(e.shiftKey?-1:1)):pu();return}if(!fe)return;let o={Escape:Mt,Enter:()=>Zn(_[$]),ArrowDown:()=>Qo($+1),ArrowUp:()=>Qo($-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function hu(e){fe&&e.key==="Control"&&Zn(_[$])}var rs=f({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:y,styles:_a,start(){Vn=new AbortController;let{signal:e}=Vn;addEventListener("keydown",gu,{capture:!0,signal:e}),addEventListener("keyup",hu,{capture:!0,signal:e}),addEventListener("blur",Mt,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&Ko(A()),{signal:e}),es=[ce(({prevId:i})=>{Ko(i),os(Wo())}),N.on("conversation",({id:i})=>{y.store.visits.includes(i)&&ns(i),Ko(i)})];let{visits:t,titles:o,previews:n}=y.store,r=t.filter(i=>i!==ie&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(y.store.visits=t.filter(i=>!r.includes(i))),os(Wo())},stop(){Vn?.abort();for(let e of es)e();Mt()}});var Xn="data:audio/mpeg;base64,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";var is=new v("ResponseNotification"),bu=.5,Au=200,yu=300,Lt=g({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:e=>(e.append(D("Preview",cs)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),as=null,_n=new Map,ss,$n;function vu(e){return new Promise((t,o)=>GM_xmlhttpRequest({url:e,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=Au&&n<yu?t(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var qu=e=>Uint8Array.from(atob(e.slice(e.indexOf(",")+1)),t=>t.charCodeAt(0)).buffer;function Su(e,t){let o=_n.get(t);return o||(o=(t.startsWith("data:")?Promise.resolve(qu(t)):vu(t)).then(n=>e.decodeAudioData(n)),o.catch(()=>_n.delete(t)),_n.set(t,o)),o}async function ls(e){as??=new AudioContext;let t=as;t.state==="suspended"&&t.resume();let o=t.createBufferSource(),n=t.createGain();o.buffer=await Su(t,e),n.gain.value=bu,o.connect(n).connect(t.destination),o.start()}function cs(){let e=Lt.store.soundUrl.trim();ls(e||Xn).catch(t=>{is.warn("Sound failed",t),e&&ls(Xn).catch(o=>is.warn("Default chime failed",o))})}function wu(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function xu(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||($n=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:$n.signal}))}var ds=f({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:Lt,start(){xu(),ss=q.on("fall",({conversationId:e,outcome:t})=>{t==="done"&&(Lt.store.onlyWhenHidden&&!document.hidden||(Lt.store.sound&&cs(),Lt.store.browserNotification&&wu(Tt(e))))})},stop(){ss?.(),$n?.abort()}});var Eu=`:is(${u.sidebarScroll}, :has(> ${u.sidebarScroll})) + :has(${u.menuButton})`,Cu=`${u.rail} > :has(${u.menuButton})`,tr=`:is(${Eu}, ${Cu}, ${u.oldProfile}):not(:hover)`,er="[data-bloom-profile-avatar]",Tu=`:is(${tr}, ${tr} :has(${er})) > :not(${er}, :has(${er}))`,ms=g({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function Mu(){let{opacity:e,fadeAvatar:t}=ms.store;return e>=100?"":`${t?tr:Tu}{opacity:${e/100}!important}`}var us,ps=f({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:ms,styles:Mu,start(){us=X()},stop(){us?.()}});var Lu="filter:blur(6px)!important;transition:filter 0.2s ease",fs=`:is(${u.sidebars})`,Bu={conversations:{selectors:[`${fs} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0},projects:{selectors:[`${fs} a:is([href*="/project"], [href*="/g/g-p-"])`,"[data-app-action-sidebar-project-row]",".bloom-recent-project"],hover:!0},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}},hs=g({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function Iu(){return Object.entries(Bu).filter(([e])=>hs.store[e]).map(([,{selectors:e,hover:t}])=>{let o=e.join(",");return`:is(${o}){${Lu}}`+(t?`:is(${o}):hover, .bloom-recent-item:hover :is(${o}){filter:none!important}`:"")}).join(`
`)}var gs,bs=f({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:hs,styles:Iu,start(){gs=X()},stop(){gs?.()}});var ku=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],Ru=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",Ou='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',As=g({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function Du(){let e=`${As.store.width}rem`;return`:is(${Ru}){${ku.map(t=>`${t}:${e}!important`).join(";")}}:is(${Ou}){max-width:min(100%, ${e})!important}`}var ys=f({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:As,styles:Du});var Pu=[Li,Hi,Yi,_i,ea,na,pa,qa,xa,Ia,Ra,Oa,Ga,Xa,rs,ds,ps,bs,ys],or=Pu;var Nu=new v("Bloom"),vs="2.0.42";async function nr(){Qr();for(let e of or)e.updatedAt=ri[e.name];wr(or),await Ar(),Rt("base",Lr),ni(),Yt("Init"),zt().then(()=>{dr(),Yt("DOMContentLoaded")}),await jr(),Yt("HostReady"),Nu.info(`Bloom++ ${vs} ready`)}var qs=new v("Boot");if(window===window.top){let e=J.Bloom;e&&qs.warn("Replacing another Bloom++ instance",e.VERSION),Object.defineProperty(J,"Bloom",{value:rr,configurable:!0,writable:!0}),nr().catch(t=>qs.error("Startup failed",t))}})();
