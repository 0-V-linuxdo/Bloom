// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260929] v2.0.14
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

/* Bloom++ [20260929] v2.0.14. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var qa=Object.defineProperty;var Ga=(e,t)=>{for(var o in t)qa(e,o,{get:t[o],enumerable:!0})};var S=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var xt=(e,t,o)=>Math.min(o,Math.max(t,e)),T=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Hn=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,xe=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,R=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function wt(e,t){return`${e} ${t}${e===1?"":"s"}`}async function _n(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function qe(e){try{return JSON.parse(e)}catch{return}}var K=typeof unsafeWindow>"u"?window:unsafeWindow;var Nn={};Ga(Nn,{VERSION:()=>Ha,init:()=>Dn,plugins:()=>de});var Ua=new S("Styles"),Ge=new Map,$n=new Set,Ue=new Map,Lo=!0;function qn(){let e=document.adoptedStyleSheets.filter(t=>!$n.has(t));document.adoptedStyleSheets=[...e,...Ge.values()]}function Gn(e){document.readyState==="loading"||e.parentNode===document.head||document.head.append(e)}function za(e,t){let o=Ue.get(e);o||(o=document.createElement("style"),o.id=`bloom-style-${e}`,Ue.set(e,o)),o.textContent!==t&&(o.textContent=t),Gn(o)}function Et(e,t){if(Lo)try{let o=Ge.get(e);o||(o=new K.CSSStyleSheet,Ge.set(e,o),$n.add(o)),o.replaceSync(t),qn();return}catch(o){Ua.warn("Constructed style sheets unavailable, using <style> after parsing",o),Lo=!1,Ge.delete(e)}za(e,t)}function ko(e){Ge.delete(e)&&Lo&&qn(),Ue.get(e)?.remove(),Ue.delete(e)}function Un(){for(let e of Ue.values())Gn(e)}var E=e=>(...t)=>t.map(o=>e+o).join(" "),Tt=(...e)=>e.filter(Boolean).join(" "),we=e=>e.length?`${e.join(",")}{display:none!important}`:"";function p(e){return e}var Mt=new S("Storage"),ja="bloompp",Ct="kv",zn=null;function Fa(){return zn??=new Promise((e,t)=>{let o=indexedDB.open(ja,1);o.onupgradeneeded=()=>{o.result.objectStoreNames.contains(Ct)||o.result.createObjectStore(Ct)},o.onsuccess=()=>e(o.result),o.onerror=()=>t(o.error)}),zn}function jn(e,t){return Fa().then(o=>new Promise((n,r)=>{let i=t(o.transaction(Ct,e).objectStore(Ct));i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)}))}async function Ka(e){if(typeof GM_getValue=="function")try{return await GM_getValue(e)}catch(t){Mt.warn("GM read failed",t);return}}async function Wa(e){try{return await jn("readonly",t=>t.get(e))}catch(t){Mt.warn("IndexedDB read failed",t);return}}function Va(e){try{return localStorage.getItem(e)??void 0}catch{return}}async function Fn(e){return Promise.all([Ka(e),Wa(e),Va(e)])}function Kn(e,t){let o=JSON.stringify(t);if(typeof GM_setValue=="function")try{GM_setValue(e,t)}catch{GM_setValue(e,o)}try{localStorage.setItem(e,o)}catch(n){Mt.warn("localStorage write failed",n)}jn("readwrite",n=>n.put(o,e)).catch(n=>Mt.warn("IndexedDB write failed",n))}var Ya=new S("Settings"),Vn="BloomSettings",Xa=100,Ja=["GM","IndexedDB","localStorage"],At={plugins:{}},Po=new Set,ze;function Za(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=qe(t);return!T(t)||!T(t.plugins)||!Object.keys(t.plugins).length?null:t}var Ro=e=>e==null||e===""||(Array.isArray(e)?!e.length:T(e)&&!Object.keys(e).length);function Qa(e){return Ro(e)?0:Array.isArray(e)?12+Math.min(e.length,40):T(e)?12+Math.min(Object.keys(e).length,40):3}function es(e){let t=0;for(let o of Object.values(e.plugins))if(T(o))for(let[n,r]of Object.entries(o))n!=="enabled"&&(t+=Qa(r));return t}var Wn=e=>Object.values(e.plugins).filter(t=>T(t)&&t.enabled===!0).length;function ts(e){let t=e.map((i,s)=>i&&{candidate:i,index:s,score:es(i)}).filter(i=>i!=null).toSorted((i,s)=>s.score-i.score||(i.score?0:Wn(s.candidate)-Wn(i.candidate))||i.index-s.index);if(!t.length)return null;let[o,...n]=t,r=structuredClone(o.candidate);for(let{candidate:i}of n)for(let[s,c]of Object.entries(i.plugins)){if(!T(c))continue;let l=r.plugins[s]??={};for(let[u,f]of Object.entries(c))u==="enabled"?!("enabled"in l)&&f===!0&&(l.enabled=!0):Ro(l[u])&&!Ro(f)&&(l[u]=structuredClone(f));Object.keys(l).length||delete r.plugins[s]}return{bag:r,source:Ja[o.index]}}async function Yn(){let e=await Fn(Vn),t=ts(e.map(Za));t&&(At.plugins=t.bag.plugins,Ya.info("Loaded settings from",t.source))}function Xn(){ze=void 0,Kn(Vn,At)}function os(){ze&&(clearTimeout(ze),Xn())}var le=(e,t)=>At.plugins[e]?.[t];function ce(e,t,o){let n=At.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,clearTimeout(ze),ze=setTimeout(Xn,Xa);for(let r of Po)r(e,t)}function Ee(e){return Po.add(e),()=>void Po.delete(e)}function Oo(e){return e.type==="component"?void 0:e.default}function g(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>le(t.pluginName,n)??(e[n]&&Oo(e[n])),set:(o,n,r)=>(ce(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&le(t.pluginName,o)!==void 0&&ce(t.pluginName,o)}};return t}var Jn=e=>{let t=()=>{let o=le("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();ce("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},Lt=Jn("pinnedPlugins"),kt=Jn("starredPlugins");addEventListener("pagehide",os);var Pt=new S("PluginManager"),de=new Map,je=new Set,Zn=new Set,Io=new Set;function Qn(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),de.set(t.name,t)}var Fe=e=>!!e.required||(le(e.name,"enabled")??!!e.enabledByDefault);var Bo=e=>`plugin-${e.name}`;function er(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?Et(Bo(e),t):ko(Bo(e))}function tr(e){if(!je.has(e.name))try{er(e),e.start?.(),je.add(e.name)}catch(t){Pt.error(`Failed to start ${e.name}`,t)}}function ns(e){if(je.delete(e.name)){ko(Bo(e));try{e.stop?.()}catch(t){Pt.error(`Failed to stop ${e.name}`,t)}}}var or=e=>e.startAt??"HostReady";function Rt(e){Zn.add(e);for(let t of de.values())or(t)===e&&Fe(t)&&tr(t);Pt.info(`${e}: ${[...je].join(", ")}`)}function nr(e,t){ce(e.name,"enabled",t),t?Zn.has(or(e))&&tr(e):ns(e);for(let o of Io)o()}function rr(e){return Io.add(e),()=>void Io.delete(e)}Ee((e,t)=>{let o=de.get(e);if(!(!o||t==="enabled"||!je.has(e)))try{er(o),o.onSettingsChange?.(t)}catch(n){Pt.error(`Settings change failed for ${e}`,n)}});var ir=`/*
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
`;var is=new S("Dom");function a(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var ar=document.createElement("template");function sr(e){return ar.innerHTML=e.trim(),ar.content.firstElementChild.cloneNode(!0)}var We=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),Te=(e,t=document)=>[...t.querySelectorAll(e)].find(We)??null,as=16,ss="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function lr(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([ss],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function Do(e){document.hidden?setTimeout(e,as):requestAnimationFrame(e)}function Me(e){let t=!1;return()=>{t||(t=!0,Do(()=>{t=!1;try{e()}catch(o){is.error("Scheduled task failed",o)}}))}}var Ot=new Set,It=[],Ke,ls=Me(()=>{let e=It;It=[];for(let t of Ot)t(e)});function C(e){return Ot.add(e),Ke||(Ke=new MutationObserver(t=>{It.push(...t),ls()}),Ke.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{Ot.delete(e),!Ot.size&&(Ke?.disconnect(),Ke=void 0,It=[])}}var cs=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),H=e=>!e.length||e.some(t=>!cs(t.target));function ue(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size");return}e.getAttribute("data-bloom-text")!==t&&(e.hasAttribute("data-bloom-text")||e.style.setProperty("--bloom-text-size",getComputedStyle(e).fontSize),e.setAttribute("data-bloom-text",t))}var ds=new S("Events");function Bt(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){ds.error(`Listener for ${String(t)} failed`,r)}}}}var d={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]'};var cr=/[​-‍﻿]/g,Ce=()=>Te(d.composerInput),Ve=e=>e instanceof HTMLElement&&e.matches(d.composerInput),No=(e=Ce())=>e?.closest("form")??document.querySelector(d.oldComposerForm);function z(e=Ce()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(cr,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(cr,"").trim()}var us=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function Q(e,t=Ce()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return us?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function dr(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:s,value:c}=e;return{first:!c.slice(0,i).includes(`
`),last:!c.slice(s).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var ur=e=>{let t=No();return(t&&Te(e,t))??Te(e)},Dt=()=>ur(d.stopButton),ms=()=>{let e=ur(d.sendButton);return e&&!e.matches(d.stopButton)?e:null};function mr(){let e=ms();if(e&&!e.disabled)return e.click(),!0;let t=Ce();return t?(t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),!0):!1}var pr=()=>We(Dt());var br=new S("Network"),ps=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,fs=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,Ht=1e3,gs=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),B=Bt(),Ho=new Map,fr=new Map,bs=1,W=e=>e?Ho.get(e)??null:null;function Nt(e){let t=Ho.get(e);return t||Ho.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var hr=e=>e==="user"||e==="assistant";function yr(e){let t=e.author?.role;if(!e.id||!hr(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(l=>typeof l=="string").join(`
`).trim(),i=n.filter(l=>T(l)&&l.content_type==="image_asset_pointer").length,s=e.metadata?.attachments,c=Array.isArray(s)&&s.length>0;return!r&&!i&&!c?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*Ht:null,text:r,hasFiles:c,imageCount:i}}var vr=e=>e.filter((t,o)=>t.role==="user"||e[o+1]?.role!=="assistant");function hs(e,t){let o=t.filter(T).map(i=>T(i.message)?i.message:i);for(let i of o)i.id&&i.create_time&&e.times.set(i.id,i.create_time*Ht);let n=o.map(yr).filter(i=>i!=null),r=new Set(n.map(i=>i.id));return e.chain=vr([...e.chain.filter(i=>!r.has(i.id)),...n]),e}function ys(e,t){if(!T(t)||!(T(t.mapping)||Array.isArray(t.messages)))return null;let o=Nt(e);if(typeof t.title=="string"&&t.title&&(o.title=t.title),Array.isArray(t.messages))return hs(o,t.messages);let n=t.mapping;for(let c of Object.values(n)){let l=c.message?.create_time;c.message?.id&&l&&o.times.set(c.message.id,l*Ht)}let r=[],i=new Set,s=typeof t.current_node=="string"?t.current_node:null;for(;s&&!i.has(s)&&n[s];){i.add(s);let c=n[s].message,l=c?yr(c):null;l&&r.push(l),s=n[s].parent??null}return r.length&&(o.chain=vr(r.toReversed())),o}function vs(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}function Ss(e){if(typeof e?.body!="string")return null;let t=qe(e.body);return T(t)&&typeof t.conversation_id=="string"?t.conversation_id:null}function xs(e,t){if(!T(e))return;typeof e.type=="string"&&gs.has(e.type)&&(t.handoff=!0);let o=T(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(Nt(e.conversation_id).title=e.title,B.emit("conversation",Nt(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&hr(n.author?.role)){let r=n.create_time*Ht;t.conversationId&&Nt(t.conversationId).times.set(n.id,r),B.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function ws(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:s}=await o.read();if(i)break;r+=n.decode(s,{stream:!0});let c=r.split(`
`);r=c.pop()??"";for(let l of c){if(!l.startsWith("data:"))continue;let u=l.slice(5).trim();u&&u!=="[DONE]"&&xs(qe(u),t)}}}async function Es(e,t,o){let n={conversationId:t,error:!1,handoff:!1};fr.set(e,t),B.emit("generate-start",{requestId:e,conversationId:t});try{let r=await o;r.ok?r.headers.get("content-type")?.includes("event-stream")&&await ws(r.clone(),n):n.error=!0}catch(r){let i=r instanceof DOMException&&r.name==="AbortError";n.handoff||=i,n.error||=!i}finally{fr.delete(e),B.emit("generate-end",{requestId:e,...n})}}async function Ts(e,t){try{let o=await t;if(!o.ok)return;let n=ys(e,await o.clone().json());n&&B.emit("conversation",n)}catch(o){br.debug("Conversation read skipped",o)}}function Ms(e,t,o){let n=vs(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&ps.test(n.pathname)){Es(bs++,Ss(t),o);return}let i=r==="GET"&&n.pathname.match(fs)?.[1];i&&Ts(i,o)}var gr=!1;function Sr(){if(gr)return;gr=!0;let e=K.fetch,t=function(o,n){let r=e.call(this??K,o,n);try{Ms(o,n,r)}catch(i){br.error("Fetch tap failed",i)}return r};K.fetch=typeof exportFunction=="function"?exportFunction(t,K):t}var Cs="__reactContainer$",xr="__reactFiber$";function _t(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var _o=(e,t)=>Object.keys(e.wrappedJSObject??e).some(o=>o.startsWith(t)),Ae=e=>!_o(document,Cs)||_o(e,xr);function Ye(){return document.body?Promise.resolve():new Promise(e=>{let t=new MutationObserver(()=>{document.body&&(t.disconnect(),e())});t.observe(document,{childList:!0,subtree:!0})})}async function wr(){await Ye();let e=Date.now()+8e3;for(;!_o(document.body,xr)&&Date.now()<e;)await new Promise(t=>setTimeout(t,100))}var As=new S("Route"),Er=/\/c\/(?!local-)([\w-]+)/,Ls=500,Go=e=>{try{return new URL(e,location.origin).pathname.match(Er)?.[1]??null}catch{return null}},v=()=>location.pathname.match(Er)?.[1]??null,me=()=>location.pathname==="/",Tr=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",qt=new Set,Gt=location.href,qo=v(),$t;function $o(){if(location.href===Gt)return;let e={prevHref:Gt,href:location.href,prevId:qo,id:v()};Gt=e.href,qo=e.id;for(let t of qt)try{t(e)}catch(o){As.error("Route listener failed",o)}}function ks(){let e=new AbortController,{navigation:t}=K;t?.addEventListener("currententrychange",()=>queueMicrotask($o),{signal:e.signal}),addEventListener("popstate",$o,{signal:e.signal});let o=setInterval($o,Ls);return()=>{e.abort(),clearInterval(o)}}function ne(e){return qt.add(e),$t||(Gt=location.href,qo=v(),$t=ks()),()=>{qt.delete(e),!qt.size&&($t?.(),$t=void 0)}}var Ps=250,Rs=400,Os=6e4,Is=5e3,Bs=`:is(${d.turn}) :is(${d.turnBusy})`,x=Bt(),jt=new Set,Uo=new Set,re=!1,Cr=0,Le=null,ke=!1,Ut=!1,Xe=0,Je=null,Mr=!1,_=()=>({generating:re,conversationId:v()}),Ar=()=>pr()||!!document.querySelector(Bs);function Ds(){let e=Ar();return e?Ut||(Xe=0):Ut=!1,[...jt].some(t=>!Uo.has(t))||e&&!Ut||Date.now()<Xe}function Ns(){return Je?.error?"error":ke?"stopped":"done"}function Hs(){Le=null,re=!1,x.emit("fall",{conversationId:v(),outcome:Ns()}),ke=!1,Je=null}function Lr(){let e=Ds();e&&!re&&(re=!0,Cr=Date.now(),ke=!1,Je=null,x.emit("rise",{conversationId:v()})),e||!re?Le=null:Le==null?Le=Date.now():Date.now()-Le>=Rs&&Hs()}function zt(){Lr(),x.emit("tick",_())}function _s({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(re||Date.now()-Cr<Os);if(!o&&re){for(let n of jt)Uo.add(n);Ut=Ar(),Xe=0,Le=null,re=!1,ke=!1,Je=null,x.emit("fall",{conversationId:e,outcome:"left"})}x.emit("context",{prevId:e,id:t,migrated:o}),zt()}function $s(e){e.target instanceof Element&&e.target.closest(d.stopButton)&&(ke=!0,Xe=0)}function kr(){Mr||(Mr=!0,B.on("generate-start",({requestId:e})=>{jt.add(e),zt()}),B.on("generate-end",e=>{jt.delete(e.requestId),!Uo.delete(e.requestId)&&(Je=e,Xe=e.handoff&&!e.error&&!ke?Date.now()+Is:0,zt())}),ne(_s),document.addEventListener("click",$s,!0),lr(zt,Ps),_t().then(()=>C(Lr)))}var Pr={BetterNavigator:1790616549e3,ChatListStatus:1790649198e3,ChatStateFavicons:1790623094e3,Cleaner:1790622654e3,ComposerOpacity:1790616549e3,CustomSidebarIdentity:1790658669e3,GreetingCustomizer:1790616549e3,InputHistory:1790658669e3,MessageTimestamps:1790649198e3,NoDictation:1790653816e3,NoShareLink:1790658669e3,NoSidebarIdentity:1790616549e3,PromptQueue:1790620238e3,RecentTopics:1790620238e3,ResponseNotification:1790616549e3,Settings:1790653816e3,StreamerMode:1790616549e3,WiderChat:1790616549e3};var b=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,qs="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",Gs={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${qs}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:b('<path d="M18 6 6 18M6 6l12 12"/>'),gear:b('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:b('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:b('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:b('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:b('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:b('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:b('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:b('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:b('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:b('<path d="m6 9 6 6 6-6"/>'),play:b('<path d="M7 4v16l13-8z"/>'),plus:b('<path d="M12 5v14M5 12h14"/>'),check:b('<path d="m5 12 5 5 9-10"/>'),alert:b('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:b('<path d="M4 5h16v11H9l-5 4z"/>'),layout:b('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:b('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:b('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:b('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:b('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:b('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:b('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:b('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:b('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:b('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:b('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:b('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:b('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:b('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:b('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),grip:b('<path d="M9 6h0M15 6h0M9 12h0M15 12h0M9 18h0M15 18h0"/>')},D=e=>sr(Gs[e]);var Us=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,Rr=/\S+@\S+\.\S+/,zs=3,js=/^\/g\/(g-p-[^/]+)\//,Fs=/^g-p-[0-9a-f]+-?/i,Or=e=>!!e.closest(".sr-only"),zo=e=>!!e?.querySelector(d.menuButton);function Ir(){return[...document.querySelectorAll(d.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(zo)).filter(e=>e!=null)}function Br(){let e=[...document.querySelectorAll(d.oldProfile)];if(e.length)return e.map(o=>{let n=o.parentElement?.children.length===1?o.parentElement:o;return{kind:"profile",anchor:n,insert:r=>n.before(r)}});let t=Ir().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(d.rail)){let n=[...o.children].find(zo);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}var jo=e=>!e.closest("[data-bloom]")&&(!!e.querySelector("img, [class*=rounded-full]")||_r(e).some(t=>!Or(t))),Dr=e=>[...e.parentElement?.children??[]].find(t=>t!==e&&t instanceof HTMLElement&&jo(t))??null;function Nr(){let e=[...document.querySelectorAll(d.oldProfile)];return e.length?e:[...Ir(),...[...document.querySelectorAll(d.rail)].map(o=>[...o.children].findLast(zo))].map(o=>[...o?.querySelectorAll(d.menuButton)??[]].findLast(n=>jo(n)||Dr(n))).filter(o=>o!=null)}var Hr=()=>Nr().map(e=>jo(e)?e:Dr(e)).filter(e=>e!=null);function _r(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!R(t.textContent??"")&&!(t instanceof SVGElement))}var Ks=e=>{if(/rounded-full/.test(e.getAttribute("class")??""))return!0;if(!e.clientWidth)return!1;let{borderRadius:t}=getComputedStyle(e);return t.includes("%")||Number.parseFloat(t)>=e.clientWidth/2};function Ft(e,t,o){for(let n of e.querySelectorAll(`[${t}]`))n!==o&&n.removeAttribute(t);o&&!o.hasAttribute(t)&&o.setAttribute(t,"")}function Ws(e,t){if(R(e.textContent??"").length>zs)return null;let o=e.closest("button");for(let n=e;n&&n!==t&&n!==o;n=n.parentElement)if(Ks(n))return n;return null}function Fo(e,t){e.hasAttribute(`data-bloom-${t}`)||e.setAttribute(`data-bloom-${t}`,"");let o=e.querySelector("img:not([data-bloom] img)"),n=_r(e),r=o?null:n.map(f=>Ws(f,e)).find(f=>f!=null),i=o?.closest("[class*=rounded-full]"),s=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");Ft(e,`data-bloom-${t}-avatar`,s);let c=n.filter(f=>!s?.contains(f)&&!Or(f)),l=c.find(f=>Us.test(R(f.textContent??""))),u=c.find(f=>Rr.test(f.textContent??""));Ft(e,`data-bloom-${t}-plan`,l),Ft(e,`data-bloom-${t}-email`,u),Ft(e,`data-bloom-${t}-name`,c.find(f=>f!==l&&f!==u))}function Vs(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function Kt(){return Nr().map(Vs).find(e=>e!=null)??[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&(Rr.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var Ze=e=>[...document.querySelectorAll(d.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&Go(t.href)===e);function $r(e){let t=Ze(e).find(o=>R(o.textContent??""));return t?R(t.textContent??""):null}function qr(e){let t=new URL(e,location.origin).pathname.match(js)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!Go(n.href)&&R(n.textContent??""));return o?R(o.textContent??""):t.replace(Fs,"").replaceAll("-"," ")||null}function Ko(e,t,o){let n=a("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o}});return n.addEventListener("click",r=>{r.stopPropagation();let i=n.getAttribute("aria-checked")!=="true";n.setAttribute("aria-checked",String(i)),t(i)}),n}function $(e,t,o){return a("button",{class:Tt("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button"},on:{click:t}})}function q(e,t,o,n){let r=a("button",{class:"bloom-icon-button",title:t,attrs:{type:"button","aria-label":t},on:{click:o}},D(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function Wt(e,t,o,n,r,i){let s=a("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});s.value=String(e);let c=a("output",{text:`${s.value}${r}`});return s.addEventListener("input",()=>{c.textContent=`${s.value}${r}`,i(Number(s.value))}),a("div",{class:"bloom-slider"},s,c)}function Wo(e,t,o){let n=a("select",{class:"bloom-select"},...t.map(r=>a("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function Qe(e,t,o="",n="text"){let r=a("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var Ys=new S("SettingsPanel"),m=E("bloom-settings-"),Xs=10080*60*1e3,Js=3e3,Gr="Toggle features. Some need a reload. Click the sliders icon to configure.",Zs=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Qs=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],el={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},Ur=new Set(["chat","ui","privacy"]),N=null,Pe="all",Vo="all",Vt="",Yo=[],zr=()=>[...de.values()].filter(e=>!e.hidden),tl=e=>!!e.updatedAt&&Date.now()-e.updatedAt<Xs;function ol(e){switch(Pe){case"favorites":return kt.has(e.name);case"recent":return tl(e);case"all":return!0;case"other":return!e.tags.some(t=>Ur.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(Pe)}}function nl(e){switch(Vo){case"all":return!0;case"enabled":return Fe(e);case"disabled":return!Fe(e)}}function rl(e){let t=Vt.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function il(e){let t=Lt.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return Pe==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var jr=e=>e.settings?.def??{},al=e=>Object.values(jr(e)).some(t=>t.type!=="custom");function sl(e,t,o){let n=le(e.name,t)??Oo(o),r=i=>ce(e.name,t,i);switch(o.type){case"boolean":return Ko(n,r,o.description??t);case"slider":return Wt(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return Wo(n,o.options,r);case"string":return Qe(n,r,o.placeholder);case"number":return Qe(String(n),i=>r(Number(i)),"","number");case"component":{let i=a("div",{class:m("component")});return Yo.push(o.render(i)),i}case"custom":return null}}var ll=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function Fr(e){if(!N)return;let t=Object.entries(jr(e)).filter(([,i])=>i.type!=="custom").map(([i,s])=>{let c=sl(e,i,s),l=s.type==="boolean";return a("div",{class:m("field",l?"field-inline":"field-stacked")},a("div",{class:m("field-text")},s.type!=="component"&&a("div",{class:m("field-label"),text:ll(i)}),s.description&&a("div",{class:m("field-desc"),text:s.description})),c)}),o,n=$("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},Js);return}clearTimeout(o),e.settings?.reset(),et(),Fr(e)},"danger"),r=a("div",{class:m("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&et()}},a("div",{class:m("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},a("div",{class:m("popup-header")},a("div",{class:m("card-icon")},D(e.icon)),a("div",{class:m("popup-title")},a("div",{class:m("card-name"),text:e.name}),a("div",{class:m("popup-authors"),text:e.authors.join(", ")})),q("close","Close",et)),a("p",{class:m("popup-desc"),text:e.description}),a("div",{class:m("fields")},...t),a("div",{class:m("popup-footer")},n)));N.querySelector(`.${m("modal")}`)?.append(r)}function et(){for(let e of Yo)e();Yo=[],N?.querySelector(`.${m("popup-backdrop")}`)?.remove()}function cl(e){let t=Fe(e),o=kt.has(e.name),n=Lt.has(e.name);return a("div",{class:m("card",t?"card-on":"card-off")},a("div",{class:m("card-top")},a("div",{class:m("card-icon")},D(e.icon)),a("div",{class:m("card-actions")},q("star",o?"Unstar":"Star",()=>{kt.toggle(e.name),pe()},o),q("pin",n?"Unpin":"Pin to top",()=>{Lt.toggle(e.name),pe()},n),al(e)&&q("gear","Settings",()=>Fr(e)),e.required?null:Ko(t,r=>nr(e,r),`Enable ${e.name}`))),a("div",{class:m("card-name"),text:e.name}),a("div",{class:m("card-desc"),text:e.description,title:e.description}),a("div",{class:m("card-footer"),text:e.authors.join(", ")}))}function Kr(){let e=zr().some(o=>!o.tags.some(n=>Ur.has(n)));N?.querySelector(`.${m("tabs")}`)?.replaceChildren(...Zs.filter(o=>o.id!=="other"||e).map(o=>a("button",{class:m("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===Pe)},on:{click:()=>{Pe=o.id,Kr(),pe()}}})))}function pe(){if(!N)return;let e=zr().filter(ol),t=N.querySelector(`.${m("search")} input`);t&&(t.placeholder=`Search ${wt(e.length,"plugin")}...`);let o=il(e.filter(i=>rl(i)&&nl(i))),n=N.querySelector(`.${m("grid")}`),r=Vt.trim()?"No plugins match your search.":el[Pe]??"No plugins available.";n?.replaceChildren(...o.length?o.map(cl):[a("div",{class:m("empty"),text:r})])}function dl(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),N?.querySelector(`.${m("popup-backdrop")}`)?et():Re())}var Wr,Xo;function ul(){if(N)return;let e=a("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=Vt,e.addEventListener("input",()=>{Vt=e.value,pe()}),N=a("div",{class:`bloom-root ${m("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&Re()}},a("div",{class:m("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},a("div",{class:m("header")},a("div",{class:m("logo")},D("bloom")),a("h2",{class:m("title"),text:"Bloom++"}),a("span",{class:m("hint"),title:Gr,attrs:{"aria-label":Gr,tabindex:"0"}},D("info")),a("span",{class:m("version"),text:"v2.0.14"}),q("close","Close",Re)),a("div",{class:m("tabs"),attrs:{role:"tablist"}}),a("div",{class:m("toolbar")},a("label",{class:m("search")},D("search"),e),Wo(Vo,Qs,t=>{Vo=t,pe()})),a("div",{class:m("grid")}))),N.addEventListener("keydown",t=>t.stopPropagation()),Xo=new AbortController,document.addEventListener("keydown",dl,{capture:!0,signal:Xo.signal}),document.body.append(N),Kr(),pe(),Wr=rr(pe),e.focus(),Ys.debug("Opened")}function Re(){et(),Xo?.abort(),Wr?.(),N?.remove(),N=null}var Yt=()=>N?Re():ul();var Vr=`/*
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
`;var tt=E("bloom-entry-"),Oe=new Map,Yr=!1,Xr;function pl(e){let t=a("button",{class:tt("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:o=>{o.preventDefault(),o.stopPropagation(),Yt()}}},D("bloom"),e!=="rail"&&a("span",{class:tt("label"),text:"Bloom++"}));return a("div",{class:`bloom-root ${tt("wrap")} ${tt(e)}`,attrs:{"data-bloom":"entry"}},t)}function fl(e){let t=a("div",{class:`bloom-root ${tt("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),Yt()}}},D("bloom"),a("span",{text:"Bloom++"})),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function gl(){let e=Br();for(let[o,n]of Oe)o.isConnected&&e.some(r=>r.anchor===o)||(n.remove(),Oe.delete(o));for(let o of e){let n=Oe.get(o.anchor);if(n?.isConnected||!Ae(o.anchor))continue;let r=n??pl(o.kind);Oe.set(o.anchor,r),o.insert(r)}let t=Kt();t&&!t.querySelector('[data-bloom="menu-entry"]')&&fl(t)}var Jr=p({name:"Settings",description:"Bloom++ settings panel and its sidebar entry.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,hidden:!0,startAt:"HostReady",styles:Vr,start(){Xr=C(gl),!Yr&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",Yt),Yr=!0)},stop(){Xr?.();for(let e of Oe.values())e.remove();Oe.clear(),Re()}});var bl=["data-turn","data-message-author-role"],hl=/:(user|assistant)$/,Jo=`${d.messageUnit}, ${d.oldMessage}`,Zo=e=>e==="user"||e==="assistant";function Qo(){let e=document.querySelector(d.timelineScroll);if(e)return e;let t=document.querySelector(d.turn);for(let o=t?.parentElement;o;o=o.parentElement){let{overflowY:n}=getComputedStyle(o);if((n==="auto"||n==="scroll")&&o.scrollHeight>o.clientHeight)return o}return document.scrollingElement}var ei=()=>document.querySelector(d.conversationTarget)??document.querySelector(d.oldThread),Xt=e=>e.getAttribute("data-chatgpt-search-unit-key")?.match(hl)?.[1]??null,ti=e=>[...e.querySelectorAll(d.searchUnit)].filter(t=>Xt(t)&&!t.parentElement?.closest(d.searchUnit)),Zr=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function ot(e){let t=Zr(e);return t.length?t:[...new Set([...e.querySelectorAll(Jo)].flatMap(Zr))]}function en(e=document){let t=ti(e);return t.length?t:[...e.querySelectorAll(Jo)].filter(o=>!o.parentElement?.closest(Jo))}function yl(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function vl(e){for(let t of bl){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(Zo(o))return o}return e.querySelector(d.markdown)||e.querySelector(d.generatedImage)?"assistant":null}var Sl=e=>!e.parentElement?.closest(d.turn);function Jt(){let e=W(v())?.chain??[],t=[...document.querySelectorAll(d.turn)].filter(Sl).flatMap(n=>{let r=ti(n);return r.length?r.map(i=>({el:i,known:Xt(i)})):[{el:n,known:null}]}),{generating:o}=_();return t.map(({el:n,known:r},i)=>{let s=r?ot(n):en(n).flatMap(ot),c=r??vl(n)??yl(s,e)??(i%2?"assistant":"user"),l=c==="assistant"&&(n.matches(d.turnBusy)||!!n.querySelector(d.turnBusy)||o&&i===t.length-1);return{el:n,role:c,messageIds:s,streaming:l}})}var xl="[data-bloom], .sr-only",wl=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,Qr=new WeakMap;function Zt(e){let t=e.el.textContent?.length??0,o=Qr.get(e.el);if(o?.length===t)return o.summary;let n=El(e);return Qr.set(e.el,{length:t,summary:n}),n}function El(e){let t=e.el.querySelectorAll(d.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.querySelector(e.role==="assistant"?d.markdown:".whitespace-pre-wrap")??e.el,i=[...o.querySelectorAll(xl)].map(s=>R(s.textContent??"")).filter(Boolean).reduce((s,c)=>s.replace(c,`
`),o.innerText||o.textContent||"").split(`
`).map(R).filter(s=>s&&!wl.test(s));return i.length?i.join(" "):e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function Qt(e){return e.text?R(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var oi=`/*
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
`;var k=E("bloom-nav-"),ci=80,Ml=1200,Cl=2,Al=40,Ll=.3,ni=12,kl={user:"\u2753",assistant:"\u{1F916}"},oo=g({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the outline too.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),O=null,G=[],Ie=-1,eo="",ri=0,ii=[],nt=null,to;function di(){let e=Jt().map(s=>({role:s.role,summary:Zt(s),ids:s.messageIds,turn:s,streaming:s.streaming})),t=W(v())?.chain??[];if(!t.length)return e;let o=new Set(t.map(s=>s.id)),n=new Map(e.flatMap(s=>s.ids.map(c=>[c,s]))),r=new Set,i=[];for(let s of t){let c=n.get(s.id);c&&r.has(c)||(c&&r.add(c),i.push(c??{role:s.role,summary:Qt(s),ids:[s.id],turn:null,streaming:!1}))}return[...i,...e.filter(s=>!s.ids.some(c=>o.has(c)))]}function Pl(e){let t=e.getBoundingClientRect(),o=t.top+t.height*Ll,n=-1;return G.forEach((r,i)=>{let s=r.turn?.el.getBoundingClientRect();s&&s.top<=o&&(n=i)}),n===-1?G.findIndex(r=>r.turn):n}function ai(e){oo.store.jumpEffect==="border"&&(e.classList.add(k("flash")),setTimeout(()=>e.classList.remove(k("flash")),Ml))}function tn(e){let t=G[e],o=Qo();if(!t||!o)return;let n=t.turn?.el;if(n?.isConnected){let u=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:u<o.clientHeight*Cl?"smooth":"auto"}),ai(n);return}let r=G.map((u,f)=>u.turn?f:-1).filter(u=>u>=0),i=r.length&&e<r[0]?-1:1,s=++ri,c=0,l=()=>{if(s!==ri||c++>Al)return;G=di();let u=G.find(f=>f.ids.some(A=>t.ids.includes(A)))?.turn?.el;if(u){u.scrollIntoView({block:"start"}),ai(u);return}o.scrollBy({top:i*o.clientHeight*.9}),requestAnimationFrame(l)};l()}function Rl(e,t){return a("button",{class:k("row"),attrs:{type:"button","data-index":String(t)},on:{click:()=>tn(t)}},a("span",{text:kl[e.role]}),a("span",{class:"bloom-truncate",text:xe(e.summary||"\u2026",ci)}))}function Ol(){let e=Qo(),t=ei()??e;if(G=di(),!G.length||!e||!t){O?.remove(),O=null,eo="";return}nt!==e&&(to?.abort(),to=new AbortController,e.addEventListener("scroll",Me(si),{passive:!0,signal:to.signal}),nt=e),O??=a("div",{class:`bloom-root ${k("root")}`,attrs:{"data-bloom":"navigator"}},a("div",{class:k("rail")}),a("div",{class:k("toc")},a("div",{class:k("toc-head")}),a("div",{class:k("toc-list")}))),O.isConnected||document.body.append(O);let o=t.getBoundingClientRect(),n=e.getBoundingClientRect();O.style.left=`${Math.min(o.right+ni,n.right-ni*2)}px`,O.style.top=`${n.top+n.height/2}px`;let r=JSON.stringify([oo.store.showAssistant,G.map(i=>[i.role,i.summary,i.streaming])]);r!==eo&&(eo=r,Il()),si()}function si(){if(!O||!nt)return;Ie=Pl(nt),O.querySelectorAll(`.${k("tick")}`).forEach((t,o)=>t.classList.toggle(k("tick-current"),o===Ie)),O.querySelectorAll(`.${k("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===Ie)));let e=O.querySelector(`.${k("toc-head")}`);e&&(e.textContent=`${Ie+1} / ${G.length}`)}function Il(){O?.querySelector(`.${k("rail")}`)?.replaceChildren(...G.map((t,o)=>a("button",{class:Tt(k("tick"),k(`tick-${t.role}`),t.streaming&&k("tick-streaming")),title:xe(t.summary,ci),attrs:{type:"button","aria-label":`Jump to message ${o+1}`},on:{click:()=>tn(o)}})));let e=G.map((t,o)=>({entry:t,index:o})).filter(({entry:t})=>oo.store.showAssistant||t.role==="user");O?.querySelector(`.${k("toc-list")}`)?.replaceChildren(...e.map(({entry:t,index:o})=>Rl(t,o)))}var ie=Me(Ol),Bl=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function li(e){if(!O||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||Bl(document.activeElement)||document.querySelector("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:Ie-1,ArrowDown:Ie+1,Home:0,End:G.length-1}[e.key];o==null||o<0||o>=G.length||(e.preventDefault(),e.stopPropagation(),tn(o))}var ui=p({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:oo,styles:oi,start(){ii=[C(e=>H(e)&&ie()),ne(ie),B.on("conversation",ie),x.on("rise",ie),x.on("fall",ie)],addEventListener("keydown",li,!0),addEventListener("resize",ie,{passive:!0})},stop(){for(let e of ii)e();to?.abort(),nt=null,removeEventListener("keydown",li,!0),removeEventListener("resize",ie),O?.remove(),O=null,eo=""},onSettingsChange:ie});var mi=`/*
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
`;var Nl=E("bloom-cls"),Hl="bloom-cls",_l=600*1e3,nn=Hn("tab"),De=new Map,it=new Map,Be=null,pi=[],$l=e=>e==="streaming"||e==="error";function ql(){let e=new Map,t=Date.now();for(let[o,n]of it)t-n.at>_l?it.delete(o):e.set(o,n.status);for(let[o,n]of De)e.set(o,n);return e}function Gl(e){return a("span",{class:`bloom-root ${Nl("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&D("alert"))}function rt(){let e=ql(),t=new Set;for(let[o,n]of e)for(let r of Ze(o)){if(!Ae(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let s=Gl(n);t.add(s),r.append(s)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function no(e,t){e&&(t?De.set(e,t):De.delete(e),Be?.postMessage({tab:nn,id:e,status:t}),rt())}function Ul({data:e}){!T(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===nn||($l(e.status)?it.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):it.delete(e.id),rt())}function on(){for(let e of De.keys())Be?.postMessage({tab:nn,id:e,status:null})}var fi=p({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,styles:mi,start(){Be=typeof BroadcastChannel=="function"?new BroadcastChannel(Hl):null,Be?.addEventListener("message",Ul),addEventListener("pagehide",on),pi=[x.on("rise",({conversationId:e})=>no(e,"streaming")),x.on("fall",({conversationId:e,outcome:t})=>no(e,t==="error"?"error":null)),x.on("context",({prevId:e,id:t,migrated:o})=>{o&&_().generating?no(t,"streaming"):!o&&De.get(e??"")==="streaming"&&no(e,null)}),C(e=>H(e)&&rt())],v()&&rt()},stop(){for(let e of pi)e();on(),Be?.close(),Be=null,removeEventListener("pagehide",on),De.clear(),it.clear(),rt()}});var bi=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],ao={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},zl={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},jl="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",rn=32,so=64,an="#FCFCFC",sn="#111111",Fl=14,lo=51.5,Kl=12.5,Wl=9.75,gi=52,Vl=10.5,Yl=7.75,Xl={rotate:e=>e.arc(lo,lo,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function ro(e){let t=document.createElement("canvas");t.width=t.height=rn;let o=t.getContext("2d");return o?(o.scale(rn/so,rn/so),e(o),t.toDataURL("image/png")):""}function io(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D(jl);o&&(e.strokeStyle=sn,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function co(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function Jl(e,t){co(e,lo,Kl,sn),co(e,lo,Wl,ao[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),Xl[t](e),e.stroke()}function Zl(e,t){e.beginPath(),e.roundRect(0,0,so,so,Fl),e.fillStyle=t,e.fill()}var Ql=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function hi(e,t){switch(e){case"original":return Ql(zl[t]);case"hole":return ro(o=>io(o,ao[t],!0));case"bg":return ro(o=>{Zl(o,ao[t]),io(o,an,!1)});case"dot":return ro(o=>{io(o,an,!0),co(o,gi,Vl,sn),co(o,gi,Yl,ao[t])});case"badge":return ro(o=>{io(o,an,!0),Jl(o,t)})}}var st="bloom-chat-state-favicon",lt="data-bloom-rel",dn="data-bloom-media",yi="bloom-parked-icon",ec="/favicon.ico",Si=g({style:{type:"select",description:"How the tab icon shows the chat state.",options:bi,default:"bg"}}),ae=null,xi="",uo=null,wi="",vi=new Map,un,ln=[],Ei=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${lt}]`)];function mn(){for(let e of Ei())e.id!==st&&(e.hasAttribute(lt)||(wi||=e.href,e.setAttribute(lt,e.rel),e.setAttribute(dn,e.getAttribute("media")??"")),e.rel!==yi&&(e.rel=yi),e.media!=="not all"&&(e.media="not all"))}function tc(){for(let e of Ei()){let t=e.getAttribute(lt);if(t==null)continue;e.rel=t;let o=e.getAttribute(dn);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(lt),e.removeAttribute(dn)}}function Ti(){let e=document.getElementById(st);return e||(e=document.createElement("link"),e.id=st,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function oc(e){if(e==="wait")return wi||ec;let t=Si.store.style,o=`${t}:${e}`,n=vi.get(o);return n||vi.set(o,n=hi(t,e)),n}function cn(e){if(e)return"rotate";let t=z();return ae&&t&&t!==xi&&(ae=null),ae==="error"?"error":ae==="done"?"done":t?"ready":"wait"}function at(e,t=!1){if(e===uo&&!t)return;uo=e;let o=Ti(),n=oc(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function nc(){un=new MutationObserver(()=>{mn(),document.head.lastElementChild?.id!==st&&Ti()}),un.observe(document.head,{childList:!0})}var Mi=p({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"HostReady",settings:Si,start(){mn(),at(cn(_().generating),!0),nc(),ln=[x.on("rise",()=>{ae=null,at("rotate")}),x.on("fall",({outcome:e})=>{ae=e==="done"||e==="error"?e:null,xi=z(),at(cn(!1))}),x.on("context",({migrated:e})=>{e||(ae=null)}),x.on("tick",({generating:e})=>{mn(),at(cn(e))})]},stop(){for(let e of ln)e();ln=[],un?.disconnect(),document.getElementById(st)?.remove(),tc(),uo=null,ae=null},onSettingsChange(){at(uo??"wait",!0)}});var rc={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]'],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['div:has(> div > aside button[aria-label="Dismiss migration notice"])','aside:has(button[aria-label="Dismiss migration notice"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])']},Ci=g({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice above the composer.",default:!0}}),Ai=p({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads and notices.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:Ci,styles:()=>we(Object.entries(rc).flatMap(([e,t])=>Ci.store[e]?t:[]))});var pn=`form:has(${d.composerInput}), ${d.oldComposerForm}`,ic=`:is(${pn}) :is([class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"])`,ac='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',sc='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',lc="var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, #fff)))",Li=g({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function cc(){let{opacity:e,blur:t}=Li.store;return e>=100?"":`:is(${ac}), :is(${pn}){background-color:transparent!important;background-image:none!important;box-shadow:none!important}:is(${sc}){display:none!important}${ic}{background-color:color-mix(in srgb, ${lc} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important}:is(${pn}) :is(${d.composerInput}){background-color:transparent!important}`}var ki=p({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:Li,styles:cc});var fn=0,mo;function dc(e){if(!H(e))return;for(let o of Hr())Fo(o,"profile");let t=Kt();t&&Fo(t,"menu")}function Ne(){fn++;let e=!0;return Ye().then(()=>{e&&fn&&!mo&&(mo=C(dc))}),()=>{e&&(e=!1,!--fn&&(mo?.(),mo=void 0))}}var ee=E("bloom-csi-"),uc=256,mc=160,po=1,Pi=4,pc=.1,fc=.0015,gc=250;function bc(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function hc(e){return new Promise((t,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function yc(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:xt(t.x,n,1-n),y:xt(t.y,r,1-r)}}function Ri(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function vc(e,t){let o=a("canvas");return o.width=o.height=uc,Ri(o,e,t),o.toDataURL("image/png")}function Oi(e){let t=null,o={x:M.store.cropX,y:M.store.cropY,zoom:M.store.cropZoom},n,r=a("canvas",{class:ee("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=mc*devicePixelRatio;let i=a("div",{class:`bloom-muted ${ee("status")}`}),s=a("div",{class:ee("zoom")}),c=a("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(h,I=!0){t&&(o=yc(t,h),Ri(r,t,o),I&&(clearTimeout(n),n=setTimeout(()=>{t&&(M.store.cropX=o.x,M.store.cropY=o.y,M.store.cropZoom=o.zoom,M.store.avatarUrl=vc(t,o))},gc)))}function u(){s.replaceChildren(Wt(o.zoom,po,Pi,pc,"\xD7",h=>l({...o,zoom:h})))}async function f(h,I){i.textContent="";try{t=await hc(h),I&&(M.store.avatarSource=h,o={x:.5,y:.5,zoom:po}),e.classList.add(ee("has-image")),u(),l(o,I)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let A=h=>{h?.type.startsWith("image/")&&bc(h).then(I=>f(I,!0))};c.addEventListener("change",()=>A(c.files?.[0])),r.addEventListener("wheel",h=>{t&&(h.preventDefault(),l({...o,zoom:xt(o.zoom*(1-h.deltaY*fc),po,Pi)}),u())},{passive:!1}),r.addEventListener("pointerdown",h=>{if(!t)return;r.setPointerCapture(h.pointerId);let I={...o},$e=r.getBoundingClientRect(),vt=St=>{if(!t)return;let F=Math.max($e.width/t.naturalWidth,$e.height/t.naturalHeight)*o.zoom;l({...o,x:I.x-(St.clientX-h.clientX)/(t.naturalWidth*F),y:I.y-(St.clientY-h.clientY)/(t.naturalHeight*F)})};r.addEventListener("pointermove",vt),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",vt),{once:!0})});let Y=a("div",{class:ee("cropper"),attrs:{tabindex:"0"},on:{paste:h=>A([...h.clipboardData?.files??[]].find(I=>I.type.startsWith("image/"))),dragover:h=>h.preventDefault(),drop:h=>{h.preventDefault(),A(h.dataTransfer?.files[0])}}},a("div",{class:ee("stage")},r),a("div",{class:ee("controls")},Qe("",h=>h.trim()&&void f(h.trim(),!0),"https://\u2026 or data:image/\u2026","url"),a("div",{class:ee("buttons")},$("Choose file",()=>c.click()),$("Reset crop",()=>{l({x:.5,y:.5,zoom:po}),u()}),$("Clear",()=>{t=null,e.classList.remove(ee("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),s.replaceChildren(),M.store.avatarUrl="",M.store.avatarSource=""},"danger")),s,i,c));return e.append(Y),M.store.avatarSource&&f(M.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var Ii=`/*
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
`;var ct="data-bloom-csi-avatar",gn="data-bloom-csi-sized",Hi="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",xc=32,M=g({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>Oi(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),Bi=[];function _i(e){e.removeAttribute(ct),e.removeAttribute(gn)}function Di(e){return(M.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function Ni(e=[]){if(!H(e))return;let t=M.store.displayName.trim()||null,o=!!M.store.avatarUrl,n=new Set(t?Di("name"):[]);for(let i of document.querySelectorAll(Hi))n.has(i)||ue(i,null);for(let i of n)ue(i,t);let r=new Set(o?Di("avatar"):[]);for(let i of document.querySelectorAll(`[${ct}]`))r.has(i)||_i(i);for(let i of r)i.hasAttribute(ct)||i.setAttribute(ct,""),i.toggleAttribute(gn,!i.closest('[role="menu"]'))}function wc(){let e=M.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${M.store.avatarSize}px}:is(${d.rail}, ${d.oldRail}) [${gn}]{--bloom-csi-size:${xc}px}`:""}var $i=p({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:M,styles:()=>`${wc()}
${Ii}`,start(){Bi=[Ne(),C(Ni)]},stop(){for(let e of Bi)e();for(let e of document.querySelectorAll(`[${ct}]`))_i(e);for(let e of document.querySelectorAll(Hi))ue(e,null)},onSettingsChange(){Ni()}});var He=E("bloom-greeting-"),qi=30,Gi=100;function Ui(e){let t=-1,o=a("textarea",{class:`bloom-input ${He("input")}`,attrs:{maxlength:String(Gi),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=$("Add",i),r=a("div",{class:He("list")});function i(){let l=o.value.trim().slice(0,Gi);if(!l)return;let u=[...w.store.greetings];t>=0?u[t]=l:u.length<qi&&u.push(l),w.store.greetings=u,t=-1,o.value="",s()}function s(){let{greetings:l}=w.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&l.length>=qi,r.replaceChildren(...l.length?l.map((u,f)=>a("div",{class:He("row",f===t?"row-editing":"row-idle")},a("div",{class:He("text"),text:u}),q("edit","Edit",()=>{t=f,o.value=u,o.focus(),s()}),q("trash","Delete",()=>{w.store.greetings=l.filter((A,Y)=>Y!==f),t===f&&(t=-1),s()}))):[a("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),e.append(a("div",{class:He("editor")},r,a("div",{class:He("form")},o,n))),s();let c=Ee((l,u)=>l==="GreetingCustomizer"&&u==="greetings"&&s());return()=>{c(),e.replaceChildren()}}var zi=`/*
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
`;var go="data-bloom-greeting",Tc=1e3,Mc=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],w=g({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>Ui(e)},greetings:{type:"custom",default:Mc},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),fo,ji=[],bn,Fi=()=>w.store.greetings.filter(e=>typeof e=="string"&&e.trim());function ut(){let e=Fi();if(e.length)if(w.store.order==="random"&&e.length>1){let t=w.store.lastRandom;for(;t===w.store.lastRandom;)t=Math.floor(Math.random()*e.length);w.store.lastRandom=t,w.store.index=t}else w.store.index=(w.store.index+1)%e.length}function Cc(){return me()?Te(d.homeHeading):null}function Ki(){for(let e of document.querySelectorAll(`[${go}]`))e.removeAttribute(go),ue(e,null)}function dt(){let e=Fi(),t=Cc();if(!t||!e.length){Ki();return}(w.store.index<0||w.store.index>=e.length)&&ut(),t.setAttribute(go,""),ue(t,e[Math.max(0,w.store.index)%e.length])}function hn(){clearInterval(fo),fo=void 0,w.store.mode==="interval"&&me()&&(fo=setInterval(()=>{ut(),dt()},w.store.intervalSec*Tc))}function Ac(e){w.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${go}]`)||getSelection()?.toString()||(ut(),dt())}function Lc(){me()&&w.store.mode==="refresh"&&ut(),hn(),dt()}var Wi=p({name:"GreetingCustomizer",description:"Replace the \u201CWhat can I help with?\u201D heading on the home page with your own lines.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:w,styles:zi,start(){bn=new AbortController,document.addEventListener("click",Ac,{signal:bn.signal}),me()&&w.store.mode==="refresh"&&ut(),hn(),ji=[C(e=>H(e)&&dt()),ne(Lc)]},stop(){bn?.abort();for(let e of ji)e();clearInterval(fo),Ki()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&hn(),dt()}});var mt=E("bloom-history-"),yn=10,kc=3e3;function Vi(e){let t="",o=0,n=new Set,r=a("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),i=a("div",{class:mt("list")}),s=a("div",{class:mt("pager")}),c,l=$("Clear all",()=>{if(!c){l.textContent="Click again to clear",c=setTimeout(()=>{c=void 0,l.textContent="Clear all"},kc);return}clearTimeout(c),c=void 0,l.textContent="Clear all",pt([])},"danger");function u(){let A=[...fe.store.entries].toReversed(),Y=t.trim().toLowerCase(),h=Y?A.filter(F=>F.toLowerCase().includes(Y)):A,I=Math.max(1,Math.ceil(h.length/yn));o=Math.min(o,I-1);let $e=h.slice(o*yn,(o+1)*yn).map(F=>a("div",{class:mt("row")},a("button",{class:mt("text",n.has(F)?"text-open":"text-closed"),text:F,title:n.has(F)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{n.delete(F)||n.add(F),u()}}}),q("copy","Copy",()=>void _n(F)),q("trash","Delete",()=>pt(fe.store.entries.filter($a=>$a!==F)))));i.replaceChildren(...$e.length?$e:[a("div",{class:"bloom-muted",text:Y?"No matching prompts.":"No saved prompts yet."})]),s.replaceChildren(a("span",{class:"bloom-muted",text:`${h.length} ${Y?"matching":"saved"} \xB7 page ${o+1} of ${I}`}),$("Previous",()=>{o--,u()}),$("Next",()=>{o++,u()}),l);let[vt,St]=s.querySelectorAll("button");vt.disabled=o===0,St.disabled=o>=I-1,l.disabled=!A.length}r.addEventListener("input",()=>{t=r.value,o=0,u()}),e.append(a("div",{class:mt("manager")},r,i,s)),u();let f=Ee((A,Y)=>A==="InputHistory"&&Y==="entries"&&u());return()=>{f(),clearTimeout(c),e.replaceChildren()}}var Yi=`/*
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
`;var Rc=E("bloom-history-"),Oc=2e3,fe=g({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>Vi(e)},entries:{type:"custom",default:[]}}),j=null,vn={text:"",at:0},ge=null,Sn,bo=()=>fe.store.entries.filter(e=>typeof e=="string");function pt(e){fe.store.entries=e.slice(-fe.store.maxEntries)}function xn(e){let t=e.trim();if(!t)return;let o=Date.now();t===vn.text&&o-vn.at<Oc||(vn={text:t,at:o},pt([...bo().filter(n=>n!==t),t]))}function Ic(e,t){let o=Ce();if(!o)return;ge??=a("div",{class:`bloom-root ${Rc("hud")}`,attrs:{"data-bloom":"history-hud","aria-live":"polite"}}),ge.textContent=`${e+1} / ${t}`;let n=(o.closest("form")??o).getBoundingClientRect();ge.style.left=`${n.left+n.width/2}px`,ge.style.top=`${n.top}px`,ge.isConnected||document.body.append(ge)}function ft(){j=null,ge?.remove()}function Bc(e){let t=bo();if(!j)return;let o=t[e];j.index=e,j.shown=o,Q(o),Ic(t.length-1-e,t.length)}function Dc(e){let t=bo();if(!t.length)return!1;if(!j){if(e===1)return!1;j={index:t.length,draft:z(),shown:""}}let o=j.index+e;return o<0?!0:o>=t.length?(Q(j.draft),ft(),!0):(Bc(o),!0)}function Nc(e){if(e.isComposing||!Ve(e.target))return;let t=e.target;if(e.key==="Enter"&&!e.shiftKey){xn(z(t)),ft();return}if(e.key==="Escape"&&j){Q(j.draft),ft(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey)return;let o=dr(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!j||Dc(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function Hc(e){j&&Ve(e.target)&&z(e.target)!==j.shown.trim()&&ft()}function _c(e){e.target instanceof Element&&e.target.closest(d.sendButton)&&xn(z())}var Xi=p({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:fe,styles:Yi,start(){Sn=new AbortController;let{signal:e}=Sn;document.addEventListener("keydown",Nc,{capture:!0,signal:e}),document.addEventListener("input",Hc,{capture:!0,signal:e}),document.addEventListener("click",_c,{capture:!0,signal:e}),document.addEventListener("submit",()=>xn(z()),{capture:!0,signal:e})},stop(){Sn?.abort(),ft()},onSettingsChange(e){e==="maxEntries"&&pt(bo())}});var Ji=`/*
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
`;var qc=1500,Gc=5e3,Uc=2e3,_e=g({showDate:{type:"boolean",description:"Show the date for messages not sent today.",default:!0},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),yo=new Map,ea=0,vo,Zi=[];function ta(e,t){yo.get(e)!==t&&(yo.set(e,t),clearTimeout(vo),vo=setTimeout(oa,Uc))}function oa(){let e={..._e.store.stamps,...Object.fromEntries(yo)};_e.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,qc))}function zc(e){let t=W(v())?.times;for(let o=e.length-1;o>=0;o--){let n=yo.get(e[o])??t?.get(e[o])??_e.store.stamps[e[o]];if(n)return n}return null}var jc=()=>_().generating||Date.now()-ea<Gc;function Fc(e){let t=new Date(e),o=new Date,n={hour:"2-digit",minute:"2-digit"};if(!_e.store.showDate||t.toDateString()===o.toDateString())return t.toLocaleTimeString(void 0,n);let r=t.getFullYear()===o.getFullYear()?{}:{year:"numeric"};return t.toLocaleString(void 0,{...r,month:"short",day:"numeric",...n})}function Qi(e){let t=Xt(e)??e.getAttribute("data-message-author-role")??e.closest(d.turn)?.getAttribute("data-turn")??e.querySelector(d.authorRole)?.getAttribute("data-message-author-role");if(Zo(t))return t;let o=ot(e).at(-1);return W(v())?.chain.find(n=>n.id===o)?.role??null}function Kc(e){let t=ot(e);if(!t.length||!Ae(e)||e.querySelector("time:not([data-bloom])"))return;let o=zc(t);!o&&jc()&&(o=Date.now(),ta(t.at(-1),o));let n=e.querySelector(':scope > time[data-bloom="timestamp"]');if(!o||_e.store.hideOwnMessages&&Qi(e)==="user"){n?.remove();return}let r=Fc(o);if(n?.textContent===r)return;let i=a("time",{class:`bloom-timestamp bloom-timestamp-${Qi(e)??"assistant"}`,text:r,title:new Date(o).toLocaleString(),attrs:{"data-bloom":"timestamp",datetime:new Date(o).toISOString()}});n?n.replaceWith(i):e.prepend(i)}var ho=Me(()=>{for(let e of en())Kc(e)}),na=p({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:_e,styles:Ji,start(){Zi=[C(e=>H(e)&&ho()),B.on("conversation",ho),B.on("message-time",({messageId:e,time:t})=>{ta(e,t),ho()}),x.on("fall",()=>{ea=Date.now()})]},stop(){for(let e of Zi)e();vo&&(clearTimeout(vo),oa());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();ho()}}});var Wc=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])'],Vc=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],ra=g({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),ia=p({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:ra,styles:()=>we([...Wc,...ra.store.hideDictationSettings?Vc:[]])});var be="data-bloom-share",Yc=/^\/g\/g-p-/,Xc=/^(?:share|分享)$/i,Jc=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],Zc=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${be}="project"]`],wn=g({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),So,En=!1;function Qc(e){if(!H(e))return;let t=Yc.test(location.pathname)&&!v();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${be}]`))!t||!Xc.test(R(o.textContent??""))?o.removeAttribute(be):o.hasAttribute(be)||o.setAttribute(be,"project")}var aa=p({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:wn,styles:()=>we([...wn.store.hideShareChat?Jc:[],...wn.store.hideShareProject?Zc:[]]),start(){En=!0,Ye().then(()=>{En&&!So&&(So=C(Qc))})},stop(){En=!1,So?.(),So=void 0;for(let e of document.querySelectorAll(`[${be}]`))e.removeAttribute(be)}});var sa='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',ed='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',td="[data-bloom-profile-plan]",la="visibility:hidden!important;user-select:none!important",da=g({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function od(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=da.store,r=[];return e&&r.push(n?`:is(${sa}){display:none!important}`:`:is(${sa}){${la}}`),t&&r.push(`:is(${ed}){${la}}`),e&&o&&r.push(`${td}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var ca,ua=p({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:da,styles:od,start(){ca=Ne()},stop(){ca?.()}});var ma=`/*
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
`;var P=E("bloom-queue-"),rd=6,id=8,U=null,gt="",xo=!1,he=!1;function Tn(e,t,o){let n=q(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute("title"),n.addEventListener("mouseenter",()=>pa(t)),n.addEventListener("mouseleave",()=>pa("")),n}function pa(e){let t=U?.querySelector(`.${P("tip")}`);t&&(t.textContent=e)}function ad(e,t,o,n){he=!0;let r=a("textarea",{class:`bloom-input ${P("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=s=>{he=!1,gt="",s&&n.edit(t,r.value)};r.addEventListener("keydown",s=>{s.stopPropagation(),!s.isComposing&&(s.key==="Enter"&&!s.shiftKey?(s.preventDefault(),i(!0)):s.key==="Escape"&&(s.preventDefault(),i(!1)))}),r.addEventListener("blur",()=>he&&i(!0),{once:!0}),e.querySelector(`.${P("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function sd(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,s=l=>{!i&&Math.abs(l.clientY-n.clientY)<rd||(i||(i=he=!0,e.classList.add(P("dragging"))),e.style.transform=`translateY(${l.clientY-n.clientY}px)`)},c=l=>{if(removeEventListener("pointermove",s),!i)return;he=!1,gt="";let f=[...r.children].filter(A=>A!==e).filter(A=>A.getBoundingClientRect().top+A.getBoundingClientRect().height/2<l.clientY).length;o.move(t,f)};addEventListener("pointermove",s),addEventListener("pointerup",c,{once:!0})})}function ld(e,t,o){let n=a("li",{class:P("row")},a("div",{class:P("text"),text:e}),a("div",{class:P("actions")},Tn("trash","Remove from queue",()=>o.remove(t)),Tn("edit","Edit",()=>ad(n,t,e,o)),Tn("send","Send now",()=>o.sendNow(t))));return sd(n,t,o),n}function cd(e){if(!U)return;let t=e.getBoundingClientRect();U.style.left=`${t.left}px`,U.style.width=`${t.width}px`,U.style.bottom=`${innerHeight-t.top+id}px`}function Mn(){U?.remove(),U=null,gt="",he=!1}function wo(e,t){let o=No();if(!e.length||!We(o)){Mn();return}U||(U=a("div",{class:`bloom-root ${P("tray")}`,attrs:{"data-bloom":"queue"}},a("div",{class:P("header")},a("button",{class:P("toggle"),attrs:{type:"button"},on:{click:()=>{xo=!xo,U?.classList.toggle(P("collapsed"),xo)}}},a("span",{class:P("count")}),D("chevron")),a("span",{class:P("tip")})),a("ol",{class:P("list")})),U.classList.toggle(P("collapsed"),xo),document.body.append(U)),cd(o);let n=JSON.stringify(e);if(he||n===gt)return;gt=n;let r=U.querySelector(`.${P("count")}`);r&&(r.textContent=wt(e.length,"Queued message")),U.querySelector(`.${P("list")}`)?.replaceChildren(...e.map((i,s)=>ld(i,s,t)))}var dd=8,ud=150,md=20,ba=g({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1}}),ye=new Map,Eo=!1,ve=null,Cn,fa=[],An="draft",Ln=()=>v()??An,V=()=>ye.get(Ln())??[];function Se(e){e.length?ye.set(Ln(),e):ye.delete(Ln()),wo(V(),kn)}function To(e,t=0){if(_().generating||z()){t<md&&setTimeout(()=>To(e,t+1),ud);return}Q(e),Do(()=>{mr()||Q("")})}function ga(){if(ve!=null){let o=ve;ve=null,To(o);return}if(!Eo||_().generating||z())return;let[e,...t]=V();e!=null&&(Eo=!1,Se(t),To(e))}function ha(e){let t=V(),o=t[e];if(o!=null){if(Se(t.filter((n,r)=>r!==e)),!_().generating){To(o);return}ve=o,Dt()?.click()}}var kn={remove:e=>Se(V().filter((t,o)=>o!==e)),edit:(e,t)=>Se(t.trim()?V().map((o,n)=>n===e?t:o):V().filter((o,n)=>n!==e)),sendNow:ha,move(e,t){let o=[...V()],[n]=o.splice(e,1);o.splice(t,0,n),Se(o)}};function pd(e){let t=V();return ba.store.replacePending&&t.length?(Se([...t.slice(0,-1),e]),!0):t.length>=dd?!1:(Se([...t,e]),!0)}function fd(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!Ve(e.target)||!_().generating)return;let t=z(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;Q(""),ve=t,Dt()?.click();return}if(!t){V().length&&ha(0);return}pd(t)&&Q("")}var ya=p({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:ba,styles:ma,start(){Cn=new AbortController,document.addEventListener("keydown",fd,{capture:!0,signal:Cn.signal}),fa=[x.on("fall",({outcome:e})=>{Eo=e==="done",e==="left"&&(ve=null),ga()}),x.on("context",({prevId:e,id:t,migrated:o})=>{let n=ye.get(An);ye.delete(An),o&&!e&&t&&n&&ye.set(t,n),o||(Eo=!1),wo(V(),kn)}),x.on("tick",()=>{ga(),wo(V(),kn)})]},stop(){Cn?.abort();for(let e of fa)e();Mn(),ye.clear(),ve=null}});var gd=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function bd(){let e=R(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!gd.has(e.toLowerCase())?e:null}function bt(e){return e?W(e)?.title??$r(e)??(e===v()?bd():null):null}var va=`/*
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
`;var te=E("bloom-recent-"),oe="home",yd=50,Sa=140,vd=new Set(["Backquote"]),Sd=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),y=g({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),se=null,J=[],Z=0,Pn,xa=[],Ao=()=>Tr()?null:v()??(me()?oe:null);function wa(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function Ta(e){let t=bt(e);t&&y.store.titles[e]!==t&&(y.store.titles={...y.store.titles,[e]:t});let o=qr(location.href);o&&e===v()&&y.store.projects[e]!==o&&(y.store.projects={...y.store.projects,[e]:o})}function Ea(e){if(!e)return;let t=[e,...y.store.visits.filter(n=>n!==e)].slice(0,yd),o=new Set(t);y.store.visits=t,Object.keys(y.store.previews).some(n=>!o.has(n))&&(y.store.previews=wa(y.store.previews,o)),Object.keys(y.store.titles).some(n=>!o.has(n))&&(y.store.titles=wa(y.store.titles,o)),e!==oe&&Ta(e)}function Mo(e){if(!e||!y.store.visits.includes(e))return;let t={},o=W(e)?.chain??[];for(let r of o)t[r.role]=xe(Qt(r),Sa);if(e===v())for(let r of Jt()){let i=Zt(r);i&&(t[r.role]=xe(i,Sa))}let n=y.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(y.store.previews={...y.store.previews,[e]:t})}function xd(){let e=Number(y.store.maxRecent);return y.store.visits.filter(t=>t!==oe||y.store.includeHome).slice(0,e)}function Rn(e){if(ht(),e===Ao())return;let t=e===oe?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"]'):Ze(e)[0];t?t.click():location.assign(e===oe?"/":`/c/${e}`)}function wd(e,t){let o=e===oe?"New chat":y.store.titles[e]??bt(e)??"Untitled chat",n=e===oe?null:y.store.projects[e],r=e===oe?null:y.store.previews[e];return a("button",{class:te("item"),attrs:{type:"button",role:"option","aria-selected":String(t===Z)},on:{click:()=>Rn(e),mousemove:()=>t!==Z&&Co(t)}},a("div",{class:te("head")},a("span",{class:`${te("title")} bloom-truncate`,text:o}),n&&a("span",{class:te("project"),text:n})),r?.user&&a("div",{class:`${te("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&a("div",{class:`${te("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function Co(e){Z=(e+J.length)%J.length,se?.querySelectorAll(`.${te("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===Z)))}function Ed(){Mo(v());let e=Ao();J=xd(),e&&(J=[e,...J.filter(t=>t!==e)].slice(0,Number(y.store.maxRecent))),J.length&&(Z=J.length>1?1:0,se=a("div",{class:`bloom-root ${te("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:t=>t.target===t.currentTarget&&ht()}},a("div",{class:te("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...J.map(wd))),document.body.append(se))}function ht(){se?.remove(),se=null}var Td=e=>vd.has(e.code)||Sd.has(e.key);function Md(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&Td(e)){e.preventDefault(),e.stopPropagation(),se?Co(Z+(e.shiftKey?-1:1)):Ed();return}if(!se)return;let o={Escape:ht,Enter:()=>Rn(J[Z]),ArrowDown:()=>Co(Z+1),ArrowUp:()=>Co(Z-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function Cd(e){se&&e.key==="Control"&&Rn(J[Z])}var Ma=p({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:y,styles:va,start(){Pn=new AbortController;let{signal:e}=Pn;addEventListener("keydown",Md,{capture:!0,signal:e}),addEventListener("keyup",Cd,{capture:!0,signal:e}),addEventListener("blur",ht,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&Mo(v()),{signal:e}),xa=[ne(({prevId:i})=>{Mo(i),Ea(Ao())}),B.on("conversation",({id:i})=>{y.store.visits.includes(i)&&Ta(i),Mo(i)})];let{visits:t,titles:o,previews:n}=y.store,r=t.filter(i=>i!==oe&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(y.store.visits=t.filter(i=>!r.includes(i))),Ea(Ao())},stop(){Pn?.abort();for(let e of xa)e();ht()}});var Ad=new S("ResponseNotification"),Ld=[880,1318.5],kd=.14,Ca=.22,Pd=.08,Aa=1e-4,Rd=.02,yt=g({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the built-in chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",description:"Try the sound.",render:e=>(e.append($("Play",ka)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),On=null,La,In;function Od(){On??=new AudioContext;let e=On.currentTime;Ld.forEach((t,o)=>{let n=On,r=e+o*kd,i=n.createOscillator(),s=n.createGain();i.frequency.value=t,s.gain.setValueAtTime(Aa,r),s.gain.exponentialRampToValueAtTime(Pd,r+Rd),s.gain.exponentialRampToValueAtTime(Aa,r+Ca),i.connect(s).connect(n.destination),i.start(r),i.stop(r+Ca)})}function ka(){let e=yt.store.soundUrl.trim();e?new Audio(e).play().catch(t=>Ad.warn("Custom sound failed",t)):Od()}function Id(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function Bd(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(In=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:In.signal}))}var Pa=p({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:yt,start(){Bd(),La=x.on("fall",({conversationId:e,outcome:t})=>{t==="done"&&(yt.store.onlyWhenHidden&&!document.hidden||(yt.store.sound&&ka(),yt.store.browserNotification&&Id(bt(e))))})},stop(){La?.(),In?.abort()}});var Dd="filter:blur(6px)!important;transition:filter 0.2s ease",Ra=`:is(${d.sidebars})`,Nd={conversations:{selectors:[`${Ra} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0},projects:{selectors:[`${Ra} a:is([href*="/project"], [href*="/g/g-p-"])`,".bloom-recent-project"],hover:!0},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}},Ia=g({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function Hd(){return Object.entries(Nd).filter(([e])=>Ia.store[e]).map(([,{selectors:e,hover:t}])=>{let o=e.join(",");return`:is(${o}){${Dd}}`+(t?`:is(${o}):hover, .bloom-recent-item:hover :is(${o}){filter:none!important}`:"")}).join(`
`)}var Oa,Ba=p({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:Ia,styles:Hd,start(){Oa=Ne()},stop(){Oa?.()}});var _d=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],$d=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",qd='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',Da=g({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function Gd(){let e=`${Da.store.width}rem`;return`:is(${$d}){${_d.map(t=>`${t}:${e}!important`).join(";")}}:is(${qd}){max-width:min(100%, ${e})!important}`}var Na=p({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:Da,styles:Gd});var Ud=[Jr,ui,fi,Mi,Ai,ki,$i,Wi,Xi,na,ia,aa,ua,ya,Ma,Pa,Ba,Na],Bn=Ud;var zd=new S("Bloom"),Ha="2.0.14";async function Dn(){Sr();for(let e of Bn)e.updatedAt=Pr[e.name];Qn(Bn),await Yn(),Et("base",ir),kr(),Rt("Init"),_t().then(()=>{Un(),Rt("DOMContentLoaded")}),await wr(),Rt("HostReady"),zd.info(`Bloom++ ${Ha} ready`)}var _a=new S("Boot");if(window===window.top){let e=K.Bloom;e&&_a.warn("Replacing another Bloom++ instance",e.VERSION),Object.defineProperty(K,"Bloom",{value:Nn,configurable:!0,writable:!0}),Dn().catch(t=>_a.error("Startup failed",t))}})();
