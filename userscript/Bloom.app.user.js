// ==UserScript==
// @name         Bloom++ (ChatGPT app)
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.112
// @description  Bloom++ host for the official ChatGPT macOS app. Injected over loopback CDP; not a web userscript.
// @author       0-V-linuxdo & Bloom contributors
// @homepageURL  https://github.com/0-V-linuxdo/Bloom
// @supportURL   https://github.com/0-V-linuxdo/Bloom/issues
// @match        app://*/*
// @run-at       document-start
// @grant        none
// @license      GPL-3.0-or-later
// ==/UserScript==

/* Bloom++ v2.0.112 ChatGPT app host. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Yu=Object.defineProperty;var ju=(t,e)=>{for(var o in e)Yu(t,o,{get:e[o],enumerable:!0})};var x=class{constructor(e){this.tag=e}log(e,o){console[e](`[Bloom++] [${this.tag}]`,...o)}debug(...e){this.log("debug",e)}info(...e){this.log("info",e)}warn(...e){this.log("warn",e)}error(...e){this.log("error",e)}};var nt=(t,e,o)=>Math.min(o,Math.max(e,t)),k=t=>typeof t=="object"&&t!==null&&!Array.isArray(t),no=t=>`${t}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,yt=(t,e)=>t.length>e?`${t.slice(0,e-1)}\u2026`:t,v=t=>t.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function xa(t,e){return`${t} ${e}${t===1?"":"s"}`}async function Vo(t){if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}await navigator.clipboard.writeText(t)}function Jo(t){try{return JSON.parse(t)}catch{return}}var mt=typeof unsafeWindow>"u"?window:unsafeWindow,Qu=200,Wu=300;function Zo(t){return new Promise((e,o)=>GM_xmlhttpRequest({url:t,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=Qu&&n<Wu?e(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var zu=new x("Styles"),Nt=new Map,ro=new Set,oe=new Map,br=!0,Sa=t=>t.replaceAll(/[^A-Za-z0-9_-]/g,"_"),Vu=t=>`:where(:root){--bloom-sheet-${Sa(t)}:1}`,Ju=(t,e)=>`${Vu(t)}${e}`,qa=t=>`bloom-style-${t}`;function Ea(t){try{return[...t.cssRules].map(e=>e.cssText).join(`
`)}catch{return""}}function Zu(t,e){let o=Ea(t);return o?o.includes(`--bloom-sheet-${Sa(e)}`)?!0:e==="plugin-StreamerMode"?o.includes("blur(6px)")&&(o.includes("data-app-action-sidebar-thread-title")||o.includes("data-bloom-streamer-open")):e==="plugin-WiderChat"?o.includes("--composer-adjacent-max-width")&&o.includes("--thread-content-max-width"):e==="plugin-ComposerOpacity"?o.includes("--composer-layout-surface-backdrop-filter")||o.includes("--composer-layout-surface-background")&&o.includes("color-mix"):!1:!1}function Ta(t){let e=Ea(t);return e?!!(e.includes("--bloom-")||e.includes(".bloom-")||e.includes("[data-bloom")||e.includes("--bloom-sheet-")||e.includes("blur(6px)")&&e.includes("data-app-action-sidebar-thread-title")||e.includes("--composer-adjacent-max-width")&&e.includes("--thread-content-max-width")||e.includes("--composer-layout-surface-backdrop-filter")):!1}function Ma(){let t=document.adoptedStyleSheets.filter(e=>!ro.has(e)&&!Ta(e));document.adoptedStyleSheets=[...t,...Nt.values()]}function Ca(t){document.readyState==="loading"||t.parentNode===document.head||document.head.append(t)}function $u(t,e){let o=oe.get(t);o||(o=document.createElement("style"),o.id=qa(t),oe.set(t,o)),o.textContent!==e&&(o.textContent=e),Ca(o)}function $o(t,e){let o=Ju(t,e);if(br)try{let n=Nt.get(t);n||(n=new mt.CSSStyleSheet,Nt.set(t,n),ro.add(n)),n.replaceSync(o),Ma();return}catch(n){zu.warn("Constructed style sheets unavailable, using <style> after parsing",n),br=!1;let r=Nt.get(t);r&&ro.delete(r),Nt.delete(t)}$u(t,o)}function io(t){let e=Nt.get(t);e&&(ro.delete(e),Nt.delete(t)),oe.get(t)?.remove(),oe.delete(t);for(let o of document.querySelectorAll(`style[id="${qa(t)}"]`))o.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(o=>o!==e&&!Zu(o,t)),br&&Ma()}catch{}}function ao(){Nt.clear(),ro.clear();for(let t of oe.values())t.remove();oe.clear();for(let t of document.querySelectorAll("style[id^='bloom-style-']"))t.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(t=>!Ta(t))}catch{}}function ka(){for(let t of oe.values())Ca(t)}var I=t=>(...e)=>e.map(o=>t+o).join(" "),Xo=(...t)=>t.filter(Boolean).join(" "),Ut=t=>t.length?`${t.map(e=>`${e}:not([data-bloom])`).join(",")}{display:none!important}`:"";var La="__bloomHost",yr=new x("Boot"),Xu=['[data-bloom="navigator"]','[data-bloom="settings"]','[data-bloom="history-hud"]','[data-bloom="history-dialog"]','[data-bloom="star-list"]','[data-bloom="entry"]','[data-bloom="menu-entry"]','[data-bloom="menu-flyout"]','[data-bloom="message-star"]','[data-bloom="starred"]','[data-bloom="chat-star"]','[data-bloom="queue"]','[data-bloom="recent"]','[data-bloom="quote-chip"]','[data-bloom="quote-back"]','[data-bloom="cls"]','[data-bloom="timestamp"]','[data-bloom="tooltip"]','[data-bloom="notices"]'].join(", "),_u=["data-bloom-greeting","data-bloom-placeholder","data-bloom-streamer-open","data-bloom-share","data-bloom-invite","data-bloom-csi-avatar","data-bloom-csi-sized"];function _o(){if(!(typeof document>"u"||!document.documentElement)){for(let t of document.querySelectorAll(Xu))t.remove();for(let t of _u)for(let e of document.querySelectorAll(`[${t}]`))e.removeAttribute(t);for(let t of document.querySelectorAll("[data-bloom-text]"))t.removeAttribute("data-bloom-text"),t.style.removeProperty("--bloom-text-size"),t.style.removeProperty("--bloom-text")}}function td(t){if(yr.warn("Replacing another Bloom++ instance",t.VERSION),t.destroy){t.destroy();return}for(let e of t.plugins?.values()??[]){try{e.stop?.()}catch(o){yr.error("Failed to stop previous plugin",o)}e.styles="",e.start=void 0}ao()}function Ia(t){let e=mt,o=new Set;for(let n of[t,e.Bloom,e[La]])if(!(!n||o.has(n))){o.add(n);try{td(n)}catch(r){yr.error("Failed to retire Bloom++",r)}}_o()}function Ba(t){let e=mt;try{delete e.Bloom}catch{}Object.defineProperty(e,"Bloom",{value:t,configurable:!0,writable:!0}),Object.defineProperty(e,La,{value:t,configurable:!0,writable:!0})}var Aa={};ju(Aa,{VERSION:()=>Ku,destroy:()=>Qh,init:()=>va,plugins:()=>Z});var ed=new x("Dom");function s(t,e={},...o){let n=document.createElement(t);e.class&&(n.className=e.class),e.text!=null&&(n.textContent=e.text),e.title&&(n.title=e.title);for(let[r,i]of Object.entries(e.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(e.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var Pa=document.createElement("template");function Oa(t){return Pa.innerHTML=t.trim(),Pa.content.firstElementChild.cloneNode(!0)}var rt=t=>t instanceof HTMLElement&&t.isConnected&&t.getClientRects().length>0&&!t.closest("[inert]"),vt=(t,e=document)=>[...e.querySelectorAll(t)].find(rt)??null,od=16,nd="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function on(t,e){let o=setInterval(t,e),n;try{n=new Worker(URL.createObjectURL(new Blob([nd],{type:"text/javascript"}))),n.addEventListener("message",t),n.postMessage(e)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function vr(t){document.hidden?setTimeout(t,od):requestAnimationFrame(t)}function Ft(t){let e=!1;return()=>{e||(e=!0,vr(()=>{e=!1;try{t()}catch(o){ed.error("Scheduled task failed",o)}}))}}var tn=new Set,en=[],so,rd=Ft(()=>{let t=en;en=[];for(let e of tn)e(t)});function C(t){return tn.add(t),so||(so=new MutationObserver(e=>{en.push(...e),rd()}),so.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),t([]),()=>{tn.delete(t),!tn.size&&(so?.disconnect(),so=void 0,en=[])}}var id=t=>t instanceof Element&&(t.hasAttribute("data-bloom")||!!t.closest("[data-bloom]")),Y=t=>!t.length||t.some(e=>!id(e.target)),ad=t=>`"${t.replaceAll("\\","\\\\").replaceAll('"','\\"').replaceAll(`
`,"\\A ")}"`;function ne(t,e){if(e==null){t.removeAttribute("data-bloom-text"),t.style.removeProperty("--bloom-text-size"),t.style.removeProperty("--bloom-text");return}t.style.setProperty("--bloom-text",ad(e)),t.getAttribute("data-bloom-text")!==e&&t.setAttribute("data-bloom-text",e)}function h(t){return t}var sd=new x("Storage");function nn(t){try{return localStorage.getItem(t)??void 0}catch{return}}function rn(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch(o){sd.warn("localStorage write failed",o)}}function Ra(t,e){addEventListener("storage",o=>{o.key===t&&e(o.newValue)})}var Ar="BloomSettings",ld=100,Kt={plugins:{}},an=new Set,wr=new Set,Ee;function Ha(t){let e=t;for(let o=0;typeof e=="string"&&o<2;o++)e=Jo(e);return!k(e)||!k(e.plugins)||!Object.keys(e.plugins).length?null:e}function Da(){let t=Ha(nn(Ar));t&&(Kt.plugins=t.plugins)}var Na=(t,e)=>`${t}
${e}`;function xr(){Ee=void 0,wr.clear(),rn(Ar,Kt)}function cd(t){let e=Ha(t);if(!e)return;let o=[];for(let n of new Set([...Object.keys(Kt.plugins),...Object.keys(e.plugins)])){let r=Kt.plugins[n]??={},i=k(e.plugins[n])?e.plugins[n]:{};for(let a of new Set([...Object.keys(r),...Object.keys(i)]))wr.has(Na(n,a))||JSON.stringify(r[a])===JSON.stringify(i[a])||(i[a]===void 0?delete r[a]:r[a]=i[a],o.push([n,a]))}for(let[n,r]of o)for(let i of an)i(n,r)}function Sr(){Ee&&(clearTimeout(Ee),xr())}function Ua(t){let e=Object.keys(Kt.plugins).filter(o=>!t.has(o));if(!e.length)return e;for(let o of e)delete Kt.plugins[o];return clearTimeout(Ee),xr(),e}var it=(t,e)=>Kt.plugins[t]?.[e];function pt(t,e,o){let n=Kt.plugins[t]??={};o===void 0?delete n[e]:n[e]=o,wr.add(Na(t,e)),clearTimeout(Ee),Ee=setTimeout(xr,ld);for(let r of an)r(t,e)}function Te(t){return an.add(t),()=>void an.delete(t)}function qr(t){return t.type==="component"?void 0:t.default}function y(t){let e={def:t,pluginName:"",store:new Proxy({},{get:(o,n)=>it(e.pluginName,n)??(t[n]&&qr(t[n])),set:(o,n,r)=>(pt(e.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(t))t[o].type!=="custom"&&it(e.pluginName,o)!==void 0&&pt(e.pluginName,o)}};return e}var Fa=t=>{let e=()=>{let o=it("Settings",t);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>e().includes(o),list:e,toggle(o){let n=e();pt("Settings",t,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},sn=Fa("pinnedPlugins"),ln=Fa("starredPlugins");addEventListener("pagehide",Sr);Ra(Ar,cd);var uo=new x("PluginManager"),Z=new Map,Gt=new Set,un=new Set,Er=new Set,lo=new Map,ud=2880*60*1e3;function Ka(t){for(let e of t)e.settings&&(e.settings.pluginName=e.name),Z.set(e.name,e)}var Ga=()=>{let t=it("Settings","knownPlugins");return k(t)?t:null};function Ya(){let t=Ua(new Set(Z.keys()));t.length&&uo.info(`Dropped settings of removed plugins: ${t.join(", ")}`);let e=Ga(),o=Date.now(),n={...e},r=[...Z.values()].filter(i=>!i.hidden&&!i.required&&!(i.name in n));for(let i of r)n[i.name]=e?o:0;for(let i of Object.keys(n))Z.has(i)||delete n[i];JSON.stringify(n)!==JSON.stringify(e)&&pt("Settings","knownPlugins",n)}var ja=t=>{let e=Ga()?.[t];return!!e&&Date.now()-e<ud},Qa=t=>lo.get(t);function Wa(){for(let t of Er)t()}function Tr(t,e){let o=lo.get(t);(e?o?.join(`
`)===e.join(`
`):!o)||(e?lo.set(t,e):lo.delete(t),Wa())}var kt=t=>!!t.required||(it(t.name,"enabled")??!!t.enabledByDefault),Mr=t=>Gt.has(t),co=t=>`plugin-${t.name}`;function za(t){if(!t.styles)return;let e=typeof t.styles=="function"?t.styles():t.styles;e?$o(co(t),e):io(co(t))}function Va(t){if(!Gt.has(t.name))try{za(t),t.start?.(),Gt.add(t.name)}catch(e){io(co(t)),uo.error(`Failed to start ${t.name}`,e)}}function dn(t){Gt.delete(t.name),io(co(t));try{t.stop?.()}catch(e){uo.error(`Failed to stop ${t.name}`,e)}}var Cr=t=>t.startAt??"HostReady";function Ja(t){if(kt(t)){un.has(Cr(t))&&Va(t);return}dn(t)}function mn(t){un.add(t);for(let e of Z.values())Cr(e)===t&&Ja(e);uo.info(`${t}: ${[...Gt].join(", ")}`)}function Za(t){dn(t)}function $a(t){kt(t)&&un.has(Cr(t))&&Va(t)}function Xa(t,e){pt(t.name,"enabled",e),Sr()}function dd(){for(let t of Z.values())t.required||kt(t)||(Gt.has(t.name)?dn(t):io(co(t)))}var cn;function _a(){cn?.(),cn=C(()=>dd())}function ts(){cn?.(),cn=void 0;for(let t of Z.values())dn(t);Gt.clear(),un.clear(),lo.clear()}function es(t){return Er.add(t),()=>void Er.delete(t)}Te((t,e)=>{let o=Z.get(t);if(o){if(e==="enabled"){typeof it(t,"enabled")=="boolean"&&Ja(o),Wa();return}if(Gt.has(t))try{za(o),o.onSettingsChange?.(e)}catch(n){uo.error(`Settings change failed for ${t}`,n)}}});var os=`/*
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
`;var pd=new x("Events");function Me(){let t=new Map;return{on(e,o){let n=t.get(e);return n||t.set(e,n=new Set),n.add(o),()=>void n.delete(o)},emit(e,o){for(let n of t.get(e)??[])try{n(o)}catch(r){pd.error(`Listener for ${String(e)} failed`,r)}}}}function ns(t,e){let o=t instanceof Element?[t,...t.querySelectorAll("*")]:[...t.querySelectorAll("*")];for(let n of o){let r=n.shadowRoot;r&&(e(r),ns(r,e))}}function Yt(t,e=document){let o=[...e.querySelectorAll(t)];return ns(e,n=>o.push(...n.querySelectorAll(t))),o}var Lt=(t,e=document)=>Yt(t,e).find(rt)??null;var c={rail:"[data-app-navigation-rail]",sidebarScroll:"[data-app-action-sidebar-scroll]",sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"[data-app-action-sidebar-scroll]",oldRail:"[data-app-navigation-rail]",oldProfile:'button[aria-label="Open profile menu" i]',threadRow:"[data-app-action-sidebar-thread-row]",threadSelected:"[data-app-action-sidebar-thread-row][data-app-action-sidebar-thread-selected='true']",threadTitle:"[data-app-action-sidebar-thread-title]",projectRow:"[data-app-action-sidebar-project-row]",projectLabel:"[data-app-action-sidebar-project-label]",destination:"[data-sidebar-destination]",conversationLink:"[data-app-action-sidebar-thread-row]",timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:"[data-turn-key]",turn:"[data-turn-key]",messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",userBubble:'[class~="group/user-message"]',assistantReply:"[data-response-annotation-target]",assistantSentTime:"[data-assistant-message-sent-time]",oldThread:"[data-app-action-timeline-scroll]",turnActions:'.turn-action-controls, [class*="turn-action-controls"]',readAloud:'button:is([aria-label="Read aloud" i], [aria-label^="Read aloud" i], [aria-label="Stop reading" i], [aria-label^="Stop reading" i], [aria-label="\u6717\u8BFB"], [aria-label^="\u6717\u8BFB"], [aria-label="\u505C\u6B62\u6717\u8BFB"], [data-testid*="read-aloud" i])',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery, [class*='recovery']",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composer:"[data-chatgpt-composer], [data-composer-input]",composerInput:'[data-composer-input] [contenteditable="true"].ProseMirror, [contenteditable="true"].ProseMirror',composerConversation:"[data-above-composer-conversation-id]",oldComposerForm:"[data-chatgpt-composer]",sendButton:'button[aria-label="Send" i], button[aria-label="Send prompt" i], button[aria-label="Send message" i]',stopButton:'button[aria-label="Stop" i], button[aria-label^="Stop " i], button[aria-label="\u505C\u6B62" i], button[aria-label^="\u505C\u6B62"]',composerFooter:"[data-chatgpt-composer]",modelTrigger:'button[aria-label="Model selector" i], button[aria-label="Select ChatGPT model" i], [data-chatgpt-composer] button[aria-haspopup="menu"]',modelItem:'[role="menu"] [role="menuitemradio"], [role="menu"] [role="menuitem"]',effortSlider:'[role="menu"] [data-reasoning-slider]',homeHeading:'main h1:not([aria-hidden="true"]), [role="main"] h1:not([aria-hidden="true"]), [data-testid="home-heading"], [data-homepage-takeover] h1, .heading-xl, [class~="heading-xl"]',headerMore:'button[aria-label="More" i], button[aria-label="\u66F4\u591A"]',headerTitle:"[data-thread-title], [data-thread-title-trigger]",profile:'button[aria-label="Open profile menu" i]',rightPanel:"aside[data-app-shell-focus-area='right-panel']",summaryPanel:"[data-summary-panel-variant]"};var rs=/[​-‍﻿]/g,ft=()=>Lt(c.composerInput),mo=t=>t instanceof HTMLElement&&t.matches(c.composerInput),st=(t=ft())=>t?.closest("form")??t?.closest(c.composer)??Lt(c.composer);function J(t=ft()){if(!t)return"";if(t instanceof HTMLTextAreaElement)return t.value.replace(rs,"").trim();let e=t.cloneNode(!0);for(let n of e.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...e.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:e.textContent??"").replace(rs,"").trim()}var fd=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function is(t,e){let o=e?"insertText":"deleteContentBackward";t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:o,data:e||null})),t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:o,data:e||null}))}function It(t,e=ft()){if(!e)return!1;if(e.focus(),e instanceof HTMLTextAreaElement)return fd?.call(e,t),e.dispatchEvent(new Event("input",{bubbles:!0})),e.setSelectionRange(t.length,t.length),!0;let o=getSelection();return o?.selectAllChildren(e),typeof document.execCommand=="function"?t?document.execCommand("insertText",!1,t):document.execCommand("delete"):is(e,t),J(e)!==t.trim()&&is(e,t),o?.selectAllChildren(e),o?.collapseToEnd(),!0}function as(t,e){let o=t;for(;o&&o!==e;){if(o instanceof HTMLElement&&o.parentElement===e)return o;o=o.parentNode}return null}function ss(t,e,o){let n=document.createRange();return n.selectNodeContents(t),o?n.setEnd(e.startContainer,e.startOffset):n.setStart(e.endContainer,e.endOffset),n.toString().includes(`
`)?!0:!!n.cloneContents().querySelector("br")}function ls(t){if(t instanceof HTMLTextAreaElement){let{selectionStart:f,selectionEnd:T,value:g}=t;return{first:!g.slice(0,f).includes(`
`),last:!g.slice(T).includes(`
`)}}let e=getSelection();if(!e?.rangeCount||!t.contains(e.anchorNode))return{first:!0,last:!0};let o=e.getRangeAt(0),n=[...t.children].filter(f=>f instanceof HTMLElement),r=as(o.startContainer,t),i=as(o.endContainer,t),a=!r||r===n[0],d=!i||i===n[n.length-1],l=o.getBoundingClientRect(),u=(r??t).getBoundingClientRect(),m=Number.parseFloat(getComputedStyle(r??t).lineHeight)||24;return l.height?{first:a&&l.top-u.top<m,last:d&&u.bottom-l.bottom<m}:{first:a&&!ss(r??t,o,!0),last:d&&!ss(i??t,o,!1)}}var cs=t=>{let e=st();return(e&&Lt(t,e))??Lt(t)},kr=()=>cs(c.stopButton),gd=()=>{let t=cs(c.sendButton);return t&&!t.matches(c.stopButton)?t:null};function us(){let t=gd();if(t){t.disabled||t.click();return}ft()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var ds=()=>rt(kr());var pn=new x("AppProtocol"),po=Me();function hd(t){let e=t;if(typeof e=="string")try{e=JSON.parse(e)}catch{return null}if(Array.isArray(e)||!e||typeof e!="object")return null;let o=e,n=o.notification&&typeof o.notification=="object"?o.notification:o;if(typeof n.method!="string")return null;let r=n.params&&typeof n.params=="object"?n.params:void 0;return{method:n.method,params:r}}function fo(t){if(Array.isArray(t)){for(let o of t)fo(o);return}let e=hd(t);e&&po.emit("note",e)}var Ir=new WeakMap,Lr=new WeakMap;function bd(t,e){let o=Ir.get(t);if(o)return o;let n=r=>{fo(r.data),typeof t=="function"?t.call(e,r):t.handleEvent(r)};return Ir.set(t,n),n}function yd(){let t=MessagePort.prototype,e=t.addEventListener,o=t.removeEventListener;t.addEventListener=function(r,i,a){return r!=="message"?e.call(this,r,i,a):e.call(this,r,bd(i,this),a)},t.removeEventListener=function(r,i,a){return r!=="message"?o.call(this,r,i,a):o.call(this,r,Ir.get(i)??i,a)};let n=Object.getOwnPropertyDescriptor(t,"onmessage");n?.set&&Object.defineProperty(t,"onmessage",{configurable:!0,enumerable:n.enumerable,get(){return Lr.has(this)?Lr.get(this):n.get?.call(this)},set(r){Lr.set(this,r),n.set.call(this,function(a){fo(a.data),r?.call(this,a)})}})}function vd(){let t=window.electronBridge,e=t?.subscribeToWorkerMessages;if(!(!t||typeof e!="function"))try{t.subscribeToWorkerMessages=(o,n)=>e.call(t,o,r=>{fo(r),n(r)})}catch(o){pn.warn("electronBridge.subscribeToWorkerMessages is not writable",o)}}function Ad(){addEventListener("message",t=>fo(t.data));try{yd()}catch(t){pn.warn("MessagePort wrap failed",t)}try{vd()}catch(t){pn.warn("electronBridge wrap failed",t)}pn.info("Listening for app-server notifications")}Ad();var wd=new x("AppRoute"),xd=500,gn=new Set,hn=null,fn;function b(){return Yt(c.threadRow).find(e=>{let o=e.getAttribute("data-app-action-sidebar-thread-selected"),n=e.getAttribute("data-app-action-sidebar-thread-active"),r=e.getAttribute("aria-current");return o==="true"||n==="true"||r==="page"||r==="true"})?.getAttribute("data-app-action-sidebar-thread-id")??null}var Ce=()=>!b(),ps=()=>!1,re=()=>!1;function ms(){let t=b();if(t===hn)return;let{href:e}=location,o={prevHref:e,href:e,prevId:hn,id:t};hn=t;for(let n of gn)try{n(o)}catch(r){wd.error("Route listener failed",r)}}function Sd(){let t=new MutationObserver(ms);(()=>{document.body&&t.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-app-action-sidebar-thread-selected","data-app-action-sidebar-thread-id"]})})();let o=setInterval(ms,xd);return()=>{t.disconnect(),clearInterval(o)}}function At(t){return gn.add(t),fn||(hn=b(),fn=Sd()),()=>{gn.delete(t),!gn.size&&(fn?.(),fn=void 0)}}var qd=250,Ed=400,D=Me(),ie=!1,ke=null,le=!1,ae="done",se=!1,fs=!1,tt=()=>({generating:ie,conversationId:b()}),Td=t=>{if(!t)return!0;let e=b();return e?e===t||e.endsWith(t)||t.endsWith(e.replace(/^local:/,"")):!0};function Md(t){return t==="interrupted"||t==="aborted"||t==="cancelled"?"stopped":t==="failed"||t==="error"?"error":"done"}function Cd(){return se||ds()}function kd(t){ke=null,ie=!1,se=!1,D.emit("fall",{conversationId:b(),outcome:t}),le=!1,ae="done"}function Ld(){let t=Cd();t&&!ie&&(ie=!0,le=!1,ae="done",D.emit("rise",{conversationId:b()})),t||!ie?ke=null:ke==null?ke=Date.now():Date.now()-ke>=Ed&&kd(le?"stopped":ae)}function go(){Ld(),D.emit("tick",tt())}function Id({prevId:t,id:e}){t!==e&&(ie&&(se=!1,ke=null,ie=!1,le=!1,ae="done",D.emit("fall",{conversationId:t,outcome:"left"})),D.emit("context",{prevId:t,id:e,migrated:!t&&!!e}),go())}function Bd(t){if(Td(t.params?.threadId)){if(t.method==="turn/started"){se=!0,go();return}if(t.method==="turn/interrupt"){se=!1,ae="stopped",le=!0,go();return}t.method==="turn/completed"&&(se=!1,ae=Md(t.params?.turn?.status),ae==="stopped"&&(le=!0),go())}}function Pd(t){t.target instanceof Element&&t.target.closest(c.stopButton)&&(le=!0,se=!1)}function gs(){fs||(fs=!0,po.on("note",Bd),At(Id),document.addEventListener("click",Pd,!0),on(go,qd))}var Od="__reactContainer$",hs="__reactFiber$";function Pr(){return document.readyState!=="loading"?Promise.resolve():new Promise(t=>document.addEventListener("DOMContentLoaded",()=>t(),{once:!0}))}var Br=(t,e)=>Object.keys(t.wrappedJSObject??t).some(o=>o.startsWith(e)),wt=t=>!Br(document,Od)||Br(t,hs);function jt(){return document.body?Promise.resolve():new Promise(t=>{let e=new MutationObserver(()=>{document.body&&(e.disconnect(),t())});e.observe(document,{childList:!0,subtree:!0})})}async function Or(){await jt();let t=Date.now()+8e3;for(;!Br(document.body,hs)&&Date.now()<t;)await new Promise(e=>setTimeout(e,100))}var bs={BetterNavigator:1793462309e3,BetterQuotes:1793365944e3,ChatListStatus:1793351872e3,ChatStateFavicons:179069068e4,Cleaner:1793267811e3,CompleteToast:1793354069e3,ComposerOpacity:1793344667e3,Continue:1790939902e3,CustomSidebarIdentity:179069068e4,GreetingCustomizer:1793350808e3,InputHistory:1793365944e3,MessageTimestamps:1791080494e3,NoDictation:1793335268e3,NoShareLink:179069068e4,NoSidebarIdentity:179069068e4,PromptQueue:1793365944e3,RecentTopics:1793365944e3,ResponseNotification:1793354069e3,Settings:1793448244e3,SidebarIdentityOpacity:179069068e4,StarChats:1793365944e3,StreamerMode:1793344667e3,TemporaryChat:1792014624e3,UserQuotes:1793345744e3,WiderChat:179333264e4};var S=t=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`,Rd="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",Hd={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${Rd}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:S('<path d="M18 6 6 18M6 6l12 12"/>'),gear:S('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:S('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:S('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:S('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:S('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:S('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:S('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:S('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:S('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:S('<path d="m6 9 6 6 6-6"/>'),play:S('<path d="M7 4v16l13-8z"/>'),plus:S('<path d="M12 5v14M5 12h14"/>'),check:S('<path d="m5 12 5 5 9-10"/>'),alert:S('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:S('<path d="M4 5h16v11H9l-5 4z"/>'),layout:S('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:S('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:S('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:S('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:S('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:S('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:S('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:S('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:S('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:S('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:S('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:S('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:S('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:S('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:S('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:S('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),folder:S('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),ghost:S('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},B=t=>Oa(Hd[t]);function Rr(t){if(typeof t.showPopover=="function"){t.setAttribute("popover","manual");try{t.showPopover()}catch{t.matches(":popover-open")||t.removeAttribute("popover")}}}function xt(t,e=document.body){e.append(t),Rr(t)}var gt="data-bloom-tip",Hr=6,Dr=8,ce,ys=null;function Le(t){if(t===ys)return;if(ys=t,!t){ce?.remove();return}ce??=s("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),ce.textContent=t.getAttribute(gt),xt(ce);let e=t.getBoundingClientRect(),{width:o,height:n}=ce.getBoundingClientRect(),r=e.bottom+Hr+n<=innerHeight-Dr;ce.style.left=`${nt(e.left+e.width/2-o/2,Dr,innerWidth-o-Dr)}px`,ce.style.top=`${r?e.bottom+Hr:e.top-Hr-n}px`}var vs=t=>t instanceof Element?t.closest(`[${gt}]`):null;function As(){let t=new AbortController,e={passive:!0,signal:t.signal};return document.addEventListener("pointerover",o=>Le(vs(o.target)),e),document.addEventListener("pointerout",o=>o.relatedTarget||Le(null),e),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&Le(vs(o.target)),e),document.addEventListener("focusout",()=>Le(null),e),document.addEventListener("pointerdown",()=>Le(null),e),()=>{t.abort(),Le(null)}}function Qt(t,e,o,n=!1){let r=s("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(t),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let a=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(a)),e(a)===!1&&r.setAttribute("aria-checked",String(!a))}),r}function F(t,e,o){return s("button",{class:Xo("bloom-button",o&&`bloom-button-${o}`),text:t,attrs:{type:"button","data-bloom":"control"},on:{click:e}})}function z(t,e,o,n){let r=s("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":e,"data-bloom":"control",[gt]:e},on:{click:o}},B(t));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function bn(t,e,o,n,r,i){let a=s("input",{attrs:{type:"range",min:String(e),max:String(o),step:String(n)}});a.value=String(t);let d=s("output",{text:`${a.value}${r}`});return a.addEventListener("input",()=>{d.textContent=`${a.value}${r}`,i(Number(a.value))}),s("div",{class:"bloom-slider"},a,d)}function Nr(t,e,o){let n=s("select",{class:"bloom-select"},...e.map(r=>s("option",{text:r.label,attrs:{value:r.value}})));return n.value=t,n.addEventListener("change",()=>o(n.value)),n}function ho(t,e,o="",n="text"){let r=s("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=t,r.addEventListener("change",()=>e(r.value)),r}var yn=["showSidebarEntry","showSidebarEntryOnHover","showAccountMenuEntry"],ws=1,Ie={showSidebarEntry:!0,showSidebarEntryOnHover:!1,showAccountMenuEntry:!1},Ur=t=>Object.hasOwn(Ie,t),Fr=t=>it("Settings",t)??Ie[t],xs=(t,e)=>!Ur(t)||e!==!1||yn.some(o=>o!==t&&Fr(o));function Ss(){if(it("Settings","entryRevision")!==ws){for(let t of yn)pt("Settings",t);pt("Settings","entryRevision",ws)}}var Dd=new x("Themes"),Nd=/^https:\/\/\S+\.css(?:[?#]|$)/i,Ud=/\/\*\*[^]*?@name[ \t]+([^\n*]+)/,j=y({themes:{type:"custom",default:[]},quickCss:{type:"custom",default:""},quickCssEnabled:{type:"custom",default:!0}});async function qs(t){let e=new TextDecoder().decode(await Zo(t));if(!e.trim())throw new Error("Theme file is empty.");return e}var vn=(t,e)=>{j.store.themes=j.store.themes.map(o=>o.id===t?{...o,...e}:o)},Es=t=>{j.store.themes=j.store.themes.filter(e=>e.id!==t)};async function Ts(t){if(!Nd.test(t))throw new Error("Enter an https URL that ends in .css.");if(j.store.themes.some(n=>n.url===t))throw new Error("This theme is already added.");let e=await qs(t),o=e.match(Ud)?.[1]?.trim()||decodeURIComponent(new URL(t).pathname.split("/").pop()??t).replace(/\.css$/i,"").replaceAll(/[-_]/g," ");j.store.themes=[...j.store.themes,{id:no("theme"),name:o,url:t,css:e,enabled:!0}]}function Ms(t,e,o){if(!e.trim())throw new Error("Name is required.");if(!o.trim())throw new Error("CSS is required.");t?vn(t,{name:e.trim(),css:o}):j.store.themes=[...j.store.themes,{id:no("theme"),name:e.trim(),css:o,enabled:!0}]}async function Fd(){await Promise.all(j.store.themes.filter(t=>t.url&&t.enabled).map(async({id:t,url:e,name:o})=>{try{let n=await qs(e??"");j.store.themes.find(r=>r.id===t)?.css!==n&&vn(t,{css:n})}catch(n){Dd.warn(`Failed to refresh theme "${o}"`,n)}}))}var Cs=h({name:"Themes",description:"Applies Bloom++ themes and Quick CSS.",authors:["Bloom contributors"],tags:[],icon:"spark",required:!0,hidden:!0,startAt:"Init",settings:j,styles:()=>[...j.store.themes.filter(t=>t.enabled).map(t=>t.css),j.store.quickCssEnabled?j.store.quickCss:""].join(`
`),start(){Fd()}});var Q=I("bloom-settings-"),Kd=3e3,ks=(t,e)=>{let o=s("textarea",{class:`bloom-input ${Q("css")}`,attrs:{spellcheck:"false",placeholder:"Paste your CSS here...","aria-label":e}});return o.value=t,o},Kr=(t,e)=>s("div",{class:Q("section-header")},s("div",{class:Q("field-label"),text:t}),s("div",{class:Q("field-desc"),text:e}));function Ls(){let{quickCss:t,quickCssEnabled:e}=j.store,o=ks(t,"Quick CSS");return o.disabled=!e,o.addEventListener("input",()=>{j.store.quickCss=o.value}),s("div",{class:Q("section")},s("div",{class:Q("field","field-inline")},Kr("Quick CSS","Your own CSS, applied on every page as you type."),Qt(e,n=>{j.store.quickCssEnabled=n,o.disabled=!n},"Enable Quick CSS")),o)}function Is(){let t=s("div",{class:Q("section")}),e=null,o=()=>s("div",{class:Q("section-error"),attrs:{role:"alert"}});function n(){let l=s("input",{class:"bloom-input",attrs:{type:"url",placeholder:"https://raw.githubusercontent.com/...","aria-label":"Theme URL"}}),u=o(),m=F("Add",async()=>{m.disabled=!0,u.textContent="";try{await Ts(l.value.trim()),d()}catch(f){u.textContent=f instanceof Error?f.message:String(f),m.disabled=!1}});return s("div",{class:Q("section-block")},Kr("Online themes","Load a theme from a .css URL. It is fetched again on every page load, so updates apply."),s("div",{class:Q("section-row")},l,m),u)}function r(){let l=e==="new"?null:e,u=s("input",{class:"bloom-input",attrs:{placeholder:"My theme","aria-label":"Theme name"}});u.value=l?.name??"";let m=ks(l?.css??"","Theme CSS"),f=o();return s("div",{class:Q("section-block")},u,m,f,s("div",{class:Q("section-row")},F("Save",()=>{try{Ms(l?.id??null,u.value,m.value),e=null,d()}catch(T){f.textContent=T instanceof Error?T.message:String(T)}}),F("Cancel",()=>{e=null,d()})))}function i(){return s("div",{class:Q("section-block")},s("div",{class:Q("field","field-inline")},Kr("Local themes","CSS stored only on this device."),!e&&F("New local theme",()=>{e="new",d()})),e&&r())}function a(l){let u,m=z("trash","Remove",()=>{if(u){clearTimeout(u),Es(l.id),d();return}m.setAttribute("aria-pressed","true"),m.setAttribute(gt,"Click again to remove"),u=setTimeout(()=>{u=void 0,m.removeAttribute("aria-pressed"),m.setAttribute(gt,"Remove")},Kd)});return s("div",{class:Q("theme")},s("div",{class:Q("theme-text")},s("div",{class:`${Q("card-name")} bloom-truncate`,text:l.name}),s("div",{class:`${Q("field-desc")} bloom-truncate`,text:l.url??"Local"})),l.url?z("copy","Copy URL",()=>void Vo(l.url??"")):z("edit","Edit",()=>{e=l,d()}),m,Qt(l.enabled,f=>vn(l.id,{enabled:f}),`Enable ${l.name}`))}function d(){let{themes:l}=j.store;t.replaceChildren(n(),i(),l.length?s("div",{class:Q("themes")},...l.map(a)):s("div",{class:Q("empty"),text:"No themes yet."}))}return d(),t}var Gd=new x("SettingsPanel"),p=I("bloom-settings-"),Yd=10080*60*1e3,jd=3e3,Bs="Toggle features. Some need a reload. Click the sliders icon to configure.",Qd="Paused: can't find its place on this page.",Wd=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],zd=[{id:"plugins",label:"Plugins"},{id:"themes",label:"Themes"},{id:"css",label:"Quick CSS"}],Vd=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],Jd={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},Os=new Set(["chat","ui","privacy"]),W=null,bo="plugins",de="all",Gr="all",An="",Yr=[],Rs=()=>[...Z.values()].filter(t=>!t.hidden),Zd=t=>!!t.updatedAt&&Date.now()-t.updatedAt<Yd;function $d(t){switch(de){case"favorites":return ln.has(t.name);case"recent":return Zd(t);case"all":return!0;case"other":return!t.tags.some(e=>Os.has(e));case"chat":case"ui":case"privacy":return t.tags.includes(de)}}function Xd(t){switch(Gr){case"all":return!0;case"enabled":return kt(t);case"disabled":return!kt(t)}}function _d(t){let e=An.trim().toLowerCase();return!e||[t.name,t.description,...t.tags].some(o=>o.toLowerCase().includes(e))}function tm(t){let e=sn.list(),o=n=>e.includes(n.name)?e.indexOf(n.name):e.length;return de==="recent"?t.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):t.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var Hs=t=>t.settings?.def??{},Wr=t=>Object.values(Hs(t)).some(e=>e.type!=="custom");function em(t,e,o){let n=it(t.name,e)??qr(o),r=i=>{if(t.name==="Settings"&&!xs(e,i))return!1;pt(t.name,e,i)};switch(o.type){case"boolean":return Qt(n,r,o.description??e);case"slider":return bn(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return Nr(n,o.options,r);case"string":return ho(n,r,o.placeholder);case"number":return ho(String(n),i=>r(Number(i)),"","number");case"component":{let i=s("div",{class:p("component")});return Yr.push(o.render(i)),i}case"custom":return null}}var om=t=>t.replaceAll(/([A-Z])/g," $1").replace(/^./,e=>e.toUpperCase());function zr(t){if(!W)return;let e=Object.entries(Hs(t)).filter(([,i])=>i.type!=="custom").map(([i,a])=>{let d=em(t,i,a),l=a.type==="boolean",u=a.type!=="component"&&s("div",{class:p("field-label"),text:om(i)}),m=a.description&&s("div",{class:p("field-desc"),text:a.description});return s("div",{class:p("field",l?"field-inline":"field-stacked")},(u||m)&&s("div",{class:p("field-text")},u,m),d)}),o,n=F("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},jd);return}clearTimeout(o),t.settings?.reset(),Be(),zr(t)},"danger"),r=s("div",{class:p("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&Be()}},s("div",{class:p("popup"),attrs:{role:"dialog","aria-label":`${t.name} settings`}},s("div",{class:p("popup-header")},s("div",{class:p("card-icon")},B(t.icon)),s("div",{class:p("popup-title")},s("div",{class:p("card-name"),text:t.name}),s("div",{class:p("popup-authors"),text:t.authors.join(", ")})),z("close","Close",Be)),s("p",{class:p("popup-desc"),text:t.description}),s("div",{class:p("fields")},...e),s("div",{class:p("popup-footer")},n)));W.querySelector(`.${p("modal")}`)?.append(r)}function Be(){for(let t of Yr)t();Yr=[],W?.querySelector(`.${p("popup-backdrop")}`)?.remove()}function Ps(t){let e=kt(t),o=ln.has(t.name),n=sn.has(t.name),r=!!t.required,i=Qa(t.name);return s("div",{class:[p("card",e?"card-on":"card-off"),r?p("card-required"):""].filter(Boolean).join(" ")},s("div",{class:p("card-top")},s("div",{class:p("card-icon")},B(t.icon)),s("div",{class:p("card-actions")},z("star",o?"Unstar":"Star",()=>{ln.toggle(t.name),ue()},o),r?null:z("pin",n?"Unpin":"Pin to top",()=>{sn.toggle(t.name),ue()},n),r?s("span",{class:p("required-mark"),attrs:{"aria-label":"Required",[gt]:"This plugin is required for Bloom++ to work"}},B("alert")):null,Wr(t)&&z("gear","Settings",()=>zr(t)),Qt(e,a=>Xa(t,a),r?`${t.name} is required`:`Enable ${t.name}`,r))),s("div",{class:p("card-name")},t.name,ja(t.name)&&s("span",{class:p("new-badge"),text:"New"})),s("div",{class:p("card-desc"),text:t.description,title:t.description}),i&&s("div",{class:p("card-issue"),attrs:{[gt]:`Missing: ${i.join(", ")}`}},B("alert"),s("span",{text:Qd})),s("div",{class:p("card-footer"),text:t.authors.join(", ")}))}function Ds(){let t=Rs().some(o=>!o.tags.some(n=>Os.has(n)));W?.querySelector(`.${p("tabs")}`)?.replaceChildren(...Wd.filter(o=>o.id!=="other"||t).map(o=>s("button",{class:p("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===de)},on:{click:()=>{de=o.id,Ds(),ue()}}})))}function ue(){if(!W)return;let t=Rs().filter($d),e=W.querySelector(`.${p("search")} input`);e&&(e.placeholder=`Search ${xa(t.length,"plugin")}...`);let o=tm(t.filter(u=>_d(u)&&Xd(u))),n=de==="all",r=n?o.filter(u=>!u.required):o,i=n?o.filter(u=>u.required):[],a=[...r.map(Ps),...i.length?[s("div",{class:p("required-break"),attrs:{role:"separator"}}),...i.map(Ps)]:[]],d=An.trim()?"No plugins match your search.":Jd[de]??"No plugins available.";W.querySelector(`.${p("grid")}`)?.replaceChildren(...a.length?a:[s("div",{class:p("empty"),text:d})])}function nm(t){t.key==="Escape"&&(t.preventDefault(),t.stopPropagation(),W?.querySelector(`.${p("popup-backdrop")}`)?Be():Wt())}var Ns,jr;function Qr(){let t=W?.querySelector(`.${p("body")}`);if(!W||!t)return;for(let o of W.querySelectorAll(`.${p("nav-item")}`))o.setAttribute("aria-selected",String(o.getAttribute("data-section")===bo));if(Be(),bo==="themes"){t.replaceChildren(Is());return}if(bo==="css"){t.replaceChildren(Ls());return}let e=s("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=An,e.addEventListener("input",()=>{An=e.value,ue()}),t.replaceChildren(s("div",{class:p("tabs"),attrs:{role:"tablist"}}),s("div",{class:p("toolbar")},s("label",{class:p("search")},B("search"),e),Nr(Gr,Vd,o=>{Gr=o,ue()})),s("div",{class:p("grid")})),Ds(),ue(),e.focus()}function Pe(t,e){t&&(bo=t),W?(Qr(),Rr(W)):rm();let o=e&&Z.get(e);o&&zr(o)}function rm(){W=s("div",{class:`bloom-root ${p("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&Wt()}},s("div",{class:p("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},s("div",{class:p("header")},s("div",{class:p("logo")},B("bloom")),s("h2",{class:p("title"),text:"Bloom++"}),s("span",{class:p("hint"),attrs:{"aria-label":Bs,tabindex:"0",[gt]:Bs}},B("info")),s("div",{class:p("nav"),attrs:{role:"tablist"}},...zd.map(t=>s("button",{class:p("nav-item"),text:t.label,attrs:{type:"button",role:"tab","data-section":t.id},on:{click:()=>{bo=t.id,Qr()}}}))),s("span",{class:p("version"),text:"v2.0.112"}),z("close","Close",Wt)),s("div",{class:p("body")}))),W.addEventListener("keydown",t=>t.stopPropagation()),jr=new AbortController,document.addEventListener("keydown",nm,{capture:!0,signal:jr.signal}),xt(W),Qr(),Ns=es(ue),Gd.debug("Opened")}function Wt(){Be(),jr?.abort(),Ns?.(),W?.remove(),W=null}var Oe=()=>W?Wt():Pe(),Us=()=>!!W;var Fs=new x("AppLandmarks"),im={Settings:[c.rail],WiderChat:[":root"],StreamerMode:[c.sidebarScroll,c.rail],ComposerOpacity:[c.composer,c.composerInput],ResponseNotification:[c.composerInput],InputHistory:[c.composerInput],Continue:[c.composerInput],ChatListStatus:[c.sidebarScroll],StarChats:[c.turn],BetterNavigator:[c.timelineScroll,c.turn],BetterQuotes:[c.turn],MessageTimestamps:[c.turn],RecentTopics:[c.sidebarScroll]};function Ks(){let t=Ce();for(let[e,o]of Object.entries(im)){let n=Z.get(e);if(!n||n.required||!kt(n)){Tr(e,null);continue}let r=o.some(i=>Lt(i));if(Tr(e,r||t&&o.includes(c.turn)?null:o),!r){if(!Mr(n.name))continue;Za(n),Fs.warn(`${e} paused; missing ${o.join(", ")}`);continue}Mr(n.name)||($a(n),Fs.info(`${e} resumed`))}}function Gs(){return Ks(),C(()=>Ks())}var Gy=new x("Route"),am=/\/c\/(?!local-)([\w-]+)/;var sm=()=>location.pathname.match(am)?.[1]??null;var Yy=location.href,jy=sm();var lm=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,cm=/\S+@\S+\.\S+/,um=3;var dm=t=>!!t.closest(".sr-only");function mm(t){return[...t.querySelectorAll("*")].filter(e=>!e.children.length&&!e.closest("[data-bloom]")&&!!v(e.textContent??"")&&!(e instanceof SVGElement))}var pm=t=>{if(/rounded-full/.test(t.getAttribute("class")??""))return!0;if(!t.clientWidth)return!1;let{borderRadius:e}=getComputedStyle(t);return e.includes("%")||Number.parseFloat(e)>=t.clientWidth/2};function wn(t,e,o){for(let n of t.querySelectorAll(`[${e}]`))n!==o&&n.removeAttribute(e);o&&!o.hasAttribute(e)&&o.setAttribute(e,"")}function fm(t,e){if(v(t.textContent??"").length>um)return null;let o=t.closest("button");for(let n=t;n&&n!==e&&n!==o;n=n.parentElement)if(pm(n))return n;return null}function xn(t,e){t.hasAttribute(`data-bloom-${e}`)||t.setAttribute(`data-bloom-${e}`,"");let o=t.querySelector("img:not([data-bloom] img)"),n=mm(t),r=o?null:n.map(m=>fm(m,t)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),a=(i&&i!==t&&t.contains(i)?i:o??r)??t.querySelector("[class*=rounded-full]:not([data-bloom] *)");wn(t,`data-bloom-${e}-avatar`,a);let d=n.filter(m=>!a?.contains(m)&&!dm(m)),l=d.find(m=>lm.test(v(m.textContent??""))),u=d.find(m=>cm.test(m.textContent??""));wn(t,`data-bloom-${e}-plan`,l),wn(t,`data-bloom-${e}-email`,u),wn(t,`data-bloom-${e}-name`,d.find(m=>m!==l&&m!==u))}var Ys=()=>Yt(c.rail).filter(rt);function js(t){return Lt(c.profile,t)??[...t.querySelectorAll(c.menuButton)].findLast(rt)??null}function gm(t,e){return[...t.children].find(n=>n instanceof HTMLElement&&n!==e&&n.contains(e))??e}function Qs(){return Ys().flatMap(t=>{let e=js(t);if(!e)return[{kind:"rail",anchor:t,insert:n=>t.append(n)}];let o=gm(t,e);return[{kind:"rail",anchor:o,insert:n=>(o===e?t:o).append(n)}]})}var Vr=()=>Ys().map(js).filter(t=>t!=null);function hm(t){let e=t.getAttribute("aria-expanded")==="true"&&t.getAttribute("aria-controls"),o=e?document.getElementById(e):null;return o?.matches('[role="menu"]')?o:null}function Sn(){return Vr().map(hm).find(t=>t!=null)??Yt('[role="menu"]').find(t=>!t.closest("[data-bloom]")&&/log ?out|sign out|退出/i.test(t.textContent??""))??null}var yo=t=>Yt(c.threadRow).filter(e=>e.getAttribute("data-app-action-sidebar-thread-id")===t);function vo(t){let e=yo(t)[0]??Yt(c.threadRow).find(n=>{let r=n.getAttribute("data-app-action-sidebar-thread-id")??"";return r.endsWith(t)||t.endsWith(r.replace(/^local:/,""))});return(e?.getAttribute("data-app-action-sidebar-thread-title")??v(e?.textContent??""))||null}function Ws(t){return null}var Jr=0,qn;function bm(t){if(!Y(t))return;for(let o of Vr())xn(o,"profile");let e=Sn();e&&xn(e,"menu")}function St(){Jr++;let t=!0;return jt().then(()=>{t&&Jr&&!qn&&(qn=C(bm))}),()=>{t&&(t=!1,!--Jr&&(qn?.(),qn=void 0))}}var zs=`/*
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
`;var et=I("bloom-entry-"),vm=4,$r="--bloom-entry-x",Xr=1,Vs=4,Js=8,Am=150,lt=y({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar.",default:Ie.showSidebarEntry},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:Ie.showSidebarEntryOnHover},showAccountMenuEntry:{type:"boolean",description:"Show Bloom++ at the top of the account menu.",default:Ie.showAccountMenuEntry},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:t=>(t.append(F("Reset position",()=>{lt.store.entryPosition=Xr})),()=>t.replaceChildren())},showBloomMenu:{type:"boolean",description:"Hovering the Bloom++ row in the account menu opens a menu with Plugins, Themes, Quick CSS and plugin settings.",default:!0},menuPlugins:{type:"component",description:"Plugins listed in that menu.",render:t=>(t.append(...Xs().map(e=>s("div",{class:et("menu-pick")},B(e.icon),s("span",{class:"bloom-truncate",text:e.name}),Qt(_s(e),o=>{lt.store.menuPicks={...lt.store.menuPicks,[e.name]:o}},`List ${e.name} in the menu`)))),()=>t.replaceChildren())},entryPosition:{type:"custom",default:Xr},menuPicks:{type:"custom",default:{}}}),me=new Map,zt=null,Ao,Xs=()=>[...Z.values()].filter(t=>!t.hidden).toSorted((t,e)=>t.name.localeCompare(e.name)),_s=t=>lt.store.menuPicks[t.name]??Wr(t),Zs=!1,Zr=[];function wm(t,e,o){let n=t.currentTarget,r=e.clientWidth-n.offsetWidth;if(t.button!==0||r<=0||!e.classList.contains(et("hover")))return;let i=lt.store.entryPosition,a=i,d=!1,l=new AbortController;n.setPointerCapture(t.pointerId),n.addEventListener("pointermove",m=>{!d&&Math.abs(m.clientX-t.clientX)<vm||(d=!0,o(),a=nt(i+(m.clientX-t.clientX)/r,0,Xr),e.style.setProperty($r,String(a)))},{signal:l.signal});let u=()=>{l.abort(),d&&(lt.store.entryPosition=a,e.style.removeProperty($r))};n.addEventListener("pointerup",u,{signal:l.signal}),n.addEventListener("lostpointercapture",u,{signal:l.signal})}function xm(t){let e=!1,o=s("button",{class:et("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),e||Oe(),e=!1},pointerdown:r=>{e=!1,t!=="rail"&&wm(r,n,()=>{e=!0})}}},B("bloom"),t!=="rail"&&s("span",{class:et("label"),text:"Bloom++"})),n=s("div",{class:`bloom-root ${et("wrap")} ${et(t)}`,attrs:{"data-bloom":"entry"}},o);return n}function wo(){clearTimeout(Ao),zt?.remove(),zt=null}function tl(){clearTimeout(Ao),Ao=setTimeout(wo,Am)}var el=t=>t.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0}));function Sm(t,e){if(clearTimeout(Ao),zt?.isConnected||!lt.store.showBloomMenu)return;let o=(l,u,m)=>s("div",{class:et("flyout-item"),attrs:{role:"menuitem"},on:{pointerdown:f=>{f.button===0&&(f.preventDefault(),f.stopPropagation(),wo(),el(e),m())}}},B(u),s("span",{class:"bloom-truncate",text:l})),n=Xs().filter(_s);zt=s("div",{class:`bloom-root ${et("flyout")}`,attrs:{"data-bloom":"menu-flyout",role:"menu","aria-label":"Bloom++"},on:{pointerenter:()=>clearTimeout(Ao),pointerleave:tl}},o("Plugins","bloom",()=>Pe("plugins")),o("Themes","spark",()=>Pe("themes")),o("Quick CSS","edit",()=>Pe("css")),n.length>0&&s("div",{class:et("flyout-break"),attrs:{role:"separator"}}),...n.map(l=>o(l.name,l.icon,()=>Pe("plugins",l.name)))),xt(zt);let r=e.getBoundingClientRect(),{width:i,height:a}=zt.getBoundingClientRect(),d=r.right+Vs;zt.style.left=`${d+i>innerWidth?r.left-i-Vs:d}px`,zt.style.top=`${nt(t.getBoundingClientRect().top,Js,innerHeight-a-Js)}px`}function qm(t){let e=s("div",{class:`bloom-root ${et("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),wo(),el(t),Oe()},pointerenter:()=>Sm(e,t),pointerleave:tl}},B("bloom"),s("span",{text:"Bloom++"}),lt.store.showBloomMenu&&s("span",{class:et("menu-chevron")},B("chevron"))),o=t.querySelector('[role="menuitem"]');o?.parentElement?o.before(e):t.prepend(e)}function $s(){wo();for(let t of document.querySelectorAll('[data-bloom="entry"], [data-bloom="menu-entry"]'))t.remove();me.clear()}function Em(){for(let t of document.querySelectorAll('[data-bloom="menu-entry"]'))t.remove()}function ol(){let{showSidebarEntry:t,showSidebarEntryOnHover:e,showAccountMenuEntry:o}=lt.store,n=t||e?Qs():[],r=new Set(n.map(a=>a.anchor));for(let[a,d]of me)a.isConnected&&r.has(a)||(d.remove(),me.delete(a));for(let a of document.querySelectorAll('[data-bloom="entry"]'))[...me.values()].includes(a)||a.remove();for(let a of n){let d=me.get(a.anchor);if(d?.isConnected||!wt(a.anchor))continue;let l=d??xm(a.kind);me.set(a.anchor,l),a.insert(l)}for(let a of me.values())a.classList.toggle(et("hover"),!t);if(!o){Em();return}let i=Sn();i&&!i.querySelector('[data-bloom="menu-entry"]')&&qm(i),i||wo()}function Tm(t){yn.some(Fr)||(lt.store[Ur(t??"")?t:"showSidebarEntry"]=!0),ol()}var nl=h({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:lt,styles:()=>`${zs}[data-app-navigation-rail] [data-bloom=entry]{position:absolute;inset:auto;left:50%;bottom:100%;transform:translateX(-50%);width:max-content;margin:0;padding-block:0.25rem;pointer-events:none;z-index:5;display:flex;justify-content:center}[data-app-navigation-rail]>[data-bloom=entry]{bottom:2.75rem}[data-app-navigation-rail] [data-bloom=entry] .bloom-entry-button{pointer-events:auto}[data-app-navigation-rail] [data-bloom=entry].bloom-entry-hover:not(:hover > *){display:none;transition:display 0s 0.2s allow-discrete}.${et("hover")}{${$r}:${lt.store.entryPosition}}`,start(){Ss(),$s(),Zr=[C(ol),As(),St()],!Zs&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",Oe),Zs=!0)},stop(){for(let t of Zr)t();Zr=[],$s(),Wt()},onSettingsChange:Tm});var Mm=["data-turn","data-message-author-role"],Cm=/:(user|assistant)$/,_r=`${c.messageUnit}, ${c.oldMessage}`,Tn=t=>t==="user"||t==="assistant",sl=()=>!!document.querySelector(c.timelineScroll),ll=()=>!!vt(c.timelineScroll),ti=()=>b()??"",Mn=()=>sl()?vt(c.timelineScroll):document;function xo(){if(sl())return vt(c.timelineScroll);let t=document.querySelector(c.turn);for(let e=t?.parentElement;e;e=e.parentElement){let{overflowY:o}=getComputedStyle(e);if((o==="auto"||o==="scroll")&&e.scrollHeight>e.clientHeight)return e}return document.scrollingElement}var qt=t=>{let e=t.getAttribute("data-chatgpt-search-unit-key")?.match(Cm)?.[1];return Tn(e)?e:t.matches(c.userBubble)?"user":t.matches(c.assistantReply)||t.matches(c.assistantMarkdown)?"assistant":null},cl=t=>{let e=[...t.querySelectorAll(c.searchUnit)].filter(n=>qt(n)&&!n.parentElement?.closest(c.searchUnit));return e.length?e:[...t.querySelectorAll(`${c.userBubble}, ${c.assistantReply}`)].filter(n=>qt(n)&&!n.parentElement?.closest(`${c.userBubble}, ${c.assistantReply}`))},rl=t=>(t.getAttribute("data-chatgpt-search-message-ids")??t.getAttribute("data-message-id")??t.getAttribute("data-response-annotation-target"))?.split(/\s+/).filter(Boolean)??[];function pe(t){let e=rl(t);if(e.length)return e;let o=[...new Set([...t.querySelectorAll(_r)].flatMap(rl))];if(o.length)return o;let n=t.closest("[data-turn-key]")?.getAttribute("data-turn-key")?.replace(/^history-content:/,"");return n&&qt(t)==="user"?[n]:[]}function Re(t=Mn()){if(!t)return[];let e=cl(t);return e.length?e:[...t.querySelectorAll(_r)].filter(o=>!o.parentElement?.closest(_r))}function km(t,e){for(let o=t.length-1;o>=0;o--){let n=e.find(r=>r.id===t[o]);if(n)return n.role}return null}function Lm(t){for(let e of Mm){let o=t.getAttribute(e)??t.querySelector(`[${e}]`)?.getAttribute(e);if(Tn(o))return o}return t.querySelector(c.markdown)||t.querySelector(c.generatedImage)?"assistant":null}var Im=t=>!t.parentElement?.closest(c.turn);function Vt(){let t=Bt(b())?.chain??[];return[...Mn()?.querySelectorAll(c.turn)??[]].filter(Im).flatMap(o=>{let n=cl(o),r=n.length?n.map(i=>({el:i,known:qt(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=u=>!n.some(m=>m.contains(u))&&v(u.textContent??""),a=[...o.querySelectorAll(c.assistantMarkdown)].find(u=>i(u)&&!En.test(v(u.textContent??""))),d=[...o.querySelectorAll(c.activityHeader)].findLast(i),l=a??d;l&&r.push({el:l,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?pe(o):Re(o).flatMap(pe),a=n??Lm(o)??km(i,t)??(r%2?"assistant":"user"),d=o.closest(c.turn)??o,l=!o.closest(c.searchUnit)&&!!d.querySelector(c.turnBusy),u=a==="assistant"&&(o.matches(c.turnBusy)||!!o.querySelector(c.turnBusy)||l);return{el:o,role:a,messageIds:i,streaming:u}})}var Bm="[data-bloom], .sr-only",ul=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,En=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,il=new WeakMap;function He(t){let o=(t.el.closest(c.turn)??t.el).textContent?.length??0,n=il.get(t.el);if(n?.length===o)return n.summary;let r=Pm(t);return il.set(t.el,{length:o,summary:r}),r}function al(t){let e=new Set,o=[];for(let n of t.querySelectorAll(c.assistantMarkdown)){if(n.closest(c.searchUnit))continue;let r=v(n.textContent??"");!r||En.test(r)||ul.test(r)||e.has(r)||(e.add(r),o.push(r))}return o}function Pm(t){let e=t.el.querySelectorAll(c.generatedImage).length;if(t.role==="assistant"&&e)return e>1?`Image \xD7${e}`:"Image";let o=t.el.closest(c.turn);if(t.role==="assistant"&&o&&t.el.matches(c.assistantMarkdown)&&!t.el.closest(c.searchUnit)){let l=al(o);if(l.length)return l.join(" \xB7 ")}let n=t.el.querySelector(t.role==="assistant"?`${c.markdown}, ${c.assistantMarkdown}`:".whitespace-pre-wrap")??t.el,i=[...n.querySelectorAll(Bm)].map(l=>v(l.textContent??"")).filter(Boolean).reduce((l,u)=>l.replace(u,`
`),n.innerText||n.textContent||""),a=i.split(`
`).map(v).filter(l=>l&&!ul.test(l)&&!En.test(l));if(a.length)return a.join(" ");if(t.role==="assistant"&&o){let l=al(o);if(l.length)return l.join(" \xB7 ")}let d=i.split(`
`).map(v).filter(l=>En.test(l));return d.length?d.at(-1)??"":t.role==="user"&&t.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function Cn(t){return t.text?v(t.text):t.imageCount?t.imageCount>1?`Image \xD7${t.imageCount}`:"Image":t.hasFiles?"File":""}var ei=t=>t.matches(c.timelineScroll)&&getComputedStyle(t).flexDirection==="column-reverse";var li=new x("AppNetwork"),Et=Me(),kn=new Map,dl=new Map,De=new Map,ml=new Map,ri=new Map,fe=new Map,pl=new Map,Al=new Set,So=new Set,Om=800,ci=6e3,Rm=200,Hm=3,Dm=/\d{1,2}:\d{2}/,fl=new WeakMap,gl;var Nm=t=>t==="user"||t==="assistant";function qo(t){let e=t.replace(/^local:/,"");return[...new Set([t,e,`local:${e}`])]}function wl(t){let e=qo(t);for(let n of e){let r=kn.get(n);if(r)return r}let o={id:e[0]??t,title:null,chain:[],times:new Map};for(let n of e)kn.set(n,o);return o}function Ln(t){return qo(t)[0]??t}function In(t){if(!t)return!1;let e=Ln(t);if(!Al.has(e))return!1;let o=fe.get(e);if(o==null||Date.now()-o<ci)return!1;if(So.has(e))return!0;let n=De.get(e);return n==null||Date.now()-n<Om?!1:(So.add(e),!0)}function Um(){gl||(gl=on(()=>{let t=b();if(!t)return;let e=Ln(t);So.has(e)&&Date.now()-(fe.get(e)??0)>=ci||ql(t)},Rm))}function Fm(t){let e=pl.get(t);return e||(e=new Set,pl.set(t,e)),e}function Km(t,e){let o=Ln(t.id);Al.add(o),fe.has(o)||fe.set(o,Date.now());let{length:n}=t.chain;n>(ml.get(o)??0)&&(ml.set(o,n),De.set(o,Date.now()),So.delete(o)),e>(ri.get(o)??0)&&(ri.set(o,e),So.has(o)||De.set(o,Date.now())),De.has(o)||De.set(o,Date.now())}function Bt(t){if(!t)return null;Um(),ql(t);let e=qo(t);return e.map(o=>kn.get(o)).find(o=>o&&(o.chain.length||o.title))??kn.get(e[0]??t)??null}function ii(t,e,o,n=null){return{id:t,role:e,createTime:n,text:v(o),hasFiles:!1,imageCount:0}}function ai(t,e){let o=t.chain.find(r=>r.id===e.id);if(o){e.text&&(o.text=e.text),e.createTime!=null&&(o.createTime=e.createTime);return}if(t.chain.find(r=>r.role===e.role&&r.text&&r.text===e.text)){!t.times.has(e.id)&&e.createTime!=null&&t.times.set(e.id,e.createTime);return}t.chain.push(e)}function xl(t){let e=t.chain.map(o=>`${o.id}	${o.role}	${o.text}`).join(`
`);dl.get(t.id)!==e&&(dl.set(t.id,e),Et.emit("conversation",t))}function hl(t){if(typeof t=="function")try{return v(String(t()??""))}catch(e){return li.warn("Turn label failed",e),""}return typeof t=="string"?v(t):""}function bl(t){if(typeof t!="function")return"";try{let e=t();return typeof e=="string"?v(e):k(e)&&typeof e.response=="string"?v(e.response):""}catch(e){return li.warn("Turn preview failed",e),""}}function Sl(t){let e=Object.keys(t).find(o=>o.startsWith("__reactFiber$")||o.startsWith("__reactInternalInstance$"));return e?t[e]??null:null}function yl(t){if(!t)return null;let e=fl.get(t);if(e)return e;for(let o of t.querySelectorAll("span"))if(!(o.childElementCount||!Dm.test(o.textContent??"")))for(let n=Sl(o),r=0;n&&r<Hm;n=n.return,r++){let i=k(n.memoizedProps)?n.memoizedProps.sentAtMs:null;if(typeof i=="number")return fl.set(t,i),i}return null}function Gm(t,e){for(let o of e.querySelectorAll(c.turn)){let n=o.getAttribute("data-turn-key")?.replace(/^.*turn:/,"");if(!n)continue;let r=yl(o.querySelector(c.userBubble)),i=yl([...o.querySelectorAll(c.assistantSentTime)].at(-1));r&&t.times.set(`turn:${n}`,r),i&&t.times.set(`${n}:assistant`,i);for(let a of o.querySelectorAll(c.searchUnit)){let d=qt(a)==="user"?r:i;if(d)for(let l of pe(a))t.times.set(l,d)}if(i)for(let a of o.querySelectorAll(c.assistantReply))t.times.set(a.getAttribute("data-response-annotation-target"),i)}}function si(t,e,o,n){if(!t||e>24)return;let r=(k(t.memoizedProps)?t.memoizedProps:null)??(k(t.pendingProps)?t.pendingProps:null);if(r){if(Array.isArray(r.items)&&k(r.items[0])&&typeof r.items[0].turnKey=="string"){let i=r.items.filter(k);i.length>o.length&&(o.length=0,o.push(...i))}if(Array.isArray(r.entries)&&k(r.entries[0])&&typeof(r.entries[0].historyEntityKey??r.entries[0].turnId)=="string"){let i=r.entries.filter(k);i.length>n.length&&(n.length=0,n.push(...i))}}si(t.child??null,e+1,o,n),si(t.sibling??null,e,o,n)}function Ym(t,e){let o=typeof e.turnId=="string"?e.turnId:"",n=typeof e.turnKey=="string"?e.turnKey:"";return t.find(r=>{let i=typeof r.turnKey=="string"?r.turnKey:"";return!!i&&(o===i||n.endsWith(i)||n.includes(i))})??null}function vl(t,e){return qo(t).some(o=>qo(e).includes(o))}function ui(t){let e=t.replace(/^history-content:/,"").replace(/^turn:/,"").replace(/:assistant$/,"");return e?[...new Set([t,e,`turn:${e}`,`${e}:assistant`,`local:${e}`])]:[]}function jm(t){let e=new Set;for(let o of t.querySelectorAll("[data-turn-key], [data-response-annotation-target], [data-chatgpt-search-message-ids]"))for(let n of[o.getAttribute("data-turn-key"),o.getAttribute("data-response-annotation-target"),...(o.getAttribute("data-chatgpt-search-message-ids")??"").split(/\s+/)])if(n)for(let r of ui(n))e.add(r);return e}function Qm(t){let e=new Set;for(let o of t.chain)for(let n of ui(o.id))e.add(n);return e}function Wm(t){return t.getAttribute("data-response-annotation-conversation")??t.querySelector("[data-response-annotation-conversation]")?.getAttribute("data-response-annotation-conversation")??null}function zm(){return[...document.querySelectorAll(`${c.conversationTarget}, ${c.timelineScroll}`)].filter(rt)}var oi=(t,e)=>e.length>t.length?e:t;function ql(t){let e=zm();if(!e.length)return;let o,n=[],r=[];for(let E of e){let L=Wm(E);if(L&&!vl(t,L))continue;let O=[],$=[];try{si(Sl(E),0,O,$)}catch(qe){li.warn("Fiber walk failed",qe);continue}let U=oi(O,$),dt=typeof U[0]?.conversationId=="string"?U[0].conversationId:"";if(dt&&!vl(t,dt))continue;let hr=oi(n,r);U.length>hr.length&&(o=E,n=O,r=$)}if(!o)return;let i=oi(n,r);if(!i.length)return;let a=typeof i[0]?.conversationId=="string"?i[0].conversationId:"",d=wl(t);d.title=vo(t)??vo(a||t)??d.title,Gm(d,o);let l=Ln(t);fe.has(l)||fe.set(l,Date.now());let u=i.filter(E=>hl(E.getLabel)||bl(E.getPreview)).length,m=In(t);!m&&u>(ri.get(l)??0)&&De.delete(l);let f=jm(o),T=Qm(d),g=Fm(l),q=Date.now()-(fe.get(l)??0)<ci;for(let E of i){let L="";typeof E.turnId=="string"?L=E.turnId:typeof E.turnKey=="string"&&(L=E.turnKey.replace(/^.*turn:/,""));let O=typeof E.historyEntityKey=="string"?E.historyEntityKey:L?`turn:${L}`:"",$=Ym(n,E),U=hl($?.getLabel??E.getLabel),dt=bl($?.getPreview??E.getPreview);L&&!U&&!dt&&g.add(L);let hr=[O,L].some(Gu=>ui(Gu).some(wa=>T.has(wa)||f.has(wa)));if(m&&!hr&&!(q&&L&&g.has(L)))continue;let qe=typeof E.timestampSeparatorAtMs=="number"?E.timestampSeparatorAtMs:null;O&&U&&(ai(d,ii(O,"user",U,qe)),qe&&d.times.set(O,qe)),L&&dt&&ai(d,ii(`${L}:assistant`,"assistant",dt,qe)),L&&(U||dt)&&g.delete(L)}Km(d,u),xl(d)}function Vm(t){if(Nm(t.role))return t.role;let e=typeof t.type=="string"?t.type:typeof t.itemType=="string"?t.itemType:"";return/user/i.test(e)?"user":/agent|assistant/i.test(e)?"assistant":null}function Jm(t){return typeof t.text=="string"?t.text:typeof t.content=="string"?t.content:k(t.content)&&typeof t.content.text=="string"?t.content.text:""}function ni(t,e){if(!t||!k(e))return;let o=typeof e.id=="string"?e.id:typeof e.itemId=="string"?e.itemId:"",n=Vm(e),r=Jm(e);if(!o||!n)return;let i=wl(t);ai(i,ii(o,n,r)),xl(i)}function Zm(t){let e=t.params?.thread,o=t.params?.threadId??(k(e)&&typeof e.id=="string"?e.id:void 0);t.params?.item&&ni(o,t.params.item);for(let n of t.params?.items??[])ni(o,n);if(k(e)&&Array.isArray(e.items))for(let n of e.items)ni(o,n)}po.on("note",Zm);var $m=80,Xm=420;function di(t,e,o){return(t.x-o.x)*(e.y-o.y)-(e.x-o.x)*(t.y-o.y)}function _m(t,e,o,n){let r=di(t,e,o),i=di(t,o,n),a=di(t,n,e);return!((r<0||i<0||a<0)&&(r>0||i>0||a>0))}function tp(t,e){let o=(e.left+e.right)/2-(t.left+t.right)/2,n=(e.top+e.bottom)/2-(t.top+t.bottom)/2;if(Math.abs(o)>=Math.abs(n)){let i=o<0?e.right:e.left;return[{x:i,y:e.top},{x:i,y:e.bottom}]}let r=n<0?e.bottom:e.top;return[{x:e.left,y:r},{x:e.right,y:r}]}function El(t,e){let o=nt(t.x,e.left,e.right),n=nt(t.y,e.top,e.bottom);return Math.hypot(t.x-o,t.y-n)}function Bn(t){let e=t.closeDelay??$m,o=t.towardDelay??Xm,n=0,r=!1,i=null,a=null,d=()=>{document.removeEventListener("pointermove",g,!0)},l=()=>{n&&window.clearTimeout(n),n=0,d(),i=null,a=null},u=()=>{l(),r&&(r=!1,t.setHeld(!1))},m=()=>{r||(r=!0,t.setHeld(!0))},f=q=>{n&&window.clearTimeout(n),n=window.setTimeout(u,q)},T=q=>{let E=t.panel(),L=t.trigger();if(!E||!i)return!1;let O=E.getBoundingClientRect();if(O.width<=0&&O.height<=0)return!1;let $=L?.getBoundingClientRect(),[U,dt]=$&&($.width||$.height)?tp($,O):[{x:O.left,y:O.top},{x:O.right,y:O.bottom}];return _m(q,i,U,dt)?!0:a!=null&&El(q,O)<El(a,O)-.25},g=q=>{let E={x:q.clientX,y:q.clientY};if(t.over(q.target)){l();return}T(E)?f(o):u(),a=E};return{enter(){l()},leave(q){if(t.over(q.relatedTarget)){l();return}i={x:q.clientX,y:q.clientY},a=i,m(),document.addEventListener("pointermove",g,!0),f(e)},dispose(){l(),r=!1}}}var Tl=`/*
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
`;var M=I("bloom-nav-"),Rn=80,op=1200,np=2,Ml=3e4,rp=200,ip=.9,ap=.28,sp=24,Ne=8,lp=80,cp=12,mi=80,Pl=`${c.rightPanel}, ${c.summaryPanel}`,up={user:"\u2753",assistant:"\u{1F916}"},dp=["wheel","touchmove","pointerdown"],Un=y({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),A=null,N=[],ct=-1,ge=-1,Ue=null,he="",fi=0,gi=[],Co=null,Pn=null,On=new Set,Pt,Eo,Ot,To="",ht=[],ko=null,Hn=new Set,Dn=new Map,Jt=!1,mp=t=>Un.store.showAssistant||t.role==="user",pp=t=>t.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||t.messageIds[0]||t.role;function fp(t){return{role:t.role,summary:He(t),ids:t.messageIds,turn:t,streaming:t.streaming}}function Ol(t,e){let o=t.entries.at(-1);if(o?.role==="assistant"&&e.role==="assistant"){t.entries[t.entries.length-1]={...e,ids:[...new Set([...o.ids,...e.ids])]};return}t.entries.push(e)}function gp(){let t=[];for(let e of Vt()){let o=fp(e),n=pp(e),r=t.at(-1),i=!e.el.closest("[data-turn-key]");r&&(r.key===n||i&&o.role==="assistant")?Ol(r,o):t.push({key:n,entries:[o]})}return t}function hp(){let t=[];for(let e of Bt(ti()||b())?.chain??[]){let o={role:e.role,summary:Cn(e),ids:[e.id],turn:null,streaming:!1},n=t.at(-1);e.role==="assistant"&&n?Ol(n,o):t.push({key:e.id,entries:[o]})}return t}var Fe=t=>t.entries.flatMap(e=>e.ids);function Nn(t,e){let o=new Set(Fe(t));return Fe(e).some(n=>o.has(n))}var be=t=>v(t.entries.find(e=>e.role==="user")?.summary??""),pi=(t,e)=>t.filter(o=>be(o)===e).length,hi=t=>({...t,turn:null,streaming:!1});function bp(t,e){let o=new Set(e.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return t.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return hi(r);let a=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return a&&a!==n.key?hi(r):r})}))}function yp(t,e){let o=e.entries.map((n,r)=>{let i=t.entries[r];if(!i)return n;let a=[...new Set([...n.ids,...i.ids])];return{...n,ids:a,summary:n.summary||i.summary}});for(let n of t.entries.slice(o.length))o.push(hi(n));return{key:t.key,entries:o}}function Rl(){let t=xo();if(!t)return!1;let e=t.clientHeight-t.scrollHeight;return t.scrollTop-e<=Math.abs(t.scrollTop)}function vp(t,e){let o=bp(t,e).filter(l=>e.some(u=>u.key===l.key)||!e.some(u=>Nn(u,l)));if(!e.length)return o;if(!o.length)return e;let n=e.findIndex(l=>o.some(u=>u.key===l.key));if(n<0)return Rl()?e.concat(o):o.concat(e);let r=e[n]?.key,i=o.findIndex(l=>l.key===r),a=o.slice(0,i).concat(e.slice(0,n),o.slice(i)),d=a.findIndex(l=>l.key===r);for(let l=n;l<e.length;l++){let u=e[l];if(!u)continue;let m=a.findIndex(f=>f.key===u.key);if(m>=0){let f=a[m];f&&(a[m]=yp(f,u)),d=m}else a.splice(d+1,0,u),d++}return a}function Ap(t,e){let o=0,n=0,r=0;for(let i=1-t.length;i<e.length;i++){let a=0,d=0;for(let u=0;u<t.length;u++){let m=e[u+i],f=t[u];!m||!f||(Nn(f,m)?(a+=3,d++):be(f)&&be(f)===be(m)&&a++)}let l=Rl()?i<r:i>r;(a>o||a===o&&d>n||a===o&&d===n&&l)&&(o=a,n=d,r=i)}return{score:o,offset:r}}function wp(t,e){let o=t.entries.map((n,r)=>{let i=e.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of e.entries.slice(o.length))o.push({...n,turn:null});return{key:t.key,entries:o}}function vi(t){return t.map(e=>({key:e.key,entries:e.entries.map(o=>({...o}))}))}function xp(t,e,o=!0){if(!e.length)return t;if(!t.length)return e;let{score:n,offset:r}=Ap(t,e),i=vi(t);if(n>0)for(let l=0;l<i.length;l++){let u=e[l+r],m=i[l];if(!u||!m)continue;let f=be(m),T=!!f&&f===be(u)&&pi(t,f)===1&&pi(e,f)===1;(Nn(m,u)||T)&&(i[l]=wp(m,u))}let a=[],d=[];for(let l=0;l<e.length;l++){let u=e[l];if(!u)continue;let m=be(u);!m||pi(i,m)>0||i.some(f=>Nn(f,u))||o&&(n>0&&l<r?a.push(u):d.push(u))}return a.concat(i,d)}var bi=t=>t.entries.some(e=>e.turn?.el.isConnected);function Sp(t,e,o){let n=t.findIndex(i=>Fe(i).includes(e));if(n>=0)return n+1;let r=t.find(bi);return o&&r&&Fe(r).includes(o)?0:t.length}function qp(t){if(ko){let{parent:e,user:o}=ko;for(let n of t.slice(Sp(t,e,o))){let r=Fe(n);if(!bi(n)&&!(o&&r.includes(o)))for(let i of r)Hn.add(i)}}return t.filter(e=>bi(e)||!Fe(e).some(o=>Hn.has(o)))}function Hl(){ht=[],ko=null,Hn.clear()}function Cl(t){return t.reduce((e,o)=>e+o.entries.length,0)}function kl(t,e){if(!t||!e.length)return;let o=Dn.get(t);(!o||Cl(e)>=Cl(o))&&Dn.set(t,vi(e))}function Ep(){let t=ti();if(t!==To){To&&ht.length&&kl(To,ht),To=t;let n=t?Dn.get(t):void 0;n?.length?(ht=vi(n),ko=null,Hn.clear(),Jt=!0):(Hl(),Jt=!1)}let e=gp(),o=hp();return!e.length&&!o.length&&!ll()?(ht=[],[]):(Jt&&t&&!In(t)&&(Jt=!1),ht=qp(xp(vp(ht,e),o,!Jt)),t&&ht.length&&kl(t,ht),!Jt&&t&&ht.length&&In(t)&&(Jt=!0),ht.flatMap(n=>n.entries).filter(mp).filter(n=>n.ids.length||n.summary||n.streaming))}function Tp(t){for(let o of t)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!tt().generating||t.some(o=>o.streaming))return;let e=t.at(-1);e&&(e.role==="assistant"||!Un.store.showAssistant?e.streaming=!0:t.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function Dl(){let t=Ep();return Tp(t),t}function Nl(t){let e=t.getBoundingClientRect(),o=st()?.getBoundingClientRect().top,n=Math.min(e.bottom,o&&o>e.top?o:e.bottom);return{top:e.top,bottom:n}}function Ul(t){return((t.matches(".whitespace-pre-wrap, .markdown, .prose, [data-markdown-text-style]")?t:t.querySelector(".whitespace-pre-wrap")??t.querySelector(".markdown, .prose, [data-markdown-text-style]"))??t).getBoundingClientRect().top}function Ll(t){let e=N[t]?.turn?.el;return e?.isConnected?e:null}function Mp(t){if(!N.length)return null;let e=t.scrollHeight-t.clientHeight,o=ei(t),n=Math.min(t.scrollTop,0),r=o?-n:e-t.scrollTop,i=o?e+n:t.scrollTop,a=e<=Ne||r<=Ne,d=e>Ne&&i<=Ne,{top:l,bottom:u}=Nl(t),m=Ll(0),f=m?Ul(m):Number.NaN,T=!!m&&f>=l-Ne&&f<=l+48,g=Ll(N.length-1),q=g?.getBoundingClientRect().bottom??Number.NaN,E=!!g&&q<=u+Ne&&q>=u-lp;return a||E?"bottom":d||T?"top":null}function Cp(t){let{top:e,bottom:o}=Nl(t),n=e+Math.max(o-e,0)*ap,r=[],i=-1;if(N.forEach((d,l)=>{let u=d.turn?.el;if(!u?.isConnected){r.push(Number.NaN);return}let m=Ul(u);r.push(m),i<0&&(i=l),m<=n&&(i=l)}),i<0)return Math.max(N.findIndex(d=>d.turn),0);let a=r[ct];return Number.isFinite(a)?i===ct?ct:i>ct?i:a<=n+sp?ct:i:i}function kp(t){let e=Mp(t);return e==="bottom"?N.length-1:e==="top"?0:Cp(t)}function Il(t){Un.store.jumpEffect==="border"&&(t.classList.add(M("flash")),setTimeout(()=>t.classList.remove(M("flash")),op))}function Fn(t){let e=N[t],o=xo();if(!e||!o)return;if(!e.turn&&!e.ids.length){ge=t,Mo(),o.scrollTo({top:ei(o)?0:o.scrollHeight});return}ge=t,Ue=t?null:{chat:b(),first:e.ids[0],until:Date.now()+Ml},Mo();let n=e.turn?.el;if(n?.isConnected){let u=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:u<o.clientHeight*np?"smooth":"auto"}),Il(n);return}let r=N.findIndex(u=>u.turn),i=r>=0&&t<r?-1:1,a=++fi,d=Date.now()+Ml,l=()=>{let u=xo();if(a!==fi||Date.now()>d||!u)return;N=Dl();let m=N.find(T=>T.ids.some(g=>e.ids.includes(g)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),Il(m),ge=N.findIndex(T=>T.turn?.el===m),Mo();return}let f=u.scrollTop;u.scrollBy({top:i*u.clientHeight*ip,behavior:"instant"}),u.scrollTop===f?setTimeout(l,rp):requestAnimationFrame(l)};l()}function Lp(t,e){return s("button",{class:M("row"),attrs:{type:"button","data-index":String(e),"data-message-id":t.ids[0]??""},on:{click:()=>Fn(e)}},s("span",{text:up[t.role]}),s("span",{class:"bloom-truncate",text:yt(t.summary||"\u2026",Rn)}))}function Ip(t,e){let o=t.offsetWidth?e.width/t.offsetWidth:1;return e.left+(t.clientLeft+t.clientWidth)*o}function Bp(t){let e=1/0;for(let o of document.querySelectorAll(Pl)){if(!rt(o))continue;let n=o.getBoundingClientRect();n.width<mi||n.height<mi||n.left<t.left+mi||n.left<e&&(e=n.left)}return Number.isFinite(e)?e:null}function Bl(t){if(!A)return;let e=t.getBoundingClientRect(),o=st()?.getBoundingClientRect().top,r=Math.min(e.bottom,o&&o>e.top?o:e.bottom)-e.top,i=Math.min(Ip(t,e),Bp(e)??1/0);A.style.right=`${document.documentElement.clientWidth-i+cp}px`,A.style.top=`${e.top}px`,A.style.height=r>1?`${r}px`:""}function Pp(){let t=xo();if(N=Dl(),!N.length||!t){Ot?.dispose(),Ot=void 0,A?.remove(),A=null,he="";return}if(Co!==t){Eo?.abort(),Eo=new AbortController,t.addEventListener("scroll",Ft(Mo),{passive:!0,signal:Eo.signal});for(let n of dp)t.addEventListener(n,Kl,{passive:!0,signal:Eo.signal});Co=t,Pt?.disconnect(),Pt=new ResizeObserver(()=>{t.isConnected&&Bl(t)}),Pt.observe(t),Pn=null,On=new Set}let e=st();if(e&&e!==Pn&&Pt&&(Pt.observe(e),Pn=e),Pt)for(let n of document.querySelectorAll(Pl))On.has(n)||(Pt.observe(n),On.add(n));Dp(),Bl(t);let o=JSON.stringify(N.map(n=>[n.role,n.ids]));o!==he?(he=o,ge=-1,Rp(),Ue&&Date.now()<Ue.until&&Ue.chat===b()&&N[0]?.ids[0]!==Ue.first&&Fn(0)):Op(),Mo()}function Mo(){if(!A||!Co)return;ct=ge>=0?ge:kp(Co),A.querySelectorAll(`.${M("tick")}`).forEach((e,o)=>e.classList.toggle(M("tick-current"),o===ct)),A.querySelectorAll(`.${M("row")}`).forEach(e=>e.setAttribute("aria-current",String(Number(e.dataset.index)===ct)));let t=A.querySelector(`.${M("toc-head")}`);t&&(t.textContent=`${ct+1} / ${N.length}`)}function Op(){A?.querySelectorAll(`.${M("tick")}`).forEach((t,e)=>{let o=N[e],n=yt(o.summary,Rn);t.title!==n&&(t.title=n),t.classList.toggle(M("tick-streaming"),o.streaming)}),A?.querySelectorAll(`.${M("row")}`).forEach(t=>{let e=t.lastElementChild,o=yt(N[Number(t.dataset.index)].summary||"\u2026",Rn);e&&e.textContent!==o&&(e.textContent=o)})}function Rp(){A?.querySelector(`.${M("rail")}`)?.replaceChildren(...N.map((e,o)=>s("button",{class:Xo(M("tick"),M(`tick-${e.role}`),e.streaming&&M("tick-streaming"),o===ct&&M("tick-current")),title:yt(e.summary,Rn),attrs:{type:"button","aria-label":`Jump to message ${o+1}`,"data-message-id":e.ids[0]??""},on:{click:()=>Fn(o)}}))),A?.querySelector(`.${M("toc-list")}`)?.replaceChildren(...N.map(Lp))}var Tt=Ft(Pp);function yi(t){if(t===A)return;let e=t.__bloomNavStop;if(e&&e!==Ai)try{e()}catch{}t.isConnected&&t!==A&&t.remove()}function Fl(){let t=[...document.querySelectorAll('[data-bloom="navigator"]')];if(A&&!A.isConnected&&(A=null),A&&t.includes(A)){for(let e of t)yi(e);return}A=t[0]??null;for(let e of t.slice(1))yi(e)}function Hp(){Ot?.dispose(),Ot=Bn({over:t=>t instanceof Node&&!!A?.contains(t),trigger:()=>A?.querySelector(`.${M("rail")}`),panel:()=>A?.querySelector(`.${M("toc")}`),setHeld:t=>A?.classList.toggle(M("open"),t)})}function Dp(){Fl(),A&&!A.querySelector(`.${M("rail")}`)&&(A.remove(),A=null,he=""),A||(A=s("div",{class:`bloom-root ${M("root")}`,attrs:{"data-bloom":"navigator"},on:{pointerenter:()=>Ot?.enter(),pointerleave:t=>Ot?.leave(t)}},s("div",{class:M("rail")}),s("div",{class:M("bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:M("toc")},s("div",{class:M("toc-head")}),s("div",{class:M("toc-list")}))),he=""),Ot||Hp(),A.isConnected||document.body.append(A),A.querySelector(`.${M("tick")}`)||(he=""),A.__bloomNavStop=Ai}function Kl(){ge=-1,Ue=null,fi++}function Ai(){for(let t of gi)t();gi=[],Eo?.abort(),Pt?.disconnect(),Pt=void 0,Co=null,Pn=null,On=new Set,removeEventListener("keydown",Gl,!0),removeEventListener("resize",Tt),Ot?.dispose(),Ot=void 0,A&&delete A.__bloomNavStop,A?.remove(),A=null,he="",Hl(),Dn.clear(),To="",Jt=!1;for(let t of document.querySelectorAll('[data-bloom="navigator"]'))yi(t)}var Np=t=>!!t&&(t.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!t.closest("[contenteditable='true']"));function Gl(t){if(!A||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey||Np(document.activeElement)||vt("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:ct-1,ArrowDown:ct+1,Home:0,End:N.length-1}[t.key];if(o==null){Kl();return}o<0||o>=N.length||(t.preventDefault(),t.stopPropagation(),Fn(o))}var Yl=h({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:Un,styles:Tl,start(){Fl(),gi=[C(t=>Y(t)&&Tt()),At(Tt),Et.on("conversation",Tt),Et.on("generate-start",({parentId:t,userId:e})=>{t&&(ko={parent:t,user:e},Tt())}),D.on("rise",Tt),D.on("fall",Tt)],addEventListener("keydown",Gl,!0),addEventListener("resize",Tt,{passive:!0}),Tt()},stop:Ai,onSettingsChange:Tt});var jl=`/*
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
`;var _=I("bloom-quotes-"),ki="BloomBetterQuotes",Fp=40,Vl=8,Kp=1800,qi=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,Ql=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,ye=y({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),wi,xi,Ke,Si=!1,Ei=0,Kn=null,Gn=null,Rt=null;function Li(){return b()??"draft"}function jn(){try{let t=JSON.parse(sessionStorage.getItem(ki)??"[]");return Array.isArray(t)?t.filter(e=>!!e&&typeof e=="object"&&typeof e.id=="string"&&typeof e.text=="string"&&!!e.text):[]}catch{return[]}}function Ii(t){try{sessionStorage.setItem(ki,JSON.stringify(t.slice(-Fp)))}catch{}}function Lo(t){return jn().find(e=>e.id===t)?.text??""}function Gp(t,e){let o=jn().filter(n=>n.id!==t);o.push({id:t,text:e}),Ii(o)}function Ti(t=Li()){Ii(jn().filter(e=>e.id!==t)),Yn()}function Yp(t){let e=Lo("draft");if(!e||Lo(t))return;let o=jn().filter(n=>n.id!=="draft");o.push({id:t,text:e}),Ii(o)}function Mi(t){return`${t.getAttribute("aria-label")??""} ${t.getAttribute("title")??""}`}function jp(t){let e=Mi(t);return Ql.test(e)&&!/quote|引用/.test(e)?!1:/quote|引用/.test(e)&&qi.test(e)?!0:qi.test(e)&&!Ql.test(e)}function Jl(t){let e=t.cloneNode(!0),o=[...e.querySelectorAll("button, [role='button']")],n=new Set(o.map(r=>r.getAttribute("aria-label")).filter(Boolean));for(let r of o)r.remove();for(let r of e.querySelectorAll("*"))!r.children.length&&n.has(v(r.textContent??""))&&r.remove();return v(e.textContent??"")}function Qp(t){let e=st(),o=t.parentElement,n=0;for(;o&&o!==e&&n<5;){if(n++,o.matches(c.composerInput)||o.querySelector(c.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=Jl(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function Qn(){let t=st();if(!t)return null;for(let e of t.querySelectorAll("button, [role='button']")){if(e.closest("[data-bloom]")||!jp(e))continue;let o=Qp(e),n=o?Jl(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:e}}return null}function Wp(t){let e=t.closest(c.searchUnit)??t.closest(c.oldMessage);return e&&(qt(e)??e.getAttribute("data-message-author-role"))==="user"?e:null}function Bi(t){return v(t).slice(0,48)}function zp(t,e){let o=Bi(t);if(o.length<Vl)return null;let n=null;for(let r of Re()){if(e&&(r===e||e.contains(r)||r.contains(e)))continue;let i=v(r.textContent??"");if(!i.includes(o))continue;let a=o.length/Math.max(i.length,1);(!n||a>n.score)&&(n={el:r,score:a})}return n?.el??null}function Vp(t,e){let o=Bi(e),n=t;for(let r of t.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&v(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${_("hit")}`)?.classList.remove(_("hit")),n.classList.add(_("hit")),window.clearTimeout(Ei),Ei=window.setTimeout(()=>n.classList.remove(_("hit")),Kp)}function Wl(t){let e=t.closest(c.timelineScroll)??document.scrollingElement;if(!(e instanceof HTMLElement)&&e!==document.scrollingElement)return;let o=t.getBoundingClientRect();if(o.height<1||!e)return;let n=e.getBoundingClientRect(),r=st()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,a=o.top+o.height/2-(n.top+i)/2;Math.abs(a)<8||e.scrollTo({top:e.scrollTop+a,behavior:"smooth"})}function Pi(){if(!Rt||!Kn?.isConnected)return;let t=Kn.getBoundingClientRect();t.width<1||(Rt.style.top=`${Math.max(8,t.top+8)}px`,Rt.style.left=`${Math.max(8,t.right-Rt.offsetWidth-8)}px`)}function Jp(t,e,o){Kn=t,Gn=e,Rt??=s("button",{class:`bloom-root ${_("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),Rt.isConnected||document.body.append(Rt),Vp(t,o),Pi()}function zl(){Rt?.remove(),Rt=null,Kn=null,Gn=null,document.querySelector(`.${_("hit")}`)?.classList.remove(_("hit"))}function Zl(){return document.querySelector('[data-bloom="quote-chip"]')}function Yn(){Zl()?.remove()}function Zp(t){let o=st()?.getBoundingClientRect();!o||o.width<8||(t.style.width=`${Math.max(120,o.width-24)}px`,t.style.left=`${o.left+12}px`,t.style.top=`${Math.max(8,o.top-t.offsetHeight-8)}px`)}function $p(t){let e=Zl();e||(e=s("div",{class:`bloom-root ${_("chip")}`,attrs:{"data-bloom":"quote-chip"}},s("span",{class:_("text")}),s("button",{class:_("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(e));let o=e.querySelector(`.${_("text")}`),n=v(t);o&&o.textContent!==n&&(o.textContent=n),e.dataset.text=t,Zp(e)}function Ci(){if(!Si){Si=!0;try{let t=Li(),e=Qn();ye.store.persistAcrossChats&&e&&Lo(t)!==e.text&&Gp(t,e.text);let o=ye.store.persistAcrossChats?Lo(t):"";!o||e&&v(e.text)===v(o)?Yn():$p(o),Pi()}finally{Si=!1}}}function Xp(t){let e=t.closest('[data-bloom="quote-chip"]');if(e instanceof HTMLElement&&!t.closest(`.${_("x")}`)){let i=e.dataset.text??e.querySelector(`.${_("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:e}:null}let o=t.closest("blockquote");if(o instanceof HTMLElement&&!t.closest("a, button")){let i=Wp(o),a=v(o.textContent??"");if(i&&a)return{text:a,skip:i,origin:o}}let n=st();if(!n||!n.contains(t)||mo(t)||t.closest("button, [role='button']"))return null;let r=Qn();return!r||!r.row.contains(t)?null:{text:r.text,skip:null,origin:r.row}}function _p(t){let{target:e}=t;if(!(e instanceof Element))return;if(e.closest('[data-bloom="quote-back"]')){t.preventDefault(),t.stopPropagation(),Gn?.isConnected&&Wl(Gn);return}if(e.closest(`.${_("x")}`)){t.preventDefault(),t.stopPropagation(),Ti();return}let o=Qn();if(o&&(e===o.dismiss||o.dismiss.contains(e))){Ti();return}if(tf(e)&&$l(),!ye.store.jumpToPassage)return;let n=Xp(e);if(!n)return;let r=zp(n.text,n.skip);r&&(t.preventDefault(),t.stopPropagation(),Jp(r,n.origin,n.text),Wl(r))}function tf(t){let e=t.closest("button, [role='button']");return!(e instanceof HTMLElement)||e.closest("[data-bloom]")||!st()?.contains(e)?!1:/send|submit|发送|提交/i.test(Mi(e))&&!qi.test(Mi(e))}function ef(t){return!(t instanceof KeyboardEvent)||t.key!=="Enter"||t.shiftKey||t.isComposing?!1:mo(t.target)}function $l(){if(!ye.store.persistAcrossChats)return;let t=Li(),e=Lo(t);if(e){if(!Qn()){let o=J(),n=Bi(e);n.length>=Vl&&!v(o).includes(n)&&It(`> ${e}

${o}`.trim())}Ti(t)}}function of(t){ef(t)&&$l()}function nf(t){!t.prevId&&t.id&&Yp(t.id),Ci()}var Xl=h({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:ye,styles:jl,onSettingsChange(t){t==="jumpToPassage"&&!ye.store.jumpToPassage&&zl(),t==="persistAcrossChats"&&!ye.store.persistAcrossChats&&(sessionStorage.removeItem(ki),Yn()),Ci()},start(){Ke=new AbortController,document.addEventListener("pointerdown",_p,{capture:!0,signal:Ke.signal}),document.addEventListener("keydown",of,{capture:!0,signal:Ke.signal}),addEventListener("scroll",Pi,{capture:!0,passive:!0,signal:Ke.signal}),xi=At(nf),wi=C(t=>Y(t)&&Ci())},stop(){Ke?.abort(),Ke=void 0,xi?.(),xi=void 0,wi?.(),wi=void 0,window.clearTimeout(Ei),zl(),Yn()}});var _l=`/*
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
`;var af="[data-app-action-sidebar-thread-row]{position:relative}[data-app-action-sidebar-thread-row]>[data-bloom=cls]{position:absolute;inset-inline-end:0.25rem;top:50%;width:0.875rem;height:0.875rem;margin:0;transform:translateY(-50%);pointer-events:none}",sf=I("bloom-cls"),lf="bloom-cls",cf=600*1e3,Ri=no("tab"),Ye=new Map,Io=new Map,Ge=null,tc=[],uf=t=>t==="streaming"||t==="error";function df(){let t=new Map,e=Date.now();for(let[o,n]of Io)e-n.at>cf?Io.delete(o):t.set(o,n.status);for(let[o,n]of Ye)t.set(o,n);return t}function mf(t){return s("span",{class:`bloom-root ${sf("",`-${t}`)}`,attrs:{"data-bloom":"cls","data-status":t,"aria-label":t==="error"?"Error":"Generating"}},t==="error"&&B("alert"))}function zn(){let t=df(),e=new Set;for(let[o,n]of t)for(let r of yo(o)){if(!wt(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){e.add(i);continue}i?.remove();let a=mf(n);e.add(a),r.append(a)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))e.has(o)||o.remove()}function Wn(t,e){t&&(e?Ye.set(t,e):Ye.delete(t),Ge?.postMessage({tab:Ri,id:t,status:e}),zn())}function pf({data:t}){!k(t)||typeof t.id!="string"||typeof t.tab!="string"||t.tab===Ri||(uf(t.status)?Io.set(t.id,{status:t.status,tab:t.tab,at:Date.now()}):Io.delete(t.id),zn())}function Oi(){for(let t of Ye.keys())Ge?.postMessage({tab:Ri,id:t,status:null})}var ec=h({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:()=>`${_l}${af}`,start(){for(let t of document.querySelectorAll('[data-bloom="cls"]'))t.remove();Ge=typeof BroadcastChannel=="function"?new BroadcastChannel(lf):null,Ge?.addEventListener("message",pf),addEventListener("pagehide",Oi),tc=[D.on("rise",({conversationId:t})=>Wn(t,"streaming")),D.on("fall",({conversationId:t,outcome:e})=>Wn(t,e==="error"?"error":null)),D.on("context",({prevId:t,id:e,migrated:o})=>{o&&tt().generating?Wn(e,"streaming"):!o&&Ye.get(t??"")==="streaming"&&Wn(t,null)}),C(t=>Y(t)&&zn())],b()&&zn()},stop(){for(let t of tc)t();Oi(),Ge?.close(),Ge=null,removeEventListener("pagehide",Oi),Ye.clear(),Io.clear();for(let t of document.querySelectorAll('[data-bloom="cls"]'))t.remove()}});var Zt="data-bloom-invite",ff=/^(?:invite team members|invite members|邀请团队成员|邀请成员)$/i,oc=':is(button, a:not([href^="/c/"])):not(main *, [role="dialog"] *)',gf={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${c.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])'],hideInvite:[`[${Zt}]`,`div:has(> [${Zt}]:only-child)`]},nc=y({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0},hideInvite:{type:"boolean",description:"Hide Invite team members in the sidebar.",default:!0}}),Vn,Hi=!1;function hf(t){if(Y(t))for(let e of document.querySelectorAll(`${oc}, [${Zt}]`))!e.matches(oc)||!ff.test(v(e.textContent??""))?e.removeAttribute(Zt):e.hasAttribute(Zt)||e.setAttribute(Zt,"")}var rc=h({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads, notices and Invite team members.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:nc,styles:()=>Ut(Object.entries(gf).flatMap(([t,e])=>nc.store[t]?e:[])),start(){Hi=!0,jt().then(()=>{Hi&&!Vn&&(Vn=C(hf))})},stop(){Hi=!1,Vn?.(),Vn=void 0;for(let t of document.querySelectorAll(`[${Zt}]`))t.removeAttribute(Zt)}});var je=`form:has(:is(${c.composerInput})), ${c.oldComposerForm}`,Jn='[class*="ComposerLayoutBody"]',Ni='[class*="ComposerLayoutRoot"]',bf='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',yf=`:is(${je}) ${Jn}, :is(${je}):not(:has(${Jn})) ${Ni}, :is(${je}):not(:has(${Jn})):not(:has(${Ni})) :is(${bf})`,vf='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',Af='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',wf="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))",xf="var(--color-background-composer-surface, var(--composer-background-color, var(--color-bg-primary, Canvas)))",Sf="composer-fill",ic=y({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function qf(){let{opacity:t,blur:e}=ic.store;if(t>=100)return"";{let i=`color-mix(in srgb, ${xf} ${t}%, transparent)`;return`[class*="ComposerLayoutRoot"], [data-composer-layout], [data-chatgpt-composer]{--composer-layout-surface-background:${i}!important;--composer-background-color:${i}!important;--composer-layout-surface-backdrop-filter:blur(${e}px)!important}`}let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${wf} ${t}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${e}px)!important;-webkit-backdrop-filter:blur(${e}px)!important`;return`:is(${vf}), :is(${je}){${o}}:is(${Af}){display:none!important}${yf}{${n}}:is(${je}):has(${Jn}) ${Ni}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${je}) :is(${c.composerInput}){background-color:transparent!important}`}function Di(){for(let t of document.querySelectorAll(`[data-bloom="${Sf}"]`))t.remove()}var ac=h({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:ic,styles:qf,start(){Di()},stop(){Di()},onSettingsChange(){Di()}});var Ef=1200,Tf=8e3,Mf=150,Cf=20,sc=6,Ki="continue where you left",kf=/message delivery timed out|please try again/i,lc=/waiting for the complete answer/i,cc=y({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:Ki,placeholder:Ki}}),Ui=[],$n=0,Bo=!1,Po=0,We="",Zn="",Gi=0,ze=!1,Oo=!1,Xn=!0,Qe="",Yi=0,_n=!1,Lf=()=>cc.store.prompt.trim()||Ki;function uc(){return(vt(c.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function dc(){let t=uc();return!t||lc.test(t)||!kf.test(t)?"":t}function If(){let t=uc();return t&&lc.test(t)?t:""}function Bf(){let t=Mn()?.querySelectorAll(c.turn),e=t?.[t.length-1];return`${e?.getAttribute("data-turn-key")??""}:${e?.textContent?.length??0}`}function mc(t,e,o){if(o===$n){if(tt().generating||J()!==t||e>=Cf){ze=!1,tt().generating||(We="");return}us(),setTimeout(()=>mc(t,e+1,o),Mf)}}function Pf(t){let e=$n;if(tt().generating||J()&&J()!==t){ze=!1,We="";return}It(t),_n=!0,vr(()=>{e===$n&&mc(t,0,e)})}function pc(t){return t===We||Po>=sc||tt().generating||J()?!1:(We=t,Po+=1,ze=!0,Pf(Lf()),!0)}function Of(){if(Bo||ze||Oo)return;let t=Date.now(),e=dc();if(e){if(Qe="",e!==Zn){Zn=e,Gi=t;return}if(t-Gi<Ef)return;pc(`${b()??""}:${e}`);return}if(Zn="",!If()){Xn=!0,Qe="";return}if(!Xn||!tt().generating||J())return;let n=`${b()??""}:${Bf()}`;if(n!==Qe){Qe=n,Yi=t;return}if(t-Yi<Tf||Po>=sc)return;let r=kr();r&&(Oo=!0,r.click())}function Fi(){$n+=1,Bo=!1,Po=0,We="",Zn="",Gi=0,ze=!1,Oo=!1,Xn=!0,Qe="",Yi=0,_n=!1}var fc=h({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:cc,start(){Fi(),Ui=[D.on("rise",()=>{Bo=!1,We="",ze=!1,_n&&(_n=!1,Xn=!1,Qe="")}),D.on("fall",({outcome:t})=>{if(Oo){Oo=!1,t==="left"?Bo=!0:pc(`${b()??""}:stall`);return}(t==="stopped"||t==="left")&&(Bo=!0),t==="done"&&!dc()&&(Po=0)}),D.on("context",({migrated:t})=>{t||Fi()}),D.on("tick",Of)]},stop(){for(let t of Ui)t();Ui=[],Fi()}});var Ht=I("bloom-csi-"),Rf=256,Hf=160,tr=1,gc=4,Df=.1,Nf=.0015,Uf=250;function Ff(t){return new Promise((e,o)=>{let n=new FileReader;n.onload=()=>e(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(t)})}function Kf(t){return new Promise((e,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>e(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=t})}function Gf(t,e){let o=Math.max(1/t.naturalWidth,1/t.naturalHeight)*e.zoom,n=1/(2*t.naturalWidth*o),r=1/(2*t.naturalHeight*o);return{zoom:e.zoom,x:nt(e.x,n,1-n),y:nt(e.y,r,1-r)}}function hc(t,e,o){let n=t.width,r=t.getContext("2d");if(!r)return;let i=Math.max(n/e.naturalWidth,n/e.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(e,n/2-o.x*e.naturalWidth*i,n/2-o.y*e.naturalHeight*i,e.naturalWidth*i,e.naturalHeight*i)}function Yf(t,e){let o=s("canvas");return o.width=o.height=Rf,hc(o,t,e),o.toDataURL("image/png")}function bc(t){let e=null,o={x:V.store.cropX,y:V.store.cropY,zoom:V.store.cropZoom},n,r=s("canvas",{class:Ht("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=Hf*devicePixelRatio;let i=s("div",{class:`bloom-muted ${Ht("status")}`}),a=s("div",{class:Ht("zoom")}),d=s("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(g,q=!0){e&&(o=Gf(e,g),hc(r,e,o),q&&(clearTimeout(n),n=setTimeout(()=>{e&&(V.store.cropX=o.x,V.store.cropY=o.y,V.store.cropZoom=o.zoom,V.store.avatarUrl=Yf(e,o))},Uf)))}function u(){a.replaceChildren(bn(o.zoom,tr,gc,Df,"\xD7",g=>l({...o,zoom:g})))}async function m(g,q){i.textContent="";try{e=await Kf(g),q&&(V.store.avatarSource=g,o={x:.5,y:.5,zoom:tr}),t.classList.add(Ht("has-image")),u(),l(o,q)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let f=g=>{g?.type.startsWith("image/")&&Ff(g).then(q=>m(q,!0))};d.addEventListener("change",()=>f(d.files?.[0])),r.addEventListener("wheel",g=>{e&&(g.preventDefault(),l({...o,zoom:nt(o.zoom*(1-g.deltaY*Nf),tr,gc)}),u())},{passive:!1}),r.addEventListener("pointerdown",g=>{if(!e)return;r.setPointerCapture(g.pointerId);let q={...o},E=r.getBoundingClientRect(),L=O=>{if(!e)return;let $=Math.max(E.width/e.naturalWidth,E.height/e.naturalHeight)*o.zoom;l({...o,x:q.x-(O.clientX-g.clientX)/(e.naturalWidth*$),y:q.y-(O.clientY-g.clientY)/(e.naturalHeight*$)})};r.addEventListener("pointermove",L),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",L),{once:!0})});let T=s("div",{class:Ht("cropper"),attrs:{tabindex:"0"},on:{paste:g=>f([...g.clipboardData?.files??[]].find(q=>q.type.startsWith("image/"))),dragover:g=>g.preventDefault(),drop:g=>{g.preventDefault(),f(g.dataTransfer?.files[0])}}},s("div",{class:Ht("stage")},r),s("div",{class:Ht("controls")},ho("",g=>g.trim()&&void m(g.trim(),!0),"https://\u2026 or data:image/\u2026","url"),s("div",{class:Ht("buttons")},F("Choose file",()=>d.click()),F("Reset crop",()=>{l({x:.5,y:.5,zoom:tr}),u()}),F("Clear",()=>{e=null,t.classList.remove(Ht("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),a.replaceChildren(),V.store.avatarUrl="",V.store.avatarSource=""},"danger")),a,i,d));return t.append(T),V.store.avatarSource&&m(V.store.avatarSource,!1),()=>{clearTimeout(n),t.replaceChildren()}}var yc=`/*
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
`;var Ro="data-bloom-csi-avatar",ji="data-bloom-csi-sized",xc="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",Qf=32,V=y({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:t=>bc(t)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),vc=[];function Sc(t){t.removeAttribute(Ro),t.removeAttribute(ji)}function Ac(t){return(V.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${t}]`)])}function wc(t=[]){if(!Y(t))return;let e=V.store.displayName.trim()||null,o=!!V.store.avatarUrl,n=new Set(e?Ac("name"):[]);for(let i of document.querySelectorAll(xc))n.has(i)||ne(i,null);for(let i of n)ne(i,e);let r=new Set(o?Ac("avatar"):[]);for(let i of document.querySelectorAll(`[${Ro}]`))r.has(i)||Sc(i);for(let i of r)i.hasAttribute(Ro)||i.setAttribute(Ro,""),i.toggleAttribute(ji,!i.closest('[role="menu"]'))}function Wf(){let t=V.store.avatarUrl;return t?`:root{--bloom-csi-url:url("${t.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${V.store.avatarSize}px}:is(${c.rail}, ${c.oldRail}) [${ji}]{--bloom-csi-size:${Qf}px}`:""}var qc=h({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:V,styles:()=>`${Wf()}
${yc}`,start(){vc=[St(),C(wc)]},stop(){for(let t of vc)t();for(let t of document.querySelectorAll(`[${Ro}]`))Sc(t);for(let t of document.querySelectorAll(xc))ne(t,null)},onSettingsChange(){wc()}});var Ve=I("bloom-greeting-"),Ec=30,Tc=100;function Mc(t){let e=-1,o=s("textarea",{class:`bloom-input ${Ve("input")}`,attrs:{maxlength:String(Tc),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=F("Add",i),r=s("div",{class:Ve("list")});function i(){let l=o.value.trim().slice(0,Tc);if(!l)return;let u=[...P.store.greetings];e>=0?u[e]=l:u.length<Ec&&u.push(l),P.store.greetings=u,e=-1,o.value="",a()}function a(){let{greetings:l}=P.store;n.textContent=e>=0?"Save":"Add",n.disabled=e<0&&l.length>=Ec,r.replaceChildren(...l.length?l.map((u,m)=>s("div",{class:Ve("row",m===e?"row-editing":"row-idle")},s("div",{class:Ve("text"),text:u}),z("edit","Edit",()=>{e=m,o.value=u,o.focus(),a()}),z("trash","Delete",()=>{P.store.greetings=l.filter((f,T)=>T!==m),e===m&&(e=-1),a()}))):[s("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),t.append(s("div",{class:Ve("editor")},r,s("div",{class:Ve("form")},o,n))),a();let d=Te((l,u)=>l==="GreetingCustomizer"&&u==="greetings"&&a());return()=>{d(),t.replaceChildren()}}var Cc=`/*
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
`;var or="data-bloom-greeting",Vf=1e3,Jf=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],P=y({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:t=>Mc(t)},greetings:{type:"custom",default:Jf},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),er,kc=[],Qi,Uo=()=>Ce()&&!re(),Zf=t=>t.replaceAll(/\s*\n\s*/g," ").trim(),Ic=()=>P.store.greetings.filter(t=>typeof t=="string"&&t.trim());function Fo(){let t=Ic();if(t.length)if(P.store.order==="random"&&t.length>1){let e=P.store.lastRandom;for(;e===P.store.lastRandom;)e=Math.floor(Math.random()*t.length);P.store.lastRandom=e,P.store.index=e}else P.store.index=(P.store.index+1)%t.length}function $f(){return Uo()?vt(c.homeHeading):null}function Ho(){for(let t of document.querySelectorAll(`[${or}]`))t.removeAttribute(or),ne(t,null)}function Do(){for(let t of document.querySelectorAll("[data-bloom-placeholder]"))t.removeAttribute("data-bloom-placeholder")}function Lc(t){let e=ft(),o=Zf(t);if(!e||!o||J(e)){Do();return}e.getAttribute("data-bloom-placeholder")!==o&&e.setAttribute("data-bloom-placeholder",o)}function No(){let t=Ic(),e=ps(),o=Uo();if(!t.length||!e&&!o){Ho(),Do();return}if(e){Ho(),Lc(t[0]??"");return}let n=$f();n?((P.store.index<0||P.store.index>=t.length)&&Fo(),n.setAttribute(or,""),ne(n,t[Math.max(0,P.store.index)%t.length]??"")):Ho(),P.store.heroOnlyOutsideProject?Do():Lc(t[Math.max(0,P.store.index)%t.length]??"")}function Wi(){clearInterval(er),er=void 0,P.store.mode==="interval"&&Uo()&&(er=setInterval(()=>{Fo(),No()},P.store.intervalSec*Vf))}function Xf(t){P.store.mode!=="manual"||!(t.target instanceof Element)||!t.target.closest(`[${or}]`)||getSelection()?.toString()||(Fo(),No())}function _f(){Uo()&&P.store.mode==="refresh"&&Fo(),Wi(),No()}var Bc=h({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:P,styles:Cc,start(){Ho(),Do(),Qi=new AbortController,document.addEventListener("click",Xf,{signal:Qi.signal}),Uo()&&P.store.mode==="refresh"&&Fo(),Wi(),kc=[C(t=>Y(t)&&No()),At(_f)]},stop(){Qi?.abort();for(let t of kc)t();clearInterval(er),Ho(),Do()},onSettingsChange(t){(t==="mode"||t==="intervalSec")&&Wi(),No()}});var Ko=I("bloom-history-"),zi=10,tg=3e3;function Vi(t,e){let o="",n=0,r=new Set,i=s("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),a=s("div",{class:Ko("list")}),d=s("div",{class:Ko("pager")}),l,u=F("Clear all",()=>{if(!l){u.textContent="Click again to clear",l=setTimeout(()=>{l=void 0,u.textContent="Clear all"},tg);return}clearTimeout(l),l=void 0,u.textContent="Clear all",Go([])},"danger");function m(){let T=[...ve.store.entries].toReversed(),g=o.trim().toLowerCase(),q=g?T.filter(U=>U.toLowerCase().includes(g)):T,E=Math.max(1,Math.ceil(q.length/zi));n=Math.min(n,E-1);let L=q.slice(n*zi,(n+1)*zi).map(U=>s("div",{class:Ko("row")},s("button",{class:Ko("text",r.has(U)?"text-open":"text-closed"),text:U,title:r.has(U)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{r.delete(U)||r.add(U),m()}}}),e&&z("edit","Use",()=>e(U)),z("copy","Copy",()=>void Vo(U)),z("trash","Delete",()=>Go(ve.store.entries.filter(dt=>dt!==U)))));a.replaceChildren(...L.length?L:[s("div",{class:"bloom-muted",text:g?"No matching prompts.":"No saved prompts yet."})]),d.replaceChildren(s("span",{class:"bloom-muted",text:`${q.length} ${g?"matching":"saved"} \xB7 page ${n+1} of ${E}`}),F("Previous",()=>{n--,m()}),F("Next",()=>{n++,m()}),u);let[O,$]=d.querySelectorAll("button");O.disabled=n===0,$.disabled=n>=E-1,u.disabled=!T.length}i.addEventListener("input",()=>{o=i.value,n=0,m()}),t.append(s("div",{class:Ko("manager")},i,a,d)),m();let f=Te((T,g)=>T==="InputHistory"&&g==="entries"&&m());return()=>{f(),clearTimeout(l),t.replaceChildren()}}var Pc=`/*
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
`;var Dt=I("bloom-history-"),og=2e3,ve=y({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:t=>Vi(t)},entries:{type:"custom",default:[]}}),K=null,Ji={text:"",at:0},Mt=null,$t=null,Zi,Ze=()=>ve.store.entries.filter(t=>typeof t=="string");function Go(t){ve.store.entries=t.slice(-ve.store.maxEntries)}function $i(t){let e=t.trim();if(!e)return;let o=Date.now();e===Ji.text&&o-Ji.at<og||(Ji={text:e,at:o},Go([...Ze().filter(n=>n!==e),e]))}function Oc(t){t.preventDefault()}function ng(){let t=s("button",{class:Dt("hud-count"),attrs:{type:"button"},on:{mousedown:Oc,click:sg}}),e=s("button",{class:Dt("hud-x"),text:"\xD7",attrs:{type:"button","aria-label":"Exit history"},on:{mousedown:Oc,click:rg}});return s("div",{class:`bloom-root ${Dt("hud")}`,attrs:{"data-bloom":"history-hud",role:"group","aria-live":"polite","aria-label":"Input history"}},t,e)}function Rc(t,e){let o=ft();if(!o||$t)return;Mt??=ng();let n=`${t+1} / ${e}`,r=Mt.querySelector(`.${Dt("hud-count")}`);r?.replaceChildren(n),r?.setAttribute("aria-label",`Show input history (${n})`);let i=(o.closest("form")??o).getBoundingClientRect();Mt.style.left=`${i.left+i.width/2}px`,Mt.style.top=`${i.top}px`,Mt.isConnected||document.body.append(Mt)}function Je(){K=null,Mt?.remove()}function rg(){K&&It(K.draft),Je(),ft()?.focus()}function Hc(t){let e=Ze();if(!K)return;let o=e[t];K.index=t,K.shown=o,It(o),Rc(e.length-1-t,e.length)}function ig(t){let e=Ze();if(!e.length)return!1;if(!K){if(t===1)return!1;K={index:e.length,draft:J(),shown:""}}let o=K.index+t;return o<0?!0:o>=e.length?(It(K.draft),Je(),!0):(Hc(o),!0)}function ag(t){let e=Ze().indexOf(t);Yo(),!(e<0)&&(K??={index:e,draft:J(),shown:""},Hc(e),ft()?.focus())}function Yo(){if(!$t)return;$t.release(),$t.controller.abort(),$t.root.remove(),$t=null;let t=Ze();K&&t[K.index]===K.shown?Rc(t.length-1-K.index,t.length):K=null}function sg(){if($t)return;Mt?.remove();let t=s("div",{class:Dt("dialog-body")}),e=s("div",{class:`bloom-root ${Dt("backdrop")}`,attrs:{"data-bloom":"history-dialog"},on:{click:n=>n.target===n.currentTarget&&Yo()}},s("div",{class:Dt("dialog"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Input history"}},s("div",{class:Dt("dialog-header")},s("h2",{class:Dt("dialog-title"),text:"Input history"}),z("close","Close",Yo)),t));e.addEventListener("keydown",n=>n.stopPropagation());let o=new AbortController;document.addEventListener("keydown",n=>{n.key==="Escape"&&(n.preventDefault(),n.stopPropagation(),Yo())},{capture:!0,signal:o.signal}),xt(e),$t={root:e,release:Vi(t,ag),controller:o},t.querySelector("input")?.focus()}function Dc(t){return mo(t)?t:t instanceof HTMLElement?t.closest(c.composerInput):null}function lg(){if(ft()?.closest("[data-chatgpt-composer], [data-composer-input], form")?.querySelector('[aria-expanded="true"]'))return!0;for(let e of document.querySelectorAll('[role="listbox"], [role="menu"], [data-radix-popper-content-wrapper], [cmdk-root], [cmdk-list]')){if(!(e instanceof HTMLElement)||e.closest("[data-bloom]"))continue;let o=getComputedStyle(e);if(!(o.display==="none"||o.visibility==="hidden"))return!0}return!1}function cg(t){if(t.isComposing||t.key==="Process"||t.keyCode===229)return;let e=Dc(t.target);if(!e)return;if(t.key==="Enter"&&!t.shiftKey){$i(J(e)),Je();return}if(t.key==="Escape"&&K){It(K.draft),Je(),t.preventDefault(),t.stopPropagation();return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.ctrlKey||t.metaKey||t.shiftKey||lg())return;let o=ls(e),n=t.key==="ArrowUp";!t.altKey&&!(n?o.first:o.last)||!n&&!K||ig(n?-1:1)&&(t.preventDefault(),t.stopPropagation())}function ug(t){K&&Dc(t.target)&&J()!==K.shown.trim()&&Je()}function dg(t){t.target instanceof Element&&t.target.closest(c.sendButton)&&$i(J())}var Nc=h({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before. Click the counter to browse history.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:ve,styles:Pc,start(){for(let e of document.querySelectorAll('[data-bloom="history-hud"], [data-bloom="history-dialog"]'))e.remove();Mt=null,Zi=new AbortController;let{signal:t}=Zi;document.addEventListener("keydown",cg,{capture:!0,signal:t}),document.addEventListener("input",ug,{capture:!0,signal:t}),document.addEventListener("click",dg,{capture:!0,signal:t}),document.addEventListener("submit",()=>$i(J()),{capture:!0,signal:t})},stop(){Zi?.abort(),Yo(),Je();for(let t of document.querySelectorAll('[data-bloom="history-hud"]'))t.remove();Mt=null},onSettingsChange(t){t==="maxEntries"&&Go(Ze())}});var Uc=`/*
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
`;var pg=1500,fg=5e3,gg=2e3,Qc=[{label:"UTC",value:"UTC"},{label:"\u7F8E\u56FD\u4E1C\u90E8",value:"America/New_York"},{label:"\u7F8E\u56FD\u4E2D\u90E8",value:"America/Chicago"},{label:"\u7F8E\u56FD\u5C71\u5730",value:"America/Denver"},{label:"\u7F8E\u56FD\u897F\u90E8",value:"America/Los_Angeles"},{label:"\u65E5\u672C",value:"Asia/Tokyo"},{label:"\u53F0\u6E7E",value:"Asia/Taipei"}],$e=y({sourceTimeZone:{type:"select",description:"Zone the stored clock was written in. Leave UTC for ChatGPT create_time. Pick the same zone as the Shit GPT plugin only when that clock is a wall time in that zone; it is then shown in the system timezone.",options:Qc,default:"UTC"},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),rr=new Map,Xi=new Set,Wc=0,ir,Fc=[];function zc(t,e){rr.get(t)!==e&&(rr.set(t,e),clearTimeout(ir),ir=setTimeout(Vc,gg))}function Vc(){let t={...$e.store.stamps,...Object.fromEntries(rr)};$e.store.stamps=Object.fromEntries(Object.entries(t).toSorted((e,o)=>o[1]-e[1]).slice(0,pg))}function hg(t){let e=Bt(b())?.times;for(let o=t.length-1;o>=0;o--){let n=rr.get(t[o])??e?.get(t[o])??$e.store.stamps[t[o]];if(n)return n}return null}var bg=()=>tt().generating||Date.now()-Wc<fg;function Jc(){return Intl.DateTimeFormat().resolvedOptions().timeZone}function Zc(){let t=$e.store.sourceTimeZone;if(!t||t==="UTC")return"UTC";try{return Intl.DateTimeFormat(void 0,{timeZone:t}),t}catch{return"UTC"}}function $c(t,e){let o={};for(let n of new Intl.DateTimeFormat("en-US",{timeZone:e,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(t)))o[n.type]=n.value;return{y:+o.year,m:+o.month,d:+o.day,h:+o.hour%24,mi:+o.minute,s:+o.second}}function Xc(t){return Date.UTC(t.y,t.m-1,t.d,t.h,t.mi,t.s)}function Kc(t,e){let o=t;for(let n=0;n<4;n++){let r=t-Xc($c(o,e));if(r===0)return o;o+=r}return o}function yg(t,e){if(e==="UTC")return t;let o=(t%1e3+1e3)%1e3,n=t-o,r=new Date(n),i=Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),r.getUTCHours(),r.getUTCMinutes(),r.getUTCSeconds()),a=Kc(i,e),d=3600*1e3,l=Number.POSITIVE_INFINITY;for(let u of[-d,0,d]){let m=a+u;Xc($c(m,e))===i&&m<l&&(l=m)}return l!==Number.POSITIVE_INFINITY?l+o:Kc(i+d,e)+o}function vg(t,e){let o=Zc();return e||o==="UTC"?t:yg(t,o)}function Gc(t,e){return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}function Ag(t){let e=Jc(),o=Date.now(),n={hour:"2-digit",minute:"2-digit",timeZone:e};if(Gc(t,e)===Gc(o,e))return new Intl.DateTimeFormat(void 0,n).format(t);let r=a=>new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric"}).format(a),i=r(t)===r(o)?{}:{year:"numeric"};return new Intl.DateTimeFormat(void 0,{...i,month:"short",day:"numeric",...n}).format(t)}function wg(t,e){let o=new Date(e).toLocaleString(void 0,{timeZone:Jc()}),n=Zc();if(n==="UTC"||e===t)return o;let r=new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"UTC"}).format(t);return`${Qc.find(a=>a.value===n)?.label??n} ${r} \u2192 ${o}`}function _c(t){let e=qt(t)??t.getAttribute("data-message-author-role")??t.closest(c.turn)?.getAttribute("data-turn")??t.querySelector(c.authorRole)?.getAttribute("data-message-author-role");if(Tn(e))return e;let o=pe(t).at(-1);return Bt(b())?.chain.find(n=>n.id===o)?.role??null}var Yc='[class*="group/activity-header"]';function xg(t){let e=t.parentElement;if(!e)return null;let o=t.closest(c.turn);return o&&e!==o&&!o.contains(e)?null:e}function Sg(t){let e=t;for(let o=0;o<8&&e;o++){let n=xg(e);if(!n)return null;let r=[...n.children],i=r.indexOf(e);for(let a=i-1;a>=0;a--){let d=r[a],l=d.matches(Yc)?d:d.querySelector(Yc);if(l)return l;if(d.matches(c.searchUnit)||d.querySelector(c.searchUnit))return null}if(n===e.closest(c.turn))return null;e=n}return null}function qg(t){let e=t.parentElement;for(let o=0;o<4&&e;o++){if(e.classList.contains("flex-col"))return e;e=e.parentElement}return t.parentElement??t}function tu(t,e){if(e==="assistant"){let o=Sg(t);if(o)return qg(o)}return t}function Eg(t,e){let o=Re();for(let n=o.length-1;n>=0;n--){let r=o[n];if(!(r!==t&&(_c(r)!=="assistant"||tu(r,"assistant")!==e)))return r===t}return!0}function jc(t){return t.querySelector(':scope > time[data-bloom="timestamp"]')}function Tg(t){let e=pe(t);if(!e.length||!wt(t)||t.querySelector("time:not([data-bloom])"))return;let o=_c(t),n=tu(t,o);if(n!==t&&!Eg(t,n)){jc(t)?.remove();return}let r=hg(e),i=!1;if(!r&&bg()){r=Date.now();let m=e.at(-1);Xi.add(m),zc(m,r),i=!0}else r&&Xi.has(e.at(-1))&&(i=!0);let a=n.querySelector('time[data-bloom="timestamp"]')??jc(t);if(!r||$e.store.hideOwnMessages&&o==="user"){a?.remove();return}let d=vg(r,i),l=Ag(d);if(a?.textContent===l&&a.parentElement===n&&a===n.firstElementChild)return;let u=s("time",{class:`bloom-timestamp bloom-timestamp-${o??"assistant"}`,text:l,title:wg(r,d),attrs:{"data-bloom":"timestamp",datetime:new Date(d).toISOString()}});a&&a.replaceWith(u),(u.parentElement!==n||u!==n.firstElementChild)&&n.prepend(u)}var nr=Ft(()=>{for(let t of Re())Tg(t)}),eu=h({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:$e,styles:Uc,start(){Fc=[C(t=>Y(t)&&nr()),Et.on("conversation",nr),Et.on("message-time",({messageId:t,time:e})=>{Xi.delete(t),zc(t,e),nr()}),D.on("fall",()=>{Wc=Date.now()})]},stop(){for(let t of Fc)t();ir&&(clearTimeout(ir),Vc());for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove()},onSettingsChange(t){if(t!=="stamps"){for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove();nr()}}});var Mg=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])','[data-chatgpt-composer] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-composer-input] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-codex-composer-root] button[aria-label^="Dictat" i], [data-composer-placement] button[aria-label^="Dictat" i], [class*="ComposerLayout"] button[aria-label^="Dictat" i]'],Cg=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],ou=y({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),nu=h({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:ou,styles:()=>Ut([...Mg,...ou.store.hideDictationSettings?Cg:[]])});var Ae="data-bloom-share",kg=/^\/g\/g-p-/,Lg=/^(?:share|分享)$/i,Ig=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],Bg=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${Ae}="project"]`],_i=y({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),ar,ta=!1;function Pg(t){if(!Y(t))return;let e=kg.test(location.pathname)&&!b();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${Ae}]`))!e||!Lg.test(v(o.textContent??""))?o.removeAttribute(Ae):o.hasAttribute(Ae)||o.setAttribute(Ae,"project")}var ru=h({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:_i,styles:()=>Ut([..._i.store.hideShareChat?Ig:[],..._i.store.hideShareProject?Bg:[]]),start(){ta=!0,jt().then(()=>{ta&&!ar&&(ar=C(Pg))})},stop(){ta=!1,ar?.(),ar=void 0;for(let t of document.querySelectorAll(`[${Ae}]`))t.removeAttribute(Ae)}});var iu='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',Og='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',Rg="[data-bloom-profile-plan]",au="visibility:hidden!important;user-select:none!important",lu=y({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function Hg(){let{hideUsername:t,hideEmail:e,enlargePlan:o,alignPlanWithAvatar:n}=lu.store,r=[];return t&&r.push(n?`:is(${iu}){display:none!important}`:`:is(${iu}){${au}}`),e&&r.push(`:is(${Og}){${au}}`),t&&o&&r.push(`${Rg}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var su,cu=h({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:lu,styles:Hg,start(){su=St()},stop(){su?.()}});var Dg=new Set(["chatgpt","new chat","\u65B0\u804A\u5929","codex"]);function Ng(){let t=v(document.title.replace(/\s*[|–-]\s*(?:ChatGPT|Codex)$/i,""));return t&&!Dg.has(t.toLowerCase())?t:null}function jo(t){return t?vo(t)??(t===b()?Ng():null):null}var uu=`/*
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
`;var ot=I("bloom-recent-"),Ct="home",Fg=50,du=140,Kg=new Set(["Backquote"]),Gg=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),w=y({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(t=>({label:t,value:t})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),Xt=null,ut=[],bt=0,ea,mu=[],lr=()=>re()?null:b()??(Ce()?Ct:null);function pu(t,e){return Object.fromEntries(Object.entries(t).filter(([o])=>e.has(o)))}function gu(t){let e=jo(t);e&&w.store.titles[t]!==e&&(w.store.titles={...w.store.titles,[t]:e});let o=Ws(location.href);o&&t===b()&&w.store.projects[t]!==o&&(w.store.projects={...w.store.projects,[t]:o})}function fu(t){if(!t)return;let e=[t,...w.store.visits.filter(n=>n!==t)].slice(0,Fg),o=new Set(e);w.store.visits=e,Object.keys(w.store.previews).some(n=>!o.has(n))&&(w.store.previews=pu(w.store.previews,o)),Object.keys(w.store.titles).some(n=>!o.has(n))&&(w.store.titles=pu(w.store.titles,o)),t!==Ct&&gu(t)}function Yg(t){if(!w.store.visits.includes(t))return;let{[t]:e,...o}=w.store.titles,{[t]:n,...r}=w.store.previews,{[t]:i,...a}=w.store.projects;w.store.visits=w.store.visits.filter(d=>d!==t),w.store.titles=o,w.store.previews=r,w.store.projects=a}function sr(t){if(!t||!w.store.visits.includes(t))return;let e={},o=Bt(t)?.chain??[];for(let r of o)e[r.role]=yt(Cn(r),du);if(t===b())for(let r of Vt()){let i=He(r);i&&(e[r.role]=yt(i,du))}let n=w.store.previews[t];!e.user&&!e.assistant||n?.user===e.user&&n?.assistant===e.assistant||(w.store.previews={...w.store.previews,[t]:e})}function jg(){let t=Number(w.store.maxRecent);return w.store.visits.filter(e=>e!==Ct||w.store.includeHome).slice(0,t)}function hu(t){if(_e(),t===lr())return;let e=t===Ct?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"], [data-sidebar-destination="builtin:home"]'):yo(t)[0];e?e.click():location.assign(t===Ct?"/":`/c/${t}`)}function Qg(t){let e=t===Ct?null:w.store.previews[t],o=e&&["user","assistant"].filter(n=>e[n]).map(n=>s("span",{class:ot("preview"),attrs:{"data-role":n},text:e[n]}));return s("span",{class:ot("thumb"),attrs:{"aria-hidden":"true"}},o?.length?s("span",{class:ot("page")},...o):s("span",{class:ot("fallback")},B(t===Ct?"plus":"bloom")))}function Wg(t,e){let o=t===Ct?"New chat":w.store.titles[t]??jo(t)??"Untitled chat",n=t===Ct?null:w.store.projects[t];return s("button",{class:ot("item"),attrs:{type:"button",role:"option","aria-selected":String(e===bt),"aria-label":n?`${o}, ${n}`:o},on:{click:()=>hu(t),pointerenter:()=>e!==bt&&Xe(e)}},Qg(t),s("span",{class:ot("meta")},s("span",{class:`${ot("title")} bloom-truncate`,text:o}),n&&s("span",{class:ot("project")},B("folder"),s("span",{class:"bloom-truncate",text:n}))))}function bu(){ut.length?hu(ut[bt]):_e()}function Xe(t){ut.length&&(bt=(t+ut.length)%ut.length,Xt?.querySelectorAll(`.${ot("item")}`).forEach((e,o)=>e.setAttribute("aria-selected",String(o===bt))))}function zg(){sr(b());let t=lr();ut=jg(),t&&(ut=[t,...ut.filter(o=>o!==t)].slice(0,Number(w.store.maxRecent))),bt=ut.length>1?1:0;let e=ut.length?s("div",{class:ot("list"),attrs:{role:"listbox","aria-label":"Recent chats"}},...ut.map(Wg)):s("div",{class:ot("empty"),text:"Open a few chats, then hold Ctrl+` to switch."});e.style.setProperty("--bloom-recent-count",String(ut.length)),Xt=s("div",{class:`bloom-root ${ot("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:o=>o.target===o.currentTarget&&_e()}},s("div",{class:ot("panel")},e)),xt(Xt)}function _e(){Xt?.remove(),Xt=null}var Vg=t=>Kg.has(t.code)||Gg.has(t.key);function Jg(t){if(t.ctrlKey&&!t.altKey&&!t.metaKey&&Vg(t)){t.preventDefault(),t.stopPropagation(),Xt?Xe(bt+(t.shiftKey?-1:1)):zg();return}if(!Xt)return;let o={Escape:_e,Enter:bu,ArrowRight:()=>Xe(bt+1),ArrowDown:()=>Xe(bt+1),ArrowLeft:()=>Xe(bt-1),ArrowUp:()=>Xe(bt-1)}[t.key];o&&(t.preventDefault(),t.stopPropagation(),o())}function Zg(t){Xt&&t.key==="Control"&&bu()}var yu=h({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:w,styles:uu,start(){ea=new AbortController;let{signal:t}=ea;addEventListener("keydown",Jg,{capture:!0,signal:t}),addEventListener("keyup",Zg,{capture:!0,signal:t}),addEventListener("blur",_e,{signal:t}),document.addEventListener("visibilitychange",()=>document.hidden&&sr(b()),{signal:t}),mu=[At(({prevId:i})=>{sr(i),fu(lr())}),Et.on("conversation",({id:i})=>{w.store.visits.includes(i)&&gu(i),sr(i)}),Et.on("conversation-missing",({id:i})=>Yg(i))];let{visits:e,titles:o,previews:n}=w.store,r=e.filter(i=>i!==Ct&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(w.store.visits=e.filter(i=>!r.includes(i))),fu(lr())},stop(){ea?.abort();for(let t of mu)t();_e()}});var oa="data:audio/mpeg;base64,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";var vu=new x("ResponseNotification"),$g=.5,Au="BloomNoticeClaim",Xg=3e4,Qo=y({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:t=>(t.append(F("Preview",Eu)),()=>t.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),wu=null,na=new Map,xu=[],ra,_g=t=>Uint8Array.from(atob(t.slice(t.indexOf(",")+1)),e=>e.charCodeAt(0)).buffer;function th(t,e){let o=na.get(e);return o||(o=(e.startsWith("data:")?Promise.resolve(_g(e)):Zo(e)).then(n=>t.decodeAudioData(n)),o.catch(()=>na.delete(e)),na.set(e,o)),o}async function Su(t){wu??=new AudioContext;let e=wu;e.state==="suspended"&&e.resume();let o=e.createBufferSource(),n=e.createGain();o.buffer=await th(e,t),n.gain.value=$g,o.connect(n).connect(e.destination),o.start()}function Eu(){let t=Qo.store.soundUrl.trim();Su(t||oa).catch(e=>{vu.warn("Sound failed",e),t&&Su(oa).catch(o=>vu.warn("Default chime failed",o))})}function eh(t){let e=`${t??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:e,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:e,silent:!0});o.onclick=()=>{focus(),o.close()}}function oh(t){let e=Jo(nn(Au)??"");return t&&k(e)&&e.id===t&&Date.now()-Number(e.at)<Xg?!1:(rn(Au,{id:t,at:Date.now()}),!0)}function qu(t){Qo.store.onlyWhenHidden&&!document.hidden||oh(t)&&(Qo.store.sound&&Eu(),Qo.store.browserNotification&&eh(jo(t)))}function nh(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(ra=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:ra.signal}))}var Tu=h({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply, including chats you left while they were answering.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:Qo,start(){nh(),xu=[D.on("fall",({conversationId:t,outcome:e})=>e==="done"&&qu(t)),D.on("background",({conversationId:t})=>qu(t))]},stop(){for(let t of xu)t();ra?.abort()}});var rh=`:is(${c.sidebarScroll}, :has(> ${c.sidebarScroll})) + :has(${c.menuButton})`,ih=`${c.rail} > :has(${c.menuButton})`,aa=`:is(${rh}, ${ih}, ${c.oldProfile}):not(:hover)`,ia="[data-bloom-profile-avatar]",ah=`:is(${aa}, ${aa} :has(${ia})) > :not(${ia}, :has(${ia}))`,Cu=y({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function sh(){let{opacity:t,fadeAvatar:e}=Cu.store;return t>=100?"":`${e?aa:ah}{opacity:${t/100}!important}`}var Mu,ku=h({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Cu,styles:sh,start(){Mu=St()},stop(){Mu?.()}});var Lu=`/*
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
`;var G=I("bloom-star-chats"),ch=80,uh=60,dh=1200,mh=120,Wo=y({replaceReadAloud:{type:"boolean",description:"Put the star where the reply's Read aloud button is, and hide that button.",default:!0},messages:{type:"custom",default:[]}}),ph=`:is(${c.turnActions}) ${c.readAloud}`,sa,la=!1,_t=!1,xe=!1,cr=0,X=null,ur="",R=null,ca,te;function da(){let t=Wo.store.messages;return Array.isArray(t)?t.filter(e=>k(e)&&typeof e.conversationId=="string"&&typeof e.messageId=="string"&&(e.role==="user"||e.role==="assistant")&&typeof e.snippet=="string"&&typeof e.starredAt=="number"):[]}function ma(){let t=b();return t?da().filter(e=>e.conversationId===t):[]}function fh(t,e){return da().some(o=>o.conversationId===t&&o.messageId===e)}function Iu(t){let e=da(),o=e.some(n=>n.conversationId===t.conversationId&&n.messageId===t.messageId);Wo.store.messages=o?e.filter(n=>!(n.conversationId===t.conversationId&&n.messageId===t.messageId)):[{...t,starredAt:Date.now()},...e].slice(0,ch)}function ua(t){return t.messageIds[0]||t.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||t.el.getAttribute("data-turn-key")||""}function gh(t){return yt(He(t)||v(t.el.textContent??""),uh)}function hh(t){let e=t.closest(c.turn);if(!e)return null;let o=Vt().filter(n=>e.contains(n.el));return o.find(n=>n.el.contains(t)||n.el===e)??o.findLast(n=>n.el.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING)??null}function bh(){let t=[...document.querySelectorAll(c.turnActions)].filter(e=>!e.closest(`[data-bloom], [role="dialog"], [inert], pre, ${c.sidebars}`));return t.filter(e=>!t.some(o=>o!==e&&o.contains(e)))}function yh(t,e){let o=Wo.store.replaceReadAloud?e.querySelector(c.readAloud):null;if(o&&!o.closest("[data-bloom]")){t.nextElementSibling!==o&&o.before(t);return}let n=vh(e);(t.parentElement!==n||n.lastElementChild!==t)&&n.append(t)}function vh(t){let e=[...t.querySelectorAll("button")].filter(n=>n.dataset.bloom!=="message-star"&&!n.closest("[data-bloom]"));return e.length?[...t.children].find(n=>n instanceof HTMLElement&&n!==e[0]&&e.every(r=>n.contains(r)))??t:t}function Ah(){return[...document.querySelectorAll(c.headerMore)].filter(e=>{if(e.dataset.bloom==="message-star"||e.closest("[data-bloom], [role='dialog'], [inert]")||e.closest(c.sidebars))return!1;let o=e.getBoundingClientRect();return o.width===0&&o.height===0?!!e.closest("header, #page-header"):o.top>=0&&o.top<96&&o.left>window.innerWidth*.5}).toSorted((e,o)=>o.getBoundingClientRect().left-e.getBoundingClientRect().left||(e.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1))[0]??null}function Bu(t,e,o){return s("button",{class:e,attrs:{type:"button","aria-label":t},on:{pointerdown:n=>n.stopPropagation(),mousedown:n=>n.stopPropagation(),click:n=>{n.preventDefault(),n.stopPropagation(),o(n)}}},B("star"))}function wh(t,e){t.setAttribute("aria-pressed",String(e)),t.setAttribute("aria-label",e?"Unstar":"Star")}function dr(){return _t||xe}function to(){cr&&window.clearTimeout(cr),cr=0}function eo(){_t=!1,xe=!1,to(),te?.enter(),X?.remove(),X=null,ur="",R?.classList.remove(G("-open")),R?.setAttribute("aria-expanded","false")}function mr(t){return t instanceof Node&&!!(R?.contains(t)||X?.contains(t))}function xh(t){t.classList.add(G("-flash")),window.setTimeout(()=>t.classList.remove(G("-flash")),dh)}function Sh(t){let e=Vt().find(n=>ua(n)===t),o=e?.el.closest(c.turn)??e?.el;o&&(o.scrollIntoView({block:"start"}),xh(o))}function qh(){let t=b(),e=new Set,o=[...document.querySelectorAll('[data-bloom="message-star"][data-place="action"]')];if(!t||re()){for(let n of o)n.remove();return}for(let n of bh()){if(!wt(n))continue;let r=hh(n),i=r?ua(r):"";if(!r||!i)continue;let a=n.querySelector('[data-place="action"]');(!a||a.dataset.id!==i)&&(a?.remove(),a=Bu("Star",G("-star"),()=>{let d=b(),l=Vt().find(u=>ua(u)===i);!d||!l||Iu({conversationId:d,messageId:i,role:l.role,snippet:gh(l)})}),a.dataset.bloom="message-star",a.dataset.place="action",a.dataset.id=i),wh(a,fh(t,i)),yh(a,n),e.add(a)}for(let n of o)e.has(n)||n.remove()}function Eh(){if(!X||!R)return;let t=R.getBoundingClientRect(),e=X.offsetWidth||288,o=X.offsetHeight||120,n=t.bottom+6;n+o>window.innerHeight-8&&(n=Math.max(8,t.top-o-6));let r=Math.max(8,Math.min(t.right-e,window.innerWidth-e-8));X.dataset.place=n>=t.bottom?"below":"above",X.style.left=`${Math.round(r)}px`,X.style.top=`${Math.round(n)}px`}function Th(){if(!dr()||!R){X?.remove(),X=null,ur="",R?.classList.remove(G("-open")),R?.setAttribute("aria-expanded","false");return}let t=ma(),e=t.map(o=>`${o.messageId}	${o.snippet}`).join(`
`);if(!X||ur!==e){X?.remove();let o=t.map(n=>s("div",{class:G("-row")},s("button",{class:G("-jump"),attrs:{type:"button"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),eo(),Sh(n.messageId)}}},s("span",{class:G("-role"),text:n.role==="user"?"You":"ChatGPT"}),s("span",{class:G("-snip"),text:n.snippet||"Message"})),Bu("Unstar",G("-unstar"),()=>Iu(n))));X=s("div",{class:`bloom-root ${G("-panel")}`,attrs:{"data-bloom":"star-list"},on:{pointerenter:()=>{to(),te?.enter(),xe=!0},pointerleave:n=>{mr(n.relatedTarget)||_t||te?.leave(n)}}},s("div",{class:G("-bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:G("-head"),text:"Starred"}),s("div",{class:G("-body")},...o.length?o:[s("div",{class:G("-empty"),text:"No starred messages in this chat"})])),document.body.append(X),ur=e}Eh(),R.classList.add(G("-open")),R.setAttribute("aria-expanded","true")}function Mh(){for(let r of document.querySelectorAll('[data-bloom="starred"]'))r.remove();let t=Ah(),e=t?.parentElement??null,o=b();if(!t||!e||e.closest(c.sidebars)||!o||re()||!wt(e)){R?.remove(),R=null,eo();return}R||(R=s("button",{class:G("-toggle"),attrs:{type:"button","data-bloom":"message-star","data-place":"header","aria-label":"Starred messages","aria-expanded":"false"},on:{pointerdown:r=>r.stopPropagation(),pointerenter:()=>{to(),te?.enter(),cr=window.setTimeout(()=>{xe=!0,we()},mh)},pointerleave:r=>{mr(r.relatedTarget)||(to(),dr()&&te?.leave(r))},click:r=>{r.preventDefault(),r.stopPropagation(),_t=!_t,xe=_t,to(),_t||eo(),we()}}},B("star"))),(R.parentElement!==e||R.nextElementSibling!==t)&&t.before(R);let n=t.getBoundingClientRect();n.width>0&&(R.style.width=`${n.width}px`,R.style.height=`${n.height}px`),R.classList.toggle(G("-here"),ma().length>0),Th()}function Ch(){let t=new Set(ma().map(e=>e.messageId));for(let e of document.querySelectorAll('[data-bloom="navigator"] .bloom-nav-tick, [data-bloom="navigator"] .bloom-nav-row'))e.classList.toggle(G("-mark"),!!e.dataset.messageId&&t.has(e.dataset.messageId))}function we(){if(!la){la=!0;try{for(let t of document.querySelectorAll('[data-bloom="starred"], [data-bloom="chat-star"]'))t.remove();qh(),Mh(),Ch()}finally{la=!1}}}function kh(){eo(),R?.remove(),R=null;for(let t of document.querySelectorAll('[data-bloom="message-star"], [data-bloom="star-list"], [data-bloom="starred"], [data-bloom="chat-star"]'))t.remove();for(let t of document.querySelectorAll(`.${G("-mark")}`))t.classList.remove(G("-mark"))}var Pu=h({name:"StarChats",description:"Star a message from its toolbar. The star left of the top-right menu opens this chat's list.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:Wo,styles:()=>`${Lu}${Wo.store.replaceReadAloud?Ut([ph]):""}`,onSettingsChange(t){(t==="messages"||t==="replaceReadAloud")&&we()},start(){for(let o of document.querySelectorAll('[data-bloom="star-list"]'))o.remove();te=Bn({over:mr,trigger:()=>R,panel:()=>X,setHeld(o){if(o){xe=!0,we();return}_t||(xe=!1,we())}}),sa=C(o=>Y(o)&&we());let t=o=>{mr(o.target)||dr()&&eo()};document.addEventListener("pointerdown",t,!0);let e=o=>{o.key!=="Escape"||!dr()||(o.preventDefault(),eo())};document.addEventListener("keydown",e,!0),ca=()=>{document.removeEventListener("pointerdown",t,!0),document.removeEventListener("keydown",e,!0)},we()},stop(){sa?.(),sa=void 0,ca?.(),ca=void 0,to(),te?.dispose(),te=void 0,kh()}});var Ou="filter:blur(6px)!important;transition:filter 0.2s ease",wx=`:is(${c.sidebars})`,Se="data-bloom-streamer-open",Lh="[data-app-action-sidebar-thread-row], [data-app-action-sidebar-project-row], .bloom-recent-item",Ru=":not([data-app-action-sidebar-thread-row] *, [data-app-action-sidebar-project-row] *)";function Ih(){return{conversations:{selectors:["[data-app-action-sidebar-thread-title]"],hover:!0,row:"[data-app-action-sidebar-thread-row]"},projects:{selectors:["[data-app-action-sidebar-project-label]"],hover:!0,row:"[data-app-action-sidebar-project-row]"},accountAvatar:{selectors:["[data-bloom-profile] img","[data-bloom-menu] img"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:[`[data-thread-title]${Ru}`,`[data-thread-title-trigger]${Ru}`],hover:!1}}}var Hu=y({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function Bh(t,e){let o=[`:is(${t}):hover`,`.bloom-recent-item:hover :is(${t})`,`:is(${t})[${Se}]`];return e&&o.push(`${e}:hover`,`${e}:hover :is(${t})`,`${e}:is(${t}):hover`,`${e}[${Se}]`,`${e}[${Se}] :is(${t})`),o.join(",")}function Ph(){let t=Ih();return Object.entries(t).filter(([e])=>Hu.store[e]).map(([,e])=>{let o=e.selectors.join(",");if(!e.hover)return`:is(${o}){${Ou}}`;let n="row"in e?e.row:void 0;return`:is(${o}){${Ou}}${Bh(o,n)}{filter:none!important}`}).join(`
`)}function Oh(t,e){for(let o of document.elementsFromPoint(t,e))if(o instanceof Element){let n=o.closest(Lh);if(n)return n}return null}function ga(t){for(let e of document.querySelectorAll(`[${Se}]`))e!==t&&e.removeAttribute(Se);t&&!t.hasAttribute(Se)&&t.setAttribute(Se,"")}var oo,Rh=Ft(()=>{oo&&ga(Oh(oo.clientX,oo.clientY))});function pa(t){oo=t,Rh()}function Hh(t){t.relatedTarget instanceof Node&&document.documentElement.contains(t.relatedTarget)||(oo=void 0,ga(null))}var fa,pr,Du=h({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:Hu,styles:Ph,start(){fa=St(),pr=new AbortController;let t={capture:!0,signal:pr.signal,passive:!0};document.addEventListener("pointerover",pa,t),document.addEventListener("pointermove",pa,t),document.addEventListener("pointerout",pa,t),window.addEventListener("pointerleave",Hh,t)},stop(){pr?.abort(),pr=void 0,oo=void 0,ga(null),fa?.(),fa=void 0}});var ee=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)','[data-turn-key] [data-message-author-role="user"] blockquote:not(.twitter-tweet)','[class~="group/user-message"] blockquote:not(.twitter-tweet)'].join(","),ha=y({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function Dh(){let t=[`${ee}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${ee}>*{margin-block:0!important}`];return ha.store.italic||t.push(`${ee}{font-style:inherit!important}`),ha.store.quotes||(t.push(`${ee}{quotes:none!important}`),t.push(`${ee}::before,${ee}::after,${ee} p::before,${ee} p::after{content:none!important}`)),t.join(`
`)}var Nu=h({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:ha,styles:Dh});var Nh=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],Uh=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",Fh='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',Uu=y({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function Kh(){let t=`${Uu.store.width}rem`;return`:root,[data-app-action-timeline-scroll],[data-chatgpt-composer],[data-composer-input]{--thread-content-max-width:${t}!important;--composer-adjacent-max-width:${t}!important}`}var Fu=h({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:Uu,styles:Kh});var Gh=[nl,Cs,Yl,Xl,ec,rc,ac,fc,qc,Bc,Nc,eu,nu,ru,cu,yu,Tu,ku,Pu,Du,Nu,Fu],ba=Gh;var Yh=new x("Bloom"),Ku="2.0.112";var ya=0,fr,zo="__bloomOnShortcut";function gr(t){if(t.isComposing||!t.shiftKey||!(t.metaKey||t.ctrlKey)||t.key!=="b"&&t.key!=="B")return;t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation();let e=Us();Wt();for(let o of document.querySelectorAll("[data-bloom='settings']"))o.remove();e||Oe()}function jh(){let t=mt;t[zo]&&document.removeEventListener("keydown",t[zo],!0),t[zo]=gr,document.addEventListener("keydown",gr,!0)}function Qh(){ya++,document.removeEventListener("keydown",gr,!0);let t=mt;t[zo]===gr&&delete t[zo],fr?.(),fr=void 0,ts(),ao(),_o()}async function va(){let t=++ya,e=()=>t===ya;ao(),_o();for(let o of ba)o.updatedAt=bs[o.name];Ka(ba),Da(),Ya(),$o("base",os),gs(),jh(),mn("Init"),Pr().then(()=>{e()&&(ka(),mn("DOMContentLoaded"))}),await Or(),e()&&(mn("HostReady"),fr?.(),fr=Gs(),_a(),Yh.info(`Bloom++ ${Ku} app host ready`))}var Wh=new x("Boot");window===window.top&&(Ia(mt.Bloom),Ba(Aa),va().catch(t=>Wh.error("Startup failed",t)));})();
