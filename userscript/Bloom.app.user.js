// ==UserScript==
// @name         Bloom++ (ChatGPT app)
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.85
// @description  Bloom++ host for the official ChatGPT macOS app. Injected over loopback CDP; not a web userscript.
// @author       0-V-linuxdo & Bloom contributors
// @homepageURL  https://github.com/0-V-linuxdo/Bloom
// @supportURL   https://github.com/0-V-linuxdo/Bloom/issues
// @match        app://*/*
// @run-at       document-start
// @grant        none
// @license      GPL-3.0-or-later
// ==/UserScript==

/* Bloom++ v2.0.85 ChatGPT app host. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var jl=Object.defineProperty;var Ql=(t,e)=>{for(var o in e)jl(t,o,{get:e[o],enumerable:!0})};var x=class{constructor(e){this.tag=e}log(e,o){console[e](`[Bloom++] [${this.tag}]`,...o)}debug(...e){this.log("debug",e)}info(...e){this.log("info",e)}warn(...e){this.log("warn",e)}error(...e){this.log("error",e)}};var $=(t,e,o)=>Math.min(o,Math.max(e,t)),R=t=>typeof t=="object"&&t!==null&&!Array.isArray(t),di=t=>`${t}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,et=(t,e)=>t.length>e?`${t.slice(0,e-1)}\u2026`:t,h=t=>t.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function mi(t,e){return`${t} ${e}${t===1?"":"s"}`}async function pi(t){if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}await navigator.clipboard.writeText(t)}function fi(t){try{return JSON.parse(t)}catch{return}}var ne=typeof unsafeWindow>"u"?window:unsafeWindow;var ui={};Ql(ui,{VERSION:()=>Gl,init:()=>ci,plugins:()=>ct});var Wl=new x("Styles"),ke=new Map,gi=new Set,Ie=new Map,xn=!0;function hi(){let t=document.adoptedStyleSheets.filter(e=>!gi.has(e));document.adoptedStyleSheets=[...t,...ke.values()]}function bi(t){document.readyState==="loading"||t.parentNode===document.head||document.head.append(t)}function zl(t,e){let o=Ie.get(t);o||(o=document.createElement("style"),o.id=`bloom-style-${t}`,Ie.set(t,o)),o.textContent!==e&&(o.textContent=e),bi(o)}function mo(t,e){if(xn)try{let o=ke.get(t);o||(o=new ne.CSSStyleSheet,ke.set(t,o),gi.add(o)),o.replaceSync(e),hi();return}catch(o){Wl.warn("Constructed style sheets unavailable, using <style> after parsing",o),xn=!1,ke.delete(t)}zl(t,e)}function wn(t){ke.delete(t)&&xn&&hi(),Ie.get(t)?.remove(),Ie.delete(t)}function yi(){for(let t of Ie.values())bi(t)}var k=t=>(...e)=>e.map(o=>t+o).join(" "),po=(...t)=>t.filter(Boolean).join(" "),bt=t=>t.length?`${t.map(e=>`${e}:not([data-bloom])`).join(",")}{display:none!important}`:"";function g(t){return t}var Vl=new x("Storage");function Ai(t){try{return localStorage.getItem(t)??void 0}catch{return}}function vi(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch(o){Vl.warn("localStorage write failed",o)}}function qi(t,e){addEventListener("storage",o=>{o.key===t&&e(o.newValue)})}var Sn="BloomSettings",Jl=100,re={plugins:{}},fo=new Set,En=new Set,Be;function xi(t){let e=t;for(let o=0;typeof e=="string"&&o<2;o++)e=fi(e);return!R(e)||!R(e.plugins)||!Object.keys(e.plugins).length?null:e}function wi(){let t=xi(Ai(Sn));t&&(re.plugins=t.plugins)}var Si=(t,e)=>`${t}
${e}`;function Ei(){Be=void 0,En.clear(),vi(Sn,re)}function Zl(t){let e=xi(t);if(!e)return;let o=[];for(let n of new Set([...Object.keys(re.plugins),...Object.keys(e.plugins)])){let r=re.plugins[n]??={},i=R(e.plugins[n])?e.plugins[n]:{};for(let a of new Set([...Object.keys(r),...Object.keys(i)]))En.has(Si(n,a))||JSON.stringify(r[a])===JSON.stringify(i[a])||(i[a]===void 0?delete r[a]:r[a]=i[a],o.push([n,a]))}for(let[n,r]of o)for(let i of fo)i(n,r)}function Xl(){Be&&(clearTimeout(Be),Ei())}var Bt=(t,e)=>re.plugins[t]?.[e];function Pt(t,e,o){let n=re.plugins[t]??={};o===void 0?delete n[e]:n[e]=o,En.add(Si(t,e)),clearTimeout(Be),Be=setTimeout(Ei,Jl);for(let r of fo)r(t,e)}function ie(t){return fo.add(t),()=>void fo.delete(t)}function Tn(t){return t.type==="component"?void 0:t.default}function y(t){let e={def:t,pluginName:"",store:new Proxy({},{get:(o,n)=>Bt(e.pluginName,n)??(t[n]&&Tn(t[n])),set:(o,n,r)=>(Pt(e.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(t))t[o].type!=="custom"&&Bt(e.pluginName,o)!==void 0&&Pt(e.pluginName,o)}};return e}var Ti=t=>{let e=()=>{let o=Bt("Settings",t);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>e().includes(o),list:e,toggle(o){let n=e();Pt("Settings",t,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},go=Ti("pinnedPlugins"),ho=Ti("starredPlugins");addEventListener("pagehide",Xl);qi(Sn,Zl);var bo=new x("PluginManager"),ct=new Map,ae=new Set,Ln=new Set,Mn=new Set;function Mi(t){for(let e of t)e.settings&&(e.settings.pluginName=e.name),ct.set(e.name,e)}var yt=t=>!!t.required||(Bt(t.name,"enabled")??!!t.enabledByDefault),kn=t=>ae.has(t),Cn=t=>`plugin-${t.name}`;function Ci(t){if(!t.styles)return;let e=typeof t.styles=="function"?t.styles():t.styles;e?mo(Cn(t),e):wn(Cn(t))}function In(t){if(!ae.has(t.name))try{Ci(t),t.start?.(),ae.add(t.name)}catch(e){bo.error(`Failed to start ${t.name}`,e)}}function Li(t){if(ae.delete(t.name)){wn(Cn(t));try{t.stop?.()}catch(e){bo.error(`Failed to stop ${t.name}`,e)}}}var Bn=t=>t.startAt??"HostReady";function yo(t){Ln.add(t);for(let e of ct.values())Bn(e)===t&&yt(e)&&In(e);bo.info(`${t}: ${[...ae].join(", ")}`)}function ki(t){Li(t)}function Ii(t){yt(t)&&Ln.has(Bn(t))&&In(t)}function Bi(t,e){Pt(t.name,"enabled",e),e?Ln.has(Bn(t))&&In(t):Li(t);for(let o of Mn)o()}function Pi(t){return Mn.add(t),()=>void Mn.delete(t)}ie((t,e)=>{let o=ct.get(t);if(!(!o||e==="enabled"||!ae.has(t)))try{Ci(o),o.onSettingsChange?.(e)}catch(n){bo.error(`Settings change failed for ${t}`,n)}});var Oi=`/*
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
`;var _l=new x("Dom");function s(t,e={},...o){let n=document.createElement(t);e.class&&(n.className=e.class),e.text!=null&&(n.textContent=e.text),e.title&&(n.title=e.title);for(let[r,i]of Object.entries(e.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(e.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var Ri=document.createElement("template");function Hi(t){return Ri.innerHTML=t.trim(),Ri.content.firstElementChild.cloneNode(!0)}var At=t=>t instanceof HTMLElement&&t.isConnected&&t.getClientRects().length>0&&!t.closest("[inert]"),ot=(t,e=document)=>[...e.querySelectorAll(t)].find(At)??null,tc=16,ec="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function Di(t,e){let o=setInterval(t,e),n;try{n=new Worker(URL.createObjectURL(new Blob([ec],{type:"text/javascript"}))),n.addEventListener("message",t),n.postMessage(e)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function Pn(t){document.hidden?setTimeout(t,tc):requestAnimationFrame(t)}function vt(t){let e=!1;return()=>{e||(e=!0,Pn(()=>{e=!1;try{t()}catch(o){_l.error("Scheduled task failed",o)}}))}}var Ao=new Set,vo=[],Pe,oc=vt(()=>{let t=vo;vo=[];for(let e of Ao)e(t)});function T(t){return Ao.add(t),Pe||(Pe=new MutationObserver(e=>{vo.push(...e),oc()}),Pe.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),t([]),()=>{Ao.delete(t),!Ao.size&&(Pe?.disconnect(),Pe=void 0,vo=[])}}var nc=t=>t instanceof Element&&(t.hasAttribute("data-bloom")||!!t.closest("[data-bloom]")),H=t=>!t.length||t.some(e=>!nc(e.target)),rc=t=>`"${t.replaceAll("\\","\\\\").replaceAll('"','\\"').replaceAll(`
`,"\\A ")}"`;function Ot(t,e){if(e==null){t.removeAttribute("data-bloom-text"),t.style.removeProperty("--bloom-text-size"),t.style.removeProperty("--bloom-text");return}t.style.setProperty("--bloom-text",rc(e)),t.getAttribute("data-bloom-text")!==e&&t.setAttribute("data-bloom-text",e)}var ic=new x("Events");function se(){let t=new Map;return{on(e,o){let n=t.get(e);return n||t.set(e,n=new Set),n.add(o),()=>void n.delete(o)},emit(e,o){for(let n of t.get(e)??[])try{n(o)}catch(r){ic.error(`Listener for ${String(e)} failed`,r)}}}}function Ni(t,e){let o=t instanceof Element?[t,...t.querySelectorAll("*")]:[...t.querySelectorAll("*")];for(let n of o){let r=n.shadowRoot;r&&(e(r),Ni(r,e))}}function qt(t,e=document){let o=[...e.querySelectorAll(t)];return Ni(e,n=>o.push(...n.querySelectorAll(t))),o}var tt=(t,e=document)=>qt(t,e).find(At)??null;var l={rail:"[data-app-navigation-rail]",sidebarScroll:"[data-app-action-sidebar-scroll]",sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"[data-app-action-sidebar-scroll]",oldRail:"[data-app-navigation-rail]",oldProfile:'button[aria-label="Open profile menu" i]',threadRow:"[data-app-action-sidebar-thread-row]",threadSelected:"[data-app-action-sidebar-thread-row][data-app-action-sidebar-thread-selected='true']",threadTitle:"[data-app-action-sidebar-thread-title]",projectRow:"[data-app-action-sidebar-project-row]",projectLabel:"[data-app-action-sidebar-project-label]",destination:"[data-sidebar-destination]",conversationLink:"[data-app-action-sidebar-thread-row]",timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:"[data-turn-key]",turn:"[data-turn-key]",messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",userBubble:'[class~="group/user-message"]',assistantReply:"[data-response-annotation-target]",oldThread:"[data-app-action-timeline-scroll]",turnActions:'.turn-action-controls, [class*="turn-action-controls"]',readAloud:'button:is([aria-label="Read aloud" i], [aria-label^="Read aloud" i], [aria-label="Stop reading" i], [aria-label^="Stop reading" i], [aria-label="\u6717\u8BFB"], [aria-label^="\u6717\u8BFB"], [aria-label="\u505C\u6B62\u6717\u8BFB"], [data-testid*="read-aloud" i])',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery, [class*='recovery']",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composer:"[data-chatgpt-composer], [data-composer-input]",composerInput:'[data-composer-input] [contenteditable="true"].ProseMirror, [contenteditable="true"].ProseMirror',composerConversation:"[data-above-composer-conversation-id]",oldComposerForm:"[data-chatgpt-composer]",sendButton:'button[aria-label="Send" i], button[aria-label="Send prompt" i], button[aria-label="Send message" i]',stopButton:'button[aria-label="Stop" i], button[aria-label^="Stop " i], button[aria-label="\u505C\u6B62" i], button[aria-label^="\u505C\u6B62"]',composerFooter:"[data-chatgpt-composer]",modelTrigger:'button[aria-label="Model selector" i], button[aria-label="Select ChatGPT model" i], [data-chatgpt-composer] button[aria-haspopup="menu"]',modelItem:'[role="menu"] [role="menuitemradio"], [role="menu"] [role="menuitem"]',effortSlider:'[role="menu"] [data-reasoning-slider]',homeHeading:'main h1:not([aria-hidden="true"]), [role="main"] h1:not([aria-hidden="true"]), [data-testid="home-heading"], [data-homepage-takeover] h1, .heading-xl, [class~="heading-xl"]',headerMore:'button[aria-label="More" i], button[aria-label="\u66F4\u591A"]',headerTitle:"[data-thread-title], [data-thread-title-trigger]",profile:'button[aria-label="Open profile menu" i]'};var Ui=/[​-‍﻿]/g,ut=()=>tt(l.composerInput),Oe=t=>t instanceof HTMLElement&&t.matches(l.composerInput),J=(t=ut())=>t?.closest("form")??t?.closest(l.composer)??tt(l.composer);function U(t=ut()){if(!t)return"";if(t instanceof HTMLTextAreaElement)return t.value.replace(Ui,"").trim();let e=t.cloneNode(!0);for(let n of e.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...e.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:e.textContent??"").replace(Ui,"").trim()}var ac=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function Fi(t,e){let o=e?"insertText":"deleteContentBackward";t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:o,data:e||null})),t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:o,data:e||null}))}function xt(t,e=ut()){if(!e)return!1;if(e.focus(),e instanceof HTMLTextAreaElement)return ac?.call(e,t),e.dispatchEvent(new Event("input",{bubbles:!0})),e.setSelectionRange(t.length,t.length),!0;let o=getSelection();return o?.selectAllChildren(e),typeof document.execCommand=="function"?t?document.execCommand("insertText",!1,t):document.execCommand("delete"):Fi(e,t),U(e)!==t.trim()&&Fi(e,t),o?.selectAllChildren(e),o?.collapseToEnd(),!0}function Gi(t,e){let o=t;for(;o&&o!==e;){if(o instanceof HTMLElement&&o.parentElement===e)return o;o=o.parentNode}return null}function Ki(t,e,o){let n=document.createRange();return n.selectNodeContents(t),o?n.setEnd(e.startContainer,e.startOffset):n.setStart(e.endContainer,e.endOffset),n.toString().includes(`
`)?!0:!!n.cloneContents().querySelector("br")}function Yi(t){if(t instanceof HTMLTextAreaElement){let{selectionStart:A,selectionEnd:C,value:p}=t;return{first:!p.slice(0,A).includes(`
`),last:!p.slice(C).includes(`
`)}}let e=getSelection();if(!e?.rangeCount||!t.contains(e.anchorNode))return{first:!0,last:!0};let o=e.getRangeAt(0),n=[...t.children].filter(A=>A instanceof HTMLElement),r=Gi(o.startContainer,t),i=Gi(o.endContainer,t),a=!r||r===n[0],d=!i||i===n[n.length-1],c=o.getBoundingClientRect(),u=(r??t).getBoundingClientRect(),m=Number.parseFloat(getComputedStyle(r??t).lineHeight)||24;return c.height?{first:a&&c.top-u.top<m,last:d&&u.bottom-c.bottom<m}:{first:a&&!Ki(r??t,o,!0),last:d&&!Ki(i??t,o,!1)}}var ji=t=>{let e=J();return(e&&tt(t,e))??tt(t)},On=()=>ji(l.stopButton),sc=()=>{let t=ji(l.sendButton);return t&&!t.matches(l.stopButton)?t:null};function Qi(){let t=sc();if(t){t.disabled||t.click();return}ut()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var Wi=()=>At(On());var qo=new x("AppProtocol"),Re=se();function lc(t){let e=t;if(typeof e=="string")try{e=JSON.parse(e)}catch{return null}if(Array.isArray(e)||!e||typeof e!="object")return null;let o=e,n=o.notification&&typeof o.notification=="object"?o.notification:o;if(typeof n.method!="string")return null;let r=n.params&&typeof n.params=="object"?n.params:void 0;return{method:n.method,params:r}}function He(t){if(Array.isArray(t)){for(let o of t)He(o);return}let e=lc(t);e&&Re.emit("note",e)}var Hn=new WeakMap,Rn=new WeakMap;function cc(t,e){let o=Hn.get(t);if(o)return o;let n=r=>{He(r.data),typeof t=="function"?t.call(e,r):t.handleEvent(r)};return Hn.set(t,n),n}function uc(){let t=MessagePort.prototype,e=t.addEventListener,o=t.removeEventListener;t.addEventListener=function(r,i,a){return r!=="message"?e.call(this,r,i,a):e.call(this,r,cc(i,this),a)},t.removeEventListener=function(r,i,a){return r!=="message"?o.call(this,r,i,a):o.call(this,r,Hn.get(i)??i,a)};let n=Object.getOwnPropertyDescriptor(t,"onmessage");n?.set&&Object.defineProperty(t,"onmessage",{configurable:!0,enumerable:n.enumerable,get(){return Rn.has(this)?Rn.get(this):n.get?.call(this)},set(r){Rn.set(this,r),n.set.call(this,function(a){He(a.data),r?.call(this,a)})}})}function dc(){let t=window.electronBridge,e=t?.subscribeToWorkerMessages;if(!(!t||typeof e!="function"))try{t.subscribeToWorkerMessages=(o,n)=>e.call(t,o,r=>{He(r),n(r)})}catch(o){qo.warn("electronBridge.subscribeToWorkerMessages is not writable",o)}}function mc(){addEventListener("message",t=>He(t.data));try{uc()}catch(t){qo.warn("MessagePort wrap failed",t)}try{dc()}catch(t){qo.warn("electronBridge wrap failed",t)}qo.info("Listening for app-server notifications")}mc();var pc=new x("AppRoute"),fc=500,wo=new Set,So=null,xo;function b(){return(tt(l.threadSelected)??qt(l.threadSelected)[0])?.getAttribute("data-app-action-sidebar-thread-id")??null}var Eo=()=>!b(),Vi=()=>!1,Rt=()=>!1;function zi(){let t=b();if(t===So)return;let{href:e}=location,o={prevHref:e,href:e,prevId:So,id:t};So=t;for(let n of wo)try{n(o)}catch(r){pc.error("Route listener failed",r)}}function gc(){let t=new MutationObserver(zi);(()=>{document.body&&t.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-app-action-sidebar-thread-selected","data-app-action-sidebar-thread-id"]})})();let o=setInterval(zi,fc);return()=>{t.disconnect(),clearInterval(o)}}function nt(t){return wo.add(t),xo||(So=b(),xo=gc()),()=>{wo.delete(t),!wo.size&&(xo?.(),xo=void 0)}}var hc=250,bc=400,P=se(),Ht=!1,le=null,Ut=!1,Dt="done",Nt=!1,Ji=!1,z=()=>({generating:Ht,conversationId:b()}),yc=t=>{if(!t)return!0;let e=b();return e?e===t||e.endsWith(t)||t.endsWith(e.replace(/^local:/,"")):!0};function Ac(t){return t==="interrupted"||t==="aborted"||t==="cancelled"?"stopped":t==="failed"||t==="error"?"error":"done"}function vc(){return Nt||Wi()}function qc(t){le=null,Ht=!1,Nt=!1,P.emit("fall",{conversationId:b(),outcome:t}),Ut=!1,Dt="done"}function xc(){let t=vc();t&&!Ht&&(Ht=!0,Ut=!1,Dt="done",P.emit("rise",{conversationId:b()})),t||!Ht?le=null:le==null?le=Date.now():Date.now()-le>=bc&&qc(Ut?"stopped":Dt)}function De(){xc(),P.emit("tick",z())}function wc({prevId:t,id:e}){t!==e&&(Ht&&(Nt=!1,le=null,Ht=!1,Ut=!1,Dt="done",P.emit("fall",{conversationId:t,outcome:"left"})),P.emit("context",{prevId:t,id:e,migrated:!t&&!!e}),De())}function Sc(t){if(yc(t.params?.threadId)){if(t.method==="turn/started"){Nt=!0,De();return}if(t.method==="turn/interrupt"){Nt=!1,Dt="stopped",Ut=!0,De();return}t.method==="turn/completed"&&(Nt=!1,Dt=Ac(t.params?.turn?.status),Dt==="stopped"&&(Ut=!0),De())}}function Ec(t){t.target instanceof Element&&t.target.closest(l.stopButton)&&(Ut=!0,Nt=!1)}function Zi(){Ji||(Ji=!0,Re.on("note",Sc),nt(wc),document.addEventListener("click",Ec,!0),Di(De,hc))}var Tc="__reactContainer$",Xi="__reactFiber$";function Nn(){return document.readyState!=="loading"?Promise.resolve():new Promise(t=>document.addEventListener("DOMContentLoaded",()=>t(),{once:!0}))}var Dn=(t,e)=>Object.keys(t.wrappedJSObject??t).some(o=>o.startsWith(e)),rt=t=>!Dn(document,Tc)||Dn(t,Xi);function wt(){return document.body?Promise.resolve():new Promise(t=>{let e=new MutationObserver(()=>{document.body&&(e.disconnect(),t())});e.observe(document,{childList:!0,subtree:!0})})}async function Un(){await wt();let t=Date.now()+8e3;for(;!Dn(document.body,Xi)&&Date.now()<t;)await new Promise(e=>setTimeout(e,100))}var $i={BetterNavigator:1792014624e3,BetterQuotes:179333264e4,ChatListStatus:179333264e4,ChatStateFavicons:1790623094e3,Cleaner:1793267811e3,ComposerOpacity:1793344667e3,Continue:1790939902e3,CustomSidebarIdentity:1790658669e3,GreetingCustomizer:1792014624e3,InputHistory:179333264e4,MessageTimestamps:1791080494e3,NoDictation:1793335268e3,NoShareLink:1790658669e3,NoSidebarIdentity:1790616549e3,PromptQueue:1793267321e3,RecentTopics:179333264e4,ResponseNotification:1790661368e3,Settings:1793346432e3,SidebarIdentityOpacity:1790682605e3,StarChats:1793346432e3,StreamerMode:1793344667e3,TemporaryChat:1792014624e3,UserQuotes:1793345744e3,WiderChat:179333264e4};var v=t=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`,Mc="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",Cc={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${Mc}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:v('<path d="M18 6 6 18M6 6l12 12"/>'),gear:v('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:v('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:v('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:v('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:v('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:v('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:v('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:v('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:v('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:v('<path d="m6 9 6 6 6-6"/>'),play:v('<path d="M7 4v16l13-8z"/>'),plus:v('<path d="M12 5v14M5 12h14"/>'),check:v('<path d="m5 12 5 5 9-10"/>'),alert:v('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:v('<path d="M4 5h16v11H9l-5 4z"/>'),layout:v('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:v('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:v('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:v('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:v('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:v('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:v('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:v('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:v('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:v('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:v('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:v('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:v('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:v('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:v('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:v('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),ghost:v('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},F=t=>Hi(Cc[t]);var Gt="data-bloom-tip",Fn=6,Gn=8,Ft,_i=null;function ce(t){if(t===_i)return;if(_i=t,!t){Ft?.remove();return}Ft??=s("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),Ft.textContent=t.getAttribute(Gt),document.body.append(Ft);let e=t.getBoundingClientRect(),{width:o,height:n}=Ft.getBoundingClientRect(),r=e.bottom+Fn+n<=innerHeight-Gn;Ft.style.left=`${$(e.left+e.width/2-o/2,Gn,innerWidth-o-Gn)}px`,Ft.style.top=`${r?e.bottom+Fn:e.top-Fn-n}px`}var ta=t=>t instanceof Element?t.closest(`[${Gt}]`):null;function ea(){let t=new AbortController,e={passive:!0,signal:t.signal};return document.addEventListener("pointerover",o=>ce(ta(o.target)),e),document.addEventListener("pointerout",o=>o.relatedTarget||ce(null),e),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&ce(ta(o.target)),e),document.addEventListener("focusout",()=>ce(null),e),document.addEventListener("pointerdown",()=>ce(null),e),()=>{t.abort(),ce(null)}}function Kn(t,e,o,n=!1){let r=s("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(t),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let a=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(a)),e(a)}),r}function G(t,e,o){return s("button",{class:po("bloom-button",o&&`bloom-button-${o}`),text:t,attrs:{type:"button","data-bloom":"control"},on:{click:e}})}function Z(t,e,o,n){let r=s("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":e,"data-bloom":"control",[Gt]:e},on:{click:o}},F(t));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function To(t,e,o,n,r,i){let a=s("input",{attrs:{type:"range",min:String(e),max:String(o),step:String(n)}});a.value=String(t);let d=s("output",{text:`${a.value}${r}`});return a.addEventListener("input",()=>{d.textContent=`${a.value}${r}`,i(Number(a.value))}),s("div",{class:"bloom-slider"},a,d)}function Yn(t,e,o){let n=s("select",{class:"bloom-select"},...e.map(r=>s("option",{text:r.label,attrs:{value:r.value}})));return n.value=t,n.addEventListener("change",()=>o(n.value)),n}function Ne(t,e,o="",n="text"){let r=s("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=t,r.addEventListener("change",()=>e(r.value)),r}var Lc=new x("SettingsPanel"),f=k("bloom-settings-"),kc=10080*60*1e3,Ic=3e3,oa="Toggle features. Some need a reload. Click the sliders icon to configure.",Bc=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Pc=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],Oc={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},ra=new Set(["chat","ui","privacy"]),Y=null,Yt="all",jn="all",Mo="",Qn=[],ia=()=>[...ct.values()].filter(t=>!t.hidden),Rc=t=>!!t.updatedAt&&Date.now()-t.updatedAt<kc;function Hc(t){switch(Yt){case"favorites":return ho.has(t.name);case"recent":return Rc(t);case"all":return!0;case"other":return!t.tags.some(e=>ra.has(e));case"chat":case"ui":case"privacy":return t.tags.includes(Yt)}}function Dc(t){switch(jn){case"all":return!0;case"enabled":return yt(t);case"disabled":return!yt(t)}}function Nc(t){let e=Mo.trim().toLowerCase();return!e||[t.name,t.description,...t.tags].some(o=>o.toLowerCase().includes(e))}function Uc(t){let e=go.list(),o=n=>e.includes(n.name)?e.indexOf(n.name):e.length;return Yt==="recent"?t.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):t.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var aa=t=>t.settings?.def??{},Fc=t=>Object.values(aa(t)).some(e=>e.type!=="custom");function Gc(t,e,o){let n=Bt(t.name,e)??Tn(o),r=i=>Pt(t.name,e,i);switch(o.type){case"boolean":return Kn(n,r,o.description??e);case"slider":return To(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return Yn(n,o.options,r);case"string":return Ne(n,r,o.placeholder);case"number":return Ne(String(n),i=>r(Number(i)),"","number");case"component":{let i=s("div",{class:f("component")});return Qn.push(o.render(i)),i}case"custom":return null}}var Kc=t=>t.replaceAll(/([A-Z])/g," $1").replace(/^./,e=>e.toUpperCase());function sa(t){if(!Y)return;let e=Object.entries(aa(t)).filter(([,i])=>i.type!=="custom").map(([i,a])=>{let d=Gc(t,i,a),c=a.type==="boolean",u=a.type!=="component"&&s("div",{class:f("field-label"),text:Kc(i)}),m=a.description&&s("div",{class:f("field-desc"),text:a.description});return s("div",{class:f("field",c?"field-inline":"field-stacked")},(u||m)&&s("div",{class:f("field-text")},u,m),d)}),o,n=G("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},Ic);return}clearTimeout(o),t.settings?.reset(),Ue(),sa(t)},"danger"),r=s("div",{class:f("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&Ue()}},s("div",{class:f("popup"),attrs:{role:"dialog","aria-label":`${t.name} settings`}},s("div",{class:f("popup-header")},s("div",{class:f("card-icon")},F(t.icon)),s("div",{class:f("popup-title")},s("div",{class:f("card-name"),text:t.name}),s("div",{class:f("popup-authors"),text:t.authors.join(", ")})),Z("close","Close",Ue)),s("p",{class:f("popup-desc"),text:t.description}),s("div",{class:f("fields")},...e),s("div",{class:f("popup-footer")},n)));Y.querySelector(`.${f("modal")}`)?.append(r)}function Ue(){for(let t of Qn)t();Qn=[],Y?.querySelector(`.${f("popup-backdrop")}`)?.remove()}function na(t){let e=yt(t),o=ho.has(t.name),n=go.has(t.name),r=!!t.required;return s("div",{class:[f("card",e?"card-on":"card-off"),r?f("card-required"):""].filter(Boolean).join(" ")},s("div",{class:f("card-top")},s("div",{class:f("card-icon")},F(t.icon)),s("div",{class:f("card-actions")},Z("star",o?"Unstar":"Star",()=>{ho.toggle(t.name),Kt()},o),r?null:Z("pin",n?"Unpin":"Pin to top",()=>{go.toggle(t.name),Kt()},n),r?s("span",{class:f("required-mark"),attrs:{"aria-label":"Required",[Gt]:"This plugin is required for Bloom++ to work"}},F("alert")):null,Fc(t)&&Z("gear","Settings",()=>sa(t)),Kn(e,i=>Bi(t,i),r?`${t.name} is required`:`Enable ${t.name}`,r))),s("div",{class:f("card-name"),text:t.name}),s("div",{class:f("card-desc"),text:t.description,title:t.description}),s("div",{class:f("card-footer"),text:t.authors.join(", ")}))}function la(){let t=ia().some(o=>!o.tags.some(n=>ra.has(n)));Y?.querySelector(`.${f("tabs")}`)?.replaceChildren(...Bc.filter(o=>o.id!=="other"||t).map(o=>s("button",{class:f("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===Yt)},on:{click:()=>{Yt=o.id,la(),Kt()}}})))}function Kt(){if(!Y)return;let t=ia().filter(Hc),e=Y.querySelector(`.${f("search")} input`);e&&(e.placeholder=`Search ${mi(t.length,"plugin")}...`);let o=Uc(t.filter(u=>Nc(u)&&Dc(u))),n=Yt==="all",r=n?o.filter(u=>!u.required):o,i=n?o.filter(u=>u.required):[],a=[...r.map(na),...i.length?[s("div",{class:f("required-break"),attrs:{role:"separator"}}),...i.map(na)]:[]],d=Mo.trim()?"No plugins match your search.":Oc[Yt]??"No plugins available.";Y.querySelector(`.${f("grid")}`)?.replaceChildren(...a.length?a:[s("div",{class:f("empty"),text:d})])}function Yc(t){t.key==="Escape"&&(t.preventDefault(),t.stopPropagation(),Y?.querySelector(`.${f("popup-backdrop")}`)?Ue():ue())}var ca,Wn;function jc(){if(Y)return;let t=s("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});t.value=Mo,t.addEventListener("input",()=>{Mo=t.value,Kt()}),Y=s("div",{class:`bloom-root ${f("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:e=>e.target===e.currentTarget&&ue()}},s("div",{class:f("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},s("div",{class:f("header")},s("div",{class:f("logo")},F("bloom")),s("h2",{class:f("title"),text:"Bloom++"}),s("span",{class:f("hint"),attrs:{"aria-label":oa,tabindex:"0",[Gt]:oa}},F("info")),s("span",{class:f("version"),text:"v2.0.85"}),Z("close","Close",ue)),s("div",{class:f("tabs"),attrs:{role:"tablist"}}),s("div",{class:f("toolbar")},s("label",{class:f("search")},F("search"),t),Yn(jn,Pc,e=>{jn=e,Kt()})),s("div",{class:f("grid")}))),Y.addEventListener("keydown",e=>e.stopPropagation()),Wn=new AbortController,document.addEventListener("keydown",Yc,{capture:!0,signal:Wn.signal}),document.body.append(Y),la(),Kt(),ca=Pi(Kt),t.focus(),Lc.debug("Opened")}function ue(){Ue(),Wn?.abort(),ca?.(),Y?.remove(),Y=null}var de=()=>Y?ue():jc();var ua=new x("AppLandmarks"),Qc={Settings:[l.rail],WiderChat:[":root"],StreamerMode:[l.sidebarScroll,l.rail],ComposerOpacity:[l.composer,l.composerInput],ResponseNotification:[l.composerInput],InputHistory:[l.composerInput],Continue:[l.composerInput],ChatListStatus:[l.sidebarScroll],StarChats:[l.turn],BetterNavigator:[l.timelineScroll,l.turn],BetterQuotes:[l.turn],MessageTimestamps:[l.turn],RecentTopics:[l.sidebarScroll]};function da(){for(let[t,e]of Object.entries(Qc)){let o=ct.get(t);if(!o||o.required||!yt(o))continue;if(!e.some(r=>tt(r))){if(!kn(o.name))continue;ki(o),ua.warn(`${t} paused; missing ${e.join(", ")}`);continue}kn(o.name)||(Ii(o),ua.info(`${t} resumed`))}}function ma(){return da(),T(()=>da())}var Dg=new x("Route"),Wc=/\/c\/(?!local-)([\w-]+)/;var zc=()=>location.pathname.match(Wc)?.[1]??null;var Ng=location.href,Ug=zc();var Vc=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,Jc=/\S+@\S+\.\S+/,Zc=3;var Xc=t=>!!t.closest(".sr-only");function $c(t){return[...t.querySelectorAll("*")].filter(e=>!e.children.length&&!e.closest("[data-bloom]")&&!!h(e.textContent??"")&&!(e instanceof SVGElement))}var _c=t=>{if(/rounded-full/.test(t.getAttribute("class")??""))return!0;if(!t.clientWidth)return!1;let{borderRadius:e}=getComputedStyle(t);return e.includes("%")||Number.parseFloat(e)>=t.clientWidth/2};function Co(t,e,o){for(let n of t.querySelectorAll(`[${e}]`))n!==o&&n.removeAttribute(e);o&&!o.hasAttribute(e)&&o.setAttribute(e,"")}function tu(t,e){if(h(t.textContent??"").length>Zc)return null;let o=t.closest("button");for(let n=t;n&&n!==e&&n!==o;n=n.parentElement)if(_c(n))return n;return null}function Lo(t,e){t.hasAttribute(`data-bloom-${e}`)||t.setAttribute(`data-bloom-${e}`,"");let o=t.querySelector("img:not([data-bloom] img)"),n=$c(t),r=o?null:n.map(m=>tu(m,t)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),a=(i&&i!==t&&t.contains(i)?i:o??r)??t.querySelector("[class*=rounded-full]:not([data-bloom] *)");Co(t,`data-bloom-${e}-avatar`,a);let d=n.filter(m=>!a?.contains(m)&&!Xc(m)),c=d.find(m=>Vc.test(h(m.textContent??""))),u=d.find(m=>Jc.test(m.textContent??""));Co(t,`data-bloom-${e}-plan`,c),Co(t,`data-bloom-${e}-email`,u),Co(t,`data-bloom-${e}-name`,d.find(m=>m!==c&&m!==u))}var pa=()=>qt(l.rail).filter(At);function fa(t){return tt(l.profile,t)??[...t.querySelectorAll(l.menuButton)].findLast(At)??null}function eu(t,e){return[...t.children].find(n=>n instanceof HTMLElement&&n!==e&&n.contains(e))??e}function ga(){return pa().flatMap(t=>{let e=fa(t);if(!e)return[{kind:"rail",anchor:t,insert:n=>t.append(n)}];let o=eu(t,e);return[{kind:"rail",anchor:o,insert:n=>(o===e?t:o).append(n)}]})}var zn=()=>pa().map(fa).filter(t=>t!=null);function ou(t){let e=t.getAttribute("aria-expanded")==="true"&&t.getAttribute("aria-controls"),o=e?document.getElementById(e):null;return o?.matches('[role="menu"]')?o:null}function ko(){return zn().map(ou).find(t=>t!=null)??qt('[role="menu"]').find(t=>!t.closest("[data-bloom]")&&/log ?out|sign out|退出/i.test(t.textContent??""))??null}var Fe=t=>qt(l.threadRow).filter(e=>e.getAttribute("data-app-action-sidebar-thread-id")===t);function Ge(t){let e=Fe(t)[0]??qt(l.threadRow).find(n=>{let r=n.getAttribute("data-app-action-sidebar-thread-id")??"";return r.endsWith(t)||t.endsWith(r.replace(/^local:/,""))});return(e?.getAttribute("data-app-action-sidebar-thread-title")??h(e?.textContent??""))||null}function ha(t){return null}var Vn=0,Io;function nu(t){if(!H(t))return;for(let o of zn())Lo(o,"profile");let e=ko();e&&Lo(e,"menu")}function it(){Vn++;let t=!0;return wt().then(()=>{t&&Vn&&!Io&&(Io=T(nu))}),()=>{t&&(t=!1,!--Vn&&(Io?.(),Io=void 0))}}var ba=`/*
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
`;var St=k("bloom-entry-"),iu=4,Jn="--bloom-entry-x",Zn=1,me=y({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar. The account menu and the userscript menu always open the panel.",default:!1},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:!0},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:t=>(t.append(G("Reset position",()=>{me.store.entryPosition=Zn})),()=>t.replaceChildren())},entryPosition:{type:"custom",default:Zn}}),jt=new Map,ya=!1,Aa=[];function au(t,e,o){let n=t.currentTarget,r=e.clientWidth-n.offsetWidth;if(t.button!==0||r<=0||!e.classList.contains(St("hover")))return;let i=me.store.entryPosition,a=i,d=!1,c=new AbortController;n.setPointerCapture(t.pointerId),n.addEventListener("pointermove",m=>{!d&&Math.abs(m.clientX-t.clientX)<iu||(d=!0,o(),a=$(i+(m.clientX-t.clientX)/r,0,Zn),e.style.setProperty(Jn,String(a)))},{signal:c.signal});let u=()=>{c.abort(),d&&(me.store.entryPosition=a,e.style.removeProperty(Jn))};n.addEventListener("pointerup",u,{signal:c.signal}),n.addEventListener("lostpointercapture",u,{signal:c.signal})}function su(t){let e=!1,o=s("button",{class:St("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),e||de(),e=!1},pointerdown:r=>{e=!1,t!=="rail"&&au(r,n,()=>{e=!0})}}},F("bloom"),t!=="rail"&&s("span",{class:St("label"),text:"Bloom++"})),n=s("div",{class:`bloom-root ${St("wrap")} ${St(t)}`,attrs:{"data-bloom":"entry"}},o);return n}function lu(t){let e=s("div",{class:`bloom-root ${St("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),t.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),de()}}},F("bloom"),s("span",{text:"Bloom++"})),o=t.querySelector('[role="menuitem"]');o?.parentElement?o.before(e):t.prepend(e)}function va(){let{showSidebarEntry:t,showSidebarEntryOnHover:e}=me.store,o=ga();for(let[r,i]of jt)r.isConnected&&o.some(a=>a.anchor===r)||(i.remove(),jt.delete(r));for(let r of o){let i=jt.get(r.anchor);if(i?.isConnected||!rt(r.anchor))continue;let a=i??su(r.kind);jt.set(r.anchor,a),r.insert(a)}for(let r of jt.values())r.classList.toggle(St("hover"),!1);let n=ko();n&&!n.querySelector('[data-bloom="menu-entry"]')&&lu(n)}var qa=g({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:me,styles:()=>`${ba}[data-app-navigation-rail] [data-bloom=entry]{position:absolute;left:50%;bottom:100%;transform:translateX(-50%);width:max-content;margin:0;padding-block:0.25rem;pointer-events:none;z-index:5;display:flex;justify-content:center}[data-app-navigation-rail]>[data-bloom=entry]{bottom:2.75rem}[data-app-navigation-rail] [data-bloom=entry] .bloom-entry-button{pointer-events:auto}.${St("hover")}{${Jn}:${me.store.entryPosition}}`,start(){Aa=[T(va),ea(),it()],!ya&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",de),ya=!0)},stop(){for(let t of Aa)t();for(let t of jt.values())t.remove();jt.clear(),ue()},onSettingsChange:va});var er=new x("AppNetwork"),dt=se(),Bo=new Map,xa=new Map;var cu=t=>t==="user"||t==="assistant";function wa(t){let e=t.replace(/^local:/,"");return[...new Set([t,e,`local:${e}`])]}function Sa(t){let e=wa(t);for(let n of e){let r=Bo.get(n);if(r)return r}let o={id:e[0]??t,title:null,chain:[],times:new Map};for(let n of e)Bo.set(n,o);return o}function mt(t){if(!t)return null;fu(t);let e=wa(t);return e.map(o=>Bo.get(o)).find(o=>o&&(o.chain.length||o.title))??Bo.get(e[0]??t)??null}function $n(t,e,o,n=null){return{id:t,role:e,createTime:n,text:h(o),hasFiles:!1,imageCount:0}}function _n(t,e){let o=t.chain.find(r=>r.id===e.id);if(o){e.text&&(o.text=e.text),e.createTime!=null&&(o.createTime=e.createTime);return}if(t.chain.find(r=>r.role===e.role&&r.text&&r.text===e.text)){!t.times.has(e.id)&&e.createTime!=null&&t.times.set(e.id,e.createTime);return}t.chain.push(e)}function Ea(t){let e=t.chain.map(o=>`${o.id}	${o.role}	${o.text}`).join(`
`);xa.get(t.id)!==e&&(xa.set(t.id,e),dt.emit("conversation",t))}function uu(t){if(typeof t=="function")try{return h(String(t()??""))}catch(e){return er.warn("Turn label failed",e),""}return typeof t=="string"?h(t):""}function du(t){if(typeof t!="function")return"";try{let e=t();return typeof e=="string"?h(e):R(e)&&typeof e.response=="string"?h(e.response):""}catch(e){return er.warn("Turn preview failed",e),""}}function mu(t){let e=Object.keys(t).find(o=>o.startsWith("__reactFiber$")||o.startsWith("__reactInternalInstance$"));return e?t[e]??null:null}function tr(t,e,o,n){if(!t||e>24)return;let r=(R(t.memoizedProps)?t.memoizedProps:null)??(R(t.pendingProps)?t.pendingProps:null);r&&(Array.isArray(r.items)&&R(r.items[0])&&typeof r.items[0].turnKey=="string"&&!o.length&&o.push(...r.items.filter(R)),Array.isArray(r.entries)&&R(r.entries[0])&&typeof(r.entries[0].historyEntityKey??r.entries[0].turnId)=="string"&&!n.length&&n.push(...r.entries.filter(R))),tr(t.child??null,e+1,o,n),tr(t.sibling??null,e,o,n)}function pu(t,e){let o=typeof e.turnId=="string"?e.turnId:"",n=typeof e.turnKey=="string"?e.turnKey:"";return t.find(r=>{let i=typeof r.turnKey=="string"?r.turnKey:"";return!!i&&(o===i||n.endsWith(i)||n.includes(i))})??null}function fu(t){let e=document.querySelector("[data-thread-find-target='conversation']")??document.querySelector(l.timelineScroll);if(!e)return;let o=[],n=[];try{tr(mu(e),0,o,n)}catch(d){er.warn("Fiber walk failed",d);return}if(!n.length&&!o.length)return;let r=n.length?n:o,i=typeof r[0]?.conversationId=="string"?r[0].conversationId:t,a=Sa(i);a.title=Ge(t)??Ge(i)??a.title;for(let d of r){let c="";typeof d.turnId=="string"?c=d.turnId:typeof d.turnKey=="string"&&(c=d.turnKey.replace(/^.*turn:/,""));let u=typeof d.historyEntityKey=="string"?d.historyEntityKey:c?`turn:${c}`:"",m=pu(o,d),A=uu(m?.getLabel??d.getLabel),C=du(m?.getPreview??d.getPreview),p=typeof d.timestampSeparatorAtMs=="number"?d.timestampSeparatorAtMs:null;u&&A&&(_n(a,$n(u,"user",A,p)),p&&a.times.set(u,p)),c&&C&&_n(a,$n(`${c}:assistant`,"assistant",C,p))}Ea(a)}function gu(t){if(cu(t.role))return t.role;let e=typeof t.type=="string"?t.type:typeof t.itemType=="string"?t.itemType:"";return/user/i.test(e)?"user":/agent|assistant/i.test(e)?"assistant":null}function hu(t){return typeof t.text=="string"?t.text:typeof t.content=="string"?t.content:R(t.content)&&typeof t.content.text=="string"?t.content.text:""}function Xn(t,e){if(!t||!R(e))return;let o=typeof e.id=="string"?e.id:typeof e.itemId=="string"?e.itemId:"",n=gu(e),r=hu(e);if(!o||!n)return;let i=Sa(t);_n(i,$n(o,n,r)),Ea(i)}function bu(t){let e=t.params?.thread,o=t.params?.threadId??(R(e)&&typeof e.id=="string"?e.id:void 0);t.params?.item&&Xn(o,t.params.item);for(let n of t.params?.items??[])Xn(o,n);if(R(e)&&Array.isArray(e.items))for(let n of e.items)Xn(o,n)}Re.on("note",bu);var yu=["data-turn","data-message-author-role"],Au=/:(user|assistant)$/,or=`${l.messageUnit}, ${l.oldMessage}`,Oo=t=>t==="user"||t==="assistant",La=()=>!!document.querySelector(l.timelineScroll),ka=()=>!!ot(l.timelineScroll),Ia=()=>b()??document.querySelector(l.composerConversation)?.getAttribute("data-above-composer-conversation-id")??"",Ro=()=>La()?ot(l.timelineScroll):document;function Ye(){if(La())return ot(l.timelineScroll);let t=document.querySelector(l.turn);for(let e=t?.parentElement;e;e=e.parentElement){let{overflowY:o}=getComputedStyle(e);if((o==="auto"||o==="scroll")&&e.scrollHeight>e.clientHeight)return e}return document.scrollingElement}var Et=t=>{let e=t.getAttribute("data-chatgpt-search-unit-key")?.match(Au)?.[1];return Oo(e)?e:t.matches(l.userBubble)?"user":t.matches(l.assistantReply)||t.matches(l.assistantMarkdown)?"assistant":null},Ba=t=>{let e=[...t.querySelectorAll(l.searchUnit)].filter(n=>Et(n)&&!n.parentElement?.closest(l.searchUnit));return e.length?e:[...t.querySelectorAll(`${l.userBubble}, ${l.assistantReply}`)].filter(n=>Et(n)&&!n.parentElement?.closest(`${l.userBubble}, ${l.assistantReply}`))},Ta=t=>(t.getAttribute("data-chatgpt-search-message-ids")??t.getAttribute("data-message-id")??t.getAttribute("data-response-annotation-target"))?.split(/\s+/).filter(Boolean)??[];function Ke(t){let e=Ta(t);if(e.length)return e;let o=[...new Set([...t.querySelectorAll(or)].flatMap(Ta))];if(o.length)return o;let n=t.closest("[data-turn-key]")?.getAttribute("data-turn-key")?.replace(/^history-content:/,"");return n&&Et(t)==="user"?[n]:[]}function pe(t=Ro()){if(!t)return[];let e=Ba(t);return e.length?e:[...t.querySelectorAll(or)].filter(o=>!o.parentElement?.closest(or))}function vu(t,e){for(let o=t.length-1;o>=0;o--){let n=e.find(r=>r.id===t[o]);if(n)return n.role}return null}function qu(t){for(let e of yu){let o=t.getAttribute(e)??t.querySelector(`[${e}]`)?.getAttribute(e);if(Oo(o))return o}return t.querySelector(l.markdown)||t.querySelector(l.generatedImage)?"assistant":null}var xu=t=>!t.parentElement?.closest(l.turn);function Tt(){let t=mt(b())?.chain??[];return[...Ro()?.querySelectorAll(l.turn)??[]].filter(xu).flatMap(o=>{let n=Ba(o),r=n.length?n.map(i=>({el:i,known:Et(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=u=>!n.some(m=>m.contains(u))&&h(u.textContent??""),a=[...o.querySelectorAll(l.assistantMarkdown)].find(u=>i(u)&&!Po.test(h(u.textContent??""))),d=[...o.querySelectorAll(l.activityHeader)].findLast(i),c=a??d;c&&r.push({el:c,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?Ke(o):pe(o).flatMap(Ke),a=n??qu(o)??vu(i,t)??(r%2?"assistant":"user"),d=o.closest(l.turn)??o,c=!o.closest(l.searchUnit)&&!!d.querySelector(l.turnBusy),u=a==="assistant"&&(o.matches(l.turnBusy)||!!o.querySelector(l.turnBusy)||c);return{el:o,role:a,messageIds:i,streaming:u}})}var wu="[data-bloom], .sr-only",Pa=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,Po=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,Ma=new WeakMap;function fe(t){let o=(t.el.closest(l.turn)??t.el).textContent?.length??0,n=Ma.get(t.el);if(n?.length===o)return n.summary;let r=Su(t);return Ma.set(t.el,{length:o,summary:r}),r}function Ca(t){let e=new Set,o=[];for(let n of t.querySelectorAll(l.assistantMarkdown)){if(n.closest(l.searchUnit))continue;let r=h(n.textContent??"");!r||Po.test(r)||Pa.test(r)||e.has(r)||(e.add(r),o.push(r))}return o}function Su(t){let e=t.el.querySelectorAll(l.generatedImage).length;if(t.role==="assistant"&&e)return e>1?`Image \xD7${e}`:"Image";let o=t.el.closest(l.turn);if(t.role==="assistant"&&o&&t.el.matches(l.assistantMarkdown)&&!t.el.closest(l.searchUnit)){let c=Ca(o);if(c.length)return c.join(" \xB7 ")}let n=t.el.querySelector(t.role==="assistant"?`${l.markdown}, ${l.assistantMarkdown}`:".whitespace-pre-wrap")??t.el,i=[...n.querySelectorAll(wu)].map(c=>h(c.textContent??"")).filter(Boolean).reduce((c,u)=>c.replace(u,`
`),n.innerText||n.textContent||""),a=i.split(`
`).map(h).filter(c=>c&&!Pa.test(c)&&!Po.test(c));if(a.length)return a.join(" ");if(t.role==="assistant"&&o){let c=Ca(o);if(c.length)return c.join(" \xB7 ")}let d=i.split(`
`).map(h).filter(c=>Po.test(c));return d.length?d.at(-1)??"":t.role==="user"&&t.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function Ho(t){return t.text?h(t.text):t.imageCount?t.imageCount>1?`Image \xD7${t.imageCount}`:"Image":t.hasFiles?"File":""}var nr=t=>t.matches(l.timelineScroll)&&getComputedStyle(t).flexDirection==="column-reverse";var Eu=80,Tu=420;function rr(t,e,o){return(t.x-o.x)*(e.y-o.y)-(e.x-o.x)*(t.y-o.y)}function Mu(t,e,o,n){let r=rr(t,e,o),i=rr(t,o,n),a=rr(t,n,e);return!((r<0||i<0||a<0)&&(r>0||i>0||a>0))}function Cu(t,e){let o=(e.left+e.right)/2-(t.left+t.right)/2,n=(e.top+e.bottom)/2-(t.top+t.bottom)/2;if(Math.abs(o)>=Math.abs(n)){let i=o<0?e.right:e.left;return[{x:i,y:e.top},{x:i,y:e.bottom}]}let r=n<0?e.bottom:e.top;return[{x:e.left,y:r},{x:e.right,y:r}]}function Oa(t,e){let o=$(t.x,e.left,e.right),n=$(t.y,e.top,e.bottom);return Math.hypot(t.x-o,t.y-n)}function Do(t){let e=t.closeDelay??Eu,o=t.towardDelay??Tu,n=0,r=!1,i=null,a=null,d=()=>{document.removeEventListener("pointermove",p,!0)},c=()=>{n&&window.clearTimeout(n),n=0,d(),i=null,a=null},u=()=>{c(),r&&(r=!1,t.setHeld(!1))},m=()=>{r||(r=!0,t.setHeld(!0))},A=q=>{n&&window.clearTimeout(n),n=window.setTimeout(u,q)},C=q=>{let W=t.panel(),oe=t.trigger();if(!W||!i)return!1;let j=W.getBoundingClientRect();if(j.width<=0&&j.height<=0)return!1;let N=oe?.getBoundingClientRect(),[qn,Yl]=N&&(N.width||N.height)?Cu(N,j):[{x:j.left,y:j.top},{x:j.right,y:j.bottom}];return Mu(q,i,qn,Yl)?!0:a!=null&&Oa(q,j)<Oa(a,j)-.25},p=q=>{let W={x:q.clientX,y:q.clientY};if(t.over(q.target)){c();return}C(W)?A(o):u(),a=W};return{enter(){c()},leave(q){if(t.over(q.relatedTarget)){c();return}i={x:q.clientX,y:q.clientY},a=i,m(),document.addEventListener("pointermove",p,!0),A(e)},dispose(){c(),r=!1}}}var Ra=`/*
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
`;var E=k("bloom-nav-"),Fo=80,ku=1200,Iu=2,Ha=3e4,Bu=200,Pu=.9,Ou=.28,Ru=24,ge=8,Hu=80,Du=12,Nu={user:"\u2753",assistant:"\u{1F916}"},Uu=["wheel","touchmove","pointerdown"],Ko=y({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),S=null,I=[],X=-1,zt=-1,he=null,No="",ar=0,Da=[],ze=null,Uo=null,Qt,je,Wt,sr="",Qe=[],Go=null,lr=new Set,Fu=t=>Ko.store.showAssistant||t.role==="user",Gu=t=>t.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||t.messageIds[0]||t.role;function Ku(t){return{role:t.role,summary:fe(t),ids:t.messageIds,turn:t,streaming:t.streaming}}function Ka(t,e){let o=t.entries.at(-1);if(o?.role==="assistant"&&e.role==="assistant"){t.entries[t.entries.length-1]={...e,ids:[...new Set([...o.ids,...e.ids])]};return}t.entries.push(e)}function Yu(){let t=[];for(let e of Tt()){let o=Ku(e),n=Gu(e),r=t.at(-1);r?.key===n?Ka(r,o):t.push({key:n,entries:[o]})}return t}function ju(){let t=[];for(let e of mt(b())?.chain??[]){let o={role:e.role,summary:Ho(e),ids:[e.id],turn:null,streaming:!1},n=t.at(-1);e.role==="assistant"&&n?Ka(n,o):t.push({key:e.id,entries:[o]})}return t}var be=t=>t.entries.flatMap(e=>e.ids);function cr(t,e){let o=new Set(be(t));return be(e).some(n=>o.has(n))}var Vt=t=>h(t.entries.find(e=>e.role==="user")?.summary??""),ir=(t,e)=>t.filter(o=>Vt(o)===e).length,ur=t=>({...t,turn:null,streaming:!1});function Qu(t,e){let o=new Set(e.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return t.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return ur(r);let a=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return a&&a!==n.key?ur(r):r})}))}function Wu(t,e){let o=e.entries.map((n,r)=>{let i=t.entries[r];if(!i)return n;let a=[...new Set([...n.ids,...i.ids])];return{...n,ids:a,summary:n.summary||i.summary}});for(let n of t.entries.slice(o.length))o.push(ur(n));return{key:t.key,entries:o}}function Ya(){let t=Ye();if(!t)return!1;let e=t.clientHeight-t.scrollHeight;return t.scrollTop-e<=Math.abs(t.scrollTop)}function zu(t,e){let o=Qu(t,e);if(!e.length)return o;if(!o.length)return e;let n=e.findIndex(c=>o.some(u=>u.key===c.key));if(n<0)return Ya()?e.concat(o):o.concat(e);let r=e[n]?.key,i=o.findIndex(c=>c.key===r),a=o.slice(0,i).concat(e.slice(0,n),o.slice(i)),d=a.findIndex(c=>c.key===r);for(let c=n;c<e.length;c++){let u=e[c];if(!u)continue;let m=a.findIndex(A=>A.key===u.key);if(m>=0){let A=a[m];A&&(a[m]=Wu(A,u)),d=m}else a.splice(d+1,0,u),d++}return a}function Vu(t,e){let o=0,n=0,r=0;for(let i=1-t.length;i<e.length;i++){let a=0,d=0;for(let u=0;u<t.length;u++){let m=e[u+i],A=t[u];!m||!A||(cr(A,m)?(a+=3,d++):Vt(A)&&Vt(A)===Vt(m)&&a++)}let c=Ya()?i<r:i>r;(a>o||a===o&&d>n||a===o&&d===n&&c)&&(o=a,n=d,r=i)}return{score:o,offset:r}}function Ju(t,e){let o=t.entries.map((n,r)=>{let i=e.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of e.entries.slice(o.length))o.push({...n,turn:null});return{key:t.key,entries:o}}function Zu(t){return t.map(e=>({key:e.key,entries:e.entries.map(o=>({...o}))}))}function Xu(t,e){if(!e.length)return t;if(!t.length)return e;let{score:o,offset:n}=Vu(t,e),r=Zu(t);if(o>0)for(let d=0;d<r.length;d++){let c=e[d+n],u=r[d];if(!c||!u)continue;let m=Vt(u),A=!!m&&m===Vt(c)&&ir(t,m)===1&&ir(e,m)===1;(cr(u,c)||A)&&(r[d]=Ju(u,c))}let i=[],a=[];for(let d=0;d<e.length;d++){let c=e[d];if(!c)continue;let u=Vt(c);!u||ir(r,u)>0||r.some(m=>cr(m,c))||(o>0&&d<n?i.push(c):a.push(c))}return i.concat(r,a)}var dr=t=>t.entries.some(e=>e.turn?.el.isConnected);function $u(t,e,o){let n=t.findIndex(i=>be(i).includes(e));if(n>=0)return n+1;let r=t.find(dr);return o&&r&&be(r).includes(o)?0:t.length}function _u(t){if(Go){let{parent:e,user:o}=Go;for(let n of t.slice($u(t,e,o))){let r=be(n);if(!dr(n)&&!(o&&r.includes(o)))for(let i of r)lr.add(i)}}return t.filter(e=>dr(e)||!be(e).some(o=>lr.has(o)))}function ja(){Qe=[],Go=null,lr.clear()}function td(){let t=Ia();t!==sr&&(sr=t,ja());let e=Yu(),o=ju();return!e.length&&!o.length&&!ka()?(Qe=[],[]):(Qe=_u(Xu(zu(Qe,e),o)),Qe.flatMap(n=>n.entries).filter(Fu))}function ed(t){for(let o of t)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!z().generating||t.some(o=>o.streaming))return;let e=t.at(-1);e&&(e.role==="assistant"||!Ko.store.showAssistant?e.streaming=!0:t.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function Qa(){let t=td();return ed(t),t}function Wa(t){let e=t.getBoundingClientRect(),o=J()?.getBoundingClientRect().top,n=Math.min(e.bottom,o&&o>e.top?o:e.bottom);return{top:e.top,bottom:n}}function za(t){return((t.matches(".whitespace-pre-wrap, .markdown, .prose, [data-markdown-text-style]")?t:t.querySelector(".whitespace-pre-wrap")??t.querySelector(".markdown, .prose, [data-markdown-text-style]"))??t).getBoundingClientRect().top}function Na(t){let e=I[t]?.turn?.el;return e?.isConnected?e:null}function od(t){if(!I.length)return null;let e=t.scrollHeight-t.clientHeight,o=nr(t),n=Math.min(t.scrollTop,0),r=o?-n:e-t.scrollTop,i=o?e+n:t.scrollTop,a=e<=ge||r<=ge,d=e>ge&&i<=ge,{top:c,bottom:u}=Wa(t),m=Na(0),A=m?za(m):Number.NaN,C=!!m&&A>=c-ge&&A<=c+48,p=Na(I.length-1),q=p?.getBoundingClientRect().bottom??Number.NaN,W=!!p&&q<=u+ge&&q>=u-Hu;return a||W?"bottom":d||C?"top":null}function nd(t){let{top:e,bottom:o}=Wa(t),n=e+Math.max(o-e,0)*Ou,r=[],i=-1;if(I.forEach((d,c)=>{let u=d.turn?.el;if(!u?.isConnected){r.push(Number.NaN);return}let m=za(u);r.push(m),i<0&&(i=c),m<=n&&(i=c)}),i<0)return Math.max(I.findIndex(d=>d.turn),0);let a=r[X];return Number.isFinite(a)?i===X?X:i>X?i:a<=n+Ru?X:i:i}function rd(t){let e=od(t);return e==="bottom"?I.length-1:e==="top"?0:nd(t)}function Ua(t){Ko.store.jumpEffect==="border"&&(t.classList.add(E("flash")),setTimeout(()=>t.classList.remove(E("flash")),ku))}function Yo(t){let e=I[t],o=Ye();if(!e||!o)return;if(!e.turn&&!e.ids.length){zt=t,We(),o.scrollTo({top:nr(o)?0:o.scrollHeight});return}zt=t,he=t?null:{chat:b(),first:e.ids[0],until:Date.now()+Ha},We();let n=e.turn?.el;if(n?.isConnected){let u=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:u<o.clientHeight*Iu?"smooth":"auto"}),Ua(n);return}let r=I.findIndex(u=>u.turn),i=r>=0&&t<r?-1:1,a=++ar,d=Date.now()+Ha,c=()=>{let u=Ye();if(a!==ar||Date.now()>d||!u)return;I=Qa();let m=I.find(C=>C.ids.some(p=>e.ids.includes(p)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),Ua(m),zt=I.findIndex(C=>C.turn?.el===m),We();return}let A=u.scrollTop;u.scrollBy({top:i*u.clientHeight*Pu,behavior:"instant"}),u.scrollTop===A?setTimeout(c,Bu):requestAnimationFrame(c)};c()}function id(t,e){return s("button",{class:E("row"),attrs:{type:"button","data-index":String(e),"data-message-id":t.ids[0]??""},on:{click:()=>Yo(e)}},s("span",{text:Nu[t.role]}),s("span",{class:"bloom-truncate",text:et(t.summary||"\u2026",Fo)}))}function Fa(t){if(!S)return;let e=t.getBoundingClientRect(),o=J()?.getBoundingClientRect().top,r=Math.min(e.bottom,o&&o>e.top?o:e.bottom)-e.top;S.style.right=`${document.documentElement.clientWidth-e.left-t.clientLeft-t.clientWidth+Du}px`,S.style.top=`${e.top}px`,S.style.height=r>1?`${r}px`:""}function ad(){let t=Ye();if(I=Qa(),!I.length||!t){Wt?.dispose(),Wt=void 0,S?.remove(),S=null,No="";return}if(ze!==t){je?.abort(),je=new AbortController,t.addEventListener("scroll",vt(We),{passive:!0,signal:je.signal});for(let n of Uu)t.addEventListener(n,Va,{passive:!0,signal:je.signal});ze=t,Qt?.disconnect(),Qt=new ResizeObserver(()=>{t.isConnected&&Fa(t)}),Qt.observe(t),Uo=null}let e=J();e&&e!==Uo&&Qt&&(Qt.observe(e),Uo=e),S||(S=s("div",{class:`bloom-root ${E("root")}`,attrs:{"data-bloom":"navigator"},on:{pointerenter:()=>Wt?.enter(),pointerleave:n=>Wt?.leave(n)}},s("div",{class:E("rail")}),s("div",{class:E("bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:E("toc")},s("div",{class:E("toc-head")}),s("div",{class:E("toc-list")}))),Wt=Do({over:n=>n instanceof Node&&!!S?.contains(n),trigger:()=>S?.querySelector(`.${E("rail")}`),panel:()=>S?.querySelector(`.${E("toc")}`),setHeld:n=>S?.classList.toggle(E("open"),n)})),S.isConnected||document.body.append(S),Fa(t);let o=JSON.stringify(I.map(n=>[n.role,n.ids]));o!==No?(No=o,zt=-1,ld(),he&&Date.now()<he.until&&he.chat===b()&&I[0]?.ids[0]!==he.first&&Yo(0)):sd(),We()}function We(){if(!S||!ze)return;X=zt>=0?zt:rd(ze),S.querySelectorAll(`.${E("tick")}`).forEach((e,o)=>e.classList.toggle(E("tick-current"),o===X)),S.querySelectorAll(`.${E("row")}`).forEach(e=>e.setAttribute("aria-current",String(Number(e.dataset.index)===X)));let t=S.querySelector(`.${E("toc-head")}`);t&&(t.textContent=`${X+1} / ${I.length}`)}function sd(){S?.querySelectorAll(`.${E("tick")}`).forEach((t,e)=>{let o=I[e],n=et(o.summary,Fo);t.title!==n&&(t.title=n),t.classList.toggle(E("tick-streaming"),o.streaming)}),S?.querySelectorAll(`.${E("row")}`).forEach(t=>{let e=t.lastElementChild,o=et(I[Number(t.dataset.index)].summary||"\u2026",Fo);e&&e.textContent!==o&&(e.textContent=o)})}function ld(){S?.querySelector(`.${E("rail")}`)?.replaceChildren(...I.map((e,o)=>s("button",{class:po(E("tick"),E(`tick-${e.role}`),e.streaming&&E("tick-streaming"),o===X&&E("tick-current")),title:et(e.summary,Fo),attrs:{type:"button","aria-label":`Jump to message ${o+1}`,"data-message-id":e.ids[0]??""},on:{click:()=>Yo(o)}}))),S?.querySelector(`.${E("toc-list")}`)?.replaceChildren(...I.map(id))}var at=vt(ad);function Va(){zt=-1,he=null,ar++}var cd=t=>!!t&&(t.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!t.closest("[contenteditable='true']"));function Ga(t){if(!S||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey||cd(document.activeElement)||ot("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:X-1,ArrowDown:X+1,Home:0,End:I.length-1}[t.key];if(o==null){Va();return}o<0||o>=I.length||(t.preventDefault(),t.stopPropagation(),Yo(o))}var Ja=g({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:Ko,styles:Ra,start(){Da=[T(t=>H(t)&&at()),nt(at),dt.on("conversation",at),dt.on("generate-start",({parentId:t,userId:e})=>{t&&(Go={parent:t,user:e},at())}),P.on("rise",at),P.on("fall",at)],addEventListener("keydown",Ga,!0),addEventListener("resize",at,{passive:!0}),at()},stop(){for(let t of Da)t();je?.abort(),Qt?.disconnect(),Qt=void 0,ze=null,Uo=null,removeEventListener("keydown",Ga,!0),removeEventListener("resize",at),Wt?.dispose(),Wt=void 0,S?.remove(),S=null,No="",ja(),sr=""},onSettingsChange:at});var Za=`/*
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
`;var Q=k("bloom-quotes-"),vr="BloomBetterQuotes",dd=40,ts=8,md=1800,gr=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,Xa=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,Jt=y({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),mr,pr,ye,fr=!1,hr=0,jo=null,Qo=null,pt=null;function qr(){return b()??"draft"}function zo(){try{let t=JSON.parse(sessionStorage.getItem(vr)??"[]");return Array.isArray(t)?t.filter(e=>!!e&&typeof e=="object"&&typeof e.id=="string"&&typeof e.text=="string"&&!!e.text):[]}catch{return[]}}function xr(t){try{sessionStorage.setItem(vr,JSON.stringify(t.slice(-dd)))}catch{}}function Ve(t){return zo().find(e=>e.id===t)?.text??""}function pd(t,e){let o=zo().filter(n=>n.id!==t);o.push({id:t,text:e}),xr(o)}function br(t=qr()){xr(zo().filter(e=>e.id!==t)),Wo()}function fd(t){let e=Ve("draft");if(!e||Ve(t))return;let o=zo().filter(n=>n.id!=="draft");o.push({id:t,text:e}),xr(o)}function yr(t){return`${t.getAttribute("aria-label")??""} ${t.getAttribute("title")??""}`}function gd(t){let e=yr(t);return Xa.test(e)&&!/quote|引用/.test(e)?!1:/quote|引用/.test(e)&&gr.test(e)?!0:gr.test(e)&&!Xa.test(e)}function es(t){let e=t.cloneNode(!0),o=[...e.querySelectorAll("button, [role='button']")],n=new Set(o.map(r=>r.getAttribute("aria-label")).filter(Boolean));for(let r of o)r.remove();for(let r of e.querySelectorAll("*"))!r.children.length&&n.has(h(r.textContent??""))&&r.remove();return h(e.textContent??"")}function hd(t){let e=J(),o=t.parentElement,n=0;for(;o&&o!==e&&n<5;){if(n++,o.matches(l.composerInput)||o.querySelector(l.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=es(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function Vo(){let t=J();if(!t)return null;for(let e of t.querySelectorAll("button, [role='button']")){if(e.closest("[data-bloom]")||!gd(e))continue;let o=hd(e),n=o?es(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:e}}return null}function bd(t){let e=t.closest(l.searchUnit)??t.closest(l.oldMessage);return e&&(Et(e)??e.getAttribute("data-message-author-role"))==="user"?e:null}function wr(t){return h(t).slice(0,48)}function yd(t,e){let o=wr(t);if(o.length<ts)return null;let n=null;for(let r of pe()){if(e&&(r===e||e.contains(r)||r.contains(e)))continue;let i=h(r.textContent??"");if(!i.includes(o))continue;let a=o.length/Math.max(i.length,1);(!n||a>n.score)&&(n={el:r,score:a})}return n?.el??null}function Ad(t,e){let o=wr(e),n=t;for(let r of t.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&h(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${Q("hit")}`)?.classList.remove(Q("hit")),n.classList.add(Q("hit")),window.clearTimeout(hr),hr=window.setTimeout(()=>n.classList.remove(Q("hit")),md)}function $a(t){let e=t.closest(l.timelineScroll)??document.scrollingElement;if(!(e instanceof HTMLElement)&&e!==document.scrollingElement)return;let o=t.getBoundingClientRect();if(o.height<1||!e)return;let n=e.getBoundingClientRect(),r=J()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,a=o.top+o.height/2-(n.top+i)/2;Math.abs(a)<8||e.scrollTo({top:e.scrollTop+a,behavior:"smooth"})}function Sr(){if(!pt||!jo?.isConnected)return;let t=jo.getBoundingClientRect();t.width<1||(pt.style.top=`${Math.max(8,t.top+8)}px`,pt.style.left=`${Math.max(8,t.right-pt.offsetWidth-8)}px`)}function vd(t,e,o){jo=t,Qo=e,pt??=s("button",{class:`bloom-root ${Q("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),pt.isConnected||document.body.append(pt),Ad(t,o),Sr()}function _a(){pt?.remove(),pt=null,jo=null,Qo=null,document.querySelector(`.${Q("hit")}`)?.classList.remove(Q("hit"))}function os(){return document.querySelector('[data-bloom="quote-chip"]')}function Wo(){os()?.remove()}function qd(t){let o=J()?.getBoundingClientRect();!o||o.width<8||(t.style.width=`${Math.max(120,o.width-24)}px`,t.style.left=`${o.left+12}px`,t.style.top=`${Math.max(8,o.top-t.offsetHeight-8)}px`)}function xd(t){let e=os();e||(e=s("div",{class:`bloom-root ${Q("chip")}`,attrs:{"data-bloom":"quote-chip"}},s("span",{class:Q("text")}),s("button",{class:Q("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(e));let o=e.querySelector(`.${Q("text")}`),n=h(t);o&&o.textContent!==n&&(o.textContent=n),e.dataset.text=t,qd(e)}function Ar(){if(!fr){fr=!0;try{let t=qr(),e=Vo();Jt.store.persistAcrossChats&&e&&Ve(t)!==e.text&&pd(t,e.text);let o=Jt.store.persistAcrossChats?Ve(t):"";!o||e&&h(e.text)===h(o)?Wo():xd(o),Sr()}finally{fr=!1}}}function wd(t){let e=t.closest('[data-bloom="quote-chip"]');if(e instanceof HTMLElement&&!t.closest(`.${Q("x")}`)){let i=e.dataset.text??e.querySelector(`.${Q("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:e}:null}let o=t.closest("blockquote");if(o instanceof HTMLElement&&!t.closest("a, button")){let i=bd(o),a=h(o.textContent??"");if(i&&a)return{text:a,skip:i,origin:o}}let n=J();if(!n||!n.contains(t)||Oe(t)||t.closest("button, [role='button']"))return null;let r=Vo();return!r||!r.row.contains(t)?null:{text:r.text,skip:null,origin:r.row}}function Sd(t){let{target:e}=t;if(!(e instanceof Element))return;if(e.closest('[data-bloom="quote-back"]')){t.preventDefault(),t.stopPropagation(),Qo?.isConnected&&$a(Qo);return}if(e.closest(`.${Q("x")}`)){t.preventDefault(),t.stopPropagation(),br();return}let o=Vo();if(o&&(e===o.dismiss||o.dismiss.contains(e))){br();return}if(Ed(e)&&ns(),!Jt.store.jumpToPassage)return;let n=wd(e);if(!n)return;let r=yd(n.text,n.skip);r&&(t.preventDefault(),t.stopPropagation(),vd(r,n.origin,n.text),$a(r))}function Ed(t){let e=t.closest("button, [role='button']");return!(e instanceof HTMLElement)||e.closest("[data-bloom]")||!J()?.contains(e)?!1:/send|submit|发送|提交/i.test(yr(e))&&!gr.test(yr(e))}function Td(t){return!(t instanceof KeyboardEvent)||t.key!=="Enter"||t.shiftKey||t.isComposing?!1:Oe(t.target)}function ns(){if(!Jt.store.persistAcrossChats)return;let t=qr(),e=Ve(t);if(e){if(!Vo()){let o=U(),n=wr(e);n.length>=ts&&!h(o).includes(n)&&xt(`> ${e}

${o}`.trim())}br(t)}}function Md(t){Td(t)&&ns()}function Cd(t){!t.prevId&&t.id&&fd(t.id),Ar()}var rs=g({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:Jt,styles:Za,onSettingsChange(t){t==="jumpToPassage"&&!Jt.store.jumpToPassage&&_a(),t==="persistAcrossChats"&&!Jt.store.persistAcrossChats&&(sessionStorage.removeItem(vr),Wo()),Ar()},start(){ye=new AbortController,document.addEventListener("pointerdown",Sd,{capture:!0,signal:ye.signal}),document.addEventListener("keydown",Md,{capture:!0,signal:ye.signal}),addEventListener("scroll",Sr,{capture:!0,passive:!0,signal:ye.signal}),pr=nt(Cd),mr=T(t=>H(t)&&Ar())},stop(){ye?.abort(),ye=void 0,pr?.(),pr=void 0,mr?.(),mr=void 0,window.clearTimeout(hr),_a(),Wo()}});var is=`/*
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
`;var kd="[data-app-action-sidebar-thread-row]{position:relative}[data-app-action-sidebar-thread-row]>[data-bloom=cls]{position:absolute;inset-inline-end:0.25rem;top:50%;width:0.875rem;height:0.875rem;margin:0;transform:translateY(-50%);pointer-events:none}",Id=k("bloom-cls"),Bd="bloom-cls",Pd=600*1e3,Tr=di("tab"),ve=new Map,Ze=new Map,Ae=null,as=[],Od=t=>t==="streaming"||t==="error";function Rd(){let t=new Map,e=Date.now();for(let[o,n]of Ze)e-n.at>Pd?Ze.delete(o):t.set(o,n.status);for(let[o,n]of ve)t.set(o,n);return t}function Hd(t){return s("span",{class:`bloom-root ${Id("",`-${t}`)}`,attrs:{"data-bloom":"cls","data-status":t,"aria-label":t==="error"?"Error":"Generating"}},t==="error"&&F("alert"))}function Je(){let t=Rd(),e=new Set;for(let[o,n]of t)for(let r of Fe(o)){if(!rt(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){e.add(i);continue}i?.remove();let a=Hd(n);e.add(a),r.append(a)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))e.has(o)||o.remove()}function Jo(t,e){t&&(e?ve.set(t,e):ve.delete(t),Ae?.postMessage({tab:Tr,id:t,status:e}),Je())}function Dd({data:t}){!R(t)||typeof t.id!="string"||typeof t.tab!="string"||t.tab===Tr||(Od(t.status)?Ze.set(t.id,{status:t.status,tab:t.tab,at:Date.now()}):Ze.delete(t.id),Je())}function Er(){for(let t of ve.keys())Ae?.postMessage({tab:Tr,id:t,status:null})}var ss=g({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:()=>`${is}${kd}`,start(){Ae=typeof BroadcastChannel=="function"?new BroadcastChannel(Bd):null,Ae?.addEventListener("message",Dd),addEventListener("pagehide",Er),as=[P.on("rise",({conversationId:t})=>Jo(t,"streaming")),P.on("fall",({conversationId:t,outcome:e})=>Jo(t,e==="error"?"error":null)),P.on("context",({prevId:t,id:e,migrated:o})=>{o&&z().generating?Jo(e,"streaming"):!o&&ve.get(t??"")==="streaming"&&Jo(t,null)}),T(t=>H(t)&&Je())],b()&&Je()},stop(){for(let t of as)t();Er(),Ae?.close(),Ae=null,removeEventListener("pagehide",Er),ve.clear(),Ze.clear(),Je()}});var Mt="data-bloom-invite",Nd=/^(?:invite team members|invite members|邀请团队成员|邀请成员)$/i,ls=':is(button, a:not([href^="/c/"])):not(main *, [role="dialog"] *)',Ud={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${l.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])'],hideInvite:[`[${Mt}]`,`div:has(> [${Mt}]:only-child)`]},cs=y({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0},hideInvite:{type:"boolean",description:"Hide Invite team members in the sidebar.",default:!0}}),Zo,Mr=!1;function Fd(t){if(H(t))for(let e of document.querySelectorAll(`${ls}, [${Mt}]`))!e.matches(ls)||!Nd.test(h(e.textContent??""))?e.removeAttribute(Mt):e.hasAttribute(Mt)||e.setAttribute(Mt,"")}var us=g({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads, notices and Invite team members.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:cs,styles:()=>bt(Object.entries(Ud).flatMap(([t,e])=>cs.store[t]?e:[])),start(){Mr=!0,wt().then(()=>{Mr&&!Zo&&(Zo=T(Fd))})},stop(){Mr=!1,Zo?.(),Zo=void 0;for(let t of document.querySelectorAll(`[${Mt}]`))t.removeAttribute(Mt)}});var qe=`form:has(:is(${l.composerInput})), ${l.oldComposerForm}`,Xo='[class*="ComposerLayoutBody"]',Lr='[class*="ComposerLayoutRoot"]',Gd='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',Kd=`:is(${qe}) ${Xo}, :is(${qe}):not(:has(${Xo})) ${Lr}, :is(${qe}):not(:has(${Xo})):not(:has(${Lr})) :is(${Gd})`,Yd='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',jd='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',Qd="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))",Wd="var(--color-background-composer-surface, var(--composer-background-color, var(--color-bg-primary, Canvas)))",zd="composer-fill",ds=y({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function Vd(){let{opacity:t,blur:e}=ds.store;if(t>=100)return"";{let i=`color-mix(in srgb, ${Wd} ${t}%, transparent)`;return`[class*="ComposerLayoutRoot"], [data-composer-layout], [data-chatgpt-composer]{--composer-layout-surface-background:${i}!important;--composer-background-color:${i}!important;--composer-layout-surface-backdrop-filter:blur(${e}px)!important}`}let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${Qd} ${t}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${e}px)!important;-webkit-backdrop-filter:blur(${e}px)!important`;return`:is(${Yd}), :is(${qe}){${o}}:is(${jd}){display:none!important}${Kd}{${n}}:is(${qe}):has(${Xo}) ${Lr}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${qe}) :is(${l.composerInput}){background-color:transparent!important}`}function Cr(){for(let t of document.querySelectorAll(`[data-bloom="${zd}"]`))t.remove()}var ms=g({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:ds,styles:Vd,start(){Cr()},stop(){Cr()},onSettingsChange(){Cr()}});var Jd=1200,Zd=8e3,Xd=150,$d=20,ps=6,Br="continue where you left",_d=/message delivery timed out|please try again/i,fs=/waiting for the complete answer/i,gs=y({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:Br,placeholder:Br}}),kr=[],_o=0,Xe=!1,$e=0,we="",$o="",Pr=0,Se=!1,_e=!1,tn=!0,xe="",Or=0,en=!1,tm=()=>gs.store.prompt.trim()||Br;function hs(){return(ot(l.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function bs(){let t=hs();return!t||fs.test(t)||!_d.test(t)?"":t}function em(){let t=hs();return t&&fs.test(t)?t:""}function om(){let t=Ro()?.querySelectorAll(l.turn),e=t?.[t.length-1];return`${e?.getAttribute("data-turn-key")??""}:${e?.textContent?.length??0}`}function ys(t,e,o){if(o===_o){if(z().generating||U()!==t||e>=$d){Se=!1,z().generating||(we="");return}Qi(),setTimeout(()=>ys(t,e+1,o),Xd)}}function nm(t){let e=_o;if(z().generating||U()&&U()!==t){Se=!1,we="";return}xt(t),en=!0,Pn(()=>{e===_o&&ys(t,0,e)})}function As(t){return t===we||$e>=ps||z().generating||U()?!1:(we=t,$e+=1,Se=!0,nm(tm()),!0)}function rm(){if(Xe||Se||_e)return;let t=Date.now(),e=bs();if(e){if(xe="",e!==$o){$o=e,Pr=t;return}if(t-Pr<Jd)return;As(`${b()??""}:${e}`);return}if($o="",!em()){tn=!0,xe="";return}if(!tn||!z().generating||U())return;let n=`${b()??""}:${om()}`;if(n!==xe){xe=n,Or=t;return}if(t-Or<Zd||$e>=ps)return;let r=On();r&&(_e=!0,r.click())}function Ir(){_o+=1,Xe=!1,$e=0,we="",$o="",Pr=0,Se=!1,_e=!1,tn=!0,xe="",Or=0,en=!1}var vs=g({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:gs,start(){Ir(),kr=[P.on("rise",()=>{Xe=!1,we="",Se=!1,en&&(en=!1,tn=!1,xe="")}),P.on("fall",({outcome:t})=>{if(_e){_e=!1,t==="left"?Xe=!0:As(`${b()??""}:stall`);return}(t==="stopped"||t==="left")&&(Xe=!0),t==="done"&&!bs()&&($e=0)}),P.on("context",({migrated:t})=>{t||Ir()}),P.on("tick",rm)]},stop(){for(let t of kr)t();kr=[],Ir()}});var ft=k("bloom-csi-"),im=256,am=160,on=1,qs=4,sm=.1,lm=.0015,cm=250;function um(t){return new Promise((e,o)=>{let n=new FileReader;n.onload=()=>e(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(t)})}function dm(t){return new Promise((e,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>e(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=t})}function mm(t,e){let o=Math.max(1/t.naturalWidth,1/t.naturalHeight)*e.zoom,n=1/(2*t.naturalWidth*o),r=1/(2*t.naturalHeight*o);return{zoom:e.zoom,x:$(e.x,n,1-n),y:$(e.y,r,1-r)}}function xs(t,e,o){let n=t.width,r=t.getContext("2d");if(!r)return;let i=Math.max(n/e.naturalWidth,n/e.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(e,n/2-o.x*e.naturalWidth*i,n/2-o.y*e.naturalHeight*i,e.naturalWidth*i,e.naturalHeight*i)}function pm(t,e){let o=s("canvas");return o.width=o.height=im,xs(o,t,e),o.toDataURL("image/png")}function ws(t){let e=null,o={x:D.store.cropX,y:D.store.cropY,zoom:D.store.cropZoom},n,r=s("canvas",{class:ft("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=am*devicePixelRatio;let i=s("div",{class:`bloom-muted ${ft("status")}`}),a=s("div",{class:ft("zoom")}),d=s("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function c(p,q=!0){e&&(o=mm(e,p),xs(r,e,o),q&&(clearTimeout(n),n=setTimeout(()=>{e&&(D.store.cropX=o.x,D.store.cropY=o.y,D.store.cropZoom=o.zoom,D.store.avatarUrl=pm(e,o))},cm)))}function u(){a.replaceChildren(To(o.zoom,on,qs,sm,"\xD7",p=>c({...o,zoom:p})))}async function m(p,q){i.textContent="";try{e=await dm(p),q&&(D.store.avatarSource=p,o={x:.5,y:.5,zoom:on}),t.classList.add(ft("has-image")),u(),c(o,q)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let A=p=>{p?.type.startsWith("image/")&&um(p).then(q=>m(q,!0))};d.addEventListener("change",()=>A(d.files?.[0])),r.addEventListener("wheel",p=>{e&&(p.preventDefault(),c({...o,zoom:$(o.zoom*(1-p.deltaY*lm),on,qs)}),u())},{passive:!1}),r.addEventListener("pointerdown",p=>{if(!e)return;r.setPointerCapture(p.pointerId);let q={...o},W=r.getBoundingClientRect(),oe=j=>{if(!e)return;let N=Math.max(W.width/e.naturalWidth,W.height/e.naturalHeight)*o.zoom;c({...o,x:q.x-(j.clientX-p.clientX)/(e.naturalWidth*N),y:q.y-(j.clientY-p.clientY)/(e.naturalHeight*N)})};r.addEventListener("pointermove",oe),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",oe),{once:!0})});let C=s("div",{class:ft("cropper"),attrs:{tabindex:"0"},on:{paste:p=>A([...p.clipboardData?.files??[]].find(q=>q.type.startsWith("image/"))),dragover:p=>p.preventDefault(),drop:p=>{p.preventDefault(),A(p.dataTransfer?.files[0])}}},s("div",{class:ft("stage")},r),s("div",{class:ft("controls")},Ne("",p=>p.trim()&&void m(p.trim(),!0),"https://\u2026 or data:image/\u2026","url"),s("div",{class:ft("buttons")},G("Choose file",()=>d.click()),G("Reset crop",()=>{c({x:.5,y:.5,zoom:on}),u()}),G("Clear",()=>{e=null,t.classList.remove(ft("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),a.replaceChildren(),D.store.avatarUrl="",D.store.avatarSource=""},"danger")),a,i,d));return t.append(C),D.store.avatarSource&&m(D.store.avatarSource,!1),()=>{clearTimeout(n),t.replaceChildren()}}var Ss=`/*
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
`;var to="data-bloom-csi-avatar",Rr="data-bloom-csi-sized",Cs="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",gm=32,D=y({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:t=>ws(t)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),Es=[];function Ls(t){t.removeAttribute(to),t.removeAttribute(Rr)}function Ts(t){return(D.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${t}]`)])}function Ms(t=[]){if(!H(t))return;let e=D.store.displayName.trim()||null,o=!!D.store.avatarUrl,n=new Set(e?Ts("name"):[]);for(let i of document.querySelectorAll(Cs))n.has(i)||Ot(i,null);for(let i of n)Ot(i,e);let r=new Set(o?Ts("avatar"):[]);for(let i of document.querySelectorAll(`[${to}]`))r.has(i)||Ls(i);for(let i of r)i.hasAttribute(to)||i.setAttribute(to,""),i.toggleAttribute(Rr,!i.closest('[role="menu"]'))}function hm(){let t=D.store.avatarUrl;return t?`:root{--bloom-csi-url:url("${t.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${D.store.avatarSize}px}:is(${l.rail}, ${l.oldRail}) [${Rr}]{--bloom-csi-size:${gm}px}`:""}var ks=g({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:D,styles:()=>`${hm()}
${Ss}`,start(){Es=[it(),T(Ms)]},stop(){for(let t of Es)t();for(let t of document.querySelectorAll(`[${to}]`))Ls(t);for(let t of document.querySelectorAll(Cs))Ot(t,null)},onSettingsChange(){Ms()}});var Ee=k("bloom-greeting-"),Is=30,Bs=100;function Ps(t){let e=-1,o=s("textarea",{class:`bloom-input ${Ee("input")}`,attrs:{maxlength:String(Bs),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=G("Add",i),r=s("div",{class:Ee("list")});function i(){let c=o.value.trim().slice(0,Bs);if(!c)return;let u=[...M.store.greetings];e>=0?u[e]=c:u.length<Is&&u.push(c),M.store.greetings=u,e=-1,o.value="",a()}function a(){let{greetings:c}=M.store;n.textContent=e>=0?"Save":"Add",n.disabled=e<0&&c.length>=Is,r.replaceChildren(...c.length?c.map((u,m)=>s("div",{class:Ee("row",m===e?"row-editing":"row-idle")},s("div",{class:Ee("text"),text:u}),Z("edit","Edit",()=>{e=m,o.value=u,o.focus(),a()}),Z("trash","Delete",()=>{M.store.greetings=c.filter((A,C)=>C!==m),e===m&&(e=-1),a()}))):[s("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",c=>{c.key==="Enter"&&(c.ctrlKey||c.metaKey)&&i()}),t.append(s("div",{class:Ee("editor")},r,s("div",{class:Ee("form")},o,n))),a();let d=ie((c,u)=>c==="GreetingCustomizer"&&u==="greetings"&&a());return()=>{d(),t.replaceChildren()}}var Os=`/*
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
`;var an="data-bloom-greeting",ym=1e3,Am=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],M=y({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:t=>Ps(t)},greetings:{type:"custom",default:Am},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),nn,Rs=[],Hr,oo=()=>Eo()&&!Rt(),vm=t=>t.replaceAll(/\s*\n\s*/g," ").trim(),Ds=()=>M.store.greetings.filter(t=>typeof t=="string"&&t.trim());function no(){let t=Ds();if(t.length)if(M.store.order==="random"&&t.length>1){let e=M.store.lastRandom;for(;e===M.store.lastRandom;)e=Math.floor(Math.random()*t.length);M.store.lastRandom=e,M.store.index=e}else M.store.index=(M.store.index+1)%t.length}function qm(){return oo()?ot(l.homeHeading):null}function rn(){for(let t of document.querySelectorAll(`[${an}]`))t.removeAttribute(an),Ot(t,null)}function sn(){for(let t of document.querySelectorAll("[data-bloom-placeholder]"))t.removeAttribute("data-bloom-placeholder")}function Hs(t){let e=ut(),o=vm(t);if(!e||!o||U(e)){sn();return}e.getAttribute("data-bloom-placeholder")!==o&&e.setAttribute("data-bloom-placeholder",o)}function eo(){let t=Ds(),e=Vi(),o=oo();if(!t.length||!e&&!o){rn(),sn();return}if(e){rn(),Hs(t[0]??"");return}let n=qm();n?((M.store.index<0||M.store.index>=t.length)&&no(),n.setAttribute(an,""),Ot(n,t[Math.max(0,M.store.index)%t.length]??"")):rn(),M.store.heroOnlyOutsideProject?sn():Hs(t[Math.max(0,M.store.index)%t.length]??"")}function Dr(){clearInterval(nn),nn=void 0,M.store.mode==="interval"&&oo()&&(nn=setInterval(()=>{no(),eo()},M.store.intervalSec*ym))}function xm(t){M.store.mode!=="manual"||!(t.target instanceof Element)||!t.target.closest(`[${an}]`)||getSelection()?.toString()||(no(),eo())}function wm(){oo()&&M.store.mode==="refresh"&&no(),Dr(),eo()}var Ns=g({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:M,styles:Os,start(){Hr=new AbortController,document.addEventListener("click",xm,{signal:Hr.signal}),oo()&&M.store.mode==="refresh"&&no(),Dr(),Rs=[T(t=>H(t)&&eo()),nt(wm)]},stop(){Hr?.abort();for(let t of Rs)t();clearInterval(nn),rn(),sn()},onSettingsChange(t){(t==="mode"||t==="intervalSec")&&Dr(),eo()}});var ro=k("bloom-history-"),Nr=10,Sm=3e3;function Us(t){let e="",o=0,n=new Set,r=s("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),i=s("div",{class:ro("list")}),a=s("div",{class:ro("pager")}),d,c=G("Clear all",()=>{if(!d){c.textContent="Click again to clear",d=setTimeout(()=>{d=void 0,c.textContent="Clear all"},Sm);return}clearTimeout(d),d=void 0,c.textContent="Clear all",io([])},"danger");function u(){let A=[...Zt.store.entries].toReversed(),C=e.trim().toLowerCase(),p=C?A.filter(N=>N.toLowerCase().includes(C)):A,q=Math.max(1,Math.ceil(p.length/Nr));o=Math.min(o,q-1);let W=p.slice(o*Nr,(o+1)*Nr).map(N=>s("div",{class:ro("row")},s("button",{class:ro("text",n.has(N)?"text-open":"text-closed"),text:N,title:n.has(N)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{n.delete(N)||n.add(N),u()}}}),Z("copy","Copy",()=>void pi(N)),Z("trash","Delete",()=>io(Zt.store.entries.filter(qn=>qn!==N)))));i.replaceChildren(...W.length?W:[s("div",{class:"bloom-muted",text:C?"No matching prompts.":"No saved prompts yet."})]),a.replaceChildren(s("span",{class:"bloom-muted",text:`${p.length} ${C?"matching":"saved"} \xB7 page ${o+1} of ${q}`}),G("Previous",()=>{o--,u()}),G("Next",()=>{o++,u()}),c);let[oe,j]=a.querySelectorAll("button");oe.disabled=o===0,j.disabled=o>=q-1,c.disabled=!A.length}r.addEventListener("input",()=>{e=r.value,o=0,u()}),t.append(s("div",{class:ro("manager")},r,i,a)),u();let m=ie((A,C)=>A==="InputHistory"&&C==="entries"&&u());return()=>{m(),clearTimeout(d),t.replaceChildren()}}var Fs=`/*
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
`;var Tm=k("bloom-history-"),Mm=2e3,Zt=y({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:t=>Us(t)},entries:{type:"custom",default:[]}}),V=null,Ur={text:"",at:0},Xt=null,Fr,ln=()=>Zt.store.entries.filter(t=>typeof t=="string");function io(t){Zt.store.entries=t.slice(-Zt.store.maxEntries)}function Gr(t){let e=t.trim();if(!e)return;let o=Date.now();e===Ur.text&&o-Ur.at<Mm||(Ur={text:e,at:o},io([...ln().filter(n=>n!==e),e]))}function Cm(t,e){let o=ut();if(!o)return;Xt??=s("div",{class:`bloom-root ${Tm("hud")}`,attrs:{"data-bloom":"history-hud","aria-live":"polite"}}),Xt.textContent=`${t+1} / ${e}`;let n=(o.closest("form")??o).getBoundingClientRect();Xt.style.left=`${n.left+n.width/2}px`,Xt.style.top=`${n.top}px`,Xt.isConnected||document.body.append(Xt)}function ao(){V=null,Xt?.remove()}function Lm(t){let e=ln();if(!V)return;let o=e[t];V.index=t,V.shown=o,xt(o),Cm(e.length-1-t,e.length)}function km(t){let e=ln();if(!e.length)return!1;if(!V){if(t===1)return!1;V={index:e.length,draft:U(),shown:""}}let o=V.index+t;return o<0?!0:o>=e.length?(xt(V.draft),ao(),!0):(Lm(o),!0)}function Gs(t){return Oe(t)?t:t instanceof HTMLElement?t.closest(l.composerInput):null}function Im(){if(ut()?.closest("[data-chatgpt-composer], [data-composer-input], form")?.querySelector('[aria-expanded="true"]'))return!0;for(let e of document.querySelectorAll('[role="listbox"], [role="menu"], [data-radix-popper-content-wrapper], [cmdk-root], [cmdk-list]')){if(!(e instanceof HTMLElement)||e.closest("[data-bloom]"))continue;let o=getComputedStyle(e);if(!(o.display==="none"||o.visibility==="hidden"))return!0}return!1}function Bm(t){if(t.isComposing||t.key==="Process"||t.keyCode===229)return;let e=Gs(t.target);if(!e)return;if(t.key==="Enter"&&!t.shiftKey){Gr(U(e)),ao();return}if(t.key==="Escape"&&V){xt(V.draft),ao(),t.preventDefault(),t.stopPropagation();return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.ctrlKey||t.metaKey||t.shiftKey||Im())return;let o=Yi(e),n=t.key==="ArrowUp";!t.altKey&&!(n?o.first:o.last)||!n&&!V||km(n?-1:1)&&(t.preventDefault(),t.stopPropagation())}function Pm(t){V&&Gs(t.target)&&U()!==V.shown.trim()&&ao()}function Om(t){t.target instanceof Element&&t.target.closest(l.sendButton)&&Gr(U())}var Ks=g({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:Zt,styles:Fs,start(){Fr=new AbortController;let{signal:t}=Fr;document.addEventListener("keydown",Bm,{capture:!0,signal:t}),document.addEventListener("input",Pm,{capture:!0,signal:t}),document.addEventListener("click",Om,{capture:!0,signal:t}),document.addEventListener("submit",()=>Gr(U()),{capture:!0,signal:t})},stop(){Fr?.abort(),ao()},onSettingsChange(t){t==="maxEntries"&&io(ln())}});var Ys=`/*
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
`;var Hm=1500,Dm=5e3,Nm=2e3,Js=[{label:"UTC",value:"UTC"},{label:"\u7F8E\u56FD\u4E1C\u90E8",value:"America/New_York"},{label:"\u7F8E\u56FD\u4E2D\u90E8",value:"America/Chicago"},{label:"\u7F8E\u56FD\u5C71\u5730",value:"America/Denver"},{label:"\u7F8E\u56FD\u897F\u90E8",value:"America/Los_Angeles"},{label:"\u65E5\u672C",value:"Asia/Tokyo"},{label:"\u53F0\u6E7E",value:"Asia/Taipei"}],Te=y({sourceTimeZone:{type:"select",description:"Zone the stored clock was written in. Leave UTC for ChatGPT create_time. Pick the same zone as the Shit GPT plugin only when that clock is a wall time in that zone; it is then shown in the system timezone.",options:Js,default:"UTC"},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),un=new Map,Kr=new Set,Zs=0,dn,js=[];function Xs(t,e){un.get(t)!==e&&(un.set(t,e),clearTimeout(dn),dn=setTimeout($s,Nm))}function $s(){let t={...Te.store.stamps,...Object.fromEntries(un)};Te.store.stamps=Object.fromEntries(Object.entries(t).toSorted((e,o)=>o[1]-e[1]).slice(0,Hm))}function Um(t){let e=mt(b())?.times;for(let o=t.length-1;o>=0;o--){let n=un.get(t[o])??e?.get(t[o])??Te.store.stamps[t[o]];if(n)return n}return null}var Fm=()=>z().generating||Date.now()-Zs<Dm;function _s(){return Intl.DateTimeFormat().resolvedOptions().timeZone}function tl(){let t=Te.store.sourceTimeZone;if(!t||t==="UTC")return"UTC";try{return Intl.DateTimeFormat(void 0,{timeZone:t}),t}catch{return"UTC"}}function el(t,e){let o={};for(let n of new Intl.DateTimeFormat("en-US",{timeZone:e,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(t)))o[n.type]=n.value;return{y:+o.year,m:+o.month,d:+o.day,h:+o.hour%24,mi:+o.minute,s:+o.second}}function ol(t){return Date.UTC(t.y,t.m-1,t.d,t.h,t.mi,t.s)}function Qs(t,e){let o=t;for(let n=0;n<4;n++){let r=t-ol(el(o,e));if(r===0)return o;o+=r}return o}function Gm(t,e){if(e==="UTC")return t;let o=(t%1e3+1e3)%1e3,n=t-o,r=new Date(n),i=Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),r.getUTCHours(),r.getUTCMinutes(),r.getUTCSeconds()),a=Qs(i,e),d=3600*1e3,c=Number.POSITIVE_INFINITY;for(let u of[-d,0,d]){let m=a+u;ol(el(m,e))===i&&m<c&&(c=m)}return c!==Number.POSITIVE_INFINITY?c+o:Qs(i+d,e)+o}function Km(t,e){let o=tl();return e||o==="UTC"?t:Gm(t,o)}function Ws(t,e){return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}function Ym(t){let e=_s(),o=Date.now(),n={hour:"2-digit",minute:"2-digit",timeZone:e};if(Ws(t,e)===Ws(o,e))return new Intl.DateTimeFormat(void 0,n).format(t);let r=a=>new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric"}).format(a),i=r(t)===r(o)?{}:{year:"numeric"};return new Intl.DateTimeFormat(void 0,{...i,month:"short",day:"numeric",...n}).format(t)}function jm(t,e){let o=new Date(e).toLocaleString(void 0,{timeZone:_s()}),n=tl();if(n==="UTC"||e===t)return o;let r=new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"UTC"}).format(t);return`${Js.find(a=>a.value===n)?.label??n} ${r} \u2192 ${o}`}function nl(t){let e=Et(t)??t.getAttribute("data-message-author-role")??t.closest(l.turn)?.getAttribute("data-turn")??t.querySelector(l.authorRole)?.getAttribute("data-message-author-role");if(Oo(e))return e;let o=Ke(t).at(-1);return mt(b())?.chain.find(n=>n.id===o)?.role??null}var zs='[class*="group/activity-header"]';function Qm(t){let e=t.parentElement;if(!e)return null;let o=t.closest(l.turn);return o&&e!==o&&!o.contains(e)?null:e}function Wm(t){let e=t;for(let o=0;o<8&&e;o++){let n=Qm(e);if(!n)return null;let r=[...n.children],i=r.indexOf(e);for(let a=i-1;a>=0;a--){let d=r[a],c=d.matches(zs)?d:d.querySelector(zs);if(c)return c;if(d.matches(l.searchUnit)||d.querySelector(l.searchUnit))return null}if(n===e.closest(l.turn))return null;e=n}return null}function zm(t){let e=t.parentElement;for(let o=0;o<4&&e;o++){if(e.classList.contains("flex-col"))return e;e=e.parentElement}return t.parentElement??t}function rl(t,e){if(e==="assistant"){let o=Wm(t);if(o)return zm(o)}return t}function Vm(t,e){let o=pe();for(let n=o.length-1;n>=0;n--){let r=o[n];if(!(r!==t&&(nl(r)!=="assistant"||rl(r,"assistant")!==e)))return r===t}return!0}function Vs(t){return t.querySelector(':scope > time[data-bloom="timestamp"]')}function Jm(t){let e=Ke(t);if(!e.length||!rt(t)||t.querySelector("time:not([data-bloom])"))return;let o=nl(t),n=rl(t,o);if(n!==t&&!Vm(t,n)){Vs(t)?.remove();return}let r=Um(e),i=!1;if(!r&&Fm()){r=Date.now();let m=e.at(-1);Kr.add(m),Xs(m,r),i=!0}else r&&Kr.has(e.at(-1))&&(i=!0);let a=n.querySelector('time[data-bloom="timestamp"]')??Vs(t);if(!r||Te.store.hideOwnMessages&&o==="user"){a?.remove();return}let d=Km(r,i),c=Ym(d);if(a?.textContent===c&&a.parentElement===n&&a===n.firstElementChild)return;let u=s("time",{class:`bloom-timestamp bloom-timestamp-${o??"assistant"}`,text:c,title:jm(r,d),attrs:{"data-bloom":"timestamp",datetime:new Date(d).toISOString()}});a&&a.replaceWith(u),(u.parentElement!==n||u!==n.firstElementChild)&&n.prepend(u)}var cn=vt(()=>{for(let t of pe())Jm(t)}),il=g({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:Te,styles:Ys,start(){js=[T(t=>H(t)&&cn()),dt.on("conversation",cn),dt.on("message-time",({messageId:t,time:e})=>{Kr.delete(t),Xs(t,e),cn()}),P.on("fall",()=>{Zs=Date.now()})]},stop(){for(let t of js)t();dn&&(clearTimeout(dn),$s());for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove()},onSettingsChange(t){if(t!=="stamps"){for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove();cn()}}});var Zm=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])','[data-chatgpt-composer] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-composer-input] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-codex-composer-root] button[aria-label^="Dictat" i], [data-composer-placement] button[aria-label^="Dictat" i], [class*="ComposerLayout"] button[aria-label^="Dictat" i]'],Xm=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],al=y({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),sl=g({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:al,styles:()=>bt([...Zm,...al.store.hideDictationSettings?Xm:[]])});var $t="data-bloom-share",$m=/^\/g\/g-p-/,_m=/^(?:share|分享)$/i,tp=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],ep=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${$t}="project"]`],Yr=y({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),mn,jr=!1;function op(t){if(!H(t))return;let e=$m.test(location.pathname)&&!b();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${$t}]`))!e||!_m.test(h(o.textContent??""))?o.removeAttribute($t):o.hasAttribute($t)||o.setAttribute($t,"project")}var ll=g({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:Yr,styles:()=>bt([...Yr.store.hideShareChat?tp:[],...Yr.store.hideShareProject?ep:[]]),start(){jr=!0,wt().then(()=>{jr&&!mn&&(mn=T(op))})},stop(){jr=!1,mn?.(),mn=void 0;for(let t of document.querySelectorAll(`[${$t}]`))t.removeAttribute($t)}});var cl='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',np='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',rp="[data-bloom-profile-plan]",ul="visibility:hidden!important;user-select:none!important",ml=y({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function ip(){let{hideUsername:t,hideEmail:e,enlargePlan:o,alignPlanWithAvatar:n}=ml.store,r=[];return t&&r.push(n?`:is(${cl}){display:none!important}`:`:is(${cl}){${ul}}`),e&&r.push(`:is(${np}){${ul}}`),t&&o&&r.push(`${rp}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var dl,pl=g({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:ml,styles:ip,start(){dl=it()},stop(){dl?.()}});var ap=new Set(["chatgpt","new chat","\u65B0\u804A\u5929","codex"]);function sp(){let t=h(document.title.replace(/\s*[|–-]\s*(?:ChatGPT|Codex)$/i,""));return t&&!ap.has(t.toLowerCase())?t:null}function so(t){return t?Ge(t)??(t===b()?sp():null):null}var fl=`/*
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
`;var gt=k("bloom-recent-"),ht="home",cp=50,gl=140,up=new Set(["Backquote"]),dp=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),w=y({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(t=>({label:t,value:t})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),Ct=null,st=[],lt=0,Qr,hl=[],gn=()=>Rt()?null:b()??(Eo()?ht:null);function bl(t,e){return Object.fromEntries(Object.entries(t).filter(([o])=>e.has(o)))}function Al(t){let e=so(t);e&&w.store.titles[t]!==e&&(w.store.titles={...w.store.titles,[t]:e});let o=ha(location.href);o&&t===b()&&w.store.projects[t]!==o&&(w.store.projects={...w.store.projects,[t]:o})}function yl(t){if(!t)return;let e=[t,...w.store.visits.filter(n=>n!==t)].slice(0,cp),o=new Set(e);w.store.visits=e,Object.keys(w.store.previews).some(n=>!o.has(n))&&(w.store.previews=bl(w.store.previews,o)),Object.keys(w.store.titles).some(n=>!o.has(n))&&(w.store.titles=bl(w.store.titles,o)),t!==ht&&Al(t)}function pn(t){if(!t||!w.store.visits.includes(t))return;let e={},o=mt(t)?.chain??[];for(let r of o)e[r.role]=et(Ho(r),gl);if(t===b())for(let r of Tt()){let i=fe(r);i&&(e[r.role]=et(i,gl))}let n=w.store.previews[t];!e.user&&!e.assistant||n?.user===e.user&&n?.assistant===e.assistant||(w.store.previews={...w.store.previews,[t]:e})}function mp(){let t=Number(w.store.maxRecent);return w.store.visits.filter(e=>e!==ht||w.store.includeHome).slice(0,t)}function Wr(t){if(lo(),t===gn())return;let e=t===ht?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"], [data-sidebar-destination="builtin:home"]'):Fe(t)[0];e?e.click():location.assign(t===ht?"/":`/c/${t}`)}function pp(t,e){let o=t===ht?"New chat":w.store.titles[t]??so(t)??"Untitled chat",n=t===ht?null:w.store.projects[t],r=t===ht?null:w.store.previews[t];return s("button",{class:gt("item"),attrs:{type:"button",role:"option","aria-selected":String(e===lt)},on:{click:()=>Wr(t),mousemove:()=>e!==lt&&fn(e)}},s("div",{class:gt("head")},s("span",{class:`${gt("title")} bloom-truncate`,text:o}),n&&s("span",{class:gt("project"),text:n})),r?.user&&s("div",{class:`${gt("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&s("div",{class:`${gt("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function fn(t){lt=(t+st.length)%st.length,Ct?.querySelectorAll(`.${gt("item")}`).forEach((e,o)=>e.setAttribute("aria-selected",String(o===lt)))}function fp(){pn(b());let t=gn();st=mp(),t&&(st=[t,...st.filter(e=>e!==t)].slice(0,Number(w.store.maxRecent))),st.length&&(lt=st.length>1?1:0,Ct=s("div",{class:`bloom-root ${gt("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:e=>e.target===e.currentTarget&&lo()}},s("div",{class:gt("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...st.map(pp))),document.body.append(Ct))}function lo(){Ct?.remove(),Ct=null}var gp=t=>up.has(t.code)||dp.has(t.key);function hp(t){if(t.ctrlKey&&!t.altKey&&!t.metaKey&&gp(t)){t.preventDefault(),t.stopPropagation(),Ct?fn(lt+(t.shiftKey?-1:1)):fp();return}if(!Ct)return;let o={Escape:lo,Enter:()=>Wr(st[lt]),ArrowDown:()=>fn(lt+1),ArrowUp:()=>fn(lt-1)}[t.key];o&&(t.preventDefault(),t.stopPropagation(),o())}function bp(t){Ct&&t.key==="Control"&&Wr(st[lt])}var vl=g({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:w,styles:fl,start(){Qr=new AbortController;let{signal:t}=Qr;addEventListener("keydown",hp,{capture:!0,signal:t}),addEventListener("keyup",bp,{capture:!0,signal:t}),addEventListener("blur",lo,{signal:t}),document.addEventListener("visibilitychange",()=>document.hidden&&pn(b()),{signal:t}),hl=[nt(({prevId:i})=>{pn(i),yl(gn())}),dt.on("conversation",({id:i})=>{w.store.visits.includes(i)&&Al(i),pn(i)})];let{visits:e,titles:o,previews:n}=w.store,r=e.filter(i=>i!==ht&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(w.store.visits=e.filter(i=>!r.includes(i))),yl(gn())},stop(){Qr?.abort();for(let t of hl)t();lo()}});var zr="data:audio/mpeg;base64,SUQzBAAAAAAAIlRTU0UAAAAOAAADTGF2ZjYxLjcuMTAwAAAAAAAAAAAAAAD/+5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABJbmZvAAAADwAAACgAAELvAAwMEhIYGBgfHyUlJSsrMTExODg+Pj5EREpKSlFRV1dXXV1jY2NqanBwcHZ2fHx8g4OJiYmPj5WVlZycoqKiqKiurq61tbu7u8HBx8fHzs7U1NTa2uDg4Ofn7e3t8/P5+fn//wAAAABMYXZjNjEuMTkAAAAAAAAAAAAAAAAkBXwAAAAAAABC75HV3zMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+5BkAAACVRhUHSTABDSjGMCkpAAV+UdIeawACK0LpksSkAAAEhOaEPa6NHqgJgmK0ewQIGLv//sYTJ34iIgmT1iAIEIWAAAQDGCAY0Qff/1gh3+CHKAgCEuCBzggCGCDv1B+CBwoCAIAh/V+UOQ9zXRtyQAmCYrR6ogQIEc5//wIATFaPYIECBATo9UFAIBgwuCAIChg5BwEHbi4f/8HAwsHwDJSk25HiBkEDmrGDRlRGDE44BKOErcpXEmnGLGAUG05WF48gSBebi1am1KjGgveDHroFZEIH+QlCyxGABCC1VCrlYQwcS/xhYcVnMtqxl77WNr5RzmHzZUqg8/U1m/KljFqTC+2AvdPax+xen21StkMqhq/RpPXb/zWWUNT3/RRXmMps9pZ3O9/63///f////ludLKoDcTe+frn/9WK////f//5///9mm3sjJlqb/oAAADADutHY8i2rvky+59Wnn/WFTxDiS2ttrIhnfxrf7Mnb/W//Qd2f//6FQAGgwIA8wGC8yEK82ysYxBF4xNBYtMMgAYMgIWAAMFABRP/+5JkEQ/EsUDLF3aABDKiOMDtPAAQMQUgD2lnyNOKJE2hNZhgBLlJIHAFEFOSmOwiZInTghEAKPAyAMLQgs8QUegDRAHQegDFRXhKYuQc4Vs6AyopETAMtC5SCl1kjKtSZmiaUjYdQ3xkiBEyasgmatRukZJoomSaa2Z3IaTxs6/SQPKqZNu/2Vrut1oFE1DJXgYfkVJ/DUDvkKlToxygu1h75KqdrK18fst/G52dizb96dnVr6AhuiQkgYmYMlRjQESsq4jt+sq7pEgDDAYAnMBcPoxGW9SoBkAgCzAPAmLppEGcIC9AsAAUWMjCR6ZgX+uMmcxYz0SyC6YUBui82kcFEwYCE74kHeVFVLkakhmmB5ICYhyax52KPWdF51FySSw9AfKi67ZzLKVh+Wk1EhSQTzKoOs3TPtlu6qRdXbL//4vdw6Euzej3qgBhvXWL31LDddiITD0UykDG3Wld90OQxTW6DaFlYKlkTE9ntf+HP7XNp+v9uvp/9nM8Mf/0qgAAWpTMLFIjAHD9M9NeQ+ewYYCiFWDIwWaP2luULS7X//uSZBAEQ7AqyJs+yAA2Yojmc08WDBDPKu6YVoDyj+OJx5Wg4votW6k/BszLpY8MCsAl24JWLAZAmadDzPUgiikv9f27mVvKrzP+f+eFXHv5Y5V5rWX813/3/953v8zn7+UsD4SH7Fg4Bj0+nfrYEXu/i/+j+QkfxWsIABAALAJSkwCNArTQceWqi5hKXoOEIaa+WkYu0/NG+pNU2j/q7rLMHW06PyLvCaKu+S57d00yBVGWbrCCoAmCw2HuVlmHwJIlOqoS9iE0wdAqnhtKmG6duLiSrOa+XU9jP8qHkYWWEADDtNT0aVkocilq5lSCXTht3M+ohle26/tQoEKDlSpiK5LXmoNR9+rT/knf///SSpgIVjoAAA/O35oqA1eRICqJxwqCAuL4Ajqy9tbROzs1Nx423n7XVgXYEt8MWxcJBZ1c//qvSo539TP+uojBJFtONfDgGDAvArNG8XwMC7DABEN0LEApdEwRAAHVRgCDvxeH1Y+nPccMHZvd5vRcZXOapV6llhp9mtaZl5p4fLbDiHK91/2b/v/QkHQNF1ytzP/7kmQqAIM8M8q7zDLkQGKIxXdsGg4orRzvaQfBNZSiye2sach/TduWyiQFZ1p72f9v/p1OH6KwIAADgeC4HgAzj6B1TOB4uuDAIOKENDAy0Jth4DZYsh15xnyjOvVb9hc/arPnYNQMmcJBj6VQiIs7txQ7+tQD1gEBQCRkDACTAxACMJQI87Bh3jESAFDgZzAQAnQfBJAEvAL9UaZSFyUUliBCD4bi0JlMr61G123YjK8nLTofOu6U6FQ8JNUwxLgYHTkI2KJURTY8tae2+F/ruHxhYw0PrEqJJQDUuzq8n/1/2qX/1e33gEgA0B+XYMEUHU2PQajZREaKTDSkMfEEJgiiddKBgDBRKEPzCLyfR2jc1WshyM7TPB6cBsf3DsOoGsW13193/9f8Q+b72X/bt8bl3UwaAAxQNpVzZIYAABmBuEQa75oZ+SRhAJhRdPPBUaf8oqOXhUKjRNQxCoDhyD6uUxAsUMEkExhQ7BKIFFbF8wHObTZGk6KlOgtmbZS1mKVkfrbsyVMuFRuxoUJNgClF3+M/9tFSPd6QgJBm0Bj/+5JkNYjjLCtJU9po8EpCiKFj3AANkKkctemAAVYK4oa88AAzAGm38T4amApEPwIXwaDU4zABeOSJUIEDrq7YrEU/4AoG8tzdHHYu79vCgxYK4jXIelk9Z5lAh0QFDhi1z7RTyVQCfFoGwYKAHBgoA4GCySObCToBhuB6GH8FYYKwBiDac4NBVMJwEgwFgBAcAACAE0GYHa2TADEPMiKF6MYQQk0z6I5YQAJgAtw5wohOGJdLYyRxSFNaVt6JfZJkj6zhiTCK0ldddkK7pJGDFakCsbvQYIYFZgcg3mBaLYauqEJhFg9mEaDWYD4M40DWCQCACDAYrIIZgSgEpFhcAuk9Q9MxLq08IkROyHRGrAsSovgGgl/JNHXBkwZ9DTBXeMt7M7S9RH/3KgABEnU2I3M4QslnQ2IxYBCQAWZIRki0OwYtGJmRuAFQk3Rk5ZxEysYxETRoWcE/kMAjEA4JqLPD8hHgb+HIBYaI6DCwYwFKC5xcAaAAcAG4BgAfghIACsyAHDEnyuXBZAuQcAAyw29YuYCpADmBv08/FjHAeTLj//uSZDuABgFfVn5mYAZeQ8nPzeAAEFVDQv24ABjKCKcrtCACBaMZBxQcsTIof+mLgJxB0GNg1aTtSSf/GYPG4lAiDEXIuT5RFtLQ6xYTXO//FwGpuQQnGLhcNEkC2gZMnZJzEx/////LpV35BIAAAMSEgFAFAHA5AYDAAABCpmriAUWTRBIACILOJ9EB1UOqtJbJMxgZZIeHJZDLiSGVxvLsceQGatzl3/48UPTuuZUlh5u3avf/n09vOWWPxoYveNZm9/4fy38+X70iAAABTgkDNgoMma5hlh7HkhU1WctaVO0ZgT6rlDAG7D5AjU6WSKmpdMWWuYmBEwFEZE1JoixZFygWRJjUomiR+s9MiLFYZ4MTOkklr+pL9aJ5NZDieSSfbX60S6fKJGC5SqyJdJ1zEZUgpdZfSNkkknZnRWYmqLf0kkkkaq/60WWYiAHAIAASQttRwClAL1AQVK1iD3KbK2FAWzjc1ayz1qt/Zop9AY/Ev/3Ld/2dn//7nf/WigACVKC4g0AZgoFxtJBp4GCQYR5gYAiCyYsJIQCd9bKCjP/7kmQQgAQEUEwbuVLyQmW6GmWCXs3A11WsMRaxUZapKYGLRoHCeFBxh8NxqjmYhGIfZ3GLHI9K3FVBUmH5l8PuEBYF1XpE8C35fbzpd297pQFRQcyZqnuYkbaqujD4uPntPWo8MMbmJNBeAiJznaitZm866XOYo6M3a3/RHnGu6tlARAIUwI2wAJukeM07FeWJrnY4utwO9YJBMcY695mbk8GgAgHDP5pSl5mW7+w4URzEcQyef3m6whG7EO+hG///Di24AQByOSVq1tyBD5oM+J6OzIrmzlijmFDVDlg29hl+Xga7Enennmq1rSJqEpUry1HRTlT6iNLZv60dA3NKlwtB8IxKPgiZdgaZtZ7a71HT0B0dfH9fJTz/Mr4rKqvzKs0BboqjxIO9cFaukq4l/SSWggs5GbIQFDnw2FRXvzFiZtQN2ck8u1Mw7Td+mtZ1alDamW6qWzFPTZbpsu/zKVQNZBSk5SzKsK7EwmbV3RVu1Utq8DYYCHKvvuYD/KAhDv/+6v+GqgBqACAJEIDBgRAwmt8NsaOx4Jg6AqGASBP/+5JkDIwDpDVJE9pCcEVDKRFzLyYOwNccL2BtgSWP5SnMoKCXFAwCQOACAzd1hHRAyhQLb4Bw+afiC1VY1DUqLzPdXkMuh5ASBjkszis1hFXBTdbNK7U0C49Md1UtLTfMDaul+ueOqQ0dZk8vvs92yb84kHDSZJIPFCTWKRiGgKCyaL4JBQPqZrWHEoLYcW8JjBGCfRj8gxQjSyOJOFe8gXPt42q21IC5g1wJaC3K95Z7GFuZoI3UZbOtzt9YIlvxreJfsBAwAwHDAsALIQnDlHKRPH8MMBGDGDMA+YB4EAhAfQfMFMC5BYqhiiQDK3ZwveazOCuGfLyQM8UZfScq09lp6wxijLJFdmZxUcaYixeYlcbhUzWp6fWe+aNKesRFI+G079hiCCmANUPW5ckyoQCFGkFn/+V//6kESAAFbd+QzQiLATNzIAb7IkPAaO0VAGpUKGwgUqHtpRLKr4MZIct41ZJccIwYXo2z1jfh57r/1i/mShMb+mf/1C3/7v+////3VUAD4Acl13U3FgFEQTnJB4HBUbGEgTrDKHJWMREp//uSZA6Ag0U1y1O5GnBOAykad0woDQzXIE9sqcE0DOMBnuxAJ0Q7pq4PszEoMo5iWsDofsQ3zndP561rXcPxqYs8cS9zZIAAwQiFT6vZsW8yJewiZ8BVj1n/tfeoCYeDhTHGLERLehWPCav/6jH/QAABABTCFrSAwFmumcYKnCrAmF4EAQyOhwoFesS3QoLZhbfjLnrYLHfhR52WFH9ezzIHX5TfqZe2ip16T8r3+oSbrbwG7/9n//9X2f0/WAsgGAeBKBgTTA1B+Mjc9U2eESzDWBMMBsBWTmASAICgAjBg+cBkWNCDozDBI2ryne5qzzXJHeubuwBem0RIpblungg1SCm7EYnCJsUOJwBIOpLXQg4qGzClLmqUyi7XR2yUNaezo3GnGNAdGZGpivHuebGKIehwiPBwNShCGmeDjUADzC285Tuw0UBbz17y25RK5DBcv7cqPvXTOp+2+YPrK3JUnGJZu9hcqw1fDlNXr1pT/+0AAjABFKwBwBUGgCGAEDSYcpXBo2hemEKAUPWl30BajRWPNDGLnVpuIsy5TWmtSv/7kmQXgJLhNkrT2SlgS6UZB3dIKgvM0SlO5WVJRIyiwY7sCKIZw2xyw1AUrqYQERMMAadR27rq6kV0ZHV009t5RBJlftT3o7HdSnUUqLb29QBAA4AACAGGalkjMQ6z4gFSIzQUWCoQwoldxihrYhTkDm0rkspaVDUvsO7kiJPxMBKDiyriRgbAJCFuNrjHT/+3NwNv+GeJvmblRRgBwIAFkgASjC4JmAQ3HDWcm11oGCgejqzSy9hclhyvBysaLkMugxT0bmqzVUCxMtd9julVGZiBMKYBQ7Ys2OTD3f/SKqTWvKIPVPna4q/ceV4ue3XP8XudVOaSFKirGaRggFx3N17aPq9zMYxOMMCAMZmcCqFAGfi2wJ3hoif1/okVg0tuwwuaWVpNHZfS7rTLdcaTC3Mzi32fqBvHnapZbnS0EtIlTStWzuB539FrFWAIglEQ7LAAmOVAAYFCZ0GNH9ISYwAiWSPAQGki04MSoB2r5HZWF/WfHTDpHfP2Tk/F17NVtU5DVXlLKXOrFO/soczOo7HeyF2TWAwxrm6+nHLt3Gv/+5JkKoGSvijM64wbalEFGPd1hWoKrNFNrSxv8TwUIwnttLDtfWwEEBwASLCF3RIHDNZAzoV2DEsITAYICECyQHIuiQ1gdHBrsTuBQD5P25TUudb57Y1NrrKdDQUjg9ZjAzYXf9DdtMiaWs5ho///////0f/1f6YA75JY3NW9CCUOjUg6IFoScLTwQFTQMYPR2JBqbNn4m6xJdBOOEsnqU6dZUOfMQqTTEJVua9S0/528Pdcksjtm5VSRuvqTxJKnOfXkWP/JNllFEpbVAGlWBgTTAlAWMOMRM1kgjAUKaZeIBiwYyXqrFxXIAs8HDFuKT63qO/LXsprF7BA0WxwYUIdzSswMRPxKhOEDcwNTY6okOnv/6bT3ZlsamioAgWlskB9oZRuPNbzGZxN2CGUv068BUsSlUlL/q/QCOE3FoTaOGtB2XKfJxH3mtQCAQdFYSAEh1H07E4QgHSkZY/FLPwe7kNug1VrzNUry9hVCjNBIAjIcFIkKbuA+Mal0mn6RSFfXoSEF4CDFUov18p3ZMNOYePBzVnjcB5eFGEhqrY0q//uSREKABEo5zUtiZw5+xzljcwhuStzRMa49q4mOnGZpyIsJqZZbOQAV2gALgZGUKjA8TazKnAHBGQAYv7F2SLDq7IAmRAprCJivILYI2NTeXw5H3XmIpMSyvL4bRPTrfBdEFOI9aRa92h17dS/UvU9yMVY3QMPO7VLi0jHGHyJ2JbGKWfqUWfGiv1FKLhQHwXsZOlJXv1wLsHALBzvowcAKCIWfCPMAACIkACZ4AUzPh0Dm6k0cQPIkFF3wQqaDWAPnMc5unIuWFigsLBqLG3jG6wG4mJYab3Iqm0kLRq2bb7pIAAmB3HWel+oyqu1jhipAxNf/+kay+UeJrbACQBBCVcAOE4A6FTby+P6JkFEwaAatjJ5VH2vEgBURiS1o86VJTV53C13lazcta9mLqy25ecJl0dVpi85jnbRpHS6WQMUNtHaZGyLJUtz6X0DB3ChhX//dgokDDOUBQpAICFRaAAKNSAL2+AFNoQAIZ1lycNmaYXgAXxVuaLEnLhtQ0iBOlaBFX8PJBwHAGtCPeo8HG57ceLAZKi5YQom0Pflfe//7kmQgAQKeJ8vrpkOyT+Z5TXHlagqg0S+uME3BHIzotPwwLty6Dq6+dfxh9YlA3msgt9fRPP50AAgKABl7MAUrPVdAEgniHEYcAbJ0/VU5lksgGQITAX7NRbmdtRKd3TFKR99/t5bWKsbuGDlRb1TuY5CW6lAUc/7dDs2ujyiLbnOqk0rbqKsACFIkLfIlKCp6mAGMa5lgBBbIGXskc13nGhkoB1A6Erhi1cu+juWjG1aRwm9WttjBkNRQ1hOprvrtnNy3U+mwI/aZ55pkbmEsrIVuFcyc+V2cd9NcAjkksb1kAAH6N6uiYdIxhAW3aLU7T2QkgibDglmwDSdrJcfoIQX40quwJTt61+XuKSq5iuFp0fYVXj4nUem1hEJPrUqm2AYAMRABLEACYAcBAEmAOCIYzxW5pfBXiQjg0B8qUtNF3kdtR4mBKliOaFfG1IdkadwVuvCkYE6kpPW8Q+ZjGIZbGFkrdXxwd6jZqxDrVh1zLYlNCxIIW13hRaZIAAABQACwIQJmJBF+TLMNgHZYsWwQDBcZPb2vWiQABoNKa7L/+5JkPwCC1ihI089bUEmkCQ11gmoKnHMfLHXhSUGMoondPJhytvQJxigg2K33nlMBRjZdnHdZRtLtYmb6k1aGcx+bb/1f////8iAAQAP4AQTC9CoQ55X/h/jZ5jaIwCAWXI3tPSrdJEIaGukOhUpmVYgI9xcIsbEei6jNh8rq+p2xyVoOE5cagTQn33v7rqbT8YtxXB3lbDAJ4b70+r9AgARgHhwEwKFRo9H53J2higLoBeIbmKCqwB0lgoXKD9GQtjkG9dkaiW9uaXn+pzjXBvQ3PcOKZTSIMa2fmbF6zRciZY82S/Lf+S///////30BgAcYDDTzAEDTCIVD37DTunBjGUQzBIGESi2CzKy/GeEQ17PT8vJUJ4gzA6kvTj6wngGeVnlGCKJINiIqzACra0lIDvKpLhQLTKAbD87e1Vh7///6wFIBDAwBgAjATAJC4yhqqF6mE4CERSzBBYYcYxYFi4wME8OEJJmA7gtxPmOR3G1W8rTOhsOPPd5AV5XPY20FrzleZ/U2j/b0ADEAApGwAiMTAAlAN5mWhaGj0B2T//uSZFkAwqodx7usE1BH4siie08mCoyfIU9kqcE9i6JJz2hACUDQHZbxV6mQcDfKow+FGnWf2e1T2qbXbPM+a5GqryfnfwtVp9R+V50OYFMzJShTs6zKIoZ1LY/SYgcBa/9OkCABEgyAQYYgEJnOMG4WMmYcIDgZRS1jT7mfBPMu4f415PIVuzVWwvP92q1q/9uHcVJW8a2ohG7ywDbQ9Vysijz6hCWlyZV5L7P//////9YMwCkAACEkwNBIwmFU+WcQ67pcxVDowEAdEdIlfBftWsZAQWD6q/RErOoE+zNr6LE3nOlCeCGZmeyS3T5VfElgFFysze4uuZWRH2Y79kcWD7BIqCyjAIFSUNjFWJzYD8jBYXSECC3icCDoKEx1UvyIzIeHBKBR5JUKUne7NZQyIxhuBdaB2EdaVjtUrwoWFgNc+xzPi9X9myz3f2gGNAACECBwEwuMh+nd56jdBiSHoIAggBFORgiazJx0BBYQrr9dFwZW6Oxw4Hff7q7mQlvvEmYzhSY2EIa5o6EFDmXJjAibpAAFXO47IfxVgrbAAv/7kmR3gAKFKMe7rytQSwLoknUvaApAoRxuvG1JHIrjadykmADABpuNs9UgJAOZbE8euMKYvAgY4ogEa8uZiM2skrqkyWhRtVxMYN7mbK2DaVT/ggOik1AwxndWV19fX/17vYj///2evjYBAFIAj8WwBINpn4HNG0cDiYZQAxgTgAgYCRRFgKEDXxAYTxxiItYVy/8LhuQS+3Wprk7VmYEdi7cprV2Q1ZYXnZrnOxYPocyTzWdaO+YzapZW3mlg82sgCF1YgP7/7spa0tEyaKjp5XDhMul+1QtKVd0SEH1owaADOdpwRKKZw6q4My8j2XI0bLm/pbu1t6f/q2//oDgBbdodEAnHCOfn0+FmLYaGAQBgUCF4KmDgHlJCARQN8Gv45Y0Au+cz5ictPtRMK0qCTp6SWWytJeQVDmSIuxcZD/mx9+qpFlXU/65BFAAQACCko1EBUAwYERoEcpghSRUDkLAh0OvBlKVERLBcPgxSbutTOYHWMbvMP9KMvOoc7OLGgJCI00DUx9XXuyf/+rVv9wy3/Z20f/RVAAgAAVkADBT/+5JknAECuChGM9k6cD3BqU1yaVAJxJ8YzrxtQTELIundMKBwKDmaQ4Idm1EYihOLEAZNK1ihMfKiqgR9Q2ytIdjCsMNbV8JCGe63XxlpuLiHXZTssct5YmNhY4ff71eJ9Me2wXg9bUk31G6BnGbZpr436evxiOkBhBQLQAAN0SURieH5xQaYGFwiOggfqH1euIm2TkjE5WYAWoioifQz9yT9irDCVWSHWyooWD4a5PKrHjek9JwCBCFoByoiYZju0AahIDkYlrrIYjodG90enmQMhxQlAFo8qVrRSQkKOw8CUrgOxFcZTlnz6+f/3fuwH0d8u/w6RLM1r4svlrVTCvHFGsSINUpHLHga////9n/I//9AQARAAAUrQKAAAC0wCW48RRUxXA4iaKgRIf8MGwUlKUwcIvVaia245ap8xPmtaMa7VpcWWSWMhx/C+cGetrfWPmvtBHpQ1QxAah0X//////////1KAG1AHw8GAFIAMMCRfPu8gO9ZTMPwwBABoyJ95oIYMEQKDwdKOj2tKJy8fFSJddr+lx1cBiXIvbLJ//uSZMMAAuAoxtO5eUBJo+j6dwwoSmB3IU6x7YFPDuLd3DygCHkdI2Kigk2M2tQ3+ETGZ0j/+1kGZ////+z9nrYAqgcMgaSi4ZPVyYr5IFxBJGgqKWgVynZYJVxNmAzlOlCme6hkiq/OX+qQ08wva0hx3qGQA0WZY3EZ8wSD2inVR9P3d6t3//+/6KaQKgGJyNuyBQBMKAeP8IJOV5mMUQnMDAORqUi1BGJ0EOQ0BU41LZ9MaYfR4mY0R3nf0sCVgavSsq8uUJxNFIB9NJG2qIVD1a7Pdbvu/1erXExv+3/6P9LhYCEUVmL8GBoWmc7PH1zMmOQECZzcFv2+FqwcMtK6VIBFOFja1a2uWkqzMFzAFzBa9V5+hSFAv91l4hygw20MAvR1adun9X9yUf1+n/6f/7YEBvgoCYwJgFzCHBIOFsXE4/AwQ4okHBjAYCyWl5TKQb8RzETd5kbws9pIkyFvZXl9rCpepHfiRugwI/tDcoY2pWHDv/TxmccBASKr3LNDLDMRD69oOvX3+QdEVFWuz0o5Vc27K6G/Y+a7kG+fSP/7kmTbgMKsKEbLrBtQTAMIcXcvJgsAgRruvE1BPQuiCdwwmO6iCYRgwAZrQFZ9+npjmBgR2TKbqmBy4MHZj4Z2MwJ1tbVPqzp7WmLwV+EG4yXgzV749kdCzLqCEdTb7qd733p8Vmmp/1F67PryOaV9CvUn932ACBlWjGLNmIwTAszW6QuM+E28wgQWDdUtepugCLOo1BQyQcDQG0KLNyi9PBV2nn6OmpKlhpCeqGVPO02VqUNZSAh6BNTVPbpb/467jasNJHOSxSYs6vv+7R1p//L/+53SPX2bGp6jNYEAgBMBQUNyTZMH4+GAlZgOAizel1oSKXGq34DA4RI8t8ajah5ww3Vw33lqQa2TI3nl5wwslFVopdo7dSNX7v2fqLf/60f6qkx9GyoBKaBsA5iYCYehqFsBmhKf4YNIMpkgIOsLRMGrOAQaWvD0gb63N5z7rym3fxtdymIzBqAGzen9RJ/XcJcL9llixLqcLPPFjhhCruzfa1Kt+Y/30O/3GcU463uORPX7fpckCmqZCyAlBM1iJQ58Psw2AIuGo8wGXJf/+5Jk9gDDbR/Dq9kacFLC+HF3DyYMxG8SzPsAQTMLIcXcPJgSIdAtOGjCEEzEp+0zvuSEtxLrT0+ospGU+CRE6Y2CrF2++h3uo/lGUhRH03eLx2vt3opL6apm3rHRQgoGCaMGaU0wB3vCWmL8Ake9iaRcRFgKDMwOXmMOhCGdtJGhRUoHvVNALtw67k9ffrCdXUyMEAICl9ijdtEZZYjSkwyCYds0dTLO9lUz7TAqeKODBwFQsYUKhMq5qRatSmRC86uOXpvDuEm8i776xX51hT7dOoIGq6SNgZKg0LFc5VLsDDUW9LhqWTbX5YSNVBNPoTTPnjWx539Nny+c7/0sreAYbAmwNpVLpvv6s0tC6LCBUS/2PKopKJlpOHEkeRvv4kuQMqqdTEFNRTMuMTAwVVVVVVVVJNBQsuYJAexkSNemvmmyYZINR3ZmSYpuhOOhUdBmhaZnDjtWdmmeuWSyWQzGNv7lVyU4a6FCvZKr1u2xBsa6FYX+lt2nnChUFyL1RVLpFKGtFzDBYdngApP5ZHmPf33MfANTH4HWKsZ9QlaY//uSZPsMQwYXxBM+wBBPwqiSdM9mDvhvCA17QEFKiqJZ3DCYejhDuBFkV8qHkoBmXxAGGkPDAQqyEoU+82vTpYypZSn5eNLwaoZpuMdl+Hscu7uZocgOPwVSB2i7zfS0qHIX6dOtOgg4kk1iB1y2k9feAlaf+9+5typj1MUkEQEV8y5vDAkSz4/Pj125jFUMwxhnWj60xLt+EXkx2WsymFXFYm1OPoMlMxdSTn+PU47gVbFauxynjH1SGJzm0CpI2Mev9qfXT26rS7QG+4wHWH2ZTchjlVjXmRSn3N9iZsAERm7jqzWTGMVHE8soQ4YLfYBDcfTYiiictvNAKG/Rn+zB3MXdpnrYQoeXJBohdy2u1bKuQ7//0VtdZo//3e//UkxBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqi2xtRmA0FkdVTUZ3vAhmLIAyTqzDDQoYBwOB6UdbNq30URXVsT3it1pNmUP5MbnZ2PsnZwGBbrXn1xgxxlOhgm1iLYUlN9qlqbufyroFEwXtKJtUXAdriSJhCFJdP/7kmT1AAN+F8KL2cEAVgKoYncMJgwwXRLO4eTBBYri5cGxmOphx12xySy0o+PknoOoKpegyXSK1pVkKntYwSrJEAiKWqAgbmibMHyaNmMoIE0TGRHhW5YOkLFVNZS9ZSI04w1a279PPvDuYsUuI13jt0KY2W+H1Z0PKGPe9707FoP5SlCyyv91jdlv9Wuz9nX/06VmgAg2VWhWkkk8LIAKB5yKfRqOjZgOBCqoqATrPnEX/Q8ZBGX1VhX71V7tlfbruCyiQGo7nxqtKAwguObpsHlBgXuke79f/5Lq6P9rp7++7/6aAIFVT//3ghtbBs02YhoJSqoIc6GxGtJ+0mhyAV6jMu9RBAV5eYYKMH13o09je6y76+/9+jf//3fot0UWTIHI1zCcBhOkoJU2V1QjEBB3MEgE4iAzOEUVFUEWir5CQhgkIoATLwjMFPA88Bxifor/c5KQqAY5C/ktvyqMrAHlrWJbOXJ3lDh3HW9VN0+OH9+mxhEDivExdiQVQSAxFL0rmlgBzVGlqvoYVLjzK0WzZbRHmkj2ixcXMOB++eX/+5Jk7YAD0RxBgz7QEFQjCFF3DyYKIGEfrr0tIOmKoyWxlYiPQSYTBVyUAAaqG3dx6BEVzL5iO1I0MHC/21fefcyyQAmBoFqx+BqMADR5xOokEJ7eVNYyIIRCqQrS7/xjf7NH/pWrYdR19/6Uf9Vl/WExKmsBw2YLoWxq0ndmyoCUYawBJ+mBGKji+VhmTihSmMtbZudaagmN17dmP2dzd6Jym2oE/czfp5+ISxdsO5SW/U3qnsDzwTcUPlB0We259TvZmCan+QJkFzmw3WVM2e1tBwj0K2uamxbhtFeuxFmoSjAoGTLoijtM9zEsBiICUji+0vJWqAJky3DbtDLRbMO3b/4l+NLxMaX3JJGUwhUr3+9SdEDPD7Sy8X/t/u/Z6U6qvZ93/p8t6jMJzS7DBOGxNjCTw0gVuTCvCqNLtkpwihwSji/xA4mCt+PI7IQvRBDau098BUMzJZJqWPqvlc8xLoVFITGFFHTfaLRqNTf279VodNhoiWYI5WgMn1FR7FiSOF72k6FitYlWD6WCzjtSl28oDD2ZkDgKkm58YlKl//uSZP+MhEEgQYs+wCBGQpi5cGl0DaxlDEx7IEExDmGF14k4PQwIlrTc0VEigAgrVTxJokIQM/scyXRBGEVgK0cgCRZLZr7hAM65XcXpW5Vha4rtRiGA0V1xd7r9+/X0iYtTX6Sm1us8phkiilQlvT5pFl7bEPr3eKdJDiIIwbzAaDmMcNlU0fzaDCLBXDgJCqAKhikzB6hKOiPDLnRia91pgRRcpU4+5pyXk5KBoZvQ+dPNIZiuffiWOhQaJQpr1NtlGpvNetpFtDmcpoeR1vqFj3dJLA6RZCnLTl5uQ2G1uf9b+skBomdZOHnB1mJgCA4D3labQssh9HV9qYPBsTpTaazIM1Prokg3mTpy6JZvnmecqWrU9ydYr02SG+lfRZX9/aYq/6Ltul6dW0yqi56sYLYgZlBvUHHoCwBiMDqsTJBC/xaVUypgAGXlK2b4L5lrMIBgOGH5pZyp21NWE9GCuv2bmJfKWQAoPFXmt2sqTSeLDdX+5jLl7OtFatrX3tiyr9Fi9ODe17HJ9SMWccZo6+teH6NMeNbc9nS/NXt/3v/7kmT6jIQCGUEDXsgQTWKohnDIYg0gYQos+YGBKgrhQb6kYN/6dvyd8KVxey4EiIJ/d8MyRroGGxyU/hgiLwsrgCLTNI8MawEqNie/BQA0iKMhInPO9v06P1s+7X16f9F7vbv8WehVTL3uBdB0YKgQRrsLKmgmkiYVYKxyQmyQhPVjQhb8cOUAV9LG5JyPAy14nevS/CQxPC/L4Ahpbr2R6fp56EOCr13pPHqu5y12rmYJZ+f/WYtMo+eNKgZTwP/xP+irfkNZO3bX9up+fd72sg461udhumuhft3f/sjuWvnp4toXoFxspJKtAayBgfNB2kG3YfftV7pY8dHiEAgIgxFs3zqya07O0YNgNJIz27+d7+jq6Vf/d/1J/3L9aUf9umoOyEAR1DAtARNqs5I0VzwjBvBJMA4BIwBwEwgBFImHWqJPFwLKul+l0W5NMiu67jPsxHjy55NbRDgYY0OfhzRkth9WQhf8c/0LK9er5VX8rJJ2tmTvTB/ck9fNrPbt6meeZa/M6X7W/qx8Mvh/szsVyyI3mdk8iJyuUyf8obb/+5Bk+I9D5xhBAx7QEj0iGLlwI2YPcGMECHsgSPMK4p2xMZj/g+yrr0Asqt2EKjMPDc/sow4sJsqUYIJwlE0nS8jW01t0vHvmmG098qDotoLWnZmvcHcTs8mheLfVxXts1XLR/tU25+KV1b0UaDYEFxEzTAmAAOBA0s2uhDwwWk4UEGTLASvT6b0tQjIySAVhhI9HphFKlUu8RYjDWh6m+Ima6hWI78ehvBWEsxHezRK7z/8zkd253LarCLl+1g3Lf6tl15V4r/+t5NZ1FuWGT7+8T5HDaWCPft37dfqY9SEjtQ1P9ufIuda/GVNWLAQBmH5UcXneYdgYogqYgGIIjkKQHE1SvDdJelMdr/b/Oxbv/204FmrG2O0t766LNlMlQdveTfKI16mjvtTbpTu++znkFGxAtf3GakwA8zVUyiAzAPAkNFMQo5FYkwjBYnhAh/ulAj1AIKi19dm9HQwzKt+H88ePD6bN8Itlh3o2LC+PM8VLJSa0UQrFnvAy1HIWADxhRjHFzixS5qTZo0UrF9trYYIpawWqWk814/F7xoj/+5Jk/YzEHWbBi88bwkVCuHJxiDYPpG8EL2XlCTUK4QHOsEigACDplQUvm+HnCyGyRMccCQrMzatKMCg0B4CTl5UIz3ilGO4E7YYxlAynLaj/EXOG1n7UkMQy3hJQaNXxe7u921Uz0o2ye17H2dtKP96Pu2NR/15sKIVslT6MGAVPmCsNgWEMLQJBgBTyQC6rdEyhK2NCCKkxb1aVQ57wwnAkyH6xJO2NrxSrE+tyAGFhYoqMLUCEegePABhYgFBi0ihckPQAZCOm8kXG1Bg+meqaPYOYtUvS8ahEja4Yl2ZYdSLIR5VcYw18lNhz4ViwoCQxJaLHqD4vlF2rVHD39GCAfVJwtA9Z1HNWA6+1xnSL2/2dbWWq/dzPR/29f/YuIghAMMAgCcwYQ5jYLTNAWTphqAEjwP4kCCqkrlsCzQqgKGQDyheCqLsuhOOZMxiP4w/Vp5I/hfcOY+ssjeecORcAjUIuzted5btXd0+t8KLb6FWM6UCk9PL1l7o7TQlYwYZatNLqq6OxphLTFQyoJIbRbOakiwjSnIVSfHkbI1lu//uSZPIBw5MYQzPdeIBIYrhAcekmDYhdDM6Z7IDvCqIJxaCISVdekTndDiZZQFpsNxri7GUVAY67Yq5Swhk4onCVaEBZlrdIvZnc6F9qZQIWsrM2zbS2Btjmw5zjAJMML91EW1xd1X01RG9IXscUr7HoX1X28t7rn0JfdoZY9ymLL0ALCuDAghzjLyDc11zDEKjAIE0DZKxNqLLwrGLwkk1IVWBPXUPaR1tKEO4MQG4/RrjWwGXW/x0GBGxpMeqKipU6Pv6TxpIDLGQUHBsoc7TCQiWJLYtKgIkJkhhBj6lt6yEzwvGANr1AQeOA73NvhZqdS10jgyI5+kLxkiQIoHMHQ1cKRSvNx8fjwLBs11d0oNschL9D8qlITUmKtIezPbx4vff4kIrVTaiVf67zWdQ8ov2MemsRhQQllMAQOQweU5zKvJiMDUC8mgJHSETBhDchgYWC61qyyymsx6vTwin19aVWqdmQsCVT89VqQ5GFTxC5W7l9ulk9HuNq6V/76a9Bqr+Dan/eou1lelJLr7WgY+wVYg673ft8dFqdyJ5m5f/7kmT/jMSoY0AL2BrySQKYYXBrZg3gXQgsdYEBHAqhybSgmN22hWmvq2svZl/Pkf2NFWAEUZYbUTbrYvUa4OhK6ogBZDn1CoT7Ipkmf/OsDCnVyjtnr33/edK7+x/5nV6nIQ3f+pNnWv/u+oWA5MAoBYwTQvzONXkNSYQMOFdMBkAkdAUWcuYhqdBSqUYyGhJgvT/U+32HSPbJ4zjITcEaCLbnsli/HYd4NUf0jUxCAjKOzaZHFrI7uaQkeYdSJ2jLmp552Q7Ry39+tkkpUnUyctCZqDRWIvdsh8VA37+VyNCnigfGxcrZnwgSa1aUop385SXBnJXyMhMIUywo00tjj/HEmRvq+wJ6b6fUYBWuptvTrf7kIFh87WPkr7JWR3J/6dnkGevRjOytn2dXxo1CORp6qkaSgBcwQAZDUEO7MicYMwSwCBoCEwCwABUAIwAQEGHypIBSIxrL4CvclawoUhrXiLC/Z4hAi/Ihqa2JqXCQFmiqKMuruoufT4vzvG2zu69rFSKfVyOHzPhf5MFhRZpe5Mp6Opii17g6c8+LJxT/+5Jk9IwD1hhBCz7AEjiCGLptIyYSDaD+DzxpyN6KogmzKOC5ZTEThVSrqueh338iPWwuZU3aunbDH4TXSz+CQ+KCoQ14u104gIOjZg4HfyB3DEYJHEiqqWd7ZluMIKu75yhZQ2w+OM9M10VehP7/TsLVkBUGLgLQl2nuyLuncKdEWWRcisJgOgNGoOQ4Yl4vQJAFFAClL0e2RLrfCErPbWKLRddr0EPzG6K5925NfUcSCGPQ5MYWbETl4iADaBfmrlmtTayz/fcKf0wnPAaCNw5gLIMnHJbIxnp41DGQ5EnUoRLyeRjCA51bM5h4UW4MrdK0qP9oXuOhyEb8G45tLgAICnEkkq1lpRo24DsL9i1wWpHGJXpdjH/ZCX0aAmlaSQylL5juRfs/Q9tmXV9Xr37X/+6Lf6OiIMeAIEYAhgHATmnIG2ZEwUYYBoW6j8mTtL1MLGgDjLoex+nIZhuMLZJSPiFSrU2DlJUxtU/2qlnbPFvlEcjik4/oUJ/I083nGVtiU617SIm9/p2WmXyGkmaecZav76QHe5t9YvOqt0Iq//uSZPWNhFljQAPPGvJBQqhibMU4D8FxAi8EW0jdimK1oZTg5x11q9BxhryoK5tlLSi+xMCWtJmgMEYYeMm6e0Rgpopn08DWVaShbnxJJ43oqyHO7d+cW6q1XUM9rzNqgk0DtuOHC/u+dv/ey+KofvpvS269LdKLdvv+ubXYZGgEEdTAdBMNKsJkyEwrysBsQgDJ0KuTXLmNySoUR0p03GU8EiyRlc68CS821EqREF07UrMylekwUyHpGPUZ2Mjm5eskc+7UsoRyz/znPS0JUhlJS95kmORBzuXLl+b82LuvHPtiQ3qzna2lekq1lqhkrpEs97K5J5FZD56GRT9Cw1Kgs2Ze8BksicydJngEC5QKE7osJMdzKs9088WO61WA4tOJZcjxSxXZ+MTtFam1VVIRp/XY79+xj4xYu7YCSOSoq0tSo0YCBudgKEYuIAKgGyJ1HpdEah7oaP5OrKuOxguo4XzFljR/RRhLBCXcJgi6UylbnTl+46p/sbOxn1/ldDrFoC6UlzWr8/5kRfm+UzJpTY5Fc65Ww14dJTQ1tJyqSv/7kmTzjKQfZsCLzxriP+KYYW0iJhBdqQAPPGuI/YphlbSUmH/L+532vt4PiUWbskFO9VW8NLDEriBSTIVsBAan7/pqPjmQfxByQTtLxqjZQ4dRfeUbOi6zXs6+zb/1qsqQ3UuP/f//6PV8YFCFpVAUGioczx6bsHiYNAIj+hChOloJcuRdhF45vo0lLFCTzOsPp41axY6oLkAxJZWx4lFRGJGlnnhDUzjF2UoYpJ5eNI8OTPGM/eKTLDedKITqsaGqgu/nfI06l1YX1WY/PLUoDg06StlkUK1TUl/I3HQd78Fb0O5e6KpIQ0nrqdwQIg/7IDQs00lbWNEXcVZBhNo7H6FY65Kqc37lBQSjxCSCDKDJVj3ip0Ay+5byzS4CUoXpTWtVJJ4pKKLh1xr1kKpjJITFYSqsQ5+Hb00uaMCSAKfH3wEFWb+vmgMaIAeZuhB9ZGLByQtKFJCrEAWI5ojSia0fUbqqUTOBRvw7RguBR9hWe9gEWJGCd6DqR90m6MhgEFq0k3ECmPfQPCREmEBKquLicW3WEUg0J1NYx0HWuZb/+5Jk74wD1lhBC68aci3hOLkHJgIQTWMALrxpyVeIYMW0rOAKu1xdxG+vDjMzb4wyc8gsWggKIxI2yBIcRpO0/sURGO8WCjpk/HlHNGZO8mghZeqW0NRQuryWgZc+9b2XLWxLc7FjO9Sfm7VpJZDYSyKAIABkBRAKxipf5rExxgwEK6VM1CURB4EIKISJ8qDzXTi/QqlmHNIGYLYdZZA5VNp/RMKNGhgBdRmGUGTCtMKLWuSqaoGNxggxmFJ2Dx4MKXSMmFdNR5Lcijd+g09YOsNCRvJxDwq2YOkTUoONsWPj0A9SRAVsa9HyGCrejufBWBjD9BLfkqxy2xlW+/3K4weh+bYO8sT2BoJJrMeo31GN+47hD5AQiwALxZ3QzTMUwxW9ArXcte5FAQXopSKb63zG92wEL+yrejI98ioAPTSsX5RAKoNNd7I2AzQUBFB4w+sld+LQRTPanQYxAbPrfTVoUS8lRpPpdPHnDiWmWYtNO8UmQIjn336klIPFRuogVaQXtA0d8vO776HkD9eo9DJ3A1P/PV59H6TP70YPLfdx//uSZO4AwyAYQ8ubSJBF4phAbMMoEa1ZAE68ackAiGGFowjg4CU/XtXdoCKW3VlrtnfnwctusWFDCcUed3MGzCzjvnqziwWzc2zWNU8fYtZ/uF49Q801nASmpKvnB1N1Iylo5jP2uDtdxKo1S1aliZuaZYeT4tpcOQ9Tqw4gHCgoOoX08uAhYhIDE85TaA0JQcAXLCG4Lzw+W2ybZn7EYlAm728tIigLTZejgtgmf7kRK6x66bjBoJ02CMO4jKOxT4xj3jliUwcqMxjlfVKZAzMqfOeadzNv1o/arsL09otJKnliaa/r6/AFNkDpF8zrdqEx83J4EOKEC2kWUkFGOY4HOKWY7za+Mo6EIBCBmljQ3KasluK1P3LS7IKJFWiYWUlTmvSWlIkdY4VSxezqCDN5JYqxI3xSxhumQAHACyYeDI6JW42MTIwsAUAgFH2VypMRlIyjJjOatozV0p72w27zqzGUBiwsejAo1Q1tEfEYyCLcvThZESExWtmIeF5FLFNzPk2mmUPbzlYrkTH5yugc3OEVaNnSNnyRTTmdzaJ06v/7kmTxDINtFkIzhnsyS8KoMGzIKA8FJQZOMGnJJQihVbMIoKzMmjOj2bRe5UjLfVTvc2jHtS8MiwSlnAGxSqzEgcI8MVW+Dhh+tD+podMpOiL9jJ1sqAiiEK6cQAZeg65601uVptS5o65lHUOkfaLwzr3bZ5QoMf0qUlbqaidA8ILTBIID0YxzWJhTA4GmromsHetThp5UAZNCLZOhAGk8cFxR15b7niJconN7BpuzxnJXeBvfOpL0x2QnRQjLiuD1vm/x393bm1tjLmRw0z5MIdMenrD86j05f/PNEF5qqkudQ4SkRgqHsr2mcmrcGLsp0pWpd4aEo8qlJEGYDJId2ElTXpQDF0XBBQydOKnSm/TNbObdr0UMGAcVFDR7NDlwFoqht4peIUjhspUTUy9LYpOuYPnGE1CpTUvUdpCKBiXJxBeUJsCTWPES83A8SwlVqPCVQSOkwUOEQ+GhfYYyR/IgL5PECQhoZltbW3rUt3ccwqXtDUDEUquh/3ZNJJsvq5986f97tlPh98+0zL76JymRHSnadKeZNeNZ9T1ue7T/+5Jk8o2D9mhAC68a4kPiqGZpIiYQHaj+DrxtSUKIoMG0nKhmLwmZ/+9nkSEM2x2HcZL45bu3cQOheK/0VHCT9sDL1gENGas66nRB6GOUrKFCjKFaXfkX9kVfKsUCAVb7v/dq8X9Pf7kslert+r9Gjr3E3tipQIKzyoBB8oNRyEqBhAB6okNVDi9qRj8oFI8xuMtH8rIz1Ov4sNla7Wgx10B7iVku8c1OmUZHd0apINr6vJijaEHjHFda0RWfU/QiNkzQdoCiK5vDTVG6dHhBoSNNCRuRUx4pmRaq1BnJMKGPcQiFDJCEEZi0doS5gjSuScBsruTsiR0HIiPdQm0nj4EBLJUneajLGPk8BFwhAntoujZxz9xJm+6sCKNDSj5JNBFDetZpsypmf7BfcU7IhTsER4k2YXO9eSpqh88q1ugislKuvJjUnhZVygEBhQAZgSCRyCiZj8lZgIAiVbxNJe1vYfg9JGRtbvuZDk5JXiMIsXJlJhCNH0W59SBIazCnK+xR40REdXJulmTM1pdQmsVX17FM0hOs6h2FG3urmrji//uSZOcPg39DQIOvGnIxwpiWZGIoEYGM/A68bYknCGEFtJSg7IfW9+5wnQsqlMjGO70jrWRUi7r5lDqZcLqmw5wGx5N7/AqfMB9sRO2qocE5mLkDroluZqAGLu4jc27NTWCFx0qklWT0Oe6kvTdmr7krUzP1fr0gDmU3tddrTXFb0fGG1OuStp0hRLb4iCsEYAEp07YHJT8TDZClx2NIKKTqjUAw2fXEertYYW2K7nVroUQKefqa+AEfuYvbX+2y0yZcymIItAo8StwyvnedtDFkyHsbIbSatuGONzliREOab18w2QNnCFDdNjWU4m9fd6PMdQvrXmOEJl6XhGqv10CWfrzr/HXGBx2Kgc1VTDPSn39N/doN9ZZLivv2bNWesec0jKO3vyvQ72Sj+5T302I0blLpVRADIcB5hoWxkHRplEJ5haErlNRWIsKmEyWYg5yJdIXaAEkRhEY4yNXcBKgUDTprEbAiBMTxrLrDzKbvG70iX5VXFLrDzEzUdJQ/uZX1kZ2g2vuXN6irm2PrnqNeoaZS6Qqkmueae+6vjWUgzv/7kmTqDIPpXsADphwyQIIoQGzCKg6VIQIuMGuI1Yph4aGImOHbWFuFHSsKr9/FXQ76gdq1uORJHm5hkAuQiAlCcoCLtfazcpJdN5XZ7P94PsTtd1OCSYE8qh6YXbjmUY+9u/sVS8lSYRM3UOk3MW0WkpgVnZkmcbrpcsWvUwJJP0kLd6VNAAQIAQAQABpZI1MY4S5hBBJ6qRDAGvQwiHRomgkEKVODHTCYHX026QpmVgVcAwBSI2VOah5gDkAqYgMOUO48xecQeGRxeBygpEhpBR1JqoQvQGrQbGw9kPGZEWLMmUk1MhE6DNCwDLjRFlmiJwvGSabXQRlAbYyh4cA5ZEyZMTxNGRsTPWqy0xzyUHAQwiozZGkkQQxNSkovHZig+gpaa1WIsRAi5IkHMCXIoakQIeipJJMumLF4yeyddFVddayuT5YIITBdIuUS2RQvE4RcnSfMUTUyUkuihU6loJ1f///nCuRRH///9FFjIQCgl1GpUilI9YxSpv3ni7EE+muymlnViPHSRp7QiA/SXa8muEGPBJRWlisHCQiT0of/+5Jk9QAEJWQ/hXUAAkliGDCtiAAdUhEK2ckAAlo6oIc0sAAjTd2VuJii0tjd9ons3NT5oeNPmp1D/fVJrJ2fUY6Ns06mS71Ltip9VxyKuLnqP4VX3Ne6msafo8x7JefZzX37ZprGqMtelDmtv6Um5as469p5R0R8////Ebf///////9YLf/ii0xBTUVEjdE1FxOmIfxBiFPCVD1FydqVDUNZbCoIgiS0RCoVYRCoVItVISXVUKFnJIkQSBoOlQWgq6VOwaeDQdKgqVBU6IjwNA0sFR4KnREHCwNRL/1B2VOiUNKBpQNHip0SgrBqDT53//BXYCBWAkAYdrkkSTF1kxMT3mly60DAQoeCp0FQVLA0oGjxU6VO//+Ij0FYKuUqTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//uSZIqP8z0WsAc9IAArgWWx5gwAAAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqg==";var ql=new x("ResponseNotification"),yp=.5,Ap=200,vp=300,co=y({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:t=>(t.append(G("Preview",El)),()=>t.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),xl=null,Vr=new Map,wl,Jr;function qp(t){return new Promise((e,o)=>GM_xmlhttpRequest({url:t,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=Ap&&n<vp?e(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var xp=t=>Uint8Array.from(atob(t.slice(t.indexOf(",")+1)),e=>e.charCodeAt(0)).buffer;function wp(t,e){let o=Vr.get(e);return o||(o=(e.startsWith("data:")?Promise.resolve(xp(e)):qp(e)).then(n=>t.decodeAudioData(n)),o.catch(()=>Vr.delete(e)),Vr.set(e,o)),o}async function Sl(t){xl??=new AudioContext;let e=xl;e.state==="suspended"&&e.resume();let o=e.createBufferSource(),n=e.createGain();o.buffer=await wp(e,t),n.gain.value=yp,o.connect(n).connect(e.destination),o.start()}function El(){let t=co.store.soundUrl.trim();Sl(t||zr).catch(e=>{ql.warn("Sound failed",e),t&&Sl(zr).catch(o=>ql.warn("Default chime failed",o))})}function Sp(t){let e=`${t??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:e,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:e,silent:!0});o.onclick=()=>{focus(),o.close()}}function Ep(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(Jr=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:Jr.signal}))}var Tl=g({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:co,start(){Ep(),wl=P.on("fall",({conversationId:t,outcome:e})=>{e==="done"&&(co.store.onlyWhenHidden&&!document.hidden||(co.store.sound&&El(),co.store.browserNotification&&Sp(so(t))))})},stop(){wl?.(),Jr?.abort()}});var Tp=`:is(${l.sidebarScroll}, :has(> ${l.sidebarScroll})) + :has(${l.menuButton})`,Mp=`${l.rail} > :has(${l.menuButton})`,Xr=`:is(${Tp}, ${Mp}, ${l.oldProfile}):not(:hover)`,Zr="[data-bloom-profile-avatar]",Cp=`:is(${Xr}, ${Xr} :has(${Zr})) > :not(${Zr}, :has(${Zr}))`,Cl=y({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function Lp(){let{opacity:t,fadeAvatar:e}=Cl.store;return t>=100?"":`${e?Xr:Cp}{opacity:${t/100}!important}`}var Ml,Ll=g({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Cl,styles:Lp,start(){Ml=it()},stop(){Ml?.()}});var kl=`/*
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
`;var O=k("bloom-star-chats"),Ip=80,Bp=60,Pp=1200,Op=120,uo=y({replaceReadAloud:{type:"boolean",description:"Put the star where the reply's Read aloud button is, and hide that button.",default:!0},messages:{type:"custom",default:[]}}),Rp=`:is(${l.turnActions}) ${l.readAloud}`,$r,_r=!1,Lt=!1,te=!1,hn=0,K=null,bn="",L=null,ti,kt;function oi(){let t=uo.store.messages;return Array.isArray(t)?t.filter(e=>R(e)&&typeof e.conversationId=="string"&&typeof e.messageId=="string"&&(e.role==="user"||e.role==="assistant")&&typeof e.snippet=="string"&&typeof e.starredAt=="number"):[]}function ni(){let t=b();return t?oi().filter(e=>e.conversationId===t):[]}function Hp(t,e){return oi().some(o=>o.conversationId===t&&o.messageId===e)}function Il(t){let e=oi(),o=e.some(n=>n.conversationId===t.conversationId&&n.messageId===t.messageId);uo.store.messages=o?e.filter(n=>!(n.conversationId===t.conversationId&&n.messageId===t.messageId)):[{...t,starredAt:Date.now()},...e].slice(0,Ip)}function ei(t){return t.messageIds[0]||t.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||t.el.getAttribute("data-turn-key")||""}function Dp(t){return et(fe(t)||h(t.el.textContent??""),Bp)}function Np(t){let e=t.closest(l.turn);if(!e)return null;let o=Tt().filter(n=>e.contains(n.el));return o.find(n=>n.el.contains(t)||n.el===e)??o.findLast(n=>n.el.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING)??null}function Up(){let t=[...document.querySelectorAll(l.turnActions)].filter(e=>!e.closest(`[data-bloom], [role="dialog"], [inert], pre, ${l.sidebars}`));return t.filter(e=>!t.some(o=>o!==e&&o.contains(e)))}function Fp(t,e){let o=uo.store.replaceReadAloud?e.querySelector(l.readAloud):null;if(o&&!o.closest("[data-bloom]")){t.nextElementSibling!==o&&o.before(t);return}let n=Gp(e);(t.parentElement!==n||n.lastElementChild!==t)&&n.append(t)}function Gp(t){let e=[...t.querySelectorAll("button")].filter(n=>n.dataset.bloom!=="message-star"&&!n.closest("[data-bloom]"));return e.length?[...t.children].find(n=>n instanceof HTMLElement&&n!==e[0]&&e.every(r=>n.contains(r)))??t:t}function Kp(){return[...document.querySelectorAll(l.headerMore)].filter(e=>{if(e.dataset.bloom==="message-star"||e.closest("[data-bloom], [role='dialog'], [inert]")||e.closest(l.sidebars))return!1;let o=e.getBoundingClientRect();return o.width===0&&o.height===0?!!e.closest("header, #page-header"):o.top>=0&&o.top<96&&o.left>window.innerWidth*.5}).toSorted((e,o)=>o.getBoundingClientRect().left-e.getBoundingClientRect().left||(e.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1))[0]??null}function Bl(t,e,o){return s("button",{class:e,attrs:{type:"button","aria-label":t},on:{pointerdown:n=>n.stopPropagation(),mousedown:n=>n.stopPropagation(),click:n=>{n.preventDefault(),n.stopPropagation(),o(n)}}},F("star"))}function Yp(t,e){t.setAttribute("aria-pressed",String(e)),t.setAttribute("aria-label",e?"Unstar":"Star")}function yn(){return Lt||te}function Me(){hn&&window.clearTimeout(hn),hn=0}function Ce(){Lt=!1,te=!1,Me(),kt?.enter(),K?.remove(),K=null,bn="",L?.classList.remove(O("-open")),L?.setAttribute("aria-expanded","false")}function An(t){return t instanceof Node&&!!(L?.contains(t)||K?.contains(t))}function jp(t){t.classList.add(O("-flash")),window.setTimeout(()=>t.classList.remove(O("-flash")),Pp)}function Qp(t){let e=Tt().find(n=>ei(n)===t),o=e?.el.closest(l.turn)??e?.el;o&&(o.scrollIntoView({block:"start"}),jp(o))}function Wp(){let t=b(),e=new Set,o=[...document.querySelectorAll('[data-bloom="message-star"][data-place="action"]')];if(!t||Rt()){for(let n of o)n.remove();return}for(let n of Up()){if(!rt(n))continue;let r=Np(n),i=r?ei(r):"";if(!r||!i)continue;let a=n.querySelector('[data-place="action"]');(!a||a.dataset.id!==i)&&(a?.remove(),a=Bl("Star",O("-star"),()=>{let d=b(),c=Tt().find(u=>ei(u)===i);!d||!c||Il({conversationId:d,messageId:i,role:c.role,snippet:Dp(c)})}),a.dataset.bloom="message-star",a.dataset.place="action",a.dataset.id=i),Yp(a,Hp(t,i)),Fp(a,n),e.add(a)}for(let n of o)e.has(n)||n.remove()}function zp(){if(!K||!L)return;let t=L.getBoundingClientRect(),e=K.offsetWidth||288,o=K.offsetHeight||120,n=t.bottom+6;n+o>window.innerHeight-8&&(n=Math.max(8,t.top-o-6));let r=Math.max(8,Math.min(t.right-e,window.innerWidth-e-8));K.dataset.place=n>=t.bottom?"below":"above",K.style.left=`${Math.round(r)}px`,K.style.top=`${Math.round(n)}px`}function Vp(){if(!yn()||!L){K?.remove(),K=null,bn="",L?.classList.remove(O("-open")),L?.setAttribute("aria-expanded","false");return}let t=ni(),e=t.map(o=>`${o.messageId}	${o.snippet}`).join(`
`);if(!K||bn!==e){K?.remove();let o=t.map(n=>s("div",{class:O("-row")},s("button",{class:O("-jump"),attrs:{type:"button"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),Ce(),Qp(n.messageId)}}},s("span",{class:O("-role"),text:n.role==="user"?"You":"ChatGPT"}),s("span",{class:O("-snip"),text:n.snippet||"Message"})),Bl("Unstar",O("-unstar"),()=>Il(n))));K=s("div",{class:`bloom-root ${O("-panel")}`,attrs:{"data-bloom":"star-list"},on:{pointerenter:()=>{Me(),kt?.enter(),te=!0},pointerleave:n=>{An(n.relatedTarget)||Lt||kt?.leave(n)}}},s("div",{class:O("-bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:O("-head"),text:"Starred"}),s("div",{class:O("-body")},...o.length?o:[s("div",{class:O("-empty"),text:"No starred messages in this chat"})])),document.body.append(K),bn=e}zp(),L.classList.add(O("-open")),L.setAttribute("aria-expanded","true")}function Jp(){for(let r of document.querySelectorAll('[data-bloom="starred"]'))r.remove();let t=Kp(),e=t?.parentElement??null,o=b();if(!t||!e||e.closest(l.sidebars)||!o||Rt()||!rt(e)){L?.remove(),L=null,Ce();return}L||(L=s("button",{class:O("-toggle"),attrs:{type:"button","data-bloom":"message-star","data-place":"header","aria-label":"Starred messages","aria-expanded":"false"},on:{pointerdown:r=>r.stopPropagation(),pointerenter:()=>{Me(),kt?.enter(),hn=window.setTimeout(()=>{te=!0,_t()},Op)},pointerleave:r=>{An(r.relatedTarget)||(Me(),yn()&&kt?.leave(r))},click:r=>{r.preventDefault(),r.stopPropagation(),Lt=!Lt,te=Lt,Me(),Lt||Ce(),_t()}}},F("star"))),(L.parentElement!==e||L.nextElementSibling!==t)&&t.before(L);let n=t.getBoundingClientRect();n.width>0&&(L.style.width=`${n.width}px`,L.style.height=`${n.height}px`),L.classList.toggle(O("-here"),ni().length>0),Vp()}function Zp(){let t=new Set(ni().map(e=>e.messageId));for(let e of document.querySelectorAll('[data-bloom="navigator"] .bloom-nav-tick, [data-bloom="navigator"] .bloom-nav-row'))e.classList.toggle(O("-mark"),!!e.dataset.messageId&&t.has(e.dataset.messageId))}function _t(){if(!_r){_r=!0;try{for(let t of document.querySelectorAll('[data-bloom="starred"], [data-bloom="chat-star"]'))t.remove();Wp(),Jp(),Zp()}finally{_r=!1}}}function Xp(){Ce(),L?.remove(),L=null;for(let t of document.querySelectorAll('[data-bloom="message-star"], [data-bloom="star-list"], [data-bloom="starred"], [data-bloom="chat-star"]'))t.remove();for(let t of document.querySelectorAll(`.${O("-mark")}`))t.classList.remove(O("-mark"))}var Pl=g({name:"StarChats",description:"Star a message from its toolbar. The star left of the top-right menu opens this chat's list.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:uo,styles:()=>`${kl}${uo.store.replaceReadAloud?bt([Rp]):""}`,onSettingsChange(t){(t==="messages"||t==="replaceReadAloud")&&_t()},start(){kt=Do({over:An,trigger:()=>L,panel:()=>K,setHeld(o){if(o){te=!0,_t();return}Lt||(te=!1,_t())}}),$r=T(o=>H(o)&&_t());let t=o=>{An(o.target)||yn()&&Ce()};document.addEventListener("pointerdown",t,!0);let e=o=>{o.key!=="Escape"||!yn()||(o.preventDefault(),Ce())};document.addEventListener("keydown",e,!0),ti=()=>{document.removeEventListener("pointerdown",t,!0),document.removeEventListener("keydown",e,!0)},_t()},stop(){$r?.(),$r=void 0,ti?.(),ti=void 0,Me(),kt?.dispose(),kt=void 0,Xp()}});var Ol="filter:blur(6px)!important;transition:filter 0.2s ease",nv=`:is(${l.sidebars})`,ee="data-bloom-streamer-open",$p="[data-app-action-sidebar-thread-row], [data-app-action-sidebar-project-row], .bloom-recent-item",Rl=":not([data-app-action-sidebar-thread-row] *, [data-app-action-sidebar-project-row] *)";function _p(){return{conversations:{selectors:["[data-app-action-sidebar-thread-title]"],hover:!0,row:"[data-app-action-sidebar-thread-row]"},projects:{selectors:["[data-app-action-sidebar-project-label]"],hover:!0,row:"[data-app-action-sidebar-project-row]"},accountAvatar:{selectors:["[data-bloom-profile] img","[data-bloom-menu] img"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:[`[data-thread-title]${Rl}`,`[data-thread-title-trigger]${Rl}`],hover:!1}}}var Hl=y({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function tf(t,e){let o=[`:is(${t}):hover`,`.bloom-recent-item:hover :is(${t})`,`:is(${t})[${ee}]`];return e&&o.push(`${e}:hover`,`${e}:hover :is(${t})`,`${e}:is(${t}):hover`,`${e}[${ee}]`,`${e}[${ee}] :is(${t})`),o.join(",")}function ef(){let t=_p();return Object.entries(t).filter(([e])=>Hl.store[e]).map(([,e])=>{let o=e.selectors.join(",");if(!e.hover)return`:is(${o}){${Ol}}`;let n="row"in e?e.row:void 0;return`:is(${o}){${Ol}}${tf(o,n)}{filter:none!important}`}).join(`
`)}function of(t,e){for(let o of document.elementsFromPoint(t,e))if(o instanceof Element){let n=o.closest($p);if(n)return n}return null}function ai(t){for(let e of document.querySelectorAll(`[${ee}]`))e!==t&&e.removeAttribute(ee);t&&!t.hasAttribute(ee)&&t.setAttribute(ee,"")}var Le,nf=vt(()=>{Le&&ai(of(Le.clientX,Le.clientY))});function ri(t){Le=t,nf()}function rf(t){t.relatedTarget instanceof Node&&document.documentElement.contains(t.relatedTarget)||(Le=void 0,ai(null))}var ii,vn,Dl=g({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:Hl,styles:ef,start(){ii=it(),vn=new AbortController;let t={capture:!0,signal:vn.signal,passive:!0};document.addEventListener("pointerover",ri,t),document.addEventListener("pointermove",ri,t),document.addEventListener("pointerout",ri,t),window.addEventListener("pointerleave",rf,t)},stop(){vn?.abort(),vn=void 0,Le=void 0,ai(null),ii?.(),ii=void 0}});var It=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)','[data-turn-key] [data-message-author-role="user"] blockquote:not(.twitter-tweet)','[class~="group/user-message"] blockquote:not(.twitter-tweet)'].join(","),si=y({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function af(){let t=[`${It}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${It}>*{margin-block:0!important}`];return si.store.italic||t.push(`${It}{font-style:inherit!important}`),si.store.quotes||(t.push(`${It}{quotes:none!important}`),t.push(`${It}::before,${It}::after,${It} p::before,${It} p::after{content:none!important}`)),t.join(`
`)}var Nl=g({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:si,styles:af});var sf=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],lf=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",cf='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',Ul=y({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function uf(){let t=`${Ul.store.width}rem`;return`:root,[data-app-action-timeline-scroll],[data-chatgpt-composer],[data-composer-input]{--thread-content-max-width:${t}!important;--composer-adjacent-max-width:${t}!important}`}var Fl=g({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:Ul,styles:uf});var df=[qa,Ja,rs,ss,us,ms,vs,ks,Ns,Ks,il,sl,ll,pl,vl,Tl,Ll,Pl,Dl,Nl,Fl],li=df;var mf=new x("Bloom"),Gl="2.0.85";function pf(t){t.isComposing||!t.shiftKey||!(t.metaKey||t.ctrlKey)||t.key!=="b"&&t.key!=="B"||(t.preventDefault(),t.stopPropagation(),de())}async function ci(){for(let t of li)t.updatedAt=$i[t.name];Mi(li),wi(),mo("base",Oi),Zi(),document.addEventListener("keydown",pf,!0),yo("Init"),Nn().then(()=>{yi(),yo("DOMContentLoaded")}),await Un(),yo("HostReady"),ma(),mf.info(`Bloom++ ${Gl} app host ready`)}var Kl=new x("Boot");if(window===window.top){let t=ne.Bloom;t&&Kl.warn("Replacing another Bloom++ instance",t.VERSION),Object.defineProperty(ne,"Bloom",{value:ui,configurable:!0,writable:!0}),ci().catch(e=>Kl.error("Startup failed",e))}})();
