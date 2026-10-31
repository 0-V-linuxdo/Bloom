// ==UserScript==
// @name         Bloom++ (ChatGPT app)
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.106
// @description  Bloom++ host for the official ChatGPT macOS app. Injected over loopback CDP; not a web userscript.
// @author       0-V-linuxdo & Bloom contributors
// @homepageURL  https://github.com/0-V-linuxdo/Bloom
// @supportURL   https://github.com/0-V-linuxdo/Bloom/issues
// @match        app://*/*
// @run-at       document-start
// @grant        none
// @license      GPL-3.0-or-later
// ==/UserScript==

/* Bloom++ v2.0.106 ChatGPT app host. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Mu=Object.defineProperty;var Cu=(t,e)=>{for(var o in e)Mu(t,o,{get:e[o],enumerable:!0})};var q=class{constructor(e){this.tag=e}log(e,o){console[e](`[Bloom++] [${this.tag}]`,...o)}debug(...e){this.log("debug",e)}info(...e){this.log("info",e)}warn(...e){this.log("warn",e)}error(...e){this.log("error",e)}};var nt=(t,e,o)=>Math.min(o,Math.max(e,t)),C=t=>typeof t=="object"&&t!==null&&!Array.isArray(t),$e=t=>`${t}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,ht=(t,e)=>t.length>e?`${t.slice(0,e-1)}\u2026`:t,v=t=>t.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function ga(t,e){return`${t} ${e}${t===1?"":"s"}`}async function Go(t){if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}await navigator.clipboard.writeText(t)}function Yo(t){try{return JSON.parse(t)}catch{return}}var dt=typeof unsafeWindow>"u"?window:unsafeWindow,Lu=200,ku=300;function jo(t){return new Promise((e,o)=>GM_xmlhttpRequest({url:t,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=Lu&&n<ku?e(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var Iu=new q("Styles"),Ht=new Map,Xe=new Set,te=new Map,mr=!0,ha=t=>t.replaceAll(/[^A-Za-z0-9_-]/g,"_"),Bu=t=>`:where(:root){--bloom-sheet-${ha(t)}:1}`,Pu=(t,e)=>`${Bu(t)}${e}`,ba=t=>`bloom-style-${t}`;function ya(t){try{return[...t.cssRules].map(e=>e.cssText).join(`
`)}catch{return""}}function Ou(t,e){let o=ya(t);return o?o.includes(`--bloom-sheet-${ha(e)}`)?!0:e==="plugin-StreamerMode"?o.includes("blur(6px)")&&(o.includes("data-app-action-sidebar-thread-title")||o.includes("data-bloom-streamer-open")):e==="plugin-WiderChat"?o.includes("--composer-adjacent-max-width")&&o.includes("--thread-content-max-width"):e==="plugin-ComposerOpacity"?o.includes("--composer-layout-surface-backdrop-filter")||o.includes("--composer-layout-surface-background")&&o.includes("color-mix"):!1:!1}function va(t){let e=ya(t);return e?!!(e.includes("--bloom-")||e.includes(".bloom-")||e.includes("[data-bloom")||e.includes("--bloom-sheet-")||e.includes("blur(6px)")&&e.includes("data-app-action-sidebar-thread-title")||e.includes("--composer-adjacent-max-width")&&e.includes("--thread-content-max-width")||e.includes("--composer-layout-surface-backdrop-filter")):!1}function Aa(){let t=document.adoptedStyleSheets.filter(e=>!Xe.has(e)&&!va(e));document.adoptedStyleSheets=[...t,...Ht.values()]}function wa(t){document.readyState==="loading"||t.parentNode===document.head||document.head.append(t)}function Ru(t,e){let o=te.get(t);o||(o=document.createElement("style"),o.id=ba(t),te.set(t,o)),o.textContent!==e&&(o.textContent=e),wa(o)}function Qo(t,e){let o=Pu(t,e);if(mr)try{let n=Ht.get(t);n||(n=new dt.CSSStyleSheet,Ht.set(t,n),Xe.add(n)),n.replaceSync(o),Aa();return}catch(n){Iu.warn("Constructed style sheets unavailable, using <style> after parsing",n),mr=!1;let r=Ht.get(t);r&&Xe.delete(r),Ht.delete(t)}Ru(t,o)}function _e(t){let e=Ht.get(t);e&&(Xe.delete(e),Ht.delete(t)),te.get(t)?.remove(),te.delete(t);for(let o of document.querySelectorAll(`style[id="${ba(t)}"]`))o.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(o=>o!==e&&!Ou(o,t)),mr&&Aa()}catch{}}function to(){Ht.clear(),Xe.clear();for(let t of te.values())t.remove();te.clear();for(let t of document.querySelectorAll("style[id^='bloom-style-']"))t.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(t=>!va(t))}catch{}}function xa(){for(let t of te.values())wa(t)}var L=t=>(...e)=>e.map(o=>t+o).join(" "),Wo=(...t)=>t.filter(Boolean).join(" "),Dt=t=>t.length?`${t.map(e=>`${e}:not([data-bloom])`).join(",")}{display:none!important}`:"";var Sa="__bloomHost",pr=new q("Boot"),Hu=['[data-bloom="navigator"]','[data-bloom="settings"]','[data-bloom="history-hud"]','[data-bloom="history-dialog"]','[data-bloom="star-list"]','[data-bloom="entry"]','[data-bloom="menu-entry"]','[data-bloom="menu-flyout"]','[data-bloom="message-star"]','[data-bloom="starred"]','[data-bloom="chat-star"]','[data-bloom="queue"]','[data-bloom="recent"]','[data-bloom="quote-chip"]','[data-bloom="quote-back"]','[data-bloom="cls"]','[data-bloom="timestamp"]','[data-bloom="tooltip"]','[data-bloom="notices"]'].join(", "),Du=["data-bloom-greeting","data-bloom-placeholder","data-bloom-streamer-open","data-bloom-share","data-bloom-invite","data-bloom-csi-avatar","data-bloom-csi-sized"];function zo(){if(!(typeof document>"u"||!document.documentElement)){for(let t of document.querySelectorAll(Hu))t.remove();for(let t of Du)for(let e of document.querySelectorAll(`[${t}]`))e.removeAttribute(t);for(let t of document.querySelectorAll("[data-bloom-text]"))t.removeAttribute("data-bloom-text"),t.style.removeProperty("--bloom-text-size"),t.style.removeProperty("--bloom-text")}}function Nu(t){if(pr.warn("Replacing another Bloom++ instance",t.VERSION),t.destroy){t.destroy();return}for(let e of t.plugins?.values()??[]){try{e.stop?.()}catch(o){pr.error("Failed to stop previous plugin",o)}e.styles="",e.start=void 0}to()}function qa(t){let e=dt,o=new Set;for(let n of[t,e.Bloom,e[Sa]])if(!(!n||o.has(n))){o.add(n);try{Nu(n)}catch(r){pr.error("Failed to retire Bloom++",r)}}zo()}function Ea(t){let e=dt;try{delete e.Bloom}catch{}Object.defineProperty(e,"Bloom",{value:t,configurable:!0,writable:!0}),Object.defineProperty(e,Sa,{value:t,configurable:!0,writable:!0})}var fa={};Cu(fa,{VERSION:()=>Tu,destroy:()=>Ch,init:()=>pa,plugins:()=>V});var Uu=new q("Dom");function a(t,e={},...o){let n=document.createElement(t);e.class&&(n.className=e.class),e.text!=null&&(n.textContent=e.text),e.title&&(n.title=e.title);for(let[r,i]of Object.entries(e.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(e.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var Ta=document.createElement("template");function Ma(t){return Ta.innerHTML=t.trim(),Ta.content.firstElementChild.cloneNode(!0)}var rt=t=>t instanceof HTMLElement&&t.isConnected&&t.getClientRects().length>0&&!t.closest("[inert]"),bt=(t,e=document)=>[...e.querySelectorAll(t)].find(rt)??null,Fu=16,Ku="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function Zo(t,e){let o=setInterval(t,e),n;try{n=new Worker(URL.createObjectURL(new Blob([Ku],{type:"text/javascript"}))),n.addEventListener("message",t),n.postMessage(e)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function fr(t){document.hidden?setTimeout(t,Fu):requestAnimationFrame(t)}function Nt(t){let e=!1;return()=>{e||(e=!0,fr(()=>{e=!1;try{t()}catch(o){Uu.error("Scheduled task failed",o)}}))}}var Vo=new Set,Jo=[],eo,Gu=Nt(()=>{let t=Jo;Jo=[];for(let e of Vo)e(t)});function M(t){return Vo.add(t),eo||(eo=new MutationObserver(e=>{Jo.push(...e),Gu()}),eo.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),t([]),()=>{Vo.delete(t),!Vo.size&&(eo?.disconnect(),eo=void 0,Jo=[])}}var Yu=t=>t instanceof Element&&(t.hasAttribute("data-bloom")||!!t.closest("[data-bloom]")),K=t=>!t.length||t.some(e=>!Yu(e.target)),ju=t=>`"${t.replaceAll("\\","\\\\").replaceAll('"','\\"').replaceAll(`
`,"\\A ")}"`;function ee(t,e){if(e==null){t.removeAttribute("data-bloom-text"),t.style.removeProperty("--bloom-text-size"),t.style.removeProperty("--bloom-text");return}t.style.setProperty("--bloom-text",ju(e)),t.getAttribute("data-bloom-text")!==e&&t.setAttribute("data-bloom-text",e)}function h(t){return t}var Qu=new q("Storage");function $o(t){try{return localStorage.getItem(t)??void 0}catch{return}}function Xo(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch(o){Qu.warn("localStorage write failed",o)}}function Ca(t,e){addEventListener("storage",o=>{o.key===t&&e(o.newValue)})}var gr="BloomSettings",Wu=100,Ut={plugins:{}},_o=new Set,hr=new Set,we;function La(t){let e=t;for(let o=0;typeof e=="string"&&o<2;o++)e=Yo(e);return!C(e)||!C(e.plugins)||!Object.keys(e.plugins).length?null:e}function ka(){let t=La($o(gr));t&&(Ut.plugins=t.plugins)}var Ia=(t,e)=>`${t}
${e}`;function br(){we=void 0,hr.clear(),Xo(gr,Ut)}function zu(t){let e=La(t);if(!e)return;let o=[];for(let n of new Set([...Object.keys(Ut.plugins),...Object.keys(e.plugins)])){let r=Ut.plugins[n]??={},i=C(e.plugins[n])?e.plugins[n]:{};for(let s of new Set([...Object.keys(r),...Object.keys(i)]))hr.has(Ia(n,s))||JSON.stringify(r[s])===JSON.stringify(i[s])||(i[s]===void 0?delete r[s]:r[s]=i[s],o.push([n,s]))}for(let[n,r]of o)for(let i of _o)i(n,r)}function yr(){we&&(clearTimeout(we),br())}function Ba(t){let e=Object.keys(Ut.plugins).filter(o=>!t.has(o));if(!e.length)return e;for(let o of e)delete Ut.plugins[o];return clearTimeout(we),br(),e}var it=(t,e)=>Ut.plugins[t]?.[e];function mt(t,e,o){let n=Ut.plugins[t]??={};o===void 0?delete n[e]:n[e]=o,hr.add(Ia(t,e)),clearTimeout(we),we=setTimeout(br,Wu);for(let r of _o)r(t,e)}function xe(t){return _o.add(t),()=>void _o.delete(t)}function vr(t){return t.type==="component"?void 0:t.default}function y(t){let e={def:t,pluginName:"",store:new Proxy({},{get:(o,n)=>it(e.pluginName,n)??(t[n]&&vr(t[n])),set:(o,n,r)=>(mt(e.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(t))t[o].type!=="custom"&&it(e.pluginName,o)!==void 0&&mt(e.pluginName,o)}};return e}var Pa=t=>{let e=()=>{let o=it("Settings",t);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>e().includes(o),list:e,toggle(o){let n=e();mt("Settings",t,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},tn=Pa("pinnedPlugins"),en=Pa("starredPlugins");addEventListener("pagehide",yr);Ca(gr,zu);var ro=new q("PluginManager"),V=new Map,Ft=new Set,nn=new Set,Ar=new Set,oo=new Map,Vu=2880*60*1e3;function Oa(t){for(let e of t)e.settings&&(e.settings.pluginName=e.name),V.set(e.name,e)}var Ra=()=>{let t=it("Settings","knownPlugins");return C(t)?t:null};function Ha(){let t=Ba(new Set(V.keys()));t.length&&ro.info(`Dropped settings of removed plugins: ${t.join(", ")}`);let e=Ra(),o=Date.now(),n={...e},r=[...V.values()].filter(i=>!i.hidden&&!i.required&&!(i.name in n));for(let i of r)n[i.name]=e?o:0;for(let i of Object.keys(n))V.has(i)||delete n[i];JSON.stringify(n)!==JSON.stringify(e)&&mt("Settings","knownPlugins",n)}var Da=t=>{let e=Ra()?.[t];return!!e&&Date.now()-e<Vu},Na=t=>oo.get(t);function Ua(){for(let t of Ar)t()}function wr(t,e){let o=oo.get(t);(e?o?.join(`
`)===e.join(`
`):!o)||(e?oo.set(t,e):oo.delete(t),Ua())}var Mt=t=>!!t.required||(it(t.name,"enabled")??!!t.enabledByDefault),xr=t=>Ft.has(t),no=t=>`plugin-${t.name}`;function Fa(t){if(!t.styles)return;let e=typeof t.styles=="function"?t.styles():t.styles;e?Qo(no(t),e):_e(no(t))}function Ka(t){if(!Ft.has(t.name))try{Fa(t),t.start?.(),Ft.add(t.name)}catch(e){_e(no(t)),ro.error(`Failed to start ${t.name}`,e)}}function rn(t){Ft.delete(t.name),_e(no(t));try{t.stop?.()}catch(e){ro.error(`Failed to stop ${t.name}`,e)}}var Sr=t=>t.startAt??"HostReady";function Ga(t){if(Mt(t)){nn.has(Sr(t))&&Ka(t);return}rn(t)}function an(t){nn.add(t);for(let e of V.values())Sr(e)===t&&Ga(e);ro.info(`${t}: ${[...Ft].join(", ")}`)}function Ya(t){rn(t)}function ja(t){Mt(t)&&nn.has(Sr(t))&&Ka(t)}function Qa(t,e){mt(t.name,"enabled",e),yr()}function Ju(){for(let t of V.values())t.required||Mt(t)||(Ft.has(t.name)?rn(t):_e(no(t)))}var on;function Wa(){on?.(),on=M(()=>Ju())}function za(){on?.(),on=void 0;for(let t of V.values())rn(t);Ft.clear(),nn.clear(),oo.clear()}function Va(t){return Ar.add(t),()=>void Ar.delete(t)}xe((t,e)=>{let o=V.get(t);if(o){if(e==="enabled"){typeof it(t,"enabled")=="boolean"&&Ga(o),Ua();return}if(Ft.has(t))try{Fa(o),o.onSettingsChange?.(e)}catch(n){ro.error(`Settings change failed for ${t}`,n)}}});var Ja=`/*
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
`;var $u=new q("Events");function Se(){let t=new Map;return{on(e,o){let n=t.get(e);return n||t.set(e,n=new Set),n.add(o),()=>void n.delete(o)},emit(e,o){for(let n of t.get(e)??[])try{n(o)}catch(r){$u.error(`Listener for ${String(e)} failed`,r)}}}}function Za(t,e){let o=t instanceof Element?[t,...t.querySelectorAll("*")]:[...t.querySelectorAll("*")];for(let n of o){let r=n.shadowRoot;r&&(e(r),Za(r,e))}}function Kt(t,e=document){let o=[...e.querySelectorAll(t)];return Za(e,n=>o.push(...n.querySelectorAll(t))),o}var Ct=(t,e=document)=>Kt(t,e).find(rt)??null;var c={rail:"[data-app-navigation-rail]",sidebarScroll:"[data-app-action-sidebar-scroll]",sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"[data-app-action-sidebar-scroll]",oldRail:"[data-app-navigation-rail]",oldProfile:'button[aria-label="Open profile menu" i]',threadRow:"[data-app-action-sidebar-thread-row]",threadSelected:"[data-app-action-sidebar-thread-row][data-app-action-sidebar-thread-selected='true']",threadTitle:"[data-app-action-sidebar-thread-title]",projectRow:"[data-app-action-sidebar-project-row]",projectLabel:"[data-app-action-sidebar-project-label]",destination:"[data-sidebar-destination]",conversationLink:"[data-app-action-sidebar-thread-row]",timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:"[data-turn-key]",turn:"[data-turn-key]",messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",userBubble:'[class~="group/user-message"]',assistantReply:"[data-response-annotation-target]",oldThread:"[data-app-action-timeline-scroll]",turnActions:'.turn-action-controls, [class*="turn-action-controls"]',readAloud:'button:is([aria-label="Read aloud" i], [aria-label^="Read aloud" i], [aria-label="Stop reading" i], [aria-label^="Stop reading" i], [aria-label="\u6717\u8BFB"], [aria-label^="\u6717\u8BFB"], [aria-label="\u505C\u6B62\u6717\u8BFB"], [data-testid*="read-aloud" i])',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery, [class*='recovery']",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composer:"[data-chatgpt-composer], [data-composer-input]",composerInput:'[data-composer-input] [contenteditable="true"].ProseMirror, [contenteditable="true"].ProseMirror',composerConversation:"[data-above-composer-conversation-id]",oldComposerForm:"[data-chatgpt-composer]",sendButton:'button[aria-label="Send" i], button[aria-label="Send prompt" i], button[aria-label="Send message" i]',stopButton:'button[aria-label="Stop" i], button[aria-label^="Stop " i], button[aria-label="\u505C\u6B62" i], button[aria-label^="\u505C\u6B62"]',composerFooter:"[data-chatgpt-composer]",modelTrigger:'button[aria-label="Model selector" i], button[aria-label="Select ChatGPT model" i], [data-chatgpt-composer] button[aria-haspopup="menu"]',modelItem:'[role="menu"] [role="menuitemradio"], [role="menu"] [role="menuitem"]',effortSlider:'[role="menu"] [data-reasoning-slider]',homeHeading:'main h1:not([aria-hidden="true"]), [role="main"] h1:not([aria-hidden="true"]), [data-testid="home-heading"], [data-homepage-takeover] h1, .heading-xl, [class~="heading-xl"]',headerMore:'button[aria-label="More" i], button[aria-label="\u66F4\u591A"]',headerTitle:"[data-thread-title], [data-thread-title-trigger]",profile:'button[aria-label="Open profile menu" i]',rightPanel:"aside[data-app-shell-focus-area='right-panel']",summaryPanel:"[data-summary-panel-variant]"};var $a=/[​-‍﻿]/g,pt=()=>Ct(c.composerInput),io=t=>t instanceof HTMLElement&&t.matches(c.composerInput),st=(t=pt())=>t?.closest("form")??t?.closest(c.composer)??Ct(c.composer);function z(t=pt()){if(!t)return"";if(t instanceof HTMLTextAreaElement)return t.value.replace($a,"").trim();let e=t.cloneNode(!0);for(let n of e.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...e.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:e.textContent??"").replace($a,"").trim()}var Xu=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function Xa(t,e){let o=e?"insertText":"deleteContentBackward";t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:o,data:e||null})),t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:o,data:e||null}))}function Lt(t,e=pt()){if(!e)return!1;if(e.focus(),e instanceof HTMLTextAreaElement)return Xu?.call(e,t),e.dispatchEvent(new Event("input",{bubbles:!0})),e.setSelectionRange(t.length,t.length),!0;let o=getSelection();return o?.selectAllChildren(e),typeof document.execCommand=="function"?t?document.execCommand("insertText",!1,t):document.execCommand("delete"):Xa(e,t),z(e)!==t.trim()&&Xa(e,t),o?.selectAllChildren(e),o?.collapseToEnd(),!0}function _a(t,e){let o=t;for(;o&&o!==e;){if(o instanceof HTMLElement&&o.parentElement===e)return o;o=o.parentNode}return null}function ts(t,e,o){let n=document.createRange();return n.selectNodeContents(t),o?n.setEnd(e.startContainer,e.startOffset):n.setStart(e.endContainer,e.endOffset),n.toString().includes(`
`)?!0:!!n.cloneContents().querySelector("br")}function es(t){if(t instanceof HTMLTextAreaElement){let{selectionStart:p,selectionEnd:S,value:f}=t;return{first:!f.slice(0,p).includes(`
`),last:!f.slice(S).includes(`
`)}}let e=getSelection();if(!e?.rangeCount||!t.contains(e.anchorNode))return{first:!0,last:!0};let o=e.getRangeAt(0),n=[...t.children].filter(p=>p instanceof HTMLElement),r=_a(o.startContainer,t),i=_a(o.endContainer,t),s=!r||r===n[0],d=!i||i===n[n.length-1],l=o.getBoundingClientRect(),u=(r??t).getBoundingClientRect(),m=Number.parseFloat(getComputedStyle(r??t).lineHeight)||24;return l.height?{first:s&&l.top-u.top<m,last:d&&u.bottom-l.bottom<m}:{first:s&&!ts(r??t,o,!0),last:d&&!ts(i??t,o,!1)}}var os=t=>{let e=st();return(e&&Ct(t,e))??Ct(t)},qr=()=>os(c.stopButton),_u=()=>{let t=os(c.sendButton);return t&&!t.matches(c.stopButton)?t:null};function ns(){let t=_u();if(t){t.disabled||t.click();return}pt()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var rs=()=>rt(qr());var sn=new q("AppProtocol"),ao=Se();function td(t){let e=t;if(typeof e=="string")try{e=JSON.parse(e)}catch{return null}if(Array.isArray(e)||!e||typeof e!="object")return null;let o=e,n=o.notification&&typeof o.notification=="object"?o.notification:o;if(typeof n.method!="string")return null;let r=n.params&&typeof n.params=="object"?n.params:void 0;return{method:n.method,params:r}}function so(t){if(Array.isArray(t)){for(let o of t)so(o);return}let e=td(t);e&&ao.emit("note",e)}var Tr=new WeakMap,Er=new WeakMap;function ed(t,e){let o=Tr.get(t);if(o)return o;let n=r=>{so(r.data),typeof t=="function"?t.call(e,r):t.handleEvent(r)};return Tr.set(t,n),n}function od(){let t=MessagePort.prototype,e=t.addEventListener,o=t.removeEventListener;t.addEventListener=function(r,i,s){return r!=="message"?e.call(this,r,i,s):e.call(this,r,ed(i,this),s)},t.removeEventListener=function(r,i,s){return r!=="message"?o.call(this,r,i,s):o.call(this,r,Tr.get(i)??i,s)};let n=Object.getOwnPropertyDescriptor(t,"onmessage");n?.set&&Object.defineProperty(t,"onmessage",{configurable:!0,enumerable:n.enumerable,get(){return Er.has(this)?Er.get(this):n.get?.call(this)},set(r){Er.set(this,r),n.set.call(this,function(s){so(s.data),r?.call(this,s)})}})}function nd(){let t=window.electronBridge,e=t?.subscribeToWorkerMessages;if(!(!t||typeof e!="function"))try{t.subscribeToWorkerMessages=(o,n)=>e.call(t,o,r=>{so(r),n(r)})}catch(o){sn.warn("electronBridge.subscribeToWorkerMessages is not writable",o)}}function rd(){addEventListener("message",t=>so(t.data));try{od()}catch(t){sn.warn("MessagePort wrap failed",t)}try{nd()}catch(t){sn.warn("electronBridge wrap failed",t)}sn.info("Listening for app-server notifications")}rd();var id=new q("AppRoute"),ad=500,cn=new Set,un=null,ln;function b(){return Kt(c.threadRow).find(e=>{let o=e.getAttribute("data-app-action-sidebar-thread-selected"),n=e.getAttribute("data-app-action-sidebar-thread-active"),r=e.getAttribute("aria-current");return o==="true"||n==="true"||r==="page"||r==="true"})?.getAttribute("data-app-action-sidebar-thread-id")??null}var dn=()=>!b(),as=()=>!1,oe=()=>!1;function is(){let t=b();if(t===un)return;let{href:e}=location,o={prevHref:e,href:e,prevId:un,id:t};un=t;for(let n of cn)try{n(o)}catch(r){id.error("Route listener failed",r)}}function sd(){let t=new MutationObserver(is);(()=>{document.body&&t.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-app-action-sidebar-thread-selected","data-app-action-sidebar-thread-id"]})})();let o=setInterval(is,ad);return()=>{t.disconnect(),clearInterval(o)}}function yt(t){return cn.add(t),ln||(un=b(),ln=sd()),()=>{cn.delete(t),!cn.size&&(ln?.(),ln=void 0)}}var ld=250,cd=400,O=Se(),ne=!1,qe=null,ae=!1,re="done",ie=!1,ss=!1,tt=()=>({generating:ne,conversationId:b()}),ud=t=>{if(!t)return!0;let e=b();return e?e===t||e.endsWith(t)||t.endsWith(e.replace(/^local:/,"")):!0};function dd(t){return t==="interrupted"||t==="aborted"||t==="cancelled"?"stopped":t==="failed"||t==="error"?"error":"done"}function md(){return ie||rs()}function pd(t){qe=null,ne=!1,ie=!1,O.emit("fall",{conversationId:b(),outcome:t}),ae=!1,re="done"}function fd(){let t=md();t&&!ne&&(ne=!0,ae=!1,re="done",O.emit("rise",{conversationId:b()})),t||!ne?qe=null:qe==null?qe=Date.now():Date.now()-qe>=cd&&pd(ae?"stopped":re)}function lo(){fd(),O.emit("tick",tt())}function gd({prevId:t,id:e}){t!==e&&(ne&&(ie=!1,qe=null,ne=!1,ae=!1,re="done",O.emit("fall",{conversationId:t,outcome:"left"})),O.emit("context",{prevId:t,id:e,migrated:!t&&!!e}),lo())}function hd(t){if(ud(t.params?.threadId)){if(t.method==="turn/started"){ie=!0,lo();return}if(t.method==="turn/interrupt"){ie=!1,re="stopped",ae=!0,lo();return}t.method==="turn/completed"&&(ie=!1,re=dd(t.params?.turn?.status),re==="stopped"&&(ae=!0),lo())}}function bd(t){t.target instanceof Element&&t.target.closest(c.stopButton)&&(ae=!0,ie=!1)}function ls(){ss||(ss=!0,ao.on("note",hd),yt(gd),document.addEventListener("click",bd,!0),Zo(lo,ld))}var yd="__reactContainer$",cs="__reactFiber$";function Cr(){return document.readyState!=="loading"?Promise.resolve():new Promise(t=>document.addEventListener("DOMContentLoaded",()=>t(),{once:!0}))}var Mr=(t,e)=>Object.keys(t.wrappedJSObject??t).some(o=>o.startsWith(e)),vt=t=>!Mr(document,yd)||Mr(t,cs);function Gt(){return document.body?Promise.resolve():new Promise(t=>{let e=new MutationObserver(()=>{document.body&&(e.disconnect(),t())});e.observe(document,{childList:!0,subtree:!0})})}async function Lr(){await Gt();let t=Date.now()+8e3;for(;!Mr(document.body,cs)&&Date.now()<t;)await new Promise(e=>setTimeout(e,100))}var us={BetterNavigator:1793458775e3,BetterQuotes:1793365944e3,ChatListStatus:1793351872e3,ChatStateFavicons:1790623094e3,Cleaner:1793267811e3,CompleteToast:1793354069e3,ComposerOpacity:1793344667e3,Continue:1790939902e3,CustomSidebarIdentity:1790658669e3,GreetingCustomizer:1793350808e3,InputHistory:1793365944e3,MessageTimestamps:1791080494e3,NoDictation:1793335268e3,NoShareLink:1790658669e3,NoSidebarIdentity:1790616549e3,PromptQueue:1793365944e3,RecentTopics:1793365944e3,ResponseNotification:1793354069e3,Settings:1793448244e3,SidebarIdentityOpacity:1790682605e3,StarChats:1793365944e3,StreamerMode:1793344667e3,TemporaryChat:1792014624e3,UserQuotes:1793345744e3,WiderChat:179333264e4};var E=t=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`,vd="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",Ad={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${vd}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:E('<path d="M18 6 6 18M6 6l12 12"/>'),gear:E('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:E('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:E('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:E('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:E('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:E('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:E('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:E('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:E('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:E('<path d="m6 9 6 6 6-6"/>'),play:E('<path d="M7 4v16l13-8z"/>'),plus:E('<path d="M12 5v14M5 12h14"/>'),check:E('<path d="m5 12 5 5 9-10"/>'),alert:E('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:E('<path d="M4 5h16v11H9l-5 4z"/>'),layout:E('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:E('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:E('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:E('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:E('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:E('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:E('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:E('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:E('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:E('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:E('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:E('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:E('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:E('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:E('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:E('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),folder:E('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),ghost:E('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},k=t=>Ma(Ad[t]);function kr(t){if(typeof t.showPopover=="function"){t.setAttribute("popover","manual");try{t.showPopover()}catch{t.matches(":popover-open")||t.removeAttribute("popover")}}}function At(t,e=document.body){e.append(t),kr(t)}var ft="data-bloom-tip",Ir=6,Br=8,se,ds=null;function Ee(t){if(t===ds)return;if(ds=t,!t){se?.remove();return}se??=a("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),se.textContent=t.getAttribute(ft),At(se);let e=t.getBoundingClientRect(),{width:o,height:n}=se.getBoundingClientRect(),r=e.bottom+Ir+n<=innerHeight-Br;se.style.left=`${nt(e.left+e.width/2-o/2,Br,innerWidth-o-Br)}px`,se.style.top=`${r?e.bottom+Ir:e.top-Ir-n}px`}var ms=t=>t instanceof Element?t.closest(`[${ft}]`):null;function ps(){let t=new AbortController,e={passive:!0,signal:t.signal};return document.addEventListener("pointerover",o=>Ee(ms(o.target)),e),document.addEventListener("pointerout",o=>o.relatedTarget||Ee(null),e),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&Ee(ms(o.target)),e),document.addEventListener("focusout",()=>Ee(null),e),document.addEventListener("pointerdown",()=>Ee(null),e),()=>{t.abort(),Ee(null)}}function Yt(t,e,o,n=!1){let r=a("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(t),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let s=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(s)),e(s)===!1&&r.setAttribute("aria-checked",String(!s))}),r}function N(t,e,o){return a("button",{class:Wo("bloom-button",o&&`bloom-button-${o}`),text:t,attrs:{type:"button","data-bloom":"control"},on:{click:e}})}function Q(t,e,o,n){let r=a("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":e,"data-bloom":"control",[ft]:e},on:{click:o}},k(t));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function mn(t,e,o,n,r,i){let s=a("input",{attrs:{type:"range",min:String(e),max:String(o),step:String(n)}});s.value=String(t);let d=a("output",{text:`${s.value}${r}`});return s.addEventListener("input",()=>{d.textContent=`${s.value}${r}`,i(Number(s.value))}),a("div",{class:"bloom-slider"},s,d)}function Pr(t,e,o){let n=a("select",{class:"bloom-select"},...e.map(r=>a("option",{text:r.label,attrs:{value:r.value}})));return n.value=t,n.addEventListener("change",()=>o(n.value)),n}function co(t,e,o="",n="text"){let r=a("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=t,r.addEventListener("change",()=>e(r.value)),r}var pn=["showSidebarEntry","showSidebarEntryOnHover","showAccountMenuEntry"],fs=1,Te={showSidebarEntry:!0,showSidebarEntryOnHover:!1,showAccountMenuEntry:!1},Or=t=>Object.hasOwn(Te,t),Rr=t=>it("Settings",t)??Te[t],gs=(t,e)=>!Or(t)||e!==!1||pn.some(o=>o!==t&&Rr(o));function hs(){if(it("Settings","entryRevision")!==fs){for(let t of pn)mt("Settings",t);mt("Settings","entryRevision",fs)}}var wd=new q("Themes"),xd=/^https:\/\/\S+\.css(?:[?#]|$)/i,Sd=/\/\*\*[^]*?@name[ \t]+([^\n*]+)/,G=y({themes:{type:"custom",default:[]},quickCss:{type:"custom",default:""},quickCssEnabled:{type:"custom",default:!0}});async function bs(t){let e=new TextDecoder().decode(await jo(t));if(!e.trim())throw new Error("Theme file is empty.");return e}var fn=(t,e)=>{G.store.themes=G.store.themes.map(o=>o.id===t?{...o,...e}:o)},ys=t=>{G.store.themes=G.store.themes.filter(e=>e.id!==t)};async function vs(t){if(!xd.test(t))throw new Error("Enter an https URL that ends in .css.");if(G.store.themes.some(n=>n.url===t))throw new Error("This theme is already added.");let e=await bs(t),o=e.match(Sd)?.[1]?.trim()||decodeURIComponent(new URL(t).pathname.split("/").pop()??t).replace(/\.css$/i,"").replaceAll(/[-_]/g," ");G.store.themes=[...G.store.themes,{id:$e("theme"),name:o,url:t,css:e,enabled:!0}]}function As(t,e,o){if(!e.trim())throw new Error("Name is required.");if(!o.trim())throw new Error("CSS is required.");t?fn(t,{name:e.trim(),css:o}):G.store.themes=[...G.store.themes,{id:$e("theme"),name:e.trim(),css:o,enabled:!0}]}async function qd(){await Promise.all(G.store.themes.filter(t=>t.url&&t.enabled).map(async({id:t,url:e,name:o})=>{try{let n=await bs(e??"");G.store.themes.find(r=>r.id===t)?.css!==n&&fn(t,{css:n})}catch(n){wd.warn(`Failed to refresh theme "${o}"`,n)}}))}var ws=h({name:"Themes",description:"Applies Bloom++ themes and Quick CSS.",authors:["Bloom contributors"],tags:[],icon:"spark",required:!0,hidden:!0,startAt:"Init",settings:G,styles:()=>[...G.store.themes.filter(t=>t.enabled).map(t=>t.css),G.store.quickCssEnabled?G.store.quickCss:""].join(`
`),start(){qd()}});var Y=L("bloom-settings-"),Ed=3e3,xs=(t,e)=>{let o=a("textarea",{class:`bloom-input ${Y("css")}`,attrs:{spellcheck:"false",placeholder:"Paste your CSS here...","aria-label":e}});return o.value=t,o},Hr=(t,e)=>a("div",{class:Y("section-header")},a("div",{class:Y("field-label"),text:t}),a("div",{class:Y("field-desc"),text:e}));function Ss(){let{quickCss:t,quickCssEnabled:e}=G.store,o=xs(t,"Quick CSS");return o.disabled=!e,o.addEventListener("input",()=>{G.store.quickCss=o.value}),a("div",{class:Y("section")},a("div",{class:Y("field","field-inline")},Hr("Quick CSS","Your own CSS, applied on every page as you type."),Yt(e,n=>{G.store.quickCssEnabled=n,o.disabled=!n},"Enable Quick CSS")),o)}function qs(){let t=a("div",{class:Y("section")}),e=null,o=()=>a("div",{class:Y("section-error"),attrs:{role:"alert"}});function n(){let l=a("input",{class:"bloom-input",attrs:{type:"url",placeholder:"https://raw.githubusercontent.com/...","aria-label":"Theme URL"}}),u=o(),m=N("Add",async()=>{m.disabled=!0,u.textContent="";try{await vs(l.value.trim()),d()}catch(p){u.textContent=p instanceof Error?p.message:String(p),m.disabled=!1}});return a("div",{class:Y("section-block")},Hr("Online themes","Load a theme from a .css URL. It is fetched again on every page load, so updates apply."),a("div",{class:Y("section-row")},l,m),u)}function r(){let l=e==="new"?null:e,u=a("input",{class:"bloom-input",attrs:{placeholder:"My theme","aria-label":"Theme name"}});u.value=l?.name??"";let m=xs(l?.css??"","Theme CSS"),p=o();return a("div",{class:Y("section-block")},u,m,p,a("div",{class:Y("section-row")},N("Save",()=>{try{As(l?.id??null,u.value,m.value),e=null,d()}catch(S){p.textContent=S instanceof Error?S.message:String(S)}}),N("Cancel",()=>{e=null,d()})))}function i(){return a("div",{class:Y("section-block")},a("div",{class:Y("field","field-inline")},Hr("Local themes","CSS stored only on this device."),!e&&N("New local theme",()=>{e="new",d()})),e&&r())}function s(l){let u,m=Q("trash","Remove",()=>{if(u){clearTimeout(u),ys(l.id),d();return}m.setAttribute("aria-pressed","true"),m.setAttribute(ft,"Click again to remove"),u=setTimeout(()=>{u=void 0,m.removeAttribute("aria-pressed"),m.setAttribute(ft,"Remove")},Ed)});return a("div",{class:Y("theme")},a("div",{class:Y("theme-text")},a("div",{class:`${Y("card-name")} bloom-truncate`,text:l.name}),a("div",{class:`${Y("field-desc")} bloom-truncate`,text:l.url??"Local"})),l.url?Q("copy","Copy URL",()=>void Go(l.url??"")):Q("edit","Edit",()=>{e=l,d()}),m,Yt(l.enabled,p=>fn(l.id,{enabled:p}),`Enable ${l.name}`))}function d(){let{themes:l}=G.store;t.replaceChildren(n(),i(),l.length?a("div",{class:Y("themes")},...l.map(s)):a("div",{class:Y("empty"),text:"No themes yet."}))}return d(),t}var Td=new q("SettingsPanel"),g=L("bloom-settings-"),Md=10080*60*1e3,Cd=3e3,Es="Toggle features. Some need a reload. Click the sliders icon to configure.",Ld="Paused: can't find its place on this page.",kd=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Id=[{id:"plugins",label:"Plugins"},{id:"themes",label:"Themes"},{id:"css",label:"Quick CSS"}],Bd=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],Pd={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},Ms=new Set(["chat","ui","privacy"]),j=null,uo="plugins",ce="all",Dr="all",gn="",Nr=[],Cs=()=>[...V.values()].filter(t=>!t.hidden),Od=t=>!!t.updatedAt&&Date.now()-t.updatedAt<Md;function Rd(t){switch(ce){case"favorites":return en.has(t.name);case"recent":return Od(t);case"all":return!0;case"other":return!t.tags.some(e=>Ms.has(e));case"chat":case"ui":case"privacy":return t.tags.includes(ce)}}function Hd(t){switch(Dr){case"all":return!0;case"enabled":return Mt(t);case"disabled":return!Mt(t)}}function Dd(t){let e=gn.trim().toLowerCase();return!e||[t.name,t.description,...t.tags].some(o=>o.toLowerCase().includes(e))}function Nd(t){let e=tn.list(),o=n=>e.includes(n.name)?e.indexOf(n.name):e.length;return ce==="recent"?t.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):t.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var Ls=t=>t.settings?.def??{},Kr=t=>Object.values(Ls(t)).some(e=>e.type!=="custom");function Ud(t,e,o){let n=it(t.name,e)??vr(o),r=i=>{if(t.name==="Settings"&&!gs(e,i))return!1;mt(t.name,e,i)};switch(o.type){case"boolean":return Yt(n,r,o.description??e);case"slider":return mn(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return Pr(n,o.options,r);case"string":return co(n,r,o.placeholder);case"number":return co(String(n),i=>r(Number(i)),"","number");case"component":{let i=a("div",{class:g("component")});return Nr.push(o.render(i)),i}case"custom":return null}}var Fd=t=>t.replaceAll(/([A-Z])/g," $1").replace(/^./,e=>e.toUpperCase());function Gr(t){if(!j)return;let e=Object.entries(Ls(t)).filter(([,i])=>i.type!=="custom").map(([i,s])=>{let d=Ud(t,i,s),l=s.type==="boolean",u=s.type!=="component"&&a("div",{class:g("field-label"),text:Fd(i)}),m=s.description&&a("div",{class:g("field-desc"),text:s.description});return a("div",{class:g("field",l?"field-inline":"field-stacked")},(u||m)&&a("div",{class:g("field-text")},u,m),d)}),o,n=N("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},Cd);return}clearTimeout(o),t.settings?.reset(),Me(),Gr(t)},"danger"),r=a("div",{class:g("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&Me()}},a("div",{class:g("popup"),attrs:{role:"dialog","aria-label":`${t.name} settings`}},a("div",{class:g("popup-header")},a("div",{class:g("card-icon")},k(t.icon)),a("div",{class:g("popup-title")},a("div",{class:g("card-name"),text:t.name}),a("div",{class:g("popup-authors"),text:t.authors.join(", ")})),Q("close","Close",Me)),a("p",{class:g("popup-desc"),text:t.description}),a("div",{class:g("fields")},...e),a("div",{class:g("popup-footer")},n)));j.querySelector(`.${g("modal")}`)?.append(r)}function Me(){for(let t of Nr)t();Nr=[],j?.querySelector(`.${g("popup-backdrop")}`)?.remove()}function Ts(t){let e=Mt(t),o=en.has(t.name),n=tn.has(t.name),r=!!t.required,i=Na(t.name);return a("div",{class:[g("card",e?"card-on":"card-off"),r?g("card-required"):""].filter(Boolean).join(" ")},a("div",{class:g("card-top")},a("div",{class:g("card-icon")},k(t.icon)),a("div",{class:g("card-actions")},Q("star",o?"Unstar":"Star",()=>{en.toggle(t.name),le()},o),r?null:Q("pin",n?"Unpin":"Pin to top",()=>{tn.toggle(t.name),le()},n),r?a("span",{class:g("required-mark"),attrs:{"aria-label":"Required",[ft]:"This plugin is required for Bloom++ to work"}},k("alert")):null,Kr(t)&&Q("gear","Settings",()=>Gr(t)),Yt(e,s=>Qa(t,s),r?`${t.name} is required`:`Enable ${t.name}`,r))),a("div",{class:g("card-name")},t.name,Da(t.name)&&a("span",{class:g("new-badge"),text:"New"})),a("div",{class:g("card-desc"),text:t.description,title:t.description}),i&&a("div",{class:g("card-issue"),attrs:{[ft]:`Missing: ${i.join(", ")}`}},k("alert"),a("span",{text:Ld})),a("div",{class:g("card-footer"),text:t.authors.join(", ")}))}function ks(){let t=Cs().some(o=>!o.tags.some(n=>Ms.has(n)));j?.querySelector(`.${g("tabs")}`)?.replaceChildren(...kd.filter(o=>o.id!=="other"||t).map(o=>a("button",{class:g("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===ce)},on:{click:()=>{ce=o.id,ks(),le()}}})))}function le(){if(!j)return;let t=Cs().filter(Rd),e=j.querySelector(`.${g("search")} input`);e&&(e.placeholder=`Search ${ga(t.length,"plugin")}...`);let o=Nd(t.filter(u=>Dd(u)&&Hd(u))),n=ce==="all",r=n?o.filter(u=>!u.required):o,i=n?o.filter(u=>u.required):[],s=[...r.map(Ts),...i.length?[a("div",{class:g("required-break"),attrs:{role:"separator"}}),...i.map(Ts)]:[]],d=gn.trim()?"No plugins match your search.":Pd[ce]??"No plugins available.";j.querySelector(`.${g("grid")}`)?.replaceChildren(...s.length?s:[a("div",{class:g("empty"),text:d})])}function Kd(t){t.key==="Escape"&&(t.preventDefault(),t.stopPropagation(),j?.querySelector(`.${g("popup-backdrop")}`)?Me():jt())}var Is,Ur;function Fr(){let t=j?.querySelector(`.${g("body")}`);if(!j||!t)return;for(let o of j.querySelectorAll(`.${g("nav-item")}`))o.setAttribute("aria-selected",String(o.getAttribute("data-section")===uo));if(Me(),uo==="themes"){t.replaceChildren(qs());return}if(uo==="css"){t.replaceChildren(Ss());return}let e=a("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=gn,e.addEventListener("input",()=>{gn=e.value,le()}),t.replaceChildren(a("div",{class:g("tabs"),attrs:{role:"tablist"}}),a("div",{class:g("toolbar")},a("label",{class:g("search")},k("search"),e),Pr(Dr,Bd,o=>{Dr=o,le()})),a("div",{class:g("grid")})),ks(),le(),e.focus()}function Ce(t,e){t&&(uo=t),j?(Fr(),kr(j)):Gd();let o=e&&V.get(e);o&&Gr(o)}function Gd(){j=a("div",{class:`bloom-root ${g("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&jt()}},a("div",{class:g("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},a("div",{class:g("header")},a("div",{class:g("logo")},k("bloom")),a("h2",{class:g("title"),text:"Bloom++"}),a("span",{class:g("hint"),attrs:{"aria-label":Es,tabindex:"0",[ft]:Es}},k("info")),a("div",{class:g("nav"),attrs:{role:"tablist"}},...Id.map(t=>a("button",{class:g("nav-item"),text:t.label,attrs:{type:"button",role:"tab","data-section":t.id},on:{click:()=>{uo=t.id,Fr()}}}))),a("span",{class:g("version"),text:"v2.0.106"}),Q("close","Close",jt)),a("div",{class:g("body")}))),j.addEventListener("keydown",t=>t.stopPropagation()),Ur=new AbortController,document.addEventListener("keydown",Kd,{capture:!0,signal:Ur.signal}),At(j),Fr(),Is=Va(le),Td.debug("Opened")}function jt(){Me(),Ur?.abort(),Is?.(),j?.remove(),j=null}var Le=()=>j?jt():Ce(),Bs=()=>!!j;var Ps=new q("AppLandmarks"),Yd={Settings:[c.rail],WiderChat:[":root"],StreamerMode:[c.sidebarScroll,c.rail],ComposerOpacity:[c.composer,c.composerInput],ResponseNotification:[c.composerInput],InputHistory:[c.composerInput],Continue:[c.composerInput],ChatListStatus:[c.sidebarScroll],StarChats:[c.turn],BetterNavigator:[c.timelineScroll,c.turn],BetterQuotes:[c.turn],MessageTimestamps:[c.turn],RecentTopics:[c.sidebarScroll]};function Os(){for(let[t,e]of Object.entries(Yd)){let o=V.get(t);if(!o||o.required||!Mt(o)){wr(t,null);continue}let n=e.some(r=>Ct(r));if(wr(t,n?null:e),!n){if(!xr(o.name))continue;Ya(o),Ps.warn(`${t} paused; missing ${e.join(", ")}`);continue}xr(o.name)||(ja(o),Ps.info(`${t} resumed`))}}function Rs(){return Os(),M(()=>Os())}var qy=new q("Route"),jd=/\/c\/(?!local-)([\w-]+)/;var Qd=()=>location.pathname.match(jd)?.[1]??null;var Ey=location.href,Ty=Qd();var Wd=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,zd=/\S+@\S+\.\S+/,Vd=3;var Jd=t=>!!t.closest(".sr-only");function Zd(t){return[...t.querySelectorAll("*")].filter(e=>!e.children.length&&!e.closest("[data-bloom]")&&!!v(e.textContent??"")&&!(e instanceof SVGElement))}var $d=t=>{if(/rounded-full/.test(t.getAttribute("class")??""))return!0;if(!t.clientWidth)return!1;let{borderRadius:e}=getComputedStyle(t);return e.includes("%")||Number.parseFloat(e)>=t.clientWidth/2};function hn(t,e,o){for(let n of t.querySelectorAll(`[${e}]`))n!==o&&n.removeAttribute(e);o&&!o.hasAttribute(e)&&o.setAttribute(e,"")}function Xd(t,e){if(v(t.textContent??"").length>Vd)return null;let o=t.closest("button");for(let n=t;n&&n!==e&&n!==o;n=n.parentElement)if($d(n))return n;return null}function bn(t,e){t.hasAttribute(`data-bloom-${e}`)||t.setAttribute(`data-bloom-${e}`,"");let o=t.querySelector("img:not([data-bloom] img)"),n=Zd(t),r=o?null:n.map(m=>Xd(m,t)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),s=(i&&i!==t&&t.contains(i)?i:o??r)??t.querySelector("[class*=rounded-full]:not([data-bloom] *)");hn(t,`data-bloom-${e}-avatar`,s);let d=n.filter(m=>!s?.contains(m)&&!Jd(m)),l=d.find(m=>Wd.test(v(m.textContent??""))),u=d.find(m=>zd.test(m.textContent??""));hn(t,`data-bloom-${e}-plan`,l),hn(t,`data-bloom-${e}-email`,u),hn(t,`data-bloom-${e}-name`,d.find(m=>m!==l&&m!==u))}var Hs=()=>Kt(c.rail).filter(rt);function Ds(t){return Ct(c.profile,t)??[...t.querySelectorAll(c.menuButton)].findLast(rt)??null}function _d(t,e){return[...t.children].find(n=>n instanceof HTMLElement&&n!==e&&n.contains(e))??e}function Ns(){return Hs().flatMap(t=>{let e=Ds(t);if(!e)return[{kind:"rail",anchor:t,insert:n=>t.append(n)}];let o=_d(t,e);return[{kind:"rail",anchor:o,insert:n=>(o===e?t:o).append(n)}]})}var Yr=()=>Hs().map(Ds).filter(t=>t!=null);function tm(t){let e=t.getAttribute("aria-expanded")==="true"&&t.getAttribute("aria-controls"),o=e?document.getElementById(e):null;return o?.matches('[role="menu"]')?o:null}function yn(){return Yr().map(tm).find(t=>t!=null)??Kt('[role="menu"]').find(t=>!t.closest("[data-bloom]")&&/log ?out|sign out|退出/i.test(t.textContent??""))??null}var mo=t=>Kt(c.threadRow).filter(e=>e.getAttribute("data-app-action-sidebar-thread-id")===t);function po(t){let e=mo(t)[0]??Kt(c.threadRow).find(n=>{let r=n.getAttribute("data-app-action-sidebar-thread-id")??"";return r.endsWith(t)||t.endsWith(r.replace(/^local:/,""))});return(e?.getAttribute("data-app-action-sidebar-thread-title")??v(e?.textContent??""))||null}function Us(t){return null}var jr=0,vn;function em(t){if(!K(t))return;for(let o of Yr())bn(o,"profile");let e=yn();e&&bn(e,"menu")}function wt(){jr++;let t=!0;return Gt().then(()=>{t&&jr&&!vn&&(vn=M(em))}),()=>{t&&(t=!1,!--jr&&(vn?.(),vn=void 0))}}var Fs=`/*
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
`;var et=L("bloom-entry-"),nm=4,Wr="--bloom-entry-x",zr=1,Ks=4,Gs=8,rm=150,lt=y({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar.",default:Te.showSidebarEntry},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:Te.showSidebarEntryOnHover},showAccountMenuEntry:{type:"boolean",description:"Show Bloom++ at the top of the account menu.",default:Te.showAccountMenuEntry},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:t=>(t.append(N("Reset position",()=>{lt.store.entryPosition=zr})),()=>t.replaceChildren())},showBloomMenu:{type:"boolean",description:"Hovering the Bloom++ row in the account menu opens a menu with Plugins, Themes, Quick CSS and plugin settings.",default:!0},menuPlugins:{type:"component",description:"Plugins listed in that menu.",render:t=>(t.append(...Qs().map(e=>a("div",{class:et("menu-pick")},k(e.icon),a("span",{class:"bloom-truncate",text:e.name}),Yt(Ws(e),o=>{lt.store.menuPicks={...lt.store.menuPicks,[e.name]:o}},`List ${e.name} in the menu`)))),()=>t.replaceChildren())},entryPosition:{type:"custom",default:zr},menuPicks:{type:"custom",default:{}}}),ue=new Map,Qt=null,fo,Qs=()=>[...V.values()].filter(t=>!t.hidden).toSorted((t,e)=>t.name.localeCompare(e.name)),Ws=t=>lt.store.menuPicks[t.name]??Kr(t),Ys=!1,Qr=[];function im(t,e,o){let n=t.currentTarget,r=e.clientWidth-n.offsetWidth;if(t.button!==0||r<=0||!e.classList.contains(et("hover")))return;let i=lt.store.entryPosition,s=i,d=!1,l=new AbortController;n.setPointerCapture(t.pointerId),n.addEventListener("pointermove",m=>{!d&&Math.abs(m.clientX-t.clientX)<nm||(d=!0,o(),s=nt(i+(m.clientX-t.clientX)/r,0,zr),e.style.setProperty(Wr,String(s)))},{signal:l.signal});let u=()=>{l.abort(),d&&(lt.store.entryPosition=s,e.style.removeProperty(Wr))};n.addEventListener("pointerup",u,{signal:l.signal}),n.addEventListener("lostpointercapture",u,{signal:l.signal})}function am(t){let e=!1,o=a("button",{class:et("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),e||Le(),e=!1},pointerdown:r=>{e=!1,t!=="rail"&&im(r,n,()=>{e=!0})}}},k("bloom"),t!=="rail"&&a("span",{class:et("label"),text:"Bloom++"})),n=a("div",{class:`bloom-root ${et("wrap")} ${et(t)}`,attrs:{"data-bloom":"entry"}},o);return n}function go(){clearTimeout(fo),Qt?.remove(),Qt=null}function zs(){clearTimeout(fo),fo=setTimeout(go,rm)}var Vs=t=>t.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0}));function sm(t,e){if(clearTimeout(fo),Qt?.isConnected||!lt.store.showBloomMenu)return;let o=(l,u,m)=>a("div",{class:et("flyout-item"),attrs:{role:"menuitem"},on:{pointerdown:p=>{p.button===0&&(p.preventDefault(),p.stopPropagation(),go(),Vs(e),m())}}},k(u),a("span",{class:"bloom-truncate",text:l})),n=Qs().filter(Ws);Qt=a("div",{class:`bloom-root ${et("flyout")}`,attrs:{"data-bloom":"menu-flyout",role:"menu","aria-label":"Bloom++"},on:{pointerenter:()=>clearTimeout(fo),pointerleave:zs}},o("Plugins","bloom",()=>Ce("plugins")),o("Themes","spark",()=>Ce("themes")),o("Quick CSS","edit",()=>Ce("css")),n.length>0&&a("div",{class:et("flyout-break"),attrs:{role:"separator"}}),...n.map(l=>o(l.name,l.icon,()=>Ce("plugins",l.name)))),At(Qt);let r=e.getBoundingClientRect(),{width:i,height:s}=Qt.getBoundingClientRect(),d=r.right+Ks;Qt.style.left=`${d+i>innerWidth?r.left-i-Ks:d}px`,Qt.style.top=`${nt(t.getBoundingClientRect().top,Gs,innerHeight-s-Gs)}px`}function lm(t){let e=a("div",{class:`bloom-root ${et("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),go(),Vs(t),Le()},pointerenter:()=>sm(e,t),pointerleave:zs}},k("bloom"),a("span",{text:"Bloom++"}),lt.store.showBloomMenu&&a("span",{class:et("menu-chevron")},k("chevron"))),o=t.querySelector('[role="menuitem"]');o?.parentElement?o.before(e):t.prepend(e)}function js(){go();for(let t of document.querySelectorAll('[data-bloom="entry"], [data-bloom="menu-entry"]'))t.remove();ue.clear()}function cm(){for(let t of document.querySelectorAll('[data-bloom="menu-entry"]'))t.remove()}function Js(){let{showSidebarEntry:t,showSidebarEntryOnHover:e,showAccountMenuEntry:o}=lt.store,n=t||e?Ns():[],r=new Set(n.map(s=>s.anchor));for(let[s,d]of ue)s.isConnected&&r.has(s)||(d.remove(),ue.delete(s));for(let s of document.querySelectorAll('[data-bloom="entry"]'))[...ue.values()].includes(s)||s.remove();for(let s of n){let d=ue.get(s.anchor);if(d?.isConnected||!vt(s.anchor))continue;let l=d??am(s.kind);ue.set(s.anchor,l),s.insert(l)}for(let s of ue.values())s.classList.toggle(et("hover"),!t);if(!o){cm();return}let i=yn();i&&!i.querySelector('[data-bloom="menu-entry"]')&&lm(i),i||go()}function um(t){pn.some(Rr)||(lt.store[Or(t??"")?t:"showSidebarEntry"]=!0),Js()}var Zs=h({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:lt,styles:()=>`${Fs}[data-app-navigation-rail] [data-bloom=entry]{position:absolute;inset:auto;left:50%;bottom:100%;transform:translateX(-50%);width:max-content;margin:0;padding-block:0.25rem;pointer-events:none;z-index:5;display:flex;justify-content:center}[data-app-navigation-rail]>[data-bloom=entry]{bottom:2.75rem}[data-app-navigation-rail] [data-bloom=entry] .bloom-entry-button{pointer-events:auto}[data-app-navigation-rail] [data-bloom=entry].bloom-entry-hover:not(:hover > *){display:none;transition:display 0s 0.2s allow-discrete}.${et("hover")}{${Wr}:${lt.store.entryPosition}}`,start(){hs(),js(),Qr=[M(Js),ps(),wt()],!Ys&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",Le),Ys=!0)},stop(){for(let t of Qr)t();Qr=[],js(),jt()},onSettingsChange:um});var _r=new q("AppNetwork"),xt=Se(),wn=new Map,$s=new Map,An=new Map,Xs=new Map,el=new Set,Jr=new Set,dm=800,mm=200,_s;var pm=t=>t==="user"||t==="assistant";function ho(t){let e=t.replace(/^local:/,"");return[...new Set([t,e,`local:${e}`])]}function ol(t){let e=ho(t);for(let n of e){let r=wn.get(n);if(r)return r}let o={id:e[0]??t,title:null,chain:[],times:new Map};for(let n of e)wn.set(n,o);return o}function ti(t){return ho(t)[0]??t}function ei(t){if(!t)return!1;let e=ti(t);if(Jr.has(e))return!0;if(!el.has(e))return!1;let o=An.get(e);return o==null||Date.now()-o<dm?!1:(Jr.add(e),!0)}function fm(){_s||(_s=Zo(()=>{let t=b();!t||Jr.has(ti(t))||rl(t)},mm))}function gm(t){let e=ti(t.id);el.add(e);let{length:o}=t.chain;if(o>(Xs.get(e)??0)){Xs.set(e,o),An.set(e,Date.now());return}An.has(e)||An.set(e,Date.now())}function kt(t){if(!t)return null;fm(),rl(t);let e=ho(t);return e.map(o=>wn.get(o)).find(o=>o&&(o.chain.length||o.title))??wn.get(e[0]??t)??null}function Zr(t,e,o,n=null){return{id:t,role:e,createTime:n,text:v(o),hasFiles:!1,imageCount:0}}function $r(t,e){let o=t.chain.find(r=>r.id===e.id);if(o){e.text&&(o.text=e.text),e.createTime!=null&&(o.createTime=e.createTime);return}if(t.chain.find(r=>r.role===e.role&&r.text&&r.text===e.text)){!t.times.has(e.id)&&e.createTime!=null&&t.times.set(e.id,e.createTime);return}t.chain.push(e)}function nl(t){let e=t.chain.map(o=>`${o.id}	${o.role}	${o.text}`).join(`
`);$s.get(t.id)!==e&&($s.set(t.id,e),xt.emit("conversation",t))}function hm(t){if(typeof t=="function")try{return v(String(t()??""))}catch(e){return _r.warn("Turn label failed",e),""}return typeof t=="string"?v(t):""}function bm(t){if(typeof t!="function")return"";try{let e=t();return typeof e=="string"?v(e):C(e)&&typeof e.response=="string"?v(e.response):""}catch(e){return _r.warn("Turn preview failed",e),""}}function ym(t){let e=Object.keys(t).find(o=>o.startsWith("__reactFiber$")||o.startsWith("__reactInternalInstance$"));return e?t[e]??null:null}function Xr(t,e,o,n){if(!t||e>24)return;let r=(C(t.memoizedProps)?t.memoizedProps:null)??(C(t.pendingProps)?t.pendingProps:null);if(r){if(Array.isArray(r.items)&&C(r.items[0])&&typeof r.items[0].turnKey=="string"){let i=r.items.filter(C);i.length>o.length&&(o.length=0,o.push(...i))}if(Array.isArray(r.entries)&&C(r.entries[0])&&typeof(r.entries[0].historyEntityKey??r.entries[0].turnId)=="string"){let i=r.entries.filter(C);i.length>n.length&&(n.length=0,n.push(...i))}}Xr(t.child??null,e+1,o,n),Xr(t.sibling??null,e,o,n)}function vm(t,e){let o=typeof e.turnId=="string"?e.turnId:"",n=typeof e.turnKey=="string"?e.turnKey:"";return t.find(r=>{let i=typeof r.turnKey=="string"?r.turnKey:"";return!!i&&(o===i||n.endsWith(i)||n.includes(i))})??null}function tl(t,e){return ho(t).some(o=>ho(e).includes(o))}function oi(t){let e=t.replace(/^history-content:/,"").replace(/^turn:/,"").replace(/:assistant$/,"");return e?[...new Set([t,e,`turn:${e}`,`${e}:assistant`,`local:${e}`])]:[]}function Am(t){let e=new Set;for(let o of t.querySelectorAll("[data-turn-key], [data-response-annotation-target], [data-chatgpt-search-message-ids]"))for(let n of[o.getAttribute("data-turn-key"),o.getAttribute("data-response-annotation-target"),...(o.getAttribute("data-chatgpt-search-message-ids")??"").split(/\s+/)])if(n)for(let r of oi(n))e.add(r);return e}function wm(t){let e=new Set;for(let o of t.chain)for(let n of oi(o.id))e.add(n);return e}function xm(t){return t.getAttribute("data-response-annotation-conversation")??t.querySelector("[data-response-annotation-conversation]")?.getAttribute("data-response-annotation-conversation")??null}function Sm(){return[...document.querySelectorAll(`${c.conversationTarget}, ${c.timelineScroll}`)].filter(rt)}function rl(t){let e=Sm();if(!e.length)return;let o,n=[],r=[];for(let p of e){let S=xm(p);if(S&&!tl(t,S))continue;let f=[],w=[];try{Xr(ym(p),0,f,w)}catch(_){_r.warn("Fiber walk failed",_);continue}let H=w.length?w:f,X=typeof H[0]?.conversationId=="string"?H[0].conversationId:"";if(X&&!tl(t,X))continue;let D=r.length?r:n;H.length>D.length&&(o=p,n=f,r=w)}if(!o)return;let i=r.length?r:n;if(!i.length)return;let s=typeof i[0]?.conversationId=="string"?i[0].conversationId:"",d=ol(t);d.title=po(t)??po(s||t)??d.title;let l=Am(o),u=wm(d),m=ei(t);for(let p of i){let S="";typeof p.turnId=="string"?S=p.turnId:typeof p.turnKey=="string"&&(S=p.turnKey.replace(/^.*turn:/,""));let f=typeof p.historyEntityKey=="string"?p.historyEntityKey:S?`turn:${S}`:"";if(m&&![f,S].some(_=>oi(_).some(Z=>u.has(Z)||l.has(Z))))continue;let w=vm(n,p),H=hm(w?.getLabel??p.getLabel),X=bm(w?.getPreview??p.getPreview),D=typeof p.timestampSeparatorAtMs=="number"?p.timestampSeparatorAtMs:null;f&&H&&($r(d,Zr(f,"user",H,D)),D&&d.times.set(f,D)),S&&X&&$r(d,Zr(`${S}:assistant`,"assistant",X,D))}gm(d),nl(d)}function qm(t){if(pm(t.role))return t.role;let e=typeof t.type=="string"?t.type:typeof t.itemType=="string"?t.itemType:"";return/user/i.test(e)?"user":/agent|assistant/i.test(e)?"assistant":null}function Em(t){return typeof t.text=="string"?t.text:typeof t.content=="string"?t.content:C(t.content)&&typeof t.content.text=="string"?t.content.text:""}function Vr(t,e){if(!t||!C(e))return;let o=typeof e.id=="string"?e.id:typeof e.itemId=="string"?e.itemId:"",n=qm(e),r=Em(e);if(!o||!n)return;let i=ol(t);$r(i,Zr(o,n,r)),nl(i)}function Tm(t){let e=t.params?.thread,o=t.params?.threadId??(C(e)&&typeof e.id=="string"?e.id:void 0);t.params?.item&&Vr(o,t.params.item);for(let n of t.params?.items??[])Vr(o,n);if(C(e)&&Array.isArray(e.items))for(let n of e.items)Vr(o,n)}ao.on("note",Tm);var Mm=["data-turn","data-message-author-role"],Cm=/:(user|assistant)$/,ni=`${c.messageUnit}, ${c.oldMessage}`,Sn=t=>t==="user"||t==="assistant",ll=()=>!!document.querySelector(c.timelineScroll),cl=()=>!!bt(c.timelineScroll),ri=()=>b()??"",qn=()=>ll()?bt(c.timelineScroll):document;function yo(){if(ll())return bt(c.timelineScroll);let t=document.querySelector(c.turn);for(let e=t?.parentElement;e;e=e.parentElement){let{overflowY:o}=getComputedStyle(e);if((o==="auto"||o==="scroll")&&e.scrollHeight>e.clientHeight)return e}return document.scrollingElement}var Wt=t=>{let e=t.getAttribute("data-chatgpt-search-unit-key")?.match(Cm)?.[1];return Sn(e)?e:t.matches(c.userBubble)?"user":t.matches(c.assistantReply)||t.matches(c.assistantMarkdown)?"assistant":null},ul=t=>{let e=[...t.querySelectorAll(c.searchUnit)].filter(n=>Wt(n)&&!n.parentElement?.closest(c.searchUnit));return e.length?e:[...t.querySelectorAll(`${c.userBubble}, ${c.assistantReply}`)].filter(n=>Wt(n)&&!n.parentElement?.closest(`${c.userBubble}, ${c.assistantReply}`))},il=t=>(t.getAttribute("data-chatgpt-search-message-ids")??t.getAttribute("data-message-id")??t.getAttribute("data-response-annotation-target"))?.split(/\s+/).filter(Boolean)??[];function bo(t){let e=il(t);if(e.length)return e;let o=[...new Set([...t.querySelectorAll(ni)].flatMap(il))];if(o.length)return o;let n=t.closest("[data-turn-key]")?.getAttribute("data-turn-key")?.replace(/^history-content:/,"");return n&&Wt(t)==="user"?[n]:[]}function ke(t=qn()){if(!t)return[];let e=ul(t);return e.length?e:[...t.querySelectorAll(ni)].filter(o=>!o.parentElement?.closest(ni))}function Lm(t,e){for(let o=t.length-1;o>=0;o--){let n=e.find(r=>r.id===t[o]);if(n)return n.role}return null}function km(t){for(let e of Mm){let o=t.getAttribute(e)??t.querySelector(`[${e}]`)?.getAttribute(e);if(Sn(o))return o}return t.querySelector(c.markdown)||t.querySelector(c.generatedImage)?"assistant":null}var Im=t=>!t.parentElement?.closest(c.turn);function zt(){let t=kt(b())?.chain??[];return[...qn()?.querySelectorAll(c.turn)??[]].filter(Im).flatMap(o=>{let n=ul(o),r=n.length?n.map(i=>({el:i,known:Wt(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=u=>!n.some(m=>m.contains(u))&&v(u.textContent??""),s=[...o.querySelectorAll(c.assistantMarkdown)].find(u=>i(u)&&!xn.test(v(u.textContent??""))),d=[...o.querySelectorAll(c.activityHeader)].findLast(i),l=s??d;l&&r.push({el:l,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?bo(o):ke(o).flatMap(bo),s=n??km(o)??Lm(i,t)??(r%2?"assistant":"user"),d=o.closest(c.turn)??o,l=!o.closest(c.searchUnit)&&!!d.querySelector(c.turnBusy),u=s==="assistant"&&(o.matches(c.turnBusy)||!!o.querySelector(c.turnBusy)||l);return{el:o,role:s,messageIds:i,streaming:u}})}var Bm="[data-bloom], .sr-only",dl=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,xn=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,al=new WeakMap;function Ie(t){let o=(t.el.closest(c.turn)??t.el).textContent?.length??0,n=al.get(t.el);if(n?.length===o)return n.summary;let r=Pm(t);return al.set(t.el,{length:o,summary:r}),r}function sl(t){let e=new Set,o=[];for(let n of t.querySelectorAll(c.assistantMarkdown)){if(n.closest(c.searchUnit))continue;let r=v(n.textContent??"");!r||xn.test(r)||dl.test(r)||e.has(r)||(e.add(r),o.push(r))}return o}function Pm(t){let e=t.el.querySelectorAll(c.generatedImage).length;if(t.role==="assistant"&&e)return e>1?`Image \xD7${e}`:"Image";let o=t.el.closest(c.turn);if(t.role==="assistant"&&o&&t.el.matches(c.assistantMarkdown)&&!t.el.closest(c.searchUnit)){let l=sl(o);if(l.length)return l.join(" \xB7 ")}let n=t.el.querySelector(t.role==="assistant"?`${c.markdown}, ${c.assistantMarkdown}`:".whitespace-pre-wrap")??t.el,i=[...n.querySelectorAll(Bm)].map(l=>v(l.textContent??"")).filter(Boolean).reduce((l,u)=>l.replace(u,`
`),n.innerText||n.textContent||""),s=i.split(`
`).map(v).filter(l=>l&&!dl.test(l)&&!xn.test(l));if(s.length)return s.join(" ");if(t.role==="assistant"&&o){let l=sl(o);if(l.length)return l.join(" \xB7 ")}let d=i.split(`
`).map(v).filter(l=>xn.test(l));return d.length?d.at(-1)??"":t.role==="user"&&t.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function En(t){return t.text?v(t.text):t.imageCount?t.imageCount>1?`Image \xD7${t.imageCount}`:"Image":t.hasFiles?"File":""}var ii=t=>t.matches(c.timelineScroll)&&getComputedStyle(t).flexDirection==="column-reverse";var Om=80,Rm=420;function ai(t,e,o){return(t.x-o.x)*(e.y-o.y)-(e.x-o.x)*(t.y-o.y)}function Hm(t,e,o,n){let r=ai(t,e,o),i=ai(t,o,n),s=ai(t,n,e);return!((r<0||i<0||s<0)&&(r>0||i>0||s>0))}function Dm(t,e){let o=(e.left+e.right)/2-(t.left+t.right)/2,n=(e.top+e.bottom)/2-(t.top+t.bottom)/2;if(Math.abs(o)>=Math.abs(n)){let i=o<0?e.right:e.left;return[{x:i,y:e.top},{x:i,y:e.bottom}]}let r=n<0?e.bottom:e.top;return[{x:e.left,y:r},{x:e.right,y:r}]}function ml(t,e){let o=nt(t.x,e.left,e.right),n=nt(t.y,e.top,e.bottom);return Math.hypot(t.x-o,t.y-n)}function Tn(t){let e=t.closeDelay??Om,o=t.towardDelay??Rm,n=0,r=!1,i=null,s=null,d=()=>{document.removeEventListener("pointermove",f,!0)},l=()=>{n&&window.clearTimeout(n),n=0,d(),i=null,s=null},u=()=>{l(),r&&(r=!1,t.setHeld(!1))},m=()=>{r||(r=!0,t.setHeld(!0))},p=w=>{n&&window.clearTimeout(n),n=window.setTimeout(u,w)},S=w=>{let H=t.panel(),X=t.trigger();if(!H||!i)return!1;let D=H.getBoundingClientRect();if(D.width<=0&&D.height<=0)return!1;let _=X?.getBoundingClientRect(),[Z,dr]=_&&(_.width||_.height)?Dm(_,D):[{x:D.left,y:D.top},{x:D.right,y:D.bottom}];return Hm(w,i,Z,dr)?!0:s!=null&&ml(w,D)<ml(s,D)-.25},f=w=>{let H={x:w.clientX,y:w.clientY};if(t.over(w.target)){l();return}S(H)?p(o):u(),s=H};return{enter(){l()},leave(w){if(t.over(w.relatedTarget)){l();return}i={x:w.clientX,y:w.clientY},s=i,m(),document.addEventListener("pointermove",f,!0),p(e)},dispose(){l(),r=!1}}}var pl=`/*
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
`;var T=L("bloom-nav-"),In=80,Um=1200,Fm=2,fl=3e4,Km=200,Gm=.9,Ym=.28,jm=24,Be=8,Qm=80,Wm=12,si=80,yl=`${c.rightPanel}, ${c.summaryPanel}`,zm={user:"\u2753",assistant:"\u{1F916}"},Vm=["wheel","touchmove","pointerdown"],On=y({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),A=null,R=[],ct=-1,me=-1,Pe=null,pe="",ci=0,ui=[],xo=null,Mn=null,Cn=new Set,It,vo,Bt,Ao="",St=[],So=null,Bn=new Set,Ln=new Map,de=!1,Jm=t=>On.store.showAssistant||t.role==="user",Zm=t=>t.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||t.messageIds[0]||t.role;function $m(t){return{role:t.role,summary:Ie(t),ids:t.messageIds,turn:t,streaming:t.streaming}}function vl(t,e){let o=t.entries.at(-1);if(o?.role==="assistant"&&e.role==="assistant"){t.entries[t.entries.length-1]={...e,ids:[...new Set([...o.ids,...e.ids])]};return}t.entries.push(e)}function Xm(){let t=[];for(let e of zt()){let o=$m(e),n=Zm(e),r=t.at(-1),i=!e.el.closest("[data-turn-key]");r&&(r.key===n||i&&o.role==="assistant")?vl(r,o):t.push({key:n,entries:[o]})}return t}function _m(){let t=[];for(let e of kt(ri()||b())?.chain??[]){let o={role:e.role,summary:En(e),ids:[e.id],turn:null,streaming:!1},n=t.at(-1);e.role==="assistant"&&n?vl(n,o):t.push({key:e.id,entries:[o]})}return t}var Oe=t=>t.entries.flatMap(e=>e.ids);function Pn(t,e){let o=new Set(Oe(t));return Oe(e).some(n=>o.has(n))}var fe=t=>v(t.entries.find(e=>e.role==="user")?.summary??""),li=(t,e)=>t.filter(o=>fe(o)===e).length,di=t=>({...t,turn:null,streaming:!1});function tp(t,e){let o=new Set(e.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return t.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return di(r);let s=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return s&&s!==n.key?di(r):r})}))}function ep(t,e){let o=e.entries.map((n,r)=>{let i=t.entries[r];if(!i)return n;let s=[...new Set([...n.ids,...i.ids])];return{...n,ids:s,summary:n.summary||i.summary}});for(let n of t.entries.slice(o.length))o.push(di(n));return{key:t.key,entries:o}}function Al(){let t=yo();if(!t)return!1;let e=t.clientHeight-t.scrollHeight;return t.scrollTop-e<=Math.abs(t.scrollTop)}function op(t,e){let o=tp(t,e).filter(l=>e.some(u=>u.key===l.key)||!e.some(u=>Pn(u,l)));if(!e.length)return o;if(!o.length)return e;let n=e.findIndex(l=>o.some(u=>u.key===l.key));if(n<0)return Al()?e.concat(o):o.concat(e);let r=e[n]?.key,i=o.findIndex(l=>l.key===r),s=o.slice(0,i).concat(e.slice(0,n),o.slice(i)),d=s.findIndex(l=>l.key===r);for(let l=n;l<e.length;l++){let u=e[l];if(!u)continue;let m=s.findIndex(p=>p.key===u.key);if(m>=0){let p=s[m];p&&(s[m]=ep(p,u)),d=m}else s.splice(d+1,0,u),d++}return s}function np(t,e){let o=0,n=0,r=0;for(let i=1-t.length;i<e.length;i++){let s=0,d=0;for(let u=0;u<t.length;u++){let m=e[u+i],p=t[u];!m||!p||(Pn(p,m)?(s+=3,d++):fe(p)&&fe(p)===fe(m)&&s++)}let l=Al()?i<r:i>r;(s>o||s===o&&d>n||s===o&&d===n&&l)&&(o=s,n=d,r=i)}return{score:o,offset:r}}function rp(t,e){let o=t.entries.map((n,r)=>{let i=e.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of e.entries.slice(o.length))o.push({...n,turn:null});return{key:t.key,entries:o}}function kn(t){return t.map(e=>({key:e.key,entries:e.entries.map(o=>({...o}))}))}function ip(t,e,o=!0){if(!e.length)return t;if(!t.length)return e;let{score:n,offset:r}=np(t,e),i=kn(t);if(n>0)for(let l=0;l<i.length;l++){let u=e[l+r],m=i[l];if(!u||!m)continue;let p=fe(m),S=!!p&&p===fe(u)&&li(t,p)===1&&li(e,p)===1;(Pn(m,u)||S)&&(i[l]=rp(m,u))}let s=[],d=[];for(let l=0;l<e.length;l++){let u=e[l];if(!u)continue;let m=fe(u);!m||li(i,m)>0||i.some(p=>Pn(p,u))||o&&(n>0&&l<r?s.push(u):d.push(u))}return s.concat(i,d)}var mi=t=>t.entries.some(e=>e.turn?.el.isConnected);function ap(t,e,o){let n=t.findIndex(i=>Oe(i).includes(e));if(n>=0)return n+1;let r=t.find(mi);return o&&r&&Oe(r).includes(o)?0:t.length}function sp(t){if(So){let{parent:e,user:o}=So;for(let n of t.slice(ap(t,e,o))){let r=Oe(n);if(!mi(n)&&!(o&&r.includes(o)))for(let i of r)Bn.add(i)}}return t.filter(e=>mi(e)||!Oe(e).some(o=>Bn.has(o)))}function wl(){St=[],So=null,Bn.clear()}function lp(){let t=ri();if(t!==Ao){Ao&&St.length&&de&&Ln.set(Ao,kn(St)),Ao=t;let n=t?Ln.get(t):void 0;n?.length?(St=kn(n),So=null,Bn.clear(),de=!0):(wl(),de=!1)}let e=Xm(),o=_m();return!e.length&&!o.length&&!cl()?(St=[],[]):(St=sp(ip(op(St,e),o,!de)),!de&&t&&St.length&&ei(t)&&(de=!0,Ln.set(t,kn(St))),St.flatMap(n=>n.entries).filter(Jm).filter(n=>n.ids.length||n.summary||n.streaming))}function cp(t){for(let o of t)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!tt().generating||t.some(o=>o.streaming))return;let e=t.at(-1);e&&(e.role==="assistant"||!On.store.showAssistant?e.streaming=!0:t.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function xl(){let t=lp();return cp(t),t}function Sl(t){let e=t.getBoundingClientRect(),o=st()?.getBoundingClientRect().top,n=Math.min(e.bottom,o&&o>e.top?o:e.bottom);return{top:e.top,bottom:n}}function ql(t){return((t.matches(".whitespace-pre-wrap, .markdown, .prose, [data-markdown-text-style]")?t:t.querySelector(".whitespace-pre-wrap")??t.querySelector(".markdown, .prose, [data-markdown-text-style]"))??t).getBoundingClientRect().top}function gl(t){let e=R[t]?.turn?.el;return e?.isConnected?e:null}function up(t){if(!R.length)return null;let e=t.scrollHeight-t.clientHeight,o=ii(t),n=Math.min(t.scrollTop,0),r=o?-n:e-t.scrollTop,i=o?e+n:t.scrollTop,s=e<=Be||r<=Be,d=e>Be&&i<=Be,{top:l,bottom:u}=Sl(t),m=gl(0),p=m?ql(m):Number.NaN,S=!!m&&p>=l-Be&&p<=l+48,f=gl(R.length-1),w=f?.getBoundingClientRect().bottom??Number.NaN,H=!!f&&w<=u+Be&&w>=u-Qm;return s||H?"bottom":d||S?"top":null}function dp(t){let{top:e,bottom:o}=Sl(t),n=e+Math.max(o-e,0)*Ym,r=[],i=-1;if(R.forEach((d,l)=>{let u=d.turn?.el;if(!u?.isConnected){r.push(Number.NaN);return}let m=ql(u);r.push(m),i<0&&(i=l),m<=n&&(i=l)}),i<0)return Math.max(R.findIndex(d=>d.turn),0);let s=r[ct];return Number.isFinite(s)?i===ct?ct:i>ct?i:s<=n+jm?ct:i:i}function mp(t){let e=up(t);return e==="bottom"?R.length-1:e==="top"?0:dp(t)}function hl(t){On.store.jumpEffect==="border"&&(t.classList.add(T("flash")),setTimeout(()=>t.classList.remove(T("flash")),Um))}function Rn(t){let e=R[t],o=yo();if(!e||!o)return;if(!e.turn&&!e.ids.length){me=t,wo(),o.scrollTo({top:ii(o)?0:o.scrollHeight});return}me=t,Pe=t?null:{chat:b(),first:e.ids[0],until:Date.now()+fl},wo();let n=e.turn?.el;if(n?.isConnected){let u=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:u<o.clientHeight*Fm?"smooth":"auto"}),hl(n);return}let r=R.findIndex(u=>u.turn),i=r>=0&&t<r?-1:1,s=++ci,d=Date.now()+fl,l=()=>{let u=yo();if(s!==ci||Date.now()>d||!u)return;R=xl();let m=R.find(S=>S.ids.some(f=>e.ids.includes(f)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),hl(m),me=R.findIndex(S=>S.turn?.el===m),wo();return}let p=u.scrollTop;u.scrollBy({top:i*u.clientHeight*Gm,behavior:"instant"}),u.scrollTop===p?setTimeout(l,Km):requestAnimationFrame(l)};l()}function pp(t,e){return a("button",{class:T("row"),attrs:{type:"button","data-index":String(e),"data-message-id":t.ids[0]??""},on:{click:()=>Rn(e)}},a("span",{text:zm[t.role]}),a("span",{class:"bloom-truncate",text:ht(t.summary||"\u2026",In)}))}function fp(t,e){let o=t.offsetWidth?e.width/t.offsetWidth:1;return e.left+(t.clientLeft+t.clientWidth)*o}function gp(t){let e=1/0;for(let o of document.querySelectorAll(yl)){if(!rt(o))continue;let n=o.getBoundingClientRect();n.width<si||n.height<si||n.left<t.left+si||n.left<e&&(e=n.left)}return Number.isFinite(e)?e:null}function bl(t){if(!A)return;let e=t.getBoundingClientRect(),o=st()?.getBoundingClientRect().top,r=Math.min(e.bottom,o&&o>e.top?o:e.bottom)-e.top,i=Math.min(fp(t,e),gp(e)??1/0);A.style.right=`${document.documentElement.clientWidth-i+Wm}px`,A.style.top=`${e.top}px`,A.style.height=r>1?`${r}px`:""}function hp(){let t=yo();if(R=xl(),!R.length||!t){Bt?.dispose(),Bt=void 0,A?.remove(),A=null,pe="";return}if(xo!==t){vo?.abort(),vo=new AbortController,t.addEventListener("scroll",Nt(wo),{passive:!0,signal:vo.signal});for(let n of Vm)t.addEventListener(n,Tl,{passive:!0,signal:vo.signal});xo=t,It?.disconnect(),It=new ResizeObserver(()=>{t.isConnected&&bl(t)}),It.observe(t),Mn=null,Cn=new Set}let e=st();if(e&&e!==Mn&&It&&(It.observe(e),Mn=e),It)for(let n of document.querySelectorAll(yl))Cn.has(n)||(It.observe(n),Cn.add(n));Ap(),bl(t);let o=JSON.stringify(R.map(n=>[n.role,n.ids]));o!==pe?(pe=o,me=-1,yp(),Pe&&Date.now()<Pe.until&&Pe.chat===b()&&R[0]?.ids[0]!==Pe.first&&Rn(0)):bp(),wo()}function wo(){if(!A||!xo)return;ct=me>=0?me:mp(xo),A.querySelectorAll(`.${T("tick")}`).forEach((e,o)=>e.classList.toggle(T("tick-current"),o===ct)),A.querySelectorAll(`.${T("row")}`).forEach(e=>e.setAttribute("aria-current",String(Number(e.dataset.index)===ct)));let t=A.querySelector(`.${T("toc-head")}`);t&&(t.textContent=`${ct+1} / ${R.length}`)}function bp(){A?.querySelectorAll(`.${T("tick")}`).forEach((t,e)=>{let o=R[e],n=ht(o.summary,In);t.title!==n&&(t.title=n),t.classList.toggle(T("tick-streaming"),o.streaming)}),A?.querySelectorAll(`.${T("row")}`).forEach(t=>{let e=t.lastElementChild,o=ht(R[Number(t.dataset.index)].summary||"\u2026",In);e&&e.textContent!==o&&(e.textContent=o)})}function yp(){A?.querySelector(`.${T("rail")}`)?.replaceChildren(...R.map((e,o)=>a("button",{class:Wo(T("tick"),T(`tick-${e.role}`),e.streaming&&T("tick-streaming"),o===ct&&T("tick-current")),title:ht(e.summary,In),attrs:{type:"button","aria-label":`Jump to message ${o+1}`,"data-message-id":e.ids[0]??""},on:{click:()=>Rn(o)}}))),A?.querySelector(`.${T("toc-list")}`)?.replaceChildren(...R.map(pp))}var qt=Nt(hp);function pi(t){if(t===A)return;let e=t.__bloomNavStop;if(e&&e!==fi)try{e()}catch{}t.isConnected&&t!==A&&t.remove()}function El(){let t=[...document.querySelectorAll('[data-bloom="navigator"]')];if(A&&!A.isConnected&&(A=null),A&&t.includes(A)){for(let e of t)pi(e);return}A=t[0]??null;for(let e of t.slice(1))pi(e)}function vp(){Bt?.dispose(),Bt=Tn({over:t=>t instanceof Node&&!!A?.contains(t),trigger:()=>A?.querySelector(`.${T("rail")}`),panel:()=>A?.querySelector(`.${T("toc")}`),setHeld:t=>A?.classList.toggle(T("open"),t)})}function Ap(){El(),A&&!A.querySelector(`.${T("rail")}`)&&(A.remove(),A=null,pe=""),A||(A=a("div",{class:`bloom-root ${T("root")}`,attrs:{"data-bloom":"navigator"},on:{pointerenter:()=>Bt?.enter(),pointerleave:t=>Bt?.leave(t)}},a("div",{class:T("rail")}),a("div",{class:T("bridge"),attrs:{"aria-hidden":"true"}}),a("div",{class:T("toc")},a("div",{class:T("toc-head")}),a("div",{class:T("toc-list")}))),pe=""),Bt||vp(),A.isConnected||document.body.append(A),A.querySelector(`.${T("tick")}`)||(pe=""),A.__bloomNavStop=fi}function Tl(){me=-1,Pe=null,ci++}function fi(){for(let t of ui)t();ui=[],vo?.abort(),It?.disconnect(),It=void 0,xo=null,Mn=null,Cn=new Set,removeEventListener("keydown",Ml,!0),removeEventListener("resize",qt),Bt?.dispose(),Bt=void 0,A&&delete A.__bloomNavStop,A?.remove(),A=null,pe="",wl(),Ln.clear(),Ao="",de=!1;for(let t of document.querySelectorAll('[data-bloom="navigator"]'))pi(t)}var wp=t=>!!t&&(t.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!t.closest("[contenteditable='true']"));function Ml(t){if(!A||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey||wp(document.activeElement)||bt("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:ct-1,ArrowDown:ct+1,Home:0,End:R.length-1}[t.key];if(o==null){Tl();return}o<0||o>=R.length||(t.preventDefault(),t.stopPropagation(),Rn(o))}var Cl=h({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:On,styles:pl,start(){El(),ui=[M(t=>K(t)&&qt()),yt(qt),xt.on("conversation",qt),xt.on("generate-start",({parentId:t,userId:e})=>{t&&(So={parent:t,user:e},qt())}),O.on("rise",qt),O.on("fall",qt)],addEventListener("keydown",Ml,!0),addEventListener("resize",qt,{passive:!0}),qt()},stop:fi,onSettingsChange:qt});var Ll=`/*
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
`;var $=L("bloom-quotes-"),Si="BloomBetterQuotes",Sp=40,Pl=8,qp=1800,yi=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,kl=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,ge=y({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),gi,hi,Re,bi=!1,vi=0,Hn=null,Dn=null,Pt=null;function qi(){return b()??"draft"}function Un(){try{let t=JSON.parse(sessionStorage.getItem(Si)??"[]");return Array.isArray(t)?t.filter(e=>!!e&&typeof e=="object"&&typeof e.id=="string"&&typeof e.text=="string"&&!!e.text):[]}catch{return[]}}function Ei(t){try{sessionStorage.setItem(Si,JSON.stringify(t.slice(-Sp)))}catch{}}function qo(t){return Un().find(e=>e.id===t)?.text??""}function Ep(t,e){let o=Un().filter(n=>n.id!==t);o.push({id:t,text:e}),Ei(o)}function Ai(t=qi()){Ei(Un().filter(e=>e.id!==t)),Nn()}function Tp(t){let e=qo("draft");if(!e||qo(t))return;let o=Un().filter(n=>n.id!=="draft");o.push({id:t,text:e}),Ei(o)}function wi(t){return`${t.getAttribute("aria-label")??""} ${t.getAttribute("title")??""}`}function Mp(t){let e=wi(t);return kl.test(e)&&!/quote|引用/.test(e)?!1:/quote|引用/.test(e)&&yi.test(e)?!0:yi.test(e)&&!kl.test(e)}function Ol(t){let e=t.cloneNode(!0),o=[...e.querySelectorAll("button, [role='button']")],n=new Set(o.map(r=>r.getAttribute("aria-label")).filter(Boolean));for(let r of o)r.remove();for(let r of e.querySelectorAll("*"))!r.children.length&&n.has(v(r.textContent??""))&&r.remove();return v(e.textContent??"")}function Cp(t){let e=st(),o=t.parentElement,n=0;for(;o&&o!==e&&n<5;){if(n++,o.matches(c.composerInput)||o.querySelector(c.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=Ol(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function Fn(){let t=st();if(!t)return null;for(let e of t.querySelectorAll("button, [role='button']")){if(e.closest("[data-bloom]")||!Mp(e))continue;let o=Cp(e),n=o?Ol(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:e}}return null}function Lp(t){let e=t.closest(c.searchUnit)??t.closest(c.oldMessage);return e&&(Wt(e)??e.getAttribute("data-message-author-role"))==="user"?e:null}function Ti(t){return v(t).slice(0,48)}function kp(t,e){let o=Ti(t);if(o.length<Pl)return null;let n=null;for(let r of ke()){if(e&&(r===e||e.contains(r)||r.contains(e)))continue;let i=v(r.textContent??"");if(!i.includes(o))continue;let s=o.length/Math.max(i.length,1);(!n||s>n.score)&&(n={el:r,score:s})}return n?.el??null}function Ip(t,e){let o=Ti(e),n=t;for(let r of t.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&v(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${$("hit")}`)?.classList.remove($("hit")),n.classList.add($("hit")),window.clearTimeout(vi),vi=window.setTimeout(()=>n.classList.remove($("hit")),qp)}function Il(t){let e=t.closest(c.timelineScroll)??document.scrollingElement;if(!(e instanceof HTMLElement)&&e!==document.scrollingElement)return;let o=t.getBoundingClientRect();if(o.height<1||!e)return;let n=e.getBoundingClientRect(),r=st()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,s=o.top+o.height/2-(n.top+i)/2;Math.abs(s)<8||e.scrollTo({top:e.scrollTop+s,behavior:"smooth"})}function Mi(){if(!Pt||!Hn?.isConnected)return;let t=Hn.getBoundingClientRect();t.width<1||(Pt.style.top=`${Math.max(8,t.top+8)}px`,Pt.style.left=`${Math.max(8,t.right-Pt.offsetWidth-8)}px`)}function Bp(t,e,o){Hn=t,Dn=e,Pt??=a("button",{class:`bloom-root ${$("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),Pt.isConnected||document.body.append(Pt),Ip(t,o),Mi()}function Bl(){Pt?.remove(),Pt=null,Hn=null,Dn=null,document.querySelector(`.${$("hit")}`)?.classList.remove($("hit"))}function Rl(){return document.querySelector('[data-bloom="quote-chip"]')}function Nn(){Rl()?.remove()}function Pp(t){let o=st()?.getBoundingClientRect();!o||o.width<8||(t.style.width=`${Math.max(120,o.width-24)}px`,t.style.left=`${o.left+12}px`,t.style.top=`${Math.max(8,o.top-t.offsetHeight-8)}px`)}function Op(t){let e=Rl();e||(e=a("div",{class:`bloom-root ${$("chip")}`,attrs:{"data-bloom":"quote-chip"}},a("span",{class:$("text")}),a("button",{class:$("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(e));let o=e.querySelector(`.${$("text")}`),n=v(t);o&&o.textContent!==n&&(o.textContent=n),e.dataset.text=t,Pp(e)}function xi(){if(!bi){bi=!0;try{let t=qi(),e=Fn();ge.store.persistAcrossChats&&e&&qo(t)!==e.text&&Ep(t,e.text);let o=ge.store.persistAcrossChats?qo(t):"";!o||e&&v(e.text)===v(o)?Nn():Op(o),Mi()}finally{bi=!1}}}function Rp(t){let e=t.closest('[data-bloom="quote-chip"]');if(e instanceof HTMLElement&&!t.closest(`.${$("x")}`)){let i=e.dataset.text??e.querySelector(`.${$("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:e}:null}let o=t.closest("blockquote");if(o instanceof HTMLElement&&!t.closest("a, button")){let i=Lp(o),s=v(o.textContent??"");if(i&&s)return{text:s,skip:i,origin:o}}let n=st();if(!n||!n.contains(t)||io(t)||t.closest("button, [role='button']"))return null;let r=Fn();return!r||!r.row.contains(t)?null:{text:r.text,skip:null,origin:r.row}}function Hp(t){let{target:e}=t;if(!(e instanceof Element))return;if(e.closest('[data-bloom="quote-back"]')){t.preventDefault(),t.stopPropagation(),Dn?.isConnected&&Il(Dn);return}if(e.closest(`.${$("x")}`)){t.preventDefault(),t.stopPropagation(),Ai();return}let o=Fn();if(o&&(e===o.dismiss||o.dismiss.contains(e))){Ai();return}if(Dp(e)&&Hl(),!ge.store.jumpToPassage)return;let n=Rp(e);if(!n)return;let r=kp(n.text,n.skip);r&&(t.preventDefault(),t.stopPropagation(),Bp(r,n.origin,n.text),Il(r))}function Dp(t){let e=t.closest("button, [role='button']");return!(e instanceof HTMLElement)||e.closest("[data-bloom]")||!st()?.contains(e)?!1:/send|submit|发送|提交/i.test(wi(e))&&!yi.test(wi(e))}function Np(t){return!(t instanceof KeyboardEvent)||t.key!=="Enter"||t.shiftKey||t.isComposing?!1:io(t.target)}function Hl(){if(!ge.store.persistAcrossChats)return;let t=qi(),e=qo(t);if(e){if(!Fn()){let o=z(),n=Ti(e);n.length>=Pl&&!v(o).includes(n)&&Lt(`> ${e}

${o}`.trim())}Ai(t)}}function Up(t){Np(t)&&Hl()}function Fp(t){!t.prevId&&t.id&&Tp(t.id),xi()}var Dl=h({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:ge,styles:Ll,onSettingsChange(t){t==="jumpToPassage"&&!ge.store.jumpToPassage&&Bl(),t==="persistAcrossChats"&&!ge.store.persistAcrossChats&&(sessionStorage.removeItem(Si),Nn()),xi()},start(){Re=new AbortController,document.addEventListener("pointerdown",Hp,{capture:!0,signal:Re.signal}),document.addEventListener("keydown",Up,{capture:!0,signal:Re.signal}),addEventListener("scroll",Mi,{capture:!0,passive:!0,signal:Re.signal}),hi=yt(Fp),gi=M(t=>K(t)&&xi())},stop(){Re?.abort(),Re=void 0,hi?.(),hi=void 0,gi?.(),gi=void 0,window.clearTimeout(vi),Bl(),Nn()}});var Nl=`/*
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
`;var Gp="[data-app-action-sidebar-thread-row]{position:relative}[data-app-action-sidebar-thread-row]>[data-bloom=cls]{position:absolute;inset-inline-end:0.25rem;top:50%;width:0.875rem;height:0.875rem;margin:0;transform:translateY(-50%);pointer-events:none}",Yp=L("bloom-cls"),jp="bloom-cls",Qp=600*1e3,Li=$e("tab"),De=new Map,Eo=new Map,He=null,Ul=[],Wp=t=>t==="streaming"||t==="error";function zp(){let t=new Map,e=Date.now();for(let[o,n]of Eo)e-n.at>Qp?Eo.delete(o):t.set(o,n.status);for(let[o,n]of De)t.set(o,n);return t}function Vp(t){return a("span",{class:`bloom-root ${Yp("",`-${t}`)}`,attrs:{"data-bloom":"cls","data-status":t,"aria-label":t==="error"?"Error":"Generating"}},t==="error"&&k("alert"))}function Gn(){let t=zp(),e=new Set;for(let[o,n]of t)for(let r of mo(o)){if(!vt(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){e.add(i);continue}i?.remove();let s=Vp(n);e.add(s),r.append(s)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))e.has(o)||o.remove()}function Kn(t,e){t&&(e?De.set(t,e):De.delete(t),He?.postMessage({tab:Li,id:t,status:e}),Gn())}function Jp({data:t}){!C(t)||typeof t.id!="string"||typeof t.tab!="string"||t.tab===Li||(Wp(t.status)?Eo.set(t.id,{status:t.status,tab:t.tab,at:Date.now()}):Eo.delete(t.id),Gn())}function Ci(){for(let t of De.keys())He?.postMessage({tab:Li,id:t,status:null})}var Fl=h({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:()=>`${Nl}${Gp}`,start(){for(let t of document.querySelectorAll('[data-bloom="cls"]'))t.remove();He=typeof BroadcastChannel=="function"?new BroadcastChannel(jp):null,He?.addEventListener("message",Jp),addEventListener("pagehide",Ci),Ul=[O.on("rise",({conversationId:t})=>Kn(t,"streaming")),O.on("fall",({conversationId:t,outcome:e})=>Kn(t,e==="error"?"error":null)),O.on("context",({prevId:t,id:e,migrated:o})=>{o&&tt().generating?Kn(e,"streaming"):!o&&De.get(t??"")==="streaming"&&Kn(t,null)}),M(t=>K(t)&&Gn())],b()&&Gn()},stop(){for(let t of Ul)t();Ci(),He?.close(),He=null,removeEventListener("pagehide",Ci),De.clear(),Eo.clear();for(let t of document.querySelectorAll('[data-bloom="cls"]'))t.remove()}});var Vt="data-bloom-invite",Zp=/^(?:invite team members|invite members|邀请团队成员|邀请成员)$/i,Kl=':is(button, a:not([href^="/c/"])):not(main *, [role="dialog"] *)',$p={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${c.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])'],hideInvite:[`[${Vt}]`,`div:has(> [${Vt}]:only-child)`]},Gl=y({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0},hideInvite:{type:"boolean",description:"Hide Invite team members in the sidebar.",default:!0}}),Yn,ki=!1;function Xp(t){if(K(t))for(let e of document.querySelectorAll(`${Kl}, [${Vt}]`))!e.matches(Kl)||!Zp.test(v(e.textContent??""))?e.removeAttribute(Vt):e.hasAttribute(Vt)||e.setAttribute(Vt,"")}var Yl=h({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads, notices and Invite team members.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:Gl,styles:()=>Dt(Object.entries($p).flatMap(([t,e])=>Gl.store[t]?e:[])),start(){ki=!0,Gt().then(()=>{ki&&!Yn&&(Yn=M(Xp))})},stop(){ki=!1,Yn?.(),Yn=void 0;for(let t of document.querySelectorAll(`[${Vt}]`))t.removeAttribute(Vt)}});var Ne=`form:has(:is(${c.composerInput})), ${c.oldComposerForm}`,jn='[class*="ComposerLayoutBody"]',Bi='[class*="ComposerLayoutRoot"]',_p='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',tf=`:is(${Ne}) ${jn}, :is(${Ne}):not(:has(${jn})) ${Bi}, :is(${Ne}):not(:has(${jn})):not(:has(${Bi})) :is(${_p})`,ef='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',of='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',nf="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))",rf="var(--color-background-composer-surface, var(--composer-background-color, var(--color-bg-primary, Canvas)))",af="composer-fill",jl=y({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function sf(){let{opacity:t,blur:e}=jl.store;if(t>=100)return"";{let i=`color-mix(in srgb, ${rf} ${t}%, transparent)`;return`[class*="ComposerLayoutRoot"], [data-composer-layout], [data-chatgpt-composer]{--composer-layout-surface-background:${i}!important;--composer-background-color:${i}!important;--composer-layout-surface-backdrop-filter:blur(${e}px)!important}`}let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${nf} ${t}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${e}px)!important;-webkit-backdrop-filter:blur(${e}px)!important`;return`:is(${ef}), :is(${Ne}){${o}}:is(${of}){display:none!important}${tf}{${n}}:is(${Ne}):has(${jn}) ${Bi}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${Ne}) :is(${c.composerInput}){background-color:transparent!important}`}function Ii(){for(let t of document.querySelectorAll(`[data-bloom="${af}"]`))t.remove()}var Ql=h({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:jl,styles:sf,start(){Ii()},stop(){Ii()},onSettingsChange(){Ii()}});var lf=1200,cf=8e3,uf=150,df=20,Wl=6,Ri="continue where you left",mf=/message delivery timed out|please try again/i,zl=/waiting for the complete answer/i,Vl=y({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:Ri,placeholder:Ri}}),Pi=[],Wn=0,To=!1,Mo=0,Fe="",Qn="",Hi=0,Ke=!1,Co=!1,zn=!0,Ue="",Di=0,Vn=!1,pf=()=>Vl.store.prompt.trim()||Ri;function Jl(){return(bt(c.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function Zl(){let t=Jl();return!t||zl.test(t)||!mf.test(t)?"":t}function ff(){let t=Jl();return t&&zl.test(t)?t:""}function gf(){let t=qn()?.querySelectorAll(c.turn),e=t?.[t.length-1];return`${e?.getAttribute("data-turn-key")??""}:${e?.textContent?.length??0}`}function $l(t,e,o){if(o===Wn){if(tt().generating||z()!==t||e>=df){Ke=!1,tt().generating||(Fe="");return}ns(),setTimeout(()=>$l(t,e+1,o),uf)}}function hf(t){let e=Wn;if(tt().generating||z()&&z()!==t){Ke=!1,Fe="";return}Lt(t),Vn=!0,fr(()=>{e===Wn&&$l(t,0,e)})}function Xl(t){return t===Fe||Mo>=Wl||tt().generating||z()?!1:(Fe=t,Mo+=1,Ke=!0,hf(pf()),!0)}function bf(){if(To||Ke||Co)return;let t=Date.now(),e=Zl();if(e){if(Ue="",e!==Qn){Qn=e,Hi=t;return}if(t-Hi<lf)return;Xl(`${b()??""}:${e}`);return}if(Qn="",!ff()){zn=!0,Ue="";return}if(!zn||!tt().generating||z())return;let n=`${b()??""}:${gf()}`;if(n!==Ue){Ue=n,Di=t;return}if(t-Di<cf||Mo>=Wl)return;let r=qr();r&&(Co=!0,r.click())}function Oi(){Wn+=1,To=!1,Mo=0,Fe="",Qn="",Hi=0,Ke=!1,Co=!1,zn=!0,Ue="",Di=0,Vn=!1}var _l=h({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:Vl,start(){Oi(),Pi=[O.on("rise",()=>{To=!1,Fe="",Ke=!1,Vn&&(Vn=!1,zn=!1,Ue="")}),O.on("fall",({outcome:t})=>{if(Co){Co=!1,t==="left"?To=!0:Xl(`${b()??""}:stall`);return}(t==="stopped"||t==="left")&&(To=!0),t==="done"&&!Zl()&&(Mo=0)}),O.on("context",({migrated:t})=>{t||Oi()}),O.on("tick",bf)]},stop(){for(let t of Pi)t();Pi=[],Oi()}});var Ot=L("bloom-csi-"),yf=256,vf=160,Jn=1,tc=4,Af=.1,wf=.0015,xf=250;function Sf(t){return new Promise((e,o)=>{let n=new FileReader;n.onload=()=>e(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(t)})}function qf(t){return new Promise((e,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>e(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=t})}function Ef(t,e){let o=Math.max(1/t.naturalWidth,1/t.naturalHeight)*e.zoom,n=1/(2*t.naturalWidth*o),r=1/(2*t.naturalHeight*o);return{zoom:e.zoom,x:nt(e.x,n,1-n),y:nt(e.y,r,1-r)}}function ec(t,e,o){let n=t.width,r=t.getContext("2d");if(!r)return;let i=Math.max(n/e.naturalWidth,n/e.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(e,n/2-o.x*e.naturalWidth*i,n/2-o.y*e.naturalHeight*i,e.naturalWidth*i,e.naturalHeight*i)}function Tf(t,e){let o=a("canvas");return o.width=o.height=yf,ec(o,t,e),o.toDataURL("image/png")}function oc(t){let e=null,o={x:W.store.cropX,y:W.store.cropY,zoom:W.store.cropZoom},n,r=a("canvas",{class:Ot("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=vf*devicePixelRatio;let i=a("div",{class:`bloom-muted ${Ot("status")}`}),s=a("div",{class:Ot("zoom")}),d=a("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(f,w=!0){e&&(o=Ef(e,f),ec(r,e,o),w&&(clearTimeout(n),n=setTimeout(()=>{e&&(W.store.cropX=o.x,W.store.cropY=o.y,W.store.cropZoom=o.zoom,W.store.avatarUrl=Tf(e,o))},xf)))}function u(){s.replaceChildren(mn(o.zoom,Jn,tc,Af,"\xD7",f=>l({...o,zoom:f})))}async function m(f,w){i.textContent="";try{e=await qf(f),w&&(W.store.avatarSource=f,o={x:.5,y:.5,zoom:Jn}),t.classList.add(Ot("has-image")),u(),l(o,w)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let p=f=>{f?.type.startsWith("image/")&&Sf(f).then(w=>m(w,!0))};d.addEventListener("change",()=>p(d.files?.[0])),r.addEventListener("wheel",f=>{e&&(f.preventDefault(),l({...o,zoom:nt(o.zoom*(1-f.deltaY*wf),Jn,tc)}),u())},{passive:!1}),r.addEventListener("pointerdown",f=>{if(!e)return;r.setPointerCapture(f.pointerId);let w={...o},H=r.getBoundingClientRect(),X=D=>{if(!e)return;let _=Math.max(H.width/e.naturalWidth,H.height/e.naturalHeight)*o.zoom;l({...o,x:w.x-(D.clientX-f.clientX)/(e.naturalWidth*_),y:w.y-(D.clientY-f.clientY)/(e.naturalHeight*_)})};r.addEventListener("pointermove",X),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",X),{once:!0})});let S=a("div",{class:Ot("cropper"),attrs:{tabindex:"0"},on:{paste:f=>p([...f.clipboardData?.files??[]].find(w=>w.type.startsWith("image/"))),dragover:f=>f.preventDefault(),drop:f=>{f.preventDefault(),p(f.dataTransfer?.files[0])}}},a("div",{class:Ot("stage")},r),a("div",{class:Ot("controls")},co("",f=>f.trim()&&void m(f.trim(),!0),"https://\u2026 or data:image/\u2026","url"),a("div",{class:Ot("buttons")},N("Choose file",()=>d.click()),N("Reset crop",()=>{l({x:.5,y:.5,zoom:Jn}),u()}),N("Clear",()=>{e=null,t.classList.remove(Ot("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),s.replaceChildren(),W.store.avatarUrl="",W.store.avatarSource=""},"danger")),s,i,d));return t.append(S),W.store.avatarSource&&m(W.store.avatarSource,!1),()=>{clearTimeout(n),t.replaceChildren()}}var nc=`/*
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
`;var Lo="data-bloom-csi-avatar",Ni="data-bloom-csi-sized",sc="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",Cf=32,W=y({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:t=>oc(t)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),rc=[];function lc(t){t.removeAttribute(Lo),t.removeAttribute(Ni)}function ic(t){return(W.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${t}]`)])}function ac(t=[]){if(!K(t))return;let e=W.store.displayName.trim()||null,o=!!W.store.avatarUrl,n=new Set(e?ic("name"):[]);for(let i of document.querySelectorAll(sc))n.has(i)||ee(i,null);for(let i of n)ee(i,e);let r=new Set(o?ic("avatar"):[]);for(let i of document.querySelectorAll(`[${Lo}]`))r.has(i)||lc(i);for(let i of r)i.hasAttribute(Lo)||i.setAttribute(Lo,""),i.toggleAttribute(Ni,!i.closest('[role="menu"]'))}function Lf(){let t=W.store.avatarUrl;return t?`:root{--bloom-csi-url:url("${t.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${W.store.avatarSize}px}:is(${c.rail}, ${c.oldRail}) [${Ni}]{--bloom-csi-size:${Cf}px}`:""}var cc=h({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:W,styles:()=>`${Lf()}
${nc}`,start(){rc=[wt(),M(ac)]},stop(){for(let t of rc)t();for(let t of document.querySelectorAll(`[${Lo}]`))lc(t);for(let t of document.querySelectorAll(sc))ee(t,null)},onSettingsChange(){ac()}});var Ge=L("bloom-greeting-"),uc=30,dc=100;function mc(t){let e=-1,o=a("textarea",{class:`bloom-input ${Ge("input")}`,attrs:{maxlength:String(dc),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=N("Add",i),r=a("div",{class:Ge("list")});function i(){let l=o.value.trim().slice(0,dc);if(!l)return;let u=[...I.store.greetings];e>=0?u[e]=l:u.length<uc&&u.push(l),I.store.greetings=u,e=-1,o.value="",s()}function s(){let{greetings:l}=I.store;n.textContent=e>=0?"Save":"Add",n.disabled=e<0&&l.length>=uc,r.replaceChildren(...l.length?l.map((u,m)=>a("div",{class:Ge("row",m===e?"row-editing":"row-idle")},a("div",{class:Ge("text"),text:u}),Q("edit","Edit",()=>{e=m,o.value=u,o.focus(),s()}),Q("trash","Delete",()=>{I.store.greetings=l.filter((p,S)=>S!==m),e===m&&(e=-1),s()}))):[a("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),t.append(a("div",{class:Ge("editor")},r,a("div",{class:Ge("form")},o,n))),s();let d=xe((l,u)=>l==="GreetingCustomizer"&&u==="greetings"&&s());return()=>{d(),t.replaceChildren()}}var pc=`/*
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
`;var $n="data-bloom-greeting",If=1e3,Bf=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],I=y({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:t=>mc(t)},greetings:{type:"custom",default:Bf},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),Zn,fc=[],Ui,Po=()=>dn()&&!oe(),Pf=t=>t.replaceAll(/\s*\n\s*/g," ").trim(),hc=()=>I.store.greetings.filter(t=>typeof t=="string"&&t.trim());function Oo(){let t=hc();if(t.length)if(I.store.order==="random"&&t.length>1){let e=I.store.lastRandom;for(;e===I.store.lastRandom;)e=Math.floor(Math.random()*t.length);I.store.lastRandom=e,I.store.index=e}else I.store.index=(I.store.index+1)%t.length}function Of(){return Po()?bt(c.homeHeading):null}function ko(){for(let t of document.querySelectorAll(`[${$n}]`))t.removeAttribute($n),ee(t,null)}function Io(){for(let t of document.querySelectorAll("[data-bloom-placeholder]"))t.removeAttribute("data-bloom-placeholder")}function gc(t){let e=pt(),o=Pf(t);if(!e||!o||z(e)){Io();return}e.getAttribute("data-bloom-placeholder")!==o&&e.setAttribute("data-bloom-placeholder",o)}function Bo(){let t=hc(),e=as(),o=Po();if(!t.length||!e&&!o){ko(),Io();return}if(e){ko(),gc(t[0]??"");return}let n=Of();n?((I.store.index<0||I.store.index>=t.length)&&Oo(),n.setAttribute($n,""),ee(n,t[Math.max(0,I.store.index)%t.length]??"")):ko(),I.store.heroOnlyOutsideProject?Io():gc(t[Math.max(0,I.store.index)%t.length]??"")}function Fi(){clearInterval(Zn),Zn=void 0,I.store.mode==="interval"&&Po()&&(Zn=setInterval(()=>{Oo(),Bo()},I.store.intervalSec*If))}function Rf(t){I.store.mode!=="manual"||!(t.target instanceof Element)||!t.target.closest(`[${$n}]`)||getSelection()?.toString()||(Oo(),Bo())}function Hf(){Po()&&I.store.mode==="refresh"&&Oo(),Fi(),Bo()}var bc=h({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:I,styles:pc,start(){ko(),Io(),Ui=new AbortController,document.addEventListener("click",Rf,{signal:Ui.signal}),Po()&&I.store.mode==="refresh"&&Oo(),Fi(),fc=[M(t=>K(t)&&Bo()),yt(Hf)]},stop(){Ui?.abort();for(let t of fc)t();clearInterval(Zn),ko(),Io()},onSettingsChange(t){(t==="mode"||t==="intervalSec")&&Fi(),Bo()}});var Ro=L("bloom-history-"),Ki=10,Df=3e3;function Gi(t,e){let o="",n=0,r=new Set,i=a("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),s=a("div",{class:Ro("list")}),d=a("div",{class:Ro("pager")}),l,u=N("Clear all",()=>{if(!l){u.textContent="Click again to clear",l=setTimeout(()=>{l=void 0,u.textContent="Clear all"},Df);return}clearTimeout(l),l=void 0,u.textContent="Clear all",Ho([])},"danger");function m(){let S=[...he.store.entries].toReversed(),f=o.trim().toLowerCase(),w=f?S.filter(Z=>Z.toLowerCase().includes(f)):S,H=Math.max(1,Math.ceil(w.length/Ki));n=Math.min(n,H-1);let X=w.slice(n*Ki,(n+1)*Ki).map(Z=>a("div",{class:Ro("row")},a("button",{class:Ro("text",r.has(Z)?"text-open":"text-closed"),text:Z,title:r.has(Z)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{r.delete(Z)||r.add(Z),m()}}}),e&&Q("edit","Use",()=>e(Z)),Q("copy","Copy",()=>void Go(Z)),Q("trash","Delete",()=>Ho(he.store.entries.filter(dr=>dr!==Z)))));s.replaceChildren(...X.length?X:[a("div",{class:"bloom-muted",text:f?"No matching prompts.":"No saved prompts yet."})]),d.replaceChildren(a("span",{class:"bloom-muted",text:`${w.length} ${f?"matching":"saved"} \xB7 page ${n+1} of ${H}`}),N("Previous",()=>{n--,m()}),N("Next",()=>{n++,m()}),u);let[D,_]=d.querySelectorAll("button");D.disabled=n===0,_.disabled=n>=H-1,u.disabled=!S.length}i.addEventListener("input",()=>{o=i.value,n=0,m()}),t.append(a("div",{class:Ro("manager")},i,s,d)),m();let p=xe((S,f)=>S==="InputHistory"&&f==="entries"&&m());return()=>{p(),clearTimeout(l),t.replaceChildren()}}var yc=`/*
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
`;var Rt=L("bloom-history-"),Uf=2e3,he=y({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:t=>Gi(t)},entries:{type:"custom",default:[]}}),U=null,Yi={text:"",at:0},Et=null,Jt=null,ji,je=()=>he.store.entries.filter(t=>typeof t=="string");function Ho(t){he.store.entries=t.slice(-he.store.maxEntries)}function Qi(t){let e=t.trim();if(!e)return;let o=Date.now();e===Yi.text&&o-Yi.at<Uf||(Yi={text:e,at:o},Ho([...je().filter(n=>n!==e),e]))}function vc(t){t.preventDefault()}function Ff(){let t=a("button",{class:Rt("hud-count"),attrs:{type:"button"},on:{mousedown:vc,click:jf}}),e=a("button",{class:Rt("hud-x"),text:"\xD7",attrs:{type:"button","aria-label":"Exit history"},on:{mousedown:vc,click:Kf}});return a("div",{class:`bloom-root ${Rt("hud")}`,attrs:{"data-bloom":"history-hud",role:"group","aria-live":"polite","aria-label":"Input history"}},t,e)}function Ac(t,e){let o=pt();if(!o||Jt)return;Et??=Ff();let n=`${t+1} / ${e}`,r=Et.querySelector(`.${Rt("hud-count")}`);r?.replaceChildren(n),r?.setAttribute("aria-label",`Show input history (${n})`);let i=(o.closest("form")??o).getBoundingClientRect();Et.style.left=`${i.left+i.width/2}px`,Et.style.top=`${i.top}px`,Et.isConnected||document.body.append(Et)}function Ye(){U=null,Et?.remove()}function Kf(){U&&Lt(U.draft),Ye(),pt()?.focus()}function wc(t){let e=je();if(!U)return;let o=e[t];U.index=t,U.shown=o,Lt(o),Ac(e.length-1-t,e.length)}function Gf(t){let e=je();if(!e.length)return!1;if(!U){if(t===1)return!1;U={index:e.length,draft:z(),shown:""}}let o=U.index+t;return o<0?!0:o>=e.length?(Lt(U.draft),Ye(),!0):(wc(o),!0)}function Yf(t){let e=je().indexOf(t);Do(),!(e<0)&&(U??={index:e,draft:z(),shown:""},wc(e),pt()?.focus())}function Do(){if(!Jt)return;Jt.release(),Jt.controller.abort(),Jt.root.remove(),Jt=null;let t=je();U&&t[U.index]===U.shown?Ac(t.length-1-U.index,t.length):U=null}function jf(){if(Jt)return;Et?.remove();let t=a("div",{class:Rt("dialog-body")}),e=a("div",{class:`bloom-root ${Rt("backdrop")}`,attrs:{"data-bloom":"history-dialog"},on:{click:n=>n.target===n.currentTarget&&Do()}},a("div",{class:Rt("dialog"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Input history"}},a("div",{class:Rt("dialog-header")},a("h2",{class:Rt("dialog-title"),text:"Input history"}),Q("close","Close",Do)),t));e.addEventListener("keydown",n=>n.stopPropagation());let o=new AbortController;document.addEventListener("keydown",n=>{n.key==="Escape"&&(n.preventDefault(),n.stopPropagation(),Do())},{capture:!0,signal:o.signal}),At(e),Jt={root:e,release:Gi(t,Yf),controller:o},t.querySelector("input")?.focus()}function xc(t){return io(t)?t:t instanceof HTMLElement?t.closest(c.composerInput):null}function Qf(){if(pt()?.closest("[data-chatgpt-composer], [data-composer-input], form")?.querySelector('[aria-expanded="true"]'))return!0;for(let e of document.querySelectorAll('[role="listbox"], [role="menu"], [data-radix-popper-content-wrapper], [cmdk-root], [cmdk-list]')){if(!(e instanceof HTMLElement)||e.closest("[data-bloom]"))continue;let o=getComputedStyle(e);if(!(o.display==="none"||o.visibility==="hidden"))return!0}return!1}function Wf(t){if(t.isComposing||t.key==="Process"||t.keyCode===229)return;let e=xc(t.target);if(!e)return;if(t.key==="Enter"&&!t.shiftKey){Qi(z(e)),Ye();return}if(t.key==="Escape"&&U){Lt(U.draft),Ye(),t.preventDefault(),t.stopPropagation();return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.ctrlKey||t.metaKey||t.shiftKey||Qf())return;let o=es(e),n=t.key==="ArrowUp";!t.altKey&&!(n?o.first:o.last)||!n&&!U||Gf(n?-1:1)&&(t.preventDefault(),t.stopPropagation())}function zf(t){U&&xc(t.target)&&z()!==U.shown.trim()&&Ye()}function Vf(t){t.target instanceof Element&&t.target.closest(c.sendButton)&&Qi(z())}var Sc=h({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before. Click the counter to browse history.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:he,styles:yc,start(){for(let e of document.querySelectorAll('[data-bloom="history-hud"], [data-bloom="history-dialog"]'))e.remove();Et=null,ji=new AbortController;let{signal:t}=ji;document.addEventListener("keydown",Wf,{capture:!0,signal:t}),document.addEventListener("input",zf,{capture:!0,signal:t}),document.addEventListener("click",Vf,{capture:!0,signal:t}),document.addEventListener("submit",()=>Qi(z()),{capture:!0,signal:t})},stop(){ji?.abort(),Do(),Ye();for(let t of document.querySelectorAll('[data-bloom="history-hud"]'))t.remove();Et=null},onSettingsChange(t){t==="maxEntries"&&Ho(je())}});var qc=`/*
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
`;var Zf=1500,$f=5e3,Xf=2e3,kc=[{label:"UTC",value:"UTC"},{label:"\u7F8E\u56FD\u4E1C\u90E8",value:"America/New_York"},{label:"\u7F8E\u56FD\u4E2D\u90E8",value:"America/Chicago"},{label:"\u7F8E\u56FD\u5C71\u5730",value:"America/Denver"},{label:"\u7F8E\u56FD\u897F\u90E8",value:"America/Los_Angeles"},{label:"\u65E5\u672C",value:"Asia/Tokyo"},{label:"\u53F0\u6E7E",value:"Asia/Taipei"}],Qe=y({sourceTimeZone:{type:"select",description:"Zone the stored clock was written in. Leave UTC for ChatGPT create_time. Pick the same zone as the Shit GPT plugin only when that clock is a wall time in that zone; it is then shown in the system timezone.",options:kc,default:"UTC"},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),_n=new Map,Wi=new Set,Ic=0,tr,Ec=[];function Bc(t,e){_n.get(t)!==e&&(_n.set(t,e),clearTimeout(tr),tr=setTimeout(Pc,Xf))}function Pc(){let t={...Qe.store.stamps,...Object.fromEntries(_n)};Qe.store.stamps=Object.fromEntries(Object.entries(t).toSorted((e,o)=>o[1]-e[1]).slice(0,Zf))}function _f(t){let e=kt(b())?.times;for(let o=t.length-1;o>=0;o--){let n=_n.get(t[o])??e?.get(t[o])??Qe.store.stamps[t[o]];if(n)return n}return null}var tg=()=>tt().generating||Date.now()-Ic<$f;function Oc(){return Intl.DateTimeFormat().resolvedOptions().timeZone}function Rc(){let t=Qe.store.sourceTimeZone;if(!t||t==="UTC")return"UTC";try{return Intl.DateTimeFormat(void 0,{timeZone:t}),t}catch{return"UTC"}}function Hc(t,e){let o={};for(let n of new Intl.DateTimeFormat("en-US",{timeZone:e,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(t)))o[n.type]=n.value;return{y:+o.year,m:+o.month,d:+o.day,h:+o.hour%24,mi:+o.minute,s:+o.second}}function Dc(t){return Date.UTC(t.y,t.m-1,t.d,t.h,t.mi,t.s)}function Tc(t,e){let o=t;for(let n=0;n<4;n++){let r=t-Dc(Hc(o,e));if(r===0)return o;o+=r}return o}function eg(t,e){if(e==="UTC")return t;let o=(t%1e3+1e3)%1e3,n=t-o,r=new Date(n),i=Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),r.getUTCHours(),r.getUTCMinutes(),r.getUTCSeconds()),s=Tc(i,e),d=3600*1e3,l=Number.POSITIVE_INFINITY;for(let u of[-d,0,d]){let m=s+u;Dc(Hc(m,e))===i&&m<l&&(l=m)}return l!==Number.POSITIVE_INFINITY?l+o:Tc(i+d,e)+o}function og(t,e){let o=Rc();return e||o==="UTC"?t:eg(t,o)}function Mc(t,e){return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}function ng(t){let e=Oc(),o=Date.now(),n={hour:"2-digit",minute:"2-digit",timeZone:e};if(Mc(t,e)===Mc(o,e))return new Intl.DateTimeFormat(void 0,n).format(t);let r=s=>new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric"}).format(s),i=r(t)===r(o)?{}:{year:"numeric"};return new Intl.DateTimeFormat(void 0,{...i,month:"short",day:"numeric",...n}).format(t)}function rg(t,e){let o=new Date(e).toLocaleString(void 0,{timeZone:Oc()}),n=Rc();if(n==="UTC"||e===t)return o;let r=new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"UTC"}).format(t);return`${kc.find(s=>s.value===n)?.label??n} ${r} \u2192 ${o}`}function Nc(t){let e=Wt(t)??t.getAttribute("data-message-author-role")??t.closest(c.turn)?.getAttribute("data-turn")??t.querySelector(c.authorRole)?.getAttribute("data-message-author-role");if(Sn(e))return e;let o=bo(t).at(-1);return kt(b())?.chain.find(n=>n.id===o)?.role??null}var Cc='[class*="group/activity-header"]';function ig(t){let e=t.parentElement;if(!e)return null;let o=t.closest(c.turn);return o&&e!==o&&!o.contains(e)?null:e}function ag(t){let e=t;for(let o=0;o<8&&e;o++){let n=ig(e);if(!n)return null;let r=[...n.children],i=r.indexOf(e);for(let s=i-1;s>=0;s--){let d=r[s],l=d.matches(Cc)?d:d.querySelector(Cc);if(l)return l;if(d.matches(c.searchUnit)||d.querySelector(c.searchUnit))return null}if(n===e.closest(c.turn))return null;e=n}return null}function sg(t){let e=t.parentElement;for(let o=0;o<4&&e;o++){if(e.classList.contains("flex-col"))return e;e=e.parentElement}return t.parentElement??t}function Uc(t,e){if(e==="assistant"){let o=ag(t);if(o)return sg(o)}return t}function lg(t,e){let o=ke();for(let n=o.length-1;n>=0;n--){let r=o[n];if(!(r!==t&&(Nc(r)!=="assistant"||Uc(r,"assistant")!==e)))return r===t}return!0}function Lc(t){return t.querySelector(':scope > time[data-bloom="timestamp"]')}function cg(t){let e=bo(t);if(!e.length||!vt(t)||t.querySelector("time:not([data-bloom])"))return;let o=Nc(t),n=Uc(t,o);if(n!==t&&!lg(t,n)){Lc(t)?.remove();return}let r=_f(e),i=!1;if(!r&&tg()){r=Date.now();let m=e.at(-1);Wi.add(m),Bc(m,r),i=!0}else r&&Wi.has(e.at(-1))&&(i=!0);let s=n.querySelector('time[data-bloom="timestamp"]')??Lc(t);if(!r||Qe.store.hideOwnMessages&&o==="user"){s?.remove();return}let d=og(r,i),l=ng(d);if(s?.textContent===l&&s.parentElement===n&&s===n.firstElementChild)return;let u=a("time",{class:`bloom-timestamp bloom-timestamp-${o??"assistant"}`,text:l,title:rg(r,d),attrs:{"data-bloom":"timestamp",datetime:new Date(d).toISOString()}});s&&s.replaceWith(u),(u.parentElement!==n||u!==n.firstElementChild)&&n.prepend(u)}var Xn=Nt(()=>{for(let t of ke())cg(t)}),Fc=h({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:Qe,styles:qc,start(){Ec=[M(t=>K(t)&&Xn()),xt.on("conversation",Xn),xt.on("message-time",({messageId:t,time:e})=>{Wi.delete(t),Bc(t,e),Xn()}),O.on("fall",()=>{Ic=Date.now()})]},stop(){for(let t of Ec)t();tr&&(clearTimeout(tr),Pc());for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove()},onSettingsChange(t){if(t!=="stamps"){for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove();Xn()}}});var ug=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])','[data-chatgpt-composer] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-composer-input] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-codex-composer-root] button[aria-label^="Dictat" i], [data-composer-placement] button[aria-label^="Dictat" i], [class*="ComposerLayout"] button[aria-label^="Dictat" i]'],dg=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],Kc=y({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),Gc=h({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:Kc,styles:()=>Dt([...ug,...Kc.store.hideDictationSettings?dg:[]])});var be="data-bloom-share",mg=/^\/g\/g-p-/,pg=/^(?:share|分享)$/i,fg=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],gg=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${be}="project"]`],zi=y({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),er,Vi=!1;function hg(t){if(!K(t))return;let e=mg.test(location.pathname)&&!b();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${be}]`))!e||!pg.test(v(o.textContent??""))?o.removeAttribute(be):o.hasAttribute(be)||o.setAttribute(be,"project")}var Yc=h({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:zi,styles:()=>Dt([...zi.store.hideShareChat?fg:[],...zi.store.hideShareProject?gg:[]]),start(){Vi=!0,Gt().then(()=>{Vi&&!er&&(er=M(hg))})},stop(){Vi=!1,er?.(),er=void 0;for(let t of document.querySelectorAll(`[${be}]`))t.removeAttribute(be)}});var jc='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',bg='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',yg="[data-bloom-profile-plan]",Qc="visibility:hidden!important;user-select:none!important",zc=y({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function vg(){let{hideUsername:t,hideEmail:e,enlargePlan:o,alignPlanWithAvatar:n}=zc.store,r=[];return t&&r.push(n?`:is(${jc}){display:none!important}`:`:is(${jc}){${Qc}}`),e&&r.push(`:is(${bg}){${Qc}}`),t&&o&&r.push(`${yg}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var Wc,Vc=h({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:zc,styles:vg,start(){Wc=wt()},stop(){Wc?.()}});var Ag=new Set(["chatgpt","new chat","\u65B0\u804A\u5929","codex"]);function wg(){let t=v(document.title.replace(/\s*[|–-]\s*(?:ChatGPT|Codex)$/i,""));return t&&!Ag.has(t.toLowerCase())?t:null}function No(t){return t?po(t)??(t===b()?wg():null):null}var Jc=`/*
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
`;var ot=L("bloom-recent-"),Tt="home",Sg=50,Zc=140,qg=new Set(["Backquote"]),Eg=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),x=y({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(t=>({label:t,value:t})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),Zt=null,ut=[],gt=0,Ji,$c=[],nr=()=>oe()?null:b()??(dn()?Tt:null);function Xc(t,e){return Object.fromEntries(Object.entries(t).filter(([o])=>e.has(o)))}function tu(t){let e=No(t);e&&x.store.titles[t]!==e&&(x.store.titles={...x.store.titles,[t]:e});let o=Us(location.href);o&&t===b()&&x.store.projects[t]!==o&&(x.store.projects={...x.store.projects,[t]:o})}function _c(t){if(!t)return;let e=[t,...x.store.visits.filter(n=>n!==t)].slice(0,Sg),o=new Set(e);x.store.visits=e,Object.keys(x.store.previews).some(n=>!o.has(n))&&(x.store.previews=Xc(x.store.previews,o)),Object.keys(x.store.titles).some(n=>!o.has(n))&&(x.store.titles=Xc(x.store.titles,o)),t!==Tt&&tu(t)}function Tg(t){if(!x.store.visits.includes(t))return;let{[t]:e,...o}=x.store.titles,{[t]:n,...r}=x.store.previews,{[t]:i,...s}=x.store.projects;x.store.visits=x.store.visits.filter(d=>d!==t),x.store.titles=o,x.store.previews=r,x.store.projects=s}function or(t){if(!t||!x.store.visits.includes(t))return;let e={},o=kt(t)?.chain??[];for(let r of o)e[r.role]=ht(En(r),Zc);if(t===b())for(let r of zt()){let i=Ie(r);i&&(e[r.role]=ht(i,Zc))}let n=x.store.previews[t];!e.user&&!e.assistant||n?.user===e.user&&n?.assistant===e.assistant||(x.store.previews={...x.store.previews,[t]:e})}function Mg(){let t=Number(x.store.maxRecent);return x.store.visits.filter(e=>e!==Tt||x.store.includeHome).slice(0,t)}function eu(t){if(ze(),t===nr())return;let e=t===Tt?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"], [data-sidebar-destination="builtin:home"]'):mo(t)[0];e?e.click():location.assign(t===Tt?"/":`/c/${t}`)}function Cg(t){let e=t===Tt?null:x.store.previews[t],o=e&&["user","assistant"].filter(n=>e[n]).map(n=>a("span",{class:ot("preview"),attrs:{"data-role":n},text:e[n]}));return a("span",{class:ot("thumb"),attrs:{"aria-hidden":"true"}},o?.length?a("span",{class:ot("page")},...o):a("span",{class:ot("fallback")},k(t===Tt?"plus":"bloom")))}function Lg(t,e){let o=t===Tt?"New chat":x.store.titles[t]??No(t)??"Untitled chat",n=t===Tt?null:x.store.projects[t];return a("button",{class:ot("item"),attrs:{type:"button",role:"option","aria-selected":String(e===gt),"aria-label":n?`${o}, ${n}`:o},on:{click:()=>eu(t),pointerenter:()=>e!==gt&&We(e)}},Cg(t),a("span",{class:ot("meta")},a("span",{class:`${ot("title")} bloom-truncate`,text:o}),n&&a("span",{class:ot("project")},k("folder"),a("span",{class:"bloom-truncate",text:n}))))}function ou(){ut.length?eu(ut[gt]):ze()}function We(t){ut.length&&(gt=(t+ut.length)%ut.length,Zt?.querySelectorAll(`.${ot("item")}`).forEach((e,o)=>e.setAttribute("aria-selected",String(o===gt))))}function kg(){or(b());let t=nr();ut=Mg(),t&&(ut=[t,...ut.filter(o=>o!==t)].slice(0,Number(x.store.maxRecent))),gt=ut.length>1?1:0;let e=ut.length?a("div",{class:ot("list"),attrs:{role:"listbox","aria-label":"Recent chats"}},...ut.map(Lg)):a("div",{class:ot("empty"),text:"Open a few chats, then hold Ctrl+` to switch."});e.style.setProperty("--bloom-recent-count",String(ut.length)),Zt=a("div",{class:`bloom-root ${ot("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:o=>o.target===o.currentTarget&&ze()}},a("div",{class:ot("panel")},e)),At(Zt)}function ze(){Zt?.remove(),Zt=null}var Ig=t=>qg.has(t.code)||Eg.has(t.key);function Bg(t){if(t.ctrlKey&&!t.altKey&&!t.metaKey&&Ig(t)){t.preventDefault(),t.stopPropagation(),Zt?We(gt+(t.shiftKey?-1:1)):kg();return}if(!Zt)return;let o={Escape:ze,Enter:ou,ArrowRight:()=>We(gt+1),ArrowDown:()=>We(gt+1),ArrowLeft:()=>We(gt-1),ArrowUp:()=>We(gt-1)}[t.key];o&&(t.preventDefault(),t.stopPropagation(),o())}function Pg(t){Zt&&t.key==="Control"&&ou()}var nu=h({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:x,styles:Jc,start(){Ji=new AbortController;let{signal:t}=Ji;addEventListener("keydown",Bg,{capture:!0,signal:t}),addEventListener("keyup",Pg,{capture:!0,signal:t}),addEventListener("blur",ze,{signal:t}),document.addEventListener("visibilitychange",()=>document.hidden&&or(b()),{signal:t}),$c=[yt(({prevId:i})=>{or(i),_c(nr())}),xt.on("conversation",({id:i})=>{x.store.visits.includes(i)&&tu(i),or(i)}),xt.on("conversation-missing",({id:i})=>Tg(i))];let{visits:e,titles:o,previews:n}=x.store,r=e.filter(i=>i!==Tt&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(x.store.visits=e.filter(i=>!r.includes(i))),_c(nr())},stop(){Ji?.abort();for(let t of $c)t();ze()}});var Zi="data:audio/mpeg;base64,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";var ru=new q("ResponseNotification"),Og=.5,iu="BloomNoticeClaim",Rg=3e4,Uo=y({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:t=>(t.append(N("Preview",uu)),()=>t.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),au=null,$i=new Map,su=[],Xi,Hg=t=>Uint8Array.from(atob(t.slice(t.indexOf(",")+1)),e=>e.charCodeAt(0)).buffer;function Dg(t,e){let o=$i.get(e);return o||(o=(e.startsWith("data:")?Promise.resolve(Hg(e)):jo(e)).then(n=>t.decodeAudioData(n)),o.catch(()=>$i.delete(e)),$i.set(e,o)),o}async function lu(t){au??=new AudioContext;let e=au;e.state==="suspended"&&e.resume();let o=e.createBufferSource(),n=e.createGain();o.buffer=await Dg(e,t),n.gain.value=Og,o.connect(n).connect(e.destination),o.start()}function uu(){let t=Uo.store.soundUrl.trim();lu(t||Zi).catch(e=>{ru.warn("Sound failed",e),t&&lu(Zi).catch(o=>ru.warn("Default chime failed",o))})}function Ng(t){let e=`${t??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:e,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:e,silent:!0});o.onclick=()=>{focus(),o.close()}}function Ug(t){let e=Yo($o(iu)??"");return t&&C(e)&&e.id===t&&Date.now()-Number(e.at)<Rg?!1:(Xo(iu,{id:t,at:Date.now()}),!0)}function cu(t){Uo.store.onlyWhenHidden&&!document.hidden||Ug(t)&&(Uo.store.sound&&uu(),Uo.store.browserNotification&&Ng(No(t)))}function Fg(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(Xi=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:Xi.signal}))}var du=h({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply, including chats you left while they were answering.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:Uo,start(){Fg(),su=[O.on("fall",({conversationId:t,outcome:e})=>e==="done"&&cu(t)),O.on("background",({conversationId:t})=>cu(t))]},stop(){for(let t of su)t();Xi?.abort()}});var Kg=`:is(${c.sidebarScroll}, :has(> ${c.sidebarScroll})) + :has(${c.menuButton})`,Gg=`${c.rail} > :has(${c.menuButton})`,ta=`:is(${Kg}, ${Gg}, ${c.oldProfile}):not(:hover)`,_i="[data-bloom-profile-avatar]",Yg=`:is(${ta}, ${ta} :has(${_i})) > :not(${_i}, :has(${_i}))`,pu=y({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function jg(){let{opacity:t,fadeAvatar:e}=pu.store;return t>=100?"":`${e?ta:Yg}{opacity:${t/100}!important}`}var mu,fu=h({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:pu,styles:jg,start(){mu=wt()},stop(){mu?.()}});var gu=`/*
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
`;var F=L("bloom-star-chats"),Wg=80,zg=60,Vg=1200,Jg=120,Fo=y({replaceReadAloud:{type:"boolean",description:"Put the star where the reply's Read aloud button is, and hide that button.",default:!0},messages:{type:"custom",default:[]}}),Zg=`:is(${c.turnActions}) ${c.readAloud}`,ea,oa=!1,$t=!1,ve=!1,rr=0,J=null,ir="",B=null,na,Xt;function ia(){let t=Fo.store.messages;return Array.isArray(t)?t.filter(e=>C(e)&&typeof e.conversationId=="string"&&typeof e.messageId=="string"&&(e.role==="user"||e.role==="assistant")&&typeof e.snippet=="string"&&typeof e.starredAt=="number"):[]}function aa(){let t=b();return t?ia().filter(e=>e.conversationId===t):[]}function $g(t,e){return ia().some(o=>o.conversationId===t&&o.messageId===e)}function hu(t){let e=ia(),o=e.some(n=>n.conversationId===t.conversationId&&n.messageId===t.messageId);Fo.store.messages=o?e.filter(n=>!(n.conversationId===t.conversationId&&n.messageId===t.messageId)):[{...t,starredAt:Date.now()},...e].slice(0,Wg)}function ra(t){return t.messageIds[0]||t.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||t.el.getAttribute("data-turn-key")||""}function Xg(t){return ht(Ie(t)||v(t.el.textContent??""),zg)}function _g(t){let e=t.closest(c.turn);if(!e)return null;let o=zt().filter(n=>e.contains(n.el));return o.find(n=>n.el.contains(t)||n.el===e)??o.findLast(n=>n.el.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING)??null}function th(){let t=[...document.querySelectorAll(c.turnActions)].filter(e=>!e.closest(`[data-bloom], [role="dialog"], [inert], pre, ${c.sidebars}`));return t.filter(e=>!t.some(o=>o!==e&&o.contains(e)))}function eh(t,e){let o=Fo.store.replaceReadAloud?e.querySelector(c.readAloud):null;if(o&&!o.closest("[data-bloom]")){t.nextElementSibling!==o&&o.before(t);return}let n=oh(e);(t.parentElement!==n||n.lastElementChild!==t)&&n.append(t)}function oh(t){let e=[...t.querySelectorAll("button")].filter(n=>n.dataset.bloom!=="message-star"&&!n.closest("[data-bloom]"));return e.length?[...t.children].find(n=>n instanceof HTMLElement&&n!==e[0]&&e.every(r=>n.contains(r)))??t:t}function nh(){return[...document.querySelectorAll(c.headerMore)].filter(e=>{if(e.dataset.bloom==="message-star"||e.closest("[data-bloom], [role='dialog'], [inert]")||e.closest(c.sidebars))return!1;let o=e.getBoundingClientRect();return o.width===0&&o.height===0?!!e.closest("header, #page-header"):o.top>=0&&o.top<96&&o.left>window.innerWidth*.5}).toSorted((e,o)=>o.getBoundingClientRect().left-e.getBoundingClientRect().left||(e.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1))[0]??null}function bu(t,e,o){return a("button",{class:e,attrs:{type:"button","aria-label":t},on:{pointerdown:n=>n.stopPropagation(),mousedown:n=>n.stopPropagation(),click:n=>{n.preventDefault(),n.stopPropagation(),o(n)}}},k("star"))}function rh(t,e){t.setAttribute("aria-pressed",String(e)),t.setAttribute("aria-label",e?"Unstar":"Star")}function ar(){return $t||ve}function Ve(){rr&&window.clearTimeout(rr),rr=0}function Je(){$t=!1,ve=!1,Ve(),Xt?.enter(),J?.remove(),J=null,ir="",B?.classList.remove(F("-open")),B?.setAttribute("aria-expanded","false")}function sr(t){return t instanceof Node&&!!(B?.contains(t)||J?.contains(t))}function ih(t){t.classList.add(F("-flash")),window.setTimeout(()=>t.classList.remove(F("-flash")),Vg)}function ah(t){let e=zt().find(n=>ra(n)===t),o=e?.el.closest(c.turn)??e?.el;o&&(o.scrollIntoView({block:"start"}),ih(o))}function sh(){let t=b(),e=new Set,o=[...document.querySelectorAll('[data-bloom="message-star"][data-place="action"]')];if(!t||oe()){for(let n of o)n.remove();return}for(let n of th()){if(!vt(n))continue;let r=_g(n),i=r?ra(r):"";if(!r||!i)continue;let s=n.querySelector('[data-place="action"]');(!s||s.dataset.id!==i)&&(s?.remove(),s=bu("Star",F("-star"),()=>{let d=b(),l=zt().find(u=>ra(u)===i);!d||!l||hu({conversationId:d,messageId:i,role:l.role,snippet:Xg(l)})}),s.dataset.bloom="message-star",s.dataset.place="action",s.dataset.id=i),rh(s,$g(t,i)),eh(s,n),e.add(s)}for(let n of o)e.has(n)||n.remove()}function lh(){if(!J||!B)return;let t=B.getBoundingClientRect(),e=J.offsetWidth||288,o=J.offsetHeight||120,n=t.bottom+6;n+o>window.innerHeight-8&&(n=Math.max(8,t.top-o-6));let r=Math.max(8,Math.min(t.right-e,window.innerWidth-e-8));J.dataset.place=n>=t.bottom?"below":"above",J.style.left=`${Math.round(r)}px`,J.style.top=`${Math.round(n)}px`}function ch(){if(!ar()||!B){J?.remove(),J=null,ir="",B?.classList.remove(F("-open")),B?.setAttribute("aria-expanded","false");return}let t=aa(),e=t.map(o=>`${o.messageId}	${o.snippet}`).join(`
`);if(!J||ir!==e){J?.remove();let o=t.map(n=>a("div",{class:F("-row")},a("button",{class:F("-jump"),attrs:{type:"button"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),Je(),ah(n.messageId)}}},a("span",{class:F("-role"),text:n.role==="user"?"You":"ChatGPT"}),a("span",{class:F("-snip"),text:n.snippet||"Message"})),bu("Unstar",F("-unstar"),()=>hu(n))));J=a("div",{class:`bloom-root ${F("-panel")}`,attrs:{"data-bloom":"star-list"},on:{pointerenter:()=>{Ve(),Xt?.enter(),ve=!0},pointerleave:n=>{sr(n.relatedTarget)||$t||Xt?.leave(n)}}},a("div",{class:F("-bridge"),attrs:{"aria-hidden":"true"}}),a("div",{class:F("-head"),text:"Starred"}),a("div",{class:F("-body")},...o.length?o:[a("div",{class:F("-empty"),text:"No starred messages in this chat"})])),document.body.append(J),ir=e}lh(),B.classList.add(F("-open")),B.setAttribute("aria-expanded","true")}function uh(){for(let r of document.querySelectorAll('[data-bloom="starred"]'))r.remove();let t=nh(),e=t?.parentElement??null,o=b();if(!t||!e||e.closest(c.sidebars)||!o||oe()||!vt(e)){B?.remove(),B=null,Je();return}B||(B=a("button",{class:F("-toggle"),attrs:{type:"button","data-bloom":"message-star","data-place":"header","aria-label":"Starred messages","aria-expanded":"false"},on:{pointerdown:r=>r.stopPropagation(),pointerenter:()=>{Ve(),Xt?.enter(),rr=window.setTimeout(()=>{ve=!0,ye()},Jg)},pointerleave:r=>{sr(r.relatedTarget)||(Ve(),ar()&&Xt?.leave(r))},click:r=>{r.preventDefault(),r.stopPropagation(),$t=!$t,ve=$t,Ve(),$t||Je(),ye()}}},k("star"))),(B.parentElement!==e||B.nextElementSibling!==t)&&t.before(B);let n=t.getBoundingClientRect();n.width>0&&(B.style.width=`${n.width}px`,B.style.height=`${n.height}px`),B.classList.toggle(F("-here"),aa().length>0),ch()}function dh(){let t=new Set(aa().map(e=>e.messageId));for(let e of document.querySelectorAll('[data-bloom="navigator"] .bloom-nav-tick, [data-bloom="navigator"] .bloom-nav-row'))e.classList.toggle(F("-mark"),!!e.dataset.messageId&&t.has(e.dataset.messageId))}function ye(){if(!oa){oa=!0;try{for(let t of document.querySelectorAll('[data-bloom="starred"], [data-bloom="chat-star"]'))t.remove();sh(),uh(),dh()}finally{oa=!1}}}function mh(){Je(),B?.remove(),B=null;for(let t of document.querySelectorAll('[data-bloom="message-star"], [data-bloom="star-list"], [data-bloom="starred"], [data-bloom="chat-star"]'))t.remove();for(let t of document.querySelectorAll(`.${F("-mark")}`))t.classList.remove(F("-mark"))}var yu=h({name:"StarChats",description:"Star a message from its toolbar. The star left of the top-right menu opens this chat's list.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:Fo,styles:()=>`${gu}${Fo.store.replaceReadAloud?Dt([Zg]):""}`,onSettingsChange(t){(t==="messages"||t==="replaceReadAloud")&&ye()},start(){for(let o of document.querySelectorAll('[data-bloom="star-list"]'))o.remove();Xt=Tn({over:sr,trigger:()=>B,panel:()=>J,setHeld(o){if(o){ve=!0,ye();return}$t||(ve=!1,ye())}}),ea=M(o=>K(o)&&ye());let t=o=>{sr(o.target)||ar()&&Je()};document.addEventListener("pointerdown",t,!0);let e=o=>{o.key!=="Escape"||!ar()||(o.preventDefault(),Je())};document.addEventListener("keydown",e,!0),na=()=>{document.removeEventListener("pointerdown",t,!0),document.removeEventListener("keydown",e,!0)},ye()},stop(){ea?.(),ea=void 0,na?.(),na=void 0,Ve(),Xt?.dispose(),Xt=void 0,mh()}});var vu="filter:blur(6px)!important;transition:filter 0.2s ease",o0=`:is(${c.sidebars})`,Ae="data-bloom-streamer-open",ph="[data-app-action-sidebar-thread-row], [data-app-action-sidebar-project-row], .bloom-recent-item",Au=":not([data-app-action-sidebar-thread-row] *, [data-app-action-sidebar-project-row] *)";function fh(){return{conversations:{selectors:["[data-app-action-sidebar-thread-title]"],hover:!0,row:"[data-app-action-sidebar-thread-row]"},projects:{selectors:["[data-app-action-sidebar-project-label]"],hover:!0,row:"[data-app-action-sidebar-project-row]"},accountAvatar:{selectors:["[data-bloom-profile] img","[data-bloom-menu] img"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:[`[data-thread-title]${Au}`,`[data-thread-title-trigger]${Au}`],hover:!1}}}var wu=y({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function gh(t,e){let o=[`:is(${t}):hover`,`.bloom-recent-item:hover :is(${t})`,`:is(${t})[${Ae}]`];return e&&o.push(`${e}:hover`,`${e}:hover :is(${t})`,`${e}:is(${t}):hover`,`${e}[${Ae}]`,`${e}[${Ae}] :is(${t})`),o.join(",")}function hh(){let t=fh();return Object.entries(t).filter(([e])=>wu.store[e]).map(([,e])=>{let o=e.selectors.join(",");if(!e.hover)return`:is(${o}){${vu}}`;let n="row"in e?e.row:void 0;return`:is(${o}){${vu}}${gh(o,n)}{filter:none!important}`}).join(`
`)}function bh(t,e){for(let o of document.elementsFromPoint(t,e))if(o instanceof Element){let n=o.closest(ph);if(n)return n}return null}function ca(t){for(let e of document.querySelectorAll(`[${Ae}]`))e!==t&&e.removeAttribute(Ae);t&&!t.hasAttribute(Ae)&&t.setAttribute(Ae,"")}var Ze,yh=Nt(()=>{Ze&&ca(bh(Ze.clientX,Ze.clientY))});function sa(t){Ze=t,yh()}function vh(t){t.relatedTarget instanceof Node&&document.documentElement.contains(t.relatedTarget)||(Ze=void 0,ca(null))}var la,lr,xu=h({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:wu,styles:hh,start(){la=wt(),lr=new AbortController;let t={capture:!0,signal:lr.signal,passive:!0};document.addEventListener("pointerover",sa,t),document.addEventListener("pointermove",sa,t),document.addEventListener("pointerout",sa,t),window.addEventListener("pointerleave",vh,t)},stop(){lr?.abort(),lr=void 0,Ze=void 0,ca(null),la?.(),la=void 0}});var _t=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)','[data-turn-key] [data-message-author-role="user"] blockquote:not(.twitter-tweet)','[class~="group/user-message"] blockquote:not(.twitter-tweet)'].join(","),ua=y({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function Ah(){let t=[`${_t}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${_t}>*{margin-block:0!important}`];return ua.store.italic||t.push(`${_t}{font-style:inherit!important}`),ua.store.quotes||(t.push(`${_t}{quotes:none!important}`),t.push(`${_t}::before,${_t}::after,${_t} p::before,${_t} p::after{content:none!important}`)),t.join(`
`)}var Su=h({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:ua,styles:Ah});var wh=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],xh=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",Sh='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',qu=y({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function qh(){let t=`${qu.store.width}rem`;return`:root,[data-app-action-timeline-scroll],[data-chatgpt-composer],[data-composer-input]{--thread-content-max-width:${t}!important;--composer-adjacent-max-width:${t}!important}`}var Eu=h({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:qu,styles:qh});var Eh=[Zs,ws,Cl,Dl,Fl,Yl,Ql,_l,cc,bc,Sc,Fc,Gc,Yc,Vc,nu,du,fu,yu,xu,Su,Eu],da=Eh;var Th=new q("Bloom"),Tu="2.0.106";var ma=0,cr,Ko="__bloomOnShortcut";function ur(t){if(t.isComposing||!t.shiftKey||!(t.metaKey||t.ctrlKey)||t.key!=="b"&&t.key!=="B")return;t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation();let e=Bs();jt();for(let o of document.querySelectorAll("[data-bloom='settings']"))o.remove();e||Le()}function Mh(){let t=dt;t[Ko]&&document.removeEventListener("keydown",t[Ko],!0),t[Ko]=ur,document.addEventListener("keydown",ur,!0)}function Ch(){ma++,document.removeEventListener("keydown",ur,!0);let t=dt;t[Ko]===ur&&delete t[Ko],cr?.(),cr=void 0,za(),to(),zo()}async function pa(){let t=++ma,e=()=>t===ma;to(),zo();for(let o of da)o.updatedAt=us[o.name];Oa(da),ka(),Ha(),Qo("base",Ja),ls(),Mh(),an("Init"),Cr().then(()=>{e()&&(xa(),an("DOMContentLoaded"))}),await Lr(),e()&&(an("HostReady"),cr?.(),cr=Rs(),Wa(),Th.info(`Bloom++ ${Tu} app host ready`))}var Lh=new q("Boot");window===window.top&&(qa(dt.Bloom),Ea(fa),pa().catch(t=>Lh.error("Startup failed",t)));})();
