// ==UserScript==
// @name         Bloom++ (ChatGPT app)
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.104
// @description  Bloom++ host for the official ChatGPT macOS app. Injected over loopback CDP; not a web userscript.
// @author       0-V-linuxdo & Bloom contributors
// @homepageURL  https://github.com/0-V-linuxdo/Bloom
// @supportURL   https://github.com/0-V-linuxdo/Bloom/issues
// @match        app://*/*
// @run-at       document-start
// @grant        none
// @license      GPL-3.0-or-later
// ==/UserScript==

/* Bloom++ v2.0.104 ChatGPT app host. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var yd=Object.defineProperty;var vd=(t,e)=>{for(var o in e)yd(t,o,{get:e[o],enumerable:!0})};var S=class{constructor(e){this.tag=e}log(e,o){console[e](`[Bloom++] [${this.tag}]`,...o)}debug(...e){this.log("debug",e)}info(...e){this.log("info",e)}warn(...e){this.log("warn",e)}error(...e){this.log("error",e)}};var ot=(t,e,o)=>Math.min(o,Math.max(e,t)),C=t=>typeof t=="object"&&t!==null&&!Array.isArray(t),Ze=t=>`${t}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,bt=(t,e)=>t.length>e?`${t.slice(0,e-1)}\u2026`:t,y=t=>t.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function ca(t,e){return`${t} ${e}${t===1?"":"s"}`}async function Fo(t){if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}await navigator.clipboard.writeText(t)}function Ko(t){try{return JSON.parse(t)}catch{return}}var dt=typeof unsafeWindow>"u"?window:unsafeWindow,Ad=200,wd=300;function Go(t){return new Promise((e,o)=>GM_xmlhttpRequest({url:t,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=Ad&&n<wd?e(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var xd=new S("Styles"),Rt=new Map,$e=new Set,te=new Map,lr=!0,da=t=>t.replaceAll(/[^A-Za-z0-9_-]/g,"_"),Sd=t=>`:where(:root){--bloom-sheet-${da(t)}:1}`,qd=(t,e)=>`${Sd(t)}${e}`,ua=t=>`bloom-style-${t}`;function ma(t){try{return[...t.cssRules].map(e=>e.cssText).join(`
`)}catch{return""}}function Ed(t,e){let o=ma(t);return o?o.includes(`--bloom-sheet-${da(e)}`)?!0:e==="plugin-StreamerMode"?o.includes("blur(6px)")&&(o.includes("data-app-action-sidebar-thread-title")||o.includes("data-bloom-streamer-open")):e==="plugin-WiderChat"?o.includes("--composer-adjacent-max-width")&&o.includes("--thread-content-max-width"):e==="plugin-ComposerOpacity"?o.includes("--composer-layout-surface-backdrop-filter")||o.includes("--composer-layout-surface-background")&&o.includes("color-mix"):!1:!1}function pa(t){let e=ma(t);return e?!!(e.includes("--bloom-")||e.includes(".bloom-")||e.includes("[data-bloom")||e.includes("--bloom-sheet-")||e.includes("blur(6px)")&&e.includes("data-app-action-sidebar-thread-title")||e.includes("--composer-adjacent-max-width")&&e.includes("--thread-content-max-width")||e.includes("--composer-layout-surface-backdrop-filter")):!1}function fa(){let t=document.adoptedStyleSheets.filter(e=>!$e.has(e)&&!pa(e));document.adoptedStyleSheets=[...t,...Rt.values()]}function ga(t){document.readyState==="loading"||t.parentNode===document.head||document.head.append(t)}function Td(t,e){let o=te.get(t);o||(o=document.createElement("style"),o.id=ua(t),te.set(t,o)),o.textContent!==e&&(o.textContent=e),ga(o)}function Yo(t,e){let o=qd(t,e);if(lr)try{let n=Rt.get(t);n||(n=new dt.CSSStyleSheet,Rt.set(t,n),$e.add(n)),n.replaceSync(o),fa();return}catch(n){xd.warn("Constructed style sheets unavailable, using <style> after parsing",n),lr=!1;let r=Rt.get(t);r&&$e.delete(r),Rt.delete(t)}Td(t,o)}function Xe(t){let e=Rt.get(t);e&&($e.delete(e),Rt.delete(t)),te.get(t)?.remove(),te.delete(t);for(let o of document.querySelectorAll(`style[id="${ua(t)}"]`))o.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(o=>o!==e&&!Ed(o,t)),lr&&fa()}catch{}}function _e(){Rt.clear(),$e.clear();for(let t of te.values())t.remove();te.clear();for(let t of document.querySelectorAll("style[id^='bloom-style-']"))t.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(t=>!pa(t))}catch{}}function ha(){for(let t of te.values())ga(t)}var L=t=>(...e)=>e.map(o=>t+o).join(" "),jo=(...t)=>t.filter(Boolean).join(" "),Ht=t=>t.length?`${t.map(e=>`${e}:not([data-bloom])`).join(",")}{display:none!important}`:"";var ba="__bloomHost",cr=new S("Boot"),Md=['[data-bloom="navigator"]','[data-bloom="settings"]','[data-bloom="history-hud"]','[data-bloom="history-dialog"]','[data-bloom="star-list"]','[data-bloom="entry"]','[data-bloom="menu-entry"]','[data-bloom="menu-flyout"]','[data-bloom="message-star"]','[data-bloom="starred"]','[data-bloom="chat-star"]','[data-bloom="queue"]','[data-bloom="recent"]','[data-bloom="quote-chip"]','[data-bloom="quote-back"]','[data-bloom="cls"]','[data-bloom="timestamp"]','[data-bloom="tooltip"]','[data-bloom="notices"]'].join(", "),Cd=["data-bloom-greeting","data-bloom-placeholder","data-bloom-streamer-open","data-bloom-share","data-bloom-invite","data-bloom-csi-avatar","data-bloom-csi-sized"];function Qo(){if(!(typeof document>"u"||!document.documentElement)){for(let t of document.querySelectorAll(Md))t.remove();for(let t of Cd)for(let e of document.querySelectorAll(`[${t}]`))e.removeAttribute(t);for(let t of document.querySelectorAll("[data-bloom-text]"))t.removeAttribute("data-bloom-text"),t.style.removeProperty("--bloom-text-size"),t.style.removeProperty("--bloom-text")}}function Ld(t){if(cr.warn("Replacing another Bloom++ instance",t.VERSION),t.destroy){t.destroy();return}for(let e of t.plugins?.values()??[]){try{e.stop?.()}catch(o){cr.error("Failed to stop previous plugin",o)}e.styles="",e.start=void 0}_e()}function ya(t){let e=dt,o=new Set;for(let n of[t,e.Bloom,e[ba]])if(!(!n||o.has(n))){o.add(n);try{Ld(n)}catch(r){cr.error("Failed to retire Bloom++",r)}}Qo()}function va(t){let e=dt;try{delete e.Bloom}catch{}Object.defineProperty(e,"Bloom",{value:t,configurable:!0,writable:!0}),Object.defineProperty(e,ba,{value:t,configurable:!0,writable:!0})}var la={};vd(la,{VERSION:()=>bd,destroy:()=>fh,init:()=>sa,plugins:()=>V});var kd=new S("Dom");function s(t,e={},...o){let n=document.createElement(t);e.class&&(n.className=e.class),e.text!=null&&(n.textContent=e.text),e.title&&(n.title=e.title);for(let[r,i]of Object.entries(e.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(e.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var Aa=document.createElement("template");function wa(t){return Aa.innerHTML=t.trim(),Aa.content.firstElementChild.cloneNode(!0)}var yt=t=>t instanceof HTMLElement&&t.isConnected&&t.getClientRects().length>0&&!t.closest("[inert]"),$=(t,e=document)=>[...e.querySelectorAll(t)].find(yt)??null,Bd=16,Id="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function xa(t,e){let o=setInterval(t,e),n;try{n=new Worker(URL.createObjectURL(new Blob([Id],{type:"text/javascript"}))),n.addEventListener("message",t),n.postMessage(e)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function dr(t){document.hidden?setTimeout(t,Bd):requestAnimationFrame(t)}function Dt(t){let e=!1;return()=>{e||(e=!0,dr(()=>{e=!1;try{t()}catch(o){kd.error("Scheduled task failed",o)}}))}}var Wo=new Set,zo=[],to,Pd=Dt(()=>{let t=zo;zo=[];for(let e of Wo)e(t)});function M(t){return Wo.add(t),to||(to=new MutationObserver(e=>{zo.push(...e),Pd()}),to.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),t([]),()=>{Wo.delete(t),!Wo.size&&(to?.disconnect(),to=void 0,zo=[])}}var Od=t=>t instanceof Element&&(t.hasAttribute("data-bloom")||!!t.closest("[data-bloom]")),U=t=>!t.length||t.some(e=>!Od(e.target)),Rd=t=>`"${t.replaceAll("\\","\\\\").replaceAll('"','\\"').replaceAll(`
`,"\\A ")}"`;function ee(t,e){if(e==null){t.removeAttribute("data-bloom-text"),t.style.removeProperty("--bloom-text-size"),t.style.removeProperty("--bloom-text");return}t.style.setProperty("--bloom-text",Rd(e)),t.getAttribute("data-bloom-text")!==e&&t.setAttribute("data-bloom-text",e)}function h(t){return t}var Hd=new S("Storage");function Vo(t){try{return localStorage.getItem(t)??void 0}catch{return}}function Jo(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch(o){Hd.warn("localStorage write failed",o)}}function Sa(t,e){addEventListener("storage",o=>{o.key===t&&e(o.newValue)})}var ur="BloomSettings",Dd=100,Nt={plugins:{}},Zo=new Set,mr=new Set,Ae;function qa(t){let e=t;for(let o=0;typeof e=="string"&&o<2;o++)e=Ko(e);return!C(e)||!C(e.plugins)||!Object.keys(e.plugins).length?null:e}function Ea(){let t=qa(Vo(ur));t&&(Nt.plugins=t.plugins)}var Ta=(t,e)=>`${t}
${e}`;function pr(){Ae=void 0,mr.clear(),Jo(ur,Nt)}function Nd(t){let e=qa(t);if(!e)return;let o=[];for(let n of new Set([...Object.keys(Nt.plugins),...Object.keys(e.plugins)])){let r=Nt.plugins[n]??={},i=C(e.plugins[n])?e.plugins[n]:{};for(let a of new Set([...Object.keys(r),...Object.keys(i)]))mr.has(Ta(n,a))||JSON.stringify(r[a])===JSON.stringify(i[a])||(i[a]===void 0?delete r[a]:r[a]=i[a],o.push([n,a]))}for(let[n,r]of o)for(let i of Zo)i(n,r)}function fr(){Ae&&(clearTimeout(Ae),pr())}function Ma(t){let e=Object.keys(Nt.plugins).filter(o=>!t.has(o));if(!e.length)return e;for(let o of e)delete Nt.plugins[o];return clearTimeout(Ae),pr(),e}var nt=(t,e)=>Nt.plugins[t]?.[e];function ut(t,e,o){let n=Nt.plugins[t]??={};o===void 0?delete n[e]:n[e]=o,mr.add(Ta(t,e)),clearTimeout(Ae),Ae=setTimeout(pr,Dd);for(let r of Zo)r(t,e)}function we(t){return Zo.add(t),()=>void Zo.delete(t)}function gr(t){return t.type==="component"?void 0:t.default}function b(t){let e={def:t,pluginName:"",store:new Proxy({},{get:(o,n)=>nt(e.pluginName,n)??(t[n]&&gr(t[n])),set:(o,n,r)=>(ut(e.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(t))t[o].type!=="custom"&&nt(e.pluginName,o)!==void 0&&ut(e.pluginName,o)}};return e}var Ca=t=>{let e=()=>{let o=nt("Settings",t);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>e().includes(o),list:e,toggle(o){let n=e();ut("Settings",t,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},$o=Ca("pinnedPlugins"),Xo=Ca("starredPlugins");addEventListener("pagehide",fr);Sa(ur,Nd);var no=new S("PluginManager"),V=new Map,Ut=new Set,tn=new Set,hr=new Set,eo=new Map,Ud=2880*60*1e3;function La(t){for(let e of t)e.settings&&(e.settings.pluginName=e.name),V.set(e.name,e)}var ka=()=>{let t=nt("Settings","knownPlugins");return C(t)?t:null};function Ba(){let t=Ma(new Set(V.keys()));t.length&&no.info(`Dropped settings of removed plugins: ${t.join(", ")}`);let e=ka(),o=Date.now(),n={...e},r=[...V.values()].filter(i=>!i.hidden&&!i.required&&!(i.name in n));for(let i of r)n[i.name]=e?o:0;for(let i of Object.keys(n))V.has(i)||delete n[i];JSON.stringify(n)!==JSON.stringify(e)&&ut("Settings","knownPlugins",n)}var Ia=t=>{let e=ka()?.[t];return!!e&&Date.now()-e<Ud},Pa=t=>eo.get(t);function Oa(){for(let t of hr)t()}function br(t,e){let o=eo.get(t);(e?o?.join(`
`)===e.join(`
`):!o)||(e?eo.set(t,e):eo.delete(t),Oa())}var Mt=t=>!!t.required||(nt(t.name,"enabled")??!!t.enabledByDefault),yr=t=>Ut.has(t),oo=t=>`plugin-${t.name}`;function Ra(t){if(!t.styles)return;let e=typeof t.styles=="function"?t.styles():t.styles;e?Yo(oo(t),e):Xe(oo(t))}function Ha(t){if(!Ut.has(t.name))try{Ra(t),t.start?.(),Ut.add(t.name)}catch(e){Xe(oo(t)),no.error(`Failed to start ${t.name}`,e)}}function en(t){Ut.delete(t.name),Xe(oo(t));try{t.stop?.()}catch(e){no.error(`Failed to stop ${t.name}`,e)}}var vr=t=>t.startAt??"HostReady";function Da(t){if(Mt(t)){tn.has(vr(t))&&Ha(t);return}en(t)}function on(t){tn.add(t);for(let e of V.values())vr(e)===t&&Da(e);no.info(`${t}: ${[...Ut].join(", ")}`)}function Na(t){en(t)}function Ua(t){Mt(t)&&tn.has(vr(t))&&Ha(t)}function Fa(t,e){ut(t.name,"enabled",e),fr()}function Fd(){for(let t of V.values())t.required||Mt(t)||(Ut.has(t.name)?en(t):Xe(oo(t)))}var _o;function Ka(){_o?.(),_o=M(()=>Fd())}function Ga(){_o?.(),_o=void 0;for(let t of V.values())en(t);Ut.clear(),tn.clear(),eo.clear()}function Ya(t){return hr.add(t),()=>void hr.delete(t)}we((t,e)=>{let o=V.get(t);if(o){if(e==="enabled"){typeof nt(t,"enabled")=="boolean"&&Da(o),Oa();return}if(Ut.has(t))try{Ra(o),o.onSettingsChange?.(e)}catch(n){no.error(`Settings change failed for ${t}`,n)}}});var ja=`/*
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
`;var Gd=new S("Events");function xe(){let t=new Map;return{on(e,o){let n=t.get(e);return n||t.set(e,n=new Set),n.add(o),()=>void n.delete(o)},emit(e,o){for(let n of t.get(e)??[])try{n(o)}catch(r){Gd.error(`Listener for ${String(e)} failed`,r)}}}}function Qa(t,e){let o=t instanceof Element?[t,...t.querySelectorAll("*")]:[...t.querySelectorAll("*")];for(let n of o){let r=n.shadowRoot;r&&(e(r),Qa(r,e))}}function Ft(t,e=document){let o=[...e.querySelectorAll(t)];return Qa(e,n=>o.push(...n.querySelectorAll(t))),o}var mt=(t,e=document)=>Ft(t,e).find(yt)??null;var c={rail:"[data-app-navigation-rail]",sidebarScroll:"[data-app-action-sidebar-scroll]",sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"[data-app-action-sidebar-scroll]",oldRail:"[data-app-navigation-rail]",oldProfile:'button[aria-label="Open profile menu" i]',threadRow:"[data-app-action-sidebar-thread-row]",threadSelected:"[data-app-action-sidebar-thread-row][data-app-action-sidebar-thread-selected='true']",threadTitle:"[data-app-action-sidebar-thread-title]",projectRow:"[data-app-action-sidebar-project-row]",projectLabel:"[data-app-action-sidebar-project-label]",destination:"[data-sidebar-destination]",conversationLink:"[data-app-action-sidebar-thread-row]",timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:"[data-turn-key]",turn:"[data-turn-key]",messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",userBubble:'[class~="group/user-message"]',assistantReply:"[data-response-annotation-target]",oldThread:"[data-app-action-timeline-scroll]",turnActions:'.turn-action-controls, [class*="turn-action-controls"]',readAloud:'button:is([aria-label="Read aloud" i], [aria-label^="Read aloud" i], [aria-label="Stop reading" i], [aria-label^="Stop reading" i], [aria-label="\u6717\u8BFB"], [aria-label^="\u6717\u8BFB"], [aria-label="\u505C\u6B62\u6717\u8BFB"], [data-testid*="read-aloud" i])',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery, [class*='recovery']",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composer:"[data-chatgpt-composer], [data-composer-input]",composerInput:'[data-composer-input] [contenteditable="true"].ProseMirror, [contenteditable="true"].ProseMirror',composerConversation:"[data-above-composer-conversation-id]",oldComposerForm:"[data-chatgpt-composer]",sendButton:'button[aria-label="Send" i], button[aria-label="Send prompt" i], button[aria-label="Send message" i]',stopButton:'button[aria-label="Stop" i], button[aria-label^="Stop " i], button[aria-label="\u505C\u6B62" i], button[aria-label^="\u505C\u6B62"]',composerFooter:"[data-chatgpt-composer]",modelTrigger:'button[aria-label="Model selector" i], button[aria-label="Select ChatGPT model" i], [data-chatgpt-composer] button[aria-haspopup="menu"]',modelItem:'[role="menu"] [role="menuitemradio"], [role="menu"] [role="menuitem"]',effortSlider:'[role="menu"] [data-reasoning-slider]',homeHeading:'main h1:not([aria-hidden="true"]), [role="main"] h1:not([aria-hidden="true"]), [data-testid="home-heading"], [data-homepage-takeover] h1, .heading-xl, [class~="heading-xl"]',headerMore:'button[aria-label="More" i], button[aria-label="\u66F4\u591A"]',headerTitle:"[data-thread-title], [data-thread-title-trigger]",profile:'button[aria-label="Open profile menu" i]',rightPanel:"aside[data-app-shell-focus-area='right-panel']",summaryPanel:"[data-summary-panel-variant]"};var Wa=/[​-‍﻿]/g,pt=()=>mt(c.composerInput),ro=t=>t instanceof HTMLElement&&t.matches(c.composerInput),it=(t=pt())=>t?.closest("form")??t?.closest(c.composer)??mt(c.composer);function W(t=pt()){if(!t)return"";if(t instanceof HTMLTextAreaElement)return t.value.replace(Wa,"").trim();let e=t.cloneNode(!0);for(let n of e.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...e.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:e.textContent??"").replace(Wa,"").trim()}var Yd=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function za(t,e){let o=e?"insertText":"deleteContentBackward";t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:o,data:e||null})),t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:o,data:e||null}))}function Ct(t,e=pt()){if(!e)return!1;if(e.focus(),e instanceof HTMLTextAreaElement)return Yd?.call(e,t),e.dispatchEvent(new Event("input",{bubbles:!0})),e.setSelectionRange(t.length,t.length),!0;let o=getSelection();return o?.selectAllChildren(e),typeof document.execCommand=="function"?t?document.execCommand("insertText",!1,t):document.execCommand("delete"):za(e,t),W(e)!==t.trim()&&za(e,t),o?.selectAllChildren(e),o?.collapseToEnd(),!0}function Va(t,e){let o=t;for(;o&&o!==e;){if(o instanceof HTMLElement&&o.parentElement===e)return o;o=o.parentNode}return null}function Ja(t,e,o){let n=document.createRange();return n.selectNodeContents(t),o?n.setEnd(e.startContainer,e.startOffset):n.setStart(e.endContainer,e.endOffset),n.toString().includes(`
`)?!0:!!n.cloneContents().querySelector("br")}function Za(t){if(t instanceof HTMLTextAreaElement){let{selectionStart:p,selectionEnd:E,value:g}=t;return{first:!g.slice(0,p).includes(`
`),last:!g.slice(E).includes(`
`)}}let e=getSelection();if(!e?.rangeCount||!t.contains(e.anchorNode))return{first:!0,last:!0};let o=e.getRangeAt(0),n=[...t.children].filter(p=>p instanceof HTMLElement),r=Va(o.startContainer,t),i=Va(o.endContainer,t),a=!r||r===n[0],u=!i||i===n[n.length-1],l=o.getBoundingClientRect(),d=(r??t).getBoundingClientRect(),m=Number.parseFloat(getComputedStyle(r??t).lineHeight)||24;return l.height?{first:a&&l.top-d.top<m,last:u&&d.bottom-l.bottom<m}:{first:a&&!Ja(r??t,o,!0),last:u&&!Ja(i??t,o,!1)}}var $a=t=>{let e=it();return(e&&mt(t,e))??mt(t)},Ar=()=>$a(c.stopButton),jd=()=>{let t=$a(c.sendButton);return t&&!t.matches(c.stopButton)?t:null};function Xa(){let t=jd();if(t){t.disabled||t.click();return}pt()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var _a=()=>yt(Ar());var nn=new S("AppProtocol"),io=xe();function Qd(t){let e=t;if(typeof e=="string")try{e=JSON.parse(e)}catch{return null}if(Array.isArray(e)||!e||typeof e!="object")return null;let o=e,n=o.notification&&typeof o.notification=="object"?o.notification:o;if(typeof n.method!="string")return null;let r=n.params&&typeof n.params=="object"?n.params:void 0;return{method:n.method,params:r}}function ao(t){if(Array.isArray(t)){for(let o of t)ao(o);return}let e=Qd(t);e&&io.emit("note",e)}var xr=new WeakMap,wr=new WeakMap;function Wd(t,e){let o=xr.get(t);if(o)return o;let n=r=>{ao(r.data),typeof t=="function"?t.call(e,r):t.handleEvent(r)};return xr.set(t,n),n}function zd(){let t=MessagePort.prototype,e=t.addEventListener,o=t.removeEventListener;t.addEventListener=function(r,i,a){return r!=="message"?e.call(this,r,i,a):e.call(this,r,Wd(i,this),a)},t.removeEventListener=function(r,i,a){return r!=="message"?o.call(this,r,i,a):o.call(this,r,xr.get(i)??i,a)};let n=Object.getOwnPropertyDescriptor(t,"onmessage");n?.set&&Object.defineProperty(t,"onmessage",{configurable:!0,enumerable:n.enumerable,get(){return wr.has(this)?wr.get(this):n.get?.call(this)},set(r){wr.set(this,r),n.set.call(this,function(a){ao(a.data),r?.call(this,a)})}})}function Vd(){let t=window.electronBridge,e=t?.subscribeToWorkerMessages;if(!(!t||typeof e!="function"))try{t.subscribeToWorkerMessages=(o,n)=>e.call(t,o,r=>{ao(r),n(r)})}catch(o){nn.warn("electronBridge.subscribeToWorkerMessages is not writable",o)}}function Jd(){addEventListener("message",t=>ao(t.data));try{zd()}catch(t){nn.warn("MessagePort wrap failed",t)}try{Vd()}catch(t){nn.warn("electronBridge wrap failed",t)}nn.info("Listening for app-server notifications")}Jd();var Zd=new S("AppRoute"),$d=500,an=new Set,sn=null,rn;function v(){return(mt(c.threadSelected)??Ft(c.threadSelected)[0])?.getAttribute("data-app-action-sidebar-thread-id")??null}var ln=()=>!v(),es=()=>!1,oe=()=>!1;function ts(){let t=v();if(t===sn)return;let{href:e}=location,o={prevHref:e,href:e,prevId:sn,id:t};sn=t;for(let n of an)try{n(o)}catch(r){Zd.error("Route listener failed",r)}}function Xd(){let t=new MutationObserver(ts);(()=>{document.body&&t.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-app-action-sidebar-thread-selected","data-app-action-sidebar-thread-id"]})})();let o=setInterval(ts,$d);return()=>{t.disconnect(),clearInterval(o)}}function vt(t){return an.add(t),rn||(sn=v(),rn=Xd()),()=>{an.delete(t),!an.size&&(rn?.(),rn=void 0)}}var _d=250,tu=400,O=xe(),ne=!1,Se=null,ae=!1,re="done",ie=!1,os=!1,_=()=>({generating:ne,conversationId:v()}),eu=t=>{if(!t)return!0;let e=v();return e?e===t||e.endsWith(t)||t.endsWith(e.replace(/^local:/,"")):!0};function ou(t){return t==="interrupted"||t==="aborted"||t==="cancelled"?"stopped":t==="failed"||t==="error"?"error":"done"}function nu(){return ie||_a()}function ru(t){Se=null,ne=!1,ie=!1,O.emit("fall",{conversationId:v(),outcome:t}),ae=!1,re="done"}function iu(){let t=nu();t&&!ne&&(ne=!0,ae=!1,re="done",O.emit("rise",{conversationId:v()})),t||!ne?Se=null:Se==null?Se=Date.now():Date.now()-Se>=tu&&ru(ae?"stopped":re)}function so(){iu(),O.emit("tick",_())}function au({prevId:t,id:e}){t!==e&&(ne&&(ie=!1,Se=null,ne=!1,ae=!1,re="done",O.emit("fall",{conversationId:t,outcome:"left"})),O.emit("context",{prevId:t,id:e,migrated:!t&&!!e}),so())}function su(t){if(eu(t.params?.threadId)){if(t.method==="turn/started"){ie=!0,so();return}if(t.method==="turn/interrupt"){ie=!1,re="stopped",ae=!0,so();return}t.method==="turn/completed"&&(ie=!1,re=ou(t.params?.turn?.status),re==="stopped"&&(ae=!0),so())}}function lu(t){t.target instanceof Element&&t.target.closest(c.stopButton)&&(ae=!0,ie=!1)}function ns(){os||(os=!0,io.on("note",su),vt(au),document.addEventListener("click",lu,!0),xa(so,_d))}var cu="__reactContainer$",rs="__reactFiber$";function qr(){return document.readyState!=="loading"?Promise.resolve():new Promise(t=>document.addEventListener("DOMContentLoaded",()=>t(),{once:!0}))}var Sr=(t,e)=>Object.keys(t.wrappedJSObject??t).some(o=>o.startsWith(e)),At=t=>!Sr(document,cu)||Sr(t,rs);function Kt(){return document.body?Promise.resolve():new Promise(t=>{let e=new MutationObserver(()=>{document.body&&(e.disconnect(),t())});e.observe(document,{childList:!0,subtree:!0})})}async function Er(){await Kt();let t=Date.now()+8e3;for(;!Sr(document.body,rs)&&Date.now()<t;)await new Promise(e=>setTimeout(e,100))}var is={BetterNavigator:1793448142e3,BetterQuotes:1793365944e3,ChatListStatus:1793351872e3,ChatStateFavicons:1790623094e3,Cleaner:1793267811e3,CompleteToast:1793354069e3,ComposerOpacity:1793344667e3,Continue:1790939902e3,CustomSidebarIdentity:1790658669e3,GreetingCustomizer:1793350808e3,InputHistory:1793365944e3,MessageTimestamps:1791080494e3,NoDictation:1793335268e3,NoShareLink:1790658669e3,NoSidebarIdentity:1790616549e3,PromptQueue:1793365944e3,RecentTopics:1793365944e3,ResponseNotification:1793354069e3,Settings:1793448244e3,SidebarIdentityOpacity:1790682605e3,StarChats:1793365944e3,StreamerMode:1793344667e3,TemporaryChat:1792014624e3,UserQuotes:1793345744e3,WiderChat:179333264e4};var q=t=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`,du="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",uu={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${du}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:q('<path d="M18 6 6 18M6 6l12 12"/>'),gear:q('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:q('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:q('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:q('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:q('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:q('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:q('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:q('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:q('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:q('<path d="m6 9 6 6 6-6"/>'),play:q('<path d="M7 4v16l13-8z"/>'),plus:q('<path d="M12 5v14M5 12h14"/>'),check:q('<path d="m5 12 5 5 9-10"/>'),alert:q('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:q('<path d="M4 5h16v11H9l-5 4z"/>'),layout:q('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:q('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:q('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:q('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:q('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:q('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:q('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:q('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:q('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:q('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:q('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:q('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:q('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:q('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:q('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:q('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),folder:q('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),ghost:q('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},k=t=>wa(uu[t]);function Tr(t){if(typeof t.showPopover=="function"){t.setAttribute("popover","manual");try{t.showPopover()}catch{t.matches(":popover-open")||t.removeAttribute("popover")}}}function wt(t,e=document.body){e.append(t),Tr(t)}var ft="data-bloom-tip",Mr=6,Cr=8,se,as=null;function qe(t){if(t===as)return;if(as=t,!t){se?.remove();return}se??=s("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),se.textContent=t.getAttribute(ft),wt(se);let e=t.getBoundingClientRect(),{width:o,height:n}=se.getBoundingClientRect(),r=e.bottom+Mr+n<=innerHeight-Cr;se.style.left=`${ot(e.left+e.width/2-o/2,Cr,innerWidth-o-Cr)}px`,se.style.top=`${r?e.bottom+Mr:e.top-Mr-n}px`}var ss=t=>t instanceof Element?t.closest(`[${ft}]`):null;function ls(){let t=new AbortController,e={passive:!0,signal:t.signal};return document.addEventListener("pointerover",o=>qe(ss(o.target)),e),document.addEventListener("pointerout",o=>o.relatedTarget||qe(null),e),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&qe(ss(o.target)),e),document.addEventListener("focusout",()=>qe(null),e),document.addEventListener("pointerdown",()=>qe(null),e),()=>{t.abort(),qe(null)}}function Gt(t,e,o,n=!1){let r=s("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(t),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let a=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(a)),e(a)===!1&&r.setAttribute("aria-checked",String(!a))}),r}function H(t,e,o){return s("button",{class:jo("bloom-button",o&&`bloom-button-${o}`),text:t,attrs:{type:"button","data-bloom":"control"},on:{click:e}})}function j(t,e,o,n){let r=s("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":e,"data-bloom":"control",[ft]:e},on:{click:o}},k(t));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function cn(t,e,o,n,r,i){let a=s("input",{attrs:{type:"range",min:String(e),max:String(o),step:String(n)}});a.value=String(t);let u=s("output",{text:`${a.value}${r}`});return a.addEventListener("input",()=>{u.textContent=`${a.value}${r}`,i(Number(a.value))}),s("div",{class:"bloom-slider"},a,u)}function Lr(t,e,o){let n=s("select",{class:"bloom-select"},...e.map(r=>s("option",{text:r.label,attrs:{value:r.value}})));return n.value=t,n.addEventListener("change",()=>o(n.value)),n}function lo(t,e,o="",n="text"){let r=s("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=t,r.addEventListener("change",()=>e(r.value)),r}var dn=["showSidebarEntry","showSidebarEntryOnHover","showAccountMenuEntry"],cs=1,Ee={showSidebarEntry:!0,showSidebarEntryOnHover:!1,showAccountMenuEntry:!1},kr=t=>Object.hasOwn(Ee,t),Br=t=>nt("Settings",t)??Ee[t],ds=(t,e)=>!kr(t)||e!==!1||dn.some(o=>o!==t&&Br(o));function us(){if(nt("Settings","entryRevision")!==cs){for(let t of dn)ut("Settings",t);ut("Settings","entryRevision",cs)}}var mu=new S("Themes"),pu=/^https:\/\/\S+\.css(?:[?#]|$)/i,fu=/\/\*\*[^]*?@name[ \t]+([^\n*]+)/,F=b({themes:{type:"custom",default:[]},quickCss:{type:"custom",default:""},quickCssEnabled:{type:"custom",default:!0}});async function ms(t){let e=new TextDecoder().decode(await Go(t));if(!e.trim())throw new Error("Theme file is empty.");return e}var un=(t,e)=>{F.store.themes=F.store.themes.map(o=>o.id===t?{...o,...e}:o)},ps=t=>{F.store.themes=F.store.themes.filter(e=>e.id!==t)};async function fs(t){if(!pu.test(t))throw new Error("Enter an https URL that ends in .css.");if(F.store.themes.some(n=>n.url===t))throw new Error("This theme is already added.");let e=await ms(t),o=e.match(fu)?.[1]?.trim()||decodeURIComponent(new URL(t).pathname.split("/").pop()??t).replace(/\.css$/i,"").replaceAll(/[-_]/g," ");F.store.themes=[...F.store.themes,{id:Ze("theme"),name:o,url:t,css:e,enabled:!0}]}function gs(t,e,o){if(!e.trim())throw new Error("Name is required.");if(!o.trim())throw new Error("CSS is required.");t?un(t,{name:e.trim(),css:o}):F.store.themes=[...F.store.themes,{id:Ze("theme"),name:e.trim(),css:o,enabled:!0}]}async function gu(){await Promise.all(F.store.themes.filter(t=>t.url&&t.enabled).map(async({id:t,url:e,name:o})=>{try{let n=await ms(e??"");F.store.themes.find(r=>r.id===t)?.css!==n&&un(t,{css:n})}catch(n){mu.warn(`Failed to refresh theme "${o}"`,n)}}))}var hs=h({name:"Themes",description:"Applies Bloom++ themes and Quick CSS.",authors:["Bloom contributors"],tags:[],icon:"spark",required:!0,hidden:!0,startAt:"Init",settings:F,styles:()=>[...F.store.themes.filter(t=>t.enabled).map(t=>t.css),F.store.quickCssEnabled?F.store.quickCss:""].join(`
`),start(){gu()}});var K=L("bloom-settings-"),hu=3e3,bs=(t,e)=>{let o=s("textarea",{class:`bloom-input ${K("css")}`,attrs:{spellcheck:"false",placeholder:"Paste your CSS here...","aria-label":e}});return o.value=t,o},Ir=(t,e)=>s("div",{class:K("section-header")},s("div",{class:K("field-label"),text:t}),s("div",{class:K("field-desc"),text:e}));function ys(){let{quickCss:t,quickCssEnabled:e}=F.store,o=bs(t,"Quick CSS");return o.disabled=!e,o.addEventListener("input",()=>{F.store.quickCss=o.value}),s("div",{class:K("section")},s("div",{class:K("field","field-inline")},Ir("Quick CSS","Your own CSS, applied on every page as you type."),Gt(e,n=>{F.store.quickCssEnabled=n,o.disabled=!n},"Enable Quick CSS")),o)}function vs(){let t=s("div",{class:K("section")}),e=null,o=()=>s("div",{class:K("section-error"),attrs:{role:"alert"}});function n(){let l=s("input",{class:"bloom-input",attrs:{type:"url",placeholder:"https://raw.githubusercontent.com/...","aria-label":"Theme URL"}}),d=o(),m=H("Add",async()=>{m.disabled=!0,d.textContent="";try{await fs(l.value.trim()),u()}catch(p){d.textContent=p instanceof Error?p.message:String(p),m.disabled=!1}});return s("div",{class:K("section-block")},Ir("Online themes","Load a theme from a .css URL. It is fetched again on every page load, so updates apply."),s("div",{class:K("section-row")},l,m),d)}function r(){let l=e==="new"?null:e,d=s("input",{class:"bloom-input",attrs:{placeholder:"My theme","aria-label":"Theme name"}});d.value=l?.name??"";let m=bs(l?.css??"","Theme CSS"),p=o();return s("div",{class:K("section-block")},d,m,p,s("div",{class:K("section-row")},H("Save",()=>{try{gs(l?.id??null,d.value,m.value),e=null,u()}catch(E){p.textContent=E instanceof Error?E.message:String(E)}}),H("Cancel",()=>{e=null,u()})))}function i(){return s("div",{class:K("section-block")},s("div",{class:K("field","field-inline")},Ir("Local themes","CSS stored only on this device."),!e&&H("New local theme",()=>{e="new",u()})),e&&r())}function a(l){let d,m=j("trash","Remove",()=>{if(d){clearTimeout(d),ps(l.id),u();return}m.setAttribute("aria-pressed","true"),m.setAttribute(ft,"Click again to remove"),d=setTimeout(()=>{d=void 0,m.removeAttribute("aria-pressed"),m.setAttribute(ft,"Remove")},hu)});return s("div",{class:K("theme")},s("div",{class:K("theme-text")},s("div",{class:`${K("card-name")} bloom-truncate`,text:l.name}),s("div",{class:`${K("field-desc")} bloom-truncate`,text:l.url??"Local"})),l.url?j("copy","Copy URL",()=>void Fo(l.url??"")):j("edit","Edit",()=>{e=l,u()}),m,Gt(l.enabled,p=>un(l.id,{enabled:p}),`Enable ${l.name}`))}function u(){let{themes:l}=F.store;t.replaceChildren(n(),i(),l.length?s("div",{class:K("themes")},...l.map(a)):s("div",{class:K("empty"),text:"No themes yet."}))}return u(),t}var bu=new S("SettingsPanel"),f=L("bloom-settings-"),yu=10080*60*1e3,vu=3e3,As="Toggle features. Some need a reload. Click the sliders icon to configure.",Au="Paused: can't find its place on this page.",wu=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],xu=[{id:"plugins",label:"Plugins"},{id:"themes",label:"Themes"},{id:"css",label:"Quick CSS"}],Su=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],qu={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},xs=new Set(["chat","ui","privacy"]),G=null,co="plugins",ce="all",Pr="all",mn="",Or=[],Ss=()=>[...V.values()].filter(t=>!t.hidden),Eu=t=>!!t.updatedAt&&Date.now()-t.updatedAt<yu;function Tu(t){switch(ce){case"favorites":return Xo.has(t.name);case"recent":return Eu(t);case"all":return!0;case"other":return!t.tags.some(e=>xs.has(e));case"chat":case"ui":case"privacy":return t.tags.includes(ce)}}function Mu(t){switch(Pr){case"all":return!0;case"enabled":return Mt(t);case"disabled":return!Mt(t)}}function Cu(t){let e=mn.trim().toLowerCase();return!e||[t.name,t.description,...t.tags].some(o=>o.toLowerCase().includes(e))}function Lu(t){let e=$o.list(),o=n=>e.includes(n.name)?e.indexOf(n.name):e.length;return ce==="recent"?t.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):t.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var qs=t=>t.settings?.def??{},Dr=t=>Object.values(qs(t)).some(e=>e.type!=="custom");function ku(t,e,o){let n=nt(t.name,e)??gr(o),r=i=>{if(t.name==="Settings"&&!ds(e,i))return!1;ut(t.name,e,i)};switch(o.type){case"boolean":return Gt(n,r,o.description??e);case"slider":return cn(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return Lr(n,o.options,r);case"string":return lo(n,r,o.placeholder);case"number":return lo(String(n),i=>r(Number(i)),"","number");case"component":{let i=s("div",{class:f("component")});return Or.push(o.render(i)),i}case"custom":return null}}var Bu=t=>t.replaceAll(/([A-Z])/g," $1").replace(/^./,e=>e.toUpperCase());function Nr(t){if(!G)return;let e=Object.entries(qs(t)).filter(([,i])=>i.type!=="custom").map(([i,a])=>{let u=ku(t,i,a),l=a.type==="boolean",d=a.type!=="component"&&s("div",{class:f("field-label"),text:Bu(i)}),m=a.description&&s("div",{class:f("field-desc"),text:a.description});return s("div",{class:f("field",l?"field-inline":"field-stacked")},(d||m)&&s("div",{class:f("field-text")},d,m),u)}),o,n=H("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},vu);return}clearTimeout(o),t.settings?.reset(),Te(),Nr(t)},"danger"),r=s("div",{class:f("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&Te()}},s("div",{class:f("popup"),attrs:{role:"dialog","aria-label":`${t.name} settings`}},s("div",{class:f("popup-header")},s("div",{class:f("card-icon")},k(t.icon)),s("div",{class:f("popup-title")},s("div",{class:f("card-name"),text:t.name}),s("div",{class:f("popup-authors"),text:t.authors.join(", ")})),j("close","Close",Te)),s("p",{class:f("popup-desc"),text:t.description}),s("div",{class:f("fields")},...e),s("div",{class:f("popup-footer")},n)));G.querySelector(`.${f("modal")}`)?.append(r)}function Te(){for(let t of Or)t();Or=[],G?.querySelector(`.${f("popup-backdrop")}`)?.remove()}function ws(t){let e=Mt(t),o=Xo.has(t.name),n=$o.has(t.name),r=!!t.required,i=Pa(t.name);return s("div",{class:[f("card",e?"card-on":"card-off"),r?f("card-required"):""].filter(Boolean).join(" ")},s("div",{class:f("card-top")},s("div",{class:f("card-icon")},k(t.icon)),s("div",{class:f("card-actions")},j("star",o?"Unstar":"Star",()=>{Xo.toggle(t.name),le()},o),r?null:j("pin",n?"Unpin":"Pin to top",()=>{$o.toggle(t.name),le()},n),r?s("span",{class:f("required-mark"),attrs:{"aria-label":"Required",[ft]:"This plugin is required for Bloom++ to work"}},k("alert")):null,Dr(t)&&j("gear","Settings",()=>Nr(t)),Gt(e,a=>Fa(t,a),r?`${t.name} is required`:`Enable ${t.name}`,r))),s("div",{class:f("card-name")},t.name,Ia(t.name)&&s("span",{class:f("new-badge"),text:"New"})),s("div",{class:f("card-desc"),text:t.description,title:t.description}),i&&s("div",{class:f("card-issue"),attrs:{[ft]:`Missing: ${i.join(", ")}`}},k("alert"),s("span",{text:Au})),s("div",{class:f("card-footer"),text:t.authors.join(", ")}))}function Es(){let t=Ss().some(o=>!o.tags.some(n=>xs.has(n)));G?.querySelector(`.${f("tabs")}`)?.replaceChildren(...wu.filter(o=>o.id!=="other"||t).map(o=>s("button",{class:f("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===ce)},on:{click:()=>{ce=o.id,Es(),le()}}})))}function le(){if(!G)return;let t=Ss().filter(Tu),e=G.querySelector(`.${f("search")} input`);e&&(e.placeholder=`Search ${ca(t.length,"plugin")}...`);let o=Lu(t.filter(d=>Cu(d)&&Mu(d))),n=ce==="all",r=n?o.filter(d=>!d.required):o,i=n?o.filter(d=>d.required):[],a=[...r.map(ws),...i.length?[s("div",{class:f("required-break"),attrs:{role:"separator"}}),...i.map(ws)]:[]],u=mn.trim()?"No plugins match your search.":qu[ce]??"No plugins available.";G.querySelector(`.${f("grid")}`)?.replaceChildren(...a.length?a:[s("div",{class:f("empty"),text:u})])}function Iu(t){t.key==="Escape"&&(t.preventDefault(),t.stopPropagation(),G?.querySelector(`.${f("popup-backdrop")}`)?Te():Yt())}var Ts,Rr;function Hr(){let t=G?.querySelector(`.${f("body")}`);if(!G||!t)return;for(let o of G.querySelectorAll(`.${f("nav-item")}`))o.setAttribute("aria-selected",String(o.getAttribute("data-section")===co));if(Te(),co==="themes"){t.replaceChildren(vs());return}if(co==="css"){t.replaceChildren(ys());return}let e=s("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=mn,e.addEventListener("input",()=>{mn=e.value,le()}),t.replaceChildren(s("div",{class:f("tabs"),attrs:{role:"tablist"}}),s("div",{class:f("toolbar")},s("label",{class:f("search")},k("search"),e),Lr(Pr,Su,o=>{Pr=o,le()})),s("div",{class:f("grid")})),Es(),le(),e.focus()}function Me(t,e){t&&(co=t),G?(Hr(),Tr(G)):Pu();let o=e&&V.get(e);o&&Nr(o)}function Pu(){G=s("div",{class:`bloom-root ${f("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&Yt()}},s("div",{class:f("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},s("div",{class:f("header")},s("div",{class:f("logo")},k("bloom")),s("h2",{class:f("title"),text:"Bloom++"}),s("span",{class:f("hint"),attrs:{"aria-label":As,tabindex:"0",[ft]:As}},k("info")),s("div",{class:f("nav"),attrs:{role:"tablist"}},...xu.map(t=>s("button",{class:f("nav-item"),text:t.label,attrs:{type:"button",role:"tab","data-section":t.id},on:{click:()=>{co=t.id,Hr()}}}))),s("span",{class:f("version"),text:"v2.0.104"}),j("close","Close",Yt)),s("div",{class:f("body")}))),G.addEventListener("keydown",t=>t.stopPropagation()),Rr=new AbortController,document.addEventListener("keydown",Iu,{capture:!0,signal:Rr.signal}),wt(G),Hr(),Ts=Ya(le),bu.debug("Opened")}function Yt(){Te(),Rr?.abort(),Ts?.(),G?.remove(),G=null}var Ce=()=>G?Yt():Me(),Ms=()=>!!G;var Cs=new S("AppLandmarks"),Ou={Settings:[c.rail],WiderChat:[":root"],StreamerMode:[c.sidebarScroll,c.rail],ComposerOpacity:[c.composer,c.composerInput],ResponseNotification:[c.composerInput],InputHistory:[c.composerInput],Continue:[c.composerInput],ChatListStatus:[c.sidebarScroll],StarChats:[c.turn],BetterNavigator:[c.timelineScroll,c.turn],BetterQuotes:[c.turn],MessageTimestamps:[c.turn],RecentTopics:[c.sidebarScroll]};function Ls(){for(let[t,e]of Object.entries(Ou)){let o=V.get(t);if(!o||o.required||!Mt(o)){br(t,null);continue}let n=e.some(r=>mt(r));if(br(t,n?null:e),!n){if(!yr(o.name))continue;Na(o),Cs.warn(`${t} paused; missing ${e.join(", ")}`);continue}yr(o.name)||(Ua(o),Cs.info(`${t} resumed`))}}function ks(){return Ls(),M(()=>Ls())}var dy=new S("Route"),Ru=/\/c\/(?!local-)([\w-]+)/;var Hu=()=>location.pathname.match(Ru)?.[1]??null;var uy=location.href,my=Hu();var Du=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,Nu=/\S+@\S+\.\S+/,Uu=3;var Fu=t=>!!t.closest(".sr-only");function Ku(t){return[...t.querySelectorAll("*")].filter(e=>!e.children.length&&!e.closest("[data-bloom]")&&!!y(e.textContent??"")&&!(e instanceof SVGElement))}var Gu=t=>{if(/rounded-full/.test(t.getAttribute("class")??""))return!0;if(!t.clientWidth)return!1;let{borderRadius:e}=getComputedStyle(t);return e.includes("%")||Number.parseFloat(e)>=t.clientWidth/2};function pn(t,e,o){for(let n of t.querySelectorAll(`[${e}]`))n!==o&&n.removeAttribute(e);o&&!o.hasAttribute(e)&&o.setAttribute(e,"")}function Yu(t,e){if(y(t.textContent??"").length>Uu)return null;let o=t.closest("button");for(let n=t;n&&n!==e&&n!==o;n=n.parentElement)if(Gu(n))return n;return null}function fn(t,e){t.hasAttribute(`data-bloom-${e}`)||t.setAttribute(`data-bloom-${e}`,"");let o=t.querySelector("img:not([data-bloom] img)"),n=Ku(t),r=o?null:n.map(m=>Yu(m,t)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),a=(i&&i!==t&&t.contains(i)?i:o??r)??t.querySelector("[class*=rounded-full]:not([data-bloom] *)");pn(t,`data-bloom-${e}-avatar`,a);let u=n.filter(m=>!a?.contains(m)&&!Fu(m)),l=u.find(m=>Du.test(y(m.textContent??""))),d=u.find(m=>Nu.test(m.textContent??""));pn(t,`data-bloom-${e}-plan`,l),pn(t,`data-bloom-${e}-email`,d),pn(t,`data-bloom-${e}-name`,u.find(m=>m!==l&&m!==d))}var Bs=()=>Ft(c.rail).filter(yt);function Is(t){return mt(c.profile,t)??[...t.querySelectorAll(c.menuButton)].findLast(yt)??null}function ju(t,e){return[...t.children].find(n=>n instanceof HTMLElement&&n!==e&&n.contains(e))??e}function Ps(){return Bs().flatMap(t=>{let e=Is(t);if(!e)return[{kind:"rail",anchor:t,insert:n=>t.append(n)}];let o=ju(t,e);return[{kind:"rail",anchor:o,insert:n=>(o===e?t:o).append(n)}]})}var Ur=()=>Bs().map(Is).filter(t=>t!=null);function Qu(t){let e=t.getAttribute("aria-expanded")==="true"&&t.getAttribute("aria-controls"),o=e?document.getElementById(e):null;return o?.matches('[role="menu"]')?o:null}function gn(){return Ur().map(Qu).find(t=>t!=null)??Ft('[role="menu"]').find(t=>!t.closest("[data-bloom]")&&/log ?out|sign out|退出/i.test(t.textContent??""))??null}var uo=t=>Ft(c.threadRow).filter(e=>e.getAttribute("data-app-action-sidebar-thread-id")===t);function mo(t){let e=uo(t)[0]??Ft(c.threadRow).find(n=>{let r=n.getAttribute("data-app-action-sidebar-thread-id")??"";return r.endsWith(t)||t.endsWith(r.replace(/^local:/,""))});return(e?.getAttribute("data-app-action-sidebar-thread-title")??y(e?.textContent??""))||null}function Os(t){return null}var Fr=0,hn;function Wu(t){if(!U(t))return;for(let o of Ur())fn(o,"profile");let e=gn();e&&fn(e,"menu")}function xt(){Fr++;let t=!0;return Kt().then(()=>{t&&Fr&&!hn&&(hn=M(Wu))}),()=>{t&&(t=!1,!--Fr&&(hn?.(),hn=void 0))}}var Rs=`/*
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
`;var tt=L("bloom-entry-"),Vu=4,Gr="--bloom-entry-x",Yr=1,Hs=4,Ds=8,Ju=150,at=b({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar.",default:Ee.showSidebarEntry},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:Ee.showSidebarEntryOnHover},showAccountMenuEntry:{type:"boolean",description:"Show Bloom++ at the top of the account menu.",default:Ee.showAccountMenuEntry},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:t=>(t.append(H("Reset position",()=>{at.store.entryPosition=Yr})),()=>t.replaceChildren())},showBloomMenu:{type:"boolean",description:"Hovering the Bloom++ row in the account menu opens a menu with Plugins, Themes, Quick CSS and plugin settings.",default:!0},menuPlugins:{type:"component",description:"Plugins listed in that menu.",render:t=>(t.append(...Fs().map(e=>s("div",{class:tt("menu-pick")},k(e.icon),s("span",{class:"bloom-truncate",text:e.name}),Gt(Ks(e),o=>{at.store.menuPicks={...at.store.menuPicks,[e.name]:o}},`List ${e.name} in the menu`)))),()=>t.replaceChildren())},entryPosition:{type:"custom",default:Yr},menuPicks:{type:"custom",default:{}}}),de=new Map,jt=null,po,Fs=()=>[...V.values()].filter(t=>!t.hidden).toSorted((t,e)=>t.name.localeCompare(e.name)),Ks=t=>at.store.menuPicks[t.name]??Dr(t),Ns=!1,Kr=[];function Zu(t,e,o){let n=t.currentTarget,r=e.clientWidth-n.offsetWidth;if(t.button!==0||r<=0||!e.classList.contains(tt("hover")))return;let i=at.store.entryPosition,a=i,u=!1,l=new AbortController;n.setPointerCapture(t.pointerId),n.addEventListener("pointermove",m=>{!u&&Math.abs(m.clientX-t.clientX)<Vu||(u=!0,o(),a=ot(i+(m.clientX-t.clientX)/r,0,Yr),e.style.setProperty(Gr,String(a)))},{signal:l.signal});let d=()=>{l.abort(),u&&(at.store.entryPosition=a,e.style.removeProperty(Gr))};n.addEventListener("pointerup",d,{signal:l.signal}),n.addEventListener("lostpointercapture",d,{signal:l.signal})}function $u(t){let e=!1,o=s("button",{class:tt("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),e||Ce(),e=!1},pointerdown:r=>{e=!1,t!=="rail"&&Zu(r,n,()=>{e=!0})}}},k("bloom"),t!=="rail"&&s("span",{class:tt("label"),text:"Bloom++"})),n=s("div",{class:`bloom-root ${tt("wrap")} ${tt(t)}`,attrs:{"data-bloom":"entry"}},o);return n}function fo(){clearTimeout(po),jt?.remove(),jt=null}function Gs(){clearTimeout(po),po=setTimeout(fo,Ju)}var Ys=t=>t.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0}));function Xu(t,e){if(clearTimeout(po),jt?.isConnected||!at.store.showBloomMenu)return;let o=(l,d,m)=>s("div",{class:tt("flyout-item"),attrs:{role:"menuitem"},on:{pointerdown:p=>{p.button===0&&(p.preventDefault(),p.stopPropagation(),fo(),Ys(e),m())}}},k(d),s("span",{class:"bloom-truncate",text:l})),n=Fs().filter(Ks);jt=s("div",{class:`bloom-root ${tt("flyout")}`,attrs:{"data-bloom":"menu-flyout",role:"menu","aria-label":"Bloom++"},on:{pointerenter:()=>clearTimeout(po),pointerleave:Gs}},o("Plugins","bloom",()=>Me("plugins")),o("Themes","spark",()=>Me("themes")),o("Quick CSS","edit",()=>Me("css")),n.length>0&&s("div",{class:tt("flyout-break"),attrs:{role:"separator"}}),...n.map(l=>o(l.name,l.icon,()=>Me("plugins",l.name)))),wt(jt);let r=e.getBoundingClientRect(),{width:i,height:a}=jt.getBoundingClientRect(),u=r.right+Hs;jt.style.left=`${u+i>innerWidth?r.left-i-Hs:u}px`,jt.style.top=`${ot(t.getBoundingClientRect().top,Ds,innerHeight-a-Ds)}px`}function _u(t){let e=s("div",{class:`bloom-root ${tt("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),fo(),Ys(t),Ce()},pointerenter:()=>Xu(e,t),pointerleave:Gs}},k("bloom"),s("span",{text:"Bloom++"}),at.store.showBloomMenu&&s("span",{class:tt("menu-chevron")},k("chevron"))),o=t.querySelector('[role="menuitem"]');o?.parentElement?o.before(e):t.prepend(e)}function Us(){fo();for(let t of document.querySelectorAll('[data-bloom="entry"], [data-bloom="menu-entry"]'))t.remove();de.clear()}function tm(){for(let t of document.querySelectorAll('[data-bloom="menu-entry"]'))t.remove()}function js(){let{showSidebarEntry:t,showSidebarEntryOnHover:e,showAccountMenuEntry:o}=at.store,n=t||e?Ps():[],r=new Set(n.map(a=>a.anchor));for(let[a,u]of de)a.isConnected&&r.has(a)||(u.remove(),de.delete(a));for(let a of document.querySelectorAll('[data-bloom="entry"]'))[...de.values()].includes(a)||a.remove();for(let a of n){let u=de.get(a.anchor);if(u?.isConnected||!At(a.anchor))continue;let l=u??$u(a.kind);de.set(a.anchor,l),a.insert(l)}for(let a of de.values())a.classList.toggle(tt("hover"),!t);if(!o){tm();return}let i=gn();i&&!i.querySelector('[data-bloom="menu-entry"]')&&_u(i),i||fo()}function em(t){dn.some(Br)||(at.store[kr(t??"")?t:"showSidebarEntry"]=!0),js()}var Qs=h({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:at,styles:()=>`${Rs}[data-app-navigation-rail] [data-bloom=entry]{position:absolute;inset:auto;left:50%;bottom:100%;transform:translateX(-50%);width:max-content;margin:0;padding-block:0.25rem;pointer-events:none;z-index:5;display:flex;justify-content:center}[data-app-navigation-rail]>[data-bloom=entry]{bottom:2.75rem}[data-app-navigation-rail] [data-bloom=entry] .bloom-entry-button{pointer-events:auto}[data-app-navigation-rail] [data-bloom=entry].bloom-entry-hover:not(:hover > *){display:none;transition:display 0s 0.2s allow-discrete}.${tt("hover")}{${Gr}:${at.store.entryPosition}}`,start(){us(),Us(),Kr=[M(js),ls(),xt()],!Ns&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",Ce),Ns=!0)},stop(){for(let t of Kr)t();Kr=[],Us(),Yt()},onSettingsChange:em});var Vr=new S("AppNetwork"),St=xe(),bn=new Map,Ws=new Map;var om=t=>t==="user"||t==="assistant";function yn(t){let e=t.replace(/^local:/,"");return[...new Set([t,e,`local:${e}`])]}function zs(t){let e=yn(t);for(let n of e){let r=bn.get(n);if(r)return r}let o={id:e[0]??t,title:null,chain:[],times:new Map};for(let n of e)bn.set(n,o);return o}function Lt(t){if(!t)return null;cm(t);let e=yn(t);return e.map(o=>bn.get(o)).find(o=>o&&(o.chain.length||o.title))??bn.get(e[0]??t)??null}function Qr(t,e,o,n=null){return{id:t,role:e,createTime:n,text:y(o),hasFiles:!1,imageCount:0}}function Wr(t,e){let o=t.chain.find(r=>r.id===e.id);if(o){e.text&&(o.text=e.text),e.createTime!=null&&(o.createTime=e.createTime);return}if(t.chain.find(r=>r.role===e.role&&r.text&&r.text===e.text)){!t.times.has(e.id)&&e.createTime!=null&&t.times.set(e.id,e.createTime);return}t.chain.push(e)}function Vs(t){let e=t.chain.map(o=>`${o.id}	${o.role}	${o.text}`).join(`
`);Ws.get(t.id)!==e&&(Ws.set(t.id,e),St.emit("conversation",t))}function nm(t){if(typeof t=="function")try{return y(String(t()??""))}catch(e){return Vr.warn("Turn label failed",e),""}return typeof t=="string"?y(t):""}function rm(t){if(typeof t!="function")return"";try{let e=t();return typeof e=="string"?y(e):C(e)&&typeof e.response=="string"?y(e.response):""}catch(e){return Vr.warn("Turn preview failed",e),""}}function im(t){let e=Object.keys(t).find(o=>o.startsWith("__reactFiber$")||o.startsWith("__reactInternalInstance$"));return e?t[e]??null:null}function zr(t,e,o,n){if(!t||e>24)return;let r=(C(t.memoizedProps)?t.memoizedProps:null)??(C(t.pendingProps)?t.pendingProps:null);r&&(Array.isArray(r.items)&&C(r.items[0])&&typeof r.items[0].turnKey=="string"&&!o.length&&o.push(...r.items.filter(C)),Array.isArray(r.entries)&&C(r.entries[0])&&typeof(r.entries[0].historyEntityKey??r.entries[0].turnId)=="string"&&!n.length&&n.push(...r.entries.filter(C))),zr(t.child??null,e+1,o,n),zr(t.sibling??null,e,o,n)}function am(t,e){let o=typeof e.turnId=="string"?e.turnId:"",n=typeof e.turnKey=="string"?e.turnKey:"";return t.find(r=>{let i=typeof r.turnKey=="string"?r.turnKey:"";return!!i&&(o===i||n.endsWith(i)||n.includes(i))})??null}function Jr(t){let e=t.replace(/^history-content:/,"").replace(/^turn:/,"").replace(/:assistant$/,"");return e?[...new Set([t,e,`turn:${e}`,`${e}:assistant`,`local:${e}`])]:[]}function sm(t){let e=new Set;for(let o of t.querySelectorAll("[data-turn-key], [data-response-annotation-target], [data-chatgpt-search-message-ids]"))for(let n of[o.getAttribute("data-turn-key"),o.getAttribute("data-response-annotation-target"),...(o.getAttribute("data-chatgpt-search-message-ids")??"").split(/\s+/)])if(n)for(let r of Jr(n))e.add(r);return e}function lm(t){let e=new Set;for(let o of t.chain)for(let n of Jr(o.id))e.add(n);return e}function cm(t){let e=$("[data-thread-find-target='conversation']")??$(c.timelineScroll);if(!e)return;let o=$(c.timelineScroll)?.querySelector("[data-response-annotation-conversation]")?.getAttribute("data-response-annotation-conversation");if(o&&!yn(t).includes(o))return;let n=[],r=[];try{zr(im(e),0,n,r)}catch(p){Vr.warn("Fiber walk failed",p);return}if(!r.length&&!n.length)return;let i=r.length?r:n,a=typeof i[0]?.conversationId=="string"?i[0].conversationId:"";if(a&&!yn(t).includes(a))return;let u=zs(t);u.title=mo(t)??mo(a||t)??u.title;let l=sm(e),d=lm(u),m=[...d].some(p=>l.has(p));for(let p of i){let E="";typeof p.turnId=="string"?E=p.turnId:typeof p.turnKey=="string"&&(E=p.turnKey.replace(/^.*turn:/,""));let g=typeof p.historyEntityKey=="string"?p.historyEntityKey:E?`turn:${E}`:"";if(m&&![g,E].some(ct=>Jr(ct).some(Z=>d.has(Z)||l.has(Z))))continue;let x=am(n,p),z=nm(x?.getLabel??p.getLabel),ht=rm(x?.getPreview??p.getPreview),Y=typeof p.timestampSeparatorAtMs=="number"?p.timestampSeparatorAtMs:null;g&&z&&(Wr(u,Qr(g,"user",z,Y)),Y&&u.times.set(g,Y)),E&&ht&&Wr(u,Qr(`${E}:assistant`,"assistant",ht,Y))}Vs(u)}function dm(t){if(om(t.role))return t.role;let e=typeof t.type=="string"?t.type:typeof t.itemType=="string"?t.itemType:"";return/user/i.test(e)?"user":/agent|assistant/i.test(e)?"assistant":null}function um(t){return typeof t.text=="string"?t.text:typeof t.content=="string"?t.content:C(t.content)&&typeof t.content.text=="string"?t.content.text:""}function jr(t,e){if(!t||!C(e))return;let o=typeof e.id=="string"?e.id:typeof e.itemId=="string"?e.itemId:"",n=dm(e),r=um(e);if(!o||!n)return;let i=zs(t);Wr(i,Qr(o,n,r)),Vs(i)}function mm(t){let e=t.params?.thread,o=t.params?.threadId??(C(e)&&typeof e.id=="string"?e.id:void 0);t.params?.item&&jr(o,t.params.item);for(let n of t.params?.items??[])jr(o,n);if(C(e)&&Array.isArray(e.items))for(let n of e.items)jr(o,n)}io.on("note",mm);var pm=["data-turn","data-message-author-role"],fm=/:(user|assistant)$/,Zr=`${c.messageUnit}, ${c.oldMessage}`,An=t=>t==="user"||t==="assistant",Xs=()=>!!document.querySelector(c.timelineScroll),_s=()=>!!$(c.timelineScroll),tl=()=>v()??document.querySelector(c.composerConversation)?.getAttribute("data-above-composer-conversation-id")??"",wn=()=>Xs()?$(c.timelineScroll):document;function ho(){if(Xs())return $(c.timelineScroll);let t=document.querySelector(c.turn);for(let e=t?.parentElement;e;e=e.parentElement){let{overflowY:o}=getComputedStyle(e);if((o==="auto"||o==="scroll")&&e.scrollHeight>e.clientHeight)return e}return document.scrollingElement}var Qt=t=>{let e=t.getAttribute("data-chatgpt-search-unit-key")?.match(fm)?.[1];return An(e)?e:t.matches(c.userBubble)?"user":t.matches(c.assistantReply)||t.matches(c.assistantMarkdown)?"assistant":null},el=t=>{let e=[...t.querySelectorAll(c.searchUnit)].filter(n=>Qt(n)&&!n.parentElement?.closest(c.searchUnit));return e.length?e:[...t.querySelectorAll(`${c.userBubble}, ${c.assistantReply}`)].filter(n=>Qt(n)&&!n.parentElement?.closest(`${c.userBubble}, ${c.assistantReply}`))},Js=t=>(t.getAttribute("data-chatgpt-search-message-ids")??t.getAttribute("data-message-id")??t.getAttribute("data-response-annotation-target"))?.split(/\s+/).filter(Boolean)??[];function go(t){let e=Js(t);if(e.length)return e;let o=[...new Set([...t.querySelectorAll(Zr)].flatMap(Js))];if(o.length)return o;let n=t.closest("[data-turn-key]")?.getAttribute("data-turn-key")?.replace(/^history-content:/,"");return n&&Qt(t)==="user"?[n]:[]}function Le(t=wn()){if(!t)return[];let e=el(t);return e.length?e:[...t.querySelectorAll(Zr)].filter(o=>!o.parentElement?.closest(Zr))}function gm(t,e){for(let o=t.length-1;o>=0;o--){let n=e.find(r=>r.id===t[o]);if(n)return n.role}return null}function hm(t){for(let e of pm){let o=t.getAttribute(e)??t.querySelector(`[${e}]`)?.getAttribute(e);if(An(o))return o}return t.querySelector(c.markdown)||t.querySelector(c.generatedImage)?"assistant":null}var bm=t=>!t.parentElement?.closest(c.turn);function Wt(){let t=Lt(v())?.chain??[];return[...wn()?.querySelectorAll(c.turn)??[]].filter(bm).flatMap(o=>{let n=el(o),r=n.length?n.map(i=>({el:i,known:Qt(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=d=>!n.some(m=>m.contains(d))&&y(d.textContent??""),a=[...o.querySelectorAll(c.assistantMarkdown)].find(d=>i(d)&&!vn.test(y(d.textContent??""))),u=[...o.querySelectorAll(c.activityHeader)].findLast(i),l=a??u;l&&r.push({el:l,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?go(o):Le(o).flatMap(go),a=n??hm(o)??gm(i,t)??(r%2?"assistant":"user"),u=o.closest(c.turn)??o,l=!o.closest(c.searchUnit)&&!!u.querySelector(c.turnBusy),d=a==="assistant"&&(o.matches(c.turnBusy)||!!o.querySelector(c.turnBusy)||l);return{el:o,role:a,messageIds:i,streaming:d}})}var ym="[data-bloom], .sr-only",ol=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,vn=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,Zs=new WeakMap;function ke(t){let o=(t.el.closest(c.turn)??t.el).textContent?.length??0,n=Zs.get(t.el);if(n?.length===o)return n.summary;let r=vm(t);return Zs.set(t.el,{length:o,summary:r}),r}function $s(t){let e=new Set,o=[];for(let n of t.querySelectorAll(c.assistantMarkdown)){if(n.closest(c.searchUnit))continue;let r=y(n.textContent??"");!r||vn.test(r)||ol.test(r)||e.has(r)||(e.add(r),o.push(r))}return o}function vm(t){let e=t.el.querySelectorAll(c.generatedImage).length;if(t.role==="assistant"&&e)return e>1?`Image \xD7${e}`:"Image";let o=t.el.closest(c.turn);if(t.role==="assistant"&&o&&t.el.matches(c.assistantMarkdown)&&!t.el.closest(c.searchUnit)){let l=$s(o);if(l.length)return l.join(" \xB7 ")}let n=t.el.querySelector(t.role==="assistant"?`${c.markdown}, ${c.assistantMarkdown}`:".whitespace-pre-wrap")??t.el,i=[...n.querySelectorAll(ym)].map(l=>y(l.textContent??"")).filter(Boolean).reduce((l,d)=>l.replace(d,`
`),n.innerText||n.textContent||""),a=i.split(`
`).map(y).filter(l=>l&&!ol.test(l)&&!vn.test(l));if(a.length)return a.join(" ");if(t.role==="assistant"&&o){let l=$s(o);if(l.length)return l.join(" \xB7 ")}let u=i.split(`
`).map(y).filter(l=>vn.test(l));return u.length?u.at(-1)??"":t.role==="user"&&t.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function xn(t){return t.text?y(t.text):t.imageCount?t.imageCount>1?`Image \xD7${t.imageCount}`:"Image":t.hasFiles?"File":""}var $r=t=>t.matches(c.timelineScroll)&&getComputedStyle(t).flexDirection==="column-reverse";var Am=80,wm=420;function Xr(t,e,o){return(t.x-o.x)*(e.y-o.y)-(e.x-o.x)*(t.y-o.y)}function xm(t,e,o,n){let r=Xr(t,e,o),i=Xr(t,o,n),a=Xr(t,n,e);return!((r<0||i<0||a<0)&&(r>0||i>0||a>0))}function Sm(t,e){let o=(e.left+e.right)/2-(t.left+t.right)/2,n=(e.top+e.bottom)/2-(t.top+t.bottom)/2;if(Math.abs(o)>=Math.abs(n)){let i=o<0?e.right:e.left;return[{x:i,y:e.top},{x:i,y:e.bottom}]}let r=n<0?e.bottom:e.top;return[{x:e.left,y:r},{x:e.right,y:r}]}function nl(t,e){let o=ot(t.x,e.left,e.right),n=ot(t.y,e.top,e.bottom);return Math.hypot(t.x-o,t.y-n)}function Sn(t){let e=t.closeDelay??Am,o=t.towardDelay??wm,n=0,r=!1,i=null,a=null,u=()=>{document.removeEventListener("pointermove",g,!0)},l=()=>{n&&window.clearTimeout(n),n=0,u(),i=null,a=null},d=()=>{l(),r&&(r=!1,t.setHeld(!1))},m=()=>{r||(r=!0,t.setHeld(!0))},p=x=>{n&&window.clearTimeout(n),n=window.setTimeout(d,x)},E=x=>{let z=t.panel(),ht=t.trigger();if(!z||!i)return!1;let Y=z.getBoundingClientRect();if(Y.width<=0&&Y.height<=0)return!1;let ct=ht?.getBoundingClientRect(),[Z,sr]=ct&&(ct.width||ct.height)?Sm(ct,Y):[{x:Y.left,y:Y.top},{x:Y.right,y:Y.bottom}];return xm(x,i,Z,sr)?!0:a!=null&&nl(x,Y)<nl(a,Y)-.25},g=x=>{let z={x:x.clientX,y:x.clientY};if(t.over(x.target)){l();return}E(z)?p(o):d(),a=z};return{enter(){l()},leave(x){if(t.over(x.relatedTarget)){l();return}i={x:x.clientX,y:x.clientY},a=i,m(),document.addEventListener("pointermove",g,!0),p(e)},dispose(){l(),r=!1}}}var rl=`/*
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
`;var T=L("bloom-nav-"),Mn=80,Em=1200,Tm=2,il=3e4,Mm=200,Cm=.9,Lm=.28,km=24,Be=8,Bm=80,Im=12,_r=80,cl=`${c.rightPanel}, ${c.summaryPanel}`,Pm={user:"\u2753",assistant:"\u{1F916}"},Om=["wheel","touchmove","pointerdown"],kn=b({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),A=null,R=[],st=-1,ue=-1,Ie=null,me="",ei=0,oi=[],Ao=null,qn=null,En=new Set,kt,bo,Bt,yo="",zt=[],wo=null,Cn=new Set,ni=new Map,Tn=!1,Rm=t=>kn.store.showAssistant||t.role==="user",Hm=t=>t.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||t.messageIds[0]||t.role;function Dm(t){return{role:t.role,summary:ke(t),ids:t.messageIds,turn:t,streaming:t.streaming}}function dl(t,e){let o=t.entries.at(-1);if(o?.role==="assistant"&&e.role==="assistant"){t.entries[t.entries.length-1]={...e,ids:[...new Set([...o.ids,...e.ids])]};return}t.entries.push(e)}function Nm(){let t=[];for(let e of Wt()){let o=Dm(e),n=Hm(e),r=t.at(-1),i=!e.el.closest("[data-turn-key]");r&&(r.key===n||i&&o.role==="assistant")?dl(r,o):t.push({key:n,entries:[o]})}return t}function Um(){let t=[];for(let e of Lt(v())?.chain??[]){let o={role:e.role,summary:xn(e),ids:[e.id],turn:null,streaming:!1},n=t.at(-1);e.role==="assistant"&&n?dl(n,o):t.push({key:e.id,entries:[o]})}return t}var Pe=t=>t.entries.flatMap(e=>e.ids);function Ln(t,e){let o=new Set(Pe(t));return Pe(e).some(n=>o.has(n))}var pe=t=>y(t.entries.find(e=>e.role==="user")?.summary??""),ti=(t,e)=>t.filter(o=>pe(o)===e).length,ri=t=>({...t,turn:null,streaming:!1});function Fm(t,e){let o=new Set(e.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return t.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return ri(r);let a=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return a&&a!==n.key?ri(r):r})}))}function Km(t,e){let o=e.entries.map((n,r)=>{let i=t.entries[r];if(!i)return n;let a=[...new Set([...n.ids,...i.ids])];return{...n,ids:a,summary:n.summary||i.summary}});for(let n of t.entries.slice(o.length))o.push(ri(n));return{key:t.key,entries:o}}function ul(){let t=ho();if(!t)return!1;let e=t.clientHeight-t.scrollHeight;return t.scrollTop-e<=Math.abs(t.scrollTop)}function Gm(t,e){let o=Fm(t,e).filter(l=>e.some(d=>d.key===l.key)||!e.some(d=>Ln(d,l)));if(!e.length)return o;if(!o.length)return e;let n=e.findIndex(l=>o.some(d=>d.key===l.key));if(n<0)return ul()?e.concat(o):o.concat(e);let r=e[n]?.key,i=o.findIndex(l=>l.key===r),a=o.slice(0,i).concat(e.slice(0,n),o.slice(i)),u=a.findIndex(l=>l.key===r);for(let l=n;l<e.length;l++){let d=e[l];if(!d)continue;let m=a.findIndex(p=>p.key===d.key);if(m>=0){let p=a[m];p&&(a[m]=Km(p,d)),u=m}else a.splice(u+1,0,d),u++}return a}function Ym(t,e){let o=0,n=0,r=0;for(let i=1-t.length;i<e.length;i++){let a=0,u=0;for(let d=0;d<t.length;d++){let m=e[d+i],p=t[d];!m||!p||(Ln(p,m)?(a+=3,u++):pe(p)&&pe(p)===pe(m)&&a++)}let l=ul()?i<r:i>r;(a>o||a===o&&u>n||a===o&&u===n&&l)&&(o=a,n=u,r=i)}return{score:o,offset:r}}function jm(t,e){let o=t.entries.map((n,r)=>{let i=e.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of e.entries.slice(o.length))o.push({...n,turn:null});return{key:t.key,entries:o}}function ii(t){return t.map(e=>({key:e.key,entries:e.entries.map(o=>({...o}))}))}function Qm(t,e,o=!0){if(!e.length)return t;if(!t.length)return e;let{score:n,offset:r}=Ym(t,e),i=ii(t);if(n>0)for(let l=0;l<i.length;l++){let d=e[l+r],m=i[l];if(!d||!m)continue;let p=pe(m),E=!!p&&p===pe(d)&&ti(t,p)===1&&ti(e,p)===1;(Ln(m,d)||E)&&(i[l]=jm(m,d))}let a=[],u=[];for(let l=0;l<e.length;l++){let d=e[l];if(!d)continue;let m=pe(d);!m||ti(i,m)>0||i.some(p=>Ln(p,d))||o&&(n>0&&l<r?a.push(d):u.push(d))}return a.concat(i,u)}var ai=t=>t.entries.some(e=>e.turn?.el.isConnected);function Wm(t,e,o){let n=t.findIndex(i=>Pe(i).includes(e));if(n>=0)return n+1;let r=t.find(ai);return o&&r&&Pe(r).includes(o)?0:t.length}function zm(t){if(wo){let{parent:e,user:o}=wo;for(let n of t.slice(Wm(t,e,o))){let r=Pe(n);if(!ai(n)&&!(o&&r.includes(o)))for(let i of r)Cn.add(i)}}return t.filter(e=>ai(e)||!Pe(e).some(o=>Cn.has(o)))}function ml(){zt=[],wo=null,Cn.clear()}function Vm(){let t=tl();if(t!==yo){yo&&zt.length&&ni.set(yo,ii(zt)),yo=t;let n=t?ni.get(t):void 0;n?.length?(zt=ii(n),wo=null,Cn.clear(),Tn=!0):(ml(),Tn=!1)}let e=Nm(),o=Um();return!e.length&&!o.length&&!_s()?(zt=[],[]):(zt=zm(Qm(Gm(zt,e),o,!Tn)),zt.flatMap(n=>n.entries).filter(Rm))}function Jm(t){for(let o of t)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!_().generating||t.some(o=>o.streaming))return;let e=t.at(-1);e&&(e.role==="assistant"||!kn.store.showAssistant?e.streaming=!0:t.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function pl(){let t=Vm();return Jm(t),t}function fl(t){let e=t.getBoundingClientRect(),o=it()?.getBoundingClientRect().top,n=Math.min(e.bottom,o&&o>e.top?o:e.bottom);return{top:e.top,bottom:n}}function gl(t){return((t.matches(".whitespace-pre-wrap, .markdown, .prose, [data-markdown-text-style]")?t:t.querySelector(".whitespace-pre-wrap")??t.querySelector(".markdown, .prose, [data-markdown-text-style]"))??t).getBoundingClientRect().top}function al(t){let e=R[t]?.turn?.el;return e?.isConnected?e:null}function Zm(t){if(!R.length)return null;let e=t.scrollHeight-t.clientHeight,o=$r(t),n=Math.min(t.scrollTop,0),r=o?-n:e-t.scrollTop,i=o?e+n:t.scrollTop,a=e<=Be||r<=Be,u=e>Be&&i<=Be,{top:l,bottom:d}=fl(t),m=al(0),p=m?gl(m):Number.NaN,E=!!m&&p>=l-Be&&p<=l+48,g=al(R.length-1),x=g?.getBoundingClientRect().bottom??Number.NaN,z=!!g&&x<=d+Be&&x>=d-Bm;return a||z?"bottom":u||E?"top":null}function $m(t){let{top:e,bottom:o}=fl(t),n=e+Math.max(o-e,0)*Lm,r=[],i=-1;if(R.forEach((u,l)=>{let d=u.turn?.el;if(!d?.isConnected){r.push(Number.NaN);return}let m=gl(d);r.push(m),i<0&&(i=l),m<=n&&(i=l)}),i<0)return Math.max(R.findIndex(u=>u.turn),0);let a=r[st];return Number.isFinite(a)?i===st?st:i>st?i:a<=n+km?st:i:i}function Xm(t){let e=Zm(t);return e==="bottom"?R.length-1:e==="top"?0:$m(t)}function sl(t){kn.store.jumpEffect==="border"&&(t.classList.add(T("flash")),setTimeout(()=>t.classList.remove(T("flash")),Em))}function Bn(t){let e=R[t],o=ho();if(!e||!o)return;if(!e.turn&&!e.ids.length){ue=t,vo(),o.scrollTo({top:$r(o)?0:o.scrollHeight});return}ue=t,Ie=t?null:{chat:v(),first:e.ids[0],until:Date.now()+il},vo();let n=e.turn?.el;if(n?.isConnected){let d=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:d<o.clientHeight*Tm?"smooth":"auto"}),sl(n);return}let r=R.findIndex(d=>d.turn),i=r>=0&&t<r?-1:1,a=++ei,u=Date.now()+il,l=()=>{let d=ho();if(a!==ei||Date.now()>u||!d)return;R=pl();let m=R.find(E=>E.ids.some(g=>e.ids.includes(g)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),sl(m),ue=R.findIndex(E=>E.turn?.el===m),vo();return}let p=d.scrollTop;d.scrollBy({top:i*d.clientHeight*Cm,behavior:"instant"}),d.scrollTop===p?setTimeout(l,Mm):requestAnimationFrame(l)};l()}function _m(t,e){return s("button",{class:T("row"),attrs:{type:"button","data-index":String(e),"data-message-id":t.ids[0]??""},on:{click:()=>Bn(e)}},s("span",{text:Pm[t.role]}),s("span",{class:"bloom-truncate",text:bt(t.summary||"\u2026",Mn)}))}function tp(t,e){let o=t.offsetWidth?e.width/t.offsetWidth:1;return e.left+(t.clientLeft+t.clientWidth)*o}function ep(t){let e=1/0;for(let o of document.querySelectorAll(cl)){if(!yt(o))continue;let n=o.getBoundingClientRect();n.width<_r||n.height<_r||n.left<t.left+_r||n.left<e&&(e=n.left)}return Number.isFinite(e)?e:null}function ll(t){if(!A)return;let e=t.getBoundingClientRect(),o=it()?.getBoundingClientRect().top,r=Math.min(e.bottom,o&&o>e.top?o:e.bottom)-e.top,i=Math.min(tp(t,e),ep(e)??1/0);A.style.right=`${document.documentElement.clientWidth-i+Im}px`,A.style.top=`${e.top}px`,A.style.height=r>1?`${r}px`:""}function op(){let t=ho();if(R=pl(),!R.length||!t){Bt?.dispose(),Bt=void 0,A?.remove(),A=null,me="";return}if(Ao!==t){bo?.abort(),bo=new AbortController,t.addEventListener("scroll",Dt(vo),{passive:!0,signal:bo.signal});for(let n of Om)t.addEventListener(n,bl,{passive:!0,signal:bo.signal});Ao=t,kt?.disconnect(),kt=new ResizeObserver(()=>{t.isConnected&&ll(t)}),kt.observe(t),qn=null,En=new Set}let e=it();if(e&&e!==qn&&kt&&(kt.observe(e),qn=e),kt)for(let n of document.querySelectorAll(cl))En.has(n)||(kt.observe(n),En.add(n));ap(),ll(t);let o=JSON.stringify(R.map(n=>[n.role,n.ids]));o!==me?(me=o,ue=-1,rp(),Ie&&Date.now()<Ie.until&&Ie.chat===v()&&R[0]?.ids[0]!==Ie.first&&Bn(0)):np(),vo()}function vo(){if(!A||!Ao)return;st=ue>=0?ue:Xm(Ao),A.querySelectorAll(`.${T("tick")}`).forEach((e,o)=>e.classList.toggle(T("tick-current"),o===st)),A.querySelectorAll(`.${T("row")}`).forEach(e=>e.setAttribute("aria-current",String(Number(e.dataset.index)===st)));let t=A.querySelector(`.${T("toc-head")}`);t&&(t.textContent=`${st+1} / ${R.length}`)}function np(){A?.querySelectorAll(`.${T("tick")}`).forEach((t,e)=>{let o=R[e],n=bt(o.summary,Mn);t.title!==n&&(t.title=n),t.classList.toggle(T("tick-streaming"),o.streaming)}),A?.querySelectorAll(`.${T("row")}`).forEach(t=>{let e=t.lastElementChild,o=bt(R[Number(t.dataset.index)].summary||"\u2026",Mn);e&&e.textContent!==o&&(e.textContent=o)})}function rp(){A?.querySelector(`.${T("rail")}`)?.replaceChildren(...R.map((e,o)=>s("button",{class:jo(T("tick"),T(`tick-${e.role}`),e.streaming&&T("tick-streaming"),o===st&&T("tick-current")),title:bt(e.summary,Mn),attrs:{type:"button","aria-label":`Jump to message ${o+1}`,"data-message-id":e.ids[0]??""},on:{click:()=>Bn(o)}}))),A?.querySelector(`.${T("toc-list")}`)?.replaceChildren(...R.map(_m))}var qt=Dt(op);function si(t){if(t===A)return;let e=t.__bloomNavStop;if(e&&e!==li)try{e()}catch{}t.isConnected&&t!==A&&t.remove()}function hl(){let t=[...document.querySelectorAll('[data-bloom="navigator"]')];if(A&&!A.isConnected&&(A=null),A&&t.includes(A)){for(let e of t)si(e);return}A=t[0]??null;for(let e of t.slice(1))si(e)}function ip(){Bt?.dispose(),Bt=Sn({over:t=>t instanceof Node&&!!A?.contains(t),trigger:()=>A?.querySelector(`.${T("rail")}`),panel:()=>A?.querySelector(`.${T("toc")}`),setHeld:t=>A?.classList.toggle(T("open"),t)})}function ap(){hl(),A&&!A.querySelector(`.${T("rail")}`)&&(A.remove(),A=null,me=""),A||(A=s("div",{class:`bloom-root ${T("root")}`,attrs:{"data-bloom":"navigator"},on:{pointerenter:()=>Bt?.enter(),pointerleave:t=>Bt?.leave(t)}},s("div",{class:T("rail")}),s("div",{class:T("bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:T("toc")},s("div",{class:T("toc-head")}),s("div",{class:T("toc-list")}))),me=""),Bt||ip(),A.isConnected||document.body.append(A),A.querySelector(`.${T("tick")}`)||(me=""),A.__bloomNavStop=li}function bl(){ue=-1,Ie=null,ei++}function li(){for(let t of oi)t();oi=[],bo?.abort(),kt?.disconnect(),kt=void 0,Ao=null,qn=null,En=new Set,removeEventListener("keydown",yl,!0),removeEventListener("resize",qt),Bt?.dispose(),Bt=void 0,A&&delete A.__bloomNavStop,A?.remove(),A=null,me="",ml(),ni.clear(),yo="",Tn=!1;for(let t of document.querySelectorAll('[data-bloom="navigator"]'))si(t)}var sp=t=>!!t&&(t.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!t.closest("[contenteditable='true']"));function yl(t){if(!A||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey||sp(document.activeElement)||$("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:st-1,ArrowDown:st+1,Home:0,End:R.length-1}[t.key];if(o==null){bl();return}o<0||o>=R.length||(t.preventDefault(),t.stopPropagation(),Bn(o))}var vl=h({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:kn,styles:rl,start(){hl(),oi=[M(t=>U(t)&&qt()),vt(qt),St.on("conversation",qt),St.on("generate-start",({parentId:t,userId:e})=>{t&&(wo={parent:t,user:e},qt())}),O.on("rise",qt),O.on("fall",qt)],addEventListener("keydown",yl,!0),addEventListener("resize",qt,{passive:!0}),qt()},stop:li,onSettingsChange:qt});var Al=`/*
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
`;var X=L("bloom-quotes-"),bi="BloomBetterQuotes",cp=40,ql=8,dp=1800,mi=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,wl=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,fe=b({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),ci,di,Oe,ui=!1,pi=0,In=null,Pn=null,It=null;function yi(){return v()??"draft"}function Rn(){try{let t=JSON.parse(sessionStorage.getItem(bi)??"[]");return Array.isArray(t)?t.filter(e=>!!e&&typeof e=="object"&&typeof e.id=="string"&&typeof e.text=="string"&&!!e.text):[]}catch{return[]}}function vi(t){try{sessionStorage.setItem(bi,JSON.stringify(t.slice(-cp)))}catch{}}function xo(t){return Rn().find(e=>e.id===t)?.text??""}function up(t,e){let o=Rn().filter(n=>n.id!==t);o.push({id:t,text:e}),vi(o)}function fi(t=yi()){vi(Rn().filter(e=>e.id!==t)),On()}function mp(t){let e=xo("draft");if(!e||xo(t))return;let o=Rn().filter(n=>n.id!=="draft");o.push({id:t,text:e}),vi(o)}function gi(t){return`${t.getAttribute("aria-label")??""} ${t.getAttribute("title")??""}`}function pp(t){let e=gi(t);return wl.test(e)&&!/quote|引用/.test(e)?!1:/quote|引用/.test(e)&&mi.test(e)?!0:mi.test(e)&&!wl.test(e)}function El(t){let e=t.cloneNode(!0),o=[...e.querySelectorAll("button, [role='button']")],n=new Set(o.map(r=>r.getAttribute("aria-label")).filter(Boolean));for(let r of o)r.remove();for(let r of e.querySelectorAll("*"))!r.children.length&&n.has(y(r.textContent??""))&&r.remove();return y(e.textContent??"")}function fp(t){let e=it(),o=t.parentElement,n=0;for(;o&&o!==e&&n<5;){if(n++,o.matches(c.composerInput)||o.querySelector(c.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=El(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function Hn(){let t=it();if(!t)return null;for(let e of t.querySelectorAll("button, [role='button']")){if(e.closest("[data-bloom]")||!pp(e))continue;let o=fp(e),n=o?El(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:e}}return null}function gp(t){let e=t.closest(c.searchUnit)??t.closest(c.oldMessage);return e&&(Qt(e)??e.getAttribute("data-message-author-role"))==="user"?e:null}function Ai(t){return y(t).slice(0,48)}function hp(t,e){let o=Ai(t);if(o.length<ql)return null;let n=null;for(let r of Le()){if(e&&(r===e||e.contains(r)||r.contains(e)))continue;let i=y(r.textContent??"");if(!i.includes(o))continue;let a=o.length/Math.max(i.length,1);(!n||a>n.score)&&(n={el:r,score:a})}return n?.el??null}function bp(t,e){let o=Ai(e),n=t;for(let r of t.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&y(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${X("hit")}`)?.classList.remove(X("hit")),n.classList.add(X("hit")),window.clearTimeout(pi),pi=window.setTimeout(()=>n.classList.remove(X("hit")),dp)}function xl(t){let e=t.closest(c.timelineScroll)??document.scrollingElement;if(!(e instanceof HTMLElement)&&e!==document.scrollingElement)return;let o=t.getBoundingClientRect();if(o.height<1||!e)return;let n=e.getBoundingClientRect(),r=it()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,a=o.top+o.height/2-(n.top+i)/2;Math.abs(a)<8||e.scrollTo({top:e.scrollTop+a,behavior:"smooth"})}function wi(){if(!It||!In?.isConnected)return;let t=In.getBoundingClientRect();t.width<1||(It.style.top=`${Math.max(8,t.top+8)}px`,It.style.left=`${Math.max(8,t.right-It.offsetWidth-8)}px`)}function yp(t,e,o){In=t,Pn=e,It??=s("button",{class:`bloom-root ${X("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),It.isConnected||document.body.append(It),bp(t,o),wi()}function Sl(){It?.remove(),It=null,In=null,Pn=null,document.querySelector(`.${X("hit")}`)?.classList.remove(X("hit"))}function Tl(){return document.querySelector('[data-bloom="quote-chip"]')}function On(){Tl()?.remove()}function vp(t){let o=it()?.getBoundingClientRect();!o||o.width<8||(t.style.width=`${Math.max(120,o.width-24)}px`,t.style.left=`${o.left+12}px`,t.style.top=`${Math.max(8,o.top-t.offsetHeight-8)}px`)}function Ap(t){let e=Tl();e||(e=s("div",{class:`bloom-root ${X("chip")}`,attrs:{"data-bloom":"quote-chip"}},s("span",{class:X("text")}),s("button",{class:X("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(e));let o=e.querySelector(`.${X("text")}`),n=y(t);o&&o.textContent!==n&&(o.textContent=n),e.dataset.text=t,vp(e)}function hi(){if(!ui){ui=!0;try{let t=yi(),e=Hn();fe.store.persistAcrossChats&&e&&xo(t)!==e.text&&up(t,e.text);let o=fe.store.persistAcrossChats?xo(t):"";!o||e&&y(e.text)===y(o)?On():Ap(o),wi()}finally{ui=!1}}}function wp(t){let e=t.closest('[data-bloom="quote-chip"]');if(e instanceof HTMLElement&&!t.closest(`.${X("x")}`)){let i=e.dataset.text??e.querySelector(`.${X("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:e}:null}let o=t.closest("blockquote");if(o instanceof HTMLElement&&!t.closest("a, button")){let i=gp(o),a=y(o.textContent??"");if(i&&a)return{text:a,skip:i,origin:o}}let n=it();if(!n||!n.contains(t)||ro(t)||t.closest("button, [role='button']"))return null;let r=Hn();return!r||!r.row.contains(t)?null:{text:r.text,skip:null,origin:r.row}}function xp(t){let{target:e}=t;if(!(e instanceof Element))return;if(e.closest('[data-bloom="quote-back"]')){t.preventDefault(),t.stopPropagation(),Pn?.isConnected&&xl(Pn);return}if(e.closest(`.${X("x")}`)){t.preventDefault(),t.stopPropagation(),fi();return}let o=Hn();if(o&&(e===o.dismiss||o.dismiss.contains(e))){fi();return}if(Sp(e)&&Ml(),!fe.store.jumpToPassage)return;let n=wp(e);if(!n)return;let r=hp(n.text,n.skip);r&&(t.preventDefault(),t.stopPropagation(),yp(r,n.origin,n.text),xl(r))}function Sp(t){let e=t.closest("button, [role='button']");return!(e instanceof HTMLElement)||e.closest("[data-bloom]")||!it()?.contains(e)?!1:/send|submit|发送|提交/i.test(gi(e))&&!mi.test(gi(e))}function qp(t){return!(t instanceof KeyboardEvent)||t.key!=="Enter"||t.shiftKey||t.isComposing?!1:ro(t.target)}function Ml(){if(!fe.store.persistAcrossChats)return;let t=yi(),e=xo(t);if(e){if(!Hn()){let o=W(),n=Ai(e);n.length>=ql&&!y(o).includes(n)&&Ct(`> ${e}

${o}`.trim())}fi(t)}}function Ep(t){qp(t)&&Ml()}function Tp(t){!t.prevId&&t.id&&mp(t.id),hi()}var Cl=h({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:fe,styles:Al,onSettingsChange(t){t==="jumpToPassage"&&!fe.store.jumpToPassage&&Sl(),t==="persistAcrossChats"&&!fe.store.persistAcrossChats&&(sessionStorage.removeItem(bi),On()),hi()},start(){Oe=new AbortController,document.addEventListener("pointerdown",xp,{capture:!0,signal:Oe.signal}),document.addEventListener("keydown",Ep,{capture:!0,signal:Oe.signal}),addEventListener("scroll",wi,{capture:!0,passive:!0,signal:Oe.signal}),di=vt(Tp),ci=M(t=>U(t)&&hi())},stop(){Oe?.abort(),Oe=void 0,di?.(),di=void 0,ci?.(),ci=void 0,window.clearTimeout(pi),Sl(),On()}});var Ll=`/*
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
`;var Cp="[data-app-action-sidebar-thread-row]{position:relative}[data-app-action-sidebar-thread-row]>[data-bloom=cls]{position:absolute;inset-inline-end:0.25rem;top:50%;width:0.875rem;height:0.875rem;margin:0;transform:translateY(-50%);pointer-events:none}",Lp=L("bloom-cls"),kp="bloom-cls",Bp=600*1e3,Si=Ze("tab"),He=new Map,So=new Map,Re=null,kl=[],Ip=t=>t==="streaming"||t==="error";function Pp(){let t=new Map,e=Date.now();for(let[o,n]of So)e-n.at>Bp?So.delete(o):t.set(o,n.status);for(let[o,n]of He)t.set(o,n);return t}function Op(t){return s("span",{class:`bloom-root ${Lp("",`-${t}`)}`,attrs:{"data-bloom":"cls","data-status":t,"aria-label":t==="error"?"Error":"Generating"}},t==="error"&&k("alert"))}function Nn(){let t=Pp(),e=new Set;for(let[o,n]of t)for(let r of uo(o)){if(!At(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){e.add(i);continue}i?.remove();let a=Op(n);e.add(a),r.append(a)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))e.has(o)||o.remove()}function Dn(t,e){t&&(e?He.set(t,e):He.delete(t),Re?.postMessage({tab:Si,id:t,status:e}),Nn())}function Rp({data:t}){!C(t)||typeof t.id!="string"||typeof t.tab!="string"||t.tab===Si||(Ip(t.status)?So.set(t.id,{status:t.status,tab:t.tab,at:Date.now()}):So.delete(t.id),Nn())}function xi(){for(let t of He.keys())Re?.postMessage({tab:Si,id:t,status:null})}var Bl=h({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:()=>`${Ll}${Cp}`,start(){for(let t of document.querySelectorAll('[data-bloom="cls"]'))t.remove();Re=typeof BroadcastChannel=="function"?new BroadcastChannel(kp):null,Re?.addEventListener("message",Rp),addEventListener("pagehide",xi),kl=[O.on("rise",({conversationId:t})=>Dn(t,"streaming")),O.on("fall",({conversationId:t,outcome:e})=>Dn(t,e==="error"?"error":null)),O.on("context",({prevId:t,id:e,migrated:o})=>{o&&_().generating?Dn(e,"streaming"):!o&&He.get(t??"")==="streaming"&&Dn(t,null)}),M(t=>U(t)&&Nn())],v()&&Nn()},stop(){for(let t of kl)t();xi(),Re?.close(),Re=null,removeEventListener("pagehide",xi),He.clear(),So.clear();for(let t of document.querySelectorAll('[data-bloom="cls"]'))t.remove()}});var Vt="data-bloom-invite",Hp=/^(?:invite team members|invite members|邀请团队成员|邀请成员)$/i,Il=':is(button, a:not([href^="/c/"])):not(main *, [role="dialog"] *)',Dp={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${c.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])'],hideInvite:[`[${Vt}]`,`div:has(> [${Vt}]:only-child)`]},Pl=b({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0},hideInvite:{type:"boolean",description:"Hide Invite team members in the sidebar.",default:!0}}),Un,qi=!1;function Np(t){if(U(t))for(let e of document.querySelectorAll(`${Il}, [${Vt}]`))!e.matches(Il)||!Hp.test(y(e.textContent??""))?e.removeAttribute(Vt):e.hasAttribute(Vt)||e.setAttribute(Vt,"")}var Ol=h({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads, notices and Invite team members.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:Pl,styles:()=>Ht(Object.entries(Dp).flatMap(([t,e])=>Pl.store[t]?e:[])),start(){qi=!0,Kt().then(()=>{qi&&!Un&&(Un=M(Np))})},stop(){qi=!1,Un?.(),Un=void 0;for(let t of document.querySelectorAll(`[${Vt}]`))t.removeAttribute(Vt)}});var De=`form:has(:is(${c.composerInput})), ${c.oldComposerForm}`,Fn='[class*="ComposerLayoutBody"]',Ti='[class*="ComposerLayoutRoot"]',Up='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',Fp=`:is(${De}) ${Fn}, :is(${De}):not(:has(${Fn})) ${Ti}, :is(${De}):not(:has(${Fn})):not(:has(${Ti})) :is(${Up})`,Kp='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',Gp='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',Yp="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))",jp="var(--color-background-composer-surface, var(--composer-background-color, var(--color-bg-primary, Canvas)))",Qp="composer-fill",Rl=b({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function Wp(){let{opacity:t,blur:e}=Rl.store;if(t>=100)return"";{let i=`color-mix(in srgb, ${jp} ${t}%, transparent)`;return`[class*="ComposerLayoutRoot"], [data-composer-layout], [data-chatgpt-composer]{--composer-layout-surface-background:${i}!important;--composer-background-color:${i}!important;--composer-layout-surface-backdrop-filter:blur(${e}px)!important}`}let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${Yp} ${t}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${e}px)!important;-webkit-backdrop-filter:blur(${e}px)!important`;return`:is(${Kp}), :is(${De}){${o}}:is(${Gp}){display:none!important}${Fp}{${n}}:is(${De}):has(${Fn}) ${Ti}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${De}) :is(${c.composerInput}){background-color:transparent!important}`}function Ei(){for(let t of document.querySelectorAll(`[data-bloom="${Qp}"]`))t.remove()}var Hl=h({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:Rl,styles:Wp,start(){Ei()},stop(){Ei()},onSettingsChange(){Ei()}});var zp=1200,Vp=8e3,Jp=150,Zp=20,Dl=6,Li="continue where you left",$p=/message delivery timed out|please try again/i,Nl=/waiting for the complete answer/i,Ul=b({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:Li,placeholder:Li}}),Mi=[],Gn=0,qo=!1,Eo=0,Ue="",Kn="",ki=0,Fe=!1,To=!1,Yn=!0,Ne="",Bi=0,jn=!1,Xp=()=>Ul.store.prompt.trim()||Li;function Fl(){return($(c.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function Kl(){let t=Fl();return!t||Nl.test(t)||!$p.test(t)?"":t}function _p(){let t=Fl();return t&&Nl.test(t)?t:""}function tf(){let t=wn()?.querySelectorAll(c.turn),e=t?.[t.length-1];return`${e?.getAttribute("data-turn-key")??""}:${e?.textContent?.length??0}`}function Gl(t,e,o){if(o===Gn){if(_().generating||W()!==t||e>=Zp){Fe=!1,_().generating||(Ue="");return}Xa(),setTimeout(()=>Gl(t,e+1,o),Jp)}}function ef(t){let e=Gn;if(_().generating||W()&&W()!==t){Fe=!1,Ue="";return}Ct(t),jn=!0,dr(()=>{e===Gn&&Gl(t,0,e)})}function Yl(t){return t===Ue||Eo>=Dl||_().generating||W()?!1:(Ue=t,Eo+=1,Fe=!0,ef(Xp()),!0)}function of(){if(qo||Fe||To)return;let t=Date.now(),e=Kl();if(e){if(Ne="",e!==Kn){Kn=e,ki=t;return}if(t-ki<zp)return;Yl(`${v()??""}:${e}`);return}if(Kn="",!_p()){Yn=!0,Ne="";return}if(!Yn||!_().generating||W())return;let n=`${v()??""}:${tf()}`;if(n!==Ne){Ne=n,Bi=t;return}if(t-Bi<Vp||Eo>=Dl)return;let r=Ar();r&&(To=!0,r.click())}function Ci(){Gn+=1,qo=!1,Eo=0,Ue="",Kn="",ki=0,Fe=!1,To=!1,Yn=!0,Ne="",Bi=0,jn=!1}var jl=h({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:Ul,start(){Ci(),Mi=[O.on("rise",()=>{qo=!1,Ue="",Fe=!1,jn&&(jn=!1,Yn=!1,Ne="")}),O.on("fall",({outcome:t})=>{if(To){To=!1,t==="left"?qo=!0:Yl(`${v()??""}:stall`);return}(t==="stopped"||t==="left")&&(qo=!0),t==="done"&&!Kl()&&(Eo=0)}),O.on("context",({migrated:t})=>{t||Ci()}),O.on("tick",of)]},stop(){for(let t of Mi)t();Mi=[],Ci()}});var Pt=L("bloom-csi-"),nf=256,rf=160,Qn=1,Ql=4,af=.1,sf=.0015,lf=250;function cf(t){return new Promise((e,o)=>{let n=new FileReader;n.onload=()=>e(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(t)})}function df(t){return new Promise((e,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>e(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=t})}function uf(t,e){let o=Math.max(1/t.naturalWidth,1/t.naturalHeight)*e.zoom,n=1/(2*t.naturalWidth*o),r=1/(2*t.naturalHeight*o);return{zoom:e.zoom,x:ot(e.x,n,1-n),y:ot(e.y,r,1-r)}}function Wl(t,e,o){let n=t.width,r=t.getContext("2d");if(!r)return;let i=Math.max(n/e.naturalWidth,n/e.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(e,n/2-o.x*e.naturalWidth*i,n/2-o.y*e.naturalHeight*i,e.naturalWidth*i,e.naturalHeight*i)}function mf(t,e){let o=s("canvas");return o.width=o.height=nf,Wl(o,t,e),o.toDataURL("image/png")}function zl(t){let e=null,o={x:Q.store.cropX,y:Q.store.cropY,zoom:Q.store.cropZoom},n,r=s("canvas",{class:Pt("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=rf*devicePixelRatio;let i=s("div",{class:`bloom-muted ${Pt("status")}`}),a=s("div",{class:Pt("zoom")}),u=s("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(g,x=!0){e&&(o=uf(e,g),Wl(r,e,o),x&&(clearTimeout(n),n=setTimeout(()=>{e&&(Q.store.cropX=o.x,Q.store.cropY=o.y,Q.store.cropZoom=o.zoom,Q.store.avatarUrl=mf(e,o))},lf)))}function d(){a.replaceChildren(cn(o.zoom,Qn,Ql,af,"\xD7",g=>l({...o,zoom:g})))}async function m(g,x){i.textContent="";try{e=await df(g),x&&(Q.store.avatarSource=g,o={x:.5,y:.5,zoom:Qn}),t.classList.add(Pt("has-image")),d(),l(o,x)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let p=g=>{g?.type.startsWith("image/")&&cf(g).then(x=>m(x,!0))};u.addEventListener("change",()=>p(u.files?.[0])),r.addEventListener("wheel",g=>{e&&(g.preventDefault(),l({...o,zoom:ot(o.zoom*(1-g.deltaY*sf),Qn,Ql)}),d())},{passive:!1}),r.addEventListener("pointerdown",g=>{if(!e)return;r.setPointerCapture(g.pointerId);let x={...o},z=r.getBoundingClientRect(),ht=Y=>{if(!e)return;let ct=Math.max(z.width/e.naturalWidth,z.height/e.naturalHeight)*o.zoom;l({...o,x:x.x-(Y.clientX-g.clientX)/(e.naturalWidth*ct),y:x.y-(Y.clientY-g.clientY)/(e.naturalHeight*ct)})};r.addEventListener("pointermove",ht),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",ht),{once:!0})});let E=s("div",{class:Pt("cropper"),attrs:{tabindex:"0"},on:{paste:g=>p([...g.clipboardData?.files??[]].find(x=>x.type.startsWith("image/"))),dragover:g=>g.preventDefault(),drop:g=>{g.preventDefault(),p(g.dataTransfer?.files[0])}}},s("div",{class:Pt("stage")},r),s("div",{class:Pt("controls")},lo("",g=>g.trim()&&void m(g.trim(),!0),"https://\u2026 or data:image/\u2026","url"),s("div",{class:Pt("buttons")},H("Choose file",()=>u.click()),H("Reset crop",()=>{l({x:.5,y:.5,zoom:Qn}),d()}),H("Clear",()=>{e=null,t.classList.remove(Pt("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),a.replaceChildren(),Q.store.avatarUrl="",Q.store.avatarSource=""},"danger")),a,i,u));return t.append(E),Q.store.avatarSource&&m(Q.store.avatarSource,!1),()=>{clearTimeout(n),t.replaceChildren()}}var Vl=`/*
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
`;var Mo="data-bloom-csi-avatar",Ii="data-bloom-csi-sized",Xl="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",ff=32,Q=b({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:t=>zl(t)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),Jl=[];function _l(t){t.removeAttribute(Mo),t.removeAttribute(Ii)}function Zl(t){return(Q.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${t}]`)])}function $l(t=[]){if(!U(t))return;let e=Q.store.displayName.trim()||null,o=!!Q.store.avatarUrl,n=new Set(e?Zl("name"):[]);for(let i of document.querySelectorAll(Xl))n.has(i)||ee(i,null);for(let i of n)ee(i,e);let r=new Set(o?Zl("avatar"):[]);for(let i of document.querySelectorAll(`[${Mo}]`))r.has(i)||_l(i);for(let i of r)i.hasAttribute(Mo)||i.setAttribute(Mo,""),i.toggleAttribute(Ii,!i.closest('[role="menu"]'))}function gf(){let t=Q.store.avatarUrl;return t?`:root{--bloom-csi-url:url("${t.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${Q.store.avatarSize}px}:is(${c.rail}, ${c.oldRail}) [${Ii}]{--bloom-csi-size:${ff}px}`:""}var tc=h({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:Q,styles:()=>`${gf()}
${Vl}`,start(){Jl=[xt(),M($l)]},stop(){for(let t of Jl)t();for(let t of document.querySelectorAll(`[${Mo}]`))_l(t);for(let t of document.querySelectorAll(Xl))ee(t,null)},onSettingsChange(){$l()}});var Ke=L("bloom-greeting-"),ec=30,oc=100;function nc(t){let e=-1,o=s("textarea",{class:`bloom-input ${Ke("input")}`,attrs:{maxlength:String(oc),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=H("Add",i),r=s("div",{class:Ke("list")});function i(){let l=o.value.trim().slice(0,oc);if(!l)return;let d=[...B.store.greetings];e>=0?d[e]=l:d.length<ec&&d.push(l),B.store.greetings=d,e=-1,o.value="",a()}function a(){let{greetings:l}=B.store;n.textContent=e>=0?"Save":"Add",n.disabled=e<0&&l.length>=ec,r.replaceChildren(...l.length?l.map((d,m)=>s("div",{class:Ke("row",m===e?"row-editing":"row-idle")},s("div",{class:Ke("text"),text:d}),j("edit","Edit",()=>{e=m,o.value=d,o.focus(),a()}),j("trash","Delete",()=>{B.store.greetings=l.filter((p,E)=>E!==m),e===m&&(e=-1),a()}))):[s("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),t.append(s("div",{class:Ke("editor")},r,s("div",{class:Ke("form")},o,n))),a();let u=we((l,d)=>l==="GreetingCustomizer"&&d==="greetings"&&a());return()=>{u(),t.replaceChildren()}}var rc=`/*
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
`;var zn="data-bloom-greeting",bf=1e3,yf=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],B=b({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:t=>nc(t)},greetings:{type:"custom",default:yf},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),Wn,ic=[],Pi,Bo=()=>ln()&&!oe(),vf=t=>t.replaceAll(/\s*\n\s*/g," ").trim(),sc=()=>B.store.greetings.filter(t=>typeof t=="string"&&t.trim());function Io(){let t=sc();if(t.length)if(B.store.order==="random"&&t.length>1){let e=B.store.lastRandom;for(;e===B.store.lastRandom;)e=Math.floor(Math.random()*t.length);B.store.lastRandom=e,B.store.index=e}else B.store.index=(B.store.index+1)%t.length}function Af(){return Bo()?$(c.homeHeading):null}function Co(){for(let t of document.querySelectorAll(`[${zn}]`))t.removeAttribute(zn),ee(t,null)}function Lo(){for(let t of document.querySelectorAll("[data-bloom-placeholder]"))t.removeAttribute("data-bloom-placeholder")}function ac(t){let e=pt(),o=vf(t);if(!e||!o||W(e)){Lo();return}e.getAttribute("data-bloom-placeholder")!==o&&e.setAttribute("data-bloom-placeholder",o)}function ko(){let t=sc(),e=es(),o=Bo();if(!t.length||!e&&!o){Co(),Lo();return}if(e){Co(),ac(t[0]??"");return}let n=Af();n?((B.store.index<0||B.store.index>=t.length)&&Io(),n.setAttribute(zn,""),ee(n,t[Math.max(0,B.store.index)%t.length]??"")):Co(),B.store.heroOnlyOutsideProject?Lo():ac(t[Math.max(0,B.store.index)%t.length]??"")}function Oi(){clearInterval(Wn),Wn=void 0,B.store.mode==="interval"&&Bo()&&(Wn=setInterval(()=>{Io(),ko()},B.store.intervalSec*bf))}function wf(t){B.store.mode!=="manual"||!(t.target instanceof Element)||!t.target.closest(`[${zn}]`)||getSelection()?.toString()||(Io(),ko())}function xf(){Bo()&&B.store.mode==="refresh"&&Io(),Oi(),ko()}var lc=h({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:B,styles:rc,start(){Co(),Lo(),Pi=new AbortController,document.addEventListener("click",wf,{signal:Pi.signal}),Bo()&&B.store.mode==="refresh"&&Io(),Oi(),ic=[M(t=>U(t)&&ko()),vt(xf)]},stop(){Pi?.abort();for(let t of ic)t();clearInterval(Wn),Co(),Lo()},onSettingsChange(t){(t==="mode"||t==="intervalSec")&&Oi(),ko()}});var Po=L("bloom-history-"),Ri=10,Sf=3e3;function Hi(t,e){let o="",n=0,r=new Set,i=s("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),a=s("div",{class:Po("list")}),u=s("div",{class:Po("pager")}),l,d=H("Clear all",()=>{if(!l){d.textContent="Click again to clear",l=setTimeout(()=>{l=void 0,d.textContent="Clear all"},Sf);return}clearTimeout(l),l=void 0,d.textContent="Clear all",Oo([])},"danger");function m(){let E=[...ge.store.entries].toReversed(),g=o.trim().toLowerCase(),x=g?E.filter(Z=>Z.toLowerCase().includes(g)):E,z=Math.max(1,Math.ceil(x.length/Ri));n=Math.min(n,z-1);let ht=x.slice(n*Ri,(n+1)*Ri).map(Z=>s("div",{class:Po("row")},s("button",{class:Po("text",r.has(Z)?"text-open":"text-closed"),text:Z,title:r.has(Z)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{r.delete(Z)||r.add(Z),m()}}}),e&&j("edit","Use",()=>e(Z)),j("copy","Copy",()=>void Fo(Z)),j("trash","Delete",()=>Oo(ge.store.entries.filter(sr=>sr!==Z)))));a.replaceChildren(...ht.length?ht:[s("div",{class:"bloom-muted",text:g?"No matching prompts.":"No saved prompts yet."})]),u.replaceChildren(s("span",{class:"bloom-muted",text:`${x.length} ${g?"matching":"saved"} \xB7 page ${n+1} of ${z}`}),H("Previous",()=>{n--,m()}),H("Next",()=>{n++,m()}),d);let[Y,ct]=u.querySelectorAll("button");Y.disabled=n===0,ct.disabled=n>=z-1,d.disabled=!E.length}i.addEventListener("input",()=>{o=i.value,n=0,m()}),t.append(s("div",{class:Po("manager")},i,a,u)),m();let p=we((E,g)=>E==="InputHistory"&&g==="entries"&&m());return()=>{p(),clearTimeout(l),t.replaceChildren()}}var cc=`/*
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
`;var Ot=L("bloom-history-"),Ef=2e3,ge=b({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:t=>Hi(t)},entries:{type:"custom",default:[]}}),D=null,Di={text:"",at:0},Et=null,Jt=null,Ni,Ye=()=>ge.store.entries.filter(t=>typeof t=="string");function Oo(t){ge.store.entries=t.slice(-ge.store.maxEntries)}function Ui(t){let e=t.trim();if(!e)return;let o=Date.now();e===Di.text&&o-Di.at<Ef||(Di={text:e,at:o},Oo([...Ye().filter(n=>n!==e),e]))}function dc(t){t.preventDefault()}function Tf(){let t=s("button",{class:Ot("hud-count"),attrs:{type:"button"},on:{mousedown:dc,click:kf}}),e=s("button",{class:Ot("hud-x"),text:"\xD7",attrs:{type:"button","aria-label":"Exit history"},on:{mousedown:dc,click:Mf}});return s("div",{class:`bloom-root ${Ot("hud")}`,attrs:{"data-bloom":"history-hud",role:"group","aria-live":"polite","aria-label":"Input history"}},t,e)}function uc(t,e){let o=pt();if(!o||Jt)return;Et??=Tf();let n=`${t+1} / ${e}`,r=Et.querySelector(`.${Ot("hud-count")}`);r?.replaceChildren(n),r?.setAttribute("aria-label",`Show input history (${n})`);let i=(o.closest("form")??o).getBoundingClientRect();Et.style.left=`${i.left+i.width/2}px`,Et.style.top=`${i.top}px`,Et.isConnected||document.body.append(Et)}function Ge(){D=null,Et?.remove()}function Mf(){D&&Ct(D.draft),Ge(),pt()?.focus()}function mc(t){let e=Ye();if(!D)return;let o=e[t];D.index=t,D.shown=o,Ct(o),uc(e.length-1-t,e.length)}function Cf(t){let e=Ye();if(!e.length)return!1;if(!D){if(t===1)return!1;D={index:e.length,draft:W(),shown:""}}let o=D.index+t;return o<0?!0:o>=e.length?(Ct(D.draft),Ge(),!0):(mc(o),!0)}function Lf(t){let e=Ye().indexOf(t);Ro(),!(e<0)&&(D??={index:e,draft:W(),shown:""},mc(e),pt()?.focus())}function Ro(){if(!Jt)return;Jt.release(),Jt.controller.abort(),Jt.root.remove(),Jt=null;let t=Ye();D&&t[D.index]===D.shown?uc(t.length-1-D.index,t.length):D=null}function kf(){if(Jt)return;Et?.remove();let t=s("div",{class:Ot("dialog-body")}),e=s("div",{class:`bloom-root ${Ot("backdrop")}`,attrs:{"data-bloom":"history-dialog"},on:{click:n=>n.target===n.currentTarget&&Ro()}},s("div",{class:Ot("dialog"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Input history"}},s("div",{class:Ot("dialog-header")},s("h2",{class:Ot("dialog-title"),text:"Input history"}),j("close","Close",Ro)),t));e.addEventListener("keydown",n=>n.stopPropagation());let o=new AbortController;document.addEventListener("keydown",n=>{n.key==="Escape"&&(n.preventDefault(),n.stopPropagation(),Ro())},{capture:!0,signal:o.signal}),wt(e),Jt={root:e,release:Hi(t,Lf),controller:o},t.querySelector("input")?.focus()}function pc(t){return ro(t)?t:t instanceof HTMLElement?t.closest(c.composerInput):null}function Bf(){if(pt()?.closest("[data-chatgpt-composer], [data-composer-input], form")?.querySelector('[aria-expanded="true"]'))return!0;for(let e of document.querySelectorAll('[role="listbox"], [role="menu"], [data-radix-popper-content-wrapper], [cmdk-root], [cmdk-list]')){if(!(e instanceof HTMLElement)||e.closest("[data-bloom]"))continue;let o=getComputedStyle(e);if(!(o.display==="none"||o.visibility==="hidden"))return!0}return!1}function If(t){if(t.isComposing||t.key==="Process"||t.keyCode===229)return;let e=pc(t.target);if(!e)return;if(t.key==="Enter"&&!t.shiftKey){Ui(W(e)),Ge();return}if(t.key==="Escape"&&D){Ct(D.draft),Ge(),t.preventDefault(),t.stopPropagation();return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.ctrlKey||t.metaKey||t.shiftKey||Bf())return;let o=Za(e),n=t.key==="ArrowUp";!t.altKey&&!(n?o.first:o.last)||!n&&!D||Cf(n?-1:1)&&(t.preventDefault(),t.stopPropagation())}function Pf(t){D&&pc(t.target)&&W()!==D.shown.trim()&&Ge()}function Of(t){t.target instanceof Element&&t.target.closest(c.sendButton)&&Ui(W())}var fc=h({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before. Click the counter to browse history.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:ge,styles:cc,start(){for(let e of document.querySelectorAll('[data-bloom="history-hud"], [data-bloom="history-dialog"]'))e.remove();Et=null,Ni=new AbortController;let{signal:t}=Ni;document.addEventListener("keydown",If,{capture:!0,signal:t}),document.addEventListener("input",Pf,{capture:!0,signal:t}),document.addEventListener("click",Of,{capture:!0,signal:t}),document.addEventListener("submit",()=>Ui(W()),{capture:!0,signal:t})},stop(){Ni?.abort(),Ro(),Ge();for(let t of document.querySelectorAll('[data-bloom="history-hud"]'))t.remove();Et=null},onSettingsChange(t){t==="maxEntries"&&Oo(Ye())}});var gc=`/*
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
`;var Hf=1500,Df=5e3,Nf=2e3,wc=[{label:"UTC",value:"UTC"},{label:"\u7F8E\u56FD\u4E1C\u90E8",value:"America/New_York"},{label:"\u7F8E\u56FD\u4E2D\u90E8",value:"America/Chicago"},{label:"\u7F8E\u56FD\u5C71\u5730",value:"America/Denver"},{label:"\u7F8E\u56FD\u897F\u90E8",value:"America/Los_Angeles"},{label:"\u65E5\u672C",value:"Asia/Tokyo"},{label:"\u53F0\u6E7E",value:"Asia/Taipei"}],je=b({sourceTimeZone:{type:"select",description:"Zone the stored clock was written in. Leave UTC for ChatGPT create_time. Pick the same zone as the Shit GPT plugin only when that clock is a wall time in that zone; it is then shown in the system timezone.",options:wc,default:"UTC"},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),Jn=new Map,Fi=new Set,xc=0,Zn,hc=[];function Sc(t,e){Jn.get(t)!==e&&(Jn.set(t,e),clearTimeout(Zn),Zn=setTimeout(qc,Nf))}function qc(){let t={...je.store.stamps,...Object.fromEntries(Jn)};je.store.stamps=Object.fromEntries(Object.entries(t).toSorted((e,o)=>o[1]-e[1]).slice(0,Hf))}function Uf(t){let e=Lt(v())?.times;for(let o=t.length-1;o>=0;o--){let n=Jn.get(t[o])??e?.get(t[o])??je.store.stamps[t[o]];if(n)return n}return null}var Ff=()=>_().generating||Date.now()-xc<Df;function Ec(){return Intl.DateTimeFormat().resolvedOptions().timeZone}function Tc(){let t=je.store.sourceTimeZone;if(!t||t==="UTC")return"UTC";try{return Intl.DateTimeFormat(void 0,{timeZone:t}),t}catch{return"UTC"}}function Mc(t,e){let o={};for(let n of new Intl.DateTimeFormat("en-US",{timeZone:e,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(t)))o[n.type]=n.value;return{y:+o.year,m:+o.month,d:+o.day,h:+o.hour%24,mi:+o.minute,s:+o.second}}function Cc(t){return Date.UTC(t.y,t.m-1,t.d,t.h,t.mi,t.s)}function bc(t,e){let o=t;for(let n=0;n<4;n++){let r=t-Cc(Mc(o,e));if(r===0)return o;o+=r}return o}function Kf(t,e){if(e==="UTC")return t;let o=(t%1e3+1e3)%1e3,n=t-o,r=new Date(n),i=Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),r.getUTCHours(),r.getUTCMinutes(),r.getUTCSeconds()),a=bc(i,e),u=3600*1e3,l=Number.POSITIVE_INFINITY;for(let d of[-u,0,u]){let m=a+d;Cc(Mc(m,e))===i&&m<l&&(l=m)}return l!==Number.POSITIVE_INFINITY?l+o:bc(i+u,e)+o}function Gf(t,e){let o=Tc();return e||o==="UTC"?t:Kf(t,o)}function yc(t,e){return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}function Yf(t){let e=Ec(),o=Date.now(),n={hour:"2-digit",minute:"2-digit",timeZone:e};if(yc(t,e)===yc(o,e))return new Intl.DateTimeFormat(void 0,n).format(t);let r=a=>new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric"}).format(a),i=r(t)===r(o)?{}:{year:"numeric"};return new Intl.DateTimeFormat(void 0,{...i,month:"short",day:"numeric",...n}).format(t)}function jf(t,e){let o=new Date(e).toLocaleString(void 0,{timeZone:Ec()}),n=Tc();if(n==="UTC"||e===t)return o;let r=new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"UTC"}).format(t);return`${wc.find(a=>a.value===n)?.label??n} ${r} \u2192 ${o}`}function Lc(t){let e=Qt(t)??t.getAttribute("data-message-author-role")??t.closest(c.turn)?.getAttribute("data-turn")??t.querySelector(c.authorRole)?.getAttribute("data-message-author-role");if(An(e))return e;let o=go(t).at(-1);return Lt(v())?.chain.find(n=>n.id===o)?.role??null}var vc='[class*="group/activity-header"]';function Qf(t){let e=t.parentElement;if(!e)return null;let o=t.closest(c.turn);return o&&e!==o&&!o.contains(e)?null:e}function Wf(t){let e=t;for(let o=0;o<8&&e;o++){let n=Qf(e);if(!n)return null;let r=[...n.children],i=r.indexOf(e);for(let a=i-1;a>=0;a--){let u=r[a],l=u.matches(vc)?u:u.querySelector(vc);if(l)return l;if(u.matches(c.searchUnit)||u.querySelector(c.searchUnit))return null}if(n===e.closest(c.turn))return null;e=n}return null}function zf(t){let e=t.parentElement;for(let o=0;o<4&&e;o++){if(e.classList.contains("flex-col"))return e;e=e.parentElement}return t.parentElement??t}function kc(t,e){if(e==="assistant"){let o=Wf(t);if(o)return zf(o)}return t}function Vf(t,e){let o=Le();for(let n=o.length-1;n>=0;n--){let r=o[n];if(!(r!==t&&(Lc(r)!=="assistant"||kc(r,"assistant")!==e)))return r===t}return!0}function Ac(t){return t.querySelector(':scope > time[data-bloom="timestamp"]')}function Jf(t){let e=go(t);if(!e.length||!At(t)||t.querySelector("time:not([data-bloom])"))return;let o=Lc(t),n=kc(t,o);if(n!==t&&!Vf(t,n)){Ac(t)?.remove();return}let r=Uf(e),i=!1;if(!r&&Ff()){r=Date.now();let m=e.at(-1);Fi.add(m),Sc(m,r),i=!0}else r&&Fi.has(e.at(-1))&&(i=!0);let a=n.querySelector('time[data-bloom="timestamp"]')??Ac(t);if(!r||je.store.hideOwnMessages&&o==="user"){a?.remove();return}let u=Gf(r,i),l=Yf(u);if(a?.textContent===l&&a.parentElement===n&&a===n.firstElementChild)return;let d=s("time",{class:`bloom-timestamp bloom-timestamp-${o??"assistant"}`,text:l,title:jf(r,u),attrs:{"data-bloom":"timestamp",datetime:new Date(u).toISOString()}});a&&a.replaceWith(d),(d.parentElement!==n||d!==n.firstElementChild)&&n.prepend(d)}var Vn=Dt(()=>{for(let t of Le())Jf(t)}),Bc=h({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:je,styles:gc,start(){hc=[M(t=>U(t)&&Vn()),St.on("conversation",Vn),St.on("message-time",({messageId:t,time:e})=>{Fi.delete(t),Sc(t,e),Vn()}),O.on("fall",()=>{xc=Date.now()})]},stop(){for(let t of hc)t();Zn&&(clearTimeout(Zn),qc());for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove()},onSettingsChange(t){if(t!=="stamps"){for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove();Vn()}}});var Zf=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])','[data-chatgpt-composer] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-composer-input] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-codex-composer-root] button[aria-label^="Dictat" i], [data-composer-placement] button[aria-label^="Dictat" i], [class*="ComposerLayout"] button[aria-label^="Dictat" i]'],$f=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],Ic=b({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),Pc=h({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:Ic,styles:()=>Ht([...Zf,...Ic.store.hideDictationSettings?$f:[]])});var he="data-bloom-share",Xf=/^\/g\/g-p-/,_f=/^(?:share|分享)$/i,tg=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],eg=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${he}="project"]`],Ki=b({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),$n,Gi=!1;function og(t){if(!U(t))return;let e=Xf.test(location.pathname)&&!v();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${he}]`))!e||!_f.test(y(o.textContent??""))?o.removeAttribute(he):o.hasAttribute(he)||o.setAttribute(he,"project")}var Oc=h({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:Ki,styles:()=>Ht([...Ki.store.hideShareChat?tg:[],...Ki.store.hideShareProject?eg:[]]),start(){Gi=!0,Kt().then(()=>{Gi&&!$n&&($n=M(og))})},stop(){Gi=!1,$n?.(),$n=void 0;for(let t of document.querySelectorAll(`[${he}]`))t.removeAttribute(he)}});var Rc='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',ng='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',rg="[data-bloom-profile-plan]",Hc="visibility:hidden!important;user-select:none!important",Nc=b({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function ig(){let{hideUsername:t,hideEmail:e,enlargePlan:o,alignPlanWithAvatar:n}=Nc.store,r=[];return t&&r.push(n?`:is(${Rc}){display:none!important}`:`:is(${Rc}){${Hc}}`),e&&r.push(`:is(${ng}){${Hc}}`),t&&o&&r.push(`${rg}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var Dc,Uc=h({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Nc,styles:ig,start(){Dc=xt()},stop(){Dc?.()}});var ag=new Set(["chatgpt","new chat","\u65B0\u804A\u5929","codex"]);function sg(){let t=y(document.title.replace(/\s*[|–-]\s*(?:ChatGPT|Codex)$/i,""));return t&&!ag.has(t.toLowerCase())?t:null}function Ho(t){return t?mo(t)??(t===v()?sg():null):null}var Fc=`/*
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
`;var et=L("bloom-recent-"),Tt="home",cg=50,Kc=140,dg=new Set(["Backquote"]),ug=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),w=b({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(t=>({label:t,value:t})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),Zt=null,lt=[],gt=0,Yi,Gc=[],_n=()=>oe()?null:v()??(ln()?Tt:null);function Yc(t,e){return Object.fromEntries(Object.entries(t).filter(([o])=>e.has(o)))}function Qc(t){let e=Ho(t);e&&w.store.titles[t]!==e&&(w.store.titles={...w.store.titles,[t]:e});let o=Os(location.href);o&&t===v()&&w.store.projects[t]!==o&&(w.store.projects={...w.store.projects,[t]:o})}function jc(t){if(!t)return;let e=[t,...w.store.visits.filter(n=>n!==t)].slice(0,cg),o=new Set(e);w.store.visits=e,Object.keys(w.store.previews).some(n=>!o.has(n))&&(w.store.previews=Yc(w.store.previews,o)),Object.keys(w.store.titles).some(n=>!o.has(n))&&(w.store.titles=Yc(w.store.titles,o)),t!==Tt&&Qc(t)}function mg(t){if(!w.store.visits.includes(t))return;let{[t]:e,...o}=w.store.titles,{[t]:n,...r}=w.store.previews,{[t]:i,...a}=w.store.projects;w.store.visits=w.store.visits.filter(u=>u!==t),w.store.titles=o,w.store.previews=r,w.store.projects=a}function Xn(t){if(!t||!w.store.visits.includes(t))return;let e={},o=Lt(t)?.chain??[];for(let r of o)e[r.role]=bt(xn(r),Kc);if(t===v())for(let r of Wt()){let i=ke(r);i&&(e[r.role]=bt(i,Kc))}let n=w.store.previews[t];!e.user&&!e.assistant||n?.user===e.user&&n?.assistant===e.assistant||(w.store.previews={...w.store.previews,[t]:e})}function pg(){let t=Number(w.store.maxRecent);return w.store.visits.filter(e=>e!==Tt||w.store.includeHome).slice(0,t)}function Wc(t){if(We(),t===_n())return;let e=t===Tt?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"], [data-sidebar-destination="builtin:home"]'):uo(t)[0];e?e.click():location.assign(t===Tt?"/":`/c/${t}`)}function fg(t){let e=t===Tt?null:w.store.previews[t],o=e&&["user","assistant"].filter(n=>e[n]).map(n=>s("span",{class:et("preview"),attrs:{"data-role":n},text:e[n]}));return s("span",{class:et("thumb"),attrs:{"aria-hidden":"true"}},o?.length?s("span",{class:et("page")},...o):s("span",{class:et("fallback")},k(t===Tt?"plus":"bloom")))}function gg(t,e){let o=t===Tt?"New chat":w.store.titles[t]??Ho(t)??"Untitled chat",n=t===Tt?null:w.store.projects[t];return s("button",{class:et("item"),attrs:{type:"button",role:"option","aria-selected":String(e===gt),"aria-label":n?`${o}, ${n}`:o},on:{click:()=>Wc(t),pointerenter:()=>e!==gt&&Qe(e)}},fg(t),s("span",{class:et("meta")},s("span",{class:`${et("title")} bloom-truncate`,text:o}),n&&s("span",{class:et("project")},k("folder"),s("span",{class:"bloom-truncate",text:n}))))}function zc(){lt.length?Wc(lt[gt]):We()}function Qe(t){lt.length&&(gt=(t+lt.length)%lt.length,Zt?.querySelectorAll(`.${et("item")}`).forEach((e,o)=>e.setAttribute("aria-selected",String(o===gt))))}function hg(){Xn(v());let t=_n();lt=pg(),t&&(lt=[t,...lt.filter(o=>o!==t)].slice(0,Number(w.store.maxRecent))),gt=lt.length>1?1:0;let e=lt.length?s("div",{class:et("list"),attrs:{role:"listbox","aria-label":"Recent chats"}},...lt.map(gg)):s("div",{class:et("empty"),text:"Open a few chats, then hold Ctrl+` to switch."});e.style.setProperty("--bloom-recent-count",String(lt.length)),Zt=s("div",{class:`bloom-root ${et("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:o=>o.target===o.currentTarget&&We()}},s("div",{class:et("panel")},e)),wt(Zt)}function We(){Zt?.remove(),Zt=null}var bg=t=>dg.has(t.code)||ug.has(t.key);function yg(t){if(t.ctrlKey&&!t.altKey&&!t.metaKey&&bg(t)){t.preventDefault(),t.stopPropagation(),Zt?Qe(gt+(t.shiftKey?-1:1)):hg();return}if(!Zt)return;let o={Escape:We,Enter:zc,ArrowRight:()=>Qe(gt+1),ArrowDown:()=>Qe(gt+1),ArrowLeft:()=>Qe(gt-1),ArrowUp:()=>Qe(gt-1)}[t.key];o&&(t.preventDefault(),t.stopPropagation(),o())}function vg(t){Zt&&t.key==="Control"&&zc()}var Vc=h({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:w,styles:Fc,start(){Yi=new AbortController;let{signal:t}=Yi;addEventListener("keydown",yg,{capture:!0,signal:t}),addEventListener("keyup",vg,{capture:!0,signal:t}),addEventListener("blur",We,{signal:t}),document.addEventListener("visibilitychange",()=>document.hidden&&Xn(v()),{signal:t}),Gc=[vt(({prevId:i})=>{Xn(i),jc(_n())}),St.on("conversation",({id:i})=>{w.store.visits.includes(i)&&Qc(i),Xn(i)}),St.on("conversation-missing",({id:i})=>mg(i))];let{visits:e,titles:o,previews:n}=w.store,r=e.filter(i=>i!==Tt&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(w.store.visits=e.filter(i=>!r.includes(i))),jc(_n())},stop(){Yi?.abort();for(let t of Gc)t();We()}});var ji="data:audio/mpeg;base64,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";var Jc=new S("ResponseNotification"),Ag=.5,Zc="BloomNoticeClaim",wg=3e4,Do=b({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:t=>(t.append(H("Preview",ed)),()=>t.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),$c=null,Qi=new Map,Xc=[],Wi,xg=t=>Uint8Array.from(atob(t.slice(t.indexOf(",")+1)),e=>e.charCodeAt(0)).buffer;function Sg(t,e){let o=Qi.get(e);return o||(o=(e.startsWith("data:")?Promise.resolve(xg(e)):Go(e)).then(n=>t.decodeAudioData(n)),o.catch(()=>Qi.delete(e)),Qi.set(e,o)),o}async function _c(t){$c??=new AudioContext;let e=$c;e.state==="suspended"&&e.resume();let o=e.createBufferSource(),n=e.createGain();o.buffer=await Sg(e,t),n.gain.value=Ag,o.connect(n).connect(e.destination),o.start()}function ed(){let t=Do.store.soundUrl.trim();_c(t||ji).catch(e=>{Jc.warn("Sound failed",e),t&&_c(ji).catch(o=>Jc.warn("Default chime failed",o))})}function qg(t){let e=`${t??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:e,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:e,silent:!0});o.onclick=()=>{focus(),o.close()}}function Eg(t){let e=Ko(Vo(Zc)??"");return t&&C(e)&&e.id===t&&Date.now()-Number(e.at)<wg?!1:(Jo(Zc,{id:t,at:Date.now()}),!0)}function td(t){Do.store.onlyWhenHidden&&!document.hidden||Eg(t)&&(Do.store.sound&&ed(),Do.store.browserNotification&&qg(Ho(t)))}function Tg(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(Wi=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:Wi.signal}))}var od=h({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply, including chats you left while they were answering.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:Do,start(){Tg(),Xc=[O.on("fall",({conversationId:t,outcome:e})=>e==="done"&&td(t)),O.on("background",({conversationId:t})=>td(t))]},stop(){for(let t of Xc)t();Wi?.abort()}});var Mg=`:is(${c.sidebarScroll}, :has(> ${c.sidebarScroll})) + :has(${c.menuButton})`,Cg=`${c.rail} > :has(${c.menuButton})`,Vi=`:is(${Mg}, ${Cg}, ${c.oldProfile}):not(:hover)`,zi="[data-bloom-profile-avatar]",Lg=`:is(${Vi}, ${Vi} :has(${zi})) > :not(${zi}, :has(${zi}))`,rd=b({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function kg(){let{opacity:t,fadeAvatar:e}=rd.store;return t>=100?"":`${e?Vi:Lg}{opacity:${t/100}!important}`}var nd,id=h({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:rd,styles:kg,start(){nd=xt()},stop(){nd?.()}});var ad=`/*
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
`;var N=L("bloom-star-chats"),Ig=80,Pg=60,Og=1200,Rg=120,No=b({replaceReadAloud:{type:"boolean",description:"Put the star where the reply's Read aloud button is, and hide that button.",default:!0},messages:{type:"custom",default:[]}}),Hg=`:is(${c.turnActions}) ${c.readAloud}`,Ji,Zi=!1,$t=!1,ye=!1,tr=0,J=null,er="",I=null,$i,Xt;function _i(){let t=No.store.messages;return Array.isArray(t)?t.filter(e=>C(e)&&typeof e.conversationId=="string"&&typeof e.messageId=="string"&&(e.role==="user"||e.role==="assistant")&&typeof e.snippet=="string"&&typeof e.starredAt=="number"):[]}function ta(){let t=v();return t?_i().filter(e=>e.conversationId===t):[]}function Dg(t,e){return _i().some(o=>o.conversationId===t&&o.messageId===e)}function sd(t){let e=_i(),o=e.some(n=>n.conversationId===t.conversationId&&n.messageId===t.messageId);No.store.messages=o?e.filter(n=>!(n.conversationId===t.conversationId&&n.messageId===t.messageId)):[{...t,starredAt:Date.now()},...e].slice(0,Ig)}function Xi(t){return t.messageIds[0]||t.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||t.el.getAttribute("data-turn-key")||""}function Ng(t){return bt(ke(t)||y(t.el.textContent??""),Pg)}function Ug(t){let e=t.closest(c.turn);if(!e)return null;let o=Wt().filter(n=>e.contains(n.el));return o.find(n=>n.el.contains(t)||n.el===e)??o.findLast(n=>n.el.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING)??null}function Fg(){let t=[...document.querySelectorAll(c.turnActions)].filter(e=>!e.closest(`[data-bloom], [role="dialog"], [inert], pre, ${c.sidebars}`));return t.filter(e=>!t.some(o=>o!==e&&o.contains(e)))}function Kg(t,e){let o=No.store.replaceReadAloud?e.querySelector(c.readAloud):null;if(o&&!o.closest("[data-bloom]")){t.nextElementSibling!==o&&o.before(t);return}let n=Gg(e);(t.parentElement!==n||n.lastElementChild!==t)&&n.append(t)}function Gg(t){let e=[...t.querySelectorAll("button")].filter(n=>n.dataset.bloom!=="message-star"&&!n.closest("[data-bloom]"));return e.length?[...t.children].find(n=>n instanceof HTMLElement&&n!==e[0]&&e.every(r=>n.contains(r)))??t:t}function Yg(){return[...document.querySelectorAll(c.headerMore)].filter(e=>{if(e.dataset.bloom==="message-star"||e.closest("[data-bloom], [role='dialog'], [inert]")||e.closest(c.sidebars))return!1;let o=e.getBoundingClientRect();return o.width===0&&o.height===0?!!e.closest("header, #page-header"):o.top>=0&&o.top<96&&o.left>window.innerWidth*.5}).toSorted((e,o)=>o.getBoundingClientRect().left-e.getBoundingClientRect().left||(e.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1))[0]??null}function ld(t,e,o){return s("button",{class:e,attrs:{type:"button","aria-label":t},on:{pointerdown:n=>n.stopPropagation(),mousedown:n=>n.stopPropagation(),click:n=>{n.preventDefault(),n.stopPropagation(),o(n)}}},k("star"))}function jg(t,e){t.setAttribute("aria-pressed",String(e)),t.setAttribute("aria-label",e?"Unstar":"Star")}function or(){return $t||ye}function ze(){tr&&window.clearTimeout(tr),tr=0}function Ve(){$t=!1,ye=!1,ze(),Xt?.enter(),J?.remove(),J=null,er="",I?.classList.remove(N("-open")),I?.setAttribute("aria-expanded","false")}function nr(t){return t instanceof Node&&!!(I?.contains(t)||J?.contains(t))}function Qg(t){t.classList.add(N("-flash")),window.setTimeout(()=>t.classList.remove(N("-flash")),Og)}function Wg(t){let e=Wt().find(n=>Xi(n)===t),o=e?.el.closest(c.turn)??e?.el;o&&(o.scrollIntoView({block:"start"}),Qg(o))}function zg(){let t=v(),e=new Set,o=[...document.querySelectorAll('[data-bloom="message-star"][data-place="action"]')];if(!t||oe()){for(let n of o)n.remove();return}for(let n of Fg()){if(!At(n))continue;let r=Ug(n),i=r?Xi(r):"";if(!r||!i)continue;let a=n.querySelector('[data-place="action"]');(!a||a.dataset.id!==i)&&(a?.remove(),a=ld("Star",N("-star"),()=>{let u=v(),l=Wt().find(d=>Xi(d)===i);!u||!l||sd({conversationId:u,messageId:i,role:l.role,snippet:Ng(l)})}),a.dataset.bloom="message-star",a.dataset.place="action",a.dataset.id=i),jg(a,Dg(t,i)),Kg(a,n),e.add(a)}for(let n of o)e.has(n)||n.remove()}function Vg(){if(!J||!I)return;let t=I.getBoundingClientRect(),e=J.offsetWidth||288,o=J.offsetHeight||120,n=t.bottom+6;n+o>window.innerHeight-8&&(n=Math.max(8,t.top-o-6));let r=Math.max(8,Math.min(t.right-e,window.innerWidth-e-8));J.dataset.place=n>=t.bottom?"below":"above",J.style.left=`${Math.round(r)}px`,J.style.top=`${Math.round(n)}px`}function Jg(){if(!or()||!I){J?.remove(),J=null,er="",I?.classList.remove(N("-open")),I?.setAttribute("aria-expanded","false");return}let t=ta(),e=t.map(o=>`${o.messageId}	${o.snippet}`).join(`
`);if(!J||er!==e){J?.remove();let o=t.map(n=>s("div",{class:N("-row")},s("button",{class:N("-jump"),attrs:{type:"button"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),Ve(),Wg(n.messageId)}}},s("span",{class:N("-role"),text:n.role==="user"?"You":"ChatGPT"}),s("span",{class:N("-snip"),text:n.snippet||"Message"})),ld("Unstar",N("-unstar"),()=>sd(n))));J=s("div",{class:`bloom-root ${N("-panel")}`,attrs:{"data-bloom":"star-list"},on:{pointerenter:()=>{ze(),Xt?.enter(),ye=!0},pointerleave:n=>{nr(n.relatedTarget)||$t||Xt?.leave(n)}}},s("div",{class:N("-bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:N("-head"),text:"Starred"}),s("div",{class:N("-body")},...o.length?o:[s("div",{class:N("-empty"),text:"No starred messages in this chat"})])),document.body.append(J),er=e}Vg(),I.classList.add(N("-open")),I.setAttribute("aria-expanded","true")}function Zg(){for(let r of document.querySelectorAll('[data-bloom="starred"]'))r.remove();let t=Yg(),e=t?.parentElement??null,o=v();if(!t||!e||e.closest(c.sidebars)||!o||oe()||!At(e)){I?.remove(),I=null,Ve();return}I||(I=s("button",{class:N("-toggle"),attrs:{type:"button","data-bloom":"message-star","data-place":"header","aria-label":"Starred messages","aria-expanded":"false"},on:{pointerdown:r=>r.stopPropagation(),pointerenter:()=>{ze(),Xt?.enter(),tr=window.setTimeout(()=>{ye=!0,be()},Rg)},pointerleave:r=>{nr(r.relatedTarget)||(ze(),or()&&Xt?.leave(r))},click:r=>{r.preventDefault(),r.stopPropagation(),$t=!$t,ye=$t,ze(),$t||Ve(),be()}}},k("star"))),(I.parentElement!==e||I.nextElementSibling!==t)&&t.before(I);let n=t.getBoundingClientRect();n.width>0&&(I.style.width=`${n.width}px`,I.style.height=`${n.height}px`),I.classList.toggle(N("-here"),ta().length>0),Jg()}function $g(){let t=new Set(ta().map(e=>e.messageId));for(let e of document.querySelectorAll('[data-bloom="navigator"] .bloom-nav-tick, [data-bloom="navigator"] .bloom-nav-row'))e.classList.toggle(N("-mark"),!!e.dataset.messageId&&t.has(e.dataset.messageId))}function be(){if(!Zi){Zi=!0;try{for(let t of document.querySelectorAll('[data-bloom="starred"], [data-bloom="chat-star"]'))t.remove();zg(),Zg(),$g()}finally{Zi=!1}}}function Xg(){Ve(),I?.remove(),I=null;for(let t of document.querySelectorAll('[data-bloom="message-star"], [data-bloom="star-list"], [data-bloom="starred"], [data-bloom="chat-star"]'))t.remove();for(let t of document.querySelectorAll(`.${N("-mark")}`))t.classList.remove(N("-mark"))}var cd=h({name:"StarChats",description:"Star a message from its toolbar. The star left of the top-right menu opens this chat's list.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:No,styles:()=>`${ad}${No.store.replaceReadAloud?Ht([Hg]):""}`,onSettingsChange(t){(t==="messages"||t==="replaceReadAloud")&&be()},start(){for(let o of document.querySelectorAll('[data-bloom="star-list"]'))o.remove();Xt=Sn({over:nr,trigger:()=>I,panel:()=>J,setHeld(o){if(o){ye=!0,be();return}$t||(ye=!1,be())}}),Ji=M(o=>U(o)&&be());let t=o=>{nr(o.target)||or()&&Ve()};document.addEventListener("pointerdown",t,!0);let e=o=>{o.key!=="Escape"||!or()||(o.preventDefault(),Ve())};document.addEventListener("keydown",e,!0),$i=()=>{document.removeEventListener("pointerdown",t,!0),document.removeEventListener("keydown",e,!0)},be()},stop(){Ji?.(),Ji=void 0,$i?.(),$i=void 0,ze(),Xt?.dispose(),Xt=void 0,Xg()}});var dd="filter:blur(6px)!important;transition:filter 0.2s ease",Kx=`:is(${c.sidebars})`,ve="data-bloom-streamer-open",_g="[data-app-action-sidebar-thread-row], [data-app-action-sidebar-project-row], .bloom-recent-item",ud=":not([data-app-action-sidebar-thread-row] *, [data-app-action-sidebar-project-row] *)";function th(){return{conversations:{selectors:["[data-app-action-sidebar-thread-title]"],hover:!0,row:"[data-app-action-sidebar-thread-row]"},projects:{selectors:["[data-app-action-sidebar-project-label]"],hover:!0,row:"[data-app-action-sidebar-project-row]"},accountAvatar:{selectors:["[data-bloom-profile] img","[data-bloom-menu] img"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:[`[data-thread-title]${ud}`,`[data-thread-title-trigger]${ud}`],hover:!1}}}var md=b({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function eh(t,e){let o=[`:is(${t}):hover`,`.bloom-recent-item:hover :is(${t})`,`:is(${t})[${ve}]`];return e&&o.push(`${e}:hover`,`${e}:hover :is(${t})`,`${e}:is(${t}):hover`,`${e}[${ve}]`,`${e}[${ve}] :is(${t})`),o.join(",")}function oh(){let t=th();return Object.entries(t).filter(([e])=>md.store[e]).map(([,e])=>{let o=e.selectors.join(",");if(!e.hover)return`:is(${o}){${dd}}`;let n="row"in e?e.row:void 0;return`:is(${o}){${dd}}${eh(o,n)}{filter:none!important}`}).join(`
`)}function nh(t,e){for(let o of document.elementsFromPoint(t,e))if(o instanceof Element){let n=o.closest(_g);if(n)return n}return null}function na(t){for(let e of document.querySelectorAll(`[${ve}]`))e!==t&&e.removeAttribute(ve);t&&!t.hasAttribute(ve)&&t.setAttribute(ve,"")}var Je,rh=Dt(()=>{Je&&na(nh(Je.clientX,Je.clientY))});function ea(t){Je=t,rh()}function ih(t){t.relatedTarget instanceof Node&&document.documentElement.contains(t.relatedTarget)||(Je=void 0,na(null))}var oa,rr,pd=h({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:md,styles:oh,start(){oa=xt(),rr=new AbortController;let t={capture:!0,signal:rr.signal,passive:!0};document.addEventListener("pointerover",ea,t),document.addEventListener("pointermove",ea,t),document.addEventListener("pointerout",ea,t),window.addEventListener("pointerleave",ih,t)},stop(){rr?.abort(),rr=void 0,Je=void 0,na(null),oa?.(),oa=void 0}});var _t=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)','[data-turn-key] [data-message-author-role="user"] blockquote:not(.twitter-tweet)','[class~="group/user-message"] blockquote:not(.twitter-tweet)'].join(","),ra=b({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function ah(){let t=[`${_t}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${_t}>*{margin-block:0!important}`];return ra.store.italic||t.push(`${_t}{font-style:inherit!important}`),ra.store.quotes||(t.push(`${_t}{quotes:none!important}`),t.push(`${_t}::before,${_t}::after,${_t} p::before,${_t} p::after{content:none!important}`)),t.join(`
`)}var fd=h({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:ra,styles:ah});var sh=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],lh=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",ch='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',gd=b({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function dh(){let t=`${gd.store.width}rem`;return`:root,[data-app-action-timeline-scroll],[data-chatgpt-composer],[data-composer-input]{--thread-content-max-width:${t}!important;--composer-adjacent-max-width:${t}!important}`}var hd=h({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:gd,styles:dh});var uh=[Qs,hs,vl,Cl,Bl,Ol,Hl,jl,tc,lc,fc,Bc,Pc,Oc,Uc,Vc,od,id,cd,pd,fd,hd],ia=uh;var mh=new S("Bloom"),bd="2.0.104";var aa=0,ir,Uo="__bloomOnShortcut";function ar(t){if(t.isComposing||!t.shiftKey||!(t.metaKey||t.ctrlKey)||t.key!=="b"&&t.key!=="B")return;t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation();let e=Ms();Yt();for(let o of document.querySelectorAll("[data-bloom='settings']"))o.remove();e||Ce()}function ph(){let t=dt;t[Uo]&&document.removeEventListener("keydown",t[Uo],!0),t[Uo]=ar,document.addEventListener("keydown",ar,!0)}function fh(){aa++,document.removeEventListener("keydown",ar,!0);let t=dt;t[Uo]===ar&&delete t[Uo],ir?.(),ir=void 0,Ga(),_e(),Qo()}async function sa(){let t=++aa,e=()=>t===aa;_e(),Qo();for(let o of ia)o.updatedAt=is[o.name];La(ia),Ea(),Ba(),Yo("base",ja),ns(),ph(),on("Init"),qr().then(()=>{e()&&(ha(),on("DOMContentLoaded"))}),await Er(),e()&&(on("HostReady"),ir?.(),ir=ks(),Ka(),mh.info(`Bloom++ ${bd} app host ready`))}var gh=new S("Boot");window===window.top&&(ya(dt.Bloom),va(la),sa().catch(t=>gh.error("Startup failed",t)));})();
