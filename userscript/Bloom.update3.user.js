// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260929] v2.0.8
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

/* Bloom++ [20260929] v2.0.8. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Ba=Object.defineProperty;var Na=(e,t)=>{for(var o in t)Ba(e,o,{get:t[o],enumerable:!0})};var v=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var xt=(e,t,o)=>Math.min(o,Math.max(t,e)),T=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),In=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,xe=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,N=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function wt(e,t){return`${e} ${t}${e===1?"":"s"}`}async function Dn(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function qe(e){try{return JSON.parse(e)}catch{return}}var j=typeof unsafeWindow>"u"?window:unsafeWindow;var On={};Na(On,{VERSION:()=>Oa,init:()=>Rn,plugins:()=>ue});var Ha=new v("Styles"),Ge=new Map,Bn=new Set,Ue=new Map,Co=!0;function Nn(){let e=document.adoptedStyleSheets.filter(t=>!Bn.has(t));document.adoptedStyleSheets=[...e,...Ge.values()]}function Hn(e){document.readyState==="loading"||e.parentNode===document.head||document.head.append(e)}function _a(e,t){let o=Ue.get(e);o||(o=document.createElement("style"),o.id=`bloom-style-${e}`,Ue.set(e,o)),o.textContent!==t&&(o.textContent=t),Hn(o)}function Et(e,t){if(Co)try{let o=Ge.get(e);o||(o=new j.CSSStyleSheet,Ge.set(e,o),Bn.add(o)),o.replaceSync(t),Nn();return}catch(o){Ha.warn("Constructed style sheets unavailable, using <style> after parsing",o),Co=!1,Ge.delete(e)}_a(e,t)}function Lo(e){Ge.delete(e)&&Co&&Nn(),Ue.get(e)?.remove(),Ue.delete(e)}function _n(){for(let e of Ue.values())Hn(e)}var E=e=>(...t)=>t.map(o=>e+o).join(" "),Tt=(...e)=>e.filter(Boolean).join(" "),we=e=>e.length?`${e.join(",")}{display:none!important}`:"";function p(e){return e}var Mt=new v("Storage"),$a="bloompp",Ct="kv",$n=null;function qa(){return $n??=new Promise((e,t)=>{let o=indexedDB.open($a,1);o.onupgradeneeded=()=>{o.result.objectStoreNames.contains(Ct)||o.result.createObjectStore(Ct)},o.onsuccess=()=>e(o.result),o.onerror=()=>t(o.error)}),$n}function qn(e,t){return qa().then(o=>new Promise((n,r)=>{let i=t(o.transaction(Ct,e).objectStore(Ct));i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)}))}async function Ga(e){if(typeof GM_getValue=="function")try{return await GM_getValue(e)}catch(t){Mt.warn("GM read failed",t);return}}async function Ua(e){try{return await qn("readonly",t=>t.get(e))}catch(t){Mt.warn("IndexedDB read failed",t);return}}function za(e){try{return localStorage.getItem(e)??void 0}catch{return}}async function Gn(e){return Promise.all([Ga(e),Ua(e),za(e)])}function Un(e,t){let o=JSON.stringify(t);if(typeof GM_setValue=="function")try{GM_setValue(e,t)}catch{GM_setValue(e,o)}try{localStorage.setItem(e,o)}catch(n){Mt.warn("localStorage write failed",n)}qn("readwrite",n=>n.put(o,e)).catch(n=>Mt.warn("IndexedDB write failed",n))}var Fa=new v("Settings"),Fn="BloomSettings",ja=100,Ka=["GM","IndexedDB","localStorage"],Lt={plugins:{}},Ao=new Set,ze;function Wa(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=qe(t);return!T(t)||!T(t.plugins)||!Object.keys(t.plugins).length?null:t}var ko=e=>e==null||e===""||(Array.isArray(e)?!e.length:T(e)&&!Object.keys(e).length);function Va(e){return ko(e)?0:Array.isArray(e)?12+Math.min(e.length,40):T(e)?12+Math.min(Object.keys(e).length,40):3}function Ya(e){let t=0;for(let o of Object.values(e.plugins))if(T(o))for(let[n,r]of Object.entries(o))n!=="enabled"&&(t+=Va(r));return t}var zn=e=>Object.values(e.plugins).filter(t=>T(t)&&t.enabled===!0).length;function Xa(e){let t=e.map((i,s)=>i&&{candidate:i,index:s,score:Ya(i)}).filter(i=>i!=null).toSorted((i,s)=>s.score-i.score||(i.score?0:zn(s.candidate)-zn(i.candidate))||i.index-s.index);if(!t.length)return null;let[o,...n]=t,r=structuredClone(o.candidate);for(let{candidate:i}of n)for(let[s,c]of Object.entries(i.plugins)){if(!T(c))continue;let l=r.plugins[s]??={};for(let[u,f]of Object.entries(c))u==="enabled"?!("enabled"in l)&&f===!0&&(l.enabled=!0):ko(l[u])&&!ko(f)&&(l[u]=structuredClone(f));Object.keys(l).length||delete r.plugins[s]}return{bag:r,source:Ka[o.index]}}async function jn(){let e=await Gn(Fn),t=Xa(e.map(Wa));t&&(Lt.plugins=t.bag.plugins,Fa.info("Loaded settings from",t.source))}function Kn(){ze=void 0,Un(Fn,Lt)}function Ja(){ze&&(clearTimeout(ze),Kn())}var ce=(e,t)=>Lt.plugins[e]?.[t];function de(e,t,o){let n=Lt.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,clearTimeout(ze),ze=setTimeout(Kn,ja);for(let r of Ao)r(e,t)}function Ee(e){return Ao.add(e),()=>void Ao.delete(e)}function Po(e){return e.type==="component"?void 0:e.default}function g(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>ce(t.pluginName,n)??(e[n]&&Po(e[n])),set:(o,n,r)=>(de(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&ce(t.pluginName,o)!==void 0&&de(t.pluginName,o)}};return t}var Wn=e=>{let t=()=>{let o=ce("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();de("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},At=Wn("pinnedPlugins"),kt=Wn("starredPlugins");addEventListener("pagehide",Ja);var Pt=new v("PluginManager"),ue=new Map,Fe=new Set,Vn=new Set,Ro=new Set;function Yn(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),ue.set(t.name,t)}var je=e=>!!e.required||(ce(e.name,"enabled")??!!e.enabledByDefault);var Oo=e=>`plugin-${e.name}`;function Xn(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?Et(Oo(e),t):Lo(Oo(e))}function Jn(e){if(!Fe.has(e.name))try{Xn(e),e.start?.(),Fe.add(e.name)}catch(t){Pt.error(`Failed to start ${e.name}`,t)}}function Za(e){if(Fe.delete(e.name)){Lo(Oo(e));try{e.stop?.()}catch(t){Pt.error(`Failed to stop ${e.name}`,t)}}}var Zn=e=>e.startAt??"HostReady";function Rt(e){Vn.add(e);for(let t of ue.values())Zn(t)===e&&je(t)&&Jn(t);Pt.info(`${e}: ${[...Fe].join(", ")}`)}function Qn(e,t){de(e.name,"enabled",t),t?Vn.has(Zn(e))&&Jn(e):Za(e);for(let o of Ro)o()}function er(e){return Ro.add(e),()=>void Ro.delete(e)}Ee((e,t)=>{let o=ue.get(e);if(!(!o||t==="enabled"||!Fe.has(e)))try{Xn(o),o.onSettingsChange?.(t)}catch(n){Pt.error(`Settings change failed for ${e}`,n)}});var tr=`/*
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
`;var es=new v("Dom");function a(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var or=document.createElement("template");function nr(e){return or.innerHTML=e.trim(),or.content.firstElementChild.cloneNode(!0)}var We=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),Te=(e,t=document)=>[...t.querySelectorAll(e)].find(We)??null,ts=16,os="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function rr(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([os],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function Io(e){document.hidden?setTimeout(e,ts):requestAnimationFrame(e)}function Me(e){let t=!1;return()=>{t||(t=!0,Io(()=>{t=!1;try{e()}catch(o){es.error("Scheduled task failed",o)}}))}}var Ot=new Set,It=[],Ke,ns=Me(()=>{let e=It;It=[];for(let t of Ot)t(e)});function P(e){return Ot.add(e),Ke||(Ke=new MutationObserver(t=>{It.push(...t),ns()}),Ke.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{Ot.delete(e),!Ot.size&&(Ke?.disconnect(),Ke=void 0,It=[])}}var rs=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),K=e=>!e.length||e.some(t=>!rs(t.target));function me(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size");return}e.getAttribute("data-bloom-text")!==t&&(e.hasAttribute("data-bloom-text")||e.style.setProperty("--bloom-text-size",getComputedStyle(e).fontSize),e.setAttribute("data-bloom-text",t))}var is=new v("Events");function Dt(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){is.error(`Listener for ${String(t)} failed`,r)}}}}var d={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]'};var ir=/[​-‍﻿]/g,Ce=()=>Te(d.composerInput),Ve=e=>e instanceof HTMLElement&&e.matches(d.composerInput),Do=(e=Ce())=>e?.closest("form")??document.querySelector(d.oldComposerForm);function U(e=Ce()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(ir,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(ir,"").trim()}var as=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function Q(e,t=Ce()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return as?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function ar(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:s,value:c}=e;return{first:!c.slice(0,i).includes(`
`),last:!c.slice(s).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var sr=e=>{let t=Do();return(t&&Te(e,t))??Te(e)},Bt=()=>sr(d.stopButton),ss=()=>{let e=sr(d.sendButton);return e&&!e.matches(d.stopButton)?e:null};function lr(){let e=ss();if(e&&!e.disabled)return e.click(),!0;let t=Ce();return t?(t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),!0):!1}var cr=()=>We(Bt());var mr=new v("Network"),ls=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,cs=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,Ht=1e3,ds=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),I=Dt(),Bo=new Map,dr=new Map,us=1,W=e=>e?Bo.get(e)??null:null;function Nt(e){let t=Bo.get(e);return t||Bo.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var pr=e=>e==="user"||e==="assistant";function fr(e){let t=e.author?.role;if(!e.id||!pr(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(l=>typeof l=="string").join(`
`).trim(),i=n.filter(l=>T(l)&&l.content_type==="image_asset_pointer").length,s=e.metadata?.attachments,c=Array.isArray(s)&&s.length>0;return!r&&!i&&!c?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*Ht:null,text:r,hasFiles:c,imageCount:i}}var gr=e=>e.filter((t,o)=>t.role==="user"||e[o+1]?.role!=="assistant");function ms(e,t){let o=t.filter(T).map(i=>T(i.message)?i.message:i);for(let i of o)i.id&&i.create_time&&e.times.set(i.id,i.create_time*Ht);let n=o.map(fr).filter(i=>i!=null),r=new Set(n.map(i=>i.id));return e.chain=gr([...e.chain.filter(i=>!r.has(i.id)),...n]),e}function ps(e,t){if(!T(t)||!(T(t.mapping)||Array.isArray(t.messages)))return null;let o=Nt(e);if(typeof t.title=="string"&&t.title&&(o.title=t.title),Array.isArray(t.messages))return ms(o,t.messages);let n=t.mapping;for(let c of Object.values(n)){let l=c.message?.create_time;c.message?.id&&l&&o.times.set(c.message.id,l*Ht)}let r=[],i=new Set,s=typeof t.current_node=="string"?t.current_node:null;for(;s&&!i.has(s)&&n[s];){i.add(s);let c=n[s].message,l=c?fr(c):null;l&&r.push(l),s=n[s].parent??null}return r.length&&(o.chain=gr(r.toReversed())),o}function fs(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}function gs(e){if(typeof e?.body!="string")return null;let t=qe(e.body);return T(t)&&typeof t.conversation_id=="string"?t.conversation_id:null}function bs(e,t){if(!T(e))return;typeof e.type=="string"&&ds.has(e.type)&&(t.handoff=!0);let o=T(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(Nt(e.conversation_id).title=e.title,I.emit("conversation",Nt(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&pr(n.author?.role)){let r=n.create_time*Ht;t.conversationId&&Nt(t.conversationId).times.set(n.id,r),I.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function hs(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:s}=await o.read();if(i)break;r+=n.decode(s,{stream:!0});let c=r.split(`
`);r=c.pop()??"";for(let l of c){if(!l.startsWith("data:"))continue;let u=l.slice(5).trim();u&&u!=="[DONE]"&&bs(qe(u),t)}}}async function ys(e,t,o){let n={conversationId:t,error:!1,handoff:!1};dr.set(e,t),I.emit("generate-start",{requestId:e,conversationId:t});try{let r=await o;r.ok?r.headers.get("content-type")?.includes("event-stream")&&await hs(r.clone(),n):n.error=!0}catch(r){let i=r instanceof DOMException&&r.name==="AbortError";n.handoff||=i,n.error||=!i}finally{dr.delete(e),I.emit("generate-end",{requestId:e,...n})}}async function vs(e,t){try{let o=await t;if(!o.ok)return;let n=ps(e,await o.clone().json());n&&I.emit("conversation",n)}catch(o){mr.debug("Conversation read skipped",o)}}function Ss(e,t,o){let n=fs(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&ls.test(n.pathname)){ys(us++,gs(t),o);return}let i=r==="GET"&&n.pathname.match(cs)?.[1];i&&vs(i,o)}var ur=!1;function br(){if(ur)return;ur=!0;let e=j.fetch,t=function(o,n){let r=e.call(this??j,o,n);try{Ss(o,n,r)}catch(i){mr.error("Fetch tap failed",i)}return r};j.fetch=typeof exportFunction=="function"?exportFunction(t,j):t}var xs="__reactContainer$",hr="__reactFiber$";function Ye(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var No=(e,t)=>Object.keys(e.wrappedJSObject??e).some(o=>o.startsWith(t)),Le=e=>!No(document,xs)||No(e,hr);async function _t(){await Ye();let e=Date.now()+8e3;for(;!No(document.body,hr)&&Date.now()<e;)await new Promise(t=>setTimeout(t,100))}var ws=new v("Route"),yr=/\/c\/(?!local-)([\w-]+)/,Es=500,$o=e=>{try{return new URL(e,location.origin).pathname.match(yr)?.[1]??null}catch{return null}},S=()=>location.pathname.match(yr)?.[1]??null,pe=()=>location.pathname==="/",vr=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",qt=new Set,Gt=location.href,_o=S(),$t;function Ho(){if(location.href===Gt)return;let e={prevHref:Gt,href:location.href,prevId:_o,id:S()};Gt=e.href,_o=e.id;for(let t of qt)try{t(e)}catch(o){ws.error("Route listener failed",o)}}function Ts(){let e=new AbortController,{navigation:t}=j;t?.addEventListener("currententrychange",()=>queueMicrotask(Ho),{signal:e.signal}),addEventListener("popstate",Ho,{signal:e.signal});let o=setInterval(Ho,Es);return()=>{e.abort(),clearInterval(o)}}function re(e){return qt.add(e),$t||(Gt=location.href,_o=S(),$t=Ts()),()=>{qt.delete(e),!qt.size&&($t?.(),$t=void 0)}}var Ms=250,Cs=400,Ls=6e4,As=5e3,ks=`:is(${d.turn}) :is(${d.turnBusy})`,x=Dt(),Ft=new Set,qo=new Set,ie=!1,xr=0,Ae=null,ke=!1,Ut=!1,Xe=0,Je=null,Sr=!1,H=()=>({generating:ie,conversationId:S()}),wr=()=>cr()||!!document.querySelector(ks);function Ps(){let e=wr();return e?Ut||(Xe=0):Ut=!1,[...Ft].some(t=>!qo.has(t))||e&&!Ut||Date.now()<Xe}function Rs(){return Je?.error?"error":ke?"stopped":"done"}function Os(){Ae=null,ie=!1,x.emit("fall",{conversationId:S(),outcome:Rs()}),ke=!1,Je=null}function Er(){let e=Ps();e&&!ie&&(ie=!0,xr=Date.now(),ke=!1,Je=null,x.emit("rise",{conversationId:S()})),e||!ie?Ae=null:Ae==null?Ae=Date.now():Date.now()-Ae>=Cs&&Os()}function zt(){Er(),x.emit("tick",H())}function Is({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(ie||Date.now()-xr<Ls);if(!o&&ie){for(let n of Ft)qo.add(n);Ut=wr(),Xe=0,Ae=null,ie=!1,ke=!1,Je=null,x.emit("fall",{conversationId:e,outcome:"left"})}x.emit("context",{prevId:e,id:t,migrated:o}),zt()}function Ds(e){e.target instanceof Element&&e.target.closest(d.stopButton)&&(ke=!0,Xe=0)}function Tr(){Sr||(Sr=!0,I.on("generate-start",({requestId:e})=>{Ft.add(e),zt()}),I.on("generate-end",e=>{Ft.delete(e.requestId),!qo.delete(e.requestId)&&(Je=e,Xe=e.handoff&&!e.error&&!ke?Date.now()+As:0,zt())}),re(Is),document.addEventListener("click",Ds,!0),rr(zt,Ms),Ye().then(()=>P(Er)))}var Mr={BetterNavigator:1790616549e3,ChatListStatus:1790649198e3,ChatStateFavicons:1790623094e3,Cleaner:1790622654e3,ComposerOpacity:1790616549e3,CustomSidebarIdentity:1790616549e3,GreetingCustomizer:1790616549e3,InputHistory:1790616549e3,MessageTimestamps:1790649198e3,NoDictation:1790616549e3,NoShareLink:1790616549e3,NoSidebarIdentity:1790616549e3,PromptQueue:1790620238e3,RecentTopics:1790620238e3,ResponseNotification:1790616549e3,Settings:1790649198e3,StreamerMode:1790616549e3,WiderChat:1790616549e3};var b=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,Bs="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",Ns={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${Bs}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:b('<path d="M18 6 6 18M6 6l12 12"/>'),gear:b('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:b('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:b('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:b('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:b('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:b('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:b('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:b('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:b('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:b('<path d="m6 9 6 6 6-6"/>'),play:b('<path d="M7 4v16l13-8z"/>'),plus:b('<path d="M12 5v14M5 12h14"/>'),check:b('<path d="m5 12 5 5 9-10"/>'),alert:b('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:b('<path d="M4 5h16v11H9l-5 4z"/>'),layout:b('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:b('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:b('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:b('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:b('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:b('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:b('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:b('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:b('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:b('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:b('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:b('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:b('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:b('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:b('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),grip:b('<path d="M9 6h0M15 6h0M9 12h0M15 12h0M9 18h0M15 18h0"/>')},D=e=>nr(Ns[e]);var Hs=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,Cr=/\S+@\S+\.\S+/,_s=3,$s=/^\/g\/(g-p-[^/]+)\//,qs=/^g-p-[0-9a-f]+-?/i,Lr=e=>!!e.closest(".sr-only"),Go=e=>!!e?.querySelector(d.menuButton);function Ar(){return[...document.querySelectorAll(d.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(Go)).filter(e=>e!=null)}function kr(){let e=[...document.querySelectorAll(d.oldProfile)];if(e.length)return e.map(o=>{let n=o.parentElement?.children.length===1?o.parentElement:o;return{kind:"profile",anchor:n,insert:r=>n.before(r)}});let t=Ar().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(d.rail)){let n=[...o.children].find(Go);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}var Uo=e=>!e.closest("[data-bloom]")&&(!!e.querySelector("img, [class*=rounded-full]")||Ir(e).some(t=>!Lr(t))),Pr=e=>[...e.parentElement?.children??[]].find(t=>t!==e&&t instanceof HTMLElement&&Uo(t))??null;function Rr(){let e=[...document.querySelectorAll(d.oldProfile)];return e.length?e:[...Ar(),...[...document.querySelectorAll(d.rail)].map(o=>[...o.children].findLast(Go))].map(o=>[...o?.querySelectorAll(d.menuButton)??[]].findLast(n=>Uo(n)||Pr(n))).filter(o=>o!=null)}var Or=()=>Rr().map(e=>Uo(e)?e:Pr(e)).filter(e=>e!=null);function Ir(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!N(t.textContent??"")&&!(t instanceof SVGElement))}var Gs=e=>{let t=getComputedStyle(e);return t.borderRadius.includes("%")||Number.parseFloat(t.borderRadius)>=e.clientWidth/2||/rounded-full/.test(e.getAttribute("class")??"")};function Ze(e,t){e&&!e.hasAttribute(t)&&e.setAttribute(t,"")}function Us(e){if(N(e.textContent??"").length>_s)return null;for(let t=e;t&&t!==e.closest("button");t=t.parentElement)if(Gs(t))return t;return null}function zo(e,t){Ze(e,`data-bloom-${t}`);let o=e.querySelector("img:not([data-bloom] img)"),n=Ir(e),r=o?null:n.map(Us).find(f=>f!=null),i=o?.closest("[class*=rounded-full]"),s=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");Ze(s,`data-bloom-${t}-avatar`);let c=n.filter(f=>!s?.contains(f)&&!Lr(f)),l=c.find(f=>Hs.test(N(f.textContent??""))),u=c.find(f=>Cr.test(f.textContent??""));Ze(l,`data-bloom-${t}-plan`),Ze(u,`data-bloom-${t}-email`),Ze(c.find(f=>f!==l&&f!==u),`data-bloom-${t}-name`)}function zs(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function jt(){return Rr().map(zs).find(e=>e!=null)??[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&(Cr.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var Qe=e=>[...document.querySelectorAll(d.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&$o(t.href)===e);function Dr(e){let t=Qe(e).find(o=>N(o.textContent??""));return t?N(t.textContent??""):null}function Br(e){let t=new URL(e,location.origin).pathname.match($s)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!$o(n.href)&&N(n.textContent??""));return o?N(o.textContent??""):t.replace(qs,"").replaceAll("-"," ")||null}function Fo(e,t,o){let n=a("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o}});return n.addEventListener("click",r=>{r.stopPropagation();let i=n.getAttribute("aria-checked")!=="true";n.setAttribute("aria-checked",String(i)),t(i)}),n}function _(e,t,o){return a("button",{class:Tt("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button"},on:{click:t}})}function $(e,t,o,n){let r=a("button",{class:"bloom-icon-button",title:t,attrs:{type:"button","aria-label":t},on:{click:o}},D(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function Kt(e,t,o,n,r,i){let s=a("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});s.value=String(e);let c=a("output",{text:`${e}${r}`});return s.addEventListener("input",()=>{c.textContent=`${s.value}${r}`,i(Number(s.value))}),a("div",{class:"bloom-slider"},s,c)}function jo(e,t,o){let n=a("select",{class:"bloom-select"},...t.map(r=>a("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function et(e,t,o="",n="text"){let r=a("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var Fs=new v("SettingsPanel"),m=E("bloom-settings-"),js=10080*60*1e3,Ks=3e3,Nr="Toggle features. Some need a reload. Click the sliders icon to configure.",Ws=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Vs=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],Ys={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},Hr=new Set(["chat","ui","privacy"]),B=null,Pe="all",Ko="all",Wt="",Wo=[],_r=()=>[...ue.values()].filter(e=>!e.hidden),Xs=e=>!!e.updatedAt&&Date.now()-e.updatedAt<js;function Js(e){switch(Pe){case"favorites":return kt.has(e.name);case"recent":return Xs(e);case"all":return!0;case"other":return!e.tags.some(t=>Hr.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(Pe)}}function Zs(e){switch(Ko){case"all":return!0;case"enabled":return je(e);case"disabled":return!je(e)}}function Qs(e){let t=Wt.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function el(e){let t=At.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return Pe==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var $r=e=>e.settings?.def??{},tl=e=>Object.values($r(e)).some(t=>t.type!=="custom");function ol(e,t,o){let n=ce(e.name,t)??Po(o),r=i=>de(e.name,t,i);switch(o.type){case"boolean":return Fo(n,r,o.description??t);case"slider":return Kt(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return jo(n,o.options,r);case"string":return et(n,r,o.placeholder);case"number":return et(String(n),i=>r(Number(i)),"","number");case"component":{let i=a("div",{class:m("component")});return Wo.push(o.render(i)),i}case"custom":return null}}var nl=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function qr(e){if(!B)return;let t=Object.entries($r(e)).filter(([,i])=>i.type!=="custom").map(([i,s])=>{let c=ol(e,i,s),l=s.type==="boolean";return a("div",{class:m("field",l?"field-inline":"field-stacked")},a("div",{class:m("field-text")},s.type!=="component"&&a("div",{class:m("field-label"),text:nl(i)}),s.description&&a("div",{class:m("field-desc"),text:s.description})),c)}),o,n=_("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},Ks);return}clearTimeout(o),e.settings?.reset(),tt(),qr(e)},"danger"),r=a("div",{class:m("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&tt()}},a("div",{class:m("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},a("div",{class:m("popup-header")},a("div",{class:m("card-icon")},D(e.icon)),a("div",{class:m("popup-title")},a("div",{class:m("card-name"),text:e.name}),a("div",{class:m("popup-authors"),text:e.authors.join(", ")})),$("close","Close",tt)),a("p",{class:m("popup-desc"),text:e.description}),a("div",{class:m("fields")},...t),a("div",{class:m("popup-footer")},n)));B.querySelector(`.${m("modal")}`)?.append(r)}function tt(){for(let e of Wo)e();Wo=[],B?.querySelector(`.${m("popup-backdrop")}`)?.remove()}function rl(e){let t=je(e),o=kt.has(e.name),n=At.has(e.name);return a("div",{class:m("card",t?"card-on":"card-off")},a("div",{class:m("card-top")},a("div",{class:m("card-icon")},D(e.icon)),a("div",{class:m("card-actions")},$("star",o?"Unstar":"Star",()=>{kt.toggle(e.name),fe()},o),$("pin",n?"Unpin":"Pin to top",()=>{At.toggle(e.name),fe()},n),tl(e)&&$("gear","Settings",()=>qr(e)),e.required?null:Fo(t,r=>Qn(e,r),`Enable ${e.name}`))),a("div",{class:m("card-name"),text:e.name}),a("div",{class:m("card-desc"),text:e.description,title:e.description}),a("div",{class:m("card-footer"),text:e.authors.join(", ")}))}function Gr(){let e=_r().some(o=>!o.tags.some(n=>Hr.has(n)));B?.querySelector(`.${m("tabs")}`)?.replaceChildren(...Ws.filter(o=>o.id!=="other"||e).map(o=>a("button",{class:m("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===Pe)},on:{click:()=>{Pe=o.id,Gr(),fe()}}})))}function fe(){if(!B)return;let e=_r().filter(Js),t=B.querySelector(`.${m("search")} input`);t&&(t.placeholder=`Search ${wt(e.length,"plugin")}...`);let o=el(e.filter(i=>Qs(i)&&Zs(i))),n=B.querySelector(`.${m("grid")}`),r=Wt.trim()?"No plugins match your search.":Ys[Pe]??"No plugins available.";n?.replaceChildren(...o.length?o.map(rl):[a("div",{class:m("empty"),text:r})])}function il(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),B?.querySelector(`.${m("popup-backdrop")}`)?tt():Re())}var Ur,Vo;function al(){if(B)return;let e=a("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=Wt,e.addEventListener("input",()=>{Wt=e.value,fe()}),B=a("div",{class:`bloom-root ${m("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&Re()}},a("div",{class:m("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},a("div",{class:m("header")},a("div",{class:m("logo")},D("bloom")),a("h2",{class:m("title"),text:"Bloom++"}),a("span",{class:m("hint"),title:Nr,attrs:{"aria-label":Nr,tabindex:"0"}},D("info")),a("span",{class:m("version"),text:"v2.0.8"}),$("close","Close",Re)),a("div",{class:m("tabs"),attrs:{role:"tablist"}}),a("div",{class:m("toolbar")},a("label",{class:m("search")},D("search"),e),jo(Ko,Vs,t=>{Ko=t,fe()})),a("div",{class:m("grid")}))),B.addEventListener("keydown",t=>t.stopPropagation()),Vo=new AbortController,document.addEventListener("keydown",il,{capture:!0,signal:Vo.signal}),document.body.append(B),Gr(),fe(),Ur=er(fe),e.focus(),Fs.debug("Opened")}function Re(){tt(),Vo?.abort(),Ur?.(),B?.remove(),B=null}var Vt=()=>B?Re():al();var zr=`/*
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
`;var ot=E("bloom-entry-"),Oe=new Map,Fr=!1,jr;function ll(e){let t=a("button",{class:ot("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:o=>{o.preventDefault(),o.stopPropagation(),Vt()}}},D("bloom"),e!=="rail"&&a("span",{class:ot("label"),text:"Bloom++"}));return a("div",{class:`bloom-root ${ot("wrap")} ${ot(e)}`,attrs:{"data-bloom":"entry"}},t)}function cl(e){let t=a("div",{class:`bloom-root ${ot("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),Vt()}}},D("bloom"),a("span",{text:"Bloom++"})),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function dl(){let e=kr();for(let[o,n]of Oe)o.isConnected&&e.some(r=>r.anchor===o)||(n.remove(),Oe.delete(o));for(let o of e){let n=Oe.get(o.anchor);if(n?.isConnected||!Le(o.anchor))continue;let r=n??ll(o.kind);Oe.set(o.anchor,r),o.insert(r)}let t=jt();t&&!t.querySelector('[data-bloom="menu-entry"]')&&cl(t)}var Kr=p({name:"Settings",description:"Bloom++ settings panel and its sidebar entry.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,hidden:!0,startAt:"HostReady",styles:zr,start(){jr=P(dl),!Fr&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",Vt),Fr=!0)},stop(){jr?.();for(let e of Oe.values())e.remove();Oe.clear(),Re()}});var ul=["data-turn","data-message-author-role"],ml=/:(user|assistant)$/,Yo=`${d.messageUnit}, ${d.oldMessage}`,Xo=e=>e==="user"||e==="assistant";function Jo(){let e=document.querySelector(d.timelineScroll);if(e)return e;let t=document.querySelector(d.turn);for(let o=t?.parentElement;o;o=o.parentElement){let{overflowY:n}=getComputedStyle(o);if((n==="auto"||n==="scroll")&&o.scrollHeight>o.clientHeight)return o}return document.scrollingElement}var Yr=()=>document.querySelector(d.conversationTarget)??document.querySelector(d.oldThread),Yt=e=>e.getAttribute("data-chatgpt-search-unit-key")?.match(ml)?.[1]??null,Xr=e=>[...e.querySelectorAll(d.searchUnit)].filter(t=>Yt(t)&&!t.parentElement?.closest(d.searchUnit)),Wr=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function nt(e){let t=Wr(e);return t.length?t:[...new Set([...e.querySelectorAll(Yo)].flatMap(Wr))]}function Zo(e=document){let t=Xr(e);return t.length?t:[...e.querySelectorAll(Yo)].filter(o=>!o.parentElement?.closest(Yo))}function pl(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function fl(e){for(let t of ul){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(Xo(o))return o}return e.querySelector(d.markdown)||e.querySelector(d.generatedImage)?"assistant":null}var gl=e=>!e.parentElement?.closest(d.turn);function Xt(){let e=W(S())?.chain??[],t=[...document.querySelectorAll(d.turn)].filter(gl).flatMap(n=>{let r=Xr(n);return r.length?r.map(i=>({el:i,known:Yt(i)})):[{el:n,known:null}]}),{generating:o}=H();return t.map(({el:n,known:r},i)=>{let s=r?nt(n):Zo(n).flatMap(nt),c=r??fl(n)??pl(s,e)??(i%2?"assistant":"user"),l=c==="assistant"&&(n.matches(d.turnBusy)||!!n.querySelector(d.turnBusy)||o&&i===t.length-1);return{el:n,role:c,messageIds:s,streaming:l}})}var bl="[data-bloom], .sr-only",hl=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,Vr=new WeakMap;function Jt(e){let t=e.el.textContent?.length??0,o=Vr.get(e.el);if(o?.length===t)return o.summary;let n=yl(e);return Vr.set(e.el,{length:t,summary:n}),n}function yl(e){let t=e.el.querySelectorAll(d.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.querySelector(e.role==="assistant"?d.markdown:".whitespace-pre-wrap")??e.el,i=[...o.querySelectorAll(bl)].map(s=>N(s.textContent??"")).filter(Boolean).reduce((s,c)=>s.replace(c,`
`),o.innerText||o.textContent||"").split(`
`).map(N).filter(s=>s&&!hl.test(s));return i.length?i.join(" "):e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function Zt(e){return e.text?N(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var Jr=`/*
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
`;var A=E("bloom-nav-"),ri=80,Sl=1200,xl=2,wl=40,El=.3,Zr=12,Tl={user:"\u2753",assistant:"\u{1F916}"},to=g({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the outline too.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),R=null,q=[],Ie=-1,Qt="",Qr=0,ei=[],rt=null,eo;function ii(){let e=Xt().map(s=>({role:s.role,summary:Jt(s),ids:s.messageIds,turn:s,streaming:s.streaming})),t=W(S())?.chain??[];if(!t.length)return e;let o=new Set(t.map(s=>s.id)),n=new Map(e.flatMap(s=>s.ids.map(c=>[c,s]))),r=new Set,i=[];for(let s of t){let c=n.get(s.id);c&&r.has(c)||(c&&r.add(c),i.push(c??{role:s.role,summary:Zt(s),ids:[s.id],turn:null,streaming:!1}))}return[...i,...e.filter(s=>!s.ids.some(c=>o.has(c)))]}function Ml(e){let t=e.getBoundingClientRect(),o=t.top+t.height*El,n=-1;return q.forEach((r,i)=>{let s=r.turn?.el.getBoundingClientRect();s&&s.top<=o&&(n=i)}),n===-1?q.findIndex(r=>r.turn):n}function ti(e){to.store.jumpEffect==="border"&&(e.classList.add(A("flash")),setTimeout(()=>e.classList.remove(A("flash")),Sl))}function Qo(e){let t=q[e],o=Jo();if(!t||!o)return;let n=t.turn?.el;if(n?.isConnected){let u=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:u<o.clientHeight*xl?"smooth":"auto"}),ti(n);return}let r=q.map((u,f)=>u.turn?f:-1).filter(u=>u>=0),i=r.length&&e<r[0]?-1:1,s=++Qr,c=0,l=()=>{if(s!==Qr||c++>wl)return;q=ii();let u=q.find(f=>f.ids.some(C=>t.ids.includes(C)))?.turn?.el;if(u){u.scrollIntoView({block:"start"}),ti(u);return}o.scrollBy({top:i*o.clientHeight*.9}),requestAnimationFrame(l)};l()}function Cl(e,t){return a("button",{class:A("row"),attrs:{type:"button","data-index":String(t)},on:{click:()=>Qo(t)}},a("span",{text:Tl[e.role]}),a("span",{class:"bloom-truncate",text:xe(e.summary||"\u2026",ri)}))}function Ll(){let e=Jo(),t=Yr()??e;if(q=ii(),!q.length||!e||!t){R?.remove(),R=null,Qt="";return}rt!==e&&(eo?.abort(),eo=new AbortController,e.addEventListener("scroll",Me(oi),{passive:!0,signal:eo.signal}),rt=e),R??=a("div",{class:`bloom-root ${A("root")}`,attrs:{"data-bloom":"navigator"}},a("div",{class:A("rail")}),a("div",{class:A("toc")},a("div",{class:A("toc-head")}),a("div",{class:A("toc-list")}))),R.isConnected||document.body.append(R);let o=t.getBoundingClientRect(),n=e.getBoundingClientRect();R.style.left=`${Math.min(o.right+Zr,n.right-Zr*2)}px`,R.style.top=`${n.top+n.height/2}px`;let r=JSON.stringify([to.store.showAssistant,q.map(i=>[i.role,i.summary,i.streaming])]);r!==Qt&&(Qt=r,Al()),oi()}function oi(){if(!R||!rt)return;Ie=Ml(rt),R.querySelectorAll(`.${A("tick")}`).forEach((t,o)=>t.classList.toggle(A("tick-current"),o===Ie)),R.querySelectorAll(`.${A("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===Ie)));let e=R.querySelector(`.${A("toc-head")}`);e&&(e.textContent=`${Ie+1} / ${q.length}`)}function Al(){R?.querySelector(`.${A("rail")}`)?.replaceChildren(...q.map((t,o)=>a("button",{class:Tt(A("tick"),A(`tick-${t.role}`),t.streaming&&A("tick-streaming")),title:xe(t.summary,ri),attrs:{type:"button","aria-label":`Jump to message ${o+1}`},on:{click:()=>Qo(o)}})));let e=q.map((t,o)=>({entry:t,index:o})).filter(({entry:t})=>to.store.showAssistant||t.role==="user");R?.querySelector(`.${A("toc-list")}`)?.replaceChildren(...e.map(({entry:t,index:o})=>Cl(t,o)))}var ae=Me(Ll),kl=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function ni(e){if(!R||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||kl(document.activeElement)||document.querySelector("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:Ie-1,ArrowDown:Ie+1,Home:0,End:q.length-1}[e.key];o==null||o<0||o>=q.length||(e.preventDefault(),e.stopPropagation(),Qo(o))}var ai=p({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:to,styles:Jr,start(){ei=[P(e=>K(e)&&ae()),re(ae),I.on("conversation",ae),x.on("rise",ae),x.on("fall",ae)],addEventListener("keydown",ni,!0),addEventListener("resize",ae,{passive:!0})},stop(){for(let e of ei)e();eo?.abort(),rt=null,removeEventListener("keydown",ni,!0),removeEventListener("resize",ae),R?.remove(),R=null,Qt=""},onSettingsChange:ae});var si=`/*
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
`;var Rl=E("bloom-cls"),Ol="bloom-cls",Il=600*1e3,tn=In("tab"),Be=new Map,at=new Map,De=null,li=[],Dl=e=>e==="streaming"||e==="error";function Bl(){let e=new Map,t=Date.now();for(let[o,n]of at)t-n.at>Il?at.delete(o):e.set(o,n.status);for(let[o,n]of Be)e.set(o,n);return e}function Nl(e){return a("span",{class:`bloom-root ${Rl("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&D("alert"))}function it(){let e=Bl(),t=new Set;for(let[o,n]of e)for(let r of Qe(o)){if(!Le(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let s=Nl(n);t.add(s),r.append(s)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function oo(e,t){e&&(t?Be.set(e,t):Be.delete(e),De?.postMessage({tab:tn,id:e,status:t}),it())}function Hl({data:e}){!T(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===tn||(Dl(e.status)?at.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):at.delete(e.id),it())}function en(){for(let e of Be.keys())De?.postMessage({tab:tn,id:e,status:null})}var ci=p({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,styles:si,start(){De=typeof BroadcastChannel=="function"?new BroadcastChannel(Ol):null,De?.addEventListener("message",Hl),addEventListener("pagehide",en),li=[x.on("rise",({conversationId:e})=>oo(e,"streaming")),x.on("fall",({conversationId:e,outcome:t})=>oo(e,t==="error"?"error":null)),x.on("context",({prevId:e,id:t,migrated:o})=>{o&&H().generating?oo(t,"streaming"):!o&&Be.get(e??"")==="streaming"&&oo(e,null)}),P(e=>K(e)&&it())],S()&&it()},stop(){for(let e of li)e();en(),De?.close(),De=null,removeEventListener("pagehide",en),Be.clear(),at.clear(),it()}});var ui=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],io={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},_l={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},$l="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",on=32,ao=64,nn="#FCFCFC",rn="#111111",ql=14,so=51.5,Gl=12.5,Ul=9.75,di=52,zl=10.5,Fl=7.75,jl={rotate:e=>e.arc(so,so,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function no(e){let t=document.createElement("canvas");t.width=t.height=on;let o=t.getContext("2d");return o?(o.scale(on/ao,on/ao),e(o),t.toDataURL("image/png")):""}function ro(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D($l);o&&(e.strokeStyle=rn,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function lo(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function Kl(e,t){lo(e,so,Gl,rn),lo(e,so,Ul,io[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),jl[t](e),e.stroke()}function Wl(e,t){e.beginPath(),e.roundRect(0,0,ao,ao,ql),e.fillStyle=t,e.fill()}var Vl=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function mi(e,t){switch(e){case"original":return Vl(_l[t]);case"hole":return no(o=>ro(o,io[t],!0));case"bg":return no(o=>{Wl(o,io[t]),ro(o,nn,!1)});case"dot":return no(o=>{ro(o,nn,!0),lo(o,di,zl,rn),lo(o,di,Fl,io[t])});case"badge":return no(o=>{ro(o,nn,!0),Kl(o,t)})}}var lt="bloom-chat-state-favicon",ct="data-bloom-rel",ln="data-bloom-media",pi="bloom-parked-icon",Yl="/favicon.ico",gi=g({style:{type:"select",description:"How the tab icon shows the chat state.",options:ui,default:"bg"}}),se=null,bi="",co=null,hi="",fi=new Map,cn,an=[],yi=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${ct}]`)];function dn(){for(let e of yi())e.id!==lt&&(e.hasAttribute(ct)||(hi||=e.href,e.setAttribute(ct,e.rel),e.setAttribute(ln,e.getAttribute("media")??"")),e.rel!==pi&&(e.rel=pi),e.media!=="not all"&&(e.media="not all"))}function Xl(){for(let e of yi()){let t=e.getAttribute(ct);if(t==null)continue;e.rel=t;let o=e.getAttribute(ln);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(ct),e.removeAttribute(ln)}}function vi(){let e=document.getElementById(lt);return e||(e=document.createElement("link"),e.id=lt,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function Jl(e){if(e==="wait")return hi||Yl;let t=gi.store.style,o=`${t}:${e}`,n=fi.get(o);return n||fi.set(o,n=mi(t,e)),n}function sn(e){if(e)return"rotate";let t=U();return se&&t&&t!==bi&&(se=null),se==="error"?"error":se==="done"?"done":t?"ready":"wait"}function st(e,t=!1){if(e===co&&!t)return;co=e;let o=vi(),n=Jl(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function Zl(){cn=new MutationObserver(()=>{dn(),document.head.lastElementChild?.id!==lt&&vi()}),cn.observe(document.head,{childList:!0})}var Si=p({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"HostReady",settings:gi,start(){dn(),st(sn(H().generating),!0),Zl(),an=[x.on("rise",()=>{se=null,st("rotate")}),x.on("fall",({outcome:e})=>{se=e==="done"||e==="error"?e:null,bi=U(),st(sn(!1))}),x.on("context",({migrated:e})=>{e||(se=null)}),x.on("tick",({generating:e})=>{dn(),st(sn(e))})]},stop(){for(let e of an)e();an=[],cn?.disconnect(),document.getElementById(lt)?.remove(),Xl(),co=null,se=null},onSettingsChange(){st(co??"wait",!0)}});var Ql={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]'],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['div:has(> div > aside button[aria-label="Dismiss migration notice"])','aside:has(button[aria-label="Dismiss migration notice"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])']},xi=g({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice above the composer.",default:!0}}),wi=p({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads and notices.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:xi,styles:()=>we(Object.entries(Ql).flatMap(([e,t])=>xi.store[e]?t:[]))});var un=`form:has(${d.composerInput}), ${d.oldComposerForm}`,ec=`:is(${un}) :is([class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"])`,tc='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',oc='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',nc="var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, #fff)))",Ei=g({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function rc(){let{opacity:e,blur:t}=Ei.store;return e>=100?"":`:is(${tc}), :is(${un}){background-color:transparent!important;background-image:none!important;box-shadow:none!important}:is(${oc}){display:none!important}${ec}{background-color:color-mix(in srgb, ${nc} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important}:is(${un}) :is(${d.composerInput}){background-color:transparent!important}`}var Ti=p({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:Ei,styles:rc});var mn=0,uo;function ic(e){if(!K(e))return;for(let o of Or())zo(o,"profile");let t=jt();t&&zo(t,"menu")}function Ne(){mn++;let e=!0;return _t().then(()=>{e&&mn&&!uo&&(uo=P(ic))}),()=>{e&&(e=!1,!--mn&&(uo?.(),uo=void 0))}}var ee=E("bloom-csi-"),ac=256,sc=160,mo=1,Mi=4,lc=.1,cc=.0015,dc=250;function Ci(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function uc(e){return new Promise((t,o)=>{let n=new Image;n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function mc(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:xt(t.x,n,1-n),y:xt(t.y,r,1-r)}}function Li(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function pc(e,t){let o=a("canvas");return o.width=o.height=ac,Li(o,e,t),o.toDataURL("image/png")}async function fc(e){if(e.startsWith("data:image/"))return e;let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status}`);return Ci(await t.blob())}function Ai(e){let t=null,o={x:M.store.cropX,y:M.store.cropY,zoom:M.store.cropZoom},n,r=a("canvas",{class:ee("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=sc*devicePixelRatio;let i=a("div",{class:`bloom-muted ${ee("status")}`}),s=a("div",{class:ee("zoom")}),c=a("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(h,O=!0){t&&(o=mc(t,h),Li(r,t,o),O&&(clearTimeout(n),n=setTimeout(()=>{t&&(M.store.cropX=o.x,M.store.cropY=o.y,M.store.cropZoom=o.zoom,M.store.avatarUrl=pc(t,o))},dc)))}function u(){s.replaceChildren(Kt(o.zoom,mo,Mi,lc,"\xD7",h=>l({...o,zoom:h})))}async function f(h,O){i.textContent="";try{let ne=await fc(h);t=await uc(ne),O&&(M.store.avatarSource=ne,o={x:.5,y:.5,zoom:mo}),e.classList.add(ee("has-image")),u(),l(o,O)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let C=h=>{h?.type.startsWith("image/")&&Ci(h).then(O=>f(O,!0))};c.addEventListener("change",()=>C(c.files?.[0])),r.addEventListener("wheel",h=>{t&&(h.preventDefault(),l({...o,zoom:xt(o.zoom*(1-h.deltaY*cc),mo,Mi)}),u())},{passive:!1}),r.addEventListener("pointerdown",h=>{if(!t)return;r.setPointerCapture(h.pointerId);let O={...o},ne=r.getBoundingClientRect(),vt=St=>{if(!t)return;let F=Math.max(ne.width/t.naturalWidth,ne.height/t.naturalHeight)*o.zoom;l({...o,x:O.x-(St.clientX-h.clientX)/(t.naturalWidth*F),y:O.y-(St.clientY-h.clientY)/(t.naturalHeight*F)})};r.addEventListener("pointermove",vt),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",vt),{once:!0})});let Z=a("div",{class:ee("cropper"),attrs:{tabindex:"0"},on:{paste:h=>C([...h.clipboardData?.files??[]].find(O=>O.type.startsWith("image/"))),dragover:h=>h.preventDefault(),drop:h=>{h.preventDefault(),C(h.dataTransfer?.files[0])}}},a("div",{class:ee("stage")},r),a("div",{class:ee("controls")},et("",h=>h.trim()&&void f(h.trim(),!0),"https://\u2026 or data:image/\u2026","url"),a("div",{class:ee("buttons")},_("Choose file",()=>c.click()),_("Reset crop",()=>{l({x:.5,y:.5,zoom:mo}),u()}),_("Clear",()=>{t=null,e.classList.remove(ee("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),s.replaceChildren(),M.store.avatarUrl="",M.store.avatarSource=""},"danger")),s,i,c));return e.append(Z),M.store.avatarSource&&f(M.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var ki=`/*
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
`;var He="data-bloom-csi-avatar",bc="data-bloom-csi-sized",Ii="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",M=g({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>Ai(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),Pi=[];function Ri(e){return(M.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function Oi(e=[]){if(!K(e))return;let t=M.store.displayName.trim()||null,o=!!M.store.avatarUrl,n=new Set(t?Ri("name"):[]);for(let i of document.querySelectorAll(Ii))n.has(i)||me(i,null);for(let i of n)me(i,t);let r=new Set(o?Ri("avatar"):[]);for(let i of document.querySelectorAll(`[${He}]`))r.has(i)||i.removeAttribute(He);for(let i of r)i.hasAttribute(He)||i.setAttribute(He,""),i.toggleAttribute(bc,!i.closest(`${d.rail}, ${d.oldRail}, [role="menu"]`))}function hc(){let e=M.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${M.store.avatarSize}px}`:""}var Di=p({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:M,styles:()=>`${hc()}
${ki}`,start(){Pi=[Ne(),P(Oi)]},stop(){for(let e of Pi)e();for(let e of document.querySelectorAll(`[${He}]`))e.removeAttribute(He);for(let e of document.querySelectorAll(Ii))me(e,null)},onSettingsChange(){Oi()}});var _e=E("bloom-greeting-"),Bi=30,Ni=100;function Hi(e){let t=-1,o=a("textarea",{class:`bloom-input ${_e("input")}`,attrs:{maxlength:String(Ni),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=_("Add",i),r=a("div",{class:_e("list")});function i(){let l=o.value.trim().slice(0,Ni);if(!l)return;let u=[...w.store.greetings];t>=0?u[t]=l:u.length<Bi&&u.push(l),w.store.greetings=u,t=-1,o.value="",s()}function s(){let{greetings:l}=w.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&l.length>=Bi,r.replaceChildren(...l.length?l.map((u,f)=>a("div",{class:_e("row",f===t?"row-editing":"row-idle")},a("div",{class:_e("text"),text:u}),$("edit","Edit",()=>{t=f,o.value=u,o.focus(),s()}),$("trash","Delete",()=>{w.store.greetings=l.filter((C,Z)=>Z!==f),t===f&&(t=-1),s()}))):[a("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),e.append(a("div",{class:_e("editor")},r,a("div",{class:_e("form")},o,n))),s();let c=Ee((l,u)=>l==="GreetingCustomizer"&&u==="greetings"&&s());return()=>{c(),e.replaceChildren()}}var _i=`/*
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
`;var fo="data-bloom-greeting",vc=1e3,Sc=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],w=g({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>Hi(e)},greetings:{type:"custom",default:Sc},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),po,$i=[],pn,qi=()=>w.store.greetings.filter(e=>typeof e=="string"&&e.trim());function ut(){let e=qi();if(e.length)if(w.store.order==="random"&&e.length>1){let t=w.store.lastRandom;for(;t===w.store.lastRandom;)t=Math.floor(Math.random()*e.length);w.store.lastRandom=t,w.store.index=t}else w.store.index=(w.store.index+1)%e.length}function xc(){return pe()?Te(d.homeHeading):null}function Gi(){for(let e of document.querySelectorAll(`[${fo}]`))e.removeAttribute(fo),me(e,null)}function dt(){let e=qi(),t=xc();if(!t||!e.length){Gi();return}(w.store.index<0||w.store.index>=e.length)&&ut(),t.setAttribute(fo,""),me(t,e[Math.max(0,w.store.index)%e.length])}function fn(){clearInterval(po),po=void 0,w.store.mode==="interval"&&pe()&&(po=setInterval(()=>{ut(),dt()},w.store.intervalSec*vc))}function wc(e){w.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${fo}]`)||getSelection()?.toString()||(ut(),dt())}function Ec(){pe()&&w.store.mode==="refresh"&&ut(),fn(),dt()}var Ui=p({name:"GreetingCustomizer",description:"Replace the \u201CWhat can I help with?\u201D heading on the home page with your own lines.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:w,styles:_i,start(){pn=new AbortController,document.addEventListener("click",wc,{signal:pn.signal}),pe()&&w.store.mode==="refresh"&&ut(),fn(),$i=[P(e=>K(e)&&dt()),re(Ec)]},stop(){pn?.abort();for(let e of $i)e();clearInterval(po),Gi()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&fn(),dt()}});var mt=E("bloom-history-"),gn=10,Tc=3e3;function zi(e){let t="",o=0,n=new Set,r=a("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),i=a("div",{class:mt("list")}),s=a("div",{class:mt("pager")}),c,l=_("Clear all",()=>{if(!c){l.textContent="Click again to clear",c=setTimeout(()=>{c=void 0,l.textContent="Clear all"},Tc);return}clearTimeout(c),c=void 0,l.textContent="Clear all",pt([])},"danger");function u(){let C=[...ge.store.entries].toReversed(),Z=t.trim().toLowerCase(),h=Z?C.filter(F=>F.toLowerCase().includes(Z)):C,O=Math.max(1,Math.ceil(h.length/gn));o=Math.min(o,O-1);let ne=h.slice(o*gn,(o+1)*gn).map(F=>a("div",{class:mt("row")},a("button",{class:mt("text",n.has(F)?"text-open":"text-closed"),text:F,title:n.has(F)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{n.delete(F)||n.add(F),u()}}}),$("copy","Copy",()=>void Dn(F)),$("trash","Delete",()=>pt(ge.store.entries.filter(Da=>Da!==F)))));i.replaceChildren(...ne.length?ne:[a("div",{class:"bloom-muted",text:Z?"No matching prompts.":"No saved prompts yet."})]),s.replaceChildren(a("span",{class:"bloom-muted",text:`${h.length} saved \xB7 page ${o+1} of ${O}`}),_("Previous",()=>{o--,u()}),_("Next",()=>{o++,u()}),l);let[vt,St]=s.querySelectorAll("button");vt.disabled=o===0,St.disabled=o>=O-1,l.disabled=!C.length}r.addEventListener("input",()=>{t=r.value,o=0,u()}),e.append(a("div",{class:mt("manager")},r,i,s)),u();let f=Ee((C,Z)=>C==="InputHistory"&&Z==="entries"&&u());return()=>{f(),clearTimeout(c),e.replaceChildren()}}var Fi=`/*
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
`;var Cc=E("bloom-history-"),Lc=2e3,ge=g({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>zi(e)},entries:{type:"custom",default:[]}}),z=null,bn={text:"",at:0},be=null,hn,go=()=>ge.store.entries.filter(e=>typeof e=="string");function pt(e){ge.store.entries=e.slice(-ge.store.maxEntries)}function yn(e){let t=e.trim();if(!t)return;let o=Date.now();t===bn.text&&o-bn.at<Lc||(bn={text:t,at:o},pt([...go().filter(n=>n!==t),t]))}function Ac(e,t){let o=Ce();if(!o)return;be??=a("div",{class:`bloom-root ${Cc("hud")}`,attrs:{"data-bloom":"history-hud","aria-live":"polite"}}),be.textContent=`${e+1} / ${t}`;let n=(o.closest("form")??o).getBoundingClientRect();be.style.left=`${n.left+n.width/2}px`,be.style.top=`${n.top}px`,be.isConnected||document.body.append(be)}function ft(){z=null,be?.remove()}function kc(e){let t=go();if(!z)return;let o=t[e];z.index=e,z.shown=o,Q(o),Ac(t.length-1-e,t.length)}function Pc(e){let t=go();if(!t.length)return!1;if(!z){if(e===1)return!1;z={index:t.length,draft:U(),shown:""}}let o=z.index+e;return o<0?!0:o>=t.length?(Q(z.draft),ft(),!0):(kc(o),!0)}function Rc(e){if(e.isComposing||!Ve(e.target))return;let t=e.target;if(e.key==="Enter"&&!e.shiftKey){yn(U(t)),ft();return}if(e.key==="Escape"&&z){Q(z.draft),ft(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey)return;let o=ar(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!z||Pc(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function Oc(e){z&&Ve(e.target)&&U(e.target)!==z.shown.trim()&&ft()}function Ic(e){e.target instanceof Element&&e.target.closest(d.sendButton)&&yn(U())}var ji=p({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:ge,styles:Fi,start(){hn=new AbortController;let{signal:e}=hn;document.addEventListener("keydown",Rc,{capture:!0,signal:e}),document.addEventListener("input",Oc,{capture:!0,signal:e}),document.addEventListener("click",Ic,{capture:!0,signal:e}),document.addEventListener("submit",()=>yn(U()),{capture:!0,signal:e})},stop(){hn?.abort(),ft()},onSettingsChange(e){e==="maxEntries"&&pt(go())}});var Ki=`/*
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
`;var Bc=1500,Nc=5e3,Hc=2e3,$e=g({showDate:{type:"boolean",description:"Show the date for messages not sent today.",default:!0},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),ho=new Map,Yi=0,yo,Wi=[];function Xi(e,t){ho.get(e)!==t&&(ho.set(e,t),clearTimeout(yo),yo=setTimeout(Ji,Hc))}function Ji(){let e={...$e.store.stamps,...Object.fromEntries(ho)};$e.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,Bc))}function _c(e){let t=W(S())?.times;for(let o=e.length-1;o>=0;o--){let n=ho.get(e[o])??t?.get(e[o])??$e.store.stamps[e[o]];if(n)return n}return null}var $c=()=>H().generating||Date.now()-Yi<Nc;function qc(e){let t=new Date(e),o=new Date,n={hour:"2-digit",minute:"2-digit"};if(!$e.store.showDate||t.toDateString()===o.toDateString())return t.toLocaleTimeString(void 0,n);let r=t.getFullYear()===o.getFullYear()?{}:{year:"numeric"};return t.toLocaleString(void 0,{...r,month:"short",day:"numeric",...n})}function Vi(e){let t=Yt(e)??e.getAttribute("data-message-author-role")??e.closest(d.turn)?.getAttribute("data-turn")??e.querySelector(d.authorRole)?.getAttribute("data-message-author-role");if(Xo(t))return t;let o=nt(e).at(-1);return W(S())?.chain.find(n=>n.id===o)?.role??null}function Gc(e){let t=nt(e);if(!t.length||!Le(e)||e.querySelector("time:not([data-bloom])"))return;let o=_c(t);!o&&$c()&&(o=Date.now(),Xi(t.at(-1),o));let n=e.querySelector(':scope > time[data-bloom="timestamp"]');if(!o||$e.store.hideOwnMessages&&Vi(e)==="user"){n?.remove();return}let r=qc(o);if(n?.textContent===r)return;let i=a("time",{class:`bloom-timestamp bloom-timestamp-${Vi(e)??"assistant"}`,text:r,title:new Date(o).toLocaleString(),attrs:{"data-bloom":"timestamp",datetime:new Date(o).toISOString()}});n?n.replaceWith(i):e.prepend(i)}var bo=Me(()=>{for(let e of Zo())Gc(e)}),Zi=p({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:$e,styles:Ki,start(){Wi=[P(e=>K(e)&&bo()),I.on("conversation",bo),I.on("message-time",({messageId:e,time:t})=>{Xi(e,t),bo()}),x.on("fall",()=>{Yi=Date.now()})]},stop(){for(let e of Wi)e();yo&&(clearTimeout(yo),Ji());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();bo()}}});var Uc=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])'],zc=['[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],Qi=g({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),ea=p({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:Qi,styles:()=>we([...Uc,...Qi.store.hideDictationSettings?zc:[]])});var Fc=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],jc=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])'],vn=g({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),ta=p({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:vn,styles:()=>we([...vn.store.hideShareChat?Fc:[],...vn.store.hideShareProject?jc:[]])});var oa='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',Kc='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',Wc="[data-bloom-profile-plan]",na="visibility:hidden!important;user-select:none!important",ia=g({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function Vc(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=ia.store,r=[];return e&&r.push(n?`:is(${oa}){display:none!important}`:`:is(${oa}){${na}}`),t&&r.push(`:is(${Kc}){${na}}`),e&&o&&r.push(`${Wc}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var ra,aa=p({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:ia,styles:Vc,start(){ra=Ne()},stop(){ra?.()}});var sa=`/*
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
`;var k=E("bloom-queue-"),Xc=6,Jc=8,G=null,gt="",vo=!1,he=!1;function Sn(e,t,o){let n=$(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute("title"),n.addEventListener("mouseenter",()=>la(t)),n.addEventListener("mouseleave",()=>la("")),n}function la(e){let t=G?.querySelector(`.${k("tip")}`);t&&(t.textContent=e)}function Zc(e,t,o,n){he=!0;let r=a("textarea",{class:`bloom-input ${k("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=s=>{he=!1,gt="",s&&n.edit(t,r.value)};r.addEventListener("keydown",s=>{s.stopPropagation(),!s.isComposing&&(s.key==="Enter"&&!s.shiftKey?(s.preventDefault(),i(!0)):s.key==="Escape"&&(s.preventDefault(),i(!1)))}),r.addEventListener("blur",()=>he&&i(!0),{once:!0}),e.querySelector(`.${k("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function Qc(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,s=l=>{!i&&Math.abs(l.clientY-n.clientY)<Xc||(i||(i=he=!0,e.classList.add(k("dragging"))),e.style.transform=`translateY(${l.clientY-n.clientY}px)`)},c=l=>{if(removeEventListener("pointermove",s),!i)return;he=!1,gt="";let f=[...r.children].filter(C=>C!==e).filter(C=>C.getBoundingClientRect().top+C.getBoundingClientRect().height/2<l.clientY).length;o.move(t,f)};addEventListener("pointermove",s),addEventListener("pointerup",c,{once:!0})})}function ed(e,t,o){let n=a("li",{class:k("row")},a("div",{class:k("text"),text:e}),a("div",{class:k("actions")},Sn("trash","Remove from queue",()=>o.remove(t)),Sn("edit","Edit",()=>Zc(n,t,e,o)),Sn("send","Send now",()=>o.sendNow(t))));return Qc(n,t,o),n}function td(e){if(!G)return;let t=e.getBoundingClientRect();G.style.left=`${t.left}px`,G.style.width=`${t.width}px`,G.style.bottom=`${innerHeight-t.top+Jc}px`}function xn(){G?.remove(),G=null,gt="",he=!1}function So(e,t){let o=Do();if(!e.length||!We(o)){xn();return}G||(G=a("div",{class:`bloom-root ${k("tray")}`,attrs:{"data-bloom":"queue"}},a("div",{class:k("header")},a("button",{class:k("toggle"),attrs:{type:"button"},on:{click:()=>{vo=!vo,G?.classList.toggle(k("collapsed"),vo)}}},a("span",{class:k("count")}),D("chevron")),a("span",{class:k("tip")})),a("ol",{class:k("list")})),G.classList.toggle(k("collapsed"),vo),document.body.append(G)),td(o);let n=JSON.stringify(e);if(he||n===gt)return;gt=n;let r=G.querySelector(`.${k("count")}`);r&&(r.textContent=wt(e.length,"Queued message")),G.querySelector(`.${k("list")}`)?.replaceChildren(...e.map((i,s)=>ed(i,s,t)))}var od=8,nd=150,rd=20,ua=g({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1}}),ye=new Map,xo=!1,ve=null,wn,ca=[],En="draft",Tn=()=>S()??En,V=()=>ye.get(Tn())??[];function Se(e){e.length?ye.set(Tn(),e):ye.delete(Tn()),So(V(),Mn)}function wo(e,t=0){if(H().generating||U()){t<rd&&setTimeout(()=>wo(e,t+1),nd);return}Q(e),Io(()=>{lr()||Q("")})}function da(){if(ve!=null){let o=ve;ve=null,wo(o);return}if(!xo||H().generating||U())return;let[e,...t]=V();e!=null&&(xo=!1,Se(t),wo(e))}function ma(e){let t=V(),o=t[e];if(o!=null){if(Se(t.filter((n,r)=>r!==e)),!H().generating){wo(o);return}ve=o,Bt()?.click()}}var Mn={remove:e=>Se(V().filter((t,o)=>o!==e)),edit:(e,t)=>Se(t.trim()?V().map((o,n)=>n===e?t:o):V().filter((o,n)=>n!==e)),sendNow:ma,move(e,t){let o=[...V()],[n]=o.splice(e,1);o.splice(t,0,n),Se(o)}};function id(e){let t=V();return ua.store.replacePending&&t.length?(Se([...t.slice(0,-1),e]),!0):t.length>=od?!1:(Se([...t,e]),!0)}function ad(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!Ve(e.target)||!H().generating)return;let t=U(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;Q(""),ve=t,Bt()?.click();return}if(!t){V().length&&ma(0);return}id(t)&&Q("")}var pa=p({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:ua,styles:sa,start(){wn=new AbortController,document.addEventListener("keydown",ad,{capture:!0,signal:wn.signal}),ca=[x.on("fall",({outcome:e})=>{xo=e==="done",e==="left"&&(ve=null),da()}),x.on("context",({prevId:e,id:t,migrated:o})=>{let n=ye.get(En);ye.delete(En),o&&!e&&t&&n&&ye.set(t,n),o||(xo=!1),So(V(),Mn)}),x.on("tick",()=>{da(),So(V(),Mn)})]},stop(){wn?.abort();for(let e of ca)e();xn(),ye.clear(),ve=null}});var sd=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function ld(){let e=N(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!sd.has(e.toLowerCase())?e:null}function bt(e){return e?W(e)?.title??Dr(e)??(e===S()?ld():null):null}var fa=`/*
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
`;var te=E("bloom-recent-"),oe="home",dd=50,ga=140,ud=new Set(["Backquote"]),md=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),y=g({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),le=null,X=[],J=0,Cn,ba=[],Mo=()=>vr()?null:S()??(pe()?oe:null);function ha(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function va(e){let t=bt(e);t&&y.store.titles[e]!==t&&(y.store.titles={...y.store.titles,[e]:t});let o=Br(location.href);o&&e===S()&&y.store.projects[e]!==o&&(y.store.projects={...y.store.projects,[e]:o})}function ya(e){if(!e)return;let t=[e,...y.store.visits.filter(n=>n!==e)].slice(0,dd),o=new Set(t);y.store.visits=t,Object.keys(y.store.previews).some(n=>!o.has(n))&&(y.store.previews=ha(y.store.previews,o)),Object.keys(y.store.titles).some(n=>!o.has(n))&&(y.store.titles=ha(y.store.titles,o)),e!==oe&&va(e)}function Eo(e){if(!e||!y.store.visits.includes(e))return;let t={},o=W(e)?.chain??[];for(let r of o)t[r.role]=xe(Zt(r),ga);if(e===S())for(let r of Xt()){let i=Jt(r);i&&(t[r.role]=xe(i,ga))}let n=y.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(y.store.previews={...y.store.previews,[e]:t})}function pd(){let e=Number(y.store.maxRecent);return y.store.visits.filter(t=>t!==oe||y.store.includeHome).slice(0,e)}function Ln(e){if(ht(),e===Mo())return;let t=e===oe?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"]'):Qe(e)[0];t?t.click():location.assign(e===oe?"/":`/c/${e}`)}function fd(e,t){let o=e===oe?"New chat":y.store.titles[e]??bt(e)??"Untitled chat",n=e===oe?null:y.store.projects[e],r=e===oe?null:y.store.previews[e];return a("button",{class:te("item"),attrs:{type:"button",role:"option","aria-selected":String(t===J)},on:{click:()=>Ln(e),mousemove:()=>t!==J&&To(t)}},a("div",{class:te("head")},a("span",{class:`${te("title")} bloom-truncate`,text:o}),n&&a("span",{class:te("project"),text:n})),r?.user&&a("div",{class:`${te("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&a("div",{class:`${te("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function To(e){J=(e+X.length)%X.length,le?.querySelectorAll(`.${te("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===J)))}function gd(){Eo(S());let e=Mo();X=pd(),e&&(X=[e,...X.filter(t=>t!==e)].slice(0,Number(y.store.maxRecent))),X.length&&(J=X.length>1?1:0,le=a("div",{class:`bloom-root ${te("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:t=>t.target===t.currentTarget&&ht()}},a("div",{class:te("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...X.map(fd))),document.body.append(le))}function ht(){le?.remove(),le=null}var bd=e=>ud.has(e.code)||md.has(e.key);function hd(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&bd(e)){e.preventDefault(),e.stopPropagation(),le?To(J+(e.shiftKey?-1:1)):gd();return}if(!le)return;let o={Escape:ht,Enter:()=>Ln(X[J]),ArrowDown:()=>To(J+1),ArrowUp:()=>To(J-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function yd(e){le&&e.key==="Control"&&Ln(X[J])}var Sa=p({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:y,styles:fa,start(){Cn=new AbortController;let{signal:e}=Cn;addEventListener("keydown",hd,{capture:!0,signal:e}),addEventListener("keyup",yd,{capture:!0,signal:e}),addEventListener("blur",ht,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&Eo(S()),{signal:e}),ba=[re(({prevId:i})=>{Eo(i),ya(Mo())}),I.on("conversation",({id:i})=>{y.store.visits.includes(i)&&va(i),Eo(i)})];let{visits:t,titles:o,previews:n}=y.store,r=t.filter(i=>i!==oe&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(y.store.visits=t.filter(i=>!r.includes(i))),ya(Mo())},stop(){Cn?.abort();for(let e of ba)e();ht()}});var vd=new v("ResponseNotification"),Sd=[880,1318.5],xd=.14,xa=.22,wd=.08,wa=1e-4,Ed=.02,yt=g({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the built-in chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",description:"Try the sound.",render:e=>(e.append(_("Play",Ta)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),An=null,Ea,kn;function Td(){An??=new AudioContext;let e=An.currentTime;Sd.forEach((t,o)=>{let n=An,r=e+o*xd,i=n.createOscillator(),s=n.createGain();i.frequency.value=t,s.gain.setValueAtTime(wa,r),s.gain.exponentialRampToValueAtTime(wd,r+Ed),s.gain.exponentialRampToValueAtTime(wa,r+xa),i.connect(s).connect(n.destination),i.start(r),i.stop(r+xa)})}function Ta(){let e=yt.store.soundUrl.trim();e?new Audio(e).play().catch(t=>vd.warn("Custom sound failed",t)):Td()}function Md(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function Cd(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(kn=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:kn.signal}))}var Ma=p({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:yt,start(){Cd(),Ea=x.on("fall",({conversationId:e,outcome:t})=>{t==="done"&&(yt.store.onlyWhenHidden&&!document.hidden||(yt.store.sound&&Ta(),yt.store.browserNotification&&Md(bt(e))))})},stop(){Ea?.(),kn?.abort()}});var Ld="filter:blur(6px)!important;transition:filter 0.2s ease",Ca=`:is(${d.sidebars})`,Ad={conversations:{selectors:[`${Ca} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0},projects:{selectors:[`${Ca} a:is([href*="/project"], [href*="/g/g-p-"])`,".bloom-recent-project"],hover:!0},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}},Aa=g({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function kd(){return Object.entries(Ad).filter(([e])=>Aa.store[e]).map(([,{selectors:e,hover:t}])=>{let o=e.join(",");return`:is(${o}){${Ld}}`+(t?`:is(${o}):hover, .bloom-recent-item:hover :is(${o}){filter:none!important}`:"")}).join(`
`)}var La,ka=p({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:Aa,styles:kd,start(){La=Ne()},stop(){La?.()}});var Pd=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],Rd=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",Od='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',Pa=g({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function Id(){let e=`${Pa.store.width}rem`;return`:is(${Rd}){${Pd.map(t=>`${t}:${e}!important`).join(";")}}:is(${Od}){max-width:min(100%, ${e})!important}`}var Ra=p({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:Pa,styles:Id});var Dd=[Kr,ai,ci,Si,wi,Ti,Di,Ui,ji,Zi,ea,ta,aa,pa,Sa,Ma,ka,Ra],Pn=Dd;var Bd=new v("Bloom"),Oa="2.0.8";async function Rn(){br();for(let e of Pn)e.updatedAt=Mr[e.name];Yn(Pn),await jn(),Et("base",tr),Tr(),Rt("Init"),await Ye(),_n(),Rt("DOMContentLoaded"),await _t(),Rt("HostReady"),Bd.info(`Bloom++ ${Oa} ready`)}var Ia=new v("Boot");if(window===window.top){let e=j.Bloom;e&&Ia.warn("Replacing another Bloom++ instance",e.VERSION),Object.defineProperty(j,"Bloom",{value:On,configurable:!0,writable:!0}),Rn().catch(t=>Ia.error("Startup failed",t))}})();
