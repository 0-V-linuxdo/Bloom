// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.112
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

/* Bloom++ v2.0.112. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var pm=Object.defineProperty;var gm=(e,t)=>{for(var o in t)pm(e,o,{get:t[o],enumerable:!0})};var E=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var pe=(e,t,o)=>Math.min(o,Math.max(t,e)),L=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),lt=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,qe=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,y=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function vn(e,t){return`${e} ${t}${e===1?"":"s"}`}async function An(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function Te(e){try{return JSON.parse(e)}catch{return}}var oe=typeof unsafeWindow>"u"?window:unsafeWindow,hm=200,bm=300;function wn(e){return new Promise((t,o)=>GM_xmlhttpRequest({url:e,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=hm&&n<bm?t(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var ym=new E("Styles"),Ye=new Map,Eo=new Set,ct=new Map,ei=!0,As=e=>e.replaceAll(/[^A-Za-z0-9_-]/g,"_"),vm=e=>`:where(:root){--bloom-sheet-${As(e)}:1}`,Am=(e,t)=>`${vm(e)}${t}`,ws=e=>`bloom-style-${e}`;function Ss(e){try{return[...e.cssRules].map(t=>t.cssText).join(`
`)}catch{return""}}function wm(e,t){let o=Ss(e);return o?o.includes(`--bloom-sheet-${As(t)}`)?!0:t==="plugin-StreamerMode"?o.includes("blur(6px)")&&(o.includes("data-app-action-sidebar-thread-title")||o.includes("data-bloom-streamer-open")):t==="plugin-WiderChat"?o.includes("--composer-adjacent-max-width")&&o.includes("--thread-content-max-width"):t==="plugin-ComposerOpacity"?o.includes("--composer-layout-surface-backdrop-filter")||o.includes("--composer-layout-surface-background")&&o.includes("color-mix"):!1:!1}function xs(e){let t=Ss(e);return t?!!(t.includes("--bloom-")||t.includes(".bloom-")||t.includes("[data-bloom")||t.includes("--bloom-sheet-")||t.includes("blur(6px)")&&t.includes("data-app-action-sidebar-thread-title")||t.includes("--composer-adjacent-max-width")&&t.includes("--thread-content-max-width")||t.includes("--composer-layout-surface-backdrop-filter")):!1}function Es(){let e=document.adoptedStyleSheets.filter(t=>!Eo.has(t)&&!xs(t));document.adoptedStyleSheets=[...e,...Ye.values()]}function qs(e){document.readyState==="loading"||e.parentNode===document.head||document.head.append(e)}function Sm(e,t){let o=ct.get(e);o||(o=document.createElement("style"),o.id=ws(e),ct.set(e,o)),o.textContent!==t&&(o.textContent=t),qs(o)}function Pt(e,t){let o=Am(e,t);if(ei)try{let n=Ye.get(e);n||(n=new oe.CSSStyleSheet,Ye.set(e,n),Eo.add(n)),n.replaceSync(o),Es();return}catch(n){ym.warn("Constructed style sheets unavailable, using <style> after parsing",n),ei=!1;let r=Ye.get(e);r&&Eo.delete(r),Ye.delete(e)}Sm(e,o)}function qo(e){let t=Ye.get(e);t&&(Eo.delete(t),Ye.delete(e)),ct.get(e)?.remove(),ct.delete(e);for(let o of document.querySelectorAll(`style[id="${ws(e)}"]`))o.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(o=>o!==t&&!wm(o,e)),ei&&Es()}catch{}}function To(){Ye.clear(),Eo.clear();for(let e of ct.values())e.remove();ct.clear();for(let e of document.querySelectorAll("style[id^='bloom-style-']"))e.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(e=>!xs(e))}catch{}}function Ts(){for(let e of ct.values())qs(e)}var C=e=>(...t)=>t.map(o=>e+o).join(" "),Sn=(...e)=>e.filter(Boolean).join(" "),Ke=e=>e.length?`${e.map(t=>`${t}:not([data-bloom])`).join(",")}{display:none!important}`:"";var Cs="__bloomHost",ti=new E("Boot"),xm=['[data-bloom="navigator"]','[data-bloom="settings"]','[data-bloom="history-hud"]','[data-bloom="history-dialog"]','[data-bloom="star-list"]','[data-bloom="entry"]','[data-bloom="menu-entry"]','[data-bloom="menu-flyout"]','[data-bloom="message-star"]','[data-bloom="starred"]','[data-bloom="chat-star"]','[data-bloom="queue"]','[data-bloom="recent"]','[data-bloom="quote-chip"]','[data-bloom="quote-back"]','[data-bloom="cls"]','[data-bloom="timestamp"]','[data-bloom="tooltip"]','[data-bloom="notices"]'].join(", "),Em=["data-bloom-greeting","data-bloom-placeholder","data-bloom-streamer-open","data-bloom-share","data-bloom-invite","data-bloom-csi-avatar","data-bloom-csi-sized"];function xn(){if(!(typeof document>"u"||!document.documentElement)){for(let e of document.querySelectorAll(xm))e.remove();for(let e of Em)for(let t of document.querySelectorAll(`[${e}]`))t.removeAttribute(e);for(let e of document.querySelectorAll("[data-bloom-text]"))e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size"),e.style.removeProperty("--bloom-text")}}function qm(e){if(ti.warn("Replacing another Bloom++ instance",e.VERSION),e.destroy){e.destroy();return}for(let t of e.plugins?.values()??[]){try{t.stop?.()}catch(o){ti.error("Failed to stop previous plugin",o)}t.styles="",t.start=void 0}To()}function Ms(e){let t=oe,o=new Set;for(let n of[e,t.Bloom,t[Cs]])if(!(!n||o.has(n))){o.add(n);try{qm(n)}catch(r){ti.error("Failed to retire Bloom++",r)}}xn()}function ks(e){let t=oe;try{delete t.Bloom}catch{}Object.defineProperty(t,"Bloom",{value:e,configurable:!0,writable:!0}),Object.defineProperty(t,Cs,{value:e,configurable:!0,writable:!0})}var vs={};gm(vs,{VERSION:()=>fm,destroy:()=>gv,init:()=>ys,plugins:()=>Z});var Tm=new E("Dom");function s(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var Ls=document.createElement("template");function Is(e){return Ls.innerHTML=e.trim(),Ls.content.firstElementChild.cloneNode(!0)}var ut=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),J=(e,t=document)=>[...t.querySelectorAll(e)].find(ut)??null,Cm=16,Mm="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function Tn(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([Mm],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function Mo(e){document.hidden?setTimeout(e,Cm):requestAnimationFrame(e)}function Qe(e){let t=!1;return()=>{t||(t=!0,Mo(()=>{t=!1;try{e()}catch(o){Tm.error("Scheduled task failed",o)}}))}}var En=new Set,qn=[],Co,km=Qe(()=>{let e=qn;qn=[];for(let t of En)t(e)});function M(e){return En.add(e),Co||(Co=new MutationObserver(t=>{qn.push(...t),km()}),Co.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{En.delete(e),!En.size&&(Co?.disconnect(),Co=void 0,qn=[])}}var Lm=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),Y=e=>!e.length||e.some(t=>!Lm(t.target)),Im=e=>`"${e.replaceAll("\\","\\\\").replaceAll('"','\\"').replaceAll(`
`,"\\A ")}"`;function dt(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size"),e.style.removeProperty("--bloom-text");return}e.style.setProperty("--bloom-text",Im(t)),e.getAttribute("data-bloom-text")!==t&&e.setAttribute("data-bloom-text",t)}function f(e){return e}var Bs=new E("Storage");function Rt(e){try{return localStorage.getItem(e)??void 0}catch{return}}function Dt(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(o){Bs.warn("localStorage write failed",o)}}function oi(e){try{localStorage.removeItem(e)}catch(t){Bs.warn("localStorage delete failed",t)}}function Os(e,t){addEventListener("storage",o=>{o.key===e&&t(o.newValue)})}var ni="BloomSettings",Bm=100,ze={plugins:{}},Cn=new Set,ri=new Set,Ht;function Ps(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=Te(t);return!L(t)||!L(t.plugins)||!Object.keys(t.plugins).length?null:t}function Rs(){let e=Ps(Rt(ni));e&&(ze.plugins=e.plugins)}var Ds=(e,t)=>`${e}
${t}`;function ii(){Ht=void 0,ri.clear(),Dt(ni,ze)}function Om(e){let t=Ps(e);if(!t)return;let o=[];for(let n of new Set([...Object.keys(ze.plugins),...Object.keys(t.plugins)])){let r=ze.plugins[n]??={},i=L(t.plugins[n])?t.plugins[n]:{};for(let a of new Set([...Object.keys(r),...Object.keys(i)]))ri.has(Ds(n,a))||JSON.stringify(r[a])===JSON.stringify(i[a])||(i[a]===void 0?delete r[a]:r[a]=i[a],o.push([n,a]))}for(let[n,r]of o)for(let i of Cn)i(n,r)}function ai(){Ht&&(clearTimeout(Ht),ii())}function Hs(e){let t=Object.keys(ze.plugins).filter(o=>!e.has(o));if(!t.length)return t;for(let o of t)delete ze.plugins[o];return clearTimeout(Ht),ii(),t}var ne=(e,t)=>ze.plugins[e]?.[t];function se(e,t,o){let n=ze.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,ri.add(Ds(e,t)),clearTimeout(Ht),Ht=setTimeout(ii,Bm);for(let r of Cn)r(e,t)}function Nt(e){return Cn.add(e),()=>void Cn.delete(e)}function si(e){return e.type==="component"?void 0:e.default}function g(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>ne(t.pluginName,n)??(e[n]&&si(e[n])),set:(o,n,r)=>(se(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&ne(t.pluginName,o)!==void 0&&se(t.pluginName,o)}};return t}var Ns=e=>{let t=()=>{let o=ne("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();se("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},Mn=Ns("pinnedPlugins"),kn=Ns("starredPlugins");addEventListener("pagehide",ai);Os(ni,Om);var Io=new E("PluginManager"),Z=new Map,mt=new Set,ci=new Set,li=new Set,ko=new Map,Pm=2880*60*1e3;function Us(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),Z.set(t.name,t)}var Fs=()=>{let e=ne("Settings","knownPlugins");return L(e)?e:null};function Gs(){let e=Hs(new Set(Z.keys()));e.length&&Io.info(`Dropped settings of removed plugins: ${e.join(", ")}`);let t=Fs(),o=Date.now(),n={...t},r=[...Z.values()].filter(i=>!i.hidden&&!i.required&&!(i.name in n));for(let i of r)n[i.name]=t?o:0;for(let i of Object.keys(n))Z.has(i)||delete n[i];JSON.stringify(n)!==JSON.stringify(t)&&se("Settings","knownPlugins",n)}var Ys=e=>{let t=Fs()?.[e];return!!t&&Date.now()-t<Pm},Ks=e=>ko.get(e);function Qs(){for(let e of li)e()}function zs(e,t){let o=ko.get(e);(t?o?.join(`
`)===t.join(`
`):!o)||(t?ko.set(e,t):ko.delete(e),Qs())}var je=e=>!!e.required||(ne(e.name,"enabled")??!!e.enabledByDefault);var Lo=e=>`plugin-${e.name}`;function js(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?Pt(Lo(e),t):qo(Lo(e))}function Rm(e){if(!mt.has(e.name))try{js(e),e.start?.(),mt.add(e.name)}catch(t){qo(Lo(e)),Io.error(`Failed to start ${e.name}`,t)}}function ui(e){mt.delete(e.name),qo(Lo(e));try{e.stop?.()}catch(t){Io.error(`Failed to stop ${e.name}`,t)}}var Ws=e=>e.startAt??"HostReady";function Vs(e){if(je(e)){ci.has(Ws(e))&&Rm(e);return}ui(e)}function In(e){ci.add(e);for(let t of Z.values())Ws(t)===e&&Vs(t);Io.info(`${e}: ${[...mt].join(", ")}`)}function Js(e,t){se(e.name,"enabled",t),ai()}function Dm(){for(let e of Z.values())e.required||je(e)||(mt.has(e.name)?ui(e):qo(Lo(e)))}var Ln;function Zs(){Ln?.(),Ln=M(()=>Dm())}function $s(){Ln?.(),Ln=void 0;for(let e of Z.values())ui(e);mt.clear(),ci.clear(),ko.clear()}function Xs(e){return li.add(e),()=>void li.delete(e)}Nt((e,t)=>{let o=Z.get(e);if(o){if(t==="enabled"){typeof ne(e,"enabled")=="boolean"&&Vs(o),Qs();return}if(mt.has(e))try{js(o),o.onSettingsChange?.(t)}catch(n){Io.error(`Settings change failed for ${e}`,n)}}});var _s=`/*
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
    --bloom-z-chrome: 30;
    --bloom-z-tray: 50;
    --bloom-z-float: 80;
    --bloom-z-overlay: 2147483000;
    --bloom-z-tooltip: 2147483647;
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

.bloom-root[popover] {
    inset: auto;
    width: auto;
    height: auto;
    margin: 0;
    padding: 0;
    overflow: visible;
    border: none;
    color: inherit;
    background-color: transparent;
}

html:has([data-bloom="settings"], [data-bloom="recent"], [data-bloom="history-dialog"], [data-bloom="star-list"], .bloom-nav-open, [data-bloom="menu-flyout"]) [popover][class*="panel-resizer"],
html:has([data-bloom="settings"], [data-bloom="recent"], [data-bloom="history-dialog"], [data-bloom="star-list"], .bloom-nav-open, [data-bloom="menu-flyout"]) [popover][class*="panel-resizer"] *,
html:has([data-bloom="settings"], [data-bloom="recent"], [data-bloom="history-dialog"], [data-bloom="star-list"], .bloom-nav-open, [data-bloom="menu-flyout"]) [popover][class*="panel-resizer"]::after,
html:has([data-bloom="settings"], [data-bloom="recent"], [data-bloom="history-dialog"], [data-bloom="star-list"], .bloom-nav-open, [data-bloom="menu-flyout"]) [popover][class*="panel-resizer"] *::after {
    pointer-events: none;
}

html:has([data-bloom="settings"], [data-bloom="recent"], [data-bloom="history-dialog"], [data-bloom="star-list"], .bloom-nav-open, [data-bloom="menu-flyout"]) [popover][class*="panel-resizer"] {
    visibility: hidden;
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
    z-index: var(--bloom-z-tooltip);
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
`;var Nm=new E("Events");function Bn(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){Nm.error(`Listener for ${String(t)} failed`,r)}}}}var u={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',sidebarConversationRow:"[data-sidebar-chatgpt-conversation-key]",sidebarIndicator:"[data-sidebar-indicator]",timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',readAloud:'button:is([aria-label="Read aloud" i], [aria-label^="Read aloud" i], [aria-label="Stop reading" i], [aria-label^="Stop reading" i], [aria-label="\u6717\u8BFB"], [aria-label^="\u6717\u8BFB"], [aria-label="\u505C\u6B62\u6717\u8BFB"], [data-testid*="read-aloud" i])',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',composerConversation:"[data-above-composer-conversation-id]",oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",modelTrigger:'[data-testid="model-switcher-dropdown-button"], button[aria-label="Model selector" i], button[aria-label="Select ChatGPT model" i]',modelItem:'[role="menu"] [data-testid^="model-switcher-"], [role="menuitem"][data-testid^="model-switcher-"], [role="menu"] [role="menuitemradio"], [role="menu"] [data-reasoning-slider]',effortSlider:'[role="menu"] [data-reasoning-slider]',homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]',headerMore:'button[aria-label="More" i], button[aria-label="\u66F4\u591A"]',rightPanel:"aside[data-app-shell-focus-area='right-panel']",summaryPanel:"[data-summary-panel-variant]"};var el=/[​-‍﻿]/g,Ae=()=>J(u.composerInput),ft=e=>e instanceof HTMLElement&&e.matches(u.composerInput),$=(e=Ae())=>e?.closest("form")??document.querySelector(u.oldComposerForm);function B(e=Ae()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(el,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(el,"").trim()}var Um=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function ce(e,t=Ae()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return Um?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function tl(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:a,value:c}=e;return{first:!c.slice(0,i).includes(`
`),last:!c.slice(a).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var ol=e=>{let t=$();return(t&&J(e,t))??J(e)},Ut=()=>ol(u.stopButton),Fm=()=>{let e=ol(u.sendButton);return e&&!e.matches(u.stopButton)?e:null};function On(){let e=Fm();if(e){e.disabled||e.click();return}Ae()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var nl=()=>ut(Ut());var al=new E("Network"),Gm=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,Ym=404,Km=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,Rn=1e3,Qm=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),V=Bn(),mi=new Map,rl=new Map,zm=1,we=e=>e?mi.get(e)??null:null,pi=e=>e!=null;function Pn(e){let t=mi.get(e);return t||mi.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var sl=e=>e==="user"||e==="assistant";function ll(e){let t=e.author?.role;if(!e.id||!sl(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(l=>typeof l=="string").join(`
`).trim(),i=n.filter(l=>L(l)&&l.content_type==="image_asset_pointer").length,a=e.metadata?.attachments,c=Array.isArray(a)&&a.length>0;return!r&&!i&&!c?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*Rn:null,text:r,hasFiles:c,imageCount:i}}var cl=e=>e.filter((t,o)=>t.role==="user"||e[o+1]?.role!=="assistant"),fi=e=>e.map(t=>t.createTime).filter(t=>t!=null);function jm(e,t){let o=fi(e),n=fi(t);return!o.length||!n.length?!1:Math.max(...o)<Math.min(...n)}function Wm(e){let t=fi(e);if(t.length<2)return e;let[o]=t,n=o-e.length;return e.map((i,a)=>(i.createTime!=null&&(n=i.createTime),{message:i,index:a,time:i.createTime??n})).toSorted((i,a)=>i.time-a.time||i.index-a.index).map(i=>i.message)}function Vm(e,t){let o=t.filter(L).map(c=>L(c.message)?c.message:c);for(let c of o)c.id&&c.create_time&&e.times.set(c.id,c.create_time*Rn);let n=o.map(ll).filter(c=>c!=null),r=new Set(n.map(c=>c.id)),i=e.chain.filter(c=>!r.has(c.id)),a=jm(n,i)?[...n,...i]:[...i,...n];return e.chain=cl(Wm(a)),e}function Jm(e,t){if(!L(t)||!(L(t.mapping)||Array.isArray(t.messages)))return null;let o=Pn(e);if(typeof t.title=="string"&&t.title&&(o.title=t.title),Array.isArray(t.messages))return Vm(o,t.messages);let n=t.mapping;for(let c of Object.values(n)){let l=c.message?.create_time;c.message?.id&&l&&o.times.set(c.message.id,l*Rn)}let r=[],i=new Set,a=typeof t.current_node=="string"?t.current_node:null;for(;a&&!i.has(a)&&n[a];){i.add(a);let c=n[a].message,l=c?ll(c):null;l&&r.push(l),a=n[a].parent??null}return r.length&&(o.chain=cl(r.toReversed())),o}function Zm(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}var di=e=>typeof e=="string"?e:null;function $m(e){let t=typeof e?.body=="string"?Te(e.body):null;if(!L(t))return{conversationId:null,parentId:null,userId:null};let[o]=Array.isArray(t.messages)?t.messages:[];return{conversationId:di(t.conversation_id),parentId:di(t.parent_message_id),userId:L(o)?di(o.id):null}}function Xm(e,t){if(!L(e))return;typeof e.type=="string"&&Qm.has(e.type)&&(t.handoff=!0);let o=L(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(Pn(e.conversation_id).title=e.title,V.emit("conversation",Pn(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&sl(n.author?.role)){let r=n.create_time*Rn;t.conversationId&&Pn(t.conversationId).times.set(n.id,r),V.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function _m(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:a}=await o.read();if(i)break;r+=n.decode(a,{stream:!0});let c=r.split(`
`);r=c.pop()??"";for(let l of c){if(!l.startsWith("data:"))continue;let d=l.slice(5).trim();d&&d!=="[DONE]"&&Xm(Te(d),t)}}}async function ef(e,t,o){let{conversationId:n}=t,r={conversationId:n,error:!1,handoff:!1};rl.set(e,n),V.emit("generate-start",{requestId:e,...t});try{let i=await o;i.ok?i.headers.get("content-type")?.includes("event-stream")&&await _m(i.clone(),r):r.error=!0}catch(i){let a=i instanceof DOMException&&i.name==="AbortError";r.handoff||=a,r.error||=!a}finally{rl.delete(e),V.emit("generate-end",{requestId:e,...r})}}async function tf(e,t){try{let o=await t;if(o.status===Ym&&V.emit("conversation-missing",{id:e}),!o.ok)return;let n=Jm(e,await o.clone().json());n&&V.emit("conversation",n)}catch(o){al.debug("Conversation read skipped",o)}}function of(e,t,o){let n=Zm(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&Gm.test(n.pathname)){ef(zm++,$m(t),o);return}let i=r==="GET"&&n.pathname.match(Km)?.[1];i&&tf(i,o)}var il=!1;function ul(){if(il)return;il=!0;let e=oe.fetch,t=function(o,n){let r=e.call(this??oe,o,n);try{of(o,n,r)}catch(i){al.error("Fetch tap failed",i)}return r};oe.fetch=typeof exportFunction=="function"?exportFunction(t,oe):t}var nf="__reactContainer$",dl="__reactFiber$";function Dn(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var gi=(e,t)=>Object.keys(e.wrappedJSObject??e).some(o=>o.startsWith(t)),Se=e=>!gi(document,nf)||gi(e,dl);function pt(){return document.body?Promise.resolve():new Promise(e=>{let t=new MutationObserver(()=>{document.body&&(t.disconnect(),e())});t.observe(document,{childList:!0,subtree:!0})})}async function ml(){await pt();let e=Date.now()+8e3;for(;!gi(document.body,dl)&&Date.now()<e;)await new Promise(t=>setTimeout(t,100))}var rf=new E("Route"),fl=/\/c\/(?!local-)([\w-]+)/,af=500,yi=e=>{try{return new URL(e,location.origin).pathname.match(fl)?.[1]??null}catch{return null}},b=()=>location.pathname.match(fl)?.[1]??null,Ft=()=>location.pathname==="/",sf=/^\/g\/g-p-[^/]+(?:\/project)?\/?$/,Fn=()=>sf.test(location.pathname),Ce=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",Nn=new Set,Un=location.href,bi=b(),Hn;function hi(){if(location.href===Un)return;let e={prevHref:Un,href:location.href,prevId:bi,id:b()};Un=e.href,bi=e.id;for(let t of Nn)try{t(e)}catch(o){rf.error("Route listener failed",o)}}function lf(){let e=new AbortController,{navigation:t}=oe;t?.addEventListener("currententrychange",()=>queueMicrotask(hi),{signal:e.signal}),addEventListener("popstate",hi,{signal:e.signal});let o=setInterval(hi,af);return()=>{e.abort(),clearInterval(o)}}function ge(e){return Nn.add(e),Hn||(Un=location.href,bi=b(),Hn=lf()),()=>{Nn.delete(e),!Nn.size&&(Hn?.(),Hn=void 0)}}var cf=["data-turn","data-message-author-role"],uf=/:(user|assistant)$/,vi=`${u.messageUnit}, ${u.oldMessage}`,Ai=e=>e==="user"||e==="assistant",bl=()=>!!document.querySelector(u.timelineScroll),yl=()=>!!J(u.timelineScroll),wi=()=>b()??document.querySelector(u.composerConversation)?.getAttribute("data-above-composer-conversation-id")??"",Gt=()=>bl()?J(u.timelineScroll):document;function Oo(){if(bl())return J(u.timelineScroll);let e=document.querySelector(u.turn);for(let t=e?.parentElement;t;t=t.parentElement){let{overflowY:o}=getComputedStyle(t);if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight)return t}return document.scrollingElement}var Yt=e=>e.getAttribute("data-chatgpt-search-unit-key")?.match(uf)?.[1]??null,vl=e=>[...e.querySelectorAll(u.searchUnit)].filter(t=>Yt(t)&&!t.parentElement?.closest(u.searchUnit)),pl=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function Bo(e){let t=pl(e);return t.length?t:[...new Set([...e.querySelectorAll(vi)].flatMap(pl))]}function Kt(e=Gt()){if(!e)return[];let t=vl(e);return t.length?t:[...e.querySelectorAll(vi)].filter(o=>!o.parentElement?.closest(vi))}function df(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function mf(e){for(let t of cf){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(Ai(o))return o}return e.querySelector(u.markdown)||e.querySelector(u.generatedImage)?"assistant":null}var ff=e=>!e.parentElement?.closest(u.turn);function We(){let e=we(b())?.chain??[];return[...Gt()?.querySelectorAll(u.turn)??[]].filter(ff).flatMap(o=>{let n=vl(o),r=n.length?n.map(i=>({el:i,known:Yt(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=d=>!n.some(m=>m.contains(d))&&y(d.textContent??""),a=[...o.querySelectorAll(u.assistantMarkdown)].find(d=>i(d)&&!Gn.test(y(d.textContent??""))),c=[...o.querySelectorAll(u.activityHeader)].findLast(i),l=a??c;l&&r.push({el:l,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?Bo(o):Kt(o).flatMap(Bo),a=n??mf(o)??df(i,e)??(r%2?"assistant":"user"),c=o.closest(u.turn)??o,l=!o.closest(u.searchUnit)&&!!c.querySelector(u.turnBusy),d=a==="assistant"&&(o.matches(u.turnBusy)||!!o.querySelector(u.turnBusy)||l);return{el:o,role:a,messageIds:i,streaming:d}})}var pf="[data-bloom], .sr-only",Al=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,Gn=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,gl=new WeakMap;function Qt(e){let o=(e.el.closest(u.turn)??e.el).textContent?.length??0,n=gl.get(e.el);if(n?.length===o)return n.summary;let r=gf(e);return gl.set(e.el,{length:o,summary:r}),r}function hl(e){let t=new Set,o=[];for(let n of e.querySelectorAll(u.assistantMarkdown)){if(n.closest(u.searchUnit))continue;let r=y(n.textContent??"");!r||Gn.test(r)||Al.test(r)||t.has(r)||(t.add(r),o.push(r))}return o}function gf(e){let t=e.el.querySelectorAll(u.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.closest(u.turn);if(e.role==="assistant"&&o&&e.el.matches(u.assistantMarkdown)&&!e.el.closest(u.searchUnit)){let l=hl(o);if(l.length)return l.join(" \xB7 ")}let n=e.el.querySelector(e.role==="assistant"?u.markdown:".whitespace-pre-wrap")??e.el,i=[...n.querySelectorAll(pf)].map(l=>y(l.textContent??"")).filter(Boolean).reduce((l,d)=>l.replace(d,`
`),n.innerText||n.textContent||""),a=i.split(`
`).map(y).filter(l=>l&&!Al.test(l)&&!Gn.test(l));if(a.length)return a.join(" ");if(e.role==="assistant"&&o){let l=hl(o);if(l.length)return l.join(" \xB7 ")}let c=i.split(`
`).map(y).filter(l=>Gn.test(l));return c.length?c.at(-1)??"":e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function Yn(e){return e.text?y(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var Si=e=>e.matches(u.timelineScroll)&&getComputedStyle(e).flexDirection==="column-reverse";var hf=250,bf=400,yf=6e4,vf=5e3,Af=`:is(${u.turn}) :is(${u.turnBusy})`,wf="data-sidebar-chatgpt-conversation-key",El="data-sidebar-indicator",Sf=/:([0-9a-f-]{36})$/i,S=Bn(),zn=new Set,xi=new Set,Ve=!1,ql=0,zt=null,jt=!1,Kn=!1,Po=0,jn=!1,Ro=null,wl=!1,Sl=new Map,H=()=>({generating:Ve,conversationId:b()}),Tl=()=>nl()||!!Gt()?.querySelector(Af);function xf(){let e=Tl();return e?Kn||(Po=0,jn=!0):Kn=!1,[...zn].some(t=>!xi.has(t))||e&&!Kn||Date.now()<Po}function Ef(){return Ro?.error?"error":jt?"stopped":"done"}function qf(){zt=null,Ve=!1,jn=!1,S.emit("fall",{conversationId:b(),outcome:Ef()}),jt=!1,Ro=null}function Cl(){let e=xf();e&&!Ve&&(Ve=!0,ql=Date.now(),jt=!1,Ro=null,S.emit("rise",{conversationId:b()})),e||!Ve?zt=null:zt==null?zt=Date.now():Date.now()-zt>=bf&&qf()}function Qn(){Cl(),S.emit("tick",H())}function Tf({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(Ve||Date.now()-ql<yf);if(!o&&Ve){for(let n of zn)xi.add(n);Kn=Tl(),Po=0,jn=!1,zt=null,Ve=!1,jt=!1,Ro=null,S.emit("fall",{conversationId:e,outcome:"left"})}S.emit("context",{prevId:e,id:t,migrated:o}),Qn()}function xl(){let e=b();for(let t of document.querySelectorAll(u.sidebarConversationRow)){let o=t.getAttribute(wf)?.match(Sf)?.[1];if(!o)continue;let n=t.querySelector(u.sidebarIndicator)?.getAttribute(El)??"",r=Sl.get(o);r!==n&&(Sl.set(o,n),r==="working"&&n==="unread"&&o!==e&&S.emit("background",{conversationId:o}))}}function Cf(e){e.target instanceof Element&&e.target.closest(u.stopButton)&&(jt=!0,Po=0)}function Ml(){wl||(wl=!0,V.on("generate-start",({requestId:e})=>{zn.add(e),Qn()}),V.on("generate-end",e=>{zn.delete(e.requestId),!xi.delete(e.requestId)&&(Ro=e,Po=e.handoff&&!e.error&&!jt&&!jn?Date.now()+vf:0,Qn())}),ge(Tf),document.addEventListener("click",Cf,!0),Tn(Qn,hf),Dn().then(()=>{M(Cl),M(xl),new MutationObserver(xl).observe(document.body,{subtree:!0,attributes:!0,attributeFilter:[El]})}))}var x=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,Mf="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",kf={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${Mf}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:x('<path d="M18 6 6 18M6 6l12 12"/>'),gear:x('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:x('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:x('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:x('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:x('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:x('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:x('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:x('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:x('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:x('<path d="m6 9 6 6 6-6"/>'),play:x('<path d="M7 4v16l13-8z"/>'),plus:x('<path d="M12 5v14M5 12h14"/>'),check:x('<path d="m5 12 5 5 9-10"/>'),alert:x('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:x('<path d="M4 5h16v11H9l-5 4z"/>'),layout:x('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:x('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:x('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:x('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:x('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:x('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:x('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:x('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:x('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:x('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:x('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:x('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:x('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:x('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:x('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:x('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),folder:x('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),ghost:x('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},T=e=>Is(kf[e]);function Ei(e){if(typeof e.showPopover=="function"){e.setAttribute("popover","manual");try{e.showPopover()}catch{e.matches(":popover-open")||e.removeAttribute("popover")}}}function he(e,t=document.body){t.append(e),Ei(e)}var kl=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

.bloom-notice-stack {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    z-index: var(--bloom-z-overlay);
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
`;var If=6e3,Bf=4,Of={info:"info",success:"check",warning:"alert",error:"alert"},Me=C("bloom-notice-"),Wt=new Map,Do;function Pf(){return!document.body||!Se(document.body)?null:(Pt("notices",kl),Do?.isConnected||(Do=s("div",{class:`${Me("stack")} bloom-root`,attrs:{"data-bloom":"notices",role:"region","aria-label":"Bloom++ notices","aria-live":"polite"}}),he(Do)),Do)}function Ll(e){clearTimeout(e.timer),!(e.remaining<=0)&&(e.startedAt=Date.now(),e.timer=setTimeout(()=>Je(e.key),e.remaining))}function Rf(e){e.timer!==void 0&&(clearTimeout(e.timer),e.timer=void 0,e.remaining=Math.max(1,e.remaining-(Date.now()-e.startedAt)))}function Df(e,t){let o=t.type??"info",n=s("button",{class:Me("close"),attrs:{type:"button","aria-label":"Dismiss","data-bloom":"control"},on:{click:a=>{a.stopPropagation(),Je(e)}}},T("close")),r=t.action&&s("button",{class:Me("action"),text:t.action.label,attrs:{type:"button","data-bloom":"control"},on:{click:a=>{a.stopPropagation(),t.action?.onClick(),Je(e)}}}),i=s("div",{class:`${Me("card")} ${Me(o)}`,attrs:{role:o==="error"?"alert":"status","data-bloom-notice":e}},s("span",{class:Me("icon")},T(Of[o])),s("div",{class:Me("body")},s("div",{class:Me("title"),text:t.title}),t.message&&s("div",{class:Me("message"),text:t.message})),r,n);return t.onClick&&(i.classList.add(Me("clickable")),i.addEventListener("click",()=>{t.onClick?.(),Je(e)})),i}function Wn(e){let t=e.key??lt("notice"),o=Pf();if(!o)return t;let n=Df(t,e),r=Wt.get(t),i={key:t,el:n,options:e,remaining:e.duration??If,startedAt:Date.now()};n.addEventListener("pointerenter",()=>Rf(i)),n.addEventListener("pointerleave",()=>Ll(i)),r?(clearTimeout(r.timer),r.el.replaceWith(n)):o.append(n),Wt.set(t,i),Ll(i);for(let[a]of[...Wt].slice(0,Math.max(0,Wt.size-Bf)))Je(a);return t}function Je(e){let t=Wt.get(e);t&&(Wt.delete(e),clearTimeout(t.timer),t.el.remove(),t.options.onClose?.())}var Hf=new E("Landmarks"),Nf=2e3,Uf=1e4,Ff=1024,Il={thread:{applies:()=>!!b(),selectors:[u.turn]},composer:{applies:()=>Ft()||Fn()||!!b(),selectors:[u.composerInput]},sidebar:{applies:()=>innerWidth>=Ff,selectors:[u.sidebarScroll,u.rail,u.oldSidebar,u.oldRail]}},Gf={BetterNavigator:["thread"],BetterQuotes:["thread"],MessageTimestamps:["thread"],StarChats:["thread"],UserQuotes:["thread"],ComposerOpacity:["composer"],Continue:["composer"],InputHistory:["composer"],PromptQueue:["composer"],ChatListStatus:["sidebar"],CustomSidebarIdentity:["sidebar"],NoSidebarIdentity:["sidebar"],SidebarIdentityOpacity:["sidebar"]},Vt=new Map,Vn=new Set;function Yf(){let e=Date.now();for(let[t,{applies:o,selectors:n}]of Object.entries(Il)){if(!o()){Vt.delete(t);continue}if(n.some(i=>document.querySelector(i))){Vt.delete(t),Vn.delete(t);continue}let r=Vt.get(t)??e;Vt.set(t,r),e-r>=Uf&&Vn.add(t)}}function Kf(){let e=[];for(let[o,n]of Object.entries(Gf)){let r=Z.get(o),i=r&&je(r)?n.filter(a=>Vn.has(a)):[];zs(o,i.length?i.flatMap(a=>Il[a].selectors):null),i.length&&e.push(o)}if(!e.length)return;let t=`2.0.112|${e.join(",")}`;ne("Settings","landmarkNotice")!==t&&(se("Settings","landmarkNotice",t),Hf.warn(`Page anchors missing for ${e.join(", ")}`),Wn({key:"landmarks",type:"warning",title:"Bloom++ can't find parts of this page",message:`${e.join(", ")} may not work until Bloom++ is updated. Details are in Bloom++ settings.`,duration:0}))}function Qf(){if(document.hidden){Vt.clear();return}Yf(),Kf()}function Bl(){return Vt.clear(),Vn.clear(),Tn(Qf,Nf)}var Ol={BetterNavigator:1793462309e3,BetterQuotes:1793365944e3,ChatListStatus:1793351872e3,ChatStateFavicons:179069068e4,Cleaner:1793267811e3,CompleteToast:1793354069e3,ComposerOpacity:1793344667e3,Continue:1790939902e3,CustomSidebarIdentity:179069068e4,GreetingCustomizer:1793350808e3,InputHistory:1793365944e3,MessageTimestamps:1791080494e3,NoDictation:1793335268e3,NoShareLink:179069068e4,NoSidebarIdentity:179069068e4,PromptQueue:1793365944e3,RecentTopics:1793365944e3,ResponseNotification:1793354069e3,Settings:1793448244e3,SidebarIdentityOpacity:179069068e4,StarChats:1793365944e3,StreamerMode:1793344667e3,TemporaryChat:1792014624e3,UserQuotes:1793345744e3,WiderChat:179333264e4};var ue="data-bloom-tip",qi=6,Ti=8,gt,Pl=null;function Jt(e){if(e===Pl)return;if(Pl=e,!e){gt?.remove();return}gt??=s("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),gt.textContent=e.getAttribute(ue),he(gt);let t=e.getBoundingClientRect(),{width:o,height:n}=gt.getBoundingClientRect(),r=t.bottom+qi+n<=innerHeight-Ti;gt.style.left=`${pe(t.left+t.width/2-o/2,Ti,innerWidth-o-Ti)}px`,gt.style.top=`${r?t.bottom+qi:t.top-qi-n}px`}var Rl=e=>e instanceof Element?e.closest(`[${ue}]`):null;function Dl(){let e=new AbortController,t={passive:!0,signal:e.signal};return document.addEventListener("pointerover",o=>Jt(Rl(o.target)),t),document.addEventListener("pointerout",o=>o.relatedTarget||Jt(null),t),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&Jt(Rl(o.target)),t),document.addEventListener("focusout",()=>Jt(null),t),document.addEventListener("pointerdown",()=>Jt(null),t),()=>{e.abort(),Jt(null)}}function Ze(e,t,o,n=!1){let r=s("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let a=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(a)),t(a)===!1&&r.setAttribute("aria-checked",String(!a))}),r}function N(e,t,o){return s("button",{class:Sn("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button","data-bloom":"control"},on:{click:t}})}function U(e,t,o,n){let r=s("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":t,"data-bloom":"control",[ue]:t},on:{click:o}},T(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function Jn(e,t,o,n,r,i){let a=s("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});a.value=String(e);let c=s("output",{text:`${a.value}${r}`});return a.addEventListener("input",()=>{c.textContent=`${a.value}${r}`,i(Number(a.value))}),s("div",{class:"bloom-slider"},a,c)}function Ci(e,t,o){let n=s("select",{class:"bloom-select"},...t.map(r=>s("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function Ho(e,t,o="",n="text"){let r=s("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var zf=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,Hl=/\S+@\S+\.\S+/,jf=3,Wf=/^\/g\/(g-p-[^/]+)\//,Vf=/^g-p-[0-9a-f]+-?/i,Nl=e=>!!e.closest(".sr-only"),Mi=e=>!!e?.querySelector(u.menuButton);function Ul(){return[...document.querySelectorAll(u.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(Mi)).filter(e=>e!=null)}function Fl(){let e=[...document.querySelectorAll(u.oldProfile)];if(e.length)return e.map(o=>{let n=o.parentElement?.children.length===1?o.parentElement:o;return{kind:"profile",anchor:n,insert:r=>n.before(r)}});let t=Ul().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(u.rail)){let n=[...o.children].find(Mi);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}var ki=e=>!e.closest("[data-bloom]")&&(!!e.querySelector("img, [class*=rounded-full]")||Ql(e).some(t=>!Nl(t))),Gl=e=>[...e.parentElement?.children??[]].find(t=>t!==e&&t instanceof HTMLElement&&ki(t))??null;function Yl(){let e=[...document.querySelectorAll(u.oldProfile)];return e.length?e:[...Ul(),...[...document.querySelectorAll(u.rail)].map(o=>[...o.children].findLast(Mi))].map(o=>[...o?.querySelectorAll(u.menuButton)??[]].findLast(n=>ki(n)||Gl(n))).filter(o=>o!=null)}var Kl=()=>Yl().map(e=>ki(e)?e:Gl(e)).filter(e=>e!=null);function Ql(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!y(t.textContent??"")&&!(t instanceof SVGElement))}var Jf=e=>{if(/rounded-full/.test(e.getAttribute("class")??""))return!0;if(!e.clientWidth)return!1;let{borderRadius:t}=getComputedStyle(e);return t.includes("%")||Number.parseFloat(t)>=e.clientWidth/2};function Zn(e,t,o){for(let n of e.querySelectorAll(`[${t}]`))n!==o&&n.removeAttribute(t);o&&!o.hasAttribute(t)&&o.setAttribute(t,"")}function Zf(e,t){if(y(e.textContent??"").length>jf)return null;let o=e.closest("button");for(let n=e;n&&n!==t&&n!==o;n=n.parentElement)if(Jf(n))return n;return null}function Li(e,t){e.hasAttribute(`data-bloom-${t}`)||e.setAttribute(`data-bloom-${t}`,"");let o=e.querySelector("img:not([data-bloom] img)"),n=Ql(e),r=o?null:n.map(m=>Zf(m,e)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),a=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");Zn(e,`data-bloom-${t}-avatar`,a);let c=n.filter(m=>!a?.contains(m)&&!Nl(m)),l=c.find(m=>zf.test(y(m.textContent??""))),d=c.find(m=>Hl.test(m.textContent??""));Zn(e,`data-bloom-${t}-plan`,l),Zn(e,`data-bloom-${t}-email`,d),Zn(e,`data-bloom-${t}-name`,c.find(m=>m!==l&&m!==d))}function $f(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function $n(){return Yl().map($f).find(e=>e!=null)??[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&(Hl.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var ht=e=>[...document.querySelectorAll(u.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&yi(t.href)===e);function zl(e){let t=ht(e).find(o=>y(o.textContent??""));return t?y(t.textContent??""):null}function jl(e){let t=new URL(e,location.origin).pathname.match(Wf)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!yi(n.href)&&y(n.textContent??""));return o?y(o.textContent??""):t.replace(Vf,"").replaceAll("-"," ")||null}var Ii=0,Xn;function Xf(e){if(!Y(e))return;for(let o of Kl())Li(o,"profile");let t=$n();t&&Li(t,"menu")}function ke(){Ii++;let e=!0;return pt().then(()=>{e&&Ii&&!Xn&&(Xn=M(Xf))}),()=>{e&&(e=!1,!--Ii&&(Xn?.(),Xn=void 0))}}var _n=["showSidebarEntry","showSidebarEntryOnHover","showAccountMenuEntry"],Wl=1,Zt={showSidebarEntry:!0,showSidebarEntryOnHover:!1,showAccountMenuEntry:!1},Bi=e=>Object.hasOwn(Zt,e),Oi=e=>ne("Settings",e)??Zt[e],Vl=(e,t)=>!Bi(e)||t!==!1||_n.some(o=>o!==e&&Oi(o));function Jl(){if(ne("Settings","entryRevision")!==Wl){for(let e of _n)se("Settings",e);se("Settings","entryRevision",Wl)}}var _f=new E("Themes"),ep=/^https:\/\/\S+\.css(?:[?#]|$)/i,tp=/\/\*\*[^]*?@name[ \t]+([^\n*]+)/,K=g({themes:{type:"custom",default:[]},quickCss:{type:"custom",default:""},quickCssEnabled:{type:"custom",default:!0}});async function Zl(e){let t=new TextDecoder().decode(await wn(e));if(!t.trim())throw new Error("Theme file is empty.");return t}var er=(e,t)=>{K.store.themes=K.store.themes.map(o=>o.id===e?{...o,...t}:o)},$l=e=>{K.store.themes=K.store.themes.filter(t=>t.id!==e)};async function Xl(e){if(!ep.test(e))throw new Error("Enter an https URL that ends in .css.");if(K.store.themes.some(n=>n.url===e))throw new Error("This theme is already added.");let t=await Zl(e),o=t.match(tp)?.[1]?.trim()||decodeURIComponent(new URL(e).pathname.split("/").pop()??e).replace(/\.css$/i,"").replaceAll(/[-_]/g," ");K.store.themes=[...K.store.themes,{id:lt("theme"),name:o,url:e,css:t,enabled:!0}]}function _l(e,t,o){if(!t.trim())throw new Error("Name is required.");if(!o.trim())throw new Error("CSS is required.");e?er(e,{name:t.trim(),css:o}):K.store.themes=[...K.store.themes,{id:lt("theme"),name:t.trim(),css:o,enabled:!0}]}async function op(){await Promise.all(K.store.themes.filter(e=>e.url&&e.enabled).map(async({id:e,url:t,name:o})=>{try{let n=await Zl(t??"");K.store.themes.find(r=>r.id===e)?.css!==n&&er(e,{css:n})}catch(n){_f.warn(`Failed to refresh theme "${o}"`,n)}}))}var ec=f({name:"Themes",description:"Applies Bloom++ themes and Quick CSS.",authors:["Bloom contributors"],tags:[],icon:"spark",required:!0,hidden:!0,startAt:"Init",settings:K,styles:()=>[...K.store.themes.filter(e=>e.enabled).map(e=>e.css),K.store.quickCssEnabled?K.store.quickCss:""].join(`
`),start(){op()}});var Q=C("bloom-settings-"),np=3e3,tc=(e,t)=>{let o=s("textarea",{class:`bloom-input ${Q("css")}`,attrs:{spellcheck:"false",placeholder:"Paste your CSS here...","aria-label":t}});return o.value=e,o},Pi=(e,t)=>s("div",{class:Q("section-header")},s("div",{class:Q("field-label"),text:e}),s("div",{class:Q("field-desc"),text:t}));function oc(){let{quickCss:e,quickCssEnabled:t}=K.store,o=tc(e,"Quick CSS");return o.disabled=!t,o.addEventListener("input",()=>{K.store.quickCss=o.value}),s("div",{class:Q("section")},s("div",{class:Q("field","field-inline")},Pi("Quick CSS","Your own CSS, applied on every page as you type."),Ze(t,n=>{K.store.quickCssEnabled=n,o.disabled=!n},"Enable Quick CSS")),o)}function nc(){let e=s("div",{class:Q("section")}),t=null,o=()=>s("div",{class:Q("section-error"),attrs:{role:"alert"}});function n(){let l=s("input",{class:"bloom-input",attrs:{type:"url",placeholder:"https://raw.githubusercontent.com/...","aria-label":"Theme URL"}}),d=o(),m=N("Add",async()=>{m.disabled=!0,d.textContent="";try{await Xl(l.value.trim()),c()}catch(h){d.textContent=h instanceof Error?h.message:String(h),m.disabled=!1}});return s("div",{class:Q("section-block")},Pi("Online themes","Load a theme from a .css URL. It is fetched again on every page load, so updates apply."),s("div",{class:Q("section-row")},l,m),d)}function r(){let l=t==="new"?null:t,d=s("input",{class:"bloom-input",attrs:{placeholder:"My theme","aria-label":"Theme name"}});d.value=l?.name??"";let m=tc(l?.css??"","Theme CSS"),h=o();return s("div",{class:Q("section-block")},d,m,h,s("div",{class:Q("section-row")},N("Save",()=>{try{_l(l?.id??null,d.value,m.value),t=null,c()}catch(P){h.textContent=P instanceof Error?P.message:String(P)}}),N("Cancel",()=>{t=null,c()})))}function i(){return s("div",{class:Q("section-block")},s("div",{class:Q("field","field-inline")},Pi("Local themes","CSS stored only on this device."),!t&&N("New local theme",()=>{t="new",c()})),t&&r())}function a(l){let d,m=U("trash","Remove",()=>{if(d){clearTimeout(d),$l(l.id),c();return}m.setAttribute("aria-pressed","true"),m.setAttribute(ue,"Click again to remove"),d=setTimeout(()=>{d=void 0,m.removeAttribute("aria-pressed"),m.setAttribute(ue,"Remove")},np)});return s("div",{class:Q("theme")},s("div",{class:Q("theme-text")},s("div",{class:`${Q("card-name")} bloom-truncate`,text:l.name}),s("div",{class:`${Q("field-desc")} bloom-truncate`,text:l.url??"Local"})),l.url?U("copy","Copy URL",()=>void An(l.url??"")):U("edit","Edit",()=>{t=l,c()}),m,Ze(l.enabled,h=>er(l.id,{enabled:h}),`Enable ${l.name}`))}function c(){let{themes:l}=K.store;e.replaceChildren(n(),i(),l.length?s("div",{class:Q("themes")},...l.map(a)):s("div",{class:Q("empty"),text:"No themes yet."}))}return c(),e}var rp=new E("SettingsPanel"),p=C("bloom-settings-"),ip=10080*60*1e3,ap=3e3,rc="Toggle features. Some need a reload. Click the sliders icon to configure.",sp="Can't find its place on this page. It may need an update.",lp=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],cp=[{id:"plugins",label:"Plugins"},{id:"themes",label:"Themes"},{id:"css",label:"Quick CSS"}],up=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],dp={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},ac=new Set(["chat","ui","privacy"]),z=null,No="plugins",yt="all",Ri="all",tr="",Di=[],sc=()=>[...Z.values()].filter(e=>!e.hidden),mp=e=>!!e.updatedAt&&Date.now()-e.updatedAt<ip;function fp(e){switch(yt){case"favorites":return kn.has(e.name);case"recent":return mp(e);case"all":return!0;case"other":return!e.tags.some(t=>ac.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(yt)}}function pp(e){switch(Ri){case"all":return!0;case"enabled":return je(e);case"disabled":return!je(e)}}function gp(e){let t=tr.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function hp(e){let t=Mn.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return yt==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var lc=e=>e.settings?.def??{},Ui=e=>Object.values(lc(e)).some(t=>t.type!=="custom");function bp(e,t,o){let n=ne(e.name,t)??si(o),r=i=>{if(e.name==="Settings"&&!Vl(t,i))return!1;se(e.name,t,i)};switch(o.type){case"boolean":return Ze(n,r,o.description??t);case"slider":return Jn(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return Ci(n,o.options,r);case"string":return Ho(n,r,o.placeholder);case"number":return Ho(String(n),i=>r(Number(i)),"","number");case"component":{let i=s("div",{class:p("component")});return Di.push(o.render(i)),i}case"custom":return null}}var yp=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function Fi(e){if(!z)return;let t=Object.entries(lc(e)).filter(([,i])=>i.type!=="custom").map(([i,a])=>{let c=bp(e,i,a),l=a.type==="boolean",d=a.type!=="component"&&s("div",{class:p("field-label"),text:yp(i)}),m=a.description&&s("div",{class:p("field-desc"),text:a.description});return s("div",{class:p("field",l?"field-inline":"field-stacked")},(d||m)&&s("div",{class:p("field-text")},d,m),c)}),o,n=N("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},ap);return}clearTimeout(o),e.settings?.reset(),$t(),Fi(e)},"danger"),r=s("div",{class:p("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&$t()}},s("div",{class:p("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},s("div",{class:p("popup-header")},s("div",{class:p("card-icon")},T(e.icon)),s("div",{class:p("popup-title")},s("div",{class:p("card-name"),text:e.name}),s("div",{class:p("popup-authors"),text:e.authors.join(", ")})),U("close","Close",$t)),s("p",{class:p("popup-desc"),text:e.description}),s("div",{class:p("fields")},...t),s("div",{class:p("popup-footer")},n)));z.querySelector(`.${p("modal")}`)?.append(r)}function $t(){for(let e of Di)e();Di=[],z?.querySelector(`.${p("popup-backdrop")}`)?.remove()}function ic(e){let t=je(e),o=kn.has(e.name),n=Mn.has(e.name),r=!!e.required,i=Ks(e.name);return s("div",{class:[p("card",t?"card-on":"card-off"),r?p("card-required"):""].filter(Boolean).join(" ")},s("div",{class:p("card-top")},s("div",{class:p("card-icon")},T(e.icon)),s("div",{class:p("card-actions")},U("star",o?"Unstar":"Star",()=>{kn.toggle(e.name),bt()},o),r?null:U("pin",n?"Unpin":"Pin to top",()=>{Mn.toggle(e.name),bt()},n),r?s("span",{class:p("required-mark"),attrs:{"aria-label":"Required",[ue]:"This plugin is required for Bloom++ to work"}},T("alert")):null,Ui(e)&&U("gear","Settings",()=>Fi(e)),Ze(t,a=>Js(e,a),r?`${e.name} is required`:`Enable ${e.name}`,r))),s("div",{class:p("card-name")},e.name,Ys(e.name)&&s("span",{class:p("new-badge"),text:"New"})),s("div",{class:p("card-desc"),text:e.description,title:e.description}),i&&s("div",{class:p("card-issue"),attrs:{[ue]:`Missing: ${i.join(", ")}`}},T("alert"),s("span",{text:sp})),s("div",{class:p("card-footer"),text:e.authors.join(", ")}))}function cc(){let e=sc().some(o=>!o.tags.some(n=>ac.has(n)));z?.querySelector(`.${p("tabs")}`)?.replaceChildren(...lp.filter(o=>o.id!=="other"||e).map(o=>s("button",{class:p("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===yt)},on:{click:()=>{yt=o.id,cc(),bt()}}})))}function bt(){if(!z)return;let e=sc().filter(fp),t=z.querySelector(`.${p("search")} input`);t&&(t.placeholder=`Search ${vn(e.length,"plugin")}...`);let o=hp(e.filter(d=>gp(d)&&pp(d))),n=yt==="all",r=n?o.filter(d=>!d.required):o,i=n?o.filter(d=>d.required):[],a=[...r.map(ic),...i.length?[s("div",{class:p("required-break"),attrs:{role:"separator"}}),...i.map(ic)]:[]],c=tr.trim()?"No plugins match your search.":dp[yt]??"No plugins available.";z.querySelector(`.${p("grid")}`)?.replaceChildren(...a.length?a:[s("div",{class:p("empty"),text:c})])}function vp(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),z?.querySelector(`.${p("popup-backdrop")}`)?$t():Xt())}var uc,Hi;function Ni(){let e=z?.querySelector(`.${p("body")}`);if(!z||!e)return;for(let o of z.querySelectorAll(`.${p("nav-item")}`))o.setAttribute("aria-selected",String(o.getAttribute("data-section")===No));if($t(),No==="themes"){e.replaceChildren(nc());return}if(No==="css"){e.replaceChildren(oc());return}let t=s("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});t.value=tr,t.addEventListener("input",()=>{tr=t.value,bt()}),e.replaceChildren(s("div",{class:p("tabs"),attrs:{role:"tablist"}}),s("div",{class:p("toolbar")},s("label",{class:p("search")},T("search"),t),Ci(Ri,up,o=>{Ri=o,bt()})),s("div",{class:p("grid")})),cc(),bt(),t.focus()}function _t(e,t){e&&(No=e),z?(Ni(),Ei(z)):Ap();let o=t&&Z.get(t);o&&Fi(o)}function Ap(){z=s("div",{class:`bloom-root ${p("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:e=>e.target===e.currentTarget&&Xt()}},s("div",{class:p("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},s("div",{class:p("header")},s("div",{class:p("logo")},T("bloom")),s("h2",{class:p("title"),text:"Bloom++"}),s("span",{class:p("hint"),attrs:{"aria-label":rc,tabindex:"0",[ue]:rc}},T("info")),s("div",{class:p("nav"),attrs:{role:"tablist"}},...cp.map(e=>s("button",{class:p("nav-item"),text:e.label,attrs:{type:"button",role:"tab","data-section":e.id},on:{click:()=>{No=e.id,Ni()}}}))),s("span",{class:p("version"),text:"v2.0.112"}),U("close","Close",Xt)),s("div",{class:p("body")}))),z.addEventListener("keydown",e=>e.stopPropagation()),Hi=new AbortController,document.addEventListener("keydown",vp,{capture:!0,signal:Hi.signal}),he(z),Ni(),uc=Xs(bt),rp.debug("Opened")}function Xt(){$t(),Hi?.abort(),uc?.(),z?.remove(),z=null}var or=()=>z?Xt():_t();var dc=`/*
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
    z-index: var(--bloom-z-chrome);
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

.bloom-entry-menu-chevron {
    display: flex;
    margin-inline-start: auto;
    color: var(--bloom-fg-3);
    transform: rotate(-90deg);
}

.bloom-entry-flyout {
    position: fixed;
    z-index: var(--bloom-z-overlay);
    display: flex;
    flex-direction: column;
    width: max-content;
    min-width: 11rem;
    max-width: 16rem;
    max-height: calc(100vh - 1rem);
    padding: 0.25rem;
    overflow-y: auto;
    border: 1px solid var(--bloom-border-light);
    border-radius: 1rem;
    background: var(--bloom-surface);
    box-shadow: var(--bloom-shadow);
    pointer-events: auto;
    contain: content;
    animation: bloom-fade-in 0.1s ease-out;
}

.bloom-entry-flyout-item {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    min-height: 2.25rem;
    padding: 0 0.625rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    cursor: pointer;
}

.bloom-entry-flyout-item:hover {
    background-color: var(--bloom-hover);
}

.bloom-entry-flyout-item svg {
    flex: none;
    width: 1.125rem;
    height: 1.125rem;
}

.bloom-entry-flyout-break {
    margin: 0.25rem 0.5rem;
    border-top: 1px solid var(--bloom-border-light);
}

.bloom-entry-menu-pick {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 0.25rem 0;
}

.bloom-entry-menu-pick svg {
    flex: none;
    width: 1.125rem;
    height: 1.125rem;
    color: var(--bloom-fg-2);
}

.bloom-entry-menu-pick > span {
    flex: 1;
    min-width: 0;
}

.bloom-root.bloom-settings-backdrop {
    position: fixed;
    inset: 0;
    z-index: var(--bloom-z-overlay);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: #0006;
    pointer-events: auto;
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
    padding: 1.25rem 1.25rem 0;
    border-radius: 1.25rem;
    background: var(--bloom-surface);
    box-shadow: var(--bloom-shadow);
    overflow: hidden;
}

.bloom-settings-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
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

.bloom-settings-logo,
.bloom-settings-title,
.bloom-settings-hint,
.bloom-settings-version,
.bloom-settings-header > .bloom-icon-button {
    flex-shrink: 0;
}

.bloom-settings-version {
    margin-inline-start: auto;
    color: var(--bloom-fg-3);
    font-size: 0.75rem;
}

.bloom-settings-tabs {
    display: flex;
    gap: 1rem;
    margin-inline-end: -1.25rem;
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
    margin-inline-end: -1.25rem;
    overflow: hidden;
    scrollbar-gutter: stable;
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
    margin-inline-end: -1.25rem;
    padding-block-end: 1.25rem;
    overflow: hidden auto;
    scrollbar-gutter: auto;
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
    scrollbar-gutter: auto;
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

.bloom-settings-nav {
    display: flex;
    gap: 0.25rem;
    min-width: 0;
    margin-inline-start: 2rem;
    padding: 0.1875rem;
    overflow-x: auto;
    border-radius: 0.75rem;
    background: var(--bloom-surface-2);
}

.bloom-settings-nav-item {
    padding: 0.3125rem 0.875rem;
    border-radius: 0.5625rem;
    color: var(--bloom-fg-2);
    font-weight: 500;
    white-space: nowrap;
}

.bloom-settings-nav-item:hover {
    color: var(--bloom-fg);
}

.bloom-settings-nav-item[aria-selected="true"] {
    background: var(--bloom-surface);
    box-shadow: 0 1px 2px #0000001f;
    color: var(--bloom-fg);
}

.bloom-settings-body {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 0.375rem;
    min-height: 0;
}

.bloom-settings-section {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 0.75rem;
    min-height: 0;
    margin-inline-end: -1.25rem;
    overflow: hidden auto;
    scrollbar-gutter: auto;
}

.bloom-settings-section-block {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.bloom-settings-section-header {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
}

.bloom-settings-section-row {
    display: flex;
    gap: 0.5rem;
}

.bloom-settings-section-error:empty {
    display: none;
}

.bloom-settings-section-error {
    color: var(--bloom-danger);
    font-size: 0.8125rem;
}

.bloom-settings-css {
    flex: 1;
    min-height: 14rem;
    scrollbar-gutter: auto;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.8125rem;
    line-height: 1.5;
    resize: vertical;
    tab-size: 4;
}

.bloom-settings-css:disabled {
    opacity: 0.6;
}

.bloom-settings-themes {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.bloom-settings-theme {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 0.75rem;
    border: 1px solid var(--bloom-border-light);
    border-radius: 0.75rem;
    background: var(--bloom-card);
}

.bloom-settings-theme-text {
    flex: 1;
    min-width: 0;
}
`;var de=C("bloom-entry-"),Sp=4,Yi="--bloom-entry-x",Ki=1,mc=4,fc=8,xp=150,be=g({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar.",default:Zt.showSidebarEntry},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:Zt.showSidebarEntryOnHover},showAccountMenuEntry:{type:"boolean",description:"Show Bloom++ at the top of the account menu.",default:Zt.showAccountMenuEntry},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:e=>(e.append(N("Reset position",()=>{be.store.entryPosition=Ki})),()=>e.replaceChildren())},showBloomMenu:{type:"boolean",description:"Hovering the Bloom++ row in the account menu opens a menu with Plugins, Themes, Quick CSS and plugin settings.",default:!0},menuPlugins:{type:"component",description:"Plugins listed in that menu.",render:e=>(e.append(...hc().map(t=>s("div",{class:de("menu-pick")},T(t.icon),s("span",{class:"bloom-truncate",text:t.name}),Ze(bc(t),o=>{be.store.menuPicks={...be.store.menuPicks,[t.name]:o}},`List ${t.name} in the menu`)))),()=>e.replaceChildren())},entryPosition:{type:"custom",default:Ki},menuPicks:{type:"custom",default:{}}}),vt=new Map,$e=null,Uo,hc=()=>[...Z.values()].filter(e=>!e.hidden).toSorted((e,t)=>e.name.localeCompare(t.name)),bc=e=>be.store.menuPicks[e.name]??Ui(e),pc=!1,Gi=[];function Ep(e,t,o){let n=e.currentTarget,r=t.clientWidth-n.offsetWidth;if(e.button!==0||r<=0||!t.classList.contains(de("hover")))return;let i=be.store.entryPosition,a=i,c=!1,l=new AbortController;n.setPointerCapture(e.pointerId),n.addEventListener("pointermove",m=>{!c&&Math.abs(m.clientX-e.clientX)<Sp||(c=!0,o(),a=pe(i+(m.clientX-e.clientX)/r,0,Ki),t.style.setProperty(Yi,String(a)))},{signal:l.signal});let d=()=>{l.abort(),c&&(be.store.entryPosition=a,t.style.removeProperty(Yi))};n.addEventListener("pointerup",d,{signal:l.signal}),n.addEventListener("lostpointercapture",d,{signal:l.signal})}function qp(e){let t=!1,o=s("button",{class:de("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),t||or(),t=!1},pointerdown:r=>{t=!1,e!=="rail"&&Ep(r,n,()=>{t=!0})}}},T("bloom"),e!=="rail"&&s("span",{class:de("label"),text:"Bloom++"})),n=s("div",{class:`bloom-root ${de("wrap")} ${de(e)}`,attrs:{"data-bloom":"entry"}},o);return n}function Fo(){clearTimeout(Uo),$e?.remove(),$e=null}function yc(){clearTimeout(Uo),Uo=setTimeout(Fo,xp)}var vc=e=>e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0}));function Tp(e,t){if(clearTimeout(Uo),$e?.isConnected||!be.store.showBloomMenu)return;let o=(l,d,m)=>s("div",{class:de("flyout-item"),attrs:{role:"menuitem"},on:{pointerdown:h=>{h.button===0&&(h.preventDefault(),h.stopPropagation(),Fo(),vc(t),m())}}},T(d),s("span",{class:"bloom-truncate",text:l})),n=hc().filter(bc);$e=s("div",{class:`bloom-root ${de("flyout")}`,attrs:{"data-bloom":"menu-flyout",role:"menu","aria-label":"Bloom++"},on:{pointerenter:()=>clearTimeout(Uo),pointerleave:yc}},o("Plugins","bloom",()=>_t("plugins")),o("Themes","spark",()=>_t("themes")),o("Quick CSS","edit",()=>_t("css")),n.length>0&&s("div",{class:de("flyout-break"),attrs:{role:"separator"}}),...n.map(l=>o(l.name,l.icon,()=>_t("plugins",l.name)))),he($e);let r=t.getBoundingClientRect(),{width:i,height:a}=$e.getBoundingClientRect(),c=r.right+mc;$e.style.left=`${c+i>innerWidth?r.left-i-mc:c}px`,$e.style.top=`${pe(e.getBoundingClientRect().top,fc,innerHeight-a-fc)}px`}function Cp(e){let t=s("div",{class:`bloom-root ${de("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),Fo(),vc(e),or()},pointerenter:()=>Tp(t,e),pointerleave:yc}},T("bloom"),s("span",{text:"Bloom++"}),be.store.showBloomMenu&&s("span",{class:de("menu-chevron")},T("chevron"))),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function gc(){Fo();for(let e of document.querySelectorAll('[data-bloom="entry"], [data-bloom="menu-entry"]'))e.remove();vt.clear()}function Mp(){for(let e of document.querySelectorAll('[data-bloom="menu-entry"]'))e.remove()}function Ac(){let{showSidebarEntry:e,showSidebarEntryOnHover:t,showAccountMenuEntry:o}=be.store,n=e||t?Fl():[],r=new Set(n.map(a=>a.anchor));for(let[a,c]of vt)a.isConnected&&r.has(a)||(c.remove(),vt.delete(a));for(let a of document.querySelectorAll('[data-bloom="entry"]'))[...vt.values()].includes(a)||a.remove();for(let a of n){let c=vt.get(a.anchor);if(c?.isConnected||!Se(a.anchor))continue;let l=c??qp(a.kind);vt.set(a.anchor,l),a.insert(l)}for(let a of vt.values())a.classList.toggle(de("hover"),!e);if(!o){Mp();return}let i=$n();i&&!i.querySelector('[data-bloom="menu-entry"]')&&Cp(i),i||Fo()}function kp(e){_n.some(Oi)||(be.store[Bi(e??"")?e:"showSidebarEntry"]=!0),Ac()}var wc=f({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:be,styles:()=>`${dc}.${de("hover")}{${Yi}:${be.store.entryPosition}}`,start(){Jl(),gc(),Gi=[M(Ac),Dl(),ke()],!pc&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",or),pc=!0)},stop(){for(let e of Gi)e();Gi=[],gc(),Xt()},onSettingsChange:kp});var Lp=80,Ip=420;function Qi(e,t,o){return(e.x-o.x)*(t.y-o.y)-(t.x-o.x)*(e.y-o.y)}function Bp(e,t,o,n){let r=Qi(e,t,o),i=Qi(e,o,n),a=Qi(e,n,t);return!((r<0||i<0||a<0)&&(r>0||i>0||a>0))}function Op(e,t){let o=(t.left+t.right)/2-(e.left+e.right)/2,n=(t.top+t.bottom)/2-(e.top+e.bottom)/2;if(Math.abs(o)>=Math.abs(n)){let i=o<0?t.right:t.left;return[{x:i,y:t.top},{x:i,y:t.bottom}]}let r=n<0?t.bottom:t.top;return[{x:t.left,y:r},{x:t.right,y:r}]}function Sc(e,t){let o=pe(e.x,t.left,t.right),n=pe(e.y,t.top,t.bottom);return Math.hypot(e.x-o,e.y-n)}function nr(e){let t=e.closeDelay??Lp,o=e.towardDelay??Ip,n=0,r=!1,i=null,a=null,c=()=>{document.removeEventListener("pointermove",v,!0)},l=()=>{n&&window.clearTimeout(n),n=0,c(),i=null,a=null},d=()=>{l(),r&&(r=!1,e.setHeld(!1))},m=()=>{r||(r=!0,e.setHeld(!0))},h=q=>{n&&window.clearTimeout(n),n=window.setTimeout(d,q)},P=q=>{let ee=e.panel(),st=e.trigger();if(!ee||!i)return!1;let te=ee.getBoundingClientRect();if(te.width<=0&&te.height<=0)return!1;let De=st?.getBoundingClientRect(),[fe,_r]=De&&(De.width||De.height)?Op(De,te):[{x:te.left,y:te.top},{x:te.right,y:te.bottom}];return Bp(q,i,fe,_r)?!0:a!=null&&Sc(q,te)<Sc(a,te)-.25},v=q=>{let ee={x:q.clientX,y:q.clientY};if(e.over(q.target)){l();return}P(ee)?h(o):d(),a=ee};return{enter(){l()},leave(q){if(e.over(q.relatedTarget)){l();return}i={x:q.clientX,y:q.clientY},a=i,m(),document.addEventListener("pointermove",v,!0),h(t)},dispose(){l(),r=!1}}}var xc=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

.bloom-nav-root {
    position: fixed;
    z-index: var(--bloom-z-chrome);
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
`;var k=C("bloom-nav-"),ar=80,Rp=1200,Dp=2,Ec=3e4,Hp=200,Np=.9,Up=.28,Fp=24,eo=8,Gp=80,Yp=12,zi=80,Lc=`${u.rightPanel}, ${u.summaryPanel}`,Kp={user:"\u2753",assistant:"\u{1F916}"},Qp=["wheel","touchmove","pointerdown"],ur=g({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),A=null,D=[],ye=-1,At=-1,to=null,wt="",Wi=0,Vi=[],Qo=null,rr=null,ir=new Set,He,Go,Ne,Yo="",xe=[],zo=null,sr=new Set,lr=new Map,Xe=!1,zp=e=>ur.store.showAssistant||e.role==="user",jp=e=>e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.messageIds[0]||e.role;function Wp(e){return{role:e.role,summary:Qt(e),ids:e.messageIds,turn:e,streaming:e.streaming}}function Ic(e,t){let o=e.entries.at(-1);if(o?.role==="assistant"&&t.role==="assistant"){e.entries[e.entries.length-1]={...t,ids:[...new Set([...o.ids,...t.ids])]};return}e.entries.push(t)}function Vp(){let e=[];for(let t of We()){let o=Wp(t),n=jp(t),r=e.at(-1),i=!t.el.closest("[data-turn-key]");r&&(r.key===n||i&&o.role==="assistant")?Ic(r,o):e.push({key:n,entries:[o]})}return e}function Jp(){let e=[];for(let t of we(wi()||b())?.chain??[]){let o={role:t.role,summary:Yn(t),ids:[t.id],turn:null,streaming:!1},n=e.at(-1);t.role==="assistant"&&n?Ic(n,o):e.push({key:t.id,entries:[o]})}return e}var oo=e=>e.entries.flatMap(t=>t.ids);function cr(e,t){let o=new Set(oo(e));return oo(t).some(n=>o.has(n))}var St=e=>y(e.entries.find(t=>t.role==="user")?.summary??""),ji=(e,t)=>e.filter(o=>St(o)===t).length,Ji=e=>({...e,turn:null,streaming:!1});function Zp(e,t){let o=new Set(t.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return e.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return Ji(r);let a=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return a&&a!==n.key?Ji(r):r})}))}function $p(e,t){let o=t.entries.map((n,r)=>{let i=e.entries[r];if(!i)return n;let a=[...new Set([...n.ids,...i.ids])];return{...n,ids:a,summary:n.summary||i.summary}});for(let n of e.entries.slice(o.length))o.push(Ji(n));return{key:e.key,entries:o}}function Bc(){let e=Oo();if(!e)return!1;let t=e.clientHeight-e.scrollHeight;return e.scrollTop-t<=Math.abs(e.scrollTop)}function Xp(e,t){let o=Zp(e,t).filter(l=>t.some(d=>d.key===l.key)||!t.some(d=>cr(d,l)));if(!t.length)return o;if(!o.length)return t;let n=t.findIndex(l=>o.some(d=>d.key===l.key));if(n<0)return Bc()?t.concat(o):o.concat(t);let r=t[n]?.key,i=o.findIndex(l=>l.key===r),a=o.slice(0,i).concat(t.slice(0,n),o.slice(i)),c=a.findIndex(l=>l.key===r);for(let l=n;l<t.length;l++){let d=t[l];if(!d)continue;let m=a.findIndex(h=>h.key===d.key);if(m>=0){let h=a[m];h&&(a[m]=$p(h,d)),c=m}else a.splice(c+1,0,d),c++}return a}function _p(e,t){let o=0,n=0,r=0;for(let i=1-e.length;i<t.length;i++){let a=0,c=0;for(let d=0;d<e.length;d++){let m=t[d+i],h=e[d];!m||!h||(cr(h,m)?(a+=3,c++):St(h)&&St(h)===St(m)&&a++)}let l=Bc()?i<r:i>r;(a>o||a===o&&c>n||a===o&&c===n&&l)&&(o=a,n=c,r=i)}return{score:o,offset:r}}function eg(e,t){let o=e.entries.map((n,r)=>{let i=t.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of t.entries.slice(o.length))o.push({...n,turn:null});return{key:e.key,entries:o}}function Xi(e){return e.map(t=>({key:t.key,entries:t.entries.map(o=>({...o}))}))}function tg(e,t,o=!0){if(!t.length)return e;if(!e.length)return t;let{score:n,offset:r}=_p(e,t),i=Xi(e);if(n>0)for(let l=0;l<i.length;l++){let d=t[l+r],m=i[l];if(!d||!m)continue;let h=St(m),P=!!h&&h===St(d)&&ji(e,h)===1&&ji(t,h)===1;(cr(m,d)||P)&&(i[l]=eg(m,d))}let a=[],c=[];for(let l=0;l<t.length;l++){let d=t[l];if(!d)continue;let m=St(d);!m||ji(i,m)>0||i.some(h=>cr(h,d))||o&&(n>0&&l<r?a.push(d):c.push(d))}return a.concat(i,c)}var Zi=e=>e.entries.some(t=>t.turn?.el.isConnected);function og(e,t,o){let n=e.findIndex(i=>oo(i).includes(t));if(n>=0)return n+1;let r=e.find(Zi);return o&&r&&oo(r).includes(o)?0:e.length}function ng(e){if(zo){let{parent:t,user:o}=zo;for(let n of e.slice(og(e,t,o))){let r=oo(n);if(!Zi(n)&&!(o&&r.includes(o)))for(let i of r)sr.add(i)}}return e.filter(t=>Zi(t)||!oo(t).some(o=>sr.has(o)))}function Oc(){xe=[],zo=null,sr.clear()}function qc(e){return e.reduce((t,o)=>t+o.entries.length,0)}function Tc(e,t){if(!e||!t.length)return;let o=lr.get(e);(!o||qc(t)>=qc(o))&&lr.set(e,Xi(t))}function rg(){let e=wi();if(e!==Yo){Yo&&xe.length&&Tc(Yo,xe),Yo=e;let n=e?lr.get(e):void 0;n?.length?(xe=Xi(n),zo=null,sr.clear(),Xe=!0):(Oc(),Xe=!1)}let t=Vp(),o=Jp();return!t.length&&!o.length&&!yl()?(xe=[],[]):(Xe&&e&&!pi(e)&&(Xe=!1),xe=ng(tg(Xp(xe,t),o,!Xe)),e&&xe.length&&Tc(e,xe),!Xe&&e&&xe.length&&pi(e)&&(Xe=!0),xe.flatMap(n=>n.entries).filter(zp).filter(n=>n.ids.length||n.summary||n.streaming))}function ig(e){for(let o of e)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!H().generating||e.some(o=>o.streaming))return;let t=e.at(-1);t&&(t.role==="assistant"||!ur.store.showAssistant?t.streaming=!0:e.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function Pc(){let e=rg();return ig(e),e}function Rc(e){let t=e.getBoundingClientRect(),o=$()?.getBoundingClientRect().top,n=Math.min(t.bottom,o&&o>t.top?o:t.bottom);return{top:t.top,bottom:n}}function Dc(e){return((e.matches(".whitespace-pre-wrap, .markdown, .prose, [data-markdown-text-style]")?e:e.querySelector(".whitespace-pre-wrap")??e.querySelector(".markdown, .prose, [data-markdown-text-style]"))??e).getBoundingClientRect().top}function Cc(e){let t=D[e]?.turn?.el;return t?.isConnected?t:null}function ag(e){if(!D.length)return null;let t=e.scrollHeight-e.clientHeight,o=Si(e),n=Math.min(e.scrollTop,0),r=o?-n:t-e.scrollTop,i=o?t+n:e.scrollTop,a=t<=eo||r<=eo,c=t>eo&&i<=eo,{top:l,bottom:d}=Rc(e),m=Cc(0),h=m?Dc(m):Number.NaN,P=!!m&&h>=l-eo&&h<=l+48,v=Cc(D.length-1),q=v?.getBoundingClientRect().bottom??Number.NaN,ee=!!v&&q<=d+eo&&q>=d-Gp;return a||ee?"bottom":c||P?"top":null}function sg(e){let{top:t,bottom:o}=Rc(e),n=t+Math.max(o-t,0)*Up,r=[],i=-1;if(D.forEach((c,l)=>{let d=c.turn?.el;if(!d?.isConnected){r.push(Number.NaN);return}let m=Dc(d);r.push(m),i<0&&(i=l),m<=n&&(i=l)}),i<0)return Math.max(D.findIndex(c=>c.turn),0);let a=r[ye];return Number.isFinite(a)?i===ye?ye:i>ye?i:a<=n+Fp?ye:i:i}function lg(e){let t=ag(e);return t==="bottom"?D.length-1:t==="top"?0:sg(e)}function Mc(e){ur.store.jumpEffect==="border"&&(e.classList.add(k("flash")),setTimeout(()=>e.classList.remove(k("flash")),Rp))}function dr(e){let t=D[e],o=Oo();if(!t||!o)return;if(!t.turn&&!t.ids.length){At=e,Ko(),o.scrollTo({top:Si(o)?0:o.scrollHeight});return}At=e,to=e?null:{chat:b(),first:t.ids[0],until:Date.now()+Ec},Ko();let n=t.turn?.el;if(n?.isConnected){let d=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:d<o.clientHeight*Dp?"smooth":"auto"}),Mc(n);return}let r=D.findIndex(d=>d.turn),i=r>=0&&e<r?-1:1,a=++Wi,c=Date.now()+Ec,l=()=>{let d=Oo();if(a!==Wi||Date.now()>c||!d)return;D=Pc();let m=D.find(P=>P.ids.some(v=>t.ids.includes(v)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),Mc(m),At=D.findIndex(P=>P.turn?.el===m),Ko();return}let h=d.scrollTop;d.scrollBy({top:i*d.clientHeight*Np,behavior:"instant"}),d.scrollTop===h?setTimeout(l,Hp):requestAnimationFrame(l)};l()}function cg(e,t){return s("button",{class:k("row"),attrs:{type:"button","data-index":String(t),"data-message-id":e.ids[0]??""},on:{click:()=>dr(t)}},s("span",{text:Kp[e.role]}),s("span",{class:"bloom-truncate",text:qe(e.summary||"\u2026",ar)}))}function ug(e,t){let o=e.offsetWidth?t.width/e.offsetWidth:1;return t.left+(e.clientLeft+e.clientWidth)*o}function dg(e){let t=1/0;for(let o of document.querySelectorAll(Lc)){if(!ut(o))continue;let n=o.getBoundingClientRect();n.width<zi||n.height<zi||n.left<e.left+zi||n.left<t&&(t=n.left)}return Number.isFinite(t)?t:null}function kc(e){if(!A)return;let t=e.getBoundingClientRect(),o=$()?.getBoundingClientRect().top,r=Math.min(t.bottom,o&&o>t.top?o:t.bottom)-t.top,i=Math.min(ug(e,t),dg(t)??1/0);A.style.right=`${document.documentElement.clientWidth-i+Yp}px`,A.style.top=`${t.top}px`,A.style.height=r>1?`${r}px`:""}function mg(){let e=Oo();if(D=Pc(),!D.length||!e){Ne?.dispose(),Ne=void 0,A?.remove(),A=null,wt="";return}if(Qo!==e){Go?.abort(),Go=new AbortController,e.addEventListener("scroll",Qe(Ko),{passive:!0,signal:Go.signal});for(let n of Qp)e.addEventListener(n,Nc,{passive:!0,signal:Go.signal});Qo=e,He?.disconnect(),He=new ResizeObserver(()=>{e.isConnected&&kc(e)}),He.observe(e),rr=null,ir=new Set}let t=$();if(t&&t!==rr&&He&&(He.observe(t),rr=t),He)for(let n of document.querySelectorAll(Lc))ir.has(n)||(He.observe(n),ir.add(n));hg(),kc(e);let o=JSON.stringify(D.map(n=>[n.role,n.ids]));o!==wt?(wt=o,At=-1,pg(),to&&Date.now()<to.until&&to.chat===b()&&D[0]?.ids[0]!==to.first&&dr(0)):fg(),Ko()}function Ko(){if(!A||!Qo)return;ye=At>=0?At:lg(Qo),A.querySelectorAll(`.${k("tick")}`).forEach((t,o)=>t.classList.toggle(k("tick-current"),o===ye)),A.querySelectorAll(`.${k("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===ye)));let e=A.querySelector(`.${k("toc-head")}`);e&&(e.textContent=`${ye+1} / ${D.length}`)}function fg(){A?.querySelectorAll(`.${k("tick")}`).forEach((e,t)=>{let o=D[t],n=qe(o.summary,ar);e.title!==n&&(e.title=n),e.classList.toggle(k("tick-streaming"),o.streaming)}),A?.querySelectorAll(`.${k("row")}`).forEach(e=>{let t=e.lastElementChild,o=qe(D[Number(e.dataset.index)].summary||"\u2026",ar);t&&t.textContent!==o&&(t.textContent=o)})}function pg(){A?.querySelector(`.${k("rail")}`)?.replaceChildren(...D.map((t,o)=>s("button",{class:Sn(k("tick"),k(`tick-${t.role}`),t.streaming&&k("tick-streaming"),o===ye&&k("tick-current")),title:qe(t.summary,ar),attrs:{type:"button","aria-label":`Jump to message ${o+1}`,"data-message-id":t.ids[0]??""},on:{click:()=>dr(o)}}))),A?.querySelector(`.${k("toc-list")}`)?.replaceChildren(...D.map(cg))}var Le=Qe(mg);function $i(e){if(e===A)return;let t=e.__bloomNavStop;if(t&&t!==_i)try{t()}catch{}e.isConnected&&e!==A&&e.remove()}function Hc(){let e=[...document.querySelectorAll('[data-bloom="navigator"]')];if(A&&!A.isConnected&&(A=null),A&&e.includes(A)){for(let t of e)$i(t);return}A=e[0]??null;for(let t of e.slice(1))$i(t)}function gg(){Ne?.dispose(),Ne=nr({over:e=>e instanceof Node&&!!A?.contains(e),trigger:()=>A?.querySelector(`.${k("rail")}`),panel:()=>A?.querySelector(`.${k("toc")}`),setHeld:e=>A?.classList.toggle(k("open"),e)})}function hg(){Hc(),A&&!A.querySelector(`.${k("rail")}`)&&(A.remove(),A=null,wt=""),A||(A=s("div",{class:`bloom-root ${k("root")}`,attrs:{"data-bloom":"navigator"},on:{pointerenter:()=>Ne?.enter(),pointerleave:e=>Ne?.leave(e)}},s("div",{class:k("rail")}),s("div",{class:k("bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:k("toc")},s("div",{class:k("toc-head")}),s("div",{class:k("toc-list")}))),wt=""),Ne||gg(),A.isConnected||document.body.append(A),A.querySelector(`.${k("tick")}`)||(wt=""),A.__bloomNavStop=_i}function Nc(){At=-1,to=null,Wi++}function _i(){for(let e of Vi)e();Vi=[],Go?.abort(),He?.disconnect(),He=void 0,Qo=null,rr=null,ir=new Set,removeEventListener("keydown",Uc,!0),removeEventListener("resize",Le),Ne?.dispose(),Ne=void 0,A&&delete A.__bloomNavStop,A?.remove(),A=null,wt="",Oc(),lr.clear(),Yo="",Xe=!1;for(let e of document.querySelectorAll('[data-bloom="navigator"]'))$i(e)}var bg=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function Uc(e){if(!A||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||bg(document.activeElement)||J("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:ye-1,ArrowDown:ye+1,Home:0,End:D.length-1}[e.key];if(o==null){Nc();return}o<0||o>=D.length||(e.preventDefault(),e.stopPropagation(),dr(o))}var Fc=f({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:ur,styles:xc,start(){Hc(),Vi=[M(e=>Y(e)&&Le()),ge(Le),V.on("conversation",Le),V.on("generate-start",({parentId:e,userId:t})=>{e&&(zo={parent:e,user:t},Le())}),S.on("rise",Le),S.on("fall",Le)],addEventListener("keydown",Uc,!0),addEventListener("resize",Le,{passive:!0}),Le()},stop:_i,onSettingsChange:Le});var Gc=`/*
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
    z-index: var(--bloom-z-chrome);
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
    z-index: var(--bloom-z-chrome);
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
`;var re=C("bloom-quotes-"),la="BloomBetterQuotes",vg=40,zc=8,Ag=1800,na=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,Yc=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,xt=g({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),ea,ta,no,oa=!1,ra=0,mr=null,fr=null,Ue=null;function ca(){return location.pathname.match(/\/c\/(?!local-)([\w-]+)/)?.[1]??(new URLSearchParams(location.search).get("temporary-chat")==="true"?"temporary":"draft")}function gr(){try{let e=JSON.parse(sessionStorage.getItem(la)??"[]");return Array.isArray(e)?e.filter(t=>!!t&&typeof t=="object"&&typeof t.id=="string"&&typeof t.text=="string"&&!!t.text):[]}catch{return[]}}function ua(e){try{sessionStorage.setItem(la,JSON.stringify(e.slice(-vg)))}catch{}}function jo(e){return gr().find(t=>t.id===e)?.text??""}function wg(e,t){let o=gr().filter(n=>n.id!==e);o.push({id:e,text:t}),ua(o)}function ia(e=ca()){ua(gr().filter(t=>t.id!==e)),pr()}function Sg(e){let t=jo("draft");if(!t||jo(e))return;let o=gr().filter(n=>n.id!=="draft");o.push({id:e,text:t}),ua(o)}function aa(e){return`${e.getAttribute("aria-label")??""} ${e.getAttribute("title")??""}`}function xg(e){let t=aa(e);return Yc.test(t)&&!/quote|引用/.test(t)?!1:/quote|引用/.test(t)&&na.test(t)?!0:na.test(t)&&!Yc.test(t)}function jc(e){let t=e.cloneNode(!0),o=[...t.querySelectorAll("button, [role='button']")],n=new Set(o.map(r=>r.getAttribute("aria-label")).filter(Boolean));for(let r of o)r.remove();for(let r of t.querySelectorAll("*"))!r.children.length&&n.has(y(r.textContent??""))&&r.remove();return y(t.textContent??"")}function Eg(e){let t=$(),o=e.parentElement,n=0;for(;o&&o!==t&&n<5;){if(n++,o.matches(u.composerInput)||o.querySelector(u.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=jc(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function hr(){let e=$();if(!e)return null;for(let t of e.querySelectorAll("button, [role='button']")){if(t.closest("[data-bloom]")||!xg(t))continue;let o=Eg(t),n=o?jc(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:t}}return null}function qg(e){let t=e.closest(u.searchUnit)??e.closest(u.oldMessage);return t&&(Yt(t)??t.getAttribute("data-message-author-role"))==="user"?t:null}function da(e){return y(e).slice(0,48)}function Tg(e,t){let o=da(e);if(o.length<zc)return null;let n=null;for(let r of Kt()){if(t&&(r===t||t.contains(r)||r.contains(t)))continue;let i=y(r.textContent??"");if(!i.includes(o))continue;let a=o.length/Math.max(i.length,1);(!n||a>n.score)&&(n={el:r,score:a})}return n?.el??null}function Cg(e,t){let o=da(t),n=e;for(let r of e.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&y(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${re("hit")}`)?.classList.remove(re("hit")),n.classList.add(re("hit")),window.clearTimeout(ra),ra=window.setTimeout(()=>n.classList.remove(re("hit")),Ag)}function Kc(e){let t=e.closest(u.timelineScroll)??document.scrollingElement;if(!(t instanceof HTMLElement)&&t!==document.scrollingElement)return;let o=e.getBoundingClientRect();if(o.height<1||!t)return;let n=t.getBoundingClientRect(),r=$()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,a=o.top+o.height/2-(n.top+i)/2;Math.abs(a)<8||t.scrollTo({top:t.scrollTop+a,behavior:"smooth"})}function ma(){if(!Ue||!mr?.isConnected)return;let e=mr.getBoundingClientRect();e.width<1||(Ue.style.top=`${Math.max(8,e.top+8)}px`,Ue.style.left=`${Math.max(8,e.right-Ue.offsetWidth-8)}px`)}function Mg(e,t,o){mr=e,fr=t,Ue??=s("button",{class:`bloom-root ${re("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),Ue.isConnected||document.body.append(Ue),Cg(e,o),ma()}function Qc(){Ue?.remove(),Ue=null,mr=null,fr=null,document.querySelector(`.${re("hit")}`)?.classList.remove(re("hit"))}function Wc(){return document.querySelector('[data-bloom="quote-chip"]')}function pr(){Wc()?.remove()}function kg(e){let o=$()?.getBoundingClientRect();!o||o.width<8||(e.style.width=`${Math.max(120,o.width-24)}px`,e.style.left=`${o.left+12}px`,e.style.top=`${Math.max(8,o.top-e.offsetHeight-8)}px`)}function Lg(e){let t=Wc();t||(t=s("div",{class:`bloom-root ${re("chip")}`,attrs:{"data-bloom":"quote-chip"}},s("span",{class:re("text")}),s("button",{class:re("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(t));let o=t.querySelector(`.${re("text")}`),n=y(e);o&&o.textContent!==n&&(o.textContent=n),t.dataset.text=e,kg(t)}function sa(){if(!oa){oa=!0;try{let e=ca(),t=hr();xt.store.persistAcrossChats&&t&&jo(e)!==t.text&&wg(e,t.text);let o=xt.store.persistAcrossChats?jo(e):"";!o||t&&y(t.text)===y(o)?pr():Lg(o),ma()}finally{oa=!1}}}function Ig(e){let t=e.closest('[data-bloom="quote-chip"]');if(t instanceof HTMLElement&&!e.closest(`.${re("x")}`)){let i=t.dataset.text??t.querySelector(`.${re("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:t}:null}let o=e.closest("blockquote");if(o instanceof HTMLElement&&!e.closest("a, button")){let i=qg(o),a=y(o.textContent??"");if(i&&a)return{text:a,skip:i,origin:o}}let n=$();if(!n||!n.contains(e)||ft(e)||e.closest("button, [role='button']"))return null;let r=hr();return!r||!r.row.contains(e)?null:{text:r.text,skip:null,origin:r.row}}function Bg(e){let{target:t}=e;if(!(t instanceof Element))return;if(t.closest('[data-bloom="quote-back"]')){e.preventDefault(),e.stopPropagation(),fr?.isConnected&&Kc(fr);return}if(t.closest(`.${re("x")}`)){e.preventDefault(),e.stopPropagation(),ia();return}let o=hr();if(o&&(t===o.dismiss||o.dismiss.contains(t))){ia();return}if(Og(t)&&Vc(),!xt.store.jumpToPassage)return;let n=Ig(t);if(!n)return;let r=Tg(n.text,n.skip);r&&(e.preventDefault(),e.stopPropagation(),Mg(r,n.origin,n.text),Kc(r))}function Og(e){let t=e.closest("button, [role='button']");return!(t instanceof HTMLElement)||t.closest("[data-bloom]")||!$()?.contains(t)?!1:/send|submit|发送|提交/i.test(aa(t))&&!na.test(aa(t))}function Pg(e){return!(e instanceof KeyboardEvent)||e.key!=="Enter"||e.shiftKey||e.isComposing?!1:ft(e.target)}function Vc(){if(!xt.store.persistAcrossChats)return;let e=ca(),t=jo(e);if(t){if(!hr()){let o=B(),n=da(t);n.length>=zc&&!y(o).includes(n)&&ce(`> ${t}

${o}`.trim())}ia(e)}}function Rg(e){Pg(e)&&Vc()}function Dg(e){!e.prevId&&e.id&&Sg(e.id),sa()}var Jc=f({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:xt,styles:Gc,onSettingsChange(e){e==="jumpToPassage"&&!xt.store.jumpToPassage&&Qc(),e==="persistAcrossChats"&&!xt.store.persistAcrossChats&&(sessionStorage.removeItem(la),pr()),sa()},start(){no=new AbortController,document.addEventListener("pointerdown",Bg,{capture:!0,signal:no.signal}),document.addEventListener("keydown",Rg,{capture:!0,signal:no.signal}),addEventListener("scroll",ma,{capture:!0,passive:!0,signal:no.signal}),ta=ge(Dg),ea=M(e=>Y(e)&&sa())},stop(){no?.abort(),no=void 0,ta?.(),ta=void 0,ea?.(),ea=void 0,window.clearTimeout(ra),Qc(),pr()}});var Zc=`/*
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
`;var Ng=C("bloom-cls"),Ug="bloom-cls",Fg=600*1e3,pa=lt("tab"),io=new Map,Wo=new Map,ro=null,$c=[],Gg=e=>e==="streaming"||e==="error";function Yg(){let e=new Map,t=Date.now();for(let[o,n]of Wo)t-n.at>Fg?Wo.delete(o):e.set(o,n.status);for(let[o,n]of io)e.set(o,n);return e}function Kg(e){return s("span",{class:`bloom-root ${Ng("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&T("alert"))}function yr(){let e=Yg(),t=new Set;for(let[o,n]of e)for(let r of ht(o)){if(!Se(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let a=Kg(n);t.add(a),r.append(a)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function br(e,t){e&&(t?io.set(e,t):io.delete(e),ro?.postMessage({tab:pa,id:e,status:t}),yr())}function Qg({data:e}){!L(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===pa||(Gg(e.status)?Wo.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):Wo.delete(e.id),yr())}function fa(){for(let e of io.keys())ro?.postMessage({tab:pa,id:e,status:null})}var Xc=f({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:()=>`${Zc}`,start(){for(let e of document.querySelectorAll('[data-bloom="cls"]'))e.remove();ro=typeof BroadcastChannel=="function"?new BroadcastChannel(Ug):null,ro?.addEventListener("message",Qg),addEventListener("pagehide",fa),$c=[S.on("rise",({conversationId:e})=>br(e,"streaming")),S.on("fall",({conversationId:e,outcome:t})=>br(e,t==="error"?"error":null)),S.on("context",({prevId:e,id:t,migrated:o})=>{o&&H().generating?br(t,"streaming"):!o&&io.get(e??"")==="streaming"&&br(e,null)}),M(e=>Y(e)&&yr())],b()&&yr()},stop(){for(let e of $c)e();fa(),ro?.close(),ro=null,removeEventListener("pagehide",fa),io.clear(),Wo.clear();for(let e of document.querySelectorAll('[data-bloom="cls"]'))e.remove()}});var eu=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],wr={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},zg={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},jg="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",ga=32,Sr=64,ha="#FCFCFC",ba="#111111",Wg=14,xr=51.5,Vg=12.5,Jg=9.75,_c=52,Zg=10.5,$g=7.75,Xg={rotate:e=>e.arc(xr,xr,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function vr(e){let t=document.createElement("canvas");t.width=t.height=ga;let o=t.getContext("2d");return o?(o.scale(ga/Sr,ga/Sr),e(o),t.toDataURL("image/png")):""}function Ar(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D(jg);o&&(e.strokeStyle=ba,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function Er(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function _g(e,t){Er(e,xr,Vg,ba),Er(e,xr,Jg,wr[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),Xg[t](e),e.stroke()}function eh(e,t){e.beginPath(),e.roundRect(0,0,Sr,Sr,Wg),e.fillStyle=t,e.fill()}var th=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function tu(e,t){switch(e){case"original":return th(zg[t]);case"hole":return vr(o=>Ar(o,wr[t],!0));case"bg":return vr(o=>{eh(o,wr[t]),Ar(o,ha,!1)});case"dot":return vr(o=>{Ar(o,ha,!0),Er(o,_c,Zg,ba),Er(o,_c,$g,wr[t])});case"badge":return vr(o=>{Ar(o,ha,!0),_g(o,t)})}}var Jo="bloom-chat-state-favicon",Zo="data-bloom-rel",Aa="data-bloom-media",ou="bloom-parked-icon",oh="/favicon.ico",ru=g({style:{type:"select",description:"How the tab icon shows the chat state.",options:eu,default:"bg"}}),_e=null,iu="",qr=null,au="",nu=new Map,wa,ya=[],su=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${Zo}]`)];function Sa(){for(let e of su())e.id!==Jo&&(e.hasAttribute(Zo)||(au||=e.href,e.setAttribute(Zo,e.rel),e.setAttribute(Aa,e.getAttribute("media")??"")),e.rel!==ou&&(e.rel=ou),e.media!=="not all"&&(e.media="not all"))}function nh(){for(let e of su()){let t=e.getAttribute(Zo);if(t==null)continue;e.rel=t;let o=e.getAttribute(Aa);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(Zo),e.removeAttribute(Aa)}}function lu(){let e=document.getElementById(Jo);return e||(e=document.createElement("link"),e.id=Jo,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function rh(e){if(e==="wait")return au||oh;let t=ru.store.style,o=`${t}:${e}`,n=nu.get(o);return n||nu.set(o,n=tu(t,e)),n}function va(e){if(e)return"rotate";let t=B();return _e&&t&&t!==iu&&(_e=null),_e==="error"?"error":_e==="done"?"done":t?"ready":"wait"}function Vo(e,t=!1){if(e===qr&&!t)return;qr=e;let o=lu(),n=rh(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function ih(){wa=new MutationObserver(()=>{Sa(),document.head.lastElementChild?.id!==Jo&&lu()}),wa.observe(document.head,{childList:!0})}var cu=f({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"HostReady",settings:ru,start(){Sa(),Vo(va(H().generating),!0),ih(),ya=[S.on("rise",()=>{_e=null,Vo("rotate")}),S.on("fall",({outcome:e})=>{_e=e==="done"||e==="error"?e:null,iu=B(),Vo(va(!1))}),S.on("context",({migrated:e})=>{e||(_e=null)}),S.on("tick",({generating:e})=>{Sa(),Vo(va(e))})]},stop(){for(let e of ya)e();ya=[],wa?.disconnect(),document.getElementById(Jo)?.remove(),nh(),qr=null,_e=null},onSettingsChange(){Vo(qr??"wait",!0)}});var et="data-bloom-invite",ah=/^(?:invite team members|invite members|邀请团队成员|邀请成员)$/i,uu=':is(button, a:not([href^="/c/"])):not(main *, [role="dialog"] *)',sh={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${u.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])'],hideInvite:[`[${et}]`,`div:has(> [${et}]:only-child)`]},du=g({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0},hideInvite:{type:"boolean",description:"Hide Invite team members in the sidebar.",default:!0}}),Tr,xa=!1;function lh(e){if(Y(e))for(let t of document.querySelectorAll(`${uu}, [${et}]`))!t.matches(uu)||!ah.test(y(t.textContent??""))?t.removeAttribute(et):t.hasAttribute(et)||t.setAttribute(et,"")}var mu=f({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads, notices and Invite team members.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:du,styles:()=>Ke(Object.entries(sh).flatMap(([e,t])=>du.store[e]?t:[])),start(){xa=!0,pt().then(()=>{xa&&!Tr&&(Tr=M(lh))})},stop(){xa=!1,Tr?.(),Tr=void 0;for(let e of document.querySelectorAll(`[${et}]`))e.removeAttribute(et)}});var ch=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function uh(){let e=y(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!ch.has(e.toLowerCase())?e:null}function Et(e){return e?we(e)?.title??zl(e)??(e===b()?uh():null):null}var qa="complete-toast",dh=1e3,Ta=g({keepUntilDismissed:{type:"boolean",description:"Don't auto-close the toast. Dismiss with \xD7, or by opening the chat.",default:!1},duration:{type:"slider",description:"Seconds before the toast closes. Ignored when Keep Until Dismissed is on.",min:0,max:20,default:6,unit:"s"}}),Ca=null,Ea=[];function mh(e){let t=ht(e)[0];t?t.click():location.assign(`/c/${e}`)}function fh(e){Ca=e,Wn({key:qa,title:Et(e)??"ChatGPT",message:"Response ready",type:"success",onClick:()=>mh(e),onClose:()=>{Ca=null},duration:Ta.store.keepUntilDismissed?0:Ta.store.duration*dh})}var fu=f({name:"CompleteToast",description:"Show a toast when a chat you left finishes answering. Click it to open that chat.",authors:["Bloom contributors"],tags:["chat"],icon:"check",enabledByDefault:!0,settings:Ta,start(){Ea=[S.on("background",({conversationId:e})=>fh(e)),ge(({id:e})=>e===Ca&&Je(qa))]},stop(){for(let e of Ea)e();Ea=[],Je(qa)}});var ao=`form:has(:is(${u.composerInput})), ${u.oldComposerForm}`,Cr='[class*="ComposerLayoutBody"]',ka='[class*="ComposerLayoutRoot"]',ph='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',gh=`:is(${ao}) ${Cr}, :is(${ao}):not(:has(${Cr})) ${ka}, :is(${ao}):not(:has(${Cr})):not(:has(${ka})) :is(${ph})`,hh='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',bh='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',yh="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))";var vh="composer-fill",pu=g({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function Ah(){let{opacity:e,blur:t}=pu.store;if(e>=100)return"";let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${yh} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important;-webkit-backdrop-filter:blur(${t}px)!important`;return`:is(${hh}), :is(${ao}){${o}}:is(${bh}){display:none!important}${gh}{${n}}:is(${ao}):has(${Cr}) ${ka}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${ao}) :is(${u.composerInput}){background-color:transparent!important}`}function Ma(){for(let e of document.querySelectorAll(`[data-bloom="${vh}"]`))e.remove()}var gu=f({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:pu,styles:Ah,start(){Ma()},stop(){Ma()},onSettingsChange(){Ma()}});var wh=1200,Sh=8e3,xh=150,Eh=20,hu=6,Ba="continue where you left",qh=/message delivery timed out|please try again/i,bu=/waiting for the complete answer/i,yu=g({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:Ba,placeholder:Ba}}),La=[],kr=0,$o=!1,Xo=0,lo="",Mr="",Oa=0,co=!1,_o=!1,Lr=!0,so="",Pa=0,Ir=!1,Th=()=>yu.store.prompt.trim()||Ba;function vu(){return(J(u.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function Au(){let e=vu();return!e||bu.test(e)||!qh.test(e)?"":e}function Ch(){let e=vu();return e&&bu.test(e)?e:""}function Mh(){let e=Gt()?.querySelectorAll(u.turn),t=e?.[e.length-1];return`${t?.getAttribute("data-turn-key")??""}:${t?.textContent?.length??0}`}function wu(e,t,o){if(o===kr){if(H().generating||B()!==e||t>=Eh){co=!1,H().generating||(lo="");return}On(),setTimeout(()=>wu(e,t+1,o),xh)}}function kh(e){let t=kr;if(H().generating||B()&&B()!==e){co=!1,lo="";return}ce(e),Ir=!0,Mo(()=>{t===kr&&wu(e,0,t)})}function Su(e){return e===lo||Xo>=hu||H().generating||B()?!1:(lo=e,Xo+=1,co=!0,kh(Th()),!0)}function Lh(){if($o||co||_o)return;let e=Date.now(),t=Au();if(t){if(so="",t!==Mr){Mr=t,Oa=e;return}if(e-Oa<wh)return;Su(`${b()??""}:${t}`);return}if(Mr="",!Ch()){Lr=!0,so="";return}if(!Lr||!H().generating||B())return;let n=`${b()??""}:${Mh()}`;if(n!==so){so=n,Pa=e;return}if(e-Pa<Sh||Xo>=hu)return;let r=Ut();r&&(_o=!0,r.click())}function Ia(){kr+=1,$o=!1,Xo=0,lo="",Mr="",Oa=0,co=!1,_o=!1,Lr=!0,so="",Pa=0,Ir=!1}var xu=f({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:yu,start(){Ia(),La=[S.on("rise",()=>{$o=!1,lo="",co=!1,Ir&&(Ir=!1,Lr=!1,so="")}),S.on("fall",({outcome:e})=>{if(_o){_o=!1,e==="left"?$o=!0:Su(`${b()??""}:stall`);return}(e==="stopped"||e==="left")&&($o=!0),e==="done"&&!Au()&&(Xo=0)}),S.on("context",({migrated:e})=>{e||Ia()}),S.on("tick",Lh)]},stop(){for(let e of La)e();La=[],Ia()}});var Fe=C("bloom-csi-"),Ih=256,Bh=160,Br=1,Eu=4,Oh=.1,Ph=.0015,Rh=250;function Dh(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function Hh(e){return new Promise((t,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function Nh(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:pe(t.x,n,1-n),y:pe(t.y,r,1-r)}}function qu(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function Uh(e,t){let o=s("canvas");return o.width=o.height=Ih,qu(o,e,t),o.toDataURL("image/png")}function Tu(e){let t=null,o={x:j.store.cropX,y:j.store.cropY,zoom:j.store.cropZoom},n,r=s("canvas",{class:Fe("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=Bh*devicePixelRatio;let i=s("div",{class:`bloom-muted ${Fe("status")}`}),a=s("div",{class:Fe("zoom")}),c=s("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(v,q=!0){t&&(o=Nh(t,v),qu(r,t,o),q&&(clearTimeout(n),n=setTimeout(()=>{t&&(j.store.cropX=o.x,j.store.cropY=o.y,j.store.cropZoom=o.zoom,j.store.avatarUrl=Uh(t,o))},Rh)))}function d(){a.replaceChildren(Jn(o.zoom,Br,Eu,Oh,"\xD7",v=>l({...o,zoom:v})))}async function m(v,q){i.textContent="";try{t=await Hh(v),q&&(j.store.avatarSource=v,o={x:.5,y:.5,zoom:Br}),e.classList.add(Fe("has-image")),d(),l(o,q)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let h=v=>{v?.type.startsWith("image/")&&Dh(v).then(q=>m(q,!0))};c.addEventListener("change",()=>h(c.files?.[0])),r.addEventListener("wheel",v=>{t&&(v.preventDefault(),l({...o,zoom:pe(o.zoom*(1-v.deltaY*Ph),Br,Eu)}),d())},{passive:!1}),r.addEventListener("pointerdown",v=>{if(!t)return;r.setPointerCapture(v.pointerId);let q={...o},ee=r.getBoundingClientRect(),st=te=>{if(!t)return;let De=Math.max(ee.width/t.naturalWidth,ee.height/t.naturalHeight)*o.zoom;l({...o,x:q.x-(te.clientX-v.clientX)/(t.naturalWidth*De),y:q.y-(te.clientY-v.clientY)/(t.naturalHeight*De)})};r.addEventListener("pointermove",st),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",st),{once:!0})});let P=s("div",{class:Fe("cropper"),attrs:{tabindex:"0"},on:{paste:v=>h([...v.clipboardData?.files??[]].find(q=>q.type.startsWith("image/"))),dragover:v=>v.preventDefault(),drop:v=>{v.preventDefault(),h(v.dataTransfer?.files[0])}}},s("div",{class:Fe("stage")},r),s("div",{class:Fe("controls")},Ho("",v=>v.trim()&&void m(v.trim(),!0),"https://\u2026 or data:image/\u2026","url"),s("div",{class:Fe("buttons")},N("Choose file",()=>c.click()),N("Reset crop",()=>{l({x:.5,y:.5,zoom:Br}),d()}),N("Clear",()=>{t=null,e.classList.remove(Fe("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),a.replaceChildren(),j.store.avatarUrl="",j.store.avatarSource=""},"danger")),a,i,c));return e.append(P),j.store.avatarSource&&m(j.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var Cu=`/*
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
`;var en="data-bloom-csi-avatar",Ra="data-bloom-csi-sized",Iu="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",Gh=32,j=g({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>Tu(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),Mu=[];function Bu(e){e.removeAttribute(en),e.removeAttribute(Ra)}function ku(e){return(j.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function Lu(e=[]){if(!Y(e))return;let t=j.store.displayName.trim()||null,o=!!j.store.avatarUrl,n=new Set(t?ku("name"):[]);for(let i of document.querySelectorAll(Iu))n.has(i)||dt(i,null);for(let i of n)dt(i,t);let r=new Set(o?ku("avatar"):[]);for(let i of document.querySelectorAll(`[${en}]`))r.has(i)||Bu(i);for(let i of r)i.hasAttribute(en)||i.setAttribute(en,""),i.toggleAttribute(Ra,!i.closest('[role="menu"]'))}function Yh(){let e=j.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${j.store.avatarSize}px}:is(${u.rail}, ${u.oldRail}) [${Ra}]{--bloom-csi-size:${Gh}px}`:""}var Ou=f({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:j,styles:()=>`${Yh()}
${Cu}`,start(){Mu=[ke(),M(Lu)]},stop(){for(let e of Mu)e();for(let e of document.querySelectorAll(`[${en}]`))Bu(e);for(let e of document.querySelectorAll(Iu))dt(e,null)},onSettingsChange(){Lu()}});var uo=C("bloom-greeting-"),Pu=30,Ru=100;function Du(e){let t=-1,o=s("textarea",{class:`bloom-input ${uo("input")}`,attrs:{maxlength:String(Ru),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=N("Add",i),r=s("div",{class:uo("list")});function i(){let l=o.value.trim().slice(0,Ru);if(!l)return;let d=[...O.store.greetings];t>=0?d[t]=l:d.length<Pu&&d.push(l),O.store.greetings=d,t=-1,o.value="",a()}function a(){let{greetings:l}=O.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&l.length>=Pu,r.replaceChildren(...l.length?l.map((d,m)=>s("div",{class:uo("row",m===t?"row-editing":"row-idle")},s("div",{class:uo("text"),text:d}),U("edit","Edit",()=>{t=m,o.value=d,o.focus(),a()}),U("trash","Delete",()=>{O.store.greetings=l.filter((h,P)=>P!==m),t===m&&(t=-1),a()}))):[s("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),e.append(s("div",{class:uo("editor")},r,s("div",{class:uo("form")},o,n))),a();let c=Nt((l,d)=>l==="GreetingCustomizer"&&d==="greetings"&&a());return()=>{c(),e.replaceChildren()}}var Hu=`/*
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
`;var Pr="data-bloom-greeting",Qh=1e3,zh=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],O=g({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>Du(e)},greetings:{type:"custom",default:zh},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),Or,Nu=[],Da,rn=()=>Ft()&&!Ce(),jh=e=>e.replaceAll(/\s*\n\s*/g," ").trim(),Fu=()=>O.store.greetings.filter(e=>typeof e=="string"&&e.trim());function an(){let e=Fu();if(e.length)if(O.store.order==="random"&&e.length>1){let t=O.store.lastRandom;for(;t===O.store.lastRandom;)t=Math.floor(Math.random()*e.length);O.store.lastRandom=t,O.store.index=t}else O.store.index=(O.store.index+1)%e.length}function Wh(){return rn()?J(u.homeHeading):null}function tn(){for(let e of document.querySelectorAll(`[${Pr}]`))e.removeAttribute(Pr),dt(e,null)}function on(){for(let e of document.querySelectorAll("[data-bloom-placeholder]"))e.removeAttribute("data-bloom-placeholder")}function Uu(e){let t=Ae(),o=jh(e);if(!t||!o||B(t)){on();return}t.getAttribute("data-bloom-placeholder")!==o&&t.setAttribute("data-bloom-placeholder",o)}function nn(){let e=Fu(),t=Fn(),o=rn();if(!e.length||!t&&!o){tn(),on();return}if(t){tn(),Uu(e[0]??"");return}let n=Wh();n?((O.store.index<0||O.store.index>=e.length)&&an(),n.setAttribute(Pr,""),dt(n,e[Math.max(0,O.store.index)%e.length]??"")):tn(),O.store.heroOnlyOutsideProject?on():Uu(e[Math.max(0,O.store.index)%e.length]??"")}function Ha(){clearInterval(Or),Or=void 0,O.store.mode==="interval"&&rn()&&(Or=setInterval(()=>{an(),nn()},O.store.intervalSec*Qh))}function Vh(e){O.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${Pr}]`)||getSelection()?.toString()||(an(),nn())}function Jh(){rn()&&O.store.mode==="refresh"&&an(),Ha(),nn()}var Gu=f({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:O,styles:Hu,start(){tn(),on(),Da=new AbortController,document.addEventListener("click",Vh,{signal:Da.signal}),rn()&&O.store.mode==="refresh"&&an(),Ha(),Nu=[M(e=>Y(e)&&nn()),ge(Jh)]},stop(){Da?.abort();for(let e of Nu)e();clearInterval(Or),tn(),on()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&Ha(),nn()}});var sn=C("bloom-history-"),Na=10,Zh=3e3;function Ua(e,t){let o="",n=0,r=new Set,i=s("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),a=s("div",{class:sn("list")}),c=s("div",{class:sn("pager")}),l,d=N("Clear all",()=>{if(!l){d.textContent="Click again to clear",l=setTimeout(()=>{l=void 0,d.textContent="Clear all"},Zh);return}clearTimeout(l),l=void 0,d.textContent="Clear all",ln([])},"danger");function m(){let P=[...qt.store.entries].toReversed(),v=o.trim().toLowerCase(),q=v?P.filter(fe=>fe.toLowerCase().includes(v)):P,ee=Math.max(1,Math.ceil(q.length/Na));n=Math.min(n,ee-1);let st=q.slice(n*Na,(n+1)*Na).map(fe=>s("div",{class:sn("row")},s("button",{class:sn("text",r.has(fe)?"text-open":"text-closed"),text:fe,title:r.has(fe)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{r.delete(fe)||r.add(fe),m()}}}),t&&U("edit","Use",()=>t(fe)),U("copy","Copy",()=>void An(fe)),U("trash","Delete",()=>ln(qt.store.entries.filter(_r=>_r!==fe)))));a.replaceChildren(...st.length?st:[s("div",{class:"bloom-muted",text:v?"No matching prompts.":"No saved prompts yet."})]),c.replaceChildren(s("span",{class:"bloom-muted",text:`${q.length} ${v?"matching":"saved"} \xB7 page ${n+1} of ${ee}`}),N("Previous",()=>{n--,m()}),N("Next",()=>{n++,m()}),d);let[te,De]=c.querySelectorAll("button");te.disabled=n===0,De.disabled=n>=ee-1,d.disabled=!P.length}i.addEventListener("input",()=>{o=i.value,n=0,m()}),e.append(s("div",{class:sn("manager")},i,a,c)),m();let h=Nt((P,v)=>P==="InputHistory"&&v==="entries"&&m());return()=>{h(),clearTimeout(l),e.replaceChildren()}}var Yu=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

.bloom-history-hud {
    position: fixed;
    z-index: var(--bloom-z-overlay);
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

.bloom-root.bloom-history-backdrop {
    position: fixed;
    inset: 0;
    z-index: var(--bloom-z-overlay);
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
`;var Ge=C("bloom-history-"),Xh=2e3,qt=g({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>Ua(e)},entries:{type:"custom",default:[]}}),F=null,Fa={text:"",at:0},Ie=null,tt=null,Ga,fo=()=>qt.store.entries.filter(e=>typeof e=="string");function ln(e){qt.store.entries=e.slice(-qt.store.maxEntries)}function Ya(e){let t=e.trim();if(!t)return;let o=Date.now();t===Fa.text&&o-Fa.at<Xh||(Fa={text:t,at:o},ln([...fo().filter(n=>n!==t),t]))}function Ku(e){e.preventDefault()}function _h(){let e=s("button",{class:Ge("hud-count"),attrs:{type:"button"},on:{mousedown:Ku,click:nb}}),t=s("button",{class:Ge("hud-x"),text:"\xD7",attrs:{type:"button","aria-label":"Exit history"},on:{mousedown:Ku,click:eb}});return s("div",{class:`bloom-root ${Ge("hud")}`,attrs:{"data-bloom":"history-hud",role:"group","aria-live":"polite","aria-label":"Input history"}},e,t)}function Qu(e,t){let o=Ae();if(!o||tt)return;Ie??=_h();let n=`${e+1} / ${t}`,r=Ie.querySelector(`.${Ge("hud-count")}`);r?.replaceChildren(n),r?.setAttribute("aria-label",`Show input history (${n})`);let i=(o.closest("form")??o).getBoundingClientRect();Ie.style.left=`${i.left+i.width/2}px`,Ie.style.top=`${i.top}px`,Ie.isConnected||document.body.append(Ie)}function mo(){F=null,Ie?.remove()}function eb(){F&&ce(F.draft),mo(),Ae()?.focus()}function zu(e){let t=fo();if(!F)return;let o=t[e];F.index=e,F.shown=o,ce(o),Qu(t.length-1-e,t.length)}function tb(e){let t=fo();if(!t.length)return!1;if(!F){if(e===1)return!1;F={index:t.length,draft:B(),shown:""}}let o=F.index+e;return o<0?!0:o>=t.length?(ce(F.draft),mo(),!0):(zu(o),!0)}function ob(e){let t=fo().indexOf(e);cn(),!(t<0)&&(F??={index:t,draft:B(),shown:""},zu(t),Ae()?.focus())}function cn(){if(!tt)return;tt.release(),tt.controller.abort(),tt.root.remove(),tt=null;let e=fo();F&&e[F.index]===F.shown?Qu(e.length-1-F.index,e.length):F=null}function nb(){if(tt)return;Ie?.remove();let e=s("div",{class:Ge("dialog-body")}),t=s("div",{class:`bloom-root ${Ge("backdrop")}`,attrs:{"data-bloom":"history-dialog"},on:{click:n=>n.target===n.currentTarget&&cn()}},s("div",{class:Ge("dialog"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Input history"}},s("div",{class:Ge("dialog-header")},s("h2",{class:Ge("dialog-title"),text:"Input history"}),U("close","Close",cn)),e));t.addEventListener("keydown",n=>n.stopPropagation());let o=new AbortController;document.addEventListener("keydown",n=>{n.key==="Escape"&&(n.preventDefault(),n.stopPropagation(),cn())},{capture:!0,signal:o.signal}),he(t),tt={root:t,release:Ua(e,ob),controller:o},e.querySelector("input")?.focus()}function ju(e){return ft(e)?e:e instanceof HTMLElement?e.closest(u.composerInput):null}function rb(){if(Ae()?.closest("[data-chatgpt-composer], [data-composer-input], form")?.querySelector('[aria-expanded="true"]'))return!0;for(let t of document.querySelectorAll('[role="listbox"], [role="menu"], [data-radix-popper-content-wrapper], [cmdk-root], [cmdk-list]')){if(!(t instanceof HTMLElement)||t.closest("[data-bloom]"))continue;let o=getComputedStyle(t);if(!(o.display==="none"||o.visibility==="hidden"))return!0}return!1}function ib(e){if(e.isComposing||e.key==="Process"||e.keyCode===229)return;let t=ju(e.target);if(!t)return;if(e.key==="Enter"&&!e.shiftKey){Ya(B(t)),mo();return}if(e.key==="Escape"&&F){ce(F.draft),mo(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey||rb())return;let o=tl(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!F||tb(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function ab(e){F&&ju(e.target)&&B()!==F.shown.trim()&&mo()}function sb(e){e.target instanceof Element&&e.target.closest(u.sendButton)&&Ya(B())}var Wu=f({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before. Click the counter to browse history.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:qt,styles:Yu,start(){for(let t of document.querySelectorAll('[data-bloom="history-hud"], [data-bloom="history-dialog"]'))t.remove();Ie=null,Ga=new AbortController;let{signal:e}=Ga;document.addEventListener("keydown",ib,{capture:!0,signal:e}),document.addEventListener("input",ab,{capture:!0,signal:e}),document.addEventListener("click",sb,{capture:!0,signal:e}),document.addEventListener("submit",()=>Ya(B()),{capture:!0,signal:e})},stop(){Ga?.abort(),cn(),mo();for(let e of document.querySelectorAll('[data-bloom="history-hud"]'))e.remove();Ie=null},onSettingsChange(e){e==="maxEntries"&&ln(fo())}});var Vu=`/*
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
`;var cb=1500,ub=5e3,db=2e3,ed=[{label:"UTC",value:"UTC"},{label:"\u7F8E\u56FD\u4E1C\u90E8",value:"America/New_York"},{label:"\u7F8E\u56FD\u4E2D\u90E8",value:"America/Chicago"},{label:"\u7F8E\u56FD\u5C71\u5730",value:"America/Denver"},{label:"\u7F8E\u56FD\u897F\u90E8",value:"America/Los_Angeles"},{label:"\u65E5\u672C",value:"Asia/Tokyo"},{label:"\u53F0\u6E7E",value:"Asia/Taipei"}],po=g({sourceTimeZone:{type:"select",description:"Zone the stored clock was written in. Leave UTC for ChatGPT create_time. Pick the same zone as the Shit GPT plugin only when that clock is a wall time in that zone; it is then shown in the system timezone.",options:ed,default:"UTC"},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),Dr=new Map,Ka=new Set,td=0,Hr,Ju=[];function od(e,t){Dr.get(e)!==t&&(Dr.set(e,t),clearTimeout(Hr),Hr=setTimeout(nd,db))}function nd(){let e={...po.store.stamps,...Object.fromEntries(Dr)};po.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,cb))}function mb(e){let t=we(b())?.times;for(let o=e.length-1;o>=0;o--){let n=Dr.get(e[o])??t?.get(e[o])??po.store.stamps[e[o]];if(n)return n}return null}var fb=()=>H().generating||Date.now()-td<ub;function rd(){return Intl.DateTimeFormat().resolvedOptions().timeZone}function id(){let e=po.store.sourceTimeZone;if(!e||e==="UTC")return"UTC";try{return Intl.DateTimeFormat(void 0,{timeZone:e}),e}catch{return"UTC"}}function ad(e,t){let o={};for(let n of new Intl.DateTimeFormat("en-US",{timeZone:t,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(e)))o[n.type]=n.value;return{y:+o.year,m:+o.month,d:+o.day,h:+o.hour%24,mi:+o.minute,s:+o.second}}function sd(e){return Date.UTC(e.y,e.m-1,e.d,e.h,e.mi,e.s)}function Zu(e,t){let o=e;for(let n=0;n<4;n++){let r=e-sd(ad(o,t));if(r===0)return o;o+=r}return o}function pb(e,t){if(t==="UTC")return e;let o=(e%1e3+1e3)%1e3,n=e-o,r=new Date(n),i=Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),r.getUTCHours(),r.getUTCMinutes(),r.getUTCSeconds()),a=Zu(i,t),c=3600*1e3,l=Number.POSITIVE_INFINITY;for(let d of[-c,0,c]){let m=a+d;sd(ad(m,t))===i&&m<l&&(l=m)}return l!==Number.POSITIVE_INFINITY?l+o:Zu(i+c,t)+o}function gb(e,t){let o=id();return t||o==="UTC"?e:pb(e,o)}function $u(e,t){return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(e)}function hb(e){let t=rd(),o=Date.now(),n={hour:"2-digit",minute:"2-digit",timeZone:t};if($u(e,t)===$u(o,t))return new Intl.DateTimeFormat(void 0,n).format(e);let r=a=>new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric"}).format(a),i=r(e)===r(o)?{}:{year:"numeric"};return new Intl.DateTimeFormat(void 0,{...i,month:"short",day:"numeric",...n}).format(e)}function bb(e,t){let o=new Date(t).toLocaleString(void 0,{timeZone:rd()}),n=id();if(n==="UTC"||t===e)return o;let r=new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"UTC"}).format(e);return`${ed.find(a=>a.value===n)?.label??n} ${r} \u2192 ${o}`}function ld(e){let t=Yt(e)??e.getAttribute("data-message-author-role")??e.closest(u.turn)?.getAttribute("data-turn")??e.querySelector(u.authorRole)?.getAttribute("data-message-author-role");if(Ai(t))return t;let o=Bo(e).at(-1);return we(b())?.chain.find(n=>n.id===o)?.role??null}var Xu='[class*="group/activity-header"]';function yb(e){let t=e.parentElement;if(!t)return null;let o=e.closest(u.turn);return o&&t!==o&&!o.contains(t)?null:t}function vb(e){let t=e;for(let o=0;o<8&&t;o++){let n=yb(t);if(!n)return null;let r=[...n.children],i=r.indexOf(t);for(let a=i-1;a>=0;a--){let c=r[a],l=c.matches(Xu)?c:c.querySelector(Xu);if(l)return l;if(c.matches(u.searchUnit)||c.querySelector(u.searchUnit))return null}if(n===t.closest(u.turn))return null;t=n}return null}function Ab(e){let t=e.parentElement;for(let o=0;o<4&&t;o++){if(t.classList.contains("flex-col"))return t;t=t.parentElement}return e.parentElement??e}function cd(e,t){if(t==="assistant"){let o=vb(e);if(o)return Ab(o)}return e}function wb(e,t){let o=Kt();for(let n=o.length-1;n>=0;n--){let r=o[n];if(!(r!==e&&(ld(r)!=="assistant"||cd(r,"assistant")!==t)))return r===e}return!0}function _u(e){return e.querySelector(':scope > time[data-bloom="timestamp"]')}function Sb(e){let t=Bo(e);if(!t.length||!Se(e)||e.querySelector("time:not([data-bloom])"))return;let o=ld(e),n=cd(e,o);if(n!==e&&!wb(e,n)){_u(e)?.remove();return}let r=mb(t),i=!1;if(!r&&fb()){r=Date.now();let m=t.at(-1);Ka.add(m),od(m,r),i=!0}else r&&Ka.has(t.at(-1))&&(i=!0);let a=n.querySelector('time[data-bloom="timestamp"]')??_u(e);if(!r||po.store.hideOwnMessages&&o==="user"){a?.remove();return}let c=gb(r,i),l=hb(c);if(a?.textContent===l&&a.parentElement===n&&a===n.firstElementChild)return;let d=s("time",{class:`bloom-timestamp bloom-timestamp-${o??"assistant"}`,text:l,title:bb(r,c),attrs:{"data-bloom":"timestamp",datetime:new Date(c).toISOString()}});a&&a.replaceWith(d),(d.parentElement!==n||d!==n.firstElementChild)&&n.prepend(d)}var Rr=Qe(()=>{for(let e of Kt())Sb(e)}),ud=f({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:po,styles:Vu,start(){Ju=[M(e=>Y(e)&&Rr()),V.on("conversation",Rr),V.on("message-time",({messageId:e,time:t})=>{Ka.delete(e),od(e,t),Rr()}),S.on("fall",()=>{td=Date.now()})]},stop(){for(let e of Ju)e();Hr&&(clearTimeout(Hr),nd());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();Rr()}}});var xb=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])','[data-chatgpt-composer] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-composer-input] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-codex-composer-root] button[aria-label^="Dictat" i], [data-composer-placement] button[aria-label^="Dictat" i], [class*="ComposerLayout"] button[aria-label^="Dictat" i]'],Eb=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],dd=g({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),md=f({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:dd,styles:()=>Ke([...xb,...dd.store.hideDictationSettings?Eb:[]])});var Tt="data-bloom-share",qb=/^\/g\/g-p-/,Tb=/^(?:share|分享)$/i,Cb=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],Mb=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${Tt}="project"]`],Qa=g({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),Nr,za=!1;function kb(e){if(!Y(e))return;let t=qb.test(location.pathname)&&!b();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${Tt}]`))!t||!Tb.test(y(o.textContent??""))?o.removeAttribute(Tt):o.hasAttribute(Tt)||o.setAttribute(Tt,"project")}var fd=f({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:Qa,styles:()=>Ke([...Qa.store.hideShareChat?Cb:[],...Qa.store.hideShareProject?Mb:[]]),start(){za=!0,pt().then(()=>{za&&!Nr&&(Nr=M(kb))})},stop(){za=!1,Nr?.(),Nr=void 0;for(let e of document.querySelectorAll(`[${Tt}]`))e.removeAttribute(Tt)}});var pd='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',Lb='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',Ib="[data-bloom-profile-plan]",gd="visibility:hidden!important;user-select:none!important",bd=g({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function Bb(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=bd.store,r=[];return e&&r.push(n?`:is(${pd}){display:none!important}`:`:is(${pd}){${gd}}`),t&&r.push(`:is(${Lb}){${gd}}`),e&&o&&r.push(`${Ib}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var hd,yd=f({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:bd,styles:Bb,start(){hd=ke()},stop(){hd?.()}});var Ob="model-switcher-dropdown-button",ja="data-selected-reasoning-effort",Ur="ArrowLeft",vd=e=>e.startsWith("model-switcher-")&&e!==Ob?e.slice(15):"",un=(e,t)=>e.id===t.id||!!e.label&&e.label===t.label;function Ad(){let e=$();return(e&&J(u.modelTrigger,e))??J(u.modelTrigger)}function Be(){let e=Ad();if(!e)return null;let t=e.getAttribute("aria-expanded")==="true",o=e.getAttribute(ja),n=o&&t?"":y(e.innerText),r=o||vd(e.getAttribute("data-testid")??"")||n;return r?{id:r,label:n||r}:null}function Pb(e){return[...document.querySelectorAll(u.modelItem)].find(t=>{let o=vd(t.getAttribute("data-testid")??""),n=y(t.textContent??"");return o===e.id||n===e.label||n===e.id})??null}function Rb(e){let t=e.querySelector("[role=slider]"),o=Number(t?.getAttribute("aria-valuenow")),n=Number(t?.getAttribute("aria-valuemax"));o<=0?Ur="ArrowRight":o>=n&&(Ur="ArrowLeft"),e.focus(),e.dispatchEvent(new KeyboardEvent("keydown",{key:Ur,code:Ur,bubbles:!0,cancelable:!0}))}function Wa(e){let t=Be(),o=Ad();if(t&&un(t,e))return o?.hasAttribute(ja)&&o.getAttribute("aria-expanded")==="true"&&document.querySelector("[role=menu]")?.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),!0;if(o?.hasAttribute(ja)){let r=document.querySelector(u.effortSlider);return r?Rb(r):o.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,button:0,pointerType:"mouse",isPrimary:!0})),!1}let n=Pb(e);if(n){n.click();let r=Be();return!!r&&un(r,e)}return o?.getAttribute("aria-expanded")!=="true"&&o?.click(),!1}var wd=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

.bloom-queue-tray {
    position: fixed;
    z-index: var(--bloom-z-tray);
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
`;var W=C("bloom-queue-"),Hb=6,Nb=8,ie=null,dn="",go=!1,ho=!1;function Va(e,t,o){let n=U(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute(ue),n.addEventListener("mouseenter",()=>Sd(t)),n.addEventListener("mouseleave",()=>Sd("")),n}function Sd(e){let t=ie?.querySelector(`.${W("tip")}`);t&&(t.textContent=e)}function Ub(e,t,o,n){ho=!0;let r=s("textarea",{class:`bloom-input ${W("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=new AbortController,a=c=>{i.abort(),ho=!1,dn="",c?n.edit(t,r.value):r.replaceWith(s("div",{class:W("text"),text:o}))};addEventListener("keydown",c=>{if(!(c.target!==r||c.isComposing)){if(c.key==="Enter"&&!c.shiftKey)a(!0);else if(c.key==="Escape")a(!1);else return;c.preventDefault(),c.stopImmediatePropagation()}},{capture:!0,signal:i.signal}),r.addEventListener("keydown",c=>c.stopPropagation(),{signal:i.signal}),r.addEventListener("blur",()=>a(!0),{signal:i.signal}),e.querySelector(`.${W("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function Fb(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,a=l=>{!i&&Math.abs(l.clientY-n.clientY)<Hb||(i||(i=ho=!0,e.classList.add(W("dragging"))),e.style.transform=`translateY(${l.clientY-n.clientY}px)`)},c=l=>{if(removeEventListener("pointermove",a),!i)return;ho=!1,dn="";let m=[...r.children].filter(h=>h!==e).filter(h=>h.getBoundingClientRect().top+h.getBoundingClientRect().height/2<l.clientY).length;o.move(t,m)};addEventListener("pointermove",a),addEventListener("pointerup",c,{once:!0})})}function Gb(e,t,o,n){let r=s("li",{class:W("row")},s("div",{class:W("text"),text:e.text}),n&&e.label?s("span",{class:W("model"),title:e.label,text:e.label}):null,s("div",{class:W("actions")},Va("trash","Remove from queue",()=>o.remove(t)),Va("edit","Edit",()=>Ub(r,t,e.text,o)),Va("send","Send now",()=>o.sendNow(t))));return Fb(r,t,o),r}function Yb(e){if(!ie)return;let t=e.getBoundingClientRect();ie.style.left=`${t.left}px`,ie.style.width=`${t.width}px`,ie.style.bottom=`${innerHeight-t.top+Nb}px`}function Ja(){ie?.remove(),ie=null,dn="",ho=!1}function Ct(e,t,o=!0){let n=$();if(!e.length||!ut(n)){Ja();return}ie||(ie=s("div",{class:`bloom-root ${W("tray")}`,attrs:{"data-bloom":"queue"}},s("div",{class:W("header")},s("button",{class:W("toggle"),attrs:{type:"button","aria-expanded":String(!go)},on:{click:a=>{go=!go,ie?.classList.toggle(W("collapsed"),go),a.currentTarget.setAttribute("aria-expanded",String(!go))}}},s("span",{class:W("count")}),T("chevron")),s("span",{class:W("tip")})),s("ol",{class:W("list")})),ie.classList.toggle(W("collapsed"),go),document.body.append(ie)),Yb(n);let r=JSON.stringify([o,...e.map(a=>[a.text,o?a.label:""])]);if(ho||r===dn)return;dn=r;let i=ie.querySelector(`.${W("count")}`);i&&(i.textContent=vn(e.length,"Queued message")),ie.querySelector(`.${W("list")}`)?.replaceChildren(...e.map((a,c)=>Gb(a,c,t,o)))}var Kr=new E("PromptQueue"),Kb=8,fn=150,Fr=20,Qb=300,Oe="BloomPromptQueue",$a="BloomPromptQueueClaim",xd="BloomPromptQueueTab",zb=4e3,_=g({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1},showQueueMode:{type:"boolean",description:"Show the model that was selected when each message was queued.",default:!0},stickyOnNavigate:{type:"boolean",description:"Keep the selected model when switching chats.",default:!0},persistAcrossRefresh:{type:"boolean",description:"Restore unsent queued messages in this browser after a refresh. Other tabs show the same queue; only one of them sends it.",default:!0}}),Pe=new Map,mn=!1,Mt=null,bo,Ed=[],ot=null,Lt=!1,pn,Gr="draft",gn=()=>b()??Gr,ae=()=>Pe.get(gn())??[],Xa=e=>({id:e.model||e.label,label:e.label||e.model});function jb(e){return typeof e=="string"?e.trim()?{text:e,model:"",label:""}:null:!L(e)||typeof e.text!="string"||!e.text.trim()?null:{text:e.text,model:typeof e.model=="string"?e.model:"",label:typeof e.label=="string"?e.label:""}}function _a(){let e=sessionStorage.getItem(xd);if(e)return e;let t=globalThis.crypto?.randomUUID?.()??`${Date.now()}-${Math.random()}`;return sessionStorage.setItem(xd,t),t}function Cd(){let e=Te(localStorage.getItem($a)??"");return!L(e)||typeof e.tab!="string"||typeof e.at!="number"||typeof e.key!="string"?null:{tab:e.tab,at:e.at,key:e.key}}function Md(){let e={tab:_a(),at:Date.now(),key:gn()};try{localStorage.setItem($a,JSON.stringify(e))}catch(t){Kr.warn("Could not claim the queue",t)}}function Wb(){let e=Cd();if(e?.tab===_a())try{localStorage.setItem($a,JSON.stringify({...e,at:Date.now()}))}catch(t){Kr.warn("Could not refresh the queue claim",t)}}function Vb(){let e=Cd();return!e||e.tab===_a()||e.key!==gn()?!0:Date.now()-e.at<=zb?!1:(Md(),!0)}function Jb(){return Object.fromEntries([...Pe].filter(([e])=>e!==Gr))}function Za(e){let t=typeof e=="string"?Te(e):e;if(!L(t))return!1;let o=!1;for(let[n,r]of Object.entries(t)){if(!Array.isArray(r))continue;let i=r.map(jb).filter(a=>a!=null);i.length&&(Pe.set(n,i),o=!0)}return o}function Zb(){if(!_.store.persistAcrossRefresh){sessionStorage.removeItem(Oe),oi(Oe);return}Za(sessionStorage.getItem(Oe))||Za(Rt(Oe))&&Yr()}function Yr(){try{if(!_.store.persistAcrossRefresh){sessionStorage.removeItem(Oe),oi(Oe);return}let e=Jb();sessionStorage.setItem(Oe,JSON.stringify(e)),Dt(Oe,e)}catch(e){Kr.warn("Could not save the queue",e)}}function $b(e){if(!(e.key!==Oe||!_.store.persistAcrossRefresh||e.newValue==null)){Pe.clear(),Za(e.newValue);try{sessionStorage.setItem(Oe,e.newValue)}catch(t){Kr.warn("Could not mirror the queue",t)}Ct(ae(),yo,_.store.showQueueMode)}}function kt(e){e.length?Pe.set(gn(),e):Pe.delete(gn()),Md(),Yr(),Ct(ae(),yo,_.store.showQueueMode)}function Xb(e){if(!e.model&&!e.label)return!0;let t=Be();return t?un(t,Xa(e)):!0}function kd(e,t=0){t>=Fr||H().generating||B()!==e||(On(),setTimeout(()=>kd(e,t+1),fn))}function _b(e,t){let o=e??ot;if(!o||!t.model&&!t.label||un(o,Xa(t))){Lt=!1;return}_.store.stickyOnNavigate&&(ot=o),clearTimeout(pn),pn=setTimeout(()=>Id(o),fn)}function hn(e,t=0,o=Be()){if(H().generating||B()){t<Fr&&setTimeout(()=>hn(e,t+1,o),fn);return}if(!Xb(e)&&t<Fr){Lt=!0,Wa(Xa(e)),setTimeout(()=>hn(e,t+1,o),fn);return}ce(e.text),Mo(()=>kd(e.text)),_b(o,e)}function qd(){if(Mt!=null){let o=Mt;Mt=null,hn(o);return}if(!mn||H().generating||B())return;if(!Vb()){mn=!1;return}let[e,...t]=ae();e!=null&&(mn=!1,kt(t),hn(e))}function Ld(e){let t=ae(),o=t[e];if(o!=null){if(kt(t.filter((n,r)=>r!==e)),!H().generating){hn(o);return}Mt=o,Ut()?.click()}}var yo={remove:e=>kt(ae().filter((t,o)=>o!==e)),edit:(e,t)=>kt(t.trim()?ae().map((o,n)=>n===e?{...o,text:t}:o):ae().filter((o,n)=>n!==e)),sendNow:Ld,move(e,t){let o=[...ae()],[n]=o.splice(e,1);n&&(o.splice(t,0,n),kt(o))}};function ey(e){let t=Be(),o={text:e,model:t?.id??"",label:t?.label??""},n=ae();return _.store.replacePending&&n.length?(kt([...n.slice(0,-1),o]),!0):n.length>=Kb?!1:(kt([...n,o]),!0)}function ty(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!ft(e.target)||!H().generating)return;let t=B(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;let o=Be();ce(""),Mt={text:t,model:o?.id??"",label:o?.label??""},Ut()?.click();return}if(!t){ae().length&&Ld(0);return}ey(t)&&ce("")}function oy(){if(Lt||!_.store.stickyOnNavigate)return;let e=Be();e&&(ot=e)}function Id(e){Lt=!0;let t=0,o=()=>{if(Wa(e)||t>=Fr){Lt=!1;return}t++,pn=setTimeout(o,fn)};clearTimeout(pn),o()}function ny(){_.store.stickyOnNavigate&&ot&&Id(ot)}function Td(e){let{target:t}=e;!(t instanceof Element)||Lt||t.closest(`${u.modelTrigger}, ${u.modelItem}`)&&setTimeout(oy,Qb)}var Bd=f({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:_,styles:wd,start(){bo=new AbortController,Zb(),ot=Be(),document.addEventListener("keydown",ty,{capture:!0,signal:bo.signal}),document.addEventListener("pointerup",Td,{signal:bo.signal}),document.addEventListener("keyup",Td,{signal:bo.signal}),Ed=[S.on("fall",({outcome:e})=>{mn=e==="done",e==="left"&&(Mt=null),qd()}),S.on("context",({prevId:e,id:t,migrated:o})=>{let n=Pe.get(Gr);Pe.delete(Gr),o&&!e&&t&&n&&Pe.set(t,n),o||(mn=!1,ny()),Yr(),Ct(ae(),yo,_.store.showQueueMode)}),S.on("tick",()=>{Wb(),qd(),Ct(ae(),yo,_.store.showQueueMode)})],addEventListener("storage",$b,{signal:bo.signal}),Ct(ae(),yo,_.store.showQueueMode)},stop(){bo?.abort(),clearTimeout(pn);for(let e of Ed)e();Ja(),Pe.clear(),Mt=null,ot=null,Lt=!1},onSettingsChange(e){e==="persistAcrossRefresh"&&Yr(),e==="stickyOnNavigate"&&_.store.stickyOnNavigate&&(ot=Be()),Ct(ae(),yo,_.store.showQueueMode)}});var Od=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

