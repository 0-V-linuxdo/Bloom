// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260928] v2.0.4
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

/* Bloom++ [20260928] v2.0.4. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Oa=Object.defineProperty;var Ra=(e,t)=>{for(var o in t)Oa(e,o,{get:t[o],enumerable:!0})};var x=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var vt=(e,t,o)=>Math.min(o,Math.max(t,e)),T=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Pn=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,we=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,N=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function St(e,t){return`${e} ${t}${e===1?"":"s"}`}async function On(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function Ge(e){try{return JSON.parse(e)}catch{return}}var V=typeof unsafeWindow>"u"?window:unsafeWindow;var kn={};Ra(kn,{VERSION:()=>Aa,init:()=>An,plugins:()=>ue});var Ee=new Map,Eo;function To(e){!document.head||e.parentNode===document.head||document.head.append(e)}function Rn(){Eo||!document.head||(Eo=new MutationObserver(()=>{for(let e of Ee.values())e.isConnected||To(e)}),Eo.observe(document.head,{childList:!0}))}function xt(e,t){let o=Ee.get(e);o||(o=document.createElement("style"),o.id=`bloom-style-${e}`,Ee.set(e,o)),o.textContent!==t&&(o.textContent=t),To(o),Rn()}function Mo(e){Ee.get(e)?.remove(),Ee.delete(e)}function In(){for(let e of Ee.values())To(e);Rn()}var E=e=>(...t)=>t.map(o=>e+o).join(" "),wt=(...e)=>e.filter(Boolean).join(" "),Te=e=>e.length?`${e.join(",")}{display:none!important}`:"";function p(e){return e}var Et=new x("Storage"),Ia="bloompp",Tt="kv",Dn=null;function Da(){return Dn??=new Promise((e,t)=>{let o=indexedDB.open(Ia,1);o.onupgradeneeded=()=>{o.result.objectStoreNames.contains(Tt)||o.result.createObjectStore(Tt)},o.onsuccess=()=>e(o.result),o.onerror=()=>t(o.error)}),Dn}function Bn(e,t){return Da().then(o=>new Promise((n,r)=>{let i=t(o.transaction(Tt,e).objectStore(Tt));i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)}))}async function Ba(e){if(typeof GM_getValue=="function")try{return await GM_getValue(e)}catch(t){Et.warn("GM read failed",t);return}}async function Na(e){try{return await Bn("readonly",t=>t.get(e))}catch(t){Et.warn("IndexedDB read failed",t);return}}function Ha(e){try{return localStorage.getItem(e)??void 0}catch{return}}async function Nn(e){return Promise.all([Ba(e),Na(e),Ha(e)])}function Hn(e,t){let o=JSON.stringify(t);if(typeof GM_setValue=="function")try{GM_setValue(e,t)}catch{GM_setValue(e,o)}try{localStorage.setItem(e,o)}catch(n){Et.warn("localStorage write failed",n)}Bn("readwrite",n=>n.put(o,e)).catch(n=>Et.warn("IndexedDB write failed",n))}var _a=new x("Settings"),$n="BloomSettings",$a=100,qa=["GM","IndexedDB","localStorage"],Mt={plugins:{}},Co=new Set,Ue;function Ga(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=Ge(t);return!T(t)||!T(t.plugins)||!Object.keys(t.plugins).length?null:t}var Lo=e=>e==null||e===""||(Array.isArray(e)?!e.length:T(e)&&!Object.keys(e).length);function Ua(e){return Lo(e)?0:Array.isArray(e)?12+Math.min(e.length,40):T(e)?12+Math.min(Object.keys(e).length,40):3}function za(e){let t=0;for(let o of Object.values(e.plugins))if(T(o))for(let[n,r]of Object.entries(o))n!=="enabled"&&(t+=Ua(r));return t}var _n=e=>Object.values(e.plugins).filter(t=>T(t)&&t.enabled===!0).length;function Fa(e){let t=e.map((i,s)=>i&&{candidate:i,index:s,score:za(i)}).filter(i=>i!=null).toSorted((i,s)=>s.score-i.score||(i.score?0:_n(s.candidate)-_n(i.candidate))||i.index-s.index);if(!t.length)return null;let[o,...n]=t,r=structuredClone(o.candidate);for(let{candidate:i}of n)for(let[s,c]of Object.entries(i.plugins)){if(!T(c))continue;let l=r.plugins[s]??={};for(let[u,f]of Object.entries(c))u==="enabled"?!("enabled"in l)&&f===!0&&(l.enabled=!0):Lo(l[u])&&!Lo(f)&&(l[u]=structuredClone(f));Object.keys(l).length||delete r.plugins[s]}return{bag:r,source:qa[o.index]}}async function qn(){let e=await Nn($n),t=Fa(e.map(Ga));t&&(Mt.plugins=t.bag.plugins,_a.info("Loaded settings from",t.source))}function Gn(){Ue=void 0,Hn($n,Mt)}function ja(){Ue&&(clearTimeout(Ue),Gn())}var ce=(e,t)=>Mt.plugins[e]?.[t];function de(e,t,o){let n=Mt.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,clearTimeout(Ue),Ue=setTimeout(Gn,$a);for(let r of Co)r(e,t)}function Me(e){return Co.add(e),()=>void Co.delete(e)}function Ao(e){return e.type==="component"?void 0:e.default}function g(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>ce(t.pluginName,n)??(e[n]&&Ao(e[n])),set:(o,n,r)=>(de(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&ce(t.pluginName,o)!==void 0&&de(t.pluginName,o)}};return t}var Un=e=>{let t=()=>{let o=ce("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();de("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},Ct=Un("pinnedPlugins"),Lt=Un("starredPlugins");addEventListener("pagehide",ja);var At=new x("PluginManager"),ue=new Map,ze=new Set,zn=new Set,ko=new Set;function Fn(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),ue.set(t.name,t)}var Fe=e=>!!e.required||(ce(e.name,"enabled")??!!e.enabledByDefault);var Po=e=>`plugin-${e.name}`;function jn(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?xt(Po(e),t):Mo(Po(e))}function Kn(e){if(!ze.has(e.name))try{jn(e),e.start?.(),ze.add(e.name)}catch(t){At.error(`Failed to start ${e.name}`,t)}}function Ka(e){if(ze.delete(e.name)){Mo(Po(e));try{e.stop?.()}catch(t){At.error(`Failed to stop ${e.name}`,t)}}}var Wn=e=>e.startAt??"HostReady";function kt(e){zn.add(e);for(let t of ue.values())Wn(t)===e&&Fe(t)&&Kn(t);At.info(`${e}: ${[...ze].join(", ")}`)}function Vn(e,t){de(e.name,"enabled",t),t?zn.has(Wn(e))&&Kn(e):Ka(e);for(let o of ko)o()}function Yn(e){return ko.add(e),()=>void ko.delete(e)}Me((e,t)=>{let o=ue.get(e);if(!(!o||t==="enabled"||!ze.has(e)))try{jn(o),o.onSettingsChange?.(t)}catch(n){At.error(`Settings change failed for ${e}`,n)}});var Xn=`/*
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
`;var Va=new x("Dom");function a(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var Jn=document.createElement("template");function Zn(e){return Jn.innerHTML=e.trim(),Jn.content.firstElementChild.cloneNode(!0)}var Ke=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),Ce=(e,t=document)=>[...t.querySelectorAll(e)].find(Ke)??null,Ya=16,Xa="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function Qn(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([Xa],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function Oo(e){document.hidden?setTimeout(e,Ya):requestAnimationFrame(e)}function Le(e){let t=!1;return()=>{t||(t=!0,Oo(()=>{t=!1;try{e()}catch(o){Va.error("Scheduled task failed",o)}}))}}var Pt=new Set,Ot=[],je,Ja=Le(()=>{let e=Ot;Ot=[];for(let t of Pt)t(e)});function P(e){return Pt.add(e),je||(je=new MutationObserver(t=>{Ot.push(...t),Ja()}),je.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{Pt.delete(e),!Pt.size&&(je?.disconnect(),je=void 0,Ot=[])}}var Za=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),j=e=>!e.length||e.some(t=>!Za(t.target));function me(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size");return}e.getAttribute("data-bloom-text")!==t&&(e.hasAttribute("data-bloom-text")||e.style.setProperty("--bloom-text-size",getComputedStyle(e).fontSize),e.setAttribute("data-bloom-text",t))}var Qa=new x("Events");function Rt(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){Qa.error(`Listener for ${String(t)} failed`,r)}}}}var d={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]'};var er=/[​-‍﻿]/g,Ae=()=>Ce(d.composerInput),We=e=>e instanceof HTMLElement&&e.matches(d.composerInput),Ro=(e=Ae())=>e?.closest("form")??document.querySelector(d.oldComposerForm);function U(e=Ae()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(er,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(er,"").trim()}var es=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function Q(e,t=Ae()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return es?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function tr(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:s,value:c}=e;return{first:!c.slice(0,i).includes(`
`),last:!c.slice(s).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var or=e=>{let t=Ro();return(t&&Ce(e,t))??Ce(e)},It=()=>or(d.stopButton),ts=()=>{let e=or(d.sendButton);return e&&!e.matches(d.stopButton)?e:null};function nr(){let e=ts();if(e&&!e.disabled)return e.click(),!0;let t=Ae();return t?(t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),!0):!1}var rr=()=>Ke(It());var sr=new x("Network"),os=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,ns=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,Bt=1e3,rs=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),I=Rt(),Io=new Map,ir=new Map,is=1,K=e=>e?Io.get(e)??null:null;function Dt(e){let t=Io.get(e);return t||Io.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var lr=e=>e==="user"||e==="assistant";function cr(e){let t=e.author?.role;if(!e.id||!lr(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(l=>typeof l=="string").join(`
`).trim(),i=n.filter(l=>T(l)&&l.content_type==="image_asset_pointer").length,s=e.metadata?.attachments,c=Array.isArray(s)&&s.length>0;return!r&&!i&&!c?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*Bt:null,text:r,hasFiles:c,imageCount:i}}var dr=e=>e.filter((t,o)=>t.role==="user"||e[o+1]?.role!=="assistant");function as(e,t){let o=t.filter(T).map(i=>T(i.message)?i.message:i);for(let i of o)i.id&&i.create_time&&e.times.set(i.id,i.create_time*Bt);let n=o.map(cr).filter(i=>i!=null),r=new Set(n.map(i=>i.id));return e.chain=dr([...e.chain.filter(i=>!r.has(i.id)),...n]),e}function ss(e,t){if(!T(t)||!(T(t.mapping)||Array.isArray(t.messages)))return null;let o=Dt(e);if(typeof t.title=="string"&&t.title&&(o.title=t.title),Array.isArray(t.messages))return as(o,t.messages);let n=t.mapping;for(let c of Object.values(n)){let l=c.message?.create_time;c.message?.id&&l&&o.times.set(c.message.id,l*Bt)}let r=[],i=new Set,s=typeof t.current_node=="string"?t.current_node:null;for(;s&&!i.has(s)&&n[s];){i.add(s);let c=n[s].message,l=c?cr(c):null;l&&r.push(l),s=n[s].parent??null}return r.length&&(o.chain=dr(r.toReversed())),o}function ls(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}function cs(e){if(typeof e?.body!="string")return null;let t=Ge(e.body);return T(t)&&typeof t.conversation_id=="string"?t.conversation_id:null}function ds(e,t){if(!T(e))return;typeof e.type=="string"&&rs.has(e.type)&&(t.handoff=!0);let o=T(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(Dt(e.conversation_id).title=e.title,I.emit("conversation",Dt(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&lr(n.author?.role)){let r=n.create_time*Bt;t.conversationId&&Dt(t.conversationId).times.set(n.id,r),I.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function us(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:s}=await o.read();if(i)break;r+=n.decode(s,{stream:!0});let c=r.split(`
`);r=c.pop()??"";for(let l of c){if(!l.startsWith("data:"))continue;let u=l.slice(5).trim();u&&u!=="[DONE]"&&ds(Ge(u),t)}}}async function ms(e,t,o){let n={conversationId:t,error:!1,handoff:!1};ir.set(e,t),I.emit("generate-start",{requestId:e,conversationId:t});try{let r=await o;r.ok?r.headers.get("content-type")?.includes("event-stream")&&await us(r.clone(),n):n.error=!0}catch(r){let i=r instanceof DOMException&&r.name==="AbortError";n.handoff||=i,n.error||=!i}finally{ir.delete(e),I.emit("generate-end",{requestId:e,...n})}}async function ps(e,t){try{let o=await t;if(!o.ok)return;let n=ss(e,await o.clone().json());n&&I.emit("conversation",n)}catch(o){sr.debug("Conversation read skipped",o)}}function fs(e,t,o){let n=ls(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&os.test(n.pathname)){ms(is++,cs(t),o);return}let i=r==="GET"&&n.pathname.match(ns)?.[1];i&&ps(i,o)}var ar=!1;function ur(){if(ar)return;ar=!0;let e=V.fetch,t=function(o,n){let r=e.call(this??V,o,n);try{fs(o,n,r)}catch(i){sr.error("Fetch tap failed",i)}return r};V.fetch=typeof exportFunction=="function"?exportFunction(t,V):t}var gs="main, nav, [data-app-action-sidebar-scroll], [data-app-navigation-rail]";function pe(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var mr=()=>new Promise(e=>{typeof requestIdleCallback=="function"?requestIdleCallback(()=>e(),{timeout:1500}):setTimeout(e,100)});async function bs(){for(;!document.querySelector(gs);)await new Promise(e=>setTimeout(e,100));await mr(),await mr()}async function pr(){await pe(),await Promise.race([bs(),new Promise(e=>setTimeout(e,8e3))])}var hs=new x("Route"),fr=/\/c\/(?!local-)([\w-]+)/,ys=500,No=e=>{try{return new URL(e,location.origin).pathname.match(fr)?.[1]??null}catch{return null}},v=()=>location.pathname.match(fr)?.[1]??null,fe=()=>location.pathname==="/",gr=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",Ht=new Set,_t=location.href,Bo=v(),Nt;function Do(){if(location.href===_t)return;let e={prevHref:_t,href:location.href,prevId:Bo,id:v()};_t=e.href,Bo=e.id;for(let t of Ht)try{t(e)}catch(o){hs.error("Route listener failed",o)}}function vs(){let e=new AbortController,{navigation:t}=V;t?.addEventListener("currententrychange",()=>queueMicrotask(Do),{signal:e.signal}),addEventListener("popstate",Do,{signal:e.signal});let o=setInterval(Do,ys);return()=>{e.abort(),clearInterval(o)}}function re(e){return Ht.add(e),Nt||(_t=location.href,Bo=v(),Nt=vs()),()=>{Ht.delete(e),!Ht.size&&(Nt?.(),Nt=void 0)}}var Ss=250,xs=400,ws=6e4,Es=5e3,Ts=`:is(${d.turn}) :is(${d.turnBusy})`,S=Rt(),Gt=new Set,Ho=new Set,ie=!1,hr=0,ke=null,Pe=!1,$t=!1,Ve=0,Ye=null,br=!1,H=()=>({generating:ie,conversationId:v()}),yr=()=>rr()||!!document.querySelector(Ts);function Ms(){let e=yr();return e?$t||(Ve=0):$t=!1,[...Gt].some(t=>!Ho.has(t))||e&&!$t||Date.now()<Ve}function Cs(){return Ye?.error?"error":Pe?"stopped":"done"}function Ls(){ke=null,ie=!1,S.emit("fall",{conversationId:v(),outcome:Cs()}),Pe=!1,Ye=null}function vr(){let e=Ms();e&&!ie&&(ie=!0,hr=Date.now(),Pe=!1,Ye=null,S.emit("rise",{conversationId:v()})),e||!ie?ke=null:ke==null?ke=Date.now():Date.now()-ke>=xs&&Ls()}function qt(){vr(),S.emit("tick",H())}function As({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(ie||Date.now()-hr<ws);if(!o&&ie){for(let n of Gt)Ho.add(n);$t=yr(),Ve=0,ke=null,ie=!1,Pe=!1,Ye=null,S.emit("fall",{conversationId:e,outcome:"left"})}S.emit("context",{prevId:e,id:t,migrated:o}),qt()}function ks(e){e.target instanceof Element&&e.target.closest(d.stopButton)&&(Pe=!0,Ve=0)}function Sr(){br||(br=!0,I.on("generate-start",({requestId:e})=>{Gt.add(e),qt()}),I.on("generate-end",e=>{Gt.delete(e.requestId),!Ho.delete(e.requestId)&&(Ye=e,Ve=e.handoff&&!e.error&&!Pe?Date.now()+Es:0,qt())}),re(As),document.addEventListener("click",ks,!0),Qn(qt,Ss),pe().then(()=>P(vr)))}var xr={BetterNavigator:1790616549e3,ChatListStatus:1790616549e3,ChatStateFavicons:1790616549e3,Cleaner:1790616549e3,ComposerOpacity:1790616549e3,CustomSidebarIdentity:1790616549e3,GreetingCustomizer:1790616549e3,InputHistory:1790616549e3,MessageTimestamps:1790618829e3,NoDictation:1790616549e3,NoShareLink:1790616549e3,NoSidebarIdentity:1790616549e3,PromptQueue:1790620238e3,RecentTopics:1790620238e3,ResponseNotification:1790616549e3,Settings:1790616549e3,StreamerMode:1790616549e3,WiderChat:1790616549e3};var b=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,Ps="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",Os={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${Ps}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:b('<path d="M18 6 6 18M6 6l12 12"/>'),gear:b('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:b('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:b('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:b('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:b('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:b('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:b('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:b('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:b('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:b('<path d="m6 9 6 6 6-6"/>'),play:b('<path d="M7 4v16l13-8z"/>'),plus:b('<path d="M12 5v14M5 12h14"/>'),check:b('<path d="m5 12 5 5 9-10"/>'),alert:b('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:b('<path d="M4 5h16v11H9l-5 4z"/>'),layout:b('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:b('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:b('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:b('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:b('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:b('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:b('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:b('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:b('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:b('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:b('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:b('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:b('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:b('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:b('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),grip:b('<path d="M9 6h0M15 6h0M9 12h0M15 12h0M9 18h0M15 18h0"/>')},D=e=>Zn(Os[e]);var Rs=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,wr=/\S+@\S+\.\S+/,Is=3,Ds=/^\/g\/(g-p-[^/]+)\//,Bs=/^g-p-[0-9a-f]+-?/i,Er=e=>!!e.closest(".sr-only"),_o=e=>!!e?.querySelector(d.menuButton);function Tr(){return[...document.querySelectorAll(d.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(_o)).filter(e=>e!=null)}function Mr(){let e=[...document.querySelectorAll(d.oldProfile)];if(e.length)return e.map(o=>({kind:"profile",anchor:o,insert:n=>{(o.parentElement?.children.length===1?o.parentElement:o).before(n)}}));let t=Tr().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(d.rail)){let n=[...o.children].find(_o);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}var $o=e=>!e.closest("[data-bloom]")&&(!!e.querySelector("img, [class*=rounded-full]")||kr(e).some(t=>!Er(t))),Cr=e=>[...e.parentElement?.children??[]].find(t=>t!==e&&t instanceof HTMLElement&&$o(t))??null;function Lr(){let e=[...document.querySelectorAll(d.oldProfile)];return e.length?e:[...Tr(),...[...document.querySelectorAll(d.rail)].map(o=>[...o.children].findLast(_o))].map(o=>[...o?.querySelectorAll(d.menuButton)??[]].findLast(n=>$o(n)||Cr(n))).filter(o=>o!=null)}var Ar=()=>Lr().map(e=>$o(e)?e:Cr(e)).filter(e=>e!=null);function kr(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!N(t.textContent??"")&&!(t instanceof SVGElement))}var Ns=e=>{let t=getComputedStyle(e);return t.borderRadius.includes("%")||Number.parseFloat(t.borderRadius)>=e.clientWidth/2||/rounded-full/.test(e.getAttribute("class")??"")};function Xe(e,t){e&&!e.hasAttribute(t)&&e.setAttribute(t,"")}function Hs(e){if(N(e.textContent??"").length>Is)return null;for(let t=e;t&&t!==e.closest("button");t=t.parentElement)if(Ns(t))return t;return null}function qo(e,t){Xe(e,`data-bloom-${t}`);let o=e.querySelector("img:not([data-bloom] img)"),n=kr(e),r=o?null:n.map(Hs).find(f=>f!=null),i=o?.closest("[class*=rounded-full]"),s=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");Xe(s,`data-bloom-${t}-avatar`);let c=n.filter(f=>!s?.contains(f)&&!Er(f)),l=c.find(f=>Rs.test(N(f.textContent??""))),u=c.find(f=>wr.test(f.textContent??""));Xe(l,`data-bloom-${t}-plan`),Xe(u,`data-bloom-${t}-email`),Xe(c.find(f=>f!==l&&f!==u),`data-bloom-${t}-name`)}function _s(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function Ut(){return Lr().map(_s).find(e=>e!=null)??[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&(wr.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var Je=e=>[...document.querySelectorAll(d.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&No(t.href)===e);function Pr(e){let t=Je(e).find(o=>N(o.textContent??""));return t?N(t.textContent??""):null}function Or(e){let t=new URL(e,location.origin).pathname.match(Ds)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!No(n.href)&&N(n.textContent??""));return o?N(o.textContent??""):t.replace(Bs,"").replaceAll("-"," ")||null}function Go(e,t,o){let n=a("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o}});return n.addEventListener("click",r=>{r.stopPropagation();let i=n.getAttribute("aria-checked")!=="true";n.setAttribute("aria-checked",String(i)),t(i)}),n}function _(e,t,o){return a("button",{class:wt("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button"},on:{click:t}})}function $(e,t,o,n){let r=a("button",{class:"bloom-icon-button",title:t,attrs:{type:"button","aria-label":t},on:{click:o}},D(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function zt(e,t,o,n,r,i){let s=a("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});s.value=String(e);let c=a("output",{text:`${e}${r}`});return s.addEventListener("input",()=>{c.textContent=`${s.value}${r}`,i(Number(s.value))}),a("div",{class:"bloom-slider"},s,c)}function Uo(e,t,o){let n=a("select",{class:"bloom-select"},...t.map(r=>a("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function Ze(e,t,o="",n="text"){let r=a("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var $s=new x("SettingsPanel"),m=E("bloom-settings-"),qs=10080*60*1e3,Gs=3e3,Rr="Toggle features. Some need a reload. Click the sliders icon to configure.",Us=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],zs=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],Fs={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},Ir=new Set(["chat","ui","privacy"]),B=null,Oe="all",zo="all",Ft="",Fo=[],Dr=()=>[...ue.values()].filter(e=>!e.hidden),js=e=>!!e.updatedAt&&Date.now()-e.updatedAt<qs;function Ks(e){switch(Oe){case"favorites":return Lt.has(e.name);case"recent":return js(e);case"all":return!0;case"other":return!e.tags.some(t=>Ir.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(Oe)}}function Ws(e){switch(zo){case"all":return!0;case"enabled":return Fe(e);case"disabled":return!Fe(e)}}function Vs(e){let t=Ft.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function Ys(e){let t=Ct.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return Oe==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var Br=e=>e.settings?.def??{},Xs=e=>Object.values(Br(e)).some(t=>t.type!=="custom");function Js(e,t,o){let n=ce(e.name,t)??Ao(o),r=i=>de(e.name,t,i);switch(o.type){case"boolean":return Go(n,r,o.description??t);case"slider":return zt(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return Uo(n,o.options,r);case"string":return Ze(n,r,o.placeholder);case"number":return Ze(String(n),i=>r(Number(i)),"","number");case"component":{let i=a("div",{class:m("component")});return Fo.push(o.render(i)),i}case"custom":return null}}var Zs=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function Nr(e){if(!B)return;let t=Object.entries(Br(e)).filter(([,i])=>i.type!=="custom").map(([i,s])=>{let c=Js(e,i,s),l=s.type==="boolean";return a("div",{class:m("field",l?"field-inline":"field-stacked")},a("div",{class:m("field-text")},s.type!=="component"&&a("div",{class:m("field-label"),text:Zs(i)}),s.description&&a("div",{class:m("field-desc"),text:s.description})),c)}),o,n=_("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},Gs);return}clearTimeout(o),e.settings?.reset(),Qe(),Nr(e)},"danger"),r=a("div",{class:m("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&Qe()}},a("div",{class:m("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},a("div",{class:m("popup-header")},a("div",{class:m("card-icon")},D(e.icon)),a("div",{class:m("popup-title")},a("div",{class:m("card-name"),text:e.name}),a("div",{class:m("popup-authors"),text:e.authors.join(", ")})),$("close","Close",Qe)),a("p",{class:m("popup-desc"),text:e.description}),a("div",{class:m("fields")},...t),a("div",{class:m("popup-footer")},n)));B.querySelector(`.${m("modal")}`)?.append(r)}function Qe(){for(let e of Fo)e();Fo=[],B?.querySelector(`.${m("popup-backdrop")}`)?.remove()}function Qs(e){let t=Fe(e),o=Lt.has(e.name),n=Ct.has(e.name);return a("div",{class:m("card",t?"card-on":"card-off")},a("div",{class:m("card-top")},a("div",{class:m("card-icon")},D(e.icon)),a("div",{class:m("card-actions")},$("star",o?"Unstar":"Star",()=>{Lt.toggle(e.name),ge()},o),$("pin",n?"Unpin":"Pin to top",()=>{Ct.toggle(e.name),ge()},n),Xs(e)&&$("gear","Settings",()=>Nr(e)),e.required?null:Go(t,r=>Vn(e,r),`Enable ${e.name}`))),a("div",{class:m("card-name"),text:e.name}),a("div",{class:m("card-desc"),text:e.description,title:e.description}),a("div",{class:m("card-footer"),text:e.authors.join(", ")}))}function Hr(){let e=Dr().some(o=>!o.tags.some(n=>Ir.has(n)));B?.querySelector(`.${m("tabs")}`)?.replaceChildren(...Us.filter(o=>o.id!=="other"||e).map(o=>a("button",{class:m("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===Oe)},on:{click:()=>{Oe=o.id,Hr(),ge()}}})))}function ge(){if(!B)return;let e=Dr().filter(Ks),t=B.querySelector(`.${m("search")} input`);t&&(t.placeholder=`Search ${St(e.length,"plugin")}...`);let o=Ys(e.filter(i=>Vs(i)&&Ws(i))),n=B.querySelector(`.${m("grid")}`),r=Ft.trim()?"No plugins match your search.":Fs[Oe]??"No plugins available.";n?.replaceChildren(...o.length?o.map(Qs):[a("div",{class:m("empty"),text:r})])}function el(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),B?.querySelector(`.${m("popup-backdrop")}`)?Qe():Re())}var _r,jo;function tl(){if(B)return;let e=a("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=Ft,e.addEventListener("input",()=>{Ft=e.value,ge()}),B=a("div",{class:`bloom-root ${m("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&Re()}},a("div",{class:m("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},a("div",{class:m("header")},a("div",{class:m("logo")},D("bloom")),a("h2",{class:m("title"),text:"Bloom++"}),a("span",{class:m("hint"),title:Rr,attrs:{"aria-label":Rr,tabindex:"0"}},D("info")),a("span",{class:m("version"),text:"v2.0.4"}),$("close","Close",Re)),a("div",{class:m("tabs"),attrs:{role:"tablist"}}),a("div",{class:m("toolbar")},a("label",{class:m("search")},D("search"),e),Uo(zo,zs,t=>{zo=t,ge()})),a("div",{class:m("grid")}))),B.addEventListener("keydown",t=>t.stopPropagation()),jo=new AbortController,document.addEventListener("keydown",el,{capture:!0,signal:jo.signal}),document.body.append(B),Hr(),ge(),_r=Yn(ge),e.focus(),$s.debug("Opened")}function Re(){Qe(),jo?.abort(),_r?.(),B?.remove(),B=null}var jt=()=>B?Re():tl();var $r=`/*
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
`;var et=E("bloom-entry-"),Ie=new Map,qr=!1,Gr;function nl(e){let t=a("button",{class:et("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:o=>{o.preventDefault(),o.stopPropagation(),jt()}}},D("bloom"),e!=="rail"&&a("span",{class:et("label"),text:"Bloom++"}));return a("div",{class:`bloom-root ${et("wrap")} ${et(e)}`,attrs:{"data-bloom":"entry"}},t)}function rl(e){let t=a("div",{class:`bloom-root ${et("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),jt()}}},D("bloom"),a("span",{text:"Bloom++"})),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function il(){let e=Mr();for(let[o,n]of Ie)o.isConnected&&e.some(r=>r.anchor===o)||(n.remove(),Ie.delete(o));for(let o of e){let n=Ie.get(o.anchor);if(n?.isConnected)continue;let r=n??nl(o.kind);Ie.set(o.anchor,r),o.insert(r)}let t=Ut();t&&!t.querySelector('[data-bloom="menu-entry"]')&&rl(t)}var Ur=p({name:"Settings",description:"Bloom++ settings panel and its sidebar entry.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,hidden:!0,startAt:"HostReady",styles:$r,start(){Gr=P(il),!qr&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",jt),qr=!0)},stop(){Gr?.();for(let e of Ie.values())e.remove();Ie.clear(),Re()}});var al=["data-turn","data-message-author-role"],sl=/:(user|assistant)$/,Ko=`${d.messageUnit}, ${d.oldMessage}`,Wo=e=>e==="user"||e==="assistant";function Vo(){let e=document.querySelector(d.timelineScroll);if(e)return e;let t=document.querySelector(d.turn);for(let o=t?.parentElement;o;o=o.parentElement){let{overflowY:n}=getComputedStyle(o);if((n==="auto"||n==="scroll")&&o.scrollHeight>o.clientHeight)return o}return document.scrollingElement}var jr=()=>document.querySelector(d.conversationTarget)??document.querySelector(d.oldThread),Kt=e=>e.getAttribute("data-chatgpt-search-unit-key")?.match(sl)?.[1]??null,Kr=e=>[...e.querySelectorAll(d.searchUnit)].filter(t=>Kt(t)&&!t.parentElement?.closest(d.searchUnit)),zr=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function tt(e){let t=zr(e);return t.length?t:[...new Set([...e.querySelectorAll(Ko)].flatMap(zr))]}function Yo(e=document){let t=Kr(e);return t.length?t:[...e.querySelectorAll(Ko)].filter(o=>!o.parentElement?.closest(Ko))}function ll(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function cl(e){for(let t of al){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(Wo(o))return o}return e.querySelector(d.markdown)||e.querySelector(d.generatedImage)?"assistant":null}var dl=e=>!e.parentElement?.closest(d.turn);function Wt(){let e=K(v())?.chain??[],t=[...document.querySelectorAll(d.turn)].filter(dl).flatMap(n=>{let r=Kr(n);return r.length?r.map(i=>({el:i,known:Kt(i)})):[{el:n,known:null}]}),{generating:o}=H();return t.map(({el:n,known:r},i)=>{let s=r?tt(n):Yo(n).flatMap(tt),c=r??cl(n)??ll(s,e)??(i%2?"assistant":"user"),l=c==="assistant"&&(n.matches(d.turnBusy)||!!n.querySelector(d.turnBusy)||o&&i===t.length-1);return{el:n,role:c,messageIds:s,streaming:l}})}var ul="[data-bloom], .sr-only",ml=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,Fr=new WeakMap;function Vt(e){let t=e.el.textContent?.length??0,o=Fr.get(e.el);if(o?.length===t)return o.summary;let n=pl(e);return Fr.set(e.el,{length:t,summary:n}),n}function pl(e){let t=e.el.querySelectorAll(d.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.querySelector(e.role==="assistant"?d.markdown:".whitespace-pre-wrap")??e.el,i=[...o.querySelectorAll(ul)].map(s=>N(s.textContent??"")).filter(Boolean).reduce((s,c)=>s.replace(c,`
`),o.innerText||o.textContent||"").split(`
`).map(N).filter(s=>s&&!ml.test(s));return i.length?i.join(" "):e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function Yt(e){return e.text?N(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var Wr=`/*
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
`;var A=E("bloom-nav-"),ei=80,gl=1200,bl=2,hl=40,yl=.3,Vr=12,vl={user:"\u2753",assistant:"\u{1F916}"},Zt=g({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the outline too.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),O=null,q=[],De=-1,Xt="",Yr=0,Xr=[],ot=null,Jt;function ti(){let e=Wt().map(s=>({role:s.role,summary:Vt(s),ids:s.messageIds,turn:s,streaming:s.streaming})),t=K(v())?.chain??[];if(!t.length)return e;let o=new Set(t.map(s=>s.id)),n=new Map(e.flatMap(s=>s.ids.map(c=>[c,s]))),r=new Set,i=[];for(let s of t){let c=n.get(s.id);c&&r.has(c)||(c&&r.add(c),i.push(c??{role:s.role,summary:Yt(s),ids:[s.id],turn:null,streaming:!1}))}return[...i,...e.filter(s=>!s.ids.some(c=>o.has(c)))]}function Sl(e){let t=e.getBoundingClientRect(),o=t.top+t.height*yl,n=-1;return q.forEach((r,i)=>{let s=r.turn?.el.getBoundingClientRect();s&&s.top<=o&&(n=i)}),n===-1?q.findIndex(r=>r.turn):n}function Jr(e){Zt.store.jumpEffect==="border"&&(e.classList.add(A("flash")),setTimeout(()=>e.classList.remove(A("flash")),gl))}function Xo(e){let t=q[e],o=Vo();if(!t||!o)return;let n=t.turn?.el;if(n?.isConnected){let u=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:u<o.clientHeight*bl?"smooth":"auto"}),Jr(n);return}let r=q.map((u,f)=>u.turn?f:-1).filter(u=>u>=0),i=r.length&&e<r[0]?-1:1,s=++Yr,c=0,l=()=>{if(s!==Yr||c++>hl)return;q=ti();let u=q.find(f=>f.ids.some(C=>t.ids.includes(C)))?.turn?.el;if(u){u.scrollIntoView({block:"start"}),Jr(u);return}o.scrollBy({top:i*o.clientHeight*.9}),requestAnimationFrame(l)};l()}function xl(e,t){return a("button",{class:A("row"),attrs:{type:"button","data-index":String(t)},on:{click:()=>Xo(t)}},a("span",{text:vl[e.role]}),a("span",{class:"bloom-truncate",text:we(e.summary||"\u2026",ei)}))}function wl(){let e=Vo(),t=jr()??e;if(q=ti(),!q.length||!e||!t){O?.remove(),O=null,Xt="";return}ot!==e&&(Jt?.abort(),Jt=new AbortController,e.addEventListener("scroll",Le(Zr),{passive:!0,signal:Jt.signal}),ot=e),O??=a("div",{class:`bloom-root ${A("root")}`,attrs:{"data-bloom":"navigator"}},a("div",{class:A("rail")}),a("div",{class:A("toc")},a("div",{class:A("toc-head")}),a("div",{class:A("toc-list")}))),O.isConnected||document.body.append(O);let o=t.getBoundingClientRect(),n=e.getBoundingClientRect();O.style.left=`${Math.min(o.right+Vr,n.right-Vr*2)}px`,O.style.top=`${n.top+n.height/2}px`;let r=JSON.stringify([Zt.store.showAssistant,q.map(i=>[i.role,i.summary,i.streaming])]);r!==Xt&&(Xt=r,El()),Zr()}function Zr(){if(!O||!ot)return;De=Sl(ot),O.querySelectorAll(`.${A("tick")}`).forEach((t,o)=>t.classList.toggle(A("tick-current"),o===De)),O.querySelectorAll(`.${A("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===De)));let e=O.querySelector(`.${A("toc-head")}`);e&&(e.textContent=`${De+1} / ${q.length}`)}function El(){O?.querySelector(`.${A("rail")}`)?.replaceChildren(...q.map((t,o)=>a("button",{class:wt(A("tick"),A(`tick-${t.role}`),t.streaming&&A("tick-streaming")),title:we(t.summary,ei),attrs:{type:"button","aria-label":`Jump to message ${o+1}`},on:{click:()=>Xo(o)}})));let e=q.map((t,o)=>({entry:t,index:o})).filter(({entry:t})=>Zt.store.showAssistant||t.role==="user");O?.querySelector(`.${A("toc-list")}`)?.replaceChildren(...e.map(({entry:t,index:o})=>xl(t,o)))}var ae=Le(wl),Tl=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function Qr(e){if(!O||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||Tl(document.activeElement)||document.querySelector("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:De-1,ArrowDown:De+1,Home:0,End:q.length-1}[e.key];o==null||o<0||o>=q.length||(e.preventDefault(),e.stopPropagation(),Xo(o))}var oi=p({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:Zt,styles:Wr,start(){Xr=[P(e=>j(e)&&ae()),re(ae),I.on("conversation",ae),S.on("rise",ae),S.on("fall",ae)],addEventListener("keydown",Qr,!0),addEventListener("resize",ae,{passive:!0})},stop(){for(let e of Xr)e();Jt?.abort(),ot=null,removeEventListener("keydown",Qr,!0),removeEventListener("resize",ae),O?.remove(),O=null,Xt=""},onSettingsChange:ae});var ni=`/*
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
`;var Cl=E("bloom-cls"),Ll="bloom-cls",Al=600*1e3,Zo=Pn("tab"),Ne=new Map,rt=new Map,Be=null,ri=[],kl=e=>e==="streaming"||e==="error";function Pl(){let e=new Map,t=Date.now();for(let[o,n]of rt)t-n.at>Al?rt.delete(o):e.set(o,n.status);for(let[o,n]of Ne)e.set(o,n);return e}function Ol(e){return a("span",{class:`bloom-root ${Cl("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&D("alert"))}function nt(){let e=Pl(),t=new Set;for(let[o,n]of e)for(let r of Je(o)){let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let s=Ol(n);t.add(s),r.append(s)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function Qt(e,t){e&&(t?Ne.set(e,t):Ne.delete(e),Be?.postMessage({tab:Zo,id:e,status:t}),nt())}function Rl({data:e}){!T(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===Zo||(kl(e.status)?rt.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):rt.delete(e.id),nt())}function Jo(){for(let e of Ne.keys())Be?.postMessage({tab:Zo,id:e,status:null})}var ii=p({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,styles:ni,start(){Be=typeof BroadcastChannel=="function"?new BroadcastChannel(Ll):null,Be?.addEventListener("message",Rl),addEventListener("pagehide",Jo),ri=[S.on("rise",({conversationId:e})=>Qt(e,"streaming")),S.on("fall",({conversationId:e,outcome:t})=>Qt(e,t==="error"?"error":null)),S.on("context",({prevId:e,id:t,migrated:o})=>{o&&H().generating?Qt(t,"streaming"):!o&&Ne.get(e??"")==="streaming"&&Qt(e,null)}),P(e=>j(e)&&nt())],v()&&nt()},stop(){for(let e of ri)e();Jo(),Be?.close(),Be=null,removeEventListener("pagehide",Jo),Ne.clear(),rt.clear(),nt()}});var si=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],oo={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Il={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Dl="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Qo=32,no=64,en="#FCFCFC",tn="#111111",Bl=14,ro=51.5,Nl=12.5,Hl=9.75,ai=52,_l=10.5,$l=7.75,ql={rotate:e=>e.arc(ro,ro,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function eo(e){let t=document.createElement("canvas");t.width=t.height=Qo;let o=t.getContext("2d");return o?(o.scale(Qo/no,Qo/no),e(o),t.toDataURL("image/png")):""}function to(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D(Dl);o&&(e.strokeStyle=tn,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function io(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function Gl(e,t){io(e,ro,Nl,tn),io(e,ro,Hl,oo[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),ql[t](e),e.stroke()}function Ul(e,t){e.beginPath(),e.roundRect(0,0,no,no,Bl),e.fillStyle=t,e.fill()}var zl=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function li(e,t){switch(e){case"original":return zl(Il[t]);case"hole":return eo(o=>to(o,oo[t],!0));case"bg":return eo(o=>{Ul(o,oo[t]),to(o,en,!1)});case"dot":return eo(o=>{to(o,en,!0),io(o,ai,_l,tn),io(o,ai,$l,oo[t])});case"badge":return eo(o=>{to(o,en,!0),Gl(o,t)})}}var at="bloom-chat-state-favicon",st="data-bloom-rel",rn="data-bloom-media",ci="bloom-parked-icon",Fl="/favicon.ico",ui=g({style:{type:"select",description:"How the tab icon shows the chat state.",options:si,default:"bg"}}),se=null,mi="",ao=null,pi="",di=new Map,an,on=[],fi=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${st}]`)];function sn(){for(let e of fi())e.id!==at&&(e.hasAttribute(st)||(pi||=e.href,e.setAttribute(st,e.rel),e.setAttribute(rn,e.getAttribute("media")??"")),e.rel!==ci&&(e.rel=ci),e.media!=="not all"&&(e.media="not all"))}function jl(){for(let e of fi()){let t=e.getAttribute(st);if(t==null)continue;e.rel=t;let o=e.getAttribute(rn);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(st),e.removeAttribute(rn)}}function gi(){let e=document.getElementById(at);return e||(e=document.createElement("link"),e.id=at,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function Kl(e){if(e==="wait")return pi||Fl;let t=ui.store.style,o=`${t}:${e}`,n=di.get(o);return n||di.set(o,n=li(t,e)),n}function nn(e){if(e)return"rotate";let t=U();return se&&t&&t!==mi&&(se=null),se==="error"?"error":se==="done"?"done":t?"ready":"wait"}function it(e,t=!1){if(e===ao&&!t)return;ao=e;let o=gi(),n=Kl(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function Wl(){an=new MutationObserver(()=>{sn(),document.head.lastElementChild?.id!==at&&gi()}),an.observe(document.head,{childList:!0})}var bi=p({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"DOMContentLoaded",settings:ui,start(){sn(),it(nn(H().generating),!0),Wl(),on=[S.on("rise",()=>{se=null,it("rotate")}),S.on("fall",({outcome:e})=>{se=e==="done"||e==="error"?e:null,mi=U(),it(nn(!1))}),S.on("context",({migrated:e})=>{e||(se=null)}),S.on("tick",({generating:e})=>{sn(),it(nn(e))})]},stop(){for(let e of on)e();on=[],an?.disconnect(),document.getElementById(at)?.remove(),jl(),ao=null,se=null},onSettingsChange(){it(ao??"wait",!0)}});var Vl={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]'],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])']},hi=g({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0}}),yi=p({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos and ads.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:hi,styles:()=>Te(Object.entries(Vl).flatMap(([e,t])=>hi.store[e]?t:[]))});var ln=`form:has(${d.composerInput}), ${d.oldComposerForm}`,Yl=`:is(${ln}) :is([class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"])`,Xl='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',Jl='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',Zl="var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, #fff)))",vi=g({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function Ql(){let{opacity:e,blur:t}=vi.store;return e>=100?"":`:is(${Xl}), :is(${ln}){background-color:transparent!important;background-image:none!important;box-shadow:none!important}:is(${Jl}){display:none!important}${Yl}{background-color:color-mix(in srgb, ${Zl} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important}:is(${ln}) :is(${d.composerInput}){background-color:transparent!important}`}var Si=p({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:vi,styles:Ql});var cn=0,so;function ec(e){if(!j(e))return;for(let o of Ar())qo(o,"profile");let t=Ut();t&&qo(t,"menu")}function He(){cn++;let e=!0;return pe().then(()=>{e&&cn&&!so&&(so=P(ec))}),()=>{e&&(e=!1,!--cn&&(so?.(),so=void 0))}}var ee=E("bloom-csi-"),tc=256,oc=160,lo=1,xi=4,nc=.1,rc=.0015,ic=250;function wi(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function ac(e){return new Promise((t,o)=>{let n=new Image;n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function sc(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:vt(t.x,n,1-n),y:vt(t.y,r,1-r)}}function Ei(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function lc(e,t){let o=a("canvas");return o.width=o.height=tc,Ei(o,e,t),o.toDataURL("image/png")}async function cc(e){if(e.startsWith("data:image/"))return e;let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status}`);return wi(await t.blob())}function Ti(e){let t=null,o={x:M.store.cropX,y:M.store.cropY,zoom:M.store.cropZoom},n,r=a("canvas",{class:ee("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=oc*devicePixelRatio;let i=a("div",{class:`bloom-muted ${ee("status")}`}),s=a("div",{class:ee("zoom")}),c=a("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(h,R=!0){t&&(o=sc(t,h),Ei(r,t,o),R&&(clearTimeout(n),n=setTimeout(()=>{t&&(M.store.cropX=o.x,M.store.cropY=o.y,M.store.cropZoom=o.zoom,M.store.avatarUrl=lc(t,o))},ic)))}function u(){s.replaceChildren(zt(o.zoom,lo,xi,nc,"\xD7",h=>l({...o,zoom:h})))}async function f(h,R){i.textContent="";try{let ne=await cc(h);t=await ac(ne),R&&(M.store.avatarSource=ne,o={x:.5,y:.5,zoom:lo}),e.classList.add(ee("has-image")),u(),l(o,R)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let C=h=>{h?.type.startsWith("image/")&&wi(h).then(R=>f(R,!0))};c.addEventListener("change",()=>C(c.files?.[0])),r.addEventListener("wheel",h=>{t&&(h.preventDefault(),l({...o,zoom:vt(o.zoom*(1-h.deltaY*rc),lo,xi)}),u())},{passive:!1}),r.addEventListener("pointerdown",h=>{if(!t)return;r.setPointerCapture(h.pointerId);let R={...o},ne=r.getBoundingClientRect(),ht=yt=>{if(!t)return;let F=Math.max(ne.width/t.naturalWidth,ne.height/t.naturalHeight)*o.zoom;l({...o,x:R.x-(yt.clientX-h.clientX)/(t.naturalWidth*F),y:R.y-(yt.clientY-h.clientY)/(t.naturalHeight*F)})};r.addEventListener("pointermove",ht),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",ht),{once:!0})});let Z=a("div",{class:ee("cropper"),attrs:{tabindex:"0"},on:{paste:h=>C([...h.clipboardData?.files??[]].find(R=>R.type.startsWith("image/"))),dragover:h=>h.preventDefault(),drop:h=>{h.preventDefault(),C(h.dataTransfer?.files[0])}}},a("div",{class:ee("stage")},r),a("div",{class:ee("controls")},Ze("",h=>h.trim()&&void f(h.trim(),!0),"https://\u2026 or data:image/\u2026","url"),a("div",{class:ee("buttons")},_("Choose file",()=>c.click()),_("Reset crop",()=>{l({x:.5,y:.5,zoom:lo}),u()}),_("Clear",()=>{t=null,e.classList.remove(ee("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),s.replaceChildren(),M.store.avatarUrl="",M.store.avatarSource=""},"danger")),s,i,c));return e.append(Z),M.store.avatarSource&&f(M.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var Mi=`/*
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
`;var _e="data-bloom-csi-avatar",uc="data-bloom-csi-sized",ki="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",M=g({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>Ti(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),Ci=[];function Li(e){return(M.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function Ai(e=[]){if(!j(e))return;let t=M.store.displayName.trim()||null,o=!!M.store.avatarUrl,n=new Set(t?Li("name"):[]);for(let i of document.querySelectorAll(ki))n.has(i)||me(i,null);for(let i of n)me(i,t);let r=new Set(o?Li("avatar"):[]);for(let i of document.querySelectorAll(`[${_e}]`))r.has(i)||i.removeAttribute(_e);for(let i of r)i.hasAttribute(_e)||i.setAttribute(_e,""),i.toggleAttribute(uc,!i.closest(`${d.rail}, ${d.oldRail}, [role="menu"]`))}function mc(){let e=M.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${M.store.avatarSize}px}`:""}var Pi=p({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:M,styles:()=>`${mc()}
${Mi}`,start(){Ci=[He(),P(Ai)]},stop(){for(let e of Ci)e();for(let e of document.querySelectorAll(`[${_e}]`))e.removeAttribute(_e);for(let e of document.querySelectorAll(ki))me(e,null)},onSettingsChange(){Ai()}});var $e=E("bloom-greeting-"),Oi=30,Ri=100;function Ii(e){let t=-1,o=a("textarea",{class:`bloom-input ${$e("input")}`,attrs:{maxlength:String(Ri),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=_("Add",i),r=a("div",{class:$e("list")});function i(){let l=o.value.trim().slice(0,Ri);if(!l)return;let u=[...w.store.greetings];t>=0?u[t]=l:u.length<Oi&&u.push(l),w.store.greetings=u,t=-1,o.value="",s()}function s(){let{greetings:l}=w.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&l.length>=Oi,r.replaceChildren(...l.length?l.map((u,f)=>a("div",{class:$e("row",f===t?"row-editing":"row-idle")},a("div",{class:$e("text"),text:u}),$("edit","Edit",()=>{t=f,o.value=u,o.focus(),s()}),$("trash","Delete",()=>{w.store.greetings=l.filter((C,Z)=>Z!==f),t===f&&(t=-1),s()}))):[a("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),e.append(a("div",{class:$e("editor")},r,a("div",{class:$e("form")},o,n))),s();let c=Me((l,u)=>l==="GreetingCustomizer"&&u==="greetings"&&s());return()=>{c(),e.replaceChildren()}}var Di=`/*
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
`;var uo="data-bloom-greeting",fc=1e3,gc=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],w=g({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>Ii(e)},greetings:{type:"custom",default:gc},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),co,Bi=[],dn,Ni=()=>w.store.greetings.filter(e=>typeof e=="string"&&e.trim());function ct(){let e=Ni();if(e.length)if(w.store.order==="random"&&e.length>1){let t=w.store.lastRandom;for(;t===w.store.lastRandom;)t=Math.floor(Math.random()*e.length);w.store.lastRandom=t,w.store.index=t}else w.store.index=(w.store.index+1)%e.length}function bc(){return fe()?Ce(d.homeHeading):null}function Hi(){for(let e of document.querySelectorAll(`[${uo}]`))e.removeAttribute(uo),me(e,null)}function lt(){let e=Ni(),t=bc();if(!t||!e.length){Hi();return}(w.store.index<0||w.store.index>=e.length)&&ct(),t.setAttribute(uo,""),me(t,e[Math.max(0,w.store.index)%e.length])}function un(){clearInterval(co),co=void 0,w.store.mode==="interval"&&fe()&&(co=setInterval(()=>{ct(),lt()},w.store.intervalSec*fc))}function hc(e){w.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${uo}]`)||getSelection()?.toString()||(ct(),lt())}function yc(){fe()&&w.store.mode==="refresh"&&ct(),un(),lt()}var _i=p({name:"GreetingCustomizer",description:"Replace the \u201CWhat can I help with?\u201D heading on the home page with your own lines.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:w,styles:Di,start(){dn=new AbortController,document.addEventListener("click",hc,{signal:dn.signal}),fe()&&w.store.mode==="refresh"&&ct(),un(),Bi=[P(e=>j(e)&&lt()),re(yc)]},stop(){dn?.abort();for(let e of Bi)e();clearInterval(co),Hi()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&un(),lt()}});var dt=E("bloom-history-"),mn=10,vc=3e3;function $i(e){let t="",o=0,n=new Set,r=a("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),i=a("div",{class:dt("list")}),s=a("div",{class:dt("pager")}),c,l=_("Clear all",()=>{if(!c){l.textContent="Click again to clear",c=setTimeout(()=>{c=void 0,l.textContent="Clear all"},vc);return}clearTimeout(c),c=void 0,l.textContent="Clear all",ut([])},"danger");function u(){let C=[...be.store.entries].toReversed(),Z=t.trim().toLowerCase(),h=Z?C.filter(F=>F.toLowerCase().includes(Z)):C,R=Math.max(1,Math.ceil(h.length/mn));o=Math.min(o,R-1);let ne=h.slice(o*mn,(o+1)*mn).map(F=>a("div",{class:dt("row")},a("button",{class:dt("text",n.has(F)?"text-open":"text-closed"),text:F,title:n.has(F)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{n.delete(F)||n.add(F),u()}}}),$("copy","Copy",()=>void On(F)),$("trash","Delete",()=>ut(be.store.entries.filter(Pa=>Pa!==F)))));i.replaceChildren(...ne.length?ne:[a("div",{class:"bloom-muted",text:Z?"No matching prompts.":"No saved prompts yet."})]),s.replaceChildren(a("span",{class:"bloom-muted",text:`${h.length} saved \xB7 page ${o+1} of ${R}`}),_("Previous",()=>{o--,u()}),_("Next",()=>{o++,u()}),l);let[ht,yt]=s.querySelectorAll("button");ht.disabled=o===0,yt.disabled=o>=R-1,l.disabled=!C.length}r.addEventListener("input",()=>{t=r.value,o=0,u()}),e.append(a("div",{class:dt("manager")},r,i,s)),u();let f=Me((C,Z)=>C==="InputHistory"&&Z==="entries"&&u());return()=>{f(),clearTimeout(c),e.replaceChildren()}}var qi=`/*
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
`;var xc=E("bloom-history-"),wc=2e3,be=g({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>$i(e)},entries:{type:"custom",default:[]}}),z=null,pn={text:"",at:0},he=null,fn,mo=()=>be.store.entries.filter(e=>typeof e=="string");function ut(e){be.store.entries=e.slice(-be.store.maxEntries)}function gn(e){let t=e.trim();if(!t)return;let o=Date.now();t===pn.text&&o-pn.at<wc||(pn={text:t,at:o},ut([...mo().filter(n=>n!==t),t]))}function Ec(e,t){let o=Ae();if(!o)return;he??=a("div",{class:`bloom-root ${xc("hud")}`,attrs:{"data-bloom":"history-hud","aria-live":"polite"}}),he.textContent=`${e+1} / ${t}`;let n=(o.closest("form")??o).getBoundingClientRect();he.style.left=`${n.left+n.width/2}px`,he.style.top=`${n.top}px`,he.isConnected||document.body.append(he)}function mt(){z=null,he?.remove()}function Tc(e){let t=mo();if(!z)return;let o=t[e];z.index=e,z.shown=o,Q(o),Ec(t.length-1-e,t.length)}function Mc(e){let t=mo();if(!t.length)return!1;if(!z){if(e===1)return!1;z={index:t.length,draft:U(),shown:""}}let o=z.index+e;return o<0?!0:o>=t.length?(Q(z.draft),mt(),!0):(Tc(o),!0)}function Cc(e){if(e.isComposing||!We(e.target))return;let t=e.target;if(e.key==="Enter"&&!e.shiftKey){gn(U(t)),mt();return}if(e.key==="Escape"&&z){Q(z.draft),mt(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey)return;let o=tr(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!z||Mc(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function Lc(e){z&&We(e.target)&&U(e.target)!==z.shown.trim()&&mt()}function Ac(e){e.target instanceof Element&&e.target.closest(d.sendButton)&&gn(U())}var Gi=p({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:be,styles:qi,start(){fn=new AbortController;let{signal:e}=fn;document.addEventListener("keydown",Cc,{capture:!0,signal:e}),document.addEventListener("input",Lc,{capture:!0,signal:e}),document.addEventListener("click",Ac,{capture:!0,signal:e}),document.addEventListener("submit",()=>gn(U()),{capture:!0,signal:e})},stop(){fn?.abort(),mt()},onSettingsChange(e){e==="maxEntries"&&ut(mo())}});var Ui=`/*
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
`;var Pc=1500,Oc=5e3,Rc=2e3,qe=g({showDate:{type:"boolean",description:"Show the date for messages not sent today.",default:!0},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),fo=new Map,ji=0,go,zi=[];function Ki(e,t){fo.get(e)!==t&&(fo.set(e,t),clearTimeout(go),go=setTimeout(Wi,Rc))}function Wi(){let e={...qe.store.stamps,...Object.fromEntries(fo)};qe.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,Pc))}function Ic(e){let t=K(v())?.times;for(let o=e.length-1;o>=0;o--){let n=fo.get(e[o])??t?.get(e[o])??qe.store.stamps[e[o]];if(n)return n}return null}var Dc=()=>H().generating||Date.now()-ji<Oc;function Bc(e){let t=new Date(e),o=new Date,n={hour:"2-digit",minute:"2-digit"};if(!qe.store.showDate||t.toDateString()===o.toDateString())return t.toLocaleTimeString(void 0,n);let r=t.getFullYear()===o.getFullYear()?{}:{year:"numeric"};return t.toLocaleString(void 0,{...r,month:"short",day:"numeric",...n})}function Fi(e){let t=Kt(e)??e.getAttribute("data-message-author-role")??e.closest(d.turn)?.getAttribute("data-turn")??e.querySelector(d.authorRole)?.getAttribute("data-message-author-role");if(Wo(t))return t;let o=tt(e).at(-1);return K(v())?.chain.find(n=>n.id===o)?.role??null}function Nc(e){let t=tt(e);if(!t.length||e.querySelector("time:not([data-bloom])"))return;let o=Ic(t);!o&&Dc()&&(o=Date.now(),Ki(t.at(-1),o));let n=e.querySelector(':scope > time[data-bloom="timestamp"]');if(!o||qe.store.hideOwnMessages&&Fi(e)==="user"){n?.remove();return}let r=Bc(o);if(n?.textContent===r)return;let i=a("time",{class:`bloom-timestamp bloom-timestamp-${Fi(e)??"assistant"}`,text:r,title:new Date(o).toLocaleString(),attrs:{"data-bloom":"timestamp",datetime:new Date(o).toISOString()}});n?n.replaceWith(i):e.prepend(i)}var po=Le(()=>{for(let e of Yo())Nc(e)}),Vi=p({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:qe,styles:Ui,start(){zi=[P(e=>j(e)&&po()),I.on("conversation",po),I.on("message-time",({messageId:e,time:t})=>{Ki(e,t),po()}),S.on("fall",()=>{ji=Date.now()})]},stop(){for(let e of zi)e();go&&(clearTimeout(go),Wi());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();po()}}});var Hc=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])'],_c=['[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],Yi=g({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),Xi=p({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:Yi,styles:()=>Te([...Hc,...Yi.store.hideDictationSettings?_c:[]])});var $c=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],qc=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])'],bn=g({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),Ji=p({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:bn,styles:()=>Te([...bn.store.hideShareChat?$c:[],...bn.store.hideShareProject?qc:[]])});var Zi='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',Gc='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',Uc="[data-bloom-profile-plan]",Qi="visibility:hidden!important;user-select:none!important",ta=g({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function zc(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=ta.store,r=[];return e&&r.push(n?`:is(${Zi}){display:none!important}`:`:is(${Zi}){${Qi}}`),t&&r.push(`:is(${Gc}){${Qi}}`),e&&o&&r.push(`${Uc}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var ea,oa=p({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:ta,styles:zc,start(){ea=He()},stop(){ea?.()}});var na=`/*
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
`;var k=E("bloom-queue-"),jc=6,Kc=8,G=null,pt="",bo=!1,ye=!1;function hn(e,t,o){let n=$(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute("title"),n.addEventListener("mouseenter",()=>ra(t)),n.addEventListener("mouseleave",()=>ra("")),n}function ra(e){let t=G?.querySelector(`.${k("tip")}`);t&&(t.textContent=e)}function Wc(e,t,o,n){ye=!0;let r=a("textarea",{class:`bloom-input ${k("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=s=>{ye=!1,pt="",s&&n.edit(t,r.value)};r.addEventListener("keydown",s=>{s.stopPropagation(),!s.isComposing&&(s.key==="Enter"&&!s.shiftKey?(s.preventDefault(),i(!0)):s.key==="Escape"&&(s.preventDefault(),i(!1)))}),r.addEventListener("blur",()=>ye&&i(!0),{once:!0}),e.querySelector(`.${k("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function Vc(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,s=l=>{!i&&Math.abs(l.clientY-n.clientY)<jc||(i||(i=ye=!0,e.classList.add(k("dragging"))),e.style.transform=`translateY(${l.clientY-n.clientY}px)`)},c=l=>{if(removeEventListener("pointermove",s),!i)return;ye=!1,pt="";let f=[...r.children].filter(C=>C!==e).filter(C=>C.getBoundingClientRect().top+C.getBoundingClientRect().height/2<l.clientY).length;o.move(t,f)};addEventListener("pointermove",s),addEventListener("pointerup",c,{once:!0})})}function Yc(e,t,o){let n=a("li",{class:k("row")},a("div",{class:k("text"),text:e}),a("div",{class:k("actions")},hn("trash","Remove from queue",()=>o.remove(t)),hn("edit","Edit",()=>Wc(n,t,e,o)),hn("send","Send now",()=>o.sendNow(t))));return Vc(n,t,o),n}function Xc(e){if(!G)return;let t=e.getBoundingClientRect();G.style.left=`${t.left}px`,G.style.width=`${t.width}px`,G.style.bottom=`${innerHeight-t.top+Kc}px`}function yn(){G?.remove(),G=null,pt="",ye=!1}function ho(e,t){let o=Ro();if(!e.length||!Ke(o)){yn();return}G||(G=a("div",{class:`bloom-root ${k("tray")}`,attrs:{"data-bloom":"queue"}},a("div",{class:k("header")},a("button",{class:k("toggle"),attrs:{type:"button"},on:{click:()=>{bo=!bo,G?.classList.toggle(k("collapsed"),bo)}}},a("span",{class:k("count")}),D("chevron")),a("span",{class:k("tip")})),a("ol",{class:k("list")})),G.classList.toggle(k("collapsed"),bo),document.body.append(G)),Xc(o);let n=JSON.stringify(e);if(ye||n===pt)return;pt=n;let r=G.querySelector(`.${k("count")}`);r&&(r.textContent=St(e.length,"Queued message")),G.querySelector(`.${k("list")}`)?.replaceChildren(...e.map((i,s)=>Yc(i,s,t)))}var Jc=8,Zc=150,Qc=20,sa=g({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1}}),ve=new Map,yo=!1,Se=null,vn,ia=[],Sn="draft",xn=()=>v()??Sn,W=()=>ve.get(xn())??[];function xe(e){e.length?ve.set(xn(),e):ve.delete(xn()),ho(W(),wn)}function vo(e,t=0){if(H().generating||U()){t<Qc&&setTimeout(()=>vo(e,t+1),Zc);return}Q(e),Oo(()=>{nr()||Q("")})}function aa(){if(Se!=null){let o=Se;Se=null,vo(o);return}if(!yo||H().generating||U())return;let[e,...t]=W();e!=null&&(yo=!1,xe(t),vo(e))}function la(e){let t=W(),o=t[e];if(o!=null){if(xe(t.filter((n,r)=>r!==e)),!H().generating){vo(o);return}Se=o,It()?.click()}}var wn={remove:e=>xe(W().filter((t,o)=>o!==e)),edit:(e,t)=>xe(t.trim()?W().map((o,n)=>n===e?t:o):W().filter((o,n)=>n!==e)),sendNow:la,move(e,t){let o=[...W()],[n]=o.splice(e,1);o.splice(t,0,n),xe(o)}};function ed(e){let t=W();return sa.store.replacePending&&t.length?(xe([...t.slice(0,-1),e]),!0):t.length>=Jc?!1:(xe([...t,e]),!0)}function td(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!We(e.target)||!H().generating)return;let t=U(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;Q(""),Se=t,It()?.click();return}if(!t){W().length&&la(0);return}ed(t)&&Q("")}var ca=p({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:sa,styles:na,start(){vn=new AbortController,document.addEventListener("keydown",td,{capture:!0,signal:vn.signal}),ia=[S.on("fall",({outcome:e})=>{yo=e==="done",e==="left"&&(Se=null),aa()}),S.on("context",({prevId:e,id:t,migrated:o})=>{let n=ve.get(Sn);ve.delete(Sn),o&&!e&&t&&n&&ve.set(t,n),o||(yo=!1),ho(W(),wn)}),S.on("tick",()=>{aa(),ho(W(),wn)})]},stop(){vn?.abort();for(let e of ia)e();yn(),ve.clear(),Se=null}});var od=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function nd(){let e=N(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!od.has(e.toLowerCase())?e:null}function ft(e){return e?K(e)?.title??Pr(e)??(e===v()?nd():null):null}var da=`/*
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
`;var te=E("bloom-recent-"),oe="home",id=50,ua=140,ad=new Set(["Backquote"]),sd=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),y=g({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),le=null,X=[],J=0,En,ma=[],wo=()=>gr()?null:v()??(fe()?oe:null);function pa(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function ga(e){let t=ft(e);t&&y.store.titles[e]!==t&&(y.store.titles={...y.store.titles,[e]:t});let o=Or(location.href);o&&e===v()&&y.store.projects[e]!==o&&(y.store.projects={...y.store.projects,[e]:o})}function fa(e){if(!e)return;let t=[e,...y.store.visits.filter(n=>n!==e)].slice(0,id),o=new Set(t);y.store.visits=t,Object.keys(y.store.previews).some(n=>!o.has(n))&&(y.store.previews=pa(y.store.previews,o)),Object.keys(y.store.titles).some(n=>!o.has(n))&&(y.store.titles=pa(y.store.titles,o)),e!==oe&&ga(e)}function So(e){if(!e||!y.store.visits.includes(e))return;let t={},o=K(e)?.chain??[];for(let r of o)t[r.role]=we(Yt(r),ua);if(e===v())for(let r of Wt()){let i=Vt(r);i&&(t[r.role]=we(i,ua))}let n=y.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(y.store.previews={...y.store.previews,[e]:t})}function ld(){let e=Number(y.store.maxRecent);return y.store.visits.filter(t=>t!==oe||y.store.includeHome).slice(0,e)}function Tn(e){if(gt(),e===wo())return;let t=e===oe?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"]'):Je(e)[0];t?t.click():location.assign(e===oe?"/":`/c/${e}`)}function cd(e,t){let o=e===oe?"New chat":y.store.titles[e]??ft(e)??"Untitled chat",n=e===oe?null:y.store.projects[e],r=e===oe?null:y.store.previews[e];return a("button",{class:te("item"),attrs:{type:"button",role:"option","aria-selected":String(t===J)},on:{click:()=>Tn(e),mousemove:()=>t!==J&&xo(t)}},a("div",{class:te("head")},a("span",{class:`${te("title")} bloom-truncate`,text:o}),n&&a("span",{class:te("project"),text:n})),r?.user&&a("div",{class:`${te("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&a("div",{class:`${te("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function xo(e){J=(e+X.length)%X.length,le?.querySelectorAll(`.${te("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===J)))}function dd(){So(v());let e=wo();X=ld(),e&&(X=[e,...X.filter(t=>t!==e)].slice(0,Number(y.store.maxRecent))),X.length&&(J=X.length>1?1:0,le=a("div",{class:`bloom-root ${te("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:t=>t.target===t.currentTarget&&gt()}},a("div",{class:te("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...X.map(cd))),document.body.append(le))}function gt(){le?.remove(),le=null}var ud=e=>ad.has(e.code)||sd.has(e.key);function md(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&ud(e)){e.preventDefault(),e.stopPropagation(),le?xo(J+(e.shiftKey?-1:1)):dd();return}if(!le)return;let o={Escape:gt,Enter:()=>Tn(X[J]),ArrowDown:()=>xo(J+1),ArrowUp:()=>xo(J-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function pd(e){le&&e.key==="Control"&&Tn(X[J])}var ba=p({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:y,styles:da,start(){En=new AbortController;let{signal:e}=En;addEventListener("keydown",md,{capture:!0,signal:e}),addEventListener("keyup",pd,{capture:!0,signal:e}),addEventListener("blur",gt,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&So(v()),{signal:e}),ma=[re(({prevId:i})=>{So(i),fa(wo())}),I.on("conversation",({id:i})=>{y.store.visits.includes(i)&&ga(i),So(i)})];let{visits:t,titles:o,previews:n}=y.store,r=t.filter(i=>i!==oe&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(y.store.visits=t.filter(i=>!r.includes(i))),fa(wo())},stop(){En?.abort();for(let e of ma)e();gt()}});var fd=new x("ResponseNotification"),gd=[880,1318.5],bd=.14,ha=.22,hd=.08,ya=1e-4,yd=.02,bt=g({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the built-in chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",description:"Try the sound.",render:e=>(e.append(_("Play",Sa)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),Mn=null,va,Cn;function vd(){Mn??=new AudioContext;let e=Mn.currentTime;gd.forEach((t,o)=>{let n=Mn,r=e+o*bd,i=n.createOscillator(),s=n.createGain();i.frequency.value=t,s.gain.setValueAtTime(ya,r),s.gain.exponentialRampToValueAtTime(hd,r+yd),s.gain.exponentialRampToValueAtTime(ya,r+ha),i.connect(s).connect(n.destination),i.start(r),i.stop(r+ha)})}function Sa(){let e=bt.store.soundUrl.trim();e?new Audio(e).play().catch(t=>fd.warn("Custom sound failed",t)):vd()}function Sd(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function xd(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(Cn=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:Cn.signal}))}var xa=p({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:bt,start(){xd(),va=S.on("fall",({conversationId:e,outcome:t})=>{t==="done"&&(bt.store.onlyWhenHidden&&!document.hidden||(bt.store.sound&&Sa(),bt.store.browserNotification&&Sd(ft(e))))})},stop(){va?.(),Cn?.abort()}});var wd="filter:blur(6px)!important;transition:filter 0.2s ease",wa=`:is(${d.sidebars})`,Ed={conversations:{selectors:[`${wa} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0},projects:{selectors:[`${wa} a:is([href*="/project"], [href*="/g/g-p-"])`,".bloom-recent-project"],hover:!0},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}},Ta=g({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function Td(){return Object.entries(Ed).filter(([e])=>Ta.store[e]).map(([,{selectors:e,hover:t}])=>{let o=e.join(",");return`:is(${o}){${wd}}`+(t?`:is(${o}):hover, .bloom-recent-item:hover :is(${o}){filter:none!important}`:"")}).join(`
`)}var Ea,Ma=p({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:Ta,styles:Td,start(){Ea=He()},stop(){Ea?.()}});var Md=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],Cd=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",Ld='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',Ca=g({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function Ad(){let e=`${Ca.store.width}rem`;return`:is(${Cd}){${Md.map(t=>`${t}:${e}!important`).join(";")}}:is(${Ld}){max-width:min(100%, ${e})!important}`}var La=p({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:Ca,styles:Ad});var kd=[Ur,oi,ii,bi,yi,Si,Pi,_i,Gi,Vi,Xi,Ji,oa,ca,ba,xa,Ma,La],Ln=kd;var Pd=new x("Bloom"),Aa="2.0.4";async function An(){ur();for(let e of Ln)e.updatedAt=xr[e.name];Fn(Ln),await qn(),xt("base",Xn),Sr(),kt("Init"),await pe(),In(),kt("DOMContentLoaded"),await pr(),kt("HostReady"),Pd.info(`Bloom++ ${Aa} ready`)}var ka=new x("Boot");if(window===window.top){let e=V.Bloom;e&&ka.warn("Replacing another Bloom++ instance",e.VERSION),Object.defineProperty(V,"Bloom",{value:kn,configurable:!0,writable:!0}),An().catch(t=>ka.error("Startup failed",t))}})();
