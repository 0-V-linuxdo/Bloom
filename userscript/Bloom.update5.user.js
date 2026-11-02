// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.120
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

/* Bloom++ v2.0.120. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var im=Object.defineProperty;var am=(e,t)=>{for(var o in t)im(e,o,{get:t[o],enumerable:!0})};var q=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var pe=(e,t,o)=>Math.min(o,Math.max(t,e)),O=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),vo=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,qe=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,y=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function bn(e,t){return`${e} ${t}${e===1?"":"s"}`}async function yn(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function Ee(e){try{return JSON.parse(e)}catch{return}}var oe=typeof unsafeWindow>"u"?window:unsafeWindow,sm=200,lm=300;function vn(e){return new Promise((t,o)=>GM_xmlhttpRequest({url:e,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=sm&&n<lm?t(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var cm=new q("Styles"),Ke=new Map,Ao=new Set,ct=new Map,$r=!0,hs=e=>e.replaceAll(/[^A-Za-z0-9_-]/g,"_"),um=e=>`:where(:root){--bloom-sheet-${hs(e)}:1}`,dm=(e,t)=>`${um(e)}${t}`,bs=e=>`bloom-style-${e}`;function ys(e){try{return[...e.cssRules].map(t=>t.cssText).join(`
`)}catch{return""}}function mm(e,t){let o=ys(e);return o?o.includes(`--bloom-sheet-${hs(t)}`)?!0:t==="plugin-StreamerMode"?o.includes("blur(6px)")&&(o.includes("data-app-action-sidebar-thread-title")||o.includes("data-bloom-streamer-open")):t==="plugin-WiderChat"?o.includes("--composer-adjacent-max-width")&&o.includes("--thread-content-max-width"):t==="plugin-ComposerOpacity"?o.includes("--composer-layout-surface-backdrop-filter")||o.includes("--composer-layout-surface-background")&&o.includes("color-mix"):!1:!1}function vs(e){let t=ys(e);return t?!!(t.includes("--bloom-")||t.includes(".bloom-")||t.includes("[data-bloom")||t.includes("--bloom-sheet-")||t.includes("blur(6px)")&&t.includes("data-app-action-sidebar-thread-title")||t.includes("--composer-adjacent-max-width")&&t.includes("--thread-content-max-width")||t.includes("--composer-layout-surface-backdrop-filter")):!1}function As(){let e=document.adoptedStyleSheets.filter(t=>!Ao.has(t)&&!vs(t));document.adoptedStyleSheets=[...e,...Ke.values()]}function ws(e){document.readyState==="loading"||e.parentNode===document.head||document.head.append(e)}function fm(e,t){let o=ct.get(e);o||(o=document.createElement("style"),o.id=bs(e),ct.set(e,o)),o.textContent!==t&&(o.textContent=t),ws(o)}function Bt(e,t){let o=dm(e,t);if($r)try{let n=Ke.get(e);n||(n=new oe.CSSStyleSheet,Ke.set(e,n),Ao.add(n)),n.replaceSync(o),As();return}catch(n){cm.warn("Constructed style sheets unavailable, using <style> after parsing",n),$r=!1;let r=Ke.get(e);r&&Ao.delete(r),Ke.delete(e)}fm(e,o)}function wo(e){let t=Ke.get(e);t&&(Ao.delete(t),Ke.delete(e)),ct.get(e)?.remove(),ct.delete(e);for(let o of document.querySelectorAll(`style[id="${bs(e)}"]`))o.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(o=>o!==t&&!mm(o,e)),$r&&As()}catch{}}function xo(){Ke.clear(),Ao.clear();for(let e of ct.values())e.remove();ct.clear();for(let e of document.querySelectorAll("style[id^='bloom-style-']"))e.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(e=>!vs(e))}catch{}}function xs(){for(let e of ct.values())ws(e)}var k=e=>(...t)=>t.map(o=>e+o).join(" "),An=(...e)=>e.filter(Boolean).join(" "),Qe=e=>e.length?`${e.map(t=>`${t}:not([data-bloom])`).join(",")}{display:none!important}`:"";var Ss="__bloomHost",Xr=new q("Boot"),pm=['[data-bloom="navigator"]','[data-bloom="settings"]','[data-bloom="history-hud"]','[data-bloom="history-dialog"]','[data-bloom="star-list"]','[data-bloom="entry"]','[data-bloom="menu-entry"]','[data-bloom="menu-flyout"]','[data-bloom="message-star"]','[data-bloom="starred"]','[data-bloom="chat-star"]','[data-bloom="queue"]','[data-bloom="recent"]','[data-bloom="quote-chip"]','[data-bloom="quote-back"]','[data-bloom="cls"]','[data-bloom="timestamp"]','[data-bloom="tooltip"]','[data-bloom="notices"]'].join(", "),gm=["data-bloom-greeting","data-bloom-placeholder","data-bloom-streamer-open","data-bloom-share","data-bloom-invite","data-bloom-csi-avatar","data-bloom-csi-sized"];function wn(){if(!(typeof document>"u"||!document.documentElement)){for(let e of document.querySelectorAll(pm))e.remove();for(let e of gm)for(let t of document.querySelectorAll(`[${e}]`))t.removeAttribute(e);for(let e of document.querySelectorAll("[data-bloom-text]"))e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size"),e.style.removeProperty("--bloom-text")}}function hm(e){if(Xr.warn("Replacing another Bloom++ instance",e.VERSION),e.destroy){e.destroy();return}for(let t of e.plugins?.values()??[]){try{t.stop?.()}catch(o){Xr.error("Failed to stop previous plugin",o)}t.styles="",t.start=void 0}xo()}function qs(e){let t=oe,o=new Set;for(let n of[e,t.Bloom,t[Ss]])if(!(!n||o.has(n))){o.add(n);try{hm(n)}catch(r){Xr.error("Failed to retire Bloom++",r)}}wn()}function Es(e){let t=oe;try{delete t.Bloom}catch{}Object.defineProperty(t,"Bloom",{value:e,configurable:!0,writable:!0}),Object.defineProperty(t,Ss,{value:e,configurable:!0,writable:!0})}var gs={};am(gs,{VERSION:()=>rm,destroy:()=>Xy,init:()=>ps,plugins:()=>Z});var bm=new q("Dom");function s(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var Ts=document.createElement("template");function Cs(e){return Ts.innerHTML=e.trim(),Ts.content.firstElementChild.cloneNode(!0)}var ut=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),J=(e,t=document)=>[...t.querySelectorAll(e)].find(ut)??null,ym=16,vm="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function qn(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([vm],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function qo(e){document.hidden?setTimeout(e,ym):requestAnimationFrame(e)}function ze(e){let t=!1;return()=>{t||(t=!0,qo(()=>{t=!1;try{e()}catch(o){bm.error("Scheduled task failed",o)}}))}}var xn=new Set,Sn=[],So,Am=ze(()=>{let e=Sn;Sn=[];for(let t of xn)t(e)});function I(e){return xn.add(e),So||(So=new MutationObserver(t=>{Sn.push(...t),Am()}),So.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{xn.delete(e),!xn.size&&(So?.disconnect(),So=void 0,Sn=[])}}var wm=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),W=e=>!e.length||e.some(t=>!wm(t.target)),xm=e=>`"${e.replaceAll("\\","\\\\").replaceAll('"','\\"').replaceAll(`
`,"\\A ")}"`;function dt(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size"),e.style.removeProperty("--bloom-text");return}e.style.setProperty("--bloom-text",xm(t)),e.getAttribute("data-bloom-text")!==t&&e.setAttribute("data-bloom-text",t)}function p(e){return e}var Ms=new q("Storage");function Ot(e){try{return localStorage.getItem(e)??void 0}catch{return}}function Pt(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(o){Ms.warn("localStorage write failed",o)}}function _r(e){try{localStorage.removeItem(e)}catch(t){Ms.warn("localStorage delete failed",t)}}function ks(e,t){addEventListener("storage",o=>{o.key===e&&t(o.newValue)})}var ei="BloomSettings",Sm=100,je={plugins:{}},En=new Set,ti=new Set,Rt;function Ls(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=Ee(t);return!O(t)||!O(t.plugins)||!Object.keys(t.plugins).length?null:t}function Is(){let e=Ls(Ot(ei));e&&(je.plugins=e.plugins)}var Bs=(e,t)=>`${e}
${t}`;function oi(){Rt=void 0,ti.clear(),Pt(ei,je)}function qm(e){let t=Ls(e);if(!t)return;let o=[];for(let n of new Set([...Object.keys(je.plugins),...Object.keys(t.plugins)])){let r=je.plugins[n]??={},i=O(t.plugins[n])?t.plugins[n]:{};for(let a of new Set([...Object.keys(r),...Object.keys(i)]))ti.has(Bs(n,a))||JSON.stringify(r[a])===JSON.stringify(i[a])||(i[a]===void 0?delete r[a]:r[a]=i[a],o.push([n,a]))}for(let[n,r]of o)for(let i of En)i(n,r)}function ni(){Rt&&(clearTimeout(Rt),oi())}function Os(e){let t=Object.keys(je.plugins).filter(o=>!e.has(o));if(!t.length)return t;for(let o of t)delete je.plugins[o];return clearTimeout(Rt),oi(),t}var ne=(e,t)=>je.plugins[e]?.[t];function se(e,t,o){let n=je.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,ti.add(Bs(e,t)),clearTimeout(Rt),Rt=setTimeout(oi,Sm);for(let r of En)r(e,t)}function Dt(e){return En.add(e),()=>void En.delete(e)}function ri(e){return e.type==="component"?void 0:e.default}function h(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>ne(t.pluginName,n)??(e[n]&&ri(e[n])),set:(o,n,r)=>(se(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&ne(t.pluginName,o)!==void 0&&se(t.pluginName,o)}};return t}var Ps=e=>{let t=()=>{let o=ne("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();se("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},Tn=Ps("pinnedPlugins"),Cn=Ps("starredPlugins");addEventListener("pagehide",ni);ks(ei,qm);var Co=new q("PluginManager"),Z=new Map,mt=new Set,ai=new Set,ii=new Set,Eo=new Map,Em=2880*60*1e3;function Rs(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),Z.set(t.name,t)}var Ds=()=>{let e=ne("Settings","knownPlugins");return O(e)?e:null};function Hs(){let e=Os(new Set(Z.keys()));e.length&&Co.info(`Dropped settings of removed plugins: ${e.join(", ")}`);let t=Ds(),o=Date.now(),n={...t},r=[...Z.values()].filter(i=>!i.hidden&&!i.required&&!(i.name in n));for(let i of r)n[i.name]=t?o:0;for(let i of Object.keys(n))Z.has(i)||delete n[i];JSON.stringify(n)!==JSON.stringify(t)&&se("Settings","knownPlugins",n)}var Ns=e=>{let t=Ds()?.[e];return!!t&&Date.now()-t<Em},Us=e=>Eo.get(e);function Fs(){for(let e of ii)e()}function Gs(e,t){let o=Eo.get(e);(t?o?.join(`
`)===t.join(`
`):!o)||(t?Eo.set(e,t):Eo.delete(e),Fs())}var We=e=>!!e.required||(ne(e.name,"enabled")??!!e.enabledByDefault);var To=e=>`plugin-${e.name}`;function Ys(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?Bt(To(e),t):wo(To(e))}function Tm(e){if(!mt.has(e.name))try{Ys(e),e.start?.(),mt.add(e.name)}catch(t){wo(To(e)),Co.error(`Failed to start ${e.name}`,t)}}function si(e){mt.delete(e.name),wo(To(e));try{e.stop?.()}catch(t){Co.error(`Failed to stop ${e.name}`,t)}}var Ks=e=>e.startAt??"HostReady";function Qs(e){if(We(e)){ai.has(Ks(e))&&Tm(e);return}si(e)}function kn(e){ai.add(e);for(let t of Z.values())Ks(t)===e&&Qs(t);Co.info(`${e}: ${[...mt].join(", ")}`)}function zs(e,t){se(e.name,"enabled",t),ni()}function Cm(){for(let e of Z.values())e.required||We(e)||(mt.has(e.name)?si(e):wo(To(e)))}var Mn;function js(){Mn?.(),Mn=I(()=>Cm())}function Ws(){Mn?.(),Mn=void 0;for(let e of Z.values())si(e);mt.clear(),ai.clear(),Eo.clear()}function Vs(e){return ii.add(e),()=>void ii.delete(e)}Dt((e,t)=>{let o=Z.get(e);if(o){if(t==="enabled"){typeof ne(e,"enabled")=="boolean"&&Qs(o),Fs();return}if(mt.has(e))try{Ys(o),o.onSettingsChange?.(t)}catch(n){Co.error(`Settings change failed for ${e}`,n)}}});var Js=`/*
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
`;var km=new q("Events");function Ln(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){km.error(`Listener for ${String(t)} failed`,r)}}}}var u={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',sidebarConversationRow:"[data-sidebar-chatgpt-conversation-key]",sidebarIndicator:"[data-sidebar-indicator]",timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',readAloud:'button:is([aria-label="Read aloud" i], [aria-label^="Read aloud" i], [aria-label="Stop reading" i], [aria-label^="Stop reading" i], [aria-label="\u6717\u8BFB"], [aria-label^="\u6717\u8BFB"], [aria-label="\u505C\u6B62\u6717\u8BFB"], [data-testid*="read-aloud" i])',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',composerConversation:"[data-above-composer-conversation-id]",oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",modelTrigger:'[data-testid="model-switcher-dropdown-button"], button[aria-label="Model selector" i], button[aria-label="Select ChatGPT model" i]',modelItem:'[role="menu"] [data-testid^="model-switcher-"], [role="menuitem"][data-testid^="model-switcher-"], [role="menu"] [role="menuitemradio"], [role="menu"] [data-reasoning-slider]',effortSlider:'[role="menu"] [data-reasoning-slider]',homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]',headerMore:'button[aria-label="More" i], button[aria-label="\u66F4\u591A"]',rightPanel:"aside[data-app-shell-focus-area='right-panel']",summaryPanel:"[data-summary-panel-variant]"};var Zs=/[​-‍﻿]/g,ge=()=>J(u.composerInput),ft=e=>e instanceof HTMLElement&&e.matches(u.composerInput),X=(e=ge())=>e?.closest("form")??document.querySelector(u.oldComposerForm);function B(e=ge()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(Zs,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(Zs,"").trim()}var Lm=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function ce(e,t=ge()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return Lm?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function $s(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:a,value:c}=e;return{first:!c.slice(0,i).includes(`
`),last:!c.slice(a).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var Xs=e=>{let t=X();return(t&&J(e,t))??J(e)},Ht=()=>Xs(u.stopButton),Im=()=>{let e=Xs(u.sendButton);return e&&!e.matches(u.stopButton)?e:null};function In(){let e=Im();if(e){e.disabled||e.click();return}ge()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var _s=()=>ut(Ht());var ol=new q("Network"),Bm=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,Om=404,Pm=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,On=1e3,Rm=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),V=Ln(),ci=new Map,el=new Map,Dm=1,we=e=>e?ci.get(e)??null:null,di=e=>e!=null;function Bn(e){let t=ci.get(e);return t||ci.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var nl=e=>e==="user"||e==="assistant";function rl(e){let t=e.author?.role;if(!e.id||!nl(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(l=>typeof l=="string").join(`
`).trim(),i=n.filter(l=>O(l)&&l.content_type==="image_asset_pointer").length,a=e.metadata?.attachments,c=Array.isArray(a)&&a.length>0;return!r&&!i&&!c?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*On:null,text:r,hasFiles:c,imageCount:i}}var il=e=>e.filter((t,o)=>t.role==="user"||e[o+1]?.role!=="assistant"),ui=e=>e.map(t=>t.createTime).filter(t=>t!=null);function Hm(e,t){let o=ui(e),n=ui(t);return!o.length||!n.length?!1:Math.max(...o)<Math.min(...n)}function Nm(e){let t=ui(e);if(t.length<2)return e;let[o]=t,n=o-e.length;return e.map((i,a)=>(i.createTime!=null&&(n=i.createTime),{message:i,index:a,time:i.createTime??n})).toSorted((i,a)=>i.time-a.time||i.index-a.index).map(i=>i.message)}function Um(e,t){let o=t.filter(O).map(c=>O(c.message)?c.message:c);for(let c of o)c.id&&c.create_time&&e.times.set(c.id,c.create_time*On);let n=o.map(rl).filter(c=>c!=null),r=new Set(n.map(c=>c.id)),i=e.chain.filter(c=>!r.has(c.id)),a=Hm(n,i)?[...n,...i]:[...i,...n];return e.chain=il(Nm(a)),e}function Fm(e,t){if(!O(t)||!(O(t.mapping)||Array.isArray(t.messages)))return null;let o=Bn(e);if(typeof t.title=="string"&&t.title&&(o.title=t.title),Array.isArray(t.messages))return Um(o,t.messages);let n=t.mapping;for(let c of Object.values(n)){let l=c.message?.create_time;c.message?.id&&l&&o.times.set(c.message.id,l*On)}let r=[],i=new Set,a=typeof t.current_node=="string"?t.current_node:null;for(;a&&!i.has(a)&&n[a];){i.add(a);let c=n[a].message,l=c?rl(c):null;l&&r.push(l),a=n[a].parent??null}return r.length&&(o.chain=il(r.toReversed())),o}function Gm(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}var li=e=>typeof e=="string"?e:null;function Ym(e){let t=typeof e?.body=="string"?Ee(e.body):null;if(!O(t))return{conversationId:null,parentId:null,userId:null};let[o]=Array.isArray(t.messages)?t.messages:[];return{conversationId:li(t.conversation_id),parentId:li(t.parent_message_id),userId:O(o)?li(o.id):null}}function Km(e,t){if(!O(e))return;typeof e.type=="string"&&Rm.has(e.type)&&(t.handoff=!0);let o=O(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(Bn(e.conversation_id).title=e.title,V.emit("conversation",Bn(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&nl(n.author?.role)){let r=n.create_time*On;t.conversationId&&Bn(t.conversationId).times.set(n.id,r),V.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function Qm(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:a}=await o.read();if(i)break;r+=n.decode(a,{stream:!0});let c=r.split(`
`);r=c.pop()??"";for(let l of c){if(!l.startsWith("data:"))continue;let d=l.slice(5).trim();d&&d!=="[DONE]"&&Km(Ee(d),t)}}}async function zm(e,t,o){let{conversationId:n}=t,r={conversationId:n,error:!1,handoff:!1};el.set(e,n),V.emit("generate-start",{requestId:e,...t});try{let i=await o;i.ok?i.headers.get("content-type")?.includes("event-stream")&&await Qm(i.clone(),r):r.error=!0}catch(i){let a=i instanceof DOMException&&i.name==="AbortError";r.handoff||=a,r.error||=!a}finally{el.delete(e),V.emit("generate-end",{requestId:e,...r})}}async function jm(e,t){try{let o=await t;if(o.status===Om&&V.emit("conversation-missing",{id:e}),!o.ok)return;let n=Fm(e,await o.clone().json());n&&V.emit("conversation",n)}catch(o){ol.debug("Conversation read skipped",o)}}function Wm(e,t,o){let n=Gm(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&Bm.test(n.pathname)){zm(Dm++,Ym(t),o);return}let i=r==="GET"&&n.pathname.match(Pm)?.[1];i&&jm(i,o)}var tl=!1;function al(){if(tl)return;tl=!0;let e=oe.fetch,t=function(o,n){let r=e.call(this??oe,o,n);try{Wm(o,n,r)}catch(i){ol.error("Fetch tap failed",i)}return r};oe.fetch=typeof exportFunction=="function"?exportFunction(t,oe):t}var Vm="__reactContainer$",sl="__reactFiber$";function Pn(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var mi=(e,t)=>Object.keys(e.wrappedJSObject??e).some(o=>o.startsWith(t)),De=e=>!mi(document,Vm)||mi(e,sl);function pt(){return document.body?Promise.resolve():new Promise(e=>{let t=new MutationObserver(()=>{document.body&&(t.disconnect(),e())});t.observe(document,{childList:!0,subtree:!0})})}async function ll(){await pt();let e=Date.now()+8e3;for(;!mi(document.body,sl)&&Date.now()<e;)await new Promise(t=>setTimeout(t,100))}var Jm=new q("Route"),cl=/\/c\/(?!local-)([\w-]+)/,Zm=500,gi=e=>{try{return new URL(e,location.origin).pathname.match(cl)?.[1]??null}catch{return null}},v=()=>location.pathname.match(cl)?.[1]??null,Nt=()=>location.pathname==="/",$m=/^\/g\/g-p-[^/]+(?:\/project)?\/?$/,Nn=()=>$m.test(location.pathname),Te=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",Dn=new Set,Hn=location.href,pi=v(),Rn;function fi(){if(location.href===Hn)return;let e={prevHref:Hn,href:location.href,prevId:pi,id:v()};Hn=e.href,pi=e.id;for(let t of Dn)try{t(e)}catch(o){Jm.error("Route listener failed",o)}}function Xm(){let e=new AbortController,{navigation:t}=oe;t?.addEventListener("currententrychange",()=>queueMicrotask(fi),{signal:e.signal}),addEventListener("popstate",fi,{signal:e.signal});let o=setInterval(fi,Zm);return()=>{e.abort(),clearInterval(o)}}function he(e){return Dn.add(e),Rn||(Hn=location.href,pi=v(),Rn=Xm()),()=>{Dn.delete(e),!Dn.size&&(Rn?.(),Rn=void 0)}}var _m=["data-turn","data-message-author-role"],ef=/:(user|assistant)$/,hi=`${u.messageUnit}, ${u.oldMessage}`,bi=e=>e==="user"||e==="assistant",fl=()=>!!document.querySelector(u.timelineScroll),pl=()=>!!J(u.timelineScroll),yi=()=>v()??document.querySelector(u.composerConversation)?.getAttribute("data-above-composer-conversation-id")??"",Ut=()=>fl()?J(u.timelineScroll):document;function ko(){if(fl())return J(u.timelineScroll);let e=document.querySelector(u.turn);for(let t=e?.parentElement;t;t=t.parentElement){let{overflowY:o}=getComputedStyle(t);if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight)return t}return document.scrollingElement}var Ft=e=>e.getAttribute("data-chatgpt-search-unit-key")?.match(ef)?.[1]??null,gl=e=>[...e.querySelectorAll(u.searchUnit)].filter(t=>Ft(t)&&!t.parentElement?.closest(u.searchUnit)),ul=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function Mo(e){let t=ul(e);return t.length?t:[...new Set([...e.querySelectorAll(hi)].flatMap(ul))]}function Lo(e=Ut()){if(!e)return[];let t=gl(e);return t.length?t:[...e.querySelectorAll(hi)].filter(o=>!o.parentElement?.closest(hi))}function tf(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function of(e){for(let t of _m){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(bi(o))return o}return e.querySelector(u.markdown)||e.querySelector(u.generatedImage)?"assistant":null}var nf=e=>!e.parentElement?.closest(u.turn);function Ve(){let e=we(v())?.chain??[];return[...Ut()?.querySelectorAll(u.turn)??[]].filter(nf).flatMap(o=>{let n=gl(o),r=n.length?n.map(i=>({el:i,known:Ft(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=d=>!n.some(m=>m.contains(d))&&y(d.textContent??""),a=[...o.querySelectorAll(u.assistantMarkdown)].find(d=>i(d)&&!Un.test(y(d.textContent??""))),c=[...o.querySelectorAll(u.activityHeader)].findLast(i),l=a??c;l&&r.push({el:l,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?Mo(o):Lo(o).flatMap(Mo),a=n??of(o)??tf(i,e)??(r%2?"assistant":"user"),c=o.closest(u.turn)??o,l=!o.closest(u.searchUnit)&&!!c.querySelector(u.turnBusy),d=a==="assistant"&&(o.matches(u.turnBusy)||!!o.querySelector(u.turnBusy)||l);return{el:o,role:a,messageIds:i,streaming:d}})}var rf="[data-bloom], .sr-only",hl=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,Un=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,dl=new WeakMap;function Gt(e){let o=(e.el.closest(u.turn)??e.el).textContent?.length??0,n=dl.get(e.el);if(n?.length===o)return n.summary;let r=af(e);return dl.set(e.el,{length:o,summary:r}),r}function ml(e){let t=new Set,o=[];for(let n of e.querySelectorAll(u.assistantMarkdown)){if(n.closest(u.searchUnit))continue;let r=y(n.textContent??"");!r||Un.test(r)||hl.test(r)||t.has(r)||(t.add(r),o.push(r))}return o}function af(e){let t=e.el.querySelectorAll(u.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.closest(u.turn);if(e.role==="assistant"&&o&&e.el.matches(u.assistantMarkdown)&&!e.el.closest(u.searchUnit)){let l=ml(o);if(l.length)return l.join(" \xB7 ")}let n=e.el.querySelector(e.role==="assistant"?u.markdown:".whitespace-pre-wrap")??e.el,i=[...n.querySelectorAll(rf)].map(l=>y(l.textContent??"")).filter(Boolean).reduce((l,d)=>l.replace(d,`
`),n.innerText||n.textContent||""),a=i.split(`
`).map(y).filter(l=>l&&!hl.test(l)&&!Un.test(l));if(a.length)return a.join(" ");if(e.role==="assistant"&&o){let l=ml(o);if(l.length)return l.join(" \xB7 ")}let c=i.split(`
`).map(y).filter(l=>Un.test(l));return c.length?c.at(-1)??"":e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function Fn(e){return e.text?y(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var vi=e=>e.matches(u.timelineScroll)&&getComputedStyle(e).flexDirection==="column-reverse";var sf=250,lf=400,cf=6e4,uf=5e3,df=`:is(${u.turn}) :is(${u.turnBusy})`,mf="data-sidebar-chatgpt-conversation-key",Al="data-sidebar-indicator",ff=/:([0-9a-f-]{36})$/i,E=Ln(),Kn=new Set,Ai=new Set,Je=!1,wl=0,Yt=null,Kt=!1,Gn=!1,Io=0,Qn=!1,Bo=null,bl=!1,yl=new Map,G=()=>({generating:Je,conversationId:v()}),xl=()=>_s()||!!Ut()?.querySelector(df);function pf(){let e=xl();return e?Gn||(Io=0,Qn=!0):Gn=!1,[...Kn].some(t=>!Ai.has(t))||e&&!Gn||Date.now()<Io}function gf(){return Bo?.error?"error":Kt?"stopped":"done"}function hf(){Yt=null,Je=!1,Qn=!1,E.emit("fall",{conversationId:v(),outcome:gf()}),Kt=!1,Bo=null}function Sl(){let e=pf();e&&!Je&&(Je=!0,wl=Date.now(),Kt=!1,Bo=null,E.emit("rise",{conversationId:v()})),e||!Je?Yt=null:Yt==null?Yt=Date.now():Date.now()-Yt>=lf&&hf()}function Yn(){Sl(),E.emit("tick",G())}function bf({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(Je||Date.now()-wl<cf);if(!o&&Je){for(let n of Kn)Ai.add(n);Gn=xl(),Io=0,Qn=!1,Yt=null,Je=!1,Kt=!1,Bo=null,E.emit("fall",{conversationId:e,outcome:"left"})}E.emit("context",{prevId:e,id:t,migrated:o}),Yn()}function vl(){let e=v();for(let t of document.querySelectorAll(u.sidebarConversationRow)){let o=t.getAttribute(mf)?.match(ff)?.[1];if(!o)continue;let n=t.querySelector(u.sidebarIndicator)?.getAttribute(Al)??"",r=yl.get(o);r!==n&&(yl.set(o,n),r==="working"&&n==="unread"&&o!==e&&E.emit("background",{conversationId:o}))}}function yf(e){e.target instanceof Element&&e.target.closest(u.stopButton)&&(Kt=!0,Io=0)}function ql(){bl||(bl=!0,V.on("generate-start",({requestId:e})=>{Kn.add(e),Yn()}),V.on("generate-end",e=>{Kn.delete(e.requestId),!Ai.delete(e.requestId)&&(Bo=e,Io=e.handoff&&!e.error&&!Kt&&!Qn?Date.now()+uf:0,Yn())}),he(bf),document.addEventListener("click",yf,!0),qn(Yn,sf),Pn().then(()=>{I(Sl),I(vl),new MutationObserver(vl).observe(document.body,{subtree:!0,attributes:!0,attributeFilter:[Al]})}))}var S=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,vf="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",Af={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${vf}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:S('<path d="M18 6 6 18M6 6l12 12"/>'),gear:S('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:S('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:S('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:S('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:S('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:S('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:S('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:S('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:S('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:S('<path d="m6 9 6 6 6-6"/>'),play:S('<path d="M7 4v16l13-8z"/>'),plus:S('<path d="M12 5v14M5 12h14"/>'),check:S('<path d="m5 12 5 5 9-10"/>'),alert:S('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:S('<path d="M4 5h16v11H9l-5 4z"/>'),layout:S('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:S('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:S('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:S('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:S('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:S('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:S('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:S('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:S('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:S('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:S('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:S('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:S('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:S('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:S('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:S('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),folder:S('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),ghost:S('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},C=e=>Cs(Af[e]);function wi(e){if(typeof e.showPopover=="function"){e.setAttribute("popover","manual");try{e.showPopover()}catch{e.matches(":popover-open")||e.removeAttribute("popover")}}}function be(e,t=document.body){t.append(e),wi(e)}var El=`/*
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
`;var xf=6e3,Sf=4,qf={info:"info",success:"check",warning:"alert",error:"alert"},Ce=k("bloom-notice-"),Qt=new Map,Oo;function Ef(){return!document.body||!De(document.body)?null:(Bt("notices",El),Oo?.isConnected||(Oo=s("div",{class:`${Ce("stack")} bloom-root`,attrs:{"data-bloom":"notices",role:"region","aria-label":"Bloom++ notices","aria-live":"polite"}}),be(Oo)),Oo)}function Tl(e){clearTimeout(e.timer),!(e.remaining<=0)&&(e.startedAt=Date.now(),e.timer=setTimeout(()=>Ze(e.key),e.remaining))}function Tf(e){e.timer!==void 0&&(clearTimeout(e.timer),e.timer=void 0,e.remaining=Math.max(1,e.remaining-(Date.now()-e.startedAt)))}function Cf(e,t){let o=t.type??"info",n=s("button",{class:Ce("close"),attrs:{type:"button","aria-label":"Dismiss","data-bloom":"control"},on:{click:a=>{a.stopPropagation(),Ze(e)}}},C("close")),r=t.action&&s("button",{class:Ce("action"),text:t.action.label,attrs:{type:"button","data-bloom":"control"},on:{click:a=>{a.stopPropagation(),t.action?.onClick(),Ze(e)}}}),i=s("div",{class:`${Ce("card")} ${Ce(o)}`,attrs:{role:o==="error"?"alert":"status","data-bloom-notice":e}},s("span",{class:Ce("icon")},C(qf[o])),s("div",{class:Ce("body")},s("div",{class:Ce("title"),text:t.title}),t.message&&s("div",{class:Ce("message"),text:t.message})),r,n);return t.onClick&&(i.classList.add(Ce("clickable")),i.addEventListener("click",()=>{t.onClick?.(),Ze(e)})),i}function zn(e){let t=e.key??vo("notice"),o=Ef();if(!o)return t;let n=Cf(t,e),r=Qt.get(t),i={key:t,el:n,options:e,remaining:e.duration??xf,startedAt:Date.now()};n.addEventListener("pointerenter",()=>Tf(i)),n.addEventListener("pointerleave",()=>Tl(i)),r?(clearTimeout(r.timer),r.el.replaceWith(n)):o.append(n),Qt.set(t,i),Tl(i);for(let[a]of[...Qt].slice(0,Math.max(0,Qt.size-Sf)))Ze(a);return t}function Ze(e){let t=Qt.get(e);t&&(Qt.delete(e),clearTimeout(t.timer),t.el.remove(),t.options.onClose?.())}var Mf=new q("Landmarks"),kf=2e3,Lf=1e4,If=1024,Bf=[u.messageUnit,u.oldMessage,u.authorRole].join(", "),Cl={thread:{applies:()=>!!v()&&!!document.querySelector(Bf),selectors:[u.turn]},composer:{applies:()=>Nt()||Nn()||!!v(),selectors:[u.composerInput]},sidebar:{applies:()=>innerWidth>=If,selectors:[u.sidebarScroll,u.rail,u.oldSidebar,u.oldRail]}},Of={BetterNavigator:["thread"],BetterQuotes:["thread"],MessageTimestamps:["thread"],StarChats:["thread"],UserQuotes:["thread"],ComposerOpacity:["composer"],Continue:["composer"],InputHistory:["composer"],PromptQueue:["composer"],CustomSidebarIdentity:["sidebar"],NoSidebarIdentity:["sidebar"],SidebarIdentityOpacity:["sidebar"]},zt=new Map,jn=new Set;function Pf(){let e=Date.now();for(let[t,{applies:o,selectors:n}]of Object.entries(Cl)){if(!o()){zt.delete(t);continue}if(n.some(i=>document.querySelector(i))){zt.delete(t),jn.delete(t);continue}let r=zt.get(t)??e;zt.set(t,r),e-r>=Lf&&jn.add(t)}}function Rf(){let e=[];for(let[o,n]of Object.entries(Of)){let r=Z.get(o),i=r&&We(r)?n.filter(a=>jn.has(a)):[];Gs(o,i.length?i.flatMap(a=>Cl[a].selectors):null),i.length&&e.push(o)}if(!e.length)return;let t=`2.0.120|${e.join(",")}`;ne("Settings","landmarkNotice")!==t&&(se("Settings","landmarkNotice",t),Mf.warn(`Page anchors missing for ${e.join(", ")}`),zn({key:"landmarks",type:"warning",title:"Bloom++ can't find parts of this page",message:`${e.join(", ")} may not work until Bloom++ is updated. Details are in Bloom++ settings.`,duration:0}))}function Df(){if(document.hidden){zt.clear();return}Pf(),Rf()}function Ml(){return zt.clear(),jn.clear(),qn(Df,kf)}var kl={BetterNavigator:1793589484e3,BetterQuotes:1793365944e3,ChatStateFavicons:1793267531e3,Cleaner:1793267811e3,CompleteToast:1793354069e3,ComposerOpacity:1793344667e3,Continue:1793267531e3,CustomSidebarIdentity:1793267531e3,GreetingCustomizer:1793586308e3,InputHistory:1793365944e3,MessageTimestamps:1793589756e3,NoDictation:1793335268e3,NoShareLink:1793267531e3,NoSidebarIdentity:1793267531e3,PromptQueue:1793365944e3,RecentTopics:1793365944e3,ResponseNotification:1793354069e3,Settings:1793448244e3,SidebarIdentityOpacity:1793267531e3,StarChats:1793365944e3,StreamerMode:1793344667e3,TemporaryChat:1793267531e3,UserQuotes:1793345744e3,WiderChat:179333264e4};var ue="data-bloom-tip",xi=6,Si=8,gt,Ll=null;function jt(e){if(e===Ll)return;if(Ll=e,!e){gt?.remove();return}gt??=s("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),gt.textContent=e.getAttribute(ue),be(gt);let t=e.getBoundingClientRect(),{width:o,height:n}=gt.getBoundingClientRect(),r=t.bottom+xi+n<=innerHeight-Si;gt.style.left=`${pe(t.left+t.width/2-o/2,Si,innerWidth-o-Si)}px`,gt.style.top=`${r?t.bottom+xi:t.top-xi-n}px`}var Il=e=>e instanceof Element?e.closest(`[${ue}]`):null;function Bl(){let e=new AbortController,t={passive:!0,signal:e.signal};return document.addEventListener("pointerover",o=>jt(Il(o.target)),t),document.addEventListener("pointerout",o=>o.relatedTarget||jt(null),t),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&jt(Il(o.target)),t),document.addEventListener("focusout",()=>jt(null),t),document.addEventListener("pointerdown",()=>jt(null),t),()=>{e.abort(),jt(null)}}function $e(e,t,o,n=!1){let r=s("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let a=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(a)),t(a)===!1&&r.setAttribute("aria-checked",String(!a))}),r}function H(e,t,o){return s("button",{class:An("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button","data-bloom":"control"},on:{click:t}})}function N(e,t,o,n){let r=s("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":t,"data-bloom":"control",[ue]:t},on:{click:o}},C(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function Wn(e,t,o,n,r,i){let a=s("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});a.value=String(e);let c=s("output",{text:`${a.value}${r}`});return a.addEventListener("input",()=>{c.textContent=`${a.value}${r}`,i(Number(a.value))}),s("div",{class:"bloom-slider"},a,c)}function qi(e,t,o){let n=s("select",{class:"bloom-select"},...t.map(r=>s("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function Po(e,t,o="",n="text"){let r=s("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var Hf=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,Ol=/\S+@\S+\.\S+/,Nf=3,Uf=/^\/g\/(g-p-[^/]+)\//,Ff=/^g-p-[0-9a-f]+-?/i,Pl=e=>!!e.closest(".sr-only"),Ei=e=>!!e?.querySelector(u.menuButton);function Rl(){return[...document.querySelectorAll(u.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(Ei)).filter(e=>e!=null)}function Dl(){let e=[...document.querySelectorAll(u.oldProfile)];if(e.length)return e.map(o=>{let n=o.parentElement?.children.length===1?o.parentElement:o;return{kind:"profile",anchor:n,insert:r=>n.before(r)}});let t=Rl().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(u.rail)){let n=[...o.children].find(Ei);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}var Ti=e=>!e.closest("[data-bloom]")&&(!!e.querySelector("img, [class*=rounded-full]")||Fl(e).some(t=>!Pl(t))),Hl=e=>[...e.parentElement?.children??[]].find(t=>t!==e&&t instanceof HTMLElement&&Ti(t))??null;function Nl(){let e=[...document.querySelectorAll(u.oldProfile)];return e.length?e:[...Rl(),...[...document.querySelectorAll(u.rail)].map(o=>[...o.children].findLast(Ei))].map(o=>[...o?.querySelectorAll(u.menuButton)??[]].findLast(n=>Ti(n)||Hl(n))).filter(o=>o!=null)}var Ul=()=>Nl().map(e=>Ti(e)?e:Hl(e)).filter(e=>e!=null);function Fl(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!y(t.textContent??"")&&!(t instanceof SVGElement))}var Gf=e=>{if(/rounded-full/.test(e.getAttribute("class")??""))return!0;if(!e.clientWidth)return!1;let{borderRadius:t}=getComputedStyle(e);return t.includes("%")||Number.parseFloat(t)>=e.clientWidth/2};function Vn(e,t,o){for(let n of e.querySelectorAll(`[${t}]`))n!==o&&n.removeAttribute(t);o&&!o.hasAttribute(t)&&o.setAttribute(t,"")}function Yf(e,t){if(y(e.textContent??"").length>Nf)return null;let o=e.closest("button");for(let n=e;n&&n!==t&&n!==o;n=n.parentElement)if(Gf(n))return n;return null}function Ci(e,t){e.hasAttribute(`data-bloom-${t}`)||e.setAttribute(`data-bloom-${t}`,"");let o=e.querySelector("img:not([data-bloom] img)"),n=Fl(e),r=o?null:n.map(m=>Yf(m,e)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),a=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");Vn(e,`data-bloom-${t}-avatar`,a);let c=n.filter(m=>!a?.contains(m)&&!Pl(m)),l=c.find(m=>Hf.test(y(m.textContent??""))),d=c.find(m=>Ol.test(m.textContent??""));Vn(e,`data-bloom-${t}-plan`,l),Vn(e,`data-bloom-${t}-email`,d),Vn(e,`data-bloom-${t}-name`,c.find(m=>m!==l&&m!==d))}function Kf(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function Jn(){return Nl().map(Kf).find(e=>e!=null)??[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&(Ol.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var Ro=e=>[...document.querySelectorAll(u.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&gi(t.href)===e);function Gl(e){let t=Ro(e).find(o=>y(o.textContent??""));return t?y(t.textContent??""):null}function Yl(e){let t=new URL(e,location.origin).pathname.match(Uf)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!gi(n.href)&&y(n.textContent??""));return o?y(o.textContent??""):t.replace(Ff,"").replaceAll("-"," ")||null}var Mi=0,Zn;function Qf(e){if(!W(e))return;for(let o of Ul())Ci(o,"profile");let t=Jn();t&&Ci(t,"menu")}function Me(){Mi++;let e=!0;return pt().then(()=>{e&&Mi&&!Zn&&(Zn=I(Qf))}),()=>{e&&(e=!1,!--Mi&&(Zn?.(),Zn=void 0))}}var $n=["showSidebarEntry","showSidebarEntryOnHover","showAccountMenuEntry"],Kl=1,Wt={showSidebarEntry:!0,showSidebarEntryOnHover:!1,showAccountMenuEntry:!1},ki=e=>Object.hasOwn(Wt,e),Li=e=>ne("Settings",e)??Wt[e],Ql=(e,t)=>!ki(e)||t!==!1||$n.some(o=>o!==e&&Li(o));function zl(){if(ne("Settings","entryRevision")!==Kl){for(let e of $n)se("Settings",e);se("Settings","entryRevision",Kl)}}var zf=new q("Themes"),jf=/^https:\/\/\S+\.css(?:[?#]|$)/i,Wf=/\/\*\*[^]*?@name[ \t]+([^\n*]+)/,Y=h({themes:{type:"custom",default:[]},quickCss:{type:"custom",default:""},quickCssEnabled:{type:"custom",default:!0}});async function jl(e){let t=new TextDecoder().decode(await vn(e));if(!t.trim())throw new Error("Theme file is empty.");return t}var Xn=(e,t)=>{Y.store.themes=Y.store.themes.map(o=>o.id===e?{...o,...t}:o)},Wl=e=>{Y.store.themes=Y.store.themes.filter(t=>t.id!==e)};async function Vl(e){if(!jf.test(e))throw new Error("Enter an https URL that ends in .css.");if(Y.store.themes.some(n=>n.url===e))throw new Error("This theme is already added.");let t=await jl(e),o=t.match(Wf)?.[1]?.trim()||decodeURIComponent(new URL(e).pathname.split("/").pop()??e).replace(/\.css$/i,"").replaceAll(/[-_]/g," ");Y.store.themes=[...Y.store.themes,{id:vo("theme"),name:o,url:e,css:t,enabled:!0}]}function Jl(e,t,o){if(!t.trim())throw new Error("Name is required.");if(!o.trim())throw new Error("CSS is required.");e?Xn(e,{name:t.trim(),css:o}):Y.store.themes=[...Y.store.themes,{id:vo("theme"),name:t.trim(),css:o,enabled:!0}]}async function Vf(){await Promise.all(Y.store.themes.filter(e=>e.url&&e.enabled).map(async({id:e,url:t,name:o})=>{try{let n=await jl(t??"");Y.store.themes.find(r=>r.id===e)?.css!==n&&Xn(e,{css:n})}catch(n){zf.warn(`Failed to refresh theme "${o}"`,n)}}))}var Zl=p({name:"Themes",description:"Applies Bloom++ themes and Quick CSS.",authors:["Bloom contributors"],tags:[],icon:"spark",required:!0,hidden:!0,startAt:"Init",settings:Y,styles:()=>[...Y.store.themes.filter(e=>e.enabled).map(e=>e.css),Y.store.quickCssEnabled?Y.store.quickCss:""].join(`
`),start(){Vf()}});var K=k("bloom-settings-"),Jf=3e3,$l=(e,t)=>{let o=s("textarea",{class:`bloom-input ${K("css")}`,attrs:{spellcheck:"false",placeholder:"Paste your CSS here...","aria-label":t}});return o.value=e,o},Ii=(e,t)=>s("div",{class:K("section-header")},s("div",{class:K("field-label"),text:e}),s("div",{class:K("field-desc"),text:t}));function Xl(){let{quickCss:e,quickCssEnabled:t}=Y.store,o=$l(e,"Quick CSS");return o.disabled=!t,o.addEventListener("input",()=>{Y.store.quickCss=o.value}),s("div",{class:K("section")},s("div",{class:K("field","field-inline")},Ii("Quick CSS","Your own CSS, applied on every page as you type."),$e(t,n=>{Y.store.quickCssEnabled=n,o.disabled=!n},"Enable Quick CSS")),o)}function _l(){let e=s("div",{class:K("section")}),t=null,o=()=>s("div",{class:K("section-error"),attrs:{role:"alert"}});function n(){let l=s("input",{class:"bloom-input",attrs:{type:"url",placeholder:"https://raw.githubusercontent.com/...","aria-label":"Theme URL"}}),d=o(),m=H("Add",async()=>{m.disabled=!0,d.textContent="";try{await Vl(l.value.trim()),c()}catch(f){d.textContent=f instanceof Error?f.message:String(f),m.disabled=!1}});return s("div",{class:K("section-block")},Ii("Online themes","Load a theme from a .css URL. It is fetched again on every page load, so updates apply."),s("div",{class:K("section-row")},l,m),d)}function r(){let l=t==="new"?null:t,d=s("input",{class:"bloom-input",attrs:{placeholder:"My theme","aria-label":"Theme name"}});d.value=l?.name??"";let m=$l(l?.css??"","Theme CSS"),f=o();return s("div",{class:K("section-block")},d,m,f,s("div",{class:K("section-row")},H("Save",()=>{try{Jl(l?.id??null,d.value,m.value),t=null,c()}catch(T){f.textContent=T instanceof Error?T.message:String(T)}}),H("Cancel",()=>{t=null,c()})))}function i(){return s("div",{class:K("section-block")},s("div",{class:K("field","field-inline")},Ii("Local themes","CSS stored only on this device."),!t&&H("New local theme",()=>{t="new",c()})),t&&r())}function a(l){let d,m=N("trash","Remove",()=>{if(d){clearTimeout(d),Wl(l.id),c();return}m.setAttribute("aria-pressed","true"),m.setAttribute(ue,"Click again to remove"),d=setTimeout(()=>{d=void 0,m.removeAttribute("aria-pressed"),m.setAttribute(ue,"Remove")},Jf)});return s("div",{class:K("theme")},s("div",{class:K("theme-text")},s("div",{class:`${K("card-name")} bloom-truncate`,text:l.name}),s("div",{class:`${K("field-desc")} bloom-truncate`,text:l.url??"Local"})),l.url?N("copy","Copy URL",()=>void yn(l.url??"")):N("edit","Edit",()=>{t=l,c()}),m,$e(l.enabled,f=>Xn(l.id,{enabled:f}),`Enable ${l.name}`))}function c(){let{themes:l}=Y.store;e.replaceChildren(n(),i(),l.length?s("div",{class:K("themes")},...l.map(a)):s("div",{class:K("empty"),text:"No themes yet."}))}return c(),e}var Zf=new q("SettingsPanel"),g=k("bloom-settings-"),$f=10080*60*1e3,Xf=3e3,ec="Toggle features. Some need a reload. Click the sliders icon to configure.",_f="Can't find its place on this page. It may need an update.",ep=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],tp=[{id:"plugins",label:"Plugins"},{id:"themes",label:"Themes"},{id:"css",label:"Quick CSS"}],op=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],np={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},oc=new Set(["chat","ui","privacy"]),Q=null,Do="plugins",bt="all",Bi="all",_n="",Oi=[],nc=()=>[...Z.values()].filter(e=>!e.hidden),rp=e=>!!e.updatedAt&&Date.now()-e.updatedAt<$f;function ip(e){switch(bt){case"favorites":return Cn.has(e.name);case"recent":return rp(e);case"all":return!0;case"other":return!e.tags.some(t=>oc.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(bt)}}function ap(e){switch(Bi){case"all":return!0;case"enabled":return We(e);case"disabled":return!We(e)}}function sp(e){let t=_n.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function lp(e){let t=Tn.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return bt==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var rc=e=>e.settings?.def??{},Di=e=>Object.values(rc(e)).some(t=>t.type!=="custom");function cp(e,t,o){let n=ne(e.name,t)??ri(o),r=i=>{if(e.name==="Settings"&&!Ql(t,i))return!1;se(e.name,t,i)};switch(o.type){case"boolean":return $e(n,r,o.description??t);case"slider":return Wn(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return qi(n,o.options,r);case"string":return Po(n,r,o.placeholder);case"number":return Po(String(n),i=>r(Number(i)),"","number");case"component":{let i=s("div",{class:g("component")});return Oi.push(o.render(i)),i}case"custom":return null}}var up=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function Hi(e){if(!Q)return;let t=Object.entries(rc(e)).filter(([,i])=>i.type!=="custom").map(([i,a])=>{let c=cp(e,i,a),l=a.type==="boolean",d=a.type!=="component"&&s("div",{class:g("field-label"),text:up(i)}),m=a.description&&s("div",{class:g("field-desc"),text:a.description});return s("div",{class:g("field",l?"field-inline":"field-stacked")},(d||m)&&s("div",{class:g("field-text")},d,m),c)}),o,n=H("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},Xf);return}clearTimeout(o),e.settings?.reset(),Vt(),Hi(e)},"danger"),r=s("div",{class:g("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&Vt()}},s("div",{class:g("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},s("div",{class:g("popup-header")},s("div",{class:g("card-icon")},C(e.icon)),s("div",{class:g("popup-title")},s("div",{class:g("card-name"),text:e.name}),s("div",{class:g("popup-authors"),text:e.authors.join(", ")})),N("close","Close",Vt)),s("p",{class:g("popup-desc"),text:e.description}),s("div",{class:g("fields")},...t),s("div",{class:g("popup-footer")},n)));Q.querySelector(`.${g("modal")}`)?.append(r)}function Vt(){for(let e of Oi)e();Oi=[],Q?.querySelector(`.${g("popup-backdrop")}`)?.remove()}function tc(e){let t=We(e),o=Cn.has(e.name),n=Tn.has(e.name),r=!!e.required,i=Us(e.name);return s("div",{class:[g("card",t?"card-on":"card-off"),r?g("card-required"):""].filter(Boolean).join(" ")},s("div",{class:g("card-top")},s("div",{class:g("card-icon")},C(e.icon)),s("div",{class:g("card-actions")},N("star",o?"Unstar":"Star",()=>{Cn.toggle(e.name),ht()},o),r?null:N("pin",n?"Unpin":"Pin to top",()=>{Tn.toggle(e.name),ht()},n),r?s("span",{class:g("required-mark"),attrs:{"aria-label":"Required",[ue]:"This plugin is required for Bloom++ to work"}},C("alert")):null,Di(e)&&N("gear","Settings",()=>Hi(e)),$e(t,a=>zs(e,a),r?`${e.name} is required`:`Enable ${e.name}`,r))),s("div",{class:g("card-name")},e.name,Ns(e.name)&&s("span",{class:g("new-badge"),text:"New"})),s("div",{class:g("card-desc"),text:e.description,title:e.description}),i&&s("div",{class:g("card-issue"),attrs:{[ue]:`Missing: ${i.join(", ")}`}},C("alert"),s("span",{text:_f})),s("div",{class:g("card-footer"),text:e.authors.join(", ")}))}function ic(){let e=nc().some(o=>!o.tags.some(n=>oc.has(n)));Q?.querySelector(`.${g("tabs")}`)?.replaceChildren(...ep.filter(o=>o.id!=="other"||e).map(o=>s("button",{class:g("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===bt)},on:{click:()=>{bt=o.id,ic(),ht()}}})))}function ht(){if(!Q)return;let e=nc().filter(ip),t=Q.querySelector(`.${g("search")} input`);t&&(t.placeholder=`Search ${bn(e.length,"plugin")}...`);let o=lp(e.filter(d=>sp(d)&&ap(d))),n=bt==="all",r=n?o.filter(d=>!d.required):o,i=n?o.filter(d=>d.required):[],a=[...r.map(tc),...i.length?[s("div",{class:g("required-break"),attrs:{role:"separator"}}),...i.map(tc)]:[]],c=_n.trim()?"No plugins match your search.":np[bt]??"No plugins available.";Q.querySelector(`.${g("grid")}`)?.replaceChildren(...a.length?a:[s("div",{class:g("empty"),text:c})])}function dp(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),Q?.querySelector(`.${g("popup-backdrop")}`)?Vt():Jt())}var ac,Pi;function Ri(){let e=Q?.querySelector(`.${g("body")}`);if(!Q||!e)return;for(let o of Q.querySelectorAll(`.${g("nav-item")}`))o.setAttribute("aria-selected",String(o.getAttribute("data-section")===Do));if(Vt(),Do==="themes"){e.replaceChildren(_l());return}if(Do==="css"){e.replaceChildren(Xl());return}let t=s("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});t.value=_n,t.addEventListener("input",()=>{_n=t.value,ht()}),e.replaceChildren(s("div",{class:g("tabs"),attrs:{role:"tablist"}}),s("div",{class:g("toolbar")},s("label",{class:g("search")},C("search"),t),qi(Bi,op,o=>{Bi=o,ht()})),s("div",{class:g("grid")})),ic(),ht(),t.focus()}function Zt(e,t){e&&(Do=e),Q?(Ri(),wi(Q)):mp();let o=t&&Z.get(t);o&&Hi(o)}function mp(){Q=s("div",{class:`bloom-root ${g("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:e=>e.target===e.currentTarget&&Jt()}},s("div",{class:g("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},s("div",{class:g("header")},s("div",{class:g("logo")},C("bloom")),s("h2",{class:g("title"),text:"Bloom++"}),s("span",{class:g("hint"),attrs:{"aria-label":ec,tabindex:"0",[ue]:ec}},C("info")),s("div",{class:g("nav"),attrs:{role:"tablist"}},...tp.map(e=>s("button",{class:g("nav-item"),text:e.label,attrs:{type:"button",role:"tab","data-section":e.id},on:{click:()=>{Do=e.id,Ri()}}}))),s("span",{class:g("version"),text:"v2.0.120"}),N("close","Close",Jt)),s("div",{class:g("body")}))),Q.addEventListener("keydown",e=>e.stopPropagation()),Pi=new AbortController,document.addEventListener("keydown",dp,{capture:!0,signal:Pi.signal}),be(Q),Ri(),ac=Vs(ht),Zf.debug("Opened")}function Jt(){Vt(),Pi?.abort(),ac?.(),Q?.remove(),Q=null}var er=()=>Q?Jt():Zt();var sc=`/*
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
`;var de=k("bloom-entry-"),pp=4,Ui="--bloom-entry-x",Fi=1,lc=4,cc=8,gp=150,ye=h({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar.",default:Wt.showSidebarEntry},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:Wt.showSidebarEntryOnHover},showAccountMenuEntry:{type:"boolean",description:"Show Bloom++ at the top of the account menu.",default:Wt.showAccountMenuEntry},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:e=>(e.append(H("Reset position",()=>{ye.store.entryPosition=Fi})),()=>e.replaceChildren())},showBloomMenu:{type:"boolean",description:"Hovering the Bloom++ row in the account menu opens a menu with Plugins, Themes, Quick CSS and plugin settings.",default:!0},menuPlugins:{type:"component",description:"Plugins listed in that menu.",render:e=>(e.append(...mc().map(t=>s("div",{class:de("menu-pick")},C(t.icon),s("span",{class:"bloom-truncate",text:t.name}),$e(fc(t),o=>{ye.store.menuPicks={...ye.store.menuPicks,[t.name]:o}},`List ${t.name} in the menu`)))),()=>e.replaceChildren())},entryPosition:{type:"custom",default:Fi},menuPicks:{type:"custom",default:{}}}),yt=new Map,Xe=null,Ho,mc=()=>[...Z.values()].filter(e=>!e.hidden).toSorted((e,t)=>e.name.localeCompare(t.name)),fc=e=>ye.store.menuPicks[e.name]??Di(e),uc=!1,Ni=[];function hp(e,t,o){let n=e.currentTarget,r=t.clientWidth-n.offsetWidth;if(e.button!==0||r<=0||!t.classList.contains(de("hover")))return;let i=ye.store.entryPosition,a=i,c=!1,l=new AbortController;n.setPointerCapture(e.pointerId),n.addEventListener("pointermove",m=>{!c&&Math.abs(m.clientX-e.clientX)<pp||(c=!0,o(),a=pe(i+(m.clientX-e.clientX)/r,0,Fi),t.style.setProperty(Ui,String(a)))},{signal:l.signal});let d=()=>{l.abort(),c&&(ye.store.entryPosition=a,t.style.removeProperty(Ui))};n.addEventListener("pointerup",d,{signal:l.signal}),n.addEventListener("lostpointercapture",d,{signal:l.signal})}function bp(e){let t=!1,o=s("button",{class:de("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),t||er(),t=!1},pointerdown:r=>{t=!1,e!=="rail"&&hp(r,n,()=>{t=!0})}}},C("bloom"),e!=="rail"&&s("span",{class:de("label"),text:"Bloom++"})),n=s("div",{class:`bloom-root ${de("wrap")} ${de(e)}`,attrs:{"data-bloom":"entry"}},o);return n}function No(){clearTimeout(Ho),Xe?.remove(),Xe=null}function pc(){clearTimeout(Ho),Ho=setTimeout(No,gp)}var gc=e=>e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0}));function yp(e,t){if(clearTimeout(Ho),Xe?.isConnected||!ye.store.showBloomMenu)return;let o=(l,d,m)=>s("div",{class:de("flyout-item"),attrs:{role:"menuitem"},on:{pointerdown:f=>{f.button===0&&(f.preventDefault(),f.stopPropagation(),No(),gc(t),m())}}},C(d),s("span",{class:"bloom-truncate",text:l})),n=mc().filter(fc);Xe=s("div",{class:`bloom-root ${de("flyout")}`,attrs:{"data-bloom":"menu-flyout",role:"menu","aria-label":"Bloom++"},on:{pointerenter:()=>clearTimeout(Ho),pointerleave:pc}},o("Plugins","bloom",()=>Zt("plugins")),o("Themes","spark",()=>Zt("themes")),o("Quick CSS","edit",()=>Zt("css")),n.length>0&&s("div",{class:de("flyout-break"),attrs:{role:"separator"}}),...n.map(l=>o(l.name,l.icon,()=>Zt("plugins",l.name)))),be(Xe);let r=t.getBoundingClientRect(),{width:i,height:a}=Xe.getBoundingClientRect(),c=r.right+lc;Xe.style.left=`${c+i>innerWidth?r.left-i-lc:c}px`,Xe.style.top=`${pe(e.getBoundingClientRect().top,cc,innerHeight-a-cc)}px`}function vp(e){let t=s("div",{class:`bloom-root ${de("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),No(),gc(e),er()},pointerenter:()=>yp(t,e),pointerleave:pc}},C("bloom"),s("span",{text:"Bloom++"}),ye.store.showBloomMenu&&s("span",{class:de("menu-chevron")},C("chevron"))),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function dc(){No();for(let e of document.querySelectorAll('[data-bloom="entry"], [data-bloom="menu-entry"]'))e.remove();yt.clear()}function Ap(){for(let e of document.querySelectorAll('[data-bloom="menu-entry"]'))e.remove()}function hc(){let{showSidebarEntry:e,showSidebarEntryOnHover:t,showAccountMenuEntry:o}=ye.store,n=e||t?Dl():[],r=new Set(n.map(a=>a.anchor));for(let[a,c]of yt)a.isConnected&&r.has(a)||(c.remove(),yt.delete(a));for(let a of document.querySelectorAll('[data-bloom="entry"]'))[...yt.values()].includes(a)||a.remove();for(let a of n){let c=yt.get(a.anchor);if(c?.isConnected||!De(a.anchor))continue;let l=c??bp(a.kind);yt.set(a.anchor,l),a.insert(l)}for(let a of yt.values())a.classList.toggle(de("hover"),!e);if(!o){Ap();return}let i=Jn();i&&!i.querySelector('[data-bloom="menu-entry"]')&&vp(i),i||No()}function wp(e){$n.some(Li)||(ye.store[ki(e??"")?e:"showSidebarEntry"]=!0),hc()}var bc=p({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:ye,styles:()=>`${sc}.${de("hover")}{${Ui}:${ye.store.entryPosition}}`,start(){zl(),dc(),Ni=[I(hc),Bl(),Me()],!uc&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",er),uc=!0)},stop(){for(let e of Ni)e();Ni=[],dc(),Jt()},onSettingsChange:wp});var xp=80,Sp=420;function Gi(e,t,o){return(e.x-o.x)*(t.y-o.y)-(t.x-o.x)*(e.y-o.y)}function qp(e,t,o,n){let r=Gi(e,t,o),i=Gi(e,o,n),a=Gi(e,n,t);return!((r<0||i<0||a<0)&&(r>0||i>0||a>0))}function Ep(e,t){let o=(t.left+t.right)/2-(e.left+e.right)/2,n=(t.top+t.bottom)/2-(e.top+e.bottom)/2;if(Math.abs(o)>=Math.abs(n)){let i=o<0?t.right:t.left;return[{x:i,y:t.top},{x:i,y:t.bottom}]}let r=n<0?t.bottom:t.top;return[{x:t.left,y:r},{x:t.right,y:r}]}function yc(e,t){let o=pe(e.x,t.left,t.right),n=pe(e.y,t.top,t.bottom);return Math.hypot(e.x-o,e.y-n)}function tr(e){let t=e.closeDelay??xp,o=e.towardDelay??Sp,n=0,r=!1,i=null,a=null,c=()=>{document.removeEventListener("pointermove",b,!0)},l=()=>{n&&window.clearTimeout(n),n=0,c(),i=null,a=null},d=()=>{l(),r&&(r=!1,e.setHeld(!1))},m=()=>{r||(r=!0,e.setHeld(!0))},f=x=>{n&&window.clearTimeout(n),n=window.setTimeout(d,x)},T=x=>{let $=e.panel(),lt=e.trigger();if(!$||!i)return!1;let te=$.getBoundingClientRect();if(te.width<=0&&te.height<=0)return!1;let Re=lt?.getBoundingClientRect(),[fe,Zr]=Re&&(Re.width||Re.height)?Ep(Re,te):[{x:te.left,y:te.top},{x:te.right,y:te.bottom}];return qp(x,i,fe,Zr)?!0:a!=null&&yc(x,te)<yc(a,te)-.25},b=x=>{let $={x:x.clientX,y:x.clientY};if(e.over(x.target)){l();return}T($)?f(o):d(),a=$};return{enter(){l()},leave(x){if(e.over(x.relatedTarget)){l();return}i={x:x.clientX,y:x.clientY},a=i,m(),document.addEventListener("pointermove",b,!0),f(t)},dispose(){l(),r=!1}}}var vc=`/*
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
    pointer-events: none;
    contain: layout style;
}

.bloom-nav-rail {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    max-height: 100%;
    padding: 0.5rem 0;
    overflow-y: auto;
    scrollbar-width: none;
}

.bloom-nav-tick {
    --bloom-nav-tick: color-mix(in srgb, var(--bloom-fg) 40%, transparent);

    width: 1.25rem;
    height: 0.5rem;
    flex: none;
    background: linear-gradient(var(--bloom-nav-tick), var(--bloom-nav-tick)) center / 100% 2px no-repeat;
    pointer-events: auto;
    transition: width 0.15s ease;
}

.bloom-nav-tick-assistant {
    width: 0.875rem;
}

.bloom-nav-tick-current {
    --bloom-nav-tick: color-mix(in srgb, var(--bloom-fg) 83%, transparent);

    width: 1.75rem;
    filter: drop-shadow(0 0 0.25rem color-mix(in srgb, var(--bloom-fg) 40%, transparent));
}

.bloom-nav-tick-streaming {
    background: repeating-linear-gradient(90deg, color-mix(in srgb, var(--bloom-fg) 60%, transparent) 0 3px, transparent 3px 5px) center / 100% 2px no-repeat;
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
    pointer-events: auto;
    transform: translateY(-50%);
}

.bloom-nav-root:is(:hover, .bloom-nav-open) .bloom-nav-toc {
    display: flex;
}

.bloom-nav-root:is(:hover, .bloom-nav-open) .bloom-nav-bridge {
    pointer-events: auto;
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
`;var M=k("bloom-nav-"),rr=80,Cp=1200,Mp=2,Ac=3e4,kp=200,Lp=.9,Ip=.28,Bp=24,$t=8,Op=80,Yi=80,Cc=`${u.rightPanel}, ${u.summaryPanel}`,Pp={user:"\u2753",assistant:"\u{1F916}"},Rp=["wheel","touchmove","pointerdown"],cr=h({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),A=null,D=[],ve=-1,vt=-1,Xt=null,At="",Qi=0,zi=[],Yo=null,or=null,nr=new Set,He,Uo,Ne,Fo="",xe=[],Ko=null,ir=new Set,ar=new Map,_e=!1,Dp=e=>cr.store.showAssistant||e.role==="user",Hp=e=>e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.messageIds[0]||e.role;function Np(e){return{role:e.role,summary:Gt(e),ids:e.messageIds,turn:e,streaming:e.streaming}}function Mc(e,t){let o=e.entries.at(-1);if(o?.role==="assistant"&&t.role==="assistant"){e.entries[e.entries.length-1]={...t,ids:[...new Set([...o.ids,...t.ids])]};return}e.entries.push(t)}function Up(){let e=[];for(let t of Ve()){let o=Np(t),n=Hp(t),r=e.at(-1),i=!t.el.closest("[data-turn-key]");r&&(r.key===n||i&&o.role==="assistant")?Mc(r,o):e.push({key:n,entries:[o]})}return e}function Fp(){let e=[];for(let t of we(yi()||v())?.chain??[]){let o={role:t.role,summary:Fn(t),ids:[t.id],turn:null,streaming:!1},n=e.at(-1);t.role==="assistant"&&n?Mc(n,o):e.push({key:t.id,entries:[o]})}return e}var _t=e=>e.entries.flatMap(t=>t.ids);function sr(e,t){let o=new Set(_t(e));return _t(t).some(n=>o.has(n))}var Ue=e=>y(e.entries.find(t=>t.role==="user")?.summary??""),Ki=(e,t)=>e.filter(o=>Ue(o)===t).length,ji=e=>({...e,turn:null,streaming:!1});function Gp(e,t){let o=new Set(t.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return e.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return ji(r);let a=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return a&&a!==n.key?ji(r):r})}))}function wc(e,t){let o=t.entries.map((n,r)=>{let i=e.entries[r];if(!i)return n;let a=[...new Set([...n.ids,...i.ids])];return{...n,ids:a,summary:n.summary||i.summary}});for(let n of e.entries.slice(o.length))o.push(ji(n));return{key:e.key,entries:o}}function kc(){let e=ko();if(!e)return!1;let t=e.clientHeight-e.scrollHeight;return e.scrollTop-t<=Math.abs(e.scrollTop)}function Yp(e,t){let o=Gp(e,t).filter(l=>t.some(d=>d.key===l.key)||!t.some(d=>sr(d,l)));if(!t.length)return o;if(!o.length)return t;let n=t.findIndex(l=>o.some(d=>d.key===l.key));if(n<0)return kc()?t.concat(o):o.concat(t);let r=t[n]?.key,i=o.findIndex(l=>l.key===r),a=o.slice(0,i).concat(t.slice(0,n),o.slice(i)),c=a.findIndex(l=>l.key===r);for(let l=n;l<t.length;l++){let d=t[l];if(!d)continue;let m=a.findIndex(f=>f.key===d.key);if(m>=0){let f=a[m];f&&(a[m]=wc(f,d)),c=m}else{let f=Ue(d),T=f?a.findIndex((x,$)=>$>c&&!lr(x)&&Ue(x)===f):-1,[b]=T>=0?a.splice(T,1):[];a.splice(c+1,0,b?{...wc(b,d),key:d.key}:d),c++}}return a}function Kp(e,t){let o=0,n=0,r=0;for(let i=1-e.length;i<t.length;i++){let a=0,c=0;for(let d=0;d<e.length;d++){let m=t[d+i],f=e[d];!m||!f||(sr(f,m)?(a+=3,c++):Ue(f)&&Ue(f)===Ue(m)&&a++)}let l=kc()?i<r:i>r;(a>o||a===o&&c>n||a===o&&c===n&&l)&&(o=a,n=c,r=i)}return{score:o,offset:r}}function Qp(e,t){let o=e.entries.map((n,r)=>{let i=t.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of t.entries.slice(o.length))o.push({...n,turn:null});return{key:e.key,entries:o}}function Vi(e){return e.map(t=>({key:t.key,entries:t.entries.map(o=>({...o}))}))}function zp(e,t,o=!0){if(!t.length)return e;if(!e.length)return t;let{score:n,offset:r}=Kp(e,t),i=Vi(e);if(n>0)for(let l=0;l<i.length;l++){let d=t[l+r],m=i[l];if(!d||!m)continue;let f=Ue(m),T=!!f&&f===Ue(d)&&Ki(e,f)===1&&Ki(t,f)===1;(sr(m,d)||T)&&(i[l]=Qp(m,d))}let a=[],c=[];for(let l=0;l<t.length;l++){let d=t[l];if(!d)continue;let m=Ue(d);!m||Ki(i,m)>0||i.some(f=>sr(f,d))||o&&(n>0&&l<r?a.push(d):c.push(d))}return a.concat(i,c)}var lr=e=>e.entries.some(t=>t.turn?.el.isConnected);function jp(e,t,o){let n=e.findIndex(i=>_t(i).includes(t));if(n>=0)return n+1;let r=e.find(lr);return o&&r&&_t(r).includes(o)?0:e.length}function Wp(e){if(Ko){let{parent:t,user:o}=Ko;for(let n of e.slice(jp(e,t,o))){let r=_t(n);if(!lr(n)&&!(o&&r.includes(o)))for(let i of r)ir.add(i)}}return e.filter(t=>lr(t)||!_t(t).some(o=>ir.has(o)))}function Lc(){xe=[],Ko=null,ir.clear()}function xc(e){return e.reduce((t,o)=>t+o.entries.length,0)}function Sc(e,t){if(!e||!t.length)return;let o=ar.get(e);(!o||xc(t)>=xc(o))&&ar.set(e,Vi(t))}function Vp(){let e=yi();if(e!==Fo){Fo&&xe.length&&Sc(Fo,xe),Fo=e;let n=e?ar.get(e):void 0;n?.length?(xe=Vi(n),Ko=null,ir.clear(),_e=!0):(Lc(),_e=!1)}let t=Up(),o=Fp();return!t.length&&!o.length&&!pl()?(xe=[],[]):(_e&&e&&!di(e)&&(_e=!1),xe=Wp(zp(Yp(xe,t),o,!_e)),e&&xe.length&&Sc(e,xe),!_e&&e&&xe.length&&di(e)&&(_e=!0),xe.flatMap(n=>n.entries).filter(Dp).filter(n=>n.ids.length||n.summary||n.streaming))}function Jp(e){for(let o of e)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!G().generating||e.some(o=>o.streaming))return;let t=e.at(-1);t&&(t.role==="assistant"||!cr.store.showAssistant?t.streaming=!0:e.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function Ic(){let e=Vp();return Jp(e),e}function Bc(e){let t=e.getBoundingClientRect(),o=X()?.getBoundingClientRect().top,n=Math.min(t.bottom,o&&o>t.top?o:t.bottom);return{top:t.top,bottom:n}}function Oc(e){return((e.matches(".whitespace-pre-wrap, .markdown, .prose, [data-markdown-text-style]")?e:e.querySelector(".whitespace-pre-wrap")??e.querySelector(".markdown, .prose, [data-markdown-text-style]"))??e).getBoundingClientRect().top}function qc(e){let t=D[e]?.turn?.el;return t?.isConnected?t:null}function Zp(e){if(!D.length)return null;let t=e.scrollHeight-e.clientHeight,o=vi(e),n=Math.min(e.scrollTop,0),r=o?-n:t-e.scrollTop,i=o?t+n:e.scrollTop,a=t<=$t||r<=$t,c=t>$t&&i<=$t,{top:l,bottom:d}=Bc(e),m=qc(0),f=m?Oc(m):Number.NaN,T=!!m&&f>=l-$t&&f<=l+48,b=qc(D.length-1),x=b?.getBoundingClientRect().bottom??Number.NaN,$=!!b&&x<=d+$t&&x>=d-Op;return a||$?"bottom":c||T?"top":null}function $p(e){let{top:t,bottom:o}=Bc(e),n=t+Math.max(o-t,0)*Ip,r=[],i=-1;if(D.forEach((c,l)=>{let d=c.turn?.el;if(!d?.isConnected){r.push(Number.NaN);return}let m=Oc(d);r.push(m),i<0&&(i=l),m<=n&&(i=l)}),i<0)return Math.max(D.findIndex(c=>c.turn),0);let a=r[ve];return Number.isFinite(a)?i===ve?ve:i>ve?i:a<=n+Bp?ve:i:i}function Xp(e){let t=Zp(e);return t==="bottom"?D.length-1:t==="top"?0:$p(e)}function Ec(e){cr.store.jumpEffect==="border"&&(e.classList.add(M("flash")),setTimeout(()=>e.classList.remove(M("flash")),Cp))}function ur(e){let t=D[e],o=ko();if(!t||!o)return;if(!t.turn&&!t.ids.length){vt=e,Go(),o.scrollTo({top:vi(o)?0:o.scrollHeight});return}vt=e,Xt=e?null:{chat:v(),first:t.ids[0],until:Date.now()+Ac},Go();let n=t.turn?.el;if(n?.isConnected){let d=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:d<o.clientHeight*Mp?"smooth":"auto"}),Ec(n);return}let r=D.findIndex(d=>d.turn),i=r>=0&&e<r?-1:1,a=++Qi,c=Date.now()+Ac,l=()=>{let d=ko();if(a!==Qi||Date.now()>c||!d)return;D=Ic();let m=D.find(T=>T.ids.some(b=>t.ids.includes(b)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),Ec(m),vt=D.findIndex(T=>T.turn?.el===m),Go();return}let f=d.scrollTop;d.scrollBy({top:i*d.clientHeight*Lp,behavior:"instant"}),d.scrollTop===f?setTimeout(l,kp):requestAnimationFrame(l)};l()}function _p(e,t){return s("button",{class:M("row"),attrs:{type:"button","data-index":String(t),"data-message-id":e.ids[0]??""},on:{click:()=>ur(t)}},s("span",{text:Pp[e.role]}),s("span",{class:"bloom-truncate",text:qe(e.summary||"\u2026",rr)}))}function eg(e){let t=1/0;for(let o of document.querySelectorAll(Cc)){if(!ut(o))continue;let n=o.getBoundingClientRect();n.width<Yi||n.height<Yi||n.left<e.left+Yi||n.left<t&&(t=n.left)}return Number.isFinite(t)?t:null}function Tc(e){if(!A)return;let t=e.getBoundingClientRect(),o=X()?.getBoundingClientRect().top,r=Math.min(t.bottom,o&&o>t.top?o:t.bottom)-t.top,i=Math.min(t.right,eg(t)??1/0);A.style.right=`${document.documentElement.clientWidth-i}px`,A.style.top=`${t.top}px`,A.style.height=r>1?`${r}px`:""}function tg(){let e=ko();if(D=Ic(),!D.length||!e){Ne?.dispose(),Ne=void 0,A?.remove(),A=null,At="";return}if(Yo!==e){Uo?.abort(),Uo=new AbortController,e.addEventListener("scroll",ze(Go),{passive:!0,signal:Uo.signal});for(let n of Rp)e.addEventListener(n,Rc,{passive:!0,signal:Uo.signal});Yo=e,He?.disconnect(),He=new ResizeObserver(()=>{e.isConnected&&Tc(e)}),He.observe(e),or=null,nr=new Set}let t=X();if(t&&t!==or&&He&&(He.observe(t),or=t),He)for(let n of document.querySelectorAll(Cc))nr.has(n)||(He.observe(n),nr.add(n));ig(),Tc(e);let o=JSON.stringify(D.map(n=>[n.role,n.ids]));o!==At?(At=o,vt=-1,ng(),Xt&&Date.now()<Xt.until&&Xt.chat===v()&&D[0]?.ids[0]!==Xt.first&&ur(0)):og(),Go()}function Go(){if(!A||!Yo)return;ve=vt>=0?vt:Xp(Yo),A.querySelectorAll(`.${M("tick")}`).forEach((t,o)=>t.classList.toggle(M("tick-current"),o===ve)),A.querySelectorAll(`.${M("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===ve)));let e=A.querySelector(`.${M("toc-head")}`);e&&(e.textContent=`${ve+1} / ${D.length}`)}function og(){A?.querySelectorAll(`.${M("tick")}`).forEach((e,t)=>{let o=D[t],n=qe(o.summary,rr);e.title!==n&&(e.title=n),e.classList.toggle(M("tick-streaming"),o.streaming)}),A?.querySelectorAll(`.${M("row")}`).forEach(e=>{let t=e.lastElementChild,o=qe(D[Number(e.dataset.index)].summary||"\u2026",rr);t&&t.textContent!==o&&(t.textContent=o)})}function ng(){A?.querySelector(`.${M("rail")}`)?.replaceChildren(...D.map((t,o)=>s("button",{class:An(M("tick"),M(`tick-${t.role}`),t.streaming&&M("tick-streaming"),o===ve&&M("tick-current")),title:qe(t.summary,rr),attrs:{type:"button","aria-label":`Jump to message ${o+1}`,"data-message-id":t.ids[0]??""},on:{click:()=>ur(o)}}))),A?.querySelector(`.${M("toc-list")}`)?.replaceChildren(...D.map(_p))}var ke=ze(tg);function Wi(e){if(e===A)return;let t=e.__bloomNavStop;if(t&&t!==Ji)try{t()}catch{}e.isConnected&&e!==A&&e.remove()}function Pc(){let e=[...document.querySelectorAll('[data-bloom="navigator"]')];if(A&&!A.isConnected&&(A=null),A&&e.includes(A)){for(let t of e)Wi(t);return}A=e[0]??null;for(let t of e.slice(1))Wi(t)}function rg(){Ne?.dispose(),Ne=tr({over:e=>e instanceof Node&&!!A?.contains(e),trigger:()=>A?.querySelector(`.${M("rail")}`),panel:()=>A?.querySelector(`.${M("toc")}`),setHeld:e=>A?.classList.toggle(M("open"),e)})}function ig(){Pc(),A&&!A.querySelector(`.${M("rail")}`)&&(A.remove(),A=null,At=""),A||(A=s("div",{class:`bloom-root ${M("root")}`,attrs:{"data-bloom":"navigator"},on:{pointerenter:()=>Ne?.enter(),pointerleave:e=>Ne?.leave(e)}},s("div",{class:M("rail")}),s("div",{class:M("bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:M("toc")},s("div",{class:M("toc-head")}),s("div",{class:M("toc-list")}))),At=""),Ne||rg(),A.isConnected||document.body.append(A),A.querySelector(`.${M("tick")}`)||(At=""),A.__bloomNavStop=Ji}function Rc(){vt=-1,Xt=null,Qi++}function Ji(){for(let e of zi)e();zi=[],Uo?.abort(),He?.disconnect(),He=void 0,Yo=null,or=null,nr=new Set,removeEventListener("keydown",Dc,!0),removeEventListener("resize",ke),Ne?.dispose(),Ne=void 0,A&&delete A.__bloomNavStop,A?.remove(),A=null,At="",Lc(),ar.clear(),Fo="",_e=!1;for(let e of document.querySelectorAll('[data-bloom="navigator"]'))Wi(e)}var ag=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function Dc(e){if(!A||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||ag(document.activeElement)||J("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:ve-1,ArrowDown:ve+1,Home:0,End:D.length-1}[e.key];if(o==null){Rc();return}o<0||o>=D.length||(e.preventDefault(),e.stopPropagation(),ur(o))}var Hc=p({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:cr,styles:vc,start(){Pc(),zi=[I(e=>W(e)&&ke()),he(ke),V.on("conversation",ke),V.on("generate-start",({parentId:e,userId:t})=>{e&&(Ko={parent:e,user:t},ke())}),E.on("rise",ke),E.on("fall",ke)],addEventListener("keydown",Dc,!0),addEventListener("resize",ke,{passive:!0}),ke()},stop:Ji,onSettingsChange:ke});var Nc=`/*
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
`;var re=k("bloom-quotes-"),ra="BloomBetterQuotes",lg=40,Yc=8,cg=1800,_i=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,Uc=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,wt=h({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),Zi,$i,eo,Xi=!1,ea=0,dr=null,mr=null,Fe=null;function ia(){return location.pathname.match(/\/c\/(?!local-)([\w-]+)/)?.[1]??(new URLSearchParams(location.search).get("temporary-chat")==="true"?"temporary":"draft")}function pr(){try{let e=JSON.parse(sessionStorage.getItem(ra)??"[]");return Array.isArray(e)?e.filter(t=>!!t&&typeof t=="object"&&typeof t.id=="string"&&typeof t.text=="string"&&!!t.text):[]}catch{return[]}}function aa(e){try{sessionStorage.setItem(ra,JSON.stringify(e.slice(-lg)))}catch{}}function Qo(e){return pr().find(t=>t.id===e)?.text??""}function ug(e,t){let o=pr().filter(n=>n.id!==e);o.push({id:e,text:t}),aa(o)}function ta(e=ia()){aa(pr().filter(t=>t.id!==e)),fr()}function dg(e){let t=Qo("draft");if(!t||Qo(e))return;let o=pr().filter(n=>n.id!=="draft");o.push({id:e,text:t}),aa(o)}function oa(e){return`${e.getAttribute("aria-label")??""} ${e.getAttribute("title")??""}`}function mg(e){let t=oa(e);return Uc.test(t)&&!/quote|引用/.test(t)?!1:/quote|引用/.test(t)&&_i.test(t)?!0:_i.test(t)&&!Uc.test(t)}function Kc(e){let t=e.cloneNode(!0),o=[...t.querySelectorAll("button, [role='button']")],n=new Set(o.map(r=>r.getAttribute("aria-label")).filter(Boolean));for(let r of o)r.remove();for(let r of t.querySelectorAll("*"))!r.children.length&&n.has(y(r.textContent??""))&&r.remove();return y(t.textContent??"")}function fg(e){let t=X(),o=e.parentElement,n=0;for(;o&&o!==t&&n<5;){if(n++,o.matches(u.composerInput)||o.querySelector(u.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=Kc(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function gr(){let e=X();if(!e)return null;for(let t of e.querySelectorAll("button, [role='button']")){if(t.closest("[data-bloom]")||!mg(t))continue;let o=fg(t),n=o?Kc(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:t}}return null}function pg(e){let t=e.closest(u.searchUnit)??e.closest(u.oldMessage);return t&&(Ft(t)??t.getAttribute("data-message-author-role"))==="user"?t:null}function sa(e){return y(e).slice(0,48)}function gg(e,t){let o=sa(e);if(o.length<Yc)return null;let n=null;for(let r of Lo()){if(t&&(r===t||t.contains(r)||r.contains(t)))continue;let i=y(r.textContent??"");if(!i.includes(o))continue;let a=o.length/Math.max(i.length,1);(!n||a>n.score)&&(n={el:r,score:a})}return n?.el??null}function hg(e,t){let o=sa(t),n=e;for(let r of e.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&y(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${re("hit")}`)?.classList.remove(re("hit")),n.classList.add(re("hit")),window.clearTimeout(ea),ea=window.setTimeout(()=>n.classList.remove(re("hit")),cg)}function Fc(e){let t=e.closest(u.timelineScroll)??document.scrollingElement;if(!(t instanceof HTMLElement)&&t!==document.scrollingElement)return;let o=e.getBoundingClientRect();if(o.height<1||!t)return;let n=t.getBoundingClientRect(),r=X()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,a=o.top+o.height/2-(n.top+i)/2;Math.abs(a)<8||t.scrollTo({top:t.scrollTop+a,behavior:"smooth"})}function la(){if(!Fe||!dr?.isConnected)return;let e=dr.getBoundingClientRect();e.width<1||(Fe.style.top=`${Math.max(8,e.top+8)}px`,Fe.style.left=`${Math.max(8,e.right-Fe.offsetWidth-8)}px`)}function bg(e,t,o){dr=e,mr=t,Fe??=s("button",{class:`bloom-root ${re("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),Fe.isConnected||document.body.append(Fe),hg(e,o),la()}function Gc(){Fe?.remove(),Fe=null,dr=null,mr=null,document.querySelector(`.${re("hit")}`)?.classList.remove(re("hit"))}function Qc(){return document.querySelector('[data-bloom="quote-chip"]')}function fr(){Qc()?.remove()}function yg(e){let o=X()?.getBoundingClientRect();!o||o.width<8||(e.style.width=`${Math.max(120,o.width-24)}px`,e.style.left=`${o.left+12}px`,e.style.top=`${Math.max(8,o.top-e.offsetHeight-8)}px`)}function vg(e){let t=Qc();t||(t=s("div",{class:`bloom-root ${re("chip")}`,attrs:{"data-bloom":"quote-chip"}},s("span",{class:re("text")}),s("button",{class:re("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(t));let o=t.querySelector(`.${re("text")}`),n=y(e);o&&o.textContent!==n&&(o.textContent=n),t.dataset.text=e,yg(t)}function na(){if(!Xi){Xi=!0;try{let e=ia(),t=gr();wt.store.persistAcrossChats&&t&&Qo(e)!==t.text&&ug(e,t.text);let o=wt.store.persistAcrossChats?Qo(e):"";!o||t&&y(t.text)===y(o)?fr():vg(o),la()}finally{Xi=!1}}}function Ag(e){let t=e.closest('[data-bloom="quote-chip"]');if(t instanceof HTMLElement&&!e.closest(`.${re("x")}`)){let i=t.dataset.text??t.querySelector(`.${re("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:t}:null}let o=e.closest("blockquote");if(o instanceof HTMLElement&&!e.closest("a, button")){let i=pg(o),a=y(o.textContent??"");if(i&&a)return{text:a,skip:i,origin:o}}let n=X();if(!n||!n.contains(e)||ft(e)||e.closest("button, [role='button']"))return null;let r=gr();return!r||!r.row.contains(e)?null:{text:r.text,skip:null,origin:r.row}}function wg(e){let{target:t}=e;if(!(t instanceof Element))return;if(t.closest('[data-bloom="quote-back"]')){e.preventDefault(),e.stopPropagation(),mr?.isConnected&&Fc(mr);return}if(t.closest(`.${re("x")}`)){e.preventDefault(),e.stopPropagation(),ta();return}let o=gr();if(o&&(t===o.dismiss||o.dismiss.contains(t))){ta();return}if(xg(t)&&zc(),!wt.store.jumpToPassage)return;let n=Ag(t);if(!n)return;let r=gg(n.text,n.skip);r&&(e.preventDefault(),e.stopPropagation(),bg(r,n.origin,n.text),Fc(r))}function xg(e){let t=e.closest("button, [role='button']");return!(t instanceof HTMLElement)||t.closest("[data-bloom]")||!X()?.contains(t)?!1:/send|submit|发送|提交/i.test(oa(t))&&!_i.test(oa(t))}function Sg(e){return!(e instanceof KeyboardEvent)||e.key!=="Enter"||e.shiftKey||e.isComposing?!1:ft(e.target)}function zc(){if(!wt.store.persistAcrossChats)return;let e=ia(),t=Qo(e);if(t){if(!gr()){let o=B(),n=sa(t);n.length>=Yc&&!y(o).includes(n)&&ce(`> ${t}

${o}`.trim())}ta(e)}}function qg(e){Sg(e)&&zc()}function Eg(e){!e.prevId&&e.id&&dg(e.id),na()}var jc=p({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:wt,styles:Nc,onSettingsChange(e){e==="jumpToPassage"&&!wt.store.jumpToPassage&&Gc(),e==="persistAcrossChats"&&!wt.store.persistAcrossChats&&(sessionStorage.removeItem(ra),fr()),na()},start(){eo=new AbortController,document.addEventListener("pointerdown",wg,{capture:!0,signal:eo.signal}),document.addEventListener("keydown",qg,{capture:!0,signal:eo.signal}),addEventListener("scroll",la,{capture:!0,passive:!0,signal:eo.signal}),$i=he(Eg),Zi=I(e=>W(e)&&na())},stop(){eo?.abort(),eo=void 0,$i?.(),$i=void 0,Zi?.(),Zi=void 0,window.clearTimeout(ea),Gc(),fr()}});var Vc=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],yr={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Tg={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Cg="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",ca=32,vr=64,ua="#FCFCFC",da="#111111",Mg=14,Ar=51.5,kg=12.5,Lg=9.75,Wc=52,Ig=10.5,Bg=7.75,Og={rotate:e=>e.arc(Ar,Ar,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function hr(e){let t=document.createElement("canvas");t.width=t.height=ca;let o=t.getContext("2d");return o?(o.scale(ca/vr,ca/vr),e(o),t.toDataURL("image/png")):""}function br(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D(Cg);o&&(e.strokeStyle=da,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function wr(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function Pg(e,t){wr(e,Ar,kg,da),wr(e,Ar,Lg,yr[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),Og[t](e),e.stroke()}function Rg(e,t){e.beginPath(),e.roundRect(0,0,vr,vr,Mg),e.fillStyle=t,e.fill()}var Dg=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function Jc(e,t){switch(e){case"original":return Dg(Tg[t]);case"hole":return hr(o=>br(o,yr[t],!0));case"bg":return hr(o=>{Rg(o,yr[t]),br(o,ua,!1)});case"dot":return hr(o=>{br(o,ua,!0),wr(o,Wc,Ig,da),wr(o,Wc,Bg,yr[t])});case"badge":return hr(o=>{br(o,ua,!0),Pg(o,t)})}}var jo="bloom-chat-state-favicon",Wo="data-bloom-rel",pa="data-bloom-media",Zc="bloom-parked-icon",Hg="/favicon.ico",Xc=h({style:{type:"select",description:"How the tab icon shows the chat state.",options:Vc,default:"bg"}}),et=null,_c="",xr=null,eu="",$c=new Map,ga,ma=[],tu=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${Wo}]`)];function ha(){for(let e of tu())e.id!==jo&&(e.hasAttribute(Wo)||(eu||=e.href,e.setAttribute(Wo,e.rel),e.setAttribute(pa,e.getAttribute("media")??"")),e.rel!==Zc&&(e.rel=Zc),e.media!=="not all"&&(e.media="not all"))}function Ng(){for(let e of tu()){let t=e.getAttribute(Wo);if(t==null)continue;e.rel=t;let o=e.getAttribute(pa);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(Wo),e.removeAttribute(pa)}}function ou(){let e=document.getElementById(jo);return e||(e=document.createElement("link"),e.id=jo,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function Ug(e){if(e==="wait")return eu||Hg;let t=Xc.store.style,o=`${t}:${e}`,n=$c.get(o);return n||$c.set(o,n=Jc(t,e)),n}function fa(e){if(e)return"rotate";let t=B();return et&&t&&t!==_c&&(et=null),et==="error"?"error":et==="done"?"done":t?"ready":"wait"}function zo(e,t=!1){if(e===xr&&!t)return;xr=e;let o=ou(),n=Ug(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function Fg(){ga=new MutationObserver(()=>{ha(),document.head.lastElementChild?.id!==jo&&ou()}),ga.observe(document.head,{childList:!0})}var nu=p({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"HostReady",settings:Xc,start(){ha(),zo(fa(G().generating),!0),Fg(),ma=[E.on("rise",()=>{et=null,zo("rotate")}),E.on("fall",({outcome:e})=>{et=e==="done"||e==="error"?e:null,_c=B(),zo(fa(!1))}),E.on("context",({migrated:e})=>{e||(et=null)}),E.on("tick",({generating:e})=>{ha(),zo(fa(e))})]},stop(){for(let e of ma)e();ma=[],ga?.disconnect(),document.getElementById(jo)?.remove(),Ng(),xr=null,et=null},onSettingsChange(){zo(xr??"wait",!0)}});var tt="data-bloom-invite",Gg=/^(?:invite team members|invite members|邀请团队成员|邀请成员)$/i,ru=':is(button, a:not([href^="/c/"])):not(main *, [role="dialog"] *)',Yg={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${u.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])'],hideInvite:[`[${tt}]`,`div:has(> [${tt}]:only-child)`]},iu=h({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0},hideInvite:{type:"boolean",description:"Hide Invite team members in the sidebar.",default:!0}}),Sr,ba=!1;function Kg(e){if(W(e))for(let t of document.querySelectorAll(`${ru}, [${tt}]`))!t.matches(ru)||!Gg.test(y(t.textContent??""))?t.removeAttribute(tt):t.hasAttribute(tt)||t.setAttribute(tt,"")}var au=p({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads, notices and Invite team members.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:iu,styles:()=>Qe(Object.entries(Yg).flatMap(([e,t])=>iu.store[e]?t:[])),start(){ba=!0,pt().then(()=>{ba&&!Sr&&(Sr=I(Kg))})},stop(){ba=!1,Sr?.(),Sr=void 0;for(let e of document.querySelectorAll(`[${tt}]`))e.removeAttribute(tt)}});var Qg=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function zg(){let e=y(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!Qg.has(e.toLowerCase())?e:null}function xt(e){return e?we(e)?.title??Gl(e)??(e===v()?zg():null):null}var va="complete-toast",jg=1e3,Aa=h({keepUntilDismissed:{type:"boolean",description:"Don't auto-close the toast. Dismiss with \xD7, or by opening the chat.",default:!1},duration:{type:"slider",description:"Seconds before the toast closes. Ignored when Keep Until Dismissed is on.",min:0,max:20,default:6,unit:"s"}}),wa=null,ya=[];function Wg(e){let t=Ro(e)[0];t?t.click():location.assign(`/c/${e}`)}function Vg(e){wa=e,zn({key:va,title:xt(e)??"ChatGPT",message:"Response ready",type:"success",onClick:()=>Wg(e),onClose:()=>{wa=null},duration:Aa.store.keepUntilDismissed?0:Aa.store.duration*jg})}var su=p({name:"CompleteToast",description:"Show a toast when a chat you left finishes answering. Click it to open that chat.",authors:["Bloom contributors"],tags:["chat"],icon:"check",enabledByDefault:!0,settings:Aa,start(){ya=[E.on("background",({conversationId:e})=>Vg(e)),he(({id:e})=>e===wa&&Ze(va))]},stop(){for(let e of ya)e();ya=[],Ze(va)}});var to=`form:has(:is(${u.composerInput})), ${u.oldComposerForm}`,qr='[class*="ComposerLayoutBody"]',Sa='[class*="ComposerLayoutRoot"]',Jg='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',Zg=`:is(${to}) ${qr}, :is(${to}):not(:has(${qr})) ${Sa}, :is(${to}):not(:has(${qr})):not(:has(${Sa})) :is(${Jg})`,$g='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',Xg='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',_g="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))";var eh="composer-fill",lu=h({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function th(){let{opacity:e,blur:t}=lu.store;if(e>=100)return"";let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${_g} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important;-webkit-backdrop-filter:blur(${t}px)!important`;return`:is(${$g}), :is(${to}){${o}}:is(${Xg}){display:none!important}${Zg}{${n}}:is(${to}):has(${qr}) ${Sa}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${to}) :is(${u.composerInput}){background-color:transparent!important}`}function xa(){for(let e of document.querySelectorAll(`[data-bloom="${eh}"]`))e.remove()}var cu=p({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:lu,styles:th,start(){xa()},stop(){xa()},onSettingsChange(){xa()}});var oh=1200,nh=8e3,rh=150,ih=20,uu=6,Ta="continue where you left",ah=/message delivery timed out|please try again/i,du=/waiting for the complete answer/i,mu=h({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:Ta,placeholder:Ta}}),qa=[],Tr=0,Vo=!1,Jo=0,no="",Er="",Ca=0,ro=!1,Zo=!1,Cr=!0,oo="",Ma=0,Mr=!1,sh=()=>mu.store.prompt.trim()||Ta;function fu(){return(J(u.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function pu(){let e=fu();return!e||du.test(e)||!ah.test(e)?"":e}function lh(){let e=fu();return e&&du.test(e)?e:""}function ch(){let e=Ut()?.querySelectorAll(u.turn),t=e?.[e.length-1];return`${t?.getAttribute("data-turn-key")??""}:${t?.textContent?.length??0}`}function gu(e,t,o){if(o===Tr){if(G().generating||B()!==e||t>=ih){ro=!1,G().generating||(no="");return}In(),setTimeout(()=>gu(e,t+1,o),rh)}}function uh(e){let t=Tr;if(G().generating||B()&&B()!==e){ro=!1,no="";return}ce(e),Mr=!0,qo(()=>{t===Tr&&gu(e,0,t)})}function hu(e){return e===no||Jo>=uu||G().generating||B()?!1:(no=e,Jo+=1,ro=!0,uh(sh()),!0)}function dh(){if(Vo||ro||Zo)return;let e=Date.now(),t=pu();if(t){if(oo="",t!==Er){Er=t,Ca=e;return}if(e-Ca<oh)return;hu(`${v()??""}:${t}`);return}if(Er="",!lh()){Cr=!0,oo="";return}if(!Cr||!G().generating||B())return;let n=`${v()??""}:${ch()}`;if(n!==oo){oo=n,Ma=e;return}if(e-Ma<nh||Jo>=uu)return;let r=Ht();r&&(Zo=!0,r.click())}function Ea(){Tr+=1,Vo=!1,Jo=0,no="",Er="",Ca=0,ro=!1,Zo=!1,Cr=!0,oo="",Ma=0,Mr=!1}var bu=p({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:mu,start(){Ea(),qa=[E.on("rise",()=>{Vo=!1,no="",ro=!1,Mr&&(Mr=!1,Cr=!1,oo="")}),E.on("fall",({outcome:e})=>{if(Zo){Zo=!1,e==="left"?Vo=!0:hu(`${v()??""}:stall`);return}(e==="stopped"||e==="left")&&(Vo=!0),e==="done"&&!pu()&&(Jo=0)}),E.on("context",({migrated:e})=>{e||Ea()}),E.on("tick",dh)]},stop(){for(let e of qa)e();qa=[],Ea()}});var Ge=k("bloom-csi-"),mh=256,fh=160,kr=1,yu=4,ph=.1,gh=.0015,hh=250;function bh(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function yh(e){return new Promise((t,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function vh(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:pe(t.x,n,1-n),y:pe(t.y,r,1-r)}}function vu(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function Ah(e,t){let o=s("canvas");return o.width=o.height=mh,vu(o,e,t),o.toDataURL("image/png")}function Au(e){let t=null,o={x:z.store.cropX,y:z.store.cropY,zoom:z.store.cropZoom},n,r=s("canvas",{class:Ge("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=fh*devicePixelRatio;let i=s("div",{class:`bloom-muted ${Ge("status")}`}),a=s("div",{class:Ge("zoom")}),c=s("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(b,x=!0){t&&(o=vh(t,b),vu(r,t,o),x&&(clearTimeout(n),n=setTimeout(()=>{t&&(z.store.cropX=o.x,z.store.cropY=o.y,z.store.cropZoom=o.zoom,z.store.avatarUrl=Ah(t,o))},hh)))}function d(){a.replaceChildren(Wn(o.zoom,kr,yu,ph,"\xD7",b=>l({...o,zoom:b})))}async function m(b,x){i.textContent="";try{t=await yh(b),x&&(z.store.avatarSource=b,o={x:.5,y:.5,zoom:kr}),e.classList.add(Ge("has-image")),d(),l(o,x)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let f=b=>{b?.type.startsWith("image/")&&bh(b).then(x=>m(x,!0))};c.addEventListener("change",()=>f(c.files?.[0])),r.addEventListener("wheel",b=>{t&&(b.preventDefault(),l({...o,zoom:pe(o.zoom*(1-b.deltaY*gh),kr,yu)}),d())},{passive:!1}),r.addEventListener("pointerdown",b=>{if(!t)return;r.setPointerCapture(b.pointerId);let x={...o},$=r.getBoundingClientRect(),lt=te=>{if(!t)return;let Re=Math.max($.width/t.naturalWidth,$.height/t.naturalHeight)*o.zoom;l({...o,x:x.x-(te.clientX-b.clientX)/(t.naturalWidth*Re),y:x.y-(te.clientY-b.clientY)/(t.naturalHeight*Re)})};r.addEventListener("pointermove",lt),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",lt),{once:!0})});let T=s("div",{class:Ge("cropper"),attrs:{tabindex:"0"},on:{paste:b=>f([...b.clipboardData?.files??[]].find(x=>x.type.startsWith("image/"))),dragover:b=>b.preventDefault(),drop:b=>{b.preventDefault(),f(b.dataTransfer?.files[0])}}},s("div",{class:Ge("stage")},r),s("div",{class:Ge("controls")},Po("",b=>b.trim()&&void m(b.trim(),!0),"https://\u2026 or data:image/\u2026","url"),s("div",{class:Ge("buttons")},H("Choose file",()=>c.click()),H("Reset crop",()=>{l({x:.5,y:.5,zoom:kr}),d()}),H("Clear",()=>{t=null,e.classList.remove(Ge("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),a.replaceChildren(),z.store.avatarUrl="",z.store.avatarSource=""},"danger")),a,i,c));return e.append(T),z.store.avatarSource&&m(z.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var wu=`/*
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
`;var $o="data-bloom-csi-avatar",ka="data-bloom-csi-sized",Eu="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",xh=32,z=h({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>Au(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),xu=[];function Tu(e){e.removeAttribute($o),e.removeAttribute(ka)}function Su(e){return(z.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function qu(e=[]){if(!W(e))return;let t=z.store.displayName.trim()||null,o=!!z.store.avatarUrl,n=new Set(t?Su("name"):[]);for(let i of document.querySelectorAll(Eu))n.has(i)||dt(i,null);for(let i of n)dt(i,t);let r=new Set(o?Su("avatar"):[]);for(let i of document.querySelectorAll(`[${$o}]`))r.has(i)||Tu(i);for(let i of r)i.hasAttribute($o)||i.setAttribute($o,""),i.toggleAttribute(ka,!i.closest('[role="menu"]'))}function Sh(){let e=z.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${z.store.avatarSize}px}:is(${u.rail}, ${u.oldRail}) [${ka}]{--bloom-csi-size:${xh}px}`:""}var Cu=p({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:z,styles:()=>`${Sh()}
${wu}`,start(){xu=[Me(),I(qu)]},stop(){for(let e of xu)e();for(let e of document.querySelectorAll(`[${$o}]`))Tu(e);for(let e of document.querySelectorAll(Eu))dt(e,null)},onSettingsChange(){qu()}});var io=k("bloom-greeting-"),Mu=30,ku=100;function Lu(e){let t=-1,o=s("textarea",{class:`bloom-input ${io("input")}`,attrs:{maxlength:String(ku),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=H("Add",i),r=s("div",{class:io("list")});function i(){let l=o.value.trim().slice(0,ku);if(!l)return;let d=[...P.store.greetings];t>=0?d[t]=l:d.length<Mu&&d.push(l),P.store.greetings=d,t=-1,o.value="",a()}function a(){let{greetings:l}=P.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&l.length>=Mu,r.replaceChildren(...l.length?l.map((d,m)=>s("div",{class:io("row",m===t?"row-editing":"row-idle")},s("div",{class:io("text"),text:d}),N("edit","Edit",()=>{t=m,o.value=d,o.focus(),a()}),N("trash","Delete",()=>{P.store.greetings=l.filter((f,T)=>T!==m),t===m&&(t=-1),a()}))):[s("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),e.append(s("div",{class:io("editor")},r,s("div",{class:io("form")},o,n))),a();let c=Dt((l,d)=>l==="GreetingCustomizer"&&d==="greetings"&&a());return()=>{c(),e.replaceChildren()}}var Iu=`/*
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
`;var Ir="data-bloom-greeting",Eh=1e3,Th=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],P=h({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>Lu(e)},greetings:{type:"custom",default:Th},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),Lr,Bu=[],La,tn=()=>Nt()&&!Te(),Ch=e=>e.replaceAll(/\s*\n\s*/g," ").trim(),Pu=()=>P.store.greetings.filter(e=>typeof e=="string"&&e.trim());function on(){let e=Pu();if(e.length)if(P.store.order==="random"&&e.length>1){let t=P.store.lastRandom;for(;t===P.store.lastRandom;)t=Math.floor(Math.random()*e.length);P.store.lastRandom=t,P.store.index=t}else P.store.index=(P.store.index+1)%e.length}function Mh(){return tn()&&ge()?J(u.homeHeading):null}function Xo(){for(let e of document.querySelectorAll(`[${Ir}]`))e.removeAttribute(Ir),dt(e,null)}function _o(){for(let e of document.querySelectorAll("[data-bloom-placeholder]"))e.removeAttribute("data-bloom-placeholder")}function Ou(e){let t=ge(),o=Ch(e);if(!t||!o||B(t)){_o();return}t.getAttribute("data-bloom-placeholder")!==o&&t.setAttribute("data-bloom-placeholder",o)}function en(){let e=Pu(),t=Nn(),o=tn();if(!e.length||!t&&!o){Xo(),_o();return}if(t){Xo(),Ou(e[0]??"");return}let n=Mh();n?((P.store.index<0||P.store.index>=e.length)&&on(),n.setAttribute(Ir,""),dt(n,e[Math.max(0,P.store.index)%e.length]??"")):Xo(),P.store.heroOnlyOutsideProject?_o():Ou(e[Math.max(0,P.store.index)%e.length]??"")}function Ia(){clearInterval(Lr),Lr=void 0,P.store.mode==="interval"&&tn()&&(Lr=setInterval(()=>{on(),en()},P.store.intervalSec*Eh))}function kh(e){P.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${Ir}]`)||getSelection()?.toString()||(on(),en())}function Lh(){tn()&&P.store.mode==="refresh"&&on(),Ia(),en()}var Ru=p({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:P,styles:Iu,start(){Xo(),_o(),La=new AbortController,document.addEventListener("click",kh,{signal:La.signal}),tn()&&P.store.mode==="refresh"&&on(),Ia(),Bu=[I(e=>W(e)&&en()),he(Lh)]},stop(){La?.abort();for(let e of Bu)e();clearInterval(Lr),Xo(),_o()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&Ia(),en()}});var nn=k("bloom-history-"),Ba=10,Ih=3e3;function Oa(e,t){let o="",n=0,r=new Set,i=s("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),a=s("div",{class:nn("list")}),c=s("div",{class:nn("pager")}),l,d=H("Clear all",()=>{if(!l){d.textContent="Click again to clear",l=setTimeout(()=>{l=void 0,d.textContent="Clear all"},Ih);return}clearTimeout(l),l=void 0,d.textContent="Clear all",rn([])},"danger");function m(){let T=[...St.store.entries].toReversed(),b=o.trim().toLowerCase(),x=b?T.filter(fe=>fe.toLowerCase().includes(b)):T,$=Math.max(1,Math.ceil(x.length/Ba));n=Math.min(n,$-1);let lt=x.slice(n*Ba,(n+1)*Ba).map(fe=>s("div",{class:nn("row")},s("button",{class:nn("text",r.has(fe)?"text-open":"text-closed"),text:fe,title:r.has(fe)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{r.delete(fe)||r.add(fe),m()}}}),t&&N("edit","Use",()=>t(fe)),N("copy","Copy",()=>void yn(fe)),N("trash","Delete",()=>rn(St.store.entries.filter(Zr=>Zr!==fe)))));a.replaceChildren(...lt.length?lt:[s("div",{class:"bloom-muted",text:b?"No matching prompts.":"No saved prompts yet."})]),c.replaceChildren(s("span",{class:"bloom-muted",text:`${x.length} ${b?"matching":"saved"} \xB7 page ${n+1} of ${$}`}),H("Previous",()=>{n--,m()}),H("Next",()=>{n++,m()}),d);let[te,Re]=c.querySelectorAll("button");te.disabled=n===0,Re.disabled=n>=$-1,d.disabled=!T.length}i.addEventListener("input",()=>{o=i.value,n=0,m()}),e.append(s("div",{class:nn("manager")},i,a,c)),m();let f=Dt((T,b)=>T==="InputHistory"&&b==="entries"&&m());return()=>{f(),clearTimeout(l),e.replaceChildren()}}var Du=`/*
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
`;var Ye=k("bloom-history-"),Oh=2e3,St=h({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>Oa(e)},entries:{type:"custom",default:[]}}),U=null,Pa={text:"",at:0},Le=null,ot=null,Ra,so=()=>St.store.entries.filter(e=>typeof e=="string");function rn(e){St.store.entries=e.slice(-St.store.maxEntries)}function Da(e){let t=e.trim();if(!t)return;let o=Date.now();t===Pa.text&&o-Pa.at<Oh||(Pa={text:t,at:o},rn([...so().filter(n=>n!==t),t]))}function Hu(e){e.preventDefault()}function Ph(){let e=s("button",{class:Ye("hud-count"),attrs:{type:"button"},on:{mousedown:Hu,click:Nh}}),t=s("button",{class:Ye("hud-x"),text:"\xD7",attrs:{type:"button","aria-label":"Exit history"},on:{mousedown:Hu,click:Rh}});return s("div",{class:`bloom-root ${Ye("hud")}`,attrs:{"data-bloom":"history-hud",role:"group","aria-live":"polite","aria-label":"Input history"}},e,t)}function Nu(e,t){let o=ge();if(!o||ot)return;Le??=Ph();let n=`${e+1} / ${t}`,r=Le.querySelector(`.${Ye("hud-count")}`);r?.replaceChildren(n),r?.setAttribute("aria-label",`Show input history (${n})`);let i=(o.closest("form")??o).getBoundingClientRect();Le.style.left=`${i.left+i.width/2}px`,Le.style.top=`${i.top}px`,Le.isConnected||document.body.append(Le)}function ao(){U=null,Le?.remove()}function Rh(){U&&ce(U.draft),ao(),ge()?.focus()}function Uu(e){let t=so();if(!U)return;let o=t[e];U.index=e,U.shown=o,ce(o),Nu(t.length-1-e,t.length)}function Dh(e){let t=so();if(!t.length)return!1;if(!U){if(e===1)return!1;U={index:t.length,draft:B(),shown:""}}let o=U.index+e;return o<0?!0:o>=t.length?(ce(U.draft),ao(),!0):(Uu(o),!0)}function Hh(e){let t=so().indexOf(e);an(),!(t<0)&&(U??={index:t,draft:B(),shown:""},Uu(t),ge()?.focus())}function an(){if(!ot)return;ot.release(),ot.controller.abort(),ot.root.remove(),ot=null;let e=so();U&&e[U.index]===U.shown?Nu(e.length-1-U.index,e.length):U=null}function Nh(){if(ot)return;Le?.remove();let e=s("div",{class:Ye("dialog-body")}),t=s("div",{class:`bloom-root ${Ye("backdrop")}`,attrs:{"data-bloom":"history-dialog"},on:{click:n=>n.target===n.currentTarget&&an()}},s("div",{class:Ye("dialog"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Input history"}},s("div",{class:Ye("dialog-header")},s("h2",{class:Ye("dialog-title"),text:"Input history"}),N("close","Close",an)),e));t.addEventListener("keydown",n=>n.stopPropagation());let o=new AbortController;document.addEventListener("keydown",n=>{n.key==="Escape"&&(n.preventDefault(),n.stopPropagation(),an())},{capture:!0,signal:o.signal}),be(t),ot={root:t,release:Oa(e,Hh),controller:o},e.querySelector("input")?.focus()}function Fu(e){return ft(e)?e:e instanceof HTMLElement?e.closest(u.composerInput):null}function Uh(){if(ge()?.closest("[data-chatgpt-composer], [data-composer-input], form")?.querySelector('[aria-expanded="true"]'))return!0;for(let t of document.querySelectorAll('[role="listbox"], [role="menu"], [data-radix-popper-content-wrapper], [cmdk-root], [cmdk-list]')){if(!(t instanceof HTMLElement)||t.closest("[data-bloom]"))continue;let o=getComputedStyle(t);if(!(o.display==="none"||o.visibility==="hidden"))return!0}return!1}function Fh(e){if(e.isComposing||e.key==="Process"||e.keyCode===229)return;let t=Fu(e.target);if(!t)return;if(e.key==="Enter"&&!e.shiftKey){Da(B(t)),ao();return}if(e.key==="Escape"&&U){ce(U.draft),ao(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey||Uh())return;let o=$s(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!U||Dh(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function Gh(e){U&&Fu(e.target)&&B()!==U.shown.trim()&&ao()}function Yh(e){e.target instanceof Element&&e.target.closest(u.sendButton)&&Da(B())}var Gu=p({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before. Click the counter to browse history.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:St,styles:Du,start(){for(let t of document.querySelectorAll('[data-bloom="history-hud"], [data-bloom="history-dialog"]'))t.remove();Le=null,Ra=new AbortController;let{signal:e}=Ra;document.addEventListener("keydown",Fh,{capture:!0,signal:e}),document.addEventListener("input",Gh,{capture:!0,signal:e}),document.addEventListener("click",Yh,{capture:!0,signal:e}),document.addEventListener("submit",()=>Da(B()),{capture:!0,signal:e})},stop(){Ra?.abort(),an(),ao();for(let e of document.querySelectorAll('[data-bloom="history-hud"]'))e.remove();Le=null},onSettingsChange(e){e==="maxEntries"&&rn(so())}});var Yu=`/*
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
`;var Qh=1500,zh=5e3,jh=2e3,Vu=[{label:"UTC",value:"UTC"},{label:"\u7F8E\u56FD\u4E1C\u90E8",value:"America/New_York"},{label:"\u7F8E\u56FD\u4E2D\u90E8",value:"America/Chicago"},{label:"\u7F8E\u56FD\u5C71\u5730",value:"America/Denver"},{label:"\u7F8E\u56FD\u897F\u90E8",value:"America/Los_Angeles"},{label:"\u65E5\u672C",value:"Asia/Tokyo"},{label:"\u53F0\u6E7E",value:"Asia/Taipei"}],lo=h({sourceTimeZone:{type:"select",description:"Zone the stored clock was written in. Leave UTC for ChatGPT create_time. Pick the same zone as the Shit GPT plugin only when that clock is a wall time in that zone; it is then shown in the system timezone.",options:Vu,default:"UTC"},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),Br=new Map,Ha=new Set,Ju=0,Or,Ku=[],Qu="",Pr=new Map;function Zu(e,t){Br.get(e)!==t&&(Br.set(e,t),clearTimeout(Or),Or=setTimeout($u,jh))}function $u(){let e={...lo.store.stamps,...Object.fromEntries(Br)};lo.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,Qh))}function Wh(e){let t=we(v())?.times;for(let o=e.length-1;o>=0;o--){let n=Br.get(e[o])??t?.get(e[o])??lo.store.stamps[e[o]];if(n)return n}return null}var Vh=()=>G().generating||Date.now()-Ju<zh;function Ua(){return Intl.DateTimeFormat().resolvedOptions().timeZone}function Xu(){let e=lo.store.sourceTimeZone;if(!e||e==="UTC")return"UTC";try{return Intl.DateTimeFormat(void 0,{timeZone:e}),e}catch{return"UTC"}}function _u(e,t){let o={};for(let n of new Intl.DateTimeFormat("en-US",{timeZone:t,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(e)))o[n.type]=n.value;return{y:+o.year,m:+o.month,d:+o.day,h:+o.hour%24,mi:+o.minute,s:+o.second}}function ed(e){return Date.UTC(e.y,e.m-1,e.d,e.h,e.mi,e.s)}function zu(e,t){let o=e;for(let n=0;n<4;n++){let r=e-ed(_u(o,t));if(r===0)return o;o+=r}return o}function Jh(e,t){if(t==="UTC")return e;let o=(e%1e3+1e3)%1e3,n=e-o,r=new Date(n),i=Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),r.getUTCHours(),r.getUTCMinutes(),r.getUTCSeconds()),a=zu(i,t),c=3600*1e3,l=Number.POSITIVE_INFINITY;for(let d of[-c,0,c]){let m=a+d;ed(_u(m,t))===i&&m<l&&(l=m)}return l!==Number.POSITIVE_INFINITY?l+o:zu(i+c,t)+o}function Zh(e,t){let o=Xu();return t||o==="UTC"?e:Jh(e,o)}function Na(e,t){return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(e)}function $h(e){let t=Ua(),o=Date.now(),n={hour:"2-digit",minute:"2-digit",timeZone:t};if(Na(e,t)===Na(o,t))return new Intl.DateTimeFormat(void 0,n).format(e);let r=a=>new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric"}).format(a),i=r(e)===r(o)?{}:{year:"numeric"};return new Intl.DateTimeFormat(void 0,{...i,month:"short",day:"numeric",...n}).format(e)}function Xh(e,t){let o=new Date(t).toLocaleString(void 0,{timeZone:Ua()}),n=Xu();if(n==="UTC"||t===e)return o;let r=new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"UTC"}).format(e);return`${Vu.find(a=>a.value===n)?.label??n} ${r} \u2192 ${o}`}function _h(e){let t=Ft(e)??e.getAttribute("data-message-author-role")??e.closest(u.turn)?.getAttribute("data-turn")??e.querySelector(u.authorRole)?.getAttribute("data-message-author-role");if(bi(t))return t;let o=Mo(e).at(-1);return we(v())?.chain.find(n=>n.id===o)?.role??null}var ju='[class*="group/activity-header"]';function eb(e){let t=e.parentElement;if(!t)return null;let o=e.closest(u.turn);return o&&t!==o&&!o.contains(t)?null:t}function tb(e){let t=e;for(let o=0;o<8&&t;o++){let n=eb(t);if(!n)return null;let r=[...n.children],i=r.indexOf(t);for(let a=i-1;a>=0;a--){let c=r[a],l=c.matches(ju)?c:c.querySelector(ju);if(l)return l;if(c.matches(u.searchUnit)||c.querySelector(u.searchUnit))return null}if(n===t.closest(u.turn))return null;t=n}return null}function ob(e){let t=e.parentElement;for(let o=0;o<4&&t;o++){if(t.classList.contains("flex-col"))return t;t=t.parentElement}return e.parentElement??e}function nb(e,t){if(t==="assistant"){let o=tb(e);if(o)return ob(o)}return e}function Wu(e){return e.querySelector(':scope > time[data-bloom="timestamp"]')}function rb(e,t){let o=`${e}:${t}`,n=Pr.get(o);if(n)return n;let r=Zh(e,t),i={instant:r,text:$h(r)};return Pr.set(o,i),i}function ib({unit:e,role:t,target:o},n,r){let i=Mo(e);if(!i.length||!De(e)||e.querySelector("time:not([data-bloom])"))return;if(!n){Wu(e)?.remove();return}let a=Wh(i),c=!1;if(!a&&Vh()){a=Date.now();let T=i.at(-1);Ha.add(T),Zu(T,a),c=!0}else a&&Ha.has(i.at(-1))&&(c=!0);if(t==="assistant"&&r?.contains(e))return;let l=o.querySelector('time[data-bloom="timestamp"]')??Wu(e);if(!a||lo.store.hideOwnMessages&&t==="user"){l?.remove();return}let{instant:d,text:m}=rb(a,c);if(l?.textContent===m&&l.parentElement===o&&l===o.firstElementChild)return;let f=s("time",{class:`bloom-timestamp bloom-timestamp-${t??"assistant"}`,text:m,title:Xh(a,d),attrs:{"data-bloom":"timestamp",datetime:new Date(d).toISOString()}});l&&l.replaceWith(f),(f.parentElement!==o||f!==o.firstElementChild)&&o.prepend(f)}var sn=ze(()=>{let e=Na(Date.now(),Ua());e!==Qu&&(Pr.clear(),Qu=e);let t=G().generating?[...document.querySelectorAll(u.turn)].at(-1):void 0,o=Lo().map(r=>{let i=_h(r);return{unit:r,role:i,target:nb(r,i)}}),n=new Map(o.map(r=>[r.target,r.unit]));for(let r of o)ib(r,n.get(r.target)===r.unit,t)}),td=p({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:lo,styles:Yu,start(){Ku=[I(e=>W(e)&&sn()),V.on("conversation",sn),V.on("message-time",({messageId:e,time:t})=>{Ha.delete(e),Zu(e,t),sn()}),E.on("fall",()=>{Ju=Date.now(),sn()})]},stop(){for(let e of Ku)e();Or&&(clearTimeout(Or),$u());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){Pr.clear();for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();sn()}}});var ab=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])','[data-chatgpt-composer] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-composer-input] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-codex-composer-root] button[aria-label^="Dictat" i], [data-composer-placement] button[aria-label^="Dictat" i], [class*="ComposerLayout"] button[aria-label^="Dictat" i]'],sb=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],od=h({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),nd=p({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:od,styles:()=>Qe([...ab,...od.store.hideDictationSettings?sb:[]])});var qt="data-bloom-share",lb=/^\/g\/g-p-/,cb=/^(?:share|分享)$/i,ub=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],db=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${qt}="project"]`],Fa=h({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),Rr,Ga=!1;function mb(e){if(!W(e))return;let t=lb.test(location.pathname)&&!v();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${qt}]`))!t||!cb.test(y(o.textContent??""))?o.removeAttribute(qt):o.hasAttribute(qt)||o.setAttribute(qt,"project")}var rd=p({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:Fa,styles:()=>Qe([...Fa.store.hideShareChat?ub:[],...Fa.store.hideShareProject?db:[]]),start(){Ga=!0,pt().then(()=>{Ga&&!Rr&&(Rr=I(mb))})},stop(){Ga=!1,Rr?.(),Rr=void 0;for(let e of document.querySelectorAll(`[${qt}]`))e.removeAttribute(qt)}});var id='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',fb='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',pb="[data-bloom-profile-plan]",ad="visibility:hidden!important;user-select:none!important",ld=h({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function gb(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=ld.store,r=[];return e&&r.push(n?`:is(${id}){display:none!important}`:`:is(${id}){${ad}}`),t&&r.push(`:is(${fb}){${ad}}`),e&&o&&r.push(`${pb}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var sd,cd=p({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:ld,styles:gb,start(){sd=Me()},stop(){sd?.()}});var hb="model-switcher-dropdown-button",Ya="data-selected-reasoning-effort",Dr="ArrowLeft",ud=e=>e.startsWith("model-switcher-")&&e!==hb?e.slice(15):"",ln=(e,t)=>e.id===t.id||!!e.label&&e.label===t.label;function dd(){let e=X();return(e&&J(u.modelTrigger,e))??J(u.modelTrigger)}function Ie(){let e=dd();if(!e)return null;let t=e.getAttribute("aria-expanded")==="true",o=e.getAttribute(Ya),n=o&&t?"":y(e.innerText),r=o||ud(e.getAttribute("data-testid")??"")||n;return r?{id:r,label:n||r}:null}function bb(e){return[...document.querySelectorAll(u.modelItem)].find(t=>{let o=ud(t.getAttribute("data-testid")??""),n=y(t.textContent??"");return o===e.id||n===e.label||n===e.id})??null}function yb(e){let t=e.querySelector("[role=slider]"),o=Number(t?.getAttribute("aria-valuenow")),n=Number(t?.getAttribute("aria-valuemax"));o<=0?Dr="ArrowRight":o>=n&&(Dr="ArrowLeft"),e.focus(),e.dispatchEvent(new KeyboardEvent("keydown",{key:Dr,code:Dr,bubbles:!0,cancelable:!0}))}function Ka(e){let t=Ie(),o=dd();if(t&&ln(t,e))return o?.hasAttribute(Ya)&&o.getAttribute("aria-expanded")==="true"&&document.querySelector("[role=menu]")?.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),!0;if(o?.hasAttribute(Ya)){let r=document.querySelector(u.effortSlider);return r?yb(r):o.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,button:0,pointerType:"mouse",isPrimary:!0})),!1}let n=bb(e);if(n){n.click();let r=Ie();return!!r&&ln(r,e)}return o?.getAttribute("aria-expanded")!=="true"&&o?.click(),!1}var md=`/*
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
`;var j=k("bloom-queue-"),Ab=6,wb=8,ie=null,cn="",co=!1,uo=!1;function Qa(e,t,o){let n=N(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute(ue),n.addEventListener("mouseenter",()=>fd(t)),n.addEventListener("mouseleave",()=>fd("")),n}function fd(e){let t=ie?.querySelector(`.${j("tip")}`);t&&(t.textContent=e)}function xb(e,t,o,n){uo=!0;let r=s("textarea",{class:`bloom-input ${j("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=new AbortController,a=c=>{i.abort(),uo=!1,cn="",c?n.edit(t,r.value):r.replaceWith(s("div",{class:j("text"),text:o}))};addEventListener("keydown",c=>{if(!(c.target!==r||c.isComposing)){if(c.key==="Enter"&&!c.shiftKey)a(!0);else if(c.key==="Escape")a(!1);else return;c.preventDefault(),c.stopImmediatePropagation()}},{capture:!0,signal:i.signal}),r.addEventListener("keydown",c=>c.stopPropagation(),{signal:i.signal}),r.addEventListener("blur",()=>a(!0),{signal:i.signal}),e.querySelector(`.${j("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function Sb(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,a=l=>{!i&&Math.abs(l.clientY-n.clientY)<Ab||(i||(i=uo=!0,e.classList.add(j("dragging"))),e.style.transform=`translateY(${l.clientY-n.clientY}px)`)},c=l=>{if(removeEventListener("pointermove",a),!i)return;uo=!1,cn="";let m=[...r.children].filter(f=>f!==e).filter(f=>f.getBoundingClientRect().top+f.getBoundingClientRect().height/2<l.clientY).length;o.move(t,m)};addEventListener("pointermove",a),addEventListener("pointerup",c,{once:!0})})}function qb(e,t,o,n){let r=s("li",{class:j("row")},s("div",{class:j("text"),text:e.text}),n&&e.label?s("span",{class:j("model"),title:e.label,text:e.label}):null,s("div",{class:j("actions")},Qa("trash","Remove from queue",()=>o.remove(t)),Qa("edit","Edit",()=>xb(r,t,e.text,o)),Qa("send","Send now",()=>o.sendNow(t))));return Sb(r,t,o),r}function Eb(e){if(!ie)return;let t=e.getBoundingClientRect();ie.style.left=`${t.left}px`,ie.style.width=`${t.width}px`,ie.style.bottom=`${innerHeight-t.top+wb}px`}function za(){ie?.remove(),ie=null,cn="",uo=!1}function Et(e,t,o=!0){let n=X();if(!e.length||!ut(n)){za();return}ie||(ie=s("div",{class:`bloom-root ${j("tray")}`,attrs:{"data-bloom":"queue"}},s("div",{class:j("header")},s("button",{class:j("toggle"),attrs:{type:"button","aria-expanded":String(!co)},on:{click:a=>{co=!co,ie?.classList.toggle(j("collapsed"),co),a.currentTarget.setAttribute("aria-expanded",String(!co))}}},s("span",{class:j("count")}),C("chevron")),s("span",{class:j("tip")})),s("ol",{class:j("list")})),ie.classList.toggle(j("collapsed"),co),document.body.append(ie)),Eb(n);let r=JSON.stringify([o,...e.map(a=>[a.text,o?a.label:""])]);if(uo||r===cn)return;cn=r;let i=ie.querySelector(`.${j("count")}`);i&&(i.textContent=bn(e.length,"Queued message")),ie.querySelector(`.${j("list")}`)?.replaceChildren(...e.map((a,c)=>qb(a,c,t,o)))}var Fr=new q("PromptQueue"),Tb=8,dn=150,Hr=20,Cb=300,Be="BloomPromptQueue",Wa="BloomPromptQueueClaim",pd="BloomPromptQueueTab",Mb=4e3,ee=h({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1},showQueueMode:{type:"boolean",description:"Show the model that was selected when each message was queued.",default:!0},stickyOnNavigate:{type:"boolean",description:"Keep the selected model when switching chats.",default:!0},persistAcrossRefresh:{type:"boolean",description:"Restore unsent queued messages in this browser after a refresh. Other tabs show the same queue; only one of them sends it.",default:!0}}),Oe=new Map,un=!1,Tt=null,mo,gd=[],nt=null,Mt=!1,mn,Nr="draft",fn=()=>v()??Nr,ae=()=>Oe.get(fn())??[],Va=e=>({id:e.model||e.label,label:e.label||e.model});function kb(e){return typeof e=="string"?e.trim()?{text:e,model:"",label:""}:null:!O(e)||typeof e.text!="string"||!e.text.trim()?null:{text:e.text,model:typeof e.model=="string"?e.model:"",label:typeof e.label=="string"?e.label:""}}function Ja(){let e=sessionStorage.getItem(pd);if(e)return e;let t=globalThis.crypto?.randomUUID?.()??`${Date.now()}-${Math.random()}`;return sessionStorage.setItem(pd,t),t}function yd(){let e=Ee(localStorage.getItem(Wa)??"");return!O(e)||typeof e.tab!="string"||typeof e.at!="number"||typeof e.key!="string"?null:{tab:e.tab,at:e.at,key:e.key}}function vd(){let e={tab:Ja(),at:Date.now(),key:fn()};try{localStorage.setItem(Wa,JSON.stringify(e))}catch(t){Fr.warn("Could not claim the queue",t)}}function Lb(){let e=yd();if(e?.tab===Ja())try{localStorage.setItem(Wa,JSON.stringify({...e,at:Date.now()}))}catch(t){Fr.warn("Could not refresh the queue claim",t)}}function Ib(){let e=yd();return!e||e.tab===Ja()||e.key!==fn()?!0:Date.now()-e.at<=Mb?!1:(vd(),!0)}function Bb(){return Object.fromEntries([...Oe].filter(([e])=>e!==Nr))}function ja(e){let t=typeof e=="string"?Ee(e):e;if(!O(t))return!1;let o=!1;for(let[n,r]of Object.entries(t)){if(!Array.isArray(r))continue;let i=r.map(kb).filter(a=>a!=null);i.length&&(Oe.set(n,i),o=!0)}return o}function Ob(){if(!ee.store.persistAcrossRefresh){sessionStorage.removeItem(Be),_r(Be);return}ja(sessionStorage.getItem(Be))||ja(Ot(Be))&&Ur()}function Ur(){try{if(!ee.store.persistAcrossRefresh){sessionStorage.removeItem(Be),_r(Be);return}let e=Bb();sessionStorage.setItem(Be,JSON.stringify(e)),Pt(Be,e)}catch(e){Fr.warn("Could not save the queue",e)}}function Pb(e){if(!(e.key!==Be||!ee.store.persistAcrossRefresh||e.newValue==null)){Oe.clear(),ja(e.newValue);try{sessionStorage.setItem(Be,e.newValue)}catch(t){Fr.warn("Could not mirror the queue",t)}Et(ae(),fo,ee.store.showQueueMode)}}function Ct(e){e.length?Oe.set(fn(),e):Oe.delete(fn()),vd(),Ur(),Et(ae(),fo,ee.store.showQueueMode)}function Rb(e){if(!e.model&&!e.label)return!0;let t=Ie();return t?ln(t,Va(e)):!0}function Ad(e,t=0){t>=Hr||G().generating||B()!==e||(In(),setTimeout(()=>Ad(e,t+1),dn))}function Db(e,t){let o=e??nt;if(!o||!t.model&&!t.label||ln(o,Va(t))){Mt=!1;return}ee.store.stickyOnNavigate&&(nt=o),clearTimeout(mn),mn=setTimeout(()=>xd(o),dn)}function pn(e,t=0,o=Ie()){if(G().generating||B()){t<Hr&&setTimeout(()=>pn(e,t+1,o),dn);return}if(!Rb(e)&&t<Hr){Mt=!0,Ka(Va(e)),setTimeout(()=>pn(e,t+1,o),dn);return}ce(e.text),qo(()=>Ad(e.text)),Db(o,e)}function hd(){if(Tt!=null){let o=Tt;Tt=null,pn(o);return}if(!un||G().generating||B())return;if(!Ib()){un=!1;return}let[e,...t]=ae();e!=null&&(un=!1,Ct(t),pn(e))}function wd(e){let t=ae(),o=t[e];if(o!=null){if(Ct(t.filter((n,r)=>r!==e)),!G().generating){pn(o);return}Tt=o,Ht()?.click()}}var fo={remove:e=>Ct(ae().filter((t,o)=>o!==e)),edit:(e,t)=>Ct(t.trim()?ae().map((o,n)=>n===e?{...o,text:t}:o):ae().filter((o,n)=>n!==e)),sendNow:wd,move(e,t){let o=[...ae()],[n]=o.splice(e,1);n&&(o.splice(t,0,n),Ct(o))}};function Hb(e){let t=Ie(),o={text:e,model:t?.id??"",label:t?.label??""},n=ae();return ee.store.replacePending&&n.length?(Ct([...n.slice(0,-1),o]),!0):n.length>=Tb?!1:(Ct([...n,o]),!0)}function Nb(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!ft(e.target)||!G().generating)return;let t=B(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;let o=Ie();ce(""),Tt={text:t,model:o?.id??"",label:o?.label??""},Ht()?.click();return}if(!t){ae().length&&wd(0);return}Hb(t)&&ce("")}function Ub(){if(Mt||!ee.store.stickyOnNavigate)return;let e=Ie();e&&(nt=e)}function xd(e){Mt=!0;let t=0,o=()=>{if(Ka(e)||t>=Hr){Mt=!1;return}t++,mn=setTimeout(o,dn)};clearTimeout(mn),o()}function Fb(){ee.store.stickyOnNavigate&&nt&&xd(nt)}function bd(e){let{target:t}=e;!(t instanceof Element)||Mt||t.closest(`${u.modelTrigger}, ${u.modelItem}`)&&setTimeout(Ub,Cb)}var Sd=p({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:ee,styles:md,start(){mo=new AbortController,Ob(),nt=Ie(),document.addEventListener("keydown",Nb,{capture:!0,signal:mo.signal}),document.addEventListener("pointerup",bd,{signal:mo.signal}),document.addEventListener("keyup",bd,{signal:mo.signal}),gd=[E.on("fall",({outcome:e})=>{un=e==="done",e==="left"&&(Tt=null),hd()}),E.on("context",({prevId:e,id:t,migrated:o})=>{let n=Oe.get(Nr);Oe.delete(Nr),o&&!e&&t&&n&&Oe.set(t,n),o||(un=!1,Fb()),Ur(),Et(ae(),fo,ee.store.showQueueMode)}),E.on("tick",()=>{Lb(),hd(),Et(ae(),fo,ee.store.showQueueMode)})],addEventListener("storage",Pb,{signal:mo.signal}),Et(ae(),fo,ee.store.showQueueMode)},stop(){mo?.abort(),clearTimeout(mn);for(let e of gd)e();za(),Oe.clear(),Tt=null,nt=null,Mt=!1},onSettingsChange(e){e==="persistAcrossRefresh"&&Ur(),e==="stickyOnNavigate"&&ee.store.stickyOnNavigate&&(nt=Ie()),Et(ae(),fo,ee.store.showQueueMode)}});var qd=`/*
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
`;var me=k("bloom-recent-"),Pe="home",Yb=50,Ed=140,Kb=new Set(["Backquote"]),Qb=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),w=h({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),rt=null,Ae=[],Se=0,Za,Td=[],Yr=()=>Te()?null:v()??(Nt()?Pe:null);function Cd(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function kd(e){let t=xt(e);t&&w.store.titles[e]!==t&&(w.store.titles={...w.store.titles,[e]:t});let o=Yl(location.href);o&&e===v()&&w.store.projects[e]!==o&&(w.store.projects={...w.store.projects,[e]:o})}function Md(e){if(!e)return;let t=[e,...w.store.visits.filter(n=>n!==e)].slice(0,Yb),o=new Set(t);w.store.visits=t,Object.keys(w.store.previews).some(n=>!o.has(n))&&(w.store.previews=Cd(w.store.previews,o)),Object.keys(w.store.titles).some(n=>!o.has(n))&&(w.store.titles=Cd(w.store.titles,o)),e!==Pe&&kd(e)}function zb(e){if(!w.store.visits.includes(e))return;let{[e]:t,...o}=w.store.titles,{[e]:n,...r}=w.store.previews,{[e]:i,...a}=w.store.projects;w.store.visits=w.store.visits.filter(c=>c!==e),w.store.titles=o,w.store.previews=r,w.store.projects=a}function Gr(e){if(!e||!w.store.visits.includes(e))return;let t={},o=we(e)?.chain??[];for(let r of o)t[r.role]=qe(Fn(r),Ed);if(e===v())for(let r of Ve()){let i=Gt(r);i&&(t[r.role]=qe(i,Ed))}let n=w.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(w.store.previews={...w.store.previews,[e]:t})}function jb(){let e=Number(w.store.maxRecent);return w.store.visits.filter(t=>t!==Pe||w.store.includeHome).slice(0,e)}function Ld(e){if(go(),e===Yr())return;let t=e===Pe?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"], [data-sidebar-destination="builtin:home"]'):Ro(e)[0];t?t.click():location.assign(e===Pe?"/":`/c/${e}`)}function Wb(e){let t=e===Pe?null:w.store.previews[e],o=t&&["user","assistant"].filter(n=>t[n]).map(n=>s("span",{class:me("preview"),attrs:{"data-role":n},text:t[n]}));return s("span",{class:me("thumb"),attrs:{"aria-hidden":"true"}},o?.length?s("span",{class:me("page")},...o):s("span",{class:me("fallback")},C(e===Pe?"plus":"bloom")))}function Vb(e,t){let o=e===Pe?"New chat":w.store.titles[e]??xt(e)??"Untitled chat",n=e===Pe?null:w.store.projects[e];return s("button",{class:me("item"),attrs:{type:"button",role:"option","aria-selected":String(t===Se),"aria-label":n?`${o}, ${n}`:o},on:{click:()=>Ld(e),pointerenter:()=>t!==Se&&po(t)}},Wb(e),s("span",{class:me("meta")},s("span",{class:`${me("title")} bloom-truncate`,text:o}),n&&s("span",{class:me("project")},C("folder"),s("span",{class:"bloom-truncate",text:n}))))}function Id(){Ae.length?Ld(Ae[Se]):go()}function po(e){Ae.length&&(Se=(e+Ae.length)%Ae.length,rt?.querySelectorAll(`.${me("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===Se))))}function Jb(){Gr(v());let e=Yr();Ae=jb(),e&&(Ae=[e,...Ae.filter(o=>o!==e)].slice(0,Number(w.store.maxRecent))),Se=Ae.length>1?1:0;let t=Ae.length?s("div",{class:me("list"),attrs:{role:"listbox","aria-label":"Recent chats"}},...Ae.map(Vb)):s("div",{class:me("empty"),text:"Open a few chats, then hold Ctrl+` to switch."});t.style.setProperty("--bloom-recent-count",String(Ae.length)),rt=s("div",{class:`bloom-root ${me("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:o=>o.target===o.currentTarget&&go()}},s("div",{class:me("panel")},t)),be(rt)}function go(){rt?.remove(),rt=null}var Zb=e=>Kb.has(e.code)||Qb.has(e.key);function $b(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&Zb(e)){e.preventDefault(),e.stopPropagation(),rt?po(Se+(e.shiftKey?-1:1)):Jb();return}if(!rt)return;let o={Escape:go,Enter:Id,ArrowRight:()=>po(Se+1),ArrowDown:()=>po(Se+1),ArrowLeft:()=>po(Se-1),ArrowUp:()=>po(Se-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function Xb(e){rt&&e.key==="Control"&&Id()}var Bd=p({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:w,styles:qd,start(){Za=new AbortController;let{signal:e}=Za;addEventListener("keydown",$b,{capture:!0,signal:e}),addEventListener("keyup",Xb,{capture:!0,signal:e}),addEventListener("blur",go,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&Gr(v()),{signal:e}),Td=[he(({prevId:i})=>{Gr(i),Md(Yr())}),V.on("conversation",({id:i})=>{w.store.visits.includes(i)&&kd(i),Gr(i)}),V.on("conversation-missing",({id:i})=>zb(i))];let{visits:t,titles:o,previews:n}=w.store,r=t.filter(i=>i!==Pe&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(w.store.visits=t.filter(i=>!r.includes(i))),Md(Yr())},stop(){Za?.abort();for(let e of Td)e();go()}});var $a="data:audio/mpeg;base64,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";var Od=new q("ResponseNotification"),_b=.5,Pd="BloomNoticeClaim",ey=3e4,gn=h({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:e=>(e.append(H("Preview",Ud)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),Rd=null,Xa=new Map,Dd=[],_a,ty=e=>Uint8Array.from(atob(e.slice(e.indexOf(",")+1)),t=>t.charCodeAt(0)).buffer;function oy(e,t){let o=Xa.get(t);return o||(o=(t.startsWith("data:")?Promise.resolve(ty(t)):vn(t)).then(n=>e.decodeAudioData(n)),o.catch(()=>Xa.delete(t)),Xa.set(t,o)),o}async function Hd(e){Rd??=new AudioContext;let t=Rd;t.state==="suspended"&&t.resume();let o=t.createBufferSource(),n=t.createGain();o.buffer=await oy(t,e),n.gain.value=_b,o.connect(n).connect(t.destination),o.start()}function Ud(){let e=gn.store.soundUrl.trim();Hd(e||$a).catch(t=>{Od.warn("Sound failed",t),e&&Hd($a).catch(o=>Od.warn("Default chime failed",o))})}function ny(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function ry(e){let t=Ee(Ot(Pd)??"");return e&&O(t)&&t.id===e&&Date.now()-Number(t.at)<ey?!1:(Pt(Pd,{id:e,at:Date.now()}),!0)}function Nd(e){gn.store.onlyWhenHidden&&!document.hidden||ry(e)&&(gn.store.sound&&Ud(),gn.store.browserNotification&&ny(xt(e)))}function iy(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(_a=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:_a.signal}))}var Fd=p({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply, including chats you left while they were answering.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:gn,start(){iy(),Dd=[E.on("fall",({conversationId:e,outcome:t})=>t==="done"&&Nd(e)),E.on("background",({conversationId:e})=>Nd(e))]},stop(){for(let e of Dd)e();_a?.abort()}});var ay=`:is(${u.sidebarScroll}, :has(> ${u.sidebarScroll})) + :has(${u.menuButton})`,sy=`${u.rail} > :has(${u.menuButton})`,ts=`:is(${ay}, ${sy}, ${u.oldProfile}):not(:hover)`,es="[data-bloom-profile-avatar]",ly=`:is(${ts}, ${ts} :has(${es})) > :not(${es}, :has(${es}))`,Yd=h({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function cy(){let{opacity:e,fadeAvatar:t}=Yd.store;return e>=100?"":`${t?ts:ly}{opacity:${e/100}!important}`}var Gd,Kd=p({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Yd,styles:cy,start(){Gd=Me()},stop(){Gd?.()}});var Qd=`/*
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
`;var F=k("bloom-star-chats"),dy=80,my=60,fy=1200,py=120,hn=h({replaceReadAloud:{type:"boolean",description:"Put the star where the reply's Read aloud button is, and hide that button.",default:!0},messages:{type:"custom",default:[]}}),gy=`:is(${u.turnActions}) ${u.readAloud}`,os,ns=!1,it=!1,Lt=!1,Kr=0,_=null,Qr="",R=null,rs,at;function as(){let e=hn.store.messages;return Array.isArray(e)?e.filter(t=>O(t)&&typeof t.conversationId=="string"&&typeof t.messageId=="string"&&(t.role==="user"||t.role==="assistant")&&typeof t.snippet=="string"&&typeof t.starredAt=="number"):[]}function ss(){let e=v();return e?as().filter(t=>t.conversationId===e):[]}function hy(e,t){return as().some(o=>o.conversationId===e&&o.messageId===t)}function zd(e){let t=as(),o=t.some(n=>n.conversationId===e.conversationId&&n.messageId===e.messageId);hn.store.messages=o?t.filter(n=>!(n.conversationId===e.conversationId&&n.messageId===e.messageId)):[{...e,starredAt:Date.now()},...t].slice(0,dy)}function is(e){return e.messageIds[0]||e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.el.getAttribute("data-turn-key")||""}function by(e){return qe(Gt(e)||y(e.el.textContent??""),my)}function yy(e){let t=e.closest(u.turn);if(!t)return null;let o=Ve().filter(n=>t.contains(n.el));return o.find(n=>n.el.contains(e)||n.el===t)??o.findLast(n=>n.el.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING)??null}function vy(){let e=[...document.querySelectorAll(u.turnActions)].filter(t=>!t.closest(`[data-bloom], [role="dialog"], [inert], pre, ${u.sidebars}`));return e.filter(t=>!e.some(o=>o!==t&&o.contains(t)))}function Ay(e,t){let o=hn.store.replaceReadAloud?t.querySelector(u.readAloud):null;if(o&&!o.closest("[data-bloom]")){e.nextElementSibling!==o&&o.before(e);return}let n=wy(t);(e.parentElement!==n||n.lastElementChild!==e)&&n.append(e)}function wy(e){let t=[...e.querySelectorAll("button")].filter(n=>n.dataset.bloom!=="message-star"&&!n.closest("[data-bloom]"));return t.length?[...e.children].find(n=>n instanceof HTMLElement&&n!==t[0]&&t.every(r=>n.contains(r)))??e:e}function xy(){return[...document.querySelectorAll(u.headerMore)].filter(t=>{if(t.dataset.bloom==="message-star"||t.closest("[data-bloom], [role='dialog'], [inert]")||t.closest(u.sidebars))return!1;let o=t.getBoundingClientRect();return o.width===0&&o.height===0?!!t.closest("header, #page-header"):o.top>=0&&o.top<96&&o.left>window.innerWidth*.5}).toSorted((t,o)=>o.getBoundingClientRect().left-t.getBoundingClientRect().left||(t.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1))[0]??null}function jd(e,t,o){return s("button",{class:t,attrs:{type:"button","aria-label":e},on:{pointerdown:n=>n.stopPropagation(),mousedown:n=>n.stopPropagation(),click:n=>{n.preventDefault(),n.stopPropagation(),o(n)}}},C("star"))}function Sy(e,t){e.setAttribute("aria-pressed",String(t)),e.setAttribute("aria-label",t?"Unstar":"Star")}function zr(){return it||Lt}function ho(){Kr&&window.clearTimeout(Kr),Kr=0}function bo(){it=!1,Lt=!1,ho(),at?.enter(),_?.remove(),_=null,Qr="",R?.classList.remove(F("-open")),R?.setAttribute("aria-expanded","false")}function jr(e){return e instanceof Node&&!!(R?.contains(e)||_?.contains(e))}function qy(e){e.classList.add(F("-flash")),window.setTimeout(()=>e.classList.remove(F("-flash")),fy)}function Ey(e){let t=Ve().find(n=>is(n)===e),o=t?.el.closest(u.turn)??t?.el;o&&(o.scrollIntoView({block:"start"}),qy(o))}function Ty(){let e=v(),t=new Set,o=[...document.querySelectorAll('[data-bloom="message-star"][data-place="action"]')];if(!e||Te()){for(let n of o)n.remove();return}for(let n of vy()){if(!De(n))continue;let r=yy(n),i=r?is(r):"";if(!r||!i)continue;let a=n.querySelector('[data-place="action"]');(!a||a.dataset.id!==i)&&(a?.remove(),a=jd("Star",F("-star"),()=>{let c=v(),l=Ve().find(d=>is(d)===i);!c||!l||zd({conversationId:c,messageId:i,role:l.role,snippet:by(l)})}),a.dataset.bloom="message-star",a.dataset.place="action",a.dataset.id=i),Sy(a,hy(e,i)),Ay(a,n),t.add(a)}for(let n of o)t.has(n)||n.remove()}function Cy(){if(!_||!R)return;let e=R.getBoundingClientRect(),t=_.offsetWidth||288,o=_.offsetHeight||120,n=e.bottom+6;n+o>window.innerHeight-8&&(n=Math.max(8,e.top-o-6));let r=Math.max(8,Math.min(e.right-t,window.innerWidth-t-8));_.dataset.place=n>=e.bottom?"below":"above",_.style.left=`${Math.round(r)}px`,_.style.top=`${Math.round(n)}px`}function My(){if(!zr()||!R){_?.remove(),_=null,Qr="",R?.classList.remove(F("-open")),R?.setAttribute("aria-expanded","false");return}let e=ss(),t=e.map(o=>`${o.messageId}	${o.snippet}`).join(`
`);if(!_||Qr!==t){_?.remove();let o=e.map(n=>s("div",{class:F("-row")},s("button",{class:F("-jump"),attrs:{type:"button"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),bo(),Ey(n.messageId)}}},s("span",{class:F("-role"),text:n.role==="user"?"You":"ChatGPT"}),s("span",{class:F("-snip"),text:n.snippet||"Message"})),jd("Unstar",F("-unstar"),()=>zd(n))));_=s("div",{class:`bloom-root ${F("-panel")}`,attrs:{"data-bloom":"star-list"},on:{pointerenter:()=>{ho(),at?.enter(),Lt=!0},pointerleave:n=>{jr(n.relatedTarget)||it||at?.leave(n)}}},s("div",{class:F("-bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:F("-head"),text:"Starred"}),s("div",{class:F("-body")},...o.length?o:[s("div",{class:F("-empty"),text:"No starred messages in this chat"})])),document.body.append(_),Qr=t}Cy(),R.classList.add(F("-open")),R.setAttribute("aria-expanded","true")}function ky(){for(let r of document.querySelectorAll('[data-bloom="starred"]'))r.remove();let e=xy(),t=e?.parentElement??null,o=v();if(!e||!t||t.closest(u.sidebars)||!o||Te()||!De(t)){R?.remove(),R=null,bo();return}R||(R=s("button",{class:F("-toggle"),attrs:{type:"button","data-bloom":"message-star","data-place":"header","aria-label":"Starred messages","aria-expanded":"false"},on:{pointerdown:r=>r.stopPropagation(),pointerenter:()=>{ho(),at?.enter(),Kr=window.setTimeout(()=>{Lt=!0,kt()},py)},pointerleave:r=>{jr(r.relatedTarget)||(ho(),zr()&&at?.leave(r))},click:r=>{r.preventDefault(),r.stopPropagation(),it=!it,Lt=it,ho(),it||bo(),kt()}}},C("star"))),(R.parentElement!==t||R.nextElementSibling!==e)&&e.before(R);let n=e.getBoundingClientRect();n.width>0&&(R.style.width=`${n.width}px`,R.style.height=`${n.height}px`),R.classList.toggle(F("-here"),ss().length>0),My()}function Ly(){let e=new Set(ss().map(t=>t.messageId));for(let t of document.querySelectorAll('[data-bloom="navigator"] .bloom-nav-tick, [data-bloom="navigator"] .bloom-nav-row'))t.classList.toggle(F("-mark"),!!t.dataset.messageId&&e.has(t.dataset.messageId))}function kt(){if(!ns){ns=!0;try{for(let e of document.querySelectorAll('[data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();Ty(),ky(),Ly()}finally{ns=!1}}}function Iy(){bo(),R?.remove(),R=null;for(let e of document.querySelectorAll('[data-bloom="message-star"], [data-bloom="star-list"], [data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();for(let e of document.querySelectorAll(`.${F("-mark")}`))e.classList.remove(F("-mark"))}var Wd=p({name:"StarChats",description:"Star a message from its toolbar. The star left of the top-right menu opens this chat's list.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:hn,styles:()=>`${Qd}${hn.store.replaceReadAloud?Qe([gy]):""}`,onSettingsChange(e){(e==="messages"||e==="replaceReadAloud")&&kt()},start(){for(let o of document.querySelectorAll('[data-bloom="star-list"]'))o.remove();at=tr({over:jr,trigger:()=>R,panel:()=>_,setHeld(o){if(o){Lt=!0,kt();return}it||(Lt=!1,kt())}}),os=I(o=>W(o)&&kt());let e=o=>{jr(o.target)||zr()&&bo()};document.addEventListener("pointerdown",e,!0);let t=o=>{o.key!=="Escape"||!zr()||(o.preventDefault(),bo())};document.addEventListener("keydown",t,!0),rs=()=>{document.removeEventListener("pointerdown",e,!0),document.removeEventListener("keydown",t,!0)},kt()},stop(){os?.(),os=void 0,rs?.(),rs=void 0,ho(),at?.dispose(),at=void 0,Iy()}});var Vd="filter:blur(6px)!important;transition:filter 0.2s ease",Jd=`:is(${u.sidebars})`,It="data-bloom-streamer-open",By="[data-app-action-sidebar-thread-row], [data-app-action-sidebar-project-row], .bloom-recent-item";function Oy(){return{conversations:{selectors:[`${Jd} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0,row:"[data-app-action-sidebar-thread-row]"},projects:{selectors:[`${Jd} a:is([href*="/project"], [href*="/g/g-p-"])`,"[data-app-action-sidebar-project-row]",".bloom-recent-project"],hover:!0,row:"[data-app-action-sidebar-project-row]"},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}}}var Zd=h({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function Py(e,t){let o=[`:is(${e}):hover`,`.bloom-recent-item:hover :is(${e})`,`:is(${e})[${It}]`];return t&&o.push(`${t}:hover`,`${t}:hover :is(${e})`,`${t}:is(${e}):hover`,`${t}[${It}]`,`${t}[${It}] :is(${e})`),o.join(",")}function Ry(){let e=Oy();return Object.entries(e).filter(([t])=>Zd.store[t]).map(([,t])=>{let o=t.selectors.join(",");if(!t.hover)return`:is(${o}){${Vd}}`;let n="row"in t?t.row:void 0;return`:is(${o}){${Vd}}${Py(o,n)}{filter:none!important}`}).join(`
`)}function Dy(e,t){for(let o of document.elementsFromPoint(e,t))if(o instanceof Element){let n=o.closest(By);if(n)return n}return null}function us(e){for(let t of document.querySelectorAll(`[${It}]`))t!==e&&t.removeAttribute(It);e&&!e.hasAttribute(It)&&e.setAttribute(It,"")}var yo,Hy=ze(()=>{yo&&us(Dy(yo.clientX,yo.clientY))});function ls(e){yo=e,Hy()}function Ny(e){e.relatedTarget instanceof Node&&document.documentElement.contains(e.relatedTarget)||(yo=void 0,us(null))}var cs,Wr,$d=p({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:Zd,styles:Ry,start(){cs=Me(),Wr=new AbortController;let e={capture:!0,signal:Wr.signal,passive:!0};document.addEventListener("pointerover",ls,e),document.addEventListener("pointermove",ls,e),document.addEventListener("pointerout",ls,e),window.addEventListener("pointerleave",Ny,e)},stop(){Wr?.abort(),Wr=void 0,yo=void 0,us(null),cs?.(),cs=void 0}});var _d=h({openNewAsTemporary:{type:"boolean",description:"Open New chat as a temporary chat.",default:!1}}),Uy=/^(?:new chat|新聊天)$/i,Vr;function Fy(e){return e?"/?temporary-chat=true":"/"}function Gy(e){let t=Fy(e);`${location.pathname}${location.search}`===t||e&&Te()&&location.pathname==="/"||location.assign(t)}function Yy(e){if(e.closest("[data-bloom]"))return!1;try{let t=new URL(e.href,location.origin);return t.origin===location.origin&&t.pathname==="/"}catch{return!1}}function Ky(e){return e.closest("[data-bloom], [data-app-action-sidebar-project-row]")?!1:Uy.test(e.getAttribute("aria-label")??y(e.textContent??""))}function Qy(e){if(!_d.store.openNewAsTemporary||Te())return;let{target:t}=e;if(!(t instanceof Element))return;let o=t.closest("a[href], button"),n=o instanceof HTMLAnchorElement?Yy(o):!!o&&Ky(o);!o||!n||o.closest(`${u.sidebarScroll}, ${u.rail}, ${u.oldSidebar}, nav`)&&(e.preventDefault(),e.stopPropagation(),Gy(!0))}function Xd(){for(let e of document.querySelectorAll('[data-bloom="temporary-chat"]'))e.remove()}var em=p({name:"TemporaryChat",description:"Optionally open New chat as a temporary chat. No extra sidebar button.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"ghost",enabledByDefault:!0,settings:_d,start(){Xd(),Vr=new AbortController,document.addEventListener("pointerdown",Qy,{capture:!0,signal:Vr.signal})},stop(){Vr?.abort(),Vr=void 0,Xd()}});var st=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)','[data-turn-key] [data-message-author-role="user"] blockquote:not(.twitter-tweet)','[class~="group/user-message"] blockquote:not(.twitter-tweet)'].join(","),ds=h({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function zy(){let e=[`${st}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${st}>*{margin-block:0!important}`];return ds.store.italic||e.push(`${st}{font-style:inherit!important}`),ds.store.quotes||(e.push(`${st}{quotes:none!important}`),e.push(`${st}::before,${st}::after,${st} p::before,${st} p::after{content:none!important}`)),e.join(`
`)}var tm=p({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:ds,styles:zy});var jy=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],Wy=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",Vy='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',om=h({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function Jy(){let e=`${om.store.width}rem`;return`:is(${Wy}){${jy.map(t=>`${t}:${e}!important`).join(";")}}:is(${Vy}){max-width:min(100%, ${e})!important}`}var nm=p({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:om,styles:Jy});var Zy=[bc,Zl,Hc,jc,nu,au,su,cu,bu,Cu,Ru,Gu,td,nd,rd,cd,Sd,Bd,Fd,Kd,Wd,$d,em,tm,nm],ms=Zy;var $y=new q("Bloom"),rm="2.0.120";var fs=0,Jr;function Xy(){fs++,Jr?.(),Jr=void 0,Ws(),xo(),wn()}async function ps(){let e=++fs,t=()=>e===fs;xo(),wn(),al();for(let o of ms)o.updatedAt=kl[o.name];Rs(ms),Is(),Hs(),indexedDB.deleteDatabase("bloompp"),Bt("base",Js),ql(),kn("Init"),Pn().then(()=>{t()&&(xs(),kn("DOMContentLoaded"))}),await ll(),t()&&(kn("HostReady"),Jr?.(),Jr=Ml(),js(),$y.info(`Bloom++ ${rm} ready`))}var _y=new q("Boot");window===window.top&&(qs(oe.Bloom),Es(gs),ps().catch(e=>_y.error("Startup failed",e)));})();