.bloom-root.bloom-recent-backdrop {
    position: fixed;
    inset: 0;
    z-index: var(--bloom-z-overlay);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    contain: content;
}

.bloom-recent-panel {
    --bloom-recent-card: clamp(8.5rem, calc((100vw - 4.25rem) / 5), 12.75rem);

    max-width: 100%;
    padding: 0.75rem;
    overflow: auto hidden;
    border: 1px solid var(--bloom-border);
    border-radius: 1rem;
    background: var(--bloom-surface);
    box-shadow: var(--bloom-shadow);
    scrollbar-width: none;
    animation: bloom-fade-in 0.09s ease-out;
}

.bloom-recent-list {
    display: grid;
    grid-template-columns: repeat(var(--bloom-recent-count, 5), var(--bloom-recent-card));
    gap: 0.5rem;
    width: max-content;
    padding: 0.125rem;
}

.bloom-recent-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: var(--bloom-recent-card);
    padding: 0.5rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    text-align: start;
    cursor: pointer;
    transition: border-color 0.14s ease;
}

.bloom-recent-item[aria-selected="true"] {
    border-color: var(--bloom-fg-2);
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--bloom-fg-2) 55%, transparent);
}

.bloom-recent-thumb {
    position: relative;
    width: 100%;
    overflow: hidden;
    border: 1px solid var(--bloom-border-light);
    border-radius: 0.1875rem;
    background: var(--bloom-surface-2);
    aspect-ratio: 16 / 9;
}

