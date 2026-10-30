// ==UserScript==
// @name         Bloom++ (ChatGPT app)
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.97
// @description  Bloom++ host for the official ChatGPT macOS app. Injected over loopback CDP; not a web userscript.
// @author       0-V-linuxdo & Bloom contributors
// @homepageURL  https://github.com/0-V-linuxdo/Bloom
// @supportURL   https://github.com/0-V-linuxdo/Bloom/issues
// @match        app://*/*
// @run-at       document-start
// @grant        none
// @license      GPL-3.0-or-later
// ==/UserScript==

/* Bloom++ v2.0.97 ChatGPT app host. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var uu=Object.defineProperty;var du=(e,t)=>{for(var o in t)uu(e,o,{get:t[o],enumerable:!0})};var x=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var te=(e,t,o)=>Math.min(o,Math.max(t,e)),C=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Vt=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,pe=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,y=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function oa(e,t){return`${e} ${t}${e===1?"":"s"}`}async function Do(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function No(e){try{return JSON.parse(e)}catch{return}}var se=typeof unsafeWindow>"u"?window:unsafeWindow,mu=200,pu=300;function Uo(e){return new Promise((t,o)=>GM_xmlhttpRequest({url:e,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=mu&&n<pu?t(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var fu=new x("Styles"),Ie=new Map,Jt=new Set,$e=new Map,tr=!0,na=e=>e.replaceAll(/[^A-Za-z0-9_-]/g,"_"),gu=e=>`:where(:root){--bloom-sheet-${na(e)}:1}`,hu=(e,t)=>`${gu(e)}${t}`,ra=e=>`bloom-style-${e}`;function ia(e){try{return[...e.cssRules].map(t=>t.cssText).join(`
`)}catch{return""}}function bu(e,t){let o=ia(e);return o?o.includes(`--bloom-sheet-${na(t)}`)?!0:t==="plugin-StreamerMode"?o.includes("blur(6px)")&&(o.includes("data-app-action-sidebar-thread-title")||o.includes("data-bloom-streamer-open")):t==="plugin-WiderChat"?o.includes("--composer-adjacent-max-width")&&o.includes("--thread-content-max-width"):t==="plugin-ComposerOpacity"?o.includes("--composer-layout-surface-backdrop-filter")||o.includes("--composer-layout-surface-background")&&o.includes("color-mix"):!1:!1}function aa(e){let t=ia(e);return t?!!(t.includes("--bloom-")||t.includes(".bloom-")||t.includes("[data-bloom")||t.includes("--bloom-sheet-")||t.includes("blur(6px)")&&t.includes("data-app-action-sidebar-thread-title")||t.includes("--composer-adjacent-max-width")&&t.includes("--thread-content-max-width")||t.includes("--composer-layout-surface-backdrop-filter")):!1}function sa(){let e=document.adoptedStyleSheets.filter(t=>!Jt.has(t)&&!aa(t));document.adoptedStyleSheets=[...e,...Ie.values()]}function la(e){document.readyState==="loading"||e.parentNode===document.head||document.head.append(e)}function yu(e,t){let o=$e.get(e);o||(o=document.createElement("style"),o.id=ra(e),$e.set(e,o)),o.textContent!==t&&(o.textContent=t),la(o)}function Fo(e,t){let o=hu(e,t);if(tr)try{let n=Ie.get(e);n||(n=new se.CSSStyleSheet,Ie.set(e,n),Jt.add(n)),n.replaceSync(o),sa();return}catch(n){fu.warn("Constructed style sheets unavailable, using <style> after parsing",n),tr=!1;let r=Ie.get(e);r&&Jt.delete(r),Ie.delete(e)}yu(e,o)}function Zt(e){let t=Ie.get(e);t&&(Jt.delete(t),Ie.delete(e)),$e.get(e)?.remove(),$e.delete(e);for(let o of document.querySelectorAll(`style[id="${ra(e)}"]`))o.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(o=>o!==t&&!bu(o,e)),tr&&sa()}catch{}}function Xt(){Ie.clear(),Jt.clear();for(let e of $e.values())e.remove();$e.clear();for(let e of document.querySelectorAll("style[id^='bloom-style-']"))e.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(e=>!aa(e))}catch{}}function ca(){for(let e of $e.values())la(e)}var L=e=>(...t)=>t.map(o=>e+o).join(" "),Ko=(...e)=>e.filter(Boolean).join(" "),Pe=e=>e.length?`${e.map(t=>`${t}:not([data-bloom])`).join(",")}{display:none!important}`:"";var ua="__bloomHost",or=new x("Boot"),Au=['[data-bloom="navigator"]','[data-bloom="settings"]','[data-bloom="history-hud"]','[data-bloom="history-dialog"]','[data-bloom="star-list"]','[data-bloom="entry"]','[data-bloom="menu-entry"]','[data-bloom="menu-flyout"]','[data-bloom="message-star"]','[data-bloom="starred"]','[data-bloom="chat-star"]','[data-bloom="queue"]','[data-bloom="recent"]','[data-bloom="quote-chip"]','[data-bloom="quote-back"]','[data-bloom="cls"]','[data-bloom="timestamp"]','[data-bloom="tooltip"]','[data-bloom="notices"]'].join(", "),vu=["data-bloom-greeting","data-bloom-placeholder","data-bloom-streamer-open","data-bloom-share","data-bloom-invite","data-bloom-csi-avatar","data-bloom-csi-sized"];function Go(){if(!(typeof document>"u"||!document.documentElement)){for(let e of document.querySelectorAll(Au))e.remove();for(let e of vu)for(let t of document.querySelectorAll(`[${e}]`))t.removeAttribute(e);for(let e of document.querySelectorAll("[data-bloom-text]"))e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size"),e.style.removeProperty("--bloom-text")}}function wu(e){if(or.warn("Replacing another Bloom++ instance",e.VERSION),e.destroy){e.destroy();return}for(let t of e.plugins?.values()??[]){try{t.stop?.()}catch(o){or.error("Failed to stop previous plugin",o)}t.styles="",t.start=void 0}Xt()}function da(e){let t=se,o=new Set;for(let n of[e,t.Bloom,t[ua]])if(!(!n||o.has(n))){o.add(n);try{wu(n)}catch(r){or.error("Failed to retire Bloom++",r)}}Go()}function ma(e){let t=se;try{delete t.Bloom}catch{}Object.defineProperty(t,"Bloom",{value:e,configurable:!0,writable:!0}),Object.defineProperty(t,ua,{value:e,configurable:!0,writable:!0})}var ta={};du(ta,{VERSION:()=>cu,destroy:()=>ih,init:()=>ea,plugins:()=>W});var xu=new x("Dom");function s(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var pa=document.createElement("template");function fa(e){return pa.innerHTML=e.trim(),pa.content.firstElementChild.cloneNode(!0)}var fe=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),ge=(e,t=document)=>[...t.querySelectorAll(e)].find(fe)??null,Su=16,qu="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function ga(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([qu],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function nr(e){document.hidden?setTimeout(e,Su):requestAnimationFrame(e)}function Oe(e){let t=!1;return()=>{t||(t=!0,nr(()=>{t=!1;try{e()}catch(o){xu.error("Scheduled task failed",o)}}))}}var Yo=new Set,jo=[],$t,Eu=Oe(()=>{let e=jo;jo=[];for(let t of Yo)t(e)});function M(e){return Yo.add(e),$t||($t=new MutationObserver(t=>{jo.push(...t),Eu()}),$t.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{Yo.delete(e),!Yo.size&&($t?.disconnect(),$t=void 0,jo=[])}}var Tu=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),U=e=>!e.length||e.some(t=>!Tu(t.target)),Mu=e=>`"${e.replaceAll("\\","\\\\").replaceAll('"','\\"').replaceAll(`
`,"\\A ")}"`;function _e(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size"),e.style.removeProperty("--bloom-text");return}e.style.setProperty("--bloom-text",Mu(t)),e.getAttribute("data-bloom-text")!==t&&e.setAttribute("data-bloom-text",t)}function h(e){return e}var Cu=new x("Storage");function Qo(e){try{return localStorage.getItem(e)??void 0}catch{return}}function Wo(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(o){Cu.warn("localStorage write failed",o)}}function ha(e,t){addEventListener("storage",o=>{o.key===e&&t(o.newValue)})}var rr="BloomSettings",Lu=100,Re={plugins:{}},zo=new Set,ir=new Set,yt;function ba(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=No(t);return!C(t)||!C(t.plugins)||!Object.keys(t.plugins).length?null:t}function ya(){let e=ba(Qo(rr));e&&(Re.plugins=e.plugins)}var Aa=(e,t)=>`${e}
${t}`;function ar(){yt=void 0,ir.clear(),Wo(rr,Re)}function ku(e){let t=ba(e);if(!t)return;let o=[];for(let n of new Set([...Object.keys(Re.plugins),...Object.keys(t.plugins)])){let r=Re.plugins[n]??={},i=C(t.plugins[n])?t.plugins[n]:{};for(let a of new Set([...Object.keys(r),...Object.keys(i)]))ir.has(Aa(n,a))||JSON.stringify(r[a])===JSON.stringify(i[a])||(i[a]===void 0?delete r[a]:r[a]=i[a],o.push([n,a]))}for(let[n,r]of o)for(let i of zo)i(n,r)}function sr(){yt&&(clearTimeout(yt),ar())}function va(e){let t=Object.keys(Re.plugins).filter(o=>!e.has(o));if(!t.length)return t;for(let o of t)delete Re.plugins[o];return clearTimeout(yt),ar(),t}var le=(e,t)=>Re.plugins[e]?.[t];function He(e,t,o){let n=Re.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,ir.add(Aa(e,t)),clearTimeout(yt),yt=setTimeout(ar,Lu);for(let r of zo)r(e,t)}function At(e){return zo.add(e),()=>void zo.delete(e)}function lr(e){return e.type==="component"?void 0:e.default}function b(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>le(t.pluginName,n)??(e[n]&&lr(e[n])),set:(o,n,r)=>(He(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&le(t.pluginName,o)!==void 0&&He(t.pluginName,o)}};return t}var wa=e=>{let t=()=>{let o=le("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();He("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},Vo=wa("pinnedPlugins"),Jo=wa("starredPlugins");addEventListener("pagehide",sr);ha(rr,ku);var to=new x("PluginManager"),W=new Map,De=new Set,Xo=new Set,cr=new Set,_t=new Map,Bu=2880*60*1e3;function xa(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),W.set(t.name,t)}var Sa=()=>{let e=le("Settings","knownPlugins");return C(e)?e:null};function qa(){let e=va(new Set(W.keys()));e.length&&to.info(`Dropped settings of removed plugins: ${e.join(", ")}`);let t=Sa(),o=Date.now(),n={...t},r=[...W.values()].filter(i=>!i.hidden&&!i.required&&!(i.name in n));for(let i of r)n[i.name]=t?o:0;for(let i of Object.keys(n))W.has(i)||delete n[i];JSON.stringify(n)!==JSON.stringify(t)&&He("Settings","knownPlugins",n)}var Ea=e=>{let t=Sa()?.[e];return!!t&&Date.now()-t<Bu},Ta=e=>_t.get(e);function Ma(){for(let e of cr)e()}function ur(e,t){let o=_t.get(e);(t?o?.join(`
`)===t.join(`
`):!o)||(t?_t.set(e,t):_t.delete(e),Ma())}var qe=e=>!!e.required||(le(e.name,"enabled")??!!e.enabledByDefault),dr=e=>De.has(e),eo=e=>`plugin-${e.name}`;function Ca(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?Fo(eo(e),t):Zt(eo(e))}function La(e){if(!De.has(e.name))try{Ca(e),e.start?.(),De.add(e.name)}catch(t){Zt(eo(e)),to.error(`Failed to start ${e.name}`,t)}}function $o(e){De.delete(e.name),Zt(eo(e));try{e.stop?.()}catch(t){to.error(`Failed to stop ${e.name}`,t)}}var mr=e=>e.startAt??"HostReady";function ka(e){if(qe(e)){Xo.has(mr(e))&&La(e);return}$o(e)}function _o(e){Xo.add(e);for(let t of W.values())mr(t)===e&&ka(t);to.info(`${e}: ${[...De].join(", ")}`)}function Ba(e){$o(e)}function Ia(e){qe(e)&&Xo.has(mr(e))&&La(e)}function Pa(e,t){He(e.name,"enabled",t),sr()}function Iu(){for(let e of W.values())e.required||qe(e)||(De.has(e.name)?$o(e):Zt(eo(e)))}var Zo;function Oa(){Zo?.(),Zo=M(()=>Iu())}function Ra(){Zo?.(),Zo=void 0;for(let e of W.values())$o(e);De.clear(),Xo.clear(),_t.clear()}function Ha(e){return cr.add(e),()=>void cr.delete(e)}At((e,t)=>{let o=W.get(e);if(o){if(t==="enabled"){typeof le(e,"enabled")=="boolean"&&ka(o),Ma();return}if(De.has(e))try{Ca(o),o.onSettingsChange?.(t)}catch(n){to.error(`Settings change failed for ${e}`,n)}}});var Da=`/*
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
    z-index: 2147483647;
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
`;var Ou=new x("Events");function vt(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){Ou.error(`Listener for ${String(t)} failed`,r)}}}}function Na(e,t){let o=e instanceof Element?[e,...e.querySelectorAll("*")]:[...e.querySelectorAll("*")];for(let n of o){let r=n.shadowRoot;r&&(t(r),Na(r,t))}}function Ne(e,t=document){let o=[...t.querySelectorAll(e)];return Na(t,n=>o.push(...n.querySelectorAll(e))),o}var ce=(e,t=document)=>Ne(e,t).find(fe)??null;var c={rail:"[data-app-navigation-rail]",sidebarScroll:"[data-app-action-sidebar-scroll]",sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"[data-app-action-sidebar-scroll]",oldRail:"[data-app-navigation-rail]",oldProfile:'button[aria-label="Open profile menu" i]',threadRow:"[data-app-action-sidebar-thread-row]",threadSelected:"[data-app-action-sidebar-thread-row][data-app-action-sidebar-thread-selected='true']",threadTitle:"[data-app-action-sidebar-thread-title]",projectRow:"[data-app-action-sidebar-project-row]",projectLabel:"[data-app-action-sidebar-project-label]",destination:"[data-sidebar-destination]",conversationLink:"[data-app-action-sidebar-thread-row]",timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:"[data-turn-key]",turn:"[data-turn-key]",messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",userBubble:'[class~="group/user-message"]',assistantReply:"[data-response-annotation-target]",oldThread:"[data-app-action-timeline-scroll]",turnActions:'.turn-action-controls, [class*="turn-action-controls"]',readAloud:'button:is([aria-label="Read aloud" i], [aria-label^="Read aloud" i], [aria-label="Stop reading" i], [aria-label^="Stop reading" i], [aria-label="\u6717\u8BFB"], [aria-label^="\u6717\u8BFB"], [aria-label="\u505C\u6B62\u6717\u8BFB"], [data-testid*="read-aloud" i])',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery, [class*='recovery']",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composer:"[data-chatgpt-composer], [data-composer-input]",composerInput:'[data-composer-input] [contenteditable="true"].ProseMirror, [contenteditable="true"].ProseMirror',composerConversation:"[data-above-composer-conversation-id]",oldComposerForm:"[data-chatgpt-composer]",sendButton:'button[aria-label="Send" i], button[aria-label="Send prompt" i], button[aria-label="Send message" i]',stopButton:'button[aria-label="Stop" i], button[aria-label^="Stop " i], button[aria-label="\u505C\u6B62" i], button[aria-label^="\u505C\u6B62"]',composerFooter:"[data-chatgpt-composer]",modelTrigger:'button[aria-label="Model selector" i], button[aria-label="Select ChatGPT model" i], [data-chatgpt-composer] button[aria-haspopup="menu"]',modelItem:'[role="menu"] [role="menuitemradio"], [role="menu"] [role="menuitem"]',effortSlider:'[role="menu"] [data-reasoning-slider]',homeHeading:'main h1:not([aria-hidden="true"]), [role="main"] h1:not([aria-hidden="true"]), [data-testid="home-heading"], [data-homepage-takeover] h1, .heading-xl, [class~="heading-xl"]',headerMore:'button[aria-label="More" i], button[aria-label="\u66F4\u591A"]',headerTitle:"[data-thread-title], [data-thread-title-trigger]",profile:'button[aria-label="Open profile menu" i]',rightPanel:"aside[data-app-shell-focus-area='right-panel']",summaryPanel:"[data-summary-panel-variant]"};var Ua=/[​-‍﻿]/g,ue=()=>ce(c.composerInput),oo=e=>e instanceof HTMLElement&&e.matches(c.composerInput),ne=(e=ue())=>e?.closest("form")??e?.closest(c.composer)??ce(c.composer);function Q(e=ue()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(Ua,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(Ua,"").trim()}var Ru=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function Fa(e,t){let o=t?"insertText":"deleteContentBackward";e.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:o,data:t||null})),e.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:o,data:t||null}))}function Ee(e,t=ue()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return Ru?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),typeof document.execCommand=="function"?e?document.execCommand("insertText",!1,e):document.execCommand("delete"):Fa(t,e),Q(t)!==e.trim()&&Fa(t,e),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function Ka(e,t){let o=e;for(;o&&o!==t;){if(o instanceof HTMLElement&&o.parentElement===t)return o;o=o.parentNode}return null}function Ga(e,t,o){let n=document.createRange();return n.selectNodeContents(e),o?n.setEnd(t.startContainer,t.startOffset):n.setStart(t.endContainer,t.endOffset),n.toString().includes(`
`)?!0:!!n.cloneContents().querySelector("br")}function Ya(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:g,selectionEnd:T,value:f}=e;return{first:!f.slice(0,g).includes(`
`),last:!f.slice(T).includes(`
`)}}let t=getSelection();if(!t?.rangeCount||!e.contains(t.anchorNode))return{first:!0,last:!0};let o=t.getRangeAt(0),n=[...e.children].filter(g=>g instanceof HTMLElement),r=Ka(o.startContainer,e),i=Ka(o.endContainer,e),a=!r||r===n[0],d=!i||i===n[n.length-1],l=o.getBoundingClientRect(),u=(r??e).getBoundingClientRect(),m=Number.parseFloat(getComputedStyle(r??e).lineHeight)||24;return l.height?{first:a&&l.top-u.top<m,last:d&&u.bottom-l.bottom<m}:{first:a&&!Ga(r??e,o,!0),last:d&&!Ga(i??e,o,!1)}}var ja=e=>{let t=ne();return(t&&ce(e,t))??ce(e)},pr=()=>ja(c.stopButton),Hu=()=>{let e=ja(c.sendButton);return e&&!e.matches(c.stopButton)?e:null};function Qa(){let e=Hu();if(e){e.disabled||e.click();return}ue()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var Wa=()=>fe(pr());var en=new x("AppProtocol"),no=vt();function Du(e){let t=e;if(typeof t=="string")try{t=JSON.parse(t)}catch{return null}if(Array.isArray(t)||!t||typeof t!="object")return null;let o=t,n=o.notification&&typeof o.notification=="object"?o.notification:o;if(typeof n.method!="string")return null;let r=n.params&&typeof n.params=="object"?n.params:void 0;return{method:n.method,params:r}}function ro(e){if(Array.isArray(e)){for(let o of e)ro(o);return}let t=Du(e);t&&no.emit("note",t)}var gr=new WeakMap,fr=new WeakMap;function Nu(e,t){let o=gr.get(e);if(o)return o;let n=r=>{ro(r.data),typeof e=="function"?e.call(t,r):e.handleEvent(r)};return gr.set(e,n),n}function Uu(){let e=MessagePort.prototype,t=e.addEventListener,o=e.removeEventListener;e.addEventListener=function(r,i,a){return r!=="message"?t.call(this,r,i,a):t.call(this,r,Nu(i,this),a)},e.removeEventListener=function(r,i,a){return r!=="message"?o.call(this,r,i,a):o.call(this,r,gr.get(i)??i,a)};let n=Object.getOwnPropertyDescriptor(e,"onmessage");n?.set&&Object.defineProperty(e,"onmessage",{configurable:!0,enumerable:n.enumerable,get(){return fr.has(this)?fr.get(this):n.get?.call(this)},set(r){fr.set(this,r),n.set.call(this,function(a){ro(a.data),r?.call(this,a)})}})}function Fu(){let e=window.electronBridge,t=e?.subscribeToWorkerMessages;if(!(!e||typeof t!="function"))try{e.subscribeToWorkerMessages=(o,n)=>t.call(e,o,r=>{ro(r),n(r)})}catch(o){en.warn("electronBridge.subscribeToWorkerMessages is not writable",o)}}function Ku(){addEventListener("message",e=>ro(e.data));try{Uu()}catch(e){en.warn("MessagePort wrap failed",e)}try{Fu()}catch(e){en.warn("electronBridge wrap failed",e)}en.info("Listening for app-server notifications")}Ku();var Gu=new x("AppRoute"),Yu=500,on=new Set,nn=null,tn;function A(){return(ce(c.threadSelected)??Ne(c.threadSelected)[0])?.getAttribute("data-app-action-sidebar-thread-id")??null}var rn=()=>!A(),Va=()=>!1,et=()=>!1;function za(){let e=A();if(e===nn)return;let{href:t}=location,o={prevHref:t,href:t,prevId:nn,id:e};nn=e;for(let n of on)try{n(o)}catch(r){Gu.error("Route listener failed",r)}}function ju(){let e=new MutationObserver(za);(()=>{document.body&&e.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-app-action-sidebar-thread-selected","data-app-action-sidebar-thread-id"]})})();let o=setInterval(za,Yu);return()=>{e.disconnect(),clearInterval(o)}}function he(e){return on.add(e),tn||(nn=A(),tn=ju()),()=>{on.delete(e),!on.size&&(tn?.(),tn=void 0)}}var Qu=250,Wu=400,O=vt(),tt=!1,wt=null,rt=!1,ot="done",nt=!1,Ja=!1,X=()=>({generating:tt,conversationId:A()}),zu=e=>{if(!e)return!0;let t=A();return t?t===e||t.endsWith(e)||e.endsWith(t.replace(/^local:/,"")):!0};function Vu(e){return e==="interrupted"||e==="aborted"||e==="cancelled"?"stopped":e==="failed"||e==="error"?"error":"done"}function Ju(){return nt||Wa()}function Zu(e){wt=null,tt=!1,nt=!1,O.emit("fall",{conversationId:A(),outcome:e}),rt=!1,ot="done"}function Xu(){let e=Ju();e&&!tt&&(tt=!0,rt=!1,ot="done",O.emit("rise",{conversationId:A()})),e||!tt?wt=null:wt==null?wt=Date.now():Date.now()-wt>=Wu&&Zu(rt?"stopped":ot)}function io(){Xu(),O.emit("tick",X())}function $u({prevId:e,id:t}){e!==t&&(tt&&(nt=!1,wt=null,tt=!1,rt=!1,ot="done",O.emit("fall",{conversationId:e,outcome:"left"})),O.emit("context",{prevId:e,id:t,migrated:!e&&!!t}),io())}function _u(e){if(zu(e.params?.threadId)){if(e.method==="turn/started"){nt=!0,io();return}if(e.method==="turn/interrupt"){nt=!1,ot="stopped",rt=!0,io();return}e.method==="turn/completed"&&(nt=!1,ot=Vu(e.params?.turn?.status),ot==="stopped"&&(rt=!0),io())}}function ed(e){e.target instanceof Element&&e.target.closest(c.stopButton)&&(rt=!0,nt=!1)}function Za(){Ja||(Ja=!0,no.on("note",_u),he($u),document.addEventListener("click",ed,!0),ga(io,Qu))}var td="__reactContainer$",Xa="__reactFiber$";function br(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var hr=(e,t)=>Object.keys(e.wrappedJSObject??e).some(o=>o.startsWith(t)),be=e=>!hr(document,td)||hr(e,Xa);function Ue(){return document.body?Promise.resolve():new Promise(e=>{let t=new MutationObserver(()=>{document.body&&(t.disconnect(),e())});t.observe(document,{childList:!0,subtree:!0})})}async function yr(){await Ue();let e=Date.now()+8e3;for(;!hr(document.body,Xa)&&Date.now()<e;)await new Promise(t=>setTimeout(t,100))}var $a={BetterNavigator:1793350808e3,BetterQuotes:179333264e4,ChatListStatus:1793351872e3,ChatStateFavicons:1790623094e3,Cleaner:1793267811e3,CompleteToast:1793354069e3,ComposerOpacity:1793344667e3,Continue:1790939902e3,CustomSidebarIdentity:1790658669e3,GreetingCustomizer:1793350808e3,InputHistory:1793351708e3,MessageTimestamps:1791080494e3,NoDictation:1793335268e3,NoShareLink:1790658669e3,NoSidebarIdentity:1790616549e3,PromptQueue:1793267321e3,RecentTopics:1793354069e3,ResponseNotification:1793354069e3,Settings:1793363342e3,SidebarIdentityOpacity:1790682605e3,StarChats:1793350808e3,StreamerMode:1793344667e3,TemporaryChat:1792014624e3,UserQuotes:1793345744e3,WiderChat:179333264e4};var S=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,od="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",nd={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${od}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:S('<path d="M18 6 6 18M6 6l12 12"/>'),gear:S('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:S('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:S('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:S('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:S('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:S('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:S('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:S('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:S('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:S('<path d="m6 9 6 6 6-6"/>'),play:S('<path d="M7 4v16l13-8z"/>'),plus:S('<path d="M12 5v14M5 12h14"/>'),check:S('<path d="m5 12 5 5 9-10"/>'),alert:S('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:S('<path d="M4 5h16v11H9l-5 4z"/>'),layout:S('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:S('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:S('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:S('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:S('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:S('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:S('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:S('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:S('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:S('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:S('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:S('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:S('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:S('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:S('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:S('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),folder:S('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),ghost:S('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},k=e=>fa(nd[e]);var de="data-bloom-tip",Ar=6,vr=8,it,_a=null;function xt(e){if(e===_a)return;if(_a=e,!e){it?.remove();return}it??=s("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),it.textContent=e.getAttribute(de),document.body.append(it);let t=e.getBoundingClientRect(),{width:o,height:n}=it.getBoundingClientRect(),r=t.bottom+Ar+n<=innerHeight-vr;it.style.left=`${te(t.left+t.width/2-o/2,vr,innerWidth-o-vr)}px`,it.style.top=`${r?t.bottom+Ar:t.top-Ar-n}px`}var es=e=>e instanceof Element?e.closest(`[${de}]`):null;function ts(){let e=new AbortController,t={passive:!0,signal:e.signal};return document.addEventListener("pointerover",o=>xt(es(o.target)),t),document.addEventListener("pointerout",o=>o.relatedTarget||xt(null),t),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&xt(es(o.target)),t),document.addEventListener("focusout",()=>xt(null),t),document.addEventListener("pointerdown",()=>xt(null),t),()=>{e.abort(),xt(null)}}function Fe(e,t,o,n=!1){let r=s("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let a=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(a)),t(a)===!1&&r.setAttribute("aria-checked",String(!a))}),r}function H(e,t,o){return s("button",{class:Ko("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button","data-bloom":"control"},on:{click:t}})}function G(e,t,o,n){let r=s("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":t,"data-bloom":"control",[de]:t},on:{click:o}},k(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function an(e,t,o,n,r,i){let a=s("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});a.value=String(e);let d=s("output",{text:`${a.value}${r}`});return a.addEventListener("input",()=>{d.textContent=`${a.value}${r}`,i(Number(a.value))}),s("div",{class:"bloom-slider"},a,d)}function wr(e,t,o){let n=s("select",{class:"bloom-select"},...t.map(r=>s("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function ao(e,t,o="",n="text"){let r=s("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var xr=["showSidebarEntry","showSidebarEntryOnHover","showAccountMenuEntry"],St={showSidebarEntry:!0,showSidebarEntryOnHover:!1,showAccountMenuEntry:!1},Sr=e=>Object.hasOwn(St,e),qr=e=>le("Settings",e)??St[e],os=(e,t)=>!Sr(e)||t!==!1||xr.some(o=>o!==e&&qr(o));var rd=new x("Themes"),id=/^https:\/\/\S+\.css(?:[?#]|$)/i,ad=/\/\*\*[^]*?@name[ \t]+([^\n*]+)/,F=b({themes:{type:"custom",default:[]},quickCss:{type:"custom",default:""},quickCssEnabled:{type:"custom",default:!0}});async function ns(e){let t=new TextDecoder().decode(await Uo(e));if(!t.trim())throw new Error("Theme file is empty.");return t}var sn=(e,t)=>{F.store.themes=F.store.themes.map(o=>o.id===e?{...o,...t}:o)},rs=e=>{F.store.themes=F.store.themes.filter(t=>t.id!==e)};async function is(e){if(!id.test(e))throw new Error("Enter an https URL that ends in .css.");if(F.store.themes.some(n=>n.url===e))throw new Error("This theme is already added.");let t=await ns(e),o=t.match(ad)?.[1]?.trim()||decodeURIComponent(new URL(e).pathname.split("/").pop()??e).replace(/\.css$/i,"").replaceAll(/[-_]/g," ");F.store.themes=[...F.store.themes,{id:Vt("theme"),name:o,url:e,css:t,enabled:!0}]}function as(e,t,o){if(!t.trim())throw new Error("Name is required.");if(!o.trim())throw new Error("CSS is required.");e?sn(e,{name:t.trim(),css:o}):F.store.themes=[...F.store.themes,{id:Vt("theme"),name:t.trim(),css:o,enabled:!0}]}async function sd(){await Promise.all(F.store.themes.filter(e=>e.url&&e.enabled).map(async({id:e,url:t,name:o})=>{try{let n=await ns(t??"");F.store.themes.find(r=>r.id===e)?.css!==n&&sn(e,{css:n})}catch(n){rd.warn(`Failed to refresh theme "${o}"`,n)}}))}var ss=h({name:"Themes",description:"Applies Bloom++ themes and Quick CSS.",authors:["Bloom contributors"],tags:[],icon:"spark",required:!0,hidden:!0,startAt:"Init",settings:F,styles:()=>[...F.store.themes.filter(e=>e.enabled).map(e=>e.css),F.store.quickCssEnabled?F.store.quickCss:""].join(`
`),start(){sd()}});var K=L("bloom-settings-"),ld=3e3,ls=(e,t)=>{let o=s("textarea",{class:`bloom-input ${K("css")}`,attrs:{spellcheck:"false",placeholder:"Paste your CSS here...","aria-label":t}});return o.value=e,o},Er=(e,t)=>s("div",{class:K("section-header")},s("div",{class:K("field-label"),text:e}),s("div",{class:K("field-desc"),text:t}));function cs(){let{quickCss:e,quickCssEnabled:t}=F.store,o=ls(e,"Quick CSS");return o.disabled=!t,o.addEventListener("input",()=>{F.store.quickCss=o.value}),s("div",{class:K("section")},s("div",{class:K("field","field-inline")},Er("Quick CSS","Your own CSS, applied on every page as you type."),Fe(t,n=>{F.store.quickCssEnabled=n,o.disabled=!n},"Enable Quick CSS")),o)}function us(){let e=s("div",{class:K("section")}),t=null,o=()=>s("div",{class:K("section-error"),attrs:{role:"alert"}});function n(){let l=s("input",{class:"bloom-input",attrs:{type:"url",placeholder:"https://raw.githubusercontent.com/...","aria-label":"Theme URL"}}),u=o(),m=H("Add",async()=>{m.disabled=!0,u.textContent="";try{await is(l.value.trim()),d()}catch(g){u.textContent=g instanceof Error?g.message:String(g),m.disabled=!1}});return s("div",{class:K("section-block")},Er("Online themes","Load a theme from a .css URL. It is fetched again on every page load, so updates apply."),s("div",{class:K("section-row")},l,m),u)}function r(){let l=t==="new"?null:t,u=s("input",{class:"bloom-input",attrs:{placeholder:"My theme","aria-label":"Theme name"}});u.value=l?.name??"";let m=ls(l?.css??"","Theme CSS"),g=o();return s("div",{class:K("section-block")},u,m,g,s("div",{class:K("section-row")},H("Save",()=>{try{as(l?.id??null,u.value,m.value),t=null,d()}catch(T){g.textContent=T instanceof Error?T.message:String(T)}}),H("Cancel",()=>{t=null,d()})))}function i(){return s("div",{class:K("section-block")},s("div",{class:K("field","field-inline")},Er("Local themes","CSS stored only on this device."),!t&&H("New local theme",()=>{t="new",d()})),t&&r())}function a(l){let u,m=G("trash","Remove",()=>{if(u){clearTimeout(u),rs(l.id),d();return}m.setAttribute("aria-pressed","true"),m.setAttribute(de,"Click again to remove"),u=setTimeout(()=>{u=void 0,m.removeAttribute("aria-pressed"),m.setAttribute(de,"Remove")},ld)});return s("div",{class:K("theme")},s("div",{class:K("theme-text")},s("div",{class:`${K("card-name")} bloom-truncate`,text:l.name}),s("div",{class:`${K("field-desc")} bloom-truncate`,text:l.url??"Local"})),l.url?G("copy","Copy URL",()=>void Do(l.url??"")):G("edit","Edit",()=>{t=l,d()}),m,Fe(l.enabled,g=>sn(l.id,{enabled:g}),`Enable ${l.name}`))}function d(){let{themes:l}=F.store;e.replaceChildren(n(),i(),l.length?s("div",{class:K("themes")},...l.map(a)):s("div",{class:K("empty"),text:"No themes yet."}))}return d(),e}var cd=new x("SettingsPanel"),p=L("bloom-settings-"),ud=10080*60*1e3,dd=3e3,ds="Toggle features. Some need a reload. Click the sliders icon to configure.",md="Paused: can't find its place on this page.",pd=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],fd=[{id:"plugins",label:"Plugins"},{id:"themes",label:"Themes"},{id:"css",label:"Quick CSS"}],gd=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],hd={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},ps=new Set(["chat","ui","privacy"]),Y=null,so="plugins",st="all",Tr="all",ln="",Mr=[],fs=()=>[...W.values()].filter(e=>!e.hidden),bd=e=>!!e.updatedAt&&Date.now()-e.updatedAt<ud;function yd(e){switch(st){case"favorites":return Jo.has(e.name);case"recent":return bd(e);case"all":return!0;case"other":return!e.tags.some(t=>ps.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(st)}}function Ad(e){switch(Tr){case"all":return!0;case"enabled":return qe(e);case"disabled":return!qe(e)}}function vd(e){let t=ln.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function wd(e){let t=Vo.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return st==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var gs=e=>e.settings?.def??{},kr=e=>Object.values(gs(e)).some(t=>t.type!=="custom");function xd(e,t,o){let n=le(e.name,t)??lr(o),r=i=>{if(e.name==="Settings"&&!os(t,i))return!1;He(e.name,t,i)};switch(o.type){case"boolean":return Fe(n,r,o.description??t);case"slider":return an(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return wr(n,o.options,r);case"string":return ao(n,r,o.placeholder);case"number":return ao(String(n),i=>r(Number(i)),"","number");case"component":{let i=s("div",{class:p("component")});return Mr.push(o.render(i)),i}case"custom":return null}}var Sd=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function Br(e){if(!Y)return;let t=Object.entries(gs(e)).filter(([,i])=>i.type!=="custom").map(([i,a])=>{let d=xd(e,i,a),l=a.type==="boolean",u=a.type!=="component"&&s("div",{class:p("field-label"),text:Sd(i)}),m=a.description&&s("div",{class:p("field-desc"),text:a.description});return s("div",{class:p("field",l?"field-inline":"field-stacked")},(u||m)&&s("div",{class:p("field-text")},u,m),d)}),o,n=H("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},dd);return}clearTimeout(o),e.settings?.reset(),qt(),Br(e)},"danger"),r=s("div",{class:p("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&qt()}},s("div",{class:p("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},s("div",{class:p("popup-header")},s("div",{class:p("card-icon")},k(e.icon)),s("div",{class:p("popup-title")},s("div",{class:p("card-name"),text:e.name}),s("div",{class:p("popup-authors"),text:e.authors.join(", ")})),G("close","Close",qt)),s("p",{class:p("popup-desc"),text:e.description}),s("div",{class:p("fields")},...t),s("div",{class:p("popup-footer")},n)));Y.querySelector(`.${p("modal")}`)?.append(r)}function qt(){for(let e of Mr)e();Mr=[],Y?.querySelector(`.${p("popup-backdrop")}`)?.remove()}function ms(e){let t=qe(e),o=Jo.has(e.name),n=Vo.has(e.name),r=!!e.required,i=Ta(e.name);return s("div",{class:[p("card",t?"card-on":"card-off"),r?p("card-required"):""].filter(Boolean).join(" ")},s("div",{class:p("card-top")},s("div",{class:p("card-icon")},k(e.icon)),s("div",{class:p("card-actions")},G("star",o?"Unstar":"Star",()=>{Jo.toggle(e.name),at()},o),r?null:G("pin",n?"Unpin":"Pin to top",()=>{Vo.toggle(e.name),at()},n),r?s("span",{class:p("required-mark"),attrs:{"aria-label":"Required",[de]:"This plugin is required for Bloom++ to work"}},k("alert")):null,kr(e)&&G("gear","Settings",()=>Br(e)),Fe(t,a=>Pa(e,a),r?`${e.name} is required`:`Enable ${e.name}`,r))),s("div",{class:p("card-name")},e.name,Ea(e.name)&&s("span",{class:p("new-badge"),text:"New"})),s("div",{class:p("card-desc"),text:e.description,title:e.description}),i&&s("div",{class:p("card-issue"),attrs:{[de]:`Missing: ${i.join(", ")}`}},k("alert"),s("span",{text:md})),s("div",{class:p("card-footer"),text:e.authors.join(", ")}))}function hs(){let e=fs().some(o=>!o.tags.some(n=>ps.has(n)));Y?.querySelector(`.${p("tabs")}`)?.replaceChildren(...pd.filter(o=>o.id!=="other"||e).map(o=>s("button",{class:p("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===st)},on:{click:()=>{st=o.id,hs(),at()}}})))}function at(){if(!Y)return;let e=fs().filter(yd),t=Y.querySelector(`.${p("search")} input`);t&&(t.placeholder=`Search ${oa(e.length,"plugin")}...`);let o=wd(e.filter(u=>vd(u)&&Ad(u))),n=st==="all",r=n?o.filter(u=>!u.required):o,i=n?o.filter(u=>u.required):[],a=[...r.map(ms),...i.length?[s("div",{class:p("required-break"),attrs:{role:"separator"}}),...i.map(ms)]:[]],d=ln.trim()?"No plugins match your search.":hd[st]??"No plugins available.";Y.querySelector(`.${p("grid")}`)?.replaceChildren(...a.length?a:[s("div",{class:p("empty"),text:d})])}function qd(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),Y?.querySelector(`.${p("popup-backdrop")}`)?qt():Ke())}var bs,Cr;function Lr(){let e=Y?.querySelector(`.${p("body")}`);if(!Y||!e)return;for(let o of Y.querySelectorAll(`.${p("nav-item")}`))o.setAttribute("aria-selected",String(o.getAttribute("data-section")===so));if(qt(),so==="themes"){e.replaceChildren(us());return}if(so==="css"){e.replaceChildren(cs());return}let t=s("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});t.value=ln,t.addEventListener("input",()=>{ln=t.value,at()}),e.replaceChildren(s("div",{class:p("tabs"),attrs:{role:"tablist"}}),s("div",{class:p("toolbar")},s("label",{class:p("search")},k("search"),t),wr(Tr,gd,o=>{Tr=o,at()})),s("div",{class:p("grid")})),hs(),at(),t.focus()}function Et(e,t){e&&(so=e),Y?Lr():Ed();let o=t&&W.get(t);o&&Br(o)}function Ed(){Y=s("div",{class:`bloom-root ${p("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:e=>e.target===e.currentTarget&&Ke()}},s("div",{class:p("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},s("div",{class:p("header")},s("div",{class:p("logo")},k("bloom")),s("h2",{class:p("title"),text:"Bloom++"}),s("span",{class:p("hint"),attrs:{"aria-label":ds,tabindex:"0",[de]:ds}},k("info")),s("div",{class:p("nav"),attrs:{role:"tablist"}},...fd.map(e=>s("button",{class:p("nav-item"),text:e.label,attrs:{type:"button",role:"tab","data-section":e.id},on:{click:()=>{so=e.id,Lr()}}}))),s("span",{class:p("version"),text:"v2.0.97"}),G("close","Close",Ke)),s("div",{class:p("body")}))),Y.addEventListener("keydown",e=>e.stopPropagation()),Cr=new AbortController,document.addEventListener("keydown",qd,{capture:!0,signal:Cr.signal}),document.body.append(Y),Lr(),bs=Ha(at),cd.debug("Opened")}function Ke(){qt(),Cr?.abort(),bs?.(),Y?.remove(),Y=null}var Tt=()=>Y?Ke():Et(),ys=()=>!!Y;var As=new x("AppLandmarks"),Td={Settings:[c.rail],WiderChat:[":root"],StreamerMode:[c.sidebarScroll,c.rail],ComposerOpacity:[c.composer,c.composerInput],ResponseNotification:[c.composerInput],InputHistory:[c.composerInput],Continue:[c.composerInput],ChatListStatus:[c.sidebarScroll],StarChats:[c.turn],BetterNavigator:[c.timelineScroll,c.turn],BetterQuotes:[c.turn],MessageTimestamps:[c.turn],RecentTopics:[c.sidebarScroll]};function vs(){for(let[e,t]of Object.entries(Td)){let o=W.get(e);if(!o||o.required||!qe(o)){ur(e,null);continue}let n=t.some(r=>ce(r));if(ur(e,n?null:t),!n){if(!dr(o.name))continue;Ba(o),As.warn(`${e} paused; missing ${t.join(", ")}`);continue}dr(o.name)||(Ia(o),As.info(`${e} resumed`))}}function ws(){return vs(),M(()=>vs())}var $b=new x("Route"),Md=/\/c\/(?!local-)([\w-]+)/;var Cd=()=>location.pathname.match(Md)?.[1]??null;var _b=location.href,ey=Cd();var Ld=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,kd=/\S+@\S+\.\S+/,Bd=3;var Id=e=>!!e.closest(".sr-only");function Pd(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!y(t.textContent??"")&&!(t instanceof SVGElement))}var Od=e=>{if(/rounded-full/.test(e.getAttribute("class")??""))return!0;if(!e.clientWidth)return!1;let{borderRadius:t}=getComputedStyle(e);return t.includes("%")||Number.parseFloat(t)>=e.clientWidth/2};function cn(e,t,o){for(let n of e.querySelectorAll(`[${t}]`))n!==o&&n.removeAttribute(t);o&&!o.hasAttribute(t)&&o.setAttribute(t,"")}function Rd(e,t){if(y(e.textContent??"").length>Bd)return null;let o=e.closest("button");for(let n=e;n&&n!==t&&n!==o;n=n.parentElement)if(Od(n))return n;return null}function un(e,t){e.hasAttribute(`data-bloom-${t}`)||e.setAttribute(`data-bloom-${t}`,"");let o=e.querySelector("img:not([data-bloom] img)"),n=Pd(e),r=o?null:n.map(m=>Rd(m,e)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),a=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");cn(e,`data-bloom-${t}-avatar`,a);let d=n.filter(m=>!a?.contains(m)&&!Id(m)),l=d.find(m=>Ld.test(y(m.textContent??""))),u=d.find(m=>kd.test(m.textContent??""));cn(e,`data-bloom-${t}-plan`,l),cn(e,`data-bloom-${t}-email`,u),cn(e,`data-bloom-${t}-name`,d.find(m=>m!==l&&m!==u))}var xs=()=>Ne(c.rail).filter(fe);function Ss(e){return ce(c.profile,e)??[...e.querySelectorAll(c.menuButton)].findLast(fe)??null}function Hd(e,t){return[...e.children].find(n=>n instanceof HTMLElement&&n!==t&&n.contains(t))??t}function qs(){return xs().flatMap(e=>{let t=Ss(e);if(!t)return[{kind:"rail",anchor:e,insert:n=>e.append(n)}];let o=Hd(e,t);return[{kind:"rail",anchor:o,insert:n=>(o===t?e:o).append(n)}]})}var Ir=()=>xs().map(Ss).filter(e=>e!=null);function Dd(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function dn(){return Ir().map(Dd).find(e=>e!=null)??Ne('[role="menu"]').find(e=>!e.closest("[data-bloom]")&&/log ?out|sign out|退出/i.test(e.textContent??""))??null}var lo=e=>Ne(c.threadRow).filter(t=>t.getAttribute("data-app-action-sidebar-thread-id")===e);function co(e){let t=lo(e)[0]??Ne(c.threadRow).find(n=>{let r=n.getAttribute("data-app-action-sidebar-thread-id")??"";return r.endsWith(e)||e.endsWith(r.replace(/^local:/,""))});return(t?.getAttribute("data-app-action-sidebar-thread-title")??y(t?.textContent??""))||null}function Es(e){return null}var Pr=0,mn;function Nd(e){if(!U(e))return;for(let o of Ir())un(o,"profile");let t=dn();t&&un(t,"menu")}function ye(){Pr++;let e=!0;return Ue().then(()=>{e&&Pr&&!mn&&(mn=M(Nd))}),()=>{e&&(e=!1,!--Pr&&(mn?.(),mn=void 0))}}var Ts=`/*
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
    z-index: 30;
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
    z-index: 2147483000;
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

.bloom-settings-backdrop {
    position: fixed;
    inset: 0;
    z-index: 2147483000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: #0006;
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
    margin-inline-start: 1rem;
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
    gap: 0.75rem;
    min-height: 0;
}

.bloom-settings-section {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 1rem;
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
`;var $=L("bloom-entry-"),Fd=4,Rr="--bloom-entry-x",Hr=1,Ms=4,Cs=8,Kd=150,re=b({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar.",default:St.showSidebarEntry},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:St.showSidebarEntryOnHover},showAccountMenuEntry:{type:"boolean",description:"Show Bloom++ at the top of the account menu.",default:St.showAccountMenuEntry},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:e=>(e.append(H("Reset position",()=>{re.store.entryPosition=Hr})),()=>e.replaceChildren())},showBloomMenu:{type:"boolean",description:"Hovering the Bloom++ row in the account menu opens a menu with Plugins, Themes, Quick CSS and plugin settings.",default:!0},menuPlugins:{type:"component",description:"Plugins listed in that menu.",render:e=>(e.append(...Bs().map(t=>s("div",{class:$("menu-pick")},k(t.icon),s("span",{class:"bloom-truncate",text:t.name}),Fe(Is(t),o=>{re.store.menuPicks={...re.store.menuPicks,[t.name]:o}},`List ${t.name} in the menu`)))),()=>e.replaceChildren())},entryPosition:{type:"custom",default:Hr},menuPicks:{type:"custom",default:{}}}),lt=new Map,Ge=null,uo,Bs=()=>[...W.values()].filter(e=>!e.hidden).toSorted((e,t)=>e.name.localeCompare(t.name)),Is=e=>re.store.menuPicks[e.name]??kr(e),Ls=!1,Or=[];function Gd(e,t,o){let n=e.currentTarget,r=t.clientWidth-n.offsetWidth;if(e.button!==0||r<=0||!t.classList.contains($("hover")))return;let i=re.store.entryPosition,a=i,d=!1,l=new AbortController;n.setPointerCapture(e.pointerId),n.addEventListener("pointermove",m=>{!d&&Math.abs(m.clientX-e.clientX)<Fd||(d=!0,o(),a=te(i+(m.clientX-e.clientX)/r,0,Hr),t.style.setProperty(Rr,String(a)))},{signal:l.signal});let u=()=>{l.abort(),d&&(re.store.entryPosition=a,t.style.removeProperty(Rr))};n.addEventListener("pointerup",u,{signal:l.signal}),n.addEventListener("lostpointercapture",u,{signal:l.signal})}function Yd(e){let t=!1,o=s("button",{class:$("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),t||Tt(),t=!1},pointerdown:r=>{t=!1,e!=="rail"&&Gd(r,n,()=>{t=!0})}}},k("bloom"),e!=="rail"&&s("span",{class:$("label"),text:"Bloom++"})),n=s("div",{class:`bloom-root ${$("wrap")} ${$(e)}`,attrs:{"data-bloom":"entry"}},o);return n}function mo(){clearTimeout(uo),Ge?.remove(),Ge=null}function Ps(){clearTimeout(uo),uo=setTimeout(mo,Kd)}var Os=e=>e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0}));function jd(e,t){if(clearTimeout(uo),Ge?.isConnected||!re.store.showBloomMenu)return;let o=(l,u,m)=>s("div",{class:$("flyout-item"),attrs:{role:"menuitem"},on:{pointerdown:g=>{g.button===0&&(g.preventDefault(),g.stopPropagation(),mo(),Os(t),m())}}},k(u),s("span",{class:"bloom-truncate",text:l})),n=Bs().filter(Is);Ge=s("div",{class:`bloom-root ${$("flyout")}`,attrs:{"data-bloom":"menu-flyout",role:"menu","aria-label":"Bloom++"},on:{pointerenter:()=>clearTimeout(uo),pointerleave:Ps}},o("Plugins","bloom",()=>Et("plugins")),o("Themes","spark",()=>Et("themes")),o("Quick CSS","edit",()=>Et("css")),n.length>0&&s("div",{class:$("flyout-break"),attrs:{role:"separator"}}),...n.map(l=>o(l.name,l.icon,()=>Et("plugins",l.name)))),document.body.append(Ge);let r=t.getBoundingClientRect(),{width:i,height:a}=Ge.getBoundingClientRect(),d=r.right+Ms;Ge.style.left=`${d+i>innerWidth?r.left-i-Ms:d}px`,Ge.style.top=`${te(e.getBoundingClientRect().top,Cs,innerHeight-a-Cs)}px`}function Qd(e){let t=s("div",{class:`bloom-root ${$("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),mo(),Os(e),Tt()},pointerenter:()=>jd(t,e),pointerleave:Ps}},k("bloom"),s("span",{text:"Bloom++"}),re.store.showBloomMenu&&s("span",{class:$("menu-chevron")},k("chevron"))),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function ks(){mo();for(let e of document.querySelectorAll('[data-bloom="entry"], [data-bloom="menu-entry"]'))e.remove();lt.clear()}function Wd(){for(let e of document.querySelectorAll('[data-bloom="menu-entry"]'))e.remove()}function Rs(){let{showSidebarEntry:e,showSidebarEntryOnHover:t,showAccountMenuEntry:o}=re.store,n=e||t?qs():[],r=new Set(n.map(a=>a.anchor));for(let[a,d]of lt)a.isConnected&&r.has(a)||(d.remove(),lt.delete(a));for(let a of document.querySelectorAll('[data-bloom="entry"]'))[...lt.values()].includes(a)||a.remove();for(let a of n){let d=lt.get(a.anchor);if(d?.isConnected||!be(a.anchor))continue;let l=d??Yd(a.kind);lt.set(a.anchor,l),a.insert(l)}for(let a of lt.values())a.classList.toggle($("hover"),!e);if(!o){Wd();return}let i=dn();i&&!i.querySelector('[data-bloom="menu-entry"]')&&Qd(i),i||mo()}function zd(e){xr.some(qr)||(re.store[Sr(e??"")?e:"showSidebarEntry"]=!0),Rs()}var Hs=h({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:re,styles:()=>`${Ts}[data-app-navigation-rail] [data-bloom=entry]{position:absolute;inset:auto;left:50%;bottom:100%;transform:translateX(-50%);width:max-content;margin:0;padding-block:0.25rem;pointer-events:none;z-index:5;display:flex;justify-content:center}[data-app-navigation-rail]>[data-bloom=entry]{bottom:2.75rem}[data-app-navigation-rail] [data-bloom=entry] .bloom-entry-button{pointer-events:auto}[data-app-navigation-rail] [data-bloom=entry].bloom-entry-hover:not(:hover > *){display:none;transition:display 0s 0.2s allow-discrete}.${$("hover")}{${Rr}:${re.store.entryPosition}}`,start(){ks(),Or=[M(Rs),ts(),ye()],!Ls&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",Tt),Ls=!0)},stop(){for(let e of Or)e();Or=[],ks(),Ke()},onSettingsChange:zd});var Kr=new x("AppNetwork"),Ae=vt(),pn=new Map,Ds=new Map;var Vd=e=>e==="user"||e==="assistant";function Ns(e){let t=e.replace(/^local:/,"");return[...new Set([e,t,`local:${t}`])]}function Us(e){let t=Ns(e);for(let n of t){let r=pn.get(n);if(r)return r}let o={id:t[0]??e,title:null,chain:[],times:new Map};for(let n of t)pn.set(n,o);return o}function Te(e){if(!e)return null;_d(e);let t=Ns(e);return t.map(o=>pn.get(o)).find(o=>o&&(o.chain.length||o.title))??pn.get(t[0]??e)??null}function Nr(e,t,o,n=null){return{id:e,role:t,createTime:n,text:y(o),hasFiles:!1,imageCount:0}}function Ur(e,t){let o=e.chain.find(r=>r.id===t.id);if(o){t.text&&(o.text=t.text),t.createTime!=null&&(o.createTime=t.createTime);return}if(e.chain.find(r=>r.role===t.role&&r.text&&r.text===t.text)){!e.times.has(t.id)&&t.createTime!=null&&e.times.set(t.id,t.createTime);return}e.chain.push(t)}function Fs(e){let t=e.chain.map(o=>`${o.id}	${o.role}	${o.text}`).join(`
`);Ds.get(e.id)!==t&&(Ds.set(e.id,t),Ae.emit("conversation",e))}function Jd(e){if(typeof e=="function")try{return y(String(e()??""))}catch(t){return Kr.warn("Turn label failed",t),""}return typeof e=="string"?y(e):""}function Zd(e){if(typeof e!="function")return"";try{let t=e();return typeof t=="string"?y(t):C(t)&&typeof t.response=="string"?y(t.response):""}catch(t){return Kr.warn("Turn preview failed",t),""}}function Xd(e){let t=Object.keys(e).find(o=>o.startsWith("__reactFiber$")||o.startsWith("__reactInternalInstance$"));return t?e[t]??null:null}function Fr(e,t,o,n){if(!e||t>24)return;let r=(C(e.memoizedProps)?e.memoizedProps:null)??(C(e.pendingProps)?e.pendingProps:null);r&&(Array.isArray(r.items)&&C(r.items[0])&&typeof r.items[0].turnKey=="string"&&!o.length&&o.push(...r.items.filter(C)),Array.isArray(r.entries)&&C(r.entries[0])&&typeof(r.entries[0].historyEntityKey??r.entries[0].turnId)=="string"&&!n.length&&n.push(...r.entries.filter(C))),Fr(e.child??null,t+1,o,n),Fr(e.sibling??null,t,o,n)}function $d(e,t){let o=typeof t.turnId=="string"?t.turnId:"",n=typeof t.turnKey=="string"?t.turnKey:"";return e.find(r=>{let i=typeof r.turnKey=="string"?r.turnKey:"";return!!i&&(o===i||n.endsWith(i)||n.includes(i))})??null}function _d(e){let t=document.querySelector("[data-thread-find-target='conversation']")??document.querySelector(c.timelineScroll);if(!t)return;let o=[],n=[];try{Fr(Xd(t),0,o,n)}catch(d){Kr.warn("Fiber walk failed",d);return}if(!n.length&&!o.length)return;let r=n.length?n:o,i=typeof r[0]?.conversationId=="string"?r[0].conversationId:e,a=Us(i);a.title=co(e)??co(i)??a.title;for(let d of r){let l="";typeof d.turnId=="string"?l=d.turnId:typeof d.turnKey=="string"&&(l=d.turnKey.replace(/^.*turn:/,""));let u=typeof d.historyEntityKey=="string"?d.historyEntityKey:l?`turn:${l}`:"",m=$d(o,d),g=Jd(m?.getLabel??d.getLabel),T=Zd(m?.getPreview??d.getPreview),f=typeof d.timestampSeparatorAtMs=="number"?d.timestampSeparatorAtMs:null;u&&g&&(Ur(a,Nr(u,"user",g,f)),f&&a.times.set(u,f)),l&&T&&Ur(a,Nr(`${l}:assistant`,"assistant",T,f))}Fs(a)}function em(e){if(Vd(e.role))return e.role;let t=typeof e.type=="string"?e.type:typeof e.itemType=="string"?e.itemType:"";return/user/i.test(t)?"user":/agent|assistant/i.test(t)?"assistant":null}function tm(e){return typeof e.text=="string"?e.text:typeof e.content=="string"?e.content:C(e.content)&&typeof e.content.text=="string"?e.content.text:""}function Dr(e,t){if(!e||!C(t))return;let o=typeof t.id=="string"?t.id:typeof t.itemId=="string"?t.itemId:"",n=em(t),r=tm(t);if(!o||!n)return;let i=Us(e);Ur(i,Nr(o,n,r)),Fs(i)}function om(e){let t=e.params?.thread,o=e.params?.threadId??(C(t)&&typeof t.id=="string"?t.id:void 0);e.params?.item&&Dr(o,e.params.item);for(let n of e.params?.items??[])Dr(o,n);if(C(t)&&Array.isArray(t.items))for(let n of t.items)Dr(o,n)}no.on("note",om);var nm=["data-turn","data-message-author-role"],rm=/:(user|assistant)$/,Gr=`${c.messageUnit}, ${c.oldMessage}`,gn=e=>e==="user"||e==="assistant",js=()=>!!document.querySelector(c.timelineScroll),Qs=()=>!!ge(c.timelineScroll),Ws=()=>A()??document.querySelector(c.composerConversation)?.getAttribute("data-above-composer-conversation-id")??"",hn=()=>js()?ge(c.timelineScroll):document;function fo(){if(js())return ge(c.timelineScroll);let e=document.querySelector(c.turn);for(let t=e?.parentElement;t;t=t.parentElement){let{overflowY:o}=getComputedStyle(t);if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight)return t}return document.scrollingElement}var Ye=e=>{let t=e.getAttribute("data-chatgpt-search-unit-key")?.match(rm)?.[1];return gn(t)?t:e.matches(c.userBubble)?"user":e.matches(c.assistantReply)||e.matches(c.assistantMarkdown)?"assistant":null},zs=e=>{let t=[...e.querySelectorAll(c.searchUnit)].filter(n=>Ye(n)&&!n.parentElement?.closest(c.searchUnit));return t.length?t:[...e.querySelectorAll(`${c.userBubble}, ${c.assistantReply}`)].filter(n=>Ye(n)&&!n.parentElement?.closest(`${c.userBubble}, ${c.assistantReply}`))},Ks=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id")??e.getAttribute("data-response-annotation-target"))?.split(/\s+/).filter(Boolean)??[];function po(e){let t=Ks(e);if(t.length)return t;let o=[...new Set([...e.querySelectorAll(Gr)].flatMap(Ks))];if(o.length)return o;let n=e.closest("[data-turn-key]")?.getAttribute("data-turn-key")?.replace(/^history-content:/,"");return n&&Ye(e)==="user"?[n]:[]}function Mt(e=hn()){if(!e)return[];let t=zs(e);return t.length?t:[...e.querySelectorAll(Gr)].filter(o=>!o.parentElement?.closest(Gr))}function im(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function am(e){for(let t of nm){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(gn(o))return o}return e.querySelector(c.markdown)||e.querySelector(c.generatedImage)?"assistant":null}var sm=e=>!e.parentElement?.closest(c.turn);function je(){let e=Te(A())?.chain??[];return[...hn()?.querySelectorAll(c.turn)??[]].filter(sm).flatMap(o=>{let n=zs(o),r=n.length?n.map(i=>({el:i,known:Ye(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=u=>!n.some(m=>m.contains(u))&&y(u.textContent??""),a=[...o.querySelectorAll(c.assistantMarkdown)].find(u=>i(u)&&!fn.test(y(u.textContent??""))),d=[...o.querySelectorAll(c.activityHeader)].findLast(i),l=a??d;l&&r.push({el:l,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?po(o):Mt(o).flatMap(po),a=n??am(o)??im(i,e)??(r%2?"assistant":"user"),d=o.closest(c.turn)??o,l=!o.closest(c.searchUnit)&&!!d.querySelector(c.turnBusy),u=a==="assistant"&&(o.matches(c.turnBusy)||!!o.querySelector(c.turnBusy)||l);return{el:o,role:a,messageIds:i,streaming:u}})}var lm="[data-bloom], .sr-only",Vs=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,fn=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,Gs=new WeakMap;function Ct(e){let o=(e.el.closest(c.turn)??e.el).textContent?.length??0,n=Gs.get(e.el);if(n?.length===o)return n.summary;let r=cm(e);return Gs.set(e.el,{length:o,summary:r}),r}function Ys(e){let t=new Set,o=[];for(let n of e.querySelectorAll(c.assistantMarkdown)){if(n.closest(c.searchUnit))continue;let r=y(n.textContent??"");!r||fn.test(r)||Vs.test(r)||t.has(r)||(t.add(r),o.push(r))}return o}function cm(e){let t=e.el.querySelectorAll(c.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.closest(c.turn);if(e.role==="assistant"&&o&&e.el.matches(c.assistantMarkdown)&&!e.el.closest(c.searchUnit)){let l=Ys(o);if(l.length)return l.join(" \xB7 ")}let n=e.el.querySelector(e.role==="assistant"?`${c.markdown}, ${c.assistantMarkdown}`:".whitespace-pre-wrap")??e.el,i=[...n.querySelectorAll(lm)].map(l=>y(l.textContent??"")).filter(Boolean).reduce((l,u)=>l.replace(u,`
`),n.innerText||n.textContent||""),a=i.split(`
`).map(y).filter(l=>l&&!Vs.test(l)&&!fn.test(l));if(a.length)return a.join(" ");if(e.role==="assistant"&&o){let l=Ys(o);if(l.length)return l.join(" \xB7 ")}let d=i.split(`
`).map(y).filter(l=>fn.test(l));return d.length?d.at(-1)??"":e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function bn(e){return e.text?y(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var Yr=e=>e.matches(c.timelineScroll)&&getComputedStyle(e).flexDirection==="column-reverse";var um=80,dm=420;function jr(e,t,o){return(e.x-o.x)*(t.y-o.y)-(t.x-o.x)*(e.y-o.y)}function mm(e,t,o,n){let r=jr(e,t,o),i=jr(e,o,n),a=jr(e,n,t);return!((r<0||i<0||a<0)&&(r>0||i>0||a>0))}function pm(e,t){let o=(t.left+t.right)/2-(e.left+e.right)/2,n=(t.top+t.bottom)/2-(e.top+e.bottom)/2;if(Math.abs(o)>=Math.abs(n)){let i=o<0?t.right:t.left;return[{x:i,y:t.top},{x:i,y:t.bottom}]}let r=n<0?t.bottom:t.top;return[{x:t.left,y:r},{x:t.right,y:r}]}function Js(e,t){let o=te(e.x,t.left,t.right),n=te(e.y,t.top,t.bottom);return Math.hypot(e.x-o,e.y-n)}function yn(e){let t=e.closeDelay??um,o=e.towardDelay??dm,n=0,r=!1,i=null,a=null,d=()=>{document.removeEventListener("pointermove",f,!0)},l=()=>{n&&window.clearTimeout(n),n=0,d(),i=null,a=null},u=()=>{l(),r&&(r=!1,e.setHeld(!1))},m=()=>{r||(r=!0,e.setHeld(!0))},g=q=>{n&&window.clearTimeout(n),n=window.setTimeout(u,q)},T=q=>{let V=e.panel(),Xe=e.trigger();if(!V||!i)return!1;let J=V.getBoundingClientRect();if(J.width<=0&&J.height<=0)return!1;let Se=Xe?.getBoundingClientRect(),[ee,er]=Se&&(Se.width||Se.height)?pm(Se,J):[{x:J.left,y:J.top},{x:J.right,y:J.bottom}];return mm(q,i,ee,er)?!0:a!=null&&Js(q,J)<Js(a,J)-.25},f=q=>{let V={x:q.clientX,y:q.clientY};if(e.over(q.target)){l();return}T(V)?g(o):u(),a=V};return{enter(){l()},leave(q){if(e.over(q.relatedTarget)){l();return}i={x:q.clientX,y:q.clientY},a=i,m(),document.addEventListener("pointermove",f,!0),g(t)},dispose(){l(),r=!1}}}var Zs=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

.bloom-nav-root {
    position: fixed;
    z-index: 30;
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
`;var E=L("bloom-nav-"),wn=80,gm=1200,hm=2,Xs=3e4,bm=200,ym=.9,Am=.28,vm=24,Lt=8,wm=80,xm=12,Qr=80,tl=`${c.rightPanel}, ${c.summaryPanel}`,Sm={user:"\u2753",assistant:"\u{1F916}"},qm=["wheel","touchmove","pointerdown"],Sn=b({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),v=null,R=[],ie=-1,ct=-1,kt=null,ut="",zr=0,Vr=[],yo=null,An=null,vn=new Set,Me,go,Ce,Jr="",ho=[],xn=null,Zr=new Set,Em=e=>Sn.store.showAssistant||e.role==="user",Tm=e=>e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.messageIds[0]||e.role;function Mm(e){return{role:e.role,summary:Ct(e),ids:e.messageIds,turn:e,streaming:e.streaming}}function ol(e,t){let o=e.entries.at(-1);if(o?.role==="assistant"&&t.role==="assistant"){e.entries[e.entries.length-1]={...t,ids:[...new Set([...o.ids,...t.ids])]};return}e.entries.push(t)}function Cm(){let e=[];for(let t of je()){let o=Mm(t),n=Tm(t),r=e.at(-1);r?.key===n?ol(r,o):e.push({key:n,entries:[o]})}return e}function Lm(){let e=[];for(let t of Te(A())?.chain??[]){let o={role:t.role,summary:bn(t),ids:[t.id],turn:null,streaming:!1},n=e.at(-1);t.role==="assistant"&&n?ol(n,o):e.push({key:t.id,entries:[o]})}return e}var Bt=e=>e.entries.flatMap(t=>t.ids);function Xr(e,t){let o=new Set(Bt(e));return Bt(t).some(n=>o.has(n))}var dt=e=>y(e.entries.find(t=>t.role==="user")?.summary??""),Wr=(e,t)=>e.filter(o=>dt(o)===t).length,$r=e=>({...e,turn:null,streaming:!1});function km(e,t){let o=new Set(t.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return e.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return $r(r);let a=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return a&&a!==n.key?$r(r):r})}))}function Bm(e,t){let o=t.entries.map((n,r)=>{let i=e.entries[r];if(!i)return n;let a=[...new Set([...n.ids,...i.ids])];return{...n,ids:a,summary:n.summary||i.summary}});for(let n of e.entries.slice(o.length))o.push($r(n));return{key:e.key,entries:o}}function nl(){let e=fo();if(!e)return!1;let t=e.clientHeight-e.scrollHeight;return e.scrollTop-t<=Math.abs(e.scrollTop)}function Im(e,t){let o=km(e,t);if(!t.length)return o;if(!o.length)return t;let n=t.findIndex(l=>o.some(u=>u.key===l.key));if(n<0)return nl()?t.concat(o):o.concat(t);let r=t[n]?.key,i=o.findIndex(l=>l.key===r),a=o.slice(0,i).concat(t.slice(0,n),o.slice(i)),d=a.findIndex(l=>l.key===r);for(let l=n;l<t.length;l++){let u=t[l];if(!u)continue;let m=a.findIndex(g=>g.key===u.key);if(m>=0){let g=a[m];g&&(a[m]=Bm(g,u)),d=m}else a.splice(d+1,0,u),d++}return a}function Pm(e,t){let o=0,n=0,r=0;for(let i=1-e.length;i<t.length;i++){let a=0,d=0;for(let u=0;u<e.length;u++){let m=t[u+i],g=e[u];!m||!g||(Xr(g,m)?(a+=3,d++):dt(g)&&dt(g)===dt(m)&&a++)}let l=nl()?i<r:i>r;(a>o||a===o&&d>n||a===o&&d===n&&l)&&(o=a,n=d,r=i)}return{score:o,offset:r}}function Om(e,t){let o=e.entries.map((n,r)=>{let i=t.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of t.entries.slice(o.length))o.push({...n,turn:null});return{key:e.key,entries:o}}function Rm(e){return e.map(t=>({key:t.key,entries:t.entries.map(o=>({...o}))}))}function Hm(e,t){if(!t.length)return e;if(!e.length)return t;let{score:o,offset:n}=Pm(e,t),r=Rm(e);if(o>0)for(let d=0;d<r.length;d++){let l=t[d+n],u=r[d];if(!l||!u)continue;let m=dt(u),g=!!m&&m===dt(l)&&Wr(e,m)===1&&Wr(t,m)===1;(Xr(u,l)||g)&&(r[d]=Om(u,l))}let i=[],a=[];for(let d=0;d<t.length;d++){let l=t[d];if(!l)continue;let u=dt(l);!u||Wr(r,u)>0||r.some(m=>Xr(m,l))||(o>0&&d<n?i.push(l):a.push(l))}return i.concat(r,a)}var _r=e=>e.entries.some(t=>t.turn?.el.isConnected);function Dm(e,t,o){let n=e.findIndex(i=>Bt(i).includes(t));if(n>=0)return n+1;let r=e.find(_r);return o&&r&&Bt(r).includes(o)?0:e.length}function Nm(e){if(xn){let{parent:t,user:o}=xn;for(let n of e.slice(Dm(e,t,o))){let r=Bt(n);if(!_r(n)&&!(o&&r.includes(o)))for(let i of r)Zr.add(i)}}return e.filter(t=>_r(t)||!Bt(t).some(o=>Zr.has(o)))}function rl(){ho=[],xn=null,Zr.clear()}function Um(){let e=Ws();e!==Jr&&(Jr=e,rl());let t=Cm(),o=Lm();return!t.length&&!o.length&&!Qs()?(ho=[],[]):(ho=Nm(Hm(Im(ho,t),o)),ho.flatMap(n=>n.entries).filter(Em))}function Fm(e){for(let o of e)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!X().generating||e.some(o=>o.streaming))return;let t=e.at(-1);t&&(t.role==="assistant"||!Sn.store.showAssistant?t.streaming=!0:e.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function il(){let e=Um();return Fm(e),e}function al(e){let t=e.getBoundingClientRect(),o=ne()?.getBoundingClientRect().top,n=Math.min(t.bottom,o&&o>t.top?o:t.bottom);return{top:t.top,bottom:n}}function sl(e){return((e.matches(".whitespace-pre-wrap, .markdown, .prose, [data-markdown-text-style]")?e:e.querySelector(".whitespace-pre-wrap")??e.querySelector(".markdown, .prose, [data-markdown-text-style]"))??e).getBoundingClientRect().top}function $s(e){let t=R[e]?.turn?.el;return t?.isConnected?t:null}function Km(e){if(!R.length)return null;let t=e.scrollHeight-e.clientHeight,o=Yr(e),n=Math.min(e.scrollTop,0),r=o?-n:t-e.scrollTop,i=o?t+n:e.scrollTop,a=t<=Lt||r<=Lt,d=t>Lt&&i<=Lt,{top:l,bottom:u}=al(e),m=$s(0),g=m?sl(m):Number.NaN,T=!!m&&g>=l-Lt&&g<=l+48,f=$s(R.length-1),q=f?.getBoundingClientRect().bottom??Number.NaN,V=!!f&&q<=u+Lt&&q>=u-wm;return a||V?"bottom":d||T?"top":null}function Gm(e){let{top:t,bottom:o}=al(e),n=t+Math.max(o-t,0)*Am,r=[],i=-1;if(R.forEach((d,l)=>{let u=d.turn?.el;if(!u?.isConnected){r.push(Number.NaN);return}let m=sl(u);r.push(m),i<0&&(i=l),m<=n&&(i=l)}),i<0)return Math.max(R.findIndex(d=>d.turn),0);let a=r[ie];return Number.isFinite(a)?i===ie?ie:i>ie?i:a<=n+vm?ie:i:i}function Ym(e){let t=Km(e);return t==="bottom"?R.length-1:t==="top"?0:Gm(e)}function _s(e){Sn.store.jumpEffect==="border"&&(e.classList.add(E("flash")),setTimeout(()=>e.classList.remove(E("flash")),gm))}function qn(e){let t=R[e],o=fo();if(!t||!o)return;if(!t.turn&&!t.ids.length){ct=e,bo(),o.scrollTo({top:Yr(o)?0:o.scrollHeight});return}ct=e,kt=e?null:{chat:A(),first:t.ids[0],until:Date.now()+Xs},bo();let n=t.turn?.el;if(n?.isConnected){let u=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:u<o.clientHeight*hm?"smooth":"auto"}),_s(n);return}let r=R.findIndex(u=>u.turn),i=r>=0&&e<r?-1:1,a=++zr,d=Date.now()+Xs,l=()=>{let u=fo();if(a!==zr||Date.now()>d||!u)return;R=il();let m=R.find(T=>T.ids.some(f=>t.ids.includes(f)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),_s(m),ct=R.findIndex(T=>T.turn?.el===m),bo();return}let g=u.scrollTop;u.scrollBy({top:i*u.clientHeight*ym,behavior:"instant"}),u.scrollTop===g?setTimeout(l,bm):requestAnimationFrame(l)};l()}function jm(e,t){return s("button",{class:E("row"),attrs:{type:"button","data-index":String(t),"data-message-id":e.ids[0]??""},on:{click:()=>qn(t)}},s("span",{text:Sm[e.role]}),s("span",{class:"bloom-truncate",text:pe(e.summary||"\u2026",wn)}))}function Qm(e,t){let o=e.offsetWidth?t.width/e.offsetWidth:1;return t.left+(e.clientLeft+e.clientWidth)*o}function Wm(e){let t=1/0;for(let o of document.querySelectorAll(tl)){if(!fe(o))continue;let n=o.getBoundingClientRect();n.width<Qr||n.height<Qr||n.left<e.left+Qr||n.left<t&&(t=n.left)}return Number.isFinite(t)?t:null}function el(e){if(!v)return;let t=e.getBoundingClientRect(),o=ne()?.getBoundingClientRect().top,r=Math.min(t.bottom,o&&o>t.top?o:t.bottom)-t.top,i=Math.min(Qm(e,t),Wm(t)??1/0);v.style.right=`${document.documentElement.clientWidth-i+xm}px`,v.style.top=`${t.top}px`,v.style.height=r>1?`${r}px`:""}function zm(){let e=fo();if(R=il(),!R.length||!e){Ce?.dispose(),Ce=void 0,v?.remove(),v=null,ut="";return}if(yo!==e){go?.abort(),go=new AbortController,e.addEventListener("scroll",Oe(bo),{passive:!0,signal:go.signal});for(let n of qm)e.addEventListener(n,cl,{passive:!0,signal:go.signal});yo=e,Me?.disconnect(),Me=new ResizeObserver(()=>{e.isConnected&&el(e)}),Me.observe(e),An=null,vn=new Set}let t=ne();if(t&&t!==An&&Me&&(Me.observe(t),An=t),Me)for(let n of document.querySelectorAll(tl))vn.has(n)||(Me.observe(n),vn.add(n));Xm(),el(e);let o=JSON.stringify(R.map(n=>[n.role,n.ids]));o!==ut?(ut=o,ct=-1,Jm(),kt&&Date.now()<kt.until&&kt.chat===A()&&R[0]?.ids[0]!==kt.first&&qn(0)):Vm(),bo()}function bo(){if(!v||!yo)return;ie=ct>=0?ct:Ym(yo),v.querySelectorAll(`.${E("tick")}`).forEach((t,o)=>t.classList.toggle(E("tick-current"),o===ie)),v.querySelectorAll(`.${E("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===ie)));let e=v.querySelector(`.${E("toc-head")}`);e&&(e.textContent=`${ie+1} / ${R.length}`)}function Vm(){v?.querySelectorAll(`.${E("tick")}`).forEach((e,t)=>{let o=R[t],n=pe(o.summary,wn);e.title!==n&&(e.title=n),e.classList.toggle(E("tick-streaming"),o.streaming)}),v?.querySelectorAll(`.${E("row")}`).forEach(e=>{let t=e.lastElementChild,o=pe(R[Number(e.dataset.index)].summary||"\u2026",wn);t&&t.textContent!==o&&(t.textContent=o)})}function Jm(){v?.querySelector(`.${E("rail")}`)?.replaceChildren(...R.map((t,o)=>s("button",{class:Ko(E("tick"),E(`tick-${t.role}`),t.streaming&&E("tick-streaming"),o===ie&&E("tick-current")),title:pe(t.summary,wn),attrs:{type:"button","aria-label":`Jump to message ${o+1}`,"data-message-id":t.ids[0]??""},on:{click:()=>qn(o)}}))),v?.querySelector(`.${E("toc-list")}`)?.replaceChildren(...R.map(jm))}var ve=Oe(zm);function ei(e){if(e===v)return;let t=e.__bloomNavStop;if(t&&t!==ti)try{t()}catch{}e.isConnected&&e!==v&&e.remove()}function ll(){let e=[...document.querySelectorAll('[data-bloom="navigator"]')];if(v&&!v.isConnected&&(v=null),v&&e.includes(v)){for(let t of e)ei(t);return}v=e[0]??null;for(let t of e.slice(1))ei(t)}function Zm(){Ce?.dispose(),Ce=yn({over:e=>e instanceof Node&&!!v?.contains(e),trigger:()=>v?.querySelector(`.${E("rail")}`),panel:()=>v?.querySelector(`.${E("toc")}`),setHeld:e=>v?.classList.toggle(E("open"),e)})}function Xm(){ll(),v&&!v.querySelector(`.${E("rail")}`)&&(v.remove(),v=null,ut=""),v||(v=s("div",{class:`bloom-root ${E("root")}`,attrs:{"data-bloom":"navigator"},on:{pointerenter:()=>Ce?.enter(),pointerleave:e=>Ce?.leave(e)}},s("div",{class:E("rail")}),s("div",{class:E("bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:E("toc")},s("div",{class:E("toc-head")}),s("div",{class:E("toc-list")}))),ut=""),Ce||Zm(),v.isConnected||document.body.append(v),v.querySelector(`.${E("tick")}`)||(ut=""),v.__bloomNavStop=ti}function cl(){ct=-1,kt=null,zr++}function ti(){for(let e of Vr)e();Vr=[],go?.abort(),Me?.disconnect(),Me=void 0,yo=null,An=null,vn=new Set,removeEventListener("keydown",ul,!0),removeEventListener("resize",ve),Ce?.dispose(),Ce=void 0,v&&delete v.__bloomNavStop,v?.remove(),v=null,ut="",rl(),Jr="";for(let e of document.querySelectorAll('[data-bloom="navigator"]'))ei(e)}var $m=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function ul(e){if(!v||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||$m(document.activeElement)||ge("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:ie-1,ArrowDown:ie+1,Home:0,End:R.length-1}[e.key];if(o==null){cl();return}o<0||o>=R.length||(e.preventDefault(),e.stopPropagation(),qn(o))}var dl=h({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:Sn,styles:Zs,start(){ll(),Vr=[M(e=>U(e)&&ve()),he(ve),Ae.on("conversation",ve),Ae.on("generate-start",({parentId:e,userId:t})=>{e&&(xn={parent:e,user:t},ve())}),O.on("rise",ve),O.on("fall",ve)],addEventListener("keydown",ul,!0),addEventListener("resize",ve,{passive:!0}),ve()},stop:ti,onSettingsChange:ve});var ml=`/*
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
    z-index: 30;
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
    z-index: 30;
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
`;var Z=L("bloom-quotes-"),ui="BloomBetterQuotes",ep=40,hl=8,tp=1800,ii=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,pl=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,mt=b({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),oi,ni,It,ri=!1,ai=0,En=null,Tn=null,Le=null;function di(){return A()??"draft"}function Cn(){try{let e=JSON.parse(sessionStorage.getItem(ui)??"[]");return Array.isArray(e)?e.filter(t=>!!t&&typeof t=="object"&&typeof t.id=="string"&&typeof t.text=="string"&&!!t.text):[]}catch{return[]}}function mi(e){try{sessionStorage.setItem(ui,JSON.stringify(e.slice(-ep)))}catch{}}function Ao(e){return Cn().find(t=>t.id===e)?.text??""}function op(e,t){let o=Cn().filter(n=>n.id!==e);o.push({id:e,text:t}),mi(o)}function si(e=di()){mi(Cn().filter(t=>t.id!==e)),Mn()}function np(e){let t=Ao("draft");if(!t||Ao(e))return;let o=Cn().filter(n=>n.id!=="draft");o.push({id:e,text:t}),mi(o)}function li(e){return`${e.getAttribute("aria-label")??""} ${e.getAttribute("title")??""}`}function rp(e){let t=li(e);return pl.test(t)&&!/quote|引用/.test(t)?!1:/quote|引用/.test(t)&&ii.test(t)?!0:ii.test(t)&&!pl.test(t)}function bl(e){let t=e.cloneNode(!0),o=[...t.querySelectorAll("button, [role='button']")],n=new Set(o.map(r=>r.getAttribute("aria-label")).filter(Boolean));for(let r of o)r.remove();for(let r of t.querySelectorAll("*"))!r.children.length&&n.has(y(r.textContent??""))&&r.remove();return y(t.textContent??"")}function ip(e){let t=ne(),o=e.parentElement,n=0;for(;o&&o!==t&&n<5;){if(n++,o.matches(c.composerInput)||o.querySelector(c.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=bl(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function Ln(){let e=ne();if(!e)return null;for(let t of e.querySelectorAll("button, [role='button']")){if(t.closest("[data-bloom]")||!rp(t))continue;let o=ip(t),n=o?bl(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:t}}return null}function ap(e){let t=e.closest(c.searchUnit)??e.closest(c.oldMessage);return t&&(Ye(t)??t.getAttribute("data-message-author-role"))==="user"?t:null}function pi(e){return y(e).slice(0,48)}function sp(e,t){let o=pi(e);if(o.length<hl)return null;let n=null;for(let r of Mt()){if(t&&(r===t||t.contains(r)||r.contains(t)))continue;let i=y(r.textContent??"");if(!i.includes(o))continue;let a=o.length/Math.max(i.length,1);(!n||a>n.score)&&(n={el:r,score:a})}return n?.el??null}function lp(e,t){let o=pi(t),n=e;for(let r of e.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&y(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${Z("hit")}`)?.classList.remove(Z("hit")),n.classList.add(Z("hit")),window.clearTimeout(ai),ai=window.setTimeout(()=>n.classList.remove(Z("hit")),tp)}function fl(e){let t=e.closest(c.timelineScroll)??document.scrollingElement;if(!(t instanceof HTMLElement)&&t!==document.scrollingElement)return;let o=e.getBoundingClientRect();if(o.height<1||!t)return;let n=t.getBoundingClientRect(),r=ne()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,a=o.top+o.height/2-(n.top+i)/2;Math.abs(a)<8||t.scrollTo({top:t.scrollTop+a,behavior:"smooth"})}function fi(){if(!Le||!En?.isConnected)return;let e=En.getBoundingClientRect();e.width<1||(Le.style.top=`${Math.max(8,e.top+8)}px`,Le.style.left=`${Math.max(8,e.right-Le.offsetWidth-8)}px`)}function cp(e,t,o){En=e,Tn=t,Le??=s("button",{class:`bloom-root ${Z("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),Le.isConnected||document.body.append(Le),lp(e,o),fi()}function gl(){Le?.remove(),Le=null,En=null,Tn=null,document.querySelector(`.${Z("hit")}`)?.classList.remove(Z("hit"))}function yl(){return document.querySelector('[data-bloom="quote-chip"]')}function Mn(){yl()?.remove()}function up(e){let o=ne()?.getBoundingClientRect();!o||o.width<8||(e.style.width=`${Math.max(120,o.width-24)}px`,e.style.left=`${o.left+12}px`,e.style.top=`${Math.max(8,o.top-e.offsetHeight-8)}px`)}function dp(e){let t=yl();t||(t=s("div",{class:`bloom-root ${Z("chip")}`,attrs:{"data-bloom":"quote-chip"}},s("span",{class:Z("text")}),s("button",{class:Z("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(t));let o=t.querySelector(`.${Z("text")}`),n=y(e);o&&o.textContent!==n&&(o.textContent=n),t.dataset.text=e,up(t)}function ci(){if(!ri){ri=!0;try{let e=di(),t=Ln();mt.store.persistAcrossChats&&t&&Ao(e)!==t.text&&op(e,t.text);let o=mt.store.persistAcrossChats?Ao(e):"";!o||t&&y(t.text)===y(o)?Mn():dp(o),fi()}finally{ri=!1}}}function mp(e){let t=e.closest('[data-bloom="quote-chip"]');if(t instanceof HTMLElement&&!e.closest(`.${Z("x")}`)){let i=t.dataset.text??t.querySelector(`.${Z("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:t}:null}let o=e.closest("blockquote");if(o instanceof HTMLElement&&!e.closest("a, button")){let i=ap(o),a=y(o.textContent??"");if(i&&a)return{text:a,skip:i,origin:o}}let n=ne();if(!n||!n.contains(e)||oo(e)||e.closest("button, [role='button']"))return null;let r=Ln();return!r||!r.row.contains(e)?null:{text:r.text,skip:null,origin:r.row}}function pp(e){let{target:t}=e;if(!(t instanceof Element))return;if(t.closest('[data-bloom="quote-back"]')){e.preventDefault(),e.stopPropagation(),Tn?.isConnected&&fl(Tn);return}if(t.closest(`.${Z("x")}`)){e.preventDefault(),e.stopPropagation(),si();return}let o=Ln();if(o&&(t===o.dismiss||o.dismiss.contains(t))){si();return}if(fp(t)&&Al(),!mt.store.jumpToPassage)return;let n=mp(t);if(!n)return;let r=sp(n.text,n.skip);r&&(e.preventDefault(),e.stopPropagation(),cp(r,n.origin,n.text),fl(r))}function fp(e){let t=e.closest("button, [role='button']");return!(t instanceof HTMLElement)||t.closest("[data-bloom]")||!ne()?.contains(t)?!1:/send|submit|发送|提交/i.test(li(t))&&!ii.test(li(t))}function gp(e){return!(e instanceof KeyboardEvent)||e.key!=="Enter"||e.shiftKey||e.isComposing?!1:oo(e.target)}function Al(){if(!mt.store.persistAcrossChats)return;let e=di(),t=Ao(e);if(t){if(!Ln()){let o=Q(),n=pi(t);n.length>=hl&&!y(o).includes(n)&&Ee(`> ${t}

${o}`.trim())}si(e)}}function hp(e){gp(e)&&Al()}function bp(e){!e.prevId&&e.id&&np(e.id),ci()}var vl=h({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:mt,styles:ml,onSettingsChange(e){e==="jumpToPassage"&&!mt.store.jumpToPassage&&gl(),e==="persistAcrossChats"&&!mt.store.persistAcrossChats&&(sessionStorage.removeItem(ui),Mn()),ci()},start(){It=new AbortController,document.addEventListener("pointerdown",pp,{capture:!0,signal:It.signal}),document.addEventListener("keydown",hp,{capture:!0,signal:It.signal}),addEventListener("scroll",fi,{capture:!0,passive:!0,signal:It.signal}),ni=he(bp),oi=M(e=>U(e)&&ci())},stop(){It?.abort(),It=void 0,ni?.(),ni=void 0,oi?.(),oi=void 0,window.clearTimeout(ai),gl(),Mn()}});var wl=`/*
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
`;var Ap="[data-app-action-sidebar-thread-row]{position:relative}[data-app-action-sidebar-thread-row]>[data-bloom=cls]{position:absolute;inset-inline-end:0.25rem;top:50%;width:0.875rem;height:0.875rem;margin:0;transform:translateY(-50%);pointer-events:none}",vp=L("bloom-cls"),wp="bloom-cls",xp=600*1e3,hi=Vt("tab"),Ot=new Map,vo=new Map,Pt=null,xl=[],Sp=e=>e==="streaming"||e==="error";function qp(){let e=new Map,t=Date.now();for(let[o,n]of vo)t-n.at>xp?vo.delete(o):e.set(o,n.status);for(let[o,n]of Ot)e.set(o,n);return e}function Ep(e){return s("span",{class:`bloom-root ${vp("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&k("alert"))}function Bn(){let e=qp(),t=new Set;for(let[o,n]of e)for(let r of lo(o)){if(!be(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let a=Ep(n);t.add(a),r.append(a)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function kn(e,t){e&&(t?Ot.set(e,t):Ot.delete(e),Pt?.postMessage({tab:hi,id:e,status:t}),Bn())}function Tp({data:e}){!C(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===hi||(Sp(e.status)?vo.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):vo.delete(e.id),Bn())}function gi(){for(let e of Ot.keys())Pt?.postMessage({tab:hi,id:e,status:null})}var Sl=h({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:()=>`${wl}${Ap}`,start(){for(let e of document.querySelectorAll('[data-bloom="cls"]'))e.remove();Pt=typeof BroadcastChannel=="function"?new BroadcastChannel(wp):null,Pt?.addEventListener("message",Tp),addEventListener("pagehide",gi),xl=[O.on("rise",({conversationId:e})=>kn(e,"streaming")),O.on("fall",({conversationId:e,outcome:t})=>kn(e,t==="error"?"error":null)),O.on("context",({prevId:e,id:t,migrated:o})=>{o&&X().generating?kn(t,"streaming"):!o&&Ot.get(e??"")==="streaming"&&kn(e,null)}),M(e=>U(e)&&Bn())],A()&&Bn()},stop(){for(let e of xl)e();gi(),Pt?.close(),Pt=null,removeEventListener("pagehide",gi),Ot.clear(),vo.clear();for(let e of document.querySelectorAll('[data-bloom="cls"]'))e.remove()}});var Qe="data-bloom-invite",Mp=/^(?:invite team members|invite members|邀请团队成员|邀请成员)$/i,ql=':is(button, a:not([href^="/c/"])):not(main *, [role="dialog"] *)',Cp={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${c.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])'],hideInvite:[`[${Qe}]`,`div:has(> [${Qe}]:only-child)`]},El=b({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0},hideInvite:{type:"boolean",description:"Hide Invite team members in the sidebar.",default:!0}}),In,bi=!1;function Lp(e){if(U(e))for(let t of document.querySelectorAll(`${ql}, [${Qe}]`))!t.matches(ql)||!Mp.test(y(t.textContent??""))?t.removeAttribute(Qe):t.hasAttribute(Qe)||t.setAttribute(Qe,"")}var Tl=h({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads, notices and Invite team members.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:El,styles:()=>Pe(Object.entries(Cp).flatMap(([e,t])=>El.store[e]?t:[])),start(){bi=!0,Ue().then(()=>{bi&&!In&&(In=M(Lp))})},stop(){bi=!1,In?.(),In=void 0;for(let e of document.querySelectorAll(`[${Qe}]`))e.removeAttribute(Qe)}});var Rt=`form:has(:is(${c.composerInput})), ${c.oldComposerForm}`,Pn='[class*="ComposerLayoutBody"]',Ai='[class*="ComposerLayoutRoot"]',kp='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',Bp=`:is(${Rt}) ${Pn}, :is(${Rt}):not(:has(${Pn})) ${Ai}, :is(${Rt}):not(:has(${Pn})):not(:has(${Ai})) :is(${kp})`,Ip='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',Pp='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',Op="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))",Rp="var(--color-background-composer-surface, var(--composer-background-color, var(--color-bg-primary, Canvas)))",Hp="composer-fill",Ml=b({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function Dp(){let{opacity:e,blur:t}=Ml.store;if(e>=100)return"";{let i=`color-mix(in srgb, ${Rp} ${e}%, transparent)`;return`[class*="ComposerLayoutRoot"], [data-composer-layout], [data-chatgpt-composer]{--composer-layout-surface-background:${i}!important;--composer-background-color:${i}!important;--composer-layout-surface-backdrop-filter:blur(${t}px)!important}`}let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${Op} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important;-webkit-backdrop-filter:blur(${t}px)!important`;return`:is(${Ip}), :is(${Rt}){${o}}:is(${Pp}){display:none!important}${Bp}{${n}}:is(${Rt}):has(${Pn}) ${Ai}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${Rt}) :is(${c.composerInput}){background-color:transparent!important}`}function yi(){for(let e of document.querySelectorAll(`[data-bloom="${Hp}"]`))e.remove()}var Cl=h({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:Ml,styles:Dp,start(){yi()},stop(){yi()},onSettingsChange(){yi()}});var Np=1200,Up=8e3,Fp=150,Kp=20,Ll=6,xi="continue where you left",Gp=/message delivery timed out|please try again/i,kl=/waiting for the complete answer/i,Bl=b({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:xi,placeholder:xi}}),vi=[],Rn=0,wo=!1,xo=0,Dt="",On="",Si=0,Nt=!1,So=!1,Hn=!0,Ht="",qi=0,Dn=!1,Yp=()=>Bl.store.prompt.trim()||xi;function Il(){return(ge(c.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function Pl(){let e=Il();return!e||kl.test(e)||!Gp.test(e)?"":e}function jp(){let e=Il();return e&&kl.test(e)?e:""}function Qp(){let e=hn()?.querySelectorAll(c.turn),t=e?.[e.length-1];return`${t?.getAttribute("data-turn-key")??""}:${t?.textContent?.length??0}`}function Ol(e,t,o){if(o===Rn){if(X().generating||Q()!==e||t>=Kp){Nt=!1,X().generating||(Dt="");return}Qa(),setTimeout(()=>Ol(e,t+1,o),Fp)}}function Wp(e){let t=Rn;if(X().generating||Q()&&Q()!==e){Nt=!1,Dt="";return}Ee(e),Dn=!0,nr(()=>{t===Rn&&Ol(e,0,t)})}function Rl(e){return e===Dt||xo>=Ll||X().generating||Q()?!1:(Dt=e,xo+=1,Nt=!0,Wp(Yp()),!0)}function zp(){if(wo||Nt||So)return;let e=Date.now(),t=Pl();if(t){if(Ht="",t!==On){On=t,Si=e;return}if(e-Si<Np)return;Rl(`${A()??""}:${t}`);return}if(On="",!jp()){Hn=!0,Ht="";return}if(!Hn||!X().generating||Q())return;let n=`${A()??""}:${Qp()}`;if(n!==Ht){Ht=n,qi=e;return}if(e-qi<Up||xo>=Ll)return;let r=pr();r&&(So=!0,r.click())}function wi(){Rn+=1,wo=!1,xo=0,Dt="",On="",Si=0,Nt=!1,So=!1,Hn=!0,Ht="",qi=0,Dn=!1}var Hl=h({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:Bl,start(){wi(),vi=[O.on("rise",()=>{wo=!1,Dt="",Nt=!1,Dn&&(Dn=!1,Hn=!1,Ht="")}),O.on("fall",({outcome:e})=>{if(So){So=!1,e==="left"?wo=!0:Rl(`${A()??""}:stall`);return}(e==="stopped"||e==="left")&&(wo=!0),e==="done"&&!Pl()&&(xo=0)}),O.on("context",({migrated:e})=>{e||wi()}),O.on("tick",zp)]},stop(){for(let e of vi)e();vi=[],wi()}});var ke=L("bloom-csi-"),Vp=256,Jp=160,Nn=1,Dl=4,Zp=.1,Xp=.0015,$p=250;function _p(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function ef(e){return new Promise((t,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function tf(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:te(t.x,n,1-n),y:te(t.y,r,1-r)}}function Nl(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function of(e,t){let o=s("canvas");return o.width=o.height=Vp,Nl(o,e,t),o.toDataURL("image/png")}function Ul(e){let t=null,o={x:j.store.cropX,y:j.store.cropY,zoom:j.store.cropZoom},n,r=s("canvas",{class:ke("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=Jp*devicePixelRatio;let i=s("div",{class:`bloom-muted ${ke("status")}`}),a=s("div",{class:ke("zoom")}),d=s("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(f,q=!0){t&&(o=tf(t,f),Nl(r,t,o),q&&(clearTimeout(n),n=setTimeout(()=>{t&&(j.store.cropX=o.x,j.store.cropY=o.y,j.store.cropZoom=o.zoom,j.store.avatarUrl=of(t,o))},$p)))}function u(){a.replaceChildren(an(o.zoom,Nn,Dl,Zp,"\xD7",f=>l({...o,zoom:f})))}async function m(f,q){i.textContent="";try{t=await ef(f),q&&(j.store.avatarSource=f,o={x:.5,y:.5,zoom:Nn}),e.classList.add(ke("has-image")),u(),l(o,q)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let g=f=>{f?.type.startsWith("image/")&&_p(f).then(q=>m(q,!0))};d.addEventListener("change",()=>g(d.files?.[0])),r.addEventListener("wheel",f=>{t&&(f.preventDefault(),l({...o,zoom:te(o.zoom*(1-f.deltaY*Xp),Nn,Dl)}),u())},{passive:!1}),r.addEventListener("pointerdown",f=>{if(!t)return;r.setPointerCapture(f.pointerId);let q={...o},V=r.getBoundingClientRect(),Xe=J=>{if(!t)return;let Se=Math.max(V.width/t.naturalWidth,V.height/t.naturalHeight)*o.zoom;l({...o,x:q.x-(J.clientX-f.clientX)/(t.naturalWidth*Se),y:q.y-(J.clientY-f.clientY)/(t.naturalHeight*Se)})};r.addEventListener("pointermove",Xe),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",Xe),{once:!0})});let T=s("div",{class:ke("cropper"),attrs:{tabindex:"0"},on:{paste:f=>g([...f.clipboardData?.files??[]].find(q=>q.type.startsWith("image/"))),dragover:f=>f.preventDefault(),drop:f=>{f.preventDefault(),g(f.dataTransfer?.files[0])}}},s("div",{class:ke("stage")},r),s("div",{class:ke("controls")},ao("",f=>f.trim()&&void m(f.trim(),!0),"https://\u2026 or data:image/\u2026","url"),s("div",{class:ke("buttons")},H("Choose file",()=>d.click()),H("Reset crop",()=>{l({x:.5,y:.5,zoom:Nn}),u()}),H("Clear",()=>{t=null,e.classList.remove(ke("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),a.replaceChildren(),j.store.avatarUrl="",j.store.avatarSource=""},"danger")),a,i,d));return e.append(T),j.store.avatarSource&&m(j.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var Fl=`/*
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
`;var qo="data-bloom-csi-avatar",Ei="data-bloom-csi-sized",jl="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",rf=32,j=b({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>Ul(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),Kl=[];function Ql(e){e.removeAttribute(qo),e.removeAttribute(Ei)}function Gl(e){return(j.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function Yl(e=[]){if(!U(e))return;let t=j.store.displayName.trim()||null,o=!!j.store.avatarUrl,n=new Set(t?Gl("name"):[]);for(let i of document.querySelectorAll(jl))n.has(i)||_e(i,null);for(let i of n)_e(i,t);let r=new Set(o?Gl("avatar"):[]);for(let i of document.querySelectorAll(`[${qo}]`))r.has(i)||Ql(i);for(let i of r)i.hasAttribute(qo)||i.setAttribute(qo,""),i.toggleAttribute(Ei,!i.closest('[role="menu"]'))}function af(){let e=j.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${j.store.avatarSize}px}:is(${c.rail}, ${c.oldRail}) [${Ei}]{--bloom-csi-size:${rf}px}`:""}var Wl=h({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:j,styles:()=>`${af()}
${Fl}`,start(){Kl=[ye(),M(Yl)]},stop(){for(let e of Kl)e();for(let e of document.querySelectorAll(`[${qo}]`))Ql(e);for(let e of document.querySelectorAll(jl))_e(e,null)},onSettingsChange(){Yl()}});var Ut=L("bloom-greeting-"),zl=30,Vl=100;function Jl(e){let t=-1,o=s("textarea",{class:`bloom-input ${Ut("input")}`,attrs:{maxlength:String(Vl),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=H("Add",i),r=s("div",{class:Ut("list")});function i(){let l=o.value.trim().slice(0,Vl);if(!l)return;let u=[...B.store.greetings];t>=0?u[t]=l:u.length<zl&&u.push(l),B.store.greetings=u,t=-1,o.value="",a()}function a(){let{greetings:l}=B.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&l.length>=zl,r.replaceChildren(...l.length?l.map((u,m)=>s("div",{class:Ut("row",m===t?"row-editing":"row-idle")},s("div",{class:Ut("text"),text:u}),G("edit","Edit",()=>{t=m,o.value=u,o.focus(),a()}),G("trash","Delete",()=>{B.store.greetings=l.filter((g,T)=>T!==m),t===m&&(t=-1),a()}))):[s("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),e.append(s("div",{class:Ut("editor")},r,s("div",{class:Ut("form")},o,n))),a();let d=At((l,u)=>l==="GreetingCustomizer"&&u==="greetings"&&a());return()=>{d(),e.replaceChildren()}}var Zl=`/*
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
`;var Fn="data-bloom-greeting",lf=1e3,cf=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],B=b({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>Jl(e)},greetings:{type:"custom",default:cf},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),Un,Xl=[],Ti,Co=()=>rn()&&!et(),uf=e=>e.replaceAll(/\s*\n\s*/g," ").trim(),_l=()=>B.store.greetings.filter(e=>typeof e=="string"&&e.trim());function Lo(){let e=_l();if(e.length)if(B.store.order==="random"&&e.length>1){let t=B.store.lastRandom;for(;t===B.store.lastRandom;)t=Math.floor(Math.random()*e.length);B.store.lastRandom=t,B.store.index=t}else B.store.index=(B.store.index+1)%e.length}function df(){return Co()?ge(c.homeHeading):null}function Eo(){for(let e of document.querySelectorAll(`[${Fn}]`))e.removeAttribute(Fn),_e(e,null)}function To(){for(let e of document.querySelectorAll("[data-bloom-placeholder]"))e.removeAttribute("data-bloom-placeholder")}function $l(e){let t=ue(),o=uf(e);if(!t||!o||Q(t)){To();return}t.getAttribute("data-bloom-placeholder")!==o&&t.setAttribute("data-bloom-placeholder",o)}function Mo(){let e=_l(),t=Va(),o=Co();if(!e.length||!t&&!o){Eo(),To();return}if(t){Eo(),$l(e[0]??"");return}let n=df();n?((B.store.index<0||B.store.index>=e.length)&&Lo(),n.setAttribute(Fn,""),_e(n,e[Math.max(0,B.store.index)%e.length]??"")):Eo(),B.store.heroOnlyOutsideProject?To():$l(e[Math.max(0,B.store.index)%e.length]??"")}function Mi(){clearInterval(Un),Un=void 0,B.store.mode==="interval"&&Co()&&(Un=setInterval(()=>{Lo(),Mo()},B.store.intervalSec*lf))}function mf(e){B.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${Fn}]`)||getSelection()?.toString()||(Lo(),Mo())}function pf(){Co()&&B.store.mode==="refresh"&&Lo(),Mi(),Mo()}var ec=h({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:B,styles:Zl,start(){Eo(),To(),Ti=new AbortController,document.addEventListener("click",mf,{signal:Ti.signal}),Co()&&B.store.mode==="refresh"&&Lo(),Mi(),Xl=[M(e=>U(e)&&Mo()),he(pf)]},stop(){Ti?.abort();for(let e of Xl)e();clearInterval(Un),Eo(),To()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&Mi(),Mo()}});var ko=L("bloom-history-"),Ci=10,ff=3e3;function Li(e,t){let o="",n=0,r=new Set,i=s("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),a=s("div",{class:ko("list")}),d=s("div",{class:ko("pager")}),l,u=H("Clear all",()=>{if(!l){u.textContent="Click again to clear",l=setTimeout(()=>{l=void 0,u.textContent="Clear all"},ff);return}clearTimeout(l),l=void 0,u.textContent="Clear all",Bo([])},"danger");function m(){let T=[...pt.store.entries].toReversed(),f=o.trim().toLowerCase(),q=f?T.filter(ee=>ee.toLowerCase().includes(f)):T,V=Math.max(1,Math.ceil(q.length/Ci));n=Math.min(n,V-1);let Xe=q.slice(n*Ci,(n+1)*Ci).map(ee=>s("div",{class:ko("row")},s("button",{class:ko("text",r.has(ee)?"text-open":"text-closed"),text:ee,title:r.has(ee)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{r.delete(ee)||r.add(ee),m()}}}),t&&G("edit","Use",()=>t(ee)),G("copy","Copy",()=>void Do(ee)),G("trash","Delete",()=>Bo(pt.store.entries.filter(er=>er!==ee)))));a.replaceChildren(...Xe.length?Xe:[s("div",{class:"bloom-muted",text:f?"No matching prompts.":"No saved prompts yet."})]),d.replaceChildren(s("span",{class:"bloom-muted",text:`${q.length} ${f?"matching":"saved"} \xB7 page ${n+1} of ${V}`}),H("Previous",()=>{n--,m()}),H("Next",()=>{n++,m()}),u);let[J,Se]=d.querySelectorAll("button");J.disabled=n===0,Se.disabled=n>=V-1,u.disabled=!T.length}i.addEventListener("input",()=>{o=i.value,n=0,m()}),e.append(s("div",{class:ko("manager")},i,a,d)),m();let g=At((T,f)=>T==="InputHistory"&&f==="entries"&&m());return()=>{g(),clearTimeout(l),e.replaceChildren()}}var tc=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

.bloom-history-hud {
    position: fixed;
    z-index: 2147482000;
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

.bloom-history-backdrop {
    position: fixed;
    inset: 0;
    z-index: 2147483000;
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
`;var Be=L("bloom-history-"),hf=2e3,pt=b({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>Li(e)},entries:{type:"custom",default:[]}}),D=null,ki={text:"",at:0},we=null,We=null,Bi,Kt=()=>pt.store.entries.filter(e=>typeof e=="string");function Bo(e){pt.store.entries=e.slice(-pt.store.maxEntries)}function Ii(e){let t=e.trim();if(!t)return;let o=Date.now();t===ki.text&&o-ki.at<hf||(ki={text:t,at:o},Bo([...Kt().filter(n=>n!==t),t]))}function oc(e){e.preventDefault()}function bf(){let e=s("button",{class:Be("hud-count"),attrs:{type:"button"},on:{mousedown:oc,click:wf}}),t=s("button",{class:Be("hud-x"),text:"\xD7",attrs:{type:"button","aria-label":"Exit history"},on:{mousedown:oc,click:yf}});return s("div",{class:`bloom-root ${Be("hud")}`,attrs:{"data-bloom":"history-hud",role:"group","aria-live":"polite","aria-label":"Input history"}},e,t)}function nc(e,t){let o=ue();if(!o||We)return;we??=bf();let n=`${e+1} / ${t}`,r=we.querySelector(`.${Be("hud-count")}`);r?.replaceChildren(n),r?.setAttribute("aria-label",`Show input history (${n})`);let i=(o.closest("form")??o).getBoundingClientRect();we.style.left=`${i.left+i.width/2}px`,we.style.top=`${i.top}px`,we.isConnected||document.body.append(we)}function Ft(){D=null,we?.remove()}function yf(){D&&Ee(D.draft),Ft(),ue()?.focus()}function rc(e){let t=Kt();if(!D)return;let o=t[e];D.index=e,D.shown=o,Ee(o),nc(t.length-1-e,t.length)}function Af(e){let t=Kt();if(!t.length)return!1;if(!D){if(e===1)return!1;D={index:t.length,draft:Q(),shown:""}}let o=D.index+e;return o<0?!0:o>=t.length?(Ee(D.draft),Ft(),!0):(rc(o),!0)}function vf(e){let t=Kt().indexOf(e);Io(),!(t<0)&&(D??={index:t,draft:Q(),shown:""},rc(t),ue()?.focus())}function Io(){if(!We)return;We.release(),We.controller.abort(),We.root.remove(),We=null;let e=Kt();D&&e[D.index]===D.shown?nc(e.length-1-D.index,e.length):D=null}function wf(){if(We)return;we?.remove();let e=s("div",{class:Be("dialog-body")}),t=s("div",{class:`bloom-root ${Be("backdrop")}`,attrs:{"data-bloom":"history-dialog"},on:{click:n=>n.target===n.currentTarget&&Io()}},s("div",{class:Be("dialog"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Input history"}},s("div",{class:Be("dialog-header")},s("h2",{class:Be("dialog-title"),text:"Input history"}),G("close","Close",Io)),e));t.addEventListener("keydown",n=>n.stopPropagation());let o=new AbortController;document.addEventListener("keydown",n=>{n.key==="Escape"&&(n.preventDefault(),n.stopPropagation(),Io())},{capture:!0,signal:o.signal}),document.body.append(t),We={root:t,release:Li(e,vf),controller:o},e.querySelector("input")?.focus()}function ic(e){return oo(e)?e:e instanceof HTMLElement?e.closest(c.composerInput):null}function xf(){if(ue()?.closest("[data-chatgpt-composer], [data-composer-input], form")?.querySelector('[aria-expanded="true"]'))return!0;for(let t of document.querySelectorAll('[role="listbox"], [role="menu"], [data-radix-popper-content-wrapper], [cmdk-root], [cmdk-list]')){if(!(t instanceof HTMLElement)||t.closest("[data-bloom]"))continue;let o=getComputedStyle(t);if(!(o.display==="none"||o.visibility==="hidden"))return!0}return!1}function Sf(e){if(e.isComposing||e.key==="Process"||e.keyCode===229)return;let t=ic(e.target);if(!t)return;if(e.key==="Enter"&&!e.shiftKey){Ii(Q(t)),Ft();return}if(e.key==="Escape"&&D){Ee(D.draft),Ft(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey||xf())return;let o=Ya(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!D||Af(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function qf(e){D&&ic(e.target)&&Q()!==D.shown.trim()&&Ft()}function Ef(e){e.target instanceof Element&&e.target.closest(c.sendButton)&&Ii(Q())}var ac=h({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before. Click the counter to browse history.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:pt,styles:tc,start(){for(let t of document.querySelectorAll('[data-bloom="history-hud"], [data-bloom="history-dialog"]'))t.remove();we=null,Bi=new AbortController;let{signal:e}=Bi;document.addEventListener("keydown",Sf,{capture:!0,signal:e}),document.addEventListener("input",qf,{capture:!0,signal:e}),document.addEventListener("click",Ef,{capture:!0,signal:e}),document.addEventListener("submit",()=>Ii(Q()),{capture:!0,signal:e})},stop(){Bi?.abort(),Io(),Ft();for(let e of document.querySelectorAll('[data-bloom="history-hud"]'))e.remove();we=null},onSettingsChange(e){e==="maxEntries"&&Bo(Kt())}});var sc=`/*
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
`;var Mf=1500,Cf=5e3,Lf=2e3,pc=[{label:"UTC",value:"UTC"},{label:"\u7F8E\u56FD\u4E1C\u90E8",value:"America/New_York"},{label:"\u7F8E\u56FD\u4E2D\u90E8",value:"America/Chicago"},{label:"\u7F8E\u56FD\u5C71\u5730",value:"America/Denver"},{label:"\u7F8E\u56FD\u897F\u90E8",value:"America/Los_Angeles"},{label:"\u65E5\u672C",value:"Asia/Tokyo"},{label:"\u53F0\u6E7E",value:"Asia/Taipei"}],Gt=b({sourceTimeZone:{type:"select",description:"Zone the stored clock was written in. Leave UTC for ChatGPT create_time. Pick the same zone as the Shit GPT plugin only when that clock is a wall time in that zone; it is then shown in the system timezone.",options:pc,default:"UTC"},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),Gn=new Map,Pi=new Set,fc=0,Yn,lc=[];function gc(e,t){Gn.get(e)!==t&&(Gn.set(e,t),clearTimeout(Yn),Yn=setTimeout(hc,Lf))}function hc(){let e={...Gt.store.stamps,...Object.fromEntries(Gn)};Gt.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,Mf))}function kf(e){let t=Te(A())?.times;for(let o=e.length-1;o>=0;o--){let n=Gn.get(e[o])??t?.get(e[o])??Gt.store.stamps[e[o]];if(n)return n}return null}var Bf=()=>X().generating||Date.now()-fc<Cf;function bc(){return Intl.DateTimeFormat().resolvedOptions().timeZone}function yc(){let e=Gt.store.sourceTimeZone;if(!e||e==="UTC")return"UTC";try{return Intl.DateTimeFormat(void 0,{timeZone:e}),e}catch{return"UTC"}}function Ac(e,t){let o={};for(let n of new Intl.DateTimeFormat("en-US",{timeZone:t,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(e)))o[n.type]=n.value;return{y:+o.year,m:+o.month,d:+o.day,h:+o.hour%24,mi:+o.minute,s:+o.second}}function vc(e){return Date.UTC(e.y,e.m-1,e.d,e.h,e.mi,e.s)}function cc(e,t){let o=e;for(let n=0;n<4;n++){let r=e-vc(Ac(o,t));if(r===0)return o;o+=r}return o}function If(e,t){if(t==="UTC")return e;let o=(e%1e3+1e3)%1e3,n=e-o,r=new Date(n),i=Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),r.getUTCHours(),r.getUTCMinutes(),r.getUTCSeconds()),a=cc(i,t),d=3600*1e3,l=Number.POSITIVE_INFINITY;for(let u of[-d,0,d]){let m=a+u;vc(Ac(m,t))===i&&m<l&&(l=m)}return l!==Number.POSITIVE_INFINITY?l+o:cc(i+d,t)+o}function Pf(e,t){let o=yc();return t||o==="UTC"?e:If(e,o)}function uc(e,t){return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(e)}function Of(e){let t=bc(),o=Date.now(),n={hour:"2-digit",minute:"2-digit",timeZone:t};if(uc(e,t)===uc(o,t))return new Intl.DateTimeFormat(void 0,n).format(e);let r=a=>new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric"}).format(a),i=r(e)===r(o)?{}:{year:"numeric"};return new Intl.DateTimeFormat(void 0,{...i,month:"short",day:"numeric",...n}).format(e)}function Rf(e,t){let o=new Date(t).toLocaleString(void 0,{timeZone:bc()}),n=yc();if(n==="UTC"||t===e)return o;let r=new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"UTC"}).format(e);return`${pc.find(a=>a.value===n)?.label??n} ${r} \u2192 ${o}`}function wc(e){let t=Ye(e)??e.getAttribute("data-message-author-role")??e.closest(c.turn)?.getAttribute("data-turn")??e.querySelector(c.authorRole)?.getAttribute("data-message-author-role");if(gn(t))return t;let o=po(e).at(-1);return Te(A())?.chain.find(n=>n.id===o)?.role??null}var dc='[class*="group/activity-header"]';function Hf(e){let t=e.parentElement;if(!t)return null;let o=e.closest(c.turn);return o&&t!==o&&!o.contains(t)?null:t}function Df(e){let t=e;for(let o=0;o<8&&t;o++){let n=Hf(t);if(!n)return null;let r=[...n.children],i=r.indexOf(t);for(let a=i-1;a>=0;a--){let d=r[a],l=d.matches(dc)?d:d.querySelector(dc);if(l)return l;if(d.matches(c.searchUnit)||d.querySelector(c.searchUnit))return null}if(n===t.closest(c.turn))return null;t=n}return null}function Nf(e){let t=e.parentElement;for(let o=0;o<4&&t;o++){if(t.classList.contains("flex-col"))return t;t=t.parentElement}return e.parentElement??e}function xc(e,t){if(t==="assistant"){let o=Df(e);if(o)return Nf(o)}return e}function Uf(e,t){let o=Mt();for(let n=o.length-1;n>=0;n--){let r=o[n];if(!(r!==e&&(wc(r)!=="assistant"||xc(r,"assistant")!==t)))return r===e}return!0}function mc(e){return e.querySelector(':scope > time[data-bloom="timestamp"]')}function Ff(e){let t=po(e);if(!t.length||!be(e)||e.querySelector("time:not([data-bloom])"))return;let o=wc(e),n=xc(e,o);if(n!==e&&!Uf(e,n)){mc(e)?.remove();return}let r=kf(t),i=!1;if(!r&&Bf()){r=Date.now();let m=t.at(-1);Pi.add(m),gc(m,r),i=!0}else r&&Pi.has(t.at(-1))&&(i=!0);let a=n.querySelector('time[data-bloom="timestamp"]')??mc(e);if(!r||Gt.store.hideOwnMessages&&o==="user"){a?.remove();return}let d=Pf(r,i),l=Of(d);if(a?.textContent===l&&a.parentElement===n&&a===n.firstElementChild)return;let u=s("time",{class:`bloom-timestamp bloom-timestamp-${o??"assistant"}`,text:l,title:Rf(r,d),attrs:{"data-bloom":"timestamp",datetime:new Date(d).toISOString()}});a&&a.replaceWith(u),(u.parentElement!==n||u!==n.firstElementChild)&&n.prepend(u)}var Kn=Oe(()=>{for(let e of Mt())Ff(e)}),Sc=h({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:Gt,styles:sc,start(){lc=[M(e=>U(e)&&Kn()),Ae.on("conversation",Kn),Ae.on("message-time",({messageId:e,time:t})=>{Pi.delete(e),gc(e,t),Kn()}),O.on("fall",()=>{fc=Date.now()})]},stop(){for(let e of lc)e();Yn&&(clearTimeout(Yn),hc());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();Kn()}}});var Kf=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])','[data-chatgpt-composer] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-composer-input] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-codex-composer-root] button[aria-label^="Dictat" i], [data-composer-placement] button[aria-label^="Dictat" i], [class*="ComposerLayout"] button[aria-label^="Dictat" i]'],Gf=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],qc=b({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),Ec=h({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:qc,styles:()=>Pe([...Kf,...qc.store.hideDictationSettings?Gf:[]])});var ft="data-bloom-share",Yf=/^\/g\/g-p-/,jf=/^(?:share|分享)$/i,Qf=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],Wf=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${ft}="project"]`],Oi=b({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),jn,Ri=!1;function zf(e){if(!U(e))return;let t=Yf.test(location.pathname)&&!A();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${ft}]`))!t||!jf.test(y(o.textContent??""))?o.removeAttribute(ft):o.hasAttribute(ft)||o.setAttribute(ft,"project")}var Tc=h({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:Oi,styles:()=>Pe([...Oi.store.hideShareChat?Qf:[],...Oi.store.hideShareProject?Wf:[]]),start(){Ri=!0,Ue().then(()=>{Ri&&!jn&&(jn=M(zf))})},stop(){Ri=!1,jn?.(),jn=void 0;for(let e of document.querySelectorAll(`[${ft}]`))e.removeAttribute(ft)}});var Mc='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',Vf='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',Jf="[data-bloom-profile-plan]",Cc="visibility:hidden!important;user-select:none!important",kc=b({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function Zf(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=kc.store,r=[];return e&&r.push(n?`:is(${Mc}){display:none!important}`:`:is(${Mc}){${Cc}}`),t&&r.push(`:is(${Vf}){${Cc}}`),e&&o&&r.push(`${Jf}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var Lc,Bc=h({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:kc,styles:Zf,start(){Lc=ye()},stop(){Lc?.()}});var Xf=new Set(["chatgpt","new chat","\u65B0\u804A\u5929","codex"]);function $f(){let e=y(document.title.replace(/\s*[|–-]\s*(?:ChatGPT|Codex)$/i,""));return e&&!Xf.has(e.toLowerCase())?e:null}function Po(e){return e?co(e)??(e===A()?$f():null):null}var Ic=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

.bloom-recent-backdrop {
    position: fixed;
    inset: 0;
    z-index: 2147482500;
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
`;var _=L("bloom-recent-"),xe="home",eg=50,Pc=140,tg=new Set(["Backquote"]),og=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),w=b({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),ze=null,ae=[],me=0,Hi,Oc=[],Wn=()=>et()?null:A()??(rn()?xe:null);function Rc(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function Dc(e){let t=Po(e);t&&w.store.titles[e]!==t&&(w.store.titles={...w.store.titles,[e]:t});let o=Es(location.href);o&&e===A()&&w.store.projects[e]!==o&&(w.store.projects={...w.store.projects,[e]:o})}function Hc(e){if(!e)return;let t=[e,...w.store.visits.filter(n=>n!==e)].slice(0,eg),o=new Set(t);w.store.visits=t,Object.keys(w.store.previews).some(n=>!o.has(n))&&(w.store.previews=Rc(w.store.previews,o)),Object.keys(w.store.titles).some(n=>!o.has(n))&&(w.store.titles=Rc(w.store.titles,o)),e!==xe&&Dc(e)}function ng(e){if(!w.store.visits.includes(e))return;let{[e]:t,...o}=w.store.titles,{[e]:n,...r}=w.store.previews,{[e]:i,...a}=w.store.projects;w.store.visits=w.store.visits.filter(d=>d!==e),w.store.titles=o,w.store.previews=r,w.store.projects=a}function Qn(e){if(!e||!w.store.visits.includes(e))return;let t={},o=Te(e)?.chain??[];for(let r of o)t[r.role]=pe(bn(r),Pc);if(e===A())for(let r of je()){let i=Ct(r);i&&(t[r.role]=pe(i,Pc))}let n=w.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(w.store.previews={...w.store.previews,[e]:t})}function rg(){let e=Number(w.store.maxRecent);return w.store.visits.filter(t=>t!==xe||w.store.includeHome).slice(0,e)}function Nc(e){if(jt(),e===Wn())return;let t=e===xe?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"], [data-sidebar-destination="builtin:home"]'):lo(e)[0];t?t.click():location.assign(e===xe?"/":`/c/${e}`)}function ig(e){let t=e===xe?null:w.store.previews[e],o=t&&["user","assistant"].filter(n=>t[n]).map(n=>s("span",{class:_("preview"),attrs:{"data-role":n},text:t[n]}));return s("span",{class:_("thumb"),attrs:{"aria-hidden":"true"}},o?.length?s("span",{class:_("page")},...o):s("span",{class:_("fallback")},k(e===xe?"plus":"bloom")))}function ag(e,t){let o=e===xe?"New chat":w.store.titles[e]??Po(e)??"Untitled chat",n=e===xe?null:w.store.projects[e];return s("button",{class:_("item"),attrs:{type:"button",role:"option","aria-selected":String(t===me),"aria-label":n?`${o}, ${n}`:o},on:{click:()=>Nc(e),pointerenter:()=>t!==me&&Yt(t)}},ig(e),s("span",{class:_("meta")},s("span",{class:`${_("title")} bloom-truncate`,text:o}),n&&s("span",{class:_("project")},k("folder"),s("span",{class:"bloom-truncate",text:n}))))}function Uc(){ae.length?Nc(ae[me]):jt()}function Yt(e){ae.length&&(me=(e+ae.length)%ae.length,ze?.querySelectorAll(`.${_("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===me))))}function sg(){Qn(A());let e=Wn();ae=rg(),e&&(ae=[e,...ae.filter(o=>o!==e)].slice(0,Number(w.store.maxRecent))),me=ae.length>1?1:0;let t=ae.length?s("div",{class:_("list"),attrs:{role:"listbox","aria-label":"Recent chats"}},...ae.map(ag)):s("div",{class:_("empty"),text:"Open a few chats, then hold Ctrl+` to switch."});t.style.setProperty("--bloom-recent-count",String(ae.length)),ze=s("div",{class:`bloom-root ${_("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:o=>o.target===o.currentTarget&&jt()}},s("div",{class:_("panel")},t)),document.body.append(ze)}function jt(){ze?.remove(),ze=null}var lg=e=>tg.has(e.code)||og.has(e.key);function cg(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&lg(e)){e.preventDefault(),e.stopPropagation(),ze?Yt(me+(e.shiftKey?-1:1)):sg();return}if(!ze)return;let o={Escape:jt,Enter:Uc,ArrowRight:()=>Yt(me+1),ArrowDown:()=>Yt(me+1),ArrowLeft:()=>Yt(me-1),ArrowUp:()=>Yt(me-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function ug(e){ze&&e.key==="Control"&&Uc()}var Fc=h({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:w,styles:Ic,start(){Hi=new AbortController;let{signal:e}=Hi;addEventListener("keydown",cg,{capture:!0,signal:e}),addEventListener("keyup",ug,{capture:!0,signal:e}),addEventListener("blur",jt,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&Qn(A()),{signal:e}),Oc=[he(({prevId:i})=>{Qn(i),Hc(Wn())}),Ae.on("conversation",({id:i})=>{w.store.visits.includes(i)&&Dc(i),Qn(i)}),Ae.on("conversation-missing",({id:i})=>ng(i))];let{visits:t,titles:o,previews:n}=w.store,r=t.filter(i=>i!==xe&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(w.store.visits=t.filter(i=>!r.includes(i))),Hc(Wn())},stop(){Hi?.abort();for(let e of Oc)e();jt()}});var Di="data:audio/mpeg;base64,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";var Kc=new x("ResponseNotification"),dg=.5,Gc="BloomNoticeClaim",mg=3e4,Oo=b({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:e=>(e.append(H("Preview",zc)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),Yc=null,Ni=new Map,jc=[],Ui,pg=e=>Uint8Array.from(atob(e.slice(e.indexOf(",")+1)),t=>t.charCodeAt(0)).buffer;function fg(e,t){let o=Ni.get(t);return o||(o=(t.startsWith("data:")?Promise.resolve(pg(t)):Uo(t)).then(n=>e.decodeAudioData(n)),o.catch(()=>Ni.delete(t)),Ni.set(t,o)),o}async function Qc(e){Yc??=new AudioContext;let t=Yc;t.state==="suspended"&&t.resume();let o=t.createBufferSource(),n=t.createGain();o.buffer=await fg(t,e),n.gain.value=dg,o.connect(n).connect(t.destination),o.start()}function zc(){let e=Oo.store.soundUrl.trim();Qc(e||Di).catch(t=>{Kc.warn("Sound failed",t),e&&Qc(Di).catch(o=>Kc.warn("Default chime failed",o))})}function gg(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function hg(e){let t=No(Qo(Gc)??"");return e&&C(t)&&t.id===e&&Date.now()-Number(t.at)<mg?!1:(Wo(Gc,{id:e,at:Date.now()}),!0)}function Wc(e){Oo.store.onlyWhenHidden&&!document.hidden||hg(e)&&(Oo.store.sound&&zc(),Oo.store.browserNotification&&gg(Po(e)))}function bg(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(Ui=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:Ui.signal}))}var Vc=h({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply, including chats you left while they were answering.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:Oo,start(){bg(),jc=[O.on("fall",({conversationId:e,outcome:t})=>t==="done"&&Wc(e)),O.on("background",({conversationId:e})=>Wc(e))]},stop(){for(let e of jc)e();Ui?.abort()}});var yg=`:is(${c.sidebarScroll}, :has(> ${c.sidebarScroll})) + :has(${c.menuButton})`,Ag=`${c.rail} > :has(${c.menuButton})`,Ki=`:is(${yg}, ${Ag}, ${c.oldProfile}):not(:hover)`,Fi="[data-bloom-profile-avatar]",vg=`:is(${Ki}, ${Ki} :has(${Fi})) > :not(${Fi}, :has(${Fi}))`,Zc=b({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function wg(){let{opacity:e,fadeAvatar:t}=Zc.store;return e>=100?"":`${t?Ki:vg}{opacity:${e/100}!important}`}var Jc,Xc=h({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Zc,styles:wg,start(){Jc=ye()},stop(){Jc?.()}});var $c=`/*
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
    z-index: 80;
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
`;var N=L("bloom-star-chats"),Sg=80,qg=60,Eg=1200,Tg=120,Ro=b({replaceReadAloud:{type:"boolean",description:"Put the star where the reply's Read aloud button is, and hide that button.",default:!0},messages:{type:"custom",default:[]}}),Mg=`:is(${c.turnActions}) ${c.readAloud}`,Gi,Yi=!1,Ve=!1,ht=!1,zn=0,z=null,Vn="",I=null,ji,Je;function Wi(){let e=Ro.store.messages;return Array.isArray(e)?e.filter(t=>C(t)&&typeof t.conversationId=="string"&&typeof t.messageId=="string"&&(t.role==="user"||t.role==="assistant")&&typeof t.snippet=="string"&&typeof t.starredAt=="number"):[]}function zi(){let e=A();return e?Wi().filter(t=>t.conversationId===e):[]}function Cg(e,t){return Wi().some(o=>o.conversationId===e&&o.messageId===t)}function _c(e){let t=Wi(),o=t.some(n=>n.conversationId===e.conversationId&&n.messageId===e.messageId);Ro.store.messages=o?t.filter(n=>!(n.conversationId===e.conversationId&&n.messageId===e.messageId)):[{...e,starredAt:Date.now()},...t].slice(0,Sg)}function Qi(e){return e.messageIds[0]||e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.el.getAttribute("data-turn-key")||""}function Lg(e){return pe(Ct(e)||y(e.el.textContent??""),qg)}function kg(e){let t=e.closest(c.turn);if(!t)return null;let o=je().filter(n=>t.contains(n.el));return o.find(n=>n.el.contains(e)||n.el===t)??o.findLast(n=>n.el.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING)??null}function Bg(){let e=[...document.querySelectorAll(c.turnActions)].filter(t=>!t.closest(`[data-bloom], [role="dialog"], [inert], pre, ${c.sidebars}`));return e.filter(t=>!e.some(o=>o!==t&&o.contains(t)))}function Ig(e,t){let o=Ro.store.replaceReadAloud?t.querySelector(c.readAloud):null;if(o&&!o.closest("[data-bloom]")){e.nextElementSibling!==o&&o.before(e);return}let n=Pg(t);(e.parentElement!==n||n.lastElementChild!==e)&&n.append(e)}function Pg(e){let t=[...e.querySelectorAll("button")].filter(n=>n.dataset.bloom!=="message-star"&&!n.closest("[data-bloom]"));return t.length?[...e.children].find(n=>n instanceof HTMLElement&&n!==t[0]&&t.every(r=>n.contains(r)))??e:e}function Og(){return[...document.querySelectorAll(c.headerMore)].filter(t=>{if(t.dataset.bloom==="message-star"||t.closest("[data-bloom], [role='dialog'], [inert]")||t.closest(c.sidebars))return!1;let o=t.getBoundingClientRect();return o.width===0&&o.height===0?!!t.closest("header, #page-header"):o.top>=0&&o.top<96&&o.left>window.innerWidth*.5}).toSorted((t,o)=>o.getBoundingClientRect().left-t.getBoundingClientRect().left||(t.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1))[0]??null}function eu(e,t,o){return s("button",{class:t,attrs:{type:"button","aria-label":e},on:{pointerdown:n=>n.stopPropagation(),mousedown:n=>n.stopPropagation(),click:n=>{n.preventDefault(),n.stopPropagation(),o(n)}}},k("star"))}function Rg(e,t){e.setAttribute("aria-pressed",String(t)),e.setAttribute("aria-label",t?"Unstar":"Star")}function Jn(){return Ve||ht}function Qt(){zn&&window.clearTimeout(zn),zn=0}function Wt(){Ve=!1,ht=!1,Qt(),Je?.enter(),z?.remove(),z=null,Vn="",I?.classList.remove(N("-open")),I?.setAttribute("aria-expanded","false")}function Zn(e){return e instanceof Node&&!!(I?.contains(e)||z?.contains(e))}function Hg(e){e.classList.add(N("-flash")),window.setTimeout(()=>e.classList.remove(N("-flash")),Eg)}function Dg(e){let t=je().find(n=>Qi(n)===e),o=t?.el.closest(c.turn)??t?.el;o&&(o.scrollIntoView({block:"start"}),Hg(o))}function Ng(){let e=A(),t=new Set,o=[...document.querySelectorAll('[data-bloom="message-star"][data-place="action"]')];if(!e||et()){for(let n of o)n.remove();return}for(let n of Bg()){if(!be(n))continue;let r=kg(n),i=r?Qi(r):"";if(!r||!i)continue;let a=n.querySelector('[data-place="action"]');(!a||a.dataset.id!==i)&&(a?.remove(),a=eu("Star",N("-star"),()=>{let d=A(),l=je().find(u=>Qi(u)===i);!d||!l||_c({conversationId:d,messageId:i,role:l.role,snippet:Lg(l)})}),a.dataset.bloom="message-star",a.dataset.place="action",a.dataset.id=i),Rg(a,Cg(e,i)),Ig(a,n),t.add(a)}for(let n of o)t.has(n)||n.remove()}function Ug(){if(!z||!I)return;let e=I.getBoundingClientRect(),t=z.offsetWidth||288,o=z.offsetHeight||120,n=e.bottom+6;n+o>window.innerHeight-8&&(n=Math.max(8,e.top-o-6));let r=Math.max(8,Math.min(e.right-t,window.innerWidth-t-8));z.dataset.place=n>=e.bottom?"below":"above",z.style.left=`${Math.round(r)}px`,z.style.top=`${Math.round(n)}px`}function Fg(){if(!Jn()||!I){z?.remove(),z=null,Vn="",I?.classList.remove(N("-open")),I?.setAttribute("aria-expanded","false");return}let e=zi(),t=e.map(o=>`${o.messageId}	${o.snippet}`).join(`
`);if(!z||Vn!==t){z?.remove();let o=e.map(n=>s("div",{class:N("-row")},s("button",{class:N("-jump"),attrs:{type:"button"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),Wt(),Dg(n.messageId)}}},s("span",{class:N("-role"),text:n.role==="user"?"You":"ChatGPT"}),s("span",{class:N("-snip"),text:n.snippet||"Message"})),eu("Unstar",N("-unstar"),()=>_c(n))));z=s("div",{class:`bloom-root ${N("-panel")}`,attrs:{"data-bloom":"star-list"},on:{pointerenter:()=>{Qt(),Je?.enter(),ht=!0},pointerleave:n=>{Zn(n.relatedTarget)||Ve||Je?.leave(n)}}},s("div",{class:N("-bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:N("-head"),text:"Starred"}),s("div",{class:N("-body")},...o.length?o:[s("div",{class:N("-empty"),text:"No starred messages in this chat"})])),document.body.append(z),Vn=t}Ug(),I.classList.add(N("-open")),I.setAttribute("aria-expanded","true")}function Kg(){for(let r of document.querySelectorAll('[data-bloom="starred"]'))r.remove();let e=Og(),t=e?.parentElement??null,o=A();if(!e||!t||t.closest(c.sidebars)||!o||et()||!be(t)){I?.remove(),I=null,Wt();return}I||(I=s("button",{class:N("-toggle"),attrs:{type:"button","data-bloom":"message-star","data-place":"header","aria-label":"Starred messages","aria-expanded":"false"},on:{pointerdown:r=>r.stopPropagation(),pointerenter:()=>{Qt(),Je?.enter(),zn=window.setTimeout(()=>{ht=!0,gt()},Tg)},pointerleave:r=>{Zn(r.relatedTarget)||(Qt(),Jn()&&Je?.leave(r))},click:r=>{r.preventDefault(),r.stopPropagation(),Ve=!Ve,ht=Ve,Qt(),Ve||Wt(),gt()}}},k("star"))),(I.parentElement!==t||I.nextElementSibling!==e)&&e.before(I);let n=e.getBoundingClientRect();n.width>0&&(I.style.width=`${n.width}px`,I.style.height=`${n.height}px`),I.classList.toggle(N("-here"),zi().length>0),Fg()}function Gg(){let e=new Set(zi().map(t=>t.messageId));for(let t of document.querySelectorAll('[data-bloom="navigator"] .bloom-nav-tick, [data-bloom="navigator"] .bloom-nav-row'))t.classList.toggle(N("-mark"),!!t.dataset.messageId&&e.has(t.dataset.messageId))}function gt(){if(!Yi){Yi=!0;try{for(let e of document.querySelectorAll('[data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();Ng(),Kg(),Gg()}finally{Yi=!1}}}function Yg(){Wt(),I?.remove(),I=null;for(let e of document.querySelectorAll('[data-bloom="message-star"], [data-bloom="star-list"], [data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();for(let e of document.querySelectorAll(`.${N("-mark")}`))e.classList.remove(N("-mark"))}var tu=h({name:"StarChats",description:"Star a message from its toolbar. The star left of the top-right menu opens this chat's list.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:Ro,styles:()=>`${$c}${Ro.store.replaceReadAloud?Pe([Mg]):""}`,onSettingsChange(e){(e==="messages"||e==="replaceReadAloud")&&gt()},start(){for(let o of document.querySelectorAll('[data-bloom="star-list"]'))o.remove();Je=yn({over:Zn,trigger:()=>I,panel:()=>z,setHeld(o){if(o){ht=!0,gt();return}Ve||(ht=!1,gt())}}),Gi=M(o=>U(o)&&gt());let e=o=>{Zn(o.target)||Jn()&&Wt()};document.addEventListener("pointerdown",e,!0);let t=o=>{o.key!=="Escape"||!Jn()||(o.preventDefault(),Wt())};document.addEventListener("keydown",t,!0),ji=()=>{document.removeEventListener("pointerdown",e,!0),document.removeEventListener("keydown",t,!0)},gt()},stop(){Gi?.(),Gi=void 0,ji?.(),ji=void 0,Qt(),Je?.dispose(),Je=void 0,Yg()}});var ou="filter:blur(6px)!important;transition:filter 0.2s ease",E0=`:is(${c.sidebars})`,bt="data-bloom-streamer-open",jg="[data-app-action-sidebar-thread-row], [data-app-action-sidebar-project-row], .bloom-recent-item",nu=":not([data-app-action-sidebar-thread-row] *, [data-app-action-sidebar-project-row] *)";function Qg(){return{conversations:{selectors:["[data-app-action-sidebar-thread-title]"],hover:!0,row:"[data-app-action-sidebar-thread-row]"},projects:{selectors:["[data-app-action-sidebar-project-label]"],hover:!0,row:"[data-app-action-sidebar-project-row]"},accountAvatar:{selectors:["[data-bloom-profile] img","[data-bloom-menu] img"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:[`[data-thread-title]${nu}`,`[data-thread-title-trigger]${nu}`],hover:!1}}}var ru=b({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function Wg(e,t){let o=[`:is(${e}):hover`,`.bloom-recent-item:hover :is(${e})`,`:is(${e})[${bt}]`];return t&&o.push(`${t}:hover`,`${t}:hover :is(${e})`,`${t}:is(${e}):hover`,`${t}[${bt}]`,`${t}[${bt}] :is(${e})`),o.join(",")}function zg(){let e=Qg();return Object.entries(e).filter(([t])=>ru.store[t]).map(([,t])=>{let o=t.selectors.join(",");if(!t.hover)return`:is(${o}){${ou}}`;let n="row"in t?t.row:void 0;return`:is(${o}){${ou}}${Wg(o,n)}{filter:none!important}`}).join(`
`)}function Vg(e,t){for(let o of document.elementsFromPoint(e,t))if(o instanceof Element){let n=o.closest(jg);if(n)return n}return null}function Zi(e){for(let t of document.querySelectorAll(`[${bt}]`))t!==e&&t.removeAttribute(bt);e&&!e.hasAttribute(bt)&&e.setAttribute(bt,"")}var zt,Jg=Oe(()=>{zt&&Zi(Vg(zt.clientX,zt.clientY))});function Vi(e){zt=e,Jg()}function Zg(e){e.relatedTarget instanceof Node&&document.documentElement.contains(e.relatedTarget)||(zt=void 0,Zi(null))}var Ji,Xn,iu=h({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:ru,styles:zg,start(){Ji=ye(),Xn=new AbortController;let e={capture:!0,signal:Xn.signal,passive:!0};document.addEventListener("pointerover",Vi,e),document.addEventListener("pointermove",Vi,e),document.addEventListener("pointerout",Vi,e),window.addEventListener("pointerleave",Zg,e)},stop(){Xn?.abort(),Xn=void 0,zt=void 0,Zi(null),Ji?.(),Ji=void 0}});var Ze=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)','[data-turn-key] [data-message-author-role="user"] blockquote:not(.twitter-tweet)','[class~="group/user-message"] blockquote:not(.twitter-tweet)'].join(","),Xi=b({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function Xg(){let e=[`${Ze}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${Ze}>*{margin-block:0!important}`];return Xi.store.italic||e.push(`${Ze}{font-style:inherit!important}`),Xi.store.quotes||(e.push(`${Ze}{quotes:none!important}`),e.push(`${Ze}::before,${Ze}::after,${Ze} p::before,${Ze} p::after{content:none!important}`)),e.join(`
`)}var au=h({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:Xi,styles:Xg});var $g=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],_g=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",eh='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',su=b({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function th(){let e=`${su.store.width}rem`;return`:root,[data-app-action-timeline-scroll],[data-chatgpt-composer],[data-composer-input]{--thread-content-max-width:${e}!important;--composer-adjacent-max-width:${e}!important}`}var lu=h({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:su,styles:th});var oh=[Hs,ss,dl,vl,Sl,Tl,Cl,Hl,Wl,ec,ac,Sc,Ec,Tc,Bc,Fc,Vc,Xc,tu,iu,au,lu],$i=oh;var nh=new x("Bloom"),cu="2.0.97";var _i=0,$n,Ho="__bloomOnShortcut";function _n(e){if(e.isComposing||!e.shiftKey||!(e.metaKey||e.ctrlKey)||e.key!=="b"&&e.key!=="B")return;e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation();let t=ys();Ke();for(let o of document.querySelectorAll("[data-bloom='settings']"))o.remove();t||Tt()}function rh(){let e=se;e[Ho]&&document.removeEventListener("keydown",e[Ho],!0),e[Ho]=_n,document.addEventListener("keydown",_n,!0)}function ih(){_i++,document.removeEventListener("keydown",_n,!0);let e=se;e[Ho]===_n&&delete e[Ho],$n?.(),$n=void 0,Ra(),Xt(),Go()}async function ea(){let e=++_i,t=()=>e===_i;Xt(),Go();for(let o of $i)o.updatedAt=$a[o.name];xa($i),ya(),qa(),Fo("base",Da),Za(),rh(),_o("Init"),br().then(()=>{t()&&(ca(),_o("DOMContentLoaded"))}),await yr(),t()&&(_o("HostReady"),$n?.(),$n=ws(),Oa(),nh.info(`Bloom++ ${cu} app host ready`))}var ah=new x("Boot");window===window.top&&(da(se.Bloom),ma(ta),ea().catch(e=>ah.error("Startup failed",e)));})();
