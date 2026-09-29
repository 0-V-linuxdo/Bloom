// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260929] v2.0.19
// @description  Void++-style plugin host for chatgpt.com. Tab favicon, input history, recent chats, reply notify, next-prompt queue, Recents status, wider thread, thread outline, message times, streamer blur, custom home greeting, custom sidebar identity, hide Share, Dictation, sidebar name, Download apps, upgrade CTAs, and ads.
// @author       0-V-linuxdo & Bloom contributors
// @homepageURL  https://github.com/0-V-linuxdo/Bloom
// @supportURL   https://github.com/0-V-linuxdo/Bloom/issues
// @icon         https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main/assets/logos/app-icon/bloom-icon.svg
// @icon64       https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main/assets/logos/app-icon/bloom-icon-64.png
// @match        https://chatgpt.com/*
// @match        https://*.chatgpt.com/*
// @match        https://chat.openai.com/*
// @match        https://free.share-ai.top/*
// @match        https://chatgpt.aicnm.cc/*
// @run-at       document-start
// @grant        GM_getValue
// @grant        GM_setValue
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
// @downloadURL  https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main/userscript/Bloom.update4.user.js
// @updateURL    https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main/userscript/Bloom.update4.user.js
// ==/UserScript==

/* Bloom++ [20260929] v2.0.19. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Za=Object.defineProperty;var Qa=(e,t)=>{for(var o in t)Za(e,o,{get:t[o],enumerable:!0})};var S=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var we=(e,t,o)=>Math.min(o,Math.max(t,e)),T=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Fn=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,Ee=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,R=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function Lt(e,t){return`${e} ${t}${e===1?"":"s"}`}async function jn(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function je(e){try{return JSON.parse(e)}catch{return}}var K=typeof unsafeWindow>"u"?window:unsafeWindow;var zn={};Qa(zn,{VERSION:()=>Ya,init:()=>Un,plugins:()=>ue});var es=new S("Styles"),Ke=new Map,Kn=new Set,We=new Map,Do=!0;function Wn(){let e=document.adoptedStyleSheets.filter(t=>!Kn.has(t));document.adoptedStyleSheets=[...e,...Ke.values()]}function Vn(e){document.readyState==="loading"||e.parentNode===document.head||document.head.append(e)}function ts(e,t){let o=We.get(e);o||(o=document.createElement("style"),o.id=`bloom-style-${e}`,We.set(e,o)),o.textContent!==t&&(o.textContent=t),Vn(o)}function Pt(e,t){if(Do)try{let o=Ke.get(e);o||(o=new K.CSSStyleSheet,Ke.set(e,o),Kn.add(o)),o.replaceSync(t),Wn();return}catch(o){es.warn("Constructed style sheets unavailable, using <style> after parsing",o),Do=!1,Ke.delete(e)}ts(e,t)}function No(e){Ke.delete(e)&&Do&&Wn(),We.get(e)?.remove(),We.delete(e)}function Yn(){for(let e of We.values())Vn(e)}var E=e=>(...t)=>t.map(o=>e+o).join(" "),kt=(...e)=>e.filter(Boolean).join(" "),Te=e=>e.length?`${e.join(",")}{display:none!important}`:"";function f(e){return e}var Rt=new S("Storage"),os="bloompp",Ot="kv",Xn=null;function ns(){return Xn??=new Promise((e,t)=>{let o=indexedDB.open(os,1);o.onupgradeneeded=()=>{o.result.objectStoreNames.contains(Ot)||o.result.createObjectStore(Ot)},o.onsuccess=()=>e(o.result),o.onerror=()=>t(o.error)}),Xn}function Jn(e,t){return ns().then(o=>new Promise((n,r)=>{let i=t(o.transaction(Ot,e).objectStore(Ot));i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)}))}async function rs(e){if(typeof GM_getValue=="function")try{return await GM_getValue(e)}catch(t){Rt.warn("GM read failed",t);return}}async function is(e){try{return await Jn("readonly",t=>t.get(e))}catch(t){Rt.warn("IndexedDB read failed",t);return}}function as(e){try{return localStorage.getItem(e)??void 0}catch{return}}async function Zn(e){return Promise.all([rs(e),is(e),as(e)])}function Qn(e,t){let o=JSON.stringify(t);if(typeof GM_setValue=="function")try{GM_setValue(e,t)}catch{GM_setValue(e,o)}try{localStorage.setItem(e,o)}catch(n){Rt.warn("localStorage write failed",n)}Jn("readwrite",n=>n.put(o,e)).catch(n=>Rt.warn("IndexedDB write failed",n))}var ss=new S("Settings"),tr="BloomSettings",ls=100,cs=["GM","IndexedDB","localStorage"],It={plugins:{}},Ho=new Set,Ve;function ds(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=je(t);return!T(t)||!T(t.plugins)||!Object.keys(t.plugins).length?null:t}var _o=e=>e==null||e===""||(Array.isArray(e)?!e.length:T(e)&&!Object.keys(e).length);function us(e){return _o(e)?0:Array.isArray(e)?12+Math.min(e.length,40):T(e)?12+Math.min(Object.keys(e).length,40):3}function ms(e){let t=0;for(let o of Object.values(e.plugins))if(T(o))for(let[n,r]of Object.entries(o))n!=="enabled"&&(t+=us(r));return t}var er=e=>Object.values(e.plugins).filter(t=>T(t)&&t.enabled===!0).length;function ps(e){let t=e.map((i,s)=>i&&{candidate:i,index:s,score:ms(i)}).filter(i=>i!=null).toSorted((i,s)=>s.score-i.score||(i.score?0:er(s.candidate)-er(i.candidate))||i.index-s.index);if(!t.length)return null;let[o,...n]=t,r=structuredClone(o.candidate);for(let{candidate:i}of n)for(let[s,l]of Object.entries(i.plugins)){if(!T(l))continue;let c=r.plugins[s]??={};for(let[u,p]of Object.entries(l))u==="enabled"?!("enabled"in c)&&p===!0&&(c.enabled=!0):_o(c[u])&&!_o(p)&&(c[u]=structuredClone(p));Object.keys(c).length||delete r.plugins[s]}return{bag:r,source:cs[o.index]}}async function or(){let e=await Zn(tr),t=ps(e.map(ds));t&&(It.plugins=t.bag.plugins,ss.info("Loaded settings from",t.source))}function nr(){Ve=void 0,Qn(tr,It)}function fs(){Ve&&(clearTimeout(Ve),nr())}var ce=(e,t)=>It.plugins[e]?.[t];function de(e,t,o){let n=It.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,clearTimeout(Ve),Ve=setTimeout(nr,ls);for(let r of Ho)r(e,t)}function Ce(e){return Ho.add(e),()=>void Ho.delete(e)}function $o(e){return e.type==="component"?void 0:e.default}function g(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>ce(t.pluginName,n)??(e[n]&&$o(e[n])),set:(o,n,r)=>(de(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&ce(t.pluginName,o)!==void 0&&de(t.pluginName,o)}};return t}var rr=e=>{let t=()=>{let o=ce("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();de("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},Bt=rr("pinnedPlugins"),Dt=rr("starredPlugins");addEventListener("pagehide",fs);var Nt=new S("PluginManager"),ue=new Map,Ye=new Set,ir=new Set,qo=new Set;function ar(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),ue.set(t.name,t)}var Xe=e=>!!e.required||(ce(e.name,"enabled")??!!e.enabledByDefault);var Go=e=>`plugin-${e.name}`;function sr(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?Pt(Go(e),t):No(Go(e))}function lr(e){if(!Ye.has(e.name))try{sr(e),e.start?.(),Ye.add(e.name)}catch(t){Nt.error(`Failed to start ${e.name}`,t)}}function gs(e){if(Ye.delete(e.name)){No(Go(e));try{e.stop?.()}catch(t){Nt.error(`Failed to stop ${e.name}`,t)}}}var cr=e=>e.startAt??"HostReady";function Ht(e){ir.add(e);for(let t of ue.values())cr(t)===e&&Xe(t)&&lr(t);Nt.info(`${e}: ${[...Ye].join(", ")}`)}function dr(e,t){de(e.name,"enabled",t),t?ir.has(cr(e))&&lr(e):gs(e);for(let o of qo)o()}function ur(e){return qo.add(e),()=>void qo.delete(e)}Ce((e,t)=>{let o=ue.get(e);if(!(!o||t==="enabled"||!Ye.has(e)))try{sr(o),o.onSettingsChange?.(t)}catch(n){Nt.error(`Settings change failed for ${e}`,n)}});var mr=`/*
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
`;var hs=new S("Dom");function a(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var pr=document.createElement("template");function fr(e){return pr.innerHTML=e.trim(),pr.content.firstElementChild.cloneNode(!0)}var Ze=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),Me=(e,t=document)=>[...t.querySelectorAll(e)].find(Ze)??null,ys=16,vs="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function gr(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([vs],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function Uo(e){document.hidden?setTimeout(e,ys):requestAnimationFrame(e)}function Ae(e){let t=!1;return()=>{t||(t=!0,Uo(()=>{t=!1;try{e()}catch(o){hs.error("Scheduled task failed",o)}}))}}var _t=new Set,$t=[],Je,Ss=Ae(()=>{let e=$t;$t=[];for(let t of _t)t(e)});function M(e){return _t.add(e),Je||(Je=new MutationObserver(t=>{$t.push(...t),Ss()}),Je.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{_t.delete(e),!_t.size&&(Je?.disconnect(),Je=void 0,$t=[])}}var xs=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),_=e=>!e.length||e.some(t=>!xs(t.target));function me(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size");return}e.getAttribute("data-bloom-text")!==t&&(e.hasAttribute("data-bloom-text")||e.style.setProperty("--bloom-text-size",getComputedStyle(e).fontSize),e.setAttribute("data-bloom-text",t))}var ws=new S("Events");function qt(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){ws.error(`Listener for ${String(t)} failed`,r)}}}}var d={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]'};var br=/[​-‍﻿]/g,Le=()=>Me(d.composerInput),Qe=e=>e instanceof HTMLElement&&e.matches(d.composerInput),et=(e=Le())=>e?.closest("form")??document.querySelector(d.oldComposerForm);function $(e=Le()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(br,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(br,"").trim()}var Es=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function oe(e,t=Le()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return Es?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function hr(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:s,value:l}=e;return{first:!l.slice(0,i).includes(`
`),last:!l.slice(s).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var yr=e=>{let t=et();return(t&&Me(e,t))??Me(e)},Gt=()=>yr(d.stopButton),Ts=()=>{let e=yr(d.sendButton);return e&&!e.matches(d.stopButton)?e:null};function vr(){let e=Ts();if(e){e.disabled||e.click();return}Le()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var Sr=()=>Ze(Gt());var Er=new S("Network"),Cs=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,Ms=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,zt=1e3,As=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),B=qt(),zo=new Map,xr=new Map,Ls=1,W=e=>e?zo.get(e)??null:null;function Ut(e){let t=zo.get(e);return t||zo.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var Tr=e=>e==="user"||e==="assistant";function Cr(e){let t=e.author?.role;if(!e.id||!Tr(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(c=>typeof c=="string").join(`
`).trim(),i=n.filter(c=>T(c)&&c.content_type==="image_asset_pointer").length,s=e.metadata?.attachments,l=Array.isArray(s)&&s.length>0;return!r&&!i&&!l?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*zt:null,text:r,hasFiles:l,imageCount:i}}var Mr=e=>e.filter((t,o)=>t.role==="user"||e[o+1]?.role!=="assistant");function Ps(e,t){let o=t.filter(T).map(i=>T(i.message)?i.message:i);for(let i of o)i.id&&i.create_time&&e.times.set(i.id,i.create_time*zt);let n=o.map(Cr).filter(i=>i!=null),r=new Set(n.map(i=>i.id));return e.chain=Mr([...e.chain.filter(i=>!r.has(i.id)),...n]),e}function ks(e,t){if(!T(t)||!(T(t.mapping)||Array.isArray(t.messages)))return null;let o=Ut(e);if(typeof t.title=="string"&&t.title&&(o.title=t.title),Array.isArray(t.messages))return Ps(o,t.messages);let n=t.mapping;for(let l of Object.values(n)){let c=l.message?.create_time;l.message?.id&&c&&o.times.set(l.message.id,c*zt)}let r=[],i=new Set,s=typeof t.current_node=="string"?t.current_node:null;for(;s&&!i.has(s)&&n[s];){i.add(s);let l=n[s].message,c=l?Cr(l):null;c&&r.push(c),s=n[s].parent??null}return r.length&&(o.chain=Mr(r.toReversed())),o}function Rs(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}function Os(e){if(typeof e?.body!="string")return null;let t=je(e.body);return T(t)&&typeof t.conversation_id=="string"?t.conversation_id:null}function Is(e,t){if(!T(e))return;typeof e.type=="string"&&As.has(e.type)&&(t.handoff=!0);let o=T(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(Ut(e.conversation_id).title=e.title,B.emit("conversation",Ut(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&Tr(n.author?.role)){let r=n.create_time*zt;t.conversationId&&Ut(t.conversationId).times.set(n.id,r),B.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function Bs(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:s}=await o.read();if(i)break;r+=n.decode(s,{stream:!0});let l=r.split(`
`);r=l.pop()??"";for(let c of l){if(!c.startsWith("data:"))continue;let u=c.slice(5).trim();u&&u!=="[DONE]"&&Is(je(u),t)}}}async function Ds(e,t,o){let n={conversationId:t,error:!1,handoff:!1};xr.set(e,t),B.emit("generate-start",{requestId:e,conversationId:t});try{let r=await o;r.ok?r.headers.get("content-type")?.includes("event-stream")&&await Bs(r.clone(),n):n.error=!0}catch(r){let i=r instanceof DOMException&&r.name==="AbortError";n.handoff||=i,n.error||=!i}finally{xr.delete(e),B.emit("generate-end",{requestId:e,...n})}}async function Ns(e,t){try{let o=await t;if(!o.ok)return;let n=ks(e,await o.clone().json());n&&B.emit("conversation",n)}catch(o){Er.debug("Conversation read skipped",o)}}function Hs(e,t,o){let n=Rs(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&Cs.test(n.pathname)){Ds(Ls++,Os(t),o);return}let i=r==="GET"&&n.pathname.match(Ms)?.[1];i&&Ns(i,o)}var wr=!1;function Ar(){if(wr)return;wr=!0;let e=K.fetch,t=function(o,n){let r=e.call(this??K,o,n);try{Hs(o,n,r)}catch(i){Er.error("Fetch tap failed",i)}return r};K.fetch=typeof exportFunction=="function"?exportFunction(t,K):t}var _s="__reactContainer$",Lr="__reactFiber$";function Ft(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var Fo=(e,t)=>Object.keys(e.wrappedJSObject??e).some(o=>o.startsWith(t)),Pe=e=>!Fo(document,_s)||Fo(e,Lr);function tt(){return document.body?Promise.resolve():new Promise(e=>{let t=new MutationObserver(()=>{document.body&&(t.disconnect(),e())});t.observe(document,{childList:!0,subtree:!0})})}async function Pr(){await tt();let e=Date.now()+8e3;for(;!Fo(document.body,Lr)&&Date.now()<e;)await new Promise(t=>setTimeout(t,100))}var $s=new S("Route"),kr=/\/c\/(?!local-)([\w-]+)/,qs=500,Wo=e=>{try{return new URL(e,location.origin).pathname.match(kr)?.[1]??null}catch{return null}},v=()=>location.pathname.match(kr)?.[1]??null,pe=()=>location.pathname==="/",Rr=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",Kt=new Set,Wt=location.href,Ko=v(),jt;function jo(){if(location.href===Wt)return;let e={prevHref:Wt,href:location.href,prevId:Ko,id:v()};Wt=e.href,Ko=e.id;for(let t of Kt)try{t(e)}catch(o){$s.error("Route listener failed",o)}}function Gs(){let e=new AbortController,{navigation:t}=K;t?.addEventListener("currententrychange",()=>queueMicrotask(jo),{signal:e.signal}),addEventListener("popstate",jo,{signal:e.signal});let o=setInterval(jo,qs);return()=>{e.abort(),clearInterval(o)}}function ne(e){return Kt.add(e),jt||(Wt=location.href,Ko=v(),jt=Gs()),()=>{Kt.delete(e),!Kt.size&&(jt?.(),jt=void 0)}}var Us=250,zs=400,Fs=6e4,js=5e3,Ks=`:is(${d.turn}) :is(${d.turnBusy})`,x=qt(),Xt=new Set,Vo=new Set,re=!1,Ir=0,ke=null,Re=!1,Vt=!1,ot=0,Jt=!1,nt=null,Or=!1,D=()=>({generating:re,conversationId:v()}),Br=()=>Sr()||!!document.querySelector(Ks);function Ws(){let e=Br();return e?Vt||(ot=0,Jt=!0):Vt=!1,[...Xt].some(t=>!Vo.has(t))||e&&!Vt||Date.now()<ot}function Vs(){return nt?.error?"error":Re?"stopped":"done"}function Ys(){ke=null,re=!1,Jt=!1,x.emit("fall",{conversationId:v(),outcome:Vs()}),Re=!1,nt=null}function Dr(){let e=Ws();e&&!re&&(re=!0,Ir=Date.now(),Re=!1,nt=null,x.emit("rise",{conversationId:v()})),e||!re?ke=null:ke==null?ke=Date.now():Date.now()-ke>=zs&&Ys()}function Yt(){Dr(),x.emit("tick",D())}function Xs({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(re||Date.now()-Ir<Fs);if(!o&&re){for(let n of Xt)Vo.add(n);Vt=Br(),ot=0,Jt=!1,ke=null,re=!1,Re=!1,nt=null,x.emit("fall",{conversationId:e,outcome:"left"})}x.emit("context",{prevId:e,id:t,migrated:o}),Yt()}function Js(e){e.target instanceof Element&&e.target.closest(d.stopButton)&&(Re=!0,ot=0)}function Nr(){Or||(Or=!0,B.on("generate-start",({requestId:e})=>{Xt.add(e),Yt()}),B.on("generate-end",e=>{Xt.delete(e.requestId),!Vo.delete(e.requestId)&&(nt=e,ot=e.handoff&&!e.error&&!Re&&!Jt?Date.now()+js:0,Yt())}),ne(Xs),document.addEventListener("click",Js,!0),gr(Yt,Us),Ft().then(()=>M(Dr)))}var Hr={BetterNavigator:1790660235e3,ChatListStatus:1790658944e3,ChatStateFavicons:1790623094e3,Cleaner:1790622654e3,ComposerOpacity:1790616549e3,CustomSidebarIdentity:1790658669e3,GreetingCustomizer:1790616549e3,InputHistory:1790658669e3,MessageTimestamps:1790649198e3,NoDictation:1790653816e3,NoShareLink:1790658669e3,NoSidebarIdentity:1790616549e3,PromptQueue:1790620238e3,RecentTopics:1790620238e3,ResponseNotification:1790660776e3,Settings:1790660776e3,StreamerMode:1790616549e3,WiderChat:1790616549e3};var b=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,Zs="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",Qs={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${Zs}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:b('<path d="M18 6 6 18M6 6l12 12"/>'),gear:b('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:b('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:b('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:b('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:b('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:b('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:b('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:b('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:b('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:b('<path d="m6 9 6 6 6-6"/>'),play:b('<path d="M7 4v16l13-8z"/>'),plus:b('<path d="M12 5v14M5 12h14"/>'),check:b('<path d="m5 12 5 5 9-10"/>'),alert:b('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:b('<path d="M4 5h16v11H9l-5 4z"/>'),layout:b('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:b('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:b('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:b('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:b('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:b('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:b('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:b('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:b('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:b('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:b('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:b('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:b('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:b('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:b('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),grip:b('<path d="M9 6h0M15 6h0M9 12h0M15 12h0M9 18h0M15 18h0"/>')},N=e=>fr(Qs[e]);var ie="data-bloom-tip",Yo=6,Xo=8,fe,_r=null;function Oe(e){if(e===_r)return;if(_r=e,!e){fe?.remove();return}fe??=a("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),fe.textContent=e.getAttribute(ie),document.body.append(fe);let t=e.getBoundingClientRect(),{width:o,height:n}=fe.getBoundingClientRect(),r=t.bottom+Yo+n<=innerHeight-Xo;fe.style.left=`${we(t.left+t.width/2-o/2,Xo,innerWidth-o-Xo)}px`,fe.style.top=`${r?t.bottom+Yo:t.top-Yo-n}px`}var $r=e=>e instanceof Element?e.closest(`[${ie}]`):null;function qr(){let e=new AbortController,t={passive:!0,signal:e.signal};return document.addEventListener("pointerover",o=>Oe($r(o.target)),t),document.addEventListener("pointerout",o=>o.relatedTarget||Oe(null),t),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&Oe($r(o.target)),t),document.addEventListener("focusout",()=>Oe(null),t),document.addEventListener("pointerdown",()=>Oe(null),t),()=>{e.abort(),Oe(null)}}var el=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,Gr=/\S+@\S+\.\S+/,tl=3,ol=/^\/g\/(g-p-[^/]+)\//,nl=/^g-p-[0-9a-f]+-?/i,Ur=e=>!!e.closest(".sr-only"),Jo=e=>!!e?.querySelector(d.menuButton);function zr(){return[...document.querySelectorAll(d.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(Jo)).filter(e=>e!=null)}function Fr(){let e=[...document.querySelectorAll(d.oldProfile)];if(e.length)return e.map(o=>{let n=o.parentElement?.children.length===1?o.parentElement:o;return{kind:"profile",anchor:n,insert:r=>n.before(r)}});let t=zr().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(d.rail)){let n=[...o.children].find(Jo);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}var Zo=e=>!e.closest("[data-bloom]")&&(!!e.querySelector("img, [class*=rounded-full]")||Vr(e).some(t=>!Ur(t))),jr=e=>[...e.parentElement?.children??[]].find(t=>t!==e&&t instanceof HTMLElement&&Zo(t))??null;function Kr(){let e=[...document.querySelectorAll(d.oldProfile)];return e.length?e:[...zr(),...[...document.querySelectorAll(d.rail)].map(o=>[...o.children].findLast(Jo))].map(o=>[...o?.querySelectorAll(d.menuButton)??[]].findLast(n=>Zo(n)||jr(n))).filter(o=>o!=null)}var Wr=()=>Kr().map(e=>Zo(e)?e:jr(e)).filter(e=>e!=null);function Vr(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!R(t.textContent??"")&&!(t instanceof SVGElement))}var rl=e=>{if(/rounded-full/.test(e.getAttribute("class")??""))return!0;if(!e.clientWidth)return!1;let{borderRadius:t}=getComputedStyle(e);return t.includes("%")||Number.parseFloat(t)>=e.clientWidth/2};function Zt(e,t,o){for(let n of e.querySelectorAll(`[${t}]`))n!==o&&n.removeAttribute(t);o&&!o.hasAttribute(t)&&o.setAttribute(t,"")}function il(e,t){if(R(e.textContent??"").length>tl)return null;let o=e.closest("button");for(let n=e;n&&n!==t&&n!==o;n=n.parentElement)if(rl(n))return n;return null}function Qo(e,t){e.hasAttribute(`data-bloom-${t}`)||e.setAttribute(`data-bloom-${t}`,"");let o=e.querySelector("img:not([data-bloom] img)"),n=Vr(e),r=o?null:n.map(p=>il(p,e)).find(p=>p!=null),i=o?.closest("[class*=rounded-full]"),s=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");Zt(e,`data-bloom-${t}-avatar`,s);let l=n.filter(p=>!s?.contains(p)&&!Ur(p)),c=l.find(p=>el.test(R(p.textContent??""))),u=l.find(p=>Gr.test(p.textContent??""));Zt(e,`data-bloom-${t}-plan`,c),Zt(e,`data-bloom-${t}-email`,u),Zt(e,`data-bloom-${t}-name`,l.find(p=>p!==c&&p!==u))}function al(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function Qt(){return Kr().map(al).find(e=>e!=null)??[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&(Gr.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var rt=e=>[...document.querySelectorAll(d.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&Wo(t.href)===e);function Yr(e){let t=rt(e).find(o=>R(o.textContent??""));return t?R(t.textContent??""):null}function Xr(e){let t=new URL(e,location.origin).pathname.match(ol)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!Wo(n.href)&&R(n.textContent??""));return o?R(o.textContent??""):t.replace(nl,"").replaceAll("-"," ")||null}function en(e,t,o){let n=a("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o}});return n.addEventListener("click",r=>{r.stopPropagation();let i=n.getAttribute("aria-checked")!=="true";n.setAttribute("aria-checked",String(i)),t(i)}),n}function q(e,t,o){return a("button",{class:kt("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button"},on:{click:t}})}function G(e,t,o,n){let r=a("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":t,[ie]:t},on:{click:o}},N(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function eo(e,t,o,n,r,i){let s=a("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});s.value=String(e);let l=a("output",{text:`${s.value}${r}`});return s.addEventListener("input",()=>{l.textContent=`${s.value}${r}`,i(Number(s.value))}),a("div",{class:"bloom-slider"},s,l)}function tn(e,t,o){let n=a("select",{class:"bloom-select"},...t.map(r=>a("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function it(e,t,o="",n="text"){let r=a("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var sl=new S("SettingsPanel"),m=E("bloom-settings-"),ll=10080*60*1e3,cl=3e3,Jr="Toggle features. Some need a reload. Click the sliders icon to configure.",dl=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],ul=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],ml={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},Zr=new Set(["chat","ui","privacy"]),H=null,Ie="all",on="all",to="",nn=[],Qr=()=>[...ue.values()].filter(e=>!e.hidden),pl=e=>!!e.updatedAt&&Date.now()-e.updatedAt<ll;function fl(e){switch(Ie){case"favorites":return Dt.has(e.name);case"recent":return pl(e);case"all":return!0;case"other":return!e.tags.some(t=>Zr.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(Ie)}}function gl(e){switch(on){case"all":return!0;case"enabled":return Xe(e);case"disabled":return!Xe(e)}}function bl(e){let t=to.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function hl(e){let t=Bt.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return Ie==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var ei=e=>e.settings?.def??{},yl=e=>Object.values(ei(e)).some(t=>t.type!=="custom");function vl(e,t,o){let n=ce(e.name,t)??$o(o),r=i=>de(e.name,t,i);switch(o.type){case"boolean":return en(n,r,o.description??t);case"slider":return eo(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return tn(n,o.options,r);case"string":return it(n,r,o.placeholder);case"number":return it(String(n),i=>r(Number(i)),"","number");case"component":{let i=a("div",{class:m("component")});return nn.push(o.render(i)),i}case"custom":return null}}var Sl=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function ti(e){if(!H)return;let t=Object.entries(ei(e)).filter(([,i])=>i.type!=="custom").map(([i,s])=>{let l=vl(e,i,s),c=s.type==="boolean",u=s.type!=="component"&&a("div",{class:m("field-label"),text:Sl(i)}),p=s.description&&a("div",{class:m("field-desc"),text:s.description});return a("div",{class:m("field",c?"field-inline":"field-stacked")},(u||p)&&a("div",{class:m("field-text")},u,p),l)}),o,n=q("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},cl);return}clearTimeout(o),e.settings?.reset(),at(),ti(e)},"danger"),r=a("div",{class:m("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&at()}},a("div",{class:m("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},a("div",{class:m("popup-header")},a("div",{class:m("card-icon")},N(e.icon)),a("div",{class:m("popup-title")},a("div",{class:m("card-name"),text:e.name}),a("div",{class:m("popup-authors"),text:e.authors.join(", ")})),G("close","Close",at)),a("p",{class:m("popup-desc"),text:e.description}),a("div",{class:m("fields")},...t),a("div",{class:m("popup-footer")},n)));H.querySelector(`.${m("modal")}`)?.append(r)}function at(){for(let e of nn)e();nn=[],H?.querySelector(`.${m("popup-backdrop")}`)?.remove()}function xl(e){let t=Xe(e),o=Dt.has(e.name),n=Bt.has(e.name);return a("div",{class:m("card",t?"card-on":"card-off")},a("div",{class:m("card-top")},a("div",{class:m("card-icon")},N(e.icon)),a("div",{class:m("card-actions")},G("star",o?"Unstar":"Star",()=>{Dt.toggle(e.name),ge()},o),G("pin",n?"Unpin":"Pin to top",()=>{Bt.toggle(e.name),ge()},n),yl(e)&&G("gear","Settings",()=>ti(e)),e.required?null:en(t,r=>dr(e,r),`Enable ${e.name}`))),a("div",{class:m("card-name"),text:e.name}),a("div",{class:m("card-desc"),text:e.description,title:e.description}),a("div",{class:m("card-footer"),text:e.authors.join(", ")}))}function oi(){let e=Qr().some(o=>!o.tags.some(n=>Zr.has(n)));H?.querySelector(`.${m("tabs")}`)?.replaceChildren(...dl.filter(o=>o.id!=="other"||e).map(o=>a("button",{class:m("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===Ie)},on:{click:()=>{Ie=o.id,oi(),ge()}}})))}function ge(){if(!H)return;let e=Qr().filter(fl),t=H.querySelector(`.${m("search")} input`);t&&(t.placeholder=`Search ${Lt(e.length,"plugin")}...`);let o=hl(e.filter(i=>bl(i)&&gl(i))),n=H.querySelector(`.${m("grid")}`),r=to.trim()?"No plugins match your search.":ml[Ie]??"No plugins available.";n?.replaceChildren(...o.length?o.map(xl):[a("div",{class:m("empty"),text:r})])}function wl(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),H?.querySelector(`.${m("popup-backdrop")}`)?at():Be())}var ni,rn;function El(){if(H)return;let e=a("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=to,e.addEventListener("input",()=>{to=e.value,ge()}),H=a("div",{class:`bloom-root ${m("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&Be()}},a("div",{class:m("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},a("div",{class:m("header")},a("div",{class:m("logo")},N("bloom")),a("h2",{class:m("title"),text:"Bloom++"}),a("span",{class:m("hint"),attrs:{"aria-label":Jr,tabindex:"0",[ie]:Jr}},N("info")),a("span",{class:m("version"),text:"v2.0.19"}),G("close","Close",Be)),a("div",{class:m("tabs"),attrs:{role:"tablist"}}),a("div",{class:m("toolbar")},a("label",{class:m("search")},N("search"),e),tn(on,ul,t=>{on=t,ge()})),a("div",{class:m("grid")}))),H.addEventListener("keydown",t=>t.stopPropagation()),rn=new AbortController,document.addEventListener("keydown",wl,{capture:!0,signal:rn.signal}),document.body.append(H),oi(),ge(),ni=ur(ge),e.focus(),sl.debug("Opened")}function Be(){at(),rn?.abort(),ni?.(),H?.remove(),H=null}var oo=()=>H?Be():El();var ri=`/*
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
`;var st=E("bloom-entry-"),De=new Map,ii=!1,ai=[];function Cl(e){let t=a("button",{class:st("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:o=>{o.preventDefault(),o.stopPropagation(),oo()}}},N("bloom"),e!=="rail"&&a("span",{class:st("label"),text:"Bloom++"}));return a("div",{class:`bloom-root ${st("wrap")} ${st(e)}`,attrs:{"data-bloom":"entry"}},t)}function Ml(e){let t=a("div",{class:`bloom-root ${st("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),oo()}}},N("bloom"),a("span",{text:"Bloom++"})),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function Al(){let e=Fr();for(let[o,n]of De)o.isConnected&&e.some(r=>r.anchor===o)||(n.remove(),De.delete(o));for(let o of e){let n=De.get(o.anchor);if(n?.isConnected||!Pe(o.anchor))continue;let r=n??Cl(o.kind);De.set(o.anchor,r),o.insert(r)}let t=Qt();t&&!t.querySelector('[data-bloom="menu-entry"]')&&Ml(t)}var si=f({name:"Settings",description:"Bloom++ settings panel and its sidebar entry.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,hidden:!0,startAt:"HostReady",styles:ri,start(){ai=[M(Al),qr()],!ii&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",oo),ii=!0)},stop(){for(let e of ai)e();for(let e of De.values())e.remove();De.clear(),Be()}});var Ll=["data-turn","data-message-author-role"],Pl=/:(user|assistant)$/,an=`${d.messageUnit}, ${d.oldMessage}`,sn=e=>e==="user"||e==="assistant";function ln(){let e=document.querySelector(d.timelineScroll);if(e)return e;let t=document.querySelector(d.turn);for(let o=t?.parentElement;o;o=o.parentElement){let{overflowY:n}=getComputedStyle(o);if((n==="auto"||n==="scroll")&&o.scrollHeight>o.clientHeight)return o}return document.scrollingElement}var no=e=>e.getAttribute("data-chatgpt-search-unit-key")?.match(Pl)?.[1]??null,di=e=>[...e.querySelectorAll(d.searchUnit)].filter(t=>no(t)&&!t.parentElement?.closest(d.searchUnit)),li=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function lt(e){let t=li(e);return t.length?t:[...new Set([...e.querySelectorAll(an)].flatMap(li))]}function cn(e=document){let t=di(e);return t.length?t:[...e.querySelectorAll(an)].filter(o=>!o.parentElement?.closest(an))}function kl(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function Rl(e){for(let t of Ll){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(sn(o))return o}return e.querySelector(d.markdown)||e.querySelector(d.generatedImage)?"assistant":null}var Ol=e=>!e.parentElement?.closest(d.turn);function ro(){let e=W(v())?.chain??[],t=[...document.querySelectorAll(d.turn)].filter(Ol).flatMap(n=>{let r=di(n);return r.length?r.map(i=>({el:i,known:no(i)})):[{el:n,known:null}]}),{generating:o}=D();return t.map(({el:n,known:r},i)=>{let s=r?lt(n):cn(n).flatMap(lt),l=r??Rl(n)??kl(s,e)??(i%2?"assistant":"user"),c=l==="assistant"&&(n.matches(d.turnBusy)||!!n.querySelector(d.turnBusy)||o&&i===t.length-1);return{el:n,role:l,messageIds:s,streaming:c}})}var Il="[data-bloom], .sr-only",Bl=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,ci=new WeakMap;function io(e){let t=e.el.textContent?.length??0,o=ci.get(e.el);if(o?.length===t)return o.summary;let n=Dl(e);return ci.set(e.el,{length:t,summary:n}),n}function Dl(e){let t=e.el.querySelectorAll(d.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.querySelector(e.role==="assistant"?d.markdown:".whitespace-pre-wrap")??e.el,i=[...o.querySelectorAll(Il)].map(s=>R(s.textContent??"")).filter(Boolean).reduce((s,l)=>s.replace(l,`
`),o.innerText||o.textContent||"").split(`
`).map(R).filter(s=>s&&!Bl.test(s));return i.length?i.join(" "):e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function ao(e){return e.text?R(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var ui=`/*
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
`;var k=E("bloom-nav-"),hi=80,Hl=1200,_l=2,$l=40,ql=.3,Gl=12,Ul={user:"\u2753",assistant:"\u{1F916}"},co=g({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the outline too.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),O=null,U=[],Ne=-1,so="",mi=0,pi=[],ct=null,lo;function yi(){let e=ro().map(s=>({role:s.role,summary:io(s),ids:s.messageIds,turn:s,streaming:s.streaming})),t=W(v())?.chain??[];if(!t.length)return e;let o=new Set(t.map(s=>s.id)),n=new Map(e.flatMap(s=>s.ids.map(l=>[l,s]))),r=new Set,i=[];for(let s of t){let l=n.get(s.id);l&&r.has(l)||(l&&r.add(l),i.push(l??{role:s.role,summary:ao(s),ids:[s.id],turn:null,streaming:!1}))}return[...i,...e.filter(s=>!s.ids.some(l=>o.has(l)))]}function zl(e){let t=e.getBoundingClientRect(),o=t.top+t.height*ql,n=-1;return U.forEach((r,i)=>{let s=r.turn?.el.getBoundingClientRect();s&&s.top<=o&&(n=i)}),n===-1?U.findIndex(r=>r.turn):n}function fi(e){co.store.jumpEffect==="border"&&(e.classList.add(k("flash")),setTimeout(()=>e.classList.remove(k("flash")),Hl))}function dn(e){let t=U[e],o=ln();if(!t||!o)return;let n=t.turn?.el;if(n?.isConnected){let u=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:u<o.clientHeight*_l?"smooth":"auto"}),fi(n);return}let r=U.map((u,p)=>u.turn?p:-1).filter(u=>u>=0),i=r.length&&e<r[0]?-1:1,s=++mi,l=0,c=()=>{if(s!==mi||l++>$l)return;U=yi();let u=U.find(p=>p.ids.some(L=>t.ids.includes(L)))?.turn?.el;if(u){u.scrollIntoView({block:"start"}),fi(u);return}o.scrollBy({top:i*o.clientHeight*.9}),requestAnimationFrame(c)};c()}function Fl(e,t){return a("button",{class:k("row"),attrs:{type:"button","data-index":String(t)},on:{click:()=>dn(t)}},a("span",{text:Ul[e.role]}),a("span",{class:"bloom-truncate",text:Ee(e.summary||"\u2026",hi)}))}function jl(){let e=ln();if(U=yi(),!U.length||!e){O?.remove(),O=null,so="";return}ct!==e&&(lo?.abort(),lo=new AbortController,e.addEventListener("scroll",Ae(gi),{passive:!0,signal:lo.signal}),ct=e),O??=a("div",{class:`bloom-root ${k("root")}`,attrs:{"data-bloom":"navigator"}},a("div",{class:k("rail")}),a("div",{class:k("toc")},a("div",{class:k("toc-head")}),a("div",{class:k("toc-list")}))),O.isConnected||document.body.append(O);let t=e.getBoundingClientRect(),o=Math.min(t.bottom,et()?.getBoundingClientRect().top??t.bottom);O.style.right=`${document.documentElement.clientWidth-t.left-e.clientLeft-e.clientWidth+Gl}px`,O.style.top=`${(t.top+o)/2}px`;let n=JSON.stringify([co.store.showAssistant,U.map(r=>[r.role,r.summary,r.streaming])]);n!==so&&(so=n,Kl()),gi()}function gi(){if(!O||!ct)return;Ne=zl(ct),O.querySelectorAll(`.${k("tick")}`).forEach((t,o)=>t.classList.toggle(k("tick-current"),o===Ne)),O.querySelectorAll(`.${k("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===Ne)));let e=O.querySelector(`.${k("toc-head")}`);e&&(e.textContent=`${Ne+1} / ${U.length}`)}function Kl(){O?.querySelector(`.${k("rail")}`)?.replaceChildren(...U.map((t,o)=>a("button",{class:kt(k("tick"),k(`tick-${t.role}`),t.streaming&&k("tick-streaming")),title:Ee(t.summary,hi),attrs:{type:"button","aria-label":`Jump to message ${o+1}`},on:{click:()=>dn(o)}})));let e=U.map((t,o)=>({entry:t,index:o})).filter(({entry:t})=>co.store.showAssistant||t.role==="user");O?.querySelector(`.${k("toc-list")}`)?.replaceChildren(...e.map(({entry:t,index:o})=>Fl(t,o)))}var ae=Ae(jl),Wl=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function bi(e){if(!O||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||Wl(document.activeElement)||document.querySelector("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:Ne-1,ArrowDown:Ne+1,Home:0,End:U.length-1}[e.key];o==null||o<0||o>=U.length||(e.preventDefault(),e.stopPropagation(),dn(o))}var vi=f({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:co,styles:ui,start(){pi=[M(e=>_(e)&&ae()),ne(ae),B.on("conversation",ae),x.on("rise",ae),x.on("fall",ae)],addEventListener("keydown",bi,!0),addEventListener("resize",ae,{passive:!0})},stop(){for(let e of pi)e();lo?.abort(),ct=null,removeEventListener("keydown",bi,!0),removeEventListener("resize",ae),O?.remove(),O=null,so=""},onSettingsChange:ae});var Si=`/*
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
`;var Yl=E("bloom-cls"),Xl="bloom-cls",Jl=600*1e3,mn=Fn("tab"),_e=new Map,ut=new Map,He=null,xi=[],Zl=e=>e==="streaming"||e==="error";function Ql(){let e=new Map,t=Date.now();for(let[o,n]of ut)t-n.at>Jl?ut.delete(o):e.set(o,n.status);for(let[o,n]of _e)e.set(o,n);return e}function ec(e){return a("span",{class:`bloom-root ${Yl("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&N("alert"))}function dt(){let e=Ql(),t=new Set;for(let[o,n]of e)for(let r of rt(o)){if(!Pe(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let s=ec(n);t.add(s),r.append(s)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function uo(e,t){e&&(t?_e.set(e,t):_e.delete(e),He?.postMessage({tab:mn,id:e,status:t}),dt())}function tc({data:e}){!T(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===mn||(Zl(e.status)?ut.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):ut.delete(e.id),dt())}function un(){for(let e of _e.keys())He?.postMessage({tab:mn,id:e,status:null})}var wi=f({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:Si,start(){He=typeof BroadcastChannel=="function"?new BroadcastChannel(Xl):null,He?.addEventListener("message",tc),addEventListener("pagehide",un),xi=[x.on("rise",({conversationId:e})=>uo(e,"streaming")),x.on("fall",({conversationId:e,outcome:t})=>uo(e,t==="error"?"error":null)),x.on("context",({prevId:e,id:t,migrated:o})=>{o&&D().generating?uo(t,"streaming"):!o&&_e.get(e??"")==="streaming"&&uo(e,null)}),M(e=>_(e)&&dt())],v()&&dt()},stop(){for(let e of xi)e();un(),He?.close(),He=null,removeEventListener("pagehide",un),_e.clear(),ut.clear(),dt()}});var Ti=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],fo={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},oc={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},nc="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",pn=32,go=64,fn="#FCFCFC",gn="#111111",rc=14,bo=51.5,ic=12.5,ac=9.75,Ei=52,sc=10.5,lc=7.75,cc={rotate:e=>e.arc(bo,bo,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function mo(e){let t=document.createElement("canvas");t.width=t.height=pn;let o=t.getContext("2d");return o?(o.scale(pn/go,pn/go),e(o),t.toDataURL("image/png")):""}function po(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D(nc);o&&(e.strokeStyle=gn,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function ho(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function dc(e,t){ho(e,bo,ic,gn),ho(e,bo,ac,fo[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),cc[t](e),e.stroke()}function uc(e,t){e.beginPath(),e.roundRect(0,0,go,go,rc),e.fillStyle=t,e.fill()}var mc=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function Ci(e,t){switch(e){case"original":return mc(oc[t]);case"hole":return mo(o=>po(o,fo[t],!0));case"bg":return mo(o=>{uc(o,fo[t]),po(o,fn,!1)});case"dot":return mo(o=>{po(o,fn,!0),ho(o,Ei,sc,gn),ho(o,Ei,lc,fo[t])});case"badge":return mo(o=>{po(o,fn,!0),dc(o,t)})}}var pt="bloom-chat-state-favicon",ft="data-bloom-rel",yn="data-bloom-media",Mi="bloom-parked-icon",pc="/favicon.ico",Li=g({style:{type:"select",description:"How the tab icon shows the chat state.",options:Ti,default:"bg"}}),se=null,Pi="",yo=null,ki="",Ai=new Map,vn,bn=[],Ri=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${ft}]`)];function Sn(){for(let e of Ri())e.id!==pt&&(e.hasAttribute(ft)||(ki||=e.href,e.setAttribute(ft,e.rel),e.setAttribute(yn,e.getAttribute("media")??"")),e.rel!==Mi&&(e.rel=Mi),e.media!=="not all"&&(e.media="not all"))}function fc(){for(let e of Ri()){let t=e.getAttribute(ft);if(t==null)continue;e.rel=t;let o=e.getAttribute(yn);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(ft),e.removeAttribute(yn)}}function Oi(){let e=document.getElementById(pt);return e||(e=document.createElement("link"),e.id=pt,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function gc(e){if(e==="wait")return ki||pc;let t=Li.store.style,o=`${t}:${e}`,n=Ai.get(o);return n||Ai.set(o,n=Ci(t,e)),n}function hn(e){if(e)return"rotate";let t=$();return se&&t&&t!==Pi&&(se=null),se==="error"?"error":se==="done"?"done":t?"ready":"wait"}function mt(e,t=!1){if(e===yo&&!t)return;yo=e;let o=Oi(),n=gc(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function bc(){vn=new MutationObserver(()=>{Sn(),document.head.lastElementChild?.id!==pt&&Oi()}),vn.observe(document.head,{childList:!0})}var Ii=f({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"HostReady",settings:Li,start(){Sn(),mt(hn(D().generating),!0),bc(),bn=[x.on("rise",()=>{se=null,mt("rotate")}),x.on("fall",({outcome:e})=>{se=e==="done"||e==="error"?e:null,Pi=$(),mt(hn(!1))}),x.on("context",({migrated:e})=>{e||(se=null)}),x.on("tick",({generating:e})=>{Sn(),mt(hn(e))})]},stop(){for(let e of bn)e();bn=[],vn?.disconnect(),document.getElementById(pt)?.remove(),fc(),yo=null,se=null},onSettingsChange(){mt(yo??"wait",!0)}});var hc={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]'],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['div:has(> div > aside button[aria-label="Dismiss migration notice"])','aside:has(button[aria-label="Dismiss migration notice"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])']},Bi=g({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice above the composer.",default:!0}}),Di=f({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads and notices.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:Bi,styles:()=>Te(Object.entries(hc).flatMap(([e,t])=>Bi.store[e]?t:[]))});var xn=`form:has(${d.composerInput}), ${d.oldComposerForm}`,yc=`:is(${xn}) :is([class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"])`,vc='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',Sc='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',xc="var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, #fff)))",Ni=g({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function wc(){let{opacity:e,blur:t}=Ni.store;return e>=100?"":`:is(${vc}), :is(${xn}){background-color:transparent!important;background-image:none!important;box-shadow:none!important}:is(${Sc}){display:none!important}${yc}{background-color:color-mix(in srgb, ${xc} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important}:is(${xn}) :is(${d.composerInput}){background-color:transparent!important}`}var Hi=f({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:Ni,styles:wc});var wn=0,vo;function Ec(e){if(!_(e))return;for(let o of Wr())Qo(o,"profile");let t=Qt();t&&Qo(t,"menu")}function $e(){wn++;let e=!0;return tt().then(()=>{e&&wn&&!vo&&(vo=M(Ec))}),()=>{e&&(e=!1,!--wn&&(vo?.(),vo=void 0))}}var Q=E("bloom-csi-"),Tc=256,Cc=160,So=1,_i=4,Mc=.1,Ac=.0015,Lc=250;function Pc(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function kc(e){return new Promise((t,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function Rc(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:we(t.x,n,1-n),y:we(t.y,r,1-r)}}function $i(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function Oc(e,t){let o=a("canvas");return o.width=o.height=Tc,$i(o,e,t),o.toDataURL("image/png")}function qi(e){let t=null,o={x:C.store.cropX,y:C.store.cropY,zoom:C.store.cropZoom},n,r=a("canvas",{class:Q("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=Cc*devicePixelRatio;let i=a("div",{class:`bloom-muted ${Q("status")}`}),s=a("div",{class:Q("zoom")}),l=a("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function c(h,I=!0){t&&(o=Rc(t,h),$i(r,t,o),I&&(clearTimeout(n),n=setTimeout(()=>{t&&(C.store.cropX=o.x,C.store.cropY=o.y,C.store.cropZoom=o.zoom,C.store.avatarUrl=Oc(t,o))},Lc)))}function u(){s.replaceChildren(eo(o.zoom,So,_i,Mc,"\xD7",h=>c({...o,zoom:h})))}async function p(h,I){i.textContent="";try{t=await kc(h),I&&(C.store.avatarSource=h,o={x:.5,y:.5,zoom:So}),e.classList.add(Q("has-image")),u(),c(o,I)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let L=h=>{h?.type.startsWith("image/")&&Pc(h).then(I=>p(I,!0))};l.addEventListener("change",()=>L(l.files?.[0])),r.addEventListener("wheel",h=>{t&&(h.preventDefault(),c({...o,zoom:we(o.zoom*(1-h.deltaY*Ac),So,_i)}),u())},{passive:!1}),r.addEventListener("pointerdown",h=>{if(!t)return;r.setPointerCapture(h.pointerId);let I={...o},Fe=r.getBoundingClientRect(),Mt=At=>{if(!t)return;let j=Math.max(Fe.width/t.naturalWidth,Fe.height/t.naturalHeight)*o.zoom;c({...o,x:I.x-(At.clientX-h.clientX)/(t.naturalWidth*j),y:I.y-(At.clientY-h.clientY)/(t.naturalHeight*j)})};r.addEventListener("pointermove",Mt),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",Mt),{once:!0})});let Y=a("div",{class:Q("cropper"),attrs:{tabindex:"0"},on:{paste:h=>L([...h.clipboardData?.files??[]].find(I=>I.type.startsWith("image/"))),dragover:h=>h.preventDefault(),drop:h=>{h.preventDefault(),L(h.dataTransfer?.files[0])}}},a("div",{class:Q("stage")},r),a("div",{class:Q("controls")},it("",h=>h.trim()&&void p(h.trim(),!0),"https://\u2026 or data:image/\u2026","url"),a("div",{class:Q("buttons")},q("Choose file",()=>l.click()),q("Reset crop",()=>{c({x:.5,y:.5,zoom:So}),u()}),q("Clear",()=>{t=null,e.classList.remove(Q("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),s.replaceChildren(),C.store.avatarUrl="",C.store.avatarSource=""},"danger")),s,i,l));return e.append(Y),C.store.avatarSource&&p(C.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var Gi=`/*
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
`;var gt="data-bloom-csi-avatar",En="data-bloom-csi-sized",ji="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",Bc=32,C=g({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>qi(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),Ui=[];function Ki(e){e.removeAttribute(gt),e.removeAttribute(En)}function zi(e){return(C.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function Fi(e=[]){if(!_(e))return;let t=C.store.displayName.trim()||null,o=!!C.store.avatarUrl,n=new Set(t?zi("name"):[]);for(let i of document.querySelectorAll(ji))n.has(i)||me(i,null);for(let i of n)me(i,t);let r=new Set(o?zi("avatar"):[]);for(let i of document.querySelectorAll(`[${gt}]`))r.has(i)||Ki(i);for(let i of r)i.hasAttribute(gt)||i.setAttribute(gt,""),i.toggleAttribute(En,!i.closest('[role="menu"]'))}function Dc(){let e=C.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${C.store.avatarSize}px}:is(${d.rail}, ${d.oldRail}) [${En}]{--bloom-csi-size:${Bc}px}`:""}var Wi=f({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:C,styles:()=>`${Dc()}
${Gi}`,start(){Ui=[$e(),M(Fi)]},stop(){for(let e of Ui)e();for(let e of document.querySelectorAll(`[${gt}]`))Ki(e);for(let e of document.querySelectorAll(ji))me(e,null)},onSettingsChange(){Fi()}});var qe=E("bloom-greeting-"),Vi=30,Yi=100;function Xi(e){let t=-1,o=a("textarea",{class:`bloom-input ${qe("input")}`,attrs:{maxlength:String(Yi),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=q("Add",i),r=a("div",{class:qe("list")});function i(){let c=o.value.trim().slice(0,Yi);if(!c)return;let u=[...w.store.greetings];t>=0?u[t]=c:u.length<Vi&&u.push(c),w.store.greetings=u,t=-1,o.value="",s()}function s(){let{greetings:c}=w.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&c.length>=Vi,r.replaceChildren(...c.length?c.map((u,p)=>a("div",{class:qe("row",p===t?"row-editing":"row-idle")},a("div",{class:qe("text"),text:u}),G("edit","Edit",()=>{t=p,o.value=u,o.focus(),s()}),G("trash","Delete",()=>{w.store.greetings=c.filter((L,Y)=>Y!==p),t===p&&(t=-1),s()}))):[a("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",c=>{c.key==="Enter"&&(c.ctrlKey||c.metaKey)&&i()}),e.append(a("div",{class:qe("editor")},r,a("div",{class:qe("form")},o,n))),s();let l=Ce((c,u)=>c==="GreetingCustomizer"&&u==="greetings"&&s());return()=>{l(),e.replaceChildren()}}var Ji=`/*
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
`;var wo="data-bloom-greeting",Hc=1e3,_c=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],w=g({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>Xi(e)},greetings:{type:"custom",default:_c},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),xo,Zi=[],Tn,Qi=()=>w.store.greetings.filter(e=>typeof e=="string"&&e.trim());function ht(){let e=Qi();if(e.length)if(w.store.order==="random"&&e.length>1){let t=w.store.lastRandom;for(;t===w.store.lastRandom;)t=Math.floor(Math.random()*e.length);w.store.lastRandom=t,w.store.index=t}else w.store.index=(w.store.index+1)%e.length}function $c(){return pe()?Me(d.homeHeading):null}function ea(){for(let e of document.querySelectorAll(`[${wo}]`))e.removeAttribute(wo),me(e,null)}function bt(){let e=Qi(),t=$c();if(!t||!e.length){ea();return}(w.store.index<0||w.store.index>=e.length)&&ht(),t.setAttribute(wo,""),me(t,e[Math.max(0,w.store.index)%e.length])}function Cn(){clearInterval(xo),xo=void 0,w.store.mode==="interval"&&pe()&&(xo=setInterval(()=>{ht(),bt()},w.store.intervalSec*Hc))}function qc(e){w.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${wo}]`)||getSelection()?.toString()||(ht(),bt())}function Gc(){pe()&&w.store.mode==="refresh"&&ht(),Cn(),bt()}var ta=f({name:"GreetingCustomizer",description:"Replace the \u201CWhat can I help with?\u201D heading on the home page with your own lines.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:w,styles:Ji,start(){Tn=new AbortController,document.addEventListener("click",qc,{signal:Tn.signal}),pe()&&w.store.mode==="refresh"&&ht(),Cn(),Zi=[M(e=>_(e)&&bt()),ne(Gc)]},stop(){Tn?.abort();for(let e of Zi)e();clearInterval(xo),ea()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&Cn(),bt()}});var yt=E("bloom-history-"),Mn=10,Uc=3e3;function oa(e){let t="",o=0,n=new Set,r=a("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),i=a("div",{class:yt("list")}),s=a("div",{class:yt("pager")}),l,c=q("Clear all",()=>{if(!l){c.textContent="Click again to clear",l=setTimeout(()=>{l=void 0,c.textContent="Clear all"},Uc);return}clearTimeout(l),l=void 0,c.textContent="Clear all",vt([])},"danger");function u(){let L=[...be.store.entries].toReversed(),Y=t.trim().toLowerCase(),h=Y?L.filter(j=>j.toLowerCase().includes(Y)):L,I=Math.max(1,Math.ceil(h.length/Mn));o=Math.min(o,I-1);let Fe=h.slice(o*Mn,(o+1)*Mn).map(j=>a("div",{class:yt("row")},a("button",{class:yt("text",n.has(j)?"text-open":"text-closed"),text:j,title:n.has(j)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{n.delete(j)||n.add(j),u()}}}),G("copy","Copy",()=>void jn(j)),G("trash","Delete",()=>vt(be.store.entries.filter(Ja=>Ja!==j)))));i.replaceChildren(...Fe.length?Fe:[a("div",{class:"bloom-muted",text:Y?"No matching prompts.":"No saved prompts yet."})]),s.replaceChildren(a("span",{class:"bloom-muted",text:`${h.length} ${Y?"matching":"saved"} \xB7 page ${o+1} of ${I}`}),q("Previous",()=>{o--,u()}),q("Next",()=>{o++,u()}),c);let[Mt,At]=s.querySelectorAll("button");Mt.disabled=o===0,At.disabled=o>=I-1,c.disabled=!L.length}r.addEventListener("input",()=>{t=r.value,o=0,u()}),e.append(a("div",{class:yt("manager")},r,i,s)),u();let p=Ce((L,Y)=>L==="InputHistory"&&Y==="entries"&&u());return()=>{p(),clearTimeout(l),e.replaceChildren()}}var na=`/*
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
`;var Fc=E("bloom-history-"),jc=2e3,be=g({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>oa(e)},entries:{type:"custom",default:[]}}),F=null,An={text:"",at:0},he=null,Ln,Eo=()=>be.store.entries.filter(e=>typeof e=="string");function vt(e){be.store.entries=e.slice(-be.store.maxEntries)}function Pn(e){let t=e.trim();if(!t)return;let o=Date.now();t===An.text&&o-An.at<jc||(An={text:t,at:o},vt([...Eo().filter(n=>n!==t),t]))}function Kc(e,t){let o=Le();if(!o)return;he??=a("div",{class:`bloom-root ${Fc("hud")}`,attrs:{"data-bloom":"history-hud","aria-live":"polite"}}),he.textContent=`${e+1} / ${t}`;let n=(o.closest("form")??o).getBoundingClientRect();he.style.left=`${n.left+n.width/2}px`,he.style.top=`${n.top}px`,he.isConnected||document.body.append(he)}function St(){F=null,he?.remove()}function Wc(e){let t=Eo();if(!F)return;let o=t[e];F.index=e,F.shown=o,oe(o),Kc(t.length-1-e,t.length)}function Vc(e){let t=Eo();if(!t.length)return!1;if(!F){if(e===1)return!1;F={index:t.length,draft:$(),shown:""}}let o=F.index+e;return o<0?!0:o>=t.length?(oe(F.draft),St(),!0):(Wc(o),!0)}function Yc(e){if(e.isComposing||!Qe(e.target))return;let t=e.target;if(e.key==="Enter"&&!e.shiftKey){Pn($(t)),St();return}if(e.key==="Escape"&&F){oe(F.draft),St(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey)return;let o=hr(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!F||Vc(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function Xc(e){F&&Qe(e.target)&&$(e.target)!==F.shown.trim()&&St()}function Jc(e){e.target instanceof Element&&e.target.closest(d.sendButton)&&Pn($())}var ra=f({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:be,styles:na,start(){Ln=new AbortController;let{signal:e}=Ln;document.addEventListener("keydown",Yc,{capture:!0,signal:e}),document.addEventListener("input",Xc,{capture:!0,signal:e}),document.addEventListener("click",Jc,{capture:!0,signal:e}),document.addEventListener("submit",()=>Pn($()),{capture:!0,signal:e})},stop(){Ln?.abort(),St()},onSettingsChange(e){e==="maxEntries"&&vt(Eo())}});var ia=`/*
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
`;var Qc=1500,ed=5e3,td=2e3,Ge=g({showDate:{type:"boolean",description:"Show the date for messages not sent today.",default:!0},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),Co=new Map,la=0,Mo,aa=[];function ca(e,t){Co.get(e)!==t&&(Co.set(e,t),clearTimeout(Mo),Mo=setTimeout(da,td))}function da(){let e={...Ge.store.stamps,...Object.fromEntries(Co)};Ge.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,Qc))}function od(e){let t=W(v())?.times;for(let o=e.length-1;o>=0;o--){let n=Co.get(e[o])??t?.get(e[o])??Ge.store.stamps[e[o]];if(n)return n}return null}var nd=()=>D().generating||Date.now()-la<ed;function rd(e){let t=new Date(e),o=new Date,n={hour:"2-digit",minute:"2-digit"};if(!Ge.store.showDate||t.toDateString()===o.toDateString())return t.toLocaleTimeString(void 0,n);let r=t.getFullYear()===o.getFullYear()?{}:{year:"numeric"};return t.toLocaleString(void 0,{...r,month:"short",day:"numeric",...n})}function sa(e){let t=no(e)??e.getAttribute("data-message-author-role")??e.closest(d.turn)?.getAttribute("data-turn")??e.querySelector(d.authorRole)?.getAttribute("data-message-author-role");if(sn(t))return t;let o=lt(e).at(-1);return W(v())?.chain.find(n=>n.id===o)?.role??null}function id(e){let t=lt(e);if(!t.length||!Pe(e)||e.querySelector("time:not([data-bloom])"))return;let o=od(t);!o&&nd()&&(o=Date.now(),ca(t.at(-1),o));let n=e.querySelector(':scope > time[data-bloom="timestamp"]');if(!o||Ge.store.hideOwnMessages&&sa(e)==="user"){n?.remove();return}let r=rd(o);if(n?.textContent===r)return;let i=a("time",{class:`bloom-timestamp bloom-timestamp-${sa(e)??"assistant"}`,text:r,title:new Date(o).toLocaleString(),attrs:{"data-bloom":"timestamp",datetime:new Date(o).toISOString()}});n?n.replaceWith(i):e.prepend(i)}var To=Ae(()=>{for(let e of cn())id(e)}),ua=f({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:Ge,styles:ia,start(){aa=[M(e=>_(e)&&To()),B.on("conversation",To),B.on("message-time",({messageId:e,time:t})=>{ca(e,t),To()}),x.on("fall",()=>{la=Date.now()})]},stop(){for(let e of aa)e();Mo&&(clearTimeout(Mo),da());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();To()}}});var ad=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])'],sd=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],ma=g({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),pa=f({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:ma,styles:()=>Te([...ad,...ma.store.hideDictationSettings?sd:[]])});var ye="data-bloom-share",ld=/^\/g\/g-p-/,cd=/^(?:share|分享)$/i,dd=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],ud=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${ye}="project"]`],kn=g({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),Ao,Rn=!1;function md(e){if(!_(e))return;let t=ld.test(location.pathname)&&!v();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${ye}]`))!t||!cd.test(R(o.textContent??""))?o.removeAttribute(ye):o.hasAttribute(ye)||o.setAttribute(ye,"project")}var fa=f({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:kn,styles:()=>Te([...kn.store.hideShareChat?dd:[],...kn.store.hideShareProject?ud:[]]),start(){Rn=!0,tt().then(()=>{Rn&&!Ao&&(Ao=M(md))})},stop(){Rn=!1,Ao?.(),Ao=void 0;for(let e of document.querySelectorAll(`[${ye}]`))e.removeAttribute(ye)}});var ga='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',pd='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',fd="[data-bloom-profile-plan]",ba="visibility:hidden!important;user-select:none!important",ya=g({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function gd(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=ya.store,r=[];return e&&r.push(n?`:is(${ga}){display:none!important}`:`:is(${ga}){${ba}}`),t&&r.push(`:is(${pd}){${ba}}`),e&&o&&r.push(`${fd}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var ha,va=f({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:ya,styles:gd,start(){ha=$e()},stop(){ha?.()}});var Sa=`/*
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
`;var A=E("bloom-queue-"),hd=6,yd=8,z=null,xt="",Ue=!1,ze=!1;function On(e,t,o){let n=G(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute(ie),n.addEventListener("mouseenter",()=>xa(t)),n.addEventListener("mouseleave",()=>xa("")),n}function xa(e){let t=z?.querySelector(`.${A("tip")}`);t&&(t.textContent=e)}function vd(e,t,o,n){ze=!0;let r=a("textarea",{class:`bloom-input ${A("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=new AbortController,s=l=>{i.abort(),ze=!1,xt="",l?n.edit(t,r.value):r.replaceWith(a("div",{class:A("text"),text:o}))};addEventListener("keydown",l=>{if(!(l.target!==r||l.isComposing)){if(l.key==="Enter"&&!l.shiftKey)s(!0);else if(l.key==="Escape")s(!1);else return;l.preventDefault(),l.stopImmediatePropagation()}},{capture:!0,signal:i.signal}),r.addEventListener("keydown",l=>l.stopPropagation(),{signal:i.signal}),r.addEventListener("blur",()=>s(!0),{signal:i.signal}),e.querySelector(`.${A("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function Sd(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,s=c=>{!i&&Math.abs(c.clientY-n.clientY)<hd||(i||(i=ze=!0,e.classList.add(A("dragging"))),e.style.transform=`translateY(${c.clientY-n.clientY}px)`)},l=c=>{if(removeEventListener("pointermove",s),!i)return;ze=!1,xt="";let p=[...r.children].filter(L=>L!==e).filter(L=>L.getBoundingClientRect().top+L.getBoundingClientRect().height/2<c.clientY).length;o.move(t,p)};addEventListener("pointermove",s),addEventListener("pointerup",l,{once:!0})})}function xd(e,t,o){let n=a("li",{class:A("row")},a("div",{class:A("text"),text:e}),a("div",{class:A("actions")},On("trash","Remove from queue",()=>o.remove(t)),On("edit","Edit",()=>vd(n,t,e,o)),On("send","Send now",()=>o.sendNow(t))));return Sd(n,t,o),n}function wd(e){if(!z)return;let t=e.getBoundingClientRect();z.style.left=`${t.left}px`,z.style.width=`${t.width}px`,z.style.bottom=`${innerHeight-t.top+yd}px`}function In(){z?.remove(),z=null,xt="",ze=!1}function Lo(e,t){let o=et();if(!e.length||!Ze(o)){In();return}z||(z=a("div",{class:`bloom-root ${A("tray")}`,attrs:{"data-bloom":"queue"}},a("div",{class:A("header")},a("button",{class:A("toggle"),attrs:{type:"button","aria-expanded":String(!Ue)},on:{click:i=>{Ue=!Ue,z?.classList.toggle(A("collapsed"),Ue),i.currentTarget.setAttribute("aria-expanded",String(!Ue))}}},a("span",{class:A("count")}),N("chevron")),a("span",{class:A("tip")})),a("ol",{class:A("list")})),z.classList.toggle(A("collapsed"),Ue),document.body.append(z)),wd(o);let n=JSON.stringify(e);if(ze||n===xt)return;xt=n;let r=z.querySelector(`.${A("count")}`);r&&(r.textContent=Lt(e.length,"Queued message")),z.querySelector(`.${A("list")}`)?.replaceChildren(...e.map((i,s)=>xd(i,s,t)))}var Ed=8,Ta=150,Ca=20,Ma=g({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1}}),ve=new Map,Po=!1,Se=null,Bn,wa=[],Dn="draft",Nn=()=>v()??Dn,V=()=>ve.get(Nn())??[];function xe(e){e.length?ve.set(Nn(),e):ve.delete(Nn()),Lo(V(),Hn)}function Aa(e,t=0){t>=Ca||D().generating||$()!==e||(vr(),setTimeout(()=>Aa(e,t+1),Ta))}function ko(e,t=0){if(D().generating||$()){t<Ca&&setTimeout(()=>ko(e,t+1),Ta);return}oe(e),Uo(()=>Aa(e))}function Ea(){if(Se!=null){let o=Se;Se=null,ko(o);return}if(!Po||D().generating||$())return;let[e,...t]=V();e!=null&&(Po=!1,xe(t),ko(e))}function La(e){let t=V(),o=t[e];if(o!=null){if(xe(t.filter((n,r)=>r!==e)),!D().generating){ko(o);return}Se=o,Gt()?.click()}}var Hn={remove:e=>xe(V().filter((t,o)=>o!==e)),edit:(e,t)=>xe(t.trim()?V().map((o,n)=>n===e?t:o):V().filter((o,n)=>n!==e)),sendNow:La,move(e,t){let o=[...V()],[n]=o.splice(e,1);o.splice(t,0,n),xe(o)}};function Td(e){let t=V();return Ma.store.replacePending&&t.length?(xe([...t.slice(0,-1),e]),!0):t.length>=Ed?!1:(xe([...t,e]),!0)}function Cd(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!Qe(e.target)||!D().generating)return;let t=$(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;oe(""),Se=t,Gt()?.click();return}if(!t){V().length&&La(0);return}Td(t)&&oe("")}var Pa=f({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:Ma,styles:Sa,start(){Bn=new AbortController,document.addEventListener("keydown",Cd,{capture:!0,signal:Bn.signal}),wa=[x.on("fall",({outcome:e})=>{Po=e==="done",e==="left"&&(Se=null),Ea()}),x.on("context",({prevId:e,id:t,migrated:o})=>{let n=ve.get(Dn);ve.delete(Dn),o&&!e&&t&&n&&ve.set(t,n),o||(Po=!1),Lo(V(),Hn)}),x.on("tick",()=>{Ea(),Lo(V(),Hn)})]},stop(){Bn?.abort();for(let e of wa)e();In(),ve.clear(),Se=null}});var Md=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function Ad(){let e=R(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!Md.has(e.toLowerCase())?e:null}function wt(e){return e?W(e)?.title??Yr(e)??(e===v()?Ad():null):null}var ka=`/*
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
`;var ee=E("bloom-recent-"),te="home",Pd=50,Ra=140,kd=new Set(["Backquote"]),Rd=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),y=g({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),le=null,J=[],Z=0,_n,Oa=[],Io=()=>Rr()?null:v()??(pe()?te:null);function Ia(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function Da(e){let t=wt(e);t&&y.store.titles[e]!==t&&(y.store.titles={...y.store.titles,[e]:t});let o=Xr(location.href);o&&e===v()&&y.store.projects[e]!==o&&(y.store.projects={...y.store.projects,[e]:o})}function Ba(e){if(!e)return;let t=[e,...y.store.visits.filter(n=>n!==e)].slice(0,Pd),o=new Set(t);y.store.visits=t,Object.keys(y.store.previews).some(n=>!o.has(n))&&(y.store.previews=Ia(y.store.previews,o)),Object.keys(y.store.titles).some(n=>!o.has(n))&&(y.store.titles=Ia(y.store.titles,o)),e!==te&&Da(e)}function Ro(e){if(!e||!y.store.visits.includes(e))return;let t={},o=W(e)?.chain??[];for(let r of o)t[r.role]=Ee(ao(r),Ra);if(e===v())for(let r of ro()){let i=io(r);i&&(t[r.role]=Ee(i,Ra))}let n=y.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(y.store.previews={...y.store.previews,[e]:t})}function Od(){let e=Number(y.store.maxRecent);return y.store.visits.filter(t=>t!==te||y.store.includeHome).slice(0,e)}function $n(e){if(Et(),e===Io())return;let t=e===te?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"]'):rt(e)[0];t?t.click():location.assign(e===te?"/":`/c/${e}`)}function Id(e,t){let o=e===te?"New chat":y.store.titles[e]??wt(e)??"Untitled chat",n=e===te?null:y.store.projects[e],r=e===te?null:y.store.previews[e];return a("button",{class:ee("item"),attrs:{type:"button",role:"option","aria-selected":String(t===Z)},on:{click:()=>$n(e),mousemove:()=>t!==Z&&Oo(t)}},a("div",{class:ee("head")},a("span",{class:`${ee("title")} bloom-truncate`,text:o}),n&&a("span",{class:ee("project"),text:n})),r?.user&&a("div",{class:`${ee("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&a("div",{class:`${ee("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function Oo(e){Z=(e+J.length)%J.length,le?.querySelectorAll(`.${ee("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===Z)))}function Bd(){Ro(v());let e=Io();J=Od(),e&&(J=[e,...J.filter(t=>t!==e)].slice(0,Number(y.store.maxRecent))),J.length&&(Z=J.length>1?1:0,le=a("div",{class:`bloom-root ${ee("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:t=>t.target===t.currentTarget&&Et()}},a("div",{class:ee("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...J.map(Id))),document.body.append(le))}function Et(){le?.remove(),le=null}var Dd=e=>kd.has(e.code)||Rd.has(e.key);function Nd(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&Dd(e)){e.preventDefault(),e.stopPropagation(),le?Oo(Z+(e.shiftKey?-1:1)):Bd();return}if(!le)return;let o={Escape:Et,Enter:()=>$n(J[Z]),ArrowDown:()=>Oo(Z+1),ArrowUp:()=>Oo(Z-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function Hd(e){le&&e.key==="Control"&&$n(J[Z])}var Na=f({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:y,styles:ka,start(){_n=new AbortController;let{signal:e}=_n;addEventListener("keydown",Nd,{capture:!0,signal:e}),addEventListener("keyup",Hd,{capture:!0,signal:e}),addEventListener("blur",Et,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&Ro(v()),{signal:e}),Oa=[ne(({prevId:i})=>{Ro(i),Ba(Io())}),B.on("conversation",({id:i})=>{y.store.visits.includes(i)&&Da(i),Ro(i)})];let{visits:t,titles:o,previews:n}=y.store,r=t.filter(i=>i!==te&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(y.store.visits=t.filter(i=>!r.includes(i))),Ba(Io())},stop(){_n?.abort();for(let e of Oa)e();Et()}});var _d=new S("ResponseNotification"),$d=[880,1318.5],qd=.14,Ha=.22,Gd=.08,_a=1e-4,Ud=.02,zd=200,Fd=300,Tt=g({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the built-in chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:e=>(e.append(q("Preview",Ga)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),Ct=null,Bo,$a,qn;function qa(){Ct??=new AudioContext;let e=Ct.currentTime;$d.forEach((t,o)=>{let n=Ct,r=e+o*qd,i=n.createOscillator(),s=n.createGain();i.frequency.value=t,s.gain.setValueAtTime(_a,r),s.gain.exponentialRampToValueAtTime(Gd,r+Ud),s.gain.exponentialRampToValueAtTime(_a,r+Ha),i.connect(s).connect(n.destination),i.start(r),i.stop(r+Ha)})}function jd(e){return new Promise((t,o)=>GM_xmlhttpRequest({url:e,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=zd&&n<Fd?t(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}async function Kd(e){Ct??=new AudioContext;let t=Ct;Bo?.url!==e&&(Bo={url:e,buffer:jd(e).then(n=>t.decodeAudioData(n))});let o=t.createBufferSource();o.buffer=await Bo.buffer,o.connect(t.destination),o.start()}function Ga(){let e=Tt.store.soundUrl.trim();if(!e){qa();return}Kd(e).catch(t=>{_d.warn("Custom sound failed, playing the chime",t),Bo=void 0,qa()})}function Wd(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function Vd(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(qn=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:qn.signal}))}var Ua=f({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:Tt,start(){Vd(),$a=x.on("fall",({conversationId:e,outcome:t})=>{t==="done"&&(Tt.store.onlyWhenHidden&&!document.hidden||(Tt.store.sound&&Ga(),Tt.store.browserNotification&&Wd(wt(e))))})},stop(){$a?.(),qn?.abort()}});var Yd="filter:blur(6px)!important;transition:filter 0.2s ease",za=`:is(${d.sidebars})`,Xd={conversations:{selectors:[`${za} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0},projects:{selectors:[`${za} a:is([href*="/project"], [href*="/g/g-p-"])`,".bloom-recent-project"],hover:!0},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}},ja=g({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function Jd(){return Object.entries(Xd).filter(([e])=>ja.store[e]).map(([,{selectors:e,hover:t}])=>{let o=e.join(",");return`:is(${o}){${Yd}}`+(t?`:is(${o}):hover, .bloom-recent-item:hover :is(${o}){filter:none!important}`:"")}).join(`
`)}var Fa,Ka=f({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:ja,styles:Jd,start(){Fa=$e()},stop(){Fa?.()}});var Zd=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],Qd=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",eu='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',Wa=g({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function tu(){let e=`${Wa.store.width}rem`;return`:is(${Qd}){${Zd.map(t=>`${t}:${e}!important`).join(";")}}:is(${eu}){max-width:min(100%, ${e})!important}`}var Va=f({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:Wa,styles:tu});var ou=[si,vi,wi,Ii,Di,Hi,Wi,ta,ra,ua,pa,fa,va,Pa,Na,Ua,Ka,Va],Gn=ou;var nu=new S("Bloom"),Ya="2.0.19";async function Un(){Ar();for(let e of Gn)e.updatedAt=Hr[e.name];ar(Gn),await or(),Pt("base",mr),Nr(),Ht("Init"),Ft().then(()=>{Yn(),Ht("DOMContentLoaded")}),await Pr(),Ht("HostReady"),nu.info(`Bloom++ ${Ya} ready`)}var Xa=new S("Boot");if(window===window.top){let e=K.Bloom;e&&Xa.warn("Replacing another Bloom++ instance",e.VERSION),Object.defineProperty(K,"Bloom",{value:zn,configurable:!0,writable:!0}),Un().catch(t=>Xa.error("Startup failed",t))}})();
