// ==UserScript==
// @name         Bloom++ (ChatGPT app)
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.120
// @description  Bloom++ host for the official ChatGPT macOS app. Injected over loopback CDP; not a web userscript.
// @author       0-V-linuxdo & Bloom contributors
// @homepageURL  https://github.com/0-V-linuxdo/Bloom
// @supportURL   https://github.com/0-V-linuxdo/Bloom/issues
// @match        app://*/*
// @run-at       document-start
// @grant        none
// @license      GPL-3.0-or-later
// ==/UserScript==

/* Bloom++ v2.0.120 ChatGPT app host. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Ou=Object.defineProperty;var Ru=(e,t)=>{for(var o in t)Ou(e,o,{get:t[o],enumerable:!0})};var q=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var oe=(e,t,o)=>Math.min(o,Math.max(t,e)),B=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),mr=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,ye=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,y=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function ya(e,t){return`${e} ${t}${e===1?"":"s"}`}async function jo(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function Qo(e){try{return JSON.parse(e)}catch{return}}var pe=typeof unsafeWindow>"u"?window:unsafeWindow,Hu=200,Du=300;function zo(e){return new Promise((t,o)=>GM_xmlhttpRequest({url:e,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=Hu&&n<Du?t(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var Nu=new q("Styles"),Ne=new Map,eo=new Set,nt=new Map,pr=!0,va=e=>e.replaceAll(/[^A-Za-z0-9_-]/g,"_"),Uu=e=>`:where(:root){--bloom-sheet-${va(e)}:1}`,Fu=(e,t)=>`${Uu(e)}${t}`,Aa=e=>`bloom-style-${e}`;function wa(e){try{return[...e.cssRules].map(t=>t.cssText).join(`
`)}catch{return""}}function Ku(e,t){let o=wa(e);return o?o.includes(`--bloom-sheet-${va(t)}`)?!0:t==="plugin-StreamerMode"?o.includes("blur(6px)")&&(o.includes("data-app-action-sidebar-thread-title")||o.includes("data-bloom-streamer-open")):t==="plugin-WiderChat"?o.includes("--composer-adjacent-max-width")&&o.includes("--thread-content-max-width"):t==="plugin-ComposerOpacity"?o.includes("--composer-layout-surface-backdrop-filter")||o.includes("--composer-layout-surface-background")&&o.includes("color-mix"):!1:!1}function xa(e){let t=wa(e);return t?!!(t.includes("--bloom-")||t.includes(".bloom-")||t.includes("[data-bloom")||t.includes("--bloom-sheet-")||t.includes("blur(6px)")&&t.includes("data-app-action-sidebar-thread-title")||t.includes("--composer-adjacent-max-width")&&t.includes("--thread-content-max-width")||t.includes("--composer-layout-surface-backdrop-filter")):!1}function Sa(){let e=document.adoptedStyleSheets.filter(t=>!eo.has(t)&&!xa(t));document.adoptedStyleSheets=[...e,...Ne.values()]}function qa(e){document.readyState==="loading"||e.parentNode===document.head||document.head.append(e)}function Yu(e,t){let o=nt.get(e);o||(o=document.createElement("style"),o.id=Aa(e),nt.set(e,o)),o.textContent!==t&&(o.textContent=t),qa(o)}function Wo(e,t){let o=Fu(e,t);if(pr)try{let n=Ne.get(e);n||(n=new pe.CSSStyleSheet,Ne.set(e,n),eo.add(n)),n.replaceSync(o),Sa();return}catch(n){Nu.warn("Constructed style sheets unavailable, using <style> after parsing",n),pr=!1;let r=Ne.get(e);r&&eo.delete(r),Ne.delete(e)}Yu(e,o)}function to(e){let t=Ne.get(e);t&&(eo.delete(t),Ne.delete(e)),nt.get(e)?.remove(),nt.delete(e);for(let o of document.querySelectorAll(`style[id="${Aa(e)}"]`))o.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(o=>o!==t&&!Ku(o,e)),pr&&Sa()}catch{}}function oo(){Ne.clear(),eo.clear();for(let e of nt.values())e.remove();nt.clear();for(let e of document.querySelectorAll("style[id^='bloom-style-']"))e.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(e=>!xa(e))}catch{}}function Ea(){for(let e of nt.values())qa(e)}var O=e=>(...t)=>t.map(o=>e+o).join(" "),Vo=(...e)=>e.filter(Boolean).join(" "),Ue=e=>e.length?`${e.map(t=>`${t}:not([data-bloom])`).join(",")}{display:none!important}`:"";var Ta="__bloomHost",fr=new q("Boot"),Gu=['[data-bloom="navigator"]','[data-bloom="settings"]','[data-bloom="history-hud"]','[data-bloom="history-dialog"]','[data-bloom="star-list"]','[data-bloom="entry"]','[data-bloom="menu-entry"]','[data-bloom="menu-flyout"]','[data-bloom="message-star"]','[data-bloom="starred"]','[data-bloom="chat-star"]','[data-bloom="queue"]','[data-bloom="recent"]','[data-bloom="quote-chip"]','[data-bloom="quote-back"]','[data-bloom="cls"]','[data-bloom="timestamp"]','[data-bloom="tooltip"]','[data-bloom="notices"]'].join(", "),ju=["data-bloom-greeting","data-bloom-placeholder","data-bloom-streamer-open","data-bloom-share","data-bloom-invite","data-bloom-csi-avatar","data-bloom-csi-sized"];function Jo(){if(!(typeof document>"u"||!document.documentElement)){for(let e of document.querySelectorAll(Gu))e.remove();for(let e of ju)for(let t of document.querySelectorAll(`[${e}]`))t.removeAttribute(e);for(let e of document.querySelectorAll("[data-bloom-text]"))e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size"),e.style.removeProperty("--bloom-text")}}function Qu(e){if(fr.warn("Replacing another Bloom++ instance",e.VERSION),e.destroy){e.destroy();return}for(let t of e.plugins?.values()??[]){try{t.stop?.()}catch(o){fr.error("Failed to stop previous plugin",o)}t.styles="",t.start=void 0}oo()}function Ma(e){let t=pe,o=new Set;for(let n of[e,t.Bloom,t[Ta]])if(!(!n||o.has(n))){o.add(n);try{Qu(n)}catch(r){fr.error("Failed to retire Bloom++",r)}}Jo()}function Ca(e){let t=pe;try{delete t.Bloom}catch{}Object.defineProperty(t,"Bloom",{value:e,configurable:!0,writable:!0}),Object.defineProperty(t,Ta,{value:e,configurable:!0,writable:!0})}var ha={};Ru(ha,{VERSION:()=>Bu,destroy:()=>Th,init:()=>ga,plugins:()=>Z});var zu=new q("Dom");function s(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var ka=document.createElement("template");function La(e){return ka.innerHTML=e.trim(),ka.content.firstElementChild.cloneNode(!0)}var ne=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),ve=(e,t=document)=>[...t.querySelectorAll(e)].find(ne)??null,Wu=16,Vu="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function Xo(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([Vu],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function gr(e){document.hidden?setTimeout(e,Wu):requestAnimationFrame(e)}function Fe(e){let t=!1;return()=>{t||(t=!0,gr(()=>{t=!1;try{e()}catch(o){zu.error("Scheduled task failed",o)}}))}}var Zo=new Set,$o=[],no,Ju=Fe(()=>{let e=$o;$o=[];for(let t of Zo)t(e)});function k(e){return Zo.add(e),no||(no=new MutationObserver(t=>{$o.push(...t),Ju()}),no.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{Zo.delete(e),!Zo.size&&(no?.disconnect(),no=void 0,$o=[])}}var Zu=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),W=e=>!e.length||e.some(t=>!Zu(t.target)),$u=e=>`"${e.replaceAll("\\","\\\\").replaceAll('"','\\"').replaceAll(`
`,"\\A ")}"`;function rt(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size"),e.style.removeProperty("--bloom-text");return}e.style.setProperty("--bloom-text",$u(t)),e.getAttribute("data-bloom-text")!==t&&e.setAttribute("data-bloom-text",t)}function h(e){return e}var Xu=new q("Storage");function _o(e){try{return localStorage.getItem(e)??void 0}catch{return}}function en(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(o){Xu.warn("localStorage write failed",o)}}function Ia(e,t){addEventListener("storage",o=>{o.key===e&&t(o.newValue)})}var hr="BloomSettings",_u=100,Ke={plugins:{}},tn=new Set,br=new Set,Et;function Ba(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=Qo(t);return!B(t)||!B(t.plugins)||!Object.keys(t.plugins).length?null:t}function Pa(){let e=Ba(_o(hr));e&&(Ke.plugins=e.plugins)}var Oa=(e,t)=>`${e}
${t}`;function yr(){Et=void 0,br.clear(),en(hr,Ke)}function ed(e){let t=Ba(e);if(!t)return;let o=[];for(let n of new Set([...Object.keys(Ke.plugins),...Object.keys(t.plugins)])){let r=Ke.plugins[n]??={},i=B(t.plugins[n])?t.plugins[n]:{};for(let a of new Set([...Object.keys(r),...Object.keys(i)]))br.has(Oa(n,a))||JSON.stringify(r[a])===JSON.stringify(i[a])||(i[a]===void 0?delete r[a]:r[a]=i[a],o.push([n,a]))}for(let[n,r]of o)for(let i of tn)i(n,r)}function vr(){Et&&(clearTimeout(Et),yr())}function Ra(e){let t=Object.keys(Ke.plugins).filter(o=>!e.has(o));if(!t.length)return t;for(let o of t)delete Ke.plugins[o];return clearTimeout(Et),yr(),t}var re=(e,t)=>Ke.plugins[e]?.[t];function fe(e,t,o){let n=Ke.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,br.add(Oa(e,t)),clearTimeout(Et),Et=setTimeout(yr,_u);for(let r of tn)r(e,t)}function Tt(e){return tn.add(e),()=>void tn.delete(e)}function Ar(e){return e.type==="component"?void 0:e.default}function b(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>re(t.pluginName,n)??(e[n]&&Ar(e[n])),set:(o,n,r)=>(fe(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&re(t.pluginName,o)!==void 0&&fe(t.pluginName,o)}};return t}var Ha=e=>{let t=()=>{let o=re("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();fe("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},on=Ha("pinnedPlugins"),nn=Ha("starredPlugins");addEventListener("pagehide",vr);Ia(hr,ed);var ao=new q("PluginManager"),Z=new Map,Ye=new Set,an=new Set,wr=new Set,ro=new Map,td=2880*60*1e3;function Da(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),Z.set(t.name,t)}var Na=()=>{let e=re("Settings","knownPlugins");return B(e)?e:null};function Ua(){let e=Ra(new Set(Z.keys()));e.length&&ao.info(`Dropped settings of removed plugins: ${e.join(", ")}`);let t=Na(),o=Date.now(),n={...t},r=[...Z.values()].filter(i=>!i.hidden&&!i.required&&!(i.name in n));for(let i of r)n[i.name]=t?o:0;for(let i of Object.keys(n))Z.has(i)||delete n[i];JSON.stringify(n)!==JSON.stringify(t)&&fe("Settings","knownPlugins",n)}var Fa=e=>{let t=Na()?.[e];return!!t&&Date.now()-t<td},Ka=e=>ro.get(e);function Ya(){for(let e of wr)e()}function xr(e,t){let o=ro.get(e);(t?o?.join(`
`)===t.join(`
`):!o)||(t?ro.set(e,t):ro.delete(e),Ya())}var Ce=e=>!!e.required||(re(e.name,"enabled")??!!e.enabledByDefault),Sr=e=>Ye.has(e),io=e=>`plugin-${e.name}`;function Ga(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?Wo(io(e),t):to(io(e))}function ja(e){if(!Ye.has(e.name))try{Ga(e),e.start?.(),Ye.add(e.name)}catch(t){to(io(e)),ao.error(`Failed to start ${e.name}`,t)}}function sn(e){Ye.delete(e.name),to(io(e));try{e.stop?.()}catch(t){ao.error(`Failed to stop ${e.name}`,t)}}var qr=e=>e.startAt??"HostReady";function Qa(e){if(Ce(e)){an.has(qr(e))&&ja(e);return}sn(e)}function ln(e){an.add(e);for(let t of Z.values())qr(t)===e&&Qa(t);ao.info(`${e}: ${[...Ye].join(", ")}`)}function za(e){sn(e)}function Wa(e){Ce(e)&&an.has(qr(e))&&ja(e)}function Va(e,t){fe(e.name,"enabled",t),vr()}function od(){for(let e of Z.values())e.required||Ce(e)||(Ye.has(e.name)?sn(e):to(io(e)))}var rn;function Ja(){rn?.(),rn=k(()=>od())}function Za(){rn?.(),rn=void 0;for(let e of Z.values())sn(e);Ye.clear(),an.clear(),ro.clear()}function $a(e){return wr.add(e),()=>void wr.delete(e)}Tt((e,t)=>{let o=Z.get(e);if(o){if(t==="enabled"){typeof re(e,"enabled")=="boolean"&&Qa(o),Ya();return}if(Ye.has(e))try{Ga(o),o.onSettingsChange?.(t)}catch(n){ao.error(`Settings change failed for ${e}`,n)}}});var Xa=`/*
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
`;var rd=new q("Events");function Mt(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){rd.error(`Listener for ${String(t)} failed`,r)}}}}function _a(e,t){let o=e instanceof Element?[e,...e.querySelectorAll("*")]:[...e.querySelectorAll("*")];for(let n of o){let r=n.shadowRoot;r&&(t(r),_a(r,t))}}function Ge(e,t=document){let o=[...t.querySelectorAll(e)];return _a(t,n=>o.push(...n.querySelectorAll(e))),o}var ke=(e,t=document)=>Ge(e,t).find(ne)??null;var c={rail:"[data-app-navigation-rail]",sidebarScroll:"[data-app-action-sidebar-scroll]",sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"[data-app-action-sidebar-scroll]",oldRail:"[data-app-navigation-rail]",oldProfile:'button[aria-label="Open profile menu" i]',threadRow:"[data-app-action-sidebar-thread-row]",threadSelected:"[data-app-action-sidebar-thread-row][data-app-action-sidebar-thread-selected='true']",threadTitle:"[data-app-action-sidebar-thread-title]",projectRow:"[data-app-action-sidebar-project-row]",projectLabel:"[data-app-action-sidebar-project-label]",destination:"[data-sidebar-destination]",conversationLink:"[data-app-action-sidebar-thread-row]",timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:"[data-turn-key]",turn:"[data-turn-key]",messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",userBubble:'[class~="group/user-message"]',assistantReply:"[data-response-annotation-target]",assistantSentTime:"[data-assistant-message-sent-time]",oldThread:"[data-app-action-timeline-scroll]",turnActions:'.turn-action-controls, [class*="turn-action-controls"]',readAloud:'button:is([aria-label="Read aloud" i], [aria-label^="Read aloud" i], [aria-label="Stop reading" i], [aria-label^="Stop reading" i], [aria-label="\u6717\u8BFB"], [aria-label^="\u6717\u8BFB"], [aria-label="\u505C\u6B62\u6717\u8BFB"], [data-testid*="read-aloud" i])',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery, [class*='recovery']",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composer:"[data-chatgpt-composer], [data-composer-input]",composerInput:'[data-composer-input] [contenteditable="true"].ProseMirror, [contenteditable="true"].ProseMirror',composerConversation:"[data-above-composer-conversation-id]",oldComposerForm:"[data-chatgpt-composer]",sendButton:'button[aria-label="Send" i], button[aria-label="Send prompt" i], button[aria-label="Send message" i]',stopButton:'button[aria-label="Stop" i], button[aria-label^="Stop " i], button[aria-label="\u505C\u6B62" i], button[aria-label^="\u505C\u6B62"]',composerFooter:"[data-chatgpt-composer]",modelTrigger:'button[aria-label="Model selector" i], button[aria-label="Select ChatGPT model" i], [data-chatgpt-composer] button[aria-haspopup="menu"]',modelItem:'[role="menu"] [role="menuitemradio"], [role="menu"] [role="menuitem"]',effortSlider:'[role="menu"] [data-reasoning-slider]',homeHeading:'main h1:not([aria-hidden="true"]), [role="main"] h1:not([aria-hidden="true"]), [data-testid="home-heading"], [data-homepage-takeover] h1, .heading-xl, [class~="heading-xl"]',headerMore:'button[aria-label="More" i], button[aria-label="\u66F4\u591A"]',headerTitle:"[data-thread-title], [data-thread-title-trigger]",profile:'button[aria-label="Open profile menu" i]',rightPanel:"aside[data-app-shell-focus-area='right-panel']",summaryPanel:"[data-summary-panel-variant]"};var es=/[​-‍﻿]/g,ae=()=>ke(c.composerInput),so=e=>e instanceof HTMLElement&&e.matches(c.composerInput),se=(e=ae())=>e?.closest("form")??e?.closest(c.composer)??ke(c.composer);function V(e=ae()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(es,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(es,"").trim()}var id=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function ts(e,t){let o=t?"insertText":"deleteContentBackward";e.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:o,data:t||null})),e.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:o,data:t||null}))}function Le(e,t=ae()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return id?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),typeof document.execCommand=="function"?e?document.execCommand("insertText",!1,e):document.execCommand("delete"):ts(t,e),V(t)!==e.trim()&&ts(t,e),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function os(e,t){let o=e;for(;o&&o!==t;){if(o instanceof HTMLElement&&o.parentElement===t)return o;o=o.parentNode}return null}function ns(e,t,o){let n=document.createRange();return n.selectNodeContents(e),o?n.setEnd(t.startContainer,t.startOffset):n.setStart(t.endContainer,t.endOffset),n.toString().includes(`
`)?!0:!!n.cloneContents().querySelector("br")}function rs(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:p,selectionEnd:T,value:f}=e;return{first:!f.slice(0,p).includes(`
`),last:!f.slice(T).includes(`
`)}}let t=getSelection();if(!t?.rangeCount||!e.contains(t.anchorNode))return{first:!0,last:!0};let o=t.getRangeAt(0),n=[...e.children].filter(p=>p instanceof HTMLElement),r=os(o.startContainer,e),i=os(o.endContainer,e),a=!r||r===n[0],d=!i||i===n[n.length-1],l=o.getBoundingClientRect(),u=(r??e).getBoundingClientRect(),m=Number.parseFloat(getComputedStyle(r??e).lineHeight)||24;return l.height?{first:a&&l.top-u.top<m,last:d&&u.bottom-l.bottom<m}:{first:a&&!ns(r??e,o,!0),last:d&&!ns(i??e,o,!1)}}var is=e=>{let t=se();return(t&&ke(e,t))??ke(e)},Er=()=>is(c.stopButton),ad=()=>{let e=is(c.sendButton);return e&&!e.matches(c.stopButton)?e:null};function as(){let e=ad();if(e){e.disabled||e.click();return}ae()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var ss=()=>ne(Er());var cn=new q("AppProtocol"),lo=Mt();function sd(e){let t=e;if(typeof t=="string")try{t=JSON.parse(t)}catch{return null}if(Array.isArray(t)||!t||typeof t!="object")return null;let o=t,n=o.notification&&typeof o.notification=="object"?o.notification:o;if(typeof n.method!="string")return null;let r=n.params&&typeof n.params=="object"?n.params:void 0;return{method:n.method,params:r}}function co(e){if(Array.isArray(e)){for(let o of e)co(o);return}let t=sd(e);t&&lo.emit("note",t)}var Mr=new WeakMap,Tr=new WeakMap;function ld(e,t){let o=Mr.get(e);if(o)return o;let n=r=>{co(r.data),typeof e=="function"?e.call(t,r):e.handleEvent(r)};return Mr.set(e,n),n}function cd(){let e=MessagePort.prototype,t=e.addEventListener,o=e.removeEventListener;e.addEventListener=function(r,i,a){return r!=="message"?t.call(this,r,i,a):t.call(this,r,ld(i,this),a)},e.removeEventListener=function(r,i,a){return r!=="message"?o.call(this,r,i,a):o.call(this,r,Mr.get(i)??i,a)};let n=Object.getOwnPropertyDescriptor(e,"onmessage");n?.set&&Object.defineProperty(e,"onmessage",{configurable:!0,enumerable:n.enumerable,get(){return Tr.has(this)?Tr.get(this):n.get?.call(this)},set(r){Tr.set(this,r),n.set.call(this,function(a){co(a.data),r?.call(this,a)})}})}function ud(){let e=window.electronBridge,t=e?.subscribeToWorkerMessages;if(!(!e||typeof t!="function"))try{e.subscribeToWorkerMessages=(o,n)=>t.call(e,o,r=>{co(r),n(r)})}catch(o){cn.warn("electronBridge.subscribeToWorkerMessages is not writable",o)}}function dd(){addEventListener("message",e=>co(e.data));try{cd()}catch(e){cn.warn("MessagePort wrap failed",e)}try{ud()}catch(e){cn.warn("electronBridge wrap failed",e)}cn.info("Listening for app-server notifications")}dd();var md=new q("AppRoute"),pd=500,dn=new Set,mn=null,un;function v(){return Ge(c.threadRow).find(t=>{let o=t.getAttribute("data-app-action-sidebar-thread-selected"),n=t.getAttribute("data-app-action-sidebar-thread-active"),r=t.getAttribute("aria-current");return o==="true"||n==="true"||r==="page"||r==="true"})?.getAttribute("data-app-action-sidebar-thread-id")??null}var Ct=()=>!v(),cs=()=>!1,it=()=>!1;function ls(){let e=v();if(e===mn)return;let{href:t}=location,o={prevHref:t,href:t,prevId:mn,id:e};mn=e;for(let n of dn)try{n(o)}catch(r){md.error("Route listener failed",r)}}function fd(){let e=new MutationObserver(ls);(()=>{document.body&&e.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-app-action-sidebar-thread-selected","data-app-action-sidebar-thread-id"]})})();let o=setInterval(ls,pd);return()=>{e.disconnect(),clearInterval(o)}}function Ae(e){return dn.add(e),un||(mn=v(),un=fd()),()=>{dn.delete(e),!dn.size&&(un?.(),un=void 0)}}var gd=250,hd=400,J=Mt(),at=!1,kt=null,ct=!1,st="done",lt=!1,us=!1,le=()=>({generating:at,conversationId:v()}),bd=e=>{if(!e)return!0;let t=v();return t?t===e||t.endsWith(e)||e.endsWith(t.replace(/^local:/,"")):!0};function yd(e){return e==="interrupted"||e==="aborted"||e==="cancelled"?"stopped":e==="failed"||e==="error"?"error":"done"}function vd(){return lt||ss()}function Ad(e){kt=null,at=!1,lt=!1,J.emit("fall",{conversationId:v(),outcome:e}),ct=!1,st="done"}function wd(){let e=vd();e&&!at&&(at=!0,ct=!1,st="done",J.emit("rise",{conversationId:v()})),e||!at?kt=null:kt==null?kt=Date.now():Date.now()-kt>=hd&&Ad(ct?"stopped":st)}function uo(){wd(),J.emit("tick",le())}function xd({prevId:e,id:t}){e!==t&&(at&&(lt=!1,kt=null,at=!1,ct=!1,st="done",J.emit("fall",{conversationId:e,outcome:"left"})),J.emit("context",{prevId:e,id:t,migrated:!e&&!!t}),uo())}function Sd(e){if(bd(e.params?.threadId)){if(e.method==="turn/started"){lt=!0,uo();return}if(e.method==="turn/interrupt"){lt=!1,st="stopped",ct=!0,uo();return}e.method==="turn/completed"&&(lt=!1,st=yd(e.params?.turn?.status),st==="stopped"&&(ct=!0),uo())}}function qd(e){e.target instanceof Element&&e.target.closest(c.stopButton)&&(ct=!0,lt=!1)}function ds(){us||(us=!0,lo.on("note",Sd),Ae(xd),document.addEventListener("click",qd,!0),Xo(uo,gd))}var Ed="__reactContainer$",ms="__reactFiber$";function kr(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var Cr=(e,t)=>Object.keys(e.wrappedJSObject??e).some(o=>o.startsWith(t)),je=e=>!Cr(document,Ed)||Cr(e,ms);function Qe(){return document.body?Promise.resolve():new Promise(e=>{let t=new MutationObserver(()=>{document.body&&(t.disconnect(),e())});t.observe(document,{childList:!0,subtree:!0})})}async function Lr(){await Qe();let e=Date.now()+8e3;for(;!Cr(document.body,ms)&&Date.now()<e;)await new Promise(t=>setTimeout(t,100))}var ps={BetterNavigator:1793589484e3,BetterQuotes:1793365944e3,ChatStateFavicons:1793267531e3,Cleaner:1793267811e3,CompleteToast:1793354069e3,ComposerOpacity:1793344667e3,Continue:1793267531e3,CustomSidebarIdentity:1793267531e3,GreetingCustomizer:1793586308e3,InputHistory:1793365944e3,MessageTimestamps:1793589756e3,NoDictation:1793335268e3,NoShareLink:1793267531e3,NoSidebarIdentity:1793267531e3,PromptQueue:1793365944e3,RecentTopics:1793365944e3,ResponseNotification:1793354069e3,Settings:1793448244e3,SidebarIdentityOpacity:1793267531e3,StarChats:1793365944e3,StreamerMode:1793344667e3,TemporaryChat:1793267531e3,UserQuotes:1793345744e3,WiderChat:179333264e4};var E=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,Td="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",Md={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${Td}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:E('<path d="M18 6 6 18M6 6l12 12"/>'),gear:E('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:E('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:E('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:E('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:E('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:E('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:E('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:E('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:E('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:E('<path d="m6 9 6 6 6-6"/>'),play:E('<path d="M7 4v16l13-8z"/>'),plus:E('<path d="M12 5v14M5 12h14"/>'),check:E('<path d="m5 12 5 5 9-10"/>'),alert:E('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:E('<path d="M4 5h16v11H9l-5 4z"/>'),layout:E('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:E('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:E('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:E('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:E('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:E('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:E('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:E('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:E('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:E('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:E('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:E('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:E('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:E('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:E('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:E('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),folder:E('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),ghost:E('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},H=e=>La(Md[e]);function Ir(e){if(typeof e.showPopover=="function"){e.setAttribute("popover","manual");try{e.showPopover()}catch{e.matches(":popover-open")||e.removeAttribute("popover")}}}function we(e,t=document.body){t.append(e),Ir(e)}var ge="data-bloom-tip",Br=6,Pr=8,ut,fs=null;function Lt(e){if(e===fs)return;if(fs=e,!e){ut?.remove();return}ut??=s("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),ut.textContent=e.getAttribute(ge),we(ut);let t=e.getBoundingClientRect(),{width:o,height:n}=ut.getBoundingClientRect(),r=t.bottom+Br+n<=innerHeight-Pr;ut.style.left=`${oe(t.left+t.width/2-o/2,Pr,innerWidth-o-Pr)}px`,ut.style.top=`${r?t.bottom+Br:t.top-Br-n}px`}var gs=e=>e instanceof Element?e.closest(`[${ge}]`):null;function hs(){let e=new AbortController,t={passive:!0,signal:e.signal};return document.addEventListener("pointerover",o=>Lt(gs(o.target)),t),document.addEventListener("pointerout",o=>o.relatedTarget||Lt(null),t),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&Lt(gs(o.target)),t),document.addEventListener("focusout",()=>Lt(null),t),document.addEventListener("pointerdown",()=>Lt(null),t),()=>{e.abort(),Lt(null)}}function ze(e,t,o,n=!1){let r=s("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let a=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(a)),t(a)===!1&&r.setAttribute("aria-checked",String(!a))}),r}function U(e,t,o){return s("button",{class:Vo("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button","data-bloom":"control"},on:{click:t}})}function Q(e,t,o,n){let r=s("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":t,"data-bloom":"control",[ge]:t},on:{click:o}},H(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function pn(e,t,o,n,r,i){let a=s("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});a.value=String(e);let d=s("output",{text:`${a.value}${r}`});return a.addEventListener("input",()=>{d.textContent=`${a.value}${r}`,i(Number(a.value))}),s("div",{class:"bloom-slider"},a,d)}function Or(e,t,o){let n=s("select",{class:"bloom-select"},...t.map(r=>s("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function mo(e,t,o="",n="text"){let r=s("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var fn=["showSidebarEntry","showSidebarEntryOnHover","showAccountMenuEntry"],bs=1,It={showSidebarEntry:!0,showSidebarEntryOnHover:!1,showAccountMenuEntry:!1},Rr=e=>Object.hasOwn(It,e),Hr=e=>re("Settings",e)??It[e],ys=(e,t)=>!Rr(e)||t!==!1||fn.some(o=>o!==e&&Hr(o));function vs(){if(re("Settings","entryRevision")!==bs){for(let e of fn)fe("Settings",e);fe("Settings","entryRevision",bs)}}var Cd=new q("Themes"),kd=/^https:\/\/\S+\.css(?:[?#]|$)/i,Ld=/\/\*\*[^]*?@name[ \t]+([^\n*]+)/,Y=b({themes:{type:"custom",default:[]},quickCss:{type:"custom",default:""},quickCssEnabled:{type:"custom",default:!0}});async function As(e){let t=new TextDecoder().decode(await zo(e));if(!t.trim())throw new Error("Theme file is empty.");return t}var gn=(e,t)=>{Y.store.themes=Y.store.themes.map(o=>o.id===e?{...o,...t}:o)},ws=e=>{Y.store.themes=Y.store.themes.filter(t=>t.id!==e)};async function xs(e){if(!kd.test(e))throw new Error("Enter an https URL that ends in .css.");if(Y.store.themes.some(n=>n.url===e))throw new Error("This theme is already added.");let t=await As(e),o=t.match(Ld)?.[1]?.trim()||decodeURIComponent(new URL(e).pathname.split("/").pop()??e).replace(/\.css$/i,"").replaceAll(/[-_]/g," ");Y.store.themes=[...Y.store.themes,{id:mr("theme"),name:o,url:e,css:t,enabled:!0}]}function Ss(e,t,o){if(!t.trim())throw new Error("Name is required.");if(!o.trim())throw new Error("CSS is required.");e?gn(e,{name:t.trim(),css:o}):Y.store.themes=[...Y.store.themes,{id:mr("theme"),name:t.trim(),css:o,enabled:!0}]}async function Id(){await Promise.all(Y.store.themes.filter(e=>e.url&&e.enabled).map(async({id:e,url:t,name:o})=>{try{let n=await As(t??"");Y.store.themes.find(r=>r.id===e)?.css!==n&&gn(e,{css:n})}catch(n){Cd.warn(`Failed to refresh theme "${o}"`,n)}}))}var qs=h({name:"Themes",description:"Applies Bloom++ themes and Quick CSS.",authors:["Bloom contributors"],tags:[],icon:"spark",required:!0,hidden:!0,startAt:"Init",settings:Y,styles:()=>[...Y.store.themes.filter(e=>e.enabled).map(e=>e.css),Y.store.quickCssEnabled?Y.store.quickCss:""].join(`
`),start(){Id()}});var G=O("bloom-settings-"),Bd=3e3,Es=(e,t)=>{let o=s("textarea",{class:`bloom-input ${G("css")}`,attrs:{spellcheck:"false",placeholder:"Paste your CSS here...","aria-label":t}});return o.value=e,o},Dr=(e,t)=>s("div",{class:G("section-header")},s("div",{class:G("field-label"),text:e}),s("div",{class:G("field-desc"),text:t}));function Ts(){let{quickCss:e,quickCssEnabled:t}=Y.store,o=Es(e,"Quick CSS");return o.disabled=!t,o.addEventListener("input",()=>{Y.store.quickCss=o.value}),s("div",{class:G("section")},s("div",{class:G("field","field-inline")},Dr("Quick CSS","Your own CSS, applied on every page as you type."),ze(t,n=>{Y.store.quickCssEnabled=n,o.disabled=!n},"Enable Quick CSS")),o)}function Ms(){let e=s("div",{class:G("section")}),t=null,o=()=>s("div",{class:G("section-error"),attrs:{role:"alert"}});function n(){let l=s("input",{class:"bloom-input",attrs:{type:"url",placeholder:"https://raw.githubusercontent.com/...","aria-label":"Theme URL"}}),u=o(),m=U("Add",async()=>{m.disabled=!0,u.textContent="";try{await xs(l.value.trim()),d()}catch(p){u.textContent=p instanceof Error?p.message:String(p),m.disabled=!1}});return s("div",{class:G("section-block")},Dr("Online themes","Load a theme from a .css URL. It is fetched again on every page load, so updates apply."),s("div",{class:G("section-row")},l,m),u)}function r(){let l=t==="new"?null:t,u=s("input",{class:"bloom-input",attrs:{placeholder:"My theme","aria-label":"Theme name"}});u.value=l?.name??"";let m=Es(l?.css??"","Theme CSS"),p=o();return s("div",{class:G("section-block")},u,m,p,s("div",{class:G("section-row")},U("Save",()=>{try{Ss(l?.id??null,u.value,m.value),t=null,d()}catch(T){p.textContent=T instanceof Error?T.message:String(T)}}),U("Cancel",()=>{t=null,d()})))}function i(){return s("div",{class:G("section-block")},s("div",{class:G("field","field-inline")},Dr("Local themes","CSS stored only on this device."),!t&&U("New local theme",()=>{t="new",d()})),t&&r())}function a(l){let u,m=Q("trash","Remove",()=>{if(u){clearTimeout(u),ws(l.id),d();return}m.setAttribute("aria-pressed","true"),m.setAttribute(ge,"Click again to remove"),u=setTimeout(()=>{u=void 0,m.removeAttribute("aria-pressed"),m.setAttribute(ge,"Remove")},Bd)});return s("div",{class:G("theme")},s("div",{class:G("theme-text")},s("div",{class:`${G("card-name")} bloom-truncate`,text:l.name}),s("div",{class:`${G("field-desc")} bloom-truncate`,text:l.url??"Local"})),l.url?Q("copy","Copy URL",()=>void jo(l.url??"")):Q("edit","Edit",()=>{t=l,d()}),m,ze(l.enabled,p=>gn(l.id,{enabled:p}),`Enable ${l.name}`))}function d(){let{themes:l}=Y.store;e.replaceChildren(n(),i(),l.length?s("div",{class:G("themes")},...l.map(a)):s("div",{class:G("empty"),text:"No themes yet."}))}return d(),e}var Pd=new q("SettingsPanel"),g=O("bloom-settings-"),Od=10080*60*1e3,Rd=3e3,Cs="Toggle features. Some need a reload. Click the sliders icon to configure.",Hd="Paused: can't find its place on this page.",Dd=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Nd=[{id:"plugins",label:"Plugins"},{id:"themes",label:"Themes"},{id:"css",label:"Quick CSS"}],Ud=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],Fd={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},Ls=new Set(["chat","ui","privacy"]),j=null,po="plugins",mt="all",Nr="all",hn="",Ur=[],Is=()=>[...Z.values()].filter(e=>!e.hidden),Kd=e=>!!e.updatedAt&&Date.now()-e.updatedAt<Od;function Yd(e){switch(mt){case"favorites":return nn.has(e.name);case"recent":return Kd(e);case"all":return!0;case"other":return!e.tags.some(t=>Ls.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(mt)}}function Gd(e){switch(Nr){case"all":return!0;case"enabled":return Ce(e);case"disabled":return!Ce(e)}}function jd(e){let t=hn.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function Qd(e){let t=on.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return mt==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var Bs=e=>e.settings?.def??{},Yr=e=>Object.values(Bs(e)).some(t=>t.type!=="custom");function zd(e,t,o){let n=re(e.name,t)??Ar(o),r=i=>{if(e.name==="Settings"&&!ys(t,i))return!1;fe(e.name,t,i)};switch(o.type){case"boolean":return ze(n,r,o.description??t);case"slider":return pn(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return Or(n,o.options,r);case"string":return mo(n,r,o.placeholder);case"number":return mo(String(n),i=>r(Number(i)),"","number");case"component":{let i=s("div",{class:g("component")});return Ur.push(o.render(i)),i}case"custom":return null}}var Wd=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function Gr(e){if(!j)return;let t=Object.entries(Bs(e)).filter(([,i])=>i.type!=="custom").map(([i,a])=>{let d=zd(e,i,a),l=a.type==="boolean",u=a.type!=="component"&&s("div",{class:g("field-label"),text:Wd(i)}),m=a.description&&s("div",{class:g("field-desc"),text:a.description});return s("div",{class:g("field",l?"field-inline":"field-stacked")},(u||m)&&s("div",{class:g("field-text")},u,m),d)}),o,n=U("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},Rd);return}clearTimeout(o),e.settings?.reset(),Bt(),Gr(e)},"danger"),r=s("div",{class:g("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&Bt()}},s("div",{class:g("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},s("div",{class:g("popup-header")},s("div",{class:g("card-icon")},H(e.icon)),s("div",{class:g("popup-title")},s("div",{class:g("card-name"),text:e.name}),s("div",{class:g("popup-authors"),text:e.authors.join(", ")})),Q("close","Close",Bt)),s("p",{class:g("popup-desc"),text:e.description}),s("div",{class:g("fields")},...t),s("div",{class:g("popup-footer")},n)));j.querySelector(`.${g("modal")}`)?.append(r)}function Bt(){for(let e of Ur)e();Ur=[],j?.querySelector(`.${g("popup-backdrop")}`)?.remove()}function ks(e){let t=Ce(e),o=nn.has(e.name),n=on.has(e.name),r=!!e.required,i=Ka(e.name);return s("div",{class:[g("card",t?"card-on":"card-off"),r?g("card-required"):""].filter(Boolean).join(" ")},s("div",{class:g("card-top")},s("div",{class:g("card-icon")},H(e.icon)),s("div",{class:g("card-actions")},Q("star",o?"Unstar":"Star",()=>{nn.toggle(e.name),dt()},o),r?null:Q("pin",n?"Unpin":"Pin to top",()=>{on.toggle(e.name),dt()},n),r?s("span",{class:g("required-mark"),attrs:{"aria-label":"Required",[ge]:"This plugin is required for Bloom++ to work"}},H("alert")):null,Yr(e)&&Q("gear","Settings",()=>Gr(e)),ze(t,a=>Va(e,a),r?`${e.name} is required`:`Enable ${e.name}`,r))),s("div",{class:g("card-name")},e.name,Fa(e.name)&&s("span",{class:g("new-badge"),text:"New"})),s("div",{class:g("card-desc"),text:e.description,title:e.description}),i&&s("div",{class:g("card-issue"),attrs:{[ge]:`Missing: ${i.join(", ")}`}},H("alert"),s("span",{text:Hd})),s("div",{class:g("card-footer"),text:e.authors.join(", ")}))}function Ps(){let e=Is().some(o=>!o.tags.some(n=>Ls.has(n)));j?.querySelector(`.${g("tabs")}`)?.replaceChildren(...Dd.filter(o=>o.id!=="other"||e).map(o=>s("button",{class:g("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===mt)},on:{click:()=>{mt=o.id,Ps(),dt()}}})))}function dt(){if(!j)return;let e=Is().filter(Yd),t=j.querySelector(`.${g("search")} input`);t&&(t.placeholder=`Search ${ya(e.length,"plugin")}...`);let o=Qd(e.filter(u=>jd(u)&&Gd(u))),n=mt==="all",r=n?o.filter(u=>!u.required):o,i=n?o.filter(u=>u.required):[],a=[...r.map(ks),...i.length?[s("div",{class:g("required-break"),attrs:{role:"separator"}}),...i.map(ks)]:[]],d=hn.trim()?"No plugins match your search.":Fd[mt]??"No plugins available.";j.querySelector(`.${g("grid")}`)?.replaceChildren(...a.length?a:[s("div",{class:g("empty"),text:d})])}function Vd(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),j?.querySelector(`.${g("popup-backdrop")}`)?Bt():We())}var Os,Fr;function Kr(){let e=j?.querySelector(`.${g("body")}`);if(!j||!e)return;for(let o of j.querySelectorAll(`.${g("nav-item")}`))o.setAttribute("aria-selected",String(o.getAttribute("data-section")===po));if(Bt(),po==="themes"){e.replaceChildren(Ms());return}if(po==="css"){e.replaceChildren(Ts());return}let t=s("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});t.value=hn,t.addEventListener("input",()=>{hn=t.value,dt()}),e.replaceChildren(s("div",{class:g("tabs"),attrs:{role:"tablist"}}),s("div",{class:g("toolbar")},s("label",{class:g("search")},H("search"),t),Or(Nr,Ud,o=>{Nr=o,dt()})),s("div",{class:g("grid")})),Ps(),dt(),t.focus()}function Pt(e,t){e&&(po=e),j?(Kr(),Ir(j)):Jd();let o=t&&Z.get(t);o&&Gr(o)}function Jd(){j=s("div",{class:`bloom-root ${g("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:e=>e.target===e.currentTarget&&We()}},s("div",{class:g("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},s("div",{class:g("header")},s("div",{class:g("logo")},H("bloom")),s("h2",{class:g("title"),text:"Bloom++"}),s("span",{class:g("hint"),attrs:{"aria-label":Cs,tabindex:"0",[ge]:Cs}},H("info")),s("div",{class:g("nav"),attrs:{role:"tablist"}},...Nd.map(e=>s("button",{class:g("nav-item"),text:e.label,attrs:{type:"button",role:"tab","data-section":e.id},on:{click:()=>{po=e.id,Kr()}}}))),s("span",{class:g("version"),text:"v2.0.120"}),Q("close","Close",We)),s("div",{class:g("body")}))),j.addEventListener("keydown",e=>e.stopPropagation()),Fr=new AbortController,document.addEventListener("keydown",Vd,{capture:!0,signal:Fr.signal}),we(j),Kr(),Os=$a(dt),Pd.debug("Opened")}function We(){Bt(),Fr?.abort(),Os?.(),j?.remove(),j=null}var Ot=()=>j?We():Pt(),Rs=()=>!!j;var Hs=new q("AppLandmarks"),Zd={Settings:[c.rail],WiderChat:[":root"],StreamerMode:[c.sidebarScroll,c.rail],ComposerOpacity:[c.composer,c.composerInput],ResponseNotification:[c.composerInput],InputHistory:[c.composerInput],Continue:[c.composerInput],StarChats:[c.turn],BetterNavigator:[c.timelineScroll,c.turn],BetterQuotes:[c.turn],MessageTimestamps:[c.turn],RecentTopics:[c.sidebarScroll]};function Ds(){let e=Ct();for(let[t,o]of Object.entries(Zd)){let n=Z.get(t);if(!n||n.required||!Ce(n)){xr(t,null);continue}let r=o.some(i=>ke(i));if(xr(t,r||e&&o.includes(c.turn)?null:o),!r){if(!Sr(n.name))continue;za(n),Hs.warn(`${t} paused; missing ${o.join(", ")}`);continue}Sr(n.name)||(Wa(n),Hs.info(`${t} resumed`))}}function Ns(){return Ds(),k(()=>Ds())}var Sy=new q("Route"),$d=/\/c\/(?!local-)([\w-]+)/;var Xd=()=>location.pathname.match($d)?.[1]??null;var qy=location.href,Ey=Xd();var _d=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,em=/\S+@\S+\.\S+/,tm=3;var om=e=>!!e.closest(".sr-only");function nm(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!y(t.textContent??"")&&!(t instanceof SVGElement))}var rm=e=>{if(/rounded-full/.test(e.getAttribute("class")??""))return!0;if(!e.clientWidth)return!1;let{borderRadius:t}=getComputedStyle(e);return t.includes("%")||Number.parseFloat(t)>=e.clientWidth/2};function bn(e,t,o){for(let n of e.querySelectorAll(`[${t}]`))n!==o&&n.removeAttribute(t);o&&!o.hasAttribute(t)&&o.setAttribute(t,"")}function im(e,t){if(y(e.textContent??"").length>tm)return null;let o=e.closest("button");for(let n=e;n&&n!==t&&n!==o;n=n.parentElement)if(rm(n))return n;return null}function yn(e,t){e.hasAttribute(`data-bloom-${t}`)||e.setAttribute(`data-bloom-${t}`,"");let o=e.querySelector("img:not([data-bloom] img)"),n=nm(e),r=o?null:n.map(m=>im(m,e)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),a=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");bn(e,`data-bloom-${t}-avatar`,a);let d=n.filter(m=>!a?.contains(m)&&!om(m)),l=d.find(m=>_d.test(y(m.textContent??""))),u=d.find(m=>em.test(m.textContent??""));bn(e,`data-bloom-${t}-plan`,l),bn(e,`data-bloom-${t}-email`,u),bn(e,`data-bloom-${t}-name`,d.find(m=>m!==l&&m!==u))}var Us=()=>Ge(c.rail).filter(ne);function Fs(e){return ke(c.profile,e)??[...e.querySelectorAll(c.menuButton)].findLast(ne)??null}function am(e,t){return[...e.children].find(n=>n instanceof HTMLElement&&n!==t&&n.contains(t))??t}function Ks(){return Us().flatMap(e=>{let t=Fs(e);if(!t)return[{kind:"rail",anchor:e,insert:n=>e.append(n)}];let o=am(e,t);return[{kind:"rail",anchor:o,insert:n=>(o===t?e:o).append(n)}]})}var jr=()=>Us().map(Fs).filter(e=>e!=null);function sm(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function vn(){return jr().map(sm).find(e=>e!=null)??Ge('[role="menu"]').find(e=>!e.closest("[data-bloom]")&&/log ?out|sign out|退出/i.test(e.textContent??""))??null}var Qr=e=>Ge(c.threadRow).filter(t=>t.getAttribute("data-app-action-sidebar-thread-id")===e);function fo(e){let t=Qr(e)[0]??Ge(c.threadRow).find(n=>{let r=n.getAttribute("data-app-action-sidebar-thread-id")??"";return r.endsWith(e)||e.endsWith(r.replace(/^local:/,""))});return(t?.getAttribute("data-app-action-sidebar-thread-title")??y(t?.textContent??""))||null}function Ys(e){return null}var zr=0,An;function lm(e){if(!W(e))return;for(let o of jr())yn(o,"profile");let t=vn();t&&yn(t,"menu")}function xe(){zr++;let e=!0;return Qe().then(()=>{e&&zr&&!An&&(An=k(lm))}),()=>{e&&(e=!1,!--zr&&(An?.(),An=void 0))}}var Gs=`/*
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
`;var ee=O("bloom-entry-"),um=4,Vr="--bloom-entry-x",Jr=1,js=4,Qs=8,dm=150,ce=b({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar.",default:It.showSidebarEntry},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:It.showSidebarEntryOnHover},showAccountMenuEntry:{type:"boolean",description:"Show Bloom++ at the top of the account menu.",default:It.showAccountMenuEntry},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:e=>(e.append(U("Reset position",()=>{ce.store.entryPosition=Jr})),()=>e.replaceChildren())},showBloomMenu:{type:"boolean",description:"Hovering the Bloom++ row in the account menu opens a menu with Plugins, Themes, Quick CSS and plugin settings.",default:!0},menuPlugins:{type:"component",description:"Plugins listed in that menu.",render:e=>(e.append(...Vs().map(t=>s("div",{class:ee("menu-pick")},H(t.icon),s("span",{class:"bloom-truncate",text:t.name}),ze(Js(t),o=>{ce.store.menuPicks={...ce.store.menuPicks,[t.name]:o}},`List ${t.name} in the menu`)))),()=>e.replaceChildren())},entryPosition:{type:"custom",default:Jr},menuPicks:{type:"custom",default:{}}}),pt=new Map,Ve=null,go,Vs=()=>[...Z.values()].filter(e=>!e.hidden).toSorted((e,t)=>e.name.localeCompare(t.name)),Js=e=>ce.store.menuPicks[e.name]??Yr(e),zs=!1,Wr=[];function mm(e,t,o){let n=e.currentTarget,r=t.clientWidth-n.offsetWidth;if(e.button!==0||r<=0||!t.classList.contains(ee("hover")))return;let i=ce.store.entryPosition,a=i,d=!1,l=new AbortController;n.setPointerCapture(e.pointerId),n.addEventListener("pointermove",m=>{!d&&Math.abs(m.clientX-e.clientX)<um||(d=!0,o(),a=oe(i+(m.clientX-e.clientX)/r,0,Jr),t.style.setProperty(Vr,String(a)))},{signal:l.signal});let u=()=>{l.abort(),d&&(ce.store.entryPosition=a,t.style.removeProperty(Vr))};n.addEventListener("pointerup",u,{signal:l.signal}),n.addEventListener("lostpointercapture",u,{signal:l.signal})}function pm(e){let t=!1,o=s("button",{class:ee("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),t||Ot(),t=!1},pointerdown:r=>{t=!1,e!=="rail"&&mm(r,n,()=>{t=!0})}}},H("bloom"),e!=="rail"&&s("span",{class:ee("label"),text:"Bloom++"})),n=s("div",{class:`bloom-root ${ee("wrap")} ${ee(e)}`,attrs:{"data-bloom":"entry"}},o);return n}function ho(){clearTimeout(go),Ve?.remove(),Ve=null}function Zs(){clearTimeout(go),go=setTimeout(ho,dm)}var $s=e=>e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0}));function fm(e,t){if(clearTimeout(go),Ve?.isConnected||!ce.store.showBloomMenu)return;let o=(l,u,m)=>s("div",{class:ee("flyout-item"),attrs:{role:"menuitem"},on:{pointerdown:p=>{p.button===0&&(p.preventDefault(),p.stopPropagation(),ho(),$s(t),m())}}},H(u),s("span",{class:"bloom-truncate",text:l})),n=Vs().filter(Js);Ve=s("div",{class:`bloom-root ${ee("flyout")}`,attrs:{"data-bloom":"menu-flyout",role:"menu","aria-label":"Bloom++"},on:{pointerenter:()=>clearTimeout(go),pointerleave:Zs}},o("Plugins","bloom",()=>Pt("plugins")),o("Themes","spark",()=>Pt("themes")),o("Quick CSS","edit",()=>Pt("css")),n.length>0&&s("div",{class:ee("flyout-break"),attrs:{role:"separator"}}),...n.map(l=>o(l.name,l.icon,()=>Pt("plugins",l.name)))),we(Ve);let r=t.getBoundingClientRect(),{width:i,height:a}=Ve.getBoundingClientRect(),d=r.right+js;Ve.style.left=`${d+i>innerWidth?r.left-i-js:d}px`,Ve.style.top=`${oe(e.getBoundingClientRect().top,Qs,innerHeight-a-Qs)}px`}function gm(e){let t=s("div",{class:`bloom-root ${ee("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),ho(),$s(e),Ot()},pointerenter:()=>fm(t,e),pointerleave:Zs}},H("bloom"),s("span",{text:"Bloom++"}),ce.store.showBloomMenu&&s("span",{class:ee("menu-chevron")},H("chevron"))),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function Ws(){ho();for(let e of document.querySelectorAll('[data-bloom="entry"], [data-bloom="menu-entry"]'))e.remove();pt.clear()}function hm(){for(let e of document.querySelectorAll('[data-bloom="menu-entry"]'))e.remove()}function Xs(){let{showSidebarEntry:e,showSidebarEntryOnHover:t,showAccountMenuEntry:o}=ce.store,n=e||t?Ks():[],r=new Set(n.map(a=>a.anchor));for(let[a,d]of pt)a.isConnected&&r.has(a)||(d.remove(),pt.delete(a));for(let a of document.querySelectorAll('[data-bloom="entry"]'))[...pt.values()].includes(a)||a.remove();for(let a of n){let d=pt.get(a.anchor);if(d?.isConnected||!je(a.anchor))continue;let l=d??pm(a.kind);pt.set(a.anchor,l),a.insert(l)}for(let a of pt.values())a.classList.toggle(ee("hover"),!e);if(!o){hm();return}let i=vn();i&&!i.querySelector('[data-bloom="menu-entry"]')&&gm(i),i||ho()}function bm(e){fn.some(Hr)||(ce.store[Rr(e??"")?e:"showSidebarEntry"]=!0),Xs()}var _s=h({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:ce,styles:()=>`${Gs}[data-app-navigation-rail] [data-bloom=entry]{position:absolute;inset:auto;left:50%;bottom:100%;transform:translateX(-50%);width:max-content;margin:0;padding-block:0.25rem;pointer-events:none;z-index:5;display:flex;justify-content:center}[data-app-navigation-rail]>[data-bloom=entry]{bottom:2.75rem}[data-app-navigation-rail] [data-bloom=entry] .bloom-entry-button{pointer-events:auto}[data-app-navigation-rail] [data-bloom=entry].bloom-entry-hover:not(:hover > *){display:none;transition:display 0s 0.2s allow-discrete}.${ee("hover")}{${Vr}:${ce.store.entryPosition}}`,start(){vs(),Ws(),Wr=[k(Xs),hs(),xe()],!zs&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",Ot),zs=!0)},stop(){for(let e of Wr)e();Wr=[],Ws(),We()},onSettingsChange:bm});var ym=["data-turn","data-message-author-role"],vm=/:(user|assistant)$/,Zr=`${c.messageUnit}, ${c.oldMessage}`,xn=e=>e==="user"||e==="assistant",nl=()=>!!document.querySelector(c.timelineScroll),rl=()=>!!ve(c.timelineScroll),$r=()=>v()??"",Sn=()=>nl()?ve(c.timelineScroll):document;function bo(){if(nl())return ve(c.timelineScroll);let e=document.querySelector(c.turn);for(let t=e?.parentElement;t;t=t.parentElement){let{overflowY:o}=getComputedStyle(t);if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight)return t}return document.scrollingElement}var Se=e=>{let t=e.getAttribute("data-chatgpt-search-unit-key")?.match(vm)?.[1];return xn(t)?t:e.matches(c.userBubble)?"user":e.matches(c.assistantReply)||e.matches(c.assistantMarkdown)?"assistant":null},il=e=>{let t=[...e.querySelectorAll(c.searchUnit)].filter(n=>Se(n)&&!n.parentElement?.closest(c.searchUnit));return t.length?t:[...e.querySelectorAll(`${c.userBubble}, ${c.assistantReply}`)].filter(n=>Se(n)&&!n.parentElement?.closest(`${c.userBubble}, ${c.assistantReply}`))},el=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id")??e.getAttribute("data-response-annotation-target"))?.split(/\s+/).filter(Boolean)??[];function ft(e){let t=el(e);if(t.length)return t;let o=[...new Set([...e.querySelectorAll(Zr)].flatMap(el))];if(o.length)return o;let n=e.closest("[data-turn-key]")?.getAttribute("data-turn-key")?.replace(/^history-content:/,"");return n&&Se(e)==="user"?[n]:[]}function yo(e=Sn()){if(!e)return[];let t=il(e);return t.length?t:[...e.querySelectorAll(Zr)].filter(o=>!o.parentElement?.closest(Zr))}function Am(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function wm(e){for(let t of ym){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(xn(o))return o}return e.querySelector(c.markdown)||e.querySelector(c.generatedImage)?"assistant":null}var xm=e=>!e.parentElement?.closest(c.turn);function Je(){let e=Ie(v())?.chain??[];return[...Sn()?.querySelectorAll(c.turn)??[]].filter(xm).flatMap(o=>{let n=il(o),r=n.length?n.map(i=>({el:i,known:Se(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=u=>!n.some(m=>m.contains(u))&&y(u.textContent??""),a=[...o.querySelectorAll(c.assistantMarkdown)].find(u=>i(u)&&!wn.test(y(u.textContent??""))),d=[...o.querySelectorAll(c.activityHeader)].findLast(i),l=a??d;l&&r.push({el:l,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?ft(o):yo(o).flatMap(ft),a=n??wm(o)??Am(i,e)??(r%2?"assistant":"user"),d=o.closest(c.turn)??o,l=!o.closest(c.searchUnit)&&!!d.querySelector(c.turnBusy),u=a==="assistant"&&(o.matches(c.turnBusy)||!!o.querySelector(c.turnBusy)||l);return{el:o,role:a,messageIds:i,streaming:u}})}var Sm="[data-bloom], .sr-only",al=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,wn=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,tl=new WeakMap;function Rt(e){let o=(e.el.closest(c.turn)??e.el).textContent?.length??0,n=tl.get(e.el);if(n?.length===o)return n.summary;let r=qm(e);return tl.set(e.el,{length:o,summary:r}),r}function ol(e){let t=new Set,o=[];for(let n of e.querySelectorAll(c.assistantMarkdown)){if(n.closest(c.searchUnit))continue;let r=y(n.textContent??"");!r||wn.test(r)||al.test(r)||t.has(r)||(t.add(r),o.push(r))}return o}function qm(e){let t=e.el.querySelectorAll(c.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.closest(c.turn);if(e.role==="assistant"&&o&&e.el.matches(c.assistantMarkdown)&&!e.el.closest(c.searchUnit)){let l=ol(o);if(l.length)return l.join(" \xB7 ")}let n=e.el.querySelector(e.role==="assistant"?`${c.markdown}, ${c.assistantMarkdown}`:".whitespace-pre-wrap")??e.el,i=[...n.querySelectorAll(Sm)].map(l=>y(l.textContent??"")).filter(Boolean).reduce((l,u)=>l.replace(u,`
`),n.innerText||n.textContent||""),a=i.split(`
`).map(y).filter(l=>l&&!al.test(l)&&!wn.test(l));if(a.length)return a.join(" ");if(e.role==="assistant"&&o){let l=ol(o);if(l.length)return l.join(" \xB7 ")}let d=i.split(`
`).map(y).filter(l=>wn.test(l));return d.length?d.at(-1)??"":e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function qn(e){return e.text?y(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var Xr=e=>e.matches(c.timelineScroll)&&getComputedStyle(e).flexDirection==="column-reverse";var ii=new q("AppNetwork"),qe=Mt(),En=new Map,sl=new Map,Ht=new Map,ll=new Map,ti=new Map,gt=new Map,cl=new Map,hl=new Set,vo=new Set,Em=800,ai=6e3,Tm=200,Mm=3,Cm=/\d{1,2}:\d{2}/,ul=new WeakMap,dl;var km=e=>e==="user"||e==="assistant";function Ao(e){let t=e.replace(/^local:/,"");return[...new Set([e,t,`local:${t}`])]}function bl(e){let t=Ao(e);for(let n of t){let r=En.get(n);if(r)return r}let o={id:t[0]??e,title:null,chain:[],times:new Map};for(let n of t)En.set(n,o);return o}function Tn(e){return Ao(e)[0]??e}function Mn(e){if(!e)return!1;let t=Tn(e);if(!hl.has(t))return!1;let o=gt.get(t);if(o==null||Date.now()-o<ai)return!1;if(vo.has(t))return!0;let n=Ht.get(t);return n==null||Date.now()-n<Em?!1:(vo.add(t),!0)}function Lm(){dl||(dl=Xo(()=>{let e=v();if(!e)return;let t=Tn(e);vo.has(t)&&Date.now()-(gt.get(t)??0)>=ai||Al(e)},Tm))}function Im(e){let t=cl.get(e);return t||(t=new Set,cl.set(e,t)),t}function Bm(e,t){let o=Tn(e.id);hl.add(o),gt.has(o)||gt.set(o,Date.now());let{length:n}=e.chain;n>(ll.get(o)??0)&&(ll.set(o,n),Ht.set(o,Date.now()),vo.delete(o)),t>(ti.get(o)??0)&&(ti.set(o,t),vo.has(o)||Ht.set(o,Date.now())),Ht.has(o)||Ht.set(o,Date.now())}function Ie(e){if(!e)return null;Lm(),Al(e);let t=Ao(e);return t.map(o=>En.get(o)).find(o=>o&&(o.chain.length||o.title))??En.get(t[0]??e)??null}function oi(e,t,o,n=null){return{id:e,role:t,createTime:n,text:y(o),hasFiles:!1,imageCount:0}}function ni(e,t){let o=e.chain.find(r=>r.id===t.id);if(o){t.text&&(o.text=t.text),t.createTime!=null&&(o.createTime=t.createTime);return}if(e.chain.find(r=>r.role===t.role&&r.text&&r.text===t.text)){!e.times.has(t.id)&&t.createTime!=null&&e.times.set(t.id,t.createTime);return}e.chain.push(t)}function yl(e){let t=e.chain.map(o=>`${o.id}	${o.role}	${o.text}`).join(`
`);sl.get(e.id)!==t&&(sl.set(e.id,t),qe.emit("conversation",e))}function ml(e){if(typeof e=="function")try{return y(String(e()??""))}catch(t){return ii.warn("Turn label failed",t),""}return typeof e=="string"?y(e):""}function pl(e){if(typeof e!="function")return"";try{let t=e();return typeof t=="string"?y(t):B(t)&&typeof t.response=="string"?y(t.response):""}catch(t){return ii.warn("Turn preview failed",t),""}}function vl(e){let t=Object.keys(e).find(o=>o.startsWith("__reactFiber$")||o.startsWith("__reactInternalInstance$"));return t?e[t]??null:null}function fl(e){if(!e)return null;let t=ul.get(e);if(t)return t;for(let o of e.querySelectorAll("span"))if(!(o.childElementCount||!Cm.test(o.textContent??"")))for(let n=vl(o),r=0;n&&r<Mm;n=n.return,r++){let i=B(n.memoizedProps)?n.memoizedProps.sentAtMs:null;if(typeof i=="number")return ul.set(e,i),i}return null}function Pm(e,t){for(let o of t.querySelectorAll(c.turn)){let n=o.getAttribute("data-turn-key")?.replace(/^.*turn:/,"");if(!n)continue;let r=fl(o.querySelector(c.userBubble)),i=fl([...o.querySelectorAll(c.assistantSentTime)].at(-1));r&&e.times.set(`turn:${n}`,r),i&&e.times.set(`${n}:assistant`,i);for(let a of o.querySelectorAll(c.searchUnit)){let d=Se(a)==="user"?r:i;if(d)for(let l of ft(a))e.times.set(l,d)}if(i)for(let a of o.querySelectorAll(c.assistantReply))e.times.set(a.getAttribute("data-response-annotation-target"),i)}}function ri(e,t,o,n){if(!e||t>24)return;let r=(B(e.memoizedProps)?e.memoizedProps:null)??(B(e.pendingProps)?e.pendingProps:null);if(r){if(Array.isArray(r.items)&&B(r.items[0])&&typeof r.items[0].turnKey=="string"){let i=r.items.filter(B);i.length>o.length&&(o.length=0,o.push(...i))}if(Array.isArray(r.entries)&&B(r.entries[0])&&typeof(r.entries[0].historyEntityKey??r.entries[0].turnId)=="string"){let i=r.entries.filter(B);i.length>n.length&&(n.length=0,n.push(...i))}}ri(e.child??null,t+1,o,n),ri(e.sibling??null,t,o,n)}function Om(e,t){let o=typeof t.turnId=="string"?t.turnId:"",n=typeof t.turnKey=="string"?t.turnKey:"";return e.find(r=>{let i=typeof r.turnKey=="string"?r.turnKey:"";return!!i&&(o===i||n.endsWith(i)||n.includes(i))})??null}function gl(e,t){return Ao(e).some(o=>Ao(t).includes(o))}function si(e){let t=e.replace(/^history-content:/,"").replace(/^turn:/,"").replace(/:assistant$/,"");return t?[...new Set([e,t,`turn:${t}`,`${t}:assistant`,`local:${t}`])]:[]}function Rm(e){let t=new Set;for(let o of e.querySelectorAll("[data-turn-key], [data-response-annotation-target], [data-chatgpt-search-message-ids]"))for(let n of[o.getAttribute("data-turn-key"),o.getAttribute("data-response-annotation-target"),...(o.getAttribute("data-chatgpt-search-message-ids")??"").split(/\s+/)])if(n)for(let r of si(n))t.add(r);return t}function Hm(e){let t=new Set;for(let o of e.chain)for(let n of si(o.id))t.add(n);return t}function Dm(e){return e.getAttribute("data-response-annotation-conversation")??e.querySelector("[data-response-annotation-conversation]")?.getAttribute("data-response-annotation-conversation")??null}function Nm(){return[...document.querySelectorAll(`${c.conversationTarget}, ${c.timelineScroll}`)].filter(ne)}var _r=(e,t)=>t.length>e.length?t:e;function Al(e){let t=Nm();if(!t.length)return;let o,n=[],r=[];for(let S of t){let C=Dm(S);if(C&&!gl(e,C))continue;let I=[],$=[];try{ri(vl(S),0,I,$)}catch(qt){ii.warn("Fiber walk failed",qt);continue}let N=_r(I,$),me=typeof N[0]?.conversationId=="string"?N[0].conversationId:"";if(me&&!gl(e,me))continue;let dr=_r(n,r);N.length>dr.length&&(o=S,n=I,r=$)}if(!o)return;let i=_r(n,r);if(!i.length)return;let a=typeof i[0]?.conversationId=="string"?i[0].conversationId:"",d=bl(e);d.title=fo(e)??fo(a||e)??d.title,Pm(d,o);let l=Tn(e);gt.has(l)||gt.set(l,Date.now());let u=i.filter(S=>ml(S.getLabel)||pl(S.getPreview)).length,m=Mn(e);!m&&u>(ti.get(l)??0)&&Ht.delete(l);let p=Rm(o),T=Hm(d),f=Im(l),x=Date.now()-(gt.get(l)??0)<ai;for(let S of i){let C="";typeof S.turnId=="string"?C=S.turnId:typeof S.turnKey=="string"&&(C=S.turnKey.replace(/^.*turn:/,""));let I=typeof S.historyEntityKey=="string"?S.historyEntityKey:C?`turn:${C}`:"",$=Om(n,S),N=ml($?.getLabel??S.getLabel),me=pl($?.getPreview??S.getPreview);C&&!N&&!me&&f.add(C);let dr=[I,C].some(Pu=>si(Pu).some(ba=>T.has(ba)||p.has(ba)));if(m&&!dr&&!(x&&C&&f.has(C)))continue;let qt=typeof S.timestampSeparatorAtMs=="number"?S.timestampSeparatorAtMs:null;I&&N&&(ni(d,oi(I,"user",N,qt)),qt&&d.times.set(I,qt)),C&&me&&ni(d,oi(`${C}:assistant`,"assistant",me,qt)),C&&(N||me)&&f.delete(C)}Bm(d,u),yl(d)}function Um(e){if(km(e.role))return e.role;let t=typeof e.type=="string"?e.type:typeof e.itemType=="string"?e.itemType:"";return/user/i.test(t)?"user":/agent|assistant/i.test(t)?"assistant":null}function Fm(e){return typeof e.text=="string"?e.text:typeof e.content=="string"?e.content:B(e.content)&&typeof e.content.text=="string"?e.content.text:""}function ei(e,t){if(!e||!B(t))return;let o=typeof t.id=="string"?t.id:typeof t.itemId=="string"?t.itemId:"",n=Um(t),r=Fm(t);if(!o||!n)return;let i=bl(e);ni(i,oi(o,n,r)),yl(i)}function Km(e){let t=e.params?.thread,o=e.params?.threadId??(B(t)&&typeof t.id=="string"?t.id:void 0);e.params?.item&&ei(o,e.params.item);for(let n of e.params?.items??[])ei(o,n);if(B(t)&&Array.isArray(t.items))for(let n of t.items)ei(o,n)}lo.on("note",Km);var Ym=80,Gm=420;function li(e,t,o){return(e.x-o.x)*(t.y-o.y)-(t.x-o.x)*(e.y-o.y)}function jm(e,t,o,n){let r=li(e,t,o),i=li(e,o,n),a=li(e,n,t);return!((r<0||i<0||a<0)&&(r>0||i>0||a>0))}function Qm(e,t){let o=(t.left+t.right)/2-(e.left+e.right)/2,n=(t.top+t.bottom)/2-(e.top+e.bottom)/2;if(Math.abs(o)>=Math.abs(n)){let i=o<0?t.right:t.left;return[{x:i,y:t.top},{x:i,y:t.bottom}]}let r=n<0?t.bottom:t.top;return[{x:t.left,y:r},{x:t.right,y:r}]}function wl(e,t){let o=oe(e.x,t.left,t.right),n=oe(e.y,t.top,t.bottom);return Math.hypot(e.x-o,e.y-n)}function Cn(e){let t=e.closeDelay??Ym,o=e.towardDelay??Gm,n=0,r=!1,i=null,a=null,d=()=>{document.removeEventListener("pointermove",f,!0)},l=()=>{n&&window.clearTimeout(n),n=0,d(),i=null,a=null},u=()=>{l(),r&&(r=!1,e.setHeld(!1))},m=()=>{r||(r=!0,e.setHeld(!0))},p=x=>{n&&window.clearTimeout(n),n=window.setTimeout(u,x)},T=x=>{let S=e.panel(),C=e.trigger();if(!S||!i)return!1;let I=S.getBoundingClientRect();if(I.width<=0&&I.height<=0)return!1;let $=C?.getBoundingClientRect(),[N,me]=$&&($.width||$.height)?Qm($,I):[{x:I.left,y:I.top},{x:I.right,y:I.bottom}];return jm(x,i,N,me)?!0:a!=null&&wl(x,I)<wl(a,I)-.25},f=x=>{let S={x:x.clientX,y:x.clientY};if(e.over(x.target)){l();return}T(S)?p(o):u(),a=S};return{enter(){l()},leave(x){if(e.over(x.relatedTarget)){l();return}i={x:x.clientX,y:x.clientY},a=i,m(),document.addEventListener("pointermove",f,!0),p(t)},dispose(){l(),r=!1}}}var xl=`/*
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
`;var M=O("bloom-nav-"),In=80,Wm=1200,Vm=2,Sl=3e4,Jm=200,Zm=.9,$m=.28,Xm=24,Dt=8,_m=80,ci=80,Ll=`${c.rightPanel}, ${c.summaryPanel}`,ep={user:"\u2753",assistant:"\u{1F916}"},tp=["wheel","touchmove","pointerdown"],Hn=b({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),A=null,D=[],ue=-1,ht=-1,Nt=null,bt="",di=0,mi=[],qo=null,kn=null,Ln=new Set,Be,wo,Pe,xo="",he=[],Eo=null,Bn=new Set,Pn=new Map,Ze=!1,op=e=>Hn.store.showAssistant||e.role==="user",np=e=>e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.messageIds[0]||e.role;function rp(e){return{role:e.role,summary:Rt(e),ids:e.messageIds,turn:e,streaming:e.streaming}}function Il(e,t){let o=e.entries.at(-1);if(o?.role==="assistant"&&t.role==="assistant"){e.entries[e.entries.length-1]={...t,ids:[...new Set([...o.ids,...t.ids])]};return}e.entries.push(t)}function ip(){let e=[];for(let t of Je()){let o=rp(t),n=np(t),r=e.at(-1),i=!t.el.closest("[data-turn-key]");r&&(r.key===n||i&&o.role==="assistant")?Il(r,o):e.push({key:n,entries:[o]})}return e}function ap(){let e=[];for(let t of Ie($r()||v())?.chain??[]){let o={role:t.role,summary:qn(t),ids:[t.id],turn:null,streaming:!1},n=e.at(-1);t.role==="assistant"&&n?Il(n,o):e.push({key:t.id,entries:[o]})}return e}var Ut=e=>e.entries.flatMap(t=>t.ids);function On(e,t){let o=new Set(Ut(e));return Ut(t).some(n=>o.has(n))}var Oe=e=>y(e.entries.find(t=>t.role==="user")?.summary??""),ui=(e,t)=>e.filter(o=>Oe(o)===t).length,pi=e=>({...e,turn:null,streaming:!1});function sp(e,t){let o=new Set(t.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return e.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return pi(r);let a=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return a&&a!==n.key?pi(r):r})}))}function ql(e,t){let o=t.entries.map((n,r)=>{let i=e.entries[r];if(!i)return n;let a=[...new Set([...n.ids,...i.ids])];return{...n,ids:a,summary:n.summary||i.summary}});for(let n of e.entries.slice(o.length))o.push(pi(n));return{key:e.key,entries:o}}function Bl(){let e=bo();if(!e)return!1;let t=e.clientHeight-e.scrollHeight;return e.scrollTop-t<=Math.abs(e.scrollTop)}function lp(e,t){let o=sp(e,t).filter(l=>t.some(u=>u.key===l.key)||!t.some(u=>On(u,l)));if(!t.length)return o;if(!o.length)return t;let n=t.findIndex(l=>o.some(u=>u.key===l.key));if(n<0)return Bl()?t.concat(o):o.concat(t);let r=t[n]?.key,i=o.findIndex(l=>l.key===r),a=o.slice(0,i).concat(t.slice(0,n),o.slice(i)),d=a.findIndex(l=>l.key===r);for(let l=n;l<t.length;l++){let u=t[l];if(!u)continue;let m=a.findIndex(p=>p.key===u.key);if(m>=0){let p=a[m];p&&(a[m]=ql(p,u)),d=m}else{let p=Oe(u),T=p?a.findIndex((x,S)=>S>d&&!Rn(x)&&Oe(x)===p):-1,[f]=T>=0?a.splice(T,1):[];a.splice(d+1,0,f?{...ql(f,u),key:u.key}:u),d++}}return a}function cp(e,t){let o=0,n=0,r=0;for(let i=1-e.length;i<t.length;i++){let a=0,d=0;for(let u=0;u<e.length;u++){let m=t[u+i],p=e[u];!m||!p||(On(p,m)?(a+=3,d++):Oe(p)&&Oe(p)===Oe(m)&&a++)}let l=Bl()?i<r:i>r;(a>o||a===o&&d>n||a===o&&d===n&&l)&&(o=a,n=d,r=i)}return{score:o,offset:r}}function up(e,t){let o=e.entries.map((n,r)=>{let i=t.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of t.entries.slice(o.length))o.push({...n,turn:null});return{key:e.key,entries:o}}function gi(e){return e.map(t=>({key:t.key,entries:t.entries.map(o=>({...o}))}))}function dp(e,t,o=!0){if(!t.length)return e;if(!e.length)return t;let{score:n,offset:r}=cp(e,t),i=gi(e);if(n>0)for(let l=0;l<i.length;l++){let u=t[l+r],m=i[l];if(!u||!m)continue;let p=Oe(m),T=!!p&&p===Oe(u)&&ui(e,p)===1&&ui(t,p)===1;(On(m,u)||T)&&(i[l]=up(m,u))}let a=[],d=[];for(let l=0;l<t.length;l++){let u=t[l];if(!u)continue;let m=Oe(u);!m||ui(i,m)>0||i.some(p=>On(p,u))||o&&(n>0&&l<r?a.push(u):d.push(u))}return a.concat(i,d)}var Rn=e=>e.entries.some(t=>t.turn?.el.isConnected);function mp(e,t,o){let n=e.findIndex(i=>Ut(i).includes(t));if(n>=0)return n+1;let r=e.find(Rn);return o&&r&&Ut(r).includes(o)?0:e.length}function pp(e){if(Eo){let{parent:t,user:o}=Eo;for(let n of e.slice(mp(e,t,o))){let r=Ut(n);if(!Rn(n)&&!(o&&r.includes(o)))for(let i of r)Bn.add(i)}}return e.filter(t=>Rn(t)||!Ut(t).some(o=>Bn.has(o)))}function Pl(){he=[],Eo=null,Bn.clear()}function El(e){return e.reduce((t,o)=>t+o.entries.length,0)}function Tl(e,t){if(!e||!t.length)return;let o=Pn.get(e);(!o||El(t)>=El(o))&&Pn.set(e,gi(t))}function fp(){let e=$r();if(e!==xo){xo&&he.length&&Tl(xo,he),xo=e;let n=e?Pn.get(e):void 0;n?.length?(he=gi(n),Eo=null,Bn.clear(),Ze=!0):(Pl(),Ze=!1)}let t=ip(),o=ap();return!t.length&&!o.length&&!rl()?(he=[],[]):(Ze&&e&&!Mn(e)&&(Ze=!1),he=pp(dp(lp(he,t),o,!Ze)),e&&he.length&&Tl(e,he),!Ze&&e&&he.length&&Mn(e)&&(Ze=!0),he.flatMap(n=>n.entries).filter(op).filter(n=>n.ids.length||n.summary||n.streaming))}function gp(e){for(let o of e)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!le().generating||e.some(o=>o.streaming))return;let t=e.at(-1);t&&(t.role==="assistant"||!Hn.store.showAssistant?t.streaming=!0:e.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function Ol(){let e=fp();return gp(e),e}function Rl(e){let t=e.getBoundingClientRect(),o=se()?.getBoundingClientRect().top,n=Math.min(t.bottom,o&&o>t.top?o:t.bottom);return{top:t.top,bottom:n}}function Hl(e){return((e.matches(".whitespace-pre-wrap, .markdown, .prose, [data-markdown-text-style]")?e:e.querySelector(".whitespace-pre-wrap")??e.querySelector(".markdown, .prose, [data-markdown-text-style]"))??e).getBoundingClientRect().top}function Ml(e){let t=D[e]?.turn?.el;return t?.isConnected?t:null}function hp(e){if(!D.length)return null;let t=e.scrollHeight-e.clientHeight,o=Xr(e),n=Math.min(e.scrollTop,0),r=o?-n:t-e.scrollTop,i=o?t+n:e.scrollTop,a=t<=Dt||r<=Dt,d=t>Dt&&i<=Dt,{top:l,bottom:u}=Rl(e),m=Ml(0),p=m?Hl(m):Number.NaN,T=!!m&&p>=l-Dt&&p<=l+48,f=Ml(D.length-1),x=f?.getBoundingClientRect().bottom??Number.NaN,S=!!f&&x<=u+Dt&&x>=u-_m;return a||S?"bottom":d||T?"top":null}function bp(e){let{top:t,bottom:o}=Rl(e),n=t+Math.max(o-t,0)*$m,r=[],i=-1;if(D.forEach((d,l)=>{let u=d.turn?.el;if(!u?.isConnected){r.push(Number.NaN);return}let m=Hl(u);r.push(m),i<0&&(i=l),m<=n&&(i=l)}),i<0)return Math.max(D.findIndex(d=>d.turn),0);let a=r[ue];return Number.isFinite(a)?i===ue?ue:i>ue?i:a<=n+Xm?ue:i:i}function yp(e){let t=hp(e);return t==="bottom"?D.length-1:t==="top"?0:bp(e)}function Cl(e){Hn.store.jumpEffect==="border"&&(e.classList.add(M("flash")),setTimeout(()=>e.classList.remove(M("flash")),Wm))}function Dn(e){let t=D[e],o=bo();if(!t||!o)return;if(!t.turn&&!t.ids.length){ht=e,So(),o.scrollTo({top:Xr(o)?0:o.scrollHeight});return}ht=e,Nt=e?null:{chat:v(),first:t.ids[0],until:Date.now()+Sl},So();let n=t.turn?.el;if(n?.isConnected){let u=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:u<o.clientHeight*Vm?"smooth":"auto"}),Cl(n);return}let r=D.findIndex(u=>u.turn),i=r>=0&&e<r?-1:1,a=++di,d=Date.now()+Sl,l=()=>{let u=bo();if(a!==di||Date.now()>d||!u)return;D=Ol();let m=D.find(T=>T.ids.some(f=>t.ids.includes(f)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),Cl(m),ht=D.findIndex(T=>T.turn?.el===m),So();return}let p=u.scrollTop;u.scrollBy({top:i*u.clientHeight*Zm,behavior:"instant"}),u.scrollTop===p?setTimeout(l,Jm):requestAnimationFrame(l)};l()}function vp(e,t){return s("button",{class:M("row"),attrs:{type:"button","data-index":String(t),"data-message-id":e.ids[0]??""},on:{click:()=>Dn(t)}},s("span",{text:ep[e.role]}),s("span",{class:"bloom-truncate",text:ye(e.summary||"\u2026",In)}))}function Ap(e){let t=1/0;for(let o of document.querySelectorAll(Ll)){if(!ne(o))continue;let n=o.getBoundingClientRect();n.width<ci||n.height<ci||n.left<e.left+ci||n.left<t&&(t=n.left)}return Number.isFinite(t)?t:null}function kl(e){if(!A)return;let t=e.getBoundingClientRect(),o=se()?.getBoundingClientRect().top,r=Math.min(t.bottom,o&&o>t.top?o:t.bottom)-t.top,i=Math.min(t.right,Ap(t)??1/0);A.style.right=`${document.documentElement.clientWidth-i}px`,A.style.top=`${t.top}px`,A.style.height=r>1?`${r}px`:""}function wp(){let e=bo();if(D=Ol(),!D.length||!e){Pe?.dispose(),Pe=void 0,A?.remove(),A=null,bt="";return}if(qo!==e){wo?.abort(),wo=new AbortController,e.addEventListener("scroll",Fe(So),{passive:!0,signal:wo.signal});for(let n of tp)e.addEventListener(n,Nl,{passive:!0,signal:wo.signal});qo=e,Be?.disconnect(),Be=new ResizeObserver(()=>{e.isConnected&&kl(e)}),Be.observe(e),kn=null,Ln=new Set}let t=se();if(t&&t!==kn&&Be&&(Be.observe(t),kn=t),Be)for(let n of document.querySelectorAll(Ll))Ln.has(n)||(Be.observe(n),Ln.add(n));Ep(),kl(e);let o=JSON.stringify(D.map(n=>[n.role,n.ids]));o!==bt?(bt=o,ht=-1,Sp(),Nt&&Date.now()<Nt.until&&Nt.chat===v()&&D[0]?.ids[0]!==Nt.first&&Dn(0)):xp(),So()}function So(){if(!A||!qo)return;ue=ht>=0?ht:yp(qo),A.querySelectorAll(`.${M("tick")}`).forEach((t,o)=>t.classList.toggle(M("tick-current"),o===ue)),A.querySelectorAll(`.${M("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===ue)));let e=A.querySelector(`.${M("toc-head")}`);e&&(e.textContent=`${ue+1} / ${D.length}`)}function xp(){A?.querySelectorAll(`.${M("tick")}`).forEach((e,t)=>{let o=D[t],n=ye(o.summary,In);e.title!==n&&(e.title=n),e.classList.toggle(M("tick-streaming"),o.streaming)}),A?.querySelectorAll(`.${M("row")}`).forEach(e=>{let t=e.lastElementChild,o=ye(D[Number(e.dataset.index)].summary||"\u2026",In);t&&t.textContent!==o&&(t.textContent=o)})}function Sp(){A?.querySelector(`.${M("rail")}`)?.replaceChildren(...D.map((t,o)=>s("button",{class:Vo(M("tick"),M(`tick-${t.role}`),t.streaming&&M("tick-streaming"),o===ue&&M("tick-current")),title:ye(t.summary,In),attrs:{type:"button","aria-label":`Jump to message ${o+1}`,"data-message-id":t.ids[0]??""},on:{click:()=>Dn(o)}}))),A?.querySelector(`.${M("toc-list")}`)?.replaceChildren(...D.map(vp))}var Ee=Fe(wp);function fi(e){if(e===A)return;let t=e.__bloomNavStop;if(t&&t!==hi)try{t()}catch{}e.isConnected&&e!==A&&e.remove()}function Dl(){let e=[...document.querySelectorAll('[data-bloom="navigator"]')];if(A&&!A.isConnected&&(A=null),A&&e.includes(A)){for(let t of e)fi(t);return}A=e[0]??null;for(let t of e.slice(1))fi(t)}function qp(){Pe?.dispose(),Pe=Cn({over:e=>e instanceof Node&&!!A?.contains(e),trigger:()=>A?.querySelector(`.${M("rail")}`),panel:()=>A?.querySelector(`.${M("toc")}`),setHeld:e=>A?.classList.toggle(M("open"),e)})}function Ep(){Dl(),A&&!A.querySelector(`.${M("rail")}`)&&(A.remove(),A=null,bt=""),A||(A=s("div",{class:`bloom-root ${M("root")}`,attrs:{"data-bloom":"navigator"},on:{pointerenter:()=>Pe?.enter(),pointerleave:e=>Pe?.leave(e)}},s("div",{class:M("rail")}),s("div",{class:M("bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:M("toc")},s("div",{class:M("toc-head")}),s("div",{class:M("toc-list")}))),bt=""),Pe||qp(),A.isConnected||document.body.append(A),A.querySelector(`.${M("tick")}`)||(bt=""),A.__bloomNavStop=hi}function Nl(){ht=-1,Nt=null,di++}function hi(){for(let e of mi)e();mi=[],wo?.abort(),Be?.disconnect(),Be=void 0,qo=null,kn=null,Ln=new Set,removeEventListener("keydown",Ul,!0),removeEventListener("resize",Ee),Pe?.dispose(),Pe=void 0,A&&delete A.__bloomNavStop,A?.remove(),A=null,bt="",Pl(),Pn.clear(),xo="",Ze=!1;for(let e of document.querySelectorAll('[data-bloom="navigator"]'))fi(e)}var Tp=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function Ul(e){if(!A||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||Tp(document.activeElement)||ve("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:ue-1,ArrowDown:ue+1,Home:0,End:D.length-1}[e.key];if(o==null){Nl();return}o<0||o>=D.length||(e.preventDefault(),e.stopPropagation(),Dn(o))}var Fl=h({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:Hn,styles:xl,start(){Dl(),mi=[k(e=>W(e)&&Ee()),Ae(Ee),qe.on("conversation",Ee),qe.on("generate-start",({parentId:e,userId:t})=>{e&&(Eo={parent:e,user:t},Ee())}),J.on("rise",Ee),J.on("fall",Ee)],addEventListener("keydown",Ul,!0),addEventListener("resize",Ee,{passive:!0}),Ee()},stop:hi,onSettingsChange:Ee});var Kl=`/*
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
`;var _=O("bloom-quotes-"),Ei="BloomBetterQuotes",Cp=40,Ql=8,kp=1800,Ai=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,Yl=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,yt=b({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),bi,yi,Ft,vi=!1,wi=0,Nn=null,Un=null,Re=null;function Ti(){return v()??"draft"}function Kn(){try{let e=JSON.parse(sessionStorage.getItem(Ei)??"[]");return Array.isArray(e)?e.filter(t=>!!t&&typeof t=="object"&&typeof t.id=="string"&&typeof t.text=="string"&&!!t.text):[]}catch{return[]}}function Mi(e){try{sessionStorage.setItem(Ei,JSON.stringify(e.slice(-Cp)))}catch{}}function To(e){return Kn().find(t=>t.id===e)?.text??""}function Lp(e,t){let o=Kn().filter(n=>n.id!==e);o.push({id:e,text:t}),Mi(o)}function xi(e=Ti()){Mi(Kn().filter(t=>t.id!==e)),Fn()}function Ip(e){let t=To("draft");if(!t||To(e))return;let o=Kn().filter(n=>n.id!=="draft");o.push({id:e,text:t}),Mi(o)}function Si(e){return`${e.getAttribute("aria-label")??""} ${e.getAttribute("title")??""}`}function Bp(e){let t=Si(e);return Yl.test(t)&&!/quote|引用/.test(t)?!1:/quote|引用/.test(t)&&Ai.test(t)?!0:Ai.test(t)&&!Yl.test(t)}function zl(e){let t=e.cloneNode(!0),o=[...t.querySelectorAll("button, [role='button']")],n=new Set(o.map(r=>r.getAttribute("aria-label")).filter(Boolean));for(let r of o)r.remove();for(let r of t.querySelectorAll("*"))!r.children.length&&n.has(y(r.textContent??""))&&r.remove();return y(t.textContent??"")}function Pp(e){let t=se(),o=e.parentElement,n=0;for(;o&&o!==t&&n<5;){if(n++,o.matches(c.composerInput)||o.querySelector(c.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=zl(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function Yn(){let e=se();if(!e)return null;for(let t of e.querySelectorAll("button, [role='button']")){if(t.closest("[data-bloom]")||!Bp(t))continue;let o=Pp(t),n=o?zl(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:t}}return null}function Op(e){let t=e.closest(c.searchUnit)??e.closest(c.oldMessage);return t&&(Se(t)??t.getAttribute("data-message-author-role"))==="user"?t:null}function Ci(e){return y(e).slice(0,48)}function Rp(e,t){let o=Ci(e);if(o.length<Ql)return null;let n=null;for(let r of yo()){if(t&&(r===t||t.contains(r)||r.contains(t)))continue;let i=y(r.textContent??"");if(!i.includes(o))continue;let a=o.length/Math.max(i.length,1);(!n||a>n.score)&&(n={el:r,score:a})}return n?.el??null}function Hp(e,t){let o=Ci(t),n=e;for(let r of e.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&y(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${_("hit")}`)?.classList.remove(_("hit")),n.classList.add(_("hit")),window.clearTimeout(wi),wi=window.setTimeout(()=>n.classList.remove(_("hit")),kp)}function Gl(e){let t=e.closest(c.timelineScroll)??document.scrollingElement;if(!(t instanceof HTMLElement)&&t!==document.scrollingElement)return;let o=e.getBoundingClientRect();if(o.height<1||!t)return;let n=t.getBoundingClientRect(),r=se()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,a=o.top+o.height/2-(n.top+i)/2;Math.abs(a)<8||t.scrollTo({top:t.scrollTop+a,behavior:"smooth"})}function ki(){if(!Re||!Nn?.isConnected)return;let e=Nn.getBoundingClientRect();e.width<1||(Re.style.top=`${Math.max(8,e.top+8)}px`,Re.style.left=`${Math.max(8,e.right-Re.offsetWidth-8)}px`)}function Dp(e,t,o){Nn=e,Un=t,Re??=s("button",{class:`bloom-root ${_("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),Re.isConnected||document.body.append(Re),Hp(e,o),ki()}function jl(){Re?.remove(),Re=null,Nn=null,Un=null,document.querySelector(`.${_("hit")}`)?.classList.remove(_("hit"))}function Wl(){return document.querySelector('[data-bloom="quote-chip"]')}function Fn(){Wl()?.remove()}function Np(e){let o=se()?.getBoundingClientRect();!o||o.width<8||(e.style.width=`${Math.max(120,o.width-24)}px`,e.style.left=`${o.left+12}px`,e.style.top=`${Math.max(8,o.top-e.offsetHeight-8)}px`)}function Up(e){let t=Wl();t||(t=s("div",{class:`bloom-root ${_("chip")}`,attrs:{"data-bloom":"quote-chip"}},s("span",{class:_("text")}),s("button",{class:_("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(t));let o=t.querySelector(`.${_("text")}`),n=y(e);o&&o.textContent!==n&&(o.textContent=n),t.dataset.text=e,Np(t)}function qi(){if(!vi){vi=!0;try{let e=Ti(),t=Yn();yt.store.persistAcrossChats&&t&&To(e)!==t.text&&Lp(e,t.text);let o=yt.store.persistAcrossChats?To(e):"";!o||t&&y(t.text)===y(o)?Fn():Up(o),ki()}finally{vi=!1}}}function Fp(e){let t=e.closest('[data-bloom="quote-chip"]');if(t instanceof HTMLElement&&!e.closest(`.${_("x")}`)){let i=t.dataset.text??t.querySelector(`.${_("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:t}:null}let o=e.closest("blockquote");if(o instanceof HTMLElement&&!e.closest("a, button")){let i=Op(o),a=y(o.textContent??"");if(i&&a)return{text:a,skip:i,origin:o}}let n=se();if(!n||!n.contains(e)||so(e)||e.closest("button, [role='button']"))return null;let r=Yn();return!r||!r.row.contains(e)?null:{text:r.text,skip:null,origin:r.row}}function Kp(e){let{target:t}=e;if(!(t instanceof Element))return;if(t.closest('[data-bloom="quote-back"]')){e.preventDefault(),e.stopPropagation(),Un?.isConnected&&Gl(Un);return}if(t.closest(`.${_("x")}`)){e.preventDefault(),e.stopPropagation(),xi();return}let o=Yn();if(o&&(t===o.dismiss||o.dismiss.contains(t))){xi();return}if(Yp(t)&&Vl(),!yt.store.jumpToPassage)return;let n=Fp(t);if(!n)return;let r=Rp(n.text,n.skip);r&&(e.preventDefault(),e.stopPropagation(),Dp(r,n.origin,n.text),Gl(r))}function Yp(e){let t=e.closest("button, [role='button']");return!(t instanceof HTMLElement)||t.closest("[data-bloom]")||!se()?.contains(t)?!1:/send|submit|发送|提交/i.test(Si(t))&&!Ai.test(Si(t))}function Gp(e){return!(e instanceof KeyboardEvent)||e.key!=="Enter"||e.shiftKey||e.isComposing?!1:so(e.target)}function Vl(){if(!yt.store.persistAcrossChats)return;let e=Ti(),t=To(e);if(t){if(!Yn()){let o=V(),n=Ci(t);n.length>=Ql&&!y(o).includes(n)&&Le(`> ${t}

${o}`.trim())}xi(e)}}function jp(e){Gp(e)&&Vl()}function Qp(e){!e.prevId&&e.id&&Ip(e.id),qi()}var Jl=h({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:yt,styles:Kl,onSettingsChange(e){e==="jumpToPassage"&&!yt.store.jumpToPassage&&jl(),e==="persistAcrossChats"&&!yt.store.persistAcrossChats&&(sessionStorage.removeItem(Ei),Fn()),qi()},start(){Ft=new AbortController,document.addEventListener("pointerdown",Kp,{capture:!0,signal:Ft.signal}),document.addEventListener("keydown",jp,{capture:!0,signal:Ft.signal}),addEventListener("scroll",ki,{capture:!0,passive:!0,signal:Ft.signal}),yi=Ae(Qp),bi=k(e=>W(e)&&qi())},stop(){Ft?.abort(),Ft=void 0,yi?.(),yi=void 0,bi?.(),bi=void 0,window.clearTimeout(wi),jl(),Fn()}});var $e="data-bloom-invite",zp=/^(?:invite team members|invite members|邀请团队成员|邀请成员)$/i,Zl=':is(button, a:not([href^="/c/"])):not(main *, [role="dialog"] *)',Wp={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${c.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])'],hideInvite:[`[${$e}]`,`div:has(> [${$e}]:only-child)`]},$l=b({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0},hideInvite:{type:"boolean",description:"Hide Invite team members in the sidebar.",default:!0}}),Gn,Li=!1;function Vp(e){if(W(e))for(let t of document.querySelectorAll(`${Zl}, [${$e}]`))!t.matches(Zl)||!zp.test(y(t.textContent??""))?t.removeAttribute($e):t.hasAttribute($e)||t.setAttribute($e,"")}var Xl=h({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads, notices and Invite team members.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:$l,styles:()=>Ue(Object.entries(Wp).flatMap(([e,t])=>$l.store[e]?t:[])),start(){Li=!0,Qe().then(()=>{Li&&!Gn&&(Gn=k(Vp))})},stop(){Li=!1,Gn?.(),Gn=void 0;for(let e of document.querySelectorAll(`[${$e}]`))e.removeAttribute($e)}});var Kt=`form:has(:is(${c.composerInput})), ${c.oldComposerForm}`,jn='[class*="ComposerLayoutBody"]',Bi='[class*="ComposerLayoutRoot"]',Jp='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',Zp=`:is(${Kt}) ${jn}, :is(${Kt}):not(:has(${jn})) ${Bi}, :is(${Kt}):not(:has(${jn})):not(:has(${Bi})) :is(${Jp})`,$p='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',Xp='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',_p="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))",ef="var(--color-background-composer-surface, var(--composer-background-color, var(--color-bg-primary, Canvas)))",tf="composer-fill",_l=b({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function of(){let{opacity:e,blur:t}=_l.store;if(e>=100)return"";{let i=`color-mix(in srgb, ${ef} ${e}%, transparent)`;return`[class*="ComposerLayoutRoot"], [data-composer-layout], [data-chatgpt-composer]{--composer-layout-surface-background:${i}!important;--composer-background-color:${i}!important;--composer-layout-surface-backdrop-filter:blur(${t}px)!important}`}let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${_p} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important;-webkit-backdrop-filter:blur(${t}px)!important`;return`:is(${$p}), :is(${Kt}){${o}}:is(${Xp}){display:none!important}${Zp}{${n}}:is(${Kt}):has(${jn}) ${Bi}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${Kt}) :is(${c.composerInput}){background-color:transparent!important}`}function Ii(){for(let e of document.querySelectorAll(`[data-bloom="${tf}"]`))e.remove()}var ec=h({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:_l,styles:of,start(){Ii()},stop(){Ii()},onSettingsChange(){Ii()}});var nf=1200,rf=8e3,af=150,sf=20,tc=6,Ri="continue where you left",lf=/message delivery timed out|please try again/i,oc=/waiting for the complete answer/i,nc=b({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:Ri,placeholder:Ri}}),Pi=[],zn=0,Mo=!1,Co=0,Gt="",Qn="",Hi=0,jt=!1,ko=!1,Wn=!0,Yt="",Di=0,Vn=!1,cf=()=>nc.store.prompt.trim()||Ri;function rc(){return(ve(c.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function ic(){let e=rc();return!e||oc.test(e)||!lf.test(e)?"":e}function uf(){let e=rc();return e&&oc.test(e)?e:""}function df(){let e=Sn()?.querySelectorAll(c.turn),t=e?.[e.length-1];return`${t?.getAttribute("data-turn-key")??""}:${t?.textContent?.length??0}`}function ac(e,t,o){if(o===zn){if(le().generating||V()!==e||t>=sf){jt=!1,le().generating||(Gt="");return}as(),setTimeout(()=>ac(e,t+1,o),af)}}function mf(e){let t=zn;if(le().generating||V()&&V()!==e){jt=!1,Gt="";return}Le(e),Vn=!0,gr(()=>{t===zn&&ac(e,0,t)})}function sc(e){return e===Gt||Co>=tc||le().generating||V()?!1:(Gt=e,Co+=1,jt=!0,mf(cf()),!0)}function pf(){if(Mo||jt||ko)return;let e=Date.now(),t=ic();if(t){if(Yt="",t!==Qn){Qn=t,Hi=e;return}if(e-Hi<nf)return;sc(`${v()??""}:${t}`);return}if(Qn="",!uf()){Wn=!0,Yt="";return}if(!Wn||!le().generating||V())return;let n=`${v()??""}:${df()}`;if(n!==Yt){Yt=n,Di=e;return}if(e-Di<rf||Co>=tc)return;let r=Er();r&&(ko=!0,r.click())}function Oi(){zn+=1,Mo=!1,Co=0,Gt="",Qn="",Hi=0,jt=!1,ko=!1,Wn=!0,Yt="",Di=0,Vn=!1}var lc=h({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:nc,start(){Oi(),Pi=[J.on("rise",()=>{Mo=!1,Gt="",jt=!1,Vn&&(Vn=!1,Wn=!1,Yt="")}),J.on("fall",({outcome:e})=>{if(ko){ko=!1,e==="left"?Mo=!0:sc(`${v()??""}:stall`);return}(e==="stopped"||e==="left")&&(Mo=!0),e==="done"&&!ic()&&(Co=0)}),J.on("context",({migrated:e})=>{e||Oi()}),J.on("tick",pf)]},stop(){for(let e of Pi)e();Pi=[],Oi()}});var He=O("bloom-csi-"),ff=256,gf=160,Jn=1,cc=4,hf=.1,bf=.0015,yf=250;function vf(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function Af(e){return new Promise((t,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function wf(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:oe(t.x,n,1-n),y:oe(t.y,r,1-r)}}function uc(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function xf(e,t){let o=s("canvas");return o.width=o.height=ff,uc(o,e,t),o.toDataURL("image/png")}function dc(e){let t=null,o={x:z.store.cropX,y:z.store.cropY,zoom:z.store.cropZoom},n,r=s("canvas",{class:He("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=gf*devicePixelRatio;let i=s("div",{class:`bloom-muted ${He("status")}`}),a=s("div",{class:He("zoom")}),d=s("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(f,x=!0){t&&(o=wf(t,f),uc(r,t,o),x&&(clearTimeout(n),n=setTimeout(()=>{t&&(z.store.cropX=o.x,z.store.cropY=o.y,z.store.cropZoom=o.zoom,z.store.avatarUrl=xf(t,o))},yf)))}function u(){a.replaceChildren(pn(o.zoom,Jn,cc,hf,"\xD7",f=>l({...o,zoom:f})))}async function m(f,x){i.textContent="";try{t=await Af(f),x&&(z.store.avatarSource=f,o={x:.5,y:.5,zoom:Jn}),e.classList.add(He("has-image")),u(),l(o,x)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let p=f=>{f?.type.startsWith("image/")&&vf(f).then(x=>m(x,!0))};d.addEventListener("change",()=>p(d.files?.[0])),r.addEventListener("wheel",f=>{t&&(f.preventDefault(),l({...o,zoom:oe(o.zoom*(1-f.deltaY*bf),Jn,cc)}),u())},{passive:!1}),r.addEventListener("pointerdown",f=>{if(!t)return;r.setPointerCapture(f.pointerId);let x={...o},S=r.getBoundingClientRect(),C=I=>{if(!t)return;let $=Math.max(S.width/t.naturalWidth,S.height/t.naturalHeight)*o.zoom;l({...o,x:x.x-(I.clientX-f.clientX)/(t.naturalWidth*$),y:x.y-(I.clientY-f.clientY)/(t.naturalHeight*$)})};r.addEventListener("pointermove",C),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",C),{once:!0})});let T=s("div",{class:He("cropper"),attrs:{tabindex:"0"},on:{paste:f=>p([...f.clipboardData?.files??[]].find(x=>x.type.startsWith("image/"))),dragover:f=>f.preventDefault(),drop:f=>{f.preventDefault(),p(f.dataTransfer?.files[0])}}},s("div",{class:He("stage")},r),s("div",{class:He("controls")},mo("",f=>f.trim()&&void m(f.trim(),!0),"https://\u2026 or data:image/\u2026","url"),s("div",{class:He("buttons")},U("Choose file",()=>d.click()),U("Reset crop",()=>{l({x:.5,y:.5,zoom:Jn}),u()}),U("Clear",()=>{t=null,e.classList.remove(He("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),a.replaceChildren(),z.store.avatarUrl="",z.store.avatarSource=""},"danger")),a,i,d));return e.append(T),z.store.avatarSource&&m(z.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var mc=`/*
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
`;var Lo="data-bloom-csi-avatar",Ni="data-bloom-csi-sized",hc="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",qf=32,z=b({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>dc(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),pc=[];function bc(e){e.removeAttribute(Lo),e.removeAttribute(Ni)}function fc(e){return(z.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function gc(e=[]){if(!W(e))return;let t=z.store.displayName.trim()||null,o=!!z.store.avatarUrl,n=new Set(t?fc("name"):[]);for(let i of document.querySelectorAll(hc))n.has(i)||rt(i,null);for(let i of n)rt(i,t);let r=new Set(o?fc("avatar"):[]);for(let i of document.querySelectorAll(`[${Lo}]`))r.has(i)||bc(i);for(let i of r)i.hasAttribute(Lo)||i.setAttribute(Lo,""),i.toggleAttribute(Ni,!i.closest('[role="menu"]'))}function Ef(){let e=z.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${z.store.avatarSize}px}:is(${c.rail}, ${c.oldRail}) [${Ni}]{--bloom-csi-size:${qf}px}`:""}var yc=h({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:z,styles:()=>`${Ef()}
${mc}`,start(){pc=[xe(),k(gc)]},stop(){for(let e of pc)e();for(let e of document.querySelectorAll(`[${Lo}]`))bc(e);for(let e of document.querySelectorAll(hc))rt(e,null)},onSettingsChange(){gc()}});var Qt=O("bloom-greeting-"),vc=30,Ac=100;function wc(e){let t=-1,o=s("textarea",{class:`bloom-input ${Qt("input")}`,attrs:{maxlength:String(Ac),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=U("Add",i),r=s("div",{class:Qt("list")});function i(){let l=o.value.trim().slice(0,Ac);if(!l)return;let u=[...L.store.greetings];t>=0?u[t]=l:u.length<vc&&u.push(l),L.store.greetings=u,t=-1,o.value="",a()}function a(){let{greetings:l}=L.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&l.length>=vc,r.replaceChildren(...l.length?l.map((u,m)=>s("div",{class:Qt("row",m===t?"row-editing":"row-idle")},s("div",{class:Qt("text"),text:u}),Q("edit","Edit",()=>{t=m,o.value=u,o.focus(),a()}),Q("trash","Delete",()=>{L.store.greetings=l.filter((p,T)=>T!==m),t===m&&(t=-1),a()}))):[s("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),e.append(s("div",{class:Qt("editor")},r,s("div",{class:Qt("form")},o,n))),a();let d=Tt((l,u)=>l==="GreetingCustomizer"&&u==="greetings"&&a());return()=>{d(),e.replaceChildren()}}var xc=`/*
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
`;var $n="data-bloom-greeting",Mf=1e3,Cf=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],L=b({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>wc(e)},greetings:{type:"custom",default:Cf},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),Zn,Sc=[],Ui,Oo=()=>Ct()&&!it(),kf=e=>e.replaceAll(/\s*\n\s*/g," ").trim(),Ec=()=>L.store.greetings.filter(e=>typeof e=="string"&&e.trim());function Ro(){let e=Ec();if(e.length)if(L.store.order==="random"&&e.length>1){let t=L.store.lastRandom;for(;t===L.store.lastRandom;)t=Math.floor(Math.random()*e.length);L.store.lastRandom=t,L.store.index=t}else L.store.index=(L.store.index+1)%e.length}function Lf(){return Oo()&&ae()?ve(c.homeHeading):null}function Io(){for(let e of document.querySelectorAll(`[${$n}]`))e.removeAttribute($n),rt(e,null)}function Bo(){for(let e of document.querySelectorAll("[data-bloom-placeholder]"))e.removeAttribute("data-bloom-placeholder")}function qc(e){let t=ae(),o=kf(e);if(!t||!o||V(t)){Bo();return}t.getAttribute("data-bloom-placeholder")!==o&&t.setAttribute("data-bloom-placeholder",o)}function Po(){let e=Ec(),t=cs(),o=Oo();if(!e.length||!t&&!o){Io(),Bo();return}if(t){Io(),qc(e[0]??"");return}let n=Lf();n?((L.store.index<0||L.store.index>=e.length)&&Ro(),n.setAttribute($n,""),rt(n,e[Math.max(0,L.store.index)%e.length]??"")):Io(),L.store.heroOnlyOutsideProject?Bo():qc(e[Math.max(0,L.store.index)%e.length]??"")}function Fi(){clearInterval(Zn),Zn=void 0,L.store.mode==="interval"&&Oo()&&(Zn=setInterval(()=>{Ro(),Po()},L.store.intervalSec*Mf))}function If(e){L.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${$n}]`)||getSelection()?.toString()||(Ro(),Po())}function Bf(){Oo()&&L.store.mode==="refresh"&&Ro(),Fi(),Po()}var Tc=h({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:L,styles:xc,start(){Io(),Bo(),Ui=new AbortController,document.addEventListener("click",If,{signal:Ui.signal}),Oo()&&L.store.mode==="refresh"&&Ro(),Fi(),Sc=[k(e=>W(e)&&Po()),Ae(Bf)]},stop(){Ui?.abort();for(let e of Sc)e();clearInterval(Zn),Io(),Bo()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&Fi(),Po()}});var Ho=O("bloom-history-"),Ki=10,Pf=3e3;function Yi(e,t){let o="",n=0,r=new Set,i=s("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),a=s("div",{class:Ho("list")}),d=s("div",{class:Ho("pager")}),l,u=U("Clear all",()=>{if(!l){u.textContent="Click again to clear",l=setTimeout(()=>{l=void 0,u.textContent="Clear all"},Pf);return}clearTimeout(l),l=void 0,u.textContent="Clear all",Do([])},"danger");function m(){let T=[...vt.store.entries].toReversed(),f=o.trim().toLowerCase(),x=f?T.filter(N=>N.toLowerCase().includes(f)):T,S=Math.max(1,Math.ceil(x.length/Ki));n=Math.min(n,S-1);let C=x.slice(n*Ki,(n+1)*Ki).map(N=>s("div",{class:Ho("row")},s("button",{class:Ho("text",r.has(N)?"text-open":"text-closed"),text:N,title:r.has(N)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{r.delete(N)||r.add(N),m()}}}),t&&Q("edit","Use",()=>t(N)),Q("copy","Copy",()=>void jo(N)),Q("trash","Delete",()=>Do(vt.store.entries.filter(me=>me!==N)))));a.replaceChildren(...C.length?C:[s("div",{class:"bloom-muted",text:f?"No matching prompts.":"No saved prompts yet."})]),d.replaceChildren(s("span",{class:"bloom-muted",text:`${x.length} ${f?"matching":"saved"} \xB7 page ${n+1} of ${S}`}),U("Previous",()=>{n--,m()}),U("Next",()=>{n++,m()}),u);let[I,$]=d.querySelectorAll("button");I.disabled=n===0,$.disabled=n>=S-1,u.disabled=!T.length}i.addEventListener("input",()=>{o=i.value,n=0,m()}),e.append(s("div",{class:Ho("manager")},i,a,d)),m();let p=Tt((T,f)=>T==="InputHistory"&&f==="entries"&&m());return()=>{p(),clearTimeout(l),e.replaceChildren()}}var Mc=`/*
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
`;var De=O("bloom-history-"),Rf=2e3,vt=b({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>Yi(e)},entries:{type:"custom",default:[]}}),F=null,Gi={text:"",at:0},Te=null,Xe=null,ji,Wt=()=>vt.store.entries.filter(e=>typeof e=="string");function Do(e){vt.store.entries=e.slice(-vt.store.maxEntries)}function Qi(e){let t=e.trim();if(!t)return;let o=Date.now();t===Gi.text&&o-Gi.at<Rf||(Gi={text:t,at:o},Do([...Wt().filter(n=>n!==t),t]))}function Cc(e){e.preventDefault()}function Hf(){let e=s("button",{class:De("hud-count"),attrs:{type:"button"},on:{mousedown:Cc,click:Ff}}),t=s("button",{class:De("hud-x"),text:"\xD7",attrs:{type:"button","aria-label":"Exit history"},on:{mousedown:Cc,click:Df}});return s("div",{class:`bloom-root ${De("hud")}`,attrs:{"data-bloom":"history-hud",role:"group","aria-live":"polite","aria-label":"Input history"}},e,t)}function kc(e,t){let o=ae();if(!o||Xe)return;Te??=Hf();let n=`${e+1} / ${t}`,r=Te.querySelector(`.${De("hud-count")}`);r?.replaceChildren(n),r?.setAttribute("aria-label",`Show input history (${n})`);let i=(o.closest("form")??o).getBoundingClientRect();Te.style.left=`${i.left+i.width/2}px`,Te.style.top=`${i.top}px`,Te.isConnected||document.body.append(Te)}function zt(){F=null,Te?.remove()}function Df(){F&&Le(F.draft),zt(),ae()?.focus()}function Lc(e){let t=Wt();if(!F)return;let o=t[e];F.index=e,F.shown=o,Le(o),kc(t.length-1-e,t.length)}function Nf(e){let t=Wt();if(!t.length)return!1;if(!F){if(e===1)return!1;F={index:t.length,draft:V(),shown:""}}let o=F.index+e;return o<0?!0:o>=t.length?(Le(F.draft),zt(),!0):(Lc(o),!0)}function Uf(e){let t=Wt().indexOf(e);No(),!(t<0)&&(F??={index:t,draft:V(),shown:""},Lc(t),ae()?.focus())}function No(){if(!Xe)return;Xe.release(),Xe.controller.abort(),Xe.root.remove(),Xe=null;let e=Wt();F&&e[F.index]===F.shown?kc(e.length-1-F.index,e.length):F=null}function Ff(){if(Xe)return;Te?.remove();let e=s("div",{class:De("dialog-body")}),t=s("div",{class:`bloom-root ${De("backdrop")}`,attrs:{"data-bloom":"history-dialog"},on:{click:n=>n.target===n.currentTarget&&No()}},s("div",{class:De("dialog"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Input history"}},s("div",{class:De("dialog-header")},s("h2",{class:De("dialog-title"),text:"Input history"}),Q("close","Close",No)),e));t.addEventListener("keydown",n=>n.stopPropagation());let o=new AbortController;document.addEventListener("keydown",n=>{n.key==="Escape"&&(n.preventDefault(),n.stopPropagation(),No())},{capture:!0,signal:o.signal}),we(t),Xe={root:t,release:Yi(e,Uf),controller:o},e.querySelector("input")?.focus()}function Ic(e){return so(e)?e:e instanceof HTMLElement?e.closest(c.composerInput):null}function Kf(){if(ae()?.closest("[data-chatgpt-composer], [data-composer-input], form")?.querySelector('[aria-expanded="true"]'))return!0;for(let t of document.querySelectorAll('[role="listbox"], [role="menu"], [data-radix-popper-content-wrapper], [cmdk-root], [cmdk-list]')){if(!(t instanceof HTMLElement)||t.closest("[data-bloom]"))continue;let o=getComputedStyle(t);if(!(o.display==="none"||o.visibility==="hidden"))return!0}return!1}function Yf(e){if(e.isComposing||e.key==="Process"||e.keyCode===229)return;let t=Ic(e.target);if(!t)return;if(e.key==="Enter"&&!e.shiftKey){Qi(V(t)),zt();return}if(e.key==="Escape"&&F){Le(F.draft),zt(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey||Kf())return;let o=rs(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!F||Nf(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function Gf(e){F&&Ic(e.target)&&V()!==F.shown.trim()&&zt()}function jf(e){e.target instanceof Element&&e.target.closest(c.sendButton)&&Qi(V())}var Bc=h({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before. Click the counter to browse history.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:vt,styles:Mc,start(){for(let t of document.querySelectorAll('[data-bloom="history-hud"], [data-bloom="history-dialog"]'))t.remove();Te=null,ji=new AbortController;let{signal:e}=ji;document.addEventListener("keydown",Yf,{capture:!0,signal:e}),document.addEventListener("input",Gf,{capture:!0,signal:e}),document.addEventListener("click",jf,{capture:!0,signal:e}),document.addEventListener("submit",()=>Qi(V()),{capture:!0,signal:e})},stop(){ji?.abort(),No(),zt();for(let e of document.querySelectorAll('[data-bloom="history-hud"]'))e.remove();Te=null},onSettingsChange(e){e==="maxEntries"&&Do(Wt())}});var Pc=`/*
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
`;var zf=1500,Wf=5e3,Vf=2e3,Uc=[{label:"UTC",value:"UTC"},{label:"\u7F8E\u56FD\u4E1C\u90E8",value:"America/New_York"},{label:"\u7F8E\u56FD\u4E2D\u90E8",value:"America/Chicago"},{label:"\u7F8E\u56FD\u5C71\u5730",value:"America/Denver"},{label:"\u7F8E\u56FD\u897F\u90E8",value:"America/Los_Angeles"},{label:"\u65E5\u672C",value:"Asia/Tokyo"},{label:"\u53F0\u6E7E",value:"Asia/Taipei"}],Vt=b({sourceTimeZone:{type:"select",description:"Zone the stored clock was written in. Leave UTC for ChatGPT create_time. Pick the same zone as the Shit GPT plugin only when that clock is a wall time in that zone; it is then shown in the system timezone.",options:Uc,default:"UTC"},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),Xn=new Map,zi=new Set,Fc=0,_n,Oc=[],Rc="",er=new Map;function Kc(e,t){Xn.get(e)!==t&&(Xn.set(e,t),clearTimeout(_n),_n=setTimeout(Yc,Vf))}function Yc(){let e={...Vt.store.stamps,...Object.fromEntries(Xn)};Vt.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,zf))}function Jf(e){let t=Ie(v())?.times;for(let o=e.length-1;o>=0;o--){let n=Xn.get(e[o])??t?.get(e[o])??Vt.store.stamps[e[o]];if(n)return n}return null}var Zf=()=>le().generating||Date.now()-Fc<Wf;function Vi(){return Intl.DateTimeFormat().resolvedOptions().timeZone}function Gc(){let e=Vt.store.sourceTimeZone;if(!e||e==="UTC")return"UTC";try{return Intl.DateTimeFormat(void 0,{timeZone:e}),e}catch{return"UTC"}}function jc(e,t){let o={};for(let n of new Intl.DateTimeFormat("en-US",{timeZone:t,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(e)))o[n.type]=n.value;return{y:+o.year,m:+o.month,d:+o.day,h:+o.hour%24,mi:+o.minute,s:+o.second}}function Qc(e){return Date.UTC(e.y,e.m-1,e.d,e.h,e.mi,e.s)}function Hc(e,t){let o=e;for(let n=0;n<4;n++){let r=e-Qc(jc(o,t));if(r===0)return o;o+=r}return o}function $f(e,t){if(t==="UTC")return e;let o=(e%1e3+1e3)%1e3,n=e-o,r=new Date(n),i=Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),r.getUTCHours(),r.getUTCMinutes(),r.getUTCSeconds()),a=Hc(i,t),d=3600*1e3,l=Number.POSITIVE_INFINITY;for(let u of[-d,0,d]){let m=a+u;Qc(jc(m,t))===i&&m<l&&(l=m)}return l!==Number.POSITIVE_INFINITY?l+o:Hc(i+d,t)+o}function Xf(e,t){let o=Gc();return t||o==="UTC"?e:$f(e,o)}function Wi(e,t){return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(e)}function _f(e){let t=Vi(),o=Date.now(),n={hour:"2-digit",minute:"2-digit",timeZone:t};if(Wi(e,t)===Wi(o,t))return new Intl.DateTimeFormat(void 0,n).format(e);let r=a=>new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric"}).format(a),i=r(e)===r(o)?{}:{year:"numeric"};return new Intl.DateTimeFormat(void 0,{...i,month:"short",day:"numeric",...n}).format(e)}function eg(e,t){let o=new Date(t).toLocaleString(void 0,{timeZone:Vi()}),n=Gc();if(n==="UTC"||t===e)return o;let r=new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"UTC"}).format(e);return`${Uc.find(a=>a.value===n)?.label??n} ${r} \u2192 ${o}`}function tg(e){let t=Se(e)??e.getAttribute("data-message-author-role")??e.closest(c.turn)?.getAttribute("data-turn")??e.querySelector(c.authorRole)?.getAttribute("data-message-author-role");if(xn(t))return t;let o=ft(e).at(-1);return Ie(v())?.chain.find(n=>n.id===o)?.role??null}var Dc='[class*="group/activity-header"]';function og(e){let t=e.parentElement;if(!t)return null;let o=e.closest(c.turn);return o&&t!==o&&!o.contains(t)?null:t}function ng(e){let t=e;for(let o=0;o<8&&t;o++){let n=og(t);if(!n)return null;let r=[...n.children],i=r.indexOf(t);for(let a=i-1;a>=0;a--){let d=r[a],l=d.matches(Dc)?d:d.querySelector(Dc);if(l)return l;if(d.matches(c.searchUnit)||d.querySelector(c.searchUnit))return null}if(n===t.closest(c.turn))return null;t=n}return null}function rg(e){let t=e.parentElement;for(let o=0;o<4&&t;o++){if(t.classList.contains("flex-col"))return t;t=t.parentElement}return e.parentElement??e}function ig(e,t){if(t==="assistant"){let o=ng(e);if(o)return rg(o)}return e}function Nc(e){return e.querySelector(':scope > time[data-bloom="timestamp"]')}function ag(e,t){let o=`${e}:${t}`,n=er.get(o);if(n)return n;let r=Xf(e,t),i={instant:r,text:_f(r)};return er.set(o,i),i}function sg({unit:e,role:t,target:o},n,r){let i=ft(e);if(!i.length||!je(e)||e.querySelector("time:not([data-bloom])"))return;if(!n){Nc(e)?.remove();return}let a=Jf(i),d=!1;if(!a&&Zf()){a=Date.now();let T=i.at(-1);zi.add(T),Kc(T,a),d=!0}else a&&zi.has(i.at(-1))&&(d=!0);if(t==="assistant"&&r?.contains(e))return;let l=o.querySelector('time[data-bloom="timestamp"]')??Nc(e);if(!a||Vt.store.hideOwnMessages&&t==="user"){l?.remove();return}let{instant:u,text:m}=ag(a,d);if(l?.textContent===m&&l.parentElement===o&&l===o.firstElementChild)return;let p=s("time",{class:`bloom-timestamp bloom-timestamp-${t??"assistant"}`,text:m,title:eg(a,u),attrs:{"data-bloom":"timestamp",datetime:new Date(u).toISOString()}});l&&l.replaceWith(p),(p.parentElement!==o||p!==o.firstElementChild)&&o.prepend(p)}var Uo=Fe(()=>{let e=Wi(Date.now(),Vi());e!==Rc&&(er.clear(),Rc=e);let t=le().generating?[...document.querySelectorAll(c.turn)].at(-1):void 0,o=yo().map(r=>{let i=tg(r);return{unit:r,role:i,target:ig(r,i)}}),n=new Map(o.map(r=>[r.target,r.unit]));for(let r of o)sg(r,n.get(r.target)===r.unit,t)}),zc=h({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:Vt,styles:Pc,start(){Oc=[k(e=>W(e)&&Uo()),qe.on("conversation",Uo),qe.on("message-time",({messageId:e,time:t})=>{zi.delete(e),Kc(e,t),Uo()}),J.on("fall",()=>{Fc=Date.now(),Uo()})]},stop(){for(let e of Oc)e();_n&&(clearTimeout(_n),Yc());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){er.clear();for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();Uo()}}});var lg=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])','[data-chatgpt-composer] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-composer-input] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-codex-composer-root] button[aria-label^="Dictat" i], [data-composer-placement] button[aria-label^="Dictat" i], [class*="ComposerLayout"] button[aria-label^="Dictat" i]'],cg=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],Wc=b({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),Vc=h({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:Wc,styles:()=>Ue([...lg,...Wc.store.hideDictationSettings?cg:[]])});var At="data-bloom-share",ug=/^\/g\/g-p-/,dg=/^(?:share|分享)$/i,mg=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],pg=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${At}="project"]`],Ji=b({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),tr,Zi=!1;function fg(e){if(!W(e))return;let t=ug.test(location.pathname)&&!v();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${At}]`))!t||!dg.test(y(o.textContent??""))?o.removeAttribute(At):o.hasAttribute(At)||o.setAttribute(At,"project")}var Jc=h({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:Ji,styles:()=>Ue([...Ji.store.hideShareChat?mg:[],...Ji.store.hideShareProject?pg:[]]),start(){Zi=!0,Qe().then(()=>{Zi&&!tr&&(tr=k(fg))})},stop(){Zi=!1,tr?.(),tr=void 0;for(let e of document.querySelectorAll(`[${At}]`))e.removeAttribute(At)}});var Zc='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',gg='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',hg="[data-bloom-profile-plan]",$c="visibility:hidden!important;user-select:none!important",_c=b({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function bg(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=_c.store,r=[];return e&&r.push(n?`:is(${Zc}){display:none!important}`:`:is(${Zc}){${$c}}`),t&&r.push(`:is(${gg}){${$c}}`),e&&o&&r.push(`${hg}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var Xc,eu=h({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:_c,styles:bg,start(){Xc=xe()},stop(){Xc?.()}});var yg=new Set(["chatgpt","new chat","\u65B0\u804A\u5929","codex"]);function vg(){let e=y(document.title.replace(/\s*[|–-]\s*(?:ChatGPT|Codex)$/i,""));return e&&!yg.has(e.toLowerCase())?e:null}function Fo(e){return e?fo(e)??(e===v()?vg():null):null}var tu=`/*
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
`;var te=O("bloom-recent-"),Me="home",wg=50,ou=140,xg=new Set(["Backquote"]),Sg=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),w=b({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),_e=null,de=[],be=0,$i,nu=[],nr=()=>it()?null:v()??(Ct()?Me:null);function ru(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function au(e){let t=Fo(e);t&&w.store.titles[e]!==t&&(w.store.titles={...w.store.titles,[e]:t});let o=Ys(location.href);o&&e===v()&&w.store.projects[e]!==o&&(w.store.projects={...w.store.projects,[e]:o})}function iu(e){if(!e)return;let t=[e,...w.store.visits.filter(n=>n!==e)].slice(0,wg),o=new Set(t);w.store.visits=t,Object.keys(w.store.previews).some(n=>!o.has(n))&&(w.store.previews=ru(w.store.previews,o)),Object.keys(w.store.titles).some(n=>!o.has(n))&&(w.store.titles=ru(w.store.titles,o)),e!==Me&&au(e)}function qg(e){if(!w.store.visits.includes(e))return;let{[e]:t,...o}=w.store.titles,{[e]:n,...r}=w.store.previews,{[e]:i,...a}=w.store.projects;w.store.visits=w.store.visits.filter(d=>d!==e),w.store.titles=o,w.store.previews=r,w.store.projects=a}function or(e){if(!e||!w.store.visits.includes(e))return;let t={},o=Ie(e)?.chain??[];for(let r of o)t[r.role]=ye(qn(r),ou);if(e===v())for(let r of Je()){let i=Rt(r);i&&(t[r.role]=ye(i,ou))}let n=w.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(w.store.previews={...w.store.previews,[e]:t})}function Eg(){let e=Number(w.store.maxRecent);return w.store.visits.filter(t=>t!==Me||w.store.includeHome).slice(0,e)}function su(e){if(Zt(),e===nr())return;let t=e===Me?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"], [data-sidebar-destination="builtin:home"]'):Qr(e)[0];t?t.click():location.assign(e===Me?"/":`/c/${e}`)}function Tg(e){let t=e===Me?null:w.store.previews[e],o=t&&["user","assistant"].filter(n=>t[n]).map(n=>s("span",{class:te("preview"),attrs:{"data-role":n},text:t[n]}));return s("span",{class:te("thumb"),attrs:{"aria-hidden":"true"}},o?.length?s("span",{class:te("page")},...o):s("span",{class:te("fallback")},H(e===Me?"plus":"bloom")))}function Mg(e,t){let o=e===Me?"New chat":w.store.titles[e]??Fo(e)??"Untitled chat",n=e===Me?null:w.store.projects[e];return s("button",{class:te("item"),attrs:{type:"button",role:"option","aria-selected":String(t===be),"aria-label":n?`${o}, ${n}`:o},on:{click:()=>su(e),pointerenter:()=>t!==be&&Jt(t)}},Tg(e),s("span",{class:te("meta")},s("span",{class:`${te("title")} bloom-truncate`,text:o}),n&&s("span",{class:te("project")},H("folder"),s("span",{class:"bloom-truncate",text:n}))))}function lu(){de.length?su(de[be]):Zt()}function Jt(e){de.length&&(be=(e+de.length)%de.length,_e?.querySelectorAll(`.${te("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===be))))}function Cg(){or(v());let e=nr();de=Eg(),e&&(de=[e,...de.filter(o=>o!==e)].slice(0,Number(w.store.maxRecent))),be=de.length>1?1:0;let t=de.length?s("div",{class:te("list"),attrs:{role:"listbox","aria-label":"Recent chats"}},...de.map(Mg)):s("div",{class:te("empty"),text:"Open a few chats, then hold Ctrl+` to switch."});t.style.setProperty("--bloom-recent-count",String(de.length)),_e=s("div",{class:`bloom-root ${te("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:o=>o.target===o.currentTarget&&Zt()}},s("div",{class:te("panel")},t)),we(_e)}function Zt(){_e?.remove(),_e=null}var kg=e=>xg.has(e.code)||Sg.has(e.key);function Lg(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&kg(e)){e.preventDefault(),e.stopPropagation(),_e?Jt(be+(e.shiftKey?-1:1)):Cg();return}if(!_e)return;let o={Escape:Zt,Enter:lu,ArrowRight:()=>Jt(be+1),ArrowDown:()=>Jt(be+1),ArrowLeft:()=>Jt(be-1),ArrowUp:()=>Jt(be-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function Ig(e){_e&&e.key==="Control"&&lu()}var cu=h({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:w,styles:tu,start(){$i=new AbortController;let{signal:e}=$i;addEventListener("keydown",Lg,{capture:!0,signal:e}),addEventListener("keyup",Ig,{capture:!0,signal:e}),addEventListener("blur",Zt,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&or(v()),{signal:e}),nu=[Ae(({prevId:i})=>{or(i),iu(nr())}),qe.on("conversation",({id:i})=>{w.store.visits.includes(i)&&au(i),or(i)}),qe.on("conversation-missing",({id:i})=>qg(i))];let{visits:t,titles:o,previews:n}=w.store,r=t.filter(i=>i!==Me&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(w.store.visits=t.filter(i=>!r.includes(i))),iu(nr())},stop(){$i?.abort();for(let e of nu)e();Zt()}});var Xi="data:audio/mpeg;base64,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";var uu=new q("ResponseNotification"),Bg=.5,du="BloomNoticeClaim",Pg=3e4,Ko=b({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:e=>(e.append(U("Preview",hu)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),mu=null,_i=new Map,pu=[],ea,Og=e=>Uint8Array.from(atob(e.slice(e.indexOf(",")+1)),t=>t.charCodeAt(0)).buffer;function Rg(e,t){let o=_i.get(t);return o||(o=(t.startsWith("data:")?Promise.resolve(Og(t)):zo(t)).then(n=>e.decodeAudioData(n)),o.catch(()=>_i.delete(t)),_i.set(t,o)),o}async function fu(e){mu??=new AudioContext;let t=mu;t.state==="suspended"&&t.resume();let o=t.createBufferSource(),n=t.createGain();o.buffer=await Rg(t,e),n.gain.value=Bg,o.connect(n).connect(t.destination),o.start()}function hu(){let e=Ko.store.soundUrl.trim();fu(e||Xi).catch(t=>{uu.warn("Sound failed",t),e&&fu(Xi).catch(o=>uu.warn("Default chime failed",o))})}function Hg(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function Dg(e){let t=Qo(_o(du)??"");return e&&B(t)&&t.id===e&&Date.now()-Number(t.at)<Pg?!1:(en(du,{id:e,at:Date.now()}),!0)}function gu(e){Ko.store.onlyWhenHidden&&!document.hidden||Dg(e)&&(Ko.store.sound&&hu(),Ko.store.browserNotification&&Hg(Fo(e)))}function Ng(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(ea=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:ea.signal}))}var bu=h({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply, including chats you left while they were answering.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:Ko,start(){Ng(),pu=[J.on("fall",({conversationId:e,outcome:t})=>t==="done"&&gu(e)),J.on("background",({conversationId:e})=>gu(e))]},stop(){for(let e of pu)e();ea?.abort()}});var Ug=`:is(${c.sidebarScroll}, :has(> ${c.sidebarScroll})) + :has(${c.menuButton})`,Fg=`${c.rail} > :has(${c.menuButton})`,oa=`:is(${Ug}, ${Fg}, ${c.oldProfile}):not(:hover)`,ta="[data-bloom-profile-avatar]",Kg=`:is(${oa}, ${oa} :has(${ta})) > :not(${ta}, :has(${ta}))`,vu=b({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function Yg(){let{opacity:e,fadeAvatar:t}=vu.store;return e>=100?"":`${t?oa:Kg}{opacity:${e/100}!important}`}var yu,Au=h({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:vu,styles:Yg,start(){yu=xe()},stop(){yu?.()}});var wu=`/*
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
`;var K=O("bloom-star-chats"),jg=80,Qg=60,zg=1200,Wg=120,Yo=b({replaceReadAloud:{type:"boolean",description:"Put the star where the reply's Read aloud button is, and hide that button.",default:!0},messages:{type:"custom",default:[]}}),Vg=`:is(${c.turnActions}) ${c.readAloud}`,na,ra=!1,et=!1,xt=!1,rr=0,X=null,ir="",P=null,ia,tt;function sa(){let e=Yo.store.messages;return Array.isArray(e)?e.filter(t=>B(t)&&typeof t.conversationId=="string"&&typeof t.messageId=="string"&&(t.role==="user"||t.role==="assistant")&&typeof t.snippet=="string"&&typeof t.starredAt=="number"):[]}function la(){let e=v();return e?sa().filter(t=>t.conversationId===e):[]}function Jg(e,t){return sa().some(o=>o.conversationId===e&&o.messageId===t)}function xu(e){let t=sa(),o=t.some(n=>n.conversationId===e.conversationId&&n.messageId===e.messageId);Yo.store.messages=o?t.filter(n=>!(n.conversationId===e.conversationId&&n.messageId===e.messageId)):[{...e,starredAt:Date.now()},...t].slice(0,jg)}function aa(e){return e.messageIds[0]||e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.el.getAttribute("data-turn-key")||""}function Zg(e){return ye(Rt(e)||y(e.el.textContent??""),Qg)}function $g(e){let t=e.closest(c.turn);if(!t)return null;let o=Je().filter(n=>t.contains(n.el));return o.find(n=>n.el.contains(e)||n.el===t)??o.findLast(n=>n.el.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING)??null}function Xg(){let e=[...document.querySelectorAll(c.turnActions)].filter(t=>!t.closest(`[data-bloom], [role="dialog"], [inert], pre, ${c.sidebars}`));return e.filter(t=>!e.some(o=>o!==t&&o.contains(t)))}function _g(e,t){let o=Yo.store.replaceReadAloud?t.querySelector(c.readAloud):null;if(o&&!o.closest("[data-bloom]")){e.nextElementSibling!==o&&o.before(e);return}let n=eh(t);(e.parentElement!==n||n.lastElementChild!==e)&&n.append(e)}function eh(e){let t=[...e.querySelectorAll("button")].filter(n=>n.dataset.bloom!=="message-star"&&!n.closest("[data-bloom]"));return t.length?[...e.children].find(n=>n instanceof HTMLElement&&n!==t[0]&&t.every(r=>n.contains(r)))??e:e}function th(){return[...document.querySelectorAll(c.headerMore)].filter(t=>{if(t.dataset.bloom==="message-star"||t.closest("[data-bloom], [role='dialog'], [inert]")||t.closest(c.sidebars))return!1;let o=t.getBoundingClientRect();return o.width===0&&o.height===0?!!t.closest("header, #page-header"):o.top>=0&&o.top<96&&o.left>window.innerWidth*.5}).toSorted((t,o)=>o.getBoundingClientRect().left-t.getBoundingClientRect().left||(t.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1))[0]??null}function Su(e,t,o){return s("button",{class:t,attrs:{type:"button","aria-label":e},on:{pointerdown:n=>n.stopPropagation(),mousedown:n=>n.stopPropagation(),click:n=>{n.preventDefault(),n.stopPropagation(),o(n)}}},H("star"))}function oh(e,t){e.setAttribute("aria-pressed",String(t)),e.setAttribute("aria-label",t?"Unstar":"Star")}function ar(){return et||xt}function $t(){rr&&window.clearTimeout(rr),rr=0}function Xt(){et=!1,xt=!1,$t(),tt?.enter(),X?.remove(),X=null,ir="",P?.classList.remove(K("-open")),P?.setAttribute("aria-expanded","false")}function sr(e){return e instanceof Node&&!!(P?.contains(e)||X?.contains(e))}function nh(e){e.classList.add(K("-flash")),window.setTimeout(()=>e.classList.remove(K("-flash")),zg)}function rh(e){let t=Je().find(n=>aa(n)===e),o=t?.el.closest(c.turn)??t?.el;o&&(o.scrollIntoView({block:"start"}),nh(o))}function ih(){let e=v(),t=new Set,o=[...document.querySelectorAll('[data-bloom="message-star"][data-place="action"]')];if(!e||it()){for(let n of o)n.remove();return}for(let n of Xg()){if(!je(n))continue;let r=$g(n),i=r?aa(r):"";if(!r||!i)continue;let a=n.querySelector('[data-place="action"]');(!a||a.dataset.id!==i)&&(a?.remove(),a=Su("Star",K("-star"),()=>{let d=v(),l=Je().find(u=>aa(u)===i);!d||!l||xu({conversationId:d,messageId:i,role:l.role,snippet:Zg(l)})}),a.dataset.bloom="message-star",a.dataset.place="action",a.dataset.id=i),oh(a,Jg(e,i)),_g(a,n),t.add(a)}for(let n of o)t.has(n)||n.remove()}function ah(){if(!X||!P)return;let e=P.getBoundingClientRect(),t=X.offsetWidth||288,o=X.offsetHeight||120,n=e.bottom+6;n+o>window.innerHeight-8&&(n=Math.max(8,e.top-o-6));let r=Math.max(8,Math.min(e.right-t,window.innerWidth-t-8));X.dataset.place=n>=e.bottom?"below":"above",X.style.left=`${Math.round(r)}px`,X.style.top=`${Math.round(n)}px`}function sh(){if(!ar()||!P){X?.remove(),X=null,ir="",P?.classList.remove(K("-open")),P?.setAttribute("aria-expanded","false");return}let e=la(),t=e.map(o=>`${o.messageId}	${o.snippet}`).join(`
`);if(!X||ir!==t){X?.remove();let o=e.map(n=>s("div",{class:K("-row")},s("button",{class:K("-jump"),attrs:{type:"button"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),Xt(),rh(n.messageId)}}},s("span",{class:K("-role"),text:n.role==="user"?"You":"ChatGPT"}),s("span",{class:K("-snip"),text:n.snippet||"Message"})),Su("Unstar",K("-unstar"),()=>xu(n))));X=s("div",{class:`bloom-root ${K("-panel")}`,attrs:{"data-bloom":"star-list"},on:{pointerenter:()=>{$t(),tt?.enter(),xt=!0},pointerleave:n=>{sr(n.relatedTarget)||et||tt?.leave(n)}}},s("div",{class:K("-bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:K("-head"),text:"Starred"}),s("div",{class:K("-body")},...o.length?o:[s("div",{class:K("-empty"),text:"No starred messages in this chat"})])),document.body.append(X),ir=t}ah(),P.classList.add(K("-open")),P.setAttribute("aria-expanded","true")}function lh(){for(let r of document.querySelectorAll('[data-bloom="starred"]'))r.remove();let e=th(),t=e?.parentElement??null,o=v();if(!e||!t||t.closest(c.sidebars)||!o||it()||!je(t)){P?.remove(),P=null,Xt();return}P||(P=s("button",{class:K("-toggle"),attrs:{type:"button","data-bloom":"message-star","data-place":"header","aria-label":"Starred messages","aria-expanded":"false"},on:{pointerdown:r=>r.stopPropagation(),pointerenter:()=>{$t(),tt?.enter(),rr=window.setTimeout(()=>{xt=!0,wt()},Wg)},pointerleave:r=>{sr(r.relatedTarget)||($t(),ar()&&tt?.leave(r))},click:r=>{r.preventDefault(),r.stopPropagation(),et=!et,xt=et,$t(),et||Xt(),wt()}}},H("star"))),(P.parentElement!==t||P.nextElementSibling!==e)&&e.before(P);let n=e.getBoundingClientRect();n.width>0&&(P.style.width=`${n.width}px`,P.style.height=`${n.height}px`),P.classList.toggle(K("-here"),la().length>0),sh()}function ch(){let e=new Set(la().map(t=>t.messageId));for(let t of document.querySelectorAll('[data-bloom="navigator"] .bloom-nav-tick, [data-bloom="navigator"] .bloom-nav-row'))t.classList.toggle(K("-mark"),!!t.dataset.messageId&&e.has(t.dataset.messageId))}function wt(){if(!ra){ra=!0;try{for(let e of document.querySelectorAll('[data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();ih(),lh(),ch()}finally{ra=!1}}}function uh(){Xt(),P?.remove(),P=null;for(let e of document.querySelectorAll('[data-bloom="message-star"], [data-bloom="star-list"], [data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();for(let e of document.querySelectorAll(`.${K("-mark")}`))e.classList.remove(K("-mark"))}var qu=h({name:"StarChats",description:"Star a message from its toolbar. The star left of the top-right menu opens this chat's list.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:Yo,styles:()=>`${wu}${Yo.store.replaceReadAloud?Ue([Vg]):""}`,onSettingsChange(e){(e==="messages"||e==="replaceReadAloud")&&wt()},start(){for(let o of document.querySelectorAll('[data-bloom="star-list"]'))o.remove();tt=Cn({over:sr,trigger:()=>P,panel:()=>X,setHeld(o){if(o){xt=!0,wt();return}et||(xt=!1,wt())}}),na=k(o=>W(o)&&wt());let e=o=>{sr(o.target)||ar()&&Xt()};document.addEventListener("pointerdown",e,!0);let t=o=>{o.key!=="Escape"||!ar()||(o.preventDefault(),Xt())};document.addEventListener("keydown",t,!0),ia=()=>{document.removeEventListener("pointerdown",e,!0),document.removeEventListener("keydown",t,!0)},wt()},stop(){na?.(),na=void 0,ia?.(),ia=void 0,$t(),tt?.dispose(),tt=void 0,uh()}});var Eu="filter:blur(6px)!important;transition:filter 0.2s ease",jx=`:is(${c.sidebars})`,St="data-bloom-streamer-open",dh="[data-app-action-sidebar-thread-row], [data-app-action-sidebar-project-row], .bloom-recent-item",Tu=":not([data-app-action-sidebar-thread-row] *, [data-app-action-sidebar-project-row] *)";function mh(){return{conversations:{selectors:["[data-app-action-sidebar-thread-title]"],hover:!0,row:"[data-app-action-sidebar-thread-row]"},projects:{selectors:["[data-app-action-sidebar-project-label]"],hover:!0,row:"[data-app-action-sidebar-project-row]"},accountAvatar:{selectors:["[data-bloom-profile] img","[data-bloom-menu] img"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:[`[data-thread-title]${Tu}`,`[data-thread-title-trigger]${Tu}`],hover:!1}}}var Mu=b({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function ph(e,t){let o=[`:is(${e}):hover`,`.bloom-recent-item:hover :is(${e})`,`:is(${e})[${St}]`];return t&&o.push(`${t}:hover`,`${t}:hover :is(${e})`,`${t}:is(${e}):hover`,`${t}[${St}]`,`${t}[${St}] :is(${e})`),o.join(",")}function fh(){let e=mh();return Object.entries(e).filter(([t])=>Mu.store[t]).map(([,t])=>{let o=t.selectors.join(",");if(!t.hover)return`:is(${o}){${Eu}}`;let n="row"in t?t.row:void 0;return`:is(${o}){${Eu}}${ph(o,n)}{filter:none!important}`}).join(`
`)}function gh(e,t){for(let o of document.elementsFromPoint(e,t))if(o instanceof Element){let n=o.closest(dh);if(n)return n}return null}function da(e){for(let t of document.querySelectorAll(`[${St}]`))t!==e&&t.removeAttribute(St);e&&!e.hasAttribute(St)&&e.setAttribute(St,"")}var _t,hh=Fe(()=>{_t&&da(gh(_t.clientX,_t.clientY))});function ca(e){_t=e,hh()}function bh(e){e.relatedTarget instanceof Node&&document.documentElement.contains(e.relatedTarget)||(_t=void 0,da(null))}var ua,lr,Cu=h({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:Mu,styles:fh,start(){ua=xe(),lr=new AbortController;let e={capture:!0,signal:lr.signal,passive:!0};document.addEventListener("pointerover",ca,e),document.addEventListener("pointermove",ca,e),document.addEventListener("pointerout",ca,e),window.addEventListener("pointerleave",bh,e)},stop(){lr?.abort(),lr=void 0,_t=void 0,da(null),ua?.(),ua=void 0}});var ot=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)','[data-turn-key] [data-message-author-role="user"] blockquote:not(.twitter-tweet)','[class~="group/user-message"] blockquote:not(.twitter-tweet)'].join(","),ma=b({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function yh(){let e=[`${ot}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${ot}>*{margin-block:0!important}`];return ma.store.italic||e.push(`${ot}{font-style:inherit!important}`),ma.store.quotes||(e.push(`${ot}{quotes:none!important}`),e.push(`${ot}::before,${ot}::after,${ot} p::before,${ot} p::after{content:none!important}`)),e.join(`
`)}var ku=h({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:ma,styles:yh});var vh=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],Ah=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",wh='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',Lu=b({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function xh(){let e=`${Lu.store.width}rem`;return`:root,[data-app-action-timeline-scroll],[data-chatgpt-composer],[data-composer-input]{--thread-content-max-width:${e}!important;--composer-adjacent-max-width:${e}!important}`}var Iu=h({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:Lu,styles:xh});var Sh=[_s,qs,Fl,Jl,Xl,ec,lc,yc,Tc,Bc,zc,Vc,Jc,eu,cu,bu,Au,qu,Cu,ku,Iu],pa=Sh;var qh=new q("Bloom"),Bu="2.0.120";var fa=0,cr,Go="__bloomOnShortcut";function ur(e){if(e.isComposing||!e.shiftKey||!(e.metaKey||e.ctrlKey)||e.key!=="b"&&e.key!=="B")return;e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation();let t=Rs();We();for(let o of document.querySelectorAll("[data-bloom='settings']"))o.remove();t||Ot()}function Eh(){let e=pe;e[Go]&&document.removeEventListener("keydown",e[Go],!0),e[Go]=ur,document.addEventListener("keydown",ur,!0)}function Th(){fa++,document.removeEventListener("keydown",ur,!0);let e=pe;e[Go]===ur&&delete e[Go],cr?.(),cr=void 0,Za(),oo(),Jo()}async function ga(){let e=++fa,t=()=>e===fa;oo(),Jo();for(let o of pa)o.updatedAt=ps[o.name];Da(pa),Pa(),Ua(),Wo("base",Xa),ds(),Eh(),ln("Init"),kr().then(()=>{t()&&(Ea(),ln("DOMContentLoaded"))}),await Lr(),t()&&(ln("HostReady"),cr?.(),cr=Ns(),Ja(),qh.info(`Bloom++ ${Bu} app host ready`))}var Mh=new q("Boot");window===window.top&&(Ma(pe.Bloom),Ca(ha),ga().catch(e=>Mh.error("Startup failed",e)));})();
