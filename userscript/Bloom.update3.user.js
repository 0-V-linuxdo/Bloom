// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.99
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

/* Bloom++ v2.0.99. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var am=Object.defineProperty;var sm=(e,t)=>{for(var o in t)am(e,o,{get:t[o],enumerable:!0})};var q=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var fe=(e,t,o)=>Math.min(o,Math.max(t,e)),k=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),at=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,Se=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,y=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function hn(e,t){return`${e} ${t}${e===1?"":"s"}`}async function bn(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function qe(e){try{return JSON.parse(e)}catch{return}}var oe=typeof unsafeWindow>"u"?window:unsafeWindow,lm=200,cm=300;function yn(e){return new Promise((t,o)=>GM_xmlhttpRequest({url:e,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=lm&&n<cm?t(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var um=new q("Styles"),Ge=new Map,xo=new Set,st=new Map,Vr=!0,gs=e=>e.replaceAll(/[^A-Za-z0-9_-]/g,"_"),dm=e=>`:where(:root){--bloom-sheet-${gs(e)}:1}`,mm=(e,t)=>`${dm(e)}${t}`,hs=e=>`bloom-style-${e}`;function bs(e){try{return[...e.cssRules].map(t=>t.cssText).join(`
`)}catch{return""}}function fm(e,t){let o=bs(e);return o?o.includes(`--bloom-sheet-${gs(t)}`)?!0:t==="plugin-StreamerMode"?o.includes("blur(6px)")&&(o.includes("data-app-action-sidebar-thread-title")||o.includes("data-bloom-streamer-open")):t==="plugin-WiderChat"?o.includes("--composer-adjacent-max-width")&&o.includes("--thread-content-max-width"):t==="plugin-ComposerOpacity"?o.includes("--composer-layout-surface-backdrop-filter")||o.includes("--composer-layout-surface-background")&&o.includes("color-mix"):!1:!1}function ys(e){let t=bs(e);return t?!!(t.includes("--bloom-")||t.includes(".bloom-")||t.includes("[data-bloom")||t.includes("--bloom-sheet-")||t.includes("blur(6px)")&&t.includes("data-app-action-sidebar-thread-title")||t.includes("--composer-adjacent-max-width")&&t.includes("--thread-content-max-width")||t.includes("--composer-layout-surface-backdrop-filter")):!1}function vs(){let e=document.adoptedStyleSheets.filter(t=>!xo.has(t)&&!ys(t));document.adoptedStyleSheets=[...e,...Ge.values()]}function As(e){document.readyState==="loading"||e.parentNode===document.head||document.head.append(e)}function pm(e,t){let o=st.get(e);o||(o=document.createElement("style"),o.id=hs(e),st.set(e,o)),o.textContent!==t&&(o.textContent=t),As(o)}function Bt(e,t){let o=mm(e,t);if(Vr)try{let n=Ge.get(e);n||(n=new oe.CSSStyleSheet,Ge.set(e,n),xo.add(n)),n.replaceSync(o),vs();return}catch(n){um.warn("Constructed style sheets unavailable, using <style> after parsing",n),Vr=!1;let r=Ge.get(e);r&&xo.delete(r),Ge.delete(e)}pm(e,o)}function So(e){let t=Ge.get(e);t&&(xo.delete(t),Ge.delete(e)),st.get(e)?.remove(),st.delete(e);for(let o of document.querySelectorAll(`style[id="${hs(e)}"]`))o.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(o=>o!==t&&!fm(o,e)),Vr&&vs()}catch{}}function qo(){Ge.clear(),xo.clear();for(let e of st.values())e.remove();st.clear();for(let e of document.querySelectorAll("style[id^='bloom-style-']"))e.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(e=>!ys(e))}catch{}}function ws(){for(let e of st.values())As(e)}var C=e=>(...t)=>t.map(o=>e+o).join(" "),vn=(...e)=>e.filter(Boolean).join(" "),Ye=e=>e.length?`${e.map(t=>`${t}:not([data-bloom])`).join(",")}{display:none!important}`:"";var xs="__bloomHost",Jr=new q("Boot"),gm=['[data-bloom="navigator"]','[data-bloom="settings"]','[data-bloom="history-hud"]','[data-bloom="history-dialog"]','[data-bloom="star-list"]','[data-bloom="entry"]','[data-bloom="menu-entry"]','[data-bloom="menu-flyout"]','[data-bloom="message-star"]','[data-bloom="starred"]','[data-bloom="chat-star"]','[data-bloom="queue"]','[data-bloom="recent"]','[data-bloom="quote-chip"]','[data-bloom="quote-back"]','[data-bloom="cls"]','[data-bloom="timestamp"]','[data-bloom="tooltip"]','[data-bloom="notices"]'].join(", "),hm=["data-bloom-greeting","data-bloom-placeholder","data-bloom-streamer-open","data-bloom-share","data-bloom-invite","data-bloom-csi-avatar","data-bloom-csi-sized"];function An(){if(!(typeof document>"u"||!document.documentElement)){for(let e of document.querySelectorAll(gm))e.remove();for(let e of hm)for(let t of document.querySelectorAll(`[${e}]`))t.removeAttribute(e);for(let e of document.querySelectorAll("[data-bloom-text]"))e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size"),e.style.removeProperty("--bloom-text")}}function bm(e){if(Jr.warn("Replacing another Bloom++ instance",e.VERSION),e.destroy){e.destroy();return}for(let t of e.plugins?.values()??[]){try{t.stop?.()}catch(o){Jr.error("Failed to stop previous plugin",o)}t.styles="",t.start=void 0}qo()}function Ss(e){let t=oe,o=new Set;for(let n of[e,t.Bloom,t[xs]])if(!(!n||o.has(n))){o.add(n);try{bm(n)}catch(r){Jr.error("Failed to retire Bloom++",r)}}An()}function qs(e){let t=oe;try{delete t.Bloom}catch{}Object.defineProperty(t,"Bloom",{value:e,configurable:!0,writable:!0}),Object.defineProperty(t,xs,{value:e,configurable:!0,writable:!0})}var ps={};sm(ps,{VERSION:()=>im,destroy:()=>lv,init:()=>fs,plugins:()=>Z});var ym=new q("Dom");function s(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var Es=document.createElement("template");function Ts(e){return Es.innerHTML=e.trim(),Es.content.firstElementChild.cloneNode(!0)}var lt=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),J=(e,t=document)=>[...t.querySelectorAll(e)].find(lt)??null,vm=16,Am="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function Sn(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([Am],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function To(e){document.hidden?setTimeout(e,vm):requestAnimationFrame(e)}function Ke(e){let t=!1;return()=>{t||(t=!0,To(()=>{t=!1;try{e()}catch(o){ym.error("Scheduled task failed",o)}}))}}var wn=new Set,xn=[],Eo,wm=Ke(()=>{let e=xn;xn=[];for(let t of wn)t(e)});function M(e){return wn.add(e),Eo||(Eo=new MutationObserver(t=>{xn.push(...t),wm()}),Eo.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{wn.delete(e),!wn.size&&(Eo?.disconnect(),Eo=void 0,xn=[])}}var xm=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),Y=e=>!e.length||e.some(t=>!xm(t.target)),Sm=e=>`"${e.replaceAll("\\","\\\\").replaceAll('"','\\"').replaceAll(`
`,"\\A ")}"`;function ct(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size"),e.style.removeProperty("--bloom-text");return}e.style.setProperty("--bloom-text",Sm(t)),e.getAttribute("data-bloom-text")!==t&&e.setAttribute("data-bloom-text",t)}function f(e){return e}var Cs=new q("Storage");function Ot(e){try{return localStorage.getItem(e)??void 0}catch{return}}function Pt(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(o){Cs.warn("localStorage write failed",o)}}function Zr(e){try{localStorage.removeItem(e)}catch(t){Cs.warn("localStorage delete failed",t)}}function Ms(e,t){addEventListener("storage",o=>{o.key===e&&t(o.newValue)})}var $r="BloomSettings",qm=100,Qe={plugins:{}},qn=new Set,Xr=new Set,Rt;function Ls(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=qe(t);return!k(t)||!k(t.plugins)||!Object.keys(t.plugins).length?null:t}function ks(){let e=Ls(Ot($r));e&&(Qe.plugins=e.plugins)}var Is=(e,t)=>`${e}
${t}`;function _r(){Rt=void 0,Xr.clear(),Pt($r,Qe)}function Em(e){let t=Ls(e);if(!t)return;let o=[];for(let n of new Set([...Object.keys(Qe.plugins),...Object.keys(t.plugins)])){let r=Qe.plugins[n]??={},i=k(t.plugins[n])?t.plugins[n]:{};for(let a of new Set([...Object.keys(r),...Object.keys(i)]))Xr.has(Is(n,a))||JSON.stringify(r[a])===JSON.stringify(i[a])||(i[a]===void 0?delete r[a]:r[a]=i[a],o.push([n,a]))}for(let[n,r]of o)for(let i of qn)i(n,r)}function ei(){Rt&&(clearTimeout(Rt),_r())}function Bs(e){let t=Object.keys(Qe.plugins).filter(o=>!e.has(o));if(!t.length)return t;for(let o of t)delete Qe.plugins[o];return clearTimeout(Rt),_r(),t}var ae=(e,t)=>Qe.plugins[e]?.[t];function Ee(e,t,o){let n=Qe.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,Xr.add(Is(e,t)),clearTimeout(Rt),Rt=setTimeout(_r,qm);for(let r of qn)r(e,t)}function Dt(e){return qn.add(e),()=>void qn.delete(e)}function ti(e){return e.type==="component"?void 0:e.default}function g(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>ae(t.pluginName,n)??(e[n]&&ti(e[n])),set:(o,n,r)=>(Ee(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&ae(t.pluginName,o)!==void 0&&Ee(t.pluginName,o)}};return t}var Os=e=>{let t=()=>{let o=ae("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();Ee("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},En=Os("pinnedPlugins"),Tn=Os("starredPlugins");addEventListener("pagehide",ei);Ms($r,Em);var Lo=new q("PluginManager"),Z=new Map,ut=new Set,ni=new Set,oi=new Set,Co=new Map,Tm=2880*60*1e3;function Ps(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),Z.set(t.name,t)}var Rs=()=>{let e=ae("Settings","knownPlugins");return k(e)?e:null};function Ds(){let e=Bs(new Set(Z.keys()));e.length&&Lo.info(`Dropped settings of removed plugins: ${e.join(", ")}`);let t=Rs(),o=Date.now(),n={...t},r=[...Z.values()].filter(i=>!i.hidden&&!i.required&&!(i.name in n));for(let i of r)n[i.name]=t?o:0;for(let i of Object.keys(n))Z.has(i)||delete n[i];JSON.stringify(n)!==JSON.stringify(t)&&Ee("Settings","knownPlugins",n)}var Hs=e=>{let t=Rs()?.[e];return!!t&&Date.now()-t<Tm},Ns=e=>Co.get(e);function Us(){for(let e of oi)e()}function Fs(e,t){let o=Co.get(e);(t?o?.join(`
`)===t.join(`
`):!o)||(t?Co.set(e,t):Co.delete(e),Us())}var ze=e=>!!e.required||(ae(e.name,"enabled")??!!e.enabledByDefault);var Mo=e=>`plugin-${e.name}`;function Gs(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?Bt(Mo(e),t):So(Mo(e))}function Cm(e){if(!ut.has(e.name))try{Gs(e),e.start?.(),ut.add(e.name)}catch(t){So(Mo(e)),Lo.error(`Failed to start ${e.name}`,t)}}function ri(e){ut.delete(e.name),So(Mo(e));try{e.stop?.()}catch(t){Lo.error(`Failed to stop ${e.name}`,t)}}var Ys=e=>e.startAt??"HostReady";function Ks(e){if(ze(e)){ni.has(Ys(e))&&Cm(e);return}ri(e)}function Mn(e){ni.add(e);for(let t of Z.values())Ys(t)===e&&Ks(t);Lo.info(`${e}: ${[...ut].join(", ")}`)}function Qs(e,t){Ee(e.name,"enabled",t),ei()}function Mm(){for(let e of Z.values())e.required||ze(e)||(ut.has(e.name)?ri(e):So(Mo(e)))}var Cn;function zs(){Cn?.(),Cn=M(()=>Mm())}function js(){Cn?.(),Cn=void 0;for(let e of Z.values())ri(e);ut.clear(),ni.clear(),Co.clear()}function Ws(e){return oi.add(e),()=>void oi.delete(e)}Dt((e,t)=>{let o=Z.get(e);if(o){if(t==="enabled"){typeof ae(e,"enabled")=="boolean"&&Ks(o),Us();return}if(ut.has(e))try{Gs(o),o.onSettingsChange?.(t)}catch(n){Lo.error(`Settings change failed for ${e}`,n)}}});var Vs=`/*
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
`;var km=new q("Events");function Ln(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){km.error(`Listener for ${String(t)} failed`,r)}}}}var u={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',sidebarConversationRow:"[data-sidebar-chatgpt-conversation-key]",sidebarIndicator:"[data-sidebar-indicator]",timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',readAloud:'button:is([aria-label="Read aloud" i], [aria-label^="Read aloud" i], [aria-label="Stop reading" i], [aria-label^="Stop reading" i], [aria-label="\u6717\u8BFB"], [aria-label^="\u6717\u8BFB"], [aria-label="\u505C\u6B62\u6717\u8BFB"], [data-testid*="read-aloud" i])',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',composerConversation:"[data-above-composer-conversation-id]",oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",modelTrigger:'[data-testid="model-switcher-dropdown-button"], button[aria-label="Model selector" i], button[aria-label="Select ChatGPT model" i]',modelItem:'[role="menu"] [data-testid^="model-switcher-"], [role="menuitem"][data-testid^="model-switcher-"], [role="menu"] [role="menuitemradio"], [role="menu"] [data-reasoning-slider]',effortSlider:'[role="menu"] [data-reasoning-slider]',homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]',headerMore:'button[aria-label="More" i], button[aria-label="\u66F4\u591A"]',rightPanel:"aside[data-app-shell-focus-area='right-panel']",summaryPanel:"[data-summary-panel-variant]"};var Js=/[​-‍﻿]/g,ve=()=>J(u.composerInput),dt=e=>e instanceof HTMLElement&&e.matches(u.composerInput),$=(e=ve())=>e?.closest("form")??document.querySelector(u.oldComposerForm);function B(e=ve()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(Js,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(Js,"").trim()}var Im=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function le(e,t=ve()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return Im?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function Zs(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:a,value:c}=e;return{first:!c.slice(0,i).includes(`
`),last:!c.slice(a).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var $s=e=>{let t=$();return(t&&J(e,t))??J(e)},Ht=()=>$s(u.stopButton),Bm=()=>{let e=$s(u.sendButton);return e&&!e.matches(u.stopButton)?e:null};function kn(){let e=Bm();if(e){e.disabled||e.click();return}ve()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var Xs=()=>lt(Ht());var tl=new q("Network"),Om=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,Pm=404,Rm=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,Bn=1e3,Dm=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),V=Ln(),ai=new Map,_s=new Map,Hm=1,Ae=e=>e?ai.get(e)??null:null;function In(e){let t=ai.get(e);return t||ai.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var ol=e=>e==="user"||e==="assistant";function nl(e){let t=e.author?.role;if(!e.id||!ol(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(l=>typeof l=="string").join(`
`).trim(),i=n.filter(l=>k(l)&&l.content_type==="image_asset_pointer").length,a=e.metadata?.attachments,c=Array.isArray(a)&&a.length>0;return!r&&!i&&!c?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*Bn:null,text:r,hasFiles:c,imageCount:i}}var rl=e=>e.filter((t,o)=>t.role==="user"||e[o+1]?.role!=="assistant"),si=e=>e.map(t=>t.createTime).filter(t=>t!=null);function Nm(e,t){let o=si(e),n=si(t);return!o.length||!n.length?!1:Math.max(...o)<Math.min(...n)}function Um(e){let t=si(e);if(t.length<2)return e;let[o]=t,n=o-e.length;return e.map((i,a)=>(i.createTime!=null&&(n=i.createTime),{message:i,index:a,time:i.createTime??n})).toSorted((i,a)=>i.time-a.time||i.index-a.index).map(i=>i.message)}function Fm(e,t){let o=t.filter(k).map(c=>k(c.message)?c.message:c);for(let c of o)c.id&&c.create_time&&e.times.set(c.id,c.create_time*Bn);let n=o.map(nl).filter(c=>c!=null),r=new Set(n.map(c=>c.id)),i=e.chain.filter(c=>!r.has(c.id)),a=Nm(n,i)?[...n,...i]:[...i,...n];return e.chain=rl(Um(a)),e}function Gm(e,t){if(!k(t)||!(k(t.mapping)||Array.isArray(t.messages)))return null;let o=In(e);if(typeof t.title=="string"&&t.title&&(o.title=t.title),Array.isArray(t.messages))return Fm(o,t.messages);let n=t.mapping;for(let c of Object.values(n)){let l=c.message?.create_time;c.message?.id&&l&&o.times.set(c.message.id,l*Bn)}let r=[],i=new Set,a=typeof t.current_node=="string"?t.current_node:null;for(;a&&!i.has(a)&&n[a];){i.add(a);let c=n[a].message,l=c?nl(c):null;l&&r.push(l),a=n[a].parent??null}return r.length&&(o.chain=rl(r.toReversed())),o}function Ym(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}var ii=e=>typeof e=="string"?e:null;function Km(e){let t=typeof e?.body=="string"?qe(e.body):null;if(!k(t))return{conversationId:null,parentId:null,userId:null};let[o]=Array.isArray(t.messages)?t.messages:[];return{conversationId:ii(t.conversation_id),parentId:ii(t.parent_message_id),userId:k(o)?ii(o.id):null}}function Qm(e,t){if(!k(e))return;typeof e.type=="string"&&Dm.has(e.type)&&(t.handoff=!0);let o=k(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(In(e.conversation_id).title=e.title,V.emit("conversation",In(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&ol(n.author?.role)){let r=n.create_time*Bn;t.conversationId&&In(t.conversationId).times.set(n.id,r),V.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function zm(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:a}=await o.read();if(i)break;r+=n.decode(a,{stream:!0});let c=r.split(`
`);r=c.pop()??"";for(let l of c){if(!l.startsWith("data:"))continue;let d=l.slice(5).trim();d&&d!=="[DONE]"&&Qm(qe(d),t)}}}async function jm(e,t,o){let{conversationId:n}=t,r={conversationId:n,error:!1,handoff:!1};_s.set(e,n),V.emit("generate-start",{requestId:e,...t});try{let i=await o;i.ok?i.headers.get("content-type")?.includes("event-stream")&&await zm(i.clone(),r):r.error=!0}catch(i){let a=i instanceof DOMException&&i.name==="AbortError";r.handoff||=a,r.error||=!a}finally{_s.delete(e),V.emit("generate-end",{requestId:e,...r})}}async function Wm(e,t){try{let o=await t;if(o.status===Pm&&V.emit("conversation-missing",{id:e}),!o.ok)return;let n=Gm(e,await o.clone().json());n&&V.emit("conversation",n)}catch(o){tl.debug("Conversation read skipped",o)}}function Vm(e,t,o){let n=Ym(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&Om.test(n.pathname)){jm(Hm++,Km(t),o);return}let i=r==="GET"&&n.pathname.match(Rm)?.[1];i&&Wm(i,o)}var el=!1;function il(){if(el)return;el=!0;let e=oe.fetch,t=function(o,n){let r=e.call(this??oe,o,n);try{Vm(o,n,r)}catch(i){tl.error("Fetch tap failed",i)}return r};oe.fetch=typeof exportFunction=="function"?exportFunction(t,oe):t}var Jm="__reactContainer$",al="__reactFiber$";function On(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var li=(e,t)=>Object.keys(e.wrappedJSObject??e).some(o=>o.startsWith(t)),we=e=>!li(document,Jm)||li(e,al);function mt(){return document.body?Promise.resolve():new Promise(e=>{let t=new MutationObserver(()=>{document.body&&(t.disconnect(),e())});t.observe(document,{childList:!0,subtree:!0})})}async function sl(){await mt();let e=Date.now()+8e3;for(;!li(document.body,al)&&Date.now()<e;)await new Promise(t=>setTimeout(t,100))}var Zm=new q("Route"),ll=/\/c\/(?!local-)([\w-]+)/,$m=500,di=e=>{try{return new URL(e,location.origin).pathname.match(ll)?.[1]??null}catch{return null}},b=()=>location.pathname.match(ll)?.[1]??null,Nt=()=>location.pathname==="/",Xm=/^\/g\/g-p-[^/]+(?:\/project)?\/?$/,Hn=()=>Xm.test(location.pathname),Te=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",Rn=new Set,Dn=location.href,ui=b(),Pn;function ci(){if(location.href===Dn)return;let e={prevHref:Dn,href:location.href,prevId:ui,id:b()};Dn=e.href,ui=e.id;for(let t of Rn)try{t(e)}catch(o){Zm.error("Route listener failed",o)}}function _m(){let e=new AbortController,{navigation:t}=oe;t?.addEventListener("currententrychange",()=>queueMicrotask(ci),{signal:e.signal}),addEventListener("popstate",ci,{signal:e.signal});let o=setInterval(ci,$m);return()=>{e.abort(),clearInterval(o)}}function pe(e){return Rn.add(e),Pn||(Dn=location.href,ui=b(),Pn=_m()),()=>{Rn.delete(e),!Rn.size&&(Pn?.(),Pn=void 0)}}var ef=["data-turn","data-message-author-role"],tf=/:(user|assistant)$/,mi=`${u.messageUnit}, ${u.oldMessage}`,fi=e=>e==="user"||e==="assistant",ml=()=>!!document.querySelector(u.timelineScroll),fl=()=>!!J(u.timelineScroll),pl=()=>b()??document.querySelector(u.composerConversation)?.getAttribute("data-above-composer-conversation-id")??"",Ut=()=>ml()?J(u.timelineScroll):document;function Io(){if(ml())return J(u.timelineScroll);let e=document.querySelector(u.turn);for(let t=e?.parentElement;t;t=t.parentElement){let{overflowY:o}=getComputedStyle(t);if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight)return t}return document.scrollingElement}var Ft=e=>e.getAttribute("data-chatgpt-search-unit-key")?.match(tf)?.[1]??null,gl=e=>[...e.querySelectorAll(u.searchUnit)].filter(t=>Ft(t)&&!t.parentElement?.closest(u.searchUnit)),cl=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function ko(e){let t=cl(e);return t.length?t:[...new Set([...e.querySelectorAll(mi)].flatMap(cl))]}function Gt(e=Ut()){if(!e)return[];let t=gl(e);return t.length?t:[...e.querySelectorAll(mi)].filter(o=>!o.parentElement?.closest(mi))}function of(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function nf(e){for(let t of ef){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(fi(o))return o}return e.querySelector(u.markdown)||e.querySelector(u.generatedImage)?"assistant":null}var rf=e=>!e.parentElement?.closest(u.turn);function je(){let e=Ae(b())?.chain??[];return[...Ut()?.querySelectorAll(u.turn)??[]].filter(rf).flatMap(o=>{let n=gl(o),r=n.length?n.map(i=>({el:i,known:Ft(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=d=>!n.some(m=>m.contains(d))&&y(d.textContent??""),a=[...o.querySelectorAll(u.assistantMarkdown)].find(d=>i(d)&&!Nn.test(y(d.textContent??""))),c=[...o.querySelectorAll(u.activityHeader)].findLast(i),l=a??c;l&&r.push({el:l,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?ko(o):Gt(o).flatMap(ko),a=n??nf(o)??of(i,e)??(r%2?"assistant":"user"),c=o.closest(u.turn)??o,l=!o.closest(u.searchUnit)&&!!c.querySelector(u.turnBusy),d=a==="assistant"&&(o.matches(u.turnBusy)||!!o.querySelector(u.turnBusy)||l);return{el:o,role:a,messageIds:i,streaming:d}})}var af="[data-bloom], .sr-only",hl=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,Nn=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,ul=new WeakMap;function Yt(e){let o=(e.el.closest(u.turn)??e.el).textContent?.length??0,n=ul.get(e.el);if(n?.length===o)return n.summary;let r=sf(e);return ul.set(e.el,{length:o,summary:r}),r}function dl(e){let t=new Set,o=[];for(let n of e.querySelectorAll(u.assistantMarkdown)){if(n.closest(u.searchUnit))continue;let r=y(n.textContent??"");!r||Nn.test(r)||hl.test(r)||t.has(r)||(t.add(r),o.push(r))}return o}function sf(e){let t=e.el.querySelectorAll(u.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.closest(u.turn);if(e.role==="assistant"&&o&&e.el.matches(u.assistantMarkdown)&&!e.el.closest(u.searchUnit)){let l=dl(o);if(l.length)return l.join(" \xB7 ")}let n=e.el.querySelector(e.role==="assistant"?u.markdown:".whitespace-pre-wrap")??e.el,i=[...n.querySelectorAll(af)].map(l=>y(l.textContent??"")).filter(Boolean).reduce((l,d)=>l.replace(d,`
`),n.innerText||n.textContent||""),a=i.split(`
`).map(y).filter(l=>l&&!hl.test(l)&&!Nn.test(l));if(a.length)return a.join(" ");if(e.role==="assistant"&&o){let l=dl(o);if(l.length)return l.join(" \xB7 ")}let c=i.split(`
`).map(y).filter(l=>Nn.test(l));return c.length?c.at(-1)??"":e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function Un(e){return e.text?y(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var pi=e=>e.matches(u.timelineScroll)&&getComputedStyle(e).flexDirection==="column-reverse";var lf=250,cf=400,uf=6e4,df=5e3,mf=`:is(${u.turn}) :is(${u.turnBusy})`,ff="data-sidebar-chatgpt-conversation-key",Al="data-sidebar-indicator",pf=/:([0-9a-f-]{36})$/i,x=Ln(),Yn=new Set,gi=new Set,We=!1,wl=0,Kt=null,Qt=!1,Fn=!1,Bo=0,Kn=!1,Oo=null,bl=!1,yl=new Map,H=()=>({generating:We,conversationId:b()}),xl=()=>Xs()||!!Ut()?.querySelector(mf);function gf(){let e=xl();return e?Fn||(Bo=0,Kn=!0):Fn=!1,[...Yn].some(t=>!gi.has(t))||e&&!Fn||Date.now()<Bo}function hf(){return Oo?.error?"error":Qt?"stopped":"done"}function bf(){Kt=null,We=!1,Kn=!1,x.emit("fall",{conversationId:b(),outcome:hf()}),Qt=!1,Oo=null}function Sl(){let e=gf();e&&!We&&(We=!0,wl=Date.now(),Qt=!1,Oo=null,x.emit("rise",{conversationId:b()})),e||!We?Kt=null:Kt==null?Kt=Date.now():Date.now()-Kt>=cf&&bf()}function Gn(){Sl(),x.emit("tick",H())}function yf({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(We||Date.now()-wl<uf);if(!o&&We){for(let n of Yn)gi.add(n);Fn=xl(),Bo=0,Kn=!1,Kt=null,We=!1,Qt=!1,Oo=null,x.emit("fall",{conversationId:e,outcome:"left"})}x.emit("context",{prevId:e,id:t,migrated:o}),Gn()}function vl(){let e=b();for(let t of document.querySelectorAll(u.sidebarConversationRow)){let o=t.getAttribute(ff)?.match(pf)?.[1];if(!o)continue;let n=t.querySelector(u.sidebarIndicator)?.getAttribute(Al)??"",r=yl.get(o);r!==n&&(yl.set(o,n),r==="working"&&n==="unread"&&o!==e&&x.emit("background",{conversationId:o}))}}function vf(e){e.target instanceof Element&&e.target.closest(u.stopButton)&&(Qt=!0,Bo=0)}function ql(){bl||(bl=!0,V.on("generate-start",({requestId:e})=>{Yn.add(e),Gn()}),V.on("generate-end",e=>{Yn.delete(e.requestId),!gi.delete(e.requestId)&&(Oo=e,Bo=e.handoff&&!e.error&&!Qt&&!Kn?Date.now()+df:0,Gn())}),pe(yf),document.addEventListener("click",vf,!0),Sn(Gn,lf),On().then(()=>{M(Sl),M(vl),new MutationObserver(vl).observe(document.body,{subtree:!0,attributes:!0,attributeFilter:[Al]})}))}var S=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,Af="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",wf={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${Af}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:S('<path d="M18 6 6 18M6 6l12 12"/>'),gear:S('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:S('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:S('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:S('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:S('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:S('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:S('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:S('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:S('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:S('<path d="m6 9 6 6 6-6"/>'),play:S('<path d="M7 4v16l13-8z"/>'),plus:S('<path d="M12 5v14M5 12h14"/>'),check:S('<path d="m5 12 5 5 9-10"/>'),alert:S('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:S('<path d="M4 5h16v11H9l-5 4z"/>'),layout:S('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:S('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:S('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:S('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:S('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:S('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:S('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:S('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:S('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:S('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:S('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:S('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:S('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:S('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:S('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:S('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),folder:S('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),ghost:S('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},T=e=>Ts(wf[e]);function hi(e){if(typeof e.showPopover=="function"){e.setAttribute("popover","manual");try{e.showPopover()}catch{e.matches(":popover-open")||e.removeAttribute("popover")}}}function ge(e,t=document.body){t.append(e),hi(e)}var El=`/*
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
`;var Sf=6e3,qf=4,Ef={info:"info",success:"check",warning:"alert",error:"alert"},Ce=C("bloom-notice-"),zt=new Map,Po;function Tf(){return!document.body||!we(document.body)?null:(Bt("notices",El),Po?.isConnected||(Po=s("div",{class:`${Ce("stack")} bloom-root`,attrs:{"data-bloom":"notices",role:"region","aria-label":"Bloom++ notices","aria-live":"polite"}}),ge(Po)),Po)}function Tl(e){clearTimeout(e.timer),!(e.remaining<=0)&&(e.startedAt=Date.now(),e.timer=setTimeout(()=>Ve(e.key),e.remaining))}function Cf(e){e.timer!==void 0&&(clearTimeout(e.timer),e.timer=void 0,e.remaining=Math.max(1,e.remaining-(Date.now()-e.startedAt)))}function Mf(e,t){let o=t.type??"info",n=s("button",{class:Ce("close"),attrs:{type:"button","aria-label":"Dismiss","data-bloom":"control"},on:{click:a=>{a.stopPropagation(),Ve(e)}}},T("close")),r=t.action&&s("button",{class:Ce("action"),text:t.action.label,attrs:{type:"button","data-bloom":"control"},on:{click:a=>{a.stopPropagation(),t.action?.onClick(),Ve(e)}}}),i=s("div",{class:`${Ce("card")} ${Ce(o)}`,attrs:{role:o==="error"?"alert":"status","data-bloom-notice":e}},s("span",{class:Ce("icon")},T(Ef[o])),s("div",{class:Ce("body")},s("div",{class:Ce("title"),text:t.title}),t.message&&s("div",{class:Ce("message"),text:t.message})),r,n);return t.onClick&&(i.classList.add(Ce("clickable")),i.addEventListener("click",()=>{t.onClick?.(),Ve(e)})),i}function Qn(e){let t=e.key??at("notice"),o=Tf();if(!o)return t;let n=Mf(t,e),r=zt.get(t),i={key:t,el:n,options:e,remaining:e.duration??Sf,startedAt:Date.now()};n.addEventListener("pointerenter",()=>Cf(i)),n.addEventListener("pointerleave",()=>Tl(i)),r?(clearTimeout(r.timer),r.el.replaceWith(n)):o.append(n),zt.set(t,i),Tl(i);for(let[a]of[...zt].slice(0,Math.max(0,zt.size-qf)))Ve(a);return t}function Ve(e){let t=zt.get(e);t&&(zt.delete(e),clearTimeout(t.timer),t.el.remove(),t.options.onClose?.())}var Lf=new q("Landmarks"),kf=2e3,If=1e4,Bf=1024,Cl={thread:{applies:()=>!!b(),selectors:[u.turn]},composer:{applies:()=>Nt()||Hn()||!!b(),selectors:[u.composerInput]},sidebar:{applies:()=>innerWidth>=Bf,selectors:[u.sidebarScroll,u.rail,u.oldSidebar,u.oldRail]}},Of={BetterNavigator:["thread"],BetterQuotes:["thread"],MessageTimestamps:["thread"],StarChats:["thread"],UserQuotes:["thread"],ComposerOpacity:["composer"],Continue:["composer"],InputHistory:["composer"],PromptQueue:["composer"],ChatListStatus:["sidebar"],CustomSidebarIdentity:["sidebar"],NoSidebarIdentity:["sidebar"],SidebarIdentityOpacity:["sidebar"]},jt=new Map,zn=new Set;function Pf(){let e=Date.now();for(let[t,{applies:o,selectors:n}]of Object.entries(Cl)){if(!o()){jt.delete(t);continue}if(n.some(i=>document.querySelector(i))){jt.delete(t),zn.delete(t);continue}let r=jt.get(t)??e;jt.set(t,r),e-r>=If&&zn.add(t)}}function Rf(){let e=[];for(let[o,n]of Object.entries(Of)){let r=Z.get(o),i=r&&ze(r)?n.filter(a=>zn.has(a)):[];Fs(o,i.length?i.flatMap(a=>Cl[a].selectors):null),i.length&&e.push(o)}if(!e.length)return;let t=`2.0.99|${e.join(",")}`;ae("Settings","landmarkNotice")!==t&&(Ee("Settings","landmarkNotice",t),Lf.warn(`Page anchors missing for ${e.join(", ")}`),Qn({key:"landmarks",type:"warning",title:"Bloom++ can't find parts of this page",message:`${e.join(", ")} may not work until Bloom++ is updated. Details are in Bloom++ settings.`,duration:0}))}function Df(){if(document.hidden){jt.clear();return}Pf(),Rf()}function Ml(){return jt.clear(),zn.clear(),Sn(Df,kf)}var Ll={BetterNavigator:1793350808e3,BetterQuotes:179333264e4,ChatListStatus:1793351872e3,ChatStateFavicons:1790623094e3,Cleaner:1793267811e3,CompleteToast:1793354069e3,ComposerOpacity:1793344667e3,Continue:1790939902e3,CustomSidebarIdentity:1790658669e3,GreetingCustomizer:1793350808e3,InputHistory:1793351708e3,MessageTimestamps:1791080494e3,NoDictation:1793335268e3,NoShareLink:1790658669e3,NoSidebarIdentity:1790616549e3,PromptQueue:1793267321e3,RecentTopics:1793354069e3,ResponseNotification:1793354069e3,Settings:1793364973e3,SidebarIdentityOpacity:1790682605e3,StarChats:1793350808e3,StreamerMode:1793344667e3,TemporaryChat:1792014624e3,UserQuotes:1793345744e3,WiderChat:179333264e4};var ce="data-bloom-tip",bi=6,yi=8,ft,kl=null;function Wt(e){if(e===kl)return;if(kl=e,!e){ft?.remove();return}ft??=s("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),ft.textContent=e.getAttribute(ce),ge(ft);let t=e.getBoundingClientRect(),{width:o,height:n}=ft.getBoundingClientRect(),r=t.bottom+bi+n<=innerHeight-yi;ft.style.left=`${fe(t.left+t.width/2-o/2,yi,innerWidth-o-yi)}px`,ft.style.top=`${r?t.bottom+bi:t.top-bi-n}px`}var Il=e=>e instanceof Element?e.closest(`[${ce}]`):null;function Bl(){let e=new AbortController,t={passive:!0,signal:e.signal};return document.addEventListener("pointerover",o=>Wt(Il(o.target)),t),document.addEventListener("pointerout",o=>o.relatedTarget||Wt(null),t),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&Wt(Il(o.target)),t),document.addEventListener("focusout",()=>Wt(null),t),document.addEventListener("pointerdown",()=>Wt(null),t),()=>{e.abort(),Wt(null)}}function Je(e,t,o,n=!1){let r=s("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let a=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(a)),t(a)===!1&&r.setAttribute("aria-checked",String(!a))}),r}function N(e,t,o){return s("button",{class:vn("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button","data-bloom":"control"},on:{click:t}})}function U(e,t,o,n){let r=s("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":t,"data-bloom":"control",[ce]:t},on:{click:o}},T(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function jn(e,t,o,n,r,i){let a=s("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});a.value=String(e);let c=s("output",{text:`${a.value}${r}`});return a.addEventListener("input",()=>{c.textContent=`${a.value}${r}`,i(Number(a.value))}),s("div",{class:"bloom-slider"},a,c)}function vi(e,t,o){let n=s("select",{class:"bloom-select"},...t.map(r=>s("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function Ro(e,t,o="",n="text"){let r=s("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var Hf=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,Ol=/\S+@\S+\.\S+/,Nf=3,Uf=/^\/g\/(g-p-[^/]+)\//,Ff=/^g-p-[0-9a-f]+-?/i,Pl=e=>!!e.closest(".sr-only"),Ai=e=>!!e?.querySelector(u.menuButton);function Rl(){return[...document.querySelectorAll(u.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(Ai)).filter(e=>e!=null)}function Dl(){let e=[...document.querySelectorAll(u.oldProfile)];if(e.length)return e.map(o=>{let n=o.parentElement?.children.length===1?o.parentElement:o;return{kind:"profile",anchor:n,insert:r=>n.before(r)}});let t=Rl().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(u.rail)){let n=[...o.children].find(Ai);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}var wi=e=>!e.closest("[data-bloom]")&&(!!e.querySelector("img, [class*=rounded-full]")||Fl(e).some(t=>!Pl(t))),Hl=e=>[...e.parentElement?.children??[]].find(t=>t!==e&&t instanceof HTMLElement&&wi(t))??null;function Nl(){let e=[...document.querySelectorAll(u.oldProfile)];return e.length?e:[...Rl(),...[...document.querySelectorAll(u.rail)].map(o=>[...o.children].findLast(Ai))].map(o=>[...o?.querySelectorAll(u.menuButton)??[]].findLast(n=>wi(n)||Hl(n))).filter(o=>o!=null)}var Ul=()=>Nl().map(e=>wi(e)?e:Hl(e)).filter(e=>e!=null);function Fl(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!y(t.textContent??"")&&!(t instanceof SVGElement))}var Gf=e=>{if(/rounded-full/.test(e.getAttribute("class")??""))return!0;if(!e.clientWidth)return!1;let{borderRadius:t}=getComputedStyle(e);return t.includes("%")||Number.parseFloat(t)>=e.clientWidth/2};function Wn(e,t,o){for(let n of e.querySelectorAll(`[${t}]`))n!==o&&n.removeAttribute(t);o&&!o.hasAttribute(t)&&o.setAttribute(t,"")}function Yf(e,t){if(y(e.textContent??"").length>Nf)return null;let o=e.closest("button");for(let n=e;n&&n!==t&&n!==o;n=n.parentElement)if(Gf(n))return n;return null}function xi(e,t){e.hasAttribute(`data-bloom-${t}`)||e.setAttribute(`data-bloom-${t}`,"");let o=e.querySelector("img:not([data-bloom] img)"),n=Fl(e),r=o?null:n.map(m=>Yf(m,e)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),a=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");Wn(e,`data-bloom-${t}-avatar`,a);let c=n.filter(m=>!a?.contains(m)&&!Pl(m)),l=c.find(m=>Hf.test(y(m.textContent??""))),d=c.find(m=>Ol.test(m.textContent??""));Wn(e,`data-bloom-${t}-plan`,l),Wn(e,`data-bloom-${t}-email`,d),Wn(e,`data-bloom-${t}-name`,c.find(m=>m!==l&&m!==d))}function Kf(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function Vn(){return Nl().map(Kf).find(e=>e!=null)??[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&(Ol.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var pt=e=>[...document.querySelectorAll(u.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&di(t.href)===e);function Gl(e){let t=pt(e).find(o=>y(o.textContent??""));return t?y(t.textContent??""):null}function Yl(e){let t=new URL(e,location.origin).pathname.match(Uf)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!di(n.href)&&y(n.textContent??""));return o?y(o.textContent??""):t.replace(Ff,"").replaceAll("-"," ")||null}var Si=0,Jn;function Qf(e){if(!Y(e))return;for(let o of Ul())xi(o,"profile");let t=Vn();t&&xi(t,"menu")}function Me(){Si++;let e=!0;return mt().then(()=>{e&&Si&&!Jn&&(Jn=M(Qf))}),()=>{e&&(e=!1,!--Si&&(Jn?.(),Jn=void 0))}}var qi=["showSidebarEntry","showSidebarEntryOnHover","showAccountMenuEntry"],Vt={showSidebarEntry:!0,showSidebarEntryOnHover:!1,showAccountMenuEntry:!1},Ei=e=>Object.hasOwn(Vt,e),Ti=e=>ae("Settings",e)??Vt[e],Kl=(e,t)=>!Ei(e)||t!==!1||qi.some(o=>o!==e&&Ti(o));var zf=new q("Themes"),jf=/^https:\/\/\S+\.css(?:[?#]|$)/i,Wf=/\/\*\*[^]*?@name[ \t]+([^\n*]+)/,K=g({themes:{type:"custom",default:[]},quickCss:{type:"custom",default:""},quickCssEnabled:{type:"custom",default:!0}});async function Ql(e){let t=new TextDecoder().decode(await yn(e));if(!t.trim())throw new Error("Theme file is empty.");return t}var Zn=(e,t)=>{K.store.themes=K.store.themes.map(o=>o.id===e?{...o,...t}:o)},zl=e=>{K.store.themes=K.store.themes.filter(t=>t.id!==e)};async function jl(e){if(!jf.test(e))throw new Error("Enter an https URL that ends in .css.");if(K.store.themes.some(n=>n.url===e))throw new Error("This theme is already added.");let t=await Ql(e),o=t.match(Wf)?.[1]?.trim()||decodeURIComponent(new URL(e).pathname.split("/").pop()??e).replace(/\.css$/i,"").replaceAll(/[-_]/g," ");K.store.themes=[...K.store.themes,{id:at("theme"),name:o,url:e,css:t,enabled:!0}]}function Wl(e,t,o){if(!t.trim())throw new Error("Name is required.");if(!o.trim())throw new Error("CSS is required.");e?Zn(e,{name:t.trim(),css:o}):K.store.themes=[...K.store.themes,{id:at("theme"),name:t.trim(),css:o,enabled:!0}]}async function Vf(){await Promise.all(K.store.themes.filter(e=>e.url&&e.enabled).map(async({id:e,url:t,name:o})=>{try{let n=await Ql(t??"");K.store.themes.find(r=>r.id===e)?.css!==n&&Zn(e,{css:n})}catch(n){zf.warn(`Failed to refresh theme "${o}"`,n)}}))}var Vl=f({name:"Themes",description:"Applies Bloom++ themes and Quick CSS.",authors:["Bloom contributors"],tags:[],icon:"spark",required:!0,hidden:!0,startAt:"Init",settings:K,styles:()=>[...K.store.themes.filter(e=>e.enabled).map(e=>e.css),K.store.quickCssEnabled?K.store.quickCss:""].join(`
`),start(){Vf()}});var Q=C("bloom-settings-"),Jf=3e3,Jl=(e,t)=>{let o=s("textarea",{class:`bloom-input ${Q("css")}`,attrs:{spellcheck:"false",placeholder:"Paste your CSS here...","aria-label":t}});return o.value=e,o},Ci=(e,t)=>s("div",{class:Q("section-header")},s("div",{class:Q("field-label"),text:e}),s("div",{class:Q("field-desc"),text:t}));function Zl(){let{quickCss:e,quickCssEnabled:t}=K.store,o=Jl(e,"Quick CSS");return o.disabled=!t,o.addEventListener("input",()=>{K.store.quickCss=o.value}),s("div",{class:Q("section")},s("div",{class:Q("field","field-inline")},Ci("Quick CSS","Your own CSS, applied on every page as you type."),Je(t,n=>{K.store.quickCssEnabled=n,o.disabled=!n},"Enable Quick CSS")),o)}function $l(){let e=s("div",{class:Q("section")}),t=null,o=()=>s("div",{class:Q("section-error"),attrs:{role:"alert"}});function n(){let l=s("input",{class:"bloom-input",attrs:{type:"url",placeholder:"https://raw.githubusercontent.com/...","aria-label":"Theme URL"}}),d=o(),m=N("Add",async()=>{m.disabled=!0,d.textContent="";try{await jl(l.value.trim()),c()}catch(h){d.textContent=h instanceof Error?h.message:String(h),m.disabled=!1}});return s("div",{class:Q("section-block")},Ci("Online themes","Load a theme from a .css URL. It is fetched again on every page load, so updates apply."),s("div",{class:Q("section-row")},l,m),d)}function r(){let l=t==="new"?null:t,d=s("input",{class:"bloom-input",attrs:{placeholder:"My theme","aria-label":"Theme name"}});d.value=l?.name??"";let m=Jl(l?.css??"","Theme CSS"),h=o();return s("div",{class:Q("section-block")},d,m,h,s("div",{class:Q("section-row")},N("Save",()=>{try{Wl(l?.id??null,d.value,m.value),t=null,c()}catch(D){h.textContent=D instanceof Error?D.message:String(D)}}),N("Cancel",()=>{t=null,c()})))}function i(){return s("div",{class:Q("section-block")},s("div",{class:Q("field","field-inline")},Ci("Local themes","CSS stored only on this device."),!t&&N("New local theme",()=>{t="new",c()})),t&&r())}function a(l){let d,m=U("trash","Remove",()=>{if(d){clearTimeout(d),zl(l.id),c();return}m.setAttribute("aria-pressed","true"),m.setAttribute(ce,"Click again to remove"),d=setTimeout(()=>{d=void 0,m.removeAttribute("aria-pressed"),m.setAttribute(ce,"Remove")},Jf)});return s("div",{class:Q("theme")},s("div",{class:Q("theme-text")},s("div",{class:`${Q("card-name")} bloom-truncate`,text:l.name}),s("div",{class:`${Q("field-desc")} bloom-truncate`,text:l.url??"Local"})),l.url?U("copy","Copy URL",()=>void bn(l.url??"")):U("edit","Edit",()=>{t=l,c()}),m,Je(l.enabled,h=>Zn(l.id,{enabled:h}),`Enable ${l.name}`))}function c(){let{themes:l}=K.store;e.replaceChildren(n(),i(),l.length?s("div",{class:Q("themes")},...l.map(a)):s("div",{class:Q("empty"),text:"No themes yet."}))}return c(),e}var Zf=new q("SettingsPanel"),p=C("bloom-settings-"),$f=10080*60*1e3,Xf=3e3,Xl="Toggle features. Some need a reload. Click the sliders icon to configure.",_f="Can't find its place on this page. It may need an update.",ep=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],tp=[{id:"plugins",label:"Plugins"},{id:"themes",label:"Themes"},{id:"css",label:"Quick CSS"}],op=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],np={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},ec=new Set(["chat","ui","privacy"]),z=null,Do="plugins",ht="all",Mi="all",$n="",Li=[],tc=()=>[...Z.values()].filter(e=>!e.hidden),rp=e=>!!e.updatedAt&&Date.now()-e.updatedAt<$f;function ip(e){switch(ht){case"favorites":return Tn.has(e.name);case"recent":return rp(e);case"all":return!0;case"other":return!e.tags.some(t=>ec.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(ht)}}function ap(e){switch(Mi){case"all":return!0;case"enabled":return ze(e);case"disabled":return!ze(e)}}function sp(e){let t=$n.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function lp(e){let t=En.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return ht==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var oc=e=>e.settings?.def??{},Bi=e=>Object.values(oc(e)).some(t=>t.type!=="custom");function cp(e,t,o){let n=ae(e.name,t)??ti(o),r=i=>{if(e.name==="Settings"&&!Kl(t,i))return!1;Ee(e.name,t,i)};switch(o.type){case"boolean":return Je(n,r,o.description??t);case"slider":return jn(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return vi(n,o.options,r);case"string":return Ro(n,r,o.placeholder);case"number":return Ro(String(n),i=>r(Number(i)),"","number");case"component":{let i=s("div",{class:p("component")});return Li.push(o.render(i)),i}case"custom":return null}}var up=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function Oi(e){if(!z)return;let t=Object.entries(oc(e)).filter(([,i])=>i.type!=="custom").map(([i,a])=>{let c=cp(e,i,a),l=a.type==="boolean",d=a.type!=="component"&&s("div",{class:p("field-label"),text:up(i)}),m=a.description&&s("div",{class:p("field-desc"),text:a.description});return s("div",{class:p("field",l?"field-inline":"field-stacked")},(d||m)&&s("div",{class:p("field-text")},d,m),c)}),o,n=N("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},Xf);return}clearTimeout(o),e.settings?.reset(),Jt(),Oi(e)},"danger"),r=s("div",{class:p("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&Jt()}},s("div",{class:p("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},s("div",{class:p("popup-header")},s("div",{class:p("card-icon")},T(e.icon)),s("div",{class:p("popup-title")},s("div",{class:p("card-name"),text:e.name}),s("div",{class:p("popup-authors"),text:e.authors.join(", ")})),U("close","Close",Jt)),s("p",{class:p("popup-desc"),text:e.description}),s("div",{class:p("fields")},...t),s("div",{class:p("popup-footer")},n)));z.querySelector(`.${p("modal")}`)?.append(r)}function Jt(){for(let e of Li)e();Li=[],z?.querySelector(`.${p("popup-backdrop")}`)?.remove()}function _l(e){let t=ze(e),o=Tn.has(e.name),n=En.has(e.name),r=!!e.required,i=Ns(e.name);return s("div",{class:[p("card",t?"card-on":"card-off"),r?p("card-required"):""].filter(Boolean).join(" ")},s("div",{class:p("card-top")},s("div",{class:p("card-icon")},T(e.icon)),s("div",{class:p("card-actions")},U("star",o?"Unstar":"Star",()=>{Tn.toggle(e.name),gt()},o),r?null:U("pin",n?"Unpin":"Pin to top",()=>{En.toggle(e.name),gt()},n),r?s("span",{class:p("required-mark"),attrs:{"aria-label":"Required",[ce]:"This plugin is required for Bloom++ to work"}},T("alert")):null,Bi(e)&&U("gear","Settings",()=>Oi(e)),Je(t,a=>Qs(e,a),r?`${e.name} is required`:`Enable ${e.name}`,r))),s("div",{class:p("card-name")},e.name,Hs(e.name)&&s("span",{class:p("new-badge"),text:"New"})),s("div",{class:p("card-desc"),text:e.description,title:e.description}),i&&s("div",{class:p("card-issue"),attrs:{[ce]:`Missing: ${i.join(", ")}`}},T("alert"),s("span",{text:_f})),s("div",{class:p("card-footer"),text:e.authors.join(", ")}))}function nc(){let e=tc().some(o=>!o.tags.some(n=>ec.has(n)));z?.querySelector(`.${p("tabs")}`)?.replaceChildren(...ep.filter(o=>o.id!=="other"||e).map(o=>s("button",{class:p("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===ht)},on:{click:()=>{ht=o.id,nc(),gt()}}})))}function gt(){if(!z)return;let e=tc().filter(ip),t=z.querySelector(`.${p("search")} input`);t&&(t.placeholder=`Search ${hn(e.length,"plugin")}...`);let o=lp(e.filter(d=>sp(d)&&ap(d))),n=ht==="all",r=n?o.filter(d=>!d.required):o,i=n?o.filter(d=>d.required):[],a=[...r.map(_l),...i.length?[s("div",{class:p("required-break"),attrs:{role:"separator"}}),...i.map(_l)]:[]],c=$n.trim()?"No plugins match your search.":np[ht]??"No plugins available.";z.querySelector(`.${p("grid")}`)?.replaceChildren(...a.length?a:[s("div",{class:p("empty"),text:c})])}function dp(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),z?.querySelector(`.${p("popup-backdrop")}`)?Jt():Zt())}var rc,ki;function Ii(){let e=z?.querySelector(`.${p("body")}`);if(!z||!e)return;for(let o of z.querySelectorAll(`.${p("nav-item")}`))o.setAttribute("aria-selected",String(o.getAttribute("data-section")===Do));if(Jt(),Do==="themes"){e.replaceChildren($l());return}if(Do==="css"){e.replaceChildren(Zl());return}let t=s("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});t.value=$n,t.addEventListener("input",()=>{$n=t.value,gt()}),e.replaceChildren(s("div",{class:p("tabs"),attrs:{role:"tablist"}}),s("div",{class:p("toolbar")},s("label",{class:p("search")},T("search"),t),vi(Mi,op,o=>{Mi=o,gt()})),s("div",{class:p("grid")})),nc(),gt(),t.focus()}function $t(e,t){e&&(Do=e),z?(Ii(),hi(z)):mp();let o=t&&Z.get(t);o&&Oi(o)}function mp(){z=s("div",{class:`bloom-root ${p("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:e=>e.target===e.currentTarget&&Zt()}},s("div",{class:p("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},s("div",{class:p("header")},s("div",{class:p("logo")},T("bloom")),s("h2",{class:p("title"),text:"Bloom++"}),s("span",{class:p("hint"),attrs:{"aria-label":Xl,tabindex:"0",[ce]:Xl}},T("info")),s("div",{class:p("nav"),attrs:{role:"tablist"}},...tp.map(e=>s("button",{class:p("nav-item"),text:e.label,attrs:{type:"button",role:"tab","data-section":e.id},on:{click:()=>{Do=e.id,Ii()}}}))),s("span",{class:p("version"),text:"v2.0.99"}),U("close","Close",Zt)),s("div",{class:p("body")}))),z.addEventListener("keydown",e=>e.stopPropagation()),ki=new AbortController,document.addEventListener("keydown",dp,{capture:!0,signal:ki.signal}),ge(z),Ii(),rc=Ws(gt),Zf.debug("Opened")}function Zt(){Jt(),ki?.abort(),rc?.(),z?.remove(),z=null}var Xn=()=>z?Zt():$t();var ic=`/*
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
`;var ue=C("bloom-entry-"),pp=4,Ri="--bloom-entry-x",Di=1,ac=4,sc=8,gp=150,he=g({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar.",default:Vt.showSidebarEntry},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:Vt.showSidebarEntryOnHover},showAccountMenuEntry:{type:"boolean",description:"Show Bloom++ at the top of the account menu.",default:Vt.showAccountMenuEntry},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:e=>(e.append(N("Reset position",()=>{he.store.entryPosition=Di})),()=>e.replaceChildren())},showBloomMenu:{type:"boolean",description:"Hovering the Bloom++ row in the account menu opens a menu with Plugins, Themes, Quick CSS and plugin settings.",default:!0},menuPlugins:{type:"component",description:"Plugins listed in that menu.",render:e=>(e.append(...uc().map(t=>s("div",{class:ue("menu-pick")},T(t.icon),s("span",{class:"bloom-truncate",text:t.name}),Je(dc(t),o=>{he.store.menuPicks={...he.store.menuPicks,[t.name]:o}},`List ${t.name} in the menu`)))),()=>e.replaceChildren())},entryPosition:{type:"custom",default:Di},menuPicks:{type:"custom",default:{}}}),bt=new Map,Ze=null,Ho,uc=()=>[...Z.values()].filter(e=>!e.hidden).toSorted((e,t)=>e.name.localeCompare(t.name)),dc=e=>he.store.menuPicks[e.name]??Bi(e),lc=!1,Pi=[];function hp(e,t,o){let n=e.currentTarget,r=t.clientWidth-n.offsetWidth;if(e.button!==0||r<=0||!t.classList.contains(ue("hover")))return;let i=he.store.entryPosition,a=i,c=!1,l=new AbortController;n.setPointerCapture(e.pointerId),n.addEventListener("pointermove",m=>{!c&&Math.abs(m.clientX-e.clientX)<pp||(c=!0,o(),a=fe(i+(m.clientX-e.clientX)/r,0,Di),t.style.setProperty(Ri,String(a)))},{signal:l.signal});let d=()=>{l.abort(),c&&(he.store.entryPosition=a,t.style.removeProperty(Ri))};n.addEventListener("pointerup",d,{signal:l.signal}),n.addEventListener("lostpointercapture",d,{signal:l.signal})}function bp(e){let t=!1,o=s("button",{class:ue("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),t||Xn(),t=!1},pointerdown:r=>{t=!1,e!=="rail"&&hp(r,n,()=>{t=!0})}}},T("bloom"),e!=="rail"&&s("span",{class:ue("label"),text:"Bloom++"})),n=s("div",{class:`bloom-root ${ue("wrap")} ${ue(e)}`,attrs:{"data-bloom":"entry"}},o);return n}function No(){clearTimeout(Ho),Ze?.remove(),Ze=null}function mc(){clearTimeout(Ho),Ho=setTimeout(No,gp)}var fc=e=>e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0}));function yp(e,t){if(clearTimeout(Ho),Ze?.isConnected||!he.store.showBloomMenu)return;let o=(l,d,m)=>s("div",{class:ue("flyout-item"),attrs:{role:"menuitem"},on:{pointerdown:h=>{h.button===0&&(h.preventDefault(),h.stopPropagation(),No(),fc(t),m())}}},T(d),s("span",{class:"bloom-truncate",text:l})),n=uc().filter(dc);Ze=s("div",{class:`bloom-root ${ue("flyout")}`,attrs:{"data-bloom":"menu-flyout",role:"menu","aria-label":"Bloom++"},on:{pointerenter:()=>clearTimeout(Ho),pointerleave:mc}},o("Plugins","bloom",()=>$t("plugins")),o("Themes","spark",()=>$t("themes")),o("Quick CSS","edit",()=>$t("css")),n.length>0&&s("div",{class:ue("flyout-break"),attrs:{role:"separator"}}),...n.map(l=>o(l.name,l.icon,()=>$t("plugins",l.name)))),ge(Ze);let r=t.getBoundingClientRect(),{width:i,height:a}=Ze.getBoundingClientRect(),c=r.right+ac;Ze.style.left=`${c+i>innerWidth?r.left-i-ac:c}px`,Ze.style.top=`${fe(e.getBoundingClientRect().top,sc,innerHeight-a-sc)}px`}function vp(e){let t=s("div",{class:`bloom-root ${ue("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),No(),fc(e),Xn()},pointerenter:()=>yp(t,e),pointerleave:mc}},T("bloom"),s("span",{text:"Bloom++"}),he.store.showBloomMenu&&s("span",{class:ue("menu-chevron")},T("chevron"))),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function cc(){No();for(let e of document.querySelectorAll('[data-bloom="entry"], [data-bloom="menu-entry"]'))e.remove();bt.clear()}function Ap(){for(let e of document.querySelectorAll('[data-bloom="menu-entry"]'))e.remove()}function pc(){let{showSidebarEntry:e,showSidebarEntryOnHover:t,showAccountMenuEntry:o}=he.store,n=e||t?Dl():[],r=new Set(n.map(a=>a.anchor));for(let[a,c]of bt)a.isConnected&&r.has(a)||(c.remove(),bt.delete(a));for(let a of document.querySelectorAll('[data-bloom="entry"]'))[...bt.values()].includes(a)||a.remove();for(let a of n){let c=bt.get(a.anchor);if(c?.isConnected||!we(a.anchor))continue;let l=c??bp(a.kind);bt.set(a.anchor,l),a.insert(l)}for(let a of bt.values())a.classList.toggle(ue("hover"),!e);if(!o){Ap();return}let i=Vn();i&&!i.querySelector('[data-bloom="menu-entry"]')&&vp(i),i||No()}function wp(e){qi.some(Ti)||(he.store[Ei(e??"")?e:"showSidebarEntry"]=!0),pc()}var gc=f({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:he,styles:()=>`${ic}.${ue("hover")}{${Ri}:${he.store.entryPosition}}`,start(){cc(),Pi=[M(pc),Bl(),Me()],!lc&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",Xn),lc=!0)},stop(){for(let e of Pi)e();Pi=[],cc(),Zt()},onSettingsChange:wp});var xp=80,Sp=420;function Hi(e,t,o){return(e.x-o.x)*(t.y-o.y)-(t.x-o.x)*(e.y-o.y)}function qp(e,t,o,n){let r=Hi(e,t,o),i=Hi(e,o,n),a=Hi(e,n,t);return!((r<0||i<0||a<0)&&(r>0||i>0||a>0))}function Ep(e,t){let o=(t.left+t.right)/2-(e.left+e.right)/2,n=(t.top+t.bottom)/2-(e.top+e.bottom)/2;if(Math.abs(o)>=Math.abs(n)){let i=o<0?t.right:t.left;return[{x:i,y:t.top},{x:i,y:t.bottom}]}let r=n<0?t.bottom:t.top;return[{x:t.left,y:r},{x:t.right,y:r}]}function hc(e,t){let o=fe(e.x,t.left,t.right),n=fe(e.y,t.top,t.bottom);return Math.hypot(e.x-o,e.y-n)}function _n(e){let t=e.closeDelay??xp,o=e.towardDelay??Sp,n=0,r=!1,i=null,a=null,c=()=>{document.removeEventListener("pointermove",v,!0)},l=()=>{n&&window.clearTimeout(n),n=0,c(),i=null,a=null},d=()=>{l(),r&&(r=!1,e.setHeld(!1))},m=()=>{r||(r=!0,e.setHeld(!0))},h=E=>{n&&window.clearTimeout(n),n=window.setTimeout(d,E)},D=E=>{let ee=e.panel(),it=e.trigger();if(!ee||!i)return!1;let te=ee.getBoundingClientRect();if(te.width<=0&&te.height<=0)return!1;let Re=it?.getBoundingClientRect(),[me,Wr]=Re&&(Re.width||Re.height)?Ep(Re,te):[{x:te.left,y:te.top},{x:te.right,y:te.bottom}];return qp(E,i,me,Wr)?!0:a!=null&&hc(E,te)<hc(a,te)-.25},v=E=>{let ee={x:E.clientX,y:E.clientY};if(e.over(E.target)){l();return}D(ee)?h(o):d(),a=ee};return{enter(){l()},leave(E){if(e.over(E.relatedTarget)){l();return}i={x:E.clientX,y:E.clientY},a=i,m(),document.addEventListener("pointermove",v,!0),h(t)},dispose(){l(),r=!1}}}var bc=`/*
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
`;var L=C("bloom-nav-"),or=80,Cp=1200,Mp=2,yc=3e4,Lp=200,kp=.9,Ip=.28,Bp=24,Xt=8,Op=80,Pp=12,Ni=80,xc=`${u.rightPanel}, ${u.summaryPanel}`,Rp={user:"\u2753",assistant:"\u{1F916}"},Dp=["wheel","touchmove","pointerdown"],rr=g({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),A=null,R=[],be=-1,yt=-1,_t=null,vt="",Fi=0,Gi=[],Yo=null,er=null,tr=new Set,De,Uo,He,Yi="",Fo=[],nr=null,Ki=new Set,Hp=e=>rr.store.showAssistant||e.role==="user",Np=e=>e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.messageIds[0]||e.role;function Up(e){return{role:e.role,summary:Yt(e),ids:e.messageIds,turn:e,streaming:e.streaming}}function Sc(e,t){let o=e.entries.at(-1);if(o?.role==="assistant"&&t.role==="assistant"){e.entries[e.entries.length-1]={...t,ids:[...new Set([...o.ids,...t.ids])]};return}e.entries.push(t)}function Fp(){let e=[];for(let t of je()){let o=Up(t),n=Np(t),r=e.at(-1);r?.key===n?Sc(r,o):e.push({key:n,entries:[o]})}return e}function Gp(){let e=[];for(let t of Ae(b())?.chain??[]){let o={role:t.role,summary:Un(t),ids:[t.id],turn:null,streaming:!1},n=e.at(-1);t.role==="assistant"&&n?Sc(n,o):e.push({key:t.id,entries:[o]})}return e}var eo=e=>e.entries.flatMap(t=>t.ids);function Qi(e,t){let o=new Set(eo(e));return eo(t).some(n=>o.has(n))}var At=e=>y(e.entries.find(t=>t.role==="user")?.summary??""),Ui=(e,t)=>e.filter(o=>At(o)===t).length,zi=e=>({...e,turn:null,streaming:!1});function Yp(e,t){let o=new Set(t.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return e.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return zi(r);let a=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return a&&a!==n.key?zi(r):r})}))}function Kp(e,t){let o=t.entries.map((n,r)=>{let i=e.entries[r];if(!i)return n;let a=[...new Set([...n.ids,...i.ids])];return{...n,ids:a,summary:n.summary||i.summary}});for(let n of e.entries.slice(o.length))o.push(zi(n));return{key:e.key,entries:o}}function qc(){let e=Io();if(!e)return!1;let t=e.clientHeight-e.scrollHeight;return e.scrollTop-t<=Math.abs(e.scrollTop)}function Qp(e,t){let o=Yp(e,t);if(!t.length)return o;if(!o.length)return t;let n=t.findIndex(l=>o.some(d=>d.key===l.key));if(n<0)return qc()?t.concat(o):o.concat(t);let r=t[n]?.key,i=o.findIndex(l=>l.key===r),a=o.slice(0,i).concat(t.slice(0,n),o.slice(i)),c=a.findIndex(l=>l.key===r);for(let l=n;l<t.length;l++){let d=t[l];if(!d)continue;let m=a.findIndex(h=>h.key===d.key);if(m>=0){let h=a[m];h&&(a[m]=Kp(h,d)),c=m}else a.splice(c+1,0,d),c++}return a}function zp(e,t){let o=0,n=0,r=0;for(let i=1-e.length;i<t.length;i++){let a=0,c=0;for(let d=0;d<e.length;d++){let m=t[d+i],h=e[d];!m||!h||(Qi(h,m)?(a+=3,c++):At(h)&&At(h)===At(m)&&a++)}let l=qc()?i<r:i>r;(a>o||a===o&&c>n||a===o&&c===n&&l)&&(o=a,n=c,r=i)}return{score:o,offset:r}}function jp(e,t){let o=e.entries.map((n,r)=>{let i=t.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of t.entries.slice(o.length))o.push({...n,turn:null});return{key:e.key,entries:o}}function Wp(e){return e.map(t=>({key:t.key,entries:t.entries.map(o=>({...o}))}))}function Vp(e,t){if(!t.length)return e;if(!e.length)return t;let{score:o,offset:n}=zp(e,t),r=Wp(e);if(o>0)for(let c=0;c<r.length;c++){let l=t[c+n],d=r[c];if(!l||!d)continue;let m=At(d),h=!!m&&m===At(l)&&Ui(e,m)===1&&Ui(t,m)===1;(Qi(d,l)||h)&&(r[c]=jp(d,l))}let i=[],a=[];for(let c=0;c<t.length;c++){let l=t[c];if(!l)continue;let d=At(l);!d||Ui(r,d)>0||r.some(m=>Qi(m,l))||(o>0&&c<n?i.push(l):a.push(l))}return i.concat(r,a)}var ji=e=>e.entries.some(t=>t.turn?.el.isConnected);function Jp(e,t,o){let n=e.findIndex(i=>eo(i).includes(t));if(n>=0)return n+1;let r=e.find(ji);return o&&r&&eo(r).includes(o)?0:e.length}function Zp(e){if(nr){let{parent:t,user:o}=nr;for(let n of e.slice(Jp(e,t,o))){let r=eo(n);if(!ji(n)&&!(o&&r.includes(o)))for(let i of r)Ki.add(i)}}return e.filter(t=>ji(t)||!eo(t).some(o=>Ki.has(o)))}function Ec(){Fo=[],nr=null,Ki.clear()}function $p(){let e=pl();e!==Yi&&(Yi=e,Ec());let t=Fp(),o=Gp();return!t.length&&!o.length&&!fl()?(Fo=[],[]):(Fo=Zp(Vp(Qp(Fo,t),o)),Fo.flatMap(n=>n.entries).filter(Hp))}function Xp(e){for(let o of e)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!H().generating||e.some(o=>o.streaming))return;let t=e.at(-1);t&&(t.role==="assistant"||!rr.store.showAssistant?t.streaming=!0:e.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function Tc(){let e=$p();return Xp(e),e}function Cc(e){let t=e.getBoundingClientRect(),o=$()?.getBoundingClientRect().top,n=Math.min(t.bottom,o&&o>t.top?o:t.bottom);return{top:t.top,bottom:n}}function Mc(e){return((e.matches(".whitespace-pre-wrap, .markdown, .prose, [data-markdown-text-style]")?e:e.querySelector(".whitespace-pre-wrap")??e.querySelector(".markdown, .prose, [data-markdown-text-style]"))??e).getBoundingClientRect().top}function vc(e){let t=R[e]?.turn?.el;return t?.isConnected?t:null}function _p(e){if(!R.length)return null;let t=e.scrollHeight-e.clientHeight,o=pi(e),n=Math.min(e.scrollTop,0),r=o?-n:t-e.scrollTop,i=o?t+n:e.scrollTop,a=t<=Xt||r<=Xt,c=t>Xt&&i<=Xt,{top:l,bottom:d}=Cc(e),m=vc(0),h=m?Mc(m):Number.NaN,D=!!m&&h>=l-Xt&&h<=l+48,v=vc(R.length-1),E=v?.getBoundingClientRect().bottom??Number.NaN,ee=!!v&&E<=d+Xt&&E>=d-Op;return a||ee?"bottom":c||D?"top":null}function eg(e){let{top:t,bottom:o}=Cc(e),n=t+Math.max(o-t,0)*Ip,r=[],i=-1;if(R.forEach((c,l)=>{let d=c.turn?.el;if(!d?.isConnected){r.push(Number.NaN);return}let m=Mc(d);r.push(m),i<0&&(i=l),m<=n&&(i=l)}),i<0)return Math.max(R.findIndex(c=>c.turn),0);let a=r[be];return Number.isFinite(a)?i===be?be:i>be?i:a<=n+Bp?be:i:i}function tg(e){let t=_p(e);return t==="bottom"?R.length-1:t==="top"?0:eg(e)}function Ac(e){rr.store.jumpEffect==="border"&&(e.classList.add(L("flash")),setTimeout(()=>e.classList.remove(L("flash")),Cp))}function ir(e){let t=R[e],o=Io();if(!t||!o)return;if(!t.turn&&!t.ids.length){yt=e,Go(),o.scrollTo({top:pi(o)?0:o.scrollHeight});return}yt=e,_t=e?null:{chat:b(),first:t.ids[0],until:Date.now()+yc},Go();let n=t.turn?.el;if(n?.isConnected){let d=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:d<o.clientHeight*Mp?"smooth":"auto"}),Ac(n);return}let r=R.findIndex(d=>d.turn),i=r>=0&&e<r?-1:1,a=++Fi,c=Date.now()+yc,l=()=>{let d=Io();if(a!==Fi||Date.now()>c||!d)return;R=Tc();let m=R.find(D=>D.ids.some(v=>t.ids.includes(v)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),Ac(m),yt=R.findIndex(D=>D.turn?.el===m),Go();return}let h=d.scrollTop;d.scrollBy({top:i*d.clientHeight*kp,behavior:"instant"}),d.scrollTop===h?setTimeout(l,Lp):requestAnimationFrame(l)};l()}function og(e,t){return s("button",{class:L("row"),attrs:{type:"button","data-index":String(t),"data-message-id":e.ids[0]??""},on:{click:()=>ir(t)}},s("span",{text:Rp[e.role]}),s("span",{class:"bloom-truncate",text:Se(e.summary||"\u2026",or)}))}function ng(e,t){let o=e.offsetWidth?t.width/e.offsetWidth:1;return t.left+(e.clientLeft+e.clientWidth)*o}function rg(e){let t=1/0;for(let o of document.querySelectorAll(xc)){if(!lt(o))continue;let n=o.getBoundingClientRect();n.width<Ni||n.height<Ni||n.left<e.left+Ni||n.left<t&&(t=n.left)}return Number.isFinite(t)?t:null}function wc(e){if(!A)return;let t=e.getBoundingClientRect(),o=$()?.getBoundingClientRect().top,r=Math.min(t.bottom,o&&o>t.top?o:t.bottom)-t.top,i=Math.min(ng(e,t),rg(t)??1/0);A.style.right=`${document.documentElement.clientWidth-i+Pp}px`,A.style.top=`${t.top}px`,A.style.height=r>1?`${r}px`:""}function ig(){let e=Io();if(R=Tc(),!R.length||!e){He?.dispose(),He=void 0,A?.remove(),A=null,vt="";return}if(Yo!==e){Uo?.abort(),Uo=new AbortController,e.addEventListener("scroll",Ke(Go),{passive:!0,signal:Uo.signal});for(let n of Dp)e.addEventListener(n,kc,{passive:!0,signal:Uo.signal});Yo=e,De?.disconnect(),De=new ResizeObserver(()=>{e.isConnected&&wc(e)}),De.observe(e),er=null,tr=new Set}let t=$();if(t&&t!==er&&De&&(De.observe(t),er=t),De)for(let n of document.querySelectorAll(xc))tr.has(n)||(De.observe(n),tr.add(n));cg(),wc(e);let o=JSON.stringify(R.map(n=>[n.role,n.ids]));o!==vt?(vt=o,yt=-1,sg(),_t&&Date.now()<_t.until&&_t.chat===b()&&R[0]?.ids[0]!==_t.first&&ir(0)):ag(),Go()}function Go(){if(!A||!Yo)return;be=yt>=0?yt:tg(Yo),A.querySelectorAll(`.${L("tick")}`).forEach((t,o)=>t.classList.toggle(L("tick-current"),o===be)),A.querySelectorAll(`.${L("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===be)));let e=A.querySelector(`.${L("toc-head")}`);e&&(e.textContent=`${be+1} / ${R.length}`)}function ag(){A?.querySelectorAll(`.${L("tick")}`).forEach((e,t)=>{let o=R[t],n=Se(o.summary,or);e.title!==n&&(e.title=n),e.classList.toggle(L("tick-streaming"),o.streaming)}),A?.querySelectorAll(`.${L("row")}`).forEach(e=>{let t=e.lastElementChild,o=Se(R[Number(e.dataset.index)].summary||"\u2026",or);t&&t.textContent!==o&&(t.textContent=o)})}function sg(){A?.querySelector(`.${L("rail")}`)?.replaceChildren(...R.map((t,o)=>s("button",{class:vn(L("tick"),L(`tick-${t.role}`),t.streaming&&L("tick-streaming"),o===be&&L("tick-current")),title:Se(t.summary,or),attrs:{type:"button","aria-label":`Jump to message ${o+1}`,"data-message-id":t.ids[0]??""},on:{click:()=>ir(o)}}))),A?.querySelector(`.${L("toc-list")}`)?.replaceChildren(...R.map(og))}var Le=Ke(ig);function Wi(e){if(e===A)return;let t=e.__bloomNavStop;if(t&&t!==Vi)try{t()}catch{}e.isConnected&&e!==A&&e.remove()}function Lc(){let e=[...document.querySelectorAll('[data-bloom="navigator"]')];if(A&&!A.isConnected&&(A=null),A&&e.includes(A)){for(let t of e)Wi(t);return}A=e[0]??null;for(let t of e.slice(1))Wi(t)}function lg(){He?.dispose(),He=_n({over:e=>e instanceof Node&&!!A?.contains(e),trigger:()=>A?.querySelector(`.${L("rail")}`),panel:()=>A?.querySelector(`.${L("toc")}`),setHeld:e=>A?.classList.toggle(L("open"),e)})}function cg(){Lc(),A&&!A.querySelector(`.${L("rail")}`)&&(A.remove(),A=null,vt=""),A||(A=s("div",{class:`bloom-root ${L("root")}`,attrs:{"data-bloom":"navigator"},on:{pointerenter:()=>He?.enter(),pointerleave:e=>He?.leave(e)}},s("div",{class:L("rail")}),s("div",{class:L("bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:L("toc")},s("div",{class:L("toc-head")}),s("div",{class:L("toc-list")}))),vt=""),He||lg(),A.isConnected||document.body.append(A),A.querySelector(`.${L("tick")}`)||(vt=""),A.__bloomNavStop=Vi}function kc(){yt=-1,_t=null,Fi++}function Vi(){for(let e of Gi)e();Gi=[],Uo?.abort(),De?.disconnect(),De=void 0,Yo=null,er=null,tr=new Set,removeEventListener("keydown",Ic,!0),removeEventListener("resize",Le),He?.dispose(),He=void 0,A&&delete A.__bloomNavStop,A?.remove(),A=null,vt="",Ec(),Yi="";for(let e of document.querySelectorAll('[data-bloom="navigator"]'))Wi(e)}var ug=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function Ic(e){if(!A||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||ug(document.activeElement)||J("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:be-1,ArrowDown:be+1,Home:0,End:R.length-1}[e.key];if(o==null){kc();return}o<0||o>=R.length||(e.preventDefault(),e.stopPropagation(),ir(o))}var Bc=f({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:rr,styles:bc,start(){Lc(),Gi=[M(e=>Y(e)&&Le()),pe(Le),V.on("conversation",Le),V.on("generate-start",({parentId:e,userId:t})=>{e&&(nr={parent:e,user:t},Le())}),x.on("rise",Le),x.on("fall",Le)],addEventListener("keydown",Ic,!0),addEventListener("resize",Le,{passive:!0}),Le()},stop:Vi,onSettingsChange:Le});var Oc=`/*
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
`;var ne=C("bloom-quotes-"),na="BloomBetterQuotes",mg=40,Hc=8,fg=1800,Xi=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,Pc=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,wt=g({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),Ji,Zi,to,$i=!1,_i=0,ar=null,sr=null,Ne=null;function ra(){return location.pathname.match(/\/c\/(?!local-)([\w-]+)/)?.[1]??(new URLSearchParams(location.search).get("temporary-chat")==="true"?"temporary":"draft")}function cr(){try{let e=JSON.parse(sessionStorage.getItem(na)??"[]");return Array.isArray(e)?e.filter(t=>!!t&&typeof t=="object"&&typeof t.id=="string"&&typeof t.text=="string"&&!!t.text):[]}catch{return[]}}function ia(e){try{sessionStorage.setItem(na,JSON.stringify(e.slice(-mg)))}catch{}}function Ko(e){return cr().find(t=>t.id===e)?.text??""}function pg(e,t){let o=cr().filter(n=>n.id!==e);o.push({id:e,text:t}),ia(o)}function ea(e=ra()){ia(cr().filter(t=>t.id!==e)),lr()}function gg(e){let t=Ko("draft");if(!t||Ko(e))return;let o=cr().filter(n=>n.id!=="draft");o.push({id:e,text:t}),ia(o)}function ta(e){return`${e.getAttribute("aria-label")??""} ${e.getAttribute("title")??""}`}function hg(e){let t=ta(e);return Pc.test(t)&&!/quote|引用/.test(t)?!1:/quote|引用/.test(t)&&Xi.test(t)?!0:Xi.test(t)&&!Pc.test(t)}function Nc(e){let t=e.cloneNode(!0),o=[...t.querySelectorAll("button, [role='button']")],n=new Set(o.map(r=>r.getAttribute("aria-label")).filter(Boolean));for(let r of o)r.remove();for(let r of t.querySelectorAll("*"))!r.children.length&&n.has(y(r.textContent??""))&&r.remove();return y(t.textContent??"")}function bg(e){let t=$(),o=e.parentElement,n=0;for(;o&&o!==t&&n<5;){if(n++,o.matches(u.composerInput)||o.querySelector(u.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=Nc(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function ur(){let e=$();if(!e)return null;for(let t of e.querySelectorAll("button, [role='button']")){if(t.closest("[data-bloom]")||!hg(t))continue;let o=bg(t),n=o?Nc(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:t}}return null}function yg(e){let t=e.closest(u.searchUnit)??e.closest(u.oldMessage);return t&&(Ft(t)??t.getAttribute("data-message-author-role"))==="user"?t:null}function aa(e){return y(e).slice(0,48)}function vg(e,t){let o=aa(e);if(o.length<Hc)return null;let n=null;for(let r of Gt()){if(t&&(r===t||t.contains(r)||r.contains(t)))continue;let i=y(r.textContent??"");if(!i.includes(o))continue;let a=o.length/Math.max(i.length,1);(!n||a>n.score)&&(n={el:r,score:a})}return n?.el??null}function Ag(e,t){let o=aa(t),n=e;for(let r of e.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&y(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${ne("hit")}`)?.classList.remove(ne("hit")),n.classList.add(ne("hit")),window.clearTimeout(_i),_i=window.setTimeout(()=>n.classList.remove(ne("hit")),fg)}function Rc(e){let t=e.closest(u.timelineScroll)??document.scrollingElement;if(!(t instanceof HTMLElement)&&t!==document.scrollingElement)return;let o=e.getBoundingClientRect();if(o.height<1||!t)return;let n=t.getBoundingClientRect(),r=$()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,a=o.top+o.height/2-(n.top+i)/2;Math.abs(a)<8||t.scrollTo({top:t.scrollTop+a,behavior:"smooth"})}function sa(){if(!Ne||!ar?.isConnected)return;let e=ar.getBoundingClientRect();e.width<1||(Ne.style.top=`${Math.max(8,e.top+8)}px`,Ne.style.left=`${Math.max(8,e.right-Ne.offsetWidth-8)}px`)}function wg(e,t,o){ar=e,sr=t,Ne??=s("button",{class:`bloom-root ${ne("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),Ne.isConnected||document.body.append(Ne),Ag(e,o),sa()}function Dc(){Ne?.remove(),Ne=null,ar=null,sr=null,document.querySelector(`.${ne("hit")}`)?.classList.remove(ne("hit"))}function Uc(){return document.querySelector('[data-bloom="quote-chip"]')}function lr(){Uc()?.remove()}function xg(e){let o=$()?.getBoundingClientRect();!o||o.width<8||(e.style.width=`${Math.max(120,o.width-24)}px`,e.style.left=`${o.left+12}px`,e.style.top=`${Math.max(8,o.top-e.offsetHeight-8)}px`)}function Sg(e){let t=Uc();t||(t=s("div",{class:`bloom-root ${ne("chip")}`,attrs:{"data-bloom":"quote-chip"}},s("span",{class:ne("text")}),s("button",{class:ne("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(t));let o=t.querySelector(`.${ne("text")}`),n=y(e);o&&o.textContent!==n&&(o.textContent=n),t.dataset.text=e,xg(t)}function oa(){if(!$i){$i=!0;try{let e=ra(),t=ur();wt.store.persistAcrossChats&&t&&Ko(e)!==t.text&&pg(e,t.text);let o=wt.store.persistAcrossChats?Ko(e):"";!o||t&&y(t.text)===y(o)?lr():Sg(o),sa()}finally{$i=!1}}}function qg(e){let t=e.closest('[data-bloom="quote-chip"]');if(t instanceof HTMLElement&&!e.closest(`.${ne("x")}`)){let i=t.dataset.text??t.querySelector(`.${ne("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:t}:null}let o=e.closest("blockquote");if(o instanceof HTMLElement&&!e.closest("a, button")){let i=yg(o),a=y(o.textContent??"");if(i&&a)return{text:a,skip:i,origin:o}}let n=$();if(!n||!n.contains(e)||dt(e)||e.closest("button, [role='button']"))return null;let r=ur();return!r||!r.row.contains(e)?null:{text:r.text,skip:null,origin:r.row}}function Eg(e){let{target:t}=e;if(!(t instanceof Element))return;if(t.closest('[data-bloom="quote-back"]')){e.preventDefault(),e.stopPropagation(),sr?.isConnected&&Rc(sr);return}if(t.closest(`.${ne("x")}`)){e.preventDefault(),e.stopPropagation(),ea();return}let o=ur();if(o&&(t===o.dismiss||o.dismiss.contains(t))){ea();return}if(Tg(t)&&Fc(),!wt.store.jumpToPassage)return;let n=qg(t);if(!n)return;let r=vg(n.text,n.skip);r&&(e.preventDefault(),e.stopPropagation(),wg(r,n.origin,n.text),Rc(r))}function Tg(e){let t=e.closest("button, [role='button']");return!(t instanceof HTMLElement)||t.closest("[data-bloom]")||!$()?.contains(t)?!1:/send|submit|发送|提交/i.test(ta(t))&&!Xi.test(ta(t))}function Cg(e){return!(e instanceof KeyboardEvent)||e.key!=="Enter"||e.shiftKey||e.isComposing?!1:dt(e.target)}function Fc(){if(!wt.store.persistAcrossChats)return;let e=ra(),t=Ko(e);if(t){if(!ur()){let o=B(),n=aa(t);n.length>=Hc&&!y(o).includes(n)&&le(`> ${t}

${o}`.trim())}ea(e)}}function Mg(e){Cg(e)&&Fc()}function Lg(e){!e.prevId&&e.id&&gg(e.id),oa()}var Gc=f({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:wt,styles:Oc,onSettingsChange(e){e==="jumpToPassage"&&!wt.store.jumpToPassage&&Dc(),e==="persistAcrossChats"&&!wt.store.persistAcrossChats&&(sessionStorage.removeItem(na),lr()),oa()},start(){to=new AbortController,document.addEventListener("pointerdown",Eg,{capture:!0,signal:to.signal}),document.addEventListener("keydown",Mg,{capture:!0,signal:to.signal}),addEventListener("scroll",sa,{capture:!0,passive:!0,signal:to.signal}),Zi=pe(Lg),Ji=M(e=>Y(e)&&oa())},stop(){to?.abort(),to=void 0,Zi?.(),Zi=void 0,Ji?.(),Ji=void 0,window.clearTimeout(_i),Dc(),lr()}});var Yc=`/*
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
`;var Ig=C("bloom-cls"),Bg="bloom-cls",Og=600*1e3,ca=at("tab"),no=new Map,Qo=new Map,oo=null,Kc=[],Pg=e=>e==="streaming"||e==="error";function Rg(){let e=new Map,t=Date.now();for(let[o,n]of Qo)t-n.at>Og?Qo.delete(o):e.set(o,n.status);for(let[o,n]of no)e.set(o,n);return e}function Dg(e){return s("span",{class:`bloom-root ${Ig("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&T("alert"))}function mr(){let e=Rg(),t=new Set;for(let[o,n]of e)for(let r of pt(o)){if(!we(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let a=Dg(n);t.add(a),r.append(a)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function dr(e,t){e&&(t?no.set(e,t):no.delete(e),oo?.postMessage({tab:ca,id:e,status:t}),mr())}function Hg({data:e}){!k(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===ca||(Pg(e.status)?Qo.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):Qo.delete(e.id),mr())}function la(){for(let e of no.keys())oo?.postMessage({tab:ca,id:e,status:null})}var Qc=f({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:()=>`${Yc}`,start(){for(let e of document.querySelectorAll('[data-bloom="cls"]'))e.remove();oo=typeof BroadcastChannel=="function"?new BroadcastChannel(Bg):null,oo?.addEventListener("message",Hg),addEventListener("pagehide",la),Kc=[x.on("rise",({conversationId:e})=>dr(e,"streaming")),x.on("fall",({conversationId:e,outcome:t})=>dr(e,t==="error"?"error":null)),x.on("context",({prevId:e,id:t,migrated:o})=>{o&&H().generating?dr(t,"streaming"):!o&&no.get(e??"")==="streaming"&&dr(e,null)}),M(e=>Y(e)&&mr())],b()&&mr()},stop(){for(let e of Kc)e();la(),oo?.close(),oo=null,removeEventListener("pagehide",la),no.clear(),Qo.clear();for(let e of document.querySelectorAll('[data-bloom="cls"]'))e.remove()}});var jc=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],gr={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Ng={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Ug="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",ua=32,hr=64,da="#FCFCFC",ma="#111111",Fg=14,br=51.5,Gg=12.5,Yg=9.75,zc=52,Kg=10.5,Qg=7.75,zg={rotate:e=>e.arc(br,br,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function fr(e){let t=document.createElement("canvas");t.width=t.height=ua;let o=t.getContext("2d");return o?(o.scale(ua/hr,ua/hr),e(o),t.toDataURL("image/png")):""}function pr(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D(Ug);o&&(e.strokeStyle=ma,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function yr(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function jg(e,t){yr(e,br,Gg,ma),yr(e,br,Yg,gr[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),zg[t](e),e.stroke()}function Wg(e,t){e.beginPath(),e.roundRect(0,0,hr,hr,Fg),e.fillStyle=t,e.fill()}var Vg=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function Wc(e,t){switch(e){case"original":return Vg(Ng[t]);case"hole":return fr(o=>pr(o,gr[t],!0));case"bg":return fr(o=>{Wg(o,gr[t]),pr(o,da,!1)});case"dot":return fr(o=>{pr(o,da,!0),yr(o,zc,Kg,ma),yr(o,zc,Qg,gr[t])});case"badge":return fr(o=>{pr(o,da,!0),jg(o,t)})}}var jo="bloom-chat-state-favicon",Wo="data-bloom-rel",ga="data-bloom-media",Vc="bloom-parked-icon",Jg="/favicon.ico",Zc=g({style:{type:"select",description:"How the tab icon shows the chat state.",options:jc,default:"bg"}}),$e=null,$c="",vr=null,Xc="",Jc=new Map,ha,fa=[],_c=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${Wo}]`)];function ba(){for(let e of _c())e.id!==jo&&(e.hasAttribute(Wo)||(Xc||=e.href,e.setAttribute(Wo,e.rel),e.setAttribute(ga,e.getAttribute("media")??"")),e.rel!==Vc&&(e.rel=Vc),e.media!=="not all"&&(e.media="not all"))}function Zg(){for(let e of _c()){let t=e.getAttribute(Wo);if(t==null)continue;e.rel=t;let o=e.getAttribute(ga);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(Wo),e.removeAttribute(ga)}}function eu(){let e=document.getElementById(jo);return e||(e=document.createElement("link"),e.id=jo,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function $g(e){if(e==="wait")return Xc||Jg;let t=Zc.store.style,o=`${t}:${e}`,n=Jc.get(o);return n||Jc.set(o,n=Wc(t,e)),n}function pa(e){if(e)return"rotate";let t=B();return $e&&t&&t!==$c&&($e=null),$e==="error"?"error":$e==="done"?"done":t?"ready":"wait"}function zo(e,t=!1){if(e===vr&&!t)return;vr=e;let o=eu(),n=$g(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function Xg(){ha=new MutationObserver(()=>{ba(),document.head.lastElementChild?.id!==jo&&eu()}),ha.observe(document.head,{childList:!0})}var tu=f({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"HostReady",settings:Zc,start(){ba(),zo(pa(H().generating),!0),Xg(),fa=[x.on("rise",()=>{$e=null,zo("rotate")}),x.on("fall",({outcome:e})=>{$e=e==="done"||e==="error"?e:null,$c=B(),zo(pa(!1))}),x.on("context",({migrated:e})=>{e||($e=null)}),x.on("tick",({generating:e})=>{ba(),zo(pa(e))})]},stop(){for(let e of fa)e();fa=[],ha?.disconnect(),document.getElementById(jo)?.remove(),Zg(),vr=null,$e=null},onSettingsChange(){zo(vr??"wait",!0)}});var Xe="data-bloom-invite",_g=/^(?:invite team members|invite members|邀请团队成员|邀请成员)$/i,ou=':is(button, a:not([href^="/c/"])):not(main *, [role="dialog"] *)',eh={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${u.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])'],hideInvite:[`[${Xe}]`,`div:has(> [${Xe}]:only-child)`]},nu=g({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0},hideInvite:{type:"boolean",description:"Hide Invite team members in the sidebar.",default:!0}}),Ar,ya=!1;function th(e){if(Y(e))for(let t of document.querySelectorAll(`${ou}, [${Xe}]`))!t.matches(ou)||!_g.test(y(t.textContent??""))?t.removeAttribute(Xe):t.hasAttribute(Xe)||t.setAttribute(Xe,"")}var ru=f({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads, notices and Invite team members.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:nu,styles:()=>Ye(Object.entries(eh).flatMap(([e,t])=>nu.store[e]?t:[])),start(){ya=!0,mt().then(()=>{ya&&!Ar&&(Ar=M(th))})},stop(){ya=!1,Ar?.(),Ar=void 0;for(let e of document.querySelectorAll(`[${Xe}]`))e.removeAttribute(Xe)}});var oh=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function nh(){let e=y(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!oh.has(e.toLowerCase())?e:null}function xt(e){return e?Ae(e)?.title??Gl(e)??(e===b()?nh():null):null}var Aa="complete-toast",rh=1e3,wa=g({keepUntilDismissed:{type:"boolean",description:"Don't auto-close the toast. Dismiss with \xD7, or by opening the chat.",default:!1},duration:{type:"slider",description:"Seconds before the toast closes. Ignored when Keep Until Dismissed is on.",min:0,max:20,default:6,unit:"s"}}),xa=null,va=[];function ih(e){let t=pt(e)[0];t?t.click():location.assign(`/c/${e}`)}function ah(e){xa=e,Qn({key:Aa,title:xt(e)??"ChatGPT",message:"Response ready",type:"success",onClick:()=>ih(e),onClose:()=>{xa=null},duration:wa.store.keepUntilDismissed?0:wa.store.duration*rh})}var iu=f({name:"CompleteToast",description:"Show a toast when a chat you left finishes answering. Click it to open that chat.",authors:["Bloom contributors"],tags:["chat"],icon:"check",enabledByDefault:!0,settings:wa,start(){va=[x.on("background",({conversationId:e})=>ah(e)),pe(({id:e})=>e===xa&&Ve(Aa))]},stop(){for(let e of va)e();va=[],Ve(Aa)}});var ro=`form:has(:is(${u.composerInput})), ${u.oldComposerForm}`,wr='[class*="ComposerLayoutBody"]',qa='[class*="ComposerLayoutRoot"]',sh='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',lh=`:is(${ro}) ${wr}, :is(${ro}):not(:has(${wr})) ${qa}, :is(${ro}):not(:has(${wr})):not(:has(${qa})) :is(${sh})`,ch='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',uh='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',dh="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))";var mh="composer-fill",au=g({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function fh(){let{opacity:e,blur:t}=au.store;if(e>=100)return"";let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${dh} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important;-webkit-backdrop-filter:blur(${t}px)!important`;return`:is(${ch}), :is(${ro}){${o}}:is(${uh}){display:none!important}${lh}{${n}}:is(${ro}):has(${wr}) ${qa}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${ro}) :is(${u.composerInput}){background-color:transparent!important}`}function Sa(){for(let e of document.querySelectorAll(`[data-bloom="${mh}"]`))e.remove()}var su=f({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:au,styles:fh,start(){Sa()},stop(){Sa()},onSettingsChange(){Sa()}});var ph=1200,gh=8e3,hh=150,bh=20,lu=6,Ca="continue where you left",yh=/message delivery timed out|please try again/i,cu=/waiting for the complete answer/i,uu=g({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:Ca,placeholder:Ca}}),Ea=[],Sr=0,Vo=!1,Jo=0,ao="",xr="",Ma=0,so=!1,Zo=!1,qr=!0,io="",La=0,Er=!1,vh=()=>uu.store.prompt.trim()||Ca;function du(){return(J(u.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function mu(){let e=du();return!e||cu.test(e)||!yh.test(e)?"":e}function Ah(){let e=du();return e&&cu.test(e)?e:""}function wh(){let e=Ut()?.querySelectorAll(u.turn),t=e?.[e.length-1];return`${t?.getAttribute("data-turn-key")??""}:${t?.textContent?.length??0}`}function fu(e,t,o){if(o===Sr){if(H().generating||B()!==e||t>=bh){so=!1,H().generating||(ao="");return}kn(),setTimeout(()=>fu(e,t+1,o),hh)}}function xh(e){let t=Sr;if(H().generating||B()&&B()!==e){so=!1,ao="";return}le(e),Er=!0,To(()=>{t===Sr&&fu(e,0,t)})}function pu(e){return e===ao||Jo>=lu||H().generating||B()?!1:(ao=e,Jo+=1,so=!0,xh(vh()),!0)}function Sh(){if(Vo||so||Zo)return;let e=Date.now(),t=mu();if(t){if(io="",t!==xr){xr=t,Ma=e;return}if(e-Ma<ph)return;pu(`${b()??""}:${t}`);return}if(xr="",!Ah()){qr=!0,io="";return}if(!qr||!H().generating||B())return;let n=`${b()??""}:${wh()}`;if(n!==io){io=n,La=e;return}if(e-La<gh||Jo>=lu)return;let r=Ht();r&&(Zo=!0,r.click())}function Ta(){Sr+=1,Vo=!1,Jo=0,ao="",xr="",Ma=0,so=!1,Zo=!1,qr=!0,io="",La=0,Er=!1}var gu=f({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:uu,start(){Ta(),Ea=[x.on("rise",()=>{Vo=!1,ao="",so=!1,Er&&(Er=!1,qr=!1,io="")}),x.on("fall",({outcome:e})=>{if(Zo){Zo=!1,e==="left"?Vo=!0:pu(`${b()??""}:stall`);return}(e==="stopped"||e==="left")&&(Vo=!0),e==="done"&&!mu()&&(Jo=0)}),x.on("context",({migrated:e})=>{e||Ta()}),x.on("tick",Sh)]},stop(){for(let e of Ea)e();Ea=[],Ta()}});var Ue=C("bloom-csi-"),qh=256,Eh=160,Tr=1,hu=4,Th=.1,Ch=.0015,Mh=250;function Lh(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function kh(e){return new Promise((t,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function Ih(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:fe(t.x,n,1-n),y:fe(t.y,r,1-r)}}function bu(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function Bh(e,t){let o=s("canvas");return o.width=o.height=qh,bu(o,e,t),o.toDataURL("image/png")}function yu(e){let t=null,o={x:j.store.cropX,y:j.store.cropY,zoom:j.store.cropZoom},n,r=s("canvas",{class:Ue("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=Eh*devicePixelRatio;let i=s("div",{class:`bloom-muted ${Ue("status")}`}),a=s("div",{class:Ue("zoom")}),c=s("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(v,E=!0){t&&(o=Ih(t,v),bu(r,t,o),E&&(clearTimeout(n),n=setTimeout(()=>{t&&(j.store.cropX=o.x,j.store.cropY=o.y,j.store.cropZoom=o.zoom,j.store.avatarUrl=Bh(t,o))},Mh)))}function d(){a.replaceChildren(jn(o.zoom,Tr,hu,Th,"\xD7",v=>l({...o,zoom:v})))}async function m(v,E){i.textContent="";try{t=await kh(v),E&&(j.store.avatarSource=v,o={x:.5,y:.5,zoom:Tr}),e.classList.add(Ue("has-image")),d(),l(o,E)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let h=v=>{v?.type.startsWith("image/")&&Lh(v).then(E=>m(E,!0))};c.addEventListener("change",()=>h(c.files?.[0])),r.addEventListener("wheel",v=>{t&&(v.preventDefault(),l({...o,zoom:fe(o.zoom*(1-v.deltaY*Ch),Tr,hu)}),d())},{passive:!1}),r.addEventListener("pointerdown",v=>{if(!t)return;r.setPointerCapture(v.pointerId);let E={...o},ee=r.getBoundingClientRect(),it=te=>{if(!t)return;let Re=Math.max(ee.width/t.naturalWidth,ee.height/t.naturalHeight)*o.zoom;l({...o,x:E.x-(te.clientX-v.clientX)/(t.naturalWidth*Re),y:E.y-(te.clientY-v.clientY)/(t.naturalHeight*Re)})};r.addEventListener("pointermove",it),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",it),{once:!0})});let D=s("div",{class:Ue("cropper"),attrs:{tabindex:"0"},on:{paste:v=>h([...v.clipboardData?.files??[]].find(E=>E.type.startsWith("image/"))),dragover:v=>v.preventDefault(),drop:v=>{v.preventDefault(),h(v.dataTransfer?.files[0])}}},s("div",{class:Ue("stage")},r),s("div",{class:Ue("controls")},Ro("",v=>v.trim()&&void m(v.trim(),!0),"https://\u2026 or data:image/\u2026","url"),s("div",{class:Ue("buttons")},N("Choose file",()=>c.click()),N("Reset crop",()=>{l({x:.5,y:.5,zoom:Tr}),d()}),N("Clear",()=>{t=null,e.classList.remove(Ue("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),a.replaceChildren(),j.store.avatarUrl="",j.store.avatarSource=""},"danger")),a,i,c));return e.append(D),j.store.avatarSource&&m(j.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var vu=`/*
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
`;var $o="data-bloom-csi-avatar",ka="data-bloom-csi-sized",Su="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",Ph=32,j=g({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>yu(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),Au=[];function qu(e){e.removeAttribute($o),e.removeAttribute(ka)}function wu(e){return(j.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function xu(e=[]){if(!Y(e))return;let t=j.store.displayName.trim()||null,o=!!j.store.avatarUrl,n=new Set(t?wu("name"):[]);for(let i of document.querySelectorAll(Su))n.has(i)||ct(i,null);for(let i of n)ct(i,t);let r=new Set(o?wu("avatar"):[]);for(let i of document.querySelectorAll(`[${$o}]`))r.has(i)||qu(i);for(let i of r)i.hasAttribute($o)||i.setAttribute($o,""),i.toggleAttribute(ka,!i.closest('[role="menu"]'))}function Rh(){let e=j.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${j.store.avatarSize}px}:is(${u.rail}, ${u.oldRail}) [${ka}]{--bloom-csi-size:${Ph}px}`:""}var Eu=f({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:j,styles:()=>`${Rh()}
${vu}`,start(){Au=[Me(),M(xu)]},stop(){for(let e of Au)e();for(let e of document.querySelectorAll(`[${$o}]`))qu(e);for(let e of document.querySelectorAll(Su))ct(e,null)},onSettingsChange(){xu()}});var lo=C("bloom-greeting-"),Tu=30,Cu=100;function Mu(e){let t=-1,o=s("textarea",{class:`bloom-input ${lo("input")}`,attrs:{maxlength:String(Cu),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=N("Add",i),r=s("div",{class:lo("list")});function i(){let l=o.value.trim().slice(0,Cu);if(!l)return;let d=[...O.store.greetings];t>=0?d[t]=l:d.length<Tu&&d.push(l),O.store.greetings=d,t=-1,o.value="",a()}function a(){let{greetings:l}=O.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&l.length>=Tu,r.replaceChildren(...l.length?l.map((d,m)=>s("div",{class:lo("row",m===t?"row-editing":"row-idle")},s("div",{class:lo("text"),text:d}),U("edit","Edit",()=>{t=m,o.value=d,o.focus(),a()}),U("trash","Delete",()=>{O.store.greetings=l.filter((h,D)=>D!==m),t===m&&(t=-1),a()}))):[s("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),e.append(s("div",{class:lo("editor")},r,s("div",{class:lo("form")},o,n))),a();let c=Dt((l,d)=>l==="GreetingCustomizer"&&d==="greetings"&&a());return()=>{c(),e.replaceChildren()}}var Lu=`/*
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
`;var Mr="data-bloom-greeting",Hh=1e3,Nh=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],O=g({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>Mu(e)},greetings:{type:"custom",default:Nh},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),Cr,ku=[],Ia,tn=()=>Nt()&&!Te(),Uh=e=>e.replaceAll(/\s*\n\s*/g," ").trim(),Bu=()=>O.store.greetings.filter(e=>typeof e=="string"&&e.trim());function on(){let e=Bu();if(e.length)if(O.store.order==="random"&&e.length>1){let t=O.store.lastRandom;for(;t===O.store.lastRandom;)t=Math.floor(Math.random()*e.length);O.store.lastRandom=t,O.store.index=t}else O.store.index=(O.store.index+1)%e.length}function Fh(){return tn()?J(u.homeHeading):null}function Xo(){for(let e of document.querySelectorAll(`[${Mr}]`))e.removeAttribute(Mr),ct(e,null)}function _o(){for(let e of document.querySelectorAll("[data-bloom-placeholder]"))e.removeAttribute("data-bloom-placeholder")}function Iu(e){let t=ve(),o=Uh(e);if(!t||!o||B(t)){_o();return}t.getAttribute("data-bloom-placeholder")!==o&&t.setAttribute("data-bloom-placeholder",o)}function en(){let e=Bu(),t=Hn(),o=tn();if(!e.length||!t&&!o){Xo(),_o();return}if(t){Xo(),Iu(e[0]??"");return}let n=Fh();n?((O.store.index<0||O.store.index>=e.length)&&on(),n.setAttribute(Mr,""),ct(n,e[Math.max(0,O.store.index)%e.length]??"")):Xo(),O.store.heroOnlyOutsideProject?_o():Iu(e[Math.max(0,O.store.index)%e.length]??"")}function Ba(){clearInterval(Cr),Cr=void 0,O.store.mode==="interval"&&tn()&&(Cr=setInterval(()=>{on(),en()},O.store.intervalSec*Hh))}function Gh(e){O.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${Mr}]`)||getSelection()?.toString()||(on(),en())}function Yh(){tn()&&O.store.mode==="refresh"&&on(),Ba(),en()}var Ou=f({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:O,styles:Lu,start(){Xo(),_o(),Ia=new AbortController,document.addEventListener("click",Gh,{signal:Ia.signal}),tn()&&O.store.mode==="refresh"&&on(),Ba(),ku=[M(e=>Y(e)&&en()),pe(Yh)]},stop(){Ia?.abort();for(let e of ku)e();clearInterval(Cr),Xo(),_o()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&Ba(),en()}});var nn=C("bloom-history-"),Oa=10,Kh=3e3;function Pa(e,t){let o="",n=0,r=new Set,i=s("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),a=s("div",{class:nn("list")}),c=s("div",{class:nn("pager")}),l,d=N("Clear all",()=>{if(!l){d.textContent="Click again to clear",l=setTimeout(()=>{l=void 0,d.textContent="Clear all"},Kh);return}clearTimeout(l),l=void 0,d.textContent="Clear all",rn([])},"danger");function m(){let D=[...St.store.entries].toReversed(),v=o.trim().toLowerCase(),E=v?D.filter(me=>me.toLowerCase().includes(v)):D,ee=Math.max(1,Math.ceil(E.length/Oa));n=Math.min(n,ee-1);let it=E.slice(n*Oa,(n+1)*Oa).map(me=>s("div",{class:nn("row")},s("button",{class:nn("text",r.has(me)?"text-open":"text-closed"),text:me,title:r.has(me)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{r.delete(me)||r.add(me),m()}}}),t&&U("edit","Use",()=>t(me)),U("copy","Copy",()=>void bn(me)),U("trash","Delete",()=>rn(St.store.entries.filter(Wr=>Wr!==me)))));a.replaceChildren(...it.length?it:[s("div",{class:"bloom-muted",text:v?"No matching prompts.":"No saved prompts yet."})]),c.replaceChildren(s("span",{class:"bloom-muted",text:`${E.length} ${v?"matching":"saved"} \xB7 page ${n+1} of ${ee}`}),N("Previous",()=>{n--,m()}),N("Next",()=>{n++,m()}),d);let[te,Re]=c.querySelectorAll("button");te.disabled=n===0,Re.disabled=n>=ee-1,d.disabled=!D.length}i.addEventListener("input",()=>{o=i.value,n=0,m()}),e.append(s("div",{class:nn("manager")},i,a,c)),m();let h=Dt((D,v)=>D==="InputHistory"&&v==="entries"&&m());return()=>{h(),clearTimeout(l),e.replaceChildren()}}var Pu=`/*
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
`;var Fe=C("bloom-history-"),zh=2e3,St=g({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>Pa(e)},entries:{type:"custom",default:[]}}),F=null,Ra={text:"",at:0},ke=null,_e=null,Da,uo=()=>St.store.entries.filter(e=>typeof e=="string");function rn(e){St.store.entries=e.slice(-St.store.maxEntries)}function Ha(e){let t=e.trim();if(!t)return;let o=Date.now();t===Ra.text&&o-Ra.at<zh||(Ra={text:t,at:o},rn([...uo().filter(n=>n!==t),t]))}function Ru(e){e.preventDefault()}function jh(){let e=s("button",{class:Fe("hud-count"),attrs:{type:"button"},on:{mousedown:Ru,click:Zh}}),t=s("button",{class:Fe("hud-x"),text:"\xD7",attrs:{type:"button","aria-label":"Exit history"},on:{mousedown:Ru,click:Wh}});return s("div",{class:`bloom-root ${Fe("hud")}`,attrs:{"data-bloom":"history-hud",role:"group","aria-live":"polite","aria-label":"Input history"}},e,t)}function Du(e,t){let o=ve();if(!o||_e)return;ke??=jh();let n=`${e+1} / ${t}`,r=ke.querySelector(`.${Fe("hud-count")}`);r?.replaceChildren(n),r?.setAttribute("aria-label",`Show input history (${n})`);let i=(o.closest("form")??o).getBoundingClientRect();ke.style.left=`${i.left+i.width/2}px`,ke.style.top=`${i.top}px`,ke.isConnected||document.body.append(ke)}function co(){F=null,ke?.remove()}function Wh(){F&&le(F.draft),co(),ve()?.focus()}function Hu(e){let t=uo();if(!F)return;let o=t[e];F.index=e,F.shown=o,le(o),Du(t.length-1-e,t.length)}function Vh(e){let t=uo();if(!t.length)return!1;if(!F){if(e===1)return!1;F={index:t.length,draft:B(),shown:""}}let o=F.index+e;return o<0?!0:o>=t.length?(le(F.draft),co(),!0):(Hu(o),!0)}function Jh(e){let t=uo().indexOf(e);an(),!(t<0)&&(F??={index:t,draft:B(),shown:""},Hu(t),ve()?.focus())}function an(){if(!_e)return;_e.release(),_e.controller.abort(),_e.root.remove(),_e=null;let e=uo();F&&e[F.index]===F.shown?Du(e.length-1-F.index,e.length):F=null}function Zh(){if(_e)return;ke?.remove();let e=s("div",{class:Fe("dialog-body")}),t=s("div",{class:`bloom-root ${Fe("backdrop")}`,attrs:{"data-bloom":"history-dialog"},on:{click:n=>n.target===n.currentTarget&&an()}},s("div",{class:Fe("dialog"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Input history"}},s("div",{class:Fe("dialog-header")},s("h2",{class:Fe("dialog-title"),text:"Input history"}),U("close","Close",an)),e));t.addEventListener("keydown",n=>n.stopPropagation());let o=new AbortController;document.addEventListener("keydown",n=>{n.key==="Escape"&&(n.preventDefault(),n.stopPropagation(),an())},{capture:!0,signal:o.signal}),ge(t),_e={root:t,release:Pa(e,Jh),controller:o},e.querySelector("input")?.focus()}function Nu(e){return dt(e)?e:e instanceof HTMLElement?e.closest(u.composerInput):null}function $h(){if(ve()?.closest("[data-chatgpt-composer], [data-composer-input], form")?.querySelector('[aria-expanded="true"]'))return!0;for(let t of document.querySelectorAll('[role="listbox"], [role="menu"], [data-radix-popper-content-wrapper], [cmdk-root], [cmdk-list]')){if(!(t instanceof HTMLElement)||t.closest("[data-bloom]"))continue;let o=getComputedStyle(t);if(!(o.display==="none"||o.visibility==="hidden"))return!0}return!1}function Xh(e){if(e.isComposing||e.key==="Process"||e.keyCode===229)return;let t=Nu(e.target);if(!t)return;if(e.key==="Enter"&&!e.shiftKey){Ha(B(t)),co();return}if(e.key==="Escape"&&F){le(F.draft),co(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey||$h())return;let o=Zs(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!F||Vh(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function _h(e){F&&Nu(e.target)&&B()!==F.shown.trim()&&co()}function eb(e){e.target instanceof Element&&e.target.closest(u.sendButton)&&Ha(B())}var Uu=f({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before. Click the counter to browse history.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:St,styles:Pu,start(){for(let t of document.querySelectorAll('[data-bloom="history-hud"], [data-bloom="history-dialog"]'))t.remove();ke=null,Da=new AbortController;let{signal:e}=Da;document.addEventListener("keydown",Xh,{capture:!0,signal:e}),document.addEventListener("input",_h,{capture:!0,signal:e}),document.addEventListener("click",eb,{capture:!0,signal:e}),document.addEventListener("submit",()=>Ha(B()),{capture:!0,signal:e})},stop(){Da?.abort(),an(),co();for(let e of document.querySelectorAll('[data-bloom="history-hud"]'))e.remove();ke=null},onSettingsChange(e){e==="maxEntries"&&rn(uo())}});var Fu=`/*
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
`;var ob=1500,nb=5e3,rb=2e3,ju=[{label:"UTC",value:"UTC"},{label:"\u7F8E\u56FD\u4E1C\u90E8",value:"America/New_York"},{label:"\u7F8E\u56FD\u4E2D\u90E8",value:"America/Chicago"},{label:"\u7F8E\u56FD\u5C71\u5730",value:"America/Denver"},{label:"\u7F8E\u56FD\u897F\u90E8",value:"America/Los_Angeles"},{label:"\u65E5\u672C",value:"Asia/Tokyo"},{label:"\u53F0\u6E7E",value:"Asia/Taipei"}],mo=g({sourceTimeZone:{type:"select",description:"Zone the stored clock was written in. Leave UTC for ChatGPT create_time. Pick the same zone as the Shit GPT plugin only when that clock is a wall time in that zone; it is then shown in the system timezone.",options:ju,default:"UTC"},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),kr=new Map,Na=new Set,Wu=0,Ir,Gu=[];function Vu(e,t){kr.get(e)!==t&&(kr.set(e,t),clearTimeout(Ir),Ir=setTimeout(Ju,rb))}function Ju(){let e={...mo.store.stamps,...Object.fromEntries(kr)};mo.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,ob))}function ib(e){let t=Ae(b())?.times;for(let o=e.length-1;o>=0;o--){let n=kr.get(e[o])??t?.get(e[o])??mo.store.stamps[e[o]];if(n)return n}return null}var ab=()=>H().generating||Date.now()-Wu<nb;function Zu(){return Intl.DateTimeFormat().resolvedOptions().timeZone}function $u(){let e=mo.store.sourceTimeZone;if(!e||e==="UTC")return"UTC";try{return Intl.DateTimeFormat(void 0,{timeZone:e}),e}catch{return"UTC"}}function Xu(e,t){let o={};for(let n of new Intl.DateTimeFormat("en-US",{timeZone:t,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(e)))o[n.type]=n.value;return{y:+o.year,m:+o.month,d:+o.day,h:+o.hour%24,mi:+o.minute,s:+o.second}}function _u(e){return Date.UTC(e.y,e.m-1,e.d,e.h,e.mi,e.s)}function Yu(e,t){let o=e;for(let n=0;n<4;n++){let r=e-_u(Xu(o,t));if(r===0)return o;o+=r}return o}function sb(e,t){if(t==="UTC")return e;let o=(e%1e3+1e3)%1e3,n=e-o,r=new Date(n),i=Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),r.getUTCHours(),r.getUTCMinutes(),r.getUTCSeconds()),a=Yu(i,t),c=3600*1e3,l=Number.POSITIVE_INFINITY;for(let d of[-c,0,c]){let m=a+d;_u(Xu(m,t))===i&&m<l&&(l=m)}return l!==Number.POSITIVE_INFINITY?l+o:Yu(i+c,t)+o}function lb(e,t){let o=$u();return t||o==="UTC"?e:sb(e,o)}function Ku(e,t){return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(e)}function cb(e){let t=Zu(),o=Date.now(),n={hour:"2-digit",minute:"2-digit",timeZone:t};if(Ku(e,t)===Ku(o,t))return new Intl.DateTimeFormat(void 0,n).format(e);let r=a=>new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric"}).format(a),i=r(e)===r(o)?{}:{year:"numeric"};return new Intl.DateTimeFormat(void 0,{...i,month:"short",day:"numeric",...n}).format(e)}function ub(e,t){let o=new Date(t).toLocaleString(void 0,{timeZone:Zu()}),n=$u();if(n==="UTC"||t===e)return o;let r=new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"UTC"}).format(e);return`${ju.find(a=>a.value===n)?.label??n} ${r} \u2192 ${o}`}function ed(e){let t=Ft(e)??e.getAttribute("data-message-author-role")??e.closest(u.turn)?.getAttribute("data-turn")??e.querySelector(u.authorRole)?.getAttribute("data-message-author-role");if(fi(t))return t;let o=ko(e).at(-1);return Ae(b())?.chain.find(n=>n.id===o)?.role??null}var Qu='[class*="group/activity-header"]';function db(e){let t=e.parentElement;if(!t)return null;let o=e.closest(u.turn);return o&&t!==o&&!o.contains(t)?null:t}function mb(e){let t=e;for(let o=0;o<8&&t;o++){let n=db(t);if(!n)return null;let r=[...n.children],i=r.indexOf(t);for(let a=i-1;a>=0;a--){let c=r[a],l=c.matches(Qu)?c:c.querySelector(Qu);if(l)return l;if(c.matches(u.searchUnit)||c.querySelector(u.searchUnit))return null}if(n===t.closest(u.turn))return null;t=n}return null}function fb(e){let t=e.parentElement;for(let o=0;o<4&&t;o++){if(t.classList.contains("flex-col"))return t;t=t.parentElement}return e.parentElement??e}function td(e,t){if(t==="assistant"){let o=mb(e);if(o)return fb(o)}return e}function pb(e,t){let o=Gt();for(let n=o.length-1;n>=0;n--){let r=o[n];if(!(r!==e&&(ed(r)!=="assistant"||td(r,"assistant")!==t)))return r===e}return!0}function zu(e){return e.querySelector(':scope > time[data-bloom="timestamp"]')}function gb(e){let t=ko(e);if(!t.length||!we(e)||e.querySelector("time:not([data-bloom])"))return;let o=ed(e),n=td(e,o);if(n!==e&&!pb(e,n)){zu(e)?.remove();return}let r=ib(t),i=!1;if(!r&&ab()){r=Date.now();let m=t.at(-1);Na.add(m),Vu(m,r),i=!0}else r&&Na.has(t.at(-1))&&(i=!0);let a=n.querySelector('time[data-bloom="timestamp"]')??zu(e);if(!r||mo.store.hideOwnMessages&&o==="user"){a?.remove();return}let c=lb(r,i),l=cb(c);if(a?.textContent===l&&a.parentElement===n&&a===n.firstElementChild)return;let d=s("time",{class:`bloom-timestamp bloom-timestamp-${o??"assistant"}`,text:l,title:ub(r,c),attrs:{"data-bloom":"timestamp",datetime:new Date(c).toISOString()}});a&&a.replaceWith(d),(d.parentElement!==n||d!==n.firstElementChild)&&n.prepend(d)}var Lr=Ke(()=>{for(let e of Gt())gb(e)}),od=f({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:mo,styles:Fu,start(){Gu=[M(e=>Y(e)&&Lr()),V.on("conversation",Lr),V.on("message-time",({messageId:e,time:t})=>{Na.delete(e),Vu(e,t),Lr()}),x.on("fall",()=>{Wu=Date.now()})]},stop(){for(let e of Gu)e();Ir&&(clearTimeout(Ir),Ju());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();Lr()}}});var hb=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])','[data-chatgpt-composer] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-composer-input] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-codex-composer-root] button[aria-label^="Dictat" i], [data-composer-placement] button[aria-label^="Dictat" i], [class*="ComposerLayout"] button[aria-label^="Dictat" i]'],bb=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],nd=g({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),rd=f({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:nd,styles:()=>Ye([...hb,...nd.store.hideDictationSettings?bb:[]])});var qt="data-bloom-share",yb=/^\/g\/g-p-/,vb=/^(?:share|分享)$/i,Ab=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],wb=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${qt}="project"]`],Ua=g({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),Br,Fa=!1;function xb(e){if(!Y(e))return;let t=yb.test(location.pathname)&&!b();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${qt}]`))!t||!vb.test(y(o.textContent??""))?o.removeAttribute(qt):o.hasAttribute(qt)||o.setAttribute(qt,"project")}var id=f({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:Ua,styles:()=>Ye([...Ua.store.hideShareChat?Ab:[],...Ua.store.hideShareProject?wb:[]]),start(){Fa=!0,mt().then(()=>{Fa&&!Br&&(Br=M(xb))})},stop(){Fa=!1,Br?.(),Br=void 0;for(let e of document.querySelectorAll(`[${qt}]`))e.removeAttribute(qt)}});var ad='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',Sb='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',qb="[data-bloom-profile-plan]",sd="visibility:hidden!important;user-select:none!important",cd=g({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function Eb(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=cd.store,r=[];return e&&r.push(n?`:is(${ad}){display:none!important}`:`:is(${ad}){${sd}}`),t&&r.push(`:is(${Sb}){${sd}}`),e&&o&&r.push(`${qb}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var ld,ud=f({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:cd,styles:Eb,start(){ld=Me()},stop(){ld?.()}});var Tb="model-switcher-dropdown-button",Ga="data-selected-reasoning-effort",Or="ArrowLeft",dd=e=>e.startsWith("model-switcher-")&&e!==Tb?e.slice(15):"",sn=(e,t)=>e.id===t.id||!!e.label&&e.label===t.label;function md(){let e=$();return(e&&J(u.modelTrigger,e))??J(u.modelTrigger)}function Ie(){let e=md();if(!e)return null;let t=e.getAttribute("aria-expanded")==="true",o=e.getAttribute(Ga),n=o&&t?"":y(e.innerText),r=o||dd(e.getAttribute("data-testid")??"")||n;return r?{id:r,label:n||r}:null}function Cb(e){return[...document.querySelectorAll(u.modelItem)].find(t=>{let o=dd(t.getAttribute("data-testid")??""),n=y(t.textContent??"");return o===e.id||n===e.label||n===e.id})??null}function Mb(e){let t=e.querySelector("[role=slider]"),o=Number(t?.getAttribute("aria-valuenow")),n=Number(t?.getAttribute("aria-valuemax"));o<=0?Or="ArrowRight":o>=n&&(Or="ArrowLeft"),e.focus(),e.dispatchEvent(new KeyboardEvent("keydown",{key:Or,code:Or,bubbles:!0,cancelable:!0}))}function Ya(e){let t=Ie(),o=md();if(t&&sn(t,e))return o?.hasAttribute(Ga)&&o.getAttribute("aria-expanded")==="true"&&document.querySelector("[role=menu]")?.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),!0;if(o?.hasAttribute(Ga)){let r=document.querySelector(u.effortSlider);return r?Mb(r):o.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,button:0,pointerType:"mouse",isPrimary:!0})),!1}let n=Cb(e);if(n){n.click();let r=Ie();return!!r&&sn(r,e)}return o?.getAttribute("aria-expanded")!=="true"&&o?.click(),!1}var fd=`/*
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
`;var W=C("bloom-queue-"),kb=6,Ib=8,re=null,ln="",fo=!1,po=!1;function Ka(e,t,o){let n=U(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute(ce),n.addEventListener("mouseenter",()=>pd(t)),n.addEventListener("mouseleave",()=>pd("")),n}function pd(e){let t=re?.querySelector(`.${W("tip")}`);t&&(t.textContent=e)}function Bb(e,t,o,n){po=!0;let r=s("textarea",{class:`bloom-input ${W("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=new AbortController,a=c=>{i.abort(),po=!1,ln="",c?n.edit(t,r.value):r.replaceWith(s("div",{class:W("text"),text:o}))};addEventListener("keydown",c=>{if(!(c.target!==r||c.isComposing)){if(c.key==="Enter"&&!c.shiftKey)a(!0);else if(c.key==="Escape")a(!1);else return;c.preventDefault(),c.stopImmediatePropagation()}},{capture:!0,signal:i.signal}),r.addEventListener("keydown",c=>c.stopPropagation(),{signal:i.signal}),r.addEventListener("blur",()=>a(!0),{signal:i.signal}),e.querySelector(`.${W("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function Ob(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,a=l=>{!i&&Math.abs(l.clientY-n.clientY)<kb||(i||(i=po=!0,e.classList.add(W("dragging"))),e.style.transform=`translateY(${l.clientY-n.clientY}px)`)},c=l=>{if(removeEventListener("pointermove",a),!i)return;po=!1,ln="";let m=[...r.children].filter(h=>h!==e).filter(h=>h.getBoundingClientRect().top+h.getBoundingClientRect().height/2<l.clientY).length;o.move(t,m)};addEventListener("pointermove",a),addEventListener("pointerup",c,{once:!0})})}function Pb(e,t,o,n){let r=s("li",{class:W("row")},s("div",{class:W("text"),text:e.text}),n&&e.label?s("span",{class:W("model"),title:e.label,text:e.label}):null,s("div",{class:W("actions")},Ka("trash","Remove from queue",()=>o.remove(t)),Ka("edit","Edit",()=>Bb(r,t,e.text,o)),Ka("send","Send now",()=>o.sendNow(t))));return Ob(r,t,o),r}function Rb(e){if(!re)return;let t=e.getBoundingClientRect();re.style.left=`${t.left}px`,re.style.width=`${t.width}px`,re.style.bottom=`${innerHeight-t.top+Ib}px`}function Qa(){re?.remove(),re=null,ln="",po=!1}function Et(e,t,o=!0){let n=$();if(!e.length||!lt(n)){Qa();return}re||(re=s("div",{class:`bloom-root ${W("tray")}`,attrs:{"data-bloom":"queue"}},s("div",{class:W("header")},s("button",{class:W("toggle"),attrs:{type:"button","aria-expanded":String(!fo)},on:{click:a=>{fo=!fo,re?.classList.toggle(W("collapsed"),fo),a.currentTarget.setAttribute("aria-expanded",String(!fo))}}},s("span",{class:W("count")}),T("chevron")),s("span",{class:W("tip")})),s("ol",{class:W("list")})),re.classList.toggle(W("collapsed"),fo),document.body.append(re)),Rb(n);let r=JSON.stringify([o,...e.map(a=>[a.text,o?a.label:""])]);if(po||r===ln)return;ln=r;let i=re.querySelector(`.${W("count")}`);i&&(i.textContent=hn(e.length,"Queued message")),re.querySelector(`.${W("list")}`)?.replaceChildren(...e.map((a,c)=>Pb(a,c,t,o)))}var Hr=new q("PromptQueue"),Db=8,un=150,Pr=20,Hb=300,Be="BloomPromptQueue",ja="BloomPromptQueueClaim",gd="BloomPromptQueueTab",Nb=4e3,_=g({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1},showQueueMode:{type:"boolean",description:"Show the model that was selected when each message was queued.",default:!0},stickyOnNavigate:{type:"boolean",description:"Keep the selected model when switching chats.",default:!0},persistAcrossRefresh:{type:"boolean",description:"Restore unsent queued messages in this browser after a refresh. Other tabs show the same queue; only one of them sends it.",default:!0}}),Oe=new Map,cn=!1,Tt=null,go,hd=[],et=null,Mt=!1,dn,Rr="draft",mn=()=>b()??Rr,ie=()=>Oe.get(mn())??[],Wa=e=>({id:e.model||e.label,label:e.label||e.model});function Ub(e){return typeof e=="string"?e.trim()?{text:e,model:"",label:""}:null:!k(e)||typeof e.text!="string"||!e.text.trim()?null:{text:e.text,model:typeof e.model=="string"?e.model:"",label:typeof e.label=="string"?e.label:""}}function Va(){let e=sessionStorage.getItem(gd);if(e)return e;let t=globalThis.crypto?.randomUUID?.()??`${Date.now()}-${Math.random()}`;return sessionStorage.setItem(gd,t),t}function vd(){let e=qe(localStorage.getItem(ja)??"");return!k(e)||typeof e.tab!="string"||typeof e.at!="number"||typeof e.key!="string"?null:{tab:e.tab,at:e.at,key:e.key}}function Ad(){let e={tab:Va(),at:Date.now(),key:mn()};try{localStorage.setItem(ja,JSON.stringify(e))}catch(t){Hr.warn("Could not claim the queue",t)}}function Fb(){let e=vd();if(e?.tab===Va())try{localStorage.setItem(ja,JSON.stringify({...e,at:Date.now()}))}catch(t){Hr.warn("Could not refresh the queue claim",t)}}function Gb(){let e=vd();return!e||e.tab===Va()||e.key!==mn()?!0:Date.now()-e.at<=Nb?!1:(Ad(),!0)}function Yb(){return Object.fromEntries([...Oe].filter(([e])=>e!==Rr))}function za(e){let t=typeof e=="string"?qe(e):e;if(!k(t))return!1;let o=!1;for(let[n,r]of Object.entries(t)){if(!Array.isArray(r))continue;let i=r.map(Ub).filter(a=>a!=null);i.length&&(Oe.set(n,i),o=!0)}return o}function Kb(){if(!_.store.persistAcrossRefresh){sessionStorage.removeItem(Be),Zr(Be);return}za(sessionStorage.getItem(Be))||za(Ot(Be))&&Dr()}function Dr(){try{if(!_.store.persistAcrossRefresh){sessionStorage.removeItem(Be),Zr(Be);return}let e=Yb();sessionStorage.setItem(Be,JSON.stringify(e)),Pt(Be,e)}catch(e){Hr.warn("Could not save the queue",e)}}function Qb(e){if(!(e.key!==Be||!_.store.persistAcrossRefresh||e.newValue==null)){Oe.clear(),za(e.newValue);try{sessionStorage.setItem(Be,e.newValue)}catch(t){Hr.warn("Could not mirror the queue",t)}Et(ie(),ho,_.store.showQueueMode)}}function Ct(e){e.length?Oe.set(mn(),e):Oe.delete(mn()),Ad(),Dr(),Et(ie(),ho,_.store.showQueueMode)}function zb(e){if(!e.model&&!e.label)return!0;let t=Ie();return t?sn(t,Wa(e)):!0}function wd(e,t=0){t>=Pr||H().generating||B()!==e||(kn(),setTimeout(()=>wd(e,t+1),un))}function jb(e,t){let o=e??et;if(!o||!t.model&&!t.label||sn(o,Wa(t))){Mt=!1;return}_.store.stickyOnNavigate&&(et=o),clearTimeout(dn),dn=setTimeout(()=>Sd(o),un)}function fn(e,t=0,o=Ie()){if(H().generating||B()){t<Pr&&setTimeout(()=>fn(e,t+1,o),un);return}if(!zb(e)&&t<Pr){Mt=!0,Ya(Wa(e)),setTimeout(()=>fn(e,t+1,o),un);return}le(e.text),To(()=>wd(e.text)),jb(o,e)}function bd(){if(Tt!=null){let o=Tt;Tt=null,fn(o);return}if(!cn||H().generating||B())return;if(!Gb()){cn=!1;return}let[e,...t]=ie();e!=null&&(cn=!1,Ct(t),fn(e))}function xd(e){let t=ie(),o=t[e];if(o!=null){if(Ct(t.filter((n,r)=>r!==e)),!H().generating){fn(o);return}Tt=o,Ht()?.click()}}var ho={remove:e=>Ct(ie().filter((t,o)=>o!==e)),edit:(e,t)=>Ct(t.trim()?ie().map((o,n)=>n===e?{...o,text:t}:o):ie().filter((o,n)=>n!==e)),sendNow:xd,move(e,t){let o=[...ie()],[n]=o.splice(e,1);n&&(o.splice(t,0,n),Ct(o))}};function Wb(e){let t=Ie(),o={text:e,model:t?.id??"",label:t?.label??""},n=ie();return _.store.replacePending&&n.length?(Ct([...n.slice(0,-1),o]),!0):n.length>=Db?!1:(Ct([...n,o]),!0)}function Vb(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!dt(e.target)||!H().generating)return;let t=B(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;let o=Ie();le(""),Tt={text:t,model:o?.id??"",label:o?.label??""},Ht()?.click();return}if(!t){ie().length&&xd(0);return}Wb(t)&&le("")}function Jb(){if(Mt||!_.store.stickyOnNavigate)return;let e=Ie();e&&(et=e)}function Sd(e){Mt=!0;let t=0,o=()=>{if(Ya(e)||t>=Pr){Mt=!1;return}t++,dn=setTimeout(o,un)};clearTimeout(dn),o()}function Zb(){_.store.stickyOnNavigate&&et&&Sd(et)}function yd(e){let{target:t}=e;!(t instanceof Element)||Mt||t.closest(`${u.modelTrigger}, ${u.modelItem}`)&&setTimeout(Jb,Hb)}var qd=f({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:_,styles:fd,start(){go=new AbortController,Kb(),et=Ie(),document.addEventListener("keydown",Vb,{capture:!0,signal:go.signal}),document.addEventListener("pointerup",yd,{signal:go.signal}),document.addEventListener("keyup",yd,{signal:go.signal}),hd=[x.on("fall",({outcome:e})=>{cn=e==="done",e==="left"&&(Tt=null),bd()}),x.on("context",({prevId:e,id:t,migrated:o})=>{let n=Oe.get(Rr);Oe.delete(Rr),o&&!e&&t&&n&&Oe.set(t,n),o||(cn=!1,Zb()),Dr(),Et(ie(),ho,_.store.showQueueMode)}),x.on("tick",()=>{Fb(),bd(),Et(ie(),ho,_.store.showQueueMode)})],addEventListener("storage",Qb,{signal:go.signal}),Et(ie(),ho,_.store.showQueueMode)},stop(){go?.abort(),clearTimeout(dn);for(let e of hd)e();Qa(),Oe.clear(),Tt=null,et=null,Mt=!1},onSettingsChange(e){e==="persistAcrossRefresh"&&Dr(),e==="stickyOnNavigate"&&_.store.stickyOnNavigate&&(et=Ie()),Et(ie(),ho,_.store.showQueueMode)}});var Ed=`/*
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
`;var de=C("bloom-recent-"),Pe="home",Xb=50,Td=140,_b=new Set(["Backquote"]),ey=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),w=g({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),tt=null,ye=[],xe=0,Ja,Cd=[],Ur=()=>Te()?null:b()??(Nt()?Pe:null);function Md(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function kd(e){let t=xt(e);t&&w.store.titles[e]!==t&&(w.store.titles={...w.store.titles,[e]:t});let o=Yl(location.href);o&&e===b()&&w.store.projects[e]!==o&&(w.store.projects={...w.store.projects,[e]:o})}function Ld(e){if(!e)return;let t=[e,...w.store.visits.filter(n=>n!==e)].slice(0,Xb),o=new Set(t);w.store.visits=t,Object.keys(w.store.previews).some(n=>!o.has(n))&&(w.store.previews=Md(w.store.previews,o)),Object.keys(w.store.titles).some(n=>!o.has(n))&&(w.store.titles=Md(w.store.titles,o)),e!==Pe&&kd(e)}function ty(e){if(!w.store.visits.includes(e))return;let{[e]:t,...o}=w.store.titles,{[e]:n,...r}=w.store.previews,{[e]:i,...a}=w.store.projects;w.store.visits=w.store.visits.filter(c=>c!==e),w.store.titles=o,w.store.previews=r,w.store.projects=a}function Nr(e){if(!e||!w.store.visits.includes(e))return;let t={},o=Ae(e)?.chain??[];for(let r of o)t[r.role]=Se(Un(r),Td);if(e===b())for(let r of je()){let i=Yt(r);i&&(t[r.role]=Se(i,Td))}let n=w.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(w.store.previews={...w.store.previews,[e]:t})}function oy(){let e=Number(w.store.maxRecent);return w.store.visits.filter(t=>t!==Pe||w.store.includeHome).slice(0,e)}function Id(e){if(yo(),e===Ur())return;let t=e===Pe?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"], [data-sidebar-destination="builtin:home"]'):pt(e)[0];t?t.click():location.assign(e===Pe?"/":`/c/${e}`)}function ny(e){let t=e===Pe?null:w.store.previews[e],o=t&&["user","assistant"].filter(n=>t[n]).map(n=>s("span",{class:de("preview"),attrs:{"data-role":n},text:t[n]}));return s("span",{class:de("thumb"),attrs:{"aria-hidden":"true"}},o?.length?s("span",{class:de("page")},...o):s("span",{class:de("fallback")},T(e===Pe?"plus":"bloom")))}function ry(e,t){let o=e===Pe?"New chat":w.store.titles[e]??xt(e)??"Untitled chat",n=e===Pe?null:w.store.projects[e];return s("button",{class:de("item"),attrs:{type:"button",role:"option","aria-selected":String(t===xe),"aria-label":n?`${o}, ${n}`:o},on:{click:()=>Id(e),pointerenter:()=>t!==xe&&bo(t)}},ny(e),s("span",{class:de("meta")},s("span",{class:`${de("title")} bloom-truncate`,text:o}),n&&s("span",{class:de("project")},T("folder"),s("span",{class:"bloom-truncate",text:n}))))}function Bd(){ye.length?Id(ye[xe]):yo()}function bo(e){ye.length&&(xe=(e+ye.length)%ye.length,tt?.querySelectorAll(`.${de("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===xe))))}function iy(){Nr(b());let e=Ur();ye=oy(),e&&(ye=[e,...ye.filter(o=>o!==e)].slice(0,Number(w.store.maxRecent))),xe=ye.length>1?1:0;let t=ye.length?s("div",{class:de("list"),attrs:{role:"listbox","aria-label":"Recent chats"}},...ye.map(ry)):s("div",{class:de("empty"),text:"Open a few chats, then hold Ctrl+` to switch."});t.style.setProperty("--bloom-recent-count",String(ye.length)),tt=s("div",{class:`bloom-root ${de("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:o=>o.target===o.currentTarget&&yo()}},s("div",{class:de("panel")},t)),ge(tt)}function yo(){tt?.remove(),tt=null}var ay=e=>_b.has(e.code)||ey.has(e.key);function sy(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&ay(e)){e.preventDefault(),e.stopPropagation(),tt?bo(xe+(e.shiftKey?-1:1)):iy();return}if(!tt)return;let o={Escape:yo,Enter:Bd,ArrowRight:()=>bo(xe+1),ArrowDown:()=>bo(xe+1),ArrowLeft:()=>bo(xe-1),ArrowUp:()=>bo(xe-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function ly(e){tt&&e.key==="Control"&&Bd()}var Od=f({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:w,styles:Ed,start(){Ja=new AbortController;let{signal:e}=Ja;addEventListener("keydown",sy,{capture:!0,signal:e}),addEventListener("keyup",ly,{capture:!0,signal:e}),addEventListener("blur",yo,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&Nr(b()),{signal:e}),Cd=[pe(({prevId:i})=>{Nr(i),Ld(Ur())}),V.on("conversation",({id:i})=>{w.store.visits.includes(i)&&kd(i),Nr(i)}),V.on("conversation-missing",({id:i})=>ty(i))];let{visits:t,titles:o,previews:n}=w.store,r=t.filter(i=>i!==Pe&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(w.store.visits=t.filter(i=>!r.includes(i))),Ld(Ur())},stop(){Ja?.abort();for(let e of Cd)e();yo()}});var Za="data:audio/mpeg;base64,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";var Pd=new q("ResponseNotification"),cy=.5,Rd="BloomNoticeClaim",uy=3e4,pn=g({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:e=>(e.append(N("Preview",Fd)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),Dd=null,$a=new Map,Hd=[],Xa,dy=e=>Uint8Array.from(atob(e.slice(e.indexOf(",")+1)),t=>t.charCodeAt(0)).buffer;function my(e,t){let o=$a.get(t);return o||(o=(t.startsWith("data:")?Promise.resolve(dy(t)):yn(t)).then(n=>e.decodeAudioData(n)),o.catch(()=>$a.delete(t)),$a.set(t,o)),o}async function Nd(e){Dd??=new AudioContext;let t=Dd;t.state==="suspended"&&t.resume();let o=t.createBufferSource(),n=t.createGain();o.buffer=await my(t,e),n.gain.value=cy,o.connect(n).connect(t.destination),o.start()}function Fd(){let e=pn.store.soundUrl.trim();Nd(e||Za).catch(t=>{Pd.warn("Sound failed",t),e&&Nd(Za).catch(o=>Pd.warn("Default chime failed",o))})}function fy(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function py(e){let t=qe(Ot(Rd)??"");return e&&k(t)&&t.id===e&&Date.now()-Number(t.at)<uy?!1:(Pt(Rd,{id:e,at:Date.now()}),!0)}function Ud(e){pn.store.onlyWhenHidden&&!document.hidden||py(e)&&(pn.store.sound&&Fd(),pn.store.browserNotification&&fy(xt(e)))}function gy(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(Xa=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:Xa.signal}))}var Gd=f({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply, including chats you left while they were answering.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:pn,start(){gy(),Hd=[x.on("fall",({conversationId:e,outcome:t})=>t==="done"&&Ud(e)),x.on("background",({conversationId:e})=>Ud(e))]},stop(){for(let e of Hd)e();Xa?.abort()}});var hy=`:is(${u.sidebarScroll}, :has(> ${u.sidebarScroll})) + :has(${u.menuButton})`,by=`${u.rail} > :has(${u.menuButton})`,es=`:is(${hy}, ${by}, ${u.oldProfile}):not(:hover)`,_a="[data-bloom-profile-avatar]",yy=`:is(${es}, ${es} :has(${_a})) > :not(${_a}, :has(${_a}))`,Kd=g({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function vy(){let{opacity:e,fadeAvatar:t}=Kd.store;return e>=100?"":`${t?es:yy}{opacity:${e/100}!important}`}var Yd,Qd=f({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Kd,styles:vy,start(){Yd=Me()},stop(){Yd?.()}});var zd=`/*
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
`;var G=C("bloom-star-chats"),wy=80,xy=60,Sy=1200,qy=120,gn=g({replaceReadAloud:{type:"boolean",description:"Put the star where the reply's Read aloud button is, and hide that button.",default:!0},messages:{type:"custom",default:[]}}),Ey=`:is(${u.turnActions}) ${u.readAloud}`,ts,os=!1,ot=!1,kt=!1,Fr=0,X=null,Gr="",P=null,ns,nt;function is(){let e=gn.store.messages;return Array.isArray(e)?e.filter(t=>k(t)&&typeof t.conversationId=="string"&&typeof t.messageId=="string"&&(t.role==="user"||t.role==="assistant")&&typeof t.snippet=="string"&&typeof t.starredAt=="number"):[]}function as(){let e=b();return e?is().filter(t=>t.conversationId===e):[]}function Ty(e,t){return is().some(o=>o.conversationId===e&&o.messageId===t)}function jd(e){let t=is(),o=t.some(n=>n.conversationId===e.conversationId&&n.messageId===e.messageId);gn.store.messages=o?t.filter(n=>!(n.conversationId===e.conversationId&&n.messageId===e.messageId)):[{...e,starredAt:Date.now()},...t].slice(0,wy)}function rs(e){return e.messageIds[0]||e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.el.getAttribute("data-turn-key")||""}function Cy(e){return Se(Yt(e)||y(e.el.textContent??""),xy)}function My(e){let t=e.closest(u.turn);if(!t)return null;let o=je().filter(n=>t.contains(n.el));return o.find(n=>n.el.contains(e)||n.el===t)??o.findLast(n=>n.el.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING)??null}function Ly(){let e=[...document.querySelectorAll(u.turnActions)].filter(t=>!t.closest(`[data-bloom], [role="dialog"], [inert], pre, ${u.sidebars}`));return e.filter(t=>!e.some(o=>o!==t&&o.contains(t)))}function ky(e,t){let o=gn.store.replaceReadAloud?t.querySelector(u.readAloud):null;if(o&&!o.closest("[data-bloom]")){e.nextElementSibling!==o&&o.before(e);return}let n=Iy(t);(e.parentElement!==n||n.lastElementChild!==e)&&n.append(e)}function Iy(e){let t=[...e.querySelectorAll("button")].filter(n=>n.dataset.bloom!=="message-star"&&!n.closest("[data-bloom]"));return t.length?[...e.children].find(n=>n instanceof HTMLElement&&n!==t[0]&&t.every(r=>n.contains(r)))??e:e}function By(){return[...document.querySelectorAll(u.headerMore)].filter(t=>{if(t.dataset.bloom==="message-star"||t.closest("[data-bloom], [role='dialog'], [inert]")||t.closest(u.sidebars))return!1;let o=t.getBoundingClientRect();return o.width===0&&o.height===0?!!t.closest("header, #page-header"):o.top>=0&&o.top<96&&o.left>window.innerWidth*.5}).toSorted((t,o)=>o.getBoundingClientRect().left-t.getBoundingClientRect().left||(t.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1))[0]??null}function Wd(e,t,o){return s("button",{class:t,attrs:{type:"button","aria-label":e},on:{pointerdown:n=>n.stopPropagation(),mousedown:n=>n.stopPropagation(),click:n=>{n.preventDefault(),n.stopPropagation(),o(n)}}},T("star"))}function Oy(e,t){e.setAttribute("aria-pressed",String(t)),e.setAttribute("aria-label",t?"Unstar":"Star")}function Yr(){return ot||kt}function vo(){Fr&&window.clearTimeout(Fr),Fr=0}function Ao(){ot=!1,kt=!1,vo(),nt?.enter(),X?.remove(),X=null,Gr="",P?.classList.remove(G("-open")),P?.setAttribute("aria-expanded","false")}function Kr(e){return e instanceof Node&&!!(P?.contains(e)||X?.contains(e))}function Py(e){e.classList.add(G("-flash")),window.setTimeout(()=>e.classList.remove(G("-flash")),Sy)}function Ry(e){let t=je().find(n=>rs(n)===e),o=t?.el.closest(u.turn)??t?.el;o&&(o.scrollIntoView({block:"start"}),Py(o))}function Dy(){let e=b(),t=new Set,o=[...document.querySelectorAll('[data-bloom="message-star"][data-place="action"]')];if(!e||Te()){for(let n of o)n.remove();return}for(let n of Ly()){if(!we(n))continue;let r=My(n),i=r?rs(r):"";if(!r||!i)continue;let a=n.querySelector('[data-place="action"]');(!a||a.dataset.id!==i)&&(a?.remove(),a=Wd("Star",G("-star"),()=>{let c=b(),l=je().find(d=>rs(d)===i);!c||!l||jd({conversationId:c,messageId:i,role:l.role,snippet:Cy(l)})}),a.dataset.bloom="message-star",a.dataset.place="action",a.dataset.id=i),Oy(a,Ty(e,i)),ky(a,n),t.add(a)}for(let n of o)t.has(n)||n.remove()}function Hy(){if(!X||!P)return;let e=P.getBoundingClientRect(),t=X.offsetWidth||288,o=X.offsetHeight||120,n=e.bottom+6;n+o>window.innerHeight-8&&(n=Math.max(8,e.top-o-6));let r=Math.max(8,Math.min(e.right-t,window.innerWidth-t-8));X.dataset.place=n>=e.bottom?"below":"above",X.style.left=`${Math.round(r)}px`,X.style.top=`${Math.round(n)}px`}function Ny(){if(!Yr()||!P){X?.remove(),X=null,Gr="",P?.classList.remove(G("-open")),P?.setAttribute("aria-expanded","false");return}let e=as(),t=e.map(o=>`${o.messageId}	${o.snippet}`).join(`
`);if(!X||Gr!==t){X?.remove();let o=e.map(n=>s("div",{class:G("-row")},s("button",{class:G("-jump"),attrs:{type:"button"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),Ao(),Ry(n.messageId)}}},s("span",{class:G("-role"),text:n.role==="user"?"You":"ChatGPT"}),s("span",{class:G("-snip"),text:n.snippet||"Message"})),Wd("Unstar",G("-unstar"),()=>jd(n))));X=s("div",{class:`bloom-root ${G("-panel")}`,attrs:{"data-bloom":"star-list"},on:{pointerenter:()=>{vo(),nt?.enter(),kt=!0},pointerleave:n=>{Kr(n.relatedTarget)||ot||nt?.leave(n)}}},s("div",{class:G("-bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:G("-head"),text:"Starred"}),s("div",{class:G("-body")},...o.length?o:[s("div",{class:G("-empty"),text:"No starred messages in this chat"})])),document.body.append(X),Gr=t}Hy(),P.classList.add(G("-open")),P.setAttribute("aria-expanded","true")}function Uy(){for(let r of document.querySelectorAll('[data-bloom="starred"]'))r.remove();let e=By(),t=e?.parentElement??null,o=b();if(!e||!t||t.closest(u.sidebars)||!o||Te()||!we(t)){P?.remove(),P=null,Ao();return}P||(P=s("button",{class:G("-toggle"),attrs:{type:"button","data-bloom":"message-star","data-place":"header","aria-label":"Starred messages","aria-expanded":"false"},on:{pointerdown:r=>r.stopPropagation(),pointerenter:()=>{vo(),nt?.enter(),Fr=window.setTimeout(()=>{kt=!0,Lt()},qy)},pointerleave:r=>{Kr(r.relatedTarget)||(vo(),Yr()&&nt?.leave(r))},click:r=>{r.preventDefault(),r.stopPropagation(),ot=!ot,kt=ot,vo(),ot||Ao(),Lt()}}},T("star"))),(P.parentElement!==t||P.nextElementSibling!==e)&&e.before(P);let n=e.getBoundingClientRect();n.width>0&&(P.style.width=`${n.width}px`,P.style.height=`${n.height}px`),P.classList.toggle(G("-here"),as().length>0),Ny()}function Fy(){let e=new Set(as().map(t=>t.messageId));for(let t of document.querySelectorAll('[data-bloom="navigator"] .bloom-nav-tick, [data-bloom="navigator"] .bloom-nav-row'))t.classList.toggle(G("-mark"),!!t.dataset.messageId&&e.has(t.dataset.messageId))}function Lt(){if(!os){os=!0;try{for(let e of document.querySelectorAll('[data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();Dy(),Uy(),Fy()}finally{os=!1}}}function Gy(){Ao(),P?.remove(),P=null;for(let e of document.querySelectorAll('[data-bloom="message-star"], [data-bloom="star-list"], [data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();for(let e of document.querySelectorAll(`.${G("-mark")}`))e.classList.remove(G("-mark"))}var Vd=f({name:"StarChats",description:"Star a message from its toolbar. The star left of the top-right menu opens this chat's list.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:gn,styles:()=>`${zd}${gn.store.replaceReadAloud?Ye([Ey]):""}`,onSettingsChange(e){(e==="messages"||e==="replaceReadAloud")&&Lt()},start(){for(let o of document.querySelectorAll('[data-bloom="star-list"]'))o.remove();nt=_n({over:Kr,trigger:()=>P,panel:()=>X,setHeld(o){if(o){kt=!0,Lt();return}ot||(kt=!1,Lt())}}),ts=M(o=>Y(o)&&Lt());let e=o=>{Kr(o.target)||Yr()&&Ao()};document.addEventListener("pointerdown",e,!0);let t=o=>{o.key!=="Escape"||!Yr()||(o.preventDefault(),Ao())};document.addEventListener("keydown",t,!0),ns=()=>{document.removeEventListener("pointerdown",e,!0),document.removeEventListener("keydown",t,!0)},Lt()},stop(){ts?.(),ts=void 0,ns?.(),ns=void 0,vo(),nt?.dispose(),nt=void 0,Gy()}});var Jd="filter:blur(6px)!important;transition:filter 0.2s ease",Zd=`:is(${u.sidebars})`,It="data-bloom-streamer-open",Yy="[data-app-action-sidebar-thread-row], [data-app-action-sidebar-project-row], .bloom-recent-item";function Ky(){return{conversations:{selectors:[`${Zd} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0,row:"[data-app-action-sidebar-thread-row]"},projects:{selectors:[`${Zd} a:is([href*="/project"], [href*="/g/g-p-"])`,"[data-app-action-sidebar-project-row]",".bloom-recent-project"],hover:!0,row:"[data-app-action-sidebar-project-row]"},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}}}var $d=g({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function Qy(e,t){let o=[`:is(${e}):hover`,`.bloom-recent-item:hover :is(${e})`,`:is(${e})[${It}]`];return t&&o.push(`${t}:hover`,`${t}:hover :is(${e})`,`${t}:is(${e}):hover`,`${t}[${It}]`,`${t}[${It}] :is(${e})`),o.join(",")}function zy(){let e=Ky();return Object.entries(e).filter(([t])=>$d.store[t]).map(([,t])=>{let o=t.selectors.join(",");if(!t.hover)return`:is(${o}){${Jd}}`;let n="row"in t?t.row:void 0;return`:is(${o}){${Jd}}${Qy(o,n)}{filter:none!important}`}).join(`
`)}function jy(e,t){for(let o of document.elementsFromPoint(e,t))if(o instanceof Element){let n=o.closest(Yy);if(n)return n}return null}function cs(e){for(let t of document.querySelectorAll(`[${It}]`))t!==e&&t.removeAttribute(It);e&&!e.hasAttribute(It)&&e.setAttribute(It,"")}var wo,Wy=Ke(()=>{wo&&cs(jy(wo.clientX,wo.clientY))});function ss(e){wo=e,Wy()}function Vy(e){e.relatedTarget instanceof Node&&document.documentElement.contains(e.relatedTarget)||(wo=void 0,cs(null))}var ls,Qr,Xd=f({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:$d,styles:zy,start(){ls=Me(),Qr=new AbortController;let e={capture:!0,signal:Qr.signal,passive:!0};document.addEventListener("pointerover",ss,e),document.addEventListener("pointermove",ss,e),document.addEventListener("pointerout",ss,e),window.addEventListener("pointerleave",Vy,e)},stop(){Qr?.abort(),Qr=void 0,wo=void 0,cs(null),ls?.(),ls=void 0}});var em=g({openNewAsTemporary:{type:"boolean",description:"Open New chat as a temporary chat.",default:!1}}),Jy=/^(?:new chat|新聊天)$/i,zr;function Zy(e){return e?"/?temporary-chat=true":"/"}function $y(e){let t=Zy(e);`${location.pathname}${location.search}`===t||e&&Te()&&location.pathname==="/"||location.assign(t)}function Xy(e){if(e.closest("[data-bloom]"))return!1;try{let t=new URL(e.href,location.origin);return t.origin===location.origin&&t.pathname==="/"}catch{return!1}}function _y(e){return e.closest("[data-bloom], [data-app-action-sidebar-project-row]")?!1:Jy.test(e.getAttribute("aria-label")??y(e.textContent??""))}function ev(e){if(!em.store.openNewAsTemporary||Te())return;let{target:t}=e;if(!(t instanceof Element))return;let o=t.closest("a[href], button"),n=o instanceof HTMLAnchorElement?Xy(o):!!o&&_y(o);!o||!n||o.closest(`${u.sidebarScroll}, ${u.rail}, ${u.oldSidebar}, nav`)&&(e.preventDefault(),e.stopPropagation(),$y(!0))}function _d(){for(let e of document.querySelectorAll('[data-bloom="temporary-chat"]'))e.remove()}var tm=f({name:"TemporaryChat",description:"Optionally open New chat as a temporary chat. No extra sidebar button.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"ghost",enabledByDefault:!0,settings:em,start(){_d(),zr=new AbortController,document.addEventListener("pointerdown",ev,{capture:!0,signal:zr.signal})},stop(){zr?.abort(),zr=void 0,_d()}});var rt=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)','[data-turn-key] [data-message-author-role="user"] blockquote:not(.twitter-tweet)','[class~="group/user-message"] blockquote:not(.twitter-tweet)'].join(","),us=g({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function tv(){let e=[`${rt}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${rt}>*{margin-block:0!important}`];return us.store.italic||e.push(`${rt}{font-style:inherit!important}`),us.store.quotes||(e.push(`${rt}{quotes:none!important}`),e.push(`${rt}::before,${rt}::after,${rt} p::before,${rt} p::after{content:none!important}`)),e.join(`
`)}var om=f({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:us,styles:tv});var ov=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],nv=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",rv='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',nm=g({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function iv(){let e=`${nm.store.width}rem`;return`:is(${nv}){${ov.map(t=>`${t}:${e}!important`).join(";")}}:is(${rv}){max-width:min(100%, ${e})!important}`}var rm=f({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:nm,styles:iv});var av=[gc,Vl,Bc,Gc,Qc,tu,ru,iu,su,gu,Eu,Ou,Uu,od,rd,id,ud,qd,Od,Gd,Qd,Vd,Xd,tm,om,rm],ds=av;var sv=new q("Bloom"),im="2.0.99";var ms=0,jr;function lv(){ms++,jr?.(),jr=void 0,js(),qo(),An()}async function fs(){let e=++ms,t=()=>e===ms;qo(),An(),il();for(let o of ds)o.updatedAt=Ll[o.name];Ps(ds),ks(),Ds(),indexedDB.deleteDatabase("bloompp"),Bt("base",Vs),ql(),Mn("Init"),On().then(()=>{t()&&(ws(),Mn("DOMContentLoaded"))}),await sl(),t()&&(Mn("HostReady"),jr?.(),jr=Ml(),zs(),sv.info(`Bloom++ ${im} ready`))}var cv=new q("Boot");window===window.top&&(Ss(oe.Bloom),qs(ps),fs().catch(e=>cv.error("Startup failed",e)));})();
