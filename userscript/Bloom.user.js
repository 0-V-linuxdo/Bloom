// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.56
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

/* Bloom++ v2.0.56. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Yl=Object.defineProperty;var Fl=(e,t)=>{for(var o in t)Yl(e,o,{get:t[o],enumerable:!0})};var S=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var ge=(e,t,o)=>Math.min(o,Math.max(t,e)),x=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),li=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,he=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,w=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function po(e,t){return`${e} ${t}${e===1?"":"s"}`}async function ci(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function be(e){try{return JSON.parse(e)}catch{return}}var Z=typeof unsafeWindow>"u"?window:unsafeWindow;var si={};Fl(si,{VERSION:()=>Nl,init:()=>ai,plugins:()=>Le});var Ql=new S("Styles"),pt=new Map,ui=new Set,gt=new Map,Pn=!0;function di(){let e=document.adoptedStyleSheets.filter(t=>!ui.has(t));document.adoptedStyleSheets=[...e,...pt.values()]}function mi(e){document.readyState==="loading"||e.parentNode===document.head||document.head.append(e)}function Kl(e,t){let o=gt.get(e);o||(o=document.createElement("style"),o.id=`bloom-style-${e}`,gt.set(e,o)),o.textContent!==t&&(o.textContent=t),mi(o)}function go(e,t){if(Pn)try{let o=pt.get(e);o||(o=new Z.CSSStyleSheet,pt.set(e,o),ui.add(o)),o.replaceSync(t),di();return}catch(o){Ql.warn("Constructed style sheets unavailable, using <style> after parsing",o),Pn=!1,pt.delete(e)}Kl(e,t)}function Hn(e){pt.delete(e)&&Pn&&di(),gt.get(e)?.remove(),gt.delete(e)}function fi(){for(let e of gt.values())mi(e)}var C=e=>(...t)=>t.map(o=>e+o).join(" "),ho=(...e)=>e.filter(Boolean).join(" "),We=e=>e.length?`${e.map(t=>`${t}:not([data-bloom])`).join(",")}{display:none!important}`:"";function p(e){return e}var Ce=new S("Storage"),Wl="bloompp",bo="kv",pi=null;function jl(){return pi??=new Promise((e,t)=>{let o=indexedDB.open(Wl,1);o.onupgradeneeded=()=>{o.result.objectStoreNames.contains(bo)||o.result.createObjectStore(bo)},o.onsuccess=()=>e(o.result),o.onerror=()=>t(o.error)}),pi}function Nn(e,t){return jl().then(o=>new Promise((n,r)=>{let i=t(o.transaction(bo,e).objectStore(bo));i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)}))}async function zl(e){if(typeof GM_getValue=="function")try{return await GM_getValue(e)}catch(t){Ce.warn("GM read failed",t);return}}async function Jl(e){try{return await Nn("readonly",t=>t.get(e))}catch(t){Ce.warn("IndexedDB read failed",t);return}}function Vl(e){try{return localStorage.getItem(e)??void 0}catch{return}}async function Ao(e){return Promise.all([zl(e),Jl(e),Vl(e)])}function gi(e,t){typeof GM_addValueChangeListener=="function"&&GM_addValueChangeListener(e,(o,n,r,i)=>{i&&t(r)}),addEventListener("storage",o=>{o.key===e&&t(o.newValue)})}function Gn(e){if(typeof GM_setValue=="function")try{GM_setValue(e,{})}catch(t){Ce.warn("GM delete failed",t)}try{localStorage.removeItem(e)}catch(t){Ce.warn("localStorage delete failed",t)}Nn("readwrite",t=>t.delete(e)).catch(t=>Ce.warn("IndexedDB delete failed",t))}function yo(e,t){let o=JSON.stringify(t);if(typeof GM_setValue=="function")try{GM_setValue(e,t)}catch{GM_setValue(e,o)}try{localStorage.setItem(e,o)}catch(n){Ce.warn("localStorage write failed",n)}Nn("readwrite",n=>n.put(o,e)).catch(n=>Ce.warn("IndexedDB write failed",n))}var Zl=new S("Settings"),Yn="BloomSettings",Xl=100,$l=["GM","IndexedDB","localStorage"],je={plugins:{}},vo=new Set,Fn=new Set,ht;function bi(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=be(t);return!x(t)||!x(t.plugins)||!Object.keys(t.plugins).length?null:t}var Un=e=>e==null||e===""||(Array.isArray(e)?!e.length:x(e)&&!Object.keys(e).length);function _l(e){return Un(e)?0:Array.isArray(e)?12+Math.min(e.length,40):x(e)?12+Math.min(Object.keys(e).length,40):3}function ec(e){let t=0;for(let o of Object.values(e.plugins))if(x(o))for(let[n,r]of Object.entries(o))n!=="enabled"&&(t+=_l(r));return t}var hi=e=>Object.values(e.plugins).filter(t=>x(t)&&t.enabled===!0).length;function tc(e){let t=e.map((i,a)=>i&&{candidate:i,index:a,score:ec(i)}).filter(i=>i!=null).toSorted((i,a)=>a.score-i.score||(i.score?0:hi(a.candidate)-hi(i.candidate))||i.index-a.index);if(!t.length)return null;let[o,...n]=t,r=structuredClone(o.candidate);for(let{candidate:i}of n)for(let[a,c]of Object.entries(i.plugins)){if(!x(c))continue;let l=r.plugins[a]??={};for(let[d,m]of Object.entries(c))d==="enabled"?!("enabled"in l)&&m===!0&&(l.enabled=!0):Un(l[d])&&!Un(m)&&(l[d]=structuredClone(m));Object.keys(l).length||delete r.plugins[a]}return{bag:r,source:$l[o.index]}}async function Ai(){let e=await Ao(Yn),t=tc(e.map(bi));t&&(je.plugins=t.bag.plugins,Zl.info("Loaded settings from",t.source))}var yi=(e,t)=>`${e}
${t}`;function vi(){ht=void 0,Fn.clear(),yo(Yn,je)}function oc(e){let t=bi(e);if(!t)return;let o=[];for(let n of new Set([...Object.keys(je.plugins),...Object.keys(t.plugins)])){let r=je.plugins[n]??={},i=x(t.plugins[n])?t.plugins[n]:{};for(let a of new Set([...Object.keys(r),...Object.keys(i)]))Fn.has(yi(n,a))||JSON.stringify(r[a])===JSON.stringify(i[a])||(i[a]===void 0?delete r[a]:r[a]=i[a],o.push([n,a]))}for(let[n,r]of o)for(let i of vo)i(n,r)}function nc(){ht&&(clearTimeout(ht),vi())}var Te=(e,t)=>je.plugins[e]?.[t];function Me(e,t,o){let n=je.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,Fn.add(yi(e,t)),clearTimeout(ht),ht=setTimeout(vi,Xl);for(let r of vo)r(e,t)}function ze(e){return vo.add(e),()=>void vo.delete(e)}function Qn(e){return e.type==="component"?void 0:e.default}function g(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>Te(t.pluginName,n)??(e[n]&&Qn(e[n])),set:(o,n,r)=>(Me(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&Te(t.pluginName,o)!==void 0&&Me(t.pluginName,o)}};return t}var qi=e=>{let t=()=>{let o=Te("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();Me("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},qo=qi("pinnedPlugins"),So=qi("starredPlugins");addEventListener("pagehide",nc);gi(Yn,oc);var wo=new S("PluginManager"),Le=new Map,bt=new Set,Si=new Set,Kn=new Set;function wi(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),Le.set(t.name,t)}var At=e=>!!e.required||(Te(e.name,"enabled")??!!e.enabledByDefault);var Wn=e=>`plugin-${e.name}`;function xi(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?go(Wn(e),t):Hn(Wn(e))}function Ei(e){if(!bt.has(e.name))try{xi(e),e.start?.(),bt.add(e.name)}catch(t){wo.error(`Failed to start ${e.name}`,t)}}function rc(e){if(bt.delete(e.name)){Hn(Wn(e));try{e.stop?.()}catch(t){wo.error(`Failed to stop ${e.name}`,t)}}}var Ci=e=>e.startAt??"HostReady";function xo(e){Si.add(e);for(let t of Le.values())Ci(t)===e&&At(t)&&Ei(t);wo.info(`${e}: ${[...bt].join(", ")}`)}function Ti(e,t){Me(e.name,"enabled",t),t?Si.has(Ci(e))&&Ei(e):rc(e);for(let o of Kn)o()}function Mi(e){return Kn.add(e),()=>void Kn.delete(e)}ze((e,t)=>{let o=Le.get(e);if(!(!o||t==="enabled"||!bt.has(e)))try{xi(o),o.onSettingsChange?.(t)}catch(n){wo.error(`Settings change failed for ${e}`,n)}});var Li=`/*
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
`;var ac=new S("Dom");function s(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var ki=document.createElement("template");function Bi(e){return ki.innerHTML=e.trim(),ki.content.firstElementChild.cloneNode(!0)}var vt=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),W=(e,t=document)=>[...t.querySelectorAll(e)].find(vt)??null,sc=16,lc="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function Ii(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([lc],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function qt(e){document.hidden?setTimeout(e,sc):requestAnimationFrame(e)}function Je(e){let t=!1;return()=>{t||(t=!0,qt(()=>{t=!1;try{e()}catch(o){ac.error("Scheduled task failed",o)}}))}}var Eo=new Set,Co=[],yt,cc=Je(()=>{let e=Co;Co=[];for(let t of Eo)t(e)});function B(e){return Eo.add(e),yt||(yt=new MutationObserver(t=>{Co.push(...t),cc()}),yt.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{Eo.delete(e),!Eo.size&&(yt?.disconnect(),yt=void 0,Co=[])}}var uc=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),H=e=>!e.length||e.some(t=>!uc(t.target));function ke(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size");return}e.getAttribute("data-bloom-text")!==t&&(e.hasAttribute("data-bloom-text")||e.style.setProperty("--bloom-text-size",getComputedStyle(e).fontSize),e.setAttribute("data-bloom-text",t))}var dc=new S("Events");function To(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){dc.error(`Listener for ${String(t)} failed`,r)}}}}var u={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",modelTrigger:'[data-testid="model-switcher-dropdown-button"], button[aria-label="Model selector" i]',modelItem:'[role="menu"] [data-testid^="model-switcher-"], [role="menuitem"][data-testid^="model-switcher-"]',homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]'};var Oi=/[​-‍﻿]/g,Ae=()=>W(u.composerInput),St=e=>e instanceof HTMLElement&&e.matches(u.composerInput),ye=(e=Ae())=>e?.closest("form")??document.querySelector(u.oldComposerForm);function T(e=Ae()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(Oi,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(Oi,"").trim()}var mc=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function te(e,t=Ae()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return mc?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function Ri(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:a,value:c}=e;return{first:!c.slice(0,i).includes(`
`),last:!c.slice(a).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var Di=e=>{let t=ye();return(t&&W(e,t))??W(e)},Ve=()=>Di(u.stopButton),fc=()=>{let e=Di(u.sendButton);return e&&!e.matches(u.stopButton)?e:null};function Mo(){let e=fc();if(e){e.disabled||e.click();return}Ae()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var Pi=()=>vt(Ve());var Gi=new S("Network"),pc=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,gc=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,ko=1e3,hc=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),Y=To(),jn=new Map,Hi=new Map,bc=1,$=e=>e?jn.get(e)??null:null;function Lo(e){let t=jn.get(e);return t||jn.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var Ui=e=>e==="user"||e==="assistant";function Yi(e){let t=e.author?.role;if(!e.id||!Ui(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(l=>typeof l=="string").join(`
`).trim(),i=n.filter(l=>x(l)&&l.content_type==="image_asset_pointer").length,a=e.metadata?.attachments,c=Array.isArray(a)&&a.length>0;return!r&&!i&&!c?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*ko:null,text:r,hasFiles:c,imageCount:i}}var Fi=e=>e.filter((t,o)=>t.role==="user"||e[o+1]?.role!=="assistant"),zn=e=>e.map(t=>t.createTime).filter(t=>t!=null);function Ac(e,t){let o=zn(e),n=zn(t);return!o.length||!n.length?!1:Math.max(...o)<Math.min(...n)}function yc(e){let t=zn(e);if(t.length<2)return e;let[o]=t,n=o-e.length;return e.map((i,a)=>(i.createTime!=null&&(n=i.createTime),{message:i,index:a,time:i.createTime??n})).toSorted((i,a)=>i.time-a.time||i.index-a.index).map(i=>i.message)}function vc(e,t){let o=t.filter(x).map(c=>x(c.message)?c.message:c);for(let c of o)c.id&&c.create_time&&e.times.set(c.id,c.create_time*ko);let n=o.map(Yi).filter(c=>c!=null),r=new Set(n.map(c=>c.id)),i=e.chain.filter(c=>!r.has(c.id)),a=Ac(n,i)?[...n,...i]:[...i,...n];return e.chain=Fi(yc(a)),e}function qc(e,t){if(!x(t)||!(x(t.mapping)||Array.isArray(t.messages)))return null;let o=Lo(e);if(typeof t.title=="string"&&t.title&&(o.title=t.title),Array.isArray(t.messages))return vc(o,t.messages);let n=t.mapping;for(let c of Object.values(n)){let l=c.message?.create_time;c.message?.id&&l&&o.times.set(c.message.id,l*ko)}let r=[],i=new Set,a=typeof t.current_node=="string"?t.current_node:null;for(;a&&!i.has(a)&&n[a];){i.add(a);let c=n[a].message,l=c?Yi(c):null;l&&r.push(l),a=n[a].parent??null}return r.length&&(o.chain=Fi(r.toReversed())),o}function Sc(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}function wc(e){if(typeof e?.body!="string")return null;let t=be(e.body);return x(t)&&typeof t.conversation_id=="string"?t.conversation_id:null}function xc(e,t){if(!x(e))return;typeof e.type=="string"&&hc.has(e.type)&&(t.handoff=!0);let o=x(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(Lo(e.conversation_id).title=e.title,Y.emit("conversation",Lo(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&Ui(n.author?.role)){let r=n.create_time*ko;t.conversationId&&Lo(t.conversationId).times.set(n.id,r),Y.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function Ec(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:a}=await o.read();if(i)break;r+=n.decode(a,{stream:!0});let c=r.split(`
`);r=c.pop()??"";for(let l of c){if(!l.startsWith("data:"))continue;let d=l.slice(5).trim();d&&d!=="[DONE]"&&xc(be(d),t)}}}async function Cc(e,t,o){let n={conversationId:t,error:!1,handoff:!1};Hi.set(e,t),Y.emit("generate-start",{requestId:e,conversationId:t});try{let r=await o;r.ok?r.headers.get("content-type")?.includes("event-stream")&&await Ec(r.clone(),n):n.error=!0}catch(r){let i=r instanceof DOMException&&r.name==="AbortError";n.handoff||=i,n.error||=!i}finally{Hi.delete(e),Y.emit("generate-end",{requestId:e,...n})}}async function Tc(e,t){try{let o=await t;if(!o.ok)return;let n=qc(e,await o.clone().json());n&&Y.emit("conversation",n)}catch(o){Gi.debug("Conversation read skipped",o)}}function Mc(e,t,o){let n=Sc(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&pc.test(n.pathname)){Cc(bc++,wc(t),o);return}let i=r==="GET"&&n.pathname.match(gc)?.[1];i&&Tc(i,o)}var Ni=!1;function Qi(){if(Ni)return;Ni=!0;let e=Z.fetch,t=function(o,n){let r=e.call(this??Z,o,n);try{Mc(o,n,r)}catch(i){Gi.error("Fetch tap failed",i)}return r};Z.fetch=typeof exportFunction=="function"?exportFunction(t,Z):t}var Lc="__reactContainer$",Ki="__reactFiber$";function Bo(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var Jn=(e,t)=>Object.keys(e.wrappedJSObject??e).some(o=>o.startsWith(t)),se=e=>!Jn(document,Lc)||Jn(e,Ki);function wt(){return document.body?Promise.resolve():new Promise(e=>{let t=new MutationObserver(()=>{document.body&&(t.disconnect(),e())});t.observe(document,{childList:!0,subtree:!0})})}async function Wi(){await wt();let e=Date.now()+8e3;for(;!Jn(document.body,Ki)&&Date.now()<e;)await new Promise(t=>setTimeout(t,100))}var kc=new S("Route"),ji=/\/c\/(?!local-)([\w-]+)/,Bc=500,oe=e=>{try{return new URL(e,location.origin).pathname.match(ji)?.[1]??null}catch{return null}},h=()=>location.pathname.match(ji)?.[1]??null,Do=()=>location.pathname==="/",Ic=/^\/g\/g-p-[^/]+(?:\/project)?\/?$/,zi=()=>Ic.test(location.pathname),Po=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",Oo=new Set,Ro=location.href,Zn=h(),Io;function Vn(){if(location.href===Ro)return;let e={prevHref:Ro,href:location.href,prevId:Zn,id:h()};Ro=e.href,Zn=e.id;for(let t of Oo)try{t(e)}catch(o){kc.error("Route listener failed",o)}}function Oc(){let e=new AbortController,{navigation:t}=Z;t?.addEventListener("currententrychange",()=>queueMicrotask(Vn),{signal:e.signal}),addEventListener("popstate",Vn,{signal:e.signal});let o=setInterval(Vn,Bc);return()=>{e.abort(),clearInterval(o)}}function ve(e){return Oo.add(e),Io||(Ro=location.href,Zn=h(),Io=Oc()),()=>{Oo.delete(e),!Oo.size&&(Io?.(),Io=void 0)}}var Rc=["data-turn","data-message-author-role"],Dc=/:(user|assistant)$/,Xn=`${u.messageUnit}, ${u.oldMessage}`,$n=e=>e==="user"||e==="assistant",Xi=()=>!!document.querySelector(u.timelineScroll),Ze=()=>Xi()?W(u.timelineScroll):document;function Et(){if(Xi())return W(u.timelineScroll);let e=document.querySelector(u.turn);for(let t=e?.parentElement;t;t=t.parentElement){let{overflowY:o}=getComputedStyle(t);if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight)return t}return document.scrollingElement}var No=e=>e.getAttribute("data-chatgpt-search-unit-key")?.match(Dc)?.[1]??null,$i=e=>[...e.querySelectorAll(u.searchUnit)].filter(t=>No(t)&&!t.parentElement?.closest(u.searchUnit)),Ji=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function xt(e){let t=Ji(e);return t.length?t:[...new Set([...e.querySelectorAll(Xn)].flatMap(Ji))]}function _n(e=Ze()){if(!e)return[];let t=$i(e);return t.length?t:[...e.querySelectorAll(Xn)].filter(o=>!o.parentElement?.closest(Xn))}function Pc(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function Hc(e){for(let t of Rc){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if($n(o))return o}return e.querySelector(u.markdown)||e.querySelector(u.generatedImage)?"assistant":null}var Nc=e=>!e.parentElement?.closest(u.turn);function Go(){let e=$(h())?.chain??[];return[...Ze()?.querySelectorAll(u.turn)??[]].filter(Nc).flatMap(o=>{let n=$i(o),r=n.length?n.map(i=>({el:i,known:No(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=d=>!n.some(m=>m.contains(d))&&w(d.textContent??""),a=[...o.querySelectorAll(u.assistantMarkdown)].find(d=>i(d)&&!Ho.test(w(d.textContent??""))),c=[...o.querySelectorAll(u.activityHeader)].findLast(i),l=a??c;l&&r.push({el:l,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?xt(o):_n(o).flatMap(xt),a=n??Hc(o)??Pc(i,e)??(r%2?"assistant":"user"),c=o.closest(u.turn)??o,l=!o.closest(u.searchUnit)&&!!c.querySelector(u.turnBusy),d=a==="assistant"&&(o.matches(u.turnBusy)||!!o.querySelector(u.turnBusy)||l);return{el:o,role:a,messageIds:i,streaming:d}})}var Gc="[data-bloom], .sr-only",_i=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,Ho=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,Vi=new WeakMap;function Uo(e){let o=(e.el.closest(u.turn)??e.el).textContent?.length??0,n=Vi.get(e.el);if(n?.length===o)return n.summary;let r=Uc(e);return Vi.set(e.el,{length:o,summary:r}),r}function Zi(e){let t=new Set,o=[];for(let n of e.querySelectorAll(u.assistantMarkdown)){if(n.closest(u.searchUnit))continue;let r=w(n.textContent??"");!r||Ho.test(r)||_i.test(r)||t.has(r)||(t.add(r),o.push(r))}return o}function Uc(e){let t=e.el.querySelectorAll(u.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.closest(u.turn);if(e.role==="assistant"&&o&&e.el.matches(u.assistantMarkdown)&&!e.el.closest(u.searchUnit)){let l=Zi(o);if(l.length)return l.join(" \xB7 ")}let n=e.el.querySelector(e.role==="assistant"?u.markdown:".whitespace-pre-wrap")??e.el,i=[...n.querySelectorAll(Gc)].map(l=>w(l.textContent??"")).filter(Boolean).reduce((l,d)=>l.replace(d,`
`),n.innerText||n.textContent||""),a=i.split(`
`).map(w).filter(l=>l&&!_i.test(l)&&!Ho.test(l));if(a.length)return a.join(" ");if(e.role==="assistant"&&o){let l=Zi(o);if(l.length)return l.join(" \xB7 ")}let c=i.split(`
`).map(w).filter(l=>Ho.test(l));return c.length?c.at(-1)??"":e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function Yo(e){return e.text?w(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var ea=e=>e.matches(u.timelineScroll)&&getComputedStyle(e).flexDirection==="column-reverse";var Yc=250,Fc=400,Qc=6e4,Kc=5e3,Wc=`:is(${u.turn}) :is(${u.turnBusy})`,y=To(),Ko=new Set,er=new Set,qe=!1,oa=0,Xe=null,$e=!1,Fo=!1,Ct=0,Wo=!1,Tt=null,ta=!1,L=()=>({generating:qe,conversationId:h()}),na=()=>Pi()||!!Ze()?.querySelector(Wc);function jc(){let e=na();return e?Fo||(Ct=0,Wo=!0):Fo=!1,[...Ko].some(t=>!er.has(t))||e&&!Fo||Date.now()<Ct}function zc(){return Tt?.error?"error":$e?"stopped":"done"}function Jc(){Xe=null,qe=!1,Wo=!1,y.emit("fall",{conversationId:h(),outcome:zc()}),$e=!1,Tt=null}function ra(){let e=jc();e&&!qe&&(qe=!0,oa=Date.now(),$e=!1,Tt=null,y.emit("rise",{conversationId:h()})),e||!qe?Xe=null:Xe==null?Xe=Date.now():Date.now()-Xe>=Fc&&Jc()}function Qo(){ra(),y.emit("tick",L())}function Vc({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(qe||Date.now()-oa<Qc);if(!o&&qe){for(let n of Ko)er.add(n);Fo=na(),Ct=0,Wo=!1,Xe=null,qe=!1,$e=!1,Tt=null,y.emit("fall",{conversationId:e,outcome:"left"})}y.emit("context",{prevId:e,id:t,migrated:o}),Qo()}function Zc(e){e.target instanceof Element&&e.target.closest(u.stopButton)&&($e=!0,Ct=0)}function ia(){ta||(ta=!0,Y.on("generate-start",({requestId:e})=>{Ko.add(e),Qo()}),Y.on("generate-end",e=>{Ko.delete(e.requestId),!er.delete(e.requestId)&&(Tt=e,Ct=e.handoff&&!e.error&&!$e&&!Wo?Date.now()+Kc:0,Qo())}),ve(Vc),document.addEventListener("click",Zc,!0),Ii(Qo,Yc),Bo().then(()=>B(ra)))}var aa={BetterNavigator:1791037311e3,ChatListStatus:1791034734e3,ChatStateFavicons:1791034734e3,Cleaner:1791034734e3,ComposerOpacity:1791037311e3,Continue:1791034734e3,CustomSidebarIdentity:1791034734e3,GreetingCustomizer:1791037311e3,InputHistory:1791034734e3,MessageTimestamps:1791034734e3,NoDictation:1791034734e3,NoShareLink:1791034734e3,NoSidebarIdentity:1791034734e3,PromptQueue:1791037311e3,RecentTopics:1791034734e3,ResponseNotification:1791034734e3,Settings:1791039171e3,SidebarIdentityOpacity:1791034734e3,StarChats:1791040514e3,StreamerMode:1791034734e3,WiderChat:1791034734e3};var A=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,Xc="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",$c={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${Xc}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:A('<path d="M18 6 6 18M6 6l12 12"/>'),gear:A('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:A('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:A('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:A('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:A('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:A('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:A('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:A('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:A('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:A('<path d="m6 9 6 6 6-6"/>'),play:A('<path d="M7 4v16l13-8z"/>'),plus:A('<path d="M12 5v14M5 12h14"/>'),check:A('<path d="m5 12 5 5 9-10"/>'),alert:A('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:A('<path d="M4 5h16v11H9l-5 4z"/>'),layout:A('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:A('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:A('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:A('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:A('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:A('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:A('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:A('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:A('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:A('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:A('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:A('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:A('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:A('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:A('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),grip:A('<path d="M9 6h0M15 6h0M9 12h0M15 12h0M9 18h0M15 18h0"/>')},D=e=>Bi($c[e]);var le="data-bloom-tip",tr=6,or=8,Be,sa=null;function _e(e){if(e===sa)return;if(sa=e,!e){Be?.remove();return}Be??=s("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),Be.textContent=e.getAttribute(le),document.body.append(Be);let t=e.getBoundingClientRect(),{width:o,height:n}=Be.getBoundingClientRect(),r=t.bottom+tr+n<=innerHeight-or;Be.style.left=`${ge(t.left+t.width/2-o/2,or,innerWidth-o-or)}px`,Be.style.top=`${r?t.bottom+tr:t.top-tr-n}px`}var la=e=>e instanceof Element?e.closest(`[${le}]`):null;function ca(){let e=new AbortController,t={passive:!0,signal:e.signal};return document.addEventListener("pointerover",o=>_e(la(o.target)),t),document.addEventListener("pointerout",o=>o.relatedTarget||_e(null),t),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&_e(la(o.target)),t),document.addEventListener("focusout",()=>_e(null),t),document.addEventListener("pointerdown",()=>_e(null),t),()=>{e.abort(),_e(null)}}function nr(e,t,o,n=!1){let r=s("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let a=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(a)),t(a)}),r}function N(e,t,o){return s("button",{class:ho("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button","data-bloom":"control"},on:{click:t}})}function j(e,t,o,n){let r=s("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":t,"data-bloom":"control",[le]:t},on:{click:o}},D(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function jo(e,t,o,n,r,i){let a=s("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});a.value=String(e);let c=s("output",{text:`${a.value}${r}`});return a.addEventListener("input",()=>{c.textContent=`${a.value}${r}`,i(Number(a.value))}),s("div",{class:"bloom-slider"},a,c)}function rr(e,t,o){let n=s("select",{class:"bloom-select"},...t.map(r=>s("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function Mt(e,t,o="",n="text"){let r=s("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var _c=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,ua=/\S+@\S+\.\S+/,eu=3,tu=/^\/g\/(g-p-[^/]+)\//,ou=/^g-p-[0-9a-f]+-?/i,da=e=>!!e.closest(".sr-only"),ir=e=>!!e?.querySelector(u.menuButton);function ma(){return[...document.querySelectorAll(u.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(ir)).filter(e=>e!=null)}function fa(){let e=[...document.querySelectorAll(u.oldProfile)];if(e.length)return e.map(o=>{let n=o.parentElement?.children.length===1?o.parentElement:o;return{kind:"profile",anchor:n,insert:r=>n.before(r)}});let t=ma().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(u.rail)){let n=[...o.children].find(ir);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}var ar=e=>!e.closest("[data-bloom]")&&(!!e.querySelector("img, [class*=rounded-full]")||ba(e).some(t=>!da(t))),pa=e=>[...e.parentElement?.children??[]].find(t=>t!==e&&t instanceof HTMLElement&&ar(t))??null;function ga(){let e=[...document.querySelectorAll(u.oldProfile)];return e.length?e:[...ma(),...[...document.querySelectorAll(u.rail)].map(o=>[...o.children].findLast(ir))].map(o=>[...o?.querySelectorAll(u.menuButton)??[]].findLast(n=>ar(n)||pa(n))).filter(o=>o!=null)}var ha=()=>ga().map(e=>ar(e)?e:pa(e)).filter(e=>e!=null);function ba(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!w(t.textContent??"")&&!(t instanceof SVGElement))}var nu=e=>{if(/rounded-full/.test(e.getAttribute("class")??""))return!0;if(!e.clientWidth)return!1;let{borderRadius:t}=getComputedStyle(e);return t.includes("%")||Number.parseFloat(t)>=e.clientWidth/2};function zo(e,t,o){for(let n of e.querySelectorAll(`[${t}]`))n!==o&&n.removeAttribute(t);o&&!o.hasAttribute(t)&&o.setAttribute(t,"")}function ru(e,t){if(w(e.textContent??"").length>eu)return null;let o=e.closest("button");for(let n=e;n&&n!==t&&n!==o;n=n.parentElement)if(nu(n))return n;return null}function sr(e,t){e.hasAttribute(`data-bloom-${t}`)||e.setAttribute(`data-bloom-${t}`,"");let o=e.querySelector("img:not([data-bloom] img)"),n=ba(e),r=o?null:n.map(m=>ru(m,e)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),a=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");zo(e,`data-bloom-${t}-avatar`,a);let c=n.filter(m=>!a?.contains(m)&&!da(m)),l=c.find(m=>_c.test(w(m.textContent??""))),d=c.find(m=>ua.test(m.textContent??""));zo(e,`data-bloom-${t}-plan`,l),zo(e,`data-bloom-${t}-email`,d),zo(e,`data-bloom-${t}-name`,c.find(m=>m!==l&&m!==d))}function iu(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function Jo(){return ga().map(iu).find(e=>e!=null)??[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&(ua.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var Lt=e=>[...document.querySelectorAll(u.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&oe(t.href)===e);function Aa(e){let t=Lt(e).find(o=>w(o.textContent??""));return t?w(t.textContent??""):null}function ya(e){let t=new URL(e,location.origin).pathname.match(tu)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!oe(n.href)&&w(n.textContent??""));return o?w(o.textContent??""):t.replace(ou,"").replaceAll("-"," ")||null}var lr=0,Vo;function au(e){if(!H(e))return;for(let o of ha())sr(o,"profile");let t=Jo();t&&sr(t,"menu")}function ne(){lr++;let e=!0;return wt().then(()=>{e&&lr&&!Vo&&(Vo=B(au))}),()=>{e&&(e=!1,!--lr&&(Vo?.(),Vo=void 0))}}var su=new S("SettingsPanel"),f=C("bloom-settings-"),lu=10080*60*1e3,cu=3e3,va="Toggle features. Some need a reload. Click the sliders icon to configure.",uu=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],du=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],mu={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},Sa=new Set(["chat","ui","privacy"]),F=null,Oe="all",cr="all",Zo="",ur=[],wa=()=>[...Le.values()].filter(e=>!e.hidden),fu=e=>!!e.updatedAt&&Date.now()-e.updatedAt<lu;function pu(e){switch(Oe){case"favorites":return So.has(e.name);case"recent":return fu(e);case"all":return!0;case"other":return!e.tags.some(t=>Sa.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(Oe)}}function gu(e){switch(cr){case"all":return!0;case"enabled":return At(e);case"disabled":return!At(e)}}function hu(e){let t=Zo.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function bu(e){let t=qo.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return Oe==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var xa=e=>e.settings?.def??{},Au=e=>Object.values(xa(e)).some(t=>t.type!=="custom");function yu(e,t,o){let n=Te(e.name,t)??Qn(o),r=i=>Me(e.name,t,i);switch(o.type){case"boolean":return nr(n,r,o.description??t);case"slider":return jo(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return rr(n,o.options,r);case"string":return Mt(n,r,o.placeholder);case"number":return Mt(String(n),i=>r(Number(i)),"","number");case"component":{let i=s("div",{class:f("component")});return ur.push(o.render(i)),i}case"custom":return null}}var vu=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function Ea(e){if(!F)return;let t=Object.entries(xa(e)).filter(([,i])=>i.type!=="custom").map(([i,a])=>{let c=yu(e,i,a),l=a.type==="boolean",d=a.type!=="component"&&s("div",{class:f("field-label"),text:vu(i)}),m=a.description&&s("div",{class:f("field-desc"),text:a.description});return s("div",{class:f("field",l?"field-inline":"field-stacked")},(d||m)&&s("div",{class:f("field-text")},d,m),c)}),o,n=N("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},cu);return}clearTimeout(o),e.settings?.reset(),kt(),Ea(e)},"danger"),r=s("div",{class:f("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&kt()}},s("div",{class:f("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},s("div",{class:f("popup-header")},s("div",{class:f("card-icon")},D(e.icon)),s("div",{class:f("popup-title")},s("div",{class:f("card-name"),text:e.name}),s("div",{class:f("popup-authors"),text:e.authors.join(", ")})),j("close","Close",kt)),s("p",{class:f("popup-desc"),text:e.description}),s("div",{class:f("fields")},...t),s("div",{class:f("popup-footer")},n)));F.querySelector(`.${f("modal")}`)?.append(r)}function kt(){for(let e of ur)e();ur=[],F?.querySelector(`.${f("popup-backdrop")}`)?.remove()}function qa(e){let t=At(e),o=So.has(e.name),n=qo.has(e.name),r=!!e.required;return s("div",{class:[f("card",t?"card-on":"card-off"),r?f("card-required"):""].filter(Boolean).join(" ")},s("div",{class:f("card-top")},s("div",{class:f("card-icon")},D(e.icon)),s("div",{class:f("card-actions")},j("star",o?"Unstar":"Star",()=>{So.toggle(e.name),Ie()},o),r?null:j("pin",n?"Unpin":"Pin to top",()=>{qo.toggle(e.name),Ie()},n),r?s("span",{class:f("required-mark"),attrs:{"aria-label":"Required",[le]:"This plugin is required for Bloom++ to work"}},D("alert")):null,Au(e)&&j("gear","Settings",()=>Ea(e)),nr(t,i=>Ti(e,i),r?`${e.name} is required`:`Enable ${e.name}`,r))),s("div",{class:f("card-name"),text:e.name}),s("div",{class:f("card-desc"),text:e.description,title:e.description}),s("div",{class:f("card-footer"),text:e.authors.join(", ")}))}function Ca(){let e=wa().some(o=>!o.tags.some(n=>Sa.has(n)));F?.querySelector(`.${f("tabs")}`)?.replaceChildren(...uu.filter(o=>o.id!=="other"||e).map(o=>s("button",{class:f("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===Oe)},on:{click:()=>{Oe=o.id,Ca(),Ie()}}})))}function Ie(){if(!F)return;let e=wa().filter(pu),t=F.querySelector(`.${f("search")} input`);t&&(t.placeholder=`Search ${po(e.length,"plugin")}...`);let o=bu(e.filter(d=>hu(d)&&gu(d))),n=Oe==="all",r=n?o.filter(d=>!d.required):o,i=n?o.filter(d=>d.required):[],a=[...r.map(qa),...i.length?[s("div",{class:f("required-break"),attrs:{role:"separator"}}),...i.map(qa)]:[]],c=Zo.trim()?"No plugins match your search.":mu[Oe]??"No plugins available.";F.querySelector(`.${f("grid")}`)?.replaceChildren(...a.length?a:[s("div",{class:f("empty"),text:c})])}function qu(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),F?.querySelector(`.${f("popup-backdrop")}`)?kt():et())}var Ta,dr;function Su(){if(F)return;let e=s("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=Zo,e.addEventListener("input",()=>{Zo=e.value,Ie()}),F=s("div",{class:`bloom-root ${f("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&et()}},s("div",{class:f("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},s("div",{class:f("header")},s("div",{class:f("logo")},D("bloom")),s("h2",{class:f("title"),text:"Bloom++"}),s("span",{class:f("hint"),attrs:{"aria-label":va,tabindex:"0",[le]:va}},D("info")),s("span",{class:f("version"),text:"v2.0.56"}),j("close","Close",et)),s("div",{class:f("tabs"),attrs:{role:"tablist"}}),s("div",{class:f("toolbar")},s("label",{class:f("search")},D("search"),e),rr(cr,du,t=>{cr=t,Ie()})),s("div",{class:f("grid")}))),F.addEventListener("keydown",t=>t.stopPropagation()),dr=new AbortController,document.addEventListener("keydown",qu,{capture:!0,signal:dr.signal}),document.body.append(F),Ca(),Ie(),Ta=Mi(Ie),e.focus(),su.debug("Opened")}function et(){kt(),dr?.abort(),Ta?.(),F?.remove(),F=null}var Xo=()=>F?et():Su();var Ma=`/*
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
`;var Se=C("bloom-entry-"),xu=4,mr="--bloom-entry-x",fr=1,tt=g({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar. The account menu and the userscript menu always open the panel.",default:!1},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:!0},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:e=>(e.append(N("Reset position",()=>{tt.store.entryPosition=fr})),()=>e.replaceChildren())},entryPosition:{type:"custom",default:fr}}),Re=new Map,La=!1,ka=[];function Eu(e,t,o){let n=e.currentTarget,r=t.clientWidth-n.offsetWidth;if(e.button!==0||r<=0||!t.classList.contains(Se("hover")))return;let i=tt.store.entryPosition,a=i,c=!1,l=new AbortController;n.setPointerCapture(e.pointerId),n.addEventListener("pointermove",m=>{!c&&Math.abs(m.clientX-e.clientX)<xu||(c=!0,o(),a=ge(i+(m.clientX-e.clientX)/r,0,fr),t.style.setProperty(mr,String(a)))},{signal:l.signal});let d=()=>{l.abort(),c&&(tt.store.entryPosition=a,t.style.removeProperty(mr))};n.addEventListener("pointerup",d,{signal:l.signal}),n.addEventListener("lostpointercapture",d,{signal:l.signal})}function Cu(e){let t=!1,o=s("button",{class:Se("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),t||Xo(),t=!1},pointerdown:r=>{t=!1,e!=="rail"&&Eu(r,n,()=>{t=!0})}}},D("bloom"),e!=="rail"&&s("span",{class:Se("label"),text:"Bloom++"})),n=s("div",{class:`bloom-root ${Se("wrap")} ${Se(e)}`,attrs:{"data-bloom":"entry"}},o);return n}function Tu(e){let t=s("div",{class:`bloom-root ${Se("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),Xo()}}},D("bloom"),s("span",{text:"Bloom++"})),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function Ba(){let{showSidebarEntry:e,showSidebarEntryOnHover:t}=tt.store,o=e||t?fa():[];for(let[r,i]of Re)r.isConnected&&o.some(a=>a.anchor===r)||(i.remove(),Re.delete(r));for(let r of o){let i=Re.get(r.anchor);if(i?.isConnected||!se(r.anchor))continue;let a=i??Cu(r.kind);Re.set(r.anchor,a),r.insert(a)}for(let r of Re.values())r.classList.toggle(Se("hover"),!e);let n=Jo();n&&!n.querySelector('[data-bloom="menu-entry"]')&&Tu(n)}var Ia=p({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:tt,styles:()=>`${Ma}.${Se("hover")}{${mr}:${tt.store.entryPosition}}`,start(){ka=[B(Ba),ca(),ne()],!La&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",Xo),La=!0)},stop(){for(let e of ka)e();for(let e of Re.values())e.remove();Re.clear(),et()},onSettingsChange:Ba});var Oa=`/*
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
`;var k=C("bloom-nav-"),en=80,Lu=1200,ku=2,Ra=3e4,Bu=200,Iu=.9,Ou=.3,Ru=12,Du={user:"\u2753",assistant:"\u{1F916}"},Pu=["wheel","touchmove","pointerdown"],tn=g({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),I=null,P=[],Pe=-1,He=-1,ot=null,$o="",gr=0,Da=[],Rt=null,_o=null,De,Bt,hr="",It=[],Hu=e=>tn.store.showAssistant||e.role==="user",Nu=e=>e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.messageIds[0]||e.role;function Gu(e){return{role:e.role,summary:Uo(e),ids:e.messageIds,turn:e,streaming:e.streaming}}function Ua(e,t){let o=e.entries.at(-1);if(o?.role==="assistant"&&t.role==="assistant"){e.entries[e.entries.length-1]={...t,ids:[...new Set([...o.ids,...t.ids])]};return}e.entries.push(t)}function Uu(){let e=[];for(let t of Go()){let o=Gu(t),n=Nu(t),r=e.at(-1);r?.key===n?Ua(r,o):e.push({key:n,entries:[o]})}return e}function Yu(){let e=[];for(let t of $(h())?.chain??[]){let o={role:t.role,summary:Yo(t),ids:[t.id],turn:null,streaming:!1},n=e.at(-1);t.role==="assistant"&&n?Ua(n,o):e.push({key:t.id,entries:[o]})}return e}var Pa=e=>e.entries.flatMap(t=>t.ids);function br(e,t){let o=new Set(Pa(e));return Pa(t).some(n=>o.has(n))}var Ne=e=>w(e.entries.find(t=>t.role==="user")?.summary??""),pr=(e,t)=>e.filter(o=>Ne(o)===t).length,Ar=e=>({...e,turn:null,streaming:!1});function Fu(e,t){let o=new Set(t.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return e.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return Ar(r);let a=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return a&&a!==n.key?Ar(r):r})}))}function Qu(e,t){let o=t.entries.map((n,r)=>{let i=e.entries[r];if(!i)return n;let a=[...new Set([...n.ids,...i.ids])];return{...n,ids:a,summary:n.summary||i.summary}});for(let n of e.entries.slice(o.length))o.push(Ar(n));return{key:e.key,entries:o}}function Ya(){let e=Et();if(!e)return!1;let t=e.clientHeight-e.scrollHeight;return e.scrollTop-t<=Math.abs(e.scrollTop)}function Ku(e,t){let o=Fu(e,t);if(!t.length)return o;if(!o.length)return t;let n=t.findIndex(l=>o.some(d=>d.key===l.key));if(n<0)return Ya()?t.concat(o):o.concat(t);let r=t[n]?.key,i=o.findIndex(l=>l.key===r),a=o.slice(0,i).concat(t.slice(0,n),o.slice(i)),c=a.findIndex(l=>l.key===r);for(let l=n;l<t.length;l++){let d=t[l];if(!d)continue;let m=a.findIndex(v=>v.key===d.key);if(m>=0){let v=a[m];v&&(a[m]=Qu(v,d)),c=m}else a.splice(c+1,0,d),c++}return a}function Wu(e,t){let o=0,n=0,r=0;for(let i=1-e.length;i<t.length;i++){let a=0,c=0;for(let d=0;d<e.length;d++){let m=t[d+i],v=e[d];!m||!v||(br(v,m)?(a+=3,c++):Ne(v)&&Ne(v)===Ne(m)&&a++)}let l=Ya()?i<r:i>r;(a>o||a===o&&c>n||a===o&&c===n&&l)&&(o=a,n=c,r=i)}return{score:o,offset:r}}function ju(e,t){let o=e.entries.map((n,r)=>{let i=t.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of t.entries.slice(o.length))o.push({...n,turn:null});return{key:e.key,entries:o}}function zu(e){return e.map(t=>({key:t.key,entries:t.entries.map(o=>({...o}))}))}function Ju(e,t){if(!t.length)return e;if(!e.length)return t;let{score:o,offset:n}=Wu(e,t),r=zu(e);if(o>0)for(let c=0;c<r.length;c++){let l=t[c+n],d=r[c];if(!l||!d)continue;let m=Ne(d),v=!!m&&m===Ne(l)&&pr(e,m)===1&&pr(t,m)===1;(br(d,l)||v)&&(r[c]=ju(d,l))}let i=[],a=[];for(let c=0;c<t.length;c++){let l=t[c];if(!l)continue;let d=Ne(l);!d||pr(r,d)>0||r.some(m=>br(m,l))||(o>0&&c<n?i.push(l):a.push(l))}return i.concat(r,a)}function Vu(){let e=h()??"";return e!==hr&&(hr=e,It=[]),It=Ju(Ku(It,Uu()),Yu()),It.flatMap(t=>t.entries).filter(Hu)}function Zu(e){for(let o of e)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!L().generating||e.some(o=>o.streaming))return;let t=e.at(-1);t&&(t.role==="assistant"||!tn.store.showAssistant?t.streaming=!0:e.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function Fa(){let e=Vu();return Zu(e),e}function Xu(e){let t=e.getBoundingClientRect(),o=t.top+t.height*Ou,n=-1;return P.forEach((r,i)=>{let a=r.turn?.el.getBoundingClientRect();a&&a.top<=o&&(n=i)}),n===-1?P.findIndex(r=>r.turn):n}function Ha(e){tn.store.jumpEffect==="border"&&(e.classList.add(k("flash")),setTimeout(()=>e.classList.remove(k("flash")),Lu))}function on(e){let t=P[e],o=Et();if(!t||!o)return;if(!t.turn&&!t.ids.length){He=e,Ot(),o.scrollTo({top:ea(o)?0:o.scrollHeight});return}He=e,ot=e?null:{chat:h(),first:t.ids[0],until:Date.now()+Ra},Ot();let n=t.turn?.el;if(n?.isConnected){let d=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:d<o.clientHeight*ku?"smooth":"auto"}),Ha(n);return}let r=P.findIndex(d=>d.turn),i=r>=0&&e<r?-1:1,a=++gr,c=Date.now()+Ra,l=()=>{let d=Et();if(a!==gr||Date.now()>c||!d)return;P=Fa();let m=P.find(K=>K.ids.some(b=>t.ids.includes(b)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),Ha(m),He=P.findIndex(K=>K.turn?.el===m),Ot();return}let v=d.scrollTop;d.scrollBy({top:i*d.clientHeight*Iu,behavior:"instant"}),d.scrollTop===v?setTimeout(l,Bu):requestAnimationFrame(l)};l()}function $u(e,t){return s("button",{class:k("row"),attrs:{type:"button","data-index":String(t)},on:{click:()=>on(t)}},s("span",{text:Du[e.role]}),s("span",{class:"bloom-truncate",text:he(e.summary||"\u2026",en)}))}function Na(e){if(!I)return;let t=e.getBoundingClientRect(),o=ye()?.getBoundingClientRect().top,r=Math.min(t.bottom,o&&o>t.top?o:t.bottom)-t.top;I.style.right=`${document.documentElement.clientWidth-t.left-e.clientLeft-e.clientWidth+Ru}px`,I.style.top=`${t.top}px`,I.style.height=r>1?`${r}px`:""}function _u(){let e=Et();if(P=Fa(),!P.length||!e){I?.remove(),I=null,$o="";return}if(Rt!==e){Bt?.abort(),Bt=new AbortController,e.addEventListener("scroll",Je(Ot),{passive:!0,signal:Bt.signal});for(let n of Pu)e.addEventListener(n,Qa,{passive:!0,signal:Bt.signal});Rt=e,De?.disconnect(),De=new ResizeObserver(()=>{e.isConnected&&Na(e)}),De.observe(e),_o=null}let t=ye();t&&t!==_o&&De&&(De.observe(t),_o=t),I??=s("div",{class:`bloom-root ${k("root")}`,attrs:{"data-bloom":"navigator"}},s("div",{class:k("rail")}),s("div",{class:k("toc")},s("div",{class:k("toc-head")}),s("div",{class:k("toc-list")}))),I.isConnected||document.body.append(I),Na(e);let o=JSON.stringify(P.map(n=>[n.role,n.ids]));o!==$o?($o=o,He=-1,td(),ot&&Date.now()<ot.until&&ot.chat===h()&&P[0]?.ids[0]!==ot.first&&on(0)):ed(),Ot()}function Ot(){if(!I||!Rt)return;Pe=He>=0?He:Xu(Rt),I.querySelectorAll(`.${k("tick")}`).forEach((t,o)=>t.classList.toggle(k("tick-current"),o===Pe)),I.querySelectorAll(`.${k("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===Pe)));let e=I.querySelector(`.${k("toc-head")}`);e&&(e.textContent=`${Pe+1} / ${P.length}`)}function ed(){I?.querySelectorAll(`.${k("tick")}`).forEach((e,t)=>{let o=P[t],n=he(o.summary,en);e.title!==n&&(e.title=n),e.classList.toggle(k("tick-streaming"),o.streaming)}),I?.querySelectorAll(`.${k("row")}`).forEach(e=>{let t=e.lastElementChild,o=he(P[Number(e.dataset.index)].summary||"\u2026",en);t&&t.textContent!==o&&(t.textContent=o)})}function td(){I?.querySelector(`.${k("rail")}`)?.replaceChildren(...P.map((e,t)=>s("button",{class:ho(k("tick"),k(`tick-${e.role}`),e.streaming&&k("tick-streaming"),t===Pe&&k("tick-current")),title:he(e.summary,en),attrs:{type:"button","aria-label":`Jump to message ${t+1}`},on:{click:()=>on(t)}}))),I?.querySelector(`.${k("toc-list")}`)?.replaceChildren(...P.map($u))}var ce=Je(_u);function Qa(){He=-1,ot=null,gr++}var od=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function Ga(e){if(!I||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||od(document.activeElement)||document.querySelector("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:Pe-1,ArrowDown:Pe+1,Home:0,End:P.length-1}[e.key];if(o==null){Qa();return}o<0||o>=P.length||(e.preventDefault(),e.stopPropagation(),on(o))}var Ka=p({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:tn,styles:Oa,start(){Da=[B(e=>H(e)&&ce()),ve(ce),Y.on("conversation",ce),y.on("rise",ce),y.on("fall",ce)],addEventListener("keydown",Ga,!0),addEventListener("resize",ce,{passive:!0}),ce()},stop(){for(let e of Da)e();Bt?.abort(),De?.disconnect(),De=void 0,Rt=null,_o=null,removeEventListener("keydown",Ga,!0),removeEventListener("resize",ce),I?.remove(),I=null,$o="",It=[],hr=""},onSettingsChange:ce});var Wa=`/*
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
`;var rd=C("bloom-cls"),id="bloom-cls",ad=600*1e3,vr=li("tab"),rt=new Map,Pt=new Map,nt=null,ja=[],sd=e=>e==="streaming"||e==="error";function ld(){let e=new Map,t=Date.now();for(let[o,n]of Pt)t-n.at>ad?Pt.delete(o):e.set(o,n.status);for(let[o,n]of rt)e.set(o,n);return e}function cd(e){return s("span",{class:`bloom-root ${rd("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&D("alert"))}function Dt(){let e=ld(),t=new Set;for(let[o,n]of e)for(let r of Lt(o)){if(!se(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let a=cd(n);t.add(a),r.append(a)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function nn(e,t){e&&(t?rt.set(e,t):rt.delete(e),nt?.postMessage({tab:vr,id:e,status:t}),Dt())}function ud({data:e}){!x(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===vr||(sd(e.status)?Pt.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):Pt.delete(e.id),Dt())}function yr(){for(let e of rt.keys())nt?.postMessage({tab:vr,id:e,status:null})}var za=p({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:Wa,start(){nt=typeof BroadcastChannel=="function"?new BroadcastChannel(id):null,nt?.addEventListener("message",ud),addEventListener("pagehide",yr),ja=[y.on("rise",({conversationId:e})=>nn(e,"streaming")),y.on("fall",({conversationId:e,outcome:t})=>nn(e,t==="error"?"error":null)),y.on("context",({prevId:e,id:t,migrated:o})=>{o&&L().generating?nn(t,"streaming"):!o&&rt.get(e??"")==="streaming"&&nn(e,null)}),B(e=>H(e)&&Dt())],h()&&Dt()},stop(){for(let e of ja)e();yr(),nt?.close(),nt=null,removeEventListener("pagehide",yr),rt.clear(),Pt.clear(),Dt()}});var Va=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],sn={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},dd={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},md="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",qr=32,ln=64,Sr="#FCFCFC",wr="#111111",fd=14,cn=51.5,pd=12.5,gd=9.75,Ja=52,hd=10.5,bd=7.75,Ad={rotate:e=>e.arc(cn,cn,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function rn(e){let t=document.createElement("canvas");t.width=t.height=qr;let o=t.getContext("2d");return o?(o.scale(qr/ln,qr/ln),e(o),t.toDataURL("image/png")):""}function an(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D(md);o&&(e.strokeStyle=wr,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function un(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function yd(e,t){un(e,cn,pd,wr),un(e,cn,gd,sn[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),Ad[t](e),e.stroke()}function vd(e,t){e.beginPath(),e.roundRect(0,0,ln,ln,fd),e.fillStyle=t,e.fill()}var qd=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function Za(e,t){switch(e){case"original":return qd(dd[t]);case"hole":return rn(o=>an(o,sn[t],!0));case"bg":return rn(o=>{vd(o,sn[t]),an(o,Sr,!1)});case"dot":return rn(o=>{an(o,Sr,!0),un(o,Ja,hd,wr),un(o,Ja,bd,sn[t])});case"badge":return rn(o=>{an(o,Sr,!0),yd(o,t)})}}var Nt="bloom-chat-state-favicon",Gt="data-bloom-rel",Cr="data-bloom-media",Xa="bloom-parked-icon",Sd="/favicon.ico",_a=g({style:{type:"select",description:"How the tab icon shows the chat state.",options:Va,default:"bg"}}),we=null,es="",dn=null,ts="",$a=new Map,Tr,xr=[],os=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${Gt}]`)];function Mr(){for(let e of os())e.id!==Nt&&(e.hasAttribute(Gt)||(ts||=e.href,e.setAttribute(Gt,e.rel),e.setAttribute(Cr,e.getAttribute("media")??"")),e.rel!==Xa&&(e.rel=Xa),e.media!=="not all"&&(e.media="not all"))}function wd(){for(let e of os()){let t=e.getAttribute(Gt);if(t==null)continue;e.rel=t;let o=e.getAttribute(Cr);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(Gt),e.removeAttribute(Cr)}}function ns(){let e=document.getElementById(Nt);return e||(e=document.createElement("link"),e.id=Nt,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function xd(e){if(e==="wait")return ts||Sd;let t=_a.store.style,o=`${t}:${e}`,n=$a.get(o);return n||$a.set(o,n=Za(t,e)),n}function Er(e){if(e)return"rotate";let t=T();return we&&t&&t!==es&&(we=null),we==="error"?"error":we==="done"?"done":t?"ready":"wait"}function Ht(e,t=!1){if(e===dn&&!t)return;dn=e;let o=ns(),n=xd(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function Ed(){Tr=new MutationObserver(()=>{Mr(),document.head.lastElementChild?.id!==Nt&&ns()}),Tr.observe(document.head,{childList:!0})}var rs=p({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"HostReady",settings:_a,start(){Mr(),Ht(Er(L().generating),!0),Ed(),xr=[y.on("rise",()=>{we=null,Ht("rotate")}),y.on("fall",({outcome:e})=>{we=e==="done"||e==="error"?e:null,es=T(),Ht(Er(!1))}),y.on("context",({migrated:e})=>{e||(we=null)}),y.on("tick",({generating:e})=>{Mr(),Ht(Er(e))})]},stop(){for(let e of xr)e();xr=[],Tr?.disconnect(),document.getElementById(Nt)?.remove(),wd(),dn=null,we=null},onSettingsChange(){Ht(dn??"wait",!0)}});var Cd={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${u.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])']},is=g({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0}}),as=p({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads and notices.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:is,styles:()=>We(Object.entries(Cd).flatMap(([e,t])=>is.store[e]?t:[]))});var it=`form:has(:is(${u.composerInput})), ${u.oldComposerForm}`,mn='[class*="ComposerLayoutBody"]',Lr='[class*="ComposerLayoutRoot"]',Td='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',Md=`:is(${it}) ${mn}, :is(${it}):not(:has(${mn})) ${Lr}, :is(${it}):not(:has(${mn})):not(:has(${Lr})) :is(${Td})`,Ld='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',kd='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',Bd="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))",ss=g({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function Id(){let{opacity:e,blur:t}=ss.store;if(e>=100)return"";let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${Bd} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important;-webkit-backdrop-filter:blur(${t}px)!important`;return`:is(${Ld}), :is(${it}){${o}}:is(${kd}){display:none!important}${Md}{${n}}:is(${it}):has(${mn}) ${Lr}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${it}) :is(${u.composerInput}){background-color:transparent!important}`}var ls=p({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:ss,styles:Id});var Od=1200,Rd=8e3,Dd=150,Pd=20,cs=6,Ir="continue where you left",Hd=/message delivery timed out|please try again/i,us=/waiting for the complete answer/i,ds=g({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:Ir,placeholder:Ir}}),kr=[],pn=0,Ut=!1,Yt=0,st="",fn="",Or=0,lt=!1,Ft=!1,gn=!0,at="",Rr=0,hn=!1,Nd=()=>ds.store.prompt.trim()||Ir;function ms(){return(W(u.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function fs(){let e=ms();return!e||us.test(e)||!Hd.test(e)?"":e}function Gd(){let e=ms();return e&&us.test(e)?e:""}function Ud(){let e=Ze()?.querySelectorAll(u.turn),t=e?.[e.length-1];return`${t?.getAttribute("data-turn-key")??""}:${t?.textContent?.length??0}`}function ps(e,t,o){if(o===pn){if(L().generating||T()!==e||t>=Pd){lt=!1,L().generating||(st="");return}Mo(),setTimeout(()=>ps(e,t+1,o),Dd)}}function Yd(e){let t=pn;if(L().generating||T()&&T()!==e){lt=!1,st="";return}te(e),hn=!0,qt(()=>{t===pn&&ps(e,0,t)})}function gs(e){return e===st||Yt>=cs||L().generating||T()?!1:(st=e,Yt+=1,lt=!0,Yd(Nd()),!0)}function Fd(){if(Ut||lt||Ft)return;let e=Date.now(),t=fs();if(t){if(at="",t!==fn){fn=t,Or=e;return}if(e-Or<Od)return;gs(`${h()??""}:${t}`);return}if(fn="",!Gd()){gn=!0,at="";return}if(!gn||!L().generating||T())return;let n=`${h()??""}:${Ud()}`;if(n!==at){at=n,Rr=e;return}if(e-Rr<Rd||Yt>=cs)return;let r=Ve();r&&(Ft=!0,r.click())}function Br(){pn+=1,Ut=!1,Yt=0,st="",fn="",Or=0,lt=!1,Ft=!1,gn=!0,at="",Rr=0,hn=!1}var hs=p({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:ds,start(){Br(),kr=[y.on("rise",()=>{Ut=!1,st="",lt=!1,hn&&(hn=!1,gn=!1,at="")}),y.on("fall",({outcome:e})=>{if(Ft){Ft=!1,e==="left"?Ut=!0:gs(`${h()??""}:stall`);return}(e==="stopped"||e==="left")&&(Ut=!0),e==="done"&&!fs()&&(Yt=0)}),y.on("context",({migrated:e})=>{e||Br()}),y.on("tick",Fd)]},stop(){for(let e of kr)e();kr=[],Br()}});var ue=C("bloom-csi-"),Qd=256,Kd=160,bn=1,bs=4,Wd=.1,jd=.0015,zd=250;function Jd(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function Vd(e){return new Promise((t,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function Zd(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:ge(t.x,n,1-n),y:ge(t.y,r,1-r)}}function As(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function Xd(e,t){let o=s("canvas");return o.width=o.height=Qd,As(o,e,t),o.toDataURL("image/png")}function ys(e){let t=null,o={x:O.store.cropX,y:O.store.cropY,zoom:O.store.cropZoom},n,r=s("canvas",{class:ue("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=Kd*devicePixelRatio;let i=s("div",{class:`bloom-muted ${ue("status")}`}),a=s("div",{class:ue("zoom")}),c=s("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(b,U=!0){t&&(o=Zd(t,b),As(r,t,o),U&&(clearTimeout(n),n=setTimeout(()=>{t&&(O.store.cropX=o.x,O.store.cropY=o.y,O.store.cropZoom=o.zoom,O.store.avatarUrl=Xd(t,o))},zd)))}function d(){a.replaceChildren(jo(o.zoom,bn,bs,Wd,"\xD7",b=>l({...o,zoom:b})))}async function m(b,U){i.textContent="";try{t=await Vd(b),U&&(O.store.avatarSource=b,o={x:.5,y:.5,zoom:bn}),e.classList.add(ue("has-image")),d(),l(o,U)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let v=b=>{b?.type.startsWith("image/")&&Jd(b).then(U=>m(U,!0))};c.addEventListener("change",()=>v(c.files?.[0])),r.addEventListener("wheel",b=>{t&&(b.preventDefault(),l({...o,zoom:ge(o.zoom*(1-b.deltaY*jd),bn,bs)}),d())},{passive:!1}),r.addEventListener("pointerdown",b=>{if(!t)return;r.setPointerCapture(b.pointerId);let U={...o},ft=r.getBoundingClientRect(),mo=fo=>{if(!t)return;let V=Math.max(ft.width/t.naturalWidth,ft.height/t.naturalHeight)*o.zoom;l({...o,x:U.x-(fo.clientX-b.clientX)/(t.naturalWidth*V),y:U.y-(fo.clientY-b.clientY)/(t.naturalHeight*V)})};r.addEventListener("pointermove",mo),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",mo),{once:!0})});let K=s("div",{class:ue("cropper"),attrs:{tabindex:"0"},on:{paste:b=>v([...b.clipboardData?.files??[]].find(U=>U.type.startsWith("image/"))),dragover:b=>b.preventDefault(),drop:b=>{b.preventDefault(),v(b.dataTransfer?.files[0])}}},s("div",{class:ue("stage")},r),s("div",{class:ue("controls")},Mt("",b=>b.trim()&&void m(b.trim(),!0),"https://\u2026 or data:image/\u2026","url"),s("div",{class:ue("buttons")},N("Choose file",()=>c.click()),N("Reset crop",()=>{l({x:.5,y:.5,zoom:bn}),d()}),N("Clear",()=>{t=null,e.classList.remove(ue("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),a.replaceChildren(),O.store.avatarUrl="",O.store.avatarSource=""},"danger")),a,i,c));return e.append(K),O.store.avatarSource&&m(O.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var vs=`/*
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
`;var Qt="data-bloom-csi-avatar",Dr="data-bloom-csi-sized",xs="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",_d=32,O=g({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>ys(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),qs=[];function Es(e){e.removeAttribute(Qt),e.removeAttribute(Dr)}function Ss(e){return(O.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function ws(e=[]){if(!H(e))return;let t=O.store.displayName.trim()||null,o=!!O.store.avatarUrl,n=new Set(t?Ss("name"):[]);for(let i of document.querySelectorAll(xs))n.has(i)||ke(i,null);for(let i of n)ke(i,t);let r=new Set(o?Ss("avatar"):[]);for(let i of document.querySelectorAll(`[${Qt}]`))r.has(i)||Es(i);for(let i of r)i.hasAttribute(Qt)||i.setAttribute(Qt,""),i.toggleAttribute(Dr,!i.closest('[role="menu"]'))}function em(){let e=O.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${O.store.avatarSize}px}:is(${u.rail}, ${u.oldRail}) [${Dr}]{--bloom-csi-size:${_d}px}`:""}var Cs=p({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:O,styles:()=>`${em()}
${vs}`,start(){qs=[ne(),B(ws)]},stop(){for(let e of qs)e();for(let e of document.querySelectorAll(`[${Qt}]`))Es(e);for(let e of document.querySelectorAll(xs))ke(e,null)},onSettingsChange(){ws()}});var ct=C("bloom-greeting-"),Ts=30,Ms=100;function Ls(e){let t=-1,o=s("textarea",{class:`bloom-input ${ct("input")}`,attrs:{maxlength:String(Ms),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=N("Add",i),r=s("div",{class:ct("list")});function i(){let l=o.value.trim().slice(0,Ms);if(!l)return;let d=[...E.store.greetings];t>=0?d[t]=l:d.length<Ts&&d.push(l),E.store.greetings=d,t=-1,o.value="",a()}function a(){let{greetings:l}=E.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&l.length>=Ts,r.replaceChildren(...l.length?l.map((d,m)=>s("div",{class:ct("row",m===t?"row-editing":"row-idle")},s("div",{class:ct("text"),text:d}),j("edit","Edit",()=>{t=m,o.value=d,o.focus(),a()}),j("trash","Delete",()=>{E.store.greetings=l.filter((v,K)=>K!==m),t===m&&(t=-1),a()}))):[s("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),e.append(s("div",{class:ct("editor")},r,s("div",{class:ct("form")},o,n))),a();let c=ze((l,d)=>l==="GreetingCustomizer"&&d==="greetings"&&a());return()=>{c(),e.replaceChildren()}}var ks=`/*
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
`;var vn="data-bloom-greeting",om=1e3,nm=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],E=g({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>Ls(e)},greetings:{type:"custom",default:nm},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),An,Bs=[],Pr,Wt=()=>Do()&&!Po(),rm=e=>e.replaceAll(/\s*\n\s*/g," ").trim(),Os=()=>E.store.greetings.filter(e=>typeof e=="string"&&e.trim());function jt(){let e=Os();if(e.length)if(E.store.order==="random"&&e.length>1){let t=E.store.lastRandom;for(;t===E.store.lastRandom;)t=Math.floor(Math.random()*e.length);E.store.lastRandom=t,E.store.index=t}else E.store.index=(E.store.index+1)%e.length}function im(){return Wt()?W(u.homeHeading):null}function yn(){for(let e of document.querySelectorAll(`[${vn}]`))e.removeAttribute(vn),ke(e,null)}function qn(){for(let e of document.querySelectorAll("[data-bloom-placeholder]"))e.removeAttribute("data-bloom-placeholder")}function Is(e){let t=Ae(),o=rm(e);if(!t||!o||T(t)){qn();return}t.getAttribute("data-bloom-placeholder")!==o&&t.setAttribute("data-bloom-placeholder",o)}function Kt(){let e=Os(),t=zi(),o=Wt();if(!e.length||!t&&!o){yn(),qn();return}if(t){yn(),Is(e[0]??"");return}let n=im();n?((E.store.index<0||E.store.index>=e.length)&&jt(),n.setAttribute(vn,""),ke(n,e[Math.max(0,E.store.index)%e.length]??"")):yn(),E.store.heroOnlyOutsideProject?qn():Is(e[Math.max(0,E.store.index)%e.length]??"")}function Hr(){clearInterval(An),An=void 0,E.store.mode==="interval"&&Wt()&&(An=setInterval(()=>{jt(),Kt()},E.store.intervalSec*om))}function am(e){E.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${vn}]`)||getSelection()?.toString()||(jt(),Kt())}function sm(){Wt()&&E.store.mode==="refresh"&&jt(),Hr(),Kt()}var Rs=p({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:E,styles:ks,start(){Pr=new AbortController,document.addEventListener("click",am,{signal:Pr.signal}),Wt()&&E.store.mode==="refresh"&&jt(),Hr(),Bs=[B(e=>H(e)&&Kt()),ve(sm)]},stop(){Pr?.abort();for(let e of Bs)e();clearInterval(An),yn(),qn()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&Hr(),Kt()}});var zt=C("bloom-history-"),Nr=10,lm=3e3;function Ds(e){let t="",o=0,n=new Set,r=s("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),i=s("div",{class:zt("list")}),a=s("div",{class:zt("pager")}),c,l=N("Clear all",()=>{if(!c){l.textContent="Click again to clear",c=setTimeout(()=>{c=void 0,l.textContent="Clear all"},lm);return}clearTimeout(c),c=void 0,l.textContent="Clear all",Jt([])},"danger");function d(){let v=[...Ge.store.entries].toReversed(),K=t.trim().toLowerCase(),b=K?v.filter(V=>V.toLowerCase().includes(K)):v,U=Math.max(1,Math.ceil(b.length/Nr));o=Math.min(o,U-1);let ft=b.slice(o*Nr,(o+1)*Nr).map(V=>s("div",{class:zt("row")},s("button",{class:zt("text",n.has(V)?"text-open":"text-closed"),text:V,title:n.has(V)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{n.delete(V)||n.add(V),d()}}}),j("copy","Copy",()=>void ci(V)),j("trash","Delete",()=>Jt(Ge.store.entries.filter(Ul=>Ul!==V)))));i.replaceChildren(...ft.length?ft:[s("div",{class:"bloom-muted",text:K?"No matching prompts.":"No saved prompts yet."})]),a.replaceChildren(s("span",{class:"bloom-muted",text:`${b.length} ${K?"matching":"saved"} \xB7 page ${o+1} of ${U}`}),N("Previous",()=>{o--,d()}),N("Next",()=>{o++,d()}),l);let[mo,fo]=a.querySelectorAll("button");mo.disabled=o===0,fo.disabled=o>=U-1,l.disabled=!v.length}r.addEventListener("input",()=>{t=r.value,o=0,d()}),e.append(s("div",{class:zt("manager")},r,i,a)),d();let m=ze((v,K)=>v==="InputHistory"&&K==="entries"&&d());return()=>{m(),clearTimeout(c),e.replaceChildren()}}var Ps=`/*
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
`;var um=C("bloom-history-"),dm=2e3,Ge=g({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>Ds(e)},entries:{type:"custom",default:[]}}),J=null,Gr={text:"",at:0},Ue=null,Ur,Sn=()=>Ge.store.entries.filter(e=>typeof e=="string");function Jt(e){Ge.store.entries=e.slice(-Ge.store.maxEntries)}function Yr(e){let t=e.trim();if(!t)return;let o=Date.now();t===Gr.text&&o-Gr.at<dm||(Gr={text:t,at:o},Jt([...Sn().filter(n=>n!==t),t]))}function mm(e,t){let o=Ae();if(!o)return;Ue??=s("div",{class:`bloom-root ${um("hud")}`,attrs:{"data-bloom":"history-hud","aria-live":"polite"}}),Ue.textContent=`${e+1} / ${t}`;let n=(o.closest("form")??o).getBoundingClientRect();Ue.style.left=`${n.left+n.width/2}px`,Ue.style.top=`${n.top}px`,Ue.isConnected||document.body.append(Ue)}function Vt(){J=null,Ue?.remove()}function fm(e){let t=Sn();if(!J)return;let o=t[e];J.index=e,J.shown=o,te(o),mm(t.length-1-e,t.length)}function pm(e){let t=Sn();if(!t.length)return!1;if(!J){if(e===1)return!1;J={index:t.length,draft:T(),shown:""}}let o=J.index+e;return o<0?!0:o>=t.length?(te(J.draft),Vt(),!0):(fm(o),!0)}function gm(e){if(e.isComposing||!St(e.target))return;let t=e.target;if(e.key==="Enter"&&!e.shiftKey){Yr(T(t)),Vt();return}if(e.key==="Escape"&&J){te(J.draft),Vt(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey)return;let o=Ri(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!J||pm(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function hm(e){J&&St(e.target)&&T(e.target)!==J.shown.trim()&&Vt()}function bm(e){e.target instanceof Element&&e.target.closest(u.sendButton)&&Yr(T())}var Hs=p({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:Ge,styles:Ps,start(){Ur=new AbortController;let{signal:e}=Ur;document.addEventListener("keydown",gm,{capture:!0,signal:e}),document.addEventListener("input",hm,{capture:!0,signal:e}),document.addEventListener("click",bm,{capture:!0,signal:e}),document.addEventListener("submit",()=>Yr(T()),{capture:!0,signal:e})},stop(){Ur?.abort(),Vt()},onSettingsChange(e){e==="maxEntries"&&Jt(Sn())}});var Ns=`/*
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
`;var ym=1500,vm=5e3,qm=2e3,ut=g({showDate:{type:"boolean",description:"Show the date for messages not sent today.",default:!0},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),xn=new Map,Ys=0,En,Gs=[];function Fs(e,t){xn.get(e)!==t&&(xn.set(e,t),clearTimeout(En),En=setTimeout(Qs,qm))}function Qs(){let e={...ut.store.stamps,...Object.fromEntries(xn)};ut.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,ym))}function Sm(e){let t=$(h())?.times;for(let o=e.length-1;o>=0;o--){let n=xn.get(e[o])??t?.get(e[o])??ut.store.stamps[e[o]];if(n)return n}return null}var wm=()=>L().generating||Date.now()-Ys<vm;function xm(e){let t=new Date(e),o=new Date,n={hour:"2-digit",minute:"2-digit"};if(!ut.store.showDate||t.toDateString()===o.toDateString())return t.toLocaleTimeString(void 0,n);let r=t.getFullYear()===o.getFullYear()?{}:{year:"numeric"};return t.toLocaleString(void 0,{...r,month:"short",day:"numeric",...n})}function Us(e){let t=No(e)??e.getAttribute("data-message-author-role")??e.closest(u.turn)?.getAttribute("data-turn")??e.querySelector(u.authorRole)?.getAttribute("data-message-author-role");if($n(t))return t;let o=xt(e).at(-1);return $(h())?.chain.find(n=>n.id===o)?.role??null}function Em(e){let t=xt(e);if(!t.length||!se(e)||e.querySelector("time:not([data-bloom])"))return;let o=Sm(t);!o&&wm()&&(o=Date.now(),Fs(t.at(-1),o));let n=e.querySelector(':scope > time[data-bloom="timestamp"]');if(!o||ut.store.hideOwnMessages&&Us(e)==="user"){n?.remove();return}let r=xm(o);if(n?.textContent===r)return;let i=s("time",{class:`bloom-timestamp bloom-timestamp-${Us(e)??"assistant"}`,text:r,title:new Date(o).toLocaleString(),attrs:{"data-bloom":"timestamp",datetime:new Date(o).toISOString()}});n?n.replaceWith(i):e.prepend(i)}var wn=Je(()=>{for(let e of _n())Em(e)}),Ks=p({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:ut,styles:Ns,start(){Gs=[B(e=>H(e)&&wn()),Y.on("conversation",wn),Y.on("message-time",({messageId:e,time:t})=>{Fs(e,t),wn()}),y.on("fall",()=>{Ys=Date.now()})]},stop(){for(let e of Gs)e();En&&(clearTimeout(En),Qs());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();wn()}}});var Cm=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])'],Tm=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],Ws=g({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),js=p({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:Ws,styles:()=>We([...Cm,...Ws.store.hideDictationSettings?Tm:[]])});var Ye="data-bloom-share",Mm=/^\/g\/g-p-/,Lm=/^(?:share|分享)$/i,km=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],Bm=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${Ye}="project"]`],Fr=g({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),Cn,Qr=!1;function Im(e){if(!H(e))return;let t=Mm.test(location.pathname)&&!h();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${Ye}]`))!t||!Lm.test(w(o.textContent??""))?o.removeAttribute(Ye):o.hasAttribute(Ye)||o.setAttribute(Ye,"project")}var zs=p({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:Fr,styles:()=>We([...Fr.store.hideShareChat?km:[],...Fr.store.hideShareProject?Bm:[]]),start(){Qr=!0,wt().then(()=>{Qr&&!Cn&&(Cn=B(Im))})},stop(){Qr=!1,Cn?.(),Cn=void 0;for(let e of document.querySelectorAll(`[${Ye}]`))e.removeAttribute(Ye)}});var Js='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',Om='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',Rm="[data-bloom-profile-plan]",Vs="visibility:hidden!important;user-select:none!important",Xs=g({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function Dm(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=Xs.store,r=[];return e&&r.push(n?`:is(${Js}){display:none!important}`:`:is(${Js}){${Vs}}`),t&&r.push(`:is(${Om}){${Vs}}`),e&&o&&r.push(`${Rm}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var Zs,$s=p({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Xs,styles:Dm,start(){Zs=ne()},stop(){Zs?.()}});var Pm="model-switcher-dropdown-button",_s=e=>e.startsWith("model-switcher-")&&e!==Pm?e.slice(15):"",Zt=(e,t)=>e.id===t.id||!!e.label&&e.label===t.label;function el(){let e=ye();return(e&&W(u.modelTrigger,e))??W(u.modelTrigger)}function re(){let e=el();if(!e)return null;let t=w(e.innerText),o=_s(e.getAttribute("data-testid")??"")||t;return o?{id:o,label:t||o}:null}function Hm(e){return[...document.querySelectorAll(u.modelItem)].find(t=>{let o=_s(t.getAttribute("data-testid")??""),n=w(t.textContent??"");return o===e.id||n===e.label||n===e.id})??null}function Tn(e){let t=re();if(t&&Zt(t,e))return!0;let o=Hm(e);if(o){o.click();let r=re();return!!r&&Zt(r,e)}let n=el();return n?.getAttribute("aria-expanded")!=="true"&&n?.click(),!1}var tl=`/*
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
`;var R=C("bloom-queue-"),Gm=6,Um=8,z=null,Xt="",dt=!1,mt=!1;function Kr(e,t,o){let n=j(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute(le),n.addEventListener("mouseenter",()=>ol(t)),n.addEventListener("mouseleave",()=>ol("")),n}function ol(e){let t=z?.querySelector(`.${R("tip")}`);t&&(t.textContent=e)}function Ym(e,t,o,n){mt=!0;let r=s("textarea",{class:`bloom-input ${R("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=new AbortController,a=c=>{i.abort(),mt=!1,Xt="",c?n.edit(t,r.value):r.replaceWith(s("div",{class:R("text"),text:o}))};addEventListener("keydown",c=>{if(!(c.target!==r||c.isComposing)){if(c.key==="Enter"&&!c.shiftKey)a(!0);else if(c.key==="Escape")a(!1);else return;c.preventDefault(),c.stopImmediatePropagation()}},{capture:!0,signal:i.signal}),r.addEventListener("keydown",c=>c.stopPropagation(),{signal:i.signal}),r.addEventListener("blur",()=>a(!0),{signal:i.signal}),e.querySelector(`.${R("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function Fm(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,a=l=>{!i&&Math.abs(l.clientY-n.clientY)<Gm||(i||(i=mt=!0,e.classList.add(R("dragging"))),e.style.transform=`translateY(${l.clientY-n.clientY}px)`)},c=l=>{if(removeEventListener("pointermove",a),!i)return;mt=!1,Xt="";let m=[...r.children].filter(v=>v!==e).filter(v=>v.getBoundingClientRect().top+v.getBoundingClientRect().height/2<l.clientY).length;o.move(t,m)};addEventListener("pointermove",a),addEventListener("pointerup",c,{once:!0})})}function Qm(e,t,o,n){let r=s("li",{class:R("row")},s("div",{class:R("text"),text:e.text}),n&&e.label?s("span",{class:R("model"),title:e.label,text:e.label}):null,s("div",{class:R("actions")},Kr("trash","Remove from queue",()=>o.remove(t)),Kr("edit","Edit",()=>Ym(r,t,e.text,o)),Kr("send","Send now",()=>o.sendNow(t))));return Fm(r,t,o),r}function Km(e){if(!z)return;let t=e.getBoundingClientRect();z.style.left=`${t.left}px`,z.style.width=`${t.width}px`,z.style.bottom=`${innerHeight-t.top+Um}px`}function Wr(){z?.remove(),z=null,Xt="",mt=!1}function xe(e,t,o=!0){let n=ye();if(!e.length||!vt(n)){Wr();return}z||(z=s("div",{class:`bloom-root ${R("tray")}`,attrs:{"data-bloom":"queue"}},s("div",{class:R("header")},s("button",{class:R("toggle"),attrs:{type:"button","aria-expanded":String(!dt)},on:{click:a=>{dt=!dt,z?.classList.toggle(R("collapsed"),dt),a.currentTarget.setAttribute("aria-expanded",String(!dt))}}},s("span",{class:R("count")}),D("chevron")),s("span",{class:R("tip")})),s("ol",{class:R("list")})),z.classList.toggle(R("collapsed"),dt),document.body.append(z)),Km(n);let r=JSON.stringify([o,...e.map(a=>[a.text,o?a.label:""])]);if(mt||r===Xt)return;Xt=r;let i=z.querySelector(`.${R("count")}`);i&&(i.textContent=po(e.length,"Queued message")),z.querySelector(`.${R("list")}`)?.replaceChildren(...e.map((a,c)=>Qm(a,c,t,o)))}var Bn=new S("PromptQueue"),Wm=8,eo=150,Ln=20,_="BloomPromptQueue",zr="BloomPromptQueueClaim",nl="BloomPromptQueueTab",jm=4e3,G=g({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1},showQueueMode:{type:"boolean",description:"Show the model that was selected when each message was queued.",default:!0},stickyOnNavigate:{type:"boolean",description:"Keep the selected model when switching chats.",default:!0},persistAcrossRefresh:{type:"boolean",description:"Restore unsent queued messages in this browser after a refresh. Other tabs show the same queue; only one of them sends it.",default:!0}}),ee=new Map,_t=!1,Qe=null,$t,rl=[],de=null,me=!1,jr,kn="draft",to=()=>h()??kn,Q=()=>ee.get(to())??[],Jr=e=>({id:e.model||e.label,label:e.label||e.model});function zm(e){return typeof e=="string"?e.trim()?{text:e,model:"",label:""}:null:!x(e)||typeof e.text!="string"||!e.text.trim()?null:{text:e.text,model:typeof e.model=="string"?e.model:"",label:typeof e.label=="string"?e.label:""}}function Vr(){let e=sessionStorage.getItem(nl);if(e)return e;let t=globalThis.crypto?.randomUUID?.()??`${Date.now()}-${Math.random()}`;return sessionStorage.setItem(nl,t),t}function al(){let e=be(localStorage.getItem(zr)??"");return!x(e)||typeof e.tab!="string"||typeof e.at!="number"||typeof e.key!="string"?null:{tab:e.tab,at:e.at,key:e.key}}function sl(){let e={tab:Vr(),at:Date.now(),key:to()};try{localStorage.setItem(zr,JSON.stringify(e))}catch(t){Bn.warn("Could not claim the queue",t)}}function Jm(){let e=al();if(e?.tab===Vr())try{localStorage.setItem(zr,JSON.stringify({...e,at:Date.now()}))}catch(t){Bn.warn("Could not refresh the queue claim",t)}}function Vm(){let e=al();return!e||e.tab===Vr()||e.key!==to()?!0:Date.now()-e.at<=jm?!1:(sl(),!0)}function Zm(){return Object.fromEntries([...ee].filter(([e])=>e!==kn))}function Mn(e){let t=typeof e=="string"?be(e):e;if(!x(t))return!1;let o=!1;for(let[n,r]of Object.entries(t)){if(!Array.isArray(r))continue;let i=r.map(zm).filter(a=>a!=null);i.length&&(ee.set(n,i),o=!0)}return o}function Xm(){if(!G.store.persistAcrossRefresh){sessionStorage.removeItem(_),Gn(_);return}if(!Mn(sessionStorage.getItem(_))){if(Mn(localStorage.getItem(_))){oo();return}Ao(_).then(e=>{ee.size||e.some(Mn)&&(oo(),xe(Q(),Fe,G.store.showQueueMode))})}}function oo(){try{if(!G.store.persistAcrossRefresh){sessionStorage.removeItem(_),Gn(_);return}let e=Zm();sessionStorage.setItem(_,JSON.stringify(e)),yo(_,e)}catch(e){Bn.warn("Could not save the queue",e)}}function $m(e){if(!(e.key!==_||!G.store.persistAcrossRefresh||e.newValue==null)){ee.clear(),Mn(e.newValue);try{sessionStorage.setItem(_,e.newValue)}catch(t){Bn.warn("Could not mirror the queue",t)}xe(Q(),Fe,G.store.showQueueMode)}}function Ke(e){e.length?ee.set(to(),e):ee.delete(to()),sl(),oo(),xe(Q(),Fe,G.store.showQueueMode)}function _m(e){if(!e.model&&!e.label)return!0;let t=re();return t?Zt(t,Jr(e)):!0}function ll(e,t=0){t>=Ln||L().generating||T()!==e||(Mo(),setTimeout(()=>ll(e,t+1),eo))}function ef(e,t){let o=G.store.stickyOnNavigate&&de?de:e;if(!o||!t.model&&!t.label||Zt(o,Jr(t))){me=!1;return}me=!0,setTimeout(()=>{Tn(o),me=!1},eo)}function no(e,t=0){if(L().generating||T()){t<Ln&&setTimeout(()=>no(e,t+1),eo);return}if(!_m(e)&&t<Ln){me=!0,Tn(Jr(e)),setTimeout(()=>no(e,t+1),eo);return}let o=re();te(e.text),qt(()=>ll(e.text)),ef(o,e)}function il(){if(Qe!=null){let o=Qe;Qe=null,no(o);return}if(!_t||L().generating||T())return;if(!Vm()){_t=!1;return}let[e,...t]=Q();e!=null&&(_t=!1,Ke(t),no(e))}function cl(e){let t=Q(),o=t[e];if(o!=null){if(Ke(t.filter((n,r)=>r!==e)),!L().generating){no(o);return}Qe=o,Ve()?.click()}}var Fe={remove:e=>Ke(Q().filter((t,o)=>o!==e)),edit:(e,t)=>Ke(t.trim()?Q().map((o,n)=>n===e?{...o,text:t}:o):Q().filter((o,n)=>n!==e)),sendNow:cl,move(e,t){let o=[...Q()],[n]=o.splice(e,1);n&&(o.splice(t,0,n),Ke(o))}};function tf(e){let t=re(),o={text:e,model:t?.id??"",label:t?.label??""},n=Q();return G.store.replacePending&&n.length?(Ke([...n.slice(0,-1),o]),!0):n.length>=Wm?!1:(Ke([...n,o]),!0)}function of(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!St(e.target)||!L().generating)return;let t=T(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;let o=re();te(""),Qe={text:t,model:o?.id??"",label:o?.label??""},Ve()?.click();return}if(!t){Q().length&&cl(0);return}tf(t)&&te("")}function nf(){if(me||!G.store.stickyOnNavigate)return;let e=re();e&&(de=e)}function rf(){if(!G.store.stickyOnNavigate||!de)return;me=!0;let e=0,t=()=>{if(!de||Tn(de)||e>=Ln){me=!1;return}e++,jr=setTimeout(t,eo)};clearTimeout(jr),t()}function af(e){let{target:t}=e;!(t instanceof Element)||me||t.closest(`${u.modelTrigger}, ${u.modelItem}`)&&setTimeout(nf,0)}var ul=p({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:G,styles:tl,start(){$t=new AbortController,Xm(),de=re(),document.addEventListener("keydown",of,{capture:!0,signal:$t.signal}),document.addEventListener("pointerup",af,{signal:$t.signal}),rl=[y.on("fall",({outcome:e})=>{_t=e==="done",e==="left"&&(Qe=null),il()}),y.on("context",({prevId:e,id:t,migrated:o})=>{let n=ee.get(kn);ee.delete(kn),o&&!e&&t&&n&&ee.set(t,n),o||(_t=!1,rf()),oo(),xe(Q(),Fe,G.store.showQueueMode)}),y.on("tick",()=>{Jm(),il(),xe(Q(),Fe,G.store.showQueueMode)})],addEventListener("storage",$m,{signal:$t.signal}),xe(Q(),Fe,G.store.showQueueMode)},stop(){$t?.abort(),clearTimeout(jr);for(let e of rl)e();Wr(),ee.clear(),Qe=null,de=null,me=!1},onSettingsChange(e){e==="persistAcrossRefresh"&&oo(),e==="stickyOnNavigate"&&G.store.stickyOnNavigate&&(de=re()),xe(Q(),Fe,G.store.showQueueMode)}});var sf=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function lf(){let e=w(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!sf.has(e.toLowerCase())?e:null}function ro(e){return e?$(e)?.title??Aa(e)??(e===h()?lf():null):null}var dl=`/*
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
`;var fe=C("bloom-recent-"),pe="home",uf=50,ml=140,df=new Set(["Backquote"]),mf=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),q=g({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),Ee=null,ie=[],ae=0,Zr,fl=[],Rn=()=>Po()?null:h()??(Do()?pe:null);function pl(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function hl(e){let t=ro(e);t&&q.store.titles[e]!==t&&(q.store.titles={...q.store.titles,[e]:t});let o=ya(location.href);o&&e===h()&&q.store.projects[e]!==o&&(q.store.projects={...q.store.projects,[e]:o})}function gl(e){if(!e)return;let t=[e,...q.store.visits.filter(n=>n!==e)].slice(0,uf),o=new Set(t);q.store.visits=t,Object.keys(q.store.previews).some(n=>!o.has(n))&&(q.store.previews=pl(q.store.previews,o)),Object.keys(q.store.titles).some(n=>!o.has(n))&&(q.store.titles=pl(q.store.titles,o)),e!==pe&&hl(e)}function In(e){if(!e||!q.store.visits.includes(e))return;let t={},o=$(e)?.chain??[];for(let r of o)t[r.role]=he(Yo(r),ml);if(e===h())for(let r of Go()){let i=Uo(r);i&&(t[r.role]=he(i,ml))}let n=q.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(q.store.previews={...q.store.previews,[e]:t})}function ff(){let e=Number(q.store.maxRecent);return q.store.visits.filter(t=>t!==pe||q.store.includeHome).slice(0,e)}function Xr(e){if(io(),e===Rn())return;let t=e===pe?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"]'):Lt(e)[0];t?t.click():location.assign(e===pe?"/":`/c/${e}`)}function pf(e,t){let o=e===pe?"New chat":q.store.titles[e]??ro(e)??"Untitled chat",n=e===pe?null:q.store.projects[e],r=e===pe?null:q.store.previews[e];return s("button",{class:fe("item"),attrs:{type:"button",role:"option","aria-selected":String(t===ae)},on:{click:()=>Xr(e),mousemove:()=>t!==ae&&On(t)}},s("div",{class:fe("head")},s("span",{class:`${fe("title")} bloom-truncate`,text:o}),n&&s("span",{class:fe("project"),text:n})),r?.user&&s("div",{class:`${fe("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&s("div",{class:`${fe("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function On(e){ae=(e+ie.length)%ie.length,Ee?.querySelectorAll(`.${fe("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===ae)))}function gf(){In(h());let e=Rn();ie=ff(),e&&(ie=[e,...ie.filter(t=>t!==e)].slice(0,Number(q.store.maxRecent))),ie.length&&(ae=ie.length>1?1:0,Ee=s("div",{class:`bloom-root ${fe("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:t=>t.target===t.currentTarget&&io()}},s("div",{class:fe("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...ie.map(pf))),document.body.append(Ee))}function io(){Ee?.remove(),Ee=null}var hf=e=>df.has(e.code)||mf.has(e.key);function bf(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&hf(e)){e.preventDefault(),e.stopPropagation(),Ee?On(ae+(e.shiftKey?-1:1)):gf();return}if(!Ee)return;let o={Escape:io,Enter:()=>Xr(ie[ae]),ArrowDown:()=>On(ae+1),ArrowUp:()=>On(ae-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function Af(e){Ee&&e.key==="Control"&&Xr(ie[ae])}var bl=p({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:q,styles:dl,start(){Zr=new AbortController;let{signal:e}=Zr;addEventListener("keydown",bf,{capture:!0,signal:e}),addEventListener("keyup",Af,{capture:!0,signal:e}),addEventListener("blur",io,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&In(h()),{signal:e}),fl=[ve(({prevId:i})=>{In(i),gl(Rn())}),Y.on("conversation",({id:i})=>{q.store.visits.includes(i)&&hl(i),In(i)})];let{visits:t,titles:o,previews:n}=q.store,r=t.filter(i=>i!==pe&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(q.store.visits=t.filter(i=>!r.includes(i))),gl(Rn())},stop(){Zr?.abort();for(let e of fl)e();io()}});var $r="data:audio/mpeg;base64,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";var Al=new S("ResponseNotification"),yf=.5,vf=200,qf=300,ao=g({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:e=>(e.append(N("Preview",Sl)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),yl=null,_r=new Map,vl,ei;function Sf(e){return new Promise((t,o)=>GM_xmlhttpRequest({url:e,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=vf&&n<qf?t(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var wf=e=>Uint8Array.from(atob(e.slice(e.indexOf(",")+1)),t=>t.charCodeAt(0)).buffer;function xf(e,t){let o=_r.get(t);return o||(o=(t.startsWith("data:")?Promise.resolve(wf(t)):Sf(t)).then(n=>e.decodeAudioData(n)),o.catch(()=>_r.delete(t)),_r.set(t,o)),o}async function ql(e){yl??=new AudioContext;let t=yl;t.state==="suspended"&&t.resume();let o=t.createBufferSource(),n=t.createGain();o.buffer=await xf(t,e),n.gain.value=yf,o.connect(n).connect(t.destination),o.start()}function Sl(){let e=ao.store.soundUrl.trim();ql(e||$r).catch(t=>{Al.warn("Sound failed",t),e&&ql($r).catch(o=>Al.warn("Default chime failed",o))})}function Ef(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function Cf(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(ei=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:ei.signal}))}var wl=p({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:ao,start(){Cf(),vl=y.on("fall",({conversationId:e,outcome:t})=>{t==="done"&&(ao.store.onlyWhenHidden&&!document.hidden||(ao.store.sound&&Sl(),ao.store.browserNotification&&Ef(ro(e))))})},stop(){vl?.(),ei?.abort()}});var Tf=`:is(${u.sidebarScroll}, :has(> ${u.sidebarScroll})) + :has(${u.menuButton})`,Mf=`${u.rail} > :has(${u.menuButton})`,oi=`:is(${Tf}, ${Mf}, ${u.oldProfile}):not(:hover)`,ti="[data-bloom-profile-avatar]",Lf=`:is(${oi}, ${oi} :has(${ti})) > :not(${ti}, :has(${ti}))`,El=g({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function kf(){let{opacity:e,fadeAvatar:t}=El.store;return e>=100?"":`${t?oi:Lf}{opacity:${e/100}!important}`}var xl,Cl=p({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:El,styles:kf,start(){xl=ne()},stop(){xl?.()}});var Tl=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

:is([data-app-action-sidebar-scroll], #stage-slideover-sidebar) :has(> button.bloom-star-chats-star) {
    position: relative;
}

button.bloom-star-chats-star {
    position: absolute;
    inset-inline-end: 0.35rem;
    top: 50%;
    z-index: 1;
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: 0.375rem;
    background: transparent;
    color: var(--bloom-fg-3);
    opacity: 0;
    transform: translateY(-50%);
    pointer-events: none;
    cursor: pointer;
}

a:hover > button.bloom-star-chats-star,
:hover > button.bloom-star-chats-star,
button.bloom-star-chats-star:focus-visible,
button.bloom-star-chats-star[aria-pressed="true"],
[data-bloom="starred"] button.bloom-star-chats-star {
    opacity: 1;
    pointer-events: auto;
}

button.bloom-star-chats-star:hover {
    background: var(--bloom-hover);
    color: var(--bloom-fg);
}

button.bloom-star-chats-star[aria-pressed="true"] {
    color: var(--bloom-accent);
}

button.bloom-star-chats-star[aria-pressed="true"] .bloom-icon {
    fill: currentcolor;
}

button.bloom-star-chats-star .bloom-icon {
    width: 0.875rem;
    height: 0.875rem;
}

.bloom-star-chats {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    margin-block-end: 0.5rem;
}

.bloom-star-chats-label {
    padding: 0.25rem 0.5rem 0.125rem;
    color: var(--bloom-fg-3);
    font-size: 0.75rem;
    font-weight: 600;
}

.bloom-star-chats-link {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    min-height: 2rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
    color: inherit;
    text-decoration: none;
}

.bloom-star-chats-link:hover {
    background: var(--bloom-hover);
}

.bloom-star-chats-link button.bloom-star-chats-star {
    position: static;
    transform: none;
}

.bloom-star-chats-title {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
`;var so=C("bloom-star-chats"),If=40,lo=g({chats:{type:"custom",default:[]}}),ni,ri=!1;function co(){let e=lo.store.chats;return Array.isArray(e)?e.filter(t=>x(t)&&typeof t.id=="string"&&typeof t.href=="string"&&typeof t.title=="string"&&!!uo(t.href)):[]}function uo(e){try{let t=new URL(e,location.origin);return t.origin!==location.origin||t.searchParams.get("temporary-chat")==="true"||!oe(t.href)?null:`${t.pathname}${t.search}`}catch{return null}}function Of(){let e=[...document.querySelectorAll(u.sidebarScroll)].filter(o=>!o.closest("[inert]"));if(e.length)return e;let t=[...document.querySelectorAll(`${u.oldSidebar} nav`)];return t.length?t:[...document.querySelectorAll(u.oldSidebar)]}function Dn(){let e=`${u.sidebarScroll} ${u.conversationLink}, ${u.oldSidebar} ${u.conversationLink}`;return[...document.querySelectorAll(e)].filter(t=>!t.closest("[data-bloom]")&&!t.closest("[inert]"))}function Ll(e){let t=e.cloneNode(!0);for(let o of t.querySelectorAll("[data-bloom]"))o.remove();return w(t.textContent??"")}function Rf(e){let t=e.parentElement,o=e.closest(u.sidebarScroll)??e.closest(u.oldSidebar);return!t||t===o?e:[...t.querySelectorAll(u.conversationLink)].filter(r=>!r.closest("[data-bloom]")).length===1?t:e}function kl(e,t){return s("button",{class:so("-star"),attrs:{type:"button","data-bloom":"chat-star","aria-pressed":String(t),"aria-label":t?"Unstar chat":"Star chat"},on:{click:n=>{n.preventDefault(),n.stopPropagation();let r=Dn().find(i=>oe(i.href)===e);r?Pf(r):lo.store.chats=co().filter(i=>i.id!==e)}}},D("star"))}function Df(e,t){e.setAttribute("aria-pressed",String(t)),e.setAttribute("aria-label",t?"Unstar chat":"Star chat")}function Pf(e){let t=oe(e.href),o=t?uo(e.href):null;if(!t||!o)return;let n=co();lo.store.chats=n.some(r=>r.id===t)?n.filter(r=>r.id!==t):[{id:t,href:o,title:Ll(e)||"Untitled chat"},...n].slice(0,If)}function Hf(e,t){if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.target instanceof Element&&e.target.closest("[data-bloom='chat-star']"))return;let o=Dn().find(n=>oe(n.href)===t);o&&(e.preventDefault(),o.click())}function Nf(){let e=!1,t=co().map(o=>{let n=Dn().find(a=>oe(a.href)===o.id);if(!n)return o;let r=Ll(n),i=uo(n.href);return!r||!i||r===o.title&&i===o.href?o:(e=!0,{...o,title:r,href:i})});e&&(lo.store.chats=t)}function Gf(){let e=new Set(co().map(t=>t.id));for(let t of Dn()){let o=oe(t.href),n=o?uo(t.href):null,r=Rf(t),i=r.querySelector(':scope > [data-bloom="chat-star"]');if(!o||!n||!se(t)){i?.remove();continue}let a=e.has(o);i?Df(i,a):r.append(kl(o,a))}}function Uf(e,t){let o=[...e.children].find(n=>n instanceof HTMLAnchorElement&&(n.getAttribute("href")==="/"||n.dataset.testid==="create-new-chat-button"));o?o.after(t):e.prepend(t)}function Yf(){let e=co(),t=new Set,o=e.map(n=>`${n.id}	${n.title}	${n.href}`).join(`
`);for(let n of Of()){if(!se(n))continue;let r=[...n.children].find(i=>i instanceof HTMLElement&&i.dataset.bloom==="starred");if(!e.length){r?.remove();continue}r||(r=s("div",{class:`bloom-root ${so("")}`,attrs:{"data-bloom":"starred"}}),Uf(n,r)),t.add(r),r.dataset.sig!==o&&(r.dataset.sig=o,r.replaceChildren(s("div",{class:so("-label"),text:"Starred"}),...e.map(i=>s("a",{class:so("-link"),attrs:{href:uo(i.href)??i.href},on:{click:a=>Hf(a,i.id)}},s("span",{class:so("-title"),text:i.title||"Untitled chat"}),kl(i.id,!0)))))}for(let n of document.querySelectorAll('[data-bloom="starred"]'))t.has(n)||n.remove()}function Ml(){if(!ri){ri=!0;try{Nf(),Yf(),Gf()}finally{ri=!1}}}function Ff(){for(let e of document.querySelectorAll('[data-bloom="chat-star"], [data-bloom="starred"]'))e.remove()}var Bl=p({name:"StarChats",description:"Star a chat in the sidebar and keep it at the top. No three-chat limit.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:lo,styles:Tl,onSettingsChange(e){e==="chats"&&Ml()},start(){ni=B(e=>H(e)&&Ml())},stop(){ni?.(),ni=void 0,Ff()}});var Qf="filter:blur(6px)!important;transition:filter 0.2s ease",Il=`:is(${u.sidebars})`,Kf={conversations:{selectors:[`${Il} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0},projects:{selectors:[`${Il} a:is([href*="/project"], [href*="/g/g-p-"])`,"[data-app-action-sidebar-project-row]",".bloom-recent-project"],hover:!0},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}},Rl=g({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function Wf(){return Object.entries(Kf).filter(([e])=>Rl.store[e]).map(([,{selectors:e,hover:t}])=>{let o=e.join(",");return`:is(${o}){${Qf}}`+(t?`:is(${o}):hover, .bloom-recent-item:hover :is(${o}){filter:none!important}`:"")}).join(`
`)}var Ol,Dl=p({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:Rl,styles:Wf,start(){Ol=ne()},stop(){Ol?.()}});var jf=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],zf=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",Jf='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',Pl=g({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function Vf(){let e=`${Pl.store.width}rem`;return`:is(${zf}){${jf.map(t=>`${t}:${e}!important`).join(";")}}:is(${Jf}){max-width:min(100%, ${e})!important}`}var Hl=p({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:Pl,styles:Vf});var Zf=[Ia,Ka,za,rs,as,ls,hs,Cs,Rs,Hs,Ks,js,zs,$s,ul,bl,wl,Cl,Bl,Dl,Hl],ii=Zf;var Xf=new S("Bloom"),Nl="2.0.56";async function ai(){Qi();for(let e of ii)e.updatedAt=aa[e.name];wi(ii),await Ai(),go("base",Li),ia(),xo("Init"),Bo().then(()=>{fi(),xo("DOMContentLoaded")}),await Wi(),xo("HostReady"),Xf.info(`Bloom++ ${Nl} ready`)}var Gl=new S("Boot");if(window===window.top){let e=Z.Bloom;e&&Gl.warn("Replacing another Bloom++ instance",e.VERSION),Object.defineProperty(Z,"Bloom",{value:si,configurable:!0,writable:!0}),ai().catch(t=>Gl.error("Startup failed",t))}})();
