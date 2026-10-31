// ==UserScript==
// @name         Bloom++ (ChatGPT app)
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.110
// @description  Bloom++ host for the official ChatGPT macOS app. Injected over loopback CDP; not a web userscript.
// @author       0-V-linuxdo & Bloom contributors
// @homepageURL  https://github.com/0-V-linuxdo/Bloom
// @supportURL   https://github.com/0-V-linuxdo/Bloom/issues
// @match        app://*/*
// @run-at       document-start
// @grant        none
// @license      GPL-3.0-or-later
// ==/UserScript==

/* Bloom++ v2.0.110 ChatGPT app host. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Fu=Object.defineProperty;var Ku=(t,e)=>{for(var o in e)Fu(t,o,{get:e[o],enumerable:!0})};var x=class{constructor(e){this.tag=e}log(e,o){console[e](`[Bloom++] [${this.tag}]`,...o)}debug(...e){this.log("debug",e)}info(...e){this.log("info",e)}warn(...e){this.log("warn",e)}error(...e){this.log("error",e)}};var nt=(t,e,o)=>Math.min(o,Math.max(e,t)),k=t=>typeof t=="object"&&t!==null&&!Array.isArray(t),oo=t=>`${t}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,yt=(t,e)=>t.length>e?`${t.slice(0,e-1)}\u2026`:t,v=t=>t.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function xa(t,e){return`${t} ${e}${t===1?"":"s"}`}async function Vo(t){if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}await navigator.clipboard.writeText(t)}function Jo(t){try{return JSON.parse(t)}catch{return}}var mt=typeof unsafeWindow>"u"?window:unsafeWindow,Gu=200,Yu=300;function Zo(t){return new Promise((e,o)=>GM_xmlhttpRequest({url:t,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=Gu&&n<Yu?e(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var ju=new x("Styles"),Dt=new Map,no=new Set,oe=new Map,br=!0,Sa=t=>t.replaceAll(/[^A-Za-z0-9_-]/g,"_"),Qu=t=>`:where(:root){--bloom-sheet-${Sa(t)}:1}`,Wu=(t,e)=>`${Qu(t)}${e}`,qa=t=>`bloom-style-${t}`;function Ea(t){try{return[...t.cssRules].map(e=>e.cssText).join(`
`)}catch{return""}}function zu(t,e){let o=Ea(t);return o?o.includes(`--bloom-sheet-${Sa(e)}`)?!0:e==="plugin-StreamerMode"?o.includes("blur(6px)")&&(o.includes("data-app-action-sidebar-thread-title")||o.includes("data-bloom-streamer-open")):e==="plugin-WiderChat"?o.includes("--composer-adjacent-max-width")&&o.includes("--thread-content-max-width"):e==="plugin-ComposerOpacity"?o.includes("--composer-layout-surface-backdrop-filter")||o.includes("--composer-layout-surface-background")&&o.includes("color-mix"):!1:!1}function Ta(t){let e=Ea(t);return e?!!(e.includes("--bloom-")||e.includes(".bloom-")||e.includes("[data-bloom")||e.includes("--bloom-sheet-")||e.includes("blur(6px)")&&e.includes("data-app-action-sidebar-thread-title")||e.includes("--composer-adjacent-max-width")&&e.includes("--thread-content-max-width")||e.includes("--composer-layout-surface-backdrop-filter")):!1}function Ma(){let t=document.adoptedStyleSheets.filter(e=>!no.has(e)&&!Ta(e));document.adoptedStyleSheets=[...t,...Dt.values()]}function Ca(t){document.readyState==="loading"||t.parentNode===document.head||document.head.append(t)}function Vu(t,e){let o=oe.get(t);o||(o=document.createElement("style"),o.id=qa(t),oe.set(t,o)),o.textContent!==e&&(o.textContent=e),Ca(o)}function $o(t,e){let o=Wu(t,e);if(br)try{let n=Dt.get(t);n||(n=new mt.CSSStyleSheet,Dt.set(t,n),no.add(n)),n.replaceSync(o),Ma();return}catch(n){ju.warn("Constructed style sheets unavailable, using <style> after parsing",n),br=!1;let r=Dt.get(t);r&&no.delete(r),Dt.delete(t)}Vu(t,o)}function ro(t){let e=Dt.get(t);e&&(no.delete(e),Dt.delete(t)),oe.get(t)?.remove(),oe.delete(t);for(let o of document.querySelectorAll(`style[id="${qa(t)}"]`))o.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(o=>o!==e&&!zu(o,t)),br&&Ma()}catch{}}function io(){Dt.clear(),no.clear();for(let t of oe.values())t.remove();oe.clear();for(let t of document.querySelectorAll("style[id^='bloom-style-']"))t.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(t=>!Ta(t))}catch{}}function La(){for(let t of oe.values())Ca(t)}var I=t=>(...e)=>e.map(o=>t+o).join(" "),Xo=(...t)=>t.filter(Boolean).join(" "),Nt=t=>t.length?`${t.map(e=>`${e}:not([data-bloom])`).join(",")}{display:none!important}`:"";var ka="__bloomHost",yr=new x("Boot"),Ju=['[data-bloom="navigator"]','[data-bloom="settings"]','[data-bloom="history-hud"]','[data-bloom="history-dialog"]','[data-bloom="star-list"]','[data-bloom="entry"]','[data-bloom="menu-entry"]','[data-bloom="menu-flyout"]','[data-bloom="message-star"]','[data-bloom="starred"]','[data-bloom="chat-star"]','[data-bloom="queue"]','[data-bloom="recent"]','[data-bloom="quote-chip"]','[data-bloom="quote-back"]','[data-bloom="cls"]','[data-bloom="timestamp"]','[data-bloom="tooltip"]','[data-bloom="notices"]'].join(", "),Zu=["data-bloom-greeting","data-bloom-placeholder","data-bloom-streamer-open","data-bloom-share","data-bloom-invite","data-bloom-csi-avatar","data-bloom-csi-sized"];function _o(){if(!(typeof document>"u"||!document.documentElement)){for(let t of document.querySelectorAll(Ju))t.remove();for(let t of Zu)for(let e of document.querySelectorAll(`[${t}]`))e.removeAttribute(t);for(let t of document.querySelectorAll("[data-bloom-text]"))t.removeAttribute("data-bloom-text"),t.style.removeProperty("--bloom-text-size"),t.style.removeProperty("--bloom-text")}}function $u(t){if(yr.warn("Replacing another Bloom++ instance",t.VERSION),t.destroy){t.destroy();return}for(let e of t.plugins?.values()??[]){try{e.stop?.()}catch(o){yr.error("Failed to stop previous plugin",o)}e.styles="",e.start=void 0}io()}function Ia(t){let e=mt,o=new Set;for(let n of[t,e.Bloom,e[ka]])if(!(!n||o.has(n))){o.add(n);try{$u(n)}catch(r){yr.error("Failed to retire Bloom++",r)}}_o()}function Ba(t){let e=mt;try{delete e.Bloom}catch{}Object.defineProperty(e,"Bloom",{value:t,configurable:!0,writable:!0}),Object.defineProperty(e,ka,{value:t,configurable:!0,writable:!0})}var Aa={};Ku(Aa,{VERSION:()=>Nu,destroy:()=>Fh,init:()=>va,plugins:()=>Z});var Xu=new x("Dom");function a(t,e={},...o){let n=document.createElement(t);e.class&&(n.className=e.class),e.text!=null&&(n.textContent=e.text),e.title&&(n.title=e.title);for(let[r,i]of Object.entries(e.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(e.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var Pa=document.createElement("template");function Oa(t){return Pa.innerHTML=t.trim(),Pa.content.firstElementChild.cloneNode(!0)}var rt=t=>t instanceof HTMLElement&&t.isConnected&&t.getClientRects().length>0&&!t.closest("[inert]"),vt=(t,e=document)=>[...e.querySelectorAll(t)].find(rt)??null,_u=16,td="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function on(t,e){let o=setInterval(t,e),n;try{n=new Worker(URL.createObjectURL(new Blob([td],{type:"text/javascript"}))),n.addEventListener("message",t),n.postMessage(e)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function vr(t){document.hidden?setTimeout(t,_u):requestAnimationFrame(t)}function Ut(t){let e=!1;return()=>{e||(e=!0,vr(()=>{e=!1;try{t()}catch(o){Xu.error("Scheduled task failed",o)}}))}}var tn=new Set,en=[],ao,ed=Ut(()=>{let t=en;en=[];for(let e of tn)e(t)});function C(t){return tn.add(t),ao||(ao=new MutationObserver(e=>{en.push(...e),ed()}),ao.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),t([]),()=>{tn.delete(t),!tn.size&&(ao?.disconnect(),ao=void 0,en=[])}}var od=t=>t instanceof Element&&(t.hasAttribute("data-bloom")||!!t.closest("[data-bloom]")),Y=t=>!t.length||t.some(e=>!od(e.target)),nd=t=>`"${t.replaceAll("\\","\\\\").replaceAll('"','\\"').replaceAll(`
`,"\\A ")}"`;function ne(t,e){if(e==null){t.removeAttribute("data-bloom-text"),t.style.removeProperty("--bloom-text-size"),t.style.removeProperty("--bloom-text");return}t.style.setProperty("--bloom-text",nd(e)),t.getAttribute("data-bloom-text")!==e&&t.setAttribute("data-bloom-text",e)}function h(t){return t}var rd=new x("Storage");function nn(t){try{return localStorage.getItem(t)??void 0}catch{return}}function rn(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch(o){rd.warn("localStorage write failed",o)}}function Ra(t,e){addEventListener("storage",o=>{o.key===t&&e(o.newValue)})}var Ar="BloomSettings",id=100,Ft={plugins:{}},an=new Set,wr=new Set,qe;function Ha(t){let e=t;for(let o=0;typeof e=="string"&&o<2;o++)e=Jo(e);return!k(e)||!k(e.plugins)||!Object.keys(e.plugins).length?null:e}function Da(){let t=Ha(nn(Ar));t&&(Ft.plugins=t.plugins)}var Na=(t,e)=>`${t}
${e}`;function xr(){qe=void 0,wr.clear(),rn(Ar,Ft)}function ad(t){let e=Ha(t);if(!e)return;let o=[];for(let n of new Set([...Object.keys(Ft.plugins),...Object.keys(e.plugins)])){let r=Ft.plugins[n]??={},i=k(e.plugins[n])?e.plugins[n]:{};for(let s of new Set([...Object.keys(r),...Object.keys(i)]))wr.has(Na(n,s))||JSON.stringify(r[s])===JSON.stringify(i[s])||(i[s]===void 0?delete r[s]:r[s]=i[s],o.push([n,s]))}for(let[n,r]of o)for(let i of an)i(n,r)}function Sr(){qe&&(clearTimeout(qe),xr())}function Ua(t){let e=Object.keys(Ft.plugins).filter(o=>!t.has(o));if(!e.length)return e;for(let o of e)delete Ft.plugins[o];return clearTimeout(qe),xr(),e}var it=(t,e)=>Ft.plugins[t]?.[e];function pt(t,e,o){let n=Ft.plugins[t]??={};o===void 0?delete n[e]:n[e]=o,wr.add(Na(t,e)),clearTimeout(qe),qe=setTimeout(xr,id);for(let r of an)r(t,e)}function Ee(t){return an.add(t),()=>void an.delete(t)}function qr(t){return t.type==="component"?void 0:t.default}function y(t){let e={def:t,pluginName:"",store:new Proxy({},{get:(o,n)=>it(e.pluginName,n)??(t[n]&&qr(t[n])),set:(o,n,r)=>(pt(e.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(t))t[o].type!=="custom"&&it(e.pluginName,o)!==void 0&&pt(e.pluginName,o)}};return e}var Fa=t=>{let e=()=>{let o=it("Settings",t);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>e().includes(o),list:e,toggle(o){let n=e();pt("Settings",t,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},sn=Fa("pinnedPlugins"),ln=Fa("starredPlugins");addEventListener("pagehide",Sr);Ra(Ar,ad);var co=new x("PluginManager"),Z=new Map,Kt=new Set,un=new Set,Er=new Set,so=new Map,sd=2880*60*1e3;function Ka(t){for(let e of t)e.settings&&(e.settings.pluginName=e.name),Z.set(e.name,e)}var Ga=()=>{let t=it("Settings","knownPlugins");return k(t)?t:null};function Ya(){let t=Ua(new Set(Z.keys()));t.length&&co.info(`Dropped settings of removed plugins: ${t.join(", ")}`);let e=Ga(),o=Date.now(),n={...e},r=[...Z.values()].filter(i=>!i.hidden&&!i.required&&!(i.name in n));for(let i of r)n[i.name]=e?o:0;for(let i of Object.keys(n))Z.has(i)||delete n[i];JSON.stringify(n)!==JSON.stringify(e)&&pt("Settings","knownPlugins",n)}var ja=t=>{let e=Ga()?.[t];return!!e&&Date.now()-e<sd},Qa=t=>so.get(t);function Wa(){for(let t of Er)t()}function Tr(t,e){let o=so.get(t);(e?o?.join(`
`)===e.join(`
`):!o)||(e?so.set(t,e):so.delete(t),Wa())}var Ct=t=>!!t.required||(it(t.name,"enabled")??!!t.enabledByDefault),Mr=t=>Kt.has(t),lo=t=>`plugin-${t.name}`;function za(t){if(!t.styles)return;let e=typeof t.styles=="function"?t.styles():t.styles;e?$o(lo(t),e):ro(lo(t))}function Va(t){if(!Kt.has(t.name))try{za(t),t.start?.(),Kt.add(t.name)}catch(e){ro(lo(t)),co.error(`Failed to start ${t.name}`,e)}}function dn(t){Kt.delete(t.name),ro(lo(t));try{t.stop?.()}catch(e){co.error(`Failed to stop ${t.name}`,e)}}var Cr=t=>t.startAt??"HostReady";function Ja(t){if(Ct(t)){un.has(Cr(t))&&Va(t);return}dn(t)}function mn(t){un.add(t);for(let e of Z.values())Cr(e)===t&&Ja(e);co.info(`${t}: ${[...Kt].join(", ")}`)}function Za(t){dn(t)}function $a(t){Ct(t)&&un.has(Cr(t))&&Va(t)}function Xa(t,e){pt(t.name,"enabled",e),Sr()}function ld(){for(let t of Z.values())t.required||Ct(t)||(Kt.has(t.name)?dn(t):ro(lo(t)))}var cn;function _a(){cn?.(),cn=C(()=>ld())}function ts(){cn?.(),cn=void 0;for(let t of Z.values())dn(t);Kt.clear(),un.clear(),so.clear()}function es(t){return Er.add(t),()=>void Er.delete(t)}Ee((t,e)=>{let o=Z.get(t);if(o){if(e==="enabled"){typeof it(t,"enabled")=="boolean"&&Ja(o),Wa();return}if(Kt.has(t))try{za(o),o.onSettingsChange?.(e)}catch(n){co.error(`Settings change failed for ${t}`,n)}}});var os=`/*
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
`;var ud=new x("Events");function Te(){let t=new Map;return{on(e,o){let n=t.get(e);return n||t.set(e,n=new Set),n.add(o),()=>void n.delete(o)},emit(e,o){for(let n of t.get(e)??[])try{n(o)}catch(r){ud.error(`Listener for ${String(e)} failed`,r)}}}}function ns(t,e){let o=t instanceof Element?[t,...t.querySelectorAll("*")]:[...t.querySelectorAll("*")];for(let n of o){let r=n.shadowRoot;r&&(e(r),ns(r,e))}}function Gt(t,e=document){let o=[...e.querySelectorAll(t)];return ns(e,n=>o.push(...n.querySelectorAll(t))),o}var Lt=(t,e=document)=>Gt(t,e).find(rt)??null;var c={rail:"[data-app-navigation-rail]",sidebarScroll:"[data-app-action-sidebar-scroll]",sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"[data-app-action-sidebar-scroll]",oldRail:"[data-app-navigation-rail]",oldProfile:'button[aria-label="Open profile menu" i]',threadRow:"[data-app-action-sidebar-thread-row]",threadSelected:"[data-app-action-sidebar-thread-row][data-app-action-sidebar-thread-selected='true']",threadTitle:"[data-app-action-sidebar-thread-title]",projectRow:"[data-app-action-sidebar-project-row]",projectLabel:"[data-app-action-sidebar-project-label]",destination:"[data-sidebar-destination]",conversationLink:"[data-app-action-sidebar-thread-row]",timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:"[data-turn-key]",turn:"[data-turn-key]",messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",userBubble:'[class~="group/user-message"]',assistantReply:"[data-response-annotation-target]",oldThread:"[data-app-action-timeline-scroll]",turnActions:'.turn-action-controls, [class*="turn-action-controls"]',readAloud:'button:is([aria-label="Read aloud" i], [aria-label^="Read aloud" i], [aria-label="Stop reading" i], [aria-label^="Stop reading" i], [aria-label="\u6717\u8BFB"], [aria-label^="\u6717\u8BFB"], [aria-label="\u505C\u6B62\u6717\u8BFB"], [data-testid*="read-aloud" i])',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery, [class*='recovery']",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composer:"[data-chatgpt-composer], [data-composer-input]",composerInput:'[data-composer-input] [contenteditable="true"].ProseMirror, [contenteditable="true"].ProseMirror',composerConversation:"[data-above-composer-conversation-id]",oldComposerForm:"[data-chatgpt-composer]",sendButton:'button[aria-label="Send" i], button[aria-label="Send prompt" i], button[aria-label="Send message" i]',stopButton:'button[aria-label="Stop" i], button[aria-label^="Stop " i], button[aria-label="\u505C\u6B62" i], button[aria-label^="\u505C\u6B62"]',composerFooter:"[data-chatgpt-composer]",modelTrigger:'button[aria-label="Model selector" i], button[aria-label="Select ChatGPT model" i], [data-chatgpt-composer] button[aria-haspopup="menu"]',modelItem:'[role="menu"] [role="menuitemradio"], [role="menu"] [role="menuitem"]',effortSlider:'[role="menu"] [data-reasoning-slider]',homeHeading:'main h1:not([aria-hidden="true"]), [role="main"] h1:not([aria-hidden="true"]), [data-testid="home-heading"], [data-homepage-takeover] h1, .heading-xl, [class~="heading-xl"]',headerMore:'button[aria-label="More" i], button[aria-label="\u66F4\u591A"]',headerTitle:"[data-thread-title], [data-thread-title-trigger]",profile:'button[aria-label="Open profile menu" i]',rightPanel:"aside[data-app-shell-focus-area='right-panel']",summaryPanel:"[data-summary-panel-variant]"};var rs=/[​-‍﻿]/g,ft=()=>Lt(c.composerInput),uo=t=>t instanceof HTMLElement&&t.matches(c.composerInput),st=(t=ft())=>t?.closest("form")??t?.closest(c.composer)??Lt(c.composer);function J(t=ft()){if(!t)return"";if(t instanceof HTMLTextAreaElement)return t.value.replace(rs,"").trim();let e=t.cloneNode(!0);for(let n of e.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...e.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:e.textContent??"").replace(rs,"").trim()}var dd=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function is(t,e){let o=e?"insertText":"deleteContentBackward";t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:o,data:e||null})),t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:o,data:e||null}))}function kt(t,e=ft()){if(!e)return!1;if(e.focus(),e instanceof HTMLTextAreaElement)return dd?.call(e,t),e.dispatchEvent(new Event("input",{bubbles:!0})),e.setSelectionRange(t.length,t.length),!0;let o=getSelection();return o?.selectAllChildren(e),typeof document.execCommand=="function"?t?document.execCommand("insertText",!1,t):document.execCommand("delete"):is(e,t),J(e)!==t.trim()&&is(e,t),o?.selectAllChildren(e),o?.collapseToEnd(),!0}function as(t,e){let o=t;for(;o&&o!==e;){if(o instanceof HTMLElement&&o.parentElement===e)return o;o=o.parentNode}return null}function ss(t,e,o){let n=document.createRange();return n.selectNodeContents(t),o?n.setEnd(e.startContainer,e.startOffset):n.setStart(e.endContainer,e.endOffset),n.toString().includes(`
`)?!0:!!n.cloneContents().querySelector("br")}function ls(t){if(t instanceof HTMLTextAreaElement){let{selectionStart:f,selectionEnd:T,value:g}=t;return{first:!g.slice(0,f).includes(`
`),last:!g.slice(T).includes(`
`)}}let e=getSelection();if(!e?.rangeCount||!t.contains(e.anchorNode))return{first:!0,last:!0};let o=e.getRangeAt(0),n=[...t.children].filter(f=>f instanceof HTMLElement),r=as(o.startContainer,t),i=as(o.endContainer,t),s=!r||r===n[0],d=!i||i===n[n.length-1],l=o.getBoundingClientRect(),u=(r??t).getBoundingClientRect(),m=Number.parseFloat(getComputedStyle(r??t).lineHeight)||24;return l.height?{first:s&&l.top-u.top<m,last:d&&u.bottom-l.bottom<m}:{first:s&&!ss(r??t,o,!0),last:d&&!ss(i??t,o,!1)}}var cs=t=>{let e=st();return(e&&Lt(t,e))??Lt(t)},Lr=()=>cs(c.stopButton),md=()=>{let t=cs(c.sendButton);return t&&!t.matches(c.stopButton)?t:null};function us(){let t=md();if(t){t.disabled||t.click();return}ft()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var ds=()=>rt(Lr());var pn=new x("AppProtocol"),mo=Te();function pd(t){let e=t;if(typeof e=="string")try{e=JSON.parse(e)}catch{return null}if(Array.isArray(e)||!e||typeof e!="object")return null;let o=e,n=o.notification&&typeof o.notification=="object"?o.notification:o;if(typeof n.method!="string")return null;let r=n.params&&typeof n.params=="object"?n.params:void 0;return{method:n.method,params:r}}function po(t){if(Array.isArray(t)){for(let o of t)po(o);return}let e=pd(t);e&&mo.emit("note",e)}var Ir=new WeakMap,kr=new WeakMap;function fd(t,e){let o=Ir.get(t);if(o)return o;let n=r=>{po(r.data),typeof t=="function"?t.call(e,r):t.handleEvent(r)};return Ir.set(t,n),n}function gd(){let t=MessagePort.prototype,e=t.addEventListener,o=t.removeEventListener;t.addEventListener=function(r,i,s){return r!=="message"?e.call(this,r,i,s):e.call(this,r,fd(i,this),s)},t.removeEventListener=function(r,i,s){return r!=="message"?o.call(this,r,i,s):o.call(this,r,Ir.get(i)??i,s)};let n=Object.getOwnPropertyDescriptor(t,"onmessage");n?.set&&Object.defineProperty(t,"onmessage",{configurable:!0,enumerable:n.enumerable,get(){return kr.has(this)?kr.get(this):n.get?.call(this)},set(r){kr.set(this,r),n.set.call(this,function(s){po(s.data),r?.call(this,s)})}})}function hd(){let t=window.electronBridge,e=t?.subscribeToWorkerMessages;if(!(!t||typeof e!="function"))try{t.subscribeToWorkerMessages=(o,n)=>e.call(t,o,r=>{po(r),n(r)})}catch(o){pn.warn("electronBridge.subscribeToWorkerMessages is not writable",o)}}function bd(){addEventListener("message",t=>po(t.data));try{gd()}catch(t){pn.warn("MessagePort wrap failed",t)}try{hd()}catch(t){pn.warn("electronBridge wrap failed",t)}pn.info("Listening for app-server notifications")}bd();var yd=new x("AppRoute"),vd=500,gn=new Set,hn=null,fn;function b(){return Gt(c.threadRow).find(e=>{let o=e.getAttribute("data-app-action-sidebar-thread-selected"),n=e.getAttribute("data-app-action-sidebar-thread-active"),r=e.getAttribute("aria-current");return o==="true"||n==="true"||r==="page"||r==="true"})?.getAttribute("data-app-action-sidebar-thread-id")??null}var Me=()=>!b(),ps=()=>!1,re=()=>!1;function ms(){let t=b();if(t===hn)return;let{href:e}=location,o={prevHref:e,href:e,prevId:hn,id:t};hn=t;for(let n of gn)try{n(o)}catch(r){yd.error("Route listener failed",r)}}function Ad(){let t=new MutationObserver(ms);(()=>{document.body&&t.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-app-action-sidebar-thread-selected","data-app-action-sidebar-thread-id"]})})();let o=setInterval(ms,vd);return()=>{t.disconnect(),clearInterval(o)}}function At(t){return gn.add(t),fn||(hn=b(),fn=Ad()),()=>{gn.delete(t),!gn.size&&(fn?.(),fn=void 0)}}var wd=250,xd=400,D=Te(),ie=!1,Ce=null,le=!1,ae="done",se=!1,fs=!1,tt=()=>({generating:ie,conversationId:b()}),Sd=t=>{if(!t)return!0;let e=b();return e?e===t||e.endsWith(t)||t.endsWith(e.replace(/^local:/,"")):!0};function qd(t){return t==="interrupted"||t==="aborted"||t==="cancelled"?"stopped":t==="failed"||t==="error"?"error":"done"}function Ed(){return se||ds()}function Td(t){Ce=null,ie=!1,se=!1,D.emit("fall",{conversationId:b(),outcome:t}),le=!1,ae="done"}function Md(){let t=Ed();t&&!ie&&(ie=!0,le=!1,ae="done",D.emit("rise",{conversationId:b()})),t||!ie?Ce=null:Ce==null?Ce=Date.now():Date.now()-Ce>=xd&&Td(le?"stopped":ae)}function fo(){Md(),D.emit("tick",tt())}function Cd({prevId:t,id:e}){t!==e&&(ie&&(se=!1,Ce=null,ie=!1,le=!1,ae="done",D.emit("fall",{conversationId:t,outcome:"left"})),D.emit("context",{prevId:t,id:e,migrated:!t&&!!e}),fo())}function Ld(t){if(Sd(t.params?.threadId)){if(t.method==="turn/started"){se=!0,fo();return}if(t.method==="turn/interrupt"){se=!1,ae="stopped",le=!0,fo();return}t.method==="turn/completed"&&(se=!1,ae=qd(t.params?.turn?.status),ae==="stopped"&&(le=!0),fo())}}function kd(t){t.target instanceof Element&&t.target.closest(c.stopButton)&&(le=!0,se=!1)}function gs(){fs||(fs=!0,mo.on("note",Ld),At(Cd),document.addEventListener("click",kd,!0),on(fo,wd))}var Id="__reactContainer$",hs="__reactFiber$";function Pr(){return document.readyState!=="loading"?Promise.resolve():new Promise(t=>document.addEventListener("DOMContentLoaded",()=>t(),{once:!0}))}var Br=(t,e)=>Object.keys(t.wrappedJSObject??t).some(o=>o.startsWith(e)),wt=t=>!Br(document,Id)||Br(t,hs);function Yt(){return document.body?Promise.resolve():new Promise(t=>{let e=new MutationObserver(()=>{document.body&&(e.disconnect(),t())});e.observe(document,{childList:!0,subtree:!0})})}async function Or(){await Yt();let t=Date.now()+8e3;for(;!Br(document.body,hs)&&Date.now()<t;)await new Promise(e=>setTimeout(e,100))}var bs={BetterNavigator:1793462309e3,BetterQuotes:1793365944e3,ChatListStatus:1793351872e3,ChatStateFavicons:179069068e4,Cleaner:1793267811e3,CompleteToast:1793354069e3,ComposerOpacity:1793344667e3,Continue:1790939902e3,CustomSidebarIdentity:179069068e4,GreetingCustomizer:1793350808e3,InputHistory:1793365944e3,MessageTimestamps:1791080494e3,NoDictation:1793335268e3,NoShareLink:179069068e4,NoSidebarIdentity:179069068e4,PromptQueue:1793365944e3,RecentTopics:1793365944e3,ResponseNotification:1793354069e3,Settings:1793448244e3,SidebarIdentityOpacity:179069068e4,StarChats:1793365944e3,StreamerMode:1793344667e3,TemporaryChat:1792014624e3,UserQuotes:1793345744e3,WiderChat:179333264e4};var S=t=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`,Bd="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",Pd={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${Bd}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:S('<path d="M18 6 6 18M6 6l12 12"/>'),gear:S('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:S('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:S('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:S('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:S('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:S('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:S('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:S('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:S('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:S('<path d="m6 9 6 6 6-6"/>'),play:S('<path d="M7 4v16l13-8z"/>'),plus:S('<path d="M12 5v14M5 12h14"/>'),check:S('<path d="m5 12 5 5 9-10"/>'),alert:S('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:S('<path d="M4 5h16v11H9l-5 4z"/>'),layout:S('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:S('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:S('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:S('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:S('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:S('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:S('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:S('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:S('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:S('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:S('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:S('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:S('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:S('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:S('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:S('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),folder:S('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),ghost:S('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},B=t=>Oa(Pd[t]);function Rr(t){if(typeof t.showPopover=="function"){t.setAttribute("popover","manual");try{t.showPopover()}catch{t.matches(":popover-open")||t.removeAttribute("popover")}}}function xt(t,e=document.body){e.append(t),Rr(t)}var gt="data-bloom-tip",Hr=6,Dr=8,ce,ys=null;function Le(t){if(t===ys)return;if(ys=t,!t){ce?.remove();return}ce??=a("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),ce.textContent=t.getAttribute(gt),xt(ce);let e=t.getBoundingClientRect(),{width:o,height:n}=ce.getBoundingClientRect(),r=e.bottom+Hr+n<=innerHeight-Dr;ce.style.left=`${nt(e.left+e.width/2-o/2,Dr,innerWidth-o-Dr)}px`,ce.style.top=`${r?e.bottom+Hr:e.top-Hr-n}px`}var vs=t=>t instanceof Element?t.closest(`[${gt}]`):null;function As(){let t=new AbortController,e={passive:!0,signal:t.signal};return document.addEventListener("pointerover",o=>Le(vs(o.target)),e),document.addEventListener("pointerout",o=>o.relatedTarget||Le(null),e),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&Le(vs(o.target)),e),document.addEventListener("focusout",()=>Le(null),e),document.addEventListener("pointerdown",()=>Le(null),e),()=>{t.abort(),Le(null)}}function jt(t,e,o,n=!1){let r=a("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(t),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let s=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(s)),e(s)===!1&&r.setAttribute("aria-checked",String(!s))}),r}function F(t,e,o){return a("button",{class:Xo("bloom-button",o&&`bloom-button-${o}`),text:t,attrs:{type:"button","data-bloom":"control"},on:{click:e}})}function z(t,e,o,n){let r=a("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":e,"data-bloom":"control",[gt]:e},on:{click:o}},B(t));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function bn(t,e,o,n,r,i){let s=a("input",{attrs:{type:"range",min:String(e),max:String(o),step:String(n)}});s.value=String(t);let d=a("output",{text:`${s.value}${r}`});return s.addEventListener("input",()=>{d.textContent=`${s.value}${r}`,i(Number(s.value))}),a("div",{class:"bloom-slider"},s,d)}function Nr(t,e,o){let n=a("select",{class:"bloom-select"},...e.map(r=>a("option",{text:r.label,attrs:{value:r.value}})));return n.value=t,n.addEventListener("change",()=>o(n.value)),n}function go(t,e,o="",n="text"){let r=a("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=t,r.addEventListener("change",()=>e(r.value)),r}var yn=["showSidebarEntry","showSidebarEntryOnHover","showAccountMenuEntry"],ws=1,ke={showSidebarEntry:!0,showSidebarEntryOnHover:!1,showAccountMenuEntry:!1},Ur=t=>Object.hasOwn(ke,t),Fr=t=>it("Settings",t)??ke[t],xs=(t,e)=>!Ur(t)||e!==!1||yn.some(o=>o!==t&&Fr(o));function Ss(){if(it("Settings","entryRevision")!==ws){for(let t of yn)pt("Settings",t);pt("Settings","entryRevision",ws)}}var Od=new x("Themes"),Rd=/^https:\/\/\S+\.css(?:[?#]|$)/i,Hd=/\/\*\*[^]*?@name[ \t]+([^\n*]+)/,j=y({themes:{type:"custom",default:[]},quickCss:{type:"custom",default:""},quickCssEnabled:{type:"custom",default:!0}});async function qs(t){let e=new TextDecoder().decode(await Zo(t));if(!e.trim())throw new Error("Theme file is empty.");return e}var vn=(t,e)=>{j.store.themes=j.store.themes.map(o=>o.id===t?{...o,...e}:o)},Es=t=>{j.store.themes=j.store.themes.filter(e=>e.id!==t)};async function Ts(t){if(!Rd.test(t))throw new Error("Enter an https URL that ends in .css.");if(j.store.themes.some(n=>n.url===t))throw new Error("This theme is already added.");let e=await qs(t),o=e.match(Hd)?.[1]?.trim()||decodeURIComponent(new URL(t).pathname.split("/").pop()??t).replace(/\.css$/i,"").replaceAll(/[-_]/g," ");j.store.themes=[...j.store.themes,{id:oo("theme"),name:o,url:t,css:e,enabled:!0}]}function Ms(t,e,o){if(!e.trim())throw new Error("Name is required.");if(!o.trim())throw new Error("CSS is required.");t?vn(t,{name:e.trim(),css:o}):j.store.themes=[...j.store.themes,{id:oo("theme"),name:e.trim(),css:o,enabled:!0}]}async function Dd(){await Promise.all(j.store.themes.filter(t=>t.url&&t.enabled).map(async({id:t,url:e,name:o})=>{try{let n=await qs(e??"");j.store.themes.find(r=>r.id===t)?.css!==n&&vn(t,{css:n})}catch(n){Od.warn(`Failed to refresh theme "${o}"`,n)}}))}var Cs=h({name:"Themes",description:"Applies Bloom++ themes and Quick CSS.",authors:["Bloom contributors"],tags:[],icon:"spark",required:!0,hidden:!0,startAt:"Init",settings:j,styles:()=>[...j.store.themes.filter(t=>t.enabled).map(t=>t.css),j.store.quickCssEnabled?j.store.quickCss:""].join(`
`),start(){Dd()}});var Q=I("bloom-settings-"),Nd=3e3,Ls=(t,e)=>{let o=a("textarea",{class:`bloom-input ${Q("css")}`,attrs:{spellcheck:"false",placeholder:"Paste your CSS here...","aria-label":e}});return o.value=t,o},Kr=(t,e)=>a("div",{class:Q("section-header")},a("div",{class:Q("field-label"),text:t}),a("div",{class:Q("field-desc"),text:e}));function ks(){let{quickCss:t,quickCssEnabled:e}=j.store,o=Ls(t,"Quick CSS");return o.disabled=!e,o.addEventListener("input",()=>{j.store.quickCss=o.value}),a("div",{class:Q("section")},a("div",{class:Q("field","field-inline")},Kr("Quick CSS","Your own CSS, applied on every page as you type."),jt(e,n=>{j.store.quickCssEnabled=n,o.disabled=!n},"Enable Quick CSS")),o)}function Is(){let t=a("div",{class:Q("section")}),e=null,o=()=>a("div",{class:Q("section-error"),attrs:{role:"alert"}});function n(){let l=a("input",{class:"bloom-input",attrs:{type:"url",placeholder:"https://raw.githubusercontent.com/...","aria-label":"Theme URL"}}),u=o(),m=F("Add",async()=>{m.disabled=!0,u.textContent="";try{await Ts(l.value.trim()),d()}catch(f){u.textContent=f instanceof Error?f.message:String(f),m.disabled=!1}});return a("div",{class:Q("section-block")},Kr("Online themes","Load a theme from a .css URL. It is fetched again on every page load, so updates apply."),a("div",{class:Q("section-row")},l,m),u)}function r(){let l=e==="new"?null:e,u=a("input",{class:"bloom-input",attrs:{placeholder:"My theme","aria-label":"Theme name"}});u.value=l?.name??"";let m=Ls(l?.css??"","Theme CSS"),f=o();return a("div",{class:Q("section-block")},u,m,f,a("div",{class:Q("section-row")},F("Save",()=>{try{Ms(l?.id??null,u.value,m.value),e=null,d()}catch(T){f.textContent=T instanceof Error?T.message:String(T)}}),F("Cancel",()=>{e=null,d()})))}function i(){return a("div",{class:Q("section-block")},a("div",{class:Q("field","field-inline")},Kr("Local themes","CSS stored only on this device."),!e&&F("New local theme",()=>{e="new",d()})),e&&r())}function s(l){let u,m=z("trash","Remove",()=>{if(u){clearTimeout(u),Es(l.id),d();return}m.setAttribute("aria-pressed","true"),m.setAttribute(gt,"Click again to remove"),u=setTimeout(()=>{u=void 0,m.removeAttribute("aria-pressed"),m.setAttribute(gt,"Remove")},Nd)});return a("div",{class:Q("theme")},a("div",{class:Q("theme-text")},a("div",{class:`${Q("card-name")} bloom-truncate`,text:l.name}),a("div",{class:`${Q("field-desc")} bloom-truncate`,text:l.url??"Local"})),l.url?z("copy","Copy URL",()=>void Vo(l.url??"")):z("edit","Edit",()=>{e=l,d()}),m,jt(l.enabled,f=>vn(l.id,{enabled:f}),`Enable ${l.name}`))}function d(){let{themes:l}=j.store;t.replaceChildren(n(),i(),l.length?a("div",{class:Q("themes")},...l.map(s)):a("div",{class:Q("empty"),text:"No themes yet."}))}return d(),t}var Ud=new x("SettingsPanel"),p=I("bloom-settings-"),Fd=10080*60*1e3,Kd=3e3,Bs="Toggle features. Some need a reload. Click the sliders icon to configure.",Gd="Paused: can't find its place on this page.",Yd=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],jd=[{id:"plugins",label:"Plugins"},{id:"themes",label:"Themes"},{id:"css",label:"Quick CSS"}],Qd=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],Wd={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},Os=new Set(["chat","ui","privacy"]),W=null,ho="plugins",de="all",Gr="all",An="",Yr=[],Rs=()=>[...Z.values()].filter(t=>!t.hidden),zd=t=>!!t.updatedAt&&Date.now()-t.updatedAt<Fd;function Vd(t){switch(de){case"favorites":return ln.has(t.name);case"recent":return zd(t);case"all":return!0;case"other":return!t.tags.some(e=>Os.has(e));case"chat":case"ui":case"privacy":return t.tags.includes(de)}}function Jd(t){switch(Gr){case"all":return!0;case"enabled":return Ct(t);case"disabled":return!Ct(t)}}function Zd(t){let e=An.trim().toLowerCase();return!e||[t.name,t.description,...t.tags].some(o=>o.toLowerCase().includes(e))}function $d(t){let e=sn.list(),o=n=>e.includes(n.name)?e.indexOf(n.name):e.length;return de==="recent"?t.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):t.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var Hs=t=>t.settings?.def??{},Wr=t=>Object.values(Hs(t)).some(e=>e.type!=="custom");function Xd(t,e,o){let n=it(t.name,e)??qr(o),r=i=>{if(t.name==="Settings"&&!xs(e,i))return!1;pt(t.name,e,i)};switch(o.type){case"boolean":return jt(n,r,o.description??e);case"slider":return bn(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return Nr(n,o.options,r);case"string":return go(n,r,o.placeholder);case"number":return go(String(n),i=>r(Number(i)),"","number");case"component":{let i=a("div",{class:p("component")});return Yr.push(o.render(i)),i}case"custom":return null}}var _d=t=>t.replaceAll(/([A-Z])/g," $1").replace(/^./,e=>e.toUpperCase());function zr(t){if(!W)return;let e=Object.entries(Hs(t)).filter(([,i])=>i.type!=="custom").map(([i,s])=>{let d=Xd(t,i,s),l=s.type==="boolean",u=s.type!=="component"&&a("div",{class:p("field-label"),text:_d(i)}),m=s.description&&a("div",{class:p("field-desc"),text:s.description});return a("div",{class:p("field",l?"field-inline":"field-stacked")},(u||m)&&a("div",{class:p("field-text")},u,m),d)}),o,n=F("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},Kd);return}clearTimeout(o),t.settings?.reset(),Ie(),zr(t)},"danger"),r=a("div",{class:p("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&Ie()}},a("div",{class:p("popup"),attrs:{role:"dialog","aria-label":`${t.name} settings`}},a("div",{class:p("popup-header")},a("div",{class:p("card-icon")},B(t.icon)),a("div",{class:p("popup-title")},a("div",{class:p("card-name"),text:t.name}),a("div",{class:p("popup-authors"),text:t.authors.join(", ")})),z("close","Close",Ie)),a("p",{class:p("popup-desc"),text:t.description}),a("div",{class:p("fields")},...e),a("div",{class:p("popup-footer")},n)));W.querySelector(`.${p("modal")}`)?.append(r)}function Ie(){for(let t of Yr)t();Yr=[],W?.querySelector(`.${p("popup-backdrop")}`)?.remove()}function Ps(t){let e=Ct(t),o=ln.has(t.name),n=sn.has(t.name),r=!!t.required,i=Qa(t.name);return a("div",{class:[p("card",e?"card-on":"card-off"),r?p("card-required"):""].filter(Boolean).join(" ")},a("div",{class:p("card-top")},a("div",{class:p("card-icon")},B(t.icon)),a("div",{class:p("card-actions")},z("star",o?"Unstar":"Star",()=>{ln.toggle(t.name),ue()},o),r?null:z("pin",n?"Unpin":"Pin to top",()=>{sn.toggle(t.name),ue()},n),r?a("span",{class:p("required-mark"),attrs:{"aria-label":"Required",[gt]:"This plugin is required for Bloom++ to work"}},B("alert")):null,Wr(t)&&z("gear","Settings",()=>zr(t)),jt(e,s=>Xa(t,s),r?`${t.name} is required`:`Enable ${t.name}`,r))),a("div",{class:p("card-name")},t.name,ja(t.name)&&a("span",{class:p("new-badge"),text:"New"})),a("div",{class:p("card-desc"),text:t.description,title:t.description}),i&&a("div",{class:p("card-issue"),attrs:{[gt]:`Missing: ${i.join(", ")}`}},B("alert"),a("span",{text:Gd})),a("div",{class:p("card-footer"),text:t.authors.join(", ")}))}function Ds(){let t=Rs().some(o=>!o.tags.some(n=>Os.has(n)));W?.querySelector(`.${p("tabs")}`)?.replaceChildren(...Yd.filter(o=>o.id!=="other"||t).map(o=>a("button",{class:p("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===de)},on:{click:()=>{de=o.id,Ds(),ue()}}})))}function ue(){if(!W)return;let t=Rs().filter(Vd),e=W.querySelector(`.${p("search")} input`);e&&(e.placeholder=`Search ${xa(t.length,"plugin")}...`);let o=$d(t.filter(u=>Zd(u)&&Jd(u))),n=de==="all",r=n?o.filter(u=>!u.required):o,i=n?o.filter(u=>u.required):[],s=[...r.map(Ps),...i.length?[a("div",{class:p("required-break"),attrs:{role:"separator"}}),...i.map(Ps)]:[]],d=An.trim()?"No plugins match your search.":Wd[de]??"No plugins available.";W.querySelector(`.${p("grid")}`)?.replaceChildren(...s.length?s:[a("div",{class:p("empty"),text:d})])}function tm(t){t.key==="Escape"&&(t.preventDefault(),t.stopPropagation(),W?.querySelector(`.${p("popup-backdrop")}`)?Ie():Qt())}var Ns,jr;function Qr(){let t=W?.querySelector(`.${p("body")}`);if(!W||!t)return;for(let o of W.querySelectorAll(`.${p("nav-item")}`))o.setAttribute("aria-selected",String(o.getAttribute("data-section")===ho));if(Ie(),ho==="themes"){t.replaceChildren(Is());return}if(ho==="css"){t.replaceChildren(ks());return}let e=a("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=An,e.addEventListener("input",()=>{An=e.value,ue()}),t.replaceChildren(a("div",{class:p("tabs"),attrs:{role:"tablist"}}),a("div",{class:p("toolbar")},a("label",{class:p("search")},B("search"),e),Nr(Gr,Qd,o=>{Gr=o,ue()})),a("div",{class:p("grid")})),Ds(),ue(),e.focus()}function Be(t,e){t&&(ho=t),W?(Qr(),Rr(W)):em();let o=e&&Z.get(e);o&&zr(o)}function em(){W=a("div",{class:`bloom-root ${p("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&Qt()}},a("div",{class:p("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},a("div",{class:p("header")},a("div",{class:p("logo")},B("bloom")),a("h2",{class:p("title"),text:"Bloom++"}),a("span",{class:p("hint"),attrs:{"aria-label":Bs,tabindex:"0",[gt]:Bs}},B("info")),a("div",{class:p("nav"),attrs:{role:"tablist"}},...jd.map(t=>a("button",{class:p("nav-item"),text:t.label,attrs:{type:"button",role:"tab","data-section":t.id},on:{click:()=>{ho=t.id,Qr()}}}))),a("span",{class:p("version"),text:"v2.0.110"}),z("close","Close",Qt)),a("div",{class:p("body")}))),W.addEventListener("keydown",t=>t.stopPropagation()),jr=new AbortController,document.addEventListener("keydown",tm,{capture:!0,signal:jr.signal}),xt(W),Qr(),Ns=es(ue),Ud.debug("Opened")}function Qt(){Ie(),jr?.abort(),Ns?.(),W?.remove(),W=null}var Pe=()=>W?Qt():Be(),Us=()=>!!W;var Fs=new x("AppLandmarks"),om={Settings:[c.rail],WiderChat:[":root"],StreamerMode:[c.sidebarScroll,c.rail],ComposerOpacity:[c.composer,c.composerInput],ResponseNotification:[c.composerInput],InputHistory:[c.composerInput],Continue:[c.composerInput],ChatListStatus:[c.sidebarScroll],StarChats:[c.turn],BetterNavigator:[c.timelineScroll,c.turn],BetterQuotes:[c.turn],MessageTimestamps:[c.turn],RecentTopics:[c.sidebarScroll]};function Ks(){let t=Me();for(let[e,o]of Object.entries(om)){let n=Z.get(e);if(!n||n.required||!Ct(n)){Tr(e,null);continue}let r=o.some(i=>Lt(i));if(Tr(e,r||t&&o.includes(c.turn)?null:o),!r){if(!Mr(n.name))continue;Za(n),Fs.warn(`${e} paused; missing ${o.join(", ")}`);continue}Mr(n.name)||($a(n),Fs.info(`${e} resumed`))}}function Gs(){return Ks(),C(()=>Ks())}var Dy=new x("Route"),nm=/\/c\/(?!local-)([\w-]+)/;var rm=()=>location.pathname.match(nm)?.[1]??null;var Ny=location.href,Uy=rm();var im=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,am=/\S+@\S+\.\S+/,sm=3;var lm=t=>!!t.closest(".sr-only");function cm(t){return[...t.querySelectorAll("*")].filter(e=>!e.children.length&&!e.closest("[data-bloom]")&&!!v(e.textContent??"")&&!(e instanceof SVGElement))}var um=t=>{if(/rounded-full/.test(t.getAttribute("class")??""))return!0;if(!t.clientWidth)return!1;let{borderRadius:e}=getComputedStyle(t);return e.includes("%")||Number.parseFloat(e)>=t.clientWidth/2};function wn(t,e,o){for(let n of t.querySelectorAll(`[${e}]`))n!==o&&n.removeAttribute(e);o&&!o.hasAttribute(e)&&o.setAttribute(e,"")}function dm(t,e){if(v(t.textContent??"").length>sm)return null;let o=t.closest("button");for(let n=t;n&&n!==e&&n!==o;n=n.parentElement)if(um(n))return n;return null}function xn(t,e){t.hasAttribute(`data-bloom-${e}`)||t.setAttribute(`data-bloom-${e}`,"");let o=t.querySelector("img:not([data-bloom] img)"),n=cm(t),r=o?null:n.map(m=>dm(m,t)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),s=(i&&i!==t&&t.contains(i)?i:o??r)??t.querySelector("[class*=rounded-full]:not([data-bloom] *)");wn(t,`data-bloom-${e}-avatar`,s);let d=n.filter(m=>!s?.contains(m)&&!lm(m)),l=d.find(m=>im.test(v(m.textContent??""))),u=d.find(m=>am.test(m.textContent??""));wn(t,`data-bloom-${e}-plan`,l),wn(t,`data-bloom-${e}-email`,u),wn(t,`data-bloom-${e}-name`,d.find(m=>m!==l&&m!==u))}var Ys=()=>Gt(c.rail).filter(rt);function js(t){return Lt(c.profile,t)??[...t.querySelectorAll(c.menuButton)].findLast(rt)??null}function mm(t,e){return[...t.children].find(n=>n instanceof HTMLElement&&n!==e&&n.contains(e))??e}function Qs(){return Ys().flatMap(t=>{let e=js(t);if(!e)return[{kind:"rail",anchor:t,insert:n=>t.append(n)}];let o=mm(t,e);return[{kind:"rail",anchor:o,insert:n=>(o===e?t:o).append(n)}]})}var Vr=()=>Ys().map(js).filter(t=>t!=null);function pm(t){let e=t.getAttribute("aria-expanded")==="true"&&t.getAttribute("aria-controls"),o=e?document.getElementById(e):null;return o?.matches('[role="menu"]')?o:null}function Sn(){return Vr().map(pm).find(t=>t!=null)??Gt('[role="menu"]').find(t=>!t.closest("[data-bloom]")&&/log ?out|sign out|退出/i.test(t.textContent??""))??null}var bo=t=>Gt(c.threadRow).filter(e=>e.getAttribute("data-app-action-sidebar-thread-id")===t);function yo(t){let e=bo(t)[0]??Gt(c.threadRow).find(n=>{let r=n.getAttribute("data-app-action-sidebar-thread-id")??"";return r.endsWith(t)||t.endsWith(r.replace(/^local:/,""))});return(e?.getAttribute("data-app-action-sidebar-thread-title")??v(e?.textContent??""))||null}function Ws(t){return null}var Jr=0,qn;function fm(t){if(!Y(t))return;for(let o of Vr())xn(o,"profile");let e=Sn();e&&xn(e,"menu")}function St(){Jr++;let t=!0;return Yt().then(()=>{t&&Jr&&!qn&&(qn=C(fm))}),()=>{t&&(t=!1,!--Jr&&(qn?.(),qn=void 0))}}var zs=`/*
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
`;var et=I("bloom-entry-"),hm=4,$r="--bloom-entry-x",Xr=1,Vs=4,Js=8,bm=150,lt=y({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar.",default:ke.showSidebarEntry},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:ke.showSidebarEntryOnHover},showAccountMenuEntry:{type:"boolean",description:"Show Bloom++ at the top of the account menu.",default:ke.showAccountMenuEntry},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:t=>(t.append(F("Reset position",()=>{lt.store.entryPosition=Xr})),()=>t.replaceChildren())},showBloomMenu:{type:"boolean",description:"Hovering the Bloom++ row in the account menu opens a menu with Plugins, Themes, Quick CSS and plugin settings.",default:!0},menuPlugins:{type:"component",description:"Plugins listed in that menu.",render:t=>(t.append(...Xs().map(e=>a("div",{class:et("menu-pick")},B(e.icon),a("span",{class:"bloom-truncate",text:e.name}),jt(_s(e),o=>{lt.store.menuPicks={...lt.store.menuPicks,[e.name]:o}},`List ${e.name} in the menu`)))),()=>t.replaceChildren())},entryPosition:{type:"custom",default:Xr},menuPicks:{type:"custom",default:{}}}),me=new Map,Wt=null,vo,Xs=()=>[...Z.values()].filter(t=>!t.hidden).toSorted((t,e)=>t.name.localeCompare(e.name)),_s=t=>lt.store.menuPicks[t.name]??Wr(t),Zs=!1,Zr=[];function ym(t,e,o){let n=t.currentTarget,r=e.clientWidth-n.offsetWidth;if(t.button!==0||r<=0||!e.classList.contains(et("hover")))return;let i=lt.store.entryPosition,s=i,d=!1,l=new AbortController;n.setPointerCapture(t.pointerId),n.addEventListener("pointermove",m=>{!d&&Math.abs(m.clientX-t.clientX)<hm||(d=!0,o(),s=nt(i+(m.clientX-t.clientX)/r,0,Xr),e.style.setProperty($r,String(s)))},{signal:l.signal});let u=()=>{l.abort(),d&&(lt.store.entryPosition=s,e.style.removeProperty($r))};n.addEventListener("pointerup",u,{signal:l.signal}),n.addEventListener("lostpointercapture",u,{signal:l.signal})}function vm(t){let e=!1,o=a("button",{class:et("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),e||Pe(),e=!1},pointerdown:r=>{e=!1,t!=="rail"&&ym(r,n,()=>{e=!0})}}},B("bloom"),t!=="rail"&&a("span",{class:et("label"),text:"Bloom++"})),n=a("div",{class:`bloom-root ${et("wrap")} ${et(t)}`,attrs:{"data-bloom":"entry"}},o);return n}function Ao(){clearTimeout(vo),Wt?.remove(),Wt=null}function tl(){clearTimeout(vo),vo=setTimeout(Ao,bm)}var el=t=>t.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0}));function Am(t,e){if(clearTimeout(vo),Wt?.isConnected||!lt.store.showBloomMenu)return;let o=(l,u,m)=>a("div",{class:et("flyout-item"),attrs:{role:"menuitem"},on:{pointerdown:f=>{f.button===0&&(f.preventDefault(),f.stopPropagation(),Ao(),el(e),m())}}},B(u),a("span",{class:"bloom-truncate",text:l})),n=Xs().filter(_s);Wt=a("div",{class:`bloom-root ${et("flyout")}`,attrs:{"data-bloom":"menu-flyout",role:"menu","aria-label":"Bloom++"},on:{pointerenter:()=>clearTimeout(vo),pointerleave:tl}},o("Plugins","bloom",()=>Be("plugins")),o("Themes","spark",()=>Be("themes")),o("Quick CSS","edit",()=>Be("css")),n.length>0&&a("div",{class:et("flyout-break"),attrs:{role:"separator"}}),...n.map(l=>o(l.name,l.icon,()=>Be("plugins",l.name)))),xt(Wt);let r=e.getBoundingClientRect(),{width:i,height:s}=Wt.getBoundingClientRect(),d=r.right+Vs;Wt.style.left=`${d+i>innerWidth?r.left-i-Vs:d}px`,Wt.style.top=`${nt(t.getBoundingClientRect().top,Js,innerHeight-s-Js)}px`}function wm(t){let e=a("div",{class:`bloom-root ${et("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),Ao(),el(t),Pe()},pointerenter:()=>Am(e,t),pointerleave:tl}},B("bloom"),a("span",{text:"Bloom++"}),lt.store.showBloomMenu&&a("span",{class:et("menu-chevron")},B("chevron"))),o=t.querySelector('[role="menuitem"]');o?.parentElement?o.before(e):t.prepend(e)}function $s(){Ao();for(let t of document.querySelectorAll('[data-bloom="entry"], [data-bloom="menu-entry"]'))t.remove();me.clear()}function xm(){for(let t of document.querySelectorAll('[data-bloom="menu-entry"]'))t.remove()}function ol(){let{showSidebarEntry:t,showSidebarEntryOnHover:e,showAccountMenuEntry:o}=lt.store,n=t||e?Qs():[],r=new Set(n.map(s=>s.anchor));for(let[s,d]of me)s.isConnected&&r.has(s)||(d.remove(),me.delete(s));for(let s of document.querySelectorAll('[data-bloom="entry"]'))[...me.values()].includes(s)||s.remove();for(let s of n){let d=me.get(s.anchor);if(d?.isConnected||!wt(s.anchor))continue;let l=d??vm(s.kind);me.set(s.anchor,l),s.insert(l)}for(let s of me.values())s.classList.toggle(et("hover"),!t);if(!o){xm();return}let i=Sn();i&&!i.querySelector('[data-bloom="menu-entry"]')&&wm(i),i||Ao()}function Sm(t){yn.some(Fr)||(lt.store[Ur(t??"")?t:"showSidebarEntry"]=!0),ol()}var nl=h({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:lt,styles:()=>`${zs}[data-app-navigation-rail] [data-bloom=entry]{position:absolute;inset:auto;left:50%;bottom:100%;transform:translateX(-50%);width:max-content;margin:0;padding-block:0.25rem;pointer-events:none;z-index:5;display:flex;justify-content:center}[data-app-navigation-rail]>[data-bloom=entry]{bottom:2.75rem}[data-app-navigation-rail] [data-bloom=entry] .bloom-entry-button{pointer-events:auto}[data-app-navigation-rail] [data-bloom=entry].bloom-entry-hover:not(:hover > *){display:none;transition:display 0s 0.2s allow-discrete}.${et("hover")}{${$r}:${lt.store.entryPosition}}`,start(){Ss(),$s(),Zr=[C(ol),As(),St()],!Zs&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",Pe),Zs=!0)},stop(){for(let t of Zr)t();Zr=[],$s(),Qt()},onSettingsChange:Sm});var ii=new x("AppNetwork"),qt=Te(),En=new Map,rl=new Map,Oe=new Map,il=new Map,ei=new Map,pe=new Map,al=new Map,dl=new Set,wo=new Set,qm=800,ai=6e3,Em=200,sl;var Tm=t=>t==="user"||t==="assistant";function xo(t){let e=t.replace(/^local:/,"");return[...new Set([t,e,`local:${e}`])]}function ml(t){let e=xo(t);for(let n of e){let r=En.get(n);if(r)return r}let o={id:e[0]??t,title:null,chain:[],times:new Map};for(let n of e)En.set(n,o);return o}function Tn(t){return xo(t)[0]??t}function Mn(t){if(!t)return!1;let e=Tn(t);if(!dl.has(e))return!1;let o=pe.get(e);if(o==null||Date.now()-o<ai)return!1;if(wo.has(e))return!0;let n=Oe.get(e);return n==null||Date.now()-n<qm?!1:(wo.add(e),!0)}function Mm(){sl||(sl=on(()=>{let t=b();if(!t)return;let e=Tn(t);wo.has(e)&&Date.now()-(pe.get(e)??0)>=ai||fl(t)},Em))}function Cm(t){let e=al.get(t);return e||(e=new Set,al.set(t,e)),e}function Lm(t,e){let o=Tn(t.id);dl.add(o),pe.has(o)||pe.set(o,Date.now());let{length:n}=t.chain;n>(il.get(o)??0)&&(il.set(o,n),Oe.set(o,Date.now()),wo.delete(o)),e>(ei.get(o)??0)&&(ei.set(o,e),wo.has(o)||Oe.set(o,Date.now())),Oe.has(o)||Oe.set(o,Date.now())}function It(t){if(!t)return null;Mm(),fl(t);let e=xo(t);return e.map(o=>En.get(o)).find(o=>o&&(o.chain.length||o.title))??En.get(e[0]??t)??null}function oi(t,e,o,n=null){return{id:t,role:e,createTime:n,text:v(o),hasFiles:!1,imageCount:0}}function ni(t,e){let o=t.chain.find(r=>r.id===e.id);if(o){e.text&&(o.text=e.text),e.createTime!=null&&(o.createTime=e.createTime);return}if(t.chain.find(r=>r.role===e.role&&r.text&&r.text===e.text)){!t.times.has(e.id)&&e.createTime!=null&&t.times.set(e.id,e.createTime);return}t.chain.push(e)}function pl(t){let e=t.chain.map(o=>`${o.id}	${o.role}	${o.text}`).join(`
`);rl.get(t.id)!==e&&(rl.set(t.id,e),qt.emit("conversation",t))}function ll(t){if(typeof t=="function")try{return v(String(t()??""))}catch(e){return ii.warn("Turn label failed",e),""}return typeof t=="string"?v(t):""}function cl(t){if(typeof t!="function")return"";try{let e=t();return typeof e=="string"?v(e):k(e)&&typeof e.response=="string"?v(e.response):""}catch(e){return ii.warn("Turn preview failed",e),""}}function km(t){let e=Object.keys(t).find(o=>o.startsWith("__reactFiber$")||o.startsWith("__reactInternalInstance$"));return e?t[e]??null:null}function ri(t,e,o,n){if(!t||e>24)return;let r=(k(t.memoizedProps)?t.memoizedProps:null)??(k(t.pendingProps)?t.pendingProps:null);if(r){if(Array.isArray(r.items)&&k(r.items[0])&&typeof r.items[0].turnKey=="string"){let i=r.items.filter(k);i.length>o.length&&(o.length=0,o.push(...i))}if(Array.isArray(r.entries)&&k(r.entries[0])&&typeof(r.entries[0].historyEntityKey??r.entries[0].turnId)=="string"){let i=r.entries.filter(k);i.length>n.length&&(n.length=0,n.push(...i))}}ri(t.child??null,e+1,o,n),ri(t.sibling??null,e,o,n)}function Im(t,e){let o=typeof e.turnId=="string"?e.turnId:"",n=typeof e.turnKey=="string"?e.turnKey:"";return t.find(r=>{let i=typeof r.turnKey=="string"?r.turnKey:"";return!!i&&(o===i||n.endsWith(i)||n.includes(i))})??null}function ul(t,e){return xo(t).some(o=>xo(e).includes(o))}function si(t){let e=t.replace(/^history-content:/,"").replace(/^turn:/,"").replace(/:assistant$/,"");return e?[...new Set([t,e,`turn:${e}`,`${e}:assistant`,`local:${e}`])]:[]}function Bm(t){let e=new Set;for(let o of t.querySelectorAll("[data-turn-key], [data-response-annotation-target], [data-chatgpt-search-message-ids]"))for(let n of[o.getAttribute("data-turn-key"),o.getAttribute("data-response-annotation-target"),...(o.getAttribute("data-chatgpt-search-message-ids")??"").split(/\s+/)])if(n)for(let r of si(n))e.add(r);return e}function Pm(t){let e=new Set;for(let o of t.chain)for(let n of si(o.id))e.add(n);return e}function Om(t){return t.getAttribute("data-response-annotation-conversation")??t.querySelector("[data-response-annotation-conversation]")?.getAttribute("data-response-annotation-conversation")??null}function Rm(){return[...document.querySelectorAll(`${c.conversationTarget}, ${c.timelineScroll}`)].filter(rt)}var _r=(t,e)=>e.length>t.length?e:t;function fl(t){let e=Rm();if(!e.length)return;let o,n=[],r=[];for(let E of e){let L=Om(E);if(L&&!ul(t,L))continue;let O=[],$=[];try{ri(km(E),0,O,$)}catch(Se){ii.warn("Fiber walk failed",Se);continue}let U=_r(O,$),dt=typeof U[0]?.conversationId=="string"?U[0].conversationId:"";if(dt&&!ul(t,dt))continue;let hr=_r(n,r);U.length>hr.length&&(o=E,n=O,r=$)}if(!o)return;let i=_r(n,r);if(!i.length)return;let s=typeof i[0]?.conversationId=="string"?i[0].conversationId:"",d=ml(t);d.title=yo(t)??yo(s||t)??d.title;let l=Tn(t);pe.has(l)||pe.set(l,Date.now());let u=i.filter(E=>ll(E.getLabel)||cl(E.getPreview)).length,m=Mn(t);!m&&u>(ei.get(l)??0)&&Oe.delete(l);let f=Bm(o),T=Pm(d),g=Cm(l),q=Date.now()-(pe.get(l)??0)<ai;for(let E of i){let L="";typeof E.turnId=="string"?L=E.turnId:typeof E.turnKey=="string"&&(L=E.turnKey.replace(/^.*turn:/,""));let O=typeof E.historyEntityKey=="string"?E.historyEntityKey:L?`turn:${L}`:"",$=Im(n,E),U=ll($?.getLabel??E.getLabel),dt=cl($?.getPreview??E.getPreview);L&&!U&&!dt&&g.add(L);let hr=[O,L].some(Uu=>si(Uu).some(wa=>T.has(wa)||f.has(wa)));if(m&&!hr&&!(q&&L&&g.has(L)))continue;let Se=typeof E.timestampSeparatorAtMs=="number"?E.timestampSeparatorAtMs:null;O&&U&&(ni(d,oi(O,"user",U,Se)),Se&&d.times.set(O,Se)),L&&dt&&ni(d,oi(`${L}:assistant`,"assistant",dt,Se)),L&&(U||dt)&&g.delete(L)}Lm(d,u),pl(d)}function Hm(t){if(Tm(t.role))return t.role;let e=typeof t.type=="string"?t.type:typeof t.itemType=="string"?t.itemType:"";return/user/i.test(e)?"user":/agent|assistant/i.test(e)?"assistant":null}function Dm(t){return typeof t.text=="string"?t.text:typeof t.content=="string"?t.content:k(t.content)&&typeof t.content.text=="string"?t.content.text:""}function ti(t,e){if(!t||!k(e))return;let o=typeof e.id=="string"?e.id:typeof e.itemId=="string"?e.itemId:"",n=Hm(e),r=Dm(e);if(!o||!n)return;let i=ml(t);ni(i,oi(o,n,r)),pl(i)}function Nm(t){let e=t.params?.thread,o=t.params?.threadId??(k(e)&&typeof e.id=="string"?e.id:void 0);t.params?.item&&ti(o,t.params.item);for(let n of t.params?.items??[])ti(o,n);if(k(e)&&Array.isArray(e.items))for(let n of e.items)ti(o,n)}mo.on("note",Nm);var Um=["data-turn","data-message-author-role"],Fm=/:(user|assistant)$/,li=`${c.messageUnit}, ${c.oldMessage}`,Ln=t=>t==="user"||t==="assistant",yl=()=>!!document.querySelector(c.timelineScroll),vl=()=>!!vt(c.timelineScroll),ci=()=>b()??"",kn=()=>yl()?vt(c.timelineScroll):document;function qo(){if(yl())return vt(c.timelineScroll);let t=document.querySelector(c.turn);for(let e=t?.parentElement;e;e=e.parentElement){let{overflowY:o}=getComputedStyle(e);if((o==="auto"||o==="scroll")&&e.scrollHeight>e.clientHeight)return e}return document.scrollingElement}var zt=t=>{let e=t.getAttribute("data-chatgpt-search-unit-key")?.match(Fm)?.[1];return Ln(e)?e:t.matches(c.userBubble)?"user":t.matches(c.assistantReply)||t.matches(c.assistantMarkdown)?"assistant":null},Al=t=>{let e=[...t.querySelectorAll(c.searchUnit)].filter(n=>zt(n)&&!n.parentElement?.closest(c.searchUnit));return e.length?e:[...t.querySelectorAll(`${c.userBubble}, ${c.assistantReply}`)].filter(n=>zt(n)&&!n.parentElement?.closest(`${c.userBubble}, ${c.assistantReply}`))},gl=t=>(t.getAttribute("data-chatgpt-search-message-ids")??t.getAttribute("data-message-id")??t.getAttribute("data-response-annotation-target"))?.split(/\s+/).filter(Boolean)??[];function So(t){let e=gl(t);if(e.length)return e;let o=[...new Set([...t.querySelectorAll(li)].flatMap(gl))];if(o.length)return o;let n=t.closest("[data-turn-key]")?.getAttribute("data-turn-key")?.replace(/^history-content:/,"");return n&&zt(t)==="user"?[n]:[]}function Re(t=kn()){if(!t)return[];let e=Al(t);return e.length?e:[...t.querySelectorAll(li)].filter(o=>!o.parentElement?.closest(li))}function Km(t,e){for(let o=t.length-1;o>=0;o--){let n=e.find(r=>r.id===t[o]);if(n)return n.role}return null}function Gm(t){for(let e of Um){let o=t.getAttribute(e)??t.querySelector(`[${e}]`)?.getAttribute(e);if(Ln(o))return o}return t.querySelector(c.markdown)||t.querySelector(c.generatedImage)?"assistant":null}var Ym=t=>!t.parentElement?.closest(c.turn);function Vt(){let t=It(b())?.chain??[];return[...kn()?.querySelectorAll(c.turn)??[]].filter(Ym).flatMap(o=>{let n=Al(o),r=n.length?n.map(i=>({el:i,known:zt(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=u=>!n.some(m=>m.contains(u))&&v(u.textContent??""),s=[...o.querySelectorAll(c.assistantMarkdown)].find(u=>i(u)&&!Cn.test(v(u.textContent??""))),d=[...o.querySelectorAll(c.activityHeader)].findLast(i),l=s??d;l&&r.push({el:l,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?So(o):Re(o).flatMap(So),s=n??Gm(o)??Km(i,t)??(r%2?"assistant":"user"),d=o.closest(c.turn)??o,l=!o.closest(c.searchUnit)&&!!d.querySelector(c.turnBusy),u=s==="assistant"&&(o.matches(c.turnBusy)||!!o.querySelector(c.turnBusy)||l);return{el:o,role:s,messageIds:i,streaming:u}})}var jm="[data-bloom], .sr-only",wl=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,Cn=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,hl=new WeakMap;function He(t){let o=(t.el.closest(c.turn)??t.el).textContent?.length??0,n=hl.get(t.el);if(n?.length===o)return n.summary;let r=Qm(t);return hl.set(t.el,{length:o,summary:r}),r}function bl(t){let e=new Set,o=[];for(let n of t.querySelectorAll(c.assistantMarkdown)){if(n.closest(c.searchUnit))continue;let r=v(n.textContent??"");!r||Cn.test(r)||wl.test(r)||e.has(r)||(e.add(r),o.push(r))}return o}function Qm(t){let e=t.el.querySelectorAll(c.generatedImage).length;if(t.role==="assistant"&&e)return e>1?`Image \xD7${e}`:"Image";let o=t.el.closest(c.turn);if(t.role==="assistant"&&o&&t.el.matches(c.assistantMarkdown)&&!t.el.closest(c.searchUnit)){let l=bl(o);if(l.length)return l.join(" \xB7 ")}let n=t.el.querySelector(t.role==="assistant"?`${c.markdown}, ${c.assistantMarkdown}`:".whitespace-pre-wrap")??t.el,i=[...n.querySelectorAll(jm)].map(l=>v(l.textContent??"")).filter(Boolean).reduce((l,u)=>l.replace(u,`
`),n.innerText||n.textContent||""),s=i.split(`
`).map(v).filter(l=>l&&!wl.test(l)&&!Cn.test(l));if(s.length)return s.join(" ");if(t.role==="assistant"&&o){let l=bl(o);if(l.length)return l.join(" \xB7 ")}let d=i.split(`
`).map(v).filter(l=>Cn.test(l));return d.length?d.at(-1)??"":t.role==="user"&&t.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function In(t){return t.text?v(t.text):t.imageCount?t.imageCount>1?`Image \xD7${t.imageCount}`:"Image":t.hasFiles?"File":""}var ui=t=>t.matches(c.timelineScroll)&&getComputedStyle(t).flexDirection==="column-reverse";var Wm=80,zm=420;function di(t,e,o){return(t.x-o.x)*(e.y-o.y)-(e.x-o.x)*(t.y-o.y)}function Vm(t,e,o,n){let r=di(t,e,o),i=di(t,o,n),s=di(t,n,e);return!((r<0||i<0||s<0)&&(r>0||i>0||s>0))}function Jm(t,e){let o=(e.left+e.right)/2-(t.left+t.right)/2,n=(e.top+e.bottom)/2-(t.top+t.bottom)/2;if(Math.abs(o)>=Math.abs(n)){let i=o<0?e.right:e.left;return[{x:i,y:e.top},{x:i,y:e.bottom}]}let r=n<0?e.bottom:e.top;return[{x:e.left,y:r},{x:e.right,y:r}]}function xl(t,e){let o=nt(t.x,e.left,e.right),n=nt(t.y,e.top,e.bottom);return Math.hypot(t.x-o,t.y-n)}function Bn(t){let e=t.closeDelay??Wm,o=t.towardDelay??zm,n=0,r=!1,i=null,s=null,d=()=>{document.removeEventListener("pointermove",g,!0)},l=()=>{n&&window.clearTimeout(n),n=0,d(),i=null,s=null},u=()=>{l(),r&&(r=!1,t.setHeld(!1))},m=()=>{r||(r=!0,t.setHeld(!0))},f=q=>{n&&window.clearTimeout(n),n=window.setTimeout(u,q)},T=q=>{let E=t.panel(),L=t.trigger();if(!E||!i)return!1;let O=E.getBoundingClientRect();if(O.width<=0&&O.height<=0)return!1;let $=L?.getBoundingClientRect(),[U,dt]=$&&($.width||$.height)?Jm($,O):[{x:O.left,y:O.top},{x:O.right,y:O.bottom}];return Vm(q,i,U,dt)?!0:s!=null&&xl(q,O)<xl(s,O)-.25},g=q=>{let E={x:q.clientX,y:q.clientY};if(t.over(q.target)){l();return}T(E)?f(o):u(),s=E};return{enter(){l()},leave(q){if(t.over(q.relatedTarget)){l();return}i={x:q.clientX,y:q.clientY},s=i,m(),document.addEventListener("pointermove",g,!0),f(e)},dispose(){l(),r=!1}}}var Sl=`/*
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
`;var M=I("bloom-nav-"),Rn=80,$m=1200,Xm=2,ql=3e4,_m=200,tp=.9,ep=.28,op=24,De=8,np=80,rp=12,mi=80,kl=`${c.rightPanel}, ${c.summaryPanel}`,ip={user:"\u2753",assistant:"\u{1F916}"},ap=["wheel","touchmove","pointerdown"],Un=y({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),A=null,N=[],ct=-1,fe=-1,Ne=null,ge="",fi=0,gi=[],Co=null,Pn=null,On=new Set,Bt,Eo,Pt,To="",ht=[],Lo=null,Hn=new Set,Dn=new Map,Jt=!1,sp=t=>Un.store.showAssistant||t.role==="user",lp=t=>t.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||t.messageIds[0]||t.role;function cp(t){return{role:t.role,summary:He(t),ids:t.messageIds,turn:t,streaming:t.streaming}}function Il(t,e){let o=t.entries.at(-1);if(o?.role==="assistant"&&e.role==="assistant"){t.entries[t.entries.length-1]={...e,ids:[...new Set([...o.ids,...e.ids])]};return}t.entries.push(e)}function up(){let t=[];for(let e of Vt()){let o=cp(e),n=lp(e),r=t.at(-1),i=!e.el.closest("[data-turn-key]");r&&(r.key===n||i&&o.role==="assistant")?Il(r,o):t.push({key:n,entries:[o]})}return t}function dp(){let t=[];for(let e of It(ci()||b())?.chain??[]){let o={role:e.role,summary:In(e),ids:[e.id],turn:null,streaming:!1},n=t.at(-1);e.role==="assistant"&&n?Il(n,o):t.push({key:e.id,entries:[o]})}return t}var Ue=t=>t.entries.flatMap(e=>e.ids);function Nn(t,e){let o=new Set(Ue(t));return Ue(e).some(n=>o.has(n))}var he=t=>v(t.entries.find(e=>e.role==="user")?.summary??""),pi=(t,e)=>t.filter(o=>he(o)===e).length,hi=t=>({...t,turn:null,streaming:!1});function mp(t,e){let o=new Set(e.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return t.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return hi(r);let s=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return s&&s!==n.key?hi(r):r})}))}function pp(t,e){let o=e.entries.map((n,r)=>{let i=t.entries[r];if(!i)return n;let s=[...new Set([...n.ids,...i.ids])];return{...n,ids:s,summary:n.summary||i.summary}});for(let n of t.entries.slice(o.length))o.push(hi(n));return{key:t.key,entries:o}}function Bl(){let t=qo();if(!t)return!1;let e=t.clientHeight-t.scrollHeight;return t.scrollTop-e<=Math.abs(t.scrollTop)}function fp(t,e){let o=mp(t,e).filter(l=>e.some(u=>u.key===l.key)||!e.some(u=>Nn(u,l)));if(!e.length)return o;if(!o.length)return e;let n=e.findIndex(l=>o.some(u=>u.key===l.key));if(n<0)return Bl()?e.concat(o):o.concat(e);let r=e[n]?.key,i=o.findIndex(l=>l.key===r),s=o.slice(0,i).concat(e.slice(0,n),o.slice(i)),d=s.findIndex(l=>l.key===r);for(let l=n;l<e.length;l++){let u=e[l];if(!u)continue;let m=s.findIndex(f=>f.key===u.key);if(m>=0){let f=s[m];f&&(s[m]=pp(f,u)),d=m}else s.splice(d+1,0,u),d++}return s}function gp(t,e){let o=0,n=0,r=0;for(let i=1-t.length;i<e.length;i++){let s=0,d=0;for(let u=0;u<t.length;u++){let m=e[u+i],f=t[u];!m||!f||(Nn(f,m)?(s+=3,d++):he(f)&&he(f)===he(m)&&s++)}let l=Bl()?i<r:i>r;(s>o||s===o&&d>n||s===o&&d===n&&l)&&(o=s,n=d,r=i)}return{score:o,offset:r}}function hp(t,e){let o=t.entries.map((n,r)=>{let i=e.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of e.entries.slice(o.length))o.push({...n,turn:null});return{key:t.key,entries:o}}function vi(t){return t.map(e=>({key:e.key,entries:e.entries.map(o=>({...o}))}))}function bp(t,e,o=!0){if(!e.length)return t;if(!t.length)return e;let{score:n,offset:r}=gp(t,e),i=vi(t);if(n>0)for(let l=0;l<i.length;l++){let u=e[l+r],m=i[l];if(!u||!m)continue;let f=he(m),T=!!f&&f===he(u)&&pi(t,f)===1&&pi(e,f)===1;(Nn(m,u)||T)&&(i[l]=hp(m,u))}let s=[],d=[];for(let l=0;l<e.length;l++){let u=e[l];if(!u)continue;let m=he(u);!m||pi(i,m)>0||i.some(f=>Nn(f,u))||o&&(n>0&&l<r?s.push(u):d.push(u))}return s.concat(i,d)}var bi=t=>t.entries.some(e=>e.turn?.el.isConnected);function yp(t,e,o){let n=t.findIndex(i=>Ue(i).includes(e));if(n>=0)return n+1;let r=t.find(bi);return o&&r&&Ue(r).includes(o)?0:t.length}function vp(t){if(Lo){let{parent:e,user:o}=Lo;for(let n of t.slice(yp(t,e,o))){let r=Ue(n);if(!bi(n)&&!(o&&r.includes(o)))for(let i of r)Hn.add(i)}}return t.filter(e=>bi(e)||!Ue(e).some(o=>Hn.has(o)))}function Pl(){ht=[],Lo=null,Hn.clear()}function El(t){return t.reduce((e,o)=>e+o.entries.length,0)}function Tl(t,e){if(!t||!e.length)return;let o=Dn.get(t);(!o||El(e)>=El(o))&&Dn.set(t,vi(e))}function Ap(){let t=ci();if(t!==To){To&&ht.length&&Tl(To,ht),To=t;let n=t?Dn.get(t):void 0;n?.length?(ht=vi(n),Lo=null,Hn.clear(),Jt=!0):(Pl(),Jt=!1)}let e=up(),o=dp();return!e.length&&!o.length&&!vl()?(ht=[],[]):(Jt&&t&&!Mn(t)&&(Jt=!1),ht=vp(bp(fp(ht,e),o,!Jt)),t&&ht.length&&Tl(t,ht),!Jt&&t&&ht.length&&Mn(t)&&(Jt=!0),ht.flatMap(n=>n.entries).filter(sp).filter(n=>n.ids.length||n.summary||n.streaming))}function wp(t){for(let o of t)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!tt().generating||t.some(o=>o.streaming))return;let e=t.at(-1);e&&(e.role==="assistant"||!Un.store.showAssistant?e.streaming=!0:t.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function Ol(){let t=Ap();return wp(t),t}function Rl(t){let e=t.getBoundingClientRect(),o=st()?.getBoundingClientRect().top,n=Math.min(e.bottom,o&&o>e.top?o:e.bottom);return{top:e.top,bottom:n}}function Hl(t){return((t.matches(".whitespace-pre-wrap, .markdown, .prose, [data-markdown-text-style]")?t:t.querySelector(".whitespace-pre-wrap")??t.querySelector(".markdown, .prose, [data-markdown-text-style]"))??t).getBoundingClientRect().top}function Ml(t){let e=N[t]?.turn?.el;return e?.isConnected?e:null}function xp(t){if(!N.length)return null;let e=t.scrollHeight-t.clientHeight,o=ui(t),n=Math.min(t.scrollTop,0),r=o?-n:e-t.scrollTop,i=o?e+n:t.scrollTop,s=e<=De||r<=De,d=e>De&&i<=De,{top:l,bottom:u}=Rl(t),m=Ml(0),f=m?Hl(m):Number.NaN,T=!!m&&f>=l-De&&f<=l+48,g=Ml(N.length-1),q=g?.getBoundingClientRect().bottom??Number.NaN,E=!!g&&q<=u+De&&q>=u-np;return s||E?"bottom":d||T?"top":null}function Sp(t){let{top:e,bottom:o}=Rl(t),n=e+Math.max(o-e,0)*ep,r=[],i=-1;if(N.forEach((d,l)=>{let u=d.turn?.el;if(!u?.isConnected){r.push(Number.NaN);return}let m=Hl(u);r.push(m),i<0&&(i=l),m<=n&&(i=l)}),i<0)return Math.max(N.findIndex(d=>d.turn),0);let s=r[ct];return Number.isFinite(s)?i===ct?ct:i>ct?i:s<=n+op?ct:i:i}function qp(t){let e=xp(t);return e==="bottom"?N.length-1:e==="top"?0:Sp(t)}function Cl(t){Un.store.jumpEffect==="border"&&(t.classList.add(M("flash")),setTimeout(()=>t.classList.remove(M("flash")),$m))}function Fn(t){let e=N[t],o=qo();if(!e||!o)return;if(!e.turn&&!e.ids.length){fe=t,Mo(),o.scrollTo({top:ui(o)?0:o.scrollHeight});return}fe=t,Ne=t?null:{chat:b(),first:e.ids[0],until:Date.now()+ql},Mo();let n=e.turn?.el;if(n?.isConnected){let u=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:u<o.clientHeight*Xm?"smooth":"auto"}),Cl(n);return}let r=N.findIndex(u=>u.turn),i=r>=0&&t<r?-1:1,s=++fi,d=Date.now()+ql,l=()=>{let u=qo();if(s!==fi||Date.now()>d||!u)return;N=Ol();let m=N.find(T=>T.ids.some(g=>e.ids.includes(g)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),Cl(m),fe=N.findIndex(T=>T.turn?.el===m),Mo();return}let f=u.scrollTop;u.scrollBy({top:i*u.clientHeight*tp,behavior:"instant"}),u.scrollTop===f?setTimeout(l,_m):requestAnimationFrame(l)};l()}function Ep(t,e){return a("button",{class:M("row"),attrs:{type:"button","data-index":String(e),"data-message-id":t.ids[0]??""},on:{click:()=>Fn(e)}},a("span",{text:ip[t.role]}),a("span",{class:"bloom-truncate",text:yt(t.summary||"\u2026",Rn)}))}function Tp(t,e){let o=t.offsetWidth?e.width/t.offsetWidth:1;return e.left+(t.clientLeft+t.clientWidth)*o}function Mp(t){let e=1/0;for(let o of document.querySelectorAll(kl)){if(!rt(o))continue;let n=o.getBoundingClientRect();n.width<mi||n.height<mi||n.left<t.left+mi||n.left<e&&(e=n.left)}return Number.isFinite(e)?e:null}function Ll(t){if(!A)return;let e=t.getBoundingClientRect(),o=st()?.getBoundingClientRect().top,r=Math.min(e.bottom,o&&o>e.top?o:e.bottom)-e.top,i=Math.min(Tp(t,e),Mp(e)??1/0);A.style.right=`${document.documentElement.clientWidth-i+rp}px`,A.style.top=`${e.top}px`,A.style.height=r>1?`${r}px`:""}function Cp(){let t=qo();if(N=Ol(),!N.length||!t){Pt?.dispose(),Pt=void 0,A?.remove(),A=null,ge="";return}if(Co!==t){Eo?.abort(),Eo=new AbortController,t.addEventListener("scroll",Ut(Mo),{passive:!0,signal:Eo.signal});for(let n of ap)t.addEventListener(n,Nl,{passive:!0,signal:Eo.signal});Co=t,Bt?.disconnect(),Bt=new ResizeObserver(()=>{t.isConnected&&Ll(t)}),Bt.observe(t),Pn=null,On=new Set}let e=st();if(e&&e!==Pn&&Bt&&(Bt.observe(e),Pn=e),Bt)for(let n of document.querySelectorAll(kl))On.has(n)||(Bt.observe(n),On.add(n));Bp(),Ll(t);let o=JSON.stringify(N.map(n=>[n.role,n.ids]));o!==ge?(ge=o,fe=-1,kp(),Ne&&Date.now()<Ne.until&&Ne.chat===b()&&N[0]?.ids[0]!==Ne.first&&Fn(0)):Lp(),Mo()}function Mo(){if(!A||!Co)return;ct=fe>=0?fe:qp(Co),A.querySelectorAll(`.${M("tick")}`).forEach((e,o)=>e.classList.toggle(M("tick-current"),o===ct)),A.querySelectorAll(`.${M("row")}`).forEach(e=>e.setAttribute("aria-current",String(Number(e.dataset.index)===ct)));let t=A.querySelector(`.${M("toc-head")}`);t&&(t.textContent=`${ct+1} / ${N.length}`)}function Lp(){A?.querySelectorAll(`.${M("tick")}`).forEach((t,e)=>{let o=N[e],n=yt(o.summary,Rn);t.title!==n&&(t.title=n),t.classList.toggle(M("tick-streaming"),o.streaming)}),A?.querySelectorAll(`.${M("row")}`).forEach(t=>{let e=t.lastElementChild,o=yt(N[Number(t.dataset.index)].summary||"\u2026",Rn);e&&e.textContent!==o&&(e.textContent=o)})}function kp(){A?.querySelector(`.${M("rail")}`)?.replaceChildren(...N.map((e,o)=>a("button",{class:Xo(M("tick"),M(`tick-${e.role}`),e.streaming&&M("tick-streaming"),o===ct&&M("tick-current")),title:yt(e.summary,Rn),attrs:{type:"button","aria-label":`Jump to message ${o+1}`,"data-message-id":e.ids[0]??""},on:{click:()=>Fn(o)}}))),A?.querySelector(`.${M("toc-list")}`)?.replaceChildren(...N.map(Ep))}var Et=Ut(Cp);function yi(t){if(t===A)return;let e=t.__bloomNavStop;if(e&&e!==Ai)try{e()}catch{}t.isConnected&&t!==A&&t.remove()}function Dl(){let t=[...document.querySelectorAll('[data-bloom="navigator"]')];if(A&&!A.isConnected&&(A=null),A&&t.includes(A)){for(let e of t)yi(e);return}A=t[0]??null;for(let e of t.slice(1))yi(e)}function Ip(){Pt?.dispose(),Pt=Bn({over:t=>t instanceof Node&&!!A?.contains(t),trigger:()=>A?.querySelector(`.${M("rail")}`),panel:()=>A?.querySelector(`.${M("toc")}`),setHeld:t=>A?.classList.toggle(M("open"),t)})}function Bp(){Dl(),A&&!A.querySelector(`.${M("rail")}`)&&(A.remove(),A=null,ge=""),A||(A=a("div",{class:`bloom-root ${M("root")}`,attrs:{"data-bloom":"navigator"},on:{pointerenter:()=>Pt?.enter(),pointerleave:t=>Pt?.leave(t)}},a("div",{class:M("rail")}),a("div",{class:M("bridge"),attrs:{"aria-hidden":"true"}}),a("div",{class:M("toc")},a("div",{class:M("toc-head")}),a("div",{class:M("toc-list")}))),ge=""),Pt||Ip(),A.isConnected||document.body.append(A),A.querySelector(`.${M("tick")}`)||(ge=""),A.__bloomNavStop=Ai}function Nl(){fe=-1,Ne=null,fi++}function Ai(){for(let t of gi)t();gi=[],Eo?.abort(),Bt?.disconnect(),Bt=void 0,Co=null,Pn=null,On=new Set,removeEventListener("keydown",Ul,!0),removeEventListener("resize",Et),Pt?.dispose(),Pt=void 0,A&&delete A.__bloomNavStop,A?.remove(),A=null,ge="",Pl(),Dn.clear(),To="",Jt=!1;for(let t of document.querySelectorAll('[data-bloom="navigator"]'))yi(t)}var Pp=t=>!!t&&(t.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!t.closest("[contenteditable='true']"));function Ul(t){if(!A||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey||Pp(document.activeElement)||vt("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:ct-1,ArrowDown:ct+1,Home:0,End:N.length-1}[t.key];if(o==null){Nl();return}o<0||o>=N.length||(t.preventDefault(),t.stopPropagation(),Fn(o))}var Fl=h({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:Un,styles:Sl,start(){Dl(),gi=[C(t=>Y(t)&&Et()),At(Et),qt.on("conversation",Et),qt.on("generate-start",({parentId:t,userId:e})=>{t&&(Lo={parent:t,user:e},Et())}),D.on("rise",Et),D.on("fall",Et)],addEventListener("keydown",Ul,!0),addEventListener("resize",Et,{passive:!0}),Et()},stop:Ai,onSettingsChange:Et});var Kl=`/*
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
`;var _=I("bloom-quotes-"),Li="BloomBetterQuotes",Rp=40,Ql=8,Hp=1800,qi=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,Gl=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,be=y({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),wi,xi,Fe,Si=!1,Ei=0,Kn=null,Gn=null,Ot=null;function ki(){return b()??"draft"}function jn(){try{let t=JSON.parse(sessionStorage.getItem(Li)??"[]");return Array.isArray(t)?t.filter(e=>!!e&&typeof e=="object"&&typeof e.id=="string"&&typeof e.text=="string"&&!!e.text):[]}catch{return[]}}function Ii(t){try{sessionStorage.setItem(Li,JSON.stringify(t.slice(-Rp)))}catch{}}function ko(t){return jn().find(e=>e.id===t)?.text??""}function Dp(t,e){let o=jn().filter(n=>n.id!==t);o.push({id:t,text:e}),Ii(o)}function Ti(t=ki()){Ii(jn().filter(e=>e.id!==t)),Yn()}function Np(t){let e=ko("draft");if(!e||ko(t))return;let o=jn().filter(n=>n.id!=="draft");o.push({id:t,text:e}),Ii(o)}function Mi(t){return`${t.getAttribute("aria-label")??""} ${t.getAttribute("title")??""}`}function Up(t){let e=Mi(t);return Gl.test(e)&&!/quote|引用/.test(e)?!1:/quote|引用/.test(e)&&qi.test(e)?!0:qi.test(e)&&!Gl.test(e)}function Wl(t){let e=t.cloneNode(!0),o=[...e.querySelectorAll("button, [role='button']")],n=new Set(o.map(r=>r.getAttribute("aria-label")).filter(Boolean));for(let r of o)r.remove();for(let r of e.querySelectorAll("*"))!r.children.length&&n.has(v(r.textContent??""))&&r.remove();return v(e.textContent??"")}function Fp(t){let e=st(),o=t.parentElement,n=0;for(;o&&o!==e&&n<5;){if(n++,o.matches(c.composerInput)||o.querySelector(c.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=Wl(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function Qn(){let t=st();if(!t)return null;for(let e of t.querySelectorAll("button, [role='button']")){if(e.closest("[data-bloom]")||!Up(e))continue;let o=Fp(e),n=o?Wl(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:e}}return null}function Kp(t){let e=t.closest(c.searchUnit)??t.closest(c.oldMessage);return e&&(zt(e)??e.getAttribute("data-message-author-role"))==="user"?e:null}function Bi(t){return v(t).slice(0,48)}function Gp(t,e){let o=Bi(t);if(o.length<Ql)return null;let n=null;for(let r of Re()){if(e&&(r===e||e.contains(r)||r.contains(e)))continue;let i=v(r.textContent??"");if(!i.includes(o))continue;let s=o.length/Math.max(i.length,1);(!n||s>n.score)&&(n={el:r,score:s})}return n?.el??null}function Yp(t,e){let o=Bi(e),n=t;for(let r of t.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&v(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${_("hit")}`)?.classList.remove(_("hit")),n.classList.add(_("hit")),window.clearTimeout(Ei),Ei=window.setTimeout(()=>n.classList.remove(_("hit")),Hp)}function Yl(t){let e=t.closest(c.timelineScroll)??document.scrollingElement;if(!(e instanceof HTMLElement)&&e!==document.scrollingElement)return;let o=t.getBoundingClientRect();if(o.height<1||!e)return;let n=e.getBoundingClientRect(),r=st()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,s=o.top+o.height/2-(n.top+i)/2;Math.abs(s)<8||e.scrollTo({top:e.scrollTop+s,behavior:"smooth"})}function Pi(){if(!Ot||!Kn?.isConnected)return;let t=Kn.getBoundingClientRect();t.width<1||(Ot.style.top=`${Math.max(8,t.top+8)}px`,Ot.style.left=`${Math.max(8,t.right-Ot.offsetWidth-8)}px`)}function jp(t,e,o){Kn=t,Gn=e,Ot??=a("button",{class:`bloom-root ${_("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),Ot.isConnected||document.body.append(Ot),Yp(t,o),Pi()}function jl(){Ot?.remove(),Ot=null,Kn=null,Gn=null,document.querySelector(`.${_("hit")}`)?.classList.remove(_("hit"))}function zl(){return document.querySelector('[data-bloom="quote-chip"]')}function Yn(){zl()?.remove()}function Qp(t){let o=st()?.getBoundingClientRect();!o||o.width<8||(t.style.width=`${Math.max(120,o.width-24)}px`,t.style.left=`${o.left+12}px`,t.style.top=`${Math.max(8,o.top-t.offsetHeight-8)}px`)}function Wp(t){let e=zl();e||(e=a("div",{class:`bloom-root ${_("chip")}`,attrs:{"data-bloom":"quote-chip"}},a("span",{class:_("text")}),a("button",{class:_("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(e));let o=e.querySelector(`.${_("text")}`),n=v(t);o&&o.textContent!==n&&(o.textContent=n),e.dataset.text=t,Qp(e)}function Ci(){if(!Si){Si=!0;try{let t=ki(),e=Qn();be.store.persistAcrossChats&&e&&ko(t)!==e.text&&Dp(t,e.text);let o=be.store.persistAcrossChats?ko(t):"";!o||e&&v(e.text)===v(o)?Yn():Wp(o),Pi()}finally{Si=!1}}}function zp(t){let e=t.closest('[data-bloom="quote-chip"]');if(e instanceof HTMLElement&&!t.closest(`.${_("x")}`)){let i=e.dataset.text??e.querySelector(`.${_("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:e}:null}let o=t.closest("blockquote");if(o instanceof HTMLElement&&!t.closest("a, button")){let i=Kp(o),s=v(o.textContent??"");if(i&&s)return{text:s,skip:i,origin:o}}let n=st();if(!n||!n.contains(t)||uo(t)||t.closest("button, [role='button']"))return null;let r=Qn();return!r||!r.row.contains(t)?null:{text:r.text,skip:null,origin:r.row}}function Vp(t){let{target:e}=t;if(!(e instanceof Element))return;if(e.closest('[data-bloom="quote-back"]')){t.preventDefault(),t.stopPropagation(),Gn?.isConnected&&Yl(Gn);return}if(e.closest(`.${_("x")}`)){t.preventDefault(),t.stopPropagation(),Ti();return}let o=Qn();if(o&&(e===o.dismiss||o.dismiss.contains(e))){Ti();return}if(Jp(e)&&Vl(),!be.store.jumpToPassage)return;let n=zp(e);if(!n)return;let r=Gp(n.text,n.skip);r&&(t.preventDefault(),t.stopPropagation(),jp(r,n.origin,n.text),Yl(r))}function Jp(t){let e=t.closest("button, [role='button']");return!(e instanceof HTMLElement)||e.closest("[data-bloom]")||!st()?.contains(e)?!1:/send|submit|发送|提交/i.test(Mi(e))&&!qi.test(Mi(e))}function Zp(t){return!(t instanceof KeyboardEvent)||t.key!=="Enter"||t.shiftKey||t.isComposing?!1:uo(t.target)}function Vl(){if(!be.store.persistAcrossChats)return;let t=ki(),e=ko(t);if(e){if(!Qn()){let o=J(),n=Bi(e);n.length>=Ql&&!v(o).includes(n)&&kt(`> ${e}

${o}`.trim())}Ti(t)}}function $p(t){Zp(t)&&Vl()}function Xp(t){!t.prevId&&t.id&&Np(t.id),Ci()}var Jl=h({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:be,styles:Kl,onSettingsChange(t){t==="jumpToPassage"&&!be.store.jumpToPassage&&jl(),t==="persistAcrossChats"&&!be.store.persistAcrossChats&&(sessionStorage.removeItem(Li),Yn()),Ci()},start(){Fe=new AbortController,document.addEventListener("pointerdown",Vp,{capture:!0,signal:Fe.signal}),document.addEventListener("keydown",$p,{capture:!0,signal:Fe.signal}),addEventListener("scroll",Pi,{capture:!0,passive:!0,signal:Fe.signal}),xi=At(Xp),wi=C(t=>Y(t)&&Ci())},stop(){Fe?.abort(),Fe=void 0,xi?.(),xi=void 0,wi?.(),wi=void 0,window.clearTimeout(Ei),jl(),Yn()}});var Zl=`/*
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
`;var tf="[data-app-action-sidebar-thread-row]{position:relative}[data-app-action-sidebar-thread-row]>[data-bloom=cls]{position:absolute;inset-inline-end:0.25rem;top:50%;width:0.875rem;height:0.875rem;margin:0;transform:translateY(-50%);pointer-events:none}",ef=I("bloom-cls"),of="bloom-cls",nf=600*1e3,Ri=oo("tab"),Ge=new Map,Io=new Map,Ke=null,$l=[],rf=t=>t==="streaming"||t==="error";function af(){let t=new Map,e=Date.now();for(let[o,n]of Io)e-n.at>nf?Io.delete(o):t.set(o,n.status);for(let[o,n]of Ge)t.set(o,n);return t}function sf(t){return a("span",{class:`bloom-root ${ef("",`-${t}`)}`,attrs:{"data-bloom":"cls","data-status":t,"aria-label":t==="error"?"Error":"Generating"}},t==="error"&&B("alert"))}function zn(){let t=af(),e=new Set;for(let[o,n]of t)for(let r of bo(o)){if(!wt(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){e.add(i);continue}i?.remove();let s=sf(n);e.add(s),r.append(s)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))e.has(o)||o.remove()}function Wn(t,e){t&&(e?Ge.set(t,e):Ge.delete(t),Ke?.postMessage({tab:Ri,id:t,status:e}),zn())}function lf({data:t}){!k(t)||typeof t.id!="string"||typeof t.tab!="string"||t.tab===Ri||(rf(t.status)?Io.set(t.id,{status:t.status,tab:t.tab,at:Date.now()}):Io.delete(t.id),zn())}function Oi(){for(let t of Ge.keys())Ke?.postMessage({tab:Ri,id:t,status:null})}var Xl=h({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:()=>`${Zl}${tf}`,start(){for(let t of document.querySelectorAll('[data-bloom="cls"]'))t.remove();Ke=typeof BroadcastChannel=="function"?new BroadcastChannel(of):null,Ke?.addEventListener("message",lf),addEventListener("pagehide",Oi),$l=[D.on("rise",({conversationId:t})=>Wn(t,"streaming")),D.on("fall",({conversationId:t,outcome:e})=>Wn(t,e==="error"?"error":null)),D.on("context",({prevId:t,id:e,migrated:o})=>{o&&tt().generating?Wn(e,"streaming"):!o&&Ge.get(t??"")==="streaming"&&Wn(t,null)}),C(t=>Y(t)&&zn())],b()&&zn()},stop(){for(let t of $l)t();Oi(),Ke?.close(),Ke=null,removeEventListener("pagehide",Oi),Ge.clear(),Io.clear();for(let t of document.querySelectorAll('[data-bloom="cls"]'))t.remove()}});var Zt="data-bloom-invite",cf=/^(?:invite team members|invite members|邀请团队成员|邀请成员)$/i,_l=':is(button, a:not([href^="/c/"])):not(main *, [role="dialog"] *)',uf={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${c.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])'],hideInvite:[`[${Zt}]`,`div:has(> [${Zt}]:only-child)`]},tc=y({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0},hideInvite:{type:"boolean",description:"Hide Invite team members in the sidebar.",default:!0}}),Vn,Hi=!1;function df(t){if(Y(t))for(let e of document.querySelectorAll(`${_l}, [${Zt}]`))!e.matches(_l)||!cf.test(v(e.textContent??""))?e.removeAttribute(Zt):e.hasAttribute(Zt)||e.setAttribute(Zt,"")}var ec=h({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads, notices and Invite team members.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:tc,styles:()=>Nt(Object.entries(uf).flatMap(([t,e])=>tc.store[t]?e:[])),start(){Hi=!0,Yt().then(()=>{Hi&&!Vn&&(Vn=C(df))})},stop(){Hi=!1,Vn?.(),Vn=void 0;for(let t of document.querySelectorAll(`[${Zt}]`))t.removeAttribute(Zt)}});var Ye=`form:has(:is(${c.composerInput})), ${c.oldComposerForm}`,Jn='[class*="ComposerLayoutBody"]',Ni='[class*="ComposerLayoutRoot"]',mf='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',pf=`:is(${Ye}) ${Jn}, :is(${Ye}):not(:has(${Jn})) ${Ni}, :is(${Ye}):not(:has(${Jn})):not(:has(${Ni})) :is(${mf})`,ff='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',gf='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',hf="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))",bf="var(--color-background-composer-surface, var(--composer-background-color, var(--color-bg-primary, Canvas)))",yf="composer-fill",oc=y({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function vf(){let{opacity:t,blur:e}=oc.store;if(t>=100)return"";{let i=`color-mix(in srgb, ${bf} ${t}%, transparent)`;return`[class*="ComposerLayoutRoot"], [data-composer-layout], [data-chatgpt-composer]{--composer-layout-surface-background:${i}!important;--composer-background-color:${i}!important;--composer-layout-surface-backdrop-filter:blur(${e}px)!important}`}let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${hf} ${t}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${e}px)!important;-webkit-backdrop-filter:blur(${e}px)!important`;return`:is(${ff}), :is(${Ye}){${o}}:is(${gf}){display:none!important}${pf}{${n}}:is(${Ye}):has(${Jn}) ${Ni}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${Ye}) :is(${c.composerInput}){background-color:transparent!important}`}function Di(){for(let t of document.querySelectorAll(`[data-bloom="${yf}"]`))t.remove()}var nc=h({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:oc,styles:vf,start(){Di()},stop(){Di()},onSettingsChange(){Di()}});var Af=1200,wf=8e3,xf=150,Sf=20,rc=6,Ki="continue where you left",qf=/message delivery timed out|please try again/i,ic=/waiting for the complete answer/i,ac=y({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:Ki,placeholder:Ki}}),Ui=[],$n=0,Bo=!1,Po=0,Qe="",Zn="",Gi=0,We=!1,Oo=!1,Xn=!0,je="",Yi=0,_n=!1,Ef=()=>ac.store.prompt.trim()||Ki;function sc(){return(vt(c.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function lc(){let t=sc();return!t||ic.test(t)||!qf.test(t)?"":t}function Tf(){let t=sc();return t&&ic.test(t)?t:""}function Mf(){let t=kn()?.querySelectorAll(c.turn),e=t?.[t.length-1];return`${e?.getAttribute("data-turn-key")??""}:${e?.textContent?.length??0}`}function cc(t,e,o){if(o===$n){if(tt().generating||J()!==t||e>=Sf){We=!1,tt().generating||(Qe="");return}us(),setTimeout(()=>cc(t,e+1,o),xf)}}function Cf(t){let e=$n;if(tt().generating||J()&&J()!==t){We=!1,Qe="";return}kt(t),_n=!0,vr(()=>{e===$n&&cc(t,0,e)})}function uc(t){return t===Qe||Po>=rc||tt().generating||J()?!1:(Qe=t,Po+=1,We=!0,Cf(Ef()),!0)}function Lf(){if(Bo||We||Oo)return;let t=Date.now(),e=lc();if(e){if(je="",e!==Zn){Zn=e,Gi=t;return}if(t-Gi<Af)return;uc(`${b()??""}:${e}`);return}if(Zn="",!Tf()){Xn=!0,je="";return}if(!Xn||!tt().generating||J())return;let n=`${b()??""}:${Mf()}`;if(n!==je){je=n,Yi=t;return}if(t-Yi<wf||Po>=rc)return;let r=Lr();r&&(Oo=!0,r.click())}function Fi(){$n+=1,Bo=!1,Po=0,Qe="",Zn="",Gi=0,We=!1,Oo=!1,Xn=!0,je="",Yi=0,_n=!1}var dc=h({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:ac,start(){Fi(),Ui=[D.on("rise",()=>{Bo=!1,Qe="",We=!1,_n&&(_n=!1,Xn=!1,je="")}),D.on("fall",({outcome:t})=>{if(Oo){Oo=!1,t==="left"?Bo=!0:uc(`${b()??""}:stall`);return}(t==="stopped"||t==="left")&&(Bo=!0),t==="done"&&!lc()&&(Po=0)}),D.on("context",({migrated:t})=>{t||Fi()}),D.on("tick",Lf)]},stop(){for(let t of Ui)t();Ui=[],Fi()}});var Rt=I("bloom-csi-"),kf=256,If=160,tr=1,mc=4,Bf=.1,Pf=.0015,Of=250;function Rf(t){return new Promise((e,o)=>{let n=new FileReader;n.onload=()=>e(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(t)})}function Hf(t){return new Promise((e,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>e(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=t})}function Df(t,e){let o=Math.max(1/t.naturalWidth,1/t.naturalHeight)*e.zoom,n=1/(2*t.naturalWidth*o),r=1/(2*t.naturalHeight*o);return{zoom:e.zoom,x:nt(e.x,n,1-n),y:nt(e.y,r,1-r)}}function pc(t,e,o){let n=t.width,r=t.getContext("2d");if(!r)return;let i=Math.max(n/e.naturalWidth,n/e.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(e,n/2-o.x*e.naturalWidth*i,n/2-o.y*e.naturalHeight*i,e.naturalWidth*i,e.naturalHeight*i)}function Nf(t,e){let o=a("canvas");return o.width=o.height=kf,pc(o,t,e),o.toDataURL("image/png")}function fc(t){let e=null,o={x:V.store.cropX,y:V.store.cropY,zoom:V.store.cropZoom},n,r=a("canvas",{class:Rt("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=If*devicePixelRatio;let i=a("div",{class:`bloom-muted ${Rt("status")}`}),s=a("div",{class:Rt("zoom")}),d=a("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(g,q=!0){e&&(o=Df(e,g),pc(r,e,o),q&&(clearTimeout(n),n=setTimeout(()=>{e&&(V.store.cropX=o.x,V.store.cropY=o.y,V.store.cropZoom=o.zoom,V.store.avatarUrl=Nf(e,o))},Of)))}function u(){s.replaceChildren(bn(o.zoom,tr,mc,Bf,"\xD7",g=>l({...o,zoom:g})))}async function m(g,q){i.textContent="";try{e=await Hf(g),q&&(V.store.avatarSource=g,o={x:.5,y:.5,zoom:tr}),t.classList.add(Rt("has-image")),u(),l(o,q)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let f=g=>{g?.type.startsWith("image/")&&Rf(g).then(q=>m(q,!0))};d.addEventListener("change",()=>f(d.files?.[0])),r.addEventListener("wheel",g=>{e&&(g.preventDefault(),l({...o,zoom:nt(o.zoom*(1-g.deltaY*Pf),tr,mc)}),u())},{passive:!1}),r.addEventListener("pointerdown",g=>{if(!e)return;r.setPointerCapture(g.pointerId);let q={...o},E=r.getBoundingClientRect(),L=O=>{if(!e)return;let $=Math.max(E.width/e.naturalWidth,E.height/e.naturalHeight)*o.zoom;l({...o,x:q.x-(O.clientX-g.clientX)/(e.naturalWidth*$),y:q.y-(O.clientY-g.clientY)/(e.naturalHeight*$)})};r.addEventListener("pointermove",L),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",L),{once:!0})});let T=a("div",{class:Rt("cropper"),attrs:{tabindex:"0"},on:{paste:g=>f([...g.clipboardData?.files??[]].find(q=>q.type.startsWith("image/"))),dragover:g=>g.preventDefault(),drop:g=>{g.preventDefault(),f(g.dataTransfer?.files[0])}}},a("div",{class:Rt("stage")},r),a("div",{class:Rt("controls")},go("",g=>g.trim()&&void m(g.trim(),!0),"https://\u2026 or data:image/\u2026","url"),a("div",{class:Rt("buttons")},F("Choose file",()=>d.click()),F("Reset crop",()=>{l({x:.5,y:.5,zoom:tr}),u()}),F("Clear",()=>{e=null,t.classList.remove(Rt("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),s.replaceChildren(),V.store.avatarUrl="",V.store.avatarSource=""},"danger")),s,i,d));return t.append(T),V.store.avatarSource&&m(V.store.avatarSource,!1),()=>{clearTimeout(n),t.replaceChildren()}}var gc=`/*
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
`;var Ro="data-bloom-csi-avatar",ji="data-bloom-csi-sized",vc="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",Ff=32,V=y({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:t=>fc(t)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),hc=[];function Ac(t){t.removeAttribute(Ro),t.removeAttribute(ji)}function bc(t){return(V.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${t}]`)])}function yc(t=[]){if(!Y(t))return;let e=V.store.displayName.trim()||null,o=!!V.store.avatarUrl,n=new Set(e?bc("name"):[]);for(let i of document.querySelectorAll(vc))n.has(i)||ne(i,null);for(let i of n)ne(i,e);let r=new Set(o?bc("avatar"):[]);for(let i of document.querySelectorAll(`[${Ro}]`))r.has(i)||Ac(i);for(let i of r)i.hasAttribute(Ro)||i.setAttribute(Ro,""),i.toggleAttribute(ji,!i.closest('[role="menu"]'))}function Kf(){let t=V.store.avatarUrl;return t?`:root{--bloom-csi-url:url("${t.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${V.store.avatarSize}px}:is(${c.rail}, ${c.oldRail}) [${ji}]{--bloom-csi-size:${Ff}px}`:""}var wc=h({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:V,styles:()=>`${Kf()}
${gc}`,start(){hc=[St(),C(yc)]},stop(){for(let t of hc)t();for(let t of document.querySelectorAll(`[${Ro}]`))Ac(t);for(let t of document.querySelectorAll(vc))ne(t,null)},onSettingsChange(){yc()}});var ze=I("bloom-greeting-"),xc=30,Sc=100;function qc(t){let e=-1,o=a("textarea",{class:`bloom-input ${ze("input")}`,attrs:{maxlength:String(Sc),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=F("Add",i),r=a("div",{class:ze("list")});function i(){let l=o.value.trim().slice(0,Sc);if(!l)return;let u=[...P.store.greetings];e>=0?u[e]=l:u.length<xc&&u.push(l),P.store.greetings=u,e=-1,o.value="",s()}function s(){let{greetings:l}=P.store;n.textContent=e>=0?"Save":"Add",n.disabled=e<0&&l.length>=xc,r.replaceChildren(...l.length?l.map((u,m)=>a("div",{class:ze("row",m===e?"row-editing":"row-idle")},a("div",{class:ze("text"),text:u}),z("edit","Edit",()=>{e=m,o.value=u,o.focus(),s()}),z("trash","Delete",()=>{P.store.greetings=l.filter((f,T)=>T!==m),e===m&&(e=-1),s()}))):[a("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),t.append(a("div",{class:ze("editor")},r,a("div",{class:ze("form")},o,n))),s();let d=Ee((l,u)=>l==="GreetingCustomizer"&&u==="greetings"&&s());return()=>{d(),t.replaceChildren()}}var Ec=`/*
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
`;var or="data-bloom-greeting",Yf=1e3,jf=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],P=y({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:t=>qc(t)},greetings:{type:"custom",default:jf},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),er,Tc=[],Qi,Uo=()=>Me()&&!re(),Qf=t=>t.replaceAll(/\s*\n\s*/g," ").trim(),Cc=()=>P.store.greetings.filter(t=>typeof t=="string"&&t.trim());function Fo(){let t=Cc();if(t.length)if(P.store.order==="random"&&t.length>1){let e=P.store.lastRandom;for(;e===P.store.lastRandom;)e=Math.floor(Math.random()*t.length);P.store.lastRandom=e,P.store.index=e}else P.store.index=(P.store.index+1)%t.length}function Wf(){return Uo()?vt(c.homeHeading):null}function Ho(){for(let t of document.querySelectorAll(`[${or}]`))t.removeAttribute(or),ne(t,null)}function Do(){for(let t of document.querySelectorAll("[data-bloom-placeholder]"))t.removeAttribute("data-bloom-placeholder")}function Mc(t){let e=ft(),o=Qf(t);if(!e||!o||J(e)){Do();return}e.getAttribute("data-bloom-placeholder")!==o&&e.setAttribute("data-bloom-placeholder",o)}function No(){let t=Cc(),e=ps(),o=Uo();if(!t.length||!e&&!o){Ho(),Do();return}if(e){Ho(),Mc(t[0]??"");return}let n=Wf();n?((P.store.index<0||P.store.index>=t.length)&&Fo(),n.setAttribute(or,""),ne(n,t[Math.max(0,P.store.index)%t.length]??"")):Ho(),P.store.heroOnlyOutsideProject?Do():Mc(t[Math.max(0,P.store.index)%t.length]??"")}function Wi(){clearInterval(er),er=void 0,P.store.mode==="interval"&&Uo()&&(er=setInterval(()=>{Fo(),No()},P.store.intervalSec*Yf))}function zf(t){P.store.mode!=="manual"||!(t.target instanceof Element)||!t.target.closest(`[${or}]`)||getSelection()?.toString()||(Fo(),No())}function Vf(){Uo()&&P.store.mode==="refresh"&&Fo(),Wi(),No()}var Lc=h({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:P,styles:Ec,start(){Ho(),Do(),Qi=new AbortController,document.addEventListener("click",zf,{signal:Qi.signal}),Uo()&&P.store.mode==="refresh"&&Fo(),Wi(),Tc=[C(t=>Y(t)&&No()),At(Vf)]},stop(){Qi?.abort();for(let t of Tc)t();clearInterval(er),Ho(),Do()},onSettingsChange(t){(t==="mode"||t==="intervalSec")&&Wi(),No()}});var Ko=I("bloom-history-"),zi=10,Jf=3e3;function Vi(t,e){let o="",n=0,r=new Set,i=a("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),s=a("div",{class:Ko("list")}),d=a("div",{class:Ko("pager")}),l,u=F("Clear all",()=>{if(!l){u.textContent="Click again to clear",l=setTimeout(()=>{l=void 0,u.textContent="Clear all"},Jf);return}clearTimeout(l),l=void 0,u.textContent="Clear all",Go([])},"danger");function m(){let T=[...ye.store.entries].toReversed(),g=o.trim().toLowerCase(),q=g?T.filter(U=>U.toLowerCase().includes(g)):T,E=Math.max(1,Math.ceil(q.length/zi));n=Math.min(n,E-1);let L=q.slice(n*zi,(n+1)*zi).map(U=>a("div",{class:Ko("row")},a("button",{class:Ko("text",r.has(U)?"text-open":"text-closed"),text:U,title:r.has(U)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{r.delete(U)||r.add(U),m()}}}),e&&z("edit","Use",()=>e(U)),z("copy","Copy",()=>void Vo(U)),z("trash","Delete",()=>Go(ye.store.entries.filter(dt=>dt!==U)))));s.replaceChildren(...L.length?L:[a("div",{class:"bloom-muted",text:g?"No matching prompts.":"No saved prompts yet."})]),d.replaceChildren(a("span",{class:"bloom-muted",text:`${q.length} ${g?"matching":"saved"} \xB7 page ${n+1} of ${E}`}),F("Previous",()=>{n--,m()}),F("Next",()=>{n++,m()}),u);let[O,$]=d.querySelectorAll("button");O.disabled=n===0,$.disabled=n>=E-1,u.disabled=!T.length}i.addEventListener("input",()=>{o=i.value,n=0,m()}),t.append(a("div",{class:Ko("manager")},i,s,d)),m();let f=Ee((T,g)=>T==="InputHistory"&&g==="entries"&&m());return()=>{f(),clearTimeout(l),t.replaceChildren()}}var kc=`/*
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
`;var Ht=I("bloom-history-"),$f=2e3,ye=y({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:t=>Vi(t)},entries:{type:"custom",default:[]}}),K=null,Ji={text:"",at:0},Tt=null,$t=null,Zi,Je=()=>ye.store.entries.filter(t=>typeof t=="string");function Go(t){ye.store.entries=t.slice(-ye.store.maxEntries)}function $i(t){let e=t.trim();if(!e)return;let o=Date.now();e===Ji.text&&o-Ji.at<$f||(Ji={text:e,at:o},Go([...Je().filter(n=>n!==e),e]))}function Ic(t){t.preventDefault()}function Xf(){let t=a("button",{class:Ht("hud-count"),attrs:{type:"button"},on:{mousedown:Ic,click:og}}),e=a("button",{class:Ht("hud-x"),text:"\xD7",attrs:{type:"button","aria-label":"Exit history"},on:{mousedown:Ic,click:_f}});return a("div",{class:`bloom-root ${Ht("hud")}`,attrs:{"data-bloom":"history-hud",role:"group","aria-live":"polite","aria-label":"Input history"}},t,e)}function Bc(t,e){let o=ft();if(!o||$t)return;Tt??=Xf();let n=`${t+1} / ${e}`,r=Tt.querySelector(`.${Ht("hud-count")}`);r?.replaceChildren(n),r?.setAttribute("aria-label",`Show input history (${n})`);let i=(o.closest("form")??o).getBoundingClientRect();Tt.style.left=`${i.left+i.width/2}px`,Tt.style.top=`${i.top}px`,Tt.isConnected||document.body.append(Tt)}function Ve(){K=null,Tt?.remove()}function _f(){K&&kt(K.draft),Ve(),ft()?.focus()}function Pc(t){let e=Je();if(!K)return;let o=e[t];K.index=t,K.shown=o,kt(o),Bc(e.length-1-t,e.length)}function tg(t){let e=Je();if(!e.length)return!1;if(!K){if(t===1)return!1;K={index:e.length,draft:J(),shown:""}}let o=K.index+t;return o<0?!0:o>=e.length?(kt(K.draft),Ve(),!0):(Pc(o),!0)}function eg(t){let e=Je().indexOf(t);Yo(),!(e<0)&&(K??={index:e,draft:J(),shown:""},Pc(e),ft()?.focus())}function Yo(){if(!$t)return;$t.release(),$t.controller.abort(),$t.root.remove(),$t=null;let t=Je();K&&t[K.index]===K.shown?Bc(t.length-1-K.index,t.length):K=null}function og(){if($t)return;Tt?.remove();let t=a("div",{class:Ht("dialog-body")}),e=a("div",{class:`bloom-root ${Ht("backdrop")}`,attrs:{"data-bloom":"history-dialog"},on:{click:n=>n.target===n.currentTarget&&Yo()}},a("div",{class:Ht("dialog"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Input history"}},a("div",{class:Ht("dialog-header")},a("h2",{class:Ht("dialog-title"),text:"Input history"}),z("close","Close",Yo)),t));e.addEventListener("keydown",n=>n.stopPropagation());let o=new AbortController;document.addEventListener("keydown",n=>{n.key==="Escape"&&(n.preventDefault(),n.stopPropagation(),Yo())},{capture:!0,signal:o.signal}),xt(e),$t={root:e,release:Vi(t,eg),controller:o},t.querySelector("input")?.focus()}function Oc(t){return uo(t)?t:t instanceof HTMLElement?t.closest(c.composerInput):null}function ng(){if(ft()?.closest("[data-chatgpt-composer], [data-composer-input], form")?.querySelector('[aria-expanded="true"]'))return!0;for(let e of document.querySelectorAll('[role="listbox"], [role="menu"], [data-radix-popper-content-wrapper], [cmdk-root], [cmdk-list]')){if(!(e instanceof HTMLElement)||e.closest("[data-bloom]"))continue;let o=getComputedStyle(e);if(!(o.display==="none"||o.visibility==="hidden"))return!0}return!1}function rg(t){if(t.isComposing||t.key==="Process"||t.keyCode===229)return;let e=Oc(t.target);if(!e)return;if(t.key==="Enter"&&!t.shiftKey){$i(J(e)),Ve();return}if(t.key==="Escape"&&K){kt(K.draft),Ve(),t.preventDefault(),t.stopPropagation();return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.ctrlKey||t.metaKey||t.shiftKey||ng())return;let o=ls(e),n=t.key==="ArrowUp";!t.altKey&&!(n?o.first:o.last)||!n&&!K||tg(n?-1:1)&&(t.preventDefault(),t.stopPropagation())}function ig(t){K&&Oc(t.target)&&J()!==K.shown.trim()&&Ve()}function ag(t){t.target instanceof Element&&t.target.closest(c.sendButton)&&$i(J())}var Rc=h({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before. Click the counter to browse history.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:ye,styles:kc,start(){for(let e of document.querySelectorAll('[data-bloom="history-hud"], [data-bloom="history-dialog"]'))e.remove();Tt=null,Zi=new AbortController;let{signal:t}=Zi;document.addEventListener("keydown",rg,{capture:!0,signal:t}),document.addEventListener("input",ig,{capture:!0,signal:t}),document.addEventListener("click",ag,{capture:!0,signal:t}),document.addEventListener("submit",()=>$i(J()),{capture:!0,signal:t})},stop(){Zi?.abort(),Yo(),Ve();for(let t of document.querySelectorAll('[data-bloom="history-hud"]'))t.remove();Tt=null},onSettingsChange(t){t==="maxEntries"&&Go(Je())}});var Hc=`/*
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
`;var lg=1500,cg=5e3,ug=2e3,Gc=[{label:"UTC",value:"UTC"},{label:"\u7F8E\u56FD\u4E1C\u90E8",value:"America/New_York"},{label:"\u7F8E\u56FD\u4E2D\u90E8",value:"America/Chicago"},{label:"\u7F8E\u56FD\u5C71\u5730",value:"America/Denver"},{label:"\u7F8E\u56FD\u897F\u90E8",value:"America/Los_Angeles"},{label:"\u65E5\u672C",value:"Asia/Tokyo"},{label:"\u53F0\u6E7E",value:"Asia/Taipei"}],Ze=y({sourceTimeZone:{type:"select",description:"Zone the stored clock was written in. Leave UTC for ChatGPT create_time. Pick the same zone as the Shit GPT plugin only when that clock is a wall time in that zone; it is then shown in the system timezone.",options:Gc,default:"UTC"},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),rr=new Map,Xi=new Set,Yc=0,ir,Dc=[];function jc(t,e){rr.get(t)!==e&&(rr.set(t,e),clearTimeout(ir),ir=setTimeout(Qc,ug))}function Qc(){let t={...Ze.store.stamps,...Object.fromEntries(rr)};Ze.store.stamps=Object.fromEntries(Object.entries(t).toSorted((e,o)=>o[1]-e[1]).slice(0,lg))}function dg(t){let e=It(b())?.times;for(let o=t.length-1;o>=0;o--){let n=rr.get(t[o])??e?.get(t[o])??Ze.store.stamps[t[o]];if(n)return n}return null}var mg=()=>tt().generating||Date.now()-Yc<cg;function Wc(){return Intl.DateTimeFormat().resolvedOptions().timeZone}function zc(){let t=Ze.store.sourceTimeZone;if(!t||t==="UTC")return"UTC";try{return Intl.DateTimeFormat(void 0,{timeZone:t}),t}catch{return"UTC"}}function Vc(t,e){let o={};for(let n of new Intl.DateTimeFormat("en-US",{timeZone:e,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(t)))o[n.type]=n.value;return{y:+o.year,m:+o.month,d:+o.day,h:+o.hour%24,mi:+o.minute,s:+o.second}}function Jc(t){return Date.UTC(t.y,t.m-1,t.d,t.h,t.mi,t.s)}function Nc(t,e){let o=t;for(let n=0;n<4;n++){let r=t-Jc(Vc(o,e));if(r===0)return o;o+=r}return o}function pg(t,e){if(e==="UTC")return t;let o=(t%1e3+1e3)%1e3,n=t-o,r=new Date(n),i=Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),r.getUTCHours(),r.getUTCMinutes(),r.getUTCSeconds()),s=Nc(i,e),d=3600*1e3,l=Number.POSITIVE_INFINITY;for(let u of[-d,0,d]){let m=s+u;Jc(Vc(m,e))===i&&m<l&&(l=m)}return l!==Number.POSITIVE_INFINITY?l+o:Nc(i+d,e)+o}function fg(t,e){let o=zc();return e||o==="UTC"?t:pg(t,o)}function Uc(t,e){return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}function gg(t){let e=Wc(),o=Date.now(),n={hour:"2-digit",minute:"2-digit",timeZone:e};if(Uc(t,e)===Uc(o,e))return new Intl.DateTimeFormat(void 0,n).format(t);let r=s=>new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric"}).format(s),i=r(t)===r(o)?{}:{year:"numeric"};return new Intl.DateTimeFormat(void 0,{...i,month:"short",day:"numeric",...n}).format(t)}function hg(t,e){let o=new Date(e).toLocaleString(void 0,{timeZone:Wc()}),n=zc();if(n==="UTC"||e===t)return o;let r=new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"UTC"}).format(t);return`${Gc.find(s=>s.value===n)?.label??n} ${r} \u2192 ${o}`}function Zc(t){let e=zt(t)??t.getAttribute("data-message-author-role")??t.closest(c.turn)?.getAttribute("data-turn")??t.querySelector(c.authorRole)?.getAttribute("data-message-author-role");if(Ln(e))return e;let o=So(t).at(-1);return It(b())?.chain.find(n=>n.id===o)?.role??null}var Fc='[class*="group/activity-header"]';function bg(t){let e=t.parentElement;if(!e)return null;let o=t.closest(c.turn);return o&&e!==o&&!o.contains(e)?null:e}function yg(t){let e=t;for(let o=0;o<8&&e;o++){let n=bg(e);if(!n)return null;let r=[...n.children],i=r.indexOf(e);for(let s=i-1;s>=0;s--){let d=r[s],l=d.matches(Fc)?d:d.querySelector(Fc);if(l)return l;if(d.matches(c.searchUnit)||d.querySelector(c.searchUnit))return null}if(n===e.closest(c.turn))return null;e=n}return null}function vg(t){let e=t.parentElement;for(let o=0;o<4&&e;o++){if(e.classList.contains("flex-col"))return e;e=e.parentElement}return t.parentElement??t}function $c(t,e){if(e==="assistant"){let o=yg(t);if(o)return vg(o)}return t}function Ag(t,e){let o=Re();for(let n=o.length-1;n>=0;n--){let r=o[n];if(!(r!==t&&(Zc(r)!=="assistant"||$c(r,"assistant")!==e)))return r===t}return!0}function Kc(t){return t.querySelector(':scope > time[data-bloom="timestamp"]')}function wg(t){let e=So(t);if(!e.length||!wt(t)||t.querySelector("time:not([data-bloom])"))return;let o=Zc(t),n=$c(t,o);if(n!==t&&!Ag(t,n)){Kc(t)?.remove();return}let r=dg(e),i=!1;if(!r&&mg()){r=Date.now();let m=e.at(-1);Xi.add(m),jc(m,r),i=!0}else r&&Xi.has(e.at(-1))&&(i=!0);let s=n.querySelector('time[data-bloom="timestamp"]')??Kc(t);if(!r||Ze.store.hideOwnMessages&&o==="user"){s?.remove();return}let d=fg(r,i),l=gg(d);if(s?.textContent===l&&s.parentElement===n&&s===n.firstElementChild)return;let u=a("time",{class:`bloom-timestamp bloom-timestamp-${o??"assistant"}`,text:l,title:hg(r,d),attrs:{"data-bloom":"timestamp",datetime:new Date(d).toISOString()}});s&&s.replaceWith(u),(u.parentElement!==n||u!==n.firstElementChild)&&n.prepend(u)}var nr=Ut(()=>{for(let t of Re())wg(t)}),Xc=h({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:Ze,styles:Hc,start(){Dc=[C(t=>Y(t)&&nr()),qt.on("conversation",nr),qt.on("message-time",({messageId:t,time:e})=>{Xi.delete(t),jc(t,e),nr()}),D.on("fall",()=>{Yc=Date.now()})]},stop(){for(let t of Dc)t();ir&&(clearTimeout(ir),Qc());for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove()},onSettingsChange(t){if(t!=="stamps"){for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove();nr()}}});var xg=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])','[data-chatgpt-composer] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-composer-input] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-codex-composer-root] button[aria-label^="Dictat" i], [data-composer-placement] button[aria-label^="Dictat" i], [class*="ComposerLayout"] button[aria-label^="Dictat" i]'],Sg=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],_c=y({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),tu=h({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:_c,styles:()=>Nt([...xg,..._c.store.hideDictationSettings?Sg:[]])});var ve="data-bloom-share",qg=/^\/g\/g-p-/,Eg=/^(?:share|分享)$/i,Tg=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],Mg=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${ve}="project"]`],_i=y({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),ar,ta=!1;function Cg(t){if(!Y(t))return;let e=qg.test(location.pathname)&&!b();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${ve}]`))!e||!Eg.test(v(o.textContent??""))?o.removeAttribute(ve):o.hasAttribute(ve)||o.setAttribute(ve,"project")}var eu=h({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:_i,styles:()=>Nt([..._i.store.hideShareChat?Tg:[],..._i.store.hideShareProject?Mg:[]]),start(){ta=!0,Yt().then(()=>{ta&&!ar&&(ar=C(Cg))})},stop(){ta=!1,ar?.(),ar=void 0;for(let t of document.querySelectorAll(`[${ve}]`))t.removeAttribute(ve)}});var ou='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',Lg='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',kg="[data-bloom-profile-plan]",nu="visibility:hidden!important;user-select:none!important",iu=y({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function Ig(){let{hideUsername:t,hideEmail:e,enlargePlan:o,alignPlanWithAvatar:n}=iu.store,r=[];return t&&r.push(n?`:is(${ou}){display:none!important}`:`:is(${ou}){${nu}}`),e&&r.push(`:is(${Lg}){${nu}}`),t&&o&&r.push(`${kg}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var ru,au=h({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:iu,styles:Ig,start(){ru=St()},stop(){ru?.()}});var Bg=new Set(["chatgpt","new chat","\u65B0\u804A\u5929","codex"]);function Pg(){let t=v(document.title.replace(/\s*[|–-]\s*(?:ChatGPT|Codex)$/i,""));return t&&!Bg.has(t.toLowerCase())?t:null}function jo(t){return t?yo(t)??(t===b()?Pg():null):null}var su=`/*
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
`;var ot=I("bloom-recent-"),Mt="home",Rg=50,lu=140,Hg=new Set(["Backquote"]),Dg=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),w=y({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(t=>({label:t,value:t})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),Xt=null,ut=[],bt=0,ea,cu=[],lr=()=>re()?null:b()??(Me()?Mt:null);function uu(t,e){return Object.fromEntries(Object.entries(t).filter(([o])=>e.has(o)))}function mu(t){let e=jo(t);e&&w.store.titles[t]!==e&&(w.store.titles={...w.store.titles,[t]:e});let o=Ws(location.href);o&&t===b()&&w.store.projects[t]!==o&&(w.store.projects={...w.store.projects,[t]:o})}function du(t){if(!t)return;let e=[t,...w.store.visits.filter(n=>n!==t)].slice(0,Rg),o=new Set(e);w.store.visits=e,Object.keys(w.store.previews).some(n=>!o.has(n))&&(w.store.previews=uu(w.store.previews,o)),Object.keys(w.store.titles).some(n=>!o.has(n))&&(w.store.titles=uu(w.store.titles,o)),t!==Mt&&mu(t)}function Ng(t){if(!w.store.visits.includes(t))return;let{[t]:e,...o}=w.store.titles,{[t]:n,...r}=w.store.previews,{[t]:i,...s}=w.store.projects;w.store.visits=w.store.visits.filter(d=>d!==t),w.store.titles=o,w.store.previews=r,w.store.projects=s}function sr(t){if(!t||!w.store.visits.includes(t))return;let e={},o=It(t)?.chain??[];for(let r of o)e[r.role]=yt(In(r),lu);if(t===b())for(let r of Vt()){let i=He(r);i&&(e[r.role]=yt(i,lu))}let n=w.store.previews[t];!e.user&&!e.assistant||n?.user===e.user&&n?.assistant===e.assistant||(w.store.previews={...w.store.previews,[t]:e})}function Ug(){let t=Number(w.store.maxRecent);return w.store.visits.filter(e=>e!==Mt||w.store.includeHome).slice(0,t)}function pu(t){if(Xe(),t===lr())return;let e=t===Mt?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"], [data-sidebar-destination="builtin:home"]'):bo(t)[0];e?e.click():location.assign(t===Mt?"/":`/c/${t}`)}function Fg(t){let e=t===Mt?null:w.store.previews[t],o=e&&["user","assistant"].filter(n=>e[n]).map(n=>a("span",{class:ot("preview"),attrs:{"data-role":n},text:e[n]}));return a("span",{class:ot("thumb"),attrs:{"aria-hidden":"true"}},o?.length?a("span",{class:ot("page")},...o):a("span",{class:ot("fallback")},B(t===Mt?"plus":"bloom")))}function Kg(t,e){let o=t===Mt?"New chat":w.store.titles[t]??jo(t)??"Untitled chat",n=t===Mt?null:w.store.projects[t];return a("button",{class:ot("item"),attrs:{type:"button",role:"option","aria-selected":String(e===bt),"aria-label":n?`${o}, ${n}`:o},on:{click:()=>pu(t),pointerenter:()=>e!==bt&&$e(e)}},Fg(t),a("span",{class:ot("meta")},a("span",{class:`${ot("title")} bloom-truncate`,text:o}),n&&a("span",{class:ot("project")},B("folder"),a("span",{class:"bloom-truncate",text:n}))))}function fu(){ut.length?pu(ut[bt]):Xe()}function $e(t){ut.length&&(bt=(t+ut.length)%ut.length,Xt?.querySelectorAll(`.${ot("item")}`).forEach((e,o)=>e.setAttribute("aria-selected",String(o===bt))))}function Gg(){sr(b());let t=lr();ut=Ug(),t&&(ut=[t,...ut.filter(o=>o!==t)].slice(0,Number(w.store.maxRecent))),bt=ut.length>1?1:0;let e=ut.length?a("div",{class:ot("list"),attrs:{role:"listbox","aria-label":"Recent chats"}},...ut.map(Kg)):a("div",{class:ot("empty"),text:"Open a few chats, then hold Ctrl+` to switch."});e.style.setProperty("--bloom-recent-count",String(ut.length)),Xt=a("div",{class:`bloom-root ${ot("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:o=>o.target===o.currentTarget&&Xe()}},a("div",{class:ot("panel")},e)),xt(Xt)}function Xe(){Xt?.remove(),Xt=null}var Yg=t=>Hg.has(t.code)||Dg.has(t.key);function jg(t){if(t.ctrlKey&&!t.altKey&&!t.metaKey&&Yg(t)){t.preventDefault(),t.stopPropagation(),Xt?$e(bt+(t.shiftKey?-1:1)):Gg();return}if(!Xt)return;let o={Escape:Xe,Enter:fu,ArrowRight:()=>$e(bt+1),ArrowDown:()=>$e(bt+1),ArrowLeft:()=>$e(bt-1),ArrowUp:()=>$e(bt-1)}[t.key];o&&(t.preventDefault(),t.stopPropagation(),o())}function Qg(t){Xt&&t.key==="Control"&&fu()}var gu=h({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:w,styles:su,start(){ea=new AbortController;let{signal:t}=ea;addEventListener("keydown",jg,{capture:!0,signal:t}),addEventListener("keyup",Qg,{capture:!0,signal:t}),addEventListener("blur",Xe,{signal:t}),document.addEventListener("visibilitychange",()=>document.hidden&&sr(b()),{signal:t}),cu=[At(({prevId:i})=>{sr(i),du(lr())}),qt.on("conversation",({id:i})=>{w.store.visits.includes(i)&&mu(i),sr(i)}),qt.on("conversation-missing",({id:i})=>Ng(i))];let{visits:e,titles:o,previews:n}=w.store,r=e.filter(i=>i!==Mt&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(w.store.visits=e.filter(i=>!r.includes(i))),du(lr())},stop(){ea?.abort();for(let t of cu)t();Xe()}});var oa="data:audio/mpeg;base64,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";var hu=new x("ResponseNotification"),Wg=.5,bu="BloomNoticeClaim",zg=3e4,Qo=y({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:t=>(t.append(F("Preview",xu)),()=>t.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),yu=null,na=new Map,vu=[],ra,Vg=t=>Uint8Array.from(atob(t.slice(t.indexOf(",")+1)),e=>e.charCodeAt(0)).buffer;function Jg(t,e){let o=na.get(e);return o||(o=(e.startsWith("data:")?Promise.resolve(Vg(e)):Zo(e)).then(n=>t.decodeAudioData(n)),o.catch(()=>na.delete(e)),na.set(e,o)),o}async function Au(t){yu??=new AudioContext;let e=yu;e.state==="suspended"&&e.resume();let o=e.createBufferSource(),n=e.createGain();o.buffer=await Jg(e,t),n.gain.value=Wg,o.connect(n).connect(e.destination),o.start()}function xu(){let t=Qo.store.soundUrl.trim();Au(t||oa).catch(e=>{hu.warn("Sound failed",e),t&&Au(oa).catch(o=>hu.warn("Default chime failed",o))})}function Zg(t){let e=`${t??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:e,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:e,silent:!0});o.onclick=()=>{focus(),o.close()}}function $g(t){let e=Jo(nn(bu)??"");return t&&k(e)&&e.id===t&&Date.now()-Number(e.at)<zg?!1:(rn(bu,{id:t,at:Date.now()}),!0)}function wu(t){Qo.store.onlyWhenHidden&&!document.hidden||$g(t)&&(Qo.store.sound&&xu(),Qo.store.browserNotification&&Zg(jo(t)))}function Xg(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(ra=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:ra.signal}))}var Su=h({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply, including chats you left while they were answering.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:Qo,start(){Xg(),vu=[D.on("fall",({conversationId:t,outcome:e})=>e==="done"&&wu(t)),D.on("background",({conversationId:t})=>wu(t))]},stop(){for(let t of vu)t();ra?.abort()}});var _g=`:is(${c.sidebarScroll}, :has(> ${c.sidebarScroll})) + :has(${c.menuButton})`,th=`${c.rail} > :has(${c.menuButton})`,aa=`:is(${_g}, ${th}, ${c.oldProfile}):not(:hover)`,ia="[data-bloom-profile-avatar]",eh=`:is(${aa}, ${aa} :has(${ia})) > :not(${ia}, :has(${ia}))`,Eu=y({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function oh(){let{opacity:t,fadeAvatar:e}=Eu.store;return t>=100?"":`${e?aa:eh}{opacity:${t/100}!important}`}var qu,Tu=h({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Eu,styles:oh,start(){qu=St()},stop(){qu?.()}});var Mu=`/*
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
`;var G=I("bloom-star-chats"),rh=80,ih=60,ah=1200,sh=120,Wo=y({replaceReadAloud:{type:"boolean",description:"Put the star where the reply's Read aloud button is, and hide that button.",default:!0},messages:{type:"custom",default:[]}}),lh=`:is(${c.turnActions}) ${c.readAloud}`,sa,la=!1,_t=!1,we=!1,cr=0,X=null,ur="",R=null,ca,te;function da(){let t=Wo.store.messages;return Array.isArray(t)?t.filter(e=>k(e)&&typeof e.conversationId=="string"&&typeof e.messageId=="string"&&(e.role==="user"||e.role==="assistant")&&typeof e.snippet=="string"&&typeof e.starredAt=="number"):[]}function ma(){let t=b();return t?da().filter(e=>e.conversationId===t):[]}function ch(t,e){return da().some(o=>o.conversationId===t&&o.messageId===e)}function Cu(t){let e=da(),o=e.some(n=>n.conversationId===t.conversationId&&n.messageId===t.messageId);Wo.store.messages=o?e.filter(n=>!(n.conversationId===t.conversationId&&n.messageId===t.messageId)):[{...t,starredAt:Date.now()},...e].slice(0,rh)}function ua(t){return t.messageIds[0]||t.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||t.el.getAttribute("data-turn-key")||""}function uh(t){return yt(He(t)||v(t.el.textContent??""),ih)}function dh(t){let e=t.closest(c.turn);if(!e)return null;let o=Vt().filter(n=>e.contains(n.el));return o.find(n=>n.el.contains(t)||n.el===e)??o.findLast(n=>n.el.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING)??null}function mh(){let t=[...document.querySelectorAll(c.turnActions)].filter(e=>!e.closest(`[data-bloom], [role="dialog"], [inert], pre, ${c.sidebars}`));return t.filter(e=>!t.some(o=>o!==e&&o.contains(e)))}function ph(t,e){let o=Wo.store.replaceReadAloud?e.querySelector(c.readAloud):null;if(o&&!o.closest("[data-bloom]")){t.nextElementSibling!==o&&o.before(t);return}let n=fh(e);(t.parentElement!==n||n.lastElementChild!==t)&&n.append(t)}function fh(t){let e=[...t.querySelectorAll("button")].filter(n=>n.dataset.bloom!=="message-star"&&!n.closest("[data-bloom]"));return e.length?[...t.children].find(n=>n instanceof HTMLElement&&n!==e[0]&&e.every(r=>n.contains(r)))??t:t}function gh(){return[...document.querySelectorAll(c.headerMore)].filter(e=>{if(e.dataset.bloom==="message-star"||e.closest("[data-bloom], [role='dialog'], [inert]")||e.closest(c.sidebars))return!1;let o=e.getBoundingClientRect();return o.width===0&&o.height===0?!!e.closest("header, #page-header"):o.top>=0&&o.top<96&&o.left>window.innerWidth*.5}).toSorted((e,o)=>o.getBoundingClientRect().left-e.getBoundingClientRect().left||(e.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1))[0]??null}function Lu(t,e,o){return a("button",{class:e,attrs:{type:"button","aria-label":t},on:{pointerdown:n=>n.stopPropagation(),mousedown:n=>n.stopPropagation(),click:n=>{n.preventDefault(),n.stopPropagation(),o(n)}}},B("star"))}function hh(t,e){t.setAttribute("aria-pressed",String(e)),t.setAttribute("aria-label",e?"Unstar":"Star")}function dr(){return _t||we}function _e(){cr&&window.clearTimeout(cr),cr=0}function to(){_t=!1,we=!1,_e(),te?.enter(),X?.remove(),X=null,ur="",R?.classList.remove(G("-open")),R?.setAttribute("aria-expanded","false")}function mr(t){return t instanceof Node&&!!(R?.contains(t)||X?.contains(t))}function bh(t){t.classList.add(G("-flash")),window.setTimeout(()=>t.classList.remove(G("-flash")),ah)}function yh(t){let e=Vt().find(n=>ua(n)===t),o=e?.el.closest(c.turn)??e?.el;o&&(o.scrollIntoView({block:"start"}),bh(o))}function vh(){let t=b(),e=new Set,o=[...document.querySelectorAll('[data-bloom="message-star"][data-place="action"]')];if(!t||re()){for(let n of o)n.remove();return}for(let n of mh()){if(!wt(n))continue;let r=dh(n),i=r?ua(r):"";if(!r||!i)continue;let s=n.querySelector('[data-place="action"]');(!s||s.dataset.id!==i)&&(s?.remove(),s=Lu("Star",G("-star"),()=>{let d=b(),l=Vt().find(u=>ua(u)===i);!d||!l||Cu({conversationId:d,messageId:i,role:l.role,snippet:uh(l)})}),s.dataset.bloom="message-star",s.dataset.place="action",s.dataset.id=i),hh(s,ch(t,i)),ph(s,n),e.add(s)}for(let n of o)e.has(n)||n.remove()}function Ah(){if(!X||!R)return;let t=R.getBoundingClientRect(),e=X.offsetWidth||288,o=X.offsetHeight||120,n=t.bottom+6;n+o>window.innerHeight-8&&(n=Math.max(8,t.top-o-6));let r=Math.max(8,Math.min(t.right-e,window.innerWidth-e-8));X.dataset.place=n>=t.bottom?"below":"above",X.style.left=`${Math.round(r)}px`,X.style.top=`${Math.round(n)}px`}function wh(){if(!dr()||!R){X?.remove(),X=null,ur="",R?.classList.remove(G("-open")),R?.setAttribute("aria-expanded","false");return}let t=ma(),e=t.map(o=>`${o.messageId}	${o.snippet}`).join(`
`);if(!X||ur!==e){X?.remove();let o=t.map(n=>a("div",{class:G("-row")},a("button",{class:G("-jump"),attrs:{type:"button"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),to(),yh(n.messageId)}}},a("span",{class:G("-role"),text:n.role==="user"?"You":"ChatGPT"}),a("span",{class:G("-snip"),text:n.snippet||"Message"})),Lu("Unstar",G("-unstar"),()=>Cu(n))));X=a("div",{class:`bloom-root ${G("-panel")}`,attrs:{"data-bloom":"star-list"},on:{pointerenter:()=>{_e(),te?.enter(),we=!0},pointerleave:n=>{mr(n.relatedTarget)||_t||te?.leave(n)}}},a("div",{class:G("-bridge"),attrs:{"aria-hidden":"true"}}),a("div",{class:G("-head"),text:"Starred"}),a("div",{class:G("-body")},...o.length?o:[a("div",{class:G("-empty"),text:"No starred messages in this chat"})])),document.body.append(X),ur=e}Ah(),R.classList.add(G("-open")),R.setAttribute("aria-expanded","true")}function xh(){for(let r of document.querySelectorAll('[data-bloom="starred"]'))r.remove();let t=gh(),e=t?.parentElement??null,o=b();if(!t||!e||e.closest(c.sidebars)||!o||re()||!wt(e)){R?.remove(),R=null,to();return}R||(R=a("button",{class:G("-toggle"),attrs:{type:"button","data-bloom":"message-star","data-place":"header","aria-label":"Starred messages","aria-expanded":"false"},on:{pointerdown:r=>r.stopPropagation(),pointerenter:()=>{_e(),te?.enter(),cr=window.setTimeout(()=>{we=!0,Ae()},sh)},pointerleave:r=>{mr(r.relatedTarget)||(_e(),dr()&&te?.leave(r))},click:r=>{r.preventDefault(),r.stopPropagation(),_t=!_t,we=_t,_e(),_t||to(),Ae()}}},B("star"))),(R.parentElement!==e||R.nextElementSibling!==t)&&t.before(R);let n=t.getBoundingClientRect();n.width>0&&(R.style.width=`${n.width}px`,R.style.height=`${n.height}px`),R.classList.toggle(G("-here"),ma().length>0),wh()}function Sh(){let t=new Set(ma().map(e=>e.messageId));for(let e of document.querySelectorAll('[data-bloom="navigator"] .bloom-nav-tick, [data-bloom="navigator"] .bloom-nav-row'))e.classList.toggle(G("-mark"),!!e.dataset.messageId&&t.has(e.dataset.messageId))}function Ae(){if(!la){la=!0;try{for(let t of document.querySelectorAll('[data-bloom="starred"], [data-bloom="chat-star"]'))t.remove();vh(),xh(),Sh()}finally{la=!1}}}function qh(){to(),R?.remove(),R=null;for(let t of document.querySelectorAll('[data-bloom="message-star"], [data-bloom="star-list"], [data-bloom="starred"], [data-bloom="chat-star"]'))t.remove();for(let t of document.querySelectorAll(`.${G("-mark")}`))t.classList.remove(G("-mark"))}var ku=h({name:"StarChats",description:"Star a message from its toolbar. The star left of the top-right menu opens this chat's list.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:Wo,styles:()=>`${Mu}${Wo.store.replaceReadAloud?Nt([lh]):""}`,onSettingsChange(t){(t==="messages"||t==="replaceReadAloud")&&Ae()},start(){for(let o of document.querySelectorAll('[data-bloom="star-list"]'))o.remove();te=Bn({over:mr,trigger:()=>R,panel:()=>X,setHeld(o){if(o){we=!0,Ae();return}_t||(we=!1,Ae())}}),sa=C(o=>Y(o)&&Ae());let t=o=>{mr(o.target)||dr()&&to()};document.addEventListener("pointerdown",t,!0);let e=o=>{o.key!=="Escape"||!dr()||(o.preventDefault(),to())};document.addEventListener("keydown",e,!0),ca=()=>{document.removeEventListener("pointerdown",t,!0),document.removeEventListener("keydown",e,!0)},Ae()},stop(){sa?.(),sa=void 0,ca?.(),ca=void 0,_e(),te?.dispose(),te=void 0,qh()}});var Iu="filter:blur(6px)!important;transition:filter 0.2s ease",gx=`:is(${c.sidebars})`,xe="data-bloom-streamer-open",Eh="[data-app-action-sidebar-thread-row], [data-app-action-sidebar-project-row], .bloom-recent-item",Bu=":not([data-app-action-sidebar-thread-row] *, [data-app-action-sidebar-project-row] *)";function Th(){return{conversations:{selectors:["[data-app-action-sidebar-thread-title]"],hover:!0,row:"[data-app-action-sidebar-thread-row]"},projects:{selectors:["[data-app-action-sidebar-project-label]"],hover:!0,row:"[data-app-action-sidebar-project-row]"},accountAvatar:{selectors:["[data-bloom-profile] img","[data-bloom-menu] img"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:[`[data-thread-title]${Bu}`,`[data-thread-title-trigger]${Bu}`],hover:!1}}}var Pu=y({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function Mh(t,e){let o=[`:is(${t}):hover`,`.bloom-recent-item:hover :is(${t})`,`:is(${t})[${xe}]`];return e&&o.push(`${e}:hover`,`${e}:hover :is(${t})`,`${e}:is(${t}):hover`,`${e}[${xe}]`,`${e}[${xe}] :is(${t})`),o.join(",")}function Ch(){let t=Th();return Object.entries(t).filter(([e])=>Pu.store[e]).map(([,e])=>{let o=e.selectors.join(",");if(!e.hover)return`:is(${o}){${Iu}}`;let n="row"in e?e.row:void 0;return`:is(${o}){${Iu}}${Mh(o,n)}{filter:none!important}`}).join(`
`)}function Lh(t,e){for(let o of document.elementsFromPoint(t,e))if(o instanceof Element){let n=o.closest(Eh);if(n)return n}return null}function ga(t){for(let e of document.querySelectorAll(`[${xe}]`))e!==t&&e.removeAttribute(xe);t&&!t.hasAttribute(xe)&&t.setAttribute(xe,"")}var eo,kh=Ut(()=>{eo&&ga(Lh(eo.clientX,eo.clientY))});function pa(t){eo=t,kh()}function Ih(t){t.relatedTarget instanceof Node&&document.documentElement.contains(t.relatedTarget)||(eo=void 0,ga(null))}var fa,pr,Ou=h({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:Pu,styles:Ch,start(){fa=St(),pr=new AbortController;let t={capture:!0,signal:pr.signal,passive:!0};document.addEventListener("pointerover",pa,t),document.addEventListener("pointermove",pa,t),document.addEventListener("pointerout",pa,t),window.addEventListener("pointerleave",Ih,t)},stop(){pr?.abort(),pr=void 0,eo=void 0,ga(null),fa?.(),fa=void 0}});var ee=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)','[data-turn-key] [data-message-author-role="user"] blockquote:not(.twitter-tweet)','[class~="group/user-message"] blockquote:not(.twitter-tweet)'].join(","),ha=y({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function Bh(){let t=[`${ee}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${ee}>*{margin-block:0!important}`];return ha.store.italic||t.push(`${ee}{font-style:inherit!important}`),ha.store.quotes||(t.push(`${ee}{quotes:none!important}`),t.push(`${ee}::before,${ee}::after,${ee} p::before,${ee} p::after{content:none!important}`)),t.join(`
`)}var Ru=h({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:ha,styles:Bh});var Ph=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],Oh=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",Rh='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',Hu=y({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function Hh(){let t=`${Hu.store.width}rem`;return`:root,[data-app-action-timeline-scroll],[data-chatgpt-composer],[data-composer-input]{--thread-content-max-width:${t}!important;--composer-adjacent-max-width:${t}!important}`}var Du=h({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:Hu,styles:Hh});var Dh=[nl,Cs,Fl,Jl,Xl,ec,nc,dc,wc,Lc,Rc,Xc,tu,eu,au,gu,Su,Tu,ku,Ou,Ru,Du],ba=Dh;var Nh=new x("Bloom"),Nu="2.0.110";var ya=0,fr,zo="__bloomOnShortcut";function gr(t){if(t.isComposing||!t.shiftKey||!(t.metaKey||t.ctrlKey)||t.key!=="b"&&t.key!=="B")return;t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation();let e=Us();Qt();for(let o of document.querySelectorAll("[data-bloom='settings']"))o.remove();e||Pe()}function Uh(){let t=mt;t[zo]&&document.removeEventListener("keydown",t[zo],!0),t[zo]=gr,document.addEventListener("keydown",gr,!0)}function Fh(){ya++,document.removeEventListener("keydown",gr,!0);let t=mt;t[zo]===gr&&delete t[zo],fr?.(),fr=void 0,ts(),io(),_o()}async function va(){let t=++ya,e=()=>t===ya;io(),_o();for(let o of ba)o.updatedAt=bs[o.name];Ka(ba),Da(),Ya(),$o("base",os),gs(),Uh(),mn("Init"),Pr().then(()=>{e()&&(La(),mn("DOMContentLoaded"))}),await Or(),e()&&(mn("HostReady"),fr?.(),fr=Gs(),_a(),Nh.info(`Bloom++ ${Nu} app host ready`))}var Kh=new x("Boot");window===window.top&&(Ia(mt.Bloom),Ba(Aa),va().catch(t=>Kh.error("Startup failed",t)));})();
