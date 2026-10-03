// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.51
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

/* Bloom++ v2.0.51. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var il=Object.defineProperty;var al=(e,t)=>{for(var o in t)il(e,o,{get:t[o],enumerable:!0})};var S=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var se=(e,t,o)=>Math.min(o,Math.max(t,e)),w=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),kr=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,le=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,x=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function Wt(e,t){return`${e} ${t}${e===1?"":"s"}`}async function Ir(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function ge(e){try{return JSON.parse(e)}catch{return}}var z=typeof unsafeWindow>"u"?window:unsafeWindow;var Br={};al(Br,{VERSION:()=>ol,init:()=>Lr,plugins:()=>Ae});var sl=new S("Styles"),nt=new Map,Rr=new Set,rt=new Map,cn=!0;function Or(){let e=document.adoptedStyleSheets.filter(t=>!Rr.has(t));document.adoptedStyleSheets=[...e,...nt.values()]}function Dr(e){document.readyState==="loading"||e.parentNode===document.head||document.head.append(e)}function ll(e,t){let o=rt.get(e);o||(o=document.createElement("style"),o.id=`bloom-style-${e}`,rt.set(e,o)),o.textContent!==t&&(o.textContent=t),Dr(o)}function jt(e,t){if(cn)try{let o=nt.get(e);o||(o=new z.CSSStyleSheet,nt.set(e,o),Rr.add(o)),o.replaceSync(t),Or();return}catch(o){sl.warn("Constructed style sheets unavailable, using <style> after parsing",o),cn=!1,nt.delete(e)}ll(e,t)}function un(e){nt.delete(e)&&cn&&Or(),rt.get(e)?.remove(),rt.delete(e)}function Pr(){for(let e of rt.values())Dr(e)}var M=e=>(...t)=>t.map(o=>e+o).join(" "),zt=(...e)=>e.filter(Boolean).join(" "),ke=e=>e.length?`${e.join(",")}{display:none!important}`:"";function f(e){return e}var Jt=new S("Storage"),cl="bloompp",Vt="kv",Hr=null;function ul(){return Hr??=new Promise((e,t)=>{let o=indexedDB.open(cl,1);o.onupgradeneeded=()=>{o.result.objectStoreNames.contains(Vt)||o.result.createObjectStore(Vt)},o.onsuccess=()=>e(o.result),o.onerror=()=>t(o.error)}),Hr}function Nr(e,t){return ul().then(o=>new Promise((n,r)=>{let i=t(o.transaction(Vt,e).objectStore(Vt));i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)}))}async function dl(e){if(typeof GM_getValue=="function")try{return await GM_getValue(e)}catch(t){Jt.warn("GM read failed",t);return}}async function ml(e){try{return await Nr("readonly",t=>t.get(e))}catch(t){Jt.warn("IndexedDB read failed",t);return}}function fl(e){try{return localStorage.getItem(e)??void 0}catch{return}}async function Gr(e){return Promise.all([dl(e),ml(e),fl(e)])}function Ur(e,t){typeof GM_addValueChangeListener=="function"&&GM_addValueChangeListener(e,(o,n,r,i)=>{i&&t(r)}),addEventListener("storage",o=>{o.key===e&&t(o.newValue)})}function Yr(e,t){let o=JSON.stringify(t);if(typeof GM_setValue=="function")try{GM_setValue(e,t)}catch{GM_setValue(e,o)}try{localStorage.setItem(e,o)}catch(n){Jt.warn("localStorage write failed",n)}Nr("readwrite",n=>n.put(o,e)).catch(n=>Jt.warn("IndexedDB write failed",n))}var pl=new S("Settings"),mn="BloomSettings",gl=100,hl=["GM","IndexedDB","localStorage"],Ie={plugins:{}},Zt=new Set,fn=new Set,it;function Kr(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=ge(t);return!w(t)||!w(t.plugins)||!Object.keys(t.plugins).length?null:t}var dn=e=>e==null||e===""||(Array.isArray(e)?!e.length:w(e)&&!Object.keys(e).length);function bl(e){return dn(e)?0:Array.isArray(e)?12+Math.min(e.length,40):w(e)?12+Math.min(Object.keys(e).length,40):3}function Al(e){let t=0;for(let o of Object.values(e.plugins))if(w(o))for(let[n,r]of Object.entries(o))n!=="enabled"&&(t+=bl(r));return t}var Fr=e=>Object.values(e.plugins).filter(t=>w(t)&&t.enabled===!0).length;function yl(e){let t=e.map((i,a)=>i&&{candidate:i,index:a,score:Al(i)}).filter(i=>i!=null).toSorted((i,a)=>a.score-i.score||(i.score?0:Fr(a.candidate)-Fr(i.candidate))||i.index-a.index);if(!t.length)return null;let[o,...n]=t,r=structuredClone(o.candidate);for(let{candidate:i}of n)for(let[a,c]of Object.entries(i.plugins)){if(!w(c))continue;let l=r.plugins[a]??={};for(let[u,m]of Object.entries(c))u==="enabled"?!("enabled"in l)&&m===!0&&(l.enabled=!0):dn(l[u])&&!dn(m)&&(l[u]=structuredClone(m));Object.keys(l).length||delete r.plugins[a]}return{bag:r,source:hl[o.index]}}async function Qr(){let e=await Gr(mn),t=yl(e.map(Kr));t&&(Ie.plugins=t.bag.plugins,pl.info("Loaded settings from",t.source))}var Wr=(e,t)=>`${e}
${t}`;function jr(){it=void 0,fn.clear(),Yr(mn,Ie)}function vl(e){let t=Kr(e);if(!t)return;let o=[];for(let n of new Set([...Object.keys(Ie.plugins),...Object.keys(t.plugins)])){let r=Ie.plugins[n]??={},i=w(t.plugins[n])?t.plugins[n]:{};for(let a of new Set([...Object.keys(r),...Object.keys(i)]))fn.has(Wr(n,a))||JSON.stringify(r[a])===JSON.stringify(i[a])||(i[a]===void 0?delete r[a]:r[a]=i[a],o.push([n,a]))}for(let[n,r]of o)for(let i of Zt)i(n,r)}function ql(){it&&(clearTimeout(it),jr())}var he=(e,t)=>Ie.plugins[e]?.[t];function be(e,t,o){let n=Ie.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,fn.add(Wr(e,t)),clearTimeout(it),it=setTimeout(jr,gl);for(let r of Zt)r(e,t)}function Re(e){return Zt.add(e),()=>void Zt.delete(e)}function pn(e){return e.type==="component"?void 0:e.default}function g(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>he(t.pluginName,n)??(e[n]&&pn(e[n])),set:(o,n,r)=>(be(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&he(t.pluginName,o)!==void 0&&be(t.pluginName,o)}};return t}var zr=e=>{let t=()=>{let o=he("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();be("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},Xt=zr("pinnedPlugins"),$t=zr("starredPlugins");addEventListener("pagehide",ql);Ur(mn,vl);var _t=new S("PluginManager"),Ae=new Map,at=new Set,Jr=new Set,gn=new Set;function Vr(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),Ae.set(t.name,t)}var st=e=>!!e.required||(he(e.name,"enabled")??!!e.enabledByDefault);var hn=e=>`plugin-${e.name}`;function Zr(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?jt(hn(e),t):un(hn(e))}function Xr(e){if(!at.has(e.name))try{Zr(e),e.start?.(),at.add(e.name)}catch(t){_t.error(`Failed to start ${e.name}`,t)}}function Sl(e){if(at.delete(e.name)){un(hn(e));try{e.stop?.()}catch(t){_t.error(`Failed to stop ${e.name}`,t)}}}var $r=e=>e.startAt??"HostReady";function eo(e){Jr.add(e);for(let t of Ae.values())$r(t)===e&&st(t)&&Xr(t);_t.info(`${e}: ${[...at].join(", ")}`)}function _r(e,t){be(e.name,"enabled",t),t?Jr.has($r(e))&&Xr(e):Sl(e);for(let o of gn)o()}function ei(e){return gn.add(e),()=>void gn.delete(e)}Re((e,t)=>{let o=Ae.get(e);if(!(!o||t==="enabled"||!at.has(e)))try{Zr(o),o.onSettingsChange?.(t)}catch(n){_t.error(`Settings change failed for ${e}`,n)}});var ti=`/*
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
`;var xl=new S("Dom");function s(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var oi=document.createElement("template");function ni(e){return oi.innerHTML=e.trim(),oi.content.firstElementChild.cloneNode(!0)}var ct=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),V=(e,t=document)=>[...t.querySelectorAll(e)].find(ct)??null,El=16,Cl="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function ri(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([Cl],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function ut(e){document.hidden?setTimeout(e,El):requestAnimationFrame(e)}function Oe(e){let t=!1;return()=>{t||(t=!0,ut(()=>{t=!1;try{e()}catch(o){xl.error("Scheduled task failed",o)}}))}}var to=new Set,oo=[],lt,Tl=Oe(()=>{let e=oo;oo=[];for(let t of to)t(e)});function I(e){return to.add(e),lt||(lt=new MutationObserver(t=>{oo.push(...t),Tl()}),lt.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{to.delete(e),!to.size&&(lt?.disconnect(),lt=void 0,oo=[])}}var Ml=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),F=e=>!e.length||e.some(t=>!Ml(t.target));function ye(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size");return}e.getAttribute("data-bloom-text")!==t&&(e.hasAttribute("data-bloom-text")||e.style.setProperty("--bloom-text-size",getComputedStyle(e).fontSize),e.setAttribute("data-bloom-text",t))}var Ll=new S("Events");function no(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){Ll.error(`Listener for ${String(t)} failed`,r)}}}}var d={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]'};var ii=/[​-‍﻿]/g,De=()=>V(d.composerInput),dt=e=>e instanceof HTMLElement&&e.matches(d.composerInput),mt=(e=De())=>e?.closest("form")??document.querySelector(d.oldComposerForm);function B(e=De()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(ii,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(ii,"").trim()}var Bl=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function $(e,t=De()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return Bl?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function ai(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:a,value:c}=e;return{first:!c.slice(0,i).includes(`
`),last:!c.slice(a).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var si=e=>{let t=mt();return(t&&V(e,t))??V(e)},Pe=()=>si(d.stopButton),kl=()=>{let e=si(d.sendButton);return e&&!e.matches(d.stopButton)?e:null};function ro(){let e=kl();if(e){e.disabled||e.click();return}De()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var li=()=>ct(Pe());var di=new S("Network"),Il=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,Rl=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,ao=1e3,Ol=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),N=no(),bn=new Map,ci=new Map,Dl=1,Z=e=>e?bn.get(e)??null:null;function io(e){let t=bn.get(e);return t||bn.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var mi=e=>e==="user"||e==="assistant";function fi(e){let t=e.author?.role;if(!e.id||!mi(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(l=>typeof l=="string").join(`
`).trim(),i=n.filter(l=>w(l)&&l.content_type==="image_asset_pointer").length,a=e.metadata?.attachments,c=Array.isArray(a)&&a.length>0;return!r&&!i&&!c?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*ao:null,text:r,hasFiles:c,imageCount:i}}var pi=e=>e.filter((t,o)=>t.role==="user"||e[o+1]?.role!=="assistant"),An=e=>e.map(t=>t.createTime).filter(t=>t!=null);function Pl(e,t){let o=An(e),n=An(t);return!o.length||!n.length?!1:Math.max(...o)<Math.min(...n)}function Hl(e){let t=An(e);if(t.length<2)return e;let[o]=t,n=o-e.length;return e.map((i,a)=>(i.createTime!=null&&(n=i.createTime),{message:i,index:a,time:i.createTime??n})).toSorted((i,a)=>i.time-a.time||i.index-a.index).map(i=>i.message)}function Nl(e,t){let o=t.filter(w).map(c=>w(c.message)?c.message:c);for(let c of o)c.id&&c.create_time&&e.times.set(c.id,c.create_time*ao);let n=o.map(fi).filter(c=>c!=null),r=new Set(n.map(c=>c.id)),i=e.chain.filter(c=>!r.has(c.id)),a=Pl(n,i)?[...n,...i]:[...i,...n];return e.chain=pi(Hl(a)),e}function Gl(e,t){if(!w(t)||!(w(t.mapping)||Array.isArray(t.messages)))return null;let o=io(e);if(typeof t.title=="string"&&t.title&&(o.title=t.title),Array.isArray(t.messages))return Nl(o,t.messages);let n=t.mapping;for(let c of Object.values(n)){let l=c.message?.create_time;c.message?.id&&l&&o.times.set(c.message.id,l*ao)}let r=[],i=new Set,a=typeof t.current_node=="string"?t.current_node:null;for(;a&&!i.has(a)&&n[a];){i.add(a);let c=n[a].message,l=c?fi(c):null;l&&r.push(l),a=n[a].parent??null}return r.length&&(o.chain=pi(r.toReversed())),o}function Ul(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}function Yl(e){if(typeof e?.body!="string")return null;let t=ge(e.body);return w(t)&&typeof t.conversation_id=="string"?t.conversation_id:null}function Fl(e,t){if(!w(e))return;typeof e.type=="string"&&Ol.has(e.type)&&(t.handoff=!0);let o=w(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(io(e.conversation_id).title=e.title,N.emit("conversation",io(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&mi(n.author?.role)){let r=n.create_time*ao;t.conversationId&&io(t.conversationId).times.set(n.id,r),N.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function Kl(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:a}=await o.read();if(i)break;r+=n.decode(a,{stream:!0});let c=r.split(`
`);r=c.pop()??"";for(let l of c){if(!l.startsWith("data:"))continue;let u=l.slice(5).trim();u&&u!=="[DONE]"&&Fl(ge(u),t)}}}async function Ql(e,t,o){let n={conversationId:t,error:!1,handoff:!1};ci.set(e,t),N.emit("generate-start",{requestId:e,conversationId:t});try{let r=await o;r.ok?r.headers.get("content-type")?.includes("event-stream")&&await Kl(r.clone(),n):n.error=!0}catch(r){let i=r instanceof DOMException&&r.name==="AbortError";n.handoff||=i,n.error||=!i}finally{ci.delete(e),N.emit("generate-end",{requestId:e,...n})}}async function Wl(e,t){try{let o=await t;if(!o.ok)return;let n=Gl(e,await o.clone().json());n&&N.emit("conversation",n)}catch(o){di.debug("Conversation read skipped",o)}}function jl(e,t,o){let n=Ul(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&Il.test(n.pathname)){Ql(Dl++,Yl(t),o);return}let i=r==="GET"&&n.pathname.match(Rl)?.[1];i&&Wl(i,o)}var ui=!1;function gi(){if(ui)return;ui=!0;let e=z.fetch,t=function(o,n){let r=e.call(this??z,o,n);try{jl(o,n,r)}catch(i){di.error("Fetch tap failed",i)}return r};z.fetch=typeof exportFunction=="function"?exportFunction(t,z):t}var zl="__reactContainer$",hi="__reactFiber$";function so(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var yn=(e,t)=>Object.keys(e.wrappedJSObject??e).some(o=>o.startsWith(t)),He=e=>!yn(document,zl)||yn(e,hi);function ft(){return document.body?Promise.resolve():new Promise(e=>{let t=new MutationObserver(()=>{document.body&&(t.disconnect(),e())});t.observe(document,{childList:!0,subtree:!0})})}async function bi(){await ft();let e=Date.now()+8e3;for(;!yn(document.body,hi)&&Date.now()<e;)await new Promise(t=>setTimeout(t,100))}var Jl=new S("Route"),Ai=/\/c\/(?!local-)([\w-]+)/,Vl=500,Sn=e=>{try{return new URL(e,location.origin).pathname.match(Ai)?.[1]??null}catch{return null}},h=()=>location.pathname.match(Ai)?.[1]??null,mo=()=>location.pathname==="/",fo=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",co=new Set,uo=location.href,qn=h(),lo;function vn(){if(location.href===uo)return;let e={prevHref:uo,href:location.href,prevId:qn,id:h()};uo=e.href,qn=e.id;for(let t of co)try{t(e)}catch(o){Jl.error("Route listener failed",o)}}function Zl(){let e=new AbortController,{navigation:t}=z;t?.addEventListener("currententrychange",()=>queueMicrotask(vn),{signal:e.signal}),addEventListener("popstate",vn,{signal:e.signal});let o=setInterval(vn,Vl);return()=>{e.abort(),clearInterval(o)}}function ce(e){return co.add(e),lo||(uo=location.href,qn=h(),lo=Zl()),()=>{co.delete(e),!co.size&&(lo?.(),lo=void 0)}}var Xl=["data-turn","data-message-author-role"],$l=/:(user|assistant)$/,wn=`${d.messageUnit}, ${d.oldMessage}`,xn=e=>e==="user"||e==="assistant",Si=()=>!!document.querySelector(d.timelineScroll),Ne=()=>Si()?V(d.timelineScroll):document;function gt(){if(Si())return V(d.timelineScroll);let e=document.querySelector(d.turn);for(let t=e?.parentElement;t;t=t.parentElement){let{overflowY:o}=getComputedStyle(t);if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight)return t}return document.scrollingElement}var go=e=>e.getAttribute("data-chatgpt-search-unit-key")?.match($l)?.[1]??null,wi=e=>[...e.querySelectorAll(d.searchUnit)].filter(t=>go(t)&&!t.parentElement?.closest(d.searchUnit)),yi=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function pt(e){let t=yi(e);return t.length?t:[...new Set([...e.querySelectorAll(wn)].flatMap(yi))]}function En(e=Ne()){if(!e)return[];let t=wi(e);return t.length?t:[...e.querySelectorAll(wn)].filter(o=>!o.parentElement?.closest(wn))}function _l(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function ec(e){for(let t of Xl){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(xn(o))return o}return e.querySelector(d.markdown)||e.querySelector(d.generatedImage)?"assistant":null}var tc=e=>!e.parentElement?.closest(d.turn);function ho(){let e=Z(h())?.chain??[];return[...Ne()?.querySelectorAll(d.turn)??[]].filter(tc).flatMap(o=>{let n=wi(o),r=n.length?n.map(i=>({el:i,known:go(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=u=>!n.some(m=>m.contains(u))&&x(u.textContent??""),a=[...o.querySelectorAll(d.assistantMarkdown)].find(u=>i(u)&&!po.test(x(u.textContent??""))),c=[...o.querySelectorAll(d.activityHeader)].findLast(i),l=a??c;l&&r.push({el:l,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?pt(o):En(o).flatMap(pt),a=n??ec(o)??_l(i,e)??(r%2?"assistant":"user"),c=o.closest(d.turn)??o,l=!o.closest(d.searchUnit)&&!!c.querySelector(d.turnBusy),u=a==="assistant"&&(o.matches(d.turnBusy)||!!o.querySelector(d.turnBusy)||l);return{el:o,role:a,messageIds:i,streaming:u}})}var oc="[data-bloom], .sr-only",xi=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,po=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,vi=new WeakMap;function bo(e){let o=(e.el.closest(d.turn)??e.el).textContent?.length??0,n=vi.get(e.el);if(n?.length===o)return n.summary;let r=nc(e);return vi.set(e.el,{length:o,summary:r}),r}function qi(e){let t=new Set,o=[];for(let n of e.querySelectorAll(d.assistantMarkdown)){if(n.closest(d.searchUnit))continue;let r=x(n.textContent??"");!r||po.test(r)||xi.test(r)||t.has(r)||(t.add(r),o.push(r))}return o}function nc(e){let t=e.el.querySelectorAll(d.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.closest(d.turn);if(e.role==="assistant"&&o&&e.el.matches(d.assistantMarkdown)&&!e.el.closest(d.searchUnit)){let l=qi(o);if(l.length)return l.join(" \xB7 ")}let n=e.el.querySelector(e.role==="assistant"?d.markdown:".whitespace-pre-wrap")??e.el,i=[...n.querySelectorAll(oc)].map(l=>x(l.textContent??"")).filter(Boolean).reduce((l,u)=>l.replace(u,`
`),n.innerText||n.textContent||""),a=i.split(`
`).map(x).filter(l=>l&&!xi.test(l)&&!po.test(l));if(a.length)return a.join(" ");if(e.role==="assistant"&&o){let l=qi(o);if(l.length)return l.join(" \xB7 ")}let c=i.split(`
`).map(x).filter(l=>po.test(l));return c.length?c.at(-1)??"":e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function Ao(e){return e.text?x(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var Ei=e=>e.matches(d.timelineScroll)&&getComputedStyle(e).flexDirection==="column-reverse";var rc=250,ic=400,ac=6e4,sc=5e3,lc=`:is(${d.turn}) :is(${d.turnBusy})`,y=no(),qo=new Set,Cn=new Set,ue=!1,Ti=0,Ge=null,Ue=!1,yo=!1,ht=0,So=!1,bt=null,Ci=!1,C=()=>({generating:ue,conversationId:h()}),Mi=()=>li()||!!Ne()?.querySelector(lc);function cc(){let e=Mi();return e?yo||(ht=0,So=!0):yo=!1,[...qo].some(t=>!Cn.has(t))||e&&!yo||Date.now()<ht}function uc(){return bt?.error?"error":Ue?"stopped":"done"}function dc(){Ge=null,ue=!1,So=!1,y.emit("fall",{conversationId:h(),outcome:uc()}),Ue=!1,bt=null}function Li(){let e=cc();e&&!ue&&(ue=!0,Ti=Date.now(),Ue=!1,bt=null,y.emit("rise",{conversationId:h()})),e||!ue?Ge=null:Ge==null?Ge=Date.now():Date.now()-Ge>=ic&&dc()}function vo(){Li(),y.emit("tick",C())}function mc({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(ue||Date.now()-Ti<ac);if(!o&&ue){for(let n of qo)Cn.add(n);yo=Mi(),ht=0,So=!1,Ge=null,ue=!1,Ue=!1,bt=null,y.emit("fall",{conversationId:e,outcome:"left"})}y.emit("context",{prevId:e,id:t,migrated:o}),vo()}function fc(e){e.target instanceof Element&&e.target.closest(d.stopButton)&&(Ue=!0,ht=0)}function Bi(){Ci||(Ci=!0,N.on("generate-start",({requestId:e})=>{qo.add(e),vo()}),N.on("generate-end",e=>{qo.delete(e.requestId),!Cn.delete(e.requestId)&&(bt=e,ht=e.handoff&&!e.error&&!Ue&&!So?Date.now()+sc:0,vo())}),ce(mc),document.addEventListener("click",fc,!0),ri(vo,rc),so().then(()=>I(Li)))}var ki={BetterNavigator:1790938999e3,ChatListStatus:1790658944e3,ChatStateFavicons:1790623094e3,Cleaner:1790941026e3,ComposerOpacity:1791032762e3,Continue:1790939902e3,CustomSidebarIdentity:1790658669e3,GreetingCustomizer:1790683467e3,InputHistory:1790658669e3,MessageTimestamps:1790649198e3,NoDictation:1790653816e3,NoShareLink:1790658669e3,NoSidebarIdentity:1790616549e3,PromptQueue:1790711222e3,RecentTopics:1790620238e3,ResponseNotification:1790661368e3,Settings:1790710615e3,SidebarIdentityOpacity:1790682605e3,StreamerMode:1790666245e3,WiderChat:1790616549e3};var A=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,pc="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",gc={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${pc}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:A('<path d="M18 6 6 18M6 6l12 12"/>'),gear:A('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:A('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:A('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:A('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:A('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:A('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:A('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:A('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:A('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:A('<path d="m6 9 6 6 6-6"/>'),play:A('<path d="M7 4v16l13-8z"/>'),plus:A('<path d="M12 5v14M5 12h14"/>'),check:A('<path d="m5 12 5 5 9-10"/>'),alert:A('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:A('<path d="M4 5h16v11H9l-5 4z"/>'),layout:A('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:A('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:A('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:A('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:A('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:A('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:A('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:A('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:A('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:A('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:A('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:A('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:A('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:A('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:A('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),grip:A('<path d="M9 6h0M15 6h0M9 12h0M15 12h0M9 18h0M15 18h0"/>')},G=e=>ni(gc[e]);var de="data-bloom-tip",Tn=6,Mn=8,ve,Ii=null;function Ye(e){if(e===Ii)return;if(Ii=e,!e){ve?.remove();return}ve??=s("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),ve.textContent=e.getAttribute(de),document.body.append(ve);let t=e.getBoundingClientRect(),{width:o,height:n}=ve.getBoundingClientRect(),r=t.bottom+Tn+n<=innerHeight-Mn;ve.style.left=`${se(t.left+t.width/2-o/2,Mn,innerWidth-o-Mn)}px`,ve.style.top=`${r?t.bottom+Tn:t.top-Tn-n}px`}var Ri=e=>e instanceof Element?e.closest(`[${de}]`):null;function Oi(){let e=new AbortController,t={passive:!0,signal:e.signal};return document.addEventListener("pointerover",o=>Ye(Ri(o.target)),t),document.addEventListener("pointerout",o=>o.relatedTarget||Ye(null),t),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&Ye(Ri(o.target)),t),document.addEventListener("focusout",()=>Ye(null),t),document.addEventListener("pointerdown",()=>Ye(null),t),()=>{e.abort(),Ye(null)}}function Ln(e,t,o){let n=s("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o}});return n.addEventListener("click",r=>{r.stopPropagation();let i=n.getAttribute("aria-checked")!=="true";n.setAttribute("aria-checked",String(i)),t(i)}),n}function P(e,t,o){return s("button",{class:zt("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button"},on:{click:t}})}function K(e,t,o,n){let r=s("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":t,[de]:t},on:{click:o}},G(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function wo(e,t,o,n,r,i){let a=s("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});a.value=String(e);let c=s("output",{text:`${a.value}${r}`});return a.addEventListener("input",()=>{c.textContent=`${a.value}${r}`,i(Number(a.value))}),s("div",{class:"bloom-slider"},a,c)}function Bn(e,t,o){let n=s("select",{class:"bloom-select"},...t.map(r=>s("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function At(e,t,o="",n="text"){let r=s("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var hc=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,Di=/\S+@\S+\.\S+/,bc=3,Ac=/^\/g\/(g-p-[^/]+)\//,yc=/^g-p-[0-9a-f]+-?/i,Pi=e=>!!e.closest(".sr-only"),kn=e=>!!e?.querySelector(d.menuButton);function Hi(){return[...document.querySelectorAll(d.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(kn)).filter(e=>e!=null)}function Ni(){let e=[...document.querySelectorAll(d.oldProfile)];if(e.length)return e.map(o=>{let n=o.parentElement?.children.length===1?o.parentElement:o;return{kind:"profile",anchor:n,insert:r=>n.before(r)}});let t=Hi().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(d.rail)){let n=[...o.children].find(kn);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}var In=e=>!e.closest("[data-bloom]")&&(!!e.querySelector("img, [class*=rounded-full]")||Fi(e).some(t=>!Pi(t))),Gi=e=>[...e.parentElement?.children??[]].find(t=>t!==e&&t instanceof HTMLElement&&In(t))??null;function Ui(){let e=[...document.querySelectorAll(d.oldProfile)];return e.length?e:[...Hi(),...[...document.querySelectorAll(d.rail)].map(o=>[...o.children].findLast(kn))].map(o=>[...o?.querySelectorAll(d.menuButton)??[]].findLast(n=>In(n)||Gi(n))).filter(o=>o!=null)}var Yi=()=>Ui().map(e=>In(e)?e:Gi(e)).filter(e=>e!=null);function Fi(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!x(t.textContent??"")&&!(t instanceof SVGElement))}var vc=e=>{if(/rounded-full/.test(e.getAttribute("class")??""))return!0;if(!e.clientWidth)return!1;let{borderRadius:t}=getComputedStyle(e);return t.includes("%")||Number.parseFloat(t)>=e.clientWidth/2};function xo(e,t,o){for(let n of e.querySelectorAll(`[${t}]`))n!==o&&n.removeAttribute(t);o&&!o.hasAttribute(t)&&o.setAttribute(t,"")}function qc(e,t){if(x(e.textContent??"").length>bc)return null;let o=e.closest("button");for(let n=e;n&&n!==t&&n!==o;n=n.parentElement)if(vc(n))return n;return null}function Rn(e,t){e.hasAttribute(`data-bloom-${t}`)||e.setAttribute(`data-bloom-${t}`,"");let o=e.querySelector("img:not([data-bloom] img)"),n=Fi(e),r=o?null:n.map(m=>qc(m,e)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),a=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");xo(e,`data-bloom-${t}-avatar`,a);let c=n.filter(m=>!a?.contains(m)&&!Pi(m)),l=c.find(m=>hc.test(x(m.textContent??""))),u=c.find(m=>Di.test(m.textContent??""));xo(e,`data-bloom-${t}-plan`,l),xo(e,`data-bloom-${t}-email`,u),xo(e,`data-bloom-${t}-name`,c.find(m=>m!==l&&m!==u))}function Sc(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function Eo(){return Ui().map(Sc).find(e=>e!=null)??[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&(Di.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var yt=e=>[...document.querySelectorAll(d.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&Sn(t.href)===e);function Ki(e){let t=yt(e).find(o=>x(o.textContent??""));return t?x(t.textContent??""):null}function Qi(e){let t=new URL(e,location.origin).pathname.match(Ac)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!Sn(n.href)&&x(n.textContent??""));return o?x(o.textContent??""):t.replace(yc,"").replaceAll("-"," ")||null}var On=0,Co;function wc(e){if(!F(e))return;for(let o of Yi())Rn(o,"profile");let t=Eo();t&&Rn(t,"menu")}function _(){On++;let e=!0;return ft().then(()=>{e&&On&&!Co&&(Co=I(wc))}),()=>{e&&(e=!1,!--On&&(Co?.(),Co=void 0))}}var xc=new S("SettingsPanel"),p=M("bloom-settings-"),Ec=10080*60*1e3,Cc=3e3,Wi="Toggle features. Some need a reload. Click the sliders icon to configure.",Tc=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Mc=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],Lc={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},ji=new Set(["chat","ui","privacy"]),U=null,Fe="all",Dn="all",To="",Pn=[],zi=()=>[...Ae.values()].filter(e=>!e.hidden),Bc=e=>!!e.updatedAt&&Date.now()-e.updatedAt<Ec;function kc(e){switch(Fe){case"favorites":return $t.has(e.name);case"recent":return Bc(e);case"all":return!0;case"other":return!e.tags.some(t=>ji.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(Fe)}}function Ic(e){switch(Dn){case"all":return!0;case"enabled":return st(e);case"disabled":return!st(e)}}function Rc(e){let t=To.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function Oc(e){let t=Xt.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return Fe==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var Ji=e=>e.settings?.def??{},Dc=e=>Object.values(Ji(e)).some(t=>t.type!=="custom");function Pc(e,t,o){let n=he(e.name,t)??pn(o),r=i=>be(e.name,t,i);switch(o.type){case"boolean":return Ln(n,r,o.description??t);case"slider":return wo(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return Bn(n,o.options,r);case"string":return At(n,r,o.placeholder);case"number":return At(String(n),i=>r(Number(i)),"","number");case"component":{let i=s("div",{class:p("component")});return Pn.push(o.render(i)),i}case"custom":return null}}var Hc=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function Vi(e){if(!U)return;let t=Object.entries(Ji(e)).filter(([,i])=>i.type!=="custom").map(([i,a])=>{let c=Pc(e,i,a),l=a.type==="boolean",u=a.type!=="component"&&s("div",{class:p("field-label"),text:Hc(i)}),m=a.description&&s("div",{class:p("field-desc"),text:a.description});return s("div",{class:p("field",l?"field-inline":"field-stacked")},(u||m)&&s("div",{class:p("field-text")},u,m),c)}),o,n=P("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},Cc);return}clearTimeout(o),e.settings?.reset(),vt(),Vi(e)},"danger"),r=s("div",{class:p("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&vt()}},s("div",{class:p("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},s("div",{class:p("popup-header")},s("div",{class:p("card-icon")},G(e.icon)),s("div",{class:p("popup-title")},s("div",{class:p("card-name"),text:e.name}),s("div",{class:p("popup-authors"),text:e.authors.join(", ")})),K("close","Close",vt)),s("p",{class:p("popup-desc"),text:e.description}),s("div",{class:p("fields")},...t),s("div",{class:p("popup-footer")},n)));U.querySelector(`.${p("modal")}`)?.append(r)}function vt(){for(let e of Pn)e();Pn=[],U?.querySelector(`.${p("popup-backdrop")}`)?.remove()}function Nc(e){let t=st(e),o=$t.has(e.name),n=Xt.has(e.name);return s("div",{class:p("card",t?"card-on":"card-off")},s("div",{class:p("card-top")},s("div",{class:p("card-icon")},G(e.icon)),s("div",{class:p("card-actions")},K("star",o?"Unstar":"Star",()=>{$t.toggle(e.name),qe()},o),K("pin",n?"Unpin":"Pin to top",()=>{Xt.toggle(e.name),qe()},n),Dc(e)&&K("gear","Settings",()=>Vi(e)),e.required?null:Ln(t,r=>_r(e,r),`Enable ${e.name}`))),s("div",{class:p("card-name"),text:e.name}),s("div",{class:p("card-desc"),text:e.description,title:e.description}),s("div",{class:p("card-footer"),text:e.authors.join(", ")}))}function Zi(){let e=zi().some(o=>!o.tags.some(n=>ji.has(n)));U?.querySelector(`.${p("tabs")}`)?.replaceChildren(...Tc.filter(o=>o.id!=="other"||e).map(o=>s("button",{class:p("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===Fe)},on:{click:()=>{Fe=o.id,Zi(),qe()}}})))}function qe(){if(!U)return;let e=zi().filter(kc),t=U.querySelector(`.${p("search")} input`);t&&(t.placeholder=`Search ${Wt(e.length,"plugin")}...`);let o=Oc(e.filter(i=>Rc(i)&&Ic(i))),n=U.querySelector(`.${p("grid")}`),r=To.trim()?"No plugins match your search.":Lc[Fe]??"No plugins available.";n?.replaceChildren(...o.length?o.map(Nc):[s("div",{class:p("empty"),text:r})])}function Gc(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),U?.querySelector(`.${p("popup-backdrop")}`)?vt():Ke())}var Xi,Hn;function Uc(){if(U)return;let e=s("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=To,e.addEventListener("input",()=>{To=e.value,qe()}),U=s("div",{class:`bloom-root ${p("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&Ke()}},s("div",{class:p("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},s("div",{class:p("header")},s("div",{class:p("logo")},G("bloom")),s("h2",{class:p("title"),text:"Bloom++"}),s("span",{class:p("hint"),attrs:{"aria-label":Wi,tabindex:"0",[de]:Wi}},G("info")),s("span",{class:p("version"),text:"v2.0.51"}),K("close","Close",Ke)),s("div",{class:p("tabs"),attrs:{role:"tablist"}}),s("div",{class:p("toolbar")},s("label",{class:p("search")},G("search"),e),Bn(Dn,Mc,t=>{Dn=t,qe()})),s("div",{class:p("grid")}))),U.addEventListener("keydown",t=>t.stopPropagation()),Hn=new AbortController,document.addEventListener("keydown",Gc,{capture:!0,signal:Hn.signal}),document.body.append(U),Zi(),qe(),Xi=ei(qe),e.focus(),xc.debug("Opened")}function Ke(){vt(),Hn?.abort(),Xi?.(),U?.remove(),U=null}var Mo=()=>U?Ke():Uc();var $i=`/*
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
`;var me=M("bloom-entry-"),Fc=4,Nn="--bloom-entry-x",Gn=1,Qe=g({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar. The account menu and the userscript menu always open the panel.",default:!1},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:!0},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:e=>(e.append(P("Reset position",()=>{Qe.store.entryPosition=Gn})),()=>e.replaceChildren())},entryPosition:{type:"custom",default:Gn}}),Se=new Map,_i=!1,ea=[];function Kc(e,t,o){let n=e.currentTarget,r=t.clientWidth-n.offsetWidth;if(e.button!==0||r<=0||!t.classList.contains(me("hover")))return;let i=Qe.store.entryPosition,a=i,c=!1,l=new AbortController;n.setPointerCapture(e.pointerId),n.addEventListener("pointermove",m=>{!c&&Math.abs(m.clientX-e.clientX)<Fc||(c=!0,o(),a=se(i+(m.clientX-e.clientX)/r,0,Gn),t.style.setProperty(Nn,String(a)))},{signal:l.signal});let u=()=>{l.abort(),c&&(Qe.store.entryPosition=a,t.style.removeProperty(Nn))};n.addEventListener("pointerup",u,{signal:l.signal}),n.addEventListener("lostpointercapture",u,{signal:l.signal})}function Qc(e){let t=!1,o=s("button",{class:me("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),t||Mo(),t=!1},pointerdown:r=>{t=!1,e!=="rail"&&Kc(r,n,()=>{t=!0})}}},G("bloom"),e!=="rail"&&s("span",{class:me("label"),text:"Bloom++"})),n=s("div",{class:`bloom-root ${me("wrap")} ${me(e)}`,attrs:{"data-bloom":"entry"}},o);return n}function Wc(e){let t=s("div",{class:`bloom-root ${me("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),Mo()}}},G("bloom"),s("span",{text:"Bloom++"})),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function ta(){let{showSidebarEntry:e,showSidebarEntryOnHover:t}=Qe.store,o=e||t?Ni():[];for(let[r,i]of Se)r.isConnected&&o.some(a=>a.anchor===r)||(i.remove(),Se.delete(r));for(let r of o){let i=Se.get(r.anchor);if(i?.isConnected||!He(r.anchor))continue;let a=i??Qc(r.kind);Se.set(r.anchor,a),r.insert(a)}for(let r of Se.values())r.classList.toggle(me("hover"),!e);let n=Eo();n&&!n.querySelector('[data-bloom="menu-entry"]')&&Wc(n)}var oa=f({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:Qe,styles:()=>`${$i}.${me("hover")}{${Nn}:${Qe.store.entryPosition}}`,start(){ea=[I(ta),Oi(),_()],!_i&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",Mo),_i=!0)},stop(){for(let e of ea)e();for(let e of Se.values())e.remove();Se.clear(),Ke()},onSettingsChange:ta});var na=`/*
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
`;var T=M("bloom-nav-"),Bo=80,zc=1200,Jc=2,ra=3e4,Vc=200,Zc=.9,Xc=.3,$c=12,_c={user:"\u2753",assistant:"\u{1F916}"},eu=["wheel","touchmove","pointerdown"],ko=g({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),R=null,O=[],we=-1,xe=-1,We=null,Lo="",Yn=0,ia=[],xt=null,qt,Fn="",St=[],tu=e=>ko.store.showAssistant||e.role==="user",ou=e=>e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.messageIds[0]||e.role;function nu(e){return{role:e.role,summary:bo(e),ids:e.messageIds,turn:e,streaming:e.streaming}}function ca(e,t){let o=e.entries.at(-1);if(o?.role==="assistant"&&t.role==="assistant"){e.entries[e.entries.length-1]={...t,ids:[...new Set([...o.ids,...t.ids])]};return}e.entries.push(t)}function ru(){let e=[];for(let t of ho()){let o=nu(t),n=ou(t),r=e.at(-1);r?.key===n?ca(r,o):e.push({key:n,entries:[o]})}return e}function iu(){let e=[];for(let t of Z(h())?.chain??[]){let o={role:t.role,summary:Ao(t),ids:[t.id],turn:null,streaming:!1},n=e.at(-1);t.role==="assistant"&&n?ca(n,o):e.push({key:t.id,entries:[o]})}return e}var aa=e=>e.entries.flatMap(t=>t.ids);function Kn(e,t){let o=new Set(aa(e));return aa(t).some(n=>o.has(n))}var Ee=e=>x(e.entries.find(t=>t.role==="user")?.summary??""),Un=(e,t)=>e.filter(o=>Ee(o)===t).length,Qn=e=>({...e,turn:null,streaming:!1});function au(e,t){let o=new Set(t.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return e.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return Qn(r);let a=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return a&&a!==n.key?Qn(r):r})}))}function su(e,t){let o=t.entries.map((n,r)=>{let i=e.entries[r];if(!i)return n;let a=[...new Set([...n.ids,...i.ids])];return{...n,ids:a,summary:n.summary||i.summary}});for(let n of e.entries.slice(o.length))o.push(Qn(n));return{key:e.key,entries:o}}function ua(){let e=gt();if(!e)return!1;let t=e.clientHeight-e.scrollHeight;return e.scrollTop-t<=Math.abs(e.scrollTop)}function lu(e,t){let o=au(e,t);if(!t.length)return o;if(!o.length)return t;let n=t.findIndex(l=>o.some(u=>u.key===l.key));if(n<0)return ua()?t.concat(o):o.concat(t);let r=t[n]?.key,i=o.findIndex(l=>l.key===r),a=o.slice(0,i).concat(t.slice(0,n),o.slice(i)),c=a.findIndex(l=>l.key===r);for(let l=n;l<t.length;l++){let u=t[l];if(!u)continue;let m=a.findIndex(v=>v.key===u.key);if(m>=0){let v=a[m];v&&(a[m]=su(v,u)),c=m}else a.splice(c+1,0,u),c++}return a}function cu(e,t){let o=0,n=0,r=0;for(let i=1-e.length;i<t.length;i++){let a=0,c=0;for(let u=0;u<e.length;u++){let m=t[u+i],v=e[u];!m||!v||(Kn(v,m)?(a+=3,c++):Ee(v)&&Ee(v)===Ee(m)&&a++)}let l=ua()?i<r:i>r;(a>o||a===o&&c>n||a===o&&c===n&&l)&&(o=a,n=c,r=i)}return{score:o,offset:r}}function uu(e,t){let o=e.entries.map((n,r)=>{let i=t.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of t.entries.slice(o.length))o.push({...n,turn:null});return{key:e.key,entries:o}}function du(e){return e.map(t=>({key:t.key,entries:t.entries.map(o=>({...o}))}))}function mu(e,t){if(!t.length)return e;if(!e.length)return t;let{score:o,offset:n}=cu(e,t),r=du(e);if(o>0)for(let c=0;c<r.length;c++){let l=t[c+n],u=r[c];if(!l||!u)continue;let m=Ee(u),v=!!m&&m===Ee(l)&&Un(e,m)===1&&Un(t,m)===1;(Kn(u,l)||v)&&(r[c]=uu(u,l))}let i=[],a=[];for(let c=0;c<t.length;c++){let l=t[c];if(!l)continue;let u=Ee(l);!u||Un(r,u)>0||r.some(m=>Kn(m,l))||(o>0&&c<n?i.push(l):a.push(l))}return i.concat(r,a)}function fu(){let e=h()??"";return e!==Fn&&(Fn=e,St=[]),St=mu(lu(St,ru()),iu()),St.flatMap(t=>t.entries).filter(tu)}function pu(e){for(let o of e)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!C().generating||e.some(o=>o.streaming))return;let t=e.at(-1);t&&(t.role==="assistant"||!ko.store.showAssistant?t.streaming=!0:e.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function da(){let e=fu();return pu(e),e}function gu(e){let t=e.getBoundingClientRect(),o=t.top+t.height*Xc,n=-1;return O.forEach((r,i)=>{let a=r.turn?.el.getBoundingClientRect();a&&a.top<=o&&(n=i)}),n===-1?O.findIndex(r=>r.turn):n}function sa(e){ko.store.jumpEffect==="border"&&(e.classList.add(T("flash")),setTimeout(()=>e.classList.remove(T("flash")),zc))}function Io(e){let t=O[e],o=gt();if(!t||!o)return;if(!t.turn&&!t.ids.length){xe=e,wt(),o.scrollTo({top:Ei(o)?0:o.scrollHeight});return}xe=e,We=e?null:{chat:h(),first:t.ids[0],until:Date.now()+ra},wt();let n=t.turn?.el;if(n?.isConnected){let u=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:u<o.clientHeight*Jc?"smooth":"auto"}),sa(n);return}let r=O.findIndex(u=>u.turn),i=r>=0&&e<r?-1:1,a=++Yn,c=Date.now()+ra,l=()=>{let u=gt();if(a!==Yn||Date.now()>c||!u)return;O=da();let m=O.find(Y=>Y.ids.some(b=>t.ids.includes(b)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),sa(m),xe=O.findIndex(Y=>Y.turn?.el===m),wt();return}let v=u.scrollTop;u.scrollBy({top:i*u.clientHeight*Zc,behavior:"instant"}),u.scrollTop===v?setTimeout(l,Vc):requestAnimationFrame(l)};l()}function hu(e,t){return s("button",{class:T("row"),attrs:{type:"button","data-index":String(t)},on:{click:()=>Io(t)}},s("span",{text:_c[e.role]}),s("span",{class:"bloom-truncate",text:le(e.summary||"\u2026",Bo)}))}function bu(){let e=gt();if(O=da(),!O.length||!e){R?.remove(),R=null,Lo="";return}if(xt!==e){qt?.abort(),qt=new AbortController,e.addEventListener("scroll",Oe(wt),{passive:!0,signal:qt.signal});for(let r of eu)e.addEventListener(r,ma,{passive:!0,signal:qt.signal});xt=e}R??=s("div",{class:`bloom-root ${T("root")}`,attrs:{"data-bloom":"navigator"}},s("div",{class:T("rail")}),s("div",{class:T("toc")},s("div",{class:T("toc-head")}),s("div",{class:T("toc-list")}))),R.isConnected||document.body.append(R);let t=e.getBoundingClientRect(),o=Math.min(t.bottom,mt()?.getBoundingClientRect().top??t.bottom);R.style.right=`${document.documentElement.clientWidth-t.left-e.clientLeft-e.clientWidth+$c}px`,R.style.top=`${(t.top+o)/2}px`;let n=JSON.stringify(O.map(r=>[r.role,r.ids]));n!==Lo?(Lo=n,xe=-1,yu(),We&&Date.now()<We.until&&We.chat===h()&&O[0]?.ids[0]!==We.first&&Io(0)):Au(),wt()}function wt(){if(!R||!xt)return;we=xe>=0?xe:gu(xt),R.querySelectorAll(`.${T("tick")}`).forEach((t,o)=>t.classList.toggle(T("tick-current"),o===we)),R.querySelectorAll(`.${T("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===we)));let e=R.querySelector(`.${T("toc-head")}`);e&&(e.textContent=`${we+1} / ${O.length}`)}function Au(){R?.querySelectorAll(`.${T("tick")}`).forEach((e,t)=>{let o=O[t],n=le(o.summary,Bo);e.title!==n&&(e.title=n),e.classList.toggle(T("tick-streaming"),o.streaming)}),R?.querySelectorAll(`.${T("row")}`).forEach(e=>{let t=e.lastElementChild,o=le(O[Number(e.dataset.index)].summary||"\u2026",Bo);t&&t.textContent!==o&&(t.textContent=o)})}function yu(){R?.querySelector(`.${T("rail")}`)?.replaceChildren(...O.map((e,t)=>s("button",{class:zt(T("tick"),T(`tick-${e.role}`),e.streaming&&T("tick-streaming"),t===we&&T("tick-current")),title:le(e.summary,Bo),attrs:{type:"button","aria-label":`Jump to message ${t+1}`},on:{click:()=>Io(t)}}))),R?.querySelector(`.${T("toc-list")}`)?.replaceChildren(...O.map(hu))}var oe=Oe(bu);function ma(){xe=-1,We=null,Yn++}var vu=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function la(e){if(!R||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||vu(document.activeElement)||document.querySelector("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:we-1,ArrowDown:we+1,Home:0,End:O.length-1}[e.key];if(o==null){ma();return}o<0||o>=O.length||(e.preventDefault(),e.stopPropagation(),Io(o))}var fa=f({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:ko,styles:na,start(){ia=[I(e=>F(e)&&oe()),ce(oe),N.on("conversation",oe),y.on("rise",oe),y.on("fall",oe)],addEventListener("keydown",la,!0),addEventListener("resize",oe,{passive:!0}),oe()},stop(){for(let e of ia)e();qt?.abort(),xt=null,removeEventListener("keydown",la,!0),removeEventListener("resize",oe),R?.remove(),R=null,Lo="",St=[],Fn=""},onSettingsChange:oe});var pa=`/*
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
`;var Su=M("bloom-cls"),wu="bloom-cls",xu=600*1e3,jn=kr("tab"),ze=new Map,Ct=new Map,je=null,ga=[],Eu=e=>e==="streaming"||e==="error";function Cu(){let e=new Map,t=Date.now();for(let[o,n]of Ct)t-n.at>xu?Ct.delete(o):e.set(o,n.status);for(let[o,n]of ze)e.set(o,n);return e}function Tu(e){return s("span",{class:`bloom-root ${Su("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&G("alert"))}function Et(){let e=Cu(),t=new Set;for(let[o,n]of e)for(let r of yt(o)){if(!He(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let a=Tu(n);t.add(a),r.append(a)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function Ro(e,t){e&&(t?ze.set(e,t):ze.delete(e),je?.postMessage({tab:jn,id:e,status:t}),Et())}function Mu({data:e}){!w(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===jn||(Eu(e.status)?Ct.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):Ct.delete(e.id),Et())}function Wn(){for(let e of ze.keys())je?.postMessage({tab:jn,id:e,status:null})}var ha=f({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:pa,start(){je=typeof BroadcastChannel=="function"?new BroadcastChannel(wu):null,je?.addEventListener("message",Mu),addEventListener("pagehide",Wn),ga=[y.on("rise",({conversationId:e})=>Ro(e,"streaming")),y.on("fall",({conversationId:e,outcome:t})=>Ro(e,t==="error"?"error":null)),y.on("context",({prevId:e,id:t,migrated:o})=>{o&&C().generating?Ro(t,"streaming"):!o&&ze.get(e??"")==="streaming"&&Ro(e,null)}),I(e=>F(e)&&Et())],h()&&Et()},stop(){for(let e of ga)e();Wn(),je?.close(),je=null,removeEventListener("pagehide",Wn),ze.clear(),Ct.clear(),Et()}});var Aa=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],Po={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Lu={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Bu="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",zn=32,Ho=64,Jn="#FCFCFC",Vn="#111111",ku=14,No=51.5,Iu=12.5,Ru=9.75,ba=52,Ou=10.5,Du=7.75,Pu={rotate:e=>e.arc(No,No,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function Oo(e){let t=document.createElement("canvas");t.width=t.height=zn;let o=t.getContext("2d");return o?(o.scale(zn/Ho,zn/Ho),e(o),t.toDataURL("image/png")):""}function Do(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D(Bu);o&&(e.strokeStyle=Vn,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function Go(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function Hu(e,t){Go(e,No,Iu,Vn),Go(e,No,Ru,Po[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),Pu[t](e),e.stroke()}function Nu(e,t){e.beginPath(),e.roundRect(0,0,Ho,Ho,ku),e.fillStyle=t,e.fill()}var Gu=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function ya(e,t){switch(e){case"original":return Gu(Lu[t]);case"hole":return Oo(o=>Do(o,Po[t],!0));case"bg":return Oo(o=>{Nu(o,Po[t]),Do(o,Jn,!1)});case"dot":return Oo(o=>{Do(o,Jn,!0),Go(o,ba,Ou,Vn),Go(o,ba,Du,Po[t])});case"badge":return Oo(o=>{Do(o,Jn,!0),Hu(o,t)})}}var Mt="bloom-chat-state-favicon",Lt="data-bloom-rel",$n="data-bloom-media",va="bloom-parked-icon",Uu="/favicon.ico",Sa=g({style:{type:"select",description:"How the tab icon shows the chat state.",options:Aa,default:"bg"}}),fe=null,wa="",Uo=null,xa="",qa=new Map,_n,Zn=[],Ea=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${Lt}]`)];function er(){for(let e of Ea())e.id!==Mt&&(e.hasAttribute(Lt)||(xa||=e.href,e.setAttribute(Lt,e.rel),e.setAttribute($n,e.getAttribute("media")??"")),e.rel!==va&&(e.rel=va),e.media!=="not all"&&(e.media="not all"))}function Yu(){for(let e of Ea()){let t=e.getAttribute(Lt);if(t==null)continue;e.rel=t;let o=e.getAttribute($n);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(Lt),e.removeAttribute($n)}}function Ca(){let e=document.getElementById(Mt);return e||(e=document.createElement("link"),e.id=Mt,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function Fu(e){if(e==="wait")return xa||Uu;let t=Sa.store.style,o=`${t}:${e}`,n=qa.get(o);return n||qa.set(o,n=ya(t,e)),n}function Xn(e){if(e)return"rotate";let t=B();return fe&&t&&t!==wa&&(fe=null),fe==="error"?"error":fe==="done"?"done":t?"ready":"wait"}function Tt(e,t=!1){if(e===Uo&&!t)return;Uo=e;let o=Ca(),n=Fu(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function Ku(){_n=new MutationObserver(()=>{er(),document.head.lastElementChild?.id!==Mt&&Ca()}),_n.observe(document.head,{childList:!0})}var Ta=f({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"HostReady",settings:Sa,start(){er(),Tt(Xn(C().generating),!0),Ku(),Zn=[y.on("rise",()=>{fe=null,Tt("rotate")}),y.on("fall",({outcome:e})=>{fe=e==="done"||e==="error"?e:null,wa=B(),Tt(Xn(!1))}),y.on("context",({migrated:e})=>{e||(fe=null)}),y.on("tick",({generating:e})=>{er(),Tt(Xn(e))})]},stop(){for(let e of Zn)e();Zn=[],_n?.disconnect(),document.getElementById(Mt)?.remove(),Yu(),Uo=null,fe=null},onSettingsChange(){Tt(Uo??"wait",!0)}});var Qu={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${d.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])']},Ma=g({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0}}),La=f({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads and notices.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:Ma,styles:()=>ke(Object.entries(Qu).flatMap(([e,t])=>Ma.store[e]?t:[]))});var Je=`form:has(:is(${d.composerInput})), ${d.oldComposerForm}`,Yo='[class*="ComposerLayoutBody"]',tr='[class*="ComposerLayoutRoot"]',Wu='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',ju=`:is(${Je}) ${Yo}, :is(${Je}):not(:has(${Yo})) ${tr}, :is(${Je}):not(:has(${Yo})):not(:has(${tr})) :is(${Wu})`,zu='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',Ju='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',Vu="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))",Ba=g({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function Zu(){let{opacity:e,blur:t}=Ba.store;if(e>=100)return"";let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${Vu} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important;-webkit-backdrop-filter:blur(${t}px)!important`;return`:is(${zu}), :is(${Je}){${o}}:is(${Ju}){display:none!important}${ju}{${n}}:is(${Je}):has(${Yo}) ${tr}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}:is(${Je}) :is(${d.composerInput}){background-color:transparent!important}`}var ka=f({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:Ba,styles:Zu});var Xu=1200,$u=8e3,_u=150,ed=20,Ia=6,rr="continue where you left",td=/message delivery timed out|please try again/i,Ra=/waiting for the complete answer/i,Oa=g({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:rr,placeholder:rr}}),or=[],Ko=0,Bt=!1,kt=0,Ze="",Fo="",ir=0,Xe=!1,It=!1,Qo=!0,Ve="",ar=0,Wo=!1,od=()=>Oa.store.prompt.trim()||rr;function Da(){return(V(d.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function Pa(){let e=Da();return!e||Ra.test(e)||!td.test(e)?"":e}function nd(){let e=Da();return e&&Ra.test(e)?e:""}function rd(){let e=Ne()?.querySelectorAll(d.turn),t=e?.[e.length-1];return`${t?.getAttribute("data-turn-key")??""}:${t?.textContent?.length??0}`}function Ha(e,t,o){if(o===Ko){if(C().generating||B()!==e||t>=ed){Xe=!1,C().generating||(Ze="");return}ro(),setTimeout(()=>Ha(e,t+1,o),_u)}}function id(e){let t=Ko;if(C().generating||B()&&B()!==e){Xe=!1,Ze="";return}$(e),Wo=!0,ut(()=>{t===Ko&&Ha(e,0,t)})}function Na(e){return e===Ze||kt>=Ia||C().generating||B()?!1:(Ze=e,kt+=1,Xe=!0,id(od()),!0)}function ad(){if(Bt||Xe||It)return;let e=Date.now(),t=Pa();if(t){if(Ve="",t!==Fo){Fo=t,ir=e;return}if(e-ir<Xu)return;Na(`${h()??""}:${t}`);return}if(Fo="",!nd()){Qo=!0,Ve="";return}if(!Qo||!C().generating||B())return;let n=`${h()??""}:${rd()}`;if(n!==Ve){Ve=n,ar=e;return}if(e-ar<$u||kt>=Ia)return;let r=Pe();r&&(It=!0,r.click())}function nr(){Ko+=1,Bt=!1,kt=0,Ze="",Fo="",ir=0,Xe=!1,It=!1,Qo=!0,Ve="",ar=0,Wo=!1}var Ga=f({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:Oa,start(){nr(),or=[y.on("rise",()=>{Bt=!1,Ze="",Xe=!1,Wo&&(Wo=!1,Qo=!1,Ve="")}),y.on("fall",({outcome:e})=>{if(It){It=!1,e==="left"?Bt=!0:Na(`${h()??""}:stall`);return}(e==="stopped"||e==="left")&&(Bt=!0),e==="done"&&!Pa()&&(kt=0)}),y.on("context",({migrated:e})=>{e||nr()}),y.on("tick",ad)]},stop(){for(let e of or)e();or=[],nr()}});var ne=M("bloom-csi-"),sd=256,ld=160,jo=1,Ua=4,cd=.1,ud=.0015,dd=250;function md(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function fd(e){return new Promise((t,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function pd(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:se(t.x,n,1-n),y:se(t.y,r,1-r)}}function Ya(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function gd(e,t){let o=s("canvas");return o.width=o.height=sd,Ya(o,e,t),o.toDataURL("image/png")}function Fa(e){let t=null,o={x:k.store.cropX,y:k.store.cropY,zoom:k.store.cropZoom},n,r=s("canvas",{class:ne("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=ld*devicePixelRatio;let i=s("div",{class:`bloom-muted ${ne("status")}`}),a=s("div",{class:ne("zoom")}),c=s("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(b,H=!0){t&&(o=pd(t,b),Ya(r,t,o),H&&(clearTimeout(n),n=setTimeout(()=>{t&&(k.store.cropX=o.x,k.store.cropY=o.y,k.store.cropZoom=o.zoom,k.store.avatarUrl=gd(t,o))},dd)))}function u(){a.replaceChildren(wo(o.zoom,jo,Ua,cd,"\xD7",b=>l({...o,zoom:b})))}async function m(b,H){i.textContent="";try{t=await fd(b),H&&(k.store.avatarSource=b,o={x:.5,y:.5,zoom:jo}),e.classList.add(ne("has-image")),u(),l(o,H)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let v=b=>{b?.type.startsWith("image/")&&md(b).then(H=>m(H,!0))};c.addEventListener("change",()=>v(c.files?.[0])),r.addEventListener("wheel",b=>{t&&(b.preventDefault(),l({...o,zoom:se(o.zoom*(1-b.deltaY*ud),jo,Ua)}),u())},{passive:!1}),r.addEventListener("pointerdown",b=>{if(!t)return;r.setPointerCapture(b.pointerId);let H={...o},ot=r.getBoundingClientRect(),Kt=Qt=>{if(!t)return;let j=Math.max(ot.width/t.naturalWidth,ot.height/t.naturalHeight)*o.zoom;l({...o,x:H.x-(Qt.clientX-b.clientX)/(t.naturalWidth*j),y:H.y-(Qt.clientY-b.clientY)/(t.naturalHeight*j)})};r.addEventListener("pointermove",Kt),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",Kt),{once:!0})});let Y=s("div",{class:ne("cropper"),attrs:{tabindex:"0"},on:{paste:b=>v([...b.clipboardData?.files??[]].find(H=>H.type.startsWith("image/"))),dragover:b=>b.preventDefault(),drop:b=>{b.preventDefault(),v(b.dataTransfer?.files[0])}}},s("div",{class:ne("stage")},r),s("div",{class:ne("controls")},At("",b=>b.trim()&&void m(b.trim(),!0),"https://\u2026 or data:image/\u2026","url"),s("div",{class:ne("buttons")},P("Choose file",()=>c.click()),P("Reset crop",()=>{l({x:.5,y:.5,zoom:jo}),u()}),P("Clear",()=>{t=null,e.classList.remove(ne("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),a.replaceChildren(),k.store.avatarUrl="",k.store.avatarSource=""},"danger")),a,i,c));return e.append(Y),k.store.avatarSource&&m(k.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var Ka=`/*
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
`;var Rt="data-bloom-csi-avatar",sr="data-bloom-csi-sized",za="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",bd=32,k=g({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>Fa(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),Qa=[];function Ja(e){e.removeAttribute(Rt),e.removeAttribute(sr)}function Wa(e){return(k.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function ja(e=[]){if(!F(e))return;let t=k.store.displayName.trim()||null,o=!!k.store.avatarUrl,n=new Set(t?Wa("name"):[]);for(let i of document.querySelectorAll(za))n.has(i)||ye(i,null);for(let i of n)ye(i,t);let r=new Set(o?Wa("avatar"):[]);for(let i of document.querySelectorAll(`[${Rt}]`))r.has(i)||Ja(i);for(let i of r)i.hasAttribute(Rt)||i.setAttribute(Rt,""),i.toggleAttribute(sr,!i.closest('[role="menu"]'))}function Ad(){let e=k.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${k.store.avatarSize}px}:is(${d.rail}, ${d.oldRail}) [${sr}]{--bloom-csi-size:${bd}px}`:""}var Va=f({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:k,styles:()=>`${Ad()}
${Ka}`,start(){Qa=[_(),I(ja)]},stop(){for(let e of Qa)e();for(let e of document.querySelectorAll(`[${Rt}]`))Ja(e);for(let e of document.querySelectorAll(za))ye(e,null)},onSettingsChange(){ja()}});var $e=M("bloom-greeting-"),Za=30,Xa=100;function $a(e){let t=-1,o=s("textarea",{class:`bloom-input ${$e("input")}`,attrs:{maxlength:String(Xa),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=P("Add",i),r=s("div",{class:$e("list")});function i(){let l=o.value.trim().slice(0,Xa);if(!l)return;let u=[...E.store.greetings];t>=0?u[t]=l:u.length<Za&&u.push(l),E.store.greetings=u,t=-1,o.value="",a()}function a(){let{greetings:l}=E.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&l.length>=Za,r.replaceChildren(...l.length?l.map((u,m)=>s("div",{class:$e("row",m===t?"row-editing":"row-idle")},s("div",{class:$e("text"),text:u}),K("edit","Edit",()=>{t=m,o.value=u,o.focus(),a()}),K("trash","Delete",()=>{E.store.greetings=l.filter((v,Y)=>Y!==m),t===m&&(t=-1),a()}))):[s("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),e.append(s("div",{class:$e("editor")},r,s("div",{class:$e("form")},o,n))),a();let c=Re((l,u)=>l==="GreetingCustomizer"&&u==="greetings"&&a());return()=>{c(),e.replaceChildren()}}var _a=`/*
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
`;var Jo="data-bloom-greeting",vd=1e3,qd=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],E=g({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>$a(e)},greetings:{type:"custom",default:qd},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),zo,es=[],lr,Vo=()=>mo()&&!fo(),ts=()=>E.store.greetings.filter(e=>typeof e=="string"&&e.trim());function Dt(){let e=ts();if(e.length)if(E.store.order==="random"&&e.length>1){let t=E.store.lastRandom;for(;t===E.store.lastRandom;)t=Math.floor(Math.random()*e.length);E.store.lastRandom=t,E.store.index=t}else E.store.index=(E.store.index+1)%e.length}function Sd(){return Vo()?V(d.homeHeading):null}function os(){for(let e of document.querySelectorAll(`[${Jo}]`))e.removeAttribute(Jo),ye(e,null)}function Ot(){let e=ts(),t=Sd();if(!t||!e.length){os();return}(E.store.index<0||E.store.index>=e.length)&&Dt(),t.setAttribute(Jo,""),ye(t,e[Math.max(0,E.store.index)%e.length])}function cr(){clearInterval(zo),zo=void 0,E.store.mode==="interval"&&Vo()&&(zo=setInterval(()=>{Dt(),Ot()},E.store.intervalSec*vd))}function wd(e){E.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${Jo}]`)||getSelection()?.toString()||(Dt(),Ot())}function xd(){Vo()&&E.store.mode==="refresh"&&Dt(),cr(),Ot()}var ns=f({name:"GreetingCustomizer",description:"Replace the \u201CWhat can I help with?\u201D heading on the home page with your own lines.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:E,styles:_a,start(){lr=new AbortController,document.addEventListener("click",wd,{signal:lr.signal}),Vo()&&E.store.mode==="refresh"&&Dt(),cr(),es=[I(e=>F(e)&&Ot()),ce(xd)]},stop(){lr?.abort();for(let e of es)e();clearInterval(zo),os()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&cr(),Ot()}});var Pt=M("bloom-history-"),ur=10,Ed=3e3;function rs(e){let t="",o=0,n=new Set,r=s("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),i=s("div",{class:Pt("list")}),a=s("div",{class:Pt("pager")}),c,l=P("Clear all",()=>{if(!c){l.textContent="Click again to clear",c=setTimeout(()=>{c=void 0,l.textContent="Clear all"},Ed);return}clearTimeout(c),c=void 0,l.textContent="Clear all",Ht([])},"danger");function u(){let v=[...Ce.store.entries].toReversed(),Y=t.trim().toLowerCase(),b=Y?v.filter(j=>j.toLowerCase().includes(Y)):v,H=Math.max(1,Math.ceil(b.length/ur));o=Math.min(o,H-1);let ot=b.slice(o*ur,(o+1)*ur).map(j=>s("div",{class:Pt("row")},s("button",{class:Pt("text",n.has(j)?"text-open":"text-closed"),text:j,title:n.has(j)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{n.delete(j)||n.add(j),u()}}}),K("copy","Copy",()=>void Ir(j)),K("trash","Delete",()=>Ht(Ce.store.entries.filter(rl=>rl!==j)))));i.replaceChildren(...ot.length?ot:[s("div",{class:"bloom-muted",text:Y?"No matching prompts.":"No saved prompts yet."})]),a.replaceChildren(s("span",{class:"bloom-muted",text:`${b.length} ${Y?"matching":"saved"} \xB7 page ${o+1} of ${H}`}),P("Previous",()=>{o--,u()}),P("Next",()=>{o++,u()}),l);let[Kt,Qt]=a.querySelectorAll("button");Kt.disabled=o===0,Qt.disabled=o>=H-1,l.disabled=!v.length}r.addEventListener("input",()=>{t=r.value,o=0,u()}),e.append(s("div",{class:Pt("manager")},r,i,a)),u();let m=Re((v,Y)=>v==="InputHistory"&&Y==="entries"&&u());return()=>{m(),clearTimeout(c),e.replaceChildren()}}var is=`/*
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
`;var Td=M("bloom-history-"),Md=2e3,Ce=g({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>rs(e)},entries:{type:"custom",default:[]}}),W=null,dr={text:"",at:0},Te=null,mr,Zo=()=>Ce.store.entries.filter(e=>typeof e=="string");function Ht(e){Ce.store.entries=e.slice(-Ce.store.maxEntries)}function fr(e){let t=e.trim();if(!t)return;let o=Date.now();t===dr.text&&o-dr.at<Md||(dr={text:t,at:o},Ht([...Zo().filter(n=>n!==t),t]))}function Ld(e,t){let o=De();if(!o)return;Te??=s("div",{class:`bloom-root ${Td("hud")}`,attrs:{"data-bloom":"history-hud","aria-live":"polite"}}),Te.textContent=`${e+1} / ${t}`;let n=(o.closest("form")??o).getBoundingClientRect();Te.style.left=`${n.left+n.width/2}px`,Te.style.top=`${n.top}px`,Te.isConnected||document.body.append(Te)}function Nt(){W=null,Te?.remove()}function Bd(e){let t=Zo();if(!W)return;let o=t[e];W.index=e,W.shown=o,$(o),Ld(t.length-1-e,t.length)}function kd(e){let t=Zo();if(!t.length)return!1;if(!W){if(e===1)return!1;W={index:t.length,draft:B(),shown:""}}let o=W.index+e;return o<0?!0:o>=t.length?($(W.draft),Nt(),!0):(Bd(o),!0)}function Id(e){if(e.isComposing||!dt(e.target))return;let t=e.target;if(e.key==="Enter"&&!e.shiftKey){fr(B(t)),Nt();return}if(e.key==="Escape"&&W){$(W.draft),Nt(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey)return;let o=ai(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!W||kd(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function Rd(e){W&&dt(e.target)&&B(e.target)!==W.shown.trim()&&Nt()}function Od(e){e.target instanceof Element&&e.target.closest(d.sendButton)&&fr(B())}var as=f({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:Ce,styles:is,start(){mr=new AbortController;let{signal:e}=mr;document.addEventListener("keydown",Id,{capture:!0,signal:e}),document.addEventListener("input",Rd,{capture:!0,signal:e}),document.addEventListener("click",Od,{capture:!0,signal:e}),document.addEventListener("submit",()=>fr(B()),{capture:!0,signal:e})},stop(){mr?.abort(),Nt()},onSettingsChange(e){e==="maxEntries"&&Ht(Zo())}});var ss=`/*
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
`;var Pd=1500,Hd=5e3,Nd=2e3,_e=g({showDate:{type:"boolean",description:"Show the date for messages not sent today.",default:!0},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),$o=new Map,us=0,_o,ls=[];function ds(e,t){$o.get(e)!==t&&($o.set(e,t),clearTimeout(_o),_o=setTimeout(ms,Nd))}function ms(){let e={..._e.store.stamps,...Object.fromEntries($o)};_e.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,Pd))}function Gd(e){let t=Z(h())?.times;for(let o=e.length-1;o>=0;o--){let n=$o.get(e[o])??t?.get(e[o])??_e.store.stamps[e[o]];if(n)return n}return null}var Ud=()=>C().generating||Date.now()-us<Hd;function Yd(e){let t=new Date(e),o=new Date,n={hour:"2-digit",minute:"2-digit"};if(!_e.store.showDate||t.toDateString()===o.toDateString())return t.toLocaleTimeString(void 0,n);let r=t.getFullYear()===o.getFullYear()?{}:{year:"numeric"};return t.toLocaleString(void 0,{...r,month:"short",day:"numeric",...n})}function cs(e){let t=go(e)??e.getAttribute("data-message-author-role")??e.closest(d.turn)?.getAttribute("data-turn")??e.querySelector(d.authorRole)?.getAttribute("data-message-author-role");if(xn(t))return t;let o=pt(e).at(-1);return Z(h())?.chain.find(n=>n.id===o)?.role??null}function Fd(e){let t=pt(e);if(!t.length||!He(e)||e.querySelector("time:not([data-bloom])"))return;let o=Gd(t);!o&&Ud()&&(o=Date.now(),ds(t.at(-1),o));let n=e.querySelector(':scope > time[data-bloom="timestamp"]');if(!o||_e.store.hideOwnMessages&&cs(e)==="user"){n?.remove();return}let r=Yd(o);if(n?.textContent===r)return;let i=s("time",{class:`bloom-timestamp bloom-timestamp-${cs(e)??"assistant"}`,text:r,title:new Date(o).toLocaleString(),attrs:{"data-bloom":"timestamp",datetime:new Date(o).toISOString()}});n?n.replaceWith(i):e.prepend(i)}var Xo=Oe(()=>{for(let e of En())Fd(e)}),fs=f({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:_e,styles:ss,start(){ls=[I(e=>F(e)&&Xo()),N.on("conversation",Xo),N.on("message-time",({messageId:e,time:t})=>{ds(e,t),Xo()}),y.on("fall",()=>{us=Date.now()})]},stop(){for(let e of ls)e();_o&&(clearTimeout(_o),ms());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();Xo()}}});var Kd=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])'],Qd=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],ps=g({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),gs=f({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:ps,styles:()=>ke([...Kd,...ps.store.hideDictationSettings?Qd:[]])});var Me="data-bloom-share",Wd=/^\/g\/g-p-/,jd=/^(?:share|分享)$/i,zd=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],Jd=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${Me}="project"]`],pr=g({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),en,gr=!1;function Vd(e){if(!F(e))return;let t=Wd.test(location.pathname)&&!h();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${Me}]`))!t||!jd.test(x(o.textContent??""))?o.removeAttribute(Me):o.hasAttribute(Me)||o.setAttribute(Me,"project")}var hs=f({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:pr,styles:()=>ke([...pr.store.hideShareChat?zd:[],...pr.store.hideShareProject?Jd:[]]),start(){gr=!0,ft().then(()=>{gr&&!en&&(en=I(Vd))})},stop(){gr=!1,en?.(),en=void 0;for(let e of document.querySelectorAll(`[${Me}]`))e.removeAttribute(Me)}});var bs='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',Zd='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',Xd="[data-bloom-profile-plan]",As="visibility:hidden!important;user-select:none!important",vs=g({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function $d(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=vs.store,r=[];return e&&r.push(n?`:is(${bs}){display:none!important}`:`:is(${bs}){${As}}`),t&&r.push(`:is(${Zd}){${As}}`),e&&o&&r.push(`${Xd}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var ys,qs=f({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:vs,styles:$d,start(){ys=_()},stop(){ys?.()}});var Ss=`/*
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
`;var D=M("bloom-queue-"),em=6,tm=8,Q=null,Gt="",et=!1,tt=!1;function hr(e,t,o){let n=K(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute(de),n.addEventListener("mouseenter",()=>ws(t)),n.addEventListener("mouseleave",()=>ws("")),n}function ws(e){let t=Q?.querySelector(`.${D("tip")}`);t&&(t.textContent=e)}function om(e,t,o,n){tt=!0;let r=s("textarea",{class:`bloom-input ${D("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=new AbortController,a=c=>{i.abort(),tt=!1,Gt="",c?n.edit(t,r.value):r.replaceWith(s("div",{class:D("text"),text:o}))};addEventListener("keydown",c=>{if(!(c.target!==r||c.isComposing)){if(c.key==="Enter"&&!c.shiftKey)a(!0);else if(c.key==="Escape")a(!1);else return;c.preventDefault(),c.stopImmediatePropagation()}},{capture:!0,signal:i.signal}),r.addEventListener("keydown",c=>c.stopPropagation(),{signal:i.signal}),r.addEventListener("blur",()=>a(!0),{signal:i.signal}),e.querySelector(`.${D("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function nm(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,a=l=>{!i&&Math.abs(l.clientY-n.clientY)<em||(i||(i=tt=!0,e.classList.add(D("dragging"))),e.style.transform=`translateY(${l.clientY-n.clientY}px)`)},c=l=>{if(removeEventListener("pointermove",a),!i)return;tt=!1,Gt="";let m=[...r.children].filter(v=>v!==e).filter(v=>v.getBoundingClientRect().top+v.getBoundingClientRect().height/2<l.clientY).length;o.move(t,m)};addEventListener("pointermove",a),addEventListener("pointerup",c,{once:!0})})}function rm(e,t,o){let n=s("li",{class:D("row")},s("div",{class:D("text"),text:e}),s("div",{class:D("actions")},hr("trash","Remove from queue",()=>o.remove(t)),hr("edit","Edit",()=>om(n,t,e,o)),hr("send","Send now",()=>o.sendNow(t))));return nm(n,t,o),n}function im(e){if(!Q)return;let t=e.getBoundingClientRect();Q.style.left=`${t.left}px`,Q.style.width=`${t.width}px`,Q.style.bottom=`${innerHeight-t.top+tm}px`}function br(){Q?.remove(),Q=null,Gt="",tt=!1}function tn(e,t){let o=mt();if(!e.length||!ct(o)){br();return}Q||(Q=s("div",{class:`bloom-root ${D("tray")}`,attrs:{"data-bloom":"queue"}},s("div",{class:D("header")},s("button",{class:D("toggle"),attrs:{type:"button","aria-expanded":String(!et)},on:{click:i=>{et=!et,Q?.classList.toggle(D("collapsed"),et),i.currentTarget.setAttribute("aria-expanded",String(!et))}}},s("span",{class:D("count")}),G("chevron")),s("span",{class:D("tip")})),s("ol",{class:D("list")})),Q.classList.toggle(D("collapsed"),et),document.body.append(Q)),im(o);let n=JSON.stringify(e);if(tt||n===Gt)return;Gt=n;let r=Q.querySelector(`.${D("count")}`);r&&(r.textContent=Wt(e.length,"Queued message")),Q.querySelector(`.${D("list")}`)?.replaceChildren(...e.map((i,a)=>rm(i,a,t)))}var am=new S("PromptQueue"),sm=8,Cs=150,Ts=20,Ms="BloomPromptQueue",Ls=g({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1}}),re=new Map,on=!1,Le=null,Ar,xs=[],nn="draft",yr=()=>h()??nn,X=()=>re.get(yr())??[];function lm(){let e=ge(sessionStorage.getItem(Ms)??"");if(w(e))for(let[t,o]of Object.entries(e))Array.isArray(o)&&o.length&&o.every(n=>typeof n=="string")&&re.set(t,o)}function Bs(){try{sessionStorage.setItem(Ms,JSON.stringify(Object.fromEntries([...re].filter(([e])=>e!==nn))))}catch(e){am.warn("Could not save the queue",e)}}function Be(e){e.length?re.set(yr(),e):re.delete(yr()),Bs(),tn(X(),vr)}function ks(e,t=0){t>=Ts||C().generating||B()!==e||(ro(),setTimeout(()=>ks(e,t+1),Cs))}function rn(e,t=0){if(C().generating||B()){t<Ts&&setTimeout(()=>rn(e,t+1),Cs);return}$(e),ut(()=>ks(e))}function Es(){if(Le!=null){let o=Le;Le=null,rn(o);return}if(!on||C().generating||B())return;let[e,...t]=X();e!=null&&(on=!1,Be(t),rn(e))}function Is(e){let t=X(),o=t[e];if(o!=null){if(Be(t.filter((n,r)=>r!==e)),!C().generating){rn(o);return}Le=o,Pe()?.click()}}var vr={remove:e=>Be(X().filter((t,o)=>o!==e)),edit:(e,t)=>Be(t.trim()?X().map((o,n)=>n===e?t:o):X().filter((o,n)=>n!==e)),sendNow:Is,move(e,t){let o=[...X()],[n]=o.splice(e,1);o.splice(t,0,n),Be(o)}};function cm(e){let t=X();return Ls.store.replacePending&&t.length?(Be([...t.slice(0,-1),e]),!0):t.length>=sm?!1:(Be([...t,e]),!0)}function um(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!dt(e.target)||!C().generating)return;let t=B(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;$(""),Le=t,Pe()?.click();return}if(!t){X().length&&Is(0);return}cm(t)&&$("")}var Rs=f({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:Ls,styles:Ss,start(){Ar=new AbortController,lm(),document.addEventListener("keydown",um,{capture:!0,signal:Ar.signal}),xs=[y.on("fall",({outcome:e})=>{on=e==="done",e==="left"&&(Le=null),Es()}),y.on("context",({prevId:e,id:t,migrated:o})=>{let n=re.get(nn);re.delete(nn),o&&!e&&t&&n&&re.set(t,n),o||(on=!1),Bs(),tn(X(),vr)}),y.on("tick",()=>{Es(),tn(X(),vr)})]},stop(){Ar?.abort();for(let e of xs)e();br(),re.clear(),Le=null}});var dm=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function mm(){let e=x(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!dm.has(e.toLowerCase())?e:null}function Ut(e){return e?Z(e)?.title??Ki(e)??(e===h()?mm():null):null}var Os=`/*
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
`;var ie=M("bloom-recent-"),ae="home",pm=50,Ds=140,gm=new Set(["Backquote"]),hm=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),q=g({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),pe=null,ee=[],te=0,qr,Ps=[],ln=()=>fo()?null:h()??(mo()?ae:null);function Hs(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function Gs(e){let t=Ut(e);t&&q.store.titles[e]!==t&&(q.store.titles={...q.store.titles,[e]:t});let o=Qi(location.href);o&&e===h()&&q.store.projects[e]!==o&&(q.store.projects={...q.store.projects,[e]:o})}function Ns(e){if(!e)return;let t=[e,...q.store.visits.filter(n=>n!==e)].slice(0,pm),o=new Set(t);q.store.visits=t,Object.keys(q.store.previews).some(n=>!o.has(n))&&(q.store.previews=Hs(q.store.previews,o)),Object.keys(q.store.titles).some(n=>!o.has(n))&&(q.store.titles=Hs(q.store.titles,o)),e!==ae&&Gs(e)}function an(e){if(!e||!q.store.visits.includes(e))return;let t={},o=Z(e)?.chain??[];for(let r of o)t[r.role]=le(Ao(r),Ds);if(e===h())for(let r of ho()){let i=bo(r);i&&(t[r.role]=le(i,Ds))}let n=q.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(q.store.previews={...q.store.previews,[e]:t})}function bm(){let e=Number(q.store.maxRecent);return q.store.visits.filter(t=>t!==ae||q.store.includeHome).slice(0,e)}function Sr(e){if(Yt(),e===ln())return;let t=e===ae?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"]'):yt(e)[0];t?t.click():location.assign(e===ae?"/":`/c/${e}`)}function Am(e,t){let o=e===ae?"New chat":q.store.titles[e]??Ut(e)??"Untitled chat",n=e===ae?null:q.store.projects[e],r=e===ae?null:q.store.previews[e];return s("button",{class:ie("item"),attrs:{type:"button",role:"option","aria-selected":String(t===te)},on:{click:()=>Sr(e),mousemove:()=>t!==te&&sn(t)}},s("div",{class:ie("head")},s("span",{class:`${ie("title")} bloom-truncate`,text:o}),n&&s("span",{class:ie("project"),text:n})),r?.user&&s("div",{class:`${ie("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&s("div",{class:`${ie("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function sn(e){te=(e+ee.length)%ee.length,pe?.querySelectorAll(`.${ie("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===te)))}function ym(){an(h());let e=ln();ee=bm(),e&&(ee=[e,...ee.filter(t=>t!==e)].slice(0,Number(q.store.maxRecent))),ee.length&&(te=ee.length>1?1:0,pe=s("div",{class:`bloom-root ${ie("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:t=>t.target===t.currentTarget&&Yt()}},s("div",{class:ie("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...ee.map(Am))),document.body.append(pe))}function Yt(){pe?.remove(),pe=null}var vm=e=>gm.has(e.code)||hm.has(e.key);function qm(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&vm(e)){e.preventDefault(),e.stopPropagation(),pe?sn(te+(e.shiftKey?-1:1)):ym();return}if(!pe)return;let o={Escape:Yt,Enter:()=>Sr(ee[te]),ArrowDown:()=>sn(te+1),ArrowUp:()=>sn(te-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function Sm(e){pe&&e.key==="Control"&&Sr(ee[te])}var Us=f({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:q,styles:Os,start(){qr=new AbortController;let{signal:e}=qr;addEventListener("keydown",qm,{capture:!0,signal:e}),addEventListener("keyup",Sm,{capture:!0,signal:e}),addEventListener("blur",Yt,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&an(h()),{signal:e}),Ps=[ce(({prevId:i})=>{an(i),Ns(ln())}),N.on("conversation",({id:i})=>{q.store.visits.includes(i)&&Gs(i),an(i)})];let{visits:t,titles:o,previews:n}=q.store,r=t.filter(i=>i!==ae&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(q.store.visits=t.filter(i=>!r.includes(i))),Ns(ln())},stop(){qr?.abort();for(let e of Ps)e();Yt()}});var wr="data:audio/mpeg;base64,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";var Ys=new S("ResponseNotification"),wm=.5,xm=200,Em=300,Ft=g({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:e=>(e.append(P("Preview",Ws)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),Fs=null,xr=new Map,Ks,Er;function Cm(e){return new Promise((t,o)=>GM_xmlhttpRequest({url:e,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=xm&&n<Em?t(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var Tm=e=>Uint8Array.from(atob(e.slice(e.indexOf(",")+1)),t=>t.charCodeAt(0)).buffer;function Mm(e,t){let o=xr.get(t);return o||(o=(t.startsWith("data:")?Promise.resolve(Tm(t)):Cm(t)).then(n=>e.decodeAudioData(n)),o.catch(()=>xr.delete(t)),xr.set(t,o)),o}async function Qs(e){Fs??=new AudioContext;let t=Fs;t.state==="suspended"&&t.resume();let o=t.createBufferSource(),n=t.createGain();o.buffer=await Mm(t,e),n.gain.value=wm,o.connect(n).connect(t.destination),o.start()}function Ws(){let e=Ft.store.soundUrl.trim();Qs(e||wr).catch(t=>{Ys.warn("Sound failed",t),e&&Qs(wr).catch(o=>Ys.warn("Default chime failed",o))})}function Lm(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function Bm(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(Er=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:Er.signal}))}var js=f({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:Ft,start(){Bm(),Ks=y.on("fall",({conversationId:e,outcome:t})=>{t==="done"&&(Ft.store.onlyWhenHidden&&!document.hidden||(Ft.store.sound&&Ws(),Ft.store.browserNotification&&Lm(Ut(e))))})},stop(){Ks?.(),Er?.abort()}});var km=`:is(${d.sidebarScroll}, :has(> ${d.sidebarScroll})) + :has(${d.menuButton})`,Im=`${d.rail} > :has(${d.menuButton})`,Tr=`:is(${km}, ${Im}, ${d.oldProfile}):not(:hover)`,Cr="[data-bloom-profile-avatar]",Rm=`:is(${Tr}, ${Tr} :has(${Cr})) > :not(${Cr}, :has(${Cr}))`,Js=g({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function Om(){let{opacity:e,fadeAvatar:t}=Js.store;return e>=100?"":`${t?Tr:Rm}{opacity:${e/100}!important}`}var zs,Vs=f({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Js,styles:Om,start(){zs=_()},stop(){zs?.()}});var Dm="filter:blur(6px)!important;transition:filter 0.2s ease",Zs=`:is(${d.sidebars})`,Pm={conversations:{selectors:[`${Zs} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0},projects:{selectors:[`${Zs} a:is([href*="/project"], [href*="/g/g-p-"])`,"[data-app-action-sidebar-project-row]",".bloom-recent-project"],hover:!0},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}},$s=g({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function Hm(){return Object.entries(Pm).filter(([e])=>$s.store[e]).map(([,{selectors:e,hover:t}])=>{let o=e.join(",");return`:is(${o}){${Dm}}`+(t?`:is(${o}):hover, .bloom-recent-item:hover :is(${o}){filter:none!important}`:"")}).join(`
`)}var Xs,_s=f({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:$s,styles:Hm,start(){Xs=_()},stop(){Xs?.()}});var Nm=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],Gm=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",Um='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',el=g({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function Ym(){let e=`${el.store.width}rem`;return`:is(${Gm}){${Nm.map(t=>`${t}:${e}!important`).join(";")}}:is(${Um}){max-width:min(100%, ${e})!important}`}var tl=f({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:el,styles:Ym});var Fm=[oa,fa,ha,Ta,La,ka,Ga,Va,ns,as,fs,gs,hs,qs,Rs,Us,js,Vs,_s,tl],Mr=Fm;var Km=new S("Bloom"),ol="2.0.51";async function Lr(){gi();for(let e of Mr)e.updatedAt=ki[e.name];Vr(Mr),await Qr(),jt("base",ti),Bi(),eo("Init"),so().then(()=>{Pr(),eo("DOMContentLoaded")}),await bi(),eo("HostReady"),Km.info(`Bloom++ ${ol} ready`)}var nl=new S("Boot");if(window===window.top){let e=z.Bloom;e&&nl.warn("Replacing another Bloom++ instance",e.VERSION),Object.defineProperty(z,"Bloom",{value:Br,configurable:!0,writable:!0}),Lr().catch(t=>nl.error("Startup failed",t))}})();
