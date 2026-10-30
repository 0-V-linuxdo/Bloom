// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.98
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

/* Bloom++ v2.0.98. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var rm=Object.defineProperty;var im=(e,t)=>{for(var o in t)rm(e,o,{get:t[o],enumerable:!0})};var q=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var fe=(e,t,o)=>Math.min(o,Math.max(t,e)),k=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),it=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,xe=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,y=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function gn(e,t){return`${e} ${t}${e===1?"":"s"}`}async function hn(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function Se(e){try{return JSON.parse(e)}catch{return}}var oe=typeof unsafeWindow>"u"?window:unsafeWindow,sm=200,am=300;function bn(e){return new Promise((t,o)=>GM_xmlhttpRequest({url:e,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=sm&&n<am?t(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var lm=new q("Styles"),Fe=new Map,wo=new Set,st=new Map,zr=!0,fa=e=>e.replaceAll(/[^A-Za-z0-9_-]/g,"_"),cm=e=>`:where(:root){--bloom-sheet-${fa(e)}:1}`,um=(e,t)=>`${cm(e)}${t}`,pa=e=>`bloom-style-${e}`;function ga(e){try{return[...e.cssRules].map(t=>t.cssText).join(`
`)}catch{return""}}function dm(e,t){let o=ga(e);return o?o.includes(`--bloom-sheet-${fa(t)}`)?!0:t==="plugin-StreamerMode"?o.includes("blur(6px)")&&(o.includes("data-app-action-sidebar-thread-title")||o.includes("data-bloom-streamer-open")):t==="plugin-WiderChat"?o.includes("--composer-adjacent-max-width")&&o.includes("--thread-content-max-width"):t==="plugin-ComposerOpacity"?o.includes("--composer-layout-surface-backdrop-filter")||o.includes("--composer-layout-surface-background")&&o.includes("color-mix"):!1:!1}function ha(e){let t=ga(e);return t?!!(t.includes("--bloom-")||t.includes(".bloom-")||t.includes("[data-bloom")||t.includes("--bloom-sheet-")||t.includes("blur(6px)")&&t.includes("data-app-action-sidebar-thread-title")||t.includes("--composer-adjacent-max-width")&&t.includes("--thread-content-max-width")||t.includes("--composer-layout-surface-backdrop-filter")):!1}function ba(){let e=document.adoptedStyleSheets.filter(t=>!wo.has(t)&&!ha(t));document.adoptedStyleSheets=[...e,...Fe.values()]}function ya(e){document.readyState==="loading"||e.parentNode===document.head||document.head.append(e)}function mm(e,t){let o=st.get(e);o||(o=document.createElement("style"),o.id=pa(e),st.set(e,o)),o.textContent!==t&&(o.textContent=t),ya(o)}function It(e,t){let o=um(e,t);if(zr)try{let n=Fe.get(e);n||(n=new oe.CSSStyleSheet,Fe.set(e,n),wo.add(n)),n.replaceSync(o),ba();return}catch(n){lm.warn("Constructed style sheets unavailable, using <style> after parsing",n),zr=!1;let r=Fe.get(e);r&&wo.delete(r),Fe.delete(e)}mm(e,o)}function xo(e){let t=Fe.get(e);t&&(wo.delete(t),Fe.delete(e)),st.get(e)?.remove(),st.delete(e);for(let o of document.querySelectorAll(`style[id="${pa(e)}"]`))o.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(o=>o!==t&&!dm(o,e)),zr&&ba()}catch{}}function So(){Fe.clear(),wo.clear();for(let e of st.values())e.remove();st.clear();for(let e of document.querySelectorAll("style[id^='bloom-style-']"))e.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(e=>!ha(e))}catch{}}function va(){for(let e of st.values())ya(e)}var C=e=>(...t)=>t.map(o=>e+o).join(" "),yn=(...e)=>e.filter(Boolean).join(" "),Ge=e=>e.length?`${e.map(t=>`${t}:not([data-bloom])`).join(",")}{display:none!important}`:"";var Aa="__bloomHost",Vr=new q("Boot"),fm=['[data-bloom="navigator"]','[data-bloom="settings"]','[data-bloom="history-hud"]','[data-bloom="history-dialog"]','[data-bloom="star-list"]','[data-bloom="entry"]','[data-bloom="menu-entry"]','[data-bloom="menu-flyout"]','[data-bloom="message-star"]','[data-bloom="starred"]','[data-bloom="chat-star"]','[data-bloom="queue"]','[data-bloom="recent"]','[data-bloom="quote-chip"]','[data-bloom="quote-back"]','[data-bloom="cls"]','[data-bloom="timestamp"]','[data-bloom="tooltip"]','[data-bloom="notices"]'].join(", "),pm=["data-bloom-greeting","data-bloom-placeholder","data-bloom-streamer-open","data-bloom-share","data-bloom-invite","data-bloom-csi-avatar","data-bloom-csi-sized"];function vn(){if(!(typeof document>"u"||!document.documentElement)){for(let e of document.querySelectorAll(fm))e.remove();for(let e of pm)for(let t of document.querySelectorAll(`[${e}]`))t.removeAttribute(e);for(let e of document.querySelectorAll("[data-bloom-text]"))e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size"),e.style.removeProperty("--bloom-text")}}function gm(e){if(Vr.warn("Replacing another Bloom++ instance",e.VERSION),e.destroy){e.destroy();return}for(let t of e.plugins?.values()??[]){try{t.stop?.()}catch(o){Vr.error("Failed to stop previous plugin",o)}t.styles="",t.start=void 0}So()}function wa(e){let t=oe,o=new Set;for(let n of[e,t.Bloom,t[Aa]])if(!(!n||o.has(n))){o.add(n);try{gm(n)}catch(r){Vr.error("Failed to retire Bloom++",r)}}vn()}function xa(e){let t=oe;try{delete t.Bloom}catch{}Object.defineProperty(t,"Bloom",{value:e,configurable:!0,writable:!0}),Object.defineProperty(t,Aa,{value:e,configurable:!0,writable:!0})}var ma={};im(ma,{VERSION:()=>nm,destroy:()=>sv,init:()=>da,plugins:()=>Z});var hm=new q("Dom");function a(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var Sa=document.createElement("template");function qa(e){return Sa.innerHTML=e.trim(),Sa.content.firstElementChild.cloneNode(!0)}var at=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),J=(e,t=document)=>[...t.querySelectorAll(e)].find(at)??null,bm=16,ym="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function xn(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([ym],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function Eo(e){document.hidden?setTimeout(e,bm):requestAnimationFrame(e)}function Ye(e){let t=!1;return()=>{t||(t=!0,Eo(()=>{t=!1;try{e()}catch(o){hm.error("Scheduled task failed",o)}}))}}var An=new Set,wn=[],qo,vm=Ye(()=>{let e=wn;wn=[];for(let t of An)t(e)});function M(e){return An.add(e),qo||(qo=new MutationObserver(t=>{wn.push(...t),vm()}),qo.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{An.delete(e),!An.size&&(qo?.disconnect(),qo=void 0,wn=[])}}var Am=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),Y=e=>!e.length||e.some(t=>!Am(t.target)),wm=e=>`"${e.replaceAll("\\","\\\\").replaceAll('"','\\"').replaceAll(`
`,"\\A ")}"`;function lt(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size"),e.style.removeProperty("--bloom-text");return}e.style.setProperty("--bloom-text",wm(t)),e.getAttribute("data-bloom-text")!==t&&e.setAttribute("data-bloom-text",t)}function f(e){return e}var Ea=new q("Storage");function Bt(e){try{return localStorage.getItem(e)??void 0}catch{return}}function Ot(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(o){Ea.warn("localStorage write failed",o)}}function Jr(e){try{localStorage.removeItem(e)}catch(t){Ea.warn("localStorage delete failed",t)}}function Ta(e,t){addEventListener("storage",o=>{o.key===e&&t(o.newValue)})}var Zr="BloomSettings",xm=100,Ke={plugins:{}},Sn=new Set,$r=new Set,Pt;function Ca(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=Se(t);return!k(t)||!k(t.plugins)||!Object.keys(t.plugins).length?null:t}function Ma(){let e=Ca(Bt(Zr));e&&(Ke.plugins=e.plugins)}var La=(e,t)=>`${e}
${t}`;function Xr(){Pt=void 0,$r.clear(),Ot(Zr,Ke)}function Sm(e){let t=Ca(e);if(!t)return;let o=[];for(let n of new Set([...Object.keys(Ke.plugins),...Object.keys(t.plugins)])){let r=Ke.plugins[n]??={},i=k(t.plugins[n])?t.plugins[n]:{};for(let s of new Set([...Object.keys(r),...Object.keys(i)]))$r.has(La(n,s))||JSON.stringify(r[s])===JSON.stringify(i[s])||(i[s]===void 0?delete r[s]:r[s]=i[s],o.push([n,s]))}for(let[n,r]of o)for(let i of Sn)i(n,r)}function _r(){Pt&&(clearTimeout(Pt),Xr())}function ka(e){let t=Object.keys(Ke.plugins).filter(o=>!e.has(o));if(!t.length)return t;for(let o of t)delete Ke.plugins[o];return clearTimeout(Pt),Xr(),t}var se=(e,t)=>Ke.plugins[e]?.[t];function qe(e,t,o){let n=Ke.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,$r.add(La(e,t)),clearTimeout(Pt),Pt=setTimeout(Xr,xm);for(let r of Sn)r(e,t)}function Rt(e){return Sn.add(e),()=>void Sn.delete(e)}function ei(e){return e.type==="component"?void 0:e.default}function g(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>se(t.pluginName,n)??(e[n]&&ei(e[n])),set:(o,n,r)=>(qe(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&se(t.pluginName,o)!==void 0&&qe(t.pluginName,o)}};return t}var Ia=e=>{let t=()=>{let o=se("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();qe("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},qn=Ia("pinnedPlugins"),En=Ia("starredPlugins");addEventListener("pagehide",_r);Ta(Zr,Sm);var Mo=new q("PluginManager"),Z=new Map,ct=new Set,oi=new Set,ti=new Set,To=new Map,qm=2880*60*1e3;function Ba(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),Z.set(t.name,t)}var Oa=()=>{let e=se("Settings","knownPlugins");return k(e)?e:null};function Pa(){let e=ka(new Set(Z.keys()));e.length&&Mo.info(`Dropped settings of removed plugins: ${e.join(", ")}`);let t=Oa(),o=Date.now(),n={...t},r=[...Z.values()].filter(i=>!i.hidden&&!i.required&&!(i.name in n));for(let i of r)n[i.name]=t?o:0;for(let i of Object.keys(n))Z.has(i)||delete n[i];JSON.stringify(n)!==JSON.stringify(t)&&qe("Settings","knownPlugins",n)}var Ra=e=>{let t=Oa()?.[e];return!!t&&Date.now()-t<qm},Da=e=>To.get(e);function Ha(){for(let e of ti)e()}function Na(e,t){let o=To.get(e);(t?o?.join(`
`)===t.join(`
`):!o)||(t?To.set(e,t):To.delete(e),Ha())}var Qe=e=>!!e.required||(se(e.name,"enabled")??!!e.enabledByDefault);var Co=e=>`plugin-${e.name}`;function Ua(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?It(Co(e),t):xo(Co(e))}function Em(e){if(!ct.has(e.name))try{Ua(e),e.start?.(),ct.add(e.name)}catch(t){xo(Co(e)),Mo.error(`Failed to start ${e.name}`,t)}}function ni(e){ct.delete(e.name),xo(Co(e));try{e.stop?.()}catch(t){Mo.error(`Failed to stop ${e.name}`,t)}}var Fa=e=>e.startAt??"HostReady";function Ga(e){if(Qe(e)){oi.has(Fa(e))&&Em(e);return}ni(e)}function Cn(e){oi.add(e);for(let t of Z.values())Fa(t)===e&&Ga(t);Mo.info(`${e}: ${[...ct].join(", ")}`)}function Ya(e,t){qe(e.name,"enabled",t),_r()}function Tm(){for(let e of Z.values())e.required||Qe(e)||(ct.has(e.name)?ni(e):xo(Co(e)))}var Tn;function Ka(){Tn?.(),Tn=M(()=>Tm())}function Qa(){Tn?.(),Tn=void 0;for(let e of Z.values())ni(e);ct.clear(),oi.clear(),To.clear()}function ja(e){return ti.add(e),()=>void ti.delete(e)}Rt((e,t)=>{let o=Z.get(e);if(o){if(t==="enabled"){typeof se(e,"enabled")=="boolean"&&Ga(o),Ha();return}if(ct.has(e))try{Ua(o),o.onSettingsChange?.(t)}catch(n){Mo.error(`Settings change failed for ${e}`,n)}}});var Wa=`/*
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
`;var Mm=new q("Events");function Mn(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){Mm.error(`Listener for ${String(t)} failed`,r)}}}}var u={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',sidebarConversationRow:"[data-sidebar-chatgpt-conversation-key]",sidebarIndicator:"[data-sidebar-indicator]",timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',readAloud:'button:is([aria-label="Read aloud" i], [aria-label^="Read aloud" i], [aria-label="Stop reading" i], [aria-label^="Stop reading" i], [aria-label="\u6717\u8BFB"], [aria-label^="\u6717\u8BFB"], [aria-label="\u505C\u6B62\u6717\u8BFB"], [data-testid*="read-aloud" i])',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',composerConversation:"[data-above-composer-conversation-id]",oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",modelTrigger:'[data-testid="model-switcher-dropdown-button"], button[aria-label="Model selector" i], button[aria-label="Select ChatGPT model" i]',modelItem:'[role="menu"] [data-testid^="model-switcher-"], [role="menuitem"][data-testid^="model-switcher-"], [role="menu"] [role="menuitemradio"], [role="menu"] [data-reasoning-slider]',effortSlider:'[role="menu"] [data-reasoning-slider]',homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]',headerMore:'button[aria-label="More" i], button[aria-label="\u66F4\u591A"]',rightPanel:"aside[data-app-shell-focus-area='right-panel']",summaryPanel:"[data-summary-panel-variant]"};var za=/[​-‍﻿]/g,ye=()=>J(u.composerInput),ut=e=>e instanceof HTMLElement&&e.matches(u.composerInput),$=(e=ye())=>e?.closest("form")??document.querySelector(u.oldComposerForm);function B(e=ye()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(za,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(za,"").trim()}var Lm=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function le(e,t=ye()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return Lm?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function Va(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:s,value:c}=e;return{first:!c.slice(0,i).includes(`
`),last:!c.slice(s).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var Ja=e=>{let t=$();return(t&&J(e,t))??J(e)},Dt=()=>Ja(u.stopButton),km=()=>{let e=Ja(u.sendButton);return e&&!e.matches(u.stopButton)?e:null};function Ln(){let e=km();if(e){e.disabled||e.click();return}ye()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var Za=()=>at(Dt());var _a=new q("Network"),Im=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,Bm=404,Om=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,In=1e3,Pm=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),z=Mn(),ii=new Map,$a=new Map,Rm=1,ve=e=>e?ii.get(e)??null:null;function kn(e){let t=ii.get(e);return t||ii.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var el=e=>e==="user"||e==="assistant";function tl(e){let t=e.author?.role;if(!e.id||!el(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(l=>typeof l=="string").join(`
`).trim(),i=n.filter(l=>k(l)&&l.content_type==="image_asset_pointer").length,s=e.metadata?.attachments,c=Array.isArray(s)&&s.length>0;return!r&&!i&&!c?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*In:null,text:r,hasFiles:c,imageCount:i}}var ol=e=>e.filter((t,o)=>t.role==="user"||e[o+1]?.role!=="assistant"),si=e=>e.map(t=>t.createTime).filter(t=>t!=null);function Dm(e,t){let o=si(e),n=si(t);return!o.length||!n.length?!1:Math.max(...o)<Math.min(...n)}function Hm(e){let t=si(e);if(t.length<2)return e;let[o]=t,n=o-e.length;return e.map((i,s)=>(i.createTime!=null&&(n=i.createTime),{message:i,index:s,time:i.createTime??n})).toSorted((i,s)=>i.time-s.time||i.index-s.index).map(i=>i.message)}function Nm(e,t){let o=t.filter(k).map(c=>k(c.message)?c.message:c);for(let c of o)c.id&&c.create_time&&e.times.set(c.id,c.create_time*In);let n=o.map(tl).filter(c=>c!=null),r=new Set(n.map(c=>c.id)),i=e.chain.filter(c=>!r.has(c.id)),s=Dm(n,i)?[...n,...i]:[...i,...n];return e.chain=ol(Hm(s)),e}function Um(e,t){if(!k(t)||!(k(t.mapping)||Array.isArray(t.messages)))return null;let o=kn(e);if(typeof t.title=="string"&&t.title&&(o.title=t.title),Array.isArray(t.messages))return Nm(o,t.messages);let n=t.mapping;for(let c of Object.values(n)){let l=c.message?.create_time;c.message?.id&&l&&o.times.set(c.message.id,l*In)}let r=[],i=new Set,s=typeof t.current_node=="string"?t.current_node:null;for(;s&&!i.has(s)&&n[s];){i.add(s);let c=n[s].message,l=c?tl(c):null;l&&r.push(l),s=n[s].parent??null}return r.length&&(o.chain=ol(r.toReversed())),o}function Fm(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}var ri=e=>typeof e=="string"?e:null;function Gm(e){let t=typeof e?.body=="string"?Se(e.body):null;if(!k(t))return{conversationId:null,parentId:null,userId:null};let[o]=Array.isArray(t.messages)?t.messages:[];return{conversationId:ri(t.conversation_id),parentId:ri(t.parent_message_id),userId:k(o)?ri(o.id):null}}function Ym(e,t){if(!k(e))return;typeof e.type=="string"&&Pm.has(e.type)&&(t.handoff=!0);let o=k(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(kn(e.conversation_id).title=e.title,z.emit("conversation",kn(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&el(n.author?.role)){let r=n.create_time*In;t.conversationId&&kn(t.conversationId).times.set(n.id,r),z.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function Km(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:s}=await o.read();if(i)break;r+=n.decode(s,{stream:!0});let c=r.split(`
`);r=c.pop()??"";for(let l of c){if(!l.startsWith("data:"))continue;let d=l.slice(5).trim();d&&d!=="[DONE]"&&Ym(Se(d),t)}}}async function Qm(e,t,o){let{conversationId:n}=t,r={conversationId:n,error:!1,handoff:!1};$a.set(e,n),z.emit("generate-start",{requestId:e,...t});try{let i=await o;i.ok?i.headers.get("content-type")?.includes("event-stream")&&await Km(i.clone(),r):r.error=!0}catch(i){let s=i instanceof DOMException&&i.name==="AbortError";r.handoff||=s,r.error||=!s}finally{$a.delete(e),z.emit("generate-end",{requestId:e,...r})}}async function jm(e,t){try{let o=await t;if(o.status===Bm&&z.emit("conversation-missing",{id:e}),!o.ok)return;let n=Um(e,await o.clone().json());n&&z.emit("conversation",n)}catch(o){_a.debug("Conversation read skipped",o)}}function Wm(e,t,o){let n=Fm(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&Im.test(n.pathname)){Qm(Rm++,Gm(t),o);return}let i=r==="GET"&&n.pathname.match(Om)?.[1];i&&jm(i,o)}var Xa=!1;function nl(){if(Xa)return;Xa=!0;let e=oe.fetch,t=function(o,n){let r=e.call(this??oe,o,n);try{Wm(o,n,r)}catch(i){_a.error("Fetch tap failed",i)}return r};oe.fetch=typeof exportFunction=="function"?exportFunction(t,oe):t}var zm="__reactContainer$",rl="__reactFiber$";function Bn(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var ai=(e,t)=>Object.keys(e.wrappedJSObject??e).some(o=>o.startsWith(t)),Ae=e=>!ai(document,zm)||ai(e,rl);function dt(){return document.body?Promise.resolve():new Promise(e=>{let t=new MutationObserver(()=>{document.body&&(t.disconnect(),e())});t.observe(document,{childList:!0,subtree:!0})})}async function il(){await dt();let e=Date.now()+8e3;for(;!ai(document.body,rl)&&Date.now()<e;)await new Promise(t=>setTimeout(t,100))}var Vm=new q("Route"),sl=/\/c\/(?!local-)([\w-]+)/,Jm=500,ui=e=>{try{return new URL(e,location.origin).pathname.match(sl)?.[1]??null}catch{return null}},b=()=>location.pathname.match(sl)?.[1]??null,Ht=()=>location.pathname==="/",Zm=/^\/g\/g-p-[^/]+(?:\/project)?\/?$/,Dn=()=>Zm.test(location.pathname),Ee=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",Pn=new Set,Rn=location.href,ci=b(),On;function li(){if(location.href===Rn)return;let e={prevHref:Rn,href:location.href,prevId:ci,id:b()};Rn=e.href,ci=e.id;for(let t of Pn)try{t(e)}catch(o){Vm.error("Route listener failed",o)}}function $m(){let e=new AbortController,{navigation:t}=oe;t?.addEventListener("currententrychange",()=>queueMicrotask(li),{signal:e.signal}),addEventListener("popstate",li,{signal:e.signal});let o=setInterval(li,Jm);return()=>{e.abort(),clearInterval(o)}}function pe(e){return Pn.add(e),On||(Rn=location.href,ci=b(),On=$m()),()=>{Pn.delete(e),!Pn.size&&(On?.(),On=void 0)}}var Xm=["data-turn","data-message-author-role"],_m=/:(user|assistant)$/,di=`${u.messageUnit}, ${u.oldMessage}`,mi=e=>e==="user"||e==="assistant",ul=()=>!!document.querySelector(u.timelineScroll),dl=()=>!!J(u.timelineScroll),ml=()=>b()??document.querySelector(u.composerConversation)?.getAttribute("data-above-composer-conversation-id")??"",Nt=()=>ul()?J(u.timelineScroll):document;function ko(){if(ul())return J(u.timelineScroll);let e=document.querySelector(u.turn);for(let t=e?.parentElement;t;t=t.parentElement){let{overflowY:o}=getComputedStyle(t);if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight)return t}return document.scrollingElement}var Ut=e=>e.getAttribute("data-chatgpt-search-unit-key")?.match(_m)?.[1]??null,fl=e=>[...e.querySelectorAll(u.searchUnit)].filter(t=>Ut(t)&&!t.parentElement?.closest(u.searchUnit)),al=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function Lo(e){let t=al(e);return t.length?t:[...new Set([...e.querySelectorAll(di)].flatMap(al))]}function Ft(e=Nt()){if(!e)return[];let t=fl(e);return t.length?t:[...e.querySelectorAll(di)].filter(o=>!o.parentElement?.closest(di))}function ef(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function tf(e){for(let t of Xm){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(mi(o))return o}return e.querySelector(u.markdown)||e.querySelector(u.generatedImage)?"assistant":null}var of=e=>!e.parentElement?.closest(u.turn);function je(){let e=ve(b())?.chain??[];return[...Nt()?.querySelectorAll(u.turn)??[]].filter(of).flatMap(o=>{let n=fl(o),r=n.length?n.map(i=>({el:i,known:Ut(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=d=>!n.some(m=>m.contains(d))&&y(d.textContent??""),s=[...o.querySelectorAll(u.assistantMarkdown)].find(d=>i(d)&&!Hn.test(y(d.textContent??""))),c=[...o.querySelectorAll(u.activityHeader)].findLast(i),l=s??c;l&&r.push({el:l,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?Lo(o):Ft(o).flatMap(Lo),s=n??tf(o)??ef(i,e)??(r%2?"assistant":"user"),c=o.closest(u.turn)??o,l=!o.closest(u.searchUnit)&&!!c.querySelector(u.turnBusy),d=s==="assistant"&&(o.matches(u.turnBusy)||!!o.querySelector(u.turnBusy)||l);return{el:o,role:s,messageIds:i,streaming:d}})}var nf="[data-bloom], .sr-only",pl=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,Hn=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,ll=new WeakMap;function Gt(e){let o=(e.el.closest(u.turn)??e.el).textContent?.length??0,n=ll.get(e.el);if(n?.length===o)return n.summary;let r=rf(e);return ll.set(e.el,{length:o,summary:r}),r}function cl(e){let t=new Set,o=[];for(let n of e.querySelectorAll(u.assistantMarkdown)){if(n.closest(u.searchUnit))continue;let r=y(n.textContent??"");!r||Hn.test(r)||pl.test(r)||t.has(r)||(t.add(r),o.push(r))}return o}function rf(e){let t=e.el.querySelectorAll(u.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.closest(u.turn);if(e.role==="assistant"&&o&&e.el.matches(u.assistantMarkdown)&&!e.el.closest(u.searchUnit)){let l=cl(o);if(l.length)return l.join(" \xB7 ")}let n=e.el.querySelector(e.role==="assistant"?u.markdown:".whitespace-pre-wrap")??e.el,i=[...n.querySelectorAll(nf)].map(l=>y(l.textContent??"")).filter(Boolean).reduce((l,d)=>l.replace(d,`
`),n.innerText||n.textContent||""),s=i.split(`
`).map(y).filter(l=>l&&!pl.test(l)&&!Hn.test(l));if(s.length)return s.join(" ");if(e.role==="assistant"&&o){let l=cl(o);if(l.length)return l.join(" \xB7 ")}let c=i.split(`
`).map(y).filter(l=>Hn.test(l));return c.length?c.at(-1)??"":e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function Nn(e){return e.text?y(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var fi=e=>e.matches(u.timelineScroll)&&getComputedStyle(e).flexDirection==="column-reverse";var sf=250,af=400,lf=6e4,cf=5e3,uf=`:is(${u.turn}) :is(${u.turnBusy})`,df="data-sidebar-chatgpt-conversation-key",yl="data-sidebar-indicator",mf=/:([0-9a-f-]{36})$/i,x=Mn(),Gn=new Set,pi=new Set,We=!1,vl=0,Yt=null,Kt=!1,Un=!1,Io=0,Yn=!1,Bo=null,gl=!1,hl=new Map,H=()=>({generating:We,conversationId:b()}),Al=()=>Za()||!!Nt()?.querySelector(uf);function ff(){let e=Al();return e?Un||(Io=0,Yn=!0):Un=!1,[...Gn].some(t=>!pi.has(t))||e&&!Un||Date.now()<Io}function pf(){return Bo?.error?"error":Kt?"stopped":"done"}function gf(){Yt=null,We=!1,Yn=!1,x.emit("fall",{conversationId:b(),outcome:pf()}),Kt=!1,Bo=null}function wl(){let e=ff();e&&!We&&(We=!0,vl=Date.now(),Kt=!1,Bo=null,x.emit("rise",{conversationId:b()})),e||!We?Yt=null:Yt==null?Yt=Date.now():Date.now()-Yt>=af&&gf()}function Fn(){wl(),x.emit("tick",H())}function hf({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(We||Date.now()-vl<lf);if(!o&&We){for(let n of Gn)pi.add(n);Un=Al(),Io=0,Yn=!1,Yt=null,We=!1,Kt=!1,Bo=null,x.emit("fall",{conversationId:e,outcome:"left"})}x.emit("context",{prevId:e,id:t,migrated:o}),Fn()}function bl(){let e=b();for(let t of document.querySelectorAll(u.sidebarConversationRow)){let o=t.getAttribute(df)?.match(mf)?.[1];if(!o)continue;let n=t.querySelector(u.sidebarIndicator)?.getAttribute(yl)??"",r=hl.get(o);r!==n&&(hl.set(o,n),r==="working"&&n==="unread"&&o!==e&&x.emit("background",{conversationId:o}))}}function bf(e){e.target instanceof Element&&e.target.closest(u.stopButton)&&(Kt=!0,Io=0)}function xl(){gl||(gl=!0,z.on("generate-start",({requestId:e})=>{Gn.add(e),Fn()}),z.on("generate-end",e=>{Gn.delete(e.requestId),!pi.delete(e.requestId)&&(Bo=e,Io=e.handoff&&!e.error&&!Kt&&!Yn?Date.now()+cf:0,Fn())}),pe(hf),document.addEventListener("click",bf,!0),xn(Fn,sf),Bn().then(()=>{M(wl),M(bl),new MutationObserver(bl).observe(document.body,{subtree:!0,attributes:!0,attributeFilter:[yl]})}))}var S=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,yf="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",vf={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${yf}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:S('<path d="M18 6 6 18M6 6l12 12"/>'),gear:S('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:S('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:S('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:S('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:S('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:S('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:S('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:S('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:S('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:S('<path d="m6 9 6 6 6-6"/>'),play:S('<path d="M7 4v16l13-8z"/>'),plus:S('<path d="M12 5v14M5 12h14"/>'),check:S('<path d="m5 12 5 5 9-10"/>'),alert:S('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:S('<path d="M4 5h16v11H9l-5 4z"/>'),layout:S('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:S('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:S('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:S('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:S('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:S('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:S('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:S('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:S('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:S('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:S('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:S('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:S('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:S('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:S('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:S('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),folder:S('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),ghost:S('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},T=e=>qa(vf[e]);var Sl=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

.bloom-notice-stack {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    z-index: 2147483000;
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
`;var wf=6e3,xf=4,Sf={info:"info",success:"check",warning:"alert",error:"alert"},Te=C("bloom-notice-"),Qt=new Map,Oo;function qf(){return!document.body||!Ae(document.body)?null:(It("notices",Sl),Oo?.isConnected||(Oo=a("div",{class:`${Te("stack")} bloom-root`,attrs:{"data-bloom":"notices",role:"region","aria-label":"Bloom++ notices","aria-live":"polite"}}),document.body.append(Oo)),Oo)}function ql(e){clearTimeout(e.timer),!(e.remaining<=0)&&(e.startedAt=Date.now(),e.timer=setTimeout(()=>ze(e.key),e.remaining))}function Ef(e){e.timer!==void 0&&(clearTimeout(e.timer),e.timer=void 0,e.remaining=Math.max(1,e.remaining-(Date.now()-e.startedAt)))}function Tf(e,t){let o=t.type??"info",n=a("button",{class:Te("close"),attrs:{type:"button","aria-label":"Dismiss","data-bloom":"control"},on:{click:s=>{s.stopPropagation(),ze(e)}}},T("close")),r=t.action&&a("button",{class:Te("action"),text:t.action.label,attrs:{type:"button","data-bloom":"control"},on:{click:s=>{s.stopPropagation(),t.action?.onClick(),ze(e)}}}),i=a("div",{class:`${Te("card")} ${Te(o)}`,attrs:{role:o==="error"?"alert":"status","data-bloom-notice":e}},a("span",{class:Te("icon")},T(Sf[o])),a("div",{class:Te("body")},a("div",{class:Te("title"),text:t.title}),t.message&&a("div",{class:Te("message"),text:t.message})),r,n);return t.onClick&&(i.classList.add(Te("clickable")),i.addEventListener("click",()=>{t.onClick?.(),ze(e)})),i}function Kn(e){let t=e.key??it("notice"),o=qf();if(!o)return t;let n=Tf(t,e),r=Qt.get(t),i={key:t,el:n,options:e,remaining:e.duration??wf,startedAt:Date.now()};n.addEventListener("pointerenter",()=>Ef(i)),n.addEventListener("pointerleave",()=>ql(i)),r?(clearTimeout(r.timer),r.el.replaceWith(n)):o.append(n),Qt.set(t,i),ql(i);for(let[s]of[...Qt].slice(0,Math.max(0,Qt.size-xf)))ze(s);return t}function ze(e){let t=Qt.get(e);t&&(Qt.delete(e),clearTimeout(t.timer),t.el.remove(),t.options.onClose?.())}var Cf=new q("Landmarks"),Mf=2e3,Lf=1e4,kf=1024,El={thread:{applies:()=>!!b(),selectors:[u.turn]},composer:{applies:()=>Ht()||Dn()||!!b(),selectors:[u.composerInput]},sidebar:{applies:()=>innerWidth>=kf,selectors:[u.sidebarScroll,u.rail,u.oldSidebar,u.oldRail]}},If={BetterNavigator:["thread"],BetterQuotes:["thread"],MessageTimestamps:["thread"],StarChats:["thread"],UserQuotes:["thread"],ComposerOpacity:["composer"],Continue:["composer"],InputHistory:["composer"],PromptQueue:["composer"],ChatListStatus:["sidebar"],CustomSidebarIdentity:["sidebar"],NoSidebarIdentity:["sidebar"],SidebarIdentityOpacity:["sidebar"]},jt=new Map,Qn=new Set;function Bf(){let e=Date.now();for(let[t,{applies:o,selectors:n}]of Object.entries(El)){if(!o()){jt.delete(t);continue}if(n.some(i=>document.querySelector(i))){jt.delete(t),Qn.delete(t);continue}let r=jt.get(t)??e;jt.set(t,r),e-r>=Lf&&Qn.add(t)}}function Of(){let e=[];for(let[o,n]of Object.entries(If)){let r=Z.get(o),i=r&&Qe(r)?n.filter(s=>Qn.has(s)):[];Na(o,i.length?i.flatMap(s=>El[s].selectors):null),i.length&&e.push(o)}if(!e.length)return;let t=`2.0.98|${e.join(",")}`;se("Settings","landmarkNotice")!==t&&(qe("Settings","landmarkNotice",t),Cf.warn(`Page anchors missing for ${e.join(", ")}`),Kn({key:"landmarks",type:"warning",title:"Bloom++ can't find parts of this page",message:`${e.join(", ")} may not work until Bloom++ is updated. Details are in Bloom++ settings.`,duration:0}))}function Pf(){if(document.hidden){jt.clear();return}Bf(),Of()}function Tl(){return jt.clear(),Qn.clear(),xn(Pf,Mf)}var Cl={BetterNavigator:1793350808e3,BetterQuotes:179333264e4,ChatListStatus:1793351872e3,ChatStateFavicons:1790623094e3,Cleaner:1793267811e3,CompleteToast:1793354069e3,ComposerOpacity:1793344667e3,Continue:1790939902e3,CustomSidebarIdentity:1790658669e3,GreetingCustomizer:1793350808e3,InputHistory:1793351708e3,MessageTimestamps:1791080494e3,NoDictation:1793335268e3,NoShareLink:1790658669e3,NoSidebarIdentity:1790616549e3,PromptQueue:1793267321e3,RecentTopics:1793354069e3,ResponseNotification:1793354069e3,Settings:1793364201e3,SidebarIdentityOpacity:1790682605e3,StarChats:1793350808e3,StreamerMode:1793344667e3,TemporaryChat:1792014624e3,UserQuotes:1793345744e3,WiderChat:179333264e4};var ce="data-bloom-tip",gi=6,hi=8,mt,Ml=null;function Wt(e){if(e===Ml)return;if(Ml=e,!e){mt?.remove();return}mt??=a("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),mt.textContent=e.getAttribute(ce),document.body.append(mt);let t=e.getBoundingClientRect(),{width:o,height:n}=mt.getBoundingClientRect(),r=t.bottom+gi+n<=innerHeight-hi;mt.style.left=`${fe(t.left+t.width/2-o/2,hi,innerWidth-o-hi)}px`,mt.style.top=`${r?t.bottom+gi:t.top-gi-n}px`}var Ll=e=>e instanceof Element?e.closest(`[${ce}]`):null;function kl(){let e=new AbortController,t={passive:!0,signal:e.signal};return document.addEventListener("pointerover",o=>Wt(Ll(o.target)),t),document.addEventListener("pointerout",o=>o.relatedTarget||Wt(null),t),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&Wt(Ll(o.target)),t),document.addEventListener("focusout",()=>Wt(null),t),document.addEventListener("pointerdown",()=>Wt(null),t),()=>{e.abort(),Wt(null)}}function Ve(e,t,o,n=!1){let r=a("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let s=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(s)),t(s)===!1&&r.setAttribute("aria-checked",String(!s))}),r}function N(e,t,o){return a("button",{class:yn("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button","data-bloom":"control"},on:{click:t}})}function U(e,t,o,n){let r=a("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":t,"data-bloom":"control",[ce]:t},on:{click:o}},T(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function jn(e,t,o,n,r,i){let s=a("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});s.value=String(e);let c=a("output",{text:`${s.value}${r}`});return s.addEventListener("input",()=>{c.textContent=`${s.value}${r}`,i(Number(s.value))}),a("div",{class:"bloom-slider"},s,c)}function bi(e,t,o){let n=a("select",{class:"bloom-select"},...t.map(r=>a("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function Po(e,t,o="",n="text"){let r=a("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var Rf=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,Il=/\S+@\S+\.\S+/,Df=3,Hf=/^\/g\/(g-p-[^/]+)\//,Nf=/^g-p-[0-9a-f]+-?/i,Bl=e=>!!e.closest(".sr-only"),yi=e=>!!e?.querySelector(u.menuButton);function Ol(){return[...document.querySelectorAll(u.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(yi)).filter(e=>e!=null)}function Pl(){let e=[...document.querySelectorAll(u.oldProfile)];if(e.length)return e.map(o=>{let n=o.parentElement?.children.length===1?o.parentElement:o;return{kind:"profile",anchor:n,insert:r=>n.before(r)}});let t=Ol().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(u.rail)){let n=[...o.children].find(yi);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}var vi=e=>!e.closest("[data-bloom]")&&(!!e.querySelector("img, [class*=rounded-full]")||Nl(e).some(t=>!Bl(t))),Rl=e=>[...e.parentElement?.children??[]].find(t=>t!==e&&t instanceof HTMLElement&&vi(t))??null;function Dl(){let e=[...document.querySelectorAll(u.oldProfile)];return e.length?e:[...Ol(),...[...document.querySelectorAll(u.rail)].map(o=>[...o.children].findLast(yi))].map(o=>[...o?.querySelectorAll(u.menuButton)??[]].findLast(n=>vi(n)||Rl(n))).filter(o=>o!=null)}var Hl=()=>Dl().map(e=>vi(e)?e:Rl(e)).filter(e=>e!=null);function Nl(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!y(t.textContent??"")&&!(t instanceof SVGElement))}var Uf=e=>{if(/rounded-full/.test(e.getAttribute("class")??""))return!0;if(!e.clientWidth)return!1;let{borderRadius:t}=getComputedStyle(e);return t.includes("%")||Number.parseFloat(t)>=e.clientWidth/2};function Wn(e,t,o){for(let n of e.querySelectorAll(`[${t}]`))n!==o&&n.removeAttribute(t);o&&!o.hasAttribute(t)&&o.setAttribute(t,"")}function Ff(e,t){if(y(e.textContent??"").length>Df)return null;let o=e.closest("button");for(let n=e;n&&n!==t&&n!==o;n=n.parentElement)if(Uf(n))return n;return null}function Ai(e,t){e.hasAttribute(`data-bloom-${t}`)||e.setAttribute(`data-bloom-${t}`,"");let o=e.querySelector("img:not([data-bloom] img)"),n=Nl(e),r=o?null:n.map(m=>Ff(m,e)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),s=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");Wn(e,`data-bloom-${t}-avatar`,s);let c=n.filter(m=>!s?.contains(m)&&!Bl(m)),l=c.find(m=>Rf.test(y(m.textContent??""))),d=c.find(m=>Il.test(m.textContent??""));Wn(e,`data-bloom-${t}-plan`,l),Wn(e,`data-bloom-${t}-email`,d),Wn(e,`data-bloom-${t}-name`,c.find(m=>m!==l&&m!==d))}function Gf(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function zn(){return Dl().map(Gf).find(e=>e!=null)??[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&(Il.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var ft=e=>[...document.querySelectorAll(u.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&ui(t.href)===e);function Ul(e){let t=ft(e).find(o=>y(o.textContent??""));return t?y(t.textContent??""):null}function Fl(e){let t=new URL(e,location.origin).pathname.match(Hf)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!ui(n.href)&&y(n.textContent??""));return o?y(o.textContent??""):t.replace(Nf,"").replaceAll("-"," ")||null}var wi=0,Vn;function Yf(e){if(!Y(e))return;for(let o of Hl())Ai(o,"profile");let t=zn();t&&Ai(t,"menu")}function Ce(){wi++;let e=!0;return dt().then(()=>{e&&wi&&!Vn&&(Vn=M(Yf))}),()=>{e&&(e=!1,!--wi&&(Vn?.(),Vn=void 0))}}var xi=["showSidebarEntry","showSidebarEntryOnHover","showAccountMenuEntry"],zt={showSidebarEntry:!0,showSidebarEntryOnHover:!1,showAccountMenuEntry:!1},Si=e=>Object.hasOwn(zt,e),qi=e=>se("Settings",e)??zt[e],Gl=(e,t)=>!Si(e)||t!==!1||xi.some(o=>o!==e&&qi(o));var Kf=new q("Themes"),Qf=/^https:\/\/\S+\.css(?:[?#]|$)/i,jf=/\/\*\*[^]*?@name[ \t]+([^\n*]+)/,K=g({themes:{type:"custom",default:[]},quickCss:{type:"custom",default:""},quickCssEnabled:{type:"custom",default:!0}});async function Yl(e){let t=new TextDecoder().decode(await bn(e));if(!t.trim())throw new Error("Theme file is empty.");return t}var Jn=(e,t)=>{K.store.themes=K.store.themes.map(o=>o.id===e?{...o,...t}:o)},Kl=e=>{K.store.themes=K.store.themes.filter(t=>t.id!==e)};async function Ql(e){if(!Qf.test(e))throw new Error("Enter an https URL that ends in .css.");if(K.store.themes.some(n=>n.url===e))throw new Error("This theme is already added.");let t=await Yl(e),o=t.match(jf)?.[1]?.trim()||decodeURIComponent(new URL(e).pathname.split("/").pop()??e).replace(/\.css$/i,"").replaceAll(/[-_]/g," ");K.store.themes=[...K.store.themes,{id:it("theme"),name:o,url:e,css:t,enabled:!0}]}function jl(e,t,o){if(!t.trim())throw new Error("Name is required.");if(!o.trim())throw new Error("CSS is required.");e?Jn(e,{name:t.trim(),css:o}):K.store.themes=[...K.store.themes,{id:it("theme"),name:t.trim(),css:o,enabled:!0}]}async function Wf(){await Promise.all(K.store.themes.filter(e=>e.url&&e.enabled).map(async({id:e,url:t,name:o})=>{try{let n=await Yl(t??"");K.store.themes.find(r=>r.id===e)?.css!==n&&Jn(e,{css:n})}catch(n){Kf.warn(`Failed to refresh theme "${o}"`,n)}}))}var Wl=f({name:"Themes",description:"Applies Bloom++ themes and Quick CSS.",authors:["Bloom contributors"],tags:[],icon:"spark",required:!0,hidden:!0,startAt:"Init",settings:K,styles:()=>[...K.store.themes.filter(e=>e.enabled).map(e=>e.css),K.store.quickCssEnabled?K.store.quickCss:""].join(`
`),start(){Wf()}});var Q=C("bloom-settings-"),zf=3e3,zl=(e,t)=>{let o=a("textarea",{class:`bloom-input ${Q("css")}`,attrs:{spellcheck:"false",placeholder:"Paste your CSS here...","aria-label":t}});return o.value=e,o},Ei=(e,t)=>a("div",{class:Q("section-header")},a("div",{class:Q("field-label"),text:e}),a("div",{class:Q("field-desc"),text:t}));function Vl(){let{quickCss:e,quickCssEnabled:t}=K.store,o=zl(e,"Quick CSS");return o.disabled=!t,o.addEventListener("input",()=>{K.store.quickCss=o.value}),a("div",{class:Q("section")},a("div",{class:Q("field","field-inline")},Ei("Quick CSS","Your own CSS, applied on every page as you type."),Ve(t,n=>{K.store.quickCssEnabled=n,o.disabled=!n},"Enable Quick CSS")),o)}function Jl(){let e=a("div",{class:Q("section")}),t=null,o=()=>a("div",{class:Q("section-error"),attrs:{role:"alert"}});function n(){let l=a("input",{class:"bloom-input",attrs:{type:"url",placeholder:"https://raw.githubusercontent.com/...","aria-label":"Theme URL"}}),d=o(),m=N("Add",async()=>{m.disabled=!0,d.textContent="";try{await Ql(l.value.trim()),c()}catch(h){d.textContent=h instanceof Error?h.message:String(h),m.disabled=!1}});return a("div",{class:Q("section-block")},Ei("Online themes","Load a theme from a .css URL. It is fetched again on every page load, so updates apply."),a("div",{class:Q("section-row")},l,m),d)}function r(){let l=t==="new"?null:t,d=a("input",{class:"bloom-input",attrs:{placeholder:"My theme","aria-label":"Theme name"}});d.value=l?.name??"";let m=zl(l?.css??"","Theme CSS"),h=o();return a("div",{class:Q("section-block")},d,m,h,a("div",{class:Q("section-row")},N("Save",()=>{try{jl(l?.id??null,d.value,m.value),t=null,c()}catch(D){h.textContent=D instanceof Error?D.message:String(D)}}),N("Cancel",()=>{t=null,c()})))}function i(){return a("div",{class:Q("section-block")},a("div",{class:Q("field","field-inline")},Ei("Local themes","CSS stored only on this device."),!t&&N("New local theme",()=>{t="new",c()})),t&&r())}function s(l){let d,m=U("trash","Remove",()=>{if(d){clearTimeout(d),Kl(l.id),c();return}m.setAttribute("aria-pressed","true"),m.setAttribute(ce,"Click again to remove"),d=setTimeout(()=>{d=void 0,m.removeAttribute("aria-pressed"),m.setAttribute(ce,"Remove")},zf)});return a("div",{class:Q("theme")},a("div",{class:Q("theme-text")},a("div",{class:`${Q("card-name")} bloom-truncate`,text:l.name}),a("div",{class:`${Q("field-desc")} bloom-truncate`,text:l.url??"Local"})),l.url?U("copy","Copy URL",()=>void hn(l.url??"")):U("edit","Edit",()=>{t=l,c()}),m,Ve(l.enabled,h=>Jn(l.id,{enabled:h}),`Enable ${l.name}`))}function c(){let{themes:l}=K.store;e.replaceChildren(n(),i(),l.length?a("div",{class:Q("themes")},...l.map(s)):a("div",{class:Q("empty"),text:"No themes yet."}))}return c(),e}var Vf=new q("SettingsPanel"),p=C("bloom-settings-"),Jf=10080*60*1e3,Zf=3e3,Zl="Toggle features. Some need a reload. Click the sliders icon to configure.",$f="Can't find its place on this page. It may need an update.",Xf=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],_f=[{id:"plugins",label:"Plugins"},{id:"themes",label:"Themes"},{id:"css",label:"Quick CSS"}],ep=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],tp={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},Xl=new Set(["chat","ui","privacy"]),V=null,Ro="plugins",gt="all",Ti="all",Zn="",Ci=[],_l=()=>[...Z.values()].filter(e=>!e.hidden),op=e=>!!e.updatedAt&&Date.now()-e.updatedAt<Jf;function np(e){switch(gt){case"favorites":return En.has(e.name);case"recent":return op(e);case"all":return!0;case"other":return!e.tags.some(t=>Xl.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(gt)}}function rp(e){switch(Ti){case"all":return!0;case"enabled":return Qe(e);case"disabled":return!Qe(e)}}function ip(e){let t=Zn.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function sp(e){let t=qn.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return gt==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var ec=e=>e.settings?.def??{},ki=e=>Object.values(ec(e)).some(t=>t.type!=="custom");function ap(e,t,o){let n=se(e.name,t)??ei(o),r=i=>{if(e.name==="Settings"&&!Gl(t,i))return!1;qe(e.name,t,i)};switch(o.type){case"boolean":return Ve(n,r,o.description??t);case"slider":return jn(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return bi(n,o.options,r);case"string":return Po(n,r,o.placeholder);case"number":return Po(String(n),i=>r(Number(i)),"","number");case"component":{let i=a("div",{class:p("component")});return Ci.push(o.render(i)),i}case"custom":return null}}var lp=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function Ii(e){if(!V)return;let t=Object.entries(ec(e)).filter(([,i])=>i.type!=="custom").map(([i,s])=>{let c=ap(e,i,s),l=s.type==="boolean",d=s.type!=="component"&&a("div",{class:p("field-label"),text:lp(i)}),m=s.description&&a("div",{class:p("field-desc"),text:s.description});return a("div",{class:p("field",l?"field-inline":"field-stacked")},(d||m)&&a("div",{class:p("field-text")},d,m),c)}),o,n=N("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},Zf);return}clearTimeout(o),e.settings?.reset(),Vt(),Ii(e)},"danger"),r=a("div",{class:p("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&Vt()}},a("div",{class:p("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},a("div",{class:p("popup-header")},a("div",{class:p("card-icon")},T(e.icon)),a("div",{class:p("popup-title")},a("div",{class:p("card-name"),text:e.name}),a("div",{class:p("popup-authors"),text:e.authors.join(", ")})),U("close","Close",Vt)),a("p",{class:p("popup-desc"),text:e.description}),a("div",{class:p("fields")},...t),a("div",{class:p("popup-footer")},n)));V.querySelector(`.${p("modal")}`)?.append(r)}function Vt(){for(let e of Ci)e();Ci=[],V?.querySelector(`.${p("popup-backdrop")}`)?.remove()}function $l(e){let t=Qe(e),o=En.has(e.name),n=qn.has(e.name),r=!!e.required,i=Da(e.name);return a("div",{class:[p("card",t?"card-on":"card-off"),r?p("card-required"):""].filter(Boolean).join(" ")},a("div",{class:p("card-top")},a("div",{class:p("card-icon")},T(e.icon)),a("div",{class:p("card-actions")},U("star",o?"Unstar":"Star",()=>{En.toggle(e.name),pt()},o),r?null:U("pin",n?"Unpin":"Pin to top",()=>{qn.toggle(e.name),pt()},n),r?a("span",{class:p("required-mark"),attrs:{"aria-label":"Required",[ce]:"This plugin is required for Bloom++ to work"}},T("alert")):null,ki(e)&&U("gear","Settings",()=>Ii(e)),Ve(t,s=>Ya(e,s),r?`${e.name} is required`:`Enable ${e.name}`,r))),a("div",{class:p("card-name")},e.name,Ra(e.name)&&a("span",{class:p("new-badge"),text:"New"})),a("div",{class:p("card-desc"),text:e.description,title:e.description}),i&&a("div",{class:p("card-issue"),attrs:{[ce]:`Missing: ${i.join(", ")}`}},T("alert"),a("span",{text:$f})),a("div",{class:p("card-footer"),text:e.authors.join(", ")}))}function tc(){let e=_l().some(o=>!o.tags.some(n=>Xl.has(n)));V?.querySelector(`.${p("tabs")}`)?.replaceChildren(...Xf.filter(o=>o.id!=="other"||e).map(o=>a("button",{class:p("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===gt)},on:{click:()=>{gt=o.id,tc(),pt()}}})))}function pt(){if(!V)return;let e=_l().filter(np),t=V.querySelector(`.${p("search")} input`);t&&(t.placeholder=`Search ${gn(e.length,"plugin")}...`);let o=sp(e.filter(d=>ip(d)&&rp(d))),n=gt==="all",r=n?o.filter(d=>!d.required):o,i=n?o.filter(d=>d.required):[],s=[...r.map($l),...i.length?[a("div",{class:p("required-break"),attrs:{role:"separator"}}),...i.map($l)]:[]],c=Zn.trim()?"No plugins match your search.":tp[gt]??"No plugins available.";V.querySelector(`.${p("grid")}`)?.replaceChildren(...s.length?s:[a("div",{class:p("empty"),text:c})])}function cp(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),V?.querySelector(`.${p("popup-backdrop")}`)?Vt():Jt())}var oc,Mi;function Li(){let e=V?.querySelector(`.${p("body")}`);if(!V||!e)return;for(let o of V.querySelectorAll(`.${p("nav-item")}`))o.setAttribute("aria-selected",String(o.getAttribute("data-section")===Ro));if(Vt(),Ro==="themes"){e.replaceChildren(Jl());return}if(Ro==="css"){e.replaceChildren(Vl());return}let t=a("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});t.value=Zn,t.addEventListener("input",()=>{Zn=t.value,pt()}),e.replaceChildren(a("div",{class:p("tabs"),attrs:{role:"tablist"}}),a("div",{class:p("toolbar")},a("label",{class:p("search")},T("search"),t),bi(Ti,ep,o=>{Ti=o,pt()})),a("div",{class:p("grid")})),tc(),pt(),t.focus()}function Zt(e,t){e&&(Ro=e),V?Li():up();let o=t&&Z.get(t);o&&Ii(o)}function up(){V=a("div",{class:`bloom-root ${p("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:e=>e.target===e.currentTarget&&Jt()}},a("div",{class:p("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},a("div",{class:p("header")},a("div",{class:p("logo")},T("bloom")),a("h2",{class:p("title"),text:"Bloom++"}),a("span",{class:p("hint"),attrs:{"aria-label":Zl,tabindex:"0",[ce]:Zl}},T("info")),a("div",{class:p("nav"),attrs:{role:"tablist"}},..._f.map(e=>a("button",{class:p("nav-item"),text:e.label,attrs:{type:"button",role:"tab","data-section":e.id},on:{click:()=>{Ro=e.id,Li()}}}))),a("span",{class:p("version"),text:"v2.0.98"}),U("close","Close",Jt)),a("div",{class:p("body")}))),V.addEventListener("keydown",e=>e.stopPropagation()),Mi=new AbortController,document.addEventListener("keydown",cp,{capture:!0,signal:Mi.signal}),document.body.append(V),Li(),oc=ja(pt),Vf.debug("Opened")}function Jt(){Vt(),Mi?.abort(),oc?.(),V?.remove(),V=null}var $n=()=>V?Jt():Zt();var nc=`/*
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
`;var ue=C("bloom-entry-"),mp=4,Oi="--bloom-entry-x",Pi=1,rc=4,ic=8,fp=150,ge=g({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar.",default:zt.showSidebarEntry},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:zt.showSidebarEntryOnHover},showAccountMenuEntry:{type:"boolean",description:"Show Bloom++ at the top of the account menu.",default:zt.showAccountMenuEntry},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:e=>(e.append(N("Reset position",()=>{ge.store.entryPosition=Pi})),()=>e.replaceChildren())},showBloomMenu:{type:"boolean",description:"Hovering the Bloom++ row in the account menu opens a menu with Plugins, Themes, Quick CSS and plugin settings.",default:!0},menuPlugins:{type:"component",description:"Plugins listed in that menu.",render:e=>(e.append(...lc().map(t=>a("div",{class:ue("menu-pick")},T(t.icon),a("span",{class:"bloom-truncate",text:t.name}),Ve(cc(t),o=>{ge.store.menuPicks={...ge.store.menuPicks,[t.name]:o}},`List ${t.name} in the menu`)))),()=>e.replaceChildren())},entryPosition:{type:"custom",default:Pi},menuPicks:{type:"custom",default:{}}}),ht=new Map,Je=null,Do,lc=()=>[...Z.values()].filter(e=>!e.hidden).toSorted((e,t)=>e.name.localeCompare(t.name)),cc=e=>ge.store.menuPicks[e.name]??ki(e),sc=!1,Bi=[];function pp(e,t,o){let n=e.currentTarget,r=t.clientWidth-n.offsetWidth;if(e.button!==0||r<=0||!t.classList.contains(ue("hover")))return;let i=ge.store.entryPosition,s=i,c=!1,l=new AbortController;n.setPointerCapture(e.pointerId),n.addEventListener("pointermove",m=>{!c&&Math.abs(m.clientX-e.clientX)<mp||(c=!0,o(),s=fe(i+(m.clientX-e.clientX)/r,0,Pi),t.style.setProperty(Oi,String(s)))},{signal:l.signal});let d=()=>{l.abort(),c&&(ge.store.entryPosition=s,t.style.removeProperty(Oi))};n.addEventListener("pointerup",d,{signal:l.signal}),n.addEventListener("lostpointercapture",d,{signal:l.signal})}function gp(e){let t=!1,o=a("button",{class:ue("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),t||$n(),t=!1},pointerdown:r=>{t=!1,e!=="rail"&&pp(r,n,()=>{t=!0})}}},T("bloom"),e!=="rail"&&a("span",{class:ue("label"),text:"Bloom++"})),n=a("div",{class:`bloom-root ${ue("wrap")} ${ue(e)}`,attrs:{"data-bloom":"entry"}},o);return n}function Ho(){clearTimeout(Do),Je?.remove(),Je=null}function uc(){clearTimeout(Do),Do=setTimeout(Ho,fp)}var dc=e=>e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0}));function hp(e,t){if(clearTimeout(Do),Je?.isConnected||!ge.store.showBloomMenu)return;let o=(l,d,m)=>a("div",{class:ue("flyout-item"),attrs:{role:"menuitem"},on:{pointerdown:h=>{h.button===0&&(h.preventDefault(),h.stopPropagation(),Ho(),dc(t),m())}}},T(d),a("span",{class:"bloom-truncate",text:l})),n=lc().filter(cc);Je=a("div",{class:`bloom-root ${ue("flyout")}`,attrs:{"data-bloom":"menu-flyout",role:"menu","aria-label":"Bloom++"},on:{pointerenter:()=>clearTimeout(Do),pointerleave:uc}},o("Plugins","bloom",()=>Zt("plugins")),o("Themes","spark",()=>Zt("themes")),o("Quick CSS","edit",()=>Zt("css")),n.length>0&&a("div",{class:ue("flyout-break"),attrs:{role:"separator"}}),...n.map(l=>o(l.name,l.icon,()=>Zt("plugins",l.name)))),document.body.append(Je);let r=t.getBoundingClientRect(),{width:i,height:s}=Je.getBoundingClientRect(),c=r.right+rc;Je.style.left=`${c+i>innerWidth?r.left-i-rc:c}px`,Je.style.top=`${fe(e.getBoundingClientRect().top,ic,innerHeight-s-ic)}px`}function bp(e){let t=a("div",{class:`bloom-root ${ue("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),Ho(),dc(e),$n()},pointerenter:()=>hp(t,e),pointerleave:uc}},T("bloom"),a("span",{text:"Bloom++"}),ge.store.showBloomMenu&&a("span",{class:ue("menu-chevron")},T("chevron"))),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function ac(){Ho();for(let e of document.querySelectorAll('[data-bloom="entry"], [data-bloom="menu-entry"]'))e.remove();ht.clear()}function yp(){for(let e of document.querySelectorAll('[data-bloom="menu-entry"]'))e.remove()}function mc(){let{showSidebarEntry:e,showSidebarEntryOnHover:t,showAccountMenuEntry:o}=ge.store,n=e||t?Pl():[],r=new Set(n.map(s=>s.anchor));for(let[s,c]of ht)s.isConnected&&r.has(s)||(c.remove(),ht.delete(s));for(let s of document.querySelectorAll('[data-bloom="entry"]'))[...ht.values()].includes(s)||s.remove();for(let s of n){let c=ht.get(s.anchor);if(c?.isConnected||!Ae(s.anchor))continue;let l=c??gp(s.kind);ht.set(s.anchor,l),s.insert(l)}for(let s of ht.values())s.classList.toggle(ue("hover"),!e);if(!o){yp();return}let i=zn();i&&!i.querySelector('[data-bloom="menu-entry"]')&&bp(i),i||Ho()}function vp(e){xi.some(qi)||(ge.store[Si(e??"")?e:"showSidebarEntry"]=!0),mc()}var fc=f({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:ge,styles:()=>`${nc}.${ue("hover")}{${Oi}:${ge.store.entryPosition}}`,start(){ac(),Bi=[M(mc),kl(),Ce()],!sc&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",$n),sc=!0)},stop(){for(let e of Bi)e();Bi=[],ac(),Jt()},onSettingsChange:vp});var Ap=80,wp=420;function Ri(e,t,o){return(e.x-o.x)*(t.y-o.y)-(t.x-o.x)*(e.y-o.y)}function xp(e,t,o,n){let r=Ri(e,t,o),i=Ri(e,o,n),s=Ri(e,n,t);return!((r<0||i<0||s<0)&&(r>0||i>0||s>0))}function Sp(e,t){let o=(t.left+t.right)/2-(e.left+e.right)/2,n=(t.top+t.bottom)/2-(e.top+e.bottom)/2;if(Math.abs(o)>=Math.abs(n)){let i=o<0?t.right:t.left;return[{x:i,y:t.top},{x:i,y:t.bottom}]}let r=n<0?t.bottom:t.top;return[{x:t.left,y:r},{x:t.right,y:r}]}function pc(e,t){let o=fe(e.x,t.left,t.right),n=fe(e.y,t.top,t.bottom);return Math.hypot(e.x-o,e.y-n)}function Xn(e){let t=e.closeDelay??Ap,o=e.towardDelay??wp,n=0,r=!1,i=null,s=null,c=()=>{document.removeEventListener("pointermove",v,!0)},l=()=>{n&&window.clearTimeout(n),n=0,c(),i=null,s=null},d=()=>{l(),r&&(r=!1,e.setHeld(!1))},m=()=>{r||(r=!0,e.setHeld(!0))},h=E=>{n&&window.clearTimeout(n),n=window.setTimeout(d,E)},D=E=>{let ee=e.panel(),rt=e.trigger();if(!ee||!i)return!1;let te=ee.getBoundingClientRect();if(te.width<=0&&te.height<=0)return!1;let Pe=rt?.getBoundingClientRect(),[me,Wr]=Pe&&(Pe.width||Pe.height)?Sp(Pe,te):[{x:te.left,y:te.top},{x:te.right,y:te.bottom}];return xp(E,i,me,Wr)?!0:s!=null&&pc(E,te)<pc(s,te)-.25},v=E=>{let ee={x:E.clientX,y:E.clientY};if(e.over(E.target)){l();return}D(ee)?h(o):d(),s=ee};return{enter(){l()},leave(E){if(e.over(E.relatedTarget)){l();return}i={x:E.clientX,y:E.clientY},s=i,m(),document.addEventListener("pointermove",v,!0),h(t)},dispose(){l(),r=!1}}}var gc=`/*
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
`;var L=C("bloom-nav-"),tr=80,Ep=1200,Tp=2,hc=3e4,Cp=200,Mp=.9,Lp=.28,kp=24,$t=8,Ip=80,Bp=12,Di=80,Ac=`${u.rightPanel}, ${u.summaryPanel}`,Op={user:"\u2753",assistant:"\u{1F916}"},Pp=["wheel","touchmove","pointerdown"],nr=g({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),A=null,R=[],he=-1,bt=-1,Xt=null,yt="",Ni=0,Ui=[],Go=null,_n=null,er=new Set,Re,No,De,Fi="",Uo=[],or=null,Gi=new Set,Rp=e=>nr.store.showAssistant||e.role==="user",Dp=e=>e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.messageIds[0]||e.role;function Hp(e){return{role:e.role,summary:Gt(e),ids:e.messageIds,turn:e,streaming:e.streaming}}function wc(e,t){let o=e.entries.at(-1);if(o?.role==="assistant"&&t.role==="assistant"){e.entries[e.entries.length-1]={...t,ids:[...new Set([...o.ids,...t.ids])]};return}e.entries.push(t)}function Np(){let e=[];for(let t of je()){let o=Hp(t),n=Dp(t),r=e.at(-1);r?.key===n?wc(r,o):e.push({key:n,entries:[o]})}return e}function Up(){let e=[];for(let t of ve(b())?.chain??[]){let o={role:t.role,summary:Nn(t),ids:[t.id],turn:null,streaming:!1},n=e.at(-1);t.role==="assistant"&&n?wc(n,o):e.push({key:t.id,entries:[o]})}return e}var _t=e=>e.entries.flatMap(t=>t.ids);function Yi(e,t){let o=new Set(_t(e));return _t(t).some(n=>o.has(n))}var vt=e=>y(e.entries.find(t=>t.role==="user")?.summary??""),Hi=(e,t)=>e.filter(o=>vt(o)===t).length,Ki=e=>({...e,turn:null,streaming:!1});function Fp(e,t){let o=new Set(t.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return e.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return Ki(r);let s=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return s&&s!==n.key?Ki(r):r})}))}function Gp(e,t){let o=t.entries.map((n,r)=>{let i=e.entries[r];if(!i)return n;let s=[...new Set([...n.ids,...i.ids])];return{...n,ids:s,summary:n.summary||i.summary}});for(let n of e.entries.slice(o.length))o.push(Ki(n));return{key:e.key,entries:o}}function xc(){let e=ko();if(!e)return!1;let t=e.clientHeight-e.scrollHeight;return e.scrollTop-t<=Math.abs(e.scrollTop)}function Yp(e,t){let o=Fp(e,t);if(!t.length)return o;if(!o.length)return t;let n=t.findIndex(l=>o.some(d=>d.key===l.key));if(n<0)return xc()?t.concat(o):o.concat(t);let r=t[n]?.key,i=o.findIndex(l=>l.key===r),s=o.slice(0,i).concat(t.slice(0,n),o.slice(i)),c=s.findIndex(l=>l.key===r);for(let l=n;l<t.length;l++){let d=t[l];if(!d)continue;let m=s.findIndex(h=>h.key===d.key);if(m>=0){let h=s[m];h&&(s[m]=Gp(h,d)),c=m}else s.splice(c+1,0,d),c++}return s}function Kp(e,t){let o=0,n=0,r=0;for(let i=1-e.length;i<t.length;i++){let s=0,c=0;for(let d=0;d<e.length;d++){let m=t[d+i],h=e[d];!m||!h||(Yi(h,m)?(s+=3,c++):vt(h)&&vt(h)===vt(m)&&s++)}let l=xc()?i<r:i>r;(s>o||s===o&&c>n||s===o&&c===n&&l)&&(o=s,n=c,r=i)}return{score:o,offset:r}}function Qp(e,t){let o=e.entries.map((n,r)=>{let i=t.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of t.entries.slice(o.length))o.push({...n,turn:null});return{key:e.key,entries:o}}function jp(e){return e.map(t=>({key:t.key,entries:t.entries.map(o=>({...o}))}))}function Wp(e,t){if(!t.length)return e;if(!e.length)return t;let{score:o,offset:n}=Kp(e,t),r=jp(e);if(o>0)for(let c=0;c<r.length;c++){let l=t[c+n],d=r[c];if(!l||!d)continue;let m=vt(d),h=!!m&&m===vt(l)&&Hi(e,m)===1&&Hi(t,m)===1;(Yi(d,l)||h)&&(r[c]=Qp(d,l))}let i=[],s=[];for(let c=0;c<t.length;c++){let l=t[c];if(!l)continue;let d=vt(l);!d||Hi(r,d)>0||r.some(m=>Yi(m,l))||(o>0&&c<n?i.push(l):s.push(l))}return i.concat(r,s)}var Qi=e=>e.entries.some(t=>t.turn?.el.isConnected);function zp(e,t,o){let n=e.findIndex(i=>_t(i).includes(t));if(n>=0)return n+1;let r=e.find(Qi);return o&&r&&_t(r).includes(o)?0:e.length}function Vp(e){if(or){let{parent:t,user:o}=or;for(let n of e.slice(zp(e,t,o))){let r=_t(n);if(!Qi(n)&&!(o&&r.includes(o)))for(let i of r)Gi.add(i)}}return e.filter(t=>Qi(t)||!_t(t).some(o=>Gi.has(o)))}function Sc(){Uo=[],or=null,Gi.clear()}function Jp(){let e=ml();e!==Fi&&(Fi=e,Sc());let t=Np(),o=Up();return!t.length&&!o.length&&!dl()?(Uo=[],[]):(Uo=Vp(Wp(Yp(Uo,t),o)),Uo.flatMap(n=>n.entries).filter(Rp))}function Zp(e){for(let o of e)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!H().generating||e.some(o=>o.streaming))return;let t=e.at(-1);t&&(t.role==="assistant"||!nr.store.showAssistant?t.streaming=!0:e.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function qc(){let e=Jp();return Zp(e),e}function Ec(e){let t=e.getBoundingClientRect(),o=$()?.getBoundingClientRect().top,n=Math.min(t.bottom,o&&o>t.top?o:t.bottom);return{top:t.top,bottom:n}}function Tc(e){return((e.matches(".whitespace-pre-wrap, .markdown, .prose, [data-markdown-text-style]")?e:e.querySelector(".whitespace-pre-wrap")??e.querySelector(".markdown, .prose, [data-markdown-text-style]"))??e).getBoundingClientRect().top}function bc(e){let t=R[e]?.turn?.el;return t?.isConnected?t:null}function $p(e){if(!R.length)return null;let t=e.scrollHeight-e.clientHeight,o=fi(e),n=Math.min(e.scrollTop,0),r=o?-n:t-e.scrollTop,i=o?t+n:e.scrollTop,s=t<=$t||r<=$t,c=t>$t&&i<=$t,{top:l,bottom:d}=Ec(e),m=bc(0),h=m?Tc(m):Number.NaN,D=!!m&&h>=l-$t&&h<=l+48,v=bc(R.length-1),E=v?.getBoundingClientRect().bottom??Number.NaN,ee=!!v&&E<=d+$t&&E>=d-Ip;return s||ee?"bottom":c||D?"top":null}function Xp(e){let{top:t,bottom:o}=Ec(e),n=t+Math.max(o-t,0)*Lp,r=[],i=-1;if(R.forEach((c,l)=>{let d=c.turn?.el;if(!d?.isConnected){r.push(Number.NaN);return}let m=Tc(d);r.push(m),i<0&&(i=l),m<=n&&(i=l)}),i<0)return Math.max(R.findIndex(c=>c.turn),0);let s=r[he];return Number.isFinite(s)?i===he?he:i>he?i:s<=n+kp?he:i:i}function _p(e){let t=$p(e);return t==="bottom"?R.length-1:t==="top"?0:Xp(e)}function yc(e){nr.store.jumpEffect==="border"&&(e.classList.add(L("flash")),setTimeout(()=>e.classList.remove(L("flash")),Ep))}function rr(e){let t=R[e],o=ko();if(!t||!o)return;if(!t.turn&&!t.ids.length){bt=e,Fo(),o.scrollTo({top:fi(o)?0:o.scrollHeight});return}bt=e,Xt=e?null:{chat:b(),first:t.ids[0],until:Date.now()+hc},Fo();let n=t.turn?.el;if(n?.isConnected){let d=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:d<o.clientHeight*Tp?"smooth":"auto"}),yc(n);return}let r=R.findIndex(d=>d.turn),i=r>=0&&e<r?-1:1,s=++Ni,c=Date.now()+hc,l=()=>{let d=ko();if(s!==Ni||Date.now()>c||!d)return;R=qc();let m=R.find(D=>D.ids.some(v=>t.ids.includes(v)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),yc(m),bt=R.findIndex(D=>D.turn?.el===m),Fo();return}let h=d.scrollTop;d.scrollBy({top:i*d.clientHeight*Mp,behavior:"instant"}),d.scrollTop===h?setTimeout(l,Cp):requestAnimationFrame(l)};l()}function eg(e,t){return a("button",{class:L("row"),attrs:{type:"button","data-index":String(t),"data-message-id":e.ids[0]??""},on:{click:()=>rr(t)}},a("span",{text:Op[e.role]}),a("span",{class:"bloom-truncate",text:xe(e.summary||"\u2026",tr)}))}function tg(e,t){let o=e.offsetWidth?t.width/e.offsetWidth:1;return t.left+(e.clientLeft+e.clientWidth)*o}function og(e){let t=1/0;for(let o of document.querySelectorAll(Ac)){if(!at(o))continue;let n=o.getBoundingClientRect();n.width<Di||n.height<Di||n.left<e.left+Di||n.left<t&&(t=n.left)}return Number.isFinite(t)?t:null}function vc(e){if(!A)return;let t=e.getBoundingClientRect(),o=$()?.getBoundingClientRect().top,r=Math.min(t.bottom,o&&o>t.top?o:t.bottom)-t.top,i=Math.min(tg(e,t),og(t)??1/0);A.style.right=`${document.documentElement.clientWidth-i+Bp}px`,A.style.top=`${t.top}px`,A.style.height=r>1?`${r}px`:""}function ng(){let e=ko();if(R=qc(),!R.length||!e){De?.dispose(),De=void 0,A?.remove(),A=null,yt="";return}if(Go!==e){No?.abort(),No=new AbortController,e.addEventListener("scroll",Ye(Fo),{passive:!0,signal:No.signal});for(let n of Pp)e.addEventListener(n,Mc,{passive:!0,signal:No.signal});Go=e,Re?.disconnect(),Re=new ResizeObserver(()=>{e.isConnected&&vc(e)}),Re.observe(e),_n=null,er=new Set}let t=$();if(t&&t!==_n&&Re&&(Re.observe(t),_n=t),Re)for(let n of document.querySelectorAll(Ac))er.has(n)||(Re.observe(n),er.add(n));ag(),vc(e);let o=JSON.stringify(R.map(n=>[n.role,n.ids]));o!==yt?(yt=o,bt=-1,ig(),Xt&&Date.now()<Xt.until&&Xt.chat===b()&&R[0]?.ids[0]!==Xt.first&&rr(0)):rg(),Fo()}function Fo(){if(!A||!Go)return;he=bt>=0?bt:_p(Go),A.querySelectorAll(`.${L("tick")}`).forEach((t,o)=>t.classList.toggle(L("tick-current"),o===he)),A.querySelectorAll(`.${L("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===he)));let e=A.querySelector(`.${L("toc-head")}`);e&&(e.textContent=`${he+1} / ${R.length}`)}function rg(){A?.querySelectorAll(`.${L("tick")}`).forEach((e,t)=>{let o=R[t],n=xe(o.summary,tr);e.title!==n&&(e.title=n),e.classList.toggle(L("tick-streaming"),o.streaming)}),A?.querySelectorAll(`.${L("row")}`).forEach(e=>{let t=e.lastElementChild,o=xe(R[Number(e.dataset.index)].summary||"\u2026",tr);t&&t.textContent!==o&&(t.textContent=o)})}function ig(){A?.querySelector(`.${L("rail")}`)?.replaceChildren(...R.map((t,o)=>a("button",{class:yn(L("tick"),L(`tick-${t.role}`),t.streaming&&L("tick-streaming"),o===he&&L("tick-current")),title:xe(t.summary,tr),attrs:{type:"button","aria-label":`Jump to message ${o+1}`,"data-message-id":t.ids[0]??""},on:{click:()=>rr(o)}}))),A?.querySelector(`.${L("toc-list")}`)?.replaceChildren(...R.map(eg))}var Me=Ye(ng);function ji(e){if(e===A)return;let t=e.__bloomNavStop;if(t&&t!==Wi)try{t()}catch{}e.isConnected&&e!==A&&e.remove()}function Cc(){let e=[...document.querySelectorAll('[data-bloom="navigator"]')];if(A&&!A.isConnected&&(A=null),A&&e.includes(A)){for(let t of e)ji(t);return}A=e[0]??null;for(let t of e.slice(1))ji(t)}function sg(){De?.dispose(),De=Xn({over:e=>e instanceof Node&&!!A?.contains(e),trigger:()=>A?.querySelector(`.${L("rail")}`),panel:()=>A?.querySelector(`.${L("toc")}`),setHeld:e=>A?.classList.toggle(L("open"),e)})}function ag(){Cc(),A&&!A.querySelector(`.${L("rail")}`)&&(A.remove(),A=null,yt=""),A||(A=a("div",{class:`bloom-root ${L("root")}`,attrs:{"data-bloom":"navigator"},on:{pointerenter:()=>De?.enter(),pointerleave:e=>De?.leave(e)}},a("div",{class:L("rail")}),a("div",{class:L("bridge"),attrs:{"aria-hidden":"true"}}),a("div",{class:L("toc")},a("div",{class:L("toc-head")}),a("div",{class:L("toc-list")}))),yt=""),De||sg(),A.isConnected||document.body.append(A),A.querySelector(`.${L("tick")}`)||(yt=""),A.__bloomNavStop=Wi}function Mc(){bt=-1,Xt=null,Ni++}function Wi(){for(let e of Ui)e();Ui=[],No?.abort(),Re?.disconnect(),Re=void 0,Go=null,_n=null,er=new Set,removeEventListener("keydown",Lc,!0),removeEventListener("resize",Me),De?.dispose(),De=void 0,A&&delete A.__bloomNavStop,A?.remove(),A=null,yt="",Sc(),Fi="";for(let e of document.querySelectorAll('[data-bloom="navigator"]'))ji(e)}var lg=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function Lc(e){if(!A||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||lg(document.activeElement)||J("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:he-1,ArrowDown:he+1,Home:0,End:R.length-1}[e.key];if(o==null){Mc();return}o<0||o>=R.length||(e.preventDefault(),e.stopPropagation(),rr(o))}var kc=f({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:nr,styles:gc,start(){Cc(),Ui=[M(e=>Y(e)&&Me()),pe(Me),z.on("conversation",Me),z.on("generate-start",({parentId:e,userId:t})=>{e&&(or={parent:e,user:t},Me())}),x.on("rise",Me),x.on("fall",Me)],addEventListener("keydown",Lc,!0),addEventListener("resize",Me,{passive:!0}),Me()},stop:Wi,onSettingsChange:Me});var Ic=`/*
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
`;var ne=C("bloom-quotes-"),ts="BloomBetterQuotes",ug=40,Rc=8,dg=1800,Zi=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,Bc=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,At=g({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),zi,Vi,eo,Ji=!1,$i=0,ir=null,sr=null,He=null;function os(){return location.pathname.match(/\/c\/(?!local-)([\w-]+)/)?.[1]??(new URLSearchParams(location.search).get("temporary-chat")==="true"?"temporary":"draft")}function lr(){try{let e=JSON.parse(sessionStorage.getItem(ts)??"[]");return Array.isArray(e)?e.filter(t=>!!t&&typeof t=="object"&&typeof t.id=="string"&&typeof t.text=="string"&&!!t.text):[]}catch{return[]}}function ns(e){try{sessionStorage.setItem(ts,JSON.stringify(e.slice(-ug)))}catch{}}function Yo(e){return lr().find(t=>t.id===e)?.text??""}function mg(e,t){let o=lr().filter(n=>n.id!==e);o.push({id:e,text:t}),ns(o)}function Xi(e=os()){ns(lr().filter(t=>t.id!==e)),ar()}function fg(e){let t=Yo("draft");if(!t||Yo(e))return;let o=lr().filter(n=>n.id!=="draft");o.push({id:e,text:t}),ns(o)}function _i(e){return`${e.getAttribute("aria-label")??""} ${e.getAttribute("title")??""}`}function pg(e){let t=_i(e);return Bc.test(t)&&!/quote|引用/.test(t)?!1:/quote|引用/.test(t)&&Zi.test(t)?!0:Zi.test(t)&&!Bc.test(t)}function Dc(e){let t=e.cloneNode(!0),o=[...t.querySelectorAll("button, [role='button']")],n=new Set(o.map(r=>r.getAttribute("aria-label")).filter(Boolean));for(let r of o)r.remove();for(let r of t.querySelectorAll("*"))!r.children.length&&n.has(y(r.textContent??""))&&r.remove();return y(t.textContent??"")}function gg(e){let t=$(),o=e.parentElement,n=0;for(;o&&o!==t&&n<5;){if(n++,o.matches(u.composerInput)||o.querySelector(u.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=Dc(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function cr(){let e=$();if(!e)return null;for(let t of e.querySelectorAll("button, [role='button']")){if(t.closest("[data-bloom]")||!pg(t))continue;let o=gg(t),n=o?Dc(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:t}}return null}function hg(e){let t=e.closest(u.searchUnit)??e.closest(u.oldMessage);return t&&(Ut(t)??t.getAttribute("data-message-author-role"))==="user"?t:null}function rs(e){return y(e).slice(0,48)}function bg(e,t){let o=rs(e);if(o.length<Rc)return null;let n=null;for(let r of Ft()){if(t&&(r===t||t.contains(r)||r.contains(t)))continue;let i=y(r.textContent??"");if(!i.includes(o))continue;let s=o.length/Math.max(i.length,1);(!n||s>n.score)&&(n={el:r,score:s})}return n?.el??null}function yg(e,t){let o=rs(t),n=e;for(let r of e.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&y(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${ne("hit")}`)?.classList.remove(ne("hit")),n.classList.add(ne("hit")),window.clearTimeout($i),$i=window.setTimeout(()=>n.classList.remove(ne("hit")),dg)}function Oc(e){let t=e.closest(u.timelineScroll)??document.scrollingElement;if(!(t instanceof HTMLElement)&&t!==document.scrollingElement)return;let o=e.getBoundingClientRect();if(o.height<1||!t)return;let n=t.getBoundingClientRect(),r=$()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,s=o.top+o.height/2-(n.top+i)/2;Math.abs(s)<8||t.scrollTo({top:t.scrollTop+s,behavior:"smooth"})}function is(){if(!He||!ir?.isConnected)return;let e=ir.getBoundingClientRect();e.width<1||(He.style.top=`${Math.max(8,e.top+8)}px`,He.style.left=`${Math.max(8,e.right-He.offsetWidth-8)}px`)}function vg(e,t,o){ir=e,sr=t,He??=a("button",{class:`bloom-root ${ne("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),He.isConnected||document.body.append(He),yg(e,o),is()}function Pc(){He?.remove(),He=null,ir=null,sr=null,document.querySelector(`.${ne("hit")}`)?.classList.remove(ne("hit"))}function Hc(){return document.querySelector('[data-bloom="quote-chip"]')}function ar(){Hc()?.remove()}function Ag(e){let o=$()?.getBoundingClientRect();!o||o.width<8||(e.style.width=`${Math.max(120,o.width-24)}px`,e.style.left=`${o.left+12}px`,e.style.top=`${Math.max(8,o.top-e.offsetHeight-8)}px`)}function wg(e){let t=Hc();t||(t=a("div",{class:`bloom-root ${ne("chip")}`,attrs:{"data-bloom":"quote-chip"}},a("span",{class:ne("text")}),a("button",{class:ne("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(t));let o=t.querySelector(`.${ne("text")}`),n=y(e);o&&o.textContent!==n&&(o.textContent=n),t.dataset.text=e,Ag(t)}function es(){if(!Ji){Ji=!0;try{let e=os(),t=cr();At.store.persistAcrossChats&&t&&Yo(e)!==t.text&&mg(e,t.text);let o=At.store.persistAcrossChats?Yo(e):"";!o||t&&y(t.text)===y(o)?ar():wg(o),is()}finally{Ji=!1}}}function xg(e){let t=e.closest('[data-bloom="quote-chip"]');if(t instanceof HTMLElement&&!e.closest(`.${ne("x")}`)){let i=t.dataset.text??t.querySelector(`.${ne("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:t}:null}let o=e.closest("blockquote");if(o instanceof HTMLElement&&!e.closest("a, button")){let i=hg(o),s=y(o.textContent??"");if(i&&s)return{text:s,skip:i,origin:o}}let n=$();if(!n||!n.contains(e)||ut(e)||e.closest("button, [role='button']"))return null;let r=cr();return!r||!r.row.contains(e)?null:{text:r.text,skip:null,origin:r.row}}function Sg(e){let{target:t}=e;if(!(t instanceof Element))return;if(t.closest('[data-bloom="quote-back"]')){e.preventDefault(),e.stopPropagation(),sr?.isConnected&&Oc(sr);return}if(t.closest(`.${ne("x")}`)){e.preventDefault(),e.stopPropagation(),Xi();return}let o=cr();if(o&&(t===o.dismiss||o.dismiss.contains(t))){Xi();return}if(qg(t)&&Nc(),!At.store.jumpToPassage)return;let n=xg(t);if(!n)return;let r=bg(n.text,n.skip);r&&(e.preventDefault(),e.stopPropagation(),vg(r,n.origin,n.text),Oc(r))}function qg(e){let t=e.closest("button, [role='button']");return!(t instanceof HTMLElement)||t.closest("[data-bloom]")||!$()?.contains(t)?!1:/send|submit|发送|提交/i.test(_i(t))&&!Zi.test(_i(t))}function Eg(e){return!(e instanceof KeyboardEvent)||e.key!=="Enter"||e.shiftKey||e.isComposing?!1:ut(e.target)}function Nc(){if(!At.store.persistAcrossChats)return;let e=os(),t=Yo(e);if(t){if(!cr()){let o=B(),n=rs(t);n.length>=Rc&&!y(o).includes(n)&&le(`> ${t}

${o}`.trim())}Xi(e)}}function Tg(e){Eg(e)&&Nc()}function Cg(e){!e.prevId&&e.id&&fg(e.id),es()}var Uc=f({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:At,styles:Ic,onSettingsChange(e){e==="jumpToPassage"&&!At.store.jumpToPassage&&Pc(),e==="persistAcrossChats"&&!At.store.persistAcrossChats&&(sessionStorage.removeItem(ts),ar()),es()},start(){eo=new AbortController,document.addEventListener("pointerdown",Sg,{capture:!0,signal:eo.signal}),document.addEventListener("keydown",Tg,{capture:!0,signal:eo.signal}),addEventListener("scroll",is,{capture:!0,passive:!0,signal:eo.signal}),Vi=pe(Cg),zi=M(e=>Y(e)&&es())},stop(){eo?.abort(),eo=void 0,Vi?.(),Vi=void 0,zi?.(),zi=void 0,window.clearTimeout($i),Pc(),ar()}});var Fc=`/*
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
`;var Lg=C("bloom-cls"),kg="bloom-cls",Ig=600*1e3,as=it("tab"),oo=new Map,Ko=new Map,to=null,Gc=[],Bg=e=>e==="streaming"||e==="error";function Og(){let e=new Map,t=Date.now();for(let[o,n]of Ko)t-n.at>Ig?Ko.delete(o):e.set(o,n.status);for(let[o,n]of oo)e.set(o,n);return e}function Pg(e){return a("span",{class:`bloom-root ${Lg("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&T("alert"))}function dr(){let e=Og(),t=new Set;for(let[o,n]of e)for(let r of ft(o)){if(!Ae(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let s=Pg(n);t.add(s),r.append(s)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function ur(e,t){e&&(t?oo.set(e,t):oo.delete(e),to?.postMessage({tab:as,id:e,status:t}),dr())}function Rg({data:e}){!k(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===as||(Bg(e.status)?Ko.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):Ko.delete(e.id),dr())}function ss(){for(let e of oo.keys())to?.postMessage({tab:as,id:e,status:null})}var Yc=f({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:()=>`${Fc}`,start(){for(let e of document.querySelectorAll('[data-bloom="cls"]'))e.remove();to=typeof BroadcastChannel=="function"?new BroadcastChannel(kg):null,to?.addEventListener("message",Rg),addEventListener("pagehide",ss),Gc=[x.on("rise",({conversationId:e})=>ur(e,"streaming")),x.on("fall",({conversationId:e,outcome:t})=>ur(e,t==="error"?"error":null)),x.on("context",({prevId:e,id:t,migrated:o})=>{o&&H().generating?ur(t,"streaming"):!o&&oo.get(e??"")==="streaming"&&ur(e,null)}),M(e=>Y(e)&&dr())],b()&&dr()},stop(){for(let e of Gc)e();ss(),to?.close(),to=null,removeEventListener("pagehide",ss),oo.clear(),Ko.clear();for(let e of document.querySelectorAll('[data-bloom="cls"]'))e.remove()}});var Qc=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],pr={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Dg={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Hg="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",ls=32,gr=64,cs="#FCFCFC",us="#111111",Ng=14,hr=51.5,Ug=12.5,Fg=9.75,Kc=52,Gg=10.5,Yg=7.75,Kg={rotate:e=>e.arc(hr,hr,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function mr(e){let t=document.createElement("canvas");t.width=t.height=ls;let o=t.getContext("2d");return o?(o.scale(ls/gr,ls/gr),e(o),t.toDataURL("image/png")):""}function fr(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D(Hg);o&&(e.strokeStyle=us,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function br(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function Qg(e,t){br(e,hr,Ug,us),br(e,hr,Fg,pr[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),Kg[t](e),e.stroke()}function jg(e,t){e.beginPath(),e.roundRect(0,0,gr,gr,Ng),e.fillStyle=t,e.fill()}var Wg=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function jc(e,t){switch(e){case"original":return Wg(Dg[t]);case"hole":return mr(o=>fr(o,pr[t],!0));case"bg":return mr(o=>{jg(o,pr[t]),fr(o,cs,!1)});case"dot":return mr(o=>{fr(o,cs,!0),br(o,Kc,Gg,us),br(o,Kc,Yg,pr[t])});case"badge":return mr(o=>{fr(o,cs,!0),Qg(o,t)})}}var jo="bloom-chat-state-favicon",Wo="data-bloom-rel",fs="data-bloom-media",Wc="bloom-parked-icon",zg="/favicon.ico",Vc=g({style:{type:"select",description:"How the tab icon shows the chat state.",options:Qc,default:"bg"}}),Ze=null,Jc="",yr=null,Zc="",zc=new Map,ps,ds=[],$c=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${Wo}]`)];function gs(){for(let e of $c())e.id!==jo&&(e.hasAttribute(Wo)||(Zc||=e.href,e.setAttribute(Wo,e.rel),e.setAttribute(fs,e.getAttribute("media")??"")),e.rel!==Wc&&(e.rel=Wc),e.media!=="not all"&&(e.media="not all"))}function Vg(){for(let e of $c()){let t=e.getAttribute(Wo);if(t==null)continue;e.rel=t;let o=e.getAttribute(fs);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(Wo),e.removeAttribute(fs)}}function Xc(){let e=document.getElementById(jo);return e||(e=document.createElement("link"),e.id=jo,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function Jg(e){if(e==="wait")return Zc||zg;let t=Vc.store.style,o=`${t}:${e}`,n=zc.get(o);return n||zc.set(o,n=jc(t,e)),n}function ms(e){if(e)return"rotate";let t=B();return Ze&&t&&t!==Jc&&(Ze=null),Ze==="error"?"error":Ze==="done"?"done":t?"ready":"wait"}function Qo(e,t=!1){if(e===yr&&!t)return;yr=e;let o=Xc(),n=Jg(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function Zg(){ps=new MutationObserver(()=>{gs(),document.head.lastElementChild?.id!==jo&&Xc()}),ps.observe(document.head,{childList:!0})}var _c=f({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"HostReady",settings:Vc,start(){gs(),Qo(ms(H().generating),!0),Zg(),ds=[x.on("rise",()=>{Ze=null,Qo("rotate")}),x.on("fall",({outcome:e})=>{Ze=e==="done"||e==="error"?e:null,Jc=B(),Qo(ms(!1))}),x.on("context",({migrated:e})=>{e||(Ze=null)}),x.on("tick",({generating:e})=>{gs(),Qo(ms(e))})]},stop(){for(let e of ds)e();ds=[],ps?.disconnect(),document.getElementById(jo)?.remove(),Vg(),yr=null,Ze=null},onSettingsChange(){Qo(yr??"wait",!0)}});var $e="data-bloom-invite",$g=/^(?:invite team members|invite members|邀请团队成员|邀请成员)$/i,eu=':is(button, a:not([href^="/c/"])):not(main *, [role="dialog"] *)',Xg={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${u.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])'],hideInvite:[`[${$e}]`,`div:has(> [${$e}]:only-child)`]},tu=g({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0},hideInvite:{type:"boolean",description:"Hide Invite team members in the sidebar.",default:!0}}),vr,hs=!1;function _g(e){if(Y(e))for(let t of document.querySelectorAll(`${eu}, [${$e}]`))!t.matches(eu)||!$g.test(y(t.textContent??""))?t.removeAttribute($e):t.hasAttribute($e)||t.setAttribute($e,"")}var ou=f({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads, notices and Invite team members.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:tu,styles:()=>Ge(Object.entries(Xg).flatMap(([e,t])=>tu.store[e]?t:[])),start(){hs=!0,dt().then(()=>{hs&&!vr&&(vr=M(_g))})},stop(){hs=!1,vr?.(),vr=void 0;for(let e of document.querySelectorAll(`[${$e}]`))e.removeAttribute($e)}});var eh=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function th(){let e=y(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!eh.has(e.toLowerCase())?e:null}function wt(e){return e?ve(e)?.title??Ul(e)??(e===b()?th():null):null}var ys="complete-toast",oh=1e3,vs=g({keepUntilDismissed:{type:"boolean",description:"Don't auto-close the toast. Dismiss with \xD7, or by opening the chat.",default:!1},duration:{type:"slider",description:"Seconds before the toast closes. Ignored when Keep Until Dismissed is on.",min:0,max:20,default:6,unit:"s"}}),As=null,bs=[];function nh(e){let t=ft(e)[0];t?t.click():location.assign(`/c/${e}`)}function rh(e){As=e,Kn({key:ys,title:wt(e)??"ChatGPT",message:"Response ready",type:"success",onClick:()=>nh(e),onClose:()=>{As=null},duration:vs.store.keepUntilDismissed?0:vs.store.duration*oh})}var nu=f({name:"CompleteToast",description:"Show a toast when a chat you left finishes answering. Click it to open that chat.",authors:["Bloom contributors"],tags:["chat"],icon:"check",enabledByDefault:!0,settings:vs,start(){bs=[x.on("background",({conversationId:e})=>rh(e)),pe(({id:e})=>e===As&&ze(ys))]},stop(){for(let e of bs)e();bs=[],ze(ys)}});var no=`form:has(:is(${u.composerInput})), ${u.oldComposerForm}`,Ar='[class*="ComposerLayoutBody"]',xs='[class*="ComposerLayoutRoot"]',ih='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',sh=`:is(${no}) ${Ar}, :is(${no}):not(:has(${Ar})) ${xs}, :is(${no}):not(:has(${Ar})):not(:has(${xs})) :is(${ih})`,ah='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',lh='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',ch="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))";var uh="composer-fill",ru=g({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function dh(){let{opacity:e,blur:t}=ru.store;if(e>=100)return"";let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${ch} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important;-webkit-backdrop-filter:blur(${t}px)!important`;return`:is(${ah}), :is(${no}){${o}}:is(${lh}){display:none!important}${sh}{${n}}:is(${no}):has(${Ar}) ${xs}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${no}) :is(${u.composerInput}){background-color:transparent!important}`}function ws(){for(let e of document.querySelectorAll(`[data-bloom="${uh}"]`))e.remove()}var iu=f({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:ru,styles:dh,start(){ws()},stop(){ws()},onSettingsChange(){ws()}});var mh=1200,fh=8e3,ph=150,gh=20,su=6,Es="continue where you left",hh=/message delivery timed out|please try again/i,au=/waiting for the complete answer/i,lu=g({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:Es,placeholder:Es}}),Ss=[],xr=0,zo=!1,Vo=0,io="",wr="",Ts=0,so=!1,Jo=!1,Sr=!0,ro="",Cs=0,qr=!1,bh=()=>lu.store.prompt.trim()||Es;function cu(){return(J(u.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function uu(){let e=cu();return!e||au.test(e)||!hh.test(e)?"":e}function yh(){let e=cu();return e&&au.test(e)?e:""}function vh(){let e=Nt()?.querySelectorAll(u.turn),t=e?.[e.length-1];return`${t?.getAttribute("data-turn-key")??""}:${t?.textContent?.length??0}`}function du(e,t,o){if(o===xr){if(H().generating||B()!==e||t>=gh){so=!1,H().generating||(io="");return}Ln(),setTimeout(()=>du(e,t+1,o),ph)}}function Ah(e){let t=xr;if(H().generating||B()&&B()!==e){so=!1,io="";return}le(e),qr=!0,Eo(()=>{t===xr&&du(e,0,t)})}function mu(e){return e===io||Vo>=su||H().generating||B()?!1:(io=e,Vo+=1,so=!0,Ah(bh()),!0)}function wh(){if(zo||so||Jo)return;let e=Date.now(),t=uu();if(t){if(ro="",t!==wr){wr=t,Ts=e;return}if(e-Ts<mh)return;mu(`${b()??""}:${t}`);return}if(wr="",!yh()){Sr=!0,ro="";return}if(!Sr||!H().generating||B())return;let n=`${b()??""}:${vh()}`;if(n!==ro){ro=n,Cs=e;return}if(e-Cs<fh||Vo>=su)return;let r=Dt();r&&(Jo=!0,r.click())}function qs(){xr+=1,zo=!1,Vo=0,io="",wr="",Ts=0,so=!1,Jo=!1,Sr=!0,ro="",Cs=0,qr=!1}var fu=f({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:lu,start(){qs(),Ss=[x.on("rise",()=>{zo=!1,io="",so=!1,qr&&(qr=!1,Sr=!1,ro="")}),x.on("fall",({outcome:e})=>{if(Jo){Jo=!1,e==="left"?zo=!0:mu(`${b()??""}:stall`);return}(e==="stopped"||e==="left")&&(zo=!0),e==="done"&&!uu()&&(Vo=0)}),x.on("context",({migrated:e})=>{e||qs()}),x.on("tick",wh)]},stop(){for(let e of Ss)e();Ss=[],qs()}});var Ne=C("bloom-csi-"),xh=256,Sh=160,Er=1,pu=4,qh=.1,Eh=.0015,Th=250;function Ch(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function Mh(e){return new Promise((t,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function Lh(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:fe(t.x,n,1-n),y:fe(t.y,r,1-r)}}function gu(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function kh(e,t){let o=a("canvas");return o.width=o.height=xh,gu(o,e,t),o.toDataURL("image/png")}function hu(e){let t=null,o={x:j.store.cropX,y:j.store.cropY,zoom:j.store.cropZoom},n,r=a("canvas",{class:Ne("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=Sh*devicePixelRatio;let i=a("div",{class:`bloom-muted ${Ne("status")}`}),s=a("div",{class:Ne("zoom")}),c=a("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(v,E=!0){t&&(o=Lh(t,v),gu(r,t,o),E&&(clearTimeout(n),n=setTimeout(()=>{t&&(j.store.cropX=o.x,j.store.cropY=o.y,j.store.cropZoom=o.zoom,j.store.avatarUrl=kh(t,o))},Th)))}function d(){s.replaceChildren(jn(o.zoom,Er,pu,qh,"\xD7",v=>l({...o,zoom:v})))}async function m(v,E){i.textContent="";try{t=await Mh(v),E&&(j.store.avatarSource=v,o={x:.5,y:.5,zoom:Er}),e.classList.add(Ne("has-image")),d(),l(o,E)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let h=v=>{v?.type.startsWith("image/")&&Ch(v).then(E=>m(E,!0))};c.addEventListener("change",()=>h(c.files?.[0])),r.addEventListener("wheel",v=>{t&&(v.preventDefault(),l({...o,zoom:fe(o.zoom*(1-v.deltaY*Eh),Er,pu)}),d())},{passive:!1}),r.addEventListener("pointerdown",v=>{if(!t)return;r.setPointerCapture(v.pointerId);let E={...o},ee=r.getBoundingClientRect(),rt=te=>{if(!t)return;let Pe=Math.max(ee.width/t.naturalWidth,ee.height/t.naturalHeight)*o.zoom;l({...o,x:E.x-(te.clientX-v.clientX)/(t.naturalWidth*Pe),y:E.y-(te.clientY-v.clientY)/(t.naturalHeight*Pe)})};r.addEventListener("pointermove",rt),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",rt),{once:!0})});let D=a("div",{class:Ne("cropper"),attrs:{tabindex:"0"},on:{paste:v=>h([...v.clipboardData?.files??[]].find(E=>E.type.startsWith("image/"))),dragover:v=>v.preventDefault(),drop:v=>{v.preventDefault(),h(v.dataTransfer?.files[0])}}},a("div",{class:Ne("stage")},r),a("div",{class:Ne("controls")},Po("",v=>v.trim()&&void m(v.trim(),!0),"https://\u2026 or data:image/\u2026","url"),a("div",{class:Ne("buttons")},N("Choose file",()=>c.click()),N("Reset crop",()=>{l({x:.5,y:.5,zoom:Er}),d()}),N("Clear",()=>{t=null,e.classList.remove(Ne("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),s.replaceChildren(),j.store.avatarUrl="",j.store.avatarSource=""},"danger")),s,i,c));return e.append(D),j.store.avatarSource&&m(j.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var bu=`/*
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
`;var Zo="data-bloom-csi-avatar",Ms="data-bloom-csi-sized",wu="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",Bh=32,j=g({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>hu(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),yu=[];function xu(e){e.removeAttribute(Zo),e.removeAttribute(Ms)}function vu(e){return(j.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function Au(e=[]){if(!Y(e))return;let t=j.store.displayName.trim()||null,o=!!j.store.avatarUrl,n=new Set(t?vu("name"):[]);for(let i of document.querySelectorAll(wu))n.has(i)||lt(i,null);for(let i of n)lt(i,t);let r=new Set(o?vu("avatar"):[]);for(let i of document.querySelectorAll(`[${Zo}]`))r.has(i)||xu(i);for(let i of r)i.hasAttribute(Zo)||i.setAttribute(Zo,""),i.toggleAttribute(Ms,!i.closest('[role="menu"]'))}function Oh(){let e=j.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${j.store.avatarSize}px}:is(${u.rail}, ${u.oldRail}) [${Ms}]{--bloom-csi-size:${Bh}px}`:""}var Su=f({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:j,styles:()=>`${Oh()}
${bu}`,start(){yu=[Ce(),M(Au)]},stop(){for(let e of yu)e();for(let e of document.querySelectorAll(`[${Zo}]`))xu(e);for(let e of document.querySelectorAll(wu))lt(e,null)},onSettingsChange(){Au()}});var ao=C("bloom-greeting-"),qu=30,Eu=100;function Tu(e){let t=-1,o=a("textarea",{class:`bloom-input ${ao("input")}`,attrs:{maxlength:String(Eu),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=N("Add",i),r=a("div",{class:ao("list")});function i(){let l=o.value.trim().slice(0,Eu);if(!l)return;let d=[...O.store.greetings];t>=0?d[t]=l:d.length<qu&&d.push(l),O.store.greetings=d,t=-1,o.value="",s()}function s(){let{greetings:l}=O.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&l.length>=qu,r.replaceChildren(...l.length?l.map((d,m)=>a("div",{class:ao("row",m===t?"row-editing":"row-idle")},a("div",{class:ao("text"),text:d}),U("edit","Edit",()=>{t=m,o.value=d,o.focus(),s()}),U("trash","Delete",()=>{O.store.greetings=l.filter((h,D)=>D!==m),t===m&&(t=-1),s()}))):[a("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),e.append(a("div",{class:ao("editor")},r,a("div",{class:ao("form")},o,n))),s();let c=Rt((l,d)=>l==="GreetingCustomizer"&&d==="greetings"&&s());return()=>{c(),e.replaceChildren()}}var Cu=`/*
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
`;var Cr="data-bloom-greeting",Rh=1e3,Dh=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],O=g({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>Tu(e)},greetings:{type:"custom",default:Dh},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),Tr,Mu=[],Ls,en=()=>Ht()&&!Ee(),Hh=e=>e.replaceAll(/\s*\n\s*/g," ").trim(),ku=()=>O.store.greetings.filter(e=>typeof e=="string"&&e.trim());function tn(){let e=ku();if(e.length)if(O.store.order==="random"&&e.length>1){let t=O.store.lastRandom;for(;t===O.store.lastRandom;)t=Math.floor(Math.random()*e.length);O.store.lastRandom=t,O.store.index=t}else O.store.index=(O.store.index+1)%e.length}function Nh(){return en()?J(u.homeHeading):null}function $o(){for(let e of document.querySelectorAll(`[${Cr}]`))e.removeAttribute(Cr),lt(e,null)}function Xo(){for(let e of document.querySelectorAll("[data-bloom-placeholder]"))e.removeAttribute("data-bloom-placeholder")}function Lu(e){let t=ye(),o=Hh(e);if(!t||!o||B(t)){Xo();return}t.getAttribute("data-bloom-placeholder")!==o&&t.setAttribute("data-bloom-placeholder",o)}function _o(){let e=ku(),t=Dn(),o=en();if(!e.length||!t&&!o){$o(),Xo();return}if(t){$o(),Lu(e[0]??"");return}let n=Nh();n?((O.store.index<0||O.store.index>=e.length)&&tn(),n.setAttribute(Cr,""),lt(n,e[Math.max(0,O.store.index)%e.length]??"")):$o(),O.store.heroOnlyOutsideProject?Xo():Lu(e[Math.max(0,O.store.index)%e.length]??"")}function ks(){clearInterval(Tr),Tr=void 0,O.store.mode==="interval"&&en()&&(Tr=setInterval(()=>{tn(),_o()},O.store.intervalSec*Rh))}function Uh(e){O.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${Cr}]`)||getSelection()?.toString()||(tn(),_o())}function Fh(){en()&&O.store.mode==="refresh"&&tn(),ks(),_o()}var Iu=f({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:O,styles:Cu,start(){$o(),Xo(),Ls=new AbortController,document.addEventListener("click",Uh,{signal:Ls.signal}),en()&&O.store.mode==="refresh"&&tn(),ks(),Mu=[M(e=>Y(e)&&_o()),pe(Fh)]},stop(){Ls?.abort();for(let e of Mu)e();clearInterval(Tr),$o(),Xo()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&ks(),_o()}});var on=C("bloom-history-"),Is=10,Gh=3e3;function Bs(e,t){let o="",n=0,r=new Set,i=a("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),s=a("div",{class:on("list")}),c=a("div",{class:on("pager")}),l,d=N("Clear all",()=>{if(!l){d.textContent="Click again to clear",l=setTimeout(()=>{l=void 0,d.textContent="Clear all"},Gh);return}clearTimeout(l),l=void 0,d.textContent="Clear all",nn([])},"danger");function m(){let D=[...xt.store.entries].toReversed(),v=o.trim().toLowerCase(),E=v?D.filter(me=>me.toLowerCase().includes(v)):D,ee=Math.max(1,Math.ceil(E.length/Is));n=Math.min(n,ee-1);let rt=E.slice(n*Is,(n+1)*Is).map(me=>a("div",{class:on("row")},a("button",{class:on("text",r.has(me)?"text-open":"text-closed"),text:me,title:r.has(me)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{r.delete(me)||r.add(me),m()}}}),t&&U("edit","Use",()=>t(me)),U("copy","Copy",()=>void hn(me)),U("trash","Delete",()=>nn(xt.store.entries.filter(Wr=>Wr!==me)))));s.replaceChildren(...rt.length?rt:[a("div",{class:"bloom-muted",text:v?"No matching prompts.":"No saved prompts yet."})]),c.replaceChildren(a("span",{class:"bloom-muted",text:`${E.length} ${v?"matching":"saved"} \xB7 page ${n+1} of ${ee}`}),N("Previous",()=>{n--,m()}),N("Next",()=>{n++,m()}),d);let[te,Pe]=c.querySelectorAll("button");te.disabled=n===0,Pe.disabled=n>=ee-1,d.disabled=!D.length}i.addEventListener("input",()=>{o=i.value,n=0,m()}),e.append(a("div",{class:on("manager")},i,s,c)),m();let h=Rt((D,v)=>D==="InputHistory"&&v==="entries"&&m());return()=>{h(),clearTimeout(l),e.replaceChildren()}}var Bu=`/*
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
`;var Ue=C("bloom-history-"),Kh=2e3,xt=g({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>Bs(e)},entries:{type:"custom",default:[]}}),F=null,Os={text:"",at:0},Le=null,Xe=null,Ps,co=()=>xt.store.entries.filter(e=>typeof e=="string");function nn(e){xt.store.entries=e.slice(-xt.store.maxEntries)}function Rs(e){let t=e.trim();if(!t)return;let o=Date.now();t===Os.text&&o-Os.at<Kh||(Os={text:t,at:o},nn([...co().filter(n=>n!==t),t]))}function Ou(e){e.preventDefault()}function Qh(){let e=a("button",{class:Ue("hud-count"),attrs:{type:"button"},on:{mousedown:Ou,click:Vh}}),t=a("button",{class:Ue("hud-x"),text:"\xD7",attrs:{type:"button","aria-label":"Exit history"},on:{mousedown:Ou,click:jh}});return a("div",{class:`bloom-root ${Ue("hud")}`,attrs:{"data-bloom":"history-hud",role:"group","aria-live":"polite","aria-label":"Input history"}},e,t)}function Pu(e,t){let o=ye();if(!o||Xe)return;Le??=Qh();let n=`${e+1} / ${t}`,r=Le.querySelector(`.${Ue("hud-count")}`);r?.replaceChildren(n),r?.setAttribute("aria-label",`Show input history (${n})`);let i=(o.closest("form")??o).getBoundingClientRect();Le.style.left=`${i.left+i.width/2}px`,Le.style.top=`${i.top}px`,Le.isConnected||document.body.append(Le)}function lo(){F=null,Le?.remove()}function jh(){F&&le(F.draft),lo(),ye()?.focus()}function Ru(e){let t=co();if(!F)return;let o=t[e];F.index=e,F.shown=o,le(o),Pu(t.length-1-e,t.length)}function Wh(e){let t=co();if(!t.length)return!1;if(!F){if(e===1)return!1;F={index:t.length,draft:B(),shown:""}}let o=F.index+e;return o<0?!0:o>=t.length?(le(F.draft),lo(),!0):(Ru(o),!0)}function zh(e){let t=co().indexOf(e);rn(),!(t<0)&&(F??={index:t,draft:B(),shown:""},Ru(t),ye()?.focus())}function rn(){if(!Xe)return;Xe.release(),Xe.controller.abort(),Xe.root.remove(),Xe=null;let e=co();F&&e[F.index]===F.shown?Pu(e.length-1-F.index,e.length):F=null}function Vh(){if(Xe)return;Le?.remove();let e=a("div",{class:Ue("dialog-body")}),t=a("div",{class:`bloom-root ${Ue("backdrop")}`,attrs:{"data-bloom":"history-dialog"},on:{click:n=>n.target===n.currentTarget&&rn()}},a("div",{class:Ue("dialog"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Input history"}},a("div",{class:Ue("dialog-header")},a("h2",{class:Ue("dialog-title"),text:"Input history"}),U("close","Close",rn)),e));t.addEventListener("keydown",n=>n.stopPropagation());let o=new AbortController;document.addEventListener("keydown",n=>{n.key==="Escape"&&(n.preventDefault(),n.stopPropagation(),rn())},{capture:!0,signal:o.signal}),document.body.append(t),Xe={root:t,release:Bs(e,zh),controller:o},e.querySelector("input")?.focus()}function Du(e){return ut(e)?e:e instanceof HTMLElement?e.closest(u.composerInput):null}function Jh(){if(ye()?.closest("[data-chatgpt-composer], [data-composer-input], form")?.querySelector('[aria-expanded="true"]'))return!0;for(let t of document.querySelectorAll('[role="listbox"], [role="menu"], [data-radix-popper-content-wrapper], [cmdk-root], [cmdk-list]')){if(!(t instanceof HTMLElement)||t.closest("[data-bloom]"))continue;let o=getComputedStyle(t);if(!(o.display==="none"||o.visibility==="hidden"))return!0}return!1}function Zh(e){if(e.isComposing||e.key==="Process"||e.keyCode===229)return;let t=Du(e.target);if(!t)return;if(e.key==="Enter"&&!e.shiftKey){Rs(B(t)),lo();return}if(e.key==="Escape"&&F){le(F.draft),lo(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey||Jh())return;let o=Va(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!F||Wh(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function $h(e){F&&Du(e.target)&&B()!==F.shown.trim()&&lo()}function Xh(e){e.target instanceof Element&&e.target.closest(u.sendButton)&&Rs(B())}var Hu=f({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before. Click the counter to browse history.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:xt,styles:Bu,start(){for(let t of document.querySelectorAll('[data-bloom="history-hud"], [data-bloom="history-dialog"]'))t.remove();Le=null,Ps=new AbortController;let{signal:e}=Ps;document.addEventListener("keydown",Zh,{capture:!0,signal:e}),document.addEventListener("input",$h,{capture:!0,signal:e}),document.addEventListener("click",Xh,{capture:!0,signal:e}),document.addEventListener("submit",()=>Rs(B()),{capture:!0,signal:e})},stop(){Ps?.abort(),rn(),lo();for(let e of document.querySelectorAll('[data-bloom="history-hud"]'))e.remove();Le=null},onSettingsChange(e){e==="maxEntries"&&nn(co())}});var Nu=`/*
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
`;var eb=1500,tb=5e3,ob=2e3,Qu=[{label:"UTC",value:"UTC"},{label:"\u7F8E\u56FD\u4E1C\u90E8",value:"America/New_York"},{label:"\u7F8E\u56FD\u4E2D\u90E8",value:"America/Chicago"},{label:"\u7F8E\u56FD\u5C71\u5730",value:"America/Denver"},{label:"\u7F8E\u56FD\u897F\u90E8",value:"America/Los_Angeles"},{label:"\u65E5\u672C",value:"Asia/Tokyo"},{label:"\u53F0\u6E7E",value:"Asia/Taipei"}],uo=g({sourceTimeZone:{type:"select",description:"Zone the stored clock was written in. Leave UTC for ChatGPT create_time. Pick the same zone as the Shit GPT plugin only when that clock is a wall time in that zone; it is then shown in the system timezone.",options:Qu,default:"UTC"},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),Lr=new Map,Ds=new Set,ju=0,kr,Uu=[];function Wu(e,t){Lr.get(e)!==t&&(Lr.set(e,t),clearTimeout(kr),kr=setTimeout(zu,ob))}function zu(){let e={...uo.store.stamps,...Object.fromEntries(Lr)};uo.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,eb))}function nb(e){let t=ve(b())?.times;for(let o=e.length-1;o>=0;o--){let n=Lr.get(e[o])??t?.get(e[o])??uo.store.stamps[e[o]];if(n)return n}return null}var rb=()=>H().generating||Date.now()-ju<tb;function Vu(){return Intl.DateTimeFormat().resolvedOptions().timeZone}function Ju(){let e=uo.store.sourceTimeZone;if(!e||e==="UTC")return"UTC";try{return Intl.DateTimeFormat(void 0,{timeZone:e}),e}catch{return"UTC"}}function Zu(e,t){let o={};for(let n of new Intl.DateTimeFormat("en-US",{timeZone:t,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(e)))o[n.type]=n.value;return{y:+o.year,m:+o.month,d:+o.day,h:+o.hour%24,mi:+o.minute,s:+o.second}}function $u(e){return Date.UTC(e.y,e.m-1,e.d,e.h,e.mi,e.s)}function Fu(e,t){let o=e;for(let n=0;n<4;n++){let r=e-$u(Zu(o,t));if(r===0)return o;o+=r}return o}function ib(e,t){if(t==="UTC")return e;let o=(e%1e3+1e3)%1e3,n=e-o,r=new Date(n),i=Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),r.getUTCHours(),r.getUTCMinutes(),r.getUTCSeconds()),s=Fu(i,t),c=3600*1e3,l=Number.POSITIVE_INFINITY;for(let d of[-c,0,c]){let m=s+d;$u(Zu(m,t))===i&&m<l&&(l=m)}return l!==Number.POSITIVE_INFINITY?l+o:Fu(i+c,t)+o}function sb(e,t){let o=Ju();return t||o==="UTC"?e:ib(e,o)}function Gu(e,t){return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(e)}function ab(e){let t=Vu(),o=Date.now(),n={hour:"2-digit",minute:"2-digit",timeZone:t};if(Gu(e,t)===Gu(o,t))return new Intl.DateTimeFormat(void 0,n).format(e);let r=s=>new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric"}).format(s),i=r(e)===r(o)?{}:{year:"numeric"};return new Intl.DateTimeFormat(void 0,{...i,month:"short",day:"numeric",...n}).format(e)}function lb(e,t){let o=new Date(t).toLocaleString(void 0,{timeZone:Vu()}),n=Ju();if(n==="UTC"||t===e)return o;let r=new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"UTC"}).format(e);return`${Qu.find(s=>s.value===n)?.label??n} ${r} \u2192 ${o}`}function Xu(e){let t=Ut(e)??e.getAttribute("data-message-author-role")??e.closest(u.turn)?.getAttribute("data-turn")??e.querySelector(u.authorRole)?.getAttribute("data-message-author-role");if(mi(t))return t;let o=Lo(e).at(-1);return ve(b())?.chain.find(n=>n.id===o)?.role??null}var Yu='[class*="group/activity-header"]';function cb(e){let t=e.parentElement;if(!t)return null;let o=e.closest(u.turn);return o&&t!==o&&!o.contains(t)?null:t}function ub(e){let t=e;for(let o=0;o<8&&t;o++){let n=cb(t);if(!n)return null;let r=[...n.children],i=r.indexOf(t);for(let s=i-1;s>=0;s--){let c=r[s],l=c.matches(Yu)?c:c.querySelector(Yu);if(l)return l;if(c.matches(u.searchUnit)||c.querySelector(u.searchUnit))return null}if(n===t.closest(u.turn))return null;t=n}return null}function db(e){let t=e.parentElement;for(let o=0;o<4&&t;o++){if(t.classList.contains("flex-col"))return t;t=t.parentElement}return e.parentElement??e}function _u(e,t){if(t==="assistant"){let o=ub(e);if(o)return db(o)}return e}function mb(e,t){let o=Ft();for(let n=o.length-1;n>=0;n--){let r=o[n];if(!(r!==e&&(Xu(r)!=="assistant"||_u(r,"assistant")!==t)))return r===e}return!0}function Ku(e){return e.querySelector(':scope > time[data-bloom="timestamp"]')}function fb(e){let t=Lo(e);if(!t.length||!Ae(e)||e.querySelector("time:not([data-bloom])"))return;let o=Xu(e),n=_u(e,o);if(n!==e&&!mb(e,n)){Ku(e)?.remove();return}let r=nb(t),i=!1;if(!r&&rb()){r=Date.now();let m=t.at(-1);Ds.add(m),Wu(m,r),i=!0}else r&&Ds.has(t.at(-1))&&(i=!0);let s=n.querySelector('time[data-bloom="timestamp"]')??Ku(e);if(!r||uo.store.hideOwnMessages&&o==="user"){s?.remove();return}let c=sb(r,i),l=ab(c);if(s?.textContent===l&&s.parentElement===n&&s===n.firstElementChild)return;let d=a("time",{class:`bloom-timestamp bloom-timestamp-${o??"assistant"}`,text:l,title:lb(r,c),attrs:{"data-bloom":"timestamp",datetime:new Date(c).toISOString()}});s&&s.replaceWith(d),(d.parentElement!==n||d!==n.firstElementChild)&&n.prepend(d)}var Mr=Ye(()=>{for(let e of Ft())fb(e)}),ed=f({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:uo,styles:Nu,start(){Uu=[M(e=>Y(e)&&Mr()),z.on("conversation",Mr),z.on("message-time",({messageId:e,time:t})=>{Ds.delete(e),Wu(e,t),Mr()}),x.on("fall",()=>{ju=Date.now()})]},stop(){for(let e of Uu)e();kr&&(clearTimeout(kr),zu());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();Mr()}}});var pb=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])','[data-chatgpt-composer] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-composer-input] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-codex-composer-root] button[aria-label^="Dictat" i], [data-composer-placement] button[aria-label^="Dictat" i], [class*="ComposerLayout"] button[aria-label^="Dictat" i]'],gb=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],td=g({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),od=f({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:td,styles:()=>Ge([...pb,...td.store.hideDictationSettings?gb:[]])});var St="data-bloom-share",hb=/^\/g\/g-p-/,bb=/^(?:share|分享)$/i,yb=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],vb=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${St}="project"]`],Hs=g({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),Ir,Ns=!1;function Ab(e){if(!Y(e))return;let t=hb.test(location.pathname)&&!b();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${St}]`))!t||!bb.test(y(o.textContent??""))?o.removeAttribute(St):o.hasAttribute(St)||o.setAttribute(St,"project")}var nd=f({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:Hs,styles:()=>Ge([...Hs.store.hideShareChat?yb:[],...Hs.store.hideShareProject?vb:[]]),start(){Ns=!0,dt().then(()=>{Ns&&!Ir&&(Ir=M(Ab))})},stop(){Ns=!1,Ir?.(),Ir=void 0;for(let e of document.querySelectorAll(`[${St}]`))e.removeAttribute(St)}});var rd='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',wb='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',xb="[data-bloom-profile-plan]",id="visibility:hidden!important;user-select:none!important",ad=g({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function Sb(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=ad.store,r=[];return e&&r.push(n?`:is(${rd}){display:none!important}`:`:is(${rd}){${id}}`),t&&r.push(`:is(${wb}){${id}}`),e&&o&&r.push(`${xb}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var sd,ld=f({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:ad,styles:Sb,start(){sd=Ce()},stop(){sd?.()}});var qb="model-switcher-dropdown-button",Us="data-selected-reasoning-effort",Br="ArrowLeft",cd=e=>e.startsWith("model-switcher-")&&e!==qb?e.slice(15):"",sn=(e,t)=>e.id===t.id||!!e.label&&e.label===t.label;function ud(){let e=$();return(e&&J(u.modelTrigger,e))??J(u.modelTrigger)}function ke(){let e=ud();if(!e)return null;let t=e.getAttribute("aria-expanded")==="true",o=e.getAttribute(Us),n=o&&t?"":y(e.innerText),r=o||cd(e.getAttribute("data-testid")??"")||n;return r?{id:r,label:n||r}:null}function Eb(e){return[...document.querySelectorAll(u.modelItem)].find(t=>{let o=cd(t.getAttribute("data-testid")??""),n=y(t.textContent??"");return o===e.id||n===e.label||n===e.id})??null}function Tb(e){let t=e.querySelector("[role=slider]"),o=Number(t?.getAttribute("aria-valuenow")),n=Number(t?.getAttribute("aria-valuemax"));o<=0?Br="ArrowRight":o>=n&&(Br="ArrowLeft"),e.focus(),e.dispatchEvent(new KeyboardEvent("keydown",{key:Br,code:Br,bubbles:!0,cancelable:!0}))}function Fs(e){let t=ke(),o=ud();if(t&&sn(t,e))return o?.hasAttribute(Us)&&o.getAttribute("aria-expanded")==="true"&&document.querySelector("[role=menu]")?.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),!0;if(o?.hasAttribute(Us)){let r=document.querySelector(u.effortSlider);return r?Tb(r):o.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,button:0,pointerType:"mouse",isPrimary:!0})),!1}let n=Eb(e);if(n){n.click();let r=ke();return!!r&&sn(r,e)}return o?.getAttribute("aria-expanded")!=="true"&&o?.click(),!1}var dd=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

.bloom-queue-tray {
    position: fixed;
    z-index: 50;
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
`;var W=C("bloom-queue-"),Mb=6,Lb=8,re=null,an="",mo=!1,fo=!1;function Gs(e,t,o){let n=U(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute(ce),n.addEventListener("mouseenter",()=>md(t)),n.addEventListener("mouseleave",()=>md("")),n}function md(e){let t=re?.querySelector(`.${W("tip")}`);t&&(t.textContent=e)}function kb(e,t,o,n){fo=!0;let r=a("textarea",{class:`bloom-input ${W("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=new AbortController,s=c=>{i.abort(),fo=!1,an="",c?n.edit(t,r.value):r.replaceWith(a("div",{class:W("text"),text:o}))};addEventListener("keydown",c=>{if(!(c.target!==r||c.isComposing)){if(c.key==="Enter"&&!c.shiftKey)s(!0);else if(c.key==="Escape")s(!1);else return;c.preventDefault(),c.stopImmediatePropagation()}},{capture:!0,signal:i.signal}),r.addEventListener("keydown",c=>c.stopPropagation(),{signal:i.signal}),r.addEventListener("blur",()=>s(!0),{signal:i.signal}),e.querySelector(`.${W("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function Ib(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,s=l=>{!i&&Math.abs(l.clientY-n.clientY)<Mb||(i||(i=fo=!0,e.classList.add(W("dragging"))),e.style.transform=`translateY(${l.clientY-n.clientY}px)`)},c=l=>{if(removeEventListener("pointermove",s),!i)return;fo=!1,an="";let m=[...r.children].filter(h=>h!==e).filter(h=>h.getBoundingClientRect().top+h.getBoundingClientRect().height/2<l.clientY).length;o.move(t,m)};addEventListener("pointermove",s),addEventListener("pointerup",c,{once:!0})})}function Bb(e,t,o,n){let r=a("li",{class:W("row")},a("div",{class:W("text"),text:e.text}),n&&e.label?a("span",{class:W("model"),title:e.label,text:e.label}):null,a("div",{class:W("actions")},Gs("trash","Remove from queue",()=>o.remove(t)),Gs("edit","Edit",()=>kb(r,t,e.text,o)),Gs("send","Send now",()=>o.sendNow(t))));return Ib(r,t,o),r}function Ob(e){if(!re)return;let t=e.getBoundingClientRect();re.style.left=`${t.left}px`,re.style.width=`${t.width}px`,re.style.bottom=`${innerHeight-t.top+Lb}px`}function Ys(){re?.remove(),re=null,an="",fo=!1}function qt(e,t,o=!0){let n=$();if(!e.length||!at(n)){Ys();return}re||(re=a("div",{class:`bloom-root ${W("tray")}`,attrs:{"data-bloom":"queue"}},a("div",{class:W("header")},a("button",{class:W("toggle"),attrs:{type:"button","aria-expanded":String(!mo)},on:{click:s=>{mo=!mo,re?.classList.toggle(W("collapsed"),mo),s.currentTarget.setAttribute("aria-expanded",String(!mo))}}},a("span",{class:W("count")}),T("chevron")),a("span",{class:W("tip")})),a("ol",{class:W("list")})),re.classList.toggle(W("collapsed"),mo),document.body.append(re)),Ob(n);let r=JSON.stringify([o,...e.map(s=>[s.text,o?s.label:""])]);if(fo||r===an)return;an=r;let i=re.querySelector(`.${W("count")}`);i&&(i.textContent=gn(e.length,"Queued message")),re.querySelector(`.${W("list")}`)?.replaceChildren(...e.map((s,c)=>Bb(s,c,t,o)))}var Dr=new q("PromptQueue"),Pb=8,cn=150,Or=20,Rb=300,Ie="BloomPromptQueue",Qs="BloomPromptQueueClaim",fd="BloomPromptQueueTab",Db=4e3,_=g({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1},showQueueMode:{type:"boolean",description:"Show the model that was selected when each message was queued.",default:!0},stickyOnNavigate:{type:"boolean",description:"Keep the selected model when switching chats.",default:!0},persistAcrossRefresh:{type:"boolean",description:"Restore unsent queued messages in this browser after a refresh. Other tabs show the same queue; only one of them sends it.",default:!0}}),Be=new Map,ln=!1,Et=null,po,pd=[],_e=null,Ct=!1,un,Pr="draft",dn=()=>b()??Pr,ie=()=>Be.get(dn())??[],js=e=>({id:e.model||e.label,label:e.label||e.model});function Hb(e){return typeof e=="string"?e.trim()?{text:e,model:"",label:""}:null:!k(e)||typeof e.text!="string"||!e.text.trim()?null:{text:e.text,model:typeof e.model=="string"?e.model:"",label:typeof e.label=="string"?e.label:""}}function Ws(){let e=sessionStorage.getItem(fd);if(e)return e;let t=globalThis.crypto?.randomUUID?.()??`${Date.now()}-${Math.random()}`;return sessionStorage.setItem(fd,t),t}function bd(){let e=Se(localStorage.getItem(Qs)??"");return!k(e)||typeof e.tab!="string"||typeof e.at!="number"||typeof e.key!="string"?null:{tab:e.tab,at:e.at,key:e.key}}function yd(){let e={tab:Ws(),at:Date.now(),key:dn()};try{localStorage.setItem(Qs,JSON.stringify(e))}catch(t){Dr.warn("Could not claim the queue",t)}}function Nb(){let e=bd();if(e?.tab===Ws())try{localStorage.setItem(Qs,JSON.stringify({...e,at:Date.now()}))}catch(t){Dr.warn("Could not refresh the queue claim",t)}}function Ub(){let e=bd();return!e||e.tab===Ws()||e.key!==dn()?!0:Date.now()-e.at<=Db?!1:(yd(),!0)}function Fb(){return Object.fromEntries([...Be].filter(([e])=>e!==Pr))}function Ks(e){let t=typeof e=="string"?Se(e):e;if(!k(t))return!1;let o=!1;for(let[n,r]of Object.entries(t)){if(!Array.isArray(r))continue;let i=r.map(Hb).filter(s=>s!=null);i.length&&(Be.set(n,i),o=!0)}return o}function Gb(){if(!_.store.persistAcrossRefresh){sessionStorage.removeItem(Ie),Jr(Ie);return}Ks(sessionStorage.getItem(Ie))||Ks(Bt(Ie))&&Rr()}function Rr(){try{if(!_.store.persistAcrossRefresh){sessionStorage.removeItem(Ie),Jr(Ie);return}let e=Fb();sessionStorage.setItem(Ie,JSON.stringify(e)),Ot(Ie,e)}catch(e){Dr.warn("Could not save the queue",e)}}function Yb(e){if(!(e.key!==Ie||!_.store.persistAcrossRefresh||e.newValue==null)){Be.clear(),Ks(e.newValue);try{sessionStorage.setItem(Ie,e.newValue)}catch(t){Dr.warn("Could not mirror the queue",t)}qt(ie(),go,_.store.showQueueMode)}}function Tt(e){e.length?Be.set(dn(),e):Be.delete(dn()),yd(),Rr(),qt(ie(),go,_.store.showQueueMode)}function Kb(e){if(!e.model&&!e.label)return!0;let t=ke();return t?sn(t,js(e)):!0}function vd(e,t=0){t>=Or||H().generating||B()!==e||(Ln(),setTimeout(()=>vd(e,t+1),cn))}function Qb(e,t){let o=e??_e;if(!o||!t.model&&!t.label||sn(o,js(t))){Ct=!1;return}_.store.stickyOnNavigate&&(_e=o),clearTimeout(un),un=setTimeout(()=>wd(o),cn)}function mn(e,t=0,o=ke()){if(H().generating||B()){t<Or&&setTimeout(()=>mn(e,t+1,o),cn);return}if(!Kb(e)&&t<Or){Ct=!0,Fs(js(e)),setTimeout(()=>mn(e,t+1,o),cn);return}le(e.text),Eo(()=>vd(e.text)),Qb(o,e)}function gd(){if(Et!=null){let o=Et;Et=null,mn(o);return}if(!ln||H().generating||B())return;if(!Ub()){ln=!1;return}let[e,...t]=ie();e!=null&&(ln=!1,Tt(t),mn(e))}function Ad(e){let t=ie(),o=t[e];if(o!=null){if(Tt(t.filter((n,r)=>r!==e)),!H().generating){mn(o);return}Et=o,Dt()?.click()}}var go={remove:e=>Tt(ie().filter((t,o)=>o!==e)),edit:(e,t)=>Tt(t.trim()?ie().map((o,n)=>n===e?{...o,text:t}:o):ie().filter((o,n)=>n!==e)),sendNow:Ad,move(e,t){let o=[...ie()],[n]=o.splice(e,1);n&&(o.splice(t,0,n),Tt(o))}};function jb(e){let t=ke(),o={text:e,model:t?.id??"",label:t?.label??""},n=ie();return _.store.replacePending&&n.length?(Tt([...n.slice(0,-1),o]),!0):n.length>=Pb?!1:(Tt([...n,o]),!0)}function Wb(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!ut(e.target)||!H().generating)return;let t=B(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;let o=ke();le(""),Et={text:t,model:o?.id??"",label:o?.label??""},Dt()?.click();return}if(!t){ie().length&&Ad(0);return}jb(t)&&le("")}function zb(){if(Ct||!_.store.stickyOnNavigate)return;let e=ke();e&&(_e=e)}function wd(e){Ct=!0;let t=0,o=()=>{if(Fs(e)||t>=Or){Ct=!1;return}t++,un=setTimeout(o,cn)};clearTimeout(un),o()}function Vb(){_.store.stickyOnNavigate&&_e&&wd(_e)}function hd(e){let{target:t}=e;!(t instanceof Element)||Ct||t.closest(`${u.modelTrigger}, ${u.modelItem}`)&&setTimeout(zb,Rb)}var xd=f({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:_,styles:dd,start(){po=new AbortController,Gb(),_e=ke(),document.addEventListener("keydown",Wb,{capture:!0,signal:po.signal}),document.addEventListener("pointerup",hd,{signal:po.signal}),document.addEventListener("keyup",hd,{signal:po.signal}),pd=[x.on("fall",({outcome:e})=>{ln=e==="done",e==="left"&&(Et=null),gd()}),x.on("context",({prevId:e,id:t,migrated:o})=>{let n=Be.get(Pr);Be.delete(Pr),o&&!e&&t&&n&&Be.set(t,n),o||(ln=!1,Vb()),Rr(),qt(ie(),go,_.store.showQueueMode)}),x.on("tick",()=>{Nb(),gd(),qt(ie(),go,_.store.showQueueMode)})],addEventListener("storage",Yb,{signal:po.signal}),qt(ie(),go,_.store.showQueueMode)},stop(){po?.abort(),clearTimeout(un);for(let e of pd)e();Ys(),Be.clear(),Et=null,_e=null,Ct=!1},onSettingsChange(e){e==="persistAcrossRefresh"&&Rr(),e==="stickyOnNavigate"&&_.store.stickyOnNavigate&&(_e=ke()),qt(ie(),go,_.store.showQueueMode)}});var Sd=`/*
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
`;var de=C("bloom-recent-"),Oe="home",Zb=50,qd=140,$b=new Set(["Backquote"]),Xb=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),w=g({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),et=null,be=[],we=0,zs,Ed=[],Nr=()=>Ee()?null:b()??(Ht()?Oe:null);function Td(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function Md(e){let t=wt(e);t&&w.store.titles[e]!==t&&(w.store.titles={...w.store.titles,[e]:t});let o=Fl(location.href);o&&e===b()&&w.store.projects[e]!==o&&(w.store.projects={...w.store.projects,[e]:o})}function Cd(e){if(!e)return;let t=[e,...w.store.visits.filter(n=>n!==e)].slice(0,Zb),o=new Set(t);w.store.visits=t,Object.keys(w.store.previews).some(n=>!o.has(n))&&(w.store.previews=Td(w.store.previews,o)),Object.keys(w.store.titles).some(n=>!o.has(n))&&(w.store.titles=Td(w.store.titles,o)),e!==Oe&&Md(e)}function _b(e){if(!w.store.visits.includes(e))return;let{[e]:t,...o}=w.store.titles,{[e]:n,...r}=w.store.previews,{[e]:i,...s}=w.store.projects;w.store.visits=w.store.visits.filter(c=>c!==e),w.store.titles=o,w.store.previews=r,w.store.projects=s}function Hr(e){if(!e||!w.store.visits.includes(e))return;let t={},o=ve(e)?.chain??[];for(let r of o)t[r.role]=xe(Nn(r),qd);if(e===b())for(let r of je()){let i=Gt(r);i&&(t[r.role]=xe(i,qd))}let n=w.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(w.store.previews={...w.store.previews,[e]:t})}function ey(){let e=Number(w.store.maxRecent);return w.store.visits.filter(t=>t!==Oe||w.store.includeHome).slice(0,e)}function Ld(e){if(bo(),e===Nr())return;let t=e===Oe?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"], [data-sidebar-destination="builtin:home"]'):ft(e)[0];t?t.click():location.assign(e===Oe?"/":`/c/${e}`)}function ty(e){let t=e===Oe?null:w.store.previews[e],o=t&&["user","assistant"].filter(n=>t[n]).map(n=>a("span",{class:de("preview"),attrs:{"data-role":n},text:t[n]}));return a("span",{class:de("thumb"),attrs:{"aria-hidden":"true"}},o?.length?a("span",{class:de("page")},...o):a("span",{class:de("fallback")},T(e===Oe?"plus":"bloom")))}function oy(e,t){let o=e===Oe?"New chat":w.store.titles[e]??wt(e)??"Untitled chat",n=e===Oe?null:w.store.projects[e];return a("button",{class:de("item"),attrs:{type:"button",role:"option","aria-selected":String(t===we),"aria-label":n?`${o}, ${n}`:o},on:{click:()=>Ld(e),pointerenter:()=>t!==we&&ho(t)}},ty(e),a("span",{class:de("meta")},a("span",{class:`${de("title")} bloom-truncate`,text:o}),n&&a("span",{class:de("project")},T("folder"),a("span",{class:"bloom-truncate",text:n}))))}function kd(){be.length?Ld(be[we]):bo()}function ho(e){be.length&&(we=(e+be.length)%be.length,et?.querySelectorAll(`.${de("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===we))))}function ny(){Hr(b());let e=Nr();be=ey(),e&&(be=[e,...be.filter(o=>o!==e)].slice(0,Number(w.store.maxRecent))),we=be.length>1?1:0;let t=be.length?a("div",{class:de("list"),attrs:{role:"listbox","aria-label":"Recent chats"}},...be.map(oy)):a("div",{class:de("empty"),text:"Open a few chats, then hold Ctrl+` to switch."});t.style.setProperty("--bloom-recent-count",String(be.length)),et=a("div",{class:`bloom-root ${de("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:o=>o.target===o.currentTarget&&bo()}},a("div",{class:de("panel")},t)),document.body.append(et)}function bo(){et?.remove(),et=null}var ry=e=>$b.has(e.code)||Xb.has(e.key);function iy(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&ry(e)){e.preventDefault(),e.stopPropagation(),et?ho(we+(e.shiftKey?-1:1)):ny();return}if(!et)return;let o={Escape:bo,Enter:kd,ArrowRight:()=>ho(we+1),ArrowDown:()=>ho(we+1),ArrowLeft:()=>ho(we-1),ArrowUp:()=>ho(we-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function sy(e){et&&e.key==="Control"&&kd()}var Id=f({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:w,styles:Sd,start(){zs=new AbortController;let{signal:e}=zs;addEventListener("keydown",iy,{capture:!0,signal:e}),addEventListener("keyup",sy,{capture:!0,signal:e}),addEventListener("blur",bo,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&Hr(b()),{signal:e}),Ed=[pe(({prevId:i})=>{Hr(i),Cd(Nr())}),z.on("conversation",({id:i})=>{w.store.visits.includes(i)&&Md(i),Hr(i)}),z.on("conversation-missing",({id:i})=>_b(i))];let{visits:t,titles:o,previews:n}=w.store,r=t.filter(i=>i!==Oe&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(w.store.visits=t.filter(i=>!r.includes(i))),Cd(Nr())},stop(){zs?.abort();for(let e of Ed)e();bo()}});var Vs="data:audio/mpeg;base64,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";var Bd=new q("ResponseNotification"),ay=.5,Od="BloomNoticeClaim",ly=3e4,fn=g({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:e=>(e.append(N("Preview",Nd)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),Pd=null,Js=new Map,Rd=[],Zs,cy=e=>Uint8Array.from(atob(e.slice(e.indexOf(",")+1)),t=>t.charCodeAt(0)).buffer;function uy(e,t){let o=Js.get(t);return o||(o=(t.startsWith("data:")?Promise.resolve(cy(t)):bn(t)).then(n=>e.decodeAudioData(n)),o.catch(()=>Js.delete(t)),Js.set(t,o)),o}async function Dd(e){Pd??=new AudioContext;let t=Pd;t.state==="suspended"&&t.resume();let o=t.createBufferSource(),n=t.createGain();o.buffer=await uy(t,e),n.gain.value=ay,o.connect(n).connect(t.destination),o.start()}function Nd(){let e=fn.store.soundUrl.trim();Dd(e||Vs).catch(t=>{Bd.warn("Sound failed",t),e&&Dd(Vs).catch(o=>Bd.warn("Default chime failed",o))})}function dy(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function my(e){let t=Se(Bt(Od)??"");return e&&k(t)&&t.id===e&&Date.now()-Number(t.at)<ly?!1:(Ot(Od,{id:e,at:Date.now()}),!0)}function Hd(e){fn.store.onlyWhenHidden&&!document.hidden||my(e)&&(fn.store.sound&&Nd(),fn.store.browserNotification&&dy(wt(e)))}function fy(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(Zs=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:Zs.signal}))}var Ud=f({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply, including chats you left while they were answering.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:fn,start(){fy(),Rd=[x.on("fall",({conversationId:e,outcome:t})=>t==="done"&&Hd(e)),x.on("background",({conversationId:e})=>Hd(e))]},stop(){for(let e of Rd)e();Zs?.abort()}});var py=`:is(${u.sidebarScroll}, :has(> ${u.sidebarScroll})) + :has(${u.menuButton})`,gy=`${u.rail} > :has(${u.menuButton})`,Xs=`:is(${py}, ${gy}, ${u.oldProfile}):not(:hover)`,$s="[data-bloom-profile-avatar]",hy=`:is(${Xs}, ${Xs} :has(${$s})) > :not(${$s}, :has(${$s}))`,Gd=g({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function by(){let{opacity:e,fadeAvatar:t}=Gd.store;return e>=100?"":`${t?Xs:hy}{opacity:${e/100}!important}`}var Fd,Yd=f({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Gd,styles:by,start(){Fd=Ce()},stop(){Fd?.()}});var Kd=`/*
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
`;var G=C("bloom-star-chats"),vy=80,Ay=60,wy=1200,xy=120,pn=g({replaceReadAloud:{type:"boolean",description:"Put the star where the reply's Read aloud button is, and hide that button.",default:!0},messages:{type:"custom",default:[]}}),Sy=`:is(${u.turnActions}) ${u.readAloud}`,_s,ea=!1,tt=!1,Lt=!1,Ur=0,X=null,Fr="",P=null,ta,ot;function na(){let e=pn.store.messages;return Array.isArray(e)?e.filter(t=>k(t)&&typeof t.conversationId=="string"&&typeof t.messageId=="string"&&(t.role==="user"||t.role==="assistant")&&typeof t.snippet=="string"&&typeof t.starredAt=="number"):[]}function ra(){let e=b();return e?na().filter(t=>t.conversationId===e):[]}function qy(e,t){return na().some(o=>o.conversationId===e&&o.messageId===t)}function Qd(e){let t=na(),o=t.some(n=>n.conversationId===e.conversationId&&n.messageId===e.messageId);pn.store.messages=o?t.filter(n=>!(n.conversationId===e.conversationId&&n.messageId===e.messageId)):[{...e,starredAt:Date.now()},...t].slice(0,vy)}function oa(e){return e.messageIds[0]||e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.el.getAttribute("data-turn-key")||""}function Ey(e){return xe(Gt(e)||y(e.el.textContent??""),Ay)}function Ty(e){let t=e.closest(u.turn);if(!t)return null;let o=je().filter(n=>t.contains(n.el));return o.find(n=>n.el.contains(e)||n.el===t)??o.findLast(n=>n.el.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING)??null}function Cy(){let e=[...document.querySelectorAll(u.turnActions)].filter(t=>!t.closest(`[data-bloom], [role="dialog"], [inert], pre, ${u.sidebars}`));return e.filter(t=>!e.some(o=>o!==t&&o.contains(t)))}function My(e,t){let o=pn.store.replaceReadAloud?t.querySelector(u.readAloud):null;if(o&&!o.closest("[data-bloom]")){e.nextElementSibling!==o&&o.before(e);return}let n=Ly(t);(e.parentElement!==n||n.lastElementChild!==e)&&n.append(e)}function Ly(e){let t=[...e.querySelectorAll("button")].filter(n=>n.dataset.bloom!=="message-star"&&!n.closest("[data-bloom]"));return t.length?[...e.children].find(n=>n instanceof HTMLElement&&n!==t[0]&&t.every(r=>n.contains(r)))??e:e}function ky(){return[...document.querySelectorAll(u.headerMore)].filter(t=>{if(t.dataset.bloom==="message-star"||t.closest("[data-bloom], [role='dialog'], [inert]")||t.closest(u.sidebars))return!1;let o=t.getBoundingClientRect();return o.width===0&&o.height===0?!!t.closest("header, #page-header"):o.top>=0&&o.top<96&&o.left>window.innerWidth*.5}).toSorted((t,o)=>o.getBoundingClientRect().left-t.getBoundingClientRect().left||(t.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1))[0]??null}function jd(e,t,o){return a("button",{class:t,attrs:{type:"button","aria-label":e},on:{pointerdown:n=>n.stopPropagation(),mousedown:n=>n.stopPropagation(),click:n=>{n.preventDefault(),n.stopPropagation(),o(n)}}},T("star"))}function Iy(e,t){e.setAttribute("aria-pressed",String(t)),e.setAttribute("aria-label",t?"Unstar":"Star")}function Gr(){return tt||Lt}function yo(){Ur&&window.clearTimeout(Ur),Ur=0}function vo(){tt=!1,Lt=!1,yo(),ot?.enter(),X?.remove(),X=null,Fr="",P?.classList.remove(G("-open")),P?.setAttribute("aria-expanded","false")}function Yr(e){return e instanceof Node&&!!(P?.contains(e)||X?.contains(e))}function By(e){e.classList.add(G("-flash")),window.setTimeout(()=>e.classList.remove(G("-flash")),wy)}function Oy(e){let t=je().find(n=>oa(n)===e),o=t?.el.closest(u.turn)??t?.el;o&&(o.scrollIntoView({block:"start"}),By(o))}function Py(){let e=b(),t=new Set,o=[...document.querySelectorAll('[data-bloom="message-star"][data-place="action"]')];if(!e||Ee()){for(let n of o)n.remove();return}for(let n of Cy()){if(!Ae(n))continue;let r=Ty(n),i=r?oa(r):"";if(!r||!i)continue;let s=n.querySelector('[data-place="action"]');(!s||s.dataset.id!==i)&&(s?.remove(),s=jd("Star",G("-star"),()=>{let c=b(),l=je().find(d=>oa(d)===i);!c||!l||Qd({conversationId:c,messageId:i,role:l.role,snippet:Ey(l)})}),s.dataset.bloom="message-star",s.dataset.place="action",s.dataset.id=i),Iy(s,qy(e,i)),My(s,n),t.add(s)}for(let n of o)t.has(n)||n.remove()}function Ry(){if(!X||!P)return;let e=P.getBoundingClientRect(),t=X.offsetWidth||288,o=X.offsetHeight||120,n=e.bottom+6;n+o>window.innerHeight-8&&(n=Math.max(8,e.top-o-6));let r=Math.max(8,Math.min(e.right-t,window.innerWidth-t-8));X.dataset.place=n>=e.bottom?"below":"above",X.style.left=`${Math.round(r)}px`,X.style.top=`${Math.round(n)}px`}function Dy(){if(!Gr()||!P){X?.remove(),X=null,Fr="",P?.classList.remove(G("-open")),P?.setAttribute("aria-expanded","false");return}let e=ra(),t=e.map(o=>`${o.messageId}	${o.snippet}`).join(`
`);if(!X||Fr!==t){X?.remove();let o=e.map(n=>a("div",{class:G("-row")},a("button",{class:G("-jump"),attrs:{type:"button"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),vo(),Oy(n.messageId)}}},a("span",{class:G("-role"),text:n.role==="user"?"You":"ChatGPT"}),a("span",{class:G("-snip"),text:n.snippet||"Message"})),jd("Unstar",G("-unstar"),()=>Qd(n))));X=a("div",{class:`bloom-root ${G("-panel")}`,attrs:{"data-bloom":"star-list"},on:{pointerenter:()=>{yo(),ot?.enter(),Lt=!0},pointerleave:n=>{Yr(n.relatedTarget)||tt||ot?.leave(n)}}},a("div",{class:G("-bridge"),attrs:{"aria-hidden":"true"}}),a("div",{class:G("-head"),text:"Starred"}),a("div",{class:G("-body")},...o.length?o:[a("div",{class:G("-empty"),text:"No starred messages in this chat"})])),document.body.append(X),Fr=t}Ry(),P.classList.add(G("-open")),P.setAttribute("aria-expanded","true")}function Hy(){for(let r of document.querySelectorAll('[data-bloom="starred"]'))r.remove();let e=ky(),t=e?.parentElement??null,o=b();if(!e||!t||t.closest(u.sidebars)||!o||Ee()||!Ae(t)){P?.remove(),P=null,vo();return}P||(P=a("button",{class:G("-toggle"),attrs:{type:"button","data-bloom":"message-star","data-place":"header","aria-label":"Starred messages","aria-expanded":"false"},on:{pointerdown:r=>r.stopPropagation(),pointerenter:()=>{yo(),ot?.enter(),Ur=window.setTimeout(()=>{Lt=!0,Mt()},xy)},pointerleave:r=>{Yr(r.relatedTarget)||(yo(),Gr()&&ot?.leave(r))},click:r=>{r.preventDefault(),r.stopPropagation(),tt=!tt,Lt=tt,yo(),tt||vo(),Mt()}}},T("star"))),(P.parentElement!==t||P.nextElementSibling!==e)&&e.before(P);let n=e.getBoundingClientRect();n.width>0&&(P.style.width=`${n.width}px`,P.style.height=`${n.height}px`),P.classList.toggle(G("-here"),ra().length>0),Dy()}function Ny(){let e=new Set(ra().map(t=>t.messageId));for(let t of document.querySelectorAll('[data-bloom="navigator"] .bloom-nav-tick, [data-bloom="navigator"] .bloom-nav-row'))t.classList.toggle(G("-mark"),!!t.dataset.messageId&&e.has(t.dataset.messageId))}function Mt(){if(!ea){ea=!0;try{for(let e of document.querySelectorAll('[data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();Py(),Hy(),Ny()}finally{ea=!1}}}function Uy(){vo(),P?.remove(),P=null;for(let e of document.querySelectorAll('[data-bloom="message-star"], [data-bloom="star-list"], [data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();for(let e of document.querySelectorAll(`.${G("-mark")}`))e.classList.remove(G("-mark"))}var Wd=f({name:"StarChats",description:"Star a message from its toolbar. The star left of the top-right menu opens this chat's list.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:pn,styles:()=>`${Kd}${pn.store.replaceReadAloud?Ge([Sy]):""}`,onSettingsChange(e){(e==="messages"||e==="replaceReadAloud")&&Mt()},start(){for(let o of document.querySelectorAll('[data-bloom="star-list"]'))o.remove();ot=Xn({over:Yr,trigger:()=>P,panel:()=>X,setHeld(o){if(o){Lt=!0,Mt();return}tt||(Lt=!1,Mt())}}),_s=M(o=>Y(o)&&Mt());let e=o=>{Yr(o.target)||Gr()&&vo()};document.addEventListener("pointerdown",e,!0);let t=o=>{o.key!=="Escape"||!Gr()||(o.preventDefault(),vo())};document.addEventListener("keydown",t,!0),ta=()=>{document.removeEventListener("pointerdown",e,!0),document.removeEventListener("keydown",t,!0)},Mt()},stop(){_s?.(),_s=void 0,ta?.(),ta=void 0,yo(),ot?.dispose(),ot=void 0,Uy()}});var zd="filter:blur(6px)!important;transition:filter 0.2s ease",Vd=`:is(${u.sidebars})`,kt="data-bloom-streamer-open",Fy="[data-app-action-sidebar-thread-row], [data-app-action-sidebar-project-row], .bloom-recent-item";function Gy(){return{conversations:{selectors:[`${Vd} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0,row:"[data-app-action-sidebar-thread-row]"},projects:{selectors:[`${Vd} a:is([href*="/project"], [href*="/g/g-p-"])`,"[data-app-action-sidebar-project-row]",".bloom-recent-project"],hover:!0,row:"[data-app-action-sidebar-project-row]"},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}}}var Jd=g({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function Yy(e,t){let o=[`:is(${e}):hover`,`.bloom-recent-item:hover :is(${e})`,`:is(${e})[${kt}]`];return t&&o.push(`${t}:hover`,`${t}:hover :is(${e})`,`${t}:is(${e}):hover`,`${t}[${kt}]`,`${t}[${kt}] :is(${e})`),o.join(",")}function Ky(){let e=Gy();return Object.entries(e).filter(([t])=>Jd.store[t]).map(([,t])=>{let o=t.selectors.join(",");if(!t.hover)return`:is(${o}){${zd}}`;let n="row"in t?t.row:void 0;return`:is(${o}){${zd}}${Yy(o,n)}{filter:none!important}`}).join(`
`)}function Qy(e,t){for(let o of document.elementsFromPoint(e,t))if(o instanceof Element){let n=o.closest(Fy);if(n)return n}return null}function aa(e){for(let t of document.querySelectorAll(`[${kt}]`))t!==e&&t.removeAttribute(kt);e&&!e.hasAttribute(kt)&&e.setAttribute(kt,"")}var Ao,jy=Ye(()=>{Ao&&aa(Qy(Ao.clientX,Ao.clientY))});function ia(e){Ao=e,jy()}function Wy(e){e.relatedTarget instanceof Node&&document.documentElement.contains(e.relatedTarget)||(Ao=void 0,aa(null))}var sa,Kr,Zd=f({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:Jd,styles:Ky,start(){sa=Ce(),Kr=new AbortController;let e={capture:!0,signal:Kr.signal,passive:!0};document.addEventListener("pointerover",ia,e),document.addEventListener("pointermove",ia,e),document.addEventListener("pointerout",ia,e),window.addEventListener("pointerleave",Wy,e)},stop(){Kr?.abort(),Kr=void 0,Ao=void 0,aa(null),sa?.(),sa=void 0}});var Xd=g({openNewAsTemporary:{type:"boolean",description:"Open New chat as a temporary chat.",default:!1}}),zy=/^(?:new chat|新聊天)$/i,Qr;function Vy(e){return e?"/?temporary-chat=true":"/"}function Jy(e){let t=Vy(e);`${location.pathname}${location.search}`===t||e&&Ee()&&location.pathname==="/"||location.assign(t)}function Zy(e){if(e.closest("[data-bloom]"))return!1;try{let t=new URL(e.href,location.origin);return t.origin===location.origin&&t.pathname==="/"}catch{return!1}}function $y(e){return e.closest("[data-bloom], [data-app-action-sidebar-project-row]")?!1:zy.test(e.getAttribute("aria-label")??y(e.textContent??""))}function Xy(e){if(!Xd.store.openNewAsTemporary||Ee())return;let{target:t}=e;if(!(t instanceof Element))return;let o=t.closest("a[href], button"),n=o instanceof HTMLAnchorElement?Zy(o):!!o&&$y(o);!o||!n||o.closest(`${u.sidebarScroll}, ${u.rail}, ${u.oldSidebar}, nav`)&&(e.preventDefault(),e.stopPropagation(),Jy(!0))}function $d(){for(let e of document.querySelectorAll('[data-bloom="temporary-chat"]'))e.remove()}var _d=f({name:"TemporaryChat",description:"Optionally open New chat as a temporary chat. No extra sidebar button.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"ghost",enabledByDefault:!0,settings:Xd,start(){$d(),Qr=new AbortController,document.addEventListener("pointerdown",Xy,{capture:!0,signal:Qr.signal})},stop(){Qr?.abort(),Qr=void 0,$d()}});var nt=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)','[data-turn-key] [data-message-author-role="user"] blockquote:not(.twitter-tweet)','[class~="group/user-message"] blockquote:not(.twitter-tweet)'].join(","),la=g({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function _y(){let e=[`${nt}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${nt}>*{margin-block:0!important}`];return la.store.italic||e.push(`${nt}{font-style:inherit!important}`),la.store.quotes||(e.push(`${nt}{quotes:none!important}`),e.push(`${nt}::before,${nt}::after,${nt} p::before,${nt} p::after{content:none!important}`)),e.join(`
`)}var em=f({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:la,styles:_y});var ev=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],tv=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",ov='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',tm=g({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function nv(){let e=`${tm.store.width}rem`;return`:is(${tv}){${ev.map(t=>`${t}:${e}!important`).join(";")}}:is(${ov}){max-width:min(100%, ${e})!important}`}var om=f({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:tm,styles:nv});var rv=[fc,Wl,kc,Uc,Yc,_c,ou,nu,iu,fu,Su,Iu,Hu,ed,od,nd,ld,xd,Id,Ud,Yd,Wd,Zd,_d,em,om],ca=rv;var iv=new q("Bloom"),nm="2.0.98";var ua=0,jr;function sv(){ua++,jr?.(),jr=void 0,Qa(),So(),vn()}async function da(){let e=++ua,t=()=>e===ua;So(),vn(),nl();for(let o of ca)o.updatedAt=Cl[o.name];Ba(ca),Ma(),Pa(),indexedDB.deleteDatabase("bloompp"),It("base",Wa),xl(),Cn("Init"),Bn().then(()=>{t()&&(va(),Cn("DOMContentLoaded"))}),await il(),t()&&(Cn("HostReady"),jr?.(),jr=Tl(),Ka(),iv.info(`Bloom++ ${nm} ready`))}var av=new q("Boot");window===window.top&&(wa(oe.Bloom),xa(ma),da().catch(e=>av.error("Startup failed",e)));})();