.bloom-recent-page {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem 0.75rem;
    overflow: hidden;
    background: var(--bloom-surface);
    pointer-events: none;
    user-select: none;
}

.bloom-recent-preview {
    display: -webkit-box;
    align-self: flex-start;
    max-width: 94%;
    overflow: hidden;
    color: var(--bloom-fg-2);
    font-size: 0.6875rem;
    line-height: 1.35;
    overflow-wrap: anywhere;
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    line-clamp: 4;
}

.bloom-recent-preview[data-role="user"] {
    align-self: flex-end;
    max-width: 78%;
    padding: 0.375rem 0.5625rem;
    border-radius: 0.875rem 0.875rem 0.25rem;
    background: var(--bloom-surface-2);
    color: var(--bloom-fg);
    -webkit-line-clamp: 2;
    line-clamp: 2;
}

.bloom-recent-fallback {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--bloom-fg-3);
}

.bloom-recent-fallback svg {
    width: 2.375rem;
    height: 2.375rem;
}

.bloom-recent-meta {
    display: grid;
    gap: 0.25rem;
    min-width: 0;
    padding: 0 0.25rem;
}

.bloom-recent-title {
    color: var(--bloom-fg);
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1.16;
}

.bloom-recent-project {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    min-width: 0;
    color: var(--bloom-fg-2);
    font-size: 0.6875rem;
    font-weight: 500;
    line-height: 1.18;
}

