// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260928] v2.0.0
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

/* Bloom++ [20260928] v2.0.0. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var ha=Object.defineProperty;var ya=(e,t)=>{for(var o in t)ha(e,o,{get:t[o],enumerable:!0})};var S=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var ht=(e,t,o)=>Math.min(o,Math.max(t,e)),C=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Cn=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,we=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,G=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function yt(e,t){return`${e} ${t}${e===1?"":"s"}`}async function Ln(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function qe(e){try{return JSON.parse(e)}catch{return}}var W=typeof unsafeWindow>"u"?window:unsafeWindow;var Mn={};ya(Mn,{VERSION:()=>fa,init:()=>Tn,plugins:()=>pe});var Ee=new Map,yo;function vo(e){!document.head||e.parentNode===document.head||document.head.append(e)}function An(){yo||!document.head||(yo=new MutationObserver(()=>{for(let e of Ee.values())e.isConnected||vo(e)}),yo.observe(document.head,{childList:!0}))}function vt(e,t){let o=Ee.get(e);o||(o=document.createElement("style"),o.id=`bloom-style-${e}`,Ee.set(e,o)),o.textContent!==t&&(o.textContent=t),vo(o),An()}function xo(e){Ee.get(e)?.remove(),Ee.delete(e)}function Pn(){for(let e of Ee.values())vo(e);An()}var E=e=>(...t)=>t.map(o=>e+o).join(" "),xt=(...e)=>e.filter(Boolean).join(" "),Te=e=>e.length?`${e.join(",")}{display:none!important}`:"";function p(e){return e}var St=new S("Storage"),va="bloompp",wt="kv",kn=null;function xa(){return kn??=new Promise((e,t)=>{let o=indexedDB.open(va,1);o.onupgradeneeded=()=>{o.result.objectStoreNames.contains(wt)||o.result.createObjectStore(wt)},o.onsuccess=()=>e(o.result),o.onerror=()=>t(o.error)}),kn}function On(e,t){return xa().then(o=>new Promise((n,r)=>{let i=t(o.transaction(wt,e).objectStore(wt));i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)}))}async function Sa(e){if(typeof GM_getValue=="function")try{return await GM_getValue(e)}catch(t){St.warn("GM read failed",t);return}}async function wa(e){try{return await On("readonly",t=>t.get(e))}catch(t){St.warn("IndexedDB read failed",t);return}}function Ea(e){try{return localStorage.getItem(e)??void 0}catch{return}}async function Rn(e){return Promise.all([Sa(e),wa(e),Ea(e)])}function In(e,t){let o=JSON.stringify(t);if(typeof GM_setValue=="function")try{GM_setValue(e,t)}catch{GM_setValue(e,o)}try{localStorage.setItem(e,o)}catch(n){St.warn("localStorage write failed",n)}On("readwrite",n=>n.put(o,e)).catch(n=>St.warn("IndexedDB write failed",n))}var Ta=new S("Settings"),Bn="BloomSettings",Ma=100,Ca=["GM","IndexedDB","localStorage"],Et={plugins:{}},So=new Set,Ge;function La(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=qe(t);return!C(t)||!C(t.plugins)||!Object.keys(t.plugins).length?null:t}var wo=e=>e==null||e===""||(Array.isArray(e)?!e.length:C(e)&&!Object.keys(e).length);function Aa(e){return wo(e)?0:Array.isArray(e)?12+Math.min(e.length,40):C(e)?12+Math.min(Object.keys(e).length,40):3}function Pa(e){let t=0;for(let o of Object.values(e.plugins))if(C(o))for(let[n,r]of Object.entries(o))n!=="enabled"&&(t+=Aa(r));return t}var Dn=e=>Object.values(e.plugins).filter(t=>C(t)&&t.enabled===!0).length;function ka(e){let t=e.map((i,s)=>i&&{candidate:i,index:s,score:Pa(i)}).filter(i=>i!=null).toSorted((i,s)=>s.score-i.score||(i.score?0:Dn(s.candidate)-Dn(i.candidate))||i.index-s.index);if(!t.length)return null;let[o,...n]=t,r=structuredClone(o.candidate);for(let{candidate:i}of n)for(let[s,c]of Object.entries(i.plugins)){if(!C(c))continue;let l=r.plugins[s]??={};for(let[u,b]of Object.entries(c))u==="enabled"?!("enabled"in l)&&b===!0&&(l.enabled=!0):wo(l[u])&&!wo(b)&&(l[u]=structuredClone(b));Object.keys(l).length||delete r.plugins[s]}return{bag:r,source:Ca[o.index]}}async function Nn(){let e=await Rn(Bn),t=ka(e.map(La));t&&(Et.plugins=t.bag.plugins,Ta.info("Loaded settings from",t.source))}function Hn(){Ge=void 0,In(Bn,Et)}function Oa(){Ge&&(clearTimeout(Ge),Hn())}var ue=(e,t)=>Et.plugins[e]?.[t];function me(e,t,o){let n=Et.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,clearTimeout(Ge),Ge=setTimeout(Hn,Ma);for(let r of So)r(e,t)}function Me(e){return So.add(e),()=>void So.delete(e)}function Eo(e){return e.type==="component"?void 0:e.default}function f(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>ue(t.pluginName,n)??(e[n]&&Eo(e[n])),set:(o,n,r)=>(me(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&ue(t.pluginName,o)!==void 0&&me(t.pluginName,o)}};return t}var _n=e=>{let t=()=>{let o=ue("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();me("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},Tt=_n("pinnedPlugins"),Mt=_n("starredPlugins");addEventListener("pagehide",Oa);var Ct=new S("PluginManager"),pe=new Map,ze=new Set,$n=new Set,To=new Set;function qn(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),pe.set(t.name,t)}var Ue=e=>!!e.required||(ue(e.name,"enabled")??!!e.enabledByDefault);var Mo=e=>`plugin-${e.name}`;function Gn(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?vt(Mo(e),t):xo(Mo(e))}function zn(e){if(!ze.has(e.name))try{Gn(e),e.start?.(),ze.add(e.name)}catch(t){Ct.error(`Failed to start ${e.name}`,t)}}function Ra(e){if(ze.delete(e.name)){xo(Mo(e));try{e.stop?.()}catch(t){Ct.error(`Failed to stop ${e.name}`,t)}}}var Un=e=>e.startAt??"HostReady";function Lt(e){$n.add(e);for(let t of pe.values())Un(t)===e&&Ue(t)&&zn(t);Ct.info(`${e}: ${[...ze].join(", ")}`)}function jn(e,t){me(e.name,"enabled",t),t?$n.has(Un(e))&&zn(e):Ra(e);for(let o of To)o()}function Fn(e){return To.add(e),()=>void To.delete(e)}Me((e,t)=>{let o=pe.get(e);if(!(!o||t==="enabled"||!ze.has(e)))try{Gn(o),o.onSettingsChange?.(t)}catch(n){Ct.error(`Settings change failed for ${e}`,n)}});var Kn=`/*
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
`;var Da=new S("Events");function At(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){Da.error(`Listener for ${String(t)} failed`,r)}}}}var Ba=new S("Dom");function a(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var Vn=document.createElement("template");function Wn(e){return Vn.innerHTML=e.trim(),Vn.content.firstElementChild.cloneNode(!0)}var Fe=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),Ce=(e,t=document)=>[...t.querySelectorAll(e)].find(Fe)??null,Na=16;function Co(e){document.hidden?setTimeout(e,Na):requestAnimationFrame(e)}function Le(e){let t=!1;return()=>{t||(t=!0,Co(()=>{t=!1;try{e()}catch(o){Ba.error("Scheduled task failed",o)}}))}}var Pt=new Set,kt=[],je,Ha=Le(()=>{let e=kt;kt=[];for(let t of Pt)t(e)});function B(e){return Pt.add(e),je||(je=new MutationObserver(t=>{kt.push(...t),Ha()}),je.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{Pt.delete(e),!Pt.size&&(je?.disconnect(),je=void 0,kt=[])}}var _a=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),F=e=>!e.length||e.some(t=>!_a(t.target));function fe(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size");return}e.getAttribute("data-bloom-text")!==t&&(e.hasAttribute("data-bloom-text")||e.style.setProperty("--bloom-text-size",getComputedStyle(e).fontSize),e.setAttribute("data-bloom-text",t))}var d={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",homeHeading:'main h1, [data-testid="home-heading"]'};var Yn=/[​-‍﻿]/g,Ae=()=>Ce(d.composerInput),Ke=e=>e instanceof HTMLElement&&e.matches(d.composerInput),Lo=(e=Ae())=>e?.closest("form")??document.querySelector(d.oldComposerForm);function z(e=Ae()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(Yn,"").trim();let t=e.cloneNode(!0);for(let r of t.querySelectorAll('[contenteditable="false"], button'))r.remove();let o=[...t.querySelectorAll("p")];return(o.length?o.map(r=>r.textContent??"").join(`
`):t.textContent??"").replace(Yn,"").trim()}var $a=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function Q(e,t=Ae()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return $a?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function Xn(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:s,value:c}=e;return{first:!c.slice(0,i).includes(`
`),last:!c.slice(s).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var Jn=e=>{let t=Lo();return(t&&Ce(e,t))??Ce(e)},Ot=()=>Jn(d.stopButton),qa=()=>{let e=Jn(d.sendButton);return e&&!e.matches(d.stopButton)?e:null};function Zn(){let e=qa();if(e&&!e.disabled)return e.click(),!0;let t=Ae();return t?(t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),!0):!1}var Ao=()=>Fe(Ot());var tr=new S("Network"),Ga=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,za=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,ko=1e3,R=At(),Po=new Map,Qn=new Map,Ua=1,K=e=>e?Po.get(e)??null:null;function Rt(e){let t=Po.get(e);return t||Po.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var or=e=>e==="user"||e==="assistant";function ja(e){let t=e.author?.role;if(!e.id||!or(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(l=>typeof l=="string").join(`
`).trim(),i=n.filter(l=>C(l)&&l.content_type==="image_asset_pointer").length,s=e.metadata?.attachments,c=Array.isArray(s)&&s.length>0;return!r&&!i&&!c?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*ko:null,text:r,hasFiles:c,imageCount:i}}function Fa(e,t){if(!C(t)||!C(t.mapping))return null;let o=Rt(e);typeof t.title=="string"&&t.title&&(o.title=t.title);let n=t.mapping;for(let c of Object.values(n)){let l=c.message?.create_time;c.message?.id&&l&&o.times.set(c.message.id,l*ko)}let r=[],i=new Set,s=typeof t.current_node=="string"?t.current_node:null;for(;s&&!i.has(s)&&n[s];){i.add(s);let c=n[s].message,l=c?ja(c):null;l&&r.push(l),s=n[s].parent??null}return r.length&&(o.chain=r.toReversed()),o}function Ka(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}function Va(e){if(typeof e?.body!="string")return null;let t=qe(e.body);return C(t)&&typeof t.conversation_id=="string"?t.conversation_id:null}function Wa(e,t){if(!C(e))return;let o=C(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(Rt(e.conversation_id).title=e.title,R.emit("conversation",Rt(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&or(n.author?.role)){let r=n.create_time*ko;t.conversationId&&Rt(t.conversationId).times.set(n.id,r),R.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function Ya(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:s}=await o.read();if(i)break;r+=n.decode(s,{stream:!0});let c=r.split(`
`);r=c.pop()??"";for(let l of c){if(!l.startsWith("data:"))continue;let u=l.slice(5).trim();u&&u!=="[DONE]"&&Wa(qe(u),t)}}}async function Xa(e,t,o){let n={conversationId:t,error:!1};Qn.set(e,t),R.emit("generate-start",{requestId:e,conversationId:t});let r=!1;try{let i=await o;i.ok?i.headers.get("content-type")?.includes("event-stream")&&await Ya(i.clone(),n):n.error=!0}catch(i){r=i instanceof DOMException&&i.name==="AbortError",n.error||=!r}finally{Qn.delete(e),R.emit("generate-end",{requestId:e,conversationId:n.conversationId,error:n.error,aborted:r})}}async function Ja(e,t){try{let o=await t;if(!o.ok)return;let n=Fa(e,await o.clone().json());n&&R.emit("conversation",n)}catch(o){tr.debug("Conversation read skipped",o)}}function Za(e,t,o){let n=Ka(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&Ga.test(n.pathname)){Xa(Ua++,Va(t),o);return}let i=r==="GET"&&n.pathname.match(za)?.[1];i&&Ja(i,o)}var er=!1;function nr(){if(er)return;er=!0;let e=W.fetch,t=function(o,n){let r=e.call(this??W,o,n);try{Za(o,n,r)}catch(i){tr.error("Fetch tap failed",i)}return r};W.fetch=typeof exportFunction=="function"?exportFunction(t,W):t}var Qa=new S("Route"),rr=/\/c\/([\w-]+)/;var es=500,Io=e=>{try{return new URL(e,location.origin).pathname.match(rr)?.[1]??null}catch{return null}},y=()=>location.pathname.match(rr)?.[1]??null,ge=()=>location.pathname==="/";var Dt=new Set,Bt=location.href,Ro=y(),It;function Oo(){if(location.href===Bt)return;let e={prevHref:Bt,href:location.href,prevId:Ro,id:y()};Bt=e.href,Ro=e.id;for(let t of Dt)try{t(e)}catch(o){Qa.error("Route listener failed",o)}}function ts(){let e=new AbortController,{navigation:t}=W;t?.addEventListener("currententrychange",()=>queueMicrotask(Oo),{signal:e.signal}),addEventListener("popstate",Oo,{signal:e.signal});let o=setInterval(Oo,es);return()=>{e.abort(),clearInterval(o)}}function re(e){return Dt.add(e),It||(Bt=location.href,Ro=y(),It=ts()),()=>{Dt.delete(e),!Dt.size&&(It?.(),It=void 0)}}var os=250,ns=400,rs=6e4,x=At(),Ht=new Set,Bo=new Set,ee=!1,ar=0,ie,Ve=!1,Do=!1,Pe=null,ir=!1,N=()=>({generating:ee,conversationId:y()});function sr(){let e=Ao();return e||(Do=!1),[...Ht].some(t=>!Bo.has(t))||e&&!Do}function is(){return Pe?.error?"error":Ve||Pe?.aborted?"stopped":"done"}function as(){ie=void 0,!(!ee||sr())&&(ee=!1,x.emit("fall",{conversationId:y(),outcome:is()}),Ve=!1,Pe=null)}function Nt(){let e=sr();e&&!ee&&(ee=!0,ar=Date.now(),Ve=!1,Pe=null,x.emit("rise",{conversationId:y()})),e&&ie&&(clearTimeout(ie),ie=void 0),!e&&ee&&!ie&&(ie=setTimeout(as,ns)),x.emit("tick",N())}function ss({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(ee||Date.now()-ar<rs);if(!o&&ee){for(let n of Ht)Bo.add(n);Do=Ao(),clearTimeout(ie),ie=void 0,ee=!1,Ve=!1,Pe=null,x.emit("fall",{conversationId:e,outcome:"left"})}x.emit("context",{prevId:e,id:t,migrated:o}),Nt()}function ls(e){e.target instanceof Element&&e.target.closest(d.stopButton)&&(Ve=!0)}function lr(){ir||(ir=!0,R.on("generate-start",({requestId:e})=>{Ht.add(e),Nt()}),R.on("generate-end",e=>{Ht.delete(e.requestId),!Bo.delete(e.requestId)&&(Pe=e,Nt())}),re(ss),document.addEventListener("click",ls,!0),setInterval(Nt,os))}var cs="main, nav, [data-app-action-sidebar-scroll], [data-app-navigation-rail]";function We(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var cr=()=>new Promise(e=>{typeof requestIdleCallback=="function"?requestIdleCallback(()=>e(),{timeout:1500}):setTimeout(e,100)});async function ds(){for(;!document.querySelector(cs);)await new Promise(e=>setTimeout(e,100));await cr(),await cr()}async function dr(){await We(),await Promise.race([ds(),new Promise(e=>setTimeout(e,8e3))])}var ur={BetterNavigator:1790616549e3,ChatListStatus:1790616549e3,ChatStateFavicons:1790616549e3,Cleaner:1790616549e3,ComposerOpacity:1790616549e3,CustomSidebarIdentity:1790616549e3,GreetingCustomizer:1790616549e3,InputHistory:1790616549e3,MessageTimestamps:1790616549e3,NoDictation:1790616549e3,NoShareLink:1790616549e3,NoSidebarIdentity:1790616549e3,PromptQueue:1790616549e3,RecentTopics:1790616549e3,ResponseNotification:1790616549e3,Settings:1790616549e3,StreamerMode:1790616549e3,WiderChat:1790616549e3};var g=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,us="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",ms={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${us}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:g('<path d="M18 6 6 18M6 6l12 12"/>'),gear:g('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:g('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:g('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:g('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:g('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:g('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:g('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:g('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:g('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:g('<path d="m6 9 6 6 6-6"/>'),play:g('<path d="M7 4v16l13-8z"/>'),plus:g('<path d="M12 5v14M5 12h14"/>'),check:g('<path d="m5 12 5 5 9-10"/>'),alert:g('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:g('<path d="M4 5h16v11H9l-5 4z"/>'),layout:g('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:g('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:g('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:g('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:g('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:g('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:g('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:g('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:g('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:g('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:g('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:g('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:g('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:g('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:g('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),grip:g('<path d="M9 6h0M15 6h0M9 12h0M15 12h0M9 18h0M15 18h0"/>')},I=e=>Wn(ms[e]);var ps=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,mr=/\S+@\S+\.\S+/,fs=3,gs=/^\/g\/(g-p-[^/]+)\//,bs=/^g-p-[0-9a-f]+-?/i,No=e=>!!e?.querySelector(d.menuButton);function pr(){return[...document.querySelectorAll(d.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(No)).filter(e=>e!=null)}function fr(){let e=[...document.querySelectorAll(d.oldProfile)];if(e.length)return e.map(o=>({kind:"profile",anchor:o,insert:n=>{(o.parentElement?.children.length===1?o.parentElement:o).before(n)}}));let t=pr().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(d.rail)){let n=[...o.children].find(No);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}function gr(){let e=[...document.querySelectorAll(d.oldProfile)];return e.length?e:[...pr(),...[...document.querySelectorAll(d.rail)].map(o=>[...o.children].findLast(No))].map(o=>[...o?.querySelectorAll(d.menuButton)??[]].findLast(n=>n.querySelector("img")||br(n).length)).filter(o=>o!=null)}function br(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!G(t.textContent??"")&&!(t instanceof SVGElement))}var hs=e=>{let t=getComputedStyle(e);return t.borderRadius.includes("%")||Number.parseFloat(t.borderRadius)>=e.clientWidth/2||/rounded-full/.test(e.getAttribute("class")??"")};function Ye(e,t){e&&!e.hasAttribute(t)&&e.setAttribute(t,"")}function ys(e){if(G(e.textContent??"").length>fs)return null;for(let t=e;t&&t!==e.closest("button");t=t.parentElement)if(hs(t))return t;return null}function Ho(e,t){Ye(e,`data-bloom-${t}`);let o=e.querySelector("img:not([data-bloom] img)"),n=br(e),r=o?null:n.map(ys).find(b=>b!=null),i=o?.closest("[class*=rounded-full]"),s=i&&i!==e&&e.contains(i)?i:o??r;Ye(s,`data-bloom-${t}-avatar`);let c=n.filter(b=>!s?.contains(b)),l=c.find(b=>ps.test(G(b.textContent??""))),u=c.find(b=>mr.test(b.textContent??""));Ye(l,`data-bloom-${t}-plan`),Ye(u,`data-bloom-${t}-email`),Ye(c.find(b=>b!==l&&b!==u),`data-bloom-${t}-name`)}function _t(){return[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&(mr.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var Xe=e=>[...document.querySelectorAll(d.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&Io(t.href)===e);function hr(e){let t=Xe(e).find(o=>G(o.textContent??""));return t?G(t.textContent??""):null}function yr(e){let t=new URL(e,location.origin).pathname.match(gs)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!Io(n.href)&&G(n.textContent??""));return o?G(o.textContent??""):t.replace(bs,"").replaceAll("-"," ")||null}function _o(e,t,o){let n=a("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o}});return n.addEventListener("click",r=>{r.stopPropagation();let i=n.getAttribute("aria-checked")!=="true";n.setAttribute("aria-checked",String(i)),t(i)}),n}function H(e,t,o){return a("button",{class:xt("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button"},on:{click:t}})}function _(e,t,o,n){let r=a("button",{class:"bloom-icon-button",title:t,attrs:{type:"button","aria-label":t},on:{click:o}},I(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function $t(e,t,o,n,r,i){let s=a("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});s.value=String(e);let c=a("output",{text:`${e}${r}`});return s.addEventListener("input",()=>{c.textContent=`${s.value}${r}`,i(Number(s.value))}),a("div",{class:"bloom-slider"},s,c)}function $o(e,t,o){let n=a("select",{class:"bloom-select"},...t.map(r=>a("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function Je(e,t,o="",n="text"){let r=a("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var vs=new S("SettingsPanel"),m=E("bloom-settings-"),xs=10080*60*1e3,Ss=3e3,vr="Toggle features. Some need a reload. Click the sliders icon to configure.",ws=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Es=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],Ts={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},xr=new Set(["chat","ui","privacy"]),D=null,ke="all",qo="all",qt="",Go=[],Sr=()=>[...pe.values()].filter(e=>!e.hidden),Ms=e=>!!e.updatedAt&&Date.now()-e.updatedAt<xs;function Cs(e){switch(ke){case"favorites":return Mt.has(e.name);case"recent":return Ms(e);case"all":return!0;case"other":return!e.tags.some(t=>xr.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(ke)}}function Ls(e){switch(qo){case"all":return!0;case"enabled":return Ue(e);case"disabled":return!Ue(e)}}function As(e){let t=qt.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function Ps(e){let t=Tt.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return ke==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var wr=e=>e.settings?.def??{},ks=e=>Object.values(wr(e)).some(t=>t.type!=="custom");function Os(e,t,o){let n=ue(e.name,t)??Eo(o),r=i=>me(e.name,t,i);switch(o.type){case"boolean":return _o(n,r,o.description??t);case"slider":return $t(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return $o(n,o.options,r);case"string":return Je(n,r,o.placeholder);case"number":return Je(String(n),i=>r(Number(i)),"","number");case"component":{let i=a("div",{class:m("component")});return Go.push(o.render(i)),i}case"custom":return null}}var Rs=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function Er(e){if(!D)return;let t=Object.entries(wr(e)).filter(([,i])=>i.type!=="custom").map(([i,s])=>{let c=Os(e,i,s),l=s.type==="boolean";return a("div",{class:m("field",l?"field-inline":"field-stacked")},a("div",{class:m("field-text")},s.type!=="component"&&a("div",{class:m("field-label"),text:Rs(i)}),s.description&&a("div",{class:m("field-desc"),text:s.description})),c)}),o,n=H("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},Ss);return}clearTimeout(o),e.settings?.reset(),Ze(),Er(e)},"danger"),r=a("div",{class:m("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&Ze()}},a("div",{class:m("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},a("div",{class:m("popup-header")},a("div",{class:m("card-icon")},I(e.icon)),a("div",{class:m("popup-title")},a("div",{class:m("card-name"),text:e.name}),a("div",{class:m("popup-authors"),text:e.authors.join(", ")})),_("close","Close",Ze)),a("p",{class:m("popup-desc"),text:e.description}),a("div",{class:m("fields")},...t),a("div",{class:m("popup-footer")},n)));D.querySelector(`.${m("modal")}`)?.append(r)}function Ze(){for(let e of Go)e();Go=[],D?.querySelector(`.${m("popup-backdrop")}`)?.remove()}function Is(e){let t=Ue(e),o=Mt.has(e.name),n=Tt.has(e.name);return a("div",{class:m("card",t?"card-on":"card-off")},a("div",{class:m("card-top")},a("div",{class:m("card-icon")},I(e.icon)),a("div",{class:m("card-actions")},_("star",o?"Unstar":"Star",()=>{Mt.toggle(e.name),be()},o),_("pin",n?"Unpin":"Pin to top",()=>{Tt.toggle(e.name),be()},n),ks(e)&&_("gear","Settings",()=>Er(e)),e.required?null:_o(t,r=>jn(e,r),`Enable ${e.name}`))),a("div",{class:m("card-name"),text:e.name}),a("div",{class:m("card-desc"),text:e.description,title:e.description}),a("div",{class:m("card-footer"),text:e.authors.join(", ")}))}function Tr(){let e=Sr().some(o=>!o.tags.some(n=>xr.has(n)));D?.querySelector(`.${m("tabs")}`)?.replaceChildren(...ws.filter(o=>o.id!=="other"||e).map(o=>a("button",{class:m("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===ke)},on:{click:()=>{ke=o.id,Tr(),be()}}})))}function be(){if(!D)return;let e=Sr().filter(Cs),t=D.querySelector(`.${m("search")} input`);t&&(t.placeholder=`Search ${yt(e.length,"plugin")}...`);let o=Ps(e.filter(i=>As(i)&&Ls(i))),n=D.querySelector(`.${m("grid")}`),r=qt.trim()?"No plugins match your search.":Ts[ke]??"No plugins available.";n?.replaceChildren(...o.length?o.map(Is):[a("div",{class:m("empty"),text:r})])}function Ds(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),D?.querySelector(`.${m("popup-backdrop")}`)?Ze():Oe())}var Mr,zo;function Bs(){if(D)return;let e=a("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=qt,e.addEventListener("input",()=>{qt=e.value,be()}),D=a("div",{class:`bloom-root ${m("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&Oe()}},a("div",{class:m("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},a("div",{class:m("header")},a("div",{class:m("logo")},I("bloom")),a("h2",{class:m("title"),text:"Bloom++"}),a("span",{class:m("hint"),title:vr,attrs:{"aria-label":vr,tabindex:"0"}},I("info")),a("span",{class:m("version"),text:"v2.0.0"}),_("close","Close",Oe)),a("div",{class:m("tabs"),attrs:{role:"tablist"}}),a("div",{class:m("toolbar")},a("label",{class:m("search")},I("search"),e),$o(qo,Es,t=>{qo=t,be()})),a("div",{class:m("grid")}))),D.addEventListener("keydown",t=>t.stopPropagation()),zo=new AbortController,document.addEventListener("keydown",Ds,{capture:!0,signal:zo.signal}),document.body.append(D),Tr(),be(),Mr=Fn(be),e.focus(),vs.debug("Opened")}function Oe(){Ze(),zo?.abort(),Mr?.(),D?.remove(),D=null}var Gt=()=>D?Oe():Bs();var Cr=`/*
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
`;var Qe=E("bloom-entry-"),Re=new Map,Lr=!1,Ar;function Hs(e){let t=a("button",{class:Qe("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:o=>{o.preventDefault(),o.stopPropagation(),Gt()}}},I("bloom"),e!=="rail"&&a("span",{class:Qe("label"),text:"Bloom++"}));return a("div",{class:`bloom-root ${Qe("wrap")} ${Qe(e)}`,attrs:{"data-bloom":"entry"}},t)}function _s(e){let t=a("div",{class:`bloom-root ${Qe("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),Gt()}}},I("bloom"),a("span",{text:"Bloom++"})),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function $s(){let e=fr();for(let[o,n]of Re)o.isConnected&&e.some(r=>r.anchor===o)||(n.remove(),Re.delete(o));for(let o of e){let n=Re.get(o.anchor);if(n?.isConnected)continue;let r=n??Hs(o.kind);Re.set(o.anchor,r),o.insert(r)}let t=_t();t&&!t.querySelector('[data-bloom="menu-entry"]')&&_s(t)}var Pr=p({name:"Settings",description:"Bloom++ settings panel and its sidebar entry.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,hidden:!0,startAt:"HostReady",styles:Cr,start(){Ar=B($s),!Lr&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",Gt),Lr=!0)},stop(){Ar?.();for(let e of Re.values())e.remove();Re.clear(),Oe()}});var kr='[aria-busy="true"], .result-streaming',qs=["data-turn","data-message-author-role"],Uo=e=>e==="user"||e==="assistant";function jo(){let e=document.querySelector(d.timelineScroll);if(e)return e;let t=document.querySelector(d.turn);for(let o=t?.parentElement;o;o=o.parentElement){let{overflowY:n}=getComputedStyle(o);if((n==="auto"||n==="scroll")&&o.scrollHeight>o.clientHeight)return o}return document.scrollingElement}var Rr=()=>document.querySelector(d.conversationTarget)??document.querySelector(d.oldThread);function zt(e){return e.getAttribute("data-chatgpt-search-message-ids")?.split(/\s+/).filter(Boolean)??[e.getAttribute("data-message-id")].filter(t=>t!=null)}function Fo(e=document){return[...e.querySelectorAll(`${d.messageUnit}, ${d.oldMessage}`)].filter(t=>!t.parentElement?.closest(`${d.messageUnit}, ${d.oldMessage}`))}function Gs(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function zs(e){for(let t of qs){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(Uo(o))return o}return e.querySelector(d.markdown)||e.querySelector(d.generatedImage)?"assistant":null}var Us=e=>!e.parentElement?.closest(d.turn);function Ut(){let e=K(y())?.chain??[],t=[...document.querySelectorAll(d.turn)].filter(Us),{generating:o}=N();return t.map((n,r)=>{let i=Fo(n).flatMap(zt),s=zs(n)??Gs(i,e)??(r%2?"assistant":"user"),c=s==="assistant"&&(n.matches(kr)||!!n.querySelector(kr)||o&&r===t.length-1);return{el:n,role:s,messageIds:i,streaming:c}})}var js=/^(?:\d+\s+sources?|web search|searched|thought for|reasoned|thinking)\b/i,Or=new WeakMap;function jt(e){let t=e.el.textContent?.length??0,o=Or.get(e.el);if(o?.length===t)return o.summary;let n=Fs(e);return Or.set(e.el,{length:t,summary:n}),n}function Fs(e){let t=e.el.querySelectorAll(d.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.querySelector(e.role==="assistant"?d.markdown:".whitespace-pre-wrap")??e.el,n=(o.innerText||o.textContent||"").split(`
`).map(G).filter(r=>r&&!js.test(r));return n.length?n.join(" "):e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function Ft(e){return e.text?G(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var Ir=`/*
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
`;var A=E("bloom-nav-"),qr=80,Vs=1200,Ws=2,Ys=40,Xs=.3,Dr=12,Js={user:"\u2753",assistant:"\u{1F916}"},Wt=f({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the outline too.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),k=null,$=[],Ie=-1,Kt="",Br=0,Nr=[],et=null,Vt;function Gr(){let e=Ut().map(s=>({role:s.role,summary:jt(s),ids:s.messageIds,turn:s,streaming:s.streaming})),t=K(y())?.chain??[];if(!t.length)return e;let o=new Set(t.map(s=>s.id)),n=new Map(e.flatMap(s=>s.ids.map(c=>[c,s]))),r=new Set,i=[];for(let s of t){let c=n.get(s.id);c&&r.has(c)||(c&&r.add(c),i.push(c??{role:s.role,summary:Ft(s),ids:[s.id],turn:null,streaming:!1}))}return[...i,...e.filter(s=>!s.ids.some(c=>o.has(c)))]}function Zs(e){let t=e.getBoundingClientRect(),o=t.top+t.height*Xs,n=-1;return $.forEach((r,i)=>{let s=r.turn?.el.getBoundingClientRect();s&&s.top<=o&&(n=i)}),n===-1?$.findIndex(r=>r.turn):n}function Hr(e){Wt.store.jumpEffect==="border"&&(e.classList.add(A("flash")),setTimeout(()=>e.classList.remove(A("flash")),Vs))}function Ko(e){let t=$[e],o=jo();if(!t||!o)return;let n=t.turn?.el;if(n?.isConnected){let u=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:u<o.clientHeight*Ws?"smooth":"auto"}),Hr(n);return}let r=$.map((u,b)=>u.turn?b:-1).filter(u=>u>=0),i=r.length&&e<r[0]?-1:1,s=++Br,c=0,l=()=>{if(s!==Br||c++>Ys)return;$=Gr();let u=$.find(b=>b.ids.some(M=>t.ids.includes(M)))?.turn?.el;if(u){u.scrollIntoView({block:"start"}),Hr(u);return}o.scrollBy({top:i*o.clientHeight*.9}),requestAnimationFrame(l)};l()}function Qs(e,t){return a("button",{class:A("row"),attrs:{type:"button","data-index":String(t)},on:{click:()=>Ko(t)}},a("span",{text:Js[e.role]}),a("span",{class:"bloom-truncate",text:we(e.summary||"\u2026",qr)}))}function el(){let e=jo(),t=Rr()??e;if($=Gr(),!$.length||!e||!t){k?.remove(),k=null,Kt="";return}et!==e&&(Vt?.abort(),Vt=new AbortController,e.addEventListener("scroll",Le(_r),{passive:!0,signal:Vt.signal}),et=e),k??=a("div",{class:`bloom-root ${A("root")}`,attrs:{"data-bloom":"navigator"}},a("div",{class:A("rail")}),a("div",{class:A("toc")},a("div",{class:A("toc-head")}),a("div",{class:A("toc-list")}))),k.isConnected||document.body.append(k);let o=t.getBoundingClientRect(),n=e.getBoundingClientRect();k.style.left=`${Math.min(o.right+Dr,n.right-Dr*2)}px`,k.style.top=`${n.top+n.height/2}px`;let r=JSON.stringify([Wt.store.showAssistant,$.map(i=>[i.role,i.summary,i.streaming])]);r!==Kt&&(Kt=r,tl()),_r()}function _r(){if(!k||!et)return;Ie=Zs(et),k.querySelectorAll(`.${A("tick")}`).forEach((t,o)=>t.classList.toggle(A("tick-current"),o===Ie)),k.querySelectorAll(`.${A("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===Ie)));let e=k.querySelector(`.${A("toc-head")}`);e&&(e.textContent=`${Ie+1} / ${$.length}`)}function tl(){k?.querySelector(`.${A("rail")}`)?.replaceChildren(...$.map((t,o)=>a("button",{class:xt(A("tick"),A(`tick-${t.role}`),t.streaming&&A("tick-streaming")),title:we(t.summary,qr),attrs:{type:"button","aria-label":`Jump to message ${o+1}`},on:{click:()=>Ko(o)}})));let e=$.map((t,o)=>({entry:t,index:o})).filter(({entry:t})=>Wt.store.showAssistant||t.role==="user");k?.querySelector(`.${A("toc-list")}`)?.replaceChildren(...e.map(({entry:t,index:o})=>Qs(t,o)))}var ae=Le(el),ol=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function $r(e){if(!k||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||ol(document.activeElement)||document.querySelector("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:Ie-1,ArrowDown:Ie+1,Home:0,End:$.length-1}[e.key];o==null||o<0||o>=$.length||(e.preventDefault(),e.stopPropagation(),Ko(o))}var zr=p({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:Wt,styles:Ir,start(){Nr=[B(e=>F(e)&&ae()),re(ae),R.on("conversation",ae),x.on("rise",ae),x.on("fall",ae)],addEventListener("keydown",$r,!0),addEventListener("resize",ae,{passive:!0})},stop(){for(let e of Nr)e();Vt?.abort(),et=null,removeEventListener("keydown",$r,!0),removeEventListener("resize",ae),k?.remove(),k=null,Kt=""},onSettingsChange:ae});var Ur=`/*
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
`;var rl=E("bloom-cls"),il="bloom-cls",al=600*1e3,Wo=Cn("tab"),Be=new Map,ot=new Map,De=null,jr=[],sl=e=>e==="streaming"||e==="error";function ll(){let e=new Map,t=Date.now();for(let[o,n]of ot)t-n.at>al?ot.delete(o):e.set(o,n.status);for(let[o,n]of Be)e.set(o,n);return e}function cl(e){return a("span",{class:`bloom-root ${rl("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&I("alert"))}function tt(){let e=ll(),t=new Set;for(let[o,n]of e)for(let r of Xe(o)){let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let s=cl(n);t.add(s),r.append(s)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function Yt(e,t){e&&(t?Be.set(e,t):Be.delete(e),De?.postMessage({tab:Wo,id:e,status:t}),tt())}function dl({data:e}){!C(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===Wo||(sl(e.status)?ot.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):ot.delete(e.id),tt())}function Vo(){for(let e of Be.keys())De?.postMessage({tab:Wo,id:e,status:null})}var Fr=p({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,styles:Ur,start(){De=typeof BroadcastChannel=="function"?new BroadcastChannel(il):null,De?.addEventListener("message",dl),addEventListener("pagehide",Vo),jr=[x.on("rise",({conversationId:e})=>Yt(e,"streaming")),x.on("fall",({conversationId:e,outcome:t})=>Yt(e,t==="error"?"error":null)),x.on("context",({prevId:e,id:t,migrated:o})=>{o&&N().generating?Yt(t,"streaming"):!o&&Be.get(e??"")==="streaming"&&Yt(e,null)}),B(e=>F(e)&&tt())],y()&&tt()},stop(){for(let e of jr)e();Vo(),De?.close(),De=null,removeEventListener("pagehide",Vo),Be.clear(),ot.clear(),tt()}});var Vr=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],Zt={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},ul={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},ml="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Yo=32,Qt=64,Xo="#FCFCFC",Jo="#111111",pl=14,eo=51.5,fl=12.5,gl=9.75,Kr=52,bl=10.5,hl=7.75,yl={rotate:e=>e.arc(eo,eo,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function Xt(e){let t=document.createElement("canvas");t.width=t.height=Yo;let o=t.getContext("2d");return o?(o.scale(Yo/Qt,Yo/Qt),e(o),t.toDataURL("image/png")):""}function Jt(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D(ml);o&&(e.strokeStyle=Jo,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function to(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function vl(e,t){to(e,eo,fl,Jo),to(e,eo,gl,Zt[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),yl[t](e),e.stroke()}function xl(e,t){e.beginPath(),e.roundRect(0,0,Qt,Qt,pl),e.fillStyle=t,e.fill()}var Sl=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function Wr(e,t){switch(e){case"original":return Sl(ul[t]);case"hole":return Xt(o=>Jt(o,Zt[t],!0));case"bg":return Xt(o=>{xl(o,Zt[t]),Jt(o,Xo,!1)});case"dot":return Xt(o=>{Jt(o,Xo,!0),to(o,Kr,bl,Jo),to(o,Kr,hl,Zt[t])});case"badge":return Xt(o=>{Jt(o,Xo,!0),vl(o,t)})}}var rt="bloom-chat-state-favicon",it="data-bloom-rel",en="data-bloom-media",Yr="bloom-parked-icon",wl="/favicon.ico",Jr=f({style:{type:"select",description:"How the tab icon shows the chat state.",options:Vr,default:"bg"}}),se=null,Zr="",oo=null,Qr="",Xr=new Map,tn,Zo=[],ei=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${it}]`)];function on(){for(let e of ei())e.id!==rt&&(e.hasAttribute(it)||(Qr||=e.href,e.setAttribute(it,e.rel),e.setAttribute(en,e.getAttribute("media")??"")),e.rel!==Yr&&(e.rel=Yr),e.media!=="not all"&&(e.media="not all"))}function El(){for(let e of ei()){let t=e.getAttribute(it);if(t==null)continue;e.rel=t;let o=e.getAttribute(en);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(it),e.removeAttribute(en)}}function ti(){let e=document.getElementById(rt);return e||(e=document.createElement("link"),e.id=rt,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function Tl(e){if(e==="wait")return Qr||wl;let t=Jr.store.style,o=`${t}:${e}`,n=Xr.get(o);return n||Xr.set(o,n=Wr(t,e)),n}function Qo(e){if(e)return"rotate";let t=z();return se&&t&&t!==Zr&&(se=null),se==="error"?"error":se==="done"?"done":t?"ready":"wait"}function nt(e,t=!1){if(e===oo&&!t)return;oo=e;let o=ti(),n=Tl(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function Ml(){tn=new MutationObserver(()=>{on(),document.head.lastElementChild?.id!==rt&&ti()}),tn.observe(document.head,{childList:!0})}var oi=p({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"DOMContentLoaded",settings:Jr,start(){on(),nt(Qo(N().generating),!0),Ml(),Zo=[x.on("rise",()=>{se=null,nt("rotate")}),x.on("fall",({outcome:e})=>{se=e==="done"||e==="error"?e:null,Zr=z(),nt(Qo(!1))}),x.on("context",({migrated:e})=>{e||(se=null)}),x.on("tick",({generating:e})=>{on(),nt(Qo(e))})]},stop(){for(let e of Zo)e();Zo=[],tn?.disconnect(),document.getElementById(rt)?.remove(),El(),oo=null,se=null},onSettingsChange(){nt(oo??"wait",!0)}});var Cl={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]'],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])']},ni=f({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0}}),ri=p({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos and ads.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:ni,styles:()=>Te(Object.entries(Cl).flatMap(([e,t])=>ni.store[e]?t:[]))});var nn=`form:has(${d.composerInput}), ${d.oldComposerForm}`,Ll=`:is(${nn}) :is([class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"])`,Al='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',Pl='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',kl="var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, #fff)))",ii=f({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function Ol(){let{opacity:e,blur:t}=ii.store;return e>=100?"":`:is(${Al}), :is(${nn}){background-color:transparent!important;background-image:none!important;box-shadow:none!important}:is(${Pl}){display:none!important}${Ll}{background-color:color-mix(in srgb, ${kl} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important}:is(${nn}) :is(${d.composerInput}){background-color:transparent!important}`}var ai=p({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:ii,styles:Ol});var rn=0,no;function Rl(e){if(!F(e))return;for(let o of gr())Ho(o,"profile");let t=_t();t&&Ho(t,"menu")}function Ne(){rn++;let e=!0;return We().then(()=>{e&&rn&&!no&&(no=B(Rl))}),()=>{e&&(e=!1,!--rn&&(no?.(),no=void 0))}}var te=E("bloom-csi-"),Il=256,Dl=160,ro=1,si=4,Bl=.1,Nl=.0015,Hl=250;function li(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function _l(e){return new Promise((t,o)=>{let n=new Image;n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function $l(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:ht(t.x,n,1-n),y:ht(t.y,r,1-r)}}function ci(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function ql(e,t){let o=a("canvas");return o.width=o.height=Il,ci(o,e,t),o.toDataURL("image/png")}async function Gl(e){if(e.startsWith("data:image/"))return e;let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status}`);return li(await t.blob())}function di(e){let t=null,o={x:T.store.cropX,y:T.store.cropY,zoom:T.store.cropZoom},n,r=a("canvas",{class:te("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=Dl*devicePixelRatio;let i=a("div",{class:`bloom-muted ${te("status")}`}),s=a("div",{class:te("zoom")}),c=a("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(h,O=!0){t&&(o=$l(t,h),ci(r,t,o),O&&(clearTimeout(n),n=setTimeout(()=>{t&&(T.store.cropX=o.x,T.store.cropY=o.y,T.store.cropZoom=o.zoom,T.store.avatarUrl=ql(t,o))},Hl)))}function u(){s.replaceChildren($t(o.zoom,ro,si,Bl,"\xD7",h=>l({...o,zoom:h})))}async function b(h,O){i.textContent="";try{let ne=await Gl(h);t=await _l(ne),O&&(T.store.avatarSource=ne,o={x:.5,y:.5,zoom:ro}),e.classList.add(te("has-image")),u(),l(o,O)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let M=h=>{h?.type.startsWith("image/")&&li(h).then(O=>b(O,!0))};c.addEventListener("change",()=>M(c.files?.[0])),r.addEventListener("wheel",h=>{t&&(h.preventDefault(),l({...o,zoom:ht(o.zoom*(1-h.deltaY*Nl),ro,si)}),u())},{passive:!1}),r.addEventListener("pointerdown",h=>{if(!t)return;r.setPointerCapture(h.pointerId);let O={...o},ne=r.getBoundingClientRect(),gt=bt=>{if(!t)return;let j=Math.max(ne.width/t.naturalWidth,ne.height/t.naturalHeight)*o.zoom;l({...o,x:O.x-(bt.clientX-h.clientX)/(t.naturalWidth*j),y:O.y-(bt.clientY-h.clientY)/(t.naturalHeight*j)})};r.addEventListener("pointermove",gt),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",gt),{once:!0})});let Z=a("div",{class:te("cropper"),attrs:{tabindex:"0"},on:{paste:h=>M([...h.clipboardData?.files??[]].find(O=>O.type.startsWith("image/"))),dragover:h=>h.preventDefault(),drop:h=>{h.preventDefault(),M(h.dataTransfer?.files[0])}}},a("div",{class:te("stage")},r),a("div",{class:te("controls")},Je("",h=>h.trim()&&void b(h.trim(),!0),"https://\u2026 or data:image/\u2026","url"),a("div",{class:te("buttons")},H("Choose file",()=>c.click()),H("Reset crop",()=>{l({x:.5,y:.5,zoom:ro}),u()}),H("Clear",()=>{t=null,e.classList.remove(te("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),s.replaceChildren(),T.store.avatarUrl="",T.store.avatarSource=""},"danger")),s,i,c));return e.append(Z),T.store.avatarSource&&b(T.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var ui=`/*
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
`;var He="data-bloom-csi-avatar",Ul="data-bloom-csi-sized",gi="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",T=f({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>di(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),mi=[];function pi(e){return(T.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function fi(e=[]){if(!F(e))return;let t=T.store.displayName.trim()||null,o=!!T.store.avatarUrl,n=new Set(t?pi("name"):[]);for(let i of document.querySelectorAll(gi))n.has(i)||fe(i,null);for(let i of n)fe(i,t);let r=new Set(o?pi("avatar"):[]);for(let i of document.querySelectorAll(`[${He}]`))r.has(i)||i.removeAttribute(He);for(let i of r)i.hasAttribute(He)||i.setAttribute(He,""),i.toggleAttribute(Ul,!i.closest(`${d.rail}, ${d.oldRail}, [role="menu"]`))}function jl(){let e=T.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${T.store.avatarSize}px}`:""}var bi=p({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:T,styles:()=>`${jl()}
${ui}`,start(){mi=[Ne(),B(fi)]},stop(){for(let e of mi)e();for(let e of document.querySelectorAll(`[${He}]`))e.removeAttribute(He);for(let e of document.querySelectorAll(gi))fe(e,null)},onSettingsChange(){fi()}});var _e=E("bloom-greeting-"),hi=30,yi=100;function vi(e){let t=-1,o=a("textarea",{class:`bloom-input ${_e("input")}`,attrs:{maxlength:String(yi),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=H("Add",i),r=a("div",{class:_e("list")});function i(){let l=o.value.trim().slice(0,yi);if(!l)return;let u=[...w.store.greetings];t>=0?u[t]=l:u.length<hi&&u.push(l),w.store.greetings=u,t=-1,o.value="",s()}function s(){let{greetings:l}=w.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&l.length>=hi,r.replaceChildren(...l.length?l.map((u,b)=>a("div",{class:_e("row",b===t?"row-editing":"row-idle")},a("div",{class:_e("text"),text:u}),_("edit","Edit",()=>{t=b,o.value=u,o.focus(),s()}),_("trash","Delete",()=>{w.store.greetings=l.filter((M,Z)=>Z!==b),t===b&&(t=-1),s()}))):[a("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),e.append(a("div",{class:_e("editor")},r,a("div",{class:_e("form")},o,n))),s();let c=Me((l,u)=>l==="GreetingCustomizer"&&u==="greetings"&&s());return()=>{c(),e.replaceChildren()}}var xi=`/*
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
`;var ao="data-bloom-greeting",Kl=1e3,Vl=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],w=f({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>vi(e)},greetings:{type:"custom",default:Vl},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),io,Si=[],an,wi=()=>w.store.greetings.filter(e=>typeof e=="string"&&e.trim());function st(){let e=wi();if(e.length)if(w.store.order==="random"&&e.length>1){let t=w.store.lastRandom;for(;t===w.store.lastRandom;)t=Math.floor(Math.random()*e.length);w.store.lastRandom=t,w.store.index=t}else w.store.index=(w.store.index+1)%e.length}function Wl(){return ge()?Ce(d.homeHeading):null}function Ei(){for(let e of document.querySelectorAll(`[${ao}]`))e.removeAttribute(ao),fe(e,null)}function at(){let e=wi(),t=Wl();if(!t||!e.length){Ei();return}(w.store.index<0||w.store.index>=e.length)&&st(),t.setAttribute(ao,""),fe(t,e[Math.max(0,w.store.index)%e.length])}function sn(){clearInterval(io),io=void 0,w.store.mode==="interval"&&ge()&&(io=setInterval(()=>{st(),at()},w.store.intervalSec*Kl))}function Yl(e){w.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${ao}]`)||getSelection()?.toString()||(st(),at())}function Xl(){ge()&&w.store.mode==="refresh"&&st(),sn(),at()}var Ti=p({name:"GreetingCustomizer",description:"Replace the \u201CWhat can I help with?\u201D heading on the home page with your own lines.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:w,styles:xi,start(){an=new AbortController,document.addEventListener("click",Yl,{signal:an.signal}),ge()&&w.store.mode==="refresh"&&st(),sn(),Si=[B(e=>F(e)&&at()),re(Xl)]},stop(){an?.abort();for(let e of Si)e();clearInterval(io),Ei()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&sn(),at()}});var lt=E("bloom-history-"),ln=10,Jl=3e3;function Mi(e){let t="",o=0,n=new Set,r=a("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),i=a("div",{class:lt("list")}),s=a("div",{class:lt("pager")}),c,l=H("Clear all",()=>{if(!c){l.textContent="Click again to clear",c=setTimeout(()=>{c=void 0,l.textContent="Clear all"},Jl);return}clearTimeout(c),c=void 0,l.textContent="Clear all",ct([])},"danger");function u(){let M=[...he.store.entries].toReversed(),Z=t.trim().toLowerCase(),h=Z?M.filter(j=>j.toLowerCase().includes(Z)):M,O=Math.max(1,Math.ceil(h.length/ln));o=Math.min(o,O-1);let ne=h.slice(o*ln,(o+1)*ln).map(j=>a("div",{class:lt("row")},a("button",{class:lt("text",n.has(j)?"text-open":"text-closed"),text:j,title:n.has(j)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{n.delete(j)||n.add(j),u()}}}),_("copy","Copy",()=>void Ln(j)),_("trash","Delete",()=>ct(he.store.entries.filter(ba=>ba!==j)))));i.replaceChildren(...ne.length?ne:[a("div",{class:"bloom-muted",text:Z?"No matching prompts.":"No saved prompts yet."})]),s.replaceChildren(a("span",{class:"bloom-muted",text:`${h.length} saved \xB7 page ${o+1} of ${O}`}),H("Previous",()=>{o--,u()}),H("Next",()=>{o++,u()}),l);let[gt,bt]=s.querySelectorAll("button");gt.disabled=o===0,bt.disabled=o>=O-1,l.disabled=!M.length}r.addEventListener("input",()=>{t=r.value,o=0,u()}),e.append(a("div",{class:lt("manager")},r,i,s)),u();let b=Me((M,Z)=>M==="InputHistory"&&Z==="entries"&&u());return()=>{b(),clearTimeout(c),e.replaceChildren()}}var Ci=`/*
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
`;var Ql=E("bloom-history-"),ec=2e3,he=f({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>Mi(e)},entries:{type:"custom",default:[]}}),U=null,cn={text:"",at:0},ye=null,dn,so=()=>he.store.entries.filter(e=>typeof e=="string");function ct(e){he.store.entries=e.slice(-he.store.maxEntries)}function un(e){let t=e.trim();if(!t)return;let o=Date.now();t===cn.text&&o-cn.at<ec||(cn={text:t,at:o},ct([...so().filter(n=>n!==t),t]))}function tc(e,t){let o=Ae();if(!o)return;ye??=a("div",{class:`bloom-root ${Ql("hud")}`,attrs:{"data-bloom":"history-hud","aria-live":"polite"}}),ye.textContent=`${e+1} / ${t}`;let n=(o.closest("form")??o).getBoundingClientRect();ye.style.left=`${n.left+n.width/2}px`,ye.style.top=`${n.top}px`,ye.isConnected||document.body.append(ye)}function dt(){U=null,ye?.remove()}function oc(e){let t=so();if(!U)return;let o=t[e];U.index=e,U.shown=o,Q(o),tc(t.length-1-e,t.length)}function nc(e){let t=so();if(!t.length)return!1;if(!U){if(e===1)return!1;U={index:t.length,draft:z(),shown:""}}let o=U.index+e;return o<0?!0:o>=t.length?(Q(U.draft),dt(),!0):(oc(o),!0)}function rc(e){if(e.isComposing||!Ke(e.target))return;let t=e.target;if(e.key==="Enter"&&!e.shiftKey){un(z(t)),dt();return}if(e.key==="Escape"&&U){Q(U.draft),dt(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey)return;let o=Xn(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!U||nc(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function ic(e){U&&Ke(e.target)&&z(e.target)!==U.shown.trim()&&dt()}function ac(e){e.target instanceof Element&&e.target.closest(d.sendButton)&&un(z())}var Li=p({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:he,styles:Ci,start(){dn=new AbortController;let{signal:e}=dn;document.addEventListener("keydown",rc,{capture:!0,signal:e}),document.addEventListener("input",ic,{capture:!0,signal:e}),document.addEventListener("click",ac,{capture:!0,signal:e}),document.addEventListener("submit",()=>un(z()),{capture:!0,signal:e})},stop(){dn?.abort(),dt()},onSettingsChange(e){e==="maxEntries"&&ct(so())}});var Ai=`/*
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
`;var lc=1500,cc=5e3,dc=2e3,$e=f({showDate:{type:"boolean",description:"Show the date for messages not sent today.",default:!0},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),co=new Map,Oi=0,uo,Pi=[];function Ri(e,t){co.get(e)!==t&&(co.set(e,t),clearTimeout(uo),uo=setTimeout(Ii,dc))}function Ii(){let e={...$e.store.stamps,...Object.fromEntries(co)};$e.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,lc))}function uc(e){let t=K(y())?.times;for(let o=e.length-1;o>=0;o--){let n=co.get(e[o])??t?.get(e[o])??$e.store.stamps[e[o]];if(n)return n}return null}var mc=()=>N().generating||Date.now()-Oi<cc;function pc(e){let t=new Date(e),o=new Date,n={hour:"2-digit",minute:"2-digit"};if(!$e.store.showDate||t.toDateString()===o.toDateString())return t.toLocaleTimeString(void 0,n);let r=t.getFullYear()===o.getFullYear()?{}:{year:"numeric"};return t.toLocaleString(void 0,{...r,month:"short",day:"numeric",...n})}function ki(e){let t=e.getAttribute("data-message-author-role")??e.closest(d.turn)?.getAttribute("data-turn")??e.querySelector(d.authorRole)?.getAttribute("data-message-author-role");if(Uo(t))return t;let o=zt(e).at(-1);return K(y())?.chain.find(n=>n.id===o)?.role??null}function fc(e){let t=zt(e);if(!t.length||e.querySelector("time:not([data-bloom])"))return;let o=uc(t);!o&&mc()&&(o=Date.now(),Ri(t.at(-1),o));let n=e.querySelector(':scope > time[data-bloom="timestamp"]');if(!o||$e.store.hideOwnMessages&&ki(e)==="user"){n?.remove();return}let r=pc(o);if(n?.textContent===r)return;let i=a("time",{class:`bloom-timestamp bloom-timestamp-${ki(e)??"assistant"}`,text:r,title:new Date(o).toLocaleString(),attrs:{"data-bloom":"timestamp",datetime:new Date(o).toISOString()}});n?n.replaceWith(i):e.prepend(i)}var lo=Le(()=>{for(let e of Fo())fc(e)}),Di=p({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:$e,styles:Ai,start(){Pi=[B(e=>F(e)&&lo()),R.on("conversation",lo),R.on("message-time",({messageId:e,time:t})=>{Ri(e,t),lo()}),x.on("fall",()=>{Oi=Date.now()})]},stop(){for(let e of Pi)e();uo&&(clearTimeout(uo),Ii());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();lo()}}});var gc=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])'],bc=['[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],Bi=f({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),Ni=p({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:Bi,styles:()=>Te([...gc,...Bi.store.hideDictationSettings?bc:[]])});var hc=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],yc=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])'],mn=f({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),Hi=p({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:mn,styles:()=>Te([...mn.store.hideShareChat?hc:[],...mn.store.hideShareProject?yc:[]])});var _i='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',vc='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',xc="[data-bloom-profile-plan]",$i="visibility:hidden!important;user-select:none!important",Gi=f({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function Sc(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=Gi.store,r=[];return e&&r.push(n?`:is(${_i}){display:none!important}`:`:is(${_i}){${$i}}`),t&&r.push(`:is(${vc}){${$i}}`),e&&o&&r.push(`${xc}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var qi,zi=p({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Gi,styles:Sc,start(){qi=Ne()},stop(){qi?.()}});var Ui=`/*
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
`;var P=E("bloom-queue-"),Ec=6,Tc=8,q=null,ut="",mo=!1,ve=!1;function pn(e,t,o){let n=_(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute("title"),n.addEventListener("mouseenter",()=>ji(t)),n.addEventListener("mouseleave",()=>ji("")),n}function ji(e){let t=q?.querySelector(`.${P("tip")}`);t&&(t.textContent=e)}function Mc(e,t,o,n){ve=!0;let r=a("textarea",{class:`bloom-input ${P("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=s=>{ve=!1,ut="",s&&n.edit(t,r.value)};r.addEventListener("keydown",s=>{s.stopPropagation(),!s.isComposing&&(s.key==="Enter"&&!s.shiftKey?(s.preventDefault(),i(!0)):s.key==="Escape"&&(s.preventDefault(),i(!1)))}),r.addEventListener("blur",()=>ve&&i(!0),{once:!0}),e.querySelector(`.${P("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function Cc(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,s=l=>{!i&&Math.abs(l.clientY-n.clientY)<Ec||(i||(i=ve=!0,e.classList.add(P("dragging"))),e.style.transform=`translateY(${l.clientY-n.clientY}px)`)},c=l=>{if(removeEventListener("pointermove",s),!i)return;ve=!1,ut="";let b=[...r.children].filter(M=>M!==e).filter(M=>M.getBoundingClientRect().top+M.getBoundingClientRect().height/2<l.clientY).length;o.move(t,b)};addEventListener("pointermove",s),addEventListener("pointerup",c,{once:!0})})}function Lc(e,t,o){let n=a("li",{class:P("row")},a("div",{class:P("text"),text:e}),a("div",{class:P("actions")},pn("trash","Remove from queue",()=>o.remove(t)),pn("edit","Edit",()=>Mc(n,t,e,o)),pn("send","Send now",()=>o.sendNow(t))));return Cc(n,t,o),n}function Ac(e){if(!q)return;let t=e.getBoundingClientRect();q.style.left=`${t.left}px`,q.style.width=`${t.width}px`,q.style.bottom=`${innerHeight-t.top+Tc}px`}function fn(){q?.remove(),q=null,ut="",ve=!1}function po(e,t){let o=Lo();if(!e.length||!Fe(o)){fn();return}q||(q=a("div",{class:`bloom-root ${P("tray")}`,attrs:{"data-bloom":"queue"}},a("div",{class:P("header")},a("button",{class:P("toggle"),attrs:{type:"button"},on:{click:()=>{mo=!mo,q?.classList.toggle(P("collapsed"),mo)}}},a("span",{class:P("count")}),I("chevron")),a("span",{class:P("tip")})),a("ol",{class:P("list")})),q.classList.toggle(P("collapsed"),mo),document.body.append(q)),Ac(o);let n=JSON.stringify(e);if(ve||n===ut)return;ut=n;let r=q.querySelector(`.${P("count")}`);r&&(r.textContent=yt(e.length,"Queued message")),q.querySelector(`.${P("list")}`)?.replaceChildren(...e.map((i,s)=>Lc(i,s,t)))}var Pc=8,kc=150,Oc=20,Vi=f({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1}}),le=new Map,fo=!1,xe=null,gn,Fi=[],bn=()=>y()??`draft:${location.pathname}`,V=()=>le.get(bn())??[];function Se(e){e.length?le.set(bn(),e):le.delete(bn()),po(V(),hn)}function go(e,t=0){if(N().generating||z()){t<Oc&&setTimeout(()=>go(e,t+1),kc);return}Q(e),Co(()=>{Zn()||Q("")})}function Ki(){if(xe!=null){let o=xe;xe=null,go(o);return}if(!fo||N().generating||z())return;let[e,...t]=V();e!=null&&(fo=!1,Se(t),go(e))}function Wi(e){let t=V(),o=t[e];if(o!=null){if(Se(t.filter((n,r)=>r!==e)),!N().generating){go(o);return}xe=o,Ot()?.click()}}var hn={remove:e=>Se(V().filter((t,o)=>o!==e)),edit:(e,t)=>Se(t.trim()?V().map((o,n)=>n===e?t:o):V().filter((o,n)=>n!==e)),sendNow:Wi,move(e,t){let o=[...V()],[n]=o.splice(e,1);o.splice(t,0,n),Se(o)}};function Rc(e){let t=V();return Vi.store.replacePending&&t.length?(Se([...t.slice(0,-1),e]),!0):t.length>=Pc?!1:(Se([...t,e]),!0)}function Ic(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!Ke(e.target)||!N().generating)return;let t=z(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;Q(""),xe=t,Ot()?.click();return}if(!t){V().length&&Wi(0);return}Rc(t)&&Q("")}var Yi=p({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:Vi,styles:Ui,start(){gn=new AbortController,document.addEventListener("keydown",Ic,{capture:!0,signal:gn.signal}),Fi=[x.on("fall",({outcome:e})=>{fo=e==="done",e==="left"&&(xe=null),Ki()}),x.on("context",({prevId:e,id:t,migrated:o})=>{let n=[...le.keys()].find(r=>r.startsWith("draft:"));o&&!e&&t&&n&&(le.set(t,le.get(n)??[]),le.delete(n)),o||(fo=!1),po(V(),hn)}),x.on("tick",()=>{Ki(),po(V(),hn)})]},stop(){gn?.abort();for(let e of Fi)e();fn(),le.clear(),xe=null}});var Dc=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function Bc(){let e=G(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!Dc.has(e.toLowerCase())?e:null}function mt(e){return e?K(e)?.title??hr(e)??(e===y()?Bc():null):null}var Xi=`/*
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
`;var oe=E("bloom-recent-"),ce="home",Hc=50,Ji=140,_c=new Set(["Backquote"]),$c=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),v=f({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),de=null,X=[],J=0,yn,Zi=[],ho=()=>y()??(ge()?ce:null);function Qi(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function ta(e){let t=mt(e);t&&v.store.titles[e]!==t&&(v.store.titles={...v.store.titles,[e]:t});let o=yr(location.href);o&&e===y()&&v.store.projects[e]!==o&&(v.store.projects={...v.store.projects,[e]:o})}function ea(e){if(!e)return;let t=[e,...v.store.visits.filter(n=>n!==e)].slice(0,Hc),o=new Set(t);v.store.visits=t,Object.keys(v.store.previews).some(n=>!o.has(n))&&(v.store.previews=Qi(v.store.previews,o)),Object.keys(v.store.titles).some(n=>!o.has(n))&&(v.store.titles=Qi(v.store.titles,o)),e!==ce&&ta(e)}function vn(e){if(!e)return;let t={},o=K(e)?.chain??[];for(let r of o)t[r.role]=we(Ft(r),Ji);if(e===y())for(let r of Ut()){let i=jt(r);i&&(t[r.role]=we(i,Ji))}let n=v.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(v.store.previews={...v.store.previews,[e]:t})}function qc(){let e=Number(v.store.maxRecent);return v.store.visits.filter(t=>t!==ce||v.store.includeHome).slice(0,e)}function xn(e){if(pt(),e===ho())return;let t=e===ce?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"]'):Xe(e)[0];t?t.click():location.assign(e===ce?"/":`/c/${e}`)}function Gc(e,t){let o=e===ce?"New chat":v.store.titles[e]??mt(e)??"Untitled chat",n=e===ce?null:v.store.projects[e],r=e===ce?null:v.store.previews[e];return a("button",{class:oe("item"),attrs:{type:"button",role:"option","aria-selected":String(t===J)},on:{click:()=>xn(e),mousemove:()=>t!==J&&bo(t)}},a("div",{class:oe("head")},a("span",{class:`${oe("title")} bloom-truncate`,text:o}),n&&a("span",{class:oe("project"),text:n})),r?.user&&a("div",{class:`${oe("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&a("div",{class:`${oe("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function bo(e){J=(e+X.length)%X.length,de?.querySelectorAll(`.${oe("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===J)))}function zc(){vn(y());let e=ho();X=qc(),e&&(X=[e,...X.filter(t=>t!==e)].slice(0,Number(v.store.maxRecent))),X.length&&(J=X.length>1?1:0,de=a("div",{class:`bloom-root ${oe("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:t=>t.target===t.currentTarget&&pt()}},a("div",{class:oe("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...X.map(Gc))),document.body.append(de))}function pt(){de?.remove(),de=null}var Uc=e=>_c.has(e.code)||$c.has(e.key);function jc(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&Uc(e)){e.preventDefault(),e.stopPropagation(),de?bo(J+(e.shiftKey?-1:1)):zc();return}if(!de)return;let o={Escape:pt,Enter:()=>xn(X[J]),ArrowDown:()=>bo(J+1),ArrowUp:()=>bo(J-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function Fc(e){de&&e.key==="Control"&&xn(X[J])}var oa=p({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:v,styles:Xi,start(){yn=new AbortController;let{signal:e}=yn;addEventListener("keydown",jc,{capture:!0,signal:e}),addEventListener("keyup",Fc,{capture:!0,signal:e}),addEventListener("blur",pt,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&vn(y()),{signal:e}),Zi=[re(({prevId:t})=>{vn(t),ea(ho())}),R.on("conversation",({id:t})=>{v.store.visits.includes(t)&&ta(t)})],ea(ho())},stop(){yn?.abort();for(let e of Zi)e();pt()}});var Kc=new S("ResponseNotification"),Vc=[880,1318.5],Wc=.14,na=.22,Yc=.08,ra=1e-4,Xc=.02,ft=f({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the built-in chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",description:"Try the sound.",render:e=>(e.append(H("Play",aa)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),Sn=null,ia,wn;function Jc(){Sn??=new AudioContext;let e=Sn.currentTime;Vc.forEach((t,o)=>{let n=Sn,r=e+o*Wc,i=n.createOscillator(),s=n.createGain();i.frequency.value=t,s.gain.setValueAtTime(ra,r),s.gain.exponentialRampToValueAtTime(Yc,r+Xc),s.gain.exponentialRampToValueAtTime(ra,r+na),i.connect(s).connect(n.destination),i.start(r),i.stop(r+na)})}function aa(){let e=ft.store.soundUrl.trim();e?new Audio(e).play().catch(t=>Kc.warn("Custom sound failed",t)):Jc()}function Zc(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function Qc(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(wn=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:wn.signal}))}var sa=p({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:ft,start(){Qc(),ia=x.on("fall",({conversationId:e,outcome:t})=>{t==="done"&&(ft.store.onlyWhenHidden&&!document.hidden||(ft.store.sound&&aa(),ft.store.browserNotification&&Zc(mt(e))))})},stop(){ia?.(),wn?.abort()}});var ed="filter:blur(6px)!important;transition:filter 0.2s ease",la=`:is(${d.sidebars})`,td={conversations:{selectors:[`${la} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0},projects:{selectors:[`${la} a:is([href*="/project"], [href*="/g/g-p-"])`,".bloom-recent-project"],hover:!0},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}},da=f({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function od(){return Object.entries(td).filter(([e])=>da.store[e]).map(([,{selectors:e,hover:t}])=>{let o=e.join(",");return`:is(${o}){${ed}}`+(t?`:is(${o}):hover, .bloom-recent-item:hover :is(${o}){filter:none!important}`:"")}).join(`
`)}var ca,ua=p({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:da,styles:od,start(){ca=Ne()},stop(){ca?.()}});var nd=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],rd=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",id='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',ma=f({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function ad(){let e=`${ma.store.width}rem`;return`:is(${rd}){${nd.map(t=>`${t}:${e}!important`).join(";")}}:is(${id}){max-width:min(100%, ${e})!important}`}var pa=p({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:ma,styles:ad});var sd=[Pr,zr,Fr,oi,ri,ai,bi,Ti,Li,Di,Ni,Hi,zi,Yi,oa,sa,ua,pa],En=sd;var ld=new S("Bloom"),fa="2.0.0";async function Tn(){nr();for(let e of En)e.updatedAt=ur[e.name];qn(En),await Nn(),vt("base",Kn),lr(),Lt("Init"),await We(),Pn(),Lt("DOMContentLoaded"),await dr(),Lt("HostReady"),ld.info(`Bloom++ ${fa} ready`)}var ga=new S("Boot");if(window===window.top){let e=W.Bloom;e&&ga.warn("Replacing another Bloom++ instance",e.VERSION),Object.defineProperty(W,"Bloom",{value:Mn,configurable:!0,writable:!0}),Tn().catch(t=>ga.error("Startup failed",t))}})();
