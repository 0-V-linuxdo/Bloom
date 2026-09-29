// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260929] v2.0.18
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

/* Bloom++ [20260929] v2.0.18. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Ya=Object.defineProperty;var Xa=(e,t)=>{for(var o in t)Ya(e,o,{get:t[o],enumerable:!0})};var S=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var we=(e,t,o)=>Math.min(o,Math.max(t,e)),T=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Fn=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,Ee=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,R=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function At(e,t){return`${e} ${t}${e===1?"":"s"}`}async function jn(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function Fe(e){try{return JSON.parse(e)}catch{return}}var K=typeof unsafeWindow>"u"?window:unsafeWindow;var zn={};Xa(zn,{VERSION:()=>Ka,init:()=>Un,plugins:()=>de});var Ja=new S("Styles"),je=new Map,Kn=new Set,Ke=new Map,Do=!0;function Wn(){let e=document.adoptedStyleSheets.filter(t=>!Kn.has(t));document.adoptedStyleSheets=[...e,...je.values()]}function Vn(e){document.readyState==="loading"||e.parentNode===document.head||document.head.append(e)}function Za(e,t){let o=Ke.get(e);o||(o=document.createElement("style"),o.id=`bloom-style-${e}`,Ke.set(e,o)),o.textContent!==t&&(o.textContent=t),Vn(o)}function Lt(e,t){if(Do)try{let o=je.get(e);o||(o=new K.CSSStyleSheet,je.set(e,o),Kn.add(o)),o.replaceSync(t),Wn();return}catch(o){Ja.warn("Constructed style sheets unavailable, using <style> after parsing",o),Do=!1,je.delete(e)}Za(e,t)}function No(e){je.delete(e)&&Do&&Wn(),Ke.get(e)?.remove(),Ke.delete(e)}function Yn(){for(let e of Ke.values())Vn(e)}var E=e=>(...t)=>t.map(o=>e+o).join(" "),Pt=(...e)=>e.filter(Boolean).join(" "),Te=e=>e.length?`${e.join(",")}{display:none!important}`:"";function f(e){return e}var kt=new S("Storage"),Qa="bloompp",Rt="kv",Xn=null;function es(){return Xn??=new Promise((e,t)=>{let o=indexedDB.open(Qa,1);o.onupgradeneeded=()=>{o.result.objectStoreNames.contains(Rt)||o.result.createObjectStore(Rt)},o.onsuccess=()=>e(o.result),o.onerror=()=>t(o.error)}),Xn}function Jn(e,t){return es().then(o=>new Promise((n,r)=>{let i=t(o.transaction(Rt,e).objectStore(Rt));i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)}))}async function ts(e){if(typeof GM_getValue=="function")try{return await GM_getValue(e)}catch(t){kt.warn("GM read failed",t);return}}async function os(e){try{return await Jn("readonly",t=>t.get(e))}catch(t){kt.warn("IndexedDB read failed",t);return}}function ns(e){try{return localStorage.getItem(e)??void 0}catch{return}}async function Zn(e){return Promise.all([ts(e),os(e),ns(e)])}function Qn(e,t){let o=JSON.stringify(t);if(typeof GM_setValue=="function")try{GM_setValue(e,t)}catch{GM_setValue(e,o)}try{localStorage.setItem(e,o)}catch(n){kt.warn("localStorage write failed",n)}Jn("readwrite",n=>n.put(o,e)).catch(n=>kt.warn("IndexedDB write failed",n))}var rs=new S("Settings"),tr="BloomSettings",is=100,as=["GM","IndexedDB","localStorage"],Ot={plugins:{}},Ho=new Set,We;function ss(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=Fe(t);return!T(t)||!T(t.plugins)||!Object.keys(t.plugins).length?null:t}var _o=e=>e==null||e===""||(Array.isArray(e)?!e.length:T(e)&&!Object.keys(e).length);function ls(e){return _o(e)?0:Array.isArray(e)?12+Math.min(e.length,40):T(e)?12+Math.min(Object.keys(e).length,40):3}function cs(e){let t=0;for(let o of Object.values(e.plugins))if(T(o))for(let[n,r]of Object.entries(o))n!=="enabled"&&(t+=ls(r));return t}var er=e=>Object.values(e.plugins).filter(t=>T(t)&&t.enabled===!0).length;function ds(e){let t=e.map((i,s)=>i&&{candidate:i,index:s,score:cs(i)}).filter(i=>i!=null).toSorted((i,s)=>s.score-i.score||(i.score?0:er(s.candidate)-er(i.candidate))||i.index-s.index);if(!t.length)return null;let[o,...n]=t,r=structuredClone(o.candidate);for(let{candidate:i}of n)for(let[s,c]of Object.entries(i.plugins)){if(!T(c))continue;let l=r.plugins[s]??={};for(let[u,p]of Object.entries(c))u==="enabled"?!("enabled"in l)&&p===!0&&(l.enabled=!0):_o(l[u])&&!_o(p)&&(l[u]=structuredClone(p));Object.keys(l).length||delete r.plugins[s]}return{bag:r,source:as[o.index]}}async function or(){let e=await Zn(tr),t=ds(e.map(ss));t&&(Ot.plugins=t.bag.plugins,rs.info("Loaded settings from",t.source))}function nr(){We=void 0,Qn(tr,Ot)}function us(){We&&(clearTimeout(We),nr())}var le=(e,t)=>Ot.plugins[e]?.[t];function ce(e,t,o){let n=Ot.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,clearTimeout(We),We=setTimeout(nr,is);for(let r of Ho)r(e,t)}function Ce(e){return Ho.add(e),()=>void Ho.delete(e)}function $o(e){return e.type==="component"?void 0:e.default}function g(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>le(t.pluginName,n)??(e[n]&&$o(e[n])),set:(o,n,r)=>(ce(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&le(t.pluginName,o)!==void 0&&ce(t.pluginName,o)}};return t}var rr=e=>{let t=()=>{let o=le("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();ce("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},It=rr("pinnedPlugins"),Bt=rr("starredPlugins");addEventListener("pagehide",us);var Dt=new S("PluginManager"),de=new Map,Ve=new Set,ir=new Set,qo=new Set;function ar(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),de.set(t.name,t)}var Ye=e=>!!e.required||(le(e.name,"enabled")??!!e.enabledByDefault);var Go=e=>`plugin-${e.name}`;function sr(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?Lt(Go(e),t):No(Go(e))}function lr(e){if(!Ve.has(e.name))try{sr(e),e.start?.(),Ve.add(e.name)}catch(t){Dt.error(`Failed to start ${e.name}`,t)}}function ms(e){if(Ve.delete(e.name)){No(Go(e));try{e.stop?.()}catch(t){Dt.error(`Failed to stop ${e.name}`,t)}}}var cr=e=>e.startAt??"HostReady";function Nt(e){ir.add(e);for(let t of de.values())cr(t)===e&&Ye(t)&&lr(t);Dt.info(`${e}: ${[...Ve].join(", ")}`)}function dr(e,t){ce(e.name,"enabled",t),t?ir.has(cr(e))&&lr(e):ms(e);for(let o of qo)o()}function ur(e){return qo.add(e),()=>void qo.delete(e)}Ce((e,t)=>{let o=de.get(e);if(!(!o||t==="enabled"||!Ve.has(e)))try{sr(o),o.onSettingsChange?.(t)}catch(n){Dt.error(`Settings change failed for ${e}`,n)}});var mr=`/*
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
`;var fs=new S("Dom");function a(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var pr=document.createElement("template");function fr(e){return pr.innerHTML=e.trim(),pr.content.firstElementChild.cloneNode(!0)}var Je=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),Me=(e,t=document)=>[...t.querySelectorAll(e)].find(Je)??null,gs=16,bs="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function gr(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([bs],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function Uo(e){document.hidden?setTimeout(e,gs):requestAnimationFrame(e)}function Ae(e){let t=!1;return()=>{t||(t=!0,Uo(()=>{t=!1;try{e()}catch(o){fs.error("Scheduled task failed",o)}}))}}var Ht=new Set,_t=[],Xe,hs=Ae(()=>{let e=_t;_t=[];for(let t of Ht)t(e)});function M(e){return Ht.add(e),Xe||(Xe=new MutationObserver(t=>{_t.push(...t),hs()}),Xe.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{Ht.delete(e),!Ht.size&&(Xe?.disconnect(),Xe=void 0,_t=[])}}var ys=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),H=e=>!e.length||e.some(t=>!ys(t.target));function ue(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size");return}e.getAttribute("data-bloom-text")!==t&&(e.hasAttribute("data-bloom-text")||e.style.setProperty("--bloom-text-size",getComputedStyle(e).fontSize),e.setAttribute("data-bloom-text",t))}var vs=new S("Events");function $t(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){vs.error(`Listener for ${String(t)} failed`,r)}}}}var d={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]'};var br=/[​-‍﻿]/g,Le=()=>Me(d.composerInput),Ze=e=>e instanceof HTMLElement&&e.matches(d.composerInput),Qe=(e=Le())=>e?.closest("form")??document.querySelector(d.oldComposerForm);function z(e=Le()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(br,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(br,"").trim()}var Ss=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function Q(e,t=Le()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return Ss?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function hr(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:s,value:c}=e;return{first:!c.slice(0,i).includes(`
`),last:!c.slice(s).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var yr=e=>{let t=Qe();return(t&&Me(e,t))??Me(e)},qt=()=>yr(d.stopButton),xs=()=>{let e=yr(d.sendButton);return e&&!e.matches(d.stopButton)?e:null};function vr(){let e=xs();if(e&&!e.disabled)return e.click(),!0;let t=Le();return t?(t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),!0):!1}var Sr=()=>Je(qt());var Er=new S("Network"),ws=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,Es=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,Ut=1e3,Ts=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),B=$t(),zo=new Map,xr=new Map,Cs=1,W=e=>e?zo.get(e)??null:null;function Gt(e){let t=zo.get(e);return t||zo.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var Tr=e=>e==="user"||e==="assistant";function Cr(e){let t=e.author?.role;if(!e.id||!Tr(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(l=>typeof l=="string").join(`
`).trim(),i=n.filter(l=>T(l)&&l.content_type==="image_asset_pointer").length,s=e.metadata?.attachments,c=Array.isArray(s)&&s.length>0;return!r&&!i&&!c?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*Ut:null,text:r,hasFiles:c,imageCount:i}}var Mr=e=>e.filter((t,o)=>t.role==="user"||e[o+1]?.role!=="assistant");function Ms(e,t){let o=t.filter(T).map(i=>T(i.message)?i.message:i);for(let i of o)i.id&&i.create_time&&e.times.set(i.id,i.create_time*Ut);let n=o.map(Cr).filter(i=>i!=null),r=new Set(n.map(i=>i.id));return e.chain=Mr([...e.chain.filter(i=>!r.has(i.id)),...n]),e}function As(e,t){if(!T(t)||!(T(t.mapping)||Array.isArray(t.messages)))return null;let o=Gt(e);if(typeof t.title=="string"&&t.title&&(o.title=t.title),Array.isArray(t.messages))return Ms(o,t.messages);let n=t.mapping;for(let c of Object.values(n)){let l=c.message?.create_time;c.message?.id&&l&&o.times.set(c.message.id,l*Ut)}let r=[],i=new Set,s=typeof t.current_node=="string"?t.current_node:null;for(;s&&!i.has(s)&&n[s];){i.add(s);let c=n[s].message,l=c?Cr(c):null;l&&r.push(l),s=n[s].parent??null}return r.length&&(o.chain=Mr(r.toReversed())),o}function Ls(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}function Ps(e){if(typeof e?.body!="string")return null;let t=Fe(e.body);return T(t)&&typeof t.conversation_id=="string"?t.conversation_id:null}function ks(e,t){if(!T(e))return;typeof e.type=="string"&&Ts.has(e.type)&&(t.handoff=!0);let o=T(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(Gt(e.conversation_id).title=e.title,B.emit("conversation",Gt(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&Tr(n.author?.role)){let r=n.create_time*Ut;t.conversationId&&Gt(t.conversationId).times.set(n.id,r),B.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function Rs(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:s}=await o.read();if(i)break;r+=n.decode(s,{stream:!0});let c=r.split(`
`);r=c.pop()??"";for(let l of c){if(!l.startsWith("data:"))continue;let u=l.slice(5).trim();u&&u!=="[DONE]"&&ks(Fe(u),t)}}}async function Os(e,t,o){let n={conversationId:t,error:!1,handoff:!1};xr.set(e,t),B.emit("generate-start",{requestId:e,conversationId:t});try{let r=await o;r.ok?r.headers.get("content-type")?.includes("event-stream")&&await Rs(r.clone(),n):n.error=!0}catch(r){let i=r instanceof DOMException&&r.name==="AbortError";n.handoff||=i,n.error||=!i}finally{xr.delete(e),B.emit("generate-end",{requestId:e,...n})}}async function Is(e,t){try{let o=await t;if(!o.ok)return;let n=As(e,await o.clone().json());n&&B.emit("conversation",n)}catch(o){Er.debug("Conversation read skipped",o)}}function Bs(e,t,o){let n=Ls(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&ws.test(n.pathname)){Os(Cs++,Ps(t),o);return}let i=r==="GET"&&n.pathname.match(Es)?.[1];i&&Is(i,o)}var wr=!1;function Ar(){if(wr)return;wr=!0;let e=K.fetch,t=function(o,n){let r=e.call(this??K,o,n);try{Bs(o,n,r)}catch(i){Er.error("Fetch tap failed",i)}return r};K.fetch=typeof exportFunction=="function"?exportFunction(t,K):t}var Ds="__reactContainer$",Lr="__reactFiber$";function zt(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var Fo=(e,t)=>Object.keys(e.wrappedJSObject??e).some(o=>o.startsWith(t)),Pe=e=>!Fo(document,Ds)||Fo(e,Lr);function et(){return document.body?Promise.resolve():new Promise(e=>{let t=new MutationObserver(()=>{document.body&&(t.disconnect(),e())});t.observe(document,{childList:!0,subtree:!0})})}async function Pr(){await et();let e=Date.now()+8e3;for(;!Fo(document.body,Lr)&&Date.now()<e;)await new Promise(t=>setTimeout(t,100))}var Ns=new S("Route"),kr=/\/c\/(?!local-)([\w-]+)/,Hs=500,Wo=e=>{try{return new URL(e,location.origin).pathname.match(kr)?.[1]??null}catch{return null}},v=()=>location.pathname.match(kr)?.[1]??null,me=()=>location.pathname==="/",Rr=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",jt=new Set,Kt=location.href,Ko=v(),Ft;function jo(){if(location.href===Kt)return;let e={prevHref:Kt,href:location.href,prevId:Ko,id:v()};Kt=e.href,Ko=e.id;for(let t of jt)try{t(e)}catch(o){Ns.error("Route listener failed",o)}}function _s(){let e=new AbortController,{navigation:t}=K;t?.addEventListener("currententrychange",()=>queueMicrotask(jo),{signal:e.signal}),addEventListener("popstate",jo,{signal:e.signal});let o=setInterval(jo,Hs);return()=>{e.abort(),clearInterval(o)}}function ne(e){return jt.add(e),Ft||(Kt=location.href,Ko=v(),Ft=_s()),()=>{jt.delete(e),!jt.size&&(Ft?.(),Ft=void 0)}}var $s=250,qs=400,Gs=6e4,Us=5e3,zs=`:is(${d.turn}) :is(${d.turnBusy})`,x=$t(),Yt=new Set,Vo=new Set,re=!1,Ir=0,ke=null,Re=!1,Wt=!1,tt=0,Xt=!1,ot=null,Or=!1,_=()=>({generating:re,conversationId:v()}),Br=()=>Sr()||!!document.querySelector(zs);function Fs(){let e=Br();return e?Wt||(tt=0,Xt=!0):Wt=!1,[...Yt].some(t=>!Vo.has(t))||e&&!Wt||Date.now()<tt}function js(){return ot?.error?"error":Re?"stopped":"done"}function Ks(){ke=null,re=!1,Xt=!1,x.emit("fall",{conversationId:v(),outcome:js()}),Re=!1,ot=null}function Dr(){let e=Fs();e&&!re&&(re=!0,Ir=Date.now(),Re=!1,ot=null,x.emit("rise",{conversationId:v()})),e||!re?ke=null:ke==null?ke=Date.now():Date.now()-ke>=qs&&Ks()}function Vt(){Dr(),x.emit("tick",_())}function Ws({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(re||Date.now()-Ir<Gs);if(!o&&re){for(let n of Yt)Vo.add(n);Wt=Br(),tt=0,Xt=!1,ke=null,re=!1,Re=!1,ot=null,x.emit("fall",{conversationId:e,outcome:"left"})}x.emit("context",{prevId:e,id:t,migrated:o}),Vt()}function Vs(e){e.target instanceof Element&&e.target.closest(d.stopButton)&&(Re=!0,tt=0)}function Nr(){Or||(Or=!0,B.on("generate-start",({requestId:e})=>{Yt.add(e),Vt()}),B.on("generate-end",e=>{Yt.delete(e.requestId),!Vo.delete(e.requestId)&&(ot=e,tt=e.handoff&&!e.error&&!Re&&!Xt?Date.now()+Us:0,Vt())}),ne(Ws),document.addEventListener("click",Vs,!0),gr(Vt,$s),zt().then(()=>M(Dr)))}var Hr={BetterNavigator:1790660235e3,ChatListStatus:1790658944e3,ChatStateFavicons:1790623094e3,Cleaner:1790622654e3,ComposerOpacity:1790616549e3,CustomSidebarIdentity:1790658669e3,GreetingCustomizer:1790616549e3,InputHistory:1790658669e3,MessageTimestamps:1790649198e3,NoDictation:1790653816e3,NoShareLink:1790658669e3,NoSidebarIdentity:1790616549e3,PromptQueue:1790620238e3,RecentTopics:1790620238e3,ResponseNotification:1790660336e3,Settings:1790660336e3,StreamerMode:1790616549e3,WiderChat:1790616549e3};var b=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,Ys="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",Xs={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${Ys}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:b('<path d="M18 6 6 18M6 6l12 12"/>'),gear:b('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:b('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:b('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:b('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:b('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:b('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:b('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:b('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:b('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:b('<path d="m6 9 6 6 6-6"/>'),play:b('<path d="M7 4v16l13-8z"/>'),plus:b('<path d="M12 5v14M5 12h14"/>'),check:b('<path d="m5 12 5 5 9-10"/>'),alert:b('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:b('<path d="M4 5h16v11H9l-5 4z"/>'),layout:b('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:b('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:b('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:b('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:b('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:b('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:b('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:b('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:b('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:b('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:b('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:b('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:b('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:b('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:b('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),grip:b('<path d="M9 6h0M15 6h0M9 12h0M15 12h0M9 18h0M15 18h0"/>')},D=e=>fr(Xs[e]);var Ie="data-bloom-tip",Yo=6,Xo=8,pe,_r=null;function Oe(e){if(e===_r)return;if(_r=e,!e){pe?.remove();return}pe??=a("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),pe.textContent=e.getAttribute(Ie),document.body.append(pe);let t=e.getBoundingClientRect(),{width:o,height:n}=pe.getBoundingClientRect(),r=t.bottom+Yo+n<=innerHeight-Xo;pe.style.left=`${we(t.left+t.width/2-o/2,Xo,innerWidth-o-Xo)}px`,pe.style.top=`${r?t.bottom+Yo:t.top-Yo-n}px`}var $r=e=>e instanceof Element?e.closest(`[${Ie}]`):null;function qr(){let e=new AbortController,t={passive:!0,signal:e.signal};return document.addEventListener("pointerover",o=>Oe($r(o.target)),t),document.addEventListener("pointerout",o=>o.relatedTarget||Oe(null),t),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&Oe($r(o.target)),t),document.addEventListener("focusout",()=>Oe(null),t),document.addEventListener("pointerdown",()=>Oe(null),t),()=>{e.abort(),Oe(null)}}var Js=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,Gr=/\S+@\S+\.\S+/,Zs=3,Qs=/^\/g\/(g-p-[^/]+)\//,el=/^g-p-[0-9a-f]+-?/i,Ur=e=>!!e.closest(".sr-only"),Jo=e=>!!e?.querySelector(d.menuButton);function zr(){return[...document.querySelectorAll(d.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(Jo)).filter(e=>e!=null)}function Fr(){let e=[...document.querySelectorAll(d.oldProfile)];if(e.length)return e.map(o=>{let n=o.parentElement?.children.length===1?o.parentElement:o;return{kind:"profile",anchor:n,insert:r=>n.before(r)}});let t=zr().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(d.rail)){let n=[...o.children].find(Jo);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}var Zo=e=>!e.closest("[data-bloom]")&&(!!e.querySelector("img, [class*=rounded-full]")||Vr(e).some(t=>!Ur(t))),jr=e=>[...e.parentElement?.children??[]].find(t=>t!==e&&t instanceof HTMLElement&&Zo(t))??null;function Kr(){let e=[...document.querySelectorAll(d.oldProfile)];return e.length?e:[...zr(),...[...document.querySelectorAll(d.rail)].map(o=>[...o.children].findLast(Jo))].map(o=>[...o?.querySelectorAll(d.menuButton)??[]].findLast(n=>Zo(n)||jr(n))).filter(o=>o!=null)}var Wr=()=>Kr().map(e=>Zo(e)?e:jr(e)).filter(e=>e!=null);function Vr(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!R(t.textContent??"")&&!(t instanceof SVGElement))}var tl=e=>{if(/rounded-full/.test(e.getAttribute("class")??""))return!0;if(!e.clientWidth)return!1;let{borderRadius:t}=getComputedStyle(e);return t.includes("%")||Number.parseFloat(t)>=e.clientWidth/2};function Jt(e,t,o){for(let n of e.querySelectorAll(`[${t}]`))n!==o&&n.removeAttribute(t);o&&!o.hasAttribute(t)&&o.setAttribute(t,"")}function ol(e,t){if(R(e.textContent??"").length>Zs)return null;let o=e.closest("button");for(let n=e;n&&n!==t&&n!==o;n=n.parentElement)if(tl(n))return n;return null}function Qo(e,t){e.hasAttribute(`data-bloom-${t}`)||e.setAttribute(`data-bloom-${t}`,"");let o=e.querySelector("img:not([data-bloom] img)"),n=Vr(e),r=o?null:n.map(p=>ol(p,e)).find(p=>p!=null),i=o?.closest("[class*=rounded-full]"),s=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");Jt(e,`data-bloom-${t}-avatar`,s);let c=n.filter(p=>!s?.contains(p)&&!Ur(p)),l=c.find(p=>Js.test(R(p.textContent??""))),u=c.find(p=>Gr.test(p.textContent??""));Jt(e,`data-bloom-${t}-plan`,l),Jt(e,`data-bloom-${t}-email`,u),Jt(e,`data-bloom-${t}-name`,c.find(p=>p!==l&&p!==u))}function nl(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function Zt(){return Kr().map(nl).find(e=>e!=null)??[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&(Gr.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var nt=e=>[...document.querySelectorAll(d.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&Wo(t.href)===e);function Yr(e){let t=nt(e).find(o=>R(o.textContent??""));return t?R(t.textContent??""):null}function Xr(e){let t=new URL(e,location.origin).pathname.match(Qs)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!Wo(n.href)&&R(n.textContent??""));return o?R(o.textContent??""):t.replace(el,"").replaceAll("-"," ")||null}function en(e,t,o){let n=a("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o}});return n.addEventListener("click",r=>{r.stopPropagation();let i=n.getAttribute("aria-checked")!=="true";n.setAttribute("aria-checked",String(i)),t(i)}),n}function $(e,t,o){return a("button",{class:Pt("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button"},on:{click:t}})}function q(e,t,o,n){let r=a("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":t,[Ie]:t},on:{click:o}},D(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function Qt(e,t,o,n,r,i){let s=a("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});s.value=String(e);let c=a("output",{text:`${s.value}${r}`});return s.addEventListener("input",()=>{c.textContent=`${s.value}${r}`,i(Number(s.value))}),a("div",{class:"bloom-slider"},s,c)}function tn(e,t,o){let n=a("select",{class:"bloom-select"},...t.map(r=>a("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function rt(e,t,o="",n="text"){let r=a("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var rl=new S("SettingsPanel"),m=E("bloom-settings-"),il=10080*60*1e3,al=3e3,Jr="Toggle features. Some need a reload. Click the sliders icon to configure.",sl=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],ll=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],cl={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},Zr=new Set(["chat","ui","privacy"]),N=null,Be="all",on="all",eo="",nn=[],Qr=()=>[...de.values()].filter(e=>!e.hidden),dl=e=>!!e.updatedAt&&Date.now()-e.updatedAt<il;function ul(e){switch(Be){case"favorites":return Bt.has(e.name);case"recent":return dl(e);case"all":return!0;case"other":return!e.tags.some(t=>Zr.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(Be)}}function ml(e){switch(on){case"all":return!0;case"enabled":return Ye(e);case"disabled":return!Ye(e)}}function pl(e){let t=eo.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function fl(e){let t=It.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return Be==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var ei=e=>e.settings?.def??{},gl=e=>Object.values(ei(e)).some(t=>t.type!=="custom");function bl(e,t,o){let n=le(e.name,t)??$o(o),r=i=>ce(e.name,t,i);switch(o.type){case"boolean":return en(n,r,o.description??t);case"slider":return Qt(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return tn(n,o.options,r);case"string":return rt(n,r,o.placeholder);case"number":return rt(String(n),i=>r(Number(i)),"","number");case"component":{let i=a("div",{class:m("component")});return nn.push(o.render(i)),i}case"custom":return null}}var hl=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function ti(e){if(!N)return;let t=Object.entries(ei(e)).filter(([,i])=>i.type!=="custom").map(([i,s])=>{let c=bl(e,i,s),l=s.type==="boolean",u=s.type!=="component"&&a("div",{class:m("field-label"),text:hl(i)}),p=s.description&&a("div",{class:m("field-desc"),text:s.description});return a("div",{class:m("field",l?"field-inline":"field-stacked")},(u||p)&&a("div",{class:m("field-text")},u,p),c)}),o,n=$("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},al);return}clearTimeout(o),e.settings?.reset(),it(),ti(e)},"danger"),r=a("div",{class:m("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&it()}},a("div",{class:m("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},a("div",{class:m("popup-header")},a("div",{class:m("card-icon")},D(e.icon)),a("div",{class:m("popup-title")},a("div",{class:m("card-name"),text:e.name}),a("div",{class:m("popup-authors"),text:e.authors.join(", ")})),q("close","Close",it)),a("p",{class:m("popup-desc"),text:e.description}),a("div",{class:m("fields")},...t),a("div",{class:m("popup-footer")},n)));N.querySelector(`.${m("modal")}`)?.append(r)}function it(){for(let e of nn)e();nn=[],N?.querySelector(`.${m("popup-backdrop")}`)?.remove()}function yl(e){let t=Ye(e),o=Bt.has(e.name),n=It.has(e.name);return a("div",{class:m("card",t?"card-on":"card-off")},a("div",{class:m("card-top")},a("div",{class:m("card-icon")},D(e.icon)),a("div",{class:m("card-actions")},q("star",o?"Unstar":"Star",()=>{Bt.toggle(e.name),fe()},o),q("pin",n?"Unpin":"Pin to top",()=>{It.toggle(e.name),fe()},n),gl(e)&&q("gear","Settings",()=>ti(e)),e.required?null:en(t,r=>dr(e,r),`Enable ${e.name}`))),a("div",{class:m("card-name"),text:e.name}),a("div",{class:m("card-desc"),text:e.description,title:e.description}),a("div",{class:m("card-footer"),text:e.authors.join(", ")}))}function oi(){let e=Qr().some(o=>!o.tags.some(n=>Zr.has(n)));N?.querySelector(`.${m("tabs")}`)?.replaceChildren(...sl.filter(o=>o.id!=="other"||e).map(o=>a("button",{class:m("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===Be)},on:{click:()=>{Be=o.id,oi(),fe()}}})))}function fe(){if(!N)return;let e=Qr().filter(ul),t=N.querySelector(`.${m("search")} input`);t&&(t.placeholder=`Search ${At(e.length,"plugin")}...`);let o=fl(e.filter(i=>pl(i)&&ml(i))),n=N.querySelector(`.${m("grid")}`),r=eo.trim()?"No plugins match your search.":cl[Be]??"No plugins available.";n?.replaceChildren(...o.length?o.map(yl):[a("div",{class:m("empty"),text:r})])}function vl(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),N?.querySelector(`.${m("popup-backdrop")}`)?it():De())}var ni,rn;function Sl(){if(N)return;let e=a("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=eo,e.addEventListener("input",()=>{eo=e.value,fe()}),N=a("div",{class:`bloom-root ${m("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&De()}},a("div",{class:m("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},a("div",{class:m("header")},a("div",{class:m("logo")},D("bloom")),a("h2",{class:m("title"),text:"Bloom++"}),a("span",{class:m("hint"),attrs:{"aria-label":Jr,tabindex:"0",[Ie]:Jr}},D("info")),a("span",{class:m("version"),text:"v2.0.18"}),q("close","Close",De)),a("div",{class:m("tabs"),attrs:{role:"tablist"}}),a("div",{class:m("toolbar")},a("label",{class:m("search")},D("search"),e),tn(on,ll,t=>{on=t,fe()})),a("div",{class:m("grid")}))),N.addEventListener("keydown",t=>t.stopPropagation()),rn=new AbortController,document.addEventListener("keydown",vl,{capture:!0,signal:rn.signal}),document.body.append(N),oi(),fe(),ni=ur(fe),e.focus(),rl.debug("Opened")}function De(){it(),rn?.abort(),ni?.(),N?.remove(),N=null}var to=()=>N?De():Sl();var ri=`/*
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
`;var at=E("bloom-entry-"),Ne=new Map,ii=!1,ai=[];function wl(e){let t=a("button",{class:at("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:o=>{o.preventDefault(),o.stopPropagation(),to()}}},D("bloom"),e!=="rail"&&a("span",{class:at("label"),text:"Bloom++"}));return a("div",{class:`bloom-root ${at("wrap")} ${at(e)}`,attrs:{"data-bloom":"entry"}},t)}function El(e){let t=a("div",{class:`bloom-root ${at("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),to()}}},D("bloom"),a("span",{text:"Bloom++"})),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function Tl(){let e=Fr();for(let[o,n]of Ne)o.isConnected&&e.some(r=>r.anchor===o)||(n.remove(),Ne.delete(o));for(let o of e){let n=Ne.get(o.anchor);if(n?.isConnected||!Pe(o.anchor))continue;let r=n??wl(o.kind);Ne.set(o.anchor,r),o.insert(r)}let t=Zt();t&&!t.querySelector('[data-bloom="menu-entry"]')&&El(t)}var si=f({name:"Settings",description:"Bloom++ settings panel and its sidebar entry.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,hidden:!0,startAt:"HostReady",styles:ri,start(){ai=[M(Tl),qr()],!ii&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",to),ii=!0)},stop(){for(let e of ai)e();for(let e of Ne.values())e.remove();Ne.clear(),De()}});var Cl=["data-turn","data-message-author-role"],Ml=/:(user|assistant)$/,an=`${d.messageUnit}, ${d.oldMessage}`,sn=e=>e==="user"||e==="assistant";function ln(){let e=document.querySelector(d.timelineScroll);if(e)return e;let t=document.querySelector(d.turn);for(let o=t?.parentElement;o;o=o.parentElement){let{overflowY:n}=getComputedStyle(o);if((n==="auto"||n==="scroll")&&o.scrollHeight>o.clientHeight)return o}return document.scrollingElement}var oo=e=>e.getAttribute("data-chatgpt-search-unit-key")?.match(Ml)?.[1]??null,di=e=>[...e.querySelectorAll(d.searchUnit)].filter(t=>oo(t)&&!t.parentElement?.closest(d.searchUnit)),li=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function st(e){let t=li(e);return t.length?t:[...new Set([...e.querySelectorAll(an)].flatMap(li))]}function cn(e=document){let t=di(e);return t.length?t:[...e.querySelectorAll(an)].filter(o=>!o.parentElement?.closest(an))}function Al(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function Ll(e){for(let t of Cl){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(sn(o))return o}return e.querySelector(d.markdown)||e.querySelector(d.generatedImage)?"assistant":null}var Pl=e=>!e.parentElement?.closest(d.turn);function no(){let e=W(v())?.chain??[],t=[...document.querySelectorAll(d.turn)].filter(Pl).flatMap(n=>{let r=di(n);return r.length?r.map(i=>({el:i,known:oo(i)})):[{el:n,known:null}]}),{generating:o}=_();return t.map(({el:n,known:r},i)=>{let s=r?st(n):cn(n).flatMap(st),c=r??Ll(n)??Al(s,e)??(i%2?"assistant":"user"),l=c==="assistant"&&(n.matches(d.turnBusy)||!!n.querySelector(d.turnBusy)||o&&i===t.length-1);return{el:n,role:c,messageIds:s,streaming:l}})}var kl="[data-bloom], .sr-only",Rl=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,ci=new WeakMap;function ro(e){let t=e.el.textContent?.length??0,o=ci.get(e.el);if(o?.length===t)return o.summary;let n=Ol(e);return ci.set(e.el,{length:t,summary:n}),n}function Ol(e){let t=e.el.querySelectorAll(d.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.querySelector(e.role==="assistant"?d.markdown:".whitespace-pre-wrap")??e.el,i=[...o.querySelectorAll(kl)].map(s=>R(s.textContent??"")).filter(Boolean).reduce((s,c)=>s.replace(c,`
`),o.innerText||o.textContent||"").split(`
`).map(R).filter(s=>s&&!Rl.test(s));return i.length?i.join(" "):e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function io(e){return e.text?R(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var ui=`/*
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
`;var P=E("bloom-nav-"),hi=80,Bl=1200,Dl=2,Nl=40,Hl=.3,_l=12,$l={user:"\u2753",assistant:"\u{1F916}"},lo=g({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the outline too.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),O=null,G=[],He=-1,ao="",mi=0,pi=[],lt=null,so;function yi(){let e=no().map(s=>({role:s.role,summary:ro(s),ids:s.messageIds,turn:s,streaming:s.streaming})),t=W(v())?.chain??[];if(!t.length)return e;let o=new Set(t.map(s=>s.id)),n=new Map(e.flatMap(s=>s.ids.map(c=>[c,s]))),r=new Set,i=[];for(let s of t){let c=n.get(s.id);c&&r.has(c)||(c&&r.add(c),i.push(c??{role:s.role,summary:io(s),ids:[s.id],turn:null,streaming:!1}))}return[...i,...e.filter(s=>!s.ids.some(c=>o.has(c)))]}function ql(e){let t=e.getBoundingClientRect(),o=t.top+t.height*Hl,n=-1;return G.forEach((r,i)=>{let s=r.turn?.el.getBoundingClientRect();s&&s.top<=o&&(n=i)}),n===-1?G.findIndex(r=>r.turn):n}function fi(e){lo.store.jumpEffect==="border"&&(e.classList.add(P("flash")),setTimeout(()=>e.classList.remove(P("flash")),Bl))}function dn(e){let t=G[e],o=ln();if(!t||!o)return;let n=t.turn?.el;if(n?.isConnected){let u=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:u<o.clientHeight*Dl?"smooth":"auto"}),fi(n);return}let r=G.map((u,p)=>u.turn?p:-1).filter(u=>u>=0),i=r.length&&e<r[0]?-1:1,s=++mi,c=0,l=()=>{if(s!==mi||c++>Nl)return;G=yi();let u=G.find(p=>p.ids.some(A=>t.ids.includes(A)))?.turn?.el;if(u){u.scrollIntoView({block:"start"}),fi(u);return}o.scrollBy({top:i*o.clientHeight*.9}),requestAnimationFrame(l)};l()}function Gl(e,t){return a("button",{class:P("row"),attrs:{type:"button","data-index":String(t)},on:{click:()=>dn(t)}},a("span",{text:$l[e.role]}),a("span",{class:"bloom-truncate",text:Ee(e.summary||"\u2026",hi)}))}function Ul(){let e=ln();if(G=yi(),!G.length||!e){O?.remove(),O=null,ao="";return}lt!==e&&(so?.abort(),so=new AbortController,e.addEventListener("scroll",Ae(gi),{passive:!0,signal:so.signal}),lt=e),O??=a("div",{class:`bloom-root ${P("root")}`,attrs:{"data-bloom":"navigator"}},a("div",{class:P("rail")}),a("div",{class:P("toc")},a("div",{class:P("toc-head")}),a("div",{class:P("toc-list")}))),O.isConnected||document.body.append(O);let t=e.getBoundingClientRect(),o=Math.min(t.bottom,Qe()?.getBoundingClientRect().top??t.bottom);O.style.right=`${document.documentElement.clientWidth-t.left-e.clientLeft-e.clientWidth+_l}px`,O.style.top=`${(t.top+o)/2}px`;let n=JSON.stringify([lo.store.showAssistant,G.map(r=>[r.role,r.summary,r.streaming])]);n!==ao&&(ao=n,zl()),gi()}function gi(){if(!O||!lt)return;He=ql(lt),O.querySelectorAll(`.${P("tick")}`).forEach((t,o)=>t.classList.toggle(P("tick-current"),o===He)),O.querySelectorAll(`.${P("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===He)));let e=O.querySelector(`.${P("toc-head")}`);e&&(e.textContent=`${He+1} / ${G.length}`)}function zl(){O?.querySelector(`.${P("rail")}`)?.replaceChildren(...G.map((t,o)=>a("button",{class:Pt(P("tick"),P(`tick-${t.role}`),t.streaming&&P("tick-streaming")),title:Ee(t.summary,hi),attrs:{type:"button","aria-label":`Jump to message ${o+1}`},on:{click:()=>dn(o)}})));let e=G.map((t,o)=>({entry:t,index:o})).filter(({entry:t})=>lo.store.showAssistant||t.role==="user");O?.querySelector(`.${P("toc-list")}`)?.replaceChildren(...e.map(({entry:t,index:o})=>Gl(t,o)))}var ie=Ae(Ul),Fl=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function bi(e){if(!O||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||Fl(document.activeElement)||document.querySelector("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:He-1,ArrowDown:He+1,Home:0,End:G.length-1}[e.key];o==null||o<0||o>=G.length||(e.preventDefault(),e.stopPropagation(),dn(o))}var vi=f({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:lo,styles:ui,start(){pi=[M(e=>H(e)&&ie()),ne(ie),B.on("conversation",ie),x.on("rise",ie),x.on("fall",ie)],addEventListener("keydown",bi,!0),addEventListener("resize",ie,{passive:!0})},stop(){for(let e of pi)e();so?.abort(),lt=null,removeEventListener("keydown",bi,!0),removeEventListener("resize",ie),O?.remove(),O=null,ao=""},onSettingsChange:ie});var Si=`/*
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
`;var Kl=E("bloom-cls"),Wl="bloom-cls",Vl=600*1e3,mn=Fn("tab"),$e=new Map,dt=new Map,_e=null,xi=[],Yl=e=>e==="streaming"||e==="error";function Xl(){let e=new Map,t=Date.now();for(let[o,n]of dt)t-n.at>Vl?dt.delete(o):e.set(o,n.status);for(let[o,n]of $e)e.set(o,n);return e}function Jl(e){return a("span",{class:`bloom-root ${Kl("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&D("alert"))}function ct(){let e=Xl(),t=new Set;for(let[o,n]of e)for(let r of nt(o)){if(!Pe(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let s=Jl(n);t.add(s),r.append(s)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function co(e,t){e&&(t?$e.set(e,t):$e.delete(e),_e?.postMessage({tab:mn,id:e,status:t}),ct())}function Zl({data:e}){!T(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===mn||(Yl(e.status)?dt.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):dt.delete(e.id),ct())}function un(){for(let e of $e.keys())_e?.postMessage({tab:mn,id:e,status:null})}var wi=f({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:Si,start(){_e=typeof BroadcastChannel=="function"?new BroadcastChannel(Wl):null,_e?.addEventListener("message",Zl),addEventListener("pagehide",un),xi=[x.on("rise",({conversationId:e})=>co(e,"streaming")),x.on("fall",({conversationId:e,outcome:t})=>co(e,t==="error"?"error":null)),x.on("context",({prevId:e,id:t,migrated:o})=>{o&&_().generating?co(t,"streaming"):!o&&$e.get(e??"")==="streaming"&&co(e,null)}),M(e=>H(e)&&ct())],v()&&ct()},stop(){for(let e of xi)e();un(),_e?.close(),_e=null,removeEventListener("pagehide",un),$e.clear(),dt.clear(),ct()}});var Ti=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],po={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Ql={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},ec="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",pn=32,fo=64,fn="#FCFCFC",gn="#111111",tc=14,go=51.5,oc=12.5,nc=9.75,Ei=52,rc=10.5,ic=7.75,ac={rotate:e=>e.arc(go,go,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function uo(e){let t=document.createElement("canvas");t.width=t.height=pn;let o=t.getContext("2d");return o?(o.scale(pn/fo,pn/fo),e(o),t.toDataURL("image/png")):""}function mo(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D(ec);o&&(e.strokeStyle=gn,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function bo(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function sc(e,t){bo(e,go,oc,gn),bo(e,go,nc,po[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),ac[t](e),e.stroke()}function lc(e,t){e.beginPath(),e.roundRect(0,0,fo,fo,tc),e.fillStyle=t,e.fill()}var cc=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function Ci(e,t){switch(e){case"original":return cc(Ql[t]);case"hole":return uo(o=>mo(o,po[t],!0));case"bg":return uo(o=>{lc(o,po[t]),mo(o,fn,!1)});case"dot":return uo(o=>{mo(o,fn,!0),bo(o,Ei,rc,gn),bo(o,Ei,ic,po[t])});case"badge":return uo(o=>{mo(o,fn,!0),sc(o,t)})}}var mt="bloom-chat-state-favicon",pt="data-bloom-rel",yn="data-bloom-media",Mi="bloom-parked-icon",dc="/favicon.ico",Li=g({style:{type:"select",description:"How the tab icon shows the chat state.",options:Ti,default:"bg"}}),ae=null,Pi="",ho=null,ki="",Ai=new Map,vn,bn=[],Ri=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${pt}]`)];function Sn(){for(let e of Ri())e.id!==mt&&(e.hasAttribute(pt)||(ki||=e.href,e.setAttribute(pt,e.rel),e.setAttribute(yn,e.getAttribute("media")??"")),e.rel!==Mi&&(e.rel=Mi),e.media!=="not all"&&(e.media="not all"))}function uc(){for(let e of Ri()){let t=e.getAttribute(pt);if(t==null)continue;e.rel=t;let o=e.getAttribute(yn);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(pt),e.removeAttribute(yn)}}function Oi(){let e=document.getElementById(mt);return e||(e=document.createElement("link"),e.id=mt,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function mc(e){if(e==="wait")return ki||dc;let t=Li.store.style,o=`${t}:${e}`,n=Ai.get(o);return n||Ai.set(o,n=Ci(t,e)),n}function hn(e){if(e)return"rotate";let t=z();return ae&&t&&t!==Pi&&(ae=null),ae==="error"?"error":ae==="done"?"done":t?"ready":"wait"}function ut(e,t=!1){if(e===ho&&!t)return;ho=e;let o=Oi(),n=mc(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function pc(){vn=new MutationObserver(()=>{Sn(),document.head.lastElementChild?.id!==mt&&Oi()}),vn.observe(document.head,{childList:!0})}var Ii=f({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"HostReady",settings:Li,start(){Sn(),ut(hn(_().generating),!0),pc(),bn=[x.on("rise",()=>{ae=null,ut("rotate")}),x.on("fall",({outcome:e})=>{ae=e==="done"||e==="error"?e:null,Pi=z(),ut(hn(!1))}),x.on("context",({migrated:e})=>{e||(ae=null)}),x.on("tick",({generating:e})=>{Sn(),ut(hn(e))})]},stop(){for(let e of bn)e();bn=[],vn?.disconnect(),document.getElementById(mt)?.remove(),uc(),ho=null,ae=null},onSettingsChange(){ut(ho??"wait",!0)}});var fc={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]'],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['div:has(> div > aside button[aria-label="Dismiss migration notice"])','aside:has(button[aria-label="Dismiss migration notice"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])']},Bi=g({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice above the composer.",default:!0}}),Di=f({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads and notices.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:Bi,styles:()=>Te(Object.entries(fc).flatMap(([e,t])=>Bi.store[e]?t:[]))});var xn=`form:has(${d.composerInput}), ${d.oldComposerForm}`,gc=`:is(${xn}) :is([class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"])`,bc='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',hc='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',yc="var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, #fff)))",Ni=g({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function vc(){let{opacity:e,blur:t}=Ni.store;return e>=100?"":`:is(${bc}), :is(${xn}){background-color:transparent!important;background-image:none!important;box-shadow:none!important}:is(${hc}){display:none!important}${gc}{background-color:color-mix(in srgb, ${yc} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important}:is(${xn}) :is(${d.composerInput}){background-color:transparent!important}`}var Hi=f({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:Ni,styles:vc});var wn=0,yo;function Sc(e){if(!H(e))return;for(let o of Wr())Qo(o,"profile");let t=Zt();t&&Qo(t,"menu")}function qe(){wn++;let e=!0;return et().then(()=>{e&&wn&&!yo&&(yo=M(Sc))}),()=>{e&&(e=!1,!--wn&&(yo?.(),yo=void 0))}}var ee=E("bloom-csi-"),xc=256,wc=160,vo=1,_i=4,Ec=.1,Tc=.0015,Cc=250;function Mc(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function Ac(e){return new Promise((t,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function Lc(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:we(t.x,n,1-n),y:we(t.y,r,1-r)}}function $i(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function Pc(e,t){let o=a("canvas");return o.width=o.height=xc,$i(o,e,t),o.toDataURL("image/png")}function qi(e){let t=null,o={x:C.store.cropX,y:C.store.cropY,zoom:C.store.cropZoom},n,r=a("canvas",{class:ee("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=wc*devicePixelRatio;let i=a("div",{class:`bloom-muted ${ee("status")}`}),s=a("div",{class:ee("zoom")}),c=a("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(h,I=!0){t&&(o=Lc(t,h),$i(r,t,o),I&&(clearTimeout(n),n=setTimeout(()=>{t&&(C.store.cropX=o.x,C.store.cropY=o.y,C.store.cropZoom=o.zoom,C.store.avatarUrl=Pc(t,o))},Cc)))}function u(){s.replaceChildren(Qt(o.zoom,vo,_i,Ec,"\xD7",h=>l({...o,zoom:h})))}async function p(h,I){i.textContent="";try{t=await Ac(h),I&&(C.store.avatarSource=h,o={x:.5,y:.5,zoom:vo}),e.classList.add(ee("has-image")),u(),l(o,I)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let A=h=>{h?.type.startsWith("image/")&&Mc(h).then(I=>p(I,!0))};c.addEventListener("change",()=>A(c.files?.[0])),r.addEventListener("wheel",h=>{t&&(h.preventDefault(),l({...o,zoom:we(o.zoom*(1-h.deltaY*Tc),vo,_i)}),u())},{passive:!1}),r.addEventListener("pointerdown",h=>{if(!t)return;r.setPointerCapture(h.pointerId);let I={...o},ze=r.getBoundingClientRect(),Ct=Mt=>{if(!t)return;let j=Math.max(ze.width/t.naturalWidth,ze.height/t.naturalHeight)*o.zoom;l({...o,x:I.x-(Mt.clientX-h.clientX)/(t.naturalWidth*j),y:I.y-(Mt.clientY-h.clientY)/(t.naturalHeight*j)})};r.addEventListener("pointermove",Ct),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",Ct),{once:!0})});let Y=a("div",{class:ee("cropper"),attrs:{tabindex:"0"},on:{paste:h=>A([...h.clipboardData?.files??[]].find(I=>I.type.startsWith("image/"))),dragover:h=>h.preventDefault(),drop:h=>{h.preventDefault(),A(h.dataTransfer?.files[0])}}},a("div",{class:ee("stage")},r),a("div",{class:ee("controls")},rt("",h=>h.trim()&&void p(h.trim(),!0),"https://\u2026 or data:image/\u2026","url"),a("div",{class:ee("buttons")},$("Choose file",()=>c.click()),$("Reset crop",()=>{l({x:.5,y:.5,zoom:vo}),u()}),$("Clear",()=>{t=null,e.classList.remove(ee("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),s.replaceChildren(),C.store.avatarUrl="",C.store.avatarSource=""},"danger")),s,i,c));return e.append(Y),C.store.avatarSource&&p(C.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var Gi=`/*
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
`;var ft="data-bloom-csi-avatar",En="data-bloom-csi-sized",ji="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",Rc=32,C=g({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>qi(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),Ui=[];function Ki(e){e.removeAttribute(ft),e.removeAttribute(En)}function zi(e){return(C.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function Fi(e=[]){if(!H(e))return;let t=C.store.displayName.trim()||null,o=!!C.store.avatarUrl,n=new Set(t?zi("name"):[]);for(let i of document.querySelectorAll(ji))n.has(i)||ue(i,null);for(let i of n)ue(i,t);let r=new Set(o?zi("avatar"):[]);for(let i of document.querySelectorAll(`[${ft}]`))r.has(i)||Ki(i);for(let i of r)i.hasAttribute(ft)||i.setAttribute(ft,""),i.toggleAttribute(En,!i.closest('[role="menu"]'))}function Oc(){let e=C.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${C.store.avatarSize}px}:is(${d.rail}, ${d.oldRail}) [${En}]{--bloom-csi-size:${Rc}px}`:""}var Wi=f({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:C,styles:()=>`${Oc()}
${Gi}`,start(){Ui=[qe(),M(Fi)]},stop(){for(let e of Ui)e();for(let e of document.querySelectorAll(`[${ft}]`))Ki(e);for(let e of document.querySelectorAll(ji))ue(e,null)},onSettingsChange(){Fi()}});var Ge=E("bloom-greeting-"),Vi=30,Yi=100;function Xi(e){let t=-1,o=a("textarea",{class:`bloom-input ${Ge("input")}`,attrs:{maxlength:String(Yi),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=$("Add",i),r=a("div",{class:Ge("list")});function i(){let l=o.value.trim().slice(0,Yi);if(!l)return;let u=[...w.store.greetings];t>=0?u[t]=l:u.length<Vi&&u.push(l),w.store.greetings=u,t=-1,o.value="",s()}function s(){let{greetings:l}=w.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&l.length>=Vi,r.replaceChildren(...l.length?l.map((u,p)=>a("div",{class:Ge("row",p===t?"row-editing":"row-idle")},a("div",{class:Ge("text"),text:u}),q("edit","Edit",()=>{t=p,o.value=u,o.focus(),s()}),q("trash","Delete",()=>{w.store.greetings=l.filter((A,Y)=>Y!==p),t===p&&(t=-1),s()}))):[a("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),e.append(a("div",{class:Ge("editor")},r,a("div",{class:Ge("form")},o,n))),s();let c=Ce((l,u)=>l==="GreetingCustomizer"&&u==="greetings"&&s());return()=>{c(),e.replaceChildren()}}var Ji=`/*
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
`;var xo="data-bloom-greeting",Bc=1e3,Dc=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],w=g({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>Xi(e)},greetings:{type:"custom",default:Dc},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),So,Zi=[],Tn,Qi=()=>w.store.greetings.filter(e=>typeof e=="string"&&e.trim());function bt(){let e=Qi();if(e.length)if(w.store.order==="random"&&e.length>1){let t=w.store.lastRandom;for(;t===w.store.lastRandom;)t=Math.floor(Math.random()*e.length);w.store.lastRandom=t,w.store.index=t}else w.store.index=(w.store.index+1)%e.length}function Nc(){return me()?Me(d.homeHeading):null}function ea(){for(let e of document.querySelectorAll(`[${xo}]`))e.removeAttribute(xo),ue(e,null)}function gt(){let e=Qi(),t=Nc();if(!t||!e.length){ea();return}(w.store.index<0||w.store.index>=e.length)&&bt(),t.setAttribute(xo,""),ue(t,e[Math.max(0,w.store.index)%e.length])}function Cn(){clearInterval(So),So=void 0,w.store.mode==="interval"&&me()&&(So=setInterval(()=>{bt(),gt()},w.store.intervalSec*Bc))}function Hc(e){w.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${xo}]`)||getSelection()?.toString()||(bt(),gt())}function _c(){me()&&w.store.mode==="refresh"&&bt(),Cn(),gt()}var ta=f({name:"GreetingCustomizer",description:"Replace the \u201CWhat can I help with?\u201D heading on the home page with your own lines.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:w,styles:Ji,start(){Tn=new AbortController,document.addEventListener("click",Hc,{signal:Tn.signal}),me()&&w.store.mode==="refresh"&&bt(),Cn(),Zi=[M(e=>H(e)&&gt()),ne(_c)]},stop(){Tn?.abort();for(let e of Zi)e();clearInterval(So),ea()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&Cn(),gt()}});var ht=E("bloom-history-"),Mn=10,$c=3e3;function oa(e){let t="",o=0,n=new Set,r=a("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),i=a("div",{class:ht("list")}),s=a("div",{class:ht("pager")}),c,l=$("Clear all",()=>{if(!c){l.textContent="Click again to clear",c=setTimeout(()=>{c=void 0,l.textContent="Clear all"},$c);return}clearTimeout(c),c=void 0,l.textContent="Clear all",yt([])},"danger");function u(){let A=[...ge.store.entries].toReversed(),Y=t.trim().toLowerCase(),h=Y?A.filter(j=>j.toLowerCase().includes(Y)):A,I=Math.max(1,Math.ceil(h.length/Mn));o=Math.min(o,I-1);let ze=h.slice(o*Mn,(o+1)*Mn).map(j=>a("div",{class:ht("row")},a("button",{class:ht("text",n.has(j)?"text-open":"text-closed"),text:j,title:n.has(j)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{n.delete(j)||n.add(j),u()}}}),q("copy","Copy",()=>void jn(j)),q("trash","Delete",()=>yt(ge.store.entries.filter(Va=>Va!==j)))));i.replaceChildren(...ze.length?ze:[a("div",{class:"bloom-muted",text:Y?"No matching prompts.":"No saved prompts yet."})]),s.replaceChildren(a("span",{class:"bloom-muted",text:`${h.length} ${Y?"matching":"saved"} \xB7 page ${o+1} of ${I}`}),$("Previous",()=>{o--,u()}),$("Next",()=>{o++,u()}),l);let[Ct,Mt]=s.querySelectorAll("button");Ct.disabled=o===0,Mt.disabled=o>=I-1,l.disabled=!A.length}r.addEventListener("input",()=>{t=r.value,o=0,u()}),e.append(a("div",{class:ht("manager")},r,i,s)),u();let p=Ce((A,Y)=>A==="InputHistory"&&Y==="entries"&&u());return()=>{p(),clearTimeout(c),e.replaceChildren()}}var na=`/*
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
`;var Gc=E("bloom-history-"),Uc=2e3,ge=g({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>oa(e)},entries:{type:"custom",default:[]}}),F=null,An={text:"",at:0},be=null,Ln,wo=()=>ge.store.entries.filter(e=>typeof e=="string");function yt(e){ge.store.entries=e.slice(-ge.store.maxEntries)}function Pn(e){let t=e.trim();if(!t)return;let o=Date.now();t===An.text&&o-An.at<Uc||(An={text:t,at:o},yt([...wo().filter(n=>n!==t),t]))}function zc(e,t){let o=Le();if(!o)return;be??=a("div",{class:`bloom-root ${Gc("hud")}`,attrs:{"data-bloom":"history-hud","aria-live":"polite"}}),be.textContent=`${e+1} / ${t}`;let n=(o.closest("form")??o).getBoundingClientRect();be.style.left=`${n.left+n.width/2}px`,be.style.top=`${n.top}px`,be.isConnected||document.body.append(be)}function vt(){F=null,be?.remove()}function Fc(e){let t=wo();if(!F)return;let o=t[e];F.index=e,F.shown=o,Q(o),zc(t.length-1-e,t.length)}function jc(e){let t=wo();if(!t.length)return!1;if(!F){if(e===1)return!1;F={index:t.length,draft:z(),shown:""}}let o=F.index+e;return o<0?!0:o>=t.length?(Q(F.draft),vt(),!0):(Fc(o),!0)}function Kc(e){if(e.isComposing||!Ze(e.target))return;let t=e.target;if(e.key==="Enter"&&!e.shiftKey){Pn(z(t)),vt();return}if(e.key==="Escape"&&F){Q(F.draft),vt(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey)return;let o=hr(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!F||jc(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function Wc(e){F&&Ze(e.target)&&z(e.target)!==F.shown.trim()&&vt()}function Vc(e){e.target instanceof Element&&e.target.closest(d.sendButton)&&Pn(z())}var ra=f({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:ge,styles:na,start(){Ln=new AbortController;let{signal:e}=Ln;document.addEventListener("keydown",Kc,{capture:!0,signal:e}),document.addEventListener("input",Wc,{capture:!0,signal:e}),document.addEventListener("click",Vc,{capture:!0,signal:e}),document.addEventListener("submit",()=>Pn(z()),{capture:!0,signal:e})},stop(){Ln?.abort(),vt()},onSettingsChange(e){e==="maxEntries"&&yt(wo())}});var ia=`/*
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
`;var Xc=1500,Jc=5e3,Zc=2e3,Ue=g({showDate:{type:"boolean",description:"Show the date for messages not sent today.",default:!0},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),To=new Map,la=0,Co,aa=[];function ca(e,t){To.get(e)!==t&&(To.set(e,t),clearTimeout(Co),Co=setTimeout(da,Zc))}function da(){let e={...Ue.store.stamps,...Object.fromEntries(To)};Ue.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,Xc))}function Qc(e){let t=W(v())?.times;for(let o=e.length-1;o>=0;o--){let n=To.get(e[o])??t?.get(e[o])??Ue.store.stamps[e[o]];if(n)return n}return null}var ed=()=>_().generating||Date.now()-la<Jc;function td(e){let t=new Date(e),o=new Date,n={hour:"2-digit",minute:"2-digit"};if(!Ue.store.showDate||t.toDateString()===o.toDateString())return t.toLocaleTimeString(void 0,n);let r=t.getFullYear()===o.getFullYear()?{}:{year:"numeric"};return t.toLocaleString(void 0,{...r,month:"short",day:"numeric",...n})}function sa(e){let t=oo(e)??e.getAttribute("data-message-author-role")??e.closest(d.turn)?.getAttribute("data-turn")??e.querySelector(d.authorRole)?.getAttribute("data-message-author-role");if(sn(t))return t;let o=st(e).at(-1);return W(v())?.chain.find(n=>n.id===o)?.role??null}function od(e){let t=st(e);if(!t.length||!Pe(e)||e.querySelector("time:not([data-bloom])"))return;let o=Qc(t);!o&&ed()&&(o=Date.now(),ca(t.at(-1),o));let n=e.querySelector(':scope > time[data-bloom="timestamp"]');if(!o||Ue.store.hideOwnMessages&&sa(e)==="user"){n?.remove();return}let r=td(o);if(n?.textContent===r)return;let i=a("time",{class:`bloom-timestamp bloom-timestamp-${sa(e)??"assistant"}`,text:r,title:new Date(o).toLocaleString(),attrs:{"data-bloom":"timestamp",datetime:new Date(o).toISOString()}});n?n.replaceWith(i):e.prepend(i)}var Eo=Ae(()=>{for(let e of cn())od(e)}),ua=f({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:Ue,styles:ia,start(){aa=[M(e=>H(e)&&Eo()),B.on("conversation",Eo),B.on("message-time",({messageId:e,time:t})=>{ca(e,t),Eo()}),x.on("fall",()=>{la=Date.now()})]},stop(){for(let e of aa)e();Co&&(clearTimeout(Co),da());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();Eo()}}});var nd=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])'],rd=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],ma=g({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),pa=f({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:ma,styles:()=>Te([...nd,...ma.store.hideDictationSettings?rd:[]])});var he="data-bloom-share",id=/^\/g\/g-p-/,ad=/^(?:share|分享)$/i,sd=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],ld=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${he}="project"]`],kn=g({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),Mo,Rn=!1;function cd(e){if(!H(e))return;let t=id.test(location.pathname)&&!v();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${he}]`))!t||!ad.test(R(o.textContent??""))?o.removeAttribute(he):o.hasAttribute(he)||o.setAttribute(he,"project")}var fa=f({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:kn,styles:()=>Te([...kn.store.hideShareChat?sd:[],...kn.store.hideShareProject?ld:[]]),start(){Rn=!0,et().then(()=>{Rn&&!Mo&&(Mo=M(cd))})},stop(){Rn=!1,Mo?.(),Mo=void 0;for(let e of document.querySelectorAll(`[${he}]`))e.removeAttribute(he)}});var ga='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',dd='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',ud="[data-bloom-profile-plan]",ba="visibility:hidden!important;user-select:none!important",ya=g({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function md(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=ya.store,r=[];return e&&r.push(n?`:is(${ga}){display:none!important}`:`:is(${ga}){${ba}}`),t&&r.push(`:is(${dd}){${ba}}`),e&&o&&r.push(`${ud}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var ha,va=f({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:ya,styles:md,start(){ha=qe()},stop(){ha?.()}});var Sa=`/*
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
`;var k=E("bloom-queue-"),fd=6,gd=8,U=null,St="",Ao=!1,ye=!1;function On(e,t,o){let n=q(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute("title"),n.addEventListener("mouseenter",()=>xa(t)),n.addEventListener("mouseleave",()=>xa("")),n}function xa(e){let t=U?.querySelector(`.${k("tip")}`);t&&(t.textContent=e)}function bd(e,t,o,n){ye=!0;let r=a("textarea",{class:`bloom-input ${k("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=s=>{ye=!1,St="",s&&n.edit(t,r.value)};r.addEventListener("keydown",s=>{s.stopPropagation(),!s.isComposing&&(s.key==="Enter"&&!s.shiftKey?(s.preventDefault(),i(!0)):s.key==="Escape"&&(s.preventDefault(),i(!1)))}),r.addEventListener("blur",()=>ye&&i(!0),{once:!0}),e.querySelector(`.${k("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function hd(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,s=l=>{!i&&Math.abs(l.clientY-n.clientY)<fd||(i||(i=ye=!0,e.classList.add(k("dragging"))),e.style.transform=`translateY(${l.clientY-n.clientY}px)`)},c=l=>{if(removeEventListener("pointermove",s),!i)return;ye=!1,St="";let p=[...r.children].filter(A=>A!==e).filter(A=>A.getBoundingClientRect().top+A.getBoundingClientRect().height/2<l.clientY).length;o.move(t,p)};addEventListener("pointermove",s),addEventListener("pointerup",c,{once:!0})})}function yd(e,t,o){let n=a("li",{class:k("row")},a("div",{class:k("text"),text:e}),a("div",{class:k("actions")},On("trash","Remove from queue",()=>o.remove(t)),On("edit","Edit",()=>bd(n,t,e,o)),On("send","Send now",()=>o.sendNow(t))));return hd(n,t,o),n}function vd(e){if(!U)return;let t=e.getBoundingClientRect();U.style.left=`${t.left}px`,U.style.width=`${t.width}px`,U.style.bottom=`${innerHeight-t.top+gd}px`}function In(){U?.remove(),U=null,St="",ye=!1}function Lo(e,t){let o=Qe();if(!e.length||!Je(o)){In();return}U||(U=a("div",{class:`bloom-root ${k("tray")}`,attrs:{"data-bloom":"queue"}},a("div",{class:k("header")},a("button",{class:k("toggle"),attrs:{type:"button"},on:{click:()=>{Ao=!Ao,U?.classList.toggle(k("collapsed"),Ao)}}},a("span",{class:k("count")}),D("chevron")),a("span",{class:k("tip")})),a("ol",{class:k("list")})),U.classList.toggle(k("collapsed"),Ao),document.body.append(U)),vd(o);let n=JSON.stringify(e);if(ye||n===St)return;St=n;let r=U.querySelector(`.${k("count")}`);r&&(r.textContent=At(e.length,"Queued message")),U.querySelector(`.${k("list")}`)?.replaceChildren(...e.map((i,s)=>yd(i,s,t)))}var Sd=8,xd=150,wd=20,Ta=g({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1}}),ve=new Map,Po=!1,Se=null,Bn,wa=[],Dn="draft",Nn=()=>v()??Dn,V=()=>ve.get(Nn())??[];function xe(e){e.length?ve.set(Nn(),e):ve.delete(Nn()),Lo(V(),Hn)}function ko(e,t=0){if(_().generating||z()){t<wd&&setTimeout(()=>ko(e,t+1),xd);return}Q(e),Uo(()=>{vr()||Q("")})}function Ea(){if(Se!=null){let o=Se;Se=null,ko(o);return}if(!Po||_().generating||z())return;let[e,...t]=V();e!=null&&(Po=!1,xe(t),ko(e))}function Ca(e){let t=V(),o=t[e];if(o!=null){if(xe(t.filter((n,r)=>r!==e)),!_().generating){ko(o);return}Se=o,qt()?.click()}}var Hn={remove:e=>xe(V().filter((t,o)=>o!==e)),edit:(e,t)=>xe(t.trim()?V().map((o,n)=>n===e?t:o):V().filter((o,n)=>n!==e)),sendNow:Ca,move(e,t){let o=[...V()],[n]=o.splice(e,1);o.splice(t,0,n),xe(o)}};function Ed(e){let t=V();return Ta.store.replacePending&&t.length?(xe([...t.slice(0,-1),e]),!0):t.length>=Sd?!1:(xe([...t,e]),!0)}function Td(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!Ze(e.target)||!_().generating)return;let t=z(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;Q(""),Se=t,qt()?.click();return}if(!t){V().length&&Ca(0);return}Ed(t)&&Q("")}var Ma=f({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:Ta,styles:Sa,start(){Bn=new AbortController,document.addEventListener("keydown",Td,{capture:!0,signal:Bn.signal}),wa=[x.on("fall",({outcome:e})=>{Po=e==="done",e==="left"&&(Se=null),Ea()}),x.on("context",({prevId:e,id:t,migrated:o})=>{let n=ve.get(Dn);ve.delete(Dn),o&&!e&&t&&n&&ve.set(t,n),o||(Po=!1),Lo(V(),Hn)}),x.on("tick",()=>{Ea(),Lo(V(),Hn)})]},stop(){Bn?.abort();for(let e of wa)e();In(),ve.clear(),Se=null}});var Cd=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function Md(){let e=R(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!Cd.has(e.toLowerCase())?e:null}function xt(e){return e?W(e)?.title??Yr(e)??(e===v()?Md():null):null}var Aa=`/*
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
`;var te=E("bloom-recent-"),oe="home",Ld=50,La=140,Pd=new Set(["Backquote"]),kd=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),y=g({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),se=null,J=[],Z=0,_n,Pa=[],Io=()=>Rr()?null:v()??(me()?oe:null);function ka(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function Oa(e){let t=xt(e);t&&y.store.titles[e]!==t&&(y.store.titles={...y.store.titles,[e]:t});let o=Xr(location.href);o&&e===v()&&y.store.projects[e]!==o&&(y.store.projects={...y.store.projects,[e]:o})}function Ra(e){if(!e)return;let t=[e,...y.store.visits.filter(n=>n!==e)].slice(0,Ld),o=new Set(t);y.store.visits=t,Object.keys(y.store.previews).some(n=>!o.has(n))&&(y.store.previews=ka(y.store.previews,o)),Object.keys(y.store.titles).some(n=>!o.has(n))&&(y.store.titles=ka(y.store.titles,o)),e!==oe&&Oa(e)}function Ro(e){if(!e||!y.store.visits.includes(e))return;let t={},o=W(e)?.chain??[];for(let r of o)t[r.role]=Ee(io(r),La);if(e===v())for(let r of no()){let i=ro(r);i&&(t[r.role]=Ee(i,La))}let n=y.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(y.store.previews={...y.store.previews,[e]:t})}function Rd(){let e=Number(y.store.maxRecent);return y.store.visits.filter(t=>t!==oe||y.store.includeHome).slice(0,e)}function $n(e){if(wt(),e===Io())return;let t=e===oe?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"]'):nt(e)[0];t?t.click():location.assign(e===oe?"/":`/c/${e}`)}function Od(e,t){let o=e===oe?"New chat":y.store.titles[e]??xt(e)??"Untitled chat",n=e===oe?null:y.store.projects[e],r=e===oe?null:y.store.previews[e];return a("button",{class:te("item"),attrs:{type:"button",role:"option","aria-selected":String(t===Z)},on:{click:()=>$n(e),mousemove:()=>t!==Z&&Oo(t)}},a("div",{class:te("head")},a("span",{class:`${te("title")} bloom-truncate`,text:o}),n&&a("span",{class:te("project"),text:n})),r?.user&&a("div",{class:`${te("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&a("div",{class:`${te("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function Oo(e){Z=(e+J.length)%J.length,se?.querySelectorAll(`.${te("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===Z)))}function Id(){Ro(v());let e=Io();J=Rd(),e&&(J=[e,...J.filter(t=>t!==e)].slice(0,Number(y.store.maxRecent))),J.length&&(Z=J.length>1?1:0,se=a("div",{class:`bloom-root ${te("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:t=>t.target===t.currentTarget&&wt()}},a("div",{class:te("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...J.map(Od))),document.body.append(se))}function wt(){se?.remove(),se=null}var Bd=e=>Pd.has(e.code)||kd.has(e.key);function Dd(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&Bd(e)){e.preventDefault(),e.stopPropagation(),se?Oo(Z+(e.shiftKey?-1:1)):Id();return}if(!se)return;let o={Escape:wt,Enter:()=>$n(J[Z]),ArrowDown:()=>Oo(Z+1),ArrowUp:()=>Oo(Z-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function Nd(e){se&&e.key==="Control"&&$n(J[Z])}var Ia=f({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:y,styles:Aa,start(){_n=new AbortController;let{signal:e}=_n;addEventListener("keydown",Dd,{capture:!0,signal:e}),addEventListener("keyup",Nd,{capture:!0,signal:e}),addEventListener("blur",wt,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&Ro(v()),{signal:e}),Pa=[ne(({prevId:i})=>{Ro(i),Ra(Io())}),B.on("conversation",({id:i})=>{y.store.visits.includes(i)&&Oa(i),Ro(i)})];let{visits:t,titles:o,previews:n}=y.store,r=t.filter(i=>i!==oe&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(y.store.visits=t.filter(i=>!r.includes(i))),Ra(Io())},stop(){_n?.abort();for(let e of Pa)e();wt()}});var Hd=new S("ResponseNotification"),_d=[880,1318.5],$d=.14,Ba=.22,qd=.08,Da=1e-4,Gd=.02,Ud=200,zd=300,Et=g({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the built-in chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:e=>(e.append($("Preview",_a)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),Tt=null,Bo,Na,qn;function Ha(){Tt??=new AudioContext;let e=Tt.currentTime;_d.forEach((t,o)=>{let n=Tt,r=e+o*$d,i=n.createOscillator(),s=n.createGain();i.frequency.value=t,s.gain.setValueAtTime(Da,r),s.gain.exponentialRampToValueAtTime(qd,r+Gd),s.gain.exponentialRampToValueAtTime(Da,r+Ba),i.connect(s).connect(n.destination),i.start(r),i.stop(r+Ba)})}function Fd(e){return new Promise((t,o)=>GM_xmlhttpRequest({url:e,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=Ud&&n<zd?t(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}async function jd(e){Tt??=new AudioContext;let t=Tt;Bo?.url!==e&&(Bo={url:e,buffer:Fd(e).then(n=>t.decodeAudioData(n))});let o=t.createBufferSource();o.buffer=await Bo.buffer,o.connect(t.destination),o.start()}function _a(){let e=Et.store.soundUrl.trim();if(!e){Ha();return}jd(e).catch(t=>{Hd.warn("Custom sound failed, playing the chime",t),Bo=void 0,Ha()})}function Kd(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function Wd(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(qn=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:qn.signal}))}var $a=f({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:Et,start(){Wd(),Na=x.on("fall",({conversationId:e,outcome:t})=>{t==="done"&&(Et.store.onlyWhenHidden&&!document.hidden||(Et.store.sound&&_a(),Et.store.browserNotification&&Kd(xt(e))))})},stop(){Na?.(),qn?.abort()}});var Vd="filter:blur(6px)!important;transition:filter 0.2s ease",qa=`:is(${d.sidebars})`,Yd={conversations:{selectors:[`${qa} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0},projects:{selectors:[`${qa} a:is([href*="/project"], [href*="/g/g-p-"])`,".bloom-recent-project"],hover:!0},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}},Ua=g({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function Xd(){return Object.entries(Yd).filter(([e])=>Ua.store[e]).map(([,{selectors:e,hover:t}])=>{let o=e.join(",");return`:is(${o}){${Vd}}`+(t?`:is(${o}):hover, .bloom-recent-item:hover :is(${o}){filter:none!important}`:"")}).join(`
`)}var Ga,za=f({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:Ua,styles:Xd,start(){Ga=qe()},stop(){Ga?.()}});var Jd=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],Zd=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",Qd='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',Fa=g({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function eu(){let e=`${Fa.store.width}rem`;return`:is(${Zd}){${Jd.map(t=>`${t}:${e}!important`).join(";")}}:is(${Qd}){max-width:min(100%, ${e})!important}`}var ja=f({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:Fa,styles:eu});var tu=[si,vi,wi,Ii,Di,Hi,Wi,ta,ra,ua,pa,fa,va,Ma,Ia,$a,za,ja],Gn=tu;var ou=new S("Bloom"),Ka="2.0.18";async function Un(){Ar();for(let e of Gn)e.updatedAt=Hr[e.name];ar(Gn),await or(),Lt("base",mr),Nr(),Nt("Init"),zt().then(()=>{Yn(),Nt("DOMContentLoaded")}),await Pr(),Nt("HostReady"),ou.info(`Bloom++ ${Ka} ready`)}var Wa=new S("Boot");if(window===window.top){let e=K.Bloom;e&&Wa.warn("Replacing another Bloom++ instance",e.VERSION),Object.defineProperty(K,"Bloom",{value:zn,configurable:!0,writable:!0}),Un().catch(t=>Wa.error("Startup failed",t))}})();
