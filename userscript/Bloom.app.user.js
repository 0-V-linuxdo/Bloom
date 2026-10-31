// ==UserScript==
// @name         Bloom++ (ChatGPT app)
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.102
// @description  Bloom++ host for the official ChatGPT macOS app. Injected over loopback CDP; not a web userscript.
// @author       0-V-linuxdo & Bloom contributors
// @homepageURL  https://github.com/0-V-linuxdo/Bloom
// @supportURL   https://github.com/0-V-linuxdo/Bloom/issues
// @match        app://*/*
// @run-at       document-start
// @grant        none
// @license      GPL-3.0-or-later
// ==/UserScript==

/* Bloom++ v2.0.102 ChatGPT app host. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var fd=Object.defineProperty;var gd=(t,e)=>{for(var o in e)fd(t,o,{get:e[o],enumerable:!0})};var x=class{constructor(e){this.tag=e}log(e,o){console[e](`[Bloom++] [${this.tag}]`,...o)}debug(...e){this.log("debug",e)}info(...e){this.log("info",e)}warn(...e){this.log("warn",e)}error(...e){this.log("error",e)}};var ot=(t,e,o)=>Math.min(o,Math.max(e,t)),C=t=>typeof t=="object"&&t!==null&&!Array.isArray(t),Je=t=>`${t}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,gt=(t,e)=>t.length>e?`${t.slice(0,e-1)}\u2026`:t,y=t=>t.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function ra(t,e){return`${t} ${e}${t===1?"":"s"}`}async function No(t){if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}await navigator.clipboard.writeText(t)}function Uo(t){try{return JSON.parse(t)}catch{return}}var ct=typeof unsafeWindow>"u"?window:unsafeWindow,hd=200,bd=300;function Fo(t){return new Promise((e,o)=>GM_xmlhttpRequest({url:t,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=hd&&n<bd?e(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var yd=new x("Styles"),Ot=new Map,Ze=new Set,_t=new Map,rr=!0,ia=t=>t.replaceAll(/[^A-Za-z0-9_-]/g,"_"),vd=t=>`:where(:root){--bloom-sheet-${ia(t)}:1}`,Ad=(t,e)=>`${vd(t)}${e}`,aa=t=>`bloom-style-${t}`;function sa(t){try{return[...t.cssRules].map(e=>e.cssText).join(`
`)}catch{return""}}function wd(t,e){let o=sa(t);return o?o.includes(`--bloom-sheet-${ia(e)}`)?!0:e==="plugin-StreamerMode"?o.includes("blur(6px)")&&(o.includes("data-app-action-sidebar-thread-title")||o.includes("data-bloom-streamer-open")):e==="plugin-WiderChat"?o.includes("--composer-adjacent-max-width")&&o.includes("--thread-content-max-width"):e==="plugin-ComposerOpacity"?o.includes("--composer-layout-surface-backdrop-filter")||o.includes("--composer-layout-surface-background")&&o.includes("color-mix"):!1:!1}function la(t){let e=sa(t);return e?!!(e.includes("--bloom-")||e.includes(".bloom-")||e.includes("[data-bloom")||e.includes("--bloom-sheet-")||e.includes("blur(6px)")&&e.includes("data-app-action-sidebar-thread-title")||e.includes("--composer-adjacent-max-width")&&e.includes("--thread-content-max-width")||e.includes("--composer-layout-surface-backdrop-filter")):!1}function ca(){let t=document.adoptedStyleSheets.filter(e=>!Ze.has(e)&&!la(e));document.adoptedStyleSheets=[...t,...Ot.values()]}function da(t){document.readyState==="loading"||t.parentNode===document.head||document.head.append(t)}function xd(t,e){let o=_t.get(t);o||(o=document.createElement("style"),o.id=aa(t),_t.set(t,o)),o.textContent!==e&&(o.textContent=e),da(o)}function Ko(t,e){let o=Ad(t,e);if(rr)try{let n=Ot.get(t);n||(n=new ct.CSSStyleSheet,Ot.set(t,n),Ze.add(n)),n.replaceSync(o),ca();return}catch(n){yd.warn("Constructed style sheets unavailable, using <style> after parsing",n),rr=!1;let r=Ot.get(t);r&&Ze.delete(r),Ot.delete(t)}xd(t,o)}function Xe(t){let e=Ot.get(t);e&&(Ze.delete(e),Ot.delete(t)),_t.get(t)?.remove(),_t.delete(t);for(let o of document.querySelectorAll(`style[id="${aa(t)}"]`))o.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(o=>o!==e&&!wd(o,t)),rr&&ca()}catch{}}function $e(){Ot.clear(),Ze.clear();for(let t of _t.values())t.remove();_t.clear();for(let t of document.querySelectorAll("style[id^='bloom-style-']"))t.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(t=>!la(t))}catch{}}function ua(){for(let t of _t.values())da(t)}var L=t=>(...e)=>e.map(o=>t+o).join(" "),Go=(...t)=>t.filter(Boolean).join(" "),Rt=t=>t.length?`${t.map(e=>`${e}:not([data-bloom])`).join(",")}{display:none!important}`:"";var ma="__bloomHost",ir=new x("Boot"),Sd=['[data-bloom="navigator"]','[data-bloom="settings"]','[data-bloom="history-hud"]','[data-bloom="history-dialog"]','[data-bloom="star-list"]','[data-bloom="entry"]','[data-bloom="menu-entry"]','[data-bloom="menu-flyout"]','[data-bloom="message-star"]','[data-bloom="starred"]','[data-bloom="chat-star"]','[data-bloom="queue"]','[data-bloom="recent"]','[data-bloom="quote-chip"]','[data-bloom="quote-back"]','[data-bloom="cls"]','[data-bloom="timestamp"]','[data-bloom="tooltip"]','[data-bloom="notices"]'].join(", "),qd=["data-bloom-greeting","data-bloom-placeholder","data-bloom-streamer-open","data-bloom-share","data-bloom-invite","data-bloom-csi-avatar","data-bloom-csi-sized"];function Yo(){if(!(typeof document>"u"||!document.documentElement)){for(let t of document.querySelectorAll(Sd))t.remove();for(let t of qd)for(let e of document.querySelectorAll(`[${t}]`))e.removeAttribute(t);for(let t of document.querySelectorAll("[data-bloom-text]"))t.removeAttribute("data-bloom-text"),t.style.removeProperty("--bloom-text-size"),t.style.removeProperty("--bloom-text")}}function Ed(t){if(ir.warn("Replacing another Bloom++ instance",t.VERSION),t.destroy){t.destroy();return}for(let e of t.plugins?.values()??[]){try{e.stop?.()}catch(o){ir.error("Failed to stop previous plugin",o)}e.styles="",e.start=void 0}$e()}function pa(t){let e=ct,o=new Set;for(let n of[t,e.Bloom,e[ma]])if(!(!n||o.has(n))){o.add(n);try{Ed(n)}catch(r){ir.error("Failed to retire Bloom++",r)}}Yo()}function fa(t){let e=ct;try{delete e.Bloom}catch{}Object.defineProperty(e,"Bloom",{value:t,configurable:!0,writable:!0}),Object.defineProperty(e,ma,{value:t,configurable:!0,writable:!0})}var na={};gd(na,{VERSION:()=>pd,destroy:()=>ch,init:()=>oa,plugins:()=>W});var Td=new x("Dom");function s(t,e={},...o){let n=document.createElement(t);e.class&&(n.className=e.class),e.text!=null&&(n.textContent=e.text),e.title&&(n.title=e.title);for(let[r,i]of Object.entries(e.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(e.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var ga=document.createElement("template");function ha(t){return ga.innerHTML=t.trim(),ga.content.firstElementChild.cloneNode(!0)}var ht=t=>t instanceof HTMLElement&&t.isConnected&&t.getClientRects().length>0&&!t.closest("[inert]"),X=(t,e=document)=>[...e.querySelectorAll(t)].find(ht)??null,Md=16,Cd="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function ba(t,e){let o=setInterval(t,e),n;try{n=new Worker(URL.createObjectURL(new Blob([Cd],{type:"text/javascript"}))),n.addEventListener("message",t),n.postMessage(e)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function ar(t){document.hidden?setTimeout(t,Md):requestAnimationFrame(t)}function Ht(t){let e=!1;return()=>{e||(e=!0,ar(()=>{e=!1;try{t()}catch(o){Td.error("Scheduled task failed",o)}}))}}var jo=new Set,Qo=[],_e,Ld=Ht(()=>{let t=Qo;Qo=[];for(let e of jo)e(t)});function M(t){return jo.add(t),_e||(_e=new MutationObserver(e=>{Qo.push(...e),Ld()}),_e.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),t([]),()=>{jo.delete(t),!jo.size&&(_e?.disconnect(),_e=void 0,Qo=[])}}var kd=t=>t instanceof Element&&(t.hasAttribute("data-bloom")||!!t.closest("[data-bloom]")),U=t=>!t.length||t.some(e=>!kd(e.target)),Bd=t=>`"${t.replaceAll("\\","\\\\").replaceAll('"','\\"').replaceAll(`
`,"\\A ")}"`;function te(t,e){if(e==null){t.removeAttribute("data-bloom-text"),t.style.removeProperty("--bloom-text-size"),t.style.removeProperty("--bloom-text");return}t.style.setProperty("--bloom-text",Bd(e)),t.getAttribute("data-bloom-text")!==e&&t.setAttribute("data-bloom-text",e)}function h(t){return t}var Id=new x("Storage");function Wo(t){try{return localStorage.getItem(t)??void 0}catch{return}}function zo(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch(o){Id.warn("localStorage write failed",o)}}function ya(t,e){addEventListener("storage",o=>{o.key===t&&e(o.newValue)})}var sr="BloomSettings",Pd=100,Dt={plugins:{}},Vo=new Set,lr=new Set,ve;function va(t){let e=t;for(let o=0;typeof e=="string"&&o<2;o++)e=Uo(e);return!C(e)||!C(e.plugins)||!Object.keys(e.plugins).length?null:e}function Aa(){let t=va(Wo(sr));t&&(Dt.plugins=t.plugins)}var wa=(t,e)=>`${t}
${e}`;function cr(){ve=void 0,lr.clear(),zo(sr,Dt)}function Od(t){let e=va(t);if(!e)return;let o=[];for(let n of new Set([...Object.keys(Dt.plugins),...Object.keys(e.plugins)])){let r=Dt.plugins[n]??={},i=C(e.plugins[n])?e.plugins[n]:{};for(let a of new Set([...Object.keys(r),...Object.keys(i)]))lr.has(wa(n,a))||JSON.stringify(r[a])===JSON.stringify(i[a])||(i[a]===void 0?delete r[a]:r[a]=i[a],o.push([n,a]))}for(let[n,r]of o)for(let i of Vo)i(n,r)}function dr(){ve&&(clearTimeout(ve),cr())}function xa(t){let e=Object.keys(Dt.plugins).filter(o=>!t.has(o));if(!e.length)return e;for(let o of e)delete Dt.plugins[o];return clearTimeout(ve),cr(),e}var nt=(t,e)=>Dt.plugins[t]?.[e];function dt(t,e,o){let n=Dt.plugins[t]??={};o===void 0?delete n[e]:n[e]=o,lr.add(wa(t,e)),clearTimeout(ve),ve=setTimeout(cr,Pd);for(let r of Vo)r(t,e)}function Ae(t){return Vo.add(t),()=>void Vo.delete(t)}function ur(t){return t.type==="component"?void 0:t.default}function b(t){let e={def:t,pluginName:"",store:new Proxy({},{get:(o,n)=>nt(e.pluginName,n)??(t[n]&&ur(t[n])),set:(o,n,r)=>(dt(e.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(t))t[o].type!=="custom"&&nt(e.pluginName,o)!==void 0&&dt(e.pluginName,o)}};return e}var Sa=t=>{let e=()=>{let o=nt("Settings",t);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>e().includes(o),list:e,toggle(o){let n=e();dt("Settings",t,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},Jo=Sa("pinnedPlugins"),Zo=Sa("starredPlugins");addEventListener("pagehide",dr);ya(sr,Od);var oo=new x("PluginManager"),W=new Map,Nt=new Set,$o=new Set,mr=new Set,to=new Map,Rd=2880*60*1e3;function qa(t){for(let e of t)e.settings&&(e.settings.pluginName=e.name),W.set(e.name,e)}var Ea=()=>{let t=nt("Settings","knownPlugins");return C(t)?t:null};function Ta(){let t=xa(new Set(W.keys()));t.length&&oo.info(`Dropped settings of removed plugins: ${t.join(", ")}`);let e=Ea(),o=Date.now(),n={...e},r=[...W.values()].filter(i=>!i.hidden&&!i.required&&!(i.name in n));for(let i of r)n[i.name]=e?o:0;for(let i of Object.keys(n))W.has(i)||delete n[i];JSON.stringify(n)!==JSON.stringify(e)&&dt("Settings","knownPlugins",n)}var Ma=t=>{let e=Ea()?.[t];return!!e&&Date.now()-e<Rd},Ca=t=>to.get(t);function La(){for(let t of mr)t()}function pr(t,e){let o=to.get(t);(e?o?.join(`
`)===e.join(`
`):!o)||(e?to.set(t,e):to.delete(t),La())}var Tt=t=>!!t.required||(nt(t.name,"enabled")??!!t.enabledByDefault),fr=t=>Nt.has(t),eo=t=>`plugin-${t.name}`;function ka(t){if(!t.styles)return;let e=typeof t.styles=="function"?t.styles():t.styles;e?Ko(eo(t),e):Xe(eo(t))}function Ba(t){if(!Nt.has(t.name))try{ka(t),t.start?.(),Nt.add(t.name)}catch(e){Xe(eo(t)),oo.error(`Failed to start ${t.name}`,e)}}function _o(t){Nt.delete(t.name),Xe(eo(t));try{t.stop?.()}catch(e){oo.error(`Failed to stop ${t.name}`,e)}}var gr=t=>t.startAt??"HostReady";function Ia(t){if(Tt(t)){$o.has(gr(t))&&Ba(t);return}_o(t)}function tn(t){$o.add(t);for(let e of W.values())gr(e)===t&&Ia(e);oo.info(`${t}: ${[...Nt].join(", ")}`)}function Pa(t){_o(t)}function Oa(t){Tt(t)&&$o.has(gr(t))&&Ba(t)}function Ra(t,e){dt(t.name,"enabled",e),dr()}function Hd(){for(let t of W.values())t.required||Tt(t)||(Nt.has(t.name)?_o(t):Xe(eo(t)))}var Xo;function Ha(){Xo?.(),Xo=M(()=>Hd())}function Da(){Xo?.(),Xo=void 0;for(let t of W.values())_o(t);Nt.clear(),$o.clear(),to.clear()}function Na(t){return mr.add(t),()=>void mr.delete(t)}Ae((t,e)=>{let o=W.get(t);if(o){if(e==="enabled"){typeof nt(t,"enabled")=="boolean"&&Ia(o),La();return}if(Nt.has(t))try{ka(o),o.onSettingsChange?.(e)}catch(n){oo.error(`Settings change failed for ${t}`,n)}}});var Ua=`/*
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
`;var Nd=new x("Events");function we(){let t=new Map;return{on(e,o){let n=t.get(e);return n||t.set(e,n=new Set),n.add(o),()=>void n.delete(o)},emit(e,o){for(let n of t.get(e)??[])try{n(o)}catch(r){Nd.error(`Listener for ${String(e)} failed`,r)}}}}function Fa(t,e){let o=t instanceof Element?[t,...t.querySelectorAll("*")]:[...t.querySelectorAll("*")];for(let n of o){let r=n.shadowRoot;r&&(e(r),Fa(r,e))}}function Ut(t,e=document){let o=[...e.querySelectorAll(t)];return Fa(e,n=>o.push(...n.querySelectorAll(t))),o}var ut=(t,e=document)=>Ut(t,e).find(ht)??null;var c={rail:"[data-app-navigation-rail]",sidebarScroll:"[data-app-action-sidebar-scroll]",sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"[data-app-action-sidebar-scroll]",oldRail:"[data-app-navigation-rail]",oldProfile:'button[aria-label="Open profile menu" i]',threadRow:"[data-app-action-sidebar-thread-row]",threadSelected:"[data-app-action-sidebar-thread-row][data-app-action-sidebar-thread-selected='true']",threadTitle:"[data-app-action-sidebar-thread-title]",projectRow:"[data-app-action-sidebar-project-row]",projectLabel:"[data-app-action-sidebar-project-label]",destination:"[data-sidebar-destination]",conversationLink:"[data-app-action-sidebar-thread-row]",timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:"[data-turn-key]",turn:"[data-turn-key]",messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",userBubble:'[class~="group/user-message"]',assistantReply:"[data-response-annotation-target]",oldThread:"[data-app-action-timeline-scroll]",turnActions:'.turn-action-controls, [class*="turn-action-controls"]',readAloud:'button:is([aria-label="Read aloud" i], [aria-label^="Read aloud" i], [aria-label="Stop reading" i], [aria-label^="Stop reading" i], [aria-label="\u6717\u8BFB"], [aria-label^="\u6717\u8BFB"], [aria-label="\u505C\u6B62\u6717\u8BFB"], [data-testid*="read-aloud" i])',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery, [class*='recovery']",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composer:"[data-chatgpt-composer], [data-composer-input]",composerInput:'[data-composer-input] [contenteditable="true"].ProseMirror, [contenteditable="true"].ProseMirror',composerConversation:"[data-above-composer-conversation-id]",oldComposerForm:"[data-chatgpt-composer]",sendButton:'button[aria-label="Send" i], button[aria-label="Send prompt" i], button[aria-label="Send message" i]',stopButton:'button[aria-label="Stop" i], button[aria-label^="Stop " i], button[aria-label="\u505C\u6B62" i], button[aria-label^="\u505C\u6B62"]',composerFooter:"[data-chatgpt-composer]",modelTrigger:'button[aria-label="Model selector" i], button[aria-label="Select ChatGPT model" i], [data-chatgpt-composer] button[aria-haspopup="menu"]',modelItem:'[role="menu"] [role="menuitemradio"], [role="menu"] [role="menuitem"]',effortSlider:'[role="menu"] [data-reasoning-slider]',homeHeading:'main h1:not([aria-hidden="true"]), [role="main"] h1:not([aria-hidden="true"]), [data-testid="home-heading"], [data-homepage-takeover] h1, .heading-xl, [class~="heading-xl"]',headerMore:'button[aria-label="More" i], button[aria-label="\u66F4\u591A"]',headerTitle:"[data-thread-title], [data-thread-title-trigger]",profile:'button[aria-label="Open profile menu" i]',rightPanel:"aside[data-app-shell-focus-area='right-panel']",summaryPanel:"[data-summary-panel-variant]"};var Ka=/[​-‍﻿]/g,mt=()=>ut(c.composerInput),no=t=>t instanceof HTMLElement&&t.matches(c.composerInput),it=(t=mt())=>t?.closest("form")??t?.closest(c.composer)??ut(c.composer);function Q(t=mt()){if(!t)return"";if(t instanceof HTMLTextAreaElement)return t.value.replace(Ka,"").trim();let e=t.cloneNode(!0);for(let n of e.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...e.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:e.textContent??"").replace(Ka,"").trim()}var Ud=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function Ga(t,e){let o=e?"insertText":"deleteContentBackward";t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:o,data:e||null})),t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:o,data:e||null}))}function Mt(t,e=mt()){if(!e)return!1;if(e.focus(),e instanceof HTMLTextAreaElement)return Ud?.call(e,t),e.dispatchEvent(new Event("input",{bubbles:!0})),e.setSelectionRange(t.length,t.length),!0;let o=getSelection();return o?.selectAllChildren(e),typeof document.execCommand=="function"?t?document.execCommand("insertText",!1,t):document.execCommand("delete"):Ga(e,t),Q(e)!==t.trim()&&Ga(e,t),o?.selectAllChildren(e),o?.collapseToEnd(),!0}function Ya(t,e){let o=t;for(;o&&o!==e;){if(o instanceof HTMLElement&&o.parentElement===e)return o;o=o.parentNode}return null}function ja(t,e,o){let n=document.createRange();return n.selectNodeContents(t),o?n.setEnd(e.startContainer,e.startOffset):n.setStart(e.endContainer,e.endOffset),n.toString().includes(`
`)?!0:!!n.cloneContents().querySelector("br")}function Qa(t){if(t instanceof HTMLTextAreaElement){let{selectionStart:g,selectionEnd:T,value:f}=t;return{first:!f.slice(0,g).includes(`
`),last:!f.slice(T).includes(`
`)}}let e=getSelection();if(!e?.rangeCount||!t.contains(e.anchorNode))return{first:!0,last:!0};let o=e.getRangeAt(0),n=[...t.children].filter(g=>g instanceof HTMLElement),r=Ya(o.startContainer,t),i=Ya(o.endContainer,t),a=!r||r===n[0],u=!i||i===n[n.length-1],l=o.getBoundingClientRect(),d=(r??t).getBoundingClientRect(),m=Number.parseFloat(getComputedStyle(r??t).lineHeight)||24;return l.height?{first:a&&l.top-d.top<m,last:u&&d.bottom-l.bottom<m}:{first:a&&!ja(r??t,o,!0),last:u&&!ja(i??t,o,!1)}}var Wa=t=>{let e=it();return(e&&ut(t,e))??ut(t)},hr=()=>Wa(c.stopButton),Fd=()=>{let t=Wa(c.sendButton);return t&&!t.matches(c.stopButton)?t:null};function za(){let t=Fd();if(t){t.disabled||t.click();return}mt()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var Va=()=>ht(hr());var en=new x("AppProtocol"),ro=we();function Kd(t){let e=t;if(typeof e=="string")try{e=JSON.parse(e)}catch{return null}if(Array.isArray(e)||!e||typeof e!="object")return null;let o=e,n=o.notification&&typeof o.notification=="object"?o.notification:o;if(typeof n.method!="string")return null;let r=n.params&&typeof n.params=="object"?n.params:void 0;return{method:n.method,params:r}}function io(t){if(Array.isArray(t)){for(let o of t)io(o);return}let e=Kd(t);e&&ro.emit("note",e)}var yr=new WeakMap,br=new WeakMap;function Gd(t,e){let o=yr.get(t);if(o)return o;let n=r=>{io(r.data),typeof t=="function"?t.call(e,r):t.handleEvent(r)};return yr.set(t,n),n}function Yd(){let t=MessagePort.prototype,e=t.addEventListener,o=t.removeEventListener;t.addEventListener=function(r,i,a){return r!=="message"?e.call(this,r,i,a):e.call(this,r,Gd(i,this),a)},t.removeEventListener=function(r,i,a){return r!=="message"?o.call(this,r,i,a):o.call(this,r,yr.get(i)??i,a)};let n=Object.getOwnPropertyDescriptor(t,"onmessage");n?.set&&Object.defineProperty(t,"onmessage",{configurable:!0,enumerable:n.enumerable,get(){return br.has(this)?br.get(this):n.get?.call(this)},set(r){br.set(this,r),n.set.call(this,function(a){io(a.data),r?.call(this,a)})}})}function jd(){let t=window.electronBridge,e=t?.subscribeToWorkerMessages;if(!(!t||typeof e!="function"))try{t.subscribeToWorkerMessages=(o,n)=>e.call(t,o,r=>{io(r),n(r)})}catch(o){en.warn("electronBridge.subscribeToWorkerMessages is not writable",o)}}function Qd(){addEventListener("message",t=>io(t.data));try{Yd()}catch(t){en.warn("MessagePort wrap failed",t)}try{jd()}catch(t){en.warn("electronBridge wrap failed",t)}en.info("Listening for app-server notifications")}Qd();var Wd=new x("AppRoute"),zd=500,nn=new Set,rn=null,on;function v(){return(ut(c.threadSelected)??Ut(c.threadSelected)[0])?.getAttribute("data-app-action-sidebar-thread-id")??null}var an=()=>!v(),Za=()=>!1,ee=()=>!1;function Ja(){let t=v();if(t===rn)return;let{href:e}=location,o={prevHref:e,href:e,prevId:rn,id:t};rn=t;for(let n of nn)try{n(o)}catch(r){Wd.error("Route listener failed",r)}}function Vd(){let t=new MutationObserver(Ja);(()=>{document.body&&t.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-app-action-sidebar-thread-selected","data-app-action-sidebar-thread-id"]})})();let o=setInterval(Ja,zd);return()=>{t.disconnect(),clearInterval(o)}}function bt(t){return nn.add(t),on||(rn=v(),on=Vd()),()=>{nn.delete(t),!nn.size&&(on?.(),on=void 0)}}var Jd=250,Zd=400,O=we(),oe=!1,xe=null,ie=!1,ne="done",re=!1,Xa=!1,$=()=>({generating:oe,conversationId:v()}),Xd=t=>{if(!t)return!0;let e=v();return e?e===t||e.endsWith(t)||t.endsWith(e.replace(/^local:/,"")):!0};function $d(t){return t==="interrupted"||t==="aborted"||t==="cancelled"?"stopped":t==="failed"||t==="error"?"error":"done"}function _d(){return re||Va()}function tu(t){xe=null,oe=!1,re=!1,O.emit("fall",{conversationId:v(),outcome:t}),ie=!1,ne="done"}function eu(){let t=_d();t&&!oe&&(oe=!0,ie=!1,ne="done",O.emit("rise",{conversationId:v()})),t||!oe?xe=null:xe==null?xe=Date.now():Date.now()-xe>=Zd&&tu(ie?"stopped":ne)}function ao(){eu(),O.emit("tick",$())}function ou({prevId:t,id:e}){t!==e&&(oe&&(re=!1,xe=null,oe=!1,ie=!1,ne="done",O.emit("fall",{conversationId:t,outcome:"left"})),O.emit("context",{prevId:t,id:e,migrated:!t&&!!e}),ao())}function nu(t){if(Xd(t.params?.threadId)){if(t.method==="turn/started"){re=!0,ao();return}if(t.method==="turn/interrupt"){re=!1,ne="stopped",ie=!0,ao();return}t.method==="turn/completed"&&(re=!1,ne=$d(t.params?.turn?.status),ne==="stopped"&&(ie=!0),ao())}}function ru(t){t.target instanceof Element&&t.target.closest(c.stopButton)&&(ie=!0,re=!1)}function $a(){Xa||(Xa=!0,ro.on("note",nu),bt(ou),document.addEventListener("click",ru,!0),ba(ao,Jd))}var iu="__reactContainer$",_a="__reactFiber$";function Ar(){return document.readyState!=="loading"?Promise.resolve():new Promise(t=>document.addEventListener("DOMContentLoaded",()=>t(),{once:!0}))}var vr=(t,e)=>Object.keys(t.wrappedJSObject??t).some(o=>o.startsWith(e)),yt=t=>!vr(document,iu)||vr(t,_a);function Ft(){return document.body?Promise.resolve():new Promise(t=>{let e=new MutationObserver(()=>{document.body&&(e.disconnect(),t())});e.observe(document,{childList:!0,subtree:!0})})}async function wr(){await Ft();let t=Date.now()+8e3;for(;!vr(document.body,_a)&&Date.now()<t;)await new Promise(e=>setTimeout(e,100))}var ts={BetterNavigator:1793448142e3,BetterQuotes:1793365944e3,ChatListStatus:1793351872e3,ChatStateFavicons:179069068e4,Cleaner:1793267811e3,CompleteToast:1793354069e3,ComposerOpacity:1793344667e3,Continue:1790939902e3,CustomSidebarIdentity:179069068e4,GreetingCustomizer:1793350808e3,InputHistory:1793365944e3,MessageTimestamps:1791080494e3,NoDictation:1793335268e3,NoShareLink:179069068e4,NoSidebarIdentity:179069068e4,PromptQueue:1793365944e3,RecentTopics:1793365944e3,ResponseNotification:1793354069e3,Settings:1793448244e3,SidebarIdentityOpacity:179069068e4,StarChats:1793365944e3,StreamerMode:1793344667e3,TemporaryChat:1792014624e3,UserQuotes:1793345744e3,WiderChat:179333264e4};var S=t=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`,au="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",su={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${au}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:S('<path d="M18 6 6 18M6 6l12 12"/>'),gear:S('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:S('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:S('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:S('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:S('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:S('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:S('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:S('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:S('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:S('<path d="m6 9 6 6 6-6"/>'),play:S('<path d="M7 4v16l13-8z"/>'),plus:S('<path d="M12 5v14M5 12h14"/>'),check:S('<path d="m5 12 5 5 9-10"/>'),alert:S('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:S('<path d="M4 5h16v11H9l-5 4z"/>'),layout:S('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:S('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:S('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:S('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:S('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:S('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:S('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:S('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:S('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:S('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:S('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:S('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:S('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:S('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:S('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:S('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),folder:S('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),ghost:S('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},k=t=>ha(su[t]);function xr(t){if(typeof t.showPopover=="function"){t.setAttribute("popover","manual");try{t.showPopover()}catch{t.matches(":popover-open")||t.removeAttribute("popover")}}}function vt(t,e=document.body){e.append(t),xr(t)}var pt="data-bloom-tip",Sr=6,qr=8,ae,es=null;function Se(t){if(t===es)return;if(es=t,!t){ae?.remove();return}ae??=s("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),ae.textContent=t.getAttribute(pt),vt(ae);let e=t.getBoundingClientRect(),{width:o,height:n}=ae.getBoundingClientRect(),r=e.bottom+Sr+n<=innerHeight-qr;ae.style.left=`${ot(e.left+e.width/2-o/2,qr,innerWidth-o-qr)}px`,ae.style.top=`${r?e.bottom+Sr:e.top-Sr-n}px`}var os=t=>t instanceof Element?t.closest(`[${pt}]`):null;function ns(){let t=new AbortController,e={passive:!0,signal:t.signal};return document.addEventListener("pointerover",o=>Se(os(o.target)),e),document.addEventListener("pointerout",o=>o.relatedTarget||Se(null),e),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&Se(os(o.target)),e),document.addEventListener("focusout",()=>Se(null),e),document.addEventListener("pointerdown",()=>Se(null),e),()=>{t.abort(),Se(null)}}function Kt(t,e,o,n=!1){let r=s("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(t),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let a=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(a)),e(a)===!1&&r.setAttribute("aria-checked",String(!a))}),r}function H(t,e,o){return s("button",{class:Go("bloom-button",o&&`bloom-button-${o}`),text:t,attrs:{type:"button","data-bloom":"control"},on:{click:e}})}function Y(t,e,o,n){let r=s("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":e,"data-bloom":"control",[pt]:e},on:{click:o}},k(t));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function sn(t,e,o,n,r,i){let a=s("input",{attrs:{type:"range",min:String(e),max:String(o),step:String(n)}});a.value=String(t);let u=s("output",{text:`${a.value}${r}`});return a.addEventListener("input",()=>{u.textContent=`${a.value}${r}`,i(Number(a.value))}),s("div",{class:"bloom-slider"},a,u)}function Er(t,e,o){let n=s("select",{class:"bloom-select"},...e.map(r=>s("option",{text:r.label,attrs:{value:r.value}})));return n.value=t,n.addEventListener("change",()=>o(n.value)),n}function so(t,e,o="",n="text"){let r=s("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=t,r.addEventListener("change",()=>e(r.value)),r}var ln=["showSidebarEntry","showSidebarEntryOnHover","showAccountMenuEntry"],rs=1,qe={showSidebarEntry:!0,showSidebarEntryOnHover:!1,showAccountMenuEntry:!1},Tr=t=>Object.hasOwn(qe,t),Mr=t=>nt("Settings",t)??qe[t],is=(t,e)=>!Tr(t)||e!==!1||ln.some(o=>o!==t&&Mr(o));function as(){if(nt("Settings","entryRevision")!==rs){for(let t of ln)dt("Settings",t);dt("Settings","entryRevision",rs)}}var lu=new x("Themes"),cu=/^https:\/\/\S+\.css(?:[?#]|$)/i,du=/\/\*\*[^]*?@name[ \t]+([^\n*]+)/,F=b({themes:{type:"custom",default:[]},quickCss:{type:"custom",default:""},quickCssEnabled:{type:"custom",default:!0}});async function ss(t){let e=new TextDecoder().decode(await Fo(t));if(!e.trim())throw new Error("Theme file is empty.");return e}var cn=(t,e)=>{F.store.themes=F.store.themes.map(o=>o.id===t?{...o,...e}:o)},ls=t=>{F.store.themes=F.store.themes.filter(e=>e.id!==t)};async function cs(t){if(!cu.test(t))throw new Error("Enter an https URL that ends in .css.");if(F.store.themes.some(n=>n.url===t))throw new Error("This theme is already added.");let e=await ss(t),o=e.match(du)?.[1]?.trim()||decodeURIComponent(new URL(t).pathname.split("/").pop()??t).replace(/\.css$/i,"").replaceAll(/[-_]/g," ");F.store.themes=[...F.store.themes,{id:Je("theme"),name:o,url:t,css:e,enabled:!0}]}function ds(t,e,o){if(!e.trim())throw new Error("Name is required.");if(!o.trim())throw new Error("CSS is required.");t?cn(t,{name:e.trim(),css:o}):F.store.themes=[...F.store.themes,{id:Je("theme"),name:e.trim(),css:o,enabled:!0}]}async function uu(){await Promise.all(F.store.themes.filter(t=>t.url&&t.enabled).map(async({id:t,url:e,name:o})=>{try{let n=await ss(e??"");F.store.themes.find(r=>r.id===t)?.css!==n&&cn(t,{css:n})}catch(n){lu.warn(`Failed to refresh theme "${o}"`,n)}}))}var us=h({name:"Themes",description:"Applies Bloom++ themes and Quick CSS.",authors:["Bloom contributors"],tags:[],icon:"spark",required:!0,hidden:!0,startAt:"Init",settings:F,styles:()=>[...F.store.themes.filter(t=>t.enabled).map(t=>t.css),F.store.quickCssEnabled?F.store.quickCss:""].join(`
`),start(){uu()}});var K=L("bloom-settings-"),mu=3e3,ms=(t,e)=>{let o=s("textarea",{class:`bloom-input ${K("css")}`,attrs:{spellcheck:"false",placeholder:"Paste your CSS here...","aria-label":e}});return o.value=t,o},Cr=(t,e)=>s("div",{class:K("section-header")},s("div",{class:K("field-label"),text:t}),s("div",{class:K("field-desc"),text:e}));function ps(){let{quickCss:t,quickCssEnabled:e}=F.store,o=ms(t,"Quick CSS");return o.disabled=!e,o.addEventListener("input",()=>{F.store.quickCss=o.value}),s("div",{class:K("section")},s("div",{class:K("field","field-inline")},Cr("Quick CSS","Your own CSS, applied on every page as you type."),Kt(e,n=>{F.store.quickCssEnabled=n,o.disabled=!n},"Enable Quick CSS")),o)}function fs(){let t=s("div",{class:K("section")}),e=null,o=()=>s("div",{class:K("section-error"),attrs:{role:"alert"}});function n(){let l=s("input",{class:"bloom-input",attrs:{type:"url",placeholder:"https://raw.githubusercontent.com/...","aria-label":"Theme URL"}}),d=o(),m=H("Add",async()=>{m.disabled=!0,d.textContent="";try{await cs(l.value.trim()),u()}catch(g){d.textContent=g instanceof Error?g.message:String(g),m.disabled=!1}});return s("div",{class:K("section-block")},Cr("Online themes","Load a theme from a .css URL. It is fetched again on every page load, so updates apply."),s("div",{class:K("section-row")},l,m),d)}function r(){let l=e==="new"?null:e,d=s("input",{class:"bloom-input",attrs:{placeholder:"My theme","aria-label":"Theme name"}});d.value=l?.name??"";let m=ms(l?.css??"","Theme CSS"),g=o();return s("div",{class:K("section-block")},d,m,g,s("div",{class:K("section-row")},H("Save",()=>{try{ds(l?.id??null,d.value,m.value),e=null,u()}catch(T){g.textContent=T instanceof Error?T.message:String(T)}}),H("Cancel",()=>{e=null,u()})))}function i(){return s("div",{class:K("section-block")},s("div",{class:K("field","field-inline")},Cr("Local themes","CSS stored only on this device."),!e&&H("New local theme",()=>{e="new",u()})),e&&r())}function a(l){let d,m=Y("trash","Remove",()=>{if(d){clearTimeout(d),ls(l.id),u();return}m.setAttribute("aria-pressed","true"),m.setAttribute(pt,"Click again to remove"),d=setTimeout(()=>{d=void 0,m.removeAttribute("aria-pressed"),m.setAttribute(pt,"Remove")},mu)});return s("div",{class:K("theme")},s("div",{class:K("theme-text")},s("div",{class:`${K("card-name")} bloom-truncate`,text:l.name}),s("div",{class:`${K("field-desc")} bloom-truncate`,text:l.url??"Local"})),l.url?Y("copy","Copy URL",()=>void No(l.url??"")):Y("edit","Edit",()=>{e=l,u()}),m,Kt(l.enabled,g=>cn(l.id,{enabled:g}),`Enable ${l.name}`))}function u(){let{themes:l}=F.store;t.replaceChildren(n(),i(),l.length?s("div",{class:K("themes")},...l.map(a)):s("div",{class:K("empty"),text:"No themes yet."}))}return u(),t}var pu=new x("SettingsPanel"),p=L("bloom-settings-"),fu=10080*60*1e3,gu=3e3,gs="Toggle features. Some need a reload. Click the sliders icon to configure.",hu="Paused: can't find its place on this page.",bu=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],yu=[{id:"plugins",label:"Plugins"},{id:"themes",label:"Themes"},{id:"css",label:"Quick CSS"}],vu=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],Au={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},bs=new Set(["chat","ui","privacy"]),G=null,lo="plugins",le="all",Lr="all",dn="",kr=[],ys=()=>[...W.values()].filter(t=>!t.hidden),wu=t=>!!t.updatedAt&&Date.now()-t.updatedAt<fu;function xu(t){switch(le){case"favorites":return Zo.has(t.name);case"recent":return wu(t);case"all":return!0;case"other":return!t.tags.some(e=>bs.has(e));case"chat":case"ui":case"privacy":return t.tags.includes(le)}}function Su(t){switch(Lr){case"all":return!0;case"enabled":return Tt(t);case"disabled":return!Tt(t)}}function qu(t){let e=dn.trim().toLowerCase();return!e||[t.name,t.description,...t.tags].some(o=>o.toLowerCase().includes(e))}function Eu(t){let e=Jo.list(),o=n=>e.includes(n.name)?e.indexOf(n.name):e.length;return le==="recent"?t.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):t.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var vs=t=>t.settings?.def??{},Pr=t=>Object.values(vs(t)).some(e=>e.type!=="custom");function Tu(t,e,o){let n=nt(t.name,e)??ur(o),r=i=>{if(t.name==="Settings"&&!is(e,i))return!1;dt(t.name,e,i)};switch(o.type){case"boolean":return Kt(n,r,o.description??e);case"slider":return sn(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return Er(n,o.options,r);case"string":return so(n,r,o.placeholder);case"number":return so(String(n),i=>r(Number(i)),"","number");case"component":{let i=s("div",{class:p("component")});return kr.push(o.render(i)),i}case"custom":return null}}var Mu=t=>t.replaceAll(/([A-Z])/g," $1").replace(/^./,e=>e.toUpperCase());function Or(t){if(!G)return;let e=Object.entries(vs(t)).filter(([,i])=>i.type!=="custom").map(([i,a])=>{let u=Tu(t,i,a),l=a.type==="boolean",d=a.type!=="component"&&s("div",{class:p("field-label"),text:Mu(i)}),m=a.description&&s("div",{class:p("field-desc"),text:a.description});return s("div",{class:p("field",l?"field-inline":"field-stacked")},(d||m)&&s("div",{class:p("field-text")},d,m),u)}),o,n=H("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},gu);return}clearTimeout(o),t.settings?.reset(),Ee(),Or(t)},"danger"),r=s("div",{class:p("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&Ee()}},s("div",{class:p("popup"),attrs:{role:"dialog","aria-label":`${t.name} settings`}},s("div",{class:p("popup-header")},s("div",{class:p("card-icon")},k(t.icon)),s("div",{class:p("popup-title")},s("div",{class:p("card-name"),text:t.name}),s("div",{class:p("popup-authors"),text:t.authors.join(", ")})),Y("close","Close",Ee)),s("p",{class:p("popup-desc"),text:t.description}),s("div",{class:p("fields")},...e),s("div",{class:p("popup-footer")},n)));G.querySelector(`.${p("modal")}`)?.append(r)}function Ee(){for(let t of kr)t();kr=[],G?.querySelector(`.${p("popup-backdrop")}`)?.remove()}function hs(t){let e=Tt(t),o=Zo.has(t.name),n=Jo.has(t.name),r=!!t.required,i=Ca(t.name);return s("div",{class:[p("card",e?"card-on":"card-off"),r?p("card-required"):""].filter(Boolean).join(" ")},s("div",{class:p("card-top")},s("div",{class:p("card-icon")},k(t.icon)),s("div",{class:p("card-actions")},Y("star",o?"Unstar":"Star",()=>{Zo.toggle(t.name),se()},o),r?null:Y("pin",n?"Unpin":"Pin to top",()=>{Jo.toggle(t.name),se()},n),r?s("span",{class:p("required-mark"),attrs:{"aria-label":"Required",[pt]:"This plugin is required for Bloom++ to work"}},k("alert")):null,Pr(t)&&Y("gear","Settings",()=>Or(t)),Kt(e,a=>Ra(t,a),r?`${t.name} is required`:`Enable ${t.name}`,r))),s("div",{class:p("card-name")},t.name,Ma(t.name)&&s("span",{class:p("new-badge"),text:"New"})),s("div",{class:p("card-desc"),text:t.description,title:t.description}),i&&s("div",{class:p("card-issue"),attrs:{[pt]:`Missing: ${i.join(", ")}`}},k("alert"),s("span",{text:hu})),s("div",{class:p("card-footer"),text:t.authors.join(", ")}))}function As(){let t=ys().some(o=>!o.tags.some(n=>bs.has(n)));G?.querySelector(`.${p("tabs")}`)?.replaceChildren(...bu.filter(o=>o.id!=="other"||t).map(o=>s("button",{class:p("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===le)},on:{click:()=>{le=o.id,As(),se()}}})))}function se(){if(!G)return;let t=ys().filter(xu),e=G.querySelector(`.${p("search")} input`);e&&(e.placeholder=`Search ${ra(t.length,"plugin")}...`);let o=Eu(t.filter(d=>qu(d)&&Su(d))),n=le==="all",r=n?o.filter(d=>!d.required):o,i=n?o.filter(d=>d.required):[],a=[...r.map(hs),...i.length?[s("div",{class:p("required-break"),attrs:{role:"separator"}}),...i.map(hs)]:[]],u=dn.trim()?"No plugins match your search.":Au[le]??"No plugins available.";G.querySelector(`.${p("grid")}`)?.replaceChildren(...a.length?a:[s("div",{class:p("empty"),text:u})])}function Cu(t){t.key==="Escape"&&(t.preventDefault(),t.stopPropagation(),G?.querySelector(`.${p("popup-backdrop")}`)?Ee():Gt())}var ws,Br;function Ir(){let t=G?.querySelector(`.${p("body")}`);if(!G||!t)return;for(let o of G.querySelectorAll(`.${p("nav-item")}`))o.setAttribute("aria-selected",String(o.getAttribute("data-section")===lo));if(Ee(),lo==="themes"){t.replaceChildren(fs());return}if(lo==="css"){t.replaceChildren(ps());return}let e=s("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=dn,e.addEventListener("input",()=>{dn=e.value,se()}),t.replaceChildren(s("div",{class:p("tabs"),attrs:{role:"tablist"}}),s("div",{class:p("toolbar")},s("label",{class:p("search")},k("search"),e),Er(Lr,vu,o=>{Lr=o,se()})),s("div",{class:p("grid")})),As(),se(),e.focus()}function Te(t,e){t&&(lo=t),G?(Ir(),xr(G)):Lu();let o=e&&W.get(e);o&&Or(o)}function Lu(){G=s("div",{class:`bloom-root ${p("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&Gt()}},s("div",{class:p("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},s("div",{class:p("header")},s("div",{class:p("logo")},k("bloom")),s("h2",{class:p("title"),text:"Bloom++"}),s("span",{class:p("hint"),attrs:{"aria-label":gs,tabindex:"0",[pt]:gs}},k("info")),s("div",{class:p("nav"),attrs:{role:"tablist"}},...yu.map(t=>s("button",{class:p("nav-item"),text:t.label,attrs:{type:"button",role:"tab","data-section":t.id},on:{click:()=>{lo=t.id,Ir()}}}))),s("span",{class:p("version"),text:"v2.0.102"}),Y("close","Close",Gt)),s("div",{class:p("body")}))),G.addEventListener("keydown",t=>t.stopPropagation()),Br=new AbortController,document.addEventListener("keydown",Cu,{capture:!0,signal:Br.signal}),vt(G),Ir(),ws=Na(se),pu.debug("Opened")}function Gt(){Ee(),Br?.abort(),ws?.(),G?.remove(),G=null}var Me=()=>G?Gt():Te(),xs=()=>!!G;var Ss=new x("AppLandmarks"),ku={Settings:[c.rail],WiderChat:[":root"],StreamerMode:[c.sidebarScroll,c.rail],ComposerOpacity:[c.composer,c.composerInput],ResponseNotification:[c.composerInput],InputHistory:[c.composerInput],Continue:[c.composerInput],ChatListStatus:[c.sidebarScroll],StarChats:[c.turn],BetterNavigator:[c.timelineScroll,c.turn],BetterQuotes:[c.turn],MessageTimestamps:[c.turn],RecentTopics:[c.sidebarScroll]};function qs(){for(let[t,e]of Object.entries(ku)){let o=W.get(t);if(!o||o.required||!Tt(o)){pr(t,null);continue}let n=e.some(r=>ut(r));if(pr(t,n?null:e),!n){if(!fr(o.name))continue;Pa(o),Ss.warn(`${t} paused; missing ${e.join(", ")}`);continue}fr(o.name)||(Oa(o),Ss.info(`${t} resumed`))}}function Es(){return qs(),M(()=>qs())}var iy=new x("Route"),Bu=/\/c\/(?!local-)([\w-]+)/;var Iu=()=>location.pathname.match(Bu)?.[1]??null;var ay=location.href,sy=Iu();var Pu=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,Ou=/\S+@\S+\.\S+/,Ru=3;var Hu=t=>!!t.closest(".sr-only");function Du(t){return[...t.querySelectorAll("*")].filter(e=>!e.children.length&&!e.closest("[data-bloom]")&&!!y(e.textContent??"")&&!(e instanceof SVGElement))}var Nu=t=>{if(/rounded-full/.test(t.getAttribute("class")??""))return!0;if(!t.clientWidth)return!1;let{borderRadius:e}=getComputedStyle(t);return e.includes("%")||Number.parseFloat(e)>=t.clientWidth/2};function un(t,e,o){for(let n of t.querySelectorAll(`[${e}]`))n!==o&&n.removeAttribute(e);o&&!o.hasAttribute(e)&&o.setAttribute(e,"")}function Uu(t,e){if(y(t.textContent??"").length>Ru)return null;let o=t.closest("button");for(let n=t;n&&n!==e&&n!==o;n=n.parentElement)if(Nu(n))return n;return null}function mn(t,e){t.hasAttribute(`data-bloom-${e}`)||t.setAttribute(`data-bloom-${e}`,"");let o=t.querySelector("img:not([data-bloom] img)"),n=Du(t),r=o?null:n.map(m=>Uu(m,t)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),a=(i&&i!==t&&t.contains(i)?i:o??r)??t.querySelector("[class*=rounded-full]:not([data-bloom] *)");un(t,`data-bloom-${e}-avatar`,a);let u=n.filter(m=>!a?.contains(m)&&!Hu(m)),l=u.find(m=>Pu.test(y(m.textContent??""))),d=u.find(m=>Ou.test(m.textContent??""));un(t,`data-bloom-${e}-plan`,l),un(t,`data-bloom-${e}-email`,d),un(t,`data-bloom-${e}-name`,u.find(m=>m!==l&&m!==d))}var Ts=()=>Ut(c.rail).filter(ht);function Ms(t){return ut(c.profile,t)??[...t.querySelectorAll(c.menuButton)].findLast(ht)??null}function Fu(t,e){return[...t.children].find(n=>n instanceof HTMLElement&&n!==e&&n.contains(e))??e}function Cs(){return Ts().flatMap(t=>{let e=Ms(t);if(!e)return[{kind:"rail",anchor:t,insert:n=>t.append(n)}];let o=Fu(t,e);return[{kind:"rail",anchor:o,insert:n=>(o===e?t:o).append(n)}]})}var Rr=()=>Ts().map(Ms).filter(t=>t!=null);function Ku(t){let e=t.getAttribute("aria-expanded")==="true"&&t.getAttribute("aria-controls"),o=e?document.getElementById(e):null;return o?.matches('[role="menu"]')?o:null}function pn(){return Rr().map(Ku).find(t=>t!=null)??Ut('[role="menu"]').find(t=>!t.closest("[data-bloom]")&&/log ?out|sign out|退出/i.test(t.textContent??""))??null}var co=t=>Ut(c.threadRow).filter(e=>e.getAttribute("data-app-action-sidebar-thread-id")===t);function uo(t){let e=co(t)[0]??Ut(c.threadRow).find(n=>{let r=n.getAttribute("data-app-action-sidebar-thread-id")??"";return r.endsWith(t)||t.endsWith(r.replace(/^local:/,""))});return(e?.getAttribute("data-app-action-sidebar-thread-title")??y(e?.textContent??""))||null}function Ls(t){return null}var Hr=0,fn;function Gu(t){if(!U(t))return;for(let o of Rr())mn(o,"profile");let e=pn();e&&mn(e,"menu")}function At(){Hr++;let t=!0;return Ft().then(()=>{t&&Hr&&!fn&&(fn=M(Gu))}),()=>{t&&(t=!1,!--Hr&&(fn?.(),fn=void 0))}}var ks=`/*
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
`;var _=L("bloom-entry-"),ju=4,Nr="--bloom-entry-x",Ur=1,Bs=4,Is=8,Qu=150,at=b({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar.",default:qe.showSidebarEntry},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:qe.showSidebarEntryOnHover},showAccountMenuEntry:{type:"boolean",description:"Show Bloom++ at the top of the account menu.",default:qe.showAccountMenuEntry},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:t=>(t.append(H("Reset position",()=>{at.store.entryPosition=Ur})),()=>t.replaceChildren())},showBloomMenu:{type:"boolean",description:"Hovering the Bloom++ row in the account menu opens a menu with Plugins, Themes, Quick CSS and plugin settings.",default:!0},menuPlugins:{type:"component",description:"Plugins listed in that menu.",render:t=>(t.append(...Rs().map(e=>s("div",{class:_("menu-pick")},k(e.icon),s("span",{class:"bloom-truncate",text:e.name}),Kt(Hs(e),o=>{at.store.menuPicks={...at.store.menuPicks,[e.name]:o}},`List ${e.name} in the menu`)))),()=>t.replaceChildren())},entryPosition:{type:"custom",default:Ur},menuPicks:{type:"custom",default:{}}}),ce=new Map,Yt=null,mo,Rs=()=>[...W.values()].filter(t=>!t.hidden).toSorted((t,e)=>t.name.localeCompare(e.name)),Hs=t=>at.store.menuPicks[t.name]??Pr(t),Ps=!1,Dr=[];function Wu(t,e,o){let n=t.currentTarget,r=e.clientWidth-n.offsetWidth;if(t.button!==0||r<=0||!e.classList.contains(_("hover")))return;let i=at.store.entryPosition,a=i,u=!1,l=new AbortController;n.setPointerCapture(t.pointerId),n.addEventListener("pointermove",m=>{!u&&Math.abs(m.clientX-t.clientX)<ju||(u=!0,o(),a=ot(i+(m.clientX-t.clientX)/r,0,Ur),e.style.setProperty(Nr,String(a)))},{signal:l.signal});let d=()=>{l.abort(),u&&(at.store.entryPosition=a,e.style.removeProperty(Nr))};n.addEventListener("pointerup",d,{signal:l.signal}),n.addEventListener("lostpointercapture",d,{signal:l.signal})}function zu(t){let e=!1,o=s("button",{class:_("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),e||Me(),e=!1},pointerdown:r=>{e=!1,t!=="rail"&&Wu(r,n,()=>{e=!0})}}},k("bloom"),t!=="rail"&&s("span",{class:_("label"),text:"Bloom++"})),n=s("div",{class:`bloom-root ${_("wrap")} ${_(t)}`,attrs:{"data-bloom":"entry"}},o);return n}function po(){clearTimeout(mo),Yt?.remove(),Yt=null}function Ds(){clearTimeout(mo),mo=setTimeout(po,Qu)}var Ns=t=>t.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0}));function Vu(t,e){if(clearTimeout(mo),Yt?.isConnected||!at.store.showBloomMenu)return;let o=(l,d,m)=>s("div",{class:_("flyout-item"),attrs:{role:"menuitem"},on:{pointerdown:g=>{g.button===0&&(g.preventDefault(),g.stopPropagation(),po(),Ns(e),m())}}},k(d),s("span",{class:"bloom-truncate",text:l})),n=Rs().filter(Hs);Yt=s("div",{class:`bloom-root ${_("flyout")}`,attrs:{"data-bloom":"menu-flyout",role:"menu","aria-label":"Bloom++"},on:{pointerenter:()=>clearTimeout(mo),pointerleave:Ds}},o("Plugins","bloom",()=>Te("plugins")),o("Themes","spark",()=>Te("themes")),o("Quick CSS","edit",()=>Te("css")),n.length>0&&s("div",{class:_("flyout-break"),attrs:{role:"separator"}}),...n.map(l=>o(l.name,l.icon,()=>Te("plugins",l.name)))),vt(Yt);let r=e.getBoundingClientRect(),{width:i,height:a}=Yt.getBoundingClientRect(),u=r.right+Bs;Yt.style.left=`${u+i>innerWidth?r.left-i-Bs:u}px`,Yt.style.top=`${ot(t.getBoundingClientRect().top,Is,innerHeight-a-Is)}px`}function Ju(t){let e=s("div",{class:`bloom-root ${_("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),po(),Ns(t),Me()},pointerenter:()=>Vu(e,t),pointerleave:Ds}},k("bloom"),s("span",{text:"Bloom++"}),at.store.showBloomMenu&&s("span",{class:_("menu-chevron")},k("chevron"))),o=t.querySelector('[role="menuitem"]');o?.parentElement?o.before(e):t.prepend(e)}function Os(){po();for(let t of document.querySelectorAll('[data-bloom="entry"], [data-bloom="menu-entry"]'))t.remove();ce.clear()}function Zu(){for(let t of document.querySelectorAll('[data-bloom="menu-entry"]'))t.remove()}function Us(){let{showSidebarEntry:t,showSidebarEntryOnHover:e,showAccountMenuEntry:o}=at.store,n=t||e?Cs():[],r=new Set(n.map(a=>a.anchor));for(let[a,u]of ce)a.isConnected&&r.has(a)||(u.remove(),ce.delete(a));for(let a of document.querySelectorAll('[data-bloom="entry"]'))[...ce.values()].includes(a)||a.remove();for(let a of n){let u=ce.get(a.anchor);if(u?.isConnected||!yt(a.anchor))continue;let l=u??zu(a.kind);ce.set(a.anchor,l),a.insert(l)}for(let a of ce.values())a.classList.toggle(_("hover"),!t);if(!o){Zu();return}let i=pn();i&&!i.querySelector('[data-bloom="menu-entry"]')&&Ju(i),i||po()}function Xu(t){ln.some(Mr)||(at.store[Tr(t??"")?t:"showSidebarEntry"]=!0),Us()}var Fs=h({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:at,styles:()=>`${ks}[data-app-navigation-rail] [data-bloom=entry]{position:absolute;inset:auto;left:50%;bottom:100%;transform:translateX(-50%);width:max-content;margin:0;padding-block:0.25rem;pointer-events:none;z-index:5;display:flex;justify-content:center}[data-app-navigation-rail]>[data-bloom=entry]{bottom:2.75rem}[data-app-navigation-rail] [data-bloom=entry] .bloom-entry-button{pointer-events:auto}[data-app-navigation-rail] [data-bloom=entry].bloom-entry-hover:not(:hover > *){display:none;transition:display 0s 0.2s allow-discrete}.${_("hover")}{${Nr}:${at.store.entryPosition}}`,start(){as(),Os(),Dr=[M(Us),ns(),At()],!Ps&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",Me),Ps=!0)},stop(){for(let t of Dr)t();Dr=[],Os(),Gt()},onSettingsChange:Xu});var jr=new x("AppNetwork"),wt=we(),gn=new Map,Ks=new Map;var $u=t=>t==="user"||t==="assistant";function Gs(t){let e=t.replace(/^local:/,"");return[...new Set([t,e,`local:${e}`])]}function Ys(t){let e=Gs(t);for(let n of e){let r=gn.get(n);if(r)return r}let o={id:e[0]??t,title:null,chain:[],times:new Map};for(let n of e)gn.set(n,o);return o}function Ct(t){if(!t)return null;nm(t);let e=Gs(t);return e.map(o=>gn.get(o)).find(o=>o&&(o.chain.length||o.title))??gn.get(e[0]??t)??null}function Kr(t,e,o,n=null){return{id:t,role:e,createTime:n,text:y(o),hasFiles:!1,imageCount:0}}function Gr(t,e){let o=t.chain.find(r=>r.id===e.id);if(o){e.text&&(o.text=e.text),e.createTime!=null&&(o.createTime=e.createTime);return}if(t.chain.find(r=>r.role===e.role&&r.text&&r.text===e.text)){!t.times.has(e.id)&&e.createTime!=null&&t.times.set(e.id,e.createTime);return}t.chain.push(e)}function js(t){let e=t.chain.map(o=>`${o.id}	${o.role}	${o.text}`).join(`
`);Ks.get(t.id)!==e&&(Ks.set(t.id,e),wt.emit("conversation",t))}function _u(t){if(typeof t=="function")try{return y(String(t()??""))}catch(e){return jr.warn("Turn label failed",e),""}return typeof t=="string"?y(t):""}function tm(t){if(typeof t!="function")return"";try{let e=t();return typeof e=="string"?y(e):C(e)&&typeof e.response=="string"?y(e.response):""}catch(e){return jr.warn("Turn preview failed",e),""}}function em(t){let e=Object.keys(t).find(o=>o.startsWith("__reactFiber$")||o.startsWith("__reactInternalInstance$"));return e?t[e]??null:null}function Yr(t,e,o,n){if(!t||e>24)return;let r=(C(t.memoizedProps)?t.memoizedProps:null)??(C(t.pendingProps)?t.pendingProps:null);r&&(Array.isArray(r.items)&&C(r.items[0])&&typeof r.items[0].turnKey=="string"&&!o.length&&o.push(...r.items.filter(C)),Array.isArray(r.entries)&&C(r.entries[0])&&typeof(r.entries[0].historyEntityKey??r.entries[0].turnId)=="string"&&!n.length&&n.push(...r.entries.filter(C))),Yr(t.child??null,e+1,o,n),Yr(t.sibling??null,e,o,n)}function om(t,e){let o=typeof e.turnId=="string"?e.turnId:"",n=typeof e.turnKey=="string"?e.turnKey:"";return t.find(r=>{let i=typeof r.turnKey=="string"?r.turnKey:"";return!!i&&(o===i||n.endsWith(i)||n.includes(i))})??null}function nm(t){let e=X("[data-thread-find-target='conversation']")??X(c.timelineScroll);if(!e)return;let o=[],n=[];try{Yr(em(e),0,o,n)}catch(u){jr.warn("Fiber walk failed",u);return}if(!n.length&&!o.length)return;let r=n.length?n:o,i=typeof r[0]?.conversationId=="string"?r[0].conversationId:t,a=Ys(i);a.title=uo(t)??uo(i)??a.title;for(let u of r){let l="";typeof u.turnId=="string"?l=u.turnId:typeof u.turnKey=="string"&&(l=u.turnKey.replace(/^.*turn:/,""));let d=typeof u.historyEntityKey=="string"?u.historyEntityKey:l?`turn:${l}`:"",m=om(o,u),g=_u(m?.getLabel??u.getLabel),T=tm(m?.getPreview??u.getPreview),f=typeof u.timestampSeparatorAtMs=="number"?u.timestampSeparatorAtMs:null;d&&g&&(Gr(a,Kr(d,"user",g,f)),f&&a.times.set(d,f)),l&&T&&Gr(a,Kr(`${l}:assistant`,"assistant",T,f))}js(a)}function rm(t){if($u(t.role))return t.role;let e=typeof t.type=="string"?t.type:typeof t.itemType=="string"?t.itemType:"";return/user/i.test(e)?"user":/agent|assistant/i.test(e)?"assistant":null}function im(t){return typeof t.text=="string"?t.text:typeof t.content=="string"?t.content:C(t.content)&&typeof t.content.text=="string"?t.content.text:""}function Fr(t,e){if(!t||!C(e))return;let o=typeof e.id=="string"?e.id:typeof e.itemId=="string"?e.itemId:"",n=rm(e),r=im(e);if(!o||!n)return;let i=Ys(t);Gr(i,Kr(o,n,r)),js(i)}function am(t){let e=t.params?.thread,o=t.params?.threadId??(C(e)&&typeof e.id=="string"?e.id:void 0);t.params?.item&&Fr(o,t.params.item);for(let n of t.params?.items??[])Fr(o,n);if(C(e)&&Array.isArray(e.items))for(let n of e.items)Fr(o,n)}ro.on("note",am);var sm=["data-turn","data-message-author-role"],lm=/:(user|assistant)$/,Qr=`${c.messageUnit}, ${c.oldMessage}`,bn=t=>t==="user"||t==="assistant",Vs=()=>!!document.querySelector(c.timelineScroll),Js=()=>!!X(c.timelineScroll),Zs=()=>v()??document.querySelector(c.composerConversation)?.getAttribute("data-above-composer-conversation-id")??"",yn=()=>Vs()?X(c.timelineScroll):document;function go(){if(Vs())return X(c.timelineScroll);let t=document.querySelector(c.turn);for(let e=t?.parentElement;e;e=e.parentElement){let{overflowY:o}=getComputedStyle(e);if((o==="auto"||o==="scroll")&&e.scrollHeight>e.clientHeight)return e}return document.scrollingElement}var jt=t=>{let e=t.getAttribute("data-chatgpt-search-unit-key")?.match(lm)?.[1];return bn(e)?e:t.matches(c.userBubble)?"user":t.matches(c.assistantReply)||t.matches(c.assistantMarkdown)?"assistant":null},Xs=t=>{let e=[...t.querySelectorAll(c.searchUnit)].filter(n=>jt(n)&&!n.parentElement?.closest(c.searchUnit));return e.length?e:[...t.querySelectorAll(`${c.userBubble}, ${c.assistantReply}`)].filter(n=>jt(n)&&!n.parentElement?.closest(`${c.userBubble}, ${c.assistantReply}`))},Qs=t=>(t.getAttribute("data-chatgpt-search-message-ids")??t.getAttribute("data-message-id")??t.getAttribute("data-response-annotation-target"))?.split(/\s+/).filter(Boolean)??[];function fo(t){let e=Qs(t);if(e.length)return e;let o=[...new Set([...t.querySelectorAll(Qr)].flatMap(Qs))];if(o.length)return o;let n=t.closest("[data-turn-key]")?.getAttribute("data-turn-key")?.replace(/^history-content:/,"");return n&&jt(t)==="user"?[n]:[]}function Ce(t=yn()){if(!t)return[];let e=Xs(t);return e.length?e:[...t.querySelectorAll(Qr)].filter(o=>!o.parentElement?.closest(Qr))}function cm(t,e){for(let o=t.length-1;o>=0;o--){let n=e.find(r=>r.id===t[o]);if(n)return n.role}return null}function dm(t){for(let e of sm){let o=t.getAttribute(e)??t.querySelector(`[${e}]`)?.getAttribute(e);if(bn(o))return o}return t.querySelector(c.markdown)||t.querySelector(c.generatedImage)?"assistant":null}var um=t=>!t.parentElement?.closest(c.turn);function Qt(){let t=Ct(v())?.chain??[];return[...yn()?.querySelectorAll(c.turn)??[]].filter(um).flatMap(o=>{let n=Xs(o),r=n.length?n.map(i=>({el:i,known:jt(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=d=>!n.some(m=>m.contains(d))&&y(d.textContent??""),a=[...o.querySelectorAll(c.assistantMarkdown)].find(d=>i(d)&&!hn.test(y(d.textContent??""))),u=[...o.querySelectorAll(c.activityHeader)].findLast(i),l=a??u;l&&r.push({el:l,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?fo(o):Ce(o).flatMap(fo),a=n??dm(o)??cm(i,t)??(r%2?"assistant":"user"),u=o.closest(c.turn)??o,l=!o.closest(c.searchUnit)&&!!u.querySelector(c.turnBusy),d=a==="assistant"&&(o.matches(c.turnBusy)||!!o.querySelector(c.turnBusy)||l);return{el:o,role:a,messageIds:i,streaming:d}})}var mm="[data-bloom], .sr-only",$s=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,hn=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,Ws=new WeakMap;function Le(t){let o=(t.el.closest(c.turn)??t.el).textContent?.length??0,n=Ws.get(t.el);if(n?.length===o)return n.summary;let r=pm(t);return Ws.set(t.el,{length:o,summary:r}),r}function zs(t){let e=new Set,o=[];for(let n of t.querySelectorAll(c.assistantMarkdown)){if(n.closest(c.searchUnit))continue;let r=y(n.textContent??"");!r||hn.test(r)||$s.test(r)||e.has(r)||(e.add(r),o.push(r))}return o}function pm(t){let e=t.el.querySelectorAll(c.generatedImage).length;if(t.role==="assistant"&&e)return e>1?`Image \xD7${e}`:"Image";let o=t.el.closest(c.turn);if(t.role==="assistant"&&o&&t.el.matches(c.assistantMarkdown)&&!t.el.closest(c.searchUnit)){let l=zs(o);if(l.length)return l.join(" \xB7 ")}let n=t.el.querySelector(t.role==="assistant"?`${c.markdown}, ${c.assistantMarkdown}`:".whitespace-pre-wrap")??t.el,i=[...n.querySelectorAll(mm)].map(l=>y(l.textContent??"")).filter(Boolean).reduce((l,d)=>l.replace(d,`
`),n.innerText||n.textContent||""),a=i.split(`
`).map(y).filter(l=>l&&!$s.test(l)&&!hn.test(l));if(a.length)return a.join(" ");if(t.role==="assistant"&&o){let l=zs(o);if(l.length)return l.join(" \xB7 ")}let u=i.split(`
`).map(y).filter(l=>hn.test(l));return u.length?u.at(-1)??"":t.role==="user"&&t.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function vn(t){return t.text?y(t.text):t.imageCount?t.imageCount>1?`Image \xD7${t.imageCount}`:"Image":t.hasFiles?"File":""}var Wr=t=>t.matches(c.timelineScroll)&&getComputedStyle(t).flexDirection==="column-reverse";var fm=80,gm=420;function zr(t,e,o){return(t.x-o.x)*(e.y-o.y)-(e.x-o.x)*(t.y-o.y)}function hm(t,e,o,n){let r=zr(t,e,o),i=zr(t,o,n),a=zr(t,n,e);return!((r<0||i<0||a<0)&&(r>0||i>0||a>0))}function bm(t,e){let o=(e.left+e.right)/2-(t.left+t.right)/2,n=(e.top+e.bottom)/2-(t.top+t.bottom)/2;if(Math.abs(o)>=Math.abs(n)){let i=o<0?e.right:e.left;return[{x:i,y:e.top},{x:i,y:e.bottom}]}let r=n<0?e.bottom:e.top;return[{x:e.left,y:r},{x:e.right,y:r}]}function _s(t,e){let o=ot(t.x,e.left,e.right),n=ot(t.y,e.top,e.bottom);return Math.hypot(t.x-o,t.y-n)}function An(t){let e=t.closeDelay??fm,o=t.towardDelay??gm,n=0,r=!1,i=null,a=null,u=()=>{document.removeEventListener("pointermove",f,!0)},l=()=>{n&&window.clearTimeout(n),n=0,u(),i=null,a=null},d=()=>{l(),r&&(r=!1,t.setHeld(!1))},m=()=>{r||(r=!0,t.setHeld(!0))},g=q=>{n&&window.clearTimeout(n),n=window.setTimeout(d,q)},T=q=>{let V=t.panel(),$t=t.trigger();if(!V||!i)return!1;let J=V.getBoundingClientRect();if(J.width<=0&&J.height<=0)return!1;let Et=$t?.getBoundingClientRect(),[et,nr]=Et&&(Et.width||Et.height)?bm(Et,J):[{x:J.left,y:J.top},{x:J.right,y:J.bottom}];return hm(q,i,et,nr)?!0:a!=null&&_s(q,J)<_s(a,J)-.25},f=q=>{let V={x:q.clientX,y:q.clientY};if(t.over(q.target)){l();return}T(V)?g(o):d(),a=V};return{enter(){l()},leave(q){if(t.over(q.relatedTarget)){l();return}i={x:q.clientX,y:q.clientY},a=i,m(),document.addEventListener("pointermove",f,!0),g(e)},dispose(){l(),r=!1}}}var tl=`/*
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
`;var E=L("bloom-nav-"),Sn=80,vm=1200,Am=2,el=3e4,wm=200,xm=.9,Sm=.28,qm=24,ke=8,Em=80,Tm=12,Vr=80,il=`${c.rightPanel}, ${c.summaryPanel}`,Mm={user:"\u2753",assistant:"\u{1F916}"},Cm=["wheel","touchmove","pointerdown"],Tn=b({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),A=null,R=[],st=-1,de=-1,Be=null,ue="",Zr=0,Xr=[],vo=null,wn=null,xn=new Set,Lt,ho,kt,$r="",bo=[],qn=null,_r=new Set,Lm=t=>Tn.store.showAssistant||t.role==="user",km=t=>t.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||t.messageIds[0]||t.role;function Bm(t){return{role:t.role,summary:Le(t),ids:t.messageIds,turn:t,streaming:t.streaming}}function al(t,e){let o=t.entries.at(-1);if(o?.role==="assistant"&&e.role==="assistant"){t.entries[t.entries.length-1]={...e,ids:[...new Set([...o.ids,...e.ids])]};return}t.entries.push(e)}function Im(){let t=[];for(let e of Qt()){let o=Bm(e),n=km(e),r=t.at(-1),i=!e.el.closest("[data-turn-key]");r&&(r.key===n||i&&o.role==="assistant")?al(r,o):t.push({key:n,entries:[o]})}return t}function Pm(){let t=[];for(let e of Ct(v())?.chain??[]){let o={role:e.role,summary:vn(e),ids:[e.id],turn:null,streaming:!1},n=t.at(-1);e.role==="assistant"&&n?al(n,o):t.push({key:e.id,entries:[o]})}return t}var Ie=t=>t.entries.flatMap(e=>e.ids);function En(t,e){let o=new Set(Ie(t));return Ie(e).some(n=>o.has(n))}var me=t=>y(t.entries.find(e=>e.role==="user")?.summary??""),Jr=(t,e)=>t.filter(o=>me(o)===e).length,ti=t=>({...t,turn:null,streaming:!1});function Om(t,e){let o=new Set(e.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return t.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return ti(r);let a=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return a&&a!==n.key?ti(r):r})}))}function Rm(t,e){let o=e.entries.map((n,r)=>{let i=t.entries[r];if(!i)return n;let a=[...new Set([...n.ids,...i.ids])];return{...n,ids:a,summary:n.summary||i.summary}});for(let n of t.entries.slice(o.length))o.push(ti(n));return{key:t.key,entries:o}}function sl(){let t=go();if(!t)return!1;let e=t.clientHeight-t.scrollHeight;return t.scrollTop-e<=Math.abs(t.scrollTop)}function Hm(t,e){let o=Om(t,e).filter(l=>e.some(d=>d.key===l.key)||!e.some(d=>En(d,l)));if(!e.length)return o;if(!o.length)return e;let n=e.findIndex(l=>o.some(d=>d.key===l.key));if(n<0)return sl()?e.concat(o):o.concat(e);let r=e[n]?.key,i=o.findIndex(l=>l.key===r),a=o.slice(0,i).concat(e.slice(0,n),o.slice(i)),u=a.findIndex(l=>l.key===r);for(let l=n;l<e.length;l++){let d=e[l];if(!d)continue;let m=a.findIndex(g=>g.key===d.key);if(m>=0){let g=a[m];g&&(a[m]=Rm(g,d)),u=m}else a.splice(u+1,0,d),u++}return a}function Dm(t,e){let o=0,n=0,r=0;for(let i=1-t.length;i<e.length;i++){let a=0,u=0;for(let d=0;d<t.length;d++){let m=e[d+i],g=t[d];!m||!g||(En(g,m)?(a+=3,u++):me(g)&&me(g)===me(m)&&a++)}let l=sl()?i<r:i>r;(a>o||a===o&&u>n||a===o&&u===n&&l)&&(o=a,n=u,r=i)}return{score:o,offset:r}}function Nm(t,e){let o=t.entries.map((n,r)=>{let i=e.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of e.entries.slice(o.length))o.push({...n,turn:null});return{key:t.key,entries:o}}function Um(t){return t.map(e=>({key:e.key,entries:e.entries.map(o=>({...o}))}))}function Fm(t,e){if(!e.length)return t;if(!t.length)return e;let{score:o,offset:n}=Dm(t,e),r=Um(t);if(o>0)for(let u=0;u<r.length;u++){let l=e[u+n],d=r[u];if(!l||!d)continue;let m=me(d),g=!!m&&m===me(l)&&Jr(t,m)===1&&Jr(e,m)===1;(En(d,l)||g)&&(r[u]=Nm(d,l))}let i=[],a=[];for(let u=0;u<e.length;u++){let l=e[u];if(!l)continue;let d=me(l);!d||Jr(r,d)>0||r.some(m=>En(m,l))||(o>0&&u<n?i.push(l):a.push(l))}return i.concat(r,a)}var ei=t=>t.entries.some(e=>e.turn?.el.isConnected);function Km(t,e,o){let n=t.findIndex(i=>Ie(i).includes(e));if(n>=0)return n+1;let r=t.find(ei);return o&&r&&Ie(r).includes(o)?0:t.length}function Gm(t){if(qn){let{parent:e,user:o}=qn;for(let n of t.slice(Km(t,e,o))){let r=Ie(n);if(!ei(n)&&!(o&&r.includes(o)))for(let i of r)_r.add(i)}}return t.filter(e=>ei(e)||!Ie(e).some(o=>_r.has(o)))}function ll(){bo=[],qn=null,_r.clear()}function Ym(){let t=Zs();t!==$r&&($r=t,ll());let e=Im(),o=Pm();return!e.length&&!o.length&&!Js()?(bo=[],[]):(bo=Gm(Fm(Hm(bo,e),o)),bo.flatMap(n=>n.entries).filter(Lm))}function jm(t){for(let o of t)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!$().generating||t.some(o=>o.streaming))return;let e=t.at(-1);e&&(e.role==="assistant"||!Tn.store.showAssistant?e.streaming=!0:t.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function cl(){let t=Ym();return jm(t),t}function dl(t){let e=t.getBoundingClientRect(),o=it()?.getBoundingClientRect().top,n=Math.min(e.bottom,o&&o>e.top?o:e.bottom);return{top:e.top,bottom:n}}function ul(t){return((t.matches(".whitespace-pre-wrap, .markdown, .prose, [data-markdown-text-style]")?t:t.querySelector(".whitespace-pre-wrap")??t.querySelector(".markdown, .prose, [data-markdown-text-style]"))??t).getBoundingClientRect().top}function ol(t){let e=R[t]?.turn?.el;return e?.isConnected?e:null}function Qm(t){if(!R.length)return null;let e=t.scrollHeight-t.clientHeight,o=Wr(t),n=Math.min(t.scrollTop,0),r=o?-n:e-t.scrollTop,i=o?e+n:t.scrollTop,a=e<=ke||r<=ke,u=e>ke&&i<=ke,{top:l,bottom:d}=dl(t),m=ol(0),g=m?ul(m):Number.NaN,T=!!m&&g>=l-ke&&g<=l+48,f=ol(R.length-1),q=f?.getBoundingClientRect().bottom??Number.NaN,V=!!f&&q<=d+ke&&q>=d-Em;return a||V?"bottom":u||T?"top":null}function Wm(t){let{top:e,bottom:o}=dl(t),n=e+Math.max(o-e,0)*Sm,r=[],i=-1;if(R.forEach((u,l)=>{let d=u.turn?.el;if(!d?.isConnected){r.push(Number.NaN);return}let m=ul(d);r.push(m),i<0&&(i=l),m<=n&&(i=l)}),i<0)return Math.max(R.findIndex(u=>u.turn),0);let a=r[st];return Number.isFinite(a)?i===st?st:i>st?i:a<=n+qm?st:i:i}function zm(t){let e=Qm(t);return e==="bottom"?R.length-1:e==="top"?0:Wm(t)}function nl(t){Tn.store.jumpEffect==="border"&&(t.classList.add(E("flash")),setTimeout(()=>t.classList.remove(E("flash")),vm))}function Mn(t){let e=R[t],o=go();if(!e||!o)return;if(!e.turn&&!e.ids.length){de=t,yo(),o.scrollTo({top:Wr(o)?0:o.scrollHeight});return}de=t,Be=t?null:{chat:v(),first:e.ids[0],until:Date.now()+el},yo();let n=e.turn?.el;if(n?.isConnected){let d=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:d<o.clientHeight*Am?"smooth":"auto"}),nl(n);return}let r=R.findIndex(d=>d.turn),i=r>=0&&t<r?-1:1,a=++Zr,u=Date.now()+el,l=()=>{let d=go();if(a!==Zr||Date.now()>u||!d)return;R=cl();let m=R.find(T=>T.ids.some(f=>e.ids.includes(f)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),nl(m),de=R.findIndex(T=>T.turn?.el===m),yo();return}let g=d.scrollTop;d.scrollBy({top:i*d.clientHeight*xm,behavior:"instant"}),d.scrollTop===g?setTimeout(l,wm):requestAnimationFrame(l)};l()}function Vm(t,e){return s("button",{class:E("row"),attrs:{type:"button","data-index":String(e),"data-message-id":t.ids[0]??""},on:{click:()=>Mn(e)}},s("span",{text:Mm[t.role]}),s("span",{class:"bloom-truncate",text:gt(t.summary||"\u2026",Sn)}))}function Jm(t,e){let o=t.offsetWidth?e.width/t.offsetWidth:1;return e.left+(t.clientLeft+t.clientWidth)*o}function Zm(t){let e=1/0;for(let o of document.querySelectorAll(il)){if(!ht(o))continue;let n=o.getBoundingClientRect();n.width<Vr||n.height<Vr||n.left<t.left+Vr||n.left<e&&(e=n.left)}return Number.isFinite(e)?e:null}function rl(t){if(!A)return;let e=t.getBoundingClientRect(),o=it()?.getBoundingClientRect().top,r=Math.min(e.bottom,o&&o>e.top?o:e.bottom)-e.top,i=Math.min(Jm(t,e),Zm(e)??1/0);A.style.right=`${document.documentElement.clientWidth-i+Tm}px`,A.style.top=`${e.top}px`,A.style.height=r>1?`${r}px`:""}function Xm(){let t=go();if(R=cl(),!R.length||!t){kt?.dispose(),kt=void 0,A?.remove(),A=null,ue="";return}if(vo!==t){ho?.abort(),ho=new AbortController,t.addEventListener("scroll",Ht(yo),{passive:!0,signal:ho.signal});for(let n of Cm)t.addEventListener(n,pl,{passive:!0,signal:ho.signal});vo=t,Lt?.disconnect(),Lt=new ResizeObserver(()=>{t.isConnected&&rl(t)}),Lt.observe(t),wn=null,xn=new Set}let e=it();if(e&&e!==wn&&Lt&&(Lt.observe(e),wn=e),Lt)for(let n of document.querySelectorAll(il))xn.has(n)||(Lt.observe(n),xn.add(n));ep(),rl(t);let o=JSON.stringify(R.map(n=>[n.role,n.ids]));o!==ue?(ue=o,de=-1,_m(),Be&&Date.now()<Be.until&&Be.chat===v()&&R[0]?.ids[0]!==Be.first&&Mn(0)):$m(),yo()}function yo(){if(!A||!vo)return;st=de>=0?de:zm(vo),A.querySelectorAll(`.${E("tick")}`).forEach((e,o)=>e.classList.toggle(E("tick-current"),o===st)),A.querySelectorAll(`.${E("row")}`).forEach(e=>e.setAttribute("aria-current",String(Number(e.dataset.index)===st)));let t=A.querySelector(`.${E("toc-head")}`);t&&(t.textContent=`${st+1} / ${R.length}`)}function $m(){A?.querySelectorAll(`.${E("tick")}`).forEach((t,e)=>{let o=R[e],n=gt(o.summary,Sn);t.title!==n&&(t.title=n),t.classList.toggle(E("tick-streaming"),o.streaming)}),A?.querySelectorAll(`.${E("row")}`).forEach(t=>{let e=t.lastElementChild,o=gt(R[Number(t.dataset.index)].summary||"\u2026",Sn);e&&e.textContent!==o&&(e.textContent=o)})}function _m(){A?.querySelector(`.${E("rail")}`)?.replaceChildren(...R.map((e,o)=>s("button",{class:Go(E("tick"),E(`tick-${e.role}`),e.streaming&&E("tick-streaming"),o===st&&E("tick-current")),title:gt(e.summary,Sn),attrs:{type:"button","aria-label":`Jump to message ${o+1}`,"data-message-id":e.ids[0]??""},on:{click:()=>Mn(o)}}))),A?.querySelector(`.${E("toc-list")}`)?.replaceChildren(...R.map(Vm))}var xt=Ht(Xm);function oi(t){if(t===A)return;let e=t.__bloomNavStop;if(e&&e!==ni)try{e()}catch{}t.isConnected&&t!==A&&t.remove()}function ml(){let t=[...document.querySelectorAll('[data-bloom="navigator"]')];if(A&&!A.isConnected&&(A=null),A&&t.includes(A)){for(let e of t)oi(e);return}A=t[0]??null;for(let e of t.slice(1))oi(e)}function tp(){kt?.dispose(),kt=An({over:t=>t instanceof Node&&!!A?.contains(t),trigger:()=>A?.querySelector(`.${E("rail")}`),panel:()=>A?.querySelector(`.${E("toc")}`),setHeld:t=>A?.classList.toggle(E("open"),t)})}function ep(){ml(),A&&!A.querySelector(`.${E("rail")}`)&&(A.remove(),A=null,ue=""),A||(A=s("div",{class:`bloom-root ${E("root")}`,attrs:{"data-bloom":"navigator"},on:{pointerenter:()=>kt?.enter(),pointerleave:t=>kt?.leave(t)}},s("div",{class:E("rail")}),s("div",{class:E("bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:E("toc")},s("div",{class:E("toc-head")}),s("div",{class:E("toc-list")}))),ue=""),kt||tp(),A.isConnected||document.body.append(A),A.querySelector(`.${E("tick")}`)||(ue=""),A.__bloomNavStop=ni}function pl(){de=-1,Be=null,Zr++}function ni(){for(let t of Xr)t();Xr=[],ho?.abort(),Lt?.disconnect(),Lt=void 0,vo=null,wn=null,xn=new Set,removeEventListener("keydown",fl,!0),removeEventListener("resize",xt),kt?.dispose(),kt=void 0,A&&delete A.__bloomNavStop,A?.remove(),A=null,ue="",ll(),$r="";for(let t of document.querySelectorAll('[data-bloom="navigator"]'))oi(t)}var op=t=>!!t&&(t.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!t.closest("[contenteditable='true']"));function fl(t){if(!A||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey||op(document.activeElement)||X("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:st-1,ArrowDown:st+1,Home:0,End:R.length-1}[t.key];if(o==null){pl();return}o<0||o>=R.length||(t.preventDefault(),t.stopPropagation(),Mn(o))}var gl=h({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:Tn,styles:tl,start(){ml(),Xr=[M(t=>U(t)&&xt()),bt(xt),wt.on("conversation",xt),wt.on("generate-start",({parentId:t,userId:e})=>{t&&(qn={parent:t,user:e},xt())}),O.on("rise",xt),O.on("fall",xt)],addEventListener("keydown",fl,!0),addEventListener("resize",xt,{passive:!0}),xt()},stop:ni,onSettingsChange:xt});var hl=`/*
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
`;var Z=L("bloom-quotes-"),mi="BloomBetterQuotes",rp=40,Al=8,ip=1800,si=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,bl=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,pe=b({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),ri,ii,Pe,ai=!1,li=0,Cn=null,Ln=null,Bt=null;function pi(){return v()??"draft"}function Bn(){try{let t=JSON.parse(sessionStorage.getItem(mi)??"[]");return Array.isArray(t)?t.filter(e=>!!e&&typeof e=="object"&&typeof e.id=="string"&&typeof e.text=="string"&&!!e.text):[]}catch{return[]}}function fi(t){try{sessionStorage.setItem(mi,JSON.stringify(t.slice(-rp)))}catch{}}function Ao(t){return Bn().find(e=>e.id===t)?.text??""}function ap(t,e){let o=Bn().filter(n=>n.id!==t);o.push({id:t,text:e}),fi(o)}function ci(t=pi()){fi(Bn().filter(e=>e.id!==t)),kn()}function sp(t){let e=Ao("draft");if(!e||Ao(t))return;let o=Bn().filter(n=>n.id!=="draft");o.push({id:t,text:e}),fi(o)}function di(t){return`${t.getAttribute("aria-label")??""} ${t.getAttribute("title")??""}`}function lp(t){let e=di(t);return bl.test(e)&&!/quote|引用/.test(e)?!1:/quote|引用/.test(e)&&si.test(e)?!0:si.test(e)&&!bl.test(e)}function wl(t){let e=t.cloneNode(!0),o=[...e.querySelectorAll("button, [role='button']")],n=new Set(o.map(r=>r.getAttribute("aria-label")).filter(Boolean));for(let r of o)r.remove();for(let r of e.querySelectorAll("*"))!r.children.length&&n.has(y(r.textContent??""))&&r.remove();return y(e.textContent??"")}function cp(t){let e=it(),o=t.parentElement,n=0;for(;o&&o!==e&&n<5;){if(n++,o.matches(c.composerInput)||o.querySelector(c.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=wl(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function In(){let t=it();if(!t)return null;for(let e of t.querySelectorAll("button, [role='button']")){if(e.closest("[data-bloom]")||!lp(e))continue;let o=cp(e),n=o?wl(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:e}}return null}function dp(t){let e=t.closest(c.searchUnit)??t.closest(c.oldMessage);return e&&(jt(e)??e.getAttribute("data-message-author-role"))==="user"?e:null}function gi(t){return y(t).slice(0,48)}function up(t,e){let o=gi(t);if(o.length<Al)return null;let n=null;for(let r of Ce()){if(e&&(r===e||e.contains(r)||r.contains(e)))continue;let i=y(r.textContent??"");if(!i.includes(o))continue;let a=o.length/Math.max(i.length,1);(!n||a>n.score)&&(n={el:r,score:a})}return n?.el??null}function mp(t,e){let o=gi(e),n=t;for(let r of t.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&y(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${Z("hit")}`)?.classList.remove(Z("hit")),n.classList.add(Z("hit")),window.clearTimeout(li),li=window.setTimeout(()=>n.classList.remove(Z("hit")),ip)}function yl(t){let e=t.closest(c.timelineScroll)??document.scrollingElement;if(!(e instanceof HTMLElement)&&e!==document.scrollingElement)return;let o=t.getBoundingClientRect();if(o.height<1||!e)return;let n=e.getBoundingClientRect(),r=it()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,a=o.top+o.height/2-(n.top+i)/2;Math.abs(a)<8||e.scrollTo({top:e.scrollTop+a,behavior:"smooth"})}function hi(){if(!Bt||!Cn?.isConnected)return;let t=Cn.getBoundingClientRect();t.width<1||(Bt.style.top=`${Math.max(8,t.top+8)}px`,Bt.style.left=`${Math.max(8,t.right-Bt.offsetWidth-8)}px`)}function pp(t,e,o){Cn=t,Ln=e,Bt??=s("button",{class:`bloom-root ${Z("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),Bt.isConnected||document.body.append(Bt),mp(t,o),hi()}function vl(){Bt?.remove(),Bt=null,Cn=null,Ln=null,document.querySelector(`.${Z("hit")}`)?.classList.remove(Z("hit"))}function xl(){return document.querySelector('[data-bloom="quote-chip"]')}function kn(){xl()?.remove()}function fp(t){let o=it()?.getBoundingClientRect();!o||o.width<8||(t.style.width=`${Math.max(120,o.width-24)}px`,t.style.left=`${o.left+12}px`,t.style.top=`${Math.max(8,o.top-t.offsetHeight-8)}px`)}function gp(t){let e=xl();e||(e=s("div",{class:`bloom-root ${Z("chip")}`,attrs:{"data-bloom":"quote-chip"}},s("span",{class:Z("text")}),s("button",{class:Z("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(e));let o=e.querySelector(`.${Z("text")}`),n=y(t);o&&o.textContent!==n&&(o.textContent=n),e.dataset.text=t,fp(e)}function ui(){if(!ai){ai=!0;try{let t=pi(),e=In();pe.store.persistAcrossChats&&e&&Ao(t)!==e.text&&ap(t,e.text);let o=pe.store.persistAcrossChats?Ao(t):"";!o||e&&y(e.text)===y(o)?kn():gp(o),hi()}finally{ai=!1}}}function hp(t){let e=t.closest('[data-bloom="quote-chip"]');if(e instanceof HTMLElement&&!t.closest(`.${Z("x")}`)){let i=e.dataset.text??e.querySelector(`.${Z("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:e}:null}let o=t.closest("blockquote");if(o instanceof HTMLElement&&!t.closest("a, button")){let i=dp(o),a=y(o.textContent??"");if(i&&a)return{text:a,skip:i,origin:o}}let n=it();if(!n||!n.contains(t)||no(t)||t.closest("button, [role='button']"))return null;let r=In();return!r||!r.row.contains(t)?null:{text:r.text,skip:null,origin:r.row}}function bp(t){let{target:e}=t;if(!(e instanceof Element))return;if(e.closest('[data-bloom="quote-back"]')){t.preventDefault(),t.stopPropagation(),Ln?.isConnected&&yl(Ln);return}if(e.closest(`.${Z("x")}`)){t.preventDefault(),t.stopPropagation(),ci();return}let o=In();if(o&&(e===o.dismiss||o.dismiss.contains(e))){ci();return}if(yp(e)&&Sl(),!pe.store.jumpToPassage)return;let n=hp(e);if(!n)return;let r=up(n.text,n.skip);r&&(t.preventDefault(),t.stopPropagation(),pp(r,n.origin,n.text),yl(r))}function yp(t){let e=t.closest("button, [role='button']");return!(e instanceof HTMLElement)||e.closest("[data-bloom]")||!it()?.contains(e)?!1:/send|submit|发送|提交/i.test(di(e))&&!si.test(di(e))}function vp(t){return!(t instanceof KeyboardEvent)||t.key!=="Enter"||t.shiftKey||t.isComposing?!1:no(t.target)}function Sl(){if(!pe.store.persistAcrossChats)return;let t=pi(),e=Ao(t);if(e){if(!In()){let o=Q(),n=gi(e);n.length>=Al&&!y(o).includes(n)&&Mt(`> ${e}

${o}`.trim())}ci(t)}}function Ap(t){vp(t)&&Sl()}function wp(t){!t.prevId&&t.id&&sp(t.id),ui()}var ql=h({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:pe,styles:hl,onSettingsChange(t){t==="jumpToPassage"&&!pe.store.jumpToPassage&&vl(),t==="persistAcrossChats"&&!pe.store.persistAcrossChats&&(sessionStorage.removeItem(mi),kn()),ui()},start(){Pe=new AbortController,document.addEventListener("pointerdown",bp,{capture:!0,signal:Pe.signal}),document.addEventListener("keydown",Ap,{capture:!0,signal:Pe.signal}),addEventListener("scroll",hi,{capture:!0,passive:!0,signal:Pe.signal}),ii=bt(wp),ri=M(t=>U(t)&&ui())},stop(){Pe?.abort(),Pe=void 0,ii?.(),ii=void 0,ri?.(),ri=void 0,window.clearTimeout(li),vl(),kn()}});var El=`/*
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
`;var Sp="[data-app-action-sidebar-thread-row]{position:relative}[data-app-action-sidebar-thread-row]>[data-bloom=cls]{position:absolute;inset-inline-end:0.25rem;top:50%;width:0.875rem;height:0.875rem;margin:0;transform:translateY(-50%);pointer-events:none}",qp=L("bloom-cls"),Ep="bloom-cls",Tp=600*1e3,yi=Je("tab"),Re=new Map,wo=new Map,Oe=null,Tl=[],Mp=t=>t==="streaming"||t==="error";function Cp(){let t=new Map,e=Date.now();for(let[o,n]of wo)e-n.at>Tp?wo.delete(o):t.set(o,n.status);for(let[o,n]of Re)t.set(o,n);return t}function Lp(t){return s("span",{class:`bloom-root ${qp("",`-${t}`)}`,attrs:{"data-bloom":"cls","data-status":t,"aria-label":t==="error"?"Error":"Generating"}},t==="error"&&k("alert"))}function On(){let t=Cp(),e=new Set;for(let[o,n]of t)for(let r of co(o)){if(!yt(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){e.add(i);continue}i?.remove();let a=Lp(n);e.add(a),r.append(a)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))e.has(o)||o.remove()}function Pn(t,e){t&&(e?Re.set(t,e):Re.delete(t),Oe?.postMessage({tab:yi,id:t,status:e}),On())}function kp({data:t}){!C(t)||typeof t.id!="string"||typeof t.tab!="string"||t.tab===yi||(Mp(t.status)?wo.set(t.id,{status:t.status,tab:t.tab,at:Date.now()}):wo.delete(t.id),On())}function bi(){for(let t of Re.keys())Oe?.postMessage({tab:yi,id:t,status:null})}var Ml=h({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:()=>`${El}${Sp}`,start(){for(let t of document.querySelectorAll('[data-bloom="cls"]'))t.remove();Oe=typeof BroadcastChannel=="function"?new BroadcastChannel(Ep):null,Oe?.addEventListener("message",kp),addEventListener("pagehide",bi),Tl=[O.on("rise",({conversationId:t})=>Pn(t,"streaming")),O.on("fall",({conversationId:t,outcome:e})=>Pn(t,e==="error"?"error":null)),O.on("context",({prevId:t,id:e,migrated:o})=>{o&&$().generating?Pn(e,"streaming"):!o&&Re.get(t??"")==="streaming"&&Pn(t,null)}),M(t=>U(t)&&On())],v()&&On()},stop(){for(let t of Tl)t();bi(),Oe?.close(),Oe=null,removeEventListener("pagehide",bi),Re.clear(),wo.clear();for(let t of document.querySelectorAll('[data-bloom="cls"]'))t.remove()}});var Wt="data-bloom-invite",Bp=/^(?:invite team members|invite members|邀请团队成员|邀请成员)$/i,Cl=':is(button, a:not([href^="/c/"])):not(main *, [role="dialog"] *)',Ip={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${c.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])'],hideInvite:[`[${Wt}]`,`div:has(> [${Wt}]:only-child)`]},Ll=b({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0},hideInvite:{type:"boolean",description:"Hide Invite team members in the sidebar.",default:!0}}),Rn,vi=!1;function Pp(t){if(U(t))for(let e of document.querySelectorAll(`${Cl}, [${Wt}]`))!e.matches(Cl)||!Bp.test(y(e.textContent??""))?e.removeAttribute(Wt):e.hasAttribute(Wt)||e.setAttribute(Wt,"")}var kl=h({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads, notices and Invite team members.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:Ll,styles:()=>Rt(Object.entries(Ip).flatMap(([t,e])=>Ll.store[t]?e:[])),start(){vi=!0,Ft().then(()=>{vi&&!Rn&&(Rn=M(Pp))})},stop(){vi=!1,Rn?.(),Rn=void 0;for(let t of document.querySelectorAll(`[${Wt}]`))t.removeAttribute(Wt)}});var He=`form:has(:is(${c.composerInput})), ${c.oldComposerForm}`,Hn='[class*="ComposerLayoutBody"]',wi='[class*="ComposerLayoutRoot"]',Op='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',Rp=`:is(${He}) ${Hn}, :is(${He}):not(:has(${Hn})) ${wi}, :is(${He}):not(:has(${Hn})):not(:has(${wi})) :is(${Op})`,Hp='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',Dp='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',Np="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))",Up="var(--color-background-composer-surface, var(--composer-background-color, var(--color-bg-primary, Canvas)))",Fp="composer-fill",Bl=b({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function Kp(){let{opacity:t,blur:e}=Bl.store;if(t>=100)return"";{let i=`color-mix(in srgb, ${Up} ${t}%, transparent)`;return`[class*="ComposerLayoutRoot"], [data-composer-layout], [data-chatgpt-composer]{--composer-layout-surface-background:${i}!important;--composer-background-color:${i}!important;--composer-layout-surface-backdrop-filter:blur(${e}px)!important}`}let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${Np} ${t}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${e}px)!important;-webkit-backdrop-filter:blur(${e}px)!important`;return`:is(${Hp}), :is(${He}){${o}}:is(${Dp}){display:none!important}${Rp}{${n}}:is(${He}):has(${Hn}) ${wi}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${He}) :is(${c.composerInput}){background-color:transparent!important}`}function Ai(){for(let t of document.querySelectorAll(`[data-bloom="${Fp}"]`))t.remove()}var Il=h({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:Bl,styles:Kp,start(){Ai()},stop(){Ai()},onSettingsChange(){Ai()}});var Gp=1200,Yp=8e3,jp=150,Qp=20,Pl=6,qi="continue where you left",Wp=/message delivery timed out|please try again/i,Ol=/waiting for the complete answer/i,Rl=b({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:qi,placeholder:qi}}),xi=[],Nn=0,xo=!1,So=0,Ne="",Dn="",Ei=0,Ue=!1,qo=!1,Un=!0,De="",Ti=0,Fn=!1,zp=()=>Rl.store.prompt.trim()||qi;function Hl(){return(X(c.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function Dl(){let t=Hl();return!t||Ol.test(t)||!Wp.test(t)?"":t}function Vp(){let t=Hl();return t&&Ol.test(t)?t:""}function Jp(){let t=yn()?.querySelectorAll(c.turn),e=t?.[t.length-1];return`${e?.getAttribute("data-turn-key")??""}:${e?.textContent?.length??0}`}function Nl(t,e,o){if(o===Nn){if($().generating||Q()!==t||e>=Qp){Ue=!1,$().generating||(Ne="");return}za(),setTimeout(()=>Nl(t,e+1,o),jp)}}function Zp(t){let e=Nn;if($().generating||Q()&&Q()!==t){Ue=!1,Ne="";return}Mt(t),Fn=!0,ar(()=>{e===Nn&&Nl(t,0,e)})}function Ul(t){return t===Ne||So>=Pl||$().generating||Q()?!1:(Ne=t,So+=1,Ue=!0,Zp(zp()),!0)}function Xp(){if(xo||Ue||qo)return;let t=Date.now(),e=Dl();if(e){if(De="",e!==Dn){Dn=e,Ei=t;return}if(t-Ei<Gp)return;Ul(`${v()??""}:${e}`);return}if(Dn="",!Vp()){Un=!0,De="";return}if(!Un||!$().generating||Q())return;let n=`${v()??""}:${Jp()}`;if(n!==De){De=n,Ti=t;return}if(t-Ti<Yp||So>=Pl)return;let r=hr();r&&(qo=!0,r.click())}function Si(){Nn+=1,xo=!1,So=0,Ne="",Dn="",Ei=0,Ue=!1,qo=!1,Un=!0,De="",Ti=0,Fn=!1}var Fl=h({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:Rl,start(){Si(),xi=[O.on("rise",()=>{xo=!1,Ne="",Ue=!1,Fn&&(Fn=!1,Un=!1,De="")}),O.on("fall",({outcome:t})=>{if(qo){qo=!1,t==="left"?xo=!0:Ul(`${v()??""}:stall`);return}(t==="stopped"||t==="left")&&(xo=!0),t==="done"&&!Dl()&&(So=0)}),O.on("context",({migrated:t})=>{t||Si()}),O.on("tick",Xp)]},stop(){for(let t of xi)t();xi=[],Si()}});var It=L("bloom-csi-"),$p=256,_p=160,Kn=1,Kl=4,tf=.1,ef=.0015,of=250;function nf(t){return new Promise((e,o)=>{let n=new FileReader;n.onload=()=>e(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(t)})}function rf(t){return new Promise((e,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>e(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=t})}function af(t,e){let o=Math.max(1/t.naturalWidth,1/t.naturalHeight)*e.zoom,n=1/(2*t.naturalWidth*o),r=1/(2*t.naturalHeight*o);return{zoom:e.zoom,x:ot(e.x,n,1-n),y:ot(e.y,r,1-r)}}function Gl(t,e,o){let n=t.width,r=t.getContext("2d");if(!r)return;let i=Math.max(n/e.naturalWidth,n/e.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(e,n/2-o.x*e.naturalWidth*i,n/2-o.y*e.naturalHeight*i,e.naturalWidth*i,e.naturalHeight*i)}function sf(t,e){let o=s("canvas");return o.width=o.height=$p,Gl(o,t,e),o.toDataURL("image/png")}function Yl(t){let e=null,o={x:j.store.cropX,y:j.store.cropY,zoom:j.store.cropZoom},n,r=s("canvas",{class:It("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=_p*devicePixelRatio;let i=s("div",{class:`bloom-muted ${It("status")}`}),a=s("div",{class:It("zoom")}),u=s("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(f,q=!0){e&&(o=af(e,f),Gl(r,e,o),q&&(clearTimeout(n),n=setTimeout(()=>{e&&(j.store.cropX=o.x,j.store.cropY=o.y,j.store.cropZoom=o.zoom,j.store.avatarUrl=sf(e,o))},of)))}function d(){a.replaceChildren(sn(o.zoom,Kn,Kl,tf,"\xD7",f=>l({...o,zoom:f})))}async function m(f,q){i.textContent="";try{e=await rf(f),q&&(j.store.avatarSource=f,o={x:.5,y:.5,zoom:Kn}),t.classList.add(It("has-image")),d(),l(o,q)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let g=f=>{f?.type.startsWith("image/")&&nf(f).then(q=>m(q,!0))};u.addEventListener("change",()=>g(u.files?.[0])),r.addEventListener("wheel",f=>{e&&(f.preventDefault(),l({...o,zoom:ot(o.zoom*(1-f.deltaY*ef),Kn,Kl)}),d())},{passive:!1}),r.addEventListener("pointerdown",f=>{if(!e)return;r.setPointerCapture(f.pointerId);let q={...o},V=r.getBoundingClientRect(),$t=J=>{if(!e)return;let Et=Math.max(V.width/e.naturalWidth,V.height/e.naturalHeight)*o.zoom;l({...o,x:q.x-(J.clientX-f.clientX)/(e.naturalWidth*Et),y:q.y-(J.clientY-f.clientY)/(e.naturalHeight*Et)})};r.addEventListener("pointermove",$t),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",$t),{once:!0})});let T=s("div",{class:It("cropper"),attrs:{tabindex:"0"},on:{paste:f=>g([...f.clipboardData?.files??[]].find(q=>q.type.startsWith("image/"))),dragover:f=>f.preventDefault(),drop:f=>{f.preventDefault(),g(f.dataTransfer?.files[0])}}},s("div",{class:It("stage")},r),s("div",{class:It("controls")},so("",f=>f.trim()&&void m(f.trim(),!0),"https://\u2026 or data:image/\u2026","url"),s("div",{class:It("buttons")},H("Choose file",()=>u.click()),H("Reset crop",()=>{l({x:.5,y:.5,zoom:Kn}),d()}),H("Clear",()=>{e=null,t.classList.remove(It("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),a.replaceChildren(),j.store.avatarUrl="",j.store.avatarSource=""},"danger")),a,i,u));return t.append(T),j.store.avatarSource&&m(j.store.avatarSource,!1),()=>{clearTimeout(n),t.replaceChildren()}}var jl=`/*
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
`;var Eo="data-bloom-csi-avatar",Mi="data-bloom-csi-sized",Vl="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",cf=32,j=b({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:t=>Yl(t)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),Ql=[];function Jl(t){t.removeAttribute(Eo),t.removeAttribute(Mi)}function Wl(t){return(j.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${t}]`)])}function zl(t=[]){if(!U(t))return;let e=j.store.displayName.trim()||null,o=!!j.store.avatarUrl,n=new Set(e?Wl("name"):[]);for(let i of document.querySelectorAll(Vl))n.has(i)||te(i,null);for(let i of n)te(i,e);let r=new Set(o?Wl("avatar"):[]);for(let i of document.querySelectorAll(`[${Eo}]`))r.has(i)||Jl(i);for(let i of r)i.hasAttribute(Eo)||i.setAttribute(Eo,""),i.toggleAttribute(Mi,!i.closest('[role="menu"]'))}function df(){let t=j.store.avatarUrl;return t?`:root{--bloom-csi-url:url("${t.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${j.store.avatarSize}px}:is(${c.rail}, ${c.oldRail}) [${Mi}]{--bloom-csi-size:${cf}px}`:""}var Zl=h({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:j,styles:()=>`${df()}
${jl}`,start(){Ql=[At(),M(zl)]},stop(){for(let t of Ql)t();for(let t of document.querySelectorAll(`[${Eo}]`))Jl(t);for(let t of document.querySelectorAll(Vl))te(t,null)},onSettingsChange(){zl()}});var Fe=L("bloom-greeting-"),Xl=30,$l=100;function _l(t){let e=-1,o=s("textarea",{class:`bloom-input ${Fe("input")}`,attrs:{maxlength:String($l),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=H("Add",i),r=s("div",{class:Fe("list")});function i(){let l=o.value.trim().slice(0,$l);if(!l)return;let d=[...B.store.greetings];e>=0?d[e]=l:d.length<Xl&&d.push(l),B.store.greetings=d,e=-1,o.value="",a()}function a(){let{greetings:l}=B.store;n.textContent=e>=0?"Save":"Add",n.disabled=e<0&&l.length>=Xl,r.replaceChildren(...l.length?l.map((d,m)=>s("div",{class:Fe("row",m===e?"row-editing":"row-idle")},s("div",{class:Fe("text"),text:d}),Y("edit","Edit",()=>{e=m,o.value=d,o.focus(),a()}),Y("trash","Delete",()=>{B.store.greetings=l.filter((g,T)=>T!==m),e===m&&(e=-1),a()}))):[s("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),t.append(s("div",{class:Fe("editor")},r,s("div",{class:Fe("form")},o,n))),a();let u=Ae((l,d)=>l==="GreetingCustomizer"&&d==="greetings"&&a());return()=>{u(),t.replaceChildren()}}var tc=`/*
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
`;var Yn="data-bloom-greeting",mf=1e3,pf=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],B=b({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:t=>_l(t)},greetings:{type:"custom",default:pf},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),Gn,ec=[],Ci,Lo=()=>an()&&!ee(),ff=t=>t.replaceAll(/\s*\n\s*/g," ").trim(),nc=()=>B.store.greetings.filter(t=>typeof t=="string"&&t.trim());function ko(){let t=nc();if(t.length)if(B.store.order==="random"&&t.length>1){let e=B.store.lastRandom;for(;e===B.store.lastRandom;)e=Math.floor(Math.random()*t.length);B.store.lastRandom=e,B.store.index=e}else B.store.index=(B.store.index+1)%t.length}function gf(){return Lo()?X(c.homeHeading):null}function To(){for(let t of document.querySelectorAll(`[${Yn}]`))t.removeAttribute(Yn),te(t,null)}function Mo(){for(let t of document.querySelectorAll("[data-bloom-placeholder]"))t.removeAttribute("data-bloom-placeholder")}function oc(t){let e=mt(),o=ff(t);if(!e||!o||Q(e)){Mo();return}e.getAttribute("data-bloom-placeholder")!==o&&e.setAttribute("data-bloom-placeholder",o)}function Co(){let t=nc(),e=Za(),o=Lo();if(!t.length||!e&&!o){To(),Mo();return}if(e){To(),oc(t[0]??"");return}let n=gf();n?((B.store.index<0||B.store.index>=t.length)&&ko(),n.setAttribute(Yn,""),te(n,t[Math.max(0,B.store.index)%t.length]??"")):To(),B.store.heroOnlyOutsideProject?Mo():oc(t[Math.max(0,B.store.index)%t.length]??"")}function Li(){clearInterval(Gn),Gn=void 0,B.store.mode==="interval"&&Lo()&&(Gn=setInterval(()=>{ko(),Co()},B.store.intervalSec*mf))}function hf(t){B.store.mode!=="manual"||!(t.target instanceof Element)||!t.target.closest(`[${Yn}]`)||getSelection()?.toString()||(ko(),Co())}function bf(){Lo()&&B.store.mode==="refresh"&&ko(),Li(),Co()}var rc=h({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:B,styles:tc,start(){To(),Mo(),Ci=new AbortController,document.addEventListener("click",hf,{signal:Ci.signal}),Lo()&&B.store.mode==="refresh"&&ko(),Li(),ec=[M(t=>U(t)&&Co()),bt(bf)]},stop(){Ci?.abort();for(let t of ec)t();clearInterval(Gn),To(),Mo()},onSettingsChange(t){(t==="mode"||t==="intervalSec")&&Li(),Co()}});var Bo=L("bloom-history-"),ki=10,yf=3e3;function Bi(t,e){let o="",n=0,r=new Set,i=s("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),a=s("div",{class:Bo("list")}),u=s("div",{class:Bo("pager")}),l,d=H("Clear all",()=>{if(!l){d.textContent="Click again to clear",l=setTimeout(()=>{l=void 0,d.textContent="Clear all"},yf);return}clearTimeout(l),l=void 0,d.textContent="Clear all",Io([])},"danger");function m(){let T=[...fe.store.entries].toReversed(),f=o.trim().toLowerCase(),q=f?T.filter(et=>et.toLowerCase().includes(f)):T,V=Math.max(1,Math.ceil(q.length/ki));n=Math.min(n,V-1);let $t=q.slice(n*ki,(n+1)*ki).map(et=>s("div",{class:Bo("row")},s("button",{class:Bo("text",r.has(et)?"text-open":"text-closed"),text:et,title:r.has(et)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{r.delete(et)||r.add(et),m()}}}),e&&Y("edit","Use",()=>e(et)),Y("copy","Copy",()=>void No(et)),Y("trash","Delete",()=>Io(fe.store.entries.filter(nr=>nr!==et)))));a.replaceChildren(...$t.length?$t:[s("div",{class:"bloom-muted",text:f?"No matching prompts.":"No saved prompts yet."})]),u.replaceChildren(s("span",{class:"bloom-muted",text:`${q.length} ${f?"matching":"saved"} \xB7 page ${n+1} of ${V}`}),H("Previous",()=>{n--,m()}),H("Next",()=>{n++,m()}),d);let[J,Et]=u.querySelectorAll("button");J.disabled=n===0,Et.disabled=n>=V-1,d.disabled=!T.length}i.addEventListener("input",()=>{o=i.value,n=0,m()}),t.append(s("div",{class:Bo("manager")},i,a,u)),m();let g=Ae((T,f)=>T==="InputHistory"&&f==="entries"&&m());return()=>{g(),clearTimeout(l),t.replaceChildren()}}var ic=`/*
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
`;var Pt=L("bloom-history-"),Af=2e3,fe=b({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:t=>Bi(t)},entries:{type:"custom",default:[]}}),D=null,Ii={text:"",at:0},St=null,zt=null,Pi,Ge=()=>fe.store.entries.filter(t=>typeof t=="string");function Io(t){fe.store.entries=t.slice(-fe.store.maxEntries)}function Oi(t){let e=t.trim();if(!e)return;let o=Date.now();e===Ii.text&&o-Ii.at<Af||(Ii={text:e,at:o},Io([...Ge().filter(n=>n!==e),e]))}function ac(t){t.preventDefault()}function wf(){let t=s("button",{class:Pt("hud-count"),attrs:{type:"button"},on:{mousedown:ac,click:Ef}}),e=s("button",{class:Pt("hud-x"),text:"\xD7",attrs:{type:"button","aria-label":"Exit history"},on:{mousedown:ac,click:xf}});return s("div",{class:`bloom-root ${Pt("hud")}`,attrs:{"data-bloom":"history-hud",role:"group","aria-live":"polite","aria-label":"Input history"}},t,e)}function sc(t,e){let o=mt();if(!o||zt)return;St??=wf();let n=`${t+1} / ${e}`,r=St.querySelector(`.${Pt("hud-count")}`);r?.replaceChildren(n),r?.setAttribute("aria-label",`Show input history (${n})`);let i=(o.closest("form")??o).getBoundingClientRect();St.style.left=`${i.left+i.width/2}px`,St.style.top=`${i.top}px`,St.isConnected||document.body.append(St)}function Ke(){D=null,St?.remove()}function xf(){D&&Mt(D.draft),Ke(),mt()?.focus()}function lc(t){let e=Ge();if(!D)return;let o=e[t];D.index=t,D.shown=o,Mt(o),sc(e.length-1-t,e.length)}function Sf(t){let e=Ge();if(!e.length)return!1;if(!D){if(t===1)return!1;D={index:e.length,draft:Q(),shown:""}}let o=D.index+t;return o<0?!0:o>=e.length?(Mt(D.draft),Ke(),!0):(lc(o),!0)}function qf(t){let e=Ge().indexOf(t);Po(),!(e<0)&&(D??={index:e,draft:Q(),shown:""},lc(e),mt()?.focus())}function Po(){if(!zt)return;zt.release(),zt.controller.abort(),zt.root.remove(),zt=null;let t=Ge();D&&t[D.index]===D.shown?sc(t.length-1-D.index,t.length):D=null}function Ef(){if(zt)return;St?.remove();let t=s("div",{class:Pt("dialog-body")}),e=s("div",{class:`bloom-root ${Pt("backdrop")}`,attrs:{"data-bloom":"history-dialog"},on:{click:n=>n.target===n.currentTarget&&Po()}},s("div",{class:Pt("dialog"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Input history"}},s("div",{class:Pt("dialog-header")},s("h2",{class:Pt("dialog-title"),text:"Input history"}),Y("close","Close",Po)),t));e.addEventListener("keydown",n=>n.stopPropagation());let o=new AbortController;document.addEventListener("keydown",n=>{n.key==="Escape"&&(n.preventDefault(),n.stopPropagation(),Po())},{capture:!0,signal:o.signal}),vt(e),zt={root:e,release:Bi(t,qf),controller:o},t.querySelector("input")?.focus()}function cc(t){return no(t)?t:t instanceof HTMLElement?t.closest(c.composerInput):null}function Tf(){if(mt()?.closest("[data-chatgpt-composer], [data-composer-input], form")?.querySelector('[aria-expanded="true"]'))return!0;for(let e of document.querySelectorAll('[role="listbox"], [role="menu"], [data-radix-popper-content-wrapper], [cmdk-root], [cmdk-list]')){if(!(e instanceof HTMLElement)||e.closest("[data-bloom]"))continue;let o=getComputedStyle(e);if(!(o.display==="none"||o.visibility==="hidden"))return!0}return!1}function Mf(t){if(t.isComposing||t.key==="Process"||t.keyCode===229)return;let e=cc(t.target);if(!e)return;if(t.key==="Enter"&&!t.shiftKey){Oi(Q(e)),Ke();return}if(t.key==="Escape"&&D){Mt(D.draft),Ke(),t.preventDefault(),t.stopPropagation();return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.ctrlKey||t.metaKey||t.shiftKey||Tf())return;let o=Qa(e),n=t.key==="ArrowUp";!t.altKey&&!(n?o.first:o.last)||!n&&!D||Sf(n?-1:1)&&(t.preventDefault(),t.stopPropagation())}function Cf(t){D&&cc(t.target)&&Q()!==D.shown.trim()&&Ke()}function Lf(t){t.target instanceof Element&&t.target.closest(c.sendButton)&&Oi(Q())}var dc=h({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before. Click the counter to browse history.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:fe,styles:ic,start(){for(let e of document.querySelectorAll('[data-bloom="history-hud"], [data-bloom="history-dialog"]'))e.remove();St=null,Pi=new AbortController;let{signal:t}=Pi;document.addEventListener("keydown",Mf,{capture:!0,signal:t}),document.addEventListener("input",Cf,{capture:!0,signal:t}),document.addEventListener("click",Lf,{capture:!0,signal:t}),document.addEventListener("submit",()=>Oi(Q()),{capture:!0,signal:t})},stop(){Pi?.abort(),Po(),Ke();for(let t of document.querySelectorAll('[data-bloom="history-hud"]'))t.remove();St=null},onSettingsChange(t){t==="maxEntries"&&Io(Ge())}});var uc=`/*
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
`;var Bf=1500,If=5e3,Pf=2e3,bc=[{label:"UTC",value:"UTC"},{label:"\u7F8E\u56FD\u4E1C\u90E8",value:"America/New_York"},{label:"\u7F8E\u56FD\u4E2D\u90E8",value:"America/Chicago"},{label:"\u7F8E\u56FD\u5C71\u5730",value:"America/Denver"},{label:"\u7F8E\u56FD\u897F\u90E8",value:"America/Los_Angeles"},{label:"\u65E5\u672C",value:"Asia/Tokyo"},{label:"\u53F0\u6E7E",value:"Asia/Taipei"}],Ye=b({sourceTimeZone:{type:"select",description:"Zone the stored clock was written in. Leave UTC for ChatGPT create_time. Pick the same zone as the Shit GPT plugin only when that clock is a wall time in that zone; it is then shown in the system timezone.",options:bc,default:"UTC"},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),Qn=new Map,Ri=new Set,yc=0,Wn,mc=[];function vc(t,e){Qn.get(t)!==e&&(Qn.set(t,e),clearTimeout(Wn),Wn=setTimeout(Ac,Pf))}function Ac(){let t={...Ye.store.stamps,...Object.fromEntries(Qn)};Ye.store.stamps=Object.fromEntries(Object.entries(t).toSorted((e,o)=>o[1]-e[1]).slice(0,Bf))}function Of(t){let e=Ct(v())?.times;for(let o=t.length-1;o>=0;o--){let n=Qn.get(t[o])??e?.get(t[o])??Ye.store.stamps[t[o]];if(n)return n}return null}var Rf=()=>$().generating||Date.now()-yc<If;function wc(){return Intl.DateTimeFormat().resolvedOptions().timeZone}function xc(){let t=Ye.store.sourceTimeZone;if(!t||t==="UTC")return"UTC";try{return Intl.DateTimeFormat(void 0,{timeZone:t}),t}catch{return"UTC"}}function Sc(t,e){let o={};for(let n of new Intl.DateTimeFormat("en-US",{timeZone:e,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(t)))o[n.type]=n.value;return{y:+o.year,m:+o.month,d:+o.day,h:+o.hour%24,mi:+o.minute,s:+o.second}}function qc(t){return Date.UTC(t.y,t.m-1,t.d,t.h,t.mi,t.s)}function pc(t,e){let o=t;for(let n=0;n<4;n++){let r=t-qc(Sc(o,e));if(r===0)return o;o+=r}return o}function Hf(t,e){if(e==="UTC")return t;let o=(t%1e3+1e3)%1e3,n=t-o,r=new Date(n),i=Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),r.getUTCHours(),r.getUTCMinutes(),r.getUTCSeconds()),a=pc(i,e),u=3600*1e3,l=Number.POSITIVE_INFINITY;for(let d of[-u,0,u]){let m=a+d;qc(Sc(m,e))===i&&m<l&&(l=m)}return l!==Number.POSITIVE_INFINITY?l+o:pc(i+u,e)+o}function Df(t,e){let o=xc();return e||o==="UTC"?t:Hf(t,o)}function fc(t,e){return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}function Nf(t){let e=wc(),o=Date.now(),n={hour:"2-digit",minute:"2-digit",timeZone:e};if(fc(t,e)===fc(o,e))return new Intl.DateTimeFormat(void 0,n).format(t);let r=a=>new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric"}).format(a),i=r(t)===r(o)?{}:{year:"numeric"};return new Intl.DateTimeFormat(void 0,{...i,month:"short",day:"numeric",...n}).format(t)}function Uf(t,e){let o=new Date(e).toLocaleString(void 0,{timeZone:wc()}),n=xc();if(n==="UTC"||e===t)return o;let r=new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"UTC"}).format(t);return`${bc.find(a=>a.value===n)?.label??n} ${r} \u2192 ${o}`}function Ec(t){let e=jt(t)??t.getAttribute("data-message-author-role")??t.closest(c.turn)?.getAttribute("data-turn")??t.querySelector(c.authorRole)?.getAttribute("data-message-author-role");if(bn(e))return e;let o=fo(t).at(-1);return Ct(v())?.chain.find(n=>n.id===o)?.role??null}var gc='[class*="group/activity-header"]';function Ff(t){let e=t.parentElement;if(!e)return null;let o=t.closest(c.turn);return o&&e!==o&&!o.contains(e)?null:e}function Kf(t){let e=t;for(let o=0;o<8&&e;o++){let n=Ff(e);if(!n)return null;let r=[...n.children],i=r.indexOf(e);for(let a=i-1;a>=0;a--){let u=r[a],l=u.matches(gc)?u:u.querySelector(gc);if(l)return l;if(u.matches(c.searchUnit)||u.querySelector(c.searchUnit))return null}if(n===e.closest(c.turn))return null;e=n}return null}function Gf(t){let e=t.parentElement;for(let o=0;o<4&&e;o++){if(e.classList.contains("flex-col"))return e;e=e.parentElement}return t.parentElement??t}function Tc(t,e){if(e==="assistant"){let o=Kf(t);if(o)return Gf(o)}return t}function Yf(t,e){let o=Ce();for(let n=o.length-1;n>=0;n--){let r=o[n];if(!(r!==t&&(Ec(r)!=="assistant"||Tc(r,"assistant")!==e)))return r===t}return!0}function hc(t){return t.querySelector(':scope > time[data-bloom="timestamp"]')}function jf(t){let e=fo(t);if(!e.length||!yt(t)||t.querySelector("time:not([data-bloom])"))return;let o=Ec(t),n=Tc(t,o);if(n!==t&&!Yf(t,n)){hc(t)?.remove();return}let r=Of(e),i=!1;if(!r&&Rf()){r=Date.now();let m=e.at(-1);Ri.add(m),vc(m,r),i=!0}else r&&Ri.has(e.at(-1))&&(i=!0);let a=n.querySelector('time[data-bloom="timestamp"]')??hc(t);if(!r||Ye.store.hideOwnMessages&&o==="user"){a?.remove();return}let u=Df(r,i),l=Nf(u);if(a?.textContent===l&&a.parentElement===n&&a===n.firstElementChild)return;let d=s("time",{class:`bloom-timestamp bloom-timestamp-${o??"assistant"}`,text:l,title:Uf(r,u),attrs:{"data-bloom":"timestamp",datetime:new Date(u).toISOString()}});a&&a.replaceWith(d),(d.parentElement!==n||d!==n.firstElementChild)&&n.prepend(d)}var jn=Ht(()=>{for(let t of Ce())jf(t)}),Mc=h({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:Ye,styles:uc,start(){mc=[M(t=>U(t)&&jn()),wt.on("conversation",jn),wt.on("message-time",({messageId:t,time:e})=>{Ri.delete(t),vc(t,e),jn()}),O.on("fall",()=>{yc=Date.now()})]},stop(){for(let t of mc)t();Wn&&(clearTimeout(Wn),Ac());for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove()},onSettingsChange(t){if(t!=="stamps"){for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove();jn()}}});var Qf=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])','[data-chatgpt-composer] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-composer-input] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-codex-composer-root] button[aria-label^="Dictat" i], [data-composer-placement] button[aria-label^="Dictat" i], [class*="ComposerLayout"] button[aria-label^="Dictat" i]'],Wf=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],Cc=b({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),Lc=h({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:Cc,styles:()=>Rt([...Qf,...Cc.store.hideDictationSettings?Wf:[]])});var ge="data-bloom-share",zf=/^\/g\/g-p-/,Vf=/^(?:share|分享)$/i,Jf=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],Zf=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${ge}="project"]`],Hi=b({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),zn,Di=!1;function Xf(t){if(!U(t))return;let e=zf.test(location.pathname)&&!v();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${ge}]`))!e||!Vf.test(y(o.textContent??""))?o.removeAttribute(ge):o.hasAttribute(ge)||o.setAttribute(ge,"project")}var kc=h({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:Hi,styles:()=>Rt([...Hi.store.hideShareChat?Jf:[],...Hi.store.hideShareProject?Zf:[]]),start(){Di=!0,Ft().then(()=>{Di&&!zn&&(zn=M(Xf))})},stop(){Di=!1,zn?.(),zn=void 0;for(let t of document.querySelectorAll(`[${ge}]`))t.removeAttribute(ge)}});var Bc='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',$f='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',_f="[data-bloom-profile-plan]",Ic="visibility:hidden!important;user-select:none!important",Oc=b({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function tg(){let{hideUsername:t,hideEmail:e,enlargePlan:o,alignPlanWithAvatar:n}=Oc.store,r=[];return t&&r.push(n?`:is(${Bc}){display:none!important}`:`:is(${Bc}){${Ic}}`),e&&r.push(`:is(${$f}){${Ic}}`),t&&o&&r.push(`${_f}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var Pc,Rc=h({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Oc,styles:tg,start(){Pc=At()},stop(){Pc?.()}});var eg=new Set(["chatgpt","new chat","\u65B0\u804A\u5929","codex"]);function og(){let t=y(document.title.replace(/\s*[|–-]\s*(?:ChatGPT|Codex)$/i,""));return t&&!eg.has(t.toLowerCase())?t:null}function Oo(t){return t?uo(t)??(t===v()?og():null):null}var Hc=`/*
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
`;var tt=L("bloom-recent-"),qt="home",rg=50,Dc=140,ig=new Set(["Backquote"]),ag=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),w=b({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(t=>({label:t,value:t})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),Vt=null,lt=[],ft=0,Ni,Nc=[],Jn=()=>ee()?null:v()??(an()?qt:null);function Uc(t,e){return Object.fromEntries(Object.entries(t).filter(([o])=>e.has(o)))}function Kc(t){let e=Oo(t);e&&w.store.titles[t]!==e&&(w.store.titles={...w.store.titles,[t]:e});let o=Ls(location.href);o&&t===v()&&w.store.projects[t]!==o&&(w.store.projects={...w.store.projects,[t]:o})}function Fc(t){if(!t)return;let e=[t,...w.store.visits.filter(n=>n!==t)].slice(0,rg),o=new Set(e);w.store.visits=e,Object.keys(w.store.previews).some(n=>!o.has(n))&&(w.store.previews=Uc(w.store.previews,o)),Object.keys(w.store.titles).some(n=>!o.has(n))&&(w.store.titles=Uc(w.store.titles,o)),t!==qt&&Kc(t)}function sg(t){if(!w.store.visits.includes(t))return;let{[t]:e,...o}=w.store.titles,{[t]:n,...r}=w.store.previews,{[t]:i,...a}=w.store.projects;w.store.visits=w.store.visits.filter(u=>u!==t),w.store.titles=o,w.store.previews=r,w.store.projects=a}function Vn(t){if(!t||!w.store.visits.includes(t))return;let e={},o=Ct(t)?.chain??[];for(let r of o)e[r.role]=gt(vn(r),Dc);if(t===v())for(let r of Qt()){let i=Le(r);i&&(e[r.role]=gt(i,Dc))}let n=w.store.previews[t];!e.user&&!e.assistant||n?.user===e.user&&n?.assistant===e.assistant||(w.store.previews={...w.store.previews,[t]:e})}function lg(){let t=Number(w.store.maxRecent);return w.store.visits.filter(e=>e!==qt||w.store.includeHome).slice(0,t)}function Gc(t){if(Qe(),t===Jn())return;let e=t===qt?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"], [data-sidebar-destination="builtin:home"]'):co(t)[0];e?e.click():location.assign(t===qt?"/":`/c/${t}`)}function cg(t){let e=t===qt?null:w.store.previews[t],o=e&&["user","assistant"].filter(n=>e[n]).map(n=>s("span",{class:tt("preview"),attrs:{"data-role":n},text:e[n]}));return s("span",{class:tt("thumb"),attrs:{"aria-hidden":"true"}},o?.length?s("span",{class:tt("page")},...o):s("span",{class:tt("fallback")},k(t===qt?"plus":"bloom")))}function dg(t,e){let o=t===qt?"New chat":w.store.titles[t]??Oo(t)??"Untitled chat",n=t===qt?null:w.store.projects[t];return s("button",{class:tt("item"),attrs:{type:"button",role:"option","aria-selected":String(e===ft),"aria-label":n?`${o}, ${n}`:o},on:{click:()=>Gc(t),pointerenter:()=>e!==ft&&je(e)}},cg(t),s("span",{class:tt("meta")},s("span",{class:`${tt("title")} bloom-truncate`,text:o}),n&&s("span",{class:tt("project")},k("folder"),s("span",{class:"bloom-truncate",text:n}))))}function Yc(){lt.length?Gc(lt[ft]):Qe()}function je(t){lt.length&&(ft=(t+lt.length)%lt.length,Vt?.querySelectorAll(`.${tt("item")}`).forEach((e,o)=>e.setAttribute("aria-selected",String(o===ft))))}function ug(){Vn(v());let t=Jn();lt=lg(),t&&(lt=[t,...lt.filter(o=>o!==t)].slice(0,Number(w.store.maxRecent))),ft=lt.length>1?1:0;let e=lt.length?s("div",{class:tt("list"),attrs:{role:"listbox","aria-label":"Recent chats"}},...lt.map(dg)):s("div",{class:tt("empty"),text:"Open a few chats, then hold Ctrl+` to switch."});e.style.setProperty("--bloom-recent-count",String(lt.length)),Vt=s("div",{class:`bloom-root ${tt("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:o=>o.target===o.currentTarget&&Qe()}},s("div",{class:tt("panel")},e)),vt(Vt)}function Qe(){Vt?.remove(),Vt=null}var mg=t=>ig.has(t.code)||ag.has(t.key);function pg(t){if(t.ctrlKey&&!t.altKey&&!t.metaKey&&mg(t)){t.preventDefault(),t.stopPropagation(),Vt?je(ft+(t.shiftKey?-1:1)):ug();return}if(!Vt)return;let o={Escape:Qe,Enter:Yc,ArrowRight:()=>je(ft+1),ArrowDown:()=>je(ft+1),ArrowLeft:()=>je(ft-1),ArrowUp:()=>je(ft-1)}[t.key];o&&(t.preventDefault(),t.stopPropagation(),o())}function fg(t){Vt&&t.key==="Control"&&Yc()}var jc=h({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:w,styles:Hc,start(){Ni=new AbortController;let{signal:t}=Ni;addEventListener("keydown",pg,{capture:!0,signal:t}),addEventListener("keyup",fg,{capture:!0,signal:t}),addEventListener("blur",Qe,{signal:t}),document.addEventListener("visibilitychange",()=>document.hidden&&Vn(v()),{signal:t}),Nc=[bt(({prevId:i})=>{Vn(i),Fc(Jn())}),wt.on("conversation",({id:i})=>{w.store.visits.includes(i)&&Kc(i),Vn(i)}),wt.on("conversation-missing",({id:i})=>sg(i))];let{visits:e,titles:o,previews:n}=w.store,r=e.filter(i=>i!==qt&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(w.store.visits=e.filter(i=>!r.includes(i))),Fc(Jn())},stop(){Ni?.abort();for(let t of Nc)t();Qe()}});var Ui="data:audio/mpeg;base64,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";var Qc=new x("ResponseNotification"),gg=.5,Wc="BloomNoticeClaim",hg=3e4,Ro=b({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:t=>(t.append(H("Preview",Xc)),()=>t.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),zc=null,Fi=new Map,Vc=[],Ki,bg=t=>Uint8Array.from(atob(t.slice(t.indexOf(",")+1)),e=>e.charCodeAt(0)).buffer;function yg(t,e){let o=Fi.get(e);return o||(o=(e.startsWith("data:")?Promise.resolve(bg(e)):Fo(e)).then(n=>t.decodeAudioData(n)),o.catch(()=>Fi.delete(e)),Fi.set(e,o)),o}async function Jc(t){zc??=new AudioContext;let e=zc;e.state==="suspended"&&e.resume();let o=e.createBufferSource(),n=e.createGain();o.buffer=await yg(e,t),n.gain.value=gg,o.connect(n).connect(e.destination),o.start()}function Xc(){let t=Ro.store.soundUrl.trim();Jc(t||Ui).catch(e=>{Qc.warn("Sound failed",e),t&&Jc(Ui).catch(o=>Qc.warn("Default chime failed",o))})}function vg(t){let e=`${t??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:e,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:e,silent:!0});o.onclick=()=>{focus(),o.close()}}function Ag(t){let e=Uo(Wo(Wc)??"");return t&&C(e)&&e.id===t&&Date.now()-Number(e.at)<hg?!1:(zo(Wc,{id:t,at:Date.now()}),!0)}function Zc(t){Ro.store.onlyWhenHidden&&!document.hidden||Ag(t)&&(Ro.store.sound&&Xc(),Ro.store.browserNotification&&vg(Oo(t)))}function wg(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(Ki=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:Ki.signal}))}var $c=h({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply, including chats you left while they were answering.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:Ro,start(){wg(),Vc=[O.on("fall",({conversationId:t,outcome:e})=>e==="done"&&Zc(t)),O.on("background",({conversationId:t})=>Zc(t))]},stop(){for(let t of Vc)t();Ki?.abort()}});var xg=`:is(${c.sidebarScroll}, :has(> ${c.sidebarScroll})) + :has(${c.menuButton})`,Sg=`${c.rail} > :has(${c.menuButton})`,Yi=`:is(${xg}, ${Sg}, ${c.oldProfile}):not(:hover)`,Gi="[data-bloom-profile-avatar]",qg=`:is(${Yi}, ${Yi} :has(${Gi})) > :not(${Gi}, :has(${Gi}))`,td=b({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function Eg(){let{opacity:t,fadeAvatar:e}=td.store;return t>=100?"":`${e?Yi:qg}{opacity:${t/100}!important}`}var _c,ed=h({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:td,styles:Eg,start(){_c=At()},stop(){_c?.()}});var od=`/*
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
`;var N=L("bloom-star-chats"),Mg=80,Cg=60,Lg=1200,kg=120,Ho=b({replaceReadAloud:{type:"boolean",description:"Put the star where the reply's Read aloud button is, and hide that button.",default:!0},messages:{type:"custom",default:[]}}),Bg=`:is(${c.turnActions}) ${c.readAloud}`,ji,Qi=!1,Jt=!1,be=!1,Zn=0,z=null,Xn="",I=null,Wi,Zt;function Vi(){let t=Ho.store.messages;return Array.isArray(t)?t.filter(e=>C(e)&&typeof e.conversationId=="string"&&typeof e.messageId=="string"&&(e.role==="user"||e.role==="assistant")&&typeof e.snippet=="string"&&typeof e.starredAt=="number"):[]}function Ji(){let t=v();return t?Vi().filter(e=>e.conversationId===t):[]}function Ig(t,e){return Vi().some(o=>o.conversationId===t&&o.messageId===e)}function nd(t){let e=Vi(),o=e.some(n=>n.conversationId===t.conversationId&&n.messageId===t.messageId);Ho.store.messages=o?e.filter(n=>!(n.conversationId===t.conversationId&&n.messageId===t.messageId)):[{...t,starredAt:Date.now()},...e].slice(0,Mg)}function zi(t){return t.messageIds[0]||t.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||t.el.getAttribute("data-turn-key")||""}function Pg(t){return gt(Le(t)||y(t.el.textContent??""),Cg)}function Og(t){let e=t.closest(c.turn);if(!e)return null;let o=Qt().filter(n=>e.contains(n.el));return o.find(n=>n.el.contains(t)||n.el===e)??o.findLast(n=>n.el.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING)??null}function Rg(){let t=[...document.querySelectorAll(c.turnActions)].filter(e=>!e.closest(`[data-bloom], [role="dialog"], [inert], pre, ${c.sidebars}`));return t.filter(e=>!t.some(o=>o!==e&&o.contains(e)))}function Hg(t,e){let o=Ho.store.replaceReadAloud?e.querySelector(c.readAloud):null;if(o&&!o.closest("[data-bloom]")){t.nextElementSibling!==o&&o.before(t);return}let n=Dg(e);(t.parentElement!==n||n.lastElementChild!==t)&&n.append(t)}function Dg(t){let e=[...t.querySelectorAll("button")].filter(n=>n.dataset.bloom!=="message-star"&&!n.closest("[data-bloom]"));return e.length?[...t.children].find(n=>n instanceof HTMLElement&&n!==e[0]&&e.every(r=>n.contains(r)))??t:t}function Ng(){return[...document.querySelectorAll(c.headerMore)].filter(e=>{if(e.dataset.bloom==="message-star"||e.closest("[data-bloom], [role='dialog'], [inert]")||e.closest(c.sidebars))return!1;let o=e.getBoundingClientRect();return o.width===0&&o.height===0?!!e.closest("header, #page-header"):o.top>=0&&o.top<96&&o.left>window.innerWidth*.5}).toSorted((e,o)=>o.getBoundingClientRect().left-e.getBoundingClientRect().left||(e.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1))[0]??null}function rd(t,e,o){return s("button",{class:e,attrs:{type:"button","aria-label":t},on:{pointerdown:n=>n.stopPropagation(),mousedown:n=>n.stopPropagation(),click:n=>{n.preventDefault(),n.stopPropagation(),o(n)}}},k("star"))}function Ug(t,e){t.setAttribute("aria-pressed",String(e)),t.setAttribute("aria-label",e?"Unstar":"Star")}function $n(){return Jt||be}function We(){Zn&&window.clearTimeout(Zn),Zn=0}function ze(){Jt=!1,be=!1,We(),Zt?.enter(),z?.remove(),z=null,Xn="",I?.classList.remove(N("-open")),I?.setAttribute("aria-expanded","false")}function _n(t){return t instanceof Node&&!!(I?.contains(t)||z?.contains(t))}function Fg(t){t.classList.add(N("-flash")),window.setTimeout(()=>t.classList.remove(N("-flash")),Lg)}function Kg(t){let e=Qt().find(n=>zi(n)===t),o=e?.el.closest(c.turn)??e?.el;o&&(o.scrollIntoView({block:"start"}),Fg(o))}function Gg(){let t=v(),e=new Set,o=[...document.querySelectorAll('[data-bloom="message-star"][data-place="action"]')];if(!t||ee()){for(let n of o)n.remove();return}for(let n of Rg()){if(!yt(n))continue;let r=Og(n),i=r?zi(r):"";if(!r||!i)continue;let a=n.querySelector('[data-place="action"]');(!a||a.dataset.id!==i)&&(a?.remove(),a=rd("Star",N("-star"),()=>{let u=v(),l=Qt().find(d=>zi(d)===i);!u||!l||nd({conversationId:u,messageId:i,role:l.role,snippet:Pg(l)})}),a.dataset.bloom="message-star",a.dataset.place="action",a.dataset.id=i),Ug(a,Ig(t,i)),Hg(a,n),e.add(a)}for(let n of o)e.has(n)||n.remove()}function Yg(){if(!z||!I)return;let t=I.getBoundingClientRect(),e=z.offsetWidth||288,o=z.offsetHeight||120,n=t.bottom+6;n+o>window.innerHeight-8&&(n=Math.max(8,t.top-o-6));let r=Math.max(8,Math.min(t.right-e,window.innerWidth-e-8));z.dataset.place=n>=t.bottom?"below":"above",z.style.left=`${Math.round(r)}px`,z.style.top=`${Math.round(n)}px`}function jg(){if(!$n()||!I){z?.remove(),z=null,Xn="",I?.classList.remove(N("-open")),I?.setAttribute("aria-expanded","false");return}let t=Ji(),e=t.map(o=>`${o.messageId}	${o.snippet}`).join(`
`);if(!z||Xn!==e){z?.remove();let o=t.map(n=>s("div",{class:N("-row")},s("button",{class:N("-jump"),attrs:{type:"button"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),ze(),Kg(n.messageId)}}},s("span",{class:N("-role"),text:n.role==="user"?"You":"ChatGPT"}),s("span",{class:N("-snip"),text:n.snippet||"Message"})),rd("Unstar",N("-unstar"),()=>nd(n))));z=s("div",{class:`bloom-root ${N("-panel")}`,attrs:{"data-bloom":"star-list"},on:{pointerenter:()=>{We(),Zt?.enter(),be=!0},pointerleave:n=>{_n(n.relatedTarget)||Jt||Zt?.leave(n)}}},s("div",{class:N("-bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:N("-head"),text:"Starred"}),s("div",{class:N("-body")},...o.length?o:[s("div",{class:N("-empty"),text:"No starred messages in this chat"})])),document.body.append(z),Xn=e}Yg(),I.classList.add(N("-open")),I.setAttribute("aria-expanded","true")}function Qg(){for(let r of document.querySelectorAll('[data-bloom="starred"]'))r.remove();let t=Ng(),e=t?.parentElement??null,o=v();if(!t||!e||e.closest(c.sidebars)||!o||ee()||!yt(e)){I?.remove(),I=null,ze();return}I||(I=s("button",{class:N("-toggle"),attrs:{type:"button","data-bloom":"message-star","data-place":"header","aria-label":"Starred messages","aria-expanded":"false"},on:{pointerdown:r=>r.stopPropagation(),pointerenter:()=>{We(),Zt?.enter(),Zn=window.setTimeout(()=>{be=!0,he()},kg)},pointerleave:r=>{_n(r.relatedTarget)||(We(),$n()&&Zt?.leave(r))},click:r=>{r.preventDefault(),r.stopPropagation(),Jt=!Jt,be=Jt,We(),Jt||ze(),he()}}},k("star"))),(I.parentElement!==e||I.nextElementSibling!==t)&&t.before(I);let n=t.getBoundingClientRect();n.width>0&&(I.style.width=`${n.width}px`,I.style.height=`${n.height}px`),I.classList.toggle(N("-here"),Ji().length>0),jg()}function Wg(){let t=new Set(Ji().map(e=>e.messageId));for(let e of document.querySelectorAll('[data-bloom="navigator"] .bloom-nav-tick, [data-bloom="navigator"] .bloom-nav-row'))e.classList.toggle(N("-mark"),!!e.dataset.messageId&&t.has(e.dataset.messageId))}function he(){if(!Qi){Qi=!0;try{for(let t of document.querySelectorAll('[data-bloom="starred"], [data-bloom="chat-star"]'))t.remove();Gg(),Qg(),Wg()}finally{Qi=!1}}}function zg(){ze(),I?.remove(),I=null;for(let t of document.querySelectorAll('[data-bloom="message-star"], [data-bloom="star-list"], [data-bloom="starred"], [data-bloom="chat-star"]'))t.remove();for(let t of document.querySelectorAll(`.${N("-mark")}`))t.classList.remove(N("-mark"))}var id=h({name:"StarChats",description:"Star a message from its toolbar. The star left of the top-right menu opens this chat's list.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:Ho,styles:()=>`${od}${Ho.store.replaceReadAloud?Rt([Bg]):""}`,onSettingsChange(t){(t==="messages"||t==="replaceReadAloud")&&he()},start(){for(let o of document.querySelectorAll('[data-bloom="star-list"]'))o.remove();Zt=An({over:_n,trigger:()=>I,panel:()=>z,setHeld(o){if(o){be=!0,he();return}Jt||(be=!1,he())}}),ji=M(o=>U(o)&&he());let t=o=>{_n(o.target)||$n()&&ze()};document.addEventListener("pointerdown",t,!0);let e=o=>{o.key!=="Escape"||!$n()||(o.preventDefault(),ze())};document.addEventListener("keydown",e,!0),Wi=()=>{document.removeEventListener("pointerdown",t,!0),document.removeEventListener("keydown",e,!0)},he()},stop(){ji?.(),ji=void 0,Wi?.(),Wi=void 0,We(),Zt?.dispose(),Zt=void 0,zg()}});var ad="filter:blur(6px)!important;transition:filter 0.2s ease",Hx=`:is(${c.sidebars})`,ye="data-bloom-streamer-open",Vg="[data-app-action-sidebar-thread-row], [data-app-action-sidebar-project-row], .bloom-recent-item",sd=":not([data-app-action-sidebar-thread-row] *, [data-app-action-sidebar-project-row] *)";function Jg(){return{conversations:{selectors:["[data-app-action-sidebar-thread-title]"],hover:!0,row:"[data-app-action-sidebar-thread-row]"},projects:{selectors:["[data-app-action-sidebar-project-label]"],hover:!0,row:"[data-app-action-sidebar-project-row]"},accountAvatar:{selectors:["[data-bloom-profile] img","[data-bloom-menu] img"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:[`[data-thread-title]${sd}`,`[data-thread-title-trigger]${sd}`],hover:!1}}}var ld=b({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function Zg(t,e){let o=[`:is(${t}):hover`,`.bloom-recent-item:hover :is(${t})`,`:is(${t})[${ye}]`];return e&&o.push(`${e}:hover`,`${e}:hover :is(${t})`,`${e}:is(${t}):hover`,`${e}[${ye}]`,`${e}[${ye}] :is(${t})`),o.join(",")}function Xg(){let t=Jg();return Object.entries(t).filter(([e])=>ld.store[e]).map(([,e])=>{let o=e.selectors.join(",");if(!e.hover)return`:is(${o}){${ad}}`;let n="row"in e?e.row:void 0;return`:is(${o}){${ad}}${Zg(o,n)}{filter:none!important}`}).join(`
`)}function $g(t,e){for(let o of document.elementsFromPoint(t,e))if(o instanceof Element){let n=o.closest(Vg);if(n)return n}return null}function $i(t){for(let e of document.querySelectorAll(`[${ye}]`))e!==t&&e.removeAttribute(ye);t&&!t.hasAttribute(ye)&&t.setAttribute(ye,"")}var Ve,_g=Ht(()=>{Ve&&$i($g(Ve.clientX,Ve.clientY))});function Zi(t){Ve=t,_g()}function th(t){t.relatedTarget instanceof Node&&document.documentElement.contains(t.relatedTarget)||(Ve=void 0,$i(null))}var Xi,tr,cd=h({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:ld,styles:Xg,start(){Xi=At(),tr=new AbortController;let t={capture:!0,signal:tr.signal,passive:!0};document.addEventListener("pointerover",Zi,t),document.addEventListener("pointermove",Zi,t),document.addEventListener("pointerout",Zi,t),window.addEventListener("pointerleave",th,t)},stop(){tr?.abort(),tr=void 0,Ve=void 0,$i(null),Xi?.(),Xi=void 0}});var Xt=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)','[data-turn-key] [data-message-author-role="user"] blockquote:not(.twitter-tweet)','[class~="group/user-message"] blockquote:not(.twitter-tweet)'].join(","),_i=b({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function eh(){let t=[`${Xt}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${Xt}>*{margin-block:0!important}`];return _i.store.italic||t.push(`${Xt}{font-style:inherit!important}`),_i.store.quotes||(t.push(`${Xt}{quotes:none!important}`),t.push(`${Xt}::before,${Xt}::after,${Xt} p::before,${Xt} p::after{content:none!important}`)),t.join(`
`)}var dd=h({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:_i,styles:eh});var oh=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],nh=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",rh='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',ud=b({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function ih(){let t=`${ud.store.width}rem`;return`:root,[data-app-action-timeline-scroll],[data-chatgpt-composer],[data-composer-input]{--thread-content-max-width:${t}!important;--composer-adjacent-max-width:${t}!important}`}var md=h({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:ud,styles:ih});var ah=[Fs,us,gl,ql,Ml,kl,Il,Fl,Zl,rc,dc,Mc,Lc,kc,Rc,jc,$c,ed,id,cd,dd,md],ta=ah;var sh=new x("Bloom"),pd="2.0.102";var ea=0,er,Do="__bloomOnShortcut";function or(t){if(t.isComposing||!t.shiftKey||!(t.metaKey||t.ctrlKey)||t.key!=="b"&&t.key!=="B")return;t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation();let e=xs();Gt();for(let o of document.querySelectorAll("[data-bloom='settings']"))o.remove();e||Me()}function lh(){let t=ct;t[Do]&&document.removeEventListener("keydown",t[Do],!0),t[Do]=or,document.addEventListener("keydown",or,!0)}function ch(){ea++,document.removeEventListener("keydown",or,!0);let t=ct;t[Do]===or&&delete t[Do],er?.(),er=void 0,Da(),$e(),Yo()}async function oa(){let t=++ea,e=()=>t===ea;$e(),Yo();for(let o of ta)o.updatedAt=ts[o.name];qa(ta),Aa(),Ta(),Ko("base",Ua),$a(),lh(),tn("Init"),Ar().then(()=>{e()&&(ua(),tn("DOMContentLoaded"))}),await wr(),e()&&(tn("HostReady"),er?.(),er=Es(),Ha(),sh.info(`Bloom++ ${pd} app host ready`))}var dh=new x("Boot");window===window.top&&(pa(ct.Bloom),fa(na),oa().catch(t=>dh.error("Startup failed",t)));})();
