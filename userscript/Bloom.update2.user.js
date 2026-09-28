// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260928] v2.0.5
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

/* Bloom++ [20260928] v2.0.5. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Da=Object.defineProperty;var Ba=(e,t)=>{for(var o in t)Da(e,o,{get:t[o],enumerable:!0})};var x=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var St=(e,t,o)=>Math.min(o,Math.max(t,e)),T=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Bn=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,we=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,O=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function xt(e,t){return`${e} ${t}${e===1?"":"s"}`}async function Nn(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function Ge(e){try{return JSON.parse(e)}catch{return}}var V=typeof unsafeWindow>"u"?window:unsafeWindow;var Dn={};Ba(Dn,{VERSION:()=>Oa,init:()=>In,plugins:()=>ue});var Ee=new Map,Lo;function Ao(e){!document.head||e.parentNode===document.head||document.head.append(e)}function Hn(){Lo||!document.head||(Lo=new MutationObserver(()=>{for(let e of Ee.values())e.isConnected||Ao(e)}),Lo.observe(document.head,{childList:!0}))}function wt(e,t){let o=Ee.get(e);o||(o=document.createElement("style"),o.id=`bloom-style-${e}`,Ee.set(e,o)),o.textContent!==t&&(o.textContent=t),Ao(o),Hn()}function Po(e){Ee.get(e)?.remove(),Ee.delete(e)}function _n(){for(let e of Ee.values())Ao(e);Hn()}var E=e=>(...t)=>t.map(o=>e+o).join(" "),Et=(...e)=>e.filter(Boolean).join(" "),Te=e=>e.length?`${e.join(",")}{display:none!important}`:"";function p(e){return e}var Tt=new x("Storage"),Na="bloompp",Mt="kv",$n=null;function Ha(){return $n??=new Promise((e,t)=>{let o=indexedDB.open(Na,1);o.onupgradeneeded=()=>{o.result.objectStoreNames.contains(Mt)||o.result.createObjectStore(Mt)},o.onsuccess=()=>e(o.result),o.onerror=()=>t(o.error)}),$n}function qn(e,t){return Ha().then(o=>new Promise((n,r)=>{let i=t(o.transaction(Mt,e).objectStore(Mt));i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)}))}async function _a(e){if(typeof GM_getValue=="function")try{return await GM_getValue(e)}catch(t){Tt.warn("GM read failed",t);return}}async function $a(e){try{return await qn("readonly",t=>t.get(e))}catch(t){Tt.warn("IndexedDB read failed",t);return}}function qa(e){try{return localStorage.getItem(e)??void 0}catch{return}}async function Gn(e){return Promise.all([_a(e),$a(e),qa(e)])}function Un(e,t){let o=JSON.stringify(t);if(typeof GM_setValue=="function")try{GM_setValue(e,t)}catch{GM_setValue(e,o)}try{localStorage.setItem(e,o)}catch(n){Tt.warn("localStorage write failed",n)}qn("readwrite",n=>n.put(o,e)).catch(n=>Tt.warn("IndexedDB write failed",n))}var Ga=new x("Settings"),Fn="BloomSettings",Ua=100,za=["GM","IndexedDB","localStorage"],Ct={plugins:{}},ko=new Set,Ue;function Fa(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=Ge(t);return!T(t)||!T(t.plugins)||!Object.keys(t.plugins).length?null:t}var Oo=e=>e==null||e===""||(Array.isArray(e)?!e.length:T(e)&&!Object.keys(e).length);function ja(e){return Oo(e)?0:Array.isArray(e)?12+Math.min(e.length,40):T(e)?12+Math.min(Object.keys(e).length,40):3}function Ka(e){let t=0;for(let o of Object.values(e.plugins))if(T(o))for(let[n,r]of Object.entries(o))n!=="enabled"&&(t+=ja(r));return t}var zn=e=>Object.values(e.plugins).filter(t=>T(t)&&t.enabled===!0).length;function Wa(e){let t=e.map((i,s)=>i&&{candidate:i,index:s,score:Ka(i)}).filter(i=>i!=null).toSorted((i,s)=>s.score-i.score||(i.score?0:zn(s.candidate)-zn(i.candidate))||i.index-s.index);if(!t.length)return null;let[o,...n]=t,r=structuredClone(o.candidate);for(let{candidate:i}of n)for(let[s,c]of Object.entries(i.plugins)){if(!T(c))continue;let l=r.plugins[s]??={};for(let[u,f]of Object.entries(c))u==="enabled"?!("enabled"in l)&&f===!0&&(l.enabled=!0):Oo(l[u])&&!Oo(f)&&(l[u]=structuredClone(f));Object.keys(l).length||delete r.plugins[s]}return{bag:r,source:za[o.index]}}async function jn(){let e=await Gn(Fn),t=Wa(e.map(Fa));t&&(Ct.plugins=t.bag.plugins,Ga.info("Loaded settings from",t.source))}function Kn(){Ue=void 0,Un(Fn,Ct)}function Va(){Ue&&(clearTimeout(Ue),Kn())}var ce=(e,t)=>Ct.plugins[e]?.[t];function de(e,t,o){let n=Ct.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,clearTimeout(Ue),Ue=setTimeout(Kn,Ua);for(let r of ko)r(e,t)}function Me(e){return ko.add(e),()=>void ko.delete(e)}function Ro(e){return e.type==="component"?void 0:e.default}function g(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>ce(t.pluginName,n)??(e[n]&&Ro(e[n])),set:(o,n,r)=>(de(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&ce(t.pluginName,o)!==void 0&&de(t.pluginName,o)}};return t}var Wn=e=>{let t=()=>{let o=ce("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();de("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},Lt=Wn("pinnedPlugins"),At=Wn("starredPlugins");addEventListener("pagehide",Va);var Pt=new x("PluginManager"),ue=new Map,ze=new Set,Vn=new Set,Io=new Set;function Yn(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),ue.set(t.name,t)}var Fe=e=>!!e.required||(ce(e.name,"enabled")??!!e.enabledByDefault);var Do=e=>`plugin-${e.name}`;function Xn(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?wt(Do(e),t):Po(Do(e))}function Jn(e){if(!ze.has(e.name))try{Xn(e),e.start?.(),ze.add(e.name)}catch(t){Pt.error(`Failed to start ${e.name}`,t)}}function Ya(e){if(ze.delete(e.name)){Po(Do(e));try{e.stop?.()}catch(t){Pt.error(`Failed to stop ${e.name}`,t)}}}var Zn=e=>e.startAt??"HostReady";function kt(e){Vn.add(e);for(let t of ue.values())Zn(t)===e&&Fe(t)&&Jn(t);Pt.info(`${e}: ${[...ze].join(", ")}`)}function Qn(e,t){de(e.name,"enabled",t),t?Vn.has(Zn(e))&&Jn(e):Ya(e);for(let o of Io)o()}function er(e){return Io.add(e),()=>void Io.delete(e)}Me((e,t)=>{let o=ue.get(e);if(!(!o||t==="enabled"||!ze.has(e)))try{Xn(o),o.onSettingsChange?.(t)}catch(n){Pt.error(`Settings change failed for ${e}`,n)}});var tr=`/*
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
`;var Ja=new x("Dom");function a(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var or=document.createElement("template");function nr(e){return or.innerHTML=e.trim(),or.content.firstElementChild.cloneNode(!0)}var Ke=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),Ce=(e,t=document)=>[...t.querySelectorAll(e)].find(Ke)??null,Za=16,Qa="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function rr(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([Qa],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function Bo(e){document.hidden?setTimeout(e,Za):requestAnimationFrame(e)}function Le(e){let t=!1;return()=>{t||(t=!0,Bo(()=>{t=!1;try{e()}catch(o){Ja.error("Scheduled task failed",o)}}))}}var Ot=new Set,Rt=[],je,es=Le(()=>{let e=Rt;Rt=[];for(let t of Ot)t(e)});function C(e){return Ot.add(e),je||(je=new MutationObserver(t=>{Rt.push(...t),es()}),je.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{Ot.delete(e),!Ot.size&&(je?.disconnect(),je=void 0,Rt=[])}}var ts=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),H=e=>!e.length||e.some(t=>!ts(t.target));function me(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size");return}e.getAttribute("data-bloom-text")!==t&&(e.hasAttribute("data-bloom-text")||e.style.setProperty("--bloom-text-size",getComputedStyle(e).fontSize),e.setAttribute("data-bloom-text",t))}var os=new x("Events");function It(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){os.error(`Listener for ${String(t)} failed`,r)}}}}var d={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]'};var ir=/[​-‍﻿]/g,Ae=()=>Ce(d.composerInput),We=e=>e instanceof HTMLElement&&e.matches(d.composerInput),No=(e=Ae())=>e?.closest("form")??document.querySelector(d.oldComposerForm);function z(e=Ae()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(ir,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(ir,"").trim()}var ns=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function Q(e,t=Ae()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return ns?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function ar(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:s,value:c}=e;return{first:!c.slice(0,i).includes(`
`),last:!c.slice(s).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var sr=e=>{let t=No();return(t&&Ce(e,t))??Ce(e)},Dt=()=>sr(d.stopButton),rs=()=>{let e=sr(d.sendButton);return e&&!e.matches(d.stopButton)?e:null};function lr(){let e=rs();if(e&&!e.disabled)return e.click(),!0;let t=Ae();return t?(t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),!0):!1}var cr=()=>Ke(Dt());var mr=new x("Network"),is=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,as=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,Nt=1e3,ss=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),D=It(),Ho=new Map,dr=new Map,ls=1,K=e=>e?Ho.get(e)??null:null;function Bt(e){let t=Ho.get(e);return t||Ho.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var pr=e=>e==="user"||e==="assistant";function fr(e){let t=e.author?.role;if(!e.id||!pr(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(l=>typeof l=="string").join(`
`).trim(),i=n.filter(l=>T(l)&&l.content_type==="image_asset_pointer").length,s=e.metadata?.attachments,c=Array.isArray(s)&&s.length>0;return!r&&!i&&!c?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*Nt:null,text:r,hasFiles:c,imageCount:i}}var gr=e=>e.filter((t,o)=>t.role==="user"||e[o+1]?.role!=="assistant");function cs(e,t){let o=t.filter(T).map(i=>T(i.message)?i.message:i);for(let i of o)i.id&&i.create_time&&e.times.set(i.id,i.create_time*Nt);let n=o.map(fr).filter(i=>i!=null),r=new Set(n.map(i=>i.id));return e.chain=gr([...e.chain.filter(i=>!r.has(i.id)),...n]),e}function ds(e,t){if(!T(t)||!(T(t.mapping)||Array.isArray(t.messages)))return null;let o=Bt(e);if(typeof t.title=="string"&&t.title&&(o.title=t.title),Array.isArray(t.messages))return cs(o,t.messages);let n=t.mapping;for(let c of Object.values(n)){let l=c.message?.create_time;c.message?.id&&l&&o.times.set(c.message.id,l*Nt)}let r=[],i=new Set,s=typeof t.current_node=="string"?t.current_node:null;for(;s&&!i.has(s)&&n[s];){i.add(s);let c=n[s].message,l=c?fr(c):null;l&&r.push(l),s=n[s].parent??null}return r.length&&(o.chain=gr(r.toReversed())),o}function us(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}function ms(e){if(typeof e?.body!="string")return null;let t=Ge(e.body);return T(t)&&typeof t.conversation_id=="string"?t.conversation_id:null}function ps(e,t){if(!T(e))return;typeof e.type=="string"&&ss.has(e.type)&&(t.handoff=!0);let o=T(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(Bt(e.conversation_id).title=e.title,D.emit("conversation",Bt(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&pr(n.author?.role)){let r=n.create_time*Nt;t.conversationId&&Bt(t.conversationId).times.set(n.id,r),D.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function fs(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:s}=await o.read();if(i)break;r+=n.decode(s,{stream:!0});let c=r.split(`
`);r=c.pop()??"";for(let l of c){if(!l.startsWith("data:"))continue;let u=l.slice(5).trim();u&&u!=="[DONE]"&&ps(Ge(u),t)}}}async function gs(e,t,o){let n={conversationId:t,error:!1,handoff:!1};dr.set(e,t),D.emit("generate-start",{requestId:e,conversationId:t});try{let r=await o;r.ok?r.headers.get("content-type")?.includes("event-stream")&&await fs(r.clone(),n):n.error=!0}catch(r){let i=r instanceof DOMException&&r.name==="AbortError";n.handoff||=i,n.error||=!i}finally{dr.delete(e),D.emit("generate-end",{requestId:e,...n})}}async function bs(e,t){try{let o=await t;if(!o.ok)return;let n=ds(e,await o.clone().json());n&&D.emit("conversation",n)}catch(o){mr.debug("Conversation read skipped",o)}}function hs(e,t,o){let n=us(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&is.test(n.pathname)){gs(ls++,ms(t),o);return}let i=r==="GET"&&n.pathname.match(as)?.[1];i&&bs(i,o)}var ur=!1;function br(){if(ur)return;ur=!0;let e=V.fetch,t=function(o,n){let r=e.call(this??V,o,n);try{hs(o,n,r)}catch(i){mr.error("Fetch tap failed",i)}return r};V.fetch=typeof exportFunction=="function"?exportFunction(t,V):t}var ys="main, nav, [data-app-action-sidebar-scroll], [data-app-navigation-rail]";function pe(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var hr=()=>new Promise(e=>{typeof requestIdleCallback=="function"?requestIdleCallback(()=>e(),{timeout:1500}):setTimeout(e,100)});async function vs(){for(;!document.querySelector(ys);)await new Promise(e=>setTimeout(e,100));await hr(),await hr()}async function Ht(){await pe(),await Promise.race([vs(),new Promise(e=>setTimeout(e,8e3))])}var Ss=new x("Route"),yr=/\/c\/(?!local-)([\w-]+)/,xs=500,qo=e=>{try{return new URL(e,location.origin).pathname.match(yr)?.[1]??null}catch{return null}},v=()=>location.pathname.match(yr)?.[1]??null,fe=()=>location.pathname==="/",vr=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",$t=new Set,qt=location.href,$o=v(),_t;function _o(){if(location.href===qt)return;let e={prevHref:qt,href:location.href,prevId:$o,id:v()};qt=e.href,$o=e.id;for(let t of $t)try{t(e)}catch(o){Ss.error("Route listener failed",o)}}function ws(){let e=new AbortController,{navigation:t}=V;t?.addEventListener("currententrychange",()=>queueMicrotask(_o),{signal:e.signal}),addEventListener("popstate",_o,{signal:e.signal});let o=setInterval(_o,xs);return()=>{e.abort(),clearInterval(o)}}function re(e){return $t.add(e),_t||(qt=location.href,$o=v(),_t=ws()),()=>{$t.delete(e),!$t.size&&(_t?.(),_t=void 0)}}var Es=250,Ts=400,Ms=6e4,Cs=5e3,Ls=`:is(${d.turn}) :is(${d.turnBusy})`,S=It(),zt=new Set,Go=new Set,ie=!1,xr=0,Pe=null,ke=!1,Gt=!1,Ve=0,Ye=null,Sr=!1,_=()=>({generating:ie,conversationId:v()}),wr=()=>cr()||!!document.querySelector(Ls);function As(){let e=wr();return e?Gt||(Ve=0):Gt=!1,[...zt].some(t=>!Go.has(t))||e&&!Gt||Date.now()<Ve}function Ps(){return Ye?.error?"error":ke?"stopped":"done"}function ks(){Pe=null,ie=!1,S.emit("fall",{conversationId:v(),outcome:Ps()}),ke=!1,Ye=null}function Er(){let e=As();e&&!ie&&(ie=!0,xr=Date.now(),ke=!1,Ye=null,S.emit("rise",{conversationId:v()})),e||!ie?Pe=null:Pe==null?Pe=Date.now():Date.now()-Pe>=Ts&&ks()}function Ut(){Er(),S.emit("tick",_())}function Os({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(ie||Date.now()-xr<Ms);if(!o&&ie){for(let n of zt)Go.add(n);Gt=wr(),Ve=0,Pe=null,ie=!1,ke=!1,Ye=null,S.emit("fall",{conversationId:e,outcome:"left"})}S.emit("context",{prevId:e,id:t,migrated:o}),Ut()}function Rs(e){e.target instanceof Element&&e.target.closest(d.stopButton)&&(ke=!0,Ve=0)}function Tr(){Sr||(Sr=!0,D.on("generate-start",({requestId:e})=>{zt.add(e),Ut()}),D.on("generate-end",e=>{zt.delete(e.requestId),!Go.delete(e.requestId)&&(Ye=e,Ve=e.handoff&&!e.error&&!ke?Date.now()+Cs:0,Ut())}),re(Os),document.addEventListener("click",Rs,!0),rr(Ut,Es),pe().then(()=>C(Er)))}var Mr={BetterNavigator:1790616549e3,ChatListStatus:1790616549e3,ChatStateFavicons:1790616549e3,Cleaner:1790616549e3,ComposerOpacity:1790616549e3,CustomSidebarIdentity:1790616549e3,GreetingCustomizer:1790616549e3,InputHistory:1790616549e3,MessageTimestamps:1790618829e3,NoDictation:1790616549e3,NoShareLink:1790616549e3,NoSidebarIdentity:1790616549e3,PromptQueue:1790620238e3,RecentTopics:1790620238e3,ResponseNotification:1790616549e3,Settings:1790616549e3,StreamerMode:1790616549e3,WiderChat:1790616549e3};var b=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,Is="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",Ds={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${Is}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:b('<path d="M18 6 6 18M6 6l12 12"/>'),gear:b('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:b('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:b('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:b('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:b('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:b('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:b('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:b('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:b('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:b('<path d="m6 9 6 6 6-6"/>'),play:b('<path d="M7 4v16l13-8z"/>'),plus:b('<path d="M12 5v14M5 12h14"/>'),check:b('<path d="m5 12 5 5 9-10"/>'),alert:b('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:b('<path d="M4 5h16v11H9l-5 4z"/>'),layout:b('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:b('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:b('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:b('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:b('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:b('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:b('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:b('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:b('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:b('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:b('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:b('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:b('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:b('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:b('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),grip:b('<path d="M9 6h0M15 6h0M9 12h0M15 12h0M9 18h0M15 18h0"/>')},B=e=>nr(Ds[e]);var Bs=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,Cr=/\S+@\S+\.\S+/,Ns=3,Hs=/^\/g\/(g-p-[^/]+)\//,_s=/^g-p-[0-9a-f]+-?/i,Lr=e=>!!e.closest(".sr-only"),Uo=e=>!!e?.querySelector(d.menuButton);function Ar(){return[...document.querySelectorAll(d.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(Uo)).filter(e=>e!=null)}function Pr(){let e=[...document.querySelectorAll(d.oldProfile)];if(e.length)return e.map(o=>({kind:"profile",anchor:o,insert:n=>{(o.parentElement?.children.length===1?o.parentElement:o).before(n)}}));let t=Ar().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(d.rail)){let n=[...o.children].find(Uo);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}var zo=e=>!e.closest("[data-bloom]")&&(!!e.querySelector("img, [class*=rounded-full]")||Ir(e).some(t=>!Lr(t))),kr=e=>[...e.parentElement?.children??[]].find(t=>t!==e&&t instanceof HTMLElement&&zo(t))??null;function Or(){let e=[...document.querySelectorAll(d.oldProfile)];return e.length?e:[...Ar(),...[...document.querySelectorAll(d.rail)].map(o=>[...o.children].findLast(Uo))].map(o=>[...o?.querySelectorAll(d.menuButton)??[]].findLast(n=>zo(n)||kr(n))).filter(o=>o!=null)}var Rr=()=>Or().map(e=>zo(e)?e:kr(e)).filter(e=>e!=null);function Ir(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!O(t.textContent??"")&&!(t instanceof SVGElement))}var $s=e=>{let t=getComputedStyle(e);return t.borderRadius.includes("%")||Number.parseFloat(t.borderRadius)>=e.clientWidth/2||/rounded-full/.test(e.getAttribute("class")??"")};function Xe(e,t){e&&!e.hasAttribute(t)&&e.setAttribute(t,"")}function qs(e){if(O(e.textContent??"").length>Ns)return null;for(let t=e;t&&t!==e.closest("button");t=t.parentElement)if($s(t))return t;return null}function Fo(e,t){Xe(e,`data-bloom-${t}`);let o=e.querySelector("img:not([data-bloom] img)"),n=Ir(e),r=o?null:n.map(qs).find(f=>f!=null),i=o?.closest("[class*=rounded-full]"),s=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");Xe(s,`data-bloom-${t}-avatar`);let c=n.filter(f=>!s?.contains(f)&&!Lr(f)),l=c.find(f=>Bs.test(O(f.textContent??""))),u=c.find(f=>Cr.test(f.textContent??""));Xe(l,`data-bloom-${t}-plan`),Xe(u,`data-bloom-${t}-email`),Xe(c.find(f=>f!==l&&f!==u),`data-bloom-${t}-name`)}function Gs(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function Ft(){return Or().map(Gs).find(e=>e!=null)??[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&(Cr.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var Je=e=>[...document.querySelectorAll(d.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&qo(t.href)===e);function Dr(e){let t=Je(e).find(o=>O(o.textContent??""));return t?O(t.textContent??""):null}function Br(e){let t=new URL(e,location.origin).pathname.match(Hs)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!qo(n.href)&&O(n.textContent??""));return o?O(o.textContent??""):t.replace(_s,"").replaceAll("-"," ")||null}function jo(e,t,o){let n=a("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o}});return n.addEventListener("click",r=>{r.stopPropagation();let i=n.getAttribute("aria-checked")!=="true";n.setAttribute("aria-checked",String(i)),t(i)}),n}function $(e,t,o){return a("button",{class:Et("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button"},on:{click:t}})}function q(e,t,o,n){let r=a("button",{class:"bloom-icon-button",title:t,attrs:{type:"button","aria-label":t},on:{click:o}},B(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function jt(e,t,o,n,r,i){let s=a("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});s.value=String(e);let c=a("output",{text:`${e}${r}`});return s.addEventListener("input",()=>{c.textContent=`${s.value}${r}`,i(Number(s.value))}),a("div",{class:"bloom-slider"},s,c)}function Ko(e,t,o){let n=a("select",{class:"bloom-select"},...t.map(r=>a("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function Ze(e,t,o="",n="text"){let r=a("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var Us=new x("SettingsPanel"),m=E("bloom-settings-"),zs=10080*60*1e3,Fs=3e3,Nr="Toggle features. Some need a reload. Click the sliders icon to configure.",js=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Ks=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],Ws={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},Hr=new Set(["chat","ui","privacy"]),N=null,Oe="all",Wo="all",Kt="",Vo=[],_r=()=>[...ue.values()].filter(e=>!e.hidden),Vs=e=>!!e.updatedAt&&Date.now()-e.updatedAt<zs;function Ys(e){switch(Oe){case"favorites":return At.has(e.name);case"recent":return Vs(e);case"all":return!0;case"other":return!e.tags.some(t=>Hr.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(Oe)}}function Xs(e){switch(Wo){case"all":return!0;case"enabled":return Fe(e);case"disabled":return!Fe(e)}}function Js(e){let t=Kt.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function Zs(e){let t=Lt.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return Oe==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var $r=e=>e.settings?.def??{},Qs=e=>Object.values($r(e)).some(t=>t.type!=="custom");function el(e,t,o){let n=ce(e.name,t)??Ro(o),r=i=>de(e.name,t,i);switch(o.type){case"boolean":return jo(n,r,o.description??t);case"slider":return jt(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return Ko(n,o.options,r);case"string":return Ze(n,r,o.placeholder);case"number":return Ze(String(n),i=>r(Number(i)),"","number");case"component":{let i=a("div",{class:m("component")});return Vo.push(o.render(i)),i}case"custom":return null}}var tl=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function qr(e){if(!N)return;let t=Object.entries($r(e)).filter(([,i])=>i.type!=="custom").map(([i,s])=>{let c=el(e,i,s),l=s.type==="boolean";return a("div",{class:m("field",l?"field-inline":"field-stacked")},a("div",{class:m("field-text")},s.type!=="component"&&a("div",{class:m("field-label"),text:tl(i)}),s.description&&a("div",{class:m("field-desc"),text:s.description})),c)}),o,n=$("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},Fs);return}clearTimeout(o),e.settings?.reset(),Qe(),qr(e)},"danger"),r=a("div",{class:m("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&Qe()}},a("div",{class:m("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},a("div",{class:m("popup-header")},a("div",{class:m("card-icon")},B(e.icon)),a("div",{class:m("popup-title")},a("div",{class:m("card-name"),text:e.name}),a("div",{class:m("popup-authors"),text:e.authors.join(", ")})),q("close","Close",Qe)),a("p",{class:m("popup-desc"),text:e.description}),a("div",{class:m("fields")},...t),a("div",{class:m("popup-footer")},n)));N.querySelector(`.${m("modal")}`)?.append(r)}function Qe(){for(let e of Vo)e();Vo=[],N?.querySelector(`.${m("popup-backdrop")}`)?.remove()}function ol(e){let t=Fe(e),o=At.has(e.name),n=Lt.has(e.name);return a("div",{class:m("card",t?"card-on":"card-off")},a("div",{class:m("card-top")},a("div",{class:m("card-icon")},B(e.icon)),a("div",{class:m("card-actions")},q("star",o?"Unstar":"Star",()=>{At.toggle(e.name),ge()},o),q("pin",n?"Unpin":"Pin to top",()=>{Lt.toggle(e.name),ge()},n),Qs(e)&&q("gear","Settings",()=>qr(e)),e.required?null:jo(t,r=>Qn(e,r),`Enable ${e.name}`))),a("div",{class:m("card-name"),text:e.name}),a("div",{class:m("card-desc"),text:e.description,title:e.description}),a("div",{class:m("card-footer"),text:e.authors.join(", ")}))}function Gr(){let e=_r().some(o=>!o.tags.some(n=>Hr.has(n)));N?.querySelector(`.${m("tabs")}`)?.replaceChildren(...js.filter(o=>o.id!=="other"||e).map(o=>a("button",{class:m("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===Oe)},on:{click:()=>{Oe=o.id,Gr(),ge()}}})))}function ge(){if(!N)return;let e=_r().filter(Ys),t=N.querySelector(`.${m("search")} input`);t&&(t.placeholder=`Search ${xt(e.length,"plugin")}...`);let o=Zs(e.filter(i=>Js(i)&&Xs(i))),n=N.querySelector(`.${m("grid")}`),r=Kt.trim()?"No plugins match your search.":Ws[Oe]??"No plugins available.";n?.replaceChildren(...o.length?o.map(ol):[a("div",{class:m("empty"),text:r})])}function nl(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),N?.querySelector(`.${m("popup-backdrop")}`)?Qe():Re())}var Ur,Yo;function rl(){if(N)return;let e=a("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=Kt,e.addEventListener("input",()=>{Kt=e.value,ge()}),N=a("div",{class:`bloom-root ${m("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&Re()}},a("div",{class:m("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},a("div",{class:m("header")},a("div",{class:m("logo")},B("bloom")),a("h2",{class:m("title"),text:"Bloom++"}),a("span",{class:m("hint"),title:Nr,attrs:{"aria-label":Nr,tabindex:"0"}},B("info")),a("span",{class:m("version"),text:"v2.0.5"}),q("close","Close",Re)),a("div",{class:m("tabs"),attrs:{role:"tablist"}}),a("div",{class:m("toolbar")},a("label",{class:m("search")},B("search"),e),Ko(Wo,Ks,t=>{Wo=t,ge()})),a("div",{class:m("grid")}))),N.addEventListener("keydown",t=>t.stopPropagation()),Yo=new AbortController,document.addEventListener("keydown",nl,{capture:!0,signal:Yo.signal}),document.body.append(N),Gr(),ge(),Ur=er(ge),e.focus(),Us.debug("Opened")}function Re(){Qe(),Yo?.abort(),Ur?.(),N?.remove(),N=null}var Wt=()=>N?Re():rl();var zr=`/*
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
`;var et=E("bloom-entry-"),Ie=new Map,Fr=!1,jr;function al(e){let t=a("button",{class:et("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:o=>{o.preventDefault(),o.stopPropagation(),Wt()}}},B("bloom"),e!=="rail"&&a("span",{class:et("label"),text:"Bloom++"}));return a("div",{class:`bloom-root ${et("wrap")} ${et(e)}`,attrs:{"data-bloom":"entry"}},t)}function sl(e){let t=a("div",{class:`bloom-root ${et("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),Wt()}}},B("bloom"),a("span",{text:"Bloom++"})),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function ll(){let e=Pr();for(let[o,n]of Ie)o.isConnected&&e.some(r=>r.anchor===o)||(n.remove(),Ie.delete(o));for(let o of e){let n=Ie.get(o.anchor);if(n?.isConnected)continue;let r=n??al(o.kind);Ie.set(o.anchor,r),o.insert(r)}let t=Ft();t&&!t.querySelector('[data-bloom="menu-entry"]')&&sl(t)}var Kr=p({name:"Settings",description:"Bloom++ settings panel and its sidebar entry.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,hidden:!0,startAt:"HostReady",styles:zr,start(){jr=C(ll),!Fr&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",Wt),Fr=!0)},stop(){jr?.();for(let e of Ie.values())e.remove();Ie.clear(),Re()}});var cl=["data-turn","data-message-author-role"],dl=/:(user|assistant)$/,Xo=`${d.messageUnit}, ${d.oldMessage}`,Jo=e=>e==="user"||e==="assistant";function Zo(){let e=document.querySelector(d.timelineScroll);if(e)return e;let t=document.querySelector(d.turn);for(let o=t?.parentElement;o;o=o.parentElement){let{overflowY:n}=getComputedStyle(o);if((n==="auto"||n==="scroll")&&o.scrollHeight>o.clientHeight)return o}return document.scrollingElement}var Yr=()=>document.querySelector(d.conversationTarget)??document.querySelector(d.oldThread),Vt=e=>e.getAttribute("data-chatgpt-search-unit-key")?.match(dl)?.[1]??null,Xr=e=>[...e.querySelectorAll(d.searchUnit)].filter(t=>Vt(t)&&!t.parentElement?.closest(d.searchUnit)),Wr=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function tt(e){let t=Wr(e);return t.length?t:[...new Set([...e.querySelectorAll(Xo)].flatMap(Wr))]}function Qo(e=document){let t=Xr(e);return t.length?t:[...e.querySelectorAll(Xo)].filter(o=>!o.parentElement?.closest(Xo))}function ul(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function ml(e){for(let t of cl){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(Jo(o))return o}return e.querySelector(d.markdown)||e.querySelector(d.generatedImage)?"assistant":null}var pl=e=>!e.parentElement?.closest(d.turn);function Yt(){let e=K(v())?.chain??[],t=[...document.querySelectorAll(d.turn)].filter(pl).flatMap(n=>{let r=Xr(n);return r.length?r.map(i=>({el:i,known:Vt(i)})):[{el:n,known:null}]}),{generating:o}=_();return t.map(({el:n,known:r},i)=>{let s=r?tt(n):Qo(n).flatMap(tt),c=r??ml(n)??ul(s,e)??(i%2?"assistant":"user"),l=c==="assistant"&&(n.matches(d.turnBusy)||!!n.querySelector(d.turnBusy)||o&&i===t.length-1);return{el:n,role:c,messageIds:s,streaming:l}})}var fl="[data-bloom], .sr-only",gl=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,Vr=new WeakMap;function Xt(e){let t=e.el.textContent?.length??0,o=Vr.get(e.el);if(o?.length===t)return o.summary;let n=bl(e);return Vr.set(e.el,{length:t,summary:n}),n}function bl(e){let t=e.el.querySelectorAll(d.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.querySelector(e.role==="assistant"?d.markdown:".whitespace-pre-wrap")??e.el,i=[...o.querySelectorAll(fl)].map(s=>O(s.textContent??"")).filter(Boolean).reduce((s,c)=>s.replace(c,`
`),o.innerText||o.textContent||"").split(`
`).map(O).filter(s=>s&&!gl.test(s));return i.length?i.join(" "):e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function Jt(e){return e.text?O(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var Jr=`/*
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
`;var P=E("bloom-nav-"),ri=80,yl=1200,vl=2,Sl=40,xl=.3,Zr=12,wl={user:"\u2753",assistant:"\u{1F916}"},eo=g({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the outline too.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),R=null,G=[],De=-1,Zt="",Qr=0,ei=[],ot=null,Qt;function ii(){let e=Yt().map(s=>({role:s.role,summary:Xt(s),ids:s.messageIds,turn:s,streaming:s.streaming})),t=K(v())?.chain??[];if(!t.length)return e;let o=new Set(t.map(s=>s.id)),n=new Map(e.flatMap(s=>s.ids.map(c=>[c,s]))),r=new Set,i=[];for(let s of t){let c=n.get(s.id);c&&r.has(c)||(c&&r.add(c),i.push(c??{role:s.role,summary:Jt(s),ids:[s.id],turn:null,streaming:!1}))}return[...i,...e.filter(s=>!s.ids.some(c=>o.has(c)))]}function El(e){let t=e.getBoundingClientRect(),o=t.top+t.height*xl,n=-1;return G.forEach((r,i)=>{let s=r.turn?.el.getBoundingClientRect();s&&s.top<=o&&(n=i)}),n===-1?G.findIndex(r=>r.turn):n}function ti(e){eo.store.jumpEffect==="border"&&(e.classList.add(P("flash")),setTimeout(()=>e.classList.remove(P("flash")),yl))}function en(e){let t=G[e],o=Zo();if(!t||!o)return;let n=t.turn?.el;if(n?.isConnected){let u=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:u<o.clientHeight*vl?"smooth":"auto"}),ti(n);return}let r=G.map((u,f)=>u.turn?f:-1).filter(u=>u>=0),i=r.length&&e<r[0]?-1:1,s=++Qr,c=0,l=()=>{if(s!==Qr||c++>Sl)return;G=ii();let u=G.find(f=>f.ids.some(L=>t.ids.includes(L)))?.turn?.el;if(u){u.scrollIntoView({block:"start"}),ti(u);return}o.scrollBy({top:i*o.clientHeight*.9}),requestAnimationFrame(l)};l()}function Tl(e,t){return a("button",{class:P("row"),attrs:{type:"button","data-index":String(t)},on:{click:()=>en(t)}},a("span",{text:wl[e.role]}),a("span",{class:"bloom-truncate",text:we(e.summary||"\u2026",ri)}))}function Ml(){let e=Zo(),t=Yr()??e;if(G=ii(),!G.length||!e||!t){R?.remove(),R=null,Zt="";return}ot!==e&&(Qt?.abort(),Qt=new AbortController,e.addEventListener("scroll",Le(oi),{passive:!0,signal:Qt.signal}),ot=e),R??=a("div",{class:`bloom-root ${P("root")}`,attrs:{"data-bloom":"navigator"}},a("div",{class:P("rail")}),a("div",{class:P("toc")},a("div",{class:P("toc-head")}),a("div",{class:P("toc-list")}))),R.isConnected||document.body.append(R);let o=t.getBoundingClientRect(),n=e.getBoundingClientRect();R.style.left=`${Math.min(o.right+Zr,n.right-Zr*2)}px`,R.style.top=`${n.top+n.height/2}px`;let r=JSON.stringify([eo.store.showAssistant,G.map(i=>[i.role,i.summary,i.streaming])]);r!==Zt&&(Zt=r,Cl()),oi()}function oi(){if(!R||!ot)return;De=El(ot),R.querySelectorAll(`.${P("tick")}`).forEach((t,o)=>t.classList.toggle(P("tick-current"),o===De)),R.querySelectorAll(`.${P("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===De)));let e=R.querySelector(`.${P("toc-head")}`);e&&(e.textContent=`${De+1} / ${G.length}`)}function Cl(){R?.querySelector(`.${P("rail")}`)?.replaceChildren(...G.map((t,o)=>a("button",{class:Et(P("tick"),P(`tick-${t.role}`),t.streaming&&P("tick-streaming")),title:we(t.summary,ri),attrs:{type:"button","aria-label":`Jump to message ${o+1}`},on:{click:()=>en(o)}})));let e=G.map((t,o)=>({entry:t,index:o})).filter(({entry:t})=>eo.store.showAssistant||t.role==="user");R?.querySelector(`.${P("toc-list")}`)?.replaceChildren(...e.map(({entry:t,index:o})=>Tl(t,o)))}var ae=Le(Ml),Ll=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function ni(e){if(!R||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||Ll(document.activeElement)||document.querySelector("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:De-1,ArrowDown:De+1,Home:0,End:G.length-1}[e.key];o==null||o<0||o>=G.length||(e.preventDefault(),e.stopPropagation(),en(o))}var ai=p({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:eo,styles:Jr,start(){ei=[C(e=>H(e)&&ae()),re(ae),D.on("conversation",ae),S.on("rise",ae),S.on("fall",ae)],addEventListener("keydown",ni,!0),addEventListener("resize",ae,{passive:!0})},stop(){for(let e of ei)e();Qt?.abort(),ot=null,removeEventListener("keydown",ni,!0),removeEventListener("resize",ae),R?.remove(),R=null,Zt=""},onSettingsChange:ae});var si=`/*
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
`;var Pl=E("bloom-cls"),kl="bloom-cls",Ol=600*1e3,on=Bn("tab"),Ne=new Map,rt=new Map,Be=null,li=[],Rl=e=>e==="streaming"||e==="error";function Il(){let e=new Map,t=Date.now();for(let[o,n]of rt)t-n.at>Ol?rt.delete(o):e.set(o,n.status);for(let[o,n]of Ne)e.set(o,n);return e}function Dl(e){return a("span",{class:`bloom-root ${Pl("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&B("alert"))}function nt(){let e=Il(),t=new Set;for(let[o,n]of e)for(let r of Je(o)){let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let s=Dl(n);t.add(s),r.append(s)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function to(e,t){e&&(t?Ne.set(e,t):Ne.delete(e),Be?.postMessage({tab:on,id:e,status:t}),nt())}function Bl({data:e}){!T(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===on||(Rl(e.status)?rt.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):rt.delete(e.id),nt())}function tn(){for(let e of Ne.keys())Be?.postMessage({tab:on,id:e,status:null})}var ci=p({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,styles:si,start(){Be=typeof BroadcastChannel=="function"?new BroadcastChannel(kl):null,Be?.addEventListener("message",Bl),addEventListener("pagehide",tn),li=[S.on("rise",({conversationId:e})=>to(e,"streaming")),S.on("fall",({conversationId:e,outcome:t})=>to(e,t==="error"?"error":null)),S.on("context",({prevId:e,id:t,migrated:o})=>{o&&_().generating?to(t,"streaming"):!o&&Ne.get(e??"")==="streaming"&&to(e,null)}),C(e=>H(e)&&nt())],v()&&nt()},stop(){for(let e of li)e();tn(),Be?.close(),Be=null,removeEventListener("pagehide",tn),Ne.clear(),rt.clear(),nt()}});var ui=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],ro={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Nl={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Hl="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",nn=32,io=64,rn="#FCFCFC",an="#111111",_l=14,ao=51.5,$l=12.5,ql=9.75,di=52,Gl=10.5,Ul=7.75,zl={rotate:e=>e.arc(ao,ao,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function oo(e){let t=document.createElement("canvas");t.width=t.height=nn;let o=t.getContext("2d");return o?(o.scale(nn/io,nn/io),e(o),t.toDataURL("image/png")):""}function no(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D(Hl);o&&(e.strokeStyle=an,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function so(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function Fl(e,t){so(e,ao,$l,an),so(e,ao,ql,ro[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),zl[t](e),e.stroke()}function jl(e,t){e.beginPath(),e.roundRect(0,0,io,io,_l),e.fillStyle=t,e.fill()}var Kl=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function mi(e,t){switch(e){case"original":return Kl(Nl[t]);case"hole":return oo(o=>no(o,ro[t],!0));case"bg":return oo(o=>{jl(o,ro[t]),no(o,rn,!1)});case"dot":return oo(o=>{no(o,rn,!0),so(o,di,Gl,an),so(o,di,Ul,ro[t])});case"badge":return oo(o=>{no(o,rn,!0),Fl(o,t)})}}var at="bloom-chat-state-favicon",st="data-bloom-rel",cn="data-bloom-media",pi="bloom-parked-icon",Wl="/favicon.ico",gi=g({style:{type:"select",description:"How the tab icon shows the chat state.",options:ui,default:"bg"}}),se=null,bi="",lo=null,hi="",fi=new Map,dn,sn=[],yi=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${st}]`)];function un(){for(let e of yi())e.id!==at&&(e.hasAttribute(st)||(hi||=e.href,e.setAttribute(st,e.rel),e.setAttribute(cn,e.getAttribute("media")??"")),e.rel!==pi&&(e.rel=pi),e.media!=="not all"&&(e.media="not all"))}function Vl(){for(let e of yi()){let t=e.getAttribute(st);if(t==null)continue;e.rel=t;let o=e.getAttribute(cn);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(st),e.removeAttribute(cn)}}function vi(){let e=document.getElementById(at);return e||(e=document.createElement("link"),e.id=at,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function Yl(e){if(e==="wait")return hi||Wl;let t=gi.store.style,o=`${t}:${e}`,n=fi.get(o);return n||fi.set(o,n=mi(t,e)),n}function ln(e){if(e)return"rotate";let t=z();return se&&t&&t!==bi&&(se=null),se==="error"?"error":se==="done"?"done":t?"ready":"wait"}function it(e,t=!1){if(e===lo&&!t)return;lo=e;let o=vi(),n=Yl(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function Xl(){dn=new MutationObserver(()=>{un(),document.head.lastElementChild?.id!==at&&vi()}),dn.observe(document.head,{childList:!0})}var Si=p({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"DOMContentLoaded",settings:gi,start(){un(),it(ln(_().generating),!0),Xl(),sn=[S.on("rise",()=>{se=null,it("rotate")}),S.on("fall",({outcome:e})=>{se=e==="done"||e==="error"?e:null,bi=z(),it(ln(!1))}),S.on("context",({migrated:e})=>{e||(se=null)}),S.on("tick",({generating:e})=>{un(),it(ln(e))})]},stop(){for(let e of sn)e();sn=[],dn?.disconnect(),document.getElementById(at)?.remove(),Vl(),lo=null,se=null},onSettingsChange(){it(lo??"wait",!0)}});var lt="data-bloom-cleaner-hidden",Jl=[/Migrate your GPTs to plugins/i],Zl='[role="dialog"], [role="alertdialog"], [data-radix-popper-content-wrapper], [data-testid*="modal" i], [data-testid*="banner" i], [data-sonner-toast]',Ql=/^(?:close|dismiss|not now|maybe later|got it|关闭|稍后|知道了)$/i,ec={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]'],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])']},uo=g({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Close notices such as \u201CMigrate your GPTs to plugins\u201D.",default:!0}}),co,mn=!1,tc=e=>O(e.getAttribute("aria-label")||e.textContent||"");function oc(e){if(!(!uo.store.hideNotices||!H(e)))for(let t of document.querySelectorAll(Zl))t.hasAttribute(lt)||!Jl.some(o=>o.test(t.textContent??""))||(t.setAttribute(lt,""),[...t.querySelectorAll("button")].find(o=>Ql.test(tc(o)))?.click())}var xi=p({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads and notices.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:uo,styles:()=>Te([...Object.entries(ec).flatMap(([e,t])=>uo.store[e]?t:[]),...uo.store.hideNotices?[`[${lt}]`]:[]]),start(){mn=!0,Ht().then(()=>{mn&&!co&&(co=C(oc))})},stop(){mn=!1,co?.(),co=void 0;for(let e of document.querySelectorAll(`[${lt}]`))e.removeAttribute(lt)}});var pn=`form:has(${d.composerInput}), ${d.oldComposerForm}`,nc=`:is(${pn}) :is([class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"])`,rc='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',ic='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',ac="var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, #fff)))",wi=g({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function sc(){let{opacity:e,blur:t}=wi.store;return e>=100?"":`:is(${rc}), :is(${pn}){background-color:transparent!important;background-image:none!important;box-shadow:none!important}:is(${ic}){display:none!important}${nc}{background-color:color-mix(in srgb, ${ac} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important}:is(${pn}) :is(${d.composerInput}){background-color:transparent!important}`}var Ei=p({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:wi,styles:sc});var fn=0,mo;function lc(e){if(!H(e))return;for(let o of Rr())Fo(o,"profile");let t=Ft();t&&Fo(t,"menu")}function He(){fn++;let e=!0;return pe().then(()=>{e&&fn&&!mo&&(mo=C(lc))}),()=>{e&&(e=!1,!--fn&&(mo?.(),mo=void 0))}}var ee=E("bloom-csi-"),cc=256,dc=160,po=1,Ti=4,uc=.1,mc=.0015,pc=250;function Mi(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function fc(e){return new Promise((t,o)=>{let n=new Image;n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function gc(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:St(t.x,n,1-n),y:St(t.y,r,1-r)}}function Ci(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function bc(e,t){let o=a("canvas");return o.width=o.height=cc,Ci(o,e,t),o.toDataURL("image/png")}async function hc(e){if(e.startsWith("data:image/"))return e;let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status}`);return Mi(await t.blob())}function Li(e){let t=null,o={x:M.store.cropX,y:M.store.cropY,zoom:M.store.cropZoom},n,r=a("canvas",{class:ee("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=dc*devicePixelRatio;let i=a("div",{class:`bloom-muted ${ee("status")}`}),s=a("div",{class:ee("zoom")}),c=a("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(h,I=!0){t&&(o=gc(t,h),Ci(r,t,o),I&&(clearTimeout(n),n=setTimeout(()=>{t&&(M.store.cropX=o.x,M.store.cropY=o.y,M.store.cropZoom=o.zoom,M.store.avatarUrl=bc(t,o))},pc)))}function u(){s.replaceChildren(jt(o.zoom,po,Ti,uc,"\xD7",h=>l({...o,zoom:h})))}async function f(h,I){i.textContent="";try{let ne=await hc(h);t=await fc(ne),I&&(M.store.avatarSource=ne,o={x:.5,y:.5,zoom:po}),e.classList.add(ee("has-image")),u(),l(o,I)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let L=h=>{h?.type.startsWith("image/")&&Mi(h).then(I=>f(I,!0))};c.addEventListener("change",()=>L(c.files?.[0])),r.addEventListener("wheel",h=>{t&&(h.preventDefault(),l({...o,zoom:St(o.zoom*(1-h.deltaY*mc),po,Ti)}),u())},{passive:!1}),r.addEventListener("pointerdown",h=>{if(!t)return;r.setPointerCapture(h.pointerId);let I={...o},ne=r.getBoundingClientRect(),yt=vt=>{if(!t)return;let j=Math.max(ne.width/t.naturalWidth,ne.height/t.naturalHeight)*o.zoom;l({...o,x:I.x-(vt.clientX-h.clientX)/(t.naturalWidth*j),y:I.y-(vt.clientY-h.clientY)/(t.naturalHeight*j)})};r.addEventListener("pointermove",yt),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",yt),{once:!0})});let Z=a("div",{class:ee("cropper"),attrs:{tabindex:"0"},on:{paste:h=>L([...h.clipboardData?.files??[]].find(I=>I.type.startsWith("image/"))),dragover:h=>h.preventDefault(),drop:h=>{h.preventDefault(),L(h.dataTransfer?.files[0])}}},a("div",{class:ee("stage")},r),a("div",{class:ee("controls")},Ze("",h=>h.trim()&&void f(h.trim(),!0),"https://\u2026 or data:image/\u2026","url"),a("div",{class:ee("buttons")},$("Choose file",()=>c.click()),$("Reset crop",()=>{l({x:.5,y:.5,zoom:po}),u()}),$("Clear",()=>{t=null,e.classList.remove(ee("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),s.replaceChildren(),M.store.avatarUrl="",M.store.avatarSource=""},"danger")),s,i,c));return e.append(Z),M.store.avatarSource&&f(M.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var Ai=`/*
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
`;var _e="data-bloom-csi-avatar",vc="data-bloom-csi-sized",Ri="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",M=g({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>Li(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),Pi=[];function ki(e){return(M.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function Oi(e=[]){if(!H(e))return;let t=M.store.displayName.trim()||null,o=!!M.store.avatarUrl,n=new Set(t?ki("name"):[]);for(let i of document.querySelectorAll(Ri))n.has(i)||me(i,null);for(let i of n)me(i,t);let r=new Set(o?ki("avatar"):[]);for(let i of document.querySelectorAll(`[${_e}]`))r.has(i)||i.removeAttribute(_e);for(let i of r)i.hasAttribute(_e)||i.setAttribute(_e,""),i.toggleAttribute(vc,!i.closest(`${d.rail}, ${d.oldRail}, [role="menu"]`))}function Sc(){let e=M.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${M.store.avatarSize}px}`:""}var Ii=p({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:M,styles:()=>`${Sc()}
${Ai}`,start(){Pi=[He(),C(Oi)]},stop(){for(let e of Pi)e();for(let e of document.querySelectorAll(`[${_e}]`))e.removeAttribute(_e);for(let e of document.querySelectorAll(Ri))me(e,null)},onSettingsChange(){Oi()}});var $e=E("bloom-greeting-"),Di=30,Bi=100;function Ni(e){let t=-1,o=a("textarea",{class:`bloom-input ${$e("input")}`,attrs:{maxlength:String(Bi),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=$("Add",i),r=a("div",{class:$e("list")});function i(){let l=o.value.trim().slice(0,Bi);if(!l)return;let u=[...w.store.greetings];t>=0?u[t]=l:u.length<Di&&u.push(l),w.store.greetings=u,t=-1,o.value="",s()}function s(){let{greetings:l}=w.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&l.length>=Di,r.replaceChildren(...l.length?l.map((u,f)=>a("div",{class:$e("row",f===t?"row-editing":"row-idle")},a("div",{class:$e("text"),text:u}),q("edit","Edit",()=>{t=f,o.value=u,o.focus(),s()}),q("trash","Delete",()=>{w.store.greetings=l.filter((L,Z)=>Z!==f),t===f&&(t=-1),s()}))):[a("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),e.append(a("div",{class:$e("editor")},r,a("div",{class:$e("form")},o,n))),s();let c=Me((l,u)=>l==="GreetingCustomizer"&&u==="greetings"&&s());return()=>{c(),e.replaceChildren()}}var Hi=`/*
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
`;var go="data-bloom-greeting",wc=1e3,Ec=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],w=g({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>Ni(e)},greetings:{type:"custom",default:Ec},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),fo,_i=[],gn,$i=()=>w.store.greetings.filter(e=>typeof e=="string"&&e.trim());function dt(){let e=$i();if(e.length)if(w.store.order==="random"&&e.length>1){let t=w.store.lastRandom;for(;t===w.store.lastRandom;)t=Math.floor(Math.random()*e.length);w.store.lastRandom=t,w.store.index=t}else w.store.index=(w.store.index+1)%e.length}function Tc(){return fe()?Ce(d.homeHeading):null}function qi(){for(let e of document.querySelectorAll(`[${go}]`))e.removeAttribute(go),me(e,null)}function ct(){let e=$i(),t=Tc();if(!t||!e.length){qi();return}(w.store.index<0||w.store.index>=e.length)&&dt(),t.setAttribute(go,""),me(t,e[Math.max(0,w.store.index)%e.length])}function bn(){clearInterval(fo),fo=void 0,w.store.mode==="interval"&&fe()&&(fo=setInterval(()=>{dt(),ct()},w.store.intervalSec*wc))}function Mc(e){w.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${go}]`)||getSelection()?.toString()||(dt(),ct())}function Cc(){fe()&&w.store.mode==="refresh"&&dt(),bn(),ct()}var Gi=p({name:"GreetingCustomizer",description:"Replace the \u201CWhat can I help with?\u201D heading on the home page with your own lines.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:w,styles:Hi,start(){gn=new AbortController,document.addEventListener("click",Mc,{signal:gn.signal}),fe()&&w.store.mode==="refresh"&&dt(),bn(),_i=[C(e=>H(e)&&ct()),re(Cc)]},stop(){gn?.abort();for(let e of _i)e();clearInterval(fo),qi()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&bn(),ct()}});var ut=E("bloom-history-"),hn=10,Lc=3e3;function Ui(e){let t="",o=0,n=new Set,r=a("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),i=a("div",{class:ut("list")}),s=a("div",{class:ut("pager")}),c,l=$("Clear all",()=>{if(!c){l.textContent="Click again to clear",c=setTimeout(()=>{c=void 0,l.textContent="Clear all"},Lc);return}clearTimeout(c),c=void 0,l.textContent="Clear all",mt([])},"danger");function u(){let L=[...be.store.entries].toReversed(),Z=t.trim().toLowerCase(),h=Z?L.filter(j=>j.toLowerCase().includes(Z)):L,I=Math.max(1,Math.ceil(h.length/hn));o=Math.min(o,I-1);let ne=h.slice(o*hn,(o+1)*hn).map(j=>a("div",{class:ut("row")},a("button",{class:ut("text",n.has(j)?"text-open":"text-closed"),text:j,title:n.has(j)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{n.delete(j)||n.add(j),u()}}}),q("copy","Copy",()=>void Nn(j)),q("trash","Delete",()=>mt(be.store.entries.filter(Ia=>Ia!==j)))));i.replaceChildren(...ne.length?ne:[a("div",{class:"bloom-muted",text:Z?"No matching prompts.":"No saved prompts yet."})]),s.replaceChildren(a("span",{class:"bloom-muted",text:`${h.length} saved \xB7 page ${o+1} of ${I}`}),$("Previous",()=>{o--,u()}),$("Next",()=>{o++,u()}),l);let[yt,vt]=s.querySelectorAll("button");yt.disabled=o===0,vt.disabled=o>=I-1,l.disabled=!L.length}r.addEventListener("input",()=>{t=r.value,o=0,u()}),e.append(a("div",{class:ut("manager")},r,i,s)),u();let f=Me((L,Z)=>L==="InputHistory"&&Z==="entries"&&u());return()=>{f(),clearTimeout(c),e.replaceChildren()}}var zi=`/*
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
`;var Pc=E("bloom-history-"),kc=2e3,be=g({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>Ui(e)},entries:{type:"custom",default:[]}}),F=null,yn={text:"",at:0},he=null,vn,bo=()=>be.store.entries.filter(e=>typeof e=="string");function mt(e){be.store.entries=e.slice(-be.store.maxEntries)}function Sn(e){let t=e.trim();if(!t)return;let o=Date.now();t===yn.text&&o-yn.at<kc||(yn={text:t,at:o},mt([...bo().filter(n=>n!==t),t]))}function Oc(e,t){let o=Ae();if(!o)return;he??=a("div",{class:`bloom-root ${Pc("hud")}`,attrs:{"data-bloom":"history-hud","aria-live":"polite"}}),he.textContent=`${e+1} / ${t}`;let n=(o.closest("form")??o).getBoundingClientRect();he.style.left=`${n.left+n.width/2}px`,he.style.top=`${n.top}px`,he.isConnected||document.body.append(he)}function pt(){F=null,he?.remove()}function Rc(e){let t=bo();if(!F)return;let o=t[e];F.index=e,F.shown=o,Q(o),Oc(t.length-1-e,t.length)}function Ic(e){let t=bo();if(!t.length)return!1;if(!F){if(e===1)return!1;F={index:t.length,draft:z(),shown:""}}let o=F.index+e;return o<0?!0:o>=t.length?(Q(F.draft),pt(),!0):(Rc(o),!0)}function Dc(e){if(e.isComposing||!We(e.target))return;let t=e.target;if(e.key==="Enter"&&!e.shiftKey){Sn(z(t)),pt();return}if(e.key==="Escape"&&F){Q(F.draft),pt(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey)return;let o=ar(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!F||Ic(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function Bc(e){F&&We(e.target)&&z(e.target)!==F.shown.trim()&&pt()}function Nc(e){e.target instanceof Element&&e.target.closest(d.sendButton)&&Sn(z())}var Fi=p({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:be,styles:zi,start(){vn=new AbortController;let{signal:e}=vn;document.addEventListener("keydown",Dc,{capture:!0,signal:e}),document.addEventListener("input",Bc,{capture:!0,signal:e}),document.addEventListener("click",Nc,{capture:!0,signal:e}),document.addEventListener("submit",()=>Sn(z()),{capture:!0,signal:e})},stop(){vn?.abort(),pt()},onSettingsChange(e){e==="maxEntries"&&mt(bo())}});var ji=`/*
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
`;var _c=1500,$c=5e3,qc=2e3,qe=g({showDate:{type:"boolean",description:"Show the date for messages not sent today.",default:!0},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),yo=new Map,Vi=0,vo,Ki=[];function Yi(e,t){yo.get(e)!==t&&(yo.set(e,t),clearTimeout(vo),vo=setTimeout(Xi,qc))}function Xi(){let e={...qe.store.stamps,...Object.fromEntries(yo)};qe.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,_c))}function Gc(e){let t=K(v())?.times;for(let o=e.length-1;o>=0;o--){let n=yo.get(e[o])??t?.get(e[o])??qe.store.stamps[e[o]];if(n)return n}return null}var Uc=()=>_().generating||Date.now()-Vi<$c;function zc(e){let t=new Date(e),o=new Date,n={hour:"2-digit",minute:"2-digit"};if(!qe.store.showDate||t.toDateString()===o.toDateString())return t.toLocaleTimeString(void 0,n);let r=t.getFullYear()===o.getFullYear()?{}:{year:"numeric"};return t.toLocaleString(void 0,{...r,month:"short",day:"numeric",...n})}function Wi(e){let t=Vt(e)??e.getAttribute("data-message-author-role")??e.closest(d.turn)?.getAttribute("data-turn")??e.querySelector(d.authorRole)?.getAttribute("data-message-author-role");if(Jo(t))return t;let o=tt(e).at(-1);return K(v())?.chain.find(n=>n.id===o)?.role??null}function Fc(e){let t=tt(e);if(!t.length||e.querySelector("time:not([data-bloom])"))return;let o=Gc(t);!o&&Uc()&&(o=Date.now(),Yi(t.at(-1),o));let n=e.querySelector(':scope > time[data-bloom="timestamp"]');if(!o||qe.store.hideOwnMessages&&Wi(e)==="user"){n?.remove();return}let r=zc(o);if(n?.textContent===r)return;let i=a("time",{class:`bloom-timestamp bloom-timestamp-${Wi(e)??"assistant"}`,text:r,title:new Date(o).toLocaleString(),attrs:{"data-bloom":"timestamp",datetime:new Date(o).toISOString()}});n?n.replaceWith(i):e.prepend(i)}var ho=Le(()=>{for(let e of Qo())Fc(e)}),Ji=p({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:qe,styles:ji,start(){Ki=[C(e=>H(e)&&ho()),D.on("conversation",ho),D.on("message-time",({messageId:e,time:t})=>{Yi(e,t),ho()}),S.on("fall",()=>{Vi=Date.now()})]},stop(){for(let e of Ki)e();vo&&(clearTimeout(vo),Xi());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();ho()}}});var jc=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])'],Kc=['[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],Zi=g({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),Qi=p({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:Zi,styles:()=>Te([...jc,...Zi.store.hideDictationSettings?Kc:[]])});var Wc=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],Vc=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])'],xn=g({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),ea=p({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:xn,styles:()=>Te([...xn.store.hideShareChat?Wc:[],...xn.store.hideShareProject?Vc:[]])});var ta='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',Yc='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',Xc="[data-bloom-profile-plan]",oa="visibility:hidden!important;user-select:none!important",ra=g({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function Jc(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=ra.store,r=[];return e&&r.push(n?`:is(${ta}){display:none!important}`:`:is(${ta}){${oa}}`),t&&r.push(`:is(${Yc}){${oa}}`),e&&o&&r.push(`${Xc}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var na,ia=p({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:ra,styles:Jc,start(){na=He()},stop(){na?.()}});var aa=`/*
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
`;var k=E("bloom-queue-"),Qc=6,ed=8,U=null,ft="",So=!1,ye=!1;function wn(e,t,o){let n=q(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute("title"),n.addEventListener("mouseenter",()=>sa(t)),n.addEventListener("mouseleave",()=>sa("")),n}function sa(e){let t=U?.querySelector(`.${k("tip")}`);t&&(t.textContent=e)}function td(e,t,o,n){ye=!0;let r=a("textarea",{class:`bloom-input ${k("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=s=>{ye=!1,ft="",s&&n.edit(t,r.value)};r.addEventListener("keydown",s=>{s.stopPropagation(),!s.isComposing&&(s.key==="Enter"&&!s.shiftKey?(s.preventDefault(),i(!0)):s.key==="Escape"&&(s.preventDefault(),i(!1)))}),r.addEventListener("blur",()=>ye&&i(!0),{once:!0}),e.querySelector(`.${k("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function od(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,s=l=>{!i&&Math.abs(l.clientY-n.clientY)<Qc||(i||(i=ye=!0,e.classList.add(k("dragging"))),e.style.transform=`translateY(${l.clientY-n.clientY}px)`)},c=l=>{if(removeEventListener("pointermove",s),!i)return;ye=!1,ft="";let f=[...r.children].filter(L=>L!==e).filter(L=>L.getBoundingClientRect().top+L.getBoundingClientRect().height/2<l.clientY).length;o.move(t,f)};addEventListener("pointermove",s),addEventListener("pointerup",c,{once:!0})})}function nd(e,t,o){let n=a("li",{class:k("row")},a("div",{class:k("text"),text:e}),a("div",{class:k("actions")},wn("trash","Remove from queue",()=>o.remove(t)),wn("edit","Edit",()=>td(n,t,e,o)),wn("send","Send now",()=>o.sendNow(t))));return od(n,t,o),n}function rd(e){if(!U)return;let t=e.getBoundingClientRect();U.style.left=`${t.left}px`,U.style.width=`${t.width}px`,U.style.bottom=`${innerHeight-t.top+ed}px`}function En(){U?.remove(),U=null,ft="",ye=!1}function xo(e,t){let o=No();if(!e.length||!Ke(o)){En();return}U||(U=a("div",{class:`bloom-root ${k("tray")}`,attrs:{"data-bloom":"queue"}},a("div",{class:k("header")},a("button",{class:k("toggle"),attrs:{type:"button"},on:{click:()=>{So=!So,U?.classList.toggle(k("collapsed"),So)}}},a("span",{class:k("count")}),B("chevron")),a("span",{class:k("tip")})),a("ol",{class:k("list")})),U.classList.toggle(k("collapsed"),So),document.body.append(U)),rd(o);let n=JSON.stringify(e);if(ye||n===ft)return;ft=n;let r=U.querySelector(`.${k("count")}`);r&&(r.textContent=xt(e.length,"Queued message")),U.querySelector(`.${k("list")}`)?.replaceChildren(...e.map((i,s)=>nd(i,s,t)))}var id=8,ad=150,sd=20,da=g({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1}}),ve=new Map,wo=!1,Se=null,Tn,la=[],Mn="draft",Cn=()=>v()??Mn,W=()=>ve.get(Cn())??[];function xe(e){e.length?ve.set(Cn(),e):ve.delete(Cn()),xo(W(),Ln)}function Eo(e,t=0){if(_().generating||z()){t<sd&&setTimeout(()=>Eo(e,t+1),ad);return}Q(e),Bo(()=>{lr()||Q("")})}function ca(){if(Se!=null){let o=Se;Se=null,Eo(o);return}if(!wo||_().generating||z())return;let[e,...t]=W();e!=null&&(wo=!1,xe(t),Eo(e))}function ua(e){let t=W(),o=t[e];if(o!=null){if(xe(t.filter((n,r)=>r!==e)),!_().generating){Eo(o);return}Se=o,Dt()?.click()}}var Ln={remove:e=>xe(W().filter((t,o)=>o!==e)),edit:(e,t)=>xe(t.trim()?W().map((o,n)=>n===e?t:o):W().filter((o,n)=>n!==e)),sendNow:ua,move(e,t){let o=[...W()],[n]=o.splice(e,1);o.splice(t,0,n),xe(o)}};function ld(e){let t=W();return da.store.replacePending&&t.length?(xe([...t.slice(0,-1),e]),!0):t.length>=id?!1:(xe([...t,e]),!0)}function cd(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!We(e.target)||!_().generating)return;let t=z(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;Q(""),Se=t,Dt()?.click();return}if(!t){W().length&&ua(0);return}ld(t)&&Q("")}var ma=p({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:da,styles:aa,start(){Tn=new AbortController,document.addEventListener("keydown",cd,{capture:!0,signal:Tn.signal}),la=[S.on("fall",({outcome:e})=>{wo=e==="done",e==="left"&&(Se=null),ca()}),S.on("context",({prevId:e,id:t,migrated:o})=>{let n=ve.get(Mn);ve.delete(Mn),o&&!e&&t&&n&&ve.set(t,n),o||(wo=!1),xo(W(),Ln)}),S.on("tick",()=>{ca(),xo(W(),Ln)})]},stop(){Tn?.abort();for(let e of la)e();En(),ve.clear(),Se=null}});var dd=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function ud(){let e=O(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!dd.has(e.toLowerCase())?e:null}function gt(e){return e?K(e)?.title??Dr(e)??(e===v()?ud():null):null}var pa=`/*
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
`;var te=E("bloom-recent-"),oe="home",pd=50,fa=140,fd=new Set(["Backquote"]),gd=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),y=g({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),le=null,X=[],J=0,An,ga=[],Co=()=>vr()?null:v()??(fe()?oe:null);function ba(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function ya(e){let t=gt(e);t&&y.store.titles[e]!==t&&(y.store.titles={...y.store.titles,[e]:t});let o=Br(location.href);o&&e===v()&&y.store.projects[e]!==o&&(y.store.projects={...y.store.projects,[e]:o})}function ha(e){if(!e)return;let t=[e,...y.store.visits.filter(n=>n!==e)].slice(0,pd),o=new Set(t);y.store.visits=t,Object.keys(y.store.previews).some(n=>!o.has(n))&&(y.store.previews=ba(y.store.previews,o)),Object.keys(y.store.titles).some(n=>!o.has(n))&&(y.store.titles=ba(y.store.titles,o)),e!==oe&&ya(e)}function To(e){if(!e||!y.store.visits.includes(e))return;let t={},o=K(e)?.chain??[];for(let r of o)t[r.role]=we(Jt(r),fa);if(e===v())for(let r of Yt()){let i=Xt(r);i&&(t[r.role]=we(i,fa))}let n=y.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(y.store.previews={...y.store.previews,[e]:t})}function bd(){let e=Number(y.store.maxRecent);return y.store.visits.filter(t=>t!==oe||y.store.includeHome).slice(0,e)}function Pn(e){if(bt(),e===Co())return;let t=e===oe?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"]'):Je(e)[0];t?t.click():location.assign(e===oe?"/":`/c/${e}`)}function hd(e,t){let o=e===oe?"New chat":y.store.titles[e]??gt(e)??"Untitled chat",n=e===oe?null:y.store.projects[e],r=e===oe?null:y.store.previews[e];return a("button",{class:te("item"),attrs:{type:"button",role:"option","aria-selected":String(t===J)},on:{click:()=>Pn(e),mousemove:()=>t!==J&&Mo(t)}},a("div",{class:te("head")},a("span",{class:`${te("title")} bloom-truncate`,text:o}),n&&a("span",{class:te("project"),text:n})),r?.user&&a("div",{class:`${te("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&a("div",{class:`${te("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function Mo(e){J=(e+X.length)%X.length,le?.querySelectorAll(`.${te("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===J)))}function yd(){To(v());let e=Co();X=bd(),e&&(X=[e,...X.filter(t=>t!==e)].slice(0,Number(y.store.maxRecent))),X.length&&(J=X.length>1?1:0,le=a("div",{class:`bloom-root ${te("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:t=>t.target===t.currentTarget&&bt()}},a("div",{class:te("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...X.map(hd))),document.body.append(le))}function bt(){le?.remove(),le=null}var vd=e=>fd.has(e.code)||gd.has(e.key);function Sd(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&vd(e)){e.preventDefault(),e.stopPropagation(),le?Mo(J+(e.shiftKey?-1:1)):yd();return}if(!le)return;let o={Escape:bt,Enter:()=>Pn(X[J]),ArrowDown:()=>Mo(J+1),ArrowUp:()=>Mo(J-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function xd(e){le&&e.key==="Control"&&Pn(X[J])}var va=p({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:y,styles:pa,start(){An=new AbortController;let{signal:e}=An;addEventListener("keydown",Sd,{capture:!0,signal:e}),addEventListener("keyup",xd,{capture:!0,signal:e}),addEventListener("blur",bt,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&To(v()),{signal:e}),ga=[re(({prevId:i})=>{To(i),ha(Co())}),D.on("conversation",({id:i})=>{y.store.visits.includes(i)&&ya(i),To(i)})];let{visits:t,titles:o,previews:n}=y.store,r=t.filter(i=>i!==oe&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(y.store.visits=t.filter(i=>!r.includes(i))),ha(Co())},stop(){An?.abort();for(let e of ga)e();bt()}});var wd=new x("ResponseNotification"),Ed=[880,1318.5],Td=.14,Sa=.22,Md=.08,xa=1e-4,Cd=.02,ht=g({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the built-in chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",description:"Try the sound.",render:e=>(e.append($("Play",Ea)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),kn=null,wa,On;function Ld(){kn??=new AudioContext;let e=kn.currentTime;Ed.forEach((t,o)=>{let n=kn,r=e+o*Td,i=n.createOscillator(),s=n.createGain();i.frequency.value=t,s.gain.setValueAtTime(xa,r),s.gain.exponentialRampToValueAtTime(Md,r+Cd),s.gain.exponentialRampToValueAtTime(xa,r+Sa),i.connect(s).connect(n.destination),i.start(r),i.stop(r+Sa)})}function Ea(){let e=ht.store.soundUrl.trim();e?new Audio(e).play().catch(t=>wd.warn("Custom sound failed",t)):Ld()}function Ad(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function Pd(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(On=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:On.signal}))}var Ta=p({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:ht,start(){Pd(),wa=S.on("fall",({conversationId:e,outcome:t})=>{t==="done"&&(ht.store.onlyWhenHidden&&!document.hidden||(ht.store.sound&&Ea(),ht.store.browserNotification&&Ad(gt(e))))})},stop(){wa?.(),On?.abort()}});var kd="filter:blur(6px)!important;transition:filter 0.2s ease",Ma=`:is(${d.sidebars})`,Od={conversations:{selectors:[`${Ma} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0},projects:{selectors:[`${Ma} a:is([href*="/project"], [href*="/g/g-p-"])`,".bloom-recent-project"],hover:!0},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}},La=g({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function Rd(){return Object.entries(Od).filter(([e])=>La.store[e]).map(([,{selectors:e,hover:t}])=>{let o=e.join(",");return`:is(${o}){${kd}}`+(t?`:is(${o}):hover, .bloom-recent-item:hover :is(${o}){filter:none!important}`:"")}).join(`
`)}var Ca,Aa=p({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:La,styles:Rd,start(){Ca=He()},stop(){Ca?.()}});var Id=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],Dd=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",Bd='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',Pa=g({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function Nd(){let e=`${Pa.store.width}rem`;return`:is(${Dd}){${Id.map(t=>`${t}:${e}!important`).join(";")}}:is(${Bd}){max-width:min(100%, ${e})!important}`}var ka=p({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:Pa,styles:Nd});var Hd=[Kr,ai,ci,Si,xi,Ei,Ii,Gi,Fi,Ji,Qi,ea,ia,ma,va,Ta,Aa,ka],Rn=Hd;var _d=new x("Bloom"),Oa="2.0.5";async function In(){br();for(let e of Rn)e.updatedAt=Mr[e.name];Yn(Rn),await jn(),wt("base",tr),Tr(),kt("Init"),await pe(),_n(),kt("DOMContentLoaded"),await Ht(),kt("HostReady"),_d.info(`Bloom++ ${Oa} ready`)}var Ra=new x("Boot");if(window===window.top){let e=V.Bloom;e&&Ra.warn("Replacing another Bloom++ instance",e.VERSION),Object.defineProperty(V,"Bloom",{value:Dn,configurable:!0,writable:!0}),In().catch(t=>Ra.error("Startup failed",t))}})();
