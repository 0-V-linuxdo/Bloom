// ==UserScript==
// @name         Bloom++ (ChatGPT app)
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.99
// @description  Bloom++ host for the official ChatGPT macOS app. Injected over loopback CDP; not a web userscript.
// @author       0-V-linuxdo & Bloom contributors
// @homepageURL  https://github.com/0-V-linuxdo/Bloom
// @supportURL   https://github.com/0-V-linuxdo/Bloom/issues
// @match        app://*/*
// @run-at       document-start
// @grant        none
// @license      GPL-3.0-or-later
// ==/UserScript==

/* Bloom++ v2.0.99 ChatGPT app host. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var md=Object.defineProperty;var pd=(e,t)=>{for(var o in t)md(e,o,{get:t[o],enumerable:!0})};var x=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var te=(e,t,o)=>Math.min(o,Math.max(t,e)),C=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Jt=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,pe=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,y=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function ra(e,t){return`${e} ${t}${e===1?"":"s"}`}async function No(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function Uo(e){try{return JSON.parse(e)}catch{return}}var se=typeof unsafeWindow>"u"?window:unsafeWindow,fd=200,gd=300;function Fo(e){return new Promise((t,o)=>GM_xmlhttpRequest({url:e,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=fd&&n<gd?t(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var hd=new x("Styles"),Pe=new Map,Zt=new Set,_e=new Map,or=!0,ia=e=>e.replaceAll(/[^A-Za-z0-9_-]/g,"_"),bd=e=>`:where(:root){--bloom-sheet-${ia(e)}:1}`,yd=(e,t)=>`${bd(e)}${t}`,aa=e=>`bloom-style-${e}`;function sa(e){try{return[...e.cssRules].map(t=>t.cssText).join(`
`)}catch{return""}}function vd(e,t){let o=sa(e);return o?o.includes(`--bloom-sheet-${ia(t)}`)?!0:t==="plugin-StreamerMode"?o.includes("blur(6px)")&&(o.includes("data-app-action-sidebar-thread-title")||o.includes("data-bloom-streamer-open")):t==="plugin-WiderChat"?o.includes("--composer-adjacent-max-width")&&o.includes("--thread-content-max-width"):t==="plugin-ComposerOpacity"?o.includes("--composer-layout-surface-backdrop-filter")||o.includes("--composer-layout-surface-background")&&o.includes("color-mix"):!1:!1}function la(e){let t=sa(e);return t?!!(t.includes("--bloom-")||t.includes(".bloom-")||t.includes("[data-bloom")||t.includes("--bloom-sheet-")||t.includes("blur(6px)")&&t.includes("data-app-action-sidebar-thread-title")||t.includes("--composer-adjacent-max-width")&&t.includes("--thread-content-max-width")||t.includes("--composer-layout-surface-backdrop-filter")):!1}function ca(){let e=document.adoptedStyleSheets.filter(t=>!Zt.has(t)&&!la(t));document.adoptedStyleSheets=[...e,...Pe.values()]}function da(e){document.readyState==="loading"||e.parentNode===document.head||document.head.append(e)}function Ad(e,t){let o=_e.get(e);o||(o=document.createElement("style"),o.id=aa(e),_e.set(e,o)),o.textContent!==t&&(o.textContent=t),da(o)}function Ko(e,t){let o=yd(e,t);if(or)try{let n=Pe.get(e);n||(n=new se.CSSStyleSheet,Pe.set(e,n),Zt.add(n)),n.replaceSync(o),ca();return}catch(n){hd.warn("Constructed style sheets unavailable, using <style> after parsing",n),or=!1;let r=Pe.get(e);r&&Zt.delete(r),Pe.delete(e)}Ad(e,o)}function Xt(e){let t=Pe.get(e);t&&(Zt.delete(t),Pe.delete(e)),_e.get(e)?.remove(),_e.delete(e);for(let o of document.querySelectorAll(`style[id="${aa(e)}"]`))o.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(o=>o!==t&&!vd(o,e)),or&&ca()}catch{}}function $t(){Pe.clear(),Zt.clear();for(let e of _e.values())e.remove();_e.clear();for(let e of document.querySelectorAll("style[id^='bloom-style-']"))e.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(e=>!la(e))}catch{}}function ua(){for(let e of _e.values())da(e)}var L=e=>(...t)=>t.map(o=>e+o).join(" "),Go=(...e)=>e.filter(Boolean).join(" "),Oe=e=>e.length?`${e.map(t=>`${t}:not([data-bloom])`).join(",")}{display:none!important}`:"";var ma="__bloomHost",nr=new x("Boot"),wd=['[data-bloom="navigator"]','[data-bloom="settings"]','[data-bloom="history-hud"]','[data-bloom="history-dialog"]','[data-bloom="star-list"]','[data-bloom="entry"]','[data-bloom="menu-entry"]','[data-bloom="menu-flyout"]','[data-bloom="message-star"]','[data-bloom="starred"]','[data-bloom="chat-star"]','[data-bloom="queue"]','[data-bloom="recent"]','[data-bloom="quote-chip"]','[data-bloom="quote-back"]','[data-bloom="cls"]','[data-bloom="timestamp"]','[data-bloom="tooltip"]','[data-bloom="notices"]'].join(", "),xd=["data-bloom-greeting","data-bloom-placeholder","data-bloom-streamer-open","data-bloom-share","data-bloom-invite","data-bloom-csi-avatar","data-bloom-csi-sized"];function Yo(){if(!(typeof document>"u"||!document.documentElement)){for(let e of document.querySelectorAll(wd))e.remove();for(let e of xd)for(let t of document.querySelectorAll(`[${e}]`))t.removeAttribute(e);for(let e of document.querySelectorAll("[data-bloom-text]"))e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size"),e.style.removeProperty("--bloom-text")}}function Sd(e){if(nr.warn("Replacing another Bloom++ instance",e.VERSION),e.destroy){e.destroy();return}for(let t of e.plugins?.values()??[]){try{t.stop?.()}catch(o){nr.error("Failed to stop previous plugin",o)}t.styles="",t.start=void 0}$t()}function pa(e){let t=se,o=new Set;for(let n of[e,t.Bloom,t[ma]])if(!(!n||o.has(n))){o.add(n);try{Sd(n)}catch(r){nr.error("Failed to retire Bloom++",r)}}Yo()}function fa(e){let t=se;try{delete t.Bloom}catch{}Object.defineProperty(t,"Bloom",{value:e,configurable:!0,writable:!0}),Object.defineProperty(t,ma,{value:e,configurable:!0,writable:!0})}var na={};pd(na,{VERSION:()=>ud,destroy:()=>sh,init:()=>oa,plugins:()=>W});var qd=new x("Dom");function s(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var ga=document.createElement("template");function ha(e){return ga.innerHTML=e.trim(),ga.content.firstElementChild.cloneNode(!0)}var fe=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),ge=(e,t=document)=>[...t.querySelectorAll(e)].find(fe)??null,Ed=16,Td="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function ba(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([Td],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function rr(e){document.hidden?setTimeout(e,Ed):requestAnimationFrame(e)}function Re(e){let t=!1;return()=>{t||(t=!0,rr(()=>{t=!1;try{e()}catch(o){qd.error("Scheduled task failed",o)}}))}}var jo=new Set,Qo=[],_t,Md=Re(()=>{let e=Qo;Qo=[];for(let t of jo)t(e)});function M(e){return jo.add(e),_t||(_t=new MutationObserver(t=>{Qo.push(...t),Md()}),_t.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{jo.delete(e),!jo.size&&(_t?.disconnect(),_t=void 0,Qo=[])}}var Cd=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),U=e=>!e.length||e.some(t=>!Cd(t.target)),Ld=e=>`"${e.replaceAll("\\","\\\\").replaceAll('"','\\"').replaceAll(`
`,"\\A ")}"`;function et(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size"),e.style.removeProperty("--bloom-text");return}e.style.setProperty("--bloom-text",Ld(t)),e.getAttribute("data-bloom-text")!==t&&e.setAttribute("data-bloom-text",t)}function h(e){return e}var kd=new x("Storage");function Wo(e){try{return localStorage.getItem(e)??void 0}catch{return}}function zo(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(o){kd.warn("localStorage write failed",o)}}function ya(e,t){addEventListener("storage",o=>{o.key===e&&t(o.newValue)})}var ir="BloomSettings",Bd=100,He={plugins:{}},Vo=new Set,ar=new Set,vt;function va(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=Uo(t);return!C(t)||!C(t.plugins)||!Object.keys(t.plugins).length?null:t}function Aa(){let e=va(Wo(ir));e&&(He.plugins=e.plugins)}var wa=(e,t)=>`${e}
${t}`;function sr(){vt=void 0,ar.clear(),zo(ir,He)}function Id(e){let t=va(e);if(!t)return;let o=[];for(let n of new Set([...Object.keys(He.plugins),...Object.keys(t.plugins)])){let r=He.plugins[n]??={},i=C(t.plugins[n])?t.plugins[n]:{};for(let a of new Set([...Object.keys(r),...Object.keys(i)]))ar.has(wa(n,a))||JSON.stringify(r[a])===JSON.stringify(i[a])||(i[a]===void 0?delete r[a]:r[a]=i[a],o.push([n,a]))}for(let[n,r]of o)for(let i of Vo)i(n,r)}function lr(){vt&&(clearTimeout(vt),sr())}function xa(e){let t=Object.keys(He.plugins).filter(o=>!e.has(o));if(!t.length)return t;for(let o of t)delete He.plugins[o];return clearTimeout(vt),sr(),t}var le=(e,t)=>He.plugins[e]?.[t];function De(e,t,o){let n=He.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,ar.add(wa(e,t)),clearTimeout(vt),vt=setTimeout(sr,Bd);for(let r of Vo)r(e,t)}function At(e){return Vo.add(e),()=>void Vo.delete(e)}function cr(e){return e.type==="component"?void 0:e.default}function b(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>le(t.pluginName,n)??(e[n]&&cr(e[n])),set:(o,n,r)=>(De(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&le(t.pluginName,o)!==void 0&&De(t.pluginName,o)}};return t}var Sa=e=>{let t=()=>{let o=le("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();De("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},Jo=Sa("pinnedPlugins"),Zo=Sa("starredPlugins");addEventListener("pagehide",lr);ya(ir,Id);var oo=new x("PluginManager"),W=new Map,Ne=new Set,$o=new Set,dr=new Set,eo=new Map,Pd=2880*60*1e3;function qa(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),W.set(t.name,t)}var Ea=()=>{let e=le("Settings","knownPlugins");return C(e)?e:null};function Ta(){let e=xa(new Set(W.keys()));e.length&&oo.info(`Dropped settings of removed plugins: ${e.join(", ")}`);let t=Ea(),o=Date.now(),n={...t},r=[...W.values()].filter(i=>!i.hidden&&!i.required&&!(i.name in n));for(let i of r)n[i.name]=t?o:0;for(let i of Object.keys(n))W.has(i)||delete n[i];JSON.stringify(n)!==JSON.stringify(t)&&De("Settings","knownPlugins",n)}var Ma=e=>{let t=Ea()?.[e];return!!t&&Date.now()-t<Pd},Ca=e=>eo.get(e);function La(){for(let e of dr)e()}function ur(e,t){let o=eo.get(e);(t?o?.join(`
`)===t.join(`
`):!o)||(t?eo.set(e,t):eo.delete(e),La())}var Ee=e=>!!e.required||(le(e.name,"enabled")??!!e.enabledByDefault),mr=e=>Ne.has(e),to=e=>`plugin-${e.name}`;function ka(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?Ko(to(e),t):Xt(to(e))}function Ba(e){if(!Ne.has(e.name))try{ka(e),e.start?.(),Ne.add(e.name)}catch(t){Xt(to(e)),oo.error(`Failed to start ${e.name}`,t)}}function _o(e){Ne.delete(e.name),Xt(to(e));try{e.stop?.()}catch(t){oo.error(`Failed to stop ${e.name}`,t)}}var pr=e=>e.startAt??"HostReady";function Ia(e){if(Ee(e)){$o.has(pr(e))&&Ba(e);return}_o(e)}function en(e){$o.add(e);for(let t of W.values())pr(t)===e&&Ia(t);oo.info(`${e}: ${[...Ne].join(", ")}`)}function Pa(e){_o(e)}function Oa(e){Ee(e)&&$o.has(pr(e))&&Ba(e)}function Ra(e,t){De(e.name,"enabled",t),lr()}function Od(){for(let e of W.values())e.required||Ee(e)||(Ne.has(e.name)?_o(e):Xt(to(e)))}var Xo;function Ha(){Xo?.(),Xo=M(()=>Od())}function Da(){Xo?.(),Xo=void 0;for(let e of W.values())_o(e);Ne.clear(),$o.clear(),eo.clear()}function Na(e){return dr.add(e),()=>void dr.delete(e)}At((e,t)=>{let o=W.get(e);if(o){if(t==="enabled"){typeof le(e,"enabled")=="boolean"&&Ia(o),La();return}if(Ne.has(e))try{ka(o),o.onSettingsChange?.(t)}catch(n){oo.error(`Settings change failed for ${e}`,n)}}});var Ua=`/*
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
`;var Hd=new x("Events");function wt(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){Hd.error(`Listener for ${String(t)} failed`,r)}}}}function Fa(e,t){let o=e instanceof Element?[e,...e.querySelectorAll("*")]:[...e.querySelectorAll("*")];for(let n of o){let r=n.shadowRoot;r&&(t(r),Fa(r,t))}}function Ue(e,t=document){let o=[...t.querySelectorAll(e)];return Fa(t,n=>o.push(...n.querySelectorAll(e))),o}var ce=(e,t=document)=>Ue(e,t).find(fe)??null;var c={rail:"[data-app-navigation-rail]",sidebarScroll:"[data-app-action-sidebar-scroll]",sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"[data-app-action-sidebar-scroll]",oldRail:"[data-app-navigation-rail]",oldProfile:'button[aria-label="Open profile menu" i]',threadRow:"[data-app-action-sidebar-thread-row]",threadSelected:"[data-app-action-sidebar-thread-row][data-app-action-sidebar-thread-selected='true']",threadTitle:"[data-app-action-sidebar-thread-title]",projectRow:"[data-app-action-sidebar-project-row]",projectLabel:"[data-app-action-sidebar-project-label]",destination:"[data-sidebar-destination]",conversationLink:"[data-app-action-sidebar-thread-row]",timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:"[data-turn-key]",turn:"[data-turn-key]",messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",userBubble:'[class~="group/user-message"]',assistantReply:"[data-response-annotation-target]",oldThread:"[data-app-action-timeline-scroll]",turnActions:'.turn-action-controls, [class*="turn-action-controls"]',readAloud:'button:is([aria-label="Read aloud" i], [aria-label^="Read aloud" i], [aria-label="Stop reading" i], [aria-label^="Stop reading" i], [aria-label="\u6717\u8BFB"], [aria-label^="\u6717\u8BFB"], [aria-label="\u505C\u6B62\u6717\u8BFB"], [data-testid*="read-aloud" i])',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery, [class*='recovery']",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composer:"[data-chatgpt-composer], [data-composer-input]",composerInput:'[data-composer-input] [contenteditable="true"].ProseMirror, [contenteditable="true"].ProseMirror',composerConversation:"[data-above-composer-conversation-id]",oldComposerForm:"[data-chatgpt-composer]",sendButton:'button[aria-label="Send" i], button[aria-label="Send prompt" i], button[aria-label="Send message" i]',stopButton:'button[aria-label="Stop" i], button[aria-label^="Stop " i], button[aria-label="\u505C\u6B62" i], button[aria-label^="\u505C\u6B62"]',composerFooter:"[data-chatgpt-composer]",modelTrigger:'button[aria-label="Model selector" i], button[aria-label="Select ChatGPT model" i], [data-chatgpt-composer] button[aria-haspopup="menu"]',modelItem:'[role="menu"] [role="menuitemradio"], [role="menu"] [role="menuitem"]',effortSlider:'[role="menu"] [data-reasoning-slider]',homeHeading:'main h1:not([aria-hidden="true"]), [role="main"] h1:not([aria-hidden="true"]), [data-testid="home-heading"], [data-homepage-takeover] h1, .heading-xl, [class~="heading-xl"]',headerMore:'button[aria-label="More" i], button[aria-label="\u66F4\u591A"]',headerTitle:"[data-thread-title], [data-thread-title-trigger]",profile:'button[aria-label="Open profile menu" i]',rightPanel:"aside[data-app-shell-focus-area='right-panel']",summaryPanel:"[data-summary-panel-variant]"};var Ka=/[​-‍﻿]/g,de=()=>ce(c.composerInput),no=e=>e instanceof HTMLElement&&e.matches(c.composerInput),ne=(e=de())=>e?.closest("form")??e?.closest(c.composer)??ce(c.composer);function Q(e=de()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(Ka,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(Ka,"").trim()}var Dd=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function Ga(e,t){let o=t?"insertText":"deleteContentBackward";e.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:o,data:t||null})),e.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:o,data:t||null}))}function Te(e,t=de()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return Dd?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),typeof document.execCommand=="function"?e?document.execCommand("insertText",!1,e):document.execCommand("delete"):Ga(t,e),Q(t)!==e.trim()&&Ga(t,e),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function Ya(e,t){let o=e;for(;o&&o!==t;){if(o instanceof HTMLElement&&o.parentElement===t)return o;o=o.parentNode}return null}function ja(e,t,o){let n=document.createRange();return n.selectNodeContents(e),o?n.setEnd(t.startContainer,t.startOffset):n.setStart(t.endContainer,t.endOffset),n.toString().includes(`
`)?!0:!!n.cloneContents().querySelector("br")}function Qa(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:g,selectionEnd:T,value:f}=e;return{first:!f.slice(0,g).includes(`
`),last:!f.slice(T).includes(`
`)}}let t=getSelection();if(!t?.rangeCount||!e.contains(t.anchorNode))return{first:!0,last:!0};let o=t.getRangeAt(0),n=[...e.children].filter(g=>g instanceof HTMLElement),r=Ya(o.startContainer,e),i=Ya(o.endContainer,e),a=!r||r===n[0],u=!i||i===n[n.length-1],l=o.getBoundingClientRect(),d=(r??e).getBoundingClientRect(),m=Number.parseFloat(getComputedStyle(r??e).lineHeight)||24;return l.height?{first:a&&l.top-d.top<m,last:u&&d.bottom-l.bottom<m}:{first:a&&!ja(r??e,o,!0),last:u&&!ja(i??e,o,!1)}}var Wa=e=>{let t=ne();return(t&&ce(e,t))??ce(e)},fr=()=>Wa(c.stopButton),Nd=()=>{let e=Wa(c.sendButton);return e&&!e.matches(c.stopButton)?e:null};function za(){let e=Nd();if(e){e.disabled||e.click();return}de()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var Va=()=>fe(fr());var tn=new x("AppProtocol"),ro=wt();function Ud(e){let t=e;if(typeof t=="string")try{t=JSON.parse(t)}catch{return null}if(Array.isArray(t)||!t||typeof t!="object")return null;let o=t,n=o.notification&&typeof o.notification=="object"?o.notification:o;if(typeof n.method!="string")return null;let r=n.params&&typeof n.params=="object"?n.params:void 0;return{method:n.method,params:r}}function io(e){if(Array.isArray(e)){for(let o of e)io(o);return}let t=Ud(e);t&&ro.emit("note",t)}var hr=new WeakMap,gr=new WeakMap;function Fd(e,t){let o=hr.get(e);if(o)return o;let n=r=>{io(r.data),typeof e=="function"?e.call(t,r):e.handleEvent(r)};return hr.set(e,n),n}function Kd(){let e=MessagePort.prototype,t=e.addEventListener,o=e.removeEventListener;e.addEventListener=function(r,i,a){return r!=="message"?t.call(this,r,i,a):t.call(this,r,Fd(i,this),a)},e.removeEventListener=function(r,i,a){return r!=="message"?o.call(this,r,i,a):o.call(this,r,hr.get(i)??i,a)};let n=Object.getOwnPropertyDescriptor(e,"onmessage");n?.set&&Object.defineProperty(e,"onmessage",{configurable:!0,enumerable:n.enumerable,get(){return gr.has(this)?gr.get(this):n.get?.call(this)},set(r){gr.set(this,r),n.set.call(this,function(a){io(a.data),r?.call(this,a)})}})}function Gd(){let e=window.electronBridge,t=e?.subscribeToWorkerMessages;if(!(!e||typeof t!="function"))try{e.subscribeToWorkerMessages=(o,n)=>t.call(e,o,r=>{io(r),n(r)})}catch(o){tn.warn("electronBridge.subscribeToWorkerMessages is not writable",o)}}function Yd(){addEventListener("message",e=>io(e.data));try{Kd()}catch(e){tn.warn("MessagePort wrap failed",e)}try{Gd()}catch(e){tn.warn("electronBridge wrap failed",e)}tn.info("Listening for app-server notifications")}Yd();var jd=new x("AppRoute"),Qd=500,nn=new Set,rn=null,on;function v(){return(ce(c.threadSelected)??Ue(c.threadSelected)[0])?.getAttribute("data-app-action-sidebar-thread-id")??null}var an=()=>!v(),Za=()=>!1,tt=()=>!1;function Ja(){let e=v();if(e===rn)return;let{href:t}=location,o={prevHref:t,href:t,prevId:rn,id:e};rn=e;for(let n of nn)try{n(o)}catch(r){jd.error("Route listener failed",r)}}function Wd(){let e=new MutationObserver(Ja);(()=>{document.body&&e.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-app-action-sidebar-thread-selected","data-app-action-sidebar-thread-id"]})})();let o=setInterval(Ja,Qd);return()=>{e.disconnect(),clearInterval(o)}}function he(e){return nn.add(e),on||(rn=v(),on=Wd()),()=>{nn.delete(e),!nn.size&&(on?.(),on=void 0)}}var zd=250,Vd=400,O=wt(),ot=!1,xt=null,it=!1,nt="done",rt=!1,Xa=!1,X=()=>({generating:ot,conversationId:v()}),Jd=e=>{if(!e)return!0;let t=v();return t?t===e||t.endsWith(e)||e.endsWith(t.replace(/^local:/,"")):!0};function Zd(e){return e==="interrupted"||e==="aborted"||e==="cancelled"?"stopped":e==="failed"||e==="error"?"error":"done"}function Xd(){return rt||Va()}function $d(e){xt=null,ot=!1,rt=!1,O.emit("fall",{conversationId:v(),outcome:e}),it=!1,nt="done"}function _d(){let e=Xd();e&&!ot&&(ot=!0,it=!1,nt="done",O.emit("rise",{conversationId:v()})),e||!ot?xt=null:xt==null?xt=Date.now():Date.now()-xt>=Vd&&$d(it?"stopped":nt)}function ao(){_d(),O.emit("tick",X())}function eu({prevId:e,id:t}){e!==t&&(ot&&(rt=!1,xt=null,ot=!1,it=!1,nt="done",O.emit("fall",{conversationId:e,outcome:"left"})),O.emit("context",{prevId:e,id:t,migrated:!e&&!!t}),ao())}function tu(e){if(Jd(e.params?.threadId)){if(e.method==="turn/started"){rt=!0,ao();return}if(e.method==="turn/interrupt"){rt=!1,nt="stopped",it=!0,ao();return}e.method==="turn/completed"&&(rt=!1,nt=Zd(e.params?.turn?.status),nt==="stopped"&&(it=!0),ao())}}function ou(e){e.target instanceof Element&&e.target.closest(c.stopButton)&&(it=!0,rt=!1)}function $a(){Xa||(Xa=!0,ro.on("note",tu),he(eu),document.addEventListener("click",ou,!0),ba(ao,zd))}var nu="__reactContainer$",_a="__reactFiber$";function yr(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var br=(e,t)=>Object.keys(e.wrappedJSObject??e).some(o=>o.startsWith(t)),be=e=>!br(document,nu)||br(e,_a);function Fe(){return document.body?Promise.resolve():new Promise(e=>{let t=new MutationObserver(()=>{document.body&&(t.disconnect(),e())});t.observe(document,{childList:!0,subtree:!0})})}async function vr(){await Fe();let e=Date.now()+8e3;for(;!br(document.body,_a)&&Date.now()<e;)await new Promise(t=>setTimeout(t,100))}var es={BetterNavigator:1793350808e3,BetterQuotes:179333264e4,ChatListStatus:1793351872e3,ChatStateFavicons:1790623094e3,Cleaner:1793267811e3,CompleteToast:1793354069e3,ComposerOpacity:1793344667e3,Continue:1790939902e3,CustomSidebarIdentity:1790658669e3,GreetingCustomizer:1793350808e3,InputHistory:1793351708e3,MessageTimestamps:1791080494e3,NoDictation:1793335268e3,NoShareLink:1790658669e3,NoSidebarIdentity:1790616549e3,PromptQueue:1793267321e3,RecentTopics:1793354069e3,ResponseNotification:1793354069e3,Settings:1793364973e3,SidebarIdentityOpacity:1790682605e3,StarChats:1793350808e3,StreamerMode:1793344667e3,TemporaryChat:1792014624e3,UserQuotes:1793345744e3,WiderChat:179333264e4};var S=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,ru="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",iu={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${ru}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:S('<path d="M18 6 6 18M6 6l12 12"/>'),gear:S('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:S('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:S('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:S('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:S('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:S('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:S('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:S('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:S('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:S('<path d="m6 9 6 6 6-6"/>'),play:S('<path d="M7 4v16l13-8z"/>'),plus:S('<path d="M12 5v14M5 12h14"/>'),check:S('<path d="m5 12 5 5 9-10"/>'),alert:S('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:S('<path d="M4 5h16v11H9l-5 4z"/>'),layout:S('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:S('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:S('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:S('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:S('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:S('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:S('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:S('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:S('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:S('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:S('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:S('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:S('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:S('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:S('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:S('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),folder:S('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),ghost:S('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},k=e=>ha(iu[e]);function Ar(e){if(typeof e.showPopover=="function"){e.setAttribute("popover","manual");try{e.showPopover()}catch{e.matches(":popover-open")||e.removeAttribute("popover")}}}function ye(e,t=document.body){t.append(e),Ar(e)}var ue="data-bloom-tip",wr=6,xr=8,at,ts=null;function St(e){if(e===ts)return;if(ts=e,!e){at?.remove();return}at??=s("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),at.textContent=e.getAttribute(ue),ye(at);let t=e.getBoundingClientRect(),{width:o,height:n}=at.getBoundingClientRect(),r=t.bottom+wr+n<=innerHeight-xr;at.style.left=`${te(t.left+t.width/2-o/2,xr,innerWidth-o-xr)}px`,at.style.top=`${r?t.bottom+wr:t.top-wr-n}px`}var os=e=>e instanceof Element?e.closest(`[${ue}]`):null;function ns(){let e=new AbortController,t={passive:!0,signal:e.signal};return document.addEventListener("pointerover",o=>St(os(o.target)),t),document.addEventListener("pointerout",o=>o.relatedTarget||St(null),t),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&St(os(o.target)),t),document.addEventListener("focusout",()=>St(null),t),document.addEventListener("pointerdown",()=>St(null),t),()=>{e.abort(),St(null)}}function Ke(e,t,o,n=!1){let r=s("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let a=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(a)),t(a)===!1&&r.setAttribute("aria-checked",String(!a))}),r}function H(e,t,o){return s("button",{class:Go("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button","data-bloom":"control"},on:{click:t}})}function Y(e,t,o,n){let r=s("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":t,"data-bloom":"control",[ue]:t},on:{click:o}},k(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function sn(e,t,o,n,r,i){let a=s("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});a.value=String(e);let u=s("output",{text:`${a.value}${r}`});return a.addEventListener("input",()=>{u.textContent=`${a.value}${r}`,i(Number(a.value))}),s("div",{class:"bloom-slider"},a,u)}function Sr(e,t,o){let n=s("select",{class:"bloom-select"},...t.map(r=>s("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function so(e,t,o="",n="text"){let r=s("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var qr=["showSidebarEntry","showSidebarEntryOnHover","showAccountMenuEntry"],qt={showSidebarEntry:!0,showSidebarEntryOnHover:!1,showAccountMenuEntry:!1},Er=e=>Object.hasOwn(qt,e),Tr=e=>le("Settings",e)??qt[e],rs=(e,t)=>!Er(e)||t!==!1||qr.some(o=>o!==e&&Tr(o));var au=new x("Themes"),su=/^https:\/\/\S+\.css(?:[?#]|$)/i,lu=/\/\*\*[^]*?@name[ \t]+([^\n*]+)/,F=b({themes:{type:"custom",default:[]},quickCss:{type:"custom",default:""},quickCssEnabled:{type:"custom",default:!0}});async function is(e){let t=new TextDecoder().decode(await Fo(e));if(!t.trim())throw new Error("Theme file is empty.");return t}var ln=(e,t)=>{F.store.themes=F.store.themes.map(o=>o.id===e?{...o,...t}:o)},as=e=>{F.store.themes=F.store.themes.filter(t=>t.id!==e)};async function ss(e){if(!su.test(e))throw new Error("Enter an https URL that ends in .css.");if(F.store.themes.some(n=>n.url===e))throw new Error("This theme is already added.");let t=await is(e),o=t.match(lu)?.[1]?.trim()||decodeURIComponent(new URL(e).pathname.split("/").pop()??e).replace(/\.css$/i,"").replaceAll(/[-_]/g," ");F.store.themes=[...F.store.themes,{id:Jt("theme"),name:o,url:e,css:t,enabled:!0}]}function ls(e,t,o){if(!t.trim())throw new Error("Name is required.");if(!o.trim())throw new Error("CSS is required.");e?ln(e,{name:t.trim(),css:o}):F.store.themes=[...F.store.themes,{id:Jt("theme"),name:t.trim(),css:o,enabled:!0}]}async function cu(){await Promise.all(F.store.themes.filter(e=>e.url&&e.enabled).map(async({id:e,url:t,name:o})=>{try{let n=await is(t??"");F.store.themes.find(r=>r.id===e)?.css!==n&&ln(e,{css:n})}catch(n){au.warn(`Failed to refresh theme "${o}"`,n)}}))}var cs=h({name:"Themes",description:"Applies Bloom++ themes and Quick CSS.",authors:["Bloom contributors"],tags:[],icon:"spark",required:!0,hidden:!0,startAt:"Init",settings:F,styles:()=>[...F.store.themes.filter(e=>e.enabled).map(e=>e.css),F.store.quickCssEnabled?F.store.quickCss:""].join(`
`),start(){cu()}});var K=L("bloom-settings-"),du=3e3,ds=(e,t)=>{let o=s("textarea",{class:`bloom-input ${K("css")}`,attrs:{spellcheck:"false",placeholder:"Paste your CSS here...","aria-label":t}});return o.value=e,o},Mr=(e,t)=>s("div",{class:K("section-header")},s("div",{class:K("field-label"),text:e}),s("div",{class:K("field-desc"),text:t}));function us(){let{quickCss:e,quickCssEnabled:t}=F.store,o=ds(e,"Quick CSS");return o.disabled=!t,o.addEventListener("input",()=>{F.store.quickCss=o.value}),s("div",{class:K("section")},s("div",{class:K("field","field-inline")},Mr("Quick CSS","Your own CSS, applied on every page as you type."),Ke(t,n=>{F.store.quickCssEnabled=n,o.disabled=!n},"Enable Quick CSS")),o)}function ms(){let e=s("div",{class:K("section")}),t=null,o=()=>s("div",{class:K("section-error"),attrs:{role:"alert"}});function n(){let l=s("input",{class:"bloom-input",attrs:{type:"url",placeholder:"https://raw.githubusercontent.com/...","aria-label":"Theme URL"}}),d=o(),m=H("Add",async()=>{m.disabled=!0,d.textContent="";try{await ss(l.value.trim()),u()}catch(g){d.textContent=g instanceof Error?g.message:String(g),m.disabled=!1}});return s("div",{class:K("section-block")},Mr("Online themes","Load a theme from a .css URL. It is fetched again on every page load, so updates apply."),s("div",{class:K("section-row")},l,m),d)}function r(){let l=t==="new"?null:t,d=s("input",{class:"bloom-input",attrs:{placeholder:"My theme","aria-label":"Theme name"}});d.value=l?.name??"";let m=ds(l?.css??"","Theme CSS"),g=o();return s("div",{class:K("section-block")},d,m,g,s("div",{class:K("section-row")},H("Save",()=>{try{ls(l?.id??null,d.value,m.value),t=null,u()}catch(T){g.textContent=T instanceof Error?T.message:String(T)}}),H("Cancel",()=>{t=null,u()})))}function i(){return s("div",{class:K("section-block")},s("div",{class:K("field","field-inline")},Mr("Local themes","CSS stored only on this device."),!t&&H("New local theme",()=>{t="new",u()})),t&&r())}function a(l){let d,m=Y("trash","Remove",()=>{if(d){clearTimeout(d),as(l.id),u();return}m.setAttribute("aria-pressed","true"),m.setAttribute(ue,"Click again to remove"),d=setTimeout(()=>{d=void 0,m.removeAttribute("aria-pressed"),m.setAttribute(ue,"Remove")},du)});return s("div",{class:K("theme")},s("div",{class:K("theme-text")},s("div",{class:`${K("card-name")} bloom-truncate`,text:l.name}),s("div",{class:`${K("field-desc")} bloom-truncate`,text:l.url??"Local"})),l.url?Y("copy","Copy URL",()=>void No(l.url??"")):Y("edit","Edit",()=>{t=l,u()}),m,Ke(l.enabled,g=>ln(l.id,{enabled:g}),`Enable ${l.name}`))}function u(){let{themes:l}=F.store;e.replaceChildren(n(),i(),l.length?s("div",{class:K("themes")},...l.map(a)):s("div",{class:K("empty"),text:"No themes yet."}))}return u(),e}var uu=new x("SettingsPanel"),p=L("bloom-settings-"),mu=10080*60*1e3,pu=3e3,ps="Toggle features. Some need a reload. Click the sliders icon to configure.",fu="Paused: can't find its place on this page.",gu=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],hu=[{id:"plugins",label:"Plugins"},{id:"themes",label:"Themes"},{id:"css",label:"Quick CSS"}],bu=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],yu={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},gs=new Set(["chat","ui","privacy"]),G=null,lo="plugins",lt="all",Cr="all",cn="",Lr=[],hs=()=>[...W.values()].filter(e=>!e.hidden),vu=e=>!!e.updatedAt&&Date.now()-e.updatedAt<mu;function Au(e){switch(lt){case"favorites":return Zo.has(e.name);case"recent":return vu(e);case"all":return!0;case"other":return!e.tags.some(t=>gs.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(lt)}}function wu(e){switch(Cr){case"all":return!0;case"enabled":return Ee(e);case"disabled":return!Ee(e)}}function xu(e){let t=cn.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function Su(e){let t=Jo.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return lt==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var bs=e=>e.settings?.def??{},Ir=e=>Object.values(bs(e)).some(t=>t.type!=="custom");function qu(e,t,o){let n=le(e.name,t)??cr(o),r=i=>{if(e.name==="Settings"&&!rs(t,i))return!1;De(e.name,t,i)};switch(o.type){case"boolean":return Ke(n,r,o.description??t);case"slider":return sn(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return Sr(n,o.options,r);case"string":return so(n,r,o.placeholder);case"number":return so(String(n),i=>r(Number(i)),"","number");case"component":{let i=s("div",{class:p("component")});return Lr.push(o.render(i)),i}case"custom":return null}}var Eu=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function Pr(e){if(!G)return;let t=Object.entries(bs(e)).filter(([,i])=>i.type!=="custom").map(([i,a])=>{let u=qu(e,i,a),l=a.type==="boolean",d=a.type!=="component"&&s("div",{class:p("field-label"),text:Eu(i)}),m=a.description&&s("div",{class:p("field-desc"),text:a.description});return s("div",{class:p("field",l?"field-inline":"field-stacked")},(d||m)&&s("div",{class:p("field-text")},d,m),u)}),o,n=H("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},pu);return}clearTimeout(o),e.settings?.reset(),Et(),Pr(e)},"danger"),r=s("div",{class:p("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&Et()}},s("div",{class:p("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},s("div",{class:p("popup-header")},s("div",{class:p("card-icon")},k(e.icon)),s("div",{class:p("popup-title")},s("div",{class:p("card-name"),text:e.name}),s("div",{class:p("popup-authors"),text:e.authors.join(", ")})),Y("close","Close",Et)),s("p",{class:p("popup-desc"),text:e.description}),s("div",{class:p("fields")},...t),s("div",{class:p("popup-footer")},n)));G.querySelector(`.${p("modal")}`)?.append(r)}function Et(){for(let e of Lr)e();Lr=[],G?.querySelector(`.${p("popup-backdrop")}`)?.remove()}function fs(e){let t=Ee(e),o=Zo.has(e.name),n=Jo.has(e.name),r=!!e.required,i=Ca(e.name);return s("div",{class:[p("card",t?"card-on":"card-off"),r?p("card-required"):""].filter(Boolean).join(" ")},s("div",{class:p("card-top")},s("div",{class:p("card-icon")},k(e.icon)),s("div",{class:p("card-actions")},Y("star",o?"Unstar":"Star",()=>{Zo.toggle(e.name),st()},o),r?null:Y("pin",n?"Unpin":"Pin to top",()=>{Jo.toggle(e.name),st()},n),r?s("span",{class:p("required-mark"),attrs:{"aria-label":"Required",[ue]:"This plugin is required for Bloom++ to work"}},k("alert")):null,Ir(e)&&Y("gear","Settings",()=>Pr(e)),Ke(t,a=>Ra(e,a),r?`${e.name} is required`:`Enable ${e.name}`,r))),s("div",{class:p("card-name")},e.name,Ma(e.name)&&s("span",{class:p("new-badge"),text:"New"})),s("div",{class:p("card-desc"),text:e.description,title:e.description}),i&&s("div",{class:p("card-issue"),attrs:{[ue]:`Missing: ${i.join(", ")}`}},k("alert"),s("span",{text:fu})),s("div",{class:p("card-footer"),text:e.authors.join(", ")}))}function ys(){let e=hs().some(o=>!o.tags.some(n=>gs.has(n)));G?.querySelector(`.${p("tabs")}`)?.replaceChildren(...gu.filter(o=>o.id!=="other"||e).map(o=>s("button",{class:p("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===lt)},on:{click:()=>{lt=o.id,ys(),st()}}})))}function st(){if(!G)return;let e=hs().filter(Au),t=G.querySelector(`.${p("search")} input`);t&&(t.placeholder=`Search ${ra(e.length,"plugin")}...`);let o=Su(e.filter(d=>xu(d)&&wu(d))),n=lt==="all",r=n?o.filter(d=>!d.required):o,i=n?o.filter(d=>d.required):[],a=[...r.map(fs),...i.length?[s("div",{class:p("required-break"),attrs:{role:"separator"}}),...i.map(fs)]:[]],u=cn.trim()?"No plugins match your search.":yu[lt]??"No plugins available.";G.querySelector(`.${p("grid")}`)?.replaceChildren(...a.length?a:[s("div",{class:p("empty"),text:u})])}function Tu(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),G?.querySelector(`.${p("popup-backdrop")}`)?Et():Ge())}var vs,kr;function Br(){let e=G?.querySelector(`.${p("body")}`);if(!G||!e)return;for(let o of G.querySelectorAll(`.${p("nav-item")}`))o.setAttribute("aria-selected",String(o.getAttribute("data-section")===lo));if(Et(),lo==="themes"){e.replaceChildren(ms());return}if(lo==="css"){e.replaceChildren(us());return}let t=s("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});t.value=cn,t.addEventListener("input",()=>{cn=t.value,st()}),e.replaceChildren(s("div",{class:p("tabs"),attrs:{role:"tablist"}}),s("div",{class:p("toolbar")},s("label",{class:p("search")},k("search"),t),Sr(Cr,bu,o=>{Cr=o,st()})),s("div",{class:p("grid")})),ys(),st(),t.focus()}function Tt(e,t){e&&(lo=e),G?(Br(),Ar(G)):Mu();let o=t&&W.get(t);o&&Pr(o)}function Mu(){G=s("div",{class:`bloom-root ${p("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:e=>e.target===e.currentTarget&&Ge()}},s("div",{class:p("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},s("div",{class:p("header")},s("div",{class:p("logo")},k("bloom")),s("h2",{class:p("title"),text:"Bloom++"}),s("span",{class:p("hint"),attrs:{"aria-label":ps,tabindex:"0",[ue]:ps}},k("info")),s("div",{class:p("nav"),attrs:{role:"tablist"}},...hu.map(e=>s("button",{class:p("nav-item"),text:e.label,attrs:{type:"button",role:"tab","data-section":e.id},on:{click:()=>{lo=e.id,Br()}}}))),s("span",{class:p("version"),text:"v2.0.99"}),Y("close","Close",Ge)),s("div",{class:p("body")}))),G.addEventListener("keydown",e=>e.stopPropagation()),kr=new AbortController,document.addEventListener("keydown",Tu,{capture:!0,signal:kr.signal}),ye(G),Br(),vs=Na(st),uu.debug("Opened")}function Ge(){Et(),kr?.abort(),vs?.(),G?.remove(),G=null}var Mt=()=>G?Ge():Tt(),As=()=>!!G;var ws=new x("AppLandmarks"),Cu={Settings:[c.rail],WiderChat:[":root"],StreamerMode:[c.sidebarScroll,c.rail],ComposerOpacity:[c.composer,c.composerInput],ResponseNotification:[c.composerInput],InputHistory:[c.composerInput],Continue:[c.composerInput],ChatListStatus:[c.sidebarScroll],StarChats:[c.turn],BetterNavigator:[c.timelineScroll,c.turn],BetterQuotes:[c.turn],MessageTimestamps:[c.turn],RecentTopics:[c.sidebarScroll]};function xs(){for(let[e,t]of Object.entries(Cu)){let o=W.get(e);if(!o||o.required||!Ee(o)){ur(e,null);continue}let n=t.some(r=>ce(r));if(ur(e,n?null:t),!n){if(!mr(o.name))continue;Pa(o),ws.warn(`${e} paused; missing ${t.join(", ")}`);continue}mr(o.name)||(Oa(o),ws.info(`${e} resumed`))}}function Ss(){return xs(),M(()=>xs())}var ny=new x("Route"),Lu=/\/c\/(?!local-)([\w-]+)/;var ku=()=>location.pathname.match(Lu)?.[1]??null;var ry=location.href,iy=ku();var Bu=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,Iu=/\S+@\S+\.\S+/,Pu=3;var Ou=e=>!!e.closest(".sr-only");function Ru(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!y(t.textContent??"")&&!(t instanceof SVGElement))}var Hu=e=>{if(/rounded-full/.test(e.getAttribute("class")??""))return!0;if(!e.clientWidth)return!1;let{borderRadius:t}=getComputedStyle(e);return t.includes("%")||Number.parseFloat(t)>=e.clientWidth/2};function dn(e,t,o){for(let n of e.querySelectorAll(`[${t}]`))n!==o&&n.removeAttribute(t);o&&!o.hasAttribute(t)&&o.setAttribute(t,"")}function Du(e,t){if(y(e.textContent??"").length>Pu)return null;let o=e.closest("button");for(let n=e;n&&n!==t&&n!==o;n=n.parentElement)if(Hu(n))return n;return null}function un(e,t){e.hasAttribute(`data-bloom-${t}`)||e.setAttribute(`data-bloom-${t}`,"");let o=e.querySelector("img:not([data-bloom] img)"),n=Ru(e),r=o?null:n.map(m=>Du(m,e)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),a=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");dn(e,`data-bloom-${t}-avatar`,a);let u=n.filter(m=>!a?.contains(m)&&!Ou(m)),l=u.find(m=>Bu.test(y(m.textContent??""))),d=u.find(m=>Iu.test(m.textContent??""));dn(e,`data-bloom-${t}-plan`,l),dn(e,`data-bloom-${t}-email`,d),dn(e,`data-bloom-${t}-name`,u.find(m=>m!==l&&m!==d))}var qs=()=>Ue(c.rail).filter(fe);function Es(e){return ce(c.profile,e)??[...e.querySelectorAll(c.menuButton)].findLast(fe)??null}function Nu(e,t){return[...e.children].find(n=>n instanceof HTMLElement&&n!==t&&n.contains(t))??t}function Ts(){return qs().flatMap(e=>{let t=Es(e);if(!t)return[{kind:"rail",anchor:e,insert:n=>e.append(n)}];let o=Nu(e,t);return[{kind:"rail",anchor:o,insert:n=>(o===t?e:o).append(n)}]})}var Or=()=>qs().map(Es).filter(e=>e!=null);function Uu(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function mn(){return Or().map(Uu).find(e=>e!=null)??Ue('[role="menu"]').find(e=>!e.closest("[data-bloom]")&&/log ?out|sign out|退出/i.test(e.textContent??""))??null}var co=e=>Ue(c.threadRow).filter(t=>t.getAttribute("data-app-action-sidebar-thread-id")===e);function uo(e){let t=co(e)[0]??Ue(c.threadRow).find(n=>{let r=n.getAttribute("data-app-action-sidebar-thread-id")??"";return r.endsWith(e)||e.endsWith(r.replace(/^local:/,""))});return(t?.getAttribute("data-app-action-sidebar-thread-title")??y(t?.textContent??""))||null}function Ms(e){return null}var Rr=0,pn;function Fu(e){if(!U(e))return;for(let o of Or())un(o,"profile");let t=mn();t&&un(t,"menu")}function ve(){Rr++;let e=!0;return Fe().then(()=>{e&&Rr&&!pn&&(pn=M(Fu))}),()=>{e&&(e=!1,!--Rr&&(pn?.(),pn=void 0))}}var Cs=`/*
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
`;var $=L("bloom-entry-"),Gu=4,Dr="--bloom-entry-x",Nr=1,Ls=4,ks=8,Yu=150,re=b({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar.",default:qt.showSidebarEntry},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:qt.showSidebarEntryOnHover},showAccountMenuEntry:{type:"boolean",description:"Show Bloom++ at the top of the account menu.",default:qt.showAccountMenuEntry},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:e=>(e.append(H("Reset position",()=>{re.store.entryPosition=Nr})),()=>e.replaceChildren())},showBloomMenu:{type:"boolean",description:"Hovering the Bloom++ row in the account menu opens a menu with Plugins, Themes, Quick CSS and plugin settings.",default:!0},menuPlugins:{type:"component",description:"Plugins listed in that menu.",render:e=>(e.append(...Ps().map(t=>s("div",{class:$("menu-pick")},k(t.icon),s("span",{class:"bloom-truncate",text:t.name}),Ke(Os(t),o=>{re.store.menuPicks={...re.store.menuPicks,[t.name]:o}},`List ${t.name} in the menu`)))),()=>e.replaceChildren())},entryPosition:{type:"custom",default:Nr},menuPicks:{type:"custom",default:{}}}),ct=new Map,Ye=null,mo,Ps=()=>[...W.values()].filter(e=>!e.hidden).toSorted((e,t)=>e.name.localeCompare(t.name)),Os=e=>re.store.menuPicks[e.name]??Ir(e),Bs=!1,Hr=[];function ju(e,t,o){let n=e.currentTarget,r=t.clientWidth-n.offsetWidth;if(e.button!==0||r<=0||!t.classList.contains($("hover")))return;let i=re.store.entryPosition,a=i,u=!1,l=new AbortController;n.setPointerCapture(e.pointerId),n.addEventListener("pointermove",m=>{!u&&Math.abs(m.clientX-e.clientX)<Gu||(u=!0,o(),a=te(i+(m.clientX-e.clientX)/r,0,Nr),t.style.setProperty(Dr,String(a)))},{signal:l.signal});let d=()=>{l.abort(),u&&(re.store.entryPosition=a,t.style.removeProperty(Dr))};n.addEventListener("pointerup",d,{signal:l.signal}),n.addEventListener("lostpointercapture",d,{signal:l.signal})}function Qu(e){let t=!1,o=s("button",{class:$("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),t||Mt(),t=!1},pointerdown:r=>{t=!1,e!=="rail"&&ju(r,n,()=>{t=!0})}}},k("bloom"),e!=="rail"&&s("span",{class:$("label"),text:"Bloom++"})),n=s("div",{class:`bloom-root ${$("wrap")} ${$(e)}`,attrs:{"data-bloom":"entry"}},o);return n}function po(){clearTimeout(mo),Ye?.remove(),Ye=null}function Rs(){clearTimeout(mo),mo=setTimeout(po,Yu)}var Hs=e=>e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0}));function Wu(e,t){if(clearTimeout(mo),Ye?.isConnected||!re.store.showBloomMenu)return;let o=(l,d,m)=>s("div",{class:$("flyout-item"),attrs:{role:"menuitem"},on:{pointerdown:g=>{g.button===0&&(g.preventDefault(),g.stopPropagation(),po(),Hs(t),m())}}},k(d),s("span",{class:"bloom-truncate",text:l})),n=Ps().filter(Os);Ye=s("div",{class:`bloom-root ${$("flyout")}`,attrs:{"data-bloom":"menu-flyout",role:"menu","aria-label":"Bloom++"},on:{pointerenter:()=>clearTimeout(mo),pointerleave:Rs}},o("Plugins","bloom",()=>Tt("plugins")),o("Themes","spark",()=>Tt("themes")),o("Quick CSS","edit",()=>Tt("css")),n.length>0&&s("div",{class:$("flyout-break"),attrs:{role:"separator"}}),...n.map(l=>o(l.name,l.icon,()=>Tt("plugins",l.name)))),ye(Ye);let r=t.getBoundingClientRect(),{width:i,height:a}=Ye.getBoundingClientRect(),u=r.right+Ls;Ye.style.left=`${u+i>innerWidth?r.left-i-Ls:u}px`,Ye.style.top=`${te(e.getBoundingClientRect().top,ks,innerHeight-a-ks)}px`}function zu(e){let t=s("div",{class:`bloom-root ${$("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),po(),Hs(e),Mt()},pointerenter:()=>Wu(t,e),pointerleave:Rs}},k("bloom"),s("span",{text:"Bloom++"}),re.store.showBloomMenu&&s("span",{class:$("menu-chevron")},k("chevron"))),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function Is(){po();for(let e of document.querySelectorAll('[data-bloom="entry"], [data-bloom="menu-entry"]'))e.remove();ct.clear()}function Vu(){for(let e of document.querySelectorAll('[data-bloom="menu-entry"]'))e.remove()}function Ds(){let{showSidebarEntry:e,showSidebarEntryOnHover:t,showAccountMenuEntry:o}=re.store,n=e||t?Ts():[],r=new Set(n.map(a=>a.anchor));for(let[a,u]of ct)a.isConnected&&r.has(a)||(u.remove(),ct.delete(a));for(let a of document.querySelectorAll('[data-bloom="entry"]'))[...ct.values()].includes(a)||a.remove();for(let a of n){let u=ct.get(a.anchor);if(u?.isConnected||!be(a.anchor))continue;let l=u??Qu(a.kind);ct.set(a.anchor,l),a.insert(l)}for(let a of ct.values())a.classList.toggle($("hover"),!e);if(!o){Vu();return}let i=mn();i&&!i.querySelector('[data-bloom="menu-entry"]')&&zu(i),i||po()}function Ju(e){qr.some(Tr)||(re.store[Er(e??"")?e:"showSidebarEntry"]=!0),Ds()}var Ns=h({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:re,styles:()=>`${Cs}[data-app-navigation-rail] [data-bloom=entry]{position:absolute;inset:auto;left:50%;bottom:100%;transform:translateX(-50%);width:max-content;margin:0;padding-block:0.25rem;pointer-events:none;z-index:5;display:flex;justify-content:center}[data-app-navigation-rail]>[data-bloom=entry]{bottom:2.75rem}[data-app-navigation-rail] [data-bloom=entry] .bloom-entry-button{pointer-events:auto}[data-app-navigation-rail] [data-bloom=entry].bloom-entry-hover:not(:hover > *){display:none;transition:display 0s 0.2s allow-discrete}.${$("hover")}{${Dr}:${re.store.entryPosition}}`,start(){Is(),Hr=[M(Ds),ns(),ve()],!Bs&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",Mt),Bs=!0)},stop(){for(let e of Hr)e();Hr=[],Is(),Ge()},onSettingsChange:Ju});var Yr=new x("AppNetwork"),Ae=wt(),fn=new Map,Us=new Map;var Zu=e=>e==="user"||e==="assistant";function Fs(e){let t=e.replace(/^local:/,"");return[...new Set([e,t,`local:${t}`])]}function Ks(e){let t=Fs(e);for(let n of t){let r=fn.get(n);if(r)return r}let o={id:t[0]??e,title:null,chain:[],times:new Map};for(let n of t)fn.set(n,o);return o}function Me(e){if(!e)return null;tm(e);let t=Fs(e);return t.map(o=>fn.get(o)).find(o=>o&&(o.chain.length||o.title))??fn.get(t[0]??e)??null}function Fr(e,t,o,n=null){return{id:e,role:t,createTime:n,text:y(o),hasFiles:!1,imageCount:0}}function Kr(e,t){let o=e.chain.find(r=>r.id===t.id);if(o){t.text&&(o.text=t.text),t.createTime!=null&&(o.createTime=t.createTime);return}if(e.chain.find(r=>r.role===t.role&&r.text&&r.text===t.text)){!e.times.has(t.id)&&t.createTime!=null&&e.times.set(t.id,t.createTime);return}e.chain.push(t)}function Gs(e){let t=e.chain.map(o=>`${o.id}	${o.role}	${o.text}`).join(`
`);Us.get(e.id)!==t&&(Us.set(e.id,t),Ae.emit("conversation",e))}function Xu(e){if(typeof e=="function")try{return y(String(e()??""))}catch(t){return Yr.warn("Turn label failed",t),""}return typeof e=="string"?y(e):""}function $u(e){if(typeof e!="function")return"";try{let t=e();return typeof t=="string"?y(t):C(t)&&typeof t.response=="string"?y(t.response):""}catch(t){return Yr.warn("Turn preview failed",t),""}}function _u(e){let t=Object.keys(e).find(o=>o.startsWith("__reactFiber$")||o.startsWith("__reactInternalInstance$"));return t?e[t]??null:null}function Gr(e,t,o,n){if(!e||t>24)return;let r=(C(e.memoizedProps)?e.memoizedProps:null)??(C(e.pendingProps)?e.pendingProps:null);r&&(Array.isArray(r.items)&&C(r.items[0])&&typeof r.items[0].turnKey=="string"&&!o.length&&o.push(...r.items.filter(C)),Array.isArray(r.entries)&&C(r.entries[0])&&typeof(r.entries[0].historyEntityKey??r.entries[0].turnId)=="string"&&!n.length&&n.push(...r.entries.filter(C))),Gr(e.child??null,t+1,o,n),Gr(e.sibling??null,t,o,n)}function em(e,t){let o=typeof t.turnId=="string"?t.turnId:"",n=typeof t.turnKey=="string"?t.turnKey:"";return e.find(r=>{let i=typeof r.turnKey=="string"?r.turnKey:"";return!!i&&(o===i||n.endsWith(i)||n.includes(i))})??null}function tm(e){let t=document.querySelector("[data-thread-find-target='conversation']")??document.querySelector(c.timelineScroll);if(!t)return;let o=[],n=[];try{Gr(_u(t),0,o,n)}catch(u){Yr.warn("Fiber walk failed",u);return}if(!n.length&&!o.length)return;let r=n.length?n:o,i=typeof r[0]?.conversationId=="string"?r[0].conversationId:e,a=Ks(i);a.title=uo(e)??uo(i)??a.title;for(let u of r){let l="";typeof u.turnId=="string"?l=u.turnId:typeof u.turnKey=="string"&&(l=u.turnKey.replace(/^.*turn:/,""));let d=typeof u.historyEntityKey=="string"?u.historyEntityKey:l?`turn:${l}`:"",m=em(o,u),g=Xu(m?.getLabel??u.getLabel),T=$u(m?.getPreview??u.getPreview),f=typeof u.timestampSeparatorAtMs=="number"?u.timestampSeparatorAtMs:null;d&&g&&(Kr(a,Fr(d,"user",g,f)),f&&a.times.set(d,f)),l&&T&&Kr(a,Fr(`${l}:assistant`,"assistant",T,f))}Gs(a)}function om(e){if(Zu(e.role))return e.role;let t=typeof e.type=="string"?e.type:typeof e.itemType=="string"?e.itemType:"";return/user/i.test(t)?"user":/agent|assistant/i.test(t)?"assistant":null}function nm(e){return typeof e.text=="string"?e.text:typeof e.content=="string"?e.content:C(e.content)&&typeof e.content.text=="string"?e.content.text:""}function Ur(e,t){if(!e||!C(t))return;let o=typeof t.id=="string"?t.id:typeof t.itemId=="string"?t.itemId:"",n=om(t),r=nm(t);if(!o||!n)return;let i=Ks(e);Kr(i,Fr(o,n,r)),Gs(i)}function rm(e){let t=e.params?.thread,o=e.params?.threadId??(C(t)&&typeof t.id=="string"?t.id:void 0);e.params?.item&&Ur(o,e.params.item);for(let n of e.params?.items??[])Ur(o,n);if(C(t)&&Array.isArray(t.items))for(let n of t.items)Ur(o,n)}ro.on("note",rm);var im=["data-turn","data-message-author-role"],am=/:(user|assistant)$/,jr=`${c.messageUnit}, ${c.oldMessage}`,hn=e=>e==="user"||e==="assistant",Ws=()=>!!document.querySelector(c.timelineScroll),zs=()=>!!ge(c.timelineScroll),Vs=()=>v()??document.querySelector(c.composerConversation)?.getAttribute("data-above-composer-conversation-id")??"",bn=()=>Ws()?ge(c.timelineScroll):document;function go(){if(Ws())return ge(c.timelineScroll);let e=document.querySelector(c.turn);for(let t=e?.parentElement;t;t=t.parentElement){let{overflowY:o}=getComputedStyle(t);if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight)return t}return document.scrollingElement}var je=e=>{let t=e.getAttribute("data-chatgpt-search-unit-key")?.match(am)?.[1];return hn(t)?t:e.matches(c.userBubble)?"user":e.matches(c.assistantReply)||e.matches(c.assistantMarkdown)?"assistant":null},Js=e=>{let t=[...e.querySelectorAll(c.searchUnit)].filter(n=>je(n)&&!n.parentElement?.closest(c.searchUnit));return t.length?t:[...e.querySelectorAll(`${c.userBubble}, ${c.assistantReply}`)].filter(n=>je(n)&&!n.parentElement?.closest(`${c.userBubble}, ${c.assistantReply}`))},Ys=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id")??e.getAttribute("data-response-annotation-target"))?.split(/\s+/).filter(Boolean)??[];function fo(e){let t=Ys(e);if(t.length)return t;let o=[...new Set([...e.querySelectorAll(jr)].flatMap(Ys))];if(o.length)return o;let n=e.closest("[data-turn-key]")?.getAttribute("data-turn-key")?.replace(/^history-content:/,"");return n&&je(e)==="user"?[n]:[]}function Ct(e=bn()){if(!e)return[];let t=Js(e);return t.length?t:[...e.querySelectorAll(jr)].filter(o=>!o.parentElement?.closest(jr))}function sm(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function lm(e){for(let t of im){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(hn(o))return o}return e.querySelector(c.markdown)||e.querySelector(c.generatedImage)?"assistant":null}var cm=e=>!e.parentElement?.closest(c.turn);function Qe(){let e=Me(v())?.chain??[];return[...bn()?.querySelectorAll(c.turn)??[]].filter(cm).flatMap(o=>{let n=Js(o),r=n.length?n.map(i=>({el:i,known:je(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=d=>!n.some(m=>m.contains(d))&&y(d.textContent??""),a=[...o.querySelectorAll(c.assistantMarkdown)].find(d=>i(d)&&!gn.test(y(d.textContent??""))),u=[...o.querySelectorAll(c.activityHeader)].findLast(i),l=a??u;l&&r.push({el:l,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?fo(o):Ct(o).flatMap(fo),a=n??lm(o)??sm(i,e)??(r%2?"assistant":"user"),u=o.closest(c.turn)??o,l=!o.closest(c.searchUnit)&&!!u.querySelector(c.turnBusy),d=a==="assistant"&&(o.matches(c.turnBusy)||!!o.querySelector(c.turnBusy)||l);return{el:o,role:a,messageIds:i,streaming:d}})}var dm="[data-bloom], .sr-only",Zs=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,gn=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,js=new WeakMap;function Lt(e){let o=(e.el.closest(c.turn)??e.el).textContent?.length??0,n=js.get(e.el);if(n?.length===o)return n.summary;let r=um(e);return js.set(e.el,{length:o,summary:r}),r}function Qs(e){let t=new Set,o=[];for(let n of e.querySelectorAll(c.assistantMarkdown)){if(n.closest(c.searchUnit))continue;let r=y(n.textContent??"");!r||gn.test(r)||Zs.test(r)||t.has(r)||(t.add(r),o.push(r))}return o}function um(e){let t=e.el.querySelectorAll(c.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.closest(c.turn);if(e.role==="assistant"&&o&&e.el.matches(c.assistantMarkdown)&&!e.el.closest(c.searchUnit)){let l=Qs(o);if(l.length)return l.join(" \xB7 ")}let n=e.el.querySelector(e.role==="assistant"?`${c.markdown}, ${c.assistantMarkdown}`:".whitespace-pre-wrap")??e.el,i=[...n.querySelectorAll(dm)].map(l=>y(l.textContent??"")).filter(Boolean).reduce((l,d)=>l.replace(d,`
`),n.innerText||n.textContent||""),a=i.split(`
`).map(y).filter(l=>l&&!Zs.test(l)&&!gn.test(l));if(a.length)return a.join(" ");if(e.role==="assistant"&&o){let l=Qs(o);if(l.length)return l.join(" \xB7 ")}let u=i.split(`
`).map(y).filter(l=>gn.test(l));return u.length?u.at(-1)??"":e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function yn(e){return e.text?y(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var Qr=e=>e.matches(c.timelineScroll)&&getComputedStyle(e).flexDirection==="column-reverse";var mm=80,pm=420;function Wr(e,t,o){return(e.x-o.x)*(t.y-o.y)-(t.x-o.x)*(e.y-o.y)}function fm(e,t,o,n){let r=Wr(e,t,o),i=Wr(e,o,n),a=Wr(e,n,t);return!((r<0||i<0||a<0)&&(r>0||i>0||a>0))}function gm(e,t){let o=(t.left+t.right)/2-(e.left+e.right)/2,n=(t.top+t.bottom)/2-(e.top+e.bottom)/2;if(Math.abs(o)>=Math.abs(n)){let i=o<0?t.right:t.left;return[{x:i,y:t.top},{x:i,y:t.bottom}]}let r=n<0?t.bottom:t.top;return[{x:t.left,y:r},{x:t.right,y:r}]}function Xs(e,t){let o=te(e.x,t.left,t.right),n=te(e.y,t.top,t.bottom);return Math.hypot(e.x-o,e.y-n)}function vn(e){let t=e.closeDelay??mm,o=e.towardDelay??pm,n=0,r=!1,i=null,a=null,u=()=>{document.removeEventListener("pointermove",f,!0)},l=()=>{n&&window.clearTimeout(n),n=0,u(),i=null,a=null},d=()=>{l(),r&&(r=!1,e.setHeld(!1))},m=()=>{r||(r=!0,e.setHeld(!0))},g=q=>{n&&window.clearTimeout(n),n=window.setTimeout(d,q)},T=q=>{let V=e.panel(),$e=e.trigger();if(!V||!i)return!1;let J=V.getBoundingClientRect();if(J.width<=0&&J.height<=0)return!1;let qe=$e?.getBoundingClientRect(),[ee,tr]=qe&&(qe.width||qe.height)?gm(qe,J):[{x:J.left,y:J.top},{x:J.right,y:J.bottom}];return fm(q,i,ee,tr)?!0:a!=null&&Xs(q,J)<Xs(a,J)-.25},f=q=>{let V={x:q.clientX,y:q.clientY};if(e.over(q.target)){l();return}T(V)?g(o):d(),a=V};return{enter(){l()},leave(q){if(e.over(q.relatedTarget)){l();return}i={x:q.clientX,y:q.clientY},a=i,m(),document.addEventListener("pointermove",f,!0),g(t)},dispose(){l(),r=!1}}}var $s=`/*
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
`;var E=L("bloom-nav-"),xn=80,bm=1200,ym=2,_s=3e4,vm=200,Am=.9,wm=.28,xm=24,kt=8,Sm=80,qm=12,zr=80,nl=`${c.rightPanel}, ${c.summaryPanel}`,Em={user:"\u2753",assistant:"\u{1F916}"},Tm=["wheel","touchmove","pointerdown"],qn=b({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),A=null,R=[],ie=-1,dt=-1,Bt=null,ut="",Jr=0,Zr=[],vo=null,An=null,wn=new Set,Ce,ho,Le,Xr="",bo=[],Sn=null,$r=new Set,Mm=e=>qn.store.showAssistant||e.role==="user",Cm=e=>e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.messageIds[0]||e.role;function Lm(e){return{role:e.role,summary:Lt(e),ids:e.messageIds,turn:e,streaming:e.streaming}}function rl(e,t){let o=e.entries.at(-1);if(o?.role==="assistant"&&t.role==="assistant"){e.entries[e.entries.length-1]={...t,ids:[...new Set([...o.ids,...t.ids])]};return}e.entries.push(t)}function km(){let e=[];for(let t of Qe()){let o=Lm(t),n=Cm(t),r=e.at(-1);r?.key===n?rl(r,o):e.push({key:n,entries:[o]})}return e}function Bm(){let e=[];for(let t of Me(v())?.chain??[]){let o={role:t.role,summary:yn(t),ids:[t.id],turn:null,streaming:!1},n=e.at(-1);t.role==="assistant"&&n?rl(n,o):e.push({key:t.id,entries:[o]})}return e}var It=e=>e.entries.flatMap(t=>t.ids);function _r(e,t){let o=new Set(It(e));return It(t).some(n=>o.has(n))}var mt=e=>y(e.entries.find(t=>t.role==="user")?.summary??""),Vr=(e,t)=>e.filter(o=>mt(o)===t).length,ei=e=>({...e,turn:null,streaming:!1});function Im(e,t){let o=new Set(t.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return e.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return ei(r);let a=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return a&&a!==n.key?ei(r):r})}))}function Pm(e,t){let o=t.entries.map((n,r)=>{let i=e.entries[r];if(!i)return n;let a=[...new Set([...n.ids,...i.ids])];return{...n,ids:a,summary:n.summary||i.summary}});for(let n of e.entries.slice(o.length))o.push(ei(n));return{key:e.key,entries:o}}function il(){let e=go();if(!e)return!1;let t=e.clientHeight-e.scrollHeight;return e.scrollTop-t<=Math.abs(e.scrollTop)}function Om(e,t){let o=Im(e,t);if(!t.length)return o;if(!o.length)return t;let n=t.findIndex(l=>o.some(d=>d.key===l.key));if(n<0)return il()?t.concat(o):o.concat(t);let r=t[n]?.key,i=o.findIndex(l=>l.key===r),a=o.slice(0,i).concat(t.slice(0,n),o.slice(i)),u=a.findIndex(l=>l.key===r);for(let l=n;l<t.length;l++){let d=t[l];if(!d)continue;let m=a.findIndex(g=>g.key===d.key);if(m>=0){let g=a[m];g&&(a[m]=Pm(g,d)),u=m}else a.splice(u+1,0,d),u++}return a}function Rm(e,t){let o=0,n=0,r=0;for(let i=1-e.length;i<t.length;i++){let a=0,u=0;for(let d=0;d<e.length;d++){let m=t[d+i],g=e[d];!m||!g||(_r(g,m)?(a+=3,u++):mt(g)&&mt(g)===mt(m)&&a++)}let l=il()?i<r:i>r;(a>o||a===o&&u>n||a===o&&u===n&&l)&&(o=a,n=u,r=i)}return{score:o,offset:r}}function Hm(e,t){let o=e.entries.map((n,r)=>{let i=t.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of t.entries.slice(o.length))o.push({...n,turn:null});return{key:e.key,entries:o}}function Dm(e){return e.map(t=>({key:t.key,entries:t.entries.map(o=>({...o}))}))}function Nm(e,t){if(!t.length)return e;if(!e.length)return t;let{score:o,offset:n}=Rm(e,t),r=Dm(e);if(o>0)for(let u=0;u<r.length;u++){let l=t[u+n],d=r[u];if(!l||!d)continue;let m=mt(d),g=!!m&&m===mt(l)&&Vr(e,m)===1&&Vr(t,m)===1;(_r(d,l)||g)&&(r[u]=Hm(d,l))}let i=[],a=[];for(let u=0;u<t.length;u++){let l=t[u];if(!l)continue;let d=mt(l);!d||Vr(r,d)>0||r.some(m=>_r(m,l))||(o>0&&u<n?i.push(l):a.push(l))}return i.concat(r,a)}var ti=e=>e.entries.some(t=>t.turn?.el.isConnected);function Um(e,t,o){let n=e.findIndex(i=>It(i).includes(t));if(n>=0)return n+1;let r=e.find(ti);return o&&r&&It(r).includes(o)?0:e.length}function Fm(e){if(Sn){let{parent:t,user:o}=Sn;for(let n of e.slice(Um(e,t,o))){let r=It(n);if(!ti(n)&&!(o&&r.includes(o)))for(let i of r)$r.add(i)}}return e.filter(t=>ti(t)||!It(t).some(o=>$r.has(o)))}function al(){bo=[],Sn=null,$r.clear()}function Km(){let e=Vs();e!==Xr&&(Xr=e,al());let t=km(),o=Bm();return!t.length&&!o.length&&!zs()?(bo=[],[]):(bo=Fm(Nm(Om(bo,t),o)),bo.flatMap(n=>n.entries).filter(Mm))}function Gm(e){for(let o of e)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!X().generating||e.some(o=>o.streaming))return;let t=e.at(-1);t&&(t.role==="assistant"||!qn.store.showAssistant?t.streaming=!0:e.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function sl(){let e=Km();return Gm(e),e}function ll(e){let t=e.getBoundingClientRect(),o=ne()?.getBoundingClientRect().top,n=Math.min(t.bottom,o&&o>t.top?o:t.bottom);return{top:t.top,bottom:n}}function cl(e){return((e.matches(".whitespace-pre-wrap, .markdown, .prose, [data-markdown-text-style]")?e:e.querySelector(".whitespace-pre-wrap")??e.querySelector(".markdown, .prose, [data-markdown-text-style]"))??e).getBoundingClientRect().top}function el(e){let t=R[e]?.turn?.el;return t?.isConnected?t:null}function Ym(e){if(!R.length)return null;let t=e.scrollHeight-e.clientHeight,o=Qr(e),n=Math.min(e.scrollTop,0),r=o?-n:t-e.scrollTop,i=o?t+n:e.scrollTop,a=t<=kt||r<=kt,u=t>kt&&i<=kt,{top:l,bottom:d}=ll(e),m=el(0),g=m?cl(m):Number.NaN,T=!!m&&g>=l-kt&&g<=l+48,f=el(R.length-1),q=f?.getBoundingClientRect().bottom??Number.NaN,V=!!f&&q<=d+kt&&q>=d-Sm;return a||V?"bottom":u||T?"top":null}function jm(e){let{top:t,bottom:o}=ll(e),n=t+Math.max(o-t,0)*wm,r=[],i=-1;if(R.forEach((u,l)=>{let d=u.turn?.el;if(!d?.isConnected){r.push(Number.NaN);return}let m=cl(d);r.push(m),i<0&&(i=l),m<=n&&(i=l)}),i<0)return Math.max(R.findIndex(u=>u.turn),0);let a=r[ie];return Number.isFinite(a)?i===ie?ie:i>ie?i:a<=n+xm?ie:i:i}function Qm(e){let t=Ym(e);return t==="bottom"?R.length-1:t==="top"?0:jm(e)}function tl(e){qn.store.jumpEffect==="border"&&(e.classList.add(E("flash")),setTimeout(()=>e.classList.remove(E("flash")),bm))}function En(e){let t=R[e],o=go();if(!t||!o)return;if(!t.turn&&!t.ids.length){dt=e,yo(),o.scrollTo({top:Qr(o)?0:o.scrollHeight});return}dt=e,Bt=e?null:{chat:v(),first:t.ids[0],until:Date.now()+_s},yo();let n=t.turn?.el;if(n?.isConnected){let d=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:d<o.clientHeight*ym?"smooth":"auto"}),tl(n);return}let r=R.findIndex(d=>d.turn),i=r>=0&&e<r?-1:1,a=++Jr,u=Date.now()+_s,l=()=>{let d=go();if(a!==Jr||Date.now()>u||!d)return;R=sl();let m=R.find(T=>T.ids.some(f=>t.ids.includes(f)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),tl(m),dt=R.findIndex(T=>T.turn?.el===m),yo();return}let g=d.scrollTop;d.scrollBy({top:i*d.clientHeight*Am,behavior:"instant"}),d.scrollTop===g?setTimeout(l,vm):requestAnimationFrame(l)};l()}function Wm(e,t){return s("button",{class:E("row"),attrs:{type:"button","data-index":String(t),"data-message-id":e.ids[0]??""},on:{click:()=>En(t)}},s("span",{text:Em[e.role]}),s("span",{class:"bloom-truncate",text:pe(e.summary||"\u2026",xn)}))}function zm(e,t){let o=e.offsetWidth?t.width/e.offsetWidth:1;return t.left+(e.clientLeft+e.clientWidth)*o}function Vm(e){let t=1/0;for(let o of document.querySelectorAll(nl)){if(!fe(o))continue;let n=o.getBoundingClientRect();n.width<zr||n.height<zr||n.left<e.left+zr||n.left<t&&(t=n.left)}return Number.isFinite(t)?t:null}function ol(e){if(!A)return;let t=e.getBoundingClientRect(),o=ne()?.getBoundingClientRect().top,r=Math.min(t.bottom,o&&o>t.top?o:t.bottom)-t.top,i=Math.min(zm(e,t),Vm(t)??1/0);A.style.right=`${document.documentElement.clientWidth-i+qm}px`,A.style.top=`${t.top}px`,A.style.height=r>1?`${r}px`:""}function Jm(){let e=go();if(R=sl(),!R.length||!e){Le?.dispose(),Le=void 0,A?.remove(),A=null,ut="";return}if(vo!==e){ho?.abort(),ho=new AbortController,e.addEventListener("scroll",Re(yo),{passive:!0,signal:ho.signal});for(let n of Tm)e.addEventListener(n,ul,{passive:!0,signal:ho.signal});vo=e,Ce?.disconnect(),Ce=new ResizeObserver(()=>{e.isConnected&&ol(e)}),Ce.observe(e),An=null,wn=new Set}let t=ne();if(t&&t!==An&&Ce&&(Ce.observe(t),An=t),Ce)for(let n of document.querySelectorAll(nl))wn.has(n)||(Ce.observe(n),wn.add(n));_m(),ol(e);let o=JSON.stringify(R.map(n=>[n.role,n.ids]));o!==ut?(ut=o,dt=-1,Xm(),Bt&&Date.now()<Bt.until&&Bt.chat===v()&&R[0]?.ids[0]!==Bt.first&&En(0)):Zm(),yo()}function yo(){if(!A||!vo)return;ie=dt>=0?dt:Qm(vo),A.querySelectorAll(`.${E("tick")}`).forEach((t,o)=>t.classList.toggle(E("tick-current"),o===ie)),A.querySelectorAll(`.${E("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===ie)));let e=A.querySelector(`.${E("toc-head")}`);e&&(e.textContent=`${ie+1} / ${R.length}`)}function Zm(){A?.querySelectorAll(`.${E("tick")}`).forEach((e,t)=>{let o=R[t],n=pe(o.summary,xn);e.title!==n&&(e.title=n),e.classList.toggle(E("tick-streaming"),o.streaming)}),A?.querySelectorAll(`.${E("row")}`).forEach(e=>{let t=e.lastElementChild,o=pe(R[Number(e.dataset.index)].summary||"\u2026",xn);t&&t.textContent!==o&&(t.textContent=o)})}function Xm(){A?.querySelector(`.${E("rail")}`)?.replaceChildren(...R.map((t,o)=>s("button",{class:Go(E("tick"),E(`tick-${t.role}`),t.streaming&&E("tick-streaming"),o===ie&&E("tick-current")),title:pe(t.summary,xn),attrs:{type:"button","aria-label":`Jump to message ${o+1}`,"data-message-id":t.ids[0]??""},on:{click:()=>En(o)}}))),A?.querySelector(`.${E("toc-list")}`)?.replaceChildren(...R.map(Wm))}var we=Re(Jm);function oi(e){if(e===A)return;let t=e.__bloomNavStop;if(t&&t!==ni)try{t()}catch{}e.isConnected&&e!==A&&e.remove()}function dl(){let e=[...document.querySelectorAll('[data-bloom="navigator"]')];if(A&&!A.isConnected&&(A=null),A&&e.includes(A)){for(let t of e)oi(t);return}A=e[0]??null;for(let t of e.slice(1))oi(t)}function $m(){Le?.dispose(),Le=vn({over:e=>e instanceof Node&&!!A?.contains(e),trigger:()=>A?.querySelector(`.${E("rail")}`),panel:()=>A?.querySelector(`.${E("toc")}`),setHeld:e=>A?.classList.toggle(E("open"),e)})}function _m(){dl(),A&&!A.querySelector(`.${E("rail")}`)&&(A.remove(),A=null,ut=""),A||(A=s("div",{class:`bloom-root ${E("root")}`,attrs:{"data-bloom":"navigator"},on:{pointerenter:()=>Le?.enter(),pointerleave:e=>Le?.leave(e)}},s("div",{class:E("rail")}),s("div",{class:E("bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:E("toc")},s("div",{class:E("toc-head")}),s("div",{class:E("toc-list")}))),ut=""),Le||$m(),A.isConnected||document.body.append(A),A.querySelector(`.${E("tick")}`)||(ut=""),A.__bloomNavStop=ni}function ul(){dt=-1,Bt=null,Jr++}function ni(){for(let e of Zr)e();Zr=[],ho?.abort(),Ce?.disconnect(),Ce=void 0,vo=null,An=null,wn=new Set,removeEventListener("keydown",ml,!0),removeEventListener("resize",we),Le?.dispose(),Le=void 0,A&&delete A.__bloomNavStop,A?.remove(),A=null,ut="",al(),Xr="";for(let e of document.querySelectorAll('[data-bloom="navigator"]'))oi(e)}var ep=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function ml(e){if(!A||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||ep(document.activeElement)||ge("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:ie-1,ArrowDown:ie+1,Home:0,End:R.length-1}[e.key];if(o==null){ul();return}o<0||o>=R.length||(e.preventDefault(),e.stopPropagation(),En(o))}var pl=h({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:qn,styles:$s,start(){dl(),Zr=[M(e=>U(e)&&we()),he(we),Ae.on("conversation",we),Ae.on("generate-start",({parentId:e,userId:t})=>{e&&(Sn={parent:e,user:t},we())}),O.on("rise",we),O.on("fall",we)],addEventListener("keydown",ml,!0),addEventListener("resize",we,{passive:!0}),we()},stop:ni,onSettingsChange:we});var fl=`/*
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
`;var Z=L("bloom-quotes-"),mi="BloomBetterQuotes",op=40,yl=8,np=1800,si=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,gl=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,pt=b({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),ri,ii,Pt,ai=!1,li=0,Tn=null,Mn=null,ke=null;function pi(){return v()??"draft"}function Ln(){try{let e=JSON.parse(sessionStorage.getItem(mi)??"[]");return Array.isArray(e)?e.filter(t=>!!t&&typeof t=="object"&&typeof t.id=="string"&&typeof t.text=="string"&&!!t.text):[]}catch{return[]}}function fi(e){try{sessionStorage.setItem(mi,JSON.stringify(e.slice(-op)))}catch{}}function Ao(e){return Ln().find(t=>t.id===e)?.text??""}function rp(e,t){let o=Ln().filter(n=>n.id!==e);o.push({id:e,text:t}),fi(o)}function ci(e=pi()){fi(Ln().filter(t=>t.id!==e)),Cn()}function ip(e){let t=Ao("draft");if(!t||Ao(e))return;let o=Ln().filter(n=>n.id!=="draft");o.push({id:e,text:t}),fi(o)}function di(e){return`${e.getAttribute("aria-label")??""} ${e.getAttribute("title")??""}`}function ap(e){let t=di(e);return gl.test(t)&&!/quote|引用/.test(t)?!1:/quote|引用/.test(t)&&si.test(t)?!0:si.test(t)&&!gl.test(t)}function vl(e){let t=e.cloneNode(!0),o=[...t.querySelectorAll("button, [role='button']")],n=new Set(o.map(r=>r.getAttribute("aria-label")).filter(Boolean));for(let r of o)r.remove();for(let r of t.querySelectorAll("*"))!r.children.length&&n.has(y(r.textContent??""))&&r.remove();return y(t.textContent??"")}function sp(e){let t=ne(),o=e.parentElement,n=0;for(;o&&o!==t&&n<5;){if(n++,o.matches(c.composerInput)||o.querySelector(c.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=vl(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function kn(){let e=ne();if(!e)return null;for(let t of e.querySelectorAll("button, [role='button']")){if(t.closest("[data-bloom]")||!ap(t))continue;let o=sp(t),n=o?vl(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:t}}return null}function lp(e){let t=e.closest(c.searchUnit)??e.closest(c.oldMessage);return t&&(je(t)??t.getAttribute("data-message-author-role"))==="user"?t:null}function gi(e){return y(e).slice(0,48)}function cp(e,t){let o=gi(e);if(o.length<yl)return null;let n=null;for(let r of Ct()){if(t&&(r===t||t.contains(r)||r.contains(t)))continue;let i=y(r.textContent??"");if(!i.includes(o))continue;let a=o.length/Math.max(i.length,1);(!n||a>n.score)&&(n={el:r,score:a})}return n?.el??null}function dp(e,t){let o=gi(t),n=e;for(let r of e.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&y(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${Z("hit")}`)?.classList.remove(Z("hit")),n.classList.add(Z("hit")),window.clearTimeout(li),li=window.setTimeout(()=>n.classList.remove(Z("hit")),np)}function hl(e){let t=e.closest(c.timelineScroll)??document.scrollingElement;if(!(t instanceof HTMLElement)&&t!==document.scrollingElement)return;let o=e.getBoundingClientRect();if(o.height<1||!t)return;let n=t.getBoundingClientRect(),r=ne()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,a=o.top+o.height/2-(n.top+i)/2;Math.abs(a)<8||t.scrollTo({top:t.scrollTop+a,behavior:"smooth"})}function hi(){if(!ke||!Tn?.isConnected)return;let e=Tn.getBoundingClientRect();e.width<1||(ke.style.top=`${Math.max(8,e.top+8)}px`,ke.style.left=`${Math.max(8,e.right-ke.offsetWidth-8)}px`)}function up(e,t,o){Tn=e,Mn=t,ke??=s("button",{class:`bloom-root ${Z("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),ke.isConnected||document.body.append(ke),dp(e,o),hi()}function bl(){ke?.remove(),ke=null,Tn=null,Mn=null,document.querySelector(`.${Z("hit")}`)?.classList.remove(Z("hit"))}function Al(){return document.querySelector('[data-bloom="quote-chip"]')}function Cn(){Al()?.remove()}function mp(e){let o=ne()?.getBoundingClientRect();!o||o.width<8||(e.style.width=`${Math.max(120,o.width-24)}px`,e.style.left=`${o.left+12}px`,e.style.top=`${Math.max(8,o.top-e.offsetHeight-8)}px`)}function pp(e){let t=Al();t||(t=s("div",{class:`bloom-root ${Z("chip")}`,attrs:{"data-bloom":"quote-chip"}},s("span",{class:Z("text")}),s("button",{class:Z("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(t));let o=t.querySelector(`.${Z("text")}`),n=y(e);o&&o.textContent!==n&&(o.textContent=n),t.dataset.text=e,mp(t)}function ui(){if(!ai){ai=!0;try{let e=pi(),t=kn();pt.store.persistAcrossChats&&t&&Ao(e)!==t.text&&rp(e,t.text);let o=pt.store.persistAcrossChats?Ao(e):"";!o||t&&y(t.text)===y(o)?Cn():pp(o),hi()}finally{ai=!1}}}function fp(e){let t=e.closest('[data-bloom="quote-chip"]');if(t instanceof HTMLElement&&!e.closest(`.${Z("x")}`)){let i=t.dataset.text??t.querySelector(`.${Z("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:t}:null}let o=e.closest("blockquote");if(o instanceof HTMLElement&&!e.closest("a, button")){let i=lp(o),a=y(o.textContent??"");if(i&&a)return{text:a,skip:i,origin:o}}let n=ne();if(!n||!n.contains(e)||no(e)||e.closest("button, [role='button']"))return null;let r=kn();return!r||!r.row.contains(e)?null:{text:r.text,skip:null,origin:r.row}}function gp(e){let{target:t}=e;if(!(t instanceof Element))return;if(t.closest('[data-bloom="quote-back"]')){e.preventDefault(),e.stopPropagation(),Mn?.isConnected&&hl(Mn);return}if(t.closest(`.${Z("x")}`)){e.preventDefault(),e.stopPropagation(),ci();return}let o=kn();if(o&&(t===o.dismiss||o.dismiss.contains(t))){ci();return}if(hp(t)&&wl(),!pt.store.jumpToPassage)return;let n=fp(t);if(!n)return;let r=cp(n.text,n.skip);r&&(e.preventDefault(),e.stopPropagation(),up(r,n.origin,n.text),hl(r))}function hp(e){let t=e.closest("button, [role='button']");return!(t instanceof HTMLElement)||t.closest("[data-bloom]")||!ne()?.contains(t)?!1:/send|submit|发送|提交/i.test(di(t))&&!si.test(di(t))}function bp(e){return!(e instanceof KeyboardEvent)||e.key!=="Enter"||e.shiftKey||e.isComposing?!1:no(e.target)}function wl(){if(!pt.store.persistAcrossChats)return;let e=pi(),t=Ao(e);if(t){if(!kn()){let o=Q(),n=gi(t);n.length>=yl&&!y(o).includes(n)&&Te(`> ${t}

${o}`.trim())}ci(e)}}function yp(e){bp(e)&&wl()}function vp(e){!e.prevId&&e.id&&ip(e.id),ui()}var xl=h({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:pt,styles:fl,onSettingsChange(e){e==="jumpToPassage"&&!pt.store.jumpToPassage&&bl(),e==="persistAcrossChats"&&!pt.store.persistAcrossChats&&(sessionStorage.removeItem(mi),Cn()),ui()},start(){Pt=new AbortController,document.addEventListener("pointerdown",gp,{capture:!0,signal:Pt.signal}),document.addEventListener("keydown",yp,{capture:!0,signal:Pt.signal}),addEventListener("scroll",hi,{capture:!0,passive:!0,signal:Pt.signal}),ii=he(vp),ri=M(e=>U(e)&&ui())},stop(){Pt?.abort(),Pt=void 0,ii?.(),ii=void 0,ri?.(),ri=void 0,window.clearTimeout(li),bl(),Cn()}});var Sl=`/*
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
`;var wp="[data-app-action-sidebar-thread-row]{position:relative}[data-app-action-sidebar-thread-row]>[data-bloom=cls]{position:absolute;inset-inline-end:0.25rem;top:50%;width:0.875rem;height:0.875rem;margin:0;transform:translateY(-50%);pointer-events:none}",xp=L("bloom-cls"),Sp="bloom-cls",qp=600*1e3,yi=Jt("tab"),Rt=new Map,wo=new Map,Ot=null,ql=[],Ep=e=>e==="streaming"||e==="error";function Tp(){let e=new Map,t=Date.now();for(let[o,n]of wo)t-n.at>qp?wo.delete(o):e.set(o,n.status);for(let[o,n]of Rt)e.set(o,n);return e}function Mp(e){return s("span",{class:`bloom-root ${xp("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&k("alert"))}function In(){let e=Tp(),t=new Set;for(let[o,n]of e)for(let r of co(o)){if(!be(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let a=Mp(n);t.add(a),r.append(a)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function Bn(e,t){e&&(t?Rt.set(e,t):Rt.delete(e),Ot?.postMessage({tab:yi,id:e,status:t}),In())}function Cp({data:e}){!C(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===yi||(Ep(e.status)?wo.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):wo.delete(e.id),In())}function bi(){for(let e of Rt.keys())Ot?.postMessage({tab:yi,id:e,status:null})}var El=h({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:()=>`${Sl}${wp}`,start(){for(let e of document.querySelectorAll('[data-bloom="cls"]'))e.remove();Ot=typeof BroadcastChannel=="function"?new BroadcastChannel(Sp):null,Ot?.addEventListener("message",Cp),addEventListener("pagehide",bi),ql=[O.on("rise",({conversationId:e})=>Bn(e,"streaming")),O.on("fall",({conversationId:e,outcome:t})=>Bn(e,t==="error"?"error":null)),O.on("context",({prevId:e,id:t,migrated:o})=>{o&&X().generating?Bn(t,"streaming"):!o&&Rt.get(e??"")==="streaming"&&Bn(e,null)}),M(e=>U(e)&&In())],v()&&In()},stop(){for(let e of ql)e();bi(),Ot?.close(),Ot=null,removeEventListener("pagehide",bi),Rt.clear(),wo.clear();for(let e of document.querySelectorAll('[data-bloom="cls"]'))e.remove()}});var We="data-bloom-invite",Lp=/^(?:invite team members|invite members|邀请团队成员|邀请成员)$/i,Tl=':is(button, a:not([href^="/c/"])):not(main *, [role="dialog"] *)',kp={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${c.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])'],hideInvite:[`[${We}]`,`div:has(> [${We}]:only-child)`]},Ml=b({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0},hideInvite:{type:"boolean",description:"Hide Invite team members in the sidebar.",default:!0}}),Pn,vi=!1;function Bp(e){if(U(e))for(let t of document.querySelectorAll(`${Tl}, [${We}]`))!t.matches(Tl)||!Lp.test(y(t.textContent??""))?t.removeAttribute(We):t.hasAttribute(We)||t.setAttribute(We,"")}var Cl=h({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads, notices and Invite team members.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:Ml,styles:()=>Oe(Object.entries(kp).flatMap(([e,t])=>Ml.store[e]?t:[])),start(){vi=!0,Fe().then(()=>{vi&&!Pn&&(Pn=M(Bp))})},stop(){vi=!1,Pn?.(),Pn=void 0;for(let e of document.querySelectorAll(`[${We}]`))e.removeAttribute(We)}});var Ht=`form:has(:is(${c.composerInput})), ${c.oldComposerForm}`,On='[class*="ComposerLayoutBody"]',wi='[class*="ComposerLayoutRoot"]',Ip='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',Pp=`:is(${Ht}) ${On}, :is(${Ht}):not(:has(${On})) ${wi}, :is(${Ht}):not(:has(${On})):not(:has(${wi})) :is(${Ip})`,Op='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',Rp='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',Hp="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))",Dp="var(--color-background-composer-surface, var(--composer-background-color, var(--color-bg-primary, Canvas)))",Np="composer-fill",Ll=b({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function Up(){let{opacity:e,blur:t}=Ll.store;if(e>=100)return"";{let i=`color-mix(in srgb, ${Dp} ${e}%, transparent)`;return`[class*="ComposerLayoutRoot"], [data-composer-layout], [data-chatgpt-composer]{--composer-layout-surface-background:${i}!important;--composer-background-color:${i}!important;--composer-layout-surface-backdrop-filter:blur(${t}px)!important}`}let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${Hp} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important;-webkit-backdrop-filter:blur(${t}px)!important`;return`:is(${Op}), :is(${Ht}){${o}}:is(${Rp}){display:none!important}${Pp}{${n}}:is(${Ht}):has(${On}) ${wi}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${Ht}) :is(${c.composerInput}){background-color:transparent!important}`}function Ai(){for(let e of document.querySelectorAll(`[data-bloom="${Np}"]`))e.remove()}var kl=h({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:Ll,styles:Up,start(){Ai()},stop(){Ai()},onSettingsChange(){Ai()}});var Fp=1200,Kp=8e3,Gp=150,Yp=20,Bl=6,qi="continue where you left",jp=/message delivery timed out|please try again/i,Il=/waiting for the complete answer/i,Pl=b({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:qi,placeholder:qi}}),xi=[],Hn=0,xo=!1,So=0,Nt="",Rn="",Ei=0,Ut=!1,qo=!1,Dn=!0,Dt="",Ti=0,Nn=!1,Qp=()=>Pl.store.prompt.trim()||qi;function Ol(){return(ge(c.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function Rl(){let e=Ol();return!e||Il.test(e)||!jp.test(e)?"":e}function Wp(){let e=Ol();return e&&Il.test(e)?e:""}function zp(){let e=bn()?.querySelectorAll(c.turn),t=e?.[e.length-1];return`${t?.getAttribute("data-turn-key")??""}:${t?.textContent?.length??0}`}function Hl(e,t,o){if(o===Hn){if(X().generating||Q()!==e||t>=Yp){Ut=!1,X().generating||(Nt="");return}za(),setTimeout(()=>Hl(e,t+1,o),Gp)}}function Vp(e){let t=Hn;if(X().generating||Q()&&Q()!==e){Ut=!1,Nt="";return}Te(e),Nn=!0,rr(()=>{t===Hn&&Hl(e,0,t)})}function Dl(e){return e===Nt||So>=Bl||X().generating||Q()?!1:(Nt=e,So+=1,Ut=!0,Vp(Qp()),!0)}function Jp(){if(xo||Ut||qo)return;let e=Date.now(),t=Rl();if(t){if(Dt="",t!==Rn){Rn=t,Ei=e;return}if(e-Ei<Fp)return;Dl(`${v()??""}:${t}`);return}if(Rn="",!Wp()){Dn=!0,Dt="";return}if(!Dn||!X().generating||Q())return;let n=`${v()??""}:${zp()}`;if(n!==Dt){Dt=n,Ti=e;return}if(e-Ti<Kp||So>=Bl)return;let r=fr();r&&(qo=!0,r.click())}function Si(){Hn+=1,xo=!1,So=0,Nt="",Rn="",Ei=0,Ut=!1,qo=!1,Dn=!0,Dt="",Ti=0,Nn=!1}var Nl=h({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:Pl,start(){Si(),xi=[O.on("rise",()=>{xo=!1,Nt="",Ut=!1,Nn&&(Nn=!1,Dn=!1,Dt="")}),O.on("fall",({outcome:e})=>{if(qo){qo=!1,e==="left"?xo=!0:Dl(`${v()??""}:stall`);return}(e==="stopped"||e==="left")&&(xo=!0),e==="done"&&!Rl()&&(So=0)}),O.on("context",({migrated:e})=>{e||Si()}),O.on("tick",Jp)]},stop(){for(let e of xi)e();xi=[],Si()}});var Be=L("bloom-csi-"),Zp=256,Xp=160,Un=1,Ul=4,$p=.1,_p=.0015,ef=250;function tf(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function of(e){return new Promise((t,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function nf(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:te(t.x,n,1-n),y:te(t.y,r,1-r)}}function Fl(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function rf(e,t){let o=s("canvas");return o.width=o.height=Zp,Fl(o,e,t),o.toDataURL("image/png")}function Kl(e){let t=null,o={x:j.store.cropX,y:j.store.cropY,zoom:j.store.cropZoom},n,r=s("canvas",{class:Be("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=Xp*devicePixelRatio;let i=s("div",{class:`bloom-muted ${Be("status")}`}),a=s("div",{class:Be("zoom")}),u=s("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(f,q=!0){t&&(o=nf(t,f),Fl(r,t,o),q&&(clearTimeout(n),n=setTimeout(()=>{t&&(j.store.cropX=o.x,j.store.cropY=o.y,j.store.cropZoom=o.zoom,j.store.avatarUrl=rf(t,o))},ef)))}function d(){a.replaceChildren(sn(o.zoom,Un,Ul,$p,"\xD7",f=>l({...o,zoom:f})))}async function m(f,q){i.textContent="";try{t=await of(f),q&&(j.store.avatarSource=f,o={x:.5,y:.5,zoom:Un}),e.classList.add(Be("has-image")),d(),l(o,q)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let g=f=>{f?.type.startsWith("image/")&&tf(f).then(q=>m(q,!0))};u.addEventListener("change",()=>g(u.files?.[0])),r.addEventListener("wheel",f=>{t&&(f.preventDefault(),l({...o,zoom:te(o.zoom*(1-f.deltaY*_p),Un,Ul)}),d())},{passive:!1}),r.addEventListener("pointerdown",f=>{if(!t)return;r.setPointerCapture(f.pointerId);let q={...o},V=r.getBoundingClientRect(),$e=J=>{if(!t)return;let qe=Math.max(V.width/t.naturalWidth,V.height/t.naturalHeight)*o.zoom;l({...o,x:q.x-(J.clientX-f.clientX)/(t.naturalWidth*qe),y:q.y-(J.clientY-f.clientY)/(t.naturalHeight*qe)})};r.addEventListener("pointermove",$e),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",$e),{once:!0})});let T=s("div",{class:Be("cropper"),attrs:{tabindex:"0"},on:{paste:f=>g([...f.clipboardData?.files??[]].find(q=>q.type.startsWith("image/"))),dragover:f=>f.preventDefault(),drop:f=>{f.preventDefault(),g(f.dataTransfer?.files[0])}}},s("div",{class:Be("stage")},r),s("div",{class:Be("controls")},so("",f=>f.trim()&&void m(f.trim(),!0),"https://\u2026 or data:image/\u2026","url"),s("div",{class:Be("buttons")},H("Choose file",()=>u.click()),H("Reset crop",()=>{l({x:.5,y:.5,zoom:Un}),d()}),H("Clear",()=>{t=null,e.classList.remove(Be("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),a.replaceChildren(),j.store.avatarUrl="",j.store.avatarSource=""},"danger")),a,i,u));return e.append(T),j.store.avatarSource&&m(j.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var Gl=`/*
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
`;var Eo="data-bloom-csi-avatar",Mi="data-bloom-csi-sized",Wl="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",sf=32,j=b({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>Kl(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),Yl=[];function zl(e){e.removeAttribute(Eo),e.removeAttribute(Mi)}function jl(e){return(j.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function Ql(e=[]){if(!U(e))return;let t=j.store.displayName.trim()||null,o=!!j.store.avatarUrl,n=new Set(t?jl("name"):[]);for(let i of document.querySelectorAll(Wl))n.has(i)||et(i,null);for(let i of n)et(i,t);let r=new Set(o?jl("avatar"):[]);for(let i of document.querySelectorAll(`[${Eo}]`))r.has(i)||zl(i);for(let i of r)i.hasAttribute(Eo)||i.setAttribute(Eo,""),i.toggleAttribute(Mi,!i.closest('[role="menu"]'))}function lf(){let e=j.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${j.store.avatarSize}px}:is(${c.rail}, ${c.oldRail}) [${Mi}]{--bloom-csi-size:${sf}px}`:""}var Vl=h({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:j,styles:()=>`${lf()}
${Gl}`,start(){Yl=[ve(),M(Ql)]},stop(){for(let e of Yl)e();for(let e of document.querySelectorAll(`[${Eo}]`))zl(e);for(let e of document.querySelectorAll(Wl))et(e,null)},onSettingsChange(){Ql()}});var Ft=L("bloom-greeting-"),Jl=30,Zl=100;function Xl(e){let t=-1,o=s("textarea",{class:`bloom-input ${Ft("input")}`,attrs:{maxlength:String(Zl),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=H("Add",i),r=s("div",{class:Ft("list")});function i(){let l=o.value.trim().slice(0,Zl);if(!l)return;let d=[...B.store.greetings];t>=0?d[t]=l:d.length<Jl&&d.push(l),B.store.greetings=d,t=-1,o.value="",a()}function a(){let{greetings:l}=B.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&l.length>=Jl,r.replaceChildren(...l.length?l.map((d,m)=>s("div",{class:Ft("row",m===t?"row-editing":"row-idle")},s("div",{class:Ft("text"),text:d}),Y("edit","Edit",()=>{t=m,o.value=d,o.focus(),a()}),Y("trash","Delete",()=>{B.store.greetings=l.filter((g,T)=>T!==m),t===m&&(t=-1),a()}))):[s("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),e.append(s("div",{class:Ft("editor")},r,s("div",{class:Ft("form")},o,n))),a();let u=At((l,d)=>l==="GreetingCustomizer"&&d==="greetings"&&a());return()=>{u(),e.replaceChildren()}}var $l=`/*
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
`;var Kn="data-bloom-greeting",df=1e3,uf=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],B=b({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>Xl(e)},greetings:{type:"custom",default:uf},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),Fn,_l=[],Ci,Lo=()=>an()&&!tt(),mf=e=>e.replaceAll(/\s*\n\s*/g," ").trim(),tc=()=>B.store.greetings.filter(e=>typeof e=="string"&&e.trim());function ko(){let e=tc();if(e.length)if(B.store.order==="random"&&e.length>1){let t=B.store.lastRandom;for(;t===B.store.lastRandom;)t=Math.floor(Math.random()*e.length);B.store.lastRandom=t,B.store.index=t}else B.store.index=(B.store.index+1)%e.length}function pf(){return Lo()?ge(c.homeHeading):null}function To(){for(let e of document.querySelectorAll(`[${Kn}]`))e.removeAttribute(Kn),et(e,null)}function Mo(){for(let e of document.querySelectorAll("[data-bloom-placeholder]"))e.removeAttribute("data-bloom-placeholder")}function ec(e){let t=de(),o=mf(e);if(!t||!o||Q(t)){Mo();return}t.getAttribute("data-bloom-placeholder")!==o&&t.setAttribute("data-bloom-placeholder",o)}function Co(){let e=tc(),t=Za(),o=Lo();if(!e.length||!t&&!o){To(),Mo();return}if(t){To(),ec(e[0]??"");return}let n=pf();n?((B.store.index<0||B.store.index>=e.length)&&ko(),n.setAttribute(Kn,""),et(n,e[Math.max(0,B.store.index)%e.length]??"")):To(),B.store.heroOnlyOutsideProject?Mo():ec(e[Math.max(0,B.store.index)%e.length]??"")}function Li(){clearInterval(Fn),Fn=void 0,B.store.mode==="interval"&&Lo()&&(Fn=setInterval(()=>{ko(),Co()},B.store.intervalSec*df))}function ff(e){B.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${Kn}]`)||getSelection()?.toString()||(ko(),Co())}function gf(){Lo()&&B.store.mode==="refresh"&&ko(),Li(),Co()}var oc=h({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:B,styles:$l,start(){To(),Mo(),Ci=new AbortController,document.addEventListener("click",ff,{signal:Ci.signal}),Lo()&&B.store.mode==="refresh"&&ko(),Li(),_l=[M(e=>U(e)&&Co()),he(gf)]},stop(){Ci?.abort();for(let e of _l)e();clearInterval(Fn),To(),Mo()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&Li(),Co()}});var Bo=L("bloom-history-"),ki=10,hf=3e3;function Bi(e,t){let o="",n=0,r=new Set,i=s("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),a=s("div",{class:Bo("list")}),u=s("div",{class:Bo("pager")}),l,d=H("Clear all",()=>{if(!l){d.textContent="Click again to clear",l=setTimeout(()=>{l=void 0,d.textContent="Clear all"},hf);return}clearTimeout(l),l=void 0,d.textContent="Clear all",Io([])},"danger");function m(){let T=[...ft.store.entries].toReversed(),f=o.trim().toLowerCase(),q=f?T.filter(ee=>ee.toLowerCase().includes(f)):T,V=Math.max(1,Math.ceil(q.length/ki));n=Math.min(n,V-1);let $e=q.slice(n*ki,(n+1)*ki).map(ee=>s("div",{class:Bo("row")},s("button",{class:Bo("text",r.has(ee)?"text-open":"text-closed"),text:ee,title:r.has(ee)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{r.delete(ee)||r.add(ee),m()}}}),t&&Y("edit","Use",()=>t(ee)),Y("copy","Copy",()=>void No(ee)),Y("trash","Delete",()=>Io(ft.store.entries.filter(tr=>tr!==ee)))));a.replaceChildren(...$e.length?$e:[s("div",{class:"bloom-muted",text:f?"No matching prompts.":"No saved prompts yet."})]),u.replaceChildren(s("span",{class:"bloom-muted",text:`${q.length} ${f?"matching":"saved"} \xB7 page ${n+1} of ${V}`}),H("Previous",()=>{n--,m()}),H("Next",()=>{n++,m()}),d);let[J,qe]=u.querySelectorAll("button");J.disabled=n===0,qe.disabled=n>=V-1,d.disabled=!T.length}i.addEventListener("input",()=>{o=i.value,n=0,m()}),e.append(s("div",{class:Bo("manager")},i,a,u)),m();let g=At((T,f)=>T==="InputHistory"&&f==="entries"&&m());return()=>{g(),clearTimeout(l),e.replaceChildren()}}var nc=`/*
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
`;var Ie=L("bloom-history-"),yf=2e3,ft=b({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>Bi(e)},entries:{type:"custom",default:[]}}),D=null,Ii={text:"",at:0},xe=null,ze=null,Pi,Gt=()=>ft.store.entries.filter(e=>typeof e=="string");function Io(e){ft.store.entries=e.slice(-ft.store.maxEntries)}function Oi(e){let t=e.trim();if(!t)return;let o=Date.now();t===Ii.text&&o-Ii.at<yf||(Ii={text:t,at:o},Io([...Gt().filter(n=>n!==t),t]))}function rc(e){e.preventDefault()}function vf(){let e=s("button",{class:Ie("hud-count"),attrs:{type:"button"},on:{mousedown:rc,click:Sf}}),t=s("button",{class:Ie("hud-x"),text:"\xD7",attrs:{type:"button","aria-label":"Exit history"},on:{mousedown:rc,click:Af}});return s("div",{class:`bloom-root ${Ie("hud")}`,attrs:{"data-bloom":"history-hud",role:"group","aria-live":"polite","aria-label":"Input history"}},e,t)}function ic(e,t){let o=de();if(!o||ze)return;xe??=vf();let n=`${e+1} / ${t}`,r=xe.querySelector(`.${Ie("hud-count")}`);r?.replaceChildren(n),r?.setAttribute("aria-label",`Show input history (${n})`);let i=(o.closest("form")??o).getBoundingClientRect();xe.style.left=`${i.left+i.width/2}px`,xe.style.top=`${i.top}px`,xe.isConnected||document.body.append(xe)}function Kt(){D=null,xe?.remove()}function Af(){D&&Te(D.draft),Kt(),de()?.focus()}function ac(e){let t=Gt();if(!D)return;let o=t[e];D.index=e,D.shown=o,Te(o),ic(t.length-1-e,t.length)}function wf(e){let t=Gt();if(!t.length)return!1;if(!D){if(e===1)return!1;D={index:t.length,draft:Q(),shown:""}}let o=D.index+e;return o<0?!0:o>=t.length?(Te(D.draft),Kt(),!0):(ac(o),!0)}function xf(e){let t=Gt().indexOf(e);Po(),!(t<0)&&(D??={index:t,draft:Q(),shown:""},ac(t),de()?.focus())}function Po(){if(!ze)return;ze.release(),ze.controller.abort(),ze.root.remove(),ze=null;let e=Gt();D&&e[D.index]===D.shown?ic(e.length-1-D.index,e.length):D=null}function Sf(){if(ze)return;xe?.remove();let e=s("div",{class:Ie("dialog-body")}),t=s("div",{class:`bloom-root ${Ie("backdrop")}`,attrs:{"data-bloom":"history-dialog"},on:{click:n=>n.target===n.currentTarget&&Po()}},s("div",{class:Ie("dialog"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Input history"}},s("div",{class:Ie("dialog-header")},s("h2",{class:Ie("dialog-title"),text:"Input history"}),Y("close","Close",Po)),e));t.addEventListener("keydown",n=>n.stopPropagation());let o=new AbortController;document.addEventListener("keydown",n=>{n.key==="Escape"&&(n.preventDefault(),n.stopPropagation(),Po())},{capture:!0,signal:o.signal}),ye(t),ze={root:t,release:Bi(e,xf),controller:o},e.querySelector("input")?.focus()}function sc(e){return no(e)?e:e instanceof HTMLElement?e.closest(c.composerInput):null}function qf(){if(de()?.closest("[data-chatgpt-composer], [data-composer-input], form")?.querySelector('[aria-expanded="true"]'))return!0;for(let t of document.querySelectorAll('[role="listbox"], [role="menu"], [data-radix-popper-content-wrapper], [cmdk-root], [cmdk-list]')){if(!(t instanceof HTMLElement)||t.closest("[data-bloom]"))continue;let o=getComputedStyle(t);if(!(o.display==="none"||o.visibility==="hidden"))return!0}return!1}function Ef(e){if(e.isComposing||e.key==="Process"||e.keyCode===229)return;let t=sc(e.target);if(!t)return;if(e.key==="Enter"&&!e.shiftKey){Oi(Q(t)),Kt();return}if(e.key==="Escape"&&D){Te(D.draft),Kt(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey||qf())return;let o=Qa(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!D||wf(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function Tf(e){D&&sc(e.target)&&Q()!==D.shown.trim()&&Kt()}function Mf(e){e.target instanceof Element&&e.target.closest(c.sendButton)&&Oi(Q())}var lc=h({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before. Click the counter to browse history.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:ft,styles:nc,start(){for(let t of document.querySelectorAll('[data-bloom="history-hud"], [data-bloom="history-dialog"]'))t.remove();xe=null,Pi=new AbortController;let{signal:e}=Pi;document.addEventListener("keydown",Ef,{capture:!0,signal:e}),document.addEventListener("input",Tf,{capture:!0,signal:e}),document.addEventListener("click",Mf,{capture:!0,signal:e}),document.addEventListener("submit",()=>Oi(Q()),{capture:!0,signal:e})},stop(){Pi?.abort(),Po(),Kt();for(let e of document.querySelectorAll('[data-bloom="history-hud"]'))e.remove();xe=null},onSettingsChange(e){e==="maxEntries"&&Io(Gt())}});var cc=`/*
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
`;var Lf=1500,kf=5e3,Bf=2e3,gc=[{label:"UTC",value:"UTC"},{label:"\u7F8E\u56FD\u4E1C\u90E8",value:"America/New_York"},{label:"\u7F8E\u56FD\u4E2D\u90E8",value:"America/Chicago"},{label:"\u7F8E\u56FD\u5C71\u5730",value:"America/Denver"},{label:"\u7F8E\u56FD\u897F\u90E8",value:"America/Los_Angeles"},{label:"\u65E5\u672C",value:"Asia/Tokyo"},{label:"\u53F0\u6E7E",value:"Asia/Taipei"}],Yt=b({sourceTimeZone:{type:"select",description:"Zone the stored clock was written in. Leave UTC for ChatGPT create_time. Pick the same zone as the Shit GPT plugin only when that clock is a wall time in that zone; it is then shown in the system timezone.",options:gc,default:"UTC"},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),Yn=new Map,Ri=new Set,hc=0,jn,dc=[];function bc(e,t){Yn.get(e)!==t&&(Yn.set(e,t),clearTimeout(jn),jn=setTimeout(yc,Bf))}function yc(){let e={...Yt.store.stamps,...Object.fromEntries(Yn)};Yt.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,Lf))}function If(e){let t=Me(v())?.times;for(let o=e.length-1;o>=0;o--){let n=Yn.get(e[o])??t?.get(e[o])??Yt.store.stamps[e[o]];if(n)return n}return null}var Pf=()=>X().generating||Date.now()-hc<kf;function vc(){return Intl.DateTimeFormat().resolvedOptions().timeZone}function Ac(){let e=Yt.store.sourceTimeZone;if(!e||e==="UTC")return"UTC";try{return Intl.DateTimeFormat(void 0,{timeZone:e}),e}catch{return"UTC"}}function wc(e,t){let o={};for(let n of new Intl.DateTimeFormat("en-US",{timeZone:t,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(e)))o[n.type]=n.value;return{y:+o.year,m:+o.month,d:+o.day,h:+o.hour%24,mi:+o.minute,s:+o.second}}function xc(e){return Date.UTC(e.y,e.m-1,e.d,e.h,e.mi,e.s)}function uc(e,t){let o=e;for(let n=0;n<4;n++){let r=e-xc(wc(o,t));if(r===0)return o;o+=r}return o}function Of(e,t){if(t==="UTC")return e;let o=(e%1e3+1e3)%1e3,n=e-o,r=new Date(n),i=Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),r.getUTCHours(),r.getUTCMinutes(),r.getUTCSeconds()),a=uc(i,t),u=3600*1e3,l=Number.POSITIVE_INFINITY;for(let d of[-u,0,u]){let m=a+d;xc(wc(m,t))===i&&m<l&&(l=m)}return l!==Number.POSITIVE_INFINITY?l+o:uc(i+u,t)+o}function Rf(e,t){let o=Ac();return t||o==="UTC"?e:Of(e,o)}function mc(e,t){return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(e)}function Hf(e){let t=vc(),o=Date.now(),n={hour:"2-digit",minute:"2-digit",timeZone:t};if(mc(e,t)===mc(o,t))return new Intl.DateTimeFormat(void 0,n).format(e);let r=a=>new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric"}).format(a),i=r(e)===r(o)?{}:{year:"numeric"};return new Intl.DateTimeFormat(void 0,{...i,month:"short",day:"numeric",...n}).format(e)}function Df(e,t){let o=new Date(t).toLocaleString(void 0,{timeZone:vc()}),n=Ac();if(n==="UTC"||t===e)return o;let r=new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"UTC"}).format(e);return`${gc.find(a=>a.value===n)?.label??n} ${r} \u2192 ${o}`}function Sc(e){let t=je(e)??e.getAttribute("data-message-author-role")??e.closest(c.turn)?.getAttribute("data-turn")??e.querySelector(c.authorRole)?.getAttribute("data-message-author-role");if(hn(t))return t;let o=fo(e).at(-1);return Me(v())?.chain.find(n=>n.id===o)?.role??null}var pc='[class*="group/activity-header"]';function Nf(e){let t=e.parentElement;if(!t)return null;let o=e.closest(c.turn);return o&&t!==o&&!o.contains(t)?null:t}function Uf(e){let t=e;for(let o=0;o<8&&t;o++){let n=Nf(t);if(!n)return null;let r=[...n.children],i=r.indexOf(t);for(let a=i-1;a>=0;a--){let u=r[a],l=u.matches(pc)?u:u.querySelector(pc);if(l)return l;if(u.matches(c.searchUnit)||u.querySelector(c.searchUnit))return null}if(n===t.closest(c.turn))return null;t=n}return null}function Ff(e){let t=e.parentElement;for(let o=0;o<4&&t;o++){if(t.classList.contains("flex-col"))return t;t=t.parentElement}return e.parentElement??e}function qc(e,t){if(t==="assistant"){let o=Uf(e);if(o)return Ff(o)}return e}function Kf(e,t){let o=Ct();for(let n=o.length-1;n>=0;n--){let r=o[n];if(!(r!==e&&(Sc(r)!=="assistant"||qc(r,"assistant")!==t)))return r===e}return!0}function fc(e){return e.querySelector(':scope > time[data-bloom="timestamp"]')}function Gf(e){let t=fo(e);if(!t.length||!be(e)||e.querySelector("time:not([data-bloom])"))return;let o=Sc(e),n=qc(e,o);if(n!==e&&!Kf(e,n)){fc(e)?.remove();return}let r=If(t),i=!1;if(!r&&Pf()){r=Date.now();let m=t.at(-1);Ri.add(m),bc(m,r),i=!0}else r&&Ri.has(t.at(-1))&&(i=!0);let a=n.querySelector('time[data-bloom="timestamp"]')??fc(e);if(!r||Yt.store.hideOwnMessages&&o==="user"){a?.remove();return}let u=Rf(r,i),l=Hf(u);if(a?.textContent===l&&a.parentElement===n&&a===n.firstElementChild)return;let d=s("time",{class:`bloom-timestamp bloom-timestamp-${o??"assistant"}`,text:l,title:Df(r,u),attrs:{"data-bloom":"timestamp",datetime:new Date(u).toISOString()}});a&&a.replaceWith(d),(d.parentElement!==n||d!==n.firstElementChild)&&n.prepend(d)}var Gn=Re(()=>{for(let e of Ct())Gf(e)}),Ec=h({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:Yt,styles:cc,start(){dc=[M(e=>U(e)&&Gn()),Ae.on("conversation",Gn),Ae.on("message-time",({messageId:e,time:t})=>{Ri.delete(e),bc(e,t),Gn()}),O.on("fall",()=>{hc=Date.now()})]},stop(){for(let e of dc)e();jn&&(clearTimeout(jn),yc());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();Gn()}}});var Yf=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])','[data-chatgpt-composer] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-composer-input] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-codex-composer-root] button[aria-label^="Dictat" i], [data-composer-placement] button[aria-label^="Dictat" i], [class*="ComposerLayout"] button[aria-label^="Dictat" i]'],jf=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],Tc=b({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),Mc=h({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:Tc,styles:()=>Oe([...Yf,...Tc.store.hideDictationSettings?jf:[]])});var gt="data-bloom-share",Qf=/^\/g\/g-p-/,Wf=/^(?:share|分享)$/i,zf=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],Vf=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${gt}="project"]`],Hi=b({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),Qn,Di=!1;function Jf(e){if(!U(e))return;let t=Qf.test(location.pathname)&&!v();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${gt}]`))!t||!Wf.test(y(o.textContent??""))?o.removeAttribute(gt):o.hasAttribute(gt)||o.setAttribute(gt,"project")}var Cc=h({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:Hi,styles:()=>Oe([...Hi.store.hideShareChat?zf:[],...Hi.store.hideShareProject?Vf:[]]),start(){Di=!0,Fe().then(()=>{Di&&!Qn&&(Qn=M(Jf))})},stop(){Di=!1,Qn?.(),Qn=void 0;for(let e of document.querySelectorAll(`[${gt}]`))e.removeAttribute(gt)}});var Lc='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',Zf='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',Xf="[data-bloom-profile-plan]",kc="visibility:hidden!important;user-select:none!important",Ic=b({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function $f(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=Ic.store,r=[];return e&&r.push(n?`:is(${Lc}){display:none!important}`:`:is(${Lc}){${kc}}`),t&&r.push(`:is(${Zf}){${kc}}`),e&&o&&r.push(`${Xf}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var Bc,Pc=h({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Ic,styles:$f,start(){Bc=ve()},stop(){Bc?.()}});var _f=new Set(["chatgpt","new chat","\u65B0\u804A\u5929","codex"]);function eg(){let e=y(document.title.replace(/\s*[|–-]\s*(?:ChatGPT|Codex)$/i,""));return e&&!_f.has(e.toLowerCase())?e:null}function Oo(e){return e?uo(e)??(e===v()?eg():null):null}var Oc=`/*
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
`;var _=L("bloom-recent-"),Se="home",og=50,Rc=140,ng=new Set(["Backquote"]),rg=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),w=b({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),Ve=null,ae=[],me=0,Ni,Hc=[],zn=()=>tt()?null:v()??(an()?Se:null);function Dc(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function Uc(e){let t=Oo(e);t&&w.store.titles[e]!==t&&(w.store.titles={...w.store.titles,[e]:t});let o=Ms(location.href);o&&e===v()&&w.store.projects[e]!==o&&(w.store.projects={...w.store.projects,[e]:o})}function Nc(e){if(!e)return;let t=[e,...w.store.visits.filter(n=>n!==e)].slice(0,og),o=new Set(t);w.store.visits=t,Object.keys(w.store.previews).some(n=>!o.has(n))&&(w.store.previews=Dc(w.store.previews,o)),Object.keys(w.store.titles).some(n=>!o.has(n))&&(w.store.titles=Dc(w.store.titles,o)),e!==Se&&Uc(e)}function ig(e){if(!w.store.visits.includes(e))return;let{[e]:t,...o}=w.store.titles,{[e]:n,...r}=w.store.previews,{[e]:i,...a}=w.store.projects;w.store.visits=w.store.visits.filter(u=>u!==e),w.store.titles=o,w.store.previews=r,w.store.projects=a}function Wn(e){if(!e||!w.store.visits.includes(e))return;let t={},o=Me(e)?.chain??[];for(let r of o)t[r.role]=pe(yn(r),Rc);if(e===v())for(let r of Qe()){let i=Lt(r);i&&(t[r.role]=pe(i,Rc))}let n=w.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(w.store.previews={...w.store.previews,[e]:t})}function ag(){let e=Number(w.store.maxRecent);return w.store.visits.filter(t=>t!==Se||w.store.includeHome).slice(0,e)}function Fc(e){if(Qt(),e===zn())return;let t=e===Se?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"], [data-sidebar-destination="builtin:home"]'):co(e)[0];t?t.click():location.assign(e===Se?"/":`/c/${e}`)}function sg(e){let t=e===Se?null:w.store.previews[e],o=t&&["user","assistant"].filter(n=>t[n]).map(n=>s("span",{class:_("preview"),attrs:{"data-role":n},text:t[n]}));return s("span",{class:_("thumb"),attrs:{"aria-hidden":"true"}},o?.length?s("span",{class:_("page")},...o):s("span",{class:_("fallback")},k(e===Se?"plus":"bloom")))}function lg(e,t){let o=e===Se?"New chat":w.store.titles[e]??Oo(e)??"Untitled chat",n=e===Se?null:w.store.projects[e];return s("button",{class:_("item"),attrs:{type:"button",role:"option","aria-selected":String(t===me),"aria-label":n?`${o}, ${n}`:o},on:{click:()=>Fc(e),pointerenter:()=>t!==me&&jt(t)}},sg(e),s("span",{class:_("meta")},s("span",{class:`${_("title")} bloom-truncate`,text:o}),n&&s("span",{class:_("project")},k("folder"),s("span",{class:"bloom-truncate",text:n}))))}function Kc(){ae.length?Fc(ae[me]):Qt()}function jt(e){ae.length&&(me=(e+ae.length)%ae.length,Ve?.querySelectorAll(`.${_("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===me))))}function cg(){Wn(v());let e=zn();ae=ag(),e&&(ae=[e,...ae.filter(o=>o!==e)].slice(0,Number(w.store.maxRecent))),me=ae.length>1?1:0;let t=ae.length?s("div",{class:_("list"),attrs:{role:"listbox","aria-label":"Recent chats"}},...ae.map(lg)):s("div",{class:_("empty"),text:"Open a few chats, then hold Ctrl+` to switch."});t.style.setProperty("--bloom-recent-count",String(ae.length)),Ve=s("div",{class:`bloom-root ${_("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:o=>o.target===o.currentTarget&&Qt()}},s("div",{class:_("panel")},t)),ye(Ve)}function Qt(){Ve?.remove(),Ve=null}var dg=e=>ng.has(e.code)||rg.has(e.key);function ug(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&dg(e)){e.preventDefault(),e.stopPropagation(),Ve?jt(me+(e.shiftKey?-1:1)):cg();return}if(!Ve)return;let o={Escape:Qt,Enter:Kc,ArrowRight:()=>jt(me+1),ArrowDown:()=>jt(me+1),ArrowLeft:()=>jt(me-1),ArrowUp:()=>jt(me-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function mg(e){Ve&&e.key==="Control"&&Kc()}var Gc=h({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:w,styles:Oc,start(){Ni=new AbortController;let{signal:e}=Ni;addEventListener("keydown",ug,{capture:!0,signal:e}),addEventListener("keyup",mg,{capture:!0,signal:e}),addEventListener("blur",Qt,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&Wn(v()),{signal:e}),Hc=[he(({prevId:i})=>{Wn(i),Nc(zn())}),Ae.on("conversation",({id:i})=>{w.store.visits.includes(i)&&Uc(i),Wn(i)}),Ae.on("conversation-missing",({id:i})=>ig(i))];let{visits:t,titles:o,previews:n}=w.store,r=t.filter(i=>i!==Se&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(w.store.visits=t.filter(i=>!r.includes(i))),Nc(zn())},stop(){Ni?.abort();for(let e of Hc)e();Qt()}});var Ui="data:audio/mpeg;base64,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";var Yc=new x("ResponseNotification"),pg=.5,jc="BloomNoticeClaim",fg=3e4,Ro=b({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:e=>(e.append(H("Preview",Jc)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),Qc=null,Fi=new Map,Wc=[],Ki,gg=e=>Uint8Array.from(atob(e.slice(e.indexOf(",")+1)),t=>t.charCodeAt(0)).buffer;function hg(e,t){let o=Fi.get(t);return o||(o=(t.startsWith("data:")?Promise.resolve(gg(t)):Fo(t)).then(n=>e.decodeAudioData(n)),o.catch(()=>Fi.delete(t)),Fi.set(t,o)),o}async function zc(e){Qc??=new AudioContext;let t=Qc;t.state==="suspended"&&t.resume();let o=t.createBufferSource(),n=t.createGain();o.buffer=await hg(t,e),n.gain.value=pg,o.connect(n).connect(t.destination),o.start()}function Jc(){let e=Ro.store.soundUrl.trim();zc(e||Ui).catch(t=>{Yc.warn("Sound failed",t),e&&zc(Ui).catch(o=>Yc.warn("Default chime failed",o))})}function bg(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function yg(e){let t=Uo(Wo(jc)??"");return e&&C(t)&&t.id===e&&Date.now()-Number(t.at)<fg?!1:(zo(jc,{id:e,at:Date.now()}),!0)}function Vc(e){Ro.store.onlyWhenHidden&&!document.hidden||yg(e)&&(Ro.store.sound&&Jc(),Ro.store.browserNotification&&bg(Oo(e)))}function vg(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(Ki=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:Ki.signal}))}var Zc=h({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply, including chats you left while they were answering.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:Ro,start(){vg(),Wc=[O.on("fall",({conversationId:e,outcome:t})=>t==="done"&&Vc(e)),O.on("background",({conversationId:e})=>Vc(e))]},stop(){for(let e of Wc)e();Ki?.abort()}});var Ag=`:is(${c.sidebarScroll}, :has(> ${c.sidebarScroll})) + :has(${c.menuButton})`,wg=`${c.rail} > :has(${c.menuButton})`,Yi=`:is(${Ag}, ${wg}, ${c.oldProfile}):not(:hover)`,Gi="[data-bloom-profile-avatar]",xg=`:is(${Yi}, ${Yi} :has(${Gi})) > :not(${Gi}, :has(${Gi}))`,$c=b({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function Sg(){let{opacity:e,fadeAvatar:t}=$c.store;return e>=100?"":`${t?Yi:xg}{opacity:${e/100}!important}`}var Xc,_c=h({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:$c,styles:Sg,start(){Xc=ve()},stop(){Xc?.()}});var ed=`/*
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
`;var N=L("bloom-star-chats"),Eg=80,Tg=60,Mg=1200,Cg=120,Ho=b({replaceReadAloud:{type:"boolean",description:"Put the star where the reply's Read aloud button is, and hide that button.",default:!0},messages:{type:"custom",default:[]}}),Lg=`:is(${c.turnActions}) ${c.readAloud}`,ji,Qi=!1,Je=!1,bt=!1,Vn=0,z=null,Jn="",I=null,Wi,Ze;function Vi(){let e=Ho.store.messages;return Array.isArray(e)?e.filter(t=>C(t)&&typeof t.conversationId=="string"&&typeof t.messageId=="string"&&(t.role==="user"||t.role==="assistant")&&typeof t.snippet=="string"&&typeof t.starredAt=="number"):[]}function Ji(){let e=v();return e?Vi().filter(t=>t.conversationId===e):[]}function kg(e,t){return Vi().some(o=>o.conversationId===e&&o.messageId===t)}function td(e){let t=Vi(),o=t.some(n=>n.conversationId===e.conversationId&&n.messageId===e.messageId);Ho.store.messages=o?t.filter(n=>!(n.conversationId===e.conversationId&&n.messageId===e.messageId)):[{...e,starredAt:Date.now()},...t].slice(0,Eg)}function zi(e){return e.messageIds[0]||e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.el.getAttribute("data-turn-key")||""}function Bg(e){return pe(Lt(e)||y(e.el.textContent??""),Tg)}function Ig(e){let t=e.closest(c.turn);if(!t)return null;let o=Qe().filter(n=>t.contains(n.el));return o.find(n=>n.el.contains(e)||n.el===t)??o.findLast(n=>n.el.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING)??null}function Pg(){let e=[...document.querySelectorAll(c.turnActions)].filter(t=>!t.closest(`[data-bloom], [role="dialog"], [inert], pre, ${c.sidebars}`));return e.filter(t=>!e.some(o=>o!==t&&o.contains(t)))}function Og(e,t){let o=Ho.store.replaceReadAloud?t.querySelector(c.readAloud):null;if(o&&!o.closest("[data-bloom]")){e.nextElementSibling!==o&&o.before(e);return}let n=Rg(t);(e.parentElement!==n||n.lastElementChild!==e)&&n.append(e)}function Rg(e){let t=[...e.querySelectorAll("button")].filter(n=>n.dataset.bloom!=="message-star"&&!n.closest("[data-bloom]"));return t.length?[...e.children].find(n=>n instanceof HTMLElement&&n!==t[0]&&t.every(r=>n.contains(r)))??e:e}function Hg(){return[...document.querySelectorAll(c.headerMore)].filter(t=>{if(t.dataset.bloom==="message-star"||t.closest("[data-bloom], [role='dialog'], [inert]")||t.closest(c.sidebars))return!1;let o=t.getBoundingClientRect();return o.width===0&&o.height===0?!!t.closest("header, #page-header"):o.top>=0&&o.top<96&&o.left>window.innerWidth*.5}).toSorted((t,o)=>o.getBoundingClientRect().left-t.getBoundingClientRect().left||(t.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1))[0]??null}function od(e,t,o){return s("button",{class:t,attrs:{type:"button","aria-label":e},on:{pointerdown:n=>n.stopPropagation(),mousedown:n=>n.stopPropagation(),click:n=>{n.preventDefault(),n.stopPropagation(),o(n)}}},k("star"))}function Dg(e,t){e.setAttribute("aria-pressed",String(t)),e.setAttribute("aria-label",t?"Unstar":"Star")}function Zn(){return Je||bt}function Wt(){Vn&&window.clearTimeout(Vn),Vn=0}function zt(){Je=!1,bt=!1,Wt(),Ze?.enter(),z?.remove(),z=null,Jn="",I?.classList.remove(N("-open")),I?.setAttribute("aria-expanded","false")}function Xn(e){return e instanceof Node&&!!(I?.contains(e)||z?.contains(e))}function Ng(e){e.classList.add(N("-flash")),window.setTimeout(()=>e.classList.remove(N("-flash")),Mg)}function Ug(e){let t=Qe().find(n=>zi(n)===e),o=t?.el.closest(c.turn)??t?.el;o&&(o.scrollIntoView({block:"start"}),Ng(o))}function Fg(){let e=v(),t=new Set,o=[...document.querySelectorAll('[data-bloom="message-star"][data-place="action"]')];if(!e||tt()){for(let n of o)n.remove();return}for(let n of Pg()){if(!be(n))continue;let r=Ig(n),i=r?zi(r):"";if(!r||!i)continue;let a=n.querySelector('[data-place="action"]');(!a||a.dataset.id!==i)&&(a?.remove(),a=od("Star",N("-star"),()=>{let u=v(),l=Qe().find(d=>zi(d)===i);!u||!l||td({conversationId:u,messageId:i,role:l.role,snippet:Bg(l)})}),a.dataset.bloom="message-star",a.dataset.place="action",a.dataset.id=i),Dg(a,kg(e,i)),Og(a,n),t.add(a)}for(let n of o)t.has(n)||n.remove()}function Kg(){if(!z||!I)return;let e=I.getBoundingClientRect(),t=z.offsetWidth||288,o=z.offsetHeight||120,n=e.bottom+6;n+o>window.innerHeight-8&&(n=Math.max(8,e.top-o-6));let r=Math.max(8,Math.min(e.right-t,window.innerWidth-t-8));z.dataset.place=n>=e.bottom?"below":"above",z.style.left=`${Math.round(r)}px`,z.style.top=`${Math.round(n)}px`}function Gg(){if(!Zn()||!I){z?.remove(),z=null,Jn="",I?.classList.remove(N("-open")),I?.setAttribute("aria-expanded","false");return}let e=Ji(),t=e.map(o=>`${o.messageId}	${o.snippet}`).join(`
`);if(!z||Jn!==t){z?.remove();let o=e.map(n=>s("div",{class:N("-row")},s("button",{class:N("-jump"),attrs:{type:"button"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),zt(),Ug(n.messageId)}}},s("span",{class:N("-role"),text:n.role==="user"?"You":"ChatGPT"}),s("span",{class:N("-snip"),text:n.snippet||"Message"})),od("Unstar",N("-unstar"),()=>td(n))));z=s("div",{class:`bloom-root ${N("-panel")}`,attrs:{"data-bloom":"star-list"},on:{pointerenter:()=>{Wt(),Ze?.enter(),bt=!0},pointerleave:n=>{Xn(n.relatedTarget)||Je||Ze?.leave(n)}}},s("div",{class:N("-bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:N("-head"),text:"Starred"}),s("div",{class:N("-body")},...o.length?o:[s("div",{class:N("-empty"),text:"No starred messages in this chat"})])),document.body.append(z),Jn=t}Kg(),I.classList.add(N("-open")),I.setAttribute("aria-expanded","true")}function Yg(){for(let r of document.querySelectorAll('[data-bloom="starred"]'))r.remove();let e=Hg(),t=e?.parentElement??null,o=v();if(!e||!t||t.closest(c.sidebars)||!o||tt()||!be(t)){I?.remove(),I=null,zt();return}I||(I=s("button",{class:N("-toggle"),attrs:{type:"button","data-bloom":"message-star","data-place":"header","aria-label":"Starred messages","aria-expanded":"false"},on:{pointerdown:r=>r.stopPropagation(),pointerenter:()=>{Wt(),Ze?.enter(),Vn=window.setTimeout(()=>{bt=!0,ht()},Cg)},pointerleave:r=>{Xn(r.relatedTarget)||(Wt(),Zn()&&Ze?.leave(r))},click:r=>{r.preventDefault(),r.stopPropagation(),Je=!Je,bt=Je,Wt(),Je||zt(),ht()}}},k("star"))),(I.parentElement!==t||I.nextElementSibling!==e)&&e.before(I);let n=e.getBoundingClientRect();n.width>0&&(I.style.width=`${n.width}px`,I.style.height=`${n.height}px`),I.classList.toggle(N("-here"),Ji().length>0),Gg()}function jg(){let e=new Set(Ji().map(t=>t.messageId));for(let t of document.querySelectorAll('[data-bloom="navigator"] .bloom-nav-tick, [data-bloom="navigator"] .bloom-nav-row'))t.classList.toggle(N("-mark"),!!t.dataset.messageId&&e.has(t.dataset.messageId))}function ht(){if(!Qi){Qi=!0;try{for(let e of document.querySelectorAll('[data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();Fg(),Yg(),jg()}finally{Qi=!1}}}function Qg(){zt(),I?.remove(),I=null;for(let e of document.querySelectorAll('[data-bloom="message-star"], [data-bloom="star-list"], [data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();for(let e of document.querySelectorAll(`.${N("-mark")}`))e.classList.remove(N("-mark"))}var nd=h({name:"StarChats",description:"Star a message from its toolbar. The star left of the top-right menu opens this chat's list.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:Ho,styles:()=>`${ed}${Ho.store.replaceReadAloud?Oe([Lg]):""}`,onSettingsChange(e){(e==="messages"||e==="replaceReadAloud")&&ht()},start(){for(let o of document.querySelectorAll('[data-bloom="star-list"]'))o.remove();Ze=vn({over:Xn,trigger:()=>I,panel:()=>z,setHeld(o){if(o){bt=!0,ht();return}Je||(bt=!1,ht())}}),ji=M(o=>U(o)&&ht());let e=o=>{Xn(o.target)||Zn()&&zt()};document.addEventListener("pointerdown",e,!0);let t=o=>{o.key!=="Escape"||!Zn()||(o.preventDefault(),zt())};document.addEventListener("keydown",t,!0),Wi=()=>{document.removeEventListener("pointerdown",e,!0),document.removeEventListener("keydown",t,!0)},ht()},stop(){ji?.(),ji=void 0,Wi?.(),Wi=void 0,Wt(),Ze?.dispose(),Ze=void 0,Qg()}});var rd="filter:blur(6px)!important;transition:filter 0.2s ease",Px=`:is(${c.sidebars})`,yt="data-bloom-streamer-open",Wg="[data-app-action-sidebar-thread-row], [data-app-action-sidebar-project-row], .bloom-recent-item",id=":not([data-app-action-sidebar-thread-row] *, [data-app-action-sidebar-project-row] *)";function zg(){return{conversations:{selectors:["[data-app-action-sidebar-thread-title]"],hover:!0,row:"[data-app-action-sidebar-thread-row]"},projects:{selectors:["[data-app-action-sidebar-project-label]"],hover:!0,row:"[data-app-action-sidebar-project-row]"},accountAvatar:{selectors:["[data-bloom-profile] img","[data-bloom-menu] img"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:[`[data-thread-title]${id}`,`[data-thread-title-trigger]${id}`],hover:!1}}}var ad=b({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function Vg(e,t){let o=[`:is(${e}):hover`,`.bloom-recent-item:hover :is(${e})`,`:is(${e})[${yt}]`];return t&&o.push(`${t}:hover`,`${t}:hover :is(${e})`,`${t}:is(${e}):hover`,`${t}[${yt}]`,`${t}[${yt}] :is(${e})`),o.join(",")}function Jg(){let e=zg();return Object.entries(e).filter(([t])=>ad.store[t]).map(([,t])=>{let o=t.selectors.join(",");if(!t.hover)return`:is(${o}){${rd}}`;let n="row"in t?t.row:void 0;return`:is(${o}){${rd}}${Vg(o,n)}{filter:none!important}`}).join(`
`)}function Zg(e,t){for(let o of document.elementsFromPoint(e,t))if(o instanceof Element){let n=o.closest(Wg);if(n)return n}return null}function $i(e){for(let t of document.querySelectorAll(`[${yt}]`))t!==e&&t.removeAttribute(yt);e&&!e.hasAttribute(yt)&&e.setAttribute(yt,"")}var Vt,Xg=Re(()=>{Vt&&$i(Zg(Vt.clientX,Vt.clientY))});function Zi(e){Vt=e,Xg()}function $g(e){e.relatedTarget instanceof Node&&document.documentElement.contains(e.relatedTarget)||(Vt=void 0,$i(null))}var Xi,$n,sd=h({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:ad,styles:Jg,start(){Xi=ve(),$n=new AbortController;let e={capture:!0,signal:$n.signal,passive:!0};document.addEventListener("pointerover",Zi,e),document.addEventListener("pointermove",Zi,e),document.addEventListener("pointerout",Zi,e),window.addEventListener("pointerleave",$g,e)},stop(){$n?.abort(),$n=void 0,Vt=void 0,$i(null),Xi?.(),Xi=void 0}});var Xe=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)','[data-turn-key] [data-message-author-role="user"] blockquote:not(.twitter-tweet)','[class~="group/user-message"] blockquote:not(.twitter-tweet)'].join(","),_i=b({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function _g(){let e=[`${Xe}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${Xe}>*{margin-block:0!important}`];return _i.store.italic||e.push(`${Xe}{font-style:inherit!important}`),_i.store.quotes||(e.push(`${Xe}{quotes:none!important}`),e.push(`${Xe}::before,${Xe}::after,${Xe} p::before,${Xe} p::after{content:none!important}`)),e.join(`
`)}var ld=h({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:_i,styles:_g});var eh=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],th=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",oh='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',cd=b({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function nh(){let e=`${cd.store.width}rem`;return`:root,[data-app-action-timeline-scroll],[data-chatgpt-composer],[data-composer-input]{--thread-content-max-width:${e}!important;--composer-adjacent-max-width:${e}!important}`}var dd=h({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:cd,styles:nh});var rh=[Ns,cs,pl,xl,El,Cl,kl,Nl,Vl,oc,lc,Ec,Mc,Cc,Pc,Gc,Zc,_c,nd,sd,ld,dd],ea=rh;var ih=new x("Bloom"),ud="2.0.99";var ta=0,_n,Do="__bloomOnShortcut";function er(e){if(e.isComposing||!e.shiftKey||!(e.metaKey||e.ctrlKey)||e.key!=="b"&&e.key!=="B")return;e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation();let t=As();Ge();for(let o of document.querySelectorAll("[data-bloom='settings']"))o.remove();t||Mt()}function ah(){let e=se;e[Do]&&document.removeEventListener("keydown",e[Do],!0),e[Do]=er,document.addEventListener("keydown",er,!0)}function sh(){ta++,document.removeEventListener("keydown",er,!0);let e=se;e[Do]===er&&delete e[Do],_n?.(),_n=void 0,Da(),$t(),Yo()}async function oa(){let e=++ta,t=()=>e===ta;$t(),Yo();for(let o of ea)o.updatedAt=es[o.name];qa(ea),Aa(),Ta(),Ko("base",Ua),$a(),ah(),en("Init"),yr().then(()=>{t()&&(ua(),en("DOMContentLoaded"))}),await vr(),t()&&(en("HostReady"),_n?.(),_n=Ss(),Ha(),ih.info(`Bloom++ ${ud} app host ready`))}var lh=new x("Boot");window===window.top&&(pa(se.Bloom),fa(na),oa().catch(e=>lh.error("Startup failed",e)));})();
