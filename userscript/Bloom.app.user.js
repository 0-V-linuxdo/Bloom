// ==UserScript==
// @name         Bloom++ (ChatGPT app)
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.89
// @description  Bloom++ host for the official ChatGPT macOS app. Injected over loopback CDP; not a web userscript.
// @author       0-V-linuxdo & Bloom contributors
// @homepageURL  https://github.com/0-V-linuxdo/Bloom
// @supportURL   https://github.com/0-V-linuxdo/Bloom/issues
// @match        app://*/*
// @run-at       document-start
// @grant        none
// @license      GPL-3.0-or-later
// ==/UserScript==

/* Bloom++ v2.0.89 ChatGPT app host. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var hc=Object.defineProperty;var bc=(t,e)=>{for(var o in e)hc(t,o,{get:e[o],enumerable:!0})};var x=class{constructor(e){this.tag=e}log(e,o){console[e](`[Bloom++] [${this.tag}]`,...o)}debug(...e){this.log("debug",e)}info(...e){this.log("info",e)}warn(...e){this.log("warn",e)}error(...e){this.log("error",e)}};var $=(t,e,o)=>Math.min(o,Math.max(e,t)),R=t=>typeof t=="object"&&t!==null&&!Array.isArray(t),Mi=t=>`${t}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,nt=(t,e)=>t.length>e?`${t.slice(0,e-1)}\u2026`:t,h=t=>t.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function Ci(t,e){return`${t} ${e}${t===1?"":"s"}`}async function Li(t){if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}await navigator.clipboard.writeText(t)}function ki(t){try{return JSON.parse(t)}catch{return}}var _=typeof unsafeWindow>"u"?window:unsafeWindow;var yc=new x("Styles"),wt=new Map,Pe=new Set,Ft=new Map,On=!0,Bi=t=>t.replaceAll(/[^A-Za-z0-9_-]/g,"_"),Ac=t=>`:where(:root){--bloom-sheet-${Bi(t)}:1}`,vc=(t,e)=>`${Ac(t)}${e}`,Ii=t=>`bloom-style-${t}`;function Pi(t){try{return[...t.cssRules].map(e=>e.cssText).join(`
`)}catch{return""}}function qc(t,e){let o=Pi(t);return o?o.includes(`--bloom-sheet-${Bi(e)}`)?!0:e==="plugin-StreamerMode"?o.includes("blur(6px)")&&(o.includes("data-app-action-sidebar-thread-title")||o.includes("data-bloom-streamer-open")):e==="plugin-WiderChat"?o.includes("--composer-adjacent-max-width")&&o.includes("--thread-content-max-width"):e==="plugin-ComposerOpacity"?o.includes("--composer-layout-surface-backdrop-filter")||o.includes("--composer-layout-surface-background")&&o.includes("color-mix"):!1:!1}function Oi(t){let e=Pi(t);return e?!!(e.includes("--bloom-")||e.includes(".bloom-")||e.includes("[data-bloom")||e.includes("--bloom-sheet-")||e.includes("blur(6px)")&&e.includes("data-app-action-sidebar-thread-title")||e.includes("--composer-adjacent-max-width")&&e.includes("--thread-content-max-width")||e.includes("--composer-layout-surface-backdrop-filter")):!1}function Ri(){let t=document.adoptedStyleSheets.filter(e=>!Pe.has(e)&&!Oi(e));document.adoptedStyleSheets=[...t,...wt.values()]}function Hi(t){document.readyState==="loading"||t.parentNode===document.head||document.head.append(t)}function xc(t,e){let o=Ft.get(t);o||(o=document.createElement("style"),o.id=Ii(t),Ft.set(t,o)),o.textContent!==e&&(o.textContent=e),Hi(o)}function vo(t,e){let o=vc(t,e);if(On)try{let n=wt.get(t);n||(n=new _.CSSStyleSheet,wt.set(t,n),Pe.add(n)),n.replaceSync(o),Ri();return}catch(n){yc.warn("Constructed style sheets unavailable, using <style> after parsing",n),On=!1;let r=wt.get(t);r&&Pe.delete(r),wt.delete(t)}xc(t,o)}function Oe(t){let e=wt.get(t);e&&(Pe.delete(e),wt.delete(t)),Ft.get(t)?.remove(),Ft.delete(t);for(let o of document.querySelectorAll(`style[id="${Ii(t)}"]`))o.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(o=>o!==e&&!qc(o,t)),On&&Ri()}catch{}}function Re(){wt.clear(),Pe.clear();for(let t of Ft.values())t.remove();Ft.clear();for(let t of document.querySelectorAll("style[id^='bloom-style-']"))t.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(t=>!Oi(t))}catch{}}function Di(){for(let t of Ft.values())Hi(t)}var k=t=>(...e)=>e.map(o=>t+o).join(" "),qo=(...t)=>t.filter(Boolean).join(" "),St=t=>t.length?`${t.map(e=>`${e}:not([data-bloom])`).join(",")}{display:none!important}`:"";var Ni="__bloomHost",Rn=new x("Boot"),wc=['[data-bloom="navigator"]','[data-bloom="settings"]','[data-bloom="history-hud"]','[data-bloom="star-list"]','[data-bloom="entry"]','[data-bloom="menu-entry"]','[data-bloom="message-star"]','[data-bloom="queue"]','[data-bloom="recent"]','[data-bloom="quote-chip"]'].join(", ");function xo(){if(!(typeof document>"u"||!document.documentElement)){for(let t of document.querySelectorAll(wc))t.remove();for(let t of document.querySelectorAll("[data-bloom-greeting]"))t.removeAttribute("data-bloom-greeting");for(let t of document.querySelectorAll("[data-bloom-placeholder]"))t.removeAttribute("data-bloom-placeholder");for(let t of document.querySelectorAll("[data-bloom-streamer-open]"))t.removeAttribute("data-bloom-streamer-open")}}function Sc(t){if(Rn.warn("Replacing another Bloom++ instance",t.VERSION),t.destroy){t.destroy();return}for(let e of t.plugins?.values()??[]){try{e.stop?.()}catch(o){Rn.error("Failed to stop previous plugin",o)}e.styles="",e.start=void 0}Re()}function Ui(t){let e=_,o=new Set;for(let n of[t,e.Bloom,e[Ni]])if(!(!n||o.has(n))){o.add(n);try{Sc(n)}catch(r){Rn.error("Failed to retire Bloom++",r)}}xo()}function Fi(t){let e=_;try{delete e.Bloom}catch{}Object.defineProperty(e,"Bloom",{value:t,configurable:!0,writable:!0}),Object.defineProperty(e,Ni,{value:t,configurable:!0,writable:!0})}var Ti={};bc(Ti,{VERSION:()=>fc,destroy:()=>Jf,init:()=>Ei,plugins:()=>et});var Ec=new x("Dom");function l(t,e={},...o){let n=document.createElement(t);e.class&&(n.className=e.class),e.text!=null&&(n.textContent=e.text),e.title&&(n.title=e.title);for(let[r,i]of Object.entries(e.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(e.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var Gi=document.createElement("template");function Ki(t){return Gi.innerHTML=t.trim(),Gi.content.firstElementChild.cloneNode(!0)}var rt=t=>t instanceof HTMLElement&&t.isConnected&&t.getClientRects().length>0&&!t.closest("[inert]"),it=(t,e=document)=>[...e.querySelectorAll(t)].find(rt)??null,Tc=16,Mc="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function Yi(t,e){let o=setInterval(t,e),n;try{n=new Worker(URL.createObjectURL(new Blob([Mc],{type:"text/javascript"}))),n.addEventListener("message",t),n.postMessage(e)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function Hn(t){document.hidden?setTimeout(t,Tc):requestAnimationFrame(t)}function Et(t){let e=!1;return()=>{e||(e=!0,Hn(()=>{e=!1;try{t()}catch(o){Ec.error("Scheduled task failed",o)}}))}}var wo=new Set,So=[],He,Cc=Et(()=>{let t=So;So=[];for(let e of wo)e(t)});function T(t){return wo.add(t),He||(He=new MutationObserver(e=>{So.push(...e),Cc()}),He.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),t([]),()=>{wo.delete(t),!wo.size&&(He?.disconnect(),He=void 0,So=[])}}var Lc=t=>t instanceof Element&&(t.hasAttribute("data-bloom")||!!t.closest("[data-bloom]")),H=t=>!t.length||t.some(e=>!Lc(e.target)),kc=t=>`"${t.replaceAll("\\","\\\\").replaceAll('"','\\"').replaceAll(`
`,"\\A ")}"`;function Gt(t,e){if(e==null){t.removeAttribute("data-bloom-text"),t.style.removeProperty("--bloom-text-size"),t.style.removeProperty("--bloom-text");return}t.style.setProperty("--bloom-text",kc(e)),t.getAttribute("data-bloom-text")!==e&&t.setAttribute("data-bloom-text",e)}function g(t){return t}var Bc=new x("Storage");function ji(t){try{return localStorage.getItem(t)??void 0}catch{return}}function Wi(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch(o){Bc.warn("localStorage write failed",o)}}function Qi(t,e){addEventListener("storage",o=>{o.key===t&&e(o.newValue)})}var Dn="BloomSettings",Ic=100,ce={plugins:{}},Eo=new Set,Nn=new Set,De;function zi(t){let e=t;for(let o=0;typeof e=="string"&&o<2;o++)e=ki(e);return!R(e)||!R(e.plugins)||!Object.keys(e.plugins).length?null:e}function Vi(){let t=zi(ji(Dn));t&&(ce.plugins=t.plugins)}var Ji=(t,e)=>`${t}
${e}`;function Zi(){De=void 0,Nn.clear(),Wi(Dn,ce)}function Pc(t){let e=zi(t);if(!e)return;let o=[];for(let n of new Set([...Object.keys(ce.plugins),...Object.keys(e.plugins)])){let r=ce.plugins[n]??={},i=R(e.plugins[n])?e.plugins[n]:{};for(let a of new Set([...Object.keys(r),...Object.keys(i)]))Nn.has(Ji(n,a))||JSON.stringify(r[a])===JSON.stringify(i[a])||(i[a]===void 0?delete r[a]:r[a]=i[a],o.push([n,a]))}for(let[n,r]of o)for(let i of Eo)i(n,r)}function Un(){De&&(clearTimeout(De),Zi())}var Tt=(t,e)=>ce.plugins[t]?.[e];function Kt(t,e,o){let n=ce.plugins[t]??={};o===void 0?delete n[e]:n[e]=o,Nn.add(Ji(t,e)),clearTimeout(De),De=setTimeout(Zi,Ic);for(let r of Eo)r(t,e)}function ue(t){return Eo.add(t),()=>void Eo.delete(t)}function Fn(t){return t.type==="component"?void 0:t.default}function A(t){let e={def:t,pluginName:"",store:new Proxy({},{get:(o,n)=>Tt(e.pluginName,n)??(t[n]&&Fn(t[n])),set:(o,n,r)=>(Kt(e.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(t))t[o].type!=="custom"&&Tt(e.pluginName,o)!==void 0&&Kt(e.pluginName,o)}};return e}var Xi=t=>{let e=()=>{let o=Tt("Settings",t);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>e().includes(o),list:e,toggle(o){let n=e();Kt("Settings",t,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},To=Xi("pinnedPlugins"),Mo=Xi("starredPlugins");addEventListener("pagehide",Un);Qi(Dn,Pc);var Lo=new x("PluginManager"),et=new Map,Mt=new Set,ko=new Set,Gn=new Set;function $i(t){for(let e of t)e.settings&&(e.settings.pluginName=e.name),et.set(e.name,e)}var mt=t=>!!t.required||(Tt(t.name,"enabled")??!!t.enabledByDefault),Kn=t=>Mt.has(t),Ne=t=>`plugin-${t.name}`;function _i(t){if(!t.styles)return;let e=typeof t.styles=="function"?t.styles():t.styles;e?vo(Ne(t),e):Oe(Ne(t))}function ta(t){if(!Mt.has(t.name))try{_i(t),t.start?.(),Mt.add(t.name)}catch(e){Oe(Ne(t)),Lo.error(`Failed to start ${t.name}`,e)}}function Bo(t){Mt.delete(t.name),Oe(Ne(t));try{t.stop?.()}catch(e){Lo.error(`Failed to stop ${t.name}`,e)}}var Yn=t=>t.startAt??"HostReady";function ea(t){if(mt(t)){ko.has(Yn(t))&&ta(t);return}Bo(t)}function Io(t){ko.add(t);for(let e of et.values())Yn(e)===t&&ea(e);Lo.info(`${t}: ${[...Mt].join(", ")}`)}function oa(t){Bo(t)}function na(t){mt(t)&&ko.has(Yn(t))&&ta(t)}function ra(t,e){Kt(t.name,"enabled",e),Un()}function Oc(){for(let t of et.values())t.required||mt(t)||(Mt.has(t.name)?Bo(t):Oe(Ne(t)))}var Co;function ia(){Co?.(),Co=T(()=>Oc())}function aa(){Co?.(),Co=void 0;for(let t of et.values())Bo(t);Mt.clear(),ko.clear()}function sa(t){return Gn.add(t),()=>void Gn.delete(t)}ue((t,e)=>{let o=et.get(t);if(o){if(e==="enabled"){typeof Tt(t,"enabled")=="boolean"&&ea(o);for(let n of Gn)n();return}if(Mt.has(t))try{_i(o),o.onSettingsChange?.(e)}catch(n){Lo.error(`Settings change failed for ${t}`,n)}}});var la=`/*
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
`;var Hc=new x("Events");function de(){let t=new Map;return{on(e,o){let n=t.get(e);return n||t.set(e,n=new Set),n.add(o),()=>void n.delete(o)},emit(e,o){for(let n of t.get(e)??[])try{n(o)}catch(r){Hc.error(`Listener for ${String(e)} failed`,r)}}}}function ca(t,e){let o=t instanceof Element?[t,...t.querySelectorAll("*")]:[...t.querySelectorAll("*")];for(let n of o){let r=n.shadowRoot;r&&(e(r),ca(r,e))}}function Ct(t,e=document){let o=[...e.querySelectorAll(t)];return ca(e,n=>o.push(...n.querySelectorAll(t))),o}var ot=(t,e=document)=>Ct(t,e).find(rt)??null;var s={rail:"[data-app-navigation-rail]",sidebarScroll:"[data-app-action-sidebar-scroll]",sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"[data-app-action-sidebar-scroll]",oldRail:"[data-app-navigation-rail]",oldProfile:'button[aria-label="Open profile menu" i]',threadRow:"[data-app-action-sidebar-thread-row]",threadSelected:"[data-app-action-sidebar-thread-row][data-app-action-sidebar-thread-selected='true']",threadTitle:"[data-app-action-sidebar-thread-title]",projectRow:"[data-app-action-sidebar-project-row]",projectLabel:"[data-app-action-sidebar-project-label]",destination:"[data-sidebar-destination]",conversationLink:"[data-app-action-sidebar-thread-row]",timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:"[data-turn-key]",turn:"[data-turn-key]",messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",userBubble:'[class~="group/user-message"]',assistantReply:"[data-response-annotation-target]",oldThread:"[data-app-action-timeline-scroll]",turnActions:'.turn-action-controls, [class*="turn-action-controls"]',readAloud:'button:is([aria-label="Read aloud" i], [aria-label^="Read aloud" i], [aria-label="Stop reading" i], [aria-label^="Stop reading" i], [aria-label="\u6717\u8BFB"], [aria-label^="\u6717\u8BFB"], [aria-label="\u505C\u6B62\u6717\u8BFB"], [data-testid*="read-aloud" i])',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery, [class*='recovery']",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composer:"[data-chatgpt-composer], [data-composer-input]",composerInput:'[data-composer-input] [contenteditable="true"].ProseMirror, [contenteditable="true"].ProseMirror',composerConversation:"[data-above-composer-conversation-id]",oldComposerForm:"[data-chatgpt-composer]",sendButton:'button[aria-label="Send" i], button[aria-label="Send prompt" i], button[aria-label="Send message" i]',stopButton:'button[aria-label="Stop" i], button[aria-label^="Stop " i], button[aria-label="\u505C\u6B62" i], button[aria-label^="\u505C\u6B62"]',composerFooter:"[data-chatgpt-composer]",modelTrigger:'button[aria-label="Model selector" i], button[aria-label="Select ChatGPT model" i], [data-chatgpt-composer] button[aria-haspopup="menu"]',modelItem:'[role="menu"] [role="menuitemradio"], [role="menu"] [role="menuitem"]',effortSlider:'[role="menu"] [data-reasoning-slider]',homeHeading:'main h1:not([aria-hidden="true"]), [role="main"] h1:not([aria-hidden="true"]), [data-testid="home-heading"], [data-homepage-takeover] h1, .heading-xl, [class~="heading-xl"]',headerMore:'button[aria-label="More" i], button[aria-label="\u66F4\u591A"]',headerTitle:"[data-thread-title], [data-thread-title-trigger]",profile:'button[aria-label="Open profile menu" i]',rightPanel:"aside[data-app-shell-focus-area='right-panel']",summaryPanel:"[data-summary-panel-variant]"};var ua=/[​-‍﻿]/g,pt=()=>ot(s.composerInput),Ue=t=>t instanceof HTMLElement&&t.matches(s.composerInput),J=(t=pt())=>t?.closest("form")??t?.closest(s.composer)??ot(s.composer);function U(t=pt()){if(!t)return"";if(t instanceof HTMLTextAreaElement)return t.value.replace(ua,"").trim();let e=t.cloneNode(!0);for(let n of e.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...e.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:e.textContent??"").replace(ua,"").trim()}var Dc=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function da(t,e){let o=e?"insertText":"deleteContentBackward";t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:o,data:e||null})),t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:o,data:e||null}))}function Lt(t,e=pt()){if(!e)return!1;if(e.focus(),e instanceof HTMLTextAreaElement)return Dc?.call(e,t),e.dispatchEvent(new Event("input",{bubbles:!0})),e.setSelectionRange(t.length,t.length),!0;let o=getSelection();return o?.selectAllChildren(e),typeof document.execCommand=="function"?t?document.execCommand("insertText",!1,t):document.execCommand("delete"):da(e,t),U(e)!==t.trim()&&da(e,t),o?.selectAllChildren(e),o?.collapseToEnd(),!0}function ma(t,e){let o=t;for(;o&&o!==e;){if(o instanceof HTMLElement&&o.parentElement===e)return o;o=o.parentNode}return null}function pa(t,e,o){let n=document.createRange();return n.selectNodeContents(t),o?n.setEnd(e.startContainer,e.startOffset):n.setStart(e.endContainer,e.endOffset),n.toString().includes(`
`)?!0:!!n.cloneContents().querySelector("br")}function fa(t){if(t instanceof HTMLTextAreaElement){let{selectionStart:v,selectionEnd:C,value:p}=t;return{first:!p.slice(0,v).includes(`
`),last:!p.slice(C).includes(`
`)}}let e=getSelection();if(!e?.rangeCount||!t.contains(e.anchorNode))return{first:!0,last:!0};let o=e.getRangeAt(0),n=[...t.children].filter(v=>v instanceof HTMLElement),r=ma(o.startContainer,t),i=ma(o.endContainer,t),a=!r||r===n[0],u=!i||i===n[n.length-1],c=o.getBoundingClientRect(),d=(r??t).getBoundingClientRect(),m=Number.parseFloat(getComputedStyle(r??t).lineHeight)||24;return c.height?{first:a&&c.top-d.top<m,last:u&&d.bottom-c.bottom<m}:{first:a&&!pa(r??t,o,!0),last:u&&!pa(i??t,o,!1)}}var ga=t=>{let e=J();return(e&&ot(t,e))??ot(t)},jn=()=>ga(s.stopButton),Nc=()=>{let t=ga(s.sendButton);return t&&!t.matches(s.stopButton)?t:null};function ha(){let t=Nc();if(t){t.disabled||t.click();return}pt()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var ba=()=>rt(jn());var Po=new x("AppProtocol"),Fe=de();function Uc(t){let e=t;if(typeof e=="string")try{e=JSON.parse(e)}catch{return null}if(Array.isArray(e)||!e||typeof e!="object")return null;let o=e,n=o.notification&&typeof o.notification=="object"?o.notification:o;if(typeof n.method!="string")return null;let r=n.params&&typeof n.params=="object"?n.params:void 0;return{method:n.method,params:r}}function Ge(t){if(Array.isArray(t)){for(let o of t)Ge(o);return}let e=Uc(t);e&&Fe.emit("note",e)}var Qn=new WeakMap,Wn=new WeakMap;function Fc(t,e){let o=Qn.get(t);if(o)return o;let n=r=>{Ge(r.data),typeof t=="function"?t.call(e,r):t.handleEvent(r)};return Qn.set(t,n),n}function Gc(){let t=MessagePort.prototype,e=t.addEventListener,o=t.removeEventListener;t.addEventListener=function(r,i,a){return r!=="message"?e.call(this,r,i,a):e.call(this,r,Fc(i,this),a)},t.removeEventListener=function(r,i,a){return r!=="message"?o.call(this,r,i,a):o.call(this,r,Qn.get(i)??i,a)};let n=Object.getOwnPropertyDescriptor(t,"onmessage");n?.set&&Object.defineProperty(t,"onmessage",{configurable:!0,enumerable:n.enumerable,get(){return Wn.has(this)?Wn.get(this):n.get?.call(this)},set(r){Wn.set(this,r),n.set.call(this,function(a){Ge(a.data),r?.call(this,a)})}})}function Kc(){let t=window.electronBridge,e=t?.subscribeToWorkerMessages;if(!(!t||typeof e!="function"))try{t.subscribeToWorkerMessages=(o,n)=>e.call(t,o,r=>{Ge(r),n(r)})}catch(o){Po.warn("electronBridge.subscribeToWorkerMessages is not writable",o)}}function Yc(){addEventListener("message",t=>Ge(t.data));try{Gc()}catch(t){Po.warn("MessagePort wrap failed",t)}try{Kc()}catch(t){Po.warn("electronBridge wrap failed",t)}Po.info("Listening for app-server notifications")}Yc();var jc=new x("AppRoute"),Wc=500,Ro=new Set,Ho=null,Oo;function b(){return(ot(s.threadSelected)??Ct(s.threadSelected)[0])?.getAttribute("data-app-action-sidebar-thread-id")??null}var Do=()=>!b(),Aa=()=>!1,Yt=()=>!1;function ya(){let t=b();if(t===Ho)return;let{href:e}=location,o={prevHref:e,href:e,prevId:Ho,id:t};Ho=t;for(let n of Ro)try{n(o)}catch(r){jc.error("Route listener failed",r)}}function Qc(){let t=new MutationObserver(ya);(()=>{document.body&&t.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-app-action-sidebar-thread-selected","data-app-action-sidebar-thread-id"]})})();let o=setInterval(ya,Wc);return()=>{t.disconnect(),clearInterval(o)}}function at(t){return Ro.add(t),Oo||(Ho=b(),Oo=Qc()),()=>{Ro.delete(t),!Ro.size&&(Oo?.(),Oo=void 0)}}var zc=250,Vc=400,P=de(),jt=!1,me=null,zt=!1,Wt="done",Qt=!1,va=!1,z=()=>({generating:jt,conversationId:b()}),Jc=t=>{if(!t)return!0;let e=b();return e?e===t||e.endsWith(t)||t.endsWith(e.replace(/^local:/,"")):!0};function Zc(t){return t==="interrupted"||t==="aborted"||t==="cancelled"?"stopped":t==="failed"||t==="error"?"error":"done"}function Xc(){return Qt||ba()}function $c(t){me=null,jt=!1,Qt=!1,P.emit("fall",{conversationId:b(),outcome:t}),zt=!1,Wt="done"}function _c(){let t=Xc();t&&!jt&&(jt=!0,zt=!1,Wt="done",P.emit("rise",{conversationId:b()})),t||!jt?me=null:me==null?me=Date.now():Date.now()-me>=Vc&&$c(zt?"stopped":Wt)}function Ke(){_c(),P.emit("tick",z())}function tu({prevId:t,id:e}){t!==e&&(jt&&(Qt=!1,me=null,jt=!1,zt=!1,Wt="done",P.emit("fall",{conversationId:t,outcome:"left"})),P.emit("context",{prevId:t,id:e,migrated:!t&&!!e}),Ke())}function eu(t){if(Jc(t.params?.threadId)){if(t.method==="turn/started"){Qt=!0,Ke();return}if(t.method==="turn/interrupt"){Qt=!1,Wt="stopped",zt=!0,Ke();return}t.method==="turn/completed"&&(Qt=!1,Wt=Zc(t.params?.turn?.status),Wt==="stopped"&&(zt=!0),Ke())}}function ou(t){t.target instanceof Element&&t.target.closest(s.stopButton)&&(zt=!0,Qt=!1)}function qa(){va||(va=!0,Fe.on("note",eu),at(tu),document.addEventListener("click",ou,!0),Yi(Ke,zc))}var nu="__reactContainer$",xa="__reactFiber$";function Vn(){return document.readyState!=="loading"?Promise.resolve():new Promise(t=>document.addEventListener("DOMContentLoaded",()=>t(),{once:!0}))}var zn=(t,e)=>Object.keys(t.wrappedJSObject??t).some(o=>o.startsWith(e)),st=t=>!zn(document,nu)||zn(t,xa);function kt(){return document.body?Promise.resolve():new Promise(t=>{let e=new MutationObserver(()=>{document.body&&(e.disconnect(),t())});e.observe(document,{childList:!0,subtree:!0})})}async function Jn(){await kt();let t=Date.now()+8e3;for(;!zn(document.body,xa)&&Date.now()<t;)await new Promise(e=>setTimeout(e,100))}var wa={BetterNavigator:1793350808e3,BetterQuotes:179333264e4,ChatListStatus:179333264e4,ChatStateFavicons:1790623094e3,Cleaner:1793267811e3,ComposerOpacity:1793344667e3,Continue:1790939902e3,CustomSidebarIdentity:1790658669e3,GreetingCustomizer:1793350808e3,InputHistory:1793350808e3,MessageTimestamps:1791080494e3,NoDictation:1793335268e3,NoShareLink:1790658669e3,NoSidebarIdentity:1790616549e3,PromptQueue:1793267321e3,RecentTopics:179333264e4,ResponseNotification:1790661368e3,Settings:1793350808e3,SidebarIdentityOpacity:1790682605e3,StarChats:1793350808e3,StreamerMode:1793344667e3,TemporaryChat:1792014624e3,UserQuotes:1793345744e3,WiderChat:179333264e4};var q=t=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`,ru="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",iu={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${ru}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:q('<path d="M18 6 6 18M6 6l12 12"/>'),gear:q('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:q('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:q('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:q('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:q('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:q('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:q('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:q('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:q('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:q('<path d="m6 9 6 6 6-6"/>'),play:q('<path d="M7 4v16l13-8z"/>'),plus:q('<path d="M12 5v14M5 12h14"/>'),check:q('<path d="m5 12 5 5 9-10"/>'),alert:q('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:q('<path d="M4 5h16v11H9l-5 4z"/>'),layout:q('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:q('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:q('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:q('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:q('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:q('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:q('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:q('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:q('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:q('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:q('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:q('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:q('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:q('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:q('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:q('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),ghost:q('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},F=t=>Ki(iu[t]);var Jt="data-bloom-tip",Zn=6,Xn=8,Vt,Sa=null;function pe(t){if(t===Sa)return;if(Sa=t,!t){Vt?.remove();return}Vt??=l("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),Vt.textContent=t.getAttribute(Jt),document.body.append(Vt);let e=t.getBoundingClientRect(),{width:o,height:n}=Vt.getBoundingClientRect(),r=e.bottom+Zn+n<=innerHeight-Xn;Vt.style.left=`${$(e.left+e.width/2-o/2,Xn,innerWidth-o-Xn)}px`,Vt.style.top=`${r?e.bottom+Zn:e.top-Zn-n}px`}var Ea=t=>t instanceof Element?t.closest(`[${Jt}]`):null;function Ta(){let t=new AbortController,e={passive:!0,signal:t.signal};return document.addEventListener("pointerover",o=>pe(Ea(o.target)),e),document.addEventListener("pointerout",o=>o.relatedTarget||pe(null),e),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&pe(Ea(o.target)),e),document.addEventListener("focusout",()=>pe(null),e),document.addEventListener("pointerdown",()=>pe(null),e),()=>{t.abort(),pe(null)}}function $n(t,e,o,n=!1){let r=l("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(t),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let a=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(a)),e(a)}),r}function G(t,e,o){return l("button",{class:qo("bloom-button",o&&`bloom-button-${o}`),text:t,attrs:{type:"button","data-bloom":"control"},on:{click:e}})}function Z(t,e,o,n){let r=l("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":e,"data-bloom":"control",[Jt]:e},on:{click:o}},F(t));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function No(t,e,o,n,r,i){let a=l("input",{attrs:{type:"range",min:String(e),max:String(o),step:String(n)}});a.value=String(t);let u=l("output",{text:`${a.value}${r}`});return a.addEventListener("input",()=>{u.textContent=`${a.value}${r}`,i(Number(a.value))}),l("div",{class:"bloom-slider"},a,u)}function _n(t,e,o){let n=l("select",{class:"bloom-select"},...e.map(r=>l("option",{text:r.label,attrs:{value:r.value}})));return n.value=t,n.addEventListener("change",()=>o(n.value)),n}function Ye(t,e,o="",n="text"){let r=l("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=t,r.addEventListener("change",()=>e(r.value)),r}var au=new x("SettingsPanel"),f=k("bloom-settings-"),su=10080*60*1e3,lu=3e3,Ma="Toggle features. Some need a reload. Click the sliders icon to configure.",cu=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],uu=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],du={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},La=new Set(["chat","ui","privacy"]),K=null,Xt="all",tr="all",Uo="",er=[],ka=()=>[...et.values()].filter(t=>!t.hidden),mu=t=>!!t.updatedAt&&Date.now()-t.updatedAt<su;function pu(t){switch(Xt){case"favorites":return Mo.has(t.name);case"recent":return mu(t);case"all":return!0;case"other":return!t.tags.some(e=>La.has(e));case"chat":case"ui":case"privacy":return t.tags.includes(Xt)}}function fu(t){switch(tr){case"all":return!0;case"enabled":return mt(t);case"disabled":return!mt(t)}}function gu(t){let e=Uo.trim().toLowerCase();return!e||[t.name,t.description,...t.tags].some(o=>o.toLowerCase().includes(e))}function hu(t){let e=To.list(),o=n=>e.includes(n.name)?e.indexOf(n.name):e.length;return Xt==="recent"?t.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):t.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var Ba=t=>t.settings?.def??{},bu=t=>Object.values(Ba(t)).some(e=>e.type!=="custom");function yu(t,e,o){let n=Tt(t.name,e)??Fn(o),r=i=>Kt(t.name,e,i);switch(o.type){case"boolean":return $n(n,r,o.description??e);case"slider":return No(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return _n(n,o.options,r);case"string":return Ye(n,r,o.placeholder);case"number":return Ye(String(n),i=>r(Number(i)),"","number");case"component":{let i=l("div",{class:f("component")});return er.push(o.render(i)),i}case"custom":return null}}var Au=t=>t.replaceAll(/([A-Z])/g," $1").replace(/^./,e=>e.toUpperCase());function Ia(t){if(!K)return;let e=Object.entries(Ba(t)).filter(([,i])=>i.type!=="custom").map(([i,a])=>{let u=yu(t,i,a),c=a.type==="boolean",d=a.type!=="component"&&l("div",{class:f("field-label"),text:Au(i)}),m=a.description&&l("div",{class:f("field-desc"),text:a.description});return l("div",{class:f("field",c?"field-inline":"field-stacked")},(d||m)&&l("div",{class:f("field-text")},d,m),u)}),o,n=G("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},lu);return}clearTimeout(o),t.settings?.reset(),je(),Ia(t)},"danger"),r=l("div",{class:f("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&je()}},l("div",{class:f("popup"),attrs:{role:"dialog","aria-label":`${t.name} settings`}},l("div",{class:f("popup-header")},l("div",{class:f("card-icon")},F(t.icon)),l("div",{class:f("popup-title")},l("div",{class:f("card-name"),text:t.name}),l("div",{class:f("popup-authors"),text:t.authors.join(", ")})),Z("close","Close",je)),l("p",{class:f("popup-desc"),text:t.description}),l("div",{class:f("fields")},...e),l("div",{class:f("popup-footer")},n)));K.querySelector(`.${f("modal")}`)?.append(r)}function je(){for(let t of er)t();er=[],K?.querySelector(`.${f("popup-backdrop")}`)?.remove()}function Ca(t){let e=mt(t),o=Mo.has(t.name),n=To.has(t.name),r=!!t.required;return l("div",{class:[f("card",e?"card-on":"card-off"),r?f("card-required"):""].filter(Boolean).join(" ")},l("div",{class:f("card-top")},l("div",{class:f("card-icon")},F(t.icon)),l("div",{class:f("card-actions")},Z("star",o?"Unstar":"Star",()=>{Mo.toggle(t.name),Zt()},o),r?null:Z("pin",n?"Unpin":"Pin to top",()=>{To.toggle(t.name),Zt()},n),r?l("span",{class:f("required-mark"),attrs:{"aria-label":"Required",[Jt]:"This plugin is required for Bloom++ to work"}},F("alert")):null,bu(t)&&Z("gear","Settings",()=>Ia(t)),$n(e,i=>ra(t,i),r?`${t.name} is required`:`Enable ${t.name}`,r))),l("div",{class:f("card-name"),text:t.name}),l("div",{class:f("card-desc"),text:t.description,title:t.description}),l("div",{class:f("card-footer"),text:t.authors.join(", ")}))}function Pa(){let t=ka().some(o=>!o.tags.some(n=>La.has(n)));K?.querySelector(`.${f("tabs")}`)?.replaceChildren(...cu.filter(o=>o.id!=="other"||t).map(o=>l("button",{class:f("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===Xt)},on:{click:()=>{Xt=o.id,Pa(),Zt()}}})))}function Zt(){if(!K)return;let t=ka().filter(pu),e=K.querySelector(`.${f("search")} input`);e&&(e.placeholder=`Search ${Ci(t.length,"plugin")}...`);let o=hu(t.filter(d=>gu(d)&&fu(d))),n=Xt==="all",r=n?o.filter(d=>!d.required):o,i=n?o.filter(d=>d.required):[],a=[...r.map(Ca),...i.length?[l("div",{class:f("required-break"),attrs:{role:"separator"}}),...i.map(Ca)]:[]],u=Uo.trim()?"No plugins match your search.":du[Xt]??"No plugins available.";K.querySelector(`.${f("grid")}`)?.replaceChildren(...a.length?a:[l("div",{class:f("empty"),text:u})])}function vu(t){t.key==="Escape"&&(t.preventDefault(),t.stopPropagation(),K?.querySelector(`.${f("popup-backdrop")}`)?je():Bt())}var Oa,or;function qu(){if(K)return;let t=l("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});t.value=Uo,t.addEventListener("input",()=>{Uo=t.value,Zt()}),K=l("div",{class:`bloom-root ${f("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:e=>e.target===e.currentTarget&&Bt()}},l("div",{class:f("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},l("div",{class:f("header")},l("div",{class:f("logo")},F("bloom")),l("h2",{class:f("title"),text:"Bloom++"}),l("span",{class:f("hint"),attrs:{"aria-label":Ma,tabindex:"0",[Jt]:Ma}},F("info")),l("span",{class:f("version"),text:"v2.0.89"}),Z("close","Close",Bt)),l("div",{class:f("tabs"),attrs:{role:"tablist"}}),l("div",{class:f("toolbar")},l("label",{class:f("search")},F("search"),t),_n(tr,uu,e=>{tr=e,Zt()})),l("div",{class:f("grid")}))),K.addEventListener("keydown",e=>e.stopPropagation()),or=new AbortController,document.addEventListener("keydown",vu,{capture:!0,signal:or.signal}),document.body.append(K),Pa(),Zt(),Oa=sa(Zt),t.focus(),au.debug("Opened")}function Bt(){je(),or?.abort(),Oa?.(),K?.remove(),K=null}var fe=()=>K?Bt():qu(),Ra=()=>!!K;var Ha=new x("AppLandmarks"),xu={Settings:[s.rail],WiderChat:[":root"],StreamerMode:[s.sidebarScroll,s.rail],ComposerOpacity:[s.composer,s.composerInput],ResponseNotification:[s.composerInput],InputHistory:[s.composerInput],Continue:[s.composerInput],ChatListStatus:[s.sidebarScroll],StarChats:[s.turn],BetterNavigator:[s.timelineScroll,s.turn],BetterQuotes:[s.turn],MessageTimestamps:[s.turn],RecentTopics:[s.sidebarScroll]};function Da(){for(let[t,e]of Object.entries(xu)){let o=et.get(t);if(!o||o.required||!mt(o))continue;if(!e.some(r=>ot(r))){if(!Kn(o.name))continue;oa(o),Ha.warn(`${t} paused; missing ${e.join(", ")}`);continue}Kn(o.name)||(na(o),Ha.info(`${t} resumed`))}}function Na(){return Da(),T(()=>Da())}var Eh=new x("Route"),wu=/\/c\/(?!local-)([\w-]+)/;var Su=()=>location.pathname.match(wu)?.[1]??null;var Th=location.href,Mh=Su();var Eu=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,Tu=/\S+@\S+\.\S+/,Mu=3;var Cu=t=>!!t.closest(".sr-only");function Lu(t){return[...t.querySelectorAll("*")].filter(e=>!e.children.length&&!e.closest("[data-bloom]")&&!!h(e.textContent??"")&&!(e instanceof SVGElement))}var ku=t=>{if(/rounded-full/.test(t.getAttribute("class")??""))return!0;if(!t.clientWidth)return!1;let{borderRadius:e}=getComputedStyle(t);return e.includes("%")||Number.parseFloat(e)>=t.clientWidth/2};function Fo(t,e,o){for(let n of t.querySelectorAll(`[${e}]`))n!==o&&n.removeAttribute(e);o&&!o.hasAttribute(e)&&o.setAttribute(e,"")}function Bu(t,e){if(h(t.textContent??"").length>Mu)return null;let o=t.closest("button");for(let n=t;n&&n!==e&&n!==o;n=n.parentElement)if(ku(n))return n;return null}function Go(t,e){t.hasAttribute(`data-bloom-${e}`)||t.setAttribute(`data-bloom-${e}`,"");let o=t.querySelector("img:not([data-bloom] img)"),n=Lu(t),r=o?null:n.map(m=>Bu(m,t)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),a=(i&&i!==t&&t.contains(i)?i:o??r)??t.querySelector("[class*=rounded-full]:not([data-bloom] *)");Fo(t,`data-bloom-${e}-avatar`,a);let u=n.filter(m=>!a?.contains(m)&&!Cu(m)),c=u.find(m=>Eu.test(h(m.textContent??""))),d=u.find(m=>Tu.test(m.textContent??""));Fo(t,`data-bloom-${e}-plan`,c),Fo(t,`data-bloom-${e}-email`,d),Fo(t,`data-bloom-${e}-name`,u.find(m=>m!==c&&m!==d))}var Ua=()=>Ct(s.rail).filter(rt);function Fa(t){return ot(s.profile,t)??[...t.querySelectorAll(s.menuButton)].findLast(rt)??null}function Iu(t,e){return[...t.children].find(n=>n instanceof HTMLElement&&n!==e&&n.contains(e))??e}function Ga(){return Ua().flatMap(t=>{let e=Fa(t);if(!e)return[{kind:"rail",anchor:t,insert:n=>t.append(n)}];let o=Iu(t,e);return[{kind:"rail",anchor:o,insert:n=>(o===e?t:o).append(n)}]})}var nr=()=>Ua().map(Fa).filter(t=>t!=null);function Pu(t){let e=t.getAttribute("aria-expanded")==="true"&&t.getAttribute("aria-controls"),o=e?document.getElementById(e):null;return o?.matches('[role="menu"]')?o:null}function Ko(){return nr().map(Pu).find(t=>t!=null)??Ct('[role="menu"]').find(t=>!t.closest("[data-bloom]")&&/log ?out|sign out|退出/i.test(t.textContent??""))??null}var We=t=>Ct(s.threadRow).filter(e=>e.getAttribute("data-app-action-sidebar-thread-id")===t);function Qe(t){let e=We(t)[0]??Ct(s.threadRow).find(n=>{let r=n.getAttribute("data-app-action-sidebar-thread-id")??"";return r.endsWith(t)||t.endsWith(r.replace(/^local:/,""))});return(e?.getAttribute("data-app-action-sidebar-thread-title")??h(e?.textContent??""))||null}function Ka(t){return null}var rr=0,Yo;function Ou(t){if(!H(t))return;for(let o of nr())Go(o,"profile");let e=Ko();e&&Go(e,"menu")}function lt(){rr++;let t=!0;return kt().then(()=>{t&&rr&&!Yo&&(Yo=T(Ou))}),()=>{t&&(t=!1,!--rr&&(Yo?.(),Yo=void 0))}}var Ya=`/*
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
`;var It=k("bloom-entry-"),Hu=4,ar="--bloom-entry-x",sr=1,ge=A({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar. The account menu and the userscript menu always open the panel.",default:!1},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:!0},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:t=>(t.append(G("Reset position",()=>{ge.store.entryPosition=sr})),()=>t.replaceChildren())},entryPosition:{type:"custom",default:sr}}),$t=new Map,ja=!1,ir=[];function Du(t,e,o){let n=t.currentTarget,r=e.clientWidth-n.offsetWidth;if(t.button!==0||r<=0||!e.classList.contains(It("hover")))return;let i=ge.store.entryPosition,a=i,u=!1,c=new AbortController;n.setPointerCapture(t.pointerId),n.addEventListener("pointermove",m=>{!u&&Math.abs(m.clientX-t.clientX)<Hu||(u=!0,o(),a=$(i+(m.clientX-t.clientX)/r,0,sr),e.style.setProperty(ar,String(a)))},{signal:c.signal});let d=()=>{c.abort(),u&&(ge.store.entryPosition=a,e.style.removeProperty(ar))};n.addEventListener("pointerup",d,{signal:c.signal}),n.addEventListener("lostpointercapture",d,{signal:c.signal})}function Nu(t){let e=!1,o=l("button",{class:It("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),e||fe(),e=!1},pointerdown:r=>{e=!1,t!=="rail"&&Du(r,n,()=>{e=!0})}}},F("bloom"),t!=="rail"&&l("span",{class:It("label"),text:"Bloom++"})),n=l("div",{class:`bloom-root ${It("wrap")} ${It(t)}`,attrs:{"data-bloom":"entry"}},o);return n}function Uu(t){let e=l("div",{class:`bloom-root ${It("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),t.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),fe()}}},F("bloom"),l("span",{text:"Bloom++"})),o=t.querySelector('[role="menuitem"]');o?.parentElement?o.before(e):t.prepend(e)}function Wa(){for(let t of document.querySelectorAll('[data-bloom="entry"], [data-bloom="menu-entry"]'))t.remove();$t.clear()}function Qa(){let{showSidebarEntry:t,showSidebarEntryOnHover:e}=ge.store,o=t||e?Ga():[],n=new Set(o.map(i=>i.anchor));for(let[i,a]of $t)i.isConnected&&n.has(i)||(a.remove(),$t.delete(i));for(let i of document.querySelectorAll('[data-bloom="entry"]'))[...$t.values()].includes(i)||i.remove();for(let i of o){let a=$t.get(i.anchor);if(a?.isConnected||!st(i.anchor))continue;let u=a??Nu(i.kind);$t.set(i.anchor,u),i.insert(u)}for(let i of $t.values())i.classList.toggle(It("hover"),!t);let r=Ko();r&&!r.querySelector('[data-bloom="menu-entry"]')&&Uu(r)}var za=g({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:ge,styles:()=>`${Ya}[data-app-navigation-rail] [data-bloom=entry]{position:absolute;inset:auto;left:50%;bottom:100%;transform:translateX(-50%);width:max-content;margin:0;padding-block:0.25rem;pointer-events:none;z-index:5;display:flex;justify-content:center}[data-app-navigation-rail]>[data-bloom=entry]{bottom:2.75rem}[data-app-navigation-rail] [data-bloom=entry] .bloom-entry-button{pointer-events:auto}[data-app-navigation-rail] [data-bloom=entry].bloom-entry-hover:not(:hover > *){display:none;transition:display 0s 0.2s allow-discrete}.${It("hover")}{${ar}:${ge.store.entryPosition}}`,start(){Wa(),ir=[T(Qa),Ta(),lt()],!ja&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",fe),ja=!0)},stop(){for(let t of ir)t();ir=[],Wa(),Bt()},onSettingsChange:Qa});var mr=new x("AppNetwork"),ft=de(),jo=new Map,Va=new Map;var Fu=t=>t==="user"||t==="assistant";function Ja(t){let e=t.replace(/^local:/,"");return[...new Set([t,e,`local:${e}`])]}function Za(t){let e=Ja(t);for(let n of e){let r=jo.get(n);if(r)return r}let o={id:e[0]??t,title:null,chain:[],times:new Map};for(let n of e)jo.set(n,o);return o}function gt(t){if(!t)return null;Wu(t);let e=Ja(t);return e.map(o=>jo.get(o)).find(o=>o&&(o.chain.length||o.title))??jo.get(e[0]??t)??null}function cr(t,e,o,n=null){return{id:t,role:e,createTime:n,text:h(o),hasFiles:!1,imageCount:0}}function ur(t,e){let o=t.chain.find(r=>r.id===e.id);if(o){e.text&&(o.text=e.text),e.createTime!=null&&(o.createTime=e.createTime);return}if(t.chain.find(r=>r.role===e.role&&r.text&&r.text===e.text)){!t.times.has(e.id)&&e.createTime!=null&&t.times.set(e.id,e.createTime);return}t.chain.push(e)}function Xa(t){let e=t.chain.map(o=>`${o.id}	${o.role}	${o.text}`).join(`
`);Va.get(t.id)!==e&&(Va.set(t.id,e),ft.emit("conversation",t))}function Gu(t){if(typeof t=="function")try{return h(String(t()??""))}catch(e){return mr.warn("Turn label failed",e),""}return typeof t=="string"?h(t):""}function Ku(t){if(typeof t!="function")return"";try{let e=t();return typeof e=="string"?h(e):R(e)&&typeof e.response=="string"?h(e.response):""}catch(e){return mr.warn("Turn preview failed",e),""}}function Yu(t){let e=Object.keys(t).find(o=>o.startsWith("__reactFiber$")||o.startsWith("__reactInternalInstance$"));return e?t[e]??null:null}function dr(t,e,o,n){if(!t||e>24)return;let r=(R(t.memoizedProps)?t.memoizedProps:null)??(R(t.pendingProps)?t.pendingProps:null);r&&(Array.isArray(r.items)&&R(r.items[0])&&typeof r.items[0].turnKey=="string"&&!o.length&&o.push(...r.items.filter(R)),Array.isArray(r.entries)&&R(r.entries[0])&&typeof(r.entries[0].historyEntityKey??r.entries[0].turnId)=="string"&&!n.length&&n.push(...r.entries.filter(R))),dr(t.child??null,e+1,o,n),dr(t.sibling??null,e,o,n)}function ju(t,e){let o=typeof e.turnId=="string"?e.turnId:"",n=typeof e.turnKey=="string"?e.turnKey:"";return t.find(r=>{let i=typeof r.turnKey=="string"?r.turnKey:"";return!!i&&(o===i||n.endsWith(i)||n.includes(i))})??null}function Wu(t){let e=document.querySelector("[data-thread-find-target='conversation']")??document.querySelector(s.timelineScroll);if(!e)return;let o=[],n=[];try{dr(Yu(e),0,o,n)}catch(u){mr.warn("Fiber walk failed",u);return}if(!n.length&&!o.length)return;let r=n.length?n:o,i=typeof r[0]?.conversationId=="string"?r[0].conversationId:t,a=Za(i);a.title=Qe(t)??Qe(i)??a.title;for(let u of r){let c="";typeof u.turnId=="string"?c=u.turnId:typeof u.turnKey=="string"&&(c=u.turnKey.replace(/^.*turn:/,""));let d=typeof u.historyEntityKey=="string"?u.historyEntityKey:c?`turn:${c}`:"",m=ju(o,u),v=Gu(m?.getLabel??u.getLabel),C=Ku(m?.getPreview??u.getPreview),p=typeof u.timestampSeparatorAtMs=="number"?u.timestampSeparatorAtMs:null;d&&v&&(ur(a,cr(d,"user",v,p)),p&&a.times.set(d,p)),c&&C&&ur(a,cr(`${c}:assistant`,"assistant",C,p))}Xa(a)}function Qu(t){if(Fu(t.role))return t.role;let e=typeof t.type=="string"?t.type:typeof t.itemType=="string"?t.itemType:"";return/user/i.test(e)?"user":/agent|assistant/i.test(e)?"assistant":null}function zu(t){return typeof t.text=="string"?t.text:typeof t.content=="string"?t.content:R(t.content)&&typeof t.content.text=="string"?t.content.text:""}function lr(t,e){if(!t||!R(e))return;let o=typeof e.id=="string"?e.id:typeof e.itemId=="string"?e.itemId:"",n=Qu(e),r=zu(e);if(!o||!n)return;let i=Za(t);ur(i,cr(o,n,r)),Xa(i)}function Vu(t){let e=t.params?.thread,o=t.params?.threadId??(R(e)&&typeof e.id=="string"?e.id:void 0);t.params?.item&&lr(o,t.params.item);for(let n of t.params?.items??[])lr(o,n);if(R(e)&&Array.isArray(e.items))for(let n of e.items)lr(o,n)}Fe.on("note",Vu);var Ju=["data-turn","data-message-author-role"],Zu=/:(user|assistant)$/,pr=`${s.messageUnit}, ${s.oldMessage}`,Qo=t=>t==="user"||t==="assistant",es=()=>!!document.querySelector(s.timelineScroll),os=()=>!!it(s.timelineScroll),ns=()=>b()??document.querySelector(s.composerConversation)?.getAttribute("data-above-composer-conversation-id")??"",zo=()=>es()?it(s.timelineScroll):document;function Ve(){if(es())return it(s.timelineScroll);let t=document.querySelector(s.turn);for(let e=t?.parentElement;e;e=e.parentElement){let{overflowY:o}=getComputedStyle(e);if((o==="auto"||o==="scroll")&&e.scrollHeight>e.clientHeight)return e}return document.scrollingElement}var Pt=t=>{let e=t.getAttribute("data-chatgpt-search-unit-key")?.match(Zu)?.[1];return Qo(e)?e:t.matches(s.userBubble)?"user":t.matches(s.assistantReply)||t.matches(s.assistantMarkdown)?"assistant":null},rs=t=>{let e=[...t.querySelectorAll(s.searchUnit)].filter(n=>Pt(n)&&!n.parentElement?.closest(s.searchUnit));return e.length?e:[...t.querySelectorAll(`${s.userBubble}, ${s.assistantReply}`)].filter(n=>Pt(n)&&!n.parentElement?.closest(`${s.userBubble}, ${s.assistantReply}`))},$a=t=>(t.getAttribute("data-chatgpt-search-message-ids")??t.getAttribute("data-message-id")??t.getAttribute("data-response-annotation-target"))?.split(/\s+/).filter(Boolean)??[];function ze(t){let e=$a(t);if(e.length)return e;let o=[...new Set([...t.querySelectorAll(pr)].flatMap($a))];if(o.length)return o;let n=t.closest("[data-turn-key]")?.getAttribute("data-turn-key")?.replace(/^history-content:/,"");return n&&Pt(t)==="user"?[n]:[]}function he(t=zo()){if(!t)return[];let e=rs(t);return e.length?e:[...t.querySelectorAll(pr)].filter(o=>!o.parentElement?.closest(pr))}function Xu(t,e){for(let o=t.length-1;o>=0;o--){let n=e.find(r=>r.id===t[o]);if(n)return n.role}return null}function $u(t){for(let e of Ju){let o=t.getAttribute(e)??t.querySelector(`[${e}]`)?.getAttribute(e);if(Qo(o))return o}return t.querySelector(s.markdown)||t.querySelector(s.generatedImage)?"assistant":null}var _u=t=>!t.parentElement?.closest(s.turn);function Ot(){let t=gt(b())?.chain??[];return[...zo()?.querySelectorAll(s.turn)??[]].filter(_u).flatMap(o=>{let n=rs(o),r=n.length?n.map(i=>({el:i,known:Pt(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=d=>!n.some(m=>m.contains(d))&&h(d.textContent??""),a=[...o.querySelectorAll(s.assistantMarkdown)].find(d=>i(d)&&!Wo.test(h(d.textContent??""))),u=[...o.querySelectorAll(s.activityHeader)].findLast(i),c=a??u;c&&r.push({el:c,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?ze(o):he(o).flatMap(ze),a=n??$u(o)??Xu(i,t)??(r%2?"assistant":"user"),u=o.closest(s.turn)??o,c=!o.closest(s.searchUnit)&&!!u.querySelector(s.turnBusy),d=a==="assistant"&&(o.matches(s.turnBusy)||!!o.querySelector(s.turnBusy)||c);return{el:o,role:a,messageIds:i,streaming:d}})}var td="[data-bloom], .sr-only",is=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,Wo=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,_a=new WeakMap;function be(t){let o=(t.el.closest(s.turn)??t.el).textContent?.length??0,n=_a.get(t.el);if(n?.length===o)return n.summary;let r=ed(t);return _a.set(t.el,{length:o,summary:r}),r}function ts(t){let e=new Set,o=[];for(let n of t.querySelectorAll(s.assistantMarkdown)){if(n.closest(s.searchUnit))continue;let r=h(n.textContent??"");!r||Wo.test(r)||is.test(r)||e.has(r)||(e.add(r),o.push(r))}return o}function ed(t){let e=t.el.querySelectorAll(s.generatedImage).length;if(t.role==="assistant"&&e)return e>1?`Image \xD7${e}`:"Image";let o=t.el.closest(s.turn);if(t.role==="assistant"&&o&&t.el.matches(s.assistantMarkdown)&&!t.el.closest(s.searchUnit)){let c=ts(o);if(c.length)return c.join(" \xB7 ")}let n=t.el.querySelector(t.role==="assistant"?`${s.markdown}, ${s.assistantMarkdown}`:".whitespace-pre-wrap")??t.el,i=[...n.querySelectorAll(td)].map(c=>h(c.textContent??"")).filter(Boolean).reduce((c,d)=>c.replace(d,`
`),n.innerText||n.textContent||""),a=i.split(`
`).map(h).filter(c=>c&&!is.test(c)&&!Wo.test(c));if(a.length)return a.join(" ");if(t.role==="assistant"&&o){let c=ts(o);if(c.length)return c.join(" \xB7 ")}let u=i.split(`
`).map(h).filter(c=>Wo.test(c));return u.length?u.at(-1)??"":t.role==="user"&&t.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function Vo(t){return t.text?h(t.text):t.imageCount?t.imageCount>1?`Image \xD7${t.imageCount}`:"Image":t.hasFiles?"File":""}var fr=t=>t.matches(s.timelineScroll)&&getComputedStyle(t).flexDirection==="column-reverse";var od=80,nd=420;function gr(t,e,o){return(t.x-o.x)*(e.y-o.y)-(e.x-o.x)*(t.y-o.y)}function rd(t,e,o,n){let r=gr(t,e,o),i=gr(t,o,n),a=gr(t,n,e);return!((r<0||i<0||a<0)&&(r>0||i>0||a>0))}function id(t,e){let o=(e.left+e.right)/2-(t.left+t.right)/2,n=(e.top+e.bottom)/2-(t.top+t.bottom)/2;if(Math.abs(o)>=Math.abs(n)){let i=o<0?e.right:e.left;return[{x:i,y:e.top},{x:i,y:e.bottom}]}let r=n<0?e.bottom:e.top;return[{x:e.left,y:r},{x:e.right,y:r}]}function as(t,e){let o=$(t.x,e.left,e.right),n=$(t.y,e.top,e.bottom);return Math.hypot(t.x-o,t.y-n)}function Jo(t){let e=t.closeDelay??od,o=t.towardDelay??nd,n=0,r=!1,i=null,a=null,u=()=>{document.removeEventListener("pointermove",p,!0)},c=()=>{n&&window.clearTimeout(n),n=0,u(),i=null,a=null},d=()=>{c(),r&&(r=!1,t.setHeld(!1))},m=()=>{r||(r=!0,t.setHeld(!0))},v=w=>{n&&window.clearTimeout(n),n=window.setTimeout(d,w)},C=w=>{let Q=t.panel(),le=t.trigger();if(!Q||!i)return!1;let j=Q.getBoundingClientRect();if(j.width<=0&&j.height<=0)return!1;let N=le?.getBoundingClientRect(),[Pn,gc]=N&&(N.width||N.height)?id(N,j):[{x:j.left,y:j.top},{x:j.right,y:j.bottom}];return rd(w,i,Pn,gc)?!0:a!=null&&as(w,j)<as(a,j)-.25},p=w=>{let Q={x:w.clientX,y:w.clientY};if(t.over(w.target)){c();return}C(Q)?v(o):d(),a=Q};return{enter(){c()},leave(w){if(t.over(w.relatedTarget)){c();return}i={x:w.clientX,y:w.clientY},a=i,m(),document.addEventListener("pointermove",p,!0),v(e)},dispose(){c(),r=!1}}}var ss=`/*
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
`;var E=k("bloom-nav-"),$o=80,sd=1200,ld=2,ls=3e4,cd=200,ud=.9,dd=.28,md=24,ye=8,pd=80,fd=12,hr=80,ms=`${s.rightPanel}, ${s.summaryPanel}`,gd={user:"\u2753",assistant:"\u{1F916}"},hd=["wheel","touchmove","pointerdown"],tn=A({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),y=null,B=[],X=-1,_t=-1,Ae=null,te="",yr=0,Ar=[],$e=null,Zo=null,Xo=new Set,ht,Je,bt,vr="",Ze=[],_o=null,qr=new Set,bd=t=>tn.store.showAssistant||t.role==="user",yd=t=>t.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||t.messageIds[0]||t.role;function Ad(t){return{role:t.role,summary:be(t),ids:t.messageIds,turn:t,streaming:t.streaming}}function ps(t,e){let o=t.entries.at(-1);if(o?.role==="assistant"&&e.role==="assistant"){t.entries[t.entries.length-1]={...e,ids:[...new Set([...o.ids,...e.ids])]};return}t.entries.push(e)}function vd(){let t=[];for(let e of Ot()){let o=Ad(e),n=yd(e),r=t.at(-1);r?.key===n?ps(r,o):t.push({key:n,entries:[o]})}return t}function qd(){let t=[];for(let e of gt(b())?.chain??[]){let o={role:e.role,summary:Vo(e),ids:[e.id],turn:null,streaming:!1},n=t.at(-1);e.role==="assistant"&&n?ps(n,o):t.push({key:e.id,entries:[o]})}return t}var ve=t=>t.entries.flatMap(e=>e.ids);function xr(t,e){let o=new Set(ve(t));return ve(e).some(n=>o.has(n))}var ee=t=>h(t.entries.find(e=>e.role==="user")?.summary??""),br=(t,e)=>t.filter(o=>ee(o)===e).length,wr=t=>({...t,turn:null,streaming:!1});function xd(t,e){let o=new Set(e.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return t.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return wr(r);let a=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return a&&a!==n.key?wr(r):r})}))}function wd(t,e){let o=e.entries.map((n,r)=>{let i=t.entries[r];if(!i)return n;let a=[...new Set([...n.ids,...i.ids])];return{...n,ids:a,summary:n.summary||i.summary}});for(let n of t.entries.slice(o.length))o.push(wr(n));return{key:t.key,entries:o}}function fs(){let t=Ve();if(!t)return!1;let e=t.clientHeight-t.scrollHeight;return t.scrollTop-e<=Math.abs(t.scrollTop)}function Sd(t,e){let o=xd(t,e);if(!e.length)return o;if(!o.length)return e;let n=e.findIndex(c=>o.some(d=>d.key===c.key));if(n<0)return fs()?e.concat(o):o.concat(e);let r=e[n]?.key,i=o.findIndex(c=>c.key===r),a=o.slice(0,i).concat(e.slice(0,n),o.slice(i)),u=a.findIndex(c=>c.key===r);for(let c=n;c<e.length;c++){let d=e[c];if(!d)continue;let m=a.findIndex(v=>v.key===d.key);if(m>=0){let v=a[m];v&&(a[m]=wd(v,d)),u=m}else a.splice(u+1,0,d),u++}return a}function Ed(t,e){let o=0,n=0,r=0;for(let i=1-t.length;i<e.length;i++){let a=0,u=0;for(let d=0;d<t.length;d++){let m=e[d+i],v=t[d];!m||!v||(xr(v,m)?(a+=3,u++):ee(v)&&ee(v)===ee(m)&&a++)}let c=fs()?i<r:i>r;(a>o||a===o&&u>n||a===o&&u===n&&c)&&(o=a,n=u,r=i)}return{score:o,offset:r}}function Td(t,e){let o=t.entries.map((n,r)=>{let i=e.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of e.entries.slice(o.length))o.push({...n,turn:null});return{key:t.key,entries:o}}function Md(t){return t.map(e=>({key:e.key,entries:e.entries.map(o=>({...o}))}))}function Cd(t,e){if(!e.length)return t;if(!t.length)return e;let{score:o,offset:n}=Ed(t,e),r=Md(t);if(o>0)for(let u=0;u<r.length;u++){let c=e[u+n],d=r[u];if(!c||!d)continue;let m=ee(d),v=!!m&&m===ee(c)&&br(t,m)===1&&br(e,m)===1;(xr(d,c)||v)&&(r[u]=Td(d,c))}let i=[],a=[];for(let u=0;u<e.length;u++){let c=e[u];if(!c)continue;let d=ee(c);!d||br(r,d)>0||r.some(m=>xr(m,c))||(o>0&&u<n?i.push(c):a.push(c))}return i.concat(r,a)}var Sr=t=>t.entries.some(e=>e.turn?.el.isConnected);function Ld(t,e,o){let n=t.findIndex(i=>ve(i).includes(e));if(n>=0)return n+1;let r=t.find(Sr);return o&&r&&ve(r).includes(o)?0:t.length}function kd(t){if(_o){let{parent:e,user:o}=_o;for(let n of t.slice(Ld(t,e,o))){let r=ve(n);if(!Sr(n)&&!(o&&r.includes(o)))for(let i of r)qr.add(i)}}return t.filter(e=>Sr(e)||!ve(e).some(o=>qr.has(o)))}function gs(){Ze=[],_o=null,qr.clear()}function Bd(){let t=ns();t!==vr&&(vr=t,gs());let e=vd(),o=qd();return!e.length&&!o.length&&!os()?(Ze=[],[]):(Ze=kd(Cd(Sd(Ze,e),o)),Ze.flatMap(n=>n.entries).filter(bd))}function Id(t){for(let o of t)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!z().generating||t.some(o=>o.streaming))return;let e=t.at(-1);e&&(e.role==="assistant"||!tn.store.showAssistant?e.streaming=!0:t.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function hs(){let t=Bd();return Id(t),t}function bs(t){let e=t.getBoundingClientRect(),o=J()?.getBoundingClientRect().top,n=Math.min(e.bottom,o&&o>e.top?o:e.bottom);return{top:e.top,bottom:n}}function ys(t){return((t.matches(".whitespace-pre-wrap, .markdown, .prose, [data-markdown-text-style]")?t:t.querySelector(".whitespace-pre-wrap")??t.querySelector(".markdown, .prose, [data-markdown-text-style]"))??t).getBoundingClientRect().top}function cs(t){let e=B[t]?.turn?.el;return e?.isConnected?e:null}function Pd(t){if(!B.length)return null;let e=t.scrollHeight-t.clientHeight,o=fr(t),n=Math.min(t.scrollTop,0),r=o?-n:e-t.scrollTop,i=o?e+n:t.scrollTop,a=e<=ye||r<=ye,u=e>ye&&i<=ye,{top:c,bottom:d}=bs(t),m=cs(0),v=m?ys(m):Number.NaN,C=!!m&&v>=c-ye&&v<=c+48,p=cs(B.length-1),w=p?.getBoundingClientRect().bottom??Number.NaN,Q=!!p&&w<=d+ye&&w>=d-pd;return a||Q?"bottom":u||C?"top":null}function Od(t){let{top:e,bottom:o}=bs(t),n=e+Math.max(o-e,0)*dd,r=[],i=-1;if(B.forEach((u,c)=>{let d=u.turn?.el;if(!d?.isConnected){r.push(Number.NaN);return}let m=ys(d);r.push(m),i<0&&(i=c),m<=n&&(i=c)}),i<0)return Math.max(B.findIndex(u=>u.turn),0);let a=r[X];return Number.isFinite(a)?i===X?X:i>X?i:a<=n+md?X:i:i}function Rd(t){let e=Pd(t);return e==="bottom"?B.length-1:e==="top"?0:Od(t)}function us(t){tn.store.jumpEffect==="border"&&(t.classList.add(E("flash")),setTimeout(()=>t.classList.remove(E("flash")),sd))}function en(t){let e=B[t],o=Ve();if(!e||!o)return;if(!e.turn&&!e.ids.length){_t=t,Xe(),o.scrollTo({top:fr(o)?0:o.scrollHeight});return}_t=t,Ae=t?null:{chat:b(),first:e.ids[0],until:Date.now()+ls},Xe();let n=e.turn?.el;if(n?.isConnected){let d=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:d<o.clientHeight*ld?"smooth":"auto"}),us(n);return}let r=B.findIndex(d=>d.turn),i=r>=0&&t<r?-1:1,a=++yr,u=Date.now()+ls,c=()=>{let d=Ve();if(a!==yr||Date.now()>u||!d)return;B=hs();let m=B.find(C=>C.ids.some(p=>e.ids.includes(p)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),us(m),_t=B.findIndex(C=>C.turn?.el===m),Xe();return}let v=d.scrollTop;d.scrollBy({top:i*d.clientHeight*ud,behavior:"instant"}),d.scrollTop===v?setTimeout(c,cd):requestAnimationFrame(c)};c()}function Hd(t,e){return l("button",{class:E("row"),attrs:{type:"button","data-index":String(e),"data-message-id":t.ids[0]??""},on:{click:()=>en(e)}},l("span",{text:gd[t.role]}),l("span",{class:"bloom-truncate",text:nt(t.summary||"\u2026",$o)}))}function Dd(t,e){let o=t.offsetWidth?e.width/t.offsetWidth:1;return e.left+(t.clientLeft+t.clientWidth)*o}function Nd(t){let e=1/0;for(let o of document.querySelectorAll(ms)){if(!rt(o))continue;let n=o.getBoundingClientRect();n.width<hr||n.height<hr||n.left<t.left+hr||n.left<e&&(e=n.left)}return Number.isFinite(e)?e:null}function ds(t){if(!y)return;let e=t.getBoundingClientRect(),o=J()?.getBoundingClientRect().top,r=Math.min(e.bottom,o&&o>e.top?o:e.bottom)-e.top,i=Math.min(Dd(t,e),Nd(e)??1/0);y.style.right=`${document.documentElement.clientWidth-i+fd}px`,y.style.top=`${e.top}px`,y.style.height=r>1?`${r}px`:""}function Ud(){let t=Ve();if(B=hs(),!B.length||!t){bt?.dispose(),bt=void 0,y?.remove(),y=null,te="";return}if($e!==t){Je?.abort(),Je=new AbortController,t.addEventListener("scroll",Et(Xe),{passive:!0,signal:Je.signal});for(let n of hd)t.addEventListener(n,vs,{passive:!0,signal:Je.signal});$e=t,ht?.disconnect(),ht=new ResizeObserver(()=>{t.isConnected&&ds(t)}),ht.observe(t),Zo=null,Xo=new Set}let e=J();if(e&&e!==Zo&&ht&&(ht.observe(e),Zo=e),ht)for(let n of document.querySelectorAll(ms))Xo.has(n)||(ht.observe(n),Xo.add(n));Yd(),ds(t);let o=JSON.stringify(B.map(n=>[n.role,n.ids]));o!==te?(te=o,_t=-1,Gd(),Ae&&Date.now()<Ae.until&&Ae.chat===b()&&B[0]?.ids[0]!==Ae.first&&en(0)):Fd(),Xe()}function Xe(){if(!y||!$e)return;X=_t>=0?_t:Rd($e),y.querySelectorAll(`.${E("tick")}`).forEach((e,o)=>e.classList.toggle(E("tick-current"),o===X)),y.querySelectorAll(`.${E("row")}`).forEach(e=>e.setAttribute("aria-current",String(Number(e.dataset.index)===X)));let t=y.querySelector(`.${E("toc-head")}`);t&&(t.textContent=`${X+1} / ${B.length}`)}function Fd(){y?.querySelectorAll(`.${E("tick")}`).forEach((t,e)=>{let o=B[e],n=nt(o.summary,$o);t.title!==n&&(t.title=n),t.classList.toggle(E("tick-streaming"),o.streaming)}),y?.querySelectorAll(`.${E("row")}`).forEach(t=>{let e=t.lastElementChild,o=nt(B[Number(t.dataset.index)].summary||"\u2026",$o);e&&e.textContent!==o&&(e.textContent=o)})}function Gd(){y?.querySelector(`.${E("rail")}`)?.replaceChildren(...B.map((e,o)=>l("button",{class:qo(E("tick"),E(`tick-${e.role}`),e.streaming&&E("tick-streaming"),o===X&&E("tick-current")),title:nt(e.summary,$o),attrs:{type:"button","aria-label":`Jump to message ${o+1}`,"data-message-id":e.ids[0]??""},on:{click:()=>en(o)}}))),y?.querySelector(`.${E("toc-list")}`)?.replaceChildren(...B.map(Hd))}var ct=Et(Ud);function Er(t){if(t===y)return;let e=t.__bloomNavStop;if(e&&e!==Tr)try{e()}catch{}t.isConnected&&t!==y&&t.remove()}function As(){let t=[...document.querySelectorAll('[data-bloom="navigator"]')];if(y&&!y.isConnected&&(y=null),y&&t.includes(y)){for(let e of t)Er(e);return}y=t[0]??null;for(let e of t.slice(1))Er(e)}function Kd(){bt?.dispose(),bt=Jo({over:t=>t instanceof Node&&!!y?.contains(t),trigger:()=>y?.querySelector(`.${E("rail")}`),panel:()=>y?.querySelector(`.${E("toc")}`),setHeld:t=>y?.classList.toggle(E("open"),t)})}function Yd(){As(),y&&!y.querySelector(`.${E("rail")}`)&&(y.remove(),y=null,te=""),y||(y=l("div",{class:`bloom-root ${E("root")}`,attrs:{"data-bloom":"navigator"},on:{pointerenter:()=>bt?.enter(),pointerleave:t=>bt?.leave(t)}},l("div",{class:E("rail")}),l("div",{class:E("bridge"),attrs:{"aria-hidden":"true"}}),l("div",{class:E("toc")},l("div",{class:E("toc-head")}),l("div",{class:E("toc-list")}))),te=""),bt||Kd(),y.isConnected||document.body.append(y),y.querySelector(`.${E("tick")}`)||(te=""),y.__bloomNavStop=Tr}function vs(){_t=-1,Ae=null,yr++}function Tr(){for(let t of Ar)t();Ar=[],Je?.abort(),ht?.disconnect(),ht=void 0,$e=null,Zo=null,Xo=new Set,removeEventListener("keydown",qs,!0),removeEventListener("resize",ct),bt?.dispose(),bt=void 0,y&&delete y.__bloomNavStop,y?.remove(),y=null,te="",gs(),vr="";for(let t of document.querySelectorAll('[data-bloom="navigator"]'))Er(t)}var jd=t=>!!t&&(t.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!t.closest("[contenteditable='true']"));function qs(t){if(!y||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey||jd(document.activeElement)||it("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:X-1,ArrowDown:X+1,Home:0,End:B.length-1}[t.key];if(o==null){vs();return}o<0||o>=B.length||(t.preventDefault(),t.stopPropagation(),en(o))}var xs=g({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:tn,styles:ss,start(){As(),Ar=[T(t=>H(t)&&ct()),at(ct),ft.on("conversation",ct),ft.on("generate-start",({parentId:t,userId:e})=>{t&&(_o={parent:t,user:e},ct())}),P.on("rise",ct),P.on("fall",ct)],addEventListener("keydown",qs,!0),addEventListener("resize",ct,{passive:!0}),ct()},stop:Tr,onSettingsChange:ct});var ws=`/*
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
`;var W=k("bloom-quotes-"),Rr="BloomBetterQuotes",Qd=40,Ms=8,zd=1800,kr=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,Ss=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,oe=A({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),Mr,Cr,qe,Lr=!1,Br=0,on=null,nn=null,yt=null;function Hr(){return b()??"draft"}function an(){try{let t=JSON.parse(sessionStorage.getItem(Rr)??"[]");return Array.isArray(t)?t.filter(e=>!!e&&typeof e=="object"&&typeof e.id=="string"&&typeof e.text=="string"&&!!e.text):[]}catch{return[]}}function Dr(t){try{sessionStorage.setItem(Rr,JSON.stringify(t.slice(-Qd)))}catch{}}function _e(t){return an().find(e=>e.id===t)?.text??""}function Vd(t,e){let o=an().filter(n=>n.id!==t);o.push({id:t,text:e}),Dr(o)}function Ir(t=Hr()){Dr(an().filter(e=>e.id!==t)),rn()}function Jd(t){let e=_e("draft");if(!e||_e(t))return;let o=an().filter(n=>n.id!=="draft");o.push({id:t,text:e}),Dr(o)}function Pr(t){return`${t.getAttribute("aria-label")??""} ${t.getAttribute("title")??""}`}function Zd(t){let e=Pr(t);return Ss.test(e)&&!/quote|引用/.test(e)?!1:/quote|引用/.test(e)&&kr.test(e)?!0:kr.test(e)&&!Ss.test(e)}function Cs(t){let e=t.cloneNode(!0),o=[...e.querySelectorAll("button, [role='button']")],n=new Set(o.map(r=>r.getAttribute("aria-label")).filter(Boolean));for(let r of o)r.remove();for(let r of e.querySelectorAll("*"))!r.children.length&&n.has(h(r.textContent??""))&&r.remove();return h(e.textContent??"")}function Xd(t){let e=J(),o=t.parentElement,n=0;for(;o&&o!==e&&n<5;){if(n++,o.matches(s.composerInput)||o.querySelector(s.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=Cs(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function sn(){let t=J();if(!t)return null;for(let e of t.querySelectorAll("button, [role='button']")){if(e.closest("[data-bloom]")||!Zd(e))continue;let o=Xd(e),n=o?Cs(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:e}}return null}function $d(t){let e=t.closest(s.searchUnit)??t.closest(s.oldMessage);return e&&(Pt(e)??e.getAttribute("data-message-author-role"))==="user"?e:null}function Nr(t){return h(t).slice(0,48)}function _d(t,e){let o=Nr(t);if(o.length<Ms)return null;let n=null;for(let r of he()){if(e&&(r===e||e.contains(r)||r.contains(e)))continue;let i=h(r.textContent??"");if(!i.includes(o))continue;let a=o.length/Math.max(i.length,1);(!n||a>n.score)&&(n={el:r,score:a})}return n?.el??null}function tm(t,e){let o=Nr(e),n=t;for(let r of t.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&h(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${W("hit")}`)?.classList.remove(W("hit")),n.classList.add(W("hit")),window.clearTimeout(Br),Br=window.setTimeout(()=>n.classList.remove(W("hit")),zd)}function Es(t){let e=t.closest(s.timelineScroll)??document.scrollingElement;if(!(e instanceof HTMLElement)&&e!==document.scrollingElement)return;let o=t.getBoundingClientRect();if(o.height<1||!e)return;let n=e.getBoundingClientRect(),r=J()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,a=o.top+o.height/2-(n.top+i)/2;Math.abs(a)<8||e.scrollTo({top:e.scrollTop+a,behavior:"smooth"})}function Ur(){if(!yt||!on?.isConnected)return;let t=on.getBoundingClientRect();t.width<1||(yt.style.top=`${Math.max(8,t.top+8)}px`,yt.style.left=`${Math.max(8,t.right-yt.offsetWidth-8)}px`)}function em(t,e,o){on=t,nn=e,yt??=l("button",{class:`bloom-root ${W("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),yt.isConnected||document.body.append(yt),tm(t,o),Ur()}function Ts(){yt?.remove(),yt=null,on=null,nn=null,document.querySelector(`.${W("hit")}`)?.classList.remove(W("hit"))}function Ls(){return document.querySelector('[data-bloom="quote-chip"]')}function rn(){Ls()?.remove()}function om(t){let o=J()?.getBoundingClientRect();!o||o.width<8||(t.style.width=`${Math.max(120,o.width-24)}px`,t.style.left=`${o.left+12}px`,t.style.top=`${Math.max(8,o.top-t.offsetHeight-8)}px`)}function nm(t){let e=Ls();e||(e=l("div",{class:`bloom-root ${W("chip")}`,attrs:{"data-bloom":"quote-chip"}},l("span",{class:W("text")}),l("button",{class:W("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(e));let o=e.querySelector(`.${W("text")}`),n=h(t);o&&o.textContent!==n&&(o.textContent=n),e.dataset.text=t,om(e)}function Or(){if(!Lr){Lr=!0;try{let t=Hr(),e=sn();oe.store.persistAcrossChats&&e&&_e(t)!==e.text&&Vd(t,e.text);let o=oe.store.persistAcrossChats?_e(t):"";!o||e&&h(e.text)===h(o)?rn():nm(o),Ur()}finally{Lr=!1}}}function rm(t){let e=t.closest('[data-bloom="quote-chip"]');if(e instanceof HTMLElement&&!t.closest(`.${W("x")}`)){let i=e.dataset.text??e.querySelector(`.${W("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:e}:null}let o=t.closest("blockquote");if(o instanceof HTMLElement&&!t.closest("a, button")){let i=$d(o),a=h(o.textContent??"");if(i&&a)return{text:a,skip:i,origin:o}}let n=J();if(!n||!n.contains(t)||Ue(t)||t.closest("button, [role='button']"))return null;let r=sn();return!r||!r.row.contains(t)?null:{text:r.text,skip:null,origin:r.row}}function im(t){let{target:e}=t;if(!(e instanceof Element))return;if(e.closest('[data-bloom="quote-back"]')){t.preventDefault(),t.stopPropagation(),nn?.isConnected&&Es(nn);return}if(e.closest(`.${W("x")}`)){t.preventDefault(),t.stopPropagation(),Ir();return}let o=sn();if(o&&(e===o.dismiss||o.dismiss.contains(e))){Ir();return}if(am(e)&&ks(),!oe.store.jumpToPassage)return;let n=rm(e);if(!n)return;let r=_d(n.text,n.skip);r&&(t.preventDefault(),t.stopPropagation(),em(r,n.origin,n.text),Es(r))}function am(t){let e=t.closest("button, [role='button']");return!(e instanceof HTMLElement)||e.closest("[data-bloom]")||!J()?.contains(e)?!1:/send|submit|发送|提交/i.test(Pr(e))&&!kr.test(Pr(e))}function sm(t){return!(t instanceof KeyboardEvent)||t.key!=="Enter"||t.shiftKey||t.isComposing?!1:Ue(t.target)}function ks(){if(!oe.store.persistAcrossChats)return;let t=Hr(),e=_e(t);if(e){if(!sn()){let o=U(),n=Nr(e);n.length>=Ms&&!h(o).includes(n)&&Lt(`> ${e}

${o}`.trim())}Ir(t)}}function lm(t){sm(t)&&ks()}function cm(t){!t.prevId&&t.id&&Jd(t.id),Or()}var Bs=g({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:oe,styles:ws,onSettingsChange(t){t==="jumpToPassage"&&!oe.store.jumpToPassage&&Ts(),t==="persistAcrossChats"&&!oe.store.persistAcrossChats&&(sessionStorage.removeItem(Rr),rn()),Or()},start(){qe=new AbortController,document.addEventListener("pointerdown",im,{capture:!0,signal:qe.signal}),document.addEventListener("keydown",lm,{capture:!0,signal:qe.signal}),addEventListener("scroll",Ur,{capture:!0,passive:!0,signal:qe.signal}),Cr=at(cm),Mr=T(t=>H(t)&&Or())},stop(){qe?.abort(),qe=void 0,Cr?.(),Cr=void 0,Mr?.(),Mr=void 0,window.clearTimeout(Br),Ts(),rn()}});var Is=`/*
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
`;var dm="[data-app-action-sidebar-thread-row]{position:relative}[data-app-action-sidebar-thread-row]>[data-bloom=cls]{position:absolute;inset-inline-end:0.25rem;top:50%;width:0.875rem;height:0.875rem;margin:0;transform:translateY(-50%);pointer-events:none}",mm=k("bloom-cls"),pm="bloom-cls",fm=600*1e3,Gr=Mi("tab"),we=new Map,eo=new Map,xe=null,Ps=[],gm=t=>t==="streaming"||t==="error";function hm(){let t=new Map,e=Date.now();for(let[o,n]of eo)e-n.at>fm?eo.delete(o):t.set(o,n.status);for(let[o,n]of we)t.set(o,n);return t}function bm(t){return l("span",{class:`bloom-root ${mm("",`-${t}`)}`,attrs:{"data-bloom":"cls","data-status":t,"aria-label":t==="error"?"Error":"Generating"}},t==="error"&&F("alert"))}function to(){let t=hm(),e=new Set;for(let[o,n]of t)for(let r of We(o)){if(!st(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){e.add(i);continue}i?.remove();let a=bm(n);e.add(a),r.append(a)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))e.has(o)||o.remove()}function ln(t,e){t&&(e?we.set(t,e):we.delete(t),xe?.postMessage({tab:Gr,id:t,status:e}),to())}function ym({data:t}){!R(t)||typeof t.id!="string"||typeof t.tab!="string"||t.tab===Gr||(gm(t.status)?eo.set(t.id,{status:t.status,tab:t.tab,at:Date.now()}):eo.delete(t.id),to())}function Fr(){for(let t of we.keys())xe?.postMessage({tab:Gr,id:t,status:null})}var Os=g({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:()=>`${Is}${dm}`,start(){xe=typeof BroadcastChannel=="function"?new BroadcastChannel(pm):null,xe?.addEventListener("message",ym),addEventListener("pagehide",Fr),Ps=[P.on("rise",({conversationId:t})=>ln(t,"streaming")),P.on("fall",({conversationId:t,outcome:e})=>ln(t,e==="error"?"error":null)),P.on("context",({prevId:t,id:e,migrated:o})=>{o&&z().generating?ln(e,"streaming"):!o&&we.get(t??"")==="streaming"&&ln(t,null)}),T(t=>H(t)&&to())],b()&&to()},stop(){for(let t of Ps)t();Fr(),xe?.close(),xe=null,removeEventListener("pagehide",Fr),we.clear(),eo.clear(),to()}});var Rt="data-bloom-invite",Am=/^(?:invite team members|invite members|邀请团队成员|邀请成员)$/i,Rs=':is(button, a:not([href^="/c/"])):not(main *, [role="dialog"] *)',vm={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${s.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])'],hideInvite:[`[${Rt}]`,`div:has(> [${Rt}]:only-child)`]},Hs=A({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0},hideInvite:{type:"boolean",description:"Hide Invite team members in the sidebar.",default:!0}}),cn,Kr=!1;function qm(t){if(H(t))for(let e of document.querySelectorAll(`${Rs}, [${Rt}]`))!e.matches(Rs)||!Am.test(h(e.textContent??""))?e.removeAttribute(Rt):e.hasAttribute(Rt)||e.setAttribute(Rt,"")}var Ds=g({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads, notices and Invite team members.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:Hs,styles:()=>St(Object.entries(vm).flatMap(([t,e])=>Hs.store[t]?e:[])),start(){Kr=!0,kt().then(()=>{Kr&&!cn&&(cn=T(qm))})},stop(){Kr=!1,cn?.(),cn=void 0;for(let t of document.querySelectorAll(`[${Rt}]`))t.removeAttribute(Rt)}});var Se=`form:has(:is(${s.composerInput})), ${s.oldComposerForm}`,un='[class*="ComposerLayoutBody"]',jr='[class*="ComposerLayoutRoot"]',xm='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',wm=`:is(${Se}) ${un}, :is(${Se}):not(:has(${un})) ${jr}, :is(${Se}):not(:has(${un})):not(:has(${jr})) :is(${xm})`,Sm='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',Em='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',Tm="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))",Mm="var(--color-background-composer-surface, var(--composer-background-color, var(--color-bg-primary, Canvas)))",Cm="composer-fill",Ns=A({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function Lm(){let{opacity:t,blur:e}=Ns.store;if(t>=100)return"";{let i=`color-mix(in srgb, ${Mm} ${t}%, transparent)`;return`[class*="ComposerLayoutRoot"], [data-composer-layout], [data-chatgpt-composer]{--composer-layout-surface-background:${i}!important;--composer-background-color:${i}!important;--composer-layout-surface-backdrop-filter:blur(${e}px)!important}`}let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${Tm} ${t}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${e}px)!important;-webkit-backdrop-filter:blur(${e}px)!important`;return`:is(${Sm}), :is(${Se}){${o}}:is(${Em}){display:none!important}${wm}{${n}}:is(${Se}):has(${un}) ${jr}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${Se}) :is(${s.composerInput}){background-color:transparent!important}`}function Yr(){for(let t of document.querySelectorAll(`[data-bloom="${Cm}"]`))t.remove()}var Us=g({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:Ns,styles:Lm,start(){Yr()},stop(){Yr()},onSettingsChange(){Yr()}});var km=1200,Bm=8e3,Im=150,Pm=20,Fs=6,zr="continue where you left",Om=/message delivery timed out|please try again/i,Gs=/waiting for the complete answer/i,Ks=A({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:zr,placeholder:zr}}),Wr=[],mn=0,oo=!1,no=0,Te="",dn="",Vr=0,Me=!1,ro=!1,pn=!0,Ee="",Jr=0,fn=!1,Rm=()=>Ks.store.prompt.trim()||zr;function Ys(){return(it(s.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function js(){let t=Ys();return!t||Gs.test(t)||!Om.test(t)?"":t}function Hm(){let t=Ys();return t&&Gs.test(t)?t:""}function Dm(){let t=zo()?.querySelectorAll(s.turn),e=t?.[t.length-1];return`${e?.getAttribute("data-turn-key")??""}:${e?.textContent?.length??0}`}function Ws(t,e,o){if(o===mn){if(z().generating||U()!==t||e>=Pm){Me=!1,z().generating||(Te="");return}ha(),setTimeout(()=>Ws(t,e+1,o),Im)}}function Nm(t){let e=mn;if(z().generating||U()&&U()!==t){Me=!1,Te="";return}Lt(t),fn=!0,Hn(()=>{e===mn&&Ws(t,0,e)})}function Qs(t){return t===Te||no>=Fs||z().generating||U()?!1:(Te=t,no+=1,Me=!0,Nm(Rm()),!0)}function Um(){if(oo||Me||ro)return;let t=Date.now(),e=js();if(e){if(Ee="",e!==dn){dn=e,Vr=t;return}if(t-Vr<km)return;Qs(`${b()??""}:${e}`);return}if(dn="",!Hm()){pn=!0,Ee="";return}if(!pn||!z().generating||U())return;let n=`${b()??""}:${Dm()}`;if(n!==Ee){Ee=n,Jr=t;return}if(t-Jr<Bm||no>=Fs)return;let r=jn();r&&(ro=!0,r.click())}function Qr(){mn+=1,oo=!1,no=0,Te="",dn="",Vr=0,Me=!1,ro=!1,pn=!0,Ee="",Jr=0,fn=!1}var zs=g({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:Ks,start(){Qr(),Wr=[P.on("rise",()=>{oo=!1,Te="",Me=!1,fn&&(fn=!1,pn=!1,Ee="")}),P.on("fall",({outcome:t})=>{if(ro){ro=!1,t==="left"?oo=!0:Qs(`${b()??""}:stall`);return}(t==="stopped"||t==="left")&&(oo=!0),t==="done"&&!js()&&(no=0)}),P.on("context",({migrated:t})=>{t||Qr()}),P.on("tick",Um)]},stop(){for(let t of Wr)t();Wr=[],Qr()}});var At=k("bloom-csi-"),Fm=256,Gm=160,gn=1,Vs=4,Km=.1,Ym=.0015,jm=250;function Wm(t){return new Promise((e,o)=>{let n=new FileReader;n.onload=()=>e(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(t)})}function Qm(t){return new Promise((e,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>e(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=t})}function zm(t,e){let o=Math.max(1/t.naturalWidth,1/t.naturalHeight)*e.zoom,n=1/(2*t.naturalWidth*o),r=1/(2*t.naturalHeight*o);return{zoom:e.zoom,x:$(e.x,n,1-n),y:$(e.y,r,1-r)}}function Js(t,e,o){let n=t.width,r=t.getContext("2d");if(!r)return;let i=Math.max(n/e.naturalWidth,n/e.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(e,n/2-o.x*e.naturalWidth*i,n/2-o.y*e.naturalHeight*i,e.naturalWidth*i,e.naturalHeight*i)}function Vm(t,e){let o=l("canvas");return o.width=o.height=Fm,Js(o,t,e),o.toDataURL("image/png")}function Zs(t){let e=null,o={x:D.store.cropX,y:D.store.cropY,zoom:D.store.cropZoom},n,r=l("canvas",{class:At("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=Gm*devicePixelRatio;let i=l("div",{class:`bloom-muted ${At("status")}`}),a=l("div",{class:At("zoom")}),u=l("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function c(p,w=!0){e&&(o=zm(e,p),Js(r,e,o),w&&(clearTimeout(n),n=setTimeout(()=>{e&&(D.store.cropX=o.x,D.store.cropY=o.y,D.store.cropZoom=o.zoom,D.store.avatarUrl=Vm(e,o))},jm)))}function d(){a.replaceChildren(No(o.zoom,gn,Vs,Km,"\xD7",p=>c({...o,zoom:p})))}async function m(p,w){i.textContent="";try{e=await Qm(p),w&&(D.store.avatarSource=p,o={x:.5,y:.5,zoom:gn}),t.classList.add(At("has-image")),d(),c(o,w)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let v=p=>{p?.type.startsWith("image/")&&Wm(p).then(w=>m(w,!0))};u.addEventListener("change",()=>v(u.files?.[0])),r.addEventListener("wheel",p=>{e&&(p.preventDefault(),c({...o,zoom:$(o.zoom*(1-p.deltaY*Ym),gn,Vs)}),d())},{passive:!1}),r.addEventListener("pointerdown",p=>{if(!e)return;r.setPointerCapture(p.pointerId);let w={...o},Q=r.getBoundingClientRect(),le=j=>{if(!e)return;let N=Math.max(Q.width/e.naturalWidth,Q.height/e.naturalHeight)*o.zoom;c({...o,x:w.x-(j.clientX-p.clientX)/(e.naturalWidth*N),y:w.y-(j.clientY-p.clientY)/(e.naturalHeight*N)})};r.addEventListener("pointermove",le),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",le),{once:!0})});let C=l("div",{class:At("cropper"),attrs:{tabindex:"0"},on:{paste:p=>v([...p.clipboardData?.files??[]].find(w=>w.type.startsWith("image/"))),dragover:p=>p.preventDefault(),drop:p=>{p.preventDefault(),v(p.dataTransfer?.files[0])}}},l("div",{class:At("stage")},r),l("div",{class:At("controls")},Ye("",p=>p.trim()&&void m(p.trim(),!0),"https://\u2026 or data:image/\u2026","url"),l("div",{class:At("buttons")},G("Choose file",()=>u.click()),G("Reset crop",()=>{c({x:.5,y:.5,zoom:gn}),d()}),G("Clear",()=>{e=null,t.classList.remove(At("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),a.replaceChildren(),D.store.avatarUrl="",D.store.avatarSource=""},"danger")),a,i,u));return t.append(C),D.store.avatarSource&&m(D.store.avatarSource,!1),()=>{clearTimeout(n),t.replaceChildren()}}var Xs=`/*
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
`;var io="data-bloom-csi-avatar",Zr="data-bloom-csi-sized",el="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",Zm=32,D=A({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:t=>Zs(t)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),$s=[];function ol(t){t.removeAttribute(io),t.removeAttribute(Zr)}function _s(t){return(D.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${t}]`)])}function tl(t=[]){if(!H(t))return;let e=D.store.displayName.trim()||null,o=!!D.store.avatarUrl,n=new Set(e?_s("name"):[]);for(let i of document.querySelectorAll(el))n.has(i)||Gt(i,null);for(let i of n)Gt(i,e);let r=new Set(o?_s("avatar"):[]);for(let i of document.querySelectorAll(`[${io}]`))r.has(i)||ol(i);for(let i of r)i.hasAttribute(io)||i.setAttribute(io,""),i.toggleAttribute(Zr,!i.closest('[role="menu"]'))}function Xm(){let t=D.store.avatarUrl;return t?`:root{--bloom-csi-url:url("${t.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${D.store.avatarSize}px}:is(${s.rail}, ${s.oldRail}) [${Zr}]{--bloom-csi-size:${Zm}px}`:""}var nl=g({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:D,styles:()=>`${Xm()}
${Xs}`,start(){$s=[lt(),T(tl)]},stop(){for(let t of $s)t();for(let t of document.querySelectorAll(`[${io}]`))ol(t);for(let t of document.querySelectorAll(el))Gt(t,null)},onSettingsChange(){tl()}});var Ce=k("bloom-greeting-"),rl=30,il=100;function al(t){let e=-1,o=l("textarea",{class:`bloom-input ${Ce("input")}`,attrs:{maxlength:String(il),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=G("Add",i),r=l("div",{class:Ce("list")});function i(){let c=o.value.trim().slice(0,il);if(!c)return;let d=[...M.store.greetings];e>=0?d[e]=c:d.length<rl&&d.push(c),M.store.greetings=d,e=-1,o.value="",a()}function a(){let{greetings:c}=M.store;n.textContent=e>=0?"Save":"Add",n.disabled=e<0&&c.length>=rl,r.replaceChildren(...c.length?c.map((d,m)=>l("div",{class:Ce("row",m===e?"row-editing":"row-idle")},l("div",{class:Ce("text"),text:d}),Z("edit","Edit",()=>{e=m,o.value=d,o.focus(),a()}),Z("trash","Delete",()=>{M.store.greetings=c.filter((v,C)=>C!==m),e===m&&(e=-1),a()}))):[l("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",c=>{c.key==="Enter"&&(c.ctrlKey||c.metaKey)&&i()}),t.append(l("div",{class:Ce("editor")},r,l("div",{class:Ce("form")},o,n))),a();let u=ue((c,d)=>c==="GreetingCustomizer"&&d==="greetings"&&a());return()=>{u(),t.replaceChildren()}}var sl=`/*
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
`;var bn="data-bloom-greeting",_m=1e3,tp=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],M=A({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:t=>al(t)},greetings:{type:"custom",default:tp},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),hn,ll=[],Xr,co=()=>Do()&&!Yt(),ep=t=>t.replaceAll(/\s*\n\s*/g," ").trim(),ul=()=>M.store.greetings.filter(t=>typeof t=="string"&&t.trim());function uo(){let t=ul();if(t.length)if(M.store.order==="random"&&t.length>1){let e=M.store.lastRandom;for(;e===M.store.lastRandom;)e=Math.floor(Math.random()*t.length);M.store.lastRandom=e,M.store.index=e}else M.store.index=(M.store.index+1)%t.length}function op(){return co()?it(s.homeHeading):null}function ao(){for(let t of document.querySelectorAll(`[${bn}]`))t.removeAttribute(bn),Gt(t,null)}function so(){for(let t of document.querySelectorAll("[data-bloom-placeholder]"))t.removeAttribute("data-bloom-placeholder")}function cl(t){let e=pt(),o=ep(t);if(!e||!o||U(e)){so();return}e.getAttribute("data-bloom-placeholder")!==o&&e.setAttribute("data-bloom-placeholder",o)}function lo(){let t=ul(),e=Aa(),o=co();if(!t.length||!e&&!o){ao(),so();return}if(e){ao(),cl(t[0]??"");return}let n=op();n?((M.store.index<0||M.store.index>=t.length)&&uo(),n.setAttribute(bn,""),Gt(n,t[Math.max(0,M.store.index)%t.length]??"")):ao(),M.store.heroOnlyOutsideProject?so():cl(t[Math.max(0,M.store.index)%t.length]??"")}function $r(){clearInterval(hn),hn=void 0,M.store.mode==="interval"&&co()&&(hn=setInterval(()=>{uo(),lo()},M.store.intervalSec*_m))}function np(t){M.store.mode!=="manual"||!(t.target instanceof Element)||!t.target.closest(`[${bn}]`)||getSelection()?.toString()||(uo(),lo())}function rp(){co()&&M.store.mode==="refresh"&&uo(),$r(),lo()}var dl=g({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:M,styles:sl,start(){ao(),so(),Xr=new AbortController,document.addEventListener("click",np,{signal:Xr.signal}),co()&&M.store.mode==="refresh"&&uo(),$r(),ll=[T(t=>H(t)&&lo()),at(rp)]},stop(){Xr?.abort();for(let t of ll)t();clearInterval(hn),ao(),so()},onSettingsChange(t){(t==="mode"||t==="intervalSec")&&$r(),lo()}});var mo=k("bloom-history-"),_r=10,ip=3e3;function ml(t){let e="",o=0,n=new Set,r=l("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),i=l("div",{class:mo("list")}),a=l("div",{class:mo("pager")}),u,c=G("Clear all",()=>{if(!u){c.textContent="Click again to clear",u=setTimeout(()=>{u=void 0,c.textContent="Clear all"},ip);return}clearTimeout(u),u=void 0,c.textContent="Clear all",po([])},"danger");function d(){let v=[...ne.store.entries].toReversed(),C=e.trim().toLowerCase(),p=C?v.filter(N=>N.toLowerCase().includes(C)):v,w=Math.max(1,Math.ceil(p.length/_r));o=Math.min(o,w-1);let Q=p.slice(o*_r,(o+1)*_r).map(N=>l("div",{class:mo("row")},l("button",{class:mo("text",n.has(N)?"text-open":"text-closed"),text:N,title:n.has(N)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{n.delete(N)||n.add(N),d()}}}),Z("copy","Copy",()=>void Li(N)),Z("trash","Delete",()=>po(ne.store.entries.filter(Pn=>Pn!==N)))));i.replaceChildren(...Q.length?Q:[l("div",{class:"bloom-muted",text:C?"No matching prompts.":"No saved prompts yet."})]),a.replaceChildren(l("span",{class:"bloom-muted",text:`${p.length} ${C?"matching":"saved"} \xB7 page ${o+1} of ${w}`}),G("Previous",()=>{o--,d()}),G("Next",()=>{o++,d()}),c);let[le,j]=a.querySelectorAll("button");le.disabled=o===0,j.disabled=o>=w-1,c.disabled=!v.length}r.addEventListener("input",()=>{e=r.value,o=0,d()}),t.append(l("div",{class:mo("manager")},r,i,a)),d();let m=ue((v,C)=>v==="InputHistory"&&C==="entries"&&d());return()=>{m(),clearTimeout(u),t.replaceChildren()}}var pl=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

.bloom-history-hud {
    position: fixed;
    z-index: 2147482000;
    padding: 0.125rem 0.625rem;
    border: 1px solid var(--bloom-border);
    border-radius: 9999px;
    background: var(--bloom-surface);
    box-shadow: var(--bloom-shadow);
    color: var(--bloom-fg-2);
    font-size: 0.75rem;
    font-variant-numeric: tabular-nums;
    pointer-events: none;
    transform: translate(-50%, calc(-100% - 0.5rem));
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
`;var sp=k("bloom-history-"),lp=2e3,ne=A({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:t=>ml(t)},entries:{type:"custom",default:[]}}),V=null,ti={text:"",at:0},vt=null,ei,yn=()=>ne.store.entries.filter(t=>typeof t=="string");function po(t){ne.store.entries=t.slice(-ne.store.maxEntries)}function oi(t){let e=t.trim();if(!e)return;let o=Date.now();e===ti.text&&o-ti.at<lp||(ti={text:e,at:o},po([...yn().filter(n=>n!==e),e]))}function cp(t,e){let o=pt();if(!o)return;vt??=l("div",{class:`bloom-root ${sp("hud")}`,attrs:{"data-bloom":"history-hud","aria-live":"polite"}}),vt.textContent=`${t+1} / ${e}`;let n=(o.closest("form")??o).getBoundingClientRect();vt.style.left=`${n.left+n.width/2}px`,vt.style.top=`${n.top}px`,vt.isConnected||document.body.append(vt)}function fo(){V=null,vt?.remove()}function up(t){let e=yn();if(!V)return;let o=e[t];V.index=t,V.shown=o,Lt(o),cp(e.length-1-t,e.length)}function dp(t){let e=yn();if(!e.length)return!1;if(!V){if(t===1)return!1;V={index:e.length,draft:U(),shown:""}}let o=V.index+t;return o<0?!0:o>=e.length?(Lt(V.draft),fo(),!0):(up(o),!0)}function fl(t){return Ue(t)?t:t instanceof HTMLElement?t.closest(s.composerInput):null}function mp(){if(pt()?.closest("[data-chatgpt-composer], [data-composer-input], form")?.querySelector('[aria-expanded="true"]'))return!0;for(let e of document.querySelectorAll('[role="listbox"], [role="menu"], [data-radix-popper-content-wrapper], [cmdk-root], [cmdk-list]')){if(!(e instanceof HTMLElement)||e.closest("[data-bloom]"))continue;let o=getComputedStyle(e);if(!(o.display==="none"||o.visibility==="hidden"))return!0}return!1}function pp(t){if(t.isComposing||t.key==="Process"||t.keyCode===229)return;let e=fl(t.target);if(!e)return;if(t.key==="Enter"&&!t.shiftKey){oi(U(e)),fo();return}if(t.key==="Escape"&&V){Lt(V.draft),fo(),t.preventDefault(),t.stopPropagation();return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.ctrlKey||t.metaKey||t.shiftKey||mp())return;let o=fa(e),n=t.key==="ArrowUp";!t.altKey&&!(n?o.first:o.last)||!n&&!V||dp(n?-1:1)&&(t.preventDefault(),t.stopPropagation())}function fp(t){V&&fl(t.target)&&U()!==V.shown.trim()&&fo()}function gp(t){t.target instanceof Element&&t.target.closest(s.sendButton)&&oi(U())}var gl=g({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:ne,styles:pl,start(){for(let e of document.querySelectorAll('[data-bloom="history-hud"]'))e.remove();vt=null,ei=new AbortController;let{signal:t}=ei;document.addEventListener("keydown",pp,{capture:!0,signal:t}),document.addEventListener("input",fp,{capture:!0,signal:t}),document.addEventListener("click",gp,{capture:!0,signal:t}),document.addEventListener("submit",()=>oi(U()),{capture:!0,signal:t})},stop(){ei?.abort(),fo();for(let t of document.querySelectorAll('[data-bloom="history-hud"]'))t.remove();vt=null},onSettingsChange(t){t==="maxEntries"&&po(yn())}});var hl=`/*
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
`;var bp=1500,yp=5e3,Ap=2e3,xl=[{label:"UTC",value:"UTC"},{label:"\u7F8E\u56FD\u4E1C\u90E8",value:"America/New_York"},{label:"\u7F8E\u56FD\u4E2D\u90E8",value:"America/Chicago"},{label:"\u7F8E\u56FD\u5C71\u5730",value:"America/Denver"},{label:"\u7F8E\u56FD\u897F\u90E8",value:"America/Los_Angeles"},{label:"\u65E5\u672C",value:"Asia/Tokyo"},{label:"\u53F0\u6E7E",value:"Asia/Taipei"}],Le=A({sourceTimeZone:{type:"select",description:"Zone the stored clock was written in. Leave UTC for ChatGPT create_time. Pick the same zone as the Shit GPT plugin only when that clock is a wall time in that zone; it is then shown in the system timezone.",options:xl,default:"UTC"},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),vn=new Map,ni=new Set,wl=0,qn,bl=[];function Sl(t,e){vn.get(t)!==e&&(vn.set(t,e),clearTimeout(qn),qn=setTimeout(El,Ap))}function El(){let t={...Le.store.stamps,...Object.fromEntries(vn)};Le.store.stamps=Object.fromEntries(Object.entries(t).toSorted((e,o)=>o[1]-e[1]).slice(0,bp))}function vp(t){let e=gt(b())?.times;for(let o=t.length-1;o>=0;o--){let n=vn.get(t[o])??e?.get(t[o])??Le.store.stamps[t[o]];if(n)return n}return null}var qp=()=>z().generating||Date.now()-wl<yp;function Tl(){return Intl.DateTimeFormat().resolvedOptions().timeZone}function Ml(){let t=Le.store.sourceTimeZone;if(!t||t==="UTC")return"UTC";try{return Intl.DateTimeFormat(void 0,{timeZone:t}),t}catch{return"UTC"}}function Cl(t,e){let o={};for(let n of new Intl.DateTimeFormat("en-US",{timeZone:e,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(t)))o[n.type]=n.value;return{y:+o.year,m:+o.month,d:+o.day,h:+o.hour%24,mi:+o.minute,s:+o.second}}function Ll(t){return Date.UTC(t.y,t.m-1,t.d,t.h,t.mi,t.s)}function yl(t,e){let o=t;for(let n=0;n<4;n++){let r=t-Ll(Cl(o,e));if(r===0)return o;o+=r}return o}function xp(t,e){if(e==="UTC")return t;let o=(t%1e3+1e3)%1e3,n=t-o,r=new Date(n),i=Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),r.getUTCHours(),r.getUTCMinutes(),r.getUTCSeconds()),a=yl(i,e),u=3600*1e3,c=Number.POSITIVE_INFINITY;for(let d of[-u,0,u]){let m=a+d;Ll(Cl(m,e))===i&&m<c&&(c=m)}return c!==Number.POSITIVE_INFINITY?c+o:yl(i+u,e)+o}function wp(t,e){let o=Ml();return e||o==="UTC"?t:xp(t,o)}function Al(t,e){return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}function Sp(t){let e=Tl(),o=Date.now(),n={hour:"2-digit",minute:"2-digit",timeZone:e};if(Al(t,e)===Al(o,e))return new Intl.DateTimeFormat(void 0,n).format(t);let r=a=>new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric"}).format(a),i=r(t)===r(o)?{}:{year:"numeric"};return new Intl.DateTimeFormat(void 0,{...i,month:"short",day:"numeric",...n}).format(t)}function Ep(t,e){let o=new Date(e).toLocaleString(void 0,{timeZone:Tl()}),n=Ml();if(n==="UTC"||e===t)return o;let r=new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"UTC"}).format(t);return`${xl.find(a=>a.value===n)?.label??n} ${r} \u2192 ${o}`}function kl(t){let e=Pt(t)??t.getAttribute("data-message-author-role")??t.closest(s.turn)?.getAttribute("data-turn")??t.querySelector(s.authorRole)?.getAttribute("data-message-author-role");if(Qo(e))return e;let o=ze(t).at(-1);return gt(b())?.chain.find(n=>n.id===o)?.role??null}var vl='[class*="group/activity-header"]';function Tp(t){let e=t.parentElement;if(!e)return null;let o=t.closest(s.turn);return o&&e!==o&&!o.contains(e)?null:e}function Mp(t){let e=t;for(let o=0;o<8&&e;o++){let n=Tp(e);if(!n)return null;let r=[...n.children],i=r.indexOf(e);for(let a=i-1;a>=0;a--){let u=r[a],c=u.matches(vl)?u:u.querySelector(vl);if(c)return c;if(u.matches(s.searchUnit)||u.querySelector(s.searchUnit))return null}if(n===e.closest(s.turn))return null;e=n}return null}function Cp(t){let e=t.parentElement;for(let o=0;o<4&&e;o++){if(e.classList.contains("flex-col"))return e;e=e.parentElement}return t.parentElement??t}function Bl(t,e){if(e==="assistant"){let o=Mp(t);if(o)return Cp(o)}return t}function Lp(t,e){let o=he();for(let n=o.length-1;n>=0;n--){let r=o[n];if(!(r!==t&&(kl(r)!=="assistant"||Bl(r,"assistant")!==e)))return r===t}return!0}function ql(t){return t.querySelector(':scope > time[data-bloom="timestamp"]')}function kp(t){let e=ze(t);if(!e.length||!st(t)||t.querySelector("time:not([data-bloom])"))return;let o=kl(t),n=Bl(t,o);if(n!==t&&!Lp(t,n)){ql(t)?.remove();return}let r=vp(e),i=!1;if(!r&&qp()){r=Date.now();let m=e.at(-1);ni.add(m),Sl(m,r),i=!0}else r&&ni.has(e.at(-1))&&(i=!0);let a=n.querySelector('time[data-bloom="timestamp"]')??ql(t);if(!r||Le.store.hideOwnMessages&&o==="user"){a?.remove();return}let u=wp(r,i),c=Sp(u);if(a?.textContent===c&&a.parentElement===n&&a===n.firstElementChild)return;let d=l("time",{class:`bloom-timestamp bloom-timestamp-${o??"assistant"}`,text:c,title:Ep(r,u),attrs:{"data-bloom":"timestamp",datetime:new Date(u).toISOString()}});a&&a.replaceWith(d),(d.parentElement!==n||d!==n.firstElementChild)&&n.prepend(d)}var An=Et(()=>{for(let t of he())kp(t)}),Il=g({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:Le,styles:hl,start(){bl=[T(t=>H(t)&&An()),ft.on("conversation",An),ft.on("message-time",({messageId:t,time:e})=>{ni.delete(t),Sl(t,e),An()}),P.on("fall",()=>{wl=Date.now()})]},stop(){for(let t of bl)t();qn&&(clearTimeout(qn),El());for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove()},onSettingsChange(t){if(t!=="stamps"){for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove();An()}}});var Bp=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])','[data-chatgpt-composer] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-composer-input] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-codex-composer-root] button[aria-label^="Dictat" i], [data-composer-placement] button[aria-label^="Dictat" i], [class*="ComposerLayout"] button[aria-label^="Dictat" i]'],Ip=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],Pl=A({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),Ol=g({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:Pl,styles:()=>St([...Bp,...Pl.store.hideDictationSettings?Ip:[]])});var re="data-bloom-share",Pp=/^\/g\/g-p-/,Op=/^(?:share|分享)$/i,Rp=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],Hp=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${re}="project"]`],ri=A({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),xn,ii=!1;function Dp(t){if(!H(t))return;let e=Pp.test(location.pathname)&&!b();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${re}]`))!e||!Op.test(h(o.textContent??""))?o.removeAttribute(re):o.hasAttribute(re)||o.setAttribute(re,"project")}var Rl=g({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:ri,styles:()=>St([...ri.store.hideShareChat?Rp:[],...ri.store.hideShareProject?Hp:[]]),start(){ii=!0,kt().then(()=>{ii&&!xn&&(xn=T(Dp))})},stop(){ii=!1,xn?.(),xn=void 0;for(let t of document.querySelectorAll(`[${re}]`))t.removeAttribute(re)}});var Hl='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',Np='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',Up="[data-bloom-profile-plan]",Dl="visibility:hidden!important;user-select:none!important",Ul=A({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function Fp(){let{hideUsername:t,hideEmail:e,enlargePlan:o,alignPlanWithAvatar:n}=Ul.store,r=[];return t&&r.push(n?`:is(${Hl}){display:none!important}`:`:is(${Hl}){${Dl}}`),e&&r.push(`:is(${Np}){${Dl}}`),t&&o&&r.push(`${Up}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var Nl,Fl=g({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Ul,styles:Fp,start(){Nl=lt()},stop(){Nl?.()}});var Gp=new Set(["chatgpt","new chat","\u65B0\u804A\u5929","codex"]);function Kp(){let t=h(document.title.replace(/\s*[|–-]\s*(?:ChatGPT|Codex)$/i,""));return t&&!Gp.has(t.toLowerCase())?t:null}function go(t){return t?Qe(t)??(t===b()?Kp():null):null}var Gl=`/*
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
`;var qt=k("bloom-recent-"),xt="home",jp=50,Kl=140,Wp=new Set(["Backquote"]),Qp=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),S=A({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(t=>({label:t,value:t})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),Ht=null,ut=[],dt=0,ai,Yl=[],En=()=>Yt()?null:b()??(Do()?xt:null);function jl(t,e){return Object.fromEntries(Object.entries(t).filter(([o])=>e.has(o)))}function Ql(t){let e=go(t);e&&S.store.titles[t]!==e&&(S.store.titles={...S.store.titles,[t]:e});let o=Ka(location.href);o&&t===b()&&S.store.projects[t]!==o&&(S.store.projects={...S.store.projects,[t]:o})}function Wl(t){if(!t)return;let e=[t,...S.store.visits.filter(n=>n!==t)].slice(0,jp),o=new Set(e);S.store.visits=e,Object.keys(S.store.previews).some(n=>!o.has(n))&&(S.store.previews=jl(S.store.previews,o)),Object.keys(S.store.titles).some(n=>!o.has(n))&&(S.store.titles=jl(S.store.titles,o)),t!==xt&&Ql(t)}function wn(t){if(!t||!S.store.visits.includes(t))return;let e={},o=gt(t)?.chain??[];for(let r of o)e[r.role]=nt(Vo(r),Kl);if(t===b())for(let r of Ot()){let i=be(r);i&&(e[r.role]=nt(i,Kl))}let n=S.store.previews[t];!e.user&&!e.assistant||n?.user===e.user&&n?.assistant===e.assistant||(S.store.previews={...S.store.previews,[t]:e})}function zp(){let t=Number(S.store.maxRecent);return S.store.visits.filter(e=>e!==xt||S.store.includeHome).slice(0,t)}function si(t){if(ho(),t===En())return;let e=t===xt?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"], [data-sidebar-destination="builtin:home"]'):We(t)[0];e?e.click():location.assign(t===xt?"/":`/c/${t}`)}function Vp(t,e){let o=t===xt?"New chat":S.store.titles[t]??go(t)??"Untitled chat",n=t===xt?null:S.store.projects[t],r=t===xt?null:S.store.previews[t];return l("button",{class:qt("item"),attrs:{type:"button",role:"option","aria-selected":String(e===dt)},on:{click:()=>si(t),mousemove:()=>e!==dt&&Sn(e)}},l("div",{class:qt("head")},l("span",{class:`${qt("title")} bloom-truncate`,text:o}),n&&l("span",{class:qt("project"),text:n})),r?.user&&l("div",{class:`${qt("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&l("div",{class:`${qt("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function Sn(t){dt=(t+ut.length)%ut.length,Ht?.querySelectorAll(`.${qt("item")}`).forEach((e,o)=>e.setAttribute("aria-selected",String(o===dt)))}function Jp(){wn(b());let t=En();ut=zp(),t&&(ut=[t,...ut.filter(e=>e!==t)].slice(0,Number(S.store.maxRecent))),ut.length&&(dt=ut.length>1?1:0,Ht=l("div",{class:`bloom-root ${qt("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:e=>e.target===e.currentTarget&&ho()}},l("div",{class:qt("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...ut.map(Vp))),document.body.append(Ht))}function ho(){Ht?.remove(),Ht=null}var Zp=t=>Wp.has(t.code)||Qp.has(t.key);function Xp(t){if(t.ctrlKey&&!t.altKey&&!t.metaKey&&Zp(t)){t.preventDefault(),t.stopPropagation(),Ht?Sn(dt+(t.shiftKey?-1:1)):Jp();return}if(!Ht)return;let o={Escape:ho,Enter:()=>si(ut[dt]),ArrowDown:()=>Sn(dt+1),ArrowUp:()=>Sn(dt-1)}[t.key];o&&(t.preventDefault(),t.stopPropagation(),o())}function $p(t){Ht&&t.key==="Control"&&si(ut[dt])}var zl=g({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:S,styles:Gl,start(){ai=new AbortController;let{signal:t}=ai;addEventListener("keydown",Xp,{capture:!0,signal:t}),addEventListener("keyup",$p,{capture:!0,signal:t}),addEventListener("blur",ho,{signal:t}),document.addEventListener("visibilitychange",()=>document.hidden&&wn(b()),{signal:t}),Yl=[at(({prevId:i})=>{wn(i),Wl(En())}),ft.on("conversation",({id:i})=>{S.store.visits.includes(i)&&Ql(i),wn(i)})];let{visits:e,titles:o,previews:n}=S.store,r=e.filter(i=>i!==xt&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(S.store.visits=e.filter(i=>!r.includes(i))),Wl(En())},stop(){ai?.abort();for(let t of Yl)t();ho()}});var li="data:audio/mpeg;base64,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";var Vl=new x("ResponseNotification"),_p=.5,tf=200,ef=300,bo=A({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:t=>(t.append(G("Preview",$l)),()=>t.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),Jl=null,ci=new Map,Zl,ui;function of(t){return new Promise((e,o)=>GM_xmlhttpRequest({url:t,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=tf&&n<ef?e(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var nf=t=>Uint8Array.from(atob(t.slice(t.indexOf(",")+1)),e=>e.charCodeAt(0)).buffer;function rf(t,e){let o=ci.get(e);return o||(o=(e.startsWith("data:")?Promise.resolve(nf(e)):of(e)).then(n=>t.decodeAudioData(n)),o.catch(()=>ci.delete(e)),ci.set(e,o)),o}async function Xl(t){Jl??=new AudioContext;let e=Jl;e.state==="suspended"&&e.resume();let o=e.createBufferSource(),n=e.createGain();o.buffer=await rf(e,t),n.gain.value=_p,o.connect(n).connect(e.destination),o.start()}function $l(){let t=bo.store.soundUrl.trim();Xl(t||li).catch(e=>{Vl.warn("Sound failed",e),t&&Xl(li).catch(o=>Vl.warn("Default chime failed",o))})}function af(t){let e=`${t??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:e,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:e,silent:!0});o.onclick=()=>{focus(),o.close()}}function sf(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(ui=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:ui.signal}))}var _l=g({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:bo,start(){sf(),Zl=P.on("fall",({conversationId:t,outcome:e})=>{e==="done"&&(bo.store.onlyWhenHidden&&!document.hidden||(bo.store.sound&&$l(),bo.store.browserNotification&&af(go(t))))})},stop(){Zl?.(),ui?.abort()}});var lf=`:is(${s.sidebarScroll}, :has(> ${s.sidebarScroll})) + :has(${s.menuButton})`,cf=`${s.rail} > :has(${s.menuButton})`,mi=`:is(${lf}, ${cf}, ${s.oldProfile}):not(:hover)`,di="[data-bloom-profile-avatar]",uf=`:is(${mi}, ${mi} :has(${di})) > :not(${di}, :has(${di}))`,ec=A({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function df(){let{opacity:t,fadeAvatar:e}=ec.store;return t>=100?"":`${e?mi:uf}{opacity:${t/100}!important}`}var tc,oc=g({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:ec,styles:df,start(){tc=lt()},stop(){tc?.()}});var nc=`/*
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
`;var O=k("bloom-star-chats"),pf=80,ff=60,gf=1200,hf=120,yo=A({replaceReadAloud:{type:"boolean",description:"Put the star where the reply's Read aloud button is, and hide that button.",default:!0},messages:{type:"custom",default:[]}}),bf=`:is(${s.turnActions}) ${s.readAloud}`,pi,fi=!1,Dt=!1,ae=!1,Tn=0,Y=null,Mn="",L=null,gi,Nt;function bi(){let t=yo.store.messages;return Array.isArray(t)?t.filter(e=>R(e)&&typeof e.conversationId=="string"&&typeof e.messageId=="string"&&(e.role==="user"||e.role==="assistant")&&typeof e.snippet=="string"&&typeof e.starredAt=="number"):[]}function yi(){let t=b();return t?bi().filter(e=>e.conversationId===t):[]}function yf(t,e){return bi().some(o=>o.conversationId===t&&o.messageId===e)}function rc(t){let e=bi(),o=e.some(n=>n.conversationId===t.conversationId&&n.messageId===t.messageId);yo.store.messages=o?e.filter(n=>!(n.conversationId===t.conversationId&&n.messageId===t.messageId)):[{...t,starredAt:Date.now()},...e].slice(0,pf)}function hi(t){return t.messageIds[0]||t.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||t.el.getAttribute("data-turn-key")||""}function Af(t){return nt(be(t)||h(t.el.textContent??""),ff)}function vf(t){let e=t.closest(s.turn);if(!e)return null;let o=Ot().filter(n=>e.contains(n.el));return o.find(n=>n.el.contains(t)||n.el===e)??o.findLast(n=>n.el.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING)??null}function qf(){let t=[...document.querySelectorAll(s.turnActions)].filter(e=>!e.closest(`[data-bloom], [role="dialog"], [inert], pre, ${s.sidebars}`));return t.filter(e=>!t.some(o=>o!==e&&o.contains(e)))}function xf(t,e){let o=yo.store.replaceReadAloud?e.querySelector(s.readAloud):null;if(o&&!o.closest("[data-bloom]")){t.nextElementSibling!==o&&o.before(t);return}let n=wf(e);(t.parentElement!==n||n.lastElementChild!==t)&&n.append(t)}function wf(t){let e=[...t.querySelectorAll("button")].filter(n=>n.dataset.bloom!=="message-star"&&!n.closest("[data-bloom]"));return e.length?[...t.children].find(n=>n instanceof HTMLElement&&n!==e[0]&&e.every(r=>n.contains(r)))??t:t}function Sf(){return[...document.querySelectorAll(s.headerMore)].filter(e=>{if(e.dataset.bloom==="message-star"||e.closest("[data-bloom], [role='dialog'], [inert]")||e.closest(s.sidebars))return!1;let o=e.getBoundingClientRect();return o.width===0&&o.height===0?!!e.closest("header, #page-header"):o.top>=0&&o.top<96&&o.left>window.innerWidth*.5}).toSorted((e,o)=>o.getBoundingClientRect().left-e.getBoundingClientRect().left||(e.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1))[0]??null}function ic(t,e,o){return l("button",{class:e,attrs:{type:"button","aria-label":t},on:{pointerdown:n=>n.stopPropagation(),mousedown:n=>n.stopPropagation(),click:n=>{n.preventDefault(),n.stopPropagation(),o(n)}}},F("star"))}function Ef(t,e){t.setAttribute("aria-pressed",String(e)),t.setAttribute("aria-label",e?"Unstar":"Star")}function Cn(){return Dt||ae}function ke(){Tn&&window.clearTimeout(Tn),Tn=0}function Be(){Dt=!1,ae=!1,ke(),Nt?.enter(),Y?.remove(),Y=null,Mn="",L?.classList.remove(O("-open")),L?.setAttribute("aria-expanded","false")}function Ln(t){return t instanceof Node&&!!(L?.contains(t)||Y?.contains(t))}function Tf(t){t.classList.add(O("-flash")),window.setTimeout(()=>t.classList.remove(O("-flash")),gf)}function Mf(t){let e=Ot().find(n=>hi(n)===t),o=e?.el.closest(s.turn)??e?.el;o&&(o.scrollIntoView({block:"start"}),Tf(o))}function Cf(){let t=b(),e=new Set,o=[...document.querySelectorAll('[data-bloom="message-star"][data-place="action"]')];if(!t||Yt()){for(let n of o)n.remove();return}for(let n of qf()){if(!st(n))continue;let r=vf(n),i=r?hi(r):"";if(!r||!i)continue;let a=n.querySelector('[data-place="action"]');(!a||a.dataset.id!==i)&&(a?.remove(),a=ic("Star",O("-star"),()=>{let u=b(),c=Ot().find(d=>hi(d)===i);!u||!c||rc({conversationId:u,messageId:i,role:c.role,snippet:Af(c)})}),a.dataset.bloom="message-star",a.dataset.place="action",a.dataset.id=i),Ef(a,yf(t,i)),xf(a,n),e.add(a)}for(let n of o)e.has(n)||n.remove()}function Lf(){if(!Y||!L)return;let t=L.getBoundingClientRect(),e=Y.offsetWidth||288,o=Y.offsetHeight||120,n=t.bottom+6;n+o>window.innerHeight-8&&(n=Math.max(8,t.top-o-6));let r=Math.max(8,Math.min(t.right-e,window.innerWidth-e-8));Y.dataset.place=n>=t.bottom?"below":"above",Y.style.left=`${Math.round(r)}px`,Y.style.top=`${Math.round(n)}px`}function kf(){if(!Cn()||!L){Y?.remove(),Y=null,Mn="",L?.classList.remove(O("-open")),L?.setAttribute("aria-expanded","false");return}let t=yi(),e=t.map(o=>`${o.messageId}	${o.snippet}`).join(`
`);if(!Y||Mn!==e){Y?.remove();let o=t.map(n=>l("div",{class:O("-row")},l("button",{class:O("-jump"),attrs:{type:"button"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),Be(),Mf(n.messageId)}}},l("span",{class:O("-role"),text:n.role==="user"?"You":"ChatGPT"}),l("span",{class:O("-snip"),text:n.snippet||"Message"})),ic("Unstar",O("-unstar"),()=>rc(n))));Y=l("div",{class:`bloom-root ${O("-panel")}`,attrs:{"data-bloom":"star-list"},on:{pointerenter:()=>{ke(),Nt?.enter(),ae=!0},pointerleave:n=>{Ln(n.relatedTarget)||Dt||Nt?.leave(n)}}},l("div",{class:O("-bridge"),attrs:{"aria-hidden":"true"}}),l("div",{class:O("-head"),text:"Starred"}),l("div",{class:O("-body")},...o.length?o:[l("div",{class:O("-empty"),text:"No starred messages in this chat"})])),document.body.append(Y),Mn=e}Lf(),L.classList.add(O("-open")),L.setAttribute("aria-expanded","true")}function Bf(){for(let r of document.querySelectorAll('[data-bloom="starred"]'))r.remove();let t=Sf(),e=t?.parentElement??null,o=b();if(!t||!e||e.closest(s.sidebars)||!o||Yt()||!st(e)){L?.remove(),L=null,Be();return}L||(L=l("button",{class:O("-toggle"),attrs:{type:"button","data-bloom":"message-star","data-place":"header","aria-label":"Starred messages","aria-expanded":"false"},on:{pointerdown:r=>r.stopPropagation(),pointerenter:()=>{ke(),Nt?.enter(),Tn=window.setTimeout(()=>{ae=!0,ie()},hf)},pointerleave:r=>{Ln(r.relatedTarget)||(ke(),Cn()&&Nt?.leave(r))},click:r=>{r.preventDefault(),r.stopPropagation(),Dt=!Dt,ae=Dt,ke(),Dt||Be(),ie()}}},F("star"))),(L.parentElement!==e||L.nextElementSibling!==t)&&t.before(L);let n=t.getBoundingClientRect();n.width>0&&(L.style.width=`${n.width}px`,L.style.height=`${n.height}px`),L.classList.toggle(O("-here"),yi().length>0),kf()}function If(){let t=new Set(yi().map(e=>e.messageId));for(let e of document.querySelectorAll('[data-bloom="navigator"] .bloom-nav-tick, [data-bloom="navigator"] .bloom-nav-row'))e.classList.toggle(O("-mark"),!!e.dataset.messageId&&t.has(e.dataset.messageId))}function ie(){if(!fi){fi=!0;try{for(let t of document.querySelectorAll('[data-bloom="starred"], [data-bloom="chat-star"]'))t.remove();Cf(),Bf(),If()}finally{fi=!1}}}function Pf(){Be(),L?.remove(),L=null;for(let t of document.querySelectorAll('[data-bloom="message-star"], [data-bloom="star-list"], [data-bloom="starred"], [data-bloom="chat-star"]'))t.remove();for(let t of document.querySelectorAll(`.${O("-mark")}`))t.classList.remove(O("-mark"))}var ac=g({name:"StarChats",description:"Star a message from its toolbar. The star left of the top-right menu opens this chat's list.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:yo,styles:()=>`${nc}${yo.store.replaceReadAloud?St([bf]):""}`,onSettingsChange(t){(t==="messages"||t==="replaceReadAloud")&&ie()},start(){for(let o of document.querySelectorAll('[data-bloom="star-list"]'))o.remove();Nt=Jo({over:Ln,trigger:()=>L,panel:()=>Y,setHeld(o){if(o){ae=!0,ie();return}Dt||(ae=!1,ie())}}),pi=T(o=>H(o)&&ie());let t=o=>{Ln(o.target)||Cn()&&Be()};document.addEventListener("pointerdown",t,!0);let e=o=>{o.key!=="Escape"||!Cn()||(o.preventDefault(),Be())};document.addEventListener("keydown",e,!0),gi=()=>{document.removeEventListener("pointerdown",t,!0),document.removeEventListener("keydown",e,!0)},ie()},stop(){pi?.(),pi=void 0,gi?.(),gi=void 0,ke(),Nt?.dispose(),Nt=void 0,Pf()}});var sc="filter:blur(6px)!important;transition:filter 0.2s ease",Qv=`:is(${s.sidebars})`,se="data-bloom-streamer-open",Of="[data-app-action-sidebar-thread-row], [data-app-action-sidebar-project-row], .bloom-recent-item",lc=":not([data-app-action-sidebar-thread-row] *, [data-app-action-sidebar-project-row] *)";function Rf(){return{conversations:{selectors:["[data-app-action-sidebar-thread-title]"],hover:!0,row:"[data-app-action-sidebar-thread-row]"},projects:{selectors:["[data-app-action-sidebar-project-label]"],hover:!0,row:"[data-app-action-sidebar-project-row]"},accountAvatar:{selectors:["[data-bloom-profile] img","[data-bloom-menu] img"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:[`[data-thread-title]${lc}`,`[data-thread-title-trigger]${lc}`],hover:!1}}}var cc=A({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function Hf(t,e){let o=[`:is(${t}):hover`,`.bloom-recent-item:hover :is(${t})`,`:is(${t})[${se}]`];return e&&o.push(`${e}:hover`,`${e}:hover :is(${t})`,`${e}:is(${t}):hover`,`${e}[${se}]`,`${e}[${se}] :is(${t})`),o.join(",")}function Df(){let t=Rf();return Object.entries(t).filter(([e])=>cc.store[e]).map(([,e])=>{let o=e.selectors.join(",");if(!e.hover)return`:is(${o}){${sc}}`;let n="row"in e?e.row:void 0;return`:is(${o}){${sc}}${Hf(o,n)}{filter:none!important}`}).join(`
`)}function Nf(t,e){for(let o of document.elementsFromPoint(t,e))if(o instanceof Element){let n=o.closest(Of);if(n)return n}return null}function qi(t){for(let e of document.querySelectorAll(`[${se}]`))e!==t&&e.removeAttribute(se);t&&!t.hasAttribute(se)&&t.setAttribute(se,"")}var Ie,Uf=Et(()=>{Ie&&qi(Nf(Ie.clientX,Ie.clientY))});function Ai(t){Ie=t,Uf()}function Ff(t){t.relatedTarget instanceof Node&&document.documentElement.contains(t.relatedTarget)||(Ie=void 0,qi(null))}var vi,kn,uc=g({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:cc,styles:Df,start(){vi=lt(),kn=new AbortController;let t={capture:!0,signal:kn.signal,passive:!0};document.addEventListener("pointerover",Ai,t),document.addEventListener("pointermove",Ai,t),document.addEventListener("pointerout",Ai,t),window.addEventListener("pointerleave",Ff,t)},stop(){kn?.abort(),kn=void 0,Ie=void 0,qi(null),vi?.(),vi=void 0}});var Ut=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)','[data-turn-key] [data-message-author-role="user"] blockquote:not(.twitter-tweet)','[class~="group/user-message"] blockquote:not(.twitter-tweet)'].join(","),xi=A({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function Gf(){let t=[`${Ut}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${Ut}>*{margin-block:0!important}`];return xi.store.italic||t.push(`${Ut}{font-style:inherit!important}`),xi.store.quotes||(t.push(`${Ut}{quotes:none!important}`),t.push(`${Ut}::before,${Ut}::after,${Ut} p::before,${Ut} p::after{content:none!important}`)),t.join(`
`)}var dc=g({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:xi,styles:Gf});var Kf=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],Yf=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",jf='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',mc=A({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function Wf(){let t=`${mc.store.width}rem`;return`:root,[data-app-action-timeline-scroll],[data-chatgpt-composer],[data-composer-input]{--thread-content-max-width:${t}!important;--composer-adjacent-max-width:${t}!important}`}var pc=g({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:mc,styles:Wf});var Qf=[za,xs,Bs,Os,Ds,Us,zs,nl,dl,gl,Il,Ol,Rl,Fl,zl,_l,oc,ac,uc,dc,pc],wi=Qf;var zf=new x("Bloom"),fc="2.0.89";var Si=0,Bn,Ao="__bloomOnShortcut";function In(t){if(t.isComposing||!t.shiftKey||!(t.metaKey||t.ctrlKey)||t.key!=="b"&&t.key!=="B")return;t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation();let e=Ra();Bt();for(let o of document.querySelectorAll("[data-bloom='settings']"))o.remove();e||fe()}function Vf(){let t=_;t[Ao]&&document.removeEventListener("keydown",t[Ao],!0),t[Ao]=In,document.addEventListener("keydown",In,!0)}function Jf(){Si++,document.removeEventListener("keydown",In,!0);let t=_;t[Ao]===In&&delete t[Ao],Bn?.(),Bn=void 0,aa(),Re(),xo()}async function Ei(){let t=++Si,e=()=>t===Si;Re(),xo();for(let o of wi)o.updatedAt=wa[o.name];$i(wi),Vi(),vo("base",la),qa(),Vf(),Io("Init"),Vn().then(()=>{e()&&(Di(),Io("DOMContentLoaded"))}),await Jn(),e()&&(Io("HostReady"),Bn?.(),Bn=Na(),ia(),zf.info(`Bloom++ ${fc} app host ready`))}var Zf=new x("Boot");window===window.top&&(Ui(_.Bloom),Fi(Ti),Ei().catch(t=>Zf.error("Startup failed",t)));})();
