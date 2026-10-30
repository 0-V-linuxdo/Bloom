// ==UserScript==
// @name         Bloom++ (ChatGPT app)
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.91
// @description  Bloom++ host for the official ChatGPT macOS app. Injected over loopback CDP; not a web userscript.
// @author       0-V-linuxdo & Bloom contributors
// @homepageURL  https://github.com/0-V-linuxdo/Bloom
// @supportURL   https://github.com/0-V-linuxdo/Bloom/issues
// @match        app://*/*
// @run-at       document-start
// @grant        none
// @license      GPL-3.0-or-later
// ==/UserScript==

/* Bloom++ v2.0.91 ChatGPT app host. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var qc=Object.defineProperty;var wc=(t,e)=>{for(var o in e)qc(t,o,{get:e[o],enumerable:!0})};var q=class{constructor(e){this.tag=e}log(e,o){console[e](`[Bloom++] [${this.tag}]`,...o)}debug(...e){this.log("debug",e)}info(...e){this.log("info",e)}warn(...e){this.log("warn",e)}error(...e){this.log("error",e)}};var $=(t,e,o)=>Math.min(o,Math.max(e,t)),H=t=>typeof t=="object"&&t!==null&&!Array.isArray(t),Ii=t=>`${t}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,rt=(t,e)=>t.length>e?`${t.slice(0,e-1)}\u2026`:t,h=t=>t.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function Pi(t,e){return`${t} ${e}${t===1?"":"s"}`}async function Oi(t){if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}await navigator.clipboard.writeText(t)}function Ri(t){try{return JSON.parse(t)}catch{return}}var _=typeof unsafeWindow>"u"?window:unsafeWindow;var Sc=new q("Styles"),Tt=new Map,Ne=new Set,jt=new Map,Nn=!0,Hi=t=>t.replaceAll(/[^A-Za-z0-9_-]/g,"_"),Ec=t=>`:where(:root){--bloom-sheet-${Hi(t)}:1}`,Tc=(t,e)=>`${Ec(t)}${e}`,Di=t=>`bloom-style-${t}`;function Ni(t){try{return[...t.cssRules].map(e=>e.cssText).join(`
`)}catch{return""}}function Mc(t,e){let o=Ni(t);return o?o.includes(`--bloom-sheet-${Hi(e)}`)?!0:e==="plugin-StreamerMode"?o.includes("blur(6px)")&&(o.includes("data-app-action-sidebar-thread-title")||o.includes("data-bloom-streamer-open")):e==="plugin-WiderChat"?o.includes("--composer-adjacent-max-width")&&o.includes("--thread-content-max-width"):e==="plugin-ComposerOpacity"?o.includes("--composer-layout-surface-backdrop-filter")||o.includes("--composer-layout-surface-background")&&o.includes("color-mix"):!1:!1}function Ui(t){let e=Ni(t);return e?!!(e.includes("--bloom-")||e.includes(".bloom-")||e.includes("[data-bloom")||e.includes("--bloom-sheet-")||e.includes("blur(6px)")&&e.includes("data-app-action-sidebar-thread-title")||e.includes("--composer-adjacent-max-width")&&e.includes("--thread-content-max-width")||e.includes("--composer-layout-surface-backdrop-filter")):!1}function Fi(){let t=document.adoptedStyleSheets.filter(e=>!Ne.has(e)&&!Ui(e));document.adoptedStyleSheets=[...t,...Tt.values()]}function Ki(t){document.readyState==="loading"||t.parentNode===document.head||document.head.append(t)}function Cc(t,e){let o=jt.get(t);o||(o=document.createElement("style"),o.id=Di(t),jt.set(t,o)),o.textContent!==e&&(o.textContent=e),Ki(o)}function So(t,e){let o=Tc(t,e);if(Nn)try{let n=Tt.get(t);n||(n=new _.CSSStyleSheet,Tt.set(t,n),Ne.add(n)),n.replaceSync(o),Fi();return}catch(n){Sc.warn("Constructed style sheets unavailable, using <style> after parsing",n),Nn=!1;let r=Tt.get(t);r&&Ne.delete(r),Tt.delete(t)}Cc(t,o)}function Ue(t){let e=Tt.get(t);e&&(Ne.delete(e),Tt.delete(t)),jt.get(t)?.remove(),jt.delete(t);for(let o of document.querySelectorAll(`style[id="${Di(t)}"]`))o.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(o=>o!==e&&!Mc(o,t)),Nn&&Fi()}catch{}}function Fe(){Tt.clear(),Ne.clear();for(let t of jt.values())t.remove();jt.clear();for(let t of document.querySelectorAll("style[id^='bloom-style-']"))t.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(t=>!Ui(t))}catch{}}function Gi(){for(let t of jt.values())Ki(t)}var k=t=>(...e)=>e.map(o=>t+o).join(" "),Eo=(...t)=>t.filter(Boolean).join(" "),Mt=t=>t.length?`${t.map(e=>`${e}:not([data-bloom])`).join(",")}{display:none!important}`:"";var Yi="__bloomHost",Un=new q("Boot"),Lc=['[data-bloom="navigator"]','[data-bloom="settings"]','[data-bloom="history-hud"]','[data-bloom="history-dialog"]','[data-bloom="star-list"]','[data-bloom="entry"]','[data-bloom="menu-entry"]','[data-bloom="message-star"]','[data-bloom="starred"]','[data-bloom="chat-star"]','[data-bloom="queue"]','[data-bloom="recent"]','[data-bloom="quote-chip"]','[data-bloom="quote-back"]','[data-bloom="cls"]','[data-bloom="timestamp"]','[data-bloom="tooltip"]'].join(", "),kc=["data-bloom-greeting","data-bloom-placeholder","data-bloom-streamer-open","data-bloom-share","data-bloom-invite","data-bloom-csi-avatar","data-bloom-csi-sized"];function To(){if(!(typeof document>"u"||!document.documentElement)){for(let t of document.querySelectorAll(Lc))t.remove();for(let t of kc)for(let e of document.querySelectorAll(`[${t}]`))e.removeAttribute(t);for(let t of document.querySelectorAll("[data-bloom-text]"))t.removeAttribute("data-bloom-text"),t.style.removeProperty("--bloom-text-size"),t.style.removeProperty("--bloom-text")}}function Bc(t){if(Un.warn("Replacing another Bloom++ instance",t.VERSION),t.destroy){t.destroy();return}for(let e of t.plugins?.values()??[]){try{e.stop?.()}catch(o){Un.error("Failed to stop previous plugin",o)}e.styles="",e.start=void 0}Fe()}function ji(t){let e=_,o=new Set;for(let n of[t,e.Bloom,e[Yi]])if(!(!n||o.has(n))){o.add(n);try{Bc(n)}catch(r){Un.error("Failed to retire Bloom++",r)}}To()}function Wi(t){let e=_;try{delete e.Bloom}catch{}Object.defineProperty(e,"Bloom",{value:t,configurable:!0,writable:!0}),Object.defineProperty(e,Yi,{value:t,configurable:!0,writable:!0})}var Bi={};wc(Bi,{VERSION:()=>xc,destroy:()=>ng,init:()=>ki,plugins:()=>et});var Ic=new q("Dom");function s(t,e={},...o){let n=document.createElement(t);e.class&&(n.className=e.class),e.text!=null&&(n.textContent=e.text),e.title&&(n.title=e.title);for(let[r,i]of Object.entries(e.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(e.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var Qi=document.createElement("template");function zi(t){return Qi.innerHTML=t.trim(),Qi.content.firstElementChild.cloneNode(!0)}var it=t=>t instanceof HTMLElement&&t.isConnected&&t.getClientRects().length>0&&!t.closest("[inert]"),at=(t,e=document)=>[...e.querySelectorAll(t)].find(it)??null,Pc=16,Oc="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function Vi(t,e){let o=setInterval(t,e),n;try{n=new Worker(URL.createObjectURL(new Blob([Oc],{type:"text/javascript"}))),n.addEventListener("message",t),n.postMessage(e)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function Fn(t){document.hidden?setTimeout(t,Pc):requestAnimationFrame(t)}function Ct(t){let e=!1;return()=>{e||(e=!0,Fn(()=>{e=!1;try{t()}catch(o){Ic.error("Scheduled task failed",o)}}))}}var Mo=new Set,Co=[],Ke,Rc=Ct(()=>{let t=Co;Co=[];for(let e of Mo)e(t)});function T(t){return Mo.add(t),Ke||(Ke=new MutationObserver(e=>{Co.push(...e),Rc()}),Ke.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),t([]),()=>{Mo.delete(t),!Mo.size&&(Ke?.disconnect(),Ke=void 0,Co=[])}}var Hc=t=>t instanceof Element&&(t.hasAttribute("data-bloom")||!!t.closest("[data-bloom]")),D=t=>!t.length||t.some(e=>!Hc(e.target)),Dc=t=>`"${t.replaceAll("\\","\\\\").replaceAll('"','\\"').replaceAll(`
`,"\\A ")}"`;function Wt(t,e){if(e==null){t.removeAttribute("data-bloom-text"),t.style.removeProperty("--bloom-text-size"),t.style.removeProperty("--bloom-text");return}t.style.setProperty("--bloom-text",Dc(e)),t.getAttribute("data-bloom-text")!==e&&t.setAttribute("data-bloom-text",e)}function g(t){return t}var Nc=new q("Storage");function Ji(t){try{return localStorage.getItem(t)??void 0}catch{return}}function Zi(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch(o){Nc.warn("localStorage write failed",o)}}function Xi(t,e){addEventListener("storage",o=>{o.key===t&&e(o.newValue)})}var Kn="BloomSettings",Uc=100,me={plugins:{}},Lo=new Set,Gn=new Set,Ge;function $i(t){let e=t;for(let o=0;typeof e=="string"&&o<2;o++)e=Ri(e);return!H(e)||!H(e.plugins)||!Object.keys(e.plugins).length?null:e}function _i(){let t=$i(Ji(Kn));t&&(me.plugins=t.plugins)}var ta=(t,e)=>`${t}
${e}`;function ea(){Ge=void 0,Gn.clear(),Zi(Kn,me)}function Fc(t){let e=$i(t);if(!e)return;let o=[];for(let n of new Set([...Object.keys(me.plugins),...Object.keys(e.plugins)])){let r=me.plugins[n]??={},i=H(e.plugins[n])?e.plugins[n]:{};for(let a of new Set([...Object.keys(r),...Object.keys(i)]))Gn.has(ta(n,a))||JSON.stringify(r[a])===JSON.stringify(i[a])||(i[a]===void 0?delete r[a]:r[a]=i[a],o.push([n,a]))}for(let[n,r]of o)for(let i of Lo)i(n,r)}function Yn(){Ge&&(clearTimeout(Ge),ea())}var Lt=(t,e)=>me.plugins[t]?.[e];function Qt(t,e,o){let n=me.plugins[t]??={};o===void 0?delete n[e]:n[e]=o,Gn.add(ta(t,e)),clearTimeout(Ge),Ge=setTimeout(ea,Uc);for(let r of Lo)r(t,e)}function pe(t){return Lo.add(t),()=>void Lo.delete(t)}function jn(t){return t.type==="component"?void 0:t.default}function A(t){let e={def:t,pluginName:"",store:new Proxy({},{get:(o,n)=>Lt(e.pluginName,n)??(t[n]&&jn(t[n])),set:(o,n,r)=>(Qt(e.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(t))t[o].type!=="custom"&&Lt(e.pluginName,o)!==void 0&&Qt(e.pluginName,o)}};return e}var oa=t=>{let e=()=>{let o=Lt("Settings",t);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>e().includes(o),list:e,toggle(o){let n=e();Qt("Settings",t,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},ko=oa("pinnedPlugins"),Bo=oa("starredPlugins");addEventListener("pagehide",Yn);Xi(Kn,Fc);var Po=new q("PluginManager"),et=new Map,kt=new Set,Oo=new Set,Wn=new Set;function na(t){for(let e of t)e.settings&&(e.settings.pluginName=e.name),et.set(e.name,e)}var gt=t=>!!t.required||(Lt(t.name,"enabled")??!!t.enabledByDefault),Qn=t=>kt.has(t),Ye=t=>`plugin-${t.name}`;function ra(t){if(!t.styles)return;let e=typeof t.styles=="function"?t.styles():t.styles;e?So(Ye(t),e):Ue(Ye(t))}function ia(t){if(!kt.has(t.name))try{ra(t),t.start?.(),kt.add(t.name)}catch(e){Ue(Ye(t)),Po.error(`Failed to start ${t.name}`,e)}}function Ro(t){kt.delete(t.name),Ue(Ye(t));try{t.stop?.()}catch(e){Po.error(`Failed to stop ${t.name}`,e)}}var zn=t=>t.startAt??"HostReady";function aa(t){if(gt(t)){Oo.has(zn(t))&&ia(t);return}Ro(t)}function Ho(t){Oo.add(t);for(let e of et.values())zn(e)===t&&aa(e);Po.info(`${t}: ${[...kt].join(", ")}`)}function sa(t){Ro(t)}function la(t){gt(t)&&Oo.has(zn(t))&&ia(t)}function ca(t,e){Qt(t.name,"enabled",e),Yn()}function Kc(){for(let t of et.values())t.required||gt(t)||(kt.has(t.name)?Ro(t):Ue(Ye(t)))}var Io;function ua(){Io?.(),Io=T(()=>Kc())}function da(){Io?.(),Io=void 0;for(let t of et.values())Ro(t);kt.clear(),Oo.clear()}function ma(t){return Wn.add(t),()=>void Wn.delete(t)}pe((t,e)=>{let o=et.get(t);if(o){if(e==="enabled"){typeof Lt(t,"enabled")=="boolean"&&aa(o);for(let n of Wn)n();return}if(kt.has(t))try{ra(o),o.onSettingsChange?.(e)}catch(n){Po.error(`Settings change failed for ${t}`,n)}}});var pa=`/*
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
`;var Yc=new q("Events");function fe(){let t=new Map;return{on(e,o){let n=t.get(e);return n||t.set(e,n=new Set),n.add(o),()=>void n.delete(o)},emit(e,o){for(let n of t.get(e)??[])try{n(o)}catch(r){Yc.error(`Listener for ${String(e)} failed`,r)}}}}function fa(t,e){let o=t instanceof Element?[t,...t.querySelectorAll("*")]:[...t.querySelectorAll("*")];for(let n of o){let r=n.shadowRoot;r&&(e(r),fa(r,e))}}function Bt(t,e=document){let o=[...e.querySelectorAll(t)];return fa(e,n=>o.push(...n.querySelectorAll(t))),o}var ot=(t,e=document)=>Bt(t,e).find(it)??null;var l={rail:"[data-app-navigation-rail]",sidebarScroll:"[data-app-action-sidebar-scroll]",sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"[data-app-action-sidebar-scroll]",oldRail:"[data-app-navigation-rail]",oldProfile:'button[aria-label="Open profile menu" i]',threadRow:"[data-app-action-sidebar-thread-row]",threadSelected:"[data-app-action-sidebar-thread-row][data-app-action-sidebar-thread-selected='true']",threadTitle:"[data-app-action-sidebar-thread-title]",projectRow:"[data-app-action-sidebar-project-row]",projectLabel:"[data-app-action-sidebar-project-label]",destination:"[data-sidebar-destination]",conversationLink:"[data-app-action-sidebar-thread-row]",timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:"[data-turn-key]",turn:"[data-turn-key]",messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",userBubble:'[class~="group/user-message"]',assistantReply:"[data-response-annotation-target]",oldThread:"[data-app-action-timeline-scroll]",turnActions:'.turn-action-controls, [class*="turn-action-controls"]',readAloud:'button:is([aria-label="Read aloud" i], [aria-label^="Read aloud" i], [aria-label="Stop reading" i], [aria-label^="Stop reading" i], [aria-label="\u6717\u8BFB"], [aria-label^="\u6717\u8BFB"], [aria-label="\u505C\u6B62\u6717\u8BFB"], [data-testid*="read-aloud" i])',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery, [class*='recovery']",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composer:"[data-chatgpt-composer], [data-composer-input]",composerInput:'[data-composer-input] [contenteditable="true"].ProseMirror, [contenteditable="true"].ProseMirror',composerConversation:"[data-above-composer-conversation-id]",oldComposerForm:"[data-chatgpt-composer]",sendButton:'button[aria-label="Send" i], button[aria-label="Send prompt" i], button[aria-label="Send message" i]',stopButton:'button[aria-label="Stop" i], button[aria-label^="Stop " i], button[aria-label="\u505C\u6B62" i], button[aria-label^="\u505C\u6B62"]',composerFooter:"[data-chatgpt-composer]",modelTrigger:'button[aria-label="Model selector" i], button[aria-label="Select ChatGPT model" i], [data-chatgpt-composer] button[aria-haspopup="menu"]',modelItem:'[role="menu"] [role="menuitemradio"], [role="menu"] [role="menuitem"]',effortSlider:'[role="menu"] [data-reasoning-slider]',homeHeading:'main h1:not([aria-hidden="true"]), [role="main"] h1:not([aria-hidden="true"]), [data-testid="home-heading"], [data-homepage-takeover] h1, .heading-xl, [class~="heading-xl"]',headerMore:'button[aria-label="More" i], button[aria-label="\u66F4\u591A"]',headerTitle:"[data-thread-title], [data-thread-title-trigger]",profile:'button[aria-label="Open profile menu" i]',rightPanel:"aside[data-app-shell-focus-area='right-panel']",summaryPanel:"[data-summary-panel-variant]"};var ga=/[​-‍﻿]/g,nt=()=>ot(l.composerInput),je=t=>t instanceof HTMLElement&&t.matches(l.composerInput),Z=(t=nt())=>t?.closest("form")??t?.closest(l.composer)??ot(l.composer);function U(t=nt()){if(!t)return"";if(t instanceof HTMLTextAreaElement)return t.value.replace(ga,"").trim();let e=t.cloneNode(!0);for(let n of e.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...e.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:e.textContent??"").replace(ga,"").trim()}var jc=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function ha(t,e){let o=e?"insertText":"deleteContentBackward";t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:o,data:e||null})),t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:o,data:e||null}))}function ht(t,e=nt()){if(!e)return!1;if(e.focus(),e instanceof HTMLTextAreaElement)return jc?.call(e,t),e.dispatchEvent(new Event("input",{bubbles:!0})),e.setSelectionRange(t.length,t.length),!0;let o=getSelection();return o?.selectAllChildren(e),typeof document.execCommand=="function"?t?document.execCommand("insertText",!1,t):document.execCommand("delete"):ha(e,t),U(e)!==t.trim()&&ha(e,t),o?.selectAllChildren(e),o?.collapseToEnd(),!0}function ba(t,e){let o=t;for(;o&&o!==e;){if(o instanceof HTMLElement&&o.parentElement===e)return o;o=o.parentNode}return null}function ya(t,e,o){let n=document.createRange();return n.selectNodeContents(t),o?n.setEnd(e.startContainer,e.startOffset):n.setStart(e.endContainer,e.endOffset),n.toString().includes(`
`)?!0:!!n.cloneContents().querySelector("br")}function Aa(t){if(t instanceof HTMLTextAreaElement){let{selectionStart:v,selectionEnd:L,value:p}=t;return{first:!p.slice(0,v).includes(`
`),last:!p.slice(L).includes(`
`)}}let e=getSelection();if(!e?.rangeCount||!t.contains(e.anchorNode))return{first:!0,last:!0};let o=e.getRangeAt(0),n=[...t.children].filter(v=>v instanceof HTMLElement),r=ba(o.startContainer,t),i=ba(o.endContainer,t),a=!r||r===n[0],d=!i||i===n[n.length-1],c=o.getBoundingClientRect(),u=(r??t).getBoundingClientRect(),m=Number.parseFloat(getComputedStyle(r??t).lineHeight)||24;return c.height?{first:a&&c.top-u.top<m,last:d&&u.bottom-c.bottom<m}:{first:a&&!ya(r??t,o,!0),last:d&&!ya(i??t,o,!1)}}var va=t=>{let e=Z();return(e&&ot(t,e))??ot(t)},Vn=()=>va(l.stopButton),Wc=()=>{let t=va(l.sendButton);return t&&!t.matches(l.stopButton)?t:null};function xa(){let t=Wc();if(t){t.disabled||t.click();return}nt()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var qa=()=>it(Vn());var Do=new q("AppProtocol"),We=fe();function Qc(t){let e=t;if(typeof e=="string")try{e=JSON.parse(e)}catch{return null}if(Array.isArray(e)||!e||typeof e!="object")return null;let o=e,n=o.notification&&typeof o.notification=="object"?o.notification:o;if(typeof n.method!="string")return null;let r=n.params&&typeof n.params=="object"?n.params:void 0;return{method:n.method,params:r}}function Qe(t){if(Array.isArray(t)){for(let o of t)Qe(o);return}let e=Qc(t);e&&We.emit("note",e)}var Zn=new WeakMap,Jn=new WeakMap;function zc(t,e){let o=Zn.get(t);if(o)return o;let n=r=>{Qe(r.data),typeof t=="function"?t.call(e,r):t.handleEvent(r)};return Zn.set(t,n),n}function Vc(){let t=MessagePort.prototype,e=t.addEventListener,o=t.removeEventListener;t.addEventListener=function(r,i,a){return r!=="message"?e.call(this,r,i,a):e.call(this,r,zc(i,this),a)},t.removeEventListener=function(r,i,a){return r!=="message"?o.call(this,r,i,a):o.call(this,r,Zn.get(i)??i,a)};let n=Object.getOwnPropertyDescriptor(t,"onmessage");n?.set&&Object.defineProperty(t,"onmessage",{configurable:!0,enumerable:n.enumerable,get(){return Jn.has(this)?Jn.get(this):n.get?.call(this)},set(r){Jn.set(this,r),n.set.call(this,function(a){Qe(a.data),r?.call(this,a)})}})}function Jc(){let t=window.electronBridge,e=t?.subscribeToWorkerMessages;if(!(!t||typeof e!="function"))try{t.subscribeToWorkerMessages=(o,n)=>e.call(t,o,r=>{Qe(r),n(r)})}catch(o){Do.warn("electronBridge.subscribeToWorkerMessages is not writable",o)}}function Zc(){addEventListener("message",t=>Qe(t.data));try{Vc()}catch(t){Do.warn("MessagePort wrap failed",t)}try{Jc()}catch(t){Do.warn("electronBridge wrap failed",t)}Do.info("Listening for app-server notifications")}Zc();var Xc=new q("AppRoute"),$c=500,Uo=new Set,Fo=null,No;function b(){return(ot(l.threadSelected)??Bt(l.threadSelected)[0])?.getAttribute("data-app-action-sidebar-thread-id")??null}var Ko=()=>!b(),Sa=()=>!1,zt=()=>!1;function wa(){let t=b();if(t===Fo)return;let{href:e}=location,o={prevHref:e,href:e,prevId:Fo,id:t};Fo=t;for(let n of Uo)try{n(o)}catch(r){Xc.error("Route listener failed",r)}}function _c(){let t=new MutationObserver(wa);(()=>{document.body&&t.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-app-action-sidebar-thread-selected","data-app-action-sidebar-thread-id"]})})();let o=setInterval(wa,$c);return()=>{t.disconnect(),clearInterval(o)}}function st(t){return Uo.add(t),No||(Fo=b(),No=_c()),()=>{Uo.delete(t),!Uo.size&&(No?.(),No=void 0)}}var tu=250,eu=400,P=fe(),Vt=!1,ge=null,Xt=!1,Jt="done",Zt=!1,Ea=!1,V=()=>({generating:Vt,conversationId:b()}),ou=t=>{if(!t)return!0;let e=b();return e?e===t||e.endsWith(t)||t.endsWith(e.replace(/^local:/,"")):!0};function nu(t){return t==="interrupted"||t==="aborted"||t==="cancelled"?"stopped":t==="failed"||t==="error"?"error":"done"}function ru(){return Zt||qa()}function iu(t){ge=null,Vt=!1,Zt=!1,P.emit("fall",{conversationId:b(),outcome:t}),Xt=!1,Jt="done"}function au(){let t=ru();t&&!Vt&&(Vt=!0,Xt=!1,Jt="done",P.emit("rise",{conversationId:b()})),t||!Vt?ge=null:ge==null?ge=Date.now():Date.now()-ge>=eu&&iu(Xt?"stopped":Jt)}function ze(){au(),P.emit("tick",V())}function su({prevId:t,id:e}){t!==e&&(Vt&&(Zt=!1,ge=null,Vt=!1,Xt=!1,Jt="done",P.emit("fall",{conversationId:t,outcome:"left"})),P.emit("context",{prevId:t,id:e,migrated:!t&&!!e}),ze())}function lu(t){if(ou(t.params?.threadId)){if(t.method==="turn/started"){Zt=!0,ze();return}if(t.method==="turn/interrupt"){Zt=!1,Jt="stopped",Xt=!0,ze();return}t.method==="turn/completed"&&(Zt=!1,Jt=nu(t.params?.turn?.status),Jt==="stopped"&&(Xt=!0),ze())}}function cu(t){t.target instanceof Element&&t.target.closest(l.stopButton)&&(Xt=!0,Zt=!1)}function Ta(){Ea||(Ea=!0,We.on("note",lu),st(su),document.addEventListener("click",cu,!0),Vi(ze,tu))}var uu="__reactContainer$",Ma="__reactFiber$";function $n(){return document.readyState!=="loading"?Promise.resolve():new Promise(t=>document.addEventListener("DOMContentLoaded",()=>t(),{once:!0}))}var Xn=(t,e)=>Object.keys(t.wrappedJSObject??t).some(o=>o.startsWith(e)),lt=t=>!Xn(document,uu)||Xn(t,Ma);function It(){return document.body?Promise.resolve():new Promise(t=>{let e=new MutationObserver(()=>{document.body&&(e.disconnect(),t())});e.observe(document,{childList:!0,subtree:!0})})}async function _n(){await It();let t=Date.now()+8e3;for(;!Xn(document.body,Ma)&&Date.now()<t;)await new Promise(e=>setTimeout(e,100))}var Ca={BetterNavigator:1793350808e3,BetterQuotes:179333264e4,ChatListStatus:179333264e4,ChatStateFavicons:1790623094e3,Cleaner:1793267811e3,ComposerOpacity:1793344667e3,Continue:1790939902e3,CustomSidebarIdentity:1790658669e3,GreetingCustomizer:1793350808e3,InputHistory:1793351708e3,MessageTimestamps:1791080494e3,NoDictation:1793335268e3,NoShareLink:1790658669e3,NoSidebarIdentity:1790616549e3,PromptQueue:1793267321e3,RecentTopics:179333264e4,ResponseNotification:1790661368e3,Settings:1793351462e3,SidebarIdentityOpacity:1790682605e3,StarChats:1793350808e3,StreamerMode:1793344667e3,TemporaryChat:1792014624e3,UserQuotes:1793345744e3,WiderChat:179333264e4};var x=t=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`,du="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",mu={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${du}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:x('<path d="M18 6 6 18M6 6l12 12"/>'),gear:x('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:x('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:x('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:x('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:x('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:x('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:x('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:x('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:x('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:x('<path d="m6 9 6 6 6-6"/>'),play:x('<path d="M7 4v16l13-8z"/>'),plus:x('<path d="M12 5v14M5 12h14"/>'),check:x('<path d="m5 12 5 5 9-10"/>'),alert:x('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:x('<path d="M4 5h16v11H9l-5 4z"/>'),layout:x('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:x('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:x('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:x('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:x('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:x('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:x('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:x('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:x('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:x('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:x('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:x('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:x('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:x('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:x('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:x('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),ghost:x('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},F=t=>zi(mu[t]);var _t="data-bloom-tip",tr=6,er=8,$t,La=null;function he(t){if(t===La)return;if(La=t,!t){$t?.remove();return}$t??=s("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),$t.textContent=t.getAttribute(_t),document.body.append($t);let e=t.getBoundingClientRect(),{width:o,height:n}=$t.getBoundingClientRect(),r=e.bottom+tr+n<=innerHeight-er;$t.style.left=`${$(e.left+e.width/2-o/2,er,innerWidth-o-er)}px`,$t.style.top=`${r?e.bottom+tr:e.top-tr-n}px`}var ka=t=>t instanceof Element?t.closest(`[${_t}]`):null;function Ba(){let t=new AbortController,e={passive:!0,signal:t.signal};return document.addEventListener("pointerover",o=>he(ka(o.target)),e),document.addEventListener("pointerout",o=>o.relatedTarget||he(null),e),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&he(ka(o.target)),e),document.addEventListener("focusout",()=>he(null),e),document.addEventListener("pointerdown",()=>he(null),e),()=>{t.abort(),he(null)}}function or(t,e,o,n=!1){let r=s("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(t),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let a=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(a)),e(a)}),r}function K(t,e,o){return s("button",{class:Eo("bloom-button",o&&`bloom-button-${o}`),text:t,attrs:{type:"button","data-bloom":"control"},on:{click:e}})}function j(t,e,o,n){let r=s("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":e,"data-bloom":"control",[_t]:e},on:{click:o}},F(t));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function Go(t,e,o,n,r,i){let a=s("input",{attrs:{type:"range",min:String(e),max:String(o),step:String(n)}});a.value=String(t);let d=s("output",{text:`${a.value}${r}`});return a.addEventListener("input",()=>{d.textContent=`${a.value}${r}`,i(Number(a.value))}),s("div",{class:"bloom-slider"},a,d)}function nr(t,e,o){let n=s("select",{class:"bloom-select"},...e.map(r=>s("option",{text:r.label,attrs:{value:r.value}})));return n.value=t,n.addEventListener("change",()=>o(n.value)),n}function Ve(t,e,o="",n="text"){let r=s("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=t,r.addEventListener("change",()=>e(r.value)),r}var pu=new q("SettingsPanel"),f=k("bloom-settings-"),fu=10080*60*1e3,gu=3e3,Ia="Toggle features. Some need a reload. Click the sliders icon to configure.",hu=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],bu=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],yu={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},Oa=new Set(["chat","ui","privacy"]),G=null,ee="all",rr="all",Yo="",ir=[],Ra=()=>[...et.values()].filter(t=>!t.hidden),Au=t=>!!t.updatedAt&&Date.now()-t.updatedAt<fu;function vu(t){switch(ee){case"favorites":return Bo.has(t.name);case"recent":return Au(t);case"all":return!0;case"other":return!t.tags.some(e=>Oa.has(e));case"chat":case"ui":case"privacy":return t.tags.includes(ee)}}function xu(t){switch(rr){case"all":return!0;case"enabled":return gt(t);case"disabled":return!gt(t)}}function qu(t){let e=Yo.trim().toLowerCase();return!e||[t.name,t.description,...t.tags].some(o=>o.toLowerCase().includes(e))}function wu(t){let e=ko.list(),o=n=>e.includes(n.name)?e.indexOf(n.name):e.length;return ee==="recent"?t.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):t.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var Ha=t=>t.settings?.def??{},Su=t=>Object.values(Ha(t)).some(e=>e.type!=="custom");function Eu(t,e,o){let n=Lt(t.name,e)??jn(o),r=i=>Qt(t.name,e,i);switch(o.type){case"boolean":return or(n,r,o.description??e);case"slider":return Go(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return nr(n,o.options,r);case"string":return Ve(n,r,o.placeholder);case"number":return Ve(String(n),i=>r(Number(i)),"","number");case"component":{let i=s("div",{class:f("component")});return ir.push(o.render(i)),i}case"custom":return null}}var Tu=t=>t.replaceAll(/([A-Z])/g," $1").replace(/^./,e=>e.toUpperCase());function Da(t){if(!G)return;let e=Object.entries(Ha(t)).filter(([,i])=>i.type!=="custom").map(([i,a])=>{let d=Eu(t,i,a),c=a.type==="boolean",u=a.type!=="component"&&s("div",{class:f("field-label"),text:Tu(i)}),m=a.description&&s("div",{class:f("field-desc"),text:a.description});return s("div",{class:f("field",c?"field-inline":"field-stacked")},(u||m)&&s("div",{class:f("field-text")},u,m),d)}),o,n=K("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},gu);return}clearTimeout(o),t.settings?.reset(),Je(),Da(t)},"danger"),r=s("div",{class:f("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&Je()}},s("div",{class:f("popup"),attrs:{role:"dialog","aria-label":`${t.name} settings`}},s("div",{class:f("popup-header")},s("div",{class:f("card-icon")},F(t.icon)),s("div",{class:f("popup-title")},s("div",{class:f("card-name"),text:t.name}),s("div",{class:f("popup-authors"),text:t.authors.join(", ")})),j("close","Close",Je)),s("p",{class:f("popup-desc"),text:t.description}),s("div",{class:f("fields")},...e),s("div",{class:f("popup-footer")},n)));G.querySelector(`.${f("modal")}`)?.append(r)}function Je(){for(let t of ir)t();ir=[],G?.querySelector(`.${f("popup-backdrop")}`)?.remove()}function Pa(t){let e=gt(t),o=Bo.has(t.name),n=ko.has(t.name),r=!!t.required;return s("div",{class:[f("card",e?"card-on":"card-off"),r?f("card-required"):""].filter(Boolean).join(" ")},s("div",{class:f("card-top")},s("div",{class:f("card-icon")},F(t.icon)),s("div",{class:f("card-actions")},j("star",o?"Unstar":"Star",()=>{Bo.toggle(t.name),te()},o),r?null:j("pin",n?"Unpin":"Pin to top",()=>{ko.toggle(t.name),te()},n),r?s("span",{class:f("required-mark"),attrs:{"aria-label":"Required",[_t]:"This plugin is required for Bloom++ to work"}},F("alert")):null,Su(t)&&j("gear","Settings",()=>Da(t)),or(e,i=>ca(t,i),r?`${t.name} is required`:`Enable ${t.name}`,r))),s("div",{class:f("card-name"),text:t.name}),s("div",{class:f("card-desc"),text:t.description,title:t.description}),s("div",{class:f("card-footer"),text:t.authors.join(", ")}))}function Na(){let t=Ra().some(o=>!o.tags.some(n=>Oa.has(n)));G?.querySelector(`.${f("tabs")}`)?.replaceChildren(...hu.filter(o=>o.id!=="other"||t).map(o=>s("button",{class:f("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===ee)},on:{click:()=>{ee=o.id,Na(),te()}}})))}function te(){if(!G)return;let t=Ra().filter(vu),e=G.querySelector(`.${f("search")} input`);e&&(e.placeholder=`Search ${Pi(t.length,"plugin")}...`);let o=wu(t.filter(u=>qu(u)&&xu(u))),n=ee==="all",r=n?o.filter(u=>!u.required):o,i=n?o.filter(u=>u.required):[],a=[...r.map(Pa),...i.length?[s("div",{class:f("required-break"),attrs:{role:"separator"}}),...i.map(Pa)]:[]],d=Yo.trim()?"No plugins match your search.":yu[ee]??"No plugins available.";G.querySelector(`.${f("grid")}`)?.replaceChildren(...a.length?a:[s("div",{class:f("empty"),text:d})])}function Mu(t){t.key==="Escape"&&(t.preventDefault(),t.stopPropagation(),G?.querySelector(`.${f("popup-backdrop")}`)?Je():Pt())}var Ua,ar;function Cu(){if(G)return;let t=s("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});t.value=Yo,t.addEventListener("input",()=>{Yo=t.value,te()}),G=s("div",{class:`bloom-root ${f("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:e=>e.target===e.currentTarget&&Pt()}},s("div",{class:f("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},s("div",{class:f("header")},s("div",{class:f("logo")},F("bloom")),s("h2",{class:f("title"),text:"Bloom++"}),s("span",{class:f("hint"),attrs:{"aria-label":Ia,tabindex:"0",[_t]:Ia}},F("info")),s("span",{class:f("version"),text:"v2.0.91"}),j("close","Close",Pt)),s("div",{class:f("tabs"),attrs:{role:"tablist"}}),s("div",{class:f("toolbar")},s("label",{class:f("search")},F("search"),t),nr(rr,bu,e=>{rr=e,te()})),s("div",{class:f("grid")}))),G.addEventListener("keydown",e=>e.stopPropagation()),ar=new AbortController,document.addEventListener("keydown",Mu,{capture:!0,signal:ar.signal}),document.body.append(G),Na(),te(),Ua=ma(te),t.focus(),pu.debug("Opened")}function Pt(){Je(),ar?.abort(),Ua?.(),G?.remove(),G=null}var be=()=>G?Pt():Cu(),Fa=()=>!!G;var Ka=new q("AppLandmarks"),Lu={Settings:[l.rail],WiderChat:[":root"],StreamerMode:[l.sidebarScroll,l.rail],ComposerOpacity:[l.composer,l.composerInput],ResponseNotification:[l.composerInput],InputHistory:[l.composerInput],Continue:[l.composerInput],ChatListStatus:[l.sidebarScroll],StarChats:[l.turn],BetterNavigator:[l.timelineScroll,l.turn],BetterQuotes:[l.turn],MessageTimestamps:[l.turn],RecentTopics:[l.sidebarScroll]};function Ga(){for(let[t,e]of Object.entries(Lu)){let o=et.get(t);if(!o||o.required||!gt(o))continue;if(!e.some(r=>ot(r))){if(!Qn(o.name))continue;sa(o),Ka.warn(`${t} paused; missing ${e.join(", ")}`);continue}Qn(o.name)||(la(o),Ka.info(`${t} resumed`))}}function Ya(){return Ga(),T(()=>Ga())}var Ph=new q("Route"),ku=/\/c\/(?!local-)([\w-]+)/;var Bu=()=>location.pathname.match(ku)?.[1]??null;var Oh=location.href,Rh=Bu();var Iu=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,Pu=/\S+@\S+\.\S+/,Ou=3;var Ru=t=>!!t.closest(".sr-only");function Hu(t){return[...t.querySelectorAll("*")].filter(e=>!e.children.length&&!e.closest("[data-bloom]")&&!!h(e.textContent??"")&&!(e instanceof SVGElement))}var Du=t=>{if(/rounded-full/.test(t.getAttribute("class")??""))return!0;if(!t.clientWidth)return!1;let{borderRadius:e}=getComputedStyle(t);return e.includes("%")||Number.parseFloat(e)>=t.clientWidth/2};function jo(t,e,o){for(let n of t.querySelectorAll(`[${e}]`))n!==o&&n.removeAttribute(e);o&&!o.hasAttribute(e)&&o.setAttribute(e,"")}function Nu(t,e){if(h(t.textContent??"").length>Ou)return null;let o=t.closest("button");for(let n=t;n&&n!==e&&n!==o;n=n.parentElement)if(Du(n))return n;return null}function Wo(t,e){t.hasAttribute(`data-bloom-${e}`)||t.setAttribute(`data-bloom-${e}`,"");let o=t.querySelector("img:not([data-bloom] img)"),n=Hu(t),r=o?null:n.map(m=>Nu(m,t)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),a=(i&&i!==t&&t.contains(i)?i:o??r)??t.querySelector("[class*=rounded-full]:not([data-bloom] *)");jo(t,`data-bloom-${e}-avatar`,a);let d=n.filter(m=>!a?.contains(m)&&!Ru(m)),c=d.find(m=>Iu.test(h(m.textContent??""))),u=d.find(m=>Pu.test(m.textContent??""));jo(t,`data-bloom-${e}-plan`,c),jo(t,`data-bloom-${e}-email`,u),jo(t,`data-bloom-${e}-name`,d.find(m=>m!==c&&m!==u))}var ja=()=>Bt(l.rail).filter(it);function Wa(t){return ot(l.profile,t)??[...t.querySelectorAll(l.menuButton)].findLast(it)??null}function Uu(t,e){return[...t.children].find(n=>n instanceof HTMLElement&&n!==e&&n.contains(e))??e}function Qa(){return ja().flatMap(t=>{let e=Wa(t);if(!e)return[{kind:"rail",anchor:t,insert:n=>t.append(n)}];let o=Uu(t,e);return[{kind:"rail",anchor:o,insert:n=>(o===e?t:o).append(n)}]})}var sr=()=>ja().map(Wa).filter(t=>t!=null);function Fu(t){let e=t.getAttribute("aria-expanded")==="true"&&t.getAttribute("aria-controls"),o=e?document.getElementById(e):null;return o?.matches('[role="menu"]')?o:null}function Qo(){return sr().map(Fu).find(t=>t!=null)??Bt('[role="menu"]').find(t=>!t.closest("[data-bloom]")&&/log ?out|sign out|退出/i.test(t.textContent??""))??null}var Ze=t=>Bt(l.threadRow).filter(e=>e.getAttribute("data-app-action-sidebar-thread-id")===t);function Xe(t){let e=Ze(t)[0]??Bt(l.threadRow).find(n=>{let r=n.getAttribute("data-app-action-sidebar-thread-id")??"";return r.endsWith(t)||t.endsWith(r.replace(/^local:/,""))});return(e?.getAttribute("data-app-action-sidebar-thread-title")??h(e?.textContent??""))||null}function za(t){return null}var lr=0,zo;function Ku(t){if(!D(t))return;for(let o of sr())Wo(o,"profile");let e=Qo();e&&Wo(e,"menu")}function ct(){lr++;let t=!0;return It().then(()=>{t&&lr&&!zo&&(zo=T(Ku))}),()=>{t&&(t=!1,!--lr&&(zo?.(),zo=void 0))}}var Va=`/*
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
    padding: 1.25rem;
    border-radius: 1.25rem;
    background: var(--bloom-surface);
    box-shadow: var(--bloom-shadow);
    overflow: hidden;
}

.bloom-settings-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
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
    overflow-y: auto;
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
`;var Ot=k("bloom-entry-"),Yu=4,ur="--bloom-entry-x",dr=1,ye=A({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar. The account menu and the userscript menu always open the panel.",default:!1},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:!0},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:t=>(t.append(K("Reset position",()=>{ye.store.entryPosition=dr})),()=>t.replaceChildren())},entryPosition:{type:"custom",default:dr}}),oe=new Map,Ja=!1,cr=[];function ju(t,e,o){let n=t.currentTarget,r=e.clientWidth-n.offsetWidth;if(t.button!==0||r<=0||!e.classList.contains(Ot("hover")))return;let i=ye.store.entryPosition,a=i,d=!1,c=new AbortController;n.setPointerCapture(t.pointerId),n.addEventListener("pointermove",m=>{!d&&Math.abs(m.clientX-t.clientX)<Yu||(d=!0,o(),a=$(i+(m.clientX-t.clientX)/r,0,dr),e.style.setProperty(ur,String(a)))},{signal:c.signal});let u=()=>{c.abort(),d&&(ye.store.entryPosition=a,e.style.removeProperty(ur))};n.addEventListener("pointerup",u,{signal:c.signal}),n.addEventListener("lostpointercapture",u,{signal:c.signal})}function Wu(t){let e=!1,o=s("button",{class:Ot("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),e||be(),e=!1},pointerdown:r=>{e=!1,t!=="rail"&&ju(r,n,()=>{e=!0})}}},F("bloom"),t!=="rail"&&s("span",{class:Ot("label"),text:"Bloom++"})),n=s("div",{class:`bloom-root ${Ot("wrap")} ${Ot(t)}`,attrs:{"data-bloom":"entry"}},o);return n}function Qu(t){let e=s("div",{class:`bloom-root ${Ot("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),t.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),be()}}},F("bloom"),s("span",{text:"Bloom++"})),o=t.querySelector('[role="menuitem"]');o?.parentElement?o.before(e):t.prepend(e)}function Za(){for(let t of document.querySelectorAll('[data-bloom="entry"], [data-bloom="menu-entry"]'))t.remove();oe.clear()}function Xa(){let{showSidebarEntry:t,showSidebarEntryOnHover:e}=ye.store,o=t||e?Qa():[],n=new Set(o.map(i=>i.anchor));for(let[i,a]of oe)i.isConnected&&n.has(i)||(a.remove(),oe.delete(i));for(let i of document.querySelectorAll('[data-bloom="entry"]'))[...oe.values()].includes(i)||i.remove();for(let i of o){let a=oe.get(i.anchor);if(a?.isConnected||!lt(i.anchor))continue;let d=a??Wu(i.kind);oe.set(i.anchor,d),i.insert(d)}for(let i of oe.values())i.classList.toggle(Ot("hover"),!t);let r=Qo();r&&!r.querySelector('[data-bloom="menu-entry"]')&&Qu(r)}var $a=g({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:ye,styles:()=>`${Va}[data-app-navigation-rail] [data-bloom=entry]{position:absolute;inset:auto;left:50%;bottom:100%;transform:translateX(-50%);width:max-content;margin:0;padding-block:0.25rem;pointer-events:none;z-index:5;display:flex;justify-content:center}[data-app-navigation-rail]>[data-bloom=entry]{bottom:2.75rem}[data-app-navigation-rail] [data-bloom=entry] .bloom-entry-button{pointer-events:auto}[data-app-navigation-rail] [data-bloom=entry].bloom-entry-hover:not(:hover > *){display:none;transition:display 0s 0.2s allow-discrete}.${Ot("hover")}{${ur}:${ye.store.entryPosition}}`,start(){Za(),cr=[T(Xa),Ba(),ct()],!Ja&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",be),Ja=!0)},stop(){for(let t of cr)t();cr=[],Za(),Pt()},onSettingsChange:Xa});var hr=new q("AppNetwork"),bt=fe(),Vo=new Map,_a=new Map;var zu=t=>t==="user"||t==="assistant";function ts(t){let e=t.replace(/^local:/,"");return[...new Set([t,e,`local:${e}`])]}function es(t){let e=ts(t);for(let n of e){let r=Vo.get(n);if(r)return r}let o={id:e[0]??t,title:null,chain:[],times:new Map};for(let n of e)Vo.set(n,o);return o}function yt(t){if(!t)return null;$u(t);let e=ts(t);return e.map(o=>Vo.get(o)).find(o=>o&&(o.chain.length||o.title))??Vo.get(e[0]??t)??null}function pr(t,e,o,n=null){return{id:t,role:e,createTime:n,text:h(o),hasFiles:!1,imageCount:0}}function fr(t,e){let o=t.chain.find(r=>r.id===e.id);if(o){e.text&&(o.text=e.text),e.createTime!=null&&(o.createTime=e.createTime);return}if(t.chain.find(r=>r.role===e.role&&r.text&&r.text===e.text)){!t.times.has(e.id)&&e.createTime!=null&&t.times.set(e.id,e.createTime);return}t.chain.push(e)}function os(t){let e=t.chain.map(o=>`${o.id}	${o.role}	${o.text}`).join(`
`);_a.get(t.id)!==e&&(_a.set(t.id,e),bt.emit("conversation",t))}function Vu(t){if(typeof t=="function")try{return h(String(t()??""))}catch(e){return hr.warn("Turn label failed",e),""}return typeof t=="string"?h(t):""}function Ju(t){if(typeof t!="function")return"";try{let e=t();return typeof e=="string"?h(e):H(e)&&typeof e.response=="string"?h(e.response):""}catch(e){return hr.warn("Turn preview failed",e),""}}function Zu(t){let e=Object.keys(t).find(o=>o.startsWith("__reactFiber$")||o.startsWith("__reactInternalInstance$"));return e?t[e]??null:null}function gr(t,e,o,n){if(!t||e>24)return;let r=(H(t.memoizedProps)?t.memoizedProps:null)??(H(t.pendingProps)?t.pendingProps:null);r&&(Array.isArray(r.items)&&H(r.items[0])&&typeof r.items[0].turnKey=="string"&&!o.length&&o.push(...r.items.filter(H)),Array.isArray(r.entries)&&H(r.entries[0])&&typeof(r.entries[0].historyEntityKey??r.entries[0].turnId)=="string"&&!n.length&&n.push(...r.entries.filter(H))),gr(t.child??null,e+1,o,n),gr(t.sibling??null,e,o,n)}function Xu(t,e){let o=typeof e.turnId=="string"?e.turnId:"",n=typeof e.turnKey=="string"?e.turnKey:"";return t.find(r=>{let i=typeof r.turnKey=="string"?r.turnKey:"";return!!i&&(o===i||n.endsWith(i)||n.includes(i))})??null}function $u(t){let e=document.querySelector("[data-thread-find-target='conversation']")??document.querySelector(l.timelineScroll);if(!e)return;let o=[],n=[];try{gr(Zu(e),0,o,n)}catch(d){hr.warn("Fiber walk failed",d);return}if(!n.length&&!o.length)return;let r=n.length?n:o,i=typeof r[0]?.conversationId=="string"?r[0].conversationId:t,a=es(i);a.title=Xe(t)??Xe(i)??a.title;for(let d of r){let c="";typeof d.turnId=="string"?c=d.turnId:typeof d.turnKey=="string"&&(c=d.turnKey.replace(/^.*turn:/,""));let u=typeof d.historyEntityKey=="string"?d.historyEntityKey:c?`turn:${c}`:"",m=Xu(o,d),v=Vu(m?.getLabel??d.getLabel),L=Ju(m?.getPreview??d.getPreview),p=typeof d.timestampSeparatorAtMs=="number"?d.timestampSeparatorAtMs:null;u&&v&&(fr(a,pr(u,"user",v,p)),p&&a.times.set(u,p)),c&&L&&fr(a,pr(`${c}:assistant`,"assistant",L,p))}os(a)}function _u(t){if(zu(t.role))return t.role;let e=typeof t.type=="string"?t.type:typeof t.itemType=="string"?t.itemType:"";return/user/i.test(e)?"user":/agent|assistant/i.test(e)?"assistant":null}function td(t){return typeof t.text=="string"?t.text:typeof t.content=="string"?t.content:H(t.content)&&typeof t.content.text=="string"?t.content.text:""}function mr(t,e){if(!t||!H(e))return;let o=typeof e.id=="string"?e.id:typeof e.itemId=="string"?e.itemId:"",n=_u(e),r=td(e);if(!o||!n)return;let i=es(t);fr(i,pr(o,n,r)),os(i)}function ed(t){let e=t.params?.thread,o=t.params?.threadId??(H(e)&&typeof e.id=="string"?e.id:void 0);t.params?.item&&mr(o,t.params.item);for(let n of t.params?.items??[])mr(o,n);if(H(e)&&Array.isArray(e.items))for(let n of e.items)mr(o,n)}We.on("note",ed);var od=["data-turn","data-message-author-role"],nd=/:(user|assistant)$/,br=`${l.messageUnit}, ${l.oldMessage}`,Zo=t=>t==="user"||t==="assistant",as=()=>!!document.querySelector(l.timelineScroll),ss=()=>!!at(l.timelineScroll),ls=()=>b()??document.querySelector(l.composerConversation)?.getAttribute("data-above-composer-conversation-id")??"",Xo=()=>as()?at(l.timelineScroll):document;function _e(){if(as())return at(l.timelineScroll);let t=document.querySelector(l.turn);for(let e=t?.parentElement;e;e=e.parentElement){let{overflowY:o}=getComputedStyle(e);if((o==="auto"||o==="scroll")&&e.scrollHeight>e.clientHeight)return e}return document.scrollingElement}var Rt=t=>{let e=t.getAttribute("data-chatgpt-search-unit-key")?.match(nd)?.[1];return Zo(e)?e:t.matches(l.userBubble)?"user":t.matches(l.assistantReply)||t.matches(l.assistantMarkdown)?"assistant":null},cs=t=>{let e=[...t.querySelectorAll(l.searchUnit)].filter(n=>Rt(n)&&!n.parentElement?.closest(l.searchUnit));return e.length?e:[...t.querySelectorAll(`${l.userBubble}, ${l.assistantReply}`)].filter(n=>Rt(n)&&!n.parentElement?.closest(`${l.userBubble}, ${l.assistantReply}`))},ns=t=>(t.getAttribute("data-chatgpt-search-message-ids")??t.getAttribute("data-message-id")??t.getAttribute("data-response-annotation-target"))?.split(/\s+/).filter(Boolean)??[];function $e(t){let e=ns(t);if(e.length)return e;let o=[...new Set([...t.querySelectorAll(br)].flatMap(ns))];if(o.length)return o;let n=t.closest("[data-turn-key]")?.getAttribute("data-turn-key")?.replace(/^history-content:/,"");return n&&Rt(t)==="user"?[n]:[]}function Ae(t=Xo()){if(!t)return[];let e=cs(t);return e.length?e:[...t.querySelectorAll(br)].filter(o=>!o.parentElement?.closest(br))}function rd(t,e){for(let o=t.length-1;o>=0;o--){let n=e.find(r=>r.id===t[o]);if(n)return n.role}return null}function id(t){for(let e of od){let o=t.getAttribute(e)??t.querySelector(`[${e}]`)?.getAttribute(e);if(Zo(o))return o}return t.querySelector(l.markdown)||t.querySelector(l.generatedImage)?"assistant":null}var ad=t=>!t.parentElement?.closest(l.turn);function Ht(){let t=yt(b())?.chain??[];return[...Xo()?.querySelectorAll(l.turn)??[]].filter(ad).flatMap(o=>{let n=cs(o),r=n.length?n.map(i=>({el:i,known:Rt(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=u=>!n.some(m=>m.contains(u))&&h(u.textContent??""),a=[...o.querySelectorAll(l.assistantMarkdown)].find(u=>i(u)&&!Jo.test(h(u.textContent??""))),d=[...o.querySelectorAll(l.activityHeader)].findLast(i),c=a??d;c&&r.push({el:c,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?$e(o):Ae(o).flatMap($e),a=n??id(o)??rd(i,t)??(r%2?"assistant":"user"),d=o.closest(l.turn)??o,c=!o.closest(l.searchUnit)&&!!d.querySelector(l.turnBusy),u=a==="assistant"&&(o.matches(l.turnBusy)||!!o.querySelector(l.turnBusy)||c);return{el:o,role:a,messageIds:i,streaming:u}})}var sd="[data-bloom], .sr-only",us=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,Jo=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,rs=new WeakMap;function ve(t){let o=(t.el.closest(l.turn)??t.el).textContent?.length??0,n=rs.get(t.el);if(n?.length===o)return n.summary;let r=ld(t);return rs.set(t.el,{length:o,summary:r}),r}function is(t){let e=new Set,o=[];for(let n of t.querySelectorAll(l.assistantMarkdown)){if(n.closest(l.searchUnit))continue;let r=h(n.textContent??"");!r||Jo.test(r)||us.test(r)||e.has(r)||(e.add(r),o.push(r))}return o}function ld(t){let e=t.el.querySelectorAll(l.generatedImage).length;if(t.role==="assistant"&&e)return e>1?`Image \xD7${e}`:"Image";let o=t.el.closest(l.turn);if(t.role==="assistant"&&o&&t.el.matches(l.assistantMarkdown)&&!t.el.closest(l.searchUnit)){let c=is(o);if(c.length)return c.join(" \xB7 ")}let n=t.el.querySelector(t.role==="assistant"?`${l.markdown}, ${l.assistantMarkdown}`:".whitespace-pre-wrap")??t.el,i=[...n.querySelectorAll(sd)].map(c=>h(c.textContent??"")).filter(Boolean).reduce((c,u)=>c.replace(u,`
`),n.innerText||n.textContent||""),a=i.split(`
`).map(h).filter(c=>c&&!us.test(c)&&!Jo.test(c));if(a.length)return a.join(" ");if(t.role==="assistant"&&o){let c=is(o);if(c.length)return c.join(" \xB7 ")}let d=i.split(`
`).map(h).filter(c=>Jo.test(c));return d.length?d.at(-1)??"":t.role==="user"&&t.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function $o(t){return t.text?h(t.text):t.imageCount?t.imageCount>1?`Image \xD7${t.imageCount}`:"Image":t.hasFiles?"File":""}var yr=t=>t.matches(l.timelineScroll)&&getComputedStyle(t).flexDirection==="column-reverse";var cd=80,ud=420;function Ar(t,e,o){return(t.x-o.x)*(e.y-o.y)-(e.x-o.x)*(t.y-o.y)}function dd(t,e,o,n){let r=Ar(t,e,o),i=Ar(t,o,n),a=Ar(t,n,e);return!((r<0||i<0||a<0)&&(r>0||i>0||a>0))}function md(t,e){let o=(e.left+e.right)/2-(t.left+t.right)/2,n=(e.top+e.bottom)/2-(t.top+t.bottom)/2;if(Math.abs(o)>=Math.abs(n)){let i=o<0?e.right:e.left;return[{x:i,y:e.top},{x:i,y:e.bottom}]}let r=n<0?e.bottom:e.top;return[{x:e.left,y:r},{x:e.right,y:r}]}function ds(t,e){let o=$(t.x,e.left,e.right),n=$(t.y,e.top,e.bottom);return Math.hypot(t.x-o,t.y-n)}function _o(t){let e=t.closeDelay??cd,o=t.towardDelay??ud,n=0,r=!1,i=null,a=null,d=()=>{document.removeEventListener("pointermove",p,!0)},c=()=>{n&&window.clearTimeout(n),n=0,d(),i=null,a=null},u=()=>{c(),r&&(r=!1,t.setHeld(!1))},m=()=>{r||(r=!0,t.setHeld(!0))},v=w=>{n&&window.clearTimeout(n),n=window.setTimeout(u,w)},L=w=>{let W=t.panel(),Yt=t.trigger();if(!W||!i)return!1;let Q=W.getBoundingClientRect();if(Q.width<=0&&Q.height<=0)return!1;let ft=Yt?.getBoundingClientRect(),[J,Dn]=ft&&(ft.width||ft.height)?md(ft,Q):[{x:Q.left,y:Q.top},{x:Q.right,y:Q.bottom}];return dd(w,i,J,Dn)?!0:a!=null&&ds(w,Q)<ds(a,Q)-.25},p=w=>{let W={x:w.clientX,y:w.clientY};if(t.over(w.target)){c();return}L(W)?v(o):u(),a=W};return{enter(){c()},leave(w){if(t.over(w.relatedTarget)){c();return}i={x:w.clientX,y:w.clientY},a=i,m(),document.addEventListener("pointermove",p,!0),v(e)},dispose(){c(),r=!1}}}var ms=`/*
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
`;var E=k("bloom-nav-"),on=80,fd=1200,gd=2,ps=3e4,hd=200,bd=.9,yd=.28,Ad=24,xe=8,vd=80,xd=12,vr=80,bs=`${l.rightPanel}, ${l.summaryPanel}`,qd={user:"\u2753",assistant:"\u{1F916}"},wd=["wheel","touchmove","pointerdown"],rn=A({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),y=null,B=[],X=-1,ne=-1,qe=null,re="",qr=0,wr=[],no=null,tn=null,en=new Set,At,to,vt,Sr="",eo=[],nn=null,Er=new Set,Sd=t=>rn.store.showAssistant||t.role==="user",Ed=t=>t.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||t.messageIds[0]||t.role;function Td(t){return{role:t.role,summary:ve(t),ids:t.messageIds,turn:t,streaming:t.streaming}}function ys(t,e){let o=t.entries.at(-1);if(o?.role==="assistant"&&e.role==="assistant"){t.entries[t.entries.length-1]={...e,ids:[...new Set([...o.ids,...e.ids])]};return}t.entries.push(e)}function Md(){let t=[];for(let e of Ht()){let o=Td(e),n=Ed(e),r=t.at(-1);r?.key===n?ys(r,o):t.push({key:n,entries:[o]})}return t}function Cd(){let t=[];for(let e of yt(b())?.chain??[]){let o={role:e.role,summary:$o(e),ids:[e.id],turn:null,streaming:!1},n=t.at(-1);e.role==="assistant"&&n?ys(n,o):t.push({key:e.id,entries:[o]})}return t}var we=t=>t.entries.flatMap(e=>e.ids);function Tr(t,e){let o=new Set(we(t));return we(e).some(n=>o.has(n))}var ie=t=>h(t.entries.find(e=>e.role==="user")?.summary??""),xr=(t,e)=>t.filter(o=>ie(o)===e).length,Mr=t=>({...t,turn:null,streaming:!1});function Ld(t,e){let o=new Set(e.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return t.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return Mr(r);let a=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return a&&a!==n.key?Mr(r):r})}))}function kd(t,e){let o=e.entries.map((n,r)=>{let i=t.entries[r];if(!i)return n;let a=[...new Set([...n.ids,...i.ids])];return{...n,ids:a,summary:n.summary||i.summary}});for(let n of t.entries.slice(o.length))o.push(Mr(n));return{key:t.key,entries:o}}function As(){let t=_e();if(!t)return!1;let e=t.clientHeight-t.scrollHeight;return t.scrollTop-e<=Math.abs(t.scrollTop)}function Bd(t,e){let o=Ld(t,e);if(!e.length)return o;if(!o.length)return e;let n=e.findIndex(c=>o.some(u=>u.key===c.key));if(n<0)return As()?e.concat(o):o.concat(e);let r=e[n]?.key,i=o.findIndex(c=>c.key===r),a=o.slice(0,i).concat(e.slice(0,n),o.slice(i)),d=a.findIndex(c=>c.key===r);for(let c=n;c<e.length;c++){let u=e[c];if(!u)continue;let m=a.findIndex(v=>v.key===u.key);if(m>=0){let v=a[m];v&&(a[m]=kd(v,u)),d=m}else a.splice(d+1,0,u),d++}return a}function Id(t,e){let o=0,n=0,r=0;for(let i=1-t.length;i<e.length;i++){let a=0,d=0;for(let u=0;u<t.length;u++){let m=e[u+i],v=t[u];!m||!v||(Tr(v,m)?(a+=3,d++):ie(v)&&ie(v)===ie(m)&&a++)}let c=As()?i<r:i>r;(a>o||a===o&&d>n||a===o&&d===n&&c)&&(o=a,n=d,r=i)}return{score:o,offset:r}}function Pd(t,e){let o=t.entries.map((n,r)=>{let i=e.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of e.entries.slice(o.length))o.push({...n,turn:null});return{key:t.key,entries:o}}function Od(t){return t.map(e=>({key:e.key,entries:e.entries.map(o=>({...o}))}))}function Rd(t,e){if(!e.length)return t;if(!t.length)return e;let{score:o,offset:n}=Id(t,e),r=Od(t);if(o>0)for(let d=0;d<r.length;d++){let c=e[d+n],u=r[d];if(!c||!u)continue;let m=ie(u),v=!!m&&m===ie(c)&&xr(t,m)===1&&xr(e,m)===1;(Tr(u,c)||v)&&(r[d]=Pd(u,c))}let i=[],a=[];for(let d=0;d<e.length;d++){let c=e[d];if(!c)continue;let u=ie(c);!u||xr(r,u)>0||r.some(m=>Tr(m,c))||(o>0&&d<n?i.push(c):a.push(c))}return i.concat(r,a)}var Cr=t=>t.entries.some(e=>e.turn?.el.isConnected);function Hd(t,e,o){let n=t.findIndex(i=>we(i).includes(e));if(n>=0)return n+1;let r=t.find(Cr);return o&&r&&we(r).includes(o)?0:t.length}function Dd(t){if(nn){let{parent:e,user:o}=nn;for(let n of t.slice(Hd(t,e,o))){let r=we(n);if(!Cr(n)&&!(o&&r.includes(o)))for(let i of r)Er.add(i)}}return t.filter(e=>Cr(e)||!we(e).some(o=>Er.has(o)))}function vs(){eo=[],nn=null,Er.clear()}function Nd(){let t=ls();t!==Sr&&(Sr=t,vs());let e=Md(),o=Cd();return!e.length&&!o.length&&!ss()?(eo=[],[]):(eo=Dd(Rd(Bd(eo,e),o)),eo.flatMap(n=>n.entries).filter(Sd))}function Ud(t){for(let o of t)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!V().generating||t.some(o=>o.streaming))return;let e=t.at(-1);e&&(e.role==="assistant"||!rn.store.showAssistant?e.streaming=!0:t.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function xs(){let t=Nd();return Ud(t),t}function qs(t){let e=t.getBoundingClientRect(),o=Z()?.getBoundingClientRect().top,n=Math.min(e.bottom,o&&o>e.top?o:e.bottom);return{top:e.top,bottom:n}}function ws(t){return((t.matches(".whitespace-pre-wrap, .markdown, .prose, [data-markdown-text-style]")?t:t.querySelector(".whitespace-pre-wrap")??t.querySelector(".markdown, .prose, [data-markdown-text-style]"))??t).getBoundingClientRect().top}function fs(t){let e=B[t]?.turn?.el;return e?.isConnected?e:null}function Fd(t){if(!B.length)return null;let e=t.scrollHeight-t.clientHeight,o=yr(t),n=Math.min(t.scrollTop,0),r=o?-n:e-t.scrollTop,i=o?e+n:t.scrollTop,a=e<=xe||r<=xe,d=e>xe&&i<=xe,{top:c,bottom:u}=qs(t),m=fs(0),v=m?ws(m):Number.NaN,L=!!m&&v>=c-xe&&v<=c+48,p=fs(B.length-1),w=p?.getBoundingClientRect().bottom??Number.NaN,W=!!p&&w<=u+xe&&w>=u-vd;return a||W?"bottom":d||L?"top":null}function Kd(t){let{top:e,bottom:o}=qs(t),n=e+Math.max(o-e,0)*yd,r=[],i=-1;if(B.forEach((d,c)=>{let u=d.turn?.el;if(!u?.isConnected){r.push(Number.NaN);return}let m=ws(u);r.push(m),i<0&&(i=c),m<=n&&(i=c)}),i<0)return Math.max(B.findIndex(d=>d.turn),0);let a=r[X];return Number.isFinite(a)?i===X?X:i>X?i:a<=n+Ad?X:i:i}function Gd(t){let e=Fd(t);return e==="bottom"?B.length-1:e==="top"?0:Kd(t)}function gs(t){rn.store.jumpEffect==="border"&&(t.classList.add(E("flash")),setTimeout(()=>t.classList.remove(E("flash")),fd))}function an(t){let e=B[t],o=_e();if(!e||!o)return;if(!e.turn&&!e.ids.length){ne=t,oo(),o.scrollTo({top:yr(o)?0:o.scrollHeight});return}ne=t,qe=t?null:{chat:b(),first:e.ids[0],until:Date.now()+ps},oo();let n=e.turn?.el;if(n?.isConnected){let u=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:u<o.clientHeight*gd?"smooth":"auto"}),gs(n);return}let r=B.findIndex(u=>u.turn),i=r>=0&&t<r?-1:1,a=++qr,d=Date.now()+ps,c=()=>{let u=_e();if(a!==qr||Date.now()>d||!u)return;B=xs();let m=B.find(L=>L.ids.some(p=>e.ids.includes(p)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),gs(m),ne=B.findIndex(L=>L.turn?.el===m),oo();return}let v=u.scrollTop;u.scrollBy({top:i*u.clientHeight*bd,behavior:"instant"}),u.scrollTop===v?setTimeout(c,hd):requestAnimationFrame(c)};c()}function Yd(t,e){return s("button",{class:E("row"),attrs:{type:"button","data-index":String(e),"data-message-id":t.ids[0]??""},on:{click:()=>an(e)}},s("span",{text:qd[t.role]}),s("span",{class:"bloom-truncate",text:rt(t.summary||"\u2026",on)}))}function jd(t,e){let o=t.offsetWidth?e.width/t.offsetWidth:1;return e.left+(t.clientLeft+t.clientWidth)*o}function Wd(t){let e=1/0;for(let o of document.querySelectorAll(bs)){if(!it(o))continue;let n=o.getBoundingClientRect();n.width<vr||n.height<vr||n.left<t.left+vr||n.left<e&&(e=n.left)}return Number.isFinite(e)?e:null}function hs(t){if(!y)return;let e=t.getBoundingClientRect(),o=Z()?.getBoundingClientRect().top,r=Math.min(e.bottom,o&&o>e.top?o:e.bottom)-e.top,i=Math.min(jd(t,e),Wd(e)??1/0);y.style.right=`${document.documentElement.clientWidth-i+xd}px`,y.style.top=`${e.top}px`,y.style.height=r>1?`${r}px`:""}function Qd(){let t=_e();if(B=xs(),!B.length||!t){vt?.dispose(),vt=void 0,y?.remove(),y=null,re="";return}if(no!==t){to?.abort(),to=new AbortController,t.addEventListener("scroll",Ct(oo),{passive:!0,signal:to.signal});for(let n of wd)t.addEventListener(n,Es,{passive:!0,signal:to.signal});no=t,At?.disconnect(),At=new ResizeObserver(()=>{t.isConnected&&hs(t)}),At.observe(t),tn=null,en=new Set}let e=Z();if(e&&e!==tn&&At&&(At.observe(e),tn=e),At)for(let n of document.querySelectorAll(bs))en.has(n)||(At.observe(n),en.add(n));Zd(),hs(t);let o=JSON.stringify(B.map(n=>[n.role,n.ids]));o!==re?(re=o,ne=-1,Vd(),qe&&Date.now()<qe.until&&qe.chat===b()&&B[0]?.ids[0]!==qe.first&&an(0)):zd(),oo()}function oo(){if(!y||!no)return;X=ne>=0?ne:Gd(no),y.querySelectorAll(`.${E("tick")}`).forEach((e,o)=>e.classList.toggle(E("tick-current"),o===X)),y.querySelectorAll(`.${E("row")}`).forEach(e=>e.setAttribute("aria-current",String(Number(e.dataset.index)===X)));let t=y.querySelector(`.${E("toc-head")}`);t&&(t.textContent=`${X+1} / ${B.length}`)}function zd(){y?.querySelectorAll(`.${E("tick")}`).forEach((t,e)=>{let o=B[e],n=rt(o.summary,on);t.title!==n&&(t.title=n),t.classList.toggle(E("tick-streaming"),o.streaming)}),y?.querySelectorAll(`.${E("row")}`).forEach(t=>{let e=t.lastElementChild,o=rt(B[Number(t.dataset.index)].summary||"\u2026",on);e&&e.textContent!==o&&(e.textContent=o)})}function Vd(){y?.querySelector(`.${E("rail")}`)?.replaceChildren(...B.map((e,o)=>s("button",{class:Eo(E("tick"),E(`tick-${e.role}`),e.streaming&&E("tick-streaming"),o===X&&E("tick-current")),title:rt(e.summary,on),attrs:{type:"button","aria-label":`Jump to message ${o+1}`,"data-message-id":e.ids[0]??""},on:{click:()=>an(o)}}))),y?.querySelector(`.${E("toc-list")}`)?.replaceChildren(...B.map(Yd))}var ut=Ct(Qd);function Lr(t){if(t===y)return;let e=t.__bloomNavStop;if(e&&e!==kr)try{e()}catch{}t.isConnected&&t!==y&&t.remove()}function Ss(){let t=[...document.querySelectorAll('[data-bloom="navigator"]')];if(y&&!y.isConnected&&(y=null),y&&t.includes(y)){for(let e of t)Lr(e);return}y=t[0]??null;for(let e of t.slice(1))Lr(e)}function Jd(){vt?.dispose(),vt=_o({over:t=>t instanceof Node&&!!y?.contains(t),trigger:()=>y?.querySelector(`.${E("rail")}`),panel:()=>y?.querySelector(`.${E("toc")}`),setHeld:t=>y?.classList.toggle(E("open"),t)})}function Zd(){Ss(),y&&!y.querySelector(`.${E("rail")}`)&&(y.remove(),y=null,re=""),y||(y=s("div",{class:`bloom-root ${E("root")}`,attrs:{"data-bloom":"navigator"},on:{pointerenter:()=>vt?.enter(),pointerleave:t=>vt?.leave(t)}},s("div",{class:E("rail")}),s("div",{class:E("bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:E("toc")},s("div",{class:E("toc-head")}),s("div",{class:E("toc-list")}))),re=""),vt||Jd(),y.isConnected||document.body.append(y),y.querySelector(`.${E("tick")}`)||(re=""),y.__bloomNavStop=kr}function Es(){ne=-1,qe=null,qr++}function kr(){for(let t of wr)t();wr=[],to?.abort(),At?.disconnect(),At=void 0,no=null,tn=null,en=new Set,removeEventListener("keydown",Ts,!0),removeEventListener("resize",ut),vt?.dispose(),vt=void 0,y&&delete y.__bloomNavStop,y?.remove(),y=null,re="",vs(),Sr="";for(let t of document.querySelectorAll('[data-bloom="navigator"]'))Lr(t)}var Xd=t=>!!t&&(t.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!t.closest("[contenteditable='true']"));function Ts(t){if(!y||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey||Xd(document.activeElement)||at("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:X-1,ArrowDown:X+1,Home:0,End:B.length-1}[t.key];if(o==null){Es();return}o<0||o>=B.length||(t.preventDefault(),t.stopPropagation(),an(o))}var Ms=g({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:rn,styles:ms,start(){Ss(),wr=[T(t=>D(t)&&ut()),st(ut),bt.on("conversation",ut),bt.on("generate-start",({parentId:t,userId:e})=>{t&&(nn={parent:t,user:e},ut())}),P.on("rise",ut),P.on("fall",ut)],addEventListener("keydown",Ts,!0),addEventListener("resize",ut,{passive:!0}),ut()},stop:kr,onSettingsChange:ut});var Cs=`/*
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
`;var z=k("bloom-quotes-"),Ur="BloomBetterQuotes",_d=40,Is=8,tm=1800,Or=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,Ls=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,ae=A({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),Br,Ir,Se,Pr=!1,Rr=0,sn=null,ln=null,xt=null;function Fr(){return b()??"draft"}function un(){try{let t=JSON.parse(sessionStorage.getItem(Ur)??"[]");return Array.isArray(t)?t.filter(e=>!!e&&typeof e=="object"&&typeof e.id=="string"&&typeof e.text=="string"&&!!e.text):[]}catch{return[]}}function Kr(t){try{sessionStorage.setItem(Ur,JSON.stringify(t.slice(-_d)))}catch{}}function ro(t){return un().find(e=>e.id===t)?.text??""}function em(t,e){let o=un().filter(n=>n.id!==t);o.push({id:t,text:e}),Kr(o)}function Hr(t=Fr()){Kr(un().filter(e=>e.id!==t)),cn()}function om(t){let e=ro("draft");if(!e||ro(t))return;let o=un().filter(n=>n.id!=="draft");o.push({id:t,text:e}),Kr(o)}function Dr(t){return`${t.getAttribute("aria-label")??""} ${t.getAttribute("title")??""}`}function nm(t){let e=Dr(t);return Ls.test(e)&&!/quote|引用/.test(e)?!1:/quote|引用/.test(e)&&Or.test(e)?!0:Or.test(e)&&!Ls.test(e)}function Ps(t){let e=t.cloneNode(!0),o=[...e.querySelectorAll("button, [role='button']")],n=new Set(o.map(r=>r.getAttribute("aria-label")).filter(Boolean));for(let r of o)r.remove();for(let r of e.querySelectorAll("*"))!r.children.length&&n.has(h(r.textContent??""))&&r.remove();return h(e.textContent??"")}function rm(t){let e=Z(),o=t.parentElement,n=0;for(;o&&o!==e&&n<5;){if(n++,o.matches(l.composerInput)||o.querySelector(l.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=Ps(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function dn(){let t=Z();if(!t)return null;for(let e of t.querySelectorAll("button, [role='button']")){if(e.closest("[data-bloom]")||!nm(e))continue;let o=rm(e),n=o?Ps(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:e}}return null}function im(t){let e=t.closest(l.searchUnit)??t.closest(l.oldMessage);return e&&(Rt(e)??e.getAttribute("data-message-author-role"))==="user"?e:null}function Gr(t){return h(t).slice(0,48)}function am(t,e){let o=Gr(t);if(o.length<Is)return null;let n=null;for(let r of Ae()){if(e&&(r===e||e.contains(r)||r.contains(e)))continue;let i=h(r.textContent??"");if(!i.includes(o))continue;let a=o.length/Math.max(i.length,1);(!n||a>n.score)&&(n={el:r,score:a})}return n?.el??null}function sm(t,e){let o=Gr(e),n=t;for(let r of t.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&h(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${z("hit")}`)?.classList.remove(z("hit")),n.classList.add(z("hit")),window.clearTimeout(Rr),Rr=window.setTimeout(()=>n.classList.remove(z("hit")),tm)}function ks(t){let e=t.closest(l.timelineScroll)??document.scrollingElement;if(!(e instanceof HTMLElement)&&e!==document.scrollingElement)return;let o=t.getBoundingClientRect();if(o.height<1||!e)return;let n=e.getBoundingClientRect(),r=Z()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,a=o.top+o.height/2-(n.top+i)/2;Math.abs(a)<8||e.scrollTo({top:e.scrollTop+a,behavior:"smooth"})}function Yr(){if(!xt||!sn?.isConnected)return;let t=sn.getBoundingClientRect();t.width<1||(xt.style.top=`${Math.max(8,t.top+8)}px`,xt.style.left=`${Math.max(8,t.right-xt.offsetWidth-8)}px`)}function lm(t,e,o){sn=t,ln=e,xt??=s("button",{class:`bloom-root ${z("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),xt.isConnected||document.body.append(xt),sm(t,o),Yr()}function Bs(){xt?.remove(),xt=null,sn=null,ln=null,document.querySelector(`.${z("hit")}`)?.classList.remove(z("hit"))}function Os(){return document.querySelector('[data-bloom="quote-chip"]')}function cn(){Os()?.remove()}function cm(t){let o=Z()?.getBoundingClientRect();!o||o.width<8||(t.style.width=`${Math.max(120,o.width-24)}px`,t.style.left=`${o.left+12}px`,t.style.top=`${Math.max(8,o.top-t.offsetHeight-8)}px`)}function um(t){let e=Os();e||(e=s("div",{class:`bloom-root ${z("chip")}`,attrs:{"data-bloom":"quote-chip"}},s("span",{class:z("text")}),s("button",{class:z("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(e));let o=e.querySelector(`.${z("text")}`),n=h(t);o&&o.textContent!==n&&(o.textContent=n),e.dataset.text=t,cm(e)}function Nr(){if(!Pr){Pr=!0;try{let t=Fr(),e=dn();ae.store.persistAcrossChats&&e&&ro(t)!==e.text&&em(t,e.text);let o=ae.store.persistAcrossChats?ro(t):"";!o||e&&h(e.text)===h(o)?cn():um(o),Yr()}finally{Pr=!1}}}function dm(t){let e=t.closest('[data-bloom="quote-chip"]');if(e instanceof HTMLElement&&!t.closest(`.${z("x")}`)){let i=e.dataset.text??e.querySelector(`.${z("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:e}:null}let o=t.closest("blockquote");if(o instanceof HTMLElement&&!t.closest("a, button")){let i=im(o),a=h(o.textContent??"");if(i&&a)return{text:a,skip:i,origin:o}}let n=Z();if(!n||!n.contains(t)||je(t)||t.closest("button, [role='button']"))return null;let r=dn();return!r||!r.row.contains(t)?null:{text:r.text,skip:null,origin:r.row}}function mm(t){let{target:e}=t;if(!(e instanceof Element))return;if(e.closest('[data-bloom="quote-back"]')){t.preventDefault(),t.stopPropagation(),ln?.isConnected&&ks(ln);return}if(e.closest(`.${z("x")}`)){t.preventDefault(),t.stopPropagation(),Hr();return}let o=dn();if(o&&(e===o.dismiss||o.dismiss.contains(e))){Hr();return}if(pm(e)&&Rs(),!ae.store.jumpToPassage)return;let n=dm(e);if(!n)return;let r=am(n.text,n.skip);r&&(t.preventDefault(),t.stopPropagation(),lm(r,n.origin,n.text),ks(r))}function pm(t){let e=t.closest("button, [role='button']");return!(e instanceof HTMLElement)||e.closest("[data-bloom]")||!Z()?.contains(e)?!1:/send|submit|发送|提交/i.test(Dr(e))&&!Or.test(Dr(e))}function fm(t){return!(t instanceof KeyboardEvent)||t.key!=="Enter"||t.shiftKey||t.isComposing?!1:je(t.target)}function Rs(){if(!ae.store.persistAcrossChats)return;let t=Fr(),e=ro(t);if(e){if(!dn()){let o=U(),n=Gr(e);n.length>=Is&&!h(o).includes(n)&&ht(`> ${e}

${o}`.trim())}Hr(t)}}function gm(t){fm(t)&&Rs()}function hm(t){!t.prevId&&t.id&&om(t.id),Nr()}var Hs=g({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:ae,styles:Cs,onSettingsChange(t){t==="jumpToPassage"&&!ae.store.jumpToPassage&&Bs(),t==="persistAcrossChats"&&!ae.store.persistAcrossChats&&(sessionStorage.removeItem(Ur),cn()),Nr()},start(){Se=new AbortController,document.addEventListener("pointerdown",mm,{capture:!0,signal:Se.signal}),document.addEventListener("keydown",gm,{capture:!0,signal:Se.signal}),addEventListener("scroll",Yr,{capture:!0,passive:!0,signal:Se.signal}),Ir=st(hm),Br=T(t=>D(t)&&Nr())},stop(){Se?.abort(),Se=void 0,Ir?.(),Ir=void 0,Br?.(),Br=void 0,window.clearTimeout(Rr),Bs(),cn()}});var Ds=`/*
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
`;var ym="[data-app-action-sidebar-thread-row]{position:relative}[data-app-action-sidebar-thread-row]>[data-bloom=cls]{position:absolute;inset-inline-end:0.25rem;top:50%;width:0.875rem;height:0.875rem;margin:0;transform:translateY(-50%);pointer-events:none}",Am=k("bloom-cls"),vm="bloom-cls",xm=600*1e3,Wr=Ii("tab"),Te=new Map,io=new Map,Ee=null,Ns=[],qm=t=>t==="streaming"||t==="error";function wm(){let t=new Map,e=Date.now();for(let[o,n]of io)e-n.at>xm?io.delete(o):t.set(o,n.status);for(let[o,n]of Te)t.set(o,n);return t}function Sm(t){return s("span",{class:`bloom-root ${Am("",`-${t}`)}`,attrs:{"data-bloom":"cls","data-status":t,"aria-label":t==="error"?"Error":"Generating"}},t==="error"&&F("alert"))}function pn(){let t=wm(),e=new Set;for(let[o,n]of t)for(let r of Ze(o)){if(!lt(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){e.add(i);continue}i?.remove();let a=Sm(n);e.add(a),r.append(a)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))e.has(o)||o.remove()}function mn(t,e){t&&(e?Te.set(t,e):Te.delete(t),Ee?.postMessage({tab:Wr,id:t,status:e}),pn())}function Em({data:t}){!H(t)||typeof t.id!="string"||typeof t.tab!="string"||t.tab===Wr||(qm(t.status)?io.set(t.id,{status:t.status,tab:t.tab,at:Date.now()}):io.delete(t.id),pn())}function jr(){for(let t of Te.keys())Ee?.postMessage({tab:Wr,id:t,status:null})}var Us=g({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:()=>`${Ds}${ym}`,start(){for(let t of document.querySelectorAll('[data-bloom="cls"]'))t.remove();Ee=typeof BroadcastChannel=="function"?new BroadcastChannel(vm):null,Ee?.addEventListener("message",Em),addEventListener("pagehide",jr),Ns=[P.on("rise",({conversationId:t})=>mn(t,"streaming")),P.on("fall",({conversationId:t,outcome:e})=>mn(t,e==="error"?"error":null)),P.on("context",({prevId:t,id:e,migrated:o})=>{o&&V().generating?mn(e,"streaming"):!o&&Te.get(t??"")==="streaming"&&mn(t,null)}),T(t=>D(t)&&pn())],b()&&pn()},stop(){for(let t of Ns)t();jr(),Ee?.close(),Ee=null,removeEventListener("pagehide",jr),Te.clear(),io.clear();for(let t of document.querySelectorAll('[data-bloom="cls"]'))t.remove()}});var Dt="data-bloom-invite",Tm=/^(?:invite team members|invite members|邀请团队成员|邀请成员)$/i,Fs=':is(button, a:not([href^="/c/"])):not(main *, [role="dialog"] *)',Mm={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${l.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])'],hideInvite:[`[${Dt}]`,`div:has(> [${Dt}]:only-child)`]},Ks=A({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0},hideInvite:{type:"boolean",description:"Hide Invite team members in the sidebar.",default:!0}}),fn,Qr=!1;function Cm(t){if(D(t))for(let e of document.querySelectorAll(`${Fs}, [${Dt}]`))!e.matches(Fs)||!Tm.test(h(e.textContent??""))?e.removeAttribute(Dt):e.hasAttribute(Dt)||e.setAttribute(Dt,"")}var Gs=g({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads, notices and Invite team members.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:Ks,styles:()=>Mt(Object.entries(Mm).flatMap(([t,e])=>Ks.store[t]?e:[])),start(){Qr=!0,It().then(()=>{Qr&&!fn&&(fn=T(Cm))})},stop(){Qr=!1,fn?.(),fn=void 0;for(let t of document.querySelectorAll(`[${Dt}]`))t.removeAttribute(Dt)}});var Me=`form:has(:is(${l.composerInput})), ${l.oldComposerForm}`,gn='[class*="ComposerLayoutBody"]',Vr='[class*="ComposerLayoutRoot"]',Lm='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',km=`:is(${Me}) ${gn}, :is(${Me}):not(:has(${gn})) ${Vr}, :is(${Me}):not(:has(${gn})):not(:has(${Vr})) :is(${Lm})`,Bm='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',Im='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',Pm="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))",Om="var(--color-background-composer-surface, var(--composer-background-color, var(--color-bg-primary, Canvas)))",Rm="composer-fill",Ys=A({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function Hm(){let{opacity:t,blur:e}=Ys.store;if(t>=100)return"";{let i=`color-mix(in srgb, ${Om} ${t}%, transparent)`;return`[class*="ComposerLayoutRoot"], [data-composer-layout], [data-chatgpt-composer]{--composer-layout-surface-background:${i}!important;--composer-background-color:${i}!important;--composer-layout-surface-backdrop-filter:blur(${e}px)!important}`}let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${Pm} ${t}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${e}px)!important;-webkit-backdrop-filter:blur(${e}px)!important`;return`:is(${Bm}), :is(${Me}){${o}}:is(${Im}){display:none!important}${km}{${n}}:is(${Me}):has(${gn}) ${Vr}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${Me}) :is(${l.composerInput}){background-color:transparent!important}`}function zr(){for(let t of document.querySelectorAll(`[data-bloom="${Rm}"]`))t.remove()}var js=g({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:Ys,styles:Hm,start(){zr()},stop(){zr()},onSettingsChange(){zr()}});var Dm=1200,Nm=8e3,Um=150,Fm=20,Ws=6,Xr="continue where you left",Km=/message delivery timed out|please try again/i,Qs=/waiting for the complete answer/i,zs=A({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:Xr,placeholder:Xr}}),Jr=[],bn=0,ao=!1,so=0,Le="",hn="",$r=0,ke=!1,lo=!1,yn=!0,Ce="",_r=0,An=!1,Gm=()=>zs.store.prompt.trim()||Xr;function Vs(){return(at(l.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function Js(){let t=Vs();return!t||Qs.test(t)||!Km.test(t)?"":t}function Ym(){let t=Vs();return t&&Qs.test(t)?t:""}function jm(){let t=Xo()?.querySelectorAll(l.turn),e=t?.[t.length-1];return`${e?.getAttribute("data-turn-key")??""}:${e?.textContent?.length??0}`}function Zs(t,e,o){if(o===bn){if(V().generating||U()!==t||e>=Fm){ke=!1,V().generating||(Le="");return}xa(),setTimeout(()=>Zs(t,e+1,o),Um)}}function Wm(t){let e=bn;if(V().generating||U()&&U()!==t){ke=!1,Le="";return}ht(t),An=!0,Fn(()=>{e===bn&&Zs(t,0,e)})}function Xs(t){return t===Le||so>=Ws||V().generating||U()?!1:(Le=t,so+=1,ke=!0,Wm(Gm()),!0)}function Qm(){if(ao||ke||lo)return;let t=Date.now(),e=Js();if(e){if(Ce="",e!==hn){hn=e,$r=t;return}if(t-$r<Dm)return;Xs(`${b()??""}:${e}`);return}if(hn="",!Ym()){yn=!0,Ce="";return}if(!yn||!V().generating||U())return;let n=`${b()??""}:${jm()}`;if(n!==Ce){Ce=n,_r=t;return}if(t-_r<Nm||so>=Ws)return;let r=Vn();r&&(lo=!0,r.click())}function Zr(){bn+=1,ao=!1,so=0,Le="",hn="",$r=0,ke=!1,lo=!1,yn=!0,Ce="",_r=0,An=!1}var $s=g({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:zs,start(){Zr(),Jr=[P.on("rise",()=>{ao=!1,Le="",ke=!1,An&&(An=!1,yn=!1,Ce="")}),P.on("fall",({outcome:t})=>{if(lo){lo=!1,t==="left"?ao=!0:Xs(`${b()??""}:stall`);return}(t==="stopped"||t==="left")&&(ao=!0),t==="done"&&!Js()&&(so=0)}),P.on("context",({migrated:t})=>{t||Zr()}),P.on("tick",Qm)]},stop(){for(let t of Jr)t();Jr=[],Zr()}});var qt=k("bloom-csi-"),zm=256,Vm=160,vn=1,_s=4,Jm=.1,Zm=.0015,Xm=250;function $m(t){return new Promise((e,o)=>{let n=new FileReader;n.onload=()=>e(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(t)})}function _m(t){return new Promise((e,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>e(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=t})}function tp(t,e){let o=Math.max(1/t.naturalWidth,1/t.naturalHeight)*e.zoom,n=1/(2*t.naturalWidth*o),r=1/(2*t.naturalHeight*o);return{zoom:e.zoom,x:$(e.x,n,1-n),y:$(e.y,r,1-r)}}function tl(t,e,o){let n=t.width,r=t.getContext("2d");if(!r)return;let i=Math.max(n/e.naturalWidth,n/e.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(e,n/2-o.x*e.naturalWidth*i,n/2-o.y*e.naturalHeight*i,e.naturalWidth*i,e.naturalHeight*i)}function ep(t,e){let o=s("canvas");return o.width=o.height=zm,tl(o,t,e),o.toDataURL("image/png")}function el(t){let e=null,o={x:N.store.cropX,y:N.store.cropY,zoom:N.store.cropZoom},n,r=s("canvas",{class:qt("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=Vm*devicePixelRatio;let i=s("div",{class:`bloom-muted ${qt("status")}`}),a=s("div",{class:qt("zoom")}),d=s("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function c(p,w=!0){e&&(o=tp(e,p),tl(r,e,o),w&&(clearTimeout(n),n=setTimeout(()=>{e&&(N.store.cropX=o.x,N.store.cropY=o.y,N.store.cropZoom=o.zoom,N.store.avatarUrl=ep(e,o))},Xm)))}function u(){a.replaceChildren(Go(o.zoom,vn,_s,Jm,"\xD7",p=>c({...o,zoom:p})))}async function m(p,w){i.textContent="";try{e=await _m(p),w&&(N.store.avatarSource=p,o={x:.5,y:.5,zoom:vn}),t.classList.add(qt("has-image")),u(),c(o,w)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let v=p=>{p?.type.startsWith("image/")&&$m(p).then(w=>m(w,!0))};d.addEventListener("change",()=>v(d.files?.[0])),r.addEventListener("wheel",p=>{e&&(p.preventDefault(),c({...o,zoom:$(o.zoom*(1-p.deltaY*Zm),vn,_s)}),u())},{passive:!1}),r.addEventListener("pointerdown",p=>{if(!e)return;r.setPointerCapture(p.pointerId);let w={...o},W=r.getBoundingClientRect(),Yt=Q=>{if(!e)return;let ft=Math.max(W.width/e.naturalWidth,W.height/e.naturalHeight)*o.zoom;c({...o,x:w.x-(Q.clientX-p.clientX)/(e.naturalWidth*ft),y:w.y-(Q.clientY-p.clientY)/(e.naturalHeight*ft)})};r.addEventListener("pointermove",Yt),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",Yt),{once:!0})});let L=s("div",{class:qt("cropper"),attrs:{tabindex:"0"},on:{paste:p=>v([...p.clipboardData?.files??[]].find(w=>w.type.startsWith("image/"))),dragover:p=>p.preventDefault(),drop:p=>{p.preventDefault(),v(p.dataTransfer?.files[0])}}},s("div",{class:qt("stage")},r),s("div",{class:qt("controls")},Ve("",p=>p.trim()&&void m(p.trim(),!0),"https://\u2026 or data:image/\u2026","url"),s("div",{class:qt("buttons")},K("Choose file",()=>d.click()),K("Reset crop",()=>{c({x:.5,y:.5,zoom:vn}),u()}),K("Clear",()=>{e=null,t.classList.remove(qt("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),a.replaceChildren(),N.store.avatarUrl="",N.store.avatarSource=""},"danger")),a,i,d));return t.append(L),N.store.avatarSource&&m(N.store.avatarSource,!1),()=>{clearTimeout(n),t.replaceChildren()}}var ol=`/*
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
`;var co="data-bloom-csi-avatar",ti="data-bloom-csi-sized",al="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",np=32,N=A({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:t=>el(t)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),nl=[];function sl(t){t.removeAttribute(co),t.removeAttribute(ti)}function rl(t){return(N.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${t}]`)])}function il(t=[]){if(!D(t))return;let e=N.store.displayName.trim()||null,o=!!N.store.avatarUrl,n=new Set(e?rl("name"):[]);for(let i of document.querySelectorAll(al))n.has(i)||Wt(i,null);for(let i of n)Wt(i,e);let r=new Set(o?rl("avatar"):[]);for(let i of document.querySelectorAll(`[${co}]`))r.has(i)||sl(i);for(let i of r)i.hasAttribute(co)||i.setAttribute(co,""),i.toggleAttribute(ti,!i.closest('[role="menu"]'))}function rp(){let t=N.store.avatarUrl;return t?`:root{--bloom-csi-url:url("${t.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${N.store.avatarSize}px}:is(${l.rail}, ${l.oldRail}) [${ti}]{--bloom-csi-size:${np}px}`:""}var ll=g({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:N,styles:()=>`${rp()}
${ol}`,start(){nl=[ct(),T(il)]},stop(){for(let t of nl)t();for(let t of document.querySelectorAll(`[${co}]`))sl(t);for(let t of document.querySelectorAll(al))Wt(t,null)},onSettingsChange(){il()}});var Be=k("bloom-greeting-"),cl=30,ul=100;function dl(t){let e=-1,o=s("textarea",{class:`bloom-input ${Be("input")}`,attrs:{maxlength:String(ul),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=K("Add",i),r=s("div",{class:Be("list")});function i(){let c=o.value.trim().slice(0,ul);if(!c)return;let u=[...M.store.greetings];e>=0?u[e]=c:u.length<cl&&u.push(c),M.store.greetings=u,e=-1,o.value="",a()}function a(){let{greetings:c}=M.store;n.textContent=e>=0?"Save":"Add",n.disabled=e<0&&c.length>=cl,r.replaceChildren(...c.length?c.map((u,m)=>s("div",{class:Be("row",m===e?"row-editing":"row-idle")},s("div",{class:Be("text"),text:u}),j("edit","Edit",()=>{e=m,o.value=u,o.focus(),a()}),j("trash","Delete",()=>{M.store.greetings=c.filter((v,L)=>L!==m),e===m&&(e=-1),a()}))):[s("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",c=>{c.key==="Enter"&&(c.ctrlKey||c.metaKey)&&i()}),t.append(s("div",{class:Be("editor")},r,s("div",{class:Be("form")},o,n))),a();let d=pe((c,u)=>c==="GreetingCustomizer"&&u==="greetings"&&a());return()=>{d(),t.replaceChildren()}}var ml=`/*
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
`;var qn="data-bloom-greeting",ap=1e3,sp=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],M=A({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:t=>dl(t)},greetings:{type:"custom",default:sp},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),xn,pl=[],ei,fo=()=>Ko()&&!zt(),lp=t=>t.replaceAll(/\s*\n\s*/g," ").trim(),gl=()=>M.store.greetings.filter(t=>typeof t=="string"&&t.trim());function go(){let t=gl();if(t.length)if(M.store.order==="random"&&t.length>1){let e=M.store.lastRandom;for(;e===M.store.lastRandom;)e=Math.floor(Math.random()*t.length);M.store.lastRandom=e,M.store.index=e}else M.store.index=(M.store.index+1)%t.length}function cp(){return fo()?at(l.homeHeading):null}function uo(){for(let t of document.querySelectorAll(`[${qn}]`))t.removeAttribute(qn),Wt(t,null)}function mo(){for(let t of document.querySelectorAll("[data-bloom-placeholder]"))t.removeAttribute("data-bloom-placeholder")}function fl(t){let e=nt(),o=lp(t);if(!e||!o||U(e)){mo();return}e.getAttribute("data-bloom-placeholder")!==o&&e.setAttribute("data-bloom-placeholder",o)}function po(){let t=gl(),e=Sa(),o=fo();if(!t.length||!e&&!o){uo(),mo();return}if(e){uo(),fl(t[0]??"");return}let n=cp();n?((M.store.index<0||M.store.index>=t.length)&&go(),n.setAttribute(qn,""),Wt(n,t[Math.max(0,M.store.index)%t.length]??"")):uo(),M.store.heroOnlyOutsideProject?mo():fl(t[Math.max(0,M.store.index)%t.length]??"")}function oi(){clearInterval(xn),xn=void 0,M.store.mode==="interval"&&fo()&&(xn=setInterval(()=>{go(),po()},M.store.intervalSec*ap))}function up(t){M.store.mode!=="manual"||!(t.target instanceof Element)||!t.target.closest(`[${qn}]`)||getSelection()?.toString()||(go(),po())}function dp(){fo()&&M.store.mode==="refresh"&&go(),oi(),po()}var hl=g({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:M,styles:ml,start(){uo(),mo(),ei=new AbortController,document.addEventListener("click",up,{signal:ei.signal}),fo()&&M.store.mode==="refresh"&&go(),oi(),pl=[T(t=>D(t)&&po()),st(dp)]},stop(){ei?.abort();for(let t of pl)t();clearInterval(xn),uo(),mo()},onSettingsChange(t){(t==="mode"||t==="intervalSec")&&oi(),po()}});var ho=k("bloom-history-"),ni=10,mp=3e3;function ri(t,e){let o="",n=0,r=new Set,i=s("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),a=s("div",{class:ho("list")}),d=s("div",{class:ho("pager")}),c,u=K("Clear all",()=>{if(!c){u.textContent="Click again to clear",c=setTimeout(()=>{c=void 0,u.textContent="Clear all"},mp);return}clearTimeout(c),c=void 0,u.textContent="Clear all",bo([])},"danger");function m(){let L=[...se.store.entries].toReversed(),p=o.trim().toLowerCase(),w=p?L.filter(J=>J.toLowerCase().includes(p)):L,W=Math.max(1,Math.ceil(w.length/ni));n=Math.min(n,W-1);let Yt=w.slice(n*ni,(n+1)*ni).map(J=>s("div",{class:ho("row")},s("button",{class:ho("text",r.has(J)?"text-open":"text-closed"),text:J,title:r.has(J)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{r.delete(J)||r.add(J),m()}}}),e&&j("edit","Use",()=>e(J)),j("copy","Copy",()=>void Oi(J)),j("trash","Delete",()=>bo(se.store.entries.filter(Dn=>Dn!==J)))));a.replaceChildren(...Yt.length?Yt:[s("div",{class:"bloom-muted",text:p?"No matching prompts.":"No saved prompts yet."})]),d.replaceChildren(s("span",{class:"bloom-muted",text:`${w.length} ${p?"matching":"saved"} \xB7 page ${n+1} of ${W}`}),K("Previous",()=>{n--,m()}),K("Next",()=>{n++,m()}),u);let[Q,ft]=d.querySelectorAll("button");Q.disabled=n===0,ft.disabled=n>=W-1,u.disabled=!L.length}i.addEventListener("input",()=>{o=i.value,n=0,m()}),t.append(s("div",{class:ho("manager")},i,a,d)),m();let v=pe((L,p)=>L==="InputHistory"&&p==="entries"&&m());return()=>{v(),clearTimeout(c),t.replaceChildren()}}var bl=`/*
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
`;var wt=k("bloom-history-"),fp=2e3,se=A({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:t=>ri(t)},entries:{type:"custom",default:[]}}),O=null,ii={text:"",at:0},dt=null,Nt=null,ai,Pe=()=>se.store.entries.filter(t=>typeof t=="string");function bo(t){se.store.entries=t.slice(-se.store.maxEntries)}function si(t){let e=t.trim();if(!e)return;let o=Date.now();e===ii.text&&o-ii.at<fp||(ii={text:e,at:o},bo([...Pe().filter(n=>n!==e),e]))}function yl(t){t.preventDefault()}function gp(){let t=s("button",{class:wt("hud-count"),attrs:{type:"button"},on:{mousedown:yl,click:Ap}}),e=s("button",{class:wt("hud-x"),text:"\xD7",attrs:{type:"button","aria-label":"Exit history"},on:{mousedown:yl,click:hp}});return s("div",{class:`bloom-root ${wt("hud")}`,attrs:{"data-bloom":"history-hud",role:"group","aria-live":"polite","aria-label":"Input history"}},t,e)}function Al(t,e){let o=nt();if(!o||Nt)return;dt??=gp();let n=`${t+1} / ${e}`,r=dt.querySelector(`.${wt("hud-count")}`);r?.replaceChildren(n),r?.setAttribute("aria-label",`Show input history (${n})`);let i=(o.closest("form")??o).getBoundingClientRect();dt.style.left=`${i.left+i.width/2}px`,dt.style.top=`${i.top}px`,dt.isConnected||document.body.append(dt)}function Ie(){O=null,dt?.remove()}function hp(){O&&ht(O.draft),Ie(),nt()?.focus()}function vl(t){let e=Pe();if(!O)return;let o=e[t];O.index=t,O.shown=o,ht(o),Al(e.length-1-t,e.length)}function bp(t){let e=Pe();if(!e.length)return!1;if(!O){if(t===1)return!1;O={index:e.length,draft:U(),shown:""}}let o=O.index+t;return o<0?!0:o>=e.length?(ht(O.draft),Ie(),!0):(vl(o),!0)}function yp(t){let e=Pe().indexOf(t);yo(),!(e<0)&&(O??={index:e,draft:U(),shown:""},vl(e),nt()?.focus())}function yo(){if(!Nt)return;Nt.release(),Nt.controller.abort(),Nt.root.remove(),Nt=null;let t=Pe();O&&t[O.index]===O.shown?Al(t.length-1-O.index,t.length):O=null}function Ap(){if(Nt)return;dt?.remove();let t=s("div",{class:wt("dialog-body")}),e=s("div",{class:`bloom-root ${wt("backdrop")}`,attrs:{"data-bloom":"history-dialog"},on:{click:n=>n.target===n.currentTarget&&yo()}},s("div",{class:wt("dialog"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Input history"}},s("div",{class:wt("dialog-header")},s("h2",{class:wt("dialog-title"),text:"Input history"}),j("close","Close",yo)),t));e.addEventListener("keydown",n=>n.stopPropagation());let o=new AbortController;document.addEventListener("keydown",n=>{n.key==="Escape"&&(n.preventDefault(),n.stopPropagation(),yo())},{capture:!0,signal:o.signal}),document.body.append(e),Nt={root:e,release:ri(t,yp),controller:o},t.querySelector("input")?.focus()}function xl(t){return je(t)?t:t instanceof HTMLElement?t.closest(l.composerInput):null}function vp(){if(nt()?.closest("[data-chatgpt-composer], [data-composer-input], form")?.querySelector('[aria-expanded="true"]'))return!0;for(let e of document.querySelectorAll('[role="listbox"], [role="menu"], [data-radix-popper-content-wrapper], [cmdk-root], [cmdk-list]')){if(!(e instanceof HTMLElement)||e.closest("[data-bloom]"))continue;let o=getComputedStyle(e);if(!(o.display==="none"||o.visibility==="hidden"))return!0}return!1}function xp(t){if(t.isComposing||t.key==="Process"||t.keyCode===229)return;let e=xl(t.target);if(!e)return;if(t.key==="Enter"&&!t.shiftKey){si(U(e)),Ie();return}if(t.key==="Escape"&&O){ht(O.draft),Ie(),t.preventDefault(),t.stopPropagation();return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.ctrlKey||t.metaKey||t.shiftKey||vp())return;let o=Aa(e),n=t.key==="ArrowUp";!t.altKey&&!(n?o.first:o.last)||!n&&!O||bp(n?-1:1)&&(t.preventDefault(),t.stopPropagation())}function qp(t){O&&xl(t.target)&&U()!==O.shown.trim()&&Ie()}function wp(t){t.target instanceof Element&&t.target.closest(l.sendButton)&&si(U())}var ql=g({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before. Click the counter to browse history.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:se,styles:bl,start(){for(let e of document.querySelectorAll('[data-bloom="history-hud"], [data-bloom="history-dialog"]'))e.remove();dt=null,ai=new AbortController;let{signal:t}=ai;document.addEventListener("keydown",xp,{capture:!0,signal:t}),document.addEventListener("input",qp,{capture:!0,signal:t}),document.addEventListener("click",wp,{capture:!0,signal:t}),document.addEventListener("submit",()=>si(U()),{capture:!0,signal:t})},stop(){ai?.abort(),yo(),Ie();for(let t of document.querySelectorAll('[data-bloom="history-hud"]'))t.remove();dt=null},onSettingsChange(t){t==="maxEntries"&&bo(Pe())}});var wl=`/*
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
`;var Ep=1500,Tp=5e3,Mp=2e3,Ll=[{label:"UTC",value:"UTC"},{label:"\u7F8E\u56FD\u4E1C\u90E8",value:"America/New_York"},{label:"\u7F8E\u56FD\u4E2D\u90E8",value:"America/Chicago"},{label:"\u7F8E\u56FD\u5C71\u5730",value:"America/Denver"},{label:"\u7F8E\u56FD\u897F\u90E8",value:"America/Los_Angeles"},{label:"\u65E5\u672C",value:"Asia/Tokyo"},{label:"\u53F0\u6E7E",value:"Asia/Taipei"}],Oe=A({sourceTimeZone:{type:"select",description:"Zone the stored clock was written in. Leave UTC for ChatGPT create_time. Pick the same zone as the Shit GPT plugin only when that clock is a wall time in that zone; it is then shown in the system timezone.",options:Ll,default:"UTC"},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),Sn=new Map,li=new Set,kl=0,En,Sl=[];function Bl(t,e){Sn.get(t)!==e&&(Sn.set(t,e),clearTimeout(En),En=setTimeout(Il,Mp))}function Il(){let t={...Oe.store.stamps,...Object.fromEntries(Sn)};Oe.store.stamps=Object.fromEntries(Object.entries(t).toSorted((e,o)=>o[1]-e[1]).slice(0,Ep))}function Cp(t){let e=yt(b())?.times;for(let o=t.length-1;o>=0;o--){let n=Sn.get(t[o])??e?.get(t[o])??Oe.store.stamps[t[o]];if(n)return n}return null}var Lp=()=>V().generating||Date.now()-kl<Tp;function Pl(){return Intl.DateTimeFormat().resolvedOptions().timeZone}function Ol(){let t=Oe.store.sourceTimeZone;if(!t||t==="UTC")return"UTC";try{return Intl.DateTimeFormat(void 0,{timeZone:t}),t}catch{return"UTC"}}function Rl(t,e){let o={};for(let n of new Intl.DateTimeFormat("en-US",{timeZone:e,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(t)))o[n.type]=n.value;return{y:+o.year,m:+o.month,d:+o.day,h:+o.hour%24,mi:+o.minute,s:+o.second}}function Hl(t){return Date.UTC(t.y,t.m-1,t.d,t.h,t.mi,t.s)}function El(t,e){let o=t;for(let n=0;n<4;n++){let r=t-Hl(Rl(o,e));if(r===0)return o;o+=r}return o}function kp(t,e){if(e==="UTC")return t;let o=(t%1e3+1e3)%1e3,n=t-o,r=new Date(n),i=Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),r.getUTCHours(),r.getUTCMinutes(),r.getUTCSeconds()),a=El(i,e),d=3600*1e3,c=Number.POSITIVE_INFINITY;for(let u of[-d,0,d]){let m=a+u;Hl(Rl(m,e))===i&&m<c&&(c=m)}return c!==Number.POSITIVE_INFINITY?c+o:El(i+d,e)+o}function Bp(t,e){let o=Ol();return e||o==="UTC"?t:kp(t,o)}function Tl(t,e){return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}function Ip(t){let e=Pl(),o=Date.now(),n={hour:"2-digit",minute:"2-digit",timeZone:e};if(Tl(t,e)===Tl(o,e))return new Intl.DateTimeFormat(void 0,n).format(t);let r=a=>new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric"}).format(a),i=r(t)===r(o)?{}:{year:"numeric"};return new Intl.DateTimeFormat(void 0,{...i,month:"short",day:"numeric",...n}).format(t)}function Pp(t,e){let o=new Date(e).toLocaleString(void 0,{timeZone:Pl()}),n=Ol();if(n==="UTC"||e===t)return o;let r=new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"UTC"}).format(t);return`${Ll.find(a=>a.value===n)?.label??n} ${r} \u2192 ${o}`}function Dl(t){let e=Rt(t)??t.getAttribute("data-message-author-role")??t.closest(l.turn)?.getAttribute("data-turn")??t.querySelector(l.authorRole)?.getAttribute("data-message-author-role");if(Zo(e))return e;let o=$e(t).at(-1);return yt(b())?.chain.find(n=>n.id===o)?.role??null}var Ml='[class*="group/activity-header"]';function Op(t){let e=t.parentElement;if(!e)return null;let o=t.closest(l.turn);return o&&e!==o&&!o.contains(e)?null:e}function Rp(t){let e=t;for(let o=0;o<8&&e;o++){let n=Op(e);if(!n)return null;let r=[...n.children],i=r.indexOf(e);for(let a=i-1;a>=0;a--){let d=r[a],c=d.matches(Ml)?d:d.querySelector(Ml);if(c)return c;if(d.matches(l.searchUnit)||d.querySelector(l.searchUnit))return null}if(n===e.closest(l.turn))return null;e=n}return null}function Hp(t){let e=t.parentElement;for(let o=0;o<4&&e;o++){if(e.classList.contains("flex-col"))return e;e=e.parentElement}return t.parentElement??t}function Nl(t,e){if(e==="assistant"){let o=Rp(t);if(o)return Hp(o)}return t}function Dp(t,e){let o=Ae();for(let n=o.length-1;n>=0;n--){let r=o[n];if(!(r!==t&&(Dl(r)!=="assistant"||Nl(r,"assistant")!==e)))return r===t}return!0}function Cl(t){return t.querySelector(':scope > time[data-bloom="timestamp"]')}function Np(t){let e=$e(t);if(!e.length||!lt(t)||t.querySelector("time:not([data-bloom])"))return;let o=Dl(t),n=Nl(t,o);if(n!==t&&!Dp(t,n)){Cl(t)?.remove();return}let r=Cp(e),i=!1;if(!r&&Lp()){r=Date.now();let m=e.at(-1);li.add(m),Bl(m,r),i=!0}else r&&li.has(e.at(-1))&&(i=!0);let a=n.querySelector('time[data-bloom="timestamp"]')??Cl(t);if(!r||Oe.store.hideOwnMessages&&o==="user"){a?.remove();return}let d=Bp(r,i),c=Ip(d);if(a?.textContent===c&&a.parentElement===n&&a===n.firstElementChild)return;let u=s("time",{class:`bloom-timestamp bloom-timestamp-${o??"assistant"}`,text:c,title:Pp(r,d),attrs:{"data-bloom":"timestamp",datetime:new Date(d).toISOString()}});a&&a.replaceWith(u),(u.parentElement!==n||u!==n.firstElementChild)&&n.prepend(u)}var wn=Ct(()=>{for(let t of Ae())Np(t)}),Ul=g({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:Oe,styles:wl,start(){Sl=[T(t=>D(t)&&wn()),bt.on("conversation",wn),bt.on("message-time",({messageId:t,time:e})=>{li.delete(t),Bl(t,e),wn()}),P.on("fall",()=>{kl=Date.now()})]},stop(){for(let t of Sl)t();En&&(clearTimeout(En),Il());for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove()},onSettingsChange(t){if(t!=="stamps"){for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove();wn()}}});var Up=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])','[data-chatgpt-composer] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-composer-input] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-codex-composer-root] button[aria-label^="Dictat" i], [data-composer-placement] button[aria-label^="Dictat" i], [class*="ComposerLayout"] button[aria-label^="Dictat" i]'],Fp=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],Fl=A({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),Kl=g({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:Fl,styles:()=>Mt([...Up,...Fl.store.hideDictationSettings?Fp:[]])});var le="data-bloom-share",Kp=/^\/g\/g-p-/,Gp=/^(?:share|分享)$/i,Yp=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],jp=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${le}="project"]`],ci=A({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),Tn,ui=!1;function Wp(t){if(!D(t))return;let e=Kp.test(location.pathname)&&!b();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${le}]`))!e||!Gp.test(h(o.textContent??""))?o.removeAttribute(le):o.hasAttribute(le)||o.setAttribute(le,"project")}var Gl=g({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:ci,styles:()=>Mt([...ci.store.hideShareChat?Yp:[],...ci.store.hideShareProject?jp:[]]),start(){ui=!0,It().then(()=>{ui&&!Tn&&(Tn=T(Wp))})},stop(){ui=!1,Tn?.(),Tn=void 0;for(let t of document.querySelectorAll(`[${le}]`))t.removeAttribute(le)}});var Yl='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',Qp='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',zp="[data-bloom-profile-plan]",jl="visibility:hidden!important;user-select:none!important",Ql=A({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function Vp(){let{hideUsername:t,hideEmail:e,enlargePlan:o,alignPlanWithAvatar:n}=Ql.store,r=[];return t&&r.push(n?`:is(${Yl}){display:none!important}`:`:is(${Yl}){${jl}}`),e&&r.push(`:is(${Qp}){${jl}}`),t&&o&&r.push(`${zp}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var Wl,zl=g({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Ql,styles:Vp,start(){Wl=ct()},stop(){Wl?.()}});var Jp=new Set(["chatgpt","new chat","\u65B0\u804A\u5929","codex"]);function Zp(){let t=h(document.title.replace(/\s*[|–-]\s*(?:ChatGPT|Codex)$/i,""));return t&&!Jp.has(t.toLowerCase())?t:null}function Ao(t){return t?Xe(t)??(t===b()?Zp():null):null}var Vl=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

.bloom-recent-backdrop {
    position: fixed;
    inset: 0;
    z-index: 2147482500;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 15vh 1rem 1rem;
    contain: content;
}

.bloom-recent-panel {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    width: min(32rem, 100%);
    padding: 0.5rem;
    border: 1px solid var(--bloom-border);
    border-radius: 1rem;
    background: var(--bloom-surface);
    box-shadow: var(--bloom-shadow);
    animation: bloom-fade-in 0.12s ease-out;
}

.bloom-recent-item {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    width: 100%;
    padding: 0.5rem 0.75rem;
    border-radius: 0.625rem;
    text-align: start;
}

.bloom-recent-item[aria-selected="true"] {
    background: var(--bloom-hover);
}

.bloom-recent-head {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    min-width: 0;
}

.bloom-recent-title {
    flex: 1;
    min-width: 0;
    font-weight: 500;
}

.bloom-recent-project {
    flex: none;
    max-width: 40%;
    overflow: hidden;
    color: var(--bloom-fg-3);
    font-size: 0.75rem;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.bloom-recent-preview {
    color: var(--bloom-fg-2);
    font-size: 0.8125rem;
}
`;var St=k("bloom-recent-"),Et="home",$p=50,Jl=140,_p=new Set(["Backquote"]),tf=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),S=A({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(t=>({label:t,value:t})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),Ut=null,mt=[],pt=0,di,Zl=[],Ln=()=>zt()?null:b()??(Ko()?Et:null);function Xl(t,e){return Object.fromEntries(Object.entries(t).filter(([o])=>e.has(o)))}function _l(t){let e=Ao(t);e&&S.store.titles[t]!==e&&(S.store.titles={...S.store.titles,[t]:e});let o=za(location.href);o&&t===b()&&S.store.projects[t]!==o&&(S.store.projects={...S.store.projects,[t]:o})}function $l(t){if(!t)return;let e=[t,...S.store.visits.filter(n=>n!==t)].slice(0,$p),o=new Set(e);S.store.visits=e,Object.keys(S.store.previews).some(n=>!o.has(n))&&(S.store.previews=Xl(S.store.previews,o)),Object.keys(S.store.titles).some(n=>!o.has(n))&&(S.store.titles=Xl(S.store.titles,o)),t!==Et&&_l(t)}function Mn(t){if(!t||!S.store.visits.includes(t))return;let e={},o=yt(t)?.chain??[];for(let r of o)e[r.role]=rt($o(r),Jl);if(t===b())for(let r of Ht()){let i=ve(r);i&&(e[r.role]=rt(i,Jl))}let n=S.store.previews[t];!e.user&&!e.assistant||n?.user===e.user&&n?.assistant===e.assistant||(S.store.previews={...S.store.previews,[t]:e})}function ef(){let t=Number(S.store.maxRecent);return S.store.visits.filter(e=>e!==Et||S.store.includeHome).slice(0,t)}function mi(t){if(vo(),t===Ln())return;let e=t===Et?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"], [data-sidebar-destination="builtin:home"]'):Ze(t)[0];e?e.click():location.assign(t===Et?"/":`/c/${t}`)}function of(t,e){let o=t===Et?"New chat":S.store.titles[t]??Ao(t)??"Untitled chat",n=t===Et?null:S.store.projects[t],r=t===Et?null:S.store.previews[t];return s("button",{class:St("item"),attrs:{type:"button",role:"option","aria-selected":String(e===pt)},on:{click:()=>mi(t),mousemove:()=>e!==pt&&Cn(e)}},s("div",{class:St("head")},s("span",{class:`${St("title")} bloom-truncate`,text:o}),n&&s("span",{class:St("project"),text:n})),r?.user&&s("div",{class:`${St("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&s("div",{class:`${St("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function Cn(t){pt=(t+mt.length)%mt.length,Ut?.querySelectorAll(`.${St("item")}`).forEach((e,o)=>e.setAttribute("aria-selected",String(o===pt)))}function nf(){Mn(b());let t=Ln();mt=ef(),t&&(mt=[t,...mt.filter(e=>e!==t)].slice(0,Number(S.store.maxRecent))),mt.length&&(pt=mt.length>1?1:0,Ut=s("div",{class:`bloom-root ${St("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:e=>e.target===e.currentTarget&&vo()}},s("div",{class:St("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...mt.map(of))),document.body.append(Ut))}function vo(){Ut?.remove(),Ut=null}var rf=t=>_p.has(t.code)||tf.has(t.key);function af(t){if(t.ctrlKey&&!t.altKey&&!t.metaKey&&rf(t)){t.preventDefault(),t.stopPropagation(),Ut?Cn(pt+(t.shiftKey?-1:1)):nf();return}if(!Ut)return;let o={Escape:vo,Enter:()=>mi(mt[pt]),ArrowDown:()=>Cn(pt+1),ArrowUp:()=>Cn(pt-1)}[t.key];o&&(t.preventDefault(),t.stopPropagation(),o())}function sf(t){Ut&&t.key==="Control"&&mi(mt[pt])}var tc=g({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:S,styles:Vl,start(){di=new AbortController;let{signal:t}=di;addEventListener("keydown",af,{capture:!0,signal:t}),addEventListener("keyup",sf,{capture:!0,signal:t}),addEventListener("blur",vo,{signal:t}),document.addEventListener("visibilitychange",()=>document.hidden&&Mn(b()),{signal:t}),Zl=[st(({prevId:i})=>{Mn(i),$l(Ln())}),bt.on("conversation",({id:i})=>{S.store.visits.includes(i)&&_l(i),Mn(i)})];let{visits:e,titles:o,previews:n}=S.store,r=e.filter(i=>i!==Et&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(S.store.visits=e.filter(i=>!r.includes(i))),$l(Ln())},stop(){di?.abort();for(let t of Zl)t();vo()}});var pi="data:audio/mpeg;base64,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";var ec=new q("ResponseNotification"),lf=.5,cf=200,uf=300,xo=A({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:t=>(t.append(K("Preview",ic)),()=>t.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),oc=null,fi=new Map,nc,gi;function df(t){return new Promise((e,o)=>GM_xmlhttpRequest({url:t,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=cf&&n<uf?e(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var mf=t=>Uint8Array.from(atob(t.slice(t.indexOf(",")+1)),e=>e.charCodeAt(0)).buffer;function pf(t,e){let o=fi.get(e);return o||(o=(e.startsWith("data:")?Promise.resolve(mf(e)):df(e)).then(n=>t.decodeAudioData(n)),o.catch(()=>fi.delete(e)),fi.set(e,o)),o}async function rc(t){oc??=new AudioContext;let e=oc;e.state==="suspended"&&e.resume();let o=e.createBufferSource(),n=e.createGain();o.buffer=await pf(e,t),n.gain.value=lf,o.connect(n).connect(e.destination),o.start()}function ic(){let t=xo.store.soundUrl.trim();rc(t||pi).catch(e=>{ec.warn("Sound failed",e),t&&rc(pi).catch(o=>ec.warn("Default chime failed",o))})}function ff(t){let e=`${t??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:e,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:e,silent:!0});o.onclick=()=>{focus(),o.close()}}function gf(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(gi=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:gi.signal}))}var ac=g({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:xo,start(){gf(),nc=P.on("fall",({conversationId:t,outcome:e})=>{e==="done"&&(xo.store.onlyWhenHidden&&!document.hidden||(xo.store.sound&&ic(),xo.store.browserNotification&&ff(Ao(t))))})},stop(){nc?.(),gi?.abort()}});var hf=`:is(${l.sidebarScroll}, :has(> ${l.sidebarScroll})) + :has(${l.menuButton})`,bf=`${l.rail} > :has(${l.menuButton})`,bi=`:is(${hf}, ${bf}, ${l.oldProfile}):not(:hover)`,hi="[data-bloom-profile-avatar]",yf=`:is(${bi}, ${bi} :has(${hi})) > :not(${hi}, :has(${hi}))`,lc=A({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function Af(){let{opacity:t,fadeAvatar:e}=lc.store;return t>=100?"":`${e?bi:yf}{opacity:${t/100}!important}`}var sc,cc=g({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:lc,styles:Af,start(){sc=ct()},stop(){sc?.()}});var uc=`/*
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
`;var R=k("bloom-star-chats"),xf=80,qf=60,wf=1200,Sf=120,qo=A({replaceReadAloud:{type:"boolean",description:"Put the star where the reply's Read aloud button is, and hide that button.",default:!0},messages:{type:"custom",default:[]}}),Ef=`:is(${l.turnActions}) ${l.readAloud}`,yi,Ai=!1,Ft=!1,ue=!1,kn=0,Y=null,Bn="",C=null,vi,Kt;function qi(){let t=qo.store.messages;return Array.isArray(t)?t.filter(e=>H(e)&&typeof e.conversationId=="string"&&typeof e.messageId=="string"&&(e.role==="user"||e.role==="assistant")&&typeof e.snippet=="string"&&typeof e.starredAt=="number"):[]}function wi(){let t=b();return t?qi().filter(e=>e.conversationId===t):[]}function Tf(t,e){return qi().some(o=>o.conversationId===t&&o.messageId===e)}function dc(t){let e=qi(),o=e.some(n=>n.conversationId===t.conversationId&&n.messageId===t.messageId);qo.store.messages=o?e.filter(n=>!(n.conversationId===t.conversationId&&n.messageId===t.messageId)):[{...t,starredAt:Date.now()},...e].slice(0,xf)}function xi(t){return t.messageIds[0]||t.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||t.el.getAttribute("data-turn-key")||""}function Mf(t){return rt(ve(t)||h(t.el.textContent??""),qf)}function Cf(t){let e=t.closest(l.turn);if(!e)return null;let o=Ht().filter(n=>e.contains(n.el));return o.find(n=>n.el.contains(t)||n.el===e)??o.findLast(n=>n.el.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING)??null}function Lf(){let t=[...document.querySelectorAll(l.turnActions)].filter(e=>!e.closest(`[data-bloom], [role="dialog"], [inert], pre, ${l.sidebars}`));return t.filter(e=>!t.some(o=>o!==e&&o.contains(e)))}function kf(t,e){let o=qo.store.replaceReadAloud?e.querySelector(l.readAloud):null;if(o&&!o.closest("[data-bloom]")){t.nextElementSibling!==o&&o.before(t);return}let n=Bf(e);(t.parentElement!==n||n.lastElementChild!==t)&&n.append(t)}function Bf(t){let e=[...t.querySelectorAll("button")].filter(n=>n.dataset.bloom!=="message-star"&&!n.closest("[data-bloom]"));return e.length?[...t.children].find(n=>n instanceof HTMLElement&&n!==e[0]&&e.every(r=>n.contains(r)))??t:t}function If(){return[...document.querySelectorAll(l.headerMore)].filter(e=>{if(e.dataset.bloom==="message-star"||e.closest("[data-bloom], [role='dialog'], [inert]")||e.closest(l.sidebars))return!1;let o=e.getBoundingClientRect();return o.width===0&&o.height===0?!!e.closest("header, #page-header"):o.top>=0&&o.top<96&&o.left>window.innerWidth*.5}).toSorted((e,o)=>o.getBoundingClientRect().left-e.getBoundingClientRect().left||(e.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1))[0]??null}function mc(t,e,o){return s("button",{class:e,attrs:{type:"button","aria-label":t},on:{pointerdown:n=>n.stopPropagation(),mousedown:n=>n.stopPropagation(),click:n=>{n.preventDefault(),n.stopPropagation(),o(n)}}},F("star"))}function Pf(t,e){t.setAttribute("aria-pressed",String(e)),t.setAttribute("aria-label",e?"Unstar":"Star")}function In(){return Ft||ue}function Re(){kn&&window.clearTimeout(kn),kn=0}function He(){Ft=!1,ue=!1,Re(),Kt?.enter(),Y?.remove(),Y=null,Bn="",C?.classList.remove(R("-open")),C?.setAttribute("aria-expanded","false")}function Pn(t){return t instanceof Node&&!!(C?.contains(t)||Y?.contains(t))}function Of(t){t.classList.add(R("-flash")),window.setTimeout(()=>t.classList.remove(R("-flash")),wf)}function Rf(t){let e=Ht().find(n=>xi(n)===t),o=e?.el.closest(l.turn)??e?.el;o&&(o.scrollIntoView({block:"start"}),Of(o))}function Hf(){let t=b(),e=new Set,o=[...document.querySelectorAll('[data-bloom="message-star"][data-place="action"]')];if(!t||zt()){for(let n of o)n.remove();return}for(let n of Lf()){if(!lt(n))continue;let r=Cf(n),i=r?xi(r):"";if(!r||!i)continue;let a=n.querySelector('[data-place="action"]');(!a||a.dataset.id!==i)&&(a?.remove(),a=mc("Star",R("-star"),()=>{let d=b(),c=Ht().find(u=>xi(u)===i);!d||!c||dc({conversationId:d,messageId:i,role:c.role,snippet:Mf(c)})}),a.dataset.bloom="message-star",a.dataset.place="action",a.dataset.id=i),Pf(a,Tf(t,i)),kf(a,n),e.add(a)}for(let n of o)e.has(n)||n.remove()}function Df(){if(!Y||!C)return;let t=C.getBoundingClientRect(),e=Y.offsetWidth||288,o=Y.offsetHeight||120,n=t.bottom+6;n+o>window.innerHeight-8&&(n=Math.max(8,t.top-o-6));let r=Math.max(8,Math.min(t.right-e,window.innerWidth-e-8));Y.dataset.place=n>=t.bottom?"below":"above",Y.style.left=`${Math.round(r)}px`,Y.style.top=`${Math.round(n)}px`}function Nf(){if(!In()||!C){Y?.remove(),Y=null,Bn="",C?.classList.remove(R("-open")),C?.setAttribute("aria-expanded","false");return}let t=wi(),e=t.map(o=>`${o.messageId}	${o.snippet}`).join(`
`);if(!Y||Bn!==e){Y?.remove();let o=t.map(n=>s("div",{class:R("-row")},s("button",{class:R("-jump"),attrs:{type:"button"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),He(),Rf(n.messageId)}}},s("span",{class:R("-role"),text:n.role==="user"?"You":"ChatGPT"}),s("span",{class:R("-snip"),text:n.snippet||"Message"})),mc("Unstar",R("-unstar"),()=>dc(n))));Y=s("div",{class:`bloom-root ${R("-panel")}`,attrs:{"data-bloom":"star-list"},on:{pointerenter:()=>{Re(),Kt?.enter(),ue=!0},pointerleave:n=>{Pn(n.relatedTarget)||Ft||Kt?.leave(n)}}},s("div",{class:R("-bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:R("-head"),text:"Starred"}),s("div",{class:R("-body")},...o.length?o:[s("div",{class:R("-empty"),text:"No starred messages in this chat"})])),document.body.append(Y),Bn=e}Df(),C.classList.add(R("-open")),C.setAttribute("aria-expanded","true")}function Uf(){for(let r of document.querySelectorAll('[data-bloom="starred"]'))r.remove();let t=If(),e=t?.parentElement??null,o=b();if(!t||!e||e.closest(l.sidebars)||!o||zt()||!lt(e)){C?.remove(),C=null,He();return}C||(C=s("button",{class:R("-toggle"),attrs:{type:"button","data-bloom":"message-star","data-place":"header","aria-label":"Starred messages","aria-expanded":"false"},on:{pointerdown:r=>r.stopPropagation(),pointerenter:()=>{Re(),Kt?.enter(),kn=window.setTimeout(()=>{ue=!0,ce()},Sf)},pointerleave:r=>{Pn(r.relatedTarget)||(Re(),In()&&Kt?.leave(r))},click:r=>{r.preventDefault(),r.stopPropagation(),Ft=!Ft,ue=Ft,Re(),Ft||He(),ce()}}},F("star"))),(C.parentElement!==e||C.nextElementSibling!==t)&&t.before(C);let n=t.getBoundingClientRect();n.width>0&&(C.style.width=`${n.width}px`,C.style.height=`${n.height}px`),C.classList.toggle(R("-here"),wi().length>0),Nf()}function Ff(){let t=new Set(wi().map(e=>e.messageId));for(let e of document.querySelectorAll('[data-bloom="navigator"] .bloom-nav-tick, [data-bloom="navigator"] .bloom-nav-row'))e.classList.toggle(R("-mark"),!!e.dataset.messageId&&t.has(e.dataset.messageId))}function ce(){if(!Ai){Ai=!0;try{for(let t of document.querySelectorAll('[data-bloom="starred"], [data-bloom="chat-star"]'))t.remove();Hf(),Uf(),Ff()}finally{Ai=!1}}}function Kf(){He(),C?.remove(),C=null;for(let t of document.querySelectorAll('[data-bloom="message-star"], [data-bloom="star-list"], [data-bloom="starred"], [data-bloom="chat-star"]'))t.remove();for(let t of document.querySelectorAll(`.${R("-mark")}`))t.classList.remove(R("-mark"))}var pc=g({name:"StarChats",description:"Star a message from its toolbar. The star left of the top-right menu opens this chat's list.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:qo,styles:()=>`${uc}${qo.store.replaceReadAloud?Mt([Ef]):""}`,onSettingsChange(t){(t==="messages"||t==="replaceReadAloud")&&ce()},start(){for(let o of document.querySelectorAll('[data-bloom="star-list"]'))o.remove();Kt=_o({over:Pn,trigger:()=>C,panel:()=>Y,setHeld(o){if(o){ue=!0,ce();return}Ft||(ue=!1,ce())}}),yi=T(o=>D(o)&&ce());let t=o=>{Pn(o.target)||In()&&He()};document.addEventListener("pointerdown",t,!0);let e=o=>{o.key!=="Escape"||!In()||(o.preventDefault(),He())};document.addEventListener("keydown",e,!0),vi=()=>{document.removeEventListener("pointerdown",t,!0),document.removeEventListener("keydown",e,!0)},ce()},stop(){yi?.(),yi=void 0,vi?.(),vi=void 0,Re(),Kt?.dispose(),Kt=void 0,Kf()}});var fc="filter:blur(6px)!important;transition:filter 0.2s ease",ex=`:is(${l.sidebars})`,de="data-bloom-streamer-open",Gf="[data-app-action-sidebar-thread-row], [data-app-action-sidebar-project-row], .bloom-recent-item",gc=":not([data-app-action-sidebar-thread-row] *, [data-app-action-sidebar-project-row] *)";function Yf(){return{conversations:{selectors:["[data-app-action-sidebar-thread-title]"],hover:!0,row:"[data-app-action-sidebar-thread-row]"},projects:{selectors:["[data-app-action-sidebar-project-label]"],hover:!0,row:"[data-app-action-sidebar-project-row]"},accountAvatar:{selectors:["[data-bloom-profile] img","[data-bloom-menu] img"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:[`[data-thread-title]${gc}`,`[data-thread-title-trigger]${gc}`],hover:!1}}}var hc=A({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function jf(t,e){let o=[`:is(${t}):hover`,`.bloom-recent-item:hover :is(${t})`,`:is(${t})[${de}]`];return e&&o.push(`${e}:hover`,`${e}:hover :is(${t})`,`${e}:is(${t}):hover`,`${e}[${de}]`,`${e}[${de}] :is(${t})`),o.join(",")}function Wf(){let t=Yf();return Object.entries(t).filter(([e])=>hc.store[e]).map(([,e])=>{let o=e.selectors.join(",");if(!e.hover)return`:is(${o}){${fc}}`;let n="row"in e?e.row:void 0;return`:is(${o}){${fc}}${jf(o,n)}{filter:none!important}`}).join(`
`)}function Qf(t,e){for(let o of document.elementsFromPoint(t,e))if(o instanceof Element){let n=o.closest(Gf);if(n)return n}return null}function Ti(t){for(let e of document.querySelectorAll(`[${de}]`))e!==t&&e.removeAttribute(de);t&&!t.hasAttribute(de)&&t.setAttribute(de,"")}var De,zf=Ct(()=>{De&&Ti(Qf(De.clientX,De.clientY))});function Si(t){De=t,zf()}function Vf(t){t.relatedTarget instanceof Node&&document.documentElement.contains(t.relatedTarget)||(De=void 0,Ti(null))}var Ei,On,bc=g({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:hc,styles:Wf,start(){Ei=ct(),On=new AbortController;let t={capture:!0,signal:On.signal,passive:!0};document.addEventListener("pointerover",Si,t),document.addEventListener("pointermove",Si,t),document.addEventListener("pointerout",Si,t),window.addEventListener("pointerleave",Vf,t)},stop(){On?.abort(),On=void 0,De=void 0,Ti(null),Ei?.(),Ei=void 0}});var Gt=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)','[data-turn-key] [data-message-author-role="user"] blockquote:not(.twitter-tweet)','[class~="group/user-message"] blockquote:not(.twitter-tweet)'].join(","),Mi=A({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function Jf(){let t=[`${Gt}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${Gt}>*{margin-block:0!important}`];return Mi.store.italic||t.push(`${Gt}{font-style:inherit!important}`),Mi.store.quotes||(t.push(`${Gt}{quotes:none!important}`),t.push(`${Gt}::before,${Gt}::after,${Gt} p::before,${Gt} p::after{content:none!important}`)),t.join(`
`)}var yc=g({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:Mi,styles:Jf});var Zf=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],Xf=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",$f='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',Ac=A({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function _f(){let t=`${Ac.store.width}rem`;return`:root,[data-app-action-timeline-scroll],[data-chatgpt-composer],[data-composer-input]{--thread-content-max-width:${t}!important;--composer-adjacent-max-width:${t}!important}`}var vc=g({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:Ac,styles:_f});var tg=[$a,Ms,Hs,Us,Gs,js,$s,ll,hl,ql,Ul,Kl,Gl,zl,tc,ac,cc,pc,bc,yc,vc],Ci=tg;var eg=new q("Bloom"),xc="2.0.91";var Li=0,Rn,wo="__bloomOnShortcut";function Hn(t){if(t.isComposing||!t.shiftKey||!(t.metaKey||t.ctrlKey)||t.key!=="b"&&t.key!=="B")return;t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation();let e=Fa();Pt();for(let o of document.querySelectorAll("[data-bloom='settings']"))o.remove();e||be()}function og(){let t=_;t[wo]&&document.removeEventListener("keydown",t[wo],!0),t[wo]=Hn,document.addEventListener("keydown",Hn,!0)}function ng(){Li++,document.removeEventListener("keydown",Hn,!0);let t=_;t[wo]===Hn&&delete t[wo],Rn?.(),Rn=void 0,da(),Fe(),To()}async function ki(){let t=++Li,e=()=>t===Li;Fe(),To();for(let o of Ci)o.updatedAt=Ca[o.name];na(Ci),_i(),So("base",pa),Ta(),og(),Ho("Init"),$n().then(()=>{e()&&(Gi(),Ho("DOMContentLoaded"))}),await _n(),e()&&(Ho("HostReady"),Rn?.(),Rn=Ya(),ua(),eg.info(`Bloom++ ${xc} app host ready`))}var rg=new q("Boot");window===window.top&&(ji(_.Bloom),Wi(Bi),ki().catch(t=>rg.error("Startup failed",t)));})();
