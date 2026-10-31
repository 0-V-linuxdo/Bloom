// ==UserScript==
// @name         Bloom++ (ChatGPT app)
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.108
// @description  Bloom++ host for the official ChatGPT macOS app. Injected over loopback CDP; not a web userscript.
// @author       0-V-linuxdo & Bloom contributors
// @homepageURL  https://github.com/0-V-linuxdo/Bloom
// @supportURL   https://github.com/0-V-linuxdo/Bloom/issues
// @match        app://*/*
// @run-at       document-start
// @grant        none
// @license      GPL-3.0-or-later
// ==/UserScript==

/* Bloom++ v2.0.108 ChatGPT app host. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Nu=Object.defineProperty;var Uu=(t,e)=>{for(var o in e)Nu(t,o,{get:e[o],enumerable:!0})};var x=class{constructor(e){this.tag=e}log(e,o){console[e](`[Bloom++] [${this.tag}]`,...o)}debug(...e){this.log("debug",e)}info(...e){this.log("info",e)}warn(...e){this.log("warn",e)}error(...e){this.log("error",e)}};var nt=(t,e,o)=>Math.min(o,Math.max(e,t)),k=t=>typeof t=="object"&&t!==null&&!Array.isArray(t),eo=t=>`${t}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,bt=(t,e)=>t.length>e?`${t.slice(0,e-1)}\u2026`:t,v=t=>t.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function wa(t,e){return`${t} ${e}${t===1?"":"s"}`}async function zo(t){if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}await navigator.clipboard.writeText(t)}function Vo(t){try{return JSON.parse(t)}catch{return}}var mt=typeof unsafeWindow>"u"?window:unsafeWindow,Fu=200,Ku=300;function Jo(t){return new Promise((e,o)=>GM_xmlhttpRequest({url:t,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=Fu&&n<Ku?e(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var Gu=new x("Styles"),Nt=new Map,oo=new Set,oe=new Map,yr=!0,xa=t=>t.replaceAll(/[^A-Za-z0-9_-]/g,"_"),Yu=t=>`:where(:root){--bloom-sheet-${xa(t)}:1}`,ju=(t,e)=>`${Yu(t)}${e}`,Sa=t=>`bloom-style-${t}`;function qa(t){try{return[...t.cssRules].map(e=>e.cssText).join(`
`)}catch{return""}}function Qu(t,e){let o=qa(t);return o?o.includes(`--bloom-sheet-${xa(e)}`)?!0:e==="plugin-StreamerMode"?o.includes("blur(6px)")&&(o.includes("data-app-action-sidebar-thread-title")||o.includes("data-bloom-streamer-open")):e==="plugin-WiderChat"?o.includes("--composer-adjacent-max-width")&&o.includes("--thread-content-max-width"):e==="plugin-ComposerOpacity"?o.includes("--composer-layout-surface-backdrop-filter")||o.includes("--composer-layout-surface-background")&&o.includes("color-mix"):!1:!1}function Ea(t){let e=qa(t);return e?!!(e.includes("--bloom-")||e.includes(".bloom-")||e.includes("[data-bloom")||e.includes("--bloom-sheet-")||e.includes("blur(6px)")&&e.includes("data-app-action-sidebar-thread-title")||e.includes("--composer-adjacent-max-width")&&e.includes("--thread-content-max-width")||e.includes("--composer-layout-surface-backdrop-filter")):!1}function Ta(){let t=document.adoptedStyleSheets.filter(e=>!oo.has(e)&&!Ea(e));document.adoptedStyleSheets=[...t,...Nt.values()]}function Ma(t){document.readyState==="loading"||t.parentNode===document.head||document.head.append(t)}function Wu(t,e){let o=oe.get(t);o||(o=document.createElement("style"),o.id=Sa(t),oe.set(t,o)),o.textContent!==e&&(o.textContent=e),Ma(o)}function Zo(t,e){let o=ju(t,e);if(yr)try{let n=Nt.get(t);n||(n=new mt.CSSStyleSheet,Nt.set(t,n),oo.add(n)),n.replaceSync(o),Ta();return}catch(n){Gu.warn("Constructed style sheets unavailable, using <style> after parsing",n),yr=!1;let r=Nt.get(t);r&&oo.delete(r),Nt.delete(t)}Wu(t,o)}function no(t){let e=Nt.get(t);e&&(oo.delete(e),Nt.delete(t)),oe.get(t)?.remove(),oe.delete(t);for(let o of document.querySelectorAll(`style[id="${Sa(t)}"]`))o.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(o=>o!==e&&!Qu(o,t)),yr&&Ta()}catch{}}function ro(){Nt.clear(),oo.clear();for(let t of oe.values())t.remove();oe.clear();for(let t of document.querySelectorAll("style[id^='bloom-style-']"))t.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(t=>!Ea(t))}catch{}}function Ca(){for(let t of oe.values())Ma(t)}var I=t=>(...e)=>e.map(o=>t+o).join(" "),$o=(...t)=>t.filter(Boolean).join(" "),Ut=t=>t.length?`${t.map(e=>`${e}:not([data-bloom])`).join(",")}{display:none!important}`:"";var La="__bloomHost",vr=new x("Boot"),zu=['[data-bloom="navigator"]','[data-bloom="settings"]','[data-bloom="history-hud"]','[data-bloom="history-dialog"]','[data-bloom="star-list"]','[data-bloom="entry"]','[data-bloom="menu-entry"]','[data-bloom="menu-flyout"]','[data-bloom="message-star"]','[data-bloom="starred"]','[data-bloom="chat-star"]','[data-bloom="queue"]','[data-bloom="recent"]','[data-bloom="quote-chip"]','[data-bloom="quote-back"]','[data-bloom="cls"]','[data-bloom="timestamp"]','[data-bloom="tooltip"]','[data-bloom="notices"]'].join(", "),Vu=["data-bloom-greeting","data-bloom-placeholder","data-bloom-streamer-open","data-bloom-share","data-bloom-invite","data-bloom-csi-avatar","data-bloom-csi-sized"];function Xo(){if(!(typeof document>"u"||!document.documentElement)){for(let t of document.querySelectorAll(zu))t.remove();for(let t of Vu)for(let e of document.querySelectorAll(`[${t}]`))e.removeAttribute(t);for(let t of document.querySelectorAll("[data-bloom-text]"))t.removeAttribute("data-bloom-text"),t.style.removeProperty("--bloom-text-size"),t.style.removeProperty("--bloom-text")}}function Ju(t){if(vr.warn("Replacing another Bloom++ instance",t.VERSION),t.destroy){t.destroy();return}for(let e of t.plugins?.values()??[]){try{e.stop?.()}catch(o){vr.error("Failed to stop previous plugin",o)}e.styles="",e.start=void 0}ro()}function ka(t){let e=mt,o=new Set;for(let n of[t,e.Bloom,e[La]])if(!(!n||o.has(n))){o.add(n);try{Ju(n)}catch(r){vr.error("Failed to retire Bloom++",r)}}Xo()}function Ia(t){let e=mt;try{delete e.Bloom}catch{}Object.defineProperty(e,"Bloom",{value:t,configurable:!0,writable:!0}),Object.defineProperty(e,La,{value:t,configurable:!0,writable:!0})}var va={};Uu(va,{VERSION:()=>Hu,destroy:()=>Nh,init:()=>ya,plugins:()=>Z});var Zu=new x("Dom");function a(t,e={},...o){let n=document.createElement(t);e.class&&(n.className=e.class),e.text!=null&&(n.textContent=e.text),e.title&&(n.title=e.title);for(let[r,i]of Object.entries(e.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(e.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var Ba=document.createElement("template");function Pa(t){return Ba.innerHTML=t.trim(),Ba.content.firstElementChild.cloneNode(!0)}var rt=t=>t instanceof HTMLElement&&t.isConnected&&t.getClientRects().length>0&&!t.closest("[inert]"),yt=(t,e=document)=>[...e.querySelectorAll(t)].find(rt)??null,$u=16,Xu="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function en(t,e){let o=setInterval(t,e),n;try{n=new Worker(URL.createObjectURL(new Blob([Xu],{type:"text/javascript"}))),n.addEventListener("message",t),n.postMessage(e)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function Ar(t){document.hidden?setTimeout(t,$u):requestAnimationFrame(t)}function Ft(t){let e=!1;return()=>{e||(e=!0,Ar(()=>{e=!1;try{t()}catch(o){Zu.error("Scheduled task failed",o)}}))}}var _o=new Set,tn=[],io,_u=Ft(()=>{let t=tn;tn=[];for(let e of _o)e(t)});function C(t){return _o.add(t),io||(io=new MutationObserver(e=>{tn.push(...e),_u()}),io.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),t([]),()=>{_o.delete(t),!_o.size&&(io?.disconnect(),io=void 0,tn=[])}}var td=t=>t instanceof Element&&(t.hasAttribute("data-bloom")||!!t.closest("[data-bloom]")),Y=t=>!t.length||t.some(e=>!td(e.target)),ed=t=>`"${t.replaceAll("\\","\\\\").replaceAll('"','\\"').replaceAll(`
`,"\\A ")}"`;function ne(t,e){if(e==null){t.removeAttribute("data-bloom-text"),t.style.removeProperty("--bloom-text-size"),t.style.removeProperty("--bloom-text");return}t.style.setProperty("--bloom-text",ed(e)),t.getAttribute("data-bloom-text")!==e&&t.setAttribute("data-bloom-text",e)}function h(t){return t}var od=new x("Storage");function on(t){try{return localStorage.getItem(t)??void 0}catch{return}}function nn(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch(o){od.warn("localStorage write failed",o)}}function Oa(t,e){addEventListener("storage",o=>{o.key===t&&e(o.newValue)})}var wr="BloomSettings",nd=100,Kt={plugins:{}},rn=new Set,xr=new Set,Se;function Ra(t){let e=t;for(let o=0;typeof e=="string"&&o<2;o++)e=Vo(e);return!k(e)||!k(e.plugins)||!Object.keys(e.plugins).length?null:e}function Ha(){let t=Ra(on(wr));t&&(Kt.plugins=t.plugins)}var Da=(t,e)=>`${t}
${e}`;function Sr(){Se=void 0,xr.clear(),nn(wr,Kt)}function rd(t){let e=Ra(t);if(!e)return;let o=[];for(let n of new Set([...Object.keys(Kt.plugins),...Object.keys(e.plugins)])){let r=Kt.plugins[n]??={},i=k(e.plugins[n])?e.plugins[n]:{};for(let s of new Set([...Object.keys(r),...Object.keys(i)]))xr.has(Da(n,s))||JSON.stringify(r[s])===JSON.stringify(i[s])||(i[s]===void 0?delete r[s]:r[s]=i[s],o.push([n,s]))}for(let[n,r]of o)for(let i of rn)i(n,r)}function qr(){Se&&(clearTimeout(Se),Sr())}function Na(t){let e=Object.keys(Kt.plugins).filter(o=>!t.has(o));if(!e.length)return e;for(let o of e)delete Kt.plugins[o];return clearTimeout(Se),Sr(),e}var it=(t,e)=>Kt.plugins[t]?.[e];function pt(t,e,o){let n=Kt.plugins[t]??={};o===void 0?delete n[e]:n[e]=o,xr.add(Da(t,e)),clearTimeout(Se),Se=setTimeout(Sr,nd);for(let r of rn)r(t,e)}function qe(t){return rn.add(t),()=>void rn.delete(t)}function Er(t){return t.type==="component"?void 0:t.default}function y(t){let e={def:t,pluginName:"",store:new Proxy({},{get:(o,n)=>it(e.pluginName,n)??(t[n]&&Er(t[n])),set:(o,n,r)=>(pt(e.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(t))t[o].type!=="custom"&&it(e.pluginName,o)!==void 0&&pt(e.pluginName,o)}};return e}var Ua=t=>{let e=()=>{let o=it("Settings",t);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>e().includes(o),list:e,toggle(o){let n=e();pt("Settings",t,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},an=Ua("pinnedPlugins"),sn=Ua("starredPlugins");addEventListener("pagehide",qr);Oa(wr,rd);var lo=new x("PluginManager"),Z=new Map,Gt=new Set,cn=new Set,Tr=new Set,ao=new Map,id=2880*60*1e3;function Fa(t){for(let e of t)e.settings&&(e.settings.pluginName=e.name),Z.set(e.name,e)}var Ka=()=>{let t=it("Settings","knownPlugins");return k(t)?t:null};function Ga(){let t=Na(new Set(Z.keys()));t.length&&lo.info(`Dropped settings of removed plugins: ${t.join(", ")}`);let e=Ka(),o=Date.now(),n={...e},r=[...Z.values()].filter(i=>!i.hidden&&!i.required&&!(i.name in n));for(let i of r)n[i.name]=e?o:0;for(let i of Object.keys(n))Z.has(i)||delete n[i];JSON.stringify(n)!==JSON.stringify(e)&&pt("Settings","knownPlugins",n)}var Ya=t=>{let e=Ka()?.[t];return!!e&&Date.now()-e<id},ja=t=>ao.get(t);function Qa(){for(let t of Tr)t()}function Mr(t,e){let o=ao.get(t);(e?o?.join(`
`)===e.join(`
`):!o)||(e?ao.set(t,e):ao.delete(t),Qa())}var Ct=t=>!!t.required||(it(t.name,"enabled")??!!t.enabledByDefault),Cr=t=>Gt.has(t),so=t=>`plugin-${t.name}`;function Wa(t){if(!t.styles)return;let e=typeof t.styles=="function"?t.styles():t.styles;e?Zo(so(t),e):no(so(t))}function za(t){if(!Gt.has(t.name))try{Wa(t),t.start?.(),Gt.add(t.name)}catch(e){no(so(t)),lo.error(`Failed to start ${t.name}`,e)}}function un(t){Gt.delete(t.name),no(so(t));try{t.stop?.()}catch(e){lo.error(`Failed to stop ${t.name}`,e)}}var Lr=t=>t.startAt??"HostReady";function Va(t){if(Ct(t)){cn.has(Lr(t))&&za(t);return}un(t)}function dn(t){cn.add(t);for(let e of Z.values())Lr(e)===t&&Va(e);lo.info(`${t}: ${[...Gt].join(", ")}`)}function Ja(t){un(t)}function Za(t){Ct(t)&&cn.has(Lr(t))&&za(t)}function $a(t,e){pt(t.name,"enabled",e),qr()}function ad(){for(let t of Z.values())t.required||Ct(t)||(Gt.has(t.name)?un(t):no(so(t)))}var ln;function Xa(){ln?.(),ln=C(()=>ad())}function _a(){ln?.(),ln=void 0;for(let t of Z.values())un(t);Gt.clear(),cn.clear(),ao.clear()}function ts(t){return Tr.add(t),()=>void Tr.delete(t)}qe((t,e)=>{let o=Z.get(t);if(o){if(e==="enabled"){typeof it(t,"enabled")=="boolean"&&Va(o),Qa();return}if(Gt.has(t))try{Wa(o),o.onSettingsChange?.(e)}catch(n){lo.error(`Settings change failed for ${t}`,n)}}});var es=`/*
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
`;var ld=new x("Events");function Ee(){let t=new Map;return{on(e,o){let n=t.get(e);return n||t.set(e,n=new Set),n.add(o),()=>void n.delete(o)},emit(e,o){for(let n of t.get(e)??[])try{n(o)}catch(r){ld.error(`Listener for ${String(e)} failed`,r)}}}}function os(t,e){let o=t instanceof Element?[t,...t.querySelectorAll("*")]:[...t.querySelectorAll("*")];for(let n of o){let r=n.shadowRoot;r&&(e(r),os(r,e))}}function Yt(t,e=document){let o=[...e.querySelectorAll(t)];return os(e,n=>o.push(...n.querySelectorAll(t))),o}var Lt=(t,e=document)=>Yt(t,e).find(rt)??null;var c={rail:"[data-app-navigation-rail]",sidebarScroll:"[data-app-action-sidebar-scroll]",sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"[data-app-action-sidebar-scroll]",oldRail:"[data-app-navigation-rail]",oldProfile:'button[aria-label="Open profile menu" i]',threadRow:"[data-app-action-sidebar-thread-row]",threadSelected:"[data-app-action-sidebar-thread-row][data-app-action-sidebar-thread-selected='true']",threadTitle:"[data-app-action-sidebar-thread-title]",projectRow:"[data-app-action-sidebar-project-row]",projectLabel:"[data-app-action-sidebar-project-label]",destination:"[data-sidebar-destination]",conversationLink:"[data-app-action-sidebar-thread-row]",timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:"[data-turn-key]",turn:"[data-turn-key]",messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",userBubble:'[class~="group/user-message"]',assistantReply:"[data-response-annotation-target]",oldThread:"[data-app-action-timeline-scroll]",turnActions:'.turn-action-controls, [class*="turn-action-controls"]',readAloud:'button:is([aria-label="Read aloud" i], [aria-label^="Read aloud" i], [aria-label="Stop reading" i], [aria-label^="Stop reading" i], [aria-label="\u6717\u8BFB"], [aria-label^="\u6717\u8BFB"], [aria-label="\u505C\u6B62\u6717\u8BFB"], [data-testid*="read-aloud" i])',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery, [class*='recovery']",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composer:"[data-chatgpt-composer], [data-composer-input]",composerInput:'[data-composer-input] [contenteditable="true"].ProseMirror, [contenteditable="true"].ProseMirror',composerConversation:"[data-above-composer-conversation-id]",oldComposerForm:"[data-chatgpt-composer]",sendButton:'button[aria-label="Send" i], button[aria-label="Send prompt" i], button[aria-label="Send message" i]',stopButton:'button[aria-label="Stop" i], button[aria-label^="Stop " i], button[aria-label="\u505C\u6B62" i], button[aria-label^="\u505C\u6B62"]',composerFooter:"[data-chatgpt-composer]",modelTrigger:'button[aria-label="Model selector" i], button[aria-label="Select ChatGPT model" i], [data-chatgpt-composer] button[aria-haspopup="menu"]',modelItem:'[role="menu"] [role="menuitemradio"], [role="menu"] [role="menuitem"]',effortSlider:'[role="menu"] [data-reasoning-slider]',homeHeading:'main h1:not([aria-hidden="true"]), [role="main"] h1:not([aria-hidden="true"]), [data-testid="home-heading"], [data-homepage-takeover] h1, .heading-xl, [class~="heading-xl"]',headerMore:'button[aria-label="More" i], button[aria-label="\u66F4\u591A"]',headerTitle:"[data-thread-title], [data-thread-title-trigger]",profile:'button[aria-label="Open profile menu" i]',rightPanel:"aside[data-app-shell-focus-area='right-panel']",summaryPanel:"[data-summary-panel-variant]"};var ns=/[​-‍﻿]/g,ft=()=>Lt(c.composerInput),co=t=>t instanceof HTMLElement&&t.matches(c.composerInput),st=(t=ft())=>t?.closest("form")??t?.closest(c.composer)??Lt(c.composer);function J(t=ft()){if(!t)return"";if(t instanceof HTMLTextAreaElement)return t.value.replace(ns,"").trim();let e=t.cloneNode(!0);for(let n of e.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...e.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:e.textContent??"").replace(ns,"").trim()}var cd=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function rs(t,e){let o=e?"insertText":"deleteContentBackward";t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:o,data:e||null})),t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:o,data:e||null}))}function kt(t,e=ft()){if(!e)return!1;if(e.focus(),e instanceof HTMLTextAreaElement)return cd?.call(e,t),e.dispatchEvent(new Event("input",{bubbles:!0})),e.setSelectionRange(t.length,t.length),!0;let o=getSelection();return o?.selectAllChildren(e),typeof document.execCommand=="function"?t?document.execCommand("insertText",!1,t):document.execCommand("delete"):rs(e,t),J(e)!==t.trim()&&rs(e,t),o?.selectAllChildren(e),o?.collapseToEnd(),!0}function is(t,e){let o=t;for(;o&&o!==e;){if(o instanceof HTMLElement&&o.parentElement===e)return o;o=o.parentNode}return null}function as(t,e,o){let n=document.createRange();return n.selectNodeContents(t),o?n.setEnd(e.startContainer,e.startOffset):n.setStart(e.endContainer,e.endOffset),n.toString().includes(`
`)?!0:!!n.cloneContents().querySelector("br")}function ss(t){if(t instanceof HTMLTextAreaElement){let{selectionStart:f,selectionEnd:T,value:g}=t;return{first:!g.slice(0,f).includes(`
`),last:!g.slice(T).includes(`
`)}}let e=getSelection();if(!e?.rangeCount||!t.contains(e.anchorNode))return{first:!0,last:!0};let o=e.getRangeAt(0),n=[...t.children].filter(f=>f instanceof HTMLElement),r=is(o.startContainer,t),i=is(o.endContainer,t),s=!r||r===n[0],d=!i||i===n[n.length-1],l=o.getBoundingClientRect(),u=(r??t).getBoundingClientRect(),m=Number.parseFloat(getComputedStyle(r??t).lineHeight)||24;return l.height?{first:s&&l.top-u.top<m,last:d&&u.bottom-l.bottom<m}:{first:s&&!as(r??t,o,!0),last:d&&!as(i??t,o,!1)}}var ls=t=>{let e=st();return(e&&Lt(t,e))??Lt(t)},kr=()=>ls(c.stopButton),ud=()=>{let t=ls(c.sendButton);return t&&!t.matches(c.stopButton)?t:null};function cs(){let t=ud();if(t){t.disabled||t.click();return}ft()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var us=()=>rt(kr());var mn=new x("AppProtocol"),uo=Ee();function dd(t){let e=t;if(typeof e=="string")try{e=JSON.parse(e)}catch{return null}if(Array.isArray(e)||!e||typeof e!="object")return null;let o=e,n=o.notification&&typeof o.notification=="object"?o.notification:o;if(typeof n.method!="string")return null;let r=n.params&&typeof n.params=="object"?n.params:void 0;return{method:n.method,params:r}}function mo(t){if(Array.isArray(t)){for(let o of t)mo(o);return}let e=dd(t);e&&uo.emit("note",e)}var Br=new WeakMap,Ir=new WeakMap;function md(t,e){let o=Br.get(t);if(o)return o;let n=r=>{mo(r.data),typeof t=="function"?t.call(e,r):t.handleEvent(r)};return Br.set(t,n),n}function pd(){let t=MessagePort.prototype,e=t.addEventListener,o=t.removeEventListener;t.addEventListener=function(r,i,s){return r!=="message"?e.call(this,r,i,s):e.call(this,r,md(i,this),s)},t.removeEventListener=function(r,i,s){return r!=="message"?o.call(this,r,i,s):o.call(this,r,Br.get(i)??i,s)};let n=Object.getOwnPropertyDescriptor(t,"onmessage");n?.set&&Object.defineProperty(t,"onmessage",{configurable:!0,enumerable:n.enumerable,get(){return Ir.has(this)?Ir.get(this):n.get?.call(this)},set(r){Ir.set(this,r),n.set.call(this,function(s){mo(s.data),r?.call(this,s)})}})}function fd(){let t=window.electronBridge,e=t?.subscribeToWorkerMessages;if(!(!t||typeof e!="function"))try{t.subscribeToWorkerMessages=(o,n)=>e.call(t,o,r=>{mo(r),n(r)})}catch(o){mn.warn("electronBridge.subscribeToWorkerMessages is not writable",o)}}function gd(){addEventListener("message",t=>mo(t.data));try{pd()}catch(t){mn.warn("MessagePort wrap failed",t)}try{fd()}catch(t){mn.warn("electronBridge wrap failed",t)}mn.info("Listening for app-server notifications")}gd();var hd=new x("AppRoute"),bd=500,fn=new Set,gn=null,pn;function b(){return Yt(c.threadRow).find(e=>{let o=e.getAttribute("data-app-action-sidebar-thread-selected"),n=e.getAttribute("data-app-action-sidebar-thread-active"),r=e.getAttribute("aria-current");return o==="true"||n==="true"||r==="page"||r==="true"})?.getAttribute("data-app-action-sidebar-thread-id")??null}var hn=()=>!b(),ms=()=>!1,re=()=>!1;function ds(){let t=b();if(t===gn)return;let{href:e}=location,o={prevHref:e,href:e,prevId:gn,id:t};gn=t;for(let n of fn)try{n(o)}catch(r){hd.error("Route listener failed",r)}}function yd(){let t=new MutationObserver(ds);(()=>{document.body&&t.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-app-action-sidebar-thread-selected","data-app-action-sidebar-thread-id"]})})();let o=setInterval(ds,bd);return()=>{t.disconnect(),clearInterval(o)}}function vt(t){return fn.add(t),pn||(gn=b(),pn=yd()),()=>{fn.delete(t),!fn.size&&(pn?.(),pn=void 0)}}var vd=250,Ad=400,D=Ee(),ie=!1,Te=null,le=!1,ae="done",se=!1,ps=!1,tt=()=>({generating:ie,conversationId:b()}),wd=t=>{if(!t)return!0;let e=b();return e?e===t||e.endsWith(t)||t.endsWith(e.replace(/^local:/,"")):!0};function xd(t){return t==="interrupted"||t==="aborted"||t==="cancelled"?"stopped":t==="failed"||t==="error"?"error":"done"}function Sd(){return se||us()}function qd(t){Te=null,ie=!1,se=!1,D.emit("fall",{conversationId:b(),outcome:t}),le=!1,ae="done"}function Ed(){let t=Sd();t&&!ie&&(ie=!0,le=!1,ae="done",D.emit("rise",{conversationId:b()})),t||!ie?Te=null:Te==null?Te=Date.now():Date.now()-Te>=Ad&&qd(le?"stopped":ae)}function po(){Ed(),D.emit("tick",tt())}function Td({prevId:t,id:e}){t!==e&&(ie&&(se=!1,Te=null,ie=!1,le=!1,ae="done",D.emit("fall",{conversationId:t,outcome:"left"})),D.emit("context",{prevId:t,id:e,migrated:!t&&!!e}),po())}function Md(t){if(wd(t.params?.threadId)){if(t.method==="turn/started"){se=!0,po();return}if(t.method==="turn/interrupt"){se=!1,ae="stopped",le=!0,po();return}t.method==="turn/completed"&&(se=!1,ae=xd(t.params?.turn?.status),ae==="stopped"&&(le=!0),po())}}function Cd(t){t.target instanceof Element&&t.target.closest(c.stopButton)&&(le=!0,se=!1)}function fs(){ps||(ps=!0,uo.on("note",Md),vt(Td),document.addEventListener("click",Cd,!0),en(po,vd))}var Ld="__reactContainer$",gs="__reactFiber$";function Or(){return document.readyState!=="loading"?Promise.resolve():new Promise(t=>document.addEventListener("DOMContentLoaded",()=>t(),{once:!0}))}var Pr=(t,e)=>Object.keys(t.wrappedJSObject??t).some(o=>o.startsWith(e)),At=t=>!Pr(document,Ld)||Pr(t,gs);function jt(){return document.body?Promise.resolve():new Promise(t=>{let e=new MutationObserver(()=>{document.body&&(e.disconnect(),t())});e.observe(document,{childList:!0,subtree:!0})})}async function Rr(){await jt();let t=Date.now()+8e3;for(;!Pr(document.body,gs)&&Date.now()<t;)await new Promise(e=>setTimeout(e,100))}var hs={BetterNavigator:1793461523e3,BetterQuotes:1793365944e3,ChatListStatus:1793351872e3,ChatStateFavicons:1790623094e3,Cleaner:1793267811e3,CompleteToast:1793354069e3,ComposerOpacity:1793344667e3,Continue:1790939902e3,CustomSidebarIdentity:1790658669e3,GreetingCustomizer:1793350808e3,InputHistory:1793365944e3,MessageTimestamps:1791080494e3,NoDictation:1793335268e3,NoShareLink:1790658669e3,NoSidebarIdentity:1790616549e3,PromptQueue:1793365944e3,RecentTopics:1793365944e3,ResponseNotification:1793354069e3,Settings:1793448244e3,SidebarIdentityOpacity:1790682605e3,StarChats:1793365944e3,StreamerMode:1793344667e3,TemporaryChat:1792014624e3,UserQuotes:1793345744e3,WiderChat:179333264e4};var S=t=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`,kd="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",Id={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${kd}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:S('<path d="M18 6 6 18M6 6l12 12"/>'),gear:S('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:S('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:S('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:S('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:S('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:S('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:S('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:S('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:S('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:S('<path d="m6 9 6 6 6-6"/>'),play:S('<path d="M7 4v16l13-8z"/>'),plus:S('<path d="M12 5v14M5 12h14"/>'),check:S('<path d="m5 12 5 5 9-10"/>'),alert:S('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:S('<path d="M4 5h16v11H9l-5 4z"/>'),layout:S('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:S('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:S('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:S('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:S('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:S('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:S('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:S('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:S('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:S('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:S('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:S('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:S('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:S('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:S('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:S('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),folder:S('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),ghost:S('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},B=t=>Pa(Id[t]);function Hr(t){if(typeof t.showPopover=="function"){t.setAttribute("popover","manual");try{t.showPopover()}catch{t.matches(":popover-open")||t.removeAttribute("popover")}}}function wt(t,e=document.body){e.append(t),Hr(t)}var gt="data-bloom-tip",Dr=6,Nr=8,ce,bs=null;function Me(t){if(t===bs)return;if(bs=t,!t){ce?.remove();return}ce??=a("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),ce.textContent=t.getAttribute(gt),wt(ce);let e=t.getBoundingClientRect(),{width:o,height:n}=ce.getBoundingClientRect(),r=e.bottom+Dr+n<=innerHeight-Nr;ce.style.left=`${nt(e.left+e.width/2-o/2,Nr,innerWidth-o-Nr)}px`,ce.style.top=`${r?e.bottom+Dr:e.top-Dr-n}px`}var ys=t=>t instanceof Element?t.closest(`[${gt}]`):null;function vs(){let t=new AbortController,e={passive:!0,signal:t.signal};return document.addEventListener("pointerover",o=>Me(ys(o.target)),e),document.addEventListener("pointerout",o=>o.relatedTarget||Me(null),e),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&Me(ys(o.target)),e),document.addEventListener("focusout",()=>Me(null),e),document.addEventListener("pointerdown",()=>Me(null),e),()=>{t.abort(),Me(null)}}function Qt(t,e,o,n=!1){let r=a("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(t),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let s=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(s)),e(s)===!1&&r.setAttribute("aria-checked",String(!s))}),r}function F(t,e,o){return a("button",{class:$o("bloom-button",o&&`bloom-button-${o}`),text:t,attrs:{type:"button","data-bloom":"control"},on:{click:e}})}function z(t,e,o,n){let r=a("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":e,"data-bloom":"control",[gt]:e},on:{click:o}},B(t));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function bn(t,e,o,n,r,i){let s=a("input",{attrs:{type:"range",min:String(e),max:String(o),step:String(n)}});s.value=String(t);let d=a("output",{text:`${s.value}${r}`});return s.addEventListener("input",()=>{d.textContent=`${s.value}${r}`,i(Number(s.value))}),a("div",{class:"bloom-slider"},s,d)}function Ur(t,e,o){let n=a("select",{class:"bloom-select"},...e.map(r=>a("option",{text:r.label,attrs:{value:r.value}})));return n.value=t,n.addEventListener("change",()=>o(n.value)),n}function fo(t,e,o="",n="text"){let r=a("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=t,r.addEventListener("change",()=>e(r.value)),r}var yn=["showSidebarEntry","showSidebarEntryOnHover","showAccountMenuEntry"],As=1,Ce={showSidebarEntry:!0,showSidebarEntryOnHover:!1,showAccountMenuEntry:!1},Fr=t=>Object.hasOwn(Ce,t),Kr=t=>it("Settings",t)??Ce[t],ws=(t,e)=>!Fr(t)||e!==!1||yn.some(o=>o!==t&&Kr(o));function xs(){if(it("Settings","entryRevision")!==As){for(let t of yn)pt("Settings",t);pt("Settings","entryRevision",As)}}var Bd=new x("Themes"),Pd=/^https:\/\/\S+\.css(?:[?#]|$)/i,Od=/\/\*\*[^]*?@name[ \t]+([^\n*]+)/,j=y({themes:{type:"custom",default:[]},quickCss:{type:"custom",default:""},quickCssEnabled:{type:"custom",default:!0}});async function Ss(t){let e=new TextDecoder().decode(await Jo(t));if(!e.trim())throw new Error("Theme file is empty.");return e}var vn=(t,e)=>{j.store.themes=j.store.themes.map(o=>o.id===t?{...o,...e}:o)},qs=t=>{j.store.themes=j.store.themes.filter(e=>e.id!==t)};async function Es(t){if(!Pd.test(t))throw new Error("Enter an https URL that ends in .css.");if(j.store.themes.some(n=>n.url===t))throw new Error("This theme is already added.");let e=await Ss(t),o=e.match(Od)?.[1]?.trim()||decodeURIComponent(new URL(t).pathname.split("/").pop()??t).replace(/\.css$/i,"").replaceAll(/[-_]/g," ");j.store.themes=[...j.store.themes,{id:eo("theme"),name:o,url:t,css:e,enabled:!0}]}function Ts(t,e,o){if(!e.trim())throw new Error("Name is required.");if(!o.trim())throw new Error("CSS is required.");t?vn(t,{name:e.trim(),css:o}):j.store.themes=[...j.store.themes,{id:eo("theme"),name:e.trim(),css:o,enabled:!0}]}async function Rd(){await Promise.all(j.store.themes.filter(t=>t.url&&t.enabled).map(async({id:t,url:e,name:o})=>{try{let n=await Ss(e??"");j.store.themes.find(r=>r.id===t)?.css!==n&&vn(t,{css:n})}catch(n){Bd.warn(`Failed to refresh theme "${o}"`,n)}}))}var Ms=h({name:"Themes",description:"Applies Bloom++ themes and Quick CSS.",authors:["Bloom contributors"],tags:[],icon:"spark",required:!0,hidden:!0,startAt:"Init",settings:j,styles:()=>[...j.store.themes.filter(t=>t.enabled).map(t=>t.css),j.store.quickCssEnabled?j.store.quickCss:""].join(`
`),start(){Rd()}});var Q=I("bloom-settings-"),Hd=3e3,Cs=(t,e)=>{let o=a("textarea",{class:`bloom-input ${Q("css")}`,attrs:{spellcheck:"false",placeholder:"Paste your CSS here...","aria-label":e}});return o.value=t,o},Gr=(t,e)=>a("div",{class:Q("section-header")},a("div",{class:Q("field-label"),text:t}),a("div",{class:Q("field-desc"),text:e}));function Ls(){let{quickCss:t,quickCssEnabled:e}=j.store,o=Cs(t,"Quick CSS");return o.disabled=!e,o.addEventListener("input",()=>{j.store.quickCss=o.value}),a("div",{class:Q("section")},a("div",{class:Q("field","field-inline")},Gr("Quick CSS","Your own CSS, applied on every page as you type."),Qt(e,n=>{j.store.quickCssEnabled=n,o.disabled=!n},"Enable Quick CSS")),o)}function ks(){let t=a("div",{class:Q("section")}),e=null,o=()=>a("div",{class:Q("section-error"),attrs:{role:"alert"}});function n(){let l=a("input",{class:"bloom-input",attrs:{type:"url",placeholder:"https://raw.githubusercontent.com/...","aria-label":"Theme URL"}}),u=o(),m=F("Add",async()=>{m.disabled=!0,u.textContent="";try{await Es(l.value.trim()),d()}catch(f){u.textContent=f instanceof Error?f.message:String(f),m.disabled=!1}});return a("div",{class:Q("section-block")},Gr("Online themes","Load a theme from a .css URL. It is fetched again on every page load, so updates apply."),a("div",{class:Q("section-row")},l,m),u)}function r(){let l=e==="new"?null:e,u=a("input",{class:"bloom-input",attrs:{placeholder:"My theme","aria-label":"Theme name"}});u.value=l?.name??"";let m=Cs(l?.css??"","Theme CSS"),f=o();return a("div",{class:Q("section-block")},u,m,f,a("div",{class:Q("section-row")},F("Save",()=>{try{Ts(l?.id??null,u.value,m.value),e=null,d()}catch(T){f.textContent=T instanceof Error?T.message:String(T)}}),F("Cancel",()=>{e=null,d()})))}function i(){return a("div",{class:Q("section-block")},a("div",{class:Q("field","field-inline")},Gr("Local themes","CSS stored only on this device."),!e&&F("New local theme",()=>{e="new",d()})),e&&r())}function s(l){let u,m=z("trash","Remove",()=>{if(u){clearTimeout(u),qs(l.id),d();return}m.setAttribute("aria-pressed","true"),m.setAttribute(gt,"Click again to remove"),u=setTimeout(()=>{u=void 0,m.removeAttribute("aria-pressed"),m.setAttribute(gt,"Remove")},Hd)});return a("div",{class:Q("theme")},a("div",{class:Q("theme-text")},a("div",{class:`${Q("card-name")} bloom-truncate`,text:l.name}),a("div",{class:`${Q("field-desc")} bloom-truncate`,text:l.url??"Local"})),l.url?z("copy","Copy URL",()=>void zo(l.url??"")):z("edit","Edit",()=>{e=l,d()}),m,Qt(l.enabled,f=>vn(l.id,{enabled:f}),`Enable ${l.name}`))}function d(){let{themes:l}=j.store;t.replaceChildren(n(),i(),l.length?a("div",{class:Q("themes")},...l.map(s)):a("div",{class:Q("empty"),text:"No themes yet."}))}return d(),t}var Dd=new x("SettingsPanel"),p=I("bloom-settings-"),Nd=10080*60*1e3,Ud=3e3,Is="Toggle features. Some need a reload. Click the sliders icon to configure.",Fd="Paused: can't find its place on this page.",Kd=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Gd=[{id:"plugins",label:"Plugins"},{id:"themes",label:"Themes"},{id:"css",label:"Quick CSS"}],Yd=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],jd={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},Ps=new Set(["chat","ui","privacy"]),W=null,go="plugins",de="all",Yr="all",An="",jr=[],Os=()=>[...Z.values()].filter(t=>!t.hidden),Qd=t=>!!t.updatedAt&&Date.now()-t.updatedAt<Nd;function Wd(t){switch(de){case"favorites":return sn.has(t.name);case"recent":return Qd(t);case"all":return!0;case"other":return!t.tags.some(e=>Ps.has(e));case"chat":case"ui":case"privacy":return t.tags.includes(de)}}function zd(t){switch(Yr){case"all":return!0;case"enabled":return Ct(t);case"disabled":return!Ct(t)}}function Vd(t){let e=An.trim().toLowerCase();return!e||[t.name,t.description,...t.tags].some(o=>o.toLowerCase().includes(e))}function Jd(t){let e=an.list(),o=n=>e.includes(n.name)?e.indexOf(n.name):e.length;return de==="recent"?t.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):t.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var Rs=t=>t.settings?.def??{},zr=t=>Object.values(Rs(t)).some(e=>e.type!=="custom");function Zd(t,e,o){let n=it(t.name,e)??Er(o),r=i=>{if(t.name==="Settings"&&!ws(e,i))return!1;pt(t.name,e,i)};switch(o.type){case"boolean":return Qt(n,r,o.description??e);case"slider":return bn(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return Ur(n,o.options,r);case"string":return fo(n,r,o.placeholder);case"number":return fo(String(n),i=>r(Number(i)),"","number");case"component":{let i=a("div",{class:p("component")});return jr.push(o.render(i)),i}case"custom":return null}}var $d=t=>t.replaceAll(/([A-Z])/g," $1").replace(/^./,e=>e.toUpperCase());function Vr(t){if(!W)return;let e=Object.entries(Rs(t)).filter(([,i])=>i.type!=="custom").map(([i,s])=>{let d=Zd(t,i,s),l=s.type==="boolean",u=s.type!=="component"&&a("div",{class:p("field-label"),text:$d(i)}),m=s.description&&a("div",{class:p("field-desc"),text:s.description});return a("div",{class:p("field",l?"field-inline":"field-stacked")},(u||m)&&a("div",{class:p("field-text")},u,m),d)}),o,n=F("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},Ud);return}clearTimeout(o),t.settings?.reset(),Le(),Vr(t)},"danger"),r=a("div",{class:p("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&Le()}},a("div",{class:p("popup"),attrs:{role:"dialog","aria-label":`${t.name} settings`}},a("div",{class:p("popup-header")},a("div",{class:p("card-icon")},B(t.icon)),a("div",{class:p("popup-title")},a("div",{class:p("card-name"),text:t.name}),a("div",{class:p("popup-authors"),text:t.authors.join(", ")})),z("close","Close",Le)),a("p",{class:p("popup-desc"),text:t.description}),a("div",{class:p("fields")},...e),a("div",{class:p("popup-footer")},n)));W.querySelector(`.${p("modal")}`)?.append(r)}function Le(){for(let t of jr)t();jr=[],W?.querySelector(`.${p("popup-backdrop")}`)?.remove()}function Bs(t){let e=Ct(t),o=sn.has(t.name),n=an.has(t.name),r=!!t.required,i=ja(t.name);return a("div",{class:[p("card",e?"card-on":"card-off"),r?p("card-required"):""].filter(Boolean).join(" ")},a("div",{class:p("card-top")},a("div",{class:p("card-icon")},B(t.icon)),a("div",{class:p("card-actions")},z("star",o?"Unstar":"Star",()=>{sn.toggle(t.name),ue()},o),r?null:z("pin",n?"Unpin":"Pin to top",()=>{an.toggle(t.name),ue()},n),r?a("span",{class:p("required-mark"),attrs:{"aria-label":"Required",[gt]:"This plugin is required for Bloom++ to work"}},B("alert")):null,zr(t)&&z("gear","Settings",()=>Vr(t)),Qt(e,s=>$a(t,s),r?`${t.name} is required`:`Enable ${t.name}`,r))),a("div",{class:p("card-name")},t.name,Ya(t.name)&&a("span",{class:p("new-badge"),text:"New"})),a("div",{class:p("card-desc"),text:t.description,title:t.description}),i&&a("div",{class:p("card-issue"),attrs:{[gt]:`Missing: ${i.join(", ")}`}},B("alert"),a("span",{text:Fd})),a("div",{class:p("card-footer"),text:t.authors.join(", ")}))}function Hs(){let t=Os().some(o=>!o.tags.some(n=>Ps.has(n)));W?.querySelector(`.${p("tabs")}`)?.replaceChildren(...Kd.filter(o=>o.id!=="other"||t).map(o=>a("button",{class:p("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===de)},on:{click:()=>{de=o.id,Hs(),ue()}}})))}function ue(){if(!W)return;let t=Os().filter(Wd),e=W.querySelector(`.${p("search")} input`);e&&(e.placeholder=`Search ${wa(t.length,"plugin")}...`);let o=Jd(t.filter(u=>Vd(u)&&zd(u))),n=de==="all",r=n?o.filter(u=>!u.required):o,i=n?o.filter(u=>u.required):[],s=[...r.map(Bs),...i.length?[a("div",{class:p("required-break"),attrs:{role:"separator"}}),...i.map(Bs)]:[]],d=An.trim()?"No plugins match your search.":jd[de]??"No plugins available.";W.querySelector(`.${p("grid")}`)?.replaceChildren(...s.length?s:[a("div",{class:p("empty"),text:d})])}function Xd(t){t.key==="Escape"&&(t.preventDefault(),t.stopPropagation(),W?.querySelector(`.${p("popup-backdrop")}`)?Le():Wt())}var Ds,Qr;function Wr(){let t=W?.querySelector(`.${p("body")}`);if(!W||!t)return;for(let o of W.querySelectorAll(`.${p("nav-item")}`))o.setAttribute("aria-selected",String(o.getAttribute("data-section")===go));if(Le(),go==="themes"){t.replaceChildren(ks());return}if(go==="css"){t.replaceChildren(Ls());return}let e=a("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=An,e.addEventListener("input",()=>{An=e.value,ue()}),t.replaceChildren(a("div",{class:p("tabs"),attrs:{role:"tablist"}}),a("div",{class:p("toolbar")},a("label",{class:p("search")},B("search"),e),Ur(Yr,Yd,o=>{Yr=o,ue()})),a("div",{class:p("grid")})),Hs(),ue(),e.focus()}function ke(t,e){t&&(go=t),W?(Wr(),Hr(W)):_d();let o=e&&Z.get(e);o&&Vr(o)}function _d(){W=a("div",{class:`bloom-root ${p("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&Wt()}},a("div",{class:p("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},a("div",{class:p("header")},a("div",{class:p("logo")},B("bloom")),a("h2",{class:p("title"),text:"Bloom++"}),a("span",{class:p("hint"),attrs:{"aria-label":Is,tabindex:"0",[gt]:Is}},B("info")),a("div",{class:p("nav"),attrs:{role:"tablist"}},...Gd.map(t=>a("button",{class:p("nav-item"),text:t.label,attrs:{type:"button",role:"tab","data-section":t.id},on:{click:()=>{go=t.id,Wr()}}}))),a("span",{class:p("version"),text:"v2.0.108"}),z("close","Close",Wt)),a("div",{class:p("body")}))),W.addEventListener("keydown",t=>t.stopPropagation()),Qr=new AbortController,document.addEventListener("keydown",Xd,{capture:!0,signal:Qr.signal}),wt(W),Wr(),Ds=ts(ue),Dd.debug("Opened")}function Wt(){Le(),Qr?.abort(),Ds?.(),W?.remove(),W=null}var Ie=()=>W?Wt():ke(),Ns=()=>!!W;var Us=new x("AppLandmarks"),tm={Settings:[c.rail],WiderChat:[":root"],StreamerMode:[c.sidebarScroll,c.rail],ComposerOpacity:[c.composer,c.composerInput],ResponseNotification:[c.composerInput],InputHistory:[c.composerInput],Continue:[c.composerInput],ChatListStatus:[c.sidebarScroll],StarChats:[c.turn],BetterNavigator:[c.timelineScroll,c.turn],BetterQuotes:[c.turn],MessageTimestamps:[c.turn],RecentTopics:[c.sidebarScroll]};function Fs(){for(let[t,e]of Object.entries(tm)){let o=Z.get(t);if(!o||o.required||!Ct(o)){Mr(t,null);continue}let n=e.some(r=>Lt(r));if(Mr(t,n?null:e),!n){if(!Cr(o.name))continue;Ja(o),Us.warn(`${t} paused; missing ${e.join(", ")}`);continue}Cr(o.name)||(Za(o),Us.info(`${t} resumed`))}}function Ks(){return Fs(),C(()=>Fs())}var Oy=new x("Route"),em=/\/c\/(?!local-)([\w-]+)/;var om=()=>location.pathname.match(em)?.[1]??null;var Ry=location.href,Hy=om();var nm=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,rm=/\S+@\S+\.\S+/,im=3;var am=t=>!!t.closest(".sr-only");function sm(t){return[...t.querySelectorAll("*")].filter(e=>!e.children.length&&!e.closest("[data-bloom]")&&!!v(e.textContent??"")&&!(e instanceof SVGElement))}var lm=t=>{if(/rounded-full/.test(t.getAttribute("class")??""))return!0;if(!t.clientWidth)return!1;let{borderRadius:e}=getComputedStyle(t);return e.includes("%")||Number.parseFloat(e)>=t.clientWidth/2};function wn(t,e,o){for(let n of t.querySelectorAll(`[${e}]`))n!==o&&n.removeAttribute(e);o&&!o.hasAttribute(e)&&o.setAttribute(e,"")}function cm(t,e){if(v(t.textContent??"").length>im)return null;let o=t.closest("button");for(let n=t;n&&n!==e&&n!==o;n=n.parentElement)if(lm(n))return n;return null}function xn(t,e){t.hasAttribute(`data-bloom-${e}`)||t.setAttribute(`data-bloom-${e}`,"");let o=t.querySelector("img:not([data-bloom] img)"),n=sm(t),r=o?null:n.map(m=>cm(m,t)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),s=(i&&i!==t&&t.contains(i)?i:o??r)??t.querySelector("[class*=rounded-full]:not([data-bloom] *)");wn(t,`data-bloom-${e}-avatar`,s);let d=n.filter(m=>!s?.contains(m)&&!am(m)),l=d.find(m=>nm.test(v(m.textContent??""))),u=d.find(m=>rm.test(m.textContent??""));wn(t,`data-bloom-${e}-plan`,l),wn(t,`data-bloom-${e}-email`,u),wn(t,`data-bloom-${e}-name`,d.find(m=>m!==l&&m!==u))}var Gs=()=>Yt(c.rail).filter(rt);function Ys(t){return Lt(c.profile,t)??[...t.querySelectorAll(c.menuButton)].findLast(rt)??null}function um(t,e){return[...t.children].find(n=>n instanceof HTMLElement&&n!==e&&n.contains(e))??e}function js(){return Gs().flatMap(t=>{let e=Ys(t);if(!e)return[{kind:"rail",anchor:t,insert:n=>t.append(n)}];let o=um(t,e);return[{kind:"rail",anchor:o,insert:n=>(o===e?t:o).append(n)}]})}var Jr=()=>Gs().map(Ys).filter(t=>t!=null);function dm(t){let e=t.getAttribute("aria-expanded")==="true"&&t.getAttribute("aria-controls"),o=e?document.getElementById(e):null;return o?.matches('[role="menu"]')?o:null}function Sn(){return Jr().map(dm).find(t=>t!=null)??Yt('[role="menu"]').find(t=>!t.closest("[data-bloom]")&&/log ?out|sign out|退出/i.test(t.textContent??""))??null}var ho=t=>Yt(c.threadRow).filter(e=>e.getAttribute("data-app-action-sidebar-thread-id")===t);function bo(t){let e=ho(t)[0]??Yt(c.threadRow).find(n=>{let r=n.getAttribute("data-app-action-sidebar-thread-id")??"";return r.endsWith(t)||t.endsWith(r.replace(/^local:/,""))});return(e?.getAttribute("data-app-action-sidebar-thread-title")??v(e?.textContent??""))||null}function Qs(t){return null}var Zr=0,qn;function mm(t){if(!Y(t))return;for(let o of Jr())xn(o,"profile");let e=Sn();e&&xn(e,"menu")}function xt(){Zr++;let t=!0;return jt().then(()=>{t&&Zr&&!qn&&(qn=C(mm))}),()=>{t&&(t=!1,!--Zr&&(qn?.(),qn=void 0))}}var Ws=`/*
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
`;var et=I("bloom-entry-"),fm=4,Xr="--bloom-entry-x",_r=1,zs=4,Vs=8,gm=150,lt=y({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar.",default:Ce.showSidebarEntry},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:Ce.showSidebarEntryOnHover},showAccountMenuEntry:{type:"boolean",description:"Show Bloom++ at the top of the account menu.",default:Ce.showAccountMenuEntry},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:t=>(t.append(F("Reset position",()=>{lt.store.entryPosition=_r})),()=>t.replaceChildren())},showBloomMenu:{type:"boolean",description:"Hovering the Bloom++ row in the account menu opens a menu with Plugins, Themes, Quick CSS and plugin settings.",default:!0},menuPlugins:{type:"component",description:"Plugins listed in that menu.",render:t=>(t.append(...$s().map(e=>a("div",{class:et("menu-pick")},B(e.icon),a("span",{class:"bloom-truncate",text:e.name}),Qt(Xs(e),o=>{lt.store.menuPicks={...lt.store.menuPicks,[e.name]:o}},`List ${e.name} in the menu`)))),()=>t.replaceChildren())},entryPosition:{type:"custom",default:_r},menuPicks:{type:"custom",default:{}}}),me=new Map,zt=null,yo,$s=()=>[...Z.values()].filter(t=>!t.hidden).toSorted((t,e)=>t.name.localeCompare(e.name)),Xs=t=>lt.store.menuPicks[t.name]??zr(t),Js=!1,$r=[];function hm(t,e,o){let n=t.currentTarget,r=e.clientWidth-n.offsetWidth;if(t.button!==0||r<=0||!e.classList.contains(et("hover")))return;let i=lt.store.entryPosition,s=i,d=!1,l=new AbortController;n.setPointerCapture(t.pointerId),n.addEventListener("pointermove",m=>{!d&&Math.abs(m.clientX-t.clientX)<fm||(d=!0,o(),s=nt(i+(m.clientX-t.clientX)/r,0,_r),e.style.setProperty(Xr,String(s)))},{signal:l.signal});let u=()=>{l.abort(),d&&(lt.store.entryPosition=s,e.style.removeProperty(Xr))};n.addEventListener("pointerup",u,{signal:l.signal}),n.addEventListener("lostpointercapture",u,{signal:l.signal})}function bm(t){let e=!1,o=a("button",{class:et("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),e||Ie(),e=!1},pointerdown:r=>{e=!1,t!=="rail"&&hm(r,n,()=>{e=!0})}}},B("bloom"),t!=="rail"&&a("span",{class:et("label"),text:"Bloom++"})),n=a("div",{class:`bloom-root ${et("wrap")} ${et(t)}`,attrs:{"data-bloom":"entry"}},o);return n}function vo(){clearTimeout(yo),zt?.remove(),zt=null}function _s(){clearTimeout(yo),yo=setTimeout(vo,gm)}var tl=t=>t.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0}));function ym(t,e){if(clearTimeout(yo),zt?.isConnected||!lt.store.showBloomMenu)return;let o=(l,u,m)=>a("div",{class:et("flyout-item"),attrs:{role:"menuitem"},on:{pointerdown:f=>{f.button===0&&(f.preventDefault(),f.stopPropagation(),vo(),tl(e),m())}}},B(u),a("span",{class:"bloom-truncate",text:l})),n=$s().filter(Xs);zt=a("div",{class:`bloom-root ${et("flyout")}`,attrs:{"data-bloom":"menu-flyout",role:"menu","aria-label":"Bloom++"},on:{pointerenter:()=>clearTimeout(yo),pointerleave:_s}},o("Plugins","bloom",()=>ke("plugins")),o("Themes","spark",()=>ke("themes")),o("Quick CSS","edit",()=>ke("css")),n.length>0&&a("div",{class:et("flyout-break"),attrs:{role:"separator"}}),...n.map(l=>o(l.name,l.icon,()=>ke("plugins",l.name)))),wt(zt);let r=e.getBoundingClientRect(),{width:i,height:s}=zt.getBoundingClientRect(),d=r.right+zs;zt.style.left=`${d+i>innerWidth?r.left-i-zs:d}px`,zt.style.top=`${nt(t.getBoundingClientRect().top,Vs,innerHeight-s-Vs)}px`}function vm(t){let e=a("div",{class:`bloom-root ${et("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),vo(),tl(t),Ie()},pointerenter:()=>ym(e,t),pointerleave:_s}},B("bloom"),a("span",{text:"Bloom++"}),lt.store.showBloomMenu&&a("span",{class:et("menu-chevron")},B("chevron"))),o=t.querySelector('[role="menuitem"]');o?.parentElement?o.before(e):t.prepend(e)}function Zs(){vo();for(let t of document.querySelectorAll('[data-bloom="entry"], [data-bloom="menu-entry"]'))t.remove();me.clear()}function Am(){for(let t of document.querySelectorAll('[data-bloom="menu-entry"]'))t.remove()}function el(){let{showSidebarEntry:t,showSidebarEntryOnHover:e,showAccountMenuEntry:o}=lt.store,n=t||e?js():[],r=new Set(n.map(s=>s.anchor));for(let[s,d]of me)s.isConnected&&r.has(s)||(d.remove(),me.delete(s));for(let s of document.querySelectorAll('[data-bloom="entry"]'))[...me.values()].includes(s)||s.remove();for(let s of n){let d=me.get(s.anchor);if(d?.isConnected||!At(s.anchor))continue;let l=d??bm(s.kind);me.set(s.anchor,l),s.insert(l)}for(let s of me.values())s.classList.toggle(et("hover"),!t);if(!o){Am();return}let i=Sn();i&&!i.querySelector('[data-bloom="menu-entry"]')&&vm(i),i||vo()}function wm(t){yn.some(Kr)||(lt.store[Fr(t??"")?t:"showSidebarEntry"]=!0),el()}var ol=h({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:lt,styles:()=>`${Ws}[data-app-navigation-rail] [data-bloom=entry]{position:absolute;inset:auto;left:50%;bottom:100%;transform:translateX(-50%);width:max-content;margin:0;padding-block:0.25rem;pointer-events:none;z-index:5;display:flex;justify-content:center}[data-app-navigation-rail]>[data-bloom=entry]{bottom:2.75rem}[data-app-navigation-rail] [data-bloom=entry] .bloom-entry-button{pointer-events:auto}[data-app-navigation-rail] [data-bloom=entry].bloom-entry-hover:not(:hover > *){display:none;transition:display 0s 0.2s allow-discrete}.${et("hover")}{${Xr}:${lt.store.entryPosition}}`,start(){xs(),Zs(),$r=[C(el),vs(),xt()],!Js&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",Ie),Js=!0)},stop(){for(let t of $r)t();$r=[],Zs(),Wt()},onSettingsChange:wm});var ai=new x("AppNetwork"),St=Ee(),En=new Map,nl=new Map,Be=new Map,rl=new Map,oi=new Map,Pe=new Map,il=new Map,ul=new Set,Ao=new Set,xm=800,dl=6e3,Sm=200,al;var qm=t=>t==="user"||t==="assistant";function wo(t){let e=t.replace(/^local:/,"");return[...new Set([t,e,`local:${e}`])]}function ml(t){let e=wo(t);for(let n of e){let r=En.get(n);if(r)return r}let o={id:e[0]??t,title:null,chain:[],times:new Map};for(let n of e)En.set(n,o);return o}function Tn(t){return wo(t)[0]??t}function Mn(t){if(!t)return!1;let e=Tn(t);if(Ao.has(e))return!0;if(!ul.has(e))return!1;let o=Be.get(e);return o==null||Date.now()-o<xm?!1:(Ao.add(e),!0)}function Em(){al||(al=en(()=>{let t=b();if(!t)return;let e=Tn(t);Ao.has(e)&&Date.now()-(Pe.get(e)??0)>=dl||fl(t)},Sm))}function Tm(t){let e=il.get(t);return e||(e=new Set,il.set(t,e)),e}function Mm(t,e){let o=Tn(t.id);ul.add(o),Pe.has(o)||Pe.set(o,Date.now());let{length:n}=t.chain;n>(rl.get(o)??0)&&(rl.set(o,n),Be.set(o,Date.now()),Ao.delete(o)),e>(oi.get(o)??0)&&(oi.set(o,e),Ao.has(o)||Be.set(o,Date.now())),Be.has(o)||Be.set(o,Date.now())}function It(t){if(!t)return null;Em(),fl(t);let e=wo(t);return e.map(o=>En.get(o)).find(o=>o&&(o.chain.length||o.title))??En.get(e[0]??t)??null}function ni(t,e,o,n=null){return{id:t,role:e,createTime:n,text:v(o),hasFiles:!1,imageCount:0}}function ri(t,e){let o=t.chain.find(r=>r.id===e.id);if(o){e.text&&(o.text=e.text),e.createTime!=null&&(o.createTime=e.createTime);return}if(t.chain.find(r=>r.role===e.role&&r.text&&r.text===e.text)){!t.times.has(e.id)&&e.createTime!=null&&t.times.set(e.id,e.createTime);return}t.chain.push(e)}function pl(t){let e=t.chain.map(o=>`${o.id}	${o.role}	${o.text}`).join(`
`);nl.get(t.id)!==e&&(nl.set(t.id,e),St.emit("conversation",t))}function sl(t){if(typeof t=="function")try{return v(String(t()??""))}catch(e){return ai.warn("Turn label failed",e),""}return typeof t=="string"?v(t):""}function ll(t){if(typeof t!="function")return"";try{let e=t();return typeof e=="string"?v(e):k(e)&&typeof e.response=="string"?v(e.response):""}catch(e){return ai.warn("Turn preview failed",e),""}}function Cm(t){let e=Object.keys(t).find(o=>o.startsWith("__reactFiber$")||o.startsWith("__reactInternalInstance$"));return e?t[e]??null:null}function ii(t,e,o,n){if(!t||e>24)return;let r=(k(t.memoizedProps)?t.memoizedProps:null)??(k(t.pendingProps)?t.pendingProps:null);if(r){if(Array.isArray(r.items)&&k(r.items[0])&&typeof r.items[0].turnKey=="string"){let i=r.items.filter(k);i.length>o.length&&(o.length=0,o.push(...i))}if(Array.isArray(r.entries)&&k(r.entries[0])&&typeof(r.entries[0].historyEntityKey??r.entries[0].turnId)=="string"){let i=r.entries.filter(k);i.length>n.length&&(n.length=0,n.push(...i))}}ii(t.child??null,e+1,o,n),ii(t.sibling??null,e,o,n)}function Lm(t,e){let o=typeof e.turnId=="string"?e.turnId:"",n=typeof e.turnKey=="string"?e.turnKey:"";return t.find(r=>{let i=typeof r.turnKey=="string"?r.turnKey:"";return!!i&&(o===i||n.endsWith(i)||n.includes(i))})??null}function cl(t,e){return wo(t).some(o=>wo(e).includes(o))}function si(t){let e=t.replace(/^history-content:/,"").replace(/^turn:/,"").replace(/:assistant$/,"");return e?[...new Set([t,e,`turn:${e}`,`${e}:assistant`,`local:${e}`])]:[]}function km(t){let e=new Set;for(let o of t.querySelectorAll("[data-turn-key], [data-response-annotation-target], [data-chatgpt-search-message-ids]"))for(let n of[o.getAttribute("data-turn-key"),o.getAttribute("data-response-annotation-target"),...(o.getAttribute("data-chatgpt-search-message-ids")??"").split(/\s+/)])if(n)for(let r of si(n))e.add(r);return e}function Im(t){let e=new Set;for(let o of t.chain)for(let n of si(o.id))e.add(n);return e}function Bm(t){return t.getAttribute("data-response-annotation-conversation")??t.querySelector("[data-response-annotation-conversation]")?.getAttribute("data-response-annotation-conversation")??null}function Pm(){return[...document.querySelectorAll(`${c.conversationTarget}, ${c.timelineScroll}`)].filter(rt)}var ti=(t,e)=>e.length>t.length?e:t;function fl(t){let e=Pm();if(!e.length)return;let o,n=[],r=[];for(let E of e){let L=Bm(E);if(L&&!cl(t,L))continue;let O=[],$=[];try{ii(Cm(E),0,O,$)}catch(xe){ai.warn("Fiber walk failed",xe);continue}let U=ti(O,$),dt=typeof U[0]?.conversationId=="string"?U[0].conversationId:"";if(dt&&!cl(t,dt))continue;let br=ti(n,r);U.length>br.length&&(o=E,n=O,r=$)}if(!o)return;let i=ti(n,r);if(!i.length)return;let s=typeof i[0]?.conversationId=="string"?i[0].conversationId:"",d=ml(t);d.title=bo(t)??bo(s||t)??d.title;let l=Tn(t);Pe.has(l)||Pe.set(l,Date.now());let u=i.filter(E=>sl(E.getLabel)||ll(E.getPreview)).length,m=Mn(t);!m&&u>(oi.get(l)??0)&&Be.delete(l);let f=km(o),T=Im(d),g=Tm(l),q=Date.now()-(Pe.get(l)??0)<dl;for(let E of i){let L="";typeof E.turnId=="string"?L=E.turnId:typeof E.turnKey=="string"&&(L=E.turnKey.replace(/^.*turn:/,""));let O=typeof E.historyEntityKey=="string"?E.historyEntityKey:L?`turn:${L}`:"",$=Lm(n,E),U=sl($?.getLabel??E.getLabel),dt=ll($?.getPreview??E.getPreview);L&&!U&&!dt&&g.add(L);let br=[O,L].some(Du=>si(Du).some(Aa=>T.has(Aa)||f.has(Aa)));if(m&&!br&&!(q&&L&&g.has(L)))continue;let xe=typeof E.timestampSeparatorAtMs=="number"?E.timestampSeparatorAtMs:null;O&&U&&(ri(d,ni(O,"user",U,xe)),xe&&d.times.set(O,xe)),L&&dt&&ri(d,ni(`${L}:assistant`,"assistant",dt,xe)),L&&(U||dt)&&g.delete(L)}Mm(d,u),pl(d)}function Om(t){if(qm(t.role))return t.role;let e=typeof t.type=="string"?t.type:typeof t.itemType=="string"?t.itemType:"";return/user/i.test(e)?"user":/agent|assistant/i.test(e)?"assistant":null}function Rm(t){return typeof t.text=="string"?t.text:typeof t.content=="string"?t.content:k(t.content)&&typeof t.content.text=="string"?t.content.text:""}function ei(t,e){if(!t||!k(e))return;let o=typeof e.id=="string"?e.id:typeof e.itemId=="string"?e.itemId:"",n=Om(e),r=Rm(e);if(!o||!n)return;let i=ml(t);ri(i,ni(o,n,r)),pl(i)}function Hm(t){let e=t.params?.thread,o=t.params?.threadId??(k(e)&&typeof e.id=="string"?e.id:void 0);t.params?.item&&ei(o,t.params.item);for(let n of t.params?.items??[])ei(o,n);if(k(e)&&Array.isArray(e.items))for(let n of e.items)ei(o,n)}uo.on("note",Hm);var Dm=["data-turn","data-message-author-role"],Nm=/:(user|assistant)$/,li=`${c.messageUnit}, ${c.oldMessage}`,Ln=t=>t==="user"||t==="assistant",yl=()=>!!document.querySelector(c.timelineScroll),vl=()=>!!yt(c.timelineScroll),ci=()=>b()??"",kn=()=>yl()?yt(c.timelineScroll):document;function So(){if(yl())return yt(c.timelineScroll);let t=document.querySelector(c.turn);for(let e=t?.parentElement;e;e=e.parentElement){let{overflowY:o}=getComputedStyle(e);if((o==="auto"||o==="scroll")&&e.scrollHeight>e.clientHeight)return e}return document.scrollingElement}var Vt=t=>{let e=t.getAttribute("data-chatgpt-search-unit-key")?.match(Nm)?.[1];return Ln(e)?e:t.matches(c.userBubble)?"user":t.matches(c.assistantReply)||t.matches(c.assistantMarkdown)?"assistant":null},Al=t=>{let e=[...t.querySelectorAll(c.searchUnit)].filter(n=>Vt(n)&&!n.parentElement?.closest(c.searchUnit));return e.length?e:[...t.querySelectorAll(`${c.userBubble}, ${c.assistantReply}`)].filter(n=>Vt(n)&&!n.parentElement?.closest(`${c.userBubble}, ${c.assistantReply}`))},gl=t=>(t.getAttribute("data-chatgpt-search-message-ids")??t.getAttribute("data-message-id")??t.getAttribute("data-response-annotation-target"))?.split(/\s+/).filter(Boolean)??[];function xo(t){let e=gl(t);if(e.length)return e;let o=[...new Set([...t.querySelectorAll(li)].flatMap(gl))];if(o.length)return o;let n=t.closest("[data-turn-key]")?.getAttribute("data-turn-key")?.replace(/^history-content:/,"");return n&&Vt(t)==="user"?[n]:[]}function Oe(t=kn()){if(!t)return[];let e=Al(t);return e.length?e:[...t.querySelectorAll(li)].filter(o=>!o.parentElement?.closest(li))}function Um(t,e){for(let o=t.length-1;o>=0;o--){let n=e.find(r=>r.id===t[o]);if(n)return n.role}return null}function Fm(t){for(let e of Dm){let o=t.getAttribute(e)??t.querySelector(`[${e}]`)?.getAttribute(e);if(Ln(o))return o}return t.querySelector(c.markdown)||t.querySelector(c.generatedImage)?"assistant":null}var Km=t=>!t.parentElement?.closest(c.turn);function Jt(){let t=It(b())?.chain??[];return[...kn()?.querySelectorAll(c.turn)??[]].filter(Km).flatMap(o=>{let n=Al(o),r=n.length?n.map(i=>({el:i,known:Vt(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=u=>!n.some(m=>m.contains(u))&&v(u.textContent??""),s=[...o.querySelectorAll(c.assistantMarkdown)].find(u=>i(u)&&!Cn.test(v(u.textContent??""))),d=[...o.querySelectorAll(c.activityHeader)].findLast(i),l=s??d;l&&r.push({el:l,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?xo(o):Oe(o).flatMap(xo),s=n??Fm(o)??Um(i,t)??(r%2?"assistant":"user"),d=o.closest(c.turn)??o,l=!o.closest(c.searchUnit)&&!!d.querySelector(c.turnBusy),u=s==="assistant"&&(o.matches(c.turnBusy)||!!o.querySelector(c.turnBusy)||l);return{el:o,role:s,messageIds:i,streaming:u}})}var Gm="[data-bloom], .sr-only",wl=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,Cn=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,hl=new WeakMap;function Re(t){let o=(t.el.closest(c.turn)??t.el).textContent?.length??0,n=hl.get(t.el);if(n?.length===o)return n.summary;let r=Ym(t);return hl.set(t.el,{length:o,summary:r}),r}function bl(t){let e=new Set,o=[];for(let n of t.querySelectorAll(c.assistantMarkdown)){if(n.closest(c.searchUnit))continue;let r=v(n.textContent??"");!r||Cn.test(r)||wl.test(r)||e.has(r)||(e.add(r),o.push(r))}return o}function Ym(t){let e=t.el.querySelectorAll(c.generatedImage).length;if(t.role==="assistant"&&e)return e>1?`Image \xD7${e}`:"Image";let o=t.el.closest(c.turn);if(t.role==="assistant"&&o&&t.el.matches(c.assistantMarkdown)&&!t.el.closest(c.searchUnit)){let l=bl(o);if(l.length)return l.join(" \xB7 ")}let n=t.el.querySelector(t.role==="assistant"?`${c.markdown}, ${c.assistantMarkdown}`:".whitespace-pre-wrap")??t.el,i=[...n.querySelectorAll(Gm)].map(l=>v(l.textContent??"")).filter(Boolean).reduce((l,u)=>l.replace(u,`
`),n.innerText||n.textContent||""),s=i.split(`
`).map(v).filter(l=>l&&!wl.test(l)&&!Cn.test(l));if(s.length)return s.join(" ");if(t.role==="assistant"&&o){let l=bl(o);if(l.length)return l.join(" \xB7 ")}let d=i.split(`
`).map(v).filter(l=>Cn.test(l));return d.length?d.at(-1)??"":t.role==="user"&&t.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function In(t){return t.text?v(t.text):t.imageCount?t.imageCount>1?`Image \xD7${t.imageCount}`:"Image":t.hasFiles?"File":""}var ui=t=>t.matches(c.timelineScroll)&&getComputedStyle(t).flexDirection==="column-reverse";var jm=80,Qm=420;function di(t,e,o){return(t.x-o.x)*(e.y-o.y)-(e.x-o.x)*(t.y-o.y)}function Wm(t,e,o,n){let r=di(t,e,o),i=di(t,o,n),s=di(t,n,e);return!((r<0||i<0||s<0)&&(r>0||i>0||s>0))}function zm(t,e){let o=(e.left+e.right)/2-(t.left+t.right)/2,n=(e.top+e.bottom)/2-(t.top+t.bottom)/2;if(Math.abs(o)>=Math.abs(n)){let i=o<0?e.right:e.left;return[{x:i,y:e.top},{x:i,y:e.bottom}]}let r=n<0?e.bottom:e.top;return[{x:e.left,y:r},{x:e.right,y:r}]}function xl(t,e){let o=nt(t.x,e.left,e.right),n=nt(t.y,e.top,e.bottom);return Math.hypot(t.x-o,t.y-n)}function Bn(t){let e=t.closeDelay??jm,o=t.towardDelay??Qm,n=0,r=!1,i=null,s=null,d=()=>{document.removeEventListener("pointermove",g,!0)},l=()=>{n&&window.clearTimeout(n),n=0,d(),i=null,s=null},u=()=>{l(),r&&(r=!1,t.setHeld(!1))},m=()=>{r||(r=!0,t.setHeld(!0))},f=q=>{n&&window.clearTimeout(n),n=window.setTimeout(u,q)},T=q=>{let E=t.panel(),L=t.trigger();if(!E||!i)return!1;let O=E.getBoundingClientRect();if(O.width<=0&&O.height<=0)return!1;let $=L?.getBoundingClientRect(),[U,dt]=$&&($.width||$.height)?zm($,O):[{x:O.left,y:O.top},{x:O.right,y:O.bottom}];return Wm(q,i,U,dt)?!0:s!=null&&xl(q,O)<xl(s,O)-.25},g=q=>{let E={x:q.clientX,y:q.clientY};if(t.over(q.target)){l();return}T(E)?f(o):u(),s=E};return{enter(){l()},leave(q){if(t.over(q.relatedTarget)){l();return}i={x:q.clientX,y:q.clientY},s=i,m(),document.addEventListener("pointermove",g,!0),f(e)},dispose(){l(),r=!1}}}var Sl=`/*
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
`;var M=I("bloom-nav-"),Dn=80,Jm=1200,Zm=2,ql=3e4,$m=200,Xm=.9,_m=.28,tp=24,He=8,ep=80,op=12,mi=80,Cl=`${c.rightPanel}, ${c.summaryPanel}`,np={user:"\u2753",assistant:"\u{1F916}"},rp=["wheel","touchmove","pointerdown"],Fn=y({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),A=null,N=[],ct=-1,pe=-1,De=null,fe="",fi=0,gi=[],Mo=null,Pn=null,On=new Set,Pt,qo,Ot,Eo="",qt=[],Co=null,Nn=new Set,Rn=new Map,Bt=!1,ip=t=>Fn.store.showAssistant||t.role==="user",ap=t=>t.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||t.messageIds[0]||t.role;function sp(t){return{role:t.role,summary:Re(t),ids:t.messageIds,turn:t,streaming:t.streaming}}function Ll(t,e){let o=t.entries.at(-1);if(o?.role==="assistant"&&e.role==="assistant"){t.entries[t.entries.length-1]={...e,ids:[...new Set([...o.ids,...e.ids])]};return}t.entries.push(e)}function lp(){let t=[];for(let e of Jt()){let o=sp(e),n=ap(e),r=t.at(-1),i=!e.el.closest("[data-turn-key]");r&&(r.key===n||i&&o.role==="assistant")?Ll(r,o):t.push({key:n,entries:[o]})}return t}function cp(){let t=[];for(let e of It(ci()||b())?.chain??[]){let o={role:e.role,summary:In(e),ids:[e.id],turn:null,streaming:!1},n=t.at(-1);e.role==="assistant"&&n?Ll(n,o):t.push({key:e.id,entries:[o]})}return t}var Ne=t=>t.entries.flatMap(e=>e.ids);function Un(t,e){let o=new Set(Ne(t));return Ne(e).some(n=>o.has(n))}var ge=t=>v(t.entries.find(e=>e.role==="user")?.summary??""),pi=(t,e)=>t.filter(o=>ge(o)===e).length,hi=t=>({...t,turn:null,streaming:!1});function up(t,e){let o=new Set(e.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return t.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return hi(r);let s=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return s&&s!==n.key?hi(r):r})}))}function dp(t,e){let o=e.entries.map((n,r)=>{let i=t.entries[r];if(!i)return n;let s=[...new Set([...n.ids,...i.ids])];return{...n,ids:s,summary:n.summary||i.summary}});for(let n of t.entries.slice(o.length))o.push(hi(n));return{key:t.key,entries:o}}function kl(){let t=So();if(!t)return!1;let e=t.clientHeight-t.scrollHeight;return t.scrollTop-e<=Math.abs(t.scrollTop)}function mp(t,e){let o=up(t,e).filter(l=>e.some(u=>u.key===l.key)||!e.some(u=>Un(u,l)));if(!e.length)return o;if(!o.length)return e;let n=e.findIndex(l=>o.some(u=>u.key===l.key));if(n<0)return kl()?e.concat(o):o.concat(e);let r=e[n]?.key,i=o.findIndex(l=>l.key===r),s=o.slice(0,i).concat(e.slice(0,n),o.slice(i)),d=s.findIndex(l=>l.key===r);for(let l=n;l<e.length;l++){let u=e[l];if(!u)continue;let m=s.findIndex(f=>f.key===u.key);if(m>=0){let f=s[m];f&&(s[m]=dp(f,u)),d=m}else s.splice(d+1,0,u),d++}return s}function pp(t,e){let o=0,n=0,r=0;for(let i=1-t.length;i<e.length;i++){let s=0,d=0;for(let u=0;u<t.length;u++){let m=e[u+i],f=t[u];!m||!f||(Un(f,m)?(s+=3,d++):ge(f)&&ge(f)===ge(m)&&s++)}let l=kl()?i<r:i>r;(s>o||s===o&&d>n||s===o&&d===n&&l)&&(o=s,n=d,r=i)}return{score:o,offset:r}}function fp(t,e){let o=t.entries.map((n,r)=>{let i=e.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of e.entries.slice(o.length))o.push({...n,turn:null});return{key:t.key,entries:o}}function Hn(t){return t.map(e=>({key:e.key,entries:e.entries.map(o=>({...o}))}))}function gp(t,e,o=!0){if(!e.length)return t;if(!t.length)return e;let{score:n,offset:r}=pp(t,e),i=Hn(t);if(n>0)for(let l=0;l<i.length;l++){let u=e[l+r],m=i[l];if(!u||!m)continue;let f=ge(m),T=!!f&&f===ge(u)&&pi(t,f)===1&&pi(e,f)===1;(Un(m,u)||T)&&(i[l]=fp(m,u))}let s=[],d=[];for(let l=0;l<e.length;l++){let u=e[l];if(!u)continue;let m=ge(u);!m||pi(i,m)>0||i.some(f=>Un(f,u))||o&&(n>0&&l<r?s.push(u):d.push(u))}return s.concat(i,d)}var bi=t=>t.entries.some(e=>e.turn?.el.isConnected);function hp(t,e,o){let n=t.findIndex(i=>Ne(i).includes(e));if(n>=0)return n+1;let r=t.find(bi);return o&&r&&Ne(r).includes(o)?0:t.length}function bp(t){if(Co){let{parent:e,user:o}=Co;for(let n of t.slice(hp(t,e,o))){let r=Ne(n);if(!bi(n)&&!(o&&r.includes(o)))for(let i of r)Nn.add(i)}}return t.filter(e=>bi(e)||!Ne(e).some(o=>Nn.has(o)))}function Il(){qt=[],Co=null,Nn.clear()}function yp(){let t=ci();if(t!==Eo){Eo&&qt.length&&Bt&&Rn.set(Eo,Hn(qt)),Eo=t;let n=t?Rn.get(t):void 0;n?.length?(qt=Hn(n),Co=null,Nn.clear(),Bt=!0):(Il(),Bt=!1)}let e=lp(),o=cp();return!e.length&&!o.length&&!vl()?(qt=[],[]):(Bt&&t&&!Mn(t)&&(Bt=!1),qt=bp(gp(mp(qt,e),o,!Bt)),!Bt&&t&&qt.length&&Mn(t)&&(Bt=!0,Rn.set(t,Hn(qt))),qt.flatMap(n=>n.entries).filter(ip).filter(n=>n.ids.length||n.summary||n.streaming))}function vp(t){for(let o of t)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!tt().generating||t.some(o=>o.streaming))return;let e=t.at(-1);e&&(e.role==="assistant"||!Fn.store.showAssistant?e.streaming=!0:t.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function Bl(){let t=yp();return vp(t),t}function Pl(t){let e=t.getBoundingClientRect(),o=st()?.getBoundingClientRect().top,n=Math.min(e.bottom,o&&o>e.top?o:e.bottom);return{top:e.top,bottom:n}}function Ol(t){return((t.matches(".whitespace-pre-wrap, .markdown, .prose, [data-markdown-text-style]")?t:t.querySelector(".whitespace-pre-wrap")??t.querySelector(".markdown, .prose, [data-markdown-text-style]"))??t).getBoundingClientRect().top}function El(t){let e=N[t]?.turn?.el;return e?.isConnected?e:null}function Ap(t){if(!N.length)return null;let e=t.scrollHeight-t.clientHeight,o=ui(t),n=Math.min(t.scrollTop,0),r=o?-n:e-t.scrollTop,i=o?e+n:t.scrollTop,s=e<=He||r<=He,d=e>He&&i<=He,{top:l,bottom:u}=Pl(t),m=El(0),f=m?Ol(m):Number.NaN,T=!!m&&f>=l-He&&f<=l+48,g=El(N.length-1),q=g?.getBoundingClientRect().bottom??Number.NaN,E=!!g&&q<=u+He&&q>=u-ep;return s||E?"bottom":d||T?"top":null}function wp(t){let{top:e,bottom:o}=Pl(t),n=e+Math.max(o-e,0)*_m,r=[],i=-1;if(N.forEach((d,l)=>{let u=d.turn?.el;if(!u?.isConnected){r.push(Number.NaN);return}let m=Ol(u);r.push(m),i<0&&(i=l),m<=n&&(i=l)}),i<0)return Math.max(N.findIndex(d=>d.turn),0);let s=r[ct];return Number.isFinite(s)?i===ct?ct:i>ct?i:s<=n+tp?ct:i:i}function xp(t){let e=Ap(t);return e==="bottom"?N.length-1:e==="top"?0:wp(t)}function Tl(t){Fn.store.jumpEffect==="border"&&(t.classList.add(M("flash")),setTimeout(()=>t.classList.remove(M("flash")),Jm))}function Kn(t){let e=N[t],o=So();if(!e||!o)return;if(!e.turn&&!e.ids.length){pe=t,To(),o.scrollTo({top:ui(o)?0:o.scrollHeight});return}pe=t,De=t?null:{chat:b(),first:e.ids[0],until:Date.now()+ql},To();let n=e.turn?.el;if(n?.isConnected){let u=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:u<o.clientHeight*Zm?"smooth":"auto"}),Tl(n);return}let r=N.findIndex(u=>u.turn),i=r>=0&&t<r?-1:1,s=++fi,d=Date.now()+ql,l=()=>{let u=So();if(s!==fi||Date.now()>d||!u)return;N=Bl();let m=N.find(T=>T.ids.some(g=>e.ids.includes(g)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),Tl(m),pe=N.findIndex(T=>T.turn?.el===m),To();return}let f=u.scrollTop;u.scrollBy({top:i*u.clientHeight*Xm,behavior:"instant"}),u.scrollTop===f?setTimeout(l,$m):requestAnimationFrame(l)};l()}function Sp(t,e){return a("button",{class:M("row"),attrs:{type:"button","data-index":String(e),"data-message-id":t.ids[0]??""},on:{click:()=>Kn(e)}},a("span",{text:np[t.role]}),a("span",{class:"bloom-truncate",text:bt(t.summary||"\u2026",Dn)}))}function qp(t,e){let o=t.offsetWidth?e.width/t.offsetWidth:1;return e.left+(t.clientLeft+t.clientWidth)*o}function Ep(t){let e=1/0;for(let o of document.querySelectorAll(Cl)){if(!rt(o))continue;let n=o.getBoundingClientRect();n.width<mi||n.height<mi||n.left<t.left+mi||n.left<e&&(e=n.left)}return Number.isFinite(e)?e:null}function Ml(t){if(!A)return;let e=t.getBoundingClientRect(),o=st()?.getBoundingClientRect().top,r=Math.min(e.bottom,o&&o>e.top?o:e.bottom)-e.top,i=Math.min(qp(t,e),Ep(e)??1/0);A.style.right=`${document.documentElement.clientWidth-i+op}px`,A.style.top=`${e.top}px`,A.style.height=r>1?`${r}px`:""}function Tp(){let t=So();if(N=Bl(),!N.length||!t){Ot?.dispose(),Ot=void 0,A?.remove(),A=null,fe="";return}if(Mo!==t){qo?.abort(),qo=new AbortController,t.addEventListener("scroll",Ft(To),{passive:!0,signal:qo.signal});for(let n of rp)t.addEventListener(n,Hl,{passive:!0,signal:qo.signal});Mo=t,Pt?.disconnect(),Pt=new ResizeObserver(()=>{t.isConnected&&Ml(t)}),Pt.observe(t),Pn=null,On=new Set}let e=st();if(e&&e!==Pn&&Pt&&(Pt.observe(e),Pn=e),Pt)for(let n of document.querySelectorAll(Cl))On.has(n)||(Pt.observe(n),On.add(n));kp(),Ml(t);let o=JSON.stringify(N.map(n=>[n.role,n.ids]));o!==fe?(fe=o,pe=-1,Cp(),De&&Date.now()<De.until&&De.chat===b()&&N[0]?.ids[0]!==De.first&&Kn(0)):Mp(),To()}function To(){if(!A||!Mo)return;ct=pe>=0?pe:xp(Mo),A.querySelectorAll(`.${M("tick")}`).forEach((e,o)=>e.classList.toggle(M("tick-current"),o===ct)),A.querySelectorAll(`.${M("row")}`).forEach(e=>e.setAttribute("aria-current",String(Number(e.dataset.index)===ct)));let t=A.querySelector(`.${M("toc-head")}`);t&&(t.textContent=`${ct+1} / ${N.length}`)}function Mp(){A?.querySelectorAll(`.${M("tick")}`).forEach((t,e)=>{let o=N[e],n=bt(o.summary,Dn);t.title!==n&&(t.title=n),t.classList.toggle(M("tick-streaming"),o.streaming)}),A?.querySelectorAll(`.${M("row")}`).forEach(t=>{let e=t.lastElementChild,o=bt(N[Number(t.dataset.index)].summary||"\u2026",Dn);e&&e.textContent!==o&&(e.textContent=o)})}function Cp(){A?.querySelector(`.${M("rail")}`)?.replaceChildren(...N.map((e,o)=>a("button",{class:$o(M("tick"),M(`tick-${e.role}`),e.streaming&&M("tick-streaming"),o===ct&&M("tick-current")),title:bt(e.summary,Dn),attrs:{type:"button","aria-label":`Jump to message ${o+1}`,"data-message-id":e.ids[0]??""},on:{click:()=>Kn(o)}}))),A?.querySelector(`.${M("toc-list")}`)?.replaceChildren(...N.map(Sp))}var Et=Ft(Tp);function yi(t){if(t===A)return;let e=t.__bloomNavStop;if(e&&e!==vi)try{e()}catch{}t.isConnected&&t!==A&&t.remove()}function Rl(){let t=[...document.querySelectorAll('[data-bloom="navigator"]')];if(A&&!A.isConnected&&(A=null),A&&t.includes(A)){for(let e of t)yi(e);return}A=t[0]??null;for(let e of t.slice(1))yi(e)}function Lp(){Ot?.dispose(),Ot=Bn({over:t=>t instanceof Node&&!!A?.contains(t),trigger:()=>A?.querySelector(`.${M("rail")}`),panel:()=>A?.querySelector(`.${M("toc")}`),setHeld:t=>A?.classList.toggle(M("open"),t)})}function kp(){Rl(),A&&!A.querySelector(`.${M("rail")}`)&&(A.remove(),A=null,fe=""),A||(A=a("div",{class:`bloom-root ${M("root")}`,attrs:{"data-bloom":"navigator"},on:{pointerenter:()=>Ot?.enter(),pointerleave:t=>Ot?.leave(t)}},a("div",{class:M("rail")}),a("div",{class:M("bridge"),attrs:{"aria-hidden":"true"}}),a("div",{class:M("toc")},a("div",{class:M("toc-head")}),a("div",{class:M("toc-list")}))),fe=""),Ot||Lp(),A.isConnected||document.body.append(A),A.querySelector(`.${M("tick")}`)||(fe=""),A.__bloomNavStop=vi}function Hl(){pe=-1,De=null,fi++}function vi(){for(let t of gi)t();gi=[],qo?.abort(),Pt?.disconnect(),Pt=void 0,Mo=null,Pn=null,On=new Set,removeEventListener("keydown",Dl,!0),removeEventListener("resize",Et),Ot?.dispose(),Ot=void 0,A&&delete A.__bloomNavStop,A?.remove(),A=null,fe="",Il(),Rn.clear(),Eo="",Bt=!1;for(let t of document.querySelectorAll('[data-bloom="navigator"]'))yi(t)}var Ip=t=>!!t&&(t.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!t.closest("[contenteditable='true']"));function Dl(t){if(!A||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey||Ip(document.activeElement)||yt("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:ct-1,ArrowDown:ct+1,Home:0,End:N.length-1}[t.key];if(o==null){Hl();return}o<0||o>=N.length||(t.preventDefault(),t.stopPropagation(),Kn(o))}var Nl=h({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:Fn,styles:Sl,start(){Rl(),gi=[C(t=>Y(t)&&Et()),vt(Et),St.on("conversation",Et),St.on("generate-start",({parentId:t,userId:e})=>{t&&(Co={parent:t,user:e},Et())}),D.on("rise",Et),D.on("fall",Et)],addEventListener("keydown",Dl,!0),addEventListener("resize",Et,{passive:!0}),Et()},stop:vi,onSettingsChange:Et});var Ul=`/*
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
`;var _=I("bloom-quotes-"),Ci="BloomBetterQuotes",Pp=40,Yl=8,Op=1800,Si=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,Fl=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,he=y({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),Ai,wi,Ue,xi=!1,qi=0,Gn=null,Yn=null,Rt=null;function Li(){return b()??"draft"}function Qn(){try{let t=JSON.parse(sessionStorage.getItem(Ci)??"[]");return Array.isArray(t)?t.filter(e=>!!e&&typeof e=="object"&&typeof e.id=="string"&&typeof e.text=="string"&&!!e.text):[]}catch{return[]}}function ki(t){try{sessionStorage.setItem(Ci,JSON.stringify(t.slice(-Pp)))}catch{}}function Lo(t){return Qn().find(e=>e.id===t)?.text??""}function Rp(t,e){let o=Qn().filter(n=>n.id!==t);o.push({id:t,text:e}),ki(o)}function Ei(t=Li()){ki(Qn().filter(e=>e.id!==t)),jn()}function Hp(t){let e=Lo("draft");if(!e||Lo(t))return;let o=Qn().filter(n=>n.id!=="draft");o.push({id:t,text:e}),ki(o)}function Ti(t){return`${t.getAttribute("aria-label")??""} ${t.getAttribute("title")??""}`}function Dp(t){let e=Ti(t);return Fl.test(e)&&!/quote|引用/.test(e)?!1:/quote|引用/.test(e)&&Si.test(e)?!0:Si.test(e)&&!Fl.test(e)}function jl(t){let e=t.cloneNode(!0),o=[...e.querySelectorAll("button, [role='button']")],n=new Set(o.map(r=>r.getAttribute("aria-label")).filter(Boolean));for(let r of o)r.remove();for(let r of e.querySelectorAll("*"))!r.children.length&&n.has(v(r.textContent??""))&&r.remove();return v(e.textContent??"")}function Np(t){let e=st(),o=t.parentElement,n=0;for(;o&&o!==e&&n<5;){if(n++,o.matches(c.composerInput)||o.querySelector(c.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=jl(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function Wn(){let t=st();if(!t)return null;for(let e of t.querySelectorAll("button, [role='button']")){if(e.closest("[data-bloom]")||!Dp(e))continue;let o=Np(e),n=o?jl(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:e}}return null}function Up(t){let e=t.closest(c.searchUnit)??t.closest(c.oldMessage);return e&&(Vt(e)??e.getAttribute("data-message-author-role"))==="user"?e:null}function Ii(t){return v(t).slice(0,48)}function Fp(t,e){let o=Ii(t);if(o.length<Yl)return null;let n=null;for(let r of Oe()){if(e&&(r===e||e.contains(r)||r.contains(e)))continue;let i=v(r.textContent??"");if(!i.includes(o))continue;let s=o.length/Math.max(i.length,1);(!n||s>n.score)&&(n={el:r,score:s})}return n?.el??null}function Kp(t,e){let o=Ii(e),n=t;for(let r of t.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&v(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${_("hit")}`)?.classList.remove(_("hit")),n.classList.add(_("hit")),window.clearTimeout(qi),qi=window.setTimeout(()=>n.classList.remove(_("hit")),Op)}function Kl(t){let e=t.closest(c.timelineScroll)??document.scrollingElement;if(!(e instanceof HTMLElement)&&e!==document.scrollingElement)return;let o=t.getBoundingClientRect();if(o.height<1||!e)return;let n=e.getBoundingClientRect(),r=st()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,s=o.top+o.height/2-(n.top+i)/2;Math.abs(s)<8||e.scrollTo({top:e.scrollTop+s,behavior:"smooth"})}function Bi(){if(!Rt||!Gn?.isConnected)return;let t=Gn.getBoundingClientRect();t.width<1||(Rt.style.top=`${Math.max(8,t.top+8)}px`,Rt.style.left=`${Math.max(8,t.right-Rt.offsetWidth-8)}px`)}function Gp(t,e,o){Gn=t,Yn=e,Rt??=a("button",{class:`bloom-root ${_("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),Rt.isConnected||document.body.append(Rt),Kp(t,o),Bi()}function Gl(){Rt?.remove(),Rt=null,Gn=null,Yn=null,document.querySelector(`.${_("hit")}`)?.classList.remove(_("hit"))}function Ql(){return document.querySelector('[data-bloom="quote-chip"]')}function jn(){Ql()?.remove()}function Yp(t){let o=st()?.getBoundingClientRect();!o||o.width<8||(t.style.width=`${Math.max(120,o.width-24)}px`,t.style.left=`${o.left+12}px`,t.style.top=`${Math.max(8,o.top-t.offsetHeight-8)}px`)}function jp(t){let e=Ql();e||(e=a("div",{class:`bloom-root ${_("chip")}`,attrs:{"data-bloom":"quote-chip"}},a("span",{class:_("text")}),a("button",{class:_("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(e));let o=e.querySelector(`.${_("text")}`),n=v(t);o&&o.textContent!==n&&(o.textContent=n),e.dataset.text=t,Yp(e)}function Mi(){if(!xi){xi=!0;try{let t=Li(),e=Wn();he.store.persistAcrossChats&&e&&Lo(t)!==e.text&&Rp(t,e.text);let o=he.store.persistAcrossChats?Lo(t):"";!o||e&&v(e.text)===v(o)?jn():jp(o),Bi()}finally{xi=!1}}}function Qp(t){let e=t.closest('[data-bloom="quote-chip"]');if(e instanceof HTMLElement&&!t.closest(`.${_("x")}`)){let i=e.dataset.text??e.querySelector(`.${_("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:e}:null}let o=t.closest("blockquote");if(o instanceof HTMLElement&&!t.closest("a, button")){let i=Up(o),s=v(o.textContent??"");if(i&&s)return{text:s,skip:i,origin:o}}let n=st();if(!n||!n.contains(t)||co(t)||t.closest("button, [role='button']"))return null;let r=Wn();return!r||!r.row.contains(t)?null:{text:r.text,skip:null,origin:r.row}}function Wp(t){let{target:e}=t;if(!(e instanceof Element))return;if(e.closest('[data-bloom="quote-back"]')){t.preventDefault(),t.stopPropagation(),Yn?.isConnected&&Kl(Yn);return}if(e.closest(`.${_("x")}`)){t.preventDefault(),t.stopPropagation(),Ei();return}let o=Wn();if(o&&(e===o.dismiss||o.dismiss.contains(e))){Ei();return}if(zp(e)&&Wl(),!he.store.jumpToPassage)return;let n=Qp(e);if(!n)return;let r=Fp(n.text,n.skip);r&&(t.preventDefault(),t.stopPropagation(),Gp(r,n.origin,n.text),Kl(r))}function zp(t){let e=t.closest("button, [role='button']");return!(e instanceof HTMLElement)||e.closest("[data-bloom]")||!st()?.contains(e)?!1:/send|submit|发送|提交/i.test(Ti(e))&&!Si.test(Ti(e))}function Vp(t){return!(t instanceof KeyboardEvent)||t.key!=="Enter"||t.shiftKey||t.isComposing?!1:co(t.target)}function Wl(){if(!he.store.persistAcrossChats)return;let t=Li(),e=Lo(t);if(e){if(!Wn()){let o=J(),n=Ii(e);n.length>=Yl&&!v(o).includes(n)&&kt(`> ${e}

${o}`.trim())}Ei(t)}}function Jp(t){Vp(t)&&Wl()}function Zp(t){!t.prevId&&t.id&&Hp(t.id),Mi()}var zl=h({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:he,styles:Ul,onSettingsChange(t){t==="jumpToPassage"&&!he.store.jumpToPassage&&Gl(),t==="persistAcrossChats"&&!he.store.persistAcrossChats&&(sessionStorage.removeItem(Ci),jn()),Mi()},start(){Ue=new AbortController,document.addEventListener("pointerdown",Wp,{capture:!0,signal:Ue.signal}),document.addEventListener("keydown",Jp,{capture:!0,signal:Ue.signal}),addEventListener("scroll",Bi,{capture:!0,passive:!0,signal:Ue.signal}),wi=vt(Zp),Ai=C(t=>Y(t)&&Mi())},stop(){Ue?.abort(),Ue=void 0,wi?.(),wi=void 0,Ai?.(),Ai=void 0,window.clearTimeout(qi),Gl(),jn()}});var Vl=`/*
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
`;var Xp="[data-app-action-sidebar-thread-row]{position:relative}[data-app-action-sidebar-thread-row]>[data-bloom=cls]{position:absolute;inset-inline-end:0.25rem;top:50%;width:0.875rem;height:0.875rem;margin:0;transform:translateY(-50%);pointer-events:none}",_p=I("bloom-cls"),tf="bloom-cls",ef=600*1e3,Oi=eo("tab"),Ke=new Map,ko=new Map,Fe=null,Jl=[],of=t=>t==="streaming"||t==="error";function nf(){let t=new Map,e=Date.now();for(let[o,n]of ko)e-n.at>ef?ko.delete(o):t.set(o,n.status);for(let[o,n]of Ke)t.set(o,n);return t}function rf(t){return a("span",{class:`bloom-root ${_p("",`-${t}`)}`,attrs:{"data-bloom":"cls","data-status":t,"aria-label":t==="error"?"Error":"Generating"}},t==="error"&&B("alert"))}function Vn(){let t=nf(),e=new Set;for(let[o,n]of t)for(let r of ho(o)){if(!At(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){e.add(i);continue}i?.remove();let s=rf(n);e.add(s),r.append(s)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))e.has(o)||o.remove()}function zn(t,e){t&&(e?Ke.set(t,e):Ke.delete(t),Fe?.postMessage({tab:Oi,id:t,status:e}),Vn())}function af({data:t}){!k(t)||typeof t.id!="string"||typeof t.tab!="string"||t.tab===Oi||(of(t.status)?ko.set(t.id,{status:t.status,tab:t.tab,at:Date.now()}):ko.delete(t.id),Vn())}function Pi(){for(let t of Ke.keys())Fe?.postMessage({tab:Oi,id:t,status:null})}var Zl=h({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:()=>`${Vl}${Xp}`,start(){for(let t of document.querySelectorAll('[data-bloom="cls"]'))t.remove();Fe=typeof BroadcastChannel=="function"?new BroadcastChannel(tf):null,Fe?.addEventListener("message",af),addEventListener("pagehide",Pi),Jl=[D.on("rise",({conversationId:t})=>zn(t,"streaming")),D.on("fall",({conversationId:t,outcome:e})=>zn(t,e==="error"?"error":null)),D.on("context",({prevId:t,id:e,migrated:o})=>{o&&tt().generating?zn(e,"streaming"):!o&&Ke.get(t??"")==="streaming"&&zn(t,null)}),C(t=>Y(t)&&Vn())],b()&&Vn()},stop(){for(let t of Jl)t();Pi(),Fe?.close(),Fe=null,removeEventListener("pagehide",Pi),Ke.clear(),ko.clear();for(let t of document.querySelectorAll('[data-bloom="cls"]'))t.remove()}});var Zt="data-bloom-invite",sf=/^(?:invite team members|invite members|邀请团队成员|邀请成员)$/i,$l=':is(button, a:not([href^="/c/"])):not(main *, [role="dialog"] *)',lf={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${c.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])'],hideInvite:[`[${Zt}]`,`div:has(> [${Zt}]:only-child)`]},Xl=y({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0},hideInvite:{type:"boolean",description:"Hide Invite team members in the sidebar.",default:!0}}),Jn,Ri=!1;function cf(t){if(Y(t))for(let e of document.querySelectorAll(`${$l}, [${Zt}]`))!e.matches($l)||!sf.test(v(e.textContent??""))?e.removeAttribute(Zt):e.hasAttribute(Zt)||e.setAttribute(Zt,"")}var _l=h({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads, notices and Invite team members.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:Xl,styles:()=>Ut(Object.entries(lf).flatMap(([t,e])=>Xl.store[t]?e:[])),start(){Ri=!0,jt().then(()=>{Ri&&!Jn&&(Jn=C(cf))})},stop(){Ri=!1,Jn?.(),Jn=void 0;for(let t of document.querySelectorAll(`[${Zt}]`))t.removeAttribute(Zt)}});var Ge=`form:has(:is(${c.composerInput})), ${c.oldComposerForm}`,Zn='[class*="ComposerLayoutBody"]',Di='[class*="ComposerLayoutRoot"]',uf='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',df=`:is(${Ge}) ${Zn}, :is(${Ge}):not(:has(${Zn})) ${Di}, :is(${Ge}):not(:has(${Zn})):not(:has(${Di})) :is(${uf})`,mf='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',pf='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',ff="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))",gf="var(--color-background-composer-surface, var(--composer-background-color, var(--color-bg-primary, Canvas)))",hf="composer-fill",tc=y({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function bf(){let{opacity:t,blur:e}=tc.store;if(t>=100)return"";{let i=`color-mix(in srgb, ${gf} ${t}%, transparent)`;return`[class*="ComposerLayoutRoot"], [data-composer-layout], [data-chatgpt-composer]{--composer-layout-surface-background:${i}!important;--composer-background-color:${i}!important;--composer-layout-surface-backdrop-filter:blur(${e}px)!important}`}let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${ff} ${t}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${e}px)!important;-webkit-backdrop-filter:blur(${e}px)!important`;return`:is(${mf}), :is(${Ge}){${o}}:is(${pf}){display:none!important}${df}{${n}}:is(${Ge}):has(${Zn}) ${Di}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${Ge}) :is(${c.composerInput}){background-color:transparent!important}`}function Hi(){for(let t of document.querySelectorAll(`[data-bloom="${hf}"]`))t.remove()}var ec=h({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:tc,styles:bf,start(){Hi()},stop(){Hi()},onSettingsChange(){Hi()}});var yf=1200,vf=8e3,Af=150,wf=20,oc=6,Fi="continue where you left",xf=/message delivery timed out|please try again/i,nc=/waiting for the complete answer/i,rc=y({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:Fi,placeholder:Fi}}),Ni=[],Xn=0,Io=!1,Bo=0,je="",$n="",Ki=0,Qe=!1,Po=!1,_n=!0,Ye="",Gi=0,tr=!1,Sf=()=>rc.store.prompt.trim()||Fi;function ic(){return(yt(c.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function ac(){let t=ic();return!t||nc.test(t)||!xf.test(t)?"":t}function qf(){let t=ic();return t&&nc.test(t)?t:""}function Ef(){let t=kn()?.querySelectorAll(c.turn),e=t?.[t.length-1];return`${e?.getAttribute("data-turn-key")??""}:${e?.textContent?.length??0}`}function sc(t,e,o){if(o===Xn){if(tt().generating||J()!==t||e>=wf){Qe=!1,tt().generating||(je="");return}cs(),setTimeout(()=>sc(t,e+1,o),Af)}}function Tf(t){let e=Xn;if(tt().generating||J()&&J()!==t){Qe=!1,je="";return}kt(t),tr=!0,Ar(()=>{e===Xn&&sc(t,0,e)})}function lc(t){return t===je||Bo>=oc||tt().generating||J()?!1:(je=t,Bo+=1,Qe=!0,Tf(Sf()),!0)}function Mf(){if(Io||Qe||Po)return;let t=Date.now(),e=ac();if(e){if(Ye="",e!==$n){$n=e,Ki=t;return}if(t-Ki<yf)return;lc(`${b()??""}:${e}`);return}if($n="",!qf()){_n=!0,Ye="";return}if(!_n||!tt().generating||J())return;let n=`${b()??""}:${Ef()}`;if(n!==Ye){Ye=n,Gi=t;return}if(t-Gi<vf||Bo>=oc)return;let r=kr();r&&(Po=!0,r.click())}function Ui(){Xn+=1,Io=!1,Bo=0,je="",$n="",Ki=0,Qe=!1,Po=!1,_n=!0,Ye="",Gi=0,tr=!1}var cc=h({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:rc,start(){Ui(),Ni=[D.on("rise",()=>{Io=!1,je="",Qe=!1,tr&&(tr=!1,_n=!1,Ye="")}),D.on("fall",({outcome:t})=>{if(Po){Po=!1,t==="left"?Io=!0:lc(`${b()??""}:stall`);return}(t==="stopped"||t==="left")&&(Io=!0),t==="done"&&!ac()&&(Bo=0)}),D.on("context",({migrated:t})=>{t||Ui()}),D.on("tick",Mf)]},stop(){for(let t of Ni)t();Ni=[],Ui()}});var Ht=I("bloom-csi-"),Cf=256,Lf=160,er=1,uc=4,kf=.1,If=.0015,Bf=250;function Pf(t){return new Promise((e,o)=>{let n=new FileReader;n.onload=()=>e(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(t)})}function Of(t){return new Promise((e,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>e(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=t})}function Rf(t,e){let o=Math.max(1/t.naturalWidth,1/t.naturalHeight)*e.zoom,n=1/(2*t.naturalWidth*o),r=1/(2*t.naturalHeight*o);return{zoom:e.zoom,x:nt(e.x,n,1-n),y:nt(e.y,r,1-r)}}function dc(t,e,o){let n=t.width,r=t.getContext("2d");if(!r)return;let i=Math.max(n/e.naturalWidth,n/e.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(e,n/2-o.x*e.naturalWidth*i,n/2-o.y*e.naturalHeight*i,e.naturalWidth*i,e.naturalHeight*i)}function Hf(t,e){let o=a("canvas");return o.width=o.height=Cf,dc(o,t,e),o.toDataURL("image/png")}function mc(t){let e=null,o={x:V.store.cropX,y:V.store.cropY,zoom:V.store.cropZoom},n,r=a("canvas",{class:Ht("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=Lf*devicePixelRatio;let i=a("div",{class:`bloom-muted ${Ht("status")}`}),s=a("div",{class:Ht("zoom")}),d=a("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(g,q=!0){e&&(o=Rf(e,g),dc(r,e,o),q&&(clearTimeout(n),n=setTimeout(()=>{e&&(V.store.cropX=o.x,V.store.cropY=o.y,V.store.cropZoom=o.zoom,V.store.avatarUrl=Hf(e,o))},Bf)))}function u(){s.replaceChildren(bn(o.zoom,er,uc,kf,"\xD7",g=>l({...o,zoom:g})))}async function m(g,q){i.textContent="";try{e=await Of(g),q&&(V.store.avatarSource=g,o={x:.5,y:.5,zoom:er}),t.classList.add(Ht("has-image")),u(),l(o,q)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let f=g=>{g?.type.startsWith("image/")&&Pf(g).then(q=>m(q,!0))};d.addEventListener("change",()=>f(d.files?.[0])),r.addEventListener("wheel",g=>{e&&(g.preventDefault(),l({...o,zoom:nt(o.zoom*(1-g.deltaY*If),er,uc)}),u())},{passive:!1}),r.addEventListener("pointerdown",g=>{if(!e)return;r.setPointerCapture(g.pointerId);let q={...o},E=r.getBoundingClientRect(),L=O=>{if(!e)return;let $=Math.max(E.width/e.naturalWidth,E.height/e.naturalHeight)*o.zoom;l({...o,x:q.x-(O.clientX-g.clientX)/(e.naturalWidth*$),y:q.y-(O.clientY-g.clientY)/(e.naturalHeight*$)})};r.addEventListener("pointermove",L),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",L),{once:!0})});let T=a("div",{class:Ht("cropper"),attrs:{tabindex:"0"},on:{paste:g=>f([...g.clipboardData?.files??[]].find(q=>q.type.startsWith("image/"))),dragover:g=>g.preventDefault(),drop:g=>{g.preventDefault(),f(g.dataTransfer?.files[0])}}},a("div",{class:Ht("stage")},r),a("div",{class:Ht("controls")},fo("",g=>g.trim()&&void m(g.trim(),!0),"https://\u2026 or data:image/\u2026","url"),a("div",{class:Ht("buttons")},F("Choose file",()=>d.click()),F("Reset crop",()=>{l({x:.5,y:.5,zoom:er}),u()}),F("Clear",()=>{e=null,t.classList.remove(Ht("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),s.replaceChildren(),V.store.avatarUrl="",V.store.avatarSource=""},"danger")),s,i,d));return t.append(T),V.store.avatarSource&&m(V.store.avatarSource,!1),()=>{clearTimeout(n),t.replaceChildren()}}var pc=`/*
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
`;var Oo="data-bloom-csi-avatar",Yi="data-bloom-csi-sized",bc="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",Nf=32,V=y({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:t=>mc(t)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),fc=[];function yc(t){t.removeAttribute(Oo),t.removeAttribute(Yi)}function gc(t){return(V.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${t}]`)])}function hc(t=[]){if(!Y(t))return;let e=V.store.displayName.trim()||null,o=!!V.store.avatarUrl,n=new Set(e?gc("name"):[]);for(let i of document.querySelectorAll(bc))n.has(i)||ne(i,null);for(let i of n)ne(i,e);let r=new Set(o?gc("avatar"):[]);for(let i of document.querySelectorAll(`[${Oo}]`))r.has(i)||yc(i);for(let i of r)i.hasAttribute(Oo)||i.setAttribute(Oo,""),i.toggleAttribute(Yi,!i.closest('[role="menu"]'))}function Uf(){let t=V.store.avatarUrl;return t?`:root{--bloom-csi-url:url("${t.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${V.store.avatarSize}px}:is(${c.rail}, ${c.oldRail}) [${Yi}]{--bloom-csi-size:${Nf}px}`:""}var vc=h({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:V,styles:()=>`${Uf()}
${pc}`,start(){fc=[xt(),C(hc)]},stop(){for(let t of fc)t();for(let t of document.querySelectorAll(`[${Oo}]`))yc(t);for(let t of document.querySelectorAll(bc))ne(t,null)},onSettingsChange(){hc()}});var We=I("bloom-greeting-"),Ac=30,wc=100;function xc(t){let e=-1,o=a("textarea",{class:`bloom-input ${We("input")}`,attrs:{maxlength:String(wc),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=F("Add",i),r=a("div",{class:We("list")});function i(){let l=o.value.trim().slice(0,wc);if(!l)return;let u=[...P.store.greetings];e>=0?u[e]=l:u.length<Ac&&u.push(l),P.store.greetings=u,e=-1,o.value="",s()}function s(){let{greetings:l}=P.store;n.textContent=e>=0?"Save":"Add",n.disabled=e<0&&l.length>=Ac,r.replaceChildren(...l.length?l.map((u,m)=>a("div",{class:We("row",m===e?"row-editing":"row-idle")},a("div",{class:We("text"),text:u}),z("edit","Edit",()=>{e=m,o.value=u,o.focus(),s()}),z("trash","Delete",()=>{P.store.greetings=l.filter((f,T)=>T!==m),e===m&&(e=-1),s()}))):[a("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),t.append(a("div",{class:We("editor")},r,a("div",{class:We("form")},o,n))),s();let d=qe((l,u)=>l==="GreetingCustomizer"&&u==="greetings"&&s());return()=>{d(),t.replaceChildren()}}var Sc=`/*
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
`;var nr="data-bloom-greeting",Kf=1e3,Gf=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],P=y({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:t=>xc(t)},greetings:{type:"custom",default:Gf},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),or,qc=[],ji,No=()=>hn()&&!re(),Yf=t=>t.replaceAll(/\s*\n\s*/g," ").trim(),Tc=()=>P.store.greetings.filter(t=>typeof t=="string"&&t.trim());function Uo(){let t=Tc();if(t.length)if(P.store.order==="random"&&t.length>1){let e=P.store.lastRandom;for(;e===P.store.lastRandom;)e=Math.floor(Math.random()*t.length);P.store.lastRandom=e,P.store.index=e}else P.store.index=(P.store.index+1)%t.length}function jf(){return No()?yt(c.homeHeading):null}function Ro(){for(let t of document.querySelectorAll(`[${nr}]`))t.removeAttribute(nr),ne(t,null)}function Ho(){for(let t of document.querySelectorAll("[data-bloom-placeholder]"))t.removeAttribute("data-bloom-placeholder")}function Ec(t){let e=ft(),o=Yf(t);if(!e||!o||J(e)){Ho();return}e.getAttribute("data-bloom-placeholder")!==o&&e.setAttribute("data-bloom-placeholder",o)}function Do(){let t=Tc(),e=ms(),o=No();if(!t.length||!e&&!o){Ro(),Ho();return}if(e){Ro(),Ec(t[0]??"");return}let n=jf();n?((P.store.index<0||P.store.index>=t.length)&&Uo(),n.setAttribute(nr,""),ne(n,t[Math.max(0,P.store.index)%t.length]??"")):Ro(),P.store.heroOnlyOutsideProject?Ho():Ec(t[Math.max(0,P.store.index)%t.length]??"")}function Qi(){clearInterval(or),or=void 0,P.store.mode==="interval"&&No()&&(or=setInterval(()=>{Uo(),Do()},P.store.intervalSec*Kf))}function Qf(t){P.store.mode!=="manual"||!(t.target instanceof Element)||!t.target.closest(`[${nr}]`)||getSelection()?.toString()||(Uo(),Do())}function Wf(){No()&&P.store.mode==="refresh"&&Uo(),Qi(),Do()}var Mc=h({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:P,styles:Sc,start(){Ro(),Ho(),ji=new AbortController,document.addEventListener("click",Qf,{signal:ji.signal}),No()&&P.store.mode==="refresh"&&Uo(),Qi(),qc=[C(t=>Y(t)&&Do()),vt(Wf)]},stop(){ji?.abort();for(let t of qc)t();clearInterval(or),Ro(),Ho()},onSettingsChange(t){(t==="mode"||t==="intervalSec")&&Qi(),Do()}});var Fo=I("bloom-history-"),Wi=10,zf=3e3;function zi(t,e){let o="",n=0,r=new Set,i=a("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),s=a("div",{class:Fo("list")}),d=a("div",{class:Fo("pager")}),l,u=F("Clear all",()=>{if(!l){u.textContent="Click again to clear",l=setTimeout(()=>{l=void 0,u.textContent="Clear all"},zf);return}clearTimeout(l),l=void 0,u.textContent="Clear all",Ko([])},"danger");function m(){let T=[...be.store.entries].toReversed(),g=o.trim().toLowerCase(),q=g?T.filter(U=>U.toLowerCase().includes(g)):T,E=Math.max(1,Math.ceil(q.length/Wi));n=Math.min(n,E-1);let L=q.slice(n*Wi,(n+1)*Wi).map(U=>a("div",{class:Fo("row")},a("button",{class:Fo("text",r.has(U)?"text-open":"text-closed"),text:U,title:r.has(U)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{r.delete(U)||r.add(U),m()}}}),e&&z("edit","Use",()=>e(U)),z("copy","Copy",()=>void zo(U)),z("trash","Delete",()=>Ko(be.store.entries.filter(dt=>dt!==U)))));s.replaceChildren(...L.length?L:[a("div",{class:"bloom-muted",text:g?"No matching prompts.":"No saved prompts yet."})]),d.replaceChildren(a("span",{class:"bloom-muted",text:`${q.length} ${g?"matching":"saved"} \xB7 page ${n+1} of ${E}`}),F("Previous",()=>{n--,m()}),F("Next",()=>{n++,m()}),u);let[O,$]=d.querySelectorAll("button");O.disabled=n===0,$.disabled=n>=E-1,u.disabled=!T.length}i.addEventListener("input",()=>{o=i.value,n=0,m()}),t.append(a("div",{class:Fo("manager")},i,s,d)),m();let f=qe((T,g)=>T==="InputHistory"&&g==="entries"&&m());return()=>{f(),clearTimeout(l),t.replaceChildren()}}var Cc=`/*
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
`;var Dt=I("bloom-history-"),Jf=2e3,be=y({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:t=>zi(t)},entries:{type:"custom",default:[]}}),K=null,Vi={text:"",at:0},Tt=null,$t=null,Ji,Ve=()=>be.store.entries.filter(t=>typeof t=="string");function Ko(t){be.store.entries=t.slice(-be.store.maxEntries)}function Zi(t){let e=t.trim();if(!e)return;let o=Date.now();e===Vi.text&&o-Vi.at<Jf||(Vi={text:e,at:o},Ko([...Ve().filter(n=>n!==e),e]))}function Lc(t){t.preventDefault()}function Zf(){let t=a("button",{class:Dt("hud-count"),attrs:{type:"button"},on:{mousedown:Lc,click:tg}}),e=a("button",{class:Dt("hud-x"),text:"\xD7",attrs:{type:"button","aria-label":"Exit history"},on:{mousedown:Lc,click:$f}});return a("div",{class:`bloom-root ${Dt("hud")}`,attrs:{"data-bloom":"history-hud",role:"group","aria-live":"polite","aria-label":"Input history"}},t,e)}function kc(t,e){let o=ft();if(!o||$t)return;Tt??=Zf();let n=`${t+1} / ${e}`,r=Tt.querySelector(`.${Dt("hud-count")}`);r?.replaceChildren(n),r?.setAttribute("aria-label",`Show input history (${n})`);let i=(o.closest("form")??o).getBoundingClientRect();Tt.style.left=`${i.left+i.width/2}px`,Tt.style.top=`${i.top}px`,Tt.isConnected||document.body.append(Tt)}function ze(){K=null,Tt?.remove()}function $f(){K&&kt(K.draft),ze(),ft()?.focus()}function Ic(t){let e=Ve();if(!K)return;let o=e[t];K.index=t,K.shown=o,kt(o),kc(e.length-1-t,e.length)}function Xf(t){let e=Ve();if(!e.length)return!1;if(!K){if(t===1)return!1;K={index:e.length,draft:J(),shown:""}}let o=K.index+t;return o<0?!0:o>=e.length?(kt(K.draft),ze(),!0):(Ic(o),!0)}function _f(t){let e=Ve().indexOf(t);Go(),!(e<0)&&(K??={index:e,draft:J(),shown:""},Ic(e),ft()?.focus())}function Go(){if(!$t)return;$t.release(),$t.controller.abort(),$t.root.remove(),$t=null;let t=Ve();K&&t[K.index]===K.shown?kc(t.length-1-K.index,t.length):K=null}function tg(){if($t)return;Tt?.remove();let t=a("div",{class:Dt("dialog-body")}),e=a("div",{class:`bloom-root ${Dt("backdrop")}`,attrs:{"data-bloom":"history-dialog"},on:{click:n=>n.target===n.currentTarget&&Go()}},a("div",{class:Dt("dialog"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Input history"}},a("div",{class:Dt("dialog-header")},a("h2",{class:Dt("dialog-title"),text:"Input history"}),z("close","Close",Go)),t));e.addEventListener("keydown",n=>n.stopPropagation());let o=new AbortController;document.addEventListener("keydown",n=>{n.key==="Escape"&&(n.preventDefault(),n.stopPropagation(),Go())},{capture:!0,signal:o.signal}),wt(e),$t={root:e,release:zi(t,_f),controller:o},t.querySelector("input")?.focus()}function Bc(t){return co(t)?t:t instanceof HTMLElement?t.closest(c.composerInput):null}function eg(){if(ft()?.closest("[data-chatgpt-composer], [data-composer-input], form")?.querySelector('[aria-expanded="true"]'))return!0;for(let e of document.querySelectorAll('[role="listbox"], [role="menu"], [data-radix-popper-content-wrapper], [cmdk-root], [cmdk-list]')){if(!(e instanceof HTMLElement)||e.closest("[data-bloom]"))continue;let o=getComputedStyle(e);if(!(o.display==="none"||o.visibility==="hidden"))return!0}return!1}function og(t){if(t.isComposing||t.key==="Process"||t.keyCode===229)return;let e=Bc(t.target);if(!e)return;if(t.key==="Enter"&&!t.shiftKey){Zi(J(e)),ze();return}if(t.key==="Escape"&&K){kt(K.draft),ze(),t.preventDefault(),t.stopPropagation();return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.ctrlKey||t.metaKey||t.shiftKey||eg())return;let o=ss(e),n=t.key==="ArrowUp";!t.altKey&&!(n?o.first:o.last)||!n&&!K||Xf(n?-1:1)&&(t.preventDefault(),t.stopPropagation())}function ng(t){K&&Bc(t.target)&&J()!==K.shown.trim()&&ze()}function rg(t){t.target instanceof Element&&t.target.closest(c.sendButton)&&Zi(J())}var Pc=h({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before. Click the counter to browse history.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:be,styles:Cc,start(){for(let e of document.querySelectorAll('[data-bloom="history-hud"], [data-bloom="history-dialog"]'))e.remove();Tt=null,Ji=new AbortController;let{signal:t}=Ji;document.addEventListener("keydown",og,{capture:!0,signal:t}),document.addEventListener("input",ng,{capture:!0,signal:t}),document.addEventListener("click",rg,{capture:!0,signal:t}),document.addEventListener("submit",()=>Zi(J()),{capture:!0,signal:t})},stop(){Ji?.abort(),Go(),ze();for(let t of document.querySelectorAll('[data-bloom="history-hud"]'))t.remove();Tt=null},onSettingsChange(t){t==="maxEntries"&&Ko(Ve())}});var Oc=`/*
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
`;var ag=1500,sg=5e3,lg=2e3,Fc=[{label:"UTC",value:"UTC"},{label:"\u7F8E\u56FD\u4E1C\u90E8",value:"America/New_York"},{label:"\u7F8E\u56FD\u4E2D\u90E8",value:"America/Chicago"},{label:"\u7F8E\u56FD\u5C71\u5730",value:"America/Denver"},{label:"\u7F8E\u56FD\u897F\u90E8",value:"America/Los_Angeles"},{label:"\u65E5\u672C",value:"Asia/Tokyo"},{label:"\u53F0\u6E7E",value:"Asia/Taipei"}],Je=y({sourceTimeZone:{type:"select",description:"Zone the stored clock was written in. Leave UTC for ChatGPT create_time. Pick the same zone as the Shit GPT plugin only when that clock is a wall time in that zone; it is then shown in the system timezone.",options:Fc,default:"UTC"},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),ir=new Map,$i=new Set,Kc=0,ar,Rc=[];function Gc(t,e){ir.get(t)!==e&&(ir.set(t,e),clearTimeout(ar),ar=setTimeout(Yc,lg))}function Yc(){let t={...Je.store.stamps,...Object.fromEntries(ir)};Je.store.stamps=Object.fromEntries(Object.entries(t).toSorted((e,o)=>o[1]-e[1]).slice(0,ag))}function cg(t){let e=It(b())?.times;for(let o=t.length-1;o>=0;o--){let n=ir.get(t[o])??e?.get(t[o])??Je.store.stamps[t[o]];if(n)return n}return null}var ug=()=>tt().generating||Date.now()-Kc<sg;function jc(){return Intl.DateTimeFormat().resolvedOptions().timeZone}function Qc(){let t=Je.store.sourceTimeZone;if(!t||t==="UTC")return"UTC";try{return Intl.DateTimeFormat(void 0,{timeZone:t}),t}catch{return"UTC"}}function Wc(t,e){let o={};for(let n of new Intl.DateTimeFormat("en-US",{timeZone:e,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(t)))o[n.type]=n.value;return{y:+o.year,m:+o.month,d:+o.day,h:+o.hour%24,mi:+o.minute,s:+o.second}}function zc(t){return Date.UTC(t.y,t.m-1,t.d,t.h,t.mi,t.s)}function Hc(t,e){let o=t;for(let n=0;n<4;n++){let r=t-zc(Wc(o,e));if(r===0)return o;o+=r}return o}function dg(t,e){if(e==="UTC")return t;let o=(t%1e3+1e3)%1e3,n=t-o,r=new Date(n),i=Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),r.getUTCHours(),r.getUTCMinutes(),r.getUTCSeconds()),s=Hc(i,e),d=3600*1e3,l=Number.POSITIVE_INFINITY;for(let u of[-d,0,d]){let m=s+u;zc(Wc(m,e))===i&&m<l&&(l=m)}return l!==Number.POSITIVE_INFINITY?l+o:Hc(i+d,e)+o}function mg(t,e){let o=Qc();return e||o==="UTC"?t:dg(t,o)}function Dc(t,e){return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}function pg(t){let e=jc(),o=Date.now(),n={hour:"2-digit",minute:"2-digit",timeZone:e};if(Dc(t,e)===Dc(o,e))return new Intl.DateTimeFormat(void 0,n).format(t);let r=s=>new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric"}).format(s),i=r(t)===r(o)?{}:{year:"numeric"};return new Intl.DateTimeFormat(void 0,{...i,month:"short",day:"numeric",...n}).format(t)}function fg(t,e){let o=new Date(e).toLocaleString(void 0,{timeZone:jc()}),n=Qc();if(n==="UTC"||e===t)return o;let r=new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"UTC"}).format(t);return`${Fc.find(s=>s.value===n)?.label??n} ${r} \u2192 ${o}`}function Vc(t){let e=Vt(t)??t.getAttribute("data-message-author-role")??t.closest(c.turn)?.getAttribute("data-turn")??t.querySelector(c.authorRole)?.getAttribute("data-message-author-role");if(Ln(e))return e;let o=xo(t).at(-1);return It(b())?.chain.find(n=>n.id===o)?.role??null}var Nc='[class*="group/activity-header"]';function gg(t){let e=t.parentElement;if(!e)return null;let o=t.closest(c.turn);return o&&e!==o&&!o.contains(e)?null:e}function hg(t){let e=t;for(let o=0;o<8&&e;o++){let n=gg(e);if(!n)return null;let r=[...n.children],i=r.indexOf(e);for(let s=i-1;s>=0;s--){let d=r[s],l=d.matches(Nc)?d:d.querySelector(Nc);if(l)return l;if(d.matches(c.searchUnit)||d.querySelector(c.searchUnit))return null}if(n===e.closest(c.turn))return null;e=n}return null}function bg(t){let e=t.parentElement;for(let o=0;o<4&&e;o++){if(e.classList.contains("flex-col"))return e;e=e.parentElement}return t.parentElement??t}function Jc(t,e){if(e==="assistant"){let o=hg(t);if(o)return bg(o)}return t}function yg(t,e){let o=Oe();for(let n=o.length-1;n>=0;n--){let r=o[n];if(!(r!==t&&(Vc(r)!=="assistant"||Jc(r,"assistant")!==e)))return r===t}return!0}function Uc(t){return t.querySelector(':scope > time[data-bloom="timestamp"]')}function vg(t){let e=xo(t);if(!e.length||!At(t)||t.querySelector("time:not([data-bloom])"))return;let o=Vc(t),n=Jc(t,o);if(n!==t&&!yg(t,n)){Uc(t)?.remove();return}let r=cg(e),i=!1;if(!r&&ug()){r=Date.now();let m=e.at(-1);$i.add(m),Gc(m,r),i=!0}else r&&$i.has(e.at(-1))&&(i=!0);let s=n.querySelector('time[data-bloom="timestamp"]')??Uc(t);if(!r||Je.store.hideOwnMessages&&o==="user"){s?.remove();return}let d=mg(r,i),l=pg(d);if(s?.textContent===l&&s.parentElement===n&&s===n.firstElementChild)return;let u=a("time",{class:`bloom-timestamp bloom-timestamp-${o??"assistant"}`,text:l,title:fg(r,d),attrs:{"data-bloom":"timestamp",datetime:new Date(d).toISOString()}});s&&s.replaceWith(u),(u.parentElement!==n||u!==n.firstElementChild)&&n.prepend(u)}var rr=Ft(()=>{for(let t of Oe())vg(t)}),Zc=h({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:Je,styles:Oc,start(){Rc=[C(t=>Y(t)&&rr()),St.on("conversation",rr),St.on("message-time",({messageId:t,time:e})=>{$i.delete(t),Gc(t,e),rr()}),D.on("fall",()=>{Kc=Date.now()})]},stop(){for(let t of Rc)t();ar&&(clearTimeout(ar),Yc());for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove()},onSettingsChange(t){if(t!=="stamps"){for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove();rr()}}});var Ag=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])','[data-chatgpt-composer] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-composer-input] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-codex-composer-root] button[aria-label^="Dictat" i], [data-composer-placement] button[aria-label^="Dictat" i], [class*="ComposerLayout"] button[aria-label^="Dictat" i]'],wg=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],$c=y({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),Xc=h({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:$c,styles:()=>Ut([...Ag,...$c.store.hideDictationSettings?wg:[]])});var ye="data-bloom-share",xg=/^\/g\/g-p-/,Sg=/^(?:share|分享)$/i,qg=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],Eg=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${ye}="project"]`],Xi=y({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),sr,_i=!1;function Tg(t){if(!Y(t))return;let e=xg.test(location.pathname)&&!b();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${ye}]`))!e||!Sg.test(v(o.textContent??""))?o.removeAttribute(ye):o.hasAttribute(ye)||o.setAttribute(ye,"project")}var _c=h({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:Xi,styles:()=>Ut([...Xi.store.hideShareChat?qg:[],...Xi.store.hideShareProject?Eg:[]]),start(){_i=!0,jt().then(()=>{_i&&!sr&&(sr=C(Tg))})},stop(){_i=!1,sr?.(),sr=void 0;for(let t of document.querySelectorAll(`[${ye}]`))t.removeAttribute(ye)}});var tu='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',Mg='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',Cg="[data-bloom-profile-plan]",eu="visibility:hidden!important;user-select:none!important",nu=y({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function Lg(){let{hideUsername:t,hideEmail:e,enlargePlan:o,alignPlanWithAvatar:n}=nu.store,r=[];return t&&r.push(n?`:is(${tu}){display:none!important}`:`:is(${tu}){${eu}}`),e&&r.push(`:is(${Mg}){${eu}}`),t&&o&&r.push(`${Cg}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var ou,ru=h({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:nu,styles:Lg,start(){ou=xt()},stop(){ou?.()}});var kg=new Set(["chatgpt","new chat","\u65B0\u804A\u5929","codex"]);function Ig(){let t=v(document.title.replace(/\s*[|–-]\s*(?:ChatGPT|Codex)$/i,""));return t&&!kg.has(t.toLowerCase())?t:null}function Yo(t){return t?bo(t)??(t===b()?Ig():null):null}var iu=`/*
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
`;var ot=I("bloom-recent-"),Mt="home",Pg=50,au=140,Og=new Set(["Backquote"]),Rg=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),w=y({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(t=>({label:t,value:t})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),Xt=null,ut=[],ht=0,ta,su=[],cr=()=>re()?null:b()??(hn()?Mt:null);function lu(t,e){return Object.fromEntries(Object.entries(t).filter(([o])=>e.has(o)))}function uu(t){let e=Yo(t);e&&w.store.titles[t]!==e&&(w.store.titles={...w.store.titles,[t]:e});let o=Qs(location.href);o&&t===b()&&w.store.projects[t]!==o&&(w.store.projects={...w.store.projects,[t]:o})}function cu(t){if(!t)return;let e=[t,...w.store.visits.filter(n=>n!==t)].slice(0,Pg),o=new Set(e);w.store.visits=e,Object.keys(w.store.previews).some(n=>!o.has(n))&&(w.store.previews=lu(w.store.previews,o)),Object.keys(w.store.titles).some(n=>!o.has(n))&&(w.store.titles=lu(w.store.titles,o)),t!==Mt&&uu(t)}function Hg(t){if(!w.store.visits.includes(t))return;let{[t]:e,...o}=w.store.titles,{[t]:n,...r}=w.store.previews,{[t]:i,...s}=w.store.projects;w.store.visits=w.store.visits.filter(d=>d!==t),w.store.titles=o,w.store.previews=r,w.store.projects=s}function lr(t){if(!t||!w.store.visits.includes(t))return;let e={},o=It(t)?.chain??[];for(let r of o)e[r.role]=bt(In(r),au);if(t===b())for(let r of Jt()){let i=Re(r);i&&(e[r.role]=bt(i,au))}let n=w.store.previews[t];!e.user&&!e.assistant||n?.user===e.user&&n?.assistant===e.assistant||(w.store.previews={...w.store.previews,[t]:e})}function Dg(){let t=Number(w.store.maxRecent);return w.store.visits.filter(e=>e!==Mt||w.store.includeHome).slice(0,t)}function du(t){if($e(),t===cr())return;let e=t===Mt?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"], [data-sidebar-destination="builtin:home"]'):ho(t)[0];e?e.click():location.assign(t===Mt?"/":`/c/${t}`)}function Ng(t){let e=t===Mt?null:w.store.previews[t],o=e&&["user","assistant"].filter(n=>e[n]).map(n=>a("span",{class:ot("preview"),attrs:{"data-role":n},text:e[n]}));return a("span",{class:ot("thumb"),attrs:{"aria-hidden":"true"}},o?.length?a("span",{class:ot("page")},...o):a("span",{class:ot("fallback")},B(t===Mt?"plus":"bloom")))}function Ug(t,e){let o=t===Mt?"New chat":w.store.titles[t]??Yo(t)??"Untitled chat",n=t===Mt?null:w.store.projects[t];return a("button",{class:ot("item"),attrs:{type:"button",role:"option","aria-selected":String(e===ht),"aria-label":n?`${o}, ${n}`:o},on:{click:()=>du(t),pointerenter:()=>e!==ht&&Ze(e)}},Ng(t),a("span",{class:ot("meta")},a("span",{class:`${ot("title")} bloom-truncate`,text:o}),n&&a("span",{class:ot("project")},B("folder"),a("span",{class:"bloom-truncate",text:n}))))}function mu(){ut.length?du(ut[ht]):$e()}function Ze(t){ut.length&&(ht=(t+ut.length)%ut.length,Xt?.querySelectorAll(`.${ot("item")}`).forEach((e,o)=>e.setAttribute("aria-selected",String(o===ht))))}function Fg(){lr(b());let t=cr();ut=Dg(),t&&(ut=[t,...ut.filter(o=>o!==t)].slice(0,Number(w.store.maxRecent))),ht=ut.length>1?1:0;let e=ut.length?a("div",{class:ot("list"),attrs:{role:"listbox","aria-label":"Recent chats"}},...ut.map(Ug)):a("div",{class:ot("empty"),text:"Open a few chats, then hold Ctrl+` to switch."});e.style.setProperty("--bloom-recent-count",String(ut.length)),Xt=a("div",{class:`bloom-root ${ot("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:o=>o.target===o.currentTarget&&$e()}},a("div",{class:ot("panel")},e)),wt(Xt)}function $e(){Xt?.remove(),Xt=null}var Kg=t=>Og.has(t.code)||Rg.has(t.key);function Gg(t){if(t.ctrlKey&&!t.altKey&&!t.metaKey&&Kg(t)){t.preventDefault(),t.stopPropagation(),Xt?Ze(ht+(t.shiftKey?-1:1)):Fg();return}if(!Xt)return;let o={Escape:$e,Enter:mu,ArrowRight:()=>Ze(ht+1),ArrowDown:()=>Ze(ht+1),ArrowLeft:()=>Ze(ht-1),ArrowUp:()=>Ze(ht-1)}[t.key];o&&(t.preventDefault(),t.stopPropagation(),o())}function Yg(t){Xt&&t.key==="Control"&&mu()}var pu=h({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:w,styles:iu,start(){ta=new AbortController;let{signal:t}=ta;addEventListener("keydown",Gg,{capture:!0,signal:t}),addEventListener("keyup",Yg,{capture:!0,signal:t}),addEventListener("blur",$e,{signal:t}),document.addEventListener("visibilitychange",()=>document.hidden&&lr(b()),{signal:t}),su=[vt(({prevId:i})=>{lr(i),cu(cr())}),St.on("conversation",({id:i})=>{w.store.visits.includes(i)&&uu(i),lr(i)}),St.on("conversation-missing",({id:i})=>Hg(i))];let{visits:e,titles:o,previews:n}=w.store,r=e.filter(i=>i!==Mt&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(w.store.visits=e.filter(i=>!r.includes(i))),cu(cr())},stop(){ta?.abort();for(let t of su)t();$e()}});var ea="data:audio/mpeg;base64,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";var fu=new x("ResponseNotification"),jg=.5,gu="BloomNoticeClaim",Qg=3e4,jo=y({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:t=>(t.append(F("Preview",Au)),()=>t.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),hu=null,oa=new Map,bu=[],na,Wg=t=>Uint8Array.from(atob(t.slice(t.indexOf(",")+1)),e=>e.charCodeAt(0)).buffer;function zg(t,e){let o=oa.get(e);return o||(o=(e.startsWith("data:")?Promise.resolve(Wg(e)):Jo(e)).then(n=>t.decodeAudioData(n)),o.catch(()=>oa.delete(e)),oa.set(e,o)),o}async function yu(t){hu??=new AudioContext;let e=hu;e.state==="suspended"&&e.resume();let o=e.createBufferSource(),n=e.createGain();o.buffer=await zg(e,t),n.gain.value=jg,o.connect(n).connect(e.destination),o.start()}function Au(){let t=jo.store.soundUrl.trim();yu(t||ea).catch(e=>{fu.warn("Sound failed",e),t&&yu(ea).catch(o=>fu.warn("Default chime failed",o))})}function Vg(t){let e=`${t??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:e,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:e,silent:!0});o.onclick=()=>{focus(),o.close()}}function Jg(t){let e=Vo(on(gu)??"");return t&&k(e)&&e.id===t&&Date.now()-Number(e.at)<Qg?!1:(nn(gu,{id:t,at:Date.now()}),!0)}function vu(t){jo.store.onlyWhenHidden&&!document.hidden||Jg(t)&&(jo.store.sound&&Au(),jo.store.browserNotification&&Vg(Yo(t)))}function Zg(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(na=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:na.signal}))}var wu=h({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply, including chats you left while they were answering.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:jo,start(){Zg(),bu=[D.on("fall",({conversationId:t,outcome:e})=>e==="done"&&vu(t)),D.on("background",({conversationId:t})=>vu(t))]},stop(){for(let t of bu)t();na?.abort()}});var $g=`:is(${c.sidebarScroll}, :has(> ${c.sidebarScroll})) + :has(${c.menuButton})`,Xg=`${c.rail} > :has(${c.menuButton})`,ia=`:is(${$g}, ${Xg}, ${c.oldProfile}):not(:hover)`,ra="[data-bloom-profile-avatar]",_g=`:is(${ia}, ${ia} :has(${ra})) > :not(${ra}, :has(${ra}))`,Su=y({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function th(){let{opacity:t,fadeAvatar:e}=Su.store;return t>=100?"":`${e?ia:_g}{opacity:${t/100}!important}`}var xu,qu=h({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Su,styles:th,start(){xu=xt()},stop(){xu?.()}});var Eu=`/*
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
`;var G=I("bloom-star-chats"),oh=80,nh=60,rh=1200,ih=120,Qo=y({replaceReadAloud:{type:"boolean",description:"Put the star where the reply's Read aloud button is, and hide that button.",default:!0},messages:{type:"custom",default:[]}}),ah=`:is(${c.turnActions}) ${c.readAloud}`,aa,sa=!1,_t=!1,Ae=!1,ur=0,X=null,dr="",R=null,la,te;function ua(){let t=Qo.store.messages;return Array.isArray(t)?t.filter(e=>k(e)&&typeof e.conversationId=="string"&&typeof e.messageId=="string"&&(e.role==="user"||e.role==="assistant")&&typeof e.snippet=="string"&&typeof e.starredAt=="number"):[]}function da(){let t=b();return t?ua().filter(e=>e.conversationId===t):[]}function sh(t,e){return ua().some(o=>o.conversationId===t&&o.messageId===e)}function Tu(t){let e=ua(),o=e.some(n=>n.conversationId===t.conversationId&&n.messageId===t.messageId);Qo.store.messages=o?e.filter(n=>!(n.conversationId===t.conversationId&&n.messageId===t.messageId)):[{...t,starredAt:Date.now()},...e].slice(0,oh)}function ca(t){return t.messageIds[0]||t.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||t.el.getAttribute("data-turn-key")||""}function lh(t){return bt(Re(t)||v(t.el.textContent??""),nh)}function ch(t){let e=t.closest(c.turn);if(!e)return null;let o=Jt().filter(n=>e.contains(n.el));return o.find(n=>n.el.contains(t)||n.el===e)??o.findLast(n=>n.el.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING)??null}function uh(){let t=[...document.querySelectorAll(c.turnActions)].filter(e=>!e.closest(`[data-bloom], [role="dialog"], [inert], pre, ${c.sidebars}`));return t.filter(e=>!t.some(o=>o!==e&&o.contains(e)))}function dh(t,e){let o=Qo.store.replaceReadAloud?e.querySelector(c.readAloud):null;if(o&&!o.closest("[data-bloom]")){t.nextElementSibling!==o&&o.before(t);return}let n=mh(e);(t.parentElement!==n||n.lastElementChild!==t)&&n.append(t)}function mh(t){let e=[...t.querySelectorAll("button")].filter(n=>n.dataset.bloom!=="message-star"&&!n.closest("[data-bloom]"));return e.length?[...t.children].find(n=>n instanceof HTMLElement&&n!==e[0]&&e.every(r=>n.contains(r)))??t:t}function ph(){return[...document.querySelectorAll(c.headerMore)].filter(e=>{if(e.dataset.bloom==="message-star"||e.closest("[data-bloom], [role='dialog'], [inert]")||e.closest(c.sidebars))return!1;let o=e.getBoundingClientRect();return o.width===0&&o.height===0?!!e.closest("header, #page-header"):o.top>=0&&o.top<96&&o.left>window.innerWidth*.5}).toSorted((e,o)=>o.getBoundingClientRect().left-e.getBoundingClientRect().left||(e.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1))[0]??null}function Mu(t,e,o){return a("button",{class:e,attrs:{type:"button","aria-label":t},on:{pointerdown:n=>n.stopPropagation(),mousedown:n=>n.stopPropagation(),click:n=>{n.preventDefault(),n.stopPropagation(),o(n)}}},B("star"))}function fh(t,e){t.setAttribute("aria-pressed",String(e)),t.setAttribute("aria-label",e?"Unstar":"Star")}function mr(){return _t||Ae}function Xe(){ur&&window.clearTimeout(ur),ur=0}function _e(){_t=!1,Ae=!1,Xe(),te?.enter(),X?.remove(),X=null,dr="",R?.classList.remove(G("-open")),R?.setAttribute("aria-expanded","false")}function pr(t){return t instanceof Node&&!!(R?.contains(t)||X?.contains(t))}function gh(t){t.classList.add(G("-flash")),window.setTimeout(()=>t.classList.remove(G("-flash")),rh)}function hh(t){let e=Jt().find(n=>ca(n)===t),o=e?.el.closest(c.turn)??e?.el;o&&(o.scrollIntoView({block:"start"}),gh(o))}function bh(){let t=b(),e=new Set,o=[...document.querySelectorAll('[data-bloom="message-star"][data-place="action"]')];if(!t||re()){for(let n of o)n.remove();return}for(let n of uh()){if(!At(n))continue;let r=ch(n),i=r?ca(r):"";if(!r||!i)continue;let s=n.querySelector('[data-place="action"]');(!s||s.dataset.id!==i)&&(s?.remove(),s=Mu("Star",G("-star"),()=>{let d=b(),l=Jt().find(u=>ca(u)===i);!d||!l||Tu({conversationId:d,messageId:i,role:l.role,snippet:lh(l)})}),s.dataset.bloom="message-star",s.dataset.place="action",s.dataset.id=i),fh(s,sh(t,i)),dh(s,n),e.add(s)}for(let n of o)e.has(n)||n.remove()}function yh(){if(!X||!R)return;let t=R.getBoundingClientRect(),e=X.offsetWidth||288,o=X.offsetHeight||120,n=t.bottom+6;n+o>window.innerHeight-8&&(n=Math.max(8,t.top-o-6));let r=Math.max(8,Math.min(t.right-e,window.innerWidth-e-8));X.dataset.place=n>=t.bottom?"below":"above",X.style.left=`${Math.round(r)}px`,X.style.top=`${Math.round(n)}px`}function vh(){if(!mr()||!R){X?.remove(),X=null,dr="",R?.classList.remove(G("-open")),R?.setAttribute("aria-expanded","false");return}let t=da(),e=t.map(o=>`${o.messageId}	${o.snippet}`).join(`
`);if(!X||dr!==e){X?.remove();let o=t.map(n=>a("div",{class:G("-row")},a("button",{class:G("-jump"),attrs:{type:"button"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),_e(),hh(n.messageId)}}},a("span",{class:G("-role"),text:n.role==="user"?"You":"ChatGPT"}),a("span",{class:G("-snip"),text:n.snippet||"Message"})),Mu("Unstar",G("-unstar"),()=>Tu(n))));X=a("div",{class:`bloom-root ${G("-panel")}`,attrs:{"data-bloom":"star-list"},on:{pointerenter:()=>{Xe(),te?.enter(),Ae=!0},pointerleave:n=>{pr(n.relatedTarget)||_t||te?.leave(n)}}},a("div",{class:G("-bridge"),attrs:{"aria-hidden":"true"}}),a("div",{class:G("-head"),text:"Starred"}),a("div",{class:G("-body")},...o.length?o:[a("div",{class:G("-empty"),text:"No starred messages in this chat"})])),document.body.append(X),dr=e}yh(),R.classList.add(G("-open")),R.setAttribute("aria-expanded","true")}function Ah(){for(let r of document.querySelectorAll('[data-bloom="starred"]'))r.remove();let t=ph(),e=t?.parentElement??null,o=b();if(!t||!e||e.closest(c.sidebars)||!o||re()||!At(e)){R?.remove(),R=null,_e();return}R||(R=a("button",{class:G("-toggle"),attrs:{type:"button","data-bloom":"message-star","data-place":"header","aria-label":"Starred messages","aria-expanded":"false"},on:{pointerdown:r=>r.stopPropagation(),pointerenter:()=>{Xe(),te?.enter(),ur=window.setTimeout(()=>{Ae=!0,ve()},ih)},pointerleave:r=>{pr(r.relatedTarget)||(Xe(),mr()&&te?.leave(r))},click:r=>{r.preventDefault(),r.stopPropagation(),_t=!_t,Ae=_t,Xe(),_t||_e(),ve()}}},B("star"))),(R.parentElement!==e||R.nextElementSibling!==t)&&t.before(R);let n=t.getBoundingClientRect();n.width>0&&(R.style.width=`${n.width}px`,R.style.height=`${n.height}px`),R.classList.toggle(G("-here"),da().length>0),vh()}function wh(){let t=new Set(da().map(e=>e.messageId));for(let e of document.querySelectorAll('[data-bloom="navigator"] .bloom-nav-tick, [data-bloom="navigator"] .bloom-nav-row'))e.classList.toggle(G("-mark"),!!e.dataset.messageId&&t.has(e.dataset.messageId))}function ve(){if(!sa){sa=!0;try{for(let t of document.querySelectorAll('[data-bloom="starred"], [data-bloom="chat-star"]'))t.remove();bh(),Ah(),wh()}finally{sa=!1}}}function xh(){_e(),R?.remove(),R=null;for(let t of document.querySelectorAll('[data-bloom="message-star"], [data-bloom="star-list"], [data-bloom="starred"], [data-bloom="chat-star"]'))t.remove();for(let t of document.querySelectorAll(`.${G("-mark")}`))t.classList.remove(G("-mark"))}var Cu=h({name:"StarChats",description:"Star a message from its toolbar. The star left of the top-right menu opens this chat's list.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:Qo,styles:()=>`${Eu}${Qo.store.replaceReadAloud?Ut([ah]):""}`,onSettingsChange(t){(t==="messages"||t==="replaceReadAloud")&&ve()},start(){for(let o of document.querySelectorAll('[data-bloom="star-list"]'))o.remove();te=Bn({over:pr,trigger:()=>R,panel:()=>X,setHeld(o){if(o){Ae=!0,ve();return}_t||(Ae=!1,ve())}}),aa=C(o=>Y(o)&&ve());let t=o=>{pr(o.target)||mr()&&_e()};document.addEventListener("pointerdown",t,!0);let e=o=>{o.key!=="Escape"||!mr()||(o.preventDefault(),_e())};document.addEventListener("keydown",e,!0),la=()=>{document.removeEventListener("pointerdown",t,!0),document.removeEventListener("keydown",e,!0)},ve()},stop(){aa?.(),aa=void 0,la?.(),la=void 0,Xe(),te?.dispose(),te=void 0,xh()}});var Lu="filter:blur(6px)!important;transition:filter 0.2s ease",m0=`:is(${c.sidebars})`,we="data-bloom-streamer-open",Sh="[data-app-action-sidebar-thread-row], [data-app-action-sidebar-project-row], .bloom-recent-item",ku=":not([data-app-action-sidebar-thread-row] *, [data-app-action-sidebar-project-row] *)";function qh(){return{conversations:{selectors:["[data-app-action-sidebar-thread-title]"],hover:!0,row:"[data-app-action-sidebar-thread-row]"},projects:{selectors:["[data-app-action-sidebar-project-label]"],hover:!0,row:"[data-app-action-sidebar-project-row]"},accountAvatar:{selectors:["[data-bloom-profile] img","[data-bloom-menu] img"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:[`[data-thread-title]${ku}`,`[data-thread-title-trigger]${ku}`],hover:!1}}}var Iu=y({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function Eh(t,e){let o=[`:is(${t}):hover`,`.bloom-recent-item:hover :is(${t})`,`:is(${t})[${we}]`];return e&&o.push(`${e}:hover`,`${e}:hover :is(${t})`,`${e}:is(${t}):hover`,`${e}[${we}]`,`${e}[${we}] :is(${t})`),o.join(",")}function Th(){let t=qh();return Object.entries(t).filter(([e])=>Iu.store[e]).map(([,e])=>{let o=e.selectors.join(",");if(!e.hover)return`:is(${o}){${Lu}}`;let n="row"in e?e.row:void 0;return`:is(${o}){${Lu}}${Eh(o,n)}{filter:none!important}`}).join(`
`)}function Mh(t,e){for(let o of document.elementsFromPoint(t,e))if(o instanceof Element){let n=o.closest(Sh);if(n)return n}return null}function fa(t){for(let e of document.querySelectorAll(`[${we}]`))e!==t&&e.removeAttribute(we);t&&!t.hasAttribute(we)&&t.setAttribute(we,"")}var to,Ch=Ft(()=>{to&&fa(Mh(to.clientX,to.clientY))});function ma(t){to=t,Ch()}function Lh(t){t.relatedTarget instanceof Node&&document.documentElement.contains(t.relatedTarget)||(to=void 0,fa(null))}var pa,fr,Bu=h({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:Iu,styles:Th,start(){pa=xt(),fr=new AbortController;let t={capture:!0,signal:fr.signal,passive:!0};document.addEventListener("pointerover",ma,t),document.addEventListener("pointermove",ma,t),document.addEventListener("pointerout",ma,t),window.addEventListener("pointerleave",Lh,t)},stop(){fr?.abort(),fr=void 0,to=void 0,fa(null),pa?.(),pa=void 0}});var ee=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)','[data-turn-key] [data-message-author-role="user"] blockquote:not(.twitter-tweet)','[class~="group/user-message"] blockquote:not(.twitter-tweet)'].join(","),ga=y({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function kh(){let t=[`${ee}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${ee}>*{margin-block:0!important}`];return ga.store.italic||t.push(`${ee}{font-style:inherit!important}`),ga.store.quotes||(t.push(`${ee}{quotes:none!important}`),t.push(`${ee}::before,${ee}::after,${ee} p::before,${ee} p::after{content:none!important}`)),t.join(`
`)}var Pu=h({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:ga,styles:kh});var Ih=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],Bh=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",Ph='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',Ou=y({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function Oh(){let t=`${Ou.store.width}rem`;return`:root,[data-app-action-timeline-scroll],[data-chatgpt-composer],[data-composer-input]{--thread-content-max-width:${t}!important;--composer-adjacent-max-width:${t}!important}`}var Ru=h({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:Ou,styles:Oh});var Rh=[ol,Ms,Nl,zl,Zl,_l,ec,cc,vc,Mc,Pc,Zc,Xc,_c,ru,pu,wu,qu,Cu,Bu,Pu,Ru],ha=Rh;var Hh=new x("Bloom"),Hu="2.0.108";var ba=0,gr,Wo="__bloomOnShortcut";function hr(t){if(t.isComposing||!t.shiftKey||!(t.metaKey||t.ctrlKey)||t.key!=="b"&&t.key!=="B")return;t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation();let e=Ns();Wt();for(let o of document.querySelectorAll("[data-bloom='settings']"))o.remove();e||Ie()}function Dh(){let t=mt;t[Wo]&&document.removeEventListener("keydown",t[Wo],!0),t[Wo]=hr,document.addEventListener("keydown",hr,!0)}function Nh(){ba++,document.removeEventListener("keydown",hr,!0);let t=mt;t[Wo]===hr&&delete t[Wo],gr?.(),gr=void 0,_a(),ro(),Xo()}async function ya(){let t=++ba,e=()=>t===ba;ro(),Xo();for(let o of ha)o.updatedAt=hs[o.name];Fa(ha),Ha(),Ga(),Zo("base",es),fs(),Dh(),dn("Init"),Or().then(()=>{e()&&(Ca(),dn("DOMContentLoaded"))}),await Rr(),e()&&(dn("HostReady"),gr?.(),gr=Ks(),Xa(),Hh.info(`Bloom++ ${Hu} app host ready`))}var Uh=new x("Boot");window===window.top&&(ka(mt.Bloom),Ia(va),ya().catch(t=>Uh.error("Startup failed",t)));})();
