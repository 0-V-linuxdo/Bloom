// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260929] v2.0.23
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

/* Bloom++ [20260929] v2.0.23. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var os=Object.defineProperty;var ns=(e,t)=>{for(var o in t)os(e,o,{get:t[o],enumerable:!0})};var q=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var we=(e,t,o)=>Math.min(o,Math.max(t,e)),E=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zn=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,oe=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,k=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function Lt(e,t){return`${e} ${t}${e===1?"":"s"}`}async function Jn(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function We(e){try{return JSON.parse(e)}catch{return}}var j=typeof unsafeWindow>"u"?window:unsafeWindow;var jn={};ns(jn,{VERSION:()=>$a,init:()=>Wn,plugins:()=>me});var rs=new q("Styles"),je=new Map,Vn=new Set,ze=new Map,Oo=!0;function Zn(){let e=document.adoptedStyleSheets.filter(t=>!Vn.has(t));document.adoptedStyleSheets=[...e,...je.values()]}function Xn(e){document.readyState==="loading"||e.parentNode===document.head||document.head.append(e)}function is(e,t){let o=ze.get(e);o||(o=document.createElement("style"),o.id=`bloom-style-${e}`,ze.set(e,o)),o.textContent!==t&&(o.textContent=t),Xn(o)}function Bt(e,t){if(Oo)try{let o=je.get(e);o||(o=new j.CSSStyleSheet,je.set(e,o),Vn.add(o)),o.replaceSync(t),Zn();return}catch(o){rs.warn("Constructed style sheets unavailable, using <style> after parsing",o),Oo=!1,je.delete(e)}is(e,t)}function Po(e){je.delete(e)&&Oo&&Zn(),ze.get(e)?.remove(),ze.delete(e)}function _n(){for(let e of ze.values())Xn(e)}var w=e=>(...t)=>t.map(o=>e+o).join(" "),It=(...e)=>e.filter(Boolean).join(" "),Ee=e=>e.length?`${e.join(",")}{display:none!important}`:"";function f(e){return e}var kt=new q("Storage"),as="bloompp",Rt="kv",$n=null;function ss(){return $n??=new Promise((e,t)=>{let o=indexedDB.open(as,1);o.onupgradeneeded=()=>{o.result.objectStoreNames.contains(Rt)||o.result.createObjectStore(Rt)},o.onsuccess=()=>e(o.result),o.onerror=()=>t(o.error)}),$n}function er(e,t){return ss().then(o=>new Promise((n,r)=>{let i=t(o.transaction(Rt,e).objectStore(Rt));i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)}))}async function ls(e){if(typeof GM_getValue=="function")try{return await GM_getValue(e)}catch(t){kt.warn("GM read failed",t);return}}async function cs(e){try{return await er("readonly",t=>t.get(e))}catch(t){kt.warn("IndexedDB read failed",t);return}}function ds(e){try{return localStorage.getItem(e)??void 0}catch{return}}async function tr(e){return Promise.all([ls(e),cs(e),ds(e)])}function or(e,t){let o=JSON.stringify(t);if(typeof GM_setValue=="function")try{GM_setValue(e,t)}catch{GM_setValue(e,o)}try{localStorage.setItem(e,o)}catch(n){kt.warn("localStorage write failed",n)}er("readwrite",n=>n.put(o,e)).catch(n=>kt.warn("IndexedDB write failed",n))}var us=new q("Settings"),rr="BloomSettings",ms=100,ps=["GM","IndexedDB","localStorage"],Dt={plugins:{}},No=new Set,Je;function fs(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=We(t);return!E(t)||!E(t.plugins)||!Object.keys(t.plugins).length?null:t}var Ho=e=>e==null||e===""||(Array.isArray(e)?!e.length:E(e)&&!Object.keys(e).length);function gs(e){return Ho(e)?0:Array.isArray(e)?12+Math.min(e.length,40):E(e)?12+Math.min(Object.keys(e).length,40):3}function hs(e){let t=0;for(let o of Object.values(e.plugins))if(E(o))for(let[n,r]of Object.entries(o))n!=="enabled"&&(t+=gs(r));return t}var nr=e=>Object.values(e.plugins).filter(t=>E(t)&&t.enabled===!0).length;function bs(e){let t=e.map((i,s)=>i&&{candidate:i,index:s,score:hs(i)}).filter(i=>i!=null).toSorted((i,s)=>s.score-i.score||(i.score?0:nr(s.candidate)-nr(i.candidate))||i.index-s.index);if(!t.length)return null;let[o,...n]=t,r=structuredClone(o.candidate);for(let{candidate:i}of n)for(let[s,l]of Object.entries(i.plugins)){if(!E(l))continue;let c=r.plugins[s]??={};for(let[u,p]of Object.entries(l))u==="enabled"?!("enabled"in c)&&p===!0&&(c.enabled=!0):Ho(c[u])&&!Ho(p)&&(c[u]=structuredClone(p));Object.keys(c).length||delete r.plugins[s]}return{bag:r,source:ps[o.index]}}async function ir(){let e=await tr(rr),t=bs(e.map(fs));t&&(Dt.plugins=t.bag.plugins,us.info("Loaded settings from",t.source))}function ar(){Je=void 0,or(rr,Dt)}function As(){Je&&(clearTimeout(Je),ar())}var de=(e,t)=>Dt.plugins[e]?.[t];function ue(e,t,o){let n=Dt.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,clearTimeout(Je),Je=setTimeout(ar,ms);for(let r of No)r(e,t)}function Ce(e){return No.add(e),()=>void No.delete(e)}function Go(e){return e.type==="component"?void 0:e.default}function g(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>de(t.pluginName,n)??(e[n]&&Go(e[n])),set:(o,n,r)=>(ue(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&de(t.pluginName,o)!==void 0&&ue(t.pluginName,o)}};return t}var sr=e=>{let t=()=>{let o=de("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();ue("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},Ot=sr("pinnedPlugins"),Pt=sr("starredPlugins");addEventListener("pagehide",As);var Nt=new q("PluginManager"),me=new Map,Ve=new Set,lr=new Set,Uo=new Set;function cr(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),me.set(t.name,t)}var Ze=e=>!!e.required||(de(e.name,"enabled")??!!e.enabledByDefault);var Yo=e=>`plugin-${e.name}`;function dr(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?Bt(Yo(e),t):Po(Yo(e))}function ur(e){if(!Ve.has(e.name))try{dr(e),e.start?.(),Ve.add(e.name)}catch(t){Nt.error(`Failed to start ${e.name}`,t)}}function ys(e){if(Ve.delete(e.name)){Po(Yo(e));try{e.stop?.()}catch(t){Nt.error(`Failed to stop ${e.name}`,t)}}}var mr=e=>e.startAt??"HostReady";function Ht(e){lr.add(e);for(let t of me.values())mr(t)===e&&Ze(t)&&ur(t);Nt.info(`${e}: ${[...Ve].join(", ")}`)}function pr(e,t){ue(e.name,"enabled",t),t?lr.has(mr(e))&&ur(e):ys(e);for(let o of Uo)o()}function fr(e){return Uo.add(e),()=>void Uo.delete(e)}Ce((e,t)=>{let o=me.get(e);if(!(!o||t==="enabled"||!Ve.has(e)))try{dr(o),o.onSettingsChange?.(t)}catch(n){Nt.error(`Settings change failed for ${e}`,n)}});var gr=`/*
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
`;var vs=new q("Dom");function a(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var hr=document.createElement("template");function br(e){return hr.innerHTML=e.trim(),hr.content.firstElementChild.cloneNode(!0)}var _e=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),Te=(e,t=document)=>[...t.querySelectorAll(e)].find(_e)??null,Ss=16,xs="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function Ar(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([xs],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function Fo(e){document.hidden?setTimeout(e,Ss):requestAnimationFrame(e)}function Me(e){let t=!1;return()=>{t||(t=!0,Fo(()=>{t=!1;try{e()}catch(o){vs.error("Scheduled task failed",o)}}))}}var Gt=new Set,Ut=[],Xe,ws=Me(()=>{let e=Ut;Ut=[];for(let t of Gt)t(e)});function T(e){return Gt.add(e),Xe||(Xe=new MutationObserver(t=>{Ut.push(...t),ws()}),Xe.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{Gt.delete(e),!Gt.size&&(Xe?.disconnect(),Xe=void 0,Ut=[])}}var Es=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),G=e=>!e.length||e.some(t=>!Es(t.target));function pe(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size");return}e.getAttribute("data-bloom-text")!==t&&(e.hasAttribute("data-bloom-text")||e.style.setProperty("--bloom-text-size",getComputedStyle(e).fontSize),e.setAttribute("data-bloom-text",t))}var Cs=new q("Events");function Yt(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){Cs.error(`Listener for ${String(t)} failed`,r)}}}}var d={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]'};var yr=/[​-‍﻿]/g,Le=()=>Te(d.composerInput),$e=e=>e instanceof HTMLElement&&e.matches(d.composerInput),et=(e=Le())=>e?.closest("form")??document.querySelector(d.oldComposerForm);function U(e=Le()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(yr,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(yr,"").trim()}var Ts=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function ne(e,t=Le()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return Ts?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function qr(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:s,value:l}=e;return{first:!l.slice(0,i).includes(`
`),last:!l.slice(s).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var vr=e=>{let t=et();return(t&&Te(e,t))??Te(e)},Ft=()=>vr(d.stopButton),Ms=()=>{let e=vr(d.sendButton);return e&&!e.matches(d.stopButton)?e:null};function Sr(){let e=Ms();if(e){e.disabled||e.click();return}Le()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var xr=()=>_e(Ft());var Cr=new q("Network"),Ls=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,Bs=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,Qt=1e3,Is=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),O=Yt(),Ko=new Map,wr=new Map,ks=1,z=e=>e?Ko.get(e)??null:null;function Kt(e){let t=Ko.get(e);return t||Ko.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var Tr=e=>e==="user"||e==="assistant";function Mr(e){let t=e.author?.role;if(!e.id||!Tr(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(c=>typeof c=="string").join(`
`).trim(),i=n.filter(c=>E(c)&&c.content_type==="image_asset_pointer").length,s=e.metadata?.attachments,l=Array.isArray(s)&&s.length>0;return!r&&!i&&!l?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*Qt:null,text:r,hasFiles:l,imageCount:i}}var Lr=e=>e.filter((t,o)=>t.role==="user"||e[o+1]?.role!=="assistant");function Rs(e,t){let o=t.filter(E).map(i=>E(i.message)?i.message:i);for(let i of o)i.id&&i.create_time&&e.times.set(i.id,i.create_time*Qt);let n=o.map(Mr).filter(i=>i!=null),r=new Set(n.map(i=>i.id));return e.chain=Lr([...e.chain.filter(i=>!r.has(i.id)),...n]),e}function Ds(e,t){if(!E(t)||!(E(t.mapping)||Array.isArray(t.messages)))return null;let o=Kt(e);if(typeof t.title=="string"&&t.title&&(o.title=t.title),Array.isArray(t.messages))return Rs(o,t.messages);let n=t.mapping;for(let l of Object.values(n)){let c=l.message?.create_time;l.message?.id&&c&&o.times.set(l.message.id,c*Qt)}let r=[],i=new Set,s=typeof t.current_node=="string"?t.current_node:null;for(;s&&!i.has(s)&&n[s];){i.add(s);let l=n[s].message,c=l?Mr(l):null;c&&r.push(c),s=n[s].parent??null}return r.length&&(o.chain=Lr(r.toReversed())),o}function Os(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}function Ps(e){if(typeof e?.body!="string")return null;let t=We(e.body);return E(t)&&typeof t.conversation_id=="string"?t.conversation_id:null}function Ns(e,t){if(!E(e))return;typeof e.type=="string"&&Is.has(e.type)&&(t.handoff=!0);let o=E(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(Kt(e.conversation_id).title=e.title,O.emit("conversation",Kt(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&Tr(n.author?.role)){let r=n.create_time*Qt;t.conversationId&&Kt(t.conversationId).times.set(n.id,r),O.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function Hs(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:s}=await o.read();if(i)break;r+=n.decode(s,{stream:!0});let l=r.split(`
`);r=l.pop()??"";for(let c of l){if(!c.startsWith("data:"))continue;let u=c.slice(5).trim();u&&u!=="[DONE]"&&Ns(We(u),t)}}}async function Gs(e,t,o){let n={conversationId:t,error:!1,handoff:!1};wr.set(e,t),O.emit("generate-start",{requestId:e,conversationId:t});try{let r=await o;r.ok?r.headers.get("content-type")?.includes("event-stream")&&await Hs(r.clone(),n):n.error=!0}catch(r){let i=r instanceof DOMException&&r.name==="AbortError";n.handoff||=i,n.error||=!i}finally{wr.delete(e),O.emit("generate-end",{requestId:e,...n})}}async function Us(e,t){try{let o=await t;if(!o.ok)return;let n=Ds(e,await o.clone().json());n&&O.emit("conversation",n)}catch(o){Cr.debug("Conversation read skipped",o)}}function Ys(e,t,o){let n=Os(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&Ls.test(n.pathname)){Gs(ks++,Ps(t),o);return}let i=r==="GET"&&n.pathname.match(Bs)?.[1];i&&Us(i,o)}var Er=!1;function Br(){if(Er)return;Er=!0;let e=j.fetch,t=function(o,n){let r=e.call(this??j,o,n);try{Ys(o,n,r)}catch(i){Cr.error("Fetch tap failed",i)}return r};j.fetch=typeof exportFunction=="function"?exportFunction(t,j):t}var Fs="__reactContainer$",Ir="__reactFiber$";function Wt(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var Qo=(e,t)=>Object.keys(e.wrappedJSObject??e).some(o=>o.startsWith(t)),Be=e=>!Qo(document,Fs)||Qo(e,Ir);function tt(){return document.body?Promise.resolve():new Promise(e=>{let t=new MutationObserver(()=>{document.body&&(t.disconnect(),e())});t.observe(document,{childList:!0,subtree:!0})})}async function kr(){await tt();let e=Date.now()+8e3;for(;!Qo(document.body,Ir)&&Date.now()<e;)await new Promise(t=>setTimeout(t,100))}var Ks=new q("Route"),Rr=/\/c\/(?!local-)([\w-]+)/,Qs=500,zo=e=>{try{return new URL(e,location.origin).pathname.match(Rr)?.[1]??null}catch{return null}},y=()=>location.pathname.match(Rr)?.[1]??null,fe=()=>location.pathname==="/",Dr=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",zt=new Set,Jt=location.href,jo=y(),jt;function Wo(){if(location.href===Jt)return;let e={prevHref:Jt,href:location.href,prevId:jo,id:y()};Jt=e.href,jo=e.id;for(let t of zt)try{t(e)}catch(o){Ks.error("Route listener failed",o)}}function Ws(){let e=new AbortController,{navigation:t}=j;t?.addEventListener("currententrychange",()=>queueMicrotask(Wo),{signal:e.signal}),addEventListener("popstate",Wo,{signal:e.signal});let o=setInterval(Wo,Qs);return()=>{e.abort(),clearInterval(o)}}function re(e){return zt.add(e),jt||(Jt=location.href,jo=y(),jt=Ws()),()=>{zt.delete(e),!zt.size&&(jt?.(),jt=void 0)}}var js=250,zs=400,Js=6e4,Vs=5e3,Zs=`:is(${d.turn}) :is(${d.turnBusy})`,v=Yt(),Xt=new Set,Jo=new Set,ie=!1,Pr=0,Ie=null,ke=!1,Vt=!1,ot=0,_t=!1,nt=null,Or=!1,P=()=>({generating:ie,conversationId:y()}),Nr=()=>xr()||!!document.querySelector(Zs);function Xs(){let e=Nr();return e?Vt||(ot=0,_t=!0):Vt=!1,[...Xt].some(t=>!Jo.has(t))||e&&!Vt||Date.now()<ot}function _s(){return nt?.error?"error":ke?"stopped":"done"}function $s(){Ie=null,ie=!1,_t=!1,v.emit("fall",{conversationId:y(),outcome:_s()}),ke=!1,nt=null}function Hr(){let e=Xs();e&&!ie&&(ie=!0,Pr=Date.now(),ke=!1,nt=null,v.emit("rise",{conversationId:y()})),e||!ie?Ie=null:Ie==null?Ie=Date.now():Date.now()-Ie>=zs&&$s()}function Zt(){Hr(),v.emit("tick",P())}function el({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(ie||Date.now()-Pr<Js);if(!o&&ie){for(let n of Xt)Jo.add(n);Vt=Nr(),ot=0,_t=!1,Ie=null,ie=!1,ke=!1,nt=null,v.emit("fall",{conversationId:e,outcome:"left"})}v.emit("context",{prevId:e,id:t,migrated:o}),Zt()}function tl(e){e.target instanceof Element&&e.target.closest(d.stopButton)&&(ke=!0,ot=0)}function Gr(){Or||(Or=!0,O.on("generate-start",({requestId:e})=>{Xt.add(e),Zt()}),O.on("generate-end",e=>{Xt.delete(e.requestId),!Jo.delete(e.requestId)&&(nt=e,ot=e.handoff&&!e.error&&!ke&&!_t?Date.now()+Vs:0,Zt())}),re(el),document.addEventListener("click",tl,!0),Ar(Zt,js),Wt().then(()=>T(Hr)))}var Ur={BetterNavigator:1790665788e3,ChatListStatus:1790658944e3,ChatStateFavicons:1790623094e3,Cleaner:1790622654e3,ComposerOpacity:1790665788e3,CustomSidebarIdentity:1790658669e3,GreetingCustomizer:1790616549e3,InputHistory:1790658669e3,MessageTimestamps:1790649198e3,NoDictation:1790653816e3,NoShareLink:1790658669e3,NoSidebarIdentity:1790616549e3,PromptQueue:1790661194e3,RecentTopics:1790620238e3,ResponseNotification:1790661368e3,Settings:1790660776e3,StreamerMode:1790666245e3,WiderChat:1790616549e3};var h=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,ol="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",nl={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${ol}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:h('<path d="M18 6 6 18M6 6l12 12"/>'),gear:h('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:h('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:h('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:h('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:h('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:h('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:h('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:h('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:h('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:h('<path d="m6 9 6 6 6-6"/>'),play:h('<path d="M7 4v16l13-8z"/>'),plus:h('<path d="M12 5v14M5 12h14"/>'),check:h('<path d="m5 12 5 5 9-10"/>'),alert:h('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:h('<path d="M4 5h16v11H9l-5 4z"/>'),layout:h('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:h('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:h('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:h('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:h('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:h('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:h('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:h('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:h('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:h('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:h('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:h('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:h('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:h('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:h('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),grip:h('<path d="M9 6h0M15 6h0M9 12h0M15 12h0M9 18h0M15 18h0"/>')},N=e=>br(nl[e]);var ae="data-bloom-tip",Vo=6,Zo=8,ge,Yr=null;function Re(e){if(e===Yr)return;if(Yr=e,!e){ge?.remove();return}ge??=a("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),ge.textContent=e.getAttribute(ae),document.body.append(ge);let t=e.getBoundingClientRect(),{width:o,height:n}=ge.getBoundingClientRect(),r=t.bottom+Vo+n<=innerHeight-Zo;ge.style.left=`${we(t.left+t.width/2-o/2,Zo,innerWidth-o-Zo)}px`,ge.style.top=`${r?t.bottom+Vo:t.top-Vo-n}px`}var Fr=e=>e instanceof Element?e.closest(`[${ae}]`):null;function Kr(){let e=new AbortController,t={passive:!0,signal:e.signal};return document.addEventListener("pointerover",o=>Re(Fr(o.target)),t),document.addEventListener("pointerout",o=>o.relatedTarget||Re(null),t),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&Re(Fr(o.target)),t),document.addEventListener("focusout",()=>Re(null),t),document.addEventListener("pointerdown",()=>Re(null),t),()=>{e.abort(),Re(null)}}var rl=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,Qr=/\S+@\S+\.\S+/,il=3,al=/^\/g\/(g-p-[^/]+)\//,sl=/^g-p-[0-9a-f]+-?/i,Wr=e=>!!e.closest(".sr-only"),Xo=e=>!!e?.querySelector(d.menuButton);function jr(){return[...document.querySelectorAll(d.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(Xo)).filter(e=>e!=null)}function zr(){let e=[...document.querySelectorAll(d.oldProfile)];if(e.length)return e.map(o=>{let n=o.parentElement?.children.length===1?o.parentElement:o;return{kind:"profile",anchor:n,insert:r=>n.before(r)}});let t=jr().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(d.rail)){let n=[...o.children].find(Xo);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}var _o=e=>!e.closest("[data-bloom]")&&(!!e.querySelector("img, [class*=rounded-full]")||Xr(e).some(t=>!Wr(t))),Jr=e=>[...e.parentElement?.children??[]].find(t=>t!==e&&t instanceof HTMLElement&&_o(t))??null;function Vr(){let e=[...document.querySelectorAll(d.oldProfile)];return e.length?e:[...jr(),...[...document.querySelectorAll(d.rail)].map(o=>[...o.children].findLast(Xo))].map(o=>[...o?.querySelectorAll(d.menuButton)??[]].findLast(n=>_o(n)||Jr(n))).filter(o=>o!=null)}var Zr=()=>Vr().map(e=>_o(e)?e:Jr(e)).filter(e=>e!=null);function Xr(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!k(t.textContent??"")&&!(t instanceof SVGElement))}var ll=e=>{if(/rounded-full/.test(e.getAttribute("class")??""))return!0;if(!e.clientWidth)return!1;let{borderRadius:t}=getComputedStyle(e);return t.includes("%")||Number.parseFloat(t)>=e.clientWidth/2};function $t(e,t,o){for(let n of e.querySelectorAll(`[${t}]`))n!==o&&n.removeAttribute(t);o&&!o.hasAttribute(t)&&o.setAttribute(t,"")}function cl(e,t){if(k(e.textContent??"").length>il)return null;let o=e.closest("button");for(let n=e;n&&n!==t&&n!==o;n=n.parentElement)if(ll(n))return n;return null}function $o(e,t){e.hasAttribute(`data-bloom-${t}`)||e.setAttribute(`data-bloom-${t}`,"");let o=e.querySelector("img:not([data-bloom] img)"),n=Xr(e),r=o?null:n.map(p=>cl(p,e)).find(p=>p!=null),i=o?.closest("[class*=rounded-full]"),s=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");$t(e,`data-bloom-${t}-avatar`,s);let l=n.filter(p=>!s?.contains(p)&&!Wr(p)),c=l.find(p=>rl.test(k(p.textContent??""))),u=l.find(p=>Qr.test(p.textContent??""));$t(e,`data-bloom-${t}-plan`,c),$t(e,`data-bloom-${t}-email`,u),$t(e,`data-bloom-${t}-name`,l.find(p=>p!==c&&p!==u))}function dl(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function eo(){return Vr().map(dl).find(e=>e!=null)??[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&(Qr.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var rt=e=>[...document.querySelectorAll(d.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&zo(t.href)===e);function _r(e){let t=rt(e).find(o=>k(o.textContent??""));return t?k(t.textContent??""):null}function $r(e){let t=new URL(e,location.origin).pathname.match(al)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!zo(n.href)&&k(n.textContent??""));return o?k(o.textContent??""):t.replace(sl,"").replaceAll("-"," ")||null}function en(e,t,o){let n=a("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o}});return n.addEventListener("click",r=>{r.stopPropagation();let i=n.getAttribute("aria-checked")!=="true";n.setAttribute("aria-checked",String(i)),t(i)}),n}function Y(e,t,o){return a("button",{class:It("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button"},on:{click:t}})}function F(e,t,o,n){let r=a("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":t,[ae]:t},on:{click:o}},N(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function to(e,t,o,n,r,i){let s=a("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});s.value=String(e);let l=a("output",{text:`${s.value}${r}`});return s.addEventListener("input",()=>{l.textContent=`${s.value}${r}`,i(Number(s.value))}),a("div",{class:"bloom-slider"},s,l)}function tn(e,t,o){let n=a("select",{class:"bloom-select"},...t.map(r=>a("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function it(e,t,o="",n="text"){let r=a("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var ul=new q("SettingsPanel"),m=w("bloom-settings-"),ml=10080*60*1e3,pl=3e3,ei="Toggle features. Some need a reload. Click the sliders icon to configure.",fl=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],gl=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],hl={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},ti=new Set(["chat","ui","privacy"]),H=null,De="all",on="all",oo="",nn=[],oi=()=>[...me.values()].filter(e=>!e.hidden),bl=e=>!!e.updatedAt&&Date.now()-e.updatedAt<ml;function Al(e){switch(De){case"favorites":return Pt.has(e.name);case"recent":return bl(e);case"all":return!0;case"other":return!e.tags.some(t=>ti.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(De)}}function yl(e){switch(on){case"all":return!0;case"enabled":return Ze(e);case"disabled":return!Ze(e)}}function ql(e){let t=oo.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function vl(e){let t=Ot.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return De==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var ni=e=>e.settings?.def??{},Sl=e=>Object.values(ni(e)).some(t=>t.type!=="custom");function xl(e,t,o){let n=de(e.name,t)??Go(o),r=i=>ue(e.name,t,i);switch(o.type){case"boolean":return en(n,r,o.description??t);case"slider":return to(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return tn(n,o.options,r);case"string":return it(n,r,o.placeholder);case"number":return it(String(n),i=>r(Number(i)),"","number");case"component":{let i=a("div",{class:m("component")});return nn.push(o.render(i)),i}case"custom":return null}}var wl=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function ri(e){if(!H)return;let t=Object.entries(ni(e)).filter(([,i])=>i.type!=="custom").map(([i,s])=>{let l=xl(e,i,s),c=s.type==="boolean",u=s.type!=="component"&&a("div",{class:m("field-label"),text:wl(i)}),p=s.description&&a("div",{class:m("field-desc"),text:s.description});return a("div",{class:m("field",c?"field-inline":"field-stacked")},(u||p)&&a("div",{class:m("field-text")},u,p),l)}),o,n=Y("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},pl);return}clearTimeout(o),e.settings?.reset(),at(),ri(e)},"danger"),r=a("div",{class:m("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&at()}},a("div",{class:m("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},a("div",{class:m("popup-header")},a("div",{class:m("card-icon")},N(e.icon)),a("div",{class:m("popup-title")},a("div",{class:m("card-name"),text:e.name}),a("div",{class:m("popup-authors"),text:e.authors.join(", ")})),F("close","Close",at)),a("p",{class:m("popup-desc"),text:e.description}),a("div",{class:m("fields")},...t),a("div",{class:m("popup-footer")},n)));H.querySelector(`.${m("modal")}`)?.append(r)}function at(){for(let e of nn)e();nn=[],H?.querySelector(`.${m("popup-backdrop")}`)?.remove()}function El(e){let t=Ze(e),o=Pt.has(e.name),n=Ot.has(e.name);return a("div",{class:m("card",t?"card-on":"card-off")},a("div",{class:m("card-top")},a("div",{class:m("card-icon")},N(e.icon)),a("div",{class:m("card-actions")},F("star",o?"Unstar":"Star",()=>{Pt.toggle(e.name),he()},o),F("pin",n?"Unpin":"Pin to top",()=>{Ot.toggle(e.name),he()},n),Sl(e)&&F("gear","Settings",()=>ri(e)),e.required?null:en(t,r=>pr(e,r),`Enable ${e.name}`))),a("div",{class:m("card-name"),text:e.name}),a("div",{class:m("card-desc"),text:e.description,title:e.description}),a("div",{class:m("card-footer"),text:e.authors.join(", ")}))}function ii(){let e=oi().some(o=>!o.tags.some(n=>ti.has(n)));H?.querySelector(`.${m("tabs")}`)?.replaceChildren(...fl.filter(o=>o.id!=="other"||e).map(o=>a("button",{class:m("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===De)},on:{click:()=>{De=o.id,ii(),he()}}})))}function he(){if(!H)return;let e=oi().filter(Al),t=H.querySelector(`.${m("search")} input`);t&&(t.placeholder=`Search ${Lt(e.length,"plugin")}...`);let o=vl(e.filter(i=>ql(i)&&yl(i))),n=H.querySelector(`.${m("grid")}`),r=oo.trim()?"No plugins match your search.":hl[De]??"No plugins available.";n?.replaceChildren(...o.length?o.map(El):[a("div",{class:m("empty"),text:r})])}function Cl(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),H?.querySelector(`.${m("popup-backdrop")}`)?at():Oe())}var ai,rn;function Tl(){if(H)return;let e=a("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=oo,e.addEventListener("input",()=>{oo=e.value,he()}),H=a("div",{class:`bloom-root ${m("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&Oe()}},a("div",{class:m("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},a("div",{class:m("header")},a("div",{class:m("logo")},N("bloom")),a("h2",{class:m("title"),text:"Bloom++"}),a("span",{class:m("hint"),attrs:{"aria-label":ei,tabindex:"0",[ae]:ei}},N("info")),a("span",{class:m("version"),text:"v2.0.23"}),F("close","Close",Oe)),a("div",{class:m("tabs"),attrs:{role:"tablist"}}),a("div",{class:m("toolbar")},a("label",{class:m("search")},N("search"),e),tn(on,gl,t=>{on=t,he()})),a("div",{class:m("grid")}))),H.addEventListener("keydown",t=>t.stopPropagation()),rn=new AbortController,document.addEventListener("keydown",Cl,{capture:!0,signal:rn.signal}),document.body.append(H),ii(),he(),ai=fr(he),e.focus(),ul.debug("Opened")}function Oe(){at(),rn?.abort(),ai?.(),H?.remove(),H=null}var no=()=>H?Oe():Tl();var si=`/*
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
`;var st=w("bloom-entry-"),Pe=new Map,li=!1,ci=[];function Ll(e){let t=a("button",{class:st("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:o=>{o.preventDefault(),o.stopPropagation(),no()}}},N("bloom"),e!=="rail"&&a("span",{class:st("label"),text:"Bloom++"}));return a("div",{class:`bloom-root ${st("wrap")} ${st(e)}`,attrs:{"data-bloom":"entry"}},t)}function Bl(e){let t=a("div",{class:`bloom-root ${st("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),no()}}},N("bloom"),a("span",{text:"Bloom++"})),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function Il(){let e=zr();for(let[o,n]of Pe)o.isConnected&&e.some(r=>r.anchor===o)||(n.remove(),Pe.delete(o));for(let o of e){let n=Pe.get(o.anchor);if(n?.isConnected||!Be(o.anchor))continue;let r=n??Ll(o.kind);Pe.set(o.anchor,r),o.insert(r)}let t=eo();t&&!t.querySelector('[data-bloom="menu-entry"]')&&Bl(t)}var di=f({name:"Settings",description:"Bloom++ settings panel and its sidebar entry.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,hidden:!0,startAt:"HostReady",styles:si,start(){ci=[T(Il),Kr()],!li&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",no),li=!0)},stop(){for(let e of ci)e();for(let e of Pe.values())e.remove();Pe.clear(),Oe()}});var kl=["data-turn","data-message-author-role"],Rl=/:(user|assistant)$/,an=`${d.messageUnit}, ${d.oldMessage}`,sn=e=>e==="user"||e==="assistant";function ln(){let e=document.querySelector(d.timelineScroll);if(e)return e;let t=document.querySelector(d.turn);for(let o=t?.parentElement;o;o=o.parentElement){let{overflowY:n}=getComputedStyle(o);if((n==="auto"||n==="scroll")&&o.scrollHeight>o.clientHeight)return o}return document.scrollingElement}var ro=e=>e.getAttribute("data-chatgpt-search-unit-key")?.match(Rl)?.[1]??null,pi=e=>[...e.querySelectorAll(d.searchUnit)].filter(t=>ro(t)&&!t.parentElement?.closest(d.searchUnit)),ui=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function lt(e){let t=ui(e);return t.length?t:[...new Set([...e.querySelectorAll(an)].flatMap(ui))]}function cn(e=document){let t=pi(e);return t.length?t:[...e.querySelectorAll(an)].filter(o=>!o.parentElement?.closest(an))}function Dl(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function Ol(e){for(let t of kl){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(sn(o))return o}return e.querySelector(d.markdown)||e.querySelector(d.generatedImage)?"assistant":null}var Pl=e=>!e.parentElement?.closest(d.turn);function io(){let e=z(y())?.chain??[],t=[...document.querySelectorAll(d.turn)].filter(Pl).flatMap(n=>{let r=pi(n);return r.length?r.map(i=>({el:i,known:ro(i)})):[{el:n,known:null}]}),{generating:o}=P();return t.map(({el:n,known:r},i)=>{let s=r?lt(n):cn(n).flatMap(lt),l=r??Ol(n)??Dl(s,e)??(i%2?"assistant":"user"),c=l==="assistant"&&(n.matches(d.turnBusy)||!!n.querySelector(d.turnBusy)||o&&i===t.length-1);return{el:n,role:l,messageIds:s,streaming:c}})}var Nl="[data-bloom], .sr-only",Hl=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,mi=new WeakMap;function ao(e){let t=e.el.textContent?.length??0,o=mi.get(e.el);if(o?.length===t)return o.summary;let n=Gl(e);return mi.set(e.el,{length:t,summary:n}),n}function Gl(e){let t=e.el.querySelectorAll(d.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.querySelector(e.role==="assistant"?d.markdown:".whitespace-pre-wrap")??e.el,i=[...o.querySelectorAll(Nl)].map(s=>k(s.textContent??"")).filter(Boolean).reduce((s,l)=>s.replace(l,`
`),o.innerText||o.textContent||"").split(`
`).map(k).filter(s=>s&&!Hl.test(s));return i.length?i.join(" "):e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function so(e){return e.text?k(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var fi=`/*
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
`;var x=w("bloom-nav-"),co=80,Yl=1200,Fl=2,Kl=40,Ql=.3,Wl=12,jl={user:"\u2753",assistant:"\u{1F916}"},zl=["wheel","touchmove","pointerdown"],un=g({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),M=null,R=[],be=-1,dt=-1,lo="",gi=0,hi=[],ut=null,ct,bi=e=>un.store.showAssistant||e.role==="user";function qi(){let e=io().reduce((s,l)=>{let c={role:l.role,summary:ao(l),ids:l.messageIds,turn:l,streaming:l.streaming},u=s.at(-1);return u?.role==="assistant"&&c.role==="assistant"?s[s.length-1]={...c,ids:[...u.ids,...c.ids]}:s.push(c),s},[]).filter(bi),t=(z(y())?.chain??[]).filter(bi);if(!t.length)return e;let o=new Set(t.map(s=>s.id)),n=new Map(e.flatMap(s=>s.ids.map(l=>[l,s]))),r=new Set,i=[];for(let s of t){let l=n.get(s.id);l&&r.has(l)||(l&&r.add(l),i.push(l??{role:s.role,summary:so(s),ids:[s.id],turn:null,streaming:!1}))}return[...i,...e.filter(s=>!s.ids.some(l=>o.has(l)))]}function Jl(e){let t=e.getBoundingClientRect(),o=t.top+t.height*Ql,n=-1;return R.forEach((r,i)=>{let s=r.turn?.el.getBoundingClientRect();s&&s.top<=o&&(n=i)}),n===-1?R.findIndex(r=>r.turn):n}function Ai(e){un.store.jumpEffect==="border"&&(e.classList.add(x("flash")),setTimeout(()=>e.classList.remove(x("flash")),Yl))}function mn(e){let t=R[e],o=ln();if(!t||!o)return;dt=e,dn();let n=t.turn?.el;if(n?.isConnected){let u=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:u<o.clientHeight*Fl?"smooth":"auto"}),Ai(n);return}let r=R.map((u,p)=>u.turn?p:-1).filter(u=>u>=0),i=r.length&&e<r[0]?-1:1,s=++gi,l=0,c=()=>{if(s!==gi||l++>Kl)return;R=qi();let u=R.find(p=>p.ids.some(B=>t.ids.includes(B)))?.turn?.el;if(u){u.scrollIntoView({block:"start"}),Ai(u);return}o.scrollBy({top:i*o.clientHeight*.9}),requestAnimationFrame(c)};c()}function Vl(e,t){return a("button",{class:x("row"),attrs:{type:"button","data-index":String(t)},on:{click:()=>mn(t)}},a("span",{text:jl[e.role]}),a("span",{class:"bloom-truncate",text:oe(e.summary||"\u2026",co)}))}function Zl(){let e=ln();if(R=qi(),!R.length||!e){M?.remove(),M=null,lo="";return}if(ut!==e){ct?.abort(),ct=new AbortController,e.addEventListener("scroll",Me(dn),{passive:!0,signal:ct.signal});for(let r of zl)e.addEventListener(r,vi,{passive:!0,signal:ct.signal});ut=e}M??=a("div",{class:`bloom-root ${x("root")}`,attrs:{"data-bloom":"navigator"}},a("div",{class:x("rail")}),a("div",{class:x("toc")},a("div",{class:x("toc-head")}),a("div",{class:x("toc-list")}))),M.isConnected||document.body.append(M);let t=e.getBoundingClientRect(),o=Math.min(t.bottom,et()?.getBoundingClientRect().top??t.bottom);M.style.right=`${document.documentElement.clientWidth-t.left-e.clientLeft-e.clientWidth+Wl}px`,M.style.top=`${(t.top+o)/2}px`;let n=JSON.stringify(R.map(r=>[r.role,r.ids]));n!==lo?(lo=n,dt=-1,_l()):Xl(),dn()}function dn(){if(!M||!ut)return;be=dt>=0?dt:Jl(ut),M.querySelectorAll(`.${x("tick")}`).forEach((t,o)=>t.classList.toggle(x("tick-current"),o===be)),M.querySelectorAll(`.${x("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===be)));let e=M.querySelector(`.${x("toc-head")}`);e&&(e.textContent=`${be+1} / ${R.length}`)}function Xl(){M?.querySelectorAll(`.${x("tick")}`).forEach((e,t)=>{let o=R[t],n=oe(o.summary,co);e.title!==n&&(e.title=n),e.classList.toggle(x("tick-streaming"),o.streaming)}),M?.querySelectorAll(`.${x("row")}`).forEach(e=>{let t=e.lastElementChild,o=oe(R[Number(e.dataset.index)].summary||"\u2026",co);t&&t.textContent!==o&&(t.textContent=o)})}function _l(){M?.querySelector(`.${x("rail")}`)?.replaceChildren(...R.map((e,t)=>a("button",{class:It(x("tick"),x(`tick-${e.role}`),e.streaming&&x("tick-streaming"),t===be&&x("tick-current")),title:oe(e.summary,co),attrs:{type:"button","aria-label":`Jump to message ${t+1}`},on:{click:()=>mn(t)}}))),M?.querySelector(`.${x("toc-list")}`)?.replaceChildren(...R.map(Vl))}var se=Me(Zl);function vi(){dt=-1}var $l=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function yi(e){if(!M||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||$l(document.activeElement)||document.querySelector("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:be-1,ArrowDown:be+1,Home:0,End:R.length-1}[e.key];if(o==null){vi();return}o<0||o>=R.length||(e.preventDefault(),e.stopPropagation(),mn(o))}var Si=f({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:un,styles:fi,start(){hi=[T(e=>G(e)&&se()),re(se),O.on("conversation",se),v.on("rise",se),v.on("fall",se)],addEventListener("keydown",yi,!0),addEventListener("resize",se,{passive:!0})},stop(){for(let e of hi)e();ct?.abort(),ut=null,removeEventListener("keydown",yi,!0),removeEventListener("resize",se),M?.remove(),M=null,lo=""},onSettingsChange:se});var xi=`/*
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
`;var tc=w("bloom-cls"),oc="bloom-cls",nc=600*1e3,fn=zn("tab"),He=new Map,pt=new Map,Ne=null,wi=[],rc=e=>e==="streaming"||e==="error";function ic(){let e=new Map,t=Date.now();for(let[o,n]of pt)t-n.at>nc?pt.delete(o):e.set(o,n.status);for(let[o,n]of He)e.set(o,n);return e}function ac(e){return a("span",{class:`bloom-root ${tc("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&N("alert"))}function mt(){let e=ic(),t=new Set;for(let[o,n]of e)for(let r of rt(o)){if(!Be(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let s=ac(n);t.add(s),r.append(s)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function uo(e,t){e&&(t?He.set(e,t):He.delete(e),Ne?.postMessage({tab:fn,id:e,status:t}),mt())}function sc({data:e}){!E(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===fn||(rc(e.status)?pt.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):pt.delete(e.id),mt())}function pn(){for(let e of He.keys())Ne?.postMessage({tab:fn,id:e,status:null})}var Ei=f({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:xi,start(){Ne=typeof BroadcastChannel=="function"?new BroadcastChannel(oc):null,Ne?.addEventListener("message",sc),addEventListener("pagehide",pn),wi=[v.on("rise",({conversationId:e})=>uo(e,"streaming")),v.on("fall",({conversationId:e,outcome:t})=>uo(e,t==="error"?"error":null)),v.on("context",({prevId:e,id:t,migrated:o})=>{o&&P().generating?uo(t,"streaming"):!o&&He.get(e??"")==="streaming"&&uo(e,null)}),T(e=>G(e)&&mt())],y()&&mt()},stop(){for(let e of wi)e();pn(),Ne?.close(),Ne=null,removeEventListener("pagehide",pn),He.clear(),pt.clear(),mt()}});var Ti=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],fo={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},lc={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},cc="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",gn=32,go=64,hn="#FCFCFC",bn="#111111",dc=14,ho=51.5,uc=12.5,mc=9.75,Ci=52,pc=10.5,fc=7.75,gc={rotate:e=>e.arc(ho,ho,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function mo(e){let t=document.createElement("canvas");t.width=t.height=gn;let o=t.getContext("2d");return o?(o.scale(gn/go,gn/go),e(o),t.toDataURL("image/png")):""}function po(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D(cc);o&&(e.strokeStyle=bn,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function bo(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function hc(e,t){bo(e,ho,uc,bn),bo(e,ho,mc,fo[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),gc[t](e),e.stroke()}function bc(e,t){e.beginPath(),e.roundRect(0,0,go,go,dc),e.fillStyle=t,e.fill()}var Ac=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function Mi(e,t){switch(e){case"original":return Ac(lc[t]);case"hole":return mo(o=>po(o,fo[t],!0));case"bg":return mo(o=>{bc(o,fo[t]),po(o,hn,!1)});case"dot":return mo(o=>{po(o,hn,!0),bo(o,Ci,pc,bn),bo(o,Ci,fc,fo[t])});case"badge":return mo(o=>{po(o,hn,!0),hc(o,t)})}}var gt="bloom-chat-state-favicon",ht="data-bloom-rel",qn="data-bloom-media",Li="bloom-parked-icon",yc="/favicon.ico",Ii=g({style:{type:"select",description:"How the tab icon shows the chat state.",options:Ti,default:"bg"}}),le=null,ki="",Ao=null,Ri="",Bi=new Map,vn,An=[],Di=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${ht}]`)];function Sn(){for(let e of Di())e.id!==gt&&(e.hasAttribute(ht)||(Ri||=e.href,e.setAttribute(ht,e.rel),e.setAttribute(qn,e.getAttribute("media")??"")),e.rel!==Li&&(e.rel=Li),e.media!=="not all"&&(e.media="not all"))}function qc(){for(let e of Di()){let t=e.getAttribute(ht);if(t==null)continue;e.rel=t;let o=e.getAttribute(qn);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(ht),e.removeAttribute(qn)}}function Oi(){let e=document.getElementById(gt);return e||(e=document.createElement("link"),e.id=gt,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function vc(e){if(e==="wait")return Ri||yc;let t=Ii.store.style,o=`${t}:${e}`,n=Bi.get(o);return n||Bi.set(o,n=Mi(t,e)),n}function yn(e){if(e)return"rotate";let t=U();return le&&t&&t!==ki&&(le=null),le==="error"?"error":le==="done"?"done":t?"ready":"wait"}function ft(e,t=!1){if(e===Ao&&!t)return;Ao=e;let o=Oi(),n=vc(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function Sc(){vn=new MutationObserver(()=>{Sn(),document.head.lastElementChild?.id!==gt&&Oi()}),vn.observe(document.head,{childList:!0})}var Pi=f({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"HostReady",settings:Ii,start(){Sn(),ft(yn(P().generating),!0),Sc(),An=[v.on("rise",()=>{le=null,ft("rotate")}),v.on("fall",({outcome:e})=>{le=e==="done"||e==="error"?e:null,ki=U(),ft(yn(!1))}),v.on("context",({migrated:e})=>{e||(le=null)}),v.on("tick",({generating:e})=>{Sn(),ft(yn(e))})]},stop(){for(let e of An)e();An=[],vn?.disconnect(),document.getElementById(gt)?.remove(),qc(),Ao=null,le=null},onSettingsChange(){ft(Ao??"wait",!0)}});var xc={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]'],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['div:has(> div > aside button[aria-label="Dismiss migration notice"])','aside:has(button[aria-label="Dismiss migration notice"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])']},Ni=g({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice above the composer.",default:!0}}),Hi=f({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads and notices.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:Ni,styles:()=>Ee(Object.entries(xc).flatMap(([e,t])=>Ni.store[e]?t:[]))});var yo=`form:has(:is(${d.composerInput})), ${d.oldComposerForm}`,Gi='[class*="ComposerLayoutRoot"]',wc=`:is(${yo}) ${Gi}, :is(${yo}):not(:has(${Gi})) :is([class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"])`,Ec='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',Cc='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',Tc="var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, #fff)))",Ui=g({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function Mc(){let{opacity:e,blur:t}=Ui.store;return e>=100?"":`:is(${Ec}), :is(${yo}){background-color:transparent!important;background-image:none!important;box-shadow:none!important}:is(${Cc}){display:none!important}${wc}{background-color:color-mix(in srgb, ${Tc} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important}:is(${yo}) :is(${d.composerInput}){background-color:transparent!important}`}var Yi=f({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:Ui,styles:Mc});var xn=0,qo;function Lc(e){if(!G(e))return;for(let o of Zr())$o(o,"profile");let t=eo();t&&$o(t,"menu")}function Ge(){xn++;let e=!0;return tt().then(()=>{e&&xn&&!qo&&(qo=T(Lc))}),()=>{e&&(e=!1,!--xn&&(qo?.(),qo=void 0))}}var $=w("bloom-csi-"),Bc=256,Ic=160,vo=1,Fi=4,kc=.1,Rc=.0015,Dc=250;function Oc(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function Pc(e){return new Promise((t,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function Nc(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:we(t.x,n,1-n),y:we(t.y,r,1-r)}}function Ki(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function Hc(e,t){let o=a("canvas");return o.width=o.height=Bc,Ki(o,e,t),o.toDataURL("image/png")}function Qi(e){let t=null,o={x:C.store.cropX,y:C.store.cropY,zoom:C.store.cropZoom},n,r=a("canvas",{class:$("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=Ic*devicePixelRatio;let i=a("div",{class:`bloom-muted ${$("status")}`}),s=a("div",{class:$("zoom")}),l=a("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function c(b,D=!0){t&&(o=Nc(t,b),Ki(r,t,o),D&&(clearTimeout(n),n=setTimeout(()=>{t&&(C.store.cropX=o.x,C.store.cropY=o.y,C.store.cropZoom=o.zoom,C.store.avatarUrl=Hc(t,o))},Dc)))}function u(){s.replaceChildren(to(o.zoom,vo,Fi,kc,"\xD7",b=>c({...o,zoom:b})))}async function p(b,D){i.textContent="";try{t=await Pc(b),D&&(C.store.avatarSource=b,o={x:.5,y:.5,zoom:vo}),e.classList.add($("has-image")),u(),c(o,D)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let B=b=>{b?.type.startsWith("image/")&&Oc(b).then(D=>p(D,!0))};l.addEventListener("change",()=>B(l.files?.[0])),r.addEventListener("wheel",b=>{t&&(b.preventDefault(),c({...o,zoom:we(o.zoom*(1-b.deltaY*Rc),vo,Fi)}),u())},{passive:!1}),r.addEventListener("pointerdown",b=>{if(!t)return;r.setPointerCapture(b.pointerId);let D={...o},Qe=r.getBoundingClientRect(),Tt=Mt=>{if(!t)return;let W=Math.max(Qe.width/t.naturalWidth,Qe.height/t.naturalHeight)*o.zoom;c({...o,x:D.x-(Mt.clientX-b.clientX)/(t.naturalWidth*W),y:D.y-(Mt.clientY-b.clientY)/(t.naturalHeight*W)})};r.addEventListener("pointermove",Tt),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",Tt),{once:!0})});let V=a("div",{class:$("cropper"),attrs:{tabindex:"0"},on:{paste:b=>B([...b.clipboardData?.files??[]].find(D=>D.type.startsWith("image/"))),dragover:b=>b.preventDefault(),drop:b=>{b.preventDefault(),B(b.dataTransfer?.files[0])}}},a("div",{class:$("stage")},r),a("div",{class:$("controls")},it("",b=>b.trim()&&void p(b.trim(),!0),"https://\u2026 or data:image/\u2026","url"),a("div",{class:$("buttons")},Y("Choose file",()=>l.click()),Y("Reset crop",()=>{c({x:.5,y:.5,zoom:vo}),u()}),Y("Clear",()=>{t=null,e.classList.remove($("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),s.replaceChildren(),C.store.avatarUrl="",C.store.avatarSource=""},"danger")),s,i,l));return e.append(V),C.store.avatarSource&&p(C.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var Wi=`/*
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
`;var bt="data-bloom-csi-avatar",wn="data-bloom-csi-sized",Vi="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",Uc=32,C=g({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>Qi(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),ji=[];function Zi(e){e.removeAttribute(bt),e.removeAttribute(wn)}function zi(e){return(C.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function Ji(e=[]){if(!G(e))return;let t=C.store.displayName.trim()||null,o=!!C.store.avatarUrl,n=new Set(t?zi("name"):[]);for(let i of document.querySelectorAll(Vi))n.has(i)||pe(i,null);for(let i of n)pe(i,t);let r=new Set(o?zi("avatar"):[]);for(let i of document.querySelectorAll(`[${bt}]`))r.has(i)||Zi(i);for(let i of r)i.hasAttribute(bt)||i.setAttribute(bt,""),i.toggleAttribute(wn,!i.closest('[role="menu"]'))}function Yc(){let e=C.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${C.store.avatarSize}px}:is(${d.rail}, ${d.oldRail}) [${wn}]{--bloom-csi-size:${Uc}px}`:""}var Xi=f({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:C,styles:()=>`${Yc()}
${Wi}`,start(){ji=[Ge(),T(Ji)]},stop(){for(let e of ji)e();for(let e of document.querySelectorAll(`[${bt}]`))Zi(e);for(let e of document.querySelectorAll(Vi))pe(e,null)},onSettingsChange(){Ji()}});var Ue=w("bloom-greeting-"),_i=30,$i=100;function ea(e){let t=-1,o=a("textarea",{class:`bloom-input ${Ue("input")}`,attrs:{maxlength:String($i),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=Y("Add",i),r=a("div",{class:Ue("list")});function i(){let c=o.value.trim().slice(0,$i);if(!c)return;let u=[...S.store.greetings];t>=0?u[t]=c:u.length<_i&&u.push(c),S.store.greetings=u,t=-1,o.value="",s()}function s(){let{greetings:c}=S.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&c.length>=_i,r.replaceChildren(...c.length?c.map((u,p)=>a("div",{class:Ue("row",p===t?"row-editing":"row-idle")},a("div",{class:Ue("text"),text:u}),F("edit","Edit",()=>{t=p,o.value=u,o.focus(),s()}),F("trash","Delete",()=>{S.store.greetings=c.filter((B,V)=>V!==p),t===p&&(t=-1),s()}))):[a("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",c=>{c.key==="Enter"&&(c.ctrlKey||c.metaKey)&&i()}),e.append(a("div",{class:Ue("editor")},r,a("div",{class:Ue("form")},o,n))),s();let l=Ce((c,u)=>c==="GreetingCustomizer"&&u==="greetings"&&s());return()=>{l(),e.replaceChildren()}}var ta=`/*
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
`;var xo="data-bloom-greeting",Kc=1e3,Qc=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],S=g({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>ea(e)},greetings:{type:"custom",default:Qc},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),So,oa=[],En,na=()=>S.store.greetings.filter(e=>typeof e=="string"&&e.trim());function yt(){let e=na();if(e.length)if(S.store.order==="random"&&e.length>1){let t=S.store.lastRandom;for(;t===S.store.lastRandom;)t=Math.floor(Math.random()*e.length);S.store.lastRandom=t,S.store.index=t}else S.store.index=(S.store.index+1)%e.length}function Wc(){return fe()?Te(d.homeHeading):null}function ra(){for(let e of document.querySelectorAll(`[${xo}]`))e.removeAttribute(xo),pe(e,null)}function At(){let e=na(),t=Wc();if(!t||!e.length){ra();return}(S.store.index<0||S.store.index>=e.length)&&yt(),t.setAttribute(xo,""),pe(t,e[Math.max(0,S.store.index)%e.length])}function Cn(){clearInterval(So),So=void 0,S.store.mode==="interval"&&fe()&&(So=setInterval(()=>{yt(),At()},S.store.intervalSec*Kc))}function jc(e){S.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${xo}]`)||getSelection()?.toString()||(yt(),At())}function zc(){fe()&&S.store.mode==="refresh"&&yt(),Cn(),At()}var ia=f({name:"GreetingCustomizer",description:"Replace the \u201CWhat can I help with?\u201D heading on the home page with your own lines.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:S,styles:ta,start(){En=new AbortController,document.addEventListener("click",jc,{signal:En.signal}),fe()&&S.store.mode==="refresh"&&yt(),Cn(),oa=[T(e=>G(e)&&At()),re(zc)]},stop(){En?.abort();for(let e of oa)e();clearInterval(So),ra()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&Cn(),At()}});var qt=w("bloom-history-"),Tn=10,Jc=3e3;function aa(e){let t="",o=0,n=new Set,r=a("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),i=a("div",{class:qt("list")}),s=a("div",{class:qt("pager")}),l,c=Y("Clear all",()=>{if(!l){c.textContent="Click again to clear",l=setTimeout(()=>{l=void 0,c.textContent="Clear all"},Jc);return}clearTimeout(l),l=void 0,c.textContent="Clear all",vt([])},"danger");function u(){let B=[...Ae.store.entries].toReversed(),V=t.trim().toLowerCase(),b=V?B.filter(W=>W.toLowerCase().includes(V)):B,D=Math.max(1,Math.ceil(b.length/Tn));o=Math.min(o,D-1);let Qe=b.slice(o*Tn,(o+1)*Tn).map(W=>a("div",{class:qt("row")},a("button",{class:qt("text",n.has(W)?"text-open":"text-closed"),text:W,title:n.has(W)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{n.delete(W)||n.add(W),u()}}}),F("copy","Copy",()=>void Jn(W)),F("trash","Delete",()=>vt(Ae.store.entries.filter(ts=>ts!==W)))));i.replaceChildren(...Qe.length?Qe:[a("div",{class:"bloom-muted",text:V?"No matching prompts.":"No saved prompts yet."})]),s.replaceChildren(a("span",{class:"bloom-muted",text:`${b.length} ${V?"matching":"saved"} \xB7 page ${o+1} of ${D}`}),Y("Previous",()=>{o--,u()}),Y("Next",()=>{o++,u()}),c);let[Tt,Mt]=s.querySelectorAll("button");Tt.disabled=o===0,Mt.disabled=o>=D-1,c.disabled=!B.length}r.addEventListener("input",()=>{t=r.value,o=0,u()}),e.append(a("div",{class:qt("manager")},r,i,s)),u();let p=Ce((B,V)=>B==="InputHistory"&&V==="entries"&&u());return()=>{p(),clearTimeout(l),e.replaceChildren()}}var sa=`/*
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
`;var Zc=w("bloom-history-"),Xc=2e3,Ae=g({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>aa(e)},entries:{type:"custom",default:[]}}),Q=null,Mn={text:"",at:0},ye=null,Ln,wo=()=>Ae.store.entries.filter(e=>typeof e=="string");function vt(e){Ae.store.entries=e.slice(-Ae.store.maxEntries)}function Bn(e){let t=e.trim();if(!t)return;let o=Date.now();t===Mn.text&&o-Mn.at<Xc||(Mn={text:t,at:o},vt([...wo().filter(n=>n!==t),t]))}function _c(e,t){let o=Le();if(!o)return;ye??=a("div",{class:`bloom-root ${Zc("hud")}`,attrs:{"data-bloom":"history-hud","aria-live":"polite"}}),ye.textContent=`${e+1} / ${t}`;let n=(o.closest("form")??o).getBoundingClientRect();ye.style.left=`${n.left+n.width/2}px`,ye.style.top=`${n.top}px`,ye.isConnected||document.body.append(ye)}function St(){Q=null,ye?.remove()}function $c(e){let t=wo();if(!Q)return;let o=t[e];Q.index=e,Q.shown=o,ne(o),_c(t.length-1-e,t.length)}function ed(e){let t=wo();if(!t.length)return!1;if(!Q){if(e===1)return!1;Q={index:t.length,draft:U(),shown:""}}let o=Q.index+e;return o<0?!0:o>=t.length?(ne(Q.draft),St(),!0):($c(o),!0)}function td(e){if(e.isComposing||!$e(e.target))return;let t=e.target;if(e.key==="Enter"&&!e.shiftKey){Bn(U(t)),St();return}if(e.key==="Escape"&&Q){ne(Q.draft),St(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey)return;let o=qr(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!Q||ed(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function od(e){Q&&$e(e.target)&&U(e.target)!==Q.shown.trim()&&St()}function nd(e){e.target instanceof Element&&e.target.closest(d.sendButton)&&Bn(U())}var la=f({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:Ae,styles:sa,start(){Ln=new AbortController;let{signal:e}=Ln;document.addEventListener("keydown",td,{capture:!0,signal:e}),document.addEventListener("input",od,{capture:!0,signal:e}),document.addEventListener("click",nd,{capture:!0,signal:e}),document.addEventListener("submit",()=>Bn(U()),{capture:!0,signal:e})},stop(){Ln?.abort(),St()},onSettingsChange(e){e==="maxEntries"&&vt(wo())}});var ca=`/*
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
`;var id=1500,ad=5e3,sd=2e3,Ye=g({showDate:{type:"boolean",description:"Show the date for messages not sent today.",default:!0},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),Co=new Map,ma=0,To,da=[];function pa(e,t){Co.get(e)!==t&&(Co.set(e,t),clearTimeout(To),To=setTimeout(fa,sd))}function fa(){let e={...Ye.store.stamps,...Object.fromEntries(Co)};Ye.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,id))}function ld(e){let t=z(y())?.times;for(let o=e.length-1;o>=0;o--){let n=Co.get(e[o])??t?.get(e[o])??Ye.store.stamps[e[o]];if(n)return n}return null}var cd=()=>P().generating||Date.now()-ma<ad;function dd(e){let t=new Date(e),o=new Date,n={hour:"2-digit",minute:"2-digit"};if(!Ye.store.showDate||t.toDateString()===o.toDateString())return t.toLocaleTimeString(void 0,n);let r=t.getFullYear()===o.getFullYear()?{}:{year:"numeric"};return t.toLocaleString(void 0,{...r,month:"short",day:"numeric",...n})}function ua(e){let t=ro(e)??e.getAttribute("data-message-author-role")??e.closest(d.turn)?.getAttribute("data-turn")??e.querySelector(d.authorRole)?.getAttribute("data-message-author-role");if(sn(t))return t;let o=lt(e).at(-1);return z(y())?.chain.find(n=>n.id===o)?.role??null}function ud(e){let t=lt(e);if(!t.length||!Be(e)||e.querySelector("time:not([data-bloom])"))return;let o=ld(t);!o&&cd()&&(o=Date.now(),pa(t.at(-1),o));let n=e.querySelector(':scope > time[data-bloom="timestamp"]');if(!o||Ye.store.hideOwnMessages&&ua(e)==="user"){n?.remove();return}let r=dd(o);if(n?.textContent===r)return;let i=a("time",{class:`bloom-timestamp bloom-timestamp-${ua(e)??"assistant"}`,text:r,title:new Date(o).toLocaleString(),attrs:{"data-bloom":"timestamp",datetime:new Date(o).toISOString()}});n?n.replaceWith(i):e.prepend(i)}var Eo=Me(()=>{for(let e of cn())ud(e)}),ga=f({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:Ye,styles:ca,start(){da=[T(e=>G(e)&&Eo()),O.on("conversation",Eo),O.on("message-time",({messageId:e,time:t})=>{pa(e,t),Eo()}),v.on("fall",()=>{ma=Date.now()})]},stop(){for(let e of da)e();To&&(clearTimeout(To),fa());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();Eo()}}});var md=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])'],pd=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],ha=g({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),ba=f({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:ha,styles:()=>Ee([...md,...ha.store.hideDictationSettings?pd:[]])});var qe="data-bloom-share",fd=/^\/g\/g-p-/,gd=/^(?:share|分享)$/i,hd=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],bd=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${qe}="project"]`],In=g({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),Mo,kn=!1;function Ad(e){if(!G(e))return;let t=fd.test(location.pathname)&&!y();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${qe}]`))!t||!gd.test(k(o.textContent??""))?o.removeAttribute(qe):o.hasAttribute(qe)||o.setAttribute(qe,"project")}var Aa=f({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:In,styles:()=>Ee([...In.store.hideShareChat?hd:[],...In.store.hideShareProject?bd:[]]),start(){kn=!0,tt().then(()=>{kn&&!Mo&&(Mo=T(Ad))})},stop(){kn=!1,Mo?.(),Mo=void 0;for(let e of document.querySelectorAll(`[${qe}]`))e.removeAttribute(qe)}});var ya='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',yd='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',qd="[data-bloom-profile-plan]",qa="visibility:hidden!important;user-select:none!important",Sa=g({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function vd(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=Sa.store,r=[];return e&&r.push(n?`:is(${ya}){display:none!important}`:`:is(${ya}){${qa}}`),t&&r.push(`:is(${yd}){${qa}}`),e&&o&&r.push(`${qd}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var va,xa=f({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Sa,styles:vd,start(){va=Ge()},stop(){va?.()}});var wa=`/*
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
`;var L=w("bloom-queue-"),xd=6,wd=8,K=null,xt="",Fe=!1,Ke=!1;function Rn(e,t,o){let n=F(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute(ae),n.addEventListener("mouseenter",()=>Ea(t)),n.addEventListener("mouseleave",()=>Ea("")),n}function Ea(e){let t=K?.querySelector(`.${L("tip")}`);t&&(t.textContent=e)}function Ed(e,t,o,n){Ke=!0;let r=a("textarea",{class:`bloom-input ${L("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=new AbortController,s=l=>{i.abort(),Ke=!1,xt="",l?n.edit(t,r.value):r.replaceWith(a("div",{class:L("text"),text:o}))};addEventListener("keydown",l=>{if(!(l.target!==r||l.isComposing)){if(l.key==="Enter"&&!l.shiftKey)s(!0);else if(l.key==="Escape")s(!1);else return;l.preventDefault(),l.stopImmediatePropagation()}},{capture:!0,signal:i.signal}),r.addEventListener("keydown",l=>l.stopPropagation(),{signal:i.signal}),r.addEventListener("blur",()=>s(!0),{signal:i.signal}),e.querySelector(`.${L("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function Cd(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,s=c=>{!i&&Math.abs(c.clientY-n.clientY)<xd||(i||(i=Ke=!0,e.classList.add(L("dragging"))),e.style.transform=`translateY(${c.clientY-n.clientY}px)`)},l=c=>{if(removeEventListener("pointermove",s),!i)return;Ke=!1,xt="";let p=[...r.children].filter(B=>B!==e).filter(B=>B.getBoundingClientRect().top+B.getBoundingClientRect().height/2<c.clientY).length;o.move(t,p)};addEventListener("pointermove",s),addEventListener("pointerup",l,{once:!0})})}function Td(e,t,o){let n=a("li",{class:L("row")},a("div",{class:L("text"),text:e}),a("div",{class:L("actions")},Rn("trash","Remove from queue",()=>o.remove(t)),Rn("edit","Edit",()=>Ed(n,t,e,o)),Rn("send","Send now",()=>o.sendNow(t))));return Cd(n,t,o),n}function Md(e){if(!K)return;let t=e.getBoundingClientRect();K.style.left=`${t.left}px`,K.style.width=`${t.width}px`,K.style.bottom=`${innerHeight-t.top+wd}px`}function Dn(){K?.remove(),K=null,xt="",Ke=!1}function Lo(e,t){let o=et();if(!e.length||!_e(o)){Dn();return}K||(K=a("div",{class:`bloom-root ${L("tray")}`,attrs:{"data-bloom":"queue"}},a("div",{class:L("header")},a("button",{class:L("toggle"),attrs:{type:"button","aria-expanded":String(!Fe)},on:{click:i=>{Fe=!Fe,K?.classList.toggle(L("collapsed"),Fe),i.currentTarget.setAttribute("aria-expanded",String(!Fe))}}},a("span",{class:L("count")}),N("chevron")),a("span",{class:L("tip")})),a("ol",{class:L("list")})),K.classList.toggle(L("collapsed"),Fe),document.body.append(K)),Md(o);let n=JSON.stringify(e);if(Ke||n===xt)return;xt=n;let r=K.querySelector(`.${L("count")}`);r&&(r.textContent=Lt(e.length,"Queued message")),K.querySelector(`.${L("list")}`)?.replaceChildren(...e.map((i,s)=>Td(i,s,t)))}var Ld=8,Ma=150,La=20,Ba=g({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1}}),ve=new Map,Bo=!1,Se=null,On,Ca=[],Pn="draft",Nn=()=>y()??Pn,J=()=>ve.get(Nn())??[];function xe(e){e.length?ve.set(Nn(),e):ve.delete(Nn()),Lo(J(),Hn)}function Ia(e,t=0){t>=La||P().generating||U()!==e||(Sr(),setTimeout(()=>Ia(e,t+1),Ma))}function Io(e,t=0){if(P().generating||U()){t<La&&setTimeout(()=>Io(e,t+1),Ma);return}ne(e),Fo(()=>Ia(e))}function Ta(){if(Se!=null){let o=Se;Se=null,Io(o);return}if(!Bo||P().generating||U())return;let[e,...t]=J();e!=null&&(Bo=!1,xe(t),Io(e))}function ka(e){let t=J(),o=t[e];if(o!=null){if(xe(t.filter((n,r)=>r!==e)),!P().generating){Io(o);return}Se=o,Ft()?.click()}}var Hn={remove:e=>xe(J().filter((t,o)=>o!==e)),edit:(e,t)=>xe(t.trim()?J().map((o,n)=>n===e?t:o):J().filter((o,n)=>n!==e)),sendNow:ka,move(e,t){let o=[...J()],[n]=o.splice(e,1);o.splice(t,0,n),xe(o)}};function Bd(e){let t=J();return Ba.store.replacePending&&t.length?(xe([...t.slice(0,-1),e]),!0):t.length>=Ld?!1:(xe([...t,e]),!0)}function Id(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!$e(e.target)||!P().generating)return;let t=U(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;ne(""),Se=t,Ft()?.click();return}if(!t){J().length&&ka(0);return}Bd(t)&&ne("")}var Ra=f({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:Ba,styles:wa,start(){On=new AbortController,document.addEventListener("keydown",Id,{capture:!0,signal:On.signal}),Ca=[v.on("fall",({outcome:e})=>{Bo=e==="done",e==="left"&&(Se=null),Ta()}),v.on("context",({prevId:e,id:t,migrated:o})=>{let n=ve.get(Pn);ve.delete(Pn),o&&!e&&t&&n&&ve.set(t,n),o||(Bo=!1),Lo(J(),Hn)}),v.on("tick",()=>{Ta(),Lo(J(),Hn)})]},stop(){On?.abort();for(let e of Ca)e();Dn(),ve.clear(),Se=null}});var kd=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function Rd(){let e=k(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!kd.has(e.toLowerCase())?e:null}function wt(e){return e?z(e)?.title??_r(e)??(e===y()?Rd():null):null}var Da=`/*
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
`;var ee=w("bloom-recent-"),te="home",Od=50,Oa=140,Pd=new Set(["Backquote"]),Nd=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),A=g({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),ce=null,X=[],_=0,Gn,Pa=[],Do=()=>Dr()?null:y()??(fe()?te:null);function Na(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function Ga(e){let t=wt(e);t&&A.store.titles[e]!==t&&(A.store.titles={...A.store.titles,[e]:t});let o=$r(location.href);o&&e===y()&&A.store.projects[e]!==o&&(A.store.projects={...A.store.projects,[e]:o})}function Ha(e){if(!e)return;let t=[e,...A.store.visits.filter(n=>n!==e)].slice(0,Od),o=new Set(t);A.store.visits=t,Object.keys(A.store.previews).some(n=>!o.has(n))&&(A.store.previews=Na(A.store.previews,o)),Object.keys(A.store.titles).some(n=>!o.has(n))&&(A.store.titles=Na(A.store.titles,o)),e!==te&&Ga(e)}function ko(e){if(!e||!A.store.visits.includes(e))return;let t={},o=z(e)?.chain??[];for(let r of o)t[r.role]=oe(so(r),Oa);if(e===y())for(let r of io()){let i=ao(r);i&&(t[r.role]=oe(i,Oa))}let n=A.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(A.store.previews={...A.store.previews,[e]:t})}function Hd(){let e=Number(A.store.maxRecent);return A.store.visits.filter(t=>t!==te||A.store.includeHome).slice(0,e)}function Un(e){if(Et(),e===Do())return;let t=e===te?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"]'):rt(e)[0];t?t.click():location.assign(e===te?"/":`/c/${e}`)}function Gd(e,t){let o=e===te?"New chat":A.store.titles[e]??wt(e)??"Untitled chat",n=e===te?null:A.store.projects[e],r=e===te?null:A.store.previews[e];return a("button",{class:ee("item"),attrs:{type:"button",role:"option","aria-selected":String(t===_)},on:{click:()=>Un(e),mousemove:()=>t!==_&&Ro(t)}},a("div",{class:ee("head")},a("span",{class:`${ee("title")} bloom-truncate`,text:o}),n&&a("span",{class:ee("project"),text:n})),r?.user&&a("div",{class:`${ee("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&a("div",{class:`${ee("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function Ro(e){_=(e+X.length)%X.length,ce?.querySelectorAll(`.${ee("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===_)))}function Ud(){ko(y());let e=Do();X=Hd(),e&&(X=[e,...X.filter(t=>t!==e)].slice(0,Number(A.store.maxRecent))),X.length&&(_=X.length>1?1:0,ce=a("div",{class:`bloom-root ${ee("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:t=>t.target===t.currentTarget&&Et()}},a("div",{class:ee("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...X.map(Gd))),document.body.append(ce))}function Et(){ce?.remove(),ce=null}var Yd=e=>Pd.has(e.code)||Nd.has(e.key);function Fd(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&Yd(e)){e.preventDefault(),e.stopPropagation(),ce?Ro(_+(e.shiftKey?-1:1)):Ud();return}if(!ce)return;let o={Escape:Et,Enter:()=>Un(X[_]),ArrowDown:()=>Ro(_+1),ArrowUp:()=>Ro(_-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function Kd(e){ce&&e.key==="Control"&&Un(X[_])}var Ua=f({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:A,styles:Da,start(){Gn=new AbortController;let{signal:e}=Gn;addEventListener("keydown",Fd,{capture:!0,signal:e}),addEventListener("keyup",Kd,{capture:!0,signal:e}),addEventListener("blur",Et,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&ko(y()),{signal:e}),Pa=[re(({prevId:i})=>{ko(i),Ha(Do())}),O.on("conversation",({id:i})=>{A.store.visits.includes(i)&&Ga(i),ko(i)})];let{visits:t,titles:o,previews:n}=A.store,r=t.filter(i=>i!==te&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(A.store.visits=t.filter(i=>!r.includes(i))),Ha(Do())},stop(){Gn?.abort();for(let e of Pa)e();Et()}});var Yn="data:audio/mpeg;base64,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";var Ya=new q("ResponseNotification"),Qd=.5,Wd=200,jd=300,Ct=g({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:e=>(e.append(Y("Preview",Wa)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),Fa=null,Fn=new Map,Ka,Kn;function zd(e){return new Promise((t,o)=>GM_xmlhttpRequest({url:e,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=Wd&&n<jd?t(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var Jd=e=>Uint8Array.from(atob(e.slice(e.indexOf(",")+1)),t=>t.charCodeAt(0)).buffer;function Vd(e,t){let o=Fn.get(t);return o||(o=(t.startsWith("data:")?Promise.resolve(Jd(t)):zd(t)).then(n=>e.decodeAudioData(n)),o.catch(()=>Fn.delete(t)),Fn.set(t,o)),o}async function Qa(e){Fa??=new AudioContext;let t=Fa;t.state==="suspended"&&t.resume();let o=t.createBufferSource(),n=t.createGain();o.buffer=await Vd(t,e),n.gain.value=Qd,o.connect(n).connect(t.destination),o.start()}function Wa(){let e=Ct.store.soundUrl.trim();Qa(e||Yn).catch(t=>{Ya.warn("Sound failed",t),e&&Qa(Yn).catch(o=>Ya.warn("Default chime failed",o))})}function Zd(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function Xd(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(Kn=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:Kn.signal}))}var ja=f({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:Ct,start(){Xd(),Ka=v.on("fall",({conversationId:e,outcome:t})=>{t==="done"&&(Ct.store.onlyWhenHidden&&!document.hidden||(Ct.store.sound&&Wa(),Ct.store.browserNotification&&Zd(wt(e))))})},stop(){Ka?.(),Kn?.abort()}});var _d="filter:blur(6px)!important;transition:filter 0.2s ease",za=`:is(${d.sidebars})`,$d={conversations:{selectors:[`${za} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0},projects:{selectors:[`${za} a:is([href*="/project"], [href*="/g/g-p-"])`,"[data-app-action-sidebar-project-row]",".bloom-recent-project"],hover:!0},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}},Va=g({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function eu(){return Object.entries($d).filter(([e])=>Va.store[e]).map(([,{selectors:e,hover:t}])=>{let o=e.join(",");return`:is(${o}){${_d}}`+(t?`:is(${o}):hover, .bloom-recent-item:hover :is(${o}){filter:none!important}`:"")}).join(`
`)}var Ja,Za=f({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:Va,styles:eu,start(){Ja=Ge()},stop(){Ja?.()}});var tu=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],ou=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",nu='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',Xa=g({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function ru(){let e=`${Xa.store.width}rem`;return`:is(${ou}){${tu.map(t=>`${t}:${e}!important`).join(";")}}:is(${nu}){max-width:min(100%, ${e})!important}`}var _a=f({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:Xa,styles:ru});var iu=[di,Si,Ei,Pi,Hi,Yi,Xi,ia,la,ga,ba,Aa,xa,Ra,Ua,ja,Za,_a],Qn=iu;var au=new q("Bloom"),$a="2.0.23";async function Wn(){Br();for(let e of Qn)e.updatedAt=Ur[e.name];cr(Qn),await ir(),Bt("base",gr),Gr(),Ht("Init"),Wt().then(()=>{_n(),Ht("DOMContentLoaded")}),await kr(),Ht("HostReady"),au.info(`Bloom++ ${$a} ready`)}var es=new q("Boot");if(window===window.top){let e=j.Bloom;e&&es.warn("Replacing another Bloom++ instance",e.VERSION),Object.defineProperty(j,"Bloom",{value:jn,configurable:!0,writable:!0}),Wn().catch(t=>es.error("Startup failed",t))}})();
