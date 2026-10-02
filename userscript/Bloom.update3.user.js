// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.49
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

/* Bloom++ v2.0.49. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var rl=Object.defineProperty;var il=(e,t)=>{for(var o in t)rl(e,o,{get:t[o],enumerable:!0})};var S=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var se=(e,t,o)=>Math.min(o,Math.max(t,e)),w=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Lr=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,le=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,x=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function Qt(e,t){return`${e} ${t}${e===1?"":"s"}`}async function Br(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function ge(e){try{return JSON.parse(e)}catch{return}}var z=typeof unsafeWindow>"u"?window:unsafeWindow;var Mr={};il(Mr,{VERSION:()=>tl,init:()=>Tr,plugins:()=>Ae});var al=new S("Styles"),ot=new Map,kr=new Set,nt=new Map,ln=!0;function Ir(){let e=document.adoptedStyleSheets.filter(t=>!kr.has(t));document.adoptedStyleSheets=[...e,...ot.values()]}function Rr(e){document.readyState==="loading"||e.parentNode===document.head||document.head.append(e)}function sl(e,t){let o=nt.get(e);o||(o=document.createElement("style"),o.id=`bloom-style-${e}`,nt.set(e,o)),o.textContent!==t&&(o.textContent=t),Rr(o)}function Wt(e,t){if(ln)try{let o=ot.get(e);o||(o=new z.CSSStyleSheet,ot.set(e,o),kr.add(o)),o.replaceSync(t),Ir();return}catch(o){al.warn("Constructed style sheets unavailable, using <style> after parsing",o),ln=!1,ot.delete(e)}sl(e,t)}function cn(e){ot.delete(e)&&ln&&Ir(),nt.get(e)?.remove(),nt.delete(e)}function Or(){for(let e of nt.values())Rr(e)}var M=e=>(...t)=>t.map(o=>e+o).join(" "),jt=(...e)=>e.filter(Boolean).join(" "),ke=e=>e.length?`${e.join(",")}{display:none!important}`:"";function f(e){return e}var zt=new S("Storage"),ll="bloompp",Jt="kv",Dr=null;function cl(){return Dr??=new Promise((e,t)=>{let o=indexedDB.open(ll,1);o.onupgradeneeded=()=>{o.result.objectStoreNames.contains(Jt)||o.result.createObjectStore(Jt)},o.onsuccess=()=>e(o.result),o.onerror=()=>t(o.error)}),Dr}function Pr(e,t){return cl().then(o=>new Promise((n,r)=>{let i=t(o.transaction(Jt,e).objectStore(Jt));i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)}))}async function ul(e){if(typeof GM_getValue=="function")try{return await GM_getValue(e)}catch(t){zt.warn("GM read failed",t);return}}async function dl(e){try{return await Pr("readonly",t=>t.get(e))}catch(t){zt.warn("IndexedDB read failed",t);return}}function ml(e){try{return localStorage.getItem(e)??void 0}catch{return}}async function Hr(e){return Promise.all([ul(e),dl(e),ml(e)])}function Nr(e,t){typeof GM_addValueChangeListener=="function"&&GM_addValueChangeListener(e,(o,n,r,i)=>{i&&t(r)}),addEventListener("storage",o=>{o.key===e&&t(o.newValue)})}function Gr(e,t){let o=JSON.stringify(t);if(typeof GM_setValue=="function")try{GM_setValue(e,t)}catch{GM_setValue(e,o)}try{localStorage.setItem(e,o)}catch(n){zt.warn("localStorage write failed",n)}Pr("readwrite",n=>n.put(o,e)).catch(n=>zt.warn("IndexedDB write failed",n))}var fl=new S("Settings"),dn="BloomSettings",pl=100,gl=["GM","IndexedDB","localStorage"],Ie={plugins:{}},Vt=new Set,mn=new Set,rt;function Yr(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=ge(t);return!w(t)||!w(t.plugins)||!Object.keys(t.plugins).length?null:t}var un=e=>e==null||e===""||(Array.isArray(e)?!e.length:w(e)&&!Object.keys(e).length);function hl(e){return un(e)?0:Array.isArray(e)?12+Math.min(e.length,40):w(e)?12+Math.min(Object.keys(e).length,40):3}function bl(e){let t=0;for(let o of Object.values(e.plugins))if(w(o))for(let[n,r]of Object.entries(o))n!=="enabled"&&(t+=hl(r));return t}var Ur=e=>Object.values(e.plugins).filter(t=>w(t)&&t.enabled===!0).length;function Al(e){let t=e.map((i,a)=>i&&{candidate:i,index:a,score:bl(i)}).filter(i=>i!=null).toSorted((i,a)=>a.score-i.score||(i.score?0:Ur(a.candidate)-Ur(i.candidate))||i.index-a.index);if(!t.length)return null;let[o,...n]=t,r=structuredClone(o.candidate);for(let{candidate:i}of n)for(let[a,c]of Object.entries(i.plugins)){if(!w(c))continue;let l=r.plugins[a]??={};for(let[u,m]of Object.entries(c))u==="enabled"?!("enabled"in l)&&m===!0&&(l.enabled=!0):un(l[u])&&!un(m)&&(l[u]=structuredClone(m));Object.keys(l).length||delete r.plugins[a]}return{bag:r,source:gl[o.index]}}async function Fr(){let e=await Hr(dn),t=Al(e.map(Yr));t&&(Ie.plugins=t.bag.plugins,fl.info("Loaded settings from",t.source))}var Kr=(e,t)=>`${e}
${t}`;function Qr(){rt=void 0,mn.clear(),Gr(dn,Ie)}function yl(e){let t=Yr(e);if(!t)return;let o=[];for(let n of new Set([...Object.keys(Ie.plugins),...Object.keys(t.plugins)])){let r=Ie.plugins[n]??={},i=w(t.plugins[n])?t.plugins[n]:{};for(let a of new Set([...Object.keys(r),...Object.keys(i)]))mn.has(Kr(n,a))||JSON.stringify(r[a])===JSON.stringify(i[a])||(i[a]===void 0?delete r[a]:r[a]=i[a],o.push([n,a]))}for(let[n,r]of o)for(let i of Vt)i(n,r)}function vl(){rt&&(clearTimeout(rt),Qr())}var he=(e,t)=>Ie.plugins[e]?.[t];function be(e,t,o){let n=Ie.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,mn.add(Kr(e,t)),clearTimeout(rt),rt=setTimeout(Qr,pl);for(let r of Vt)r(e,t)}function Re(e){return Vt.add(e),()=>void Vt.delete(e)}function fn(e){return e.type==="component"?void 0:e.default}function g(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>he(t.pluginName,n)??(e[n]&&fn(e[n])),set:(o,n,r)=>(be(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&he(t.pluginName,o)!==void 0&&be(t.pluginName,o)}};return t}var Wr=e=>{let t=()=>{let o=he("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();be("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},Zt=Wr("pinnedPlugins"),Xt=Wr("starredPlugins");addEventListener("pagehide",vl);Nr(dn,yl);var _t=new S("PluginManager"),Ae=new Map,it=new Set,jr=new Set,pn=new Set;function zr(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),Ae.set(t.name,t)}var at=e=>!!e.required||(he(e.name,"enabled")??!!e.enabledByDefault);var gn=e=>`plugin-${e.name}`;function Jr(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?Wt(gn(e),t):cn(gn(e))}function Vr(e){if(!it.has(e.name))try{Jr(e),e.start?.(),it.add(e.name)}catch(t){_t.error(`Failed to start ${e.name}`,t)}}function ql(e){if(it.delete(e.name)){cn(gn(e));try{e.stop?.()}catch(t){_t.error(`Failed to stop ${e.name}`,t)}}}var Zr=e=>e.startAt??"HostReady";function $t(e){jr.add(e);for(let t of Ae.values())Zr(t)===e&&at(t)&&Vr(t);_t.info(`${e}: ${[...it].join(", ")}`)}function Xr(e,t){be(e.name,"enabled",t),t?jr.has(Zr(e))&&Vr(e):ql(e);for(let o of pn)o()}function _r(e){return pn.add(e),()=>void pn.delete(e)}Re((e,t)=>{let o=Ae.get(e);if(!(!o||t==="enabled"||!it.has(e)))try{Jr(o),o.onSettingsChange?.(t)}catch(n){_t.error(`Settings change failed for ${e}`,n)}});var $r=`/*
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
`;var wl=new S("Dom");function s(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var ei=document.createElement("template");function ti(e){return ei.innerHTML=e.trim(),ei.content.firstElementChild.cloneNode(!0)}var lt=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),V=(e,t=document)=>[...t.querySelectorAll(e)].find(lt)??null,xl=16,El="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function oi(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([El],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function ct(e){document.hidden?setTimeout(e,xl):requestAnimationFrame(e)}function Oe(e){let t=!1;return()=>{t||(t=!0,ct(()=>{t=!1;try{e()}catch(o){wl.error("Scheduled task failed",o)}}))}}var eo=new Set,to=[],st,Cl=Oe(()=>{let e=to;to=[];for(let t of eo)t(e)});function I(e){return eo.add(e),st||(st=new MutationObserver(t=>{to.push(...t),Cl()}),st.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{eo.delete(e),!eo.size&&(st?.disconnect(),st=void 0,to=[])}}var Tl=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),F=e=>!e.length||e.some(t=>!Tl(t.target));function ye(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size");return}e.getAttribute("data-bloom-text")!==t&&(e.hasAttribute("data-bloom-text")||e.style.setProperty("--bloom-text-size",getComputedStyle(e).fontSize),e.setAttribute("data-bloom-text",t))}var Ml=new S("Events");function oo(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){Ml.error(`Listener for ${String(t)} failed`,r)}}}}var d={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]'};var ni=/[​-‍﻿]/g,De=()=>V(d.composerInput),ut=e=>e instanceof HTMLElement&&e.matches(d.composerInput),dt=(e=De())=>e?.closest("form")??document.querySelector(d.oldComposerForm);function B(e=De()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(ni,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(ni,"").trim()}var Ll=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function _(e,t=De()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return Ll?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function ri(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:a,value:c}=e;return{first:!c.slice(0,i).includes(`
`),last:!c.slice(a).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var ii=e=>{let t=dt();return(t&&V(e,t))??V(e)},Pe=()=>ii(d.stopButton),Bl=()=>{let e=ii(d.sendButton);return e&&!e.matches(d.stopButton)?e:null};function no(){let e=Bl();if(e){e.disabled||e.click();return}De()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var ai=()=>lt(Pe());var ci=new S("Network"),kl=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,Il=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,io=1e3,Rl=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),N=oo(),hn=new Map,si=new Map,Ol=1,Z=e=>e?hn.get(e)??null:null;function ro(e){let t=hn.get(e);return t||hn.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var ui=e=>e==="user"||e==="assistant";function di(e){let t=e.author?.role;if(!e.id||!ui(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(l=>typeof l=="string").join(`
`).trim(),i=n.filter(l=>w(l)&&l.content_type==="image_asset_pointer").length,a=e.metadata?.attachments,c=Array.isArray(a)&&a.length>0;return!r&&!i&&!c?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*io:null,text:r,hasFiles:c,imageCount:i}}var mi=e=>e.filter((t,o)=>t.role==="user"||e[o+1]?.role!=="assistant"),bn=e=>e.map(t=>t.createTime).filter(t=>t!=null);function Dl(e,t){let o=bn(e),n=bn(t);return!o.length||!n.length?!1:Math.max(...o)<Math.min(...n)}function Pl(e){let t=bn(e);if(t.length<2)return e;let[o]=t,n=o-e.length;return e.map((i,a)=>(i.createTime!=null&&(n=i.createTime),{message:i,index:a,time:i.createTime??n})).toSorted((i,a)=>i.time-a.time||i.index-a.index).map(i=>i.message)}function Hl(e,t){let o=t.filter(w).map(c=>w(c.message)?c.message:c);for(let c of o)c.id&&c.create_time&&e.times.set(c.id,c.create_time*io);let n=o.map(di).filter(c=>c!=null),r=new Set(n.map(c=>c.id)),i=e.chain.filter(c=>!r.has(c.id)),a=Dl(n,i)?[...n,...i]:[...i,...n];return e.chain=mi(Pl(a)),e}function Nl(e,t){if(!w(t)||!(w(t.mapping)||Array.isArray(t.messages)))return null;let o=ro(e);if(typeof t.title=="string"&&t.title&&(o.title=t.title),Array.isArray(t.messages))return Hl(o,t.messages);let n=t.mapping;for(let c of Object.values(n)){let l=c.message?.create_time;c.message?.id&&l&&o.times.set(c.message.id,l*io)}let r=[],i=new Set,a=typeof t.current_node=="string"?t.current_node:null;for(;a&&!i.has(a)&&n[a];){i.add(a);let c=n[a].message,l=c?di(c):null;l&&r.push(l),a=n[a].parent??null}return r.length&&(o.chain=mi(r.toReversed())),o}function Gl(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}function Ul(e){if(typeof e?.body!="string")return null;let t=ge(e.body);return w(t)&&typeof t.conversation_id=="string"?t.conversation_id:null}function Yl(e,t){if(!w(e))return;typeof e.type=="string"&&Rl.has(e.type)&&(t.handoff=!0);let o=w(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(ro(e.conversation_id).title=e.title,N.emit("conversation",ro(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&ui(n.author?.role)){let r=n.create_time*io;t.conversationId&&ro(t.conversationId).times.set(n.id,r),N.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function Fl(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:a}=await o.read();if(i)break;r+=n.decode(a,{stream:!0});let c=r.split(`
`);r=c.pop()??"";for(let l of c){if(!l.startsWith("data:"))continue;let u=l.slice(5).trim();u&&u!=="[DONE]"&&Yl(ge(u),t)}}}async function Kl(e,t,o){let n={conversationId:t,error:!1,handoff:!1};si.set(e,t),N.emit("generate-start",{requestId:e,conversationId:t});try{let r=await o;r.ok?r.headers.get("content-type")?.includes("event-stream")&&await Fl(r.clone(),n):n.error=!0}catch(r){let i=r instanceof DOMException&&r.name==="AbortError";n.handoff||=i,n.error||=!i}finally{si.delete(e),N.emit("generate-end",{requestId:e,...n})}}async function Ql(e,t){try{let o=await t;if(!o.ok)return;let n=Nl(e,await o.clone().json());n&&N.emit("conversation",n)}catch(o){ci.debug("Conversation read skipped",o)}}function Wl(e,t,o){let n=Gl(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&kl.test(n.pathname)){Kl(Ol++,Ul(t),o);return}let i=r==="GET"&&n.pathname.match(Il)?.[1];i&&Ql(i,o)}var li=!1;function fi(){if(li)return;li=!0;let e=z.fetch,t=function(o,n){let r=e.call(this??z,o,n);try{Wl(o,n,r)}catch(i){ci.error("Fetch tap failed",i)}return r};z.fetch=typeof exportFunction=="function"?exportFunction(t,z):t}var jl="__reactContainer$",pi="__reactFiber$";function ao(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var An=(e,t)=>Object.keys(e.wrappedJSObject??e).some(o=>o.startsWith(t)),He=e=>!An(document,jl)||An(e,pi);function mt(){return document.body?Promise.resolve():new Promise(e=>{let t=new MutationObserver(()=>{document.body&&(t.disconnect(),e())});t.observe(document,{childList:!0,subtree:!0})})}async function gi(){await mt();let e=Date.now()+8e3;for(;!An(document.body,pi)&&Date.now()<e;)await new Promise(t=>setTimeout(t,100))}var zl=new S("Route"),hi=/\/c\/(?!local-)([\w-]+)/,Jl=500,qn=e=>{try{return new URL(e,location.origin).pathname.match(hi)?.[1]??null}catch{return null}},h=()=>location.pathname.match(hi)?.[1]??null,uo=()=>location.pathname==="/",mo=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",lo=new Set,co=location.href,vn=h(),so;function yn(){if(location.href===co)return;let e={prevHref:co,href:location.href,prevId:vn,id:h()};co=e.href,vn=e.id;for(let t of lo)try{t(e)}catch(o){zl.error("Route listener failed",o)}}function Vl(){let e=new AbortController,{navigation:t}=z;t?.addEventListener("currententrychange",()=>queueMicrotask(yn),{signal:e.signal}),addEventListener("popstate",yn,{signal:e.signal});let o=setInterval(yn,Jl);return()=>{e.abort(),clearInterval(o)}}function ce(e){return lo.add(e),so||(co=location.href,vn=h(),so=Vl()),()=>{lo.delete(e),!lo.size&&(so?.(),so=void 0)}}var Zl=["data-turn","data-message-author-role"],Xl=/:(user|assistant)$/,Sn=`${d.messageUnit}, ${d.oldMessage}`,wn=e=>e==="user"||e==="assistant",vi=()=>!!document.querySelector(d.timelineScroll),Ne=()=>vi()?V(d.timelineScroll):document;function pt(){if(vi())return V(d.timelineScroll);let e=document.querySelector(d.turn);for(let t=e?.parentElement;t;t=t.parentElement){let{overflowY:o}=getComputedStyle(t);if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight)return t}return document.scrollingElement}var po=e=>e.getAttribute("data-chatgpt-search-unit-key")?.match(Xl)?.[1]??null,qi=e=>[...e.querySelectorAll(d.searchUnit)].filter(t=>po(t)&&!t.parentElement?.closest(d.searchUnit)),bi=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function ft(e){let t=bi(e);return t.length?t:[...new Set([...e.querySelectorAll(Sn)].flatMap(bi))]}function xn(e=Ne()){if(!e)return[];let t=qi(e);return t.length?t:[...e.querySelectorAll(Sn)].filter(o=>!o.parentElement?.closest(Sn))}function _l(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function $l(e){for(let t of Zl){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(wn(o))return o}return e.querySelector(d.markdown)||e.querySelector(d.generatedImage)?"assistant":null}var ec=e=>!e.parentElement?.closest(d.turn);function go(){let e=Z(h())?.chain??[];return[...Ne()?.querySelectorAll(d.turn)??[]].filter(ec).flatMap(o=>{let n=qi(o),r=n.length?n.map(i=>({el:i,known:po(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=u=>!n.some(m=>m.contains(u))&&x(u.textContent??""),a=[...o.querySelectorAll(d.assistantMarkdown)].find(u=>i(u)&&!fo.test(x(u.textContent??""))),c=[...o.querySelectorAll(d.activityHeader)].findLast(i),l=a??c;l&&r.push({el:l,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?ft(o):xn(o).flatMap(ft),a=n??$l(o)??_l(i,e)??(r%2?"assistant":"user"),c=o.closest(d.turn)??o,l=!o.closest(d.searchUnit)&&!!c.querySelector(d.turnBusy),u=a==="assistant"&&(o.matches(d.turnBusy)||!!o.querySelector(d.turnBusy)||l);return{el:o,role:a,messageIds:i,streaming:u}})}var tc="[data-bloom], .sr-only",Si=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,fo=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,Ai=new WeakMap;function ho(e){let o=(e.el.closest(d.turn)??e.el).textContent?.length??0,n=Ai.get(e.el);if(n?.length===o)return n.summary;let r=oc(e);return Ai.set(e.el,{length:o,summary:r}),r}function yi(e){let t=new Set,o=[];for(let n of e.querySelectorAll(d.assistantMarkdown)){if(n.closest(d.searchUnit))continue;let r=x(n.textContent??"");!r||fo.test(r)||Si.test(r)||t.has(r)||(t.add(r),o.push(r))}return o}function oc(e){let t=e.el.querySelectorAll(d.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.closest(d.turn);if(e.role==="assistant"&&o&&e.el.matches(d.assistantMarkdown)&&!e.el.closest(d.searchUnit)){let l=yi(o);if(l.length)return l.join(" \xB7 ")}let n=e.el.querySelector(e.role==="assistant"?d.markdown:".whitespace-pre-wrap")??e.el,i=[...n.querySelectorAll(tc)].map(l=>x(l.textContent??"")).filter(Boolean).reduce((l,u)=>l.replace(u,`
`),n.innerText||n.textContent||""),a=i.split(`
`).map(x).filter(l=>l&&!Si.test(l)&&!fo.test(l));if(a.length)return a.join(" ");if(e.role==="assistant"&&o){let l=yi(o);if(l.length)return l.join(" \xB7 ")}let c=i.split(`
`).map(x).filter(l=>fo.test(l));return c.length?c.at(-1)??"":e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function bo(e){return e.text?x(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var wi=e=>e.matches(d.timelineScroll)&&getComputedStyle(e).flexDirection==="column-reverse";var nc=250,rc=400,ic=6e4,ac=5e3,sc=`:is(${d.turn}) :is(${d.turnBusy})`,y=oo(),vo=new Set,En=new Set,ue=!1,Ei=0,Ge=null,Ue=!1,Ao=!1,gt=0,qo=!1,ht=null,xi=!1,C=()=>({generating:ue,conversationId:h()}),Ci=()=>ai()||!!Ne()?.querySelector(sc);function lc(){let e=Ci();return e?Ao||(gt=0,qo=!0):Ao=!1,[...vo].some(t=>!En.has(t))||e&&!Ao||Date.now()<gt}function cc(){return ht?.error?"error":Ue?"stopped":"done"}function uc(){Ge=null,ue=!1,qo=!1,y.emit("fall",{conversationId:h(),outcome:cc()}),Ue=!1,ht=null}function Ti(){let e=lc();e&&!ue&&(ue=!0,Ei=Date.now(),Ue=!1,ht=null,y.emit("rise",{conversationId:h()})),e||!ue?Ge=null:Ge==null?Ge=Date.now():Date.now()-Ge>=rc&&uc()}function yo(){Ti(),y.emit("tick",C())}function dc({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(ue||Date.now()-Ei<ic);if(!o&&ue){for(let n of vo)En.add(n);Ao=Ci(),gt=0,qo=!1,Ge=null,ue=!1,Ue=!1,ht=null,y.emit("fall",{conversationId:e,outcome:"left"})}y.emit("context",{prevId:e,id:t,migrated:o}),yo()}function mc(e){e.target instanceof Element&&e.target.closest(d.stopButton)&&(Ue=!0,gt=0)}function Mi(){xi||(xi=!0,N.on("generate-start",({requestId:e})=>{vo.add(e),yo()}),N.on("generate-end",e=>{vo.delete(e.requestId),!En.delete(e.requestId)&&(ht=e,gt=e.handoff&&!e.error&&!Ue&&!qo?Date.now()+ac:0,yo())}),ce(dc),document.addEventListener("click",mc,!0),oi(yo,nc),ao().then(()=>I(Ti)))}var Li={BetterNavigator:1790939902e3,ChatListStatus:1790939902e3,ChatStateFavicons:1790939902e3,Cleaner:1790939902e3,ComposerOpacity:1790939902e3,Continue:1790939902e3,CustomSidebarIdentity:1790939902e3,GreetingCustomizer:1790939902e3,InputHistory:1790939902e3,MessageTimestamps:1790939902e3,NoDictation:1790939902e3,NoShareLink:1790939902e3,NoSidebarIdentity:1790939902e3,PromptQueue:1790939902e3,RecentTopics:1790939902e3,ResponseNotification:1790939902e3,Settings:1790939902e3,SidebarIdentityOpacity:1790939902e3,StreamerMode:1790939902e3,WiderChat:1790939902e3};var A=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,fc="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",pc={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${fc}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:A('<path d="M18 6 6 18M6 6l12 12"/>'),gear:A('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:A('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:A('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:A('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:A('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:A('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:A('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:A('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:A('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:A('<path d="m6 9 6 6 6-6"/>'),play:A('<path d="M7 4v16l13-8z"/>'),plus:A('<path d="M12 5v14M5 12h14"/>'),check:A('<path d="m5 12 5 5 9-10"/>'),alert:A('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:A('<path d="M4 5h16v11H9l-5 4z"/>'),layout:A('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:A('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:A('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:A('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:A('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:A('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:A('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:A('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:A('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:A('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:A('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:A('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:A('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:A('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:A('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),grip:A('<path d="M9 6h0M15 6h0M9 12h0M15 12h0M9 18h0M15 18h0"/>')},G=e=>ti(pc[e]);var de="data-bloom-tip",Cn=6,Tn=8,ve,Bi=null;function Ye(e){if(e===Bi)return;if(Bi=e,!e){ve?.remove();return}ve??=s("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),ve.textContent=e.getAttribute(de),document.body.append(ve);let t=e.getBoundingClientRect(),{width:o,height:n}=ve.getBoundingClientRect(),r=t.bottom+Cn+n<=innerHeight-Tn;ve.style.left=`${se(t.left+t.width/2-o/2,Tn,innerWidth-o-Tn)}px`,ve.style.top=`${r?t.bottom+Cn:t.top-Cn-n}px`}var ki=e=>e instanceof Element?e.closest(`[${de}]`):null;function Ii(){let e=new AbortController,t={passive:!0,signal:e.signal};return document.addEventListener("pointerover",o=>Ye(ki(o.target)),t),document.addEventListener("pointerout",o=>o.relatedTarget||Ye(null),t),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&Ye(ki(o.target)),t),document.addEventListener("focusout",()=>Ye(null),t),document.addEventListener("pointerdown",()=>Ye(null),t),()=>{e.abort(),Ye(null)}}function Mn(e,t,o){let n=s("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o}});return n.addEventListener("click",r=>{r.stopPropagation();let i=n.getAttribute("aria-checked")!=="true";n.setAttribute("aria-checked",String(i)),t(i)}),n}function P(e,t,o){return s("button",{class:jt("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button"},on:{click:t}})}function K(e,t,o,n){let r=s("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":t,[de]:t},on:{click:o}},G(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function So(e,t,o,n,r,i){let a=s("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});a.value=String(e);let c=s("output",{text:`${a.value}${r}`});return a.addEventListener("input",()=>{c.textContent=`${a.value}${r}`,i(Number(a.value))}),s("div",{class:"bloom-slider"},a,c)}function Ln(e,t,o){let n=s("select",{class:"bloom-select"},...t.map(r=>s("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function bt(e,t,o="",n="text"){let r=s("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var gc=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,Ri=/\S+@\S+\.\S+/,hc=3,bc=/^\/g\/(g-p-[^/]+)\//,Ac=/^g-p-[0-9a-f]+-?/i,Oi=e=>!!e.closest(".sr-only"),Bn=e=>!!e?.querySelector(d.menuButton);function Di(){return[...document.querySelectorAll(d.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(Bn)).filter(e=>e!=null)}function Pi(){let e=[...document.querySelectorAll(d.oldProfile)];if(e.length)return e.map(o=>{let n=o.parentElement?.children.length===1?o.parentElement:o;return{kind:"profile",anchor:n,insert:r=>n.before(r)}});let t=Di().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(d.rail)){let n=[...o.children].find(Bn);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}var kn=e=>!e.closest("[data-bloom]")&&(!!e.querySelector("img, [class*=rounded-full]")||Ui(e).some(t=>!Oi(t))),Hi=e=>[...e.parentElement?.children??[]].find(t=>t!==e&&t instanceof HTMLElement&&kn(t))??null;function Ni(){let e=[...document.querySelectorAll(d.oldProfile)];return e.length?e:[...Di(),...[...document.querySelectorAll(d.rail)].map(o=>[...o.children].findLast(Bn))].map(o=>[...o?.querySelectorAll(d.menuButton)??[]].findLast(n=>kn(n)||Hi(n))).filter(o=>o!=null)}var Gi=()=>Ni().map(e=>kn(e)?e:Hi(e)).filter(e=>e!=null);function Ui(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!x(t.textContent??"")&&!(t instanceof SVGElement))}var yc=e=>{if(/rounded-full/.test(e.getAttribute("class")??""))return!0;if(!e.clientWidth)return!1;let{borderRadius:t}=getComputedStyle(e);return t.includes("%")||Number.parseFloat(t)>=e.clientWidth/2};function wo(e,t,o){for(let n of e.querySelectorAll(`[${t}]`))n!==o&&n.removeAttribute(t);o&&!o.hasAttribute(t)&&o.setAttribute(t,"")}function vc(e,t){if(x(e.textContent??"").length>hc)return null;let o=e.closest("button");for(let n=e;n&&n!==t&&n!==o;n=n.parentElement)if(yc(n))return n;return null}function In(e,t){e.hasAttribute(`data-bloom-${t}`)||e.setAttribute(`data-bloom-${t}`,"");let o=e.querySelector("img:not([data-bloom] img)"),n=Ui(e),r=o?null:n.map(m=>vc(m,e)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),a=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");wo(e,`data-bloom-${t}-avatar`,a);let c=n.filter(m=>!a?.contains(m)&&!Oi(m)),l=c.find(m=>gc.test(x(m.textContent??""))),u=c.find(m=>Ri.test(m.textContent??""));wo(e,`data-bloom-${t}-plan`,l),wo(e,`data-bloom-${t}-email`,u),wo(e,`data-bloom-${t}-name`,c.find(m=>m!==l&&m!==u))}function qc(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function xo(){return Ni().map(qc).find(e=>e!=null)??[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&(Ri.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var At=e=>[...document.querySelectorAll(d.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&qn(t.href)===e);function Yi(e){let t=At(e).find(o=>x(o.textContent??""));return t?x(t.textContent??""):null}function Fi(e){let t=new URL(e,location.origin).pathname.match(bc)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!qn(n.href)&&x(n.textContent??""));return o?x(o.textContent??""):t.replace(Ac,"").replaceAll("-"," ")||null}var Rn=0,Eo;function Sc(e){if(!F(e))return;for(let o of Gi())In(o,"profile");let t=xo();t&&In(t,"menu")}function $(){Rn++;let e=!0;return mt().then(()=>{e&&Rn&&!Eo&&(Eo=I(Sc))}),()=>{e&&(e=!1,!--Rn&&(Eo?.(),Eo=void 0))}}var wc=new S("SettingsPanel"),p=M("bloom-settings-"),xc=10080*60*1e3,Ec=3e3,Ki="Toggle features. Some need a reload. Click the sliders icon to configure.",Cc=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Tc=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],Mc={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},Qi=new Set(["chat","ui","privacy"]),U=null,Fe="all",On="all",Co="",Dn=[],Wi=()=>[...Ae.values()].filter(e=>!e.hidden),Lc=e=>!!e.updatedAt&&Date.now()-e.updatedAt<xc;function Bc(e){switch(Fe){case"favorites":return Xt.has(e.name);case"recent":return Lc(e);case"all":return!0;case"other":return!e.tags.some(t=>Qi.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(Fe)}}function kc(e){switch(On){case"all":return!0;case"enabled":return at(e);case"disabled":return!at(e)}}function Ic(e){let t=Co.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function Rc(e){let t=Zt.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return Fe==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var ji=e=>e.settings?.def??{},Oc=e=>Object.values(ji(e)).some(t=>t.type!=="custom");function Dc(e,t,o){let n=he(e.name,t)??fn(o),r=i=>be(e.name,t,i);switch(o.type){case"boolean":return Mn(n,r,o.description??t);case"slider":return So(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return Ln(n,o.options,r);case"string":return bt(n,r,o.placeholder);case"number":return bt(String(n),i=>r(Number(i)),"","number");case"component":{let i=s("div",{class:p("component")});return Dn.push(o.render(i)),i}case"custom":return null}}var Pc=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function zi(e){if(!U)return;let t=Object.entries(ji(e)).filter(([,i])=>i.type!=="custom").map(([i,a])=>{let c=Dc(e,i,a),l=a.type==="boolean",u=a.type!=="component"&&s("div",{class:p("field-label"),text:Pc(i)}),m=a.description&&s("div",{class:p("field-desc"),text:a.description});return s("div",{class:p("field",l?"field-inline":"field-stacked")},(u||m)&&s("div",{class:p("field-text")},u,m),c)}),o,n=P("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},Ec);return}clearTimeout(o),e.settings?.reset(),yt(),zi(e)},"danger"),r=s("div",{class:p("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&yt()}},s("div",{class:p("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},s("div",{class:p("popup-header")},s("div",{class:p("card-icon")},G(e.icon)),s("div",{class:p("popup-title")},s("div",{class:p("card-name"),text:e.name}),s("div",{class:p("popup-authors"),text:e.authors.join(", ")})),K("close","Close",yt)),s("p",{class:p("popup-desc"),text:e.description}),s("div",{class:p("fields")},...t),s("div",{class:p("popup-footer")},n)));U.querySelector(`.${p("modal")}`)?.append(r)}function yt(){for(let e of Dn)e();Dn=[],U?.querySelector(`.${p("popup-backdrop")}`)?.remove()}function Hc(e){let t=at(e),o=Xt.has(e.name),n=Zt.has(e.name);return s("div",{class:p("card",t?"card-on":"card-off")},s("div",{class:p("card-top")},s("div",{class:p("card-icon")},G(e.icon)),s("div",{class:p("card-actions")},K("star",o?"Unstar":"Star",()=>{Xt.toggle(e.name),qe()},o),K("pin",n?"Unpin":"Pin to top",()=>{Zt.toggle(e.name),qe()},n),Oc(e)&&K("gear","Settings",()=>zi(e)),e.required?null:Mn(t,r=>Xr(e,r),`Enable ${e.name}`))),s("div",{class:p("card-name"),text:e.name}),s("div",{class:p("card-desc"),text:e.description,title:e.description}),s("div",{class:p("card-footer"),text:e.authors.join(", ")}))}function Ji(){let e=Wi().some(o=>!o.tags.some(n=>Qi.has(n)));U?.querySelector(`.${p("tabs")}`)?.replaceChildren(...Cc.filter(o=>o.id!=="other"||e).map(o=>s("button",{class:p("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===Fe)},on:{click:()=>{Fe=o.id,Ji(),qe()}}})))}function qe(){if(!U)return;let e=Wi().filter(Bc),t=U.querySelector(`.${p("search")} input`);t&&(t.placeholder=`Search ${Qt(e.length,"plugin")}...`);let o=Rc(e.filter(i=>Ic(i)&&kc(i))),n=U.querySelector(`.${p("grid")}`),r=Co.trim()?"No plugins match your search.":Mc[Fe]??"No plugins available.";n?.replaceChildren(...o.length?o.map(Hc):[s("div",{class:p("empty"),text:r})])}function Nc(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),U?.querySelector(`.${p("popup-backdrop")}`)?yt():Ke())}var Vi,Pn;function Gc(){if(U)return;let e=s("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=Co,e.addEventListener("input",()=>{Co=e.value,qe()}),U=s("div",{class:`bloom-root ${p("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&Ke()}},s("div",{class:p("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},s("div",{class:p("header")},s("div",{class:p("logo")},G("bloom")),s("h2",{class:p("title"),text:"Bloom++"}),s("span",{class:p("hint"),attrs:{"aria-label":Ki,tabindex:"0",[de]:Ki}},G("info")),s("span",{class:p("version"),text:"v2.0.49"}),K("close","Close",Ke)),s("div",{class:p("tabs"),attrs:{role:"tablist"}}),s("div",{class:p("toolbar")},s("label",{class:p("search")},G("search"),e),Ln(On,Tc,t=>{On=t,qe()})),s("div",{class:p("grid")}))),U.addEventListener("keydown",t=>t.stopPropagation()),Pn=new AbortController,document.addEventListener("keydown",Nc,{capture:!0,signal:Pn.signal}),document.body.append(U),Ji(),qe(),Vi=_r(qe),e.focus(),wc.debug("Opened")}function Ke(){yt(),Pn?.abort(),Vi?.(),U?.remove(),U=null}var To=()=>U?Ke():Gc();var Zi=`/*
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
`;var me=M("bloom-entry-"),Yc=4,Hn="--bloom-entry-x",Nn=1,Qe=g({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar. The account menu and the userscript menu always open the panel.",default:!1},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:!0},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:e=>(e.append(P("Reset position",()=>{Qe.store.entryPosition=Nn})),()=>e.replaceChildren())},entryPosition:{type:"custom",default:Nn}}),Se=new Map,Xi=!1,_i=[];function Fc(e,t,o){let n=e.currentTarget,r=t.clientWidth-n.offsetWidth;if(e.button!==0||r<=0||!t.classList.contains(me("hover")))return;let i=Qe.store.entryPosition,a=i,c=!1,l=new AbortController;n.setPointerCapture(e.pointerId),n.addEventListener("pointermove",m=>{!c&&Math.abs(m.clientX-e.clientX)<Yc||(c=!0,o(),a=se(i+(m.clientX-e.clientX)/r,0,Nn),t.style.setProperty(Hn,String(a)))},{signal:l.signal});let u=()=>{l.abort(),c&&(Qe.store.entryPosition=a,t.style.removeProperty(Hn))};n.addEventListener("pointerup",u,{signal:l.signal}),n.addEventListener("lostpointercapture",u,{signal:l.signal})}function Kc(e){let t=!1,o=s("button",{class:me("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),t||To(),t=!1},pointerdown:r=>{t=!1,e!=="rail"&&Fc(r,n,()=>{t=!0})}}},G("bloom"),e!=="rail"&&s("span",{class:me("label"),text:"Bloom++"})),n=s("div",{class:`bloom-root ${me("wrap")} ${me(e)}`,attrs:{"data-bloom":"entry"}},o);return n}function Qc(e){let t=s("div",{class:`bloom-root ${me("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),To()}}},G("bloom"),s("span",{text:"Bloom++"})),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function $i(){let{showSidebarEntry:e,showSidebarEntryOnHover:t}=Qe.store,o=e||t?Pi():[];for(let[r,i]of Se)r.isConnected&&o.some(a=>a.anchor===r)||(i.remove(),Se.delete(r));for(let r of o){let i=Se.get(r.anchor);if(i?.isConnected||!He(r.anchor))continue;let a=i??Kc(r.kind);Se.set(r.anchor,a),r.insert(a)}for(let r of Se.values())r.classList.toggle(me("hover"),!e);let n=xo();n&&!n.querySelector('[data-bloom="menu-entry"]')&&Qc(n)}var ea=f({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:Qe,styles:()=>`${Zi}.${me("hover")}{${Hn}:${Qe.store.entryPosition}}`,start(){_i=[I($i),Ii(),$()],!Xi&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",To),Xi=!0)},stop(){for(let e of _i)e();for(let e of Se.values())e.remove();Se.clear(),Ke()},onSettingsChange:$i});var ta=`/*
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
`;var T=M("bloom-nav-"),Lo=80,jc=1200,zc=2,oa=3e4,Jc=200,Vc=.9,Zc=.3,Xc=12,_c={user:"\u2753",assistant:"\u{1F916}"},$c=["wheel","touchmove","pointerdown"],Bo=g({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),R=null,O=[],we=-1,xe=-1,We=null,Mo="",Un=0,na=[],wt=null,vt,Yn="",qt=[],eu=e=>Bo.store.showAssistant||e.role==="user",tu=e=>e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.messageIds[0]||e.role;function ou(e){return{role:e.role,summary:ho(e),ids:e.messageIds,turn:e,streaming:e.streaming}}function sa(e,t){let o=e.entries.at(-1);if(o?.role==="assistant"&&t.role==="assistant"){e.entries[e.entries.length-1]={...t,ids:[...new Set([...o.ids,...t.ids])]};return}e.entries.push(t)}function nu(){let e=[];for(let t of go()){let o=ou(t),n=tu(t),r=e.at(-1);r?.key===n?sa(r,o):e.push({key:n,entries:[o]})}return e}function ru(){let e=[];for(let t of Z(h())?.chain??[]){let o={role:t.role,summary:bo(t),ids:[t.id],turn:null,streaming:!1},n=e.at(-1);t.role==="assistant"&&n?sa(n,o):e.push({key:t.id,entries:[o]})}return e}var ra=e=>e.entries.flatMap(t=>t.ids);function Fn(e,t){let o=new Set(ra(e));return ra(t).some(n=>o.has(n))}var Ee=e=>x(e.entries.find(t=>t.role==="user")?.summary??""),Gn=(e,t)=>e.filter(o=>Ee(o)===t).length,Kn=e=>({...e,turn:null,streaming:!1});function iu(e,t){let o=new Set(t.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return e.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return Kn(r);let a=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return a&&a!==n.key?Kn(r):r})}))}function au(e,t){let o=t.entries.map((n,r)=>{let i=e.entries[r];if(!i)return n;let a=[...new Set([...n.ids,...i.ids])];return{...n,ids:a,summary:n.summary||i.summary}});for(let n of e.entries.slice(o.length))o.push(Kn(n));return{key:e.key,entries:o}}function la(){let e=pt();if(!e)return!1;let t=e.clientHeight-e.scrollHeight;return e.scrollTop-t<=Math.abs(e.scrollTop)}function su(e,t){let o=iu(e,t);if(!t.length)return o;if(!o.length)return t;let n=t.findIndex(l=>o.some(u=>u.key===l.key));if(n<0)return la()?t.concat(o):o.concat(t);let r=t[n]?.key,i=o.findIndex(l=>l.key===r),a=o.slice(0,i).concat(t.slice(0,n),o.slice(i)),c=a.findIndex(l=>l.key===r);for(let l=n;l<t.length;l++){let u=t[l];if(!u)continue;let m=a.findIndex(v=>v.key===u.key);if(m>=0){let v=a[m];v&&(a[m]=au(v,u)),c=m}else a.splice(c+1,0,u),c++}return a}function lu(e,t){let o=0,n=0,r=0;for(let i=1-e.length;i<t.length;i++){let a=0,c=0;for(let u=0;u<e.length;u++){let m=t[u+i],v=e[u];!m||!v||(Fn(v,m)?(a+=3,c++):Ee(v)&&Ee(v)===Ee(m)&&a++)}let l=la()?i<r:i>r;(a>o||a===o&&c>n||a===o&&c===n&&l)&&(o=a,n=c,r=i)}return{score:o,offset:r}}function cu(e,t){let o=e.entries.map((n,r)=>{let i=t.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of t.entries.slice(o.length))o.push({...n,turn:null});return{key:e.key,entries:o}}function uu(e){return e.map(t=>({key:t.key,entries:t.entries.map(o=>({...o}))}))}function du(e,t){if(!t.length)return e;if(!e.length)return t;let{score:o,offset:n}=lu(e,t),r=uu(e);if(o>0)for(let c=0;c<r.length;c++){let l=t[c+n],u=r[c];if(!l||!u)continue;let m=Ee(u),v=!!m&&m===Ee(l)&&Gn(e,m)===1&&Gn(t,m)===1;(Fn(u,l)||v)&&(r[c]=cu(u,l))}let i=[],a=[];for(let c=0;c<t.length;c++){let l=t[c];if(!l)continue;let u=Ee(l);!u||Gn(r,u)>0||r.some(m=>Fn(m,l))||(o>0&&c<n?i.push(l):a.push(l))}return i.concat(r,a)}function mu(){let e=h()??"";return e!==Yn&&(Yn=e,qt=[]),qt=du(su(qt,nu()),ru()),qt.flatMap(t=>t.entries).filter(eu)}function fu(e){for(let o of e)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!C().generating||e.some(o=>o.streaming))return;let t=e.at(-1);t&&(t.role==="assistant"||!Bo.store.showAssistant?t.streaming=!0:e.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function ca(){let e=mu();return fu(e),e}function pu(e){let t=e.getBoundingClientRect(),o=t.top+t.height*Zc,n=-1;return O.forEach((r,i)=>{let a=r.turn?.el.getBoundingClientRect();a&&a.top<=o&&(n=i)}),n===-1?O.findIndex(r=>r.turn):n}function ia(e){Bo.store.jumpEffect==="border"&&(e.classList.add(T("flash")),setTimeout(()=>e.classList.remove(T("flash")),jc))}function ko(e){let t=O[e],o=pt();if(!t||!o)return;if(!t.turn&&!t.ids.length){xe=e,St(),o.scrollTo({top:wi(o)?0:o.scrollHeight});return}xe=e,We=e?null:{chat:h(),first:t.ids[0],until:Date.now()+oa},St();let n=t.turn?.el;if(n?.isConnected){let u=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:u<o.clientHeight*zc?"smooth":"auto"}),ia(n);return}let r=O.findIndex(u=>u.turn),i=r>=0&&e<r?-1:1,a=++Un,c=Date.now()+oa,l=()=>{let u=pt();if(a!==Un||Date.now()>c||!u)return;O=ca();let m=O.find(Y=>Y.ids.some(b=>t.ids.includes(b)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),ia(m),xe=O.findIndex(Y=>Y.turn?.el===m),St();return}let v=u.scrollTop;u.scrollBy({top:i*u.clientHeight*Vc,behavior:"instant"}),u.scrollTop===v?setTimeout(l,Jc):requestAnimationFrame(l)};l()}function gu(e,t){return s("button",{class:T("row"),attrs:{type:"button","data-index":String(t)},on:{click:()=>ko(t)}},s("span",{text:_c[e.role]}),s("span",{class:"bloom-truncate",text:le(e.summary||"\u2026",Lo)}))}function hu(){let e=pt();if(O=ca(),!O.length||!e){R?.remove(),R=null,Mo="";return}if(wt!==e){vt?.abort(),vt=new AbortController,e.addEventListener("scroll",Oe(St),{passive:!0,signal:vt.signal});for(let r of $c)e.addEventListener(r,ua,{passive:!0,signal:vt.signal});wt=e}R??=s("div",{class:`bloom-root ${T("root")}`,attrs:{"data-bloom":"navigator"}},s("div",{class:T("rail")}),s("div",{class:T("toc")},s("div",{class:T("toc-head")}),s("div",{class:T("toc-list")}))),R.isConnected||document.body.append(R);let t=e.getBoundingClientRect(),o=Math.min(t.bottom,dt()?.getBoundingClientRect().top??t.bottom);R.style.right=`${document.documentElement.clientWidth-t.left-e.clientLeft-e.clientWidth+Xc}px`,R.style.top=`${(t.top+o)/2}px`;let n=JSON.stringify(O.map(r=>[r.role,r.ids]));n!==Mo?(Mo=n,xe=-1,Au(),We&&Date.now()<We.until&&We.chat===h()&&O[0]?.ids[0]!==We.first&&ko(0)):bu(),St()}function St(){if(!R||!wt)return;we=xe>=0?xe:pu(wt),R.querySelectorAll(`.${T("tick")}`).forEach((t,o)=>t.classList.toggle(T("tick-current"),o===we)),R.querySelectorAll(`.${T("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===we)));let e=R.querySelector(`.${T("toc-head")}`);e&&(e.textContent=`${we+1} / ${O.length}`)}function bu(){R?.querySelectorAll(`.${T("tick")}`).forEach((e,t)=>{let o=O[t],n=le(o.summary,Lo);e.title!==n&&(e.title=n),e.classList.toggle(T("tick-streaming"),o.streaming)}),R?.querySelectorAll(`.${T("row")}`).forEach(e=>{let t=e.lastElementChild,o=le(O[Number(e.dataset.index)].summary||"\u2026",Lo);t&&t.textContent!==o&&(t.textContent=o)})}function Au(){R?.querySelector(`.${T("rail")}`)?.replaceChildren(...O.map((e,t)=>s("button",{class:jt(T("tick"),T(`tick-${e.role}`),e.streaming&&T("tick-streaming"),t===we&&T("tick-current")),title:le(e.summary,Lo),attrs:{type:"button","aria-label":`Jump to message ${t+1}`},on:{click:()=>ko(t)}}))),R?.querySelector(`.${T("toc-list")}`)?.replaceChildren(...O.map(gu))}var oe=Oe(hu);function ua(){xe=-1,We=null,Un++}var yu=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function aa(e){if(!R||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||yu(document.activeElement)||document.querySelector("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:we-1,ArrowDown:we+1,Home:0,End:O.length-1}[e.key];if(o==null){ua();return}o<0||o>=O.length||(e.preventDefault(),e.stopPropagation(),ko(o))}var da=f({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:Bo,styles:ta,start(){na=[I(e=>F(e)&&oe()),ce(oe),N.on("conversation",oe),y.on("rise",oe),y.on("fall",oe)],addEventListener("keydown",aa,!0),addEventListener("resize",oe,{passive:!0}),oe()},stop(){for(let e of na)e();vt?.abort(),wt=null,removeEventListener("keydown",aa,!0),removeEventListener("resize",oe),R?.remove(),R=null,Mo="",qt=[],Yn=""},onSettingsChange:oe});var ma=`/*
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
`;var qu=M("bloom-cls"),Su="bloom-cls",wu=600*1e3,Wn=Lr("tab"),ze=new Map,Et=new Map,je=null,fa=[],xu=e=>e==="streaming"||e==="error";function Eu(){let e=new Map,t=Date.now();for(let[o,n]of Et)t-n.at>wu?Et.delete(o):e.set(o,n.status);for(let[o,n]of ze)e.set(o,n);return e}function Cu(e){return s("span",{class:`bloom-root ${qu("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&G("alert"))}function xt(){let e=Eu(),t=new Set;for(let[o,n]of e)for(let r of At(o)){if(!He(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let a=Cu(n);t.add(a),r.append(a)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function Io(e,t){e&&(t?ze.set(e,t):ze.delete(e),je?.postMessage({tab:Wn,id:e,status:t}),xt())}function Tu({data:e}){!w(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===Wn||(xu(e.status)?Et.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):Et.delete(e.id),xt())}function Qn(){for(let e of ze.keys())je?.postMessage({tab:Wn,id:e,status:null})}var pa=f({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:ma,start(){je=typeof BroadcastChannel=="function"?new BroadcastChannel(Su):null,je?.addEventListener("message",Tu),addEventListener("pagehide",Qn),fa=[y.on("rise",({conversationId:e})=>Io(e,"streaming")),y.on("fall",({conversationId:e,outcome:t})=>Io(e,t==="error"?"error":null)),y.on("context",({prevId:e,id:t,migrated:o})=>{o&&C().generating?Io(t,"streaming"):!o&&ze.get(e??"")==="streaming"&&Io(e,null)}),I(e=>F(e)&&xt())],h()&&xt()},stop(){for(let e of fa)e();Qn(),je?.close(),je=null,removeEventListener("pagehide",Qn),ze.clear(),Et.clear(),xt()}});var ha=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],Do={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Mu={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Lu="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",jn=32,Po=64,zn="#FCFCFC",Jn="#111111",Bu=14,Ho=51.5,ku=12.5,Iu=9.75,ga=52,Ru=10.5,Ou=7.75,Du={rotate:e=>e.arc(Ho,Ho,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function Ro(e){let t=document.createElement("canvas");t.width=t.height=jn;let o=t.getContext("2d");return o?(o.scale(jn/Po,jn/Po),e(o),t.toDataURL("image/png")):""}function Oo(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D(Lu);o&&(e.strokeStyle=Jn,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function No(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function Pu(e,t){No(e,Ho,ku,Jn),No(e,Ho,Iu,Do[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),Du[t](e),e.stroke()}function Hu(e,t){e.beginPath(),e.roundRect(0,0,Po,Po,Bu),e.fillStyle=t,e.fill()}var Nu=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function ba(e,t){switch(e){case"original":return Nu(Mu[t]);case"hole":return Ro(o=>Oo(o,Do[t],!0));case"bg":return Ro(o=>{Hu(o,Do[t]),Oo(o,zn,!1)});case"dot":return Ro(o=>{Oo(o,zn,!0),No(o,ga,Ru,Jn),No(o,ga,Ou,Do[t])});case"badge":return Ro(o=>{Oo(o,zn,!0),Pu(o,t)})}}var Tt="bloom-chat-state-favicon",Mt="data-bloom-rel",Xn="data-bloom-media",Aa="bloom-parked-icon",Gu="/favicon.ico",va=g({style:{type:"select",description:"How the tab icon shows the chat state.",options:ha,default:"bg"}}),fe=null,qa="",Go=null,Sa="",ya=new Map,_n,Vn=[],wa=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${Mt}]`)];function $n(){for(let e of wa())e.id!==Tt&&(e.hasAttribute(Mt)||(Sa||=e.href,e.setAttribute(Mt,e.rel),e.setAttribute(Xn,e.getAttribute("media")??"")),e.rel!==Aa&&(e.rel=Aa),e.media!=="not all"&&(e.media="not all"))}function Uu(){for(let e of wa()){let t=e.getAttribute(Mt);if(t==null)continue;e.rel=t;let o=e.getAttribute(Xn);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(Mt),e.removeAttribute(Xn)}}function xa(){let e=document.getElementById(Tt);return e||(e=document.createElement("link"),e.id=Tt,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function Yu(e){if(e==="wait")return Sa||Gu;let t=va.store.style,o=`${t}:${e}`,n=ya.get(o);return n||ya.set(o,n=ba(t,e)),n}function Zn(e){if(e)return"rotate";let t=B();return fe&&t&&t!==qa&&(fe=null),fe==="error"?"error":fe==="done"?"done":t?"ready":"wait"}function Ct(e,t=!1){if(e===Go&&!t)return;Go=e;let o=xa(),n=Yu(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function Fu(){_n=new MutationObserver(()=>{$n(),document.head.lastElementChild?.id!==Tt&&xa()}),_n.observe(document.head,{childList:!0})}var Ea=f({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"HostReady",settings:va,start(){$n(),Ct(Zn(C().generating),!0),Fu(),Vn=[y.on("rise",()=>{fe=null,Ct("rotate")}),y.on("fall",({outcome:e})=>{fe=e==="done"||e==="error"?e:null,qa=B(),Ct(Zn(!1))}),y.on("context",({migrated:e})=>{e||(fe=null)}),y.on("tick",({generating:e})=>{$n(),Ct(Zn(e))})]},stop(){for(let e of Vn)e();Vn=[],_n?.disconnect(),document.getElementById(Tt)?.remove(),Uu(),Go=null,fe=null},onSettingsChange(){Ct(Go??"wait",!0)}});var Ku={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${d.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])']},Ca=g({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0}}),Ta=f({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads and notices.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:Ca,styles:()=>ke(Object.entries(Ku).flatMap(([e,t])=>Ca.store[e]?t:[]))});var Uo=`form:has(:is(${d.composerInput})), ${d.oldComposerForm}`,Ma='[class*="ComposerLayoutRoot"]',Qu=`:is(${Uo}) ${Ma}, :is(${Uo}):not(:has(${Ma})) :is([class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"])`,Wu='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',ju='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',zu="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))",La=g({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function Ju(){let{opacity:e,blur:t}=La.store;return e>=100?"":`:is(${Wu}), :is(${Uo}){background-color:transparent!important;background-image:none!important;box-shadow:none!important}:is(${ju}){display:none!important}${Qu}{background-color:color-mix(in srgb, ${zu} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important}:is(${Uo}) :is(${d.composerInput}){background-color:transparent!important}`}var Ba=f({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:La,styles:Ju});var Vu=1200,Zu=8e3,Xu=150,_u=20,ka=6,or="continue where you left",$u=/message delivery timed out|please try again/i,Ia=/waiting for the complete answer/i,Ra=g({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:or,placeholder:or}}),er=[],Fo=0,Lt=!1,Bt=0,Ve="",Yo="",nr=0,Ze=!1,kt=!1,Ko=!0,Je="",rr=0,Qo=!1,ed=()=>Ra.store.prompt.trim()||or;function Oa(){return(V(d.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function Da(){let e=Oa();return!e||Ia.test(e)||!$u.test(e)?"":e}function td(){let e=Oa();return e&&Ia.test(e)?e:""}function od(){let e=Ne()?.querySelectorAll(d.turn),t=e?.[e.length-1];return`${t?.getAttribute("data-turn-key")??""}:${t?.textContent?.length??0}`}function Pa(e,t,o){if(o===Fo){if(C().generating||B()!==e||t>=_u){Ze=!1,C().generating||(Ve="");return}no(),setTimeout(()=>Pa(e,t+1,o),Xu)}}function nd(e){let t=Fo;if(C().generating||B()&&B()!==e){Ze=!1,Ve="";return}_(e),Qo=!0,ct(()=>{t===Fo&&Pa(e,0,t)})}function Ha(e){return e===Ve||Bt>=ka||C().generating||B()?!1:(Ve=e,Bt+=1,Ze=!0,nd(ed()),!0)}function rd(){if(Lt||Ze||kt)return;let e=Date.now(),t=Da();if(t){if(Je="",t!==Yo){Yo=t,nr=e;return}if(e-nr<Vu)return;Ha(`${h()??""}:${t}`);return}if(Yo="",!td()){Ko=!0,Je="";return}if(!Ko||!C().generating||B())return;let n=`${h()??""}:${od()}`;if(n!==Je){Je=n,rr=e;return}if(e-rr<Zu||Bt>=ka)return;let r=Pe();r&&(kt=!0,r.click())}function tr(){Fo+=1,Lt=!1,Bt=0,Ve="",Yo="",nr=0,Ze=!1,kt=!1,Ko=!0,Je="",rr=0,Qo=!1}var Na=f({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:Ra,start(){tr(),er=[y.on("rise",()=>{Lt=!1,Ve="",Ze=!1,Qo&&(Qo=!1,Ko=!1,Je="")}),y.on("fall",({outcome:e})=>{if(kt){kt=!1,e==="left"?Lt=!0:Ha(`${h()??""}:stall`);return}(e==="stopped"||e==="left")&&(Lt=!0),e==="done"&&!Da()&&(Bt=0)}),y.on("context",({migrated:e})=>{e||tr()}),y.on("tick",rd)]},stop(){for(let e of er)e();er=[],tr()}});var ne=M("bloom-csi-"),id=256,ad=160,Wo=1,Ga=4,sd=.1,ld=.0015,cd=250;function ud(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function dd(e){return new Promise((t,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function md(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:se(t.x,n,1-n),y:se(t.y,r,1-r)}}function Ua(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function fd(e,t){let o=s("canvas");return o.width=o.height=id,Ua(o,e,t),o.toDataURL("image/png")}function Ya(e){let t=null,o={x:k.store.cropX,y:k.store.cropY,zoom:k.store.cropZoom},n,r=s("canvas",{class:ne("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=ad*devicePixelRatio;let i=s("div",{class:`bloom-muted ${ne("status")}`}),a=s("div",{class:ne("zoom")}),c=s("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(b,H=!0){t&&(o=md(t,b),Ua(r,t,o),H&&(clearTimeout(n),n=setTimeout(()=>{t&&(k.store.cropX=o.x,k.store.cropY=o.y,k.store.cropZoom=o.zoom,k.store.avatarUrl=fd(t,o))},cd)))}function u(){a.replaceChildren(So(o.zoom,Wo,Ga,sd,"\xD7",b=>l({...o,zoom:b})))}async function m(b,H){i.textContent="";try{t=await dd(b),H&&(k.store.avatarSource=b,o={x:.5,y:.5,zoom:Wo}),e.classList.add(ne("has-image")),u(),l(o,H)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let v=b=>{b?.type.startsWith("image/")&&ud(b).then(H=>m(H,!0))};c.addEventListener("change",()=>v(c.files?.[0])),r.addEventListener("wheel",b=>{t&&(b.preventDefault(),l({...o,zoom:se(o.zoom*(1-b.deltaY*ld),Wo,Ga)}),u())},{passive:!1}),r.addEventListener("pointerdown",b=>{if(!t)return;r.setPointerCapture(b.pointerId);let H={...o},tt=r.getBoundingClientRect(),Ft=Kt=>{if(!t)return;let j=Math.max(tt.width/t.naturalWidth,tt.height/t.naturalHeight)*o.zoom;l({...o,x:H.x-(Kt.clientX-b.clientX)/(t.naturalWidth*j),y:H.y-(Kt.clientY-b.clientY)/(t.naturalHeight*j)})};r.addEventListener("pointermove",Ft),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",Ft),{once:!0})});let Y=s("div",{class:ne("cropper"),attrs:{tabindex:"0"},on:{paste:b=>v([...b.clipboardData?.files??[]].find(H=>H.type.startsWith("image/"))),dragover:b=>b.preventDefault(),drop:b=>{b.preventDefault(),v(b.dataTransfer?.files[0])}}},s("div",{class:ne("stage")},r),s("div",{class:ne("controls")},bt("",b=>b.trim()&&void m(b.trim(),!0),"https://\u2026 or data:image/\u2026","url"),s("div",{class:ne("buttons")},P("Choose file",()=>c.click()),P("Reset crop",()=>{l({x:.5,y:.5,zoom:Wo}),u()}),P("Clear",()=>{t=null,e.classList.remove(ne("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),a.replaceChildren(),k.store.avatarUrl="",k.store.avatarSource=""},"danger")),a,i,c));return e.append(Y),k.store.avatarSource&&m(k.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var Fa=`/*
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
`;var It="data-bloom-csi-avatar",ir="data-bloom-csi-sized",ja="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",gd=32,k=g({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>Ya(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),Ka=[];function za(e){e.removeAttribute(It),e.removeAttribute(ir)}function Qa(e){return(k.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function Wa(e=[]){if(!F(e))return;let t=k.store.displayName.trim()||null,o=!!k.store.avatarUrl,n=new Set(t?Qa("name"):[]);for(let i of document.querySelectorAll(ja))n.has(i)||ye(i,null);for(let i of n)ye(i,t);let r=new Set(o?Qa("avatar"):[]);for(let i of document.querySelectorAll(`[${It}]`))r.has(i)||za(i);for(let i of r)i.hasAttribute(It)||i.setAttribute(It,""),i.toggleAttribute(ir,!i.closest('[role="menu"]'))}function hd(){let e=k.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${k.store.avatarSize}px}:is(${d.rail}, ${d.oldRail}) [${ir}]{--bloom-csi-size:${gd}px}`:""}var Ja=f({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:k,styles:()=>`${hd()}
${Fa}`,start(){Ka=[$(),I(Wa)]},stop(){for(let e of Ka)e();for(let e of document.querySelectorAll(`[${It}]`))za(e);for(let e of document.querySelectorAll(ja))ye(e,null)},onSettingsChange(){Wa()}});var Xe=M("bloom-greeting-"),Va=30,Za=100;function Xa(e){let t=-1,o=s("textarea",{class:`bloom-input ${Xe("input")}`,attrs:{maxlength:String(Za),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=P("Add",i),r=s("div",{class:Xe("list")});function i(){let l=o.value.trim().slice(0,Za);if(!l)return;let u=[...E.store.greetings];t>=0?u[t]=l:u.length<Va&&u.push(l),E.store.greetings=u,t=-1,o.value="",a()}function a(){let{greetings:l}=E.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&l.length>=Va,r.replaceChildren(...l.length?l.map((u,m)=>s("div",{class:Xe("row",m===t?"row-editing":"row-idle")},s("div",{class:Xe("text"),text:u}),K("edit","Edit",()=>{t=m,o.value=u,o.focus(),a()}),K("trash","Delete",()=>{E.store.greetings=l.filter((v,Y)=>Y!==m),t===m&&(t=-1),a()}))):[s("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),e.append(s("div",{class:Xe("editor")},r,s("div",{class:Xe("form")},o,n))),a();let c=Re((l,u)=>l==="GreetingCustomizer"&&u==="greetings"&&a());return()=>{c(),e.replaceChildren()}}var _a=`/*
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
`;var zo="data-bloom-greeting",Ad=1e3,yd=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],E=g({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>Xa(e)},greetings:{type:"custom",default:yd},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),jo,$a=[],ar,Jo=()=>uo()&&!mo(),es=()=>E.store.greetings.filter(e=>typeof e=="string"&&e.trim());function Ot(){let e=es();if(e.length)if(E.store.order==="random"&&e.length>1){let t=E.store.lastRandom;for(;t===E.store.lastRandom;)t=Math.floor(Math.random()*e.length);E.store.lastRandom=t,E.store.index=t}else E.store.index=(E.store.index+1)%e.length}function vd(){return Jo()?V(d.homeHeading):null}function ts(){for(let e of document.querySelectorAll(`[${zo}]`))e.removeAttribute(zo),ye(e,null)}function Rt(){let e=es(),t=vd();if(!t||!e.length){ts();return}(E.store.index<0||E.store.index>=e.length)&&Ot(),t.setAttribute(zo,""),ye(t,e[Math.max(0,E.store.index)%e.length])}function sr(){clearInterval(jo),jo=void 0,E.store.mode==="interval"&&Jo()&&(jo=setInterval(()=>{Ot(),Rt()},E.store.intervalSec*Ad))}function qd(e){E.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${zo}]`)||getSelection()?.toString()||(Ot(),Rt())}function Sd(){Jo()&&E.store.mode==="refresh"&&Ot(),sr(),Rt()}var os=f({name:"GreetingCustomizer",description:"Replace the \u201CWhat can I help with?\u201D heading on the home page with your own lines.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:E,styles:_a,start(){ar=new AbortController,document.addEventListener("click",qd,{signal:ar.signal}),Jo()&&E.store.mode==="refresh"&&Ot(),sr(),$a=[I(e=>F(e)&&Rt()),ce(Sd)]},stop(){ar?.abort();for(let e of $a)e();clearInterval(jo),ts()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&sr(),Rt()}});var Dt=M("bloom-history-"),lr=10,wd=3e3;function ns(e){let t="",o=0,n=new Set,r=s("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),i=s("div",{class:Dt("list")}),a=s("div",{class:Dt("pager")}),c,l=P("Clear all",()=>{if(!c){l.textContent="Click again to clear",c=setTimeout(()=>{c=void 0,l.textContent="Clear all"},wd);return}clearTimeout(c),c=void 0,l.textContent="Clear all",Pt([])},"danger");function u(){let v=[...Ce.store.entries].toReversed(),Y=t.trim().toLowerCase(),b=Y?v.filter(j=>j.toLowerCase().includes(Y)):v,H=Math.max(1,Math.ceil(b.length/lr));o=Math.min(o,H-1);let tt=b.slice(o*lr,(o+1)*lr).map(j=>s("div",{class:Dt("row")},s("button",{class:Dt("text",n.has(j)?"text-open":"text-closed"),text:j,title:n.has(j)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{n.delete(j)||n.add(j),u()}}}),K("copy","Copy",()=>void Br(j)),K("trash","Delete",()=>Pt(Ce.store.entries.filter(nl=>nl!==j)))));i.replaceChildren(...tt.length?tt:[s("div",{class:"bloom-muted",text:Y?"No matching prompts.":"No saved prompts yet."})]),a.replaceChildren(s("span",{class:"bloom-muted",text:`${b.length} ${Y?"matching":"saved"} \xB7 page ${o+1} of ${H}`}),P("Previous",()=>{o--,u()}),P("Next",()=>{o++,u()}),l);let[Ft,Kt]=a.querySelectorAll("button");Ft.disabled=o===0,Kt.disabled=o>=H-1,l.disabled=!v.length}r.addEventListener("input",()=>{t=r.value,o=0,u()}),e.append(s("div",{class:Dt("manager")},r,i,a)),u();let m=Re((v,Y)=>v==="InputHistory"&&Y==="entries"&&u());return()=>{m(),clearTimeout(c),e.replaceChildren()}}var rs=`/*
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
`;var Ed=M("bloom-history-"),Cd=2e3,Ce=g({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>ns(e)},entries:{type:"custom",default:[]}}),W=null,cr={text:"",at:0},Te=null,ur,Vo=()=>Ce.store.entries.filter(e=>typeof e=="string");function Pt(e){Ce.store.entries=e.slice(-Ce.store.maxEntries)}function dr(e){let t=e.trim();if(!t)return;let o=Date.now();t===cr.text&&o-cr.at<Cd||(cr={text:t,at:o},Pt([...Vo().filter(n=>n!==t),t]))}function Td(e,t){let o=De();if(!o)return;Te??=s("div",{class:`bloom-root ${Ed("hud")}`,attrs:{"data-bloom":"history-hud","aria-live":"polite"}}),Te.textContent=`${e+1} / ${t}`;let n=(o.closest("form")??o).getBoundingClientRect();Te.style.left=`${n.left+n.width/2}px`,Te.style.top=`${n.top}px`,Te.isConnected||document.body.append(Te)}function Ht(){W=null,Te?.remove()}function Md(e){let t=Vo();if(!W)return;let o=t[e];W.index=e,W.shown=o,_(o),Td(t.length-1-e,t.length)}function Ld(e){let t=Vo();if(!t.length)return!1;if(!W){if(e===1)return!1;W={index:t.length,draft:B(),shown:""}}let o=W.index+e;return o<0?!0:o>=t.length?(_(W.draft),Ht(),!0):(Md(o),!0)}function Bd(e){if(e.isComposing||!ut(e.target))return;let t=e.target;if(e.key==="Enter"&&!e.shiftKey){dr(B(t)),Ht();return}if(e.key==="Escape"&&W){_(W.draft),Ht(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey)return;let o=ri(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!W||Ld(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function kd(e){W&&ut(e.target)&&B(e.target)!==W.shown.trim()&&Ht()}function Id(e){e.target instanceof Element&&e.target.closest(d.sendButton)&&dr(B())}var is=f({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:Ce,styles:rs,start(){ur=new AbortController;let{signal:e}=ur;document.addEventListener("keydown",Bd,{capture:!0,signal:e}),document.addEventListener("input",kd,{capture:!0,signal:e}),document.addEventListener("click",Id,{capture:!0,signal:e}),document.addEventListener("submit",()=>dr(B()),{capture:!0,signal:e})},stop(){ur?.abort(),Ht()},onSettingsChange(e){e==="maxEntries"&&Pt(Vo())}});var as=`/*
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
`;var Od=1500,Dd=5e3,Pd=2e3,_e=g({showDate:{type:"boolean",description:"Show the date for messages not sent today.",default:!0},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),Xo=new Map,cs=0,_o,ss=[];function us(e,t){Xo.get(e)!==t&&(Xo.set(e,t),clearTimeout(_o),_o=setTimeout(ds,Pd))}function ds(){let e={..._e.store.stamps,...Object.fromEntries(Xo)};_e.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,Od))}function Hd(e){let t=Z(h())?.times;for(let o=e.length-1;o>=0;o--){let n=Xo.get(e[o])??t?.get(e[o])??_e.store.stamps[e[o]];if(n)return n}return null}var Nd=()=>C().generating||Date.now()-cs<Dd;function Gd(e){let t=new Date(e),o=new Date,n={hour:"2-digit",minute:"2-digit"};if(!_e.store.showDate||t.toDateString()===o.toDateString())return t.toLocaleTimeString(void 0,n);let r=t.getFullYear()===o.getFullYear()?{}:{year:"numeric"};return t.toLocaleString(void 0,{...r,month:"short",day:"numeric",...n})}function ls(e){let t=po(e)??e.getAttribute("data-message-author-role")??e.closest(d.turn)?.getAttribute("data-turn")??e.querySelector(d.authorRole)?.getAttribute("data-message-author-role");if(wn(t))return t;let o=ft(e).at(-1);return Z(h())?.chain.find(n=>n.id===o)?.role??null}function Ud(e){let t=ft(e);if(!t.length||!He(e)||e.querySelector("time:not([data-bloom])"))return;let o=Hd(t);!o&&Nd()&&(o=Date.now(),us(t.at(-1),o));let n=e.querySelector(':scope > time[data-bloom="timestamp"]');if(!o||_e.store.hideOwnMessages&&ls(e)==="user"){n?.remove();return}let r=Gd(o);if(n?.textContent===r)return;let i=s("time",{class:`bloom-timestamp bloom-timestamp-${ls(e)??"assistant"}`,text:r,title:new Date(o).toLocaleString(),attrs:{"data-bloom":"timestamp",datetime:new Date(o).toISOString()}});n?n.replaceWith(i):e.prepend(i)}var Zo=Oe(()=>{for(let e of xn())Ud(e)}),ms=f({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:_e,styles:as,start(){ss=[I(e=>F(e)&&Zo()),N.on("conversation",Zo),N.on("message-time",({messageId:e,time:t})=>{us(e,t),Zo()}),y.on("fall",()=>{cs=Date.now()})]},stop(){for(let e of ss)e();_o&&(clearTimeout(_o),ds());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();Zo()}}});var Yd=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])'],Fd=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],fs=g({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),ps=f({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:fs,styles:()=>ke([...Yd,...fs.store.hideDictationSettings?Fd:[]])});var Me="data-bloom-share",Kd=/^\/g\/g-p-/,Qd=/^(?:share|分享)$/i,Wd=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],jd=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${Me}="project"]`],mr=g({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),$o,fr=!1;function zd(e){if(!F(e))return;let t=Kd.test(location.pathname)&&!h();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${Me}]`))!t||!Qd.test(x(o.textContent??""))?o.removeAttribute(Me):o.hasAttribute(Me)||o.setAttribute(Me,"project")}var gs=f({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:mr,styles:()=>ke([...mr.store.hideShareChat?Wd:[],...mr.store.hideShareProject?jd:[]]),start(){fr=!0,mt().then(()=>{fr&&!$o&&($o=I(zd))})},stop(){fr=!1,$o?.(),$o=void 0;for(let e of document.querySelectorAll(`[${Me}]`))e.removeAttribute(Me)}});var hs='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',Jd='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',Vd="[data-bloom-profile-plan]",bs="visibility:hidden!important;user-select:none!important",ys=g({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function Zd(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=ys.store,r=[];return e&&r.push(n?`:is(${hs}){display:none!important}`:`:is(${hs}){${bs}}`),t&&r.push(`:is(${Jd}){${bs}}`),e&&o&&r.push(`${Vd}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var As,vs=f({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:ys,styles:Zd,start(){As=$()},stop(){As?.()}});var qs=`/*
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
`;var D=M("bloom-queue-"),_d=6,$d=8,Q=null,Nt="",$e=!1,et=!1;function pr(e,t,o){let n=K(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute(de),n.addEventListener("mouseenter",()=>Ss(t)),n.addEventListener("mouseleave",()=>Ss("")),n}function Ss(e){let t=Q?.querySelector(`.${D("tip")}`);t&&(t.textContent=e)}function em(e,t,o,n){et=!0;let r=s("textarea",{class:`bloom-input ${D("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=new AbortController,a=c=>{i.abort(),et=!1,Nt="",c?n.edit(t,r.value):r.replaceWith(s("div",{class:D("text"),text:o}))};addEventListener("keydown",c=>{if(!(c.target!==r||c.isComposing)){if(c.key==="Enter"&&!c.shiftKey)a(!0);else if(c.key==="Escape")a(!1);else return;c.preventDefault(),c.stopImmediatePropagation()}},{capture:!0,signal:i.signal}),r.addEventListener("keydown",c=>c.stopPropagation(),{signal:i.signal}),r.addEventListener("blur",()=>a(!0),{signal:i.signal}),e.querySelector(`.${D("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function tm(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,a=l=>{!i&&Math.abs(l.clientY-n.clientY)<_d||(i||(i=et=!0,e.classList.add(D("dragging"))),e.style.transform=`translateY(${l.clientY-n.clientY}px)`)},c=l=>{if(removeEventListener("pointermove",a),!i)return;et=!1,Nt="";let m=[...r.children].filter(v=>v!==e).filter(v=>v.getBoundingClientRect().top+v.getBoundingClientRect().height/2<l.clientY).length;o.move(t,m)};addEventListener("pointermove",a),addEventListener("pointerup",c,{once:!0})})}function om(e,t,o){let n=s("li",{class:D("row")},s("div",{class:D("text"),text:e}),s("div",{class:D("actions")},pr("trash","Remove from queue",()=>o.remove(t)),pr("edit","Edit",()=>em(n,t,e,o)),pr("send","Send now",()=>o.sendNow(t))));return tm(n,t,o),n}function nm(e){if(!Q)return;let t=e.getBoundingClientRect();Q.style.left=`${t.left}px`,Q.style.width=`${t.width}px`,Q.style.bottom=`${innerHeight-t.top+$d}px`}function gr(){Q?.remove(),Q=null,Nt="",et=!1}function en(e,t){let o=dt();if(!e.length||!lt(o)){gr();return}Q||(Q=s("div",{class:`bloom-root ${D("tray")}`,attrs:{"data-bloom":"queue"}},s("div",{class:D("header")},s("button",{class:D("toggle"),attrs:{type:"button","aria-expanded":String(!$e)},on:{click:i=>{$e=!$e,Q?.classList.toggle(D("collapsed"),$e),i.currentTarget.setAttribute("aria-expanded",String(!$e))}}},s("span",{class:D("count")}),G("chevron")),s("span",{class:D("tip")})),s("ol",{class:D("list")})),Q.classList.toggle(D("collapsed"),$e),document.body.append(Q)),nm(o);let n=JSON.stringify(e);if(et||n===Nt)return;Nt=n;let r=Q.querySelector(`.${D("count")}`);r&&(r.textContent=Qt(e.length,"Queued message")),Q.querySelector(`.${D("list")}`)?.replaceChildren(...e.map((i,a)=>om(i,a,t)))}var rm=new S("PromptQueue"),im=8,Es=150,Cs=20,Ts="BloomPromptQueue",Ms=g({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1}}),re=new Map,tn=!1,Le=null,hr,ws=[],on="draft",br=()=>h()??on,X=()=>re.get(br())??[];function am(){let e=ge(sessionStorage.getItem(Ts)??"");if(w(e))for(let[t,o]of Object.entries(e))Array.isArray(o)&&o.length&&o.every(n=>typeof n=="string")&&re.set(t,o)}function Ls(){try{sessionStorage.setItem(Ts,JSON.stringify(Object.fromEntries([...re].filter(([e])=>e!==on))))}catch(e){rm.warn("Could not save the queue",e)}}function Be(e){e.length?re.set(br(),e):re.delete(br()),Ls(),en(X(),Ar)}function Bs(e,t=0){t>=Cs||C().generating||B()!==e||(no(),setTimeout(()=>Bs(e,t+1),Es))}function nn(e,t=0){if(C().generating||B()){t<Cs&&setTimeout(()=>nn(e,t+1),Es);return}_(e),ct(()=>Bs(e))}function xs(){if(Le!=null){let o=Le;Le=null,nn(o);return}if(!tn||C().generating||B())return;let[e,...t]=X();e!=null&&(tn=!1,Be(t),nn(e))}function ks(e){let t=X(),o=t[e];if(o!=null){if(Be(t.filter((n,r)=>r!==e)),!C().generating){nn(o);return}Le=o,Pe()?.click()}}var Ar={remove:e=>Be(X().filter((t,o)=>o!==e)),edit:(e,t)=>Be(t.trim()?X().map((o,n)=>n===e?t:o):X().filter((o,n)=>n!==e)),sendNow:ks,move(e,t){let o=[...X()],[n]=o.splice(e,1);o.splice(t,0,n),Be(o)}};function sm(e){let t=X();return Ms.store.replacePending&&t.length?(Be([...t.slice(0,-1),e]),!0):t.length>=im?!1:(Be([...t,e]),!0)}function lm(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!ut(e.target)||!C().generating)return;let t=B(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;_(""),Le=t,Pe()?.click();return}if(!t){X().length&&ks(0);return}sm(t)&&_("")}var Is=f({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:Ms,styles:qs,start(){hr=new AbortController,am(),document.addEventListener("keydown",lm,{capture:!0,signal:hr.signal}),ws=[y.on("fall",({outcome:e})=>{tn=e==="done",e==="left"&&(Le=null),xs()}),y.on("context",({prevId:e,id:t,migrated:o})=>{let n=re.get(on);re.delete(on),o&&!e&&t&&n&&re.set(t,n),o||(tn=!1),Ls(),en(X(),Ar)}),y.on("tick",()=>{xs(),en(X(),Ar)})]},stop(){hr?.abort();for(let e of ws)e();gr(),re.clear(),Le=null}});var cm=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function um(){let e=x(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!cm.has(e.toLowerCase())?e:null}function Gt(e){return e?Z(e)?.title??Yi(e)??(e===h()?um():null):null}var Rs=`/*
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
`;var ie=M("bloom-recent-"),ae="home",mm=50,Os=140,fm=new Set(["Backquote"]),pm=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),q=g({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),pe=null,ee=[],te=0,yr,Ds=[],sn=()=>mo()?null:h()??(uo()?ae:null);function Ps(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function Ns(e){let t=Gt(e);t&&q.store.titles[e]!==t&&(q.store.titles={...q.store.titles,[e]:t});let o=Fi(location.href);o&&e===h()&&q.store.projects[e]!==o&&(q.store.projects={...q.store.projects,[e]:o})}function Hs(e){if(!e)return;let t=[e,...q.store.visits.filter(n=>n!==e)].slice(0,mm),o=new Set(t);q.store.visits=t,Object.keys(q.store.previews).some(n=>!o.has(n))&&(q.store.previews=Ps(q.store.previews,o)),Object.keys(q.store.titles).some(n=>!o.has(n))&&(q.store.titles=Ps(q.store.titles,o)),e!==ae&&Ns(e)}function rn(e){if(!e||!q.store.visits.includes(e))return;let t={},o=Z(e)?.chain??[];for(let r of o)t[r.role]=le(bo(r),Os);if(e===h())for(let r of go()){let i=ho(r);i&&(t[r.role]=le(i,Os))}let n=q.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(q.store.previews={...q.store.previews,[e]:t})}function gm(){let e=Number(q.store.maxRecent);return q.store.visits.filter(t=>t!==ae||q.store.includeHome).slice(0,e)}function vr(e){if(Ut(),e===sn())return;let t=e===ae?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"]'):At(e)[0];t?t.click():location.assign(e===ae?"/":`/c/${e}`)}function hm(e,t){let o=e===ae?"New chat":q.store.titles[e]??Gt(e)??"Untitled chat",n=e===ae?null:q.store.projects[e],r=e===ae?null:q.store.previews[e];return s("button",{class:ie("item"),attrs:{type:"button",role:"option","aria-selected":String(t===te)},on:{click:()=>vr(e),mousemove:()=>t!==te&&an(t)}},s("div",{class:ie("head")},s("span",{class:`${ie("title")} bloom-truncate`,text:o}),n&&s("span",{class:ie("project"),text:n})),r?.user&&s("div",{class:`${ie("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&s("div",{class:`${ie("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function an(e){te=(e+ee.length)%ee.length,pe?.querySelectorAll(`.${ie("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===te)))}function bm(){rn(h());let e=sn();ee=gm(),e&&(ee=[e,...ee.filter(t=>t!==e)].slice(0,Number(q.store.maxRecent))),ee.length&&(te=ee.length>1?1:0,pe=s("div",{class:`bloom-root ${ie("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:t=>t.target===t.currentTarget&&Ut()}},s("div",{class:ie("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...ee.map(hm))),document.body.append(pe))}function Ut(){pe?.remove(),pe=null}var Am=e=>fm.has(e.code)||pm.has(e.key);function ym(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&Am(e)){e.preventDefault(),e.stopPropagation(),pe?an(te+(e.shiftKey?-1:1)):bm();return}if(!pe)return;let o={Escape:Ut,Enter:()=>vr(ee[te]),ArrowDown:()=>an(te+1),ArrowUp:()=>an(te-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function vm(e){pe&&e.key==="Control"&&vr(ee[te])}var Gs=f({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:q,styles:Rs,start(){yr=new AbortController;let{signal:e}=yr;addEventListener("keydown",ym,{capture:!0,signal:e}),addEventListener("keyup",vm,{capture:!0,signal:e}),addEventListener("blur",Ut,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&rn(h()),{signal:e}),Ds=[ce(({prevId:i})=>{rn(i),Hs(sn())}),N.on("conversation",({id:i})=>{q.store.visits.includes(i)&&Ns(i),rn(i)})];let{visits:t,titles:o,previews:n}=q.store,r=t.filter(i=>i!==ae&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(q.store.visits=t.filter(i=>!r.includes(i))),Hs(sn())},stop(){yr?.abort();for(let e of Ds)e();Ut()}});var qr="data:audio/mpeg;base64,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";var Us=new S("ResponseNotification"),qm=.5,Sm=200,wm=300,Yt=g({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:e=>(e.append(P("Preview",Qs)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),Ys=null,Sr=new Map,Fs,wr;function xm(e){return new Promise((t,o)=>GM_xmlhttpRequest({url:e,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=Sm&&n<wm?t(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var Em=e=>Uint8Array.from(atob(e.slice(e.indexOf(",")+1)),t=>t.charCodeAt(0)).buffer;function Cm(e,t){let o=Sr.get(t);return o||(o=(t.startsWith("data:")?Promise.resolve(Em(t)):xm(t)).then(n=>e.decodeAudioData(n)),o.catch(()=>Sr.delete(t)),Sr.set(t,o)),o}async function Ks(e){Ys??=new AudioContext;let t=Ys;t.state==="suspended"&&t.resume();let o=t.createBufferSource(),n=t.createGain();o.buffer=await Cm(t,e),n.gain.value=qm,o.connect(n).connect(t.destination),o.start()}function Qs(){let e=Yt.store.soundUrl.trim();Ks(e||qr).catch(t=>{Us.warn("Sound failed",t),e&&Ks(qr).catch(o=>Us.warn("Default chime failed",o))})}function Tm(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function Mm(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(wr=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:wr.signal}))}var Ws=f({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:Yt,start(){Mm(),Fs=y.on("fall",({conversationId:e,outcome:t})=>{t==="done"&&(Yt.store.onlyWhenHidden&&!document.hidden||(Yt.store.sound&&Qs(),Yt.store.browserNotification&&Tm(Gt(e))))})},stop(){Fs?.(),wr?.abort()}});var Lm=`:is(${d.sidebarScroll}, :has(> ${d.sidebarScroll})) + :has(${d.menuButton})`,Bm=`${d.rail} > :has(${d.menuButton})`,Er=`:is(${Lm}, ${Bm}, ${d.oldProfile}):not(:hover)`,xr="[data-bloom-profile-avatar]",km=`:is(${Er}, ${Er} :has(${xr})) > :not(${xr}, :has(${xr}))`,zs=g({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function Im(){let{opacity:e,fadeAvatar:t}=zs.store;return e>=100?"":`${t?Er:km}{opacity:${e/100}!important}`}var js,Js=f({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:zs,styles:Im,start(){js=$()},stop(){js?.()}});var Rm="filter:blur(6px)!important;transition:filter 0.2s ease",Vs=`:is(${d.sidebars})`,Om={conversations:{selectors:[`${Vs} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0},projects:{selectors:[`${Vs} a:is([href*="/project"], [href*="/g/g-p-"])`,"[data-app-action-sidebar-project-row]",".bloom-recent-project"],hover:!0},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}},Xs=g({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function Dm(){return Object.entries(Om).filter(([e])=>Xs.store[e]).map(([,{selectors:e,hover:t}])=>{let o=e.join(",");return`:is(${o}){${Rm}}`+(t?`:is(${o}):hover, .bloom-recent-item:hover :is(${o}){filter:none!important}`:"")}).join(`
`)}var Zs,_s=f({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:Xs,styles:Dm,start(){Zs=$()},stop(){Zs?.()}});var Pm=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],Hm=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",Nm='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',$s=g({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function Gm(){let e=`${$s.store.width}rem`;return`:is(${Hm}){${Pm.map(t=>`${t}:${e}!important`).join(";")}}:is(${Nm}){max-width:min(100%, ${e})!important}`}var el=f({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:$s,styles:Gm});var Um=[ea,da,pa,Ea,Ta,Ba,Na,Ja,os,is,ms,ps,gs,vs,Is,Gs,Ws,Js,_s,el],Cr=Um;var Ym=new S("Bloom"),tl="2.0.49";async function Tr(){fi();for(let e of Cr)e.updatedAt=Li[e.name];zr(Cr),await Fr(),Wt("base",$r),Mi(),$t("Init"),ao().then(()=>{Or(),$t("DOMContentLoaded")}),await gi(),$t("HostReady"),Ym.info(`Bloom++ ${tl} ready`)}var ol=new S("Boot");if(window===window.top){let e=z.Bloom;e&&ol.warn("Replacing another Bloom++ instance",e.VERSION),Object.defineProperty(z,"Bloom",{value:Mr,configurable:!0,writable:!0}),Tr().catch(t=>ol.error("Startup failed",t))}})();
