// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.93
// @description  Void++-style plugin host for chatgpt.com. Tab favicon, input history, recent chats, reply notify, next-prompt queue, Recents status, wider thread, thread outline, message times, streamer blur, custom home greeting, custom sidebar identity, hide Share, Dictation, sidebar name, Download apps, upgrade CTAs, and ads.
// @author       0-V-linuxdo & Bloom contributors
// @homepageURL  https://github.com/0-V-linuxdo/Bloom
// @supportURL   https://github.com/0-V-linuxdo/Bloom/issues
// @icon         https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/v2/assets/logos/app-icon/bloom-icon.svg
// @icon64       https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/v2/assets/logos/app-icon/bloom-icon-64.png
// @match        https://chatgpt.com/*
// @match        https://*.chatgpt.com/*
// @match        https://chat.openai.com/*
// @run-at       document-start
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

/* Bloom++ v2.0.93. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var wd=Object.defineProperty;var Sd=(e,t)=>{for(var o in t)wd(e,o,{get:t[o],enumerable:!0})};var x=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var ce=(e,t,o)=>Math.min(o,Math.max(t,e)),k=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),on=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,fe=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,b=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function nn(e,t){return`${e} ${t}${e===1?"":"s"}`}async function Ja(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function Re(e){try{return JSON.parse(e)}catch{return}}var _=typeof unsafeWindow>"u"?window:unsafeWindow;var xd=new x("Styles"),De=new Map,ao=new Set,_e=new Map,Rr=!0,Za=e=>e.replaceAll(/[^A-Za-z0-9_-]/g,"_"),qd=e=>`:where(:root){--bloom-sheet-${Za(e)}:1}`,Ed=(e,t)=>`${qd(e)}${t}`,$a=e=>`bloom-style-${e}`;function Xa(e){try{return[...e.cssRules].map(t=>t.cssText).join(`
`)}catch{return""}}function Td(e,t){let o=Xa(e);return o?o.includes(`--bloom-sheet-${Za(t)}`)?!0:t==="plugin-StreamerMode"?o.includes("blur(6px)")&&(o.includes("data-app-action-sidebar-thread-title")||o.includes("data-bloom-streamer-open")):t==="plugin-WiderChat"?o.includes("--composer-adjacent-max-width")&&o.includes("--thread-content-max-width"):t==="plugin-ComposerOpacity"?o.includes("--composer-layout-surface-backdrop-filter")||o.includes("--composer-layout-surface-background")&&o.includes("color-mix"):!1:!1}function _a(e){let t=Xa(e);return t?!!(t.includes("--bloom-")||t.includes(".bloom-")||t.includes("[data-bloom")||t.includes("--bloom-sheet-")||t.includes("blur(6px)")&&t.includes("data-app-action-sidebar-thread-title")||t.includes("--composer-adjacent-max-width")&&t.includes("--thread-content-max-width")||t.includes("--composer-layout-surface-backdrop-filter")):!1}function es(){let e=document.adoptedStyleSheets.filter(t=>!ao.has(t)&&!_a(t));document.adoptedStyleSheets=[...e,...De.values()]}function ts(e){document.readyState==="loading"||e.parentNode===document.head||document.head.append(e)}function Cd(e,t){let o=_e.get(e);o||(o=document.createElement("style"),o.id=$a(e),_e.set(e,o)),o.textContent!==t&&(o.textContent=t),ts(o)}function xt(e,t){let o=Ed(e,t);if(Rr)try{let n=De.get(e);n||(n=new _.CSSStyleSheet,De.set(e,n),ao.add(n)),n.replaceSync(o),es();return}catch(n){xd.warn("Constructed style sheets unavailable, using <style> after parsing",n),Rr=!1;let r=De.get(e);r&&ao.delete(r),De.delete(e)}Cd(e,o)}function so(e){let t=De.get(e);t&&(ao.delete(t),De.delete(e)),_e.get(e)?.remove(),_e.delete(e);for(let o of document.querySelectorAll(`style[id="${$a(e)}"]`))o.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(o=>o!==t&&!Td(o,e)),Rr&&es()}catch{}}function lo(){De.clear(),ao.clear();for(let e of _e.values())e.remove();_e.clear();for(let e of document.querySelectorAll("style[id^='bloom-style-']"))e.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(e=>!_a(e))}catch{}}function os(){for(let e of _e.values())ts(e)}var C=e=>(...t)=>t.map(o=>e+o).join(" "),rn=(...e)=>e.filter(Boolean).join(" "),He=e=>e.length?`${e.map(t=>`${t}:not([data-bloom])`).join(",")}{display:none!important}`:"";var ns="__bloomHost",Dr=new x("Boot"),Md=['[data-bloom="navigator"]','[data-bloom="settings"]','[data-bloom="history-hud"]','[data-bloom="history-dialog"]','[data-bloom="star-list"]','[data-bloom="entry"]','[data-bloom="menu-entry"]','[data-bloom="message-star"]','[data-bloom="starred"]','[data-bloom="chat-star"]','[data-bloom="queue"]','[data-bloom="recent"]','[data-bloom="quote-chip"]','[data-bloom="quote-back"]','[data-bloom="cls"]','[data-bloom="timestamp"]','[data-bloom="tooltip"]','[data-bloom="notices"]'].join(", "),Ld=["data-bloom-greeting","data-bloom-placeholder","data-bloom-streamer-open","data-bloom-share","data-bloom-invite","data-bloom-csi-avatar","data-bloom-csi-sized"];function an(){if(!(typeof document>"u"||!document.documentElement)){for(let e of document.querySelectorAll(Md))e.remove();for(let e of Ld)for(let t of document.querySelectorAll(`[${e}]`))t.removeAttribute(e);for(let e of document.querySelectorAll("[data-bloom-text]"))e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size"),e.style.removeProperty("--bloom-text")}}function kd(e){if(Dr.warn("Replacing another Bloom++ instance",e.VERSION),e.destroy){e.destroy();return}for(let t of e.plugins?.values()??[]){try{t.stop?.()}catch(o){Dr.error("Failed to stop previous plugin",o)}t.styles="",t.start=void 0}lo()}function rs(e){let t=_,o=new Set;for(let n of[e,t.Bloom,t[ns]])if(!(!n||o.has(n))){o.add(n);try{kd(n)}catch(r){Dr.error("Failed to retire Bloom++",r)}}an()}function is(e){let t=_;try{delete t.Bloom}catch{}Object.defineProperty(t,"Bloom",{value:e,configurable:!0,writable:!0}),Object.defineProperty(t,ns,{value:e,configurable:!0,writable:!0})}var Va={};Sd(Va,{VERSION:()=>vd,destroy:()=>sy,init:()=>za,plugins:()=>ee});var Id=new x("Dom");function s(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var as=document.createElement("template");function ss(e){return as.innerHTML=e.trim(),as.content.firstElementChild.cloneNode(!0)}var et=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),K=(e,t=document)=>[...t.querySelectorAll(e)].find(et)??null,Bd=16,Od="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function cn(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([Od],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function uo(e){document.hidden?setTimeout(e,Bd):requestAnimationFrame(e)}function Ne(e){let t=!1;return()=>{t||(t=!0,uo(()=>{t=!1;try{e()}catch(o){Id.error("Scheduled task failed",o)}}))}}var sn=new Set,ln=[],co,Pd=Ne(()=>{let e=ln;ln=[];for(let t of sn)t(e)});function M(e){return sn.add(e),co||(co=new MutationObserver(t=>{ln.push(...t),Pd()}),co.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{sn.delete(e),!sn.size&&(co?.disconnect(),co=void 0,ln=[])}}var Rd=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),U=e=>!e.length||e.some(t=>!Rd(t.target)),Dd=e=>`"${e.replaceAll("\\","\\\\").replaceAll('"','\\"').replaceAll(`
`,"\\A ")}"`;function tt(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size"),e.style.removeProperty("--bloom-text");return}e.style.setProperty("--bloom-text",Dd(t)),e.getAttribute("data-bloom-text")!==t&&e.setAttribute("data-bloom-text",t)}function f(e){return e}var ls=new x("Storage");function un(e){try{return localStorage.getItem(e)??void 0}catch{return}}function dn(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(o){ls.warn("localStorage write failed",o)}}function Hr(e){try{localStorage.removeItem(e)}catch(t){ls.warn("localStorage delete failed",t)}}function cs(e,t){addEventListener("storage",o=>{o.key===e&&t(o.newValue)})}var Nr="BloomSettings",Hd=100,Ue={plugins:{}},mn=new Set,Ur=new Set,qt;function us(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=Re(t);return!k(t)||!k(t.plugins)||!Object.keys(t.plugins).length?null:t}function ds(){let e=us(un(Nr));e&&(Ue.plugins=e.plugins)}var ms=(e,t)=>`${e}
${t}`;function Fr(){qt=void 0,Ur.clear(),dn(Nr,Ue)}function Nd(e){let t=us(e);if(!t)return;let o=[];for(let n of new Set([...Object.keys(Ue.plugins),...Object.keys(t.plugins)])){let r=Ue.plugins[n]??={},i=k(t.plugins[n])?t.plugins[n]:{};for(let a of new Set([...Object.keys(r),...Object.keys(i)]))Ur.has(ms(n,a))||JSON.stringify(r[a])===JSON.stringify(i[a])||(i[a]===void 0?delete r[a]:r[a]=i[a],o.push([n,a]))}for(let[n,r]of o)for(let i of mn)i(n,r)}function Gr(){qt&&(clearTimeout(qt),Fr())}function fs(e){let t=Object.keys(Ue.plugins).filter(o=>!e.has(o));if(!t.length)return t;for(let o of t)delete Ue.plugins[o];return clearTimeout(qt),Fr(),t}var re=(e,t)=>Ue.plugins[e]?.[t];function pe(e,t,o){let n=Ue.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,Ur.add(ms(e,t)),clearTimeout(qt),qt=setTimeout(Fr,Hd);for(let r of mn)r(e,t)}function Et(e){return mn.add(e),()=>void mn.delete(e)}function Yr(e){return e.type==="component"?void 0:e.default}function p(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>re(t.pluginName,n)??(e[n]&&Yr(e[n])),set:(o,n,r)=>(pe(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&re(t.pluginName,o)!==void 0&&pe(t.pluginName,o)}};return t}var ps=e=>{let t=()=>{let o=re("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();pe("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},fn=ps("pinnedPlugins"),pn=ps("starredPlugins");addEventListener("pagehide",Gr);cs(Nr,Nd);var po=new x("PluginManager"),ee=new Map,ot=new Set,Qr=new Set,Kr=new Set,mo=new Map,Ud=2880*60*1e3;function gs(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),ee.set(t.name,t)}var hs=()=>{let e=re("Settings","knownPlugins");return k(e)?e:null};function bs(){let e=fs(new Set(ee.keys()));e.length&&po.info(`Dropped settings of removed plugins: ${e.join(", ")}`);let t=hs(),o=Date.now(),n={...t},r=[...ee.values()].filter(i=>!i.hidden&&!i.required&&!(i.name in n));for(let i of r)n[i.name]=t?o:0;for(let i of Object.keys(n))ee.has(i)||delete n[i];JSON.stringify(n)!==JSON.stringify(t)&&pe("Settings","knownPlugins",n)}var ys=e=>{let t=hs()?.[e];return!!t&&Date.now()-t<Ud},As=e=>mo.get(e);function vs(){for(let e of Kr)e()}function ws(e,t){let o=mo.get(e);(t?o?.join(`
`)===t.join(`
`):!o)||(t?mo.set(e,t):mo.delete(e),vs())}var Fe=e=>!!e.required||(re(e.name,"enabled")??!!e.enabledByDefault);var fo=e=>`plugin-${e.name}`;function Ss(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?xt(fo(e),t):so(fo(e))}function Fd(e){if(!ot.has(e.name))try{Ss(e),e.start?.(),ot.add(e.name)}catch(t){so(fo(e)),po.error(`Failed to start ${e.name}`,t)}}function jr(e){ot.delete(e.name),so(fo(e));try{e.stop?.()}catch(t){po.error(`Failed to stop ${e.name}`,t)}}var xs=e=>e.startAt??"HostReady";function qs(e){if(Fe(e)){Qr.has(xs(e))&&Fd(e);return}jr(e)}function hn(e){Qr.add(e);for(let t of ee.values())xs(t)===e&&qs(t);po.info(`${e}: ${[...ot].join(", ")}`)}function Es(e,t){pe(e.name,"enabled",t),Gr()}function Gd(){for(let e of ee.values())e.required||Fe(e)||(ot.has(e.name)?jr(e):so(fo(e)))}var gn;function Ts(){gn?.(),gn=M(()=>Gd())}function Cs(){gn?.(),gn=void 0;for(let e of ee.values())jr(e);ot.clear(),Qr.clear(),mo.clear()}function Ms(e){return Kr.add(e),()=>void Kr.delete(e)}Et((e,t)=>{let o=ee.get(e);if(o){if(t==="enabled"){typeof re(e,"enabled")=="boolean"&&qs(o),vs();return}if(ot.has(e))try{Ss(o),o.onSettingsChange?.(t)}catch(n){po.error(`Settings change failed for ${e}`,n)}}});var Ls=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

html {
    --bloom-fg: var(--color-text-primary, var(--text-primary, var(--app-color-text-foreground, #0d0d0d)));
    --bloom-fg-2: var(--color-text-secondary, var(--text-secondary, var(--app-color-text-foreground-secondary, #5d5d5d)));
    --bloom-fg-3: var(--color-text-tertiary, var(--text-tertiary, var(--app-color-text-foreground-tertiary, #8f8f8f)));
    --bloom-border: var(--color-token-border-default, var(--border-medium, #0000001a));
    --bloom-border-light: var(--color-token-border-light, var(--border-light, #0000000d));
    --bloom-hover: var(--color-token-list-hover-background, var(--color-background-primary-soft-hover, var(--app-color-background-button-secondary-hover, #0000000d)));
    --bloom-accent: var(--color-chart-blue, #3a83f7);
    --bloom-surface: #fff;
    --bloom-surface-2: #f3f3f3;
    --bloom-input: #fafafa;
    --bloom-card: #fff;
    --bloom-shadow: 0 1rem 3rem #00000026, 0 0 0 1px #0000000d;
    --bloom-danger: #ef4444;
}

:is(.dark, [data-theme="dark"]) {
    --bloom-fg: var(--color-text-primary, var(--text-primary, var(--app-color-text-foreground, #ededed)));
    --bloom-fg-2: var(--color-text-secondary, var(--text-secondary, var(--app-color-text-foreground-secondary, #cdcdcd)));
    --bloom-fg-3: var(--color-text-tertiary, var(--text-tertiary, var(--app-color-text-foreground-tertiary, #afafaf)));
    --bloom-border: var(--color-token-border-default, var(--border-medium, #ffffff26));
    --bloom-border-light: var(--color-token-border-light, var(--border-light, #ffffff0d));
    --bloom-hover: var(--color-token-list-hover-background, var(--color-background-primary-soft-hover, var(--app-color-background-button-secondary-hover, #ffffff1a)));
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

[data-bloom-greeting][data-bloom-text] {
    display: block !important;
    text-align: center;
}

[data-bloom-text] > * {
    display: none !important;
}

[data-bloom-text]::before {
    content: var(--bloom-text);
    font: inherit;
    letter-spacing: inherit;
    white-space: pre-wrap;
    word-spacing: normal;
}
`;var Kd=new x("Events");function bn(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){Kd.error(`Listener for ${String(t)} failed`,r)}}}}var u={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',readAloud:'button:is([aria-label="Read aloud" i], [aria-label^="Read aloud" i], [aria-label="Stop reading" i], [aria-label^="Stop reading" i], [aria-label="\u6717\u8BFB"], [aria-label^="\u6717\u8BFB"], [aria-label="\u505C\u6B62\u6717\u8BFB"], [data-testid*="read-aloud" i])',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',composerConversation:"[data-above-composer-conversation-id]",oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",modelTrigger:'[data-testid="model-switcher-dropdown-button"], button[aria-label="Model selector" i], button[aria-label="Select ChatGPT model" i]',modelItem:'[role="menu"] [data-testid^="model-switcher-"], [role="menuitem"][data-testid^="model-switcher-"], [role="menu"] [role="menuitemradio"], [role="menu"] [data-reasoning-slider]',effortSlider:'[role="menu"] [data-reasoning-slider]',homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]',headerMore:'button[aria-label="More" i], button[aria-label="\u66F4\u591A"]',rightPanel:"aside[data-app-shell-focus-area='right-panel']",summaryPanel:"[data-summary-panel-variant]"};var ks=/[​-‍﻿]/g,ue=()=>K(u.composerInput),nt=e=>e instanceof HTMLElement&&e.matches(u.composerInput),j=(e=ue())=>e?.closest("form")??document.querySelector(u.oldComposerForm);function L(e=ue()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(ks,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(ks,"").trim()}var Qd=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function ie(e,t=ue()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return Qd?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function Is(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:a,value:c}=e;return{first:!c.slice(0,i).includes(`
`),last:!c.slice(a).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var Bs=e=>{let t=j();return(t&&K(e,t))??K(e)},Tt=()=>Bs(u.stopButton),jd=()=>{let e=Bs(u.sendButton);return e&&!e.matches(u.stopButton)?e:null};function yn(){let e=jd();if(e){e.disabled||e.click();return}ue()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var Os=()=>et(Tt());var Ds=new x("Network"),Wd=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,zd=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,vn=1e3,Vd=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),W=bn(),zr=new Map,Ps=new Map,Jd=1,de=e=>e?zr.get(e)??null:null;function An(e){let t=zr.get(e);return t||zr.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var Hs=e=>e==="user"||e==="assistant";function Ns(e){let t=e.author?.role;if(!e.id||!Hs(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(l=>typeof l=="string").join(`
`).trim(),i=n.filter(l=>k(l)&&l.content_type==="image_asset_pointer").length,a=e.metadata?.attachments,c=Array.isArray(a)&&a.length>0;return!r&&!i&&!c?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*vn:null,text:r,hasFiles:c,imageCount:i}}var Us=e=>e.filter((t,o)=>t.role==="user"||e[o+1]?.role!=="assistant"),Vr=e=>e.map(t=>t.createTime).filter(t=>t!=null);function Zd(e,t){let o=Vr(e),n=Vr(t);return!o.length||!n.length?!1:Math.max(...o)<Math.min(...n)}function $d(e){let t=Vr(e);if(t.length<2)return e;let[o]=t,n=o-e.length;return e.map((i,a)=>(i.createTime!=null&&(n=i.createTime),{message:i,index:a,time:i.createTime??n})).toSorted((i,a)=>i.time-a.time||i.index-a.index).map(i=>i.message)}function Xd(e,t){let o=t.filter(k).map(c=>k(c.message)?c.message:c);for(let c of o)c.id&&c.create_time&&e.times.set(c.id,c.create_time*vn);let n=o.map(Ns).filter(c=>c!=null),r=new Set(n.map(c=>c.id)),i=e.chain.filter(c=>!r.has(c.id)),a=Zd(n,i)?[...n,...i]:[...i,...n];return e.chain=Us($d(a)),e}function _d(e,t){if(!k(t)||!(k(t.mapping)||Array.isArray(t.messages)))return null;let o=An(e);if(typeof t.title=="string"&&t.title&&(o.title=t.title),Array.isArray(t.messages))return Xd(o,t.messages);let n=t.mapping;for(let c of Object.values(n)){let l=c.message?.create_time;c.message?.id&&l&&o.times.set(c.message.id,l*vn)}let r=[],i=new Set,a=typeof t.current_node=="string"?t.current_node:null;for(;a&&!i.has(a)&&n[a];){i.add(a);let c=n[a].message,l=c?Ns(c):null;l&&r.push(l),a=n[a].parent??null}return r.length&&(o.chain=Us(r.toReversed())),o}function em(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}var Wr=e=>typeof e=="string"?e:null;function tm(e){let t=typeof e?.body=="string"?Re(e.body):null;if(!k(t))return{conversationId:null,parentId:null,userId:null};let[o]=Array.isArray(t.messages)?t.messages:[];return{conversationId:Wr(t.conversation_id),parentId:Wr(t.parent_message_id),userId:k(o)?Wr(o.id):null}}function om(e,t){if(!k(e))return;typeof e.type=="string"&&Vd.has(e.type)&&(t.handoff=!0);let o=k(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(An(e.conversation_id).title=e.title,W.emit("conversation",An(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&Hs(n.author?.role)){let r=n.create_time*vn;t.conversationId&&An(t.conversationId).times.set(n.id,r),W.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function nm(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:a}=await o.read();if(i)break;r+=n.decode(a,{stream:!0});let c=r.split(`
`);r=c.pop()??"";for(let l of c){if(!l.startsWith("data:"))continue;let d=l.slice(5).trim();d&&d!=="[DONE]"&&om(Re(d),t)}}}async function rm(e,t,o){let{conversationId:n}=t,r={conversationId:n,error:!1,handoff:!1};Ps.set(e,n),W.emit("generate-start",{requestId:e,...t});try{let i=await o;i.ok?i.headers.get("content-type")?.includes("event-stream")&&await nm(i.clone(),r):r.error=!0}catch(i){let a=i instanceof DOMException&&i.name==="AbortError";r.handoff||=a,r.error||=!a}finally{Ps.delete(e),W.emit("generate-end",{requestId:e,...r})}}async function im(e,t){try{let o=await t;if(!o.ok)return;let n=_d(e,await o.clone().json());n&&W.emit("conversation",n)}catch(o){Ds.debug("Conversation read skipped",o)}}function am(e,t,o){let n=em(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&Wd.test(n.pathname)){rm(Jd++,tm(t),o);return}let i=r==="GET"&&n.pathname.match(zd)?.[1];i&&im(i,o)}var Rs=!1;function Fs(){if(Rs)return;Rs=!0;let e=_.fetch,t=function(o,n){let r=e.call(this??_,o,n);try{am(o,n,r)}catch(i){Ds.error("Fetch tap failed",i)}return r};_.fetch=typeof exportFunction=="function"?exportFunction(t,_):t}var sm="__reactContainer$",Gs="__reactFiber$";function wn(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var Jr=(e,t)=>Object.keys(e.wrappedJSObject??e).some(o=>o.startsWith(t)),me=e=>!Jr(document,sm)||Jr(e,Gs);function rt(){return document.body?Promise.resolve():new Promise(e=>{let t=new MutationObserver(()=>{document.body&&(t.disconnect(),e())});t.observe(document,{childList:!0,subtree:!0})})}async function Ys(){await rt();let e=Date.now()+8e3;for(;!Jr(document.body,Gs)&&Date.now()<e;)await new Promise(t=>setTimeout(t,100))}var lm=new x("Route"),Ks=/\/c\/(?!local-)([\w-]+)/,cm=500,Xr=e=>{try{return new URL(e,location.origin).pathname.match(Ks)?.[1]??null}catch{return null}},h=()=>location.pathname.match(Ks)?.[1]??null,Ct=()=>location.pathname==="/",um=/^\/g\/g-p-[^/]+(?:\/project)?\/?$/,En=()=>um.test(location.pathname),ge=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",xn=new Set,qn=location.href,$r=h(),Sn;function Zr(){if(location.href===qn)return;let e={prevHref:qn,href:location.href,prevId:$r,id:h()};qn=e.href,$r=e.id;for(let t of xn)try{t(e)}catch(o){lm.error("Route listener failed",o)}}function dm(){let e=new AbortController,{navigation:t}=_;t?.addEventListener("currententrychange",()=>queueMicrotask(Zr),{signal:e.signal}),addEventListener("popstate",Zr,{signal:e.signal});let o=setInterval(Zr,cm);return()=>{e.abort(),clearInterval(o)}}function he(e){return xn.add(e),Sn||(qn=location.href,$r=h(),Sn=dm()),()=>{xn.delete(e),!xn.size&&(Sn?.(),Sn=void 0)}}var mm=["data-turn","data-message-author-role"],fm=/:(user|assistant)$/,_r=`${u.messageUnit}, ${u.oldMessage}`,ei=e=>e==="user"||e==="assistant",zs=()=>!!document.querySelector(u.timelineScroll),Vs=()=>!!K(u.timelineScroll),Js=()=>h()??document.querySelector(u.composerConversation)?.getAttribute("data-above-composer-conversation-id")??"",Mt=()=>zs()?K(u.timelineScroll):document;function ho(){if(zs())return K(u.timelineScroll);let e=document.querySelector(u.turn);for(let t=e?.parentElement;t;t=t.parentElement){let{overflowY:o}=getComputedStyle(t);if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight)return t}return document.scrollingElement}var Lt=e=>e.getAttribute("data-chatgpt-search-unit-key")?.match(fm)?.[1]??null,Zs=e=>[...e.querySelectorAll(u.searchUnit)].filter(t=>Lt(t)&&!t.parentElement?.closest(u.searchUnit)),Qs=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function go(e){let t=Qs(e);return t.length?t:[...new Set([...e.querySelectorAll(_r)].flatMap(Qs))]}function kt(e=Mt()){if(!e)return[];let t=Zs(e);return t.length?t:[...e.querySelectorAll(_r)].filter(o=>!o.parentElement?.closest(_r))}function pm(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function gm(e){for(let t of mm){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(ei(o))return o}return e.querySelector(u.markdown)||e.querySelector(u.generatedImage)?"assistant":null}var hm=e=>!e.parentElement?.closest(u.turn);function Ge(){let e=de(h())?.chain??[];return[...Mt()?.querySelectorAll(u.turn)??[]].filter(hm).flatMap(o=>{let n=Zs(o),r=n.length?n.map(i=>({el:i,known:Lt(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=d=>!n.some(m=>m.contains(d))&&b(d.textContent??""),a=[...o.querySelectorAll(u.assistantMarkdown)].find(d=>i(d)&&!Tn.test(b(d.textContent??""))),c=[...o.querySelectorAll(u.activityHeader)].findLast(i),l=a??c;l&&r.push({el:l,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?go(o):kt(o).flatMap(go),a=n??gm(o)??pm(i,e)??(r%2?"assistant":"user"),c=o.closest(u.turn)??o,l=!o.closest(u.searchUnit)&&!!c.querySelector(u.turnBusy),d=a==="assistant"&&(o.matches(u.turnBusy)||!!o.querySelector(u.turnBusy)||l);return{el:o,role:a,messageIds:i,streaming:d}})}var bm="[data-bloom], .sr-only",$s=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,Tn=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,js=new WeakMap;function It(e){let o=(e.el.closest(u.turn)??e.el).textContent?.length??0,n=js.get(e.el);if(n?.length===o)return n.summary;let r=ym(e);return js.set(e.el,{length:o,summary:r}),r}function Ws(e){let t=new Set,o=[];for(let n of e.querySelectorAll(u.assistantMarkdown)){if(n.closest(u.searchUnit))continue;let r=b(n.textContent??"");!r||Tn.test(r)||$s.test(r)||t.has(r)||(t.add(r),o.push(r))}return o}function ym(e){let t=e.el.querySelectorAll(u.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.closest(u.turn);if(e.role==="assistant"&&o&&e.el.matches(u.assistantMarkdown)&&!e.el.closest(u.searchUnit)){let l=Ws(o);if(l.length)return l.join(" \xB7 ")}let n=e.el.querySelector(e.role==="assistant"?u.markdown:".whitespace-pre-wrap")??e.el,i=[...n.querySelectorAll(bm)].map(l=>b(l.textContent??"")).filter(Boolean).reduce((l,d)=>l.replace(d,`
`),n.innerText||n.textContent||""),a=i.split(`
`).map(b).filter(l=>l&&!$s.test(l)&&!Tn.test(l));if(a.length)return a.join(" ");if(e.role==="assistant"&&o){let l=Ws(o);if(l.length)return l.join(" \xB7 ")}let c=i.split(`
`).map(b).filter(l=>Tn.test(l));return c.length?c.at(-1)??"":e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function Cn(e){return e.text?b(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var ti=e=>e.matches(u.timelineScroll)&&getComputedStyle(e).flexDirection==="column-reverse";var Am=250,vm=400,wm=6e4,Sm=5e3,xm=`:is(${u.turn}) :is(${u.turnBusy})`,q=bn(),kn=new Set,oi=new Set,Ye=!1,_s=0,Bt=null,Ot=!1,Mn=!1,bo=0,In=!1,yo=null,Xs=!1,D=()=>({generating:Ye,conversationId:h()}),el=()=>Os()||!!Mt()?.querySelector(xm);function qm(){let e=el();return e?Mn||(bo=0,In=!0):Mn=!1,[...kn].some(t=>!oi.has(t))||e&&!Mn||Date.now()<bo}function Em(){return yo?.error?"error":Ot?"stopped":"done"}function Tm(){Bt=null,Ye=!1,In=!1,q.emit("fall",{conversationId:h(),outcome:Em()}),Ot=!1,yo=null}function tl(){let e=qm();e&&!Ye&&(Ye=!0,_s=Date.now(),Ot=!1,yo=null,q.emit("rise",{conversationId:h()})),e||!Ye?Bt=null:Bt==null?Bt=Date.now():Date.now()-Bt>=vm&&Tm()}function Ln(){tl(),q.emit("tick",D())}function Cm({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(Ye||Date.now()-_s<wm);if(!o&&Ye){for(let n of kn)oi.add(n);Mn=el(),bo=0,In=!1,Bt=null,Ye=!1,Ot=!1,yo=null,q.emit("fall",{conversationId:e,outcome:"left"})}q.emit("context",{prevId:e,id:t,migrated:o}),Ln()}function Mm(e){e.target instanceof Element&&e.target.closest(u.stopButton)&&(Ot=!0,bo=0)}function ol(){Xs||(Xs=!0,W.on("generate-start",({requestId:e})=>{kn.add(e),Ln()}),W.on("generate-end",e=>{kn.delete(e.requestId),!oi.delete(e.requestId)&&(yo=e,bo=e.handoff&&!e.error&&!Ot&&!In?Date.now()+Sm:0,Ln())}),he(Cm),document.addEventListener("click",Mm,!0),cn(Ln,Am),wn().then(()=>M(tl)))}var v=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,Lm="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",km={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${Lm}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:v('<path d="M18 6 6 18M6 6l12 12"/>'),gear:v('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:v('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:v('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:v('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:v('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:v('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:v('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:v('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:v('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:v('<path d="m6 9 6 6 6-6"/>'),play:v('<path d="M7 4v16l13-8z"/>'),plus:v('<path d="M12 5v14M5 12h14"/>'),check:v('<path d="m5 12 5 5 9-10"/>'),alert:v('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:v('<path d="M4 5h16v11H9l-5 4z"/>'),layout:v('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:v('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:v('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:v('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:v('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:v('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:v('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:v('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:v('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:v('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:v('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:v('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:v('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:v('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:v('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:v('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),ghost:v('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},O=e=>ss(km[e]);var nl=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

.bloom-notice-stack {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    z-index: 2147483000;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
    max-width: min(24rem, calc(100vw - 2rem));
    pointer-events: none;
    contain: layout style;
}

.bloom-notice-card {
    display: flex;
    align-items: flex-start;
    gap: 0.625rem;
    width: 100%;
    padding: 0.75rem 0.75rem 0.75rem 0.875rem;
    border-radius: 0.875rem;
    background: var(--bloom-surface);
    box-shadow: var(--bloom-shadow);
    pointer-events: auto;
    animation: bloom-notice-in 160ms ease-out;
}

.bloom-notice-clickable {
    cursor: pointer;
}

.bloom-notice-clickable:hover {
    background: color-mix(in srgb, var(--bloom-surface), var(--bloom-fg) 4%);
}

.bloom-notice-icon {
    padding-top: 0.125rem;
    color: var(--bloom-fg-2);
}

.bloom-notice-success .bloom-notice-icon {
    color: #10a37f;
}

.bloom-notice-warning .bloom-notice-icon {
    color: #f59e0b;
}

.bloom-notice-error .bloom-notice-icon {
    color: var(--bloom-danger);
}

.bloom-notice-body {
    flex: 1;
    min-width: 0;
}

.bloom-notice-title {
    font-weight: 500;
    overflow-wrap: anywhere;
}

.bloom-notice-message {
    margin-top: 0.125rem;
    color: var(--bloom-fg-2);
    font-size: 0.8125rem;
    overflow-wrap: anywhere;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.bloom-notice-action {
    align-self: center;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    background: var(--bloom-fg);
    color: var(--bloom-surface);
    font-size: 0.8125rem;
    font-weight: 500;
    white-space: nowrap;
}

.bloom-notice-close {
    display: grid;
    place-items: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.375rem;
    color: var(--bloom-fg-3);
}

.bloom-notice-close:hover {
    background: var(--bloom-hover);
    color: var(--bloom-fg);
}

@keyframes bloom-notice-in {
    from {
        opacity: 0;
        transform: translateY(0.5rem);
    }
}
`;var Bm=6e3,Om=4,Pm={info:"info",success:"check",warning:"alert",error:"alert"},be=C("bloom-notice-"),Pt=new Map,Ao;function Rm(){return!document.body||!me(document.body)?null:(xt("notices",nl),Ao?.isConnected||(Ao=s("div",{class:`${be("stack")} bloom-root`,attrs:{"data-bloom":"notices",role:"region","aria-label":"Bloom++ notices","aria-live":"polite"}}),document.body.append(Ao)),Ao)}function rl(e){clearTimeout(e.timer),!(e.remaining<=0)&&(e.startedAt=Date.now(),e.timer=setTimeout(()=>vo(e.key),e.remaining))}function Dm(e){e.timer!==void 0&&(clearTimeout(e.timer),e.timer=void 0,e.remaining=Math.max(1,e.remaining-(Date.now()-e.startedAt)))}function Hm(e,t){let o=t.type??"info",n=s("button",{class:be("close"),attrs:{type:"button","aria-label":"Dismiss","data-bloom":"control"},on:{click:a=>{a.stopPropagation(),vo(e)}}},O("close")),r=t.action&&s("button",{class:be("action"),text:t.action.label,attrs:{type:"button","data-bloom":"control"},on:{click:a=>{a.stopPropagation(),t.action?.onClick(),vo(e)}}}),i=s("div",{class:`${be("card")} ${be(o)}`,attrs:{role:o==="error"?"alert":"status","data-bloom-notice":e}},s("span",{class:be("icon")},O(Pm[o])),s("div",{class:be("body")},s("div",{class:be("title"),text:t.title}),t.message&&s("div",{class:be("message"),text:t.message})),r,n);return t.onClick&&(i.classList.add(be("clickable")),i.addEventListener("click",()=>{t.onClick?.(),vo(e)})),i}function il(e){let t=e.key??on("notice"),o=Rm();if(!o)return t;let n=Hm(t,e),r=Pt.get(t),i={key:t,el:n,options:e,remaining:e.duration??Bm,startedAt:Date.now()};n.addEventListener("pointerenter",()=>Dm(i)),n.addEventListener("pointerleave",()=>rl(i)),r?(clearTimeout(r.timer),r.el.replaceWith(n)):o.append(n),Pt.set(t,i),rl(i);for(let[a]of[...Pt].slice(0,Math.max(0,Pt.size-Om)))vo(a);return t}function vo(e){let t=Pt.get(e);t&&(Pt.delete(e),clearTimeout(t.timer),t.el.remove(),t.options.onClose?.())}var Nm=new x("Landmarks"),Um=2e3,Fm=1e4,Gm=1024,al={thread:{applies:()=>!!h(),selectors:[u.turn]},composer:{applies:()=>Ct()||En()||!!h(),selectors:[u.composerInput]},sidebar:{applies:()=>innerWidth>=Gm,selectors:[u.sidebarScroll,u.rail,u.oldSidebar,u.oldRail]}},Ym={BetterNavigator:["thread"],BetterQuotes:["thread"],MessageTimestamps:["thread"],StarChats:["thread"],UserQuotes:["thread"],ComposerOpacity:["composer"],Continue:["composer"],InputHistory:["composer"],PromptQueue:["composer"],ChatListStatus:["sidebar"],CustomSidebarIdentity:["sidebar"],NoSidebarIdentity:["sidebar"],SidebarIdentityOpacity:["sidebar"]},Rt=new Map,Bn=new Set;function Km(){let e=Date.now();for(let[t,{applies:o,selectors:n}]of Object.entries(al)){if(!o()){Rt.delete(t);continue}if(n.some(i=>document.querySelector(i))){Rt.delete(t),Bn.delete(t);continue}let r=Rt.get(t)??e;Rt.set(t,r),e-r>=Fm&&Bn.add(t)}}function Qm(){let e=[];for(let[o,n]of Object.entries(Ym)){let r=ee.get(o),i=r&&Fe(r)?n.filter(a=>Bn.has(a)):[];ws(o,i.length?i.flatMap(a=>al[a].selectors):null),i.length&&e.push(o)}if(!e.length)return;let t=`2.0.93|${e.join(",")}`;re("Settings","landmarkNotice")!==t&&(pe("Settings","landmarkNotice",t),Nm.warn(`Page anchors missing for ${e.join(", ")}`),il({key:"landmarks",type:"warning",title:"Bloom++ can't find parts of this page",message:`${e.join(", ")} may not work until Bloom++ is updated. Details are in Bloom++ settings.`,duration:0}))}function jm(){if(document.hidden){Rt.clear();return}Km(),Qm()}function sl(){return Rt.clear(),Bn.clear(),cn(jm,Um)}var ll={BetterNavigator:1793350808e3,BetterQuotes:179333264e4,ChatListStatus:1793351872e3,ChatStateFavicons:1790939902e3,Cleaner:1793267811e3,ComposerOpacity:1793344667e3,Continue:1790939902e3,CustomSidebarIdentity:1790939902e3,GreetingCustomizer:1793350808e3,InputHistory:1793351708e3,MessageTimestamps:1791080494e3,NoDictation:1793335268e3,NoShareLink:1790939902e3,NoSidebarIdentity:1790939902e3,PromptQueue:1793267321e3,RecentTopics:179333264e4,ResponseNotification:1790939902e3,Settings:1793352766e3,SidebarIdentityOpacity:1790939902e3,StarChats:1793350808e3,StreamerMode:1793344667e3,TemporaryChat:1792014624e3,UserQuotes:1793345744e3,WiderChat:179333264e4};var ye="data-bloom-tip",ni=6,ri=8,it,cl=null;function Dt(e){if(e===cl)return;if(cl=e,!e){it?.remove();return}it??=s("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),it.textContent=e.getAttribute(ye),document.body.append(it);let t=e.getBoundingClientRect(),{width:o,height:n}=it.getBoundingClientRect(),r=t.bottom+ni+n<=innerHeight-ri;it.style.left=`${ce(t.left+t.width/2-o/2,ri,innerWidth-o-ri)}px`,it.style.top=`${r?t.bottom+ni:t.top-ni-n}px`}var ul=e=>e instanceof Element?e.closest(`[${ye}]`):null;function dl(){let e=new AbortController,t={passive:!0,signal:e.signal};return document.addEventListener("pointerover",o=>Dt(ul(o.target)),t),document.addEventListener("pointerout",o=>o.relatedTarget||Dt(null),t),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&Dt(ul(o.target)),t),document.addEventListener("focusout",()=>Dt(null),t),document.addEventListener("pointerdown",()=>Dt(null),t),()=>{e.abort(),Dt(null)}}function ii(e,t,o,n=!1){let r=s("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let a=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(a)),t(a)===!1&&r.setAttribute("aria-checked",String(!a))}),r}function z(e,t,o){return s("button",{class:rn("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button","data-bloom":"control"},on:{click:t}})}function Q(e,t,o,n){let r=s("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":t,"data-bloom":"control",[ye]:t},on:{click:o}},O(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function On(e,t,o,n,r,i){let a=s("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});a.value=String(e);let c=s("output",{text:`${a.value}${r}`});return a.addEventListener("input",()=>{c.textContent=`${a.value}${r}`,i(Number(a.value))}),s("div",{class:"bloom-slider"},a,c)}function ai(e,t,o){let n=s("select",{class:"bloom-select"},...t.map(r=>s("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function wo(e,t,o="",n="text"){let r=s("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var Wm=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,ml=/\S+@\S+\.\S+/,zm=3,Vm=/^\/g\/(g-p-[^/]+)\//,Jm=/^g-p-[0-9a-f]+-?/i,fl=e=>!!e.closest(".sr-only"),si=e=>!!e?.querySelector(u.menuButton);function pl(){return[...document.querySelectorAll(u.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(si)).filter(e=>e!=null)}function gl(){let e=[...document.querySelectorAll(u.oldProfile)];if(e.length)return e.map(o=>{let n=o.parentElement?.children.length===1?o.parentElement:o;return{kind:"profile",anchor:n,insert:r=>n.before(r)}});let t=pl().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(u.rail)){let n=[...o.children].find(si);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}var li=e=>!e.closest("[data-bloom]")&&(!!e.querySelector("img, [class*=rounded-full]")||Al(e).some(t=>!fl(t))),hl=e=>[...e.parentElement?.children??[]].find(t=>t!==e&&t instanceof HTMLElement&&li(t))??null;function bl(){let e=[...document.querySelectorAll(u.oldProfile)];return e.length?e:[...pl(),...[...document.querySelectorAll(u.rail)].map(o=>[...o.children].findLast(si))].map(o=>[...o?.querySelectorAll(u.menuButton)??[]].findLast(n=>li(n)||hl(n))).filter(o=>o!=null)}var yl=()=>bl().map(e=>li(e)?e:hl(e)).filter(e=>e!=null);function Al(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!b(t.textContent??"")&&!(t instanceof SVGElement))}var Zm=e=>{if(/rounded-full/.test(e.getAttribute("class")??""))return!0;if(!e.clientWidth)return!1;let{borderRadius:t}=getComputedStyle(e);return t.includes("%")||Number.parseFloat(t)>=e.clientWidth/2};function Pn(e,t,o){for(let n of e.querySelectorAll(`[${t}]`))n!==o&&n.removeAttribute(t);o&&!o.hasAttribute(t)&&o.setAttribute(t,"")}function $m(e,t){if(b(e.textContent??"").length>zm)return null;let o=e.closest("button");for(let n=e;n&&n!==t&&n!==o;n=n.parentElement)if(Zm(n))return n;return null}function ci(e,t){e.hasAttribute(`data-bloom-${t}`)||e.setAttribute(`data-bloom-${t}`,"");let o=e.querySelector("img:not([data-bloom] img)"),n=Al(e),r=o?null:n.map(m=>$m(m,e)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),a=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");Pn(e,`data-bloom-${t}-avatar`,a);let c=n.filter(m=>!a?.contains(m)&&!fl(m)),l=c.find(m=>Wm.test(b(m.textContent??""))),d=c.find(m=>ml.test(m.textContent??""));Pn(e,`data-bloom-${t}-plan`,l),Pn(e,`data-bloom-${t}-email`,d),Pn(e,`data-bloom-${t}-name`,c.find(m=>m!==l&&m!==d))}function Xm(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function Rn(){return bl().map(Xm).find(e=>e!=null)??[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&(ml.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var So=e=>[...document.querySelectorAll(u.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&Xr(t.href)===e);function vl(e){let t=So(e).find(o=>b(o.textContent??""));return t?b(t.textContent??""):null}function wl(e){let t=new URL(e,location.origin).pathname.match(Vm)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!Xr(n.href)&&b(n.textContent??""));return o?b(o.textContent??""):t.replace(Jm,"").replaceAll("-"," ")||null}var ui=0,Dn;function _m(e){if(!U(e))return;for(let o of yl())ci(o,"profile");let t=Rn();t&&ci(t,"menu")}function Ae(){ui++;let e=!0;return rt().then(()=>{e&&ui&&!Dn&&(Dn=M(_m))}),()=>{e&&(e=!1,!--ui&&(Dn?.(),Dn=void 0))}}var di=["showSidebarEntry","showSidebarEntryOnHover","showAccountMenuEntry"],Ht={showSidebarEntry:!0,showSidebarEntryOnHover:!1,showAccountMenuEntry:!1},mi=e=>Object.hasOwn(Ht,e),fi=e=>re("Settings",e)??Ht[e],Sl=(e,t)=>!mi(e)||t!==!1||di.some(o=>o!==e&&fi(o));var ef=new x("SettingsPanel"),g=C("bloom-settings-"),tf=10080*60*1e3,of=3e3,xl="Toggle features. Some need a reload. Click the sliders icon to configure.",nf="Can't find its place on this page. It may need an update.",rf=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],af=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],sf={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},El=new Set(["chat","ui","privacy"]),J=null,st="all",pi="all",Hn="",gi=[],Tl=()=>[...ee.values()].filter(e=>!e.hidden),lf=e=>!!e.updatedAt&&Date.now()-e.updatedAt<tf;function cf(e){switch(st){case"favorites":return pn.has(e.name);case"recent":return lf(e);case"all":return!0;case"other":return!e.tags.some(t=>El.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(st)}}function uf(e){switch(pi){case"all":return!0;case"enabled":return Fe(e);case"disabled":return!Fe(e)}}function df(e){let t=Hn.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function mf(e){let t=fn.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return st==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var Cl=e=>e.settings?.def??{},ff=e=>Object.values(Cl(e)).some(t=>t.type!=="custom");function pf(e,t,o){let n=re(e.name,t)??Yr(o),r=i=>{if(e.name==="Settings"&&!Sl(t,i))return!1;pe(e.name,t,i)};switch(o.type){case"boolean":return ii(n,r,o.description??t);case"slider":return On(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return ai(n,o.options,r);case"string":return wo(n,r,o.placeholder);case"number":return wo(String(n),i=>r(Number(i)),"","number");case"component":{let i=s("div",{class:g("component")});return gi.push(o.render(i)),i}case"custom":return null}}var gf=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function Ml(e){if(!J)return;let t=Object.entries(Cl(e)).filter(([,i])=>i.type!=="custom").map(([i,a])=>{let c=pf(e,i,a),l=a.type==="boolean",d=a.type!=="component"&&s("div",{class:g("field-label"),text:gf(i)}),m=a.description&&s("div",{class:g("field-desc"),text:a.description});return s("div",{class:g("field",l?"field-inline":"field-stacked")},(d||m)&&s("div",{class:g("field-text")},d,m),c)}),o,n=z("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},of);return}clearTimeout(o),e.settings?.reset(),xo(),Ml(e)},"danger"),r=s("div",{class:g("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&xo()}},s("div",{class:g("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},s("div",{class:g("popup-header")},s("div",{class:g("card-icon")},O(e.icon)),s("div",{class:g("popup-title")},s("div",{class:g("card-name"),text:e.name}),s("div",{class:g("popup-authors"),text:e.authors.join(", ")})),Q("close","Close",xo)),s("p",{class:g("popup-desc"),text:e.description}),s("div",{class:g("fields")},...t),s("div",{class:g("popup-footer")},n)));J.querySelector(`.${g("modal")}`)?.append(r)}function xo(){for(let e of gi)e();gi=[],J?.querySelector(`.${g("popup-backdrop")}`)?.remove()}function ql(e){let t=Fe(e),o=pn.has(e.name),n=fn.has(e.name),r=!!e.required,i=As(e.name);return s("div",{class:[g("card",t?"card-on":"card-off"),r?g("card-required"):""].filter(Boolean).join(" ")},s("div",{class:g("card-top")},s("div",{class:g("card-icon")},O(e.icon)),s("div",{class:g("card-actions")},Q("star",o?"Unstar":"Star",()=>{pn.toggle(e.name),at()},o),r?null:Q("pin",n?"Unpin":"Pin to top",()=>{fn.toggle(e.name),at()},n),r?s("span",{class:g("required-mark"),attrs:{"aria-label":"Required",[ye]:"This plugin is required for Bloom++ to work"}},O("alert")):null,ff(e)&&Q("gear","Settings",()=>Ml(e)),ii(t,a=>Es(e,a),r?`${e.name} is required`:`Enable ${e.name}`,r))),s("div",{class:g("card-name")},e.name,ys(e.name)&&s("span",{class:g("new-badge"),text:"New"})),s("div",{class:g("card-desc"),text:e.description,title:e.description}),i&&s("div",{class:g("card-issue"),attrs:{[ye]:`Missing: ${i.join(", ")}`}},O("alert"),s("span",{text:nf})),s("div",{class:g("card-footer"),text:e.authors.join(", ")}))}function Ll(){let e=Tl().some(o=>!o.tags.some(n=>El.has(n)));J?.querySelector(`.${g("tabs")}`)?.replaceChildren(...rf.filter(o=>o.id!=="other"||e).map(o=>s("button",{class:g("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===st)},on:{click:()=>{st=o.id,Ll(),at()}}})))}function at(){if(!J)return;let e=Tl().filter(cf),t=J.querySelector(`.${g("search")} input`);t&&(t.placeholder=`Search ${nn(e.length,"plugin")}...`);let o=mf(e.filter(d=>df(d)&&uf(d))),n=st==="all",r=n?o.filter(d=>!d.required):o,i=n?o.filter(d=>d.required):[],a=[...r.map(ql),...i.length?[s("div",{class:g("required-break"),attrs:{role:"separator"}}),...i.map(ql)]:[]],c=Hn.trim()?"No plugins match your search.":sf[st]??"No plugins available.";J.querySelector(`.${g("grid")}`)?.replaceChildren(...a.length?a:[s("div",{class:g("empty"),text:c})])}function hf(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),J?.querySelector(`.${g("popup-backdrop")}`)?xo():Nt())}var kl,hi;function bf(){if(J)return;let e=s("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=Hn,e.addEventListener("input",()=>{Hn=e.value,at()}),J=s("div",{class:`bloom-root ${g("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&Nt()}},s("div",{class:g("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},s("div",{class:g("header")},s("div",{class:g("logo")},O("bloom")),s("h2",{class:g("title"),text:"Bloom++"}),s("span",{class:g("hint"),attrs:{"aria-label":xl,tabindex:"0",[ye]:xl}},O("info")),s("span",{class:g("version"),text:"v2.0.93"}),Q("close","Close",Nt)),s("div",{class:g("tabs"),attrs:{role:"tablist"}}),s("div",{class:g("toolbar")},s("label",{class:g("search")},O("search"),e),ai(pi,af,t=>{pi=t,at()})),s("div",{class:g("grid")}))),J.addEventListener("keydown",t=>t.stopPropagation()),hi=new AbortController,document.addEventListener("keydown",hf,{capture:!0,signal:hi.signal}),document.body.append(J),Ll(),at(),kl=Ms(at),e.focus(),ef.debug("Opened")}function Nt(){xo(),hi?.abort(),kl?.(),J?.remove(),J=null}var Nn=()=>J?Nt():bf();var Il=`/*
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
    color: var(--bloom-fg-3);
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

.bloom-entry-hover:is(:hover, :has(~ :hover)) {
    pointer-events: auto;
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

.bloom-entry-hover .bloom-entry-button::after {
    content: "";
    position: absolute;
    inset-inline: 0;
    top: 100%;
    height: 0.35rem;
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

.bloom-settings-new-badge {
    margin-left: 0.375rem;
    padding: 0.0625rem 0.375rem;
    border-radius: 999px;
    background: var(--bloom-accent);
    color: #fff;
    font-size: 0.6875rem;
    font-weight: 600;
    vertical-align: 0.0625rem;
}

.bloom-settings-card-issue {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    color: #d97706;
    font-size: 0.75rem;
}

.bloom-settings-card-issue .bloom-icon {
    width: 0.875rem;
    height: 0.875rem;
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
`;var Ke=C("bloom-entry-"),Af=4,yi="--bloom-entry-x",Ai=1,ct=p({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar.",default:Ht.showSidebarEntry},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:Ht.showSidebarEntryOnHover},showAccountMenuEntry:{type:"boolean",description:"Show Bloom++ at the top of the account menu.",default:Ht.showAccountMenuEntry},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:e=>(e.append(z("Reset position",()=>{ct.store.entryPosition=Ai})),()=>e.replaceChildren())},entryPosition:{type:"custom",default:Ai}}),lt=new Map,Bl=!1,bi=[];function vf(e,t,o){let n=e.currentTarget,r=t.clientWidth-n.offsetWidth;if(e.button!==0||r<=0||!t.classList.contains(Ke("hover")))return;let i=ct.store.entryPosition,a=i,c=!1,l=new AbortController;n.setPointerCapture(e.pointerId),n.addEventListener("pointermove",m=>{!c&&Math.abs(m.clientX-e.clientX)<Af||(c=!0,o(),a=ce(i+(m.clientX-e.clientX)/r,0,Ai),t.style.setProperty(yi,String(a)))},{signal:l.signal});let d=()=>{l.abort(),c&&(ct.store.entryPosition=a,t.style.removeProperty(yi))};n.addEventListener("pointerup",d,{signal:l.signal}),n.addEventListener("lostpointercapture",d,{signal:l.signal})}function wf(e){let t=!1,o=s("button",{class:Ke("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),t||Nn(),t=!1},pointerdown:r=>{t=!1,e!=="rail"&&vf(r,n,()=>{t=!0})}}},O("bloom"),e!=="rail"&&s("span",{class:Ke("label"),text:"Bloom++"})),n=s("div",{class:`bloom-root ${Ke("wrap")} ${Ke(e)}`,attrs:{"data-bloom":"entry"}},o);return n}function Sf(e){let t=s("div",{class:`bloom-root ${Ke("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),Nn()}}},O("bloom"),s("span",{text:"Bloom++"})),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function Ol(){for(let e of document.querySelectorAll('[data-bloom="entry"], [data-bloom="menu-entry"]'))e.remove();lt.clear()}function xf(){for(let e of document.querySelectorAll('[data-bloom="menu-entry"]'))e.remove()}function Pl(){let{showSidebarEntry:e,showSidebarEntryOnHover:t,showAccountMenuEntry:o}=ct.store,n=e||t?gl():[],r=new Set(n.map(a=>a.anchor));for(let[a,c]of lt)a.isConnected&&r.has(a)||(c.remove(),lt.delete(a));for(let a of document.querySelectorAll('[data-bloom="entry"]'))[...lt.values()].includes(a)||a.remove();for(let a of n){let c=lt.get(a.anchor);if(c?.isConnected||!me(a.anchor))continue;let l=c??wf(a.kind);lt.set(a.anchor,l),a.insert(l)}for(let a of lt.values())a.classList.toggle(Ke("hover"),!e);if(!o){xf();return}let i=Rn();i&&!i.querySelector('[data-bloom="menu-entry"]')&&Sf(i)}function qf(e){di.some(fi)||(ct.store[mi(e??"")?e:"showSidebarEntry"]=!0),Pl()}var Rl=f({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:ct,styles:()=>`${Il}.${Ke("hover")}{${yi}:${ct.store.entryPosition}}`,start(){Ol(),bi=[M(Pl),dl(),Ae()],!Bl&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",Nn),Bl=!0)},stop(){for(let e of bi)e();bi=[],Ol(),Nt()},onSettingsChange:qf});var Ef=80,Tf=420;function vi(e,t,o){return(e.x-o.x)*(t.y-o.y)-(t.x-o.x)*(e.y-o.y)}function Cf(e,t,o,n){let r=vi(e,t,o),i=vi(e,o,n),a=vi(e,n,t);return!((r<0||i<0||a<0)&&(r>0||i>0||a>0))}function Mf(e,t){let o=(t.left+t.right)/2-(e.left+e.right)/2,n=(t.top+t.bottom)/2-(e.top+e.bottom)/2;if(Math.abs(o)>=Math.abs(n)){let i=o<0?t.right:t.left;return[{x:i,y:t.top},{x:i,y:t.bottom}]}let r=n<0?t.bottom:t.top;return[{x:t.left,y:r},{x:t.right,y:r}]}function Dl(e,t){let o=ce(e.x,t.left,t.right),n=ce(e.y,t.top,t.bottom);return Math.hypot(e.x-o,e.y-n)}function Un(e){let t=e.closeDelay??Ef,o=e.towardDelay??Tf,n=0,r=!1,i=null,a=null,c=()=>{document.removeEventListener("pointermove",y,!0)},l=()=>{n&&window.clearTimeout(n),n=0,c(),i=null,a=null},d=()=>{l(),r&&(r=!1,e.setHeld(!1))},m=()=>{r||(r=!0,e.setHeld(!0))},w=S=>{n&&window.clearTimeout(n),n=window.setTimeout(d,S)},Y=S=>{let $=e.panel(),Xe=e.trigger();if(!$||!i)return!1;let X=$.getBoundingClientRect();if(X.width<=0&&X.height<=0)return!1;let Ce=Xe?.getBoundingClientRect(),[ae,Pr]=Ce&&(Ce.width||Ce.height)?Mf(Ce,X):[{x:X.left,y:X.top},{x:X.right,y:X.bottom}];return Cf(S,i,ae,Pr)?!0:a!=null&&Dl(S,X)<Dl(a,X)-.25},y=S=>{let $={x:S.clientX,y:S.clientY};if(e.over(S.target)){l();return}Y($)?w(o):d(),a=$};return{enter(){l()},leave(S){if(e.over(S.relatedTarget)){l();return}i={x:S.clientX,y:S.clientY},a=i,m(),document.addEventListener("pointermove",y,!0),w(t)},dispose(){l(),r=!1}}}var Hl=`/*
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

.bloom-nav-bridge {
    position: absolute;
    inset-block: 0;
    right: 100%;
    width: 0.5rem;
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

.bloom-nav-root:is(:hover, .bloom-nav-open) .bloom-nav-toc {
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
`;var T=C("bloom-nav-"),Yn=80,kf=1200,If=2,Nl=3e4,Bf=200,Of=.9,Pf=.28,Rf=24,Ut=8,Df=80,Hf=12,wi=80,Yl=`${u.rightPanel}, ${u.summaryPanel}`,Nf={user:"\u2753",assistant:"\u{1F916}"},Uf=["wheel","touchmove","pointerdown"],Qn=p({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),A=null,R=[],le=-1,ut=-1,Ft=null,dt="",xi=0,qi=[],Co=null,Fn=null,Gn=new Set,Me,qo,Le,Ei="",Eo=[],Kn=null,Ti=new Set,Ff=e=>Qn.store.showAssistant||e.role==="user",Gf=e=>e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.messageIds[0]||e.role;function Yf(e){return{role:e.role,summary:It(e),ids:e.messageIds,turn:e,streaming:e.streaming}}function Kl(e,t){let o=e.entries.at(-1);if(o?.role==="assistant"&&t.role==="assistant"){e.entries[e.entries.length-1]={...t,ids:[...new Set([...o.ids,...t.ids])]};return}e.entries.push(t)}function Kf(){let e=[];for(let t of Ge()){let o=Yf(t),n=Gf(t),r=e.at(-1);r?.key===n?Kl(r,o):e.push({key:n,entries:[o]})}return e}function Qf(){let e=[];for(let t of de(h())?.chain??[]){let o={role:t.role,summary:Cn(t),ids:[t.id],turn:null,streaming:!1},n=e.at(-1);t.role==="assistant"&&n?Kl(n,o):e.push({key:t.id,entries:[o]})}return e}var Gt=e=>e.entries.flatMap(t=>t.ids);function Ci(e,t){let o=new Set(Gt(e));return Gt(t).some(n=>o.has(n))}var mt=e=>b(e.entries.find(t=>t.role==="user")?.summary??""),Si=(e,t)=>e.filter(o=>mt(o)===t).length,Mi=e=>({...e,turn:null,streaming:!1});function jf(e,t){let o=new Set(t.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return e.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return Mi(r);let a=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return a&&a!==n.key?Mi(r):r})}))}function Wf(e,t){let o=t.entries.map((n,r)=>{let i=e.entries[r];if(!i)return n;let a=[...new Set([...n.ids,...i.ids])];return{...n,ids:a,summary:n.summary||i.summary}});for(let n of e.entries.slice(o.length))o.push(Mi(n));return{key:e.key,entries:o}}function Ql(){let e=ho();if(!e)return!1;let t=e.clientHeight-e.scrollHeight;return e.scrollTop-t<=Math.abs(e.scrollTop)}function zf(e,t){let o=jf(e,t);if(!t.length)return o;if(!o.length)return t;let n=t.findIndex(l=>o.some(d=>d.key===l.key));if(n<0)return Ql()?t.concat(o):o.concat(t);let r=t[n]?.key,i=o.findIndex(l=>l.key===r),a=o.slice(0,i).concat(t.slice(0,n),o.slice(i)),c=a.findIndex(l=>l.key===r);for(let l=n;l<t.length;l++){let d=t[l];if(!d)continue;let m=a.findIndex(w=>w.key===d.key);if(m>=0){let w=a[m];w&&(a[m]=Wf(w,d)),c=m}else a.splice(c+1,0,d),c++}return a}function Vf(e,t){let o=0,n=0,r=0;for(let i=1-e.length;i<t.length;i++){let a=0,c=0;for(let d=0;d<e.length;d++){let m=t[d+i],w=e[d];!m||!w||(Ci(w,m)?(a+=3,c++):mt(w)&&mt(w)===mt(m)&&a++)}let l=Ql()?i<r:i>r;(a>o||a===o&&c>n||a===o&&c===n&&l)&&(o=a,n=c,r=i)}return{score:o,offset:r}}function Jf(e,t){let o=e.entries.map((n,r)=>{let i=t.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of t.entries.slice(o.length))o.push({...n,turn:null});return{key:e.key,entries:o}}function Zf(e){return e.map(t=>({key:t.key,entries:t.entries.map(o=>({...o}))}))}function $f(e,t){if(!t.length)return e;if(!e.length)return t;let{score:o,offset:n}=Vf(e,t),r=Zf(e);if(o>0)for(let c=0;c<r.length;c++){let l=t[c+n],d=r[c];if(!l||!d)continue;let m=mt(d),w=!!m&&m===mt(l)&&Si(e,m)===1&&Si(t,m)===1;(Ci(d,l)||w)&&(r[c]=Jf(d,l))}let i=[],a=[];for(let c=0;c<t.length;c++){let l=t[c];if(!l)continue;let d=mt(l);!d||Si(r,d)>0||r.some(m=>Ci(m,l))||(o>0&&c<n?i.push(l):a.push(l))}return i.concat(r,a)}var Li=e=>e.entries.some(t=>t.turn?.el.isConnected);function Xf(e,t,o){let n=e.findIndex(i=>Gt(i).includes(t));if(n>=0)return n+1;let r=e.find(Li);return o&&r&&Gt(r).includes(o)?0:e.length}function _f(e){if(Kn){let{parent:t,user:o}=Kn;for(let n of e.slice(Xf(e,t,o))){let r=Gt(n);if(!Li(n)&&!(o&&r.includes(o)))for(let i of r)Ti.add(i)}}return e.filter(t=>Li(t)||!Gt(t).some(o=>Ti.has(o)))}function jl(){Eo=[],Kn=null,Ti.clear()}function ep(){let e=Js();e!==Ei&&(Ei=e,jl());let t=Kf(),o=Qf();return!t.length&&!o.length&&!Vs()?(Eo=[],[]):(Eo=_f($f(zf(Eo,t),o)),Eo.flatMap(n=>n.entries).filter(Ff))}function tp(e){for(let o of e)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!D().generating||e.some(o=>o.streaming))return;let t=e.at(-1);t&&(t.role==="assistant"||!Qn.store.showAssistant?t.streaming=!0:e.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function Wl(){let e=ep();return tp(e),e}function zl(e){let t=e.getBoundingClientRect(),o=j()?.getBoundingClientRect().top,n=Math.min(t.bottom,o&&o>t.top?o:t.bottom);return{top:t.top,bottom:n}}function Vl(e){return((e.matches(".whitespace-pre-wrap, .markdown, .prose, [data-markdown-text-style]")?e:e.querySelector(".whitespace-pre-wrap")??e.querySelector(".markdown, .prose, [data-markdown-text-style]"))??e).getBoundingClientRect().top}function Ul(e){let t=R[e]?.turn?.el;return t?.isConnected?t:null}function op(e){if(!R.length)return null;let t=e.scrollHeight-e.clientHeight,o=ti(e),n=Math.min(e.scrollTop,0),r=o?-n:t-e.scrollTop,i=o?t+n:e.scrollTop,a=t<=Ut||r<=Ut,c=t>Ut&&i<=Ut,{top:l,bottom:d}=zl(e),m=Ul(0),w=m?Vl(m):Number.NaN,Y=!!m&&w>=l-Ut&&w<=l+48,y=Ul(R.length-1),S=y?.getBoundingClientRect().bottom??Number.NaN,$=!!y&&S<=d+Ut&&S>=d-Df;return a||$?"bottom":c||Y?"top":null}function np(e){let{top:t,bottom:o}=zl(e),n=t+Math.max(o-t,0)*Pf,r=[],i=-1;if(R.forEach((c,l)=>{let d=c.turn?.el;if(!d?.isConnected){r.push(Number.NaN);return}let m=Vl(d);r.push(m),i<0&&(i=l),m<=n&&(i=l)}),i<0)return Math.max(R.findIndex(c=>c.turn),0);let a=r[le];return Number.isFinite(a)?i===le?le:i>le?i:a<=n+Rf?le:i:i}function rp(e){let t=op(e);return t==="bottom"?R.length-1:t==="top"?0:np(e)}function Fl(e){Qn.store.jumpEffect==="border"&&(e.classList.add(T("flash")),setTimeout(()=>e.classList.remove(T("flash")),kf))}function jn(e){let t=R[e],o=ho();if(!t||!o)return;if(!t.turn&&!t.ids.length){ut=e,To(),o.scrollTo({top:ti(o)?0:o.scrollHeight});return}ut=e,Ft=e?null:{chat:h(),first:t.ids[0],until:Date.now()+Nl},To();let n=t.turn?.el;if(n?.isConnected){let d=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:d<o.clientHeight*If?"smooth":"auto"}),Fl(n);return}let r=R.findIndex(d=>d.turn),i=r>=0&&e<r?-1:1,a=++xi,c=Date.now()+Nl,l=()=>{let d=ho();if(a!==xi||Date.now()>c||!d)return;R=Wl();let m=R.find(Y=>Y.ids.some(y=>t.ids.includes(y)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),Fl(m),ut=R.findIndex(Y=>Y.turn?.el===m),To();return}let w=d.scrollTop;d.scrollBy({top:i*d.clientHeight*Of,behavior:"instant"}),d.scrollTop===w?setTimeout(l,Bf):requestAnimationFrame(l)};l()}function ip(e,t){return s("button",{class:T("row"),attrs:{type:"button","data-index":String(t),"data-message-id":e.ids[0]??""},on:{click:()=>jn(t)}},s("span",{text:Nf[e.role]}),s("span",{class:"bloom-truncate",text:fe(e.summary||"\u2026",Yn)}))}function ap(e,t){let o=e.offsetWidth?t.width/e.offsetWidth:1;return t.left+(e.clientLeft+e.clientWidth)*o}function sp(e){let t=1/0;for(let o of document.querySelectorAll(Yl)){if(!et(o))continue;let n=o.getBoundingClientRect();n.width<wi||n.height<wi||n.left<e.left+wi||n.left<t&&(t=n.left)}return Number.isFinite(t)?t:null}function Gl(e){if(!A)return;let t=e.getBoundingClientRect(),o=j()?.getBoundingClientRect().top,r=Math.min(t.bottom,o&&o>t.top?o:t.bottom)-t.top,i=Math.min(ap(e,t),sp(t)??1/0);A.style.right=`${document.documentElement.clientWidth-i+Hf}px`,A.style.top=`${t.top}px`,A.style.height=r>1?`${r}px`:""}function lp(){let e=ho();if(R=Wl(),!R.length||!e){Le?.dispose(),Le=void 0,A?.remove(),A=null,dt="";return}if(Co!==e){qo?.abort(),qo=new AbortController,e.addEventListener("scroll",Ne(To),{passive:!0,signal:qo.signal});for(let n of Uf)e.addEventListener(n,Zl,{passive:!0,signal:qo.signal});Co=e,Me?.disconnect(),Me=new ResizeObserver(()=>{e.isConnected&&Gl(e)}),Me.observe(e),Fn=null,Gn=new Set}let t=j();if(t&&t!==Fn&&Me&&(Me.observe(t),Fn=t),Me)for(let n of document.querySelectorAll(Yl))Gn.has(n)||(Me.observe(n),Gn.add(n));mp(),Gl(e);let o=JSON.stringify(R.map(n=>[n.role,n.ids]));o!==dt?(dt=o,ut=-1,up(),Ft&&Date.now()<Ft.until&&Ft.chat===h()&&R[0]?.ids[0]!==Ft.first&&jn(0)):cp(),To()}function To(){if(!A||!Co)return;le=ut>=0?ut:rp(Co),A.querySelectorAll(`.${T("tick")}`).forEach((t,o)=>t.classList.toggle(T("tick-current"),o===le)),A.querySelectorAll(`.${T("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===le)));let e=A.querySelector(`.${T("toc-head")}`);e&&(e.textContent=`${le+1} / ${R.length}`)}function cp(){A?.querySelectorAll(`.${T("tick")}`).forEach((e,t)=>{let o=R[t],n=fe(o.summary,Yn);e.title!==n&&(e.title=n),e.classList.toggle(T("tick-streaming"),o.streaming)}),A?.querySelectorAll(`.${T("row")}`).forEach(e=>{let t=e.lastElementChild,o=fe(R[Number(e.dataset.index)].summary||"\u2026",Yn);t&&t.textContent!==o&&(t.textContent=o)})}function up(){A?.querySelector(`.${T("rail")}`)?.replaceChildren(...R.map((t,o)=>s("button",{class:rn(T("tick"),T(`tick-${t.role}`),t.streaming&&T("tick-streaming"),o===le&&T("tick-current")),title:fe(t.summary,Yn),attrs:{type:"button","aria-label":`Jump to message ${o+1}`,"data-message-id":t.ids[0]??""},on:{click:()=>jn(o)}}))),A?.querySelector(`.${T("toc-list")}`)?.replaceChildren(...R.map(ip))}var ve=Ne(lp);function ki(e){if(e===A)return;let t=e.__bloomNavStop;if(t&&t!==Ii)try{t()}catch{}e.isConnected&&e!==A&&e.remove()}function Jl(){let e=[...document.querySelectorAll('[data-bloom="navigator"]')];if(A&&!A.isConnected&&(A=null),A&&e.includes(A)){for(let t of e)ki(t);return}A=e[0]??null;for(let t of e.slice(1))ki(t)}function dp(){Le?.dispose(),Le=Un({over:e=>e instanceof Node&&!!A?.contains(e),trigger:()=>A?.querySelector(`.${T("rail")}`),panel:()=>A?.querySelector(`.${T("toc")}`),setHeld:e=>A?.classList.toggle(T("open"),e)})}function mp(){Jl(),A&&!A.querySelector(`.${T("rail")}`)&&(A.remove(),A=null,dt=""),A||(A=s("div",{class:`bloom-root ${T("root")}`,attrs:{"data-bloom":"navigator"},on:{pointerenter:()=>Le?.enter(),pointerleave:e=>Le?.leave(e)}},s("div",{class:T("rail")}),s("div",{class:T("bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:T("toc")},s("div",{class:T("toc-head")}),s("div",{class:T("toc-list")}))),dt=""),Le||dp(),A.isConnected||document.body.append(A),A.querySelector(`.${T("tick")}`)||(dt=""),A.__bloomNavStop=Ii}function Zl(){ut=-1,Ft=null,xi++}function Ii(){for(let e of qi)e();qi=[],qo?.abort(),Me?.disconnect(),Me=void 0,Co=null,Fn=null,Gn=new Set,removeEventListener("keydown",$l,!0),removeEventListener("resize",ve),Le?.dispose(),Le=void 0,A&&delete A.__bloomNavStop,A?.remove(),A=null,dt="",jl(),Ei="";for(let e of document.querySelectorAll('[data-bloom="navigator"]'))ki(e)}var fp=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function $l(e){if(!A||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||fp(document.activeElement)||K("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:le-1,ArrowDown:le+1,Home:0,End:R.length-1}[e.key];if(o==null){Zl();return}o<0||o>=R.length||(e.preventDefault(),e.stopPropagation(),jn(o))}var Xl=f({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:Qn,styles:Hl,start(){Jl(),qi=[M(e=>U(e)&&ve()),he(ve),W.on("conversation",ve),W.on("generate-start",({parentId:e,userId:t})=>{e&&(Kn={parent:e,user:t},ve())}),q.on("rise",ve),q.on("fall",ve)],addEventListener("keydown",$l,!0),addEventListener("resize",ve,{passive:!0}),ve()},stop:Ii,onSettingsChange:ve});var _l=`/*
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
`;var te=C("bloom-quotes-"),Fi="BloomBetterQuotes",gp=40,nc=8,hp=1800,Ri=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,ec=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,ft=p({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),Bi,Oi,Yt,Pi=!1,Di=0,Wn=null,zn=null,ke=null;function Gi(){return location.pathname.match(/\/c\/(?!local-)([\w-]+)/)?.[1]??(new URLSearchParams(location.search).get("temporary-chat")==="true"?"temporary":"draft")}function Jn(){try{let e=JSON.parse(sessionStorage.getItem(Fi)??"[]");return Array.isArray(e)?e.filter(t=>!!t&&typeof t=="object"&&typeof t.id=="string"&&typeof t.text=="string"&&!!t.text):[]}catch{return[]}}function Yi(e){try{sessionStorage.setItem(Fi,JSON.stringify(e.slice(-gp)))}catch{}}function Mo(e){return Jn().find(t=>t.id===e)?.text??""}function bp(e,t){let o=Jn().filter(n=>n.id!==e);o.push({id:e,text:t}),Yi(o)}function Hi(e=Gi()){Yi(Jn().filter(t=>t.id!==e)),Vn()}function yp(e){let t=Mo("draft");if(!t||Mo(e))return;let o=Jn().filter(n=>n.id!=="draft");o.push({id:e,text:t}),Yi(o)}function Ni(e){return`${e.getAttribute("aria-label")??""} ${e.getAttribute("title")??""}`}function Ap(e){let t=Ni(e);return ec.test(t)&&!/quote|引用/.test(t)?!1:/quote|引用/.test(t)&&Ri.test(t)?!0:Ri.test(t)&&!ec.test(t)}function rc(e){let t=e.cloneNode(!0),o=[...t.querySelectorAll("button, [role='button']")],n=new Set(o.map(r=>r.getAttribute("aria-label")).filter(Boolean));for(let r of o)r.remove();for(let r of t.querySelectorAll("*"))!r.children.length&&n.has(b(r.textContent??""))&&r.remove();return b(t.textContent??"")}function vp(e){let t=j(),o=e.parentElement,n=0;for(;o&&o!==t&&n<5;){if(n++,o.matches(u.composerInput)||o.querySelector(u.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=rc(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function Zn(){let e=j();if(!e)return null;for(let t of e.querySelectorAll("button, [role='button']")){if(t.closest("[data-bloom]")||!Ap(t))continue;let o=vp(t),n=o?rc(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:t}}return null}function wp(e){let t=e.closest(u.searchUnit)??e.closest(u.oldMessage);return t&&(Lt(t)??t.getAttribute("data-message-author-role"))==="user"?t:null}function Ki(e){return b(e).slice(0,48)}function Sp(e,t){let o=Ki(e);if(o.length<nc)return null;let n=null;for(let r of kt()){if(t&&(r===t||t.contains(r)||r.contains(t)))continue;let i=b(r.textContent??"");if(!i.includes(o))continue;let a=o.length/Math.max(i.length,1);(!n||a>n.score)&&(n={el:r,score:a})}return n?.el??null}function xp(e,t){let o=Ki(t),n=e;for(let r of e.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&b(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${te("hit")}`)?.classList.remove(te("hit")),n.classList.add(te("hit")),window.clearTimeout(Di),Di=window.setTimeout(()=>n.classList.remove(te("hit")),hp)}function tc(e){let t=e.closest(u.timelineScroll)??document.scrollingElement;if(!(t instanceof HTMLElement)&&t!==document.scrollingElement)return;let o=e.getBoundingClientRect();if(o.height<1||!t)return;let n=t.getBoundingClientRect(),r=j()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,a=o.top+o.height/2-(n.top+i)/2;Math.abs(a)<8||t.scrollTo({top:t.scrollTop+a,behavior:"smooth"})}function Qi(){if(!ke||!Wn?.isConnected)return;let e=Wn.getBoundingClientRect();e.width<1||(ke.style.top=`${Math.max(8,e.top+8)}px`,ke.style.left=`${Math.max(8,e.right-ke.offsetWidth-8)}px`)}function qp(e,t,o){Wn=e,zn=t,ke??=s("button",{class:`bloom-root ${te("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),ke.isConnected||document.body.append(ke),xp(e,o),Qi()}function oc(){ke?.remove(),ke=null,Wn=null,zn=null,document.querySelector(`.${te("hit")}`)?.classList.remove(te("hit"))}function ic(){return document.querySelector('[data-bloom="quote-chip"]')}function Vn(){ic()?.remove()}function Ep(e){let o=j()?.getBoundingClientRect();!o||o.width<8||(e.style.width=`${Math.max(120,o.width-24)}px`,e.style.left=`${o.left+12}px`,e.style.top=`${Math.max(8,o.top-e.offsetHeight-8)}px`)}function Tp(e){let t=ic();t||(t=s("div",{class:`bloom-root ${te("chip")}`,attrs:{"data-bloom":"quote-chip"}},s("span",{class:te("text")}),s("button",{class:te("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(t));let o=t.querySelector(`.${te("text")}`),n=b(e);o&&o.textContent!==n&&(o.textContent=n),t.dataset.text=e,Ep(t)}function Ui(){if(!Pi){Pi=!0;try{let e=Gi(),t=Zn();ft.store.persistAcrossChats&&t&&Mo(e)!==t.text&&bp(e,t.text);let o=ft.store.persistAcrossChats?Mo(e):"";!o||t&&b(t.text)===b(o)?Vn():Tp(o),Qi()}finally{Pi=!1}}}function Cp(e){let t=e.closest('[data-bloom="quote-chip"]');if(t instanceof HTMLElement&&!e.closest(`.${te("x")}`)){let i=t.dataset.text??t.querySelector(`.${te("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:t}:null}let o=e.closest("blockquote");if(o instanceof HTMLElement&&!e.closest("a, button")){let i=wp(o),a=b(o.textContent??"");if(i&&a)return{text:a,skip:i,origin:o}}let n=j();if(!n||!n.contains(e)||nt(e)||e.closest("button, [role='button']"))return null;let r=Zn();return!r||!r.row.contains(e)?null:{text:r.text,skip:null,origin:r.row}}function Mp(e){let{target:t}=e;if(!(t instanceof Element))return;if(t.closest('[data-bloom="quote-back"]')){e.preventDefault(),e.stopPropagation(),zn?.isConnected&&tc(zn);return}if(t.closest(`.${te("x")}`)){e.preventDefault(),e.stopPropagation(),Hi();return}let o=Zn();if(o&&(t===o.dismiss||o.dismiss.contains(t))){Hi();return}if(Lp(t)&&ac(),!ft.store.jumpToPassage)return;let n=Cp(t);if(!n)return;let r=Sp(n.text,n.skip);r&&(e.preventDefault(),e.stopPropagation(),qp(r,n.origin,n.text),tc(r))}function Lp(e){let t=e.closest("button, [role='button']");return!(t instanceof HTMLElement)||t.closest("[data-bloom]")||!j()?.contains(t)?!1:/send|submit|发送|提交/i.test(Ni(t))&&!Ri.test(Ni(t))}function kp(e){return!(e instanceof KeyboardEvent)||e.key!=="Enter"||e.shiftKey||e.isComposing?!1:nt(e.target)}function ac(){if(!ft.store.persistAcrossChats)return;let e=Gi(),t=Mo(e);if(t){if(!Zn()){let o=L(),n=Ki(t);n.length>=nc&&!b(o).includes(n)&&ie(`> ${t}

${o}`.trim())}Hi(e)}}function Ip(e){kp(e)&&ac()}function Bp(e){!e.prevId&&e.id&&yp(e.id),Ui()}var sc=f({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:ft,styles:_l,onSettingsChange(e){e==="jumpToPassage"&&!ft.store.jumpToPassage&&oc(),e==="persistAcrossChats"&&!ft.store.persistAcrossChats&&(sessionStorage.removeItem(Fi),Vn()),Ui()},start(){Yt=new AbortController,document.addEventListener("pointerdown",Mp,{capture:!0,signal:Yt.signal}),document.addEventListener("keydown",Ip,{capture:!0,signal:Yt.signal}),addEventListener("scroll",Qi,{capture:!0,passive:!0,signal:Yt.signal}),Oi=he(Bp),Bi=M(e=>U(e)&&Ui())},stop(){Yt?.abort(),Yt=void 0,Oi?.(),Oi=void 0,Bi?.(),Bi=void 0,window.clearTimeout(Di),oc(),Vn()}});var lc=`/*
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
`;var Pp=C("bloom-cls"),Rp="bloom-cls",Dp=600*1e3,Wi=on("tab"),Qt=new Map,Lo=new Map,Kt=null,cc=[],Hp=e=>e==="streaming"||e==="error";function Np(){let e=new Map,t=Date.now();for(let[o,n]of Lo)t-n.at>Dp?Lo.delete(o):e.set(o,n.status);for(let[o,n]of Qt)e.set(o,n);return e}function Up(e){return s("span",{class:`bloom-root ${Pp("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&O("alert"))}function Xn(){let e=Np(),t=new Set;for(let[o,n]of e)for(let r of So(o)){if(!me(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let a=Up(n);t.add(a),r.append(a)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function $n(e,t){e&&(t?Qt.set(e,t):Qt.delete(e),Kt?.postMessage({tab:Wi,id:e,status:t}),Xn())}function Fp({data:e}){!k(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===Wi||(Hp(e.status)?Lo.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):Lo.delete(e.id),Xn())}function ji(){for(let e of Qt.keys())Kt?.postMessage({tab:Wi,id:e,status:null})}var uc=f({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:()=>`${lc}`,start(){for(let e of document.querySelectorAll('[data-bloom="cls"]'))e.remove();Kt=typeof BroadcastChannel=="function"?new BroadcastChannel(Rp):null,Kt?.addEventListener("message",Fp),addEventListener("pagehide",ji),cc=[q.on("rise",({conversationId:e})=>$n(e,"streaming")),q.on("fall",({conversationId:e,outcome:t})=>$n(e,t==="error"?"error":null)),q.on("context",({prevId:e,id:t,migrated:o})=>{o&&D().generating?$n(t,"streaming"):!o&&Qt.get(e??"")==="streaming"&&$n(e,null)}),M(e=>U(e)&&Xn())],h()&&Xn()},stop(){for(let e of cc)e();ji(),Kt?.close(),Kt=null,removeEventListener("pagehide",ji),Qt.clear(),Lo.clear();for(let e of document.querySelectorAll('[data-bloom="cls"]'))e.remove()}});var mc=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],tr={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Gp={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Yp="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",zi=32,or=64,Vi="#FCFCFC",Ji="#111111",Kp=14,nr=51.5,Qp=12.5,jp=9.75,dc=52,Wp=10.5,zp=7.75,Vp={rotate:e=>e.arc(nr,nr,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function _n(e){let t=document.createElement("canvas");t.width=t.height=zi;let o=t.getContext("2d");return o?(o.scale(zi/or,zi/or),e(o),t.toDataURL("image/png")):""}function er(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D(Yp);o&&(e.strokeStyle=Ji,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function rr(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function Jp(e,t){rr(e,nr,Qp,Ji),rr(e,nr,jp,tr[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),Vp[t](e),e.stroke()}function Zp(e,t){e.beginPath(),e.roundRect(0,0,or,or,Kp),e.fillStyle=t,e.fill()}var $p=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function fc(e,t){switch(e){case"original":return $p(Gp[t]);case"hole":return _n(o=>er(o,tr[t],!0));case"bg":return _n(o=>{Zp(o,tr[t]),er(o,Vi,!1)});case"dot":return _n(o=>{er(o,Vi,!0),rr(o,dc,Wp,Ji),rr(o,dc,zp,tr[t])});case"badge":return _n(o=>{er(o,Vi,!0),Jp(o,t)})}}var Io="bloom-chat-state-favicon",Bo="data-bloom-rel",Xi="data-bloom-media",pc="bloom-parked-icon",Xp="/favicon.ico",hc=p({style:{type:"select",description:"How the tab icon shows the chat state.",options:mc,default:"bg"}}),Qe=null,bc="",ir=null,yc="",gc=new Map,_i,Zi=[],Ac=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${Bo}]`)];function ea(){for(let e of Ac())e.id!==Io&&(e.hasAttribute(Bo)||(yc||=e.href,e.setAttribute(Bo,e.rel),e.setAttribute(Xi,e.getAttribute("media")??"")),e.rel!==pc&&(e.rel=pc),e.media!=="not all"&&(e.media="not all"))}function _p(){for(let e of Ac()){let t=e.getAttribute(Bo);if(t==null)continue;e.rel=t;let o=e.getAttribute(Xi);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(Bo),e.removeAttribute(Xi)}}function vc(){let e=document.getElementById(Io);return e||(e=document.createElement("link"),e.id=Io,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function eg(e){if(e==="wait")return yc||Xp;let t=hc.store.style,o=`${t}:${e}`,n=gc.get(o);return n||gc.set(o,n=fc(t,e)),n}function $i(e){if(e)return"rotate";let t=L();return Qe&&t&&t!==bc&&(Qe=null),Qe==="error"?"error":Qe==="done"?"done":t?"ready":"wait"}function ko(e,t=!1){if(e===ir&&!t)return;ir=e;let o=vc(),n=eg(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function tg(){_i=new MutationObserver(()=>{ea(),document.head.lastElementChild?.id!==Io&&vc()}),_i.observe(document.head,{childList:!0})}var wc=f({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"HostReady",settings:hc,start(){ea(),ko($i(D().generating),!0),tg(),Zi=[q.on("rise",()=>{Qe=null,ko("rotate")}),q.on("fall",({outcome:e})=>{Qe=e==="done"||e==="error"?e:null,bc=L(),ko($i(!1))}),q.on("context",({migrated:e})=>{e||(Qe=null)}),q.on("tick",({generating:e})=>{ea(),ko($i(e))})]},stop(){for(let e of Zi)e();Zi=[],_i?.disconnect(),document.getElementById(Io)?.remove(),_p(),ir=null,Qe=null},onSettingsChange(){ko(ir??"wait",!0)}});var je="data-bloom-invite",og=/^(?:invite team members|invite members|邀请团队成员|邀请成员)$/i,Sc=':is(button, a:not([href^="/c/"])):not(main *, [role="dialog"] *)',ng={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${u.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])'],hideInvite:[`[${je}]`,`div:has(> [${je}]:only-child)`]},xc=p({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0},hideInvite:{type:"boolean",description:"Hide Invite team members in the sidebar.",default:!0}}),ar,ta=!1;function rg(e){if(U(e))for(let t of document.querySelectorAll(`${Sc}, [${je}]`))!t.matches(Sc)||!og.test(b(t.textContent??""))?t.removeAttribute(je):t.hasAttribute(je)||t.setAttribute(je,"")}var qc=f({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads, notices and Invite team members.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:xc,styles:()=>He(Object.entries(ng).flatMap(([e,t])=>xc.store[e]?t:[])),start(){ta=!0,rt().then(()=>{ta&&!ar&&(ar=M(rg))})},stop(){ta=!1,ar?.(),ar=void 0;for(let e of document.querySelectorAll(`[${je}]`))e.removeAttribute(je)}});var jt=`form:has(:is(${u.composerInput})), ${u.oldComposerForm}`,sr='[class*="ComposerLayoutBody"]',na='[class*="ComposerLayoutRoot"]',ig='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',ag=`:is(${jt}) ${sr}, :is(${jt}):not(:has(${sr})) ${na}, :is(${jt}):not(:has(${sr})):not(:has(${na})) :is(${ig})`,sg='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',lg='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',cg="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))";var ug="composer-fill",Ec=p({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function dg(){let{opacity:e,blur:t}=Ec.store;if(e>=100)return"";let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${cg} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important;-webkit-backdrop-filter:blur(${t}px)!important`;return`:is(${sg}), :is(${jt}){${o}}:is(${lg}){display:none!important}${ag}{${n}}:is(${jt}):has(${sr}) ${na}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${jt}) :is(${u.composerInput}){background-color:transparent!important}`}function oa(){for(let e of document.querySelectorAll(`[data-bloom="${ug}"]`))e.remove()}var Tc=f({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:Ec,styles:dg,start(){oa()},stop(){oa()},onSettingsChange(){oa()}});var mg=1200,fg=8e3,pg=150,gg=20,Cc=6,aa="continue where you left",hg=/message delivery timed out|please try again/i,Mc=/waiting for the complete answer/i,Lc=p({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:aa,placeholder:aa}}),ra=[],cr=0,Oo=!1,Po=0,zt="",lr="",sa=0,Vt=!1,Ro=!1,ur=!0,Wt="",la=0,dr=!1,bg=()=>Lc.store.prompt.trim()||aa;function kc(){return(K(u.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function Ic(){let e=kc();return!e||Mc.test(e)||!hg.test(e)?"":e}function yg(){let e=kc();return e&&Mc.test(e)?e:""}function Ag(){let e=Mt()?.querySelectorAll(u.turn),t=e?.[e.length-1];return`${t?.getAttribute("data-turn-key")??""}:${t?.textContent?.length??0}`}function Bc(e,t,o){if(o===cr){if(D().generating||L()!==e||t>=gg){Vt=!1,D().generating||(zt="");return}yn(),setTimeout(()=>Bc(e,t+1,o),pg)}}function vg(e){let t=cr;if(D().generating||L()&&L()!==e){Vt=!1,zt="";return}ie(e),dr=!0,uo(()=>{t===cr&&Bc(e,0,t)})}function Oc(e){return e===zt||Po>=Cc||D().generating||L()?!1:(zt=e,Po+=1,Vt=!0,vg(bg()),!0)}function wg(){if(Oo||Vt||Ro)return;let e=Date.now(),t=Ic();if(t){if(Wt="",t!==lr){lr=t,sa=e;return}if(e-sa<mg)return;Oc(`${h()??""}:${t}`);return}if(lr="",!yg()){ur=!0,Wt="";return}if(!ur||!D().generating||L())return;let n=`${h()??""}:${Ag()}`;if(n!==Wt){Wt=n,la=e;return}if(e-la<fg||Po>=Cc)return;let r=Tt();r&&(Ro=!0,r.click())}function ia(){cr+=1,Oo=!1,Po=0,zt="",lr="",sa=0,Vt=!1,Ro=!1,ur=!0,Wt="",la=0,dr=!1}var Pc=f({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:Lc,start(){ia(),ra=[q.on("rise",()=>{Oo=!1,zt="",Vt=!1,dr&&(dr=!1,ur=!1,Wt="")}),q.on("fall",({outcome:e})=>{if(Ro){Ro=!1,e==="left"?Oo=!0:Oc(`${h()??""}:stall`);return}(e==="stopped"||e==="left")&&(Oo=!0),e==="done"&&!Ic()&&(Po=0)}),q.on("context",({migrated:e})=>{e||ia()}),q.on("tick",wg)]},stop(){for(let e of ra)e();ra=[],ia()}});var Ie=C("bloom-csi-"),Sg=256,xg=160,mr=1,Rc=4,qg=.1,Eg=.0015,Tg=250;function Cg(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function Mg(e){return new Promise((t,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function Lg(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:ce(t.x,n,1-n),y:ce(t.y,r,1-r)}}function Dc(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function kg(e,t){let o=s("canvas");return o.width=o.height=Sg,Dc(o,e,t),o.toDataURL("image/png")}function Hc(e){let t=null,o={x:F.store.cropX,y:F.store.cropY,zoom:F.store.cropZoom},n,r=s("canvas",{class:Ie("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=xg*devicePixelRatio;let i=s("div",{class:`bloom-muted ${Ie("status")}`}),a=s("div",{class:Ie("zoom")}),c=s("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(y,S=!0){t&&(o=Lg(t,y),Dc(r,t,o),S&&(clearTimeout(n),n=setTimeout(()=>{t&&(F.store.cropX=o.x,F.store.cropY=o.y,F.store.cropZoom=o.zoom,F.store.avatarUrl=kg(t,o))},Tg)))}function d(){a.replaceChildren(On(o.zoom,mr,Rc,qg,"\xD7",y=>l({...o,zoom:y})))}async function m(y,S){i.textContent="";try{t=await Mg(y),S&&(F.store.avatarSource=y,o={x:.5,y:.5,zoom:mr}),e.classList.add(Ie("has-image")),d(),l(o,S)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let w=y=>{y?.type.startsWith("image/")&&Cg(y).then(S=>m(S,!0))};c.addEventListener("change",()=>w(c.files?.[0])),r.addEventListener("wheel",y=>{t&&(y.preventDefault(),l({...o,zoom:ce(o.zoom*(1-y.deltaY*Eg),mr,Rc)}),d())},{passive:!1}),r.addEventListener("pointerdown",y=>{if(!t)return;r.setPointerCapture(y.pointerId);let S={...o},$=r.getBoundingClientRect(),Xe=X=>{if(!t)return;let Ce=Math.max($.width/t.naturalWidth,$.height/t.naturalHeight)*o.zoom;l({...o,x:S.x-(X.clientX-y.clientX)/(t.naturalWidth*Ce),y:S.y-(X.clientY-y.clientY)/(t.naturalHeight*Ce)})};r.addEventListener("pointermove",Xe),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",Xe),{once:!0})});let Y=s("div",{class:Ie("cropper"),attrs:{tabindex:"0"},on:{paste:y=>w([...y.clipboardData?.files??[]].find(S=>S.type.startsWith("image/"))),dragover:y=>y.preventDefault(),drop:y=>{y.preventDefault(),w(y.dataTransfer?.files[0])}}},s("div",{class:Ie("stage")},r),s("div",{class:Ie("controls")},wo("",y=>y.trim()&&void m(y.trim(),!0),"https://\u2026 or data:image/\u2026","url"),s("div",{class:Ie("buttons")},z("Choose file",()=>c.click()),z("Reset crop",()=>{l({x:.5,y:.5,zoom:mr}),d()}),z("Clear",()=>{t=null,e.classList.remove(Ie("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),a.replaceChildren(),F.store.avatarUrl="",F.store.avatarSource=""},"danger")),a,i,c));return e.append(Y),F.store.avatarSource&&m(F.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var Nc=`/*
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
`;var Do="data-bloom-csi-avatar",ca="data-bloom-csi-sized",Yc="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",Bg=32,F=p({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>Hc(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),Uc=[];function Kc(e){e.removeAttribute(Do),e.removeAttribute(ca)}function Fc(e){return(F.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function Gc(e=[]){if(!U(e))return;let t=F.store.displayName.trim()||null,o=!!F.store.avatarUrl,n=new Set(t?Fc("name"):[]);for(let i of document.querySelectorAll(Yc))n.has(i)||tt(i,null);for(let i of n)tt(i,t);let r=new Set(o?Fc("avatar"):[]);for(let i of document.querySelectorAll(`[${Do}]`))r.has(i)||Kc(i);for(let i of r)i.hasAttribute(Do)||i.setAttribute(Do,""),i.toggleAttribute(ca,!i.closest('[role="menu"]'))}function Og(){let e=F.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${F.store.avatarSize}px}:is(${u.rail}, ${u.oldRail}) [${ca}]{--bloom-csi-size:${Bg}px}`:""}var Qc=f({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:F,styles:()=>`${Og()}
${Nc}`,start(){Uc=[Ae(),M(Gc)]},stop(){for(let e of Uc)e();for(let e of document.querySelectorAll(`[${Do}]`))Kc(e);for(let e of document.querySelectorAll(Yc))tt(e,null)},onSettingsChange(){Gc()}});var Jt=C("bloom-greeting-"),jc=30,Wc=100;function zc(e){let t=-1,o=s("textarea",{class:`bloom-input ${Jt("input")}`,attrs:{maxlength:String(Wc),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=z("Add",i),r=s("div",{class:Jt("list")});function i(){let l=o.value.trim().slice(0,Wc);if(!l)return;let d=[...B.store.greetings];t>=0?d[t]=l:d.length<jc&&d.push(l),B.store.greetings=d,t=-1,o.value="",a()}function a(){let{greetings:l}=B.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&l.length>=jc,r.replaceChildren(...l.length?l.map((d,m)=>s("div",{class:Jt("row",m===t?"row-editing":"row-idle")},s("div",{class:Jt("text"),text:d}),Q("edit","Edit",()=>{t=m,o.value=d,o.focus(),a()}),Q("trash","Delete",()=>{B.store.greetings=l.filter((w,Y)=>Y!==m),t===m&&(t=-1),a()}))):[s("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),e.append(s("div",{class:Jt("editor")},r,s("div",{class:Jt("form")},o,n))),a();let c=Et((l,d)=>l==="GreetingCustomizer"&&d==="greetings"&&a());return()=>{c(),e.replaceChildren()}}var Vc=`/*
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

[data-bloom-placeholder] [data-placeholder]::before {
    content: none !important;
}
`;var pr="data-bloom-greeting",Rg=1e3,Dg=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],B=p({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>zc(e)},greetings:{type:"custom",default:Dg},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),fr,Jc=[],ua,Fo=()=>Ct()&&!ge(),Hg=e=>e.replaceAll(/\s*\n\s*/g," ").trim(),$c=()=>B.store.greetings.filter(e=>typeof e=="string"&&e.trim());function Go(){let e=$c();if(e.length)if(B.store.order==="random"&&e.length>1){let t=B.store.lastRandom;for(;t===B.store.lastRandom;)t=Math.floor(Math.random()*e.length);B.store.lastRandom=t,B.store.index=t}else B.store.index=(B.store.index+1)%e.length}function Ng(){return Fo()?K(u.homeHeading):null}function Ho(){for(let e of document.querySelectorAll(`[${pr}]`))e.removeAttribute(pr),tt(e,null)}function No(){for(let e of document.querySelectorAll("[data-bloom-placeholder]"))e.removeAttribute("data-bloom-placeholder")}function Zc(e){let t=ue(),o=Hg(e);if(!t||!o||L(t)){No();return}t.getAttribute("data-bloom-placeholder")!==o&&t.setAttribute("data-bloom-placeholder",o)}function Uo(){let e=$c(),t=En(),o=Fo();if(!e.length||!t&&!o){Ho(),No();return}if(t){Ho(),Zc(e[0]??"");return}let n=Ng();n?((B.store.index<0||B.store.index>=e.length)&&Go(),n.setAttribute(pr,""),tt(n,e[Math.max(0,B.store.index)%e.length]??"")):Ho(),B.store.heroOnlyOutsideProject?No():Zc(e[Math.max(0,B.store.index)%e.length]??"")}function da(){clearInterval(fr),fr=void 0,B.store.mode==="interval"&&Fo()&&(fr=setInterval(()=>{Go(),Uo()},B.store.intervalSec*Rg))}function Ug(e){B.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${pr}]`)||getSelection()?.toString()||(Go(),Uo())}function Fg(){Fo()&&B.store.mode==="refresh"&&Go(),da(),Uo()}var Xc=f({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:B,styles:Vc,start(){Ho(),No(),ua=new AbortController,document.addEventListener("click",Ug,{signal:ua.signal}),Fo()&&B.store.mode==="refresh"&&Go(),da(),Jc=[M(e=>U(e)&&Uo()),he(Fg)]},stop(){ua?.abort();for(let e of Jc)e();clearInterval(fr),Ho(),No()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&da(),Uo()}});var Yo=C("bloom-history-"),ma=10,Gg=3e3;function fa(e,t){let o="",n=0,r=new Set,i=s("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),a=s("div",{class:Yo("list")}),c=s("div",{class:Yo("pager")}),l,d=z("Clear all",()=>{if(!l){d.textContent="Click again to clear",l=setTimeout(()=>{l=void 0,d.textContent="Clear all"},Gg);return}clearTimeout(l),l=void 0,d.textContent="Clear all",Ko([])},"danger");function m(){let Y=[...pt.store.entries].toReversed(),y=o.trim().toLowerCase(),S=y?Y.filter(ae=>ae.toLowerCase().includes(y)):Y,$=Math.max(1,Math.ceil(S.length/ma));n=Math.min(n,$-1);let Xe=S.slice(n*ma,(n+1)*ma).map(ae=>s("div",{class:Yo("row")},s("button",{class:Yo("text",r.has(ae)?"text-open":"text-closed"),text:ae,title:r.has(ae)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{r.delete(ae)||r.add(ae),m()}}}),t&&Q("edit","Use",()=>t(ae)),Q("copy","Copy",()=>void Ja(ae)),Q("trash","Delete",()=>Ko(pt.store.entries.filter(Pr=>Pr!==ae)))));a.replaceChildren(...Xe.length?Xe:[s("div",{class:"bloom-muted",text:y?"No matching prompts.":"No saved prompts yet."})]),c.replaceChildren(s("span",{class:"bloom-muted",text:`${S.length} ${y?"matching":"saved"} \xB7 page ${n+1} of ${$}`}),z("Previous",()=>{n--,m()}),z("Next",()=>{n++,m()}),d);let[X,Ce]=c.querySelectorAll("button");X.disabled=n===0,Ce.disabled=n>=$-1,d.disabled=!Y.length}i.addEventListener("input",()=>{o=i.value,n=0,m()}),e.append(s("div",{class:Yo("manager")},i,a,c)),m();let w=Et((Y,y)=>Y==="InputHistory"&&y==="entries"&&m());return()=>{w(),clearTimeout(l),e.replaceChildren()}}var _c=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

.bloom-history-hud {
    position: fixed;
    z-index: 2147482000;
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.125rem 0.5rem 0.125rem 0.625rem;
    border: 1px solid var(--bloom-border);
    border-radius: 9999px;
    background: var(--bloom-surface);
    box-shadow: var(--bloom-shadow);
    color: var(--bloom-fg-2);
    font-size: 0.75rem;
    font-variant-numeric: tabular-nums;
    transform: translate(-50%, calc(-100% - 0.5rem));
}

.bloom-history-hud-count,
.bloom-history-hud-x {
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    cursor: pointer;
}

.bloom-history-hud-x {
    line-height: 1;
}

.bloom-history-hud-count:hover,
.bloom-history-hud-x:hover {
    color: var(--bloom-fg);
}

.bloom-history-backdrop {
    position: fixed;
    inset: 0;
    z-index: 2147483000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: #0006;
}

.bloom-history-dialog {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: min(36rem, 100%);
    max-height: min(40rem, 100%);
    padding: 1.25rem;
    border: 1px solid var(--bloom-border);
    border-radius: 1rem;
    background: var(--bloom-surface);
    box-shadow: var(--bloom-shadow);
    color: var(--bloom-fg);
}

.bloom-history-dialog-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.bloom-history-dialog-title {
    flex: 1;
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
}

.bloom-history-dialog-body {
    min-height: 0;
    overflow-y: auto;
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
`;var Be=C("bloom-history-"),Kg=2e3,pt=p({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>fa(e)},entries:{type:"custom",default:[]}}),H=null,pa={text:"",at:0},we=null,We=null,ga,$t=()=>pt.store.entries.filter(e=>typeof e=="string");function Ko(e){pt.store.entries=e.slice(-pt.store.maxEntries)}function ha(e){let t=e.trim();if(!t)return;let o=Date.now();t===pa.text&&o-pa.at<Kg||(pa={text:t,at:o},Ko([...$t().filter(n=>n!==t),t]))}function eu(e){e.preventDefault()}function Qg(){let e=s("button",{class:Be("hud-count"),attrs:{type:"button"},on:{mousedown:eu,click:Vg}}),t=s("button",{class:Be("hud-x"),text:"\xD7",attrs:{type:"button","aria-label":"Exit history"},on:{mousedown:eu,click:jg}});return s("div",{class:`bloom-root ${Be("hud")}`,attrs:{"data-bloom":"history-hud",role:"group","aria-live":"polite","aria-label":"Input history"}},e,t)}function tu(e,t){let o=ue();if(!o||We)return;we??=Qg();let n=`${e+1} / ${t}`,r=we.querySelector(`.${Be("hud-count")}`);r?.replaceChildren(n),r?.setAttribute("aria-label",`Show input history (${n})`);let i=(o.closest("form")??o).getBoundingClientRect();we.style.left=`${i.left+i.width/2}px`,we.style.top=`${i.top}px`,we.isConnected||document.body.append(we)}function Zt(){H=null,we?.remove()}function jg(){H&&ie(H.draft),Zt(),ue()?.focus()}function ou(e){let t=$t();if(!H)return;let o=t[e];H.index=e,H.shown=o,ie(o),tu(t.length-1-e,t.length)}function Wg(e){let t=$t();if(!t.length)return!1;if(!H){if(e===1)return!1;H={index:t.length,draft:L(),shown:""}}let o=H.index+e;return o<0?!0:o>=t.length?(ie(H.draft),Zt(),!0):(ou(o),!0)}function zg(e){let t=$t().indexOf(e);Qo(),!(t<0)&&(H??={index:t,draft:L(),shown:""},ou(t),ue()?.focus())}function Qo(){if(!We)return;We.release(),We.controller.abort(),We.root.remove(),We=null;let e=$t();H&&e[H.index]===H.shown?tu(e.length-1-H.index,e.length):H=null}function Vg(){if(We)return;we?.remove();let e=s("div",{class:Be("dialog-body")}),t=s("div",{class:`bloom-root ${Be("backdrop")}`,attrs:{"data-bloom":"history-dialog"},on:{click:n=>n.target===n.currentTarget&&Qo()}},s("div",{class:Be("dialog"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Input history"}},s("div",{class:Be("dialog-header")},s("h2",{class:Be("dialog-title"),text:"Input history"}),Q("close","Close",Qo)),e));t.addEventListener("keydown",n=>n.stopPropagation());let o=new AbortController;document.addEventListener("keydown",n=>{n.key==="Escape"&&(n.preventDefault(),n.stopPropagation(),Qo())},{capture:!0,signal:o.signal}),document.body.append(t),We={root:t,release:fa(e,zg),controller:o},e.querySelector("input")?.focus()}function nu(e){return nt(e)?e:e instanceof HTMLElement?e.closest(u.composerInput):null}function Jg(){if(ue()?.closest("[data-chatgpt-composer], [data-composer-input], form")?.querySelector('[aria-expanded="true"]'))return!0;for(let t of document.querySelectorAll('[role="listbox"], [role="menu"], [data-radix-popper-content-wrapper], [cmdk-root], [cmdk-list]')){if(!(t instanceof HTMLElement)||t.closest("[data-bloom]"))continue;let o=getComputedStyle(t);if(!(o.display==="none"||o.visibility==="hidden"))return!0}return!1}function Zg(e){if(e.isComposing||e.key==="Process"||e.keyCode===229)return;let t=nu(e.target);if(!t)return;if(e.key==="Enter"&&!e.shiftKey){ha(L(t)),Zt();return}if(e.key==="Escape"&&H){ie(H.draft),Zt(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey||Jg())return;let o=Is(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!H||Wg(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function $g(e){H&&nu(e.target)&&L()!==H.shown.trim()&&Zt()}function Xg(e){e.target instanceof Element&&e.target.closest(u.sendButton)&&ha(L())}var ru=f({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before. Click the counter to browse history.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:pt,styles:_c,start(){for(let t of document.querySelectorAll('[data-bloom="history-hud"], [data-bloom="history-dialog"]'))t.remove();we=null,ga=new AbortController;let{signal:e}=ga;document.addEventListener("keydown",Zg,{capture:!0,signal:e}),document.addEventListener("input",$g,{capture:!0,signal:e}),document.addEventListener("click",Xg,{capture:!0,signal:e}),document.addEventListener("submit",()=>ha(L()),{capture:!0,signal:e})},stop(){ga?.abort(),Qo(),Zt();for(let e of document.querySelectorAll('[data-bloom="history-hud"]'))e.remove();we=null},onSettingsChange(e){e==="maxEntries"&&Ko($t())}});var iu=`/*
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
`;var eh=1500,th=5e3,oh=2e3,du=[{label:"UTC",value:"UTC"},{label:"\u7F8E\u56FD\u4E1C\u90E8",value:"America/New_York"},{label:"\u7F8E\u56FD\u4E2D\u90E8",value:"America/Chicago"},{label:"\u7F8E\u56FD\u5C71\u5730",value:"America/Denver"},{label:"\u7F8E\u56FD\u897F\u90E8",value:"America/Los_Angeles"},{label:"\u65E5\u672C",value:"Asia/Tokyo"},{label:"\u53F0\u6E7E",value:"Asia/Taipei"}],Xt=p({sourceTimeZone:{type:"select",description:"Zone the stored clock was written in. Leave UTC for ChatGPT create_time. Pick the same zone as the Shit GPT plugin only when that clock is a wall time in that zone; it is then shown in the system timezone.",options:du,default:"UTC"},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),hr=new Map,ba=new Set,mu=0,br,au=[];function fu(e,t){hr.get(e)!==t&&(hr.set(e,t),clearTimeout(br),br=setTimeout(pu,oh))}function pu(){let e={...Xt.store.stamps,...Object.fromEntries(hr)};Xt.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,eh))}function nh(e){let t=de(h())?.times;for(let o=e.length-1;o>=0;o--){let n=hr.get(e[o])??t?.get(e[o])??Xt.store.stamps[e[o]];if(n)return n}return null}var rh=()=>D().generating||Date.now()-mu<th;function gu(){return Intl.DateTimeFormat().resolvedOptions().timeZone}function hu(){let e=Xt.store.sourceTimeZone;if(!e||e==="UTC")return"UTC";try{return Intl.DateTimeFormat(void 0,{timeZone:e}),e}catch{return"UTC"}}function bu(e,t){let o={};for(let n of new Intl.DateTimeFormat("en-US",{timeZone:t,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(e)))o[n.type]=n.value;return{y:+o.year,m:+o.month,d:+o.day,h:+o.hour%24,mi:+o.minute,s:+o.second}}function yu(e){return Date.UTC(e.y,e.m-1,e.d,e.h,e.mi,e.s)}function su(e,t){let o=e;for(let n=0;n<4;n++){let r=e-yu(bu(o,t));if(r===0)return o;o+=r}return o}function ih(e,t){if(t==="UTC")return e;let o=(e%1e3+1e3)%1e3,n=e-o,r=new Date(n),i=Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),r.getUTCHours(),r.getUTCMinutes(),r.getUTCSeconds()),a=su(i,t),c=3600*1e3,l=Number.POSITIVE_INFINITY;for(let d of[-c,0,c]){let m=a+d;yu(bu(m,t))===i&&m<l&&(l=m)}return l!==Number.POSITIVE_INFINITY?l+o:su(i+c,t)+o}function ah(e,t){let o=hu();return t||o==="UTC"?e:ih(e,o)}function lu(e,t){return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(e)}function sh(e){let t=gu(),o=Date.now(),n={hour:"2-digit",minute:"2-digit",timeZone:t};if(lu(e,t)===lu(o,t))return new Intl.DateTimeFormat(void 0,n).format(e);let r=a=>new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric"}).format(a),i=r(e)===r(o)?{}:{year:"numeric"};return new Intl.DateTimeFormat(void 0,{...i,month:"short",day:"numeric",...n}).format(e)}function lh(e,t){let o=new Date(t).toLocaleString(void 0,{timeZone:gu()}),n=hu();if(n==="UTC"||t===e)return o;let r=new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"UTC"}).format(e);return`${du.find(a=>a.value===n)?.label??n} ${r} \u2192 ${o}`}function Au(e){let t=Lt(e)??e.getAttribute("data-message-author-role")??e.closest(u.turn)?.getAttribute("data-turn")??e.querySelector(u.authorRole)?.getAttribute("data-message-author-role");if(ei(t))return t;let o=go(e).at(-1);return de(h())?.chain.find(n=>n.id===o)?.role??null}var cu='[class*="group/activity-header"]';function ch(e){let t=e.parentElement;if(!t)return null;let o=e.closest(u.turn);return o&&t!==o&&!o.contains(t)?null:t}function uh(e){let t=e;for(let o=0;o<8&&t;o++){let n=ch(t);if(!n)return null;let r=[...n.children],i=r.indexOf(t);for(let a=i-1;a>=0;a--){let c=r[a],l=c.matches(cu)?c:c.querySelector(cu);if(l)return l;if(c.matches(u.searchUnit)||c.querySelector(u.searchUnit))return null}if(n===t.closest(u.turn))return null;t=n}return null}function dh(e){let t=e.parentElement;for(let o=0;o<4&&t;o++){if(t.classList.contains("flex-col"))return t;t=t.parentElement}return e.parentElement??e}function vu(e,t){if(t==="assistant"){let o=uh(e);if(o)return dh(o)}return e}function mh(e,t){let o=kt();for(let n=o.length-1;n>=0;n--){let r=o[n];if(!(r!==e&&(Au(r)!=="assistant"||vu(r,"assistant")!==t)))return r===e}return!0}function uu(e){return e.querySelector(':scope > time[data-bloom="timestamp"]')}function fh(e){let t=go(e);if(!t.length||!me(e)||e.querySelector("time:not([data-bloom])"))return;let o=Au(e),n=vu(e,o);if(n!==e&&!mh(e,n)){uu(e)?.remove();return}let r=nh(t),i=!1;if(!r&&rh()){r=Date.now();let m=t.at(-1);ba.add(m),fu(m,r),i=!0}else r&&ba.has(t.at(-1))&&(i=!0);let a=n.querySelector('time[data-bloom="timestamp"]')??uu(e);if(!r||Xt.store.hideOwnMessages&&o==="user"){a?.remove();return}let c=ah(r,i),l=sh(c);if(a?.textContent===l&&a.parentElement===n&&a===n.firstElementChild)return;let d=s("time",{class:`bloom-timestamp bloom-timestamp-${o??"assistant"}`,text:l,title:lh(r,c),attrs:{"data-bloom":"timestamp",datetime:new Date(c).toISOString()}});a&&a.replaceWith(d),(d.parentElement!==n||d!==n.firstElementChild)&&n.prepend(d)}var gr=Ne(()=>{for(let e of kt())fh(e)}),wu=f({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:Xt,styles:iu,start(){au=[M(e=>U(e)&&gr()),W.on("conversation",gr),W.on("message-time",({messageId:e,time:t})=>{ba.delete(e),fu(e,t),gr()}),q.on("fall",()=>{mu=Date.now()})]},stop(){for(let e of au)e();br&&(clearTimeout(br),pu());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();gr()}}});var ph=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])','[data-chatgpt-composer] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-composer-input] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-codex-composer-root] button[aria-label^="Dictat" i], [data-composer-placement] button[aria-label^="Dictat" i], [class*="ComposerLayout"] button[aria-label^="Dictat" i]'],gh=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],Su=p({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),xu=f({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:Su,styles:()=>He([...ph,...Su.store.hideDictationSettings?gh:[]])});var gt="data-bloom-share",hh=/^\/g\/g-p-/,bh=/^(?:share|分享)$/i,yh=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],Ah=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${gt}="project"]`],ya=p({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),yr,Aa=!1;function vh(e){if(!U(e))return;let t=hh.test(location.pathname)&&!h();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${gt}]`))!t||!bh.test(b(o.textContent??""))?o.removeAttribute(gt):o.hasAttribute(gt)||o.setAttribute(gt,"project")}var qu=f({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:ya,styles:()=>He([...ya.store.hideShareChat?yh:[],...ya.store.hideShareProject?Ah:[]]),start(){Aa=!0,rt().then(()=>{Aa&&!yr&&(yr=M(vh))})},stop(){Aa=!1,yr?.(),yr=void 0;for(let e of document.querySelectorAll(`[${gt}]`))e.removeAttribute(gt)}});var Eu='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',wh='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',Sh="[data-bloom-profile-plan]",Tu="visibility:hidden!important;user-select:none!important",Mu=p({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function xh(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=Mu.store,r=[];return e&&r.push(n?`:is(${Eu}){display:none!important}`:`:is(${Eu}){${Tu}}`),t&&r.push(`:is(${wh}){${Tu}}`),e&&o&&r.push(`${Sh}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var Cu,Lu=f({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Mu,styles:xh,start(){Cu=Ae()},stop(){Cu?.()}});var qh="model-switcher-dropdown-button",va="data-selected-reasoning-effort",Ar="ArrowLeft",ku=e=>e.startsWith("model-switcher-")&&e!==qh?e.slice(15):"",jo=(e,t)=>e.id===t.id||!!e.label&&e.label===t.label;function Iu(){let e=j();return(e&&K(u.modelTrigger,e))??K(u.modelTrigger)}function Se(){let e=Iu();if(!e)return null;let t=e.getAttribute("aria-expanded")==="true",o=e.getAttribute(va),n=o&&t?"":b(e.innerText),r=o||ku(e.getAttribute("data-testid")??"")||n;return r?{id:r,label:n||r}:null}function Eh(e){return[...document.querySelectorAll(u.modelItem)].find(t=>{let o=ku(t.getAttribute("data-testid")??""),n=b(t.textContent??"");return o===e.id||n===e.label||n===e.id})??null}function Th(e){let t=e.querySelector("[role=slider]"),o=Number(t?.getAttribute("aria-valuenow")),n=Number(t?.getAttribute("aria-valuemax"));o<=0?Ar="ArrowRight":o>=n&&(Ar="ArrowLeft"),e.focus(),e.dispatchEvent(new KeyboardEvent("keydown",{key:Ar,code:Ar,bubbles:!0,cancelable:!0}))}function wa(e){let t=Se(),o=Iu();if(t&&jo(t,e))return o?.hasAttribute(va)&&o.getAttribute("aria-expanded")==="true"&&document.querySelector("[role=menu]")?.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),!0;if(o?.hasAttribute(va)){let r=document.querySelector(u.effortSlider);return r?Th(r):o.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,button:0,pointerType:"mouse",isPrimary:!0})),!1}let n=Eh(e);if(n){n.click();let r=Se();return!!r&&jo(r,e)}return o?.getAttribute("aria-expanded")!=="true"&&o?.click(),!1}var Bu=`/*
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
`;var G=C("bloom-queue-"),Mh=6,Lh=8,oe=null,Wo="",_t=!1,eo=!1;function Sa(e,t,o){let n=Q(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute(ye),n.addEventListener("mouseenter",()=>Ou(t)),n.addEventListener("mouseleave",()=>Ou("")),n}function Ou(e){let t=oe?.querySelector(`.${G("tip")}`);t&&(t.textContent=e)}function kh(e,t,o,n){eo=!0;let r=s("textarea",{class:`bloom-input ${G("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=new AbortController,a=c=>{i.abort(),eo=!1,Wo="",c?n.edit(t,r.value):r.replaceWith(s("div",{class:G("text"),text:o}))};addEventListener("keydown",c=>{if(!(c.target!==r||c.isComposing)){if(c.key==="Enter"&&!c.shiftKey)a(!0);else if(c.key==="Escape")a(!1);else return;c.preventDefault(),c.stopImmediatePropagation()}},{capture:!0,signal:i.signal}),r.addEventListener("keydown",c=>c.stopPropagation(),{signal:i.signal}),r.addEventListener("blur",()=>a(!0),{signal:i.signal}),e.querySelector(`.${G("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function Ih(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,a=l=>{!i&&Math.abs(l.clientY-n.clientY)<Mh||(i||(i=eo=!0,e.classList.add(G("dragging"))),e.style.transform=`translateY(${l.clientY-n.clientY}px)`)},c=l=>{if(removeEventListener("pointermove",a),!i)return;eo=!1,Wo="";let m=[...r.children].filter(w=>w!==e).filter(w=>w.getBoundingClientRect().top+w.getBoundingClientRect().height/2<l.clientY).length;o.move(t,m)};addEventListener("pointermove",a),addEventListener("pointerup",c,{once:!0})})}function Bh(e,t,o,n){let r=s("li",{class:G("row")},s("div",{class:G("text"),text:e.text}),n&&e.label?s("span",{class:G("model"),title:e.label,text:e.label}):null,s("div",{class:G("actions")},Sa("trash","Remove from queue",()=>o.remove(t)),Sa("edit","Edit",()=>kh(r,t,e.text,o)),Sa("send","Send now",()=>o.sendNow(t))));return Ih(r,t,o),r}function Oh(e){if(!oe)return;let t=e.getBoundingClientRect();oe.style.left=`${t.left}px`,oe.style.width=`${t.width}px`,oe.style.bottom=`${innerHeight-t.top+Lh}px`}function xa(){oe?.remove(),oe=null,Wo="",eo=!1}function ht(e,t,o=!0){let n=j();if(!e.length||!et(n)){xa();return}oe||(oe=s("div",{class:`bloom-root ${G("tray")}`,attrs:{"data-bloom":"queue"}},s("div",{class:G("header")},s("button",{class:G("toggle"),attrs:{type:"button","aria-expanded":String(!_t)},on:{click:a=>{_t=!_t,oe?.classList.toggle(G("collapsed"),_t),a.currentTarget.setAttribute("aria-expanded",String(!_t))}}},s("span",{class:G("count")}),O("chevron")),s("span",{class:G("tip")})),s("ol",{class:G("list")})),oe.classList.toggle(G("collapsed"),_t),document.body.append(oe)),Oh(n);let r=JSON.stringify([o,...e.map(a=>[a.text,o?a.label:""])]);if(eo||r===Wo)return;Wo=r;let i=oe.querySelector(`.${G("count")}`);i&&(i.textContent=nn(e.length,"Queued message")),oe.querySelector(`.${G("list")}`)?.replaceChildren(...e.map((a,c)=>Bh(a,c,t,o)))}var xr=new x("PromptQueue"),Ph=8,Vo=150,vr=20,Rh=300,xe="BloomPromptQueue",Ea="BloomPromptQueueClaim",Pu="BloomPromptQueueTab",Dh=4e3,Z=p({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1},showQueueMode:{type:"boolean",description:"Show the model that was selected when each message was queued.",default:!0},stickyOnNavigate:{type:"boolean",description:"Keep the selected model when switching chats.",default:!0},persistAcrossRefresh:{type:"boolean",description:"Restore unsent queued messages in this browser after a refresh. Other tabs show the same queue; only one of them sends it.",default:!0}}),qe=new Map,zo=!1,bt=null,to,Ru=[],ze=null,At=!1,Jo,wr="draft",Zo=()=>h()??wr,ne=()=>qe.get(Zo())??[],Ta=e=>({id:e.model||e.label,label:e.label||e.model});function Hh(e){return typeof e=="string"?e.trim()?{text:e,model:"",label:""}:null:!k(e)||typeof e.text!="string"||!e.text.trim()?null:{text:e.text,model:typeof e.model=="string"?e.model:"",label:typeof e.label=="string"?e.label:""}}function Ca(){let e=sessionStorage.getItem(Pu);if(e)return e;let t=globalThis.crypto?.randomUUID?.()??`${Date.now()}-${Math.random()}`;return sessionStorage.setItem(Pu,t),t}function Nu(){let e=Re(localStorage.getItem(Ea)??"");return!k(e)||typeof e.tab!="string"||typeof e.at!="number"||typeof e.key!="string"?null:{tab:e.tab,at:e.at,key:e.key}}function Uu(){let e={tab:Ca(),at:Date.now(),key:Zo()};try{localStorage.setItem(Ea,JSON.stringify(e))}catch(t){xr.warn("Could not claim the queue",t)}}function Nh(){let e=Nu();if(e?.tab===Ca())try{localStorage.setItem(Ea,JSON.stringify({...e,at:Date.now()}))}catch(t){xr.warn("Could not refresh the queue claim",t)}}function Uh(){let e=Nu();return!e||e.tab===Ca()||e.key!==Zo()?!0:Date.now()-e.at<=Dh?!1:(Uu(),!0)}function Fh(){return Object.fromEntries([...qe].filter(([e])=>e!==wr))}function qa(e){let t=typeof e=="string"?Re(e):e;if(!k(t))return!1;let o=!1;for(let[n,r]of Object.entries(t)){if(!Array.isArray(r))continue;let i=r.map(Hh).filter(a=>a!=null);i.length&&(qe.set(n,i),o=!0)}return o}function Gh(){if(!Z.store.persistAcrossRefresh){sessionStorage.removeItem(xe),Hr(xe);return}qa(sessionStorage.getItem(xe))||qa(un(xe))&&Sr()}function Sr(){try{if(!Z.store.persistAcrossRefresh){sessionStorage.removeItem(xe),Hr(xe);return}let e=Fh();sessionStorage.setItem(xe,JSON.stringify(e)),dn(xe,e)}catch(e){xr.warn("Could not save the queue",e)}}function Yh(e){if(!(e.key!==xe||!Z.store.persistAcrossRefresh||e.newValue==null)){qe.clear(),qa(e.newValue);try{sessionStorage.setItem(xe,e.newValue)}catch(t){xr.warn("Could not mirror the queue",t)}ht(ne(),oo,Z.store.showQueueMode)}}function yt(e){e.length?qe.set(Zo(),e):qe.delete(Zo()),Uu(),Sr(),ht(ne(),oo,Z.store.showQueueMode)}function Kh(e){if(!e.model&&!e.label)return!0;let t=Se();return t?jo(t,Ta(e)):!0}function Fu(e,t=0){t>=vr||D().generating||L()!==e||(yn(),setTimeout(()=>Fu(e,t+1),Vo))}function Qh(e,t){let o=e??ze;if(!o||!t.model&&!t.label||jo(o,Ta(t))){At=!1;return}Z.store.stickyOnNavigate&&(ze=o),clearTimeout(Jo),Jo=setTimeout(()=>Yu(o),Vo)}function $o(e,t=0,o=Se()){if(D().generating||L()){t<vr&&setTimeout(()=>$o(e,t+1,o),Vo);return}if(!Kh(e)&&t<vr){At=!0,wa(Ta(e)),setTimeout(()=>$o(e,t+1,o),Vo);return}ie(e.text),uo(()=>Fu(e.text)),Qh(o,e)}function Du(){if(bt!=null){let o=bt;bt=null,$o(o);return}if(!zo||D().generating||L())return;if(!Uh()){zo=!1;return}let[e,...t]=ne();e!=null&&(zo=!1,yt(t),$o(e))}function Gu(e){let t=ne(),o=t[e];if(o!=null){if(yt(t.filter((n,r)=>r!==e)),!D().generating){$o(o);return}bt=o,Tt()?.click()}}var oo={remove:e=>yt(ne().filter((t,o)=>o!==e)),edit:(e,t)=>yt(t.trim()?ne().map((o,n)=>n===e?{...o,text:t}:o):ne().filter((o,n)=>n!==e)),sendNow:Gu,move(e,t){let o=[...ne()],[n]=o.splice(e,1);n&&(o.splice(t,0,n),yt(o))}};function jh(e){let t=Se(),o={text:e,model:t?.id??"",label:t?.label??""},n=ne();return Z.store.replacePending&&n.length?(yt([...n.slice(0,-1),o]),!0):n.length>=Ph?!1:(yt([...n,o]),!0)}function Wh(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!nt(e.target)||!D().generating)return;let t=L(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;let o=Se();ie(""),bt={text:t,model:o?.id??"",label:o?.label??""},Tt()?.click();return}if(!t){ne().length&&Gu(0);return}jh(t)&&ie("")}function zh(){if(At||!Z.store.stickyOnNavigate)return;let e=Se();e&&(ze=e)}function Yu(e){At=!0;let t=0,o=()=>{if(wa(e)||t>=vr){At=!1;return}t++,Jo=setTimeout(o,Vo)};clearTimeout(Jo),o()}function Vh(){Z.store.stickyOnNavigate&&ze&&Yu(ze)}function Hu(e){let{target:t}=e;!(t instanceof Element)||At||t.closest(`${u.modelTrigger}, ${u.modelItem}`)&&setTimeout(zh,Rh)}var Ku=f({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:Z,styles:Bu,start(){to=new AbortController,Gh(),ze=Se(),document.addEventListener("keydown",Wh,{capture:!0,signal:to.signal}),document.addEventListener("pointerup",Hu,{signal:to.signal}),document.addEventListener("keyup",Hu,{signal:to.signal}),Ru=[q.on("fall",({outcome:e})=>{zo=e==="done",e==="left"&&(bt=null),Du()}),q.on("context",({prevId:e,id:t,migrated:o})=>{let n=qe.get(wr);qe.delete(wr),o&&!e&&t&&n&&qe.set(t,n),o||(zo=!1,Vh()),Sr(),ht(ne(),oo,Z.store.showQueueMode)}),q.on("tick",()=>{Nh(),Du(),ht(ne(),oo,Z.store.showQueueMode)})],addEventListener("storage",Yh,{signal:to.signal}),ht(ne(),oo,Z.store.showQueueMode)},stop(){to?.abort(),clearTimeout(Jo);for(let e of Ru)e();xa(),qe.clear(),bt=null,ze=null,At=!1},onSettingsChange(e){e==="persistAcrossRefresh"&&Sr(),e==="stickyOnNavigate"&&Z.store.stickyOnNavigate&&(ze=Se()),ht(ne(),oo,Z.store.showQueueMode)}});var Jh=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function Zh(){let e=b(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!Jh.has(e.toLowerCase())?e:null}function Xo(e){return e?de(e)?.title??vl(e)??(e===h()?Zh():null):null}var Qu=`/*
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
`;var Oe=C("bloom-recent-"),Pe="home",Xh=50,ju=140,_h=new Set(["Backquote"]),eb=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),E=p({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),Ve=null,Ee=[],Te=0,Ma,Wu=[],Tr=()=>ge()?null:h()??(Ct()?Pe:null);function zu(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function Ju(e){let t=Xo(e);t&&E.store.titles[e]!==t&&(E.store.titles={...E.store.titles,[e]:t});let o=wl(location.href);o&&e===h()&&E.store.projects[e]!==o&&(E.store.projects={...E.store.projects,[e]:o})}function Vu(e){if(!e)return;let t=[e,...E.store.visits.filter(n=>n!==e)].slice(0,Xh),o=new Set(t);E.store.visits=t,Object.keys(E.store.previews).some(n=>!o.has(n))&&(E.store.previews=zu(E.store.previews,o)),Object.keys(E.store.titles).some(n=>!o.has(n))&&(E.store.titles=zu(E.store.titles,o)),e!==Pe&&Ju(e)}function qr(e){if(!e||!E.store.visits.includes(e))return;let t={},o=de(e)?.chain??[];for(let r of o)t[r.role]=fe(Cn(r),ju);if(e===h())for(let r of Ge()){let i=It(r);i&&(t[r.role]=fe(i,ju))}let n=E.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(E.store.previews={...E.store.previews,[e]:t})}function tb(){let e=Number(E.store.maxRecent);return E.store.visits.filter(t=>t!==Pe||E.store.includeHome).slice(0,e)}function La(e){if(_o(),e===Tr())return;let t=e===Pe?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"], [data-sidebar-destination="builtin:home"]'):So(e)[0];t?t.click():location.assign(e===Pe?"/":`/c/${e}`)}function ob(e,t){let o=e===Pe?"New chat":E.store.titles[e]??Xo(e)??"Untitled chat",n=e===Pe?null:E.store.projects[e],r=e===Pe?null:E.store.previews[e];return s("button",{class:Oe("item"),attrs:{type:"button",role:"option","aria-selected":String(t===Te)},on:{click:()=>La(e),mousemove:()=>t!==Te&&Er(t)}},s("div",{class:Oe("head")},s("span",{class:`${Oe("title")} bloom-truncate`,text:o}),n&&s("span",{class:Oe("project"),text:n})),r?.user&&s("div",{class:`${Oe("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&s("div",{class:`${Oe("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function Er(e){Te=(e+Ee.length)%Ee.length,Ve?.querySelectorAll(`.${Oe("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===Te)))}function nb(){qr(h());let e=Tr();Ee=tb(),e&&(Ee=[e,...Ee.filter(t=>t!==e)].slice(0,Number(E.store.maxRecent))),Ee.length&&(Te=Ee.length>1?1:0,Ve=s("div",{class:`bloom-root ${Oe("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:t=>t.target===t.currentTarget&&_o()}},s("div",{class:Oe("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...Ee.map(ob))),document.body.append(Ve))}function _o(){Ve?.remove(),Ve=null}var rb=e=>_h.has(e.code)||eb.has(e.key);function ib(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&rb(e)){e.preventDefault(),e.stopPropagation(),Ve?Er(Te+(e.shiftKey?-1:1)):nb();return}if(!Ve)return;let o={Escape:_o,Enter:()=>La(Ee[Te]),ArrowDown:()=>Er(Te+1),ArrowUp:()=>Er(Te-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function ab(e){Ve&&e.key==="Control"&&La(Ee[Te])}var Zu=f({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:E,styles:Qu,start(){Ma=new AbortController;let{signal:e}=Ma;addEventListener("keydown",ib,{capture:!0,signal:e}),addEventListener("keyup",ab,{capture:!0,signal:e}),addEventListener("blur",_o,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&qr(h()),{signal:e}),Wu=[he(({prevId:i})=>{qr(i),Vu(Tr())}),W.on("conversation",({id:i})=>{E.store.visits.includes(i)&&Ju(i),qr(i)})];let{visits:t,titles:o,previews:n}=E.store,r=t.filter(i=>i!==Pe&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(E.store.visits=t.filter(i=>!r.includes(i))),Vu(Tr())},stop(){Ma?.abort();for(let e of Wu)e();_o()}});var ka="data:audio/mpeg;base64,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";var $u=new x("ResponseNotification"),sb=.5,lb=200,cb=300,en=p({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:e=>(e.append(z("Preview",td)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),Xu=null,Ia=new Map,_u,Ba;function ub(e){return new Promise((t,o)=>GM_xmlhttpRequest({url:e,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=lb&&n<cb?t(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var db=e=>Uint8Array.from(atob(e.slice(e.indexOf(",")+1)),t=>t.charCodeAt(0)).buffer;function mb(e,t){let o=Ia.get(t);return o||(o=(t.startsWith("data:")?Promise.resolve(db(t)):ub(t)).then(n=>e.decodeAudioData(n)),o.catch(()=>Ia.delete(t)),Ia.set(t,o)),o}async function ed(e){Xu??=new AudioContext;let t=Xu;t.state==="suspended"&&t.resume();let o=t.createBufferSource(),n=t.createGain();o.buffer=await mb(t,e),n.gain.value=sb,o.connect(n).connect(t.destination),o.start()}function td(){let e=en.store.soundUrl.trim();ed(e||ka).catch(t=>{$u.warn("Sound failed",t),e&&ed(ka).catch(o=>$u.warn("Default chime failed",o))})}function fb(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function pb(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(Ba=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:Ba.signal}))}var od=f({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:en,start(){pb(),_u=q.on("fall",({conversationId:e,outcome:t})=>{t==="done"&&(en.store.onlyWhenHidden&&!document.hidden||(en.store.sound&&td(),en.store.browserNotification&&fb(Xo(e))))})},stop(){_u?.(),Ba?.abort()}});var gb=`:is(${u.sidebarScroll}, :has(> ${u.sidebarScroll})) + :has(${u.menuButton})`,hb=`${u.rail} > :has(${u.menuButton})`,Pa=`:is(${gb}, ${hb}, ${u.oldProfile}):not(:hover)`,Oa="[data-bloom-profile-avatar]",bb=`:is(${Pa}, ${Pa} :has(${Oa})) > :not(${Oa}, :has(${Oa}))`,rd=p({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function yb(){let{opacity:e,fadeAvatar:t}=rd.store;return e>=100?"":`${t?Pa:bb}{opacity:${e/100}!important}`}var nd,id=f({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:rd,styles:yb,start(){nd=Ae()},stop(){nd?.()}});var ad=`/*
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
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 0.375rem;
    color: var(--bloom-fg-3);
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
    padding: 0.375rem;
    border: 1px solid var(--bloom-border);
    border-radius: 0.75rem;
    background: var(--bloom-surface);
    color: var(--bloom-fg);
    box-shadow: var(--bloom-shadow);
}

.bloom-star-chats-bridge {
    position: absolute;
    inset-inline: 0;
    height: 0.5rem;
}

.bloom-star-chats-panel[data-place="below"] .bloom-star-chats-bridge {
    bottom: 100%;
}

.bloom-star-chats-panel[data-place="above"] .bloom-star-chats-bridge {
    top: 100%;
}

.bloom-star-chats-body {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    overflow: auto;
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
`;var N=C("bloom-star-chats"),vb=80,wb=60,Sb=1200,xb=120,tn=p({replaceReadAloud:{type:"boolean",description:"Put the star where the reply's Read aloud button is, and hide that button.",default:!0},messages:{type:"custom",default:[]}}),qb=`:is(${u.turnActions}) ${u.readAloud}`,Ra,Da=!1,Je=!1,wt=!1,Cr=0,V=null,Mr="",P=null,Ha,Ze;function Ua(){let e=tn.store.messages;return Array.isArray(e)?e.filter(t=>k(t)&&typeof t.conversationId=="string"&&typeof t.messageId=="string"&&(t.role==="user"||t.role==="assistant")&&typeof t.snippet=="string"&&typeof t.starredAt=="number"):[]}function Fa(){let e=h();return e?Ua().filter(t=>t.conversationId===e):[]}function Eb(e,t){return Ua().some(o=>o.conversationId===e&&o.messageId===t)}function sd(e){let t=Ua(),o=t.some(n=>n.conversationId===e.conversationId&&n.messageId===e.messageId);tn.store.messages=o?t.filter(n=>!(n.conversationId===e.conversationId&&n.messageId===e.messageId)):[{...e,starredAt:Date.now()},...t].slice(0,vb)}function Na(e){return e.messageIds[0]||e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.el.getAttribute("data-turn-key")||""}function Tb(e){return fe(It(e)||b(e.el.textContent??""),wb)}function Cb(e){let t=e.closest(u.turn);if(!t)return null;let o=Ge().filter(n=>t.contains(n.el));return o.find(n=>n.el.contains(e)||n.el===t)??o.findLast(n=>n.el.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING)??null}function Mb(){let e=[...document.querySelectorAll(u.turnActions)].filter(t=>!t.closest(`[data-bloom], [role="dialog"], [inert], pre, ${u.sidebars}`));return e.filter(t=>!e.some(o=>o!==t&&o.contains(t)))}function Lb(e,t){let o=tn.store.replaceReadAloud?t.querySelector(u.readAloud):null;if(o&&!o.closest("[data-bloom]")){e.nextElementSibling!==o&&o.before(e);return}let n=kb(t);(e.parentElement!==n||n.lastElementChild!==e)&&n.append(e)}function kb(e){let t=[...e.querySelectorAll("button")].filter(n=>n.dataset.bloom!=="message-star"&&!n.closest("[data-bloom]"));return t.length?[...e.children].find(n=>n instanceof HTMLElement&&n!==t[0]&&t.every(r=>n.contains(r)))??e:e}function Ib(){return[...document.querySelectorAll(u.headerMore)].filter(t=>{if(t.dataset.bloom==="message-star"||t.closest("[data-bloom], [role='dialog'], [inert]")||t.closest(u.sidebars))return!1;let o=t.getBoundingClientRect();return o.width===0&&o.height===0?!!t.closest("header, #page-header"):o.top>=0&&o.top<96&&o.left>window.innerWidth*.5}).toSorted((t,o)=>o.getBoundingClientRect().left-t.getBoundingClientRect().left||(t.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1))[0]??null}function ld(e,t,o){return s("button",{class:t,attrs:{type:"button","aria-label":e},on:{pointerdown:n=>n.stopPropagation(),mousedown:n=>n.stopPropagation(),click:n=>{n.preventDefault(),n.stopPropagation(),o(n)}}},O("star"))}function Bb(e,t){e.setAttribute("aria-pressed",String(t)),e.setAttribute("aria-label",t?"Unstar":"Star")}function Lr(){return Je||wt}function no(){Cr&&window.clearTimeout(Cr),Cr=0}function ro(){Je=!1,wt=!1,no(),Ze?.enter(),V?.remove(),V=null,Mr="",P?.classList.remove(N("-open")),P?.setAttribute("aria-expanded","false")}function kr(e){return e instanceof Node&&!!(P?.contains(e)||V?.contains(e))}function Ob(e){e.classList.add(N("-flash")),window.setTimeout(()=>e.classList.remove(N("-flash")),Sb)}function Pb(e){let t=Ge().find(n=>Na(n)===e),o=t?.el.closest(u.turn)??t?.el;o&&(o.scrollIntoView({block:"start"}),Ob(o))}function Rb(){let e=h(),t=new Set,o=[...document.querySelectorAll('[data-bloom="message-star"][data-place="action"]')];if(!e||ge()){for(let n of o)n.remove();return}for(let n of Mb()){if(!me(n))continue;let r=Cb(n),i=r?Na(r):"";if(!r||!i)continue;let a=n.querySelector('[data-place="action"]');(!a||a.dataset.id!==i)&&(a?.remove(),a=ld("Star",N("-star"),()=>{let c=h(),l=Ge().find(d=>Na(d)===i);!c||!l||sd({conversationId:c,messageId:i,role:l.role,snippet:Tb(l)})}),a.dataset.bloom="message-star",a.dataset.place="action",a.dataset.id=i),Bb(a,Eb(e,i)),Lb(a,n),t.add(a)}for(let n of o)t.has(n)||n.remove()}function Db(){if(!V||!P)return;let e=P.getBoundingClientRect(),t=V.offsetWidth||288,o=V.offsetHeight||120,n=e.bottom+6;n+o>window.innerHeight-8&&(n=Math.max(8,e.top-o-6));let r=Math.max(8,Math.min(e.right-t,window.innerWidth-t-8));V.dataset.place=n>=e.bottom?"below":"above",V.style.left=`${Math.round(r)}px`,V.style.top=`${Math.round(n)}px`}function Hb(){if(!Lr()||!P){V?.remove(),V=null,Mr="",P?.classList.remove(N("-open")),P?.setAttribute("aria-expanded","false");return}let e=Fa(),t=e.map(o=>`${o.messageId}	${o.snippet}`).join(`
`);if(!V||Mr!==t){V?.remove();let o=e.map(n=>s("div",{class:N("-row")},s("button",{class:N("-jump"),attrs:{type:"button"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),ro(),Pb(n.messageId)}}},s("span",{class:N("-role"),text:n.role==="user"?"You":"ChatGPT"}),s("span",{class:N("-snip"),text:n.snippet||"Message"})),ld("Unstar",N("-unstar"),()=>sd(n))));V=s("div",{class:`bloom-root ${N("-panel")}`,attrs:{"data-bloom":"star-list"},on:{pointerenter:()=>{no(),Ze?.enter(),wt=!0},pointerleave:n=>{kr(n.relatedTarget)||Je||Ze?.leave(n)}}},s("div",{class:N("-bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:N("-head"),text:"Starred"}),s("div",{class:N("-body")},...o.length?o:[s("div",{class:N("-empty"),text:"No starred messages in this chat"})])),document.body.append(V),Mr=t}Db(),P.classList.add(N("-open")),P.setAttribute("aria-expanded","true")}function Nb(){for(let r of document.querySelectorAll('[data-bloom="starred"]'))r.remove();let e=Ib(),t=e?.parentElement??null,o=h();if(!e||!t||t.closest(u.sidebars)||!o||ge()||!me(t)){P?.remove(),P=null,ro();return}P||(P=s("button",{class:N("-toggle"),attrs:{type:"button","data-bloom":"message-star","data-place":"header","aria-label":"Starred messages","aria-expanded":"false"},on:{pointerdown:r=>r.stopPropagation(),pointerenter:()=>{no(),Ze?.enter(),Cr=window.setTimeout(()=>{wt=!0,vt()},xb)},pointerleave:r=>{kr(r.relatedTarget)||(no(),Lr()&&Ze?.leave(r))},click:r=>{r.preventDefault(),r.stopPropagation(),Je=!Je,wt=Je,no(),Je||ro(),vt()}}},O("star"))),(P.parentElement!==t||P.nextElementSibling!==e)&&e.before(P);let n=e.getBoundingClientRect();n.width>0&&(P.style.width=`${n.width}px`,P.style.height=`${n.height}px`),P.classList.toggle(N("-here"),Fa().length>0),Hb()}function Ub(){let e=new Set(Fa().map(t=>t.messageId));for(let t of document.querySelectorAll('[data-bloom="navigator"] .bloom-nav-tick, [data-bloom="navigator"] .bloom-nav-row'))t.classList.toggle(N("-mark"),!!t.dataset.messageId&&e.has(t.dataset.messageId))}function vt(){if(!Da){Da=!0;try{for(let e of document.querySelectorAll('[data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();Rb(),Nb(),Ub()}finally{Da=!1}}}function Fb(){ro(),P?.remove(),P=null;for(let e of document.querySelectorAll('[data-bloom="message-star"], [data-bloom="star-list"], [data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();for(let e of document.querySelectorAll(`.${N("-mark")}`))e.classList.remove(N("-mark"))}var cd=f({name:"StarChats",description:"Star a message from its toolbar. The star left of the top-right menu opens this chat's list.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:tn,styles:()=>`${ad}${tn.store.replaceReadAloud?He([qb]):""}`,onSettingsChange(e){(e==="messages"||e==="replaceReadAloud")&&vt()},start(){for(let o of document.querySelectorAll('[data-bloom="star-list"]'))o.remove();Ze=Un({over:kr,trigger:()=>P,panel:()=>V,setHeld(o){if(o){wt=!0,vt();return}Je||(wt=!1,vt())}}),Ra=M(o=>U(o)&&vt());let e=o=>{kr(o.target)||Lr()&&ro()};document.addEventListener("pointerdown",e,!0);let t=o=>{o.key!=="Escape"||!Lr()||(o.preventDefault(),ro())};document.addEventListener("keydown",t,!0),Ha=()=>{document.removeEventListener("pointerdown",e,!0),document.removeEventListener("keydown",t,!0)},vt()},stop(){Ra?.(),Ra=void 0,Ha?.(),Ha=void 0,no(),Ze?.dispose(),Ze=void 0,Fb()}});var ud="filter:blur(6px)!important;transition:filter 0.2s ease",dd=`:is(${u.sidebars})`,St="data-bloom-streamer-open",Gb="[data-app-action-sidebar-thread-row], [data-app-action-sidebar-project-row], .bloom-recent-item";function Yb(){return{conversations:{selectors:[`${dd} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0,row:"[data-app-action-sidebar-thread-row]"},projects:{selectors:[`${dd} a:is([href*="/project"], [href*="/g/g-p-"])`,"[data-app-action-sidebar-project-row]",".bloom-recent-project"],hover:!0,row:"[data-app-action-sidebar-project-row]"},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}}}var md=p({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function Kb(e,t){let o=[`:is(${e}):hover`,`.bloom-recent-item:hover :is(${e})`,`:is(${e})[${St}]`];return t&&o.push(`${t}:hover`,`${t}:hover :is(${e})`,`${t}:is(${e}):hover`,`${t}[${St}]`,`${t}[${St}] :is(${e})`),o.join(",")}function Qb(){let e=Yb();return Object.entries(e).filter(([t])=>md.store[t]).map(([,t])=>{let o=t.selectors.join(",");if(!t.hover)return`:is(${o}){${ud}}`;let n="row"in t?t.row:void 0;return`:is(${o}){${ud}}${Kb(o,n)}{filter:none!important}`}).join(`
`)}function jb(e,t){for(let o of document.elementsFromPoint(e,t))if(o instanceof Element){let n=o.closest(Gb);if(n)return n}return null}function Ka(e){for(let t of document.querySelectorAll(`[${St}]`))t!==e&&t.removeAttribute(St);e&&!e.hasAttribute(St)&&e.setAttribute(St,"")}var io,Wb=Ne(()=>{io&&Ka(jb(io.clientX,io.clientY))});function Ga(e){io=e,Wb()}function zb(e){e.relatedTarget instanceof Node&&document.documentElement.contains(e.relatedTarget)||(io=void 0,Ka(null))}var Ya,Ir,fd=f({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:md,styles:Qb,start(){Ya=Ae(),Ir=new AbortController;let e={capture:!0,signal:Ir.signal,passive:!0};document.addEventListener("pointerover",Ga,e),document.addEventListener("pointermove",Ga,e),document.addEventListener("pointerout",Ga,e),window.addEventListener("pointerleave",zb,e)},stop(){Ir?.abort(),Ir=void 0,io=void 0,Ka(null),Ya?.(),Ya=void 0}});var gd=p({openNewAsTemporary:{type:"boolean",description:"Open New chat as a temporary chat.",default:!1}}),Vb=/^(?:new chat|新聊天)$/i,Br;function Jb(e){return e?"/?temporary-chat=true":"/"}function Zb(e){let t=Jb(e);`${location.pathname}${location.search}`===t||e&&ge()&&location.pathname==="/"||location.assign(t)}function $b(e){if(e.closest("[data-bloom]"))return!1;try{let t=new URL(e.href,location.origin);return t.origin===location.origin&&t.pathname==="/"}catch{return!1}}function Xb(e){return e.closest("[data-bloom], [data-app-action-sidebar-project-row]")?!1:Vb.test(e.getAttribute("aria-label")??b(e.textContent??""))}function _b(e){if(!gd.store.openNewAsTemporary||ge())return;let{target:t}=e;if(!(t instanceof Element))return;let o=t.closest("a[href], button"),n=o instanceof HTMLAnchorElement?$b(o):!!o&&Xb(o);!o||!n||o.closest(`${u.sidebarScroll}, ${u.rail}, ${u.oldSidebar}, nav`)&&(e.preventDefault(),e.stopPropagation(),Zb(!0))}function pd(){for(let e of document.querySelectorAll('[data-bloom="temporary-chat"]'))e.remove()}var hd=f({name:"TemporaryChat",description:"Optionally open New chat as a temporary chat. No extra sidebar button.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"ghost",enabledByDefault:!0,settings:gd,start(){pd(),Br=new AbortController,document.addEventListener("pointerdown",_b,{capture:!0,signal:Br.signal})},stop(){Br?.abort(),Br=void 0,pd()}});var $e=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)','[data-turn-key] [data-message-author-role="user"] blockquote:not(.twitter-tweet)','[class~="group/user-message"] blockquote:not(.twitter-tweet)'].join(","),Qa=p({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function ey(){let e=[`${$e}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${$e}>*{margin-block:0!important}`];return Qa.store.italic||e.push(`${$e}{font-style:inherit!important}`),Qa.store.quotes||(e.push(`${$e}{quotes:none!important}`),e.push(`${$e}::before,${$e}::after,${$e} p::before,${$e} p::after{content:none!important}`)),e.join(`
`)}var bd=f({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:Qa,styles:ey});var ty=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],oy=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",ny='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',yd=p({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function ry(){let e=`${yd.store.width}rem`;return`:is(${oy}){${ty.map(t=>`${t}:${e}!important`).join(";")}}:is(${ny}){max-width:min(100%, ${e})!important}`}var Ad=f({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:yd,styles:ry});var iy=[Rl,Xl,sc,uc,wc,qc,Tc,Pc,Qc,Xc,ru,wu,xu,qu,Lu,Ku,Zu,od,id,cd,fd,hd,bd,Ad],ja=iy;var ay=new x("Bloom"),vd="2.0.93";var Wa=0,Or;function sy(){Wa++,Or?.(),Or=void 0,Cs(),lo(),an()}async function za(){let e=++Wa,t=()=>e===Wa;lo(),an(),Fs();for(let o of ja)o.updatedAt=ll[o.name];gs(ja),ds(),bs(),indexedDB.deleteDatabase("bloompp"),xt("base",Ls),ol(),hn("Init"),wn().then(()=>{t()&&(os(),hn("DOMContentLoaded"))}),await Ys(),t()&&(hn("HostReady"),Or?.(),Or=sl(),Ts(),ay.info(`Bloom++ ${vd} ready`))}var ly=new x("Boot");window===window.top&&(rs(_.Bloom),is(Va),za().catch(e=>ly.error("Startup failed",e)));})();
