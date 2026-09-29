// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260929] v2.0.27
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

/* Bloom++ [20260929] v2.0.27. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var ls=Object.defineProperty;var cs=(e,t)=>{for(var o in t)ls(e,o,{get:t[o],enumerable:!0})};var q=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var Ee=(e,t,o)=>Math.min(o,Math.max(t,e)),C=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Zn=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,ne=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,R=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function Bt(e,t){return`${e} ${t}${e===1?"":"s"}`}async function Xn(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function ze(e){try{return JSON.parse(e)}catch{return}}var z=typeof unsafeWindow>"u"?window:unsafeWindow;var Vn={};cs(Vn,{VERSION:()=>is,init:()=>Jn,plugins:()=>pe});var ds=new q("Styles"),Je=new Map,_n=new Set,Ve=new Map,Uo=!0;function $n(){let e=document.adoptedStyleSheets.filter(t=>!_n.has(t));document.adoptedStyleSheets=[...e,...Je.values()]}function er(e){document.readyState==="loading"||e.parentNode===document.head||document.head.append(e)}function us(e,t){let o=Ve.get(e);o||(o=document.createElement("style"),o.id=`bloom-style-${e}`,Ve.set(e,o)),o.textContent!==t&&(o.textContent=t),er(o)}function It(e,t){if(Uo)try{let o=Je.get(e);o||(o=new z.CSSStyleSheet,Je.set(e,o),_n.add(o)),o.replaceSync(t),$n();return}catch(o){ds.warn("Constructed style sheets unavailable, using <style> after parsing",o),Uo=!1,Je.delete(e)}us(e,t)}function Yo(e){Je.delete(e)&&Uo&&$n(),Ve.get(e)?.remove(),Ve.delete(e)}function tr(){for(let e of Ve.values())er(e)}var E=e=>(...t)=>t.map(o=>e+o).join(" "),kt=(...e)=>e.filter(Boolean).join(" "),Ce=e=>e.length?`${e.join(",")}{display:none!important}`:"";function f(e){return e}var Rt=new q("Storage"),ms="bloompp",Dt="kv",or=null;function ps(){return or??=new Promise((e,t)=>{let o=indexedDB.open(ms,1);o.onupgradeneeded=()=>{o.result.objectStoreNames.contains(Dt)||o.result.createObjectStore(Dt)},o.onsuccess=()=>e(o.result),o.onerror=()=>t(o.error)}),or}function nr(e,t){return ps().then(o=>new Promise((n,r)=>{let i=t(o.transaction(Dt,e).objectStore(Dt));i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)}))}async function fs(e){if(typeof GM_getValue=="function")try{return await GM_getValue(e)}catch(t){Rt.warn("GM read failed",t);return}}async function gs(e){try{return await nr("readonly",t=>t.get(e))}catch(t){Rt.warn("IndexedDB read failed",t);return}}function hs(e){try{return localStorage.getItem(e)??void 0}catch{return}}async function rr(e){return Promise.all([fs(e),gs(e),hs(e)])}function ir(e,t){let o=JSON.stringify(t);if(typeof GM_setValue=="function")try{GM_setValue(e,t)}catch{GM_setValue(e,o)}try{localStorage.setItem(e,o)}catch(n){Rt.warn("localStorage write failed",n)}nr("readwrite",n=>n.put(o,e)).catch(n=>Rt.warn("IndexedDB write failed",n))}var bs=new q("Settings"),sr="BloomSettings",As=100,ys=["GM","IndexedDB","localStorage"],Ot={plugins:{}},Fo=new Set,Ze;function qs(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=ze(t);return!C(t)||!C(t.plugins)||!Object.keys(t.plugins).length?null:t}var Ko=e=>e==null||e===""||(Array.isArray(e)?!e.length:C(e)&&!Object.keys(e).length);function vs(e){return Ko(e)?0:Array.isArray(e)?12+Math.min(e.length,40):C(e)?12+Math.min(Object.keys(e).length,40):3}function Ss(e){let t=0;for(let o of Object.values(e.plugins))if(C(o))for(let[n,r]of Object.entries(o))n!=="enabled"&&(t+=vs(r));return t}var ar=e=>Object.values(e.plugins).filter(t=>C(t)&&t.enabled===!0).length;function xs(e){let t=e.map((i,s)=>i&&{candidate:i,index:s,score:Ss(i)}).filter(i=>i!=null).toSorted((i,s)=>s.score-i.score||(i.score?0:ar(s.candidate)-ar(i.candidate))||i.index-s.index);if(!t.length)return null;let[o,...n]=t,r=structuredClone(o.candidate);for(let{candidate:i}of n)for(let[s,c]of Object.entries(i.plugins)){if(!C(c))continue;let l=r.plugins[s]??={};for(let[d,m]of Object.entries(c))d==="enabled"?!("enabled"in l)&&m===!0&&(l.enabled=!0):Ko(l[d])&&!Ko(m)&&(l[d]=structuredClone(m));Object.keys(l).length||delete r.plugins[s]}return{bag:r,source:ys[o.index]}}async function lr(){let e=await rr(sr),t=xs(e.map(qs));t&&(Ot.plugins=t.bag.plugins,bs.info("Loaded settings from",t.source))}function cr(){Ze=void 0,ir(sr,Ot)}function ws(){Ze&&(clearTimeout(Ze),cr())}var ue=(e,t)=>Ot.plugins[e]?.[t];function me(e,t,o){let n=Ot.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,clearTimeout(Ze),Ze=setTimeout(cr,As);for(let r of Fo)r(e,t)}function Te(e){return Fo.add(e),()=>void Fo.delete(e)}function Qo(e){return e.type==="component"?void 0:e.default}function g(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>ue(t.pluginName,n)??(e[n]&&Qo(e[n])),set:(o,n,r)=>(me(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&ue(t.pluginName,o)!==void 0&&me(t.pluginName,o)}};return t}var dr=e=>{let t=()=>{let o=ue("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();me("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},Pt=dr("pinnedPlugins"),Nt=dr("starredPlugins");addEventListener("pagehide",ws);var Ht=new q("PluginManager"),pe=new Map,Xe=new Set,ur=new Set,Wo=new Set;function mr(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),pe.set(t.name,t)}var _e=e=>!!e.required||(ue(e.name,"enabled")??!!e.enabledByDefault);var jo=e=>`plugin-${e.name}`;function pr(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?It(jo(e),t):Yo(jo(e))}function fr(e){if(!Xe.has(e.name))try{pr(e),e.start?.(),Xe.add(e.name)}catch(t){Ht.error(`Failed to start ${e.name}`,t)}}function Es(e){if(Xe.delete(e.name)){Yo(jo(e));try{e.stop?.()}catch(t){Ht.error(`Failed to stop ${e.name}`,t)}}}var gr=e=>e.startAt??"HostReady";function Gt(e){ur.add(e);for(let t of pe.values())gr(t)===e&&_e(t)&&fr(t);Ht.info(`${e}: ${[...Xe].join(", ")}`)}function hr(e,t){me(e.name,"enabled",t),t?ur.has(gr(e))&&fr(e):Es(e);for(let o of Wo)o()}function br(e){return Wo.add(e),()=>void Wo.delete(e)}Te((e,t)=>{let o=pe.get(e);if(!(!o||t==="enabled"||!Xe.has(e)))try{pr(o),o.onSettingsChange?.(t)}catch(n){Ht.error(`Settings change failed for ${e}`,n)}});var Ar=`/*
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
`;var Ts=new q("Dom");function a(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var yr=document.createElement("template");function qr(e){return yr.innerHTML=e.trim(),yr.content.firstElementChild.cloneNode(!0)}var et=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),$=(e,t=document)=>[...t.querySelectorAll(e)].find(et)??null,Ms=16,Ls="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function vr(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([Ls],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function zo(e){document.hidden?setTimeout(e,Ms):requestAnimationFrame(e)}function Me(e){let t=!1;return()=>{t||(t=!0,zo(()=>{t=!1;try{e()}catch(o){Ts.error("Scheduled task failed",o)}}))}}var Ut=new Set,Yt=[],$e,Bs=Me(()=>{let e=Yt;Yt=[];for(let t of Ut)t(e)});function L(e){return Ut.add(e),$e||($e=new MutationObserver(t=>{Yt.push(...t),Bs()}),$e.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{Ut.delete(e),!Ut.size&&($e?.disconnect(),$e=void 0,Yt=[])}}var Is=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),U=e=>!e.length||e.some(t=>!Is(t.target));function fe(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size");return}e.getAttribute("data-bloom-text")!==t&&(e.hasAttribute("data-bloom-text")||e.style.setProperty("--bloom-text-size",getComputedStyle(e).fontSize),e.setAttribute("data-bloom-text",t))}var ks=new q("Events");function Ft(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){ks.error(`Listener for ${String(t)} failed`,r)}}}}var u={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]'};var Sr=/[​-‍﻿]/g,Le=()=>$(u.composerInput),tt=e=>e instanceof HTMLElement&&e.matches(u.composerInput),ot=(e=Le())=>e?.closest("form")??document.querySelector(u.oldComposerForm);function Y(e=Le()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(Sr,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(Sr,"").trim()}var Rs=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function re(e,t=Le()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return Rs?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function xr(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:s,value:c}=e;return{first:!c.slice(0,i).includes(`
`),last:!c.slice(s).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var wr=e=>{let t=ot();return(t&&$(e,t))??$(e)},Kt=()=>wr(u.stopButton),Ds=()=>{let e=wr(u.sendButton);return e&&!e.matches(u.stopButton)?e:null};function Er(){let e=Ds();if(e){e.disabled||e.click();return}Le()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var Cr=()=>et(Kt());var Lr=new q("Network"),Os=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,Ps=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,Wt=1e3,Ns=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),O=Ft(),Jo=new Map,Tr=new Map,Hs=1,J=e=>e?Jo.get(e)??null:null;function Qt(e){let t=Jo.get(e);return t||Jo.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var Br=e=>e==="user"||e==="assistant";function Ir(e){let t=e.author?.role;if(!e.id||!Br(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(l=>typeof l=="string").join(`
`).trim(),i=n.filter(l=>C(l)&&l.content_type==="image_asset_pointer").length,s=e.metadata?.attachments,c=Array.isArray(s)&&s.length>0;return!r&&!i&&!c?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*Wt:null,text:r,hasFiles:c,imageCount:i}}var kr=e=>e.filter((t,o)=>t.role==="user"||e[o+1]?.role!=="assistant");function Gs(e,t){let o=t.filter(C).map(c=>C(c.message)?c.message:c);for(let c of o)c.id&&c.create_time&&e.times.set(c.id,c.create_time*Wt);let n=o.map(Ir).filter(c=>c!=null),r=new Set(n.map(c=>c.id)),i=e.chain.filter(c=>!r.has(c.id)),s=(n.at(-1)?.createTime??0)<(i[0]?.createTime??0);return e.chain=kr(s?[...n,...i]:[...i,...n]),e}function Us(e,t){if(!C(t)||!(C(t.mapping)||Array.isArray(t.messages)))return null;let o=Qt(e);if(typeof t.title=="string"&&t.title&&(o.title=t.title),Array.isArray(t.messages))return Gs(o,t.messages);let n=t.mapping;for(let c of Object.values(n)){let l=c.message?.create_time;c.message?.id&&l&&o.times.set(c.message.id,l*Wt)}let r=[],i=new Set,s=typeof t.current_node=="string"?t.current_node:null;for(;s&&!i.has(s)&&n[s];){i.add(s);let c=n[s].message,l=c?Ir(c):null;l&&r.push(l),s=n[s].parent??null}return r.length&&(o.chain=kr(r.toReversed())),o}function Ys(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}function Fs(e){if(typeof e?.body!="string")return null;let t=ze(e.body);return C(t)&&typeof t.conversation_id=="string"?t.conversation_id:null}function Ks(e,t){if(!C(e))return;typeof e.type=="string"&&Ns.has(e.type)&&(t.handoff=!0);let o=C(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(Qt(e.conversation_id).title=e.title,O.emit("conversation",Qt(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&Br(n.author?.role)){let r=n.create_time*Wt;t.conversationId&&Qt(t.conversationId).times.set(n.id,r),O.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function Qs(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:s}=await o.read();if(i)break;r+=n.decode(s,{stream:!0});let c=r.split(`
`);r=c.pop()??"";for(let l of c){if(!l.startsWith("data:"))continue;let d=l.slice(5).trim();d&&d!=="[DONE]"&&Ks(ze(d),t)}}}async function Ws(e,t,o){let n={conversationId:t,error:!1,handoff:!1};Tr.set(e,t),O.emit("generate-start",{requestId:e,conversationId:t});try{let r=await o;r.ok?r.headers.get("content-type")?.includes("event-stream")&&await Qs(r.clone(),n):n.error=!0}catch(r){let i=r instanceof DOMException&&r.name==="AbortError";n.handoff||=i,n.error||=!i}finally{Tr.delete(e),O.emit("generate-end",{requestId:e,...n})}}async function js(e,t){try{let o=await t;if(!o.ok)return;let n=Us(e,await o.clone().json());n&&O.emit("conversation",n)}catch(o){Lr.debug("Conversation read skipped",o)}}function zs(e,t,o){let n=Ys(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&Os.test(n.pathname)){Ws(Hs++,Fs(t),o);return}let i=r==="GET"&&n.pathname.match(Ps)?.[1];i&&js(i,o)}var Mr=!1;function Rr(){if(Mr)return;Mr=!0;let e=z.fetch,t=function(o,n){let r=e.call(this??z,o,n);try{zs(o,n,r)}catch(i){Lr.error("Fetch tap failed",i)}return r};z.fetch=typeof exportFunction=="function"?exportFunction(t,z):t}var Js="__reactContainer$",Dr="__reactFiber$";function jt(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var Vo=(e,t)=>Object.keys(e.wrappedJSObject??e).some(o=>o.startsWith(t)),Be=e=>!Vo(document,Js)||Vo(e,Dr);function nt(){return document.body?Promise.resolve():new Promise(e=>{let t=new MutationObserver(()=>{document.body&&(t.disconnect(),e())});t.observe(document,{childList:!0,subtree:!0})})}async function Or(){await nt();let e=Date.now()+8e3;for(;!Vo(document.body,Dr)&&Date.now()<e;)await new Promise(t=>setTimeout(t,100))}var Vs=new q("Route"),Pr=/\/c\/(?!local-)([\w-]+)/,Zs=500,_o=e=>{try{return new URL(e,location.origin).pathname.match(Pr)?.[1]??null}catch{return null}},A=()=>location.pathname.match(Pr)?.[1]??null,ge=()=>location.pathname==="/",Nr=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",Jt=new Set,Vt=location.href,Xo=A(),zt;function Zo(){if(location.href===Vt)return;let e={prevHref:Vt,href:location.href,prevId:Xo,id:A()};Vt=e.href,Xo=e.id;for(let t of Jt)try{t(e)}catch(o){Vs.error("Route listener failed",o)}}function Xs(){let e=new AbortController,{navigation:t}=z;t?.addEventListener("currententrychange",()=>queueMicrotask(Zo),{signal:e.signal}),addEventListener("popstate",Zo,{signal:e.signal});let o=setInterval(Zo,Zs);return()=>{e.abort(),clearInterval(o)}}function ie(e){return Jt.add(e),zt||(Vt=location.href,Xo=A(),zt=Xs()),()=>{Jt.delete(e),!Jt.size&&(zt?.(),zt=void 0)}}var _s=["data-turn","data-message-author-role"],$s=/:(user|assistant)$/,$o=`${u.messageUnit}, ${u.oldMessage}`,en=e=>e==="user"||e==="assistant",Ur=()=>!!document.querySelector(u.timelineScroll),Zt=()=>Ur()?$(u.timelineScroll):document;function Xt(){if(Ur())return $(u.timelineScroll);let e=document.querySelector(u.turn);for(let t=e?.parentElement;t;t=t.parentElement){let{overflowY:o}=getComputedStyle(t);if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight)return t}return document.scrollingElement}var _t=e=>e.getAttribute("data-chatgpt-search-unit-key")?.match($s)?.[1]??null,Yr=e=>[...e.querySelectorAll(u.searchUnit)].filter(t=>_t(t)&&!t.parentElement?.closest(u.searchUnit)),Hr=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function rt(e){let t=Hr(e);return t.length?t:[...new Set([...e.querySelectorAll($o)].flatMap(Hr))]}function tn(e=Zt()){if(!e)return[];let t=Yr(e);return t.length?t:[...e.querySelectorAll($o)].filter(o=>!o.parentElement?.closest($o))}function el(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function tl(e){for(let t of _s){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(en(o))return o}return e.querySelector(u.markdown)||e.querySelector(u.generatedImage)?"assistant":null}var ol=e=>!e.parentElement?.closest(u.turn);function $t(){let e=J(A())?.chain??[],t=[...Zt()?.querySelectorAll(u.turn)??[]].filter(ol).flatMap(n=>{let r=Yr(n);return r.length?r.map(i=>({el:i,known:_t(i)})):[{el:n,known:null}]}),{generating:o}=P();return t.map(({el:n,known:r},i)=>{let s=r?rt(n):tn(n).flatMap(rt),c=r??tl(n)??el(s,e)??(i%2?"assistant":"user"),l=c==="assistant"&&(n.matches(u.turnBusy)||!!n.querySelector(u.turnBusy)||o&&i===t.length-1);return{el:n,role:c,messageIds:s,streaming:l}})}var nl="[data-bloom], .sr-only",rl=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,Gr=new WeakMap;function eo(e){let t=e.el.textContent?.length??0,o=Gr.get(e.el);if(o?.length===t)return o.summary;let n=il(e);return Gr.set(e.el,{length:t,summary:n}),n}function il(e){let t=e.el.querySelectorAll(u.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.querySelector(e.role==="assistant"?u.markdown:".whitespace-pre-wrap")??e.el,i=[...o.querySelectorAll(nl)].map(s=>R(s.textContent??"")).filter(Boolean).reduce((s,c)=>s.replace(c,`
`),o.innerText||o.textContent||"").split(`
`).map(R).filter(s=>s&&!rl.test(s));return i.length?i.join(" "):e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function to(e){return e.text?R(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var al=250,sl=400,ll=6e4,cl=5e3,dl=`:is(${u.turn}) :is(${u.turnBusy})`,v=Ft(),ro=new Set,on=new Set,ae=!1,Kr=0,Ie=null,ke=!1,oo=!1,it=0,io=!1,at=null,Fr=!1,P=()=>({generating:ae,conversationId:A()}),Qr=()=>Cr()||!!Zt()?.querySelector(dl);function ul(){let e=Qr();return e?oo||(it=0,io=!0):oo=!1,[...ro].some(t=>!on.has(t))||e&&!oo||Date.now()<it}function ml(){return at?.error?"error":ke?"stopped":"done"}function pl(){Ie=null,ae=!1,io=!1,v.emit("fall",{conversationId:A(),outcome:ml()}),ke=!1,at=null}function Wr(){let e=ul();e&&!ae&&(ae=!0,Kr=Date.now(),ke=!1,at=null,v.emit("rise",{conversationId:A()})),e||!ae?Ie=null:Ie==null?Ie=Date.now():Date.now()-Ie>=sl&&pl()}function no(){Wr(),v.emit("tick",P())}function fl({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(ae||Date.now()-Kr<ll);if(!o&&ae){for(let n of ro)on.add(n);oo=Qr(),it=0,io=!1,Ie=null,ae=!1,ke=!1,at=null,v.emit("fall",{conversationId:e,outcome:"left"})}v.emit("context",{prevId:e,id:t,migrated:o}),no()}function gl(e){e.target instanceof Element&&e.target.closest(u.stopButton)&&(ke=!0,it=0)}function jr(){Fr||(Fr=!0,O.on("generate-start",({requestId:e})=>{ro.add(e),no()}),O.on("generate-end",e=>{ro.delete(e.requestId),!on.delete(e.requestId)&&(at=e,it=e.handoff&&!e.error&&!ke&&!io?Date.now()+cl:0,no())}),ie(fl),document.addEventListener("click",gl,!0),vr(no,al),jt().then(()=>L(Wr)))}var zr={BetterNavigator:1790674918e3,ChatListStatus:1790658944e3,ChatStateFavicons:1790623094e3,Cleaner:1790675778e3,ComposerOpacity:1790667838e3,CustomSidebarIdentity:1790658669e3,GreetingCustomizer:1790616549e3,InputHistory:1790658669e3,MessageTimestamps:1790649198e3,NoDictation:1790653816e3,NoShareLink:1790658669e3,NoSidebarIdentity:1790616549e3,PromptQueue:1790661194e3,RecentTopics:1790620238e3,ResponseNotification:1790661368e3,Settings:1790680802e3,StreamerMode:1790666245e3,WiderChat:1790616549e3};var b=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,hl="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",bl={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${hl}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:b('<path d="M18 6 6 18M6 6l12 12"/>'),gear:b('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:b('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:b('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:b('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:b('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:b('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:b('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:b('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:b('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:b('<path d="m6 9 6 6 6-6"/>'),play:b('<path d="M7 4v16l13-8z"/>'),plus:b('<path d="M12 5v14M5 12h14"/>'),check:b('<path d="m5 12 5 5 9-10"/>'),alert:b('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:b('<path d="M4 5h16v11H9l-5 4z"/>'),layout:b('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:b('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:b('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:b('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:b('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:b('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:b('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:b('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:b('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:b('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:b('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:b('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:b('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:b('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:b('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),grip:b('<path d="M9 6h0M15 6h0M9 12h0M15 12h0M9 18h0M15 18h0"/>')},N=e=>qr(bl[e]);var se="data-bloom-tip",nn=6,rn=8,he,Jr=null;function Re(e){if(e===Jr)return;if(Jr=e,!e){he?.remove();return}he??=a("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),he.textContent=e.getAttribute(se),document.body.append(he);let t=e.getBoundingClientRect(),{width:o,height:n}=he.getBoundingClientRect(),r=t.bottom+nn+n<=innerHeight-rn;he.style.left=`${Ee(t.left+t.width/2-o/2,rn,innerWidth-o-rn)}px`,he.style.top=`${r?t.bottom+nn:t.top-nn-n}px`}var Vr=e=>e instanceof Element?e.closest(`[${se}]`):null;function Zr(){let e=new AbortController,t={passive:!0,signal:e.signal};return document.addEventListener("pointerover",o=>Re(Vr(o.target)),t),document.addEventListener("pointerout",o=>o.relatedTarget||Re(null),t),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&Re(Vr(o.target)),t),document.addEventListener("focusout",()=>Re(null),t),document.addEventListener("pointerdown",()=>Re(null),t),()=>{e.abort(),Re(null)}}var Al=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,Xr=/\S+@\S+\.\S+/,yl=3,ql=/^\/g\/(g-p-[^/]+)\//,vl=/^g-p-[0-9a-f]+-?/i,_r=e=>!!e.closest(".sr-only"),an=e=>!!e?.querySelector(u.menuButton);function $r(){return[...document.querySelectorAll(u.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(an)).filter(e=>e!=null)}function ei(){let e=[...document.querySelectorAll(u.oldProfile)];if(e.length)return e.map(o=>{let n=o.parentElement?.children.length===1?o.parentElement:o;return{kind:"profile",anchor:n,insert:r=>n.before(r)}});let t=$r().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(u.rail)){let n=[...o.children].find(an);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}var sn=e=>!e.closest("[data-bloom]")&&(!!e.querySelector("img, [class*=rounded-full]")||ri(e).some(t=>!_r(t))),ti=e=>[...e.parentElement?.children??[]].find(t=>t!==e&&t instanceof HTMLElement&&sn(t))??null;function oi(){let e=[...document.querySelectorAll(u.oldProfile)];return e.length?e:[...$r(),...[...document.querySelectorAll(u.rail)].map(o=>[...o.children].findLast(an))].map(o=>[...o?.querySelectorAll(u.menuButton)??[]].findLast(n=>sn(n)||ti(n))).filter(o=>o!=null)}var ni=()=>oi().map(e=>sn(e)?e:ti(e)).filter(e=>e!=null);function ri(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!R(t.textContent??"")&&!(t instanceof SVGElement))}var Sl=e=>{if(/rounded-full/.test(e.getAttribute("class")??""))return!0;if(!e.clientWidth)return!1;let{borderRadius:t}=getComputedStyle(e);return t.includes("%")||Number.parseFloat(t)>=e.clientWidth/2};function ao(e,t,o){for(let n of e.querySelectorAll(`[${t}]`))n!==o&&n.removeAttribute(t);o&&!o.hasAttribute(t)&&o.setAttribute(t,"")}function xl(e,t){if(R(e.textContent??"").length>yl)return null;let o=e.closest("button");for(let n=e;n&&n!==t&&n!==o;n=n.parentElement)if(Sl(n))return n;return null}function ln(e,t){e.hasAttribute(`data-bloom-${t}`)||e.setAttribute(`data-bloom-${t}`,"");let o=e.querySelector("img:not([data-bloom] img)"),n=ri(e),r=o?null:n.map(m=>xl(m,e)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),s=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");ao(e,`data-bloom-${t}-avatar`,s);let c=n.filter(m=>!s?.contains(m)&&!_r(m)),l=c.find(m=>Al.test(R(m.textContent??""))),d=c.find(m=>Xr.test(m.textContent??""));ao(e,`data-bloom-${t}-plan`,l),ao(e,`data-bloom-${t}-email`,d),ao(e,`data-bloom-${t}-name`,c.find(m=>m!==l&&m!==d))}function wl(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function so(){return oi().map(wl).find(e=>e!=null)??[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&(Xr.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var st=e=>[...document.querySelectorAll(u.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&_o(t.href)===e);function ii(e){let t=st(e).find(o=>R(o.textContent??""));return t?R(t.textContent??""):null}function ai(e){let t=new URL(e,location.origin).pathname.match(ql)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!_o(n.href)&&R(n.textContent??""));return o?R(o.textContent??""):t.replace(vl,"").replaceAll("-"," ")||null}function cn(e,t,o){let n=a("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o}});return n.addEventListener("click",r=>{r.stopPropagation();let i=n.getAttribute("aria-checked")!=="true";n.setAttribute("aria-checked",String(i)),t(i)}),n}function F(e,t,o){return a("button",{class:kt("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button"},on:{click:t}})}function K(e,t,o,n){let r=a("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":t,[se]:t},on:{click:o}},N(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function lo(e,t,o,n,r,i){let s=a("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});s.value=String(e);let c=a("output",{text:`${s.value}${r}`});return s.addEventListener("input",()=>{c.textContent=`${s.value}${r}`,i(Number(s.value))}),a("div",{class:"bloom-slider"},s,c)}function dn(e,t,o){let n=a("select",{class:"bloom-select"},...t.map(r=>a("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function lt(e,t,o="",n="text"){let r=a("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var El=new q("SettingsPanel"),p=E("bloom-settings-"),Cl=10080*60*1e3,Tl=3e3,si="Toggle features. Some need a reload. Click the sliders icon to configure.",Ml=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Ll=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],Bl={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},li=new Set(["chat","ui","privacy"]),H=null,De="all",un="all",co="",mn=[],ci=()=>[...pe.values()].filter(e=>!e.hidden),Il=e=>!!e.updatedAt&&Date.now()-e.updatedAt<Cl;function kl(e){switch(De){case"favorites":return Nt.has(e.name);case"recent":return Il(e);case"all":return!0;case"other":return!e.tags.some(t=>li.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(De)}}function Rl(e){switch(un){case"all":return!0;case"enabled":return _e(e);case"disabled":return!_e(e)}}function Dl(e){let t=co.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function Ol(e){let t=Pt.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return De==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var di=e=>e.settings?.def??{},Pl=e=>Object.values(di(e)).some(t=>t.type!=="custom");function Nl(e,t,o){let n=ue(e.name,t)??Qo(o),r=i=>me(e.name,t,i);switch(o.type){case"boolean":return cn(n,r,o.description??t);case"slider":return lo(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return dn(n,o.options,r);case"string":return lt(n,r,o.placeholder);case"number":return lt(String(n),i=>r(Number(i)),"","number");case"component":{let i=a("div",{class:p("component")});return mn.push(o.render(i)),i}case"custom":return null}}var Hl=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function ui(e){if(!H)return;let t=Object.entries(di(e)).filter(([,i])=>i.type!=="custom").map(([i,s])=>{let c=Nl(e,i,s),l=s.type==="boolean",d=s.type!=="component"&&a("div",{class:p("field-label"),text:Hl(i)}),m=s.description&&a("div",{class:p("field-desc"),text:s.description});return a("div",{class:p("field",l?"field-inline":"field-stacked")},(d||m)&&a("div",{class:p("field-text")},d,m),c)}),o,n=F("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},Tl);return}clearTimeout(o),e.settings?.reset(),ct(),ui(e)},"danger"),r=a("div",{class:p("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&ct()}},a("div",{class:p("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},a("div",{class:p("popup-header")},a("div",{class:p("card-icon")},N(e.icon)),a("div",{class:p("popup-title")},a("div",{class:p("card-name"),text:e.name}),a("div",{class:p("popup-authors"),text:e.authors.join(", ")})),K("close","Close",ct)),a("p",{class:p("popup-desc"),text:e.description}),a("div",{class:p("fields")},...t),a("div",{class:p("popup-footer")},n)));H.querySelector(`.${p("modal")}`)?.append(r)}function ct(){for(let e of mn)e();mn=[],H?.querySelector(`.${p("popup-backdrop")}`)?.remove()}function Gl(e){let t=_e(e),o=Nt.has(e.name),n=Pt.has(e.name);return a("div",{class:p("card",t?"card-on":"card-off")},a("div",{class:p("card-top")},a("div",{class:p("card-icon")},N(e.icon)),a("div",{class:p("card-actions")},K("star",o?"Unstar":"Star",()=>{Nt.toggle(e.name),be()},o),K("pin",n?"Unpin":"Pin to top",()=>{Pt.toggle(e.name),be()},n),Pl(e)&&K("gear","Settings",()=>ui(e)),e.required?null:cn(t,r=>hr(e,r),`Enable ${e.name}`))),a("div",{class:p("card-name"),text:e.name}),a("div",{class:p("card-desc"),text:e.description,title:e.description}),a("div",{class:p("card-footer"),text:e.authors.join(", ")}))}function mi(){let e=ci().some(o=>!o.tags.some(n=>li.has(n)));H?.querySelector(`.${p("tabs")}`)?.replaceChildren(...Ml.filter(o=>o.id!=="other"||e).map(o=>a("button",{class:p("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===De)},on:{click:()=>{De=o.id,mi(),be()}}})))}function be(){if(!H)return;let e=ci().filter(kl),t=H.querySelector(`.${p("search")} input`);t&&(t.placeholder=`Search ${Bt(e.length,"plugin")}...`);let o=Ol(e.filter(i=>Dl(i)&&Rl(i))),n=H.querySelector(`.${p("grid")}`),r=co.trim()?"No plugins match your search.":Bl[De]??"No plugins available.";n?.replaceChildren(...o.length?o.map(Gl):[a("div",{class:p("empty"),text:r})])}function Ul(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),H?.querySelector(`.${p("popup-backdrop")}`)?ct():Oe())}var pi,pn;function Yl(){if(H)return;let e=a("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=co,e.addEventListener("input",()=>{co=e.value,be()}),H=a("div",{class:`bloom-root ${p("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&Oe()}},a("div",{class:p("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},a("div",{class:p("header")},a("div",{class:p("logo")},N("bloom")),a("h2",{class:p("title"),text:"Bloom++"}),a("span",{class:p("hint"),attrs:{"aria-label":si,tabindex:"0",[se]:si}},N("info")),a("span",{class:p("version"),text:"v2.0.27"}),K("close","Close",Oe)),a("div",{class:p("tabs"),attrs:{role:"tablist"}}),a("div",{class:p("toolbar")},a("label",{class:p("search")},N("search"),e),dn(un,Ll,t=>{un=t,be()})),a("div",{class:p("grid")}))),H.addEventListener("keydown",t=>t.stopPropagation()),pn=new AbortController,document.addEventListener("keydown",Ul,{capture:!0,signal:pn.signal}),document.body.append(H),mi(),be(),pi=br(be),e.focus(),El.debug("Opened")}function Oe(){ct(),pn?.abort(),pi?.(),H?.remove(),H=null}var uo=()=>H?Oe():Yl();var fi=`/*
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
`;var dt=E("bloom-entry-"),Ai=g({showSidebarEntry:{type:"boolean",description:"Show the Bloom++ button above the account row in the sidebar. The account menu and the userscript menu always open the panel.",default:!1}}),Pe=new Map,gi=!1,hi=[];function Kl(e){let t=a("button",{class:dt("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:o=>{o.preventDefault(),o.stopPropagation(),uo()}}},N("bloom"),e!=="rail"&&a("span",{class:dt("label"),text:"Bloom++"}));return a("div",{class:`bloom-root ${dt("wrap")} ${dt(e)}`,attrs:{"data-bloom":"entry"}},t)}function Ql(e){let t=a("div",{class:`bloom-root ${dt("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),uo()}}},N("bloom"),a("span",{text:"Bloom++"})),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function bi(){let e=Ai.store.showSidebarEntry?ei():[];for(let[o,n]of Pe)o.isConnected&&e.some(r=>r.anchor===o)||(n.remove(),Pe.delete(o));for(let o of e){let n=Pe.get(o.anchor);if(n?.isConnected||!Be(o.anchor))continue;let r=n??Kl(o.kind);Pe.set(o.anchor,r),o.insert(r)}let t=so();t&&!t.querySelector('[data-bloom="menu-entry"]')&&Ql(t)}var yi=f({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:Ai,styles:fi,start(){hi=[L(bi),Zr()],!gi&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",uo),gi=!0)},stop(){for(let e of hi)e();for(let e of Pe.values())e.remove();Pe.clear(),Oe()},onSettingsChange:bi});var qi=`/*
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
`;var x=E("bloom-nav-"),po=80,jl=1200,zl=2,vi=3e4,Jl=200,Vl=.9,Zl=.3,Xl=12,_l={user:"\u2753",assistant:"\u{1F916}"},$l=["wheel","touchmove","pointerdown"],gn=g({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),B=null,I=[],Ae=-1,He=-1,Ne=null,mo="",fn=0,Si=[],mt=null,ut,xi=e=>gn.store.showAssistant||e.role==="user";function Ci(){let e=$t().reduce((l,d)=>{let m={role:d.role,summary:eo(d),ids:d.messageIds,turn:d,streaming:d.streaming},w=l.at(-1);return w?.role==="assistant"&&m.role==="assistant"?l[l.length-1]={...m,ids:[...w.ids,...m.ids]}:l.push(m),l},[]).filter(xi),t=(J(A())?.chain??[]).filter(xi);if(!t.length)return e;let o=new Set(t.map(l=>l.id)),n=new Map(e.flatMap(l=>l.ids.map(d=>[d,l]))),r=new Map,i=[];for(let l of e)l.ids.some(d=>o.has(d))?(r.set(l,i),i=[]):i.push(l);let s=new Set,c=[];for(let l of t){let d=n.get(l.id);d&&s.has(d)||(d&&(s.add(d),c.push(...r.get(d)??[])),c.push(d??{role:l.role,summary:to(l),ids:[l.id],turn:null,streaming:!1}))}return[...c,...i]}function ec(e){let t=e.getBoundingClientRect(),o=t.top+t.height*Zl,n=-1;return I.forEach((r,i)=>{let s=r.turn?.el.getBoundingClientRect();s&&s.top<=o&&(n=i)}),n===-1?I.findIndex(r=>r.turn):n}function wi(e){gn.store.jumpEffect==="border"&&(e.classList.add(x("flash")),setTimeout(()=>e.classList.remove(x("flash")),jl))}function go(e){let t=I[e],o=Xt();if(!t||!o)return;He=e,Ne=e?null:{chat:A(),first:t.ids[0],until:Date.now()+vi},fo();let n=t.turn?.el;if(n?.isConnected){let d=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:d<o.clientHeight*zl?"smooth":"auto"}),wi(n);return}let r=I.findIndex(d=>d.turn),i=r>=0&&e<r?-1:1,s=++fn,c=Date.now()+vi,l=()=>{let d=Xt();if(s!==fn||Date.now()>c||!d)return;I=Ci();let m=I.find(G=>G.ids.some(h=>t.ids.includes(h)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),wi(m),He=I.findIndex(G=>G.turn?.el===m),fo();return}let w=d.scrollTop;d.scrollBy({top:i*d.clientHeight*Vl,behavior:"instant"}),d.scrollTop===w?setTimeout(l,Jl):requestAnimationFrame(l)};l()}function tc(e,t){return a("button",{class:x("row"),attrs:{type:"button","data-index":String(t)},on:{click:()=>go(t)}},a("span",{text:_l[e.role]}),a("span",{class:"bloom-truncate",text:ne(e.summary||"\u2026",po)}))}function oc(){let e=Xt();if(I=Ci(),!I.length||!e){B?.remove(),B=null,mo="";return}if(mt!==e){ut?.abort(),ut=new AbortController,e.addEventListener("scroll",Me(fo),{passive:!0,signal:ut.signal});for(let r of $l)e.addEventListener(r,Ti,{passive:!0,signal:ut.signal});mt=e}B??=a("div",{class:`bloom-root ${x("root")}`,attrs:{"data-bloom":"navigator"}},a("div",{class:x("rail")}),a("div",{class:x("toc")},a("div",{class:x("toc-head")}),a("div",{class:x("toc-list")}))),B.isConnected||document.body.append(B);let t=e.getBoundingClientRect(),o=Math.min(t.bottom,ot()?.getBoundingClientRect().top??t.bottom);B.style.right=`${document.documentElement.clientWidth-t.left-e.clientLeft-e.clientWidth+Xl}px`,B.style.top=`${(t.top+o)/2}px`;let n=JSON.stringify(I.map(r=>[r.role,r.ids]));n!==mo?(mo=n,He=-1,rc(),Ne&&Date.now()<Ne.until&&Ne.chat===A()&&I[0]?.ids[0]!==Ne.first&&go(0)):nc(),fo()}function fo(){if(!B||!mt)return;Ae=He>=0?He:ec(mt),B.querySelectorAll(`.${x("tick")}`).forEach((t,o)=>t.classList.toggle(x("tick-current"),o===Ae)),B.querySelectorAll(`.${x("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===Ae)));let e=B.querySelector(`.${x("toc-head")}`);e&&(e.textContent=`${Ae+1} / ${I.length}`)}function nc(){B?.querySelectorAll(`.${x("tick")}`).forEach((e,t)=>{let o=I[t],n=ne(o.summary,po);e.title!==n&&(e.title=n),e.classList.toggle(x("tick-streaming"),o.streaming)}),B?.querySelectorAll(`.${x("row")}`).forEach(e=>{let t=e.lastElementChild,o=ne(I[Number(e.dataset.index)].summary||"\u2026",po);t&&t.textContent!==o&&(t.textContent=o)})}function rc(){B?.querySelector(`.${x("rail")}`)?.replaceChildren(...I.map((e,t)=>a("button",{class:kt(x("tick"),x(`tick-${e.role}`),e.streaming&&x("tick-streaming"),t===Ae&&x("tick-current")),title:ne(e.summary,po),attrs:{type:"button","aria-label":`Jump to message ${t+1}`},on:{click:()=>go(t)}}))),B?.querySelector(`.${x("toc-list")}`)?.replaceChildren(...I.map(tc))}var le=Me(oc);function Ti(){He=-1,Ne=null,fn++}var ic=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function Ei(e){if(!B||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||ic(document.activeElement)||document.querySelector("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:Ae-1,ArrowDown:Ae+1,Home:0,End:I.length-1}[e.key];if(o==null){Ti();return}o<0||o>=I.length||(e.preventDefault(),e.stopPropagation(),go(o))}var Mi=f({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:gn,styles:qi,start(){Si=[L(e=>U(e)&&le()),ie(le),O.on("conversation",le),v.on("rise",le),v.on("fall",le)],addEventListener("keydown",Ei,!0),addEventListener("resize",le,{passive:!0})},stop(){for(let e of Si)e();ut?.abort(),mt=null,removeEventListener("keydown",Ei,!0),removeEventListener("resize",le),B?.remove(),B=null,mo=""},onSettingsChange:le});var Li=`/*
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
`;var sc=E("bloom-cls"),lc="bloom-cls",cc=600*1e3,bn=Zn("tab"),Ue=new Map,ft=new Map,Ge=null,Bi=[],dc=e=>e==="streaming"||e==="error";function uc(){let e=new Map,t=Date.now();for(let[o,n]of ft)t-n.at>cc?ft.delete(o):e.set(o,n.status);for(let[o,n]of Ue)e.set(o,n);return e}function mc(e){return a("span",{class:`bloom-root ${sc("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&N("alert"))}function pt(){let e=uc(),t=new Set;for(let[o,n]of e)for(let r of st(o)){if(!Be(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let s=mc(n);t.add(s),r.append(s)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function ho(e,t){e&&(t?Ue.set(e,t):Ue.delete(e),Ge?.postMessage({tab:bn,id:e,status:t}),pt())}function pc({data:e}){!C(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===bn||(dc(e.status)?ft.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):ft.delete(e.id),pt())}function hn(){for(let e of Ue.keys())Ge?.postMessage({tab:bn,id:e,status:null})}var Ii=f({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:Li,start(){Ge=typeof BroadcastChannel=="function"?new BroadcastChannel(lc):null,Ge?.addEventListener("message",pc),addEventListener("pagehide",hn),Bi=[v.on("rise",({conversationId:e})=>ho(e,"streaming")),v.on("fall",({conversationId:e,outcome:t})=>ho(e,t==="error"?"error":null)),v.on("context",({prevId:e,id:t,migrated:o})=>{o&&P().generating?ho(t,"streaming"):!o&&Ue.get(e??"")==="streaming"&&ho(e,null)}),L(e=>U(e)&&pt())],A()&&pt()},stop(){for(let e of Bi)e();hn(),Ge?.close(),Ge=null,removeEventListener("pagehide",hn),Ue.clear(),ft.clear(),pt()}});var Ri=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],yo={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},fc={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},gc="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",An=32,qo=64,yn="#FCFCFC",qn="#111111",hc=14,vo=51.5,bc=12.5,Ac=9.75,ki=52,yc=10.5,qc=7.75,vc={rotate:e=>e.arc(vo,vo,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function bo(e){let t=document.createElement("canvas");t.width=t.height=An;let o=t.getContext("2d");return o?(o.scale(An/qo,An/qo),e(o),t.toDataURL("image/png")):""}function Ao(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D(gc);o&&(e.strokeStyle=qn,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function So(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function Sc(e,t){So(e,vo,bc,qn),So(e,vo,Ac,yo[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),vc[t](e),e.stroke()}function xc(e,t){e.beginPath(),e.roundRect(0,0,qo,qo,hc),e.fillStyle=t,e.fill()}var wc=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function Di(e,t){switch(e){case"original":return wc(fc[t]);case"hole":return bo(o=>Ao(o,yo[t],!0));case"bg":return bo(o=>{xc(o,yo[t]),Ao(o,yn,!1)});case"dot":return bo(o=>{Ao(o,yn,!0),So(o,ki,yc,qn),So(o,ki,qc,yo[t])});case"badge":return bo(o=>{Ao(o,yn,!0),Sc(o,t)})}}var ht="bloom-chat-state-favicon",bt="data-bloom-rel",xn="data-bloom-media",Oi="bloom-parked-icon",Ec="/favicon.ico",Ni=g({style:{type:"select",description:"How the tab icon shows the chat state.",options:Ri,default:"bg"}}),ce=null,Hi="",xo=null,Gi="",Pi=new Map,wn,vn=[],Ui=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${bt}]`)];function En(){for(let e of Ui())e.id!==ht&&(e.hasAttribute(bt)||(Gi||=e.href,e.setAttribute(bt,e.rel),e.setAttribute(xn,e.getAttribute("media")??"")),e.rel!==Oi&&(e.rel=Oi),e.media!=="not all"&&(e.media="not all"))}function Cc(){for(let e of Ui()){let t=e.getAttribute(bt);if(t==null)continue;e.rel=t;let o=e.getAttribute(xn);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(bt),e.removeAttribute(xn)}}function Yi(){let e=document.getElementById(ht);return e||(e=document.createElement("link"),e.id=ht,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function Tc(e){if(e==="wait")return Gi||Ec;let t=Ni.store.style,o=`${t}:${e}`,n=Pi.get(o);return n||Pi.set(o,n=Di(t,e)),n}function Sn(e){if(e)return"rotate";let t=Y();return ce&&t&&t!==Hi&&(ce=null),ce==="error"?"error":ce==="done"?"done":t?"ready":"wait"}function gt(e,t=!1){if(e===xo&&!t)return;xo=e;let o=Yi(),n=Tc(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function Mc(){wn=new MutationObserver(()=>{En(),document.head.lastElementChild?.id!==ht&&Yi()}),wn.observe(document.head,{childList:!0})}var Fi=f({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"HostReady",settings:Ni,start(){En(),gt(Sn(P().generating),!0),Mc(),vn=[v.on("rise",()=>{ce=null,gt("rotate")}),v.on("fall",({outcome:e})=>{ce=e==="done"||e==="error"?e:null,Hi=Y(),gt(Sn(!1))}),v.on("context",({migrated:e})=>{e||(ce=null)}),v.on("tick",({generating:e})=>{En(),gt(Sn(e))})]},stop(){for(let e of vn)e();vn=[],wn?.disconnect(),document.getElementById(ht)?.remove(),Cc(),xo=null,ce=null},onSettingsChange(){gt(xo??"wait",!0)}});var Lc={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${u.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['div:has(> div > aside button[aria-label="Dismiss migration notice"])','aside:has(button[aria-label="Dismiss migration notice"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])']},Ki=g({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice above the composer.",default:!0}}),Qi=f({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads and notices.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:Ki,styles:()=>Ce(Object.entries(Lc).flatMap(([e,t])=>Ki.store[e]?t:[]))});var wo=`form:has(:is(${u.composerInput})), ${u.oldComposerForm}`,Wi='[class*="ComposerLayoutRoot"]',Bc=`:is(${wo}) ${Wi}, :is(${wo}):not(:has(${Wi})) :is([class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"])`,Ic='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',kc='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',Rc="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))",ji=g({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function Dc(){let{opacity:e,blur:t}=ji.store;return e>=100?"":`:is(${Ic}), :is(${wo}){background-color:transparent!important;background-image:none!important;box-shadow:none!important}:is(${kc}){display:none!important}${Bc}{background-color:color-mix(in srgb, ${Rc} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important}:is(${wo}) :is(${u.composerInput}){background-color:transparent!important}`}var zi=f({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:ji,styles:Dc});var Cn=0,Eo;function Oc(e){if(!U(e))return;for(let o of ni())ln(o,"profile");let t=so();t&&ln(t,"menu")}function Ye(){Cn++;let e=!0;return nt().then(()=>{e&&Cn&&!Eo&&(Eo=L(Oc))}),()=>{e&&(e=!1,!--Cn&&(Eo?.(),Eo=void 0))}}var ee=E("bloom-csi-"),Pc=256,Nc=160,Co=1,Ji=4,Hc=.1,Gc=.0015,Uc=250;function Yc(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function Fc(e){return new Promise((t,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function Kc(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:Ee(t.x,n,1-n),y:Ee(t.y,r,1-r)}}function Vi(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function Qc(e,t){let o=a("canvas");return o.width=o.height=Pc,Vi(o,e,t),o.toDataURL("image/png")}function Zi(e){let t=null,o={x:T.store.cropX,y:T.store.cropY,zoom:T.store.cropZoom},n,r=a("canvas",{class:ee("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=Nc*devicePixelRatio;let i=a("div",{class:`bloom-muted ${ee("status")}`}),s=a("div",{class:ee("zoom")}),c=a("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(h,D=!0){t&&(o=Kc(t,h),Vi(r,t,o),D&&(clearTimeout(n),n=setTimeout(()=>{t&&(T.store.cropX=o.x,T.store.cropY=o.y,T.store.cropZoom=o.zoom,T.store.avatarUrl=Qc(t,o))},Uc)))}function d(){s.replaceChildren(lo(o.zoom,Co,Ji,Hc,"\xD7",h=>l({...o,zoom:h})))}async function m(h,D){i.textContent="";try{t=await Fc(h),D&&(T.store.avatarSource=h,o={x:.5,y:.5,zoom:Co}),e.classList.add(ee("has-image")),d(),l(o,D)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let w=h=>{h?.type.startsWith("image/")&&Yc(h).then(D=>m(D,!0))};c.addEventListener("change",()=>w(c.files?.[0])),r.addEventListener("wheel",h=>{t&&(h.preventDefault(),l({...o,zoom:Ee(o.zoom*(1-h.deltaY*Gc),Co,Ji)}),d())},{passive:!1}),r.addEventListener("pointerdown",h=>{if(!t)return;r.setPointerCapture(h.pointerId);let D={...o},je=r.getBoundingClientRect(),Mt=Lt=>{if(!t)return;let j=Math.max(je.width/t.naturalWidth,je.height/t.naturalHeight)*o.zoom;l({...o,x:D.x-(Lt.clientX-h.clientX)/(t.naturalWidth*j),y:D.y-(Lt.clientY-h.clientY)/(t.naturalHeight*j)})};r.addEventListener("pointermove",Mt),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",Mt),{once:!0})});let G=a("div",{class:ee("cropper"),attrs:{tabindex:"0"},on:{paste:h=>w([...h.clipboardData?.files??[]].find(D=>D.type.startsWith("image/"))),dragover:h=>h.preventDefault(),drop:h=>{h.preventDefault(),w(h.dataTransfer?.files[0])}}},a("div",{class:ee("stage")},r),a("div",{class:ee("controls")},lt("",h=>h.trim()&&void m(h.trim(),!0),"https://\u2026 or data:image/\u2026","url"),a("div",{class:ee("buttons")},F("Choose file",()=>c.click()),F("Reset crop",()=>{l({x:.5,y:.5,zoom:Co}),d()}),F("Clear",()=>{t=null,e.classList.remove(ee("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),s.replaceChildren(),T.store.avatarUrl="",T.store.avatarSource=""},"danger")),s,i,c));return e.append(G),T.store.avatarSource&&m(T.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var Xi=`/*
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
`;var At="data-bloom-csi-avatar",Tn="data-bloom-csi-sized",ta="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",jc=32,T=g({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>Zi(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),_i=[];function oa(e){e.removeAttribute(At),e.removeAttribute(Tn)}function $i(e){return(T.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function ea(e=[]){if(!U(e))return;let t=T.store.displayName.trim()||null,o=!!T.store.avatarUrl,n=new Set(t?$i("name"):[]);for(let i of document.querySelectorAll(ta))n.has(i)||fe(i,null);for(let i of n)fe(i,t);let r=new Set(o?$i("avatar"):[]);for(let i of document.querySelectorAll(`[${At}]`))r.has(i)||oa(i);for(let i of r)i.hasAttribute(At)||i.setAttribute(At,""),i.toggleAttribute(Tn,!i.closest('[role="menu"]'))}function zc(){let e=T.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${T.store.avatarSize}px}:is(${u.rail}, ${u.oldRail}) [${Tn}]{--bloom-csi-size:${jc}px}`:""}var na=f({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:T,styles:()=>`${zc()}
${Xi}`,start(){_i=[Ye(),L(ea)]},stop(){for(let e of _i)e();for(let e of document.querySelectorAll(`[${At}]`))oa(e);for(let e of document.querySelectorAll(ta))fe(e,null)},onSettingsChange(){ea()}});var Fe=E("bloom-greeting-"),ra=30,ia=100;function aa(e){let t=-1,o=a("textarea",{class:`bloom-input ${Fe("input")}`,attrs:{maxlength:String(ia),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=F("Add",i),r=a("div",{class:Fe("list")});function i(){let l=o.value.trim().slice(0,ia);if(!l)return;let d=[...S.store.greetings];t>=0?d[t]=l:d.length<ra&&d.push(l),S.store.greetings=d,t=-1,o.value="",s()}function s(){let{greetings:l}=S.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&l.length>=ra,r.replaceChildren(...l.length?l.map((d,m)=>a("div",{class:Fe("row",m===t?"row-editing":"row-idle")},a("div",{class:Fe("text"),text:d}),K("edit","Edit",()=>{t=m,o.value=d,o.focus(),s()}),K("trash","Delete",()=>{S.store.greetings=l.filter((w,G)=>G!==m),t===m&&(t=-1),s()}))):[a("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),e.append(a("div",{class:Fe("editor")},r,a("div",{class:Fe("form")},o,n))),s();let c=Te((l,d)=>l==="GreetingCustomizer"&&d==="greetings"&&s());return()=>{c(),e.replaceChildren()}}var sa=`/*
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
`;var Mo="data-bloom-greeting",Vc=1e3,Zc=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],S=g({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>aa(e)},greetings:{type:"custom",default:Zc},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),To,la=[],Mn,ca=()=>S.store.greetings.filter(e=>typeof e=="string"&&e.trim());function qt(){let e=ca();if(e.length)if(S.store.order==="random"&&e.length>1){let t=S.store.lastRandom;for(;t===S.store.lastRandom;)t=Math.floor(Math.random()*e.length);S.store.lastRandom=t,S.store.index=t}else S.store.index=(S.store.index+1)%e.length}function Xc(){return ge()?$(u.homeHeading):null}function da(){for(let e of document.querySelectorAll(`[${Mo}]`))e.removeAttribute(Mo),fe(e,null)}function yt(){let e=ca(),t=Xc();if(!t||!e.length){da();return}(S.store.index<0||S.store.index>=e.length)&&qt(),t.setAttribute(Mo,""),fe(t,e[Math.max(0,S.store.index)%e.length])}function Ln(){clearInterval(To),To=void 0,S.store.mode==="interval"&&ge()&&(To=setInterval(()=>{qt(),yt()},S.store.intervalSec*Vc))}function _c(e){S.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${Mo}]`)||getSelection()?.toString()||(qt(),yt())}function $c(){ge()&&S.store.mode==="refresh"&&qt(),Ln(),yt()}var ua=f({name:"GreetingCustomizer",description:"Replace the \u201CWhat can I help with?\u201D heading on the home page with your own lines.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:S,styles:sa,start(){Mn=new AbortController,document.addEventListener("click",_c,{signal:Mn.signal}),ge()&&S.store.mode==="refresh"&&qt(),Ln(),la=[L(e=>U(e)&&yt()),ie($c)]},stop(){Mn?.abort();for(let e of la)e();clearInterval(To),da()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&Ln(),yt()}});var vt=E("bloom-history-"),Bn=10,ed=3e3;function ma(e){let t="",o=0,n=new Set,r=a("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),i=a("div",{class:vt("list")}),s=a("div",{class:vt("pager")}),c,l=F("Clear all",()=>{if(!c){l.textContent="Click again to clear",c=setTimeout(()=>{c=void 0,l.textContent="Clear all"},ed);return}clearTimeout(c),c=void 0,l.textContent="Clear all",St([])},"danger");function d(){let w=[...ye.store.entries].toReversed(),G=t.trim().toLowerCase(),h=G?w.filter(j=>j.toLowerCase().includes(G)):w,D=Math.max(1,Math.ceil(h.length/Bn));o=Math.min(o,D-1);let je=h.slice(o*Bn,(o+1)*Bn).map(j=>a("div",{class:vt("row")},a("button",{class:vt("text",n.has(j)?"text-open":"text-closed"),text:j,title:n.has(j)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{n.delete(j)||n.add(j),d()}}}),K("copy","Copy",()=>void Xn(j)),K("trash","Delete",()=>St(ye.store.entries.filter(ss=>ss!==j)))));i.replaceChildren(...je.length?je:[a("div",{class:"bloom-muted",text:G?"No matching prompts.":"No saved prompts yet."})]),s.replaceChildren(a("span",{class:"bloom-muted",text:`${h.length} ${G?"matching":"saved"} \xB7 page ${o+1} of ${D}`}),F("Previous",()=>{o--,d()}),F("Next",()=>{o++,d()}),l);let[Mt,Lt]=s.querySelectorAll("button");Mt.disabled=o===0,Lt.disabled=o>=D-1,l.disabled=!w.length}r.addEventListener("input",()=>{t=r.value,o=0,d()}),e.append(a("div",{class:vt("manager")},r,i,s)),d();let m=Te((w,G)=>w==="InputHistory"&&G==="entries"&&d());return()=>{m(),clearTimeout(c),e.replaceChildren()}}var pa=`/*
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
`;var od=E("bloom-history-"),nd=2e3,ye=g({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>ma(e)},entries:{type:"custom",default:[]}}),W=null,In={text:"",at:0},qe=null,kn,Lo=()=>ye.store.entries.filter(e=>typeof e=="string");function St(e){ye.store.entries=e.slice(-ye.store.maxEntries)}function Rn(e){let t=e.trim();if(!t)return;let o=Date.now();t===In.text&&o-In.at<nd||(In={text:t,at:o},St([...Lo().filter(n=>n!==t),t]))}function rd(e,t){let o=Le();if(!o)return;qe??=a("div",{class:`bloom-root ${od("hud")}`,attrs:{"data-bloom":"history-hud","aria-live":"polite"}}),qe.textContent=`${e+1} / ${t}`;let n=(o.closest("form")??o).getBoundingClientRect();qe.style.left=`${n.left+n.width/2}px`,qe.style.top=`${n.top}px`,qe.isConnected||document.body.append(qe)}function xt(){W=null,qe?.remove()}function id(e){let t=Lo();if(!W)return;let o=t[e];W.index=e,W.shown=o,re(o),rd(t.length-1-e,t.length)}function ad(e){let t=Lo();if(!t.length)return!1;if(!W){if(e===1)return!1;W={index:t.length,draft:Y(),shown:""}}let o=W.index+e;return o<0?!0:o>=t.length?(re(W.draft),xt(),!0):(id(o),!0)}function sd(e){if(e.isComposing||!tt(e.target))return;let t=e.target;if(e.key==="Enter"&&!e.shiftKey){Rn(Y(t)),xt();return}if(e.key==="Escape"&&W){re(W.draft),xt(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey)return;let o=xr(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!W||ad(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function ld(e){W&&tt(e.target)&&Y(e.target)!==W.shown.trim()&&xt()}function cd(e){e.target instanceof Element&&e.target.closest(u.sendButton)&&Rn(Y())}var fa=f({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:ye,styles:pa,start(){kn=new AbortController;let{signal:e}=kn;document.addEventListener("keydown",sd,{capture:!0,signal:e}),document.addEventListener("input",ld,{capture:!0,signal:e}),document.addEventListener("click",cd,{capture:!0,signal:e}),document.addEventListener("submit",()=>Rn(Y()),{capture:!0,signal:e})},stop(){kn?.abort(),xt()},onSettingsChange(e){e==="maxEntries"&&St(Lo())}});var ga=`/*
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
`;var ud=1500,md=5e3,pd=2e3,Ke=g({showDate:{type:"boolean",description:"Show the date for messages not sent today.",default:!0},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),Io=new Map,Aa=0,ko,ha=[];function ya(e,t){Io.get(e)!==t&&(Io.set(e,t),clearTimeout(ko),ko=setTimeout(qa,pd))}function qa(){let e={...Ke.store.stamps,...Object.fromEntries(Io)};Ke.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,ud))}function fd(e){let t=J(A())?.times;for(let o=e.length-1;o>=0;o--){let n=Io.get(e[o])??t?.get(e[o])??Ke.store.stamps[e[o]];if(n)return n}return null}var gd=()=>P().generating||Date.now()-Aa<md;function hd(e){let t=new Date(e),o=new Date,n={hour:"2-digit",minute:"2-digit"};if(!Ke.store.showDate||t.toDateString()===o.toDateString())return t.toLocaleTimeString(void 0,n);let r=t.getFullYear()===o.getFullYear()?{}:{year:"numeric"};return t.toLocaleString(void 0,{...r,month:"short",day:"numeric",...n})}function ba(e){let t=_t(e)??e.getAttribute("data-message-author-role")??e.closest(u.turn)?.getAttribute("data-turn")??e.querySelector(u.authorRole)?.getAttribute("data-message-author-role");if(en(t))return t;let o=rt(e).at(-1);return J(A())?.chain.find(n=>n.id===o)?.role??null}function bd(e){let t=rt(e);if(!t.length||!Be(e)||e.querySelector("time:not([data-bloom])"))return;let o=fd(t);!o&&gd()&&(o=Date.now(),ya(t.at(-1),o));let n=e.querySelector(':scope > time[data-bloom="timestamp"]');if(!o||Ke.store.hideOwnMessages&&ba(e)==="user"){n?.remove();return}let r=hd(o);if(n?.textContent===r)return;let i=a("time",{class:`bloom-timestamp bloom-timestamp-${ba(e)??"assistant"}`,text:r,title:new Date(o).toLocaleString(),attrs:{"data-bloom":"timestamp",datetime:new Date(o).toISOString()}});n?n.replaceWith(i):e.prepend(i)}var Bo=Me(()=>{for(let e of tn())bd(e)}),va=f({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:Ke,styles:ga,start(){ha=[L(e=>U(e)&&Bo()),O.on("conversation",Bo),O.on("message-time",({messageId:e,time:t})=>{ya(e,t),Bo()}),v.on("fall",()=>{Aa=Date.now()})]},stop(){for(let e of ha)e();ko&&(clearTimeout(ko),qa());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();Bo()}}});var Ad=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])'],yd=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],Sa=g({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),xa=f({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:Sa,styles:()=>Ce([...Ad,...Sa.store.hideDictationSettings?yd:[]])});var ve="data-bloom-share",qd=/^\/g\/g-p-/,vd=/^(?:share|分享)$/i,Sd=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],xd=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${ve}="project"]`],Dn=g({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),Ro,On=!1;function wd(e){if(!U(e))return;let t=qd.test(location.pathname)&&!A();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${ve}]`))!t||!vd.test(R(o.textContent??""))?o.removeAttribute(ve):o.hasAttribute(ve)||o.setAttribute(ve,"project")}var wa=f({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:Dn,styles:()=>Ce([...Dn.store.hideShareChat?Sd:[],...Dn.store.hideShareProject?xd:[]]),start(){On=!0,nt().then(()=>{On&&!Ro&&(Ro=L(wd))})},stop(){On=!1,Ro?.(),Ro=void 0;for(let e of document.querySelectorAll(`[${ve}]`))e.removeAttribute(ve)}});var Ea='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',Ed='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',Cd="[data-bloom-profile-plan]",Ca="visibility:hidden!important;user-select:none!important",Ma=g({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function Td(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=Ma.store,r=[];return e&&r.push(n?`:is(${Ea}){display:none!important}`:`:is(${Ea}){${Ca}}`),t&&r.push(`:is(${Ed}){${Ca}}`),e&&o&&r.push(`${Cd}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var Ta,La=f({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Ma,styles:Td,start(){Ta=Ye()},stop(){Ta?.()}});var Ba=`/*
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
`;var k=E("bloom-queue-"),Ld=6,Bd=8,Q=null,wt="",Qe=!1,We=!1;function Pn(e,t,o){let n=K(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute(se),n.addEventListener("mouseenter",()=>Ia(t)),n.addEventListener("mouseleave",()=>Ia("")),n}function Ia(e){let t=Q?.querySelector(`.${k("tip")}`);t&&(t.textContent=e)}function Id(e,t,o,n){We=!0;let r=a("textarea",{class:`bloom-input ${k("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=new AbortController,s=c=>{i.abort(),We=!1,wt="",c?n.edit(t,r.value):r.replaceWith(a("div",{class:k("text"),text:o}))};addEventListener("keydown",c=>{if(!(c.target!==r||c.isComposing)){if(c.key==="Enter"&&!c.shiftKey)s(!0);else if(c.key==="Escape")s(!1);else return;c.preventDefault(),c.stopImmediatePropagation()}},{capture:!0,signal:i.signal}),r.addEventListener("keydown",c=>c.stopPropagation(),{signal:i.signal}),r.addEventListener("blur",()=>s(!0),{signal:i.signal}),e.querySelector(`.${k("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function kd(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,s=l=>{!i&&Math.abs(l.clientY-n.clientY)<Ld||(i||(i=We=!0,e.classList.add(k("dragging"))),e.style.transform=`translateY(${l.clientY-n.clientY}px)`)},c=l=>{if(removeEventListener("pointermove",s),!i)return;We=!1,wt="";let m=[...r.children].filter(w=>w!==e).filter(w=>w.getBoundingClientRect().top+w.getBoundingClientRect().height/2<l.clientY).length;o.move(t,m)};addEventListener("pointermove",s),addEventListener("pointerup",c,{once:!0})})}function Rd(e,t,o){let n=a("li",{class:k("row")},a("div",{class:k("text"),text:e}),a("div",{class:k("actions")},Pn("trash","Remove from queue",()=>o.remove(t)),Pn("edit","Edit",()=>Id(n,t,e,o)),Pn("send","Send now",()=>o.sendNow(t))));return kd(n,t,o),n}function Dd(e){if(!Q)return;let t=e.getBoundingClientRect();Q.style.left=`${t.left}px`,Q.style.width=`${t.width}px`,Q.style.bottom=`${innerHeight-t.top+Bd}px`}function Nn(){Q?.remove(),Q=null,wt="",We=!1}function Do(e,t){let o=ot();if(!e.length||!et(o)){Nn();return}Q||(Q=a("div",{class:`bloom-root ${k("tray")}`,attrs:{"data-bloom":"queue"}},a("div",{class:k("header")},a("button",{class:k("toggle"),attrs:{type:"button","aria-expanded":String(!Qe)},on:{click:i=>{Qe=!Qe,Q?.classList.toggle(k("collapsed"),Qe),i.currentTarget.setAttribute("aria-expanded",String(!Qe))}}},a("span",{class:k("count")}),N("chevron")),a("span",{class:k("tip")})),a("ol",{class:k("list")})),Q.classList.toggle(k("collapsed"),Qe),document.body.append(Q)),Dd(o);let n=JSON.stringify(e);if(We||n===wt)return;wt=n;let r=Q.querySelector(`.${k("count")}`);r&&(r.textContent=Bt(e.length,"Queued message")),Q.querySelector(`.${k("list")}`)?.replaceChildren(...e.map((i,s)=>Rd(i,s,t)))}var Od=8,Da=150,Oa=20,Pa=g({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1}}),Se=new Map,Oo=!1,xe=null,Hn,ka=[],Gn="draft",Un=()=>A()??Gn,V=()=>Se.get(Un())??[];function we(e){e.length?Se.set(Un(),e):Se.delete(Un()),Do(V(),Yn)}function Na(e,t=0){t>=Oa||P().generating||Y()!==e||(Er(),setTimeout(()=>Na(e,t+1),Da))}function Po(e,t=0){if(P().generating||Y()){t<Oa&&setTimeout(()=>Po(e,t+1),Da);return}re(e),zo(()=>Na(e))}function Ra(){if(xe!=null){let o=xe;xe=null,Po(o);return}if(!Oo||P().generating||Y())return;let[e,...t]=V();e!=null&&(Oo=!1,we(t),Po(e))}function Ha(e){let t=V(),o=t[e];if(o!=null){if(we(t.filter((n,r)=>r!==e)),!P().generating){Po(o);return}xe=o,Kt()?.click()}}var Yn={remove:e=>we(V().filter((t,o)=>o!==e)),edit:(e,t)=>we(t.trim()?V().map((o,n)=>n===e?t:o):V().filter((o,n)=>n!==e)),sendNow:Ha,move(e,t){let o=[...V()],[n]=o.splice(e,1);o.splice(t,0,n),we(o)}};function Pd(e){let t=V();return Pa.store.replacePending&&t.length?(we([...t.slice(0,-1),e]),!0):t.length>=Od?!1:(we([...t,e]),!0)}function Nd(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!tt(e.target)||!P().generating)return;let t=Y(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;re(""),xe=t,Kt()?.click();return}if(!t){V().length&&Ha(0);return}Pd(t)&&re("")}var Ga=f({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:Pa,styles:Ba,start(){Hn=new AbortController,document.addEventListener("keydown",Nd,{capture:!0,signal:Hn.signal}),ka=[v.on("fall",({outcome:e})=>{Oo=e==="done",e==="left"&&(xe=null),Ra()}),v.on("context",({prevId:e,id:t,migrated:o})=>{let n=Se.get(Gn);Se.delete(Gn),o&&!e&&t&&n&&Se.set(t,n),o||(Oo=!1),Do(V(),Yn)}),v.on("tick",()=>{Ra(),Do(V(),Yn)})]},stop(){Hn?.abort();for(let e of ka)e();Nn(),Se.clear(),xe=null}});var Hd=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function Gd(){let e=R(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!Hd.has(e.toLowerCase())?e:null}function Et(e){return e?J(e)?.title??ii(e)??(e===A()?Gd():null):null}var Ua=`/*
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
`;var te=E("bloom-recent-"),oe="home",Yd=50,Ya=140,Fd=new Set(["Backquote"]),Kd=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),y=g({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),de=null,X=[],_=0,Fn,Fa=[],Go=()=>Nr()?null:A()??(ge()?oe:null);function Ka(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function Wa(e){let t=Et(e);t&&y.store.titles[e]!==t&&(y.store.titles={...y.store.titles,[e]:t});let o=ai(location.href);o&&e===A()&&y.store.projects[e]!==o&&(y.store.projects={...y.store.projects,[e]:o})}function Qa(e){if(!e)return;let t=[e,...y.store.visits.filter(n=>n!==e)].slice(0,Yd),o=new Set(t);y.store.visits=t,Object.keys(y.store.previews).some(n=>!o.has(n))&&(y.store.previews=Ka(y.store.previews,o)),Object.keys(y.store.titles).some(n=>!o.has(n))&&(y.store.titles=Ka(y.store.titles,o)),e!==oe&&Wa(e)}function No(e){if(!e||!y.store.visits.includes(e))return;let t={},o=J(e)?.chain??[];for(let r of o)t[r.role]=ne(to(r),Ya);if(e===A())for(let r of $t()){let i=eo(r);i&&(t[r.role]=ne(i,Ya))}let n=y.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(y.store.previews={...y.store.previews,[e]:t})}function Qd(){let e=Number(y.store.maxRecent);return y.store.visits.filter(t=>t!==oe||y.store.includeHome).slice(0,e)}function Kn(e){if(Ct(),e===Go())return;let t=e===oe?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"]'):st(e)[0];t?t.click():location.assign(e===oe?"/":`/c/${e}`)}function Wd(e,t){let o=e===oe?"New chat":y.store.titles[e]??Et(e)??"Untitled chat",n=e===oe?null:y.store.projects[e],r=e===oe?null:y.store.previews[e];return a("button",{class:te("item"),attrs:{type:"button",role:"option","aria-selected":String(t===_)},on:{click:()=>Kn(e),mousemove:()=>t!==_&&Ho(t)}},a("div",{class:te("head")},a("span",{class:`${te("title")} bloom-truncate`,text:o}),n&&a("span",{class:te("project"),text:n})),r?.user&&a("div",{class:`${te("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&a("div",{class:`${te("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function Ho(e){_=(e+X.length)%X.length,de?.querySelectorAll(`.${te("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===_)))}function jd(){No(A());let e=Go();X=Qd(),e&&(X=[e,...X.filter(t=>t!==e)].slice(0,Number(y.store.maxRecent))),X.length&&(_=X.length>1?1:0,de=a("div",{class:`bloom-root ${te("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:t=>t.target===t.currentTarget&&Ct()}},a("div",{class:te("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...X.map(Wd))),document.body.append(de))}function Ct(){de?.remove(),de=null}var zd=e=>Fd.has(e.code)||Kd.has(e.key);function Jd(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&zd(e)){e.preventDefault(),e.stopPropagation(),de?Ho(_+(e.shiftKey?-1:1)):jd();return}if(!de)return;let o={Escape:Ct,Enter:()=>Kn(X[_]),ArrowDown:()=>Ho(_+1),ArrowUp:()=>Ho(_-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function Vd(e){de&&e.key==="Control"&&Kn(X[_])}var ja=f({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:y,styles:Ua,start(){Fn=new AbortController;let{signal:e}=Fn;addEventListener("keydown",Jd,{capture:!0,signal:e}),addEventListener("keyup",Vd,{capture:!0,signal:e}),addEventListener("blur",Ct,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&No(A()),{signal:e}),Fa=[ie(({prevId:i})=>{No(i),Qa(Go())}),O.on("conversation",({id:i})=>{y.store.visits.includes(i)&&Wa(i),No(i)})];let{visits:t,titles:o,previews:n}=y.store,r=t.filter(i=>i!==oe&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(y.store.visits=t.filter(i=>!r.includes(i))),Qa(Go())},stop(){Fn?.abort();for(let e of Fa)e();Ct()}});var Qn="data:audio/mpeg;base64,SUQzBAAAAAAAIlRTU0UAAAAOAAADTGF2ZjYxLjcuMTAwAAAAAAAAAAAAAAD/+5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABJbmZvAAAADwAAACgAAELvAAwMEhIYGBgfHyUlJSsrMTExODg+Pj5EREpKSlFRV1dXXV1jY2NqanBwcHZ2fHx8g4OJiYmPj5WVlZycoqKiqKiurq61tbu7u8HBx8fHzs7U1NTa2uDg4Ofn7e3t8/P5+fn//wAAAABMYXZjNjEuMTkAAAAAAAAAAAAAAAAkBXwAAAAAAABC75HV3zMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+5BkAAACVRhUHSTABDSjGMCkpAAV+UdIeawACK0LpksSkAAAEhOaEPa6NHqgJgmK0ewQIGLv//sYTJ34iIgmT1iAIEIWAAAQDGCAY0Qff/1gh3+CHKAgCEuCBzggCGCDv1B+CBwoCAIAh/V+UOQ9zXRtyQAmCYrR6ogQIEc5//wIATFaPYIECBATo9UFAIBgwuCAIChg5BwEHbi4f/8HAwsHwDJSk25HiBkEDmrGDRlRGDE44BKOErcpXEmnGLGAUG05WF48gSBebi1am1KjGgveDHroFZEIH+QlCyxGABCC1VCrlYQwcS/xhYcVnMtqxl77WNr5RzmHzZUqg8/U1m/KljFqTC+2AvdPax+xen21StkMqhq/RpPXb/zWWUNT3/RRXmMps9pZ3O9/63///f////ludLKoDcTe+frn/9WK////f//5///9mm3sjJlqb/oAAADADutHY8i2rvky+59Wnn/WFTxDiS2ttrIhnfxrf7Mnb/W//Qd2f//6FQAGgwIA8wGC8yEK82ysYxBF4xNBYtMMgAYMgIWAAMFABRP/+5JkEQ/EsUDLF3aABDKiOMDtPAAQMQUgD2lnyNOKJE2hNZhgBLlJIHAFEFOSmOwiZInTghEAKPAyAMLQgs8QUegDRAHQegDFRXhKYuQc4Vs6AyopETAMtC5SCl1kjKtSZmiaUjYdQ3xkiBEyasgmatRukZJoomSaa2Z3IaTxs6/SQPKqZNu/2Vrut1oFE1DJXgYfkVJ/DUDvkKlToxygu1h75KqdrK18fst/G52dizb96dnVr6AhuiQkgYmYMlRjQESsq4jt+sq7pEgDDAYAnMBcPoxGW9SoBkAgCzAPAmLppEGcIC9AsAAUWMjCR6ZgX+uMmcxYz0SyC6YUBui82kcFEwYCE74kHeVFVLkakhmmB5ICYhyax52KPWdF51FySSw9AfKi67ZzLKVh+Wk1EhSQTzKoOs3TPtlu6qRdXbL//4vdw6Euzej3qgBhvXWL31LDddiITD0UykDG3Wld90OQxTW6DaFlYKlkTE9ntf+HP7XNp+v9uvp/9nM8Mf/0qgAAWpTMLFIjAHD9M9NeQ+ewYYCiFWDIwWaP2luULS7X//uSZBAEQ7AqyJs+yAA2Yojmc08WDBDPKu6YVoDyj+OJx5Wg4votW6k/BszLpY8MCsAl24JWLAZAmadDzPUgiikv9f27mVvKrzP+f+eFXHv5Y5V5rWX813/3/953v8zn7+UsD4SH7Fg4Bj0+nfrYEXu/i/+j+QkfxWsIABAALAJSkwCNArTQceWqi5hKXoOEIaa+WkYu0/NG+pNU2j/q7rLMHW06PyLvCaKu+S57d00yBVGWbrCCoAmCw2HuVlmHwJIlOqoS9iE0wdAqnhtKmG6duLiSrOa+XU9jP8qHkYWWEADDtNT0aVkocilq5lSCXTht3M+ohle26/tQoEKDlSpiK5LXmoNR9+rT/knf///SSpgIVjoAAA/O35oqA1eRICqJxwqCAuL4Ajqy9tbROzs1Nx423n7XVgXYEt8MWxcJBZ1c//qvSo539TP+uojBJFtONfDgGDAvArNG8XwMC7DABEN0LEApdEwRAAHVRgCDvxeH1Y+nPccMHZvd5vRcZXOapV6llhp9mtaZl5p4fLbDiHK91/2b/v/QkHQNF1ytzP/7kmQqAIM8M8q7zDLkQGKIxXdsGg4orRzvaQfBNZSiye2sach/TduWyiQFZ1p72f9v/p1OH6KwIAADgeC4HgAzj6B1TOB4uuDAIOKENDAy0Jth4DZYsh15xnyjOvVb9hc/arPnYNQMmcJBj6VQiIs7txQ7+tQD1gEBQCRkDACTAxACMJQI87Bh3jESAFDgZzAQAnQfBJAEvAL9UaZSFyUUliBCD4bi0JlMr61G123YjK8nLTofOu6U6FQ8JNUwxLgYHTkI2KJURTY8tae2+F/ruHxhYw0PrEqJJQDUuzq8n/1/2qX/1e33gEgA0B+XYMEUHU2PQajZREaKTDSkMfEEJgiiddKBgDBRKEPzCLyfR2jc1WshyM7TPB6cBsf3DsOoGsW13193/9f8Q+b72X/bt8bl3UwaAAxQNpVzZIYAABmBuEQa75oZ+SRhAJhRdPPBUaf8oqOXhUKjRNQxCoDhyD6uUxAsUMEkExhQ7BKIFFbF8wHObTZGk6KlOgtmbZS1mKVkfrbsyVMuFRuxoUJNgClF3+M/9tFSPd6QgJBm0Bj/+5JkNYjjLCtJU9po8EpCiKFj3AANkKkctemAAVYK4oa88AAzAGm38T4amApEPwIXwaDU4zABeOSJUIEDrq7YrEU/4AoG8tzdHHYu79vCgxYK4jXIelk9Z5lAh0QFDhi1z7RTyVQCfFoGwYKAHBgoA4GCySObCToBhuB6GH8FYYKwBiDac4NBVMJwEgwFgBAcAACAE0GYHa2TADEPMiKF6MYQQk0z6I5YQAJgAtw5wohOGJdLYyRxSFNaVt6JfZJkj6zhiTCK0ldddkK7pJGDFakCsbvQYIYFZgcg3mBaLYauqEJhFg9mEaDWYD4M40DWCQCACDAYrIIZgSgEpFhcAuk9Q9MxLq08IkROyHRGrAsSovgGgl/JNHXBkwZ9DTBXeMt7M7S9RH/3KgABEnU2I3M4QslnQ2IxYBCQAWZIRki0OwYtGJmRuAFQk3Rk5ZxEysYxETRoWcE/kMAjEA4JqLPD8hHgb+HIBYaI6DCwYwFKC5xcAaAAcAG4BgAfghIACsyAHDEnyuXBZAuQcAAyw29YuYCpADmBv08/FjHAeTLj//uSZDuABgFfVn5mYAZeQ8nPzeAAEFVDQv24ABjKCKcrtCACBaMZBxQcsTIof+mLgJxB0GNg1aTtSSf/GYPG4lAiDEXIuT5RFtLQ6xYTXO//FwGpuQQnGLhcNEkC2gZMnZJzEx/////LpV35BIAAAMSEgFAFAHA5AYDAAABCpmriAUWTRBIACILOJ9EB1UOqtJbJMxgZZIeHJZDLiSGVxvLsceQGatzl3/48UPTuuZUlh5u3avf/n09vOWWPxoYveNZm9/4fy38+X70iAAABTgkDNgoMma5hlh7HkhU1WctaVO0ZgT6rlDAG7D5AjU6WSKmpdMWWuYmBEwFEZE1JoixZFygWRJjUomiR+s9MiLFYZ4MTOkklr+pL9aJ5NZDieSSfbX60S6fKJGC5SqyJdJ1zEZUgpdZfSNkkknZnRWYmqLf0kkkkaq/60WWYiAHAIAASQttRwClAL1AQVK1iD3KbK2FAWzjc1ayz1qt/Zop9AY/Ev/3Ld/2dn//7nf/WigACVKC4g0AZgoFxtJBp4GCQYR5gYAiCyYsJIQCd9bKCjP/7kmQQgAQEUEwbuVLyQmW6GmWCXs3A11WsMRaxUZapKYGLRoHCeFBxh8NxqjmYhGIfZ3GLHI9K3FVBUmH5l8PuEBYF1XpE8C35fbzpd297pQFRQcyZqnuYkbaqujD4uPntPWo8MMbmJNBeAiJznaitZm866XOYo6M3a3/RHnGu6tlARAIUwI2wAJukeM07FeWJrnY4utwO9YJBMcY695mbk8GgAgHDP5pSl5mW7+w4URzEcQyef3m6whG7EO+hG///Di24AQByOSVq1tyBD5oM+J6OzIrmzlijmFDVDlg29hl+Xga7Enennmq1rSJqEpUry1HRTlT6iNLZv60dA3NKlwtB8IxKPgiZdgaZtZ7a71HT0B0dfH9fJTz/Mr4rKqvzKs0BboqjxIO9cFaukq4l/SSWggs5GbIQFDnw2FRXvzFiZtQN2ck8u1Mw7Td+mtZ1alDamW6qWzFPTZbpsu/zKVQNZBSk5SzKsK7EwmbV3RVu1Utq8DYYCHKvvuYD/KAhDv/+6v+GqgBqACAJEIDBgRAwmt8NsaOx4Jg6AqGASBP/+5JkDIwDpDVJE9pCcEVDKRFzLyYOwNccL2BtgSWP5SnMoKCXFAwCQOACAzd1hHRAyhQLb4Bw+afiC1VY1DUqLzPdXkMuh5ASBjkszis1hFXBTdbNK7U0C49Md1UtLTfMDaul+ueOqQ0dZk8vvs92yb84kHDSZJIPFCTWKRiGgKCyaL4JBQPqZrWHEoLYcW8JjBGCfRj8gxQjSyOJOFe8gXPt42q21IC5g1wJaC3K95Z7GFuZoI3UZbOtzt9YIlvxreJfsBAwAwHDAsALIQnDlHKRPH8MMBGDGDMA+YB4EAhAfQfMFMC5BYqhiiQDK3ZwveazOCuGfLyQM8UZfScq09lp6wxijLJFdmZxUcaYixeYlcbhUzWp6fWe+aNKesRFI+G079hiCCmANUPW5ckyoQCFGkFn/+V//6kESAAFbd+QzQiLATNzIAb7IkPAaO0VAGpUKGwgUqHtpRLKr4MZIct41ZJccIwYXo2z1jfh57r/1i/mShMb+mf/1C3/7v+////3VUAD4Acl13U3FgFEQTnJB4HBUbGEgTrDKHJWMREp//uSZA6Ag0U1y1O5GnBOAykad0woDQzXIE9sqcE0DOMBnuxAJ0Q7pq4PszEoMo5iWsDofsQ3zndP561rXcPxqYs8cS9zZIAAwQiFT6vZsW8yJewiZ8BVj1n/tfeoCYeDhTHGLERLehWPCav/6jH/QAABABTCFrSAwFmumcYKnCrAmF4EAQyOhwoFesS3QoLZhbfjLnrYLHfhR52WFH9ezzIHX5TfqZe2ip16T8r3+oSbrbwG7/9n//9X2f0/WAsgGAeBKBgTTA1B+Mjc9U2eESzDWBMMBsBWTmASAICgAjBg+cBkWNCDozDBI2ryne5qzzXJHeubuwBem0RIpblungg1SCm7EYnCJsUOJwBIOpLXQg4qGzClLmqUyi7XR2yUNaezo3GnGNAdGZGpivHuebGKIehwiPBwNShCGmeDjUADzC285Tuw0UBbz17y25RK5DBcv7cqPvXTOp+2+YPrK3JUnGJZu9hcqw1fDlNXr1pT/+0AAjABFKwBwBUGgCGAEDSYcpXBo2hemEKAUPWl30BajRWPNDGLnVpuIsy5TWmtSv/7kmQXgJLhNkrT2SlgS6UZB3dIKgvM0SlO5WVJRIyiwY7sCKIZw2xyw1AUrqYQERMMAadR27rq6kV0ZHV009t5RBJlftT3o7HdSnUUqLb29QBAA4AACAGGalkjMQ6z4gFSIzQUWCoQwoldxihrYhTkDm0rkspaVDUvsO7kiJPxMBKDiyriRgbAJCFuNrjHT/+3NwNv+GeJvmblRRgBwIAFkgASjC4JmAQ3HDWcm11oGCgejqzSy9hclhyvBysaLkMugxT0bmqzVUCxMtd9julVGZiBMKYBQ7Ys2OTD3f/SKqTWvKIPVPna4q/ceV4ue3XP8XudVOaSFKirGaRggFx3N17aPq9zMYxOMMCAMZmcCqFAGfi2wJ3hoif1/okVg0tuwwuaWVpNHZfS7rTLdcaTC3Mzi32fqBvHnapZbnS0EtIlTStWzuB539FrFWAIglEQ7LAAmOVAAYFCZ0GNH9ISYwAiWSPAQGki04MSoB2r5HZWF/WfHTDpHfP2Tk/F17NVtU5DVXlLKXOrFO/soczOo7HeyF2TWAwxrm6+nHLt3Gv/+5JkKoGSvijM64wbalEFGPd1hWoKrNFNrSxv8TwUIwnttLDtfWwEEBwASLCF3RIHDNZAzoV2DEsITAYICECyQHIuiQ1gdHBrsTuBQD5P25TUudb57Y1NrrKdDQUjg9ZjAzYXf9DdtMiaWs5ho///////0f/1f6YA75JY3NW9CCUOjUg6IFoScLTwQFTQMYPR2JBqbNn4m6xJdBOOEsnqU6dZUOfMQqTTEJVua9S0/528Pdcksjtm5VSRuvqTxJKnOfXkWP/JNllFEpbVAGlWBgTTAlAWMOMRM1kgjAUKaZeIBiwYyXqrFxXIAs8HDFuKT63qO/LXsprF7BA0WxwYUIdzSswMRPxKhOEDcwNTY6okOnv/6bT3ZlsamioAgWlskB9oZRuPNbzGZxN2CGUv068BUsSlUlL/q/QCOE3FoTaOGtB2XKfJxH3mtQCAQdFYSAEh1H07E4QgHSkZY/FLPwe7kNug1VrzNUry9hVCjNBIAjIcFIkKbuA+Mal0mn6RSFfXoSEF4CDFUov18p3ZMNOYePBzVnjcB5eFGEhqrY0q//uSREKABEo5zUtiZw5+xzljcwhuStzRMa49q4mOnGZpyIsJqZZbOQAV2gALgZGUKjA8TazKnAHBGQAYv7F2SLDq7IAmRAprCJivILYI2NTeXw5H3XmIpMSyvL4bRPTrfBdEFOI9aRa92h17dS/UvU9yMVY3QMPO7VLi0jHGHyJ2JbGKWfqUWfGiv1FKLhQHwXsZOlJXv1wLsHALBzvowcAKCIWfCPMAACIkACZ4AUzPh0Dm6k0cQPIkFF3wQqaDWAPnMc5unIuWFigsLBqLG3jG6wG4mJYab3Iqm0kLRq2bb7pIAAmB3HWel+oyqu1jhipAxNf/+kay+UeJrbACQBBCVcAOE4A6FTby+P6JkFEwaAatjJ5VH2vEgBURiS1o86VJTV53C13lazcta9mLqy25ecJl0dVpi85jnbRpHS6WQMUNtHaZGyLJUtz6X0DB3ChhX//dgokDDOUBQpAICFRaAAKNSAL2+AFNoQAIZ1lycNmaYXgAXxVuaLEnLhtQ0iBOlaBFX8PJBwHAGtCPeo8HG57ceLAZKi5YQom0Pflfe//7kmQgAQKeJ8vrpkOyT+Z5TXHlagqg0S+uME3BHIzotPwwLty6Dq6+dfxh9YlA3msgt9fRPP50AAgKABl7MAUrPVdAEgniHEYcAbJ0/VU5lksgGQITAX7NRbmdtRKd3TFKR99/t5bWKsbuGDlRb1TuY5CW6lAUc/7dDs2ujyiLbnOqk0rbqKsACFIkLfIlKCp6mAGMa5lgBBbIGXskc13nGhkoB1A6Erhi1cu+juWjG1aRwm9WttjBkNRQ1hOprvrtnNy3U+mwI/aZ55pkbmEsrIVuFcyc+V2cd9NcAjkksb1kAAH6N6uiYdIxhAW3aLU7T2QkgibDglmwDSdrJcfoIQX40quwJTt61+XuKSq5iuFp0fYVXj4nUem1hEJPrUqm2AYAMRABLEACYAcBAEmAOCIYzxW5pfBXiQjg0B8qUtNF3kdtR4mBKliOaFfG1IdkadwVuvCkYE6kpPW8Q+ZjGIZbGFkrdXxwd6jZqxDrVh1zLYlNCxIIW13hRaZIAAABQACwIQJmJBF+TLMNgHZYsWwQDBcZPb2vWiQABoNKa7L/+5JkPwCC1ihI089bUEmkCQ11gmoKnHMfLHXhSUGMoondPJhytvQJxigg2K33nlMBRjZdnHdZRtLtYmb6k1aGcx+bb/1f////8iAAQAP4AQTC9CoQ55X/h/jZ5jaIwCAWXI3tPSrdJEIaGukOhUpmVYgI9xcIsbEei6jNh8rq+p2xyVoOE5cagTQn33v7rqbT8YtxXB3lbDAJ4b70+r9AgARgHhwEwKFRo9H53J2higLoBeIbmKCqwB0lgoXKD9GQtjkG9dkaiW9uaXn+pzjXBvQ3PcOKZTSIMa2fmbF6zRciZY82S/Lf+S///////30BgAcYDDTzAEDTCIVD37DTunBjGUQzBIGESi2CzKy/GeEQ17PT8vJUJ4gzA6kvTj6wngGeVnlGCKJINiIqzACra0lIDvKpLhQLTKAbD87e1Vh7///6wFIBDAwBgAjATAJC4yhqqF6mE4CERSzBBYYcYxYFi4wME8OEJJmA7gtxPmOR3G1W8rTOhsOPPd5AV5XPY20FrzleZ/U2j/b0ADEAApGwAiMTAAlAN5mWhaGj0B2T//uSZFkAwqodx7usE1BH4siie08mCoyfIU9kqcE9i6JJz2hACUDQHZbxV6mQcDfKow+FGnWf2e1T2qbXbPM+a5GqryfnfwtVp9R+V50OYFMzJShTs6zKIoZ1LY/SYgcBa/9OkCABEgyAQYYgEJnOMG4WMmYcIDgZRS1jT7mfBPMu4f415PIVuzVWwvP92q1q/9uHcVJW8a2ohG7ywDbQ9Vysijz6hCWlyZV5L7P//////9YMwCkAACEkwNBIwmFU+WcQ67pcxVDowEAdEdIlfBftWsZAQWD6q/RErOoE+zNr6LE3nOlCeCGZmeyS3T5VfElgFFysze4uuZWRH2Y79kcWD7BIqCyjAIFSUNjFWJzYD8jBYXSECC3icCDoKEx1UvyIzIeHBKBR5JUKUne7NZQyIxhuBdaB2EdaVjtUrwoWFgNc+xzPi9X9myz3f2gGNAACECBwEwuMh+nd56jdBiSHoIAggBFORgiazJx0BBYQrr9dFwZW6Oxw4Hff7q7mQlvvEmYzhSY2EIa5o6EFDmXJjAibpAAFXO47IfxVgrbAAv/7kmR3gAKFKMe7rytQSwLoknUvaApAoRxuvG1JHIrjadykmADABpuNs9UgJAOZbE8euMKYvAgY4ogEa8uZiM2skrqkyWhRtVxMYN7mbK2DaVT/ggOik1AwxndWV19fX/17vYj///2evjYBAFIAj8WwBINpn4HNG0cDiYZQAxgTgAgYCRRFgKEDXxAYTxxiItYVy/8LhuQS+3Wprk7VmYEdi7cprV2Q1ZYXnZrnOxYPocyTzWdaO+YzapZW3mlg82sgCF1YgP7/7spa0tEyaKjp5XDhMul+1QtKVd0SEH1owaADOdpwRKKZw6q4My8j2XI0bLm/pbu1t6f/q2//oDgBbdodEAnHCOfn0+FmLYaGAQBgUCF4KmDgHlJCARQN8Gv45Y0Au+cz5ictPtRMK0qCTp6SWWytJeQVDmSIuxcZD/mx9+qpFlXU/65BFAAQACCko1EBUAwYERoEcpghSRUDkLAh0OvBlKVERLBcPgxSbutTOYHWMbvMP9KMvOoc7OLGgJCI00DUx9XXuyf/+rVv9wy3/Z20f/RVAAgAAVkADBT/+5JknAECuChGM9k6cD3BqU1yaVAJxJ8YzrxtQTELIundMKBwKDmaQ4Idm1EYihOLEAZNK1ihMfKiqgR9Q2ytIdjCsMNbV8JCGe63XxlpuLiHXZTssct5YmNhY4ff71eJ9Me2wXg9bUk31G6BnGbZpr436evxiOkBhBQLQAAN0SURieH5xQaYGFwiOggfqH1euIm2TkjE5WYAWoioifQz9yT9irDCVWSHWyooWD4a5PKrHjek9JwCBCFoByoiYZju0AahIDkYlrrIYjodG90enmQMhxQlAFo8qVrRSQkKOw8CUrgOxFcZTlnz6+f/3fuwH0d8u/w6RLM1r4svlrVTCvHFGsSINUpHLHga////9n/I//9AQARAAAUrQKAAAC0wCW48RRUxXA4iaKgRIf8MGwUlKUwcIvVaia245ap8xPmtaMa7VpcWWSWMhx/C+cGetrfWPmvtBHpQ1QxAah0X//////////1KAG1AHw8GAFIAMMCRfPu8gO9ZTMPwwBABoyJ95oIYMEQKDwdKOj2tKJy8fFSJddr+lx1cBiXIvbLJ//uSZMMAAuAoxtO5eUBJo+j6dwwoSmB3IU6x7YFPDuLd3DygCHkdI2Kigk2M2tQ3+ETGZ0j/+1kGZ////+z9nrYAqgcMgaSi4ZPVyYr5IFxBJGgqKWgVynZYJVxNmAzlOlCme6hkiq/OX+qQ08wva0hx3qGQA0WZY3EZ8wSD2inVR9P3d6t3//+/6KaQKgGJyNuyBQBMKAeP8IJOV5mMUQnMDAORqUi1BGJ0EOQ0BU41LZ9MaYfR4mY0R3nf0sCVgavSsq8uUJxNFIB9NJG2qIVD1a7Pdbvu/1erXExv+3/6P9LhYCEUVmL8GBoWmc7PH1zMmOQECZzcFv2+FqwcMtK6VIBFOFja1a2uWkqzMFzAFzBa9V5+hSFAv91l4hygw20MAvR1adun9X9yUf1+n/6f/7YEBvgoCYwJgFzCHBIOFsXE4/AwQ4okHBjAYCyWl5TKQb8RzETd5kbws9pIkyFvZXl9rCpepHfiRugwI/tDcoY2pWHDv/TxmccBASKr3LNDLDMRD69oOvX3+QdEVFWuz0o5Vc27K6G/Y+a7kG+fSP/7kmTbgMKsKEbLrBtQTAMIcXcvJgsAgRruvE1BPQuiCdwwmO6iCYRgwAZrQFZ9+npjmBgR2TKbqmBy4MHZj4Z2MwJ1tbVPqzp7WmLwV+EG4yXgzV749kdCzLqCEdTb7qd733p8Vmmp/1F67PryOaV9CvUn932ACBlWjGLNmIwTAszW6QuM+E28wgQWDdUtepugCLOo1BQyQcDQG0KLNyi9PBV2nn6OmpKlhpCeqGVPO02VqUNZSAh6BNTVPbpb/467jasNJHOSxSYs6vv+7R1p//L/+53SPX2bGp6jNYEAgBMBQUNyTZMH4+GAlZgOAizel1oSKXGq34DA4RI8t8ajah5ww3Vw33lqQa2TI3nl5wwslFVopdo7dSNX7v2fqLf/60f6qkx9GyoBKaBsA5iYCYehqFsBmhKf4YNIMpkgIOsLRMGrOAQaWvD0gb63N5z7rym3fxtdymIzBqAGzen9RJ/XcJcL9llixLqcLPPFjhhCruzfa1Kt+Y/30O/3GcU463uORPX7fpckCmqZCyAlBM1iJQ58Psw2AIuGo8wGXJf/+5Jk9gDDbR/Dq9kacFLC+HF3DyYMxG8SzPsAQTMLIcXcPJgSIdAtOGjCEEzEp+0zvuSEtxLrT0+ospGU+CRE6Y2CrF2++h3uo/lGUhRH03eLx2vt3opL6apm3rHRQgoGCaMGaU0wB3vCWmL8Ake9iaRcRFgKDMwOXmMOhCGdtJGhRUoHvVNALtw67k9ffrCdXUyMEAICl9ijdtEZZYjSkwyCYds0dTLO9lUz7TAqeKODBwFQsYUKhMq5qRatSmRC86uOXpvDuEm8i776xX51hT7dOoIGq6SNgZKg0LFc5VLsDDUW9LhqWTbX5YSNVBNPoTTPnjWx539Nny+c7/0sreAYbAmwNpVLpvv6s0tC6LCBUS/2PKopKJlpOHEkeRvv4kuQMqqdTEFNRTMuMTAwVVVVVVVVJNBQsuYJAexkSNemvmmyYZINR3ZmSYpuhOOhUdBmhaZnDjtWdmmeuWSyWQzGNv7lVyU4a6FCvZKr1u2xBsa6FYX+lt2nnChUFyL1RVLpFKGtFzDBYdngApP5ZHmPf33MfANTH4HWKsZ9QlaY//uSZPsMQwYXxBM+wBBPwqiSdM9mDvhvCA17QEFKiqJZ3DCYejhDuBFkV8qHkoBmXxAGGkPDAQqyEoU+82vTpYypZSn5eNLwaoZpuMdl+Hscu7uZocgOPwVSB2i7zfS0qHIX6dOtOgg4kk1iB1y2k9feAlaf+9+5typj1MUkEQEV8y5vDAkSz4/Pj125jFUMwxhnWj60xLt+EXkx2WsymFXFYm1OPoMlMxdSTn+PU47gVbFauxynjH1SGJzm0CpI2Mev9qfXT26rS7QG+4wHWH2ZTchjlVjXmRSn3N9iZsAERm7jqzWTGMVHE8soQ4YLfYBDcfTYiiictvNAKG/Rn+zB3MXdpnrYQoeXJBohdy2u1bKuQ7//0VtdZo//3e//UkxBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqi2xtRmA0FkdVTUZ3vAhmLIAyTqzDDQoYBwOB6UdbNq30URXVsT3it1pNmUP5MbnZ2PsnZwGBbrXn1xgxxlOhgm1iLYUlN9qlqbufyroFEwXtKJtUXAdriSJhCFJdP/7kmT1AAN+F8KL2cEAVgKoYncMJgwwXRLO4eTBBYri5cGxmOphx12xySy0o+PknoOoKpegyXSK1pVkKntYwSrJEAiKWqAgbmibMHyaNmMoIE0TGRHhW5YOkLFVNZS9ZSI04w1a279PPvDuYsUuI13jt0KY2W+H1Z0PKGPe9707FoP5SlCyyv91jdlv9Wuz9nX/06VmgAg2VWhWkkk8LIAKB5yKfRqOjZgOBCqoqATrPnEX/Q8ZBGX1VhX71V7tlfbruCyiQGo7nxqtKAwguObpsHlBgXuke79f/5Lq6P9rp7++7/6aAIFVT//3ghtbBs02YhoJSqoIc6GxGtJ+0mhyAV6jMu9RBAV5eYYKMH13o09je6y76+/9+jf//3fot0UWTIHI1zCcBhOkoJU2V1QjEBB3MEgE4iAzOEUVFUEWir5CQhgkIoATLwjMFPA88Bxifor/c5KQqAY5C/ktvyqMrAHlrWJbOXJ3lDh3HW9VN0+OH9+mxhEDivExdiQVQSAxFL0rmlgBzVGlqvoYVLjzK0WzZbRHmkj2ixcXMOB++eX/+5Jk7YAD0RxBgz7QEFQjCFF3DyYKIGEfrr0tIOmKoyWxlYiPQSYTBVyUAAaqG3dx6BEVzL5iO1I0MHC/21fefcyyQAmBoFqx+BqMADR5xOokEJ7eVNYyIIRCqQrS7/xjf7NH/pWrYdR19/6Uf9Vl/WExKmsBw2YLoWxq0ndmyoCUYawBJ+mBGKji+VhmTihSmMtbZudaagmN17dmP2dzd6Jym2oE/czfp5+ISxdsO5SW/U3qnsDzwTcUPlB0We259TvZmCan+QJkFzmw3WVM2e1tBwj0K2uamxbhtFeuxFmoSjAoGTLoijtM9zEsBiICUji+0vJWqAJky3DbtDLRbMO3b/4l+NLxMaX3JJGUwhUr3+9SdEDPD7Sy8X/t/u/Z6U6qvZ93/p8t6jMJzS7DBOGxNjCTw0gVuTCvCqNLtkpwihwSji/xA4mCt+PI7IQvRBDau098BUMzJZJqWPqvlc8xLoVFITGFFHTfaLRqNTf279VodNhoiWYI5WgMn1FR7FiSOF72k6FitYlWD6WCzjtSl28oDD2ZkDgKkm58YlKl//uSZP+MhEEgQYs+wCBGQpi5cGl0DaxlDEx7IEExDmGF14k4PQwIlrTc0VEigAgrVTxJokIQM/scyXRBGEVgK0cgCRZLZr7hAM65XcXpW5Vha4rtRiGA0V1xd7r9+/X0iYtTX6Sm1us8phkiilQlvT5pFl7bEPr3eKdJDiIIwbzAaDmMcNlU0fzaDCLBXDgJCqAKhikzB6hKOiPDLnRia91pgRRcpU4+5pyXk5KBoZvQ+dPNIZiuffiWOhQaJQpr1NtlGpvNetpFtDmcpoeR1vqFj3dJLA6RZCnLTl5uQ2G1uf9b+skBomdZOHnB1mJgCA4D3labQssh9HV9qYPBsTpTaazIM1Prokg3mTpy6JZvnmecqWrU9ydYr02SG+lfRZX9/aYq/6Ltul6dW0yqi56sYLYgZlBvUHHoCwBiMDqsTJBC/xaVUypgAGXlK2b4L5lrMIBgOGH5pZyp21NWE9GCuv2bmJfKWQAoPFXmt2sqTSeLDdX+5jLl7OtFatrX3tiyr9Fi9ODe17HJ9SMWccZo6+teH6NMeNbc9nS/NXt/3v/7kmT6jIQCGUEDXsgQTWKohnDIYg0gYQos+YGBKgrhQb6kYN/6dvyd8KVxey4EiIJ/d8MyRroGGxyU/hgiLwsrgCLTNI8MawEqNie/BQA0iKMhInPO9v06P1s+7X16f9F7vbv8WehVTL3uBdB0YKgQRrsLKmgmkiYVYKxyQmyQhPVjQhb8cOUAV9LG5JyPAy14nevS/CQxPC/L4Ahpbr2R6fp56EOCr13pPHqu5y12rmYJZ+f/WYtMo+eNKgZTwP/xP+irfkNZO3bX9up+fd72sg461udhumuhft3f/sjuWvnp4toXoFxspJKtAayBgfNB2kG3YfftV7pY8dHiEAgIgxFs3zqya07O0YNgNJIz27+d7+jq6Vf/d/1J/3L9aUf9umoOyEAR1DAtARNqs5I0VzwjBvBJMA4BIwBwEwgBFImHWqJPFwLKul+l0W5NMiu67jPsxHjy55NbRDgYY0OfhzRkth9WQhf8c/0LK9er5VX8rJJ2tmTvTB/ck9fNrPbt6meeZa/M6X7W/qx8Mvh/szsVyyI3mdk8iJyuUyf8obb/+5Bk+I9D5xhBAx7QEj0iGLlwI2YPcGMECHsgSPMK4p2xMZj/g+yrr0Asqt2EKjMPDc/sow4sJsqUYIJwlE0nS8jW01t0vHvmmG098qDotoLWnZmvcHcTs8mheLfVxXts1XLR/tU25+KV1b0UaDYEFxEzTAmAAOBA0s2uhDwwWk4UEGTLASvT6b0tQjIySAVhhI9HphFKlUu8RYjDWh6m+Ima6hWI78ehvBWEsxHezRK7z/8zkd253LarCLl+1g3Lf6tl15V4r/+t5NZ1FuWGT7+8T5HDaWCPft37dfqY9SEjtQ1P9ufIuda/GVNWLAQBmH5UcXneYdgYogqYgGIIjkKQHE1SvDdJelMdr/b/Oxbv/204FmrG2O0t766LNlMlQdveTfKI16mjvtTbpTu++znkFGxAtf3GakwA8zVUyiAzAPAkNFMQo5FYkwjBYnhAh/ulAj1AIKi19dm9HQwzKt+H88ePD6bN8Itlh3o2LC+PM8VLJSa0UQrFnvAy1HIWADxhRjHFzixS5qTZo0UrF9trYYIpawWqWk814/F7xoj/+5Jk/YzEHWbBi88bwkVCuHJxiDYPpG8EL2XlCTUK4QHOsEigACDplQUvm+HnCyGyRMccCQrMzatKMCg0B4CTl5UIz3ilGO4E7YYxlAynLaj/EXOG1n7UkMQy3hJQaNXxe7u921Uz0o2ye17H2dtKP96Pu2NR/15sKIVslT6MGAVPmCsNgWEMLQJBgBTyQC6rdEyhK2NCCKkxb1aVQ57wwnAkyH6xJO2NrxSrE+tyAGFhYoqMLUCEegePABhYgFBi0ihckPQAZCOm8kXG1Bg+meqaPYOYtUvS8ahEja4Yl2ZYdSLIR5VcYw18lNhz4ViwoCQxJaLHqD4vlF2rVHD39GCAfVJwtA9Z1HNWA6+1xnSL2/2dbWWq/dzPR/29f/YuIghAMMAgCcwYQ5jYLTNAWTphqAEjwP4kCCqkrlsCzQqgKGQDyheCqLsuhOOZMxiP4w/Vp5I/hfcOY+ssjeecORcAjUIuzted5btXd0+t8KLb6FWM6UCk9PL1l7o7TQlYwYZatNLqq6OxphLTFQyoJIbRbOakiwjSnIVSfHkbI1lu//uSZPIBw5MYQzPdeIBIYrhAcekmDYhdDM6Z7IDvCqIJxaCISVdekTndDiZZQFpsNxri7GUVAY67Yq5Swhk4onCVaEBZlrdIvZnc6F9qZQIWsrM2zbS2Btjmw5zjAJMML91EW1xd1X01RG9IXscUr7HoX1X28t7rn0JfdoZY9ymLL0ALCuDAghzjLyDc11zDEKjAIE0DZKxNqLLwrGLwkk1IVWBPXUPaR1tKEO4MQG4/RrjWwGXW/x0GBGxpMeqKipU6Pv6TxpIDLGQUHBsoc7TCQiWJLYtKgIkJkhhBj6lt6yEzwvGANr1AQeOA73NvhZqdS10jgyI5+kLxkiQIoHMHQ1cKRSvNx8fjwLBs11d0oNschL9D8qlITUmKtIezPbx4vff4kIrVTaiVf67zWdQ8ov2MemsRhQQllMAQOQweU5zKvJiMDUC8mgJHSETBhDchgYWC61qyyymsx6vTwin19aVWqdmQsCVT89VqQ5GFTxC5W7l9ulk9HuNq6V/76a9Bqr+Dan/eou1lelJLr7WgY+wVYg673ft8dFqdyJ5m5f/7kmT/jMSoY0AL2BrySQKYYXBrZg3gXQgsdYEBHAqhybSgmN22hWmvq2svZl/Pkf2NFWAEUZYbUTbrYvUa4OhK6ogBZDn1CoT7Ipkmf/OsDCnVyjtnr33/edK7+x/5nV6nIQ3f+pNnWv/u+oWA5MAoBYwTQvzONXkNSYQMOFdMBkAkdAUWcuYhqdBSqUYyGhJgvT/U+32HSPbJ4zjITcEaCLbnsli/HYd4NUf0jUxCAjKOzaZHFrI7uaQkeYdSJ2jLmp552Q7Ry39+tkkpUnUyctCZqDRWIvdsh8VA37+VyNCnigfGxcrZnwgSa1aUop385SXBnJXyMhMIUywo00tjj/HEmRvq+wJ6b6fUYBWuptvTrf7kIFh87WPkr7JWR3J/6dnkGevRjOytn2dXxo1CORp6qkaSgBcwQAZDUEO7MicYMwSwCBoCEwCwABUAIwAQEGHypIBSIxrL4CvclawoUhrXiLC/Z4hAi/Ihqa2JqXCQFmiqKMuruoufT4vzvG2zu69rFSKfVyOHzPhf5MFhRZpe5Mp6Opii17g6c8+LJxT/+5Jk9IwD1hhBCz7AEjiCGLptIyYSDaD+DzxpyN6KogmzKOC5ZTEThVSrqueh338iPWwuZU3aunbDH4TXSz+CQ+KCoQ14u104gIOjZg4HfyB3DEYJHEiqqWd7ZluMIKu75yhZQ2w+OM9M10VehP7/TsLVkBUGLgLQl2nuyLuncKdEWWRcisJgOgNGoOQ4Yl4vQJAFFAClL0e2RLrfCErPbWKLRddr0EPzG6K5925NfUcSCGPQ5MYWbETl4iADaBfmrlmtTayz/fcKf0wnPAaCNw5gLIMnHJbIxnp41DGQ5EnUoRLyeRjCA51bM5h4UW4MrdK0qP9oXuOhyEb8G45tLgAICnEkkq1lpRo24DsL9i1wWpHGJXpdjH/ZCX0aAmlaSQylL5juRfs/Q9tmXV9Xr37X/+6Lf6OiIMeAIEYAhgHATmnIG2ZEwUYYBoW6j8mTtL1MLGgDjLoex+nIZhuMLZJSPiFSrU2DlJUxtU/2qlnbPFvlEcjik4/oUJ/I083nGVtiU617SIm9/p2WmXyGkmaecZav76QHe5t9YvOqt0Iq//uSZPWNhFljQAPPGvJBQqhibMU4D8FxAi8EW0jdimK1oZTg5x11q9BxhryoK5tlLSi+xMCWtJmgMEYYeMm6e0Rgpopn08DWVaShbnxJJ43oqyHO7d+cW6q1XUM9rzNqgk0DtuOHC/u+dv/ey+KofvpvS269LdKLdvv+ubXYZGgEEdTAdBMNKsJkyEwrysBsQgDJ0KuTXLmNySoUR0p03GU8EiyRlc68CS821EqREF07UrMylekwUyHpGPUZ2Mjm5eskc+7UsoRyz/znPS0JUhlJS95kmORBzuXLl+b82LuvHPtiQ3qzna2lekq1lqhkrpEs97K5J5FZD56GRT9Cw1Kgs2Ze8BksicydJngEC5QKE7osJMdzKs9088WO61WA4tOJZcjxSxXZ+MTtFam1VVIRp/XY79+xj4xYu7YCSOSoq0tSo0YCBudgKEYuIAKgGyJ1HpdEah7oaP5OrKuOxguo4XzFljR/RRhLBCXcJgi6UylbnTl+46p/sbOxn1/ldDrFoC6UlzWr8/5kRfm+UzJpTY5Fc65Ww14dJTQ1tJyqSv/7kmTzjKQfZsCLzxriP+KYYW0iJhBdqQAPPGuI/YphlbSUmH/L+532vt4PiUWbskFO9VW8NLDEriBSTIVsBAan7/pqPjmQfxByQTtLxqjZQ4dRfeUbOi6zXs6+zb/1qsqQ3UuP/f//6PV8YFCFpVAUGioczx6bsHiYNAIj+hChOloJcuRdhF45vo0lLFCTzOsPp41axY6oLkAxJZWx4lFRGJGlnnhDUzjF2UoYpJ5eNI8OTPGM/eKTLDedKITqsaGqgu/nfI06l1YX1WY/PLUoDg06StlkUK1TUl/I3HQd78Fb0O5e6KpIQ0nrqdwQIg/7IDQs00lbWNEXcVZBhNo7H6FY65Kqc37lBQSjxCSCDKDJVj3ip0Ay+5byzS4CUoXpTWtVJJ4pKKLh1xr1kKpjJITFYSqsQ5+Hb00uaMCSAKfH3wEFWb+vmgMaIAeZuhB9ZGLByQtKFJCrEAWI5ojSia0fUbqqUTOBRvw7RguBR9hWe9gEWJGCd6DqR90m6MhgEFq0k3ECmPfQPCREmEBKquLicW3WEUg0J1NYx0HWuZb/+5Jk74wD1lhBC68aci3hOLkHJgIQTWMALrxpyVeIYMW0rOAKu1xdxG+vDjMzb4wyc8gsWggKIxI2yBIcRpO0/sURGO8WCjpk/HlHNGZO8mghZeqW0NRQuryWgZc+9b2XLWxLc7FjO9Sfm7VpJZDYSyKAIABkBRAKxipf5rExxgwEK6VM1CURB4EIKISJ8qDzXTi/QqlmHNIGYLYdZZA5VNp/RMKNGhgBdRmGUGTCtMKLWuSqaoGNxggxmFJ2Dx4MKXSMmFdNR5Lcijd+g09YOsNCRvJxDwq2YOkTUoONsWPj0A9SRAVsa9HyGCrejufBWBjD9BLfkqxy2xlW+/3K4weh+bYO8sT2BoJJrMeo31GN+47hD5AQiwALxZ3QzTMUwxW9ArXcte5FAQXopSKb63zG92wEL+yrejI98ioAPTSsX5RAKoNNd7I2AzQUBFB4w+sld+LQRTPanQYxAbPrfTVoUS8lRpPpdPHnDiWmWYtNO8UmQIjn336klIPFRuogVaQXtA0d8vO776HkD9eo9DJ3A1P/PV59H6TP70YPLfdx//uSZO4AwyAYQ8ubSJBF4phAbMMoEa1ZAE68ackAiGGFowjg4CU/XtXdoCKW3VlrtnfnwctusWFDCcUed3MGzCzjvnqziwWzc2zWNU8fYtZ/uF49Q801nASmpKvnB1N1Iylo5jP2uDtdxKo1S1aliZuaZYeT4tpcOQ9Tqw4gHCgoOoX08uAhYhIDE85TaA0JQcAXLCG4Lzw+W2ybZn7EYlAm728tIigLTZejgtgmf7kRK6x66bjBoJ02CMO4jKOxT4xj3jliUwcqMxjlfVKZAzMqfOeadzNv1o/arsL09otJKnliaa/r6/AFNkDpF8zrdqEx83J4EOKEC2kWUkFGOY4HOKWY7za+Mo6EIBCBmljQ3KasluK1P3LS7IKJFWiYWUlTmvSWlIkdY4VSxezqCDN5JYqxI3xSxhumQAHACyYeDI6JW42MTIwsAUAgFH2VypMRlIyjJjOatozV0p72w27zqzGUBiwsejAo1Q1tEfEYyCLcvThZESExWtmIeF5FLFNzPk2mmUPbzlYrkTH5yugc3OEVaNnSNnyRTTmdzaJ06v/7kmTxDINtFkIzhnsyS8KoMGzIKA8FJQZOMGnJJQihVbMIoKzMmjOj2bRe5UjLfVTvc2jHtS8MiwSlnAGxSqzEgcI8MVW+Dhh+tD+podMpOiL9jJ1sqAiiEK6cQAZeg65601uVptS5o65lHUOkfaLwzr3bZ5QoMf0qUlbqaidA8ILTBIID0YxzWJhTA4GmromsHetThp5UAZNCLZOhAGk8cFxR15b7niJconN7BpuzxnJXeBvfOpL0x2QnRQjLiuD1vm/x393bm1tjLmRw0z5MIdMenrD86j05f/PNEF5qqkudQ4SkRgqHsr2mcmrcGLsp0pWpd4aEo8qlJEGYDJId2ElTXpQDF0XBBQydOKnSm/TNbObdr0UMGAcVFDR7NDlwFoqht4peIUjhspUTUy9LYpOuYPnGE1CpTUvUdpCKBiXJxBeUJsCTWPES83A8SwlVqPCVQSOkwUOEQ+GhfYYyR/IgL5PECQhoZltbW3rUt3ccwqXtDUDEUquh/3ZNJJsvq5986f97tlPh98+0zL76JymRHSnadKeZNeNZ9T1ue7T/+5Jk8o2D9mhAC68a4kPiqGZpIiYQHaj+DrxtSUKIoMG0nKhmLwmZ/+9nkSEM2x2HcZL45bu3cQOheK/0VHCT9sDL1gENGas66nRB6GOUrKFCjKFaXfkX9kVfKsUCAVb7v/dq8X9Pf7kslert+r9Gjr3E3tipQIKzyoBB8oNRyEqBhAB6okNVDi9qRj8oFI8xuMtH8rIz1Ov4sNla7Wgx10B7iVku8c1OmUZHd0apINr6vJijaEHjHFda0RWfU/QiNkzQdoCiK5vDTVG6dHhBoSNNCRuRUx4pmRaq1BnJMKGPcQiFDJCEEZi0doS5gjSuScBsruTsiR0HIiPdQm0nj4EBLJUneajLGPk8BFwhAntoujZxz9xJm+6sCKNDSj5JNBFDetZpsypmf7BfcU7IhTsER4k2YXO9eSpqh88q1ugislKuvJjUnhZVygEBhQAZgSCRyCiZj8lZgIAiVbxNJe1vYfg9JGRtbvuZDk5JXiMIsXJlJhCNH0W59SBIazCnK+xR40REdXJulmTM1pdQmsVX17FM0hOs6h2FG3urmrji//uSZOcPg39DQIOvGnIxwpiWZGIoEYGM/A68bYknCGEFtJSg7IfW9+5wnQsqlMjGO70jrWRUi7r5lDqZcLqmw5wGx5N7/AqfMB9sRO2qocE5mLkDroluZqAGLu4jc27NTWCFx0qklWT0Oe6kvTdmr7krUzP1fr0gDmU3tddrTXFb0fGG1OuStp0hRLb4iCsEYAEp07YHJT8TDZClx2NIKKTqjUAw2fXEertYYW2K7nVroUQKefqa+AEfuYvbX+2y0yZcymIItAo8StwyvnedtDFkyHsbIbSatuGONzliREOab18w2QNnCFDdNjWU4m9fd6PMdQvrXmOEJl6XhGqv10CWfrzr/HXGBx2Kgc1VTDPSn39N/doN9ZZLivv2bNWesec0jKO3vyvQ72Sj+5T302I0blLpVRADIcB5hoWxkHRplEJ5haErlNRWIsKmEyWYg5yJdIXaAEkRhEY4yNXcBKgUDTprEbAiBMTxrLrDzKbvG70iX5VXFLrDzEzUdJQ/uZX1kZ2g2vuXN6irm2PrnqNeoaZS6Qqkmueae+6vjWUgzv/7kmTqDIPpXsADphwyQIIoQGzCKg6VIQIuMGuI1Yph4aGImOHbWFuFHSsKr9/FXQ76gdq1uORJHm5hkAuQiAlCcoCLtfazcpJdN5XZ7P94PsTtd1OCSYE8qh6YXbjmUY+9u/sVS8lSYRM3UOk3MW0WkpgVnZkmcbrpcsWvUwJJP0kLd6VNAAQIAQAQABpZI1MY4S5hBBJ6qRDAGvQwiHRomgkEKVODHTCYHX026QpmVgVcAwBSI2VOah5gDkAqYgMOUO48xecQeGRxeBygpEhpBR1JqoQvQGrQbGw9kPGZEWLMmUk1MhE6DNCwDLjRFlmiJwvGSabXQRlAbYyh4cA5ZEyZMTxNGRsTPWqy0xzyUHAQwiozZGkkQQxNSkovHZig+gpaa1WIsRAi5IkHMCXIoakQIeipJJMumLF4yeyddFVddayuT5YIITBdIuUS2RQvE4RcnSfMUTUyUkuihU6loJ1f///nCuRRH///9FFjIQCgl1GpUilI9YxSpv3ni7EE+muymlnViPHSRp7QiA/SXa8muEGPBJRWlisHCQiT0of/+5Jk9QAEJWQ/hXUAAkliGDCtiAAdUhEK2ckAAlo6oIc0sAAjTd2VuJii0tjd9ons3NT5oeNPmp1D/fVJrJ2fUY6Ns06mS71Ltip9VxyKuLnqP4VX3Ne6msafo8x7JefZzX37ZprGqMtelDmtv6Um5as469p5R0R8////Ebf///////9YLf/ii0xBTUVEjdE1FxOmIfxBiFPCVD1FydqVDUNZbCoIgiS0RCoVYRCoVItVISXVUKFnJIkQSBoOlQWgq6VOwaeDQdKgqVBU6IjwNA0sFR4KnREHCwNRL/1B2VOiUNKBpQNHip0SgrBqDT53//BXYCBWAkAYdrkkSTF1kxMT3mly60DAQoeCp0FQVLA0oGjxU6VO//+Ij0FYKuUqTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//uSZIqP8z0WsAc9IAArgWWx5gwAAAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqg==";var za=new q("ResponseNotification"),Zd=.5,Xd=200,_d=300,Tt=g({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:e=>(e.append(F("Preview",Xa)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),Ja=null,Wn=new Map,Va,jn;function $d(e){return new Promise((t,o)=>GM_xmlhttpRequest({url:e,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=Xd&&n<_d?t(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var eu=e=>Uint8Array.from(atob(e.slice(e.indexOf(",")+1)),t=>t.charCodeAt(0)).buffer;function tu(e,t){let o=Wn.get(t);return o||(o=(t.startsWith("data:")?Promise.resolve(eu(t)):$d(t)).then(n=>e.decodeAudioData(n)),o.catch(()=>Wn.delete(t)),Wn.set(t,o)),o}async function Za(e){Ja??=new AudioContext;let t=Ja;t.state==="suspended"&&t.resume();let o=t.createBufferSource(),n=t.createGain();o.buffer=await tu(t,e),n.gain.value=Zd,o.connect(n).connect(t.destination),o.start()}function Xa(){let e=Tt.store.soundUrl.trim();Za(e||Qn).catch(t=>{za.warn("Sound failed",t),e&&Za(Qn).catch(o=>za.warn("Default chime failed",o))})}function ou(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function nu(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(jn=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:jn.signal}))}var _a=f({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:Tt,start(){nu(),Va=v.on("fall",({conversationId:e,outcome:t})=>{t==="done"&&(Tt.store.onlyWhenHidden&&!document.hidden||(Tt.store.sound&&Xa(),Tt.store.browserNotification&&ou(Et(e))))})},stop(){Va?.(),jn?.abort()}});var ru="filter:blur(6px)!important;transition:filter 0.2s ease",$a=`:is(${u.sidebars})`,iu={conversations:{selectors:[`${$a} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0},projects:{selectors:[`${$a} a:is([href*="/project"], [href*="/g/g-p-"])`,"[data-app-action-sidebar-project-row]",".bloom-recent-project"],hover:!0},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}},ts=g({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function au(){return Object.entries(iu).filter(([e])=>ts.store[e]).map(([,{selectors:e,hover:t}])=>{let o=e.join(",");return`:is(${o}){${ru}}`+(t?`:is(${o}):hover, .bloom-recent-item:hover :is(${o}){filter:none!important}`:"")}).join(`
`)}var es,os=f({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:ts,styles:au,start(){es=Ye()},stop(){es?.()}});var su=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],lu=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",cu='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',ns=g({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function du(){let e=`${ns.store.width}rem`;return`:is(${lu}){${su.map(t=>`${t}:${e}!important`).join(";")}}:is(${cu}){max-width:min(100%, ${e})!important}`}var rs=f({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:ns,styles:du});var uu=[yi,Mi,Ii,Fi,Qi,zi,na,ua,fa,va,xa,wa,La,Ga,ja,_a,os,rs],zn=uu;var mu=new q("Bloom"),is="2.0.27";async function Jn(){Rr();for(let e of zn)e.updatedAt=zr[e.name];mr(zn),await lr(),It("base",Ar),jr(),Gt("Init"),jt().then(()=>{tr(),Gt("DOMContentLoaded")}),await Or(),Gt("HostReady"),mu.info(`Bloom++ ${is} ready`)}var as=new q("Boot");if(window===window.top){let e=z.Bloom;e&&as.warn("Replacing another Bloom++ instance",e.VERSION),Object.defineProperty(z,"Bloom",{value:Vn,configurable:!0,writable:!0}),Jn().catch(t=>as.error("Startup failed",t))}})();
