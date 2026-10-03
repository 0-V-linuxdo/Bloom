// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.54
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

/* Bloom++ v2.0.54. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var vl=Object.defineProperty;var ql=(e,t)=>{for(var o in t)vl(e,o,{get:t[o],enumerable:!0})};var S=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var me=(e,t,o)=>Math.min(o,Math.max(t,e)),E=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jr=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,fe=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,x=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function oo(e,t){return`${e} ${t}${e===1?"":"s"}`}async function zr(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function ve(e){try{return JSON.parse(e)}catch{return}}var Z=typeof unsafeWindow>"u"?window:unsafeWindow;var Wr={};ql(Wr,{VERSION:()=>bl,init:()=>Kr,plugins:()=>xe});var Sl=new S("Styles"),ct=new Map,Jr=new Set,ut=new Map,xn=!0;function Vr(){let e=document.adoptedStyleSheets.filter(t=>!Jr.has(t));document.adoptedStyleSheets=[...e,...ct.values()]}function Zr(e){document.readyState==="loading"||e.parentNode===document.head||document.head.append(e)}function xl(e,t){let o=ut.get(e);o||(o=document.createElement("style"),o.id=`bloom-style-${e}`,ut.set(e,o)),o.textContent!==t&&(o.textContent=t),Zr(o)}function no(e,t){if(xn)try{let o=ct.get(e);o||(o=new Z.CSSStyleSheet,ct.set(e,o),Jr.add(o)),o.replaceSync(t),Vr();return}catch(o){Sl.warn("Constructed style sheets unavailable, using <style> after parsing",o),xn=!1,ct.delete(e)}xl(e,t)}function wn(e){ct.delete(e)&&xn&&Vr(),ut.get(e)?.remove(),ut.delete(e)}function Xr(){for(let e of ut.values())Zr(e)}var L=e=>(...t)=>t.map(o=>e+o).join(" "),ro=(...e)=>e.filter(Boolean).join(" "),Ne=e=>e.length?`${e.map(t=>`${t}:not([data-bloom])`).join(",")}{display:none!important}`:"";function p(e){return e}var io=new S("Storage"),wl="bloompp",so="kv",$r=null;function El(){return $r??=new Promise((e,t)=>{let o=indexedDB.open(wl,1);o.onupgradeneeded=()=>{o.result.objectStoreNames.contains(so)||o.result.createObjectStore(so)},o.onsuccess=()=>e(o.result),o.onerror=()=>t(o.error)}),$r}function _r(e,t){return El().then(o=>new Promise((n,r)=>{let i=t(o.transaction(so,e).objectStore(so));i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)}))}async function Cl(e){if(typeof GM_getValue=="function")try{return await GM_getValue(e)}catch(t){io.warn("GM read failed",t);return}}async function Tl(e){try{return await _r("readonly",t=>t.get(e))}catch(t){io.warn("IndexedDB read failed",t);return}}function Ml(e){try{return localStorage.getItem(e)??void 0}catch{return}}async function ei(e){return Promise.all([Cl(e),Tl(e),Ml(e)])}function ti(e,t){typeof GM_addValueChangeListener=="function"&&GM_addValueChangeListener(e,(o,n,r,i)=>{i&&t(r)}),addEventListener("storage",o=>{o.key===e&&t(o.newValue)})}function oi(e,t){let o=JSON.stringify(t);if(typeof GM_setValue=="function")try{GM_setValue(e,t)}catch{GM_setValue(e,o)}try{localStorage.setItem(e,o)}catch(n){io.warn("localStorage write failed",n)}_r("readwrite",n=>n.put(o,e)).catch(n=>io.warn("IndexedDB write failed",n))}var Ll=new S("Settings"),Cn="BloomSettings",kl=100,Bl=["GM","IndexedDB","localStorage"],Ge={plugins:{}},ao=new Set,Tn=new Set,dt;function ri(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=ve(t);return!E(t)||!E(t.plugins)||!Object.keys(t.plugins).length?null:t}var En=e=>e==null||e===""||(Array.isArray(e)?!e.length:E(e)&&!Object.keys(e).length);function Il(e){return En(e)?0:Array.isArray(e)?12+Math.min(e.length,40):E(e)?12+Math.min(Object.keys(e).length,40):3}function Ol(e){let t=0;for(let o of Object.values(e.plugins))if(E(o))for(let[n,r]of Object.entries(o))n!=="enabled"&&(t+=Il(r));return t}var ni=e=>Object.values(e.plugins).filter(t=>E(t)&&t.enabled===!0).length;function Rl(e){let t=e.map((i,s)=>i&&{candidate:i,index:s,score:Ol(i)}).filter(i=>i!=null).toSorted((i,s)=>s.score-i.score||(i.score?0:ni(s.candidate)-ni(i.candidate))||i.index-s.index);if(!t.length)return null;let[o,...n]=t,r=structuredClone(o.candidate);for(let{candidate:i}of n)for(let[s,c]of Object.entries(i.plugins)){if(!E(c))continue;let l=r.plugins[s]??={};for(let[u,m]of Object.entries(c))u==="enabled"?!("enabled"in l)&&m===!0&&(l.enabled=!0):En(l[u])&&!En(m)&&(l[u]=structuredClone(m));Object.keys(l).length||delete r.plugins[s]}return{bag:r,source:Bl[o.index]}}async function ii(){let e=await ei(Cn),t=Rl(e.map(ri));t&&(Ge.plugins=t.bag.plugins,Ll.info("Loaded settings from",t.source))}var si=(e,t)=>`${e}
${t}`;function ai(){dt=void 0,Tn.clear(),oi(Cn,Ge)}function Pl(e){let t=ri(e);if(!t)return;let o=[];for(let n of new Set([...Object.keys(Ge.plugins),...Object.keys(t.plugins)])){let r=Ge.plugins[n]??={},i=E(t.plugins[n])?t.plugins[n]:{};for(let s of new Set([...Object.keys(r),...Object.keys(i)]))Tn.has(si(n,s))||JSON.stringify(r[s])===JSON.stringify(i[s])||(i[s]===void 0?delete r[s]:r[s]=i[s],o.push([n,s]))}for(let[n,r]of o)for(let i of ao)i(n,r)}function Dl(){dt&&(clearTimeout(dt),ai())}var qe=(e,t)=>Ge.plugins[e]?.[t];function Se(e,t,o){let n=Ge.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,Tn.add(si(e,t)),clearTimeout(dt),dt=setTimeout(ai,kl);for(let r of ao)r(e,t)}function Ue(e){return ao.add(e),()=>void ao.delete(e)}function Mn(e){return e.type==="component"?void 0:e.default}function g(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>qe(t.pluginName,n)??(e[n]&&Mn(e[n])),set:(o,n,r)=>(Se(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&qe(t.pluginName,o)!==void 0&&Se(t.pluginName,o)}};return t}var li=e=>{let t=()=>{let o=qe("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();Se("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},lo=li("pinnedPlugins"),co=li("starredPlugins");addEventListener("pagehide",Dl);ti(Cn,Pl);var uo=new S("PluginManager"),xe=new Map,mt=new Set,ci=new Set,Ln=new Set;function ui(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),xe.set(t.name,t)}var ft=e=>!!e.required||(qe(e.name,"enabled")??!!e.enabledByDefault);var kn=e=>`plugin-${e.name}`;function di(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?no(kn(e),t):wn(kn(e))}function mi(e){if(!mt.has(e.name))try{di(e),e.start?.(),mt.add(e.name)}catch(t){uo.error(`Failed to start ${e.name}`,t)}}function Hl(e){if(mt.delete(e.name)){wn(kn(e));try{e.stop?.()}catch(t){uo.error(`Failed to stop ${e.name}`,t)}}}var fi=e=>e.startAt??"HostReady";function mo(e){ci.add(e);for(let t of xe.values())fi(t)===e&&ft(t)&&mi(t);uo.info(`${e}: ${[...mt].join(", ")}`)}function pi(e,t){Se(e.name,"enabled",t),t?ci.has(fi(e))&&mi(e):Hl(e);for(let o of Ln)o()}function gi(e){return Ln.add(e),()=>void Ln.delete(e)}Ue((e,t)=>{let o=xe.get(e);if(!(!o||t==="enabled"||!mt.has(e)))try{di(o),o.onSettingsChange?.(t)}catch(n){uo.error(`Settings change failed for ${e}`,n)}});var hi=`/*
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
`;var Gl=new S("Dom");function a(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var bi=document.createElement("template");function Ai(e){return bi.innerHTML=e.trim(),bi.content.firstElementChild.cloneNode(!0)}var gt=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),F=(e,t=document)=>[...t.querySelectorAll(e)].find(gt)??null,Ul=16,Yl="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function yi(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([Yl],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function ht(e){document.hidden?setTimeout(e,Ul):requestAnimationFrame(e)}function Ye(e){let t=!1;return()=>{t||(t=!0,ht(()=>{t=!1;try{e()}catch(o){Gl.error("Scheduled task failed",o)}}))}}var fo=new Set,po=[],pt,Fl=Ye(()=>{let e=po;po=[];for(let t of fo)t(e)});function R(e){return fo.add(e),pt||(pt=new MutationObserver(t=>{po.push(...t),Fl()}),pt.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{fo.delete(e),!fo.size&&(pt?.disconnect(),pt=void 0,po=[])}}var Ql=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),Q=e=>!e.length||e.some(t=>!Ql(t.target));function we(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size");return}e.getAttribute("data-bloom-text")!==t&&(e.hasAttribute("data-bloom-text")||e.style.setProperty("--bloom-text-size",getComputedStyle(e).fontSize),e.setAttribute("data-bloom-text",t))}var Kl=new S("Events");function go(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){Kl.error(`Listener for ${String(t)} failed`,r)}}}}var d={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",modelTrigger:'[data-testid="model-switcher-dropdown-button"], button[aria-label="Model selector" i]',modelItem:'[role="menu"] [data-testid^="model-switcher-"], [role="menuitem"][data-testid^="model-switcher-"]',homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]'};var vi=/[​-‍﻿]/g,pe=()=>F(d.composerInput),bt=e=>e instanceof HTMLElement&&e.matches(d.composerInput),Ee=(e=pe())=>e?.closest("form")??document.querySelector(d.oldComposerForm);function C(e=pe()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(vi,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(vi,"").trim()}var Wl=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function _(e,t=pe()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return Wl?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function qi(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:s,value:c}=e;return{first:!c.slice(0,i).includes(`
`),last:!c.slice(s).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var Si=e=>{let t=Ee();return(t&&F(e,t))??F(e)},Fe=()=>Si(d.stopButton),jl=()=>{let e=Si(d.sendButton);return e&&!e.matches(d.stopButton)?e:null};function ho(){let e=jl();if(e){e.disabled||e.click();return}pe()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var xi=()=>gt(Fe());var Ci=new S("Network"),zl=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,Jl=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,Ao=1e3,Vl=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),G=go(),Bn=new Map,wi=new Map,Zl=1,$=e=>e?Bn.get(e)??null:null;function bo(e){let t=Bn.get(e);return t||Bn.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var Ti=e=>e==="user"||e==="assistant";function Mi(e){let t=e.author?.role;if(!e.id||!Ti(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(l=>typeof l=="string").join(`
`).trim(),i=n.filter(l=>E(l)&&l.content_type==="image_asset_pointer").length,s=e.metadata?.attachments,c=Array.isArray(s)&&s.length>0;return!r&&!i&&!c?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*Ao:null,text:r,hasFiles:c,imageCount:i}}var Li=e=>e.filter((t,o)=>t.role==="user"||e[o+1]?.role!=="assistant"),In=e=>e.map(t=>t.createTime).filter(t=>t!=null);function Xl(e,t){let o=In(e),n=In(t);return!o.length||!n.length?!1:Math.max(...o)<Math.min(...n)}function $l(e){let t=In(e);if(t.length<2)return e;let[o]=t,n=o-e.length;return e.map((i,s)=>(i.createTime!=null&&(n=i.createTime),{message:i,index:s,time:i.createTime??n})).toSorted((i,s)=>i.time-s.time||i.index-s.index).map(i=>i.message)}function _l(e,t){let o=t.filter(E).map(c=>E(c.message)?c.message:c);for(let c of o)c.id&&c.create_time&&e.times.set(c.id,c.create_time*Ao);let n=o.map(Mi).filter(c=>c!=null),r=new Set(n.map(c=>c.id)),i=e.chain.filter(c=>!r.has(c.id)),s=Xl(n,i)?[...n,...i]:[...i,...n];return e.chain=Li($l(s)),e}function ec(e,t){if(!E(t)||!(E(t.mapping)||Array.isArray(t.messages)))return null;let o=bo(e);if(typeof t.title=="string"&&t.title&&(o.title=t.title),Array.isArray(t.messages))return _l(o,t.messages);let n=t.mapping;for(let c of Object.values(n)){let l=c.message?.create_time;c.message?.id&&l&&o.times.set(c.message.id,l*Ao)}let r=[],i=new Set,s=typeof t.current_node=="string"?t.current_node:null;for(;s&&!i.has(s)&&n[s];){i.add(s);let c=n[s].message,l=c?Mi(c):null;l&&r.push(l),s=n[s].parent??null}return r.length&&(o.chain=Li(r.toReversed())),o}function tc(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}function oc(e){if(typeof e?.body!="string")return null;let t=ve(e.body);return E(t)&&typeof t.conversation_id=="string"?t.conversation_id:null}function nc(e,t){if(!E(e))return;typeof e.type=="string"&&Vl.has(e.type)&&(t.handoff=!0);let o=E(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(bo(e.conversation_id).title=e.title,G.emit("conversation",bo(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&Ti(n.author?.role)){let r=n.create_time*Ao;t.conversationId&&bo(t.conversationId).times.set(n.id,r),G.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function rc(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:s}=await o.read();if(i)break;r+=n.decode(s,{stream:!0});let c=r.split(`
`);r=c.pop()??"";for(let l of c){if(!l.startsWith("data:"))continue;let u=l.slice(5).trim();u&&u!=="[DONE]"&&nc(ve(u),t)}}}async function ic(e,t,o){let n={conversationId:t,error:!1,handoff:!1};wi.set(e,t),G.emit("generate-start",{requestId:e,conversationId:t});try{let r=await o;r.ok?r.headers.get("content-type")?.includes("event-stream")&&await rc(r.clone(),n):n.error=!0}catch(r){let i=r instanceof DOMException&&r.name==="AbortError";n.handoff||=i,n.error||=!i}finally{wi.delete(e),G.emit("generate-end",{requestId:e,...n})}}async function sc(e,t){try{let o=await t;if(!o.ok)return;let n=ec(e,await o.clone().json());n&&G.emit("conversation",n)}catch(o){Ci.debug("Conversation read skipped",o)}}function ac(e,t,o){let n=tc(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&zl.test(n.pathname)){ic(Zl++,oc(t),o);return}let i=r==="GET"&&n.pathname.match(Jl)?.[1];i&&sc(i,o)}var Ei=!1;function ki(){if(Ei)return;Ei=!0;let e=Z.fetch,t=function(o,n){let r=e.call(this??Z,o,n);try{ac(o,n,r)}catch(i){Ci.error("Fetch tap failed",i)}return r};Z.fetch=typeof exportFunction=="function"?exportFunction(t,Z):t}var lc="__reactContainer$",Bi="__reactFiber$";function yo(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var On=(e,t)=>Object.keys(e.wrappedJSObject??e).some(o=>o.startsWith(t)),Qe=e=>!On(document,lc)||On(e,Bi);function At(){return document.body?Promise.resolve():new Promise(e=>{let t=new MutationObserver(()=>{document.body&&(t.disconnect(),e())});t.observe(document,{childList:!0,subtree:!0})})}async function Ii(){await At();let e=Date.now()+8e3;for(;!On(document.body,Bi)&&Date.now()<e;)await new Promise(t=>setTimeout(t,100))}var cc=new S("Route"),Oi=/\/c\/(?!local-)([\w-]+)/,uc=500,Dn=e=>{try{return new URL(e,location.origin).pathname.match(Oi)?.[1]??null}catch{return null}},h=()=>location.pathname.match(Oi)?.[1]??null,xo=()=>location.pathname==="/",dc=/^\/g\/g-p-[^/]+(?:\/project)?\/?$/,Ri=()=>dc.test(location.pathname),wo=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",qo=new Set,So=location.href,Pn=h(),vo;function Rn(){if(location.href===So)return;let e={prevHref:So,href:location.href,prevId:Pn,id:h()};So=e.href,Pn=e.id;for(let t of qo)try{t(e)}catch(o){cc.error("Route listener failed",o)}}function mc(){let e=new AbortController,{navigation:t}=Z;t?.addEventListener("currententrychange",()=>queueMicrotask(Rn),{signal:e.signal}),addEventListener("popstate",Rn,{signal:e.signal});let o=setInterval(Rn,uc);return()=>{e.abort(),clearInterval(o)}}function ge(e){return qo.add(e),vo||(So=location.href,Pn=h(),vo=mc()),()=>{qo.delete(e),!qo.size&&(vo?.(),vo=void 0)}}var fc=["data-turn","data-message-author-role"],pc=/:(user|assistant)$/,Hn=`${d.messageUnit}, ${d.oldMessage}`,Nn=e=>e==="user"||e==="assistant",Ni=()=>!!document.querySelector(d.timelineScroll),Ke=()=>Ni()?F(d.timelineScroll):document;function vt(){if(Ni())return F(d.timelineScroll);let e=document.querySelector(d.turn);for(let t=e?.parentElement;t;t=t.parentElement){let{overflowY:o}=getComputedStyle(t);if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight)return t}return document.scrollingElement}var Co=e=>e.getAttribute("data-chatgpt-search-unit-key")?.match(pc)?.[1]??null,Gi=e=>[...e.querySelectorAll(d.searchUnit)].filter(t=>Co(t)&&!t.parentElement?.closest(d.searchUnit)),Pi=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function yt(e){let t=Pi(e);return t.length?t:[...new Set([...e.querySelectorAll(Hn)].flatMap(Pi))]}function Gn(e=Ke()){if(!e)return[];let t=Gi(e);return t.length?t:[...e.querySelectorAll(Hn)].filter(o=>!o.parentElement?.closest(Hn))}function gc(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function hc(e){for(let t of fc){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(Nn(o))return o}return e.querySelector(d.markdown)||e.querySelector(d.generatedImage)?"assistant":null}var bc=e=>!e.parentElement?.closest(d.turn);function To(){let e=$(h())?.chain??[];return[...Ke()?.querySelectorAll(d.turn)??[]].filter(bc).flatMap(o=>{let n=Gi(o),r=n.length?n.map(i=>({el:i,known:Co(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=u=>!n.some(m=>m.contains(u))&&x(u.textContent??""),s=[...o.querySelectorAll(d.assistantMarkdown)].find(u=>i(u)&&!Eo.test(x(u.textContent??""))),c=[...o.querySelectorAll(d.activityHeader)].findLast(i),l=s??c;l&&r.push({el:l,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?yt(o):Gn(o).flatMap(yt),s=n??hc(o)??gc(i,e)??(r%2?"assistant":"user"),c=o.closest(d.turn)??o,l=!o.closest(d.searchUnit)&&!!c.querySelector(d.turnBusy),u=s==="assistant"&&(o.matches(d.turnBusy)||!!o.querySelector(d.turnBusy)||l);return{el:o,role:s,messageIds:i,streaming:u}})}var Ac="[data-bloom], .sr-only",Ui=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,Eo=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,Di=new WeakMap;function Mo(e){let o=(e.el.closest(d.turn)??e.el).textContent?.length??0,n=Di.get(e.el);if(n?.length===o)return n.summary;let r=yc(e);return Di.set(e.el,{length:o,summary:r}),r}function Hi(e){let t=new Set,o=[];for(let n of e.querySelectorAll(d.assistantMarkdown)){if(n.closest(d.searchUnit))continue;let r=x(n.textContent??"");!r||Eo.test(r)||Ui.test(r)||t.has(r)||(t.add(r),o.push(r))}return o}function yc(e){let t=e.el.querySelectorAll(d.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.closest(d.turn);if(e.role==="assistant"&&o&&e.el.matches(d.assistantMarkdown)&&!e.el.closest(d.searchUnit)){let l=Hi(o);if(l.length)return l.join(" \xB7 ")}let n=e.el.querySelector(e.role==="assistant"?d.markdown:".whitespace-pre-wrap")??e.el,i=[...n.querySelectorAll(Ac)].map(l=>x(l.textContent??"")).filter(Boolean).reduce((l,u)=>l.replace(u,`
`),n.innerText||n.textContent||""),s=i.split(`
`).map(x).filter(l=>l&&!Ui.test(l)&&!Eo.test(l));if(s.length)return s.join(" ");if(e.role==="assistant"&&o){let l=Hi(o);if(l.length)return l.join(" \xB7 ")}let c=i.split(`
`).map(x).filter(l=>Eo.test(l));return c.length?c.at(-1)??"":e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function Lo(e){return e.text?x(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var Yi=e=>e.matches(d.timelineScroll)&&getComputedStyle(e).flexDirection==="column-reverse";var vc=250,qc=400,Sc=6e4,xc=5e3,wc=`:is(${d.turn}) :is(${d.turnBusy})`,y=go(),Io=new Set,Un=new Set,he=!1,Qi=0,We=null,je=!1,ko=!1,qt=0,Oo=!1,St=null,Fi=!1,T=()=>({generating:he,conversationId:h()}),Ki=()=>xi()||!!Ke()?.querySelector(wc);function Ec(){let e=Ki();return e?ko||(qt=0,Oo=!0):ko=!1,[...Io].some(t=>!Un.has(t))||e&&!ko||Date.now()<qt}function Cc(){return St?.error?"error":je?"stopped":"done"}function Tc(){We=null,he=!1,Oo=!1,y.emit("fall",{conversationId:h(),outcome:Cc()}),je=!1,St=null}function Wi(){let e=Ec();e&&!he&&(he=!0,Qi=Date.now(),je=!1,St=null,y.emit("rise",{conversationId:h()})),e||!he?We=null:We==null?We=Date.now():Date.now()-We>=qc&&Tc()}function Bo(){Wi(),y.emit("tick",T())}function Mc({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(he||Date.now()-Qi<Sc);if(!o&&he){for(let n of Io)Un.add(n);ko=Ki(),qt=0,Oo=!1,We=null,he=!1,je=!1,St=null,y.emit("fall",{conversationId:e,outcome:"left"})}y.emit("context",{prevId:e,id:t,migrated:o}),Bo()}function Lc(e){e.target instanceof Element&&e.target.closest(d.stopButton)&&(je=!0,qt=0)}function ji(){Fi||(Fi=!0,G.on("generate-start",({requestId:e})=>{Io.add(e),Bo()}),G.on("generate-end",e=>{Io.delete(e.requestId),!Un.delete(e.requestId)&&(St=e,qt=e.handoff&&!e.error&&!je&&!Oo?Date.now()+xc:0,Bo())}),ge(Mc),document.addEventListener("click",Lc,!0),yi(Bo,vc),yo().then(()=>R(Wi)))}var zi={BetterNavigator:1791037311e3,ChatListStatus:1791034734e3,ChatStateFavicons:1791034734e3,Cleaner:1791034734e3,ComposerOpacity:1791037311e3,Continue:1791034734e3,CustomSidebarIdentity:1791034734e3,GreetingCustomizer:1791037311e3,InputHistory:1791034734e3,MessageTimestamps:1791034734e3,NoDictation:1791034734e3,NoShareLink:1791034734e3,NoSidebarIdentity:1791034734e3,PromptQueue:1791037311e3,RecentTopics:1791034734e3,ResponseNotification:1791034734e3,Settings:1791034734e3,SidebarIdentityOpacity:1791034734e3,StreamerMode:1791034734e3,WiderChat:1791034734e3};var A=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,kc="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",Bc={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${kc}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:A('<path d="M18 6 6 18M6 6l12 12"/>'),gear:A('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:A('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:A('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:A('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:A('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:A('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:A('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:A('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:A('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:A('<path d="m6 9 6 6 6-6"/>'),play:A('<path d="M7 4v16l13-8z"/>'),plus:A('<path d="M12 5v14M5 12h14"/>'),check:A('<path d="m5 12 5 5 9-10"/>'),alert:A('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:A('<path d="M4 5h16v11H9l-5 4z"/>'),layout:A('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:A('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:A('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:A('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:A('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:A('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:A('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:A('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:A('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:A('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:A('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:A('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:A('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:A('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:A('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),grip:A('<path d="M9 6h0M15 6h0M9 12h0M15 12h0M9 18h0M15 18h0"/>')},D=e=>Ai(Bc[e]);var re="data-bloom-tip",Yn=6,Fn=8,Ce,Ji=null;function ze(e){if(e===Ji)return;if(Ji=e,!e){Ce?.remove();return}Ce??=a("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),Ce.textContent=e.getAttribute(re),document.body.append(Ce);let t=e.getBoundingClientRect(),{width:o,height:n}=Ce.getBoundingClientRect(),r=t.bottom+Yn+n<=innerHeight-Fn;Ce.style.left=`${me(t.left+t.width/2-o/2,Fn,innerWidth-o-Fn)}px`,Ce.style.top=`${r?t.bottom+Yn:t.top-Yn-n}px`}var Vi=e=>e instanceof Element?e.closest(`[${re}]`):null;function Zi(){let e=new AbortController,t={passive:!0,signal:e.signal};return document.addEventListener("pointerover",o=>ze(Vi(o.target)),t),document.addEventListener("pointerout",o=>o.relatedTarget||ze(null),t),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&ze(Vi(o.target)),t),document.addEventListener("focusout",()=>ze(null),t),document.addEventListener("pointerdown",()=>ze(null),t),()=>{e.abort(),ze(null)}}function Qn(e,t,o,n=!1){let r=a("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let s=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(s)),t(s)}),r}function H(e,t,o){return a("button",{class:ro("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button","data-bloom":"control"},on:{click:t}})}function K(e,t,o,n){let r=a("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":t,"data-bloom":"control",[re]:t},on:{click:o}},D(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function Ro(e,t,o,n,r,i){let s=a("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});s.value=String(e);let c=a("output",{text:`${s.value}${r}`});return s.addEventListener("input",()=>{c.textContent=`${s.value}${r}`,i(Number(s.value))}),a("div",{class:"bloom-slider"},s,c)}function Kn(e,t,o){let n=a("select",{class:"bloom-select"},...t.map(r=>a("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function xt(e,t,o="",n="text"){let r=a("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var Ic=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,Xi=/\S+@\S+\.\S+/,Oc=3,Rc=/^\/g\/(g-p-[^/]+)\//,Pc=/^g-p-[0-9a-f]+-?/i,$i=e=>!!e.closest(".sr-only"),Wn=e=>!!e?.querySelector(d.menuButton);function _i(){return[...document.querySelectorAll(d.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(Wn)).filter(e=>e!=null)}function es(){let e=[...document.querySelectorAll(d.oldProfile)];if(e.length)return e.map(o=>{let n=o.parentElement?.children.length===1?o.parentElement:o;return{kind:"profile",anchor:n,insert:r=>n.before(r)}});let t=_i().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(d.rail)){let n=[...o.children].find(Wn);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}var jn=e=>!e.closest("[data-bloom]")&&(!!e.querySelector("img, [class*=rounded-full]")||rs(e).some(t=>!$i(t))),ts=e=>[...e.parentElement?.children??[]].find(t=>t!==e&&t instanceof HTMLElement&&jn(t))??null;function os(){let e=[...document.querySelectorAll(d.oldProfile)];return e.length?e:[..._i(),...[...document.querySelectorAll(d.rail)].map(o=>[...o.children].findLast(Wn))].map(o=>[...o?.querySelectorAll(d.menuButton)??[]].findLast(n=>jn(n)||ts(n))).filter(o=>o!=null)}var ns=()=>os().map(e=>jn(e)?e:ts(e)).filter(e=>e!=null);function rs(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!x(t.textContent??"")&&!(t instanceof SVGElement))}var Dc=e=>{if(/rounded-full/.test(e.getAttribute("class")??""))return!0;if(!e.clientWidth)return!1;let{borderRadius:t}=getComputedStyle(e);return t.includes("%")||Number.parseFloat(t)>=e.clientWidth/2};function Po(e,t,o){for(let n of e.querySelectorAll(`[${t}]`))n!==o&&n.removeAttribute(t);o&&!o.hasAttribute(t)&&o.setAttribute(t,"")}function Hc(e,t){if(x(e.textContent??"").length>Oc)return null;let o=e.closest("button");for(let n=e;n&&n!==t&&n!==o;n=n.parentElement)if(Dc(n))return n;return null}function zn(e,t){e.hasAttribute(`data-bloom-${t}`)||e.setAttribute(`data-bloom-${t}`,"");let o=e.querySelector("img:not([data-bloom] img)"),n=rs(e),r=o?null:n.map(m=>Hc(m,e)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),s=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");Po(e,`data-bloom-${t}-avatar`,s);let c=n.filter(m=>!s?.contains(m)&&!$i(m)),l=c.find(m=>Ic.test(x(m.textContent??""))),u=c.find(m=>Xi.test(m.textContent??""));Po(e,`data-bloom-${t}-plan`,l),Po(e,`data-bloom-${t}-email`,u),Po(e,`data-bloom-${t}-name`,c.find(m=>m!==l&&m!==u))}function Nc(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function Do(){return os().map(Nc).find(e=>e!=null)??[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&(Xi.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var wt=e=>[...document.querySelectorAll(d.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&Dn(t.href)===e);function is(e){let t=wt(e).find(o=>x(o.textContent??""));return t?x(t.textContent??""):null}function ss(e){let t=new URL(e,location.origin).pathname.match(Rc)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!Dn(n.href)&&x(n.textContent??""));return o?x(o.textContent??""):t.replace(Pc,"").replaceAll("-"," ")||null}var Jn=0,Ho;function Gc(e){if(!Q(e))return;for(let o of ns())zn(o,"profile");let t=Do();t&&zn(t,"menu")}function ee(){Jn++;let e=!0;return At().then(()=>{e&&Jn&&!Ho&&(Ho=R(Gc))}),()=>{e&&(e=!1,!--Jn&&(Ho?.(),Ho=void 0))}}var Uc=new S("SettingsPanel"),f=L("bloom-settings-"),Yc=10080*60*1e3,Fc=3e3,as="Toggle features. Some need a reload. Click the sliders icon to configure.",Qc=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Kc=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],Wc={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},cs=new Set(["chat","ui","privacy"]),U=null,Me="all",Vn="all",No="",Zn=[],us=()=>[...xe.values()].filter(e=>!e.hidden),jc=e=>!!e.updatedAt&&Date.now()-e.updatedAt<Yc;function zc(e){switch(Me){case"favorites":return co.has(e.name);case"recent":return jc(e);case"all":return!0;case"other":return!e.tags.some(t=>cs.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(Me)}}function Jc(e){switch(Vn){case"all":return!0;case"enabled":return ft(e);case"disabled":return!ft(e)}}function Vc(e){let t=No.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function Zc(e){let t=lo.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return Me==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var ds=e=>e.settings?.def??{},Xc=e=>Object.values(ds(e)).some(t=>t.type!=="custom");function $c(e,t,o){let n=qe(e.name,t)??Mn(o),r=i=>Se(e.name,t,i);switch(o.type){case"boolean":return Qn(n,r,o.description??t);case"slider":return Ro(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return Kn(n,o.options,r);case"string":return xt(n,r,o.placeholder);case"number":return xt(String(n),i=>r(Number(i)),"","number");case"component":{let i=a("div",{class:f("component")});return Zn.push(o.render(i)),i}case"custom":return null}}var _c=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function ms(e){if(!U)return;let t=Object.entries(ds(e)).filter(([,i])=>i.type!=="custom").map(([i,s])=>{let c=$c(e,i,s),l=s.type==="boolean",u=s.type!=="component"&&a("div",{class:f("field-label"),text:_c(i)}),m=s.description&&a("div",{class:f("field-desc"),text:s.description});return a("div",{class:f("field",l?"field-inline":"field-stacked")},(u||m)&&a("div",{class:f("field-text")},u,m),c)}),o,n=H("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},Fc);return}clearTimeout(o),e.settings?.reset(),Et(),ms(e)},"danger"),r=a("div",{class:f("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&Et()}},a("div",{class:f("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},a("div",{class:f("popup-header")},a("div",{class:f("card-icon")},D(e.icon)),a("div",{class:f("popup-title")},a("div",{class:f("card-name"),text:e.name}),a("div",{class:f("popup-authors"),text:e.authors.join(", ")})),K("close","Close",Et)),a("p",{class:f("popup-desc"),text:e.description}),a("div",{class:f("fields")},...t),a("div",{class:f("popup-footer")},n)));U.querySelector(`.${f("modal")}`)?.append(r)}function Et(){for(let e of Zn)e();Zn=[],U?.querySelector(`.${f("popup-backdrop")}`)?.remove()}function ls(e){let t=ft(e),o=co.has(e.name),n=lo.has(e.name),r=!!e.required;return a("div",{class:[f("card",t?"card-on":"card-off"),r?f("card-required"):""].filter(Boolean).join(" ")},a("div",{class:f("card-top")},a("div",{class:f("card-icon")},D(e.icon)),a("div",{class:f("card-actions")},K("star",o?"Unstar":"Star",()=>{co.toggle(e.name),Te()},o),r?null:K("pin",n?"Unpin":"Pin to top",()=>{lo.toggle(e.name),Te()},n),r?a("span",{class:f("required-mark"),attrs:{"aria-label":"Required",[re]:"This plugin is required for Bloom++ to work"}},D("alert")):null,Xc(e)&&K("gear","Settings",()=>ms(e)),Qn(t,i=>pi(e,i),r?`${e.name} is required`:`Enable ${e.name}`,r))),a("div",{class:f("card-name"),text:e.name}),a("div",{class:f("card-desc"),text:e.description,title:e.description}),a("div",{class:f("card-footer"),text:e.authors.join(", ")}))}function fs(){let e=us().some(o=>!o.tags.some(n=>cs.has(n)));U?.querySelector(`.${f("tabs")}`)?.replaceChildren(...Qc.filter(o=>o.id!=="other"||e).map(o=>a("button",{class:f("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===Me)},on:{click:()=>{Me=o.id,fs(),Te()}}})))}function Te(){if(!U)return;let e=us().filter(zc),t=U.querySelector(`.${f("search")} input`);t&&(t.placeholder=`Search ${oo(e.length,"plugin")}...`);let o=Zc(e.filter(u=>Vc(u)&&Jc(u))),n=Me==="all",r=n?o.filter(u=>!u.required):o,i=n?o.filter(u=>u.required):[],s=[...r.map(ls),...i.length?[a("div",{class:f("required-break"),attrs:{role:"separator"}}),...i.map(ls)]:[]],c=No.trim()?"No plugins match your search.":Wc[Me]??"No plugins available.";U.querySelector(`.${f("grid")}`)?.replaceChildren(...s.length?s:[a("div",{class:f("empty"),text:c})])}function eu(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),U?.querySelector(`.${f("popup-backdrop")}`)?Et():Je())}var ps,Xn;function tu(){if(U)return;let e=a("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=No,e.addEventListener("input",()=>{No=e.value,Te()}),U=a("div",{class:`bloom-root ${f("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&Je()}},a("div",{class:f("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},a("div",{class:f("header")},a("div",{class:f("logo")},D("bloom")),a("h2",{class:f("title"),text:"Bloom++"}),a("span",{class:f("hint"),attrs:{"aria-label":as,tabindex:"0",[re]:as}},D("info")),a("span",{class:f("version"),text:"v2.0.54"}),K("close","Close",Je)),a("div",{class:f("tabs"),attrs:{role:"tablist"}}),a("div",{class:f("toolbar")},a("label",{class:f("search")},D("search"),e),Kn(Vn,Kc,t=>{Vn=t,Te()})),a("div",{class:f("grid")}))),U.addEventListener("keydown",t=>t.stopPropagation()),Xn=new AbortController,document.addEventListener("keydown",eu,{capture:!0,signal:Xn.signal}),document.body.append(U),fs(),Te(),ps=gi(Te),e.focus(),Uc.debug("Opened")}function Je(){Et(),Xn?.abort(),ps?.(),U?.remove(),U=null}var Go=()=>U?Je():tu();var gs=`/*
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
`;var be=L("bloom-entry-"),nu=4,$n="--bloom-entry-x",_n=1,Ve=g({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar. The account menu and the userscript menu always open the panel.",default:!1},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:!0},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:e=>(e.append(H("Reset position",()=>{Ve.store.entryPosition=_n})),()=>e.replaceChildren())},entryPosition:{type:"custom",default:_n}}),Le=new Map,hs=!1,bs=[];function ru(e,t,o){let n=e.currentTarget,r=t.clientWidth-n.offsetWidth;if(e.button!==0||r<=0||!t.classList.contains(be("hover")))return;let i=Ve.store.entryPosition,s=i,c=!1,l=new AbortController;n.setPointerCapture(e.pointerId),n.addEventListener("pointermove",m=>{!c&&Math.abs(m.clientX-e.clientX)<nu||(c=!0,o(),s=me(i+(m.clientX-e.clientX)/r,0,_n),t.style.setProperty($n,String(s)))},{signal:l.signal});let u=()=>{l.abort(),c&&(Ve.store.entryPosition=s,t.style.removeProperty($n))};n.addEventListener("pointerup",u,{signal:l.signal}),n.addEventListener("lostpointercapture",u,{signal:l.signal})}function iu(e){let t=!1,o=a("button",{class:be("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),t||Go(),t=!1},pointerdown:r=>{t=!1,e!=="rail"&&ru(r,n,()=>{t=!0})}}},D("bloom"),e!=="rail"&&a("span",{class:be("label"),text:"Bloom++"})),n=a("div",{class:`bloom-root ${be("wrap")} ${be(e)}`,attrs:{"data-bloom":"entry"}},o);return n}function su(e){let t=a("div",{class:`bloom-root ${be("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),Go()}}},D("bloom"),a("span",{text:"Bloom++"})),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function As(){let{showSidebarEntry:e,showSidebarEntryOnHover:t}=Ve.store,o=e||t?es():[];for(let[r,i]of Le)r.isConnected&&o.some(s=>s.anchor===r)||(i.remove(),Le.delete(r));for(let r of o){let i=Le.get(r.anchor);if(i?.isConnected||!Qe(r.anchor))continue;let s=i??iu(r.kind);Le.set(r.anchor,s),r.insert(s)}for(let r of Le.values())r.classList.toggle(be("hover"),!e);let n=Do();n&&!n.querySelector('[data-bloom="menu-entry"]')&&su(n)}var ys=p({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:Ve,styles:()=>`${gs}.${be("hover")}{${$n}:${Ve.store.entryPosition}}`,start(){bs=[R(As),Zi(),ee()],!hs&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",Go),hs=!0)},stop(){for(let e of bs)e();for(let e of Le.values())e.remove();Le.clear(),Je()},onSettingsChange:As});var vs=`/*
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
`;var M=L("bloom-nav-"),Yo=80,lu=1200,cu=2,qs=3e4,uu=200,du=.9,mu=.3,fu=12,pu={user:"\u2753",assistant:"\u{1F916}"},gu=["wheel","touchmove","pointerdown"],Fo=g({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),B=null,P=[],ke=-1,Be=-1,Ze=null,Uo="",tr=0,Ss=[],kt=null,Mt,Ct,or="",Tt=[],hu=e=>Fo.store.showAssistant||e.role==="user",bu=e=>e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.messageIds[0]||e.role;function Au(e){return{role:e.role,summary:Mo(e),ids:e.messageIds,turn:e,streaming:e.streaming}}function Ts(e,t){let o=e.entries.at(-1);if(o?.role==="assistant"&&t.role==="assistant"){e.entries[e.entries.length-1]={...t,ids:[...new Set([...o.ids,...t.ids])]};return}e.entries.push(t)}function yu(){let e=[];for(let t of To()){let o=Au(t),n=bu(t),r=e.at(-1);r?.key===n?Ts(r,o):e.push({key:n,entries:[o]})}return e}function vu(){let e=[];for(let t of $(h())?.chain??[]){let o={role:t.role,summary:Lo(t),ids:[t.id],turn:null,streaming:!1},n=e.at(-1);t.role==="assistant"&&n?Ts(n,o):e.push({key:t.id,entries:[o]})}return e}var xs=e=>e.entries.flatMap(t=>t.ids);function nr(e,t){let o=new Set(xs(e));return xs(t).some(n=>o.has(n))}var Ie=e=>x(e.entries.find(t=>t.role==="user")?.summary??""),er=(e,t)=>e.filter(o=>Ie(o)===t).length,rr=e=>({...e,turn:null,streaming:!1});function qu(e,t){let o=new Set(t.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return e.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return rr(r);let s=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return s&&s!==n.key?rr(r):r})}))}function Su(e,t){let o=t.entries.map((n,r)=>{let i=e.entries[r];if(!i)return n;let s=[...new Set([...n.ids,...i.ids])];return{...n,ids:s,summary:n.summary||i.summary}});for(let n of e.entries.slice(o.length))o.push(rr(n));return{key:e.key,entries:o}}function Ms(){let e=vt();if(!e)return!1;let t=e.clientHeight-e.scrollHeight;return e.scrollTop-t<=Math.abs(e.scrollTop)}function xu(e,t){let o=qu(e,t);if(!t.length)return o;if(!o.length)return t;let n=t.findIndex(l=>o.some(u=>u.key===l.key));if(n<0)return Ms()?t.concat(o):o.concat(t);let r=t[n]?.key,i=o.findIndex(l=>l.key===r),s=o.slice(0,i).concat(t.slice(0,n),o.slice(i)),c=s.findIndex(l=>l.key===r);for(let l=n;l<t.length;l++){let u=t[l];if(!u)continue;let m=s.findIndex(v=>v.key===u.key);if(m>=0){let v=s[m];v&&(s[m]=Su(v,u)),c=m}else s.splice(c+1,0,u),c++}return s}function wu(e,t){let o=0,n=0,r=0;for(let i=1-e.length;i<t.length;i++){let s=0,c=0;for(let u=0;u<e.length;u++){let m=t[u+i],v=e[u];!m||!v||(nr(v,m)?(s+=3,c++):Ie(v)&&Ie(v)===Ie(m)&&s++)}let l=Ms()?i<r:i>r;(s>o||s===o&&c>n||s===o&&c===n&&l)&&(o=s,n=c,r=i)}return{score:o,offset:r}}function Eu(e,t){let o=e.entries.map((n,r)=>{let i=t.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of t.entries.slice(o.length))o.push({...n,turn:null});return{key:e.key,entries:o}}function Cu(e){return e.map(t=>({key:t.key,entries:t.entries.map(o=>({...o}))}))}function Tu(e,t){if(!t.length)return e;if(!e.length)return t;let{score:o,offset:n}=wu(e,t),r=Cu(e);if(o>0)for(let c=0;c<r.length;c++){let l=t[c+n],u=r[c];if(!l||!u)continue;let m=Ie(u),v=!!m&&m===Ie(l)&&er(e,m)===1&&er(t,m)===1;(nr(u,l)||v)&&(r[c]=Eu(u,l))}let i=[],s=[];for(let c=0;c<t.length;c++){let l=t[c];if(!l)continue;let u=Ie(l);!u||er(r,u)>0||r.some(m=>nr(m,l))||(o>0&&c<n?i.push(l):s.push(l))}return i.concat(r,s)}function Mu(){let e=h()??"";return e!==or&&(or=e,Tt=[]),Tt=Tu(xu(Tt,yu()),vu()),Tt.flatMap(t=>t.entries).filter(hu)}function Lu(e){for(let o of e)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!T().generating||e.some(o=>o.streaming))return;let t=e.at(-1);t&&(t.role==="assistant"||!Fo.store.showAssistant?t.streaming=!0:e.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function Ls(){let e=Mu();return Lu(e),e}function ku(e){let t=e.getBoundingClientRect(),o=t.top+t.height*mu,n=-1;return P.forEach((r,i)=>{let s=r.turn?.el.getBoundingClientRect();s&&s.top<=o&&(n=i)}),n===-1?P.findIndex(r=>r.turn):n}function ws(e){Fo.store.jumpEffect==="border"&&(e.classList.add(M("flash")),setTimeout(()=>e.classList.remove(M("flash")),lu))}function Qo(e){let t=P[e],o=vt();if(!t||!o)return;if(!t.turn&&!t.ids.length){Be=e,Lt(),o.scrollTo({top:Yi(o)?0:o.scrollHeight});return}Be=e,Ze=e?null:{chat:h(),first:t.ids[0],until:Date.now()+qs},Lt();let n=t.turn?.el;if(n?.isConnected){let u=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:u<o.clientHeight*cu?"smooth":"auto"}),ws(n);return}let r=P.findIndex(u=>u.turn),i=r>=0&&e<r?-1:1,s=++tr,c=Date.now()+qs,l=()=>{let u=vt();if(s!==tr||Date.now()>c||!u)return;P=Ls();let m=P.find(Y=>Y.ids.some(b=>t.ids.includes(b)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),ws(m),Be=P.findIndex(Y=>Y.turn?.el===m),Lt();return}let v=u.scrollTop;u.scrollBy({top:i*u.clientHeight*du,behavior:"instant"}),u.scrollTop===v?setTimeout(l,uu):requestAnimationFrame(l)};l()}function Bu(e,t){return a("button",{class:M("row"),attrs:{type:"button","data-index":String(t)},on:{click:()=>Qo(t)}},a("span",{text:pu[e.role]}),a("span",{class:"bloom-truncate",text:fe(e.summary||"\u2026",Yo)}))}function Es(e){if(!B)return;let t=e.getBoundingClientRect(),o=Math.min(t.bottom,Ee()?.getBoundingClientRect().top??t.bottom);B.style.right=`${document.documentElement.clientWidth-t.left-e.clientLeft-e.clientWidth+fu}px`,B.style.top=`${(t.top+o)/2}px`}function Iu(){let e=vt();if(P=Ls(),!P.length||!e){B?.remove(),B=null,Uo="";return}if(kt!==e){Ct?.abort(),Ct=new AbortController,e.addEventListener("scroll",Ye(Lt),{passive:!0,signal:Ct.signal});for(let o of gu)e.addEventListener(o,ks,{passive:!0,signal:Ct.signal});kt=e,Mt?.disconnect(),Mt=new ResizeObserver(()=>{e.isConnected&&Es(e)}),Mt.observe(e)}B??=a("div",{class:`bloom-root ${M("root")}`,attrs:{"data-bloom":"navigator"}},a("div",{class:M("rail")}),a("div",{class:M("toc")},a("div",{class:M("toc-head")}),a("div",{class:M("toc-list")}))),B.isConnected||document.body.append(B),Es(e);let t=JSON.stringify(P.map(o=>[o.role,o.ids]));t!==Uo?(Uo=t,Be=-1,Ru(),Ze&&Date.now()<Ze.until&&Ze.chat===h()&&P[0]?.ids[0]!==Ze.first&&Qo(0)):Ou(),Lt()}function Lt(){if(!B||!kt)return;ke=Be>=0?Be:ku(kt),B.querySelectorAll(`.${M("tick")}`).forEach((t,o)=>t.classList.toggle(M("tick-current"),o===ke)),B.querySelectorAll(`.${M("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===ke)));let e=B.querySelector(`.${M("toc-head")}`);e&&(e.textContent=`${ke+1} / ${P.length}`)}function Ou(){B?.querySelectorAll(`.${M("tick")}`).forEach((e,t)=>{let o=P[t],n=fe(o.summary,Yo);e.title!==n&&(e.title=n),e.classList.toggle(M("tick-streaming"),o.streaming)}),B?.querySelectorAll(`.${M("row")}`).forEach(e=>{let t=e.lastElementChild,o=fe(P[Number(e.dataset.index)].summary||"\u2026",Yo);t&&t.textContent!==o&&(t.textContent=o)})}function Ru(){B?.querySelector(`.${M("rail")}`)?.replaceChildren(...P.map((e,t)=>a("button",{class:ro(M("tick"),M(`tick-${e.role}`),e.streaming&&M("tick-streaming"),t===ke&&M("tick-current")),title:fe(e.summary,Yo),attrs:{type:"button","aria-label":`Jump to message ${t+1}`},on:{click:()=>Qo(t)}}))),B?.querySelector(`.${M("toc-list")}`)?.replaceChildren(...P.map(Bu))}var ie=Ye(Iu);function ks(){Be=-1,Ze=null,tr++}var Pu=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function Cs(e){if(!B||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||Pu(document.activeElement)||document.querySelector("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:ke-1,ArrowDown:ke+1,Home:0,End:P.length-1}[e.key];if(o==null){ks();return}o<0||o>=P.length||(e.preventDefault(),e.stopPropagation(),Qo(o))}var Bs=p({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:Fo,styles:vs,start(){Ss=[R(e=>Q(e)&&ie()),ge(ie),G.on("conversation",ie),y.on("rise",ie),y.on("fall",ie)],addEventListener("keydown",Cs,!0),addEventListener("resize",ie,{passive:!0}),ie()},stop(){for(let e of Ss)e();Ct?.abort(),Mt?.disconnect(),Mt=void 0,kt=null,removeEventListener("keydown",Cs,!0),removeEventListener("resize",ie),B?.remove(),B=null,Uo="",Tt=[],or=""},onSettingsChange:ie});var Is=`/*
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
`;var Hu=L("bloom-cls"),Nu="bloom-cls",Gu=600*1e3,sr=jr("tab"),$e=new Map,It=new Map,Xe=null,Os=[],Uu=e=>e==="streaming"||e==="error";function Yu(){let e=new Map,t=Date.now();for(let[o,n]of It)t-n.at>Gu?It.delete(o):e.set(o,n.status);for(let[o,n]of $e)e.set(o,n);return e}function Fu(e){return a("span",{class:`bloom-root ${Hu("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&D("alert"))}function Bt(){let e=Yu(),t=new Set;for(let[o,n]of e)for(let r of wt(o)){if(!Qe(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let s=Fu(n);t.add(s),r.append(s)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function Ko(e,t){e&&(t?$e.set(e,t):$e.delete(e),Xe?.postMessage({tab:sr,id:e,status:t}),Bt())}function Qu({data:e}){!E(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===sr||(Uu(e.status)?It.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):It.delete(e.id),Bt())}function ir(){for(let e of $e.keys())Xe?.postMessage({tab:sr,id:e,status:null})}var Rs=p({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:Is,start(){Xe=typeof BroadcastChannel=="function"?new BroadcastChannel(Nu):null,Xe?.addEventListener("message",Qu),addEventListener("pagehide",ir),Os=[y.on("rise",({conversationId:e})=>Ko(e,"streaming")),y.on("fall",({conversationId:e,outcome:t})=>Ko(e,t==="error"?"error":null)),y.on("context",({prevId:e,id:t,migrated:o})=>{o&&T().generating?Ko(t,"streaming"):!o&&$e.get(e??"")==="streaming"&&Ko(e,null)}),R(e=>Q(e)&&Bt())],h()&&Bt()},stop(){for(let e of Os)e();ir(),Xe?.close(),Xe=null,removeEventListener("pagehide",ir),$e.clear(),It.clear(),Bt()}});var Ds=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],zo={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Ku={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Wu="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",ar=32,Jo=64,lr="#FCFCFC",cr="#111111",ju=14,Vo=51.5,zu=12.5,Ju=9.75,Ps=52,Vu=10.5,Zu=7.75,Xu={rotate:e=>e.arc(Vo,Vo,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function Wo(e){let t=document.createElement("canvas");t.width=t.height=ar;let o=t.getContext("2d");return o?(o.scale(ar/Jo,ar/Jo),e(o),t.toDataURL("image/png")):""}function jo(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D(Wu);o&&(e.strokeStyle=cr,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function Zo(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function $u(e,t){Zo(e,Vo,zu,cr),Zo(e,Vo,Ju,zo[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),Xu[t](e),e.stroke()}function _u(e,t){e.beginPath(),e.roundRect(0,0,Jo,Jo,ju),e.fillStyle=t,e.fill()}var ed=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function Hs(e,t){switch(e){case"original":return ed(Ku[t]);case"hole":return Wo(o=>jo(o,zo[t],!0));case"bg":return Wo(o=>{_u(o,zo[t]),jo(o,lr,!1)});case"dot":return Wo(o=>{jo(o,lr,!0),Zo(o,Ps,Vu,cr),Zo(o,Ps,Zu,zo[t])});case"badge":return Wo(o=>{jo(o,lr,!0),$u(o,t)})}}var Rt="bloom-chat-state-favicon",Pt="data-bloom-rel",mr="data-bloom-media",Ns="bloom-parked-icon",td="/favicon.ico",Us=g({style:{type:"select",description:"How the tab icon shows the chat state.",options:Ds,default:"bg"}}),Ae=null,Ys="",Xo=null,Fs="",Gs=new Map,fr,ur=[],Qs=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${Pt}]`)];function pr(){for(let e of Qs())e.id!==Rt&&(e.hasAttribute(Pt)||(Fs||=e.href,e.setAttribute(Pt,e.rel),e.setAttribute(mr,e.getAttribute("media")??"")),e.rel!==Ns&&(e.rel=Ns),e.media!=="not all"&&(e.media="not all"))}function od(){for(let e of Qs()){let t=e.getAttribute(Pt);if(t==null)continue;e.rel=t;let o=e.getAttribute(mr);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(Pt),e.removeAttribute(mr)}}function Ks(){let e=document.getElementById(Rt);return e||(e=document.createElement("link"),e.id=Rt,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function nd(e){if(e==="wait")return Fs||td;let t=Us.store.style,o=`${t}:${e}`,n=Gs.get(o);return n||Gs.set(o,n=Hs(t,e)),n}function dr(e){if(e)return"rotate";let t=C();return Ae&&t&&t!==Ys&&(Ae=null),Ae==="error"?"error":Ae==="done"?"done":t?"ready":"wait"}function Ot(e,t=!1){if(e===Xo&&!t)return;Xo=e;let o=Ks(),n=nd(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function rd(){fr=new MutationObserver(()=>{pr(),document.head.lastElementChild?.id!==Rt&&Ks()}),fr.observe(document.head,{childList:!0})}var Ws=p({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"HostReady",settings:Us,start(){pr(),Ot(dr(T().generating),!0),rd(),ur=[y.on("rise",()=>{Ae=null,Ot("rotate")}),y.on("fall",({outcome:e})=>{Ae=e==="done"||e==="error"?e:null,Ys=C(),Ot(dr(!1))}),y.on("context",({migrated:e})=>{e||(Ae=null)}),y.on("tick",({generating:e})=>{pr(),Ot(dr(e))})]},stop(){for(let e of ur)e();ur=[],fr?.disconnect(),document.getElementById(Rt)?.remove(),od(),Xo=null,Ae=null},onSettingsChange(){Ot(Xo??"wait",!0)}});var id={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${d.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])']},js=g({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0}}),zs=p({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads and notices.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:js,styles:()=>Ne(Object.entries(id).flatMap(([e,t])=>js.store[e]?t:[]))});var _e=`form:has(:is(${d.composerInput})), ${d.oldComposerForm}`,$o='[class*="ComposerLayoutBody"]',gr='[class*="ComposerLayoutRoot"]',sd='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',ad=`:is(${_e}) ${$o}, :is(${_e}):not(:has(${$o})) ${gr}, :is(${_e}):not(:has(${$o})):not(:has(${gr})) :is(${sd})`,ld='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',cd='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',ud="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))",Js=g({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function dd(){let{opacity:e,blur:t}=Js.store;if(e>=100)return"";let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${ud} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important;-webkit-backdrop-filter:blur(${t}px)!important`;return`:is(${ld}), :is(${_e}){${o}}:is(${cd}){display:none!important}${ad}{${n}}:is(${_e}):has(${$o}) ${gr}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${_e}) :is(${d.composerInput}){background-color:transparent!important}`}var Vs=p({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:Js,styles:dd});var md=1200,fd=8e3,pd=150,gd=20,Zs=6,Ar="continue where you left",hd=/message delivery timed out|please try again/i,Xs=/waiting for the complete answer/i,$s=g({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:Ar,placeholder:Ar}}),hr=[],en=0,Dt=!1,Ht=0,tt="",_o="",yr=0,ot=!1,Nt=!1,tn=!0,et="",vr=0,on=!1,bd=()=>$s.store.prompt.trim()||Ar;function _s(){return(F(d.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function ea(){let e=_s();return!e||Xs.test(e)||!hd.test(e)?"":e}function Ad(){let e=_s();return e&&Xs.test(e)?e:""}function yd(){let e=Ke()?.querySelectorAll(d.turn),t=e?.[e.length-1];return`${t?.getAttribute("data-turn-key")??""}:${t?.textContent?.length??0}`}function ta(e,t,o){if(o===en){if(T().generating||C()!==e||t>=gd){ot=!1,T().generating||(tt="");return}ho(),setTimeout(()=>ta(e,t+1,o),pd)}}function vd(e){let t=en;if(T().generating||C()&&C()!==e){ot=!1,tt="";return}_(e),on=!0,ht(()=>{t===en&&ta(e,0,t)})}function oa(e){return e===tt||Ht>=Zs||T().generating||C()?!1:(tt=e,Ht+=1,ot=!0,vd(bd()),!0)}function qd(){if(Dt||ot||Nt)return;let e=Date.now(),t=ea();if(t){if(et="",t!==_o){_o=t,yr=e;return}if(e-yr<md)return;oa(`${h()??""}:${t}`);return}if(_o="",!Ad()){tn=!0,et="";return}if(!tn||!T().generating||C())return;let n=`${h()??""}:${yd()}`;if(n!==et){et=n,vr=e;return}if(e-vr<fd||Ht>=Zs)return;let r=Fe();r&&(Nt=!0,r.click())}function br(){en+=1,Dt=!1,Ht=0,tt="",_o="",yr=0,ot=!1,Nt=!1,tn=!0,et="",vr=0,on=!1}var na=p({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:$s,start(){br(),hr=[y.on("rise",()=>{Dt=!1,tt="",ot=!1,on&&(on=!1,tn=!1,et="")}),y.on("fall",({outcome:e})=>{if(Nt){Nt=!1,e==="left"?Dt=!0:oa(`${h()??""}:stall`);return}(e==="stopped"||e==="left")&&(Dt=!0),e==="done"&&!ea()&&(Ht=0)}),y.on("context",({migrated:e})=>{e||br()}),y.on("tick",qd)]},stop(){for(let e of hr)e();hr=[],br()}});var se=L("bloom-csi-"),Sd=256,xd=160,nn=1,ra=4,wd=.1,Ed=.0015,Cd=250;function Td(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function Md(e){return new Promise((t,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function Ld(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:me(t.x,n,1-n),y:me(t.y,r,1-r)}}function ia(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function kd(e,t){let o=a("canvas");return o.width=o.height=Sd,ia(o,e,t),o.toDataURL("image/png")}function sa(e){let t=null,o={x:I.store.cropX,y:I.store.cropY,zoom:I.store.cropZoom},n,r=a("canvas",{class:se("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=xd*devicePixelRatio;let i=a("div",{class:`bloom-muted ${se("status")}`}),s=a("div",{class:se("zoom")}),c=a("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(b,N=!0){t&&(o=Ld(t,b),ia(r,t,o),N&&(clearTimeout(n),n=setTimeout(()=>{t&&(I.store.cropX=o.x,I.store.cropY=o.y,I.store.cropZoom=o.zoom,I.store.avatarUrl=kd(t,o))},Cd)))}function u(){s.replaceChildren(Ro(o.zoom,nn,ra,wd,"\xD7",b=>l({...o,zoom:b})))}async function m(b,N){i.textContent="";try{t=await Md(b),N&&(I.store.avatarSource=b,o={x:.5,y:.5,zoom:nn}),e.classList.add(se("has-image")),u(),l(o,N)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let v=b=>{b?.type.startsWith("image/")&&Td(b).then(N=>m(N,!0))};c.addEventListener("change",()=>v(c.files?.[0])),r.addEventListener("wheel",b=>{t&&(b.preventDefault(),l({...o,zoom:me(o.zoom*(1-b.deltaY*Ed),nn,ra)}),u())},{passive:!1}),r.addEventListener("pointerdown",b=>{if(!t)return;r.setPointerCapture(b.pointerId);let N={...o},lt=r.getBoundingClientRect(),eo=to=>{if(!t)return;let V=Math.max(lt.width/t.naturalWidth,lt.height/t.naturalHeight)*o.zoom;l({...o,x:N.x-(to.clientX-b.clientX)/(t.naturalWidth*V),y:N.y-(to.clientY-b.clientY)/(t.naturalHeight*V)})};r.addEventListener("pointermove",eo),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",eo),{once:!0})});let Y=a("div",{class:se("cropper"),attrs:{tabindex:"0"},on:{paste:b=>v([...b.clipboardData?.files??[]].find(N=>N.type.startsWith("image/"))),dragover:b=>b.preventDefault(),drop:b=>{b.preventDefault(),v(b.dataTransfer?.files[0])}}},a("div",{class:se("stage")},r),a("div",{class:se("controls")},xt("",b=>b.trim()&&void m(b.trim(),!0),"https://\u2026 or data:image/\u2026","url"),a("div",{class:se("buttons")},H("Choose file",()=>c.click()),H("Reset crop",()=>{l({x:.5,y:.5,zoom:nn}),u()}),H("Clear",()=>{t=null,e.classList.remove(se("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),s.replaceChildren(),I.store.avatarUrl="",I.store.avatarSource=""},"danger")),s,i,c));return e.append(Y),I.store.avatarSource&&m(I.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var aa=`/*
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
`;var Gt="data-bloom-csi-avatar",qr="data-bloom-csi-sized",da="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",Id=32,I=g({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>sa(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),la=[];function ma(e){e.removeAttribute(Gt),e.removeAttribute(qr)}function ca(e){return(I.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function ua(e=[]){if(!Q(e))return;let t=I.store.displayName.trim()||null,o=!!I.store.avatarUrl,n=new Set(t?ca("name"):[]);for(let i of document.querySelectorAll(da))n.has(i)||we(i,null);for(let i of n)we(i,t);let r=new Set(o?ca("avatar"):[]);for(let i of document.querySelectorAll(`[${Gt}]`))r.has(i)||ma(i);for(let i of r)i.hasAttribute(Gt)||i.setAttribute(Gt,""),i.toggleAttribute(qr,!i.closest('[role="menu"]'))}function Od(){let e=I.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${I.store.avatarSize}px}:is(${d.rail}, ${d.oldRail}) [${qr}]{--bloom-csi-size:${Id}px}`:""}var fa=p({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:I,styles:()=>`${Od()}
${aa}`,start(){la=[ee(),R(ua)]},stop(){for(let e of la)e();for(let e of document.querySelectorAll(`[${Gt}]`))ma(e);for(let e of document.querySelectorAll(da))we(e,null)},onSettingsChange(){ua()}});var nt=L("bloom-greeting-"),pa=30,ga=100;function ha(e){let t=-1,o=a("textarea",{class:`bloom-input ${nt("input")}`,attrs:{maxlength:String(ga),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=H("Add",i),r=a("div",{class:nt("list")});function i(){let l=o.value.trim().slice(0,ga);if(!l)return;let u=[...w.store.greetings];t>=0?u[t]=l:u.length<pa&&u.push(l),w.store.greetings=u,t=-1,o.value="",s()}function s(){let{greetings:l}=w.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&l.length>=pa,r.replaceChildren(...l.length?l.map((u,m)=>a("div",{class:nt("row",m===t?"row-editing":"row-idle")},a("div",{class:nt("text"),text:u}),K("edit","Edit",()=>{t=m,o.value=u,o.focus(),s()}),K("trash","Delete",()=>{w.store.greetings=l.filter((v,Y)=>Y!==m),t===m&&(t=-1),s()}))):[a("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),e.append(a("div",{class:nt("editor")},r,a("div",{class:nt("form")},o,n))),s();let c=Ue((l,u)=>l==="GreetingCustomizer"&&u==="greetings"&&s());return()=>{c(),e.replaceChildren()}}var ba=`/*
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
`;var an="data-bloom-greeting",Pd=1e3,Dd=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],w=g({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>ha(e)},greetings:{type:"custom",default:Dd},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),rn,Aa=[],Sr,Yt=()=>xo()&&!wo(),Hd=e=>e.replaceAll(/\s*\n\s*/g," ").trim(),va=()=>w.store.greetings.filter(e=>typeof e=="string"&&e.trim());function Ft(){let e=va();if(e.length)if(w.store.order==="random"&&e.length>1){let t=w.store.lastRandom;for(;t===w.store.lastRandom;)t=Math.floor(Math.random()*e.length);w.store.lastRandom=t,w.store.index=t}else w.store.index=(w.store.index+1)%e.length}function Nd(){return Yt()?F(d.homeHeading):null}function sn(){for(let e of document.querySelectorAll(`[${an}]`))e.removeAttribute(an),we(e,null)}function ln(){for(let e of document.querySelectorAll("[data-bloom-placeholder]"))e.removeAttribute("data-bloom-placeholder")}function ya(e){let t=pe(),o=Hd(e);if(!t||!o||C(t)){ln();return}t.getAttribute("data-bloom-placeholder")!==o&&t.setAttribute("data-bloom-placeholder",o)}function Ut(){let e=va(),t=Ri(),o=Yt();if(!e.length||!t&&!o){sn(),ln();return}if(t){sn(),ya(e[0]??"");return}let n=Nd();n?((w.store.index<0||w.store.index>=e.length)&&Ft(),n.setAttribute(an,""),we(n,e[Math.max(0,w.store.index)%e.length]??"")):sn(),w.store.heroOnlyOutsideProject?ln():ya(e[Math.max(0,w.store.index)%e.length]??"")}function xr(){clearInterval(rn),rn=void 0,w.store.mode==="interval"&&Yt()&&(rn=setInterval(()=>{Ft(),Ut()},w.store.intervalSec*Pd))}function Gd(e){w.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${an}]`)||getSelection()?.toString()||(Ft(),Ut())}function Ud(){Yt()&&w.store.mode==="refresh"&&Ft(),xr(),Ut()}var qa=p({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:w,styles:ba,start(){Sr=new AbortController,document.addEventListener("click",Gd,{signal:Sr.signal}),Yt()&&w.store.mode==="refresh"&&Ft(),xr(),Aa=[R(e=>Q(e)&&Ut()),ge(Ud)]},stop(){Sr?.abort();for(let e of Aa)e();clearInterval(rn),sn(),ln()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&xr(),Ut()}});var Qt=L("bloom-history-"),wr=10,Yd=3e3;function Sa(e){let t="",o=0,n=new Set,r=a("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),i=a("div",{class:Qt("list")}),s=a("div",{class:Qt("pager")}),c,l=H("Clear all",()=>{if(!c){l.textContent="Click again to clear",c=setTimeout(()=>{c=void 0,l.textContent="Clear all"},Yd);return}clearTimeout(c),c=void 0,l.textContent="Clear all",Kt([])},"danger");function u(){let v=[...Oe.store.entries].toReversed(),Y=t.trim().toLowerCase(),b=Y?v.filter(V=>V.toLowerCase().includes(Y)):v,N=Math.max(1,Math.ceil(b.length/wr));o=Math.min(o,N-1);let lt=b.slice(o*wr,(o+1)*wr).map(V=>a("div",{class:Qt("row")},a("button",{class:Qt("text",n.has(V)?"text-open":"text-closed"),text:V,title:n.has(V)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{n.delete(V)||n.add(V),u()}}}),K("copy","Copy",()=>void zr(V)),K("trash","Delete",()=>Kt(Oe.store.entries.filter(yl=>yl!==V)))));i.replaceChildren(...lt.length?lt:[a("div",{class:"bloom-muted",text:Y?"No matching prompts.":"No saved prompts yet."})]),s.replaceChildren(a("span",{class:"bloom-muted",text:`${b.length} ${Y?"matching":"saved"} \xB7 page ${o+1} of ${N}`}),H("Previous",()=>{o--,u()}),H("Next",()=>{o++,u()}),l);let[eo,to]=s.querySelectorAll("button");eo.disabled=o===0,to.disabled=o>=N-1,l.disabled=!v.length}r.addEventListener("input",()=>{t=r.value,o=0,u()}),e.append(a("div",{class:Qt("manager")},r,i,s)),u();let m=Ue((v,Y)=>v==="InputHistory"&&Y==="entries"&&u());return()=>{m(),clearTimeout(c),e.replaceChildren()}}var xa=`/*
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
`;var Qd=L("bloom-history-"),Kd=2e3,Oe=g({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>Sa(e)},entries:{type:"custom",default:[]}}),j=null,Er={text:"",at:0},Re=null,Cr,cn=()=>Oe.store.entries.filter(e=>typeof e=="string");function Kt(e){Oe.store.entries=e.slice(-Oe.store.maxEntries)}function Tr(e){let t=e.trim();if(!t)return;let o=Date.now();t===Er.text&&o-Er.at<Kd||(Er={text:t,at:o},Kt([...cn().filter(n=>n!==t),t]))}function Wd(e,t){let o=pe();if(!o)return;Re??=a("div",{class:`bloom-root ${Qd("hud")}`,attrs:{"data-bloom":"history-hud","aria-live":"polite"}}),Re.textContent=`${e+1} / ${t}`;let n=(o.closest("form")??o).getBoundingClientRect();Re.style.left=`${n.left+n.width/2}px`,Re.style.top=`${n.top}px`,Re.isConnected||document.body.append(Re)}function Wt(){j=null,Re?.remove()}function jd(e){let t=cn();if(!j)return;let o=t[e];j.index=e,j.shown=o,_(o),Wd(t.length-1-e,t.length)}function zd(e){let t=cn();if(!t.length)return!1;if(!j){if(e===1)return!1;j={index:t.length,draft:C(),shown:""}}let o=j.index+e;return o<0?!0:o>=t.length?(_(j.draft),Wt(),!0):(jd(o),!0)}function Jd(e){if(e.isComposing||!bt(e.target))return;let t=e.target;if(e.key==="Enter"&&!e.shiftKey){Tr(C(t)),Wt();return}if(e.key==="Escape"&&j){_(j.draft),Wt(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey)return;let o=qi(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!j||zd(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function Vd(e){j&&bt(e.target)&&C(e.target)!==j.shown.trim()&&Wt()}function Zd(e){e.target instanceof Element&&e.target.closest(d.sendButton)&&Tr(C())}var wa=p({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:Oe,styles:xa,start(){Cr=new AbortController;let{signal:e}=Cr;document.addEventListener("keydown",Jd,{capture:!0,signal:e}),document.addEventListener("input",Vd,{capture:!0,signal:e}),document.addEventListener("click",Zd,{capture:!0,signal:e}),document.addEventListener("submit",()=>Tr(C()),{capture:!0,signal:e})},stop(){Cr?.abort(),Wt()},onSettingsChange(e){e==="maxEntries"&&Kt(cn())}});var Ea=`/*
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
`;var $d=1500,_d=5e3,em=2e3,rt=g({showDate:{type:"boolean",description:"Show the date for messages not sent today.",default:!0},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),dn=new Map,Ma=0,mn,Ca=[];function La(e,t){dn.get(e)!==t&&(dn.set(e,t),clearTimeout(mn),mn=setTimeout(ka,em))}function ka(){let e={...rt.store.stamps,...Object.fromEntries(dn)};rt.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,$d))}function tm(e){let t=$(h())?.times;for(let o=e.length-1;o>=0;o--){let n=dn.get(e[o])??t?.get(e[o])??rt.store.stamps[e[o]];if(n)return n}return null}var om=()=>T().generating||Date.now()-Ma<_d;function nm(e){let t=new Date(e),o=new Date,n={hour:"2-digit",minute:"2-digit"};if(!rt.store.showDate||t.toDateString()===o.toDateString())return t.toLocaleTimeString(void 0,n);let r=t.getFullYear()===o.getFullYear()?{}:{year:"numeric"};return t.toLocaleString(void 0,{...r,month:"short",day:"numeric",...n})}function Ta(e){let t=Co(e)??e.getAttribute("data-message-author-role")??e.closest(d.turn)?.getAttribute("data-turn")??e.querySelector(d.authorRole)?.getAttribute("data-message-author-role");if(Nn(t))return t;let o=yt(e).at(-1);return $(h())?.chain.find(n=>n.id===o)?.role??null}function rm(e){let t=yt(e);if(!t.length||!Qe(e)||e.querySelector("time:not([data-bloom])"))return;let o=tm(t);!o&&om()&&(o=Date.now(),La(t.at(-1),o));let n=e.querySelector(':scope > time[data-bloom="timestamp"]');if(!o||rt.store.hideOwnMessages&&Ta(e)==="user"){n?.remove();return}let r=nm(o);if(n?.textContent===r)return;let i=a("time",{class:`bloom-timestamp bloom-timestamp-${Ta(e)??"assistant"}`,text:r,title:new Date(o).toLocaleString(),attrs:{"data-bloom":"timestamp",datetime:new Date(o).toISOString()}});n?n.replaceWith(i):e.prepend(i)}var un=Ye(()=>{for(let e of Gn())rm(e)}),Ba=p({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:rt,styles:Ea,start(){Ca=[R(e=>Q(e)&&un()),G.on("conversation",un),G.on("message-time",({messageId:e,time:t})=>{La(e,t),un()}),y.on("fall",()=>{Ma=Date.now()})]},stop(){for(let e of Ca)e();mn&&(clearTimeout(mn),ka());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();un()}}});var im=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])'],sm=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],Ia=g({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),Oa=p({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:Ia,styles:()=>Ne([...im,...Ia.store.hideDictationSettings?sm:[]])});var Pe="data-bloom-share",am=/^\/g\/g-p-/,lm=/^(?:share|分享)$/i,cm=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],um=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${Pe}="project"]`],Mr=g({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),fn,Lr=!1;function dm(e){if(!Q(e))return;let t=am.test(location.pathname)&&!h();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${Pe}]`))!t||!lm.test(x(o.textContent??""))?o.removeAttribute(Pe):o.hasAttribute(Pe)||o.setAttribute(Pe,"project")}var Ra=p({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:Mr,styles:()=>Ne([...Mr.store.hideShareChat?cm:[],...Mr.store.hideShareProject?um:[]]),start(){Lr=!0,At().then(()=>{Lr&&!fn&&(fn=R(dm))})},stop(){Lr=!1,fn?.(),fn=void 0;for(let e of document.querySelectorAll(`[${Pe}]`))e.removeAttribute(Pe)}});var Pa='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',mm='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',fm="[data-bloom-profile-plan]",Da="visibility:hidden!important;user-select:none!important",Na=g({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function pm(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=Na.store,r=[];return e&&r.push(n?`:is(${Pa}){display:none!important}`:`:is(${Pa}){${Da}}`),t&&r.push(`:is(${mm}){${Da}}`),e&&o&&r.push(`${fm}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var Ha,Ga=p({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Na,styles:pm,start(){Ha=ee()},stop(){Ha?.()}});var gm="model-switcher-dropdown-button",Ua=e=>e.startsWith("model-switcher-")&&e!==gm?e.slice(15):"",jt=(e,t)=>e.id===t.id||!!e.label&&e.label===t.label;function Ya(){let e=Ee();return(e&&F(d.modelTrigger,e))??F(d.modelTrigger)}function te(){let e=Ya();if(!e)return null;let t=x(e.innerText),o=Ua(e.getAttribute("data-testid")??"")||t;return o?{id:o,label:t||o}:null}function hm(e){return[...document.querySelectorAll(d.modelItem)].find(t=>{let o=Ua(t.getAttribute("data-testid")??""),n=x(t.textContent??"");return o===e.id||n===e.label||n===e.id})??null}function pn(e){let t=te();if(t&&jt(t,e))return!0;let o=hm(e);if(o){o.click();let r=te();return!!r&&jt(r,e)}let n=Ya();return n?.getAttribute("aria-expanded")!=="true"&&n?.click(),!1}var Fa=`/*
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
`;var O=L("bloom-queue-"),Am=6,ym=8,W=null,zt="",it=!1,st=!1;function kr(e,t,o){let n=K(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute(re),n.addEventListener("mouseenter",()=>Qa(t)),n.addEventListener("mouseleave",()=>Qa("")),n}function Qa(e){let t=W?.querySelector(`.${O("tip")}`);t&&(t.textContent=e)}function vm(e,t,o,n){st=!0;let r=a("textarea",{class:`bloom-input ${O("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=new AbortController,s=c=>{i.abort(),st=!1,zt="",c?n.edit(t,r.value):r.replaceWith(a("div",{class:O("text"),text:o}))};addEventListener("keydown",c=>{if(!(c.target!==r||c.isComposing)){if(c.key==="Enter"&&!c.shiftKey)s(!0);else if(c.key==="Escape")s(!1);else return;c.preventDefault(),c.stopImmediatePropagation()}},{capture:!0,signal:i.signal}),r.addEventListener("keydown",c=>c.stopPropagation(),{signal:i.signal}),r.addEventListener("blur",()=>s(!0),{signal:i.signal}),e.querySelector(`.${O("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function qm(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,s=l=>{!i&&Math.abs(l.clientY-n.clientY)<Am||(i||(i=st=!0,e.classList.add(O("dragging"))),e.style.transform=`translateY(${l.clientY-n.clientY}px)`)},c=l=>{if(removeEventListener("pointermove",s),!i)return;st=!1,zt="";let m=[...r.children].filter(v=>v!==e).filter(v=>v.getBoundingClientRect().top+v.getBoundingClientRect().height/2<l.clientY).length;o.move(t,m)};addEventListener("pointermove",s),addEventListener("pointerup",c,{once:!0})})}function Sm(e,t,o,n){let r=a("li",{class:O("row")},a("div",{class:O("text"),text:e.text}),n&&e.label?a("span",{class:O("model"),title:e.label,text:e.label}):null,a("div",{class:O("actions")},kr("trash","Remove from queue",()=>o.remove(t)),kr("edit","Edit",()=>vm(r,t,e.text,o)),kr("send","Send now",()=>o.sendNow(t))));return qm(r,t,o),r}function xm(e){if(!W)return;let t=e.getBoundingClientRect();W.style.left=`${t.left}px`,W.style.width=`${t.width}px`,W.style.bottom=`${innerHeight-t.top+ym}px`}function Br(){W?.remove(),W=null,zt="",st=!1}function at(e,t,o=!0){let n=Ee();if(!e.length||!gt(n)){Br();return}W||(W=a("div",{class:`bloom-root ${O("tray")}`,attrs:{"data-bloom":"queue"}},a("div",{class:O("header")},a("button",{class:O("toggle"),attrs:{type:"button","aria-expanded":String(!it)},on:{click:s=>{it=!it,W?.classList.toggle(O("collapsed"),it),s.currentTarget.setAttribute("aria-expanded",String(!it))}}},a("span",{class:O("count")}),D("chevron")),a("span",{class:O("tip")})),a("ol",{class:O("list")})),W.classList.toggle(O("collapsed"),it),document.body.append(W)),xm(n);let r=JSON.stringify([o,...e.map(s=>[s.text,o?s.label:""])]);if(st||r===zt)return;zt=r;let i=W.querySelector(`.${O("count")}`);i&&(i.textContent=oo(e.length,"Queued message")),W.querySelector(`.${O("list")}`)?.replaceChildren(...e.map((s,c)=>Sm(s,c,t,o)))}var wm=new S("PromptQueue"),Em=8,Vt=150,hn=20,bn="BloomPromptQueue",z=g({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1},showQueueMode:{type:"boolean",description:"Show the model that was selected when each message was queued.",default:!0},stickyOnNavigate:{type:"boolean",description:"Keep the selected model when switching chats.",default:!0},persistAcrossRefresh:{type:"boolean",description:"Restore unsent queued messages in this tab after a refresh.",default:!0}}),ae=new Map,An=!1,De=null,gn,Ka=[],le=null,ce=!1,Ir,yn="draft",Or=()=>h()??yn,J=()=>ae.get(Or())??[],Pr=e=>({id:e.model||e.label,label:e.label||e.model});function Cm(e){return typeof e=="string"?e.trim()?{text:e,model:"",label:""}:null:!E(e)||typeof e.text!="string"||!e.text.trim()?null:{text:e.text,model:typeof e.model=="string"?e.model:"",label:typeof e.label=="string"?e.label:""}}function Tm(){if(!z.store.persistAcrossRefresh){sessionStorage.removeItem(bn);return}let e=ve(sessionStorage.getItem(bn)??"");if(E(e))for(let[t,o]of Object.entries(e)){if(!Array.isArray(o))continue;let n=o.map(Cm).filter(r=>r!=null);n.length&&ae.set(t,n)}}function Rr(){try{if(!z.store.persistAcrossRefresh){sessionStorage.removeItem(bn);return}sessionStorage.setItem(bn,JSON.stringify(Object.fromEntries([...ae].filter(([e])=>e!==yn))))}catch(e){wm.warn("Could not save the queue",e)}}function He(e){e.length?ae.set(Or(),e):ae.delete(Or()),Rr(),at(J(),Jt,z.store.showQueueMode)}function Mm(e){if(!e.model&&!e.label)return!0;let t=te();return t?jt(t,Pr(e)):!0}function ja(e,t=0){t>=hn||T().generating||C()!==e||(ho(),setTimeout(()=>ja(e,t+1),Vt))}function Lm(e,t){let o=z.store.stickyOnNavigate&&le?le:e;if(!o||!t.model&&!t.label||jt(o,Pr(t))){ce=!1;return}ce=!0,setTimeout(()=>{pn(o),ce=!1},Vt)}function Zt(e,t=0){if(T().generating||C()){t<hn&&setTimeout(()=>Zt(e,t+1),Vt);return}if(!Mm(e)&&t<hn){ce=!0,pn(Pr(e)),setTimeout(()=>Zt(e,t+1),Vt);return}let o=te();_(e.text),ht(()=>ja(e.text)),Lm(o,e)}function Wa(){if(De!=null){let o=De;De=null,Zt(o);return}if(!An||T().generating||C())return;let[e,...t]=J();e!=null&&(An=!1,He(t),Zt(e))}function za(e){let t=J(),o=t[e];if(o!=null){if(He(t.filter((n,r)=>r!==e)),!T().generating){Zt(o);return}De=o,Fe()?.click()}}var Jt={remove:e=>He(J().filter((t,o)=>o!==e)),edit:(e,t)=>He(t.trim()?J().map((o,n)=>n===e?{...o,text:t}:o):J().filter((o,n)=>n!==e)),sendNow:za,move(e,t){let o=[...J()],[n]=o.splice(e,1);n&&(o.splice(t,0,n),He(o))}};function km(e){let t=te(),o={text:e,model:t?.id??"",label:t?.label??""},n=J();return z.store.replacePending&&n.length?(He([...n.slice(0,-1),o]),!0):n.length>=Em?!1:(He([...n,o]),!0)}function Bm(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!bt(e.target)||!T().generating)return;let t=C(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;let o=te();_(""),De={text:t,model:o?.id??"",label:o?.label??""},Fe()?.click();return}if(!t){J().length&&za(0);return}km(t)&&_("")}function Im(){if(ce||!z.store.stickyOnNavigate)return;let e=te();e&&(le=e)}function Om(){if(!z.store.stickyOnNavigate||!le)return;ce=!0;let e=0,t=()=>{if(!le||pn(le)||e>=hn){ce=!1;return}e++,Ir=setTimeout(t,Vt)};clearTimeout(Ir),t()}function Rm(e){let{target:t}=e;!(t instanceof Element)||ce||t.closest(`${d.modelTrigger}, ${d.modelItem}`)&&setTimeout(Im,0)}var Ja=p({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:z,styles:Fa,start(){gn=new AbortController,Tm(),le=te(),document.addEventListener("keydown",Bm,{capture:!0,signal:gn.signal}),document.addEventListener("pointerup",Rm,{signal:gn.signal}),Ka=[y.on("fall",({outcome:e})=>{An=e==="done",e==="left"&&(De=null),Wa()}),y.on("context",({prevId:e,id:t,migrated:o})=>{let n=ae.get(yn);ae.delete(yn),o&&!e&&t&&n&&ae.set(t,n),o||(An=!1,Om()),Rr(),at(J(),Jt,z.store.showQueueMode)}),y.on("tick",()=>{Wa(),at(J(),Jt,z.store.showQueueMode)})],at(J(),Jt,z.store.showQueueMode)},stop(){gn?.abort(),clearTimeout(Ir);for(let e of Ka)e();Br(),ae.clear(),De=null,le=null,ce=!1},onSettingsChange(e){e==="persistAcrossRefresh"&&Rr(),e==="stickyOnNavigate"&&z.store.stickyOnNavigate&&(le=te()),at(J(),Jt,z.store.showQueueMode)}});var Pm=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function Dm(){let e=x(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!Pm.has(e.toLowerCase())?e:null}function Xt(e){return e?$(e)?.title??is(e)??(e===h()?Dm():null):null}var Va=`/*
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
`;var ue=L("bloom-recent-"),de="home",Nm=50,Za=140,Gm=new Set(["Backquote"]),Um=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),q=g({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),ye=null,oe=[],ne=0,Dr,Xa=[],Sn=()=>wo()?null:h()??(xo()?de:null);function $a(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function el(e){let t=Xt(e);t&&q.store.titles[e]!==t&&(q.store.titles={...q.store.titles,[e]:t});let o=ss(location.href);o&&e===h()&&q.store.projects[e]!==o&&(q.store.projects={...q.store.projects,[e]:o})}function _a(e){if(!e)return;let t=[e,...q.store.visits.filter(n=>n!==e)].slice(0,Nm),o=new Set(t);q.store.visits=t,Object.keys(q.store.previews).some(n=>!o.has(n))&&(q.store.previews=$a(q.store.previews,o)),Object.keys(q.store.titles).some(n=>!o.has(n))&&(q.store.titles=$a(q.store.titles,o)),e!==de&&el(e)}function vn(e){if(!e||!q.store.visits.includes(e))return;let t={},o=$(e)?.chain??[];for(let r of o)t[r.role]=fe(Lo(r),Za);if(e===h())for(let r of To()){let i=Mo(r);i&&(t[r.role]=fe(i,Za))}let n=q.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(q.store.previews={...q.store.previews,[e]:t})}function Ym(){let e=Number(q.store.maxRecent);return q.store.visits.filter(t=>t!==de||q.store.includeHome).slice(0,e)}function Hr(e){if($t(),e===Sn())return;let t=e===de?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"]'):wt(e)[0];t?t.click():location.assign(e===de?"/":`/c/${e}`)}function Fm(e,t){let o=e===de?"New chat":q.store.titles[e]??Xt(e)??"Untitled chat",n=e===de?null:q.store.projects[e],r=e===de?null:q.store.previews[e];return a("button",{class:ue("item"),attrs:{type:"button",role:"option","aria-selected":String(t===ne)},on:{click:()=>Hr(e),mousemove:()=>t!==ne&&qn(t)}},a("div",{class:ue("head")},a("span",{class:`${ue("title")} bloom-truncate`,text:o}),n&&a("span",{class:ue("project"),text:n})),r?.user&&a("div",{class:`${ue("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&a("div",{class:`${ue("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function qn(e){ne=(e+oe.length)%oe.length,ye?.querySelectorAll(`.${ue("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===ne)))}function Qm(){vn(h());let e=Sn();oe=Ym(),e&&(oe=[e,...oe.filter(t=>t!==e)].slice(0,Number(q.store.maxRecent))),oe.length&&(ne=oe.length>1?1:0,ye=a("div",{class:`bloom-root ${ue("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:t=>t.target===t.currentTarget&&$t()}},a("div",{class:ue("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...oe.map(Fm))),document.body.append(ye))}function $t(){ye?.remove(),ye=null}var Km=e=>Gm.has(e.code)||Um.has(e.key);function Wm(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&Km(e)){e.preventDefault(),e.stopPropagation(),ye?qn(ne+(e.shiftKey?-1:1)):Qm();return}if(!ye)return;let o={Escape:$t,Enter:()=>Hr(oe[ne]),ArrowDown:()=>qn(ne+1),ArrowUp:()=>qn(ne-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function jm(e){ye&&e.key==="Control"&&Hr(oe[ne])}var tl=p({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:q,styles:Va,start(){Dr=new AbortController;let{signal:e}=Dr;addEventListener("keydown",Wm,{capture:!0,signal:e}),addEventListener("keyup",jm,{capture:!0,signal:e}),addEventListener("blur",$t,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&vn(h()),{signal:e}),Xa=[ge(({prevId:i})=>{vn(i),_a(Sn())}),G.on("conversation",({id:i})=>{q.store.visits.includes(i)&&el(i),vn(i)})];let{visits:t,titles:o,previews:n}=q.store,r=t.filter(i=>i!==de&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(q.store.visits=t.filter(i=>!r.includes(i))),_a(Sn())},stop(){Dr?.abort();for(let e of Xa)e();$t()}});var Nr="data:audio/mpeg;base64,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";var ol=new S("ResponseNotification"),zm=.5,Jm=200,Vm=300,_t=g({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:e=>(e.append(H("Preview",sl)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),nl=null,Gr=new Map,rl,Ur;function Zm(e){return new Promise((t,o)=>GM_xmlhttpRequest({url:e,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=Jm&&n<Vm?t(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var Xm=e=>Uint8Array.from(atob(e.slice(e.indexOf(",")+1)),t=>t.charCodeAt(0)).buffer;function $m(e,t){let o=Gr.get(t);return o||(o=(t.startsWith("data:")?Promise.resolve(Xm(t)):Zm(t)).then(n=>e.decodeAudioData(n)),o.catch(()=>Gr.delete(t)),Gr.set(t,o)),o}async function il(e){nl??=new AudioContext;let t=nl;t.state==="suspended"&&t.resume();let o=t.createBufferSource(),n=t.createGain();o.buffer=await $m(t,e),n.gain.value=zm,o.connect(n).connect(t.destination),o.start()}function sl(){let e=_t.store.soundUrl.trim();il(e||Nr).catch(t=>{ol.warn("Sound failed",t),e&&il(Nr).catch(o=>ol.warn("Default chime failed",o))})}function _m(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function ef(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(Ur=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:Ur.signal}))}var al=p({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:_t,start(){ef(),rl=y.on("fall",({conversationId:e,outcome:t})=>{t==="done"&&(_t.store.onlyWhenHidden&&!document.hidden||(_t.store.sound&&sl(),_t.store.browserNotification&&_m(Xt(e))))})},stop(){rl?.(),Ur?.abort()}});var tf=`:is(${d.sidebarScroll}, :has(> ${d.sidebarScroll})) + :has(${d.menuButton})`,of=`${d.rail} > :has(${d.menuButton})`,Fr=`:is(${tf}, ${of}, ${d.oldProfile}):not(:hover)`,Yr="[data-bloom-profile-avatar]",nf=`:is(${Fr}, ${Fr} :has(${Yr})) > :not(${Yr}, :has(${Yr}))`,cl=g({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function rf(){let{opacity:e,fadeAvatar:t}=cl.store;return e>=100?"":`${t?Fr:nf}{opacity:${e/100}!important}`}var ll,ul=p({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:cl,styles:rf,start(){ll=ee()},stop(){ll?.()}});var sf="filter:blur(6px)!important;transition:filter 0.2s ease",dl=`:is(${d.sidebars})`,af={conversations:{selectors:[`${dl} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0},projects:{selectors:[`${dl} a:is([href*="/project"], [href*="/g/g-p-"])`,"[data-app-action-sidebar-project-row]",".bloom-recent-project"],hover:!0},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}},fl=g({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function lf(){return Object.entries(af).filter(([e])=>fl.store[e]).map(([,{selectors:e,hover:t}])=>{let o=e.join(",");return`:is(${o}){${sf}}`+(t?`:is(${o}):hover, .bloom-recent-item:hover :is(${o}){filter:none!important}`:"")}).join(`
`)}var ml,pl=p({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:fl,styles:lf,start(){ml=ee()},stop(){ml?.()}});var cf=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],uf=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",df='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',gl=g({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function mf(){let e=`${gl.store.width}rem`;return`:is(${uf}){${cf.map(t=>`${t}:${e}!important`).join(";")}}:is(${df}){max-width:min(100%, ${e})!important}`}var hl=p({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:gl,styles:mf});var ff=[ys,Bs,Rs,Ws,zs,Vs,na,fa,qa,wa,Ba,Oa,Ra,Ga,Ja,tl,al,ul,pl,hl],Qr=ff;var pf=new S("Bloom"),bl="2.0.54";async function Kr(){ki();for(let e of Qr)e.updatedAt=zi[e.name];ui(Qr),await ii(),no("base",hi),ji(),mo("Init"),yo().then(()=>{Xr(),mo("DOMContentLoaded")}),await Ii(),mo("HostReady"),pf.info(`Bloom++ ${bl} ready`)}var Al=new S("Boot");if(window===window.top){let e=Z.Bloom;e&&Al.warn("Replacing another Bloom++ instance",e.VERSION),Object.defineProperty(Z,"Bloom",{value:Wr,configurable:!0,writable:!0}),Kr().catch(t=>Al.error("Startup failed",t))}})();
