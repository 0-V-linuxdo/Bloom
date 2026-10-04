// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.71
// @description  Void++-style plugin host for chatgpt.com. Tab favicon, input history, recent chats, reply notify, next-prompt queue, Recents status, wider thread, thread outline, message times, streamer blur, custom home greeting, custom sidebar identity, hide Share, Dictation, sidebar name, Download apps, upgrade CTAs, and ads.
// @author       0-V-linuxdo & Bloom contributors
// @homepageURL  https://github.com/0-V-linuxdo/Bloom
// @supportURL   https://github.com/0-V-linuxdo/Bloom/issues
// @icon         https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/v2/assets/logos/app-icon/bloom-icon.svg
// @icon64       https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/v2/assets/logos/app-icon/bloom-icon-64.png
// @match        https://chatgpt.com/*
// @match        https://*.chatgpt.com/*
// @match        https://chat.openai.com/*
// @match        https://free.share-ai.top/*
// @match        https://chatgpt.aicnm.cc/*
// @run-at       document-start
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addValueChangeListener
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
// @downloadURL  https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/v2/userscript/Bloom.update5.user.js
// @updateURL    https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/v2/userscript/Bloom.update5.user.js
// ==/UserScript==

/* Bloom++ v2.0.71. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var tu=Object.defineProperty;var ou=(e,t)=>{for(var o in t)tu(e,o,{get:t[o],enumerable:!0})};var x=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var Se=(e,t,o)=>Math.min(o,Math.max(t,e)),S=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ji=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,le=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,b=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function ko(e,t){return`${e} ${t}${e===1?"":"s"}`}async function Zi(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function Ee(e){try{return JSON.parse(e)}catch{return}}var te=typeof unsafeWindow>"u"?window:unsafeWindow;var Vi={};ou(Vi,{VERSION:()=>$c,init:()=>zi,plugins:()=>Ge});var nu=new x("Styles"),Rt=new Map,Xi=new Set,Dt=new Map,er=!0;function $i(){let e=document.adoptedStyleSheets.filter(t=>!Xi.has(t));document.adoptedStyleSheets=[...e,...Rt.values()]}function _i(e){document.readyState==="loading"||e.parentNode===document.head||document.head.append(e)}function ru(e,t){let o=Dt.get(e);o||(o=document.createElement("style"),o.id=`bloom-style-${e}`,Dt.set(e,o)),o.textContent!==t&&(o.textContent=t),_i(o)}function Io(e,t){if(er)try{let o=Rt.get(e);o||(o=new te.CSSStyleSheet,Rt.set(e,o),Xi.add(o)),o.replaceSync(t),$i();return}catch(o){nu.warn("Constructed style sheets unavailable, using <style> after parsing",o),er=!1,Rt.delete(e)}ru(e,t)}function tr(e){Rt.delete(e)&&er&&$i(),Dt.get(e)?.remove(),Dt.delete(e)}function es(){for(let e of Dt.values())_i(e)}var E=e=>(...t)=>t.map(o=>e+o).join(" "),Bo=(...e)=>e.filter(Boolean).join(" "),it=e=>e.length?`${e.map(t=>`${t}:not([data-bloom])`).join(",")}{display:none!important}`:"";function f(e){return e}var He=new x("Storage"),iu="bloompp",Oo="kv",ts=null;function su(){return ts??=new Promise((e,t)=>{let o=indexedDB.open(iu,1);o.onupgradeneeded=()=>{o.result.objectStoreNames.contains(Oo)||o.result.createObjectStore(Oo)},o.onsuccess=()=>e(o.result),o.onerror=()=>t(o.error)}),ts}function or(e,t){return su().then(o=>new Promise((n,r)=>{let i=t(o.transaction(Oo,e).objectStore(Oo));i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)}))}async function au(e){if(typeof GM_getValue=="function")try{return await GM_getValue(e)}catch(t){He.warn("GM read failed",t);return}}async function lu(e){try{return await or("readonly",t=>t.get(e))}catch(t){He.warn("IndexedDB read failed",t);return}}function cu(e){try{return localStorage.getItem(e)??void 0}catch{return}}async function Po(e){return Promise.all([au(e),lu(e),cu(e)])}function os(e,t){typeof GM_addValueChangeListener=="function"&&GM_addValueChangeListener(e,(o,n,r,i)=>{i&&t(r)}),addEventListener("storage",o=>{o.key===e&&t(o.newValue)})}function nr(e){if(typeof GM_setValue=="function")try{GM_setValue(e,{})}catch(t){He.warn("GM delete failed",t)}try{localStorage.removeItem(e)}catch(t){He.warn("localStorage delete failed",t)}or("readwrite",t=>t.delete(e)).catch(t=>He.warn("IndexedDB delete failed",t))}function Ro(e,t){let o=JSON.stringify(t);if(typeof GM_setValue=="function")try{GM_setValue(e,t)}catch{GM_setValue(e,o)}try{localStorage.setItem(e,o)}catch(n){He.warn("localStorage write failed",n)}or("readwrite",n=>n.put(o,e)).catch(n=>He.warn("IndexedDB write failed",n))}var uu=new x("Settings"),ir="BloomSettings",du=100,mu=["GM","IndexedDB","localStorage"],st={plugins:{}},Do=new Set,sr=new Set,Ht;function rs(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=Ee(t);return!S(t)||!S(t.plugins)||!Object.keys(t.plugins).length?null:t}var rr=e=>e==null||e===""||(Array.isArray(e)?!e.length:S(e)&&!Object.keys(e).length);function fu(e){return rr(e)?0:Array.isArray(e)?12+Math.min(e.length,40):S(e)?12+Math.min(Object.keys(e).length,40):3}function pu(e){let t=0;for(let o of Object.values(e.plugins))if(S(o))for(let[n,r]of Object.entries(o))n!=="enabled"&&(t+=fu(r));return t}var ns=e=>Object.values(e.plugins).filter(t=>S(t)&&t.enabled===!0).length;function gu(e){let t=e.map((i,s)=>i&&{candidate:i,index:s,score:pu(i)}).filter(i=>i!=null).toSorted((i,s)=>s.score-i.score||(i.score?0:ns(s.candidate)-ns(i.candidate))||i.index-s.index);if(!t.length)return null;let[o,...n]=t,r=structuredClone(o.candidate);for(let{candidate:i}of n)for(let[s,c]of Object.entries(i.plugins)){if(!S(c))continue;let l=r.plugins[s]??={};for(let[d,m]of Object.entries(c))d==="enabled"?!("enabled"in l)&&m===!0&&(l.enabled=!0):rr(l[d])&&!rr(m)&&(l[d]=structuredClone(m));Object.keys(l).length||delete r.plugins[s]}return{bag:r,source:mu[o.index]}}async function is(){let e=await Po(ir),t=gu(e.map(rs));t&&(st.plugins=t.bag.plugins,uu.info("Loaded settings from",t.source))}var ss=(e,t)=>`${e}
${t}`;function as(){Ht=void 0,sr.clear(),Ro(ir,st)}function hu(e){let t=rs(e);if(!t)return;let o=[];for(let n of new Set([...Object.keys(st.plugins),...Object.keys(t.plugins)])){let r=st.plugins[n]??={},i=S(t.plugins[n])?t.plugins[n]:{};for(let s of new Set([...Object.keys(r),...Object.keys(i)]))sr.has(ss(n,s))||JSON.stringify(r[s])===JSON.stringify(i[s])||(i[s]===void 0?delete r[s]:r[s]=i[s],o.push([n,s]))}for(let[n,r]of o)for(let i of Do)i(n,r)}function bu(){Ht&&(clearTimeout(Ht),as())}var Ne=(e,t)=>st.plugins[e]?.[t];function Ue(e,t,o){let n=st.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,sr.add(ss(e,t)),clearTimeout(Ht),Ht=setTimeout(as,du);for(let r of Do)r(e,t)}function at(e){return Do.add(e),()=>void Do.delete(e)}function ar(e){return e.type==="component"?void 0:e.default}function p(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>Ne(t.pluginName,n)??(e[n]&&ar(e[n])),set:(o,n,r)=>(Ue(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&Ne(t.pluginName,o)!==void 0&&Ue(t.pluginName,o)}};return t}var ls=e=>{let t=()=>{let o=Ne("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();Ue("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},Ho=ls("pinnedPlugins"),No=ls("starredPlugins");addEventListener("pagehide",bu);os(ir,hu);var Uo=new x("PluginManager"),Ge=new Map,Nt=new Set,cs=new Set,lr=new Set;function us(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),Ge.set(t.name,t)}var Ut=e=>!!e.required||(Ne(e.name,"enabled")??!!e.enabledByDefault);var cr=e=>`plugin-${e.name}`;function ds(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?Io(cr(e),t):tr(cr(e))}function ms(e){if(!Nt.has(e.name))try{ds(e),e.start?.(),Nt.add(e.name)}catch(t){Uo.error(`Failed to start ${e.name}`,t)}}function Au(e){if(Nt.delete(e.name)){tr(cr(e));try{e.stop?.()}catch(t){Uo.error(`Failed to stop ${e.name}`,t)}}}var fs=e=>e.startAt??"HostReady";function Go(e){cs.add(e);for(let t of Ge.values())fs(t)===e&&Ut(t)&&ms(t);Uo.info(`${e}: ${[...Nt].join(", ")}`)}function ps(e,t){Ue(e.name,"enabled",t),t?cs.has(fs(e))&&ms(e):Au(e);for(let o of lr)o()}function gs(e){return lr.add(e),()=>void lr.delete(e)}at((e,t)=>{let o=Ge.get(e);if(!(!o||t==="enabled"||!Nt.has(e)))try{ds(o),o.onSettingsChange?.(t)}catch(n){Uo.error(`Settings change failed for ${e}`,n)}});var hs=`/*
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

button.bloom-switch {
    position: relative;
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    width: 2rem;
    height: 1.25rem;
    border-radius: 9999px;
    background-color: color-mix(in srgb, var(--bloom-fg) 22%, var(--bloom-card));
    transition: background-color 0.15s ease-out;
}

button.bloom-switch[aria-checked="true"] {
    background-color: var(--bloom-accent);
}

button.bloom-switch[aria-disabled="true"] {
    cursor: default;
}

.bloom-switch:focus-visible,
.bloom-button:focus-visible,
.bloom-icon-button:focus-visible {
    outline: 2px solid var(--bloom-accent);
    outline-offset: 1px;
}

button.bloom-switch::after {
    content: "";
    width: 1rem;
    height: 1rem;
    border-radius: 9999px;
    background: #fff;
    box-shadow: 0 1px 2px #00000029;
    transform: translateX(0.125rem);
    transition: transform 0.15s ease-out;
}

button.bloom-switch[aria-checked="true"]::after {
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
`;var vu=new x("Dom");function a(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var bs=document.createElement("template");function As(e){return bs.innerHTML=e.trim(),bs.content.firstElementChild.cloneNode(!0)}var Ft=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),j=(e,t=document)=>[...t.querySelectorAll(e)].find(Ft)??null,qu=16,wu="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function ys(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([wu],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function Yt(e){document.hidden?setTimeout(e,qu):requestAnimationFrame(e)}function lt(e){let t=!1;return()=>{t||(t=!0,Yt(()=>{t=!1;try{e()}catch(o){vu.error("Scheduled task failed",o)}}))}}var Fo=new Set,Yo=[],Gt,xu=lt(()=>{let e=Yo;Yo=[];for(let t of Fo)t(e)});function L(e){return Fo.add(e),Gt||(Gt=new MutationObserver(t=>{Yo.push(...t),xu()}),Gt.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{Fo.delete(e),!Fo.size&&(Gt?.disconnect(),Gt=void 0,Yo=[])}}var Su=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),G=e=>!e.length||e.some(t=>!Su(t.target));function Fe(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size");return}e.getAttribute("data-bloom-text")!==t&&(e.hasAttribute("data-bloom-text")||e.style.setProperty("--bloom-text-size",getComputedStyle(e).fontSize),e.setAttribute("data-bloom-text",t))}var Eu=new x("Events");function Ko(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){Eu.error(`Listener for ${String(t)} failed`,r)}}}}var u={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',composerConversation:"[data-above-composer-conversation-id]",oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",modelTrigger:'[data-testid="model-switcher-dropdown-button"], button[aria-label="Model selector" i]',modelItem:'[role="menu"] [data-testid^="model-switcher-"], [role="menuitem"][data-testid^="model-switcher-"]',homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]',headerMore:'button[aria-label="More" i], button[aria-label="\u66F4\u591A"]'};var vs=/[​-‍﻿]/g,Te=()=>j(u.composerInput),Ce=e=>e instanceof HTMLElement&&e.matches(u.composerInput),Y=(e=Te())=>e?.closest("form")??document.querySelector(u.oldComposerForm);function C(e=Te()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(vs,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(vs,"").trim()}var Tu=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function ne(e,t=Te()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return Tu?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function qs(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:s,value:c}=e;return{first:!c.slice(0,i).includes(`
`),last:!c.slice(s).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var ws=e=>{let t=Y();return(t&&j(e,t))??j(e)},ct=()=>ws(u.stopButton),Cu=()=>{let e=ws(u.sendButton);return e&&!e.matches(u.stopButton)?e:null};function Qo(){let e=Cu();if(e){e.disabled||e.click();return}Te()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var xs=()=>Ft(ct());var Ts=new x("Network"),Mu=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,Lu=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,Wo=1e3,ku=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),W=Ko(),ur=new Map,Ss=new Map,Iu=1,ie=e=>e?ur.get(e)??null:null;function jo(e){let t=ur.get(e);return t||ur.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var Cs=e=>e==="user"||e==="assistant";function Ms(e){let t=e.author?.role;if(!e.id||!Cs(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(l=>typeof l=="string").join(`
`).trim(),i=n.filter(l=>S(l)&&l.content_type==="image_asset_pointer").length,s=e.metadata?.attachments,c=Array.isArray(s)&&s.length>0;return!r&&!i&&!c?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*Wo:null,text:r,hasFiles:c,imageCount:i}}var Ls=e=>e.filter((t,o)=>t.role==="user"||e[o+1]?.role!=="assistant"),dr=e=>e.map(t=>t.createTime).filter(t=>t!=null);function Bu(e,t){let o=dr(e),n=dr(t);return!o.length||!n.length?!1:Math.max(...o)<Math.min(...n)}function Ou(e){let t=dr(e);if(t.length<2)return e;let[o]=t,n=o-e.length;return e.map((i,s)=>(i.createTime!=null&&(n=i.createTime),{message:i,index:s,time:i.createTime??n})).toSorted((i,s)=>i.time-s.time||i.index-s.index).map(i=>i.message)}function Pu(e,t){let o=t.filter(S).map(c=>S(c.message)?c.message:c);for(let c of o)c.id&&c.create_time&&e.times.set(c.id,c.create_time*Wo);let n=o.map(Ms).filter(c=>c!=null),r=new Set(n.map(c=>c.id)),i=e.chain.filter(c=>!r.has(c.id)),s=Bu(n,i)?[...n,...i]:[...i,...n];return e.chain=Ls(Ou(s)),e}function Ru(e,t){if(!S(t)||!(S(t.mapping)||Array.isArray(t.messages)))return null;let o=jo(e);if(typeof t.title=="string"&&t.title&&(o.title=t.title),Array.isArray(t.messages))return Pu(o,t.messages);let n=t.mapping;for(let c of Object.values(n)){let l=c.message?.create_time;c.message?.id&&l&&o.times.set(c.message.id,l*Wo)}let r=[],i=new Set,s=typeof t.current_node=="string"?t.current_node:null;for(;s&&!i.has(s)&&n[s];){i.add(s);let c=n[s].message,l=c?Ms(c):null;l&&r.push(l),s=n[s].parent??null}return r.length&&(o.chain=Ls(r.toReversed())),o}function Du(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}function Hu(e){if(typeof e?.body!="string")return null;let t=Ee(e.body);return S(t)&&typeof t.conversation_id=="string"?t.conversation_id:null}function Nu(e,t){if(!S(e))return;typeof e.type=="string"&&ku.has(e.type)&&(t.handoff=!0);let o=S(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(jo(e.conversation_id).title=e.title,W.emit("conversation",jo(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&Cs(n.author?.role)){let r=n.create_time*Wo;t.conversationId&&jo(t.conversationId).times.set(n.id,r),W.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function Uu(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:s}=await o.read();if(i)break;r+=n.decode(s,{stream:!0});let c=r.split(`
`);r=c.pop()??"";for(let l of c){if(!l.startsWith("data:"))continue;let d=l.slice(5).trim();d&&d!=="[DONE]"&&Nu(Ee(d),t)}}}async function Gu(e,t,o){let n={conversationId:t,error:!1,handoff:!1};Ss.set(e,t),W.emit("generate-start",{requestId:e,conversationId:t});try{let r=await o;r.ok?r.headers.get("content-type")?.includes("event-stream")&&await Uu(r.clone(),n):n.error=!0}catch(r){let i=r instanceof DOMException&&r.name==="AbortError";n.handoff||=i,n.error||=!i}finally{Ss.delete(e),W.emit("generate-end",{requestId:e,...n})}}async function Fu(e,t){try{let o=await t;if(!o.ok)return;let n=Ru(e,await o.clone().json());n&&W.emit("conversation",n)}catch(o){Ts.debug("Conversation read skipped",o)}}function Yu(e,t,o){let n=Du(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&Mu.test(n.pathname)){Gu(Iu++,Hu(t),o);return}let i=r==="GET"&&n.pathname.match(Lu)?.[1];i&&Fu(i,o)}var Es=!1;function ks(){if(Es)return;Es=!0;let e=te.fetch,t=function(o,n){let r=e.call(this??te,o,n);try{Yu(o,n,r)}catch(i){Ts.error("Fetch tap failed",i)}return r};te.fetch=typeof exportFunction=="function"?exportFunction(t,te):t}var Ku="__reactContainer$",Is="__reactFiber$";function zo(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var mr=(e,t)=>Object.keys(e.wrappedJSObject??e).some(o=>o.startsWith(t)),ge=e=>!mr(document,Ku)||mr(e,Is);function Kt(){return document.body?Promise.resolve():new Promise(e=>{let t=new MutationObserver(()=>{document.body&&(t.disconnect(),e())});t.observe(document,{childList:!0,subtree:!0})})}async function Bs(){await Kt();let e=Date.now()+8e3;for(;!mr(document.body,Is)&&Date.now()<e;)await new Promise(t=>setTimeout(t,100))}var Qu=new x("Route"),Os=/\/c\/(?!local-)([\w-]+)/,ju=500,gr=e=>{try{return new URL(e,location.origin).pathname.match(Os)?.[1]??null}catch{return null}},h=()=>location.pathname.match(Os)?.[1]??null,Xo=()=>location.pathname==="/",Wu=/^\/g\/g-p-[^/]+(?:\/project)?\/?$/,Ps=()=>Wu.test(location.pathname),ce=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",Jo=new Set,Zo=location.href,pr=h(),Vo;function fr(){if(location.href===Zo)return;let e={prevHref:Zo,href:location.href,prevId:pr,id:h()};Zo=e.href,pr=e.id;for(let t of Jo)try{t(e)}catch(o){Qu.error("Route listener failed",o)}}function zu(){let e=new AbortController,{navigation:t}=te;t?.addEventListener("currententrychange",()=>queueMicrotask(fr),{signal:e.signal}),addEventListener("popstate",fr,{signal:e.signal});let o=setInterval(fr,ju);return()=>{e.abort(),clearInterval(o)}}function ue(e){return Jo.add(e),Vo||(Zo=location.href,pr=h(),Vo=zu()),()=>{Jo.delete(e),!Jo.size&&(Vo?.(),Vo=void 0)}}var Vu=["data-turn","data-message-author-role"],Ju=/:(user|assistant)$/,hr=`${u.messageUnit}, ${u.oldMessage}`,br=e=>e==="user"||e==="assistant",Ns=()=>!!document.querySelector(u.timelineScroll),Us=()=>!!j(u.timelineScroll),Gs=()=>h()??document.querySelector(u.composerConversation)?.getAttribute("data-above-composer-conversation-id")??"",ut=()=>Ns()?j(u.timelineScroll):document;function jt(){if(Ns())return j(u.timelineScroll);let e=document.querySelector(u.turn);for(let t=e?.parentElement;t;t=t.parentElement){let{overflowY:o}=getComputedStyle(t);if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight)return t}return document.scrollingElement}var dt=e=>e.getAttribute("data-chatgpt-search-unit-key")?.match(Ju)?.[1]??null,Fs=e=>[...e.querySelectorAll(u.searchUnit)].filter(t=>dt(t)&&!t.parentElement?.closest(u.searchUnit)),Rs=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function Qt(e){let t=Rs(e);return t.length?t:[...new Set([...e.querySelectorAll(hr)].flatMap(Rs))]}function mt(e=ut()){if(!e)return[];let t=Fs(e);return t.length?t:[...e.querySelectorAll(hr)].filter(o=>!o.parentElement?.closest(hr))}function Zu(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function Xu(e){for(let t of Vu){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(br(o))return o}return e.querySelector(u.markdown)||e.querySelector(u.generatedImage)?"assistant":null}var $u=e=>!e.parentElement?.closest(u.turn);function Me(){let e=ie(h())?.chain??[];return[...ut()?.querySelectorAll(u.turn)??[]].filter($u).flatMap(o=>{let n=Fs(o),r=n.length?n.map(i=>({el:i,known:dt(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=d=>!n.some(m=>m.contains(d))&&b(d.textContent??""),s=[...o.querySelectorAll(u.assistantMarkdown)].find(d=>i(d)&&!$o.test(b(d.textContent??""))),c=[...o.querySelectorAll(u.activityHeader)].findLast(i),l=s??c;l&&r.push({el:l,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?Qt(o):mt(o).flatMap(Qt),s=n??Xu(o)??Zu(i,e)??(r%2?"assistant":"user"),c=o.closest(u.turn)??o,l=!o.closest(u.searchUnit)&&!!c.querySelector(u.turnBusy),d=s==="assistant"&&(o.matches(u.turnBusy)||!!o.querySelector(u.turnBusy)||l);return{el:o,role:s,messageIds:i,streaming:d}})}var _u="[data-bloom], .sr-only",Ys=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,$o=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,Ds=new WeakMap;function ft(e){let o=(e.el.closest(u.turn)??e.el).textContent?.length??0,n=Ds.get(e.el);if(n?.length===o)return n.summary;let r=ed(e);return Ds.set(e.el,{length:o,summary:r}),r}function Hs(e){let t=new Set,o=[];for(let n of e.querySelectorAll(u.assistantMarkdown)){if(n.closest(u.searchUnit))continue;let r=b(n.textContent??"");!r||$o.test(r)||Ys.test(r)||t.has(r)||(t.add(r),o.push(r))}return o}function ed(e){let t=e.el.querySelectorAll(u.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.closest(u.turn);if(e.role==="assistant"&&o&&e.el.matches(u.assistantMarkdown)&&!e.el.closest(u.searchUnit)){let l=Hs(o);if(l.length)return l.join(" \xB7 ")}let n=e.el.querySelector(e.role==="assistant"?u.markdown:".whitespace-pre-wrap")??e.el,i=[...n.querySelectorAll(_u)].map(l=>b(l.textContent??"")).filter(Boolean).reduce((l,d)=>l.replace(d,`
`),n.innerText||n.textContent||""),s=i.split(`
`).map(b).filter(l=>l&&!Ys.test(l)&&!$o.test(l));if(s.length)return s.join(" ");if(e.role==="assistant"&&o){let l=Hs(o);if(l.length)return l.join(" \xB7 ")}let c=i.split(`
`).map(b).filter(l=>$o.test(l));return c.length?c.at(-1)??"":e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function _o(e){return e.text?b(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var Ar=e=>e.matches(u.timelineScroll)&&getComputedStyle(e).flexDirection==="column-reverse";var td=250,od=400,nd=6e4,rd=5e3,id=`:is(${u.turn}) :is(${u.turnBusy})`,q=Ko(),on=new Set,yr=new Set,Le=!1,Qs=0,pt=null,gt=!1,en=!1,Wt=0,nn=!1,zt=null,Ks=!1,B=()=>({generating:Le,conversationId:h()}),js=()=>xs()||!!ut()?.querySelector(id);function sd(){let e=js();return e?en||(Wt=0,nn=!0):en=!1,[...on].some(t=>!yr.has(t))||e&&!en||Date.now()<Wt}function ad(){return zt?.error?"error":gt?"stopped":"done"}function ld(){pt=null,Le=!1,nn=!1,q.emit("fall",{conversationId:h(),outcome:ad()}),gt=!1,zt=null}function Ws(){let e=sd();e&&!Le&&(Le=!0,Qs=Date.now(),gt=!1,zt=null,q.emit("rise",{conversationId:h()})),e||!Le?pt=null:pt==null?pt=Date.now():Date.now()-pt>=od&&ld()}function tn(){Ws(),q.emit("tick",B())}function cd({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(Le||Date.now()-Qs<nd);if(!o&&Le){for(let n of on)yr.add(n);en=js(),Wt=0,nn=!1,pt=null,Le=!1,gt=!1,zt=null,q.emit("fall",{conversationId:e,outcome:"left"})}q.emit("context",{prevId:e,id:t,migrated:o}),tn()}function ud(e){e.target instanceof Element&&e.target.closest(u.stopButton)&&(gt=!0,Wt=0)}function zs(){Ks||(Ks=!0,W.on("generate-start",({requestId:e})=>{on.add(e),tn()}),W.on("generate-end",e=>{on.delete(e.requestId),!yr.delete(e.requestId)&&(zt=e,Wt=e.handoff&&!e.error&&!gt&&!nn?Date.now()+rd:0,tn())}),ue(cd),document.addEventListener("click",ud,!0),ys(tn,td),zo().then(()=>L(Ws)))}var Vs={BetterNavigator:1791113402e3,BetterQuotes:1791113402e3,ChatListStatus:1791113402e3,ChatStateFavicons:1791113402e3,Cleaner:1791113402e3,ComposerOpacity:1791113402e3,Continue:1791113402e3,CustomSidebarIdentity:1791113402e3,GreetingCustomizer:1791113402e3,InputHistory:1791113402e3,MessageTimestamps:1791113402e3,NoDictation:1791113402e3,NoShareLink:1791113402e3,NoSidebarIdentity:1791113402e3,PromptQueue:1791113402e3,RecentTopics:1791113402e3,ResponseNotification:1791113402e3,Settings:1791113402e3,SidebarIdentityOpacity:1791113402e3,StarChats:1791113402e3,StreamerMode:1791113402e3,TemporaryChat:1791113402e3,UserQuotes:1791113402e3,WiderChat:1791113402e3};var y=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,dd="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",md={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${dd}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:y('<path d="M18 6 6 18M6 6l12 12"/>'),gear:y('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:y('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:y('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:y('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:y('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:y('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:y('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:y('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:y('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:y('<path d="m6 9 6 6 6-6"/>'),play:y('<path d="M7 4v16l13-8z"/>'),plus:y('<path d="M12 5v14M5 12h14"/>'),check:y('<path d="m5 12 5 5 9-10"/>'),alert:y('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:y('<path d="M4 5h16v11H9l-5 4z"/>'),layout:y('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:y('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:y('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:y('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:y('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:y('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:y('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:y('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:y('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:y('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:y('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:y('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:y('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:y('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:y('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:y('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),ghost:y('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},R=e=>As(md[e]);var he="data-bloom-tip",vr=6,qr=8,Ye,Js=null;function ht(e){if(e===Js)return;if(Js=e,!e){Ye?.remove();return}Ye??=a("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),Ye.textContent=e.getAttribute(he),document.body.append(Ye);let t=e.getBoundingClientRect(),{width:o,height:n}=Ye.getBoundingClientRect(),r=t.bottom+vr+n<=innerHeight-qr;Ye.style.left=`${Se(t.left+t.width/2-o/2,qr,innerWidth-o-qr)}px`,Ye.style.top=`${r?t.bottom+vr:t.top-vr-n}px`}var Zs=e=>e instanceof Element?e.closest(`[${he}]`):null;function Xs(){let e=new AbortController,t={passive:!0,signal:e.signal};return document.addEventListener("pointerover",o=>ht(Zs(o.target)),t),document.addEventListener("pointerout",o=>o.relatedTarget||ht(null),t),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&ht(Zs(o.target)),t),document.addEventListener("focusout",()=>ht(null),t),document.addEventListener("pointerdown",()=>ht(null),t),()=>{e.abort(),ht(null)}}function wr(e,t,o,n=!1){let r=a("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let s=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(s)),t(s)}),r}function K(e,t,o){return a("button",{class:Bo("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button","data-bloom":"control"},on:{click:t}})}function J(e,t,o,n){let r=a("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":t,"data-bloom":"control",[he]:t},on:{click:o}},R(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function rn(e,t,o,n,r,i){let s=a("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});s.value=String(e);let c=a("output",{text:`${s.value}${r}`});return s.addEventListener("input",()=>{c.textContent=`${s.value}${r}`,i(Number(s.value))}),a("div",{class:"bloom-slider"},s,c)}function xr(e,t,o){let n=a("select",{class:"bloom-select"},...t.map(r=>a("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function Vt(e,t,o="",n="text"){let r=a("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var fd=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,$s=/\S+@\S+\.\S+/,pd=3,gd=/^\/g\/(g-p-[^/]+)\//,hd=/^g-p-[0-9a-f]+-?/i,_s=e=>!!e.closest(".sr-only"),Sr=e=>!!e?.querySelector(u.menuButton);function ea(){return[...document.querySelectorAll(u.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(Sr)).filter(e=>e!=null)}function ta(){let e=[...document.querySelectorAll(u.oldProfile)];if(e.length)return e.map(o=>{let n=o.parentElement?.children.length===1?o.parentElement:o;return{kind:"profile",anchor:n,insert:r=>n.before(r)}});let t=ea().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(u.rail)){let n=[...o.children].find(Sr);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}var Er=e=>!e.closest("[data-bloom]")&&(!!e.querySelector("img, [class*=rounded-full]")||ia(e).some(t=>!_s(t))),oa=e=>[...e.parentElement?.children??[]].find(t=>t!==e&&t instanceof HTMLElement&&Er(t))??null;function na(){let e=[...document.querySelectorAll(u.oldProfile)];return e.length?e:[...ea(),...[...document.querySelectorAll(u.rail)].map(o=>[...o.children].findLast(Sr))].map(o=>[...o?.querySelectorAll(u.menuButton)??[]].findLast(n=>Er(n)||oa(n))).filter(o=>o!=null)}var ra=()=>na().map(e=>Er(e)?e:oa(e)).filter(e=>e!=null);function ia(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!b(t.textContent??"")&&!(t instanceof SVGElement))}var bd=e=>{if(/rounded-full/.test(e.getAttribute("class")??""))return!0;if(!e.clientWidth)return!1;let{borderRadius:t}=getComputedStyle(e);return t.includes("%")||Number.parseFloat(t)>=e.clientWidth/2};function sn(e,t,o){for(let n of e.querySelectorAll(`[${t}]`))n!==o&&n.removeAttribute(t);o&&!o.hasAttribute(t)&&o.setAttribute(t,"")}function Ad(e,t){if(b(e.textContent??"").length>pd)return null;let o=e.closest("button");for(let n=e;n&&n!==t&&n!==o;n=n.parentElement)if(bd(n))return n;return null}function Tr(e,t){e.hasAttribute(`data-bloom-${t}`)||e.setAttribute(`data-bloom-${t}`,"");let o=e.querySelector("img:not([data-bloom] img)"),n=ia(e),r=o?null:n.map(m=>Ad(m,e)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),s=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");sn(e,`data-bloom-${t}-avatar`,s);let c=n.filter(m=>!s?.contains(m)&&!_s(m)),l=c.find(m=>fd.test(b(m.textContent??""))),d=c.find(m=>$s.test(m.textContent??""));sn(e,`data-bloom-${t}-plan`,l),sn(e,`data-bloom-${t}-email`,d),sn(e,`data-bloom-${t}-name`,c.find(m=>m!==l&&m!==d))}function yd(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function an(){return na().map(yd).find(e=>e!=null)??[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&($s.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var Jt=e=>[...document.querySelectorAll(u.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&gr(t.href)===e);function sa(e){let t=Jt(e).find(o=>b(o.textContent??""));return t?b(t.textContent??""):null}function aa(e){let t=new URL(e,location.origin).pathname.match(gd)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!gr(n.href)&&b(n.textContent??""));return o?b(o.textContent??""):t.replace(hd,"").replaceAll("-"," ")||null}var Cr=0,ln;function vd(e){if(!G(e))return;for(let o of ra())Tr(o,"profile");let t=an();t&&Tr(t,"menu")}function de(){Cr++;let e=!0;return Kt().then(()=>{e&&Cr&&!ln&&(ln=L(vd))}),()=>{e&&(e=!1,!--Cr&&(ln?.(),ln=void 0))}}var qd=new x("SettingsPanel"),g=E("bloom-settings-"),wd=10080*60*1e3,xd=3e3,la="Toggle features. Some need a reload. Click the sliders icon to configure.",Sd=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Ed=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],Td={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},ua=new Set(["chat","ui","privacy"]),z=null,Qe="all",Mr="all",cn="",Lr=[],da=()=>[...Ge.values()].filter(e=>!e.hidden),Cd=e=>!!e.updatedAt&&Date.now()-e.updatedAt<wd;function Md(e){switch(Qe){case"favorites":return No.has(e.name);case"recent":return Cd(e);case"all":return!0;case"other":return!e.tags.some(t=>ua.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(Qe)}}function Ld(e){switch(Mr){case"all":return!0;case"enabled":return Ut(e);case"disabled":return!Ut(e)}}function kd(e){let t=cn.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function Id(e){let t=Ho.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return Qe==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var ma=e=>e.settings?.def??{},Bd=e=>Object.values(ma(e)).some(t=>t.type!=="custom");function Od(e,t,o){let n=Ne(e.name,t)??ar(o),r=i=>Ue(e.name,t,i);switch(o.type){case"boolean":return wr(n,r,o.description??t);case"slider":return rn(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return xr(n,o.options,r);case"string":return Vt(n,r,o.placeholder);case"number":return Vt(String(n),i=>r(Number(i)),"","number");case"component":{let i=a("div",{class:g("component")});return Lr.push(o.render(i)),i}case"custom":return null}}var Pd=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function fa(e){if(!z)return;let t=Object.entries(ma(e)).filter(([,i])=>i.type!=="custom").map(([i,s])=>{let c=Od(e,i,s),l=s.type==="boolean",d=s.type!=="component"&&a("div",{class:g("field-label"),text:Pd(i)}),m=s.description&&a("div",{class:g("field-desc"),text:s.description});return a("div",{class:g("field",l?"field-inline":"field-stacked")},(d||m)&&a("div",{class:g("field-text")},d,m),c)}),o,n=K("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},xd);return}clearTimeout(o),e.settings?.reset(),Zt(),fa(e)},"danger"),r=a("div",{class:g("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&Zt()}},a("div",{class:g("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},a("div",{class:g("popup-header")},a("div",{class:g("card-icon")},R(e.icon)),a("div",{class:g("popup-title")},a("div",{class:g("card-name"),text:e.name}),a("div",{class:g("popup-authors"),text:e.authors.join(", ")})),J("close","Close",Zt)),a("p",{class:g("popup-desc"),text:e.description}),a("div",{class:g("fields")},...t),a("div",{class:g("popup-footer")},n)));z.querySelector(`.${g("modal")}`)?.append(r)}function Zt(){for(let e of Lr)e();Lr=[],z?.querySelector(`.${g("popup-backdrop")}`)?.remove()}function ca(e){let t=Ut(e),o=No.has(e.name),n=Ho.has(e.name),r=!!e.required;return a("div",{class:[g("card",t?"card-on":"card-off"),r?g("card-required"):""].filter(Boolean).join(" ")},a("div",{class:g("card-top")},a("div",{class:g("card-icon")},R(e.icon)),a("div",{class:g("card-actions")},J("star",o?"Unstar":"Star",()=>{No.toggle(e.name),Ke()},o),r?null:J("pin",n?"Unpin":"Pin to top",()=>{Ho.toggle(e.name),Ke()},n),r?a("span",{class:g("required-mark"),attrs:{"aria-label":"Required",[he]:"This plugin is required for Bloom++ to work"}},R("alert")):null,Bd(e)&&J("gear","Settings",()=>fa(e)),wr(t,i=>ps(e,i),r?`${e.name} is required`:`Enable ${e.name}`,r))),a("div",{class:g("card-name"),text:e.name}),a("div",{class:g("card-desc"),text:e.description,title:e.description}),a("div",{class:g("card-footer"),text:e.authors.join(", ")}))}function pa(){let e=da().some(o=>!o.tags.some(n=>ua.has(n)));z?.querySelector(`.${g("tabs")}`)?.replaceChildren(...Sd.filter(o=>o.id!=="other"||e).map(o=>a("button",{class:g("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===Qe)},on:{click:()=>{Qe=o.id,pa(),Ke()}}})))}function Ke(){if(!z)return;let e=da().filter(Md),t=z.querySelector(`.${g("search")} input`);t&&(t.placeholder=`Search ${ko(e.length,"plugin")}...`);let o=Id(e.filter(d=>kd(d)&&Ld(d))),n=Qe==="all",r=n?o.filter(d=>!d.required):o,i=n?o.filter(d=>d.required):[],s=[...r.map(ca),...i.length?[a("div",{class:g("required-break"),attrs:{role:"separator"}}),...i.map(ca)]:[]],c=cn.trim()?"No plugins match your search.":Td[Qe]??"No plugins available.";z.querySelector(`.${g("grid")}`)?.replaceChildren(...s.length?s:[a("div",{class:g("empty"),text:c})])}function Rd(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),z?.querySelector(`.${g("popup-backdrop")}`)?Zt():bt())}var ga,kr;function Dd(){if(z)return;let e=a("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=cn,e.addEventListener("input",()=>{cn=e.value,Ke()}),z=a("div",{class:`bloom-root ${g("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&bt()}},a("div",{class:g("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},a("div",{class:g("header")},a("div",{class:g("logo")},R("bloom")),a("h2",{class:g("title"),text:"Bloom++"}),a("span",{class:g("hint"),attrs:{"aria-label":la,tabindex:"0",[he]:la}},R("info")),a("span",{class:g("version"),text:"v2.0.71"}),J("close","Close",bt)),a("div",{class:g("tabs"),attrs:{role:"tablist"}}),a("div",{class:g("toolbar")},a("label",{class:g("search")},R("search"),e),xr(Mr,Ed,t=>{Mr=t,Ke()})),a("div",{class:g("grid")}))),z.addEventListener("keydown",t=>t.stopPropagation()),kr=new AbortController,document.addEventListener("keydown",Rd,{capture:!0,signal:kr.signal}),document.body.append(z),pa(),Ke(),ga=gs(Ke),e.focus(),qd.debug("Opened")}function bt(){Zt(),kr?.abort(),ga?.(),z?.remove(),z=null}var un=()=>z?bt():Dd();var ha=`/*
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

.bloom-entry-expanded.bloom-entry-hover:not(:hover > *),
.bloom-entry-hover:not(.bloom-entry-expanded, :hover, :has(~ :hover)) {
    display: none;
    transition: display 0s 0.2s allow-discrete;
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

:has(> .bloom-entry-hover) {
    anchor-scope: --bloom-account;
}

:has(> .bloom-entry-hover):has(button[aria-haspopup="menu"][aria-expanded="true"]) > .bloom-entry-hover {
    display: none;
}

:has(> .bloom-entry-hover) :is([data-bloom-profile]:is(button), :has(> [data-bloom-profile]) > button[aria-haspopup="menu"]) {
    anchor-name: --bloom-account;
}

.bloom-entry-hover {
    position: absolute;
    position-anchor: --bloom-account;
    inset: auto anchor(right) anchor(top) anchor(left);
    z-index: 30;
    display: block;
    padding: 0;
    pointer-events: none;
}

.bloom-entry-rail.bloom-entry-hover {
    --bloom-entry-x: 0.5;
}

.bloom-entry-hover .bloom-entry-button {
    position: relative;
    left: calc(var(--bloom-entry-x) * 100%);
    width: max-content;
    min-width: 2.25rem;
    background-color: var(--bloom-surface);
    box-shadow: 0 0 0 1px var(--bloom-border-light), 0 0.25rem 0.75rem #0000001a;
    transform: translateX(calc(var(--bloom-entry-x) * -100%));
    pointer-events: auto;
    touch-action: none;
}

.bloom-entry-hover .bloom-entry-button:hover {
    background-image: linear-gradient(var(--bloom-hover), var(--bloom-hover));
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

.bloom-settings-card-required {
    opacity: 0.4;
}

.bloom-settings-required-break {
    grid-column: 1 / -1;
    height: 1px;
    margin-block: 0.25rem;
    background: var(--bloom-border);
}

.bloom-settings-required-mark {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.75rem;
    height: 1.75rem;
    color: var(--bloom-fg-3);
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
`;var ke=E("bloom-entry-"),Nd=4,Ir="--bloom-entry-x",Br=1,At=p({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar. The account menu and the userscript menu always open the panel.",default:!1},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:!0},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:e=>(e.append(K("Reset position",()=>{At.store.entryPosition=Br})),()=>e.replaceChildren())},entryPosition:{type:"custom",default:Br}}),je=new Map,ba=!1,Aa=[];function Ud(e,t,o){let n=e.currentTarget,r=t.clientWidth-n.offsetWidth;if(e.button!==0||r<=0||!t.classList.contains(ke("hover")))return;let i=At.store.entryPosition,s=i,c=!1,l=new AbortController;n.setPointerCapture(e.pointerId),n.addEventListener("pointermove",m=>{!c&&Math.abs(m.clientX-e.clientX)<Nd||(c=!0,o(),s=Se(i+(m.clientX-e.clientX)/r,0,Br),t.style.setProperty(Ir,String(s)))},{signal:l.signal});let d=()=>{l.abort(),c&&(At.store.entryPosition=s,t.style.removeProperty(Ir))};n.addEventListener("pointerup",d,{signal:l.signal}),n.addEventListener("lostpointercapture",d,{signal:l.signal})}function Gd(e){let t=!1,o=a("button",{class:ke("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),t||un(),t=!1},pointerdown:r=>{t=!1,e!=="rail"&&Ud(r,n,()=>{t=!0})}}},R("bloom"),e!=="rail"&&a("span",{class:ke("label"),text:"Bloom++"})),n=a("div",{class:`bloom-root ${ke("wrap")} ${ke(e)}`,attrs:{"data-bloom":"entry"}},o);return n}function Fd(e){let t=a("div",{class:`bloom-root ${ke("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),un()}}},R("bloom"),a("span",{text:"Bloom++"})),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function ya(){let{showSidebarEntry:e,showSidebarEntryOnHover:t}=At.store,o=e||t?ta():[];for(let[r,i]of je)r.isConnected&&o.some(s=>s.anchor===r)||(i.remove(),je.delete(r));for(let r of o){let i=je.get(r.anchor);if(i?.isConnected||!ge(r.anchor))continue;let s=i??Gd(r.kind);je.set(r.anchor,s),r.insert(s)}for(let r of je.values())r.classList.toggle(ke("hover"),!e);let n=an();n&&!n.querySelector('[data-bloom="menu-entry"]')&&Fd(n)}var va=f({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:At,styles:()=>`${ha}.${ke("hover")}{${Ir}:${At.store.entryPosition}}`,start(){Aa=[L(ya),Xs(),de()],!ba&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",un),ba=!0)},stop(){for(let e of Aa)e();for(let e of je.values())e.remove();je.clear(),bt()},onSettingsChange:ya});var qa=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

.bloom-nav-root {
    position: fixed;
    z-index: 30;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    contain: layout style;
}

.bloom-nav-rail {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.375rem;
    max-height: 100%;
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
    max-height: 100%;
    overflow: auto;
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
`;var O=E("bloom-nav-"),fn=80,Kd=1200,Qd=2,wa=3e4,jd=200,Wd=.9,zd=.28,Vd=24,yt=8,Jd=80,Zd=12,Xd={user:"\u2753",assistant:"\u{1F916}"},$d=["wheel","touchmove","pointerdown"],pn=p({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),P=null,k=[],re=-1,ze=-1,qt=null,dn="",Pr=0,xa=[],_t=null,mn=null,We,Xt,Rr="",vt=[],_d=e=>pn.store.showAssistant||e.role==="user",em=e=>e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.messageIds[0]||e.role;function tm(e){return{role:e.role,summary:ft(e),ids:e.messageIds,turn:e,streaming:e.streaming}}function La(e,t){let o=e.entries.at(-1);if(o?.role==="assistant"&&t.role==="assistant"){e.entries[e.entries.length-1]={...t,ids:[...new Set([...o.ids,...t.ids])]};return}e.entries.push(t)}function om(){let e=[];for(let t of Me()){let o=tm(t),n=em(t),r=e.at(-1);r?.key===n?La(r,o):e.push({key:n,entries:[o]})}return e}function nm(){let e=[];for(let t of ie(h())?.chain??[]){let o={role:t.role,summary:_o(t),ids:[t.id],turn:null,streaming:!1},n=e.at(-1);t.role==="assistant"&&n?La(n,o):e.push({key:t.id,entries:[o]})}return e}var Sa=e=>e.entries.flatMap(t=>t.ids);function Dr(e,t){let o=new Set(Sa(e));return Sa(t).some(n=>o.has(n))}var Ve=e=>b(e.entries.find(t=>t.role==="user")?.summary??""),Or=(e,t)=>e.filter(o=>Ve(o)===t).length,Hr=e=>({...e,turn:null,streaming:!1});function rm(e,t){let o=new Set(t.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return e.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return Hr(r);let s=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return s&&s!==n.key?Hr(r):r})}))}function im(e,t){let o=t.entries.map((n,r)=>{let i=e.entries[r];if(!i)return n;let s=[...new Set([...n.ids,...i.ids])];return{...n,ids:s,summary:n.summary||i.summary}});for(let n of e.entries.slice(o.length))o.push(Hr(n));return{key:e.key,entries:o}}function ka(){let e=jt();if(!e)return!1;let t=e.clientHeight-e.scrollHeight;return e.scrollTop-t<=Math.abs(e.scrollTop)}function sm(e,t){let o=rm(e,t);if(!t.length)return o;if(!o.length)return t;let n=t.findIndex(l=>o.some(d=>d.key===l.key));if(n<0)return ka()?t.concat(o):o.concat(t);let r=t[n]?.key,i=o.findIndex(l=>l.key===r),s=o.slice(0,i).concat(t.slice(0,n),o.slice(i)),c=s.findIndex(l=>l.key===r);for(let l=n;l<t.length;l++){let d=t[l];if(!d)continue;let m=s.findIndex(v=>v.key===d.key);if(m>=0){let v=s[m];v&&(s[m]=im(v,d)),c=m}else s.splice(c+1,0,d),c++}return s}function am(e,t){let o=0,n=0,r=0;for(let i=1-e.length;i<t.length;i++){let s=0,c=0;for(let d=0;d<e.length;d++){let m=t[d+i],v=e[d];!m||!v||(Dr(v,m)?(s+=3,c++):Ve(v)&&Ve(v)===Ve(m)&&s++)}let l=ka()?i<r:i>r;(s>o||s===o&&c>n||s===o&&c===n&&l)&&(o=s,n=c,r=i)}return{score:o,offset:r}}function lm(e,t){let o=e.entries.map((n,r)=>{let i=t.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of t.entries.slice(o.length))o.push({...n,turn:null});return{key:e.key,entries:o}}function cm(e){return e.map(t=>({key:t.key,entries:t.entries.map(o=>({...o}))}))}function um(e,t){if(!t.length)return e;if(!e.length)return t;let{score:o,offset:n}=am(e,t),r=cm(e);if(o>0)for(let c=0;c<r.length;c++){let l=t[c+n],d=r[c];if(!l||!d)continue;let m=Ve(d),v=!!m&&m===Ve(l)&&Or(e,m)===1&&Or(t,m)===1;(Dr(d,l)||v)&&(r[c]=lm(d,l))}let i=[],s=[];for(let c=0;c<t.length;c++){let l=t[c];if(!l)continue;let d=Ve(l);!d||Or(r,d)>0||r.some(m=>Dr(m,l))||(o>0&&c<n?i.push(l):s.push(l))}return i.concat(r,s)}function dm(){let e=Gs();e!==Rr&&(Rr=e,vt=[]);let t=om(),o=nm();return!t.length&&!o.length&&!Us()?(vt=[],[]):(vt=um(sm(vt,t),o),vt.flatMap(n=>n.entries).filter(_d))}function mm(e){for(let o of e)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!B().generating||e.some(o=>o.streaming))return;let t=e.at(-1);t&&(t.role==="assistant"||!pn.store.showAssistant?t.streaming=!0:e.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function Ia(){let e=dm();return mm(e),e}function Ba(e){let t=e.getBoundingClientRect(),o=Y()?.getBoundingClientRect().top,n=Math.min(t.bottom,o&&o>t.top?o:t.bottom);return{top:t.top,bottom:n}}function Oa(e){return((e.matches(".whitespace-pre-wrap, .markdown, .prose, [data-markdown-text-style]")?e:e.querySelector(".whitespace-pre-wrap")??e.querySelector(".markdown, .prose, [data-markdown-text-style]"))??e).getBoundingClientRect().top}function Ea(e){let t=k[e]?.turn?.el;return t?.isConnected?t:null}function fm(e){if(!k.length)return null;let t=e.scrollHeight-e.clientHeight,o=Ar(e),n=Math.min(e.scrollTop,0),r=o?-n:t-e.scrollTop,i=o?t+n:e.scrollTop,s=t<=yt||r<=yt,c=t>yt&&i<=yt,{top:l,bottom:d}=Ba(e),m=Ea(0),v=m?Oa(m):Number.NaN,F=!!m&&v>=l-yt&&v<=l+48,A=Ea(k.length-1),U=A?.getBoundingClientRect().bottom??Number.NaN,De=!!A&&U<=d+yt&&U>=d-Jd;return s||De?"bottom":c||F?"top":null}function pm(e){let{top:t,bottom:o}=Ba(e),n=t+Math.max(o-t,0)*zd,r=[],i=-1;if(k.forEach((c,l)=>{let d=c.turn?.el;if(!d?.isConnected){r.push(Number.NaN);return}let m=Oa(d);r.push(m),i<0&&(i=l),m<=n&&(i=l)}),i<0)return Math.max(k.findIndex(c=>c.turn),0);let s=r[re];return Number.isFinite(s)?i===re?re:i>re?i:s<=n+Vd?re:i:i}function gm(e){let t=fm(e);return t==="bottom"?k.length-1:t==="top"?0:pm(e)}function Ta(e){pn.store.jumpEffect==="border"&&(e.classList.add(O("flash")),setTimeout(()=>e.classList.remove(O("flash")),Kd))}function gn(e){let t=k[e],o=jt();if(!t||!o)return;if(!t.turn&&!t.ids.length){ze=e,$t(),o.scrollTo({top:Ar(o)?0:o.scrollHeight});return}ze=e,qt=e?null:{chat:h(),first:t.ids[0],until:Date.now()+wa},$t();let n=t.turn?.el;if(n?.isConnected){let d=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:d<o.clientHeight*Qd?"smooth":"auto"}),Ta(n);return}let r=k.findIndex(d=>d.turn),i=r>=0&&e<r?-1:1,s=++Pr,c=Date.now()+wa,l=()=>{let d=jt();if(s!==Pr||Date.now()>c||!d)return;k=Ia();let m=k.find(F=>F.ids.some(A=>t.ids.includes(A)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),Ta(m),ze=k.findIndex(F=>F.turn?.el===m),$t();return}let v=d.scrollTop;d.scrollBy({top:i*d.clientHeight*Wd,behavior:"instant"}),d.scrollTop===v?setTimeout(l,jd):requestAnimationFrame(l)};l()}function hm(e,t){return a("button",{class:O("row"),attrs:{type:"button","data-index":String(t),"data-message-id":e.ids[0]??""},on:{click:()=>gn(t)}},a("span",{text:Xd[e.role]}),a("span",{class:"bloom-truncate",text:le(e.summary||"\u2026",fn)}))}function Ca(e){if(!P)return;let t=e.getBoundingClientRect(),o=Y()?.getBoundingClientRect().top,r=Math.min(t.bottom,o&&o>t.top?o:t.bottom)-t.top;P.style.right=`${document.documentElement.clientWidth-t.left-e.clientLeft-e.clientWidth+Zd}px`,P.style.top=`${t.top}px`,P.style.height=r>1?`${r}px`:""}function bm(){let e=jt();if(k=Ia(),!k.length||!e){P?.remove(),P=null,dn="";return}if(_t!==e){Xt?.abort(),Xt=new AbortController,e.addEventListener("scroll",lt($t),{passive:!0,signal:Xt.signal});for(let n of $d)e.addEventListener(n,Pa,{passive:!0,signal:Xt.signal});_t=e,We?.disconnect(),We=new ResizeObserver(()=>{e.isConnected&&Ca(e)}),We.observe(e),mn=null}let t=Y();t&&t!==mn&&We&&(We.observe(t),mn=t),P??=a("div",{class:`bloom-root ${O("root")}`,attrs:{"data-bloom":"navigator"}},a("div",{class:O("rail")}),a("div",{class:O("toc")},a("div",{class:O("toc-head")}),a("div",{class:O("toc-list")}))),P.isConnected||document.body.append(P),Ca(e);let o=JSON.stringify(k.map(n=>[n.role,n.ids]));o!==dn?(dn=o,ze=-1,ym(),qt&&Date.now()<qt.until&&qt.chat===h()&&k[0]?.ids[0]!==qt.first&&gn(0)):Am(),$t()}function $t(){if(!P||!_t)return;re=ze>=0?ze:gm(_t),P.querySelectorAll(`.${O("tick")}`).forEach((t,o)=>t.classList.toggle(O("tick-current"),o===re)),P.querySelectorAll(`.${O("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===re)));let e=P.querySelector(`.${O("toc-head")}`);e&&(e.textContent=`${re+1} / ${k.length}`)}function Am(){P?.querySelectorAll(`.${O("tick")}`).forEach((e,t)=>{let o=k[t],n=le(o.summary,fn);e.title!==n&&(e.title=n),e.classList.toggle(O("tick-streaming"),o.streaming)}),P?.querySelectorAll(`.${O("row")}`).forEach(e=>{let t=e.lastElementChild,o=le(k[Number(e.dataset.index)].summary||"\u2026",fn);t&&t.textContent!==o&&(t.textContent=o)})}function ym(){P?.querySelector(`.${O("rail")}`)?.replaceChildren(...k.map((t,o)=>a("button",{class:Bo(O("tick"),O(`tick-${t.role}`),t.streaming&&O("tick-streaming"),o===re&&O("tick-current")),title:le(t.summary,fn),attrs:{type:"button","aria-label":`Jump to message ${o+1}`,"data-message-id":t.ids[0]??""},on:{click:()=>gn(o)}}))),P?.querySelector(`.${O("toc-list")}`)?.replaceChildren(...k.map(hm))}var be=lt(bm);function Pa(){ze=-1,qt=null,Pr++}var vm=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function Ma(e){if(!P||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||vm(document.activeElement)||document.querySelector("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:re-1,ArrowDown:re+1,Home:0,End:k.length-1}[e.key];if(o==null){Pa();return}o<0||o>=k.length||(e.preventDefault(),e.stopPropagation(),gn(o))}var Ra=f({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:pn,styles:qa,start(){xa=[L(e=>G(e)&&be()),ue(be),W.on("conversation",be),q.on("rise",be),q.on("fall",be)],addEventListener("keydown",Ma,!0),addEventListener("resize",be,{passive:!0}),be()},stop(){for(let e of xa)e();Xt?.abort(),We?.disconnect(),We=void 0,_t=null,mn=null,removeEventListener("keydown",Ma,!0),removeEventListener("resize",be),P?.remove(),P=null,dn="",vt=[],Rr=""},onSettingsChange:be});var Da=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

.bloom-quotes-hit {
    background: color-mix(in srgb, var(--bloom-fg) 16%, transparent);
    border-radius: 0.25rem;
}

button.bloom-quotes-back {
    position: fixed;
    z-index: 30;
    padding: 0.15rem 0.45rem;
    border: 0;
    border-radius: 999px;
    background: var(--bloom-card, var(--main-surface-primary, #fff));
    color: var(--bloom-fg);
    font: inherit;
    font-size: 0.75rem;
    box-shadow: 0 1px 4px color-mix(in srgb, var(--bloom-fg) 25%, transparent);
    cursor: pointer;
}

.bloom-quotes-chip {
    position: fixed;
    z-index: 30;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    max-width: 40rem;
    padding: 0.35rem 0.45rem 0.35rem 0.7rem;
    border: 1px solid color-mix(in srgb, var(--bloom-fg) 16%, transparent);
    border-radius: 0.75rem;
    background: var(--bloom-card, var(--main-surface-primary, #fff));
    color: var(--bloom-fg-2);
    box-shadow: 0 4px 16px color-mix(in srgb, #000 12%, transparent);
    cursor: pointer;
}

.bloom-quotes-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

button.bloom-quotes-x {
    flex: none;
    width: 1.5rem;
    height: 1.5rem;
    padding: 0;
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: var(--bloom-fg);
    font: inherit;
    cursor: pointer;
}
`;var Z=E("bloom-quotes-"),Wr="BloomBetterQuotes",wm=40,Ga=8,xm=1800,Fr=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,Ha=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,Je=p({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),Nr,Ur,wt,Gr=!1,Yr=0,hn=null,bn=null,Ae=null;function zr(){return location.pathname.match(/\/c\/(?!local-)([\w-]+)/)?.[1]??(new URLSearchParams(location.search).get("temporary-chat")==="true"?"temporary":"draft")}function yn(){try{let e=JSON.parse(sessionStorage.getItem(Wr)??"[]");return Array.isArray(e)?e.filter(t=>!!t&&typeof t=="object"&&typeof t.id=="string"&&typeof t.text=="string"&&!!t.text):[]}catch{return[]}}function Vr(e){try{sessionStorage.setItem(Wr,JSON.stringify(e.slice(-wm)))}catch{}}function eo(e){return yn().find(t=>t.id===e)?.text??""}function Sm(e,t){let o=yn().filter(n=>n.id!==e);o.push({id:e,text:t}),Vr(o)}function Kr(e=zr()){Vr(yn().filter(t=>t.id!==e)),An()}function Em(e){let t=eo("draft");if(!t||eo(e))return;let o=yn().filter(n=>n.id!=="draft");o.push({id:e,text:t}),Vr(o)}function Qr(e){return`${e.getAttribute("aria-label")??""} ${e.getAttribute("title")??""}`}function Tm(e){let t=Qr(e);return Ha.test(t)&&!/quote|引用/.test(t)?!1:/quote|引用/.test(t)&&Fr.test(t)?!0:Fr.test(t)&&!Ha.test(t)}function Fa(e){let t=e.cloneNode(!0);for(let o of t.querySelectorAll("button, [role='button']"))o.remove();return b(t.textContent??"")}function Cm(e){let t=Y(),o=e.parentElement,n=0;for(;o&&o!==t&&n<5;){if(n++,o.matches(u.composerInput)||o.querySelector(u.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=Fa(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function vn(){let e=Y();if(!e)return null;for(let t of e.querySelectorAll("button, [role='button']")){if(t.closest("[data-bloom]")||!Tm(t))continue;let o=Cm(t),n=o?Fa(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:t}}return null}function Mm(e){let t=e.closest(u.searchUnit)??e.closest(u.oldMessage);return t&&(dt(t)??t.getAttribute("data-message-author-role"))==="user"?t:null}function Jr(e){return b(e).slice(0,48)}function Lm(e,t){let o=Jr(e);if(o.length<Ga)return null;let n=null;for(let r of mt()){if(t&&(r===t||t.contains(r)||r.contains(t)))continue;let i=b(r.textContent??"");if(!i.includes(o))continue;let s=o.length/Math.max(i.length,1);(!n||s>n.score)&&(n={el:r,score:s})}return n?.el??null}function km(e,t){let o=Jr(t),n=e;for(let r of e.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&b(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${Z("hit")}`)?.classList.remove(Z("hit")),n.classList.add(Z("hit")),window.clearTimeout(Yr),Yr=window.setTimeout(()=>n.classList.remove(Z("hit")),xm)}function Na(e){let t=e.closest(u.timelineScroll)??document.scrollingElement;if(!(t instanceof HTMLElement)&&t!==document.scrollingElement)return;let o=e.getBoundingClientRect();if(o.height<1||!t)return;let n=t.getBoundingClientRect(),r=Y()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,s=o.top+o.height/2-(n.top+i)/2;Math.abs(s)<8||t.scrollTo({top:t.scrollTop+s,behavior:"smooth"})}function Zr(){if(!Ae||!hn?.isConnected)return;let e=hn.getBoundingClientRect();e.width<1||(Ae.style.top=`${Math.max(8,e.top+8)}px`,Ae.style.left=`${Math.max(8,e.right-Ae.offsetWidth-8)}px`)}function Im(e,t,o){hn=e,bn=t,Ae??=a("button",{class:`bloom-root ${Z("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),Ae.isConnected||document.body.append(Ae),km(e,o),Zr()}function Ua(){Ae?.remove(),Ae=null,hn=null,bn=null,document.querySelector(`.${Z("hit")}`)?.classList.remove(Z("hit"))}function Ya(){return document.querySelector('[data-bloom="quote-chip"]')}function An(){Ya()?.remove()}function Bm(e){let o=Y()?.getBoundingClientRect();!o||o.width<8||(e.style.width=`${Math.max(120,o.width-24)}px`,e.style.left=`${o.left+12}px`,e.style.top=`${Math.max(8,o.top-e.offsetHeight-8)}px`)}function Om(e){let t=Ya();t||(t=a("div",{class:`bloom-root ${Z("chip")}`,attrs:{"data-bloom":"quote-chip"}},a("span",{class:Z("text")}),a("button",{class:Z("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(t));let o=t.querySelector(`.${Z("text")}`),n=b(e);o&&o.textContent!==n&&(o.textContent=n),t.dataset.text=e,Bm(t)}function jr(){if(!Gr){Gr=!0;try{let e=zr(),t=vn();Je.store.persistAcrossChats&&t&&eo(e)!==t.text&&Sm(e,t.text);let o=Je.store.persistAcrossChats?eo(e):"";!o||t&&b(t.text)===b(o)?An():Om(o),Zr()}finally{Gr=!1}}}function Pm(e){let t=e.closest('[data-bloom="quote-chip"]');if(t instanceof HTMLElement&&!e.closest(`.${Z("x")}`)){let i=t.dataset.text??t.querySelector(`.${Z("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:t}:null}let o=e.closest("blockquote");if(o instanceof HTMLElement&&!e.closest("a, button")){let i=Mm(o),s=b(o.textContent??"");if(i&&s)return{text:s,skip:i,origin:o}}let n=Y();if(!n||!n.contains(e)||Ce(e)||e.closest("button, [role='button']"))return null;let r=vn();return!r||!r.row.contains(e)?null:{text:r.text,skip:null,origin:r.row}}function Rm(e){let{target:t}=e;if(!(t instanceof Element))return;if(t.closest('[data-bloom="quote-back"]')){e.preventDefault(),e.stopPropagation(),bn?.isConnected&&Na(bn);return}if(t.closest(`.${Z("x")}`)){e.preventDefault(),e.stopPropagation(),Kr();return}let o=vn();if(o&&(t===o.dismiss||o.dismiss.contains(t))){Kr();return}if(Dm(t)&&Ka(),!Je.store.jumpToPassage)return;let n=Pm(t);if(!n)return;let r=Lm(n.text,n.skip);r&&(e.preventDefault(),e.stopPropagation(),Im(r,n.origin,n.text),Na(r))}function Dm(e){let t=e.closest("button, [role='button']");return!(t instanceof HTMLElement)||t.closest("[data-bloom]")||!Y()?.contains(t)?!1:/send|submit|发送|提交/i.test(Qr(t))&&!Fr.test(Qr(t))}function Hm(e){return!(e instanceof KeyboardEvent)||e.key!=="Enter"||e.shiftKey||e.isComposing?!1:Ce(e.target)}function Ka(){if(!Je.store.persistAcrossChats)return;let e=zr(),t=eo(e);if(t){if(!vn()){let o=C(),n=Jr(t);n.length>=Ga&&!b(o).includes(n)&&ne(`> ${t}

${o}`.trim())}Kr(e)}}function Nm(e){Hm(e)&&Ka()}function Um(e){!e.prevId&&e.id&&Em(e.id),jr()}var Qa=f({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:Je,styles:Da,onSettingsChange(e){e==="jumpToPassage"&&!Je.store.jumpToPassage&&Ua(),e==="persistAcrossChats"&&!Je.store.persistAcrossChats&&(sessionStorage.removeItem(Wr),An()),jr()},start(){wt=new AbortController,document.addEventListener("pointerdown",Rm,{capture:!0,signal:wt.signal}),document.addEventListener("keydown",Nm,{capture:!0,signal:wt.signal}),addEventListener("scroll",Zr,{capture:!0,passive:!0,signal:wt.signal}),Ur=ue(Um),Nr=L(e=>G(e)&&jr())},stop(){wt?.abort(),wt=void 0,Ur?.(),Ur=void 0,Nr?.(),Nr=void 0,window.clearTimeout(Yr),Ua(),An()}});var ja=`/*
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
`;var Fm=E("bloom-cls"),Ym="bloom-cls",Km=600*1e3,$r=Ji("tab"),St=new Map,oo=new Map,xt=null,Wa=[],Qm=e=>e==="streaming"||e==="error";function jm(){let e=new Map,t=Date.now();for(let[o,n]of oo)t-n.at>Km?oo.delete(o):e.set(o,n.status);for(let[o,n]of St)e.set(o,n);return e}function Wm(e){return a("span",{class:`bloom-root ${Fm("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&R("alert"))}function to(){let e=jm(),t=new Set;for(let[o,n]of e)for(let r of Jt(o)){if(!ge(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let s=Wm(n);t.add(s),r.append(s)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function qn(e,t){e&&(t?St.set(e,t):St.delete(e),xt?.postMessage({tab:$r,id:e,status:t}),to())}function zm({data:e}){!S(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===$r||(Qm(e.status)?oo.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):oo.delete(e.id),to())}function Xr(){for(let e of St.keys())xt?.postMessage({tab:$r,id:e,status:null})}var za=f({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:ja,start(){xt=typeof BroadcastChannel=="function"?new BroadcastChannel(Ym):null,xt?.addEventListener("message",zm),addEventListener("pagehide",Xr),Wa=[q.on("rise",({conversationId:e})=>qn(e,"streaming")),q.on("fall",({conversationId:e,outcome:t})=>qn(e,t==="error"?"error":null)),q.on("context",({prevId:e,id:t,migrated:o})=>{o&&B().generating?qn(t,"streaming"):!o&&St.get(e??"")==="streaming"&&qn(e,null)}),L(e=>G(e)&&to())],h()&&to()},stop(){for(let e of Wa)e();Xr(),xt?.close(),xt=null,removeEventListener("pagehide",Xr),St.clear(),oo.clear(),to()}});var Ja=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],Sn={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Vm={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Jm="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",_r=32,En=64,ei="#FCFCFC",ti="#111111",Zm=14,Tn=51.5,Xm=12.5,$m=9.75,Va=52,_m=10.5,ef=7.75,tf={rotate:e=>e.arc(Tn,Tn,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function wn(e){let t=document.createElement("canvas");t.width=t.height=_r;let o=t.getContext("2d");return o?(o.scale(_r/En,_r/En),e(o),t.toDataURL("image/png")):""}function xn(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D(Jm);o&&(e.strokeStyle=ti,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function Cn(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function of(e,t){Cn(e,Tn,Xm,ti),Cn(e,Tn,$m,Sn[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),tf[t](e),e.stroke()}function nf(e,t){e.beginPath(),e.roundRect(0,0,En,En,Zm),e.fillStyle=t,e.fill()}var rf=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function Za(e,t){switch(e){case"original":return rf(Vm[t]);case"hole":return wn(o=>xn(o,Sn[t],!0));case"bg":return wn(o=>{nf(o,Sn[t]),xn(o,ei,!1)});case"dot":return wn(o=>{xn(o,ei,!0),Cn(o,Va,_m,ti),Cn(o,Va,ef,Sn[t])});case"badge":return wn(o=>{xn(o,ei,!0),of(o,t)})}}var ro="bloom-chat-state-favicon",io="data-bloom-rel",ri="data-bloom-media",Xa="bloom-parked-icon",sf="/favicon.ico",_a=p({style:{type:"select",description:"How the tab icon shows the chat state.",options:Ja,default:"bg"}}),Ie=null,el="",Mn=null,tl="",$a=new Map,ii,oi=[],ol=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${io}]`)];function si(){for(let e of ol())e.id!==ro&&(e.hasAttribute(io)||(tl||=e.href,e.setAttribute(io,e.rel),e.setAttribute(ri,e.getAttribute("media")??"")),e.rel!==Xa&&(e.rel=Xa),e.media!=="not all"&&(e.media="not all"))}function af(){for(let e of ol()){let t=e.getAttribute(io);if(t==null)continue;e.rel=t;let o=e.getAttribute(ri);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(io),e.removeAttribute(ri)}}function nl(){let e=document.getElementById(ro);return e||(e=document.createElement("link"),e.id=ro,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function lf(e){if(e==="wait")return tl||sf;let t=_a.store.style,o=`${t}:${e}`,n=$a.get(o);return n||$a.set(o,n=Za(t,e)),n}function ni(e){if(e)return"rotate";let t=C();return Ie&&t&&t!==el&&(Ie=null),Ie==="error"?"error":Ie==="done"?"done":t?"ready":"wait"}function no(e,t=!1){if(e===Mn&&!t)return;Mn=e;let o=nl(),n=lf(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function cf(){ii=new MutationObserver(()=>{si(),document.head.lastElementChild?.id!==ro&&nl()}),ii.observe(document.head,{childList:!0})}var rl=f({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"HostReady",settings:_a,start(){si(),no(ni(B().generating),!0),cf(),oi=[q.on("rise",()=>{Ie=null,no("rotate")}),q.on("fall",({outcome:e})=>{Ie=e==="done"||e==="error"?e:null,el=C(),no(ni(!1))}),q.on("context",({migrated:e})=>{e||(Ie=null)}),q.on("tick",({generating:e})=>{si(),no(ni(e))})]},stop(){for(let e of oi)e();oi=[],ii?.disconnect(),document.getElementById(ro)?.remove(),af(),Mn=null,Ie=null},onSettingsChange(){no(Mn??"wait",!0)}});var uf={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${u.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])']},il=p({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0}}),sl=f({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads and notices.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:il,styles:()=>it(Object.entries(uf).flatMap(([e,t])=>il.store[e]?t:[]))});var Et=`form:has(:is(${u.composerInput})), ${u.oldComposerForm}`,Ln='[class*="ComposerLayoutBody"]',ai='[class*="ComposerLayoutRoot"]',df='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',mf=`:is(${Et}) ${Ln}, :is(${Et}):not(:has(${Ln})) ${ai}, :is(${Et}):not(:has(${Ln})):not(:has(${ai})) :is(${df})`,ff='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',pf='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',gf="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))",al=p({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function hf(){let{opacity:e,blur:t}=al.store;if(e>=100)return"";let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${gf} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important;-webkit-backdrop-filter:blur(${t}px)!important`;return`:is(${ff}), :is(${Et}){${o}}:is(${pf}){display:none!important}${mf}{${n}}:is(${Et}):has(${Ln}) ${ai}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${Et}) :is(${u.composerInput}){background-color:transparent!important}`}var ll=f({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:al,styles:hf});var bf=1200,Af=8e3,yf=150,vf=20,cl=6,ui="continue where you left",qf=/message delivery timed out|please try again/i,ul=/waiting for the complete answer/i,dl=p({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:ui,placeholder:ui}}),li=[],In=0,so=!1,ao=0,Ct="",kn="",di=0,Mt=!1,lo=!1,Bn=!0,Tt="",mi=0,On=!1,wf=()=>dl.store.prompt.trim()||ui;function ml(){return(j(u.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function fl(){let e=ml();return!e||ul.test(e)||!qf.test(e)?"":e}function xf(){let e=ml();return e&&ul.test(e)?e:""}function Sf(){let e=ut()?.querySelectorAll(u.turn),t=e?.[e.length-1];return`${t?.getAttribute("data-turn-key")??""}:${t?.textContent?.length??0}`}function pl(e,t,o){if(o===In){if(B().generating||C()!==e||t>=vf){Mt=!1,B().generating||(Ct="");return}Qo(),setTimeout(()=>pl(e,t+1,o),yf)}}function Ef(e){let t=In;if(B().generating||C()&&C()!==e){Mt=!1,Ct="";return}ne(e),On=!0,Yt(()=>{t===In&&pl(e,0,t)})}function gl(e){return e===Ct||ao>=cl||B().generating||C()?!1:(Ct=e,ao+=1,Mt=!0,Ef(wf()),!0)}function Tf(){if(so||Mt||lo)return;let e=Date.now(),t=fl();if(t){if(Tt="",t!==kn){kn=t,di=e;return}if(e-di<bf)return;gl(`${h()??""}:${t}`);return}if(kn="",!xf()){Bn=!0,Tt="";return}if(!Bn||!B().generating||C())return;let n=`${h()??""}:${Sf()}`;if(n!==Tt){Tt=n,mi=e;return}if(e-mi<Af||ao>=cl)return;let r=ct();r&&(lo=!0,r.click())}function ci(){In+=1,so=!1,ao=0,Ct="",kn="",di=0,Mt=!1,lo=!1,Bn=!0,Tt="",mi=0,On=!1}var hl=f({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:dl,start(){ci(),li=[q.on("rise",()=>{so=!1,Ct="",Mt=!1,On&&(On=!1,Bn=!1,Tt="")}),q.on("fall",({outcome:e})=>{if(lo){lo=!1,e==="left"?so=!0:gl(`${h()??""}:stall`);return}(e==="stopped"||e==="left")&&(so=!0),e==="done"&&!fl()&&(ao=0)}),q.on("context",({migrated:e})=>{e||ci()}),q.on("tick",Tf)]},stop(){for(let e of li)e();li=[],ci()}});var ye=E("bloom-csi-"),Cf=256,Mf=160,Pn=1,bl=4,Lf=.1,kf=.0015,If=250;function Bf(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function Of(e){return new Promise((t,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function Pf(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:Se(t.x,n,1-n),y:Se(t.y,r,1-r)}}function Al(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function Rf(e,t){let o=a("canvas");return o.width=o.height=Cf,Al(o,e,t),o.toDataURL("image/png")}function yl(e){let t=null,o={x:D.store.cropX,y:D.store.cropY,zoom:D.store.cropZoom},n,r=a("canvas",{class:ye("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=Mf*devicePixelRatio;let i=a("div",{class:`bloom-muted ${ye("status")}`}),s=a("div",{class:ye("zoom")}),c=a("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(A,U=!0){t&&(o=Pf(t,A),Al(r,t,o),U&&(clearTimeout(n),n=setTimeout(()=>{t&&(D.store.cropX=o.x,D.store.cropY=o.y,D.store.cropZoom=o.zoom,D.store.avatarUrl=Rf(t,o))},If)))}function d(){s.replaceChildren(rn(o.zoom,Pn,bl,Lf,"\xD7",A=>l({...o,zoom:A})))}async function m(A,U){i.textContent="";try{t=await Of(A),U&&(D.store.avatarSource=A,o={x:.5,y:.5,zoom:Pn}),e.classList.add(ye("has-image")),d(),l(o,U)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let v=A=>{A?.type.startsWith("image/")&&Bf(A).then(U=>m(U,!0))};c.addEventListener("change",()=>v(c.files?.[0])),r.addEventListener("wheel",A=>{t&&(A.preventDefault(),l({...o,zoom:Se(o.zoom*(1-A.deltaY*kf),Pn,bl)}),d())},{passive:!1}),r.addEventListener("pointerdown",A=>{if(!t)return;r.setPointerCapture(A.pointerId);let U={...o},De=r.getBoundingClientRect(),Mo=Lo=>{if(!t)return;let ee=Math.max(De.width/t.naturalWidth,De.height/t.naturalHeight)*o.zoom;l({...o,x:U.x-(Lo.clientX-A.clientX)/(t.naturalWidth*ee),y:U.y-(Lo.clientY-A.clientY)/(t.naturalHeight*ee)})};r.addEventListener("pointermove",Mo),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",Mo),{once:!0})});let F=a("div",{class:ye("cropper"),attrs:{tabindex:"0"},on:{paste:A=>v([...A.clipboardData?.files??[]].find(U=>U.type.startsWith("image/"))),dragover:A=>A.preventDefault(),drop:A=>{A.preventDefault(),v(A.dataTransfer?.files[0])}}},a("div",{class:ye("stage")},r),a("div",{class:ye("controls")},Vt("",A=>A.trim()&&void m(A.trim(),!0),"https://\u2026 or data:image/\u2026","url"),a("div",{class:ye("buttons")},K("Choose file",()=>c.click()),K("Reset crop",()=>{l({x:.5,y:.5,zoom:Pn}),d()}),K("Clear",()=>{t=null,e.classList.remove(ye("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),s.replaceChildren(),D.store.avatarUrl="",D.store.avatarSource=""},"danger")),s,i,c));return e.append(F),D.store.avatarSource&&m(D.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var vl=`/*
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
`;var co="data-bloom-csi-avatar",fi="data-bloom-csi-sized",Sl="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",Hf=32,D=p({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>yl(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),ql=[];function El(e){e.removeAttribute(co),e.removeAttribute(fi)}function wl(e){return(D.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function xl(e=[]){if(!G(e))return;let t=D.store.displayName.trim()||null,o=!!D.store.avatarUrl,n=new Set(t?wl("name"):[]);for(let i of document.querySelectorAll(Sl))n.has(i)||Fe(i,null);for(let i of n)Fe(i,t);let r=new Set(o?wl("avatar"):[]);for(let i of document.querySelectorAll(`[${co}]`))r.has(i)||El(i);for(let i of r)i.hasAttribute(co)||i.setAttribute(co,""),i.toggleAttribute(fi,!i.closest('[role="menu"]'))}function Nf(){let e=D.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${D.store.avatarSize}px}:is(${u.rail}, ${u.oldRail}) [${fi}]{--bloom-csi-size:${Hf}px}`:""}var Tl=f({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:D,styles:()=>`${Nf()}
${vl}`,start(){ql=[de(),L(xl)]},stop(){for(let e of ql)e();for(let e of document.querySelectorAll(`[${co}]`))El(e);for(let e of document.querySelectorAll(Sl))Fe(e,null)},onSettingsChange(){xl()}});var Lt=E("bloom-greeting-"),Cl=30,Ml=100;function Ll(e){let t=-1,o=a("textarea",{class:`bloom-input ${Lt("input")}`,attrs:{maxlength:String(Ml),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=K("Add",i),r=a("div",{class:Lt("list")});function i(){let l=o.value.trim().slice(0,Ml);if(!l)return;let d=[...M.store.greetings];t>=0?d[t]=l:d.length<Cl&&d.push(l),M.store.greetings=d,t=-1,o.value="",s()}function s(){let{greetings:l}=M.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&l.length>=Cl,r.replaceChildren(...l.length?l.map((d,m)=>a("div",{class:Lt("row",m===t?"row-editing":"row-idle")},a("div",{class:Lt("text"),text:d}),J("edit","Edit",()=>{t=m,o.value=d,o.focus(),s()}),J("trash","Delete",()=>{M.store.greetings=l.filter((v,F)=>F!==m),t===m&&(t=-1),s()}))):[a("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),e.append(a("div",{class:Lt("editor")},r,a("div",{class:Lt("form")},o,n))),s();let c=at((l,d)=>l==="GreetingCustomizer"&&d==="greetings"&&s());return()=>{c(),e.replaceChildren()}}var kl=`/*
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

[data-bloom-placeholder] {
    position: relative;
}

[data-bloom-placeholder]::before {
    position: absolute;
    top: 0;
    left: 0;
    max-width: 100%;
    overflow: hidden;
    color: var(--bloom-fg-3);
    content: attr(data-bloom-placeholder);
    pointer-events: none;
    text-overflow: ellipsis;
    white-space: nowrap;
}
`;var Hn="data-bloom-greeting",Gf=1e3,Ff=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],M=p({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>Ll(e)},greetings:{type:"custom",default:Ff},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),Rn,Il=[],pi,mo=()=>Xo()&&!ce(),Yf=e=>e.replaceAll(/\s*\n\s*/g," ").trim(),Ol=()=>M.store.greetings.filter(e=>typeof e=="string"&&e.trim());function fo(){let e=Ol();if(e.length)if(M.store.order==="random"&&e.length>1){let t=M.store.lastRandom;for(;t===M.store.lastRandom;)t=Math.floor(Math.random()*e.length);M.store.lastRandom=t,M.store.index=t}else M.store.index=(M.store.index+1)%e.length}function Kf(){return mo()?j(u.homeHeading):null}function Dn(){for(let e of document.querySelectorAll(`[${Hn}]`))e.removeAttribute(Hn),Fe(e,null)}function Nn(){for(let e of document.querySelectorAll("[data-bloom-placeholder]"))e.removeAttribute("data-bloom-placeholder")}function Bl(e){let t=Te(),o=Yf(e);if(!t||!o||C(t)){Nn();return}t.getAttribute("data-bloom-placeholder")!==o&&t.setAttribute("data-bloom-placeholder",o)}function uo(){let e=Ol(),t=Ps(),o=mo();if(!e.length||!t&&!o){Dn(),Nn();return}if(t){Dn(),Bl(e[0]??"");return}let n=Kf();n?((M.store.index<0||M.store.index>=e.length)&&fo(),n.setAttribute(Hn,""),Fe(n,e[Math.max(0,M.store.index)%e.length]??"")):Dn(),M.store.heroOnlyOutsideProject?Nn():Bl(e[Math.max(0,M.store.index)%e.length]??"")}function gi(){clearInterval(Rn),Rn=void 0,M.store.mode==="interval"&&mo()&&(Rn=setInterval(()=>{fo(),uo()},M.store.intervalSec*Gf))}function Qf(e){M.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${Hn}]`)||getSelection()?.toString()||(fo(),uo())}function jf(){mo()&&M.store.mode==="refresh"&&fo(),gi(),uo()}var Pl=f({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:M,styles:kl,start(){pi=new AbortController,document.addEventListener("click",Qf,{signal:pi.signal}),mo()&&M.store.mode==="refresh"&&fo(),gi(),Il=[L(e=>G(e)&&uo()),ue(jf)]},stop(){pi?.abort();for(let e of Il)e();clearInterval(Rn),Dn(),Nn()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&gi(),uo()}});var po=E("bloom-history-"),hi=10,Wf=3e3;function Rl(e){let t="",o=0,n=new Set,r=a("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),i=a("div",{class:po("list")}),s=a("div",{class:po("pager")}),c,l=K("Clear all",()=>{if(!c){l.textContent="Click again to clear",c=setTimeout(()=>{c=void 0,l.textContent="Clear all"},Wf);return}clearTimeout(c),c=void 0,l.textContent="Clear all",go([])},"danger");function d(){let v=[...Ze.store.entries].toReversed(),F=t.trim().toLowerCase(),A=F?v.filter(ee=>ee.toLowerCase().includes(F)):v,U=Math.max(1,Math.ceil(A.length/hi));o=Math.min(o,U-1);let De=A.slice(o*hi,(o+1)*hi).map(ee=>a("div",{class:po("row")},a("button",{class:po("text",n.has(ee)?"text-open":"text-closed"),text:ee,title:n.has(ee)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{n.delete(ee)||n.add(ee),d()}}}),J("copy","Copy",()=>void Zi(ee)),J("trash","Delete",()=>go(Ze.store.entries.filter(eu=>eu!==ee)))));i.replaceChildren(...De.length?De:[a("div",{class:"bloom-muted",text:F?"No matching prompts.":"No saved prompts yet."})]),s.replaceChildren(a("span",{class:"bloom-muted",text:`${A.length} ${F?"matching":"saved"} \xB7 page ${o+1} of ${U}`}),K("Previous",()=>{o--,d()}),K("Next",()=>{o++,d()}),l);let[Mo,Lo]=s.querySelectorAll("button");Mo.disabled=o===0,Lo.disabled=o>=U-1,l.disabled=!v.length}r.addEventListener("input",()=>{t=r.value,o=0,d()}),e.append(a("div",{class:po("manager")},r,i,s)),d();let m=at((v,F)=>v==="InputHistory"&&F==="entries"&&d());return()=>{m(),clearTimeout(c),e.replaceChildren()}}var Dl=`/*
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
`;var Vf=E("bloom-history-"),Jf=2e3,Ze=p({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>Rl(e)},entries:{type:"custom",default:[]}}),_=null,bi={text:"",at:0},Xe=null,Ai,Un=()=>Ze.store.entries.filter(e=>typeof e=="string");function go(e){Ze.store.entries=e.slice(-Ze.store.maxEntries)}function yi(e){let t=e.trim();if(!t)return;let o=Date.now();t===bi.text&&o-bi.at<Jf||(bi={text:t,at:o},go([...Un().filter(n=>n!==t),t]))}function Zf(e,t){let o=Te();if(!o)return;Xe??=a("div",{class:`bloom-root ${Vf("hud")}`,attrs:{"data-bloom":"history-hud","aria-live":"polite"}}),Xe.textContent=`${e+1} / ${t}`;let n=(o.closest("form")??o).getBoundingClientRect();Xe.style.left=`${n.left+n.width/2}px`,Xe.style.top=`${n.top}px`,Xe.isConnected||document.body.append(Xe)}function ho(){_=null,Xe?.remove()}function Xf(e){let t=Un();if(!_)return;let o=t[e];_.index=e,_.shown=o,ne(o),Zf(t.length-1-e,t.length)}function $f(e){let t=Un();if(!t.length)return!1;if(!_){if(e===1)return!1;_={index:t.length,draft:C(),shown:""}}let o=_.index+e;return o<0?!0:o>=t.length?(ne(_.draft),ho(),!0):(Xf(o),!0)}function _f(e){if(e.isComposing||!Ce(e.target))return;let t=e.target;if(e.key==="Enter"&&!e.shiftKey){yi(C(t)),ho();return}if(e.key==="Escape"&&_){ne(_.draft),ho(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey)return;let o=qs(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!_||$f(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function ep(e){_&&Ce(e.target)&&C(e.target)!==_.shown.trim()&&ho()}function tp(e){e.target instanceof Element&&e.target.closest(u.sendButton)&&yi(C())}var Hl=f({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:Ze,styles:Dl,start(){Ai=new AbortController;let{signal:e}=Ai;document.addEventListener("keydown",_f,{capture:!0,signal:e}),document.addEventListener("input",ep,{capture:!0,signal:e}),document.addEventListener("click",tp,{capture:!0,signal:e}),document.addEventListener("submit",()=>yi(C()),{capture:!0,signal:e})},stop(){Ai?.abort(),ho()},onSettingsChange(e){e==="maxEntries"&&go(Un())}});var Nl=`/*
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

/* Assistant time is the first line of the reply, above "Worked for". */
.bloom-timestamp-assistant {
    margin-bottom: 0.15rem;
}
`;var np=1500,rp=5e3,ip=2e3,Ql=[{label:"UTC",value:"UTC"},{label:"\u7F8E\u56FD\u4E1C\u90E8",value:"America/New_York"},{label:"\u7F8E\u56FD\u4E2D\u90E8",value:"America/Chicago"},{label:"\u7F8E\u56FD\u5C71\u5730",value:"America/Denver"},{label:"\u7F8E\u56FD\u897F\u90E8",value:"America/Los_Angeles"},{label:"\u65E5\u672C",value:"Asia/Tokyo"},{label:"\u53F0\u6E7E",value:"Asia/Taipei"}],kt=p({sourceTimeZone:{type:"select",description:"Zone the stored clock was written in. Leave UTC for ChatGPT create_time. Pick the same zone as the Shit GPT plugin only when that clock is a wall time in that zone; it is then shown in the system timezone.",options:Ql,default:"UTC"},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),Fn=new Map,vi=new Set,jl=0,Yn,Ul=[];function Wl(e,t){Fn.get(e)!==t&&(Fn.set(e,t),clearTimeout(Yn),Yn=setTimeout(zl,ip))}function zl(){let e={...kt.store.stamps,...Object.fromEntries(Fn)};kt.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,np))}function sp(e){let t=ie(h())?.times;for(let o=e.length-1;o>=0;o--){let n=Fn.get(e[o])??t?.get(e[o])??kt.store.stamps[e[o]];if(n)return n}return null}var ap=()=>B().generating||Date.now()-jl<rp;function Vl(){return Intl.DateTimeFormat().resolvedOptions().timeZone}function Jl(){let e=kt.store.sourceTimeZone;if(!e||e==="UTC")return"UTC";try{return Intl.DateTimeFormat(void 0,{timeZone:e}),e}catch{return"UTC"}}function Zl(e,t){let o={};for(let n of new Intl.DateTimeFormat("en-US",{timeZone:t,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(e)))o[n.type]=n.value;return{y:+o.year,m:+o.month,d:+o.day,h:+o.hour%24,mi:+o.minute,s:+o.second}}function Xl(e){return Date.UTC(e.y,e.m-1,e.d,e.h,e.mi,e.s)}function Gl(e,t){let o=e;for(let n=0;n<4;n++){let r=e-Xl(Zl(o,t));if(r===0)return o;o+=r}return o}function lp(e,t){if(t==="UTC")return e;let o=(e%1e3+1e3)%1e3,n=e-o,r=new Date(n),i=Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),r.getUTCHours(),r.getUTCMinutes(),r.getUTCSeconds()),s=Gl(i,t),c=3600*1e3,l=Number.POSITIVE_INFINITY;for(let d of[-c,0,c]){let m=s+d;Xl(Zl(m,t))===i&&m<l&&(l=m)}return l!==Number.POSITIVE_INFINITY?l+o:Gl(i+c,t)+o}function cp(e,t){let o=Jl();return t||o==="UTC"?e:lp(e,o)}function Fl(e,t){return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(e)}function up(e){let t=Vl(),o=Date.now(),n={hour:"2-digit",minute:"2-digit",timeZone:t};if(Fl(e,t)===Fl(o,t))return new Intl.DateTimeFormat(void 0,n).format(e);let r=s=>new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric"}).format(s),i=r(e)===r(o)?{}:{year:"numeric"};return new Intl.DateTimeFormat(void 0,{...i,month:"short",day:"numeric",...n}).format(e)}function dp(e,t){let o=new Date(t).toLocaleString(void 0,{timeZone:Vl()}),n=Jl();if(n==="UTC"||t===e)return o;let r=new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"UTC"}).format(e);return`${Ql.find(s=>s.value===n)?.label??n} ${r} \u2192 ${o}`}function $l(e){let t=dt(e)??e.getAttribute("data-message-author-role")??e.closest(u.turn)?.getAttribute("data-turn")??e.querySelector(u.authorRole)?.getAttribute("data-message-author-role");if(br(t))return t;let o=Qt(e).at(-1);return ie(h())?.chain.find(n=>n.id===o)?.role??null}var Yl='[class*="group/activity-header"]';function mp(e){let t=e.parentElement;if(!t)return null;let o=e.closest(u.turn);return o&&t!==o&&!o.contains(t)?null:t}function fp(e){let t=e;for(let o=0;o<8&&t;o++){let n=mp(t);if(!n)return null;let r=[...n.children],i=r.indexOf(t);for(let s=i-1;s>=0;s--){let c=r[s],l=c.matches(Yl)?c:c.querySelector(Yl);if(l)return l;if(c.matches(u.searchUnit)||c.querySelector(u.searchUnit))return null}if(n===t.closest(u.turn))return null;t=n}return null}function pp(e){let t=e.parentElement;for(let o=0;o<4&&t;o++){if(t.classList.contains("flex-col"))return t;t=t.parentElement}return e.parentElement??e}function _l(e,t){if(t==="assistant"){let o=fp(e);if(o)return pp(o)}return e}function gp(e,t){let o=mt();for(let n=o.length-1;n>=0;n--){let r=o[n];if(!(r!==e&&($l(r)!=="assistant"||_l(r,"assistant")!==t)))return r===e}return!0}function Kl(e){return e.querySelector(':scope > time[data-bloom="timestamp"]')}function hp(e){let t=Qt(e);if(!t.length||!ge(e)||e.querySelector("time:not([data-bloom])"))return;let o=$l(e),n=_l(e,o);if(n!==e&&!gp(e,n)){Kl(e)?.remove();return}let r=sp(t),i=!1;if(!r&&ap()){r=Date.now();let m=t.at(-1);vi.add(m),Wl(m,r),i=!0}else r&&vi.has(t.at(-1))&&(i=!0);let s=n.querySelector('time[data-bloom="timestamp"]')??Kl(e);if(!r||kt.store.hideOwnMessages&&o==="user"){s?.remove();return}let c=cp(r,i),l=up(c);if(s?.textContent===l&&s.parentElement===n&&s===n.firstElementChild)return;let d=a("time",{class:`bloom-timestamp bloom-timestamp-${o??"assistant"}`,text:l,title:dp(r,c),attrs:{"data-bloom":"timestamp",datetime:new Date(c).toISOString()}});s&&s.replaceWith(d),(d.parentElement!==n||d!==n.firstElementChild)&&n.prepend(d)}var Gn=lt(()=>{for(let e of mt())hp(e)}),ec=f({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:kt,styles:Nl,start(){Ul=[L(e=>G(e)&&Gn()),W.on("conversation",Gn),W.on("message-time",({messageId:e,time:t})=>{vi.delete(e),Wl(e,t),Gn()}),q.on("fall",()=>{jl=Date.now()})]},stop(){for(let e of Ul)e();Yn&&(clearTimeout(Yn),zl());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();Gn()}}});var bp=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])'],Ap=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],tc=p({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),oc=f({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:tc,styles:()=>it([...bp,...tc.store.hideDictationSettings?Ap:[]])});var $e="data-bloom-share",yp=/^\/g\/g-p-/,vp=/^(?:share|分享)$/i,qp=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],wp=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${$e}="project"]`],qi=p({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),Kn,wi=!1;function xp(e){if(!G(e))return;let t=yp.test(location.pathname)&&!h();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${$e}]`))!t||!vp.test(b(o.textContent??""))?o.removeAttribute($e):o.hasAttribute($e)||o.setAttribute($e,"project")}var nc=f({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:qi,styles:()=>it([...qi.store.hideShareChat?qp:[],...qi.store.hideShareProject?wp:[]]),start(){wi=!0,Kt().then(()=>{wi&&!Kn&&(Kn=L(xp))})},stop(){wi=!1,Kn?.(),Kn=void 0;for(let e of document.querySelectorAll(`[${$e}]`))e.removeAttribute($e)}});var rc='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',Sp='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',Ep="[data-bloom-profile-plan]",ic="visibility:hidden!important;user-select:none!important",ac=p({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function Tp(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=ac.store,r=[];return e&&r.push(n?`:is(${rc}){display:none!important}`:`:is(${rc}){${ic}}`),t&&r.push(`:is(${Sp}){${ic}}`),e&&o&&r.push(`${Ep}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var sc,lc=f({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:ac,styles:Tp,start(){sc=de()},stop(){sc?.()}});var Cp="model-switcher-dropdown-button",cc=e=>e.startsWith("model-switcher-")&&e!==Cp?e.slice(15):"",bo=(e,t)=>e.id===t.id||!!e.label&&e.label===t.label;function uc(){let e=Y();return(e&&j(u.modelTrigger,e))??j(u.modelTrigger)}function me(){let e=uc();if(!e)return null;let t=b(e.innerText),o=cc(e.getAttribute("data-testid")??"")||t;return o?{id:o,label:t||o}:null}function Mp(e){return[...document.querySelectorAll(u.modelItem)].find(t=>{let o=cc(t.getAttribute("data-testid")??""),n=b(t.textContent??"");return o===e.id||n===e.label||n===e.id})??null}function Qn(e){let t=me();if(t&&bo(t,e))return!0;let o=Mp(e);if(o){o.click();let r=me();return!!r&&bo(r,e)}let n=uc();return n?.getAttribute("aria-expanded")!=="true"&&n?.click(),!1}var dc=`/*
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

.bloom-queue-model {
    flex: none;
    max-width: 8rem;
    padding: 0.125rem 0.5rem;
    overflow: hidden;
    border-radius: 999px;
    background: var(--bloom-hover);
    color: var(--bloom-fg-2);
    font-size: 0.75rem;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.bloom-queue-actions {
    display: flex;
    flex: none;
}
`;var H=E("bloom-queue-"),kp=6,Ip=8,X=null,Ao="",It=!1,Bt=!1;function xi(e,t,o){let n=J(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute(he),n.addEventListener("mouseenter",()=>mc(t)),n.addEventListener("mouseleave",()=>mc("")),n}function mc(e){let t=X?.querySelector(`.${H("tip")}`);t&&(t.textContent=e)}function Bp(e,t,o,n){Bt=!0;let r=a("textarea",{class:`bloom-input ${H("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=new AbortController,s=c=>{i.abort(),Bt=!1,Ao="",c?n.edit(t,r.value):r.replaceWith(a("div",{class:H("text"),text:o}))};addEventListener("keydown",c=>{if(!(c.target!==r||c.isComposing)){if(c.key==="Enter"&&!c.shiftKey)s(!0);else if(c.key==="Escape")s(!1);else return;c.preventDefault(),c.stopImmediatePropagation()}},{capture:!0,signal:i.signal}),r.addEventListener("keydown",c=>c.stopPropagation(),{signal:i.signal}),r.addEventListener("blur",()=>s(!0),{signal:i.signal}),e.querySelector(`.${H("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function Op(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,s=l=>{!i&&Math.abs(l.clientY-n.clientY)<kp||(i||(i=Bt=!0,e.classList.add(H("dragging"))),e.style.transform=`translateY(${l.clientY-n.clientY}px)`)},c=l=>{if(removeEventListener("pointermove",s),!i)return;Bt=!1,Ao="";let m=[...r.children].filter(v=>v!==e).filter(v=>v.getBoundingClientRect().top+v.getBoundingClientRect().height/2<l.clientY).length;o.move(t,m)};addEventListener("pointermove",s),addEventListener("pointerup",c,{once:!0})})}function Pp(e,t,o,n){let r=a("li",{class:H("row")},a("div",{class:H("text"),text:e.text}),n&&e.label?a("span",{class:H("model"),title:e.label,text:e.label}):null,a("div",{class:H("actions")},xi("trash","Remove from queue",()=>o.remove(t)),xi("edit","Edit",()=>Bp(r,t,e.text,o)),xi("send","Send now",()=>o.sendNow(t))));return Op(r,t,o),r}function Rp(e){if(!X)return;let t=e.getBoundingClientRect();X.style.left=`${t.left}px`,X.style.width=`${t.width}px`,X.style.bottom=`${innerHeight-t.top+Ip}px`}function Si(){X?.remove(),X=null,Ao="",Bt=!1}function Be(e,t,o=!0){let n=Y();if(!e.length||!Ft(n)){Si();return}X||(X=a("div",{class:`bloom-root ${H("tray")}`,attrs:{"data-bloom":"queue"}},a("div",{class:H("header")},a("button",{class:H("toggle"),attrs:{type:"button","aria-expanded":String(!It)},on:{click:s=>{It=!It,X?.classList.toggle(H("collapsed"),It),s.currentTarget.setAttribute("aria-expanded",String(!It))}}},a("span",{class:H("count")}),R("chevron")),a("span",{class:H("tip")})),a("ol",{class:H("list")})),X.classList.toggle(H("collapsed"),It),document.body.append(X)),Rp(n);let r=JSON.stringify([o,...e.map(s=>[s.text,o?s.label:""])]);if(Bt||r===Ao)return;Ao=r;let i=X.querySelector(`.${H("count")}`);i&&(i.textContent=ko(e.length,"Queued message")),X.querySelector(`.${H("list")}`)?.replaceChildren(...e.map((s,c)=>Pp(s,c,t,o)))}var Vn=new x("PromptQueue"),Dp=8,qo=150,Wn=20,se="BloomPromptQueue",Ti="BloomPromptQueueClaim",fc="BloomPromptQueueTab",Hp=4e3,Q=p({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1},showQueueMode:{type:"boolean",description:"Show the model that was selected when each message was queued.",default:!0},stickyOnNavigate:{type:"boolean",description:"Keep the selected model when switching chats.",default:!0},persistAcrossRefresh:{type:"boolean",description:"Restore unsent queued messages in this browser after a refresh. Other tabs show the same queue; only one of them sends it.",default:!0}}),ae=new Map,vo=!1,et=null,yo,pc=[],ve=null,qe=!1,Ei,zn="draft",wo=()=>h()??zn,V=()=>ae.get(wo())??[],Ci=e=>({id:e.model||e.label,label:e.label||e.model});function Np(e){return typeof e=="string"?e.trim()?{text:e,model:"",label:""}:null:!S(e)||typeof e.text!="string"||!e.text.trim()?null:{text:e.text,model:typeof e.model=="string"?e.model:"",label:typeof e.label=="string"?e.label:""}}function Mi(){let e=sessionStorage.getItem(fc);if(e)return e;let t=globalThis.crypto?.randomUUID?.()??`${Date.now()}-${Math.random()}`;return sessionStorage.setItem(fc,t),t}function hc(){let e=Ee(localStorage.getItem(Ti)??"");return!S(e)||typeof e.tab!="string"||typeof e.at!="number"||typeof e.key!="string"?null:{tab:e.tab,at:e.at,key:e.key}}function bc(){let e={tab:Mi(),at:Date.now(),key:wo()};try{localStorage.setItem(Ti,JSON.stringify(e))}catch(t){Vn.warn("Could not claim the queue",t)}}function Up(){let e=hc();if(e?.tab===Mi())try{localStorage.setItem(Ti,JSON.stringify({...e,at:Date.now()}))}catch(t){Vn.warn("Could not refresh the queue claim",t)}}function Gp(){let e=hc();return!e||e.tab===Mi()||e.key!==wo()?!0:Date.now()-e.at<=Hp?!1:(bc(),!0)}function Fp(){return Object.fromEntries([...ae].filter(([e])=>e!==zn))}function jn(e){let t=typeof e=="string"?Ee(e):e;if(!S(t))return!1;let o=!1;for(let[n,r]of Object.entries(t)){if(!Array.isArray(r))continue;let i=r.map(Np).filter(s=>s!=null);i.length&&(ae.set(n,i),o=!0)}return o}function Yp(){if(!Q.store.persistAcrossRefresh){sessionStorage.removeItem(se),nr(se);return}if(!jn(sessionStorage.getItem(se))){if(jn(localStorage.getItem(se))){xo();return}Po(se).then(e=>{ae.size||e.some(jn)&&(xo(),Be(V(),_e,Q.store.showQueueMode))})}}function xo(){try{if(!Q.store.persistAcrossRefresh){sessionStorage.removeItem(se),nr(se);return}let e=Fp();sessionStorage.setItem(se,JSON.stringify(e)),Ro(se,e)}catch(e){Vn.warn("Could not save the queue",e)}}function Kp(e){if(!(e.key!==se||!Q.store.persistAcrossRefresh||e.newValue==null)){ae.clear(),jn(e.newValue);try{sessionStorage.setItem(se,e.newValue)}catch(t){Vn.warn("Could not mirror the queue",t)}Be(V(),_e,Q.store.showQueueMode)}}function tt(e){e.length?ae.set(wo(),e):ae.delete(wo()),bc(),xo(),Be(V(),_e,Q.store.showQueueMode)}function Qp(e){if(!e.model&&!e.label)return!0;let t=me();return t?bo(t,Ci(e)):!0}function Ac(e,t=0){t>=Wn||B().generating||C()!==e||(Qo(),setTimeout(()=>Ac(e,t+1),qo))}function jp(e,t){let o=Q.store.stickyOnNavigate&&ve?ve:e;if(!o||!t.model&&!t.label||bo(o,Ci(t))){qe=!1;return}qe=!0,setTimeout(()=>{Qn(o),qe=!1},qo)}function So(e,t=0){if(B().generating||C()){t<Wn&&setTimeout(()=>So(e,t+1),qo);return}if(!Qp(e)&&t<Wn){qe=!0,Qn(Ci(e)),setTimeout(()=>So(e,t+1),qo);return}let o=me();ne(e.text),Yt(()=>Ac(e.text)),jp(o,e)}function gc(){if(et!=null){let o=et;et=null,So(o);return}if(!vo||B().generating||C())return;if(!Gp()){vo=!1;return}let[e,...t]=V();e!=null&&(vo=!1,tt(t),So(e))}function yc(e){let t=V(),o=t[e];if(o!=null){if(tt(t.filter((n,r)=>r!==e)),!B().generating){So(o);return}et=o,ct()?.click()}}var _e={remove:e=>tt(V().filter((t,o)=>o!==e)),edit:(e,t)=>tt(t.trim()?V().map((o,n)=>n===e?{...o,text:t}:o):V().filter((o,n)=>n!==e)),sendNow:yc,move(e,t){let o=[...V()],[n]=o.splice(e,1);n&&(o.splice(t,0,n),tt(o))}};function Wp(e){let t=me(),o={text:e,model:t?.id??"",label:t?.label??""},n=V();return Q.store.replacePending&&n.length?(tt([...n.slice(0,-1),o]),!0):n.length>=Dp?!1:(tt([...n,o]),!0)}function zp(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!Ce(e.target)||!B().generating)return;let t=C(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;let o=me();ne(""),et={text:t,model:o?.id??"",label:o?.label??""},ct()?.click();return}if(!t){V().length&&yc(0);return}Wp(t)&&ne("")}function Vp(){if(qe||!Q.store.stickyOnNavigate)return;let e=me();e&&(ve=e)}function Jp(){if(!Q.store.stickyOnNavigate||!ve)return;qe=!0;let e=0,t=()=>{if(!ve||Qn(ve)||e>=Wn){qe=!1;return}e++,Ei=setTimeout(t,qo)};clearTimeout(Ei),t()}function Zp(e){let{target:t}=e;!(t instanceof Element)||qe||t.closest(`${u.modelTrigger}, ${u.modelItem}`)&&setTimeout(Vp,0)}var vc=f({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:Q,styles:dc,start(){yo=new AbortController,Yp(),ve=me(),document.addEventListener("keydown",zp,{capture:!0,signal:yo.signal}),document.addEventListener("pointerup",Zp,{signal:yo.signal}),pc=[q.on("fall",({outcome:e})=>{vo=e==="done",e==="left"&&(et=null),gc()}),q.on("context",({prevId:e,id:t,migrated:o})=>{let n=ae.get(zn);ae.delete(zn),o&&!e&&t&&n&&ae.set(t,n),o||(vo=!1,Jp()),xo(),Be(V(),_e,Q.store.showQueueMode)}),q.on("tick",()=>{Up(),gc(),Be(V(),_e,Q.store.showQueueMode)})],addEventListener("storage",Kp,{signal:yo.signal}),Be(V(),_e,Q.store.showQueueMode)},stop(){yo?.abort(),clearTimeout(Ei);for(let e of pc)e();Si(),ae.clear(),et=null,ve=null,qe=!1},onSettingsChange(e){e==="persistAcrossRefresh"&&xo(),e==="stickyOnNavigate"&&Q.store.stickyOnNavigate&&(ve=me()),Be(V(),_e,Q.store.showQueueMode)}});var Xp=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function $p(){let e=b(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!Xp.has(e.toLowerCase())?e:null}function Eo(e){return e?ie(e)?.title??sa(e)??(e===h()?$p():null):null}var qc=`/*
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
`;var we=E("bloom-recent-"),xe="home",eg=50,wc=140,tg=new Set(["Backquote"]),og=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),w=p({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),Oe=null,fe=[],pe=0,Li,xc=[],Xn=()=>ce()?null:h()??(Xo()?xe:null);function Sc(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function Tc(e){let t=Eo(e);t&&w.store.titles[e]!==t&&(w.store.titles={...w.store.titles,[e]:t});let o=aa(location.href);o&&e===h()&&w.store.projects[e]!==o&&(w.store.projects={...w.store.projects,[e]:o})}function Ec(e){if(!e)return;let t=[e,...w.store.visits.filter(n=>n!==e)].slice(0,eg),o=new Set(t);w.store.visits=t,Object.keys(w.store.previews).some(n=>!o.has(n))&&(w.store.previews=Sc(w.store.previews,o)),Object.keys(w.store.titles).some(n=>!o.has(n))&&(w.store.titles=Sc(w.store.titles,o)),e!==xe&&Tc(e)}function Jn(e){if(!e||!w.store.visits.includes(e))return;let t={},o=ie(e)?.chain??[];for(let r of o)t[r.role]=le(_o(r),wc);if(e===h())for(let r of Me()){let i=ft(r);i&&(t[r.role]=le(i,wc))}let n=w.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(w.store.previews={...w.store.previews,[e]:t})}function ng(){let e=Number(w.store.maxRecent);return w.store.visits.filter(t=>t!==xe||w.store.includeHome).slice(0,e)}function ki(e){if(To(),e===Xn())return;let t=e===xe?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"]'):Jt(e)[0];t?t.click():location.assign(e===xe?"/":`/c/${e}`)}function rg(e,t){let o=e===xe?"New chat":w.store.titles[e]??Eo(e)??"Untitled chat",n=e===xe?null:w.store.projects[e],r=e===xe?null:w.store.previews[e];return a("button",{class:we("item"),attrs:{type:"button",role:"option","aria-selected":String(t===pe)},on:{click:()=>ki(e),mousemove:()=>t!==pe&&Zn(t)}},a("div",{class:we("head")},a("span",{class:`${we("title")} bloom-truncate`,text:o}),n&&a("span",{class:we("project"),text:n})),r?.user&&a("div",{class:`${we("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&a("div",{class:`${we("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function Zn(e){pe=(e+fe.length)%fe.length,Oe?.querySelectorAll(`.${we("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===pe)))}function ig(){Jn(h());let e=Xn();fe=ng(),e&&(fe=[e,...fe.filter(t=>t!==e)].slice(0,Number(w.store.maxRecent))),fe.length&&(pe=fe.length>1?1:0,Oe=a("div",{class:`bloom-root ${we("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:t=>t.target===t.currentTarget&&To()}},a("div",{class:we("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...fe.map(rg))),document.body.append(Oe))}function To(){Oe?.remove(),Oe=null}var sg=e=>tg.has(e.code)||og.has(e.key);function ag(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&sg(e)){e.preventDefault(),e.stopPropagation(),Oe?Zn(pe+(e.shiftKey?-1:1)):ig();return}if(!Oe)return;let o={Escape:To,Enter:()=>ki(fe[pe]),ArrowDown:()=>Zn(pe+1),ArrowUp:()=>Zn(pe-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function lg(e){Oe&&e.key==="Control"&&ki(fe[pe])}var Cc=f({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:w,styles:qc,start(){Li=new AbortController;let{signal:e}=Li;addEventListener("keydown",ag,{capture:!0,signal:e}),addEventListener("keyup",lg,{capture:!0,signal:e}),addEventListener("blur",To,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&Jn(h()),{signal:e}),xc=[ue(({prevId:i})=>{Jn(i),Ec(Xn())}),W.on("conversation",({id:i})=>{w.store.visits.includes(i)&&Tc(i),Jn(i)})];let{visits:t,titles:o,previews:n}=w.store,r=t.filter(i=>i!==xe&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(w.store.visits=t.filter(i=>!r.includes(i))),Ec(Xn())},stop(){Li?.abort();for(let e of xc)e();To()}});var Ii="data:audio/mpeg;base64,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";var Mc=new x("ResponseNotification"),cg=.5,ug=200,dg=300,Co=p({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:e=>(e.append(K("Preview",Bc)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),Lc=null,Bi=new Map,kc,Oi;function mg(e){return new Promise((t,o)=>GM_xmlhttpRequest({url:e,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=ug&&n<dg?t(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var fg=e=>Uint8Array.from(atob(e.slice(e.indexOf(",")+1)),t=>t.charCodeAt(0)).buffer;function pg(e,t){let o=Bi.get(t);return o||(o=(t.startsWith("data:")?Promise.resolve(fg(t)):mg(t)).then(n=>e.decodeAudioData(n)),o.catch(()=>Bi.delete(t)),Bi.set(t,o)),o}async function Ic(e){Lc??=new AudioContext;let t=Lc;t.state==="suspended"&&t.resume();let o=t.createBufferSource(),n=t.createGain();o.buffer=await pg(t,e),n.gain.value=cg,o.connect(n).connect(t.destination),o.start()}function Bc(){let e=Co.store.soundUrl.trim();Ic(e||Ii).catch(t=>{Mc.warn("Sound failed",t),e&&Ic(Ii).catch(o=>Mc.warn("Default chime failed",o))})}function gg(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function hg(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(Oi=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:Oi.signal}))}var Oc=f({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:Co,start(){hg(),kc=q.on("fall",({conversationId:e,outcome:t})=>{t==="done"&&(Co.store.onlyWhenHidden&&!document.hidden||(Co.store.sound&&Bc(),Co.store.browserNotification&&gg(Eo(e))))})},stop(){kc?.(),Oi?.abort()}});var bg=`:is(${u.sidebarScroll}, :has(> ${u.sidebarScroll})) + :has(${u.menuButton})`,Ag=`${u.rail} > :has(${u.menuButton})`,Ri=`:is(${bg}, ${Ag}, ${u.oldProfile}):not(:hover)`,Pi="[data-bloom-profile-avatar]",yg=`:is(${Ri}, ${Ri} :has(${Pi})) > :not(${Pi}, :has(${Pi}))`,Rc=p({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function vg(){let{opacity:e,fadeAvatar:t}=Rc.store;return e>=100?"":`${t?Ri:yg}{opacity:${e/100}!important}`}var Pc,Dc=f({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Rc,styles:vg,start(){Pc=de()},stop(){Pc?.()}});var Hc=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

button.bloom-star-chats-star,
button.bloom-star-chats-toggle,
button.bloom-star-chats-jump,
button.bloom-star-chats-unstar {
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    cursor: pointer;
}

button.bloom-star-chats-star,
button.bloom-star-chats-toggle {
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 0.5rem;
    color: inherit;
}

button.bloom-star-chats-star[aria-pressed="true"],
button.bloom-star-chats-toggle.bloom-star-chats-here,
button.bloom-star-chats-unstar {
    color: #ff7a17;
}

button.bloom-star-chats-star[aria-pressed="true"] .bloom-icon,
button.bloom-star-chats-toggle.bloom-star-chats-here .bloom-icon,
button.bloom-star-chats-unstar .bloom-icon {
    fill: currentcolor;
    stroke: none;
}

button.bloom-star-chats-star .bloom-icon,
button.bloom-star-chats-toggle .bloom-icon,
button.bloom-star-chats-unstar .bloom-icon {
    width: 1rem;
    height: 1rem;
}

button.bloom-star-chats-star:hover,
button.bloom-star-chats-toggle:hover,
button.bloom-star-chats-unstar:hover,
button.bloom-star-chats-jump:hover {
    background: var(--bloom-hover);
}

.bloom-star-chats-panel {
    position: fixed;
    z-index: 80;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: min(18rem, 70vw);
    max-height: min(24rem, 70vh);
    overflow: auto;
    padding: 0.375rem;
    border: 1px solid var(--bloom-border);
    border-radius: 0.75rem;
    background: var(--bloom-surface);
    color: var(--bloom-fg);
    box-shadow: var(--bloom-shadow);
}

.bloom-star-chats-head,
.bloom-star-chats-empty {
    padding: 0.3rem 0.5rem;
    color: var(--bloom-fg-3);
    font-size: 0.75rem;
}

.bloom-star-chats-row {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    border-radius: 0.5rem;
}

.bloom-star-chats-row:hover {
    background: var(--bloom-hover);
}

button.bloom-star-chats-jump {
    display: flex;
    flex: 1;
    align-items: center;
    gap: 0.375rem;
    min-width: 0;
    padding: 0.3rem 0.25rem 0.3rem 0.5rem;
    text-align: start;
}

.bloom-star-chats-role {
    flex: none;
    color: var(--bloom-fg-3);
    font-size: 0.6875rem;
}

.bloom-star-chats-snip {
    overflow: hidden;
    min-width: 0;
    font-size: 0.8125rem;
    text-overflow: ellipsis;
    white-space: nowrap;
}

button.bloom-star-chats-unstar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    margin-inline-end: 0.15rem;
    border-radius: 0.375rem;
}

.bloom-star-chats-flash {
    outline: 2px solid #ff7a17;
    outline-offset: 2px;
}

[data-bloom="navigator"] .bloom-nav-tick.bloom-star-chats-mark {
    background: #ff7a17;
}

[data-bloom="navigator"] .bloom-nav-row.bloom-star-chats-mark::after {
    content: "";
    flex: none;
    width: 0.4rem;
    height: 0.4rem;
    margin-inline-start: auto;
    border-radius: 999px;
    background: #ff7a17;
}
`;var N=E("bloom-star-chats"),wg=80,xg=60,Sg=1200,Eg=120,Nc=180,Fi=p({messages:{type:"custom",default:[]}}),Di,Hi=!1,Pe=!1,ot=!1,Ot=0,$=null,$n="",I=null,Ni;function Yi(){let e=Fi.store.messages;return Array.isArray(e)?e.filter(t=>S(t)&&typeof t.conversationId=="string"&&typeof t.messageId=="string"&&(t.role==="user"||t.role==="assistant")&&typeof t.snippet=="string"&&typeof t.starredAt=="number"):[]}function Ki(){let e=h();return e?Yi().filter(t=>t.conversationId===e):[]}function Tg(e,t){return Yi().some(o=>o.conversationId===e&&o.messageId===t)}function Uc(e){let t=Yi(),o=t.some(n=>n.conversationId===e.conversationId&&n.messageId===e.messageId);Fi.store.messages=o?t.filter(n=>!(n.conversationId===e.conversationId&&n.messageId===e.messageId)):[{...e,starredAt:Date.now()},...t].slice(0,wg)}function Ui(e){return e.messageIds[0]||e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.el.getAttribute("data-turn-key")||""}function Cg(e){return le(ft(e)||b(e.el.textContent??""),xg)}function Mg(e){let t=e.closest(u.turn);return t?Me().find(o=>t.contains(o.el)&&(o.el.contains(e)||o.el===t))??null:null}function Lg(){return[...document.querySelectorAll(".turn-action-controls")].filter(e=>!e.closest(`[data-bloom], [role="dialog"], [inert], pre, ${u.sidebars}`))}function kg(){return[...document.querySelectorAll(u.headerMore)].filter(t=>{if(t.dataset.bloom==="message-star"||t.closest("[data-bloom], [role='dialog'], [inert]")||t.closest(u.sidebars))return!1;let o=t.getBoundingClientRect();return o.width===0&&o.height===0?!!t.closest("header, #page-header"):o.top>=0&&o.top<96&&o.left>window.innerWidth*.5}).toSorted((t,o)=>o.getBoundingClientRect().left-t.getBoundingClientRect().left||(t.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1))[0]??null}function Gc(e,t,o){return a("button",{class:t,attrs:{type:"button","aria-label":e},on:{pointerdown:n=>n.stopPropagation(),mousedown:n=>n.stopPropagation(),click:n=>{n.preventDefault(),n.stopPropagation(),o(n)}}},R("star"))}function Ig(e,t){e.setAttribute("aria-pressed",String(t)),e.setAttribute("aria-label",t?"Unstar":"Star")}function Gi(){return Pe||ot}function nt(){Ot&&window.clearTimeout(Ot),Ot=0}function Pt(){Pe=!1,ot=!1,nt(),$?.remove(),$=null,$n="",I?.classList.remove(N("-open")),I?.setAttribute("aria-expanded","false")}function Qi(e){return e instanceof Node&&!!(I?.contains(e)||$?.contains(e))}function Bg(e){e.classList.add(N("-flash")),window.setTimeout(()=>e.classList.remove(N("-flash")),Sg)}function Og(e){let t=Me().find(n=>Ui(n)===e),o=t?.el.closest(u.turn)??t?.el;o&&(o.scrollIntoView({block:"start"}),Bg(o))}function Pg(){let e=h(),t=new Set,o=[...document.querySelectorAll('[data-bloom="message-star"][data-place="action"]')];if(!e||ce()){for(let n of o)n.remove();return}for(let n of Lg()){if(!ge(n))continue;let r=Mg(n),i=r?Ui(r):"";if(!r||!i)continue;let s=n.querySelector('[data-place="action"]');(!s||s.dataset.id!==i)&&(s?.remove(),s=Gc("Star",N("-star"),()=>{let c=h(),l=Me().find(d=>Ui(d)===i);!c||!l||Uc({conversationId:c,messageId:i,role:l.role,snippet:Cg(l)})}),s.dataset.bloom="message-star",s.dataset.place="action",s.dataset.id=i),Ig(s,Tg(e,i)),s.parentElement!==n&&n.append(s),t.add(s)}for(let n of o)t.has(n)||n.remove()}function Rg(){if(!$||!I)return;let e=I.getBoundingClientRect(),t=$.offsetWidth||288,o=$.offsetHeight||120,n=e.bottom+6;n+o>window.innerHeight-8&&(n=Math.max(8,e.top-o-6));let r=Math.max(8,Math.min(e.right-t,window.innerWidth-t-8));$.style.left=`${Math.round(r)}px`,$.style.top=`${Math.round(n)}px`}function Dg(){if(!Gi()||!I){$?.remove(),$=null,$n="",I?.classList.remove(N("-open")),I?.setAttribute("aria-expanded","false");return}let e=Ki(),t=e.map(o=>`${o.messageId}	${o.snippet}`).join(`
`);if(!$||$n!==t){$?.remove();let o=e.map(n=>a("div",{class:N("-row")},a("button",{class:N("-jump"),attrs:{type:"button"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),Pt(),Og(n.messageId)}}},a("span",{class:N("-role"),text:n.role==="user"?"You":"ChatGPT"}),a("span",{class:N("-snip"),text:n.snippet||"Message"})),Gc("Unstar",N("-unstar"),()=>Uc(n))));$=a("div",{class:`bloom-root ${N("-panel")}`,attrs:{"data-bloom":"star-list"},on:{pointerenter:()=>{nt(),ot=!0},pointerleave:n=>{Qi(n.relatedTarget)||Pe||(nt(),Ot=window.setTimeout(()=>{ot=!1,rt()},Nc))}}},a("div",{class:N("-head"),text:"Starred"}),...o.length?o:[a("div",{class:N("-empty"),text:"No starred messages in this chat"})]),document.body.append($),$n=t}Rg(),I.classList.add(N("-open")),I.setAttribute("aria-expanded","true")}function Hg(){for(let r of document.querySelectorAll('[data-bloom="starred"]'))r.remove();let e=kg(),t=e?.parentElement??null,o=h();if(!e||!t||t.closest(u.sidebars)||!o||ce()||!ge(t)){I?.remove(),I=null,Pt();return}I||(I=a("button",{class:N("-toggle"),attrs:{type:"button","data-bloom":"message-star","data-place":"header","aria-label":"Starred messages","aria-expanded":"false"},on:{pointerdown:r=>r.stopPropagation(),pointerenter:()=>{nt(),Ot=window.setTimeout(()=>{ot=!0,rt()},Eg)},pointerleave:r=>{Qi(r.relatedTarget)||(nt(),Ot=window.setTimeout(()=>{ot=!1,Pe||rt()},Nc))},click:r=>{r.preventDefault(),r.stopPropagation(),Pe=!Pe,ot=Pe,nt(),Pe||Pt(),rt()}}},R("star"))),(I.parentElement!==t||I.nextElementSibling!==e)&&e.before(I);let n=e.getBoundingClientRect();n.width>0&&(I.style.width=`${n.width}px`,I.style.height=`${n.height}px`),I.classList.toggle(N("-here"),Ki().length>0),Dg()}function Ng(){let e=new Set(Ki().map(t=>t.messageId));for(let t of document.querySelectorAll('[data-bloom="navigator"] .bloom-nav-tick, [data-bloom="navigator"] .bloom-nav-row'))t.classList.toggle(N("-mark"),!!t.dataset.messageId&&e.has(t.dataset.messageId))}function rt(){if(!Hi){Hi=!0;try{for(let e of document.querySelectorAll('[data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();Pg(),Hg(),Ng()}finally{Hi=!1}}}function Ug(){Pt(),I?.remove(),I=null;for(let e of document.querySelectorAll('[data-bloom="message-star"], [data-bloom="star-list"], [data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();for(let e of document.querySelectorAll(`.${N("-mark")}`))e.classList.remove(N("-mark"))}var Fc=f({name:"StarChats",description:"Star a message from its toolbar. The star left of the top-right menu opens this chat's list.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:Fi,styles:Hc,onSettingsChange(e){e==="messages"&&rt()},start(){Di=L(o=>G(o)&&rt());let e=o=>{Qi(o.target)||Gi()&&Pt()};document.addEventListener("pointerdown",e,!0);let t=o=>{o.key!=="Escape"||!Gi()||(o.preventDefault(),Pt())};document.addEventListener("keydown",t,!0),Ni=()=>{document.removeEventListener("pointerdown",e,!0),document.removeEventListener("keydown",t,!0)},rt()},stop(){Di?.(),Di=void 0,Ni?.(),Ni=void 0,nt(),Ug()}});var Gg="filter:blur(6px)!important;transition:filter 0.2s ease",Yc=`:is(${u.sidebars})`,Fg={conversations:{selectors:[`${Yc} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0},projects:{selectors:[`${Yc} a:is([href*="/project"], [href*="/g/g-p-"])`,"[data-app-action-sidebar-project-row]",".bloom-recent-project"],hover:!0},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}},Qc=p({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function Yg(){return Object.entries(Fg).filter(([e])=>Qc.store[e]).map(([,{selectors:e,hover:t}])=>{let o=e.join(",");return`:is(${o}){${Gg}}`+(t?`:is(${o}):hover, .bloom-recent-item:hover :is(${o}){filter:none!important}`:"")}).join(`
`)}var Kc,jc=f({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:Qc,styles:Yg,start(){Kc=de()},stop(){Kc?.()}});var zc=p({openNewAsTemporary:{type:"boolean",description:"Open New chat as a temporary chat.",default:!1}}),_n;function Kg(e){return e?"/?temporary-chat=true":"/"}function Qg(e){let t=Kg(e);`${location.pathname}${location.search}`===t||e&&ce()&&location.pathname==="/"||location.assign(t)}function jg(e){if(e.closest("[data-bloom]"))return!1;try{let t=new URL(e.href,location.origin);return t.origin===location.origin&&t.pathname==="/"}catch{return!1}}function Wg(e){if(!zc.store.openNewAsTemporary||ce())return;let{target:t}=e;if(!(t instanceof Element))return;let o=t.closest("a[href]");!(o instanceof HTMLAnchorElement)||!jg(o)||o.closest(`${u.sidebarScroll}, ${u.rail}, ${u.oldSidebar}, nav`)&&(e.preventDefault(),e.stopPropagation(),Qg(!0))}function Wc(){for(let e of document.querySelectorAll('[data-bloom="temporary-chat"]'))e.remove()}var Vc=f({name:"TemporaryChat",description:"Optionally open New chat as a temporary chat. No extra sidebar button.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"ghost",enabledByDefault:!0,settings:zc,start(){Wc(),_n=new AbortController,document.addEventListener("pointerdown",Wg,{capture:!0,signal:_n.signal})},stop(){_n?.abort(),_n=void 0,Wc()}});var Re=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)'].join(","),ji=p({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function zg(){let e=[`${Re}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${Re}>*{margin-block:0!important}`];return ji.store.italic||e.push(`${Re}{font-style:inherit!important}`),ji.store.quotes||(e.push(`${Re}{quotes:none!important}`),e.push(`${Re}::before,${Re}::after,${Re} p::before,${Re} p::after{content:none!important}`)),e.join(`
`)}var Jc=f({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:ji,styles:zg});var Vg=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],Jg=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",Zg='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',Zc=p({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function Xg(){let e=`${Zc.store.width}rem`;return`:is(${Jg}){${Vg.map(t=>`${t}:${e}!important`).join(";")}}:is(${Zg}){max-width:min(100%, ${e})!important}`}var Xc=f({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:Zc,styles:Xg});var $g=[va,Ra,Qa,za,rl,sl,ll,hl,Tl,Pl,Hl,ec,oc,nc,lc,vc,Cc,Oc,Dc,Fc,jc,Vc,Jc,Xc],Wi=$g;var _g=new x("Bloom"),$c="2.0.71";async function zi(){ks();for(let e of Wi)e.updatedAt=Vs[e.name];us(Wi),await is(),Io("base",hs),zs(),Go("Init"),zo().then(()=>{es(),Go("DOMContentLoaded")}),await Bs(),Go("HostReady"),_g.info(`Bloom++ ${$c} ready`)}var _c=new x("Boot");if(window===window.top){let e=te.Bloom;e&&_c.warn("Replacing another Bloom++ instance",e.VERSION),Object.defineProperty(te,"Bloom",{value:Vi,configurable:!0,writable:!0}),zi().catch(t=>_c.error("Startup failed",t))}})();
