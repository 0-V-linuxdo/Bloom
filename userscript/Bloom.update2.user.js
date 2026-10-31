// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.104
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

/* Bloom++ v2.0.104. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var dm=Object.defineProperty;var mm=(e,t)=>{for(var o in t)dm(e,o,{get:t[o],enumerable:!0})};var E=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var pe=(e,t,o)=>Math.min(o,Math.max(t,e)),L=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),st=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,Ee=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,y=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function yn(e,t){return`${e} ${t}${e===1?"":"s"}`}async function vn(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function qe(e){try{return JSON.parse(e)}catch{return}}var oe=typeof unsafeWindow>"u"?window:unsafeWindow,fm=200,pm=300;function An(e){return new Promise((t,o)=>GM_xmlhttpRequest({url:e,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=fm&&n<pm?t(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var gm=new E("Styles"),Ge=new Map,xo=new Set,lt=new Map,_r=!0,ys=e=>e.replaceAll(/[^A-Za-z0-9_-]/g,"_"),hm=e=>`:where(:root){--bloom-sheet-${ys(e)}:1}`,bm=(e,t)=>`${hm(e)}${t}`,vs=e=>`bloom-style-${e}`;function As(e){try{return[...e.cssRules].map(t=>t.cssText).join(`
`)}catch{return""}}function ym(e,t){let o=As(e);return o?o.includes(`--bloom-sheet-${ys(t)}`)?!0:t==="plugin-StreamerMode"?o.includes("blur(6px)")&&(o.includes("data-app-action-sidebar-thread-title")||o.includes("data-bloom-streamer-open")):t==="plugin-WiderChat"?o.includes("--composer-adjacent-max-width")&&o.includes("--thread-content-max-width"):t==="plugin-ComposerOpacity"?o.includes("--composer-layout-surface-backdrop-filter")||o.includes("--composer-layout-surface-background")&&o.includes("color-mix"):!1:!1}function ws(e){let t=As(e);return t?!!(t.includes("--bloom-")||t.includes(".bloom-")||t.includes("[data-bloom")||t.includes("--bloom-sheet-")||t.includes("blur(6px)")&&t.includes("data-app-action-sidebar-thread-title")||t.includes("--composer-adjacent-max-width")&&t.includes("--thread-content-max-width")||t.includes("--composer-layout-surface-backdrop-filter")):!1}function Ss(){let e=document.adoptedStyleSheets.filter(t=>!xo.has(t)&&!ws(t));document.adoptedStyleSheets=[...e,...Ge.values()]}function xs(e){document.readyState==="loading"||e.parentNode===document.head||document.head.append(e)}function vm(e,t){let o=lt.get(e);o||(o=document.createElement("style"),o.id=vs(e),lt.set(e,o)),o.textContent!==t&&(o.textContent=t),xs(o)}function Ot(e,t){let o=bm(e,t);if(_r)try{let n=Ge.get(e);n||(n=new oe.CSSStyleSheet,Ge.set(e,n),xo.add(n)),n.replaceSync(o),Ss();return}catch(n){gm.warn("Constructed style sheets unavailable, using <style> after parsing",n),_r=!1;let r=Ge.get(e);r&&xo.delete(r),Ge.delete(e)}vm(e,o)}function Eo(e){let t=Ge.get(e);t&&(xo.delete(t),Ge.delete(e)),lt.get(e)?.remove(),lt.delete(e);for(let o of document.querySelectorAll(`style[id="${vs(e)}"]`))o.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(o=>o!==t&&!ym(o,e)),_r&&Ss()}catch{}}function qo(){Ge.clear(),xo.clear();for(let e of lt.values())e.remove();lt.clear();for(let e of document.querySelectorAll("style[id^='bloom-style-']"))e.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(e=>!ws(e))}catch{}}function Es(){for(let e of lt.values())xs(e)}var C=e=>(...t)=>t.map(o=>e+o).join(" "),wn=(...e)=>e.filter(Boolean).join(" "),Ye=e=>e.length?`${e.map(t=>`${t}:not([data-bloom])`).join(",")}{display:none!important}`:"";var qs="__bloomHost",ei=new E("Boot"),Am=['[data-bloom="navigator"]','[data-bloom="settings"]','[data-bloom="history-hud"]','[data-bloom="history-dialog"]','[data-bloom="star-list"]','[data-bloom="entry"]','[data-bloom="menu-entry"]','[data-bloom="menu-flyout"]','[data-bloom="message-star"]','[data-bloom="starred"]','[data-bloom="chat-star"]','[data-bloom="queue"]','[data-bloom="recent"]','[data-bloom="quote-chip"]','[data-bloom="quote-back"]','[data-bloom="cls"]','[data-bloom="timestamp"]','[data-bloom="tooltip"]','[data-bloom="notices"]'].join(", "),wm=["data-bloom-greeting","data-bloom-placeholder","data-bloom-streamer-open","data-bloom-share","data-bloom-invite","data-bloom-csi-avatar","data-bloom-csi-sized"];function Sn(){if(!(typeof document>"u"||!document.documentElement)){for(let e of document.querySelectorAll(Am))e.remove();for(let e of wm)for(let t of document.querySelectorAll(`[${e}]`))t.removeAttribute(e);for(let e of document.querySelectorAll("[data-bloom-text]"))e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size"),e.style.removeProperty("--bloom-text")}}function Sm(e){if(ei.warn("Replacing another Bloom++ instance",e.VERSION),e.destroy){e.destroy();return}for(let t of e.plugins?.values()??[]){try{t.stop?.()}catch(o){ei.error("Failed to stop previous plugin",o)}t.styles="",t.start=void 0}qo()}function Ts(e){let t=oe,o=new Set;for(let n of[e,t.Bloom,t[qs]])if(!(!n||o.has(n))){o.add(n);try{Sm(n)}catch(r){ei.error("Failed to retire Bloom++",r)}}Sn()}function Cs(e){let t=oe;try{delete t.Bloom}catch{}Object.defineProperty(t,"Bloom",{value:e,configurable:!0,writable:!0}),Object.defineProperty(t,qs,{value:e,configurable:!0,writable:!0})}var bs={};mm(bs,{VERSION:()=>um,destroy:()=>mv,init:()=>hs,plugins:()=>Z});var xm=new E("Dom");function s(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var Ms=document.createElement("template");function ks(e){return Ms.innerHTML=e.trim(),Ms.content.firstElementChild.cloneNode(!0)}var ct=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),J=(e,t=document)=>[...t.querySelectorAll(e)].find(ct)??null,Em=16,qm="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function qn(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([qm],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function Co(e){document.hidden?setTimeout(e,Em):requestAnimationFrame(e)}function Ke(e){let t=!1;return()=>{t||(t=!0,Co(()=>{t=!1;try{e()}catch(o){xm.error("Scheduled task failed",o)}}))}}var xn=new Set,En=[],To,Tm=Ke(()=>{let e=En;En=[];for(let t of xn)t(e)});function M(e){return xn.add(e),To||(To=new MutationObserver(t=>{En.push(...t),Tm()}),To.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{xn.delete(e),!xn.size&&(To?.disconnect(),To=void 0,En=[])}}var Cm=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),Y=e=>!e.length||e.some(t=>!Cm(t.target)),Mm=e=>`"${e.replaceAll("\\","\\\\").replaceAll('"','\\"').replaceAll(`
`,"\\A ")}"`;function ut(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size"),e.style.removeProperty("--bloom-text");return}e.style.setProperty("--bloom-text",Mm(t)),e.getAttribute("data-bloom-text")!==t&&e.setAttribute("data-bloom-text",t)}function f(e){return e}var Ls=new E("Storage");function Pt(e){try{return localStorage.getItem(e)??void 0}catch{return}}function Rt(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(o){Ls.warn("localStorage write failed",o)}}function ti(e){try{localStorage.removeItem(e)}catch(t){Ls.warn("localStorage delete failed",t)}}function Is(e,t){addEventListener("storage",o=>{o.key===e&&t(o.newValue)})}var oi="BloomSettings",km=100,Qe={plugins:{}},Tn=new Set,ni=new Set,Dt;function Bs(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=qe(t);return!L(t)||!L(t.plugins)||!Object.keys(t.plugins).length?null:t}function Os(){let e=Bs(Pt(oi));e&&(Qe.plugins=e.plugins)}var Ps=(e,t)=>`${e}
${t}`;function ri(){Dt=void 0,ni.clear(),Rt(oi,Qe)}function Lm(e){let t=Bs(e);if(!t)return;let o=[];for(let n of new Set([...Object.keys(Qe.plugins),...Object.keys(t.plugins)])){let r=Qe.plugins[n]??={},i=L(t.plugins[n])?t.plugins[n]:{};for(let a of new Set([...Object.keys(r),...Object.keys(i)]))ni.has(Ps(n,a))||JSON.stringify(r[a])===JSON.stringify(i[a])||(i[a]===void 0?delete r[a]:r[a]=i[a],o.push([n,a]))}for(let[n,r]of o)for(let i of Tn)i(n,r)}function ii(){Dt&&(clearTimeout(Dt),ri())}function Rs(e){let t=Object.keys(Qe.plugins).filter(o=>!e.has(o));if(!t.length)return t;for(let o of t)delete Qe.plugins[o];return clearTimeout(Dt),ri(),t}var ne=(e,t)=>Qe.plugins[e]?.[t];function se(e,t,o){let n=Qe.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,ni.add(Ps(e,t)),clearTimeout(Dt),Dt=setTimeout(ri,km);for(let r of Tn)r(e,t)}function Ht(e){return Tn.add(e),()=>void Tn.delete(e)}function ai(e){return e.type==="component"?void 0:e.default}function g(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>ne(t.pluginName,n)??(e[n]&&ai(e[n])),set:(o,n,r)=>(se(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&ne(t.pluginName,o)!==void 0&&se(t.pluginName,o)}};return t}var Ds=e=>{let t=()=>{let o=ne("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();se("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},Cn=Ds("pinnedPlugins"),Mn=Ds("starredPlugins");addEventListener("pagehide",ii);Is(oi,Lm);var Lo=new E("PluginManager"),Z=new Map,dt=new Set,li=new Set,si=new Set,Mo=new Map,Im=2880*60*1e3;function Hs(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),Z.set(t.name,t)}var Ns=()=>{let e=ne("Settings","knownPlugins");return L(e)?e:null};function Us(){let e=Rs(new Set(Z.keys()));e.length&&Lo.info(`Dropped settings of removed plugins: ${e.join(", ")}`);let t=Ns(),o=Date.now(),n={...t},r=[...Z.values()].filter(i=>!i.hidden&&!i.required&&!(i.name in n));for(let i of r)n[i.name]=t?o:0;for(let i of Object.keys(n))Z.has(i)||delete n[i];JSON.stringify(n)!==JSON.stringify(t)&&se("Settings","knownPlugins",n)}var Fs=e=>{let t=Ns()?.[e];return!!t&&Date.now()-t<Im},Gs=e=>Mo.get(e);function Ys(){for(let e of si)e()}function Ks(e,t){let o=Mo.get(e);(t?o?.join(`
`)===t.join(`
`):!o)||(t?Mo.set(e,t):Mo.delete(e),Ys())}var ze=e=>!!e.required||(ne(e.name,"enabled")??!!e.enabledByDefault);var ko=e=>`plugin-${e.name}`;function Qs(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?Ot(ko(e),t):Eo(ko(e))}function Bm(e){if(!dt.has(e.name))try{Qs(e),e.start?.(),dt.add(e.name)}catch(t){Eo(ko(e)),Lo.error(`Failed to start ${e.name}`,t)}}function ci(e){dt.delete(e.name),Eo(ko(e));try{e.stop?.()}catch(t){Lo.error(`Failed to stop ${e.name}`,t)}}var zs=e=>e.startAt??"HostReady";function js(e){if(ze(e)){li.has(zs(e))&&Bm(e);return}ci(e)}function Ln(e){li.add(e);for(let t of Z.values())zs(t)===e&&js(t);Lo.info(`${e}: ${[...dt].join(", ")}`)}function Ws(e,t){se(e.name,"enabled",t),ii()}function Om(){for(let e of Z.values())e.required||ze(e)||(dt.has(e.name)?ci(e):Eo(ko(e)))}var kn;function Vs(){kn?.(),kn=M(()=>Om())}function Js(){kn?.(),kn=void 0;for(let e of Z.values())ci(e);dt.clear(),li.clear(),Mo.clear()}function Zs(e){return si.add(e),()=>void si.delete(e)}Ht((e,t)=>{let o=Z.get(e);if(o){if(t==="enabled"){typeof ne(e,"enabled")=="boolean"&&js(o),Ys();return}if(dt.has(e))try{Qs(o),o.onSettingsChange?.(t)}catch(n){Lo.error(`Settings change failed for ${e}`,n)}}});var $s=`/*
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
`;var Rm=new E("Events");function In(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){Rm.error(`Listener for ${String(t)} failed`,r)}}}}var u={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',sidebarConversationRow:"[data-sidebar-chatgpt-conversation-key]",sidebarIndicator:"[data-sidebar-indicator]",timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',readAloud:'button:is([aria-label="Read aloud" i], [aria-label^="Read aloud" i], [aria-label="Stop reading" i], [aria-label^="Stop reading" i], [aria-label="\u6717\u8BFB"], [aria-label^="\u6717\u8BFB"], [aria-label="\u505C\u6B62\u6717\u8BFB"], [data-testid*="read-aloud" i])',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',composerConversation:"[data-above-composer-conversation-id]",oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",modelTrigger:'[data-testid="model-switcher-dropdown-button"], button[aria-label="Model selector" i], button[aria-label="Select ChatGPT model" i]',modelItem:'[role="menu"] [data-testid^="model-switcher-"], [role="menuitem"][data-testid^="model-switcher-"], [role="menu"] [role="menuitemradio"], [role="menu"] [data-reasoning-slider]',effortSlider:'[role="menu"] [data-reasoning-slider]',homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]',headerMore:'button[aria-label="More" i], button[aria-label="\u66F4\u591A"]',rightPanel:"aside[data-app-shell-focus-area='right-panel']",summaryPanel:"[data-summary-panel-variant]"};var Xs=/[​-‍﻿]/g,Ae=()=>J(u.composerInput),mt=e=>e instanceof HTMLElement&&e.matches(u.composerInput),$=(e=Ae())=>e?.closest("form")??document.querySelector(u.oldComposerForm);function B(e=Ae()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(Xs,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(Xs,"").trim()}var Dm=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function ce(e,t=Ae()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return Dm?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function _s(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:a,value:c}=e;return{first:!c.slice(0,i).includes(`
`),last:!c.slice(a).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var el=e=>{let t=$();return(t&&J(e,t))??J(e)},Nt=()=>el(u.stopButton),Hm=()=>{let e=el(u.sendButton);return e&&!e.matches(u.stopButton)?e:null};function Bn(){let e=Hm();if(e){e.disabled||e.click();return}Ae()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var tl=()=>ct(Nt());var rl=new E("Network"),Nm=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,Um=404,Fm=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,Pn=1e3,Gm=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),V=In(),di=new Map,ol=new Map,Ym=1,we=e=>e?di.get(e)??null:null;function On(e){let t=di.get(e);return t||di.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var il=e=>e==="user"||e==="assistant";function al(e){let t=e.author?.role;if(!e.id||!il(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(l=>typeof l=="string").join(`
`).trim(),i=n.filter(l=>L(l)&&l.content_type==="image_asset_pointer").length,a=e.metadata?.attachments,c=Array.isArray(a)&&a.length>0;return!r&&!i&&!c?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*Pn:null,text:r,hasFiles:c,imageCount:i}}var sl=e=>e.filter((t,o)=>t.role==="user"||e[o+1]?.role!=="assistant"),mi=e=>e.map(t=>t.createTime).filter(t=>t!=null);function Km(e,t){let o=mi(e),n=mi(t);return!o.length||!n.length?!1:Math.max(...o)<Math.min(...n)}function Qm(e){let t=mi(e);if(t.length<2)return e;let[o]=t,n=o-e.length;return e.map((i,a)=>(i.createTime!=null&&(n=i.createTime),{message:i,index:a,time:i.createTime??n})).toSorted((i,a)=>i.time-a.time||i.index-a.index).map(i=>i.message)}function zm(e,t){let o=t.filter(L).map(c=>L(c.message)?c.message:c);for(let c of o)c.id&&c.create_time&&e.times.set(c.id,c.create_time*Pn);let n=o.map(al).filter(c=>c!=null),r=new Set(n.map(c=>c.id)),i=e.chain.filter(c=>!r.has(c.id)),a=Km(n,i)?[...n,...i]:[...i,...n];return e.chain=sl(Qm(a)),e}function jm(e,t){if(!L(t)||!(L(t.mapping)||Array.isArray(t.messages)))return null;let o=On(e);if(typeof t.title=="string"&&t.title&&(o.title=t.title),Array.isArray(t.messages))return zm(o,t.messages);let n=t.mapping;for(let c of Object.values(n)){let l=c.message?.create_time;c.message?.id&&l&&o.times.set(c.message.id,l*Pn)}let r=[],i=new Set,a=typeof t.current_node=="string"?t.current_node:null;for(;a&&!i.has(a)&&n[a];){i.add(a);let c=n[a].message,l=c?al(c):null;l&&r.push(l),a=n[a].parent??null}return r.length&&(o.chain=sl(r.toReversed())),o}function Wm(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}var ui=e=>typeof e=="string"?e:null;function Vm(e){let t=typeof e?.body=="string"?qe(e.body):null;if(!L(t))return{conversationId:null,parentId:null,userId:null};let[o]=Array.isArray(t.messages)?t.messages:[];return{conversationId:ui(t.conversation_id),parentId:ui(t.parent_message_id),userId:L(o)?ui(o.id):null}}function Jm(e,t){if(!L(e))return;typeof e.type=="string"&&Gm.has(e.type)&&(t.handoff=!0);let o=L(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(On(e.conversation_id).title=e.title,V.emit("conversation",On(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&il(n.author?.role)){let r=n.create_time*Pn;t.conversationId&&On(t.conversationId).times.set(n.id,r),V.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function Zm(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:a}=await o.read();if(i)break;r+=n.decode(a,{stream:!0});let c=r.split(`
`);r=c.pop()??"";for(let l of c){if(!l.startsWith("data:"))continue;let d=l.slice(5).trim();d&&d!=="[DONE]"&&Jm(qe(d),t)}}}async function $m(e,t,o){let{conversationId:n}=t,r={conversationId:n,error:!1,handoff:!1};ol.set(e,n),V.emit("generate-start",{requestId:e,...t});try{let i=await o;i.ok?i.headers.get("content-type")?.includes("event-stream")&&await Zm(i.clone(),r):r.error=!0}catch(i){let a=i instanceof DOMException&&i.name==="AbortError";r.handoff||=a,r.error||=!a}finally{ol.delete(e),V.emit("generate-end",{requestId:e,...r})}}async function Xm(e,t){try{let o=await t;if(o.status===Um&&V.emit("conversation-missing",{id:e}),!o.ok)return;let n=jm(e,await o.clone().json());n&&V.emit("conversation",n)}catch(o){rl.debug("Conversation read skipped",o)}}function _m(e,t,o){let n=Wm(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&Nm.test(n.pathname)){$m(Ym++,Vm(t),o);return}let i=r==="GET"&&n.pathname.match(Fm)?.[1];i&&Xm(i,o)}var nl=!1;function ll(){if(nl)return;nl=!0;let e=oe.fetch,t=function(o,n){let r=e.call(this??oe,o,n);try{_m(o,n,r)}catch(i){rl.error("Fetch tap failed",i)}return r};oe.fetch=typeof exportFunction=="function"?exportFunction(t,oe):t}var ef="__reactContainer$",cl="__reactFiber$";function Rn(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var fi=(e,t)=>Object.keys(e.wrappedJSObject??e).some(o=>o.startsWith(t)),Se=e=>!fi(document,ef)||fi(e,cl);function ft(){return document.body?Promise.resolve():new Promise(e=>{let t=new MutationObserver(()=>{document.body&&(t.disconnect(),e())});t.observe(document,{childList:!0,subtree:!0})})}async function ul(){await ft();let e=Date.now()+8e3;for(;!fi(document.body,cl)&&Date.now()<e;)await new Promise(t=>setTimeout(t,100))}var tf=new E("Route"),dl=/\/c\/(?!local-)([\w-]+)/,of=500,hi=e=>{try{return new URL(e,location.origin).pathname.match(dl)?.[1]??null}catch{return null}},b=()=>location.pathname.match(dl)?.[1]??null,Ut=()=>location.pathname==="/",nf=/^\/g\/g-p-[^/]+(?:\/project)?\/?$/,Un=()=>nf.test(location.pathname),Te=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",Hn=new Set,Nn=location.href,gi=b(),Dn;function pi(){if(location.href===Nn)return;let e={prevHref:Nn,href:location.href,prevId:gi,id:b()};Nn=e.href,gi=e.id;for(let t of Hn)try{t(e)}catch(o){tf.error("Route listener failed",o)}}function rf(){let e=new AbortController,{navigation:t}=oe;t?.addEventListener("currententrychange",()=>queueMicrotask(pi),{signal:e.signal}),addEventListener("popstate",pi,{signal:e.signal});let o=setInterval(pi,of);return()=>{e.abort(),clearInterval(o)}}function ge(e){return Hn.add(e),Dn||(Nn=location.href,gi=b(),Dn=rf()),()=>{Hn.delete(e),!Hn.size&&(Dn?.(),Dn=void 0)}}var af=["data-turn","data-message-author-role"],sf=/:(user|assistant)$/,bi=`${u.messageUnit}, ${u.oldMessage}`,yi=e=>e==="user"||e==="assistant",gl=()=>!!document.querySelector(u.timelineScroll),hl=()=>!!J(u.timelineScroll),bl=()=>b()??document.querySelector(u.composerConversation)?.getAttribute("data-above-composer-conversation-id")??"",Ft=()=>gl()?J(u.timelineScroll):document;function Bo(){if(gl())return J(u.timelineScroll);let e=document.querySelector(u.turn);for(let t=e?.parentElement;t;t=t.parentElement){let{overflowY:o}=getComputedStyle(t);if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight)return t}return document.scrollingElement}var Gt=e=>e.getAttribute("data-chatgpt-search-unit-key")?.match(sf)?.[1]??null,yl=e=>[...e.querySelectorAll(u.searchUnit)].filter(t=>Gt(t)&&!t.parentElement?.closest(u.searchUnit)),ml=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function Io(e){let t=ml(e);return t.length?t:[...new Set([...e.querySelectorAll(bi)].flatMap(ml))]}function Yt(e=Ft()){if(!e)return[];let t=yl(e);return t.length?t:[...e.querySelectorAll(bi)].filter(o=>!o.parentElement?.closest(bi))}function lf(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function cf(e){for(let t of af){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(yi(o))return o}return e.querySelector(u.markdown)||e.querySelector(u.generatedImage)?"assistant":null}var uf=e=>!e.parentElement?.closest(u.turn);function je(){let e=we(b())?.chain??[];return[...Ft()?.querySelectorAll(u.turn)??[]].filter(uf).flatMap(o=>{let n=yl(o),r=n.length?n.map(i=>({el:i,known:Gt(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=d=>!n.some(m=>m.contains(d))&&y(d.textContent??""),a=[...o.querySelectorAll(u.assistantMarkdown)].find(d=>i(d)&&!Fn.test(y(d.textContent??""))),c=[...o.querySelectorAll(u.activityHeader)].findLast(i),l=a??c;l&&r.push({el:l,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?Io(o):Yt(o).flatMap(Io),a=n??cf(o)??lf(i,e)??(r%2?"assistant":"user"),c=o.closest(u.turn)??o,l=!o.closest(u.searchUnit)&&!!c.querySelector(u.turnBusy),d=a==="assistant"&&(o.matches(u.turnBusy)||!!o.querySelector(u.turnBusy)||l);return{el:o,role:a,messageIds:i,streaming:d}})}var df="[data-bloom], .sr-only",vl=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,Fn=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,fl=new WeakMap;function Kt(e){let o=(e.el.closest(u.turn)??e.el).textContent?.length??0,n=fl.get(e.el);if(n?.length===o)return n.summary;let r=mf(e);return fl.set(e.el,{length:o,summary:r}),r}function pl(e){let t=new Set,o=[];for(let n of e.querySelectorAll(u.assistantMarkdown)){if(n.closest(u.searchUnit))continue;let r=y(n.textContent??"");!r||Fn.test(r)||vl.test(r)||t.has(r)||(t.add(r),o.push(r))}return o}function mf(e){let t=e.el.querySelectorAll(u.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.closest(u.turn);if(e.role==="assistant"&&o&&e.el.matches(u.assistantMarkdown)&&!e.el.closest(u.searchUnit)){let l=pl(o);if(l.length)return l.join(" \xB7 ")}let n=e.el.querySelector(e.role==="assistant"?u.markdown:".whitespace-pre-wrap")??e.el,i=[...n.querySelectorAll(df)].map(l=>y(l.textContent??"")).filter(Boolean).reduce((l,d)=>l.replace(d,`
`),n.innerText||n.textContent||""),a=i.split(`
`).map(y).filter(l=>l&&!vl.test(l)&&!Fn.test(l));if(a.length)return a.join(" ");if(e.role==="assistant"&&o){let l=pl(o);if(l.length)return l.join(" \xB7 ")}let c=i.split(`
`).map(y).filter(l=>Fn.test(l));return c.length?c.at(-1)??"":e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function Gn(e){return e.text?y(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var vi=e=>e.matches(u.timelineScroll)&&getComputedStyle(e).flexDirection==="column-reverse";var ff=250,pf=400,gf=6e4,hf=5e3,bf=`:is(${u.turn}) :is(${u.turnBusy})`,yf="data-sidebar-chatgpt-conversation-key",xl="data-sidebar-indicator",vf=/:([0-9a-f-]{36})$/i,S=In(),Qn=new Set,Ai=new Set,We=!1,El=0,Qt=null,zt=!1,Yn=!1,Oo=0,zn=!1,Po=null,Al=!1,wl=new Map,H=()=>({generating:We,conversationId:b()}),ql=()=>tl()||!!Ft()?.querySelector(bf);function Af(){let e=ql();return e?Yn||(Oo=0,zn=!0):Yn=!1,[...Qn].some(t=>!Ai.has(t))||e&&!Yn||Date.now()<Oo}function wf(){return Po?.error?"error":zt?"stopped":"done"}function Sf(){Qt=null,We=!1,zn=!1,S.emit("fall",{conversationId:b(),outcome:wf()}),zt=!1,Po=null}function Tl(){let e=Af();e&&!We&&(We=!0,El=Date.now(),zt=!1,Po=null,S.emit("rise",{conversationId:b()})),e||!We?Qt=null:Qt==null?Qt=Date.now():Date.now()-Qt>=pf&&Sf()}function Kn(){Tl(),S.emit("tick",H())}function xf({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(We||Date.now()-El<gf);if(!o&&We){for(let n of Qn)Ai.add(n);Yn=ql(),Oo=0,zn=!1,Qt=null,We=!1,zt=!1,Po=null,S.emit("fall",{conversationId:e,outcome:"left"})}S.emit("context",{prevId:e,id:t,migrated:o}),Kn()}function Sl(){let e=b();for(let t of document.querySelectorAll(u.sidebarConversationRow)){let o=t.getAttribute(yf)?.match(vf)?.[1];if(!o)continue;let n=t.querySelector(u.sidebarIndicator)?.getAttribute(xl)??"",r=wl.get(o);r!==n&&(wl.set(o,n),r==="working"&&n==="unread"&&o!==e&&S.emit("background",{conversationId:o}))}}function Ef(e){e.target instanceof Element&&e.target.closest(u.stopButton)&&(zt=!0,Oo=0)}function Cl(){Al||(Al=!0,V.on("generate-start",({requestId:e})=>{Qn.add(e),Kn()}),V.on("generate-end",e=>{Qn.delete(e.requestId),!Ai.delete(e.requestId)&&(Po=e,Oo=e.handoff&&!e.error&&!zt&&!zn?Date.now()+hf:0,Kn())}),ge(xf),document.addEventListener("click",Ef,!0),qn(Kn,ff),Rn().then(()=>{M(Tl),M(Sl),new MutationObserver(Sl).observe(document.body,{subtree:!0,attributes:!0,attributeFilter:[xl]})}))}var x=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,qf="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",Tf={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${qf}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:x('<path d="M18 6 6 18M6 6l12 12"/>'),gear:x('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:x('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:x('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:x('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:x('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:x('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:x('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:x('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:x('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:x('<path d="m6 9 6 6 6-6"/>'),play:x('<path d="M7 4v16l13-8z"/>'),plus:x('<path d="M12 5v14M5 12h14"/>'),check:x('<path d="m5 12 5 5 9-10"/>'),alert:x('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:x('<path d="M4 5h16v11H9l-5 4z"/>'),layout:x('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:x('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:x('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:x('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:x('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:x('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:x('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:x('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:x('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:x('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:x('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:x('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:x('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:x('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:x('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:x('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),folder:x('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),ghost:x('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},T=e=>ks(Tf[e]);function wi(e){if(typeof e.showPopover=="function"){e.setAttribute("popover","manual");try{e.showPopover()}catch{e.matches(":popover-open")||e.removeAttribute("popover")}}}function he(e,t=document.body){t.append(e),wi(e)}var Ml=`/*
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
`;var Mf=6e3,kf=4,Lf={info:"info",success:"check",warning:"alert",error:"alert"},Ce=C("bloom-notice-"),jt=new Map,Ro;function If(){return!document.body||!Se(document.body)?null:(Ot("notices",Ml),Ro?.isConnected||(Ro=s("div",{class:`${Ce("stack")} bloom-root`,attrs:{"data-bloom":"notices",role:"region","aria-label":"Bloom++ notices","aria-live":"polite"}}),he(Ro)),Ro)}function kl(e){clearTimeout(e.timer),!(e.remaining<=0)&&(e.startedAt=Date.now(),e.timer=setTimeout(()=>Ve(e.key),e.remaining))}function Bf(e){e.timer!==void 0&&(clearTimeout(e.timer),e.timer=void 0,e.remaining=Math.max(1,e.remaining-(Date.now()-e.startedAt)))}function Of(e,t){let o=t.type??"info",n=s("button",{class:Ce("close"),attrs:{type:"button","aria-label":"Dismiss","data-bloom":"control"},on:{click:a=>{a.stopPropagation(),Ve(e)}}},T("close")),r=t.action&&s("button",{class:Ce("action"),text:t.action.label,attrs:{type:"button","data-bloom":"control"},on:{click:a=>{a.stopPropagation(),t.action?.onClick(),Ve(e)}}}),i=s("div",{class:`${Ce("card")} ${Ce(o)}`,attrs:{role:o==="error"?"alert":"status","data-bloom-notice":e}},s("span",{class:Ce("icon")},T(Lf[o])),s("div",{class:Ce("body")},s("div",{class:Ce("title"),text:t.title}),t.message&&s("div",{class:Ce("message"),text:t.message})),r,n);return t.onClick&&(i.classList.add(Ce("clickable")),i.addEventListener("click",()=>{t.onClick?.(),Ve(e)})),i}function jn(e){let t=e.key??st("notice"),o=If();if(!o)return t;let n=Of(t,e),r=jt.get(t),i={key:t,el:n,options:e,remaining:e.duration??Mf,startedAt:Date.now()};n.addEventListener("pointerenter",()=>Bf(i)),n.addEventListener("pointerleave",()=>kl(i)),r?(clearTimeout(r.timer),r.el.replaceWith(n)):o.append(n),jt.set(t,i),kl(i);for(let[a]of[...jt].slice(0,Math.max(0,jt.size-kf)))Ve(a);return t}function Ve(e){let t=jt.get(e);t&&(jt.delete(e),clearTimeout(t.timer),t.el.remove(),t.options.onClose?.())}var Pf=new E("Landmarks"),Rf=2e3,Df=1e4,Hf=1024,Ll={thread:{applies:()=>!!b(),selectors:[u.turn]},composer:{applies:()=>Ut()||Un()||!!b(),selectors:[u.composerInput]},sidebar:{applies:()=>innerWidth>=Hf,selectors:[u.sidebarScroll,u.rail,u.oldSidebar,u.oldRail]}},Nf={BetterNavigator:["thread"],BetterQuotes:["thread"],MessageTimestamps:["thread"],StarChats:["thread"],UserQuotes:["thread"],ComposerOpacity:["composer"],Continue:["composer"],InputHistory:["composer"],PromptQueue:["composer"],ChatListStatus:["sidebar"],CustomSidebarIdentity:["sidebar"],NoSidebarIdentity:["sidebar"],SidebarIdentityOpacity:["sidebar"]},Wt=new Map,Wn=new Set;function Uf(){let e=Date.now();for(let[t,{applies:o,selectors:n}]of Object.entries(Ll)){if(!o()){Wt.delete(t);continue}if(n.some(i=>document.querySelector(i))){Wt.delete(t),Wn.delete(t);continue}let r=Wt.get(t)??e;Wt.set(t,r),e-r>=Df&&Wn.add(t)}}function Ff(){let e=[];for(let[o,n]of Object.entries(Nf)){let r=Z.get(o),i=r&&ze(r)?n.filter(a=>Wn.has(a)):[];Ks(o,i.length?i.flatMap(a=>Ll[a].selectors):null),i.length&&e.push(o)}if(!e.length)return;let t=`2.0.104|${e.join(",")}`;ne("Settings","landmarkNotice")!==t&&(se("Settings","landmarkNotice",t),Pf.warn(`Page anchors missing for ${e.join(", ")}`),jn({key:"landmarks",type:"warning",title:"Bloom++ can't find parts of this page",message:`${e.join(", ")} may not work until Bloom++ is updated. Details are in Bloom++ settings.`,duration:0}))}function Gf(){if(document.hidden){Wt.clear();return}Uf(),Ff()}function Il(){return Wt.clear(),Wn.clear(),qn(Gf,Rf)}var Bl={BetterNavigator:1793448142e3,BetterQuotes:1793365944e3,ChatListStatus:1793351872e3,ChatStateFavicons:1790623094e3,Cleaner:1793267811e3,CompleteToast:1793354069e3,ComposerOpacity:1793344667e3,Continue:1790939902e3,CustomSidebarIdentity:1790658669e3,GreetingCustomizer:1793350808e3,InputHistory:1793365944e3,MessageTimestamps:1791080494e3,NoDictation:1793335268e3,NoShareLink:1790658669e3,NoSidebarIdentity:1790616549e3,PromptQueue:1793365944e3,RecentTopics:1793365944e3,ResponseNotification:1793354069e3,Settings:1793448244e3,SidebarIdentityOpacity:1790682605e3,StarChats:1793365944e3,StreamerMode:1793344667e3,TemporaryChat:1792014624e3,UserQuotes:1793345744e3,WiderChat:179333264e4};var ue="data-bloom-tip",Si=6,xi=8,pt,Ol=null;function Vt(e){if(e===Ol)return;if(Ol=e,!e){pt?.remove();return}pt??=s("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),pt.textContent=e.getAttribute(ue),he(pt);let t=e.getBoundingClientRect(),{width:o,height:n}=pt.getBoundingClientRect(),r=t.bottom+Si+n<=innerHeight-xi;pt.style.left=`${pe(t.left+t.width/2-o/2,xi,innerWidth-o-xi)}px`,pt.style.top=`${r?t.bottom+Si:t.top-Si-n}px`}var Pl=e=>e instanceof Element?e.closest(`[${ue}]`):null;function Rl(){let e=new AbortController,t={passive:!0,signal:e.signal};return document.addEventListener("pointerover",o=>Vt(Pl(o.target)),t),document.addEventListener("pointerout",o=>o.relatedTarget||Vt(null),t),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&Vt(Pl(o.target)),t),document.addEventListener("focusout",()=>Vt(null),t),document.addEventListener("pointerdown",()=>Vt(null),t),()=>{e.abort(),Vt(null)}}function Je(e,t,o,n=!1){let r=s("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let a=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(a)),t(a)===!1&&r.setAttribute("aria-checked",String(!a))}),r}function N(e,t,o){return s("button",{class:wn("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button","data-bloom":"control"},on:{click:t}})}function U(e,t,o,n){let r=s("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":t,"data-bloom":"control",[ue]:t},on:{click:o}},T(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function Vn(e,t,o,n,r,i){let a=s("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});a.value=String(e);let c=s("output",{text:`${a.value}${r}`});return a.addEventListener("input",()=>{c.textContent=`${a.value}${r}`,i(Number(a.value))}),s("div",{class:"bloom-slider"},a,c)}function Ei(e,t,o){let n=s("select",{class:"bloom-select"},...t.map(r=>s("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function Do(e,t,o="",n="text"){let r=s("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var Yf=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,Dl=/\S+@\S+\.\S+/,Kf=3,Qf=/^\/g\/(g-p-[^/]+)\//,zf=/^g-p-[0-9a-f]+-?/i,Hl=e=>!!e.closest(".sr-only"),qi=e=>!!e?.querySelector(u.menuButton);function Nl(){return[...document.querySelectorAll(u.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(qi)).filter(e=>e!=null)}function Ul(){let e=[...document.querySelectorAll(u.oldProfile)];if(e.length)return e.map(o=>{let n=o.parentElement?.children.length===1?o.parentElement:o;return{kind:"profile",anchor:n,insert:r=>n.before(r)}});let t=Nl().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(u.rail)){let n=[...o.children].find(qi);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}var Ti=e=>!e.closest("[data-bloom]")&&(!!e.querySelector("img, [class*=rounded-full]")||Kl(e).some(t=>!Hl(t))),Fl=e=>[...e.parentElement?.children??[]].find(t=>t!==e&&t instanceof HTMLElement&&Ti(t))??null;function Gl(){let e=[...document.querySelectorAll(u.oldProfile)];return e.length?e:[...Nl(),...[...document.querySelectorAll(u.rail)].map(o=>[...o.children].findLast(qi))].map(o=>[...o?.querySelectorAll(u.menuButton)??[]].findLast(n=>Ti(n)||Fl(n))).filter(o=>o!=null)}var Yl=()=>Gl().map(e=>Ti(e)?e:Fl(e)).filter(e=>e!=null);function Kl(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!y(t.textContent??"")&&!(t instanceof SVGElement))}var jf=e=>{if(/rounded-full/.test(e.getAttribute("class")??""))return!0;if(!e.clientWidth)return!1;let{borderRadius:t}=getComputedStyle(e);return t.includes("%")||Number.parseFloat(t)>=e.clientWidth/2};function Jn(e,t,o){for(let n of e.querySelectorAll(`[${t}]`))n!==o&&n.removeAttribute(t);o&&!o.hasAttribute(t)&&o.setAttribute(t,"")}function Wf(e,t){if(y(e.textContent??"").length>Kf)return null;let o=e.closest("button");for(let n=e;n&&n!==t&&n!==o;n=n.parentElement)if(jf(n))return n;return null}function Ci(e,t){e.hasAttribute(`data-bloom-${t}`)||e.setAttribute(`data-bloom-${t}`,"");let o=e.querySelector("img:not([data-bloom] img)"),n=Kl(e),r=o?null:n.map(m=>Wf(m,e)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),a=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");Jn(e,`data-bloom-${t}-avatar`,a);let c=n.filter(m=>!a?.contains(m)&&!Hl(m)),l=c.find(m=>Yf.test(y(m.textContent??""))),d=c.find(m=>Dl.test(m.textContent??""));Jn(e,`data-bloom-${t}-plan`,l),Jn(e,`data-bloom-${t}-email`,d),Jn(e,`data-bloom-${t}-name`,c.find(m=>m!==l&&m!==d))}function Vf(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function Zn(){return Gl().map(Vf).find(e=>e!=null)??[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&(Dl.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var gt=e=>[...document.querySelectorAll(u.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&hi(t.href)===e);function Ql(e){let t=gt(e).find(o=>y(o.textContent??""));return t?y(t.textContent??""):null}function zl(e){let t=new URL(e,location.origin).pathname.match(Qf)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!hi(n.href)&&y(n.textContent??""));return o?y(o.textContent??""):t.replace(zf,"").replaceAll("-"," ")||null}var Mi=0,$n;function Jf(e){if(!Y(e))return;for(let o of Yl())Ci(o,"profile");let t=Zn();t&&Ci(t,"menu")}function Me(){Mi++;let e=!0;return ft().then(()=>{e&&Mi&&!$n&&($n=M(Jf))}),()=>{e&&(e=!1,!--Mi&&($n?.(),$n=void 0))}}var Xn=["showSidebarEntry","showSidebarEntryOnHover","showAccountMenuEntry"],jl=1,Jt={showSidebarEntry:!0,showSidebarEntryOnHover:!1,showAccountMenuEntry:!1},ki=e=>Object.hasOwn(Jt,e),Li=e=>ne("Settings",e)??Jt[e],Wl=(e,t)=>!ki(e)||t!==!1||Xn.some(o=>o!==e&&Li(o));function Vl(){if(ne("Settings","entryRevision")!==jl){for(let e of Xn)se("Settings",e);se("Settings","entryRevision",jl)}}var Zf=new E("Themes"),$f=/^https:\/\/\S+\.css(?:[?#]|$)/i,Xf=/\/\*\*[^]*?@name[ \t]+([^\n*]+)/,K=g({themes:{type:"custom",default:[]},quickCss:{type:"custom",default:""},quickCssEnabled:{type:"custom",default:!0}});async function Jl(e){let t=new TextDecoder().decode(await An(e));if(!t.trim())throw new Error("Theme file is empty.");return t}var _n=(e,t)=>{K.store.themes=K.store.themes.map(o=>o.id===e?{...o,...t}:o)},Zl=e=>{K.store.themes=K.store.themes.filter(t=>t.id!==e)};async function $l(e){if(!$f.test(e))throw new Error("Enter an https URL that ends in .css.");if(K.store.themes.some(n=>n.url===e))throw new Error("This theme is already added.");let t=await Jl(e),o=t.match(Xf)?.[1]?.trim()||decodeURIComponent(new URL(e).pathname.split("/").pop()??e).replace(/\.css$/i,"").replaceAll(/[-_]/g," ");K.store.themes=[...K.store.themes,{id:st("theme"),name:o,url:e,css:t,enabled:!0}]}function Xl(e,t,o){if(!t.trim())throw new Error("Name is required.");if(!o.trim())throw new Error("CSS is required.");e?_n(e,{name:t.trim(),css:o}):K.store.themes=[...K.store.themes,{id:st("theme"),name:t.trim(),css:o,enabled:!0}]}async function _f(){await Promise.all(K.store.themes.filter(e=>e.url&&e.enabled).map(async({id:e,url:t,name:o})=>{try{let n=await Jl(t??"");K.store.themes.find(r=>r.id===e)?.css!==n&&_n(e,{css:n})}catch(n){Zf.warn(`Failed to refresh theme "${o}"`,n)}}))}var _l=f({name:"Themes",description:"Applies Bloom++ themes and Quick CSS.",authors:["Bloom contributors"],tags:[],icon:"spark",required:!0,hidden:!0,startAt:"Init",settings:K,styles:()=>[...K.store.themes.filter(e=>e.enabled).map(e=>e.css),K.store.quickCssEnabled?K.store.quickCss:""].join(`
`),start(){_f()}});var Q=C("bloom-settings-"),ep=3e3,ec=(e,t)=>{let o=s("textarea",{class:`bloom-input ${Q("css")}`,attrs:{spellcheck:"false",placeholder:"Paste your CSS here...","aria-label":t}});return o.value=e,o},Ii=(e,t)=>s("div",{class:Q("section-header")},s("div",{class:Q("field-label"),text:e}),s("div",{class:Q("field-desc"),text:t}));function tc(){let{quickCss:e,quickCssEnabled:t}=K.store,o=ec(e,"Quick CSS");return o.disabled=!t,o.addEventListener("input",()=>{K.store.quickCss=o.value}),s("div",{class:Q("section")},s("div",{class:Q("field","field-inline")},Ii("Quick CSS","Your own CSS, applied on every page as you type."),Je(t,n=>{K.store.quickCssEnabled=n,o.disabled=!n},"Enable Quick CSS")),o)}function oc(){let e=s("div",{class:Q("section")}),t=null,o=()=>s("div",{class:Q("section-error"),attrs:{role:"alert"}});function n(){let l=s("input",{class:"bloom-input",attrs:{type:"url",placeholder:"https://raw.githubusercontent.com/...","aria-label":"Theme URL"}}),d=o(),m=N("Add",async()=>{m.disabled=!0,d.textContent="";try{await $l(l.value.trim()),c()}catch(h){d.textContent=h instanceof Error?h.message:String(h),m.disabled=!1}});return s("div",{class:Q("section-block")},Ii("Online themes","Load a theme from a .css URL. It is fetched again on every page load, so updates apply."),s("div",{class:Q("section-row")},l,m),d)}function r(){let l=t==="new"?null:t,d=s("input",{class:"bloom-input",attrs:{placeholder:"My theme","aria-label":"Theme name"}});d.value=l?.name??"";let m=ec(l?.css??"","Theme CSS"),h=o();return s("div",{class:Q("section-block")},d,m,h,s("div",{class:Q("section-row")},N("Save",()=>{try{Xl(l?.id??null,d.value,m.value),t=null,c()}catch(P){h.textContent=P instanceof Error?P.message:String(P)}}),N("Cancel",()=>{t=null,c()})))}function i(){return s("div",{class:Q("section-block")},s("div",{class:Q("field","field-inline")},Ii("Local themes","CSS stored only on this device."),!t&&N("New local theme",()=>{t="new",c()})),t&&r())}function a(l){let d,m=U("trash","Remove",()=>{if(d){clearTimeout(d),Zl(l.id),c();return}m.setAttribute("aria-pressed","true"),m.setAttribute(ue,"Click again to remove"),d=setTimeout(()=>{d=void 0,m.removeAttribute("aria-pressed"),m.setAttribute(ue,"Remove")},ep)});return s("div",{class:Q("theme")},s("div",{class:Q("theme-text")},s("div",{class:`${Q("card-name")} bloom-truncate`,text:l.name}),s("div",{class:`${Q("field-desc")} bloom-truncate`,text:l.url??"Local"})),l.url?U("copy","Copy URL",()=>void vn(l.url??"")):U("edit","Edit",()=>{t=l,c()}),m,Je(l.enabled,h=>_n(l.id,{enabled:h}),`Enable ${l.name}`))}function c(){let{themes:l}=K.store;e.replaceChildren(n(),i(),l.length?s("div",{class:Q("themes")},...l.map(a)):s("div",{class:Q("empty"),text:"No themes yet."}))}return c(),e}var tp=new E("SettingsPanel"),p=C("bloom-settings-"),op=10080*60*1e3,np=3e3,nc="Toggle features. Some need a reload. Click the sliders icon to configure.",rp="Can't find its place on this page. It may need an update.",ip=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],ap=[{id:"plugins",label:"Plugins"},{id:"themes",label:"Themes"},{id:"css",label:"Quick CSS"}],sp=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],lp={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},ic=new Set(["chat","ui","privacy"]),z=null,Ho="plugins",bt="all",Bi="all",er="",Oi=[],ac=()=>[...Z.values()].filter(e=>!e.hidden),cp=e=>!!e.updatedAt&&Date.now()-e.updatedAt<op;function up(e){switch(bt){case"favorites":return Mn.has(e.name);case"recent":return cp(e);case"all":return!0;case"other":return!e.tags.some(t=>ic.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(bt)}}function dp(e){switch(Bi){case"all":return!0;case"enabled":return ze(e);case"disabled":return!ze(e)}}function mp(e){let t=er.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function fp(e){let t=Cn.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return bt==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var sc=e=>e.settings?.def??{},Di=e=>Object.values(sc(e)).some(t=>t.type!=="custom");function pp(e,t,o){let n=ne(e.name,t)??ai(o),r=i=>{if(e.name==="Settings"&&!Wl(t,i))return!1;se(e.name,t,i)};switch(o.type){case"boolean":return Je(n,r,o.description??t);case"slider":return Vn(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return Ei(n,o.options,r);case"string":return Do(n,r,o.placeholder);case"number":return Do(String(n),i=>r(Number(i)),"","number");case"component":{let i=s("div",{class:p("component")});return Oi.push(o.render(i)),i}case"custom":return null}}var gp=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function Hi(e){if(!z)return;let t=Object.entries(sc(e)).filter(([,i])=>i.type!=="custom").map(([i,a])=>{let c=pp(e,i,a),l=a.type==="boolean",d=a.type!=="component"&&s("div",{class:p("field-label"),text:gp(i)}),m=a.description&&s("div",{class:p("field-desc"),text:a.description});return s("div",{class:p("field",l?"field-inline":"field-stacked")},(d||m)&&s("div",{class:p("field-text")},d,m),c)}),o,n=N("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},np);return}clearTimeout(o),e.settings?.reset(),Zt(),Hi(e)},"danger"),r=s("div",{class:p("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&Zt()}},s("div",{class:p("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},s("div",{class:p("popup-header")},s("div",{class:p("card-icon")},T(e.icon)),s("div",{class:p("popup-title")},s("div",{class:p("card-name"),text:e.name}),s("div",{class:p("popup-authors"),text:e.authors.join(", ")})),U("close","Close",Zt)),s("p",{class:p("popup-desc"),text:e.description}),s("div",{class:p("fields")},...t),s("div",{class:p("popup-footer")},n)));z.querySelector(`.${p("modal")}`)?.append(r)}function Zt(){for(let e of Oi)e();Oi=[],z?.querySelector(`.${p("popup-backdrop")}`)?.remove()}function rc(e){let t=ze(e),o=Mn.has(e.name),n=Cn.has(e.name),r=!!e.required,i=Gs(e.name);return s("div",{class:[p("card",t?"card-on":"card-off"),r?p("card-required"):""].filter(Boolean).join(" ")},s("div",{class:p("card-top")},s("div",{class:p("card-icon")},T(e.icon)),s("div",{class:p("card-actions")},U("star",o?"Unstar":"Star",()=>{Mn.toggle(e.name),ht()},o),r?null:U("pin",n?"Unpin":"Pin to top",()=>{Cn.toggle(e.name),ht()},n),r?s("span",{class:p("required-mark"),attrs:{"aria-label":"Required",[ue]:"This plugin is required for Bloom++ to work"}},T("alert")):null,Di(e)&&U("gear","Settings",()=>Hi(e)),Je(t,a=>Ws(e,a),r?`${e.name} is required`:`Enable ${e.name}`,r))),s("div",{class:p("card-name")},e.name,Fs(e.name)&&s("span",{class:p("new-badge"),text:"New"})),s("div",{class:p("card-desc"),text:e.description,title:e.description}),i&&s("div",{class:p("card-issue"),attrs:{[ue]:`Missing: ${i.join(", ")}`}},T("alert"),s("span",{text:rp})),s("div",{class:p("card-footer"),text:e.authors.join(", ")}))}function lc(){let e=ac().some(o=>!o.tags.some(n=>ic.has(n)));z?.querySelector(`.${p("tabs")}`)?.replaceChildren(...ip.filter(o=>o.id!=="other"||e).map(o=>s("button",{class:p("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===bt)},on:{click:()=>{bt=o.id,lc(),ht()}}})))}function ht(){if(!z)return;let e=ac().filter(up),t=z.querySelector(`.${p("search")} input`);t&&(t.placeholder=`Search ${yn(e.length,"plugin")}...`);let o=fp(e.filter(d=>mp(d)&&dp(d))),n=bt==="all",r=n?o.filter(d=>!d.required):o,i=n?o.filter(d=>d.required):[],a=[...r.map(rc),...i.length?[s("div",{class:p("required-break"),attrs:{role:"separator"}}),...i.map(rc)]:[]],c=er.trim()?"No plugins match your search.":lp[bt]??"No plugins available.";z.querySelector(`.${p("grid")}`)?.replaceChildren(...a.length?a:[s("div",{class:p("empty"),text:c})])}function hp(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),z?.querySelector(`.${p("popup-backdrop")}`)?Zt():$t())}var cc,Pi;function Ri(){let e=z?.querySelector(`.${p("body")}`);if(!z||!e)return;for(let o of z.querySelectorAll(`.${p("nav-item")}`))o.setAttribute("aria-selected",String(o.getAttribute("data-section")===Ho));if(Zt(),Ho==="themes"){e.replaceChildren(oc());return}if(Ho==="css"){e.replaceChildren(tc());return}let t=s("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});t.value=er,t.addEventListener("input",()=>{er=t.value,ht()}),e.replaceChildren(s("div",{class:p("tabs"),attrs:{role:"tablist"}}),s("div",{class:p("toolbar")},s("label",{class:p("search")},T("search"),t),Ei(Bi,sp,o=>{Bi=o,ht()})),s("div",{class:p("grid")})),lc(),ht(),t.focus()}function Xt(e,t){e&&(Ho=e),z?(Ri(),wi(z)):bp();let o=t&&Z.get(t);o&&Hi(o)}function bp(){z=s("div",{class:`bloom-root ${p("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:e=>e.target===e.currentTarget&&$t()}},s("div",{class:p("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},s("div",{class:p("header")},s("div",{class:p("logo")},T("bloom")),s("h2",{class:p("title"),text:"Bloom++"}),s("span",{class:p("hint"),attrs:{"aria-label":nc,tabindex:"0",[ue]:nc}},T("info")),s("div",{class:p("nav"),attrs:{role:"tablist"}},...ap.map(e=>s("button",{class:p("nav-item"),text:e.label,attrs:{type:"button",role:"tab","data-section":e.id},on:{click:()=>{Ho=e.id,Ri()}}}))),s("span",{class:p("version"),text:"v2.0.104"}),U("close","Close",$t)),s("div",{class:p("body")}))),z.addEventListener("keydown",e=>e.stopPropagation()),Pi=new AbortController,document.addEventListener("keydown",hp,{capture:!0,signal:Pi.signal}),he(z),Ri(),cc=Zs(ht),tp.debug("Opened")}function $t(){Zt(),Pi?.abort(),cc?.(),z?.remove(),z=null}var tr=()=>z?$t():Xt();var uc=`/*
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
`;var de=C("bloom-entry-"),vp=4,Ui="--bloom-entry-x",Fi=1,dc=4,mc=8,Ap=150,be=g({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar.",default:Jt.showSidebarEntry},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:Jt.showSidebarEntryOnHover},showAccountMenuEntry:{type:"boolean",description:"Show Bloom++ at the top of the account menu.",default:Jt.showAccountMenuEntry},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:e=>(e.append(N("Reset position",()=>{be.store.entryPosition=Fi})),()=>e.replaceChildren())},showBloomMenu:{type:"boolean",description:"Hovering the Bloom++ row in the account menu opens a menu with Plugins, Themes, Quick CSS and plugin settings.",default:!0},menuPlugins:{type:"component",description:"Plugins listed in that menu.",render:e=>(e.append(...gc().map(t=>s("div",{class:de("menu-pick")},T(t.icon),s("span",{class:"bloom-truncate",text:t.name}),Je(hc(t),o=>{be.store.menuPicks={...be.store.menuPicks,[t.name]:o}},`List ${t.name} in the menu`)))),()=>e.replaceChildren())},entryPosition:{type:"custom",default:Fi},menuPicks:{type:"custom",default:{}}}),yt=new Map,Ze=null,No,gc=()=>[...Z.values()].filter(e=>!e.hidden).toSorted((e,t)=>e.name.localeCompare(t.name)),hc=e=>be.store.menuPicks[e.name]??Di(e),fc=!1,Ni=[];function wp(e,t,o){let n=e.currentTarget,r=t.clientWidth-n.offsetWidth;if(e.button!==0||r<=0||!t.classList.contains(de("hover")))return;let i=be.store.entryPosition,a=i,c=!1,l=new AbortController;n.setPointerCapture(e.pointerId),n.addEventListener("pointermove",m=>{!c&&Math.abs(m.clientX-e.clientX)<vp||(c=!0,o(),a=pe(i+(m.clientX-e.clientX)/r,0,Fi),t.style.setProperty(Ui,String(a)))},{signal:l.signal});let d=()=>{l.abort(),c&&(be.store.entryPosition=a,t.style.removeProperty(Ui))};n.addEventListener("pointerup",d,{signal:l.signal}),n.addEventListener("lostpointercapture",d,{signal:l.signal})}function Sp(e){let t=!1,o=s("button",{class:de("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),t||tr(),t=!1},pointerdown:r=>{t=!1,e!=="rail"&&wp(r,n,()=>{t=!0})}}},T("bloom"),e!=="rail"&&s("span",{class:de("label"),text:"Bloom++"})),n=s("div",{class:`bloom-root ${de("wrap")} ${de(e)}`,attrs:{"data-bloom":"entry"}},o);return n}function Uo(){clearTimeout(No),Ze?.remove(),Ze=null}function bc(){clearTimeout(No),No=setTimeout(Uo,Ap)}var yc=e=>e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0}));function xp(e,t){if(clearTimeout(No),Ze?.isConnected||!be.store.showBloomMenu)return;let o=(l,d,m)=>s("div",{class:de("flyout-item"),attrs:{role:"menuitem"},on:{pointerdown:h=>{h.button===0&&(h.preventDefault(),h.stopPropagation(),Uo(),yc(t),m())}}},T(d),s("span",{class:"bloom-truncate",text:l})),n=gc().filter(hc);Ze=s("div",{class:`bloom-root ${de("flyout")}`,attrs:{"data-bloom":"menu-flyout",role:"menu","aria-label":"Bloom++"},on:{pointerenter:()=>clearTimeout(No),pointerleave:bc}},o("Plugins","bloom",()=>Xt("plugins")),o("Themes","spark",()=>Xt("themes")),o("Quick CSS","edit",()=>Xt("css")),n.length>0&&s("div",{class:de("flyout-break"),attrs:{role:"separator"}}),...n.map(l=>o(l.name,l.icon,()=>Xt("plugins",l.name)))),he(Ze);let r=t.getBoundingClientRect(),{width:i,height:a}=Ze.getBoundingClientRect(),c=r.right+dc;Ze.style.left=`${c+i>innerWidth?r.left-i-dc:c}px`,Ze.style.top=`${pe(e.getBoundingClientRect().top,mc,innerHeight-a-mc)}px`}function Ep(e){let t=s("div",{class:`bloom-root ${de("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),Uo(),yc(e),tr()},pointerenter:()=>xp(t,e),pointerleave:bc}},T("bloom"),s("span",{text:"Bloom++"}),be.store.showBloomMenu&&s("span",{class:de("menu-chevron")},T("chevron"))),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function pc(){Uo();for(let e of document.querySelectorAll('[data-bloom="entry"], [data-bloom="menu-entry"]'))e.remove();yt.clear()}function qp(){for(let e of document.querySelectorAll('[data-bloom="menu-entry"]'))e.remove()}function vc(){let{showSidebarEntry:e,showSidebarEntryOnHover:t,showAccountMenuEntry:o}=be.store,n=e||t?Ul():[],r=new Set(n.map(a=>a.anchor));for(let[a,c]of yt)a.isConnected&&r.has(a)||(c.remove(),yt.delete(a));for(let a of document.querySelectorAll('[data-bloom="entry"]'))[...yt.values()].includes(a)||a.remove();for(let a of n){let c=yt.get(a.anchor);if(c?.isConnected||!Se(a.anchor))continue;let l=c??Sp(a.kind);yt.set(a.anchor,l),a.insert(l)}for(let a of yt.values())a.classList.toggle(de("hover"),!e);if(!o){qp();return}let i=Zn();i&&!i.querySelector('[data-bloom="menu-entry"]')&&Ep(i),i||Uo()}function Tp(e){Xn.some(Li)||(be.store[ki(e??"")?e:"showSidebarEntry"]=!0),vc()}var Ac=f({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:be,styles:()=>`${uc}.${de("hover")}{${Ui}:${be.store.entryPosition}}`,start(){Vl(),pc(),Ni=[M(vc),Rl(),Me()],!fc&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",tr),fc=!0)},stop(){for(let e of Ni)e();Ni=[],pc(),$t()},onSettingsChange:Tp});var Cp=80,Mp=420;function Gi(e,t,o){return(e.x-o.x)*(t.y-o.y)-(t.x-o.x)*(e.y-o.y)}function kp(e,t,o,n){let r=Gi(e,t,o),i=Gi(e,o,n),a=Gi(e,n,t);return!((r<0||i<0||a<0)&&(r>0||i>0||a>0))}function Lp(e,t){let o=(t.left+t.right)/2-(e.left+e.right)/2,n=(t.top+t.bottom)/2-(e.top+e.bottom)/2;if(Math.abs(o)>=Math.abs(n)){let i=o<0?t.right:t.left;return[{x:i,y:t.top},{x:i,y:t.bottom}]}let r=n<0?t.bottom:t.top;return[{x:t.left,y:r},{x:t.right,y:r}]}function wc(e,t){let o=pe(e.x,t.left,t.right),n=pe(e.y,t.top,t.bottom);return Math.hypot(e.x-o,e.y-n)}function or(e){let t=e.closeDelay??Cp,o=e.towardDelay??Mp,n=0,r=!1,i=null,a=null,c=()=>{document.removeEventListener("pointermove",v,!0)},l=()=>{n&&window.clearTimeout(n),n=0,c(),i=null,a=null},d=()=>{l(),r&&(r=!1,e.setHeld(!1))},m=()=>{r||(r=!0,e.setHeld(!0))},h=q=>{n&&window.clearTimeout(n),n=window.setTimeout(d,q)},P=q=>{let ee=e.panel(),at=e.trigger();if(!ee||!i)return!1;let te=ee.getBoundingClientRect();if(te.width<=0&&te.height<=0)return!1;let Re=at?.getBoundingClientRect(),[fe,Xr]=Re&&(Re.width||Re.height)?Lp(Re,te):[{x:te.left,y:te.top},{x:te.right,y:te.bottom}];return kp(q,i,fe,Xr)?!0:a!=null&&wc(q,te)<wc(a,te)-.25},v=q=>{let ee={x:q.clientX,y:q.clientY};if(e.over(q.target)){l();return}P(ee)?h(o):d(),a=ee};return{enter(){l()},leave(q){if(e.over(q.relatedTarget)){l();return}i={x:q.clientX,y:q.clientY},a=i,m(),document.addEventListener("pointermove",v,!0),h(t)},dispose(){l(),r=!1}}}var Sc=`/*
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
`;var k=C("bloom-nav-"),ar=80,Bp=1200,Op=2,xc=3e4,Pp=200,Rp=.9,Dp=.28,Hp=24,_t=8,Np=80,Up=12,Yi=80,Cc=`${u.rightPanel}, ${u.summaryPanel}`,Fp={user:"\u2753",assistant:"\u{1F916}"},Gp=["wheel","touchmove","pointerdown"],cr=g({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),A=null,D=[],ye=-1,vt=-1,eo=null,At="",Qi=0,zi=[],Ko=null,nr=null,rr=new Set,De,Fo,He,Go="",$e=[],Qo=null,sr=new Set,ji=new Map,ir=!1,Yp=e=>cr.store.showAssistant||e.role==="user",Kp=e=>e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.messageIds[0]||e.role;function Qp(e){return{role:e.role,summary:Kt(e),ids:e.messageIds,turn:e,streaming:e.streaming}}function Mc(e,t){let o=e.entries.at(-1);if(o?.role==="assistant"&&t.role==="assistant"){e.entries[e.entries.length-1]={...t,ids:[...new Set([...o.ids,...t.ids])]};return}e.entries.push(t)}function zp(){let e=[];for(let t of je()){let o=Qp(t),n=Kp(t),r=e.at(-1),i=!t.el.closest("[data-turn-key]");r&&(r.key===n||i&&o.role==="assistant")?Mc(r,o):e.push({key:n,entries:[o]})}return e}function jp(){let e=[];for(let t of we(b())?.chain??[]){let o={role:t.role,summary:Gn(t),ids:[t.id],turn:null,streaming:!1},n=e.at(-1);t.role==="assistant"&&n?Mc(n,o):e.push({key:t.id,entries:[o]})}return e}var to=e=>e.entries.flatMap(t=>t.ids);function lr(e,t){let o=new Set(to(e));return to(t).some(n=>o.has(n))}var wt=e=>y(e.entries.find(t=>t.role==="user")?.summary??""),Ki=(e,t)=>e.filter(o=>wt(o)===t).length,Wi=e=>({...e,turn:null,streaming:!1});function Wp(e,t){let o=new Set(t.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return e.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return Wi(r);let a=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return a&&a!==n.key?Wi(r):r})}))}function Vp(e,t){let o=t.entries.map((n,r)=>{let i=e.entries[r];if(!i)return n;let a=[...new Set([...n.ids,...i.ids])];return{...n,ids:a,summary:n.summary||i.summary}});for(let n of e.entries.slice(o.length))o.push(Wi(n));return{key:e.key,entries:o}}function kc(){let e=Bo();if(!e)return!1;let t=e.clientHeight-e.scrollHeight;return e.scrollTop-t<=Math.abs(e.scrollTop)}function Jp(e,t){let o=Wp(e,t).filter(l=>t.some(d=>d.key===l.key)||!t.some(d=>lr(d,l)));if(!t.length)return o;if(!o.length)return t;let n=t.findIndex(l=>o.some(d=>d.key===l.key));if(n<0)return kc()?t.concat(o):o.concat(t);let r=t[n]?.key,i=o.findIndex(l=>l.key===r),a=o.slice(0,i).concat(t.slice(0,n),o.slice(i)),c=a.findIndex(l=>l.key===r);for(let l=n;l<t.length;l++){let d=t[l];if(!d)continue;let m=a.findIndex(h=>h.key===d.key);if(m>=0){let h=a[m];h&&(a[m]=Vp(h,d)),c=m}else a.splice(c+1,0,d),c++}return a}function Zp(e,t){let o=0,n=0,r=0;for(let i=1-e.length;i<t.length;i++){let a=0,c=0;for(let d=0;d<e.length;d++){let m=t[d+i],h=e[d];!m||!h||(lr(h,m)?(a+=3,c++):wt(h)&&wt(h)===wt(m)&&a++)}let l=kc()?i<r:i>r;(a>o||a===o&&c>n||a===o&&c===n&&l)&&(o=a,n=c,r=i)}return{score:o,offset:r}}function $p(e,t){let o=e.entries.map((n,r)=>{let i=t.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of t.entries.slice(o.length))o.push({...n,turn:null});return{key:e.key,entries:o}}function Vi(e){return e.map(t=>({key:t.key,entries:t.entries.map(o=>({...o}))}))}function Xp(e,t,o=!0){if(!t.length)return e;if(!e.length)return t;let{score:n,offset:r}=Zp(e,t),i=Vi(e);if(n>0)for(let l=0;l<i.length;l++){let d=t[l+r],m=i[l];if(!d||!m)continue;let h=wt(m),P=!!h&&h===wt(d)&&Ki(e,h)===1&&Ki(t,h)===1;(lr(m,d)||P)&&(i[l]=$p(m,d))}let a=[],c=[];for(let l=0;l<t.length;l++){let d=t[l];if(!d)continue;let m=wt(d);!m||Ki(i,m)>0||i.some(h=>lr(h,d))||o&&(n>0&&l<r?a.push(d):c.push(d))}return a.concat(i,c)}var Ji=e=>e.entries.some(t=>t.turn?.el.isConnected);function _p(e,t,o){let n=e.findIndex(i=>to(i).includes(t));if(n>=0)return n+1;let r=e.find(Ji);return o&&r&&to(r).includes(o)?0:e.length}function eg(e){if(Qo){let{parent:t,user:o}=Qo;for(let n of e.slice(_p(e,t,o))){let r=to(n);if(!Ji(n)&&!(o&&r.includes(o)))for(let i of r)sr.add(i)}}return e.filter(t=>Ji(t)||!to(t).some(o=>sr.has(o)))}function Lc(){$e=[],Qo=null,sr.clear()}function tg(){let e=bl();if(e!==Go){Go&&$e.length&&ji.set(Go,Vi($e)),Go=e;let n=e?ji.get(e):void 0;n?.length?($e=Vi(n),Qo=null,sr.clear(),ir=!0):(Lc(),ir=!1)}let t=zp(),o=jp();return!t.length&&!o.length&&!hl()?($e=[],[]):($e=eg(Xp(Jp($e,t),o,!ir)),$e.flatMap(n=>n.entries).filter(Yp))}function og(e){for(let o of e)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!H().generating||e.some(o=>o.streaming))return;let t=e.at(-1);t&&(t.role==="assistant"||!cr.store.showAssistant?t.streaming=!0:e.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function Ic(){let e=tg();return og(e),e}function Bc(e){let t=e.getBoundingClientRect(),o=$()?.getBoundingClientRect().top,n=Math.min(t.bottom,o&&o>t.top?o:t.bottom);return{top:t.top,bottom:n}}function Oc(e){return((e.matches(".whitespace-pre-wrap, .markdown, .prose, [data-markdown-text-style]")?e:e.querySelector(".whitespace-pre-wrap")??e.querySelector(".markdown, .prose, [data-markdown-text-style]"))??e).getBoundingClientRect().top}function Ec(e){let t=D[e]?.turn?.el;return t?.isConnected?t:null}function ng(e){if(!D.length)return null;let t=e.scrollHeight-e.clientHeight,o=vi(e),n=Math.min(e.scrollTop,0),r=o?-n:t-e.scrollTop,i=o?t+n:e.scrollTop,a=t<=_t||r<=_t,c=t>_t&&i<=_t,{top:l,bottom:d}=Bc(e),m=Ec(0),h=m?Oc(m):Number.NaN,P=!!m&&h>=l-_t&&h<=l+48,v=Ec(D.length-1),q=v?.getBoundingClientRect().bottom??Number.NaN,ee=!!v&&q<=d+_t&&q>=d-Np;return a||ee?"bottom":c||P?"top":null}function rg(e){let{top:t,bottom:o}=Bc(e),n=t+Math.max(o-t,0)*Dp,r=[],i=-1;if(D.forEach((c,l)=>{let d=c.turn?.el;if(!d?.isConnected){r.push(Number.NaN);return}let m=Oc(d);r.push(m),i<0&&(i=l),m<=n&&(i=l)}),i<0)return Math.max(D.findIndex(c=>c.turn),0);let a=r[ye];return Number.isFinite(a)?i===ye?ye:i>ye?i:a<=n+Hp?ye:i:i}function ig(e){let t=ng(e);return t==="bottom"?D.length-1:t==="top"?0:rg(e)}function qc(e){cr.store.jumpEffect==="border"&&(e.classList.add(k("flash")),setTimeout(()=>e.classList.remove(k("flash")),Bp))}function ur(e){let t=D[e],o=Bo();if(!t||!o)return;if(!t.turn&&!t.ids.length){vt=e,Yo(),o.scrollTo({top:vi(o)?0:o.scrollHeight});return}vt=e,eo=e?null:{chat:b(),first:t.ids[0],until:Date.now()+xc},Yo();let n=t.turn?.el;if(n?.isConnected){let d=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:d<o.clientHeight*Op?"smooth":"auto"}),qc(n);return}let r=D.findIndex(d=>d.turn),i=r>=0&&e<r?-1:1,a=++Qi,c=Date.now()+xc,l=()=>{let d=Bo();if(a!==Qi||Date.now()>c||!d)return;D=Ic();let m=D.find(P=>P.ids.some(v=>t.ids.includes(v)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),qc(m),vt=D.findIndex(P=>P.turn?.el===m),Yo();return}let h=d.scrollTop;d.scrollBy({top:i*d.clientHeight*Rp,behavior:"instant"}),d.scrollTop===h?setTimeout(l,Pp):requestAnimationFrame(l)};l()}function ag(e,t){return s("button",{class:k("row"),attrs:{type:"button","data-index":String(t),"data-message-id":e.ids[0]??""},on:{click:()=>ur(t)}},s("span",{text:Fp[e.role]}),s("span",{class:"bloom-truncate",text:Ee(e.summary||"\u2026",ar)}))}function sg(e,t){let o=e.offsetWidth?t.width/e.offsetWidth:1;return t.left+(e.clientLeft+e.clientWidth)*o}function lg(e){let t=1/0;for(let o of document.querySelectorAll(Cc)){if(!ct(o))continue;let n=o.getBoundingClientRect();n.width<Yi||n.height<Yi||n.left<e.left+Yi||n.left<t&&(t=n.left)}return Number.isFinite(t)?t:null}function Tc(e){if(!A)return;let t=e.getBoundingClientRect(),o=$()?.getBoundingClientRect().top,r=Math.min(t.bottom,o&&o>t.top?o:t.bottom)-t.top,i=Math.min(sg(e,t),lg(t)??1/0);A.style.right=`${document.documentElement.clientWidth-i+Up}px`,A.style.top=`${t.top}px`,A.style.height=r>1?`${r}px`:""}function cg(){let e=Bo();if(D=Ic(),!D.length||!e){He?.dispose(),He=void 0,A?.remove(),A=null,At="";return}if(Ko!==e){Fo?.abort(),Fo=new AbortController,e.addEventListener("scroll",Ke(Yo),{passive:!0,signal:Fo.signal});for(let n of Gp)e.addEventListener(n,Rc,{passive:!0,signal:Fo.signal});Ko=e,De?.disconnect(),De=new ResizeObserver(()=>{e.isConnected&&Tc(e)}),De.observe(e),nr=null,rr=new Set}let t=$();if(t&&t!==nr&&De&&(De.observe(t),nr=t),De)for(let n of document.querySelectorAll(Cc))rr.has(n)||(De.observe(n),rr.add(n));fg(),Tc(e);let o=JSON.stringify(D.map(n=>[n.role,n.ids]));o!==At?(At=o,vt=-1,dg(),eo&&Date.now()<eo.until&&eo.chat===b()&&D[0]?.ids[0]!==eo.first&&ur(0)):ug(),Yo()}function Yo(){if(!A||!Ko)return;ye=vt>=0?vt:ig(Ko),A.querySelectorAll(`.${k("tick")}`).forEach((t,o)=>t.classList.toggle(k("tick-current"),o===ye)),A.querySelectorAll(`.${k("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===ye)));let e=A.querySelector(`.${k("toc-head")}`);e&&(e.textContent=`${ye+1} / ${D.length}`)}function ug(){A?.querySelectorAll(`.${k("tick")}`).forEach((e,t)=>{let o=D[t],n=Ee(o.summary,ar);e.title!==n&&(e.title=n),e.classList.toggle(k("tick-streaming"),o.streaming)}),A?.querySelectorAll(`.${k("row")}`).forEach(e=>{let t=e.lastElementChild,o=Ee(D[Number(e.dataset.index)].summary||"\u2026",ar);t&&t.textContent!==o&&(t.textContent=o)})}function dg(){A?.querySelector(`.${k("rail")}`)?.replaceChildren(...D.map((t,o)=>s("button",{class:wn(k("tick"),k(`tick-${t.role}`),t.streaming&&k("tick-streaming"),o===ye&&k("tick-current")),title:Ee(t.summary,ar),attrs:{type:"button","aria-label":`Jump to message ${o+1}`,"data-message-id":t.ids[0]??""},on:{click:()=>ur(o)}}))),A?.querySelector(`.${k("toc-list")}`)?.replaceChildren(...D.map(ag))}var ke=Ke(cg);function Zi(e){if(e===A)return;let t=e.__bloomNavStop;if(t&&t!==$i)try{t()}catch{}e.isConnected&&e!==A&&e.remove()}function Pc(){let e=[...document.querySelectorAll('[data-bloom="navigator"]')];if(A&&!A.isConnected&&(A=null),A&&e.includes(A)){for(let t of e)Zi(t);return}A=e[0]??null;for(let t of e.slice(1))Zi(t)}function mg(){He?.dispose(),He=or({over:e=>e instanceof Node&&!!A?.contains(e),trigger:()=>A?.querySelector(`.${k("rail")}`),panel:()=>A?.querySelector(`.${k("toc")}`),setHeld:e=>A?.classList.toggle(k("open"),e)})}function fg(){Pc(),A&&!A.querySelector(`.${k("rail")}`)&&(A.remove(),A=null,At=""),A||(A=s("div",{class:`bloom-root ${k("root")}`,attrs:{"data-bloom":"navigator"},on:{pointerenter:()=>He?.enter(),pointerleave:e=>He?.leave(e)}},s("div",{class:k("rail")}),s("div",{class:k("bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:k("toc")},s("div",{class:k("toc-head")}),s("div",{class:k("toc-list")}))),At=""),He||mg(),A.isConnected||document.body.append(A),A.querySelector(`.${k("tick")}`)||(At=""),A.__bloomNavStop=$i}function Rc(){vt=-1,eo=null,Qi++}function $i(){for(let e of zi)e();zi=[],Fo?.abort(),De?.disconnect(),De=void 0,Ko=null,nr=null,rr=new Set,removeEventListener("keydown",Dc,!0),removeEventListener("resize",ke),He?.dispose(),He=void 0,A&&delete A.__bloomNavStop,A?.remove(),A=null,At="",Lc(),ji.clear(),Go="",ir=!1;for(let e of document.querySelectorAll('[data-bloom="navigator"]'))Zi(e)}var pg=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function Dc(e){if(!A||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||pg(document.activeElement)||J("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:ye-1,ArrowDown:ye+1,Home:0,End:D.length-1}[e.key];if(o==null){Rc();return}o<0||o>=D.length||(e.preventDefault(),e.stopPropagation(),ur(o))}var Hc=f({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:cr,styles:Sc,start(){Pc(),zi=[M(e=>Y(e)&&ke()),ge(ke),V.on("conversation",ke),V.on("generate-start",({parentId:e,userId:t})=>{e&&(Qo={parent:e,user:t},ke())}),S.on("rise",ke),S.on("fall",ke)],addEventListener("keydown",Dc,!0),addEventListener("resize",ke,{passive:!0}),ke()},stop:$i,onSettingsChange:ke});var Nc=`/*
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
`;var re=C("bloom-quotes-"),aa="BloomBetterQuotes",hg=40,Yc=8,bg=1800,ta=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,Uc=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,St=g({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),Xi,_i,oo,ea=!1,oa=0,dr=null,mr=null,Ne=null;function sa(){return location.pathname.match(/\/c\/(?!local-)([\w-]+)/)?.[1]??(new URLSearchParams(location.search).get("temporary-chat")==="true"?"temporary":"draft")}function pr(){try{let e=JSON.parse(sessionStorage.getItem(aa)??"[]");return Array.isArray(e)?e.filter(t=>!!t&&typeof t=="object"&&typeof t.id=="string"&&typeof t.text=="string"&&!!t.text):[]}catch{return[]}}function la(e){try{sessionStorage.setItem(aa,JSON.stringify(e.slice(-hg)))}catch{}}function zo(e){return pr().find(t=>t.id===e)?.text??""}function yg(e,t){let o=pr().filter(n=>n.id!==e);o.push({id:e,text:t}),la(o)}function na(e=sa()){la(pr().filter(t=>t.id!==e)),fr()}function vg(e){let t=zo("draft");if(!t||zo(e))return;let o=pr().filter(n=>n.id!=="draft");o.push({id:e,text:t}),la(o)}function ra(e){return`${e.getAttribute("aria-label")??""} ${e.getAttribute("title")??""}`}function Ag(e){let t=ra(e);return Uc.test(t)&&!/quote|引用/.test(t)?!1:/quote|引用/.test(t)&&ta.test(t)?!0:ta.test(t)&&!Uc.test(t)}function Kc(e){let t=e.cloneNode(!0),o=[...t.querySelectorAll("button, [role='button']")],n=new Set(o.map(r=>r.getAttribute("aria-label")).filter(Boolean));for(let r of o)r.remove();for(let r of t.querySelectorAll("*"))!r.children.length&&n.has(y(r.textContent??""))&&r.remove();return y(t.textContent??"")}function wg(e){let t=$(),o=e.parentElement,n=0;for(;o&&o!==t&&n<5;){if(n++,o.matches(u.composerInput)||o.querySelector(u.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=Kc(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function gr(){let e=$();if(!e)return null;for(let t of e.querySelectorAll("button, [role='button']")){if(t.closest("[data-bloom]")||!Ag(t))continue;let o=wg(t),n=o?Kc(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:t}}return null}function Sg(e){let t=e.closest(u.searchUnit)??e.closest(u.oldMessage);return t&&(Gt(t)??t.getAttribute("data-message-author-role"))==="user"?t:null}function ca(e){return y(e).slice(0,48)}function xg(e,t){let o=ca(e);if(o.length<Yc)return null;let n=null;for(let r of Yt()){if(t&&(r===t||t.contains(r)||r.contains(t)))continue;let i=y(r.textContent??"");if(!i.includes(o))continue;let a=o.length/Math.max(i.length,1);(!n||a>n.score)&&(n={el:r,score:a})}return n?.el??null}function Eg(e,t){let o=ca(t),n=e;for(let r of e.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&y(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${re("hit")}`)?.classList.remove(re("hit")),n.classList.add(re("hit")),window.clearTimeout(oa),oa=window.setTimeout(()=>n.classList.remove(re("hit")),bg)}function Fc(e){let t=e.closest(u.timelineScroll)??document.scrollingElement;if(!(t instanceof HTMLElement)&&t!==document.scrollingElement)return;let o=e.getBoundingClientRect();if(o.height<1||!t)return;let n=t.getBoundingClientRect(),r=$()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,a=o.top+o.height/2-(n.top+i)/2;Math.abs(a)<8||t.scrollTo({top:t.scrollTop+a,behavior:"smooth"})}function ua(){if(!Ne||!dr?.isConnected)return;let e=dr.getBoundingClientRect();e.width<1||(Ne.style.top=`${Math.max(8,e.top+8)}px`,Ne.style.left=`${Math.max(8,e.right-Ne.offsetWidth-8)}px`)}function qg(e,t,o){dr=e,mr=t,Ne??=s("button",{class:`bloom-root ${re("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),Ne.isConnected||document.body.append(Ne),Eg(e,o),ua()}function Gc(){Ne?.remove(),Ne=null,dr=null,mr=null,document.querySelector(`.${re("hit")}`)?.classList.remove(re("hit"))}function Qc(){return document.querySelector('[data-bloom="quote-chip"]')}function fr(){Qc()?.remove()}function Tg(e){let o=$()?.getBoundingClientRect();!o||o.width<8||(e.style.width=`${Math.max(120,o.width-24)}px`,e.style.left=`${o.left+12}px`,e.style.top=`${Math.max(8,o.top-e.offsetHeight-8)}px`)}function Cg(e){let t=Qc();t||(t=s("div",{class:`bloom-root ${re("chip")}`,attrs:{"data-bloom":"quote-chip"}},s("span",{class:re("text")}),s("button",{class:re("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(t));let o=t.querySelector(`.${re("text")}`),n=y(e);o&&o.textContent!==n&&(o.textContent=n),t.dataset.text=e,Tg(t)}function ia(){if(!ea){ea=!0;try{let e=sa(),t=gr();St.store.persistAcrossChats&&t&&zo(e)!==t.text&&yg(e,t.text);let o=St.store.persistAcrossChats?zo(e):"";!o||t&&y(t.text)===y(o)?fr():Cg(o),ua()}finally{ea=!1}}}function Mg(e){let t=e.closest('[data-bloom="quote-chip"]');if(t instanceof HTMLElement&&!e.closest(`.${re("x")}`)){let i=t.dataset.text??t.querySelector(`.${re("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:t}:null}let o=e.closest("blockquote");if(o instanceof HTMLElement&&!e.closest("a, button")){let i=Sg(o),a=y(o.textContent??"");if(i&&a)return{text:a,skip:i,origin:o}}let n=$();if(!n||!n.contains(e)||mt(e)||e.closest("button, [role='button']"))return null;let r=gr();return!r||!r.row.contains(e)?null:{text:r.text,skip:null,origin:r.row}}function kg(e){let{target:t}=e;if(!(t instanceof Element))return;if(t.closest('[data-bloom="quote-back"]')){e.preventDefault(),e.stopPropagation(),mr?.isConnected&&Fc(mr);return}if(t.closest(`.${re("x")}`)){e.preventDefault(),e.stopPropagation(),na();return}let o=gr();if(o&&(t===o.dismiss||o.dismiss.contains(t))){na();return}if(Lg(t)&&zc(),!St.store.jumpToPassage)return;let n=Mg(t);if(!n)return;let r=xg(n.text,n.skip);r&&(e.preventDefault(),e.stopPropagation(),qg(r,n.origin,n.text),Fc(r))}function Lg(e){let t=e.closest("button, [role='button']");return!(t instanceof HTMLElement)||t.closest("[data-bloom]")||!$()?.contains(t)?!1:/send|submit|发送|提交/i.test(ra(t))&&!ta.test(ra(t))}function Ig(e){return!(e instanceof KeyboardEvent)||e.key!=="Enter"||e.shiftKey||e.isComposing?!1:mt(e.target)}function zc(){if(!St.store.persistAcrossChats)return;let e=sa(),t=zo(e);if(t){if(!gr()){let o=B(),n=ca(t);n.length>=Yc&&!y(o).includes(n)&&ce(`> ${t}

${o}`.trim())}na(e)}}function Bg(e){Ig(e)&&zc()}function Og(e){!e.prevId&&e.id&&vg(e.id),ia()}var jc=f({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:St,styles:Nc,onSettingsChange(e){e==="jumpToPassage"&&!St.store.jumpToPassage&&Gc(),e==="persistAcrossChats"&&!St.store.persistAcrossChats&&(sessionStorage.removeItem(aa),fr()),ia()},start(){oo=new AbortController,document.addEventListener("pointerdown",kg,{capture:!0,signal:oo.signal}),document.addEventListener("keydown",Bg,{capture:!0,signal:oo.signal}),addEventListener("scroll",ua,{capture:!0,passive:!0,signal:oo.signal}),_i=ge(Og),Xi=M(e=>Y(e)&&ia())},stop(){oo?.abort(),oo=void 0,_i?.(),_i=void 0,Xi?.(),Xi=void 0,window.clearTimeout(oa),Gc(),fr()}});var Wc=`/*
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
`;var Rg=C("bloom-cls"),Dg="bloom-cls",Hg=600*1e3,ma=st("tab"),ro=new Map,jo=new Map,no=null,Vc=[],Ng=e=>e==="streaming"||e==="error";function Ug(){let e=new Map,t=Date.now();for(let[o,n]of jo)t-n.at>Hg?jo.delete(o):e.set(o,n.status);for(let[o,n]of ro)e.set(o,n);return e}function Fg(e){return s("span",{class:`bloom-root ${Rg("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&T("alert"))}function br(){let e=Ug(),t=new Set;for(let[o,n]of e)for(let r of gt(o)){if(!Se(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let a=Fg(n);t.add(a),r.append(a)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function hr(e,t){e&&(t?ro.set(e,t):ro.delete(e),no?.postMessage({tab:ma,id:e,status:t}),br())}function Gg({data:e}){!L(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===ma||(Ng(e.status)?jo.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):jo.delete(e.id),br())}function da(){for(let e of ro.keys())no?.postMessage({tab:ma,id:e,status:null})}var Jc=f({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:()=>`${Wc}`,start(){for(let e of document.querySelectorAll('[data-bloom="cls"]'))e.remove();no=typeof BroadcastChannel=="function"?new BroadcastChannel(Dg):null,no?.addEventListener("message",Gg),addEventListener("pagehide",da),Vc=[S.on("rise",({conversationId:e})=>hr(e,"streaming")),S.on("fall",({conversationId:e,outcome:t})=>hr(e,t==="error"?"error":null)),S.on("context",({prevId:e,id:t,migrated:o})=>{o&&H().generating?hr(t,"streaming"):!o&&ro.get(e??"")==="streaming"&&hr(e,null)}),M(e=>Y(e)&&br())],b()&&br()},stop(){for(let e of Vc)e();da(),no?.close(),no=null,removeEventListener("pagehide",da),ro.clear(),jo.clear();for(let e of document.querySelectorAll('[data-bloom="cls"]'))e.remove()}});var $c=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],Ar={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Yg={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Kg="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",fa=32,wr=64,pa="#FCFCFC",ga="#111111",Qg=14,Sr=51.5,zg=12.5,jg=9.75,Zc=52,Wg=10.5,Vg=7.75,Jg={rotate:e=>e.arc(Sr,Sr,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function yr(e){let t=document.createElement("canvas");t.width=t.height=fa;let o=t.getContext("2d");return o?(o.scale(fa/wr,fa/wr),e(o),t.toDataURL("image/png")):""}function vr(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D(Kg);o&&(e.strokeStyle=ga,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function xr(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function Zg(e,t){xr(e,Sr,zg,ga),xr(e,Sr,jg,Ar[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),Jg[t](e),e.stroke()}function $g(e,t){e.beginPath(),e.roundRect(0,0,wr,wr,Qg),e.fillStyle=t,e.fill()}var Xg=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function Xc(e,t){switch(e){case"original":return Xg(Yg[t]);case"hole":return yr(o=>vr(o,Ar[t],!0));case"bg":return yr(o=>{$g(o,Ar[t]),vr(o,pa,!1)});case"dot":return yr(o=>{vr(o,pa,!0),xr(o,Zc,Wg,ga),xr(o,Zc,Vg,Ar[t])});case"badge":return yr(o=>{vr(o,pa,!0),Zg(o,t)})}}var Vo="bloom-chat-state-favicon",Jo="data-bloom-rel",ya="data-bloom-media",_c="bloom-parked-icon",_g="/favicon.ico",tu=g({style:{type:"select",description:"How the tab icon shows the chat state.",options:$c,default:"bg"}}),Xe=null,ou="",Er=null,nu="",eu=new Map,va,ha=[],ru=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${Jo}]`)];function Aa(){for(let e of ru())e.id!==Vo&&(e.hasAttribute(Jo)||(nu||=e.href,e.setAttribute(Jo,e.rel),e.setAttribute(ya,e.getAttribute("media")??"")),e.rel!==_c&&(e.rel=_c),e.media!=="not all"&&(e.media="not all"))}function eh(){for(let e of ru()){let t=e.getAttribute(Jo);if(t==null)continue;e.rel=t;let o=e.getAttribute(ya);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(Jo),e.removeAttribute(ya)}}function iu(){let e=document.getElementById(Vo);return e||(e=document.createElement("link"),e.id=Vo,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function th(e){if(e==="wait")return nu||_g;let t=tu.store.style,o=`${t}:${e}`,n=eu.get(o);return n||eu.set(o,n=Xc(t,e)),n}function ba(e){if(e)return"rotate";let t=B();return Xe&&t&&t!==ou&&(Xe=null),Xe==="error"?"error":Xe==="done"?"done":t?"ready":"wait"}function Wo(e,t=!1){if(e===Er&&!t)return;Er=e;let o=iu(),n=th(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function oh(){va=new MutationObserver(()=>{Aa(),document.head.lastElementChild?.id!==Vo&&iu()}),va.observe(document.head,{childList:!0})}var au=f({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"HostReady",settings:tu,start(){Aa(),Wo(ba(H().generating),!0),oh(),ha=[S.on("rise",()=>{Xe=null,Wo("rotate")}),S.on("fall",({outcome:e})=>{Xe=e==="done"||e==="error"?e:null,ou=B(),Wo(ba(!1))}),S.on("context",({migrated:e})=>{e||(Xe=null)}),S.on("tick",({generating:e})=>{Aa(),Wo(ba(e))})]},stop(){for(let e of ha)e();ha=[],va?.disconnect(),document.getElementById(Vo)?.remove(),eh(),Er=null,Xe=null},onSettingsChange(){Wo(Er??"wait",!0)}});var _e="data-bloom-invite",nh=/^(?:invite team members|invite members|邀请团队成员|邀请成员)$/i,su=':is(button, a:not([href^="/c/"])):not(main *, [role="dialog"] *)',rh={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${u.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])'],hideInvite:[`[${_e}]`,`div:has(> [${_e}]:only-child)`]},lu=g({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0},hideInvite:{type:"boolean",description:"Hide Invite team members in the sidebar.",default:!0}}),qr,wa=!1;function ih(e){if(Y(e))for(let t of document.querySelectorAll(`${su}, [${_e}]`))!t.matches(su)||!nh.test(y(t.textContent??""))?t.removeAttribute(_e):t.hasAttribute(_e)||t.setAttribute(_e,"")}var cu=f({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads, notices and Invite team members.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:lu,styles:()=>Ye(Object.entries(rh).flatMap(([e,t])=>lu.store[e]?t:[])),start(){wa=!0,ft().then(()=>{wa&&!qr&&(qr=M(ih))})},stop(){wa=!1,qr?.(),qr=void 0;for(let e of document.querySelectorAll(`[${_e}]`))e.removeAttribute(_e)}});var ah=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function sh(){let e=y(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!ah.has(e.toLowerCase())?e:null}function xt(e){return e?we(e)?.title??Ql(e)??(e===b()?sh():null):null}var xa="complete-toast",lh=1e3,Ea=g({keepUntilDismissed:{type:"boolean",description:"Don't auto-close the toast. Dismiss with \xD7, or by opening the chat.",default:!1},duration:{type:"slider",description:"Seconds before the toast closes. Ignored when Keep Until Dismissed is on.",min:0,max:20,default:6,unit:"s"}}),qa=null,Sa=[];function ch(e){let t=gt(e)[0];t?t.click():location.assign(`/c/${e}`)}function uh(e){qa=e,jn({key:xa,title:xt(e)??"ChatGPT",message:"Response ready",type:"success",onClick:()=>ch(e),onClose:()=>{qa=null},duration:Ea.store.keepUntilDismissed?0:Ea.store.duration*lh})}var uu=f({name:"CompleteToast",description:"Show a toast when a chat you left finishes answering. Click it to open that chat.",authors:["Bloom contributors"],tags:["chat"],icon:"check",enabledByDefault:!0,settings:Ea,start(){Sa=[S.on("background",({conversationId:e})=>uh(e)),ge(({id:e})=>e===qa&&Ve(xa))]},stop(){for(let e of Sa)e();Sa=[],Ve(xa)}});var io=`form:has(:is(${u.composerInput})), ${u.oldComposerForm}`,Tr='[class*="ComposerLayoutBody"]',Ca='[class*="ComposerLayoutRoot"]',dh='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',mh=`:is(${io}) ${Tr}, :is(${io}):not(:has(${Tr})) ${Ca}, :is(${io}):not(:has(${Tr})):not(:has(${Ca})) :is(${dh})`,fh='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',ph='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',gh="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))";var hh="composer-fill",du=g({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function bh(){let{opacity:e,blur:t}=du.store;if(e>=100)return"";let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${gh} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important;-webkit-backdrop-filter:blur(${t}px)!important`;return`:is(${fh}), :is(${io}){${o}}:is(${ph}){display:none!important}${mh}{${n}}:is(${io}):has(${Tr}) ${Ca}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${io}) :is(${u.composerInput}){background-color:transparent!important}`}function Ta(){for(let e of document.querySelectorAll(`[data-bloom="${hh}"]`))e.remove()}var mu=f({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:du,styles:bh,start(){Ta()},stop(){Ta()},onSettingsChange(){Ta()}});var yh=1200,vh=8e3,Ah=150,wh=20,fu=6,La="continue where you left",Sh=/message delivery timed out|please try again/i,pu=/waiting for the complete answer/i,gu=g({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:La,placeholder:La}}),Ma=[],Mr=0,Zo=!1,$o=0,so="",Cr="",Ia=0,lo=!1,Xo=!1,kr=!0,ao="",Ba=0,Lr=!1,xh=()=>gu.store.prompt.trim()||La;function hu(){return(J(u.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function bu(){let e=hu();return!e||pu.test(e)||!Sh.test(e)?"":e}function Eh(){let e=hu();return e&&pu.test(e)?e:""}function qh(){let e=Ft()?.querySelectorAll(u.turn),t=e?.[e.length-1];return`${t?.getAttribute("data-turn-key")??""}:${t?.textContent?.length??0}`}function yu(e,t,o){if(o===Mr){if(H().generating||B()!==e||t>=wh){lo=!1,H().generating||(so="");return}Bn(),setTimeout(()=>yu(e,t+1,o),Ah)}}function Th(e){let t=Mr;if(H().generating||B()&&B()!==e){lo=!1,so="";return}ce(e),Lr=!0,Co(()=>{t===Mr&&yu(e,0,t)})}function vu(e){return e===so||$o>=fu||H().generating||B()?!1:(so=e,$o+=1,lo=!0,Th(xh()),!0)}function Ch(){if(Zo||lo||Xo)return;let e=Date.now(),t=bu();if(t){if(ao="",t!==Cr){Cr=t,Ia=e;return}if(e-Ia<yh)return;vu(`${b()??""}:${t}`);return}if(Cr="",!Eh()){kr=!0,ao="";return}if(!kr||!H().generating||B())return;let n=`${b()??""}:${qh()}`;if(n!==ao){ao=n,Ba=e;return}if(e-Ba<vh||$o>=fu)return;let r=Nt();r&&(Xo=!0,r.click())}function ka(){Mr+=1,Zo=!1,$o=0,so="",Cr="",Ia=0,lo=!1,Xo=!1,kr=!0,ao="",Ba=0,Lr=!1}var Au=f({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:gu,start(){ka(),Ma=[S.on("rise",()=>{Zo=!1,so="",lo=!1,Lr&&(Lr=!1,kr=!1,ao="")}),S.on("fall",({outcome:e})=>{if(Xo){Xo=!1,e==="left"?Zo=!0:vu(`${b()??""}:stall`);return}(e==="stopped"||e==="left")&&(Zo=!0),e==="done"&&!bu()&&($o=0)}),S.on("context",({migrated:e})=>{e||ka()}),S.on("tick",Ch)]},stop(){for(let e of Ma)e();Ma=[],ka()}});var Ue=C("bloom-csi-"),Mh=256,kh=160,Ir=1,wu=4,Lh=.1,Ih=.0015,Bh=250;function Oh(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function Ph(e){return new Promise((t,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function Rh(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:pe(t.x,n,1-n),y:pe(t.y,r,1-r)}}function Su(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function Dh(e,t){let o=s("canvas");return o.width=o.height=Mh,Su(o,e,t),o.toDataURL("image/png")}function xu(e){let t=null,o={x:j.store.cropX,y:j.store.cropY,zoom:j.store.cropZoom},n,r=s("canvas",{class:Ue("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=kh*devicePixelRatio;let i=s("div",{class:`bloom-muted ${Ue("status")}`}),a=s("div",{class:Ue("zoom")}),c=s("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(v,q=!0){t&&(o=Rh(t,v),Su(r,t,o),q&&(clearTimeout(n),n=setTimeout(()=>{t&&(j.store.cropX=o.x,j.store.cropY=o.y,j.store.cropZoom=o.zoom,j.store.avatarUrl=Dh(t,o))},Bh)))}function d(){a.replaceChildren(Vn(o.zoom,Ir,wu,Lh,"\xD7",v=>l({...o,zoom:v})))}async function m(v,q){i.textContent="";try{t=await Ph(v),q&&(j.store.avatarSource=v,o={x:.5,y:.5,zoom:Ir}),e.classList.add(Ue("has-image")),d(),l(o,q)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let h=v=>{v?.type.startsWith("image/")&&Oh(v).then(q=>m(q,!0))};c.addEventListener("change",()=>h(c.files?.[0])),r.addEventListener("wheel",v=>{t&&(v.preventDefault(),l({...o,zoom:pe(o.zoom*(1-v.deltaY*Ih),Ir,wu)}),d())},{passive:!1}),r.addEventListener("pointerdown",v=>{if(!t)return;r.setPointerCapture(v.pointerId);let q={...o},ee=r.getBoundingClientRect(),at=te=>{if(!t)return;let Re=Math.max(ee.width/t.naturalWidth,ee.height/t.naturalHeight)*o.zoom;l({...o,x:q.x-(te.clientX-v.clientX)/(t.naturalWidth*Re),y:q.y-(te.clientY-v.clientY)/(t.naturalHeight*Re)})};r.addEventListener("pointermove",at),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",at),{once:!0})});let P=s("div",{class:Ue("cropper"),attrs:{tabindex:"0"},on:{paste:v=>h([...v.clipboardData?.files??[]].find(q=>q.type.startsWith("image/"))),dragover:v=>v.preventDefault(),drop:v=>{v.preventDefault(),h(v.dataTransfer?.files[0])}}},s("div",{class:Ue("stage")},r),s("div",{class:Ue("controls")},Do("",v=>v.trim()&&void m(v.trim(),!0),"https://\u2026 or data:image/\u2026","url"),s("div",{class:Ue("buttons")},N("Choose file",()=>c.click()),N("Reset crop",()=>{l({x:.5,y:.5,zoom:Ir}),d()}),N("Clear",()=>{t=null,e.classList.remove(Ue("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),a.replaceChildren(),j.store.avatarUrl="",j.store.avatarSource=""},"danger")),a,i,c));return e.append(P),j.store.avatarSource&&m(j.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var Eu=`/*
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
`;var _o="data-bloom-csi-avatar",Oa="data-bloom-csi-sized",Mu="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",Nh=32,j=g({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>xu(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),qu=[];function ku(e){e.removeAttribute(_o),e.removeAttribute(Oa)}function Tu(e){return(j.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function Cu(e=[]){if(!Y(e))return;let t=j.store.displayName.trim()||null,o=!!j.store.avatarUrl,n=new Set(t?Tu("name"):[]);for(let i of document.querySelectorAll(Mu))n.has(i)||ut(i,null);for(let i of n)ut(i,t);let r=new Set(o?Tu("avatar"):[]);for(let i of document.querySelectorAll(`[${_o}]`))r.has(i)||ku(i);for(let i of r)i.hasAttribute(_o)||i.setAttribute(_o,""),i.toggleAttribute(Oa,!i.closest('[role="menu"]'))}function Uh(){let e=j.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${j.store.avatarSize}px}:is(${u.rail}, ${u.oldRail}) [${Oa}]{--bloom-csi-size:${Nh}px}`:""}var Lu=f({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:j,styles:()=>`${Uh()}
${Eu}`,start(){qu=[Me(),M(Cu)]},stop(){for(let e of qu)e();for(let e of document.querySelectorAll(`[${_o}]`))ku(e);for(let e of document.querySelectorAll(Mu))ut(e,null)},onSettingsChange(){Cu()}});var co=C("bloom-greeting-"),Iu=30,Bu=100;function Ou(e){let t=-1,o=s("textarea",{class:`bloom-input ${co("input")}`,attrs:{maxlength:String(Bu),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=N("Add",i),r=s("div",{class:co("list")});function i(){let l=o.value.trim().slice(0,Bu);if(!l)return;let d=[...O.store.greetings];t>=0?d[t]=l:d.length<Iu&&d.push(l),O.store.greetings=d,t=-1,o.value="",a()}function a(){let{greetings:l}=O.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&l.length>=Iu,r.replaceChildren(...l.length?l.map((d,m)=>s("div",{class:co("row",m===t?"row-editing":"row-idle")},s("div",{class:co("text"),text:d}),U("edit","Edit",()=>{t=m,o.value=d,o.focus(),a()}),U("trash","Delete",()=>{O.store.greetings=l.filter((h,P)=>P!==m),t===m&&(t=-1),a()}))):[s("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),e.append(s("div",{class:co("editor")},r,s("div",{class:co("form")},o,n))),a();let c=Ht((l,d)=>l==="GreetingCustomizer"&&d==="greetings"&&a());return()=>{c(),e.replaceChildren()}}var Pu=`/*
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
`;var Or="data-bloom-greeting",Gh=1e3,Yh=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],O=g({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>Ou(e)},greetings:{type:"custom",default:Yh},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),Br,Ru=[],Pa,nn=()=>Ut()&&!Te(),Kh=e=>e.replaceAll(/\s*\n\s*/g," ").trim(),Hu=()=>O.store.greetings.filter(e=>typeof e=="string"&&e.trim());function rn(){let e=Hu();if(e.length)if(O.store.order==="random"&&e.length>1){let t=O.store.lastRandom;for(;t===O.store.lastRandom;)t=Math.floor(Math.random()*e.length);O.store.lastRandom=t,O.store.index=t}else O.store.index=(O.store.index+1)%e.length}function Qh(){return nn()?J(u.homeHeading):null}function en(){for(let e of document.querySelectorAll(`[${Or}]`))e.removeAttribute(Or),ut(e,null)}function tn(){for(let e of document.querySelectorAll("[data-bloom-placeholder]"))e.removeAttribute("data-bloom-placeholder")}function Du(e){let t=Ae(),o=Kh(e);if(!t||!o||B(t)){tn();return}t.getAttribute("data-bloom-placeholder")!==o&&t.setAttribute("data-bloom-placeholder",o)}function on(){let e=Hu(),t=Un(),o=nn();if(!e.length||!t&&!o){en(),tn();return}if(t){en(),Du(e[0]??"");return}let n=Qh();n?((O.store.index<0||O.store.index>=e.length)&&rn(),n.setAttribute(Or,""),ut(n,e[Math.max(0,O.store.index)%e.length]??"")):en(),O.store.heroOnlyOutsideProject?tn():Du(e[Math.max(0,O.store.index)%e.length]??"")}function Ra(){clearInterval(Br),Br=void 0,O.store.mode==="interval"&&nn()&&(Br=setInterval(()=>{rn(),on()},O.store.intervalSec*Gh))}function zh(e){O.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${Or}]`)||getSelection()?.toString()||(rn(),on())}function jh(){nn()&&O.store.mode==="refresh"&&rn(),Ra(),on()}var Nu=f({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:O,styles:Pu,start(){en(),tn(),Pa=new AbortController,document.addEventListener("click",zh,{signal:Pa.signal}),nn()&&O.store.mode==="refresh"&&rn(),Ra(),Ru=[M(e=>Y(e)&&on()),ge(jh)]},stop(){Pa?.abort();for(let e of Ru)e();clearInterval(Br),en(),tn()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&Ra(),on()}});var an=C("bloom-history-"),Da=10,Wh=3e3;function Ha(e,t){let o="",n=0,r=new Set,i=s("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),a=s("div",{class:an("list")}),c=s("div",{class:an("pager")}),l,d=N("Clear all",()=>{if(!l){d.textContent="Click again to clear",l=setTimeout(()=>{l=void 0,d.textContent="Clear all"},Wh);return}clearTimeout(l),l=void 0,d.textContent="Clear all",sn([])},"danger");function m(){let P=[...Et.store.entries].toReversed(),v=o.trim().toLowerCase(),q=v?P.filter(fe=>fe.toLowerCase().includes(v)):P,ee=Math.max(1,Math.ceil(q.length/Da));n=Math.min(n,ee-1);let at=q.slice(n*Da,(n+1)*Da).map(fe=>s("div",{class:an("row")},s("button",{class:an("text",r.has(fe)?"text-open":"text-closed"),text:fe,title:r.has(fe)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{r.delete(fe)||r.add(fe),m()}}}),t&&U("edit","Use",()=>t(fe)),U("copy","Copy",()=>void vn(fe)),U("trash","Delete",()=>sn(Et.store.entries.filter(Xr=>Xr!==fe)))));a.replaceChildren(...at.length?at:[s("div",{class:"bloom-muted",text:v?"No matching prompts.":"No saved prompts yet."})]),c.replaceChildren(s("span",{class:"bloom-muted",text:`${q.length} ${v?"matching":"saved"} \xB7 page ${n+1} of ${ee}`}),N("Previous",()=>{n--,m()}),N("Next",()=>{n++,m()}),d);let[te,Re]=c.querySelectorAll("button");te.disabled=n===0,Re.disabled=n>=ee-1,d.disabled=!P.length}i.addEventListener("input",()=>{o=i.value,n=0,m()}),e.append(s("div",{class:an("manager")},i,a,c)),m();let h=Ht((P,v)=>P==="InputHistory"&&v==="entries"&&m());return()=>{h(),clearTimeout(l),e.replaceChildren()}}var Uu=`/*
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
`;var Fe=C("bloom-history-"),Jh=2e3,Et=g({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>Ha(e)},entries:{type:"custom",default:[]}}),F=null,Na={text:"",at:0},Le=null,et=null,Ua,mo=()=>Et.store.entries.filter(e=>typeof e=="string");function sn(e){Et.store.entries=e.slice(-Et.store.maxEntries)}function Fa(e){let t=e.trim();if(!t)return;let o=Date.now();t===Na.text&&o-Na.at<Jh||(Na={text:t,at:o},sn([...mo().filter(n=>n!==t),t]))}function Fu(e){e.preventDefault()}function Zh(){let e=s("button",{class:Fe("hud-count"),attrs:{type:"button"},on:{mousedown:Fu,click:eb}}),t=s("button",{class:Fe("hud-x"),text:"\xD7",attrs:{type:"button","aria-label":"Exit history"},on:{mousedown:Fu,click:$h}});return s("div",{class:`bloom-root ${Fe("hud")}`,attrs:{"data-bloom":"history-hud",role:"group","aria-live":"polite","aria-label":"Input history"}},e,t)}function Gu(e,t){let o=Ae();if(!o||et)return;Le??=Zh();let n=`${e+1} / ${t}`,r=Le.querySelector(`.${Fe("hud-count")}`);r?.replaceChildren(n),r?.setAttribute("aria-label",`Show input history (${n})`);let i=(o.closest("form")??o).getBoundingClientRect();Le.style.left=`${i.left+i.width/2}px`,Le.style.top=`${i.top}px`,Le.isConnected||document.body.append(Le)}function uo(){F=null,Le?.remove()}function $h(){F&&ce(F.draft),uo(),Ae()?.focus()}function Yu(e){let t=mo();if(!F)return;let o=t[e];F.index=e,F.shown=o,ce(o),Gu(t.length-1-e,t.length)}function Xh(e){let t=mo();if(!t.length)return!1;if(!F){if(e===1)return!1;F={index:t.length,draft:B(),shown:""}}let o=F.index+e;return o<0?!0:o>=t.length?(ce(F.draft),uo(),!0):(Yu(o),!0)}function _h(e){let t=mo().indexOf(e);ln(),!(t<0)&&(F??={index:t,draft:B(),shown:""},Yu(t),Ae()?.focus())}function ln(){if(!et)return;et.release(),et.controller.abort(),et.root.remove(),et=null;let e=mo();F&&e[F.index]===F.shown?Gu(e.length-1-F.index,e.length):F=null}function eb(){if(et)return;Le?.remove();let e=s("div",{class:Fe("dialog-body")}),t=s("div",{class:`bloom-root ${Fe("backdrop")}`,attrs:{"data-bloom":"history-dialog"},on:{click:n=>n.target===n.currentTarget&&ln()}},s("div",{class:Fe("dialog"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Input history"}},s("div",{class:Fe("dialog-header")},s("h2",{class:Fe("dialog-title"),text:"Input history"}),U("close","Close",ln)),e));t.addEventListener("keydown",n=>n.stopPropagation());let o=new AbortController;document.addEventListener("keydown",n=>{n.key==="Escape"&&(n.preventDefault(),n.stopPropagation(),ln())},{capture:!0,signal:o.signal}),he(t),et={root:t,release:Ha(e,_h),controller:o},e.querySelector("input")?.focus()}function Ku(e){return mt(e)?e:e instanceof HTMLElement?e.closest(u.composerInput):null}function tb(){if(Ae()?.closest("[data-chatgpt-composer], [data-composer-input], form")?.querySelector('[aria-expanded="true"]'))return!0;for(let t of document.querySelectorAll('[role="listbox"], [role="menu"], [data-radix-popper-content-wrapper], [cmdk-root], [cmdk-list]')){if(!(t instanceof HTMLElement)||t.closest("[data-bloom]"))continue;let o=getComputedStyle(t);if(!(o.display==="none"||o.visibility==="hidden"))return!0}return!1}function ob(e){if(e.isComposing||e.key==="Process"||e.keyCode===229)return;let t=Ku(e.target);if(!t)return;if(e.key==="Enter"&&!e.shiftKey){Fa(B(t)),uo();return}if(e.key==="Escape"&&F){ce(F.draft),uo(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey||tb())return;let o=_s(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!F||Xh(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function nb(e){F&&Ku(e.target)&&B()!==F.shown.trim()&&uo()}function rb(e){e.target instanceof Element&&e.target.closest(u.sendButton)&&Fa(B())}var Qu=f({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before. Click the counter to browse history.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:Et,styles:Uu,start(){for(let t of document.querySelectorAll('[data-bloom="history-hud"], [data-bloom="history-dialog"]'))t.remove();Le=null,Ua=new AbortController;let{signal:e}=Ua;document.addEventListener("keydown",ob,{capture:!0,signal:e}),document.addEventListener("input",nb,{capture:!0,signal:e}),document.addEventListener("click",rb,{capture:!0,signal:e}),document.addEventListener("submit",()=>Fa(B()),{capture:!0,signal:e})},stop(){Ua?.abort(),ln(),uo();for(let e of document.querySelectorAll('[data-bloom="history-hud"]'))e.remove();Le=null},onSettingsChange(e){e==="maxEntries"&&sn(mo())}});var zu=`/*
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
`;var ab=1500,sb=5e3,lb=2e3,$u=[{label:"UTC",value:"UTC"},{label:"\u7F8E\u56FD\u4E1C\u90E8",value:"America/New_York"},{label:"\u7F8E\u56FD\u4E2D\u90E8",value:"America/Chicago"},{label:"\u7F8E\u56FD\u5C71\u5730",value:"America/Denver"},{label:"\u7F8E\u56FD\u897F\u90E8",value:"America/Los_Angeles"},{label:"\u65E5\u672C",value:"Asia/Tokyo"},{label:"\u53F0\u6E7E",value:"Asia/Taipei"}],fo=g({sourceTimeZone:{type:"select",description:"Zone the stored clock was written in. Leave UTC for ChatGPT create_time. Pick the same zone as the Shit GPT plugin only when that clock is a wall time in that zone; it is then shown in the system timezone.",options:$u,default:"UTC"},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),Rr=new Map,Ga=new Set,Xu=0,Dr,ju=[];function _u(e,t){Rr.get(e)!==t&&(Rr.set(e,t),clearTimeout(Dr),Dr=setTimeout(ed,lb))}function ed(){let e={...fo.store.stamps,...Object.fromEntries(Rr)};fo.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,ab))}function cb(e){let t=we(b())?.times;for(let o=e.length-1;o>=0;o--){let n=Rr.get(e[o])??t?.get(e[o])??fo.store.stamps[e[o]];if(n)return n}return null}var ub=()=>H().generating||Date.now()-Xu<sb;function td(){return Intl.DateTimeFormat().resolvedOptions().timeZone}function od(){let e=fo.store.sourceTimeZone;if(!e||e==="UTC")return"UTC";try{return Intl.DateTimeFormat(void 0,{timeZone:e}),e}catch{return"UTC"}}function nd(e,t){let o={};for(let n of new Intl.DateTimeFormat("en-US",{timeZone:t,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(e)))o[n.type]=n.value;return{y:+o.year,m:+o.month,d:+o.day,h:+o.hour%24,mi:+o.minute,s:+o.second}}function rd(e){return Date.UTC(e.y,e.m-1,e.d,e.h,e.mi,e.s)}function Wu(e,t){let o=e;for(let n=0;n<4;n++){let r=e-rd(nd(o,t));if(r===0)return o;o+=r}return o}function db(e,t){if(t==="UTC")return e;let o=(e%1e3+1e3)%1e3,n=e-o,r=new Date(n),i=Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),r.getUTCHours(),r.getUTCMinutes(),r.getUTCSeconds()),a=Wu(i,t),c=3600*1e3,l=Number.POSITIVE_INFINITY;for(let d of[-c,0,c]){let m=a+d;rd(nd(m,t))===i&&m<l&&(l=m)}return l!==Number.POSITIVE_INFINITY?l+o:Wu(i+c,t)+o}function mb(e,t){let o=od();return t||o==="UTC"?e:db(e,o)}function Vu(e,t){return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(e)}function fb(e){let t=td(),o=Date.now(),n={hour:"2-digit",minute:"2-digit",timeZone:t};if(Vu(e,t)===Vu(o,t))return new Intl.DateTimeFormat(void 0,n).format(e);let r=a=>new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric"}).format(a),i=r(e)===r(o)?{}:{year:"numeric"};return new Intl.DateTimeFormat(void 0,{...i,month:"short",day:"numeric",...n}).format(e)}function pb(e,t){let o=new Date(t).toLocaleString(void 0,{timeZone:td()}),n=od();if(n==="UTC"||t===e)return o;let r=new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"UTC"}).format(e);return`${$u.find(a=>a.value===n)?.label??n} ${r} \u2192 ${o}`}function id(e){let t=Gt(e)??e.getAttribute("data-message-author-role")??e.closest(u.turn)?.getAttribute("data-turn")??e.querySelector(u.authorRole)?.getAttribute("data-message-author-role");if(yi(t))return t;let o=Io(e).at(-1);return we(b())?.chain.find(n=>n.id===o)?.role??null}var Ju='[class*="group/activity-header"]';function gb(e){let t=e.parentElement;if(!t)return null;let o=e.closest(u.turn);return o&&t!==o&&!o.contains(t)?null:t}function hb(e){let t=e;for(let o=0;o<8&&t;o++){let n=gb(t);if(!n)return null;let r=[...n.children],i=r.indexOf(t);for(let a=i-1;a>=0;a--){let c=r[a],l=c.matches(Ju)?c:c.querySelector(Ju);if(l)return l;if(c.matches(u.searchUnit)||c.querySelector(u.searchUnit))return null}if(n===t.closest(u.turn))return null;t=n}return null}function bb(e){let t=e.parentElement;for(let o=0;o<4&&t;o++){if(t.classList.contains("flex-col"))return t;t=t.parentElement}return e.parentElement??e}function ad(e,t){if(t==="assistant"){let o=hb(e);if(o)return bb(o)}return e}function yb(e,t){let o=Yt();for(let n=o.length-1;n>=0;n--){let r=o[n];if(!(r!==e&&(id(r)!=="assistant"||ad(r,"assistant")!==t)))return r===e}return!0}function Zu(e){return e.querySelector(':scope > time[data-bloom="timestamp"]')}function vb(e){let t=Io(e);if(!t.length||!Se(e)||e.querySelector("time:not([data-bloom])"))return;let o=id(e),n=ad(e,o);if(n!==e&&!yb(e,n)){Zu(e)?.remove();return}let r=cb(t),i=!1;if(!r&&ub()){r=Date.now();let m=t.at(-1);Ga.add(m),_u(m,r),i=!0}else r&&Ga.has(t.at(-1))&&(i=!0);let a=n.querySelector('time[data-bloom="timestamp"]')??Zu(e);if(!r||fo.store.hideOwnMessages&&o==="user"){a?.remove();return}let c=mb(r,i),l=fb(c);if(a?.textContent===l&&a.parentElement===n&&a===n.firstElementChild)return;let d=s("time",{class:`bloom-timestamp bloom-timestamp-${o??"assistant"}`,text:l,title:pb(r,c),attrs:{"data-bloom":"timestamp",datetime:new Date(c).toISOString()}});a&&a.replaceWith(d),(d.parentElement!==n||d!==n.firstElementChild)&&n.prepend(d)}var Pr=Ke(()=>{for(let e of Yt())vb(e)}),sd=f({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:fo,styles:zu,start(){ju=[M(e=>Y(e)&&Pr()),V.on("conversation",Pr),V.on("message-time",({messageId:e,time:t})=>{Ga.delete(e),_u(e,t),Pr()}),S.on("fall",()=>{Xu=Date.now()})]},stop(){for(let e of ju)e();Dr&&(clearTimeout(Dr),ed());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();Pr()}}});var Ab=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])','[data-chatgpt-composer] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-composer-input] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-codex-composer-root] button[aria-label^="Dictat" i], [data-composer-placement] button[aria-label^="Dictat" i], [class*="ComposerLayout"] button[aria-label^="Dictat" i]'],wb=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],ld=g({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),cd=f({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:ld,styles:()=>Ye([...Ab,...ld.store.hideDictationSettings?wb:[]])});var qt="data-bloom-share",Sb=/^\/g\/g-p-/,xb=/^(?:share|分享)$/i,Eb=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],qb=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${qt}="project"]`],Ya=g({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),Hr,Ka=!1;function Tb(e){if(!Y(e))return;let t=Sb.test(location.pathname)&&!b();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${qt}]`))!t||!xb.test(y(o.textContent??""))?o.removeAttribute(qt):o.hasAttribute(qt)||o.setAttribute(qt,"project")}var ud=f({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:Ya,styles:()=>Ye([...Ya.store.hideShareChat?Eb:[],...Ya.store.hideShareProject?qb:[]]),start(){Ka=!0,ft().then(()=>{Ka&&!Hr&&(Hr=M(Tb))})},stop(){Ka=!1,Hr?.(),Hr=void 0;for(let e of document.querySelectorAll(`[${qt}]`))e.removeAttribute(qt)}});var dd='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',Cb='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',Mb="[data-bloom-profile-plan]",md="visibility:hidden!important;user-select:none!important",pd=g({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function kb(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=pd.store,r=[];return e&&r.push(n?`:is(${dd}){display:none!important}`:`:is(${dd}){${md}}`),t&&r.push(`:is(${Cb}){${md}}`),e&&o&&r.push(`${Mb}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var fd,gd=f({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:pd,styles:kb,start(){fd=Me()},stop(){fd?.()}});var Lb="model-switcher-dropdown-button",Qa="data-selected-reasoning-effort",Nr="ArrowLeft",hd=e=>e.startsWith("model-switcher-")&&e!==Lb?e.slice(15):"",cn=(e,t)=>e.id===t.id||!!e.label&&e.label===t.label;function bd(){let e=$();return(e&&J(u.modelTrigger,e))??J(u.modelTrigger)}function Ie(){let e=bd();if(!e)return null;let t=e.getAttribute("aria-expanded")==="true",o=e.getAttribute(Qa),n=o&&t?"":y(e.innerText),r=o||hd(e.getAttribute("data-testid")??"")||n;return r?{id:r,label:n||r}:null}function Ib(e){return[...document.querySelectorAll(u.modelItem)].find(t=>{let o=hd(t.getAttribute("data-testid")??""),n=y(t.textContent??"");return o===e.id||n===e.label||n===e.id})??null}function Bb(e){let t=e.querySelector("[role=slider]"),o=Number(t?.getAttribute("aria-valuenow")),n=Number(t?.getAttribute("aria-valuemax"));o<=0?Nr="ArrowRight":o>=n&&(Nr="ArrowLeft"),e.focus(),e.dispatchEvent(new KeyboardEvent("keydown",{key:Nr,code:Nr,bubbles:!0,cancelable:!0}))}function za(e){let t=Ie(),o=bd();if(t&&cn(t,e))return o?.hasAttribute(Qa)&&o.getAttribute("aria-expanded")==="true"&&document.querySelector("[role=menu]")?.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),!0;if(o?.hasAttribute(Qa)){let r=document.querySelector(u.effortSlider);return r?Bb(r):o.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,button:0,pointerType:"mouse",isPrimary:!0})),!1}let n=Ib(e);if(n){n.click();let r=Ie();return!!r&&cn(r,e)}return o?.getAttribute("aria-expanded")!=="true"&&o?.click(),!1}var yd=`/*
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
`;var W=C("bloom-queue-"),Pb=6,Rb=8,ie=null,un="",po=!1,go=!1;function ja(e,t,o){let n=U(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute(ue),n.addEventListener("mouseenter",()=>vd(t)),n.addEventListener("mouseleave",()=>vd("")),n}function vd(e){let t=ie?.querySelector(`.${W("tip")}`);t&&(t.textContent=e)}function Db(e,t,o,n){go=!0;let r=s("textarea",{class:`bloom-input ${W("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=new AbortController,a=c=>{i.abort(),go=!1,un="",c?n.edit(t,r.value):r.replaceWith(s("div",{class:W("text"),text:o}))};addEventListener("keydown",c=>{if(!(c.target!==r||c.isComposing)){if(c.key==="Enter"&&!c.shiftKey)a(!0);else if(c.key==="Escape")a(!1);else return;c.preventDefault(),c.stopImmediatePropagation()}},{capture:!0,signal:i.signal}),r.addEventListener("keydown",c=>c.stopPropagation(),{signal:i.signal}),r.addEventListener("blur",()=>a(!0),{signal:i.signal}),e.querySelector(`.${W("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function Hb(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,a=l=>{!i&&Math.abs(l.clientY-n.clientY)<Pb||(i||(i=go=!0,e.classList.add(W("dragging"))),e.style.transform=`translateY(${l.clientY-n.clientY}px)`)},c=l=>{if(removeEventListener("pointermove",a),!i)return;go=!1,un="";let m=[...r.children].filter(h=>h!==e).filter(h=>h.getBoundingClientRect().top+h.getBoundingClientRect().height/2<l.clientY).length;o.move(t,m)};addEventListener("pointermove",a),addEventListener("pointerup",c,{once:!0})})}function Nb(e,t,o,n){let r=s("li",{class:W("row")},s("div",{class:W("text"),text:e.text}),n&&e.label?s("span",{class:W("model"),title:e.label,text:e.label}):null,s("div",{class:W("actions")},ja("trash","Remove from queue",()=>o.remove(t)),ja("edit","Edit",()=>Db(r,t,e.text,o)),ja("send","Send now",()=>o.sendNow(t))));return Hb(r,t,o),r}function Ub(e){if(!ie)return;let t=e.getBoundingClientRect();ie.style.left=`${t.left}px`,ie.style.width=`${t.width}px`,ie.style.bottom=`${innerHeight-t.top+Rb}px`}function Wa(){ie?.remove(),ie=null,un="",go=!1}function Tt(e,t,o=!0){let n=$();if(!e.length||!ct(n)){Wa();return}ie||(ie=s("div",{class:`bloom-root ${W("tray")}`,attrs:{"data-bloom":"queue"}},s("div",{class:W("header")},s("button",{class:W("toggle"),attrs:{type:"button","aria-expanded":String(!po)},on:{click:a=>{po=!po,ie?.classList.toggle(W("collapsed"),po),a.currentTarget.setAttribute("aria-expanded",String(!po))}}},s("span",{class:W("count")}),T("chevron")),s("span",{class:W("tip")})),s("ol",{class:W("list")})),ie.classList.toggle(W("collapsed"),po),document.body.append(ie)),Ub(n);let r=JSON.stringify([o,...e.map(a=>[a.text,o?a.label:""])]);if(go||r===un)return;un=r;let i=ie.querySelector(`.${W("count")}`);i&&(i.textContent=yn(e.length,"Queued message")),ie.querySelector(`.${W("list")}`)?.replaceChildren(...e.map((a,c)=>Nb(a,c,t,o)))}var Yr=new E("PromptQueue"),Fb=8,mn=150,Ur=20,Gb=300,Be="BloomPromptQueue",Ja="BloomPromptQueueClaim",Ad="BloomPromptQueueTab",Yb=4e3,_=g({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1},showQueueMode:{type:"boolean",description:"Show the model that was selected when each message was queued.",default:!0},stickyOnNavigate:{type:"boolean",description:"Keep the selected model when switching chats.",default:!0},persistAcrossRefresh:{type:"boolean",description:"Restore unsent queued messages in this browser after a refresh. Other tabs show the same queue; only one of them sends it.",default:!0}}),Oe=new Map,dn=!1,Ct=null,ho,wd=[],tt=null,kt=!1,fn,Fr="draft",pn=()=>b()??Fr,ae=()=>Oe.get(pn())??[],Za=e=>({id:e.model||e.label,label:e.label||e.model});function Kb(e){return typeof e=="string"?e.trim()?{text:e,model:"",label:""}:null:!L(e)||typeof e.text!="string"||!e.text.trim()?null:{text:e.text,model:typeof e.model=="string"?e.model:"",label:typeof e.label=="string"?e.label:""}}function $a(){let e=sessionStorage.getItem(Ad);if(e)return e;let t=globalThis.crypto?.randomUUID?.()??`${Date.now()}-${Math.random()}`;return sessionStorage.setItem(Ad,t),t}function Ed(){let e=qe(localStorage.getItem(Ja)??"");return!L(e)||typeof e.tab!="string"||typeof e.at!="number"||typeof e.key!="string"?null:{tab:e.tab,at:e.at,key:e.key}}function qd(){let e={tab:$a(),at:Date.now(),key:pn()};try{localStorage.setItem(Ja,JSON.stringify(e))}catch(t){Yr.warn("Could not claim the queue",t)}}function Qb(){let e=Ed();if(e?.tab===$a())try{localStorage.setItem(Ja,JSON.stringify({...e,at:Date.now()}))}catch(t){Yr.warn("Could not refresh the queue claim",t)}}function zb(){let e=Ed();return!e||e.tab===$a()||e.key!==pn()?!0:Date.now()-e.at<=Yb?!1:(qd(),!0)}function jb(){return Object.fromEntries([...Oe].filter(([e])=>e!==Fr))}function Va(e){let t=typeof e=="string"?qe(e):e;if(!L(t))return!1;let o=!1;for(let[n,r]of Object.entries(t)){if(!Array.isArray(r))continue;let i=r.map(Kb).filter(a=>a!=null);i.length&&(Oe.set(n,i),o=!0)}return o}function Wb(){if(!_.store.persistAcrossRefresh){sessionStorage.removeItem(Be),ti(Be);return}Va(sessionStorage.getItem(Be))||Va(Pt(Be))&&Gr()}function Gr(){try{if(!_.store.persistAcrossRefresh){sessionStorage.removeItem(Be),ti(Be);return}let e=jb();sessionStorage.setItem(Be,JSON.stringify(e)),Rt(Be,e)}catch(e){Yr.warn("Could not save the queue",e)}}function Vb(e){if(!(e.key!==Be||!_.store.persistAcrossRefresh||e.newValue==null)){Oe.clear(),Va(e.newValue);try{sessionStorage.setItem(Be,e.newValue)}catch(t){Yr.warn("Could not mirror the queue",t)}Tt(ae(),bo,_.store.showQueueMode)}}function Mt(e){e.length?Oe.set(pn(),e):Oe.delete(pn()),qd(),Gr(),Tt(ae(),bo,_.store.showQueueMode)}function Jb(e){if(!e.model&&!e.label)return!0;let t=Ie();return t?cn(t,Za(e)):!0}function Td(e,t=0){t>=Ur||H().generating||B()!==e||(Bn(),setTimeout(()=>Td(e,t+1),mn))}function Zb(e,t){let o=e??tt;if(!o||!t.model&&!t.label||cn(o,Za(t))){kt=!1;return}_.store.stickyOnNavigate&&(tt=o),clearTimeout(fn),fn=setTimeout(()=>Md(o),mn)}function gn(e,t=0,o=Ie()){if(H().generating||B()){t<Ur&&setTimeout(()=>gn(e,t+1,o),mn);return}if(!Jb(e)&&t<Ur){kt=!0,za(Za(e)),setTimeout(()=>gn(e,t+1,o),mn);return}ce(e.text),Co(()=>Td(e.text)),Zb(o,e)}function Sd(){if(Ct!=null){let o=Ct;Ct=null,gn(o);return}if(!dn||H().generating||B())return;if(!zb()){dn=!1;return}let[e,...t]=ae();e!=null&&(dn=!1,Mt(t),gn(e))}function Cd(e){let t=ae(),o=t[e];if(o!=null){if(Mt(t.filter((n,r)=>r!==e)),!H().generating){gn(o);return}Ct=o,Nt()?.click()}}var bo={remove:e=>Mt(ae().filter((t,o)=>o!==e)),edit:(e,t)=>Mt(t.trim()?ae().map((o,n)=>n===e?{...o,text:t}:o):ae().filter((o,n)=>n!==e)),sendNow:Cd,move(e,t){let o=[...ae()],[n]=o.splice(e,1);n&&(o.splice(t,0,n),Mt(o))}};function $b(e){let t=Ie(),o={text:e,model:t?.id??"",label:t?.label??""},n=ae();return _.store.replacePending&&n.length?(Mt([...n.slice(0,-1),o]),!0):n.length>=Fb?!1:(Mt([...n,o]),!0)}function Xb(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!mt(e.target)||!H().generating)return;let t=B(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;let o=Ie();ce(""),Ct={text:t,model:o?.id??"",label:o?.label??""},Nt()?.click();return}if(!t){ae().length&&Cd(0);return}$b(t)&&ce("")}function _b(){if(kt||!_.store.stickyOnNavigate)return;let e=Ie();e&&(tt=e)}function Md(e){kt=!0;let t=0,o=()=>{if(za(e)||t>=Ur){kt=!1;return}t++,fn=setTimeout(o,mn)};clearTimeout(fn),o()}function ey(){_.store.stickyOnNavigate&&tt&&Md(tt)}function xd(e){let{target:t}=e;!(t instanceof Element)||kt||t.closest(`${u.modelTrigger}, ${u.modelItem}`)&&setTimeout(_b,Gb)}var kd=f({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:_,styles:yd,start(){ho=new AbortController,Wb(),tt=Ie(),document.addEventListener("keydown",Xb,{capture:!0,signal:ho.signal}),document.addEventListener("pointerup",xd,{signal:ho.signal}),document.addEventListener("keyup",xd,{signal:ho.signal}),wd=[S.on("fall",({outcome:e})=>{dn=e==="done",e==="left"&&(Ct=null),Sd()}),S.on("context",({prevId:e,id:t,migrated:o})=>{let n=Oe.get(Fr);Oe.delete(Fr),o&&!e&&t&&n&&Oe.set(t,n),o||(dn=!1,ey()),Gr(),Tt(ae(),bo,_.store.showQueueMode)}),S.on("tick",()=>{Qb(),Sd(),Tt(ae(),bo,_.store.showQueueMode)})],addEventListener("storage",Vb,{signal:ho.signal}),Tt(ae(),bo,_.store.showQueueMode)},stop(){ho?.abort(),clearTimeout(fn);for(let e of wd)e();Wa(),Oe.clear(),Ct=null,tt=null,kt=!1},onSettingsChange(e){e==="persistAcrossRefresh"&&Gr(),e==="stickyOnNavigate"&&_.store.stickyOnNavigate&&(tt=Ie()),Tt(ae(),bo,_.store.showQueueMode)}});var Ld=`/*
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
`;var me=C("bloom-recent-"),Pe="home",oy=50,Id=140,ny=new Set(["Backquote"]),ry=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),w=g({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),ot=null,ve=[],xe=0,Xa,Bd=[],Qr=()=>Te()?null:b()??(Ut()?Pe:null);function Od(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function Rd(e){let t=xt(e);t&&w.store.titles[e]!==t&&(w.store.titles={...w.store.titles,[e]:t});let o=zl(location.href);o&&e===b()&&w.store.projects[e]!==o&&(w.store.projects={...w.store.projects,[e]:o})}function Pd(e){if(!e)return;let t=[e,...w.store.visits.filter(n=>n!==e)].slice(0,oy),o=new Set(t);w.store.visits=t,Object.keys(w.store.previews).some(n=>!o.has(n))&&(w.store.previews=Od(w.store.previews,o)),Object.keys(w.store.titles).some(n=>!o.has(n))&&(w.store.titles=Od(w.store.titles,o)),e!==Pe&&Rd(e)}function iy(e){if(!w.store.visits.includes(e))return;let{[e]:t,...o}=w.store.titles,{[e]:n,...r}=w.store.previews,{[e]:i,...a}=w.store.projects;w.store.visits=w.store.visits.filter(c=>c!==e),w.store.titles=o,w.store.previews=r,w.store.projects=a}function Kr(e){if(!e||!w.store.visits.includes(e))return;let t={},o=we(e)?.chain??[];for(let r of o)t[r.role]=Ee(Gn(r),Id);if(e===b())for(let r of je()){let i=Kt(r);i&&(t[r.role]=Ee(i,Id))}let n=w.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(w.store.previews={...w.store.previews,[e]:t})}function ay(){let e=Number(w.store.maxRecent);return w.store.visits.filter(t=>t!==Pe||w.store.includeHome).slice(0,e)}function Dd(e){if(vo(),e===Qr())return;let t=e===Pe?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"], [data-sidebar-destination="builtin:home"]'):gt(e)[0];t?t.click():location.assign(e===Pe?"/":`/c/${e}`)}function sy(e){let t=e===Pe?null:w.store.previews[e],o=t&&["user","assistant"].filter(n=>t[n]).map(n=>s("span",{class:me("preview"),attrs:{"data-role":n},text:t[n]}));return s("span",{class:me("thumb"),attrs:{"aria-hidden":"true"}},o?.length?s("span",{class:me("page")},...o):s("span",{class:me("fallback")},T(e===Pe?"plus":"bloom")))}function ly(e,t){let o=e===Pe?"New chat":w.store.titles[e]??xt(e)??"Untitled chat",n=e===Pe?null:w.store.projects[e];return s("button",{class:me("item"),attrs:{type:"button",role:"option","aria-selected":String(t===xe),"aria-label":n?`${o}, ${n}`:o},on:{click:()=>Dd(e),pointerenter:()=>t!==xe&&yo(t)}},sy(e),s("span",{class:me("meta")},s("span",{class:`${me("title")} bloom-truncate`,text:o}),n&&s("span",{class:me("project")},T("folder"),s("span",{class:"bloom-truncate",text:n}))))}function Hd(){ve.length?Dd(ve[xe]):vo()}function yo(e){ve.length&&(xe=(e+ve.length)%ve.length,ot?.querySelectorAll(`.${me("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===xe))))}function cy(){Kr(b());let e=Qr();ve=ay(),e&&(ve=[e,...ve.filter(o=>o!==e)].slice(0,Number(w.store.maxRecent))),xe=ve.length>1?1:0;let t=ve.length?s("div",{class:me("list"),attrs:{role:"listbox","aria-label":"Recent chats"}},...ve.map(ly)):s("div",{class:me("empty"),text:"Open a few chats, then hold Ctrl+` to switch."});t.style.setProperty("--bloom-recent-count",String(ve.length)),ot=s("div",{class:`bloom-root ${me("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:o=>o.target===o.currentTarget&&vo()}},s("div",{class:me("panel")},t)),he(ot)}function vo(){ot?.remove(),ot=null}var uy=e=>ny.has(e.code)||ry.has(e.key);function dy(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&uy(e)){e.preventDefault(),e.stopPropagation(),ot?yo(xe+(e.shiftKey?-1:1)):cy();return}if(!ot)return;let o={Escape:vo,Enter:Hd,ArrowRight:()=>yo(xe+1),ArrowDown:()=>yo(xe+1),ArrowLeft:()=>yo(xe-1),ArrowUp:()=>yo(xe-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function my(e){ot&&e.key==="Control"&&Hd()}var Nd=f({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:w,styles:Ld,start(){Xa=new AbortController;let{signal:e}=Xa;addEventListener("keydown",dy,{capture:!0,signal:e}),addEventListener("keyup",my,{capture:!0,signal:e}),addEventListener("blur",vo,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&Kr(b()),{signal:e}),Bd=[ge(({prevId:i})=>{Kr(i),Pd(Qr())}),V.on("conversation",({id:i})=>{w.store.visits.includes(i)&&Rd(i),Kr(i)}),V.on("conversation-missing",({id:i})=>iy(i))];let{visits:t,titles:o,previews:n}=w.store,r=t.filter(i=>i!==Pe&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(w.store.visits=t.filter(i=>!r.includes(i))),Pd(Qr())},stop(){Xa?.abort();for(let e of Bd)e();vo()}});var _a="data:audio/mpeg;base64,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";var Ud=new E("ResponseNotification"),fy=.5,Fd="BloomNoticeClaim",py=3e4,hn=g({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:e=>(e.append(N("Preview",zd)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),Gd=null,es=new Map,Yd=[],ts,gy=e=>Uint8Array.from(atob(e.slice(e.indexOf(",")+1)),t=>t.charCodeAt(0)).buffer;function hy(e,t){let o=es.get(t);return o||(o=(t.startsWith("data:")?Promise.resolve(gy(t)):An(t)).then(n=>e.decodeAudioData(n)),o.catch(()=>es.delete(t)),es.set(t,o)),o}async function Kd(e){Gd??=new AudioContext;let t=Gd;t.state==="suspended"&&t.resume();let o=t.createBufferSource(),n=t.createGain();o.buffer=await hy(t,e),n.gain.value=fy,o.connect(n).connect(t.destination),o.start()}function zd(){let e=hn.store.soundUrl.trim();Kd(e||_a).catch(t=>{Ud.warn("Sound failed",t),e&&Kd(_a).catch(o=>Ud.warn("Default chime failed",o))})}function by(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function yy(e){let t=qe(Pt(Fd)??"");return e&&L(t)&&t.id===e&&Date.now()-Number(t.at)<py?!1:(Rt(Fd,{id:e,at:Date.now()}),!0)}function Qd(e){hn.store.onlyWhenHidden&&!document.hidden||yy(e)&&(hn.store.sound&&zd(),hn.store.browserNotification&&by(xt(e)))}function vy(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(ts=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:ts.signal}))}var jd=f({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply, including chats you left while they were answering.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:hn,start(){vy(),Yd=[S.on("fall",({conversationId:e,outcome:t})=>t==="done"&&Qd(e)),S.on("background",({conversationId:e})=>Qd(e))]},stop(){for(let e of Yd)e();ts?.abort()}});var Ay=`:is(${u.sidebarScroll}, :has(> ${u.sidebarScroll})) + :has(${u.menuButton})`,wy=`${u.rail} > :has(${u.menuButton})`,ns=`:is(${Ay}, ${wy}, ${u.oldProfile}):not(:hover)`,os="[data-bloom-profile-avatar]",Sy=`:is(${ns}, ${ns} :has(${os})) > :not(${os}, :has(${os}))`,Vd=g({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function xy(){let{opacity:e,fadeAvatar:t}=Vd.store;return e>=100?"":`${t?ns:Sy}{opacity:${e/100}!important}`}var Wd,Jd=f({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Vd,styles:xy,start(){Wd=Me()},stop(){Wd?.()}});var Zd=`/*
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
`;var G=C("bloom-star-chats"),qy=80,Ty=60,Cy=1200,My=120,bn=g({replaceReadAloud:{type:"boolean",description:"Put the star where the reply's Read aloud button is, and hide that button.",default:!0},messages:{type:"custom",default:[]}}),ky=`:is(${u.turnActions}) ${u.readAloud}`,rs,is=!1,nt=!1,It=!1,zr=0,X=null,jr="",R=null,as,rt;function ls(){let e=bn.store.messages;return Array.isArray(e)?e.filter(t=>L(t)&&typeof t.conversationId=="string"&&typeof t.messageId=="string"&&(t.role==="user"||t.role==="assistant")&&typeof t.snippet=="string"&&typeof t.starredAt=="number"):[]}function cs(){let e=b();return e?ls().filter(t=>t.conversationId===e):[]}function Ly(e,t){return ls().some(o=>o.conversationId===e&&o.messageId===t)}function $d(e){let t=ls(),o=t.some(n=>n.conversationId===e.conversationId&&n.messageId===e.messageId);bn.store.messages=o?t.filter(n=>!(n.conversationId===e.conversationId&&n.messageId===e.messageId)):[{...e,starredAt:Date.now()},...t].slice(0,qy)}function ss(e){return e.messageIds[0]||e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.el.getAttribute("data-turn-key")||""}function Iy(e){return Ee(Kt(e)||y(e.el.textContent??""),Ty)}function By(e){let t=e.closest(u.turn);if(!t)return null;let o=je().filter(n=>t.contains(n.el));return o.find(n=>n.el.contains(e)||n.el===t)??o.findLast(n=>n.el.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING)??null}function Oy(){let e=[...document.querySelectorAll(u.turnActions)].filter(t=>!t.closest(`[data-bloom], [role="dialog"], [inert], pre, ${u.sidebars}`));return e.filter(t=>!e.some(o=>o!==t&&o.contains(t)))}function Py(e,t){let o=bn.store.replaceReadAloud?t.querySelector(u.readAloud):null;if(o&&!o.closest("[data-bloom]")){e.nextElementSibling!==o&&o.before(e);return}let n=Ry(t);(e.parentElement!==n||n.lastElementChild!==e)&&n.append(e)}function Ry(e){let t=[...e.querySelectorAll("button")].filter(n=>n.dataset.bloom!=="message-star"&&!n.closest("[data-bloom]"));return t.length?[...e.children].find(n=>n instanceof HTMLElement&&n!==t[0]&&t.every(r=>n.contains(r)))??e:e}function Dy(){return[...document.querySelectorAll(u.headerMore)].filter(t=>{if(t.dataset.bloom==="message-star"||t.closest("[data-bloom], [role='dialog'], [inert]")||t.closest(u.sidebars))return!1;let o=t.getBoundingClientRect();return o.width===0&&o.height===0?!!t.closest("header, #page-header"):o.top>=0&&o.top<96&&o.left>window.innerWidth*.5}).toSorted((t,o)=>o.getBoundingClientRect().left-t.getBoundingClientRect().left||(t.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1))[0]??null}function Xd(e,t,o){return s("button",{class:t,attrs:{type:"button","aria-label":e},on:{pointerdown:n=>n.stopPropagation(),mousedown:n=>n.stopPropagation(),click:n=>{n.preventDefault(),n.stopPropagation(),o(n)}}},T("star"))}function Hy(e,t){e.setAttribute("aria-pressed",String(t)),e.setAttribute("aria-label",t?"Unstar":"Star")}function Wr(){return nt||It}function Ao(){zr&&window.clearTimeout(zr),zr=0}function wo(){nt=!1,It=!1,Ao(),rt?.enter(),X?.remove(),X=null,jr="",R?.classList.remove(G("-open")),R?.setAttribute("aria-expanded","false")}function Vr(e){return e instanceof Node&&!!(R?.contains(e)||X?.contains(e))}function Ny(e){e.classList.add(G("-flash")),window.setTimeout(()=>e.classList.remove(G("-flash")),Cy)}function Uy(e){let t=je().find(n=>ss(n)===e),o=t?.el.closest(u.turn)??t?.el;o&&(o.scrollIntoView({block:"start"}),Ny(o))}function Fy(){let e=b(),t=new Set,o=[...document.querySelectorAll('[data-bloom="message-star"][data-place="action"]')];if(!e||Te()){for(let n of o)n.remove();return}for(let n of Oy()){if(!Se(n))continue;let r=By(n),i=r?ss(r):"";if(!r||!i)continue;let a=n.querySelector('[data-place="action"]');(!a||a.dataset.id!==i)&&(a?.remove(),a=Xd("Star",G("-star"),()=>{let c=b(),l=je().find(d=>ss(d)===i);!c||!l||$d({conversationId:c,messageId:i,role:l.role,snippet:Iy(l)})}),a.dataset.bloom="message-star",a.dataset.place="action",a.dataset.id=i),Hy(a,Ly(e,i)),Py(a,n),t.add(a)}for(let n of o)t.has(n)||n.remove()}function Gy(){if(!X||!R)return;let e=R.getBoundingClientRect(),t=X.offsetWidth||288,o=X.offsetHeight||120,n=e.bottom+6;n+o>window.innerHeight-8&&(n=Math.max(8,e.top-o-6));let r=Math.max(8,Math.min(e.right-t,window.innerWidth-t-8));X.dataset.place=n>=e.bottom?"below":"above",X.style.left=`${Math.round(r)}px`,X.style.top=`${Math.round(n)}px`}function Yy(){if(!Wr()||!R){X?.remove(),X=null,jr="",R?.classList.remove(G("-open")),R?.setAttribute("aria-expanded","false");return}let e=cs(),t=e.map(o=>`${o.messageId}	${o.snippet}`).join(`
`);if(!X||jr!==t){X?.remove();let o=e.map(n=>s("div",{class:G("-row")},s("button",{class:G("-jump"),attrs:{type:"button"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),wo(),Uy(n.messageId)}}},s("span",{class:G("-role"),text:n.role==="user"?"You":"ChatGPT"}),s("span",{class:G("-snip"),text:n.snippet||"Message"})),Xd("Unstar",G("-unstar"),()=>$d(n))));X=s("div",{class:`bloom-root ${G("-panel")}`,attrs:{"data-bloom":"star-list"},on:{pointerenter:()=>{Ao(),rt?.enter(),It=!0},pointerleave:n=>{Vr(n.relatedTarget)||nt||rt?.leave(n)}}},s("div",{class:G("-bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:G("-head"),text:"Starred"}),s("div",{class:G("-body")},...o.length?o:[s("div",{class:G("-empty"),text:"No starred messages in this chat"})])),document.body.append(X),jr=t}Gy(),R.classList.add(G("-open")),R.setAttribute("aria-expanded","true")}function Ky(){for(let r of document.querySelectorAll('[data-bloom="starred"]'))r.remove();let e=Dy(),t=e?.parentElement??null,o=b();if(!e||!t||t.closest(u.sidebars)||!o||Te()||!Se(t)){R?.remove(),R=null,wo();return}R||(R=s("button",{class:G("-toggle"),attrs:{type:"button","data-bloom":"message-star","data-place":"header","aria-label":"Starred messages","aria-expanded":"false"},on:{pointerdown:r=>r.stopPropagation(),pointerenter:()=>{Ao(),rt?.enter(),zr=window.setTimeout(()=>{It=!0,Lt()},My)},pointerleave:r=>{Vr(r.relatedTarget)||(Ao(),Wr()&&rt?.leave(r))},click:r=>{r.preventDefault(),r.stopPropagation(),nt=!nt,It=nt,Ao(),nt||wo(),Lt()}}},T("star"))),(R.parentElement!==t||R.nextElementSibling!==e)&&e.before(R);let n=e.getBoundingClientRect();n.width>0&&(R.style.width=`${n.width}px`,R.style.height=`${n.height}px`),R.classList.toggle(G("-here"),cs().length>0),Yy()}function Qy(){let e=new Set(cs().map(t=>t.messageId));for(let t of document.querySelectorAll('[data-bloom="navigator"] .bloom-nav-tick, [data-bloom="navigator"] .bloom-nav-row'))t.classList.toggle(G("-mark"),!!t.dataset.messageId&&e.has(t.dataset.messageId))}function Lt(){if(!is){is=!0;try{for(let e of document.querySelectorAll('[data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();Fy(),Ky(),Qy()}finally{is=!1}}}function zy(){wo(),R?.remove(),R=null;for(let e of document.querySelectorAll('[data-bloom="message-star"], [data-bloom="star-list"], [data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();for(let e of document.querySelectorAll(`.${G("-mark")}`))e.classList.remove(G("-mark"))}var _d=f({name:"StarChats",description:"Star a message from its toolbar. The star left of the top-right menu opens this chat's list.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:bn,styles:()=>`${Zd}${bn.store.replaceReadAloud?Ye([ky]):""}`,onSettingsChange(e){(e==="messages"||e==="replaceReadAloud")&&Lt()},start(){for(let o of document.querySelectorAll('[data-bloom="star-list"]'))o.remove();rt=or({over:Vr,trigger:()=>R,panel:()=>X,setHeld(o){if(o){It=!0,Lt();return}nt||(It=!1,Lt())}}),rs=M(o=>Y(o)&&Lt());let e=o=>{Vr(o.target)||Wr()&&wo()};document.addEventListener("pointerdown",e,!0);let t=o=>{o.key!=="Escape"||!Wr()||(o.preventDefault(),wo())};document.addEventListener("keydown",t,!0),as=()=>{document.removeEventListener("pointerdown",e,!0),document.removeEventListener("keydown",t,!0)},Lt()},stop(){rs?.(),rs=void 0,as?.(),as=void 0,Ao(),rt?.dispose(),rt=void 0,zy()}});var em="filter:blur(6px)!important;transition:filter 0.2s ease",tm=`:is(${u.sidebars})`,Bt="data-bloom-streamer-open",jy="[data-app-action-sidebar-thread-row], [data-app-action-sidebar-project-row], .bloom-recent-item";function Wy(){return{conversations:{selectors:[`${tm} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0,row:"[data-app-action-sidebar-thread-row]"},projects:{selectors:[`${tm} a:is([href*="/project"], [href*="/g/g-p-"])`,"[data-app-action-sidebar-project-row]",".bloom-recent-project"],hover:!0,row:"[data-app-action-sidebar-project-row]"},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}}}var om=g({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function Vy(e,t){let o=[`:is(${e}):hover`,`.bloom-recent-item:hover :is(${e})`,`:is(${e})[${Bt}]`];return t&&o.push(`${t}:hover`,`${t}:hover :is(${e})`,`${t}:is(${e}):hover`,`${t}[${Bt}]`,`${t}[${Bt}] :is(${e})`),o.join(",")}function Jy(){let e=Wy();return Object.entries(e).filter(([t])=>om.store[t]).map(([,t])=>{let o=t.selectors.join(",");if(!t.hover)return`:is(${o}){${em}}`;let n="row"in t?t.row:void 0;return`:is(${o}){${em}}${Vy(o,n)}{filter:none!important}`}).join(`
`)}function Zy(e,t){for(let o of document.elementsFromPoint(e,t))if(o instanceof Element){let n=o.closest(jy);if(n)return n}return null}function ms(e){for(let t of document.querySelectorAll(`[${Bt}]`))t!==e&&t.removeAttribute(Bt);e&&!e.hasAttribute(Bt)&&e.setAttribute(Bt,"")}var So,$y=Ke(()=>{So&&ms(Zy(So.clientX,So.clientY))});function us(e){So=e,$y()}function Xy(e){e.relatedTarget instanceof Node&&document.documentElement.contains(e.relatedTarget)||(So=void 0,ms(null))}var ds,Jr,nm=f({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:om,styles:Jy,start(){ds=Me(),Jr=new AbortController;let e={capture:!0,signal:Jr.signal,passive:!0};document.addEventListener("pointerover",us,e),document.addEventListener("pointermove",us,e),document.addEventListener("pointerout",us,e),window.addEventListener("pointerleave",Xy,e)},stop(){Jr?.abort(),Jr=void 0,So=void 0,ms(null),ds?.(),ds=void 0}});var im=g({openNewAsTemporary:{type:"boolean",description:"Open New chat as a temporary chat.",default:!1}}),_y=/^(?:new chat|新聊天)$/i,Zr;function ev(e){return e?"/?temporary-chat=true":"/"}function tv(e){let t=ev(e);`${location.pathname}${location.search}`===t||e&&Te()&&location.pathname==="/"||location.assign(t)}function ov(e){if(e.closest("[data-bloom]"))return!1;try{let t=new URL(e.href,location.origin);return t.origin===location.origin&&t.pathname==="/"}catch{return!1}}function nv(e){return e.closest("[data-bloom], [data-app-action-sidebar-project-row]")?!1:_y.test(e.getAttribute("aria-label")??y(e.textContent??""))}function rv(e){if(!im.store.openNewAsTemporary||Te())return;let{target:t}=e;if(!(t instanceof Element))return;let o=t.closest("a[href], button"),n=o instanceof HTMLAnchorElement?ov(o):!!o&&nv(o);!o||!n||o.closest(`${u.sidebarScroll}, ${u.rail}, ${u.oldSidebar}, nav`)&&(e.preventDefault(),e.stopPropagation(),tv(!0))}function rm(){for(let e of document.querySelectorAll('[data-bloom="temporary-chat"]'))e.remove()}var am=f({name:"TemporaryChat",description:"Optionally open New chat as a temporary chat. No extra sidebar button.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"ghost",enabledByDefault:!0,settings:im,start(){rm(),Zr=new AbortController,document.addEventListener("pointerdown",rv,{capture:!0,signal:Zr.signal})},stop(){Zr?.abort(),Zr=void 0,rm()}});var it=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)','[data-turn-key] [data-message-author-role="user"] blockquote:not(.twitter-tweet)','[class~="group/user-message"] blockquote:not(.twitter-tweet)'].join(","),fs=g({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function iv(){let e=[`${it}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${it}>*{margin-block:0!important}`];return fs.store.italic||e.push(`${it}{font-style:inherit!important}`),fs.store.quotes||(e.push(`${it}{quotes:none!important}`),e.push(`${it}::before,${it}::after,${it} p::before,${it} p::after{content:none!important}`)),e.join(`
`)}var sm=f({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:fs,styles:iv});var av=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],sv=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",lv='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',lm=g({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function cv(){let e=`${lm.store.width}rem`;return`:is(${sv}){${av.map(t=>`${t}:${e}!important`).join(";")}}:is(${lv}){max-width:min(100%, ${e})!important}`}var cm=f({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:lm,styles:cv});var uv=[Ac,_l,Hc,jc,Jc,au,cu,uu,mu,Au,Lu,Nu,Qu,sd,cd,ud,gd,kd,Nd,jd,Jd,_d,nm,am,sm,cm],ps=uv;var dv=new E("Bloom"),um="2.0.104";var gs=0,$r;function mv(){gs++,$r?.(),$r=void 0,Js(),qo(),Sn()}async function hs(){let e=++gs,t=()=>e===gs;qo(),Sn(),ll();for(let o of ps)o.updatedAt=Bl[o.name];Hs(ps),Os(),Us(),indexedDB.deleteDatabase("bloompp"),Ot("base",$s),Cl(),Ln("Init"),Rn().then(()=>{t()&&(Es(),Ln("DOMContentLoaded"))}),await ul(),t()&&(Ln("HostReady"),$r?.(),$r=Il(),Vs(),dv.info(`Bloom++ ${um} ready`))}var fv=new E("Boot");window===window.top&&(Ts(oe.Bloom),Cs(bs),hs().catch(e=>fv.error("Startup failed",e)));})();