.bloom-recent-project svg {
    flex: none;
    width: 0.75rem;
    height: 0.75rem;
}

.bloom-recent-empty {
    min-width: min(22rem, calc(100vw - 3rem));
    padding: 1rem 1.25rem;
    color: var(--bloom-fg);
    font-size: 0.8125rem;
    font-weight: 500;
    line-height: 1.4;
}
`;var me=C("bloom-recent-"),Re="home",iy=50,Pd=140,ay=new Set(["Backquote"]),sy=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),w=g({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),nt=null,ve=[],Ee=0,es,Rd=[],zr=()=>Ce()?null:b()??(Ft()?Re:null);function Dd(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function Nd(e){let t=Et(e);t&&w.store.titles[e]!==t&&(w.store.titles={...w.store.titles,[e]:t});let o=jl(location.href);o&&e===b()&&w.store.projects[e]!==o&&(w.store.projects={...w.store.projects,[e]:o})}function Hd(e){if(!e)return;let t=[e,...w.store.visits.filter(n=>n!==e)].slice(0,iy),o=new Set(t);w.store.visits=t,Object.keys(w.store.previews).some(n=>!o.has(n))&&(w.store.previews=Dd(w.store.previews,o)),Object.keys(w.store.titles).some(n=>!o.has(n))&&(w.store.titles=Dd(w.store.titles,o)),e!==Re&&Nd(e)}function ly(e){if(!w.store.visits.includes(e))return;let{[e]:t,...o}=w.store.titles,{[e]:n,...r}=w.store.previews,{[e]:i,...a}=w.store.projects;w.store.visits=w.store.visits.filter(c=>c!==e),w.store.titles=o,w.store.previews=r,w.store.projects=a}function Qr(e){if(!e||!w.store.visits.includes(e))return;let t={},o=we(e)?.chain??[];for(let r of o)t[r.role]=qe(Yn(r),Pd);if(e===b())for(let r of We()){let i=Qt(r);i&&(t[r.role]=qe(i,Pd))}let n=w.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(w.store.previews={...w.store.previews,[e]:t})}function cy(){let e=Number(w.store.maxRecent);return w.store.visits.filter(t=>t!==Re||w.store.includeHome).slice(0,e)}function Ud(e){if(Ao(),e===zr())return;let t=e===Re?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"], [data-sidebar-destination="builtin:home"]'):ht(e)[0];t?t.click():location.assign(e===Re?"/":`/c/${e}`)}function uy(e){let t=e===Re?null:w.store.previews[e],o=t&&["user","assistant"].filter(n=>t[n]).map(n=>s("span",{class:me("preview"),attrs:{"data-role":n},text:t[n]}));return s("span",{class:me("thumb"),attrs:{"aria-hidden":"true"}},o?.length?s("span",{class:me("page")},...o):s("span",{class:me("fallback")},T(e===Re?"plus":"bloom")))}function dy(e,t){let o=e===Re?"New chat":w.store.titles[e]??Et(e)??"Untitled chat",n=e===Re?null:w.store.projects[e];return s("button",{class:me("item"),attrs:{type:"button",role:"option","aria-selected":String(t===Ee),"aria-label":n?`${o}, ${n}`:o},on:{click:()=>Ud(e),pointerenter:()=>t!==Ee&&vo(t)}},uy(e),s("span",{class:me("meta")},s("span",{class:`${me("title")} bloom-truncate`,text:o}),n&&s("span",{class:me("project")},T("folder"),s("span",{class:"bloom-truncate",text:n}))))}function Fd(){ve.length?Ud(ve[Ee]):Ao()}function vo(e){ve.length&&(Ee=(e+ve.length)%ve.length,nt?.querySelectorAll(`.${me("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===Ee))))}function my(){Qr(b());let e=zr();ve=cy(),e&&(ve=[e,...ve.filter(o=>o!==e)].slice(0,Number(w.store.maxRecent))),Ee=ve.length>1?1:0;let t=ve.length?s("div",{class:me("list"),attrs:{role:"listbox","aria-label":"Recent chats"}},...ve.map(dy)):s("div",{class:me("empty"),text:"Open a few chats, then hold Ctrl+` to switch."});t.style.setProperty("--bloom-recent-count",String(ve.length)),nt=s("div",{class:`bloom-root ${me("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:o=>o.target===o.currentTarget&&Ao()}},s("div",{class:me("panel")},t)),he(nt)}function Ao(){nt?.remove(),nt=null}var fy=e=>ay.has(e.code)||sy.has(e.key);function py(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&fy(e)){e.preventDefault(),e.stopPropagation(),nt?vo(Ee+(e.shiftKey?-1:1)):my();return}if(!nt)return;let o={Escape:Ao,Enter:Fd,ArrowRight:()=>vo(Ee+1),ArrowDown:()=>vo(Ee+1),ArrowLeft:()=>vo(Ee-1),ArrowUp:()=>vo(Ee-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function gy(e){nt&&e.key==="Control"&&Fd()}var Gd=f({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:w,styles:Od,start(){es=new AbortController;let{signal:e}=es;addEventListener("keydown",py,{capture:!0,signal:e}),addEventListener("keyup",gy,{capture:!0,signal:e}),addEventListener("blur",Ao,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&Qr(b()),{signal:e}),Rd=[ge(({prevId:i})=>{Qr(i),Hd(zr())}),V.on("conversation",({id:i})=>{w.store.visits.includes(i)&&Nd(i),Qr(i)}),V.on("conversation-missing",({id:i})=>ly(i))];let{visits:t,titles:o,previews:n}=w.store,r=t.filter(i=>i!==Re&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(w.store.visits=t.filter(i=>!r.includes(i))),Hd(zr())},stop(){es?.abort();for(let e of Rd)e();Ao()}});var ts="data:audio/mpeg;base64,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";var Yd=new E("ResponseNotification"),hy=.5,Kd="BloomNoticeClaim",by=3e4,bn=g({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:e=>(e.append(N("Preview",Vd)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),Qd=null,os=new Map,zd=[],ns,yy=e=>Uint8Array.from(atob(e.slice(e.indexOf(",")+1)),t=>t.charCodeAt(0)).buffer;function vy(e,t){let o=os.get(t);return o||(o=(t.startsWith("data:")?Promise.resolve(yy(t)):wn(t)).then(n=>e.decodeAudioData(n)),o.catch(()=>os.delete(t)),os.set(t,o)),o}async function jd(e){Qd??=new AudioContext;let t=Qd;t.state==="suspended"&&t.resume();let o=t.createBufferSource(),n=t.createGain();o.buffer=await vy(t,e),n.gain.value=hy,o.connect(n).connect(t.destination),o.start()}function Vd(){let e=bn.store.soundUrl.trim();jd(e||ts).catch(t=>{Yd.warn("Sound failed",t),e&&jd(ts).catch(o=>Yd.warn("Default chime failed",o))})}function Ay(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function wy(e){let t=Te(Rt(Kd)??"");return e&&L(t)&&t.id===e&&Date.now()-Number(t.at)<by?!1:(Dt(Kd,{id:e,at:Date.now()}),!0)}function Wd(e){bn.store.onlyWhenHidden&&!document.hidden||wy(e)&&(bn.store.sound&&Vd(),bn.store.browserNotification&&Ay(Et(e)))}function Sy(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(ns=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:ns.signal}))}var Jd=f({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply, including chats you left while they were answering.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:bn,start(){Sy(),zd=[S.on("fall",({conversationId:e,outcome:t})=>t==="done"&&Wd(e)),S.on("background",({conversationId:e})=>Wd(e))]},stop(){for(let e of zd)e();ns?.abort()}});var xy=`:is(${u.sidebarScroll}, :has(> ${u.sidebarScroll})) + :has(${u.menuButton})`,Ey=`${u.rail} > :has(${u.menuButton})`,is=`:is(${xy}, ${Ey}, ${u.oldProfile}):not(:hover)`,rs="[data-bloom-profile-avatar]",qy=`:is(${is}, ${is} :has(${rs})) > :not(${rs}, :has(${rs}))`,$d=g({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function Ty(){let{opacity:e,fadeAvatar:t}=$d.store;return e>=100?"":`${t?is:qy}{opacity:${e/100}!important}`}var Zd,Xd=f({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:$d,styles:Ty,start(){Zd=ke()},stop(){Zd?.()}});var _d=`/*
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
    z-index: var(--bloom-z-float);
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
`;var G=C("bloom-star-chats"),My=80,ky=60,Ly=1200,Iy=120,yn=g({replaceReadAloud:{type:"boolean",description:"Put the star where the reply's Read aloud button is, and hide that button.",default:!0},messages:{type:"custom",default:[]}}),By=`:is(${u.turnActions}) ${u.readAloud}`,as,ss=!1,rt=!1,Bt=!1,jr=0,X=null,Wr="",R=null,ls,it;function us(){let e=yn.store.messages;return Array.isArray(e)?e.filter(t=>L(t)&&typeof t.conversationId=="string"&&typeof t.messageId=="string"&&(t.role==="user"||t.role==="assistant")&&typeof t.snippet=="string"&&typeof t.starredAt=="number"):[]}function ds(){let e=b();return e?us().filter(t=>t.conversationId===e):[]}function Oy(e,t){return us().some(o=>o.conversationId===e&&o.messageId===t)}function em(e){let t=us(),o=t.some(n=>n.conversationId===e.conversationId&&n.messageId===e.messageId);yn.store.messages=o?t.filter(n=>!(n.conversationId===e.conversationId&&n.messageId===e.messageId)):[{...e,starredAt:Date.now()},...t].slice(0,My)}function cs(e){return e.messageIds[0]||e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.el.getAttribute("data-turn-key")||""}function Py(e){return qe(Qt(e)||y(e.el.textContent??""),ky)}function Ry(e){let t=e.closest(u.turn);if(!t)return null;let o=We().filter(n=>t.contains(n.el));return o.find(n=>n.el.contains(e)||n.el===t)??o.findLast(n=>n.el.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING)??null}function Dy(){let e=[...document.querySelectorAll(u.turnActions)].filter(t=>!t.closest(`[data-bloom], [role="dialog"], [inert], pre, ${u.sidebars}`));return e.filter(t=>!e.some(o=>o!==t&&o.contains(t)))}function Hy(e,t){let o=yn.store.replaceReadAloud?t.querySelector(u.readAloud):null;if(o&&!o.closest("[data-bloom]")){e.nextElementSibling!==o&&o.before(e);return}let n=Ny(t);(e.parentElement!==n||n.lastElementChild!==e)&&n.append(e)}function Ny(e){let t=[...e.querySelectorAll("button")].filter(n=>n.dataset.bloom!=="message-star"&&!n.closest("[data-bloom]"));return t.length?[...e.children].find(n=>n instanceof HTMLElement&&n!==t[0]&&t.every(r=>n.contains(r)))??e:e}function Uy(){return[...document.querySelectorAll(u.headerMore)].filter(t=>{if(t.dataset.bloom==="message-star"||t.closest("[data-bloom], [role='dialog'], [inert]")||t.closest(u.sidebars))return!1;let o=t.getBoundingClientRect();return o.width===0&&o.height===0?!!t.closest("header, #page-header"):o.top>=0&&o.top<96&&o.left>window.innerWidth*.5}).toSorted((t,o)=>o.getBoundingClientRect().left-t.getBoundingClientRect().left||(t.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1))[0]??null}function tm(e,t,o){return s("button",{class:t,attrs:{type:"button","aria-label":e},on:{pointerdown:n=>n.stopPropagation(),mousedown:n=>n.stopPropagation(),click:n=>{n.preventDefault(),n.stopPropagation(),o(n)}}},T("star"))}function Fy(e,t){e.setAttribute("aria-pressed",String(t)),e.setAttribute("aria-label",t?"Unstar":"Star")}function Vr(){return rt||Bt}function wo(){jr&&window.clearTimeout(jr),jr=0}function So(){rt=!1,Bt=!1,wo(),it?.enter(),X?.remove(),X=null,Wr="",R?.classList.remove(G("-open")),R?.setAttribute("aria-expanded","false")}function Jr(e){return e instanceof Node&&!!(R?.contains(e)||X?.contains(e))}function Gy(e){e.classList.add(G("-flash")),window.setTimeout(()=>e.classList.remove(G("-flash")),Ly)}function Yy(e){let t=We().find(n=>cs(n)===e),o=t?.el.closest(u.turn)??t?.el;o&&(o.scrollIntoView({block:"start"}),Gy(o))}function Ky(){let e=b(),t=new Set,o=[...document.querySelectorAll('[data-bloom="message-star"][data-place="action"]')];if(!e||Ce()){for(let n of o)n.remove();return}for(let n of Dy()){if(!Se(n))continue;let r=Ry(n),i=r?cs(r):"";if(!r||!i)continue;let a=n.querySelector('[data-place="action"]');(!a||a.dataset.id!==i)&&(a?.remove(),a=tm("Star",G("-star"),()=>{let c=b(),l=We().find(d=>cs(d)===i);!c||!l||em({conversationId:c,messageId:i,role:l.role,snippet:Py(l)})}),a.dataset.bloom="message-star",a.dataset.place="action",a.dataset.id=i),Fy(a,Oy(e,i)),Hy(a,n),t.add(a)}for(let n of o)t.has(n)||n.remove()}function Qy(){if(!X||!R)return;let e=R.getBoundingClientRect(),t=X.offsetWidth||288,o=X.offsetHeight||120,n=e.bottom+6;n+o>window.innerHeight-8&&(n=Math.max(8,e.top-o-6));let r=Math.max(8,Math.min(e.right-t,window.innerWidth-t-8));X.dataset.place=n>=e.bottom?"below":"above",X.style.left=`${Math.round(r)}px`,X.style.top=`${Math.round(n)}px`}function zy(){if(!Vr()||!R){X?.remove(),X=null,Wr="",R?.classList.remove(G("-open")),R?.setAttribute("aria-expanded","false");return}let e=ds(),t=e.map(o=>`${o.messageId}	${o.snippet}`).join(`
`);if(!X||Wr!==t){X?.remove();let o=e.map(n=>s("div",{class:G("-row")},s("button",{class:G("-jump"),attrs:{type:"button"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),So(),Yy(n.messageId)}}},s("span",{class:G("-role"),text:n.role==="user"?"You":"ChatGPT"}),s("span",{class:G("-snip"),text:n.snippet||"Message"})),tm("Unstar",G("-unstar"),()=>em(n))));X=s("div",{class:`bloom-root ${G("-panel")}`,attrs:{"data-bloom":"star-list"},on:{pointerenter:()=>{wo(),it?.enter(),Bt=!0},pointerleave:n=>{Jr(n.relatedTarget)||rt||it?.leave(n)}}},s("div",{class:G("-bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:G("-head"),text:"Starred"}),s("div",{class:G("-body")},...o.length?o:[s("div",{class:G("-empty"),text:"No starred messages in this chat"})])),document.body.append(X),Wr=t}Qy(),R.classList.add(G("-open")),R.setAttribute("aria-expanded","true")}function jy(){for(let r of document.querySelectorAll('[data-bloom="starred"]'))r.remove();let e=Uy(),t=e?.parentElement??null,o=b();if(!e||!t||t.closest(u.sidebars)||!o||Ce()||!Se(t)){R?.remove(),R=null,So();return}R||(R=s("button",{class:G("-toggle"),attrs:{type:"button","data-bloom":"message-star","data-place":"header","aria-label":"Starred messages","aria-expanded":"false"},on:{pointerdown:r=>r.stopPropagation(),pointerenter:()=>{wo(),it?.enter(),jr=window.setTimeout(()=>{Bt=!0,It()},Iy)},pointerleave:r=>{Jr(r.relatedTarget)||(wo(),Vr()&&it?.leave(r))},click:r=>{r.preventDefault(),r.stopPropagation(),rt=!rt,Bt=rt,wo(),rt||So(),It()}}},T("star"))),(R.parentElement!==t||R.nextElementSibling!==e)&&e.before(R);let n=e.getBoundingClientRect();n.width>0&&(R.style.width=`${n.width}px`,R.style.height=`${n.height}px`),R.classList.toggle(G("-here"),ds().length>0),zy()}function Wy(){let e=new Set(ds().map(t=>t.messageId));for(let t of document.querySelectorAll('[data-bloom="navigator"] .bloom-nav-tick, [data-bloom="navigator"] .bloom-nav-row'))t.classList.toggle(G("-mark"),!!t.dataset.messageId&&e.has(t.dataset.messageId))}function It(){if(!ss){ss=!0;try{for(let e of document.querySelectorAll('[data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();Ky(),jy(),Wy()}finally{ss=!1}}}function Vy(){So(),R?.remove(),R=null;for(let e of document.querySelectorAll('[data-bloom="message-star"], [data-bloom="star-list"], [data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();for(let e of document.querySelectorAll(`.${G("-mark")}`))e.classList.remove(G("-mark"))}var om=f({name:"StarChats",description:"Star a message from its toolbar. The star left of the top-right menu opens this chat's list.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:yn,styles:()=>`${_d}${yn.store.replaceReadAloud?Ke([By]):""}`,onSettingsChange(e){(e==="messages"||e==="replaceReadAloud")&&It()},start(){for(let o of document.querySelectorAll('[data-bloom="star-list"]'))o.remove();it=nr({over:Jr,trigger:()=>R,panel:()=>X,setHeld(o){if(o){Bt=!0,It();return}rt||(Bt=!1,It())}}),as=M(o=>Y(o)&&It());let e=o=>{Jr(o.target)||Vr()&&So()};document.addEventListener("pointerdown",e,!0);let t=o=>{o.key!=="Escape"||!Vr()||(o.preventDefault(),So())};document.addEventListener("keydown",t,!0),ls=()=>{document.removeEventListener("pointerdown",e,!0),document.removeEventListener("keydown",t,!0)},It()},stop(){as?.(),as=void 0,ls?.(),ls=void 0,wo(),it?.dispose(),it=void 0,Vy()}});var nm="filter:blur(6px)!important;transition:filter 0.2s ease",rm=`:is(${u.sidebars})`,Ot="data-bloom-streamer-open",Jy="[data-app-action-sidebar-thread-row], [data-app-action-sidebar-project-row], .bloom-recent-item";function Zy(){return{conversations:{selectors:[`${rm} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0,row:"[data-app-action-sidebar-thread-row]"},projects:{selectors:[`${rm} a:is([href*="/project"], [href*="/g/g-p-"])`,"[data-app-action-sidebar-project-row]",".bloom-recent-project"],hover:!0,row:"[data-app-action-sidebar-project-row]"},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}}}var im=g({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function $y(e,t){let o=[`:is(${e}):hover`,`.bloom-recent-item:hover :is(${e})`,`:is(${e})[${Ot}]`];return t&&o.push(`${t}:hover`,`${t}:hover :is(${e})`,`${t}:is(${e}):hover`,`${t}[${Ot}]`,`${t}[${Ot}] :is(${e})`),o.join(",")}function Xy(){let e=Zy();return Object.entries(e).filter(([t])=>im.store[t]).map(([,t])=>{let o=t.selectors.join(",");if(!t.hover)return`:is(${o}){${nm}}`;let n="row"in t?t.row:void 0;return`:is(${o}){${nm}}${$y(o,n)}{filter:none!important}`}).join(`
`)}function _y(e,t){for(let o of document.elementsFromPoint(e,t))if(o instanceof Element){let n=o.closest(Jy);if(n)return n}return null}function ps(e){for(let t of document.querySelectorAll(`[${Ot}]`))t!==e&&t.removeAttribute(Ot);e&&!e.hasAttribute(Ot)&&e.setAttribute(Ot,"")}var xo,ev=Qe(()=>{xo&&ps(_y(xo.clientX,xo.clientY))});function ms(e){xo=e,ev()}function tv(e){e.relatedTarget instanceof Node&&document.documentElement.contains(e.relatedTarget)||(xo=void 0,ps(null))}var fs,Zr,am=f({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:im,styles:Xy,start(){fs=ke(),Zr=new AbortController;let e={capture:!0,signal:Zr.signal,passive:!0};document.addEventListener("pointerover",ms,e),document.addEventListener("pointermove",ms,e),document.addEventListener("pointerout",ms,e),window.addEventListener("pointerleave",tv,e)},stop(){Zr?.abort(),Zr=void 0,xo=void 0,ps(null),fs?.(),fs=void 0}});var lm=g({openNewAsTemporary:{type:"boolean",description:"Open New chat as a temporary chat.",default:!1}}),ov=/^(?:new chat|新聊天)$/i,$r;function nv(e){return e?"/?temporary-chat=true":"/"}function rv(e){let t=nv(e);`${location.pathname}${location.search}`===t||e&&Ce()&&location.pathname==="/"||location.assign(t)}function iv(e){if(e.closest("[data-bloom]"))return!1;try{let t=new URL(e.href,location.origin);return t.origin===location.origin&&t.pathname==="/"}catch{return!1}}function av(e){return e.closest("[data-bloom], [data-app-action-sidebar-project-row]")?!1:ov.test(e.getAttribute("aria-label")??y(e.textContent??""))}function sv(e){if(!lm.store.openNewAsTemporary||Ce())return;let{target:t}=e;if(!(t instanceof Element))return;let o=t.closest("a[href], button"),n=o instanceof HTMLAnchorElement?iv(o):!!o&&av(o);!o||!n||o.closest(`${u.sidebarScroll}, ${u.rail}, ${u.oldSidebar}, nav`)&&(e.preventDefault(),e.stopPropagation(),rv(!0))}function sm(){for(let e of document.querySelectorAll('[data-bloom="temporary-chat"]'))e.remove()}var cm=f({name:"TemporaryChat",description:"Optionally open New chat as a temporary chat. No extra sidebar button.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"ghost",enabledByDefault:!0,settings:lm,start(){sm(),$r=new AbortController,document.addEventListener("pointerdown",sv,{capture:!0,signal:$r.signal})},stop(){$r?.abort(),$r=void 0,sm()}});var at=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)','[data-turn-key] [data-message-author-role="user"] blockquote:not(.twitter-tweet)','[class~="group/user-message"] blockquote:not(.twitter-tweet)'].join(","),gs=g({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function lv(){let e=[`${at}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${at}>*{margin-block:0!important}`];return gs.store.italic||e.push(`${at}{font-style:inherit!important}`),gs.store.quotes||(e.push(`${at}{quotes:none!important}`),e.push(`${at}::before,${at}::after,${at} p::before,${at} p::after{content:none!important}`)),e.join(`
`)}var um=f({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:gs,styles:lv});var cv=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],uv=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",dv='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',dm=g({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function mv(){let e=`${dm.store.width}rem`;return`:is(${uv}){${cv.map(t=>`${t}:${e}!important`).join(";")}}:is(${dv}){max-width:min(100%, ${e})!important}`}var mm=f({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:dm,styles:mv});var fv=[wc,ec,Fc,Jc,Xc,cu,mu,fu,gu,xu,Ou,Gu,Wu,ud,md,fd,yd,Bd,Gd,Jd,Xd,om,am,cm,um,mm],hs=fv;var pv=new E("Bloom"),fm="2.0.112";var bs=0,Xr;function gv(){bs++,Xr?.(),Xr=void 0,$s(),To(),xn()}async function ys(){let e=++bs,t=()=>e===bs;To(),xn(),ul();for(let o of hs)o.updatedAt=Ol[o.name];Us(hs),Rs(),Gs(),indexedDB.deleteDatabase("bloompp"),Pt("base",_s),Ml(),In("Init"),Dn().then(()=>{t()&&(Ts(),In("DOMContentLoaded"))}),await ml(),t()&&(In("HostReady"),Xr?.(),Xr=Bl(),Zs(),pv.info(`Bloom++ ${fm} ready`))}var hv=new E("Boot");window===window.top&&(Ms(oe.Bloom),ks(vs),ys().catch(e=>hv.error("Startup failed",e)));})();
