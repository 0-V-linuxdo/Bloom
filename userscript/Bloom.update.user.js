// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260928] v2.0.1
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
// @grant        unsafeWindow
// @compatible   chrome
// @compatible   firefox
// @compatible   edge
// @license      GPL-3.0-or-later
// @downloadURL  https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main/userscript/Bloom.update4.user.js
// @updateURL    https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main/userscript/Bloom.update4.user.js
// ==/UserScript==

/* Bloom++ [20260928] v2.0.1. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var La=Object.defineProperty;var Aa=(e,t)=>{for(var o in t)La(e,o,{get:t[o],enumerable:!0})};var x=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var St=(e,t,o)=>Math.min(o,Math.max(t,e)),C=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),kn=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,we=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,G=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function xt(e,t){return`${e} ${t}${e===1?"":"s"}`}async function Pn(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function qe(e){try{return JSON.parse(e)}catch{return}}var W=typeof unsafeWindow>"u"?window:unsafeWindow;var An={};Aa(An,{VERSION:()=>Ta,init:()=>Ln,plugins:()=>pe});var Ee=new Map,wo;function Eo(e){!document.head||e.parentNode===document.head||document.head.append(e)}function On(){wo||!document.head||(wo=new MutationObserver(()=>{for(let e of Ee.values())e.isConnected||Eo(e)}),wo.observe(document.head,{childList:!0}))}function wt(e,t){let o=Ee.get(e);o||(o=document.createElement("style"),o.id=`bloom-style-${e}`,Ee.set(e,o)),o.textContent!==t&&(o.textContent=t),Eo(o),On()}function To(e){Ee.get(e)?.remove(),Ee.delete(e)}function Rn(){for(let e of Ee.values())Eo(e);On()}var E=e=>(...t)=>t.map(o=>e+o).join(" "),Et=(...e)=>e.filter(Boolean).join(" "),Te=e=>e.length?`${e.join(",")}{display:none!important}`:"";function p(e){return e}var Tt=new x("Storage"),ka="bloompp",Mt="kv",In=null;function Pa(){return In??=new Promise((e,t)=>{let o=indexedDB.open(ka,1);o.onupgradeneeded=()=>{o.result.objectStoreNames.contains(Mt)||o.result.createObjectStore(Mt)},o.onsuccess=()=>e(o.result),o.onerror=()=>t(o.error)}),In}function Bn(e,t){return Pa().then(o=>new Promise((n,r)=>{let i=t(o.transaction(Mt,e).objectStore(Mt));i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)}))}async function Oa(e){if(typeof GM_getValue=="function")try{return await GM_getValue(e)}catch(t){Tt.warn("GM read failed",t);return}}async function Ra(e){try{return await Bn("readonly",t=>t.get(e))}catch(t){Tt.warn("IndexedDB read failed",t);return}}function Ia(e){try{return localStorage.getItem(e)??void 0}catch{return}}async function Dn(e){return Promise.all([Oa(e),Ra(e),Ia(e)])}function Nn(e,t){let o=JSON.stringify(t);if(typeof GM_setValue=="function")try{GM_setValue(e,t)}catch{GM_setValue(e,o)}try{localStorage.setItem(e,o)}catch(n){Tt.warn("localStorage write failed",n)}Bn("readwrite",n=>n.put(o,e)).catch(n=>Tt.warn("IndexedDB write failed",n))}var Ba=new x("Settings"),_n="BloomSettings",Da=100,Na=["GM","IndexedDB","localStorage"],Ct={plugins:{}},Mo=new Set,Ge;function Ha(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=qe(t);return!C(t)||!C(t.plugins)||!Object.keys(t.plugins).length?null:t}var Co=e=>e==null||e===""||(Array.isArray(e)?!e.length:C(e)&&!Object.keys(e).length);function _a(e){return Co(e)?0:Array.isArray(e)?12+Math.min(e.length,40):C(e)?12+Math.min(Object.keys(e).length,40):3}function $a(e){let t=0;for(let o of Object.values(e.plugins))if(C(o))for(let[n,r]of Object.entries(o))n!=="enabled"&&(t+=_a(r));return t}var Hn=e=>Object.values(e.plugins).filter(t=>C(t)&&t.enabled===!0).length;function qa(e){let t=e.map((i,s)=>i&&{candidate:i,index:s,score:$a(i)}).filter(i=>i!=null).toSorted((i,s)=>s.score-i.score||(i.score?0:Hn(s.candidate)-Hn(i.candidate))||i.index-s.index);if(!t.length)return null;let[o,...n]=t,r=structuredClone(o.candidate);for(let{candidate:i}of n)for(let[s,c]of Object.entries(i.plugins)){if(!C(c))continue;let l=r.plugins[s]??={};for(let[u,f]of Object.entries(c))u==="enabled"?!("enabled"in l)&&f===!0&&(l.enabled=!0):Co(l[u])&&!Co(f)&&(l[u]=structuredClone(f));Object.keys(l).length||delete r.plugins[s]}return{bag:r,source:Na[o.index]}}async function $n(){let e=await Dn(_n),t=qa(e.map(Ha));t&&(Ct.plugins=t.bag.plugins,Ba.info("Loaded settings from",t.source))}function qn(){Ge=void 0,Nn(_n,Ct)}function Ga(){Ge&&(clearTimeout(Ge),qn())}var ue=(e,t)=>Ct.plugins[e]?.[t];function me(e,t,o){let n=Ct.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,clearTimeout(Ge),Ge=setTimeout(qn,Da);for(let r of Mo)r(e,t)}function Me(e){return Mo.add(e),()=>void Mo.delete(e)}function Lo(e){return e.type==="component"?void 0:e.default}function g(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>ue(t.pluginName,n)??(e[n]&&Lo(e[n])),set:(o,n,r)=>(me(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&ue(t.pluginName,o)!==void 0&&me(t.pluginName,o)}};return t}var Gn=e=>{let t=()=>{let o=ue("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();me("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},Lt=Gn("pinnedPlugins"),At=Gn("starredPlugins");addEventListener("pagehide",Ga);var kt=new x("PluginManager"),pe=new Map,Ue=new Set,Un=new Set,Ao=new Set;function zn(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),pe.set(t.name,t)}var ze=e=>!!e.required||(ue(e.name,"enabled")??!!e.enabledByDefault);var ko=e=>`plugin-${e.name}`;function Fn(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?wt(ko(e),t):To(ko(e))}function jn(e){if(!Ue.has(e.name))try{Fn(e),e.start?.(),Ue.add(e.name)}catch(t){kt.error(`Failed to start ${e.name}`,t)}}function Ua(e){if(Ue.delete(e.name)){To(ko(e));try{e.stop?.()}catch(t){kt.error(`Failed to stop ${e.name}`,t)}}}var Kn=e=>e.startAt??"HostReady";function Pt(e){Un.add(e);for(let t of pe.values())Kn(t)===e&&ze(t)&&jn(t);kt.info(`${e}: ${[...Ue].join(", ")}`)}function Vn(e,t){me(e.name,"enabled",t),t?Un.has(Kn(e))&&jn(e):Ua(e);for(let o of Ao)o()}function Wn(e){return Ao.add(e),()=>void Ao.delete(e)}Me((e,t)=>{let o=pe.get(e);if(!(!o||t==="enabled"||!Ue.has(e)))try{Fn(o),o.onSettingsChange?.(t)}catch(n){kt.error(`Settings change failed for ${e}`,n)}});var Yn=`/*
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

.bloom-slider input {
    flex: 1;
    accent-color: var(--bloom-accent);
}

.bloom-slider output {
    min-width: 3rem;
    color: var(--bloom-fg-2);
    font-variant-numeric: tabular-nums;
    text-align: right;
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
`;var Fa=new x("Events");function Ot(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){Fa.error(`Listener for ${String(t)} failed`,r)}}}}var ja=new x("Dom");function a(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var Xn=document.createElement("template");function Jn(e){return Xn.innerHTML=e.trim(),Xn.content.firstElementChild.cloneNode(!0)}var je=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),Ce=(e,t=document)=>[...t.querySelectorAll(e)].find(je)??null,Ka=16;function Po(e){document.hidden?setTimeout(e,Ka):requestAnimationFrame(e)}function Le(e){let t=!1;return()=>{t||(t=!0,Po(()=>{t=!1;try{e()}catch(o){ja.error("Scheduled task failed",o)}}))}}var Rt=new Set,It=[],Fe,Va=Le(()=>{let e=It;It=[];for(let t of Rt)t(e)});function D(e){return Rt.add(e),Fe||(Fe=new MutationObserver(t=>{It.push(...t),Va()}),Fe.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{Rt.delete(e),!Rt.size&&(Fe?.disconnect(),Fe=void 0,It=[])}}var Wa=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),j=e=>!e.length||e.some(t=>!Wa(t.target));function fe(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size");return}e.getAttribute("data-bloom-text")!==t&&(e.hasAttribute("data-bloom-text")||e.style.setProperty("--bloom-text-size",getComputedStyle(e).fontSize),e.setAttribute("data-bloom-text",t))}var d={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]'};var Zn=/[​-‍﻿]/g,Ae=()=>Ce(d.composerInput),Ke=e=>e instanceof HTMLElement&&e.matches(d.composerInput),Oo=(e=Ae())=>e?.closest("form")??document.querySelector(d.oldComposerForm);function U(e=Ae()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(Zn,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(Zn,"").trim()}var Ya=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function Q(e,t=Ae()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return Ya?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function Qn(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:s,value:c}=e;return{first:!c.slice(0,i).includes(`
`),last:!c.slice(s).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var er=e=>{let t=Oo();return(t&&Ce(e,t))??Ce(e)},Bt=()=>er(d.stopButton),Xa=()=>{let e=er(d.sendButton);return e&&!e.matches(d.stopButton)?e:null};function tr(){let e=Xa();if(e&&!e.disabled)return e.click(),!0;let t=Ae();return t?(t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),!0):!1}var or=()=>je(Bt());var ir=new x("Network"),Ja=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,Za=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,Io=1e3,Qa=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),R=Ot(),Ro=new Map,nr=new Map,es=1,K=e=>e?Ro.get(e)??null:null;function Dt(e){let t=Ro.get(e);return t||Ro.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var ar=e=>e==="user"||e==="assistant";function ts(e){let t=e.author?.role;if(!e.id||!ar(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(l=>typeof l=="string").join(`
`).trim(),i=n.filter(l=>C(l)&&l.content_type==="image_asset_pointer").length,s=e.metadata?.attachments,c=Array.isArray(s)&&s.length>0;return!r&&!i&&!c?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*Io:null,text:r,hasFiles:c,imageCount:i}}function os(e,t){if(!C(t)||!C(t.mapping))return null;let o=Dt(e);typeof t.title=="string"&&t.title&&(o.title=t.title);let n=t.mapping;for(let c of Object.values(n)){let l=c.message?.create_time;c.message?.id&&l&&o.times.set(c.message.id,l*Io)}let r=[],i=new Set,s=typeof t.current_node=="string"?t.current_node:null;for(;s&&!i.has(s)&&n[s];){i.add(s);let c=n[s].message,l=c?ts(c):null;l&&r.push(l),s=n[s].parent??null}return r.length&&(o.chain=r.toReversed()),o}function ns(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}function rs(e){if(typeof e?.body!="string")return null;let t=qe(e.body);return C(t)&&typeof t.conversation_id=="string"?t.conversation_id:null}function is(e,t){if(!C(e))return;typeof e.type=="string"&&Qa.has(e.type)&&(t.handoff=!0);let o=C(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(Dt(e.conversation_id).title=e.title,R.emit("conversation",Dt(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&ar(n.author?.role)){let r=n.create_time*Io;t.conversationId&&Dt(t.conversationId).times.set(n.id,r),R.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function as(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:s}=await o.read();if(i)break;r+=n.decode(s,{stream:!0});let c=r.split(`
`);r=c.pop()??"";for(let l of c){if(!l.startsWith("data:"))continue;let u=l.slice(5).trim();u&&u!=="[DONE]"&&is(qe(u),t)}}}async function ss(e,t,o){let n={conversationId:t,error:!1,handoff:!1};nr.set(e,t),R.emit("generate-start",{requestId:e,conversationId:t});try{let r=await o;r.ok?r.headers.get("content-type")?.includes("event-stream")&&await as(r.clone(),n):n.error=!0}catch(r){let i=r instanceof DOMException&&r.name==="AbortError";n.handoff||=i,n.error||=!i}finally{nr.delete(e),R.emit("generate-end",{requestId:e,...n})}}async function ls(e,t){try{let o=await t;if(!o.ok)return;let n=os(e,await o.clone().json());n&&R.emit("conversation",n)}catch(o){ir.debug("Conversation read skipped",o)}}function cs(e,t,o){let n=ns(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&Ja.test(n.pathname)){ss(es++,rs(t),o);return}let i=r==="GET"&&n.pathname.match(Za)?.[1];i&&ls(i,o)}var rr=!1;function sr(){if(rr)return;rr=!0;let e=W.fetch,t=function(o,n){let r=e.call(this??W,o,n);try{cs(o,n,r)}catch(i){ir.error("Fetch tap failed",i)}return r};W.fetch=typeof exportFunction=="function"?exportFunction(t,W):t}var ds=new x("Route"),lr=/\/c\/([\w-]+)/;var us=500,No=e=>{try{return new URL(e,location.origin).pathname.match(lr)?.[1]??null}catch{return null}},v=()=>location.pathname.match(lr)?.[1]??null,ge=()=>location.pathname==="/";var cr=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",Ht=new Set,_t=location.href,Do=v(),Nt;function Bo(){if(location.href===_t)return;let e={prevHref:_t,href:location.href,prevId:Do,id:v()};_t=e.href,Do=e.id;for(let t of Ht)try{t(e)}catch(o){ds.error("Route listener failed",o)}}function ms(){let e=new AbortController,{navigation:t}=W;t?.addEventListener("currententrychange",()=>queueMicrotask(Bo),{signal:e.signal}),addEventListener("popstate",Bo,{signal:e.signal});let o=setInterval(Bo,us);return()=>{e.abort(),clearInterval(o)}}function re(e){return Ht.add(e),Nt||(_t=location.href,Do=v(),Nt=ms()),()=>{Ht.delete(e),!Ht.size&&(Nt?.(),Nt=void 0)}}var ps=250,fs=400,gs=6e4,bs=5e3,hs=`:is(${d.turn}) :is(${d.turnBusy})`,S=Ot(),Gt=new Set,Ho=new Set,ee=!1,ur=0,ie,ke=!1,$t=!1,Ve=0,We=null,dr=!1,N=()=>({generating:ee,conversationId:v()}),mr=()=>or()||!!document.querySelector(hs);function pr(){let e=mr();return e?$t||(Ve=0):$t=!1,[...Gt].some(t=>!Ho.has(t))||e&&!$t||Date.now()<Ve}function ys(){return We?.error?"error":ke?"stopped":"done"}function vs(){ie=void 0,!(!ee||pr())&&(ee=!1,S.emit("fall",{conversationId:v(),outcome:ys()}),ke=!1,We=null)}function qt(){let e=pr();e&&!ee&&(ee=!0,ur=Date.now(),ke=!1,We=null,S.emit("rise",{conversationId:v()})),e&&ie&&(clearTimeout(ie),ie=void 0),!e&&ee&&!ie&&(ie=setTimeout(vs,fs)),S.emit("tick",N())}function Ss({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(ee||Date.now()-ur<gs);if(!o&&ee){for(let n of Gt)Ho.add(n);$t=mr(),Ve=0,clearTimeout(ie),ie=void 0,ee=!1,ke=!1,We=null,S.emit("fall",{conversationId:e,outcome:"left"})}S.emit("context",{prevId:e,id:t,migrated:o}),qt()}function xs(e){e.target instanceof Element&&e.target.closest(d.stopButton)&&(ke=!0,Ve=0)}function fr(){dr||(dr=!0,R.on("generate-start",({requestId:e})=>{Gt.add(e),qt()}),R.on("generate-end",e=>{Gt.delete(e.requestId),!Ho.delete(e.requestId)&&(We=e,Ve=e.handoff&&!e.error&&!ke?Date.now()+bs:0,qt())}),re(Ss),document.addEventListener("click",xs,!0),setInterval(qt,ps))}var ws="main, nav, [data-app-action-sidebar-scroll], [data-app-navigation-rail]";function Ye(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var gr=()=>new Promise(e=>{typeof requestIdleCallback=="function"?requestIdleCallback(()=>e(),{timeout:1500}):setTimeout(e,100)});async function Es(){for(;!document.querySelector(ws);)await new Promise(e=>setTimeout(e,100));await gr(),await gr()}async function br(){await Ye(),await Promise.race([Es(),new Promise(e=>setTimeout(e,8e3))])}var hr={BetterNavigator:1790616549e3,ChatListStatus:1790616549e3,ChatStateFavicons:1790616549e3,Cleaner:1790616549e3,ComposerOpacity:1790616549e3,CustomSidebarIdentity:1790616549e3,GreetingCustomizer:1790616549e3,InputHistory:1790616549e3,MessageTimestamps:1790616549e3,NoDictation:1790616549e3,NoShareLink:1790616549e3,NoSidebarIdentity:1790616549e3,PromptQueue:1790616549e3,RecentTopics:1790616549e3,ResponseNotification:1790616549e3,Settings:1790616549e3,StreamerMode:1790616549e3,WiderChat:1790616549e3};var b=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,Ts="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",Ms={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${Ts}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:b('<path d="M18 6 6 18M6 6l12 12"/>'),gear:b('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:b('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:b('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:b('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:b('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:b('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:b('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:b('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:b('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:b('<path d="m6 9 6 6 6-6"/>'),play:b('<path d="M7 4v16l13-8z"/>'),plus:b('<path d="M12 5v14M5 12h14"/>'),check:b('<path d="m5 12 5 5 9-10"/>'),alert:b('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:b('<path d="M4 5h16v11H9l-5 4z"/>'),layout:b('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:b('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:b('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:b('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:b('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:b('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:b('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:b('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:b('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:b('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:b('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:b('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:b('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:b('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:b('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),grip:b('<path d="M9 6h0M15 6h0M9 12h0M15 12h0M9 18h0M15 18h0"/>')},I=e=>Jn(Ms[e]);var Cs=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,yr=/\S+@\S+\.\S+/,Ls=3,As=/^\/g\/(g-p-[^/]+)\//,ks=/^g-p-[0-9a-f]+-?/i,vr=e=>!!e.closest(".sr-only"),_o=e=>!!e?.querySelector(d.menuButton);function Sr(){return[...document.querySelectorAll(d.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(_o)).filter(e=>e!=null)}function xr(){let e=[...document.querySelectorAll(d.oldProfile)];if(e.length)return e.map(o=>({kind:"profile",anchor:o,insert:n=>{(o.parentElement?.children.length===1?o.parentElement:o).before(n)}}));let t=Sr().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(d.rail)){let n=[...o.children].find(_o);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}var $o=e=>!e.closest("[data-bloom]")&&(!!e.querySelector("img, [class*=rounded-full]")||Mr(e).some(t=>!vr(t))),wr=e=>[...e.parentElement?.children??[]].find(t=>t!==e&&t instanceof HTMLElement&&$o(t))??null;function Er(){let e=[...document.querySelectorAll(d.oldProfile)];return e.length?e:[...Sr(),...[...document.querySelectorAll(d.rail)].map(o=>[...o.children].findLast(_o))].map(o=>[...o?.querySelectorAll(d.menuButton)??[]].findLast(n=>$o(n)||wr(n))).filter(o=>o!=null)}var Tr=()=>Er().map(e=>$o(e)?e:wr(e)).filter(e=>e!=null);function Mr(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!G(t.textContent??"")&&!(t instanceof SVGElement))}var Ps=e=>{let t=getComputedStyle(e);return t.borderRadius.includes("%")||Number.parseFloat(t.borderRadius)>=e.clientWidth/2||/rounded-full/.test(e.getAttribute("class")??"")};function Xe(e,t){e&&!e.hasAttribute(t)&&e.setAttribute(t,"")}function Os(e){if(G(e.textContent??"").length>Ls)return null;for(let t=e;t&&t!==e.closest("button");t=t.parentElement)if(Ps(t))return t;return null}function qo(e,t){Xe(e,`data-bloom-${t}`);let o=e.querySelector("img:not([data-bloom] img)"),n=Mr(e),r=o?null:n.map(Os).find(f=>f!=null),i=o?.closest("[class*=rounded-full]"),s=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");Xe(s,`data-bloom-${t}-avatar`);let c=n.filter(f=>!s?.contains(f)&&!vr(f)),l=c.find(f=>Cs.test(G(f.textContent??""))),u=c.find(f=>yr.test(f.textContent??""));Xe(l,`data-bloom-${t}-plan`),Xe(u,`data-bloom-${t}-email`),Xe(c.find(f=>f!==l&&f!==u),`data-bloom-${t}-name`)}function Rs(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function Ut(){return Er().map(Rs).find(e=>e!=null)??[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&(yr.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var Je=e=>[...document.querySelectorAll(d.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&No(t.href)===e);function Cr(e){let t=Je(e).find(o=>G(o.textContent??""));return t?G(t.textContent??""):null}function Lr(e){let t=new URL(e,location.origin).pathname.match(As)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!No(n.href)&&G(n.textContent??""));return o?G(o.textContent??""):t.replace(ks,"").replaceAll("-"," ")||null}function Go(e,t,o){let n=a("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o}});return n.addEventListener("click",r=>{r.stopPropagation();let i=n.getAttribute("aria-checked")!=="true";n.setAttribute("aria-checked",String(i)),t(i)}),n}function H(e,t,o){return a("button",{class:Et("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button"},on:{click:t}})}function _(e,t,o,n){let r=a("button",{class:"bloom-icon-button",title:t,attrs:{type:"button","aria-label":t},on:{click:o}},I(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function zt(e,t,o,n,r,i){let s=a("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});s.value=String(e);let c=a("output",{text:`${e}${r}`});return s.addEventListener("input",()=>{c.textContent=`${s.value}${r}`,i(Number(s.value))}),a("div",{class:"bloom-slider"},s,c)}function Uo(e,t,o){let n=a("select",{class:"bloom-select"},...t.map(r=>a("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function Ze(e,t,o="",n="text"){let r=a("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var Is=new x("SettingsPanel"),m=E("bloom-settings-"),Bs=10080*60*1e3,Ds=3e3,Ar="Toggle features. Some need a reload. Click the sliders icon to configure.",Ns=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Hs=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],_s={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},kr=new Set(["chat","ui","privacy"]),B=null,Pe="all",zo="all",Ft="",Fo=[],Pr=()=>[...pe.values()].filter(e=>!e.hidden),$s=e=>!!e.updatedAt&&Date.now()-e.updatedAt<Bs;function qs(e){switch(Pe){case"favorites":return At.has(e.name);case"recent":return $s(e);case"all":return!0;case"other":return!e.tags.some(t=>kr.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(Pe)}}function Gs(e){switch(zo){case"all":return!0;case"enabled":return ze(e);case"disabled":return!ze(e)}}function Us(e){let t=Ft.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function zs(e){let t=Lt.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return Pe==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var Or=e=>e.settings?.def??{},Fs=e=>Object.values(Or(e)).some(t=>t.type!=="custom");function js(e,t,o){let n=ue(e.name,t)??Lo(o),r=i=>me(e.name,t,i);switch(o.type){case"boolean":return Go(n,r,o.description??t);case"slider":return zt(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return Uo(n,o.options,r);case"string":return Ze(n,r,o.placeholder);case"number":return Ze(String(n),i=>r(Number(i)),"","number");case"component":{let i=a("div",{class:m("component")});return Fo.push(o.render(i)),i}case"custom":return null}}var Ks=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function Rr(e){if(!B)return;let t=Object.entries(Or(e)).filter(([,i])=>i.type!=="custom").map(([i,s])=>{let c=js(e,i,s),l=s.type==="boolean";return a("div",{class:m("field",l?"field-inline":"field-stacked")},a("div",{class:m("field-text")},s.type!=="component"&&a("div",{class:m("field-label"),text:Ks(i)}),s.description&&a("div",{class:m("field-desc"),text:s.description})),c)}),o,n=H("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},Ds);return}clearTimeout(o),e.settings?.reset(),Qe(),Rr(e)},"danger"),r=a("div",{class:m("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&Qe()}},a("div",{class:m("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},a("div",{class:m("popup-header")},a("div",{class:m("card-icon")},I(e.icon)),a("div",{class:m("popup-title")},a("div",{class:m("card-name"),text:e.name}),a("div",{class:m("popup-authors"),text:e.authors.join(", ")})),_("close","Close",Qe)),a("p",{class:m("popup-desc"),text:e.description}),a("div",{class:m("fields")},...t),a("div",{class:m("popup-footer")},n)));B.querySelector(`.${m("modal")}`)?.append(r)}function Qe(){for(let e of Fo)e();Fo=[],B?.querySelector(`.${m("popup-backdrop")}`)?.remove()}function Vs(e){let t=ze(e),o=At.has(e.name),n=Lt.has(e.name);return a("div",{class:m("card",t?"card-on":"card-off")},a("div",{class:m("card-top")},a("div",{class:m("card-icon")},I(e.icon)),a("div",{class:m("card-actions")},_("star",o?"Unstar":"Star",()=>{At.toggle(e.name),be()},o),_("pin",n?"Unpin":"Pin to top",()=>{Lt.toggle(e.name),be()},n),Fs(e)&&_("gear","Settings",()=>Rr(e)),e.required?null:Go(t,r=>Vn(e,r),`Enable ${e.name}`))),a("div",{class:m("card-name"),text:e.name}),a("div",{class:m("card-desc"),text:e.description,title:e.description}),a("div",{class:m("card-footer"),text:e.authors.join(", ")}))}function Ir(){let e=Pr().some(o=>!o.tags.some(n=>kr.has(n)));B?.querySelector(`.${m("tabs")}`)?.replaceChildren(...Ns.filter(o=>o.id!=="other"||e).map(o=>a("button",{class:m("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===Pe)},on:{click:()=>{Pe=o.id,Ir(),be()}}})))}function be(){if(!B)return;let e=Pr().filter(qs),t=B.querySelector(`.${m("search")} input`);t&&(t.placeholder=`Search ${xt(e.length,"plugin")}...`);let o=zs(e.filter(i=>Us(i)&&Gs(i))),n=B.querySelector(`.${m("grid")}`),r=Ft.trim()?"No plugins match your search.":_s[Pe]??"No plugins available.";n?.replaceChildren(...o.length?o.map(Vs):[a("div",{class:m("empty"),text:r})])}function Ws(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),B?.querySelector(`.${m("popup-backdrop")}`)?Qe():Oe())}var Br,jo;function Ys(){if(B)return;let e=a("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=Ft,e.addEventListener("input",()=>{Ft=e.value,be()}),B=a("div",{class:`bloom-root ${m("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&Oe()}},a("div",{class:m("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},a("div",{class:m("header")},a("div",{class:m("logo")},I("bloom")),a("h2",{class:m("title"),text:"Bloom++"}),a("span",{class:m("hint"),title:Ar,attrs:{"aria-label":Ar,tabindex:"0"}},I("info")),a("span",{class:m("version"),text:"v2.0.1"}),_("close","Close",Oe)),a("div",{class:m("tabs"),attrs:{role:"tablist"}}),a("div",{class:m("toolbar")},a("label",{class:m("search")},I("search"),e),Uo(zo,Hs,t=>{zo=t,be()})),a("div",{class:m("grid")}))),B.addEventListener("keydown",t=>t.stopPropagation()),jo=new AbortController,document.addEventListener("keydown",Ws,{capture:!0,signal:jo.signal}),document.body.append(B),Ir(),be(),Br=Wn(be),e.focus(),Is.debug("Opened")}function Oe(){Qe(),jo?.abort(),Br?.(),B?.remove(),B=null}var jt=()=>B?Oe():Ys();var Dr=`/*
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
`;var et=E("bloom-entry-"),Re=new Map,Nr=!1,Hr;function Js(e){let t=a("button",{class:et("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:o=>{o.preventDefault(),o.stopPropagation(),jt()}}},I("bloom"),e!=="rail"&&a("span",{class:et("label"),text:"Bloom++"}));return a("div",{class:`bloom-root ${et("wrap")} ${et(e)}`,attrs:{"data-bloom":"entry"}},t)}function Zs(e){let t=a("div",{class:`bloom-root ${et("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),jt()}}},I("bloom"),a("span",{text:"Bloom++"})),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function Qs(){let e=xr();for(let[o,n]of Re)o.isConnected&&e.some(r=>r.anchor===o)||(n.remove(),Re.delete(o));for(let o of e){let n=Re.get(o.anchor);if(n?.isConnected)continue;let r=n??Js(o.kind);Re.set(o.anchor,r),o.insert(r)}let t=Ut();t&&!t.querySelector('[data-bloom="menu-entry"]')&&Zs(t)}var _r=p({name:"Settings",description:"Bloom++ settings panel and its sidebar entry.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,hidden:!0,startAt:"HostReady",styles:Dr,start(){Hr=D(Qs),!Nr&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",jt),Nr=!0)},stop(){Hr?.();for(let e of Re.values())e.remove();Re.clear(),Oe()}});var el=["data-turn","data-message-author-role"],tl=/:(user|assistant)$/,Ko=`${d.messageUnit}, ${d.oldMessage}`,Vo=e=>e==="user"||e==="assistant";function Wo(){let e=document.querySelector(d.timelineScroll);if(e)return e;let t=document.querySelector(d.turn);for(let o=t?.parentElement;o;o=o.parentElement){let{overflowY:n}=getComputedStyle(o);if((n==="auto"||n==="scroll")&&o.scrollHeight>o.clientHeight)return o}return document.scrollingElement}var Gr=()=>document.querySelector(d.conversationTarget)??document.querySelector(d.oldThread),Kt=e=>e.getAttribute("data-chatgpt-search-unit-key")?.match(tl)?.[1]??null,Ur=e=>[...e.querySelectorAll(d.searchUnit)].filter(t=>Kt(t)&&!t.parentElement?.closest(d.searchUnit)),$r=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function tt(e){let t=$r(e);return t.length?t:[...new Set([...e.querySelectorAll(Ko)].flatMap($r))]}function Yo(e=document){let t=Ur(e);return t.length?t:[...e.querySelectorAll(Ko)].filter(o=>!o.parentElement?.closest(Ko))}function ol(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function nl(e){for(let t of el){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(Vo(o))return o}return e.querySelector(d.markdown)||e.querySelector(d.generatedImage)?"assistant":null}var rl=e=>!e.parentElement?.closest(d.turn);function Vt(){let e=K(v())?.chain??[],t=[...document.querySelectorAll(d.turn)].filter(rl).flatMap(n=>{let r=Ur(n);return r.length?r.map(i=>({el:i,known:Kt(i)})):[{el:n,known:null}]}),{generating:o}=N();return t.map(({el:n,known:r},i)=>{let s=r?tt(n):Yo(n).flatMap(tt),c=r??nl(n)??ol(s,e)??(i%2?"assistant":"user"),l=c==="assistant"&&(n.matches(d.turnBusy)||!!n.querySelector(d.turnBusy)||o&&i===t.length-1);return{el:n,role:c,messageIds:s,streaming:l}})}var il=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,qr=new WeakMap;function Wt(e){let t=e.el.textContent?.length??0,o=qr.get(e.el);if(o?.length===t)return o.summary;let n=al(e);return qr.set(e.el,{length:t,summary:n}),n}function al(e){let t=e.el.querySelectorAll(d.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.querySelector(e.role==="assistant"?d.markdown:".whitespace-pre-wrap")??e.el,n=(o.innerText||o.textContent||"").split(`
`).map(G).filter(r=>r&&!il.test(r));return n.length?n.join(" "):e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function Yt(e){return e.text?G(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var zr=`/*
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
`;var A=E("bloom-nav-"),Xr=80,ll=1200,cl=2,dl=40,ul=.3,Fr=12,ml={user:"\u2753",assistant:"\u{1F916}"},Zt=g({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the outline too.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),P=null,$=[],Ie=-1,Xt="",jr=0,Kr=[],ot=null,Jt;function Jr(){let e=Vt().map(s=>({role:s.role,summary:Wt(s),ids:s.messageIds,turn:s,streaming:s.streaming})),t=K(v())?.chain??[];if(!t.length)return e;let o=new Set(t.map(s=>s.id)),n=new Map(e.flatMap(s=>s.ids.map(c=>[c,s]))),r=new Set,i=[];for(let s of t){let c=n.get(s.id);c&&r.has(c)||(c&&r.add(c),i.push(c??{role:s.role,summary:Yt(s),ids:[s.id],turn:null,streaming:!1}))}return[...i,...e.filter(s=>!s.ids.some(c=>o.has(c)))]}function pl(e){let t=e.getBoundingClientRect(),o=t.top+t.height*ul,n=-1;return $.forEach((r,i)=>{let s=r.turn?.el.getBoundingClientRect();s&&s.top<=o&&(n=i)}),n===-1?$.findIndex(r=>r.turn):n}function Vr(e){Zt.store.jumpEffect==="border"&&(e.classList.add(A("flash")),setTimeout(()=>e.classList.remove(A("flash")),ll))}function Xo(e){let t=$[e],o=Wo();if(!t||!o)return;let n=t.turn?.el;if(n?.isConnected){let u=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:u<o.clientHeight*cl?"smooth":"auto"}),Vr(n);return}let r=$.map((u,f)=>u.turn?f:-1).filter(u=>u>=0),i=r.length&&e<r[0]?-1:1,s=++jr,c=0,l=()=>{if(s!==jr||c++>dl)return;$=Jr();let u=$.find(f=>f.ids.some(M=>t.ids.includes(M)))?.turn?.el;if(u){u.scrollIntoView({block:"start"}),Vr(u);return}o.scrollBy({top:i*o.clientHeight*.9}),requestAnimationFrame(l)};l()}function fl(e,t){return a("button",{class:A("row"),attrs:{type:"button","data-index":String(t)},on:{click:()=>Xo(t)}},a("span",{text:ml[e.role]}),a("span",{class:"bloom-truncate",text:we(e.summary||"\u2026",Xr)}))}function gl(){let e=Wo(),t=Gr()??e;if($=Jr(),!$.length||!e||!t){P?.remove(),P=null,Xt="";return}ot!==e&&(Jt?.abort(),Jt=new AbortController,e.addEventListener("scroll",Le(Wr),{passive:!0,signal:Jt.signal}),ot=e),P??=a("div",{class:`bloom-root ${A("root")}`,attrs:{"data-bloom":"navigator"}},a("div",{class:A("rail")}),a("div",{class:A("toc")},a("div",{class:A("toc-head")}),a("div",{class:A("toc-list")}))),P.isConnected||document.body.append(P);let o=t.getBoundingClientRect(),n=e.getBoundingClientRect();P.style.left=`${Math.min(o.right+Fr,n.right-Fr*2)}px`,P.style.top=`${n.top+n.height/2}px`;let r=JSON.stringify([Zt.store.showAssistant,$.map(i=>[i.role,i.summary,i.streaming])]);r!==Xt&&(Xt=r,bl()),Wr()}function Wr(){if(!P||!ot)return;Ie=pl(ot),P.querySelectorAll(`.${A("tick")}`).forEach((t,o)=>t.classList.toggle(A("tick-current"),o===Ie)),P.querySelectorAll(`.${A("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===Ie)));let e=P.querySelector(`.${A("toc-head")}`);e&&(e.textContent=`${Ie+1} / ${$.length}`)}function bl(){P?.querySelector(`.${A("rail")}`)?.replaceChildren(...$.map((t,o)=>a("button",{class:Et(A("tick"),A(`tick-${t.role}`),t.streaming&&A("tick-streaming")),title:we(t.summary,Xr),attrs:{type:"button","aria-label":`Jump to message ${o+1}`},on:{click:()=>Xo(o)}})));let e=$.map((t,o)=>({entry:t,index:o})).filter(({entry:t})=>Zt.store.showAssistant||t.role==="user");P?.querySelector(`.${A("toc-list")}`)?.replaceChildren(...e.map(({entry:t,index:o})=>fl(t,o)))}var ae=Le(gl),hl=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function Yr(e){if(!P||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||hl(document.activeElement)||document.querySelector("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:Ie-1,ArrowDown:Ie+1,Home:0,End:$.length-1}[e.key];o==null||o<0||o>=$.length||(e.preventDefault(),e.stopPropagation(),Xo(o))}var Zr=p({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:Zt,styles:zr,start(){Kr=[D(e=>j(e)&&ae()),re(ae),R.on("conversation",ae),S.on("rise",ae),S.on("fall",ae)],addEventListener("keydown",Yr,!0),addEventListener("resize",ae,{passive:!0})},stop(){for(let e of Kr)e();Jt?.abort(),ot=null,removeEventListener("keydown",Yr,!0),removeEventListener("resize",ae),P?.remove(),P=null,Xt=""},onSettingsChange:ae});var Qr=`/*
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
`;var vl=E("bloom-cls"),Sl="bloom-cls",xl=600*1e3,Zo=kn("tab"),De=new Map,rt=new Map,Be=null,ei=[],wl=e=>e==="streaming"||e==="error";function El(){let e=new Map,t=Date.now();for(let[o,n]of rt)t-n.at>xl?rt.delete(o):e.set(o,n.status);for(let[o,n]of De)e.set(o,n);return e}function Tl(e){return a("span",{class:`bloom-root ${vl("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&I("alert"))}function nt(){let e=El(),t=new Set;for(let[o,n]of e)for(let r of Je(o)){let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let s=Tl(n);t.add(s),r.append(s)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function Qt(e,t){e&&(t?De.set(e,t):De.delete(e),Be?.postMessage({tab:Zo,id:e,status:t}),nt())}function Ml({data:e}){!C(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===Zo||(wl(e.status)?rt.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):rt.delete(e.id),nt())}function Jo(){for(let e of De.keys())Be?.postMessage({tab:Zo,id:e,status:null})}var ti=p({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,styles:Qr,start(){Be=typeof BroadcastChannel=="function"?new BroadcastChannel(Sl):null,Be?.addEventListener("message",Ml),addEventListener("pagehide",Jo),ei=[S.on("rise",({conversationId:e})=>Qt(e,"streaming")),S.on("fall",({conversationId:e,outcome:t})=>Qt(e,t==="error"?"error":null)),S.on("context",({prevId:e,id:t,migrated:o})=>{o&&N().generating?Qt(t,"streaming"):!o&&De.get(e??"")==="streaming"&&Qt(e,null)}),D(e=>j(e)&&nt())],v()&&nt()},stop(){for(let e of ei)e();Jo(),Be?.close(),Be=null,removeEventListener("pagehide",Jo),De.clear(),rt.clear(),nt()}});var ni=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],oo={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Cl={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Ll="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Qo=32,no=64,en="#FCFCFC",tn="#111111",Al=14,ro=51.5,kl=12.5,Pl=9.75,oi=52,Ol=10.5,Rl=7.75,Il={rotate:e=>e.arc(ro,ro,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function eo(e){let t=document.createElement("canvas");t.width=t.height=Qo;let o=t.getContext("2d");return o?(o.scale(Qo/no,Qo/no),e(o),t.toDataURL("image/png")):""}function to(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D(Ll);o&&(e.strokeStyle=tn,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function io(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function Bl(e,t){io(e,ro,kl,tn),io(e,ro,Pl,oo[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),Il[t](e),e.stroke()}function Dl(e,t){e.beginPath(),e.roundRect(0,0,no,no,Al),e.fillStyle=t,e.fill()}var Nl=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function ri(e,t){switch(e){case"original":return Nl(Cl[t]);case"hole":return eo(o=>to(o,oo[t],!0));case"bg":return eo(o=>{Dl(o,oo[t]),to(o,en,!1)});case"dot":return eo(o=>{to(o,en,!0),io(o,oi,Ol,tn),io(o,oi,Rl,oo[t])});case"badge":return eo(o=>{to(o,en,!0),Bl(o,t)})}}var at="bloom-chat-state-favicon",st="data-bloom-rel",rn="data-bloom-media",ii="bloom-parked-icon",Hl="/favicon.ico",si=g({style:{type:"select",description:"How the tab icon shows the chat state.",options:ni,default:"bg"}}),se=null,li="",ao=null,ci="",ai=new Map,an,on=[],di=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${st}]`)];function sn(){for(let e of di())e.id!==at&&(e.hasAttribute(st)||(ci||=e.href,e.setAttribute(st,e.rel),e.setAttribute(rn,e.getAttribute("media")??"")),e.rel!==ii&&(e.rel=ii),e.media!=="not all"&&(e.media="not all"))}function _l(){for(let e of di()){let t=e.getAttribute(st);if(t==null)continue;e.rel=t;let o=e.getAttribute(rn);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(st),e.removeAttribute(rn)}}function ui(){let e=document.getElementById(at);return e||(e=document.createElement("link"),e.id=at,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function $l(e){if(e==="wait")return ci||Hl;let t=si.store.style,o=`${t}:${e}`,n=ai.get(o);return n||ai.set(o,n=ri(t,e)),n}function nn(e){if(e)return"rotate";let t=U();return se&&t&&t!==li&&(se=null),se==="error"?"error":se==="done"?"done":t?"ready":"wait"}function it(e,t=!1){if(e===ao&&!t)return;ao=e;let o=ui(),n=$l(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function ql(){an=new MutationObserver(()=>{sn(),document.head.lastElementChild?.id!==at&&ui()}),an.observe(document.head,{childList:!0})}var mi=p({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"DOMContentLoaded",settings:si,start(){sn(),it(nn(N().generating),!0),ql(),on=[S.on("rise",()=>{se=null,it("rotate")}),S.on("fall",({outcome:e})=>{se=e==="done"||e==="error"?e:null,li=U(),it(nn(!1))}),S.on("context",({migrated:e})=>{e||(se=null)}),S.on("tick",({generating:e})=>{sn(),it(nn(e))})]},stop(){for(let e of on)e();on=[],an?.disconnect(),document.getElementById(at)?.remove(),_l(),ao=null,se=null},onSettingsChange(){it(ao??"wait",!0)}});var Gl={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]'],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])']},pi=g({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0}}),fi=p({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos and ads.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:pi,styles:()=>Te(Object.entries(Gl).flatMap(([e,t])=>pi.store[e]?t:[]))});var ln=`form:has(${d.composerInput}), ${d.oldComposerForm}`,Ul=`:is(${ln}) :is([class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"])`,zl='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',Fl='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',jl="var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, #fff)))",gi=g({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function Kl(){let{opacity:e,blur:t}=gi.store;return e>=100?"":`:is(${zl}), :is(${ln}){background-color:transparent!important;background-image:none!important;box-shadow:none!important}:is(${Fl}){display:none!important}${Ul}{background-color:color-mix(in srgb, ${jl} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important}:is(${ln}) :is(${d.composerInput}){background-color:transparent!important}`}var bi=p({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:gi,styles:Kl});var cn=0,so;function Vl(e){if(!j(e))return;for(let o of Tr())qo(o,"profile");let t=Ut();t&&qo(t,"menu")}function Ne(){cn++;let e=!0;return Ye().then(()=>{e&&cn&&!so&&(so=D(Vl))}),()=>{e&&(e=!1,!--cn&&(so?.(),so=void 0))}}var te=E("bloom-csi-"),Wl=256,Yl=160,lo=1,hi=4,Xl=.1,Jl=.0015,Zl=250;function yi(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function Ql(e){return new Promise((t,o)=>{let n=new Image;n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function ec(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:St(t.x,n,1-n),y:St(t.y,r,1-r)}}function vi(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function tc(e,t){let o=a("canvas");return o.width=o.height=Wl,vi(o,e,t),o.toDataURL("image/png")}async function oc(e){if(e.startsWith("data:image/"))return e;let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status}`);return yi(await t.blob())}function Si(e){let t=null,o={x:T.store.cropX,y:T.store.cropY,zoom:T.store.cropZoom},n,r=a("canvas",{class:te("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=Yl*devicePixelRatio;let i=a("div",{class:`bloom-muted ${te("status")}`}),s=a("div",{class:te("zoom")}),c=a("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(h,O=!0){t&&(o=ec(t,h),vi(r,t,o),O&&(clearTimeout(n),n=setTimeout(()=>{t&&(T.store.cropX=o.x,T.store.cropY=o.y,T.store.cropZoom=o.zoom,T.store.avatarUrl=tc(t,o))},Zl)))}function u(){s.replaceChildren(zt(o.zoom,lo,hi,Xl,"\xD7",h=>l({...o,zoom:h})))}async function f(h,O){i.textContent="";try{let ne=await oc(h);t=await Ql(ne),O&&(T.store.avatarSource=ne,o={x:.5,y:.5,zoom:lo}),e.classList.add(te("has-image")),u(),l(o,O)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let M=h=>{h?.type.startsWith("image/")&&yi(h).then(O=>f(O,!0))};c.addEventListener("change",()=>M(c.files?.[0])),r.addEventListener("wheel",h=>{t&&(h.preventDefault(),l({...o,zoom:St(o.zoom*(1-h.deltaY*Jl),lo,hi)}),u())},{passive:!1}),r.addEventListener("pointerdown",h=>{if(!t)return;r.setPointerCapture(h.pointerId);let O={...o},ne=r.getBoundingClientRect(),yt=vt=>{if(!t)return;let F=Math.max(ne.width/t.naturalWidth,ne.height/t.naturalHeight)*o.zoom;l({...o,x:O.x-(vt.clientX-h.clientX)/(t.naturalWidth*F),y:O.y-(vt.clientY-h.clientY)/(t.naturalHeight*F)})};r.addEventListener("pointermove",yt),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",yt),{once:!0})});let Z=a("div",{class:te("cropper"),attrs:{tabindex:"0"},on:{paste:h=>M([...h.clipboardData?.files??[]].find(O=>O.type.startsWith("image/"))),dragover:h=>h.preventDefault(),drop:h=>{h.preventDefault(),M(h.dataTransfer?.files[0])}}},a("div",{class:te("stage")},r),a("div",{class:te("controls")},Ze("",h=>h.trim()&&void f(h.trim(),!0),"https://\u2026 or data:image/\u2026","url"),a("div",{class:te("buttons")},H("Choose file",()=>c.click()),H("Reset crop",()=>{l({x:.5,y:.5,zoom:lo}),u()}),H("Clear",()=>{t=null,e.classList.remove(te("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),s.replaceChildren(),T.store.avatarUrl="",T.store.avatarSource=""},"danger")),s,i,c));return e.append(Z),T.store.avatarSource&&f(T.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var xi=`/*
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
`;var He="data-bloom-csi-avatar",rc="data-bloom-csi-sized",Mi="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",T=g({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>Si(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),wi=[];function Ei(e){return(T.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function Ti(e=[]){if(!j(e))return;let t=T.store.displayName.trim()||null,o=!!T.store.avatarUrl,n=new Set(t?Ei("name"):[]);for(let i of document.querySelectorAll(Mi))n.has(i)||fe(i,null);for(let i of n)fe(i,t);let r=new Set(o?Ei("avatar"):[]);for(let i of document.querySelectorAll(`[${He}]`))r.has(i)||i.removeAttribute(He);for(let i of r)i.hasAttribute(He)||i.setAttribute(He,""),i.toggleAttribute(rc,!i.closest(`${d.rail}, ${d.oldRail}, [role="menu"]`))}function ic(){let e=T.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${T.store.avatarSize}px}`:""}var Ci=p({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:T,styles:()=>`${ic()}
${xi}`,start(){wi=[Ne(),D(Ti)]},stop(){for(let e of wi)e();for(let e of document.querySelectorAll(`[${He}]`))e.removeAttribute(He);for(let e of document.querySelectorAll(Mi))fe(e,null)},onSettingsChange(){Ti()}});var _e=E("bloom-greeting-"),Li=30,Ai=100;function ki(e){let t=-1,o=a("textarea",{class:`bloom-input ${_e("input")}`,attrs:{maxlength:String(Ai),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=H("Add",i),r=a("div",{class:_e("list")});function i(){let l=o.value.trim().slice(0,Ai);if(!l)return;let u=[...w.store.greetings];t>=0?u[t]=l:u.length<Li&&u.push(l),w.store.greetings=u,t=-1,o.value="",s()}function s(){let{greetings:l}=w.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&l.length>=Li,r.replaceChildren(...l.length?l.map((u,f)=>a("div",{class:_e("row",f===t?"row-editing":"row-idle")},a("div",{class:_e("text"),text:u}),_("edit","Edit",()=>{t=f,o.value=u,o.focus(),s()}),_("trash","Delete",()=>{w.store.greetings=l.filter((M,Z)=>Z!==f),t===f&&(t=-1),s()}))):[a("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),e.append(a("div",{class:_e("editor")},r,a("div",{class:_e("form")},o,n))),s();let c=Me((l,u)=>l==="GreetingCustomizer"&&u==="greetings"&&s());return()=>{c(),e.replaceChildren()}}var Pi=`/*
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
`;var uo="data-bloom-greeting",sc=1e3,lc=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],w=g({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>ki(e)},greetings:{type:"custom",default:lc},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),co,Oi=[],dn,Ri=()=>w.store.greetings.filter(e=>typeof e=="string"&&e.trim());function ct(){let e=Ri();if(e.length)if(w.store.order==="random"&&e.length>1){let t=w.store.lastRandom;for(;t===w.store.lastRandom;)t=Math.floor(Math.random()*e.length);w.store.lastRandom=t,w.store.index=t}else w.store.index=(w.store.index+1)%e.length}function cc(){return ge()?Ce(d.homeHeading):null}function Ii(){for(let e of document.querySelectorAll(`[${uo}]`))e.removeAttribute(uo),fe(e,null)}function lt(){let e=Ri(),t=cc();if(!t||!e.length){Ii();return}(w.store.index<0||w.store.index>=e.length)&&ct(),t.setAttribute(uo,""),fe(t,e[Math.max(0,w.store.index)%e.length])}function un(){clearInterval(co),co=void 0,w.store.mode==="interval"&&ge()&&(co=setInterval(()=>{ct(),lt()},w.store.intervalSec*sc))}function dc(e){w.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${uo}]`)||getSelection()?.toString()||(ct(),lt())}function uc(){ge()&&w.store.mode==="refresh"&&ct(),un(),lt()}var Bi=p({name:"GreetingCustomizer",description:"Replace the \u201CWhat can I help with?\u201D heading on the home page with your own lines.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:w,styles:Pi,start(){dn=new AbortController,document.addEventListener("click",dc,{signal:dn.signal}),ge()&&w.store.mode==="refresh"&&ct(),un(),Oi=[D(e=>j(e)&&lt()),re(uc)]},stop(){dn?.abort();for(let e of Oi)e();clearInterval(co),Ii()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&un(),lt()}});var dt=E("bloom-history-"),mn=10,mc=3e3;function Di(e){let t="",o=0,n=new Set,r=a("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),i=a("div",{class:dt("list")}),s=a("div",{class:dt("pager")}),c,l=H("Clear all",()=>{if(!c){l.textContent="Click again to clear",c=setTimeout(()=>{c=void 0,l.textContent="Clear all"},mc);return}clearTimeout(c),c=void 0,l.textContent="Clear all",ut([])},"danger");function u(){let M=[...he.store.entries].toReversed(),Z=t.trim().toLowerCase(),h=Z?M.filter(F=>F.toLowerCase().includes(Z)):M,O=Math.max(1,Math.ceil(h.length/mn));o=Math.min(o,O-1);let ne=h.slice(o*mn,(o+1)*mn).map(F=>a("div",{class:dt("row")},a("button",{class:dt("text",n.has(F)?"text-open":"text-closed"),text:F,title:n.has(F)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{n.delete(F)||n.add(F),u()}}}),_("copy","Copy",()=>void Pn(F)),_("trash","Delete",()=>ut(he.store.entries.filter(Ca=>Ca!==F)))));i.replaceChildren(...ne.length?ne:[a("div",{class:"bloom-muted",text:Z?"No matching prompts.":"No saved prompts yet."})]),s.replaceChildren(a("span",{class:"bloom-muted",text:`${h.length} saved \xB7 page ${o+1} of ${O}`}),H("Previous",()=>{o--,u()}),H("Next",()=>{o++,u()}),l);let[yt,vt]=s.querySelectorAll("button");yt.disabled=o===0,vt.disabled=o>=O-1,l.disabled=!M.length}r.addEventListener("input",()=>{t=r.value,o=0,u()}),e.append(a("div",{class:dt("manager")},r,i,s)),u();let f=Me((M,Z)=>M==="InputHistory"&&Z==="entries"&&u());return()=>{f(),clearTimeout(c),e.replaceChildren()}}var Ni=`/*
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
`;var fc=E("bloom-history-"),gc=2e3,he=g({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>Di(e)},entries:{type:"custom",default:[]}}),z=null,pn={text:"",at:0},ye=null,fn,mo=()=>he.store.entries.filter(e=>typeof e=="string");function ut(e){he.store.entries=e.slice(-he.store.maxEntries)}function gn(e){let t=e.trim();if(!t)return;let o=Date.now();t===pn.text&&o-pn.at<gc||(pn={text:t,at:o},ut([...mo().filter(n=>n!==t),t]))}function bc(e,t){let o=Ae();if(!o)return;ye??=a("div",{class:`bloom-root ${fc("hud")}`,attrs:{"data-bloom":"history-hud","aria-live":"polite"}}),ye.textContent=`${e+1} / ${t}`;let n=(o.closest("form")??o).getBoundingClientRect();ye.style.left=`${n.left+n.width/2}px`,ye.style.top=`${n.top}px`,ye.isConnected||document.body.append(ye)}function mt(){z=null,ye?.remove()}function hc(e){let t=mo();if(!z)return;let o=t[e];z.index=e,z.shown=o,Q(o),bc(t.length-1-e,t.length)}function yc(e){let t=mo();if(!t.length)return!1;if(!z){if(e===1)return!1;z={index:t.length,draft:U(),shown:""}}let o=z.index+e;return o<0?!0:o>=t.length?(Q(z.draft),mt(),!0):(hc(o),!0)}function vc(e){if(e.isComposing||!Ke(e.target))return;let t=e.target;if(e.key==="Enter"&&!e.shiftKey){gn(U(t)),mt();return}if(e.key==="Escape"&&z){Q(z.draft),mt(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey)return;let o=Qn(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!z||yc(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function Sc(e){z&&Ke(e.target)&&U(e.target)!==z.shown.trim()&&mt()}function xc(e){e.target instanceof Element&&e.target.closest(d.sendButton)&&gn(U())}var Hi=p({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:he,styles:Ni,start(){fn=new AbortController;let{signal:e}=fn;document.addEventListener("keydown",vc,{capture:!0,signal:e}),document.addEventListener("input",Sc,{capture:!0,signal:e}),document.addEventListener("click",xc,{capture:!0,signal:e}),document.addEventListener("submit",()=>gn(U()),{capture:!0,signal:e})},stop(){fn?.abort(),mt()},onSettingsChange(e){e==="maxEntries"&&ut(mo())}});var _i=`/*
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
`;var Ec=1500,Tc=5e3,Mc=2e3,$e=g({showDate:{type:"boolean",description:"Show the date for messages not sent today.",default:!0},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),fo=new Map,Gi=0,go,$i=[];function Ui(e,t){fo.get(e)!==t&&(fo.set(e,t),clearTimeout(go),go=setTimeout(zi,Mc))}function zi(){let e={...$e.store.stamps,...Object.fromEntries(fo)};$e.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,Ec))}function Cc(e){let t=K(v())?.times;for(let o=e.length-1;o>=0;o--){let n=fo.get(e[o])??t?.get(e[o])??$e.store.stamps[e[o]];if(n)return n}return null}var Lc=()=>N().generating||Date.now()-Gi<Tc;function Ac(e){let t=new Date(e),o=new Date,n={hour:"2-digit",minute:"2-digit"};if(!$e.store.showDate||t.toDateString()===o.toDateString())return t.toLocaleTimeString(void 0,n);let r=t.getFullYear()===o.getFullYear()?{}:{year:"numeric"};return t.toLocaleString(void 0,{...r,month:"short",day:"numeric",...n})}function qi(e){let t=Kt(e)??e.getAttribute("data-message-author-role")??e.closest(d.turn)?.getAttribute("data-turn")??e.querySelector(d.authorRole)?.getAttribute("data-message-author-role");if(Vo(t))return t;let o=tt(e).at(-1);return K(v())?.chain.find(n=>n.id===o)?.role??null}function kc(e){let t=tt(e);if(!t.length||e.querySelector("time:not([data-bloom])"))return;let o=Cc(t);!o&&Lc()&&(o=Date.now(),Ui(t.at(-1),o));let n=e.querySelector(':scope > time[data-bloom="timestamp"]');if(!o||$e.store.hideOwnMessages&&qi(e)==="user"){n?.remove();return}let r=Ac(o);if(n?.textContent===r)return;let i=a("time",{class:`bloom-timestamp bloom-timestamp-${qi(e)??"assistant"}`,text:r,title:new Date(o).toLocaleString(),attrs:{"data-bloom":"timestamp",datetime:new Date(o).toISOString()}});n?n.replaceWith(i):e.prepend(i)}var po=Le(()=>{for(let e of Yo())kc(e)}),Fi=p({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:$e,styles:_i,start(){$i=[D(e=>j(e)&&po()),R.on("conversation",po),R.on("message-time",({messageId:e,time:t})=>{Ui(e,t),po()}),S.on("fall",()=>{Gi=Date.now()})]},stop(){for(let e of $i)e();go&&(clearTimeout(go),zi());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();po()}}});var Pc=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])'],Oc=['[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],ji=g({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),Ki=p({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:ji,styles:()=>Te([...Pc,...ji.store.hideDictationSettings?Oc:[]])});var Rc=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],Ic=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])'],bn=g({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),Vi=p({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:bn,styles:()=>Te([...bn.store.hideShareChat?Rc:[],...bn.store.hideShareProject?Ic:[]])});var Wi='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',Bc='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',Dc="[data-bloom-profile-plan]",Yi="visibility:hidden!important;user-select:none!important",Ji=g({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function Nc(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=Ji.store,r=[];return e&&r.push(n?`:is(${Wi}){display:none!important}`:`:is(${Wi}){${Yi}}`),t&&r.push(`:is(${Bc}){${Yi}}`),e&&o&&r.push(`${Dc}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var Xi,Zi=p({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Ji,styles:Nc,start(){Xi=Ne()},stop(){Xi?.()}});var Qi=`/*
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
`;var k=E("bloom-queue-"),_c=6,$c=8,q=null,pt="",bo=!1,ve=!1;function hn(e,t,o){let n=_(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute("title"),n.addEventListener("mouseenter",()=>ea(t)),n.addEventListener("mouseleave",()=>ea("")),n}function ea(e){let t=q?.querySelector(`.${k("tip")}`);t&&(t.textContent=e)}function qc(e,t,o,n){ve=!0;let r=a("textarea",{class:`bloom-input ${k("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=s=>{ve=!1,pt="",s&&n.edit(t,r.value)};r.addEventListener("keydown",s=>{s.stopPropagation(),!s.isComposing&&(s.key==="Enter"&&!s.shiftKey?(s.preventDefault(),i(!0)):s.key==="Escape"&&(s.preventDefault(),i(!1)))}),r.addEventListener("blur",()=>ve&&i(!0),{once:!0}),e.querySelector(`.${k("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function Gc(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,s=l=>{!i&&Math.abs(l.clientY-n.clientY)<_c||(i||(i=ve=!0,e.classList.add(k("dragging"))),e.style.transform=`translateY(${l.clientY-n.clientY}px)`)},c=l=>{if(removeEventListener("pointermove",s),!i)return;ve=!1,pt="";let f=[...r.children].filter(M=>M!==e).filter(M=>M.getBoundingClientRect().top+M.getBoundingClientRect().height/2<l.clientY).length;o.move(t,f)};addEventListener("pointermove",s),addEventListener("pointerup",c,{once:!0})})}function Uc(e,t,o){let n=a("li",{class:k("row")},a("div",{class:k("text"),text:e}),a("div",{class:k("actions")},hn("trash","Remove from queue",()=>o.remove(t)),hn("edit","Edit",()=>qc(n,t,e,o)),hn("send","Send now",()=>o.sendNow(t))));return Gc(n,t,o),n}function zc(e){if(!q)return;let t=e.getBoundingClientRect();q.style.left=`${t.left}px`,q.style.width=`${t.width}px`,q.style.bottom=`${innerHeight-t.top+$c}px`}function yn(){q?.remove(),q=null,pt="",ve=!1}function ho(e,t){let o=Oo();if(!e.length||!je(o)){yn();return}q||(q=a("div",{class:`bloom-root ${k("tray")}`,attrs:{"data-bloom":"queue"}},a("div",{class:k("header")},a("button",{class:k("toggle"),attrs:{type:"button"},on:{click:()=>{bo=!bo,q?.classList.toggle(k("collapsed"),bo)}}},a("span",{class:k("count")}),I("chevron")),a("span",{class:k("tip")})),a("ol",{class:k("list")})),q.classList.toggle(k("collapsed"),bo),document.body.append(q)),zc(o);let n=JSON.stringify(e);if(ve||n===pt)return;pt=n;let r=q.querySelector(`.${k("count")}`);r&&(r.textContent=xt(e.length,"Queued message")),q.querySelector(`.${k("list")}`)?.replaceChildren(...e.map((i,s)=>Uc(i,s,t)))}var Fc=8,jc=150,Kc=20,na=g({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1}}),le=new Map,yo=!1,Se=null,vn,ta=[],Sn=()=>v()??`draft:${location.pathname}`,V=()=>le.get(Sn())??[];function xe(e){e.length?le.set(Sn(),e):le.delete(Sn()),ho(V(),xn)}function vo(e,t=0){if(N().generating||U()){t<Kc&&setTimeout(()=>vo(e,t+1),jc);return}Q(e),Po(()=>{tr()||Q("")})}function oa(){if(Se!=null){let o=Se;Se=null,vo(o);return}if(!yo||N().generating||U())return;let[e,...t]=V();e!=null&&(yo=!1,xe(t),vo(e))}function ra(e){let t=V(),o=t[e];if(o!=null){if(xe(t.filter((n,r)=>r!==e)),!N().generating){vo(o);return}Se=o,Bt()?.click()}}var xn={remove:e=>xe(V().filter((t,o)=>o!==e)),edit:(e,t)=>xe(t.trim()?V().map((o,n)=>n===e?t:o):V().filter((o,n)=>n!==e)),sendNow:ra,move(e,t){let o=[...V()],[n]=o.splice(e,1);o.splice(t,0,n),xe(o)}};function Vc(e){let t=V();return na.store.replacePending&&t.length?(xe([...t.slice(0,-1),e]),!0):t.length>=Fc?!1:(xe([...t,e]),!0)}function Wc(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!Ke(e.target)||!N().generating)return;let t=U(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;Q(""),Se=t,Bt()?.click();return}if(!t){V().length&&ra(0);return}Vc(t)&&Q("")}var ia=p({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:na,styles:Qi,start(){vn=new AbortController,document.addEventListener("keydown",Wc,{capture:!0,signal:vn.signal}),ta=[S.on("fall",({outcome:e})=>{yo=e==="done",e==="left"&&(Se=null),oa()}),S.on("context",({prevId:e,id:t,migrated:o})=>{let n=[...le.keys()].find(r=>r.startsWith("draft:"));o&&!e&&t&&n&&(le.set(t,le.get(n)??[]),le.delete(n)),o||(yo=!1),ho(V(),xn)}),S.on("tick",()=>{oa(),ho(V(),xn)})]},stop(){vn?.abort();for(let e of ta)e();yn(),le.clear(),Se=null}});var Yc=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function Xc(){let e=G(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!Yc.has(e.toLowerCase())?e:null}function ft(e){return e?K(e)?.title??Cr(e)??(e===v()?Xc():null):null}var aa=`/*
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
`;var oe=E("bloom-recent-"),ce="home",Zc=50,sa=140,Qc=new Set(["Backquote"]),ed=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),y=g({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),de=null,X=[],J=0,wn,la=[],xo=()=>cr()?null:v()??(ge()?ce:null);function ca(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function ua(e){let t=ft(e);t&&y.store.titles[e]!==t&&(y.store.titles={...y.store.titles,[e]:t});let o=Lr(location.href);o&&e===v()&&y.store.projects[e]!==o&&(y.store.projects={...y.store.projects,[e]:o})}function da(e){if(!e)return;let t=[e,...y.store.visits.filter(n=>n!==e)].slice(0,Zc),o=new Set(t);y.store.visits=t,Object.keys(y.store.previews).some(n=>!o.has(n))&&(y.store.previews=ca(y.store.previews,o)),Object.keys(y.store.titles).some(n=>!o.has(n))&&(y.store.titles=ca(y.store.titles,o)),e!==ce&&ua(e)}function gt(e){if(!e||!y.store.visits.includes(e))return;let t={},o=K(e)?.chain??[];for(let r of o)t[r.role]=we(Yt(r),sa);if(e===v())for(let r of Vt()){let i=Wt(r);i&&(t[r.role]=we(i,sa))}let n=y.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(y.store.previews={...y.store.previews,[e]:t})}function td(){let e=Number(y.store.maxRecent);return y.store.visits.filter(t=>t!==ce||y.store.includeHome).slice(0,e)}function En(e){if(bt(),e===xo())return;let t=e===ce?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"]'):Je(e)[0];t?t.click():location.assign(e===ce?"/":`/c/${e}`)}function od(e,t){let o=e===ce?"New chat":y.store.titles[e]??ft(e)??"Untitled chat",n=e===ce?null:y.store.projects[e],r=e===ce?null:y.store.previews[e];return a("button",{class:oe("item"),attrs:{type:"button",role:"option","aria-selected":String(t===J)},on:{click:()=>En(e),mousemove:()=>t!==J&&So(t)}},a("div",{class:oe("head")},a("span",{class:`${oe("title")} bloom-truncate`,text:o}),n&&a("span",{class:oe("project"),text:n})),r?.user&&a("div",{class:`${oe("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&a("div",{class:`${oe("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function So(e){J=(e+X.length)%X.length,de?.querySelectorAll(`.${oe("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===J)))}function nd(){gt(v());let e=xo();X=td(),e&&(X=[e,...X.filter(t=>t!==e)].slice(0,Number(y.store.maxRecent))),X.length&&(J=X.length>1?1:0,de=a("div",{class:`bloom-root ${oe("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:t=>t.target===t.currentTarget&&bt()}},a("div",{class:oe("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...X.map(od))),document.body.append(de))}function bt(){de?.remove(),de=null}var rd=e=>Qc.has(e.code)||ed.has(e.key);function id(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&rd(e)){e.preventDefault(),e.stopPropagation(),de?So(J+(e.shiftKey?-1:1)):nd();return}if(!de)return;let o={Escape:bt,Enter:()=>En(X[J]),ArrowDown:()=>So(J+1),ArrowUp:()=>So(J-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function ad(e){de&&e.key==="Control"&&En(X[J])}var ma=p({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:y,styles:aa,start(){wn=new AbortController;let{signal:e}=wn;addEventListener("keydown",id,{capture:!0,signal:e}),addEventListener("keyup",ad,{capture:!0,signal:e}),addEventListener("blur",bt,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&gt(v()),{signal:e}),la=[re(({prevId:t})=>{gt(t),da(xo())}),R.on("conversation",({id:t})=>{y.store.visits.includes(t)&&ua(t),gt(t),gt(t)})],da(xo())},stop(){wn?.abort();for(let e of la)e();bt()}});var sd=new x("ResponseNotification"),ld=[880,1318.5],cd=.14,pa=.22,dd=.08,fa=1e-4,ud=.02,ht=g({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the built-in chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",description:"Try the sound.",render:e=>(e.append(H("Play",ba)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),Tn=null,ga,Mn;function md(){Tn??=new AudioContext;let e=Tn.currentTime;ld.forEach((t,o)=>{let n=Tn,r=e+o*cd,i=n.createOscillator(),s=n.createGain();i.frequency.value=t,s.gain.setValueAtTime(fa,r),s.gain.exponentialRampToValueAtTime(dd,r+ud),s.gain.exponentialRampToValueAtTime(fa,r+pa),i.connect(s).connect(n.destination),i.start(r),i.stop(r+pa)})}function ba(){let e=ht.store.soundUrl.trim();e?new Audio(e).play().catch(t=>sd.warn("Custom sound failed",t)):md()}function pd(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function fd(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(Mn=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:Mn.signal}))}var ha=p({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:ht,start(){fd(),ga=S.on("fall",({conversationId:e,outcome:t})=>{t==="done"&&(ht.store.onlyWhenHidden&&!document.hidden||(ht.store.sound&&ba(),ht.store.browserNotification&&pd(ft(e))))})},stop(){ga?.(),Mn?.abort()}});var gd="filter:blur(6px)!important;transition:filter 0.2s ease",ya=`:is(${d.sidebars})`,bd={conversations:{selectors:[`${ya} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0},projects:{selectors:[`${ya} a:is([href*="/project"], [href*="/g/g-p-"])`,".bloom-recent-project"],hover:!0},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}},Sa=g({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function hd(){return Object.entries(bd).filter(([e])=>Sa.store[e]).map(([,{selectors:e,hover:t}])=>{let o=e.join(",");return`:is(${o}){${gd}}`+(t?`:is(${o}):hover, .bloom-recent-item:hover :is(${o}){filter:none!important}`:"")}).join(`
`)}var va,xa=p({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:Sa,styles:hd,start(){va=Ne()},stop(){va?.()}});var yd=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],vd=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",Sd='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',wa=g({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function xd(){let e=`${wa.store.width}rem`;return`:is(${vd}){${yd.map(t=>`${t}:${e}!important`).join(";")}}:is(${Sd}){max-width:min(100%, ${e})!important}`}var Ea=p({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:wa,styles:xd});var wd=[_r,Zr,ti,mi,fi,bi,Ci,Bi,Hi,Fi,Ki,Vi,Zi,ia,ma,ha,xa,Ea],Cn=wd;var Ed=new x("Bloom"),Ta="2.0.1";async function Ln(){sr();for(let e of Cn)e.updatedAt=hr[e.name];zn(Cn),await $n(),wt("base",Yn),fr(),Pt("Init"),await Ye(),Rn(),Pt("DOMContentLoaded"),await br(),Pt("HostReady"),Ed.info(`Bloom++ ${Ta} ready`)}var Ma=new x("Boot");if(window===window.top){let e=W.Bloom;e&&Ma.warn("Replacing another Bloom++ instance",e.VERSION),Object.defineProperty(W,"Bloom",{value:An,configurable:!0,writable:!0}),Ln().catch(t=>Ma.error("Startup failed",t))}})();
